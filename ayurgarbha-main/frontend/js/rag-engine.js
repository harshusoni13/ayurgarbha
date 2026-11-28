/* =====================================================================
 * AyurGarbha — rag-engine.js (Phase 6)
 * - Indexes ONLY text_verified === true && tier === "A" records
 * - BM25Okapi Top-3 retrieval
 * - AyurParam (bharatgenai/AyurParam) Provider Adapter (<context> <user> <assistant>, 2048 token cap)
 * - Citation Validator (rejects any ID not in top-3 retrieved set)
 * - Extractive Fallback (renders verified DB summary + Sanskrit + ID)
 * ===================================================================== */
(function (global) {
  "use strict";

  const TOKEN_REGEX = /[a-z0-9\u0900-\u097f]+/g;
  const STOP_WORDS = new Set(
    (
      "a an the of and or to in is are for with what which how do does can i my me " +
      "should be at on by from it this that when why during kya kaise me mein aur " +
      "ya se ko ke ki ka hai hain tha thi ko mein par ke liye"
    ).split(" ")
  );

  const HINDI_MONTHS = {
    pehla: 1, pahla: 1, pratham: 1, पहला: 1, प्रथम: 1,
    dusra: 2, doosra: 2, dwitiya: 2, दूसरा: 2, द्वितीय: 2,
    tisra: 3, teesra: 3, tritiya: 3, तीसरा: 3, तृतीय: 3,
    chautha: 4, chauthe: 4, chaturtha: 4, चौथा: 4, चौथे: 4, चतुर्थ: 4,
    panchva: 5, paanchva: 5, panchve: 5, pancham: 5, पांचवा: 5, पाँचवाँ: 5, पाँचवे: 5, पंचम: 5,
    chhattha: 6, chatha: 6, chhathe: 6, shashtha: 6, छठा: 6, छठे: 6, षष्ठ: 6,
    saatva: 7, satva: 7, saatve: 7, saptam: 7, सातवा: 7, सातवें: 7, सप्तम: 7,
    aathva: 8, athva: 8, aathve: 8, ashtam: 8, आठवा: 8, आठवें: 8, अष्टम: 8,
    nauva: 9, nauve: 9, navam: 9, नौवा: 9, नौवें: 9, नवम: 9,
    dasva: 10, dasve: 10, dasham: 10, दसवा: 10, दसवें: 10, दशम: 10
  };

  // Query synonym expansion to bridge common Hindi/English terms to Samhita records
  const SYNONYMS = {
    milk: ["क्षीर", "दूध", "पय", "ksheera"],
    doodh: ["क्षीर", "दूध", "पय"],
    दूध: ["क्षीर", "पय", "दुग्ध"],
    ghee: ["घृत", "सर्पि", "ghrita"],
    घी: ["घृत", "सर्पि"],
    butter: ["नवनीत", "मक्खन"],
    मक्खन: ["नवनीत"],
    honey: ["मधु", "शहद"],
    शहद: ["मधु"],
    diet: ["आहार", "भोजन", "पथ्य"],
    food: ["आहार", "भोजन"],
    खाना: ["आहार", "भोजन"],
    खायें: ["आहार", "भोजन"],
    खाये: ["आहार", "भोजन"],
    खाएं: ["आहार", "भोजन"],
    nausea: ["छर्दि", "उल्टी", "वमन"],
    vomiting: ["छर्दि", "उल्टी", "वमन"],
    उल्टी: ["छर्दि", "वमन"],
    craving: ["दौहृद", "इच्छा"],
    cravings: ["दौहृद", "इच्छा"],
    dauhrida: ["दौहृद", "द्विहृदया"],
    ojas: ["ओज", "अस्थिर"],
    fetus: ["गर्भ", "विकास"],
    baby: ["गर्भ", "शिशु"],
    शिशु: ["गर्भ"],
    बच्चा: ["गर्भ"],
    symptoms: ["लक्षण", "लिङ्ग"],
    signs: ["लक्षण", "लिङ्ग"],
    लक्षण: ["लिङ्ग", "सद्योगृहीत"]
  };

  function tokenize(text) {
    if (!text) return [];
    const matches = String(text).toLowerCase().match(TOKEN_REGEX);
    if (!matches) return [];
    return matches.filter((w) => !STOP_WORDS.has(w) && w.length > 1);
  }

  function expandQueryTokens(tokens) {
    const out = [...tokens];
    tokens.forEach((t) => {
      const syns = SYNONYMS[t];
      if (syns) syns.forEach((s) => out.push(s.toLowerCase()));
    });
    return out;
  }

  function detectQueryInfo(question, ctxMonth, ctxLang) {
    const q = String(question || "");
    const ql = q.toLowerCase();
    let month = null;

    const mMatch =
      ql.match(/(?:month|masa|maas|mahina|maheena|माह|महीना|महीने)\s*(\d{1,2})/) ||
      ql.match(/(\d{1,2})(?:st|nd|rd|th)?\s*(?:month|masa|maas|mahina|maheena|माह|महीना|महीने)/);
    if (mMatch && Number(mMatch[1]) >= 1 && Number(mMatch[1]) <= 10) {
      month = Number(mMatch[1]);
    } else {
      for (const [hk, v] of Object.entries(HINDI_MONTHS)) {
        if (ql.includes(hk)) {
          month = v;
          break;
        }
      }
    }

    if (!month && ctxMonth) month = Number(ctxMonth);

    const hasDevanagari = /[\u0900-\u097f]/.test(q);
    const lang = hasDevanagari ? "hi" : (ctxLang || "hi");

    return { month, lang };
  }

  function docText(r) {
    return [
      r.id || "",
      r.samhita || "",
      r.sthana || "",
      r.hindi_summary || "",
      r.sanskrit || "",
      (r.section_tag || []).join(" "),
      r.month != null ? `month ${r.month} माह ${r.month}` : ""
    ].join(" ");
  }

  // ---- In-Memory BM25 Index (ONLY text_verified === true && tier === "A") ----
  let verifiedRecords = [];
  let indexedDocs = [];
  let idfTable = {};
  let avgDocLength = 0;

  function setRecords(records) {
    verifiedRecords = (Array.isArray(records) ? records : []).filter(
      (r) => r && r.text_verified === true && r.tier === "A"
    );

    const N = verifiedRecords.length;
    const df = {};

    indexedDocs = verifiedRecords.map((r) => {
      const tokens = tokenize(docText(r));
      const tf = {};
      tokens.forEach((w) => {
        tf[w] = (tf[w] || 0) + 1;
      });
      Object.keys(tf).forEach((w) => {
        df[w] = (df[w] || 0) + 1;
      });
      return { record: r, tokens, tf, len: tokens.length };
    });

    idfTable = {};
    Object.keys(df).forEach((w) => {
      idfTable[w] = Math.log(1 + (N - df[w] + 0.5) / (df[w] + 0.5));
    });

    avgDocLength = indexedDocs.reduce((acc, d) => acc + d.len, 0) / (N || 1.0);
  }

  function ensureIndex() {
    if (indexedDocs.length > 0) return;
    if (global.DB && global.DB.getVerifiedRecords) {
      setRecords(global.DB.getVerifiedRecords());
    }
  }

  function search(question, options = {}) {
    ensureIndex();
    const t0 = typeof performance !== "undefined" ? performance.now() : Date.now();
    const { top_k = 3, month = null, lang = "hi" } = options;

    const info = detectQueryInfo(question, month, lang);
    const rawTokens = tokenize(question);
    const qt = expandQueryTokens(rawTokens);

    if (!qt.length || !indexedDocs.length) {
      return { hits: [], info, benchmark_ms: 0 };
    }

    const k1 = 1.5;
    const b = 0.75;
    const scored = [];

    for (let i = 0; i < indexedDocs.length; i++) {
      const d = indexedDocs[i];
      let bm = 0;
      let matchedTerms = 0;

      qt.forEach((w) => {
        if (d.tf[w] && idfTable[w]) {
          matchedTerms++;
          const tfVal = d.tf[w];
          const denom = tfVal + k1 * (1 - b + b * (d.len / (avgDocLength || 1.0)));
          bm += idfTable[w] * ((tfVal * (k1 + 1)) / denom);
        }
      });

      if (bm <= 0 || matchedTerms === 0) continue;

      // Calibrate BM25 into a [0, 1+] relevance score
      let score = bm / (bm + 2.5);

      if (info.month && d.record.month != null) {
        if (Number(d.record.month) === Number(info.month)) {
          score *= 1.5;
        } else {
          score *= 0.45;
        }
      }

      scored.push({ record: d.record, score: Math.min(1.0, score), bm });
    }

    scored.sort((a, b2) => b2.score - a.score);
    const hits = scored.slice(0, top_k);
    const t1 = typeof performance !== "undefined" ? performance.now() : Date.now();

    return {
      hits,
      info,
      benchmark_ms: Math.round((t1 - t0) * 100) / 100
    };
  }

  // ---- Step 4: AyurParam Provider Adapter ----
  const ENDPOINT_KEY = "ayurgarbha:v1:ayurparam_endpoint";

  function getEndpoint() {
    try {
      return (global.localStorage && global.localStorage.getItem(ENDPOINT_KEY)) || "";
    } catch (e) {
      return "";
    }
  }

  function setEndpoint(url) {
    try {
      if (!global.localStorage) return;
      const clean = String(url || "").trim();
      if (clean) global.localStorage.setItem(ENDPOINT_KEY, clean);
      else global.localStorage.removeItem(ENDPOINT_KEY);
    } catch (e) {
      /* ignore */
    }
  }

  /**
   * Builds AyurParam prompt within 2048-token budget.
   * Privacy: Receives ONLY question, month, lang, and top-3 retrieved records (NO name, age, or LMP).
   */
  function buildAyurParamPrompt(question, month, lang, top3) {
    const MAX_CONTEXT_CHARS = 3200; // leaves ample room within 2048 tokens for prompt + response
    let contextLines = [];
    let used = 0;
    for (const h of top3) {
      const r = h.record || h;
      const line = `[ID: ${r.id}] (${r.samhita} ${r.sthana} ${r.adhyaya}/${r.shloka_no_niimh}): ${r.hindi_summary}`;
      if (used + line.length > MAX_CONTEXT_CHARS) break;
      contextLines.push(line);
      used += line.length;
    }

    const instr =
      lang === "en"
        ? "Answer simply using ONLY the context above. Cite the record ID (e.g. [CH-SHA-8-32-m5]). Do not invent shlokas or dosages."
        : "केवल ऊपर दिए गए संदर्भ से सरल हिंदी में उत्तर दें। रिकॉर्ड ID (जैसे [CH-SHA-8-32-m5]) लिखें। कोई नया श्लोक या मात्रा न जोड़ें।";

    const monthStr = month ? `Month ${month}` : "General";
    return `<context>\n${contextLines.join("\n")}\n</context>\n<user>\n(${monthStr}, ${lang}) ${question}\n${instr}\n</user>\n<assistant>`;
  }

  async function callAyurParamAdapter(endpoint, payload) {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Strict privacy: only question, month, lang, prompt (never name, age, LMP)
      body: JSON.stringify({
        question: payload.question,
        month: payload.month,
        lang: payload.lang,
        prompt: payload.prompt,
        max_tokens: 384,
        trust_remote_code: true
      })
    });
    if (!res.ok) throw new Error("AyurParam endpoint error: " + res.status);
    const data = await res.json();
    return data.answer || data.text || data.generated_text || "";
  }

  // ---- Step 5: Citation Validator ----
  const CITATION_ID_RE = /\b(?:CH|SU)-SHA-\d+-\d+(?:-[a-z0-9_]+)?\b/gi;

  function validateCitations(answerText, retrievedIds) {
    const text = String(answerText || "").trim();
    if (!text) return { valid: false, citedIds: [], invalidIds: [], reason: "empty_answer" };

    const allowed = new Set((retrievedIds || []).map((id) => String(id).toUpperCase()));
    const found = text.match(CITATION_ID_RE) || [];
    const citedIds = Array.from(new Set(found.map((x) => x.toUpperCase())));
    const invalidIds = citedIds.filter((id) => !allowed.has(id));

    if (invalidIds.length > 0) {
      return {
        valid: false,
        citedIds,
        invalidIds,
        reason: "hallucinated_citation_id"
      };
    }
    return { valid: true, citedIds, invalidIds: [], reason: "ok" };
  }

  // ---- Step 6: Extractive Fallback ----
  function buildExtractiveAnswer(hits, lang) {
    if (!hits || !hits.length) return "";
    const top = hits[0].record;
    return top.hindi_summary || "";
  }

  // ---- Full Ask Pipeline (Spec Section 4) ----
  async function ask(question, ctx = {}) {
    ensureIndex();
    const q = String(question || "").trim();
    const info = detectQueryInfo(q, ctx.month || null, ctx.lang || "hi");

    // Step 1: Deterministic Red-Flag Check BEFORE search or AI
    if (typeof ctx.evaluateRedFlags === "function") {
      const rf = ctx.evaluateRedFlags({ text: q });
      if (rf && rf.triggered) {
        return {
          red_flag_blocked: true,
          red_flag_eval: rf,
          direct_answer: "",
          records: [],
          source: "red_flag_engine"
        };
      }
    }

    // Step 3: BM25 Top-3 on verified Tier A records
    const res = search(q, { top_k: 3, month: info.month, lang: info.lang });
    const hits = res.hits;
    const MIN_SCORE = 0.22;
    const topScore = hits[0] ? hits[0].score : 0;

    if (!hits.length || topScore < MIN_SCORE) {
      return {
        red_flag_blocked: false,
        out_of_corpus: true,
        direct_answer:
          info.lang === "en"
            ? "This is not in my available Samhita texts."
            : "यह मेरे उपलब्ध संहिता-पाठ में नहीं है।",
        records: [],
        filters: res.info,
        benchmark_ms: res.benchmark_ms,
        source: "out_of_corpus"
      };
    }

    const top3Records = hits.map((h) => h.record);
    const retrievedIds = top3Records.map((r) => r.id);
    let directAnswer = "";
    let source = "extractive_fallback";
    let validation = null;

    // Step 4 & 5: Optional AyurParam Adapter + Citation Validator
    const endpoint = ctx.endpoint != null ? ctx.endpoint : getEndpoint();
    if (endpoint) {
      try {
        const prompt = buildAyurParamPrompt(q, info.month, info.lang, hits);
        const adapterCall = ctx.adapterCall || callAyurParamAdapter;
        const aiText = await adapterCall(endpoint, {
          question: q,
          month: info.month,
          lang: info.lang,
          prompt
        });
        validation = validateCitations(aiText, retrievedIds);
        if (validation.valid) {
          directAnswer = aiText;
          source = "ayurparam";
        } else {
          // Reject hallucinated/external IDs and use Extractive Fallback
          directAnswer = buildExtractiveAnswer(hits, info.lang);
          source = "extractive_fallback_validator_rejected";
        }
      } catch (e) {
        // GPU/endpoint unavailable -> Extractive Fallback
        directAnswer = buildExtractiveAnswer(hits, info.lang);
        source = "extractive_fallback";
      }
    } else {
      // Step 6: Extractive Fallback
      directAnswer = buildExtractiveAnswer(hits, info.lang);
    }

    return {
      red_flag_blocked: false,
      out_of_corpus: false,
      direct_answer: directAnswer,
      records: top3Records,
      retrievedIds,
      validation,
      scores: hits.map((h) => ({ id: h.record.id, score: Math.round(h.score * 1000) / 1000 })),
      filters: res.info,
      benchmark_ms: res.benchmark_ms,
      source
    };
  }

  const RAG = {
    setRecords,
    ensureIndex,
    search,
    ask,
    detectQueryInfo,
    buildAyurParamPrompt,
    validateCitations,
    getEndpoint,
    setEndpoint,
    getDocCount() {
      ensureIndex();
      return indexedDocs.length;
    }
  };

  global.RAG = RAG;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = RAG;
  }
})(typeof window !== "undefined" ? window : globalThis);
