# 🪷 AyurGarbha — AI Care Companion for Garbhini, Sutika & Navajata Paricharya

> **Integrative Maternal & Child Health System** bridging Classical Ayurvedic Antenatal & Postnatal Care (*Charaka Samhita & Sushruta Samhita*) with Modern Evidence-Based Obstetrics (*DC Dutta's Textbook of Obstetrics*).

[![Live Web Application](https://img.shields.io/badge/Live%20App-Vercel-emerald?style=for-the-badge&logo=vercel)](https://ayurgarbha-frontend.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Samhitas Indexed](https://img.shields.io/badge/Corpus-Charaka%20%26%20Sushruta-amber?style=for-the-badge)](#-knowledge-grounding--clinical-scope)
[![Privacy: DPDP Act 2023](https://img.shields.io/badge/Privacy-DPDP%20Act%202023%20Aligned-teal?style=for-the-badge)](#-dpdp-act-2023-alignment--data-privacy)

**Live Demo URL**: [https://ayurgarbha-frontend.vercel.app](https://ayurgarbha-frontend.vercel.app)

---

## 🏛️ Clinical Scope & Grounding

Maternal and neonatal healthcare in Ayurveda is structured as an unbroken physiological continuum:
1. **Masanumasika Paricharya**: Month-by-month dietary, herbal, and lifestyle regimens from **Charaka Samhita (Sharira Sthana Ch. 4 & 8)** and **Sushruta Samhita (Sharira Sthana Ch. 2, 3 & 10)**.
2. **Garbhopaghatakara Bhava Nivaran**: Rigorous avoidance of teratogenic, physical, and psychological stressors.
3. **Sutika Paricharya**: 45-day postpartum recovery, uterine involution, and lactation promotion.
4. **Navajata Shishu Paricharya**: Immediate neonatal care, resuscitation, and feeding protocols.

AyurGarbha indexes **88 verified knowledge chunks** directly from **Charaka Samhita** and **Sushruta Samhita**, correlated paragraph-by-paragraph with modern obstetric science from **DC Dutta's Textbook of Obstetrics** (8th/9th editions).

---

## 🌟 Key Architecture & Capabilities

### 1. Tri-Role Gateway Architecture
- **🤰 Mother / Patient Self-Care Portal**:
  - Enter **LMP (Last Menstrual Period)**, **Location**, **Current Ritu (Season)**, and multi-select **Presenting Complaints** to generate personalized monthly guidance (*Ksheera-Sarpi*, *Ahara-Vihara*), daily Dinacharya, and red-flag alerts.
  - Sync with clinician or ASHA records in real-time using an **8-Character Share Code (`AG-XXXXXX`)**.
- **👩‍⚕️ ASHA / ANM Field Worker Portal**:
  - Dedicated community antenatal field workstation.
  - **Risk Prioritization Directory**: Triages village mothers into **🚨 Red (Urgent Referral)**, **⚠️ Yellow (Close Monitor)**, and **✅ Green (Routine Care)** based on live vitals.
  - **5-Field Mobile Quick Home Visit Tool**: Rapid entry for **Blood Pressure**, **Weight (kg)**, **Hemoglobin (Hb g/dl)**, **Fetal Movements**, and **Complaints/Observations** with deterministic red-flag detection.
- **🩺 Doctor Clinical Workstation**:
  - Comprehensive **Antenatal Care (ANC) Case Sheet** with 1-tap `+/-` steppers for **G-P-L-A** score, vitals, and Ayurvedic assessment (*Agni, Koshtha, Upadrava*).
  - Generates secure **8-Character Share Codes (`AG-XXXXXX`)** with patient-safe data sharing (excluding private doctor notes).
  - Sequential **Monthly Follow-Up Recorder (Visits 1 to 9)** with dedicated 8th-month *Ojas* care and 9th-month *Anuvasana Basti* & *Yoni Pichu* protocols.
  - **Hospital-Grade A4 Printable Care Card**: Structured, print-ready ANC follow-up card with clinician signature lines.

---

### 2. Clinical Safety Guardrails & Deterministic Red-Flag Engine

Clinical safety is paramount in maternal healthcare. AyurGarbha operates a multi-layered guardrail pipeline:

```
[ User Query / Vitals Input ]
            │
            ▼
┌─────────────────────────────────────────────────────────────┐
│ 1. Deterministic Rule-Based Red-Flag Engine (Pre-AI)        │
│    - Regex & Vitals Evaluator                               │
│    - Triggers: Bleeding PV, Fluid Leak (PPROM), BP ≥ 140/90,│
│      Hb < 9.0 g/dl, FHR < 110 or > 160, Reduced Movements   │
└───────────────────────────┬─────────────────────────────────┘
                            │
              ┌─────────────┴─────────────┐
              ▼                           ▼
      [ Red Flags Found ]          [ Clean Query ]
              │                           │
              ▼                           ▼
┌───────────────────────────┐ ┌───────────────────────────────┐
│ 🚨 Critical Alert Banner  │ │ 2. Hybrid BM25 Retrieval      │
│    - Hospital referral    │ │    - Scored against 88 chunks │
│    - 108 Ambulance call   │ │    - Charaka & Sushruta only  │
└───────────────────────────┘ └───────────────┬───────────────┘
                                              │
                              ┌───────────────┴───────────────┐
                              ▼                               ▼
                      [ Score ≥ 0.22 ]                [ Score < 0.22 ]
                              │                               │
                              ▼                               ▼
               ┌───────────────────────────────┐ ┌──────────────────────────────┐
               │ 3. AyurParam Synthesis Format │ │ 4. Honest Retrieval Fallback │
               │    - Direct Answer            │ │    "इसका उत्तर उपलब्ध        │
               │    - Sanskrit Shloka + IAST   │ │     संहिता-पाठ में नहीं है,   │
               │    - DC Dutta Correlation     │ │     योग्य चिकित्सक से        │
               │    - Dosage Guardrails        │ │     परामर्श लें।"           │
               └───────────────────────────────┘ └──────────────────────────────┘
```

- **Strict Dosage Guardrail**: Every formulation is accompanied by *"मात्रा लेने से पहले योग्य आयुर्वेदिक चिकित्सक से परामर्श लें (Consult a qualified Ayurvedic physician before taking any dosage)"*, and allopathic drug dosages are suppressed from patient self-care views.
- **Honest Retrieval Fallback**: Unrelated or out-of-corpus queries (e.g. quantum physics, unrelated medications) do not hallucinate; they cleanly return the authentic Samhita non-indexed notice.

---

### 3. One-Click Judge Demo Mode (Zero Login Required)

Designed for evaluators, hackathon judges, and rapid video walkthroughs:
- Click **"🎬 Demo देखें (Judge Demo)"** on the gateway.
- Instantly switch between **5 Local Presets** running 100% in-browser with zero authentication and zero Firestore writes:
  1. **🤰 Month 5 · Charaka Samhita (Panchama Masa)**: 20 Weeks gestation, Grishma Ritu, Ksheera-Sarpi regimen, fetal mind awakening, and TIFFA scan correlation.
  2. **🤰 Month 8 · Sushruta Samhita (Ashtama Masa)**: 34 Weeks gestation, Sharad Ritu, Asthapana & Anuvasana Basti protocol, labile Ojas dynamics.
  3. **🤱 Sutika Paricharya (Postnatal 45-Day Care)**: Day 12 Postpartum, Bala Taila Abhyanga, Dashamoola Kwatha, Udaraveshtana, and galactagogues.
  4. **🩺 Doctor Clinical Workstation**: ANC Case Sheet, G-P-L-A vitals, Agni/Koshtha, 8-character Share Code, and A4 printable care card.
  5. **👩‍⚕️ ASHA Field Worker Triage**: Village mother directory with Red (Urgent Referral), Yellow (Close Monitor), and Green (Routine Care) risk categorization, plus 5-field home visit entry.

---

### 4. Bilingual Interface (English | हिन्दी)

- Instant **EN | हिं** language toggle in the header.
- Translates hero text, role selection, navigation tabs, clinical cards, disclaimer banners, triage checkers, and interactive Q&A.

---

### 5. 🔒 DPDP Act 2023 Alignment & Data Privacy

AyurGarbha adheres to India's **Digital Personal Data Protection Act (DPDP Act 2023)**:
- **Local-First Storage**: All maternal self-care records, LMP, and Dinacharya checklists reside in the user's browser (IndexedDB / LocalStorage).
- **Patient-Safe Cloud Sharing**: Cloud sync occurs only when explicitly authenticated or shared via an 8-character Share Code (`AG-XXXXXX`). Private clinician consultation notes are stored in doctor-only collections and never exposed to the public share code.
- **Right to Erasure ("मेरा डेटा मिटाएँ")**: Accessible from the entry gateway and privacy modal, allowing users to permanently purge all cached personal data and credentials in one click.

---

### 6. Phase 2 Roadmap: AyurParam 2.9B LLM Integration

The current Phase 1 implementation uses a lightweight, client-side BM25 hybrid retrieval engine (<10ms latency). 

Phase 2 will introduce an optional backend connection to **AyurParam 2.9B**, a specialized Ayurvedic SLM (Small Language Model) fine-tuned on classical Sanskrit treatises and clinical Charaka-Sushruta commentaries, while maintaining the deterministic pre-RAG safety guardrails.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend UI** | HTML5, Modern CSS3 (Glassmorphism, Dark/Light theme, Print Stylesheet), Vanilla JavaScript (ES2022) |
| **Hosting & CDN** | Vercel Serverless Edge (`https://ayurgarbha-frontend.vercel.app`) |
| **Database & Sync** | Firebase Firestore (Offline-first IndexedDB persistence, scoped role queries) |
| **Authentication** | Firebase Auth (Google Sign-In + Anonymous Fallback) |
| **Knowledge Retrieval** | Client-Side In-Memory BM25 Hybrid Engine (Charaka & Sushruta Samhitas, DC Dutta) |
| **Safety Pipeline** | Deterministic Regex & Vitals Pre-RAG Red-Flag Engine |

---

## 🚀 Local Development Setup

To run AyurGarbha locally:

```bash
# Clone the repository
git clone https://github.com/harshusoni13/ayurgarbha.git
cd ayurgarbha/ayurgarbha-app

# Serve frontend using any static web server
python -m http.server 5500 --directory frontend
```

Open `http://localhost:5500` in your browser.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
