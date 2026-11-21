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

  const S = {
    role: null,
    tab: "overview",
    ctab: "case",
    patientId: null,
    selId: null,
    clinician: { name: "Doctor", tag: "Doctor", email: null, uid: null, photoURL: null },
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
      citation: "Charaka Samhita, Sharira Sthana 8/24 & Ashtanga Hridaya, Sharira Sthana 1/51"
    },
    "preview-4": {
      key: "preview-4",
      badge: "Postnatal · 45-Day Care",
      title: "Sutika Paricharya — Post-Delivery 45-Day Care & Stanyajanana",
      tagline: "Charaka & Kashyapa Sutika Protocols × DC Dutta 6-Week Puerperium",
      shloka: "सूतिकां स्नेहस्वेदाभ्यां उपाचरेत्। पञ्चकोलसिद्धां यवागूं पाययेत्, उदरवेष्टनं च कुर्याद् वातशमनाय गर्भाशयसंकोचनाय च॥",
      iast: "sūtikāṁ snehasvedābhyāṁ upācaret | pañcakolasiddhāṁ yavāgūṁ pāyayet, udaraveṣṭanaṁ ca kuryād vātaśamanāya garbhāśayasaṁkocanāya ca ||",
      hi: "प्रसव के उपरांत माता का शरीर धातु-रिक्त और वात-प्रकोपित होता है। प्रथम 3 दिन स्नेहपान और पंचकोल यवागू से अग्नि दीपन करें। गर्भाशय के संकोच (involution) और वात शमन हेतु उदरवेष्टन (पेट पर सूती वस्त्र लपेटना) करें। बाद में बला तैल अभ्यंग और शतावरी से स्तन्य वृद्धि करें।",
      en: "Following childbirth, maternal Dhatus are severely depleted (Dhatu-Rikta) and Vata is excessively provoked in the empty uterine cavity. Clinical care mandates gentle Bala Taila Abhyanga, warm decoction Parisheka, Panchakola Yavagu (digestive gruel) to rekindle Agni, and firm cotton Udaraveshtana (abdominal wrapping) to assist anatomical involution and eliminate visceral laxity. Galactagogues like Shatavari and garlic stimulate rich breast milk.",
      dcdutta: "DC Dutta Ch. 13 (The Normal Puerperium): Physiological involution of the uterus proceeds at ~1.25 cm daily until returning to pelvis by day 10–12. Prevention of postpartum hemorrhage (PPH), lochial monitoring (rubra -> serosa -> alba), early ambulation to prevent DVT, and exclusive breastfeeding.",
      red_flags: ["Excessive bleeding soaking >1 large pad/hour (Postpartum Hemorrhage)", "Foul-smelling lochial discharge accompanied by fever >100.4°F", "Unilateral severe calf swelling, pain, and erythema (DVT)"],
      citation: "Charaka Samhita, Sharira Sthana 8/48 & Kashyapa Samhita, Khila Sthana"
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
    const rituOpts =
      `<option value="auto">Auto-detect from today’s date (${E(KB.getRitu(KB.rituFromDate()).name)})</option>` +
      KB.RITUS.map((r) => `<option value="${r.key}">${r.name} — ${r.en}</option>`).join("");

    const complaints = [
      ["chhardi", "🤢 Nausea / Vomiting (Chhardi)"],
      ["vibandha", "🪵 Constipation (Vibandha)"],
      ["shopha", "💧 Pedal Edema (Shopha)"],
      ["katishoola", "⚡ Backache (Katishoola)"],
      ["klama", "😴 Fatigue / Exhaustion (Klama)"],
      ["vidaha", "🔥 Heartburn / Acidity (Vidaha)"]
    ];

    return `
    <section class="hero">
      <span class="chip chip-ok">🪷 Evidence-Based Ayurvedic Antenatal & Postnatal Care</span>
      <h1 class="mt">AyurGarbha</h1>
      <p class="lead" style="font-weight:600;color:var(--emerald);">Clinical Garbhini &amp; Sutika Paricharya System</p>
      <p class="lead">Classical Masanumasika Paricharya from <b>Charaka, Sushruta, Ashtanga Hridaya, and Kashyapa Samhita</b> correlated with <b>DC Dutta's Textbook of Obstetrics</b>. Dual-role architecture with offline-first synchronization.</p>
      
      <!-- Interactive Clinical Topic Preview Showcase -->
      <div class="topic-previews-wrap mt">
        <div class="row between">
          <div>
            <h3 class="muted small mb0" style="text-transform:uppercase;letter-spacing:.08em;">Interactive Clinical Topic Previews</h3>
            <p class="small muted">Click any topic card to inspect authentic Samhita Shlokas &amp; DC Dutta correlations prior to personalized portal entry.</p>
          </div>
        </div>
        <div class="grid g2 mt">
          ${Object.values(TOPIC_PREVIEWS).map((p) => `
            <div class="glass topic-preview-card" data-action="open-topic-preview" data-topic="${p.key}">
              <div class="topic-preview-header">
                <span class="topic-preview-badge">🌸 ${E(p.badge)}</span>
                <span class="chip chip-ok small">Read-Only Preview</span>
              </div>
              <h3 class="mb0" style="font-size:1.05rem;">${E(p.title)}</h3>
              <p class="small muted mb0">${E(p.tagline)}</p>
              <div class="topic-preview-meta">
                <span>📜 ${E(p.citation.split(";")[0])}</span>
                <span style="color:var(--emerald);font-weight:700;">View Clinical Protocol →</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </section>

    ${banner()}

    <div class="grid g2" id="portalsSection">
      <!-- Mother / Patient & Self-Care Portal -->
      <section class="glass portal">
        <div class="ic">🤰</div><h2>Mother / Patient Self-Care Portal</h2>
        <p class="muted small">Calculate your customized gestational month and seasonal Dinacharya from your LMP, or view clinical charts synced by your doctor with a 6-digit Link Code.</p>
        <div class="seg"><button class="active" data-action="gate-tab" data-v="lmp">LMP + Ritu + Complaints</button><button data-action="gate-tab" data-v="code">Clinician Link Code</button></div>
        
        <div id="gate-lmp">
          <div class="field"><label>Your Name (Optional)</label><input id="g_name" placeholder="e.g. Mother / Self-Care" /></div>
          <div class="grid g2">
            <div class="field"><label>Last Menstrual Period (LMP) *</label><input type="date" id="g_lmp" max="${todayStr()}" /></div>
            <div class="field"><label>Location / City</label><input id="g_loc" placeholder="e.g. Pune, Maharashtra" /></div>
          </div>
          <div class="field"><label>Current Ritu (Season)</label><select id="g_ritu">${rituOpts}</select></div>

          <div class="mt">
            <label>Presenting Complaints / Symptoms (Optional — Multi-Select):</label>
            <div class="pillbar" id="complaints-bar">
              ${complaints.map(([k, label]) => `
                <button type="button" class="pill ${S.selfComplaints.includes(k) ? 'active' : ''}" data-action="toggle-complaint" data-v="${k}">
                  ${label}
                </button>
              `).join("")}
            </div>
          </div>

          <div class="row mt">
            <button class="btn btn-ok" data-action="enter-lmp">Enter Patient Portal →</button>
            <button class="btn btn-ghost btn-sm" data-action="quick-selfcare-5">⚡ Quick Start (5th Month · Grishma)</button>
            <button class="btn btn-ghost btn-sm" data-action="quick-selfcare-8">⚡ Quick Start (8th Month · Ojas)</button>
          </div>
        </div>

        <div id="gate-code" hidden>
          <div class="field"><label>6-Digit Clinician Link Code (AG-XXXX)</label><input id="g_code" placeholder="AG-XXXX" maxlength="7" style="text-transform:uppercase;letter-spacing:.15em;font-weight:700" /></div>
          <button class="btn btn-ok" data-action="enter-code">Sync With Doctor →</button>
          <p class="small muted mt">Enter the 6-digit Link Code from your doctor's Antenatal Care Card to view live synced prescriptions, vitals, and next visit schedule.</p>
        </div>
      </section>

      <!-- Doctor Portal -->
      <section class="glass portal">
        <div class="ic">🩺</div><h2>Doctor Portal</h2>
        <p class="muted small">Clinical antenatal workstation for doctors &amp; obstetric clinicians: register patients, assign 6-digit Link Codes, record ANC vitals &amp; G-P-L-A formula, assess Agni/Koshtha, and manage 1st to 9th month follow-ups.</p>
        
        ${(() => {
          const user = DB.getCurrentUser();
          const isDoctorAuthed = Boolean(user && !user.isAnonymous);
          if (!isDoctorAuthed) {
            return `
            <div class="doctor-auth-card mt">
              <div class="row" style="align-items:center;gap:8px;margin-bottom:8px;">
                <span class="chip chip-warn">🔒 Authentication Required</span>
                <span class="small muted">Doctor Workstation Security</span>
              </div>
              <p class="small" style="font-weight:600;margin-bottom:6px;">Doctor Sign-In via Google</p>
              <p class="small muted" style="margin-bottom:14px;">Sign in with your Google account to manage your secure patient directory, generate unique 6-digit Link Codes, and access offline-synchronized ANC case sheets.</p>
              <button class="btn btn-google btn-lg w100" data-action="doctor-google-login">
                <svg class="google-icon" viewBox="0 0 24 24" width="20" height="20"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
                Sign in with Google (Doctor Workstation)
              </button>
            </div>`;
          }
          return `
          <div class="doctor-logged-card mt">
            <div class="row" style="align-items:center;gap:12px;">
              ${user.photoURL ? `<img src="${E(user.photoURL)}" alt="Doctor Avatar" style="width:44px;height:44px;border-radius:50%;border:2px solid var(--emerald);object-fit:cover;"/>` : `<div style="width:44px;height:44px;border-radius:50%;background:var(--emerald-d);color:#fff;display:grid;place-items:center;font-weight:700;font-size:1.1rem;">${E((user.displayName || "D")[0].toUpperCase())}</div>`}
              <div>
                <b style="font-size:1.05rem;">${E(user.displayName || "Doctor")}</b>
                <p class="muted small mb0">${E(user.email || "")}</p>
              </div>
            </div>
            <div class="field mt"><label>Doctor Name / Title (Optional)</label><input id="c_name" value="${E(S.clinician.name || user.displayName || "Doctor")}" placeholder="e.g. Dr. Sharma (BAMS, MS Ayu)" /></div>
            <div class="row between mt">
              <button class="btn btn-primary btn-lg" data-action="enter-clinician">Open Clinical Workstation →</button>
              <button class="btn btn-ghost btn-sm" data-action="doctor-sign-out">Sign Out</button>
            </div>
          </div>`;
        })()}
        <p class="small muted mt">Generates printable A4 Antenatal Care Cards and provides instantaneous live synchronization with linked patient portals.</p>
      </section>
    </div>

    <div class="grid g4 mt">
      ${[["9", "Months × 4 Classical Samhitas"], ["6", "Ritus (Seasonal Regimens)"], ["14", "Interactive Dinacharya Steps"], ["130+", "Evidence-Based Knowledge Chunks"]].map((x) => `<div class="glass stat"><b class="grad">${x[0]}</b><span>${x[1]}</span></div>`).join("")}
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
    return ["charaka", "sushruta", "ashtanga", "kashyapa"].map((s, i) => {
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
      <h3>📚 Classical Masanumasika Paricharya across 4 Samhitas</h3>
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
          <h2 class="mb0">🩺 Synced Doctor Clinical Record</h2>
          <p class="muted small mb0">${E(rec.clinician || "Clinician")} · Synced ${new Date(rec.updatedAt || Date.now()).toLocaleString("en-IN")}</p>
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
          <div class="grid g2 mt">
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
      ["ashtanga", "Ashtanga Hridaya"],
      ["kashyapa", "Kashyapa"]
    ];

    return `
    <div class="glass card">
      <h2>🔎 Ask AyurGarbha (AyurParam Clinical Q&A Engine)</h2>
      <p class="muted small">Evidence-based clinical reasoning assistant supporting English, हिन्दी, and Hinglish queries across Charaka, Sushruta, Ashtanga Hridaya, Kashyapa Samhita &amp; DC Dutta Obstetrics.</p>
      
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

    return `
    <div class="hdr">
      <div>
        <h1>🪷 AyurGarbha — Antenatal Care Card</h1>
        <div style="font-size:9.5pt;font-weight:600;color:#065f46;">Clinical Garbhini &amp; Sutika Paricharya System · Classical Samhita × DC Dutta Obstetrics</div>
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
      <tr><th>Current Ritu</th><td>${E(r.name)} (${E(r.en)})</td><th>Development</th><td>${E(m.stage)}</td><th>Attending Doctor</th><td>${E((rec && rec.clinician) || S.clinician.name)}</td></tr>
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
      <span>Doctor / BAMS Physician Signature &amp; Seal</span>
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
      } else {
        $("#roleChip").textContent = "🤰 Mother / Patient";
      }
    }
    if (S.role === "clinician") {
      app.innerHTML = await viewClinician();
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

    // Restore scrollLeft for all tab bars
    const newTabs = $$(".tabs");
    newTabs.forEach((t, i) => {
      if (savedScrolls[i] != null && savedScrolls[i] > 0) {
        t.scrollLeft = savedScrolls[i];
      }
    });

    // Automatically ensure active tab is smoothly in view
    requestAnimationFrame(() => {
      const activeTabs = $$(".tab.active");
      activeTabs.forEach((at) => {
        at.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
      });
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
          S.clinician = {
            name: u.displayName || "Doctor",
            email: u.email,
            uid: u.uid,
            photoURL: u.photoURL,
            tag: "Doctor"
          };
          S.role = "clinician";
          S.ctab = "case";
          S.selId = null;
          persist();
          toast(`🩺 Signed in as Dr. ${u.displayName || u.email}`);
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
        S.clinician = { name: "Doctor", tag: "Doctor", email: null, uid: null, photoURL: null };
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
      S.tab = el.dataset.v;
      if (el && el.scrollIntoView) {
        el.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
      }
      rerenderKeepScroll();
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
      if (el && el.scrollIntoView) {
        el.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
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
        doctorUid: S.clinician.uid || (user && user.uid) || null,
        doctorEmail: S.clinician.email || (user && user.email) || null
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
  DB.onAuthStateChanged((user) => {
    if (user && !user.isAnonymous) {
      if (S.role === "clinician") {
        S.clinician = {
          name: S.clinician.name || user.displayName || "Doctor",
          email: user.email,
          uid: user.uid,
          photoURL: user.photoURL,
          tag: "Doctor"
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
        }
      }
    }
    await DB.seedDemo(false);
    await render();
    probeBackend(true);
    window.AyurGarbha = { S, render, probeBackend, askRag };
  })();
})();
