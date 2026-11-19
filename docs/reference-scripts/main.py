"""
AyurGarbha — FastAPI RAG server
Run:  uvicorn main:app --reload --port 8000
Endpoints:  GET /health · POST /api/ask · POST /api/care-plan
Also serves ../frontend at "/" as the primary clinical application shell.

Retrieval = rank_bm25 (BM25Okapi) + TF-IDF cosine similarity, fused with
min-max normalisation and metadata filters (month, ritu, samhita, stage).
Pure Python + numpy: no external model downloads, <150 MB RAM, <1 s start-up.
"""
import json
import re
from datetime import date, datetime
from pathlib import Path
from typing import List, Optional

import numpy as np
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field
from rank_bm25 import BM25Okapi

import build_rag

HERE = Path(__file__).parent
FRONTEND = HERE.parent / "frontend"

DISCLAIMER = ("⚕️ Clinical Advisory: This guidance is for educational & wellness support based on Ayurvedic Samhitas and "
              "standard obstetric guidelines. Always consult your Doctor / BAMS Physician before starting any medicine, "
              "Basti, or dietary change.")
SAMHITA_NAMES = {"charaka": "Charaka Samhita", "sushruta": "Sushruta Samhita", "ashtanga": "Ashtanga Hridaya",
                 "kashyapa": "Kashyapa Samhita", "harita": "Harita Samhita", "dcdutta": "DC Dutta's Textbook of Obstetrics", "all": "Classical"}
ORD = {"first": 1, "1st": 1, "second": 2, "2nd": 2, "third": 3, "3rd": 3, "fourth": 4, "4th": 4, "fifth": 5, "5th": 5,
       "sixth": 6, "6th": 6, "seventh": 7, "7th": 7, "eighth": 8, "8th": 8, "ninth": 9, "9th": 9}
HINDI_MONTHS = {
    "pehla": 1, "pahla": 1, "pratham": 1, "prathama": 1,
    "dusra": 2, "doosra": 2, "dwitiya": 2,
    "tisra": 3, "teesra": 3, "tritiya": 3,
    "chautha": 4, "chauthe": 4, "chaturtha": 4,
    "panchva": 5, "paanchva": 5, "panchve": 5, "pancham": 5,
    "chhattha": 6, "chatha": 6, "chhathe": 6, "shashtha": 6,
    "saatva": 7, "satva": 7, "saatve": 7, "saptam": 7,
    "aathva": 8, "athva": 8, "aathve": 8, "ashtam": 8,
    "nauva": 9, "nauve": 9, "navam": 9,
}
RITU_ALIASES = {
    "hemanta": ["hemanta", "hemant", "early winter"],
    "shishira": ["shishira", "shishir", "late winter", "thand", "sheetkal"],
    "vasanta": ["vasanta", "vasant", "spring", "basant"],
    "grishma": ["grishma", "greeshm", "summer", "garmi"],
    "varsha": ["varsha", "monsoon", "rainy", "barish", "barsat"],
    "sharad": ["sharad", "autumn"],
}


# ---------------------------------------------------------------- index load
def load_index():
    chunks = build_rag.load_corpus()
    idx = None
    if build_rag.INDEX.exists() and build_rag.INDEX.stat().st_mtime >= build_rag.CORPUS.stat().st_mtime:
        try:
            idx = json.loads(build_rag.INDEX.read_text(encoding="utf-8"))
            if idx.get("ids") != [c["id"] for c in chunks]:
                idx = None
        except Exception:
            idx = None
    if idx is None:  # rebuild in memory (takes milliseconds)
        idx = build_rag.build_index(chunks)
    return chunks, idx


CHUNKS, INDEX = load_index()
BM25 = BM25Okapi(INDEX["tokens"])
IDF = INDEX["idf"]
TFIDF = INDEX["tfidf"]
BY_ID = {c["id"]: c for c in CHUNKS}


