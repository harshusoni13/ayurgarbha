#!/usr/bin/env python3
"""
AyurGarbha — expand_samhita_corpus.py
Builds and expands backend/corpus_data.json to systematically cover:
1. Charaka Samhita:
   - Sharira Sthana Ch. 2 (Atulyagotriya), 3 (Khuddika Garbhavakranti), 4 (Mahati Garbhavakranti), 8 (Jatisutriya)
   - Chikitsa Sthana Ch. 30 (Yonivyapat, Garbhini Rogas, Stanyadosha)
   - Siddhi Sthana Ch. 12 (Uttarabasti & Basti in Garbhini)
   - Sutra Sthana Ch. 5 (Dinacharya), Ch. 6 (Ritucharya), Ch. 7 (Vega Dharana), Ch. 25-27 (Anna-Pana Vidhi / Ahara Varga)
2. Sushruta Samhita:
   - Sharira Sthana Ch. 2 (Shukra Shonita Shuddhi), 3 (Garbhavakranti), 4 (Garbha Vyakarana), 10 (Garbhini Vyakaranam)
   - Nidana Sthana Ch. 8 (Mudha Garbha Nidana)
   - Chikitsa Sthana Ch. 15 (Mudha Garbha Chikitsa), 17 (Stanaroga / Visarpa), 24 (Dinacharya / Anagatabadha)
   - Uttara Tantra Ch. 27-38 (Kaumarabhritya, Balagraha, Stanyadosha)
   - Sutra Sthana Ch. 6 (Ritucharya), Ch. 45-46 (Drava Dravya & Anna-Pana Vidhi)
3. Ashtanga Hridaya (Vagbhata):
   - Sharira Sthana Ch. 1 (Garbhadhana Vidhi - Masanumasika Paricharya), 2 (Garbha Vyapad)
   - Uttara Tantra Ch. 1 (Balopacharaniya - Navajata Shishu Paricharya), 2 (Balamaya Pratishedha), 33-34 (Yonivyapat)
   - Sutra Sthana Ch. 2 (Dinacharya), Ch. 3 (Ritucharya), Ch. 5-8 (Drava Dravya, Anna Swarupa, Matrashitiya)
4. Kashyapa Samhita (Vriddha Jivaka):
   - Sutra Sthana (Lehanadhyaya - Swarna Prashana, Stanya Nirdesha, Jatakamarga)
   - Sharira Sthana (Garbhavakranti, Masanumasika)
   - Chikitsa Sthana (Garbhini Chikitsa, Sutika Chikitsa, Bala Chikitsa)
   - Khila Sthana Ch. 4-5 (Yusha Nirdesha, Bhojya Kalpa), Ch. 9-11 (Garbhini Rogas / 8 Upadravas, Revati Kalpa)
5. DC Dutta's Textbook of Obstetrics:
   - Modern obstetric correlations for embryology, antenatal care, trimester milestones, red flags,
     labor management, puerperium, and immediate newborn care.

Every entry is normalized with:
- id, samhita, sthana, chapter, chapter_name, verse, domain, month, ritu
- sanskrit_shloka, transliteration, hindi_meaning, english_clinical_summary
- dc_dutta_correlation, samprapti_yukti, red_flags, related_questions, keywords
- plus backward-compatible aliases: sanskrit, iast, hindi, english, dc_dutta, tags, citation, stage, title
"""

import json
from pathlib import Path

HERE = Path(__file__).parent
OUTPUT_CORPUS = HERE / "corpus_data.json"

# We load the existing corpus chunks as baseline, then enrich each with canonical fields,
# and append all new classical passages across the specific chapters requested.
def build_expanded_corpus():
    existing_chunks = []
    if OUTPUT_CORPUS.exists():
        try:
            raw = json.loads(OUTPUT_CORPUS.read_text(encoding="utf-8"))
            existing_chunks = raw.get("chunks", raw) if isinstance(raw, dict) else raw
        except Exception:
            existing_chunks = []

    # Map existing chunks by id
    chunk_map = {c["id"]: c for c in existing_chunks}

    # Normalize existing chunks with the canonical schema
    for cid, c in chunk_map.items():
        _normalize_chunk(c)

    # Now add comprehensive classical entries
    new_records = get_classical_expansion_records()
    added_count = 0
    updated_count = 0

    for rec in new_records:
        cid = rec["id"]
        _normalize_chunk(rec)
        if cid in chunk_map:
            # Merge enriched fields into existing chunk
            chunk_map[cid].update(rec)
            updated_count += 1
        else:
            chunk_map[cid] = rec
            added_count += 1

    all_chunks = list(chunk_map.values())

    # Sort chunks deterministically: masanumasika 1-9, ritu, dinacharya, garbhopaghatakara, upadrava, sutika, navajata, etc.
    stage_order = {
        "masanumasika": 1,
        "garbha_vriddhi": 2,
        "dcdutta": 3,
        "ritu": 4,
        "ritucharya": 5,
        "dinacharya": 6,
        "ahara_vihara": 7,
        "garbhopaghatakara": 8,
        "upadrava": 9,
        "prasava": 10,
        "sutika": 11,
        "navajata": 12,
        "red_flag": 13
    }

    all_chunks.sort(key=lambda x: (stage_order.get(x.get("stage", ""), 99), x.get("month") or 0, x.get("id", "")))

    result = {
        "version": "2.0.0",
        "description": "Comprehensive 4-Samhita (Charaka, Sushruta, Ashtanga Hridaya, Kashyapa) + DC Dutta Clinical Corpus",
        "total_chunks": len(all_chunks),
        "chunks": all_chunks
    }

    OUTPUT_CORPUS.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Expanded corpus written to {OUTPUT_CORPUS}: {len(all_chunks)} chunks total ({added_count} added, {updated_count} updated).")


def _normalize_chunk(c: dict):
    # Ensure domain & stage
    stage = c.get("stage", "garbhini")
    domain = c.get("domain") or stage
    if domain in ("masanumasika", "garbha_vriddhi"):
        domain = "garbhini"
    c["domain"] = domain
    c["stage"] = stage

    # Ensure title
    if not c.get("title"):
        c["title"] = f"{c.get('samhita', 'Classical').title()} — {c.get('id', '')}"

    # Ensure Sanskrit shloka fields
    sa = c.get("sanskrit_shloka") or c.get("sanskrit") or ""
    iast = c.get("transliteration") or c.get("iast") or ""
    hi = c.get("hindi_meaning") or c.get("hindi") or ""
    en = c.get("english_clinical_summary") or c.get("english") or ""
    dd = c.get("dc_dutta_correlation") or c.get("dc_dutta") or ""
    kw = c.get("keywords") or c.get("tags") or []

    c["sanskrit_shloka"] = sa
    c["sanskrit"] = sa
    c["transliteration"] = iast
    c["iast"] = iast
    c["hindi_meaning"] = hi
    c["hindi"] = hi
    c["english_clinical_summary"] = en
    c["english"] = en
    c["dc_dutta_correlation"] = dd
    c["dc_dutta"] = dd
    c["keywords"] = list(dict.fromkeys(kw))
    c["tags"] = c["keywords"]

    # Sthana, chapter, chapter_name, verse
    if not c.get("sthana"):
        cit = c.get("citation", "")
        if "Sharira" in cit: c["sthana"] = "Sharira Sthana"
        elif "Sutra" in cit: c["sthana"] = "Sutra Sthana"
        elif "Chikitsa" in cit: c["sthana"] = "Chikitsa Sthana"
        elif "Uttara" in cit: c["sthana"] = "Uttara Tantra"
        elif "Khila" in cit: c["sthana"] = "Khila Sthana"
        elif "Siddhi" in cit: c["sthana"] = "Siddhi Sthana"
        elif "Nidana" in cit: c["sthana"] = "Nidana Sthana"
        else: c["sthana"] = "Sharira Sthana"

    if not c.get("chapter_name"):
        c["chapter_name"] = _default_chapter_name(c.get("samhita"), c.get("sthana"), c.get("chapter"))

    if not c.get("samprapti_yukti"):
        c["samprapti_yukti"] = (
            f"Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. "
            f"Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya."
        )

    if not c.get("red_flags"):
        c["red_flags"] = [
            "Vaginal bleeding or brown spotting PV",
            "Severe headache with visual disturbance (photophobia)",
            "Sudden swelling of face and hands",
            "Marked reduction or absence of fetal movements"
        ]

    if not c.get("related_questions"):
        m = c.get("month")
        r = c.get("ritu")
        if m:
            c["related_questions"] = [
                f"Month {m} me konsa ksheera-paka sabse labhadayak hai?",
                f"Month {m} me DC Dutta ke anusaar konsa scan ya test karwayein?",
                f"Month {m} ke classical red flags aur upadrava kya hain?"
            ]
        elif r:
            c["related_questions"] = [
                f"{r.title()} Ritu me garbhini ke liye pathya ahar kya hai?",
                f"{r.title()} Ritu me din me sona (Divaswapna) kyu nishiddha ya uchit hai?",
                f"{r.title()} Ritu me dosha prakopa se bachne ke upaay?"
            ]
        else:
            c["related_questions"] = [
                "Classical Samhitas me iska mukhya chikitsa sutra kya hai?",
                "DC Dutta Obstetrics me iska modern clinical protocol kya hai?",
                "Garbhini ko kab turant hospital review ke liye refer karein?"
            ]


def _default_chapter_name(samhita, sthana, chapter):
    s = (samhita or "").lower()
    st = (sthana or "").lower()
    ch = str(chapter or "")
    if s == "charaka":
        if "sharira" in st:
            if ch == "2": return "Atulyagotriya Shariram"
            if ch == "3": return "Khuddika Garbhavakranti Shariram"
            if ch == "4": return "Mahati Garbhavakranti Shariram"
            if ch == "8": return "Jatisutriya Shariram"
        elif "sutra" in st:
            if ch == "5": return "Matrashitiya Adhyaya"
            if ch == "6": return "Tasyashitiya Adhyaya"
            if ch == "7": return "Na Vegan Dharaniyet Adhyaya"
            if ch in ("25", "26", "27"): return "Anna-Pana Vidhi / Ahara Varga"
        elif "chikitsa" in st:
            if ch == "30": return "Yonivyapat Chikitsitam"
        elif "siddhi" in st:
            if ch == "12": return "Uttarabasti Siddhi"
    elif s == "sushruta":
        if "sharira" in st:
            if ch == "2": return "Shukra Shonita Shuddhi Shariram"
            if ch == "3": return "Garbhavakranti Shariram"
            if ch == "4": return "Garbha Vyakarana Shariram"
            if ch == "10": return "Garbhini Vyakaranam"
        elif "nidana" in st:
            if ch == "8": return "Mudha Garbha Nidanam"
        elif "chikitsa" in st:
            if ch == "15": return "Mudha Garbha Chikitsitam"
            if ch == "17": return "Visarpa-Stanaroga Chikitsitam"
            if ch == "24": return "Anagatabadha Pratishedha (Dinacharya)"
        elif "uttara" in st:
            return "Kaumarabhritya Tantra & Stanyadosha"
        elif "sutra" in st:
            if ch == "6": return "Ritucharya Adhyaya"
            if ch in ("45", "46"): return "Drava Dravya & Anna-Pana Vidhi"
    elif s == "ashtanga":
        if "sharira" in st:
            if ch == "1": return "Garbhadhana Vidhi"
            if ch == "2": return "Garbha Vyapad Adhyaya"
        elif "uttara" in st:
            if ch == "1": return "Balopacharaniya Adhyaya"
            if ch == "2": return "Balamaya Pratishedha"
            if ch in ("33", "34"): return "Guhya Roga & Yonivyapat"
        elif "sutra" in st:
            if ch == "2": return "Dinacharya Adhyaya"
            if ch == "3": return "Ritucharya Adhyaya"
            if ch in ("5", "6", "7", "8"): return "Drava Dravya & Matrashitiya"
    elif s == "kashyapa":
        if "sutra" in st: return "Lehanadhyaya & Stanya Nirdesha"
        elif "khila" in st: return "Yusha Nirdesha, Bhojya Kalpa & Garbhini Rogas"
        elif "chikitsa" in st: return "Garbhini, Sutika & Bala Chikitsa"
    return "Classical Adhyaya"


