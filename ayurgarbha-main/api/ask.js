/* =====================================================================
 * AyurGarbha — Vercel Serverless Function: /api/ask
 * - Accepts ONLY { question, month, lang } (max 500 chars; no name/age/LMP)
 * - Rate limit: 10 requests / minute / IP
 * - (a) Deterministic Red-Flag check first
 * - (b) BM25 Top-3 verified Tier A records from data/records.json
 * - (c) Calls AYURPARAM_URL with x-shared-secret (25s timeout)
 * - (d) Citation Validator (rejects unknown/external IDs)
 * - (e) Extractive fallback on any failure (source: "fallback")
 * ===================================================================== */
const fs = require("fs");
const path = require("path");

const RAG = require(path.resolve(__dirname, "../frontend/js/rag-engine.js"));

// ---- Per-IP Sliding Window Rate Limiter (10 req / 60s) ----
const ipHits = new Map();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60 * 1000;

function checkRateLimit(ip) {
  const now = Date.now();
  const key = String(ip || "unknown");
  const list = (ipHits.get(key) || []).filter((ts) => now - ts < RATE_WINDOW_MS);
  if (list.length >= RATE_LIMIT) {
    ipHits.set(key, list);
    return false;
  }
  list.push(now);
  ipHits.set(key, list);
  return true;
}

// ---- Deterministic Red-Flag Engine ----
const RED_FLAG_RULES = [
  { id: "bleeding", hi: "योनि से रक्तस्राव", en: "Vaginal bleeding", pattern: /bleed|bleeding|haemorrhage|hemorrhage|spotting|blood|रक्त|रक्तस्राव|खून|पुष्प/i },
  { id: "fluid", hi: "पानी छूटना (झिल्ली फटना)", en: "Amniotic fluid leaking", pattern: /leak|leaking|water broke|fluid gush|amniotic|pprom|पानी जाना|पानी छूटना|द्रव स्राव/i },
  { id: "headache_vision", hi: "तेज़ सिरदर्द या धुँधला दिखना", en: "Severe headache or blurred vision", pattern: /severe headache|throbbing headache|blurred vision|blur|spots before eyes|तेज़ सिरदर्द|धुंधला|धुँधला|अंधेरा/i },
  { id: "seizure", hi: "दौरे (Convulsions)", en: "Seizures / Convulsions", pattern: /seizure|convulsion|fits|eclampsia|दौरा|दौरे|झटका/i },
  { id: "fetal_movement", hi: "शिशु की हलचल कम होना", en: "Reduced or absent fetal movements", pattern: /reduced movement|decreased movement|no movement|absent movement|less kick|कम हलचल|हलचल कम|हिल नहीं रहा/i },
  { id: "fever", hi: "तेज़ बुखार", en: "High fever", pattern: /high fever|chills|shivering|तेज़ बुखार|कंपकंपी|बुखार/i },
  { id: "vomiting", hi: "लगातार उल्टी (कुछ भी न पचना)", en: "Persistent vomiting", pattern: /persistent vomit|continuous vomit|hyperemesis|लगातार उल्टी|बार-बार उल्टी/i },
  { id: "abdominal_pain", hi: "पेट में तेज़ दर्द", en: "Severe abdominal pain", pattern: /severe abdominal pain|intense pelvic pain|तेज़ दर्द|असहनीय दर्द|पेट में तेज़/i }
];

function evaluateRedFlagsServer(text) {
  const alerts = [];
  const q = String(text || "");
  RED_FLAG_RULES.forEach((r) => {
    if (r.pattern.test(q)) alerts.push({ id: r.id, hi: r.hi, en: r.en });
  });
  return { triggered: alerts.length > 0, alerts };
}

// ---- Load Verified Tier A Records Once ----
let cachedRecords = null;
function getVerifiedRecords() {
  if (cachedRecords) return cachedRecords;
  const candidates = [
    path.resolve(__dirname, "../data/records.json"),
    path.resolve(__dirname, "../frontend/data/records.json"),
    path.resolve(process.cwd(), "data/records.json"),
    path.resolve(process.cwd(), "frontend/data/records.json")
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) {
      const all = JSON.parse(fs.readFileSync(p, "utf8"));
      cachedRecords = all.filter((r) => r && r.text_verified === true && r.tier === "A");
      RAG.setRecords(cachedRecords);
      return cachedRecords;
    }
  }
  return [];
}