# ---------------------------------------------------------------- helpers
def detect_filters(q: str, ctx_month: Optional[int], ctx_ritu: Optional[str]):
    ql = q.lower()
    f = {"month": None, "ritu": None, "samhita": None, "stage": None}
    m = re.search(r"(?:month|masa|maas|mahina|maheena)\s*(\d)", ql) or re.search(r"(\d)(?:st|nd|rd|th)?\s*(?:month|masa|maas|mahina|maheena)", ql)
    if m and 1 <= int(m.group(1)) <= 9:
        f["month"] = int(m.group(1))
    else:
        for k, v in ORD.items():
            if re.search(rf"\b{k}\s+(month|masa|maas|mahina)", ql):
                f["month"] = v
                break
        if not f["month"]:
            for hk, v in HINDI_MONTHS.items():
                if re.search(rf"\b{hk}(?:\s+(?:mahina|maas|masa|month))?\b", ql):
                    f["month"] = v
                    break
    for key, names in RITU_ALIASES.items():
        if any(n in ql for n in names):
            f["ritu"] = key
            break
    for s, pat in (("charaka", r"charaka"), ("sushruta", r"sushruta|susruta"), ("ashtanga", r"ashtanga|vagbhata|a\.h\."),
                   ("kashyapa", r"kashyapa|kasyapa"), ("harita", r"harita"), ("dcdutta", r"dc dutta|dutta|modern")):
        if re.search(pat, ql):
            f["samhita"] = s
            break
    if re.search(r"upadrava|chhardi|vomit|nausea|ulti|ji michla|shopha|swelling|edema|sujan|pandu|anemi|khoon.*kami|vibandha|constipat|kabz|garbhasrava|garbhapata|miscarriage|abortion|headache|shirahshoola|mutrakrichhra|dysuria|uti|peshab|jwara|fever|bukhar|leak|pprom|spandana|movement|kicks", ql):
        f["stage"] = "upadrava"
    elif re.search(r"sutika|postnatal|post-natal|postpartum|after delivery|prasav ke baad|delivery ke baad|puerper|lactation|breast ?milk|stanya", ql):
        f["stage"] = "sutika"
    elif re.search(r"newborn|navajata|neonat|baby care|jatakarma|cord|colostrum|swarna|ulva|shishu", ql):
        f["stage"] = "navajata"
    elif re.search(r"red flag|danger|warning|emergency|khatra", ql):
        f["stage"] = "red_flag"
    elif re.search(r"avoid|apathya|should not|harmful|garbhopaghat|teratogen|don'?t|nuksan|kya na khaye", ql):
        f["stage"] = "garbhopaghatakara"
    elif re.search(r"embryo|garbha vriddhi|fetal growth|dauhrida|ojas|kalala|development|milestone|bacche ka vikas", ql):
        f["stage"] = "garbha_vriddhi"
    elif re.search(r"ritu|season|summer|winter|monsoon|rain|autumn|spring|hemanta|shishira|vasanta|grishma|varsha|sharad|mausam", ql):
        f["stage"] = "ritu"
    if not f["month"] and ctx_month and not f["stage"] and not f["ritu"]:
        f["month"] = ctx_month
    if not f["ritu"] and ctx_ritu and f["stage"] == "ritu":
        f["ritu"] = ctx_ritu
    return f