def get_classical_expansion_records():
    """Returns structured classical records across all required Samhitas, Sthanas, and Chapters."""
    recs = [
        # =====================================================================
        # CHARAKA SAMHITA EXPANSION
        # =====================================================================
        {
            "id": "charaka_sha_2_garbhotpatti",
            "samhita": "charaka",
            "sthana": "Sharira Sthana",
            "chapter": 2,
            "chapter_name": "Atulyagotriya Shariram",
            "verse": "2/3-5",
            "domain": "garbhini",
            "stage": "garbha_vriddhi",
            "month": None,
            "ritu": None,
            "title": "Charaka Samhita — Shukra-Shonita Sampat & Garbhadhana Factors",
            "citation": "Charaka Samhita, Sharira Sthana 2/3-5",
            "sanskrit_shloka": "ध्रुवं चतुर्णां सान्निध्याद्गर्भः स्याद्विधिवत्कृतः। ऋतुक्षेत्राम्बुबीजानां सामग्र्यादङ्कुरो यथा॥",
            "transliteration": "dhruvaṁ caturṇāṁ sānnidhyādgarbhaḥ syādvidhivatkṛtaḥ | ṛtukṣetrāmbubījānāṁ sāmagryādaṅkuro yathā ||",
            "hindi_meaning": "जैसे ऋतु (उचित काल/मौसम), क्षेत्र (उर्वर भूमि), अम्बु (जल/पोषण) और बीज (उत्तम बीज) की समग्रता से अंकुर उत्पन्न होता है, वैसे ही ऋतु (ऋतुकाल/ovulatory window), क्षेत्र (गर्भाशय/endometrium), अम्बु (रस/रक्त पोषण) और बीज (विशुद्ध शुक्र एवं आर्तव) की समग्रता से स्वस्थ गर्भ स्थापित होता है।",
            "english_clinical_summary": "Charaka establishes the four prerequisite cardinal factors for successful conception and embryogenesis: Ritu (ovulatory fertile window), Kshetra (healthy uterine cavity and receptive endometrium), Ambu (nutrient maternal plasma/Rasa Dhatu), and Bija (unvitiated ovum and spermatozoon). Any qualitative or quantitative deficiency in these four factors results in subfertility or spontaneous early pregnancy loss.",
            "dc_dutta_correlation": "DC Dutta Ch. 3 & 4 (Fertilization and Implantation): Corresponds directly to the pre-conceptional prerequisites: viable gametes (Bija - sperm and oocyte), correct timing during the fertile window (Ritu - days 12-16 of cycle), receptive secretory endometrium with pinopodes (Kshetra), and optimal utero-placental perfusion and hormonal milieu with progesterone and hCG (Ambu).",
            "samprapti_yukti": "Garbhadhana occurs when Vata directs Shukra and Artava together without Dosha Dushti. Ambu (Rasa Dhatu) provides initial unctuous nutrition (Sneha) to prevent Kalala desiccation.",
            "red_flags": ["Secondary amenorrhea with negative pregnancy test", "Severe lower abdominal pain with suspected ectopic gestation", "Habitual abortion (>2 consecutive first-trimester losses)"],
            "related_questions": [
                "Charaka ke anusaar Ritu, Kshetra, Ambu aur Bija ka kya clinical mahatva hai?",
                "Pre-conceptional care me Shukra-Shonita shuddhi kaise ki jaati hai?",
                "DC Dutta me recurrent pregnancy loss ke primary causes kya bataye gaye hain?"
            ],
            "keywords": ["charaka", "atulyagotriya", "garbhotpatti", "ritu", "kshetra", "ambu", "bija", "fertilization", "implantation", "conception"]
        },
        {
            "id": "charaka_sha_3_shadgarbhadharana",
            "samhita": "charaka",
            "sthana": "Sharira Sthana",
            "chapter": 3,
            "chapter_name": "Khuddika Garbhavakranti Shariram",
            "verse": "3/3-14",
            "domain": "garbhini",
            "stage": "garbha_vriddhi",
            "month": None,
            "ritu": None,
            "title": "Charaka Samhita — Shadgarbhadharana (Six Procreative Progenitors)",
            "citation": "Charaka Samhita, Sharira Sthana 3/3-14",
            "sanskrit_shloka": "मातृजश्चायं गर्भः, पितृजश्च, आत्मजश्च, सात्म्यजश्च, रसजश्च, सत्त्वजश्चेति॥",
            "transliteration": "mātṛjaścāyaṁ garbhaḥ, pitṛjaśca, ātmajaśca, sātmyajaśca, rasajaśca, sattvajaśceti ||",
            "hindi_meaning": "यह गर्भ मातृज (माता से मृदु अंग जैसे त्वचा, मांस, रक्त, मेद, हृदय, यकृत, प्लीहा), पितृज (पिता से स्थिर अंग जैसे अस्थि, दन्त, केश, स्नायु, धमनी), आत्मज (चेतना, इन्द्रिय ज्ञान, आयु), सात्म्यज (आरोग्य, ओज, वीर्य), रसज (शरीर वृद्धि, प्राण, पुष्टि) और सत्त्वज (मनोभाव, स्मृति, भक्ति, शील) इन छह भावों के संयोग से उत्पन्न होता है।",
            "english_clinical_summary": "Charaka explains that the fetus is composite of six fundamental maternal, paternal, and environmental factors: Matrija (soft maternal tissues including liver, spleen, heart), Pitrija (hard paternal structures including bone, teeth, tendons), Atmaja (consciousness, lifespan, sense organs), Satmyaja (maternal adaptogenic resilience and immunity), Rasaja (fetal somatic growth directly dependent on maternal nutrition), and Sattvaja (psychological traits and mental equilibrium).",
            "dc_dutta_correlation": "DC Dutta Ch. 3 & 9: Corresponds to polygenic and environmental inheritance: maternal and paternal genomic contribution (autosomal chromosomes and maternal mitochondrial DNA), intrauterine nutritional environment (fetal programming / Barker hypothesis), and maternal neuro-endocrine impact on fetal neurodevelopment.",
            "samprapti_yukti": "Rasaja Bhavas represent maternal Rasa Dhatu passing through the placenta via Upasneha and Upasveda. Defective maternal nutrition directly impairs Rasaja Bhavas leading to Upavishtaka (IUGR).",
            "red_flags": ["Severe maternal malnutrition or hyperemesis leading to ketonuria", "Intrauterine growth restriction (IUGR) on ultrasound", "Oligohydramnios (AFI < 5 cm)"],
            "related_questions": [
                "Shadgarbhadharana me Matrija aur Pitrija avayava konse hote hain?",
                "Rasaja bhava ka fetal growth aur IUGR se kya sambandh hai?",
                "Barker hypothesis aur Ayurvedic Rasaja bhava me kya samanta hai?"
            ],
            "keywords": ["charaka", "shadgarbhadharana", "matrija", "pitrija", "rasaja", "satmyaja", "sattvaja", "embryology", "genetics"]
        },
        {
            "id": "charaka_sha_4_dauhrida",
            "samhita": "charaka",
            "sthana": "Sharira Sthana",
            "chapter": 4,
            "chapter_name": "Mahati Garbhavakranti Shariram",
            "verse": "4/15-20",
            "domain": "garbhini",
            "stage": "garbha_vriddhi",
            "month": 4,
            "ritu": None,
            "title": "Charaka Samhita — 4th Month Dauhrida (द्विहृदया / Fetal Heart & Maternal Desires)",
            "citation": "Charaka Samhita, Sharira Sthana 4/15-20",
            "sanskrit_shloka": "चतुर्थे मासि स्थिरत्वमापद्यते गर्भः, तस्मात्तदा गर्भिणी गुरुगात्रत्वमधिकमापद्यते। द्विहृदयां च तदा गर्भिणीमाचक्षते॥",
            "transliteration": "caturthe māsi sthiratvamāpadyate garbhaḥ, tasmāttadā garbhiṇī gurugātratvamadhikamāpadyate | dvihṛdayāṁ ca tadā garbhiṇīmācakṣate ||",
            "hindi_meaning": "चौथे महीने में गर्भ में स्थिरता आ जाती है, जिससे गर्भिणी के शरीर में भारीपन बढ़ जाता है। इस मास में गर्भस्थ हृदय के प्रस्फुटित होने से गर्भिणी को 'द्विहृदया' (दो हृदय वाली) कहा जाता है। गर्भ अपनी इच्छाओं को माता के हृदय के माध्यम से प्रकट करता है, अतः दौहृद की पूर्ति अनिवार्य है।",
            "english_clinical_summary": "In the fourth month, fetal somatic structures achieve physical stability (Sthiratva), imparting a sensation of bodily heaviness (Gurugatratva) to the mother. The fetal heart functionally coordinates with the maternal cardiovascular system; hence the pregnant woman is called 'Dvihridaya' (bearing two hearts). Fetal desires and sensory cravings manifest through maternal longings (Dauhrida). Non-fulfilment or suppression of Dauhrida causes fetal deformities, mental instability, or pregnancy complications.",
            "dc_dutta_correlation": "DC Dutta Ch. 4 (Fetal Development at 16 weeks) & Ch. 8 (Maternal Systemic Adaptations): Fetal heart sounds are readily audible with Doppler; cardiovascular output reaches 40-50% above pre-pregnancy levels. Second-trimester pregnancy cravings, altered olfactory and gustatory perception are neuro-endocrinologically mediated by beta-hCG, progesterone, and leptin fluctuations.",
            "samprapti_yukti": "Vata directs the circulation of Rasavaha Nadis between fetal and maternal heart. Suppressing Dauhrida irritates Vata, which may derange fetal limb morphogenesis or neuromuscular tone.",
            "red_flags": ["Severe persistent pica (eating mud, chalk, clay - indicative of severe iron deficiency anemia)", "Maternal fainting spells or orthostatic hypotension", "Absent fetal heart tones on Doppler after 14-16 weeks"],
            "related_questions": [
                "4th Month me Dauhrida ka kya mahatva hai aur ise pura karna kyu zaroori hai?",
                "Dauhrida avamana (suppression) se konse fetal upadrava ho sakte hain?",
                "DC Dutta ke anusaar 16th week par fetal Doppler aur maternal hemodynamic changes kya hote hain?"
            ],
            "keywords": ["charaka", "dauhrida", "dvihridaya", "4th month", "cravings", "fetal heart", "mahati garbhavakranti"]
        },
        {
            "id": "charaka_sha_8_ojas_ashtama",
            "samhita": "charaka",
            "sthana": "Sharira Sthana",
            "chapter": 8,
            "chapter_name": "Jatisutriya Shariram",
            "verse": "8/24",
            "domain": "garbhini",
            "stage": "masanumasika",
            "month": 8,
            "ritu": None,
            "title": "Charaka Samhita — 8th Month Ojas Instability & Ksheera-Yavagu Regimen",
            "citation": "Charaka Samhita, Sharira Sthana 8/24",
            "sanskrit_shloka": "अष्टमे मासि गर्भश्च माता च परस्परत ओजोऽऽददाते, तस्मात्तदा गर्भिणी मुहुर्मुहुर्मुदिता मुहुर्मुहुश्च म्लाना भवति। ओजसोऽनवस्थितत्वात्॥",
            "transliteration": "aṣṭame māsi garbhaśca mātā ca parasparata ojo''dadāte, tasmāttadā garbhiṇī muhurmuhurmuditā muhurmuhuśca mlānā bhavati | ojaso'navasthitatvāt ||",
            "hindi_meaning": "आठवें महीने में ओज माता और गर्भ के बीच रसवाही नाड़ियों द्वारा बार-बार आदान-प्रदान करता है (अस्थिर रहता है)। इस कारण गर्भिणी कभी अत्यधिक प्रसन्न (उत्साही) और कभी अचानक ग्लानि (थकी हुई/उदास) प्रतीत होती है। इस मास में प्रसव होने पर ओज के अभाव के कारण माता और शिशु दोनों का जीवन संशयास्पद होता है। अतः क्षीर-यवागु घृतयुक्त आहार और शान्तिपूर्ण ओजोरक्षक परिचर्या दें।",
            "english_clinical_summary": "In the eighth month, vital Ojas remains physiologically unstable, continually circulating between mother and fetus via the placental-umbilical vessels. Consequently, the mother experiences alternating bouts of elation and profound fatigue. Delivery during this month is fraught with peril for both mother and neonate due to transient lack of Ojas (depressed immune resilience). Clinical regimen demands Ksheera-Yavagu with cow's ghee, emotional tranquility, avoidance of travel, and complete preservation of maternal energy.",
            "dc_dutta_correlation": "DC Dutta Ch. 4 (32-36 weeks) & Ch. 21 (Preterm Labor): Corresponds to late preterm vulnerability (32-36 weeks gestation). Fetal pulmonary surfactant production is still incomplete, temperature regulation is fragile, and neonatal morbidity from sepsis and respiratory distress syndrome (RDS) is significantly high if born prematurely before 36 weeks.",
            "samprapti_yukti": "Ojas is the Sara of all Dhatus. Due to rapid third-trimester fetal weight accrual and somatic transfer, Ojas oscillates. Madhura-Snigdha Ksheera and Ghrita provide instant Ojas replenishment.",
            "red_flags": ["Preterm labor contractions (>4 painful uterine contractions per hour)", "Watery fluid leakage PV (PPROM - Preterm premature rupture of membranes)", "Elevated blood pressure (>140/90 mmHg) with proteinuria (preeclampsia risk)"],
            "related_questions": [
                "8th Month me Ojas asthir kyun hota hai aur kya khayein?",
                "8th month me delivery hone par baby aur mother ko kya khatra rehta hai?",
                "DC Dutta me 32-36 weeks preterm delivery ke neonatal risks kya bataye gaye hain?"
            ],
            "keywords": ["charaka", "8th month", "ojas", "ksheera-yavagu", "ojas instability", "preterm", "jatisutriya"]
        },
        {
            "id": "charaka_sha_8_basti_navama",
            "samhita": "charaka",
            "sthana": "Sharira Sthana",
            "chapter": 8,
            "chapter_name": "Jatisutriya Shariram",
            "verse": "8/32",
            "domain": "garbhini",
            "stage": "masanumasika",
            "month": 9,
            "ritu": None,
            "title": "Charaka Samhita — 9th Month Anuvasana Basti & Yoni Pichu Protocol",
            "citation": "Charaka Samhita, Sharira Sthana 8/32",
            "sanskrit_shloka": "नवमे मासि गर्भिण्या मधुरौषधसिद्धेन सर्पिषा पयसा चानूवासयेत्। अपि चैवास्या योनौ पिचुं दद्यात् सार्षपतैलेन वा मधुकसिद्धेन वा वातानुलोमनाय सुखप्रसवाय च॥",
            "transliteration": "navame māsi garbhiṇyā madhurauṣadhasiddhena sarpiṣā payasā cānūvāsayet | api caivāsyā yonau picuṁ dadyāt sārṣapatailena vā madhukasiddhena vā vātānulomanāya sukhaprasavāya ca ||",
            "hindi_meaning": "नौवें महीने में गर्भिणी को मधुर गण की औषधियों से सिद्ध तैल/घृत द्वारा अनुवासन बस्ति देनी चाहिए, तथा मधुर औषध सिद्ध तैल (जैसे बला तैल / मधुकादि तैल) का योनि पिचु (medicated vaginal tampon) धारण कराना चाहिए। इससे अपान वायु का अनुलोमन होता है, गर्भाशय ग्रीवा एवं योनि मार्ग कोमल और स्निग्ध हो जाते हैं, और बिना कष्ट के सुखप्रसव होता है।",
            "english_clinical_summary": "In the ninth month, Charaka mandates Anuvasana Basti (unctuous retention enema) prepared with Madhura Gana medicated oils (such as Bala Taila or Sukumara Ghrita) alongside sterile Yoni Pichu (medicated vaginal tampon) soaked in Bala Taila or Yashtimadhu Taila. This pacifies Apana Vata, softens the cervix and pelvic ligaments, lubricates the birth canal, ensures downward direction of labor forces, and facilitates uncomplicated normal vaginal delivery (Sukhaprasava).",
            "dc_dutta_correlation": "DC Dutta Ch. 11 & 12 (Physiology and Mechanism of Normal Labor): Direct correlation with cervical ripening, softening, and favorable Bishop score (cervical effacement and dilation). Pelvic floor relaxation and perineal lubrication reduce second-stage perineal lacerations and dysfunctional labor.",
            "samprapti_yukti": "Apana Vata governs the expulsion of Garbha, Mutra, Purisha, and Artava. Medicated oil Basti directly enters the rectal ampulla, pacifying Apana Vata at its primary seat (Pakvashaya) and softening the vaginal canal via Snigdha Guna.",
            "red_flags": ["Active painless bleeding PV (Placenta Previa - Basti and Pichu are strictly contraindicated)", "Foul-smelling vaginal discharge (Chorioamnionitis)", "Spontaneous rupture of membranes with clear or meconium liquor"],
            "related_questions": [
                "9th Month me Anuvasana Basti aur Yoni Pichu ka classical clinical procedure kya hai?",
                "Yoni Pichu se cervical ripening aur normal delivery me kaise madad milti hai?",
                "Konsi obstetric conditions me 9th month Basti strictly contraindicated hoti hai?"
            ],
            "keywords": ["charaka", "9th month", "anuvasana basti", "yoni pichu", "bala taila", "sukhaprasava", "cervical ripening"]
        },
        {
            "id": "charaka_sha_8_sutika_paricharya",
            "samhita": "charaka",
            "sthana": "Sharira Sthana",
            "chapter": 8,
            "chapter_name": "Jatisutriya Shariram",
            "verse": "8/48-49",
            "domain": "sutika",
            "stage": "sutika",
            "month": None,
            "ritu": None,
            "title": "Charaka Samhita — Sutika Paricharya (Puerperal Rejuvenation Protocol)",
            "citation": "Charaka Samhita, Sharira Sthana 8/48-49",
            "sanskrit_shloka": "प्रजातायाश्च गर्भाशये विशुद्धे स्नेहमिश्रामौषधियुक्तां यवागूं पाययेत्। उदरवेष्टनं च कुर्याद् वस्त्रेण, वातप्रशमनाय गर्भाशयसंकोचनाय च॥",
            "transliteration": "prajātāyāśca garbhāśaye viśuddhe snehamiśrāmauṣadhiyuktāṁ yavāgūṁ pāyayet | udaraveṣṭanaṁ ca kuryād vastreṇa, vātapraśamanāya garbhāśayasaṁkocanāya ca ||",
            "hindi_meaning": "प्रसव के उपरांत जब अपरा निर्गमन से गर्भाशय विशुद्ध हो जाए, तब सूतिका को बला तैल से अभ्यंग एवं उष्णोदक परिषेक कराएं। अग्निदीपन हेतु पिप्पल्यादि या पञ्चकोल चूर्ण से सिद्ध स्नेहमिश्रित यवागू (पतला दलिया/सूप) पिलाएं। शिथिल उदर में वायु के अवकाश को रोकने तथा गर्भाशय के संकोच (involution) हेतु उदर को स्वच्छ सूती वस्त्र से लपेटें (उदरवेष्टन)।",
            "english_clinical_summary": "Following expulsion of the placenta (Apara), maternal Dhatus are deeply depleted (Dhatu-Rikta) and Vata is severely provoked in the evacuated uterine cavity. Charaka prescribes warm medicated oil Abhyanga, Parisheka with warm decoctions, digestive Yavagu medicated with Panchakola or Pippalyadi Churna to rekindle Jatharagni, and Udaraveshtana (firm abdominal wrapping with clean cotton cloth) to prevent Vata accumulation and expedite physiological uterine involution.",
            "dc_dutta_correlation": "DC Dutta Ch. 13 (The Normal Puerperium): Puerperium encompasses the 6 weeks following delivery during which the reproductive organs revert back to their non-pregnant state. Uterine involution progresses at ~1.25 cm daily; uterine tone is crucial to prevent postpartum hemorrhage (PPH); abdominal wall laxity benefits from non-constricting support and gradual pelvic floor rehabilitation.",
            "samprapti_yukti": "The empty pelvic cavity creates Rikta Srotas where Vata instantly accumulates. Snehapana and Panchakola Yavagu rekindle Agni, digest Ama, and soothe Vata, preventing Sutika Jwara and Shoola.",
            "red_flags": ["Excessive bleeding soaking >1 pad an hour (Postpartum Hemorrhage - PPH)", "Foul-smelling lochia accompanied by maternal fever >100.4°F (Puerperal Sepsis)", "Calf pain, unilateral leg swelling and warmth (Deep Vein Thrombosis - DVT)"],
            "related_questions": [
                "Sutika paricharya me Panchakola Yavagu aur Udaraveshtana kab karein?",
                "Delivery ke baad pehle 7 din me ahar aur snehana ka kya kram hona chahiye?",
                "DC Dutta ke mutabik puerperal sepsis aur PPH ke early warning signs kya hain?"
            ],
            "keywords": ["charaka", "sutika", "puerperium", "udaraveshtana", "panchakola", "yavagu", "involution", "jatisutriya"]
        },
        {
            "id": "charaka_sha_8_navajata_jatakarma",
            "samhita": "charaka",
            "sthana": "Sharira Sthana",
            "chapter": 8,
            "chapter_name": "Jatisutriya Shariram",
            "verse": "8/42-46",
            "domain": "navajata",
            "stage": "navajata",
            "month": None,
            "ritu": None,
            "title": "Charaka Samhita — Navajata Shishu Jatakarma & Resuscitation",
            "citation": "Charaka Samhita, Sharira Sthana 8/42-46",
            "sanskrit_shloka": "तत्र जातमात्रस्यैवोल्वे परिमार्जनीये सैन्धवसर्पिषा। ततः प्राणाप्रत्यागमने सति कर्णमूलेऽश्मनोः संघट्टनं, शीतोदकेनोष्णोदकेन वा मुखपरिषेकः। नाडीं चाष्टविंशत्यङ्गुले बद्ध्वा छिन्द्यात्॥",
            "transliteration": "tatra jātamātrasyaivolve parimārjanīye saindhavasarpiṣā | tataḥ prāṇāpratyāgamane sati karṇamūle'śmanoḥ saṁghaṭṭanaṁ, śītodakenoṣṇodakena vā mukhapariṣekaḥ | nāḍīṁ cāṣṭaviṁśatyaṅgule baddhvā chindyāt ||",
            "hindi_meaning": "जन्म लेते ही नवजात शिशु के मुख और तालु से उल्ब (amniotic vernix/mucus) को सैन्धव लवण एवं घृत से स्वच्छ करें। यदि शिशु श्वास न ले रहा हो (प्राणप्रत्यागमन), तो दोनों कानों के पास पत्थरों को टकराकर शब्द करें, मुख पर शीतोष्ण जल छिड़कें। इसके पश्चात नाभि से 8 अंगुल नापकर नाभि-नाड़ी को सूत्र से बांधकर काटें और सुवर्ण-मधु-सर्पि का प्राशन (जातकर्म) कराएं।",
            "english_clinical_summary": "Immediate newborn management according to Charaka includes: Ulva Parimarjana (gentle clearance of mucus and vernix from oral and pharyngeal cavities using rock salt and ghee), Pranapratyagamana (auditory and cutaneous tactile stimulation for neonatal resuscitation if breathing is delayed), Nalakartana (umbilical cord clamping and sterile transaction measured at 8 Angulas), and Jatakarma (administering micro-doses of purified gold bhasma with unequal honey and ghee for intellect and vitality).",
            "dc_dutta_correlation": "DC Dutta Ch. 38 (The Newborn Infant): Immediate neonatal care: clearing airway secretions gently without aggressive suctioning, assessment of breathing and APGAR score at 1 and 5 minutes, tactile stimulation, delayed cord clamping (1-3 minutes to allow placental transfusion of 80-100 ml blood), hypothermia prevention via immediate skin-to-skin contact and thermal drying.",
            "samprapti_yukti": "Ulva (mucus) obstructs Prana Vaha Srotas. Gentle clearing clears the airway without mucosal trauma. Madhu-Sarpi with gold calx acts as Rasayana to stimulate digestion and innate immunity.",
            "red_flags": ["Apnea, gasping respiration or central cyanosis at 1 minute", "Heart rate <100 bpm requiring bag-and-mask positive pressure ventilation", "Bleeding from umbilical cord stump or purulent discharge (Omphalitis)"],
            "related_questions": [
                "Navajata Shishu ke Jatakarma aur Stanyapana ke niyam kya hain?",
                "Ulva Parimarjana aur Pranapratyagamana ka modern resuscitation se kya correlation hai?",
                "Delayed cord clamping aur Charaka Nalakartana me kya similarity hai?"
            ],
            "keywords": ["charaka", "navajata", "newborn", "jatakarma", "ulva parimarjana", "nalakartana", "apgar", "resuscitation"]
        },
        {
            "id": "charaka_sutra_5_dinacharya",
            "samhita": "charaka",
            "sthana": "Sutra Sthana",
            "chapter": 5,
            "chapter_name": "Matrashitiya Adhyaya",
            "verse": "5/1-10",
            "domain": "dinacharya",
            "stage": "dinacharya",
            "month": None,
            "ritu": None,
            "title": "Charaka Samhita — Daily Dinacharya Foundations for Maternal Health",
            "citation": "Charaka Samhita, Sutra Sthana 5/1-10",
            "sanskrit_shloka": "मात्राशी स्यात्। आहाराग्निबलमपेक्षते। तस्मात् सम्यगुपयुञ्जीत मात्रया यथोचितम्। तैलमभ्यङ्गे, व्यायामः, स्नानं च बलवर्धनम्॥",
            "transliteration": "mātrāśī syāt | āhārāgnibalamapekṣate | tasmāt samyagupayuñjīta mātrayā yathocitam | tailamabhyaṅge, vyāyāmaḥ, snānaṁ ca balavardhanam ||",
            "hindi_meaning": "गर्भिणी और प्रत्येक व्यक्ति को अग्निबल के अनुसार उचित मात्रा में भोजन (मात्राशी) करना चाहिए। नित्य तैल अभ्यंग (शरीर पर तेल की मालिश), मृदु व्यायाम/टहलना, सुखोष्ण जल से स्नान और इन्द्रिय स्वच्छता शरीर में बल, कान्ति, वातशमन और उत्तम निद्रा प्रदान करती है।",
            "english_clinical_summary": "Charaka emphasizes that maternal diet and physical routine must strictly respect individual digestive capacity (Agni Bala). Essential daily regimen components: morning Abhyanga (gentle self-massage with Bala Taila/sesame oil avoiding abdominal compression), lukewarm bath (Snana), oral hygiene, and light walking (Chankramana) to pacify Vata, relieve muscle aches, promote restful sleep, and stabilize maternal energy.",
            "dc_dutta_correlation": "DC Dutta Ch. 9 (Antenatal Care): Recommends daily moderate exercise (walking 30 minutes daily), regular sleep hygiene (8 hours nightly plus 1-2 hours rest), comfortable non-restrictive cotton clothing, adequate personal hygiene, and balanced calorie intake (+350 kcal/day in 2nd/3rd trimester).",
            "samprapti_yukti": "Regular Abhyanga prevents Vata aggravation that normally occurs due to progressive uterine distension and ligamentous strain. Lukewarm bath cleanses Sweda Vaha Srotas and promotes circulation.",
            "red_flags": ["Severe exhaustion, dizziness or palpitations during walking", "Calf tenderness or swelling after exercise", "Inability to sleep due to severe orthopnea or paroxysmal nocturnal dyspnea"],
            "related_questions": [
                "Garbhini ke daily Dinacharya me Abhyanga aur Snana ke kya niyam hain?",
                "Pregnancy me kitne ghante sona chahiye aur daytime sleep (Divaswapna) ke kya niyam hain?",
                "DC Dutta me pregnancy me exercise aur rest ke baare me kya guidelines di gayi hain?"
            ],
            "keywords": ["charaka", "dinacharya", "matrashitiya", "abhyanga", "snana", "agni", "maternal wellness"]
        },
        {
            "id": "charaka_sutra_6_ritucharya",
            "samhita": "charaka",
            "sthana": "Sutra Sthana",
            "chapter": 6,
            "chapter_name": "Tasyashitiya Adhyaya",
            "verse": "6/3-8",
            "domain": "ritucharya",
            "stage": "ritucharya",
            "month": None,
            "ritu": None,
            "title": "Charaka Samhita — Six Ritus & Seasonal Maternal Adaptation",
            "citation": "Charaka Samhita, Sutra Sthana 6/3-8",
            "sanskrit_shloka": "इह खलु संवत्सरो षडृतुको भवति। आदानकालः शीतोष्णरूक्षैर्बलमादत्ते, विसर्गकालस्तु सौम्यस्निग्धैर्बलं विसृजति॥",
            "transliteration": "iha khalu saṁvatsaro ṣaḍṛtuko bhavati | ādānakālaḥ śītoṣṇarūkṣairbalamādatte, visargakālastu saumyasnigdhairbalaṁ visṛjati ||",
            "hindi_meaning": "वर्ष छह ऋतुओं में विभाजित है: आदान काल (शिशिर, वसन्त, ग्रीष्म) जिसमें सूर्य और वायु शरीर के बल का हरण करते हैं, तथा विसर्ग काल (वर्षा, शरद्, हेमन्त) जिसमें चन्द्रमा का सौम्य प्रभाव शरीर के बल और धातुओं की पुष्टि करता है। गर्भिणी को ऋतु के अनुसार आहार-विहार में परिमार्जन करना चाहिए।",
            "english_clinical_summary": "Charaka classifies the annual seasonal cycle into Adana Kala (northern solstice: Shishira, Vasanta, Grishma) characterized by dry, dehydrating solar energy reducing maternal vitality, and Visarga Kala (southern solstice: Varsha, Sharad, Hemanta) characterized by lunar, nourishing, moist energy replenishing Dhatus. Pregnancy care requires counteracting the seasonal Dosha vitiation through specific Ahara and Vihara.",
            "dc_dutta_correlation": "DC Dutta Ch. 9 & 10: Environmental seasonal impact on pregnancy: extreme summer heat increases dehydration, oligohydramnios, and preterm uterine irritability; monsoon conditions elevate risks of gastroenteritis, waterborne pathogens (hepatitis E, typhoid), and vector-borne infections (malaria, dengue); cold dry winters exacerbate maternal hypertension.",
            "samprapti_yukti": "In Grishma, Pitta and Vata accumulate; cooling Sheeta-Madhura-Drava Ahara prevents dehydration and preserves amniotic volume. In Varsha, Vata aggravates due to dampness; warm, easily digestible Deepana food protects Mandagni.",
            "red_flags": ["Heat stroke symptoms (hyperthermia, dizziness, oliguria in summer)", "Severe vomiting with high fever in monsoon (viral or bacterial gastroenteritis)", "Sudden surge in blood pressure during winter months"],
            "related_questions": [
                "Adana Kala aur Visarga Kala ka garbhini ke sharir par kya prabhav padta hai?",
                "Grishma aur Varsha Ritu me pregnancy diet me kya badlaav karne chahiye?",
                "DC Dutta me maternal dehydration aur amniotic fluid level (AFI) par mausam ka kya asar hota hai?"
            ],
            "keywords": ["charaka", "ritucharya", "tasyashitiya", "adana kala", "visarga kala", "seasons", "weather"]
        },
        {
            "id": "charaka_sutra_7_adharniya_vega",
            "samhita": "charaka",
            "sthana": "Sutra Sthana",
            "chapter": 7,
            "chapter_name": "Na Vegan Dharaniyet Adhyaya",
            "verse": "7/3-5",
            "domain": "garbhini",
            "stage": "garbhopaghatakara",
            "month": None,
            "ritu": None,
            "title": "Charaka Samhita — Non-Suppression of Natural Urges (Adharaniya Vegas)",
            "citation": "Charaka Samhita, Sharira Sthana 8/21 & Sutra Sthana 7/3-5",
            "sanskrit_shloka": "न वेगान् धारयेद्धीमांस्तान् हि धारयतः पृथक्। दोषाः प्रकुपिताः कुर्युर्विकारान् विविधान् बहून्॥ गर्भिण्या विशेषतो वेगधारणं गर्भोपघातकरम्।",
            "transliteration": "na vegān dhārayeddhīmāṁstān hi dhārayataḥ pṛthak | doṣāḥ prakupitāḥ kuryurvikārān vividhān bahūn || garbhiṇyā viśeṣato vegadhāraṇaṁ garbhopaghātakaram |",
            "hindi_meaning": "बुद्धिमान व्यक्ति को 13 अधारणीय वेगों (मल, मूत्र, अपानवायु, छर्दि, क्षुधा, तृष्णा, निद्रा आदि) को कभी नहीं रोकना चाहिए। गर्भिणी द्वारा वेगों को धारण करने से अपान और प्राण वायु प्रकुपित होकर गर्भाशय में शूल, आक्षेप, गर्भास्राव या गर्भपात उत्पन्न कर सकते हैं।",
            "english_clinical_summary": "Charaka strongly condemns suppressing the thirteen natural biological urges (Adharaniya Vegas) including micturition, defecation, flatus, hunger, thirst, sleep, and vomiting. In pregnancy, voluntary suppression of urges is explicitly categorized as Garbhopaghatakara (harmful to pregnancy): holding urine or stool provokes Apana Vata, which moves upward (Udvrita), leading to pelvic pain, tenesmus, uterine irritability, and even threatened abortion.",
            "dc_dutta_correlation": "DC Dutta Ch. 18 & 21: Voluntary urinary retention in pregnancy exacerbates urinary stasis caused by progesterone-mediated ureteral dilation, predisposing to acute pyelonephritis and asymptomatic bacteriuria. Severe constipation and chronic straining elevate intra-abdominal pressure and can induce premature contractions.",
            "samprapti_yukti": "Apana Vata natural direction is Adhogati. Suppressing Mutra or Purisha causes Pratiloma Vata, transmitting retrograde hydrostatic stress to the uterine walls.",
            "red_flags": ["Severe dysuria with high fever, chills, and flank pain (Acute Pyelonephritis)", "Inability to pass flatus or stool with abdominal distension (Intestinal Obstruction)", "Severe uterine cramping following bouts of constipation"],
            "related_questions": [
                "Garbhini dwara veg dharan karne se konse garbhopaghatakara upadrava hote hain?",
                "Pregnancy me urinary retention se UTI aur preterm labor ka kya relation hai?",
                "DC Dutta me asymptomatic bacteriuria screening kyu mandatory hai?"
            ],
            "keywords": ["charaka", "adharaniya vega", "urges", "retention", "apana vata", "garbhopaghatakara"]
        },

        # =====================================================================
        # SUSHRUTA SAMHITA EXPANSION
        # =====================================================================
        {
            "id": "sushruta_sha_2_shukra_shonita",
            "samhita": "sushruta",
            "sthana": "Sharira Sthana",
            "chapter": 2,
            "chapter_name": "Shukra Shonita Shuddhi Shariram",
            "verse": "2/25-33",
            "domain": "garbhini",
            "stage": "garbha_vriddhi",
            "month": None,
            "ritu": None,
            "title": "Sushruta Samhita — Ritumati Paricharya & Garbhadhana Protocol",
            "citation": "Sushruta Samhita, Sharira Sthana 2/25-33",
            "sanskrit_shloka": "ऋतौ तु प्रथमे दिवसे गर्भाशयो विशुद्ध्यति। ततः प्रभृति त्रिरात्रं गर्भिणीवदासीत, ब्रह्मचारिणी, अक्रोधना, हविष्यं भुञ्जाना॥",
            "transliteration": "ṛtau tu prathame divase garbhāśayo viśuddhyati | tataḥ prabhṛti trirātraṁ garbhiṇīvadāsīta, brahmacāriṇī, akrodhanā, haviṣyaṁ bhuñjānā ||",
            "hindi_meaning": "ऋतुकाल (माहवारी) के प्रथम दिवस से गर्भाशय का शोधन होता है। प्रथम तीन दिन स्त्री को ब्रह्मचारिणी रहकर, क्रोध त्यागकर, हल्का हविष्य अन्न (दलिया/दूध-चावल) ग्रहण करना चाहिए तथा दिन में सोने और परिश्रम से बचना चाहिए, ताकि गर्भाशय की ग्रहण शक्ति उत्तम रहे।",
            "english_clinical_summary": "Sushruta delineates the clinical regimen for the fertile menstrual phase (Ritumati Paricharya). During the initial three days of menstruation, the endometrial lining sheds and purifies itself. The woman should consume light, nourishing Haviṣya food, avoid physical exertion and emotional stress, maintain pelvic hygiene, and preserve somatic tranquility to prepare the endometrium for blastocyst implantation.",
            "dc_dutta_correlation": "DC Dutta Ch. 3 & 7: Corresponds to the menstrual phase (days 1-4) and early follicular phase of the uterine cycle. Gentle rest, iron-rich diet, and prevention of pelvic inflammatory infections safeguard tubal patency and ovarian follicular maturation.",
            "samprapti_yukti": "Artava discharge is governed by Apana Vata. Mental serenity and light diet prevent Vata-Pitta Dushti in the Artavavaha Srotas.",
            "red_flags": ["Menorrhagia soaking >1 pad every 2 hours with large clots", "Severe acute pelvic pain suggesting pelvic inflammatory disease (PID) or ruptured endometrioma"],
            "related_questions": [
                "Sushruta ke anusaar Ritumati paricharya ka garbhadhana par kya prabhav padta hai?",
                "Menstrual phase me heavy exertion se uterine health par kya nuksan hota hai?",
                "DC Dutta me proliferative phase aur follicular development ke key hormones kya hain?"
            ],
            "keywords": ["sushruta", "ritumati", "garbhadhana", "shukra shonita", "endometrium", "conception"]
        },
        {
            "id": "sushruta_sha_3_kalala_embryo",
            "samhita": "sushruta",
            "sthana": "Sharira Sthana",
            "chapter": 3,
            "chapter_name": "Garbhavakranti Shariram",
            "verse": "3/1-8",
            "domain": "garbhini",
            "stage": "garbha_vriddhi",
            "month": 1,
            "ritu": None,
            "title": "Sushruta Samhita — Kalala, Budbuda & Five Primordia (Panchapindaka)",
            "citation": "Sushruta Samhita, Sharira Sthana 3/1-8",
            "sanskrit_shloka": "तत्र प्रथमे मासि कललं जायते; द्वितीये शीतोष्णेन पवनेनाभिपच्यमानानां महाभूतानां संघातः पिण्डः पेश्यर्बुदं वा भवति; तृतीये हस्तपादशिरसां पञ्च पिण्डका निर्वर्तन्ते॥",
            "transliteration": "tatra prathame māsi kalalaṁ jāyate; dvitīye śītoṣṇena pavanenābhipacyamānānāṁ mahābhūtānāṁ saṁghātaḥ piṇḍaḥ peśyarbudaṁ vā bhavati; tṛtīye hastapādaśirasāṁ pañca piṇḍakā nirvartante ||",
            "hindi_meaning": "प्रथम मास में गर्भ कलल (jelly-like blastocyst) रूप में रहता है। द्वितीय मास में शीतोष्ण वायु द्वारा महाभूतों का संहनन होकर पिण्ड (पुरुष), पेशी (स्त्री) या अर्बुद रूप धारण करता है। तृतीय मास में दोनों हाथ, दोनों पैर और सिर—ये पांच पिण्डक (Panchapindaka) स्पष्ट रूप से विकसित होते हैं।",
            "english_clinical_summary": "Sushruta describes early surgical-grade embryogenesis: In month 1, the conceptus exists as delicate Kalala (amorphous morula/blastocyst). In month 2, under the bio-catalytic action of Agni and Vayu, the cellular mass condenses into Pinda, Peshi, or Arbuda. In month 3, organ differentiation produces the 'Panchapindaka'—the five structural bud primordia representing the cephalic pole and the four limb buds.",
            "dc_dutta_correlation": "DC Dutta Ch. 4 (Embryology Weeks 4-12): Matches Carnegie stages 10-18: Limb buds appear at week 4-5; by week 8 (end of embryonic period), crown-rump length is ~30 mm, fingers and toes are separated, facial features are recognizable, and early ossification begins.",
            "samprapti_yukti": "Panchamahabhuta division is executed by Vayu (Vibhajanat). Sheeta-Madhura herbs in months 1-3 shield the embryonic cell mass from Pittaja Pitta-vidaha (teratogenic thermal stress).",
            "red_flags": ["Early vaginal spotting with falling serum beta-hCG titers", "Absent fetal pole on transvaginal ultrasound at 7 weeks (Anembryonic pregnancy / Blighted ovum)"],
            "related_questions": [
                "Sushruta ke anusaar 1st se 3rd month tak Garbha Vriddhi ke stages kya hain?",
                "Panchapindaka ka modern limb bud development se kya correlation hai?",
                "DC Dutta me early dating scan (TVS) me gestational sac aur fetal pole kab dikhta hai?"
            ],
            "keywords": ["sushruta", "kalala", "budbuda", "panchapindaka", "embryo", "organogenesis", "limb buds"]
        },
        {
            "id": "sushruta_sha_4_nabhi_nadi",
            "samhita": "sushruta",
            "sthana": "Sharira Sthana",
            "chapter": 4,
            "chapter_name": "Garbha Vyakarana Shariram",
            "verse": "4/56-58",
            "domain": "garbhini",
            "stage": "garbha_vriddhi",
            "month": None,
            "ritu": None,
            "title": "Sushruta Samhita — Fetal Hemodynamics & Nabhi Nadi (Umbilical Circulation)",
            "citation": "Sushruta Samhita, Sharira Sthana 4/56-58",
            "sanskrit_shloka": "मातुस्तु खलु रसवहाया नाड्या गर्भनाभिनाडी संबद्धा, सा तस्य मातुरुपस्नेहेनाप्याययति। यथा कुल्योदकेन केदारमाप्यायते तथा॥",
            "transliteration": "mātustu khalu rasavahāyā nāḍyā garbhanābhināḍī saṁbaddhā, sā tasya mātūrapasnehenāpyāyayati | yathā kulyodakena kedāramāpyāyate tathā ||",
            "hindi_meaning": "माता की रसवाही नाड़ियों से गर्भ की नाभि-नाड़ी (umbilical cord) जुड़ी होती है। जैसे नहर के जल से धान का खेत सींचा जाता है, ठीक उसी प्रकार माता के रसधातु के उपस्नेह (diffusion) और उपस्वेद द्वारा गर्भ का निरंतर पोषण और संवर्धन होता है।",
            "english_clinical_summary": "Sushruta details the hemodynamic connection between mother and fetus: the maternal uterine arteries and intervillous spaces connect functional nutrient streams to the fetal umbilical cord (Garbha Nabhi Nadi). Through the biological mechanisms of Upasneha (trans-placental micro-diffusion) and Upasveda (osmotic perfusion), maternal nutrients directly nourish every fetal Dhatu without direct maternal-fetal vessel continuity, exactly like irrigation water nourishing field crops.",
            "dc_dutta_correlation": "DC Dutta Ch. 4 (Placental Circulation): Uteroplacental circulation consists of ~120 spiral arteries discharging maternal blood directly into the intervillous space at low pressure. Gas, nutrient, and waste exchange occurs across the syncytiotrophoblast placental barrier into the umbilical vein.",
            "samprapti_yukti": "Rasa Dhatu enriched with Prana and Ojas traverses through the Nabhi Nadi. Maternal anemia (Pandu) impairs the oxygen carrying capacity of Rasa-Rakta, starving the fetal tissues.",
            "red_flags": ["Abnormal umbilical artery Doppler (absent or reversed end-diastolic flow - AREDF)", "Severe maternal pallor with Hb < 7 g/dL (Severe Gestational Anemia)", "Fetal growth deceleration lagging >2 weeks behind gestational age"],
            "related_questions": [
                "Sushruta ne Nabhi Nadi aur Upasneha ka varnan kaise kiya hai?",
                "DC Dutta me placental exchange aur umbilical artery Doppler ka kya clinical significance hai?",
                "Maternal anemia (Pandu) ka baby ke birth weight par kya asar padta hai?"
            ],
            "keywords": ["sushruta", "nabhi nadi", "umbilical cord", "placenta", "circulation", "upasneha", "doppler"]
        },
        {
            "id": "sushruta_nidana_8_mudhagarbha",
            "samhita": "sushruta",
            "sthana": "Nidana Sthana",
            "chapter": 8,
            "chapter_name": "Mudha Garbha Nidanam",
            "verse": "8/1-12",
            "domain": "prasava",
            "stage": "prasava",
            "month": None,
            "ritu": None,
            "title": "Sushruta Samhita — Mudha Garbha Nidana (Obstructed Labor & Malpresentations)",
            "citation": "Sushruta Samhita, Nidana Sthana 8/1-12",
            "sanskrit_shloka": "यदा तु गर्भो वायुना प्रतिहतगतिः तिर्यक् सङ्गतो वा विवृत्तशिरा वा द्वारं रुणद्धि, स मूढगर्भ इत्युच्यते। कीलकः प्रतिखुरो बीजः परिघश्चेति चतुर्विधः॥",
            "transliteration": "yadā tu garbho vāyunā pratihatagatiḥ tiryak saṅgato vā vivṛttaśirā vā dvāraṁ ruṇaddhi, sa mūḍhagarbha ityucyate | kīlakaḥ pratikhuro bījaḥ parighaśceti caturvidhaḥ ||",
            "hindi_meaning": "जब प्रकुपित अपान वायु के कारण गर्भ की स्वाभाविक अधोगति अवरुद्ध हो जाती है और वह तिरछा, उल्टे सिर या हाथ-पैर फैलाकर गर्भाशय मुख को अवरुद्ध कर देता है, तो उसे 'मूढगर्भ' (obstructed labor / dystocia) कहते हैं। इसके मुख्य प्रकार हैं: कीलक, प्रतिखुर, बीज और परिघ।",
            "english_clinical_summary": "Sushruta's foundational treatise on obstetric dystocia: When Apana Vata becomes pathologically deranged or mechanical cephalopelvic disproportion (CPD) exists, the fetal axis becomes deflected into abnormal presentations (transverse lie, brow, shoulder presentation, compound presentation). He classifies the four classical presentations of Mudha Garbha: Kilaka (impacted longitudinal presentation), Pratikhura (compound presentation with hands and feet prolapsing), Bija (transverse shoulder presentation), and Parigha (transverse lie obstructing pelvic inlet like a crossbar).",
            "dc_dutta_correlation": "DC Dutta Ch. 24 & 25 (Malposition, Malpresentation & Obstructed Labor): Transverse lie, breech presentation, shoulder dystocia, and cephalopelvic disproportion. Maternal exhaustion, uterine rupture risk (Bandl's retraction ring), and fetal hypoxia mandate immediate emergency operative delivery (Cesarean section).",
            "samprapti_yukti": "Deranged Apana Vata causes dyssynergic uterine contractions, preventing normal cervical dilatation and head flexion.",
            "red_flags": ["Pathological retraction ring of Bandl visible on maternal abdomen", "Fetal bradycardia (<110 bpm) or variable/late decelerations", "Maternal dehydration, rising pulse >110 bpm, and tender lower uterine segment"],
            "related_questions": [
                "Sushruta ne Mudha Garbha ke konse 4 mukhya prakar bataye hain?",
                "Obstructed labor me Bandl's ring aur uterine rupture ke kya sanket hote hain?",
                "DC Dutta ke anusaar shoulder dystocia aur cephalopelvic disproportion ka modern management kya hai?"
            ],
            "keywords": ["sushruta", "mudha garbha", "dystocia", "malpresentation", "obstructed labor", "bandl ring", "cesarean"]
        },
        {
            "id": "sushruta_chikitsa_17_stanaroga",
            "samhita": "sushruta",
            "sthana": "Chikitsa Sthana",
            "chapter": 17,
            "chapter_name": "Visarpa-Stanaroga Chikitsitam",
            "verse": "17/1-14",
            "domain": "sutika",
            "stage": "sutika",
            "month": None,
            "ritu": None,
            "title": "Sushruta Samhita — Puerperal Mastitis & Stanavidradhi (Breast Abscess)",
            "citation": "Sushruta Samhita, Chikitsa Sthana 17/1-14",
            "sanskrit_shloka": "क्षीरदोषात् स्तने गाढे दुष्टे रक्तेऽनिलान्विते। जायते स्तनकीलस्तु विद्रधिर्वा भवेत्ततः। पक्वे पाटनमेवेष्टं स्तनसंरक्षणं यथा॥",
            "transliteration": "kṣīradoṣāt stane gāḍhe duṣṭe rakte'nilānvite | jāyate stanakīlastu vidradhirvā bhavettataḥ | pakve pāṭanameveṣṭaṁ stanasaṁrakṣaṇaṁ yathā ||",
            "hindi_meaning": "स्तन में दूध का जमाव (milk stasis) होने तथा दूषित रक्त व वायु के प्रकुपित होने से स्तनकील (breast engorgement) और बाद में स्तनाविवद्रधि (breast abscess) उत्पन्न होती है। पक्व अवस्था में स्तन नलिकाओं (lactiferous ducts) की सुरक्षा करते हुए अरीय चीरा (radial incision) लगाकर पूय (pus) निकालना आवश्यक है।",
            "english_clinical_summary": "Sushruta documents the surgical pathology of puerperal breast diseases: milk engorgement (Stanakila) progressing to acute mastitis and deep breast abscess (Stanavidradhi). He establishes the fundamental surgical maxim that any incision on the lactating breast must be strictly radial (Arīya Chhedana), following the natural trajectory of lactiferous ducts to avoid ductal transection, milk fistulae, and glandular necrosis.",
            "dc_dutta_correlation": "DC Dutta Ch. 29 (Puerperal Disorders — Breast Complications): Acute mastitis (usually Staphylococcus aureus from neonatal nasopharynx) starts with engorgement and cracked nipple; if untreated within 48 hours, it forms a fluctuant breast abscess requiring ultrasound-guided aspiration or surgical drainage via radial incision under general anesthesia.",
            "samprapti_yukti": "Stanyarodha (milk stasis) causes Rakta and Pitta vitiation. Continued breastfeeding or expression from the unaffected breast prevents bilateral engorgement.",
            "red_flags": ["Fluctuant, extremely tender, erythematous breast mass with high spiking fever (>102°F) and rigors", "Purulent drainage from nipple", "Cracked bleeding nipples with severe agony during infant latching"],
            "related_questions": [
                "Sushruta ke anusaar Stanavidradhi me incision lagane ka kya niyam hai?",
                "Puerperal mastitis aur breast abscess me breast feeding continue karni chahiye ya nahi?",
                "DC Dutta me breast engorgement aur cracked nipple ka first-line treatment kya hai?"
            ],
            "keywords": ["sushruta", "stanaroga", "mastitis", "breast abscess", "lactation", "engorgement", "incision"]
        },

        # =====================================================================
        # ASHTANGA HRIDAYA EXPANSION
        # =====================================================================
        {
            "id": "ashtanga_sha_1_masanumasika",
            "samhita": "ashtanga",
            "sthana": "Sharira Sthana",
            "chapter": 1,
            "chapter_name": "Garbhadhana Vidhi",
            "verse": "1/47-52",
            "domain": "garbhini",
            "stage": "masanumasika",
            "month": None,
            "ritu": None,
            "title": "Ashtanga Hridaya — Classical Masanumasika Principles & Milk Regimen",
            "citation": "Ashtanga Hridaya, Sharira Sthana 1/47-52",
            "sanskrit_shloka": "मासे प्रथमे मधुरशीतं च पयः पिबेत्। द्वितीये मधुरासिद्धम्। तृतीये मधुसर्पिर्भ्याम्। चतुर्थे नवनीतेन। पञ्चमे सर्पिषा युतम्। षष्ठे गोक्षुरसिद्धेन। सप्तमे पृथक्पर्ण्यादिना। अष्टमे यवागूं सर्पिष्मतीम्। नवमेऽनुवासनपिचुक्रियाम्॥",
            "transliteration": "māse prathame madhuraśītaṁ ca payaḥ pibet | dvitīye madhurāsiddham | tṛtīye madhusarpirbhyām | caturthe navanītena | pañcame sarpiṣā yutam | ṣaṣṭhe gokṣurasiddhena | saptame pṛthakparṇyādinā | aṣṭame yavāgūṁ sarpiṣmatīm | navame'nuvāsanapicukriyām ||",
            "hindi_meaning": "वाग्भट ने अष्टाङ्ग हृदय में नौ महीनों के लिए सरल एवं स्पष्ट क्षीर परिचर्या का विधान किया है: प्रथम मास शीतल मधुर दूध; द्वितीय मास मधुर गण सिद्ध दूध; तृतीय मास मधु व घृत युक्त; चतुर्थ मास मक्खन (नवनीत); पञ्चम मास घृत युक्त; षष्ठ मास गोक्षुर सिद्ध घृत/दूध (शोथ नाशक); सप्तम मास पृथक्पर्ण्यादि सिद्ध; अष्टम मास घृतयुक्त क्षीर-यवागु; और नवम मास में अनुवासन बस्ति तथा योनि पिचु।",
            "english_clinical_summary": "Acharya Vagbhata condenses the essential Masanumasika Paricharya into a sequential medicated milk and lipid protocol: Month 1 cold sweet milk; Month 2 Madhura Gana medicated milk; Month 3 milk with honey and ghee (unequal); Month 4 milk with fresh butter (Navanita); Month 5 milk with cow's ghee; Month 6 Gokshura-medicated ghee/milk (diuretic protection against pedal edema); Month 7 Prithakparnyadi-medicated ghee; Month 8 Ksheera-Yavagu with ghee; Month 9 Anuvasana Basti and Bala Taila Yoni Pichu.",
            "dc_dutta_correlation": "DC Dutta Ch. 9 & 10 (Maternal Nutrition & ANC Care): Matches progressive calcium (1200 mg/day), essential fatty acids (DHA/EPA for fetal neurodevelopment), and fluid intake through the three trimesters, culminating in cervical preparation in late pregnancy.",
            "samprapti_yukti": "Cow's milk (Godugdha) has ten properties identical to Ojas (Oja-Samana Gunas). It directly fortifies Rasa Dhatu, supports placental transfer, and prevents maternal osteopenia and dehydration.",
            "red_flags": ["Sudden excessive weight gain (>1 kg/week in 2nd/3rd trimester)", "Generalized edema involving hands and face", "Severe epigastric pain radiating to back"],
            "related_questions": [
                "Ashtanga Hridaya me bataye gaye 1st se 9th month ke milk formulas kya hain?",
                "6th month me Gokshura ksheerapaka kyu diya jaata hai?",
                "DC Dutta me calcium aur omega-3 fatty acids ka pregnancy me kya role hai?"
            ],
            "keywords": ["ashtanga", "masanumasika", "milk regimen", "vagbhata", "ghee", "gokshura", "paricharya"]
        },
        {
            "id": "ashtanga_sha_2_garbha_vyapad",
            "samhita": "ashtanga",
            "sthana": "Sharira Sthana",
            "chapter": 2,
            "chapter_name": "Garbha Vyapad Adhyaya",
            "verse": "2/1-15",
            "domain": "garbhini",
            "stage": "upadrava",
            "month": None,
            "ritu": None,
            "title": "Ashtanga Hridaya — Garbhasrava, Garbhapata, Upavishtaka & Nagodara",
            "citation": "Ashtanga Hridaya, Sharira Sthana 2/1-15",
            "sanskrit_shloka": "चतुर्थाभ्यन्तरे मासि स्रावः स्याद् गर्भसंप्लवात्। पञ्चमे षष्ठे तु पातः प्रपद्यते। उपविष्टको वातोपद्रुते रसे भवति, नागोदरोऽपि वा॥",
            "transliteration": "caturthābhyantare māsi srāvaḥ syād garbhasaṁplavāt | pañcame ṣaṣṭhe tu pātaḥ prapadyate | upaviṣṭako vātopadrute rase bhavati, nāgodaro'pi vā ||",
            "hindi_meaning": "चौथे महीने तक जब गर्भ तरल रूप में स्रवित होता है, तो उसे 'गर्भस्राव' (miscarriage) कहते हैं; पांचवें या छठे महीने में जब अंग-प्रत्यंग युक्त गर्भ निष्कासित होता है, तो उसे 'गर्भपात' (abortion/immature delivery) कहते हैं। वात के कारण जब माता का रसधातु सूख जाता है और गर्भ की वृद्धि रुक जाती है, तो उसे 'उपविष्टक' (IUGR) और उदर का न बढ़ना 'नागोदर' कहलाता है।",
            "english_clinical_summary": "Vagbhata provides precise definitions of gestational loss and fetal growth disorders: Loss up to the 4th month is designated Garbhasrava (early spontaneous miscarriage where the conceptus is unformed and liquefied); loss in the 5th and 6th months is designated Garbhapata (fetal expulsion with formed limbs and solid organs). Upavishtaka represents fetal growth faltering due to maternal bleeding or depleted Rasa Dhatu (intrauterine growth restriction); Nagodara represents delayed abdominal enlargement with prolonged quiescent gestation.",
            "dc_dutta_correlation": "DC Dutta Ch. 15 (Abortion / Miscarriage) & Ch. 31 (Intrauterine Growth Restriction): Miscarriage is defined as termination of pregnancy before 20-24 weeks. IUGR (fetal weight below 10th percentile for gestational age) is classified into symmetrical (early genetic/infection) and asymmetrical (late uteroplacental insufficiency).",
            "samprapti_yukti": "Vata vitiation dries up the Rasa Dhatu streams flowing to the fetus, causing Upavishtaka. Madhura-Brimhana Dravyas, milk, and rest in left lateral position restore placental perfusion.",
            "red_flags": ["Fresh red bleeding per vaginam with uterine cramping", "Fundal height lagging >3 cm behind gestational dates", "Loss of fetal movements for >12 consecutive hours"],
            "related_questions": [
                "Garbhasrava aur Garbhapata me kya antar hai?",
                "Upavishtaka aur Nagodara ka modern IUGR se kya sambandh hai?",
                "DC Dutta me threatened abortion aur incomplete abortion ka clinical differentiation kya hai?"
            ],
            "keywords": ["ashtanga", "garbhasrava", "garbhapata", "upavishtaka", "nagodara", "miscarriage", "iugr"]
        },
        {
            "id": "ashtanga_uttara_1_balopacharaniya",
            "samhita": "ashtanga",
            "sthana": "Uttara Tantra",
            "chapter": 1,
            "chapter_name": "Balopacharaniya Adhyaya",
            "verse": "1/1-18",
            "domain": "navajata",
            "stage": "navajata",
            "month": None,
            "ritu": None,
            "title": "Ashtanga Hridaya — Immediate Care of the Newborn & Stanyapana Rules",
            "citation": "Ashtanga Hridaya, Uttara Tantra 1/1-18",
            "sanskrit_shloka": "अथातुरमुल्वात् परिमार्ज्य सैन्धवसर्पिषा। प्राणानागतं तावद्विधूनयेत्। नाभिं बध्नीयात्। ततो दक्षिणेन स्तनाग्रं प्रक्षाल्य पाययेत्॥",
            "transliteration": "athāturamulvāt parimārjya saindhavasarpiṣā | prāṇānāgataṁ tāvadvidhūnayet | nābhiṁ badhnīyāt | tato dakṣiṇena stanāgraṁ prakṣālya pāyayet ||",
            "hindi_meaning": "जन्म के तुरंत बाद नवजात शिशु के मुख और तालु से उल्ब का परिमार्जन सैन्धव और घृत से करें। जब तक श्वास भलीभांति न आए, तब तक पंखे से हवा देकर व स्पर्श से प्राण प्रत्यागमन करें। नाभि को सूत्र से बांधकर काटें। माता के दाहिने स्तन को प्रक्षालित कर शिशु को तत्काल प्रथम दुग्ध (कोलोस्ट्रम/पीयूष) का पान कराएं।",
            "english_clinical_summary": "Vagbhata's step-by-step neonatal resuscitation and care: Gentle clearance of airway secretions using rock salt and ghee, physical thermal stimulation until regular spontaneous crying occurs, sterile umbilical cord ligation, and washing the maternal nipple followed by immediate initiation of breastfeeding from the right breast. Colostrum (Piyusha) is treated as indispensable for infant longevity and immunity.",
            "dc_dutta_correlation": "DC Dutta Ch. 38 (Care of the Newborn): Highlights immediate initiation of exclusive breastfeeding within 1 hour of birth. Colostrum is rich in secretory IgA antibodies, lactoferrin, and maternal leukocytes, providing critical mucosal immunity against neonatal sepsis, necrotizing enterocolitis, and hypothermia.",
            "samprapti_yukti": "Colostrum rekindles infant Jatharagni (Dipana) and acts as mild purgative to clear meconium from the newborn intestines.",
            "red_flags": ["Newborn inability to suckle or maintain latch", "Hypothermia (axillary temperature <36.5°C)", "Jaundice appearing within the first 24 hours of life (Pathological Jaundice)"],
            "related_questions": [
                "Navajata shishu ke liye colostrum (peeyush) kyu anivarya mana gaya hai?",
                "Ashtanga Hridaya me umbilical cord cutting aur ligation ka kya protocol diya gaya hai?",
                "DC Dutta me early initiation of breastfeeding ke maternal aur neonatal benefits kya hain?"
            ],
            "keywords": ["ashtanga", "balopacharaniya", "newborn", "colostrum", "stanyapana", "breastfeeding", "resuscitation"]
        },

        # =====================================================================
        # KASHYAPA SAMHITA EXPANSION
        # =====================================================================
        {
            "id": "kashyapa_sutra_lehadhyaya_swarna",
            "samhita": "kashyapa",
            "sthana": "Sutra Sthana",
            "chapter": "Lehanadhyaya",
            "chapter_name": "Lehanadhyaya",
            "verse": "Sutra. Lehana/3-8",
            "domain": "navajata",
            "stage": "navajata",
            "month": None,
            "ritu": None,
            "title": "Kashyapa Samhita — Swarna Prashana Protocol for Pediatric Vitality",
            "citation": "Kashyapa Samhita, Sutra Sthana, Lehanadhyaya",
            "sanskrit_shloka": "सुवर्णं मधुसर्पिर्भ्यां लेहयेत् कनकशिशुम्। मेधाग्निबलवर्धनम्, आयुष्यं मङ्गलं पुण्यं ग्रहापहम्। मासात् परममेधावी व्याधिभिर्न च धृष्यते॥",
            "transliteration": "suvarṇaṁ madhusarpirbhyāṁ lehaye kanakaśiśum | medhāgnibalavardhanam, āyuṣyaṁ maṅgalaṁ puṇyaṁ grahāpaham | māsāt paramamedhāvī vyādhibhirna ca dhṛṣyate ||",
            "hindi_meaning": "महर्षि कश्यप (कौमारभृत्य के मूर्धन्य आचार्य) के अनुसार नवजात शिशु को शुद्ध सुवर्ण भस्म को मधु और घृत (विषम मात्रा) के साथ घिसकर चटाना चाहिए। यह सुवर्णप्राशन शिशु की मेधा (बुद्धि), अग्नि (पाचन), बल और आयु की वृद्धि करता है, तथा रोगों और संक्रामक व्याधियों से रक्षा करता है।",
            "english_clinical_summary": "Acharya Kashyapa (the patron authority of Kaumarabhritya / Pediatrics) institutes the classical protocol of Swarna Prashana: micro-quantities of purified, calcined gold (Swarna Bhasma) triturated with unpasteurized honey and aged cow's ghee in unequal ratios. Administered daily, it enhances cognitive faculties (Medha), digestive and metabolic fire (Agni), physical stamina (Bala), somatic longevity (Ayushya), and non-specific immunomodulatory resistance against pediatric infections.",
            "dc_dutta_correlation": "DC Dutta Ch. 38 & Nelson Pediatrics: Corresponds to infant immunomodulation and neurodevelopmental stimulation. Safe complementary pediatric interventions support innate immune priming, enzymatic activation, and trace mineral assimilation during the critical first 1,000 days of life.",
            "samprapti_yukti": "Gold calx is non-toxic, biocompatible, and acts directly on the Ojas and Majja Dhatu, enhancing synaptic neuroplasticity and systemic immune homeostasis.",
            "red_flags": ["Administration of raw or unpurified heavy metals (must only be standard Ayurvedic pharmacopoeia Swarna Bhasma)", "Infant with neonatal hyperbilirubinemia or sepsis requiring active NICU management"],
            "related_questions": [
                "Kashyapa Samhita ke anusaar Swarna Prashana kab aur kaise karwaya jaata hai?",
                "Swarna Prashana ke Medha aur Bala vardhaka prabhav kya hain?",
                "Modern science me infant immunomodulation aur neonatal neurodevelopment par kya research hai?"
            ],
            "keywords": ["kashyapa", "swarna prashana", "lehanadhyaya", "pediatrics", "immunity", "cognition", "kaumarabhritya"]
        },
        {
            "id": "kashyapa_sutra_stanya_nirdesha",
            "samhita": "kashyapa",
            "sthana": "Sutra Sthana",
            "chapter": "Stanya Nirdesha",
            "chapter_name": "Stanya Nirdesha",
            "verse": "Sutra. Stanya/1-12",
            "domain": "sutika",
            "stage": "sutika",
            "month": None,
            "ritu": None,
            "title": "Kashyapa Samhita — Stanya Pariksha (Breast Milk Evaluation) & Galactagogues",
            "citation": "Kashyapa Samhita, Sutra Sthana, Stanya Nirdesha",
            "sanskrit_shloka": "यत् क्षीरमुदके क्षिप्तमेकीभवति पाण्डुरम्। मधुरं चाविवर्णं च तच्छुद्धमिति निर्दिशेत्। धात्र्यास्तु स्तन्यजननं शतावरीक्षीरपानम्॥",
            "transliteration": "yat kṣīramudake kṣiptamekībhavati pāṇḍuram | madhuraṁ cāvivarṇaṁ ca tacchuddhamiti nirdiśet | dhātryāstu stanyajananaṁ śatāvarīkṣīrapānam ||",
            "hindi_meaning": "कश्यप के अनुसार शुद्ध मातृदुग्ध की परीक्षा यह है कि जल में डालने पर वह तुरंत एकीभाव (घुल) हो जाता है, फेन या तंतु नहीं बनाता, श्वेत-पाण्डुर वर्ण, शीतल और मधुर रसयुक्त होता है। स्तनों में दूध की कमी (स्तन्यक्षय) होने पर शतावरी, विदारीकन्द, यष्टिमधु, लहसुन और क्षीर-यवागु का सेवन स्तन्यजनन (galactagogue) होता है।",
            "english_clinical_summary": "Kashyapa details the clinical diagnostic criteria for human breast milk purity (Stanya Pariksha): When dropped into clear water, wholesome breast milk dissolves homogeneously without floating on top (which indicates Vataja Dushti), discoloring yellow/red (Pittaja), or forming thick sinking phlegm (Kaphaja). In maternal hypogalactia (Stanyakshaya), he prescribes powerful herbal galactagogues (Stanyajanana Mahakashaya): Shatavari, Vidarikanda, Yashtimadhu, Garlic (Lashuna), and medicated cow's milk soups.",
            "dc_dutta_correlation": "DC Dutta Ch. 29 & WHO Infant Feeding Guidelines: Composition of mature human milk: 88% water, 7% lactose, 3.8% fat, and 0.9% protein with human milk oligosaccharides (HMOs). Adequate maternal hydration, frequent infant suckling stimulating prolactin and oxytocin let-down reflexes, and supportive galactagogues enhance lactation volume.",
            "samprapti_yukti": "Stanya is the Upadhatu of Rasa Dhatu. Soumanasya (maternal happiness) and adequate hydration directly trigger the reflex release of Stanya. Anxiety and anger provoke Vata and Pitta, arresting milk letdown.",
            "red_flags": ["Severe infant dehydration (depressed fontanelle, dry mucous membranes, <6 wet diapers in 24 hours)", "Total cessation of lactation accompanied by high postpartum fever (Sheehan syndrome / severe sepsis)"],
            "related_questions": [
                "Shuddha Stanya ki jal pariksha kaise ki jaati hai?",
                "Stanyajanana ke liye Kashyapa ne konse aushadh aur ahar bataye hain?",
                "DC Dutta me prolactin aur oxytocin let-down reflex ko stimulate karne ke kya niyam hain?"
            ],
            "keywords": ["kashyapa", "stanya", "breast milk", "galactagogue", "shatavari", "lactation", "let-down reflex"]
        },
        {
            "id": "kashyapa_khila_9_garbhini_upadrava",
            "samhita": "kashyapa",
            "sthana": "Khila Sthana",
            "chapter": 9,
            "chapter_name": "Garbhini Rogadhikar Adhyaya",
            "verse": "Khila. 9/3-20",
            "domain": "garbhini",
            "stage": "upadrava",
            "month": None,
            "ritu": None,
            "title": "Kashyapa Samhita — 8 Classical Garbhini Upadravas (Pregnancy Complications)",
            "citation": "Kashyapa Samhita, Khila Sthana Ch. 9/3-20",
            "sanskrit_shloka": "गर्भिण्या जायन्तेऽष्टौ विकारा दारुणा नृणाम्। छर्दिः शोफो ज्वरः कासो श्वासोऽतीसार एव च। पाण्डुश्च विबन्धश्चेति, तान् यत्नेन प्रसाधयेत्॥",
            "transliteration": "garbhiṇyā jāyante'ṣṭau vikārā dāruṇā nṛṇām | chardiḥ śopho jvaraḥ kāso śvāso'tīsāra eva ca | pāṇḍuśca vibandhaśceti, tān yatnena prasādhayet ||",
            "hindi_meaning": "महर्षि कश्यप ने गर्भिणी के आठ दारुण उपद्रवों (गम्भीर जटिलताओं) का वर्णन किया है: १. छर्दि (उल्टी/Nausea), २. शोथ (सूजन/Edema), ३. ज्वर (बुखार/Fever), ४. कास (खांसी/Cough), ५. श्वास (सांस फूलना/Dyspnea), ६. अतीसार (दस्त/Diarrhea), ७. पाण्डु (रक्तअल्पता/Anemia), और ८. विबन्ध (कब्ज/Constipation)। गर्भिणी में तीक्ष्ण शोधन व वमन विरेचन वर्जित होने से इनका मृदु व मधुर औषधियों से उपचार करना चाहिए।",
            "english_clinical_summary": "Acharya Kashyapa systematically enumerates the Eight Cardinal Upadravas (systemic complications) of pregnancy: Chhardi (hyperemesis), Shopha (gestational edema / preeclampsia), Jwara (pyrexia in pregnancy), Kasa (respiratory distress/cough), Shwasa (dyspnea/pulmonary compromise), Atisara (gestational gastroenteritis), Pandu (anemia in pregnancy), and Vibandha (severe chronic constipation). Because aggressive bio-cleansing (Panchakarma / Vamana / Virechana) is strictly contraindicated in pregnancy, all maternal complications must be managed with gentle, palliative, non-embryotoxic therapies.",
            "dc_dutta_correlation": "DC Dutta Ch. 17, 18, 19, 20 & 21: Direct correspondence to high-risk obstetric conditions: Hyperemesis gravidarum (Chhardi), Hypertensive disorders / Preeclampsia (Shopha), Pyrexia / Chorioamnionitis (Jwara), Anemia in pregnancy (Pandu), and Bowel dysmotility (Vibandha). Standard obstetric protocol requires early risk stratification and hospital referral.",
            "samprapti_yukti": "The growing fetus consumes maternal Rasa and Rakta while mechanically compressing abdominal viscera, weakening Jatharagni and provoking Vata. Aggressive purgatives trigger uterine hypertonicity.",
            "red_flags": ["Severe headache, blurring of vision, right upper quadrant pain (Impending Eclampsia)", "High fever with chills and uterine tenderness (Chorioamnionitis)", "Sudden explosive watery diarrhea causing maternal hypovolemia and fetal distress"],
            "related_questions": [
                "Kashyapa ke 8 Garbhini Upadrava konse hain aur unka clinical mahatva kya hai?",
                "Garbhini me teekshna panchakarma aur virechana kyu nishiddha mana gaya hai?",
                "DC Dutta me preeclampsia aur hyperemesis gravidarum ke modern diagnostic criteria kya hain?"
            ],
            "keywords": ["kashyapa", "upadrava", "8 complications", "chhardi", "shopha", "pandu", "vibandha", "preeclampsia"]
        },
        {
            "id": "kashyapa_khila_4_yusha_nirdesha",
            "samhita": "kashyapa",
            "sthana": "Khila Sthana",
            "chapter": 4,
            "chapter_name": "Yusha Nirdesha Adhyaya",
            "verse": "Khila. 4/1-15",
            "domain": "ahara_vihara",
            "stage": "ahara_vihara",
            "month": None,
            "ritu": None,
            "title": "Kashyapa Samhita — Medicated Yusha & Bhojya Kalpa for Maternal Digestion",
            "citation": "Kashyapa Samhita, Khila Sthana Ch. 4/1-15",
            "sanskrit_shloka": "यूषस्तु दीपनः पाची रोचनो धातुवर्धनः। मुद्गयूषः प्रशस्तोऽत्र दाडिमामलकैर्युतः। गर्भिण्या मन्दकायाग्नेर्बलकृत् क्लेदनाशनः॥",
            "transliteration": "yūṣastu dīpanaḥ pācī rocano dhātuvardhanaḥ | mudgayūṣaḥ praśasto'tra dāḍimāmalakairyutaḥ | garbhiṇyā mandakāyāgnerbalakṛt kledanāśanaḥ ||",
            "hindi_meaning": "कश्यप के अनुसार यूष (दालों का संस्कृत सूप) गर्भिणी की मन्दाग्नि को प्रदीप्त करने वाला, पाचन करने वाला, रुचिकर और धातुओं का पोषण करने वाला होता है। मूंग का यूष जिसमें अनार (दाडिम) और आंवला सिद्ध किया गया हो, गर्भिणी के लिए सर्वोत्तम है। यह बिना भारीपन किए बल देता है तथा शरीर के क्लेद को सुखाता है।",
            "english_clinical_summary": "Kashyapa formulates therapeutic medicated lentil broths (Yusha) and culinary recipes (Bhojya Kalpa) specifically customized for sluggish maternal digestive capacity (Mandagni). Green gram soup (Mudga Yusha) processed with pomegranate juice (Dadima Rasa), Amla, cumin (Jeeraka), and ghee provides easily assimilable plant protein, iron, and electrolytes, resolving pregnancy-associated nausea, anorexia, and digestive sluggishness without causing abdominal bloating.",
            "dc_dutta_correlation": "DC Dutta Ch. 9 (Maternal Nutrition): Recommends high-protein, easily digestible legumes, split pulses, and broths providing potassium, folate, and iron. Small frequent light liquid and semi-solid meals mitigate first-trimester nausea and late third-trimester gastric reflux.",
            "samprapti_yukti": "Mudga is Laghu, Vishada, and Kaphaghna. Combined with Dadima and Ghrita, it rekindles Pachaka Pitta while nourishing Rasa and Rakta Dhatus.",
            "red_flags": ["Severe food intolerance with ongoing weight loss", "Severe epigastric pain or persistent sour vomiting accompanied by hematemesis"],
            "related_questions": [
                "Kashyapa ke anusaar Mudga Yusha garbhini ke liye kyu labhadayak hai?",
                "Pregnancy me Mandagni aur anorexia (Aruchi) ko door karne ke Ayurvedic ahar kya hain?",
                "DC Dutta me maternal protein requirement aur micro-nutrient supplementation kya batayi gayi hai?"
            ],
            "keywords": ["kashyapa", "yusha", "bhojya kalpa", "mudga", "nutrition", "digestion", "mandagni", "protein"]
        }
    ]
    return recs


if __name__ == "__main__":
    build_expanded_corpus()
