#!/usr/bin/env python3
"""
AyurGarbha — build_rag.py
Validates backend/corpus_data.json and builds a compact local search index
(rag_index.json): tokenised documents + IDF table + L2-normalised TF-IDF vectors.

Usage:  python build_rag.py            # validate + build
        python build_rag.py --check    # validate only (exit code 1 on error)

The index is tiny (<2 MB) so FastAPI loads it in well under a second and
the whole server stays far below 150 MB RAM. main.py rebuilds in memory
automatically if rag_index.json is missing or older than the corpus.
"""
import json
import math
import re
import sys
from collections import Counter
from pathlib import Path

HERE = Path(__file__).parent
CORPUS = HERE / "corpus_data.json"
INDEX = HERE / "rag_index.json"

STOP = set("a an the of and or to in is are for with what which how do does can i my me should be at on by from it this that when why during".split())
TOKEN_RE = re.compile(r"[a-z0-9\u0900-\u097f]+")
SAMHITAS = {"charaka", "sushruta", "ashtanga", "kashyapa", "harita", "dcdutta", "all"}
CLASSICAL_SAMHITAS = {"charaka", "sushruta", "ashtanga", "kashyapa"}
RITUS = {"hemanta", "shishira", "vasanta", "grishma", "varsha", "sharad"}
STAGES = {"garbha_vriddhi", "masanumasika", "ritu", "garbhopaghatakara", "red_flag", "sutika", "navajata", "dcdutta", "upadrava", "dinacharya", "ritucharya", "ahara_vihara", "prasava"}
REQUIRED = ["id", "title", "stage", "samhita", "english", "citation"]


def tokenize(text: str):
    return [w for w in TOKEN_RE.findall((text or "").lower()) if w not in STOP]


def doc_text(c: dict) -> str:
    tags = c.get("keywords") or c.get("tags") or []
    return " ".join([
        c.get("title", ""),
        c.get("english", "") or c.get("english_clinical_summary", ""),
        c.get("hindi", "") or c.get("hindi_meaning", ""),
        c.get("dc_dutta", "") or c.get("dc_dutta_correlation", ""),
        c.get("samprapti_yukti", ""),
        c.get("chapter_name", ""),
        " ".join(tags),
        c.get("iast", "") or c.get("transliteration", ""),
        c.get("sanskrit", "") or c.get("sanskrit_shloka", "")
    ])


def validate(chunks):
    errors, ids = [], set()
    for c in chunks:
        for k in REQUIRED:
            if not c.get(k):
                errors.append(f"{c.get('id', '?')}: missing '{k}'")
        if c["id"] in ids:
            errors.append(f"duplicate id {c['id']}")
        ids.add(c["id"])
        if c["stage"] not in STAGES:
            errors.append(f"{c['id']}: unknown stage {c['stage']}")
        if c["stage"] == "masanumasika":
            for k in ("sanskrit", "iast", "hindi"):
                if not c.get(k):
                    errors.append(f"{c['id']}: masanumasika chunk needs '{k}'")
    # coverage: all 9 months x 4 samhitas, 6 ritus, sutika, navajata, dc dutta
    for m in range(1, 10):
        for s in CLASSICAL_SAMHITAS:
            if not any(c["stage"] == "masanumasika" and c.get("month") == m and c["samhita"] == s for c in chunks):
                errors.append(f"coverage: month {m} / {s} missing")
        if not any(c["stage"] == "dcdutta" and c.get("month") == m for c in chunks):
            errors.append(f"coverage: DC Dutta month {m} missing")
        if not any(c["stage"] == "garbha_vriddhi" and c.get("month") == m for c in chunks):
            errors.append(f"coverage: Garbha Vriddhi month {m} missing")
    for r in RITUS:
        if not any(c["stage"] == "ritu" and c.get("ritu") == r for c in chunks):
            errors.append(f"coverage: ritu {r} missing")
    for st in ("sutika", "navajata", "garbhopaghatakara", "red_flag", "upadrava"):
        if not any(c["stage"] == st for c in chunks):
            errors.append(f"coverage: stage {st} missing")
    return errors


def build_index(chunks):
    toks = [tokenize(doc_text(c)) for c in chunks]
    n = len(chunks)
    df = Counter()
    for t in toks:
        df.update(set(t))
    idf = {w: math.log(1 + (n - d + 0.5) / (d + 0.5)) for w, d in df.items()}
    vecs = []
    for t in toks:
        tf = Counter(t)
        v = {w: (1 + math.log(c)) * idf[w] for w, c in tf.items()}
        norm = math.sqrt(sum(x * x for x in v.values())) or 1.0
        vecs.append({w: round(x / norm, 5) for w, x in v.items()})
    return {"version": 1, "n": n, "ids": [c["id"] for c in chunks], "tokens": toks, "idf": {k: round(v, 5) for k, v in idf.items()}, "tfidf": vecs}


def load_corpus():
    data = json.loads(CORPUS.read_text(encoding="utf-8"))
    return data["chunks"] if isinstance(data, dict) else data


def main():
    chunks = load_corpus()
    errors = validate(chunks)
    stages = Counter(c["stage"] for c in chunks)
    print(f"Loaded {len(chunks)} chunks: {dict(stages)}")
    if errors:
        print("VALIDATION FAILED:")
        for e in errors:
            print("  -", e)
        sys.exit(1)
    print("Validation OK — 9 months x 4 Samhitas, 6 Ritus, Sutika, Navajata, DC Dutta all present.")
    if "--check" in sys.argv:
        return
    idx = build_index(chunks)
    INDEX.write_text(json.dumps(idx, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"Index written: {INDEX.name} ({INDEX.stat().st_size / 1024:.0f} KB, vocab {len(idx['idf'])})")


if __name__ == "__main__":
    main()