async function callAyurParam(url, secret, payload, fetchImpl = fetch) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 25000);
  try {
    const resp = await fetchImpl(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-shared-secret": secret || ""
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    if (!resp.ok) {
      throw new Error(`AyurParam HTTP ${resp.status}`);
    }
    const data = await resp.json();
    return String(data.answer || data.text || "").trim();
  } finally {
    clearTimeout(timer);
  }
}

async function handler(req, res, deps = {}) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const clientIp =
    (req.headers && (req.headers["x-forwarded-for"] || req.headers["x-real-ip"])) ||
    (req.socket && req.socket.remoteAddress) ||
    "unknown";

  if (!deps.skipRateLimit && !checkRateLimit(String(clientIp).split(",")[0].trim())) {
    return res.status(429).json({ error: "Rate limit exceeded (max 10 requests/minute)." });
  }

  const body = req.body && typeof req.body === "object" ? req.body : {};
  const question = String(body.question || "").trim();
  if (!question) {
    return res.status(400).json({ error: "Question is required." });
  }
  if (question.length > 500) {
    return res.status(400).json({ error: "Question must be 500 characters or fewer." });
  }

  const month = body.month != null ? Number(body.month) : null;
  const lang = body.lang === "en" ? "en" : "hi";

  // (a) Rule-based Red-Flag & Self-Harm check first
  const selfHarm = /self[- ]?harm|suicide|आत्म-?हानि|खुद को नुकसान|मरने का मन|जीने की इच्छा नहीं/i.test(question);
  if (selfHarm) {
    return res.status(200).json({
      red_flag_blocked: true,
      self_harm_redirect: true,
      red_flags: [{ id: "self_harm", hi: "Tele-MANAS 14416 पर बात करें", en: "Please call Tele-MANAS 14416" }],
      answer: "",
      records: [],
      source: "self_harm_help"
    });
  }
  const rf = evaluateRedFlagsServer(question);
  if (rf.triggered) {
    return res.status(200).json({
      red_flag_blocked: true,
      red_flags: rf.alerts,
      answer: "",
      records: [],
      source: "red_flag"
    });
  }

  // (b) BM25 Top-3 verified Tier A records
  getVerifiedRecords();
  const searchRes = RAG.search(question, { top_k: 3, month, lang });
  const hits = searchRes.hits || [];
  const topScore = hits[0] ? hits[0].score : 0;

  if (!hits.length || topScore < 0.22) {
    return res.status(200).json({
      red_flag_blocked: false,
      out_of_corpus: true,
      answer:
        lang === "en"
          ? "This is not in my available Samhita texts."
          : "यह मेरे उपलब्ध संहिता-पाठ में नहीं है।",
      records: [],
      filters: searchRes.info,
      source: "out_of_corpus"
    });
  }

  const top3 = hits.map((h) => h.record);
  const retrievedIds = top3.map((r) => r.id);
  const extractive =
    lang === "en"
      ? (top3[0].english_summary || top3[0].hindi_summary || "")
      : (top3[0].hindi_summary || "");

  // (c) Call AyurParam Modal endpoint if configured
  const ayurUrl = deps.ayurUrl != null ? deps.ayurUrl : process.env.AYURPARAM_URL;
  const ayurSecret = deps.ayurSecret != null ? deps.ayurSecret : process.env.AYURPARAM_SECRET;

  if (ayurUrl) {
    try {
      const context = top3
        .map((r) => `[ID: ${r.id}] ${r.hindi_summary}`)
        .join("\n");
      const aiAnswer = await callAyurParam(
        ayurUrl,
        ayurSecret,
        { context, question, lang },
        deps.fetchImpl || fetch
      );

      // (d) Citation Validator (every ID in answer must be in retrievedIds; no raw shloka)
      const validation = RAG.validateCitations(aiAnswer, retrievedIds);
      const hasRawShloka = /॥/.test(aiAnswer);
      if (validation.valid && !hasRawShloka) {
        return res.status(200).json({
          red_flag_blocked: false,
          out_of_corpus: false,
          answer: aiAnswer,
          records: top3,
          retrievedIds,
          filters: searchRes.info,
          source: "ayurparam"
        });
      }
    } catch (e) {
      /* fall through to extractive fallback */
    }
  }

  // (e) Extractive Fallback on any failure or unconfigured endpoint
  return res.status(200).json({
    red_flag_blocked: false,
    out_of_corpus: false,
    answer: extractive,
    records: top3,
    retrievedIds,
    filters: searchRes.info,
    source: "fallback"
  });
}

module.exports = handler;
module.exports.checkRateLimit = checkRateLimit;
module.exports.evaluateRedFlagsServer = evaluateRedFlagsServer;
module.exports._resetRateLimit = () => ipHits.clear();
