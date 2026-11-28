/* =====================================================================
 * AyurGarbha — app.js
 * Phase 2: Splash -> Consent -> Acts -> Details Form -> 6-Card Home
 * Light Theme, Hindi (default) + English toggle, localStorage-only.
 * ===================================================================== */
(function () {
  "use strict";
  const KB = window.KB, DB = window.DB;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const E = (s) =>
    String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[c]));
  const todayStr = () => new Date().toISOString().slice(0, 10);
  const fmtDate = (s) => {
    if (!s) return "—";
    const d = new Date(s + (s.length === 10 ? "T00:00:00" : ""));
    return isNaN(d) ? s : d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  };

  /* ------------------- Bilingual Translations (हिन्दी Default + English) ------------------- */
  const I18N = {
    hi: {
      brandSub: "गर्भिणी परिचर्या मार्गदर्शन · चरक व सुश्रुत",
      langBtn: "English (EN)",
      skip: "आगे बढ़ें / Skip →",
      splashSub: "गर्भिणी परिचर्या · चरक व सुश्रुत संहिता आधारित मार्गदर्शन",
      consentTitle: "सहमति एवं गोपनीयता सूचना (Consent)",
      consentPoints: [
        "आपका सारा व्यक्तिगत डेटा (नाम, आयु, LMP, माह) केवल इसी फ़ोन के ब्राउज़र (localStorage) में सुरक्षित रहेगा।",
        "जब आप कोई प्रश्न पूछेंगी, तो केवल पूछे गए सवाल का पाठ सर्वर पर जाएगा (नाम, आयु या LMP कभी नहीं जाएँगे)।",
        "यह ऐप केवल शैक्षिक एवं स्वास्थ्य संवर्धन मार्गदर्शन है — यह चिकित्सा सलाह या निदान नहीं है।"
      ],
      consentAgree: "सहमत हूँ — मैंने उपरोक्त सभी बिंदु पढ़ और समझ लिए हैं।",
      consentNext: "आगे बढ़ें →",
      consentNeedCheck: "कृपया आगे बढ़ने के लिए 'सहमत हूँ' पर टिक करें।",
      actsTitle: "कानूनी सूचना एवं स्वास्थ्य अस्वीकरण",
      dpdpTitle: "🔒 DPDP Act 2023 (डेटा गोपनीयता)",
      dpdpText: "भारत के डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम 2023 के अनुरूप: आपका डेटा आपके डिवाइस पर ही रहता है और आप किसी भी समय 'मेरा डेटा मिटाएँ' से इसे स्थायी रूप से हटा सकती हैं।",
      medTitle: "⚕️ चिकित्सा अस्वीकरण (Medical Disclaimer)",
      medText: "यहाँ दी गई जानकारी केवल सामान्य शैक्षिक मार्गदर्शन हेतु है। किसी भी औषधि, काढ़ा, बस्ति या आहार परिवर्तन से पूर्व योग्य आयुर्वेदिक/प्रसूति चिकित्सक से परामर्श अवश्य लें।",
      emgTitle: "🚨 आपातकालीन सेवा — 108",
      emgText: "योनि से रक्तस्राव, पानी छूटना, तेज़ सिरदर्द, धुँधला दिखना, दौरे या शिशु की हलचल कम होने पर बिना देरी किए 108 पर कॉल करें या तुरंत अस्पताल जाएँ।",
      actsNext: "समझ लिया, आगे बढ़ें →",
      formTitle: "गर्भिणी विवरण फ़ॉर्म",
      formDesc: "आपका डेटा केवल इसी फ़ोन में सेव होगा। कृपया अपनी जानकारी भरें:",
      nameLabel: "नाम (वैकल्पिक)",
      namePh: "जैसे: प्रिया",
      ageLabel: "आयु (वर्ष) *",
      agePh: "जैसे: 26",
      modeLmp: "LMP तिथि से गणना करें",
      modeMonth: "वर्तमान माह (1–9) चुनें",
      lmpLabel: "अंतिम मासिक धर्म की तिथि (LMP) *",
      monthLabel: "वर्तमान गर्भ माह (1–9) *",
      langLabel: "पसंदीदा भाषा (Language)",
      firstPregLabel: "क्या यह आपकी पहली गर्भावस्था है?",
      yes: "हाँ (पहली गर्भावस्था)",
      no: "नहीं",
      calcTitle: "गणना परिणाम",
      calcWeeks: "गर्भ सप्ताह",
      calcMonth: "वर्तमान माह",
      calcEdd: "अनुमानित प्रसव-तिथि (EDD)",
      saveForm: "सहेजें और होम पर जाएँ →",
      deleteMyData: "मेरा डेटा मिटाएँ",
      homeGreeting: "नमस्ते",
      editProfile: "✏️ विवरण बदलें",
      backHome: "← होम पर लौटें",
      askTitle: "पूछें (Ask AyurGarbha)",
      askDesc: "गर्भावस्था से जुड़ा अपना प्रश्न पूछें (संहिता-आधारित मार्गदर्शन)।",
      askBtn: "प्रश्न पूछें →",
      emgStripTitle: "आपातकाल में तुरंत 108 पर कॉल करें",
      emgStripDesc: "रक्तस्राव, पानी छूटना, तेज़ सिरदर्द, दौरे या शिशु की हलचल कम होने पर तुरंत अस्पताल जाएँ।",
      call108: "📞 108 कॉल करें",
      sections: [
        { id: "lakshana", num: "सेक्शन 1", ic: "🌸", title: "सद्योगृहीत गर्भ के लक्षण", desc: "गर्भधारण के प्रारंभिक लक्षण एवं विपरीत लक्षण चेतावनी" },
        { id: "dos_donts", num: "सेक्शन 2", ic: "🥗", title: "Do's & Don'ts", desc: "आहार, विहार और मासानुमासिक परिचर्या" },
        { id: "psychology", num: "सेक्शन 3", ic: "🧘‍♀️", title: "साइकोलॉजी बूस्ट", desc: "दौहृद, मन की शांति, ब्रीदिंग और मानसिक स्वास्थ्य" },
        { id: "minor", num: "सेक्शन 4", ic: "🌿", title: "छोटी तकलीफ़ें", desc: "छर्दि, शोफ, कब्ज़, सिरदर्द, अनिद्रा, पीठ दर्द" },
        { id: "high_risk", num: "सेक्शन 5", ic: "🚨", title: "हाई-रिस्क लक्षण (उपद्रव)", desc: "तुरंत अस्पताल / 108 आपातकालीन संकेत" },
        { id: "fetus", num: "सेक्शन 6", ic: "👶", title: "Know Your Fetus", desc: "माह 1–10 गर्भ का क्रमिक विकास" }
      ],
      placeholderMsg: "यह सेक्शन Phase 3 में सत्यापित संहिता श्लोकों और सामग्री के साथ जोड़ा जाएगा।"
    },
    en: {
      brandSub: "Garbhini Paricharya Guidance · Charaka & Sushruta",
      langBtn: "हिन्दी (HI)",
      skip: "Skip →",
      splashSub: "Garbhini Paricharya · Guidance from Charaka & Sushruta Samhita",
      consentTitle: "Consent & Privacy Notice",
      consentPoints: [
        "All your personal data (name, age, LMP, month) stays strictly on this phone in localStorage.",
        "When you ask a question, only the question text goes to the server (never your name, age, or LMP).",
        "This app provides educational & wellness guidance only — it is not medical advice."
      ],
      consentAgree: "I Agree — I have read and understood the above points.",
      consentNext: "Continue →",
      consentNeedCheck: "Please tick 'I Agree' before continuing.",
      actsTitle: "Acts & Disclaimers",
      dpdpTitle: "🔒 DPDP Act 2023 (Data Privacy)",
      dpdpText: "Aligned with India's Digital Personal Data Protection Act 2023: your records stay on your device, and you can permanently erase them anytime using 'Delete My Data'.",
      medTitle: "⚕️ Medical Disclaimer",
      medText: "Information here is for educational & wellness support only. Always consult a qualified physician before taking any herb, formulation, or changing your diet.",
      emgTitle: "🚨 Emergency Helpline — 108",
      emgText: "In case of vaginal bleeding, fluid leak, severe headache, blurred vision, seizures, or reduced fetal movement, call 108 or go to the nearest hospital immediately.",
      actsNext: "Understood, Continue →",
      formTitle: "Maternal Details Form",
      formDesc: "Your details stay only on this device. Please fill in your information:",
      nameLabel: "Name (Optional)",
      namePh: "e.g. Priya",
      ageLabel: "Age (Years) *",
      agePh: "e.g. 26",
      modeLmp: "Calculate from LMP Date",
      modeMonth: "Select Current Month (1–9)",
      lmpLabel: "Last Menstrual Period (LMP) *",
      monthLabel: "Current Pregnancy Month (1–9) *",
      langLabel: "Preferred Language",
      firstPregLabel: "Is this your first pregnancy?",
      yes: "Yes (First Pregnancy)",
      no: "No",
      calcTitle: "Calculated Summary",
      calcWeeks: "Gestational Weeks",
      calcMonth: "Current Month",
      calcEdd: "Estimated Due Date (EDD)",
      saveForm: "Save & Go to Home →",
      deleteMyData: "Delete My Data",
      homeGreeting: "Namaste",
      editProfile: "✏️ Edit Details",
      backHome: "← Back to Home",
      askTitle: "Ask (पूछें)",
      askDesc: "Ask a pregnancy-related question grounded in Samhita texts.",
      askBtn: "Open Ask →",
      emgStripTitle: "Call 108 Immediately in Emergency",
      emgStripDesc: "Seek urgent hospital care for bleeding, fluid leak, severe headache, seizures, or reduced fetal movement.",
      call108: "📞 Call 108",
      sections: [
        { id: "lakshana", num: "Section 1", ic: "🌸", title: "Early Signs of Conception", desc: "Sadyogrihita Garbha Lakshana & warning signs" },
        { id: "dos_donts", num: "Section 2", ic: "🥗", title: "Do's & Don'ts", desc: "Ahara, Vihara & Month-wise Masanumasika regimen" },
        { id: "psychology", num: "Section 3", ic: "🧘‍♀️", title: "Psychology Boost", desc: "Dauhrida, calmness, breathing & mental wellbeing" },
        { id: "minor", num: "Section 4", ic: "🌿", title: "Minor Discomforts", desc: "Nausea, swelling, constipation, headache, backache" },
        { id: "high_risk", num: "Section 5", ic: "🚨", title: "High-Risk Signs (Upadrava)", desc: "Urgent hospital / 108 emergency indicators" },
        { id: "fetus", num: "Section 6", ic: "👶", title: "Know Your Fetus", desc: "Month 1–10 sequential fetal development" }
      ],
      placeholderMsg: "This section will be populated with verified Samhita verses and guidance in Phase 3."
    }
  };

  const S = {
    lang: localStorage.getItem("ayur_lang") || "hi",
    screen: "splash", // splash | consent | acts | form | home | section | ask | help
    activeSection: null,
    lakshanaTab: "signs", // signs | opposite
    dosTab: "monthly", // ahara | vihara | monthly
    dosMonth: null,
    minorSym: "chhardi",
    fetusMonth: null,
    highRiskSelected: [],
    epdsAnswers: {},
    epdsResult: null,
    breathingActive: false,
    breathingTimer: null,
    consentChecked: false,
    formInputMode: "lmp",
    splashTimer: null,
    askQuery: "",
    askResult: null,
    askLoading: false,
    showAskSettings: false
  };

  /* ------------------- Rule-Based Red-Flag Engine (Phase 4) ------------------- */
  const HIGH_RISK_LIST = [
    {
      id: "bleeding",
      hi: "योनि से रक्तस्राव",
      en: "Vaginal bleeding",
      pattern: /bleed|bleeding|haemorrhage|hemorrhage|spotting|blood|रक्त|रक्तस्राव|खून|पुष्प/i
    },
    {
      id: "fluid",
      hi: "पानी छूटना (झिल्ली फटना)",
      en: "Amniotic fluid leaking",
      pattern: /leak|leaking|water broke|fluid gush|amniotic|pprom|पानी जाना|पानी छूटना|द्रव स्राव/i
    },
    {
      id: "headache_vision",
      hi: "तेज़ सिरदर्द या धुँधला दिखना",
      en: "Severe headache or blurred vision",
      pattern: /severe headache|throbbing headache|blurred vision|blur|spots before eyes|तेज़ सिरदर्द|धुंधला|धुँधला|अंधेरा/i
    },
    {
      id: "seizure",
      hi: "दौरे (Convulsions)",
      en: "Seizures / Convulsions",
      pattern: /seizure|convulsion|fits|eclampsia|दौरा|दौरे|झटका/i
    },
    {
      id: "fetal_movement",
      hi: "शिशु की हलचल कम होना",
      en: "Reduced or absent fetal movements",
      pattern: /reduced movement|decreased movement|no movement|absent movement|less kick|कम हलचल|हलचल कम|हिल नहीं रहा/i
    },
    {
      id: "fever",
      hi: "तेज़ बुखार",
      en: "High fever",
      pattern: /high fever|chills|shivering|तेज़ बुखार|कंपकंपी|बुखार/i
    },
    {
      id: "vomiting",
      hi: "लगातार उल्टी (कुछ भी न पचना)",
      en: "Persistent vomiting",
      pattern: /persistent vomit|continuous vomit|hyperemesis|लगातार उल्टी|बार-बार उल्टी/i
    },
    {
      id: "abdominal_pain",
      hi: "पेट में तेज़ दर्द",
      en: "Severe abdominal pain",
      pattern: /severe abdominal pain|intense pelvic pain|तेज़ दर्द|असहनीय दर्द|पेट में तेज़/i
    }
  ];

  function evaluateRedFlags({ text = "", selectedIds = [] } = {}) {
    const alerts = [];
    const seen = new Set();
    const sel = Array.isArray(selectedIds) ? selectedIds : [];
    const txt = String(text || "");

    HIGH_RISK_LIST.forEach((rf) => {
      const matchedId = sel.includes(rf.id);
      const matchedTxt = txt ? rf.pattern.test(txt) : false;
      if ((matchedId || matchedTxt) && !seen.has(rf.id)) {
        seen.add(rf.id);
        alerts.push({ id: rf.id, hi: rf.hi, en: rf.en });
      }
    });

    return {
      triggered: alerts.length > 0,
      blockAI: alerts.length > 0,
      alerts,
      bannerHTML(lang = S.lang) {
        if (!alerts.length) return "";
        const isHi = lang === "hi";
        return `
        <div class="emergency-banner-critical" role="alert">
          <div class="emergency-banner-title">
            <span>🚨</span>
            <b>${isHi ? "तुरंत अस्पताल जाएँ / 108 पर कॉल करें" : "Go to Hospital Immediately / Call 108"}</b>
          </div>
          <ul class="emergency-reasons-list">
            ${alerts.map((a) => `<li>${E(isHi ? a.hi : a.en)}</li>`).join("")}
          </ul>
          <div class="emergency-banner-action">
            <a href="tel:108" class="btn btn-primary btn-sm">📞 ${isHi ? "108 पर कॉल करें" : "Call 108"}</a>
            <span class="small" style="color:var(--crimson-d);">${isHi ? "विलंब न करें — यह आपातकालीन संकेत है।" : "Do not delay — urgent medical attention is required."}</span>
          </div>
        </div>`;
      }
    };
  }

  const t = (k) => {
    const dict = I18N[S.lang] || I18N.hi;
    return dict[k] != null ? dict[k] : I18N.hi[k] != null ? I18N.hi[k] : k;
  };

  function toast(msg, err) {
    const el = $("#toast");
    if (!el) return;
    el.textContent = msg;
    el.className = "toast" + (err ? " err" : "");
    el.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => (el.hidden = true), 3200);
  }

  function clearSplashTimer() {
    if (S.splashTimer) {
      clearTimeout(S.splashTimer);
      S.splashTimer = null;
    }
  }

  function nextAfterSplash() {
    clearSplashTimer();
    if (!DB.hasConsent()) {
      S.screen = "consent";
    } else if (!DB.hasActsAck()) {
      S.screen = "acts";
    } else if (!DB.getSelfProfile()) {
      S.screen = "form";
    } else {
      S.screen = "home";
    }
    render();
  }

  /* ------------------- 1. SPLASH (SVG/CSS Lotus, 3–4s) ------------------- */
  function viewSplash() {
    return `
    <section class="splash-screen" aria-label="AyurGarbha Splash">
      <div class="lotus-wrap" aria-hidden="true">
        <div class="lotus-glow"></div>
        <svg class="lotus-svg" viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="petalGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#f43f5e" stop-opacity="0.95"/>
              <stop offset="100%" stop-color="#be123c" stop-opacity="0.9"/>
            </linearGradient>
            <linearGradient id="petalInner" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#fb7185" stop-opacity="0.96"/>
              <stop offset="100%" stop-color="#e11d48" stop-opacity="0.92"/>
            </linearGradient>
            <radialGradient id="goldCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#fef08a"/>
              <stop offset="60%" stop-color="#f59e0b"/>
              <stop offset="100%" stop-color="#d97706" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <!-- Outer petals -->
          <path class="lotus-petal p1" d="M100,136 C55,134 26,108 22,74 C52,78 80,98 100,136 Z" fill="url(#petalGrad)"/>
          <path class="lotus-petal p2" d="M100,136 C145,134 174,108 178,74 C148,78 120,98 100,136 Z" fill="url(#petalGrad)"/>
          <path class="lotus-petal p3" d="M100,136 C60,124 38,88 46,48 C74,64 92,94 100,136 Z" fill="url(#petalGrad)"/>
          <path class="lotus-petal p4" d="M100,136 C140,124 162,88 154,48 C126,64 108,94 100,136 Z" fill="url(#petalGrad)"/>
          <!-- Inner petals -->
          <path class="lotus-petal p5" d="M100,138 C70,114 62,72 74,34 C90,58 98,94 100,138 Z" fill="url(#petalInner)"/>
          <path class="lotus-petal p6" d="M100,138 C130,114 138,72 126,34 C110,58 102,94 100,138 Z" fill="url(#petalInner)"/>
          <path class="lotus-petal p7" d="M100,138 C82,108 82,62 100,22 C118,62 118,108 100,138 Z" fill="url(#petalInner)"/>
          <!-- Base leaves -->
          <path class="lotus-petal p8" d="M100,140 C68,144 40,136 26,120 C52,124 76,130 100,140 Z" fill="#047857" opacity="0.8"/>
          <path class="lotus-petal p9" d="M100,140 C132,144 160,136 174,120 C148,124 124,130 100,140 Z" fill="#047857" opacity="0.8"/>
          <!-- Golden glow core -->
          <circle class="lotus-center" cx="100" cy="96" r="18" fill="url(#goldCore)"/>
        </svg>
      </div>
      <h1 class="splash-title">आयुर्गर्भ</h1>
      <p class="splash-sub">${E(t("splashSub"))}</p>
      <button class="btn btn-ghost btn-sm" data-action="skip-splash">${E(t("skip"))}</button>
    </section>`;
  }

  /* ------------------- 2. CONSENT ------------------- */
  function viewConsent() {
    const pts = t("consentPoints");
    return `
    <section class="glass flow-card">
      <span class="chip chip-ok">🔒 Step 1 / 3 · Consent</span>
      <h2 class="mt">${E(t("consentTitle"))}</h2>
      <ul class="clean good-list mt">
        ${pts.map((p) => `<li>${E(p)}</li>`).join("")}
      </ul>
      <label class="consent-check">
        <input type="checkbox" id="consentCheck" ${S.consentChecked ? "checked" : ""} data-action="toggle-consent" />
        <span>${E(t("consentAgree"))}</span>
      </label>
      <div class="row between mt">
        <span class="small muted">AyurGarbha · Local-First</span>
        <button class="btn btn-ok" data-action="accept-consent" ${S.consentChecked ? "" : "disabled"}>${E(t("consentNext"))}</button>
      </div>
    </section>`;
  }

  /* ------------------- 3. ACTS & DISCLAIMERS ------------------- */
  function viewActs() {
    return `
    <section class="glass flow-card">
      <span class="chip chip-ok">📜 Step 2 / 3 · Acts &amp; Disclaimers</span>
      <h2 class="mt">${E(t("actsTitle"))}</h2>
      <div class="privacy-consent-box">
        <h3 class="mb0">${E(t("dpdpTitle"))}</h3>
        <p class="small mb0 mt">${E(t("dpdpText"))}</p>
      </div>
      <div class="glass card mt">
        <h3 class="mb0">${E(t("medTitle"))}</h3>
        <p class="small mb0 mt">${E(t("medText"))}</p>
      </div>
      <div class="warn-card mt">
        <h3 class="mb0">${E(t("emgTitle"))}</h3>
        <p class="small mb0 mt">${E(t("emgText"))}</p>
      </div>
      <div class="row between mt">
        <button class="btn btn-ghost btn-sm" data-action="go-consent">← ${S.lang === "hi" ? "पीछे" : "Back"}</button>
        <button class="btn btn-ok" data-action="accept-acts">${E(t("actsNext"))}</button>
      </div>
    </section>`;
  }

  /* ------------------- 4. DETAILS FORM ------------------- */
  function computeMetrics(mode, lmpVal, monthVal) {
    if (mode === "lmp" && lmpVal) {
      const g = KB.gestationalWeeks(lmpVal);
      if (g && g.days >= 0 && g.days <= 300) {
        const weeks = Math.max(0, Math.min(44, g.weeks));
        const month = KB.monthFromWeeks(weeks);
        const edd = KB.eddFromLmp(lmpVal);
        return { weeks, days: g.rem, month, edd };
      }
    } else if (mode === "month" && monthVal) {
      const m = Math.max(1, Math.min(9, Number(monthVal) || 1));
      const approxWeeks = Math.min(40, Math.round((m - 0.5) * 4.345));
      const approxLmp = new Date(Date.now() - approxWeeks * 7 * 86400000).toISOString().slice(0, 10);
      const edd = KB.eddFromLmp(approxLmp);
      return { weeks: approxWeeks, days: 0, month: m, edd, approxLmp };
    }
    return null;
  }

  function viewForm() {
    const saved = DB.getSelfProfile() || {};
    const mode = S.formInputMode || (saved.inputMode === "month" ? "month" : "lmp");
    const lmpVal = saved.lmp || "";
    const monthVal = saved.month || 1;
    const calc = computeMetrics(mode, lmpVal, monthVal);

    return `
    <section class="glass flow-card">
      <span class="chip chip-ok">🤰 Step 3 / 3 · Profile</span>
      <h2 class="mt">${E(t("formTitle"))}</h2>
      <p class="muted small">${E(t("formDesc"))}</p>

      <div class="grid g2 mt">
        <div class="field">
          <label>${E(t("nameLabel"))}</label>
          <input id="f_name" value="${E(saved.name || "")}" placeholder="${E(t("namePh"))}" />
        </div>
        <div class="field">
          <label>${E(t("ageLabel"))}</label>
          <input type="number" id="f_age" min="15" max="55" value="${E(saved.age || "")}" placeholder="${E(t("agePh"))}" />
        </div>
      </div>

      <div class="seg mt">
        <button type="button" class="${mode === "lmp" ? "active" : ""}" data-action="form-mode" data-v="lmp">${E(t("modeLmp"))}</button>
        <button type="button" class="${mode === "month" ? "active" : ""}" data-action="form-mode" data-v="month">${E(t("modeMonth"))}</button>
      </div>

      <div class="grid g2">
        ${mode === "lmp" ? `
          <div class="field">
            <label>${E(t("lmpLabel"))}</label>
            <input type="date" id="f_lmp" max="${todayStr()}" value="${E(lmpVal)}" />
          </div>
        ` : `
          <div class="field">
            <label>${E(t("monthLabel"))}</label>
            <select id="f_month">
              ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((m) => `<option value="${m}" ${Number(monthVal) === m ? "selected" : ""}>${S.lang === "hi" ? `माह ${m}` : `Month ${m}`}</option>`).join("")}
            </select>
          </div>
        `}
        <div class="field">
          <label>${E(t("langLabel"))}</label>
          <select id="f_lang">
            <option value="hi" ${S.lang === "hi" ? "selected" : ""}>हिन्दी (Hindi)</option>
            <option value="en" ${S.lang === "en" ? "selected" : ""}>English</option>
          </select>
        </div>
      </div>

      <div class="field">
        <label>${E(t("firstPregLabel"))}</label>
        <select id="f_first">
          <option value="yes" ${saved.firstPregnancy !== false ? "selected" : ""}>${E(t("yes"))}</option>
          <option value="no" ${saved.firstPregnancy === false ? "selected" : ""}>${E(t("no"))}</option>
        </select>
      </div>

      <div id="calcPreview" class="ok-card mt" ${calc ? "" : "hidden"}>
        <h4 class="mb0">${E(t("calcTitle"))}</h4>
        <div class="vitals mt">
          <div class="vital"><b id="cp_weeks">${calc ? `${calc.weeks}w ${calc.days}d` : "—"}</b><span>${E(t("calcWeeks"))}</span></div>
          <div class="vital"><b id="cp_month">${calc ? calc.month : "—"}</b><span>${E(t("calcMonth"))}</span></div>
          <div class="vital"><b id="cp_edd">${calc ? fmtDate(calc.edd) : "—"}</b><span>${E(t("calcEdd"))}</span></div>
        </div>
      </div>

      <div class="row between mt">
        <button type="button" class="btn btn-danger btn-sm" data-action="delete-my-data">${E(t("deleteMyData"))}</button>
        <button type="button" class="btn btn-ok" data-action="save-form">${E(t("saveForm"))}</button>
      </div>
    </section>`;
  }

  /* ------------------- 5. HOME SCREEN (6 Cards + Ask + Weekly Reminder + 108) ------------------- */
  function buildWeeklyReminderText(p) {
    const isHi = S.lang === "hi";
    const m = p.month || 1;
    let recs = DB.getVerifiedRecords("masanumasika", m);
    if (!recs.length) {
      recs = DB.getVerifiedRecords("dos_donts", null).filter((r) => r.month == null).slice(0, 2);
    }
    const summary = recs.length
      ? recs.map((r) => `• ${r.hindi_summary} (${r.id})`).join("\n")
      : (isHi ? "नियमित पौष्टिक, ताज़ा और सुपाच्य आहार लें तथा पर्याप्त विश्राम करें।" : "Follow regular wholesome, fresh diet and adequate rest.");
    const warn108 = isHi
      ? "🚨 आपातकालीन चेतावनी: रक्तस्राव, पानी छूटना, तेज़ सिरदर्द, दौरे या शिशु की हलचल कम होने पर तुरंत 108 पर कॉल करें।"
      : "🚨 Emergency Warning: Call 108 immediately for bleeding, fluid leak, severe headache, seizures, or reduced fetal movement.";

    return isHi
      ? `🪷 आयुर्गर्भ साप्ताहिक मार्गदर्शन (माह ${m}${p.weeks != null ? `, ${p.weeks} सप्ताह` : ""})\n\n${summary}\n\n${warn108}`
      : `🪷 AyurGarbha Weekly Guidance (Month ${m}${p.weeks != null ? `, ${p.weeks} weeks` : ""})\n\n${summary}\n\n${warn108}`;
  }

  function buildWhatsAppUrl(p, phone) {
    const clean = String(phone || "").replace(/\D/g, "");
    const target = clean.length === 10 ? `91${clean}` : "";
    const text = buildWeeklyReminderText(p || {});
    return `https://wa.me/${target}?text=${encodeURIComponent(text)}`;
  }

  function buildIcsContent(p) {
    const isHi = S.lang === "hi";
    const now = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    const dtStart =
      `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T090000`;
    const dtStamp =
      `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`;
    const m = (p && p.month) || 1;
    const summary = isHi
      ? `आयुर्गर्भ साप्ताहिक गर्भ-देखभाल एवं चिकित्सक-जाँच (माह ${m})`
      : `AyurGarbha Weekly Pregnancy Care & Checkup (Month ${m})`;
    const desc = isHi
      ? `माह ${m} आहार-विहार मार्गदर्शन देखें और नियमित चिकित्सकीय जाँच कराएँ। आपातकाल में 108 पर कॉल करें।`
      : `Review Month ${m} diet & lifestyle guidance and schedule your routine antenatal checkup. Call 108 in emergency.`;

    return [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//AyurGarbha//Weekly Reminder//EN",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `UID:ayurgarbha-weekly-${Date.now()}@local`,
      `DTSTAMP:${dtStamp}`,
      `DTSTART:${dtStart}`,
      "DURATION:PT30M",
      "RRULE:FREQ=WEEKLY",
      `SUMMARY:${summary}`,
      `DESCRIPTION:${desc}`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");
  }

  function garbhiniIllustrationSVG() {
    const isHi = S.lang === "hi";
    return `
    <div class="garbhini-svg-wrap">
      <svg class="garbhini-svg" viewBox="0 0 180 210" xmlns="http://www.w3.org/2000/svg" role="button" tabindex="0" aria-label="${isHi ? "गर्भ पर टैप करें" : "Tap womb area"}" data-action="baby-kick">
        <defs>
          <radialGradient id="wombGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fef3c7" stop-opacity="0.95"/>
            <stop offset="100%" stop-color="#fde68a" stop-opacity="0.35"/>
          </radialGradient>
        </defs>
        <g class="garbhini-body">
          <!-- Hair & Head -->
          <circle cx="84" cy="40" r="22" fill="#334155"/>
          <circle cx="62" cy="44" r="9" fill="#334155"/>
          <circle cx="88" cy="42" r="18" fill="#f3c6a5"/>
          <!-- Bindi & serene smile -->
          <circle cx="96" cy="37" r="2" fill="#be123c"/>
          <path d="M93,43 Q96,45 99,43" stroke="#334155" stroke-width="1.6" fill="none" stroke-linecap="round"/>
          <path d="M92,49 Q96,52 100,49" stroke="#be123c" stroke-width="1.5" fill="none" stroke-linecap="round"/>
          <!-- Sari drape & torso -->
          <path d="M68,62 C56,82 52,126 56,192 L124,192 C126,154 136,126 122,94 C114,76 104,64 94,60 Z" fill="#be123c" opacity="0.9"/>
          <!-- Pallu border -->
          <path d="M72,62 C86,84 102,110 116,144 L106,152 C88,118 74,90 62,68 Z" fill="#f59e0b" opacity="0.88"/>
          <!-- Gentle arm resting on belly -->
          <path d="M72,76 C60,96 66,118 88,124" stroke="#f3c6a5" stroke-width="9" fill="none" stroke-linecap="round"/>
        </g>

        <!-- Womb Window (Interactive Tap Zone) -->
        <g id="garbhaTapZone" style="cursor:pointer;">
          <circle cx="98" cy="126" r="28" fill="url(#wombGlow)" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 3"/>
          <circle id="kickRipple" class="kick-ripple" cx="98" cy="126" r="24" fill="none" stroke="#f59e0b" stroke-width="3"/>
          <!-- Peaceful Baby Inside -->
          <g id="garbhiniBaby" class="garbhini-baby">
            <circle cx="98" cy="117" r="8" fill="#f5d0b5" stroke="#be123c" stroke-width="1.2"/>
            <path d="M96,125 C89,129 90,139 98,140 C105,140 107,131 101,125 Z" fill="#fda4af" stroke="#be123c" stroke-width="1.2"/>
            <path d="M92,135 C87,136 86,132 89,129" stroke="#f5d0b5" stroke-width="3" fill="none" stroke-linecap="round"/>
          </g>
        </g>
      </svg>
      <div id="kickMsg" class="kick-msg">${isHi ? "👆 गर्भ पर टैप करें" : "👆 Tap womb gently"}</div>
      <p class="illus-caption">${isHi ? "यह समझने के लिए सरलीकृत चित्र है।" : "Simplified educational illustration."}</p>
    </div>`;
  }

  function viewHome() {
    const p = DB.getSelfProfile() || {};
    const weeksText = p.weeks != null ? `${p.weeks}w ${p.days || 0}d` : "—";
    const monthText = p.month ? (S.lang === "hi" ? `माह ${p.month}` : `Month ${p.month}`) : "—";
    const eddText = p.edd ? fmtDate(p.edd) : "—";
    const sections = t("sections");
    const isHi = S.lang === "hi";
    const waPhone = DB.getWaPhone ? DB.getWaPhone() : "";

    return `
    <div class="glass card">
      <div class="garbhini-hero">
        <div style="flex:1;min-width:240px;">
          <h2 class="mb0">🪷 ${E(t("homeGreeting"))}${p.name ? `, ${E(p.name)}` : ""}</h2>
          <p class="small muted mt mb0">
            ${p.age ? `${S.lang === "hi" ? "आयु" : "Age"}: <b>${E(p.age)}</b> · ` : ""}
            ${E(monthText)} · ${E(weeksText)} · EDD: <b>${E(eddText)}</b>
            ${p.firstPregnancy != null ? ` · ${p.firstPregnancy ? (S.lang === "hi" ? "पहली गर्भावस्था" : "First Pregnancy") : (S.lang === "hi" ? "अनुभवी माता" : "Subsequent Pregnancy")}` : ""}
          </p>
          <div class="row mt">
            <button class="btn btn-ghost btn-sm" data-action="edit-form">${E(t("editProfile"))}</button>
            <button class="btn btn-danger btn-sm" data-action="delete-my-data">${E(t("deleteMyData"))}</button>
          </div>
        </div>
        ${garbhiniIllustrationSVG()}
      </div>
    </div>

    <div class="home-grid">
      ${sections.map((sec) => `
        <button type="button" class="glass section-card ${sec.id === "high_risk" ? "high-risk" : ""}" data-action="open-section" data-v="${sec.id}">
          <div>
            <div class="row between">
              <span class="sec-ic">${sec.ic}</span>
              <span class="sec-num">${E(sec.num)}</span>
            </div>
            <h3 class="mt" style="margin-top:10px;">${E(sec.title)}</h3>
            <p class="small muted mb0">${E(sec.desc)}</p>
          </div>
          <span class="small" style="color:var(--emerald);font-weight:700;">${S.lang === "hi" ? "खोलें →" : "Open →"}</span>
        </button>
      `).join("")}
    </div>

    <div class="glass card mt">
      <div class="row between">
        <div>
          <h3 class="mb0">🔎 ${E(t("askTitle"))}</h3>
          <p class="small muted mb0">${E(t("askDesc"))}</p>
        </div>
        <button class="btn btn-ok" data-action="open-ask">${E(t("askBtn"))}</button>
      </div>
    </div>

    <div class="glass card mt" id="weeklyReminderCard">
      <h3 class="mb0">🔔 ${isHi ? "साप्ताहिक मार्गदर्शन रिमाइंडर (Weekly Reminder)" : "Weekly Guidance Reminder"}</h3>
      <p class="small muted mt mb0">${isHi
        ? "अपने या परिवार के WhatsApp पर इस माह का सत्यापित आहार-विहार सार भेजें, या फ़ोन कैलेंडर में साप्ताहिक रिमाइंडर जोड़ें।"
        : "Send this month's verified diet & lifestyle summary via WhatsApp, or add a weekly reminder to your phone calendar."}</p>

      <div class="grid g2 mt">
        <div>
          <label for="waPhone">${isHi ? "10-अंकीय मोबाइल नंबर (वैकल्पिक)" : "10-Digit Mobile Number (Optional)"}</label>
          <div class="row">
            <input id="waPhone" type="tel" maxlength="10" value="${E(waPhone)}" placeholder="${isHi ? "जैसे: 9876543210" : "e.g. 9876543210"}" style="flex:1;" />
            <button type="button" class="btn btn-ok btn-sm" data-action="open-wa">💬 ${isHi ? "WhatsApp पर भेजें" : "Send on WhatsApp"}</button>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;justify-content:flex-end;">
          <button type="button" class="btn btn-ghost" data-action="download-ics">📅 ${isHi ? "कैलेंडर रिमाइंडर (.ics) डाउनलोड करें" : "Download Calendar Reminder (.ics)"}</button>
        </div>
      </div>

      <p class="small muted mt mb0">🔒 ${isHi
        ? "मोबाइल नंबर केवल आपके फ़ोन में सुरक्षित रहता है; अपने-आप हर सप्ताह संदेश भेजने वाला ऑटो-सिस्टम अगले चरण (WhatsApp Business API) में जुड़ेगा।"
        : "Your mobile number stays only on your phone; automated weekly messaging will be added in the next stage (WhatsApp Business API)."}</p>
    </div>

    <div class="emergency-108-strip" role="alert">
      <div>
        <b style="color:var(--crimson-d);">🚨 ${E(t("emgStripTitle"))}</b>
        <p class="small mb0" style="color:var(--crimson);">${E(t("emgStripDesc"))}</p>
      </div>
      <a href="tel:108" class="btn btn-primary btn-sm">${E(t("call108"))}</a>
    </div>`;
  }

  /* ------------------- 6. SIX SECTION PAGES (Phase 3 Structure) ------------------- */
  function formatSamhita(key) {
    const isHi = S.lang === "hi";
    if (key === "charaka") return isHi ? "चरक संहिता" : "Charaka Samhita";
    if (key === "sushruta") return isHi ? "सुश्रुत संहिता" : "Sushruta Samhita";
    return key || "";
  }

  function renderRecordList(recs) {
    const isHi = S.lang === "hi";
    if (!recs.length) {
      return `
      <div class="placeholder-box">
        <p class="mb0">📜 <b>${isHi ? "संहिता-पाठ जुड़ रहा है" : "Samhita text is being added"}</b></p>
      </div>`;
    }
    return recs.map((r) => `
      <div class="shloka">
        <div class="sa">${E(r.sanskrit)}</div>
        <p class="mb0 mt">${E(r.hindi_summary)}</p>
        ${r.conflict_note ? `<div class="mt"><span class="chip chip-warn">⚠️ ${E(r.conflict_note)}</span></div>` : ""}
        <div class="ref">${E(formatSamhita(r.samhita))} · ${E(r.sthana || "")} ${E(r.adhyaya || "")}/${E(r.shloka_no_niimh || "")} · <code>${E(r.id)}</code></div>
      </div>`).join("");
  }

  function renderVerifiedBlock(tag, month) {
    const recs = DB.getVerifiedRecords(tag, month);
    return renderRecordList(recs);
  }

  function sectionHeader(secId) {
    const isHi = S.lang === "hi";
    const sections = t("sections");
    const sec = sections.find((s) => s.id === secId) || { ic: "📖", num: "", title: "", desc: "" };
    return `
    <div class="glass card">
      <div class="row between">
        <button class="btn btn-ghost btn-sm" data-action="go-home">${E(t("backHome"))}</button>
        <span class="chip chip-ok">${E(sec.num)}</span>
      </div>
      <div class="mt">
        <h2 class="mb0">${sec.ic} ${E(sec.title)}</h2>
        <p class="small muted mb0">${E(sec.desc)}</p>
      </div>
    </div>`;
  }

  function secLakshana() {
    const isHi = S.lang === "hi";
    const tab = S.lakshanaTab || "signs";
    const oppositeCards = [
      { id: "bleeding", hi: "योनि से रक्तस्राव", en: "Vaginal bleeding" },
      { id: "pain", hi: "पेट में तेज़ या लगातार दर्द", en: "Severe or persistent abdominal pain" },
      { id: "fluid", hi: "अचानक पानी छूटना", en: "Sudden watery fluid leak" },
      { id: "fever", hi: "तेज़ बुखार या लगातार उल्टी", en: "High fever or persistent vomiting" }
    ];
    return `
    <div class="section-page">
      ${sectionHeader("lakshana")}
      <div class="glass card">
        <p class="mb0">${isHi
          ? "सरल भाषा में: जब गर्भधारण होता है, तब शरीर में कुछ स्वाभाविक प्रारंभिक लक्षण दिखते हैं। यदि इनके बजाय कोई असामान्य या विपरीत लक्षण दिखे, तो तुरंत सावधान होना आवश्यक है।"
          : "In simple words: when conception occurs, certain natural early signs appear in the body. If opposite or abnormal warning signs appear instead, immediate care is required."}</p>
        <div class="seg mt">
          <button type="button" class="${tab === "signs" ? "active" : ""}" data-action="lakshana-tab" data-v="signs">
            ${isHi ? "लक्षण" : "Signs"}
          </button>
          <button type="button" class="${tab === "opposite" ? "active" : ""}" data-action="lakshana-tab" data-v="opposite">
            ${isHi ? "विपरीत लक्षण" : "Opposite Signs"}
          </button>
        </div>
        ${tab === "signs" ? `
          <h3>${isHi ? "सद्योगृहीत गर्भ के लक्षण" : "Early Signs of Conception"}</h3>
          ${renderVerifiedBlock("lakshana", null)}
        ` : `
          <h3>${isHi ? "विपरीत लक्षण (चेतावनी संकेत)" : "Opposite / Warning Signs"}</h3>
          ${renderVerifiedBlock("lakshana_opposite", null)}
          <div class="grid g2 mt">
            ${oppositeCards.map((c) => `
              <div class="warn-card mb0">
                <h4 class="mb0">⚠️ ${E(isHi ? c.hi : c.en)}</h4>
                <p class="small muted mt mb0">${isHi ? "यह सामान्य लक्षण नहीं है — तुरंत हाई-रिस्क जाँच देखें।" : "Not a normal sign — check High-Risk guidance immediately."}</p>
                <button type="button" class="btn btn-danger btn-sm mt" data-action="open-section" data-v="high_risk">
                  ${isHi ? "हाई-रिस्क लक्षण (सेक्शन 5) पर जाएँ →" : "Go to High-Risk Signs (Section 5) →"}
                </button>
              </div>
            `).join("")}
          </div>
        `}
      </div>
    </div>`;
  }

  function secDosDonts() {
    const isHi = S.lang === "hi";
    const p = DB.getSelfProfile() || {};
    const curMonth = p.month || 1;
    const selMonth = S.dosMonth || curMonth;
    const tab = S.dosTab || "monthly";
    return `
    <div class="section-page">
      ${sectionHeader("dos_donts")}
      <div class="glass card">
        <div class="seg">
          <button type="button" class="${tab === "ahara" ? "active" : ""}" data-action="dos-tab" data-v="ahara">
            ${isHi ? "आहार (Ahara)" : "Ahara (Diet)"}
          </button>
          <button type="button" class="${tab === "vihara" ? "active" : ""}" data-action="dos-tab" data-v="vihara">
            ${isHi ? "विहार (Vihara)" : "Vihara (Lifestyle)"}
          </button>
          <button type="button" class="${tab === "monthly" ? "active" : ""}" data-action="dos-tab" data-v="monthly">
            ${isHi ? `मासानुमासिक (माह ${selMonth})` : `Month-by-Month (M${selMonth})`}
          </button>
        </div>

        ${tab === "ahara" ? `
          <h3>${isHi ? "आहार — क्या खाएँ और क्या न खाएँ" : "Ahara — Dietary Do's & Don'ts"}</h3>
          ${renderRecordList(DB.getVerifiedRecords("dos_donts", null).filter((r) => r.month == null))}
        ` : tab === "vihara" ? `
          <h3>${isHi ? "विहार — दैनिक जीवनशैली व सावधानियाँ" : "Vihara — Lifestyle Do's & Don'ts"}</h3>
          ${renderRecordList(DB.getVerifiedRecords("dos_donts", null).filter((r) => r.month == null && (r.section_tag.includes("vihara") || r.samhita === "sushruta" || r.id === "CH-SHA-8-21-a")))}
        ` : `
          <div class="row between">
            <h3 class="mb0">${isHi ? `मासानुमासिक परिचर्या — माह ${selMonth}` : `Masanumasika Regimen — Month ${selMonth}`}</h3>
            <span class="chip chip-ok">${isHi ? `आपका वर्तमान माह: ${curMonth}` : `Your Current Month: ${curMonth}`}</span>
          </div>
          <div class="pillbar mt">
            ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((m) => `
              <button type="button" class="pill ${m === selMonth ? "active" : ""} ${m === curMonth ? "now" : ""}" data-action="dos-month" data-v="${m}">
                ${isHi ? `माह ${m}` : `M${m}`}
              </button>
            `).join("")}
          </div>
          ${renderVerifiedBlock("masanumasika", selMonth)}
        `}
      </div>
    </div>`;
  }

  /* ------------------- EPDS 10-Question Scale (Cox, Holden & Sagovsky, 1987) ------------------- */
  const EPDS_QUESTIONS = [
    {
      id: 1,
      hi: "1. मैं हँस सकी हूँ और बातों का मज़ा ले सकी हूँ:",
      en: "1. I have been able to laugh and see the funny side of things:",
      opts: [
        { s: 0, hi: "हमेशा की तरह", en: "As much as I always could" },
        { s: 1, hi: "अब उतना नहीं", en: "Not quite so much now" },
        { s: 2, hi: "निश्चित रूप से बहुत कम", en: "Definitely not so much now" },
        { s: 3, hi: "बिल्कुल नहीं", en: "Not at all" }
      ]
    },
    {
      id: 2,
      hi: "2. मैंने आने वाले समय की अच्छी चीज़ों का उत्साह से इंतज़ार किया है:",
      en: "2. I have looked forward with enjoyment to things:",
      opts: [
        { s: 0, hi: "हमेशा की तरह", en: "As much as I ever did" },
        { s: 1, hi: "पहले से कुछ कम", en: "Rather less than I used to" },
        { s: 2, hi: "निश्चित रूप से पहले से कम", en: "Definitely less than I used to" },
        { s: 3, hi: "लगभग बिल्कुल नहीं", en: "Hardly at all" }
      ]
    },
    {
      id: 3,
      hi: "3. जब कुछ ग़लत हुआ, तो मैंने बेवजह खुद को दोषी माना है:",
      en: "3. I have blamed myself unnecessarily when things went wrong:",
      opts: [
        { s: 3, hi: "हाँ, अधिकतर समय", en: "Yes, most of the time" },
        { s: 2, hi: "हाँ, कभी-कभी", en: "Yes, some of the time" },
        { s: 1, hi: "बहुत कम", en: "Not very often" },
        { s: 0, hi: "नहीं, कभी नहीं", en: "No, never" }
      ]
    },
    {
      id: 4,
      hi: "4. मैं बिना किसी ठोस कारण के चिंतित या परेशान रही हूँ:",
      en: "4. I have been anxious or worried for no good reason:",
      opts: [
        { s: 0, hi: "बिल्कुल नहीं", en: "No, not at all" },
        { s: 1, hi: "शायद ही कभी", en: "Hardly ever" },
        { s: 2, hi: "हाँ, कभी-कभी", en: "Yes, sometimes" },
        { s: 3, hi: "हाँ, बहुत बार", en: "Yes, very often" }
      ]
    },
    {
      id: 5,
      hi: "5. बिना किसी ठोस कारण के मुझे डर या घबराहट महसूस हुई है:",
      en: "5. I have felt scared or panicky for no very good reason:",
      opts: [
        { s: 3, hi: "हाँ, काफी बार", en: "Yes, quite a lot" },
        { s: 2, hi: "हाँ, कभी-कभी", en: "Yes, sometimes" },
        { s: 1, hi: "नहीं, बहुत कम", en: "No, not much" },
        { s: 0, hi: "नहीं, बिल्कुल नहीं", en: "No, not at all" }
      ]
    },
    {
      id: 6,
      hi: "6. काम और परिस्थितियाँ मुझ पर हावी हो रही थीं:",
      en: "6. Things have been getting on top of me:",
      opts: [
        { s: 3, hi: "हाँ, अधिकतर समय मैं संभाल नहीं पा रही थी", en: "Yes, most of the time I haven't been able to cope" },
        { s: 2, hi: "हाँ, कभी-कभी पहले जैसा नहीं संभाल सकी", en: "Yes, sometimes I haven't been coping as well as usual" },
        { s: 1, hi: "नहीं, अधिकतर समय मैंने ठीक से संभाला", en: "No, most of the time I have coped quite well" },
        { s: 0, hi: "नहीं, मैं हमेशा की तरह संभाल रही हूँ", en: "No, I have been coping as well as ever" }
      ]
    },
    {
      id: 7,
      hi: "7. मैं इतनी दुखी थी कि मुझे सोने में कठिनाई हुई:",
      en: "7. I have been so unhappy that I have had difficulty sleeping:",
      opts: [
        { s: 3, hi: "हाँ, अधिकतर समय", en: "Yes, most of the time" },
        { s: 2, hi: "हाँ, कभी-कभी", en: "Yes, sometimes" },
        { s: 1, hi: "बहुत कम", en: "Not very often" },
        { s: 0, hi: "नहीं, बिल्कुल नहीं", en: "No, not at all" }
      ]
    },
    {
      id: 8,
      hi: "8. मैंने उदास या बहुत दुखी महसूस किया है:",
      en: "8. I have felt sad or miserable:",
      opts: [
        { s: 3, hi: "हाँ, अधिकतर समय", en: "Yes, most of the time" },
        { s: 2, hi: "हाँ, काफी बार", en: "Yes, quite often" },
        { s: 1, hi: "बहुत कम", en: "Not very often" },
        { s: 0, hi: "नहीं, बिल्कुल नहीं", en: "No, not at all" }
      ]
    },
    {
      id: 9,
      hi: "9. मैं इतनी दुखी थी कि मुझे रोना आया:",
      en: "9. I have been so unhappy that I have been crying:",
      opts: [
        { s: 3, hi: "हाँ, अधिकतर समय", en: "Yes, most of the time" },
        { s: 2, hi: "हाँ, काफी बार", en: "Yes, quite often" },
        { s: 1, hi: "केवल कभी-कभार", en: "Only occasionally" },
        { s: 0, hi: "नहीं, कभी नहीं", en: "No, never" }
      ]
    },
    {
      id: 10,
      hi: "10. खुद को नुकसान पहुँचाने का विचार मेरे मन में आया है:",
      en: "10. The thought of harming myself has occurred to me:",
      opts: [
        { s: 3, hi: "हाँ, काफी बार", en: "Yes, quite often" },
        { s: 2, hi: "कभी-कभी", en: "Sometimes" },
        { s: 1, hi: "शायद ही कभी", en: "Hardly ever" },
        { s: 0, hi: "कभी नहीं", en: "Never" }
      ]
    }
  ];

  function secPsychology() {
    const isHi = S.lang === "hi";
    const res = S.epdsResult;
    return `
    <div class="section-page">
      ${sectionHeader("psychology")}
      <div class="glass card">
        <h3>🌸 ${isHi ? "आयुर्वेदिक दृष्टिकोण (दौहृद व मन की शांति)" : "Ayurvedic Perspective (Dauhrida & Calmness)"}</h3>
        ${renderVerifiedBlock("psychology", null)}
      </div>

      <div class="glass card">
        <h3>🌬️ ${isHi ? "साँस लें — शांत ब्रीदिंग अभ्यास" : "Breathe — Calm Breathing Exercise"}</h3>
        <p class="small muted">${isHi ? "तनाव या घबराहट कम करने के लिए 4 सेकंड गहरी साँस लें, 4 सेकंड रोकें, और 6 सेकंड धीरे छोड़ें।" : "Inhale gently for 4s, hold for 4s, and exhale slowly for 6s to calm your mind."}</p>
        <div class="breath-box">
          <div id="breathCircle" class="breath-circle">${isHi ? "तैयार" : "Ready"}</div>
          <p id="breathLabel" class="small muted mb0">${isHi ? "शुरू करने के लिए नीचे क्लिक करें" : "Click below to start"}</p>
          <button type="button" id="breathBtn" class="btn btn-ok btn-sm mt" data-action="breath-toggle">
            ${S.breathingActive ? (isHi ? "⏸ रोकें" : "⏸ Pause") : (isHi ? "▶ साँस लें (शुरू करें)" : "▶ Start Breathing")}
          </button>
        </div>
      </div>

      <div class="glass card">
        <div class="row between">
          <h3 class="mb0">🧠 ${isHi ? "मानसिक स्वास्थ्य स्व-परीक्षण (EPDS — 10 प्रश्न)" : "Mental Wellbeing Self-Check (EPDS — 10 Questions)"}</h3>
          <span class="chip chip-ok">${isHi ? "पिछले 7 दिन" : "Past 7 Days"}</span>
        </div>
        <p class="small muted mt mb0"><b>${isHi ? "स्रोत:" : "Source:"}</b> Cox, Holden &amp; Sagovsky (1987), Br J Psychiatry 150:782–786</p>
        <div class="placeholder-box mt">
          <p class="small mb0">⚕️ ${isHi
            ? "यह केवल जागरूकता और स्व-जाँच के लिए है, कोई चिकित्सीय निदान (diagnosis) नहीं है।"
            : "This is for awareness and self-check only; it is NOT a medical diagnosis."}</p>
        </div>

        ${EPDS_QUESTIONS.map((q) => `
          <div class="epds-q">
            <b>${E(isHi ? q.hi : q.en)}</b>
            <div class="epds-opts">
              ${q.opts.map((o, idx) => `
                <label class="epds-opt">
                  <input type="radio" name="epds_q${q.id}" value="${o.s}" ${S.epdsAnswers[q.id] === o.s && S.epdsAnswers[q.id + "_idx"] === idx ? "checked" : ""} data-action="epds-opt" data-q="${q.id}" data-s="${o.s}" data-idx="${idx}" />
                  <span>${E(isHi ? o.hi : o.en)}</span>
                </label>
              `).join("")}
            </div>
          </div>
        `).join("")}

        <div class="row between mt">
          <button type="button" class="btn btn-ghost btn-sm" data-action="epds-reset">${isHi ? "रीसेट करें" : "Reset"}</button>
          <button type="button" class="btn btn-ok" data-action="epds-submit">${isHi ? "परिणाम देखें →" : "View Self-Check Result →"}</button>
        </div>

        ${res ? `
          <div class="ok-card mt">
            <h4 class="mb0">${isHi ? `आपका स्व-जाँच स्कोर: ${res.total} / 30` : `Your Self-Check Score: ${res.total} / 30`}</h4>
            <p class="small mb0 mt">${isHi
              ? "आपका स्कोर सामान्य सीमा में है। मन को शांत रखने के लिए नियमित विश्राम व ब्रीदिंग अभ्यास जारी रखें। (यह कोई चिकित्सीय निदान नहीं है।)"
              : "Your score is within the lower range. Continue regular rest and breathing exercises. (This is not a medical diagnosis.)"}</p>
          </div>
        ` : ""}
      </div>
    </div>`;
  }

  function viewHelpPage() {
    const isHi = S.lang === "hi";
    return `
    <section class="help-fullscreen" role="region" aria-label="Mental Health Support">
      <span class="chip chip-ok">💚 ${isHi ? "तत्काल सहायता एवं परामर्श" : "Immediate Support & Care"}</span>
      <h1 class="mt" style="color:var(--emerald-d);font-size:2rem;">${isHi ? "आप अकेली नहीं हैं" : "You are not alone"}</h1>
      <p style="font-size:1.05rem;line-height:1.6;">
        ${isHi
          ? "गर्भावस्था के दौरान मन भारी होना, उदासी या चिंता महसूस होना बहुत आम है। कृपया इसे अपने तक न रखें — अपने किसी करीबी (परिवार/मित्र) या योग्य चिकित्सक से बात करें।"
          : "Feeling overwhelmed, sad, or anxious during pregnancy is common and treatable. Please share how you feel with someone close to you or a qualified physician."}
      </p>

      <div class="help-call-grid">
        <a href="tel:14416" class="help-call-btn">
          <span style="font-size:1.2rem;">📞 14416</span>
          <span class="small">Tele-MANAS (${isHi ? "निःशुल्क, 24x7" : "Toll-Free, 24x7"})</span>
        </a>
        <a href="tel:18008914416" class="help-call-btn">
          <span style="font-size:1.2rem;">📞 1-800-891-4416</span>
          <span class="small">Tele-MANAS (${isHi ? "निःशुल्क, 24x7" : "Toll-Free, 24x7"})</span>
        </a>
      </div>

      <p class="small muted">${isHi
        ? "Tele-MANAS भारत सरकार की निःशुल्क, गोपनीय 24x7 मानसिक स्वास्थ्य हेल्पलाइन है। (यह स्व-जाँच कोई चिकित्सीय निदान नहीं है।)"
        : "Tele-MANAS is a free, confidential 24x7 mental health helpline by the Government of India. (This self-check is not a medical diagnosis.)"}</p>

      <div class="row between mt" style="justify-content:center;gap:12px;">
        <button type="button" class="btn btn-ghost" data-action="go-home">${E(t("backHome"))}</button>
      </div>
    </section>`;
  }

  function secMinor() {
    const isHi = S.lang === "hi";
    const items = [
      { id: "chhardi", hi: "छर्दि (जी मिचलाना / उल्टी)", en: "Chhardi (Nausea / Vomiting)" },
      { id: "shopha", hi: "शोफ (सूजन)", en: "Shopha (Swelling)" },
      { id: "vibandha", hi: "कब्ज़ (विबन्ध)", en: "Vibandha (Constipation)" },
      { id: "shirahshoola", hi: "सिरदर्द", en: "Headache" },
      { id: "anidra", hi: "अनिद्रा (नींद न आना)", en: "Anidra (Insomnia)" },
      { id: "katishoola", hi: "पीठ दर्द (कटिशूल)", en: "Backache" }
    ];
    const sel = items.find((x) => x.id === S.minorSym) || items[0];
    const recs = DB.getVerifiedRecords("minor_" + sel.id, null);

    return `
    <div class="section-page">
      ${sectionHeader("minor")}
      <div class="glass card">
        <div class="pillbar">
          ${items.map((x) => `
            <button type="button" class="pill ${x.id === sel.id ? "active" : ""}" data-action="minor-select" data-v="${x.id}">
              ${E(isHi ? x.hi : x.en)}
            </button>
          `).join("")}
        </div>

        <div class="row between mt">
          <h3 class="mb0">${E(isHi ? sel.hi : sel.en)}</h3>
          ${!recs.length ? `<span class="chip chip-warn">${isHi ? "संहिता-स्रोत उपलब्ध नहीं / सामान्य सलाह" : "Samhita source not available / General advice"}</span>` : ""}
        </div>

        <div class="glass card mt">
          <h4>1. ${isHi ? "सरल भाषा में क्या है" : "What it is (Simple Language)"}</h4>
          ${recs.length ? renderVerifiedBlock("minor_" + sel.id, null) : `<div class="placeholder-box"><p class="mb0">${isHi ? "संहिता-पाठ जुड़ रहा है" : "Samhita text is being added"}</p></div>`}
        </div>

        <div class="ok-card">
          <h4>2. ${isHi ? "घर पर क्या करें (जीवनशैली)" : "What to do at home (Lifestyle)"}</h4>
          <p class="small muted mb0">${isHi ? "संहिता-पाठ जुड़ रहा है (यहाँ केवल सुरक्षित जीवनशैली सलाह रहेगी, कोई दवा-मात्रा नहीं)।" : "Samhita text is being added (safe lifestyle guidance only, no medicine dosages)."}</p>
        </div>

        <div class="warn-card mb0">
          <h4>3. ${isHi ? "कब चिकित्सक के पास जाएँ" : "When to consult a physician"}</h4>
          <p class="small mb0">${isHi ? "यदि लक्षण तेज़ हों, लगातार बढ़ें, या कोई भी चेतावनी संकेत दिखे तो तुरंत चिकित्सक से मिलें।" : "If symptoms become severe, persistent, or any warning sign appears, consult a qualified physician immediately."}</p>
          <button type="button" class="btn btn-danger btn-sm mt" data-action="open-section" data-v="high_risk">
            ${isHi ? "हाई-रिस्क लक्षण (सेक्शन 5) देखें →" : "View High-Risk Signs (Section 5) →"}
          </button>
        </div>
      </div>
    </div>`;
  }

  function secHighRisk() {
    const isHi = S.lang === "hi";
    const rf = evaluateRedFlags({ selectedIds: S.highRiskSelected });
    return `
    <div class="section-page">
      ${sectionHeader("high_risk")}
      <div class="emergency-banner-critical" role="alert">
        <div class="emergency-banner-title">
          <span>🚨</span>
          <b>${isHi ? "तुरंत अस्पताल जाएँ / 108 पर कॉल करें" : "Go to Hospital Immediately / Call 108"}</b>
        </div>
        <div class="emergency-banner-action mt">
          <a href="tel:108" class="btn btn-primary btn-sm">${E(t("call108"))}</a>
          <span class="small" style="color:var(--crimson-d);">${isHi ? "आपातकालीन एम्बुलेंस सेवा (निःशुल्क, 24x7)" : "Emergency Ambulance Service (Free, 24x7)"}</span>
        </div>
      </div>

      <div class="glass card">
        <h3>⚠️ ${isHi ? "नियम-आधारित आपातकालीन लक्षण जाँच" : "Rule-Based Emergency Symptom Check"}</h3>
        <p class="small muted">${isHi ? "यदि इनमें से कोई भी लक्षण दिखाई दे, तो उस पर टिक करें — AI उत्तर रोक दिया जाएगा और तुरंत अस्पताल/108 सलाह दिखेगी:" : "Tick any symptom if present — AI guidance will be blocked and immediate 108 referral will appear:"}</p>
        <div class="rf-grid">
          ${HIGH_RISK_LIST.map((item) => {
            const active = S.highRiskSelected.includes(item.id);
            return `
            <label class="rf-item ${active ? "active" : ""}">
              <input type="checkbox" ${active ? "checked" : ""} data-action="hr-toggle" data-v="${item.id}" />
              <span>${E(isHi ? item.hi : item.en)}</span>
            </label>`;
          }).join("")}
        </div>
        ${rf.triggered ? rf.bannerHTML(S.lang) : ""}
      </div>

      <div class="glass card">
        <h3>📜 ${isHi ? "सत्यापित संहिता-संदर्भ (उपद्रव / चेतावनी)" : "Verified Samhita References (Upadrava)"}</h3>
        ${renderVerifiedBlock("high_risk", null)}
      </div>
    </div>`;
  }

  function fetusStageProps(m) {
    const wombScale = (0.64 + m * 0.038).toFixed(3);
    const babyScale = (0.35 + m * 0.072).toFixed(3);
    const rot = m >= 8 ? 165 : (m >= 6 ? 35 : 0);
    return { wombScale, babyScale, rot, showDot: m === 1, showBud: m >= 2 && m <= 3, showFetus: m >= 4 };
  }

  function fetusIllustrationSVG(m) {
    const isHi = S.lang === "hi";
    const p = fetusStageProps(m);
    return `
    <div class="illus-box">
      <svg class="fetus-svg" viewBox="0 0 220 190" xmlns="http://www.w3.org/2000/svg" aria-label="${isHi ? `माह ${m} गर्भ विकास चित्र` : `Month ${m} fetal illustration`}">
        <defs>
          <radialGradient id="fetusWombGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fffbeb"/>
            <stop offset="100%" stop-color="#fde68a" stop-opacity="0.55"/>
          </radialGradient>
        </defs>
        <g id="fetusWombGroup" class="fetus-womb" style="transform:scale(${p.wombScale});">
          <ellipse cx="110" cy="95" rx="74" ry="78" fill="url(#fetusWombGrad)" stroke="#f59e0b" stroke-width="2.5"/>
          <!-- Umbilical line -->
          <path d="M168,95 C148,95 138,108 120,104" stroke="#e11d48" stroke-width="2.2" fill="none" stroke-dasharray="3 2" opacity="0.7"/>
        </g>

        <!-- Stage 1: Month 1 Kalala dot -->
        <g id="fetusDot" class="fetus-stage" style="opacity:${p.showDot ? 1 : 0};transform:scale(${p.showDot ? 1 : 0.4});">
          <circle cx="110" cy="95" r="10" fill="#f43f5e" opacity="0.85"/>
          <circle cx="110" cy="95" r="16" fill="none" stroke="#f59e0b" stroke-width="1.5"/>
        </g>

        <!-- Stage 2: Month 2-3 Early embryo / Panchapindaka -->
        <g id="fetusBud" class="fetus-stage" style="opacity:${p.showBud ? 1 : 0};transform:scale(${m === 2 ? 0.8 : 1.05});">
          <path d="M102,74 C122,70 130,90 120,110 C112,122 96,118 98,104 C100,94 90,82 102,74 Z" fill="#fda4af" stroke="#be123c" stroke-width="2"/>
          <circle cx="108" cy="82" r="9" fill="#fecdd3" stroke="#be123c" stroke-width="1.6"/>
        </g>

        <!-- Stage 3: Month 4-10 Formed Fetus (scales & rotates head-down at M8-10) -->
        <g id="fetusFull" class="fetus-stage" style="opacity:${p.showFetus ? 1 : 0};transform:scale(${p.babyScale}) rotate(${p.rot}deg);">
          <circle cx="110" cy="70" r="19" fill="#f5d0b5" stroke="#be123c" stroke-width="2"/>
          <path d="M106,89 C84,96 86,126 108,132 C128,136 134,110 120,90 Z" fill="#fda4af" stroke="#be123c" stroke-width="2"/>
          <!-- Arms & Legs -->
          <path d="M94,102 C82,108 84,120 96,120" stroke="#f5d0b5" stroke-width="6" fill="none" stroke-linecap="round"/>
          <path d="M102,130 C94,144 106,152 118,144" stroke="#f5d0b5" stroke-width="7" fill="none" stroke-linecap="round"/>
          <!-- Closed peaceful eye -->
          <path d="M114,68 Q118,71 122,68" stroke="#334155" stroke-width="1.6" fill="none" stroke-linecap="round"/>
        </g>
      </svg>
      <p class="illus-caption">${isHi ? "यह समझने के लिए सरलीकृत चित्र है (Simplified educational illustration)।" : "Simplified educational illustration for understanding."}</p>
    </div>`;
  }

  function updateFetusView(m) {
    const isHi = S.lang === "hi";
    const p = fetusStageProps(m);
    const wg = $("#fetusWombGroup");
    const dot = $("#fetusDot");
    const bud = $("#fetusBud");
    const full = $("#fetusFull");
    if (wg) wg.style.transform = `scale(${p.wombScale})`;
    if (dot) {
      dot.style.opacity = p.showDot ? "1" : "0";
      dot.style.transform = `scale(${p.showDot ? 1 : 0.4})`;
    }
    if (bud) {
      bud.style.opacity = p.showBud ? "1" : "0";
      bud.style.transform = `scale(${m === 2 ? 0.8 : 1.05})`;
    }
    if (full) {
      full.style.opacity = p.showFetus ? "1" : "0";
      full.style.transform = `scale(${p.babyScale}) rotate(${p.rot}deg)`;
    }
    const lbl = $("#fetusSliderLabel");
    if (lbl) lbl.innerHTML = isHi ? `गर्भ माह चुनें: <b>माह ${m}</b> (1 से 10)` : `Select Month: <b>Month ${m}</b> (1 to 10)`;
    const badge = $("#fetusBadge");
    if (badge) badge.textContent = isHi ? `माह ${m} / 10` : `Month ${m} / 10`;
    const st = $("#fetusSamhitaTitle");
    if (st) st.textContent = `📜 ${isHi ? `संहिता-वर्णन (माह ${m})` : `Samhita Description (Month ${m})`}`;
    const sb = $("#fetusSamhitaBody");
    if (sb) sb.innerHTML = renderVerifiedBlock("fetus", m);
    const mt = $("#fetusModernTitle");
    if (mt) mt.textContent = `🔬 ${isHi ? `आधुनिक दृष्टि (माह ${m})` : `Modern Perspective (Month ${m})`}`;
  }

  function secFetus() {
    const isHi = S.lang === "hi";
    const p = DB.getSelfProfile() || {};
    const m = S.fetusMonth || p.month || 1;
    return `
    <div class="section-page">
      ${sectionHeader("fetus")}
      <div class="glass card">
        ${fetusIllustrationSVG(m)}
        <div class="month-slider-wrap">
          <div class="row between">
            <label id="fetusSliderLabel" for="fetusSlider" class="mb0" style="font-size:.95rem;color:var(--text);">
              ${isHi ? `गर्भ माह चुनें: <b>माह ${m}</b> (1 से 10)` : `Select Month: <b>Month ${m}</b> (1 to 10)`}
            </label>
            <span id="fetusBadge" class="chip chip-ok">${isHi ? `माह ${m} / 10` : `Month ${m} / 10`}</span>
          </div>
          <input id="fetusSlider" class="month-slider mt" type="range" min="1" max="10" value="${m}" />
          <div class="row between small muted">
            <span>${isHi ? "माह 1" : "Month 1"}</span>
            <span>${isHi ? "माह 5" : "Month 5"}</span>
            <span>${isHi ? "माह 10" : "Month 10"}</span>
          </div>
        </div>

        <div class="glass card mt">
          <h3 id="fetusSamhitaTitle">📜 ${isHi ? `संहिता-वर्णन (माह ${m})` : `Samhita Description (Month ${m})`}</h3>
          <div id="fetusSamhitaBody">${renderVerifiedBlock("fetus", m)}</div>
        </div>

        <div class="modern-box">
          <h4 id="fetusModernTitle" class="mb0">🔬 ${isHi ? `आधुनिक दृष्टि (माह ${m})` : `Modern Perspective (Month ${m})`}</h4>
          <p class="small muted mb0 mt">${isHi ? "संहिता-पाठ जुड़ रहा है" : "Samhita text is being added"}</p>
        </div>
      </div>
    </div>`;
  }

  function viewSection(secId) {
    switch (secId) {
      case "lakshana": return secLakshana();
      case "dos_donts": return secDosDonts();
      case "psychology": return secPsychology();
      case "minor": return secMinor();
      case "high_risk": return secHighRisk();
      case "fetus": return secFetus();
      default: return viewHome();
    }
  }

  /* ------------------- 7. ASK FEATURE (BM25 + AyurParam + Validator + Fallback) ------------------- */
  function viewAsk() {
    const isHi = S.lang === "hi";
    const p = DB.getSelfProfile() || {};
    const ep = window.RAG && window.RAG.getEndpoint ? window.RAG.getEndpoint() : "";
    const samples = isHi
      ? [
          "5वें महीने में क्या खाना चाहिए?",
          "चौथे माह में दौहृद का क्या महत्व है?",
          "आठवें महीने में ओज क्यों अस्थिर होता है?",
          "गर्भधारण के शुरुआती लक्षण क्या हैं?"
        ]
      : [
          "What to eat in 5th month?",
          "Importance of Dauhrida in 4th month",
          "Why is Ojas labile in 8th month?",
          "Early signs of pregnancy"
        ];

    let outHTML = "";
    const res = S.askResult;
    if (S.askLoading) {
      outHTML = `<div class="glass card mt"><span class="loader"></span> ${isHi ? "संहिता-पाठ में खोज जारी है…" : "Searching verified Samhita texts…"}</div>`;
    } else if (res) {
      if (res.red_flag_blocked && res.red_flag_eval) {
        outHTML = res.red_flag_eval.bannerHTML(S.lang);
      } else if (res.out_of_corpus) {
        outHTML = `
        <div class="warn-card mt">
          <h3 class="mb0">📜 ${E(res.direct_answer)}</h3>
          <p class="small muted mt mb0">${isHi ? "केवल सत्यापित चरक व सुश्रुत संहिता (Tier A) पाठ से उत्तर दिया जाता है।" : "Answers are grounded strictly in verified Charaka & Sushruta (Tier A) texts."}</p>
        </div>`;
      } else {
        const srcBadge =
          res.source === "ayurparam"
            ? "🤖 AyurParam (Validated)"
            : res.source === "extractive_fallback_validator_rejected"
            ? "🛡️ Extractive Fallback (Citation Validator rejected external ID)"
            : "📖 Extractive Fallback (Verified DB)";
        outHTML = `
        <div class="glass answer mt">
          <div class="row between">
            <span class="chip chip-ok src-badge">${E(srcBadge)}</span>
            ${res.filters && res.filters.month ? `<span class="chip small">${isHi ? `माह ${res.filters.month}` : `Month ${res.filters.month}`}</span>` : ""}
          </div>
          <p class="mt" style="font-size:1rem;line-height:1.6;">${E(res.direct_answer)}</p>
          <p class="small muted">⚕️ ${isHi ? "किसी भी औषधि या आहार परिवर्तन से पहले चिकित्सक से पूछें।" : "Consult a qualified physician before starting any remedy or dietary change."}</p>
          <h4 class="mt">${isHi ? "सत्यापित संहिता संदर्भ (DB से ID द्वारा)" : "Verified Samhita Citations (from DB by ID)"}</h4>
          ${renderRecordList(res.records || [])}
        </div>`;
      }
    }

    return `
    <div class="section-page">
      <div class="glass card">
        <div class="row between">
          <button type="button" class="btn btn-ghost btn-sm" data-action="go-home">${E(t("backHome"))}</button>
          <button type="button" class="btn btn-ghost btn-sm" data-action="toggle-ask-settings">⚙️ ${isHi ? "AyurParam सेटिंग्स" : "AyurParam Settings"}</button>
        </div>
        <h2 class="mt mb0">🔎 ${E(t("askTitle"))}</h2>
        <p class="small muted">${E(t("askDesc"))}${p.month ? ` (${isHi ? `आपका माह: ${p.month}` : `Your Month: ${p.month}`})` : ""}</p>

        ${S.showAskSettings ? `
          <div class="glass card mt" style="background:var(--glass2);">
            <label for="ayurparamUrl">${isHi ? "AyurParam GPU Endpoint URL (वैकल्पिक — खाली रहने पर Extractive Fallback चलेगा)" : "AyurParam GPU Endpoint URL (Optional — leaves Extractive Fallback active when blank)"}</label>
            <div class="row">
              <input id="ayurparamUrl" value="${E(ep)}" placeholder="https://your-ayurparam-server/generate" style="flex:1;" />
              <button type="button" class="btn btn-ok btn-sm" data-action="save-ask-endpoint">${isHi ? "सहेजें" : "Save"}</button>
            </div>
            <p class="small muted mt mb0">🔒 ${isHi ? "सर्वर पर केवल प्रश्न, माह और भाषा जाती है (नाम, आयु या LMP नहीं)।" : "Only question, month, and language are sent (never name, age, or LMP)."}</p>
          </div>
        ` : ""}

        <div class="row mt">
          <input id="askQ" value="${E(S.askQuery)}" placeholder="${isHi ? "अपना प्रश्न यहाँ लिखें…" : "Type your question here…"}" style="flex:1;" />
          <button type="button" class="btn btn-ok" data-action="ask-submit">${isHi ? "पूछें →" : "Ask →"}</button>
        </div>

        <div class="ayurparam-curated mt">
          ${samples.map((s) => `<button type="button" class="curated-chip" data-action="ask-chip" data-q="${E(s)}">${E(s)}</button>`).join("")}
        </div>
      </div>

      <div id="askOut">${outHTML}</div>
    </div>`;
  }

  /* ------------------------------ RENDER ------------------------------ */
  function render() {
    const app = $("#app");
    if (!app) return;
    const langBtn = $("#langBtn");
    if (langBtn) langBtn.textContent = t("langBtn");
    const brandSub = $("#brandSubtitle");
    if (brandSub) brandSub.textContent = t("brandSub");

    if (S.screen === "splash") {
      app.innerHTML = viewSplash();
      clearSplashTimer();
      S.splashTimer = setTimeout(() => {
        if (S.screen === "splash") nextAfterSplash();
      }, 3500);
    } else if (S.screen === "consent") {
      app.innerHTML = viewConsent();
    } else if (S.screen === "acts") {
      app.innerHTML = viewActs();
    } else if (S.screen === "form") {
      app.innerHTML = viewForm();
    } else if (S.screen === "section") {
      app.innerHTML = viewSection(S.activeSection);
    } else if (S.screen === "help") {
      app.innerHTML = viewHelpPage();
    } else if (S.screen === "ask") {
      app.innerHTML = viewAsk();
    } else {
      app.innerHTML = viewHome();
    }
  }

  /* ------------------------------ ACTIONS ------------------------------ */
  const val = (id) => {
    const e = $("#" + id);
    return e ? e.value.trim() : "";
  };

  function updateCalcPreview() {
    const lmpVal = val("f_lmp");
    const monthVal = val("f_month");
    const calc = computeMetrics(S.formInputMode, lmpVal, monthVal);
    const box = $("#calcPreview");
    if (!box) return;
    if (!calc) {
      box.hidden = true;
      return;
    }
    box.hidden = false;
    const w = $("#cp_weeks"), m = $("#cp_month"), e = $("#cp_edd");
    if (w) w.textContent = `${calc.weeks}w ${calc.days}d`;
    if (m) m.textContent = String(calc.month);
    if (e) e.textContent = fmtDate(calc.edd);
  }

  const H = {
    "toggle-lang"() {
      S.lang = S.lang === "hi" ? "en" : "hi";
      localStorage.setItem("ayur_lang", S.lang);
      render();
      toast(S.lang === "hi" ? "भाषा बदलकर हिन्दी की गई" : "Language switched to English");
    },
    home() {
      if (DB.hasConsent() && DB.hasActsAck() && DB.getSelfProfile()) {
        S.screen = "home";
        render();
        window.scrollTo(0, 0);
      }
    },
    "skip-splash"() {
      nextAfterSplash();
    },
    "toggle-consent"(el) {
      S.consentChecked = Boolean(el.checked);
      const btn = $("[data-action='accept-consent']");
      if (btn) btn.disabled = !S.consentChecked;
    },
    "accept-consent"() {
      const cb = $("#consentCheck");
      if (!cb || !cb.checked) return toast(t("consentNeedCheck"), true);
      DB.setConsent(true);
      S.screen = "acts";
      render();
      window.scrollTo(0, 0);
    },
    "go-consent"() {
      S.screen = "consent";
      render();
    },
    "accept-acts"() {
      DB.setActsAck(true);
      S.screen = DB.getSelfProfile() ? "home" : "form";
      render();
      window.scrollTo(0, 0);
    },
    "form-mode"(el) {
      S.formInputMode = el.dataset.v === "month" ? "month" : "lmp";
      render();
    },
    "save-form"() {
      const name = val("f_name");
      const ageRaw = val("f_age");
      const age = ageRaw ? parseInt(ageRaw, 10) : null;
      if (!age || age < 15 || age > 55) {
        return toast(S.lang === "hi" ? "कृपया सही आयु (15–55 वर्ष) दर्ज करें" : "Please enter valid age (15–55 years)", true);
      }
      const mode = S.formInputMode;
      const lmp = val("f_lmp");
      const monthSel = val("f_month");
      if (mode === "lmp") {
        if (!lmp) return toast(S.lang === "hi" ? "कृपया LMP तिथि दर्ज करें" : "Please enter LMP date", true);
        const g = KB.gestationalWeeks(lmp);
        if (!g || g.days < 0 || g.days > 300) {
          return toast(S.lang === "hi" ? "कृपया सही LMP तिथि जाँचें" : "Please check the LMP date", true);
        }
      }
      const calc = computeMetrics(mode, lmp, monthSel);
      if (!calc) return toast(S.lang === "hi" ? "गणना में त्रुटि, कृपया विवरण जाँचें" : "Please check your inputs", true);

      const langSel = val("f_lang") || S.lang;
      S.lang = langSel;
      localStorage.setItem("ayur_lang", S.lang);

      DB.setSelfProfile({
        name,
        age,
        inputMode: mode,
        lmp: mode === "lmp" ? lmp : calc.approxLmp,
        month: calc.month,
        weeks: calc.weeks,
        days: calc.days,
        edd: calc.edd,
        language: langSel,
        firstPregnancy: val("f_first") !== "no",
        updatedAt: Date.now()
      });

      S.screen = "home";
      render();
      window.scrollTo(0, 0);
      toast(S.lang === "hi" ? "विवरण सहेजा गया" : "Details saved locally");
    },
    "edit-form"() {
      const saved = DB.getSelfProfile();
      if (saved && saved.inputMode) S.formInputMode = saved.inputMode;
      S.screen = "form";
      render();
      window.scrollTo(0, 0);
    },
    "open-section"(el) {
      S.activeSection = el.dataset.v;
      S.screen = "section";
      render();
      window.scrollTo(0, 0);
    },
    "lakshana-tab"(el) {
      S.lakshanaTab = el.dataset.v === "opposite" ? "opposite" : "signs";
      render();
    },
    "dos-tab"(el) {
      S.dosTab = el.dataset.v || "monthly";
      render();
    },
    "dos-month"(el) {
      S.dosMonth = Number(el.dataset.v) || 1;
      render();
    },
    "minor-select"(el) {
      S.minorSym = el.dataset.v || "chhardi";
      render();
    },
    "hr-toggle"(el) {
      const id = el.dataset.v;
      if (!id) return;
      if (S.highRiskSelected.includes(id)) {
        S.highRiskSelected = S.highRiskSelected.filter((x) => x !== id);
      } else {
        S.highRiskSelected = S.highRiskSelected.concat([id]);
      }
      render();
    },
    "breath-toggle"() {
      const isHi = S.lang === "hi";
      if (S.breathingActive) {
        S.breathingActive = false;
        if (S.breathingTimer) clearTimeout(S.breathingTimer);
        S.breathingTimer = null;
        render();
        return;
      }
      S.breathingActive = true;
      const btn = $("#breathBtn");
      if (btn) btn.textContent = isHi ? "⏸ रोकें" : "⏸ Pause";

      const phases = [
        { cls: "inhale", hi: "गहरी साँस लें (4 सेकंड)", en: "Breathe In (4s)", ms: 4000 },
        { cls: "hold", hi: "रोकें (4 सेकंड)", en: "Hold Gently (4s)", ms: 4000 },
        { cls: "exhale", hi: "धीरे छोड़ें (6 सेकंड)", en: "Breathe Out (6s)", ms: 6000 }
      ];
      let idx = 0;
      const step = () => {
        if (!S.breathingActive) return;
        const c = $("#breathCircle");
        const l = $("#breathLabel");
        if (!c) {
          S.breathingActive = false;
          return;
        }
        const ph = phases[idx % phases.length];
        c.className = "breath-circle " + ph.cls;
        c.textContent = S.lang === "hi" ? ph.hi.split(" ")[0] : ph.en.split(" ")[0];
        if (l) l.textContent = S.lang === "hi" ? ph.hi : ph.en;
        idx++;
        S.breathingTimer = setTimeout(step, ph.ms);
      };
      step();
    },
    "epds-opt"(el) {
      const q = Number(el.dataset.q);
      const s = Number(el.dataset.s);
      const idx = Number(el.dataset.idx);
      S.epdsAnswers[q] = s;
      S.epdsAnswers[q + "_idx"] = idx;
      S.epdsResult = null;
    },
    "epds-reset"() {
      S.epdsAnswers = {};
      S.epdsResult = null;
      render();
    },
    "epds-submit"() {
      const isHi = S.lang === "hi";
      let total = 0;
      for (let q = 1; q <= 10; q++) {
        if (S.epdsAnswers[q] == null) {
          return toast(isHi ? `कृपया प्रश्न ${q} का उत्तर चुनें` : `Please answer question ${q}`, true);
        }
        total += Number(S.epdsAnswers[q]);
      }
      const q10 = Number(S.epdsAnswers[10] || 0);
      if (total >= 10 || q10 > 0) {
        S.epdsResult = null;
        if (S.breathingTimer) clearTimeout(S.breathingTimer);
        S.breathingActive = false;
        S.screen = "help";
        render();
        window.scrollTo(0, 0);
        return;
      }
      S.epdsResult = { total, q10Score: q10 };
      render();
    },
    "open-ask"() {
      S.screen = "ask";
      render();
      window.scrollTo(0, 0);
    },
    "toggle-ask-settings"() {
      S.showAskSettings = !S.showAskSettings;
      render();
    },
    "save-ask-endpoint"() {
      const url = val("ayurparamUrl");
      if (window.RAG && window.RAG.setEndpoint) window.RAG.setEndpoint(url);
      toast(S.lang === "hi" ? "Endpoint सहेजा गया" : "Endpoint saved");
      S.showAskSettings = false;
      render();
    },
    async "ask-chip"(el) {
      const q = el.dataset.q || "";
      S.askQuery = q;
      await runAsk(q);
    },
    async "ask-submit"() {
      const q = val("askQ");
      S.askQuery = q;
      await runAsk(q);
    },
    "open-wa"() {
      const raw = val("waPhone");
      const clean = raw.replace(/\D/g, "");
      if (raw && clean.length !== 10) {
        return toast(S.lang === "hi" ? "कृपया सही 10-अंकीय मोबाइल नंबर दर्ज करें (या खाली छोड़ें)" : "Please enter a valid 10-digit number (or leave blank)", true);
      }
      if (DB.setWaPhone) DB.setWaPhone(clean);
      const p = DB.getSelfProfile() || {};
      const url = buildWhatsAppUrl(p, clean);
      window.open(url, "_blank", "noopener,noreferrer");
      toast(S.lang === "hi" ? "WhatsApp संदेश तैयार किया गया" : "WhatsApp message prepared");
    },
    "download-ics"() {
      const p = DB.getSelfProfile() || {};
      const ics = buildIcsContent(p);
      const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ayurgarbha-weekly-reminder.ics";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast(S.lang === "hi" ? "कैलेंडर रिमाइंडर (.ics) डाउनलोड हो गया" : "Calendar reminder (.ics) downloaded");
    },
    "baby-kick"() {
      const isHi = S.lang === "hi";
      const baby = $("#garbhiniBaby");
      const ripple = $("#kickRipple");
      const msg = $("#kickMsg");
      if (baby) {
        baby.classList.remove("kicking");
        void baby.getBoundingClientRect();
        baby.classList.add("kicking");
      }
      if (ripple) {
        ripple.classList.remove("active");
        void ripple.getBoundingClientRect();
        ripple.classList.add("active");
      }
      if (msg) {
        msg.textContent = isHi ? "💛 शिशु ने हलचल की!" : "💛 Baby moved!";
      }
    },
    "go-home"() {
      S.screen = "home";
      render();
      window.scrollTo(0, 0);
    },
    "delete-my-data"() {
      const isHi = S.lang === "hi";
      if (!confirm(isHi ? "क्या आप वाकई अपना समस्त डेटा मिटाना चाहते हैं?" : "Delete all stored data from this device?")) return;
      DB.deleteMyData();
      S.consentChecked = false;
      S.screen = "consent";
      render();
      toast(isHi ? "समस्त डेटा मिटा दिया गया।" : "All local data deleted.");
    },
    "close-modal"() {
      const m = $("#modal");
      if (m) m.hidden = true;
    }
  };

  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-action]");
    if (!el) return;
    const fn = H[el.dataset.action];
    if (fn) {
      if (el.type !== "checkbox" && el.type !== "radio") e.preventDefault();
      fn(el);
    }
  });

  document.addEventListener("change", (e) => {
    if (e.target.id === "f_lmp" || e.target.id === "f_month") {
      updateCalcPreview();
    }
    if (e.target.id === "f_lang") {
      S.lang = e.target.value === "en" ? "en" : "hi";
      localStorage.setItem("ayur_lang", S.lang);
      render();
    }
  });

  document.addEventListener("input", (e) => {
    if (e.target.id === "fetusSlider") {
      S.fetusMonth = Number(e.target.value) || 1;
      updateFetusView(S.fetusMonth);
    }
  });

  async function runAsk(q) {
    if (!q) return toast(S.lang === "hi" ? "कृपया पहले प्रश्न लिखें" : "Please enter a question", true);
    S.askLoading = true;
    S.askResult = null;
    render();
    const p = DB.getSelfProfile() || {};
    if (window.RAG && window.RAG.setRecords) {
      window.RAG.setRecords(DB.getVerifiedRecords());
    }
    const res = await window.RAG.ask(q, {
      month: p.month || null,
      lang: S.lang,
      evaluateRedFlags
    });
    S.askLoading = false;
    S.askResult = res;
    render();
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") H["close-modal"]();
    if (e.key === "Enter" && e.target.id === "askQ") H["ask-submit"]();
  });

  /* ------------------------------ BOOT ------------------------------ */
  (function boot() {
    document.documentElement.dataset.theme = "light";
    S.screen = "splash";
    render();
    DB.loadRecords().then(() => {
      if (window.RAG && window.RAG.setRecords) {
        window.RAG.setRecords(DB.getVerifiedRecords());
      }
      if (S.screen === "section" || S.screen === "ask") render();
    });
    window.AyurGarbha = { S, render, evaluateRedFlags, buildWhatsAppUrl, buildIcsContent };
  })();
})();