def search(question: str, top_k=5, month=None, ritu=None, samhita=None, stage=None, domain=None, strict=False):
    """BM25 + TF-IDF cosine, fused, then metadata boost/filter. Returns [(chunk, score)], filters."""
    qt = build_rag.tokenize(question)
    f = detect_filters(question, month, ritu)
    # explicit request filters override auto-detected ones
    for k, v in (("month", month if strict else None), ("ritu", ritu if strict else None), ("samhita", samhita), ("stage", stage), ("domain", domain)):
        if v:
            f[k] = v
    if not qt:
        return [], f
    bm = np.array(BM25.get_scores(qt), dtype=float)
    qtf = {}
    for w in qt:
        qtf[w] = qtf.get(w, 0) + 1
    qv = {w: (1 + np.log(c)) * IDF[w] for w, c in qtf.items() if w in IDF}
    qn = float(np.sqrt(sum(x * x for x in qv.values()))) or 1.0
    cos = np.array([sum(qv[w] * dv.get(w, 0.0) for w in qv) / qn for dv in TFIDF], dtype=float)
    norm = lambda a: (a - a.min()) / (a.max() - a.min()) if a.max() > a.min() else np.zeros_like(a)
    score = 0.6 * norm(bm) + 0.4 * norm(cos)
    score = np.where((bm > 0) | (cos > 0), score, 0.0)
    for i, c in enumerate(CHUNKS):
        if score[i] <= 0 and not (f.get("month") or f.get("ritu") or f.get("stage") or f.get("domain")):
            continue
        s = score[i]
        if f.get("month"):
            s *= 2.2 if c.get("month") == f["month"] else (0.15 if c.get("month") else 1.0)
        if f.get("ritu"):
            s *= 2.5 if c.get("ritu") == f["ritu"] else (0.2 if c.get("ritu") else 1.0)
        if f.get("samhita") and c["samhita"] == f["samhita"]:
            s *= 1.8
        if f.get("stage") and c.get("stage") == f["stage"]:
            s *= 2.0
        if f.get("domain"):
            d = f["domain"].lower()
            cd = (c.get("domain") or c.get("stage") or "").lower()
            if d in cd or cd in d:
                s *= 2.2
            elif d == "garbhini" and c.get("stage") in ("masanumasika", "garbha_vriddhi", "garbhopaghatakara", "upadrava"):
                s *= 2.0
            elif d in ("prasava", "sutika", "prasava_sutika") and c.get("stage") in ("prasava", "sutika"):
                s *= 2.0
            elif d in ("navajata", "bala", "navajata_bala") and c.get("stage") in ("navajata", "bala"):
                s *= 2.0
            elif d == "ahara_vihara" and c.get("stage") in ("ahara_vihara", "masanumasika", "ritu"):
                s *= 1.8
        if samhita and c["samhita"] != samhita and c["samhita"] != "all":  # hard filter if explicitly requested
            s = 0.0
        if stage and c.get("stage") != stage:
            s = 0.0
        score[i] = s
    order = np.argsort(-score)[:top_k]
    return [(CHUNKS[i], float(score[i])) for i in order if score[i] > 0], f


def short(text: str, n: int) -> str:
    return text if len(text) <= n else text[:n].rsplit(" ", 1)[0] + "…"


def compose_answer(hits):
    top = hits[0][0]
    stage = top.get("stage") or ""
    if stage == "masanumasika":
        month = top.get("month")
        parts = []
        for c, _ in hits:
            if c.get("stage") == "masanumasika" and c.get("month") == month:
                parts.append(f"{SAMHITA_NAMES.get(c['samhita'], 'Classical')}: " + (c.get("english") or c.get("english_clinical_summary", "")).split(" Pathya:")[0])
        plan = (top.get("plan") or {})
        extra = ""
        if plan:
            extra = (f" Pathya: {'; '.join(plan.get('pathya', [])[:3])}. Ksheera/Ghrita: {plan.get('ksheera', {}).get('name', '')} — {plan.get('ksheera', {}).get('detail', '')} "
                     f"Rationale: {plan.get('rationale', '')}")
        return short(f"Month {month} Garbhini Paricharya — " + " ".join(parts), 950) + extra
    elif stage == "upadrava":
        plan = top.get("plan") or {}
        acts = "; ".join(plan.get("actions", [])[:3])
        en = top.get("english") or top.get("english_clinical_summary", "")
        return f"{top['title']}: {en} First-line clinical advice: {acts}"
    en = top.get("english") or top.get("english_clinical_summary", "")
    hi = top.get("hindi") or top.get("hindi_meaning", "")
    if hi and not hi.startswith("Shloka"):
        return f"{en} \n\n[हिन्दी व्याख्या]: {hi}"
    return short(en, 950)


# ---------------------------------------------------------------- API models
class AskRequest(BaseModel):
    question: str = Field(..., min_length=2, max_length=500)
    month: Optional[int] = Field(None, ge=1, le=9, description="Patient's current month (soft context)")
    ritu: Optional[str] = None
    samhita: Optional[str] = Field(None, description="charaka|sushruta|ashtanga|kashyapa|dcdutta (hard filter)")
    stage: Optional[str] = Field(None, description="masanumasika|ritu|sutika|navajata|red_flag|... (hard filter)")
    domain: Optional[str] = Field(None, description="garbhini|prasava|sutika|navajata|dinacharya|ritucharya|ahara_vihara")
    top_k: int = Field(5, ge=1, le=10)
    strict: bool = False


class Citation(BaseModel):
    samhita: str
    title: str
    sanskrit: str
    iast: str
    hindi: str
    english: str
    reference: str
    sthana: Optional[str] = ""
    chapter_name: Optional[str] = ""
    verse: Optional[str] = ""


