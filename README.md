# 🪷 AyurGarbha — Clinical Garbhini & Sutika Paricharya System

> **Dual-Role Clinical Decision Support System** bridging Classical Ayurvedic Antenatal & Postnatal Care (*Charaka, Sushruta, Ashtanga Hridaya, Kashyapa Samhita*) with Modern Obstetrics (*DC Dutta's Textbook of Obstetrics*).

AyurGarbha is built on a **100% Serverless Architecture** designed for zero cold-start latency, zero server hosting bills, and seamless global deployment on **Netlify + Firebase Firestore**.

---

## 🏛️ Clinical Vision & Philosophy

Maternal and neonatal healthcare in Ayurveda is rooted in the continuous physiological continuum of **Masanumasika Paricharya** (month-by-month antenatal regimen), **Garbhopaghatakara Bhava Nivaran** (contraindications & teratogen avoidance), **Sutika Paricharya** (45-day postpartum recovery), and **Navajata Shishu Paricharya** (neonatal resuscitation and care). 

AyurGarbha digitizes these classical protocols and provides side-by-side **DC Dutta Obstetric Correlations**, offering both pregnant mothers and BAMS clinicians a rigorous, dual-evidence framework for gestational wellness and complication triage.

---

## 🌟 Key Features

### 1. Dual-Role Gateway Architecture
- **Mother / Patient Self-Care Portal**:
  - Enter **LMP (Last Menstrual Period)**, **Location**, **Current Ritu (Season)**, and multi-select **Presenting Complaints** (nausea, constipation, pedal edema, backache, fatigue, acidity) to immediately generate a personalized monthly care protocol and seasonal *Ahara-Vihara*.
  - Sync with clinician records in real-time by entering a **6-Digit Link Code (`AG-XXXX`)**.
  - Prominent non-dismissible clinical safety banner displayed across every view.
- **Doctor / Medical Student Workstation**:
  - Clean patient directory starting with zero dummy names.
  - Comprehensive **Antenatal Care (ANC) Case Sheet** with 1-tap `+/-` steppers for **G-P-L-A** score, vitals (BP, Pulse, Weight, Hb%, Pallor, Edema, Fundal Height, FHR), and Ayurvedic assessment (*Prakriti, Agni, Koshtha, Upadrava*).
  - Sequential **Monthly Follow-Up Recorder (Visits 1 to 9)** with dedicated protocols for 8th-month *Ojas* care and 9th-month *Anuvasana Basti* & *Yoni Pichu*.

### 2. Real-Time Cloud Sync & Offline Persistence (Firebase Firestore)
- Backed by **Firebase Firestore** with offline-first **IndexedDB persistence** (`synchronizeTabs: true`).
- Any update or prescription logged by a clinician triggers real-time `onSnapshot` listeners, instantly updating the linked Mother's view across devices without page reloads.
- Automatic anonymous authentication fallback + Google/Email auth integration.

### 3. Ultra-Fast Client-Side Dual-Citation RAG Engine (`<10ms`)
- **Zero backend cold-starts**: Runs completely inside the browser using an in-memory **BM25Okapi + TF-IDF Cosine Similarity** search engine in [rag-engine.js](file:///frontend/js/rag-engine.js).
- Indexed over **131 classical knowledge chunks** covering Charaka, Sushruta, Ashtanga Hridaya, Kashyapa, Harita, and DC Dutta.
- Multilingual intent & entity detection supporting **English, Hindi, and Hinglish** queries.
- Synthesizes answers in the **AyurParam Clinical Format**:
  1. `direct_answer`: Unified Hindi + English clinical directives.
  2. `classical_citations`: Sanskrit Shloka + IAST + Chapter/Verse + Hindi translation.
  3. `samprapti_yukti`: *Dosha-Dhatu-Agni-Ojas* pathophysiological reasoning.
  4. `dc_dutta_correlation`: Modern obstetric correlation (guidelines, labs, ultrasound).
  5. `red_flags`: High-risk obstetric warning signs requiring immediate medical referral.
  6. `related_questions`: 3 interactive follow-up questions.

### 4. Interactive Daily Dinacharya Tracker (24-Hour Routine)
- 14 chronological daily time-blocks from *Brahma Muhurta* waking, herbal oral hygiene (*Gandusha*), gentle yoga, *Abhyanga*, *Masanumasika Ksheera/Ghrita*, seasonal day-sleep (*Divaswapna*) rules, evening walks, to bedtime milk.
- Interactive check-off system with a live **Completion Progress Bar** and instant status notifications.

### 5. Dynamic 9-Month × 6-Ritu (Seasons) Clinical Matrix
- Interactive selectors across **Months 1–9** and **6 Classical Ritus** (*Hemanta, Shishira, Vasanta, Grishma, Varsha, Sharad*).
- Dynamically highlights monthly fetal development (*Garbha Vriddhi*), medicated milk preparations (*Ksheerapaka*), seasonal additions, and strict contraindications (*Apathya*).

### 6. Interactive Symptom & Emergency Triage Checker
- Immediate triage for 10 common pregnancy symptoms (*Chhardi / Hyperemesis, Shopha / Edema, Shirahshoola / Impending Eclampsia, Garbhasrava / Bleeding PV, Garbha Spandana Mandata / Reduced Movements, Garbhodaka Srava / PPROM, Pandu / Anemia, Vibandha, Mutrakrichhra / UTI, Garbhini Jwara*).
- Color-coded triage urgency (🚨 **CRITICAL EMERGENCY**, ⚠️ **HIGH RISK / URGENT**, ℹ️ **CLINICAL UPADRAVA**) with classical Samhita reference and DC Dutta emergency care protocols.

### 7. Hospital-Grade A4 Printable Care Card
- Print-ready `@media print` modal generating a structured, high-contrast clinical follow-up card containing patient demographics, gestational age, vitals, diet plan, 24-hour routine, contraindications, and clinician signatures.

---

## 🛠️ Architecture & Tech Stack

```
ayurgarbha-app/
├── frontend/                     # 100% Client-Side Production Web Application
│   ├── index.html                # Single Page App shell (Dark/Light theme)
│   ├── css/
│   │   └── styles.css            # Responsive glassmorphic UI + @media print A4 sheet
│   └── js/
│       ├── knowledge-base.js     # Master 131-chunk corpus, Samhita tables, Ritu data
│       ├── rag-engine.js         # Client-side BM25 + Cosine engine (<10ms retrieval)
│       ├── db-service.js         # Firebase Firestore sync + IndexedDB offline cache
│       └── app.js                # State management, portal routing, UI handlers
├── docs/
│   └── reference-scripts/        # Offline Python ingestion & corpus build tools
│       ├── corpus_data.json      # Raw JSON corpus master
│       ├── build_rag.py          # Corpus validator & BM25 verification script
│       └── requirements.txt      # Reference Python dependencies
├── netlify.toml                  # Single-click Netlify CDN configuration
├── .gitignore                    # Production gitignore
└── README.md                     # Documentation
```

| Layer | Technology | Details |
|---|---|---|
| **Frontend Shell** | HTML5, CSS3, Vanilla ES6+ | Zero external framework dependencies; loads in under 300ms |
| **Styling** | Custom Glassmorphism CSS | Responsive layout with accessible contrast, dark/light themes, print media |
| **Search & RAG** | Pure JavaScript (`rag-engine.js`) | BM25Okapi ($k_1=1.5, b=0.75$) + vector cosine fusion running in `<10ms` in browser |
| **Data Sync** | Firebase Firestore (v10 compat) | Real-time bidirectional listeners (`onSnapshot`) + IndexedDB persistence |
| **Deployment** | Netlify CDN | Zero backend server required; 100% static hosting on edge nodes |

---

## 🚀 Deployment Instructions

### Deploy to Netlify (Recommended)

Because AyurGarbha is 100% serverless, it can be deployed to Netlify in seconds without configuring any build steps:

#### Method 1: Git-Connected Deployment
1. Push this repository to **GitHub / GitLab**.
2. Log into [Netlify](https://app.netlify.com/) and click **"Add new site"** → **"Import an existing project"**.
3. Select your repository.
4. Netlify will automatically detect `netlify.toml` with:
   - **Publish directory:** `frontend`
   - **Build command:** *(leave empty)*
5. Click **Deploy Site**. Your application will be live globally on Netlify's high-speed CDN.

#### Method 2: Manual Drag & Drop
1. In Netlify, go to **Sites** → **"Deploy manually"**.
2. Drag and drop the `ayurgarbha-app/frontend/` folder into the Netlify deploy dropzone.
3. The site is instantly live with zero configuration.

---

## 💻 Local Development

To run the application locally, serve `frontend/` using any static file server:

```bash
# Option 1: Python 3 built-in HTTP server
python -m http.server 5500 --directory frontend

# Option 2: Node.js (npx serve)
npx serve frontend -p 5500

# Option 3: VS Code Live Server
# Right-click frontend/index.html and choose "Open with Live Server"
```

Open [http://localhost:5500](http://localhost:5500) in any modern web browser.

---

## 📚 Classical Knowledge Corpus Summary (131 Chunks)

The client-side search engine is backed by 131 curated clinical chunks extracted from primary texts:

| Samhita / Source | Chunks | Core Clinical Focus |
|---|---|---|
| **Charaka Samhita** | 38 | *Shadgarbhadharana, Masanumasika Paricharya, Garbha Vriddhi, Garbhopaghatakara Bhavas, Sutika Paricharya, Jatakarma* |
| **Sushruta Samhita** | 22 | *Shukra-Shonita Shuddhi, Nabhi Nadi circulation, Dauhrida Vimanana Upadrava, Sukhaprasava Vidhi, Stana Roga* |
| **Ashtanga Hridaya** | 19 | *Vagbhata's Ksheerapaka regimen, Balopacharaniya, Garbha Vyapad management, Ritucharya seasonal adjustments* |
| **Kashyapa Samhita** | 14 | *Khila Sthana Garbhini Rogadhikar (8 Upadravas), Lehanadhyaya (Swarna Prashana), Stanya Pariksha & galactagogues* |
| **Harita Samhita** | 10 | *Tritiya Sthana Garbhini Paricharya and specialized Upadrava herbomineral formulations* |
| **DC Dutta Obstetrics** | 24 | *Physiology of pregnancy, maternal nutrition, ANC investigation milestones, trimester ultrasound, high-risk triage* |
| **General Classical** | 4 | *Dinacharya, Tridosha harmony, Ojas preservation, and Garbha Sanskar* |

---

## ⚕️ Clinical Disclaimer

> **Clinical Advisory**: AyurGarbha is designed as a clinical decision support and educational reference system based on classical Ayurvedic treatises and standard modern obstetric guidelines. It does not replace individualized clinical examination or medical diagnosis. Patients must always consult their qualified obstetrician or registered BAMS physician before initiating any medicinal formulation, *Basti*, or significant dietary modification.
