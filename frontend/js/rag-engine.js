/* =====================================================================
 * AyurGarbha — rag-engine.js
 * 100% CLIENT-SIDE DUAL-CITATION RAG ENGINE
 *
 * Runs entirely in the user's browser (<10ms execution, zero cold starts,
 * zero server dependencies). Fully compatible with Netlify static hosting.
 *
 * Algorithm:
 * - Multilingual Tokenizer (English, Sanskrit IAST, Devanagari)
 * - BM25Okapi Ranking (k1=1.5, b=0.75) + Vector Cosine Similarity Fusion
 * - Multilingual Intent & Entity Extractor (English, Hindi, Hinglish)
 * - Domain Filtering & Metadata Weighted Boosting
 * - AyurParam Clinical Dual-Citation Response Synthesizer:
 *     1. direct_answer (Hindi + English Clinical Synthesis)
 *     2. classical_citations (Sanskrit + IAST + Samhita Ref + Meaning)
 *     3. samprapti_yukti (Dosha-Dhatu-Agni-Ojas Rationale)
 *     4. dc_dutta_correlation (Modern Obstetric Correlation)
 *     5. red_flags (Obstetric Warning Signs)
 *     6. related_questions (3 Interactive Follow-up Questions)
 * ===================================================================== */
(function (global) {
  "use strict";

  const DISCLAIMER =
    "⚕️ Clinical Advisory: This guidance is for educational & wellness support based on Ayurvedic Samhitas and " +
    "standard obstetric guidelines. Always consult your Doctor / BAMS Physician before starting any medicine, " +
    "Basti, or dietary change.";

  const SAMHITA_NAMES = {
    charaka: "Charaka Samhita",
    sushruta: "Sushruta Samhita",
    ashtanga: "Ashtanga Hridaya",
    kashyapa: "Kashyapa Samhita",
    harita: "Harita Samhita",
    dcdutta: "DC Dutta's Textbook of Obstetrics",
    all: "Classical Samhitas"
  };

  const STOP_WORDS = new Set(
    (
      "a an the of and or to in is are for with what which how do does can i my me " +
      "should be at on by from it this that when why during kya kaise me mein aur " +
      "ya se ko ke ki ka hai hain tha thi"
    ).split(" ")
  );

  const TOKEN_REGEX = /[a-z0-9\u0900-\u097f]+/g;

  const ORDINAL_MONTHS = {
    first: 1, "1st": 1, second: 2, "2nd": 2, third: 3, "3rd": 3,
    fourth: 4, "4th": 4, fifth: 5, "5th": 5, sixth: 6, "6th": 6,
    seventh: 7, "7th": 7, eighth: 8, "8th": 8, ninth: 9, "9th": 9
  };

  const HINDI_MONTHS = {
    pehla: 1, pahla: 1, pratham: 1, prathama: 1,
    dusra: 2, doosra: 2, dwitiya: 2,
    tisra: 3, teesra: 3, tritiya: 3,
    chautha: 4, chauthe: 4, chaturtha: 4,
    panchva: 5, paanchva: 5, panchve: 5, pancham: 5,
    chhattha: 6, chatha: 6, chhathe: 6, shashtha: 6,
    saatva: 7, satva: 7, saatve: 7, saptam: 7,
    aathva: 8, athva: 8, aathve: 8, ashtam: 8,
    nauva: 9, nauve: 9, navam: 9
  };

  const RITU_ALIASES = {
    hemanta: ["hemanta", "hemant", "early winter"],
    shishira: ["shishira", "shishir", "late winter", "thand", "sheetkal"],
    vasanta: ["vasanta", "vasant", "spring", "basant"],
    grishma: ["grishma", "greeshm", "summer", "garmi"],
    varsha: ["varsha", "monsoon", "rainy", "barish", "barsat"],
    sharad: ["sharad", "autumn"]
  };

  function tokenize(text) {
    if (!text) return [];
    const matches = String(text).toLowerCase().match(TOKEN_REGEX);
    if (!matches) return [];
    return matches.filter((w) => !STOP_WORDS.has(w) && w.length > 1);
  }

  function getDocText(c) {
    const tags = c.keywords || c.tags || [];
    return [
      c.title || "",
      c.english || c.english_clinical_summary || "",
      c.hindi || c.hindi_meaning || "",
      c.dc_dutta || c.dc_dutta_correlation || "",
      c.samprapti_yukti || "",
      c.chapter_name || "",
      tags.join(" "),
      c.iast || c.transliteration || "",
      c.sanskrit || c.sanskrit_shloka || ""
    ].join(" ");
  }

  // ---- Engine State & In-Memory Index ----
  let corpusDocs = [];
  let indexedDocs = [];
  let idfTable = {};
  let avgDocLength = 0;
  let isIndexed = false;

  function ensureIndex() {
    if (isIndexed && indexedDocs.length > 0) return;
    const KB = global.KB;
    if (!KB || (!KB.SAMHITA_CORPUS && !KB.buildCorpus)) {
      console.warn("AyurGarbha RAG: Knowledge base not yet loaded.");
      return;
    }
    corpusDocs = KB.SAMHITA_CORPUS || (KB.buildCorpus ? KB.buildCorpus() : []);
    if (!corpusDocs || corpusDocs.length === 0) return;

    const N = corpusDocs.length;
    const df = {};

    indexedDocs = corpusDocs.map((c) => {
      const text = getDocText(c);
      const tokens = tokenize(text);
      const tf = {};
      tokens.forEach((w) => {
        tf[w] = (tf[w] || 0) + 1;
      });
      Object.keys(tf).forEach((w) => {
        df[w] = (df[w] || 0) + 1;
      });
      return {
        chunk: c,
        tokens,
        tf,
        len: tokens.length
      };
    });

    idfTable = {};
    Object.keys(df).forEach((w) => {
      idfTable[w] = Math.log(1 + (N - df[w] + 0.5) / (df[w] + 0.5));
    });

    avgDocLength =
      indexedDocs.reduce((acc, d) => acc + d.len, 0) / (N || 1.0);

    // Precalculate TF-IDF vectors for cosine similarity
    indexedDocs.forEach((d) => {
      const vec = {};
      let sq = 0;
      Object.keys(d.tf).forEach((w) => {
        const val = (1 + Math.log(d.tf[w])) * (idfTable[w] || 0);
        vec[w] = val;
        sq += val * val;
      });
      const norm = Math.sqrt(sq) || 1.0;
      const unit = {};
      Object.keys(vec).forEach((w) => {
        unit[w] = vec[w] / norm;
      });
      d.unitVec = unit;
    });

    isIndexed = true;
  }

  // ---- Filter & Intent Detection (English, Hindi, Hinglish) ----
  function detectFilters(query, ctxMonth, ctxRitu) {
    const ql = String(query || "").toLowerCase();
    const f = { month: null, ritu: null, samhita: null, stage: null, domain: null };

    // Month detection
    const mMatch =
      ql.match(/(?:month|masa|maas|mahina|maheena)\s*(\d)/) ||
      ql.match(/(\d)(?:st|nd|rd|th)?\s*(?:month|masa|maas|mahina|maheena)/);
    if (mMatch && Number(mMatch[1]) >= 1 && Number(mMatch[1]) <= 9) {
      f.month = Number(mMatch[1]);
    } else {
      for (const [k, v] of Object.entries(ORDINAL_MONTHS)) {
        const reg = new RegExp("\\b" + k + "\\s+(?:month|masa|maas|mahina)\\b");
        if (reg.test(ql)) {
          f.month = v;
          break;
        }
      }
      if (!f.month) {
        for (const [hk, v] of Object.entries(HINDI_MONTHS)) {
          const reg = new RegExp("\\b" + hk + "(?:\\s+(?:mahina|maas|masa|month))?\\b");
          if (reg.test(ql)) {
            f.month = v;
            break;
          }
        }
      }
    }

    // Ritu detection
    for (const [key, names] of Object.entries(RITU_ALIASES)) {
      if (names.some((n) => ql.includes(n))) {
        f.ritu = key;
        break;
      }
    }

    // Samhita detection
    if (/charaka|caraka/.test(ql)) f.samhita = "charaka";
    else if (/sushruta|susruta/.test(ql)) f.samhita = "sushruta";
    else if (/ashtanga|vagbhata|a\.h\./.test(ql)) f.samhita = "ashtanga";
    else if (/kashyapa|kasyapa/.test(ql)) f.samhita = "kashyapa";
    else if (/harita/.test(ql)) f.samhita = "harita";
    else if (/dc dutta|dutta|modern/.test(ql)) f.samhita = "dcdutta";

    // Clinical stage / domain detection
    if (
      /upadrava|chhardi|vomit|nausea|ulti|ji michla|shopha|swelling|edema|sujan|pandu|anemi|khoon.*kami|vibandha|constipat|kabz|garbhasrava|garbhapata|miscarriage|abortion|headache|shirahshoola|mutrakrichhra|dysuria|uti|peshab|jwara|fever|bukhar|leak|pprom|spandana|movement|kicks/.test(
        ql
      )
    ) {
      f.stage = "upadrava";
      f.domain = "garbhini";
    } else if (
      /sutika|postnatal|post-natal|postpartum|after delivery|prasav ke baad|delivery ke baad|puerper|lactation|breast ?milk|stanya|panchakola|udaraveshtana/.test(
        ql
      )
    ) {
      f.stage = "sutika";
      f.domain = "sutika";
    } else if (
      /newborn|navajata|neonat|baby care|jatakarma|cord|colostrum|swarna|swarnaprashan|ulva|shishu/.test(
        ql
      )
    ) {
      f.stage = "navajata";
      f.domain = "navajata";
    } else if (/red flag|danger|warning|emergency|khatra/.test(ql)) {
      f.stage = "red_flag";
      f.domain = "garbhini";
    } else if (
      /avoid|apathya|should not|harmful|garbhopaghat|teratogen|don'?t|nuksan|kya na khaye/.test(
        ql
      )
    ) {
      f.stage = "garbhopaghatakara";
      f.domain = "garbhini";
    } else if (
      /embryo|garbha vriddhi|fetal growth|dauhrida|ojas|kalala|development|milestone|bacche ka vikas/.test(
        ql
      )
    ) {
      f.stage = "garbha_vriddhi";
      f.domain = "garbhini";
    } else if (/dinacharya|daily routine|routine|brahma muhurta|abhyanga|snana/.test(ql)) {
      f.stage = "dinacharya";
      f.domain = "dinacharya";
    } else if (
      /ritucharya|season|summer|winter|monsoon|rain|autumn|spring|hemanta|shishira|vasanta|grishma|varsha|sharad|mausam/.test(
        ql
      )
    ) {
      f.stage = f.stage || "ritu";
      f.domain = "ritucharya";
    } else if (/prasava|labor|labour|delivery|childbirth/.test(ql)) {
      f.stage = "prasava";
      f.domain = "prasava";
    } else if (/ahara|vihara|diet|pathya|food|khana|ksheera|ghrita/.test(ql)) {
      f.domain = "ahara_vihara";
    }

    if (!f.month && ctxMonth && !f.stage && !f.ritu) f.month = ctxMonth;
    if (!f.ritu && ctxRitu && f.stage === "ritu") f.ritu = ctxRitu;
    return f;
  }

  // ---- BM25 + Cosine Search Execution ----
  function search(question, options = {}) {
    ensureIndex();
    const t0 = performance.now();
    const {
      top_k = 5,
      month = null,
      ritu = null,
      samhita = null,
      stage = null,
      domain = null,
      strict = false
    } = options;

    const qt = tokenize(question);
    const f = detectFilters(question, month, ritu);

    // Explicit caller overrides
    if (strict && month) f.month = month;
    if (strict && ritu) f.ritu = ritu;
    if (samhita && samhita !== "all") f.samhita = samhita;
    if (stage) f.stage = stage;
    if (domain && domain !== "all") f.domain = domain;

    if (!qt.length || !indexedDocs.length) {
      return { hits: [], filters: f, benchmark_ms: 0 };
    }

    // Query TF-IDF vector
    const qtf = {};
    qt.forEach((w) => {
      qtf[w] = (qtf[w] || 0) + 1;
    });

    const qVec = {};
    let qSq = 0;
    Object.keys(qtf).forEach((w) => {
      if (idfTable[w]) {
        const val = (1 + Math.log(qtf[w])) * idfTable[w];
        qVec[w] = val;
        qSq += val * val;
      }
    });
    const qNorm = Math.sqrt(qSq) || 1.0;
    Object.keys(qVec).forEach((w) => {
      qVec[w] = qVec[w] / qNorm;
    });

    const k1 = 1.5;
    const b = 0.75;
    const rawScores = new Float64Array(indexedDocs.length);
    let maxBm = 0;
    let minBm = Infinity;
    let maxCos = 0;
    let minCos = Infinity;

    // Pass 1: Raw BM25 and Cosine
    const bmArray = new Float64Array(indexedDocs.length);
    const cosArray = new Float64Array(indexedDocs.length);

    for (let i = 0; i < indexedDocs.length; i++) {
      const d = indexedDocs[i];
      let bm = 0;
      qt.forEach((w) => {
        if (d.tf[w] && idfTable[w]) {
          const tfVal = d.tf[w];
          const denom = tfVal + k1 * (1 - b + b * (d.len / (avgDocLength || 1.0)));
          bm += idfTable[w] * ((tfVal * (k1 + 1)) / denom);
        }
      });
      bmArray[i] = bm;
      if (bm > maxBm) maxBm = bm;
      if (bm < minBm) minBm = bm;

      let cos = 0;
      Object.keys(qVec).forEach((w) => {
        if (d.unitVec[w]) {
          cos += qVec[w] * d.unitVec[w];
        }
      });
      cosArray[i] = cos;
      if (cos > maxCos) maxCos = cos;
      if (cos < minCos) minCos = cos;
    }

    const bmSpan = maxBm - minBm || 1.0;
    const cosSpan = maxCos - minCos || 1.0;

    // Pass 2: Fused Normalization + Metadata Boost
    for (let i = 0; i < indexedDocs.length; i++) {
      const d = indexedDocs[i];
      const c = d.chunk;
      const normBm = maxBm > minBm ? (bmArray[i] - minBm) / bmSpan : 0;
      const normCos = maxCos > minCos ? (cosArray[i] - minCos) / cosSpan : 0;
      let s = 0.6 * normBm + 0.4 * normCos;

      if (bmArray[i] <= 0 && cosArray[i] <= 0) {
        if (!f.month && !f.ritu && !f.stage && !f.domain) {
          rawScores[i] = 0;
          continue;
        }
        s = 0.05; // Base metadata matching when zero textual overlap
      }

      // Metadata boosts
      if (f.month) {
        if (c.month === f.month) s *= 2.2;
        else if (c.month && c.month !== f.month) s *= 0.15;
      }
      if (f.ritu) {
        if (c.ritu === f.ritu) s *= 2.5;
        else if (c.ritu && c.ritu !== f.ritu) s *= 0.2;
      }
      if (f.samhita && c.samhita === f.samhita) {
        s *= 1.8;
      }
      if (f.stage && c.stage === f.stage) {
        s *= 2.0;
      }
      if (f.domain) {
        const dTarget = f.domain.toLowerCase();
        const cDomain = (c.domain || c.stage || "").toLowerCase();
        if (cDomain.includes(dTarget) || dTarget.includes(cDomain)) {
          s *= 2.2;
        } else if (
          dTarget === "garbhini" &&
          ["masanumasika", "garbha_vriddhi", "garbhopaghatakara", "upadrava"].includes(c.stage)
        ) {
          s *= 2.0;
        } else if (
          ["prasava", "sutika"].includes(dTarget) &&
          ["prasava", "sutika"].includes(c.stage)
        ) {
          s *= 2.0;
        } else if (
          ["navajata", "bala"].includes(dTarget) &&
          ["navajata", "bala"].includes(c.stage)
        ) {
          s *= 2.0;
        } else if (
          dTarget === "ahara_vihara" &&
          ["ahara_vihara", "masanumasika", "ritu"].includes(c.stage)
        ) {
          s *= 1.8;
        }
      }

      // Hard filters if explicitly passed
      if (samhita && c.samhita !== samhita && c.samhita !== "all") {
        s = 0.0;
      }
      if (stage && c.stage !== stage) {
        s = 0.0;
      }

      rawScores[i] = s;
    }

    // Rank and take top_k
    const ranked = [];
    for (let i = 0; i < indexedDocs.length; i++) {
      if (rawScores[i] > 0) {
        ranked.push({ chunk: indexedDocs[i].chunk, score: rawScores[i] });
      }
    }
    ranked.sort((a, b) => b.score - a.score);
    const topHits = ranked.slice(0, top_k);
    const t1 = performance.now();

    return {
      hits: topHits,
      filters: f,
      benchmark_ms: Math.round((t1 - t0) * 100) / 100
    };
  }

  function shortText(text, maxLen = 950) {
    if (!text || text.length <= maxLen) return text || "";
    return text.slice(0, maxLen).replace(/\s+\S*$/, "") + "…";
  }

  function composeAnswer(hits) {
    if (!hits || !hits.length) return "";
    const top = hits[0].chunk;
    const stage = top.stage || "";

    if (stage === "masanumasika") {
      const month = top.month;
      const parts = [];
      hits.forEach((h) => {
        const c = h.chunk;
        if (c.stage === "masanumasika" && c.month === month) {
          const sName = SAMHITA_NAMES[c.samhita] || "Classical";
          const summary = (c.english || c.english_clinical_summary || "").split(" Pathya:")[0];
          parts.push(`${sName}: ${summary}`);
        }
      });
      const plan = top.plan || {};
      let extra = "";
      if (plan.pathya && plan.pathya.length) {
        extra =
          ` Pathya: ${plan.pathya.slice(0, 3).join("; ")}.` +
          (plan.ksheera ? ` Ksheera/Ghrita: ${plan.ksheera.name} — ${plan.ksheera.detail}.` : "") +
          (plan.rationale ? ` Rationale: ${plan.rationale}` : "");
      }
      return shortText(`Month ${month} Garbhini Paricharya — ` + parts.join(" "), 950) + extra;
    } else if (stage === "upadrava") {
      const plan = top.plan || {};
      const acts = plan.actions ? plan.actions.slice(0, 3).join("; ") : "";
      const en = top.english || top.english_clinical_summary || "";
      return `${top.title}: ${en}${acts ? " First-line clinical advice: " + acts : ""}`;
    }

    const en = top.english || top.english_clinical_summary || "";
    const hi = top.hindi || top.hindi_meaning || "";
    if (hi && !hi.startsWith("Shloka")) {
      return `${en}\n\n[हिन्दी व्याख्या]: ${hi}`;
    }
    return shortText(en, 950);
  }

  // ---- AyurParam Synthesizer ----
  function ask(question, ctx = {}) {
    ensureIndex();
    const month = ctx.month || null;
    const ritu = ctx.ritu || null;
    const domain = ctx.domain && ctx.domain !== "all" ? ctx.domain : null;
    const samhita = ctx.samhita && ctx.samhita !== "all" ? ctx.samhita : null;
    const top_k = ctx.top_k || 5;

    const res = search(question, {
      month,
      ritu,
      domain,
      samhita,
      top_k
    });

    const hits = res.hits;
    const filters = res.filters;

    if (!hits || !hits.length) {
      return {
        direct_answer:
          "No specific passage found for this exact query. Try querying by month (e.g. 'diet in the 5th month'), a Ritu (e.g. 'Grishma / summer'), Sutika Paricharya, newborn care, or red-flag obstetric symptoms.",
        classical_citations: [],
        samprapti_yukti:
          "In classical Ayurvedic obstetric care, Vata Anulomana, Agni Rakshana, and Dhatu Poshana form the tripartite foundation of maternal-fetal health.",
        dc_dutta_correlation:
          "Standard modern antenatal care includes regular BP, weight, symphysio-fundal height monitoring, fetal heart auscultation, and anomaly screening.",
        modern_obstetric_correlation:
          "Standard modern antenatal care includes regular BP, weight, symphysio-fundal height monitoring, fetal heart auscultation, and anomaly screening.",
        red_flags: [
          "Any bleeding PV, severe headache, blurred vision, reduced fetal movement, or fever requires same-day medical review."
        ],
        related_questions: [
          "4th Month me Dauhrida ka kya mahatva hai?",
          "8th Month me Ojas asthir kyun hota hai aur kya khayein?",
          "Sutika paricharya me Panchakola Yavagu aur Udaraveshtana kab karein?"
        ],
        safety_disclaimer: DISCLAIMER,
        filters,
        matches: [],
        benchmark_ms: res.benchmark_ms,
        source: "client_bm25"
      };
    }

    // Top citations
    const citations = [];
    hits.forEach((h) => {
      const c = h.chunk;
      const sa = c.sanskrit || c.sanskrit_shloka || "";
      if (sa && citations.length < 4) {
        citations.push({
          samhita: SAMHITA_NAMES[c.samhita] || "Classical Samhita",
          title: c.title || "",
          sanskrit: sa,
          iast: c.iast || c.transliteration || "",
          hindi: c.hindi || c.hindi_meaning || "",
          english: (c.english || c.english_clinical_summary || "")
            .split(" Pathya:")[0]
            .split(" Dosha state:")[0],
          reference: c.citation || "",
          sthana: c.sthana || "",
          chapter_name: c.chapter_name || "",
          verse: c.verse || ""
        });
      }
    });

    // Red flags aggregation
    const redFlags = [];
    hits.forEach((h) => {
      (h.chunk.red_flags || []).forEach((r) => {
        if (!redFlags.includes(r) && redFlags.length < 6) {
          redFlags.push(r);
        }
      });
    });
    if (!redFlags.length) {
      redFlags.push(
        "Any vaginal bleeding, fluid rush, severe persistent headache, or reduced fetal movements requires immediate hospital evaluation."
      );
    }

    // Samprapti Yukti
    const topChunk = hits[0].chunk;
    const yukti =
      topChunk.samprapti_yukti ||
      "Vata Anulomana is prioritized to prevent spasmodic pain and preserve uterine quiescence. " +
      "Madhura and Snigdha Ahara nourish Rasa Dhatu, ensuring uninterrupted Upasneha diffusion through the placenta.";

    // DC Dutta correlation
    let dcDutta = "";
    for (const h of hits) {
      const d = h.chunk.dc_dutta || h.chunk.dc_dutta_correlation;
      if (d) {
        dcDutta = d;
        break;
      }
    }
    if (!dcDutta) {
      dcDutta =
        "Correlates with routine antenatal maternal-fetal surveillance, nutritional adequacy, and risk factor identification per standard obstetric protocols.";
    }

    // Related questions
    const relQuestions = [];
    hits.forEach((h) => {
      (h.chunk.related_questions || []).forEach((q) => {
        if (!relQuestions.includes(q) && relQuestions.length < 3) {
          relQuestions.push(q);
        }
      });
    });
    if (relQuestions.length < 3) {
      const defaults = [
        "Dauhrida avamana se fetus me kya upadrava ho sakte hain?",
        "8th month me Ojas rakshana ke liye ksheera-yavagu kaise banayein?",
        "DC Dutta ke anusaar preeclampsia aur hyperemesis ke warning signs kya hain?"
      ];
      defaults.forEach((dq) => {
        if (!relQuestions.includes(dq) && relQuestions.length < 3) {
          relQuestions.push(dq);
        }
      });
    }

    // Extract structured Month-Wise Pathya & Apathya for clinical nutritional guidance
    let pathya = [];
    let apathya = [];
    let ksheeraRegimen = null;
    const targetMonth =
      filters.month ||
      (topChunk && topChunk.month) ||
      month;

    if (targetMonth && targetMonth >= 1 && targetMonth <= 9) {
      if (global.KB && global.KB.getMonth) {
        const mObj = global.KB.getMonth(targetMonth);
        if (mObj) {
          pathya = mObj.pathya ? [...mObj.pathya] : [];
          apathya = mObj.avoid ? [...mObj.avoid] : [];
          ksheeraRegimen = mObj.ksheera || null;
        }
      }
    }

    // If query was diet or ahara/vihara related or pathya was not found yet
    if (!pathya.length && topChunk && topChunk.plan && topChunk.plan.pathya) {
      pathya = [...topChunk.plan.pathya];
    }
    if (!apathya.length && topChunk && topChunk.plan && topChunk.plan.avoid) {
      apathya = [...topChunk.plan.avoid];
    }
    if (!ksheeraRegimen && topChunk && topChunk.plan && topChunk.plan.ksheera) {
      ksheeraRegimen = topChunk.plan.ksheera;
    }

    // Universal Garbhopaghatakara Apathya if query mentions diet, avoid, food, or a month
    const isDietOrMonthQuery = Boolean(
      targetMonth ||
      filters.domain === "ahara_vihara" ||
      filters.stage === "garbhopaghatakara" ||
      /diet|food|ahara|pathya|apathya|avoid|khana|poshan|nutrition|month|masa|maas|mahina/.test(String(question || "").toLowerCase())
    );

    if (isDietOrMonthQuery) {
      if (!pathya.length) {
        pathya = [
          "Madhura, Snigdha, Sheeta, Hridya ahara (sweet, unctuous, cooling, nourishing foods)",
          "Fresh cow's milk (Ksheera) boiled with country sugar or medicated herbs",
          "Pure cow's ghee (Go-Ghrita) daily with warm meals",
          "Shashtika Shali (aged red rice), wheat, moong dal soup (Mudga Yusha)",
          "Sweet seasonal fruits (pomegranate, sweet grapes, amla, soaked almonds)"
        ];
      }
      if (!apathya.length) {
        apathya = [
          "Katu, Tikshna, Atilavana (excessive chilli, pickles, pungent spices, vinegar)",
          "Ruksha, Paryushita (stale, deep-fried, packaged or cold-stored food)",
          "Viruddha Ahara (incompatible combinations: equal milk + fish, fruit + milk)",
          "Raw papaya, large quantities of pineapple, alcohol, tobacco & caffeine excess",
          "Tikshna purgatives, unprescribed herbs, and suppression of natural urges (Vega-dharana)"
        ];
      }
    }

    return {
      direct_answer: composeAnswer(hits),
      classical_citations: citations,
      samprapti_yukti: yukti,
      dc_dutta_correlation: dcDutta,
      modern_obstetric_correlation: dcDutta,
      pathya,
      apathya,
      ksheera_regimen: ksheeraRegimen,
      target_month: targetMonth || null,
      red_flags: redFlags,
      related_questions: relQuestions,
      safety_disclaimer: DISCLAIMER,
      filters,
      matches: hits.map((h) => ({
        id: h.chunk.id,
        title: h.chunk.title,
        score: Math.round(h.score * 1000) / 1000
      })),
      benchmark_ms: res.benchmark_ms,
      source: "client_bm25"
    };
  }

  const RAG = {
    search,
    ask,
    ensureIndex,
    isReady() {
      return isIndexed && indexedDocs.length > 0;
    },
    getDocCount() {
      return indexedDocs.length;
    },
    getVocabSize() {
      return Object.keys(idfTable).length;
    }
  };

  // Immediate eager indexing on script load if KB is available
  try {
    ensureIndex();
  } catch (e) {
    /* lazy initialization will trigger on first query */
  }

  global.RAG = RAG;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = RAG;
  }
})(typeof window !== "undefined" ? window : globalThis);
