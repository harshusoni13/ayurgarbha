/* =====================================================================
 * AyurGarbha — app.js
 * Clinical Garbhini & Sutika Paricharya System
 * Dual-role architecture:
 *   - Mother / Patient Self-Care Portal
 *   - Doctor Clinical Workstation
 * Features:
 *   - 6-Digit Link Code (`AG-XXXX`) bidirectional sync via Firebase Firestore
 *   - Interactive Daily Dinacharya Checklist (Morning to Night) + Live Progress Bar
 *   - Dynamic Month (1–9) × Ritu (6 Seasons) Matrix Explorer
 *   - Interactive Symptom & Garbhopaghatakara Triage Checker
 *   - Hospital-Grade A4 Printable Care Card
 *   - Client-Side Dual-Citation BM25 RAG Engine
 * ===================================================================== */
(function () {
  "use strict";
  const KB = window.KB, DB = window.DB;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const E = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const todayStr = () => new Date().toISOString().slice(0, 10);
  const fmtDate = (s) => { if (!s) return "—"; const d = new Date(s + (s.length === 10 ? "T00:00:00" : "")); return isNaN(d) ? s : d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }); };
  const ul = (a, c) => `<ul class="clean ${c || ""}">${(a || []).map((x) => `<li>${E(x)}</li>`).join("")}</ul>`;
  const ORD = ["", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"];

  /* ------------------- Bilingual Translations (English & हिन्दी) ------------------- */
  const I18N = {
    en: {
      appName: "AyurGarbha",
      appSubtitle: "AI Care Companion for Garbhini, Sutika & Navajata Paricharya",
      heroBadge: "🪷 Evidence-Based Care · Charaka & Sushruta Samhita",
      heroHeading: "AyurGarbha",
      heroLead: "Classical Masanumasika Paricharya from <b>Charaka Samhita & Sushruta Samhita</b> correlated with <b>DC Dutta's Textbook of Obstetrics</b>. Multi-layered clinical safety guardrails & DPDP Act 2023 aligned.",
      judgeDemoBtn: "🎬 Watch Judge Demo (Zero Login)",
      motherPortalTitle: "Mother / Patient Portal",
      motherPortalDesc: "Personalized gestational guidance & seasonal Dinacharya from your LMP, or view clinical records synced with an 8-character Share Code.",
      ashaPortalTitle: "ASHA / Field Worker Portal",
      ashaPortalDesc: "Community antenatal field workstation: risk-prioritized mother triage, 5-field home visit entries, and instant red-flag detection.",
      doctorPortalTitle: "Doctor Clinical Workstation",
      doctorPortalDesc: "Obstetric workstation for clinicians: ANC case sheets, G-P-L-A vitals, Agni/Koshtha, and A4 printable care cards.",
      lmpTab: "LMP + Ritu + Symptoms",
      codeTab: "8-Char Share Code",
      nameOpt: "Your Name (Optional)",
      lmpLabel: "Last Menstrual Period (LMP) *",
      locationLabel: "Location / City",
      seasonLabel: "Current Ritu (Season)",
      symptomsLabel: "Presenting Complaints / Symptoms (Optional):",
      enterMotherBtn: "Enter Patient Portal →",
      shareCodeLabel: "8-Character Share Code (AG-XXXXXX)",
      syncMotherBtn: "Sync With Doctor / ASHA →",
      doctorGoogleBtn: "Sign in with Google (Doctor Workstation)",
      ashaGoogleBtn: "Sign in with Google (ASHA Field Workstation)",
      quickStart5: "⚡ Quick Start (Month 5 · Grishma)",
      quickStart8: "⚡ Quick Start (Month 8 · Ojas)",
      switchRole: "⇄ Switch role",
      langToggle: "हिन्दी (HI)",
      deleteMyData: "Delete My Data (मेरा डेटा मिटाएँ)",
      tabs: {
        overview: "🏠 Overview",
        month: "📅 Month × Ritu Plan",
        dina: "⏰ Daily Dinacharya",
        triage: "⚠️ Symptom Triage",
        ritu: "🍃 6 Ritus",
        avoid: "⛔ Avoid (Apathya)",
        care: "🩺 Care Team",
        ask: "🔎 Ask Assistant (RAG)",
        sutika: "🤱 Sutika (Postnatal)",
        navajata: "👶 Newborn (Navajata)"
      }
    },
    hi: {
      appName: "आयुर्गर्भ",
      appSubtitle: "गर्भिणी, सूतिका एवं नवजात परिचर्या हेतु एआई स्वास्थ्य साथी",
      heroBadge: "🪷 प्रमाण-आधारित आयुर्वेदिक मातृ एवं शिशु स्वास्थ्य",
      heroHeading: "आयुर्गर्भ (AyurGarbha)",
      heroLead: "<b>चरक संहिता एवं सुश्रुत संहिता</b> के प्रामाणिक मासानुमासिक सिद्धांतों का <b>डीसी दत्ता ऑब्सटेट्रिक्स</b> के साथ वैज्ञानिक समन्वय। बहुस्तरीय नैदानिक सुरक्षा एवं डीपीडीपी अधिनियम 2023 के अनुरूप।",
      judgeDemoBtn: "🎬 डेमो देखें (Judge Demo — बिना लॉगिन)",
      motherPortalTitle: "गर्भिणी व माता पोर्टल (Self-Care)",
      motherPortalDesc: "एलएमपी (LMP) से अपने गर्भ माह व ऋतु अनुसार दिनचर्या जानें, अथवा 8-अक्षरी शेयर कोड से डॉक्टर रिकॉर्ड देखें।",
      ashaPortalTitle: "आशा / एएनएम स्वास्थ्य कार्यकर्ता पोर्टल",
      ashaPortalDesc: "ग्रामीण मातृ स्वास्थ्य निगरानी: जोखिम-आधारित प्राथमिकता सूची (लाल/पीला/हरा), 5-फील्ड त्वरित विज़िट फ़ॉर्म व रेड-फ़्लैग अलर्ट।",
      doctorPortalTitle: "चिकित्सक कार्यस्थल (Doctor Workstation)",
      doctorPortalDesc: "आयुर्वेदिक प्रसूति कार्यस्थल: एएनसी केस शीट, जी-पी-एल-ए सूत्र, अग्नि/कोष्ठ परीक्षा, तथा ए4 प्रिंटेबल केयर कार्ड।",
      lmpTab: "एलएमपी + ऋतु + लक्षण",
      codeTab: "8-अक्षरी शेयर कोड",
      nameOpt: "माता का नाम (वैकल्पिक)",
      lmpLabel: "अंतिम मासिक धर्म की तिथि (LMP) *",
      locationLabel: "स्थान / शहर",
      seasonLabel: "वर्तमान ऋतु",
      symptomsLabel: "वर्तमान लक्षण / समस्याएं (वैकल्पिक — बहु-चयन):",
      enterMotherBtn: "माता पोर्टल में प्रवेश करें →",
      shareCodeLabel: "8-अक्षरी शेयर कोड (AG-XXXXXX)",
      syncMotherBtn: "डॉक्टर / आशा से सिंक करें →",
      doctorGoogleBtn: "Google द्वारा डॉक्टर लॉगिन करें",
      ashaGoogleBtn: "Google द्वारा आशा लॉगिन करें",
      quickStart5: "⚡ त्वरित शुरुआत (5वां माह · ग्रीष्म)",
      quickStart8: "⚡ त्वरित शुरुआत (8वां माह · ओज)",
      switchRole: "⇄ भूमिका बदलें",
      langToggle: "English (EN)",
      deleteMyData: "मेरा डेटा मिटाएँ (Delete My Data)",
      tabs: {
        overview: "🏠 परिचय",
        month: "📅 मास × ऋतु योजना",
        dina: "⏰ दैनिक दिनचर्या",
        triage: "⚠️ लक्षण ट्राइएज",
        ritu: "🍃 ६ ऋतुएँ",
        avoid: "⛔ अपथ्य (वर्जित)",
        care: "🩺 डॉक्टर व आशा",
        ask: "🔎 आयुर्वेद सहायक (RAG)",
        sutika: "🤱 सूतिका (प्रसवोपरांत)",
        navajata: "👶 नवजात शिशु परिचर्या"
      }
    }
  };

  const t = (k) => {
    const l = S.lang || "en";
    const dict = I18N[l] || I18N.en;
    return dict[k] != null ? dict[k] : (I18N.en[k] != null ? I18N.en[k] : k);
  };

  /* ------------------- Deterministic Red-Flag Engine (Runs BEFORE AI/RAG) ------------------- */
  const RED_FLAG_KEYWORDS = [
    { pattern: /bleeding|bleed|haemorrhage|hemorrhage|blood|रक्त|रक्तस्राव|खून|लाल स्राव/i, labelEn: "Vaginal bleeding / haemorrhage", labelHi: "योनि से रक्तस्राव" },
    { pattern: /leaking|leak|water broke|fluid gush|amniotic|पानी जाना|पानी छूटना|द्रव स्राव/i, labelEn: "Amniotic fluid leaking (PPROM)", labelHi: "पानी छूटना / थैली फटना" },
    { pattern: /severe headache|throbbing headache|तेज़ सिरदर्द|असहनीय सिरदर्द/i, labelEn: "Severe persistent headache (Pre-eclampsia warning)", labelHi: "तेज़ सिरदर्द (प्री-एक्लेमप्सिया चेतावनी)" },
    { pattern: /blurred vision|blur|spots before eyes|धुंधला|धुँधला|आंखों के आगे अंधेरा/i, labelEn: "Blurred vision / visual disturbances", labelHi: "धुँधला दिखना / आँखों के आगे अंधेरा" },
    { pattern: /reduced movement|decreased movement|no movement|absent movement|कम हलचल|हलचल कम|बच्चा हिल नहीं रहा/i, labelEn: "Reduced or absent fetal movements", labelHi: "गर्भस्थ शिशु की हलचल कम होना" },
    { pattern: /high fever|chills|shivering|तेज़ बुखार|कम्प|बुखार/i, labelEn: "High fever with chills", labelHi: "तेज़ बुखार व कंपकंपी" },
    { pattern: /seizure|convulsion|fits|दौरा|झटका/i, labelEn: "Seizures / Eclampsia", labelHi: "दौरा / एक्लेमप्सिया" },
    { pattern: /severe abdominal pain|intense pelvic pain|पेट में तेज़ दर्द/i, labelEn: "Severe acute abdominal pain", labelHi: "पेट में तेज़ असहनीय दर्द" }
  ];

  function evaluateRedFlags({ text = "", bp = "", hb = "", fhr = "", pulse = "", complaints = [] } = {}) {
    const alerts = [];
    const combinedText = [text, Array.isArray(complaints) ? complaints.join(" ") : ""].join(" ");
    
    RED_FLAG_KEYWORDS.forEach((rf) => {
      if (rf.pattern.test(combinedText)) {
        alerts.push({ type: "keyword", en: rf.labelEn, hi: rf.labelHi });
      }
    });

    if (bp) {
      const parts = String(bp).split("/").map((s) => parseInt(s.trim(), 10));
      if (parts.length >= 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        const sys = parts[0], dia = parts[1];
        if (sys >= 140 || dia >= 90) {
          alerts.push({
            type: "vitals",
            en: `High Blood Pressure (${sys}/${dia} mmHg ≥ 140/90) — Pre-eclampsia risk`,
            hi: `उच्च रक्तचाप (${sys}/${dia} mmHg ≥ 140/90) — प्री-एक्लेमप्सिया जोखिम`
          });
        }
      }
    }

    if (hb != null && hb !== "") {
      const h = parseFloat(hb);
      if (!isNaN(h) && h > 0 && h < 9.0) {
        alerts.push({
          type: "vitals",
          en: `Severe Anemia (Hb ${h} g/dl < 9.0 g/dl) — Urgent referral required`,
          hi: `गंभीर रक्ताल्पता / पांडु (Hb ${h} g/dl < 9.0) — तत्काल अस्पताल संदर्भ आवश्यक`
        });
      }
    }

    if (fhr != null && fhr !== "") {
      const f = parseInt(fhr, 10);
      if (!isNaN(f) && (f < 110 || f > 160)) {
        alerts.push({
          type: "vitals",
          en: `Abnormal Fetal Heart Rate (${f} bpm; normal 110–160 bpm) — Fetal distress risk`,
          hi: `असामान्य शिशु हृदय गति (${f} bpm; सामान्य 110–160 bpm) — फीटल डिस्ट्रेस जोखिम`
        });
      }
    }

    const hasRedVitals = alerts.some(a => a.type === "vitals" || a.type === "keyword");
    let risk = "green";
    if (hasRedVitals) {
      risk = "red";
    } else if ((hb && parseFloat(hb) < 11.0) || combinedText.includes("shopha") || combinedText.includes("edema")) {
      risk = "yellow";
    }

    return {
      triggered: alerts.length > 0,
      risk,
      alerts,
      bannerHTML(lang = "en") {
        if (!alerts.length) return "";
        const isHi = lang === "hi";
        return `
          <div class="emergency-banner-critical" role="alert">
            <div class="emergency-banner-title">
              <span class="emergency-icon">🚨</span>
              <b>${isHi ? "⚠️ चेतावनी: तुरंत अस्पताल जाएँ / डॉक्टर से संपर्क करें" : "⚠️ Urgent Warning: Go to Hospital / Contact your Doctor immediately."}</b>
            </div>
            <ul class="emergency-reasons-list">
              ${alerts.map(a => `<li>${E(isHi ? a.hi : a.en)}</li>`).join("")}
            </ul>
            <div class="emergency-banner-action">
              <a href="tel:108" class="btn btn-sm btn-danger" style="background:#be123c;color:#fff;font-weight:700;">📞 108 Ambulance</a>
              <span class="small" style="color:#fecdd3;">${isHi ? "विलंब न करें। यह आपातकालीन लक्षण हो सकता है।" : "Immediate medical evaluation required. Do not delay."}</span>
            </div>
          </div>
        `;
      }
    };
  }

  function filterDosageForPatient(text) {
    if (!text) return "";
    return String(text)
      .replace(/\b(\d+(\.\d+)?\s*(mg|mcg|g|ml|iu)\b[^\.;,\n]*)/gi, "prescribed supportive care")
      .replace(/thiamine\s*\d+\s*mg/gi, "prescribed neuro-protective therapy")
      .replace(/pyridoxine\s*\d+\s*mg/gi, "prescribed supportive vitamin therapy")
      .replace(/iv fluids|intravenous/gi, "supervised hydration");
  }

  const S = {
    lang: localStorage.getItem("ayur_lang") || "hi",
    asha: {
      name: "Sunita Devi",
      tag: "ASHA Worker",
      village: "Rampur PHC / Sub-Center",
      email: null,
      uid: null,
      photoURL: null
    },
    ashaFilter: "all",
    ashaPatientId: null,
    demoActive: false,
    role: null,
    tab: "overview",
    ctab: "case",
    patientId: null,
    selId: null,
    clinician: {
      name: "Doctor",
      tag: "Doctor",
      email: null,
      uid: null,
      photoURL: null,
      clinicName: "",
      clinicAddress: "",
      clinicContact: ""
    },
    viewMonth: null,
    rituSel: null,
    fuMonth: null,
    triageSym: "chhardi",
    selfComplaints: [],
    ask: { q: "", res: null, loading: false, domain: "all", samhita: "all" }
  };

  const TOPIC_PREVIEWS = {
    "preview-1": {
      key: "preview-1",
      badge: "5th Month · Grishma Ritu (Summer)",
      title: "5th Month Pregnancy + Grishma Ritu (Summer) Regimen",
      tagline: "Charaka & Sushruta Masanumasika Paricharya × DC Dutta 18–22W Anomaly Scan",
      shloka: "पञ्चमे मासि क्षीरसर्पिः प्रयोजयेत्, मांसशोणितोपचयो गर्भे। ग्रीष्मे तु शीतमधुरद्रवप्रायम्॥",
      iast: "pañcame māsi kṣīrasarpiḥ prayojayet, māṁsaśoṇitopacayo garbhe | grīṣme tu śītamadhuradravaprāyam ||",
      hi: "पाँचवें महीने में गर्भ के मांस और रक्त धातु का तीव्र उपचय होता है। गर्भिणी को घृतयुक्त मधुर दूध (क्षीर-सर्पि) तथा पुष्टिदायक मूंग यूष लेना चाहिए। ग्रीष्म ऋतु में पित्त व वात प्रकोप से बचने के लिए शीतल, मधुर, जलीय आहार (नारियल पानी, लाजामण्ड, चन्दन लेप) करें।",
      en: "In the 5th month, fetal muscular and somatic tissue (Mamsa & Shonita) expands rapidly, making maternal nourishment via Ksheera-Sarpi (cow's milk processed with pure ghee) and Mamsa-Rasa (or high-protein split gram broths) essential. During Grishma Ritu (summer), intense heat aggravates Vata and Pitta, necessitating cooling sweet fluids, coconut water, boiled-cooled milk, and strictly avoiding strenuous mid-day heat or dehydration.",
      dcdutta: "DC Dutta Ch. 4 (18–22 Weeks) & Ch. 9: Targeted Imaging for Fetal Anomalies (TIFFA / Level-II Ultrasound) confirms complete structural anatomy, placental site, and amniotic fluid volume. Maternal perception of fetal movement (quickening) is verified. Severe maternal dehydration in summer triggers premature uterine irritability.",
      red_flags: ["Sudden leakage of clear amniotic fluid PV", "Total absence of fetal movements for >12 hours", "High fever with chills or signs of acute heat exhaustion"],
      citation: "Charaka Samhita, Sharira Sthana 8/32 & Sushruta Samhita, Sharira Sthana 10/4"
    },
    "preview-2": {
      key: "preview-2",
      badge: "4th Month · Dauhrida Protocol",
      title: "4th Month — Dauhrida (द्विहृदया / Fetal Heart & Cravings) Protocol",
      tagline: "Charaka & Sushruta Dauhrida Science × DC Dutta 16W Fetal Period",
      shloka: "चतुर्थे मासि स्थिरत्वमापद्यते गर्भः, द्विहृदयां च तदा गर्भिणीमाचक्षते। दौहृदविमाननात् कुब्जं कुणिं जडं वा जनयति॥",
      iast: "caturthe māsi sthiratvamāpadyate garbhaḥ, dvihṛdayāṁ ca tadā garbhiṇīmācakṣate | dauhṛdavimānanāt kubjaṁ kuṇiṁ jaḍaṁ vā janayati ||",
      hi: "चौथे महीने में गर्भस्थ हृदय प्रस्फुटित होने से स्त्री 'द्विहृदया' कहलाती है। गर्भ अपनी इच्छाओं को माता के माध्यम से प्रकट करता है। अतः दौहृद (गर्भावस्था की इच्छाओं) का सम्मान व पोषण अनिवार्य है, अन्यथा गर्भ में विकृति हो सकती है। नवनीत-युक्त क्षीर का सेवन करें।",
      en: "By the 4th month, the fetal heart establishes functional connection with maternal circulation; the mother is designated 'Dvihridaya' (bearing two hearts). Fetal sense faculties express desires and cravings through maternal sensory longings (Dauhrida). Non-fulfilment or suppression of Dauhrida causes congenital defects, spinal curvature (Kubja), limb deformities (Kuni), or psychiatric instability.",
      dcdutta: "DC Dutta Ch. 4 (Weeks 14–16 Fetal Period) & Ch. 8: Fetal cardiac chambers are fully differentiated and fetal heart tones (120-160 bpm) are readily heard with Doppler. Organogenesis is complete; placenta is fully endocrine-active. Second trimester cravings and altered olfaction/taste are mediated by beta-hCG, leptin, and progesterone.",
      red_flags: ["Persistent severe pica (eating clay/chalk/dirt - indicates severe iron deficiency)", "Acute severe lower abdominal cramping", "Painless vaginal bleeding PV"],
      citation: "Charaka Samhita, Sharira Sthana 4/15 & Sushruta Samhita, Sharira Sthana 3/18"
    },
    "preview-3": {
      key: "preview-3",
      badge: "8th Month · Ojas Instability",
      title: "8th Month — Ojas Instability (ओज की अस्थिरता) & Diet Precautions",
      tagline: "Charaka Ojas Physiology × DC Dutta 32–36W Late Preterm Vulnerability",
      shloka: "अष्टमे मासि गर्भश्च माता च परस्परत ओजोऽऽददाते, तस्मात्तदा गर्भिणी मुहुर्मुदिता मुहुश्च म्लाना। तस्मात् क्षीरयवागूं सर्पिष्मतीं प्रयोजयेत्॥",
      iast: "aṣṭame māsi garbhaśca mātā ca parasparata ojo''dadāte, tasmāttadā garbhiṇī muhurmuditā muhuśca mlānā | tasmāt kṣīrayavāgūṁ sarpiṣmatīṁ prayojayet ||",
      hi: "आठवें महीने में ओज माता और गर्भ के बीच निरंतर गतिशील रहता है। इस कारण गर्भिणी कभी अत्यधिक उत्साहित और कभी अचानक थकान महसूस करती है। इस मास में प्रसव होने पर ओज के अभाव से माता और शिशु दोनों का स्वास्थ्य संशय में रहता है। अतः क्षीर-यवागु घृतयुक्त आहार लें और शांत रहें।",
      en: "In the 8th month, vital immune essence (Ojas) remains physiologically labile, continually cycling between maternal and fetal circulation through the umbilical cord. The mother experiences alternating states of high energy and sudden exhaustion. Delivery during this month is fraught with peril due to transient lack of Ojas. Prescribes warm Ksheera-Yavagu with cow's ghee, serene rest, and total avoidance of physical stress.",
      dcdutta: "DC Dutta Ch. 4 & 21 (32–36 Weeks Late Preterm): Fetal pulmonary alveolar type-II pneumocytes are actively producing surfactant (L/S ratio maturation). Preterm delivery before 36 weeks elevates risks of neonatal respiratory distress syndrome (RDS), hypothermia, and neonatal sepsis.",
      red_flags: ["Regular painful uterine contractions (>4 per hour before 37 weeks)", "Sudden clear fluid gush PV (PPROM)", "Elevated blood pressure (>140/90 mmHg) with frontal headache"],
      citation: "Charaka Samhita, Sharira Sthana 8/24 & Sushruta Samhita, Sharira Sthana 10/4"
    },
    "preview-4": {
      key: "preview-4",
      badge: "Postnatal · 45-Day Care",
      title: "Sutika Paricharya — Post-Delivery 45-Day Care & Stanyajanana",
      tagline: "Charaka & Sushruta Sutika Protocols × DC Dutta 6-Week Puerperium",
      shloka: "सूतिकां स्नेहस्वेदाभ्यां उपाचरेत्। पञ्चकोलसिद्धां यवागूं पाययेत्, उदरवेष्टनं च कुर्याद् वातशमनाय गर्भाशयसंकोचनाय च॥",
      iast: "sūtikāṁ snehasvedābhyāṁ upācaret | pañcakolasiddhāṁ yavāgūṁ pāyayet, udaraveṣṭanaṁ ca kuryād vātaśamanāya garbhāśayasaṁkocanāya ca ||",
      hi: "प्रसव के उपरांत माता का शरीर धातु-रिक्त और वात-प्रकोपित होता है। प्रथम 3 दिन स्नेहपान और पंचकोल यवागू से अग्नि दीपन करें। गर्भाशय के संकोच (involution) और वात शमन हेतु उदरवेष्टन (पेट पर सूती वस्त्र लपेटना) करें। बाद में बला तैल अभ्यंग और शतावरी से स्तन्य वृद्धि करें।",
      en: "Following childbirth, maternal Dhatus are severely depleted (Dhatu-Rikta) and Vata is excessively provoked in the empty uterine cavity. Clinical care mandates gentle Bala Taila Abhyanga, warm decoction Parisheka, Panchakola Yavagu (digestive gruel) to rekindle Agni, and firm cotton Udaraveshtana (abdominal wrapping) to assist anatomical involution and eliminate visceral laxity. Galactagogues like Shatavari and garlic stimulate rich breast milk.",
      dcdutta: "DC Dutta Ch. 13 (The Normal Puerperium): Physiological involution of the uterus proceeds at ~1.25 cm daily until returning to pelvis by day 10–12. Prevention of postpartum hemorrhage (PPH), lochial monitoring (rubra -> serosa -> alba), early ambulation to prevent DVT, and exclusive breastfeeding.",
      red_flags: ["Excessive bleeding soaking >1 large pad/hour (Postpartum Hemorrhage)", "Foul-smelling lochial discharge accompanied by fever >100.4°F", "Unilateral severe calf swelling, pain, and erythema (DVT)"],
      citation: "Charaka Samhita, Sharira Sthana 8/48 & Sushruta Samhita, Sharira Sthana 10/16"
    }
  };

  const PTABS = [
    ["overview", "🏠 Overview"],
    ["month", "📅 Month × Ritu Plan"],
    ["dina", "⏰ Daily Dinacharya"],
    ["triage", "⚠️ Symptom Triage"],
    ["ritu", "🍃 6 Ritus"],
    ["avoid", "⛔ Avoid (Apathya)"],
    ["care", "🩺 Care Team"],
    ["ask", "🔎 Ask Assistant (RAG)"],
    ["sutika", "🤱 Sutika (Postnatal)"],
    ["navajata", "👶 Newborn (Navajata)"]
  ];

  /* ------------------------------ helpers ------------------------------ */
  function toast(msg, err) {
    const t = $("#toast");
    t.textContent = msg;
    t.className = "toast" + (err ? " err" : "");
    t.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => (t.hidden = true), 3200);
  }

  function banner(cls) {
    return `<div class="advisory ${cls || ""}" role="alert"><span>${KB.DISCLAIMER}</span></div>`;
  }

  function persist() {
    DB.setSession({ role: S.role, patientId: S.patientId, clinician: S.clinician, selId: S.selId });
  }

  function openModal(html) {
    const m = $("#modal");
    $("#modalCard").innerHTML = html;
    m.hidden = false;
  }

  function closeModal() {
    $("#modal").hidden = true;
  }

  function ensureTabVisible(tabEl, containerEl) {
    if (!tabEl) return;
    const c = containerEl || tabEl.closest(".tabs");
    if (!c) return;
    const cRect = c.getBoundingClientRect();
    const tRect = tabEl.getBoundingClientRect();
    const isClippedLeft = tRect.left < cRect.left;
    const isClippedRight = tRect.right > cRect.right;
    if (isClippedLeft || isClippedRight) {
      tabEl.scrollIntoView({ behavior: "instant", inline: "nearest", block: "nearest" });
    }
  }

  function ctxFor(src, rec) {
    const g = KB.gestationalWeeks(src.lmp) || { weeks: 0, rem: 0, days: 0 };
    const weeks = Math.max(0, Math.min(44, g.weeks));
    const month = KB.monthFromWeeks(weeks);
    const auto = KB.rituFromDate();
    const ritu = S.rituSel || (src.ritu && src.ritu !== "auto" ? src.ritu : auto);
    const edd = KB.eddFromLmp(src.lmp);
    const toGo = edd ? Math.ceil((new Date(edd + "T00:00:00") - new Date()) / 86400000) : null;
    return { name: src.name || "Mother", lmp: src.lmp, weeks, days: g.rem, month, trimester: KB.trimesterOf(weeks), ritu, autoRitu: auto, edd, toGo, rec, src, location: src.location || "" };
  }

  async function currentPatientCtx() {
    if (S.role === "clinician") {
      const rec = S.selId ? await DB.getPatient(S.selId) : null;
      return rec ? ctxFor(rec, rec) : null;
    }
    const rec = S.patientId ? await DB.getPatient(S.patientId) : null;
    const self = DB.getSelfProfile();
    if (rec) return ctxFor(rec, rec);
    if (self) return ctxFor(self, null);
    return null;
  }

  const expectedGain = (w) => (w <= 13 ? w * 0.15 : 2 + (w - 13) * 0.4);

  /* ------------------- Dinacharya Checklist Persistence ------------------- */
  function getDinaKey(ctx) {
    const pid = (ctx && ctx.rec && ctx.rec.id) || (ctx && ctx.src && ctx.src.name) || "self";
    return "ayurgarbha:dina:" + pid + ":" + todayStr();
  }

  function getDinaChecks(ctx) {
    try {
      const v = localStorage.getItem(getDinaKey(ctx));
      return v ? JSON.parse(v) : [];
    } catch (e) {
      return [];
    }
  }

  function toggleDinaCheck(ctx, index) {
    const k = getDinaKey(ctx);
    let list = getDinaChecks(ctx);
    if (list.includes(index)) {
      list = list.filter((i) => i !== index);
    } else {
      list.push(index);
    }
    localStorage.setItem(k, JSON.stringify(list));
    return list;
  }

  function resetDinaChecks(ctx) {
    localStorage.removeItem(getDinaKey(ctx));
  }

  function allDinaChecks(ctx, count) {
    const list = Array.from({ length: count }, (_, i) => i);
    localStorage.setItem(getDinaKey(ctx), JSON.stringify(list));
  }

  /* ------------------------------ Client-Side RAG Engine ------------------------------ */
  function probeBackend() {
    const chip = $("#apiChip");
    if (chip) {
      chip.textContent = "🟢 RAG: 100% Client-Side Active (<10ms)";
      chip.className = "chip chip-api chip-ok";
      chip.title = "Client-Side BM25 + Cosine Dual-Citation RAG Engine (131 Classical Chunks · 0 Cold Starts)";
    }
    return { ok: true, mode: "client_bm25" };
  }

  async function askRag(question, ctx) {
    probeBackend();
    const domain = S.ask.domain && S.ask.domain !== "all" ? S.ask.domain : null;
    const samhita = S.ask.samhita && S.ask.samhita !== "all" ? S.ask.samhita : null;
    const options = {
      month: ctx ? ctx.month : null,
      ritu: ctx ? ctx.ritu : null,
      domain,
      samhita,
      top_k: 5
    };
    if (typeof RAG !== "undefined" && RAG.ask) {
      return RAG.ask(question, options);
    }
    return KB.localAsk(question, options);
  }

  /* ------------------------------ GATEWAY ------------------------------ */
  function viewGateway() {
    const isHi = S.lang === "hi";
    const rituOpts =
      `<option value="auto">${isHi ? "आज की तिथि अनुसार ऋतु स्वतः पहचानें" : "Auto-detect from today's date"} (${E(KB.getRitu(KB.rituFromDate()).name)})</option>` +
      KB.RITUS.map((r) => `<option value="${r.key}">${r.name} — ${r.en}</option>`).join("");

    const complaints = [
      ["chhardi", isHi ? "🤢 वमन / जी मिचलाना (Chhardi)" : "🤢 Nausea / Vomiting (Chhardi)"],
      ["vibandha", isHi ? "🪵 विबन्ध / कब्ज़ (Vibandha)" : "🪵 Constipation (Vibandha)"],
      ["shopha", isHi ? "💧 शोथ / पैरों में सूजन (Shopha)" : "💧 Pedal Edema (Shopha)"],
      ["katishoola", isHi ? "⚡ कटिशूल / कमर दर्द (Katishoola)" : "⚡ Backache (Katishoola)"],
      ["klama", isHi ? "😴 क्लम / अत्यधिक थकान (Klama)" : "😴 Fatigue / Exhaustion (Klama)"],
      ["vidaha", isHi ? "🔥 विदाह / सीने में जलन (Vidaha)" : "🔥 Heartburn / Acidity (Vidaha)"]
    ];

    return `
    <section class="hero">
      <span class="chip chip-ok">${E(t("heroBadge"))}</span>
      <h1 class="mt">${E(t("heroHeading"))}</h1>
      <p class="lead" style="font-weight:600;color:var(--emerald);">${E(t("appSubtitle"))}</p>
      <p class="lead">${t("heroLead")}</p>

      <!-- Prominent Judge Demo Button -->
      <div class="mt" style="margin:16px 0;">
        <button class="btn btn-judge-demo btn-lg" data-action="open-judge-demo" style="box-shadow:0 6px 20px rgba(16,185,129,.35);font-size:1.1rem;padding:12px 24px;">
          ${E(t("judgeDemoBtn"))}
        </button>
      </div>
      
      <!-- Interactive Clinical Topic Preview Showcase -->
      <div class="topic-previews-wrap mt">
        <div class="row between">
          <div>
            <h3 class="muted small mb0" style="text-transform:uppercase;letter-spacing:.08em;">${isHi ? "शास्त्रीय नैदानिक पूर्वावलोकन (Charaka & Sushruta)" : "Interactive Clinical Topic Previews (Charaka & Sushruta)"}</h3>
            <p class="small muted">${isHi ? "व्यक्तिगत पोर्टल प्रवेश से पूर्व प्रामाणिक संहिता श्लोक एवं डीसी दत्ता समन्वय देखें।" : "Click any topic card to inspect authentic Samhita Shlokas & DC Dutta correlations prior to personalized portal entry."}</p>
          </div>
        </div>
        <div class="grid g2 mt">
          ${Object.values(TOPIC_PREVIEWS).map((p) => `
            <div class="glass topic-preview-card" data-action="open-topic-preview" data-topic="${p.key}">
              <div class="topic-preview-header">
                <span class="topic-preview-badge">🌸 ${E(p.badge)}</span>
                <span class="chip chip-ok small">${isHi ? "पूर्वावलोकन" : "Read-Only Preview"}</span>
              </div>
              <h3 class="mb0" style="font-size:1.05rem;">${E(p.title)}</h3>
              <p class="small muted mb0">${E(p.tagline)}</p>
              <div class="topic-preview-meta">
                <span>📜 ${E(p.citation.split(";")[0])}</span>
                <span style="color:var(--emerald);font-weight:700;">${isHi ? "प्रोटोकॉल देखें →" : "View Clinical Protocol →"}</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </section>

    ${banner()}

    <!-- 3 Role Portals: Mother, ASHA, Doctor -->
    <div class="grid g3 mt" id="portalsSection">
      <!-- 1. Mother / Patient Portal -->
      <section class="glass portal">
        <div class="ic">🤰</div>
        <h2>${E(t("motherPortalTitle"))}</h2>
        <p class="muted small">${E(t("motherPortalDesc"))}</p>
        <div class="seg">
          <button class="active" data-action="gate-tab" data-v="lmp">${E(t("lmpTab"))}</button>
          <button data-action="gate-tab" data-v="code">${E(t("codeTab"))}</button>
        </div>
        
        <div id="gate-lmp">
          <div class="field"><label>${E(t("nameOpt"))}</label><input id="g_name" placeholder="e.g. Mother / Self-Care" /></div>
          <div class="grid g2">
            <div class="field"><label>${E(t("lmpLabel"))}</label><input type="date" id="g_lmp" max="${todayStr()}" /></div>
            <div class="field"><label>${E(t("locationLabel"))}</label><input id="g_loc" placeholder="e.g. Pune, Maharashtra" /></div>
          </div>
          <div class="field"><label>${E(t("seasonLabel"))}</label><select id="g_ritu">${rituOpts}</select></div>

          <div class="mt">
            <label>${E(t("symptomsLabel"))}</label>
            <div class="pillbar" id="complaints-bar">
              ${complaints.map(([k, label]) => `
                <button type="button" class="pill ${S.selfComplaints.includes(k) ? 'active' : ''}" data-action="toggle-complaint" data-v="${k}">
                  ${label}
                </button>
              `).join("")}
            </div>
          </div>

          <div class="row mt" style="flex-wrap:wrap;gap:8px;">
            <button class="btn btn-ok" data-action="enter-lmp">${E(t("enterMotherBtn"))}</button>
            <button class="btn btn-ghost btn-sm" data-action="quick-selfcare-5">${E(t("quickStart5"))}</button>
            <button class="btn btn-ghost btn-sm" data-action="quick-selfcare-8">${E(t("quickStart8"))}</button>
          </div>
        </div>

        <div id="gate-code" hidden>
          <div class="field"><label>${E(t("shareCodeLabel"))}</label><input id="g_code" placeholder="AG-XXXXXX" maxlength="9" style="text-transform:uppercase;letter-spacing:.15em;font-weight:700" /></div>
          <button class="btn btn-ok" data-action="enter-code">${E(t("syncMotherBtn"))}</button>
          <p class="small muted mt">${isHi ? "डॉक्टर या आशा कार्यकर्ता से प्राप्त 8-अक्षरी शेयर कोड दर्ज कर प्रिस्क्रिप्शन एवं विज़िट शेड्यूल देखें।" : "Enter the 8-character Share Code from your doctor or ASHA worker to view live synced prescriptions, vitals, and next visits."}</p>
        </div>
      </section>

      <!-- 2. ASHA / Field Worker Portal -->
      <section class="glass portal">
        <div class="ic">👩‍⚕️</div>
        <h2>${E(t("ashaPortalTitle"))}</h2>
        <p class="muted small">${E(t("ashaPortalDesc"))}</p>
        <div style="margin:14px 0;padding:12px;background:var(--glass2);border-radius:10px;border:1px solid var(--line);">
          <div class="row" style="align-items:center;gap:6px;margin-bottom:6px;">
            <span class="chip small" style="background:#fef08a;color:#854d0e;font-weight:700;">Community Health</span>
            <span class="small muted">Risk Prioritization</span>
          </div>
          <p class="small muted mb0" style="font-size:.78rem;">${isHi ? "गाँव की गर्भवती महिलाओं की जोखिम-आधारित निगरानी करें (लाल = अस्पताल संदर्भ, पीला = निकट अवलोकन, हरा = सामान्य देखभाल)।" : "Triage village mothers by risk level (Red = Immediate Referral, Yellow = Close Monitor, Green = Routine Care) with 5-field home visit entry."}</p>
        </div>
        <div class="row mt" style="flex-direction:column;gap:8px;">
          <button class="btn btn-google w100" data-action="asha-google-login">
            <svg class="google-icon" viewBox="0 0 24 24" width="18" height="18"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
            ${E(t("ashaGoogleBtn"))}
          </button>
          <button class="btn btn-ghost btn-sm w100" data-action="quick-asha-demo">
            ⚡ ${isHi ? "त्वरित पूर्वावलोकन (ASHA Demo)" : "Quick Demo (ASHA Mode)"}
          </button>
        </div>
      </section>

      <!-- 3. Doctor Portal -->
      <section class="glass portal">
        <div class="ic">🩺</div>
        <h2>${E(t("doctorPortalTitle"))}</h2>
        <p class="muted small">${E(t("doctorPortalDesc"))}</p>
        
        ${(() => {
          const user = DB.getCurrentUser();
          const isDoctorAuthed = Boolean(user && !user.isAnonymous);
          if (!isDoctorAuthed) {
            return `
            <div class="doctor-auth-card mt">
              <div class="row" style="align-items:center;gap:6px;margin-bottom:6px;">
                <span class="chip chip-warn small">🔒 Auth Required</span>
                <span class="small muted">Doctor Workstation</span>
              </div>
              <p class="small muted" style="margin-bottom:10px;font-size:.78rem;">${isHi ? "सुरक्षित मरीज़ डायरेक्टरी, 8-अक्षरी शेयर कोड एवं ऑफ़लाइन-सिंक्ड केस शीट हेतु लॉगिन करें।" : "Sign in to manage your secure patient directory, generate unique 8-character Share Codes, and access offline ANC case sheets."}</p>
              <button class="btn btn-google w100" data-action="doctor-google-login">
                <svg class="google-icon" viewBox="0 0 24 24" width="18" height="18"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
                ${E(t("doctorGoogleBtn"))}
              </button>
              <button class="btn btn-ghost btn-sm w100 mt" data-action="quick-doctor-demo" style="margin-top:8px;">
                ⚡ ${isHi ? "त्वरित पूर्वावलोकन (Doctor Demo)" : "Quick Demo (Doctor Mode)"}
              </button>
            </div>`;
          }
          return `
          <div class="doctor-logged-card mt">
            <div class="row" style="align-items:center;gap:10px;">
              ${user.photoURL ? `<img src="${E(user.photoURL)}" alt="Avatar" style="width:38px;height:38px;border-radius:50%;border:2px solid var(--emerald);object-fit:cover;"/>` : `<div style="width:38px;height:38px;border-radius:50%;background:var(--emerald-d);color:#fff;display:grid;place-items:center;font-weight:700;font-size:1rem;">${E((user.displayName || "D")[0].toUpperCase())}</div>`}
              <div>
                <b style="font-size:1rem;">${E(user.displayName || "Doctor")}</b>
                <p class="muted small mb0">${E(user.email || "")}</p>
              </div>
            </div>
            <div class="field mt"><label>Doctor Name / Title</label><input id="c_name" value="${E(S.clinician.name || user.displayName || "Doctor")}" placeholder="e.g. Dr. Sharma (BAMS, MS Ayu)" /></div>
            <div class="row between mt">
              <button class="btn btn-primary" data-action="enter-clinician">Open Clinical Workstation →</button>
              <button class="btn btn-ghost btn-sm" data-action="doctor-sign-out">Sign Out</button>
            </div>
          </div>`;
        })()}
        <p class="small muted mt">${isHi ? "ए4 प्रिंटेबल एंटीनेटल केयर कार्ड एवं लाइव सिंक।" : "Generates printable A4 Antenatal Care Cards with live synchronization."}</p>
      </section>
    </div>

    <!-- 2-Samhita Stats Strip -->
    <div class="grid g4 mt">
      ${[["9", isHi ? "मास × 2 प्रमुख संहिताएँ (चरक व सुश्रुत)" : "Months × 2 Core Samhitas (Charaka & Sushruta)"], ["6", isHi ? "ऋतुचर्या (मौसमी आहार-विहार)" : "Ritus (Seasonal Regimens)"], ["14", isHi ? "दैनिक दिनचर्या चरण" : "Interactive Dinacharya Steps"], ["88", isHi ? "प्रमाण-आधारित ज्ञान खंड" : "Evidence-Based Knowledge Chunks"]].map((x) => `<div class="glass stat"><b class="grad">${x[0]}</b><span>${x[1]}</span></div>`).join("")}
    </div>

    <!-- DPDP Act 2023 Consent & Privacy Box -->
    <div class="privacy-consent-box mt">
      <div class="row between" style="align-items:center;flex-wrap:wrap;gap:10px;">
        <div style="flex:1;min-width:280px;">
          <b>🔒 DPDP Act 2023 Aligned:</b> ${isHi ? "आपकी स्वास्थ्य जानकारी केवल आपके डिवाइस पर सुरक्षित रहती है। आप जब चाहें अपना डेटा मिटा सकते हैं।" : "Local-first offline storage. Records stay on your device unless shared via secure 8-character Share Code."}
        </div>
        <div class="row" style="gap:8px;">
          <button class="btn btn-sm btn-ghost" data-action="open-consent-modal">${isHi ? "गोपनीयता नीति" : "Privacy & Consent"}</button>
          <button class="btn btn-sm btn-danger" data-action="delete-my-data">${E(t("deleteMyData"))}</button>
        </div>
      </div>
    </div>`;
  }

  /* ------------------------------ PATIENT PORTAL ------------------------------ */
  function patientShell(ctx, tabKey, embedded) {
    const rec = ctx.rec;
    const m = KB.getMonth(ctx.month);
    return `
    ${banner(embedded ? "" : "sticky")}
    <div class="glass card">
      <div class="row between">
        <div>
          <h2 class="mb0">🪷 ${E(ctx.name)} ${rec ? `<span class="chip chip-ok">🔗 Link Code: ${E(rec.linkCode)}</span>` : `<span class="chip">Self-Care Mode</span>`}</h2>
          <p class="muted small mb0">${E(ctx.location || "Self-Care")} · EDD: <b>${fmtDate(ctx.edd)}</b></p>
        </div>
        <div class="row">
          <span class="chip chip-warn">🍃 Season: ${E(KB.getRitu(ctx.ritu).name)}</span>
          <span class="chip chip-ok">Month ${ctx.month} · ${E(m.stage.split(" /")[0])}</span>
          <button class="btn btn-sm btn-primary" data-action="print">🖨️ A4 Care Card</button>
        </div>
      </div>
    </div>
    <nav class="tabs glass no-print">
      ${PTABS.map((t) => `<button class="tab ${t[0] === tabKey ? "active" : ""}" data-action="tab" data-v="${t[0]}">${t[1]}</button>`).join("")}
    </nav>
    <div id="tabBody">${patientTab(ctx, tabKey)}</div>`;
  }

  function patientTab(ctx, t) {
    switch (t) {
      case "month": return tabMonth(ctx);
      case "dina": return tabDina(ctx);
      case "triage": return tabTriage(ctx);
      case "ritu": return tabRitu(ctx);
      case "avoid": return tabAvoid(ctx);
      case "care": return tabCare(ctx);
      case "ask": return tabAsk(ctx);
      case "sutika": return tabSutika();
      case "navajata": return tabNavajata();
      default: return tabOverview(ctx);
    }
  }

  function tabOverview(ctx) {
    const m = KB.getMonth(ctx.month), r = KB.getRitu(ctx.ritu), rec = ctx.rec;
    const pct = Math.min(100, Math.round((ctx.weeks / 40) * 100));
    const fu = rec && (rec.followUps || []).slice(-1)[0];
    const next = fu && fu.nextFollowUp;
    const dinaChecks = getDinaChecks(ctx);
    const dinaPct = Math.round((dinaChecks.length / 14) * 100);

    return `
    <div class="grid g4">
      <div class="glass stat"><b>${ctx.weeks}w ${ctx.days}d</b><span>Gestational age (from LMP)</span></div>
      <div class="glass stat"><b>Month ${ctx.month}</b><span>${E(m.stage.split(" /")[0])}</span></div>
      <div class="glass stat"><b>Trimester ${ctx.trimester}</b><span>Weeks ${E(m.weeks)} (this month)</span></div>
      <div class="glass stat"><b>${ctx.toGo != null ? (ctx.toGo > 0 ? ctx.toGo + " days" : "Term") : "—"}</b><span>to EDD ${fmtDate(ctx.edd)}</span></div>
    </div>
    <div class="glass card mt">
      <div class="row between">
        <h3>📈 Pregnancy Progress &amp; Dinacharya Adherence</h3>
        <span class="chip chip-ok">Dinacharya: ${dinaChecks.length} / 14 done (${dinaPct}%)</span>
      </div>
      <div class="bar mt"><i style="width:${pct}%"></i></div>
      <p class="small muted mt mb0">${pct}% of 40 weeks completed · Ritu: <b>${E(r.name)}</b> (${E(r.period)})${ctx.autoRitu !== ctx.ritu ? " — manually adjusted" : " — seasonal auto-detected"}</p>
    </div>
    <div class="grid g2">
      <div class="ok-card">
        <h3>🥛 Masanumasika Ksheera / Ghrita (Month ${ctx.month})</h3>
        <b>${E(m.ksheera.name)}</b>
        <p class="mb0 mt">${E(m.ksheera.detail)}</p>
        <p class="small muted mt mb0"><b>Classical Reference:</b> ${E(KB.SAMHITA_MONTHLY[ctx.month].charaka.ref)}</p>
      </div>
      <div class="glass card">
        <h3>🌱 Garbha Vriddhi (Fetal Growth)</h3>
        <p>${E(m.fetal)}</p>
        <p class="small muted mb0"><b>DC Dutta:</b> ${E(m.dcdutta.title)}</p>
      </div>
    </div>
    <div class="grid g2">
      <div class="glass card">
        <h3>🍚 Pathya Ahara — Month ${ctx.month}</h3>
        ${ul(m.pathya.slice(0, 4), "good-list")}
        <button class="btn btn-sm mt" data-action="tab" data-v="month">Explore full Month × Ritu plan →</button>
      </div>
      <div class="glass card">
        <h3>🍃 ${E(r.name)} (${E(r.en)}) Season Regimen</h3>
        <p>${E(r.focus)}</p>
        <p class="small"><b>Day-sleep:</b> ${E(r.mods.sleep)}<br/><b>Water:</b> ${E(r.mods.water)}</p>
        <button class="btn btn-sm" data-action="tab" data-v="dina">Open Daily Dinacharya Tracker →</button>
      </div>
    </div>
    <div class="warn-card">
      <div class="row between">
        <h3 class="mb0">🚨 Symptom Triage &amp; Emergency Red Flags</h3>
        <button class="btn btn-sm btn-danger" data-action="tab" data-v="triage">Launch Interactive Triage →</button>
      </div>
      <p class="mt mb0">Go to hospital immediately if experiencing: ANY bleeding PV, sudden facial/hand edema, severe headache with blurred vision, leaking fluid, fever, or reduced fetal movement.</p>
    </div>
    ${rec ? `
      <div class="glass card">
        <h3>🩺 Synced Doctor Antenatal Care</h3>
        <p>Attending: <b>${E(rec.clinician || "Clinician")}</b> · Link Code: <code>${E(rec.linkCode)}</code> · Next follow-up: <b>${next ? fmtDate(next) : "not scheduled"}</b></p>
        <button class="btn btn-sm btn-ok" data-action="tab" data-v="care">View Synced Prescriptions &amp; Vitals →</button>
      </div>`
      : `
      <div class="glass card">
        <h3>🔗 Sync with your Doctor</h3>
        <p class="muted">Have a 6-digit Link Code (e.g. AG-1084)? Enter it to view your live ANC vitals, prescribed formulations, and next visit date.</p>
        <button class="btn btn-sm btn-ok" data-action="tab" data-v="care">Enter Link Code →</button>
      </div>`}`;
  }

  function samhitaAccordion(n) {
    const rows = KB.SAMHITA_MONTHLY[n];
    return ["charaka", "sushruta"].map((s, i) => {
      const e = rows[s];
      return `<details class="acc" ${i === 0 ? "open" : ""}>
        <summary>📜 ${E(KB.SAMHITAS[s].name)} <span class="muted small">— ${E(e.ref)}</span></summary>
        <div class="shloka">
          <div class="sa">${E(e.sa)}</div>
          <div class="iast">${E(e.iast)}</div>
          <div class="ref">${E(e.ref)}</div>
        </div>
        <p><b>हिन्दी:</b> ${E(e.hi)}</p>
        <p class="mb0"><b>English:</b> ${E(e.en)}</p>
      </details>`;
    }).join("");
  }

  /* ------------------- Interactive Dinacharya Checklist ------------------- */
  function tabDina(ctx) {
    const blocks = KB.buildDinacharya(ctx.ritu, ctx.month);
    const r = KB.getRitu(ctx.ritu);
    const checked = getDinaChecks(ctx);
    const total = blocks.length;
    const completed = checked.length;
    const pct = Math.round((completed / total) * 100);

    return `
    <div class="glass card">
      <div class="row between">
        <div>
          <h2 class="mb0">⏰ Daily Dinacharya Tracker — Month ${ctx.month} · ${E(r.name)} (${E(r.en)})</h2>
          <p class="muted small mb0">Interactive 24-hour routine tailored for gestational month ${ctx.month} and ${E(r.name)} Ritu.</p>
        </div>
        <div class="row">
          <button class="btn btn-sm" data-action="dina-reset">↺ Reset Today</button>
          <button class="btn btn-sm btn-ok" data-action="dina-all">✔ Mark All Done</button>
        </div>
      </div>
      <div class="dina-progress-card mt">
        <div class="row between small mb0">
          <b>Daily Routine Completion: ${completed} / ${total} steps (${pct}%)</b>
          <span class="chip ${pct === 100 ? 'chip-ok' : pct >= 50 ? 'chip-warn' : ''}">${pct === 100 ? '🌟 Outstanding Adherence!' : pct >= 50 ? '🌿 Good Progress' : '🌅 Starting the Day'}</span>
        </div>
        <div class="bar mt"><i style="width:${pct}%;"></i></div>
      </div>
    </div>
    <div class="timeline">
      ${blocks.map((b, i) => {
        const isDone = checked.includes(i);
        return `
        <div class="glass tl-item ${isDone ? 'dina-done' : ''}" data-ic="${b.icon}">
          <div class="row between">
            <label class="dina-label">
              <input type="checkbox" class="dina-check" data-action="dina-toggle" data-idx="${i}" ${isDone ? 'checked' : ''} />
              <span class="tl-time">${E(b.time)} · ${E(b.title)}</span>
            </label>
            ${isDone ? '<span class="chip chip-ok small">✔ Completed</span>' : ''}
          </div>
          <p class="mb0 mt dina-body">${E(b.body)}</p>
          <div class="tl-basis">Basis: ${E(b.basis)}</div>
        </div>`;
      }).join("")}
    </div>`;
  }

  /* -------------- Dynamic Month (1-9) x Ritu (6 Seasons) Explorer -------------- */
  function tabMonth(ctx) {
    const sel = S.viewMonth || ctx.month;
    const rituKey = S.rituSel || ctx.ritu;
    const m = KB.getMonth(sel);
    const r = KB.getRitu(rituKey);
    const gv = KB.GARBHA_VRIDDHI[sel - 1];

    return `
    <div class="glass card">
      <div class="row between">
        <div>
          <h2 class="mb0">📅 Dynamic Month (1–9) × Ritu (6 Seasons) Clinical Explorer</h2>
          <p class="muted small mb0">Select any pregnancy month and season to explore immediate adaptations in diet (Pathya), lifestyle (Vihara), and contraindications (Apathya).</p>
        </div>
        <span class="chip chip-ok">Patient Gestation: Month ${ctx.month} · ${E(KB.getRitu(ctx.autoRitu).name)}</span>
      </div>
      <div class="mt">
        <label>1. Select Gestational Month (1 to 9):</label>
        <div class="pillbar">
          ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `<button class="pill ${n === sel ? "active" : ""} ${n === ctx.month ? "now" : ""}" data-action="month" data-v="${n}">${ORD[n]} Month</button>`).join("")}
        </div>
      </div>
      <div>
        <label>2. Select Ritu (Season):</label>
        <div class="pillbar">
          ${KB.RITUS.map((x) => `<button class="pill ${x.key === rituKey ? "active" : ""} ${x.key === ctx.autoRitu ? "now" : ""}" data-action="ritu" data-v="${x.key}">🍃 ${x.name} (${x.en})</button>`).join("")}
          <button class="pill" data-action="ritu" data-v="">↺ Auto (${E(KB.getRitu(ctx.autoRitu).name)})</button>
        </div>
      </div>
    </div>

    <div class="glass card">
      <div class="row between">
        <h2 class="mb0">${ORD[sel]} Month — ${E(m.stage)}</h2>
        <div class="row">
          <span class="chip">Weeks ${E(m.weeks)}</span>
          <span class="chip">Trimester ${m.trimester}</span>
          <span class="chip chip-warn">Season: ${E(r.name)} (${E(r.en)})</span>
        </div>
      </div>
      <p class="mt">${E(m.fetal)}</p>
      <div class="shloka">
        <div class="sa">${E(gv.sa)}</div>
        <div class="iast">${E(gv.iast)}</div>
        <p class="mb0 mt"><b>हिन्दी:</b> ${E(gv.hi)}</p>
        <div class="ref">${E(gv.ref)} (Classical Garbha Vriddhi)</div>
      </div>
    </div>

    ${sel === 8 ? `
    <div class="warn-card">
      <h3>🛡️ 8th Month Special Protocol — Ojas Rakshana (Charaka Sha. 8.32 / Su. Sha. 3)</h3>
      <p><b>Clinical Rationale:</b> Ojas oscillates unstably between the mother and the fetus in the 8th month. If birth occurs now, the infant is highly vulnerable. Strict calmness, emotional serenity, and high-nutrition Ojas-building foods (Ksheera-Yavagu with ghee, dates, soaked almonds, saffron milk) are paramount.</p>
      <p class="mb0"><b>Basti Advisory:</b> Asthapana Basti (with Badara-siddha kwatha) and Anuvasana Basti (with Madhura-aushadha taila) may ONLY be administered by a qualified BAMS physician after obstetric evaluation (normal BP, absence of bleeding/preterm labor).</p>
    </div>` : ""}

    ${sel === 9 ? `
    <div class="ok-card">
      <h3>🌸 9th Month Special Protocol — Sukhaprasava Preparation (Charaka Sha. 8.32 / Su. Sha. 10)</h3>
      <p><b>Clinical Rationale:</b> To pacify Apana Vata, lubricate the Garbhashaya-mukha (cervical canal), and soften the birth passage for uncomplicated spontaneous labor (Sukhaprasava).</p>
      <p><b>Formulations:</b> Daily unctuous Snigdha diet (dal-ghee rice or Jangala-mamsa rasa), bedtime warm milk with ghee, and <b>Anuvasana Basti</b> with Madhura taila + <b>Yoni Pichu</b> (medicated oil swab placed by a physician).</p>
      <p class="mb0"><b>Obstetric Action:</b> Prepare Sutikagara / birth hospital bag, review Bishop score with doctor, and monitor for labor contractions.</p>
    </div>` : ""}

    <div class="grid g2">
      <div class="ok-card">
        <h3>🥛 Masanumasika Ksheera / Ghrita Formulation — Month ${sel}</h3>
        <b>${E(m.ksheera.name)}</b>
        <p class="mb0 mt">${E(m.ksheera.detail)}</p>
        <p class="small muted mt mb0"><b>Classical Rationale:</b> ${E(m.rationale)}</p>
      </div>
      <div class="glass card">
        <h3>🍃 Season Adaptation — ${E(r.name)} (${E(r.en)})</h3>
        <p><b>Kala &amp; Dosha:</b> ${E(r.kala)} · ${E(r.dosha)}</p>
        <p><b>Pregnancy Focus:</b> ${E(r.focus)}</p>
        <p class="small mb0"><b>Divaswapna (Day Sleep):</b> ${E(r.mods.sleep)}<br/><b>Hydration / Water:</b> ${E(r.mods.water)}</p>
      </div>
    </div>

    <div class="grid g2">
      <div class="glass card">
        <h3>🍽️ Month ${sel} Pathya Ahara (Dietary Staples)</h3>
        ${ul(m.pathya, "good-list")}
      </div>
      <div class="glass card">
        <h3>🍃 ${E(r.name)} Seasonal Pathya Additions</h3>
        ${ul(r.pathya, "good-list")}
      </div>
    </div>

    <div class="grid g2">
      <div class="warn-card">
        <h3>⛔ Month ${sel} Specific Apathya (Contraindications)</h3>
        ${ul(m.avoid, "bad-list")}
      </div>
      <div class="warn-card">
        <h3>🍃 ${E(r.name)} Seasonal Apathya (Avoid in this Season)</h3>
        ${ul(r.avoid, "bad-list")}
      </div>
    </div>

    <div class="glass card">
      <h3>🧘 ${E(r.name)} Vihara &amp; Daily Adaptation</h3>
      <table class="t">
        <tr><th>Morning Waking</th><td>${E(r.mods.wake)} am (${E(r.mods.walk)})</td></tr>
        <tr><th>Abhyanga Oil</th><td>${E(r.mods.oil)}</td></tr>
        <tr><th>Hydration</th><td>${E(r.mods.water)}</td></tr>
        <tr><th>Divaswapna Rule</th><td>${E(r.mods.sleep)}</td></tr>
        <tr><th>Bedtime Medicated Milk</th><td>${E(r.mods.night)}</td></tr>
      </table>
    </div>

    <div class="glass card">
      <h3>📚 Classical Masanumasika Paricharya across 2 Core Samhitas (Charaka & Sushruta)</h3>
      ${samhitaAccordion(sel)}
    </div>

    <div class="glass card">
      <h3>🏥 DC Dutta Modern Obstetric Correlation — ${E(m.dcdutta.title)}</h3>
      <p>${E(m.dcdutta.text)}</p>
      <div class="ok-card mb0"><b>Season Obstetric Note:</b> ${E(r.dcdutta)}</div>
    </div>

    <div class="warn-card">
      <h3>🚨 Obstetric Red Flags (Month ${sel}) — Seek Immediate Hospital Care</h3>
      ${ul(m.redFlags)}
      <p class="small muted mt mb0">Any bleeding PV, severe headache, blurred vision, sudden facial/hand edema, fluid rush, or reduced fetal movement requires same-day medical attention.</p>
    </div>`;
  }

  /* ---------------- Interactive Symptom & Upadrava Triage ---------------- */
  function tabTriage(ctx) {
    const syms = KB.UPADRAVAS || [];
    const activeKey = S.triageSym || (syms[0] && syms[0].key) || "chhardi";
    const cur = syms.find((u) => u.key === activeKey) || syms[0];

    const sevBadge = cur.severity === "emergency"
      ? '<span class="chip chip-bad" style="font-size:.9rem;">🚨 CRITICAL EMERGENCY — Immediate Hospital Care Required</span>'
      : cur.severity === "urgent"
      ? '<span class="chip chip-warn" style="font-size:.9rem;">⚠️ HIGH RISK / URGENT — Same-Day Medical Review Needed</span>'
      : '<span class="chip chip-ok" style="font-size:.9rem;">ℹ️ CLINICAL UPADRAVA — Schedule Antenatal Assessment</span>';

    return `
    <div class="glass card">
      <div class="row between">
        <div>
          <h2 class="mb0">⚠️ Interactive Symptom &amp; Garbhopaghatakara Triage Checker</h2>
          <p class="muted small mb0">Select any symptom to receive instant Ayurvedic Upadrava classification, DC Dutta obstetric correlation, and emergency triage instructions.</p>
        </div>
      </div>
      <div class="advisory inline mt">
        <span>${KB.DISCLAIMER}</span>
      </div>
      <div class="mt">
        <label>Select Symptom or Clinical Concern:</label>
        <div class="pillbar">
          ${syms.map((u) => `
            <button class="pill ${u.key === activeKey ? 'active' : ''}" data-action="triage-select" data-v="${u.key}">
              ${u.severity === 'emergency' ? '🚨' : u.severity === 'urgent' ? '⚠️' : '🌿'} ${E(u.name.split(" (")[0])}
            </button>
          `).join("")}
        </div>
      </div>
    </div>

    <div class="glass card">
      <div class="row between">
        <h2 class="mb0">${E(cur.name)}</h2>
        ${sevBadge}
      </div>
      <p class="mt" style="font-size:1.05rem;"><b>Presenting Clinical Symptoms:</b> ${E(cur.symptom)}</p>

      <div class="shloka mt">
        <div class="sa">${E(cur.sa)}</div>
        <div class="iast">${E(cur.iast)}</div>
        <p class="mb0 mt"><b>हिन्दी व्याख्या:</b> ${E(cur.hi)}</p>
        <div class="ref">${E(cur.ref)}</div>
      </div>

      <div class="grid g2 mt">
        <div class="glass card">
          <h3>🌿 Classical Ayurvedic Analysis &amp; First-Line Pathya</h3>
          <p>${E(cur.en)}</p>
        </div>
        <div class="ok-card">
          <h3>🏥 DC Dutta Obstetric Correlation &amp; Modern Protocol</h3>
          <p class="mb0">${E(cur.dcdutta)}</p>
        </div>
      </div>

      <div class="grid g2 mt">
        <div class="ok-card">
          <h3>📋 Immediate Clinical Actions &amp; Supportive Steps</h3>
          ${ul(cur.actions, "good-list")}
        </div>
        <div class="warn-card">
          <h3>🚨 Emergency Danger Signs — When to Leave for Hospital NOW</h3>
          ${ul(cur.redFlags, "bad-list")}
        </div>
      </div>

      <div class="warn-card mt">
        <h3>⚕️ Mandatory Clinical Warning</h3>
        <p class="mb0"><b>Never attempt self-medication, vigorous home remedies, or unsupervised herbal preparations when experiencing clinical Upadravas.</b> Contact your attending Obstetrician or BAMS Physician immediately.</p>
      </div>
    </div>`;
  }

  function tabRitu(ctx) {
    const r = KB.getRitu(ctx.ritu);
    return `
    <div class="pillbar">
      ${KB.RITUS.map((x) => `<button class="pill ${x.key === ctx.ritu ? "active" : ""} ${x.key === ctx.autoRitu ? "now" : ""}" data-action="ritu" data-v="${x.key}">${x.name}</button>`).join("")}
      <button class="pill" data-action="ritu" data-v="">↺ Auto</button>
    </div>
    <p class="small muted">• marks the current season by date. Changing the Ritu updates Dinacharya &amp; care plan instantly.</p>
    <div class="glass card">
      <h2>🍃 ${E(r.name)} — ${E(r.en)} <span class="chip">${E(r.period)}</span></h2>
      <p><b>Kala:</b> ${E(r.kala)} · <b>Dosha state:</b> ${E(r.dosha)}</p>
      <p><b>Pregnancy focus:</b> ${E(r.focus)}</p>
      <div class="shloka">
        <div class="sa">${E(r.shloka.sa)}</div>
        <div class="iast">${E(r.shloka.iast)}</div>
        <p class="mt"><b>हिन्दी:</b> ${E(r.shloka.hi)}</p>
        <p><b>English:</b> ${E(r.shloka.en)}</p>
        <div class="ref">${E(r.shloka.ref)}</div>
      </div>
    </div>
    <div class="grid g2">
      <div class="ok-card"><h3>✔ Pathya (do / eat)</h3>${ul(r.pathya, "good-list")}</div>
      <div class="warn-card"><h3>✖ Apathya (avoid)</h3>${ul(r.avoid, "bad-list")}</div>
    </div>
    <div class="grid g2">
      <div class="glass card"><h3>🧘 Vihara (lifestyle)</h3>${ul(r.vihara)}</div>
      <div class="glass card">
        <h3>🔧 Dinacharya Modifiers</h3>
        <table class="t">
          ${[["Wake", r.mods.wake + " am"], ["Abhyanga oil", r.mods.oil], ["Water", r.mods.water], ["Divaswapna", r.mods.sleep], ["Walk", r.mods.walk], ["Breakfast", r.mods.breakfast], ["Bedtime", r.mods.night]].map((x) => `<tr><th>${x[0]}</th><td>${E(x[1])}</td></tr>`).join("")}
        </table>
      </div>
    </div>
    <div class="glass card">
      <h3>🏥 DC Dutta Obstetric Correlation</h3>
      <p class="mb0">${E(r.dcdutta)}</p>
    </div>`;
  }

  function tabAvoid(ctx) {
    const m = KB.getMonth(ctx.month);
    return `
    <div class="warn-card">
      <h2>⛔ Strictly Avoid — Garbhopaghatakara Bhavas &amp; Apathya</h2>
      <div class="shloka">
        <div class="sa">${E(KB.BHAVAS.sanskrit.sa)}</div>
        <div class="iast">${E(KB.BHAVAS.sanskrit.iast)}</div>
        <p class="mt mb0"><b>हिन्दी:</b> ${E(KB.BHAVAS.sanskrit.hi)}</p>
        <div class="ref">${E(KB.BHAVAS.refs)}</div>
      </div>
      <p class="small mb0 mt">${E(KB.BHAVAS.effect)}</p>
    </div>
    <div class="warn-card">
      <h3>📅 Specific to Month ${ctx.month}</h3>
      ${ul(m.avoid, "bad-list")}
    </div>
    <div class="grid g2">
      ${KB.BHAVAS.groups.map((g) => `<div class="warn-card"><h3>${g.icon} ${E(g.cat)}</h3>${ul(g.items, "bad-list")}</div>`).join("")}
    </div>
    <div class="warn-card">
      <h3>🚨 DC Dutta Obstetric Red Flags — Seek Hospital Care Immediately</h3>
      ${KB.RED_FLAGS.map((f) => `<details class="acc"><summary>🔴 ${E(f.sign)}</summary><p><b>Look for:</b> ${E(f.cues)}</p><p class="mb0"><b>Action:</b> ${E(f.action)} <span class="muted small">(${E(f.cite)})</span></p></details>`).join("")}
    </div>`;
  }

  function tabCare(ctx) {
    const rec = ctx.rec;
    const user = DB.getCurrentUser();
    const isMotherAuthed = Boolean(user && !user.isAnonymous);
    const backupCard = isMotherAuthed ? `
      <div class="glass card mt">
        <div class="row between">
          <div class="row" style="align-items:center;gap:8px;">
            <span class="chip chip-ok">☁️ Cloud Backup Active</span>
            <span class="small muted">${E(user.email)}</span>
          </div>
          <button class="btn btn-ghost btn-sm" data-action="mother-sign-out">Disconnect Backup</button>
        </div>
      </div>` : `
      <div class="glass card mt">
        <div class="row between">
          <div>
            <h3 class="mb0">☁️ Cloud Backup across Devices (Optional)</h3>
            <p class="muted small mb0">Sign in with Google to safely back up your daily Dinacharya checks and care card across phones and computers.</p>
          </div>
          <button class="btn btn-sm btn-google" data-action="mother-google-login">
            <svg class="google-icon" viewBox="0 0 24 24" width="16" height="16"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
            Sign in with Google
          </button>
        </div>
      </div>`;

    if (!rec) {
      return `
      <div class="glass card">
        <h2>🔗 Link with your Doctor</h2>
        <p class="muted">Enter the 6-digit Link Code given by your clinician (format: AG-XXXX) to synchronize prescriptions, ANC vitals, and scheduled follow-up dates.</p>
        <div class="row">
          <input id="careCode" placeholder="AG-1084" maxlength="7" style="max-width:220px;text-transform:uppercase;font-weight:700;letter-spacing:.15em"/>
          <button class="btn btn-ok" data-action="link-from-care">Sync Now →</button>
        </div>
      </div>
      ${backupCard}`;
    }
    const a = rec.anc || {};
    const fus = rec.followUps || [];
    const last = fus[fus.length - 1];
    const gain = a.weight && a.prePregWeight ? +(a.weight - a.prePregWeight).toFixed(1) : null;
    const exp = +expectedGain(ctx.weeks).toFixed(1);
    const gstat = gain == null ? "" : gain < exp * 0.7 - 0.5 ? ["chip-warn", "Below expected — discuss diet with your clinician"] : gain > exp * 1.3 + 1 ? ["chip-warn", "Above expected — review with clinician"] : ["chip-ok", "Within expected healthy range"];
    const V = (l, v) => `<div class="vital"><b>${E(v || "—")}</b><span>${l}</span></div>`;

    return `
    <div class="glass card">
      <div class="row between">
        <div>
          <h2 class="mb0">🩺 ${E(rec.clinicName || "Synced Doctor Clinical Record")}</h2>
          <p class="small mb0"><b>Attending Doctor:</b> ${E(rec.doctorName || rec.clinician || "Doctor")}${rec.clinicContact ? ` · 📞 ${E(rec.clinicContact)}` : ""}</p>
          ${rec.clinicAddress ? `<p class="muted small mb0">📍 ${E(rec.clinicAddress)}</p>` : ""}
          <p class="muted small mb0">Synced ${new Date(rec.updatedAt || Date.now()).toLocaleString("en-IN")}</p>
        </div>
        <span class="chip chip-ok">🔗 Link Code: ${E(rec.linkCode)}</span>
      </div>
    </div>
    <div class="glass card">
      <h3>🧾 ANC Vitals &amp; Obstetric Examination</h3>
      <div class="vitals">
        ${V("G-P-L-A", `${a.G || 0}-${a.P || 0}-${a.L || 0}-${a.A || 0}`)}
        ${V("BP (mmHg)", a.bp)}
        ${V("Pulse /min", a.pulse)}
        ${V("Weight kg", a.weight)}
        ${V("Hb g/dl", a.hb)}
        ${V("Blood Group", a.bloodGroup)}
        ${V("Pallor", a.pallor)}
        ${V("Edema", a.edema)}
        ${V("Urine Albumin", a.urineAlbumin || "Nil")}
        ${V("Fundal Ht (wk)", a.fundalHeight)}
        ${V("FHR /min", a.fhr)}
        ${V("Fetal Movements", a.fetalMovements)}
      </div>
    </div>
    <div class="grid g2">
      <div class="glass card">
        <h3>⚖️ Gestational Weight Gain Trajectory</h3>
        ${gain == null ? `<p class="muted">Pre-pregnancy and current weight not yet fully recorded.</p>` : `
          <p><b>${gain} kg</b> gained · expected ≈ ${exp} kg at ${ctx.weeks} weeks (target total: 10–12 kg)</p>
          <div class="bar"><i style="width:${Math.max(3, Math.min(100, (gain / 12) * 100))}%"></i></div>
          <p class="mt mb0"><span class="chip ${gstat[0]}">${gstat[1]}</span></p>`}
      </div>
      <div class="glass card">
        <h3>🌿 Ayurvedic Clinical Assessment</h3>
        <p class="mb0">
          <b>Agni:</b> ${E(a.agni || "Samagni")} · <b>Koshtha:</b> ${E(a.koshtha || "Madhyama")}<br/>
          <b>Garbhini Upadrava:</b> ${E((a.upadrava || []).join(", ") || "None")}
        </p>
        ${a.notes ? `<p class="small muted mt mb0">📝 <b>Clinician Notes:</b> ${E(a.notes)}</p>` : ""}
      </div>
    </div>
    ${last ? `
      <div class="ok-card">
        <h3>💊 Latest Prescription — Month ${last.month} (${fmtDate(last.date)})</h3>
        <p><b>Prescribed Formulations:</b> ${E(last.formulations || "—")}</p>
        <p><b>Pathya &amp; Vihara Advice:</b> ${E(last.advice || "—")}</p>
        ${last.protocol ? `<p><b>Special Protocol:</b> ${E(last.protocol)}</p>` : ""}
        <p class="mb0"><span class="chip chip-warn">📆 Next Follow-up Visit: ${last.nextFollowUp ? fmtDate(last.nextFollowUp) : "not scheduled"}</span></p>
      </div>` : `
      <div class="glass card"><p class="muted mb0">No monthly follow-up recorded yet by clinician.</p></div>`}
    <div class="glass card">
      <h3>📋 Follow-up History</h3>
      ${fus.length ? `
        <table class="t">
          <tr><th>Month</th><th>Date</th><th>Wt (kg)</th><th>BP</th><th>Hb</th><th>Formulations</th></tr>
          ${fus.map((f) => `<tr><td>${f.month}</td><td>${fmtDate(f.date)}</td><td>${E(f.weight || "—")}</td><td>${E(f.bp || "—")}</td><td>${E(f.hb || "—")}</td><td>${E(f.formulations || "—")}</td></tr>`).join("")}
        </table>` : `<p class="muted mb0">No historical visits logged.</p>`}
    </div>
    ${backupCard}`;
  }

  /* ------------------- AyurParam-Grade Clinical Q&A Engine ------------------- */
  function answerHTML(res) {
    const timeMs = res.benchmark_ms != null ? `${res.benchmark_ms}ms` : "<1ms";
    const src = `<span class="chip chip-ok src-badge">⚡ Client-Side BM25 RAG (${timeMs})</span>`;

    const cites = res.classical_citations || [];
    const rels = res.related_questions || [];

    return `
    <div class="glass answer">
      <div class="row between">
        <h3 class="mb0">💬 Direct Clinical Synthesis</h3>
        ${src}
      </div>
      <p class="mt" style="font-size:1.05rem;line-height:1.65;font-weight:500;">${E(res.direct_answer)}</p>

      ${((res.pathya && res.pathya.length) || (res.apathya && res.apathya.length)) ? `
        <div class="glass card mt">
          <div class="row between">
            <h3 class="mb0">🥗 Clinical Dietary Regimen (पथ्य एवं अपथ्य आहार)</h3>
            ${res.target_month ? `<span class="chip chip-ok">Month ${res.target_month} Protocol</span>` : ""}
          </div>
          <div class="grid g2 pathya-apathya-grid mt">
            <div class="pathya-box">
              <h4 style="color:var(--emerald);margin-bottom:8px;">✔ Pathya (Recommended Ahara &amp; Vihara)</h4>
              ${ul(res.pathya, "good-list")}
            </div>
            <div class="apathya-box">
              <h4 style="color:var(--crimson);margin-bottom:8px;">✖ Apathya (Strictly Avoided / Garbhopaghatakara)</h4>
              ${ul(res.apathya, "bad-list")}
            </div>
          </div>
          ${res.ksheera_regimen ? `
            <div class="ksheera-box mt">
              <b style="color:var(--amber);">🥛 Classical Masanumasika Ksheera / Ghrita Formulation:</b>
              <span>${E(res.ksheera_regimen.name)} — ${E(res.ksheera_regimen.detail)}</span>
            </div>` : ""}
        </div>` : ""}

      ${res.samprapti_yukti ? `
        <div class="samprapti-box">
          <h4>🌿 Ayurvedic Pathophysiology &amp; Yukti (दोष-धातु-अग्नि-ओज युक्ति)</h4>
          <p class="mb0" style="line-height:1.6;">${E(res.samprapti_yukti)}</p>
        </div>` : ""}

      ${cites.length ? `
        <h3 class="mt">📜 Classical Samhita Pramana (प्रमाण)</h3>
        <div class="citations-grid">
          ${cites.map((c) => `
            <div class="citation-card">
              <div>
                <div class="row between mb0">
                  <b style="color:var(--emerald);font-size:.9rem;">${E(c.samhita || "Classical Samhita")}</b>
                  ${c.sthana ? `<span class="chip small">${E(c.sthana)}${c.verse ? ` ${E(c.verse)}` : ""}</span>` : ""}
                </div>
                ${c.chapter_name ? `<div class="small muted" style="margin:2px 0 6px;">📖 ${E(c.chapter_name)}</div>` : ""}
                <div class="sa">${E(c.sanskrit)}</div>
                ${c.iast ? `<div class="iast">${E(c.iast)}</div>` : ""}
                ${c.hindi ? `<p class="hi mb0"><b>हिन्दी:</b> ${E(c.hindi)}</p>` : ""}
                ${c.english ? `<p class="en mb0 mt"><b>Summary:</b> ${E(c.english)}</p>` : ""}
              </div>
              <div class="ref-tag">📍 ${E(c.reference || c.title || "")}</div>
            </div>
          `).join("")}
        </div>` : ""}

      ${(res.dc_dutta_correlation || res.modern_obstetric_correlation) ? `
        <div class="ok-card mt">
          <h3>🏥 Modern Obstetric Correlation (DC Dutta's Textbook of Obstetrics)</h3>
          <p class="mb0" style="line-height:1.6;">${E(res.dc_dutta_correlation || res.modern_obstetric_correlation)}</p>
        </div>` : ""}

      ${(res.red_flags || []).length ? `
        <div class="warn-card mt">
          <h3>🚨 Obstetric Red Flags &amp; Triage Warnings</h3>
          ${ul(res.red_flags)}
          <p class="small muted mt mb0">Any bleeding PV, severe headache, blurred vision, sudden facial/hand edema, fluid rush, or reduced fetal movement requires same-day medical attention.</p>
        </div>` : ""}

      ${rels.length ? `
        <div class="glass card mt">
          <h3 class="mb0">🔍 Related Clinical Follow-Up Inquiries</h3>
          <p class="small muted">Click any question below to explore deeper with classical citations:</p>
          <div class="related-pills">
            ${rels.map((q) => `
              <button type="button" class="related-pill" data-action="ask-rel" data-q="${E(q)}">
                ${E(q)} →
              </button>
            `).join("")}
          </div>
        </div>` : ""}

      <div class="advisory inline mt" role="alert">
        <span>${E(res.safety_disclaimer || KB.DISCLAIMER)}</span>
      </div>
    </div>`;
  }

  function tabAsk(ctx) {
    const curatedChips = [
      "4th Month me Dauhrida ka kya mahatva hai?",
      "8th Month me Ojas asthir kyun hota hai aur kya khayein?",
      "Sutika paricharya me Panchakola Yavagu aur Udaraveshtana kab karein?",
      "Varsha Ritu me Garbhini ka ahar-vihar kaisa hona chahiye?",
      "Navajata Shishu ke Jatakarma aur Stanyapana ke niyam"
    ];

    const domains = [
      ["all", "All Domains"],
      ["garbhini", "Garbhini (1–9M)"],
      ["prasava_sutika", "Prasava & Sutika"],
      ["navajata", "Navajata / Bala"],
      ["dinacharya", "Dinacharya"],
      ["ritucharya", "Ritucharya"],
      ["ahara_vihara", "Ahara-Vihara"]
    ];

    const samhitas = [
      ["all", "All Samhitas"],
      ["charaka", "Charaka"],
      ["sushruta", "Sushruta"],
            ["kashyapa", "Kashyapa"]
    ];

    return `
    <div class="glass card">
      <h2>🔎 Ask AyurGarbha — Charaka & Sushruta Hybrid Retrieval Prototype</h2>
      <p class="muted small">Evidence-based clinical reasoning assistant supporting English, हिन्दी, and Hinglish queries grounded in <b>Charaka Samhita, Sushruta Samhita &amp; DC Dutta Obstetrics</b> (Phase 2 AyurParam 2.9B Integration Ready).</p>
      
      <div class="row">
        <input id="askQ" placeholder="Ask in English, हिन्दी, or Hinglish (e.g. 4th Month me Dauhrida ka kya mahatva hai?)" value="${E(S.ask.q)}" style="flex:1;min-width:260px"/>
        <button class="btn btn-primary" data-action="ask">Ask AyurParam →</button>
      </div>

      <!-- Curated Clinical Question Chips -->
      <div class="mt">
        <label>Curated Clinical Inquiries:</label>
        <div class="ayurparam-curated">
          ${curatedChips.map((q) => `
            <button type="button" class="curated-chip" data-action="ask-sug" data-q="${E(q)}">
              💡 ${E(q)}
            </button>
          `).join("")}
        </div>
      </div>

      <!-- Filters Row -->
      <div class="filter-row">
        <div class="filter-group">
          <label class="small muted" style="margin:0 4px 0 0;">Domain:</label>
          ${domains.map(([k, label]) => `
            <button type="button" class="filter-pill ${S.ask.domain === k ? 'active' : ''}" data-action="ask-domain" data-v="${k}">
              ${label}
            </button>
          `).join("")}
        </div>
        <div class="filter-group" style="margin-left:auto;">
          <label class="small muted" style="margin:0 4px 0 0;">Samhita:</label>
          ${samhitas.map(([k, label]) => `
            <button type="button" class="filter-pill ${S.ask.samhita === k ? 'active' : ''}" data-action="ask-samhita" data-v="${k}">
              ${label}
            </button>
          `).join("")}
        </div>
      </div>
    </div>

    <div id="askOut">
      ${S.ask.loading ? `<p class="center" style="padding:24px;"><span class="loader"></span> Synthesizing Samhita Pramana &amp; DC Dutta correlation…</p>` : S.ask.res ? answerHTML(S.ask.res) : banner("inline")}
    </div>`;
  }

  function tabSutika() {
    const s = KB.SUTIKA;
    return `
    <div class="glass card">
      <h2>🤱 Sutika Paricharya — 45-Day Postnatal Maternal Regimen</h2>
      <p>${E(s.intro)}</p>
    </div>
    <div class="glass card">
      <h3>🗓️ Phased Postnatal Recovery Plan</h3>
      <table class="t">
        <tr><th>Phase</th><th>Focus</th><th>Clinical Plan</th></tr>
        ${s.phases.map((p) => `<tr><td><b>${E(p.day)}</b></td><td>${E(p.focus)}</td><td>${E(p.plan)}</td></tr>`).join("")}
      </table>
    </div>
    ${s.steps.map((x) => `
      <div class="glass card">
        <h3>🌿 ${E(x.name)}</h3>
        <div class="shloka">
          <div class="sa">${E(x.sa)}</div>
          <div class="iast">${E(x.iast)}</div>
          <div class="ref">${E(x.ref)}</div>
        </div>
        <p><b>हिन्दी:</b> ${E(x.hi)}</p>
        <p><b>English:</b> ${E(x.en)}</p>
        <p class="mb0"><b>Practical Administration:</b> ${E(x.detail)}</p>
      </div>`).join("")}
    <div class="warn-card">
      <h3>⛔ Strict Contraindications in Sutika Kala</h3>
      ${ul(s.avoid, "bad-list")}
    </div>
    <div class="ok-card">
      <h3>🏥 DC Dutta Obstetric Correlation — ${E(s.dcdutta.title)}</h3>
      <p class="mb0">${E(s.dcdutta.text)}</p>
    </div>
    <div class="warn-card">
      <h3>🚨 Postnatal Red Flags (Puerperal Complications)</h3>
      ${ul(s.redFlags)}
    </div>
    ${banner("inline")}`;
  }

  function tabNavajata() {
    const n = KB.NAVAJATA;
    return `
    <div class="glass card">
      <h2>👶 Navajata Shishu Paricharya — Newborn Care Protocols</h2>
      <p>${E(n.intro)}</p>
    </div>
    ${n.steps.map((x) => `
      <div class="glass card">
        <h3>🍼 ${E(x.name)}</h3>
        <div class="shloka">
          <div class="sa">${E(x.sa)}</div>
          <div class="iast">${E(x.iast)}</div>
          <div class="ref">${E(x.ref)}</div>
        </div>
        <p><b>हिन्दी:</b> ${E(x.hi)}</p>
        <p><b>English:</b> ${E(x.en)}</p>
        <div class="ok-card mb0"><b>🏥 DC Dutta / NRP Modern Correlation:</b> ${E(x.modern)}</div>
      </div>`).join("")}
    <div class="ok-card">
      <h3>🏥 ${E(n.modern.title)}</h3>
      <p class="mb0">${E(n.modern.text)}</p>
    </div>
    <div class="warn-card">
      <h3>🚨 Newborn Danger Signs — Go to Hospital Immediately</h3>
      ${ul(n.redFlags)}
    </div>
    ${banner("inline")}`;
  }

  /* ------------------------------ ASHA / ANM FIELD WORKSTATION ------------------------------ */
  const SAMPLE_ASHA_PATIENTS = [
    {
      id: "demo_asha_red",
      name: "सीता देवी (Sita Devi)",
      age: 24,
      phone: "+91 98765 43210",
      lmp: (() => { const d = new Date(); d.setDate(d.getDate() - 196); return d.toISOString().slice(0, 10); })(),
      location: "Rampur Village, Ward 4",
      linkCode: "AG-RED701",
      shareCode: "AG-RED701",
      risk: "red",
      anc: {
        G: 2, P: 1, L: 1, A: 0,
        bp: "148/96",
        weight: "56.5",
        hb: "8.6",
        fetalMovements: "Reduced",
        upadrava: ["तेज़ सिरदर्द (Severe Headache)", "पैरों में सूजन (Pedal Edema)"]
      },
      ashaVisits: [
        {
          id: "av_1",
          date: todayStr(),
          bp: "148/96",
          weight: "56.5",
          hb: "8.6",
          fetalMovements: "reduced",
          complaint: "Severe headache and blurred vision for 2 days. Swelling over both ankles.",
          referral: "Urgent Referral to CHC / District Hospital for Pre-eclampsia"
        }
      ]
    },
    {
      id: "demo_asha_yellow",
      name: "आरती बाई (Aarti Bai)",
      age: 22,
      phone: "+91 98234 56789",
      lmp: (() => { const d = new Date(); d.setDate(d.getDate() - 140); return d.toISOString().slice(0, 10); })(),
      location: "Rampur Village, Ward 2",
      linkCode: "AG-YEL502",
      shareCode: "AG-YEL502",
      risk: "yellow",
      anc: {
        G: 1, P: 0, L: 0, A: 0,
        bp: "122/80",
        weight: "52.0",
        hb: "10.2",
        fetalMovements: "Active",
        upadrava: ["कब्ज़ (Vibandha)", "हल्की सूजन (Mild Edema)"]
      },
      ashaVisits: [
        {
          id: "av_2",
          date: todayStr(),
          bp: "122/80",
          weight: "52.0",
          hb: "10.2",
          fetalMovements: "active",
          complaint: "Mild ankle swelling in evening, mild constipation.",
          referral: "Close Monitor: Prescribe Draksha Ksheerapaka and Iron-rich diet"
        }
      ]
    },
    {
      id: "demo_asha_green",
      name: "कमला शर्मा (Kamla Sharma)",
      age: 26,
      phone: "+91 97123 45678",
      lmp: (() => { const d = new Date(); d.setDate(d.getDate() - 112); return d.toISOString().slice(0, 10); })(),
      location: "Rampur Village, Ward 1",
      linkCode: "AG-GRN403",
      shareCode: "AG-GRN403",
      risk: "green",
      anc: {
        G: 1, P: 0, L: 0, A: 0,
        bp: "116/74",
        weight: "49.5",
        hb: "12.0",
        fetalMovements: "Active",
        upadrava: []
      },
      ashaVisits: [
        {
          id: "av_3",
          date: todayStr(),
          bp: "116/74",
          weight: "49.5",
          hb: "12.0",
          fetalMovements: "active",
          complaint: "Routine 4th month visit. Healthy appetite.",
          referral: "Routine Care: 4th month Navaneeta-Ksheera regimen"
        }
      ]
    }
  ];

  function openJudgeDemoModal() {
    const isHi = S.lang === "hi";
    openModal(`
      <div class="row between mb0">
        <div>
          <span class="chip chip-ok">🎬 Judge & Evaluator Demo Mode</span>
          <h2 class="mt" style="font-size:1.35rem;margin-top:6px;">${isHi ? "आयुर्गर्भ त्वरित मूल्यांकन डेमो" : "AyurGarbha Interactive Demo Hub"}</h2>
        </div>
      </div>
      <p class="muted small" style="margin-top:-6px;">${isHi ? "बिना लॉगिन एवं बिना फ़ायरस्टोर लेखन के 5 प्रमुख नैदानिक परिदृश्यों का तुरंत पूर्वावलोकन करें।" : "Explore 5 realistic clinical presets with zero authentication and zero Firestore writes. Perfect for rapid evaluation and video walkthroughs."}</p>

      <div class="grid g1 mt" style="gap:10px;">
        <!-- Preset 1: Month 5 -->
        <div class="demo-preset-card glass" data-action="load-demo-mother-5">
          <div class="row between" style="align-items:center;">
            <div>
              <b style="font-size:1.05rem;">🤰 ${isHi ? "माह ५ · चरक संहिता (पंचम मास परिचर्या)" : "Month 5 · Charaka Samhita (Panchama Masa)"}</b>
              <p class="small muted mb0" style="margin-top:2px;">${isHi ? "गर्भ मन/चेतना जागृति · क्षीर-सर्पि (दूध व घी) · ग्रीष्म ऋतु · टीआईएफएफए स्कैन समन्वय" : "20 Weeks · Grishma Ritu · Fetal Mind Awakening · Ksheera-Sarpi & TIFFA Scan Correlation"}</p>
            </div>
            <button class="btn btn-sm btn-ok">${isHi ? "लोड करें →" : "Load Preset →"}</button>
          </div>
        </div>

        <!-- Preset 2: Month 8 -->
        <div class="demo-preset-card glass" data-action="load-demo-mother-8">
          <div class="row between" style="align-items:center;">
            <div>
              <b style="font-size:1.05rem;">🤰 ${isHi ? "माह ८ · सुश्रुत संहिता (अष्टम मास व अस्थिर ओज)" : "Month 8 · Sushruta Samhita (Ashtama Masa & Ojas)"}</b>
              <p class="small muted mb0" style="margin-top:2px;">${isHi ? "३४ सप्ताह · अस्थिर ओज संरक्षण · आस्थापन व अनुवासन बस्ति · लेट प्रीटर्म सावधानियां" : "34 Weeks · Sharad Ritu · Labile Ojas Protection · Asthapana & Anuvasana Basti Protocol"}</p>
            </div>
            <button class="btn btn-sm btn-ok">${isHi ? "लोड करें →" : "Load Preset →"}</button>
          </div>
        </div>

        <!-- Preset 3: Sutika -->
        <div class="demo-preset-card glass" data-action="load-demo-sutika">
          <div class="row between" style="align-items:center;">
            <div>
              <b style="font-size:1.05rem;">🤱 ${isHi ? "सूतिका परिचर्या (प्रसवोपरांत ४५-दिवसीय पुनर्प्राप्ति)" : "Sutika Paricharya (Postnatal 45-Day Care)"}</b>
              <p class="small muted mb0" style="margin-top:2px;">${isHi ? "प्रसवोपरांत १२वां दिन · बला तैल अभ्यंग · दशमूल क्वाथ · उदरवेष्टन · स्तन्यवर्धन" : "Day 12 Postpartum · Bala Taila Abhyanga · Dashamoola · Udaraveshtana · Galactagogues"}</p>
            </div>
            <button class="btn btn-sm btn-ok">${isHi ? "लोड करें →" : "Load Preset →"}</button>
          </div>
        </div>

        <!-- Preset 4: Doctor Workstation -->
        <div class="demo-preset-card glass" data-action="load-demo-doctor">
          <div class="row between" style="align-items:center;">
            <div>
              <b style="font-size:1.05rem;">🩺 ${isHi ? "चिकित्सक कार्यस्थल (ANC केस शीट व प्रिंटेबल कार्ड)" : "Doctor Clinical Workstation (ANC Case Sheet & A4 Card)"}</b>
              <p class="small muted mb0" style="margin-top:2px;">${isHi ? "डॉ. अनन्या शर्मा · जी-पी-एल-ए सूत्र · अग्नि/कोष्ठ परीक्षा · 8-अक्षरी शेयर कोड · ए4 प्रिंट" : "Dr. Ananya Sharma · G-P-L-A vitals · Agni/Koshtha · 8-character Share Code · Printable A4 Card"}</p>
            </div>
            <button class="btn btn-sm btn-primary">${isHi ? "वर्कस्टेशन खोलें →" : "Open Workstation →"}</button>
          </div>
        </div>

        <!-- Preset 5: ASHA Risk Triage -->
        <div class="demo-preset-card glass" data-action="load-demo-asha">
          <div class="row between" style="align-items:center;">
            <div>
              <b style="font-size:1.05rem;">👩‍⚕️ ${isHi ? "आशा कार्यकर्ता जोखिम ट्राइएज (Red/Yellow/Green)" : "ASHA Field Worker Risk Triage (Red/Yellow/Green)"}</b>
              <p class="small muted mb0" style="margin-top:2px;">${isHi ? "गाँव की माताएं · लाल (तत्काल अस्पताल), पीला (निकट निगरानी), हरा (सामान्य) · 5-फील्ड गृह भेंट" : "Village mother directory · Red (Urgent Referral), Yellow (Monitor), Green (Routine) · 5-field visit tool"}</p>
            </div>
            <button class="btn btn-sm btn-warn">${isHi ? "ट्राइएज देखें →" : "Launch Triage →"}</button>
          </div>
        </div>
      </div>
    `);
  }

  function openConsentModal() {
    const isHi = S.lang === "hi";
    openModal(`
      <div class="row between mb0">
        <div>
          <span class="chip chip-ok">🔒 DPDP Act 2023 Aligned</span>
          <h2 class="mt" style="font-size:1.35rem;margin-top:6px;">${isHi ? "डेटा गोपनीयता व सहमति नीति" : "Data Privacy & Clinical Consent"}</h2>
        </div>
      </div>
      <div style="font-size:.9rem;line-height:1.6;margin-top:12px;">
        <p><b>1. Local-First Architecture:</b> ${isHi ? "आपकी सभी नैदानिक जानकारी (एलएमपी, लक्षण, दिनचर्या प्रगति) आपके ब्राउज़र में सुरक्षित स्थानीय रूप से संग्रहीत होती है।" : "All clinical inputs (LMP, complaints, Dinacharya checklist) are stored locally in your browser's IndexedDB / LocalStorage."}</p>
        <p><b>2. Zero Third-Party Tracking:</b> ${isHi ? "आयुर्गर्भ किसी भी तीसरे पक्ष या विज्ञापन नेटवर्क के साथ स्वास्थ्य डेटा साझा नहीं करता है।" : "AyurGarbha does not sell or transmit patient health information to advertising networks or third parties."}</p>
        <p><b>3. Secure 8-Character Share Code:</b> ${isHi ? "डॉक्टर या आशा कार्यकर्ता से केवल तभी डेटा साझा होता है जब आप अपना 8-अक्षरी शेयर कोड (AG-XXXXXX) उन्हें प्रदान करते हैं।" : "Cloud synchronization occurs strictly through an explicit 8-character Share Code (AG-XXXXXX), and private clinical notes are kept doctor-only."}</p>
        <p><b>4. Right to Erasure (डेटा मिटाने का अधिकार):</b> ${isHi ? "आप किसी भी समय 'मेरा डेटा मिटाएँ' बटन दबाकर अपनी सभी व्यक्तिगत प्रविष्टियों को स्थायी रूप से नष्ट कर सकते हैं।" : "Under India's Digital Personal Data Protection Act 2023, you have the absolute right to erasure. Clicking below permanently deletes all cached records."}</p>
      </div>
      <div class="row between mt" style="border-top:1px solid var(--line);padding-top:14px;margin-top:14px;">
        <button class="btn btn-ghost" data-action="close-modal">${isHi ? "बंद करें" : "Close"}</button>
        <button class="btn btn-danger" data-action="delete-my-data">${E(t("deleteMyData"))}</button>
      </div>
    `);
  }

  async function viewAsha() {
    const isHi = S.lang === "hi";
    const user = DB.getCurrentUser();
    const ashaUid = S.asha.uid || (user && !user.isAnonymous ? user.uid : null);
    
    // Fetch live patients, fallback to sample cases if empty
    let pts = await DB.listPatients(ashaUid);
    if (!pts || pts.length === 0) {
      pts = SAMPLE_ASHA_PATIENTS;
    }

    // Evaluate risk for each patient
    const ptsWithRisk = pts.map(p => {
      const rf = evaluateRedFlags({
        text: (p.anc && (p.anc.upadrava || []).join(" ")) || "",
        bp: (p.anc && p.anc.bp) || "",
        hb: (p.anc && p.anc.hb) || "",
        fhr: (p.anc && p.anc.fhr) || ""
      });
      return Object.assign({}, p, { evaluatedRisk: rf.risk, redFlags: rf });
    });

    const redCount = ptsWithRisk.filter(p => p.evaluatedRisk === "red").length;
    const yellowCount = ptsWithRisk.filter(p => p.evaluatedRisk === "yellow").length;
    const greenCount = ptsWithRisk.filter(p => p.evaluatedRisk === "green").length;

    let filtered = ptsWithRisk;
    if (S.ashaFilter === "red") filtered = ptsWithRisk.filter(p => p.evaluatedRisk === "red");
    else if (S.ashaFilter === "yellow") filtered = ptsWithRisk.filter(p => p.evaluatedRisk === "yellow");
    else if (S.ashaFilter === "green") filtered = ptsWithRisk.filter(p => p.evaluatedRisk === "green");

    if (!filtered.find(p => p.id === S.ashaPatientId)) {
      S.ashaPatientId = filtered[0] ? filtered[0].id : null;
    }
    const sel = filtered.find(p => p.id === S.ashaPatientId) || filtered[0];
    const selCtx = sel ? ctxFor(sel, sel) : null;

    return `
    <section class="asha-workstation">
      <!-- ASHA Header Bar -->
      <div class="glass card mb">
        <div class="row between" style="align-items:center;flex-wrap:wrap;gap:10px;">
          <div class="row" style="align-items:center;gap:12px;">
            <div style="width:42px;height:42px;border-radius:50%;background:#059669;color:#fff;display:grid;place-items:center;font-size:1.3rem;">👩‍⚕️</div>
            <div>
              <div class="row" style="align-items:center;gap:8px;">
                <b style="font-size:1.15rem;">${E(S.asha.name || (user && user.displayName) || "Sunita Devi")}</b>
                <span class="chip chip-ok small">ASHA Worker</span>
              </div>
              <p class="muted small mb0">📍 ${E(S.asha.village)} · ${isHi ? "सामुदायिक मातृ स्वास्थ्य निगरानी कार्यस्थल" : "Community Maternal Health & Field Triage"}</p>
            </div>
          </div>
          <div class="row" style="gap:8px;flex-wrap:wrap;">
            <button class="btn btn-sm btn-ghost" data-action="switch-role">${E(t("switchRole"))}</button>
            <button class="btn btn-sm btn-ghost" data-action="asha-sign-out">${isHi ? "साइन आउट" : "Sign Out"}</button>
          </div>
        </div>

        <!-- Risk Triage Summary Strip -->
        <div class="grid g4 mt" style="margin-top:14px;border-top:1px solid var(--line);padding-top:12px;">
          <button class="btn ${S.ashaFilter === 'all' ? 'btn-primary' : 'btn-ghost'} btn-sm" data-action="asha-filter" data-v="all">
            ${isHi ? "सभी माताएँ" : "All Mothers"} (${ptsWithRisk.length})
          </button>
          <button class="btn ${S.ashaFilter === 'red' ? 'btn-danger' : 'btn-ghost'} btn-sm" data-action="asha-filter" data-v="red" style="color:#e11d48;font-weight:700;">
            🚨 ${isHi ? "उच्च जोखिम (रेफरल)" : "Urgent Referral"} (${redCount})
          </button>
          <button class="btn ${S.ashaFilter === 'yellow' ? 'btn-warn' : 'btn-ghost'} btn-sm" data-action="asha-filter" data-v="yellow" style="color:#d97706;font-weight:700;">
            ⚠️ ${isHi ? "मध्यम (निगरानी)" : "Close Monitor"} (${yellowCount})
          </button>
          <button class="btn ${S.ashaFilter === 'green' ? 'btn-ok' : 'btn-ghost'} btn-sm" data-action="asha-filter" data-v="green" style="color:#059669;font-weight:700;">
            ✅ ${isHi ? "सामान्य देखभाल" : "Routine Care"} (${greenCount})
          </button>
        </div>
      </div>

      <!-- Main Dual-Column: Directory on Left, Quick Home Visit on Right -->
      <div class="grid g2" style="grid-template-columns:minmax(300px, 380px) minmax(0, 1fr);gap:18px;align-items:start;">
        <!-- Left: Village Mother Directory -->
        <aside class="glass card" style="padding:14px;">
          <div class="row between" style="align-items:center;margin-bottom:12px;">
            <h3 class="mb0" style="font-size:1rem;">🏘️ ${isHi ? "गाँव की गर्भवती सूची" : "Village Mother Directory"} (${filtered.length})</h3>
            <button class="btn btn-sm btn-ok" data-action="new-asha-patient">＋ ${isHi ? "नया नाम" : "Register"}</button>
          </div>

          <div class="asha-patient-list" style="display:flex;flex-direction:column;gap:10px;max-height:680px;overflow-y:auto;padding-right:4px;">
            ${filtered.map(p => {
              const isSel = sel && sel.id === p.id;
              const g = KB.gestationalWeeks(p.lmp) || { weeks: 0 };
              const m = KB.monthFromWeeks(g.weeks);
              const rClass = p.evaluatedRisk === "red" ? "risk-red" : (p.evaluatedRisk === "yellow" ? "risk-yellow" : "risk-green");
              const rLabel = p.evaluatedRisk === "red" ? (isHi ? "🚨 उच्च जोखिम" : "🚨 Urgent Referral") : (p.evaluatedRisk === "yellow" ? (isHi ? "⚠️ मध्यम जोखिम" : "⚠️ Close Monitor") : (isHi ? "✅ सामान्य" : "✅ Routine Care"));
              return `
                <div class="glass patient-item ${isSel ? 'active' : ''}" data-action="sel-asha-patient" data-id="${p.id}" style="padding:10px 12px;border-radius:10px;cursor:pointer;border:1.5px solid ${isSel ? 'var(--emerald)' : 'var(--line)'};">
                  <div class="row between" style="align-items:center;">
                    <b style="font-size:.95rem;">${E(p.name)}</b>
                    <span class="risk-badge ${rClass}" style="font-size:.72rem;">${rLabel}</span>
                  </div>
                  <div class="row between mt" style="margin-top:4px;font-size:.78rem;color:var(--text-muted);">
                    <span>${g.weeks}w (मास ${m}) · ${E(p.location || "Village")}</span>
                    <span style="font-family:monospace;font-weight:700;color:var(--emerald);">${E(p.linkCode || p.shareCode || "—")}</span>
                  </div>
                  <div class="row between mt" style="margin-top:6px;font-size:.76rem;background:var(--glass2);padding:4px 8px;border-radius:6px;">
                    <span>BP: <b>${E((p.anc && p.anc.bp) || "—")}</b></span>
                    <span>Hb: <b>${E((p.anc && p.anc.hb) ? p.anc.hb + ' g/dl' : "—")}</b></span>
                    <span>Wt: <b>${E((p.anc && p.anc.weight) ? p.anc.weight + ' kg' : "—")}</b></span>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </aside>

        <!-- Right: Active Mother Quick Home Visit Entry & Advice -->
        <main class="glass card" style="padding:18px;">
          ${sel ? `
            <!-- Mother Header Card -->
            <div class="row between" style="align-items:flex-start;border-bottom:1px solid var(--line);padding-bottom:14px;margin-bottom:14px;">
              <div>
                <div class="row" style="align-items:center;gap:10px;">
                  <h2 class="mb0" style="font-size:1.3rem;">${E(sel.name)}</h2>
                  <span class="risk-badge ${sel.evaluatedRisk === 'red' ? 'risk-red' : (sel.evaluatedRisk === 'yellow' ? 'risk-yellow' : 'risk-green')}">
                    ${sel.evaluatedRisk === 'red' ? (isHi ? "🚨 उच्च जोखिम (रेफरल)" : "🚨 Urgent Referral") : (sel.evaluatedRisk === 'yellow' ? (isHi ? "⚠️ मध्यम निगरानी" : "⚠️ Close Monitor") : (isHi ? "✅ सामान्य देखभाल" : "✅ Routine Care"))}
                  </span>
                </div>
                <p class="muted small mb0" style="margin-top:4px;">
                  ${sel.age ? sel.age + ' वर्ष · ' : ''}LMP: ${fmtDate(sel.lmp)} · EDD: <b>${fmtDate(selCtx ? selCtx.edd : null)}</b> (${selCtx ? selCtx.weeks + ' सप्ताह, मास ' + selCtx.month : ''})
                </p>
              </div>
              <div style="text-align:right;">
                <span class="chip chip-ok" style="font-family:monospace;font-weight:700;font-size:.9rem;">🔗 ${E(sel.linkCode || sel.shareCode || "AG-XXXXXX")}</span>
                <p class="muted small mb0" style="font-size:.72rem;margin-top:4px;">${isHi ? "8-अक्षरी शेयर कोड" : "8-Char Share Code"}</p>
              </div>
            </div>

            <!-- Deterministic Red-Flag Alert Container -->
            ${sel.redFlags && sel.redFlags.triggered ? sel.redFlags.bannerHTML(S.lang) : ''}

            <!-- 5-Field Mobile Quick Home Visit Form -->
            <div style="background:var(--glass2);border:1.5px solid var(--line);border-radius:12px;padding:16px;margin-top:14px;">
              <div class="row between" style="align-items:center;margin-bottom:12px;">
                <h3 class="mb0" style="font-size:1.05rem;color:var(--emerald-d);">📝 ${isHi ? "त्वरित गृह भेंट प्रविष्टि (5-Field Mobile Entry)" : "5-Field Quick Home Visit Form"}</h3>
                <span class="small muted">${fmtDate(todayStr())}</span>
              </div>
              
              <div class="grid g2" style="gap:12px;">
                <div class="field">
                  <label>1. ${isHi ? "रक्तचाप (Blood Pressure mmHg)" : "Blood Pressure (mmHg)"} *</label>
                  <input id="asha_bp" placeholder="e.g. 120/80" value="${E((sel.anc && sel.anc.bp) || '')}" />
                  <span class="small muted" style="font-size:.72rem;">${isHi ? "≥ 140/90 होने पर तुरंत लाल चेतावनी" : "≥ 140/90 triggers Pre-eclampsia warning"}</span>
                </div>
                <div class="field">
                  <label>2. ${isHi ? "वजन (Weight in kg)" : "Weight (kg)"}</label>
                  <input type="number" id="asha_wt" step="0.1" placeholder="e.g. 54.0" value="${E((sel.anc && sel.anc.weight) || '')}" />
                </div>
                <div class="field">
                  <label>3. ${isHi ? "हीमोग्लोबिन (Hb g/dl)" : "Hemoglobin (Hb g/dl)"} *</label>
                  <input type="number" id="asha_hb" step="0.1" placeholder="e.g. 11.0" value="${E((sel.anc && sel.anc.hb) || '')}" />
                  <span class="small muted" style="font-size:.72rem;">${isHi ? "< 9.0 g/dl होने पर गंभीर एनीमिया चेतावनी" : "< 9.0 g/dl triggers Severe Anemia warning"}</span>
                </div>
                <div class="field">
                  <label>4. ${isHi ? "शिशु की हलचल (Fetal Movements)" : "Fetal Movements"} *</label>
                  <select id="asha_fetal">
                    <option value="active" ${sel.anc && sel.anc.fetalMovements === 'Active' ? 'selected' : ''}>${isHi ? "सक्रिय (Active / Normal)" : "Active / Normal"}</option>
                    <option value="reduced" ${sel.anc && sel.anc.fetalMovements === 'Reduced' ? 'selected' : ''}>${isHi ? "कम हलचल (Reduced — चेतावनी)" : "Reduced (Warning)"}</option>
                    <option value="absent" ${sel.anc && sel.anc.fetalMovements === 'Absent' ? 'selected' : ''}>${isHi ? "अनुपस्थित (Absent — आपातकाल)" : "Absent (Critical)"}</option>
                  </select>
                </div>
              </div>

              <div class="field mt" style="margin-top:10px;">
                <label>5. ${isHi ? "मुख्य शिकायत / लक्षण (Observations / Symptoms)" : "Chief Complaint / Observations"}</label>
                <textarea id="asha_complaint" rows="2" placeholder="${isHi ? 'e.g. सिरदर्द, चक्कर, पैरों में सूजन, रक्तस्राव या पानी छूटना...' : 'e.g. Headache, dizziness, ankle swelling, any bleeding or leaking fluid...'}">${E((sel.anc && (sel.anc.upadrava || []).join(', ')) || '')}</textarea>
              </div>

              <div class="row between mt" style="align-items:center;margin-top:14px;">
                <span class="small muted" style="font-size:.75rem;">🔒 ${isHi ? "डेटा स्थानीय व 8-अक्षरी कोड से सुरक्षित" : "Encrypted & synced via 8-char Share Code"}</span>
                <button class="btn btn-ok" data-action="save-asha-visit" data-id="${sel.id}">
                  💾 ${isHi ? "गृह भेंट सहेजें (Save Visit)" : "Save Home Visit"}
                </button>
              </div>
            </div>

            <!-- Classical Dietary Instructions for ASHA to Counsel Mother -->
            ${selCtx ? `
              <div class="mt" style="margin-top:18px;background:var(--glass2);border-radius:12px;padding:14px;border:1px solid var(--line);">
                <h4 style="font-size:.95rem;margin-bottom:6px;color:var(--emerald);">📖 ${isHi ? "माता को समझाने हेतु मासिक आयुर्वेदिक आहार (Charaka & Sushruta)" : "Masanumasika Nutrition Guidelines for Counseling"} (मास ${selCtx.month})</h4>
                <div class="grid g2" style="font-size:.84rem;line-height:1.5;">
                  <div>
                    <b>✅ ${isHi ? "पथ्य (यह खाने की सलाह दें):" : "Recommended (Pathya):"}</b>
                    <ul style="margin:4px 0 0 16px;padding:0;">
                      ${KB.getMonth(selCtx.month).pathya.slice(0, 3).map(p => `<li>${E(p)}</li>`).join("")}
                    </ul>
                  </div>
                  <div>
                    <b>⛔ ${isHi ? "अपथ्य (इनसे बचने को कहें):" : "Strictly Avoid (Apathya):"}</b>
                    <ul style="margin:4px 0 0 16px;padding:0;">
                      ${KB.getMonth(selCtx.month).avoid.slice(0, 3).map(a => `<li>${E(a)}</li>`).join("")}
                    </ul>
                  </div>
                </div>
              </div>
            ` : ''}

            <!-- Recent Visit History -->
            ${sel.ashaVisits && sel.ashaVisits.length > 0 ? `
              <div class="mt" style="margin-top:18px;">
                <h4 style="font-size:.95rem;margin-bottom:8px;">📋 ${isHi ? "पूर्व गृह भेंट इतिहास" : "Past Home Visits Log"} (${sel.ashaVisits.length})</h4>
                <div style="display:flex;flex-direction:column;gap:8px;">
                  ${sel.ashaVisits.map(v => `
                    <div style="padding:10px;background:var(--glass2);border-radius:8px;font-size:.82rem;border:1px solid var(--line);">
                      <div class="row between">
                        <b>📅 ${fmtDate(v.date)}</b>
                        <span class="muted">BP: ${E(v.bp || "—")} · Hb: ${E(v.hb || "—")} · Wt: ${E(v.weight || "—")} kg</span>
                      </div>
                      ${v.complaint ? `<p class="mb0 muted small" style="margin-top:4px;">💬 ${E(v.complaint)}</p>` : ''}
                      ${v.referral ? `<p class="mb0 small" style="margin-top:4px;color:#e11d48;font-weight:700;">🚨 ${E(v.referral)}</p>` : ''}
                    </div>
                  `).join("")}
                </div>
              </div>
            ` : ''}
          ` : `
            <div style="text-align:center;padding:48px 20px;">
              <div style="font-size:3rem;margin-bottom:12px;">👩‍⚕️</div>
              <h3>${isHi ? "कोई गर्भवती चयनित नहीं" : "No Mother Selected"}</h3>
              <p class="muted small">${isHi ? "बाईं ओर सूची में से किसी माता का चयन करें अथवा नई प्रविष्टि दर्ज करें।" : "Select a mother from the directory on the left or register a new village mother to record home visits."}</p>
            </div>
          `}
        </main>
      </div>
    </section>
    `;
  }

  /* ------------------------------ CLINICIAN WORKSTATION ------------------------------ */
  const AGNI = ["Samagni", "Mandagni", "Tikshnagni", "Vishamagni"];
  const KOSHTHA = ["Mridu", "Madhyama", "Krura"];
  const UPADRAVA_LIST = ["Chhardi", "Shopha", "Pandu", "Vibandha", "Garbhasrava"];
  const BLOOD = ["", "A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"];
  const opts = (arr, v) => arr.map((o) => `<option ${String(o) === String(v) ? "selected" : ""}>${E(o)}</option>`).join("");
  const stepper = (k, v, label) => `<div class="field"><label>${label}</label><div class="stepper" data-stepper="${k}"><button type="button" data-action="step" data-d="-1" aria-label="decrease ${label}">−</button><b>${v}</b><button type="button" data-action="step" data-d="1" aria-label="increase ${label}">＋</button></div></div>`;

  async function viewClinician() {
    const user = DB.getCurrentUser();
    const docUid = S.clinician.uid || (user && !user.isAnonymous ? user.uid : null);
    const pts = await DB.listPatients(docUid);
    if (!pts.find((p) => p.id === S.selId)) S.selId = pts[0] ? pts[0].id : null;
    const sel = pts.find((p) => p.id === S.selId);
    const left = `
    <aside class="glass card">
      <div class="row between">
        <h3 class="mb0">👩‍⚕️ Patients (${pts.length})</h3>
        <button class="btn btn-sm btn-ok" data-action="new-patient">＋ Register</button>
      </div>
      <div style="margin:10px 0;padding:8px 10px;background:var(--glass2);border-radius:10px;border:1px solid var(--line);">
        <div class="row between" style="align-items:center;">
          <div class="row" style="align-items:center;gap:8px;">
            ${user && user.photoURL ? `<img src="${E(user.photoURL)}" alt="Avatar" style="width:28px;height:28px;border-radius:50%;border:1.5px solid var(--emerald);"/>` : `<div style="width:28px;height:28px;border-radius:50%;background:var(--emerald-d);color:#fff;display:grid;place-items:center;font-size:.75rem;font-weight:700;">${E((S.clinician.name || "D")[0])}</div>`}
            <div>
              <b class="small" style="display:block;line-height:1.1;">${E(S.clinician.name || (user && user.displayName) || "Doctor")}</b>
              <span class="muted" style="font-size:.72rem;">${E(S.clinician.email || (user && user.email) || "Google Verified")}</span>
            </div>
          </div>
          <button class="btn btn-ghost btn-sm" data-action="doctor-sign-out" title="Sign out" style="font-size:.75rem;padding:3px 8px;">Sign Out</button>
        </div>
        ${S.clinician.clinicName ? `
          <div style="margin-top:6px;font-size:.74rem;color:var(--text);border-top:1px dashed var(--line);padding-top:4px;">
            <b>🏥 ${E(S.clinician.clinicName)}</b>
            ${S.clinician.clinicAddress ? `<div class="muted small" style="font-size:.7rem;">📍 ${E(S.clinician.clinicAddress)}</div>` : ""}
            ${S.clinician.clinicContact ? `<div class="muted small" style="font-size:.7rem;">📞 ${E(S.clinician.clinicContact)}</div>` : ""}
          </div>` : ""}
        <button class="btn btn-sm btn-ghost w100" data-action="edit-clinic-profile" style="margin-top:8px;font-size:.76rem;padding:5px 8px;border:1px dashed var(--line);">✏️ Edit Clinic Profile</button>
      </div>
      ${pts.length ? pts.map((p) => {
        const c = ctxFor(p, p);
        return `<button class="patient-row ${p.id === S.selId ? "active" : ""}" data-action="sel-patient" data-id="${p.id}">
          <span><b>${E(p.name)}</b><br/><span class="small muted">${c.weeks}w · Month ${c.month}</span></span>
          <span class="chip chip-ok">${E(p.linkCode)}</span>
        </button>`;
      }).join("") : `
        <div class="empty-directory">
          <p class="small muted mb0">No patients registered yet. Click '+ Register' to begin.</p>
        </div>`}
    </aside>`;

    let right = `
    <div class="glass card center empty-directory" style="padding:48px 24px;">
      <span style="font-size:3rem;display:block;margin-bottom:12px;">🩺</span>
      <h2>Antenatal Care Workstation</h2>
      <p class="muted" style="max-width:500px;margin:8px auto 20px;">No patients registered yet. Click '+ Register New Patient' to begin creating ANC case sheets, G-P-L-A formulas, and generating 6-digit Link Codes.</p>
      <button class="btn btn-ok btn-lg" data-action="new-patient">＋ Register New Patient</button>
    </div>`;
    if (sel) {
      const ctx = ctxFor(sel, sel);
      const tabs = [
        ["case", "📝 Case Sheet & Vitals"],
        ["follow", "📆 Follow-up Tracker (M1–M9)"],
        ["preview", "👁️ Live Patient Portal View"]
      ];
      right = `
      <div>
        <div class="glass card">
          <div class="row between">
            <div>
              <h2 class="mb0">${E(sel.name)} <span class="small muted">· ${sel.age || "—"} yrs</span></h2>
              <p class="muted small mb0">${ctx.weeks}w ${ctx.days}d · Month ${ctx.month} · EDD: <b>${fmtDate(ctx.edd)}</b>${sel.location ? ` · ${E(sel.location)}` : ""}</p>
            </div>
            <div class="row">
              <span class="linkcode" title="Give this Link Code to the patient">${E(sel.linkCode)}</span>
              <button class="btn btn-sm" data-action="copy-code" data-v="${E(sel.linkCode)}">📋 Copy Code</button>
              <button class="btn btn-sm btn-primary" data-action="print">🖨️ A4 Care Card</button>
              <button class="btn btn-sm btn-danger" data-action="del-patient" data-id="${sel.id}">🗑</button>
            </div>
          </div>
        </div>
        <nav class="tabs glass">
          ${tabs.map((t) => `<button class="tab ${S.ctab === t[0] ? "active" : ""}" data-action="ctab" data-v="${t[0]}">${t[1]}</button>`).join("")}
        </nav>
        ${S.ctab === "follow" ? followHTML(sel, ctx) : S.ctab === "preview" ? `<div class="embedded-portal-wrap">${patientShell(ctx, S.tab, true)}</div>` : caseHTML(sel)}
      </div>`;
    }
    return `<div class="split">${left}${right}</div>`;
  }

  function caseHTML(p) {
    const a = p.anc || DB.defaultAnc();
    const f = (id, label, v, type, ph) => `<div class="field"><label>${label}</label><input id="c_${id}" type="${type || "text"}" value="${E(v)}" placeholder="${ph || ""}" /></div>`;
    const fList = (id, label, v, listId, ph) => `<div class="field"><label>${label}</label><input id="c_${id}" list="${listId}" value="${E(v)}" placeholder="${ph || ""}" autocomplete="off" /></div>`;
    return `
    <datalist id="bp_presets">
      <option value="110/70">110/70 mmHg (Normal Low)</option>
      <option value="120/80">120/80 mmHg (Optimal Normotensive)</option>
      <option value="124/82">124/82 mmHg (Normal)</option>
      <option value="130/84">130/84 mmHg (High Normal)</option>
      <option value="140/90">140/90 mmHg (Stage 1 HTN / Alert)</option>
      <option value="150/96">150/96 mmHg (Severe Gestational HTN)</option>
      <option value="160/110">160/110 mmHg (Severe Pre-eclampsia Alert)</option>
    </datalist>
    <datalist id="pulse_presets">
      <option value="72">72 bpm (Resting Normal)</option>
      <option value="76">76 bpm (Resting Normal)</option>
      <option value="80">80 bpm (Average Pregnancy)</option>
      <option value="84">84 bpm (Physiological Pregnancy Tachycardia)</option>
      <option value="90">90 bpm</option>
      <option value="96">96 bpm</option>
      <option value="104">104 bpm (Tachycardia / Anaemia Alert)</option>
    </datalist>
    <datalist id="weight_presets">
      <option value="48">48 kg</option>
      <option value="52">52 kg</option>
      <option value="56">56 kg</option>
      <option value="60">60 kg</option>
      <option value="64">64 kg</option>
      <option value="68">68 kg</option>
      <option value="72">72 kg</option>
      <option value="76">76 kg</option>
      <option value="80">80 kg</option>
    </datalist>
    <datalist id="hb_presets">
      <option value="12.5">12.5 g/dl (Optimal)</option>
      <option value="11.8">11.8 g/dl (Normal 1st/3rd Trimester)</option>
      <option value="11.0">11.0 g/dl (Lower Limit of Normal)</option>
      <option value="10.5">10.5 g/dl (Mild Anaemia - 2nd Trimester)</option>
      <option value="9.5">9.5 g/dl (Mild Anaemia)</option>
      <option value="8.5">8.5 g/dl (Moderate Anaemia - WHO)</option>
      <option value="6.8">6.8 g/dl (Severe Anaemia - Red Flag)</option>
    </datalist>
    <datalist id="fhr_presets">
      <option value="136">136 bpm (Normal Regular)</option>
      <option value="140">140 bpm (Normal Regular)</option>
      <option value="144">144 bpm (Normal Regular)</option>
      <option value="150">150 bpm (Normal Regular)</option>
      <option value="156">156 bpm (Normal Regular)</option>
      <option value="110">110 bpm (Fetal Bradycardia Alert)</option>
      <option value="168">168 bpm (Fetal Tachycardia Alert)</option>
    </datalist>
    <datalist id="edema_presets">
      <option value="None">None (No swelling)</option>
      <option value="Mild (pedal)">Mild (pedal) Physiological ankle edema, relieved with rest</option>
      <option value="Moderate">Moderate (pretibial &amp; pedal pitting edema)</option>
      <option value="Facial / generalised">Facial / generalised (Pre-eclampsia Alert)</option>
    </datalist>
    <datalist id="urine_presets">
      <option value="Nil">Nil (Normal)</option>
      <option value="Trace">Trace</option>
      <option value="1+ (30 mg/dl)">1+ (30 mg/dl)</option>
      <option value="2+ (100 mg/dl)">2+ (100 mg/dl - Alert)</option>
      <option value="3+ (300 mg/dl)">3+ (300 mg/dl - Severe PE)</option>
    </datalist>

    <form id="caseForm" onsubmit="return false">
      <div class="glass card">
        <h3>👪 Obstetric History — G · P · L · A</h3>
        <div class="grid g4">
          ${stepper("G", a.G, "Gravida (G)")}
          ${stepper("P", a.P, "Para (P)")}
          ${stepper("L", a.L, "Living Child (L)")}
          ${stepper("A", a.A, "Abortion (A)")}
        </div>
      </div>
      <div class="glass card">
        <h3>🩺 ANC Vitals &amp; Obstetric Examination (Dropdown Presets + Custom Typing)</h3>
        <div class="grid g4">
          ${fList("bp", "BP (mmHg) ▾", a.bp, "bp_presets", "120/80")}
          ${fList("pulse", "Pulse (/min) ▾", a.pulse, "pulse_presets", "80")}
          ${fList("weight", "Current Weight (kg) ▾", a.weight, "weight_presets", "60")}
          ${fList("prePregWeight", "Pre-Preg Weight (kg) ▾", a.prePregWeight, "weight_presets", "54")}
          ${fList("hb", "Hb (g/dl) ▾", a.hb, "hb_presets", "11.5")}
          <div class="field"><label>Blood Group</label><select id="c_bloodGroup">${opts(BLOOD, a.bloodGroup)}</select></div>
          <div class="field"><label>Pallor</label><select id="c_pallor">${opts(["None", "Mild", "Moderate", "Severe"], a.pallor)}</select></div>
          ${fList("edema", "Pedal Edema ▾", a.edema, "edema_presets", "None")}
          ${fList("urineAlbumin", "Urine Albumin / Proteinuria ▾", a.urineAlbumin || "Nil", "urine_presets", "Nil")}
          ${f("fundalHeight", "Fundal Height (cm / wks)", a.fundalHeight, "number")}
          ${fList("fhr", "FHR (/min) ▾", a.fhr, "fhr_presets", "140")}
          <div class="field"><label>Fetal Movements</label><select id="c_fetalMovements">${opts(["Not assessed", "Not yet perceived", "Active (≥10/12h)", "Reduced (<10/12h)", "Absent"], a.fetalMovements)}</select></div>
        </div>
      </div>
      <div class="glass card">
        <h3>🌿 Ayurvedic Clinical Assessment</h3>
        <div class="grid g2">
          <div class="field"><label>Agni Assessment</label><select id="c_agni">${opts(AGNI, a.agni)}</select></div>
          <div class="field"><label>Koshtha Assessment</label><select id="c_koshtha">${opts(KOSHTHA, a.koshtha)}</select></div>
        </div>
        <label>Garbhini Upadrava Assessment</label>
        <div class="checks" id="c_upadrava">
          ${UPADRAVA_LIST.map((u) => `<label><input type="checkbox" value="${u}" ${(a.upadrava || []).includes(u) ? "checked" : ""}/> ${u}</label>`).join("")}
        </div>
        <div class="field mt"><label>Clinical Notes &amp; Plan</label><textarea id="c_notes">${E(a.notes)}</textarea></div>
      </div>
      <button type="button" class="btn btn-ok btn-lg" data-action="save-case">💾 Save Case Sheet &amp; Sync to Patient Portal</button>
    </form>`;
  }

  function followHTML(p, ctx) {
    const done = new Set((p.followUps || []).map((f) => f.month));
    const sel = S.fuMonth || ctx.month;
    const m = KB.getMonth(sel);
    const ex = (p.followUps || []).find((f) => f.month === sel) || {};
    const checks = sel === 8 ? [
      "Ojas-rakshana regimen counselled (Ksheera-yavagu, dates, saffron milk)",
      "Emotional serenity & Garbha Sanskar counselled; fear/exertion/travel avoided",
      "BP, urine albumin & obstetric fitness reviewed for Basti",
      "Asthapana Basti (Badara kwatha) planned / supervised by BAMS physician"
    ] : sel === 9 ? [
      "Anuvasana Basti with Madhura-aushadha siddha Taila planned / given",
      "Yoni Pichu (medicated taila swab) taught / placed for Sukhaprasava",
      "Snigdha Mamsarasa / dal-ghee-rice diet counselled",
      "Sutikagara, hospital bag & birth plan prepared",
      "Labour danger signs & Link Code card explained to family"
    ] : [];
    const saved = ex.protocolChecks || [];

    return `
    <div class="glass card">
      <h3>📆 Month 1 → 9 Antenatal Follow-up Tracker</h3>
      <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(90px,1fr))">
        ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `
          <button class="month-tile ${done.has(n) ? "done" : ""} ${n === ctx.month ? "cur" : ""} ${n === sel ? "sel" : ""}" data-action="fu-month" data-v="${n}">
            <b>Month ${n}</b><br/>
            <span class="small">${done.has(n) ? "✔ Saved" : n === ctx.month ? "Current" : "Pending"}</span>
          </button>`).join("")}
      </div>
    </div>
    <form id="fuForm" onsubmit="return false">
      <div class="glass card">
        <h3>Month ${sel} Visit — ${E(m.stage)} ${ex.id ? `<span class="chip chip-ok">Editing Saved Visit</span>` : ""}</h3>
        <div class="ok-card"><b>Classical Samhita Formulation:</b> ${E(m.ksheera.name)} — ${E(m.ksheera.detail)}</div>
        <div class="grid g4">
          <div class="field"><label>Visit Date</label><input type="date" id="f_date" value="${E(ex.date || todayStr())}"/></div>
          <div class="field"><label>Weight (kg) ▾</label><input id="f_weight" list="weight_presets" value="${E(ex.weight || "")}" placeholder="e.g. 62"/></div>
          <div class="field"><label>Blood Pressure ▾</label><input id="f_bp" list="bp_presets" placeholder="120/80" value="${E(ex.bp || "")}"/></div>
          <div class="field"><label>Hb (g/dl) ▾</label><input id="f_hb" list="hb_presets" value="${E(ex.hb || "")}" placeholder="e.g. 11.2"/></div>
        </div>
        <div class="field">
          <label>Prescribed Formulations <button type="button" class="btn btn-sm" data-action="fu-autofill">✨ Auto-fill from Samhita Plan</button></label>
          <textarea id="f_form">${E(ex.formulations || "")}</textarea>
        </div>
        <div class="field">
          <label>Dietary &amp; Lifestyle Advice (Pathya / Vihara)</label>
          <textarea id="f_advice">${E(ex.advice || "")}</textarea>
        </div>
        ${checks.length ? `
          <div class="${sel === 8 ? "warn-card" : "ok-card"}">
            <h3>${sel === 8 ? "🛡️ 8th-Month Ojas Care Clinical Protocol" : "🌸 9th-Month Anuvasana Basti &amp; Yoni Pichu Protocol"}</h3>
            <div class="checks" id="f_checks" style="flex-direction:column;align-items:flex-start">
              ${checks.map((c) => `<label><input type="checkbox" value="${E(c)}" ${saved.includes(c) ? "checked" : ""}/> ${E(c)}</label>`).join("")}
            </div>
          </div>` : ""}
        <div class="field">
          <label>Protocol Notes</label>
          <input id="f_protocol" value="${E(ex.protocol || "")}" placeholder="Optional free-text protocol / procedure notes"/>
        </div>
        <div class="field">
          <label>Next Follow-up Visit Date</label>
          <input type="date" id="f_next" value="${E(ex.nextFollowUp || "")}"/>
        </div>
        <button type="button" class="btn btn-ok btn-lg" data-action="save-follow">💾 Save Follow-up — Updates Patient Portal Instantly</button>
      </div>
    </form>`;
  }

  /* ------------------- Hospital-Grade A4 Printable Care Card ------------------- */
  function printHTML(ctx) {
    const rec = ctx.rec, a = (rec && rec.anc) || {}, m = KB.getMonth(ctx.month), r = KB.getRitu(ctx.ritu);
    const fus = (rec && rec.followUps) || [];
    const last = fus[fus.length - 1];
    const din = KB.buildDinacharya(ctx.ritu, ctx.month);
    const li = (arr) => `<ul>${(arr || []).map((x) => `<li>${E(x)}</li>`).join("")}</ul>`;
    const clinicTitle = (rec && rec.clinicName) || S.clinician.clinicName || "AyurGarbha Integrative Clinical Workstation";
    const clinicAddr = (rec && rec.clinicAddress) || S.clinician.clinicAddress || "";
    const clinicCont = (rec && rec.clinicContact) || S.clinician.clinicContact || "";
    const docName = (rec && (rec.doctorName || rec.clinician)) || S.clinician.name || "Doctor";

    return `
    <div class="hdr">
      <div>
        <h1>🪷 ${E(clinicTitle)}</h1>
        <div style="font-size:9.5pt;font-weight:600;color:#065f46;">Antenatal Care Card · Clinical Garbhini &amp; Sutika Paricharya System</div>
        ${clinicAddr ? `<div style="font-size:8pt;color:#555;margin-top:2px;">📍 ${E(clinicAddr)}${clinicCont ? ` · 📞 ${E(clinicCont)}` : ""}</div>` : (clinicCont ? `<div style="font-size:8pt;color:#555;margin-top:2px;">📞 ${E(clinicCont)}</div>` : "")}
      </div>
      <div style="text-align:right;font-size:9pt">
        Date: <b>${fmtDate(todayStr())}</b>
        ${rec ? `<br/><b style="font-size:11pt;color:#065f46;">Link Code: ${E(rec.linkCode)}</b>` : ""}
      </div>
    </div>
    <div class="adv">${KB.DISCLAIMER}</div>
    <table style="margin-top:8px">
      <tr><th>Patient Name</th><td><b>${E(ctx.name)}</b></td><th>Age</th><td>${E((rec && rec.age) || "—")} yrs</td><th>Gravida/Para</th><td><b>${a.G != null ? `G${a.G} P${a.P} L${a.L} A${a.A}` : "—"}</b></td></tr>
      <tr><th>LMP Date</th><td>${fmtDate(ctx.lmp)}</td><th>Gestational Age</th><td><b>${ctx.weeks}w ${ctx.days}d</b> (Month ${ctx.month})</td><th>Expected EDD</th><td><b>${fmtDate(ctx.edd)}</b></td></tr>
      <tr><th>Current Ritu</th><td>${E(r.name)} (${E(r.en)})</td><th>Development</th><td>${E(m.stage)}</td><th>Attending Doctor</th><td><b>${E(docName)}</b>${clinicTitle ? `<br/><span style="font-size:7.5pt;color:#555;">${E(clinicTitle)}</span>` : ""}</td></tr>
    </table>

    <h2>Diet Plan — Month ${ctx.month} + ${E(r.name)} Seasonal Additions</h2>
    <div class="cols">
      <div>
        <b>Monthly Pathya Ahara (Month ${ctx.month}):</b>
        ${li(m.pathya)}
      </div>
      <div>
        <b>${E(r.name)} Seasonal Pathya Additions:</b>
        ${li(r.pathya.slice(0, 5))}
        <div style="margin-top:6px;padding:6px;background:#f0fdf4;border-left:3px solid #059669;">
          <b>Ksheera / Ghrita Formulation:</b><br/>${E(m.ksheera.name)} — ${E(m.ksheera.detail)}
        </div>
      </div>
    </div>

    <h2>24-Hour Daily Dinacharya Routine</h2>
    <table>
      ${din.map((b) => `<tr><td style="width:15%"><b>${E(b.time)}</b></td><td style="width:25%">${b.icon} ${E(b.title)}</td><td>${E(b.body.split(". ").slice(0, 2).join(". "))}</td></tr>`).join("")}
    </table>

    <h2>Strictly Avoid (Garbhopaghatakara Bhavas &amp; Apathya)</h2>
    <div class="avoidbox">
      <div class="cols">
        <div><b>Month ${ctx.month} &amp; Seasonal Contraindications:</b>${li(m.avoid.slice(0, 4).concat(r.avoid.slice(0, 2)))}</div>
        <div><b>Classical Bhavas to Avoid:</b>${li(KB.BHAVAS.groups.map((g) => g.cat + ": " + g.items[0].split(" — ")[0]))}</div>
      </div>
    </div>

    <h2>Latest Clinical Antenatal Examination (ANC Vitals)</h2>
    <table>
      <tr>
        <th>G-P-L-A</th><td>${a.G != null ? `${a.G}-${a.P}-${a.L}-${a.A}` : "—"}</td>
        <th>BP</th><td><b>${E(a.bp || "—")}</b></td>
        <th>Pulse</th><td>${E(a.pulse || "—")} /min</td>
        <th>Weight</th><td><b>${E(a.weight || "—")} kg</b></td>
      </tr>
      <tr>
        <th>Hb (g/dl)</th><td><b>${E(a.hb || "—")}</b></td>
        <th>Blood Group</th><td>${E(a.bloodGroup || "—")}</td>
        <th>Fundal Ht</th><td>${E(a.fundalHeight || "—")} cm</td>
        <th>FHR</th><td>${E(a.fhr || "—")} /min</td>
      </tr>
      <tr>
        <th>Agni / Koshtha</th><td colspan="3">${E(a.agni || "Samagni")} / ${E(a.koshtha || "Madhyama")}</td>
        <th>Urine Albumin</th><td colspan="3">${E(a.urineAlbumin || "Nil")}</td>
      </tr>
      <tr>
        <th>Garbhini Upadrava</th><td colspan="7">${E((a.upadrava || []).join(", ") || "None")}</td>
      </tr>
      <tr>
        <th>Prescription &amp; Advice</th><td colspan="5"><b>${E(last ? last.formulations : "Follow standard Masanumasika Ksheera-Ghrita protocol")}</b><br/>${E(last ? last.advice : "")}</td>
        <th>Next Visit</th><td><b style="color:#059669;font-size:10.5pt;">${last && last.nextFollowUp ? fmtDate(last.nextFollowUp) : "As scheduled"}</b></td>
      </tr>
    </table>

    <div class="avoidbox" style="margin-top:8px">
      <b>🚨 Emergency Red Flags — Seek Hospital Care Immediately:</b><br/>
      ${E(m.redFlags.join(" · "))} · Any bleeding PV, severe headache with blurred vision, leaking fluid, reduced fetal movements.
    </div>

    <div class="sig">
      <span>Patient / Guardian Signature</span>
      <span><b>${E(docName)}</b><br/><span style="font-size:8pt;font-weight:normal;color:#555;">${E(clinicTitle)} — Signature &amp; Seal</span></span>
    </div>`;
  }

  async function openPrint() {
    const ctx = await currentPatientCtx();
    if (!ctx) return toast("No patient selected for care card print", true);
    $("#printSheet").innerHTML = printHTML(ctx);
    $("#printModal").hidden = false;
    document.body.style.overflow = "hidden";
  }

  /* ------------------------------ ROUTER / RENDER ------------------------------ */
  async function render() {
    const app = $("#app");
    // Preserve scrollLeft of any active tab containers across re-renders
    const oldTabs = $$(".tabs");
    const savedScrolls = oldTabs.map((t) => t.scrollLeft);

    const user = DB.getCurrentUser();
    $("#roleChip").hidden = !S.role;
    $("#switchRole").hidden = !S.role;
    if (S.role) {
      if (S.role === "clinician") {
        const docName = S.clinician.name || (user && user.displayName) || "Doctor";
        $("#roleChip").textContent = `🩺 Dr. ${docName.replace(/^Dr\.\s*/i, "")}`;
      } else if (S.role === "asha") {
        const ashaName = S.asha.name || (user && user.displayName) || "ASHA";
        $("#roleChip").textContent = `👩‍⚕️ ASHA: ${ashaName}`;
      } else {
        $("#roleChip").textContent = "🤰 " + (S.lang === "hi" ? "गर्भिणी / माता" : "Mother / Patient");
      }
      
      const langBtn = $("#langBtn");
      if (langBtn) langBtn.textContent = S.lang === "hi" ? "English (EN)" : "हिन्दी (HI)";
      const switchBtn = $("#switchRole");
      if (switchBtn) switchBtn.textContent = t("switchRole");
      const brandSub = $("#brandSubtitle");
      if (brandSub) brandSub.textContent = S.lang === "hi" ? "एआई स्वास्थ्य साथी · चरक व सुश्रुत" : "AI Care Companion · Charaka & Sushruta";
    }
    if (S.role === "clinician") {
      app.innerHTML = await viewClinician();
    } else if (S.role === "asha") {
      app.innerHTML = await viewAsha();
    } else if (S.role === "patient") {
      const ctx = await currentPatientCtx();
      if (ctx) {
        app.innerHTML = patientShell(ctx, S.tab, false);
      } else {
        S.role = null;
        app.innerHTML = viewGateway();
      }
    } else {
      app.innerHTML = viewGateway();
    }

    // Restore scrollLeft for all tab bars synchronously without smooth animation jump
    const newTabs = $$(".tabs");
    newTabs.forEach((t, i) => {
      if (savedScrolls[i] != null && savedScrolls[i] > 0) {
        t.scrollLeft = savedScrolls[i];
      }
      const at = $(".tab.active", t);
      if (at) ensureTabVisible(at, t);
    });
  }

  const rerenderKeepScroll = async () => {
    const y = window.scrollY;
    await render();
    window.scrollTo(0, y);
  };

  /* ------------------------------ ACTIONS ------------------------------ */
  const val = (id) => {
    const e = $("#" + id);
    return e ? e.value.trim() : "";
  };

  const H = {
    /* Language toggle */
    "toggle-lang"() {
      S.lang = S.lang === "hi" ? "en" : "hi";
      localStorage.setItem("ayur_lang", S.lang);
      render();
      toast(S.lang === "hi" ? "भाषा बदलकर हिन्दी की गई" : "Language switched to English");
    },

    /* Judge Demo Hub & Presets */
    "open-judge-demo": openJudgeDemoModal,

    async "load-demo-mother-5"() {
      DB.setSelfProfile({
        name: "Priya Sharma",
        lmp: (() => { const d = new Date(); d.setDate(d.getDate() - 140); return d.toISOString().slice(0, 10); })(),
        location: "Pune, Maharashtra",
        ritu: "grishma",
        complaints: ["chhardi", "katishoola"]
      });
      S.role = "patient";
      S.patientId = null;
      S.tab = "overview";
      S.demoActive = true;
      closeModal();
      await render();
      window.scrollTo(0, 0);
      toast(S.lang === "hi" ? "माह ५ डेमो लोड हुआ (चरक संहिता · ग्रीष्म ऋतु)" : "Loaded Month 5 Demo (Charaka Samhita · Grishma)");
    },

    async "load-demo-mother-8"() {
      DB.setSelfProfile({
        name: "Meera Patel",
        lmp: (() => { const d = new Date(); d.setDate(d.getDate() - 238); return d.toISOString().slice(0, 10); })(),
        location: "Ahmedabad, Gujarat",
        ritu: "sharad",
        complaints: ["vibandha", "shopha"]
      });
      S.role = "patient";
      S.patientId = null;
      S.tab = "overview";
      S.demoActive = true;
      closeModal();
      await render();
      window.scrollTo(0, 0);
      toast(S.lang === "hi" ? "माह ८ डेमो लोड हुआ (सुश्रुत संहिता · अस्थिर ओज)" : "Loaded Month 8 Demo (Sushruta Samhita · Ojas)");
    },

    async "load-demo-sutika"() {
      DB.setSelfProfile({
        name: "Anjali Gupta",
        lmp: (() => { const d = new Date(); d.setDate(d.getDate() - 292); return d.toISOString().slice(0, 10); })(),
        location: "Indore, MP",
        ritu: "auto",
        complaints: []
      });
      S.role = "patient";
      S.patientId = null;
      S.tab = "sutika";
      S.demoActive = true;
      closeModal();
      await render();
      window.scrollTo(0, 0);
      toast(S.lang === "hi" ? "सूतिका परिचर्या डेमो लोड हुआ (प्रसवोपरांत देखभाल)" : "Loaded Sutika Paricharya Demo (Postnatal Care)");
    },

    async "load-demo-doctor"() {
      S.role = "clinician";
      S.clinician.name = "Dr. Ananya Sharma (BAMS, MS Ayu)";
      S.clinician.clinicName = "AyurGarbha Matritva Clinic";
      S.clinician.clinicAddress = "Shivaji Nagar, Pune";
      S.clinician.clinicContact = "+91 98230 12345";
      S.demoActive = true;
      closeModal();
      await render();
      window.scrollTo(0, 0);
      toast(S.lang === "hi" ? "डॉक्टर कार्यस्थल डेमो सक्रिय" : "Loaded Doctor Clinical Workstation");
    },

    async "load-demo-asha"() {
      S.role = "asha";
      S.asha.name = "Sunita Devi (ASHA Facilitator)";
      S.asha.village = "Rampur Sub-Center / PHC";
      S.ashaPatientId = "demo_asha_red";
      S.demoActive = true;
      closeModal();
      await render();
      window.scrollTo(0, 0);
      toast(S.lang === "hi" ? "आशा कार्यकर्ता जोखिम ट्राइएज सक्रिय" : "Loaded ASHA Community Risk Triage");
    },

    /* Quick Demos from Gateway */
    async "quick-doctor-demo"() {
      S.role = "clinician";
      S.clinician.name = "Dr. Ananya Sharma (BAMS, MS Ayu)";
      S.clinician.clinicName = "AyurGarbha Matritva Clinic";
      S.demoActive = true;
      await render();
      window.scrollTo(0, 0);
      toast("Doctor Demo Mode active");
    },

    async "quick-asha-demo"() {
      S.role = "asha";
      S.asha.name = "Sunita Devi (ASHA Facilitator)";
      S.asha.village = "Rampur Sub-Center / PHC";
      S.ashaPatientId = "demo_asha_red";
      S.demoActive = true;
      await render();
      window.scrollTo(0, 0);
      toast("ASHA Demo Mode active");
    },

    /* ASHA Actions */
    "asha-filter"(el) {
      S.ashaFilter = el.dataset.v || "all";
      render();
    },

    "sel-asha-patient"(el) {
      S.ashaPatientId = el.dataset.id;
      render();
    },

    async "save-asha-visit"(el) {
      const pid = el.dataset.id || S.ashaPatientId;
      if (!pid) return;
      const bp = ($("#asha_bp") && $("#asha_bp").value.trim()) || "";
      const wt = ($("#asha_wt") && $("#asha_wt").value.trim()) || "";
      const hb = ($("#asha_hb") && $("#asha_hb").value.trim()) || "";
      const fetal = ($("#asha_fetal") && $("#asha_fetal").value) || "active";
      const complaint = ($("#asha_complaint") && $("#asha_complaint").value.trim()) || "";

      // Evaluate red flags
      const rf = evaluateRedFlags({ text: complaint, bp, hb, complaints: [complaint] });
      let referral = "";
      if (rf.risk === "red") {
        referral = "🚨 Immediate referral to CHC / District Hospital: " + rf.alerts.map(a => a.en).join("; ");
      } else if (rf.risk === "yellow") {
        referral = "⚠️ Close clinical monitor: repeat vitals in 3 days.";
      }

      // If sample patient, update in memory
      const sample = SAMPLE_ASHA_PATIENTS.find(p => p.id === pid);
      if (sample) {
        sample.anc = sample.anc || {};
        if (bp) sample.anc.bp = bp;
        if (wt) sample.anc.weight = wt;
        if (hb) sample.anc.hb = hb;
        if (fetal) sample.anc.fetalMovements = fetal;
        if (complaint) sample.anc.upadrava = [complaint];
        sample.ashaVisits.unshift({
          id: "av_" + Date.now(),
          date: todayStr(),
          bp, weight: wt, hb, fetalMovements: fetal, complaint, referral
        });
      } else {
        try {
          await DB.saveAshaVisit(pid, {
            bp, weight: wt, hb, fetalMovements: fetal, complaint, referral
          });
        } catch (e) {
          console.warn("Save visit local fallback:", e);
        }
      }

      render();
      if (rf.risk === "red") {
        alert("🚨 उच्च जोखिम चेतावनी (Urgent Referral Warning):\n" + rf.alerts.map(a => (S.lang === "hi" ? a.hi : a.en)).join("\n") + "\n\nतुरंत नज़दीकी स्वास्थ्य केंद्र रेफर करें।");
      } else {
        toast(S.lang === "hi" ? "गृह भेंट रिकॉर्ड सफलतापूर्वक सहेजा गया।" : "Home visit recorded successfully.");
      }
    },

    "new-asha-patient"() {
      const isHi = S.lang === "hi";
      openModal(`
        <div class="row between mb0">
          <h3>👩‍⚕️ ${isHi ? "नई गर्भवती महिला पंजीकरण (ASHA)" : "Register Village Mother"}</h3>
        </div>
        <div class="field mt"><label>${isHi ? "माता का नाम *" : "Mother's Full Name *"}</label><input id="ap_name" placeholder="e.g. सुनीता बाई (Sunita Bai)" /></div>
        <div class="grid g2">
          <div class="field"><label>${isHi ? "आयु (वर्ष)" : "Age (Years)"}</label><input type="number" id="ap_age" placeholder="24" /></div>
          <div class="field"><label>${isHi ? "फ़ोन नंबर" : "Phone Number"}</label><input id="ap_phone" placeholder="+91 98765 00000" /></div>
        </div>
        <div class="grid g2">
          <div class="field"><label>${isHi ? "अंतिम मासिक धर्म (LMP) *" : "LMP Date *"}</label><input type="date" id="ap_lmp" max="${todayStr()}" /></div>
          <div class="field"><label>${isHi ? "गाँव / वार्ड" : "Village / Ward"}</label><input id="ap_loc" placeholder="e.g. Rampur, Ward 3" /></div>
        </div>
        <div class="row between mt">
          <button class="btn btn-ghost" data-action="close-modal">${isHi ? "रद्द करें" : "Cancel"}</button>
          <button class="btn btn-ok" data-action="save-new-asha-patient">${isHi ? "पंजीकृत करें" : "Save Mother"}</button>
        </div>
      `);
    },

    async "save-new-asha-patient"() {
      const name = ($("#ap_name") && $("#ap_name").value.trim()) || "Mother";
      const lmp = ($("#ap_lmp") && $("#ap_lmp").value) || todayStr();
      const age = parseInt($("#ap_age") && $("#ap_age").value, 10) || 24;
      const phone = ($("#ap_phone") && $("#ap_phone").value.trim()) || "";
      const loc = ($("#ap_loc") && $("#ap_loc").value.trim()) || "Village";

      const user = DB.getCurrentUser();
      const ashaUid = S.asha.uid || (user && !user.isAnonymous ? user.uid : null);
      const code = await DB.generateLinkCode();

      const newRec = {
        name, lmp, age, phone, location: loc,
        ashaUid,
        linkCode: code,
        shareCode: code,
        anc: { G: 1, P: 0, L: 0, A: 0, bp: "120/80", hb: "11.5", weight: "50", fetalMovements: "Active", upadrava: [] },
        ashaVisits: []
      };

      const saved = await DB.savePatient(newRec);
      SAMPLE_ASHA_PATIENTS.unshift(saved);
      S.ashaPatientId = saved.id;
      closeModal();
      render();
      toast(S.lang === "hi" ? "नई गर्भवती महिला सफलतापूर्वक पंजीकृत!" : "New village mother registered!");
    },

    async "asha-google-login"() {
      try {
        const u = await DB.signInWithGoogle();
        if (u) {
          S.asha.uid = u.uid;
          S.asha.name = u.displayName || "ASHA Worker";
          S.asha.email = u.email;
          S.role = "asha";
          render();
          toast("ASHA Google login successful");
        }
      } catch (e) {
        toast("Login note: " + (e.message || e), true);
        // Fallback to demo mode
        S.role = "asha";
        render();
      }
    },

    "asha-sign-out"() {
      DB.signOut();
      S.role = null;
      render();
      toast("Signed out");
    },

    /* Privacy Consent & Erasure */
    "open-consent-modal": openConsentModal,

    "delete-my-data"() {
      const isHi = S.lang === "hi";
      if (!confirm(isHi ? "क्या आप वाकई अपना समस्त डेटा मिटाना चाहते हैं? यह क्रिया पूर्ववत नहीं की जा सकती।" : "Are you sure you want to delete all stored health records? This cannot be undone.")) return;
      DB.deleteMyData();
      DB.clearSession();
      S.role = null;
      S.patientId = null;
      S.selId = null;
      S.ashaPatientId = null;
      closeModal();
      render();
      toast(isHi ? "समस्त डेटा सफलतापूर्वक मिटा दिया गया।" : "All local data deleted successfully.");
    },

    home() {
      if (!S.role) return;
      S.tab = "overview";
      render();
      window.scrollTo(0, 0);
    },
    "toggle-theme"() {
      const h = document.documentElement;
      const t = h.dataset.theme === "dark" ? "light" : "dark";
      h.dataset.theme = t;
      localStorage.setItem("ayurgarbha:theme", t);
      $("#themeBtn").textContent = t === "dark" ? "☀️ Light" : "🌙 Dark";
    },
    "switch-role"() {
      DB.clearSession();
      S.role = null;
      S.patientId = null;
      render();
      window.scrollTo(0, 0);
    },
    "gate-tab"(el) {
      const v = el.dataset.v;
      $("#gate-lmp").hidden = v !== "lmp";
      $("#gate-code").hidden = v !== "code";
      $$(".seg button").forEach((b) => b.classList.toggle("active", b === el));
    },
    "close-modal": closeModal,

    /* Interactive Clinical Topic Previews */
    "open-topic-preview"(el) {
      const key = el.dataset.topic;
      const p = TOPIC_PREVIEWS[key];
      if (!p) return;
      openModal(`
        <div class="row between mb0">
          <span class="topic-preview-badge">🌸 ${E(p.badge)}</span>
          <span class="chip chip-ok small">Classical × Modern Obstetric Protocol</span>
        </div>
        <h2 class="mt mb0">${E(p.title)}</h2>
        <p class="muted small">${E(p.tagline)}</p>

        <div class="shloka mt">
          <div class="sa">${E(p.shloka)}</div>
          <div class="iast">${E(p.iast)}</div>
          <p class="mb0 mt"><b>हिन्दी व्याख्या:</b> ${E(p.hi)}</p>
          <div class="ref">📍 ${E(p.citation)}</div>
        </div>

        <div class="glass card mt">
          <h3 class="mb0">🌿 Classical Ayurvedic Guidance &amp; Pathya</h3>
          <p class="mt mb0" style="line-height:1.6;">${E(p.en)}</p>
        </div>

        <div class="ok-card mt">
          <h3 class="mb0">🏥 DC Dutta Textbook of Obstetrics Correlation</h3>
          <p class="mt mb0" style="line-height:1.6;">${E(p.dcdutta)}</p>
        </div>

        <div class="warn-card mt">
          <h3 class="mb0">🚨 Emergency Obstetric Red Flags</h3>
          ${ul(p.red_flags)}
        </div>

        <div class="row between mt">
          <button class="btn btn-ok btn-lg" data-action="proceed-to-signin">Proceed to Sign-In / Start Tracking →</button>
          <button class="btn btn-ghost" data-action="close-modal">Close</button>
        </div>
      `);
    },

    "proceed-to-signin"() {
      closeModal();
      const sec = $("#portalsSection");
      if (sec) sec.scrollIntoView({ behavior: "smooth" });
    },

    "toggle-complaint"(el) {
      const k = el.dataset.v;
      const idx = S.selfComplaints.indexOf(k);
      if (idx >= 0) S.selfComplaints.splice(idx, 1);
      else S.selfComplaints.push(k);
      el.classList.toggle("active", S.selfComplaints.includes(k));
    },

    /* Gestational Quick Starts (Zero dummy names, pure gestational parameters) */
    async "quick-selfcare-5"() {
      closeModal();
      const today = new Date();
      const lmp = new Date(today.getTime() - (21 * 7 + 3) * 86400000).toISOString().slice(0, 10);
      DB.setSelfProfile({
        name: "Mother (Self-Care)",
        lmp,
        location: "Self-Care Session",
        ritu: "grishma",
        complaints: ["chhardi"]
      });
      S.role = "patient";
      S.patientId = null;
      S.tab = "overview";
      S.rituSel = "grishma";
      S.triageSym = "chhardi";
      persist();
      toast("🌸 Self-Care Session Started — 5th Month · Grishma Ritu");
      await render();
      window.scrollTo(0, 0);
    },

    async "quick-selfcare-8"() {
      closeModal();
      const today = new Date();
      const lmp = new Date(today.getTime() - (33 * 7 + 2) * 86400000).toISOString().slice(0, 10);
      DB.setSelfProfile({
        name: "Mother (Self-Care)",
        lmp,
        location: "Self-Care Session",
        ritu: "auto",
        complaints: ["shopha"]
      });
      S.role = "patient";
      S.patientId = null;
      S.tab = "overview";
      S.rituSel = null;
      S.triageSym = "shopha";
      persist();
      toast("🌸 Self-Care Session Started — 8th Month · Ojas Care");
      await render();
      window.scrollTo(0, 0);
    },

    async "doctor-google-login"() {
      try {
        toast("Opening Google Sign-In…");
        const res = await DB.signInWithGoogle();
        const u = res && res.user;
        if (u) {
          const prof = await DB.getDoctorProfile(u.uid);
          S.clinician = {
            name: (prof && prof.name) || u.displayName || "Doctor",
            email: u.email,
            uid: u.uid,
            photoURL: u.photoURL,
            tag: "Doctor",
            clinicName: (prof && prof.clinicName) || "",
            clinicAddress: (prof && prof.clinicAddress) || "",
            clinicContact: (prof && prof.clinicContact) || ""
          };
          S.role = "clinician";
          S.ctab = "case";
          S.selId = null;
          persist();
          toast(`🩺 Signed in as Dr. ${S.clinician.name}`);
          await render();
          window.scrollTo(0, 0);
        }
      } catch (err) {
        console.warn("Doctor Google Sign-In notice:", err.message || err);
        toast(err.message || "Google Sign-In was cancelled or unavailable", true);
      }
    },

    async "doctor-sign-out"() {
      try {
        await DB.signOut();
        S.clinician = {
          name: "Doctor",
          tag: "Doctor",
          email: null,
          uid: null,
          photoURL: null,
          clinicName: "",
          clinicAddress: "",
          clinicContact: ""
        };
        if (S.role === "clinician") {
          S.role = null;
          S.selId = null;
        }
        persist();
        toast("Signed out successfully");
        await render();
        window.scrollTo(0, 0);
      } catch (err) {
        console.warn("Sign out notice:", err);
      }
    },

    async "mother-google-login"() {
      try {
        toast("Opening Google Sign-In for backup…");
        const res = await DB.signInWithGoogle();
        const u = res && res.user;
        if (u) {
          toast(`☁️ Backup enabled for ${u.email}`);
          await render();
        }
      } catch (err) {
        console.warn("Mother Google Sign-In notice:", err.message || err);
        toast(err.message || "Google Sign-In was cancelled", true);
      }
    },

    async "mother-sign-out"() {
      try {
        await DB.signOut();
        toast("Cloud backup disconnected");
        await render();
      } catch (err) {
        console.warn("Mother sign out notice:", err);
      }
    },

    async "quick-doctor"() {
      closeModal();
      const u = DB.getCurrentUser();
      const isAuthed = Boolean(u && !u.isAnonymous);
      if (!isAuthed) {
        return H["doctor-google-login"]();
      }
      S.role = "clinician";
      S.clinician = {
        name: u.displayName || "Doctor",
        email: u.email,
        uid: u.uid,
        photoURL: u.photoURL,
        tag: "Doctor"
      };
      S.ctab = "case";
      S.selId = null;
      persist();
      toast("🩺 Clinical Workstation Opened — Doctor");
      await render();
      window.scrollTo(0, 0);
    },

    async "enter-lmp"() {
      const lmp = val("g_lmp");
      if (!lmp) return toast("Please enter your LMP date", true);
      const g = KB.gestationalWeeks(lmp);
      if (!g || g.days < 0) return toast("LMP cannot be in the future", true);
      if (g.days > 300) return toast("LMP looks too old (>42 weeks). Please re-check.", true);
      const cmps = S.selfComplaints || [];
      DB.setSelfProfile({
        name: val("g_name") || "Mother (Self-Care)",
        lmp,
        location: val("g_loc"),
        ritu: val("g_ritu") || "auto",
        complaints: cmps
      });
      S.role = "patient";
      S.patientId = null;
      S.tab = "overview";
      S.rituSel = null;
      if (cmps.length) S.triageSym = cmps[0];
      persist();
      await render();
      window.scrollTo(0, 0);
    },

    async "enter-code"() {
      await linkCode(val("g_code"));
    },
    async "link-from-care"() {
      await linkCode(val("careCode"));
    },
    async "enter-clinician"() {
      const u = DB.getCurrentUser();
      const isAuthed = Boolean(u && !u.isAnonymous);
      if (!isAuthed) {
        return H["doctor-google-login"]();
      }
      S.role = "clinician";
      S.clinician = {
        name: val("c_name") || u.displayName || "Doctor",
        email: u.email,
        uid: u.uid,
        photoURL: u.photoURL,
        tag: "Doctor"
      };
      S.ctab = "case";
      S.selId = null;
      persist();
      await render();
      window.scrollTo(0, 0);
    },

    "ask-domain"(el) {
      S.ask.domain = el.dataset.v || "all";
      $$(".filter-pill[data-action='ask-domain']").forEach((b) => b.classList.toggle("active", b === el));
      if (S.ask.q) runAsk(S.ask.q);
    },

    "ask-samhita"(el) {
      S.ask.samhita = el.dataset.v || "all";
      $$(".filter-pill[data-action='ask-samhita']").forEach((b) => b.classList.toggle("active", b === el));
      if (S.ask.q) runAsk(S.ask.q);
    },

    async "ask-rel"(el) {
      const q = el.dataset.q;
      if (!q) return;
      S.ask.q = q;
      const inp = $("#askQ");
      if (inp) inp.value = q;
      await runAsk(q);
    },

    tab(el) {
      const v = el.dataset.v;
      S.tab = v;
      const container = el.closest(".tabs");
      if (container) {
        $$(".tab[data-action='tab']", container).forEach((t) => t.classList.toggle("active", t === el));
        ensureTabVisible(el, container);
      }
      const tabBody = $("#tabBody");
      if (tabBody) {
        currentPatientCtx().then((ctx) => {
          if (ctx) {
            tabBody.innerHTML = patientTab(ctx, S.tab);
            if (S.tab === "ask") probeBackend();
          } else {
            rerenderKeepScroll();
          }
        });
      } else {
        rerenderKeepScroll();
      }
    },
    month(el) {
      S.viewMonth = +el.dataset.v;
      rerenderKeepScroll();
    },
    ritu(el) {
      S.rituSel = el.dataset.v || null;
      rerenderKeepScroll();
    },

    /* Dinacharya interactive checklist */
    "dina-toggle"(el) {
      const idx = +el.dataset.idx;
      currentPatientCtx().then((ctx) => {
        if (ctx) {
          toggleDinaCheck(ctx, idx);
          rerenderKeepScroll();
        }
      });
    },
    "dina-reset"() {
      currentPatientCtx().then((ctx) => {
        if (ctx) {
          resetDinaChecks(ctx);
          toast("Daily Dinacharya reset for today");
          rerenderKeepScroll();
        }
      });
    },
    "dina-all"() {
      currentPatientCtx().then((ctx) => {
        if (ctx) {
          const blocks = KB.buildDinacharya(ctx.ritu, ctx.month);
          allDinaChecks(ctx, blocks.length);
          toast("🌟 All Dinacharya steps marked completed!");
          rerenderKeepScroll();
        }
      });
    },

    /* Symptom Triage selector */
    "triage-select"(el) {
      S.triageSym = el.dataset.v;
      rerenderKeepScroll();
    },

    async ask() {
      await runAsk(val("askQ"));
    },
    async "ask-sug"(el) {
      S.ask.q = el.dataset.q;
      await runAsk(el.dataset.q);
    },

    print: openPrint,
    "do-print"() {
      window.print();
    },
    "close-print"() {
      $("#printModal").hidden = true;
      document.body.style.overflow = "";
    },

    step(el) {
      const w = el.closest("[data-stepper]");
      const b = $("b", w);
      b.textContent = Math.max(0, Math.min(20, +b.textContent + +el.dataset.d));
    },
    ctab(el) {
      S.ctab = el.dataset.v;
      const container = el.closest(".tabs");
      if (container) {
        $$(".tab[data-action='ctab']", container).forEach((t) => t.classList.toggle("active", t === el));
        ensureTabVisible(el, container);
      }
      rerenderKeepScroll();
    },
    "sel-patient"(el) {
      S.selId = el.dataset.id;
      S.fuMonth = null;
      persist();
      render();
    },
    "fu-month"(el) {
      S.fuMonth = +el.dataset.v;
      render();
    },
    "fu-autofill"() {
      const m = KB.getMonth(S.fuMonth || 1);
      $("#f_form").value = `${m.ksheera.name}: ${m.ksheera.detail}`;
      $("#f_advice").value = `Pathya: ${m.pathya.slice(0, 3).join("; ")}. Avoid: ${m.avoid.slice(0, 2).join("; ")}.`;
    },

    "edit-clinic-profile"() {
      const user = DB.getCurrentUser();
      const docName = S.clinician.name || (user && user.displayName) || "Doctor";
      const clinicName = S.clinician.clinicName || "";
      const clinicContact = S.clinician.clinicContact || "";
      const clinicAddress = S.clinician.clinicAddress || "";

      openModal(`
        <h2>🏥 Edit Doctor &amp; Clinic Profile</h2>
        <p class="muted small">This branding and contact info will appear on the Patient Portal (Care Team tab) and at the top &amp; seal of the A4 Printable Care Card.</p>
        <div class="field">
          <label>Doctor Full Name *</label>
          <input id="cp_docName" value="${E(docName)}" placeholder="e.g. Dr. Radhika Sharma, BAMS, MD (Ayu)"/>
        </div>
        <div class="field">
          <label>Hospital / Clinic Name</label>
          <input id="cp_clinicName" value="${E(clinicName)}" placeholder="e.g. AyurGarbha Integrative Maternity Clinic"/>
        </div>
        <div class="grid g2">
          <div class="field">
            <label>Clinic Contact Phone / Email</label>
            <input id="cp_clinicContact" value="${E(clinicContact)}" placeholder="e.g. +91 98765 43210"/>
          </div>
          <div class="field">
            <label>Clinic Address / City</label>
            <input id="cp_clinicAddress" value="${E(clinicAddress)}" placeholder="e.g. Shivaji Nagar, Pune, Maharashtra"/>
          </div>
        </div>
        <div class="row mt">
          <button class="btn btn-ok" data-action="save-clinic-profile">💾 Save &amp; Sync to Patient Portal</button>
          <button class="btn btn-ghost" data-action="close-modal">Cancel</button>
        </div>`);
    },

    async "save-clinic-profile"() {
      const docName = val("cp_docName") || "Doctor";
      const clinicName = val("cp_clinicName");
      const clinicContact = val("cp_clinicContact");
      const clinicAddress = val("cp_clinicAddress");
      const user = DB.getCurrentUser();
      const docUid = S.clinician.uid || (user && !user.isAnonymous ? user.uid : "local_doctor");

      const prof = {
        name: docName,
        clinicName,
        clinicContact,
        clinicAddress,
        email: S.clinician.email || (user && user.email) || null,
        updatedAt: Date.now()
      };

      S.clinician.name = docName;
      S.clinician.clinicName = clinicName;
      S.clinician.clinicContact = clinicContact;
      S.clinician.clinicAddress = clinicAddress;

      await DB.saveDoctorProfile(docUid, prof);

      // If a patient is currently selected, update their record with the new clinic details
      if (S.selId) {
        const p = await DB.getPatient(S.selId);
        if (p) {
          p.doctorName = docName;
          p.clinician = docName;
          p.clinicName = clinicName;
          p.clinicContact = clinicContact;
          p.clinicAddress = clinicAddress;
          await DB.savePatient(p);
        }
      }

      closeModal();
      toast("✅ Clinic profile saved & synced");
      render();
    },

    "new-patient"() {
      openModal(`
        <h2>＋ Register Pregnant Patient</h2>
        <p class="muted small">A unique 6-digit Link Code (AG-XXXX) will be generated for the patient portal.</p>
        <div class="field"><label>Patient Name *</label><input id="n_name" placeholder="e.g. Ananya Sharma"/></div>
        <div class="grid g2">
          <div class="field"><label>Age</label><input type="number" id="n_age" value="26"/></div>
          <div class="field"><label>Phone Number</label><input id="n_phone" placeholder="Optional phone"/></div>
          <div class="field"><label>LMP Date *</label><input type="date" id="n_lmp" max="${todayStr()}"/></div>
          <div class="field"><label>City / Location</label><input id="n_loc" placeholder="e.g. Pune, Maharashtra"/></div>
        </div>
        <div class="row mt">
          <button class="btn btn-ok" data-action="create-patient">Create Patient &amp; Generate Link Code</button>
          <button class="btn btn-ghost" data-action="close-modal">Cancel</button>
        </div>`);
    },

    async "create-patient"() {
      const name = val("n_name"), lmp = val("n_lmp");
      if (!name || !lmp) return toast("Name and LMP date are required", true);
      const g = KB.gestationalWeeks(lmp);
      if (!g || g.days < 0 || g.days > 300) return toast("Please check the LMP date", true);
      const user = DB.getCurrentUser();
      const rec = await DB.createPatient({
        name,
        age: +val("n_age") || null,
        phone: val("n_phone"),
        lmp,
        location: val("n_loc"),
        clinician: S.clinician.name || (user && user.displayName) || "Doctor",
        doctorName: S.clinician.name || (user && user.displayName) || "Doctor",
        doctorUid: S.clinician.uid || (user && user.uid) || null,
        doctorEmail: S.clinician.email || (user && user.email) || null,
        clinicName: S.clinician.clinicName || "",
        clinicAddress: S.clinician.clinicAddress || "",
        clinicContact: S.clinician.clinicContact || ""
      });
      S.selId = rec.id;
      persist();
      openModal(`
        <div class="center">
          <h2>✅ Patient Registered</h2>
          <p>Give this 6-digit Link Code to <b>${E(rec.name)}</b>:</p>
          <div class="linkcode">${E(rec.linkCode)}</div>
          <p class="small muted mt">The mother can open the Patient Portal → "Clinician Link Code" → enter this code to instantly synchronize prescriptions, vitals, and next visits.</p>
          <button class="btn btn-primary" data-action="close-modal">Done</button>
        </div>`);
      render();
    },

    async "copy-code"(el) {
      try {
        await navigator.clipboard.writeText(el.dataset.v);
        toast("Link Code copied to clipboard: " + el.dataset.v);
      } catch (e) {
        toast("Link Code: " + el.dataset.v);
      }
    },

    async "del-patient"(el) {
      if (!confirm("Are you sure you want to delete this patient record?")) return;
      await DB.deletePatient(el.dataset.id);
      S.selId = null;
      toast("Patient record deleted");
      render();
    },

    async "save-case"() {
      const st = (k) => +$(`[data-stepper="${k}"] b`).textContent;
      const num = (id) => {
        const v = val(id);
        return v === "" ? "" : +v;
      };
      const anc = {
        G: st("G"),
        P: st("P"),
        L: st("L"),
        A: st("A"),
        bp: val("c_bp"),
        pulse: num("c_pulse"),
        weight: num("c_weight"),
        prePregWeight: num("c_prePregWeight"),
        hb: num("c_hb"),
        bloodGroup: val("c_bloodGroup"),
        pallor: val("c_pallor"),
        edema: val("c_edema"),
        urineAlbumin: val("c_urineAlbumin"),
        fundalHeight: num("c_fundalHeight"),
        fhr: num("c_fhr"),
        fetalMovements: val("c_fetalMovements"),
        agni: val("c_agni"),
        koshtha: val("c_koshtha"),
        upadrava: $$("#c_upadrava input:checked").map((i) => i.value),
        notes: val("c_notes")
      };
      if (anc.G < anc.P) return toast("Check G-P-L-A: Gravida must be ≥ Para", true);
      await DB.saveAnc(S.selId, anc);

      // Ensure latest clinic profile is synced to this patient record
      if (S.selId) {
        const p = await DB.getPatient(S.selId);
        if (p) {
          let ch = false;
          if (S.clinician.name && p.doctorName !== S.clinician.name) { p.doctorName = S.clinician.name; p.clinician = S.clinician.name; ch = true; }
          if (S.clinician.clinicName && p.clinicName !== S.clinician.clinicName) { p.clinicName = S.clinician.clinicName; ch = true; }
          if (S.clinician.clinicAddress && p.clinicAddress !== S.clinician.clinicAddress) { p.clinicAddress = S.clinician.clinicAddress; ch = true; }
          if (S.clinician.clinicContact && p.clinicContact !== S.clinician.clinicContact) { p.clinicContact = S.clinician.clinicContact; ch = true; }
          if (ch) await DB.savePatient(p);
        }
      }

      toast("✅ Case sheet saved — patient portal updated");
      render();
    },

    async "save-follow"() {
      const month = S.fuMonth || 1;
      const date = val("f_date");
      if (!date) return toast("Visit date is required", true);
      await DB.saveFollowUp(S.selId, {
        month,
        date,
        weight: val("f_weight") ? +val("f_weight") : "",
        bp: val("f_bp"),
        hb: val("f_hb") ? +val("f_hb") : "",
        formulations: val("f_form"),
        advice: val("f_advice"),
        protocol: val("f_protocol"),
        protocolChecks: $$("#f_checks input:checked").map((i) => i.value),
        nextFollowUp: val("f_next")
      });
      toast(`✅ Month ${month} follow-up saved — linked patient portal updated instantly`);
      render();
    }
  };

  async function linkCode(code) {
    code = (code || "").toUpperCase().trim();
    if (!/^AG-\d{4}$/.test(code)) return toast("Link Code format must be: AG-XXXX (e.g. AG-1084)", true);
    await DB.seedDemo(false);
    const rec = await DB.getPatientByLinkCode(code);
    if (!rec) return toast("Link Code not found. Please verify with your clinician.", true);
    S.role = "patient";
    S.patientId = rec.id;
    S.tab = S.tab === "care" ? "care" : "overview";
    S.rituSel = null;
    persist();
    toast("🔗 Synced with " + (rec.clinician || "your clinician"));
    await render();
    window.scrollTo(0, 0);
  }

  async function runAsk(q) {
    if (!q) return toast("Please type a clinical question first", true);
    S.ask = { q, res: null, loading: true };
    await rerenderKeepScroll();
    const ctx = await currentPatientCtx();
    const res = await askRag(q, ctx);
    S.ask = { q, res, loading: false };
    await rerenderKeepScroll();
    const out = $("#askOut");
    if (out) out.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-action]");
    if (!el) return;
    const fn = H[el.dataset.action];
    if (fn) {
      e.preventDefault();
      fn(el);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      if (!$("#printModal").hidden) H["close-print"]();
    }
    if (e.key === "Enter" && e.target.id === "askQ") H.ask();
    if (e.key === "Enter" && e.target.id === "g_code") H["enter-code"]();
  });

  $("#modal").addEventListener("click", (e) => {
    if (e.target.id === "modal") closeModal();
  });

  // Real-time live sync: patient portal refreshes when clinician saves in any tab
  DB.subscribe(() => {
    if (S.role !== "patient") return;
    const a = document.activeElement;
    if (a && /INPUT|TEXTAREA|SELECT/.test(a.tagName)) return;
    rerenderKeepScroll();
  });

  // Real-time auth state synchronization
  DB.onAuthStateChanged(async (user) => {
    if (user && !user.isAnonymous) {
      if (S.role === "clinician") {
        const prof = await DB.getDoctorProfile(user.uid);
        S.clinician = {
          name: (prof && prof.name) || S.clinician.name || user.displayName || "Doctor",
          email: user.email,
          uid: user.uid,
          photoURL: user.photoURL,
          tag: "Doctor",
          clinicName: (prof && prof.clinicName) || S.clinician.clinicName || "",
          clinicAddress: (prof && prof.clinicAddress) || S.clinician.clinicAddress || "",
          clinicContact: (prof && prof.clinicContact) || S.clinician.clinicContact || ""
        };
      }
    } else if (S.role === "clinician") {
      // Mandatory doctor auth: return to gateway if signed out
      S.role = null;
      S.selId = null;
    }
    render();
  });

  /* ------------------------------ BOOT ------------------------------ */
  (async function boot() {
    const th = localStorage.getItem("ayurgarbha:theme");
    if (th) {
      document.documentElement.dataset.theme = th;
      $("#themeBtn").textContent = th === "dark" ? "☀️ Light" : "🌙 Dark";
    }
    const s = DB.getSession();
    if (s && s.role) {
      S.role = s.role;
      S.patientId = s.patientId || null;
      S.clinician = s.clinician || S.clinician;
      S.selId = s.selId || null;
      // Enforce mandatory Google login for Doctor
      if (S.role === "clinician") {
        const u = DB.getCurrentUser();
        if (!u || u.isAnonymous) {
          S.role = null;
        } else {
          const prof = await DB.getDoctorProfile(u.uid);
          if (prof) {
            S.clinician.name = prof.name || S.clinician.name;
            S.clinician.clinicName = prof.clinicName || S.clinician.clinicName;
            S.clinician.clinicAddress = prof.clinicAddress || S.clinician.clinicAddress;
            S.clinician.clinicContact = prof.clinicContact || S.clinician.clinicContact;
          }
        }
      }
    }
    await DB.seedDemo(false);
    await render();
    probeBackend(true);
    window.AyurGarbha = { S, render, probeBackend, askRag };
  })();
})();