class AskResponse(BaseModel):
    direct_answer: str
    classical_citations: List[Citation]
    samprapti_yukti: str
    dc_dutta_correlation: str
    modern_obstetric_correlation: Optional[str] = ""
    red_flags: List[str]
    related_questions: List[str]
    safety_disclaimer: str
    filters: dict
    matches: List[dict]


class CarePlanRequest(BaseModel):
    lmp: Optional[str] = Field(None, description="YYYY-MM-DD")
    month: Optional[int] = Field(None, ge=1, le=9)
    ritu: Optional[str] = None
    prakriti: Optional[str] = "Vata-Pitta"


# ---------------------------------------------------------------- app
app = FastAPI(title="AyurGarbha RAG API", version="1.0.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])


@app.get("/health")
@app.get("/api/health")
def health():
    return {"status": "ok", "service": "ayurgarbha-rag", "chunks": len(CHUNKS), "retrieval": "BM25 + TF-IDF cosine + metadata filters"}


@app.post("/api/ask", response_model=AskResponse)
def ask(req: AskRequest):
    hits, f = search(req.question, req.top_k, req.month, (req.ritu or None), req.samhita, req.stage, req.domain, req.strict)
    if not hits:
        return AskResponse(
            direct_answer="No specific passage found. Try asking about a month (e.g. 'diet in the 5th month'), a Ritu (e.g. 'Grishma'), Sutika Paricharya, newborn care or red-flag signs.",
            classical_citations=[], samprapti_yukti="In general Ayurvedic obstetric care, Vata Anulomana, Agni Rakshana, and Dhatu Poshana form the tripartite foundation of maternal health.",
            dc_dutta_correlation="Standard antenatal care includes regular BP, weight, symphysio-fundal height monitoring, fetal heart auscultation, and anomaly screening.",
            modern_obstetric_correlation="Standard antenatal care includes regular BP, weight, symphysio-fundal height monitoring, fetal heart auscultation, and anomaly screening.",
            red_flags=["Any bleeding PV, severe headache, blurred vision, reduced fetal movement or fever needs same-day medical review."],
            related_questions=["4th Month me Dauhrida ka kya mahatva hai?", "8th Month me Ojas asthir kyun hota hai aur kya khayein?", "Sutika paricharya me Panchakola Yavagu aur Udaraveshtana kab karein?"],
            safety_disclaimer=DISCLAIMER, filters=f, matches=[])
    
    cites = []
    for c, _ in hits:
        sa = c.get("sanskrit_shloka") or c.get("sanskrit") or ""
        if sa and len(cites) < 4:
            cites.append(Citation(
                samhita=SAMHITA_NAMES.get(c.get("samhita", ""), "Classical"),
                title=c.get("title", ""),
                sanskrit=sa,
                iast=c.get("transliteration") or c.get("iast") or "",
                hindi=c.get("hindi_meaning") or c.get("hindi") or "",
                english=(c.get("english_clinical_summary") or c.get("english") or "").split(" Pathya:")[0].split(" Dosha state:")[0],
                reference=c.get("citation") or "",
                sthana=c.get("sthana") or "",
                chapter_name=c.get("chapter_name") or "",
                verse=c.get("verse") or ""
            ))

    reds: List[str] = []
    for c, _ in hits:
        for r in c.get("red_flags", []):
            if r not in reds and len(reds) < 6:
                reds.append(r)
    if not reds:
        reds = ["Any vaginal bleeding, fluid rush, severe persistent headache or reduced fetal movements requires immediate hospital evaluation."]

    top_chunk = hits[0][0]
    yukti = top_chunk.get("samprapti_yukti") or (
        "Vata Anulomana is prioritized to prevent spasmodic pain and preserve uterine quiescence. "
        "Madhura and Snigdha Ahara nourish Rasa Dhatu, ensuring uninterrupted Upasneha diffusion through the placenta."
    )

    dd = next((c.get("dc_dutta_correlation") or c.get("dc_dutta") for c, _ in hits if (c.get("dc_dutta_correlation") or c.get("dc_dutta"))), "")
    if not dd:
        dd = "Correlates with routine antenatal maternal-fetal surveillance, nutritional adequacy, and risk factor identification per standard obstetric protocols."

    rel_q = []
    for c, _ in hits:
        for q in c.get("related_questions", []):
            if q not in rel_q and len(rel_q) < 3:
                rel_q.append(q)
    if len(rel_q) < 3:
        for default_q in [
            "Dauhrida avamana se fetus me kya upadrava ho sakte hain?",
            "8th month me Ojas rakshana ke liye ksheera-yavagu kaise banayein?",
            "DC Dutta ke anusaar preeclampsia aur hyperemesis ke warning signs kya hain?"
        ]:
            if default_q not in rel_q and len(rel_q) < 3:
                rel_q.append(default_q)

    return AskResponse(
        direct_answer=compose_answer(hits),
        classical_citations=cites,
        samprapti_yukti=yukti,
        dc_dutta_correlation=dd,
        modern_obstetric_correlation=dd,
        red_flags=reds,
        related_questions=rel_q,
        safety_disclaimer=DISCLAIMER,
        filters=f,
        matches=[{"id": c.get("id"), "title": c.get("title"), "score": round(s, 3)} for c, s in hits]
    )


def ritu_for(d: date) -> str:
    half = (d.month - 1) * 2 + (1 if d.day > 15 else 0)
    for lo, hi, name in ((1, 4, "shishira"), (5, 8, "vasanta"), (9, 12, "grishma"), (13, 16, "varsha"), (17, 20, "sharad")):
        if lo <= half <= hi:
            return name
    return "hemanta"


@app.post("/api/care-plan")
def care_plan(req: CarePlanRequest):
    weeks = days = None
    month = req.month
    if req.lmp:
        try:
            lmp = datetime.strptime(req.lmp, "%Y-%m-%d").date()
            total = (date.today() - lmp).days
            weeks, days = max(0, total // 7), max(0, total % 7)
            month = max(1, min(9, int(weeks // 4.345) + 1))
        except ValueError:
            pass
    month = month or 1
    ritu = (req.ritu or ritu_for(date.today())).lower()
    mp = [c for c in CHUNKS if c["stage"] == "masanumasika" and c.get("month") == month]
    plan = (mp[0].get("plan") or {}) if mp else {}
    ritu_chunk = next((c for c in CHUNKS if c["stage"] == "ritu" and c.get("ritu") == ritu), None)
    dd = next((c for c in CHUNKS if c["stage"] == "dcdutta" and c.get("month") == month), None)
    gv = next((c for c in CHUNKS if c["stage"] == "garbha_vriddhi" and c.get("month") == month), None)
    return {
        "gestation": {"weeks": weeks, "days": days, "month": month, "trimester": plan.get("trimester")},
        "prakriti": req.prakriti, "ritu": ritu,
        "month_plan": {k: plan.get(k) for k in ("stage", "weeks", "fetal", "ksheera", "pathya", "avoid", "rationale", "tip")},
        "garbha_vriddhi": gv and {"sanskrit": gv["sanskrit"], "iast": gv["iast"], "hindi": gv["hindi"], "english": gv["english"], "reference": gv["citation"]},
        "samhita_guidance": [{"samhita": SAMHITA_NAMES[c["samhita"]], "sanskrit": c["sanskrit"], "iast": c["iast"], "hindi": c["hindi"],
                              "english": c["english"].split(" Pathya:")[0], "reference": c["citation"]} for c in mp],
        "ritu_modifiers": ritu_chunk and {"plan": ritu_chunk.get("plan"), "classical": {"sanskrit": ritu_chunk["sanskrit"], "iast": ritu_chunk["iast"],
                                          "hindi": ritu_chunk["hindi"], "english": ritu_chunk["english"].split(" Dosha state:")[0], "reference": ritu_chunk["citation"]},
                                          "dc_dutta": ritu_chunk["dc_dutta"]},
        "strictly_avoid": [{"category": c["plan"]["category"], "items": c["plan"]["items"]} for c in CHUNKS if c["stage"] == "garbhopaghatakara"],
        "modern_obstetric_correlation": dd and {"text": dd["dc_dutta"], "reference": dd["citation"]},
        "red_flags": (dd or {}).get("red_flags", []),
        "safety_disclaimer": DISCLAIMER,
    }


# Serve the SPA from the same origin (must be last so /api/* and /health win)
if FRONTEND.exists():
    app.mount("/", StaticFiles(directory=str(FRONTEND), html=True), name="frontend")
