/* =====================================================================
 * AyurGarbha — Knowledge Base (offline corpus)
 * Complete structured clinical data:
 *   9 months Garbhini Paricharya × 2 Core Samhitas (Charaka & Sushruta), Garbha Vriddhi,
 *   6 Ritus, Dinacharya, Garbhopaghatakara Bhavas, Red Flags,
 *   Sutika Paricharya, Navajata Shishu Paricharya, DC Dutta correlations.
 * Plain <script> (no modules) so index.html works from file://.
 * NOTE: Sanskrit lines are short, abridged excerpts for education. Verse
 * numbers differ across editions — verify against your critical edition.
 * ===================================================================== */
(function (global) {
  "use strict";

  const DISCLAIMER =
    "⚕️ Clinical Advisory: This guidance is for educational & wellness support based on Ayurvedic Samhitas and standard obstetric guidelines. Always consult your Doctor / BAMS Physician before starting any medicine, Basti, or dietary change.";

  const SAMHITAS = {
    charaka: { name: "Charaka Samhita", refs: "Sharira Sthana Ch. 4 (Mahati Garbhavakranti) & Ch. 8 (Jatisutriya)" },
    sushruta: { name: "Sushruta Samhita", refs: "Sharira Sthana Ch. 2, 3 (Garbhavyakarana) & 10 (Garbhini Vyakarana)" },
    dcdutta: { name: "DC Dutta's Textbook of Obstetrics", refs: "Modern obstetric correlation" },
  };

  /* ---------------- MONTHS 1-9: Garbha Vriddhi + Paricharya ---------------- */
  const MONTHS = [
    {
      n: 1, weeks: "1–4", trimester: 1, stage: "Kalala",
      fetal: "Samurchchhita (fertilised) Kalala — an unmanifest, jelly-like embryo (Khetabhuta, Avyakta-vigraha). Atma, Manas and the Panchamahabhuta join the Shukra-Shonita.",
      ksheera: { name: "Sheeta Ksheera (Anupaskrita)", detail: "Plain cow's milk, boiled then cooled, 150–200 ml in sips through the day as per Satmya. Not medicated, not heavy." },
      pathya: ["Sweet, cold & liquid-predominant diet (Madhura-Sheeta-Drava)", "Boiled-cooled milk, Laja-manda (puffed-rice water), coconut water", "Shashtika / old rice, moong soup, ghee in small amount", "Soaked raisins (Draksha) 5–6, dates 2, fennel-water", "Fresh seasonal fruit — pomegranate, sweet orange, banana", "Folic acid per doctor (400 mcg–5 mg)"],
      avoid: ["Fasting or long gaps between meals", "Spicy, sour, fried and fermented food", "Heavy lifting, long travel, jerky vehicles", "Coitus and hot-water full-body baths", "Papaya (raw), excess sesame, ajwain, fenugreek, pineapple"],
      rationale: "Early Kalala is delicate; cold-sweet-liquid food supports Rasa Dhatu and prevents Pitta-Vata aggravation and nausea, protecting implantation.",
      tip: "For morning nausea (Chhardi): Laja-manda with a little honey & elaichi, dry toast, small frequent meals.",
      dcdutta: { title: "Weeks 1–4 · Fertilisation, implantation & booking", text: "Fertilisation in the ampulla, implantation on day 6–7, hCG detectable ~8–10 days post-ovulation; UPT positive at missed period. Confirm pregnancy, calculate EDD (Naegele: LMP + 9 months + 7 days), start folic acid 400 mcg (5 mg in high-risk), book ANC early, avoid teratogens (alcohol, tobacco, unsupervised drugs, radiation)." },
      redFlags: ["Bleeding PV with lower-abdominal pain (threatened abortion / ectopic)", "Severe one-sided pelvic pain or shoulder-tip pain", "Persistent vomiting with inability to retain fluids"],
    },
    {
      n: 2, weeks: "5–8", trimester: 1, stage: "Pinda / Peshi / Arbuda (Ghana)",
      fetal: "Kalala condenses into a Ghana mass: Pinda (male tendency), Peshi (female) or Arbuda (napumsaka) per Charaka. Sushruta describes Panchapindaka — five buds (head, two arms, two legs).",
      ksheera: { name: "Madhura-aushadha Siddha Ksheera", detail: "Milk boiled with Madhura Gana herbs (Shatavari + Yashtimadhu, or Jivaniya drugs) — 150 ml at bedtime, only after physician approval." },
      pathya: ["Madhura Gana siddha milk (Shatavari-Yashtimadhu ksheerapaka)", "Rice-ghee, moong-khichdi, light vegetable soups", "Lajasaktu with sugar-candy, pomegranate juice", "Ginger-cardamom water in small sips for nausea", "Vitamin B6 / ginger as advised for Chhardi"],
      avoid: ["Katu-Tikshna-Ushna foods, excess tea/coffee (>200 mg caffeine/day)", "Day-time heavy sleep, night vigil", "Strenuous exercise and suppression of natural urges", "Self-prescribed herbs or purgatives"],
      rationale: "Madhura-Jivaniya drugs are Garbhasthapaka and Brimhana; they nourish the forming Pinda and settle Pitta that causes nausea and acidity.",
      tip: "Hyperemesis: pausing solid food 1 hour, sips of cool Laja-manda, Eladi churna with honey — seek care if ketosis or weight loss.",
      dcdutta: { title: "Weeks 5–8 · Embryonic period, organogenesis", text: "Neural tube closes by day 28, heart tube beats from ~6 weeks (visible on TVS), limb buds appear — peak teratogenic sensitivity. Early dating USG confirms viability and site. Hyperemesis gravidarum: IV fluids, antiemetics, thiamine, correction of electrolytes if ketonuria." },
      redFlags: ["Spotting / bleeding with passage of tissue", "Vomiting >5 times a day with weight loss or ketones", "Fever with rash (rubella, CMV, Zika risk)"],
    },
    {
      n: 3, weeks: "9–13", trimester: 1, stage: "Sarvanga-Indriya Abhivyakti",
      fetal: "All sense organs and body parts begin to manifest together (Charaka); Sushruta notes Hasta-Pada-Shiras differentiation. Fetal period begins.",
      ksheera: { name: "Ksheera with Madhu & Sarpi (Vishama matra)", detail: "Warm milk with honey and ghee in UNEQUAL quantity (e.g., 5 ml honey : 10 ml ghee). Equal quantity is Viruddha. Sushruta also adds Shashtika rice with milk." },
      pathya: ["Shashtika-shali rice with milk (Payasa) in small portion", "Moong dal khichdi with ghee, lauki, pumpkin", "Madhu-Sarpi in Vishama matra with milk", "Sweet fruits: dates, figs (Anjeer), grapes, sweet mango in season", "Iron- and protein-rich foods begin: green leafy vegetables, sprouts (cooked)"],
      avoid: ["Equal-quantity honey + ghee", "Excess salt, pickles, papad, hot masala", "Prolonged fasting, standing or travel", "Raw / half-cooked eggs, meat, unpasteurised dairy (Listeria risk)"],
      rationale: "Organs forming now need Brimhana (nourishing) Dhatu support; honey-ghee is Yogavahi and Sandhana, supporting tissue integrity.",
      tip: "Keep a snack every 2–3 hours: soaked almonds (4–5), dates, banana-milk.",
      dcdutta: { title: "Weeks 9–13 · End of the first trimester", text: "Fetal period starts at 9th week. NT scan at 11–13+6 weeks with double marker; baseline Hb, blood group & Rh, urine routine, VDRL, HIV, HBsAg, TSH, blood sugar. Td/Tdap schedule begins. Nausea usually settles by 14 weeks." },
      redFlags: ["Heavy bleeding or clots", "Burning micturition with fever (UTI)", "Severe pallor and breathlessness"],
    },
    {
      n: 4, weeks: "14–17", trimester: 2, stage: "Sthirata & Dauhrida",
      fetal: "Garbha attains Sthirata (stability); mother becomes heavier (Guru-gatra). Hridaya manifests — the Dauhrida state: the mother expresses the fetus's desires through her own cravings.",
      ksheera: { name: "Ksheera-Navanita", detail: "Fresh butter (Navanita) from milk, 10–15 g with warm milk or sugar; Sushruta: Shashtika with curd, milk and Jangala-mamsa rasa (or dal soup for vegetarians)." },
      pathya: ["Fresh unsalted butter 10–15 g with sugar", "Shashtika rice with dal, ghee, buttermilk at lunch (not at night)", "Fulfil safe, wholesome cravings (Dauhrida) — fruits, sweets in moderation", "Calcium-rich: milk, ragi, sesame-jaggery (small), paneer", "Iron-folate tablets as advised from 14–16 weeks"],
      avoid: ["Denying wholesome cravings (risk of Vata aggravation and mental distress per Charaka)", "Unsafe cravings — raw clay, ice, unwashed raw food", "Prolonged supine posture, tight clothes", "Strenuous trekking, jerky rides"],
      rationale: "As the fetal heart manifests, the mother's wishes are the fetus's wishes (Dauhridavastha). Respecting safe desires preserves Manas-prasada and avoids malformations attributed to Dauhrida-vimanana.",
      tip: "Begin gentle Garbha Sanskar: soothing music, mantra, positive reading 20 min daily.",
      dcdutta: { title: "Weeks 14–17 · Second trimester begins", text: "Fetal sex organs differentiate, lanugo appears, fundus midway between symphysis and umbilicus at 16 weeks. Start iron 100 mg elemental + folic acid 500 mcg, calcium 500 mg BD. Td dose 1/2, quad marker 15–20 weeks. Mother usually feels well — appetite improves." },
      redFlags: ["Watery leak PV (PPROM)", "Painless bleeding", "Severe headache with high BP (early pre-eclampsia is rare but possible)"],
    },
    {
      n: 5, weeks: "18–21", trimester: 2, stage: "Mamsa-Shonita Upachaya · Manas Pratibuddha",
      fetal: "Fetal muscle (Mamsa) and blood (Shonita) increase most; the mother becomes lean (Karshya). Manas is more awakened — fetal movements begin to be felt.",
      ksheera: { name: "Ksheera-Sarpi (Ghrita extracted from milk)", detail: "10–15 g ghee made from milk-cream, with warm milk at bedtime." },
      pathya: ["Ghee 10–15 g with rice/chapati", "Mamsa-vardhaka foods: paneer, lentils, soya, dal, curd-rice (day), eggs/fish (if non-vegetarian, well-cooked)", "Iron + vitamin C: beetroot, spinach, amla, jaggery in small amount", "Dry-fruit laddu: dates, almond, raisins, til in moderation", "2.5–3 L fluids daily (milk, coconut water, buttermilk, soups)"],
      avoid: ["Mamsa-kshaya from skipped meals", "Heavy / Vishtambhi food causing constipation", "Alcohol, tobacco & smoke exposure", "Sleeping flat on back for long"],
      rationale: "Mother's Dhatu are being drawn upon by the fetus (Mamsa-shonita upachaya); Snigdha and Brimhana food keeps Agni steady and prevents Karshya.",
      tip: "Start fetal-movement awareness; walk 20–30 minutes daily.",
      dcdutta: { title: "Weeks 18–21 · Quickening & anomaly scan", text: "Quickening at 16–18 weeks in multigravida, ~20 in primigravida. Fundus at umbilicus at 20–22 weeks; FHS audible by fetoscope. Level-II anomaly scan 18–20 weeks; Td 2nd dose; Hb check; weight gain ~0.4 kg/week from now." },
      redFlags: ["No fetal movement by 22 weeks", "Persistent abdominal pain / uterine tenderness", "Pallor with Hb < 10 g/dl"],
    },
    {
      n: 6, weeks: "22–26", trimester: 2, stage: "Bala-Varna Upachaya · Buddhi Pratibuddha",
      fetal: "Fetal strength (Bala) and complexion (Varna) increase most; mother may lose strength and colour. Buddhi (intellect) becomes more awakened.",
      ksheera: { name: "Madhura-aushadha Siddha Ghrita / Ksheera-Sarpi with Gokshura", detail: "Ghee processed with Madhura drugs (Gokshura, Shatavari, Bala) — 1 tsp with warm milk; Sushruta advises Gokshura-siddha Ghrita or Ksheera for Shopha and Mutrakrichhra." },
      pathya: ["Gokshura-Shatavari siddha ghrita (physician-supplied)", "Iron-rich: ragi, dates, beetroot, jaggery, pomegranate, liver (if non-veg)", "Protein: 2 cups dal / sprouts / paneer / egg daily", "Mild diuretic foods for Shopha: barley water, ash-gourd, coconut water", "Calcium 1 g/day and Vitamin D"],
      avoid: ["Excess salt (Shopha ↑)", "Standing > 2 hours; dangling legs", "Tight footwear, constipation straining", "Uncooked sprouts and street food"],
      rationale: "Bala-Varna drain demands Balya and Rasayana nourishment; Gokshura relieves Shopha and Mutrakrichhra without aggravating Vata.",
      tip: "Elevate legs 15 min twice daily; left lateral sleep.",
      dcdutta: { title: "Weeks 22–26 · Viability & GDM screening", text: "Viability from ~24 weeks (surfactant starts). OGTT 75 g at 24–28 weeks (≥140 mg/dl at 2 h = GDM). Monitor BP and urine albumin at each visit — pre-eclampsia screening; edema of feet is physiological, face/hand edema is not. Repeat Hb at 28 weeks." },
      redFlags: ["BP ≥ 140/90 mmHg", "Facial / hand swelling with headache", "Reduced fetal movement", "Hb < 9 g/dl or polyuria-polydipsia (GDM)"],
    },
    {
      n: 7, weeks: "27–30", trimester: 3, stage: "Sarvanga-Pratyanga Vibhaga",
      fetal: "All body parts and organs are fully developed (Sarvairbhavair Apyayate). Mother becomes fatigued (Klanta) due to maximal fetal demands.",
      ksheera: { name: "Prithakparnyadi Siddha Ghrita", detail: "Ghee processed with Prithakparnyadi Gana (Prishniparni, Bala, Shatavari, Vidari) — 1 tsp with warm milk if prescribed." },
      pathya: ["Prithakparnyadi ghrita as per physician", "Easily digestible, small frequent meals (5–6/day)", "Fibre & hydration: stewed fruit, ghee-dalia, soaked raisins at night", "Buttermilk with cumin and rock-salt at lunch", "Iron + calcium given 2 hours apart"],
      avoid: ["Heavy, oily or fermented foods", "Long standing/travel; sleeping on back", "Suppression of natural urges, tight garments", "Emotional stress and loud noise"],
      rationale: "Prithakparnyadi drugs are Garbhasthapaka, Brimhana and Vatanulomaka — suit the weight, backache and Vata-vitiation of the third trimester.",
      tip: "Start Kegel exercises and antenatal birth-preparation classes.",
      dcdutta: { title: "Weeks 27–30 · Third trimester", text: "Third trimester begins at 28 weeks; FH ≈ gestational weeks in cm (±2). Anti-D 300 mcg at 28 weeks if Rh-negative & indirect Coombs negative; Tdap 27–36 weeks; kick-count (≥10 movements in 12 h); visits every 2 weeks. Screen for anemia, GDM, pre-eclampsia, IUGR." },
      redFlags: ["Preterm contractions < 37 weeks", "Antepartum bleeding", "Persistent headache / visual disturbance / epigastric pain"],
    },
    {
      n: 8, weeks: "31–34", trimester: 3, stage: "Ojas Sancharana (Unstable Ojas)",
      fetal: "Ojas oscillates between mother and fetus (Ojas-sancharitvam): when more in the mother the fetus is weak; when more in the fetus the mother is lethargic. Delivery in this month carries risk — hence special Ojas rakshana.",
      ksheera: { name: "Ksheera Yavagu with Ghrita + Basti (physician only)", detail: "Thin rice-milk Yavagu with ghee. Charaka: Asthapana with Badara-siddha Kwatha + Anuvasana with Madhura-aushadha taila — ONLY under a BAMS physician with obstetric clearance." },
      pathya: ["Ksheera-Yavagu with ghee, 1 bowl, evenings", "Ojovardhaka food: milk, ghee, dates, soaked almonds, saffron, mishri", "Mamsa-rasa / dal soup with rice for lunch", "Light dinner before 7:30 pm", "Hydration 2.5 L; fibre to prevent Vibandha"],
      avoid: ["Fear, grief, anger, loud shocks (Ojas-kshaya)", "Virechana, strong purgatives, Raktamokshana", "Travel, climbing, exertion", "Heavy / dry / cold meals"],
      rationale: "Ojas instability makes mother and fetus vulnerable; Madhura-Snigdha-Sheeta nourishment and serenity stabilise Ojas. Basti removes Vata and prepares the Apana pathway.",
      tip: "Plan hospital bag, birth plan and emergency transport now. Practise relaxed breathing daily.",
      dcdutta: { title: "Weeks 31–34 · Late preterm window", text: "Rapid weight gain and brain growth; lungs maturing. Growth scan with liquor and Doppler if indicated; NST for high-risk; steroids (betamethasone) if preterm delivery anticipated. Fetal presentation assessed from 32–34 weeks; visits every 2 weeks (weekly from 36)." },
      redFlags: ["Regular painful contractions", "Rupture of membranes", "Bleeding PV", "Severe pre-eclampsia features", "Absent / reduced fetal movement"],
    },
    {
      n: 9, weeks: "35–40+", trimester: 3, stage: "Prasava Kala (Term)",
      fetal: "Garbha is fully developed; Prasava Kala occurs in the 9th–12th month. Head engages, Apana Vayu directs the fetus downward for Sukhaprasava.",
      ksheera: { name: "Anuvasana Basti + Yoni Pichu + Snigdha Mamsarasa-Anna", detail: "Anuvasana Basti with Madhura-aushadha siddha Taila and Yoni Pichu (cotton swab soaked in medicated oil placed in vagina) for Vata-anulomana & cervical suppleness — by physician only. Meals: Snigdha rice with Mamsa-rasa / dal-ghee." },
      pathya: ["Snigdha rice with ghee, dal soup or Jangala-mamsa rasa", "Dates 3–5/day from 36 weeks (supports labour)", "Warm milk with ghee and Shatavari at bedtime", "Raspberry-leaf / herbal teas only if prescribed", "Walk, squat practice (supervised), Pranayama; pack hospital bag", "Sutikagara (delivery room) preparation"],
      avoid: ["Constipation (Vibandha) — treat early", "Cold, dry and heavy foods", "Panic, sleeplessness, social stress", "Self-induced labour measures (castor oil, strong herbs)"],
      rationale: "Snigdha Anuvasana and Pichu pacify Apana Vata, soften the birth-canal and promote Sukhaprasava; Snigdha food provides strength for labour.",
      tip: "Know the signs of labour and when to leave for hospital; keep ANC file and Link Code at hand.",
      dcdutta: { title: "Weeks 35–40+ · Term, engagement & labour", text: "Term = 37–41+6 weeks. Lightening (engagement) in primigravida 2–3 weeks before labour; true labour: regular, progressive contractions, show, cervical dilatation. Weekly visits from 36 weeks, NST/AFI as indicated; Bishop score; induction considered after 41 weeks. Sukhaprasava = spontaneous vaginal delivery with active management of third stage." },
      redFlags: ["Leaking liquor / rupture of membranes", "Regular contractions every 5 min", "Reduced or absent fetal movement", "Bleeding PV", "Severe headache, blurred vision, convulsions"],
    },
  ];

  /* ------- 9 months × 2 Core Samhitas (Charaka & Sushruta): Sanskrit / IAST / Hindi / English / citation ------- */
  const SAMHITA_MONTHLY = {
    1: {
      charaka: { sa: "प्रथमे मासि शङ्कितायां स्त्रियां सात्म्यं यथेष्टं शीतं पयः पाययेत्", iast: "prathame māsi śaṅkitāyāṃ striyāṃ sātmyaṃ yatheṣṭaṃ śītaṃ payaḥ pāyayet", hi: "पहले माह में गर्भ की आशंका होने पर सात्म्य के अनुसार ठंडा दूध इच्छानुसार पिलाएँ।", en: "In the 1st month, once pregnancy is suspected, give milk as per Satmya — cold and as much as desired.", ref: "Ch. Sha. 8.32 (Masanumasika Vidhi)" },
      sushruta: { sa: "प्रथमे मासि मधुरशीतद्रवप्रायमाहारं सेवेत", iast: "prathame māsi madhuraśītadravaprāyam āhāraṃ seveta", hi: "प्रथम माह में मधुर, शीत एवं द्रव प्रधान आहार का सेवन करे।", en: "In the 1st month, take a diet predominantly sweet, cold and liquid.", ref: "Su. Sha. 10.4 (Garbhini Vyakarana)" },
      ashtanga: { sa: "मासे प्रथमे पयः सात्म्यं मधुरशीतद्रवभूयिष्ठम्", iast: "māse prathame payaḥ sātmyaṃ madhuraśītadravabhūyiṣṭham", hi: "पहले माह में सात्म्य दूध तथा मधुर-शीत-द्रव आहार दें।", en: "1st month: wholesome milk and a mainly sweet-cold-liquid diet.", ref: "A.H. Sha. 1 (Garbhini Paricharya)" },
      kashyapa: { sa: "प्रथमे मासि लाजसक्तून् मधुशर्करायुक्तान् पयसा पाययेत्", iast: "prathame māsi lājasaktūn madhuśarkarāyuktān payasā pāyayet", hi: "प्रथम माह में लाजा-सक्तू मधु-शर्करा सहित दूध के साथ दें।", en: "1st month: parched-rice flour (Laja-saktu) with honey/sugar in milk to relieve nausea and nourish.", ref: "Kashyapa Sa., Sharira Sthana — Garbhini-Vritta; Khila Sthana Garbhini Chikitsa" },
    },
    2: {
      charaka: { sa: "द्वितीये मासि मधुरौषधसिद्धं क्षीरम्", iast: "dvitīye māsi madhurauṣadhasiddhaṃ kṣīram", hi: "दूसरे माह में मधुर औषधियों से सिद्ध दूध दें।", en: "2nd month: milk medicated with Madhura (sweet) herbs.", ref: "Ch. Sha. 8.32" },
      sushruta: { sa: "द्वितीये मासि मधुरौषधसंस्कृतं पयः पाययेत्", iast: "dvitīye māsi madhurauṣadhasaṃskṛtaṃ payaḥ pāyayet", hi: "दूसरे माह में मधुर द्रव्यों से संस्कारित दूध पिलाएँ।", en: "2nd month: milk processed with sweet herbs; continue Madhura-sheeta diet.", ref: "Su. Sha. 10.4" },
      ashtanga: { sa: "द्वितीये क्षीरं मधुरैः शृतम्", iast: "dvitīye kṣīraṃ madhuraiḥ śṛtam", hi: "दूसरे माह में मधुर द्रव्यों के साथ पकाया दूध दें।", en: "2nd month: milk boiled with Madhura Gana drugs.", ref: "A.H. Sha. 1 (Garbhini Paricharya)" },
      kashyapa: { sa: "द्वितीये मासि शतावरीसिद्धं क्षीरं हितम्", iast: "dvitīye māsi śatāvarīsiddhaṃ kṣīraṃ hitam", hi: "दूसरे माह में शतावरी सिद्ध दूध हितकर है।", en: "2nd month: Shatavari-processed milk is beneficial for Garbhasthapana.", ref: "Kashyapa Sa., Khila Sthana — Garbhini Chikitsa" },
    },
    3: {
      charaka: { sa: "तृतीये मासि क्षीरं मधुसर्पिर्भ्याम्", iast: "tṛtīye māsi kṣīraṃ madhusarpirbhyām", hi: "तीसरे माह में दूध मधु और घृत के साथ दें।", en: "3rd month: milk with honey and ghee (in unequal quantity).", ref: "Ch. Sha. 8.32" },
      sushruta: { sa: "तृतीये षष्टिकौदनं पयसा भोजयेत्", iast: "tṛtīye ṣaṣṭikaudanaṃ payasā bhojayet", hi: "तीसरे माह में षष्टिक चावल का भात दूध के साथ खिलाएँ।", en: "3rd month: Shashtika rice cooked/served with milk.", ref: "Su. Sha. 10.4" },
      ashtanga: { sa: "तृतीये मधुसर्पिर्भ्यां पयः", iast: "tṛtīye madhusarpirbhyāṃ payaḥ", hi: "तीसरे माह में मधु-घृत युक्त दूध।", en: "3rd month: milk with honey and ghee.", ref: "A.H. Sha. 1 (Garbhini Paricharya)" },
      kashyapa: { sa: "तृतीये मासि सर्पिर्मधुयुतं पयः सहौषधैः", iast: "tṛtīye māsi sarpirmadhuyutaṃ payaḥ sahauṣadhaiḥ", hi: "तीसरे माह में घृत-मधु युक्त दूध औषधियों सहित।", en: "3rd month: milk with ghee-honey and Garbhasthapaka herbs; prevent bleeding and nausea.", ref: "Kashyapa Sa., Khila Sthana — Garbhini Chikitsa" },
    },
    4: {
      charaka: { sa: "चतुर्थे मासि क्षीरनवनीतम्", iast: "caturthe māsi kṣīranavanītam", hi: "चौथे माह में दूध से निकला ताज़ा मक्खन दें।", en: "4th month: fresh butter extracted from milk (Ksheera-navanita). Garbha attains stability (Sthirata); Dauhrida appears.", ref: "Ch. Sha. 8.32; Ch. Sha. 4.21 (Sthirata)" },
      sushruta: { sa: "चतुर्थे दध्ना षष्टिकौदनं जाङ्गलमांसरसेन सह", iast: "caturthe dadhnā ṣaṣṭikaudanaṃ jāṅgalamāṃsarasena saha", hi: "चौथे माह में दही, षष्टिक भात तथा जाङ्गल मांसरस दें।", en: "4th month: Shashtika rice with curd and Jangala-mamsa rasa (dal soup for vegetarians).", ref: "Su. Sha. 10.4; Su. Sha. 3 (Dauhrida)" },
      ashtanga: { sa: "चतुर्थे क्षीरनवनीतम् अश्नीयात्", iast: "caturthe kṣīranavanītam aśnīyāt", hi: "चौथे माह में क्षीर-नवनीत का सेवन।", en: "4th month: milk with fresh butter; fulfil Dauhrida (cravings) wholesomely.", ref: "A.H. Sha. 1 (Dauhrida / Garbhini Paricharya)" },
      kashyapa: { sa: "दौहृदस्याप्रदानेन गर्भो विकृतिमाप्नुयात्", iast: "dauhṛdasyāpradānena garbho vikṛtimāpnuyāt", hi: "दौहृद की पूर्ति न होने पर गर्भ में विकृति हो सकती है।", en: "Denying Dauhrida (pregnancy cravings) may cause fetal and maternal disturbance; fulfil safe wishes.", ref: "Kashyapa Sa., Sharira Sthana — Garbhavyakarana (Dauhrida)" },
    },
    5: {
      charaka: { sa: "पञ्चमे मासे क्षीरसर्पिः", iast: "pañcame māse kṣīrasarpiḥ", hi: "पाँचवें माह में दूध से निकला घृत दें।", en: "5th month: ghee extracted from milk. Mamsa-shonita upachaya; Manas becomes awakened.", ref: "Ch. Sha. 8.32; Ch. Sha. 4.21" },
      sushruta: { sa: "पञ्चमे पयसा षष्टिकौदनं सर्पिषा", iast: "pañcame payasā ṣaṣṭikaudanaṃ sarpiṣā", hi: "पाँचवें माह में दूध और घृत के साथ षष्टिक भात।", en: "5th month: Shashtika rice with milk and ghee.", ref: "Su. Sha. 10.4" },
      ashtanga: { sa: "पञ्चमे क्षीरसर्पिः प्रयुञ्जीत", iast: "pañcame kṣīrasarpiḥ prayuñjīta", hi: "पाँचवें माह में क्षीर-घृत का प्रयोग।", en: "5th month: milk with ghee; maintain Agni and prevent Karshya.", ref: "A.H. Sha. 1 (Garbhini Paricharya)" },
      kashyapa: { sa: "पञ्चमे मासि घृतं दुग्धसमायुक्तं पिबेत्", iast: "pañcame māsi ghṛtaṃ dugdhasamāyuktaṃ pibet", hi: "पाँचवें माह में दूध के साथ घृत पिएँ।", en: "5th month: ghee with milk — supports Mamsa-Rakta Dhatu.", ref: "Kashyapa Sa., Khila Sthana — Garbhini Chikitsa" },
    },
    6: {
      charaka: { sa: "षष्ठे मासे क्षीरसर्पिर्मधुरौषधसिद्धम्", iast: "ṣaṣṭhe māse kṣīrasarpir madhurauṣadhasiddham", hi: "छठे माह में मधुर औषधियों से सिद्ध क्षीर-घृत दें।", en: "6th month: ghee/milk processed with Madhura drugs (e.g., Gokshura). Bala-varna upachaya; Buddhi awakened.", ref: "Ch. Sha. 8.32; Ch. Sha. 4.21" },
      sushruta: { sa: "षष्ठे गोक्षुरकसिद्धं सर्पिः शोफे हितम्", iast: "ṣaṣṭhe gokṣurakasiddhaṃ sarpiḥ śophe hitam", hi: "छठे माह में गोखरू से सिद्ध घृत शोथ में हितकर है।", en: "6th month: Gokshura-siddha ghee/ksheera — beneficial in Shopha and Mutrakrichhra.", ref: "Su. Sha. 10.4" },
      ashtanga: { sa: "षष्ठे घृतं मधुरौषधैः पक्वम्", iast: "ṣaṣṭhe ghṛtaṃ madhurauṣadhaiḥ pakvam", hi: "छठे माह में मधुर औषधियों से पकाया घृत।", en: "6th month: ghee cooked with Madhura Gana drugs.", ref: "A.H. Sha. 1 (Garbhini Paricharya)" },
      kashyapa: { sa: "षष्ठे बलवर्णप्रदं सर्पिर्मधुरसिद्धमाचरेत्", iast: "ṣaṣṭhe balavarṇapradaṃ sarpir madhurasiddham ācaret", hi: "छठे माह में बल-वर्णवर्धक मधुर सिद्ध घृत का सेवन।", en: "6th month: strength- and complexion-promoting Madhura-siddha ghee.", ref: "Kashyapa Sa., Khila Sthana — Garbhini Chikitsa" },
    },
    7: {
      charaka: { sa: "सप्तमे मासे घृतं पृथक्पर्ण्यादिसिद्धम्", iast: "saptame māse ghṛtaṃ pṛthakparṇyādisiddham", hi: "सातवें माह में पृथक्पर्ण्यादि गण से सिद्ध घृत दें।", en: "7th month: ghee processed with Prithakparnyadi Gana. All Bhavas of fetus are fully nourished; mother fatigued.", ref: "Ch. Sha. 8.32; Ch. Sha. 4.21" },
      sushruta: { sa: "सप्तमे पृथक्पर्ण्यादिसिद्धं घृतं पाययेत्", iast: "saptame pṛthakparṇyādisiddhaṃ ghṛtaṃ pāyayet", hi: "सातवें माह में पृथक्पर्ण्यादि सिद्ध घृत पिलाएँ।", en: "7th month: Prithakparnyadi-siddha ghee.", ref: "Su. Sha. 10.4" },
      ashtanga: { sa: "सप्तमे पृथक्पर्णीसिद्धं घृतम्", iast: "saptame pṛthakparṇīsiddhaṃ ghṛtam", hi: "सातवें माह में पृथक्पर्णी सिद्ध घृत।", en: "7th month: Prishniparni-siddha ghee (Garbhasthapaka and Vatahara).", ref: "A.H. Sha. 1 (Garbhini Paricharya)" },
      kashyapa: { sa: "सप्तमे वातशमनं सर्पिर्बृंहणमाचरेत्", iast: "saptame vātaśamanaṃ sarpir bṛṃhaṇam ācaret", hi: "सातवें माह में वातशामक बृंहण घृत का सेवन।", en: "7th month: Vata-pacifying, nourishing ghee; protect against Vata-prakopa and backache.", ref: "Kashyapa Sa., Khila Sthana — Garbhini Chikitsa" },
    },
    8: {
      charaka: { sa: "अष्टमे मासे क्षीरयवागूं सर्पिष्मतीं पाययेत्; बदरसिद्धेन जलेन आस्थापनम्, मधुरौषधसिद्धेन तैलेनानुवासनम्", iast: "aṣṭame māse kṣīrayavāgūṃ sarpiṣmatīṃ pāyayet; badarasiddhena jalenāsthāpanam, madhurauṣadhasiddhena tailenānuvāsanam", hi: "आठवें माह में घृत युक्त क्षीर-यवागू; बदर सिद्ध जल से आस्थापन तथा मधुर औषध सिद्ध तैल से अनुवासन।", en: "8th month: ghee-added milk Yavagu; Asthapana Basti with Badara-siddha decoction and Anuvasana with Madhura-siddha oil (physician-supervised). Ojas is unstable.", ref: "Ch. Sha. 8.32; Ch. Sha. 4.22 (Ojas)" },
      sushruta: { sa: "अष्टमे क्षीरयवागूं सर्पिषा; बलातिबलादिभिः आस्थापनम्", iast: "aṣṭame kṣīrayavāgūṃ sarpiṣā; balātibalādibhiḥ āsthāpanam", hi: "आठवें माह में घृत सहित क्षीर-यवागू; बला-अतिबला आदि से आस्थापन।", en: "8th month: milk Yavagu with ghee; Asthapana with Bala-Atibala group (supervised).", ref: "Su. Sha. 10.4; Su. Sha. 3 (Ojas)" },
      ashtanga: { sa: "अष्टमे ओजसः सञ्चारित्वात् जातो न जीवति; क्षीरयवागूः सर्पिष्मती", iast: "aṣṭame ojasaḥ sañcāritvāt jāto na jīvati; kṣīrayavāgūḥ sarpiṣmatī", hi: "आठवें माह में ओज अस्थिर होने से जन्मे शिशु के लिए जोखिम; घृत युक्त क्षीर-यवागू।", en: "8th month: Ojas instability makes delivery risky; give ghee-Yavagu and Ojas-protecting regimen.", ref: "A.H. Sha. 1 (Garbhavakranti — Ojas)" },
      kashyapa: { sa: "अष्टमे मासि ओजसः रक्षां कुर्यात् क्षीरघृतैः", iast: "aṣṭame māsi ojasaḥ rakṣāṃ kuryāt kṣīraghṛtaiḥ", hi: "आठवें माह में दूध-घृत से ओज की रक्षा करें।", en: "8th month: protect Ojas with milk and ghee; Basti only with physician.", ref: "Kashyapa Sa., Khila Sthana — Garbhini Chikitsa" },
    },
    9: {
      charaka: { sa: "नवमे मासे स्निग्धैर्मांसरसौदनैः; मधुरौषधसिद्धेन तैलेनानुवासनम्; योनिपिचुः", iast: "navame māse snigdhair māṃsarasaudanaiḥ; madhurauṣadhasiddhena tailenānuvāsanam; yonipicuḥ", hi: "नवें माह में स्निग्ध मांसरस-भात; मधुर औषध सिद्ध तैल से अनुवासन तथा योनि-पिचु।", en: "9th month: unctuous rice with Mamsa-rasa; Anuvasana Basti with Madhura-siddha oil and Yoni Pichu for Vata-anulomana and Sukhaprasava.", ref: "Ch. Sha. 8.32 (Masanumasika; Pichu & Anuvasana)" },
      sushruta: { sa: "नवमे स्निग्धमाहारम्; मधुरतैलैरनुवासनम्; योनौ पिचुं दद्यात्; सूतिकागारप्रवेशः", iast: "navame snigdham āhāram; madhuratailair anuvāsanam; yonau picuṃ dadyāt; sūtikāgārapraveśaḥ", hi: "नवें माह में स्निग्ध आहार, मधुर तैल से अनुवासन, योनि में पिचु और सूतिकागार-प्रवेश।", en: "9th month: unctuous diet, Madhura-taila Anuvasana, Yoni Pichu and entry to the Sutikagara (delivery room).", ref: "Su. Sha. 10.4, 10.8 (Sutikagara)" },
      ashtanga: { sa: "नवमे स्निग्धं भोजनम्; अनुवासनम्; योनिपिचुः", iast: "navame snigdhaṃ bhojanam; anuvāsanam; yonipicuḥ", hi: "नवें माह में स्निग्ध भोजन, अनुवासन और योनि-पिचु।", en: "9th month: unctuous food, Anuvasana Basti and Yoni Pichu for easy delivery.", ref: "A.H. Sha. 1 (Garbhini Paricharya)" },
      kashyapa: { sa: "प्रसवे वातानुलोम्यार्थं नवमे तैलपिचुं योनौ निदध्यात्", iast: "prasave vātānulomyārthaṃ navame tailapicuṃ yonau nidadhyāt", hi: "प्रसव में वातानुलोमन हेतु नवें माह में योनि में तैल-पिचु रखें।", en: "9th month: place oil-soaked Pichu in the vagina to ensure downward Vata (Anulomana) at delivery.", ref: "Kashyapa Sa., Khila Sthana — Garbhini Chikitsa" },
    },
  };

  /* ---------------- 6 RITUS: seasonal modifiers ---------------- */
  const RITUS = [
    {
      key: "hemanta", name: "Hemanta", en: "Early Winter", period: "Mid-Nov – Mid-Jan (Margashirsha–Pausha)", kala: "Visarga (Dakshinayana) — Bala at peak",
      dosha: "Kapha accumulates; Agni strong (Pakta Balinam Bali)",
      focus: "Agni is strongest — do not under-eat. Snigdha, Madhura, Amla-Lavana, warm foods; sun-exposure and warm oil massage.",
      pathya: ["Warm, unctuous, sweet meals — ghee, wheat, rice, urad-dal in moderation", "Warm milk with ghee, dry-fruit laddu, til-jaggery in small amounts", "Vegetable soups with ginger and garlic (if suited), moong-dal khichdi", "Seasonal fruit: orange, amla, guava", "Drink warm water"],
      avoid: ["Cold water, ice, cold drinks", "Fasting & Ruksha-Laghu food", "Cold wind & damp floors; sleeping uncovered", "Excess Vata-aggravating dry snacks"],
      vihara: ["Warm oil Abhyanga with Til/Bala taila daily", "Gentle sun-bath 15 min after sunrise", "Warm clothes and covered feet/head"],
      dcdutta: "Cold exposure & dehydration are less problematic; maintain adequate calories (+300 kcal/day in 2nd–3rd trimester), keep warm, check seasonal influenza vaccination (inactivated) per MoHFW/ACOG guidance and monitor for respiratory infections.",
      shloka: { sa: "शीते शीतानिलस्पर्शसंरुद्धो बलिनां बली । पक्ता भवति हेमन्ते भृशमाहारकाङ्क्षी", iast: "śīte śītānilasparśasaṃruddho balināṃ balī | paktā bhavati hemante bhṛśam āhārakāṅkṣī", hi: "शीत ऋतु में जठराग्नि बलवान होती है, अतः आहार की इच्छा अधिक होती है; स्निग्ध-गुरु आहार पच जाता है।", en: "In Hemanta the cold air confines Agni inside, making it strong; the person craves food and can digest heavier, unctuous meals.", ref: "A.H. Su. 3 (Ritucharya) / Ch. Su. 6.8–12" },
      mods: { wake: "5:00", oil: "Warm Tila / Bala taila", water: "Warm / lukewarm water", sleep: "Divaswapna: AVOID (Kapha)", walk: "After sunrise (7:00 am) or late afternoon sun", breakfast: "Warm porridge (Suji / Dalia) with ghee & dates", lunchAdd: "Add ghee 1–2 tsp, warm dal, rice-ghee", evening: "Warm soup / dry-fruit laddu", night: "Hot milk with ghee, nutmeg pinch (prescribed), jaggery" },
    },
    {
      key: "shishira", name: "Shishira", en: "Late Winter", period: "Mid-Jan – Mid-Mar (Magha–Phalguna)", kala: "Adana begins — Bala moderate",
      dosha: "Kapha accumulation continues; Vata dry & cold; Agni still strong",
      focus: "Similar to Hemanta, but cold is harsher and drier — emphasise Snigdha, Ushna food and warmth; protect from dry, cold winds.",
      pathya: ["Ghee-laden hot khichdi, wheat roti with ghee", "Warm milk with turmeric and Shatavari (if advised)", "Moderate Katu-Tikta spices: ginger, cumin, ajwain in small dose", "Soups of moong, drumstick, pumpkin; cooked winter greens (palak, methi in moderation)", "Sesame-jaggery in small amounts after the first trimester only"],
      avoid: ["Cold drinks and cold exposure", "Excess Ruksha (dry) foods — puffed rice snacks, biscuits", "Day-sleep and heavy exertion", "Raw salads in the evening"],
      vihara: ["Warm oil massage, warm baths (not hot)", "Light walks at noon in sunlight", "Cover ears, chest, feet"],
      dcdutta: "Winter respiratory illnesses and dry skin are common; maintain hydration, vitamin D (sun exposure + supplement 400–600 IU), seasonal flu shot, watch for pre-eclampsia (winter BP rise) at every visit.",
      shloka: { sa: "हेमन्तवत् शिशिरे विधिः कार्यः विशेषतः कटुतिक्तकषायवर्जनम्", iast: "hemantavat śiśire vidhiḥ kāryaḥ viśeṣataḥ kaṭutiktakaṣāyavarjanam", hi: "शिशिर में हेमन्त के समान विधि अपनाएँ; विशेषकर कटु-तिक्त-कषाय रस का अधिक सेवन न करें।", en: "Follow the Hemanta regimen in Shishira, especially limiting excessive Katu, Tikta and Kashaya rasa.", ref: "A.H. Su. 3.18 (Ritucharya) / Ch. Su. 6.19" },
      mods: { wake: "5:00", oil: "Warm Tila taila / Ksheerabala", water: "Warm water, ginger-tulsi water", sleep: "Divaswapna: AVOID; rest 20 min reclined only", walk: "Late morning sunlight (10:00)", breakfast: "Hot ragi-ghee porridge / vegetable upma with ghee", lunchAdd: "Hot dal-ghee, jaggery bite after meal", evening: "Warm milk with dates", night: "Warm milk with ghee & turmeric" },
    },
    {
      key: "vasanta", name: "Vasanta", en: "Spring", period: "Mid-Mar – Mid-May (Chaitra–Vaishakha)", kala: "Adana — Bala decreasing",
      dosha: "Kapha liquefies (Kapha prakopa); Agni becomes weak; allergy and cold are common",
      focus: "Reduce Kapha: Laghu, Ruksha-Ushna, Tikta-Katu-Kashaya foods, but remain gentle in pregnancy. Avoid day-sleep, heavy sweets, curd.",
      pathya: ["Barley, old rice, wheat, moong dal; honey in small amounts with warm water (Madhu — never heated)", "Light soups with ginger, pepper (small), turmeric", "Cooked vegetables: bitter gourd (small), drumstick, lauki, tinda", "Warm water; herbal tea of tulsi-ginger", "Light, early dinner"],
      avoid: ["Curd, cold milk-sweets, heavy sweets & fried food", "Day-sleep (Kapha ↑)", "Cold drinks, ice-cream", "Overeating"],
      vihara: ["Light exercise: brisk walking, gentle yoga", "Dry massage (Udvartana) not on abdomen — physician advice", "Avoid Nasya and Shirovirechana unless prescribed by a physician", "Allergen avoidance (pollen)"],
      dcdutta: "Allergic rhinitis and respiratory infections are common; use saline nasal wash, safe antihistamines on prescription, hydration. Watch for viral fevers (dengue/chikungunya start); maintain weight within recommended gain.",
      shloka: { sa: "वसन्ते निचितः श्लेष्मा दिनकृद्भाभिरीरितः । कायाग्निं बाधते रोगांस्ततः प्रकुरुते बहून्", iast: "vasante nicitaḥ śleṣmā dinakṛdbhābhir īritaḥ | kāyāgniṃ bādhate rogāṃs tataḥ prakurute bahūn", hi: "वसन्त में संचित कफ सूर्य-किरणों से द्रवित होकर अग्नि को मंद करता है और अनेक रोग उत्पन्न करता है।", en: "In Vasanta, accumulated Kapha is liquefied by the sun's rays, weakens Agni and causes many diseases.", ref: "A.H. Su. 3.24 (Ritucharya) / Ch. Su. 6.13" },
      mods: { wake: "4:45", oil: "Light Tila taila (mild), dry Udvartana for limbs if approved", water: "Warm water with a little honey (never boiled)", sleep: "Divaswapna: AVOID", walk: "Early morning 6:00 (brisk)", breakfast: "Moong-dal cheela / vegetable poha with lemon", lunchAdd: "Barley / wheat roti, bitter-gourd or drumstick sabzi", evening: "Warm ginger-tulsi tea (decaf), roasted chana", night: "Warm milk with turmeric (light)" },
    },
    {
      key: "grishma", name: "Grishma", en: "Summer", period: "Mid-May – Mid-Jul (Jyeshtha–Ashadha)", kala: "Adana — Bala at lowest",
      dosha: "Vata accumulates; Pitta rises; Agni and Bala are weakest, dehydration risk",
      focus: "Cooling hydration: Madhura, Sheeta, Snigdha, Drava food. Avoid sour, salty, pungent & hot exposure.",
      pathya: ["Rice, wheat in moderation, cooling soups, moong; ghee & milk", "Fruit: sweet mango (small), watermelon, muskmelon, grapes, pomegranate", "Coconut water, buttermilk (day), Panaka — jaggery-water, sattu drink, barley-water", "Mint-fennel cooling drink (Saunf sharbat), rose-water milk", "3–3.5 litres fluids daily"],
      avoid: ["Hot, spicy, fried, sour, salty food", "Direct sun exposure; heat-stroke prone travel", "Excess exercise & prolonged fasting", "Alcohol and caffeine"],
      vihara: ["Cool shower (lukewarm on abdomen), light cotton clothes", "Sandalwood-coconut-oil Abhyanga (Chandanadi / Sheeta taila)", "Midday rest (Divaswapna allowed 45–60 min — only Ritu where permitted)", "Moon-lit terrace walk in the evening"],
      dcdutta: "Heat, dehydration, UTI and leg-cramps rise; ensure ≥3 L fluids and ORS if sweating; urine should be pale. Heat-stroke and pre-eclampsia are risks. Avoid exertion in the heat; watch for Braxton-Hicks provoked by dehydration.",
      shloka: { sa: "ग्रीष्मे तीक्ष्णांशुरादत्ते स्नेहं सोमं च भूरिशः । अतः शीतं द्रवं स्निग्धं मधुरं चाशनं हितम्", iast: "grīṣme tīkṣṇāṃśur ādatte snehaṃ somaṃ ca bhūriśaḥ | ataḥ śītaṃ dravaṃ snigdhaṃ madhuraṃ cāśanaṃ hitam", hi: "ग्रीष्म में सूर्य शरीर के स्नेह और सोम को सोख लेता है, अतः शीत, द्रव, स्निग्ध और मधुर आहार हितकर है।", en: "In Grishma the sun drains moisture and Soma from the body, so cold, liquid, unctuous and sweet food is wholesome.", ref: "A.H. Su. 3.30 (Ritucharya) / Ch. Su. 6.25" },
      mods: { wake: "4:30", oil: "Chandanadi / Coconut oil (cooling)", water: "Cool (earthen-pot) water; never ice-cold", sleep: "Divaswapna: ALLOWED — 45–60 min in a cool room, reclined on left side", walk: "Before 6:30 am or after 6:30 pm", breakfast: "Rice-milk kheer or fruit-milk with soaked raisins", lunchAdd: "Add buttermilk + cucumber raita, lauki / ridge-gourd sabzi", evening: "Coconut water + soaked dates; sattu drink", night: "Cool (room-temp) milk with ghee, saffron & mishri" },
    },
    {
      key: "varsha", name: "Varsha", en: "Monsoon", period: "Mid-Jul – Mid-Sep (Shravana–Bhadrapada)", kala: "Visarga begins — Bala low",
      dosha: "Vata aggravates; Pitta accumulates; Agni is Manda; water & food-borne infections",
      focus: "Agnideepana and boiled water. Light, warm, freshly cooked, mildly sour-salty-unctuous food; strict hygiene.",
      pathya: ["Old rice, wheat, barley, moong; honey in small amounts with warm water", "Freshly cooked warm soups: ginger-cumin-pepper (small), vegetable broth", "Boiled-and-cooled water with Shunthi / Dhanyaka (Agnideepana)", "Cooked vegetables, lauki, pumpkin; avoid raw leafy greens", "Buttermilk with roasted cumin & rock-salt at lunch"],
      avoid: ["Raw salads, street food, cut fruit, stale or leftover food", "Curd at night, river fish, heavy, oily or fermented foods", "Day-sleep, wet clothes, wading in water", "Unfiltered water; ice"],
      vihara: ["Always drink boiled water", "Dry the body after rain; Dhupana (smoke-fumigation) of room with neem/guggul if allowed", "Mosquito-nets and repellent (dengue, malaria)", "Light Abhyanga with warm Tila taila"],
      dcdutta: "Peak season for diarrhoeal diseases, hepatitis E, typhoid, malaria and dengue — all hazardous in pregnancy (Hepatitis E: high mortality in pregnancy; malaria: prompt treatment, ITN use). Boil/filter water, hygiene, mosquito-protection; any fever needs same-day medical review.",
      shloka: { sa: "आदानग्लानदेहानामग्निः सन्नोऽपि सर्वदा । वर्षास्वनिलादिदोषैर्दुष्यन्ति कुपिता जलैः", iast: "ādānaglānadehānām agniḥ sanno'pi sarvadā | varṣāsv anilādidoṣair dūṣyanti kupitā jalaiḥ", hi: "वर्षा में पहले से दुर्बल शरीर की अग्नि मंद हो जाती है और दूषित जल व दोषों से रोग होते हैं; अतः अग्निदीपन व शुद्ध जल आवश्यक है।", en: "In Varsha the Agni of a body already weakened in summer is dull, and vitiated waters and doshas cause illness — kindle Agni and drink purified water.", ref: "A.H. Su. 3.37–40 (Ritucharya) / Ch. Su. 6.35" },
      mods: { wake: "5:00", oil: "Warm Tila taila (light)", water: "Boiled & cooled water with Shunthi / Dhanyaka", sleep: "Divaswapna: AVOID", walk: "Indoor / covered walk 20 min", breakfast: "Warm moong-dal khichdi / vegetable upma", lunchAdd: "Warm dal-rice-ghee, cooked lauki; buttermilk with jeera", evening: "Ginger-jeera soup / roasted makhana", night: "Warm milk with a pinch of Haridra (turmeric) — light dinner before 7:00" },
    },
    {
      key: "sharad", name: "Sharad", en: "Autumn", period: "Mid-Sep – Mid-Nov (Ashvina–Kartika)", kala: "Visarga — Bala moderate",
      dosha: "Pitta prakopa (accumulated in Varsha); Agni moderate; acidity, skin rash, fever tendencies",
      focus: "Pacify Pitta: Madhura, Tikta, Kashaya rasa; cool, light foods; Ghrita (Tikta-ghrita if prescribed). Avoid hot sun and spicy, sour, salty food.",
      pathya: ["Rice, wheat, barley, moong; sweet-bitter vegetables (lauki, parwal, ridge-gourd)", "Ghee, milk, Shatavari kalpa, Amla murabba (small)", "Pomegranate, grapes, sweet fruits, coconut water", "Cool (not cold) water kept in sun & moonlight (Hamsodaka)", "Bitter-leaf soup in small amounts"],
      avoid: ["Hot-spicy, fried, sour, fermented food; curd", "Excess salt, alcohol & oil", "Midday sun, day-sleep, anger", "Heavy exertion in heat"],
      vihara: ["Evening moon-lit walks; cool sandal-paste on forehead", "Light cotton clothes; avoid heat & sun", "Soothing music, pleasant surroundings (Garbha Sanskar)"],
      dcdutta: "Hyperacidity/heartburn and skin rashes (PUPPP, obstetric cholestasis — itching of palms/soles needs LFT & bile acids) can increase; dengue/malaria tail-end persists. Small frequent meals, elevate head-end, antacids on prescription.",
      shloka: { sa: "तप्तं तप्तांशुकिरणैः शीतं शीतांशुरश्मिभिः । समन्तादप्यहोरात्रमगस्त्योदयनिर्विषम्", iast: "taptaṃ taptāṃśukiraṇaiḥ śītaṃ śītāṃśuraśmibhiḥ | samantād apy ahorātram agastyodayanirviṣam", hi: "शरद में दिन में सूर्य-ताप और रात्रि में चन्द्र-किरणों से तपा-ठंडा हुआ जल (हंसोदक) अगस्त्य उदय के बाद निर्विष और हितकर होता है।", en: "In Sharad, water warmed by the sun by day and cooled by moon-rays by night (Hamsodaka) becomes pure and wholesome after the rise of Agastya.", ref: "A.H. Su. 3.46–48 (Ritucharya) / Ch. Su. 6.38" },
      mods: { wake: "4:45", oil: "Coconut / Chandanadi / Bala taila (cooling)", water: "Hamsodaka — sun-warmed, moon-cooled boiled water", sleep: "Divaswapna: AVOID; rest 20 min only", walk: "Evening walk in moonlight 7:00–7:30 pm", breakfast: "Rice-milk kheer or sweet fruit-bowl with ghee", lunchAdd: "Add lauki / ridge-gourd, ghee, sweet-bitter vegetables", evening: "Pomegranate juice, coconut water", night: "Cool milk with ghee, sugar-candy & saffron" },
    },
  ];

  /* ---------------- Prakriti modifiers ---------------- */
  const PRAKRITI = {
    Vata: { en: "Vata-predominant", tip: "Warm, moist, unctuous meals; regular timings; avoid dry/cold/raw food and long fasting; more oil massage; extra rest.", sleepTip: "Maintain strict routine; 8–9 hours sleep" },
    Pitta: { en: "Pitta-predominant", tip: "Cool, sweet-bitter foods; avoid chilli, sour, fermented; moderate sun exposure; soothe the mind; avoid anger.", sleepTip: "Cool bedroom; avoid screens late" },
    Kapha: { en: "Kapha-predominant", tip: "Light, warm food; limit sweets, dairy-heavy meals and day-sleep; steady daily exercise; prevent excessive weight gain.", sleepTip: "Wake early; avoid oversleeping" },
    "Vata-Pitta": { en: "Vata-Pitta", tip: "Sweet, moist, cooling-warm balance; ghee, milk; avoid very hot or very dry food; routine plus calm.", sleepTip: "Cool dim room; regular timing" },
    "Pitta-Kapha": { en: "Pitta-Kapha", tip: "Light, cool-bitter-astringent foods, small sweet portions; daily brisk walking.", sleepTip: "Early waking" },
    "Vata-Kapha": { en: "Vata-Kapha", tip: "Warm, light-unctuous foods; avoid cold-heavy items; regular exercise and routine.", sleepTip: "Warm room, steady schedule" },
  };

  /* ---------------- Dinacharya (Morning to Night), ritu/trimester aware ---------------- */
  function buildDinacharya(rk, month) {
    const r = RITUS.find((x) => x.key === rk) || RITUS[0];
    const m = r.mods;
    const mo = MONTHS[Math.min(9, Math.max(1, month)) - 1];
    const nasal = month === 1;
    return [
      { time: `${m.wake} am`, icon: "🌅", title: "Brahma Muhurta Waking", body: `Wake gently ~90 min before sunrise; sip ${m.water.toLowerCase()}; prayer / gratitude and a calm mantra. Maintain a serene routine and 8–9 hours of restful sleep.`, basis: "Ch. Su. 5 Dinacharya; A.H. Su. 2.1" },
      { time: "5:30 am", icon: "🪥", title: "Oral Care & Natural Urges", body: "Mala-mutra visarjana without straining; Danta-dhavana with a soft brush and herbal tooth-powder (Triphala/Yashtimadhu); Jihva-nirlekhana gently; Gandusha with lukewarm water or sesame oil (2 min).", basis: "A.H. Su. 2.1–8; Dantadhavana" },
      { time: "6:00 am", icon: "🧘", title: "Gentle Yoga & Pranayama", body: `10–20 min: Anuloma-Viloma, Bhramari, Sheetali (summer), Sukhasana & Baddha-Konasana (supervised). ${nasal ? "First trimester: light only — no inverted or twisting poses." : "Avoid Kapalabhati, Bhastrika, deep forward bends and breath-holding."}`, basis: "Ch. Sha. 8; DC Dutta antenatal exercise" },
      { time: "6:30 am", icon: "🛁", title: "Abhyanga & Bath", body: `Gentle self-massage with ${m.oil}; avoid deep pressure on the abdomen (esp. Month 1–3) and ankles-pressure points; bath with comfortable (not hot) water; avoid hot water on the head and abdomen.`, basis: "A.H. Su. 2.8–9; Su. Sha. 10" },
      { time: "7:30 am", icon: "🥣", title: "Morning Nourishment", body: `${m.breakfast}. Add ${mo.ksheera.name.split(" (")[0].toLowerCase()} as per the month plan (physician-approved). Take iron-folic acid per doctor’s advice — after food with Vitamin-C fruit.`, basis: "Ch. Sha. 8.32; Ritucharya" },
      { time: "10:30 am", icon: "🥥", title: "Mid-Morning Snack", body: `Seasonal fruit, soaked almonds (4–5) or ${r.key === "grishma" ? "coconut water / sattu drink" : r.key === "hemanta" || r.key === "shishira" ? "warm milk with dates" : "fruit with a little ghee-roasted makhana"}. Keep ${m.water.toLowerCase()} nearby.`, basis: "Rasayana ahara; Ritucharya" },
      { time: "12:30 pm", icon: "🍛", title: "Main Meal (Madhyahna Bhojana)", body: `The largest meal when Agni is peak. Rice/wheat + dal + 2 cooked vegetables + ghee. ${m.lunchAdd}. Warm, fresh, sit calmly, eat without screens, chew well; stop at ~¾ stomach (Matravat Ahara).`, basis: "Ch. Vi. 1.24 Ashtavidha Ahara-vidhi" },
      { time: "1:30 pm", icon: "😴", title: "Divaswapna (Day-Rest) Rule", body: `${m.sleep}. Otherwise rest 20–30 min reclined on the LEFT side without deep sleep; short walk 100 steps after meal (Shatapavali). Avoid supine position after 20 weeks.`, basis: "A.H. Su. 7 Divaswapna; Ch. Su. 21 Nidra" },
      { time: "4:30 pm", icon: "🍵", title: "Evening Snack", body: `${m.evening}. Hydrate; avoid tea/coffee excess (≤1 cup).`, basis: "Ritucharya" },
      { time: "5:30 pm", icon: "🚶", title: "Evening Walk & Pranayama", body: `${m.walk}: 20–30 min easy walk on even ground, Pranayama 5 min; avoid crowded, rough roads or uneven surfaces. Keep phone and Link Code handy.`, basis: "Ch. Sha. 8 Vihara; DC Dutta exercise" },
      { time: "7:00 pm", icon: "🥗", title: "Light Dinner", body: `Light, warm, freshly cooked: moong-dal khichdi / vegetable soup / phulka with ghee; no curd at night; finish 2–3 hours before sleep. Favor warm, unctuous, easily digestible satvic food.`, basis: "A.H. Su. 8; Laghu Ratri Bhojana" },
      { time: "8:30 pm", icon: "🥛", title: "Bedtime Medicated Milk", body: `${m.night}. This month’s Ksheera/Ghrita: ${mo.ksheera.name} — ${mo.ksheera.detail}`, basis: "Ch. Sha. 8.32 Masanumasika" },
      { time: "9:00 pm", icon: "🎶", title: "Garbha Sanskar (Prenatal Bonding)", body: "20–30 min: soothing Raga / mantra, devotional or positive reading, gentle conversation with the baby, gratitude journaling. Avoid horror, violence, loud noise and arguments.", basis: "Ch. Sha. 4 Manasa Bhava; Su. Sha. 3 (Dauhrida)" },
      { time: "9:45 pm", icon: "🌙", title: "Sleep (Ratri-Svapna)", body: `Sleep by 10 pm on the LEFT lateral side with a pillow between knees; 7–9 hours; keep the room ${r.key === "grishma" || r.key === "sharad" ? "cool and airy" : "warm and covered"}. Avoid night vigil (Ratri-jagarana).`, basis: "A.H. Su. 7.52; Nidra" },
    ];
  }

  /* ---------------- Garbhopaghatakara Bhavas & Apathya ---------------- */
  const BHAVAS = {
    refs: "Ch. Sha. 4.18 (Garbhopaghatakara Bhavas); Su. Sha. 3 & 10 (Garbhini Apathya); A.H. Sha. 1–2",
    sanskrit: { sa: "तत्र खल्विमे गर्भोपघातकरा भावा भवन्ति — मातुश्चाहारविहारविपर्ययः", iast: "tatra khalv ime garbhopaghātakarā bhāvā bhavanti — mātuś cāhāra-vihāra-viparyayaḥ", hi: "गर्भ को हानि पहुँचाने वाले भाव — माता के आहार-विहार का विपर्यय, अत्यधिक व्यायाम, शोक, भय, क्रोध आदि।", en: "Factors harmful to the fetus: faulty diet and lifestyle of the mother, excessive exertion, grief, fear, anger, suppression of urges, harmful posture, etc.", ref: "Ch. Sha. 4.18; Su. Sha. 10 (Garbhini Apathya)" },
    groups: [
      { cat: "Ahara (Food)", icon: "🍽️", items: ["Katu, Tikshna, Ushna, Atilavana — chilli, pickles, vinegar, very salty or very hot food", "Ruksha, Guru, Abhishyandi & fermented foods; stale / packaged / street food (Paryushita)", "Viruddha Ahara — equal honey + ghee, milk + fish, fruit + milk combinations", "Alcohol, tobacco, gutka; excess tea/coffee; raw papaya & large amounts of pineapple", "Raw / half-cooked meat & eggs, unpasteurised dairy, raw sprouts (Listeria, Salmonella)", "Fasting (Upavasa) & prolonged hunger"] },
      { cat: "Vihara (Activity)", icon: "🏃‍♀️", items: ["Ativyayama, heavy lifting, running, jumping and high-impact exercises", "Divaswapna (excess), Ratri-jagarana (night vigil)", "Vega-dharana — suppressing urine, stool, flatus, sneeze, hunger, thirst", "Excess Vyavaya (coitus) — avoid in 1st & last trimester or in high-risk pregnancy", "Hot baths, sauna, long exposure to heat/fire, loud noise & vibration", "Ativisham-sthana — uneven surfaces, steep stairs, climbing"] },
      { cat: "Sthana / Yana (Posture & Travel)", icon: "🚗", items: ["Utkatuka-asana (prolonged squatting) & Vishama-asana (uneven posture)", "Prolonged supine position after 20 weeks (Prishthato-shayana)", "Bumpy / long-distance travel by two-wheeler, bullock-cart or jerky vehicle (Yana-arohana)", "Standing for long hours, wearing high heels", "Deep forward-bending, inverted yoga, Kapalabhati & Bhastrika"] },
      { cat: "Manasika (Emotional)", icon: "🧠", items: ["Shoka (grief), Krodha (anger), Bhaya (fear), Udvega (anxiety), Irshya (envy)", "Horror/violent content, quarrels, loud abuse", "Denial of Dauhrida — unwholesome denial of safe desires", "Social isolation & sleep-deprivation"] },
      { cat: "Chikitsa (Medical / Procedures)", icon: "💊", items: ["Self-medication, strong purgatives (Tikshna Virechana), emetics, Raktamokshana", "Garbhapatakara herbs: Danti, Dravanti, Jayapala (croton), Kalihari, Kumari-latex, Hingu in excess", "Unsupervised herbal or Bhasma supplements, Vamana/Virechana/Nasya in pregnancy", "X-rays/radiation without need; live vaccines (MMR, varicella); teratogenic drugs (isotretinoin, warfarin, ACE-inhibitors, valproate)", "Unsupervised Basti, Pichu or Uttara-basti"] },
    ],
    effect: "Classical effects described: Garbhasrava / Garbhapata (abortion), Garbhashosha (IUGR), Upavishtaka (Vata-Pitta stasis), Vikrita-prajanana (congenital anomalies) and Kubja, Kuni, Pangu, Jada in Sushruta (Dauhrida vimanana). Modern correlates: miscarriage, IUGR, neural-tube defects, FAS, preterm labour.",
  };

  /* ---------------- DC Dutta Obstetric Red Flags ---------------- */
  const RED_FLAGS = [
    { sign: "Pre-eclampsia / Eclampsia", cues: "BP ≥140/90 mmHg after 20 weeks; severe headache; blurred vision; epigastric pain; facial & hand swelling; sudden weight gain; ↓ urine; proteinuria; convulsion = eclampsia", action: "Same-day hospital referral. Magnesium sulphate for severe disease/eclampsia; antihypertensives (labetalol, nifedipine); delivery planning.", cite: "DC Dutta — Hypertensive Disorders of Pregnancy" },
    { sign: "Antepartum Haemorrhage (APH)", cues: "ANY bleeding PV after 28 weeks — painless (placenta praevia) or painful with woody-hard uterus (abruptio placentae). Do NOT perform PV exam.", action: "Emergency admission; IV access, cross-match, USG for placental site, delivery as per severity.", cite: "DC Dutta — Antepartum Haemorrhage" },
    { sign: "Reduced / Absent Fetal Movements", cues: "<10 movements in 12 hours (Kick count) or no movement by 22 weeks", action: "Immediate NST / USG / Doppler, hydration, left-lateral rest; urgent obstetric review.", cite: "DC Dutta — Fetal Surveillance" },
    { sign: "Severe Anaemia in Pregnancy", cues: "Hb < 7 g/dl: breathlessness, palpitation, pallor, edema, fatigue; Hb 7–9.9 = moderate to mild", action: "Parenteral iron/blood transfusion (if Hb<5 or near term with decompensation); investigate cause; counsel on diet.", cite: "DC Dutta — Anaemia in Pregnancy" },
    { sign: "PPROM / Preterm Labour", cues: "Leaking watery fluid <37 weeks; regular painful contractions; pelvic pressure; bloody show", action: "Admit, antenatal steroids, tocolysis if appropriate, antibiotics for PPROM, neonatal ICU preparation.", cite: "DC Dutta — Preterm Labour & PROM" },
    { sign: "Gestational Diabetes / Hyperglycaemia", cues: "OGTT 75 g: fasting ≥92, 1h ≥180, 2h ≥153 (IADPSG) or 2h ≥140 mg/dl (DIPSI); polyuria, polydipsia, recurrent infections, macrosomia", action: "Medical nutrition therapy; glucose monitoring; insulin/metformin if needed; fetal growth scans.", cite: "DC Dutta — Diabetes in Pregnancy" },
    { sign: "Hyperemesis Gravidarum", cues: "Persistent vomiting, ketonuria, weight loss >5%, dehydration", action: "IV fluids, antiemetics, thiamine; rule out molar pregnancy and thyrotoxicosis.", cite: "DC Dutta — Hyperemesis Gravidarum" },
    { sign: "Infection / Fever in Pregnancy", cues: "Fever >38 °C, burning micturition, foul discharge, jaundice, rash; malaria / dengue / hepatitis E in monsoon", action: "Urgent investigation (CBC, urine culture, malaria/dengue test); never self-treat; treat as an obstetric emergency if ill-looking.", cite: "DC Dutta — Infections in Pregnancy" },
    { sign: "Obstetric Cholestasis", cues: "Itching of palms/soles worse at night without rash; dark urine", action: "LFT and bile acids; ursodeoxycholic acid; fetal surveillance and timed delivery ~37 weeks.", cite: "DC Dutta — Medical Disorders in Pregnancy" },
    { sign: "Emotional Red Flags", cues: "Persistent sadness, hopelessness, thoughts of self-harm, panic", action: "Immediate support and referral to psychiatry; involve family; screen using EPDS.", cite: "DC Dutta — Psychiatric Disorders in Pregnancy & Puerperium" },
  ];

  /* ---------------- Garbhini Upadravas (Antenatal Complications) ---------------- */
  const UPADRAVAS = [
    {
      key: "chhardi",
      name: "Garbhini Chhardi (Nausea & Hyperemesis Gravidarum)",
      symptom: "Severe persistent nausea, intractable vomiting, inability to retain oral fluids or solids, ketonuria, weight loss",
      severity: "urgent",
      sa: "दौहृदविमाननाद्वा गर्भोत्पीडनाद्वा वातपित्तप्रकोपात् छर्दिर्जायते",
      iast: "dauhridavimānanādvā garbhotpīḍanādvā vātapittaprakopāt chardir jāyate",
      hi: "दौहृद की उपेक्षा, गर्भ द्वारा आमाशय का संपीडन तथा वात-पित्त प्रकोप से गर्भिणी में छर्दि उत्पन्न होती है।",
      en: "Garbhini Chhardi arises from neglect of Dauhrida (pregnancy desires), upward anatomical pressure of the expanding uterus on the Amashaya, and Vata-Pitta aggravation. First-line supportive care: Laja-manda (parched rice water) with elaichi & honey, Dadima (pomegranate) juice, Eladi churna with honey, small frequent dry meals. Severe persistent vomiting is a clinical red flag.",
      ref: "Harita Samhita 3.51 (Garbhini Upadrava); Charaka Sha. 8; Sushruta Sha. 10",
      dcdutta: "Nausea & vomiting affects 50–70% of pregnant women (morning sickness) due to peak hCG, estrogen and progesterone; intractable vomiting with dehydration, ketonuria, weight loss >5% and electrolyte imbalance defines Hyperemesis Gravidarum (0.5–2% incidence). Management: hospital admission if ketones positive, IV fluid rehydration (Ringer lactate / Normal saline), thiamine 100 mg daily, pyridoxine (Vit B6) 10–25 mg TDS, doxylamine 10–20 mg, metoclopramide or ondansetron.",
      actions: [
        "Sip cool Laja-manda (puffed rice water) or tender coconut water in small frequent sips.",
        "Eat dry carbohydrate snacks (dry toast, roasted makhana, puffed rice) before getting out of bed.",
        "Avoid greasy, spicy, fried, or strongly aromatic foods that trigger nausea.",
        "Seek emergency hospital care immediately if unable to keep liquids down for >12 hours, dark urine, or feeling dizzy."
      ],
      redFlags: ["Inability to keep liquids down for 12–24 hours", "Rapid weight loss or extreme dizziness / fainting", "Dark concentrated urine with sweet fruity ketone odour"]
    },
    {
      key: "shopha",
      name: "Garbhini Shopha (Edema & Gestational Hypertension / Pre-eclampsia)",
      symptom: "Sudden or rapid swelling of feet, ankles, face, eyelids and fingers; tight rings; sudden weight gain (>1 kg/week)",
      severity: "emergency",
      sa: "गर्भातिवृद्ध्या रसवाहिनीनां संरोधात् वातेन शोफः पादयोर्जायते",
      iast: "garbhātivṛddhyā rasavāhinīnāṃ saṃrodhāt vātena śophaḥ pādayor jāyate",
      hi: "गर्भ की अत्यधिक वृद्धि से रसवाहिनियों के अवरोध तथा वात प्रकोप से गर्भिणी के चरणों में शोफ (सूजन) होती है।",
      en: "Garbhini Shopha occurs when the gravid uterus causes mechanical pressure on venous return (Rasavaha/Raktavaha srotorodha), creating Vata stasis and fluid retention. Mild dependent pedal edema at evening is physiological; swelling extending to the face, hands, or abdomen, or accompanied by elevated BP, is pathological.",
      ref: "Harita Samhita 3.52; Charaka Sha. 8; Sushruta Sha. 10",
      dcdutta: "Physiological dependent ankle edema occurs in ~80% of pregnant women. Pathological edema (present upon rising in the morning, involving hands and face, or rapid weight gain >1 kg/week) is a cardinal sign of Pre-eclampsia (defined as BP ≥140/90 mmHg on two occasions 4 hours apart after 20 weeks with proteinuria ≥1+ on dipstick). Emergency evaluation required: CBC, LFT, serum creatinine, urine protein:creatinine ratio, and fetal NST/Doppler.",
      actions: [
        "Elevate legs above heart level for 15–20 minutes twice daily; avoid prolonged standing or sitting with dangling legs.",
        "Sleep strictly in the left lateral position to relieve inferior vena cava compression.",
        "Check blood pressure immediately at a clinic; never restrict water intake (maintain 2.5–3 L/day).",
        "Report immediately if swelling is accompanied by headache, visual blurring, or epigastric pain."
      ],
      redFlags: ["Facial, eyelid or hand swelling on waking", "Blood pressure ≥140/90 mmHg", "Swelling with headache, blurred vision, or upper abdominal pain"]
    },
    {
      key: "shirahshoola",
      name: "Severe Headache & Visual Changes (Shirahshoola / Impending Eclampsia)",
      symptom: "Severe persistent frontal or occipital headache, blurred vision, flashes of light, scotomata, epigastric or right hypochondriac pain",
      severity: "emergency",
      sa: "शिरःशूलं भ्रमो दृष्टिदोषश्च गर्भिण्यां वातपित्तप्रकोपात् महाभयङ्करः",
      iast: "śiraḥśūlaṃ bhramo dṛṣṭidoṣaśca garbhiṇyāṃ vātapittaprakopāt mahābhayaṅkaraḥ",
      hi: "गर्भिणी में तीव्र शिरःशूल, भ्रम तथा दृष्टिदोष वात-पित्त के उग्र प्रकोप से उत्पन्न महाभयंकर उपद्रव हैं।",
      en: "Severe Shirahshoola with visual disturbances and epigastric burning indicates critical Pitta-Vata vitiation affecting the Shiras and Hridaya. In modern obstetrics, this represents cerebral vasospasm and impending eclampsia.",
      ref: "Charaka Samhita, Chikitsa Sthana 15; Sushruta Samhita, Uttara Tantra 42",
      dcdutta: "Severe persistent headache not relieved by paracetamol, visual disturbances (blurring, scotomata, flashes of light, blindness), and epigastric or right upper quadrant pain (hepatic capsular distension) are classic premonitory symptoms of IMPENDING ECLAMPSIA. Critical obstetric emergency: requires immediate admission, loading dose of Magnesium Sulphate (Pritchard or Zuspan regimen), IV antihypertensives (Labetalol / Hydralazine), and emergency delivery planning.",
      actions: [
        "Go directly to the nearest maternity hospital emergency room immediately.",
        "Do NOT take unprescribed painkillers or sleep pills; do NOT wait for symptoms to pass.",
        "Keep the patient in a quiet, dimly lit room and transport in a left lateral position."
      ],
      redFlags: ["Throbbing headache not responding to simple analgesics", "Spots in front of eyes or loss of vision", "Pain below the right ribs or under the breastbone", "Hyperreflexia or muscular twitching / convulsions"]
    },
    {
      key: "garbhasrava",
      name: "Vaginal Bleeding / Spotting (Garbhasrava / Garbhapata / APH)",
      symptom: "Any vaginal bleeding, spotting, brown discharge, or clots with or without lower abdominal cramps or backache",
      severity: "emergency",
      sa: "आ चतुर्थात् मासात् स्रवति गर्भो विसर्जितः ततः परं पतति गर्भपातः",
      iast: "ā caturthān māsāt sravati garbho visarjitaḥ tataḥ paraṃ patati garbhapātaḥ",
      hi: "चौथे माह तक गर्भ के निष्कासन को 'गर्भस्राव' तथा पाँचवें-छठे माह में 'गर्भपात' कहते हैं। रक्तस्राव इसका प्रमुख लक्षण है।",
      en: "Expulsion of the conception product up to the 4th month is Garbhasrava (unformed); from 5th month onwards it is Garbhapata. Vaginal bleeding in any trimester is an acute clinical warning sign requiring absolute physical rest, Garbhasthapaka therapy (Shatavari, Yashtimadhu, Lodhra, Ashoka), and urgent ultrasound evaluation.",
      ref: "Charaka Samhita, Sharira Sthana 8.24; Sushruta Samhita, Sharira Sthana 8.10",
      dcdutta: "ANY vaginal bleeding in pregnancy is an emergency. 1st Trimester: Threatened abortion, inevitable/incomplete abortion, ectopic pregnancy, or molar pregnancy (needs TVS ultrasound, serum beta-hCG, Rh typing). 2nd & 3rd Trimester: Antepartum Haemorrhage (APH) due to Placenta Praevia (painless bright red bleeding) or Abruptio Placentae (painful dark bleeding with tense woody uterus). NEVER perform a digital vaginal examination. Immediate emergency hospital transfer with IV access.",
      actions: [
        "Rest completely flat in bed immediately; avoid all walking, climbing, and exertion.",
        "Do NOT perform or allow any digital internal/vaginal examination.",
        "Check maternal Rh blood group: Rh-negative mothers need Anti-D Immunoglobulin within 72 hours.",
        "Transport urgently to the nearest obstetric hospital for immediate ultrasound and fetal heart check."
      ],
      redFlags: ["Fresh red bleeding with or without pain", "Passage of clots or fleshy tissue PV", "Bleeding after 24 weeks gestation (suspected Placenta Praevia / Abruptio)"]
    },
    {
      key: "garbha_spandana",
      name: "Reduced / Absent Fetal Movement (Garbha Spandana Mandata)",
      symptom: "Fewer than 10 fetal kicks/movements in 12 hours, sudden drop in usual movement pattern, or no movement felt for >2 hours after meals",
      severity: "emergency",
      sa: "गर्भस्पन्दनहानिः गर्भोपरोधं प्राणसंशयं च सूचयति",
      iast: "garbhaspandanahāniḥ garbhoparodhaṃ prāṇasaṃśayaṃ ca sūcayati",
      hi: "गर्भ में स्पन्दन की कमी या अभाव गर्भ के संकट तथा प्राण-संशय का गंभीर लक्षण है।",
      en: "Garbha Spandana Mandata (cessation or marked reduction of fetal movement) indicates Garbhoparodha (fetal distress, hypoxia, or compromise of Prana). The mother should immediately lie on her left side, take a cool sweet drink, and if movements remain reduced, seek emergency fetal monitoring.",
      ref: "Sushruta Sha. 3; Charaka Sha. 8 (Garbhini Vihara)",
      dcdutta: "Fetal movements are a primary indicator of fetal well-being. 'Kick-count' (Cardiff count-to-ten method): mother should perceive ≥10 distinct movements in 12 hours (or ≥3 movements within 1 hour after meals in left lateral rest). Reduced fetal movements (<10/12h or subjective reduction) is associated with uteroplacental insufficiency, oligohydramnios, cord compression, or fetal growth restriction (IUGR). Immediate evaluation required: Non-Stress Test (NST), Modified Biophysical Profile (BPP), and Umbilical Artery Doppler ultrasound.",
      actions: [
        "Lie down immediately on your LEFT side in a quiet room.",
        "Drink a glass of cold water or sweet fruit juice and place your hands on your abdomen for 1 hour.",
        "Count distinct kicks, rolls, and flutters. If fewer than 3 movements in 1 hour or <10 in 12 hours, go to hospital immediately.",
        "Do NOT wait until the next scheduled clinic visit."
      ],
      redFlags: ["No fetal movement felt all morning or day", "Fewer than 10 movements in a 12-hour window", "A sudden frantic burst of movements followed by complete cessation"]
    },
    {
      key: "pandu",
      name: "Garbhini Pandu (Antenatal Anemia)",
      symptom: "Extreme fatigue, paleness of conjunctiva/palms/tongue, breathlessness on mild exertion, dizziness, palpitations",
      severity: "clinical",
      sa: "गर्भाहारपोषणात् मातुः रसादीनां क्षये पाण्डुत्वमापद्यते",
      iast: "garbhāhārapoṣaṇāt mātuḥ rasādīnāṃ kṣaye pāṇḍutvam āpadyate",
      hi: "गर्भ के सतत पोषण से माता के रस-रक्त धातुओं का क्षय होकर पाण्डु रोग (एनीमिया) होता है।",
      en: "Garbhini Pandu occurs because the growing Garbha continuously extracts Rasa and Rakta Dhatu from the mother. The mother exhibits Vivarnata (paleness), Daurbalya (weakness), and Hrid-drava (palpitations). Regimen: Draksha, Dadima, Kharjura (dates), beetroot, spinach, amla, and classical supervised formulations (Dhatri Lauha, Punarnava Mandura).",
      ref: "Charaka Samhita, Chikitsa Sthana 16; Sushruta Samhita, Uttara Tantra 44",
      dcdutta: "Anemia in pregnancy is defined by WHO as Haemoglobin <11.0 g/dl in 1st & 3rd trimester (<10.5 g/dl in 2nd trimester). Physiological hemodilution occurs as maternal plasma volume expands by 50% while RBC mass increases by only 25–30%. Severity grading: Mild (10–10.9 g/dl), Moderate (7–9.9 g/dl), Severe (<7 g/dl), Decompensated / Very Severe (<4 g/dl). Risks: maternal heart failure, preterm labor, PPH, sepsis, low birth weight (LBW). Prophylaxis: 100 mg elemental iron + 500 mcg folic acid for 100 days from 14 weeks. Severe anemia requires parenteral IV iron (ferric carboxymaltose) or packed RBC transfusion.",
      actions: [
        "Check complete blood count (CBC) and serum ferritin levels with your doctor.",
        "Take iron-folic acid supplements 2 hours after meals with vitamin C rich fruits (amla, oranges, sweet lime) to maximize absorption.",
        "Do NOT drink tea, coffee, or milk with iron supplements as calcium and tannins inhibit iron absorption.",
        "Include dates, soaked raisins, cooked spinach, pomegranate, and beetroot in daily diet."
      ],
      redFlags: ["Hemoglobin < 7 g/dl", "Shortness of breath even while resting or lying flat", "Chest pain, irregular heartbeat, or fainting spells"]
    },
    {
      key: "vibandha",
      name: "Garbhini Vibandha (Constipation & Hemorrhoids / Arsha)",
      symptom: "Infrequent hard dry stools (<3 bowel movements/week), painful defecation, abdominal bloating, rectal bleeding or piles",
      severity: "clinical",
      sa: "गर्भापीडितकोष्ठत्वात् वातस्य विलोमत्वात् विबन्धो भवति",
      iast: "garbhāpīḍitakoṣṭhatvāt vātasya vilomatvāt vibandho bhavati",
      hi: "गर्भ के भार से कोष्ठ के दबने तथा अपान वात के प्रतिलोम होने से गर्भिणी को विबन्ध (कब्ज) होता है।",
      en: "Garbhini Vibandha arises from anatomical pressure of the expanding fetus upon the Pakvashaya (colon) and physiological upward vitiation (Vilomatva) of Apana Vata. Classical treatment: Warm cow's milk with 1–2 teaspoons of pure cow ghee at night, soaked Munakka (black raisins), high-fiber dietary grains (Dalia, oats, whole wheat), and avoiding harsh purgatives.",
      ref: "Charaka Samhita, Sharira Sthana 8; Sushruta Samhita, Sharira Sthana 10",
      dcdutta: "Constipation affects ~40% of pregnant women due to progesterone-mediated smooth muscle relaxation delaying colonic transit time, mechanical compression of the rectosigmoid junction by the gravid uterus, and the astringent side-effect of oral iron supplements. Straining at stool exacerbates hemorrhoids (piles) and pelvic floor weakness. Management: high dietary fiber (25–30 g/day), liberal water intake (2.5–3 L/day), physical activity, stool bulkers (Ispaghula husk / Psyllium) or osmotic laxatives (lactulose). AVOID stimulant laxatives (senna, castor oil) which can provoke uterine contractions.",
      actions: [
        "Drink 1 cup of warm boiled cow's milk with 1–2 tsp of cow's ghee at bedtime.",
        "Eat 8–10 soaked black raisins (Munakka) with warm water in the early morning.",
        "Increase fluid intake to 2.5–3 litres daily and consume whole grains and cooked vegetables.",
        "Never strain at stool; consult doctor if there is fresh rectal bleeding or severe hemorrhoidal pain."
      ],
      redFlags: ["Severe abdominal pain with complete inability to pass flatus or stool (intestinal obstruction)", "Persistent bright red rectal bleeding with defecation", "Protruding thrombosed painful hemorrhoidal mass"]
    },
    {
      key: "mutrakrichhra",
      name: "Mutrakrichhra (Dysuria, Burning Micturition & Antenatal UTI)",
      symptom: "Pain or burning sensation during urination, increased frequency, urgency, lower abdominal pain, cloudy or foul-smelling urine, fever",
      severity: "urgent",
      sa: "वातपित्तोद्भवं मूत्रकृच्छ्रं गर्भिण्यां दाहवेदनायुक्तम्",
      iast: "vātapittodbhavaṃ mūtrakṛcchraṃ garbhiṇyāṃ dāhavedanāyuktam",
      hi: "गर्भिणी में दाह और तीव्र वेदना युक्त मूत्रकृच्छ्र वात-पित्त प्रकोप से उत्पन्न होता है।",
      en: "Mutrakrichhra in pregnancy is an inflammatory Vata-Pitta disorder of the Mutravaha Srotas. Regimen: Gokshura kwatha/water, barley water (Yava udaka), tender coconut water, coriander seed water (Dhanyaka hima), and strict genital hygiene. Must be investigated for bacterial UTI to prevent ascending pyelonephritis.",
      ref: "Charaka Chi. 26; Sushruta Uttara. 59; Harita Samhita 3",
      dcdutta: "Urinary Tract Infection (UTI) is the most common bacterial infection in pregnancy (asymptomatic bacteriuria in 2–10%, acute cystitis in 1–2%, acute pyelonephritis in 1–2%). Physiological hydronephrosis and ureteric dilatation caused by progesterone and right-sided dextrorotation of the gravid uterus lead to urinary stasis. Untreated asymptomatic bacteriuria progresses to acute pyelonephritis in 30% of cases and carries high risk of preterm labor and low birth weight. Management: midstream clean-catch urine routine and culture-sensitivity; oral antibiotics (nitrofurantoin, amoxicillin-clavulanate, cephalexin) for 5–7 days; liberal hydration.",
      actions: [
        "Drink plenty of fluids: 3 litres of water, coconut water, and barley water daily.",
        "Collect a clean-catch midstream urine sample for routine microscopy and culture-sensitivity test.",
        "Do NOT delay or hold back the urge to urinate (avoid Mutra-vega dharana).",
        "Take prescribed pregnancy-safe antibiotics under doctor supervision; do not stop mid-course."
      ],
      redFlags: ["High fever with chills and shivering", "Loin pain or severe flank tenderness (suspected Acute Pyelonephritis)", "Visible blood in urine (hematuria)"]
    },
    {
      key: "garbhini_jwara",
      name: "Garbhini Jwara (Maternal Pyrexia & Infection in Pregnancy)",
      symptom: "Maternal body temperature >38 °C (100.4 °F), chills, body ache, shivering, malaise, fetal tachycardia",
      severity: "urgent",
      sa: "ज्वरस्तु गर्भिण्याः कष्टतमो भवति गर्भविनाशनः",
      iast: "jvarastu garbhiṇyāḥ kaṣṭatamo bhavati garbhavināśanaḥ",
      hi: "गर्भिणी का ज्वर अत्यंत कष्टप्रद होता है तथा यह गर्भ के लिए हानिकारक एवं विनाशक हो सकता है।",
      en: "Garbhini Jwara is designated as the most hazardous Upadrava because prolonged high heat (Ushna Virya / Pitta) affects maternal Agni, crosses the placental barrier, and causes Garbhopaghata (fetal tachycardia, oligohydramnios, or miscarriage). Safe paracetamol, cooling lukewarm sponge, Shunthi-Dhanyaka boiled water, and immediate etiology diagnosis are imperative.",
      ref: "Harita Samhita 3.50; Charaka Chi. 3; Kashyapa Khila Sthana",
      dcdutta: "Maternal pyrexia >38 °C (100.4 °F) increases maternal metabolic rate, leads to maternal dehydration, and elevates fetal baseline heart rate (>160 bpm). Hyperthermia in early pregnancy (1st trimester) is associated with neural tube defects; in late pregnancy, it triggers preterm contractions and chorioamnionitis. Endemic infections like Malaria, Dengue, Hepatitis E, and Typhoid carry markedly higher morbidity and mortality in pregnancy. Immediate full infection workup (CBC, blood smear, dengue NS1/IgM, blood culture, urine culture). Safe antipyretic: Paracetamol (acetaminophen) 500–1000 mg 6-hourly (avoid NSAIDs / aspirin).",
      actions: [
        "Use lukewarm water sponge over forehead, neck, and limbs to gently bring down temperature.",
        "Take safe Paracetamol under clinician recommendation; NEVER take ibuprofen, aspirin, or unprescribed antibiotics.",
        "Maintain continuous oral hydration with ORS, coconut water, and boiled water.",
        "Consult your obstetrician immediately for blood tests to rule out malaria, dengue, or bacterial infection."
      ],
      redFlags: ["Temperature >38.5 °C (101.3 °F) or high fever with shivering", "Fever accompanied by foul-smelling vaginal discharge or uterine tenderness", "Fever with rash, jaundice, or breathlessness"]
    },
    {
      key: "srava",
      name: "Watery Leak PV / PPROM (Garbhodaka Srava)",
      symptom: "Sudden gush or continuous trickling of watery fluid from the vagina before 37 weeks, distinct from urine",
      severity: "emergency",
      sa: "गर्भप्रस्रवे गर्भोदकनिर्गमे गर्भोपरोधः सूतिकाले च संशयः",
      iast: "garbhaprasrave garbhodakanirgame garbhoparodhaḥ sūtikāle ca saṃśayaḥ",
      hi: "समय से पूर्व गर्भोदक (एम्नियोटिक द्रव) के निकल जाने से गर्भ में संकोच, संक्रमण तथा संकट होता है।",
      en: "Premature rupture and leaking of amniotic fluid (Garbhodaka Srava) compromises the fluid cushion around the fetus, exposes the uterine cavity to ascending infection, and precipitates preterm delivery.",
      ref: "Sushruta Sha. 10; Charaka Sha. 8 (Prasava-vyapad)",
      dcdutta: "Preterm Premature Rupture of Membranes (PPROM): rupture of chorioamniotic membranes before 37 completed weeks of gestation. Diagnosis: sterile speculum examination showing pooling of clear fluid in posterior vaginal fornix; Nitrazine paper test turns blue (alkaline pH >6.5); Fern test positive under microscope. Risks: ascending chorioamnionitis, cord prolapse, abruptio placentae, oligohydramnios, neonatal sepsis, respiratory distress syndrome (RDS). Management: emergency hospital admission, maternal temperature and vitals monitoring, prophylactic antibiotics (Erythromycin / Ampicillin), antenatal corticosteroid (Betamethasone 12 mg IM 2 doses 24h apart) for fetal lung maturation if <34 weeks, fetal monitoring.",
      actions: [
        "Go immediately to the maternity labor room; wear a clean sanitary pad to assess fluid color and amount.",
        "Do NOT insert tampons, do NOT have sexual intercourse, and do NOT take a bath in a tub.",
        "Check whether fluid is clear, greenish (meconium stained), or has a foul odor.",
        "Lie down during transport to minimize fluid loss and risk of umbilical cord prolapse."
      ],
      redFlags: ["Continuous uncontrollable leaking of warm clear or pinkish fluid", "Fluid has a green, brown, or foul-smelling appearance", "Leaking accompanied by fever or regular lower back contractions"]
    }
  ];

  /* ---------------- Sutika Paricharya (Postnatal 45 days) ---------------- */
  const SUTIKA = {
    intro: "Sutika Paricharya is the 45-day (Sutika-kala = 6 weeks) postnatal regimen. Classical goal: restore Agni, pacify aggravated Vata, rebuild Dhatu, and promote lactation (Stanyajanana).",
    steps: [
      { name: "Snehapana (Internal oleation)", sa: "प्रसूतां स्नेहं पाययेत् पिप्पलीपिप्पलीमूलचव्यचित्रकशुण्ठीभिः", iast: "prasūtāṃ snehaṃ pāyayet pippalī-pippalīmūla-cavya-citraka-śuṇṭhībhiḥ", hi: "प्रसव के बाद पिप्पली, पिप्पलीमूल, चव्य, चित्रक, शुण्ठी से सिद्ध स्नेह (घृत/तैल) का सेवन कराएँ।", en: "After delivery give Sneha (ghee/oil) processed with Panchakola (Pippali, Pippalimula, Chavya, Chitraka, Shunthi) to restore Agni and Vata.", ref: "Ch. Sha. 8.50–51; Su. Chi. 18 ; A.H. Sha. 1 (Sutika)", detail: "Dose: 15–30 ml warm ghee/Taila with Panchakola on day 1–3; continued as Snehapana/Yavagu under physician for 3–7 days." },
      { name: "Panchakola / Pippalyadi Yavagu", sa: "पिप्पल्यादिगणसिद्धा यवागूः क्षुधिताय प्रदेया", iast: "pippalyādigaṇasiddhā yavāgūḥ kṣudhitāya pradeyā", hi: "भूख लगने पर पिप्पल्यादि गण से सिद्ध यवागू दें।", en: "Pippalyadi Yavagu (spiced rice gruel with Panchakola and ghee) kindles Agni and prepares for gradual diet.", ref: "Ch. Sha. 8.51; A.H. Sha. 1 (Sutika Paricharya)", detail: "Warm Yavagu: rice + water + Pippali, Shunthi, Maricha pinch + ghee. Day 1–3 (light diet), then Ahara-krama." },
      { name: "Udaraveshtana (Abdominal Binding)", sa: "उदरं वस्त्रेण वेष्टयेत् वातप्रकोपनिवारणाय", iast: "udaraṃ vastreṇa veṣṭayet vātaprakopanivāraṇāya", hi: "वात प्रकोप को रोकने के लिए पेट को वस्त्र से लपेटें।", en: "Bind the abdomen with a clean cloth to prevent Vata aggravation, support the uterus and reduce visceroptosis.", ref: "Ch. Sha. 8.52; Su. Chi. 10", detail: "Soft cotton binder, snug not tight; remove if breathlessness, wound pain (C-section — only on doctor’s advice). Pelvic-floor exercises." },
      { name: "Abhyanga & Ushna-Jala Pariseka", sa: "बलातैलेनाभ्यङ्गः कोष्णेन वातघ्नक्वाथेन परिषेकः", iast: "balātailenābhyaṅgaḥ koṣṇena vātaghnakvāthena pariṣekaḥ", hi: "बलातैल से अभ्यंग तथा हल्के गर्म वातनाशक क्वाथ से परिषेक।", en: "Abhyanga with Bala taila (or Dhanvantaram) and warm Pariseka with Dashamula / Vatahara decoction — relieves body-ache and Vata.", ref: "Ch. Sha. 8.52; Su. Chi. 10", detail: "Daily gentle body massage and warm-water bath 30 min after oil, 10–45 days; avoid wetting wound (episiotomy/LSCS) before healing; avoid cold water." },
      { name: "Ahara Krama (Gradual diet)", sa: "क्रमेण लघ्वाहारं स्निग्धमुष्णं सेवेत", iast: "krameṇa laghv-āhāraṃ snigdham uṣṇaṃ seveta", hi: "क्रम से लघु, स्निग्ध एवं उष्ण आहार लें।", en: "Gradual return from liquid Yavagu → Vilepi → soft rice with ghee → full meals; unctuous and warm.", ref: "Ch. Sha. 8.51–53; A.H. Sha. 1", detail: "Day 1–3: Yavagu/Manda; Day 4–7: Vilepi, moong-khichdi with ghee, dal-soup; Day 8–21: rice-dal-ghee, Mamsa-rasa/dal, seasonal vegetables, Methi-ladoo; Day 22–45: regular balanced diet with galactagogues, Dashamularishta/Jeerakarishta (as prescribed)." },
      { name: "Stanyajanana (Galactagogues)", sa: "शतावरीविदारीजीरकमेथिकाशतपुष्पादयः स्तन्यजननाः", iast: "śatāvarī-vidārī-jīrakam-ethikā-śatapuṣpādayaḥ stanyajananāḥ", hi: "शतावरी, विदारी, जीरक, मेथी, शतपुष्पा आदि स्तन्यवर्धक हैं।", en: "Shatavari, Vidari, Jeeraka, Methika, Shatapushpa (dill), Yashtimadhu, Draksha, milk, ghee and warm soups increase breast-milk (Stanyajanana).", ref: "Su. Sha. 10.31–35 (Stanya-sampat / Stanyavardhaka); Kashyapa Sa., Khila Sthana", detail: "Shatavari-kalpa 1 tsp with milk, Jeeraka-Methi water, garlic-milk (if suited), oats/dalia, ample fluids 3 L, adequate rest and skin-to-skin; consult physician for formulations." },
    ],
    phases: [
      { day: "Day 0–3", focus: "Agni-deepana & Vata-shamana", plan: "Warm Panchakola-Yavagu, ghee 15–30 ml, warm water, bed-rest, abdominal binding, early colostrum feeding, perineal care." },
      { day: "Day 4–7", focus: "Brimhana begins", plan: "Soft khichdi with ghee, Mamsa-rasa/dal soup, Abhyanga with Bala taila, Pariseka, Jeeraka-Methi water." },
      { day: "Day 8–21", focus: "Rasayana & lactation", plan: "Methi-ladoo, Shatavari-kalpa, Dashamula-siddha ksheera, gentle walking, Kegel, sunlight 15 min." },
      { day: "Day 22–45", focus: "Return to Natural Baseline Health", plan: "Normal diet with Stanyajanana foods, Pranayama, postnatal exercise, contraceptive counselling; Garbhashaya shodhana — Ashoka-ghrita/Dashamularishta only on advice." },
    ],
    avoid: ["Cold water, cold wind, AC drafts, damp floors", "Heavy exertion, stair-climbing, lifting weights, intercourse before 6 weeks", "Day-sleep (excess), night vigil, anger & grief", "Dry, Ruksha, Vata-aggravating food; fasting", "Self-medicated herbs / unsupervised fenugreek in diabetic or bleeding disorders"],
    dcdutta: { title: "Puerperium & Lactation (6 weeks)", text: "Puerperium = from delivery of placenta to 6 weeks. Uterine involution (fundus descends ~1 cm/day; non-palpable per abdomen by day 10–14), lochia: rubra (days 1–4) → serosa (5–9) → alba (10–15+). Exclusive breastfeeding for 6 months, initiate within 1 hour; extra 500 kcal/day; iron + folic acid 100 days post-partum, calcium 500 mg BD for 6 months. Postnatal visits: within 24 h, day 3, day 7, week 6; LAM and contraception counselling; postnatal exercises (Kegel, pelvic tilt)." },
    redFlags: ["Postpartum haemorrhage — soaking >1 pad/hr, clots, dizziness", "Fever >38 °C, foul lochia, lower-abdominal pain (puerperal sepsis)", "Breast engorgement/mastitis, cracked nipples, breast abscess", "Calf pain or swelling, breathlessness (DVT / PE)", "Severe headache / BP rise (postpartum eclampsia)", "Persistent low mood, anxiety, thoughts of self-harm (postpartum depression)", "C-section wound redness, discharge, dehiscence"],
  };

  /* ---------------- Navajata Shishu Paricharya (Newborn) ---------------- */
  const NAVAJATA = {
    intro: "Navajata Shishu Paricharya covers care from the first minutes of life. Classical steps (Ch. Sha. 8.37–46; Su. Sha. 10.12–22; A.H. Sha. 1 Jatakarma; Kashyapa Kalpa/Sutra) closely parallel modern Essential Newborn Care (WHO/NRP/IAP).",
    steps: [
      { name: "Ulva Parimarjana (Clearing the birth fluid)", sa: "जातमात्रस्य उल्वपरिमार्जनं कर्तव्यम् — मुखनासास्रोतांसि शोधयेत्", iast: "jātamātrasya ulvaparimārjanaṃ kartavyam — mukhanāsāsrotāṃsi śodhayet", hi: "जन्म लेते ही शिशु के मुख-नासा आदि से उल्व (गर्भोदक/कफ) को साफ़ करें।", en: "Wipe vernix, amniotic fluid and mucus from the face, mouth and nostrils with clean soft cotton to clear the airway.", ref: "Su. Sha. 10.12; Ch. Sha. 8.37", modern: "Dry & stimulate (rub back/feet); suction only if airway obstructed; place on mother’s chest skin-to-skin (Initial steps of NRP — first 30 s)." },
      { name: "Pranapratyagamana (Resuscitation)", sa: "प्राणप्रत्यागमनार्थं शिशुं कर्णमूले ... उष्णोदकेन शीतोदकेन सेचयेत्", iast: "prāṇapratyāgamanārthaṃ śiśuṃ karṇamūle ... uṣṇodakena śītodakena secayet", hi: "यदि शिशु न रोए तो कान के पास शब्द, जल के छींटे तथा श्वास-पुनःस्थापन उपाय करें।", en: "If the baby does not cry/breathe, stimulate: sound near the ear, alternating warm-cool water sprinkling and restore respiration (Pranapratyagamana).", ref: "Ch. Sha. 8.38; Su. Sha. 10.13", modern: "NRP: warm, dry, position, clear airway, stimulate; bag-and-mask ventilation within the Golden Minute if apnoea/HR<100; chest compressions if HR<60 despite effective ventilation; APGAR at 1 & 5 min." },
      { name: "Nalakartana (Cord cutting)", sa: "नाभिनालं अष्टाङ्गुलमुत्सृज्य छिन्द्यात् सूत्रेण बध्वा", iast: "nābhinālaṃ aṣṭāṅgulam utsṛjya chindyāt sūtreṇa baddhvā", hi: "नाभिनाल को लगभग आठ अंगुल छोड़कर सूत्र से बाँधकर काटें।", en: "Tie the cord and cut it leaving about 8 Angula (Charaka/Sushruta: at a measured distance from the umbilicus) with clean instrument.", ref: "Su. Sha. 10.14; Ch. Sha. 8.37", modern: "Delayed cord clamping 1–3 min if baby vigorous; clamp and cut with sterile instruments ~2–3 cm from umbilicus; dry cord care — no application of ghee, cow-dung or powders; hand-hygiene." },
      { name: "Jatakarma — Madhu-Ghrita Prashana", sa: "मधुसर्पिषी अनन्तमूलीसिद्धे प्राशयेत् जातमात्रं स्वर्णघृष्टम्", iast: "madhusarpiṣī anantamūlasiddhe prāśayet jātamātraṃ svarṇaghṛṣṭam", hi: "जातकर्म में मधु-घृत (स्वर्ण घिसकर) का प्राशन कराया जाता है।", en: "Classical Jatakarma: honey and ghee (with gold rubbed — Swarna Prashana) given before the breast; Sushruta lists a lick of Madhu-ghrita-Ananta.", ref: "Ch. Sha. 8.46; Su. Sha. 10.17; A.H. Sha. 1.", modern: "⚠️ WHO/DC Dutta: NO pre-lacteal feeds — exclusive breastfeeding within 1 hour; honey carries risk of infant botulism (<12 months). Do Madhu-Ghrita ONLY if prescribed by physician; colostrum is the first food." },
      { name: "Early Stanyapana (Colostrum feeding)", sa: "प्रथमं स्तन्यं मात्रा देयं यथाकालं", iast: "prathamaṃ stanyaṃ mātrā deyaṃ yathākālaṃ", hi: "जन्म के बाद पहले घंटे में माता का दूध (कोलोस्ट्रम) शिशु को दें।", en: "Early suckling with colostrum — Sushruta/Kashyapa advise first Stanya after proper purification; colostrum is the baby’s first immunisation.", ref: "Su. Sha. 10.18; Kashyapa Sa., Kalpa/Sutra Sthana", modern: "Breastfeed within 1 h; exclusive breastfeeding to 6 months; on-demand 8–12 feeds/day; correct latch; rooming-in." },
      { name: "Rakshakarma (Protective Hygiene)", sa: "रक्षोघ्नैर्धूपनैः सूतिकागारं रक्षेत्", iast: "rakṣoghnair dhūpanaiḥ sūtikāgāraṃ rakṣet", hi: "रक्षोघ्न धूपन से सूतिकागार तथा शिशु की रक्षा करें।", en: "Protect the baby and the Sutikagara with Rakshoghna Dhupana (fumigation with Guggulu, Sarshapa, Vacha), cleanliness and avoidance of visitors — infection control (Rakshoghna).", ref: "Ch. Sha. 8; Su. Sha. 10; Kashyapa Sa. Kalpa Sthana", modern: "Hand-washing, clean delivery room, limit visitors, kangaroo mother care, clean cord stump, avoid sick contacts, skin-to-skin; keep room well-ventilated (fumigation only with good ventilation, not near the infant’s face)." },
      { name: "Abhyanga, Snana & Rakshana", sa: "तैलाभ्यङ्गः कोष्णजलस्नानं च शिशोः", iast: "tailābhyaṅgaḥ koṣṇajalasnānaṃ ca śiśoḥ", hi: "शिशु को हल्के तेल से अभ्यंग एवं गुनगुने जल से स्नान कराएँ।", en: "Gentle oil massage and a warm-water bath; keep the baby warm (Ushna-Ghara).", ref: "Su. Sha. 10; A.H. Sha. 1", modern: "Delay first bath ≥24 h (WHO); then warm water; massage with mustard/sesame/coconut oil if no skin issue; maintain warm chain (room temp 25–28 °C), cover head; weigh and check temperature." },
    ],
    modern: { title: "Essential Newborn Care (DC Dutta / WHO / NRP)", text: "Dry & warm, clear airway, APGAR, delayed cord clamping, skin-to-skin, breastfeeding within 1 hour, Vitamin K 1 mg IM, BCG + OPV-0 + Hepatitis-B birth dose, eye-care, weight; no pre-lacteal feeds; exclusive breastfeeding for 6 months; kangaroo care for LBW; monitor jaundice, feeding, temperature, breathing; schedule check-ups on day 3, 7 and 6 weeks; immunisation per UIP/IAP." },
    redFlags: ["Not feeding well / refusing breast", "Fast breathing (>60/min), grunting, chest indrawing, central cyanosis", "Fever >37.5 °C or hypothermia <36.5 °C", "Jaundice within 24 h or reaching palms/soles", "Convulsions, lethargy, floppy baby", "Cord stump redness/pus, umbilical discharge", "No urine in 24 h or no meconium within 48 h"],
  };

  /* ---------------- Garbha Vriddhi (embryology / monthly fetal growth) ---------------- */
  const GARBHA_VRIDDHI = [
    { n: 1, samhita: "charaka", sa: "प्रथमे मासि संमूर्छितः सर्वधातुकलुषीकृतः खेटभूतो गर्भो भवत्यव्यक्तविग्रहः", iast: "prathame māsi saṃmūrchitaḥ sarvadhātukaluṣīkṛtaḥ kheṭabhūto garbho bhavaty avyaktavigrahaḥ", hi: "पहले माह में गर्भ सम्मूर्छित, सभी धातुओं से मिश्रित, कलल अवस्था में अव्यक्त स्वरूप का होता है।", en: "Month 1: the embryo is a fused, unmanifest mass (Kalala, Kheta-bhuta) with all Dhatu mixed — no distinct form.", ref: "Ch. Sha. 4.20; Su. Sha. 3" },
    { n: 2, samhita: "charaka", sa: "द्वितीये मासि घनः संपद्यते पिण्डः पेशी अर्बुदं वा", iast: "dvitīye māsi ghanaḥ sampadyate piṇḍaḥ peśī arbudaṃ vā", hi: "दूसरे माह में गर्भ घन होकर पिण्ड (पुरुष), पेशी (स्त्री) अथवा अर्बुद (नपुंसक) का रूप लेता है।", en: "Month 2: the embryo condenses — Pinda (male), Peshi (female) or Arbuda (napumsaka).", ref: "Ch. Sha. 4.20" },
    { n: 3, samhita: "charaka", sa: "तृतीये मासे सर्वेन्द्रियाणि सर्वाङ्गावयवाश्च युगपत्प्रव्यक्ततरा भवन्ति", iast: "tṛtīye māse sarvendriyāṇi sarvāṅgāvayavāś ca yugapat pravyaktatarā bhavanti", hi: "तीसरे माह में सभी इन्द्रियाँ तथा अंग-प्रत्यंग एक साथ प्रकट होने लगते हैं।", en: "Month 3: all sense-organs and body parts become manifest simultaneously; Sushruta — five buds: two arms, two legs and head.", ref: "Ch. Sha. 4.20; Su. Sha. 3 (Garbhavyakarana)" },
    { n: 4, samhita: "charaka", sa: "चतुर्थे मासे स्थिरत्वमापद्यते गर्भः; हृदयस्य व्यक्तीभावः — द्विहृदया नारी दौहृदिनी", iast: "caturthe māse sthiratvam āpadyate garbhaḥ; hṛdayasya vyaktībhāvaḥ — dvihṛdayā nārī dauhṛdinī", hi: "चौथे माह में गर्भ स्थिर होता है तथा हृदय व्यक्त होता है; स्त्री द्विहृदया (दौहृदिनी) कहलाती है।", en: "Month 4: stability of the fetus; the heart manifests so the woman is Dvihridaya — she has Dauhrida (pregnancy cravings representing the fetus’s wishes).", ref: "Ch. Sha. 4.21; Su. Sha. 3 (Dauhrida)" },
    { n: 5, samhita: "charaka", sa: "पञ्चमे मासे गर्भस्य मांसशोणितोपचयो भवत्यधिकमन्येभ्यो मासेभ्यः; मनः प्रतिबुद्धतरम्", iast: "pañcame māse garbhasya māṃsaśoṇitopacayo bhavaty adhikam anyebhyo māsebhyaḥ; manaḥ pratibuddhataram", hi: "पाँचवें माह में गर्भ के मांस-शोणित की वृद्धि अन्य माहों से अधिक होती है; मन अधिक जागृत होता है।", en: "Month 5: maximal growth of Mamsa and Shonita; mind (Manas) becomes more awake; mother becomes lean.", ref: "Ch. Sha. 4.21" },
    { n: 6, samhita: "charaka", sa: "षष्ठे मासे गर्भस्य बलवर्णोपचयो भवत्यधिकमन्येभ्यो मासेभ्यः; बुद्धिः प्रतिबुद्धतरा", iast: "ṣaṣṭhe māse garbhasya balavarṇopacayo bhavaty adhikam anyebhyo māsebhyaḥ; buddhiḥ pratibuddhatarā", hi: "छठे माह में गर्भ के बल-वर्ण की सर्वाधिक वृद्धि होती है; बुद्धि अधिक जागृत होती है।", en: "Month 6: maximal increase in Bala and Varna; intellect (Buddhi) awakens; the mother loses strength and colour.", ref: "Ch. Sha. 4.21" },
    { n: 7, samhita: "charaka", sa: "सप्तमे मासे गर्भः सर्वैर्भावैराप्यायते", iast: "saptame māse garbhaḥ sarvair bhāvair āpyāyate", hi: "सातवें माह में गर्भ सभी भावों से पूर्ण रूप से परिपुष्ट होता है।", en: "Month 7: the fetus is fully endowed with all Bhavas; mother is most fatigued.", ref: "Ch. Sha. 4.21; Su. Sha. 3" },
    { n: 8, samhita: "sushruta", sa: "अष्टमे मासे गर्भमातृओजसोः सञ्चारित्वात् जातो न जीवति", iast: "aṣṭame māse garbhamātṛ-ojasoḥ sañcāritvāt jāto na jīvati", hi: "आठवें माह में गर्भ और माता के ओज के आदान-प्रदान से अस्थिरता रहती है; इस काल में जन्मा शिशु प्रायः नहीं जीता।", en: "Month 8: Ojas oscillates between mother and fetus (unstable) so a baby born now is vulnerable — special Ojas care.", ref: "Ch. Sha. 4.22; Su. Sha. 3; A.H. Sha. 1" },
    { n: 9, samhita: "charaka", sa: "नवमे दशमे एकादशे द्वादशे वा मासे प्रसवकालः", iast: "navame daśame ekādaśe dvādaśe vā māse prasavakālaḥ", hi: "नवें से बारहवें माह के बीच प्रसव-काल होता है।", en: "Month 9: the fetus is complete; Prasava-Kala (time of delivery) falls between the 9th and 12th month.", ref: "Ch. Sha. 4 ; Su. Sha. 3" },
  ];

  /* ---------------- DC Dutta correlations (library) ---------------- */
  const DCDUTTA = [
    { id: "dd-anc", title: "Antenatal Care Schedule", text: "Minimum 8 contacts (WHO 2016) / 4 ANC visits (India): monthly till 28 weeks, fortnightly 28–36, weekly after 36. Each visit: weight, BP, pallor, edema, fundal height, FHS, presentation, urine albumin/sugar. Investigations: Hb, blood group & Rh, HIV, HBsAg, VDRL, urine, blood sugar, TSH, USG (dating, NT, anomaly, growth).", cite: "DC Dutta — Antenatal Care" },
    { id: "dd-nutrition", title: "Nutrition & Supplements", text: "Extra 350 kcal/day (2nd) and 450 kcal (3rd trimester) beyond 2200 kcal; protein +23 g/day. Iron 100 mg elemental + folic acid 500 mcg from 14–16 weeks for 100 days; calcium 1 g/day; vitamin D 400–600 IU; iodine. Expected weight gain 10–12 kg in Indian women.", cite: "DC Dutta — Nutrition in Pregnancy" },
    { id: "dd-naegele", title: "EDD Calculation (Naegele's Rule)", text: "EDD = LMP + 9 months + 7 days (cycle-adjusted for 28-day cycle). Confirm by early USG (CRL at 7–13 weeks, ±5–7 days).", cite: "DC Dutta — Diagnosis of Pregnancy" },
    { id: "dd-labour", title: "Normal Labour & Sukhaprasava", text: "First stage: onset of true labour to full dilatation (primi ~12 h, multi ~6–8 h); second: full dilatation to delivery; third: delivery of placenta with Active Management (oxytocin 10 IU IM, controlled cord traction, uterine massage). Partograph monitoring.", cite: "DC Dutta — Normal Labour" },
  ];

  /* ---------------- Utility: dates, weeks, month, ritu ---------------- */
  function parseDate(s) { const d = new Date(s + "T00:00:00"); return isNaN(d) ? null : d; }
  function fmt(d) { return d.toISOString().slice(0, 10); }
  function gestationalWeeks(lmp, today) {
    const l = parseDate(lmp); if (!l) return null;
    const t = today ? new Date(today) : new Date();
    const days = Math.floor((t - l) / 86400000);
    return { days, weeks: Math.floor(days / 7), rem: days % 7 };
  }
  function monthFromWeeks(w) { return Math.max(1, Math.min(9, Math.floor(w / 4.345) + 1)); }
  function eddFromLmp(lmp) { const l = parseDate(lmp); if (!l) return null; const e = new Date(l.getTime() + 280 * 86400000); return fmt(e); }
  function trimesterOf(w) { return w < 14 ? 1 : w < 28 ? 2 : 3; }
  function rituFromDate(date) {
    const d = date ? new Date(date) : new Date();
    const half = d.getMonth() * 2 + (d.getDate() > 15 ? 1 : 0);
    if (half >= 1 && half <= 4) return "shishira";
    if (half >= 5 && half <= 8) return "vasanta";
    if (half >= 9 && half <= 12) return "grishma";
    if (half >= 13 && half <= 16) return "varsha";
    if (half >= 17 && half <= 20) return "sharad";
    return "hemanta";
  }
  function getRitu(key) { return RITUS.find((r) => r.key === key) || RITUS[0]; }
  function getMonth(n) { return MONTHS[Math.max(1, Math.min(9, n)) - 1]; }

  /* ---------------- Charaka & Sushruta Core Samhita RAG Corpus ---------------- */
  const SAMHITA_CORPUS = [
  {
    "month": 1,
    "ritu": null,
    "samhita": "charaka",
    "stage": "masanumasika",
    "sanskrit": "प्रथमे मासि शङ्कितायां स्त्रियां सात्म्यं यथेष्टं शीतं पयः पाययेत्",
    "iast": "prathame māsi śaṅkitāyāṃ striyāṃ sātmyaṃ yatheṣṭaṃ śītaṃ payaḥ pāyayet",
    "hindi": "पहले माह में गर्भ की आशंका होने पर सात्म्य के अनुसार ठंडा दूध इच्छानुसार पिलाएँ।",
    "english": "In the 1st month, once pregnancy is suspected, give milk as per Satmya — cold and as much as desired. Pathya: Sweet, cold & liquid-predominant diet (Madhura-Sheeta-Drava); Boiled-cooled milk, Laja-manda (puffed-rice water), coconut water; Shashtika / old rice, moong soup, ghee in small amount. Ksheera/Ghrita: Sheeta Ksheera (Anupaskrita) — Plain cow's milk, boiled then cooled, 150–200 ml in sips through the day as per Satmya. Not medicated, not heavy. Rationale: Early Kalala is delicate; cold-sweet-liquid food supports Rasa Dhatu and prevents Pitta-Vata aggravation and nausea, protecting implantation.",
    "citation": "Ch. Sha. 8.32 (Masanumasika Vidhi)",
    "dc_dutta": "Weeks 1–4 · Fertilisation, implantation & booking: Fertilisation in the ampulla, implantation on day 6–7, hCG detectable ~8–10 days post-ovulation; UPT positive at missed period. Confirm pregnancy, calculate EDD (Naegele: LMP + 9 months + 7 days), start folic acid 400 mcg (5 mg in high-risk), book ANC early, avoid teratogens (alcohol, tobacco, unsupervised drugs, radiation).",
    "red_flags": [
      "Bleeding PV with lower-abdominal pain (threatened abortion / ectopic)",
      "Severe one-sided pelvic pain or shoulder-tip pain",
      "Persistent vomiting with inability to retain fluids"
    ],
    "tags": [
      "masanumasika",
      "garbhini paricharya",
      "month 1",
      "diet",
      "pathya",
      "ksheera",
      "ghrita",
      "ahara",
      "charaka",
      "apathya: Fasting or long gaps between meals; Spicy, sour, fried and fermented food"
    ],
    "plan": {
      "stage": "Kalala",
      "weeks": "1–4",
      "trimester": 1,
      "fetal": "Samurchchhita (fertilised) Kalala — an unmanifest, jelly-like embryo (Khetabhuta, Avyakta-vigraha). Atma, Manas and the Panchamahabhuta join the Shukra-Shonita.",
      "ksheera": {
        "name": "Sheeta Ksheera (Anupaskrita)",
        "detail": "Plain cow's milk, boiled then cooled, 150–200 ml in sips through the day as per Satmya. Not medicated, not heavy."
      },
      "pathya": [
        "Sweet, cold & liquid-predominant diet (Madhura-Sheeta-Drava)",
        "Boiled-cooled milk, Laja-manda (puffed-rice water), coconut water",
        "Shashtika / old rice, moong soup, ghee in small amount",
        "Soaked raisins (Draksha) 5–6, dates 2, fennel-water",
        "Fresh seasonal fruit — pomegranate, sweet orange, banana",
        "Folic acid per doctor (400 mcg–5 mg)"
      ],
      "avoid": [
        "Fasting or long gaps between meals",
        "Spicy, sour, fried and fermented food",
        "Heavy lifting, long travel, jerky vehicles",
        "Coitus and hot-water full-body baths",
        "Papaya (raw), excess sesame, ajwain, fenugreek, pineapple"
      ],
      "rationale": "Early Kalala is delicate; cold-sweet-liquid food supports Rasa Dhatu and prevents Pitta-Vata aggravation and nausea, protecting implantation.",
      "tip": "For morning nausea (Chhardi): Laja-manda with a little honey & elaichi, dry toast, small frequent meals."
    },
    "id": "mp-m1-charaka",
    "title": "Charaka Samhita — Month 1 Garbhini Paricharya",
    "domain": "garbhini",
    "sanskrit_shloka": "प्रथमे मासि शङ्कितायां स्त्रियां सात्म्यं यथेष्टं शीतं पयः पाययेत्",
    "transliteration": "prathame māsi śaṅkitāyāṃ striyāṃ sātmyaṃ yatheṣṭaṃ śītaṃ payaḥ pāyayet",
    "hindi_meaning": "पहले माह में गर्भ की आशंका होने पर सात्म्य के अनुसार ठंडा दूध इच्छानुसार पिलाएँ।",
    "english_clinical_summary": "In the 1st month, once pregnancy is suspected, give milk as per Satmya — cold and as much as desired. Pathya: Sweet, cold & liquid-predominant diet (Madhura-Sheeta-Drava); Boiled-cooled milk, Laja-manda (puffed-rice water), coconut water; Shashtika / old rice, moong soup, ghee in small amount. Ksheera/Ghrita: Sheeta Ksheera (Anupaskrita) — Plain cow's milk, boiled then cooled, 150–200 ml in sips through the day as per Satmya. Not medicated, not heavy. Rationale: Early Kalala is delicate; cold-sweet-liquid food supports Rasa Dhatu and prevents Pitta-Vata aggravation and nausea, protecting implantation.",
    "dc_dutta_correlation": "Weeks 1–4 · Fertilisation, implantation & booking: Fertilisation in the ampulla, implantation on day 6–7, hCG detectable ~8–10 days post-ovulation; UPT positive at missed period. Confirm pregnancy, calculate EDD (Naegele: LMP + 9 months + 7 days), start folic acid 400 mcg (5 mg in high-risk), book ANC early, avoid teratogens (alcohol, tobacco, unsupervised drugs, radiation).",
    "keywords": [
      "masanumasika",
      "garbhini paricharya",
      "month 1",
      "diet",
      "pathya",
      "ksheera",
      "ghrita",
      "ahara",
      "charaka",
      "apathya: Fasting or long gaps between meals; Spicy, sour, fried and fermented food"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Month 1 me konsa ksheera-paka sabse labhadayak hai?",
      "Month 1 me DC Dutta ke anusaar konsa scan ya test karwayein?",
      "Month 1 ke classical red flags aur upadrava kya hain?"
    ]
  },
  {
    "month": 1,
    "ritu": null,
    "samhita": "sushruta",
    "stage": "masanumasika",
    "sanskrit": "प्रथमे मासि मधुरशीतद्रवप्रायमाहारं सेवेत",
    "iast": "prathame māsi madhuraśītadravaprāyam āhāraṃ seveta",
    "hindi": "प्रथम माह में मधुर, शीत एवं द्रव प्रधान आहार का सेवन करे।",
    "english": "In the 1st month, take a diet predominantly sweet, cold and liquid. Pathya: Sweet, cold & liquid-predominant diet (Madhura-Sheeta-Drava); Boiled-cooled milk, Laja-manda (puffed-rice water), coconut water; Shashtika / old rice, moong soup, ghee in small amount. Ksheera/Ghrita: Sheeta Ksheera (Anupaskrita) — Plain cow's milk, boiled then cooled, 150–200 ml in sips through the day as per Satmya. Not medicated, not heavy. Rationale: Early Kalala is delicate; cold-sweet-liquid food supports Rasa Dhatu and prevents Pitta-Vata aggravation and nausea, protecting implantation.",
    "citation": "Su. Sha. 10.4 (Garbhini Vyakarana)",
    "dc_dutta": "Weeks 1–4 · Fertilisation, implantation & booking: Fertilisation in the ampulla, implantation on day 6–7, hCG detectable ~8–10 days post-ovulation; UPT positive at missed period. Confirm pregnancy, calculate EDD (Naegele: LMP + 9 months + 7 days), start folic acid 400 mcg (5 mg in high-risk), book ANC early, avoid teratogens (alcohol, tobacco, unsupervised drugs, radiation).",
    "red_flags": [
      "Bleeding PV with lower-abdominal pain (threatened abortion / ectopic)",
      "Severe one-sided pelvic pain or shoulder-tip pain",
      "Persistent vomiting with inability to retain fluids"
    ],
    "tags": [
      "masanumasika",
      "garbhini paricharya",
      "month 1",
      "diet",
      "pathya",
      "ksheera",
      "ghrita",
      "ahara",
      "sushruta",
      "apathya: Fasting or long gaps between meals; Spicy, sour, fried and fermented food"
    ],
    "plan": {
      "stage": "Kalala",
      "weeks": "1–4",
      "trimester": 1,
      "fetal": "Samurchchhita (fertilised) Kalala — an unmanifest, jelly-like embryo (Khetabhuta, Avyakta-vigraha). Atma, Manas and the Panchamahabhuta join the Shukra-Shonita.",
      "ksheera": {
        "name": "Sheeta Ksheera (Anupaskrita)",
        "detail": "Plain cow's milk, boiled then cooled, 150–200 ml in sips through the day as per Satmya. Not medicated, not heavy."
      },
      "pathya": [
        "Sweet, cold & liquid-predominant diet (Madhura-Sheeta-Drava)",
        "Boiled-cooled milk, Laja-manda (puffed-rice water), coconut water",
        "Shashtika / old rice, moong soup, ghee in small amount",
        "Soaked raisins (Draksha) 5–6, dates 2, fennel-water",
        "Fresh seasonal fruit — pomegranate, sweet orange, banana",
        "Folic acid per doctor (400 mcg–5 mg)"
      ],
      "avoid": [
        "Fasting or long gaps between meals",
        "Spicy, sour, fried and fermented food",
        "Heavy lifting, long travel, jerky vehicles",
        "Coitus and hot-water full-body baths",
        "Papaya (raw), excess sesame, ajwain, fenugreek, pineapple"
      ],
      "rationale": "Early Kalala is delicate; cold-sweet-liquid food supports Rasa Dhatu and prevents Pitta-Vata aggravation and nausea, protecting implantation.",
      "tip": "For morning nausea (Chhardi): Laja-manda with a little honey & elaichi, dry toast, small frequent meals."
    },
    "id": "mp-m1-sushruta",
    "title": "Sushruta Samhita — Month 1 Garbhini Paricharya",
    "domain": "garbhini",
    "sanskrit_shloka": "प्रथमे मासि मधुरशीतद्रवप्रायमाहारं सेवेत",
    "transliteration": "prathame māsi madhuraśītadravaprāyam āhāraṃ seveta",
    "hindi_meaning": "प्रथम माह में मधुर, शीत एवं द्रव प्रधान आहार का सेवन करे।",
    "english_clinical_summary": "In the 1st month, take a diet predominantly sweet, cold and liquid. Pathya: Sweet, cold & liquid-predominant diet (Madhura-Sheeta-Drava); Boiled-cooled milk, Laja-manda (puffed-rice water), coconut water; Shashtika / old rice, moong soup, ghee in small amount. Ksheera/Ghrita: Sheeta Ksheera (Anupaskrita) — Plain cow's milk, boiled then cooled, 150–200 ml in sips through the day as per Satmya. Not medicated, not heavy. Rationale: Early Kalala is delicate; cold-sweet-liquid food supports Rasa Dhatu and prevents Pitta-Vata aggravation and nausea, protecting implantation.",
    "dc_dutta_correlation": "Weeks 1–4 · Fertilisation, implantation & booking: Fertilisation in the ampulla, implantation on day 6–7, hCG detectable ~8–10 days post-ovulation; UPT positive at missed period. Confirm pregnancy, calculate EDD (Naegele: LMP + 9 months + 7 days), start folic acid 400 mcg (5 mg in high-risk), book ANC early, avoid teratogens (alcohol, tobacco, unsupervised drugs, radiation).",
    "keywords": [
      "masanumasika",
      "garbhini paricharya",
      "month 1",
      "diet",
      "pathya",
      "ksheera",
      "ghrita",
      "ahara",
      "sushruta",
      "apathya: Fasting or long gaps between meals; Spicy, sour, fried and fermented food"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Month 1 me konsa ksheera-paka sabse labhadayak hai?",
      "Month 1 me DC Dutta ke anusaar konsa scan ya test karwayein?",
      "Month 1 ke classical red flags aur upadrava kya hain?"
    ]
  },
  {
    "month": 2,
    "ritu": null,
    "samhita": "charaka",
    "stage": "masanumasika",
    "sanskrit": "द्वितीये मासि मधुरौषधसिद्धं क्षीरम्",
    "iast": "dvitīye māsi madhurauṣadhasiddhaṃ kṣīram",
    "hindi": "दूसरे माह में मधुर औषधियों से सिद्ध दूध दें।",
    "english": "2nd month: milk medicated with Madhura (sweet) herbs. Pathya: Madhura Gana siddha milk (Shatavari-Yashtimadhu ksheerapaka); Rice-ghee, moong-khichdi, light vegetable soups; Lajasaktu with sugar-candy, pomegranate juice. Ksheera/Ghrita: Madhura-aushadha Siddha Ksheera — Milk boiled with Madhura Gana herbs (Shatavari + Yashtimadhu, or Jivaniya drugs) — 150 ml at bedtime, only after physician approval. Rationale: Madhura-Jivaniya drugs are Garbhasthapaka and Brimhana; they nourish the forming Pinda and settle Pitta that causes nausea and acidity.",
    "citation": "Ch. Sha. 8.32",
    "dc_dutta": "Weeks 5–8 · Embryonic period, organogenesis: Neural tube closes by day 28, heart tube beats from ~6 weeks (visible on TVS), limb buds appear — peak teratogenic sensitivity. Early dating USG confirms viability and site. Hyperemesis gravidarum: IV fluids, antiemetics, thiamine, correction of electrolytes if ketonuria.",
    "red_flags": [
      "Spotting / bleeding with passage of tissue",
      "Vomiting >5 times a day with weight loss or ketones",
      "Fever with rash (rubella, CMV, Zika risk)"
    ],
    "tags": [
      "masanumasika",
      "garbhini paricharya",
      "month 2",
      "diet",
      "pathya",
      "ksheera",
      "ghrita",
      "ahara",
      "charaka",
      "apathya: Katu-Tikshna-Ushna foods, excess tea/coffee (>200 mg caffeine/day); Day-time heavy sleep, night vigil"
    ],
    "plan": {
      "stage": "Pinda / Peshi / Arbuda (Ghana)",
      "weeks": "5–8",
      "trimester": 1,
      "fetal": "Kalala condenses into a Ghana mass: Pinda (male tendency), Peshi (female) or Arbuda (napumsaka) per Charaka. Sushruta describes Panchapindaka — five buds (head, two arms, two legs).",
      "ksheera": {
        "name": "Madhura-aushadha Siddha Ksheera",
        "detail": "Milk boiled with Madhura Gana herbs (Shatavari + Yashtimadhu, or Jivaniya drugs) — 150 ml at bedtime, only after physician approval."
      },
      "pathya": [
        "Madhura Gana siddha milk (Shatavari-Yashtimadhu ksheerapaka)",
        "Rice-ghee, moong-khichdi, light vegetable soups",
        "Lajasaktu with sugar-candy, pomegranate juice",
        "Ginger-cardamom water in small sips for nausea",
        "Vitamin B6 / ginger as advised for Chhardi"
      ],
      "avoid": [
        "Katu-Tikshna-Ushna foods, excess tea/coffee (>200 mg caffeine/day)",
        "Day-time heavy sleep, night vigil",
        "Strenuous exercise and suppression of natural urges",
        "Self-prescribed herbs or purgatives"
      ],
      "rationale": "Madhura-Jivaniya drugs are Garbhasthapaka and Brimhana; they nourish the forming Pinda and settle Pitta that causes nausea and acidity.",
      "tip": "Hyperemesis: pausing solid food 1 hour, sips of cool Laja-manda, Eladi churna with honey — seek care if ketosis or weight loss."
    },
    "id": "mp-m2-charaka",
    "title": "Charaka Samhita — Month 2 Garbhini Paricharya",
    "domain": "garbhini",
    "sanskrit_shloka": "द्वितीये मासि मधुरौषधसिद्धं क्षीरम्",
    "transliteration": "dvitīye māsi madhurauṣadhasiddhaṃ kṣīram",
    "hindi_meaning": "दूसरे माह में मधुर औषधियों से सिद्ध दूध दें।",
    "english_clinical_summary": "2nd month: milk medicated with Madhura (sweet) herbs. Pathya: Madhura Gana siddha milk (Shatavari-Yashtimadhu ksheerapaka); Rice-ghee, moong-khichdi, light vegetable soups; Lajasaktu with sugar-candy, pomegranate juice. Ksheera/Ghrita: Madhura-aushadha Siddha Ksheera — Milk boiled with Madhura Gana herbs (Shatavari + Yashtimadhu, or Jivaniya drugs) — 150 ml at bedtime, only after physician approval. Rationale: Madhura-Jivaniya drugs are Garbhasthapaka and Brimhana; they nourish the forming Pinda and settle Pitta that causes nausea and acidity.",
    "dc_dutta_correlation": "Weeks 5–8 · Embryonic period, organogenesis: Neural tube closes by day 28, heart tube beats from ~6 weeks (visible on TVS), limb buds appear — peak teratogenic sensitivity. Early dating USG confirms viability and site. Hyperemesis gravidarum: IV fluids, antiemetics, thiamine, correction of electrolytes if ketonuria.",
    "keywords": [
      "masanumasika",
      "garbhini paricharya",
      "month 2",
      "diet",
      "pathya",
      "ksheera",
      "ghrita",
      "ahara",
      "charaka",
      "apathya: Katu-Tikshna-Ushna foods, excess tea/coffee (>200 mg caffeine/day); Day-time heavy sleep, night vigil"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Month 2 me konsa ksheera-paka sabse labhadayak hai?",
      "Month 2 me DC Dutta ke anusaar konsa scan ya test karwayein?",
      "Month 2 ke classical red flags aur upadrava kya hain?"
    ]
  },
  {
    "month": 2,
    "ritu": null,
    "samhita": "sushruta",
    "stage": "masanumasika",
    "sanskrit": "द्वितीये मासि मधुरौषधसंस्कृतं पयः पाययेत्",
    "iast": "dvitīye māsi madhurauṣadhasaṃskṛtaṃ payaḥ pāyayet",
    "hindi": "दूसरे माह में मधुर द्रव्यों से संस्कारित दूध पिलाएँ।",
    "english": "2nd month: milk processed with sweet herbs; continue Madhura-sheeta diet. Pathya: Madhura Gana siddha milk (Shatavari-Yashtimadhu ksheerapaka); Rice-ghee, moong-khichdi, light vegetable soups; Lajasaktu with sugar-candy, pomegranate juice. Ksheera/Ghrita: Madhura-aushadha Siddha Ksheera — Milk boiled with Madhura Gana herbs (Shatavari + Yashtimadhu, or Jivaniya drugs) — 150 ml at bedtime, only after physician approval. Rationale: Madhura-Jivaniya drugs are Garbhasthapaka and Brimhana; they nourish the forming Pinda and settle Pitta that causes nausea and acidity.",
    "citation": "Su. Sha. 10.4",
    "dc_dutta": "Weeks 5–8 · Embryonic period, organogenesis: Neural tube closes by day 28, heart tube beats from ~6 weeks (visible on TVS), limb buds appear — peak teratogenic sensitivity. Early dating USG confirms viability and site. Hyperemesis gravidarum: IV fluids, antiemetics, thiamine, correction of electrolytes if ketonuria.",
    "red_flags": [
      "Spotting / bleeding with passage of tissue",
      "Vomiting >5 times a day with weight loss or ketones",
      "Fever with rash (rubella, CMV, Zika risk)"
    ],
    "tags": [
      "masanumasika",
      "garbhini paricharya",
      "month 2",
      "diet",
      "pathya",
      "ksheera",
      "ghrita",
      "ahara",
      "sushruta",
      "apathya: Katu-Tikshna-Ushna foods, excess tea/coffee (>200 mg caffeine/day); Day-time heavy sleep, night vigil"
    ],
    "plan": {
      "stage": "Pinda / Peshi / Arbuda (Ghana)",
      "weeks": "5–8",
      "trimester": 1,
      "fetal": "Kalala condenses into a Ghana mass: Pinda (male tendency), Peshi (female) or Arbuda (napumsaka) per Charaka. Sushruta describes Panchapindaka — five buds (head, two arms, two legs).",
      "ksheera": {
        "name": "Madhura-aushadha Siddha Ksheera",
        "detail": "Milk boiled with Madhura Gana herbs (Shatavari + Yashtimadhu, or Jivaniya drugs) — 150 ml at bedtime, only after physician approval."
      },
      "pathya": [
        "Madhura Gana siddha milk (Shatavari-Yashtimadhu ksheerapaka)",
        "Rice-ghee, moong-khichdi, light vegetable soups",
        "Lajasaktu with sugar-candy, pomegranate juice",
        "Ginger-cardamom water in small sips for nausea",
        "Vitamin B6 / ginger as advised for Chhardi"
      ],
      "avoid": [
        "Katu-Tikshna-Ushna foods, excess tea/coffee (>200 mg caffeine/day)",
        "Day-time heavy sleep, night vigil",
        "Strenuous exercise and suppression of natural urges",
        "Self-prescribed herbs or purgatives"
      ],
      "rationale": "Madhura-Jivaniya drugs are Garbhasthapaka and Brimhana; they nourish the forming Pinda and settle Pitta that causes nausea and acidity.",
      "tip": "Hyperemesis: pausing solid food 1 hour, sips of cool Laja-manda, Eladi churna with honey — seek care if ketosis or weight loss."
    },
    "id": "mp-m2-sushruta",
    "title": "Sushruta Samhita — Month 2 Garbhini Paricharya",
    "domain": "garbhini",
    "sanskrit_shloka": "द्वितीये मासि मधुरौषधसंस्कृतं पयः पाययेत्",
    "transliteration": "dvitīye māsi madhurauṣadhasaṃskṛtaṃ payaḥ pāyayet",
    "hindi_meaning": "दूसरे माह में मधुर द्रव्यों से संस्कारित दूध पिलाएँ।",
    "english_clinical_summary": "2nd month: milk processed with sweet herbs; continue Madhura-sheeta diet. Pathya: Madhura Gana siddha milk (Shatavari-Yashtimadhu ksheerapaka); Rice-ghee, moong-khichdi, light vegetable soups; Lajasaktu with sugar-candy, pomegranate juice. Ksheera/Ghrita: Madhura-aushadha Siddha Ksheera — Milk boiled with Madhura Gana herbs (Shatavari + Yashtimadhu, or Jivaniya drugs) — 150 ml at bedtime, only after physician approval. Rationale: Madhura-Jivaniya drugs are Garbhasthapaka and Brimhana; they nourish the forming Pinda and settle Pitta that causes nausea and acidity.",
    "dc_dutta_correlation": "Weeks 5–8 · Embryonic period, organogenesis: Neural tube closes by day 28, heart tube beats from ~6 weeks (visible on TVS), limb buds appear — peak teratogenic sensitivity. Early dating USG confirms viability and site. Hyperemesis gravidarum: IV fluids, antiemetics, thiamine, correction of electrolytes if ketonuria.",
    "keywords": [
      "masanumasika",
      "garbhini paricharya",
      "month 2",
      "diet",
      "pathya",
      "ksheera",
      "ghrita",
      "ahara",
      "sushruta",
      "apathya: Katu-Tikshna-Ushna foods, excess tea/coffee (>200 mg caffeine/day); Day-time heavy sleep, night vigil"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Month 2 me konsa ksheera-paka sabse labhadayak hai?",
      "Month 2 me DC Dutta ke anusaar konsa scan ya test karwayein?",
      "Month 2 ke classical red flags aur upadrava kya hain?"
    ]
  },
  {
    "month": 3,
    "ritu": null,
    "samhita": "charaka",
    "stage": "masanumasika",
    "sanskrit": "तृतीये मासि क्षीरं मधुसर्पिर्भ्याम्",
    "iast": "tṛtīye māsi kṣīraṃ madhusarpirbhyām",
    "hindi": "तीसरे माह में दूध मधु और घृत के साथ दें।",
    "english": "3rd month: milk with honey and ghee (in unequal quantity). Pathya: Shashtika-shali rice with milk (Payasa) in small portion; Moong dal khichdi with ghee, lauki, pumpkin; Madhu-Sarpi in Vishama matra with milk. Ksheera/Ghrita: Ksheera with Madhu & Sarpi (Vishama matra) — Warm milk with honey and ghee in UNEQUAL quantity (e.g., 5 ml honey : 10 ml ghee). Equal quantity is Viruddha. Sushruta also adds Shashtika rice with milk. Rationale: Organs forming now need Brimhana (nourishing) Dhatu support; honey-ghee is Yogavahi and Sandhana, supporting tissue integrity.",
    "citation": "Ch. Sha. 8.32",
    "dc_dutta": "Weeks 9–13 · End of the first trimester: Fetal period starts at 9th week. NT scan at 11–13+6 weeks with double marker; baseline Hb, blood group & Rh, urine routine, VDRL, HIV, HBsAg, TSH, blood sugar. Td/Tdap schedule begins. Nausea usually settles by 14 weeks.",
    "red_flags": [
      "Heavy bleeding or clots",
      "Burning micturition with fever (UTI)",
      "Severe pallor and breathlessness"
    ],
    "tags": [
      "masanumasika",
      "garbhini paricharya",
      "month 3",
      "diet",
      "pathya",
      "ksheera",
      "ghrita",
      "ahara",
      "charaka",
      "apathya: Equal-quantity honey + ghee; Excess salt, pickles, papad, hot masala"
    ],
    "plan": {
      "stage": "Sarvanga-Indriya Abhivyakti",
      "weeks": "9–13",
      "trimester": 1,
      "fetal": "All sense organs and body parts begin to manifest together (Charaka); Sushruta notes Hasta-Pada-Shiras differentiation. Fetal period begins.",
      "ksheera": {
        "name": "Ksheera with Madhu & Sarpi (Vishama matra)",
        "detail": "Warm milk with honey and ghee in UNEQUAL quantity (e.g., 5 ml honey : 10 ml ghee). Equal quantity is Viruddha. Sushruta also adds Shashtika rice with milk."
      },
      "pathya": [
        "Shashtika-shali rice with milk (Payasa) in small portion",
        "Moong dal khichdi with ghee, lauki, pumpkin",
        "Madhu-Sarpi in Vishama matra with milk",
        "Sweet fruits: dates, figs (Anjeer), grapes, sweet mango in season",
        "Iron- and protein-rich foods begin: green leafy vegetables, sprouts (cooked)"
      ],
      "avoid": [
        "Equal-quantity honey + ghee",
        "Excess salt, pickles, papad, hot masala",
        "Prolonged fasting, standing or travel",
        "Raw / half-cooked eggs, meat, unpasteurised dairy (Listeria risk)"
      ],
      "rationale": "Organs forming now need Brimhana (nourishing) Dhatu support; honey-ghee is Yogavahi and Sandhana, supporting tissue integrity.",
      "tip": "Keep a snack every 2–3 hours: soaked almonds (4–5), dates, banana-milk."
    },
    "id": "mp-m3-charaka",
    "title": "Charaka Samhita — Month 3 Garbhini Paricharya",
    "domain": "garbhini",
    "sanskrit_shloka": "तृतीये मासि क्षीरं मधुसर्पिर्भ्याम्",
    "transliteration": "tṛtīye māsi kṣīraṃ madhusarpirbhyām",
    "hindi_meaning": "तीसरे माह में दूध मधु और घृत के साथ दें।",
    "english_clinical_summary": "3rd month: milk with honey and ghee (in unequal quantity). Pathya: Shashtika-shali rice with milk (Payasa) in small portion; Moong dal khichdi with ghee, lauki, pumpkin; Madhu-Sarpi in Vishama matra with milk. Ksheera/Ghrita: Ksheera with Madhu & Sarpi (Vishama matra) — Warm milk with honey and ghee in UNEQUAL quantity (e.g., 5 ml honey : 10 ml ghee). Equal quantity is Viruddha. Sushruta also adds Shashtika rice with milk. Rationale: Organs forming now need Brimhana (nourishing) Dhatu support; honey-ghee is Yogavahi and Sandhana, supporting tissue integrity.",
    "dc_dutta_correlation": "Weeks 9–13 · End of the first trimester: Fetal period starts at 9th week. NT scan at 11–13+6 weeks with double marker; baseline Hb, blood group & Rh, urine routine, VDRL, HIV, HBsAg, TSH, blood sugar. Td/Tdap schedule begins. Nausea usually settles by 14 weeks.",
    "keywords": [
      "masanumasika",
      "garbhini paricharya",
      "month 3",
      "diet",
      "pathya",
      "ksheera",
      "ghrita",
      "ahara",
      "charaka",
      "apathya: Equal-quantity honey + ghee; Excess salt, pickles, papad, hot masala"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Month 3 me konsa ksheera-paka sabse labhadayak hai?",
      "Month 3 me DC Dutta ke anusaar konsa scan ya test karwayein?",
      "Month 3 ke classical red flags aur upadrava kya hain?"
    ]
  },
  {
    "month": 3,
    "ritu": null,
    "samhita": "sushruta",
    "stage": "masanumasika",
    "sanskrit": "तृतीये षष्टिकौदनं पयसा भोजयेत्",
    "iast": "tṛtīye ṣaṣṭikaudanaṃ payasā bhojayet",
    "hindi": "तीसरे माह में षष्टिक चावल का भात दूध के साथ खिलाएँ।",
    "english": "3rd month: Shashtika rice cooked/served with milk. Pathya: Shashtika-shali rice with milk (Payasa) in small portion; Moong dal khichdi with ghee, lauki, pumpkin; Madhu-Sarpi in Vishama matra with milk. Ksheera/Ghrita: Ksheera with Madhu & Sarpi (Vishama matra) — Warm milk with honey and ghee in UNEQUAL quantity (e.g., 5 ml honey : 10 ml ghee). Equal quantity is Viruddha. Sushruta also adds Shashtika rice with milk. Rationale: Organs forming now need Brimhana (nourishing) Dhatu support; honey-ghee is Yogavahi and Sandhana, supporting tissue integrity.",
    "citation": "Su. Sha. 10.4",
    "dc_dutta": "Weeks 9–13 · End of the first trimester: Fetal period starts at 9th week. NT scan at 11–13+6 weeks with double marker; baseline Hb, blood group & Rh, urine routine, VDRL, HIV, HBsAg, TSH, blood sugar. Td/Tdap schedule begins. Nausea usually settles by 14 weeks.",
    "red_flags": [
      "Heavy bleeding or clots",
      "Burning micturition with fever (UTI)",
      "Severe pallor and breathlessness"
    ],
    "tags": [
      "masanumasika",
      "garbhini paricharya",
      "month 3",
      "diet",
      "pathya",
      "ksheera",
      "ghrita",
      "ahara",
      "sushruta",
      "apathya: Equal-quantity honey + ghee; Excess salt, pickles, papad, hot masala"
    ],
    "plan": {
      "stage": "Sarvanga-Indriya Abhivyakti",
      "weeks": "9–13",
      "trimester": 1,
      "fetal": "All sense organs and body parts begin to manifest together (Charaka); Sushruta notes Hasta-Pada-Shiras differentiation. Fetal period begins.",
      "ksheera": {
        "name": "Ksheera with Madhu & Sarpi (Vishama matra)",
        "detail": "Warm milk with honey and ghee in UNEQUAL quantity (e.g., 5 ml honey : 10 ml ghee). Equal quantity is Viruddha. Sushruta also adds Shashtika rice with milk."
      },
      "pathya": [
        "Shashtika-shali rice with milk (Payasa) in small portion",
        "Moong dal khichdi with ghee, lauki, pumpkin",
        "Madhu-Sarpi in Vishama matra with milk",
        "Sweet fruits: dates, figs (Anjeer), grapes, sweet mango in season",
        "Iron- and protein-rich foods begin: green leafy vegetables, sprouts (cooked)"
      ],
      "avoid": [
        "Equal-quantity honey + ghee",
        "Excess salt, pickles, papad, hot masala",
        "Prolonged fasting, standing or travel",
        "Raw / half-cooked eggs, meat, unpasteurised dairy (Listeria risk)"
      ],
      "rationale": "Organs forming now need Brimhana (nourishing) Dhatu support; honey-ghee is Yogavahi and Sandhana, supporting tissue integrity.",
      "tip": "Keep a snack every 2–3 hours: soaked almonds (4–5), dates, banana-milk."
    },
    "id": "mp-m3-sushruta",
    "title": "Sushruta Samhita — Month 3 Garbhini Paricharya",
    "domain": "garbhini",
    "sanskrit_shloka": "तृतीये षष्टिकौदनं पयसा भोजयेत्",
    "transliteration": "tṛtīye ṣaṣṭikaudanaṃ payasā bhojayet",
    "hindi_meaning": "तीसरे माह में षष्टिक चावल का भात दूध के साथ खिलाएँ।",
    "english_clinical_summary": "3rd month: Shashtika rice cooked/served with milk. Pathya: Shashtika-shali rice with milk (Payasa) in small portion; Moong dal khichdi with ghee, lauki, pumpkin; Madhu-Sarpi in Vishama matra with milk. Ksheera/Ghrita: Ksheera with Madhu & Sarpi (Vishama matra) — Warm milk with honey and ghee in UNEQUAL quantity (e.g., 5 ml honey : 10 ml ghee). Equal quantity is Viruddha. Sushruta also adds Shashtika rice with milk. Rationale: Organs forming now need Brimhana (nourishing) Dhatu support; honey-ghee is Yogavahi and Sandhana, supporting tissue integrity.",
    "dc_dutta_correlation": "Weeks 9–13 · End of the first trimester: Fetal period starts at 9th week. NT scan at 11–13+6 weeks with double marker; baseline Hb, blood group & Rh, urine routine, VDRL, HIV, HBsAg, TSH, blood sugar. Td/Tdap schedule begins. Nausea usually settles by 14 weeks.",
    "keywords": [
      "masanumasika",
      "garbhini paricharya",
      "month 3",
      "diet",
      "pathya",
      "ksheera",
      "ghrita",
      "ahara",
      "sushruta",
      "apathya: Equal-quantity honey + ghee; Excess salt, pickles, papad, hot masala"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Month 3 me konsa ksheera-paka sabse labhadayak hai?",
      "Month 3 me DC Dutta ke anusaar konsa scan ya test karwayein?",
      "Month 3 ke classical red flags aur upadrava kya hain?"
    ]
  },
  {
    "month": 4,
    "ritu": null,
    "samhita": "charaka",
    "stage": "masanumasika",
    "sanskrit": "चतुर्थे मासि क्षीरनवनीतम्",
    "iast": "caturthe māsi kṣīranavanītam",
    "hindi": "चौथे माह में दूध से निकला ताज़ा मक्खन दें।",
    "english": "4th month: fresh butter extracted from milk (Ksheera-navanita). Garbha attains stability (Sthirata); Dauhrida appears. Pathya: Fresh unsalted butter 10–15 g with sugar; Shashtika rice with dal, ghee, buttermilk at lunch (not at night); Fulfil safe, wholesome cravings (Dauhrida) — fruits, sweets in moderation. Ksheera/Ghrita: Ksheera-Navanita — Fresh butter (Navanita) from milk, 10–15 g with warm milk or sugar; Sushruta: Shashtika with curd, milk and Jangala-mamsa rasa (or dal soup for vegetarians). Rationale: As the fetal heart manifests, the mother's wishes are the fetus's wishes (Dauhridavastha). Respecting safe desires preserves Manas-prasada and avoids malformations attributed to Dauhrida-vimanana.",
    "citation": "Ch. Sha. 8.32; Ch. Sha. 4.21 (Sthirata)",
    "dc_dutta": "Weeks 14–17 · Second trimester begins: Fetal sex organs differentiate, lanugo appears, fundus midway between symphysis and umbilicus at 16 weeks. Start iron 100 mg elemental + folic acid 500 mcg, calcium 500 mg BD. Td dose 1/2, quad marker 15–20 weeks. Mother usually feels well — appetite improves.",
    "red_flags": [
      "Watery leak PV (PPROM)",
      "Painless bleeding",
      "Severe headache with high BP (early pre-eclampsia is rare but possible)"
    ],
    "tags": [
      "masanumasika",
      "garbhini paricharya",
      "month 4",
      "diet",
      "pathya",
      "ksheera",
      "ghrita",
      "ahara",
      "charaka",
      "apathya: Denying wholesome cravings (risk of Vata aggravation and mental distress per Charaka); Unsafe cravings — raw clay, ice, unwashed raw food"
    ],
    "plan": {
      "stage": "Sthirata & Dauhrida",
      "weeks": "14–17",
      "trimester": 2,
      "fetal": "Garbha attains Sthirata (stability); mother becomes heavier (Guru-gatra). Hridaya manifests — the Dauhrida state: the mother expresses the fetus's desires through her own cravings.",
      "ksheera": {
        "name": "Ksheera-Navanita",
        "detail": "Fresh butter (Navanita) from milk, 10–15 g with warm milk or sugar; Sushruta: Shashtika with curd, milk and Jangala-mamsa rasa (or dal soup for vegetarians)."
      },
      "pathya": [
        "Fresh unsalted butter 10–15 g with sugar",
        "Shashtika rice with dal, ghee, buttermilk at lunch (not at night)",
        "Fulfil safe, wholesome cravings (Dauhrida) — fruits, sweets in moderation",
        "Calcium-rich: milk, ragi, sesame-jaggery (small), paneer",
        "Iron-folate tablets as advised from 14–16 weeks"
      ],
      "avoid": [
        "Denying wholesome cravings (risk of Vata aggravation and mental distress per Charaka)",
        "Unsafe cravings — raw clay, ice, unwashed raw food",
        "Prolonged supine posture, tight clothes",
        "Strenuous trekking, jerky rides"
      ],
      "rationale": "As the fetal heart manifests, the mother's wishes are the fetus's wishes (Dauhridavastha). Respecting safe desires preserves Manas-prasada and avoids malformations attributed to Dauhrida-vimanana.",
      "tip": "Begin gentle Garbha Sanskar: soothing music, mantra, positive reading 20 min daily."
    },
    "id": "mp-m4-charaka",
    "title": "Charaka Samhita — Month 4 Garbhini Paricharya",
    "domain": "garbhini",
    "sanskrit_shloka": "चतुर्थे मासि क्षीरनवनीतम्",
    "transliteration": "caturthe māsi kṣīranavanītam",
    "hindi_meaning": "चौथे माह में दूध से निकला ताज़ा मक्खन दें।",
    "english_clinical_summary": "4th month: fresh butter extracted from milk (Ksheera-navanita). Garbha attains stability (Sthirata); Dauhrida appears. Pathya: Fresh unsalted butter 10–15 g with sugar; Shashtika rice with dal, ghee, buttermilk at lunch (not at night); Fulfil safe, wholesome cravings (Dauhrida) — fruits, sweets in moderation. Ksheera/Ghrita: Ksheera-Navanita — Fresh butter (Navanita) from milk, 10–15 g with warm milk or sugar; Sushruta: Shashtika with curd, milk and Jangala-mamsa rasa (or dal soup for vegetarians). Rationale: As the fetal heart manifests, the mother's wishes are the fetus's wishes (Dauhridavastha). Respecting safe desires preserves Manas-prasada and avoids malformations attributed to Dauhrida-vimanana.",
    "dc_dutta_correlation": "Weeks 14–17 · Second trimester begins: Fetal sex organs differentiate, lanugo appears, fundus midway between symphysis and umbilicus at 16 weeks. Start iron 100 mg elemental + folic acid 500 mcg, calcium 500 mg BD. Td dose 1/2, quad marker 15–20 weeks. Mother usually feels well — appetite improves.",
    "keywords": [
      "masanumasika",
      "garbhini paricharya",
      "month 4",
      "diet",
      "pathya",
      "ksheera",
      "ghrita",
      "ahara",
      "charaka",
      "apathya: Denying wholesome cravings (risk of Vata aggravation and mental distress per Charaka); Unsafe cravings — raw clay, ice, unwashed raw food"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Month 4 me konsa ksheera-paka sabse labhadayak hai?",
      "Month 4 me DC Dutta ke anusaar konsa scan ya test karwayein?",
      "Month 4 ke classical red flags aur upadrava kya hain?"
    ]
  },
  {
    "month": 4,
    "ritu": null,
    "samhita": "sushruta",
    "stage": "masanumasika",
    "sanskrit": "चतुर्थे दध्ना षष्टिकौदनं जाङ्गलमांसरसेन सह",
    "iast": "caturthe dadhnā ṣaṣṭikaudanaṃ jāṅgalamāṃsarasena saha",
    "hindi": "चौथे माह में दही, षष्टिक भात तथा जाङ्गल मांसरस दें।",
    "english": "4th month: Shashtika rice with curd and Jangala-mamsa rasa (dal soup for vegetarians). Pathya: Fresh unsalted butter 10–15 g with sugar; Shashtika rice with dal, ghee, buttermilk at lunch (not at night); Fulfil safe, wholesome cravings (Dauhrida) — fruits, sweets in moderation. Ksheera/Ghrita: Ksheera-Navanita — Fresh butter (Navanita) from milk, 10–15 g with warm milk or sugar; Sushruta: Shashtika with curd, milk and Jangala-mamsa rasa (or dal soup for vegetarians). Rationale: As the fetal heart manifests, the mother's wishes are the fetus's wishes (Dauhridavastha). Respecting safe desires preserves Manas-prasada and avoids malformations attributed to Dauhrida-vimanana.",
    "citation": "Su. Sha. 10.4; Su. Sha. 3 (Dauhrida)",
    "dc_dutta": "Weeks 14–17 · Second trimester begins: Fetal sex organs differentiate, lanugo appears, fundus midway between symphysis and umbilicus at 16 weeks. Start iron 100 mg elemental + folic acid 500 mcg, calcium 500 mg BD. Td dose 1/2, quad marker 15–20 weeks. Mother usually feels well — appetite improves.",
    "red_flags": [
      "Watery leak PV (PPROM)",
      "Painless bleeding",
      "Severe headache with high BP (early pre-eclampsia is rare but possible)"
    ],
    "tags": [
      "masanumasika",
      "garbhini paricharya",
      "month 4",
      "diet",
      "pathya",
      "ksheera",
      "ghrita",
      "ahara",
      "sushruta",
      "apathya: Denying wholesome cravings (risk of Vata aggravation and mental distress per Charaka); Unsafe cravings — raw clay, ice, unwashed raw food"
    ],
    "plan": {
      "stage": "Sthirata & Dauhrida",
      "weeks": "14–17",
      "trimester": 2,
      "fetal": "Garbha attains Sthirata (stability); mother becomes heavier (Guru-gatra). Hridaya manifests — the Dauhrida state: the mother expresses the fetus's desires through her own cravings.",
      "ksheera": {
        "name": "Ksheera-Navanita",
        "detail": "Fresh butter (Navanita) from milk, 10–15 g with warm milk or sugar; Sushruta: Shashtika with curd, milk and Jangala-mamsa rasa (or dal soup for vegetarians)."
      },
      "pathya": [
        "Fresh unsalted butter 10–15 g with sugar",
        "Shashtika rice with dal, ghee, buttermilk at lunch (not at night)",
        "Fulfil safe, wholesome cravings (Dauhrida) — fruits, sweets in moderation",
        "Calcium-rich: milk, ragi, sesame-jaggery (small), paneer",
        "Iron-folate tablets as advised from 14–16 weeks"
      ],
      "avoid": [
        "Denying wholesome cravings (risk of Vata aggravation and mental distress per Charaka)",
        "Unsafe cravings — raw clay, ice, unwashed raw food",
        "Prolonged supine posture, tight clothes",
        "Strenuous trekking, jerky rides"
      ],
      "rationale": "As the fetal heart manifests, the mother's wishes are the fetus's wishes (Dauhridavastha). Respecting safe desires preserves Manas-prasada and avoids malformations attributed to Dauhrida-vimanana.",
      "tip": "Begin gentle Garbha Sanskar: soothing music, mantra, positive reading 20 min daily."
    },
    "id": "mp-m4-sushruta",
    "title": "Sushruta Samhita — Month 4 Garbhini Paricharya",
    "domain": "garbhini",
    "sanskrit_shloka": "चतुर्थे दध्ना षष्टिकौदनं जाङ्गलमांसरसेन सह",
    "transliteration": "caturthe dadhnā ṣaṣṭikaudanaṃ jāṅgalamāṃsarasena saha",
    "hindi_meaning": "चौथे माह में दही, षष्टिक भात तथा जाङ्गल मांसरस दें।",
    "english_clinical_summary": "4th month: Shashtika rice with curd and Jangala-mamsa rasa (dal soup for vegetarians). Pathya: Fresh unsalted butter 10–15 g with sugar; Shashtika rice with dal, ghee, buttermilk at lunch (not at night); Fulfil safe, wholesome cravings (Dauhrida) — fruits, sweets in moderation. Ksheera/Ghrita: Ksheera-Navanita — Fresh butter (Navanita) from milk, 10–15 g with warm milk or sugar; Sushruta: Shashtika with curd, milk and Jangala-mamsa rasa (or dal soup for vegetarians). Rationale: As the fetal heart manifests, the mother's wishes are the fetus's wishes (Dauhridavastha). Respecting safe desires preserves Manas-prasada and avoids malformations attributed to Dauhrida-vimanana.",
    "dc_dutta_correlation": "Weeks 14–17 · Second trimester begins: Fetal sex organs differentiate, lanugo appears, fundus midway between symphysis and umbilicus at 16 weeks. Start iron 100 mg elemental + folic acid 500 mcg, calcium 500 mg BD. Td dose 1/2, quad marker 15–20 weeks. Mother usually feels well — appetite improves.",
    "keywords": [
      "masanumasika",
      "garbhini paricharya",
      "month 4",
      "diet",
      "pathya",
      "ksheera",
      "ghrita",
      "ahara",
      "sushruta",
      "apathya: Denying wholesome cravings (risk of Vata aggravation and mental distress per Charaka); Unsafe cravings — raw clay, ice, unwashed raw food"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Month 4 me konsa ksheera-paka sabse labhadayak hai?",
      "Month 4 me DC Dutta ke anusaar konsa scan ya test karwayein?",
      "Month 4 ke classical red flags aur upadrava kya hain?"
    ]
  },
  {
    "month": 5,
    "ritu": null,
    "samhita": "charaka",
    "stage": "masanumasika",
    "sanskrit": "पञ्चमे मासे क्षीरसर्पिः",
    "iast": "pañcame māse kṣīrasarpiḥ",
    "hindi": "पाँचवें माह में दूध से निकला घृत दें।",
    "english": "5th month: ghee extracted from milk. Mamsa-shonita upachaya; Manas becomes awakened. Pathya: Ghee 10–15 g with rice/chapati; Mamsa-vardhaka foods: paneer, lentils, soya, dal, curd-rice (day), eggs/fish (if non-vegetarian, well-cooked); Iron + vitamin C: beetroot, spinach, amla, jaggery in small amount. Ksheera/Ghrita: Ksheera-Sarpi (Ghrita extracted from milk) — 10–15 g ghee made from milk-cream, with warm milk at bedtime. Rationale: Mother's Dhatu are being drawn upon by the fetus (Mamsa-shonita upachaya); Snigdha and Brimhana food keeps Agni steady and prevents Karshya.",
    "citation": "Ch. Sha. 8.32; Ch. Sha. 4.21",
    "dc_dutta": "Weeks 18–21 · Quickening & anomaly scan: Quickening at 16–18 weeks in multigravida, ~20 in primigravida. Fundus at umbilicus at 20–22 weeks; FHS audible by fetoscope. Level-II anomaly scan 18–20 weeks; Td 2nd dose; Hb check; weight gain ~0.4 kg/week from now.",
    "red_flags": [
      "No fetal movement by 22 weeks",
      "Persistent abdominal pain / uterine tenderness",
      "Pallor with Hb < 10 g/dl"
    ],
    "tags": [
      "masanumasika",
      "garbhini paricharya",
      "month 5",
      "diet",
      "pathya",
      "ksheera",
      "ghrita",
      "ahara",
      "charaka",
      "apathya: Mamsa-kshaya from skipped meals; Heavy / Vishtambhi food causing constipation"
    ],
    "plan": {
      "stage": "Mamsa-Shonita Upachaya · Manas Pratibuddha",
      "weeks": "18–21",
      "trimester": 2,
      "fetal": "Fetal muscle (Mamsa) and blood (Shonita) increase most; the mother becomes lean (Karshya). Manas is more awakened — fetal movements begin to be felt.",
      "ksheera": {
        "name": "Ksheera-Sarpi (Ghrita extracted from milk)",
        "detail": "10–15 g ghee made from milk-cream, with warm milk at bedtime."
      },
      "pathya": [
        "Ghee 10–15 g with rice/chapati",
        "Mamsa-vardhaka foods: paneer, lentils, soya, dal, curd-rice (day), eggs/fish (if non-vegetarian, well-cooked)",
        "Iron + vitamin C: beetroot, spinach, amla, jaggery in small amount",
        "Dry-fruit laddu: dates, almond, raisins, til in moderation",
        "2.5–3 L fluids daily (milk, coconut water, buttermilk, soups)"
      ],
      "avoid": [
        "Mamsa-kshaya from skipped meals",
        "Heavy / Vishtambhi food causing constipation",
        "Alcohol, tobacco & smoke exposure",
        "Sleeping flat on back for long"
      ],
      "rationale": "Mother's Dhatu are being drawn upon by the fetus (Mamsa-shonita upachaya); Snigdha and Brimhana food keeps Agni steady and prevents Karshya.",
      "tip": "Start fetal-movement awareness; walk 20–30 minutes daily."
    },
    "id": "mp-m5-charaka",
    "title": "Charaka Samhita — Month 5 Garbhini Paricharya",
    "domain": "garbhini",
    "sanskrit_shloka": "पञ्चमे मासे क्षीरसर्पिः",
    "transliteration": "pañcame māse kṣīrasarpiḥ",
    "hindi_meaning": "पाँचवें माह में दूध से निकला घृत दें।",
    "english_clinical_summary": "5th month: ghee extracted from milk. Mamsa-shonita upachaya; Manas becomes awakened. Pathya: Ghee 10–15 g with rice/chapati; Mamsa-vardhaka foods: paneer, lentils, soya, dal, curd-rice (day), eggs/fish (if non-vegetarian, well-cooked); Iron + vitamin C: beetroot, spinach, amla, jaggery in small amount. Ksheera/Ghrita: Ksheera-Sarpi (Ghrita extracted from milk) — 10–15 g ghee made from milk-cream, with warm milk at bedtime. Rationale: Mother's Dhatu are being drawn upon by the fetus (Mamsa-shonita upachaya); Snigdha and Brimhana food keeps Agni steady and prevents Karshya.",
    "dc_dutta_correlation": "Weeks 18–21 · Quickening & anomaly scan: Quickening at 16–18 weeks in multigravida, ~20 in primigravida. Fundus at umbilicus at 20–22 weeks; FHS audible by fetoscope. Level-II anomaly scan 18–20 weeks; Td 2nd dose; Hb check; weight gain ~0.4 kg/week from now.",
    "keywords": [
      "masanumasika",
      "garbhini paricharya",
      "month 5",
      "diet",
      "pathya",
      "ksheera",
      "ghrita",
      "ahara",
      "charaka",
      "apathya: Mamsa-kshaya from skipped meals; Heavy / Vishtambhi food causing constipation"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Month 5 me konsa ksheera-paka sabse labhadayak hai?",
      "Month 5 me DC Dutta ke anusaar konsa scan ya test karwayein?",
      "Month 5 ke classical red flags aur upadrava kya hain?"
    ]
  },
  {
    "month": 5,
    "ritu": null,
    "samhita": "sushruta",
    "stage": "masanumasika",
    "sanskrit": "पञ्चमे पयसा षष्टिकौदनं सर्पिषा",
    "iast": "pañcame payasā ṣaṣṭikaudanaṃ sarpiṣā",
    "hindi": "पाँचवें माह में दूध और घृत के साथ षष्टिक भात।",
    "english": "5th month: Shashtika rice with milk and ghee. Pathya: Ghee 10–15 g with rice/chapati; Mamsa-vardhaka foods: paneer, lentils, soya, dal, curd-rice (day), eggs/fish (if non-vegetarian, well-cooked); Iron + vitamin C: beetroot, spinach, amla, jaggery in small amount. Ksheera/Ghrita: Ksheera-Sarpi (Ghrita extracted from milk) — 10–15 g ghee made from milk-cream, with warm milk at bedtime. Rationale: Mother's Dhatu are being drawn upon by the fetus (Mamsa-shonita upachaya); Snigdha and Brimhana food keeps Agni steady and prevents Karshya.",
    "citation": "Su. Sha. 10.4",
    "dc_dutta": "Weeks 18–21 · Quickening & anomaly scan: Quickening at 16–18 weeks in multigravida, ~20 in primigravida. Fundus at umbilicus at 20–22 weeks; FHS audible by fetoscope. Level-II anomaly scan 18–20 weeks; Td 2nd dose; Hb check; weight gain ~0.4 kg/week from now.",
    "red_flags": [
      "No fetal movement by 22 weeks",
      "Persistent abdominal pain / uterine tenderness",
      "Pallor with Hb < 10 g/dl"
    ],
    "tags": [
      "masanumasika",
      "garbhini paricharya",
      "month 5",
      "diet",
      "pathya",
      "ksheera",
      "ghrita",
      "ahara",
      "sushruta",
      "apathya: Mamsa-kshaya from skipped meals; Heavy / Vishtambhi food causing constipation"
    ],
    "plan": {
      "stage": "Mamsa-Shonita Upachaya · Manas Pratibuddha",
      "weeks": "18–21",
      "trimester": 2,
      "fetal": "Fetal muscle (Mamsa) and blood (Shonita) increase most; the mother becomes lean (Karshya). Manas is more awakened — fetal movements begin to be felt.",
      "ksheera": {
        "name": "Ksheera-Sarpi (Ghrita extracted from milk)",
        "detail": "10–15 g ghee made from milk-cream, with warm milk at bedtime."
      },
      "pathya": [
        "Ghee 10–15 g with rice/chapati",
        "Mamsa-vardhaka foods: paneer, lentils, soya, dal, curd-rice (day), eggs/fish (if non-vegetarian, well-cooked)",
        "Iron + vitamin C: beetroot, spinach, amla, jaggery in small amount",
        "Dry-fruit laddu: dates, almond, raisins, til in moderation",
        "2.5–3 L fluids daily (milk, coconut water, buttermilk, soups)"
      ],
      "avoid": [
        "Mamsa-kshaya from skipped meals",
        "Heavy / Vishtambhi food causing constipation",
        "Alcohol, tobacco & smoke exposure",
        "Sleeping flat on back for long"
      ],
      "rationale": "Mother's Dhatu are being drawn upon by the fetus (Mamsa-shonita upachaya); Snigdha and Brimhana food keeps Agni steady and prevents Karshya.",
      "tip": "Start fetal-movement awareness; walk 20–30 minutes daily."
    },
    "id": "mp-m5-sushruta",
    "title": "Sushruta Samhita — Month 5 Garbhini Paricharya",
    "domain": "garbhini",
    "sanskrit_shloka": "पञ्चमे पयसा षष्टिकौदनं सर्पिषा",
    "transliteration": "pañcame payasā ṣaṣṭikaudanaṃ sarpiṣā",
    "hindi_meaning": "पाँचवें माह में दूध और घृत के साथ षष्टिक भात।",
    "english_clinical_summary": "5th month: Shashtika rice with milk and ghee. Pathya: Ghee 10–15 g with rice/chapati; Mamsa-vardhaka foods: paneer, lentils, soya, dal, curd-rice (day), eggs/fish (if non-vegetarian, well-cooked); Iron + vitamin C: beetroot, spinach, amla, jaggery in small amount. Ksheera/Ghrita: Ksheera-Sarpi (Ghrita extracted from milk) — 10–15 g ghee made from milk-cream, with warm milk at bedtime. Rationale: Mother's Dhatu are being drawn upon by the fetus (Mamsa-shonita upachaya); Snigdha and Brimhana food keeps Agni steady and prevents Karshya.",
    "dc_dutta_correlation": "Weeks 18–21 · Quickening & anomaly scan: Quickening at 16–18 weeks in multigravida, ~20 in primigravida. Fundus at umbilicus at 20–22 weeks; FHS audible by fetoscope. Level-II anomaly scan 18–20 weeks; Td 2nd dose; Hb check; weight gain ~0.4 kg/week from now.",
    "keywords": [
      "masanumasika",
      "garbhini paricharya",
      "month 5",
      "diet",
      "pathya",
      "ksheera",
      "ghrita",
      "ahara",
      "sushruta",
      "apathya: Mamsa-kshaya from skipped meals; Heavy / Vishtambhi food causing constipation"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Month 5 me konsa ksheera-paka sabse labhadayak hai?",
      "Month 5 me DC Dutta ke anusaar konsa scan ya test karwayein?",
      "Month 5 ke classical red flags aur upadrava kya hain?"
    ]
  },
  {
    "month": 6,
    "ritu": null,
    "samhita": "charaka",
    "stage": "masanumasika",
    "sanskrit": "षष्ठे मासे क्षीरसर्पिर्मधुरौषधसिद्धम्",
    "iast": "ṣaṣṭhe māse kṣīrasarpir madhurauṣadhasiddham",
    "hindi": "छठे माह में मधुर औषधियों से सिद्ध क्षीर-घृत दें।",
    "english": "6th month: ghee/milk processed with Madhura drugs (e.g., Gokshura). Bala-varna upachaya; Buddhi awakened. Pathya: Gokshura-Shatavari siddha ghrita (physician-supplied); Iron-rich: ragi, dates, beetroot, jaggery, pomegranate, liver (if non-veg); Protein: 2 cups dal / sprouts / paneer / egg daily. Ksheera/Ghrita: Madhura-aushadha Siddha Ghrita / Ksheera-Sarpi with Gokshura — Ghee processed with Madhura drugs (Gokshura, Shatavari, Bala) — 1 tsp with warm milk; Sushruta advises Gokshura-siddha Ghrita or Ksheera for Shopha and Mutrakrichhra. Rationale: Bala-Varna drain demands Balya and Rasayana nourishment; Gokshura relieves Shopha and Mutrakrichhra without aggravating Vata.",
    "citation": "Ch. Sha. 8.32; Ch. Sha. 4.21",
    "dc_dutta": "Weeks 22–26 · Viability & GDM screening: Viability from ~24 weeks (surfactant starts). OGTT 75 g at 24–28 weeks (≥140 mg/dl at 2 h = GDM). Monitor BP and urine albumin at each visit — pre-eclampsia screening; edema of feet is physiological, face/hand edema is not. Repeat Hb at 28 weeks.",
    "red_flags": [
      "BP ≥ 140/90 mmHg",
      "Facial / hand swelling with headache",
      "Reduced fetal movement",
      "Hb < 9 g/dl or polyuria-polydipsia (GDM)"
    ],
    "tags": [
      "masanumasika",
      "garbhini paricharya",
      "month 6",
      "diet",
      "pathya",
      "ksheera",
      "ghrita",
      "ahara",
      "charaka",
      "apathya: Excess salt (Shopha ↑); Standing > 2 hours; dangling legs"
    ],
    "plan": {
      "stage": "Bala-Varna Upachaya · Buddhi Pratibuddha",
      "weeks": "22–26",
      "trimester": 2,
      "fetal": "Fetal strength (Bala) and complexion (Varna) increase most; mother may lose strength and colour. Buddhi (intellect) becomes more awakened.",
      "ksheera": {
        "name": "Madhura-aushadha Siddha Ghrita / Ksheera-Sarpi with Gokshura",
        "detail": "Ghee processed with Madhura drugs (Gokshura, Shatavari, Bala) — 1 tsp with warm milk; Sushruta advises Gokshura-siddha Ghrita or Ksheera for Shopha and Mutrakrichhra."
      },
      "pathya": [
        "Gokshura-Shatavari siddha ghrita (physician-supplied)",
        "Iron-rich: ragi, dates, beetroot, jaggery, pomegranate, liver (if non-veg)",
        "Protein: 2 cups dal / sprouts / paneer / egg daily",
        "Mild diuretic foods for Shopha: barley water, ash-gourd, coconut water",
        "Calcium 1 g/day and Vitamin D"
      ],
      "avoid": [
        "Excess salt (Shopha ↑)",
        "Standing > 2 hours; dangling legs",
        "Tight footwear, constipation straining",
        "Uncooked sprouts and street food"
      ],
      "rationale": "Bala-Varna drain demands Balya and Rasayana nourishment; Gokshura relieves Shopha and Mutrakrichhra without aggravating Vata.",
      "tip": "Elevate legs 15 min twice daily; left lateral sleep."
    },
    "id": "mp-m6-charaka",
    "title": "Charaka Samhita — Month 6 Garbhini Paricharya",
    "domain": "garbhini",
    "sanskrit_shloka": "षष्ठे मासे क्षीरसर्पिर्मधुरौषधसिद्धम्",
    "transliteration": "ṣaṣṭhe māse kṣīrasarpir madhurauṣadhasiddham",
    "hindi_meaning": "छठे माह में मधुर औषधियों से सिद्ध क्षीर-घृत दें।",
    "english_clinical_summary": "6th month: ghee/milk processed with Madhura drugs (e.g., Gokshura). Bala-varna upachaya; Buddhi awakened. Pathya: Gokshura-Shatavari siddha ghrita (physician-supplied); Iron-rich: ragi, dates, beetroot, jaggery, pomegranate, liver (if non-veg); Protein: 2 cups dal / sprouts / paneer / egg daily. Ksheera/Ghrita: Madhura-aushadha Siddha Ghrita / Ksheera-Sarpi with Gokshura — Ghee processed with Madhura drugs (Gokshura, Shatavari, Bala) — 1 tsp with warm milk; Sushruta advises Gokshura-siddha Ghrita or Ksheera for Shopha and Mutrakrichhra. Rationale: Bala-Varna drain demands Balya and Rasayana nourishment; Gokshura relieves Shopha and Mutrakrichhra without aggravating Vata.",
    "dc_dutta_correlation": "Weeks 22–26 · Viability & GDM screening: Viability from ~24 weeks (surfactant starts). OGTT 75 g at 24–28 weeks (≥140 mg/dl at 2 h = GDM). Monitor BP and urine albumin at each visit — pre-eclampsia screening; edema of feet is physiological, face/hand edema is not. Repeat Hb at 28 weeks.",
    "keywords": [
      "masanumasika",
      "garbhini paricharya",
      "month 6",
      "diet",
      "pathya",
      "ksheera",
      "ghrita",
      "ahara",
      "charaka",
      "apathya: Excess salt (Shopha ↑); Standing > 2 hours; dangling legs"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Month 6 me konsa ksheera-paka sabse labhadayak hai?",
      "Month 6 me DC Dutta ke anusaar konsa scan ya test karwayein?",
      "Month 6 ke classical red flags aur upadrava kya hain?"
    ]
  },
  {
    "month": 6,
    "ritu": null,
    "samhita": "sushruta",
    "stage": "masanumasika",
    "sanskrit": "षष्ठे गोक्षुरकसिद्धं सर्पिः शोफे हितम्",
    "iast": "ṣaṣṭhe gokṣurakasiddhaṃ sarpiḥ śophe hitam",
    "hindi": "छठे माह में गोखरू से सिद्ध घृत शोथ में हितकर है।",
    "english": "6th month: Gokshura-siddha ghee/ksheera — beneficial in Shopha and Mutrakrichhra. Pathya: Gokshura-Shatavari siddha ghrita (physician-supplied); Iron-rich: ragi, dates, beetroot, jaggery, pomegranate, liver (if non-veg); Protein: 2 cups dal / sprouts / paneer / egg daily. Ksheera/Ghrita: Madhura-aushadha Siddha Ghrita / Ksheera-Sarpi with Gokshura — Ghee processed with Madhura drugs (Gokshura, Shatavari, Bala) — 1 tsp with warm milk; Sushruta advises Gokshura-siddha Ghrita or Ksheera for Shopha and Mutrakrichhra. Rationale: Bala-Varna drain demands Balya and Rasayana nourishment; Gokshura relieves Shopha and Mutrakrichhra without aggravating Vata.",
    "citation": "Su. Sha. 10.4",
    "dc_dutta": "Weeks 22–26 · Viability & GDM screening: Viability from ~24 weeks (surfactant starts). OGTT 75 g at 24–28 weeks (≥140 mg/dl at 2 h = GDM). Monitor BP and urine albumin at each visit — pre-eclampsia screening; edema of feet is physiological, face/hand edema is not. Repeat Hb at 28 weeks.",
    "red_flags": [
      "BP ≥ 140/90 mmHg",
      "Facial / hand swelling with headache",
      "Reduced fetal movement",
      "Hb < 9 g/dl or polyuria-polydipsia (GDM)"
    ],
    "tags": [
      "masanumasika",
      "garbhini paricharya",
      "month 6",
      "diet",
      "pathya",
      "ksheera",
      "ghrita",
      "ahara",
      "sushruta",
      "apathya: Excess salt (Shopha ↑); Standing > 2 hours; dangling legs"
    ],
    "plan": {
      "stage": "Bala-Varna Upachaya · Buddhi Pratibuddha",
      "weeks": "22–26",
      "trimester": 2,
      "fetal": "Fetal strength (Bala) and complexion (Varna) increase most; mother may lose strength and colour. Buddhi (intellect) becomes more awakened.",
      "ksheera": {
        "name": "Madhura-aushadha Siddha Ghrita / Ksheera-Sarpi with Gokshura",
        "detail": "Ghee processed with Madhura drugs (Gokshura, Shatavari, Bala) — 1 tsp with warm milk; Sushruta advises Gokshura-siddha Ghrita or Ksheera for Shopha and Mutrakrichhra."
      },
      "pathya": [
        "Gokshura-Shatavari siddha ghrita (physician-supplied)",
        "Iron-rich: ragi, dates, beetroot, jaggery, pomegranate, liver (if non-veg)",
        "Protein: 2 cups dal / sprouts / paneer / egg daily",
        "Mild diuretic foods for Shopha: barley water, ash-gourd, coconut water",
        "Calcium 1 g/day and Vitamin D"
      ],
      "avoid": [
        "Excess salt (Shopha ↑)",
        "Standing > 2 hours; dangling legs",
        "Tight footwear, constipation straining",
        "Uncooked sprouts and street food"
      ],
      "rationale": "Bala-Varna drain demands Balya and Rasayana nourishment; Gokshura relieves Shopha and Mutrakrichhra without aggravating Vata.",
      "tip": "Elevate legs 15 min twice daily; left lateral sleep."
    },
    "id": "mp-m6-sushruta",
    "title": "Sushruta Samhita — Month 6 Garbhini Paricharya",
    "domain": "garbhini",
    "sanskrit_shloka": "षष्ठे गोक्षुरकसिद्धं सर्पिः शोफे हितम्",
    "transliteration": "ṣaṣṭhe gokṣurakasiddhaṃ sarpiḥ śophe hitam",
    "hindi_meaning": "छठे माह में गोखरू से सिद्ध घृत शोथ में हितकर है।",
    "english_clinical_summary": "6th month: Gokshura-siddha ghee/ksheera — beneficial in Shopha and Mutrakrichhra. Pathya: Gokshura-Shatavari siddha ghrita (physician-supplied); Iron-rich: ragi, dates, beetroot, jaggery, pomegranate, liver (if non-veg); Protein: 2 cups dal / sprouts / paneer / egg daily. Ksheera/Ghrita: Madhura-aushadha Siddha Ghrita / Ksheera-Sarpi with Gokshura — Ghee processed with Madhura drugs (Gokshura, Shatavari, Bala) — 1 tsp with warm milk; Sushruta advises Gokshura-siddha Ghrita or Ksheera for Shopha and Mutrakrichhra. Rationale: Bala-Varna drain demands Balya and Rasayana nourishment; Gokshura relieves Shopha and Mutrakrichhra without aggravating Vata.",
    "dc_dutta_correlation": "Weeks 22–26 · Viability & GDM screening: Viability from ~24 weeks (surfactant starts). OGTT 75 g at 24–28 weeks (≥140 mg/dl at 2 h = GDM). Monitor BP and urine albumin at each visit — pre-eclampsia screening; edema of feet is physiological, face/hand edema is not. Repeat Hb at 28 weeks.",
    "keywords": [
      "masanumasika",
      "garbhini paricharya",
      "month 6",
      "diet",
      "pathya",
      "ksheera",
      "ghrita",
      "ahara",
      "sushruta",
      "apathya: Excess salt (Shopha ↑); Standing > 2 hours; dangling legs"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Month 6 me konsa ksheera-paka sabse labhadayak hai?",
      "Month 6 me DC Dutta ke anusaar konsa scan ya test karwayein?",
      "Month 6 ke classical red flags aur upadrava kya hain?"
    ]
  },
  {
    "month": 7,
    "ritu": null,
    "samhita": "charaka",
    "stage": "masanumasika",
    "sanskrit": "सप्तमे मासे घृतं पृथक्पर्ण्यादिसिद्धम्",
    "iast": "saptame māse ghṛtaṃ pṛthakparṇyādisiddham",
    "hindi": "सातवें माह में पृथक्पर्ण्यादि गण से सिद्ध घृत दें।",
    "english": "7th month: ghee processed with Prithakparnyadi Gana. All Bhavas of fetus are fully nourished; mother fatigued. Pathya: Prithakparnyadi ghrita as per physician; Easily digestible, small frequent meals (5–6/day); Fibre & hydration: stewed fruit, ghee-dalia, soaked raisins at night. Ksheera/Ghrita: Prithakparnyadi Siddha Ghrita — Ghee processed with Prithakparnyadi Gana (Prishniparni, Bala, Shatavari, Vidari) — 1 tsp with warm milk if prescribed. Rationale: Prithakparnyadi drugs are Garbhasthapaka, Brimhana and Vatanulomaka — suit the weight, backache and Vata-vitiation of the third trimester.",
    "citation": "Ch. Sha. 8.32; Ch. Sha. 4.21",
    "dc_dutta": "Weeks 27–30 · Third trimester: Third trimester begins at 28 weeks; FH ≈ gestational weeks in cm (±2). Anti-D 300 mcg at 28 weeks if Rh-negative & indirect Coombs negative; Tdap 27–36 weeks; kick-count (≥10 movements in 12 h); visits every 2 weeks. Screen for anemia, GDM, pre-eclampsia, IUGR.",
    "red_flags": [
      "Preterm contractions < 37 weeks",
      "Antepartum bleeding",
      "Persistent headache / visual disturbance / epigastric pain"
    ],
    "tags": [
      "masanumasika",
      "garbhini paricharya",
      "month 7",
      "diet",
      "pathya",
      "ksheera",
      "ghrita",
      "ahara",
      "charaka",
      "apathya: Heavy, oily or fermented foods; Long standing/travel; sleeping on back"
    ],
    "plan": {
      "stage": "Sarvanga-Pratyanga Vibhaga",
      "weeks": "27–30",
      "trimester": 3,
      "fetal": "All body parts and organs are fully developed (Sarvairbhavair Apyayate). Mother becomes fatigued (Klanta) due to maximal fetal demands.",
      "ksheera": {
        "name": "Prithakparnyadi Siddha Ghrita",
        "detail": "Ghee processed with Prithakparnyadi Gana (Prishniparni, Bala, Shatavari, Vidari) — 1 tsp with warm milk if prescribed."
      },
      "pathya": [
        "Prithakparnyadi ghrita as per physician",
        "Easily digestible, small frequent meals (5–6/day)",
        "Fibre & hydration: stewed fruit, ghee-dalia, soaked raisins at night",
        "Buttermilk with cumin and rock-salt at lunch",
        "Iron + calcium given 2 hours apart"
      ],
      "avoid": [
        "Heavy, oily or fermented foods",
        "Long standing/travel; sleeping on back",
        "Suppression of natural urges, tight garments",
        "Emotional stress and loud noise"
      ],
      "rationale": "Prithakparnyadi drugs are Garbhasthapaka, Brimhana and Vatanulomaka — suit the weight, backache and Vata-vitiation of the third trimester.",
      "tip": "Start Kegel exercises and antenatal birth-preparation classes."
    },
    "id": "mp-m7-charaka",
    "title": "Charaka Samhita — Month 7 Garbhini Paricharya",
    "domain": "garbhini",
    "sanskrit_shloka": "सप्तमे मासे घृतं पृथक्पर्ण्यादिसिद्धम्",
    "transliteration": "saptame māse ghṛtaṃ pṛthakparṇyādisiddham",
    "hindi_meaning": "सातवें माह में पृथक्पर्ण्यादि गण से सिद्ध घृत दें।",
    "english_clinical_summary": "7th month: ghee processed with Prithakparnyadi Gana. All Bhavas of fetus are fully nourished; mother fatigued. Pathya: Prithakparnyadi ghrita as per physician; Easily digestible, small frequent meals (5–6/day); Fibre & hydration: stewed fruit, ghee-dalia, soaked raisins at night. Ksheera/Ghrita: Prithakparnyadi Siddha Ghrita — Ghee processed with Prithakparnyadi Gana (Prishniparni, Bala, Shatavari, Vidari) — 1 tsp with warm milk if prescribed. Rationale: Prithakparnyadi drugs are Garbhasthapaka, Brimhana and Vatanulomaka — suit the weight, backache and Vata-vitiation of the third trimester.",
    "dc_dutta_correlation": "Weeks 27–30 · Third trimester: Third trimester begins at 28 weeks; FH ≈ gestational weeks in cm (±2). Anti-D 300 mcg at 28 weeks if Rh-negative & indirect Coombs negative; Tdap 27–36 weeks; kick-count (≥10 movements in 12 h); visits every 2 weeks. Screen for anemia, GDM, pre-eclampsia, IUGR.",
    "keywords": [
      "masanumasika",
      "garbhini paricharya",
      "month 7",
      "diet",
      "pathya",
      "ksheera",
      "ghrita",
      "ahara",
      "charaka",
      "apathya: Heavy, oily or fermented foods; Long standing/travel; sleeping on back"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Month 7 me konsa ksheera-paka sabse labhadayak hai?",
      "Month 7 me DC Dutta ke anusaar konsa scan ya test karwayein?",
      "Month 7 ke classical red flags aur upadrava kya hain?"
    ]
  },
  {
    "month": 7,
    "ritu": null,
    "samhita": "sushruta",
    "stage": "masanumasika",
    "sanskrit": "सप्तमे पृथक्पर्ण्यादिसिद्धं घृतं पाययेत्",
    "iast": "saptame pṛthakparṇyādisiddhaṃ ghṛtaṃ pāyayet",
    "hindi": "सातवें माह में पृथक्पर्ण्यादि सिद्ध घृत पिलाएँ।",
    "english": "7th month: Prithakparnyadi-siddha ghee. Pathya: Prithakparnyadi ghrita as per physician; Easily digestible, small frequent meals (5–6/day); Fibre & hydration: stewed fruit, ghee-dalia, soaked raisins at night. Ksheera/Ghrita: Prithakparnyadi Siddha Ghrita — Ghee processed with Prithakparnyadi Gana (Prishniparni, Bala, Shatavari, Vidari) — 1 tsp with warm milk if prescribed. Rationale: Prithakparnyadi drugs are Garbhasthapaka, Brimhana and Vatanulomaka — suit the weight, backache and Vata-vitiation of the third trimester.",
    "citation": "Su. Sha. 10.4",
    "dc_dutta": "Weeks 27–30 · Third trimester: Third trimester begins at 28 weeks; FH ≈ gestational weeks in cm (±2). Anti-D 300 mcg at 28 weeks if Rh-negative & indirect Coombs negative; Tdap 27–36 weeks; kick-count (≥10 movements in 12 h); visits every 2 weeks. Screen for anemia, GDM, pre-eclampsia, IUGR.",
    "red_flags": [
      "Preterm contractions < 37 weeks",
      "Antepartum bleeding",
      "Persistent headache / visual disturbance / epigastric pain"
    ],
    "tags": [
      "masanumasika",
      "garbhini paricharya",
      "month 7",
      "diet",
      "pathya",
      "ksheera",
      "ghrita",
      "ahara",
      "sushruta",
      "apathya: Heavy, oily or fermented foods; Long standing/travel; sleeping on back"
    ],
    "plan": {
      "stage": "Sarvanga-Pratyanga Vibhaga",
      "weeks": "27–30",
      "trimester": 3,
      "fetal": "All body parts and organs are fully developed (Sarvairbhavair Apyayate). Mother becomes fatigued (Klanta) due to maximal fetal demands.",
      "ksheera": {
        "name": "Prithakparnyadi Siddha Ghrita",
        "detail": "Ghee processed with Prithakparnyadi Gana (Prishniparni, Bala, Shatavari, Vidari) — 1 tsp with warm milk if prescribed."
      },
      "pathya": [
        "Prithakparnyadi ghrita as per physician",
        "Easily digestible, small frequent meals (5–6/day)",
        "Fibre & hydration: stewed fruit, ghee-dalia, soaked raisins at night",
        "Buttermilk with cumin and rock-salt at lunch",
        "Iron + calcium given 2 hours apart"
      ],
      "avoid": [
        "Heavy, oily or fermented foods",
        "Long standing/travel; sleeping on back",
        "Suppression of natural urges, tight garments",
        "Emotional stress and loud noise"
      ],
      "rationale": "Prithakparnyadi drugs are Garbhasthapaka, Brimhana and Vatanulomaka — suit the weight, backache and Vata-vitiation of the third trimester.",
      "tip": "Start Kegel exercises and antenatal birth-preparation classes."
    },
    "id": "mp-m7-sushruta",
    "title": "Sushruta Samhita — Month 7 Garbhini Paricharya",
    "domain": "garbhini",
    "sanskrit_shloka": "सप्तमे पृथक्पर्ण्यादिसिद्धं घृतं पाययेत्",
    "transliteration": "saptame pṛthakparṇyādisiddhaṃ ghṛtaṃ pāyayet",
    "hindi_meaning": "सातवें माह में पृथक्पर्ण्यादि सिद्ध घृत पिलाएँ।",
    "english_clinical_summary": "7th month: Prithakparnyadi-siddha ghee. Pathya: Prithakparnyadi ghrita as per physician; Easily digestible, small frequent meals (5–6/day); Fibre & hydration: stewed fruit, ghee-dalia, soaked raisins at night. Ksheera/Ghrita: Prithakparnyadi Siddha Ghrita — Ghee processed with Prithakparnyadi Gana (Prishniparni, Bala, Shatavari, Vidari) — 1 tsp with warm milk if prescribed. Rationale: Prithakparnyadi drugs are Garbhasthapaka, Brimhana and Vatanulomaka — suit the weight, backache and Vata-vitiation of the third trimester.",
    "dc_dutta_correlation": "Weeks 27–30 · Third trimester: Third trimester begins at 28 weeks; FH ≈ gestational weeks in cm (±2). Anti-D 300 mcg at 28 weeks if Rh-negative & indirect Coombs negative; Tdap 27–36 weeks; kick-count (≥10 movements in 12 h); visits every 2 weeks. Screen for anemia, GDM, pre-eclampsia, IUGR.",
    "keywords": [
      "masanumasika",
      "garbhini paricharya",
      "month 7",
      "diet",
      "pathya",
      "ksheera",
      "ghrita",
      "ahara",
      "sushruta",
      "apathya: Heavy, oily or fermented foods; Long standing/travel; sleeping on back"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Month 7 me konsa ksheera-paka sabse labhadayak hai?",
      "Month 7 me DC Dutta ke anusaar konsa scan ya test karwayein?",
      "Month 7 ke classical red flags aur upadrava kya hain?"
    ]
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
    "ritu": null,
    "title": "Charaka Samhita — 8th Month Ojas Instability & Ksheera-Yavagu Regimen",
    "citation": "Charaka Samhita, Sharira Sthana 8/24",
    "sanskrit_shloka": "अष्टमे मासि गर्भश्च माता च परस्परत ओजोऽऽददाते, तस्मात्तदा गर्भिणी मुहुर्मुहुर्मुदिता मुहुर्मुहुश्च म्लाना भवति। ओजसोऽनवस्थितत्वात्॥",
    "transliteration": "aṣṭame māsi garbhaśca mātā ca parasparata ojo''dadāte, tasmāttadā garbhiṇī muhurmuhurmuditā muhurmuhuśca mlānā bhavati | ojaso'navasthitatvāt ||",
    "hindi_meaning": "आठवें महीने में ओज माता और गर्भ के बीच रसवाही नाड़ियों द्वारा बार-बार आदान-प्रदान करता है (अस्थिर रहता है)। इस कारण गर्भिणी कभी अत्यधिक प्रसन्न (उत्साही) और कभी अचानक ग्लानि (थकी हुई/उदास) प्रतीत होती है। इस मास में प्रसव होने पर ओज के अभाव के कारण माता और शिशु दोनों का जीवन संशयास्पद होता है। अतः क्षीर-यवागु घृतयुक्त आहार और शान्तिपूर्ण ओजोरक्षक परिचर्या दें।",
    "english_clinical_summary": "In the eighth month, vital Ojas remains physiologically unstable, continually circulating between mother and fetus via the placental-umbilical vessels. Consequently, the mother experiences alternating bouts of elation and profound fatigue. Delivery during this month is fraught with peril for both mother and neonate due to transient lack of Ojas (depressed immune resilience). Clinical regimen demands Ksheera-Yavagu with cow's ghee, emotional tranquility, avoidance of travel, and complete preservation of maternal energy.",
    "dc_dutta_correlation": "DC Dutta Ch. 4 (32-36 weeks) & Ch. 21 (Preterm Labor): Corresponds to late preterm vulnerability (32-36 weeks gestation). Fetal pulmonary surfactant production is still incomplete, temperature regulation is fragile, and neonatal morbidity from sepsis and respiratory distress syndrome (RDS) is significantly high if born prematurely before 36 weeks.",
    "samprapti_yukti": "Ojas is the Sara of all Dhatus. Due to rapid third-trimester fetal weight accrual and somatic transfer, Ojas oscillates. Madhura-Snigdha Ksheera and Ghrita provide instant Ojas replenishment.",
    "red_flags": [
      "Preterm labor contractions (>4 painful uterine contractions per hour)",
      "Watery fluid leakage PV (PPROM - Preterm premature rupture of membranes)",
      "Elevated blood pressure (>140/90 mmHg) with proteinuria (preeclampsia risk)"
    ],
    "related_questions": [
      "8th Month me Ojas asthir kyun hota hai aur kya khayein?",
      "8th month me delivery hone par baby aur mother ko kya khatra rehta hai?",
      "DC Dutta me 32-36 weeks preterm delivery ke neonatal risks kya bataye gaye hain?"
    ],
    "keywords": [
      "charaka",
      "8th month",
      "ojas",
      "ksheera-yavagu",
      "ojas instability",
      "preterm",
      "jatisutriya"
    ],
    "sanskrit": "अष्टमे मासि गर्भश्च माता च परस्परत ओजोऽऽददाते, तस्मात्तदा गर्भिणी मुहुर्मुहुर्मुदिता मुहुर्मुहुश्च म्लाना भवति। ओजसोऽनवस्थितत्वात्॥",
    "iast": "aṣṭame māsi garbhaśca mātā ca parasparata ojo''dadāte, tasmāttadā garbhiṇī muhurmuhurmuditā muhurmuhuśca mlānā bhavati | ojaso'navasthitatvāt ||",
    "hindi": "आठवें महीने में ओज माता और गर्भ के बीच रसवाही नाड़ियों द्वारा बार-बार आदान-प्रदान करता है (अस्थिर रहता है)। इस कारण गर्भिणी कभी अत्यधिक प्रसन्न (उत्साही) और कभी अचानक ग्लानि (थकी हुई/उदास) प्रतीत होती है। इस मास में प्रसव होने पर ओज के अभाव के कारण माता और शिशु दोनों का जीवन संशयास्पद होता है। अतः क्षीर-यवागु घृतयुक्त आहार और शान्तिपूर्ण ओजोरक्षक परिचर्या दें।",
    "english": "In the eighth month, vital Ojas remains physiologically unstable, continually circulating between mother and fetus via the placental-umbilical vessels. Consequently, the mother experiences alternating bouts of elation and profound fatigue. Delivery during this month is fraught with peril for both mother and neonate due to transient lack of Ojas (depressed immune resilience). Clinical regimen demands Ksheera-Yavagu with cow's ghee, emotional tranquility, avoidance of travel, and complete preservation of maternal energy.",
    "dc_dutta": "DC Dutta Ch. 4 (32-36 weeks) & Ch. 21 (Preterm Labor): Corresponds to late preterm vulnerability (32-36 weeks gestation). Fetal pulmonary surfactant production is still incomplete, temperature regulation is fragile, and neonatal morbidity from sepsis and respiratory distress syndrome (RDS) is significantly high if born prematurely before 36 weeks.",
    "tags": [
      "charaka",
      "8th month",
      "ojas",
      "ksheera-yavagu",
      "ojas instability",
      "preterm",
      "jatisutriya"
    ],
    "plan": {}
  },
  {
    "month": 8,
    "ritu": null,
    "samhita": "charaka",
    "stage": "masanumasika",
    "sanskrit": "अष्टमे मासे क्षीरयवागूं सर्पिष्मतीं पाययेत्; बदरसिद्धेन जलेन आस्थापनम्, मधुरौषधसिद्धेन तैलेनानुवासनम्",
    "iast": "aṣṭame māse kṣīrayavāgūṃ sarpiṣmatīṃ pāyayet; badarasiddhena jalenāsthāpanam, madhurauṣadhasiddhena tailenānuvāsanam",
    "hindi": "आठवें माह में घृत युक्त क्षीर-यवागू; बदर सिद्ध जल से आस्थापन तथा मधुर औषध सिद्ध तैल से अनुवासन।",
    "english": "8th month: ghee-added milk Yavagu; Asthapana Basti with Badara-siddha decoction and Anuvasana with Madhura-siddha oil (physician-supervised). Ojas is unstable. Pathya: Ksheera-Yavagu with ghee, 1 bowl, evenings; Ojovardhaka food: milk, ghee, dates, soaked almonds, saffron, mishri; Mamsa-rasa / dal soup with rice for lunch. Ksheera/Ghrita: Ksheera Yavagu with Ghrita + Basti (physician only) — Thin rice-milk Yavagu with ghee. Charaka: Asthapana with Badara-siddha Kwatha + Anuvasana with Madhura-aushadha taila — ONLY under a BAMS physician with obstetric clearance. Rationale: Ojas instability makes mother and fetus vulnerable; Madhura-Snigdha-Sheeta nourishment and serenity stabilise Ojas. Basti removes Vata and prepares the Apana pathway.",
    "citation": "Ch. Sha. 8.32; Ch. Sha. 4.22 (Ojas)",
    "dc_dutta": "Weeks 31–34 · Late preterm window: Rapid weight gain and brain growth; lungs maturing. Growth scan with liquor and Doppler if indicated; NST for high-risk; steroids (betamethasone) if preterm delivery anticipated. Fetal presentation assessed from 32–34 weeks; visits every 2 weeks (weekly from 36).",
    "red_flags": [
      "Regular painful contractions",
      "Rupture of membranes",
      "Bleeding PV",
      "Severe pre-eclampsia features",
      "Absent / reduced fetal movement"
    ],
    "tags": [
      "masanumasika",
      "garbhini paricharya",
      "month 8",
      "diet",
      "pathya",
      "ksheera",
      "ghrita",
      "ahara",
      "charaka",
      "apathya: Fear, grief, anger, loud shocks (Ojas-kshaya); Virechana, strong purgatives, Raktamokshana"
    ],
    "plan": {
      "stage": "Ojas Sancharana (Unstable Ojas)",
      "weeks": "31–34",
      "trimester": 3,
      "fetal": "Ojas oscillates between mother and fetus (Ojas-sancharitvam): when more in the mother the fetus is weak; when more in the fetus the mother is lethargic. Delivery in this month carries risk — hence special Ojas rakshana.",
      "ksheera": {
        "name": "Ksheera Yavagu with Ghrita + Basti (physician only)",
        "detail": "Thin rice-milk Yavagu with ghee. Charaka: Asthapana with Badara-siddha Kwatha + Anuvasana with Madhura-aushadha taila — ONLY under a BAMS physician with obstetric clearance."
      },
      "pathya": [
        "Ksheera-Yavagu with ghee, 1 bowl, evenings",
        "Ojovardhaka food: milk, ghee, dates, soaked almonds, saffron, mishri",
        "Mamsa-rasa / dal soup with rice for lunch",
        "Light dinner before 7:30 pm",
        "Hydration 2.5 L; fibre to prevent Vibandha"
      ],
      "avoid": [
        "Fear, grief, anger, loud shocks (Ojas-kshaya)",
        "Virechana, strong purgatives, Raktamokshana",
        "Travel, climbing, exertion",
        "Heavy / dry / cold meals"
      ],
      "rationale": "Ojas instability makes mother and fetus vulnerable; Madhura-Snigdha-Sheeta nourishment and serenity stabilise Ojas. Basti removes Vata and prepares the Apana pathway.",
      "tip": "Plan hospital bag, birth plan and emergency transport now. Practise relaxed breathing daily."
    },
    "id": "mp-m8-charaka",
    "title": "Charaka Samhita — Month 8 Garbhini Paricharya",
    "domain": "garbhini",
    "sanskrit_shloka": "अष्टमे मासे क्षीरयवागूं सर्पिष्मतीं पाययेत्; बदरसिद्धेन जलेन आस्थापनम्, मधुरौषधसिद्धेन तैलेनानुवासनम्",
    "transliteration": "aṣṭame māse kṣīrayavāgūṃ sarpiṣmatīṃ pāyayet; badarasiddhena jalenāsthāpanam, madhurauṣadhasiddhena tailenānuvāsanam",
    "hindi_meaning": "आठवें माह में घृत युक्त क्षीर-यवागू; बदर सिद्ध जल से आस्थापन तथा मधुर औषध सिद्ध तैल से अनुवासन।",
    "english_clinical_summary": "8th month: ghee-added milk Yavagu; Asthapana Basti with Badara-siddha decoction and Anuvasana with Madhura-siddha oil (physician-supervised). Ojas is unstable. Pathya: Ksheera-Yavagu with ghee, 1 bowl, evenings; Ojovardhaka food: milk, ghee, dates, soaked almonds, saffron, mishri; Mamsa-rasa / dal soup with rice for lunch. Ksheera/Ghrita: Ksheera Yavagu with Ghrita + Basti (physician only) — Thin rice-milk Yavagu with ghee. Charaka: Asthapana with Badara-siddha Kwatha + Anuvasana with Madhura-aushadha taila — ONLY under a BAMS physician with obstetric clearance. Rationale: Ojas instability makes mother and fetus vulnerable; Madhura-Snigdha-Sheeta nourishment and serenity stabilise Ojas. Basti removes Vata and prepares the Apana pathway.",
    "dc_dutta_correlation": "Weeks 31–34 · Late preterm window: Rapid weight gain and brain growth; lungs maturing. Growth scan with liquor and Doppler if indicated; NST for high-risk; steroids (betamethasone) if preterm delivery anticipated. Fetal presentation assessed from 32–34 weeks; visits every 2 weeks (weekly from 36).",
    "keywords": [
      "masanumasika",
      "garbhini paricharya",
      "month 8",
      "diet",
      "pathya",
      "ksheera",
      "ghrita",
      "ahara",
      "charaka",
      "apathya: Fear, grief, anger, loud shocks (Ojas-kshaya); Virechana, strong purgatives, Raktamokshana"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Month 8 me konsa ksheera-paka sabse labhadayak hai?",
      "Month 8 me DC Dutta ke anusaar konsa scan ya test karwayein?",
      "Month 8 ke classical red flags aur upadrava kya hain?"
    ]
  },
  {
    "month": 8,
    "ritu": null,
    "samhita": "sushruta",
    "stage": "masanumasika",
    "sanskrit": "अष्टमे क्षीरयवागूं सर्पिषा; बलातिबलादिभिः आस्थापनम्",
    "iast": "aṣṭame kṣīrayavāgūṃ sarpiṣā; balātibalādibhiḥ āsthāpanam",
    "hindi": "आठवें माह में घृत सहित क्षीर-यवागू; बला-अतिबला आदि से आस्थापन।",
    "english": "8th month: milk Yavagu with ghee; Asthapana with Bala-Atibala group (supervised). Pathya: Ksheera-Yavagu with ghee, 1 bowl, evenings; Ojovardhaka food: milk, ghee, dates, soaked almonds, saffron, mishri; Mamsa-rasa / dal soup with rice for lunch. Ksheera/Ghrita: Ksheera Yavagu with Ghrita + Basti (physician only) — Thin rice-milk Yavagu with ghee. Charaka: Asthapana with Badara-siddha Kwatha + Anuvasana with Madhura-aushadha taila — ONLY under a BAMS physician with obstetric clearance. Rationale: Ojas instability makes mother and fetus vulnerable; Madhura-Snigdha-Sheeta nourishment and serenity stabilise Ojas. Basti removes Vata and prepares the Apana pathway.",
    "citation": "Su. Sha. 10.4; Su. Sha. 3 (Ojas)",
    "dc_dutta": "Weeks 31–34 · Late preterm window: Rapid weight gain and brain growth; lungs maturing. Growth scan with liquor and Doppler if indicated; NST for high-risk; steroids (betamethasone) if preterm delivery anticipated. Fetal presentation assessed from 32–34 weeks; visits every 2 weeks (weekly from 36).",
    "red_flags": [
      "Regular painful contractions",
      "Rupture of membranes",
      "Bleeding PV",
      "Severe pre-eclampsia features",
      "Absent / reduced fetal movement"
    ],
    "tags": [
      "masanumasika",
      "garbhini paricharya",
      "month 8",
      "diet",
      "pathya",
      "ksheera",
      "ghrita",
      "ahara",
      "sushruta",
      "apathya: Fear, grief, anger, loud shocks (Ojas-kshaya); Virechana, strong purgatives, Raktamokshana"
    ],
    "plan": {
      "stage": "Ojas Sancharana (Unstable Ojas)",
      "weeks": "31–34",
      "trimester": 3,
      "fetal": "Ojas oscillates between mother and fetus (Ojas-sancharitvam): when more in the mother the fetus is weak; when more in the fetus the mother is lethargic. Delivery in this month carries risk — hence special Ojas rakshana.",
      "ksheera": {
        "name": "Ksheera Yavagu with Ghrita + Basti (physician only)",
        "detail": "Thin rice-milk Yavagu with ghee. Charaka: Asthapana with Badara-siddha Kwatha + Anuvasana with Madhura-aushadha taila — ONLY under a BAMS physician with obstetric clearance."
      },
      "pathya": [
        "Ksheera-Yavagu with ghee, 1 bowl, evenings",
        "Ojovardhaka food: milk, ghee, dates, soaked almonds, saffron, mishri",
        "Mamsa-rasa / dal soup with rice for lunch",
        "Light dinner before 7:30 pm",
        "Hydration 2.5 L; fibre to prevent Vibandha"
      ],
      "avoid": [
        "Fear, grief, anger, loud shocks (Ojas-kshaya)",
        "Virechana, strong purgatives, Raktamokshana",
        "Travel, climbing, exertion",
        "Heavy / dry / cold meals"
      ],
      "rationale": "Ojas instability makes mother and fetus vulnerable; Madhura-Snigdha-Sheeta nourishment and serenity stabilise Ojas. Basti removes Vata and prepares the Apana pathway.",
      "tip": "Plan hospital bag, birth plan and emergency transport now. Practise relaxed breathing daily."
    },
    "id": "mp-m8-sushruta",
    "title": "Sushruta Samhita — Month 8 Garbhini Paricharya",
    "domain": "garbhini",
    "sanskrit_shloka": "अष्टमे क्षीरयवागूं सर्पिषा; बलातिबलादिभिः आस्थापनम्",
    "transliteration": "aṣṭame kṣīrayavāgūṃ sarpiṣā; balātibalādibhiḥ āsthāpanam",
    "hindi_meaning": "आठवें माह में घृत सहित क्षीर-यवागू; बला-अतिबला आदि से आस्थापन।",
    "english_clinical_summary": "8th month: milk Yavagu with ghee; Asthapana with Bala-Atibala group (supervised). Pathya: Ksheera-Yavagu with ghee, 1 bowl, evenings; Ojovardhaka food: milk, ghee, dates, soaked almonds, saffron, mishri; Mamsa-rasa / dal soup with rice for lunch. Ksheera/Ghrita: Ksheera Yavagu with Ghrita + Basti (physician only) — Thin rice-milk Yavagu with ghee. Charaka: Asthapana with Badara-siddha Kwatha + Anuvasana with Madhura-aushadha taila — ONLY under a BAMS physician with obstetric clearance. Rationale: Ojas instability makes mother and fetus vulnerable; Madhura-Snigdha-Sheeta nourishment and serenity stabilise Ojas. Basti removes Vata and prepares the Apana pathway.",
    "dc_dutta_correlation": "Weeks 31–34 · Late preterm window: Rapid weight gain and brain growth; lungs maturing. Growth scan with liquor and Doppler if indicated; NST for high-risk; steroids (betamethasone) if preterm delivery anticipated. Fetal presentation assessed from 32–34 weeks; visits every 2 weeks (weekly from 36).",
    "keywords": [
      "masanumasika",
      "garbhini paricharya",
      "month 8",
      "diet",
      "pathya",
      "ksheera",
      "ghrita",
      "ahara",
      "sushruta",
      "apathya: Fear, grief, anger, loud shocks (Ojas-kshaya); Virechana, strong purgatives, Raktamokshana"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Month 8 me konsa ksheera-paka sabse labhadayak hai?",
      "Month 8 me DC Dutta ke anusaar konsa scan ya test karwayein?",
      "Month 8 ke classical red flags aur upadrava kya hain?"
    ]
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
    "ritu": null,
    "title": "Charaka Samhita — 9th Month Anuvasana Basti & Yoni Pichu Protocol",
    "citation": "Charaka Samhita, Sharira Sthana 8/32",
    "sanskrit_shloka": "नवमे मासि गर्भिण्या मधुरौषधसिद्धेन सर्पिषा पयसा चानूवासयेत्। अपि चैवास्या योनौ पिचुं दद्यात् सार्षपतैलेन वा मधुकसिद्धेन वा वातानुलोमनाय सुखप्रसवाय च॥",
    "transliteration": "navame māsi garbhiṇyā madhurauṣadhasiddhena sarpiṣā payasā cānūvāsayet | api caivāsyā yonau picuṁ dadyāt sārṣapatailena vā madhukasiddhena vā vātānulomanāya sukhaprasavāya ca ||",
    "hindi_meaning": "नौवें महीने में गर्भिणी को मधुर गण की औषधियों से सिद्ध तैल/घृत द्वारा अनुवासन बस्ति देनी चाहिए, तथा मधुर औषध सिद्ध तैल (जैसे बला तैल / मधुकादि तैल) का योनि पिचु (medicated vaginal tampon) धारण कराना चाहिए। इससे अपान वायु का अनुलोमन होता है, गर्भाशय ग्रीवा एवं योनि मार्ग कोमल और स्निग्ध हो जाते हैं, और बिना कष्ट के सुखप्रसव होता है।",
    "english_clinical_summary": "In the ninth month, Charaka mandates Anuvasana Basti (unctuous retention enema) prepared with Madhura Gana medicated oils (such as Bala Taila or Sukumara Ghrita) alongside sterile Yoni Pichu (medicated vaginal tampon) soaked in Bala Taila or Yashtimadhu Taila. This pacifies Apana Vata, softens the cervix and pelvic ligaments, lubricates the birth canal, ensures downward direction of labor forces, and facilitates uncomplicated normal vaginal delivery (Sukhaprasava).",
    "dc_dutta_correlation": "DC Dutta Ch. 11 & 12 (Physiology and Mechanism of Normal Labor): Direct correlation with cervical ripening, softening, and favorable Bishop score (cervical effacement and dilation). Pelvic floor relaxation and perineal lubrication reduce second-stage perineal lacerations and dysfunctional labor.",
    "samprapti_yukti": "Apana Vata governs the expulsion of Garbha, Mutra, Purisha, and Artava. Medicated oil Basti directly enters the rectal ampulla, pacifying Apana Vata at its primary seat (Pakvashaya) and softening the vaginal canal via Snigdha Guna.",
    "red_flags": [
      "Active painless bleeding PV (Placenta Previa - Basti and Pichu are strictly contraindicated)",
      "Foul-smelling vaginal discharge (Chorioamnionitis)",
      "Spontaneous rupture of membranes with clear or meconium liquor"
    ],
    "related_questions": [
      "9th Month me Anuvasana Basti aur Yoni Pichu ka classical clinical procedure kya hai?",
      "Yoni Pichu se cervical ripening aur normal delivery me kaise madad milti hai?",
      "Konsi obstetric conditions me 9th month Basti strictly contraindicated hoti hai?"
    ],
    "keywords": [
      "charaka",
      "9th month",
      "anuvasana basti",
      "yoni pichu",
      "bala taila",
      "sukhaprasava",
      "cervical ripening"
    ],
    "sanskrit": "नवमे मासि गर्भिण्या मधुरौषधसिद्धेन सर्पिषा पयसा चानूवासयेत्। अपि चैवास्या योनौ पिचुं दद्यात् सार्षपतैलेन वा मधुकसिद्धेन वा वातानुलोमनाय सुखप्रसवाय च॥",
    "iast": "navame māsi garbhiṇyā madhurauṣadhasiddhena sarpiṣā payasā cānūvāsayet | api caivāsyā yonau picuṁ dadyāt sārṣapatailena vā madhukasiddhena vā vātānulomanāya sukhaprasavāya ca ||",
    "hindi": "नौवें महीने में गर्भिणी को मधुर गण की औषधियों से सिद्ध तैल/घृत द्वारा अनुवासन बस्ति देनी चाहिए, तथा मधुर औषध सिद्ध तैल (जैसे बला तैल / मधुकादि तैल) का योनि पिचु (medicated vaginal tampon) धारण कराना चाहिए। इससे अपान वायु का अनुलोमन होता है, गर्भाशय ग्रीवा एवं योनि मार्ग कोमल और स्निग्ध हो जाते हैं, और बिना कष्ट के सुखप्रसव होता है।",
    "english": "In the ninth month, Charaka mandates Anuvasana Basti (unctuous retention enema) prepared with Madhura Gana medicated oils (such as Bala Taila or Sukumara Ghrita) alongside sterile Yoni Pichu (medicated vaginal tampon) soaked in Bala Taila or Yashtimadhu Taila. This pacifies Apana Vata, softens the cervix and pelvic ligaments, lubricates the birth canal, ensures downward direction of labor forces, and facilitates uncomplicated normal vaginal delivery (Sukhaprasava).",
    "dc_dutta": "DC Dutta Ch. 11 & 12 (Physiology and Mechanism of Normal Labor): Direct correlation with cervical ripening, softening, and favorable Bishop score (cervical effacement and dilation). Pelvic floor relaxation and perineal lubrication reduce second-stage perineal lacerations and dysfunctional labor.",
    "tags": [
      "charaka",
      "9th month",
      "anuvasana basti",
      "yoni pichu",
      "bala taila",
      "sukhaprasava",
      "cervical ripening"
    ],
    "plan": {}
  },
  {
    "month": 9,
    "ritu": null,
    "samhita": "charaka",
    "stage": "masanumasika",
    "sanskrit": "नवमे मासे स्निग्धैर्मांसरसौदनैः; मधुरौषधसिद्धेन तैलेनानुवासनम्; योनिपिचुः",
    "iast": "navame māse snigdhair māṃsarasaudanaiḥ; madhurauṣadhasiddhena tailenānuvāsanam; yonipicuḥ",
    "hindi": "नवें माह में स्निग्ध मांसरस-भात; मधुर औषध सिद्ध तैल से अनुवासन तथा योनि-पिचु।",
    "english": "9th month: unctuous rice with Mamsa-rasa; Anuvasana Basti with Madhura-siddha oil and Yoni Pichu for Vata-anulomana and Sukhaprasava. Pathya: Snigdha rice with ghee, dal soup or Jangala-mamsa rasa; Dates 3–5/day from 36 weeks (supports labour); Warm milk with ghee and Shatavari at bedtime. Ksheera/Ghrita: Anuvasana Basti + Yoni Pichu + Snigdha Mamsarasa-Anna — Anuvasana Basti with Madhura-aushadha siddha Taila and Yoni Pichu (cotton swab soaked in medicated oil placed in vagina) for Vata-anulomana & cervical suppleness — by physician only. Meals: Snigdha rice with Mamsa-rasa / dal-ghee. Rationale: Snigdha Anuvasana and Pichu pacify Apana Vata, soften the birth-canal and promote Sukhaprasava; Snigdha food provides strength for labour.",
    "citation": "Ch. Sha. 8.32 (Masanumasika; Pichu & Anuvasana)",
    "dc_dutta": "Weeks 35–40+ · Term, engagement & labour: Term = 37–41+6 weeks. Lightening (engagement) in primigravida 2–3 weeks before labour; true labour: regular, progressive contractions, show, cervical dilatation. Weekly visits from 36 weeks, NST/AFI as indicated; Bishop score; induction considered after 41 weeks. Sukhaprasava = spontaneous vaginal delivery with active management of third stage.",
    "red_flags": [
      "Leaking liquor / rupture of membranes",
      "Regular contractions every 5 min",
      "Reduced or absent fetal movement",
      "Bleeding PV",
      "Severe headache, blurred vision, convulsions"
    ],
    "tags": [
      "masanumasika",
      "garbhini paricharya",
      "month 9",
      "diet",
      "pathya",
      "ksheera",
      "ghrita",
      "ahara",
      "charaka",
      "apathya: Constipation (Vibandha) — treat early; Cold, dry and heavy foods"
    ],
    "plan": {
      "stage": "Prasava Kala (Term)",
      "weeks": "35–40+",
      "trimester": 3,
      "fetal": "Garbha is fully developed; Prasava Kala occurs in the 9th–12th month. Head engages, Apana Vayu directs the fetus downward for Sukhaprasava.",
      "ksheera": {
        "name": "Anuvasana Basti + Yoni Pichu + Snigdha Mamsarasa-Anna",
        "detail": "Anuvasana Basti with Madhura-aushadha siddha Taila and Yoni Pichu (cotton swab soaked in medicated oil placed in vagina) for Vata-anulomana & cervical suppleness — by physician only. Meals: Snigdha rice with Mamsa-rasa / dal-ghee."
      },
      "pathya": [
        "Snigdha rice with ghee, dal soup or Jangala-mamsa rasa",
        "Dates 3–5/day from 36 weeks (supports labour)",
        "Warm milk with ghee and Shatavari at bedtime",
        "Raspberry-leaf / herbal teas only if prescribed",
        "Walk, squat practice (supervised), Pranayama; pack hospital bag",
        "Sutikagara (delivery room) preparation"
      ],
      "avoid": [
        "Constipation (Vibandha) — treat early",
        "Cold, dry and heavy foods",
        "Panic, sleeplessness, social stress",
        "Self-induced labour measures (castor oil, strong herbs)"
      ],
      "rationale": "Snigdha Anuvasana and Pichu pacify Apana Vata, soften the birth-canal and promote Sukhaprasava; Snigdha food provides strength for labour.",
      "tip": "Know the signs of labour and when to leave for hospital; keep ANC file and Link Code at hand."
    },
    "id": "mp-m9-charaka",
    "title": "Charaka Samhita — Month 9 Garbhini Paricharya",
    "domain": "garbhini",
    "sanskrit_shloka": "नवमे मासे स्निग्धैर्मांसरसौदनैः; मधुरौषधसिद्धेन तैलेनानुवासनम्; योनिपिचुः",
    "transliteration": "navame māse snigdhair māṃsarasaudanaiḥ; madhurauṣadhasiddhena tailenānuvāsanam; yonipicuḥ",
    "hindi_meaning": "नवें माह में स्निग्ध मांसरस-भात; मधुर औषध सिद्ध तैल से अनुवासन तथा योनि-पिचु।",
    "english_clinical_summary": "9th month: unctuous rice with Mamsa-rasa; Anuvasana Basti with Madhura-siddha oil and Yoni Pichu for Vata-anulomana and Sukhaprasava. Pathya: Snigdha rice with ghee, dal soup or Jangala-mamsa rasa; Dates 3–5/day from 36 weeks (supports labour); Warm milk with ghee and Shatavari at bedtime. Ksheera/Ghrita: Anuvasana Basti + Yoni Pichu + Snigdha Mamsarasa-Anna — Anuvasana Basti with Madhura-aushadha siddha Taila and Yoni Pichu (cotton swab soaked in medicated oil placed in vagina) for Vata-anulomana & cervical suppleness — by physician only. Meals: Snigdha rice with Mamsa-rasa / dal-ghee. Rationale: Snigdha Anuvasana and Pichu pacify Apana Vata, soften the birth-canal and promote Sukhaprasava; Snigdha food provides strength for labour.",
    "dc_dutta_correlation": "Weeks 35–40+ · Term, engagement & labour: Term = 37–41+6 weeks. Lightening (engagement) in primigravida 2–3 weeks before labour; true labour: regular, progressive contractions, show, cervical dilatation. Weekly visits from 36 weeks, NST/AFI as indicated; Bishop score; induction considered after 41 weeks. Sukhaprasava = spontaneous vaginal delivery with active management of third stage.",
    "keywords": [
      "masanumasika",
      "garbhini paricharya",
      "month 9",
      "diet",
      "pathya",
      "ksheera",
      "ghrita",
      "ahara",
      "charaka",
      "apathya: Constipation (Vibandha) — treat early; Cold, dry and heavy foods"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Month 9 me konsa ksheera-paka sabse labhadayak hai?",
      "Month 9 me DC Dutta ke anusaar konsa scan ya test karwayein?",
      "Month 9 ke classical red flags aur upadrava kya hain?"
    ]
  },
  {
    "month": 9,
    "ritu": null,
    "samhita": "sushruta",
    "stage": "masanumasika",
    "sanskrit": "नवमे स्निग्धमाहारम्; मधुरतैलैरनुवासनम्; योनौ पिचुं दद्यात्; सूतिकागारप्रवेशः",
    "iast": "navame snigdham āhāram; madhuratailair anuvāsanam; yonau picuṃ dadyāt; sūtikāgārapraveśaḥ",
    "hindi": "नवें माह में स्निग्ध आहार, मधुर तैल से अनुवासन, योनि में पिचु और सूतिकागार-प्रवेश।",
    "english": "9th month: unctuous diet, Madhura-taila Anuvasana, Yoni Pichu and entry to the Sutikagara (delivery room). Pathya: Snigdha rice with ghee, dal soup or Jangala-mamsa rasa; Dates 3–5/day from 36 weeks (supports labour); Warm milk with ghee and Shatavari at bedtime. Ksheera/Ghrita: Anuvasana Basti + Yoni Pichu + Snigdha Mamsarasa-Anna — Anuvasana Basti with Madhura-aushadha siddha Taila and Yoni Pichu (cotton swab soaked in medicated oil placed in vagina) for Vata-anulomana & cervical suppleness — by physician only. Meals: Snigdha rice with Mamsa-rasa / dal-ghee. Rationale: Snigdha Anuvasana and Pichu pacify Apana Vata, soften the birth-canal and promote Sukhaprasava; Snigdha food provides strength for labour.",
    "citation": "Su. Sha. 10.4, 10.8 (Sutikagara)",
    "dc_dutta": "Weeks 35–40+ · Term, engagement & labour: Term = 37–41+6 weeks. Lightening (engagement) in primigravida 2–3 weeks before labour; true labour: regular, progressive contractions, show, cervical dilatation. Weekly visits from 36 weeks, NST/AFI as indicated; Bishop score; induction considered after 41 weeks. Sukhaprasava = spontaneous vaginal delivery with active management of third stage.",
    "red_flags": [
      "Leaking liquor / rupture of membranes",
      "Regular contractions every 5 min",
      "Reduced or absent fetal movement",
      "Bleeding PV",
      "Severe headache, blurred vision, convulsions"
    ],
    "tags": [
      "masanumasika",
      "garbhini paricharya",
      "month 9",
      "diet",
      "pathya",
      "ksheera",
      "ghrita",
      "ahara",
      "sushruta",
      "apathya: Constipation (Vibandha) — treat early; Cold, dry and heavy foods"
    ],
    "plan": {
      "stage": "Prasava Kala (Term)",
      "weeks": "35–40+",
      "trimester": 3,
      "fetal": "Garbha is fully developed; Prasava Kala occurs in the 9th–12th month. Head engages, Apana Vayu directs the fetus downward for Sukhaprasava.",
      "ksheera": {
        "name": "Anuvasana Basti + Yoni Pichu + Snigdha Mamsarasa-Anna",
        "detail": "Anuvasana Basti with Madhura-aushadha siddha Taila and Yoni Pichu (cotton swab soaked in medicated oil placed in vagina) for Vata-anulomana & cervical suppleness — by physician only. Meals: Snigdha rice with Mamsa-rasa / dal-ghee."
      },
      "pathya": [
        "Snigdha rice with ghee, dal soup or Jangala-mamsa rasa",
        "Dates 3–5/day from 36 weeks (supports labour)",
        "Warm milk with ghee and Shatavari at bedtime",
        "Raspberry-leaf / herbal teas only if prescribed",
        "Walk, squat practice (supervised), Pranayama; pack hospital bag",
        "Sutikagara (delivery room) preparation"
      ],
      "avoid": [
        "Constipation (Vibandha) — treat early",
        "Cold, dry and heavy foods",
        "Panic, sleeplessness, social stress",
        "Self-induced labour measures (castor oil, strong herbs)"
      ],
      "rationale": "Snigdha Anuvasana and Pichu pacify Apana Vata, soften the birth-canal and promote Sukhaprasava; Snigdha food provides strength for labour.",
      "tip": "Know the signs of labour and when to leave for hospital; keep ANC file and Link Code at hand."
    },
    "id": "mp-m9-sushruta",
    "title": "Sushruta Samhita — Month 9 Garbhini Paricharya",
    "domain": "garbhini",
    "sanskrit_shloka": "नवमे स्निग्धमाहारम्; मधुरतैलैरनुवासनम्; योनौ पिचुं दद्यात्; सूतिकागारप्रवेशः",
    "transliteration": "navame snigdham āhāram; madhuratailair anuvāsanam; yonau picuṃ dadyāt; sūtikāgārapraveśaḥ",
    "hindi_meaning": "नवें माह में स्निग्ध आहार, मधुर तैल से अनुवासन, योनि में पिचु और सूतिकागार-प्रवेश।",
    "english_clinical_summary": "9th month: unctuous diet, Madhura-taila Anuvasana, Yoni Pichu and entry to the Sutikagara (delivery room). Pathya: Snigdha rice with ghee, dal soup or Jangala-mamsa rasa; Dates 3–5/day from 36 weeks (supports labour); Warm milk with ghee and Shatavari at bedtime. Ksheera/Ghrita: Anuvasana Basti + Yoni Pichu + Snigdha Mamsarasa-Anna — Anuvasana Basti with Madhura-aushadha siddha Taila and Yoni Pichu (cotton swab soaked in medicated oil placed in vagina) for Vata-anulomana & cervical suppleness — by physician only. Meals: Snigdha rice with Mamsa-rasa / dal-ghee. Rationale: Snigdha Anuvasana and Pichu pacify Apana Vata, soften the birth-canal and promote Sukhaprasava; Snigdha food provides strength for labour.",
    "dc_dutta_correlation": "Weeks 35–40+ · Term, engagement & labour: Term = 37–41+6 weeks. Lightening (engagement) in primigravida 2–3 weeks before labour; true labour: regular, progressive contractions, show, cervical dilatation. Weekly visits from 36 weeks, NST/AFI as indicated; Bishop score; induction considered after 41 weeks. Sukhaprasava = spontaneous vaginal delivery with active management of third stage.",
    "keywords": [
      "masanumasika",
      "garbhini paricharya",
      "month 9",
      "diet",
      "pathya",
      "ksheera",
      "ghrita",
      "ahara",
      "sushruta",
      "apathya: Constipation (Vibandha) — treat early; Cold, dry and heavy foods"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Month 9 me konsa ksheera-paka sabse labhadayak hai?",
      "Month 9 me DC Dutta ke anusaar konsa scan ya test karwayein?",
      "Month 9 ke classical red flags aur upadrava kya hain?"
    ]
  },
  {
    "id": "charaka_sha_2_garbhotpatti",
    "samhita": "charaka",
    "sthana": "Sharira Sthana",
    "chapter": 2,
    "chapter_name": "Atulyagotriya Shariram",
    "verse": "2/3-5",
    "domain": "garbhini",
    "stage": "garbha_vriddhi",
    "month": null,
    "ritu": null,
    "title": "Charaka Samhita — Shukra-Shonita Sampat & Garbhadhana Factors",
    "citation": "Charaka Samhita, Sharira Sthana 2/3-5",
    "sanskrit_shloka": "ध्रुवं चतुर्णां सान्निध्याद्गर्भः स्याद्विधिवत्कृतः। ऋतुक्षेत्राम्बुबीजानां सामग्र्यादङ्कुरो यथा॥",
    "transliteration": "dhruvaṁ caturṇāṁ sānnidhyādgarbhaḥ syādvidhivatkṛtaḥ | ṛtukṣetrāmbubījānāṁ sāmagryādaṅkuro yathā ||",
    "hindi_meaning": "जैसे ऋतु (उचित काल/मौसम), क्षेत्र (उर्वर भूमि), अम्बु (जल/पोषण) और बीज (उत्तम बीज) की समग्रता से अंकुर उत्पन्न होता है, वैसे ही ऋतु (ऋतुकाल/ovulatory window), क्षेत्र (गर्भाशय/endometrium), अम्बु (रस/रक्त पोषण) और बीज (विशुद्ध शुक्र एवं आर्तव) की समग्रता से स्वस्थ गर्भ स्थापित होता है।",
    "english_clinical_summary": "Charaka establishes the four prerequisite cardinal factors for successful conception and embryogenesis: Ritu (ovulatory fertile window), Kshetra (healthy uterine cavity and receptive endometrium), Ambu (nutrient maternal plasma/Rasa Dhatu), and Bija (unvitiated ovum and spermatozoon). Any qualitative or quantitative deficiency in these four factors results in subfertility or spontaneous early pregnancy loss.",
    "dc_dutta_correlation": "DC Dutta Ch. 3 & 4 (Fertilization and Implantation): Corresponds directly to the pre-conceptional prerequisites: viable gametes (Bija - sperm and oocyte), correct timing during the fertile window (Ritu - days 12-16 of cycle), receptive secretory endometrium with pinopodes (Kshetra), and optimal utero-placental perfusion and hormonal milieu with progesterone and hCG (Ambu).",
    "samprapti_yukti": "Garbhadhana occurs when Vata directs Shukra and Artava together without Dosha Dushti. Ambu (Rasa Dhatu) provides initial unctuous nutrition (Sneha) to prevent Kalala desiccation.",
    "red_flags": [
      "Secondary amenorrhea with negative pregnancy test",
      "Severe lower abdominal pain with suspected ectopic gestation",
      "Habitual abortion (>2 consecutive first-trimester losses)"
    ],
    "related_questions": [
      "Charaka ke anusaar Ritu, Kshetra, Ambu aur Bija ka kya clinical mahatva hai?",
      "Pre-conceptional care me Shukra-Shonita shuddhi kaise ki jaati hai?",
      "DC Dutta me recurrent pregnancy loss ke primary causes kya bataye gaye hain?"
    ],
    "keywords": [
      "charaka",
      "atulyagotriya",
      "garbhotpatti",
      "ritu",
      "kshetra",
      "ambu",
      "bija",
      "fertilization",
      "implantation",
      "conception"
    ],
    "sanskrit": "ध्रुवं चतुर्णां सान्निध्याद्गर्भः स्याद्विधिवत्कृतः। ऋतुक्षेत्राम्बुबीजानां सामग्र्यादङ्कुरो यथा॥",
    "iast": "dhruvaṁ caturṇāṁ sānnidhyādgarbhaḥ syādvidhivatkṛtaḥ | ṛtukṣetrāmbubījānāṁ sāmagryādaṅkuro yathā ||",
    "hindi": "जैसे ऋतु (उचित काल/मौसम), क्षेत्र (उर्वर भूमि), अम्बु (जल/पोषण) और बीज (उत्तम बीज) की समग्रता से अंकुर उत्पन्न होता है, वैसे ही ऋतु (ऋतुकाल/ovulatory window), क्षेत्र (गर्भाशय/endometrium), अम्बु (रस/रक्त पोषण) और बीज (विशुद्ध शुक्र एवं आर्तव) की समग्रता से स्वस्थ गर्भ स्थापित होता है।",
    "english": "Charaka establishes the four prerequisite cardinal factors for successful conception and embryogenesis: Ritu (ovulatory fertile window), Kshetra (healthy uterine cavity and receptive endometrium), Ambu (nutrient maternal plasma/Rasa Dhatu), and Bija (unvitiated ovum and spermatozoon). Any qualitative or quantitative deficiency in these four factors results in subfertility or spontaneous early pregnancy loss.",
    "dc_dutta": "DC Dutta Ch. 3 & 4 (Fertilization and Implantation): Corresponds directly to the pre-conceptional prerequisites: viable gametes (Bija - sperm and oocyte), correct timing during the fertile window (Ritu - days 12-16 of cycle), receptive secretory endometrium with pinopodes (Kshetra), and optimal utero-placental perfusion and hormonal milieu with progesterone and hCG (Ambu).",
    "tags": [
      "charaka",
      "atulyagotriya",
      "garbhotpatti",
      "ritu",
      "kshetra",
      "ambu",
      "bija",
      "fertilization",
      "implantation",
      "conception"
    ],
    "plan": {}
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
    "month": null,
    "ritu": null,
    "title": "Charaka Samhita — Shadgarbhadharana (Six Procreative Progenitors)",
    "citation": "Charaka Samhita, Sharira Sthana 3/3-14",
    "sanskrit_shloka": "मातृजश्चायं गर्भः, पितृजश्च, आत्मजश्च, सात्म्यजश्च, रसजश्च, सत्त्वजश्चेति॥",
    "transliteration": "mātṛjaścāyaṁ garbhaḥ, pitṛjaśca, ātmajaśca, sātmyajaśca, rasajaśca, sattvajaśceti ||",
    "hindi_meaning": "यह गर्भ मातृज (माता से मृदु अंग जैसे त्वचा, मांस, रक्त, मेद, हृदय, यकृत, प्लीहा), पितृज (पिता से स्थिर अंग जैसे अस्थि, दन्त, केश, स्नायु, धमनी), आत्मज (चेतना, इन्द्रिय ज्ञान, आयु), सात्म्यज (आरोग्य, ओज, वीर्य), रसज (शरीर वृद्धि, प्राण, पुष्टि) और सत्त्वज (मनोभाव, स्मृति, भक्ति, शील) इन छह भावों के संयोग से उत्पन्न होता है।",
    "english_clinical_summary": "Charaka explains that the fetus is composite of six fundamental maternal, paternal, and environmental factors: Matrija (soft maternal tissues including liver, spleen, heart), Pitrija (hard paternal structures including bone, teeth, tendons), Atmaja (consciousness, lifespan, sense organs), Satmyaja (maternal adaptogenic resilience and immunity), Rasaja (fetal somatic growth directly dependent on maternal nutrition), and Sattvaja (psychological traits and mental equilibrium).",
    "dc_dutta_correlation": "DC Dutta Ch. 3 & 9: Corresponds to polygenic and environmental inheritance: maternal and paternal genomic contribution (autosomal chromosomes and maternal mitochondrial DNA), intrauterine nutritional environment (fetal programming / Barker hypothesis), and maternal neuro-endocrine impact on fetal neurodevelopment.",
    "samprapti_yukti": "Rasaja Bhavas represent maternal Rasa Dhatu passing through the placenta via Upasneha and Upasveda. Defective maternal nutrition directly impairs Rasaja Bhavas leading to Upavishtaka (IUGR).",
    "red_flags": [
      "Severe maternal malnutrition or hyperemesis leading to ketonuria",
      "Intrauterine growth restriction (IUGR) on ultrasound",
      "Oligohydramnios (AFI < 5 cm)"
    ],
    "related_questions": [
      "Shadgarbhadharana me Matrija aur Pitrija avayava konse hote hain?",
      "Rasaja bhava ka fetal growth aur IUGR se kya sambandh hai?",
      "Barker hypothesis aur Ayurvedic Rasaja bhava me kya samanta hai?"
    ],
    "keywords": [
      "charaka",
      "shadgarbhadharana",
      "matrija",
      "pitrija",
      "rasaja",
      "satmyaja",
      "sattvaja",
      "embryology",
      "genetics"
    ],
    "sanskrit": "मातृजश्चायं गर्भः, पितृजश्च, आत्मजश्च, सात्म्यजश्च, रसजश्च, सत्त्वजश्चेति॥",
    "iast": "mātṛjaścāyaṁ garbhaḥ, pitṛjaśca, ātmajaśca, sātmyajaśca, rasajaśca, sattvajaśceti ||",
    "hindi": "यह गर्भ मातृज (माता से मृदु अंग जैसे त्वचा, मांस, रक्त, मेद, हृदय, यकृत, प्लीहा), पितृज (पिता से स्थिर अंग जैसे अस्थि, दन्त, केश, स्नायु, धमनी), आत्मज (चेतना, इन्द्रिय ज्ञान, आयु), सात्म्यज (आरोग्य, ओज, वीर्य), रसज (शरीर वृद्धि, प्राण, पुष्टि) और सत्त्वज (मनोभाव, स्मृति, भक्ति, शील) इन छह भावों के संयोग से उत्पन्न होता है।",
    "english": "Charaka explains that the fetus is composite of six fundamental maternal, paternal, and environmental factors: Matrija (soft maternal tissues including liver, spleen, heart), Pitrija (hard paternal structures including bone, teeth, tendons), Atmaja (consciousness, lifespan, sense organs), Satmyaja (maternal adaptogenic resilience and immunity), Rasaja (fetal somatic growth directly dependent on maternal nutrition), and Sattvaja (psychological traits and mental equilibrium).",
    "dc_dutta": "DC Dutta Ch. 3 & 9: Corresponds to polygenic and environmental inheritance: maternal and paternal genomic contribution (autosomal chromosomes and maternal mitochondrial DNA), intrauterine nutritional environment (fetal programming / Barker hypothesis), and maternal neuro-endocrine impact on fetal neurodevelopment.",
    "tags": [
      "charaka",
      "shadgarbhadharana",
      "matrija",
      "pitrija",
      "rasaja",
      "satmyaja",
      "sattvaja",
      "embryology",
      "genetics"
    ],
    "plan": {}
  },
  {
    "id": "sushruta_sha_2_shukra_shonita",
    "samhita": "sushruta",
    "sthana": "Sharira Sthana",
    "chapter": 2,
    "chapter_name": "Shukra Shonita Shuddhi Shariram",
    "verse": "2/25-33",
    "domain": "garbhini",
    "stage": "garbha_vriddhi",
    "month": null,
    "ritu": null,
    "title": "Sushruta Samhita — Ritumati Paricharya & Garbhadhana Protocol",
    "citation": "Sushruta Samhita, Sharira Sthana 2/25-33",
    "sanskrit_shloka": "ऋतौ तु प्रथमे दिवसे गर्भाशयो विशुद्ध्यति। ततः प्रभृति त्रिरात्रं गर्भिणीवदासीत, ब्रह्मचारिणी, अक्रोधना, हविष्यं भुञ्जाना॥",
    "transliteration": "ṛtau tu prathame divase garbhāśayo viśuddhyati | tataḥ prabhṛti trirātraṁ garbhiṇīvadāsīta, brahmacāriṇī, akrodhanā, haviṣyaṁ bhuñjānā ||",
    "hindi_meaning": "ऋतुकाल (माहवारी) के प्रथम दिवस से गर्भाशय का शोधन होता है। प्रथम तीन दिन स्त्री को ब्रह्मचारिणी रहकर, क्रोध त्यागकर, हल्का हविष्य अन्न (दलिया/दूध-चावल) ग्रहण करना चाहिए तथा दिन में सोने और परिश्रम से बचना चाहिए, ताकि गर्भाशय की ग्रहण शक्ति उत्तम रहे।",
    "english_clinical_summary": "Sushruta delineates the clinical regimen for the fertile menstrual phase (Ritumati Paricharya). During the initial three days of menstruation, the endometrial lining sheds and purifies itself. The woman should consume light, nourishing Haviṣya food, avoid physical exertion and emotional stress, maintain pelvic hygiene, and preserve somatic tranquility to prepare the endometrium for blastocyst implantation.",
    "dc_dutta_correlation": "DC Dutta Ch. 3 & 7: Corresponds to the menstrual phase (days 1-4) and early follicular phase of the uterine cycle. Gentle rest, iron-rich diet, and prevention of pelvic inflammatory infections safeguard tubal patency and ovarian follicular maturation.",
    "samprapti_yukti": "Artava discharge is governed by Apana Vata. Mental serenity and light diet prevent Vata-Pitta Dushti in the Artavavaha Srotas.",
    "red_flags": [
      "Menorrhagia soaking >1 pad every 2 hours with large clots",
      "Severe acute pelvic pain suggesting pelvic inflammatory disease (PID) or ruptured endometrioma"
    ],
    "related_questions": [
      "Sushruta ke anusaar Ritumati paricharya ka garbhadhana par kya prabhav padta hai?",
      "Menstrual phase me heavy exertion se uterine health par kya nuksan hota hai?",
      "DC Dutta me proliferative phase aur follicular development ke key hormones kya hain?"
    ],
    "keywords": [
      "sushruta",
      "ritumati",
      "garbhadhana",
      "shukra shonita",
      "endometrium",
      "conception"
    ],
    "sanskrit": "ऋतौ तु प्रथमे दिवसे गर्भाशयो विशुद्ध्यति। ततः प्रभृति त्रिरात्रं गर्भिणीवदासीत, ब्रह्मचारिणी, अक्रोधना, हविष्यं भुञ्जाना॥",
    "iast": "ṛtau tu prathame divase garbhāśayo viśuddhyati | tataḥ prabhṛti trirātraṁ garbhiṇīvadāsīta, brahmacāriṇī, akrodhanā, haviṣyaṁ bhuñjānā ||",
    "hindi": "ऋतुकाल (माहवारी) के प्रथम दिवस से गर्भाशय का शोधन होता है। प्रथम तीन दिन स्त्री को ब्रह्मचारिणी रहकर, क्रोध त्यागकर, हल्का हविष्य अन्न (दलिया/दूध-चावल) ग्रहण करना चाहिए तथा दिन में सोने और परिश्रम से बचना चाहिए, ताकि गर्भाशय की ग्रहण शक्ति उत्तम रहे।",
    "english": "Sushruta delineates the clinical regimen for the fertile menstrual phase (Ritumati Paricharya). During the initial three days of menstruation, the endometrial lining sheds and purifies itself. The woman should consume light, nourishing Haviṣya food, avoid physical exertion and emotional stress, maintain pelvic hygiene, and preserve somatic tranquility to prepare the endometrium for blastocyst implantation.",
    "dc_dutta": "DC Dutta Ch. 3 & 7: Corresponds to the menstrual phase (days 1-4) and early follicular phase of the uterine cycle. Gentle rest, iron-rich diet, and prevention of pelvic inflammatory infections safeguard tubal patency and ovarian follicular maturation.",
    "tags": [
      "sushruta",
      "ritumati",
      "garbhadhana",
      "shukra shonita",
      "endometrium",
      "conception"
    ],
    "plan": {}
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
    "month": null,
    "ritu": null,
    "title": "Sushruta Samhita — Fetal Hemodynamics & Nabhi Nadi (Umbilical Circulation)",
    "citation": "Sushruta Samhita, Sharira Sthana 4/56-58",
    "sanskrit_shloka": "मातुस्तु खलु रसवहाया नाड्या गर्भनाभिनाडी संबद्धा, सा तस्य मातुरुपस्नेहेनाप्याययति। यथा कुल्योदकेन केदारमाप्यायते तथा॥",
    "transliteration": "mātustu khalu rasavahāyā nāḍyā garbhanābhināḍī saṁbaddhā, sā tasya mātūrapasnehenāpyāyayati | yathā kulyodakena kedāramāpyāyate tathā ||",
    "hindi_meaning": "माता की रसवाही नाड़ियों से गर्भ की नाभि-नाड़ी (umbilical cord) जुड़ी होती है। जैसे नहर के जल से धान का खेत सींचा जाता है, ठीक उसी प्रकार माता के रसधातु के उपस्नेह (diffusion) और उपस्वेद द्वारा गर्भ का निरंतर पोषण और संवर्धन होता है।",
    "english_clinical_summary": "Sushruta details the hemodynamic connection between mother and fetus: the maternal uterine arteries and intervillous spaces connect functional nutrient streams to the fetal umbilical cord (Garbha Nabhi Nadi). Through the biological mechanisms of Upasneha (trans-placental micro-diffusion) and Upasveda (osmotic perfusion), maternal nutrients directly nourish every fetal Dhatu without direct maternal-fetal vessel continuity, exactly like irrigation water nourishing field crops.",
    "dc_dutta_correlation": "DC Dutta Ch. 4 (Placental Circulation): Uteroplacental circulation consists of ~120 spiral arteries discharging maternal blood directly into the intervillous space at low pressure. Gas, nutrient, and waste exchange occurs across the syncytiotrophoblast placental barrier into the umbilical vein.",
    "samprapti_yukti": "Rasa Dhatu enriched with Prana and Ojas traverses through the Nabhi Nadi. Maternal anemia (Pandu) impairs the oxygen carrying capacity of Rasa-Rakta, starving the fetal tissues.",
    "red_flags": [
      "Abnormal umbilical artery Doppler (absent or reversed end-diastolic flow - AREDF)",
      "Severe maternal pallor with Hb < 7 g/dL (Severe Gestational Anemia)",
      "Fetal growth deceleration lagging >2 weeks behind gestational age"
    ],
    "related_questions": [
      "Sushruta ne Nabhi Nadi aur Upasneha ka varnan kaise kiya hai?",
      "DC Dutta me placental exchange aur umbilical artery Doppler ka kya clinical significance hai?",
      "Maternal anemia (Pandu) ka baby ke birth weight par kya asar padta hai?"
    ],
    "keywords": [
      "sushruta",
      "nabhi nadi",
      "umbilical cord",
      "placenta",
      "circulation",
      "upasneha",
      "doppler"
    ],
    "sanskrit": "मातुस्तु खलु रसवहाया नाड्या गर्भनाभिनाडी संबद्धा, सा तस्य मातुरुपस्नेहेनाप्याययति। यथा कुल्योदकेन केदारमाप्यायते तथा॥",
    "iast": "mātustu khalu rasavahāyā nāḍyā garbhanābhināḍī saṁbaddhā, sā tasya mātūrapasnehenāpyāyayati | yathā kulyodakena kedāramāpyāyate tathā ||",
    "hindi": "माता की रसवाही नाड़ियों से गर्भ की नाभि-नाड़ी (umbilical cord) जुड़ी होती है। जैसे नहर के जल से धान का खेत सींचा जाता है, ठीक उसी प्रकार माता के रसधातु के उपस्नेह (diffusion) और उपस्वेद द्वारा गर्भ का निरंतर पोषण और संवर्धन होता है।",
    "english": "Sushruta details the hemodynamic connection between mother and fetus: the maternal uterine arteries and intervillous spaces connect functional nutrient streams to the fetal umbilical cord (Garbha Nabhi Nadi). Through the biological mechanisms of Upasneha (trans-placental micro-diffusion) and Upasveda (osmotic perfusion), maternal nutrients directly nourish every fetal Dhatu without direct maternal-fetal vessel continuity, exactly like irrigation water nourishing field crops.",
    "dc_dutta": "DC Dutta Ch. 4 (Placental Circulation): Uteroplacental circulation consists of ~120 spiral arteries discharging maternal blood directly into the intervillous space at low pressure. Gas, nutrient, and waste exchange occurs across the syncytiotrophoblast placental barrier into the umbilical vein.",
    "tags": [
      "sushruta",
      "nabhi nadi",
      "umbilical cord",
      "placenta",
      "circulation",
      "upasneha",
      "doppler"
    ],
    "plan": {}
  },
  {
    "month": 1,
    "ritu": null,
    "samhita": "charaka",
    "stage": "garbha_vriddhi",
    "sanskrit": "प्रथमे मासि संमूर्छितः सर्वधातुकलुषीकृतः खेटभूतो गर्भो भवत्यव्यक्तविग्रहः",
    "iast": "prathame māsi saṃmūrchitaḥ sarvadhātukaluṣīkṛtaḥ kheṭabhūto garbho bhavaty avyaktavigrahaḥ",
    "hindi": "पहले माह में गर्भ सम्मूर्छित, सभी धातुओं से मिश्रित, कलल अवस्था में अव्यक्त स्वरूप का होता है।",
    "english": "Month 1: the embryo is a fused, unmanifest mass (Kalala, Kheta-bhuta) with all Dhatu mixed — no distinct form. Samurchchhita (fertilised) Kalala — an unmanifest, jelly-like embryo (Khetabhuta, Avyakta-vigraha). Atma, Manas and the Panchamahabhuta join the Shukra-Shonita.",
    "citation": "Ch. Sha. 4.20; Su. Sha. 3",
    "dc_dutta": "Weeks 1–4 · Fertilisation, implantation & booking: Fertilisation in the ampulla, implantation on day 6–7, hCG detectable ~8–10 days post-ovulation; UPT positive at missed period. Confirm pregnancy, calculate EDD (Naegele: LMP + 9 months + 7 days), start folic acid 400 mcg (5 mg in high-risk), book ANC early, avoid teratogens (alcohol, tobacco, unsupervised drugs, radiation).",
    "red_flags": [
      "Bleeding PV with lower-abdominal pain (threatened abortion / ectopic)",
      "Severe one-sided pelvic pain or shoulder-tip pain",
      "Persistent vomiting with inability to retain fluids"
    ],
    "tags": [
      "garbha vriddhi",
      "embryology",
      "fetal growth",
      "month 1",
      "kalala",
      "dauhrida",
      "ojas",
      "development",
      "milestone",
      "trimester 1"
    ],
    "plan": {},
    "id": "gv-m1",
    "title": "Garbha Vriddhi — Month 1: Kalala",
    "domain": "garbhini",
    "sanskrit_shloka": "प्रथमे मासि संमूर्छितः सर्वधातुकलुषीकृतः खेटभूतो गर्भो भवत्यव्यक्तविग्रहः",
    "transliteration": "prathame māsi saṃmūrchitaḥ sarvadhātukaluṣīkṛtaḥ kheṭabhūto garbho bhavaty avyaktavigrahaḥ",
    "hindi_meaning": "पहले माह में गर्भ सम्मूर्छित, सभी धातुओं से मिश्रित, कलल अवस्था में अव्यक्त स्वरूप का होता है।",
    "english_clinical_summary": "Month 1: the embryo is a fused, unmanifest mass (Kalala, Kheta-bhuta) with all Dhatu mixed — no distinct form. Samurchchhita (fertilised) Kalala — an unmanifest, jelly-like embryo (Khetabhuta, Avyakta-vigraha). Atma, Manas and the Panchamahabhuta join the Shukra-Shonita.",
    "dc_dutta_correlation": "Weeks 1–4 · Fertilisation, implantation & booking: Fertilisation in the ampulla, implantation on day 6–7, hCG detectable ~8–10 days post-ovulation; UPT positive at missed period. Confirm pregnancy, calculate EDD (Naegele: LMP + 9 months + 7 days), start folic acid 400 mcg (5 mg in high-risk), book ANC early, avoid teratogens (alcohol, tobacco, unsupervised drugs, radiation).",
    "keywords": [
      "garbha vriddhi",
      "embryology",
      "fetal growth",
      "month 1",
      "kalala",
      "dauhrida",
      "ojas",
      "development",
      "milestone",
      "trimester 1"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Month 1 me konsa ksheera-paka sabse labhadayak hai?",
      "Month 1 me DC Dutta ke anusaar konsa scan ya test karwayein?",
      "Month 1 ke classical red flags aur upadrava kya hain?"
    ]
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
    "ritu": null,
    "title": "Sushruta Samhita — Kalala, Budbuda & Five Primordia (Panchapindaka)",
    "citation": "Sushruta Samhita, Sharira Sthana 3/1-8",
    "sanskrit_shloka": "तत्र प्रथमे मासि कललं जायते; द्वितीये शीतोष्णेन पवनेनाभिपच्यमानानां महाभूतानां संघातः पिण्डः पेश्यर्बुदं वा भवति; तृतीये हस्तपादशिरसां पञ्च पिण्डका निर्वर्तन्ते॥",
    "transliteration": "tatra prathame māsi kalalaṁ jāyate; dvitīye śītoṣṇena pavanenābhipacyamānānāṁ mahābhūtānāṁ saṁghātaḥ piṇḍaḥ peśyarbudaṁ vā bhavati; tṛtīye hastapādaśirasāṁ pañca piṇḍakā nirvartante ||",
    "hindi_meaning": "प्रथम मास में गर्भ कलल (jelly-like blastocyst) रूप में रहता है। द्वितीय मास में शीतोष्ण वायु द्वारा महाभूतों का संहनन होकर पिण्ड (पुरुष), पेशी (स्त्री) या अर्बुद रूप धारण करता है। तृतीय मास में दोनों हाथ, दोनों पैर और सिर—ये पांच पिण्डक (Panchapindaka) स्पष्ट रूप से विकसित होते हैं।",
    "english_clinical_summary": "Sushruta describes early surgical-grade embryogenesis: In month 1, the conceptus exists as delicate Kalala (amorphous morula/blastocyst). In month 2, under the bio-catalytic action of Agni and Vayu, the cellular mass condenses into Pinda, Peshi, or Arbuda. In month 3, organ differentiation produces the 'Panchapindaka'—the five structural bud primordia representing the cephalic pole and the four limb buds.",
    "dc_dutta_correlation": "DC Dutta Ch. 4 (Embryology Weeks 4-12): Matches Carnegie stages 10-18: Limb buds appear at week 4-5; by week 8 (end of embryonic period), crown-rump length is ~30 mm, fingers and toes are separated, facial features are recognizable, and early ossification begins.",
    "samprapti_yukti": "Panchamahabhuta division is executed by Vayu (Vibhajanat). Sheeta-Madhura herbs in months 1-3 shield the embryonic cell mass from Pittaja Pitta-vidaha (teratogenic thermal stress).",
    "red_flags": [
      "Early vaginal spotting with falling serum beta-hCG titers",
      "Absent fetal pole on transvaginal ultrasound at 7 weeks (Anembryonic pregnancy / Blighted ovum)"
    ],
    "related_questions": [
      "Sushruta ke anusaar 1st se 3rd month tak Garbha Vriddhi ke stages kya hain?",
      "Panchapindaka ka modern limb bud development se kya correlation hai?",
      "DC Dutta me early dating scan (TVS) me gestational sac aur fetal pole kab dikhta hai?"
    ],
    "keywords": [
      "sushruta",
      "kalala",
      "budbuda",
      "panchapindaka",
      "embryo",
      "organogenesis",
      "limb buds"
    ],
    "sanskrit": "तत्र प्रथमे मासि कललं जायते; द्वितीये शीतोष्णेन पवनेनाभिपच्यमानानां महाभूतानां संघातः पिण्डः पेश्यर्बुदं वा भवति; तृतीये हस्तपादशिरसां पञ्च पिण्डका निर्वर्तन्ते॥",
    "iast": "tatra prathame māsi kalalaṁ jāyate; dvitīye śītoṣṇena pavanenābhipacyamānānāṁ mahābhūtānāṁ saṁghātaḥ piṇḍaḥ peśyarbudaṁ vā bhavati; tṛtīye hastapādaśirasāṁ pañca piṇḍakā nirvartante ||",
    "hindi": "प्रथम मास में गर्भ कलल (jelly-like blastocyst) रूप में रहता है। द्वितीय मास में शीतोष्ण वायु द्वारा महाभूतों का संहनन होकर पिण्ड (पुरुष), पेशी (स्त्री) या अर्बुद रूप धारण करता है। तृतीय मास में दोनों हाथ, दोनों पैर और सिर—ये पांच पिण्डक (Panchapindaka) स्पष्ट रूप से विकसित होते हैं।",
    "english": "Sushruta describes early surgical-grade embryogenesis: In month 1, the conceptus exists as delicate Kalala (amorphous morula/blastocyst). In month 2, under the bio-catalytic action of Agni and Vayu, the cellular mass condenses into Pinda, Peshi, or Arbuda. In month 3, organ differentiation produces the 'Panchapindaka'—the five structural bud primordia representing the cephalic pole and the four limb buds.",
    "dc_dutta": "DC Dutta Ch. 4 (Embryology Weeks 4-12): Matches Carnegie stages 10-18: Limb buds appear at week 4-5; by week 8 (end of embryonic period), crown-rump length is ~30 mm, fingers and toes are separated, facial features are recognizable, and early ossification begins.",
    "tags": [
      "sushruta",
      "kalala",
      "budbuda",
      "panchapindaka",
      "embryo",
      "organogenesis",
      "limb buds"
    ],
    "plan": {}
  },
  {
    "month": 2,
    "ritu": null,
    "samhita": "charaka",
    "stage": "garbha_vriddhi",
    "sanskrit": "द्वितीये मासि घनः संपद्यते पिण्डः पेशी अर्बुदं वा",
    "iast": "dvitīye māsi ghanaḥ sampadyate piṇḍaḥ peśī arbudaṃ vā",
    "hindi": "दूसरे माह में गर्भ घन होकर पिण्ड (पुरुष), पेशी (स्त्री) अथवा अर्बुद (नपुंसक) का रूप लेता है।",
    "english": "Month 2: the embryo condenses — Pinda (male), Peshi (female) or Arbuda (napumsaka). Kalala condenses into a Ghana mass: Pinda (male tendency), Peshi (female) or Arbuda (napumsaka) per Charaka. Sushruta describes Panchapindaka — five buds (head, two arms, two legs).",
    "citation": "Ch. Sha. 4.20",
    "dc_dutta": "Weeks 5–8 · Embryonic period, organogenesis: Neural tube closes by day 28, heart tube beats from ~6 weeks (visible on TVS), limb buds appear — peak teratogenic sensitivity. Early dating USG confirms viability and site. Hyperemesis gravidarum: IV fluids, antiemetics, thiamine, correction of electrolytes if ketonuria.",
    "red_flags": [
      "Spotting / bleeding with passage of tissue",
      "Vomiting >5 times a day with weight loss or ketones",
      "Fever with rash (rubella, CMV, Zika risk)"
    ],
    "tags": [
      "garbha vriddhi",
      "embryology",
      "fetal growth",
      "month 2",
      "pinda / peshi / arbuda (ghana)",
      "dauhrida",
      "ojas",
      "kalala",
      "development",
      "milestone",
      "trimester 1"
    ],
    "plan": {},
    "id": "gv-m2",
    "title": "Garbha Vriddhi — Month 2: Pinda / Peshi / Arbuda (Ghana)",
    "domain": "garbhini",
    "sanskrit_shloka": "द्वितीये मासि घनः संपद्यते पिण्डः पेशी अर्बुदं वा",
    "transliteration": "dvitīye māsi ghanaḥ sampadyate piṇḍaḥ peśī arbudaṃ vā",
    "hindi_meaning": "दूसरे माह में गर्भ घन होकर पिण्ड (पुरुष), पेशी (स्त्री) अथवा अर्बुद (नपुंसक) का रूप लेता है।",
    "english_clinical_summary": "Month 2: the embryo condenses — Pinda (male), Peshi (female) or Arbuda (napumsaka). Kalala condenses into a Ghana mass: Pinda (male tendency), Peshi (female) or Arbuda (napumsaka) per Charaka. Sushruta describes Panchapindaka — five buds (head, two arms, two legs).",
    "dc_dutta_correlation": "Weeks 5–8 · Embryonic period, organogenesis: Neural tube closes by day 28, heart tube beats from ~6 weeks (visible on TVS), limb buds appear — peak teratogenic sensitivity. Early dating USG confirms viability and site. Hyperemesis gravidarum: IV fluids, antiemetics, thiamine, correction of electrolytes if ketonuria.",
    "keywords": [
      "garbha vriddhi",
      "embryology",
      "fetal growth",
      "month 2",
      "pinda / peshi / arbuda (ghana)",
      "dauhrida",
      "ojas",
      "kalala",
      "development",
      "milestone",
      "trimester 1"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Month 2 me konsa ksheera-paka sabse labhadayak hai?",
      "Month 2 me DC Dutta ke anusaar konsa scan ya test karwayein?",
      "Month 2 ke classical red flags aur upadrava kya hain?"
    ]
  },
  {
    "month": 3,
    "ritu": null,
    "samhita": "charaka",
    "stage": "garbha_vriddhi",
    "sanskrit": "तृतीये मासे सर्वेन्द्रियाणि सर्वाङ्गावयवाश्च युगपत्प्रव्यक्ततरा भवन्ति",
    "iast": "tṛtīye māse sarvendriyāṇi sarvāṅgāvayavāś ca yugapat pravyaktatarā bhavanti",
    "hindi": "तीसरे माह में सभी इन्द्रियाँ तथा अंग-प्रत्यंग एक साथ प्रकट होने लगते हैं।",
    "english": "Month 3: all sense-organs and body parts become manifest simultaneously; Sushruta — five buds: two arms, two legs and head. All sense organs and body parts begin to manifest together (Charaka); Sushruta notes Hasta-Pada-Shiras differentiation. Fetal period begins.",
    "citation": "Ch. Sha. 4.20; Su. Sha. 3 (Garbhavyakarana)",
    "dc_dutta": "Weeks 9–13 · End of the first trimester: Fetal period starts at 9th week. NT scan at 11–13+6 weeks with double marker; baseline Hb, blood group & Rh, urine routine, VDRL, HIV, HBsAg, TSH, blood sugar. Td/Tdap schedule begins. Nausea usually settles by 14 weeks.",
    "red_flags": [
      "Heavy bleeding or clots",
      "Burning micturition with fever (UTI)",
      "Severe pallor and breathlessness"
    ],
    "tags": [
      "garbha vriddhi",
      "embryology",
      "fetal growth",
      "month 3",
      "sarvanga-indriya abhivyakti",
      "dauhrida",
      "ojas",
      "kalala",
      "development",
      "milestone",
      "trimester 1"
    ],
    "plan": {},
    "id": "gv-m3",
    "title": "Garbha Vriddhi — Month 3: Sarvanga-Indriya Abhivyakti",
    "domain": "garbhini",
    "sanskrit_shloka": "तृतीये मासे सर्वेन्द्रियाणि सर्वाङ्गावयवाश्च युगपत्प्रव्यक्ततरा भवन्ति",
    "transliteration": "tṛtīye māse sarvendriyāṇi sarvāṅgāvayavāś ca yugapat pravyaktatarā bhavanti",
    "hindi_meaning": "तीसरे माह में सभी इन्द्रियाँ तथा अंग-प्रत्यंग एक साथ प्रकट होने लगते हैं।",
    "english_clinical_summary": "Month 3: all sense-organs and body parts become manifest simultaneously; Sushruta — five buds: two arms, two legs and head. All sense organs and body parts begin to manifest together (Charaka); Sushruta notes Hasta-Pada-Shiras differentiation. Fetal period begins.",
    "dc_dutta_correlation": "Weeks 9–13 · End of the first trimester: Fetal period starts at 9th week. NT scan at 11–13+6 weeks with double marker; baseline Hb, blood group & Rh, urine routine, VDRL, HIV, HBsAg, TSH, blood sugar. Td/Tdap schedule begins. Nausea usually settles by 14 weeks.",
    "keywords": [
      "garbha vriddhi",
      "embryology",
      "fetal growth",
      "month 3",
      "sarvanga-indriya abhivyakti",
      "dauhrida",
      "ojas",
      "kalala",
      "development",
      "milestone",
      "trimester 1"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Month 3 me konsa ksheera-paka sabse labhadayak hai?",
      "Month 3 me DC Dutta ke anusaar konsa scan ya test karwayein?",
      "Month 3 ke classical red flags aur upadrava kya hain?"
    ]
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
    "ritu": null,
    "title": "Charaka Samhita — 4th Month Dauhrida (द्विहृदया / Fetal Heart & Maternal Desires)",
    "citation": "Charaka Samhita, Sharira Sthana 4/15-20",
    "sanskrit_shloka": "चतुर्थे मासि स्थिरत्वमापद्यते गर्भः, तस्मात्तदा गर्भिणी गुरुगात्रत्वमधिकमापद्यते। द्विहृदयां च तदा गर्भिणीमाचक्षते॥",
    "transliteration": "caturthe māsi sthiratvamāpadyate garbhaḥ, tasmāttadā garbhiṇī gurugātratvamadhikamāpadyate | dvihṛdayāṁ ca tadā garbhiṇīmācakṣate ||",
    "hindi_meaning": "चौथे महीने में गर्भ में स्थिरता आ जाती है, जिससे गर्भिणी के शरीर में भारीपन बढ़ जाता है। इस मास में गर्भस्थ हृदय के प्रस्फुटित होने से गर्भिणी को 'द्विहृदया' (दो हृदय वाली) कहा जाता है। गर्भ अपनी इच्छाओं को माता के हृदय के माध्यम से प्रकट करता है, अतः दौहृद की पूर्ति अनिवार्य है।",
    "english_clinical_summary": "In the fourth month, fetal somatic structures achieve physical stability (Sthiratva), imparting a sensation of bodily heaviness (Gurugatratva) to the mother. The fetal heart functionally coordinates with the maternal cardiovascular system; hence the pregnant woman is called 'Dvihridaya' (bearing two hearts). Fetal desires and sensory cravings manifest through maternal longings (Dauhrida). Non-fulfilment or suppression of Dauhrida causes fetal deformities, mental instability, or pregnancy complications.",
    "dc_dutta_correlation": "DC Dutta Ch. 4 (Fetal Development at 16 weeks) & Ch. 8 (Maternal Systemic Adaptations): Fetal heart sounds are readily audible with Doppler; cardiovascular output reaches 40-50% above pre-pregnancy levels. Second-trimester pregnancy cravings, altered olfactory and gustatory perception are neuro-endocrinologically mediated by beta-hCG, progesterone, and leptin fluctuations.",
    "samprapti_yukti": "Vata directs the circulation of Rasavaha Nadis between fetal and maternal heart. Suppressing Dauhrida irritates Vata, which may derange fetal limb morphogenesis or neuromuscular tone.",
    "red_flags": [
      "Severe persistent pica (eating mud, chalk, clay - indicative of severe iron deficiency anemia)",
      "Maternal fainting spells or orthostatic hypotension",
      "Absent fetal heart tones on Doppler after 14-16 weeks"
    ],
    "related_questions": [
      "4th Month me Dauhrida ka kya mahatva hai aur ise pura karna kyu zaroori hai?",
      "Dauhrida avamana (suppression) se konse fetal upadrava ho sakte hain?",
      "DC Dutta ke anusaar 16th week par fetal Doppler aur maternal hemodynamic changes kya hote hain?"
    ],
    "keywords": [
      "charaka",
      "dauhrida",
      "dvihridaya",
      "4th month",
      "cravings",
      "fetal heart",
      "mahati garbhavakranti"
    ],
    "sanskrit": "चतुर्थे मासि स्थिरत्वमापद्यते गर्भः, तस्मात्तदा गर्भिणी गुरुगात्रत्वमधिकमापद्यते। द्विहृदयां च तदा गर्भिणीमाचक्षते॥",
    "iast": "caturthe māsi sthiratvamāpadyate garbhaḥ, tasmāttadā garbhiṇī gurugātratvamadhikamāpadyate | dvihṛdayāṁ ca tadā garbhiṇīmācakṣate ||",
    "hindi": "चौथे महीने में गर्भ में स्थिरता आ जाती है, जिससे गर्भिणी के शरीर में भारीपन बढ़ जाता है। इस मास में गर्भस्थ हृदय के प्रस्फुटित होने से गर्भिणी को 'द्विहृदया' (दो हृदय वाली) कहा जाता है। गर्भ अपनी इच्छाओं को माता के हृदय के माध्यम से प्रकट करता है, अतः दौहृद की पूर्ति अनिवार्य है।",
    "english": "In the fourth month, fetal somatic structures achieve physical stability (Sthiratva), imparting a sensation of bodily heaviness (Gurugatratva) to the mother. The fetal heart functionally coordinates with the maternal cardiovascular system; hence the pregnant woman is called 'Dvihridaya' (bearing two hearts). Fetal desires and sensory cravings manifest through maternal longings (Dauhrida). Non-fulfilment or suppression of Dauhrida causes fetal deformities, mental instability, or pregnancy complications.",
    "dc_dutta": "DC Dutta Ch. 4 (Fetal Development at 16 weeks) & Ch. 8 (Maternal Systemic Adaptations): Fetal heart sounds are readily audible with Doppler; cardiovascular output reaches 40-50% above pre-pregnancy levels. Second-trimester pregnancy cravings, altered olfactory and gustatory perception are neuro-endocrinologically mediated by beta-hCG, progesterone, and leptin fluctuations.",
    "tags": [
      "charaka",
      "dauhrida",
      "dvihridaya",
      "4th month",
      "cravings",
      "fetal heart",
      "mahati garbhavakranti"
    ],
    "plan": {}
  },
  {
    "month": 4,
    "ritu": null,
    "samhita": "charaka",
    "stage": "garbha_vriddhi",
    "sanskrit": "चतुर्थे मासे स्थिरत्वमापद्यते गर्भः; हृदयस्य व्यक्तीभावः — द्विहृदया नारी दौहृदिनी",
    "iast": "caturthe māse sthiratvam āpadyate garbhaḥ; hṛdayasya vyaktībhāvaḥ — dvihṛdayā nārī dauhṛdinī",
    "hindi": "चौथे माह में गर्भ स्थिर होता है तथा हृदय व्यक्त होता है; स्त्री द्विहृदया (दौहृदिनी) कहलाती है।",
    "english": "Month 4: stability of the fetus; the heart manifests so the woman is Dvihridaya — she has Dauhrida (pregnancy cravings representing the fetus’s wishes). Garbha attains Sthirata (stability); mother becomes heavier (Guru-gatra). Hridaya manifests — the Dauhrida state: the mother expresses the fetus's desires through her own cravings.",
    "citation": "Ch. Sha. 4.21; Su. Sha. 3 (Dauhrida)",
    "dc_dutta": "Weeks 14–17 · Second trimester begins: Fetal sex organs differentiate, lanugo appears, fundus midway between symphysis and umbilicus at 16 weeks. Start iron 100 mg elemental + folic acid 500 mcg, calcium 500 mg BD. Td dose 1/2, quad marker 15–20 weeks. Mother usually feels well — appetite improves.",
    "red_flags": [
      "Watery leak PV (PPROM)",
      "Painless bleeding",
      "Severe headache with high BP (early pre-eclampsia is rare but possible)"
    ],
    "tags": [
      "garbha vriddhi",
      "embryology",
      "fetal growth",
      "month 4",
      "sthirata & dauhrida",
      "dauhrida",
      "ojas",
      "kalala",
      "development",
      "milestone",
      "trimester 2"
    ],
    "plan": {},
    "id": "gv-m4",
    "title": "Garbha Vriddhi — Month 4: Sthirata & Dauhrida",
    "domain": "garbhini",
    "sanskrit_shloka": "चतुर्थे मासे स्थिरत्वमापद्यते गर्भः; हृदयस्य व्यक्तीभावः — द्विहृदया नारी दौहृदिनी",
    "transliteration": "caturthe māse sthiratvam āpadyate garbhaḥ; hṛdayasya vyaktībhāvaḥ — dvihṛdayā nārī dauhṛdinī",
    "hindi_meaning": "चौथे माह में गर्भ स्थिर होता है तथा हृदय व्यक्त होता है; स्त्री द्विहृदया (दौहृदिनी) कहलाती है।",
    "english_clinical_summary": "Month 4: stability of the fetus; the heart manifests so the woman is Dvihridaya — she has Dauhrida (pregnancy cravings representing the fetus’s wishes). Garbha attains Sthirata (stability); mother becomes heavier (Guru-gatra). Hridaya manifests — the Dauhrida state: the mother expresses the fetus's desires through her own cravings.",
    "dc_dutta_correlation": "Weeks 14–17 · Second trimester begins: Fetal sex organs differentiate, lanugo appears, fundus midway between symphysis and umbilicus at 16 weeks. Start iron 100 mg elemental + folic acid 500 mcg, calcium 500 mg BD. Td dose 1/2, quad marker 15–20 weeks. Mother usually feels well — appetite improves.",
    "keywords": [
      "garbha vriddhi",
      "embryology",
      "fetal growth",
      "month 4",
      "sthirata & dauhrida",
      "dauhrida",
      "ojas",
      "kalala",
      "development",
      "milestone",
      "trimester 2"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Month 4 me konsa ksheera-paka sabse labhadayak hai?",
      "Month 4 me DC Dutta ke anusaar konsa scan ya test karwayein?",
      "Month 4 ke classical red flags aur upadrava kya hain?"
    ]
  },
  {
    "month": 5,
    "ritu": null,
    "samhita": "charaka",
    "stage": "garbha_vriddhi",
    "sanskrit": "पञ्चमे मासे गर्भस्य मांसशोणितोपचयो भवत्यधिकमन्येभ्यो मासेभ्यः; मनः प्रतिबुद्धतरम्",
    "iast": "pañcame māse garbhasya māṃsaśoṇitopacayo bhavaty adhikam anyebhyo māsebhyaḥ; manaḥ pratibuddhataram",
    "hindi": "पाँचवें माह में गर्भ के मांस-शोणित की वृद्धि अन्य माहों से अधिक होती है; मन अधिक जागृत होता है।",
    "english": "Month 5: maximal growth of Mamsa and Shonita; mind (Manas) becomes more awake; mother becomes lean. Fetal muscle (Mamsa) and blood (Shonita) increase most; the mother becomes lean (Karshya). Manas is more awakened — fetal movements begin to be felt.",
    "citation": "Ch. Sha. 4.21",
    "dc_dutta": "Weeks 18–21 · Quickening & anomaly scan: Quickening at 16–18 weeks in multigravida, ~20 in primigravida. Fundus at umbilicus at 20–22 weeks; FHS audible by fetoscope. Level-II anomaly scan 18–20 weeks; Td 2nd dose; Hb check; weight gain ~0.4 kg/week from now.",
    "red_flags": [
      "No fetal movement by 22 weeks",
      "Persistent abdominal pain / uterine tenderness",
      "Pallor with Hb < 10 g/dl"
    ],
    "tags": [
      "garbha vriddhi",
      "embryology",
      "fetal growth",
      "month 5",
      "mamsa-shonita upachaya · manas pratibuddha",
      "dauhrida",
      "ojas",
      "kalala",
      "development",
      "milestone",
      "trimester 2"
    ],
    "plan": {},
    "id": "gv-m5",
    "title": "Garbha Vriddhi — Month 5: Mamsa-Shonita Upachaya · Manas Pratibuddha",
    "domain": "garbhini",
    "sanskrit_shloka": "पञ्चमे मासे गर्भस्य मांसशोणितोपचयो भवत्यधिकमन्येभ्यो मासेभ्यः; मनः प्रतिबुद्धतरम्",
    "transliteration": "pañcame māse garbhasya māṃsaśoṇitopacayo bhavaty adhikam anyebhyo māsebhyaḥ; manaḥ pratibuddhataram",
    "hindi_meaning": "पाँचवें माह में गर्भ के मांस-शोणित की वृद्धि अन्य माहों से अधिक होती है; मन अधिक जागृत होता है।",
    "english_clinical_summary": "Month 5: maximal growth of Mamsa and Shonita; mind (Manas) becomes more awake; mother becomes lean. Fetal muscle (Mamsa) and blood (Shonita) increase most; the mother becomes lean (Karshya). Manas is more awakened — fetal movements begin to be felt.",
    "dc_dutta_correlation": "Weeks 18–21 · Quickening & anomaly scan: Quickening at 16–18 weeks in multigravida, ~20 in primigravida. Fundus at umbilicus at 20–22 weeks; FHS audible by fetoscope. Level-II anomaly scan 18–20 weeks; Td 2nd dose; Hb check; weight gain ~0.4 kg/week from now.",
    "keywords": [
      "garbha vriddhi",
      "embryology",
      "fetal growth",
      "month 5",
      "mamsa-shonita upachaya · manas pratibuddha",
      "dauhrida",
      "ojas",
      "kalala",
      "development",
      "milestone",
      "trimester 2"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Month 5 me konsa ksheera-paka sabse labhadayak hai?",
      "Month 5 me DC Dutta ke anusaar konsa scan ya test karwayein?",
      "Month 5 ke classical red flags aur upadrava kya hain?"
    ]
  },
  {
    "month": 6,
    "ritu": null,
    "samhita": "charaka",
    "stage": "garbha_vriddhi",
    "sanskrit": "षष्ठे मासे गर्भस्य बलवर्णोपचयो भवत्यधिकमन्येभ्यो मासेभ्यः; बुद्धिः प्रतिबुद्धतरा",
    "iast": "ṣaṣṭhe māse garbhasya balavarṇopacayo bhavaty adhikam anyebhyo māsebhyaḥ; buddhiḥ pratibuddhatarā",
    "hindi": "छठे माह में गर्भ के बल-वर्ण की सर्वाधिक वृद्धि होती है; बुद्धि अधिक जागृत होती है।",
    "english": "Month 6: maximal increase in Bala and Varna; intellect (Buddhi) awakens; the mother loses strength and colour. Fetal strength (Bala) and complexion (Varna) increase most; mother may lose strength and colour. Buddhi (intellect) becomes more awakened.",
    "citation": "Ch. Sha. 4.21",
    "dc_dutta": "Weeks 22–26 · Viability & GDM screening: Viability from ~24 weeks (surfactant starts). OGTT 75 g at 24–28 weeks (≥140 mg/dl at 2 h = GDM). Monitor BP and urine albumin at each visit — pre-eclampsia screening; edema of feet is physiological, face/hand edema is not. Repeat Hb at 28 weeks.",
    "red_flags": [
      "BP ≥ 140/90 mmHg",
      "Facial / hand swelling with headache",
      "Reduced fetal movement",
      "Hb < 9 g/dl or polyuria-polydipsia (GDM)"
    ],
    "tags": [
      "garbha vriddhi",
      "embryology",
      "fetal growth",
      "month 6",
      "bala-varna upachaya · buddhi pratibuddha",
      "dauhrida",
      "ojas",
      "kalala",
      "development",
      "milestone",
      "trimester 2"
    ],
    "plan": {},
    "id": "gv-m6",
    "title": "Garbha Vriddhi — Month 6: Bala-Varna Upachaya · Buddhi Pratibuddha",
    "domain": "garbhini",
    "sanskrit_shloka": "षष्ठे मासे गर्भस्य बलवर्णोपचयो भवत्यधिकमन्येभ्यो मासेभ्यः; बुद्धिः प्रतिबुद्धतरा",
    "transliteration": "ṣaṣṭhe māse garbhasya balavarṇopacayo bhavaty adhikam anyebhyo māsebhyaḥ; buddhiḥ pratibuddhatarā",
    "hindi_meaning": "छठे माह में गर्भ के बल-वर्ण की सर्वाधिक वृद्धि होती है; बुद्धि अधिक जागृत होती है।",
    "english_clinical_summary": "Month 6: maximal increase in Bala and Varna; intellect (Buddhi) awakens; the mother loses strength and colour. Fetal strength (Bala) and complexion (Varna) increase most; mother may lose strength and colour. Buddhi (intellect) becomes more awakened.",
    "dc_dutta_correlation": "Weeks 22–26 · Viability & GDM screening: Viability from ~24 weeks (surfactant starts). OGTT 75 g at 24–28 weeks (≥140 mg/dl at 2 h = GDM). Monitor BP and urine albumin at each visit — pre-eclampsia screening; edema of feet is physiological, face/hand edema is not. Repeat Hb at 28 weeks.",
    "keywords": [
      "garbha vriddhi",
      "embryology",
      "fetal growth",
      "month 6",
      "bala-varna upachaya · buddhi pratibuddha",
      "dauhrida",
      "ojas",
      "kalala",
      "development",
      "milestone",
      "trimester 2"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Month 6 me konsa ksheera-paka sabse labhadayak hai?",
      "Month 6 me DC Dutta ke anusaar konsa scan ya test karwayein?",
      "Month 6 ke classical red flags aur upadrava kya hain?"
    ]
  },
  {
    "month": 7,
    "ritu": null,
    "samhita": "charaka",
    "stage": "garbha_vriddhi",
    "sanskrit": "सप्तमे मासे गर्भः सर्वैर्भावैराप्यायते",
    "iast": "saptame māse garbhaḥ sarvair bhāvair āpyāyate",
    "hindi": "सातवें माह में गर्भ सभी भावों से पूर्ण रूप से परिपुष्ट होता है।",
    "english": "Month 7: the fetus is fully endowed with all Bhavas; mother is most fatigued. All body parts and organs are fully developed (Sarvairbhavair Apyayate). Mother becomes fatigued (Klanta) due to maximal fetal demands.",
    "citation": "Ch. Sha. 4.21; Su. Sha. 3",
    "dc_dutta": "Weeks 27–30 · Third trimester: Third trimester begins at 28 weeks; FH ≈ gestational weeks in cm (±2). Anti-D 300 mcg at 28 weeks if Rh-negative & indirect Coombs negative; Tdap 27–36 weeks; kick-count (≥10 movements in 12 h); visits every 2 weeks. Screen for anemia, GDM, pre-eclampsia, IUGR.",
    "red_flags": [
      "Preterm contractions < 37 weeks",
      "Antepartum bleeding",
      "Persistent headache / visual disturbance / epigastric pain"
    ],
    "tags": [
      "garbha vriddhi",
      "embryology",
      "fetal growth",
      "month 7",
      "sarvanga-pratyanga vibhaga",
      "dauhrida",
      "ojas",
      "kalala",
      "development",
      "milestone",
      "trimester 3"
    ],
    "plan": {},
    "id": "gv-m7",
    "title": "Garbha Vriddhi — Month 7: Sarvanga-Pratyanga Vibhaga",
    "domain": "garbhini",
    "sanskrit_shloka": "सप्तमे मासे गर्भः सर्वैर्भावैराप्यायते",
    "transliteration": "saptame māse garbhaḥ sarvair bhāvair āpyāyate",
    "hindi_meaning": "सातवें माह में गर्भ सभी भावों से पूर्ण रूप से परिपुष्ट होता है।",
    "english_clinical_summary": "Month 7: the fetus is fully endowed with all Bhavas; mother is most fatigued. All body parts and organs are fully developed (Sarvairbhavair Apyayate). Mother becomes fatigued (Klanta) due to maximal fetal demands.",
    "dc_dutta_correlation": "Weeks 27–30 · Third trimester: Third trimester begins at 28 weeks; FH ≈ gestational weeks in cm (±2). Anti-D 300 mcg at 28 weeks if Rh-negative & indirect Coombs negative; Tdap 27–36 weeks; kick-count (≥10 movements in 12 h); visits every 2 weeks. Screen for anemia, GDM, pre-eclampsia, IUGR.",
    "keywords": [
      "garbha vriddhi",
      "embryology",
      "fetal growth",
      "month 7",
      "sarvanga-pratyanga vibhaga",
      "dauhrida",
      "ojas",
      "kalala",
      "development",
      "milestone",
      "trimester 3"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Month 7 me konsa ksheera-paka sabse labhadayak hai?",
      "Month 7 me DC Dutta ke anusaar konsa scan ya test karwayein?",
      "Month 7 ke classical red flags aur upadrava kya hain?"
    ]
  },
  {
    "month": 8,
    "ritu": null,
    "samhita": "sushruta",
    "stage": "garbha_vriddhi",
    "sanskrit": "अष्टमे मासे गर्भमातृओजसोः सञ्चारित्वात् जातो न जीवति",
    "iast": "aṣṭame māse garbhamātṛ-ojasoḥ sañcāritvāt jāto na jīvati",
    "hindi": "आठवें माह में गर्भ और माता के ओज के आदान-प्रदान से अस्थिरता रहती है; इस काल में जन्मा शिशु प्रायः नहीं जीता।",
    "english": "Month 8: Ojas oscillates between mother and fetus (unstable) so a baby born now is vulnerable — special Ojas care. Ojas oscillates between mother and fetus (Ojas-sancharitvam): when more in the mother the fetus is weak; when more in the fetus the mother is lethargic. Delivery in this month carries risk — hence special Ojas rakshana.",
    "citation": "Sushruta Samhita, Sharira Sthana 3/30 & 10/4",
    "dc_dutta": "Weeks 31–34 · Late preterm window: Rapid weight gain and brain growth; lungs maturing. Growth scan with liquor and Doppler if indicated; NST for high-risk; steroids (betamethasone) if preterm delivery anticipated. Fetal presentation assessed from 32–34 weeks; visits every 2 weeks (weekly from 36).",
    "red_flags": [
      "Regular painful contractions",
      "Rupture of membranes",
      "Bleeding PV",
      "Severe pre-eclampsia features",
      "Absent / reduced fetal movement"
    ],
    "tags": [
      "garbha vriddhi",
      "embryology",
      "fetal growth",
      "month 8",
      "ojas sancharana (unstable ojas)",
      "dauhrida",
      "ojas",
      "kalala",
      "development",
      "milestone",
      "trimester 3"
    ],
    "plan": {},
    "id": "gv-m8",
    "title": "Garbha Vriddhi — Month 8: Ojas Sancharana (Unstable Ojas)",
    "domain": "garbhini",
    "sanskrit_shloka": "अष्टमे मासे गर्भमातृओजसोः सञ्चारित्वात् जातो न जीवति",
    "transliteration": "aṣṭame māse garbhamātṛ-ojasoḥ sañcāritvāt jāto na jīvati",
    "hindi_meaning": "आठवें माह में गर्भ और माता के ओज के आदान-प्रदान से अस्थिरता रहती है; इस काल में जन्मा शिशु प्रायः नहीं जीता।",
    "english_clinical_summary": "Month 8: Ojas oscillates between mother and fetus (unstable) so a baby born now is vulnerable — special Ojas care. Ojas oscillates between mother and fetus (Ojas-sancharitvam): when more in the mother the fetus is weak; when more in the fetus the mother is lethargic. Delivery in this month carries risk — hence special Ojas rakshana.",
    "dc_dutta_correlation": "Weeks 31–34 · Late preterm window: Rapid weight gain and brain growth; lungs maturing. Growth scan with liquor and Doppler if indicated; NST for high-risk; steroids (betamethasone) if preterm delivery anticipated. Fetal presentation assessed from 32–34 weeks; visits every 2 weeks (weekly from 36).",
    "keywords": [
      "garbha vriddhi",
      "embryology",
      "fetal growth",
      "month 8",
      "ojas sancharana (unstable ojas)",
      "dauhrida",
      "ojas",
      "kalala",
      "development",
      "milestone",
      "trimester 3"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Month 8 me konsa ksheera-paka sabse labhadayak hai?",
      "Month 8 me DC Dutta ke anusaar konsa scan ya test karwayein?",
      "Month 8 ke classical red flags aur upadrava kya hain?"
    ]
  },
  {
    "month": 9,
    "ritu": null,
    "samhita": "charaka",
    "stage": "garbha_vriddhi",
    "sanskrit": "नवमे दशमे एकादशे द्वादशे वा मासे प्रसवकालः",
    "iast": "navame daśame ekādaśe dvādaśe vā māse prasavakālaḥ",
    "hindi": "नवें से बारहवें माह के बीच प्रसव-काल होता है।",
    "english": "Month 9: the fetus is complete; Prasava-Kala (time of delivery) falls between the 9th and 12th month. Garbha is fully developed; Prasava Kala occurs in the 9th–12th month. Head engages, Apana Vayu directs the fetus downward for Sukhaprasava.",
    "citation": "Ch. Sha. 4 ; Su. Sha. 3",
    "dc_dutta": "Weeks 35–40+ · Term, engagement & labour: Term = 37–41+6 weeks. Lightening (engagement) in primigravida 2–3 weeks before labour; true labour: regular, progressive contractions, show, cervical dilatation. Weekly visits from 36 weeks, NST/AFI as indicated; Bishop score; induction considered after 41 weeks. Sukhaprasava = spontaneous vaginal delivery with active management of third stage.",
    "red_flags": [
      "Leaking liquor / rupture of membranes",
      "Regular contractions every 5 min",
      "Reduced or absent fetal movement",
      "Bleeding PV",
      "Severe headache, blurred vision, convulsions"
    ],
    "tags": [
      "garbha vriddhi",
      "embryology",
      "fetal growth",
      "month 9",
      "prasava kala (term)",
      "dauhrida",
      "ojas",
      "kalala",
      "development",
      "milestone",
      "trimester 3"
    ],
    "plan": {},
    "id": "gv-m9",
    "title": "Garbha Vriddhi — Month 9: Prasava Kala (Term)",
    "domain": "garbhini",
    "sanskrit_shloka": "नवमे दशमे एकादशे द्वादशे वा मासे प्रसवकालः",
    "transliteration": "navame daśame ekādaśe dvādaśe vā māse prasavakālaḥ",
    "hindi_meaning": "नवें से बारहवें माह के बीच प्रसव-काल होता है।",
    "english_clinical_summary": "Month 9: the fetus is complete; Prasava-Kala (time of delivery) falls between the 9th and 12th month. Garbha is fully developed; Prasava Kala occurs in the 9th–12th month. Head engages, Apana Vayu directs the fetus downward for Sukhaprasava.",
    "dc_dutta_correlation": "Weeks 35–40+ · Term, engagement & labour: Term = 37–41+6 weeks. Lightening (engagement) in primigravida 2–3 weeks before labour; true labour: regular, progressive contractions, show, cervical dilatation. Weekly visits from 36 weeks, NST/AFI as indicated; Bishop score; induction considered after 41 weeks. Sukhaprasava = spontaneous vaginal delivery with active management of third stage.",
    "keywords": [
      "garbha vriddhi",
      "embryology",
      "fetal growth",
      "month 9",
      "prasava kala (term)",
      "dauhrida",
      "ojas",
      "kalala",
      "development",
      "milestone",
      "trimester 3"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Month 9 me konsa ksheera-paka sabse labhadayak hai?",
      "Month 9 me DC Dutta ke anusaar konsa scan ya test karwayein?",
      "Month 9 ke classical red flags aur upadrava kya hain?"
    ]
  },
  {
    "month": null,
    "ritu": null,
    "samhita": "dcdutta",
    "stage": "dcdutta",
    "sanskrit": "",
    "iast": "",
    "hindi": "",
    "english": "Minimum 8 contacts (WHO 2016) / 4 ANC visits (India): monthly till 28 weeks, fortnightly 28–36, weekly after 36. Each visit: weight, BP, pallor, edema, fundal height, FHS, presentation, urine albumin/sugar. Investigations: Hb, blood group & Rh, HIV, HBsAg, VDRL, urine, blood sugar, TSH, USG (dating, NT, anomaly, growth).",
    "citation": "DC Dutta — Antenatal Care",
    "dc_dutta": "Minimum 8 contacts (WHO 2016) / 4 ANC visits (India): monthly till 28 weeks, fortnightly 28–36, weekly after 36. Each visit: weight, BP, pallor, edema, fundal height, FHS, presentation, urine albumin/sugar. Investigations: Hb, blood group & Rh, HIV, HBsAg, VDRL, urine, blood sugar, TSH, USG (dating, NT, anomaly, growth).",
    "red_flags": [
      "Vaginal bleeding or brown spotting PV",
      "Severe headache with visual disturbance (photophobia)",
      "Sudden swelling of face and hands",
      "Marked reduction or absence of fetal movements"
    ],
    "tags": [
      "dc dutta",
      "obstetrics",
      "antenatal care schedule"
    ],
    "plan": {},
    "id": "dd-anc",
    "title": "DC Dutta — Antenatal Care Schedule",
    "domain": "dcdutta",
    "sanskrit_shloka": "",
    "transliteration": "",
    "hindi_meaning": "",
    "english_clinical_summary": "Minimum 8 contacts (WHO 2016) / 4 ANC visits (India): monthly till 28 weeks, fortnightly 28–36, weekly after 36. Each visit: weight, BP, pallor, edema, fundal height, FHS, presentation, urine albumin/sugar. Investigations: Hb, blood group & Rh, HIV, HBsAg, VDRL, urine, blood sugar, TSH, USG (dating, NT, anomaly, growth).",
    "dc_dutta_correlation": "Minimum 8 contacts (WHO 2016) / 4 ANC visits (India): monthly till 28 weeks, fortnightly 28–36, weekly after 36. Each visit: weight, BP, pallor, edema, fundal height, FHS, presentation, urine albumin/sugar. Investigations: Hb, blood group & Rh, HIV, HBsAg, VDRL, urine, blood sugar, TSH, USG (dating, NT, anomaly, growth).",
    "keywords": [
      "dc dutta",
      "obstetrics",
      "antenatal care schedule"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Classical Samhitas me iska mukhya chikitsa sutra kya hai?",
      "DC Dutta Obstetrics me iska modern clinical protocol kya hai?",
      "Garbhini ko kab turant hospital review ke liye refer karein?"
    ]
  },
  {
    "month": null,
    "ritu": null,
    "samhita": "dcdutta",
    "stage": "dcdutta",
    "sanskrit": "",
    "iast": "",
    "hindi": "",
    "english": "First stage: onset of true labour to full dilatation (primi ~12 h, multi ~6–8 h); second: full dilatation to delivery; third: delivery of placenta with Active Management (oxytocin 10 IU IM, controlled cord traction, uterine massage). Partograph monitoring.",
    "citation": "DC Dutta — Normal Labour",
    "dc_dutta": "First stage: onset of true labour to full dilatation (primi ~12 h, multi ~6–8 h); second: full dilatation to delivery; third: delivery of placenta with Active Management (oxytocin 10 IU IM, controlled cord traction, uterine massage). Partograph monitoring.",
    "red_flags": [
      "Vaginal bleeding or brown spotting PV",
      "Severe headache with visual disturbance (photophobia)",
      "Sudden swelling of face and hands",
      "Marked reduction or absence of fetal movements"
    ],
    "tags": [
      "dc dutta",
      "obstetrics",
      "normal labour & sukhaprasava"
    ],
    "plan": {},
    "id": "dd-labour",
    "title": "DC Dutta — Normal Labour & Sukhaprasava",
    "domain": "dcdutta",
    "sanskrit_shloka": "",
    "transliteration": "",
    "hindi_meaning": "",
    "english_clinical_summary": "First stage: onset of true labour to full dilatation (primi ~12 h, multi ~6–8 h); second: full dilatation to delivery; third: delivery of placenta with Active Management (oxytocin 10 IU IM, controlled cord traction, uterine massage). Partograph monitoring.",
    "dc_dutta_correlation": "First stage: onset of true labour to full dilatation (primi ~12 h, multi ~6–8 h); second: full dilatation to delivery; third: delivery of placenta with Active Management (oxytocin 10 IU IM, controlled cord traction, uterine massage). Partograph monitoring.",
    "keywords": [
      "dc dutta",
      "obstetrics",
      "normal labour & sukhaprasava"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Classical Samhitas me iska mukhya chikitsa sutra kya hai?",
      "DC Dutta Obstetrics me iska modern clinical protocol kya hai?",
      "Garbhini ko kab turant hospital review ke liye refer karein?"
    ]
  },
  {
    "month": null,
    "ritu": null,
    "samhita": "dcdutta",
    "stage": "dcdutta",
    "sanskrit": "",
    "iast": "",
    "hindi": "",
    "english": "EDD = LMP + 9 months + 7 days (cycle-adjusted for 28-day cycle). Confirm by early USG (CRL at 7–13 weeks, ±5–7 days).",
    "citation": "DC Dutta — Diagnosis of Pregnancy",
    "dc_dutta": "EDD = LMP + 9 months + 7 days (cycle-adjusted for 28-day cycle). Confirm by early USG (CRL at 7–13 weeks, ±5–7 days).",
    "red_flags": [
      "Vaginal bleeding or brown spotting PV",
      "Severe headache with visual disturbance (photophobia)",
      "Sudden swelling of face and hands",
      "Marked reduction or absence of fetal movements"
    ],
    "tags": [
      "dc dutta",
      "obstetrics",
      "edd calculation (naegele's rule)"
    ],
    "plan": {},
    "id": "dd-naegele",
    "title": "DC Dutta — EDD Calculation (Naegele's Rule)",
    "domain": "dcdutta",
    "sanskrit_shloka": "",
    "transliteration": "",
    "hindi_meaning": "",
    "english_clinical_summary": "EDD = LMP + 9 months + 7 days (cycle-adjusted for 28-day cycle). Confirm by early USG (CRL at 7–13 weeks, ±5–7 days).",
    "dc_dutta_correlation": "EDD = LMP + 9 months + 7 days (cycle-adjusted for 28-day cycle). Confirm by early USG (CRL at 7–13 weeks, ±5–7 days).",
    "keywords": [
      "dc dutta",
      "obstetrics",
      "edd calculation (naegele's rule)"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Classical Samhitas me iska mukhya chikitsa sutra kya hai?",
      "DC Dutta Obstetrics me iska modern clinical protocol kya hai?",
      "Garbhini ko kab turant hospital review ke liye refer karein?"
    ]
  },
  {
    "month": null,
    "ritu": null,
    "samhita": "dcdutta",
    "stage": "dcdutta",
    "sanskrit": "",
    "iast": "",
    "hindi": "",
    "english": "Extra 350 kcal/day (2nd) and 450 kcal (3rd trimester) beyond 2200 kcal; protein +23 g/day. Iron 100 mg elemental + folic acid 500 mcg from 14–16 weeks for 100 days; calcium 1 g/day; vitamin D 400–600 IU; iodine. Expected weight gain 10–12 kg in Indian women.",
    "citation": "DC Dutta — Nutrition in Pregnancy",
    "dc_dutta": "Extra 350 kcal/day (2nd) and 450 kcal (3rd trimester) beyond 2200 kcal; protein +23 g/day. Iron 100 mg elemental + folic acid 500 mcg from 14–16 weeks for 100 days; calcium 1 g/day; vitamin D 400–600 IU; iodine. Expected weight gain 10–12 kg in Indian women.",
    "red_flags": [
      "Vaginal bleeding or brown spotting PV",
      "Severe headache with visual disturbance (photophobia)",
      "Sudden swelling of face and hands",
      "Marked reduction or absence of fetal movements"
    ],
    "tags": [
      "dc dutta",
      "obstetrics",
      "nutrition & supplements"
    ],
    "plan": {},
    "id": "dd-nutrition",
    "title": "DC Dutta — Nutrition & Supplements",
    "domain": "dcdutta",
    "sanskrit_shloka": "",
    "transliteration": "",
    "hindi_meaning": "",
    "english_clinical_summary": "Extra 350 kcal/day (2nd) and 450 kcal (3rd trimester) beyond 2200 kcal; protein +23 g/day. Iron 100 mg elemental + folic acid 500 mcg from 14–16 weeks for 100 days; calcium 1 g/day; vitamin D 400–600 IU; iodine. Expected weight gain 10–12 kg in Indian women.",
    "dc_dutta_correlation": "Extra 350 kcal/day (2nd) and 450 kcal (3rd trimester) beyond 2200 kcal; protein +23 g/day. Iron 100 mg elemental + folic acid 500 mcg from 14–16 weeks for 100 days; calcium 1 g/day; vitamin D 400–600 IU; iodine. Expected weight gain 10–12 kg in Indian women.",
    "keywords": [
      "dc dutta",
      "obstetrics",
      "nutrition & supplements"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Classical Samhitas me iska mukhya chikitsa sutra kya hai?",
      "DC Dutta Obstetrics me iska modern clinical protocol kya hai?",
      "Garbhini ko kab turant hospital review ke liye refer karein?"
    ]
  },
  {
    "month": 1,
    "ritu": null,
    "samhita": "dcdutta",
    "stage": "dcdutta",
    "sanskrit": "",
    "iast": "",
    "hindi": "",
    "english": "Fertilisation in the ampulla, implantation on day 6–7, hCG detectable ~8–10 days post-ovulation; UPT positive at missed period. Confirm pregnancy, calculate EDD (Naegele: LMP + 9 months + 7 days), start folic acid 400 mcg (5 mg in high-risk), book ANC early, avoid teratogens (alcohol, tobacco, unsupervised drugs, radiation).",
    "citation": "DC Dutta, Textbook of Obstetrics — Antenatal Care / Physiology of Pregnancy (Month 1, weeks 1–4)",
    "dc_dutta": "Fertilisation in the ampulla, implantation on day 6–7, hCG detectable ~8–10 days post-ovulation; UPT positive at missed period. Confirm pregnancy, calculate EDD (Naegele: LMP + 9 months + 7 days), start folic acid 400 mcg (5 mg in high-risk), book ANC early, avoid teratogens (alcohol, tobacco, unsupervised drugs, radiation).",
    "red_flags": [
      "Bleeding PV with lower-abdominal pain (threatened abortion / ectopic)",
      "Severe one-sided pelvic pain or shoulder-tip pain",
      "Persistent vomiting with inability to retain fluids"
    ],
    "tags": [
      "dc dutta",
      "obstetrics",
      "anc",
      "month 1",
      "weeks 1–4",
      "trimester 1",
      "scan",
      "investigations",
      "supplements"
    ],
    "plan": {},
    "id": "dd-m1",
    "title": "DC Dutta — Weeks 1–4 · Fertilisation, implantation & booking",
    "domain": "dcdutta",
    "sanskrit_shloka": "",
    "transliteration": "",
    "hindi_meaning": "",
    "english_clinical_summary": "Fertilisation in the ampulla, implantation on day 6–7, hCG detectable ~8–10 days post-ovulation; UPT positive at missed period. Confirm pregnancy, calculate EDD (Naegele: LMP + 9 months + 7 days), start folic acid 400 mcg (5 mg in high-risk), book ANC early, avoid teratogens (alcohol, tobacco, unsupervised drugs, radiation).",
    "dc_dutta_correlation": "Fertilisation in the ampulla, implantation on day 6–7, hCG detectable ~8–10 days post-ovulation; UPT positive at missed period. Confirm pregnancy, calculate EDD (Naegele: LMP + 9 months + 7 days), start folic acid 400 mcg (5 mg in high-risk), book ANC early, avoid teratogens (alcohol, tobacco, unsupervised drugs, radiation).",
    "keywords": [
      "dc dutta",
      "obstetrics",
      "anc",
      "month 1",
      "weeks 1–4",
      "trimester 1",
      "scan",
      "investigations",
      "supplements"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Month 1 me konsa ksheera-paka sabse labhadayak hai?",
      "Month 1 me DC Dutta ke anusaar konsa scan ya test karwayein?",
      "Month 1 ke classical red flags aur upadrava kya hain?"
    ]
  },
  {
    "month": 2,
    "ritu": null,
    "samhita": "dcdutta",
    "stage": "dcdutta",
    "sanskrit": "",
    "iast": "",
    "hindi": "",
    "english": "Neural tube closes by day 28, heart tube beats from ~6 weeks (visible on TVS), limb buds appear — peak teratogenic sensitivity. Early dating USG confirms viability and site. Hyperemesis gravidarum: IV fluids, antiemetics, thiamine, correction of electrolytes if ketonuria.",
    "citation": "DC Dutta, Textbook of Obstetrics — Antenatal Care / Physiology of Pregnancy (Month 2, weeks 5–8)",
    "dc_dutta": "Neural tube closes by day 28, heart tube beats from ~6 weeks (visible on TVS), limb buds appear — peak teratogenic sensitivity. Early dating USG confirms viability and site. Hyperemesis gravidarum: IV fluids, antiemetics, thiamine, correction of electrolytes if ketonuria.",
    "red_flags": [
      "Spotting / bleeding with passage of tissue",
      "Vomiting >5 times a day with weight loss or ketones",
      "Fever with rash (rubella, CMV, Zika risk)"
    ],
    "tags": [
      "dc dutta",
      "obstetrics",
      "anc",
      "month 2",
      "weeks 5–8",
      "trimester 1",
      "scan",
      "investigations",
      "supplements"
    ],
    "plan": {},
    "id": "dd-m2",
    "title": "DC Dutta — Weeks 5–8 · Embryonic period, organogenesis",
    "domain": "dcdutta",
    "sanskrit_shloka": "",
    "transliteration": "",
    "hindi_meaning": "",
    "english_clinical_summary": "Neural tube closes by day 28, heart tube beats from ~6 weeks (visible on TVS), limb buds appear — peak teratogenic sensitivity. Early dating USG confirms viability and site. Hyperemesis gravidarum: IV fluids, antiemetics, thiamine, correction of electrolytes if ketonuria.",
    "dc_dutta_correlation": "Neural tube closes by day 28, heart tube beats from ~6 weeks (visible on TVS), limb buds appear — peak teratogenic sensitivity. Early dating USG confirms viability and site. Hyperemesis gravidarum: IV fluids, antiemetics, thiamine, correction of electrolytes if ketonuria.",
    "keywords": [
      "dc dutta",
      "obstetrics",
      "anc",
      "month 2",
      "weeks 5–8",
      "trimester 1",
      "scan",
      "investigations",
      "supplements"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Month 2 me konsa ksheera-paka sabse labhadayak hai?",
      "Month 2 me DC Dutta ke anusaar konsa scan ya test karwayein?",
      "Month 2 ke classical red flags aur upadrava kya hain?"
    ]
  },
  {
    "month": 3,
    "ritu": null,
    "samhita": "dcdutta",
    "stage": "dcdutta",
    "sanskrit": "",
    "iast": "",
    "hindi": "",
    "english": "Fetal period starts at 9th week. NT scan at 11–13+6 weeks with double marker; baseline Hb, blood group & Rh, urine routine, VDRL, HIV, HBsAg, TSH, blood sugar. Td/Tdap schedule begins. Nausea usually settles by 14 weeks.",
    "citation": "DC Dutta, Textbook of Obstetrics — Antenatal Care / Physiology of Pregnancy (Month 3, weeks 9–13)",
    "dc_dutta": "Fetal period starts at 9th week. NT scan at 11–13+6 weeks with double marker; baseline Hb, blood group & Rh, urine routine, VDRL, HIV, HBsAg, TSH, blood sugar. Td/Tdap schedule begins. Nausea usually settles by 14 weeks.",
    "red_flags": [
      "Heavy bleeding or clots",
      "Burning micturition with fever (UTI)",
      "Severe pallor and breathlessness"
    ],
    "tags": [
      "dc dutta",
      "obstetrics",
      "anc",
      "month 3",
      "weeks 9–13",
      "trimester 1",
      "scan",
      "investigations",
      "supplements"
    ],
    "plan": {},
    "id": "dd-m3",
    "title": "DC Dutta — Weeks 9–13 · End of the first trimester",
    "domain": "dcdutta",
    "sanskrit_shloka": "",
    "transliteration": "",
    "hindi_meaning": "",
    "english_clinical_summary": "Fetal period starts at 9th week. NT scan at 11–13+6 weeks with double marker; baseline Hb, blood group & Rh, urine routine, VDRL, HIV, HBsAg, TSH, blood sugar. Td/Tdap schedule begins. Nausea usually settles by 14 weeks.",
    "dc_dutta_correlation": "Fetal period starts at 9th week. NT scan at 11–13+6 weeks with double marker; baseline Hb, blood group & Rh, urine routine, VDRL, HIV, HBsAg, TSH, blood sugar. Td/Tdap schedule begins. Nausea usually settles by 14 weeks.",
    "keywords": [
      "dc dutta",
      "obstetrics",
      "anc",
      "month 3",
      "weeks 9–13",
      "trimester 1",
      "scan",
      "investigations",
      "supplements"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Month 3 me konsa ksheera-paka sabse labhadayak hai?",
      "Month 3 me DC Dutta ke anusaar konsa scan ya test karwayein?",
      "Month 3 ke classical red flags aur upadrava kya hain?"
    ]
  },
  {
    "month": 4,
    "ritu": null,
    "samhita": "dcdutta",
    "stage": "dcdutta",
    "sanskrit": "",
    "iast": "",
    "hindi": "",
    "english": "Fetal sex organs differentiate, lanugo appears, fundus midway between symphysis and umbilicus at 16 weeks. Start iron 100 mg elemental + folic acid 500 mcg, calcium 500 mg BD. Td dose 1/2, quad marker 15–20 weeks. Mother usually feels well — appetite improves.",
    "citation": "DC Dutta, Textbook of Obstetrics — Antenatal Care / Physiology of Pregnancy (Month 4, weeks 14–17)",
    "dc_dutta": "Fetal sex organs differentiate, lanugo appears, fundus midway between symphysis and umbilicus at 16 weeks. Start iron 100 mg elemental + folic acid 500 mcg, calcium 500 mg BD. Td dose 1/2, quad marker 15–20 weeks. Mother usually feels well — appetite improves.",
    "red_flags": [
      "Watery leak PV (PPROM)",
      "Painless bleeding",
      "Severe headache with high BP (early pre-eclampsia is rare but possible)"
    ],
    "tags": [
      "dc dutta",
      "obstetrics",
      "anc",
      "month 4",
      "weeks 14–17",
      "trimester 2",
      "scan",
      "investigations",
      "supplements"
    ],
    "plan": {},
    "id": "dd-m4",
    "title": "DC Dutta — Weeks 14–17 · Second trimester begins",
    "domain": "dcdutta",
    "sanskrit_shloka": "",
    "transliteration": "",
    "hindi_meaning": "",
    "english_clinical_summary": "Fetal sex organs differentiate, lanugo appears, fundus midway between symphysis and umbilicus at 16 weeks. Start iron 100 mg elemental + folic acid 500 mcg, calcium 500 mg BD. Td dose 1/2, quad marker 15–20 weeks. Mother usually feels well — appetite improves.",
    "dc_dutta_correlation": "Fetal sex organs differentiate, lanugo appears, fundus midway between symphysis and umbilicus at 16 weeks. Start iron 100 mg elemental + folic acid 500 mcg, calcium 500 mg BD. Td dose 1/2, quad marker 15–20 weeks. Mother usually feels well — appetite improves.",
    "keywords": [
      "dc dutta",
      "obstetrics",
      "anc",
      "month 4",
      "weeks 14–17",
      "trimester 2",
      "scan",
      "investigations",
      "supplements"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Month 4 me konsa ksheera-paka sabse labhadayak hai?",
      "Month 4 me DC Dutta ke anusaar konsa scan ya test karwayein?",
      "Month 4 ke classical red flags aur upadrava kya hain?"
    ]
  },
  {
    "month": 5,
    "ritu": null,
    "samhita": "dcdutta",
    "stage": "dcdutta",
    "sanskrit": "",
    "iast": "",
    "hindi": "",
    "english": "Quickening at 16–18 weeks in multigravida, ~20 in primigravida. Fundus at umbilicus at 20–22 weeks; FHS audible by fetoscope. Level-II anomaly scan 18–20 weeks; Td 2nd dose; Hb check; weight gain ~0.4 kg/week from now.",
    "citation": "DC Dutta, Textbook of Obstetrics — Antenatal Care / Physiology of Pregnancy (Month 5, weeks 18–21)",
    "dc_dutta": "Quickening at 16–18 weeks in multigravida, ~20 in primigravida. Fundus at umbilicus at 20–22 weeks; FHS audible by fetoscope. Level-II anomaly scan 18–20 weeks; Td 2nd dose; Hb check; weight gain ~0.4 kg/week from now.",
    "red_flags": [
      "No fetal movement by 22 weeks",
      "Persistent abdominal pain / uterine tenderness",
      "Pallor with Hb < 10 g/dl"
    ],
    "tags": [
      "dc dutta",
      "obstetrics",
      "anc",
      "month 5",
      "weeks 18–21",
      "trimester 2",
      "scan",
      "investigations",
      "supplements"
    ],
    "plan": {},
    "id": "dd-m5",
    "title": "DC Dutta — Weeks 18–21 · Quickening & anomaly scan",
    "domain": "dcdutta",
    "sanskrit_shloka": "",
    "transliteration": "",
    "hindi_meaning": "",
    "english_clinical_summary": "Quickening at 16–18 weeks in multigravida, ~20 in primigravida. Fundus at umbilicus at 20–22 weeks; FHS audible by fetoscope. Level-II anomaly scan 18–20 weeks; Td 2nd dose; Hb check; weight gain ~0.4 kg/week from now.",
    "dc_dutta_correlation": "Quickening at 16–18 weeks in multigravida, ~20 in primigravida. Fundus at umbilicus at 20–22 weeks; FHS audible by fetoscope. Level-II anomaly scan 18–20 weeks; Td 2nd dose; Hb check; weight gain ~0.4 kg/week from now.",
    "keywords": [
      "dc dutta",
      "obstetrics",
      "anc",
      "month 5",
      "weeks 18–21",
      "trimester 2",
      "scan",
      "investigations",
      "supplements"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Month 5 me konsa ksheera-paka sabse labhadayak hai?",
      "Month 5 me DC Dutta ke anusaar konsa scan ya test karwayein?",
      "Month 5 ke classical red flags aur upadrava kya hain?"
    ]
  },
  {
    "month": 6,
    "ritu": null,
    "samhita": "dcdutta",
    "stage": "dcdutta",
    "sanskrit": "",
    "iast": "",
    "hindi": "",
    "english": "Viability from ~24 weeks (surfactant starts). OGTT 75 g at 24–28 weeks (≥140 mg/dl at 2 h = GDM). Monitor BP and urine albumin at each visit — pre-eclampsia screening; edema of feet is physiological, face/hand edema is not. Repeat Hb at 28 weeks.",
    "citation": "DC Dutta, Textbook of Obstetrics — Antenatal Care / Physiology of Pregnancy (Month 6, weeks 22–26)",
    "dc_dutta": "Viability from ~24 weeks (surfactant starts). OGTT 75 g at 24–28 weeks (≥140 mg/dl at 2 h = GDM). Monitor BP and urine albumin at each visit — pre-eclampsia screening; edema of feet is physiological, face/hand edema is not. Repeat Hb at 28 weeks.",
    "red_flags": [
      "BP ≥ 140/90 mmHg",
      "Facial / hand swelling with headache",
      "Reduced fetal movement",
      "Hb < 9 g/dl or polyuria-polydipsia (GDM)"
    ],
    "tags": [
      "dc dutta",
      "obstetrics",
      "anc",
      "month 6",
      "weeks 22–26",
      "trimester 2",
      "scan",
      "investigations",
      "supplements"
    ],
    "plan": {},
    "id": "dd-m6",
    "title": "DC Dutta — Weeks 22–26 · Viability & GDM screening",
    "domain": "dcdutta",
    "sanskrit_shloka": "",
    "transliteration": "",
    "hindi_meaning": "",
    "english_clinical_summary": "Viability from ~24 weeks (surfactant starts). OGTT 75 g at 24–28 weeks (≥140 mg/dl at 2 h = GDM). Monitor BP and urine albumin at each visit — pre-eclampsia screening; edema of feet is physiological, face/hand edema is not. Repeat Hb at 28 weeks.",
    "dc_dutta_correlation": "Viability from ~24 weeks (surfactant starts). OGTT 75 g at 24–28 weeks (≥140 mg/dl at 2 h = GDM). Monitor BP and urine albumin at each visit — pre-eclampsia screening; edema of feet is physiological, face/hand edema is not. Repeat Hb at 28 weeks.",
    "keywords": [
      "dc dutta",
      "obstetrics",
      "anc",
      "month 6",
      "weeks 22–26",
      "trimester 2",
      "scan",
      "investigations",
      "supplements"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Month 6 me konsa ksheera-paka sabse labhadayak hai?",
      "Month 6 me DC Dutta ke anusaar konsa scan ya test karwayein?",
      "Month 6 ke classical red flags aur upadrava kya hain?"
    ]
  },
  {
    "month": 7,
    "ritu": null,
    "samhita": "dcdutta",
    "stage": "dcdutta",
    "sanskrit": "",
    "iast": "",
    "hindi": "",
    "english": "Third trimester begins at 28 weeks; FH ≈ gestational weeks in cm (±2). Anti-D 300 mcg at 28 weeks if Rh-negative & indirect Coombs negative; Tdap 27–36 weeks; kick-count (≥10 movements in 12 h); visits every 2 weeks. Screen for anemia, GDM, pre-eclampsia, IUGR.",
    "citation": "DC Dutta, Textbook of Obstetrics — Antenatal Care / Physiology of Pregnancy (Month 7, weeks 27–30)",
    "dc_dutta": "Third trimester begins at 28 weeks; FH ≈ gestational weeks in cm (±2). Anti-D 300 mcg at 28 weeks if Rh-negative & indirect Coombs negative; Tdap 27–36 weeks; kick-count (≥10 movements in 12 h); visits every 2 weeks. Screen for anemia, GDM, pre-eclampsia, IUGR.",
    "red_flags": [
      "Preterm contractions < 37 weeks",
      "Antepartum bleeding",
      "Persistent headache / visual disturbance / epigastric pain"
    ],
    "tags": [
      "dc dutta",
      "obstetrics",
      "anc",
      "month 7",
      "weeks 27–30",
      "trimester 3",
      "scan",
      "investigations",
      "supplements"
    ],
    "plan": {},
    "id": "dd-m7",
    "title": "DC Dutta — Weeks 27–30 · Third trimester",
    "domain": "dcdutta",
    "sanskrit_shloka": "",
    "transliteration": "",
    "hindi_meaning": "",
    "english_clinical_summary": "Third trimester begins at 28 weeks; FH ≈ gestational weeks in cm (±2). Anti-D 300 mcg at 28 weeks if Rh-negative & indirect Coombs negative; Tdap 27–36 weeks; kick-count (≥10 movements in 12 h); visits every 2 weeks. Screen for anemia, GDM, pre-eclampsia, IUGR.",
    "dc_dutta_correlation": "Third trimester begins at 28 weeks; FH ≈ gestational weeks in cm (±2). Anti-D 300 mcg at 28 weeks if Rh-negative & indirect Coombs negative; Tdap 27–36 weeks; kick-count (≥10 movements in 12 h); visits every 2 weeks. Screen for anemia, GDM, pre-eclampsia, IUGR.",
    "keywords": [
      "dc dutta",
      "obstetrics",
      "anc",
      "month 7",
      "weeks 27–30",
      "trimester 3",
      "scan",
      "investigations",
      "supplements"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Month 7 me konsa ksheera-paka sabse labhadayak hai?",
      "Month 7 me DC Dutta ke anusaar konsa scan ya test karwayein?",
      "Month 7 ke classical red flags aur upadrava kya hain?"
    ]
  },
  {
    "month": 8,
    "ritu": null,
    "samhita": "dcdutta",
    "stage": "dcdutta",
    "sanskrit": "",
    "iast": "",
    "hindi": "",
    "english": "Rapid weight gain and brain growth; lungs maturing. Growth scan with liquor and Doppler if indicated; NST for high-risk; steroids (betamethasone) if preterm delivery anticipated. Fetal presentation assessed from 32–34 weeks; visits every 2 weeks (weekly from 36).",
    "citation": "DC Dutta, Textbook of Obstetrics — Antenatal Care / Physiology of Pregnancy (Month 8, weeks 31–34)",
    "dc_dutta": "Rapid weight gain and brain growth; lungs maturing. Growth scan with liquor and Doppler if indicated; NST for high-risk; steroids (betamethasone) if preterm delivery anticipated. Fetal presentation assessed from 32–34 weeks; visits every 2 weeks (weekly from 36).",
    "red_flags": [
      "Regular painful contractions",
      "Rupture of membranes",
      "Bleeding PV",
      "Severe pre-eclampsia features",
      "Absent / reduced fetal movement"
    ],
    "tags": [
      "dc dutta",
      "obstetrics",
      "anc",
      "month 8",
      "weeks 31–34",
      "trimester 3",
      "scan",
      "investigations",
      "supplements"
    ],
    "plan": {},
    "id": "dd-m8",
    "title": "DC Dutta — Weeks 31–34 · Late preterm window",
    "domain": "dcdutta",
    "sanskrit_shloka": "",
    "transliteration": "",
    "hindi_meaning": "",
    "english_clinical_summary": "Rapid weight gain and brain growth; lungs maturing. Growth scan with liquor and Doppler if indicated; NST for high-risk; steroids (betamethasone) if preterm delivery anticipated. Fetal presentation assessed from 32–34 weeks; visits every 2 weeks (weekly from 36).",
    "dc_dutta_correlation": "Rapid weight gain and brain growth; lungs maturing. Growth scan with liquor and Doppler if indicated; NST for high-risk; steroids (betamethasone) if preterm delivery anticipated. Fetal presentation assessed from 32–34 weeks; visits every 2 weeks (weekly from 36).",
    "keywords": [
      "dc dutta",
      "obstetrics",
      "anc",
      "month 8",
      "weeks 31–34",
      "trimester 3",
      "scan",
      "investigations",
      "supplements"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Month 8 me konsa ksheera-paka sabse labhadayak hai?",
      "Month 8 me DC Dutta ke anusaar konsa scan ya test karwayein?",
      "Month 8 ke classical red flags aur upadrava kya hain?"
    ]
  },
  {
    "month": 9,
    "ritu": null,
    "samhita": "dcdutta",
    "stage": "dcdutta",
    "sanskrit": "",
    "iast": "",
    "hindi": "",
    "english": "Term = 37–41+6 weeks. Lightening (engagement) in primigravida 2–3 weeks before labour; true labour: regular, progressive contractions, show, cervical dilatation. Weekly visits from 36 weeks, NST/AFI as indicated; Bishop score; induction considered after 41 weeks. Sukhaprasava = spontaneous vaginal delivery with active management of third stage.",
    "citation": "DC Dutta, Textbook of Obstetrics — Antenatal Care / Physiology of Pregnancy (Month 9, weeks 35–40+)",
    "dc_dutta": "Term = 37–41+6 weeks. Lightening (engagement) in primigravida 2–3 weeks before labour; true labour: regular, progressive contractions, show, cervical dilatation. Weekly visits from 36 weeks, NST/AFI as indicated; Bishop score; induction considered after 41 weeks. Sukhaprasava = spontaneous vaginal delivery with active management of third stage.",
    "red_flags": [
      "Leaking liquor / rupture of membranes",
      "Regular contractions every 5 min",
      "Reduced or absent fetal movement",
      "Bleeding PV",
      "Severe headache, blurred vision, convulsions"
    ],
    "tags": [
      "dc dutta",
      "obstetrics",
      "anc",
      "month 9",
      "weeks 35–40+",
      "trimester 3",
      "scan",
      "investigations",
      "supplements"
    ],
    "plan": {},
    "id": "dd-m9",
    "title": "DC Dutta — Weeks 35–40+ · Term, engagement & labour",
    "domain": "dcdutta",
    "sanskrit_shloka": "",
    "transliteration": "",
    "hindi_meaning": "",
    "english_clinical_summary": "Term = 37–41+6 weeks. Lightening (engagement) in primigravida 2–3 weeks before labour; true labour: regular, progressive contractions, show, cervical dilatation. Weekly visits from 36 weeks, NST/AFI as indicated; Bishop score; induction considered after 41 weeks. Sukhaprasava = spontaneous vaginal delivery with active management of third stage.",
    "dc_dutta_correlation": "Term = 37–41+6 weeks. Lightening (engagement) in primigravida 2–3 weeks before labour; true labour: regular, progressive contractions, show, cervical dilatation. Weekly visits from 36 weeks, NST/AFI as indicated; Bishop score; induction considered after 41 weeks. Sukhaprasava = spontaneous vaginal delivery with active management of third stage.",
    "keywords": [
      "dc dutta",
      "obstetrics",
      "anc",
      "month 9",
      "weeks 35–40+",
      "trimester 3",
      "scan",
      "investigations",
      "supplements"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Month 9 me konsa ksheera-paka sabse labhadayak hai?",
      "Month 9 me DC Dutta ke anusaar konsa scan ya test karwayein?",
      "Month 9 ke classical red flags aur upadrava kya hain?"
    ]
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
    "month": null,
    "ritu": null,
    "title": "Charaka Samhita — Six Ritus & Seasonal Maternal Adaptation",
    "citation": "Charaka Samhita, Sutra Sthana 6/3-8",
    "sanskrit_shloka": "इह खलु संवत्सरो षडृतुको भवति। आदानकालः शीतोष्णरूक्षैर्बलमादत्ते, विसर्गकालस्तु सौम्यस्निग्धैर्बलं विसृजति॥",
    "transliteration": "iha khalu saṁvatsaro ṣaḍṛtuko bhavati | ādānakālaḥ śītoṣṇarūkṣairbalamādatte, visargakālastu saumyasnigdhairbalaṁ visṛjati ||",
    "hindi_meaning": "वर्ष छह ऋतुओं में विभाजित है: आदान काल (शिशिर, वसन्त, ग्रीष्म) जिसमें सूर्य और वायु शरीर के बल का हरण करते हैं, तथा विसर्ग काल (वर्षा, शरद्, हेमन्त) जिसमें चन्द्रमा का सौम्य प्रभाव शरीर के बल और धातुओं की पुष्टि करता है। गर्भिणी को ऋतु के अनुसार आहार-विहार में परिमार्जन करना चाहिए।",
    "english_clinical_summary": "Charaka classifies the annual seasonal cycle into Adana Kala (northern solstice: Shishira, Vasanta, Grishma) characterized by dry, dehydrating solar energy reducing maternal vitality, and Visarga Kala (southern solstice: Varsha, Sharad, Hemanta) characterized by lunar, nourishing, moist energy replenishing Dhatus. Pregnancy care requires counteracting the seasonal Dosha vitiation through specific Ahara and Vihara.",
    "dc_dutta_correlation": "DC Dutta Ch. 9 & 10: Environmental seasonal impact on pregnancy: extreme summer heat increases dehydration, oligohydramnios, and preterm uterine irritability; monsoon conditions elevate risks of gastroenteritis, waterborne pathogens (hepatitis E, typhoid), and vector-borne infections (malaria, dengue); cold dry winters exacerbate maternal hypertension.",
    "samprapti_yukti": "In Grishma, Pitta and Vata accumulate; cooling Sheeta-Madhura-Drava Ahara prevents dehydration and preserves amniotic volume. In Varsha, Vata aggravates due to dampness; warm, easily digestible Deepana food protects Mandagni.",
    "red_flags": [
      "Heat stroke symptoms (hyperthermia, dizziness, oliguria in summer)",
      "Severe vomiting with high fever in monsoon (viral or bacterial gastroenteritis)",
      "Sudden surge in blood pressure during winter months"
    ],
    "related_questions": [
      "Adana Kala aur Visarga Kala ka garbhini ke sharir par kya prabhav padta hai?",
      "Grishma aur Varsha Ritu me pregnancy diet me kya badlaav karne chahiye?",
      "DC Dutta me maternal dehydration aur amniotic fluid level (AFI) par mausam ka kya asar hota hai?"
    ],
    "keywords": [
      "charaka",
      "ritucharya",
      "tasyashitiya",
      "adana kala",
      "visarga kala",
      "seasons",
      "weather"
    ],
    "sanskrit": "इह खलु संवत्सरो षडृतुको भवति। आदानकालः शीतोष्णरूक्षैर्बलमादत्ते, विसर्गकालस्तु सौम्यस्निग्धैर्बलं विसृजति॥",
    "iast": "iha khalu saṁvatsaro ṣaḍṛtuko bhavati | ādānakālaḥ śītoṣṇarūkṣairbalamādatte, visargakālastu saumyasnigdhairbalaṁ visṛjati ||",
    "hindi": "वर्ष छह ऋतुओं में विभाजित है: आदान काल (शिशिर, वसन्त, ग्रीष्म) जिसमें सूर्य और वायु शरीर के बल का हरण करते हैं, तथा विसर्ग काल (वर्षा, शरद्, हेमन्त) जिसमें चन्द्रमा का सौम्य प्रभाव शरीर के बल और धातुओं की पुष्टि करता है। गर्भिणी को ऋतु के अनुसार आहार-विहार में परिमार्जन करना चाहिए।",
    "english": "Charaka classifies the annual seasonal cycle into Adana Kala (northern solstice: Shishira, Vasanta, Grishma) characterized by dry, dehydrating solar energy reducing maternal vitality, and Visarga Kala (southern solstice: Varsha, Sharad, Hemanta) characterized by lunar, nourishing, moist energy replenishing Dhatus. Pregnancy care requires counteracting the seasonal Dosha vitiation through specific Ahara and Vihara.",
    "dc_dutta": "DC Dutta Ch. 9 & 10: Environmental seasonal impact on pregnancy: extreme summer heat increases dehydration, oligohydramnios, and preterm uterine irritability; monsoon conditions elevate risks of gastroenteritis, waterborne pathogens (hepatitis E, typhoid), and vector-borne infections (malaria, dengue); cold dry winters exacerbate maternal hypertension.",
    "tags": [
      "charaka",
      "ritucharya",
      "tasyashitiya",
      "adana kala",
      "visarga kala",
      "seasons",
      "weather"
    ],
    "plan": {}
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
    "month": null,
    "ritu": null,
    "title": "Charaka Samhita — Daily Dinacharya Foundations for Maternal Health",
    "citation": "Charaka Samhita, Sutra Sthana 5/1-10",
    "sanskrit_shloka": "मात्राशी स्यात्। आहाराग्निबलमपेक्षते। तस्मात् सम्यगुपयुञ्जीत मात्रया यथोचितम्। तैलमभ्यङ्गे, व्यायामः, स्नानं च बलवर्धनम्॥",
    "transliteration": "mātrāśī syāt | āhārāgnibalamapekṣate | tasmāt samyagupayuñjīta mātrayā yathocitam | tailamabhyaṅge, vyāyāmaḥ, snānaṁ ca balavardhanam ||",
    "hindi_meaning": "गर्भिणी और प्रत्येक व्यक्ति को अग्निबल के अनुसार उचित मात्रा में भोजन (मात्राशी) करना चाहिए। नित्य तैल अभ्यंग (शरीर पर तेल की मालिश), मृदु व्यायाम/टहलना, सुखोष्ण जल से स्नान और इन्द्रिय स्वच्छता शरीर में बल, कान्ति, वातशमन और उत्तम निद्रा प्रदान करती है।",
    "english_clinical_summary": "Charaka emphasizes that maternal diet and physical routine must strictly respect individual digestive capacity (Agni Bala). Essential daily regimen components: morning Abhyanga (gentle self-massage with Bala Taila/sesame oil avoiding abdominal compression), lukewarm bath (Snana), oral hygiene, and light walking (Chankramana) to pacify Vata, relieve muscle aches, promote restful sleep, and stabilize maternal energy.",
    "dc_dutta_correlation": "DC Dutta Ch. 9 (Antenatal Care): Recommends daily moderate exercise (walking 30 minutes daily), regular sleep hygiene (8 hours nightly plus 1-2 hours rest), comfortable non-restrictive cotton clothing, adequate personal hygiene, and balanced calorie intake (+350 kcal/day in 2nd/3rd trimester).",
    "samprapti_yukti": "Regular Abhyanga prevents Vata aggravation that normally occurs due to progressive uterine distension and ligamentous strain. Lukewarm bath cleanses Sweda Vaha Srotas and promotes circulation.",
    "red_flags": [
      "Severe exhaustion, dizziness or palpitations during walking",
      "Calf tenderness or swelling after exercise",
      "Inability to sleep due to severe orthopnea or paroxysmal nocturnal dyspnea"
    ],
    "related_questions": [
      "Garbhini ke daily Dinacharya me Abhyanga aur Snana ke kya niyam hain?",
      "Pregnancy me kitne ghante sona chahiye aur daytime sleep (Divaswapna) ke kya niyam hain?",
      "DC Dutta me pregnancy me exercise aur rest ke baare me kya guidelines di gayi hain?"
    ],
    "keywords": [
      "charaka",
      "dinacharya",
      "matrashitiya",
      "abhyanga",
      "snana",
      "agni",
      "maternal wellness"
    ],
    "sanskrit": "मात्राशी स्यात्। आहाराग्निबलमपेक्षते। तस्मात् सम्यगुपयुञ्जीत मात्रया यथोचितम्। तैलमभ्यङ्गे, व्यायामः, स्नानं च बलवर्धनम्॥",
    "iast": "mātrāśī syāt | āhārāgnibalamapekṣate | tasmāt samyagupayuñjīta mātrayā yathocitam | tailamabhyaṅge, vyāyāmaḥ, snānaṁ ca balavardhanam ||",
    "hindi": "गर्भिणी और प्रत्येक व्यक्ति को अग्निबल के अनुसार उचित मात्रा में भोजन (मात्राशी) करना चाहिए। नित्य तैल अभ्यंग (शरीर पर तेल की मालिश), मृदु व्यायाम/टहलना, सुखोष्ण जल से स्नान और इन्द्रिय स्वच्छता शरीर में बल, कान्ति, वातशमन और उत्तम निद्रा प्रदान करती है।",
    "english": "Charaka emphasizes that maternal diet and physical routine must strictly respect individual digestive capacity (Agni Bala). Essential daily regimen components: morning Abhyanga (gentle self-massage with Bala Taila/sesame oil avoiding abdominal compression), lukewarm bath (Snana), oral hygiene, and light walking (Chankramana) to pacify Vata, relieve muscle aches, promote restful sleep, and stabilize maternal energy.",
    "dc_dutta": "DC Dutta Ch. 9 (Antenatal Care): Recommends daily moderate exercise (walking 30 minutes daily), regular sleep hygiene (8 hours nightly plus 1-2 hours rest), comfortable non-restrictive cotton clothing, adequate personal hygiene, and balanced calorie intake (+350 kcal/day in 2nd/3rd trimester).",
    "tags": [
      "charaka",
      "dinacharya",
      "matrashitiya",
      "abhyanga",
      "snana",
      "agni",
      "maternal wellness"
    ],
    "plan": {}
  },
  {
    "month": null,
    "ritu": null,
    "samhita": "charaka",
    "stage": "garbhopaghatakara",
    "sanskrit": "तत्र खल्विमे गर्भोपघातकरा भावा भवन्ति — मातुश्चाहारविहारविपर्ययः",
    "iast": "tatra khalv ime garbhopaghātakarā bhāvā bhavanti — mātuś cāhāra-vihāra-viparyayaḥ",
    "hindi": "गर्भ को हानि पहुँचाने वाले भाव — माता के आहार-विहार का विपर्यय, अत्यधिक व्यायाम, शोक, भय, क्रोध आदि।",
    "english": "Ahara (Food) factors to avoid in pregnancy: Katu, Tikshna, Ushna, Atilavana — chilli, pickles, vinegar, very salty or very hot food; Ruksha, Guru, Abhishyandi & fermented foods; stale / packaged / street food (Paryushita); Viruddha Ahara — equal honey + ghee, milk + fish, fruit + milk combinations; Alcohol, tobacco, gutka; excess tea/coffee; raw papaya & large amounts of pineapple; Raw / half-cooked meat & eggs, unpasteurised dairy, raw sprouts (Listeria, Salmonella); Fasting (Upavasa) & prolonged hunger. Classical effects described: Garbhasrava / Garbhapata (abortion), Garbhashosha (IUGR), Upavishtaka (Vata-Pitta stasis), Vikrita-prajanana (congenital anomalies) and Kubja, Kuni, Pangu, Jada in Sushruta (Dauhrida vimanana). Modern correlates: miscarriage, IUGR, neural-tube defects, FAS, preterm labour.",
    "citation": "Ch. Sha. 4.18 (Garbhopaghatakara Bhavas); Su. Sha. 3 & 10 (Garbhini Apathya); A.H. Sha. 1–2",
    "dc_dutta": "Teratogens, lifestyle risks and drugs to avoid in pregnancy — DC Dutta, Drugs in Pregnancy / Antenatal Care.",
    "red_flags": [
      "Vaginal bleeding or brown spotting PV",
      "Severe headache with visual disturbance (photophobia)",
      "Sudden swelling of face and hands",
      "Marked reduction or absence of fetal movements"
    ],
    "tags": [
      "avoid",
      "apathya",
      "garbhopaghatakara",
      "harmful",
      "teratogen",
      "do not",
      "contraindicated",
      "ahara (food)"
    ],
    "plan": {
      "category": "Ahara (Food)",
      "items": [
        "Katu, Tikshna, Ushna, Atilavana — chilli, pickles, vinegar, very salty or very hot food",
        "Ruksha, Guru, Abhishyandi & fermented foods; stale / packaged / street food (Paryushita)",
        "Viruddha Ahara — equal honey + ghee, milk + fish, fruit + milk combinations",
        "Alcohol, tobacco, gutka; excess tea/coffee; raw papaya & large amounts of pineapple",
        "Raw / half-cooked meat & eggs, unpasteurised dairy, raw sprouts (Listeria, Salmonella)",
        "Fasting (Upavasa) & prolonged hunger"
      ]
    },
    "id": "bhava-0",
    "title": "Garbhopaghatakara Bhavas — Ahara (Food)",
    "domain": "garbhopaghatakara",
    "sanskrit_shloka": "तत्र खल्विमे गर्भोपघातकरा भावा भवन्ति — मातुश्चाहारविहारविपर्ययः",
    "transliteration": "tatra khalv ime garbhopaghātakarā bhāvā bhavanti — mātuś cāhāra-vihāra-viparyayaḥ",
    "hindi_meaning": "गर्भ को हानि पहुँचाने वाले भाव — माता के आहार-विहार का विपर्यय, अत्यधिक व्यायाम, शोक, भय, क्रोध आदि।",
    "english_clinical_summary": "Ahara (Food) factors to avoid in pregnancy: Katu, Tikshna, Ushna, Atilavana — chilli, pickles, vinegar, very salty or very hot food; Ruksha, Guru, Abhishyandi & fermented foods; stale / packaged / street food (Paryushita); Viruddha Ahara — equal honey + ghee, milk + fish, fruit + milk combinations; Alcohol, tobacco, gutka; excess tea/coffee; raw papaya & large amounts of pineapple; Raw / half-cooked meat & eggs, unpasteurised dairy, raw sprouts (Listeria, Salmonella); Fasting (Upavasa) & prolonged hunger. Classical effects described: Garbhasrava / Garbhapata (abortion), Garbhashosha (IUGR), Upavishtaka (Vata-Pitta stasis), Vikrita-prajanana (congenital anomalies) and Kubja, Kuni, Pangu, Jada in Sushruta (Dauhrida vimanana). Modern correlates: miscarriage, IUGR, neural-tube defects, FAS, preterm labour.",
    "dc_dutta_correlation": "Teratogens, lifestyle risks and drugs to avoid in pregnancy — DC Dutta, Drugs in Pregnancy / Antenatal Care.",
    "keywords": [
      "avoid",
      "apathya",
      "garbhopaghatakara",
      "harmful",
      "teratogen",
      "do not",
      "contraindicated",
      "ahara (food)"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Classical Samhitas me iska mukhya chikitsa sutra kya hai?",
      "DC Dutta Obstetrics me iska modern clinical protocol kya hai?",
      "Garbhini ko kab turant hospital review ke liye refer karein?"
    ]
  },
  {
    "month": null,
    "ritu": null,
    "samhita": "charaka",
    "stage": "garbhopaghatakara",
    "sanskrit": "तत्र खल्विमे गर्भोपघातकरा भावा भवन्ति — मातुश्चाहारविहारविपर्ययः",
    "iast": "tatra khalv ime garbhopaghātakarā bhāvā bhavanti — mātuś cāhāra-vihāra-viparyayaḥ",
    "hindi": "गर्भ को हानि पहुँचाने वाले भाव — माता के आहार-विहार का विपर्यय, अत्यधिक व्यायाम, शोक, भय, क्रोध आदि।",
    "english": "Vihara (Activity) factors to avoid in pregnancy: Ativyayama, heavy lifting, running, jumping and high-impact exercises; Divaswapna (excess), Ratri-jagarana (night vigil); Vega-dharana — suppressing urine, stool, flatus, sneeze, hunger, thirst; Excess Vyavaya (coitus) — avoid in 1st & last trimester or in high-risk pregnancy; Hot baths, sauna, long exposure to heat/fire, loud noise & vibration; Ativisham-sthana — uneven surfaces, steep stairs, climbing. Classical effects described: Garbhasrava / Garbhapata (abortion), Garbhashosha (IUGR), Upavishtaka (Vata-Pitta stasis), Vikrita-prajanana (congenital anomalies) and Kubja, Kuni, Pangu, Jada in Sushruta (Dauhrida vimanana). Modern correlates: miscarriage, IUGR, neural-tube defects, FAS, preterm labour.",
    "citation": "Ch. Sha. 4.18 (Garbhopaghatakara Bhavas); Su. Sha. 3 & 10 (Garbhini Apathya); A.H. Sha. 1–2",
    "dc_dutta": "Teratogens, lifestyle risks and drugs to avoid in pregnancy — DC Dutta, Drugs in Pregnancy / Antenatal Care.",
    "red_flags": [
      "Vaginal bleeding or brown spotting PV",
      "Severe headache with visual disturbance (photophobia)",
      "Sudden swelling of face and hands",
      "Marked reduction or absence of fetal movements"
    ],
    "tags": [
      "avoid",
      "apathya",
      "garbhopaghatakara",
      "harmful",
      "teratogen",
      "do not",
      "contraindicated",
      "vihara (activity)"
    ],
    "plan": {
      "category": "Vihara (Activity)",
      "items": [
        "Ativyayama, heavy lifting, running, jumping and high-impact exercises",
        "Divaswapna (excess), Ratri-jagarana (night vigil)",
        "Vega-dharana — suppressing urine, stool, flatus, sneeze, hunger, thirst",
        "Excess Vyavaya (coitus) — avoid in 1st & last trimester or in high-risk pregnancy",
        "Hot baths, sauna, long exposure to heat/fire, loud noise & vibration",
        "Ativisham-sthana — uneven surfaces, steep stairs, climbing"
      ]
    },
    "id": "bhava-1",
    "title": "Garbhopaghatakara Bhavas — Vihara (Activity)",
    "domain": "garbhopaghatakara",
    "sanskrit_shloka": "तत्र खल्विमे गर्भोपघातकरा भावा भवन्ति — मातुश्चाहारविहारविपर्ययः",
    "transliteration": "tatra khalv ime garbhopaghātakarā bhāvā bhavanti — mātuś cāhāra-vihāra-viparyayaḥ",
    "hindi_meaning": "गर्भ को हानि पहुँचाने वाले भाव — माता के आहार-विहार का विपर्यय, अत्यधिक व्यायाम, शोक, भय, क्रोध आदि।",
    "english_clinical_summary": "Vihara (Activity) factors to avoid in pregnancy: Ativyayama, heavy lifting, running, jumping and high-impact exercises; Divaswapna (excess), Ratri-jagarana (night vigil); Vega-dharana — suppressing urine, stool, flatus, sneeze, hunger, thirst; Excess Vyavaya (coitus) — avoid in 1st & last trimester or in high-risk pregnancy; Hot baths, sauna, long exposure to heat/fire, loud noise & vibration; Ativisham-sthana — uneven surfaces, steep stairs, climbing. Classical effects described: Garbhasrava / Garbhapata (abortion), Garbhashosha (IUGR), Upavishtaka (Vata-Pitta stasis), Vikrita-prajanana (congenital anomalies) and Kubja, Kuni, Pangu, Jada in Sushruta (Dauhrida vimanana). Modern correlates: miscarriage, IUGR, neural-tube defects, FAS, preterm labour.",
    "dc_dutta_correlation": "Teratogens, lifestyle risks and drugs to avoid in pregnancy — DC Dutta, Drugs in Pregnancy / Antenatal Care.",
    "keywords": [
      "avoid",
      "apathya",
      "garbhopaghatakara",
      "harmful",
      "teratogen",
      "do not",
      "contraindicated",
      "vihara (activity)"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Classical Samhitas me iska mukhya chikitsa sutra kya hai?",
      "DC Dutta Obstetrics me iska modern clinical protocol kya hai?",
      "Garbhini ko kab turant hospital review ke liye refer karein?"
    ]
  },
  {
    "month": null,
    "ritu": null,
    "samhita": "charaka",
    "stage": "garbhopaghatakara",
    "sanskrit": "तत्र खल्विमे गर्भोपघातकरा भावा भवन्ति — मातुश्चाहारविहारविपर्ययः",
    "iast": "tatra khalv ime garbhopaghātakarā bhāvā bhavanti — mātuś cāhāra-vihāra-viparyayaḥ",
    "hindi": "गर्भ को हानि पहुँचाने वाले भाव — माता के आहार-विहार का विपर्यय, अत्यधिक व्यायाम, शोक, भय, क्रोध आदि।",
    "english": "Sthana / Yana (Posture & Travel) factors to avoid in pregnancy: Utkatuka-asana (prolonged squatting) & Vishama-asana (uneven posture); Prolonged supine position after 20 weeks (Prishthato-shayana); Bumpy / long-distance travel by two-wheeler, bullock-cart or jerky vehicle (Yana-arohana); Standing for long hours, wearing high heels; Deep forward-bending, inverted yoga, Kapalabhati & Bhastrika. Classical effects described: Garbhasrava / Garbhapata (abortion), Garbhashosha (IUGR), Upavishtaka (Vata-Pitta stasis), Vikrita-prajanana (congenital anomalies) and Kubja, Kuni, Pangu, Jada in Sushruta (Dauhrida vimanana). Modern correlates: miscarriage, IUGR, neural-tube defects, FAS, preterm labour.",
    "citation": "Ch. Sha. 4.18 (Garbhopaghatakara Bhavas); Su. Sha. 3 & 10 (Garbhini Apathya); A.H. Sha. 1–2",
    "dc_dutta": "Teratogens, lifestyle risks and drugs to avoid in pregnancy — DC Dutta, Drugs in Pregnancy / Antenatal Care.",
    "red_flags": [
      "Vaginal bleeding or brown spotting PV",
      "Severe headache with visual disturbance (photophobia)",
      "Sudden swelling of face and hands",
      "Marked reduction or absence of fetal movements"
    ],
    "tags": [
      "avoid",
      "apathya",
      "garbhopaghatakara",
      "harmful",
      "teratogen",
      "do not",
      "contraindicated",
      "sthana / yana (posture & travel)"
    ],
    "plan": {
      "category": "Sthana / Yana (Posture & Travel)",
      "items": [
        "Utkatuka-asana (prolonged squatting) & Vishama-asana (uneven posture)",
        "Prolonged supine position after 20 weeks (Prishthato-shayana)",
        "Bumpy / long-distance travel by two-wheeler, bullock-cart or jerky vehicle (Yana-arohana)",
        "Standing for long hours, wearing high heels",
        "Deep forward-bending, inverted yoga, Kapalabhati & Bhastrika"
      ]
    },
    "id": "bhava-2",
    "title": "Garbhopaghatakara Bhavas — Sthana / Yana (Posture & Travel)",
    "domain": "garbhopaghatakara",
    "sanskrit_shloka": "तत्र खल्विमे गर्भोपघातकरा भावा भवन्ति — मातुश्चाहारविहारविपर्ययः",
    "transliteration": "tatra khalv ime garbhopaghātakarā bhāvā bhavanti — mātuś cāhāra-vihāra-viparyayaḥ",
    "hindi_meaning": "गर्भ को हानि पहुँचाने वाले भाव — माता के आहार-विहार का विपर्यय, अत्यधिक व्यायाम, शोक, भय, क्रोध आदि।",
    "english_clinical_summary": "Sthana / Yana (Posture & Travel) factors to avoid in pregnancy: Utkatuka-asana (prolonged squatting) & Vishama-asana (uneven posture); Prolonged supine position after 20 weeks (Prishthato-shayana); Bumpy / long-distance travel by two-wheeler, bullock-cart or jerky vehicle (Yana-arohana); Standing for long hours, wearing high heels; Deep forward-bending, inverted yoga, Kapalabhati & Bhastrika. Classical effects described: Garbhasrava / Garbhapata (abortion), Garbhashosha (IUGR), Upavishtaka (Vata-Pitta stasis), Vikrita-prajanana (congenital anomalies) and Kubja, Kuni, Pangu, Jada in Sushruta (Dauhrida vimanana). Modern correlates: miscarriage, IUGR, neural-tube defects, FAS, preterm labour.",
    "dc_dutta_correlation": "Teratogens, lifestyle risks and drugs to avoid in pregnancy — DC Dutta, Drugs in Pregnancy / Antenatal Care.",
    "keywords": [
      "avoid",
      "apathya",
      "garbhopaghatakara",
      "harmful",
      "teratogen",
      "do not",
      "contraindicated",
      "sthana / yana (posture & travel)"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Classical Samhitas me iska mukhya chikitsa sutra kya hai?",
      "DC Dutta Obstetrics me iska modern clinical protocol kya hai?",
      "Garbhini ko kab turant hospital review ke liye refer karein?"
    ]
  },
  {
    "month": null,
    "ritu": null,
    "samhita": "charaka",
    "stage": "garbhopaghatakara",
    "sanskrit": "तत्र खल्विमे गर्भोपघातकरा भावा भवन्ति — मातुश्चाहारविहारविपर्ययः",
    "iast": "tatra khalv ime garbhopaghātakarā bhāvā bhavanti — mātuś cāhāra-vihāra-viparyayaḥ",
    "hindi": "गर्भ को हानि पहुँचाने वाले भाव — माता के आहार-विहार का विपर्यय, अत्यधिक व्यायाम, शोक, भय, क्रोध आदि।",
    "english": "Manasika (Emotional) factors to avoid in pregnancy: Shoka (grief), Krodha (anger), Bhaya (fear), Udvega (anxiety), Irshya (envy); Horror/violent content, quarrels, loud abuse; Denial of Dauhrida — unwholesome denial of safe desires; Social isolation & sleep-deprivation. Classical effects described: Garbhasrava / Garbhapata (abortion), Garbhashosha (IUGR), Upavishtaka (Vata-Pitta stasis), Vikrita-prajanana (congenital anomalies) and Kubja, Kuni, Pangu, Jada in Sushruta (Dauhrida vimanana). Modern correlates: miscarriage, IUGR, neural-tube defects, FAS, preterm labour.",
    "citation": "Ch. Sha. 4.18 (Garbhopaghatakara Bhavas); Su. Sha. 3 & 10 (Garbhini Apathya); A.H. Sha. 1–2",
    "dc_dutta": "Teratogens, lifestyle risks and drugs to avoid in pregnancy — DC Dutta, Drugs in Pregnancy / Antenatal Care.",
    "red_flags": [
      "Vaginal bleeding or brown spotting PV",
      "Severe headache with visual disturbance (photophobia)",
      "Sudden swelling of face and hands",
      "Marked reduction or absence of fetal movements"
    ],
    "tags": [
      "avoid",
      "apathya",
      "garbhopaghatakara",
      "harmful",
      "teratogen",
      "do not",
      "contraindicated",
      "manasika (emotional)"
    ],
    "plan": {
      "category": "Manasika (Emotional)",
      "items": [
        "Shoka (grief), Krodha (anger), Bhaya (fear), Udvega (anxiety), Irshya (envy)",
        "Horror/violent content, quarrels, loud abuse",
        "Denial of Dauhrida — unwholesome denial of safe desires",
        "Social isolation & sleep-deprivation"
      ]
    },
    "id": "bhava-3",
    "title": "Garbhopaghatakara Bhavas — Manasika (Emotional)",
    "domain": "garbhopaghatakara",
    "sanskrit_shloka": "तत्र खल्विमे गर्भोपघातकरा भावा भवन्ति — मातुश्चाहारविहारविपर्ययः",
    "transliteration": "tatra khalv ime garbhopaghātakarā bhāvā bhavanti — mātuś cāhāra-vihāra-viparyayaḥ",
    "hindi_meaning": "गर्भ को हानि पहुँचाने वाले भाव — माता के आहार-विहार का विपर्यय, अत्यधिक व्यायाम, शोक, भय, क्रोध आदि।",
    "english_clinical_summary": "Manasika (Emotional) factors to avoid in pregnancy: Shoka (grief), Krodha (anger), Bhaya (fear), Udvega (anxiety), Irshya (envy); Horror/violent content, quarrels, loud abuse; Denial of Dauhrida — unwholesome denial of safe desires; Social isolation & sleep-deprivation. Classical effects described: Garbhasrava / Garbhapata (abortion), Garbhashosha (IUGR), Upavishtaka (Vata-Pitta stasis), Vikrita-prajanana (congenital anomalies) and Kubja, Kuni, Pangu, Jada in Sushruta (Dauhrida vimanana). Modern correlates: miscarriage, IUGR, neural-tube defects, FAS, preterm labour.",
    "dc_dutta_correlation": "Teratogens, lifestyle risks and drugs to avoid in pregnancy — DC Dutta, Drugs in Pregnancy / Antenatal Care.",
    "keywords": [
      "avoid",
      "apathya",
      "garbhopaghatakara",
      "harmful",
      "teratogen",
      "do not",
      "contraindicated",
      "manasika (emotional)"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Classical Samhitas me iska mukhya chikitsa sutra kya hai?",
      "DC Dutta Obstetrics me iska modern clinical protocol kya hai?",
      "Garbhini ko kab turant hospital review ke liye refer karein?"
    ]
  },
  {
    "month": null,
    "ritu": null,
    "samhita": "charaka",
    "stage": "garbhopaghatakara",
    "sanskrit": "तत्र खल्विमे गर्भोपघातकरा भावा भवन्ति — मातुश्चाहारविहारविपर्ययः",
    "iast": "tatra khalv ime garbhopaghātakarā bhāvā bhavanti — mātuś cāhāra-vihāra-viparyayaḥ",
    "hindi": "गर्भ को हानि पहुँचाने वाले भाव — माता के आहार-विहार का विपर्यय, अत्यधिक व्यायाम, शोक, भय, क्रोध आदि।",
    "english": "Chikitsa (Medical / Procedures) factors to avoid in pregnancy: Self-medication, strong purgatives (Tikshna Virechana), emetics, Raktamokshana; Garbhapatakara herbs: Danti, Dravanti, Jayapala (croton), Kalihari, Kumari-latex, Hingu in excess; Unsupervised herbal or Bhasma supplements, Vamana/Virechana/Nasya in pregnancy; X-rays/radiation without need; live vaccines (MMR, varicella); teratogenic drugs (isotretinoin, warfarin, ACE-inhibitors, valproate); Unsupervised Basti, Pichu or Uttara-basti. Classical effects described: Garbhasrava / Garbhapata (abortion), Garbhashosha (IUGR), Upavishtaka (Vata-Pitta stasis), Vikrita-prajanana (congenital anomalies) and Kubja, Kuni, Pangu, Jada in Sushruta (Dauhrida vimanana). Modern correlates: miscarriage, IUGR, neural-tube defects, FAS, preterm labour.",
    "citation": "Ch. Sha. 4.18 (Garbhopaghatakara Bhavas); Su. Sha. 3 & 10 (Garbhini Apathya); A.H. Sha. 1–2",
    "dc_dutta": "Teratogens, lifestyle risks and drugs to avoid in pregnancy — DC Dutta, Drugs in Pregnancy / Antenatal Care.",
    "red_flags": [
      "Vaginal bleeding or brown spotting PV",
      "Severe headache with visual disturbance (photophobia)",
      "Sudden swelling of face and hands",
      "Marked reduction or absence of fetal movements"
    ],
    "tags": [
      "avoid",
      "apathya",
      "garbhopaghatakara",
      "harmful",
      "teratogen",
      "do not",
      "contraindicated",
      "chikitsa (medical / procedures)"
    ],
    "plan": {
      "category": "Chikitsa (Medical / Procedures)",
      "items": [
        "Self-medication, strong purgatives (Tikshna Virechana), emetics, Raktamokshana",
        "Garbhapatakara herbs: Danti, Dravanti, Jayapala (croton), Kalihari, Kumari-latex, Hingu in excess",
        "Unsupervised herbal or Bhasma supplements, Vamana/Virechana/Nasya in pregnancy",
        "X-rays/radiation without need; live vaccines (MMR, varicella); teratogenic drugs (isotretinoin, warfarin, ACE-inhibitors, valproate)",
        "Unsupervised Basti, Pichu or Uttara-basti"
      ]
    },
    "id": "bhava-4",
    "title": "Garbhopaghatakara Bhavas — Chikitsa (Medical / Procedures)",
    "domain": "garbhopaghatakara",
    "sanskrit_shloka": "तत्र खल्विमे गर्भोपघातकरा भावा भवन्ति — मातुश्चाहारविहारविपर्ययः",
    "transliteration": "tatra khalv ime garbhopaghātakarā bhāvā bhavanti — mātuś cāhāra-vihāra-viparyayaḥ",
    "hindi_meaning": "गर्भ को हानि पहुँचाने वाले भाव — माता के आहार-विहार का विपर्यय, अत्यधिक व्यायाम, शोक, भय, क्रोध आदि।",
    "english_clinical_summary": "Chikitsa (Medical / Procedures) factors to avoid in pregnancy: Self-medication, strong purgatives (Tikshna Virechana), emetics, Raktamokshana; Garbhapatakara herbs: Danti, Dravanti, Jayapala (croton), Kalihari, Kumari-latex, Hingu in excess; Unsupervised herbal or Bhasma supplements, Vamana/Virechana/Nasya in pregnancy; X-rays/radiation without need; live vaccines (MMR, varicella); teratogenic drugs (isotretinoin, warfarin, ACE-inhibitors, valproate); Unsupervised Basti, Pichu or Uttara-basti. Classical effects described: Garbhasrava / Garbhapata (abortion), Garbhashosha (IUGR), Upavishtaka (Vata-Pitta stasis), Vikrita-prajanana (congenital anomalies) and Kubja, Kuni, Pangu, Jada in Sushruta (Dauhrida vimanana). Modern correlates: miscarriage, IUGR, neural-tube defects, FAS, preterm labour.",
    "dc_dutta_correlation": "Teratogens, lifestyle risks and drugs to avoid in pregnancy — DC Dutta, Drugs in Pregnancy / Antenatal Care.",
    "keywords": [
      "avoid",
      "apathya",
      "garbhopaghatakara",
      "harmful",
      "teratogen",
      "do not",
      "contraindicated",
      "chikitsa (medical / procedures)"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Classical Samhitas me iska mukhya chikitsa sutra kya hai?",
      "DC Dutta Obstetrics me iska modern clinical protocol kya hai?",
      "Garbhini ko kab turant hospital review ke liye refer karein?"
    ]
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
    "month": null,
    "ritu": null,
    "title": "Charaka Samhita — Non-Suppression of Natural Urges (Adharaniya Vegas)",
    "citation": "Charaka Samhita, Sharira Sthana 8/21 & Sutra Sthana 7/3-5",
    "sanskrit_shloka": "न वेगान् धारयेद्धीमांस्तान् हि धारयतः पृथक्। दोषाः प्रकुपिताः कुर्युर्विकारान् विविधान् बहून्॥ गर्भिण्या विशेषतो वेगधारणं गर्भोपघातकरम्।",
    "transliteration": "na vegān dhārayeddhīmāṁstān hi dhārayataḥ pṛthak | doṣāḥ prakupitāḥ kuryurvikārān vividhān bahūn || garbhiṇyā viśeṣato vegadhāraṇaṁ garbhopaghātakaram |",
    "hindi_meaning": "बुद्धिमान व्यक्ति को 13 अधारणीय वेगों (मल, मूत्र, अपानवायु, छर्दि, क्षुधा, तृष्णा, निद्रा आदि) को कभी नहीं रोकना चाहिए। गर्भिणी द्वारा वेगों को धारण करने से अपान और प्राण वायु प्रकुपित होकर गर्भाशय में शूल, आक्षेप, गर्भास्राव या गर्भपात उत्पन्न कर सकते हैं।",
    "english_clinical_summary": "Charaka strongly condemns suppressing the thirteen natural biological urges (Adharaniya Vegas) including micturition, defecation, flatus, hunger, thirst, sleep, and vomiting. In pregnancy, voluntary suppression of urges is explicitly categorized as Garbhopaghatakara (harmful to pregnancy): holding urine or stool provokes Apana Vata, which moves upward (Udvrita), leading to pelvic pain, tenesmus, uterine irritability, and even threatened abortion.",
    "dc_dutta_correlation": "DC Dutta Ch. 18 & 21: Voluntary urinary retention in pregnancy exacerbates urinary stasis caused by progesterone-mediated ureteral dilation, predisposing to acute pyelonephritis and asymptomatic bacteriuria. Severe constipation and chronic straining elevate intra-abdominal pressure and can induce premature contractions.",
    "samprapti_yukti": "Apana Vata natural direction is Adhogati. Suppressing Mutra or Purisha causes Pratiloma Vata, transmitting retrograde hydrostatic stress to the uterine walls.",
    "red_flags": [
      "Severe dysuria with high fever, chills, and flank pain (Acute Pyelonephritis)",
      "Inability to pass flatus or stool with abdominal distension (Intestinal Obstruction)",
      "Severe uterine cramping following bouts of constipation"
    ],
    "related_questions": [
      "Garbhini dwara veg dharan karne se konse garbhopaghatakara upadrava hote hain?",
      "Pregnancy me urinary retention se UTI aur preterm labor ka kya relation hai?",
      "DC Dutta me asymptomatic bacteriuria screening kyu mandatory hai?"
    ],
    "keywords": [
      "charaka",
      "adharaniya vega",
      "urges",
      "retention",
      "apana vata",
      "garbhopaghatakara"
    ],
    "sanskrit": "न वेगान् धारयेद्धीमांस्तान् हि धारयतः पृथक्। दोषाः प्रकुपिताः कुर्युर्विकारान् विविधान् बहून्॥ गर्भिण्या विशेषतो वेगधारणं गर्भोपघातकरम्।",
    "iast": "na vegān dhārayeddhīmāṁstān hi dhārayataḥ pṛthak | doṣāḥ prakupitāḥ kuryurvikārān vividhān bahūn || garbhiṇyā viśeṣato vegadhāraṇaṁ garbhopaghātakaram |",
    "hindi": "बुद्धिमान व्यक्ति को 13 अधारणीय वेगों (मल, मूत्र, अपानवायु, छर्दि, क्षुधा, तृष्णा, निद्रा आदि) को कभी नहीं रोकना चाहिए। गर्भिणी द्वारा वेगों को धारण करने से अपान और प्राण वायु प्रकुपित होकर गर्भाशय में शूल, आक्षेप, गर्भास्राव या गर्भपात उत्पन्न कर सकते हैं।",
    "english": "Charaka strongly condemns suppressing the thirteen natural biological urges (Adharaniya Vegas) including micturition, defecation, flatus, hunger, thirst, sleep, and vomiting. In pregnancy, voluntary suppression of urges is explicitly categorized as Garbhopaghatakara (harmful to pregnancy): holding urine or stool provokes Apana Vata, which moves upward (Udvrita), leading to pelvic pain, tenesmus, uterine irritability, and even threatened abortion.",
    "dc_dutta": "DC Dutta Ch. 18 & 21: Voluntary urinary retention in pregnancy exacerbates urinary stasis caused by progesterone-mediated ureteral dilation, predisposing to acute pyelonephritis and asymptomatic bacteriuria. Severe constipation and chronic straining elevate intra-abdominal pressure and can induce premature contractions.",
    "tags": [
      "charaka",
      "adharaniya vega",
      "urges",
      "retention",
      "apana vata",
      "garbhopaghatakara"
    ],
    "plan": {}
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
    "month": null,
    "ritu": null,
    "title": "Sushruta Samhita — Mudha Garbha Nidana (Obstructed Labor & Malpresentations)",
    "citation": "Sushruta Samhita, Nidana Sthana 8/1-12",
    "sanskrit_shloka": "यदा तु गर्भो वायुना प्रतिहतगतिः तिर्यक् सङ्गतो वा विवृत्तशिरा वा द्वारं रुणद्धि, स मूढगर्भ इत्युच्यते। कीलकः प्रतिखुरो बीजः परिघश्चेति चतुर्विधः॥",
    "transliteration": "yadā tu garbho vāyunā pratihatagatiḥ tiryak saṅgato vā vivṛttaśirā vā dvāraṁ ruṇaddhi, sa mūḍhagarbha ityucyate | kīlakaḥ pratikhuro bījaḥ parighaśceti caturvidhaḥ ||",
    "hindi_meaning": "जब प्रकुपित अपान वायु के कारण गर्भ की स्वाभाविक अधोगति अवरुद्ध हो जाती है और वह तिरछा, उल्टे सिर या हाथ-पैर फैलाकर गर्भाशय मुख को अवरुद्ध कर देता है, तो उसे 'मूढगर्भ' (obstructed labor / dystocia) कहते हैं। इसके मुख्य प्रकार हैं: कीलक, प्रतिखुर, बीज और परिघ।",
    "english_clinical_summary": "Sushruta's foundational treatise on obstetric dystocia: When Apana Vata becomes pathologically deranged or mechanical cephalopelvic disproportion (CPD) exists, the fetal axis becomes deflected into abnormal presentations (transverse lie, brow, shoulder presentation, compound presentation). He classifies the four classical presentations of Mudha Garbha: Kilaka (impacted longitudinal presentation), Pratikhura (compound presentation with hands and feet prolapsing), Bija (transverse shoulder presentation), and Parigha (transverse lie obstructing pelvic inlet like a crossbar).",
    "dc_dutta_correlation": "DC Dutta Ch. 24 & 25 (Malposition, Malpresentation & Obstructed Labor): Transverse lie, breech presentation, shoulder dystocia, and cephalopelvic disproportion. Maternal exhaustion, uterine rupture risk (Bandl's retraction ring), and fetal hypoxia mandate immediate emergency operative delivery (Cesarean section).",
    "samprapti_yukti": "Deranged Apana Vata causes dyssynergic uterine contractions, preventing normal cervical dilatation and head flexion.",
    "red_flags": [
      "Pathological retraction ring of Bandl visible on maternal abdomen",
      "Fetal bradycardia (<110 bpm) or variable/late decelerations",
      "Maternal dehydration, rising pulse >110 bpm, and tender lower uterine segment"
    ],
    "related_questions": [
      "Sushruta ne Mudha Garbha ke konse 4 mukhya prakar bataye hain?",
      "Obstructed labor me Bandl's ring aur uterine rupture ke kya sanket hote hain?",
      "DC Dutta ke anusaar shoulder dystocia aur cephalopelvic disproportion ka modern management kya hai?"
    ],
    "keywords": [
      "sushruta",
      "mudha garbha",
      "dystocia",
      "malpresentation",
      "obstructed labor",
      "bandl ring",
      "cesarean"
    ],
    "sanskrit": "यदा तु गर्भो वायुना प्रतिहतगतिः तिर्यक् सङ्गतो वा विवृत्तशिरा वा द्वारं रुणद्धि, स मूढगर्भ इत्युच्यते। कीलकः प्रतिखुरो बीजः परिघश्चेति चतुर्विधः॥",
    "iast": "yadā tu garbho vāyunā pratihatagatiḥ tiryak saṅgato vā vivṛttaśirā vā dvāraṁ ruṇaddhi, sa mūḍhagarbha ityucyate | kīlakaḥ pratikhuro bījaḥ parighaśceti caturvidhaḥ ||",
    "hindi": "जब प्रकुपित अपान वायु के कारण गर्भ की स्वाभाविक अधोगति अवरुद्ध हो जाती है और वह तिरछा, उल्टे सिर या हाथ-पैर फैलाकर गर्भाशय मुख को अवरुद्ध कर देता है, तो उसे 'मूढगर्भ' (obstructed labor / dystocia) कहते हैं। इसके मुख्य प्रकार हैं: कीलक, प्रतिखुर, बीज और परिघ।",
    "english": "Sushruta's foundational treatise on obstetric dystocia: When Apana Vata becomes pathologically deranged or mechanical cephalopelvic disproportion (CPD) exists, the fetal axis becomes deflected into abnormal presentations (transverse lie, brow, shoulder presentation, compound presentation). He classifies the four classical presentations of Mudha Garbha: Kilaka (impacted longitudinal presentation), Pratikhura (compound presentation with hands and feet prolapsing), Bija (transverse shoulder presentation), and Parigha (transverse lie obstructing pelvic inlet like a crossbar).",
    "dc_dutta": "DC Dutta Ch. 24 & 25 (Malposition, Malpresentation & Obstructed Labor): Transverse lie, breech presentation, shoulder dystocia, and cephalopelvic disproportion. Maternal exhaustion, uterine rupture risk (Bandl's retraction ring), and fetal hypoxia mandate immediate emergency operative delivery (Cesarean section).",
    "tags": [
      "sushruta",
      "mudha garbha",
      "dystocia",
      "malpresentation",
      "obstructed labor",
      "bandl ring",
      "cesarean"
    ],
    "plan": {}
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
    "month": null,
    "ritu": null,
    "title": "Charaka Samhita — Sutika Paricharya (Puerperal Rejuvenation Protocol)",
    "citation": "Charaka Samhita, Sharira Sthana 8/48-49",
    "sanskrit_shloka": "प्रजातायाश्च गर्भाशये विशुद्धे स्नेहमिश्रामौषधियुक्तां यवागूं पाययेत्। उदरवेष्टनं च कुर्याद् वस्त्रेण, वातप्रशमनाय गर्भाशयसंकोचनाय च॥",
    "transliteration": "prajātāyāśca garbhāśaye viśuddhe snehamiśrāmauṣadhiyuktāṁ yavāgūṁ pāyayet | udaraveṣṭanaṁ ca kuryād vastreṇa, vātapraśamanāya garbhāśayasaṁkocanāya ca ||",
    "hindi_meaning": "प्रसव के उपरांत जब अपरा निर्गमन से गर्भाशय विशुद्ध हो जाए, तब सूतिका को बला तैल से अभ्यंग एवं उष्णोदक परिषेक कराएं। अग्निदीपन हेतु पिप्पल्यादि या पञ्चकोल चूर्ण से सिद्ध स्नेहमिश्रित यवागू (पतला दलिया/सूप) पिलाएं। शिथिल उदर में वायु के अवकाश को रोकने तथा गर्भाशय के संकोच (involution) हेतु उदर को स्वच्छ सूती वस्त्र से लपेटें (उदरवेष्टन)।",
    "english_clinical_summary": "Following expulsion of the placenta (Apara), maternal Dhatus are deeply depleted (Dhatu-Rikta) and Vata is severely provoked in the evacuated uterine cavity. Charaka prescribes warm medicated oil Abhyanga, Parisheka with warm decoctions, digestive Yavagu medicated with Panchakola or Pippalyadi Churna to rekindle Jatharagni, and Udaraveshtana (firm abdominal wrapping with clean cotton cloth) to prevent Vata accumulation and expedite physiological uterine involution.",
    "dc_dutta_correlation": "DC Dutta Ch. 13 (The Normal Puerperium): Puerperium encompasses the 6 weeks following delivery during which the reproductive organs revert back to their non-pregnant state. Uterine involution progresses at ~1.25 cm daily; uterine tone is crucial to prevent postpartum hemorrhage (PPH); abdominal wall laxity benefits from non-constricting support and gradual pelvic floor rehabilitation.",
    "samprapti_yukti": "The empty pelvic cavity creates Rikta Srotas where Vata instantly accumulates. Snehapana and Panchakola Yavagu rekindle Agni, digest Ama, and soothe Vata, preventing Sutika Jwara and Shoola.",
    "red_flags": [
      "Excessive bleeding soaking >1 pad an hour (Postpartum Hemorrhage - PPH)",
      "Foul-smelling lochia accompanied by maternal fever >100.4°F (Puerperal Sepsis)",
      "Calf pain, unilateral leg swelling and warmth (Deep Vein Thrombosis - DVT)"
    ],
    "related_questions": [
      "Sutika paricharya me Panchakola Yavagu aur Udaraveshtana kab karein?",
      "Delivery ke baad pehle 7 din me ahar aur snehana ka kya kram hona chahiye?",
      "DC Dutta ke mutabik puerperal sepsis aur PPH ke early warning signs kya hain?"
    ],
    "keywords": [
      "charaka",
      "sutika",
      "puerperium",
      "udaraveshtana",
      "panchakola",
      "yavagu",
      "involution",
      "jatisutriya"
    ],
    "sanskrit": "प्रजातायाश्च गर्भाशये विशुद्धे स्नेहमिश्रामौषधियुक्तां यवागूं पाययेत्। उदरवेष्टनं च कुर्याद् वस्त्रेण, वातप्रशमनाय गर्भाशयसंकोचनाय च॥",
    "iast": "prajātāyāśca garbhāśaye viśuddhe snehamiśrāmauṣadhiyuktāṁ yavāgūṁ pāyayet | udaraveṣṭanaṁ ca kuryād vastreṇa, vātapraśamanāya garbhāśayasaṁkocanāya ca ||",
    "hindi": "प्रसव के उपरांत जब अपरा निर्गमन से गर्भाशय विशुद्ध हो जाए, तब सूतिका को बला तैल से अभ्यंग एवं उष्णोदक परिषेक कराएं। अग्निदीपन हेतु पिप्पल्यादि या पञ्चकोल चूर्ण से सिद्ध स्नेहमिश्रित यवागू (पतला दलिया/सूप) पिलाएं। शिथिल उदर में वायु के अवकाश को रोकने तथा गर्भाशय के संकोच (involution) हेतु उदर को स्वच्छ सूती वस्त्र से लपेटें (उदरवेष्टन)।",
    "english": "Following expulsion of the placenta (Apara), maternal Dhatus are deeply depleted (Dhatu-Rikta) and Vata is severely provoked in the evacuated uterine cavity. Charaka prescribes warm medicated oil Abhyanga, Parisheka with warm decoctions, digestive Yavagu medicated with Panchakola or Pippalyadi Churna to rekindle Jatharagni, and Udaraveshtana (firm abdominal wrapping with clean cotton cloth) to prevent Vata accumulation and expedite physiological uterine involution.",
    "dc_dutta": "DC Dutta Ch. 13 (The Normal Puerperium): Puerperium encompasses the 6 weeks following delivery during which the reproductive organs revert back to their non-pregnant state. Uterine involution progresses at ~1.25 cm daily; uterine tone is crucial to prevent postpartum hemorrhage (PPH); abdominal wall laxity benefits from non-constricting support and gradual pelvic floor rehabilitation.",
    "tags": [
      "charaka",
      "sutika",
      "puerperium",
      "udaraveshtana",
      "panchakola",
      "yavagu",
      "involution",
      "jatisutriya"
    ],
    "plan": {}
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
    "month": null,
    "ritu": null,
    "title": "Sushruta Samhita — Puerperal Mastitis & Stanavidradhi (Breast Abscess)",
    "citation": "Sushruta Samhita, Chikitsa Sthana 17/1-14",
    "sanskrit_shloka": "क्षीरदोषात् स्तने गाढे दुष्टे रक्तेऽनिलान्विते। जायते स्तनकीलस्तु विद्रधिर्वा भवेत्ततः। पक्वे पाटनमेवेष्टं स्तनसंरक्षणं यथा॥",
    "transliteration": "kṣīradoṣāt stane gāḍhe duṣṭe rakte'nilānvite | jāyate stanakīlastu vidradhirvā bhavettataḥ | pakve pāṭanameveṣṭaṁ stanasaṁrakṣaṇaṁ yathā ||",
    "hindi_meaning": "स्तन में दूध का जमाव (milk stasis) होने तथा दूषित रक्त व वायु के प्रकुपित होने से स्तनकील (breast engorgement) और बाद में स्तनाविवद्रधि (breast abscess) उत्पन्न होती है। पक्व अवस्था में स्तन नलिकाओं (lactiferous ducts) की सुरक्षा करते हुए अरीय चीरा (radial incision) लगाकर पूय (pus) निकालना आवश्यक है।",
    "english_clinical_summary": "Sushruta documents the surgical pathology of puerperal breast diseases: milk engorgement (Stanakila) progressing to acute mastitis and deep breast abscess (Stanavidradhi). He establishes the fundamental surgical maxim that any incision on the lactating breast must be strictly radial (Arīya Chhedana), following the natural trajectory of lactiferous ducts to avoid ductal transection, milk fistulae, and glandular necrosis.",
    "dc_dutta_correlation": "DC Dutta Ch. 29 (Puerperal Disorders — Breast Complications): Acute mastitis (usually Staphylococcus aureus from neonatal nasopharynx) starts with engorgement and cracked nipple; if untreated within 48 hours, it forms a fluctuant breast abscess requiring ultrasound-guided aspiration or surgical drainage via radial incision under general anesthesia.",
    "samprapti_yukti": "Stanyarodha (milk stasis) causes Rakta and Pitta vitiation. Continued breastfeeding or expression from the unaffected breast prevents bilateral engorgement.",
    "red_flags": [
      "Fluctuant, extremely tender, erythematous breast mass with high spiking fever (>102°F) and rigors",
      "Purulent drainage from nipple",
      "Cracked bleeding nipples with severe agony during infant latching"
    ],
    "related_questions": [
      "Sushruta ke anusaar Stanavidradhi me incision lagane ka kya niyam hai?",
      "Puerperal mastitis aur breast abscess me breast feeding continue karni chahiye ya nahi?",
      "DC Dutta me breast engorgement aur cracked nipple ka first-line treatment kya hai?"
    ],
    "keywords": [
      "sushruta",
      "stanaroga",
      "mastitis",
      "breast abscess",
      "lactation",
      "engorgement",
      "incision"
    ],
    "sanskrit": "क्षीरदोषात् स्तने गाढे दुष्टे रक्तेऽनिलान्विते। जायते स्तनकीलस्तु विद्रधिर्वा भवेत्ततः। पक्वे पाटनमेवेष्टं स्तनसंरक्षणं यथा॥",
    "iast": "kṣīradoṣāt stane gāḍhe duṣṭe rakte'nilānvite | jāyate stanakīlastu vidradhirvā bhavettataḥ | pakve pāṭanameveṣṭaṁ stanasaṁrakṣaṇaṁ yathā ||",
    "hindi": "स्तन में दूध का जमाव (milk stasis) होने तथा दूषित रक्त व वायु के प्रकुपित होने से स्तनकील (breast engorgement) और बाद में स्तनाविवद्रधि (breast abscess) उत्पन्न होती है। पक्व अवस्था में स्तन नलिकाओं (lactiferous ducts) की सुरक्षा करते हुए अरीय चीरा (radial incision) लगाकर पूय (pus) निकालना आवश्यक है।",
    "english": "Sushruta documents the surgical pathology of puerperal breast diseases: milk engorgement (Stanakila) progressing to acute mastitis and deep breast abscess (Stanavidradhi). He establishes the fundamental surgical maxim that any incision on the lactating breast must be strictly radial (Arīya Chhedana), following the natural trajectory of lactiferous ducts to avoid ductal transection, milk fistulae, and glandular necrosis.",
    "dc_dutta": "DC Dutta Ch. 29 (Puerperal Disorders — Breast Complications): Acute mastitis (usually Staphylococcus aureus from neonatal nasopharynx) starts with engorgement and cracked nipple; if untreated within 48 hours, it forms a fluctuant breast abscess requiring ultrasound-guided aspiration or surgical drainage via radial incision under general anesthesia.",
    "tags": [
      "sushruta",
      "stanaroga",
      "mastitis",
      "breast abscess",
      "lactation",
      "engorgement",
      "incision"
    ],
    "plan": {}
  },
  {
    "month": null,
    "ritu": null,
    "samhita": "charaka",
    "stage": "sutika",
    "sanskrit": "प्रसूतां स्नेहं पाययेत् पिप्पलीपिप्पलीमूलचव्यचित्रकशुण्ठीभिः",
    "iast": "prasūtāṃ snehaṃ pāyayet pippalī-pippalīmūla-cavya-citraka-śuṇṭhībhiḥ",
    "hindi": "प्रसव के बाद पिप्पली, पिप्पलीमूल, चव्य, चित्रक, शुण्ठी से सिद्ध स्नेह (घृत/तैल) का सेवन कराएँ।",
    "english": "After delivery give Sneha (ghee/oil) processed with Panchakola (Pippali, Pippalimula, Chavya, Chitraka, Shunthi) to restore Agni and Vata. Dose: 15–30 ml warm ghee/Taila with Panchakola on day 1–3; continued as Snehapana/Yavagu under physician for 3–7 days.",
    "citation": "Ch. Sha. 8.50–51; Su. Chi. 18 ; A.H. Sha. 1 (Sutika)",
    "dc_dutta": "Puerperium & Lactation (6 weeks): Puerperium = from delivery of placenta to 6 weeks. Uterine involution (fundus descends ~1 cm/day; non-palpable per abdomen by day 10–14), lochia: rubra (days 1–4) → serosa (5–9) → alba (10–15+). Exclusive breastfeeding for 6 months, initiate within 1 hour; extra 500 kcal/day; iron + folic acid 100 days post-partum, calcium 500 mg BD for 6 months. Postnatal visits: within 24 h, day 3, day 7, week 6; LAM and contraception counselling; postnatal exercises (Kegel, pelvic tilt).",
    "red_flags": [
      "Postpartum haemorrhage — soaking >1 pad/hr, clots, dizziness",
      "Fever >38 °C, foul lochia, lower-abdominal pain (puerperal sepsis)",
      "Breast engorgement/mastitis, cracked nipples, breast abscess",
      "Calf pain or swelling, breathlessness (DVT / PE)",
      "Severe headache / BP rise (postpartum eclampsia)",
      "Persistent low mood, anxiety, thoughts of self-harm (postpartum depression)",
      "C-section wound redness, discharge, dehiscence"
    ],
    "tags": [
      "sutika",
      "postnatal",
      "postpartum",
      "puerperium",
      "45 days",
      "lactation",
      "stanyajanana",
      "snehapana",
      "abhyanga",
      "udaraveshtana"
    ],
    "plan": {},
    "id": "sut-0",
    "title": "Sutika Paricharya — Snehapana (Internal oleation)",
    "domain": "sutika",
    "sanskrit_shloka": "प्रसूतां स्नेहं पाययेत् पिप्पलीपिप्पलीमूलचव्यचित्रकशुण्ठीभिः",
    "transliteration": "prasūtāṃ snehaṃ pāyayet pippalī-pippalīmūla-cavya-citraka-śuṇṭhībhiḥ",
    "hindi_meaning": "प्रसव के बाद पिप्पली, पिप्पलीमूल, चव्य, चित्रक, शुण्ठी से सिद्ध स्नेह (घृत/तैल) का सेवन कराएँ।",
    "english_clinical_summary": "After delivery give Sneha (ghee/oil) processed with Panchakola (Pippali, Pippalimula, Chavya, Chitraka, Shunthi) to restore Agni and Vata. Dose: 15–30 ml warm ghee/Taila with Panchakola on day 1–3; continued as Snehapana/Yavagu under physician for 3–7 days.",
    "dc_dutta_correlation": "Puerperium & Lactation (6 weeks): Puerperium = from delivery of placenta to 6 weeks. Uterine involution (fundus descends ~1 cm/day; non-palpable per abdomen by day 10–14), lochia: rubra (days 1–4) → serosa (5–9) → alba (10–15+). Exclusive breastfeeding for 6 months, initiate within 1 hour; extra 500 kcal/day; iron + folic acid 100 days post-partum, calcium 500 mg BD for 6 months. Postnatal visits: within 24 h, day 3, day 7, week 6; LAM and contraception counselling; postnatal exercises (Kegel, pelvic tilt).",
    "keywords": [
      "sutika",
      "postnatal",
      "postpartum",
      "puerperium",
      "45 days",
      "lactation",
      "stanyajanana",
      "snehapana",
      "abhyanga",
      "udaraveshtana"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Classical Samhitas me iska mukhya chikitsa sutra kya hai?",
      "DC Dutta Obstetrics me iska modern clinical protocol kya hai?",
      "Garbhini ko kab turant hospital review ke liye refer karein?"
    ]
  },
  {
    "month": null,
    "ritu": null,
    "samhita": "sushruta",
    "stage": "sutika",
    "sanskrit": "पिप्पल्यादिगणसिद्धा यवागूः क्षुधिताय प्रदेया",
    "iast": "pippalyādigaṇasiddhā yavāgūḥ kṣudhitāya pradeyā",
    "hindi": "भूख लगने पर पिप्पल्यादि गण से सिद्ध यवागू दें।",
    "english": "Pippalyadi Yavagu (spiced rice gruel with Panchakola and ghee) kindles Agni and prepares for gradual diet. Warm Yavagu: rice + water + Pippali, Shunthi, Maricha pinch + ghee. Day 1–3 (light diet), then Ahara-krama.",
    "citation": "Sushruta Samhita, Sharira Sthana 10/16",
    "dc_dutta": "Puerperium & Lactation (6 weeks): Puerperium = from delivery of placenta to 6 weeks. Uterine involution (fundus descends ~1 cm/day; non-palpable per abdomen by day 10–14), lochia: rubra (days 1–4) → serosa (5–9) → alba (10–15+). Exclusive breastfeeding for 6 months, initiate within 1 hour; extra 500 kcal/day; iron + folic acid 100 days post-partum, calcium 500 mg BD for 6 months. Postnatal visits: within 24 h, day 3, day 7, week 6; LAM and contraception counselling; postnatal exercises (Kegel, pelvic tilt).",
    "red_flags": [
      "Postpartum haemorrhage — soaking >1 pad/hr, clots, dizziness",
      "Fever >38 °C, foul lochia, lower-abdominal pain (puerperal sepsis)",
      "Breast engorgement/mastitis, cracked nipples, breast abscess",
      "Calf pain or swelling, breathlessness (DVT / PE)",
      "Severe headache / BP rise (postpartum eclampsia)",
      "Persistent low mood, anxiety, thoughts of self-harm (postpartum depression)",
      "C-section wound redness, discharge, dehiscence"
    ],
    "tags": [
      "sutika",
      "postnatal",
      "postpartum",
      "puerperium",
      "45 days",
      "lactation",
      "stanyajanana",
      "snehapana",
      "abhyanga",
      "udaraveshtana"
    ],
    "plan": {},
    "id": "sut-1",
    "title": "Sutika Paricharya — Panchakola / Pippalyadi Yavagu",
    "domain": "sutika",
    "sanskrit_shloka": "पिप्पल्यादिगणसिद्धा यवागूः क्षुधिताय प्रदेया",
    "transliteration": "pippalyādigaṇasiddhā yavāgūḥ kṣudhitāya pradeyā",
    "hindi_meaning": "भूख लगने पर पिप्पल्यादि गण से सिद्ध यवागू दें।",
    "english_clinical_summary": "Pippalyadi Yavagu (spiced rice gruel with Panchakola and ghee) kindles Agni and prepares for gradual diet. Warm Yavagu: rice + water + Pippali, Shunthi, Maricha pinch + ghee. Day 1–3 (light diet), then Ahara-krama.",
    "dc_dutta_correlation": "Puerperium & Lactation (6 weeks): Puerperium = from delivery of placenta to 6 weeks. Uterine involution (fundus descends ~1 cm/day; non-palpable per abdomen by day 10–14), lochia: rubra (days 1–4) → serosa (5–9) → alba (10–15+). Exclusive breastfeeding for 6 months, initiate within 1 hour; extra 500 kcal/day; iron + folic acid 100 days post-partum, calcium 500 mg BD for 6 months. Postnatal visits: within 24 h, day 3, day 7, week 6; LAM and contraception counselling; postnatal exercises (Kegel, pelvic tilt).",
    "keywords": [
      "sutika",
      "postnatal",
      "postpartum",
      "puerperium",
      "45 days",
      "lactation",
      "stanyajanana",
      "snehapana",
      "abhyanga",
      "udaraveshtana"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Classical Samhitas me iska mukhya chikitsa sutra kya hai?",
      "DC Dutta Obstetrics me iska modern clinical protocol kya hai?",
      "Garbhini ko kab turant hospital review ke liye refer karein?"
    ]
  },
  {
    "month": null,
    "ritu": null,
    "samhita": "charaka",
    "stage": "sutika",
    "sanskrit": "उदरं वस्त्रेण वेष्टयेत् वातप्रकोपनिवारणाय",
    "iast": "udaraṃ vastreṇa veṣṭayet vātaprakopanivāraṇāya",
    "hindi": "वात प्रकोप को रोकने के लिए पेट को वस्त्र से लपेटें।",
    "english": "Bind the abdomen with a clean cloth to prevent Vata aggravation, support the uterus and reduce visceroptosis. Soft cotton binder, snug not tight; remove if breathlessness, wound pain (C-section — only on doctor’s advice). Pelvic-floor exercises.",
    "citation": "Sushruta Samhita, Sharira Sthana 10/16",
    "dc_dutta": "Puerperium & Lactation (6 weeks): Puerperium = from delivery of placenta to 6 weeks. Uterine involution (fundus descends ~1 cm/day; non-palpable per abdomen by day 10–14), lochia: rubra (days 1–4) → serosa (5–9) → alba (10–15+). Exclusive breastfeeding for 6 months, initiate within 1 hour; extra 500 kcal/day; iron + folic acid 100 days post-partum, calcium 500 mg BD for 6 months. Postnatal visits: within 24 h, day 3, day 7, week 6; LAM and contraception counselling; postnatal exercises (Kegel, pelvic tilt).",
    "red_flags": [
      "Postpartum haemorrhage — soaking >1 pad/hr, clots, dizziness",
      "Fever >38 °C, foul lochia, lower-abdominal pain (puerperal sepsis)",
      "Breast engorgement/mastitis, cracked nipples, breast abscess",
      "Calf pain or swelling, breathlessness (DVT / PE)",
      "Severe headache / BP rise (postpartum eclampsia)",
      "Persistent low mood, anxiety, thoughts of self-harm (postpartum depression)",
      "C-section wound redness, discharge, dehiscence"
    ],
    "tags": [
      "sutika",
      "postnatal",
      "postpartum",
      "puerperium",
      "45 days",
      "lactation",
      "stanyajanana",
      "snehapana",
      "abhyanga",
      "udaraveshtana"
    ],
    "plan": {},
    "id": "sut-2",
    "title": "Sutika Paricharya — Udaraveshtana (Abdominal Binding)",
    "domain": "sutika",
    "sanskrit_shloka": "उदरं वस्त्रेण वेष्टयेत् वातप्रकोपनिवारणाय",
    "transliteration": "udaraṃ vastreṇa veṣṭayet vātaprakopanivāraṇāya",
    "hindi_meaning": "वात प्रकोप को रोकने के लिए पेट को वस्त्र से लपेटें।",
    "english_clinical_summary": "Bind the abdomen with a clean cloth to prevent Vata aggravation, support the uterus and reduce visceroptosis. Soft cotton binder, snug not tight; remove if breathlessness, wound pain (C-section — only on doctor’s advice). Pelvic-floor exercises.",
    "dc_dutta_correlation": "Puerperium & Lactation (6 weeks): Puerperium = from delivery of placenta to 6 weeks. Uterine involution (fundus descends ~1 cm/day; non-palpable per abdomen by day 10–14), lochia: rubra (days 1–4) → serosa (5–9) → alba (10–15+). Exclusive breastfeeding for 6 months, initiate within 1 hour; extra 500 kcal/day; iron + folic acid 100 days post-partum, calcium 500 mg BD for 6 months. Postnatal visits: within 24 h, day 3, day 7, week 6; LAM and contraception counselling; postnatal exercises (Kegel, pelvic tilt).",
    "keywords": [
      "sutika",
      "postnatal",
      "postpartum",
      "puerperium",
      "45 days",
      "lactation",
      "stanyajanana",
      "snehapana",
      "abhyanga",
      "udaraveshtana"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Classical Samhitas me iska mukhya chikitsa sutra kya hai?",
      "DC Dutta Obstetrics me iska modern clinical protocol kya hai?",
      "Garbhini ko kab turant hospital review ke liye refer karein?"
    ]
  },
  {
    "month": null,
    "ritu": null,
    "samhita": "sushruta",
    "stage": "sutika",
    "sanskrit": "बलातैलेनाभ्यङ्गः कोष्णेन वातघ्नक्वाथेन परिषेकः",
    "iast": "balātailenābhyaṅgaḥ koṣṇena vātaghnakvāthena pariṣekaḥ",
    "hindi": "बलातैल से अभ्यंग तथा हल्के गर्म वातनाशक क्वाथ से परिषेक।",
    "english": "Abhyanga with Bala taila (or Dhanvantaram) and warm Pariseka with Dashamula / Vatahara decoction — relieves body-ache and Vata. Daily gentle body massage and warm-water bath 30 min after oil, 10–45 days; avoid wetting wound (episiotomy/LSCS) before healing; avoid cold water.",
    "citation": "Sushruta Samhita, Sharira Sthana 10/16",
    "dc_dutta": "Puerperium & Lactation (6 weeks): Puerperium = from delivery of placenta to 6 weeks. Uterine involution (fundus descends ~1 cm/day; non-palpable per abdomen by day 10–14), lochia: rubra (days 1–4) → serosa (5–9) → alba (10–15+). Exclusive breastfeeding for 6 months, initiate within 1 hour; extra 500 kcal/day; iron + folic acid 100 days post-partum, calcium 500 mg BD for 6 months. Postnatal visits: within 24 h, day 3, day 7, week 6; LAM and contraception counselling; postnatal exercises (Kegel, pelvic tilt).",
    "red_flags": [
      "Postpartum haemorrhage — soaking >1 pad/hr, clots, dizziness",
      "Fever >38 °C, foul lochia, lower-abdominal pain (puerperal sepsis)",
      "Breast engorgement/mastitis, cracked nipples, breast abscess",
      "Calf pain or swelling, breathlessness (DVT / PE)",
      "Severe headache / BP rise (postpartum eclampsia)",
      "Persistent low mood, anxiety, thoughts of self-harm (postpartum depression)",
      "C-section wound redness, discharge, dehiscence"
    ],
    "tags": [
      "sutika",
      "postnatal",
      "postpartum",
      "puerperium",
      "45 days",
      "lactation",
      "stanyajanana",
      "snehapana",
      "abhyanga",
      "udaraveshtana"
    ],
    "plan": {},
    "id": "sut-3",
    "title": "Sutika Paricharya — Abhyanga & Ushna-Jala Pariseka",
    "domain": "sutika",
    "sanskrit_shloka": "बलातैलेनाभ्यङ्गः कोष्णेन वातघ्नक्वाथेन परिषेकः",
    "transliteration": "balātailenābhyaṅgaḥ koṣṇena vātaghnakvāthena pariṣekaḥ",
    "hindi_meaning": "बलातैल से अभ्यंग तथा हल्के गर्म वातनाशक क्वाथ से परिषेक।",
    "english_clinical_summary": "Abhyanga with Bala taila (or Dhanvantaram) and warm Pariseka with Dashamula / Vatahara decoction — relieves body-ache and Vata. Daily gentle body massage and warm-water bath 30 min after oil, 10–45 days; avoid wetting wound (episiotomy/LSCS) before healing; avoid cold water.",
    "dc_dutta_correlation": "Puerperium & Lactation (6 weeks): Puerperium = from delivery of placenta to 6 weeks. Uterine involution (fundus descends ~1 cm/day; non-palpable per abdomen by day 10–14), lochia: rubra (days 1–4) → serosa (5–9) → alba (10–15+). Exclusive breastfeeding for 6 months, initiate within 1 hour; extra 500 kcal/day; iron + folic acid 100 days post-partum, calcium 500 mg BD for 6 months. Postnatal visits: within 24 h, day 3, day 7, week 6; LAM and contraception counselling; postnatal exercises (Kegel, pelvic tilt).",
    "keywords": [
      "sutika",
      "postnatal",
      "postpartum",
      "puerperium",
      "45 days",
      "lactation",
      "stanyajanana",
      "snehapana",
      "abhyanga",
      "udaraveshtana"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Classical Samhitas me iska mukhya chikitsa sutra kya hai?",
      "DC Dutta Obstetrics me iska modern clinical protocol kya hai?",
      "Garbhini ko kab turant hospital review ke liye refer karein?"
    ]
  },
  {
    "month": null,
    "ritu": null,
    "samhita": "charaka",
    "stage": "sutika",
    "sanskrit": "क्रमेण लघ्वाहारं स्निग्धमुष्णं सेवेत",
    "iast": "krameṇa laghv-āhāraṃ snigdham uṣṇaṃ seveta",
    "hindi": "क्रम से लघु, स्निग्ध एवं उष्ण आहार लें।",
    "english": "Gradual return from liquid Yavagu → Vilepi → soft rice with ghee → full meals; unctuous and warm. Day 1–3: Yavagu/Manda; Day 4–7: Vilepi, moong-khichdi with ghee, dal-soup; Day 8–21: rice-dal-ghee, Mamsa-rasa/dal, seasonal vegetables, Methi-ladoo; Day 22–45: regular balanced diet with galactagogues, Dashamularishta/Jeerakarishta (as prescribed).",
    "citation": "Ch. Sha. 8.51–53; A.H. Sha. 1",
    "dc_dutta": "Puerperium & Lactation (6 weeks): Puerperium = from delivery of placenta to 6 weeks. Uterine involution (fundus descends ~1 cm/day; non-palpable per abdomen by day 10–14), lochia: rubra (days 1–4) → serosa (5–9) → alba (10–15+). Exclusive breastfeeding for 6 months, initiate within 1 hour; extra 500 kcal/day; iron + folic acid 100 days post-partum, calcium 500 mg BD for 6 months. Postnatal visits: within 24 h, day 3, day 7, week 6; LAM and contraception counselling; postnatal exercises (Kegel, pelvic tilt).",
    "red_flags": [
      "Postpartum haemorrhage — soaking >1 pad/hr, clots, dizziness",
      "Fever >38 °C, foul lochia, lower-abdominal pain (puerperal sepsis)",
      "Breast engorgement/mastitis, cracked nipples, breast abscess",
      "Calf pain or swelling, breathlessness (DVT / PE)",
      "Severe headache / BP rise (postpartum eclampsia)",
      "Persistent low mood, anxiety, thoughts of self-harm (postpartum depression)",
      "C-section wound redness, discharge, dehiscence"
    ],
    "tags": [
      "sutika",
      "postnatal",
      "postpartum",
      "puerperium",
      "45 days",
      "lactation",
      "stanyajanana",
      "snehapana",
      "abhyanga",
      "udaraveshtana"
    ],
    "plan": {},
    "id": "sut-4",
    "title": "Sutika Paricharya — Ahara Krama (Gradual diet)",
    "domain": "sutika",
    "sanskrit_shloka": "क्रमेण लघ्वाहारं स्निग्धमुष्णं सेवेत",
    "transliteration": "krameṇa laghv-āhāraṃ snigdham uṣṇaṃ seveta",
    "hindi_meaning": "क्रम से लघु, स्निग्ध एवं उष्ण आहार लें।",
    "english_clinical_summary": "Gradual return from liquid Yavagu → Vilepi → soft rice with ghee → full meals; unctuous and warm. Day 1–3: Yavagu/Manda; Day 4–7: Vilepi, moong-khichdi with ghee, dal-soup; Day 8–21: rice-dal-ghee, Mamsa-rasa/dal, seasonal vegetables, Methi-ladoo; Day 22–45: regular balanced diet with galactagogues, Dashamularishta/Jeerakarishta (as prescribed).",
    "dc_dutta_correlation": "Puerperium & Lactation (6 weeks): Puerperium = from delivery of placenta to 6 weeks. Uterine involution (fundus descends ~1 cm/day; non-palpable per abdomen by day 10–14), lochia: rubra (days 1–4) → serosa (5–9) → alba (10–15+). Exclusive breastfeeding for 6 months, initiate within 1 hour; extra 500 kcal/day; iron + folic acid 100 days post-partum, calcium 500 mg BD for 6 months. Postnatal visits: within 24 h, day 3, day 7, week 6; LAM and contraception counselling; postnatal exercises (Kegel, pelvic tilt).",
    "keywords": [
      "sutika",
      "postnatal",
      "postpartum",
      "puerperium",
      "45 days",
      "lactation",
      "stanyajanana",
      "snehapana",
      "abhyanga",
      "udaraveshtana"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Classical Samhitas me iska mukhya chikitsa sutra kya hai?",
      "DC Dutta Obstetrics me iska modern clinical protocol kya hai?",
      "Garbhini ko kab turant hospital review ke liye refer karein?"
    ]
  },
  {
    "month": null,
    "ritu": null,
    "samhita": "sushruta",
    "stage": "sutika",
    "sanskrit": "शतावरीविदारीजीरकमेथिकाशतपुष्पादयः स्तन्यजननाः",
    "iast": "śatāvarī-vidārī-jīrakam-ethikā-śatapuṣpādayaḥ stanyajananāḥ",
    "hindi": "शतावरी, विदारी, जीरक, मेथी, शतपुष्पा आदि स्तन्यवर्धक हैं।",
    "english": "Shatavari, Vidari, Jeeraka, Methika, Shatapushpa (dill), Yashtimadhu, Draksha, milk, ghee and warm soups increase breast-milk (Stanyajanana). Shatavari-kalpa 1 tsp with milk, Jeeraka-Methi water, garlic-milk (if suited), oats/dalia, ample fluids 3 L, adequate rest and skin-to-skin; consult physician for formulations.",
    "citation": "Su. Sha. 10.31–35 (Stanya-sampat / Stanyavardhaka); Kashyapa Sa., Khila Sthana",
    "dc_dutta": "Puerperium & Lactation (6 weeks): Puerperium = from delivery of placenta to 6 weeks. Uterine involution (fundus descends ~1 cm/day; non-palpable per abdomen by day 10–14), lochia: rubra (days 1–4) → serosa (5–9) → alba (10–15+). Exclusive breastfeeding for 6 months, initiate within 1 hour; extra 500 kcal/day; iron + folic acid 100 days post-partum, calcium 500 mg BD for 6 months. Postnatal visits: within 24 h, day 3, day 7, week 6; LAM and contraception counselling; postnatal exercises (Kegel, pelvic tilt).",
    "red_flags": [
      "Postpartum haemorrhage — soaking >1 pad/hr, clots, dizziness",
      "Fever >38 °C, foul lochia, lower-abdominal pain (puerperal sepsis)",
      "Breast engorgement/mastitis, cracked nipples, breast abscess",
      "Calf pain or swelling, breathlessness (DVT / PE)",
      "Severe headache / BP rise (postpartum eclampsia)",
      "Persistent low mood, anxiety, thoughts of self-harm (postpartum depression)",
      "C-section wound redness, discharge, dehiscence"
    ],
    "tags": [
      "sutika",
      "postnatal",
      "postpartum",
      "puerperium",
      "45 days",
      "lactation",
      "stanyajanana",
      "snehapana",
      "abhyanga",
      "udaraveshtana"
    ],
    "plan": {},
    "id": "sut-5",
    "title": "Sutika Paricharya — Stanyajanana (Galactagogues)",
    "domain": "sutika",
    "sanskrit_shloka": "शतावरीविदारीजीरकमेथिकाशतपुष्पादयः स्तन्यजननाः",
    "transliteration": "śatāvarī-vidārī-jīrakam-ethikā-śatapuṣpādayaḥ stanyajananāḥ",
    "hindi_meaning": "शतावरी, विदारी, जीरक, मेथी, शतपुष्पा आदि स्तन्यवर्धक हैं।",
    "english_clinical_summary": "Shatavari, Vidari, Jeeraka, Methika, Shatapushpa (dill), Yashtimadhu, Draksha, milk, ghee and warm soups increase breast-milk (Stanyajanana). Shatavari-kalpa 1 tsp with milk, Jeeraka-Methi water, garlic-milk (if suited), oats/dalia, ample fluids 3 L, adequate rest and skin-to-skin; consult physician for formulations.",
    "dc_dutta_correlation": "Puerperium & Lactation (6 weeks): Puerperium = from delivery of placenta to 6 weeks. Uterine involution (fundus descends ~1 cm/day; non-palpable per abdomen by day 10–14), lochia: rubra (days 1–4) → serosa (5–9) → alba (10–15+). Exclusive breastfeeding for 6 months, initiate within 1 hour; extra 500 kcal/day; iron + folic acid 100 days post-partum, calcium 500 mg BD for 6 months. Postnatal visits: within 24 h, day 3, day 7, week 6; LAM and contraception counselling; postnatal exercises (Kegel, pelvic tilt).",
    "keywords": [
      "sutika",
      "postnatal",
      "postpartum",
      "puerperium",
      "45 days",
      "lactation",
      "stanyajanana",
      "snehapana",
      "abhyanga",
      "udaraveshtana"
    ],
    "sthana": "Khila Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Classical Samhitas me iska mukhya chikitsa sutra kya hai?",
      "DC Dutta Obstetrics me iska modern clinical protocol kya hai?",
      "Garbhini ko kab turant hospital review ke liye refer karein?"
    ]
  },
  {
    "month": null,
    "ritu": null,
    "samhita": "all",
    "stage": "sutika",
    "sanskrit": "",
    "iast": "",
    "hindi": "",
    "english": "Warm Panchakola-Yavagu, ghee 15–30 ml, warm water, bed-rest, abdominal binding, early colostrum feeding, perineal care.",
    "citation": "Charaka Samhita, Sharira Sthana 8 & Sushruta Samhita, Sharira Sthana 10 — Phased Ahara-Krama",
    "dc_dutta": "Puerperium = from delivery of placenta to 6 weeks. Uterine involution (fundus descends ~1 cm/day; non-palpable per abdomen by day 10–14), lochia: rubra (days 1–4) → serosa (5–9) → alba (10–15+). Exclusive breastfeeding for 6 months, initiate within 1 hour; extra 500 kcal/day; iron + folic acid 100 days post-partum, calcium 500 mg BD for 6 months. Postnatal visits: within 24 h, day 3, day 7, week 6; LAM and contraception counselling; postnatal exercises (Kegel, pelvic tilt).",
    "red_flags": [
      "Postpartum haemorrhage — soaking >1 pad/hr, clots, dizziness",
      "Fever >38 °C, foul lochia, lower-abdominal pain (puerperal sepsis)",
      "Breast engorgement/mastitis, cracked nipples, breast abscess",
      "Calf pain or swelling, breathlessness (DVT / PE)",
      "Severe headache / BP rise (postpartum eclampsia)",
      "Persistent low mood, anxiety, thoughts of self-harm (postpartum depression)",
      "C-section wound redness, discharge, dehiscence"
    ],
    "tags": [
      "sutika",
      "day 0–3",
      "ahara krama",
      "postnatal diet",
      "gradual diet",
      "yavagu"
    ],
    "plan": {},
    "id": "sut-ph-0",
    "title": "Sutika Day 0–3 — Agni-deepana & Vata-shamana",
    "domain": "sutika",
    "sanskrit_shloka": "",
    "transliteration": "",
    "hindi_meaning": "",
    "english_clinical_summary": "Warm Panchakola-Yavagu, ghee 15–30 ml, warm water, bed-rest, abdominal binding, early colostrum feeding, perineal care.",
    "dc_dutta_correlation": "Puerperium = from delivery of placenta to 6 weeks. Uterine involution (fundus descends ~1 cm/day; non-palpable per abdomen by day 10–14), lochia: rubra (days 1–4) → serosa (5–9) → alba (10–15+). Exclusive breastfeeding for 6 months, initiate within 1 hour; extra 500 kcal/day; iron + folic acid 100 days post-partum, calcium 500 mg BD for 6 months. Postnatal visits: within 24 h, day 3, day 7, week 6; LAM and contraception counselling; postnatal exercises (Kegel, pelvic tilt).",
    "keywords": [
      "sutika",
      "day 0–3",
      "ahara krama",
      "postnatal diet",
      "gradual diet",
      "yavagu"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Classical Samhitas me iska mukhya chikitsa sutra kya hai?",
      "DC Dutta Obstetrics me iska modern clinical protocol kya hai?",
      "Garbhini ko kab turant hospital review ke liye refer karein?"
    ]
  },
  {
    "month": null,
    "ritu": null,
    "samhita": "all",
    "stage": "sutika",
    "sanskrit": "",
    "iast": "",
    "hindi": "",
    "english": "Soft khichdi with ghee, Mamsa-rasa/dal soup, Abhyanga with Bala taila, Pariseka, Jeeraka-Methi water.",
    "citation": "Charaka Samhita, Sharira Sthana 8 & Sushruta Samhita, Sharira Sthana 10 — Phased Ahara-Krama",
    "dc_dutta": "Puerperium = from delivery of placenta to 6 weeks. Uterine involution (fundus descends ~1 cm/day; non-palpable per abdomen by day 10–14), lochia: rubra (days 1–4) → serosa (5–9) → alba (10–15+). Exclusive breastfeeding for 6 months, initiate within 1 hour; extra 500 kcal/day; iron + folic acid 100 days post-partum, calcium 500 mg BD for 6 months. Postnatal visits: within 24 h, day 3, day 7, week 6; LAM and contraception counselling; postnatal exercises (Kegel, pelvic tilt).",
    "red_flags": [
      "Postpartum haemorrhage — soaking >1 pad/hr, clots, dizziness",
      "Fever >38 °C, foul lochia, lower-abdominal pain (puerperal sepsis)",
      "Breast engorgement/mastitis, cracked nipples, breast abscess",
      "Calf pain or swelling, breathlessness (DVT / PE)",
      "Severe headache / BP rise (postpartum eclampsia)",
      "Persistent low mood, anxiety, thoughts of self-harm (postpartum depression)",
      "C-section wound redness, discharge, dehiscence"
    ],
    "tags": [
      "sutika",
      "day 4–7",
      "ahara krama",
      "postnatal diet",
      "gradual diet",
      "yavagu"
    ],
    "plan": {},
    "id": "sut-ph-1",
    "title": "Sutika Day 4–7 — Brimhana begins",
    "domain": "sutika",
    "sanskrit_shloka": "",
    "transliteration": "",
    "hindi_meaning": "",
    "english_clinical_summary": "Soft khichdi with ghee, Mamsa-rasa/dal soup, Abhyanga with Bala taila, Pariseka, Jeeraka-Methi water.",
    "dc_dutta_correlation": "Puerperium = from delivery of placenta to 6 weeks. Uterine involution (fundus descends ~1 cm/day; non-palpable per abdomen by day 10–14), lochia: rubra (days 1–4) → serosa (5–9) → alba (10–15+). Exclusive breastfeeding for 6 months, initiate within 1 hour; extra 500 kcal/day; iron + folic acid 100 days post-partum, calcium 500 mg BD for 6 months. Postnatal visits: within 24 h, day 3, day 7, week 6; LAM and contraception counselling; postnatal exercises (Kegel, pelvic tilt).",
    "keywords": [
      "sutika",
      "day 4–7",
      "ahara krama",
      "postnatal diet",
      "gradual diet",
      "yavagu"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Classical Samhitas me iska mukhya chikitsa sutra kya hai?",
      "DC Dutta Obstetrics me iska modern clinical protocol kya hai?",
      "Garbhini ko kab turant hospital review ke liye refer karein?"
    ]
  },
  {
    "month": null,
    "ritu": null,
    "samhita": "all",
    "stage": "sutika",
    "sanskrit": "",
    "iast": "",
    "hindi": "",
    "english": "Methi-ladoo, Shatavari-kalpa, Dashamula-siddha ksheera, gentle walking, Kegel, sunlight 15 min.",
    "citation": "Charaka Samhita, Sharira Sthana 8 & Sushruta Samhita, Sharira Sthana 10 — Phased Ahara-Krama",
    "dc_dutta": "Puerperium = from delivery of placenta to 6 weeks. Uterine involution (fundus descends ~1 cm/day; non-palpable per abdomen by day 10–14), lochia: rubra (days 1–4) → serosa (5–9) → alba (10–15+). Exclusive breastfeeding for 6 months, initiate within 1 hour; extra 500 kcal/day; iron + folic acid 100 days post-partum, calcium 500 mg BD for 6 months. Postnatal visits: within 24 h, day 3, day 7, week 6; LAM and contraception counselling; postnatal exercises (Kegel, pelvic tilt).",
    "red_flags": [
      "Postpartum haemorrhage — soaking >1 pad/hr, clots, dizziness",
      "Fever >38 °C, foul lochia, lower-abdominal pain (puerperal sepsis)",
      "Breast engorgement/mastitis, cracked nipples, breast abscess",
      "Calf pain or swelling, breathlessness (DVT / PE)",
      "Severe headache / BP rise (postpartum eclampsia)",
      "Persistent low mood, anxiety, thoughts of self-harm (postpartum depression)",
      "C-section wound redness, discharge, dehiscence"
    ],
    "tags": [
      "sutika",
      "day 8–21",
      "ahara krama",
      "postnatal diet",
      "gradual diet",
      "yavagu"
    ],
    "plan": {},
    "id": "sut-ph-2",
    "title": "Sutika Day 8–21 — Rasayana & lactation",
    "domain": "sutika",
    "sanskrit_shloka": "",
    "transliteration": "",
    "hindi_meaning": "",
    "english_clinical_summary": "Methi-ladoo, Shatavari-kalpa, Dashamula-siddha ksheera, gentle walking, Kegel, sunlight 15 min.",
    "dc_dutta_correlation": "Puerperium = from delivery of placenta to 6 weeks. Uterine involution (fundus descends ~1 cm/day; non-palpable per abdomen by day 10–14), lochia: rubra (days 1–4) → serosa (5–9) → alba (10–15+). Exclusive breastfeeding for 6 months, initiate within 1 hour; extra 500 kcal/day; iron + folic acid 100 days post-partum, calcium 500 mg BD for 6 months. Postnatal visits: within 24 h, day 3, day 7, week 6; LAM and contraception counselling; postnatal exercises (Kegel, pelvic tilt).",
    "keywords": [
      "sutika",
      "day 8–21",
      "ahara krama",
      "postnatal diet",
      "gradual diet",
      "yavagu"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Classical Samhitas me iska mukhya chikitsa sutra kya hai?",
      "DC Dutta Obstetrics me iska modern clinical protocol kya hai?",
      "Garbhini ko kab turant hospital review ke liye refer karein?"
    ]
  },
  {
    "month": null,
    "ritu": null,
    "samhita": "all",
    "stage": "sutika",
    "sanskrit": "",
    "iast": "",
    "hindi": "",
    "english": "Normal diet with Stanyajanana foods, Pranayama, postnatal exercise, contraceptive counselling; Garbhashaya shodhana — Ashoka-ghrita/Dashamularishta only on advice.",
    "citation": "Charaka Samhita, Sharira Sthana 8 & Sushruta Samhita, Sharira Sthana 10 — Phased Ahara-Krama",
    "dc_dutta": "Puerperium = from delivery of placenta to 6 weeks. Uterine involution (fundus descends ~1 cm/day; non-palpable per abdomen by day 10–14), lochia: rubra (days 1–4) → serosa (5–9) → alba (10–15+). Exclusive breastfeeding for 6 months, initiate within 1 hour; extra 500 kcal/day; iron + folic acid 100 days post-partum, calcium 500 mg BD for 6 months. Postnatal visits: within 24 h, day 3, day 7, week 6; LAM and contraception counselling; postnatal exercises (Kegel, pelvic tilt).",
    "red_flags": [
      "Postpartum haemorrhage — soaking >1 pad/hr, clots, dizziness",
      "Fever >38 °C, foul lochia, lower-abdominal pain (puerperal sepsis)",
      "Breast engorgement/mastitis, cracked nipples, breast abscess",
      "Calf pain or swelling, breathlessness (DVT / PE)",
      "Severe headache / BP rise (postpartum eclampsia)",
      "Persistent low mood, anxiety, thoughts of self-harm (postpartum depression)",
      "C-section wound redness, discharge, dehiscence"
    ],
    "tags": [
      "sutika",
      "day 22–45",
      "ahara krama",
      "postnatal diet",
      "gradual diet",
      "yavagu"
    ],
    "plan": {},
    "id": "sut-ph-3",
    "title": "Sutika Day 22–45 — Return to Natural Baseline Health",
    "domain": "sutika",
    "sanskrit_shloka": "",
    "transliteration": "",
    "hindi_meaning": "",
    "english_clinical_summary": "Normal diet with Stanyajanana foods, Pranayama, postnatal exercise, contraceptive counselling; Garbhashaya shodhana — Ashoka-ghrita/Dashamularishta only on advice.",
    "dc_dutta_correlation": "Puerperium = from delivery of placenta to 6 weeks. Uterine involution (fundus descends ~1 cm/day; non-palpable per abdomen by day 10–14), lochia: rubra (days 1–4) → serosa (5–9) → alba (10–15+). Exclusive breastfeeding for 6 months, initiate within 1 hour; extra 500 kcal/day; iron + folic acid 100 days post-partum, calcium 500 mg BD for 6 months. Postnatal visits: within 24 h, day 3, day 7, week 6; LAM and contraception counselling; postnatal exercises (Kegel, pelvic tilt).",
    "keywords": [
      "sutika",
      "day 22–45",
      "ahara krama",
      "postnatal diet",
      "gradual diet",
      "yavagu"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Classical Samhitas me iska mukhya chikitsa sutra kya hai?",
      "DC Dutta Obstetrics me iska modern clinical protocol kya hai?",
      "Garbhini ko kab turant hospital review ke liye refer karein?"
    ]
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
    "month": null,
    "ritu": null,
    "title": "Charaka Samhita — Navajata Shishu Jatakarma & Resuscitation",
    "citation": "Charaka Samhita, Sharira Sthana 8/42-46",
    "sanskrit_shloka": "तत्र जातमात्रस्यैवोल्वे परिमार्जनीये सैन्धवसर्पिषा। ततः प्राणाप्रत्यागमने सति कर्णमूलेऽश्मनोः संघट्टनं, शीतोदकेनोष्णोदकेन वा मुखपरिषेकः। नाडीं चाष्टविंशत्यङ्गुले बद्ध्वा छिन्द्यात्॥",
    "transliteration": "tatra jātamātrasyaivolve parimārjanīye saindhavasarpiṣā | tataḥ prāṇāpratyāgamane sati karṇamūle'śmanoḥ saṁghaṭṭanaṁ, śītodakenoṣṇodakena vā mukhapariṣekaḥ | nāḍīṁ cāṣṭaviṁśatyaṅgule baddhvā chindyāt ||",
    "hindi_meaning": "जन्म लेते ही नवजात शिशु के मुख और तालु से उल्ब (amniotic vernix/mucus) को सैन्धव लवण एवं घृत से स्वच्छ करें। यदि शिशु श्वास न ले रहा हो (प्राणप्रत्यागमन), तो दोनों कानों के पास पत्थरों को टकराकर शब्द करें, मुख पर शीतोष्ण जल छिड़कें। इसके पश्चात नाभि से 8 अंगुल नापकर नाभि-नाड़ी को सूत्र से बांधकर काटें और सुवर्ण-मधु-सर्पि का प्राशन (जातकर्म) कराएं।",
    "english_clinical_summary": "Immediate newborn management according to Charaka includes: Ulva Parimarjana (gentle clearance of mucus and vernix from oral and pharyngeal cavities using rock salt and ghee), Pranapratyagamana (auditory and cutaneous tactile stimulation for neonatal resuscitation if breathing is delayed), Nalakartana (umbilical cord clamping and sterile transaction measured at 8 Angulas), and Jatakarma (administering micro-doses of purified gold bhasma with unequal honey and ghee for intellect and vitality).",
    "dc_dutta_correlation": "DC Dutta Ch. 38 (The Newborn Infant): Immediate neonatal care: clearing airway secretions gently without aggressive suctioning, assessment of breathing and APGAR score at 1 and 5 minutes, tactile stimulation, delayed cord clamping (1-3 minutes to allow placental transfusion of 80-100 ml blood), hypothermia prevention via immediate skin-to-skin contact and thermal drying.",
    "samprapti_yukti": "Ulva (mucus) obstructs Prana Vaha Srotas. Gentle clearing clears the airway without mucosal trauma. Madhu-Sarpi with gold calx acts as Rasayana to stimulate digestion and innate immunity.",
    "red_flags": [
      "Apnea, gasping respiration or central cyanosis at 1 minute",
      "Heart rate <100 bpm requiring bag-and-mask positive pressure ventilation",
      "Bleeding from umbilical cord stump or purulent discharge (Omphalitis)"
    ],
    "related_questions": [
      "Navajata Shishu ke Jatakarma aur Stanyapana ke niyam kya hain?",
      "Ulva Parimarjana aur Pranapratyagamana ka modern resuscitation se kya correlation hai?",
      "Delayed cord clamping aur Charaka Nalakartana me kya similarity hai?"
    ],
    "keywords": [
      "charaka",
      "navajata",
      "newborn",
      "jatakarma",
      "ulva parimarjana",
      "nalakartana",
      "apgar",
      "resuscitation"
    ],
    "sanskrit": "तत्र जातमात्रस्यैवोल्वे परिमार्जनीये सैन्धवसर्पिषा। ततः प्राणाप्रत्यागमने सति कर्णमूलेऽश्मनोः संघट्टनं, शीतोदकेनोष्णोदकेन वा मुखपरिषेकः। नाडीं चाष्टविंशत्यङ्गुले बद्ध्वा छिन्द्यात्॥",
    "iast": "tatra jātamātrasyaivolve parimārjanīye saindhavasarpiṣā | tataḥ prāṇāpratyāgamane sati karṇamūle'śmanoḥ saṁghaṭṭanaṁ, śītodakenoṣṇodakena vā mukhapariṣekaḥ | nāḍīṁ cāṣṭaviṁśatyaṅgule baddhvā chindyāt ||",
    "hindi": "जन्म लेते ही नवजात शिशु के मुख और तालु से उल्ब (amniotic vernix/mucus) को सैन्धव लवण एवं घृत से स्वच्छ करें। यदि शिशु श्वास न ले रहा हो (प्राणप्रत्यागमन), तो दोनों कानों के पास पत्थरों को टकराकर शब्द करें, मुख पर शीतोष्ण जल छिड़कें। इसके पश्चात नाभि से 8 अंगुल नापकर नाभि-नाड़ी को सूत्र से बांधकर काटें और सुवर्ण-मधु-सर्पि का प्राशन (जातकर्म) कराएं।",
    "english": "Immediate newborn management according to Charaka includes: Ulva Parimarjana (gentle clearance of mucus and vernix from oral and pharyngeal cavities using rock salt and ghee), Pranapratyagamana (auditory and cutaneous tactile stimulation for neonatal resuscitation if breathing is delayed), Nalakartana (umbilical cord clamping and sterile transaction measured at 8 Angulas), and Jatakarma (administering micro-doses of purified gold bhasma with unequal honey and ghee for intellect and vitality).",
    "dc_dutta": "DC Dutta Ch. 38 (The Newborn Infant): Immediate neonatal care: clearing airway secretions gently without aggressive suctioning, assessment of breathing and APGAR score at 1 and 5 minutes, tactile stimulation, delayed cord clamping (1-3 minutes to allow placental transfusion of 80-100 ml blood), hypothermia prevention via immediate skin-to-skin contact and thermal drying.",
    "tags": [
      "charaka",
      "navajata",
      "newborn",
      "jatakarma",
      "ulva parimarjana",
      "nalakartana",
      "apgar",
      "resuscitation"
    ],
    "plan": {}
  },
  {
    "month": null,
    "ritu": null,
    "samhita": "sushruta",
    "stage": "navajata",
    "sanskrit": "जातमात्रस्य उल्वपरिमार्जनं कर्तव्यम् — मुखनासास्रोतांसि शोधयेत्",
    "iast": "jātamātrasya ulvaparimārjanaṃ kartavyam — mukhanāsāsrotāṃsi śodhayet",
    "hindi": "जन्म लेते ही शिशु के मुख-नासा आदि से उल्व (गर्भोदक/कफ) को साफ़ करें।",
    "english": "Wipe vernix, amniotic fluid and mucus from the face, mouth and nostrils with clean soft cotton to clear the airway.",
    "citation": "Su. Sha. 10.12; Ch. Sha. 8.37",
    "dc_dutta": "Dry & stimulate (rub back/feet); suction only if airway obstructed; place on mother’s chest skin-to-skin (Initial steps of NRP — first 30 s).",
    "red_flags": [
      "Not feeding well / refusing breast",
      "Fast breathing (>60/min), grunting, chest indrawing, central cyanosis",
      "Fever >37.5 °C or hypothermia <36.5 °C",
      "Jaundice within 24 h or reaching palms/soles",
      "Convulsions, lethargy, floppy baby",
      "Cord stump redness/pus, umbilical discharge",
      "No urine in 24 h or no meconium within 48 h"
    ],
    "tags": [
      "navajata",
      "newborn",
      "neonate",
      "jatakarma",
      "ulva",
      "cord",
      "nalakartana",
      "pranapratyagamana",
      "colostrum",
      "stanyapana",
      "rakshakarma",
      "swarna prashana",
      "essential newborn care"
    ],
    "plan": {},
    "id": "nav-0",
    "title": "Navajata Shishu Paricharya — Ulva Parimarjana (Clearing the birth fluid)",
    "domain": "navajata",
    "sanskrit_shloka": "जातमात्रस्य उल्वपरिमार्जनं कर्तव्यम् — मुखनासास्रोतांसि शोधयेत्",
    "transliteration": "jātamātrasya ulvaparimārjanaṃ kartavyam — mukhanāsāsrotāṃsi śodhayet",
    "hindi_meaning": "जन्म लेते ही शिशु के मुख-नासा आदि से उल्व (गर्भोदक/कफ) को साफ़ करें।",
    "english_clinical_summary": "Wipe vernix, amniotic fluid and mucus from the face, mouth and nostrils with clean soft cotton to clear the airway.",
    "dc_dutta_correlation": "Dry & stimulate (rub back/feet); suction only if airway obstructed; place on mother’s chest skin-to-skin (Initial steps of NRP — first 30 s).",
    "keywords": [
      "navajata",
      "newborn",
      "neonate",
      "jatakarma",
      "ulva",
      "cord",
      "nalakartana",
      "pranapratyagamana",
      "colostrum",
      "stanyapana",
      "rakshakarma",
      "swarna prashana",
      "essential newborn care"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Classical Samhitas me iska mukhya chikitsa sutra kya hai?",
      "DC Dutta Obstetrics me iska modern clinical protocol kya hai?",
      "Garbhini ko kab turant hospital review ke liye refer karein?"
    ]
  },
  {
    "month": null,
    "ritu": null,
    "samhita": "charaka",
    "stage": "navajata",
    "sanskrit": "प्राणप्रत्यागमनार्थं शिशुं कर्णमूले ... उष्णोदकेन शीतोदकेन सेचयेत्",
    "iast": "prāṇapratyāgamanārthaṃ śiśuṃ karṇamūle ... uṣṇodakena śītodakena secayet",
    "hindi": "यदि शिशु न रोए तो कान के पास शब्द, जल के छींटे तथा श्वास-पुनःस्थापन उपाय करें।",
    "english": "If the baby does not cry/breathe, stimulate: sound near the ear, alternating warm-cool water sprinkling and restore respiration (Pranapratyagamana).",
    "citation": "Ch. Sha. 8.38; Su. Sha. 10.13",
    "dc_dutta": "NRP: warm, dry, position, clear airway, stimulate; bag-and-mask ventilation within the Golden Minute if apnoea/HR<100; chest compressions if HR<60 despite effective ventilation; APGAR at 1 & 5 min.",
    "red_flags": [
      "Not feeding well / refusing breast",
      "Fast breathing (>60/min), grunting, chest indrawing, central cyanosis",
      "Fever >37.5 °C or hypothermia <36.5 °C",
      "Jaundice within 24 h or reaching palms/soles",
      "Convulsions, lethargy, floppy baby",
      "Cord stump redness/pus, umbilical discharge",
      "No urine in 24 h or no meconium within 48 h"
    ],
    "tags": [
      "navajata",
      "newborn",
      "neonate",
      "jatakarma",
      "ulva",
      "cord",
      "nalakartana",
      "pranapratyagamana",
      "colostrum",
      "stanyapana",
      "rakshakarma",
      "swarna prashana",
      "essential newborn care"
    ],
    "plan": {},
    "id": "nav-1",
    "title": "Navajata Shishu Paricharya — Pranapratyagamana (Resuscitation)",
    "domain": "navajata",
    "sanskrit_shloka": "प्राणप्रत्यागमनार्थं शिशुं कर्णमूले ... उष्णोदकेन शीतोदकेन सेचयेत्",
    "transliteration": "prāṇapratyāgamanārthaṃ śiśuṃ karṇamūle ... uṣṇodakena śītodakena secayet",
    "hindi_meaning": "यदि शिशु न रोए तो कान के पास शब्द, जल के छींटे तथा श्वास-पुनःस्थापन उपाय करें।",
    "english_clinical_summary": "If the baby does not cry/breathe, stimulate: sound near the ear, alternating warm-cool water sprinkling and restore respiration (Pranapratyagamana).",
    "dc_dutta_correlation": "NRP: warm, dry, position, clear airway, stimulate; bag-and-mask ventilation within the Golden Minute if apnoea/HR<100; chest compressions if HR<60 despite effective ventilation; APGAR at 1 & 5 min.",
    "keywords": [
      "navajata",
      "newborn",
      "neonate",
      "jatakarma",
      "ulva",
      "cord",
      "nalakartana",
      "pranapratyagamana",
      "colostrum",
      "stanyapana",
      "rakshakarma",
      "swarna prashana",
      "essential newborn care"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Classical Samhitas me iska mukhya chikitsa sutra kya hai?",
      "DC Dutta Obstetrics me iska modern clinical protocol kya hai?",
      "Garbhini ko kab turant hospital review ke liye refer karein?"
    ]
  },
  {
    "month": null,
    "ritu": null,
    "samhita": "sushruta",
    "stage": "navajata",
    "sanskrit": "नाभिनालं अष्टाङ्गुलमुत्सृज्य छिन्द्यात् सूत्रेण बध्वा",
    "iast": "nābhinālaṃ aṣṭāṅgulam utsṛjya chindyāt sūtreṇa baddhvā",
    "hindi": "नाभिनाल को लगभग आठ अंगुल छोड़कर सूत्र से बाँधकर काटें।",
    "english": "Tie the cord and cut it leaving about 8 Angula (Charaka/Sushruta: at a measured distance from the umbilicus) with clean instrument.",
    "citation": "Su. Sha. 10.14; Ch. Sha. 8.37",
    "dc_dutta": "Delayed cord clamping 1–3 min if baby vigorous; clamp and cut with sterile instruments ~2–3 cm from umbilicus; dry cord care — no application of ghee, cow-dung or powders; hand-hygiene.",
    "red_flags": [
      "Not feeding well / refusing breast",
      "Fast breathing (>60/min), grunting, chest indrawing, central cyanosis",
      "Fever >37.5 °C or hypothermia <36.5 °C",
      "Jaundice within 24 h or reaching palms/soles",
      "Convulsions, lethargy, floppy baby",
      "Cord stump redness/pus, umbilical discharge",
      "No urine in 24 h or no meconium within 48 h"
    ],
    "tags": [
      "navajata",
      "newborn",
      "neonate",
      "jatakarma",
      "ulva",
      "cord",
      "nalakartana",
      "pranapratyagamana",
      "colostrum",
      "stanyapana",
      "rakshakarma",
      "swarna prashana",
      "essential newborn care"
    ],
    "plan": {},
    "id": "nav-2",
    "title": "Navajata Shishu Paricharya — Nalakartana (Cord cutting)",
    "domain": "navajata",
    "sanskrit_shloka": "नाभिनालं अष्टाङ्गुलमुत्सृज्य छिन्द्यात् सूत्रेण बध्वा",
    "transliteration": "nābhinālaṃ aṣṭāṅgulam utsṛjya chindyāt sūtreṇa baddhvā",
    "hindi_meaning": "नाभिनाल को लगभग आठ अंगुल छोड़कर सूत्र से बाँधकर काटें।",
    "english_clinical_summary": "Tie the cord and cut it leaving about 8 Angula (Charaka/Sushruta: at a measured distance from the umbilicus) with clean instrument.",
    "dc_dutta_correlation": "Delayed cord clamping 1–3 min if baby vigorous; clamp and cut with sterile instruments ~2–3 cm from umbilicus; dry cord care — no application of ghee, cow-dung or powders; hand-hygiene.",
    "keywords": [
      "navajata",
      "newborn",
      "neonate",
      "jatakarma",
      "ulva",
      "cord",
      "nalakartana",
      "pranapratyagamana",
      "colostrum",
      "stanyapana",
      "rakshakarma",
      "swarna prashana",
      "essential newborn care"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Classical Samhitas me iska mukhya chikitsa sutra kya hai?",
      "DC Dutta Obstetrics me iska modern clinical protocol kya hai?",
      "Garbhini ko kab turant hospital review ke liye refer karein?"
    ]
  },
  {
    "month": null,
    "ritu": null,
    "samhita": "charaka",
    "stage": "navajata",
    "sanskrit": "मधुसर्पिषी अनन्तमूलीसिद्धे प्राशयेत् जातमात्रं स्वर्णघृष्टम्",
    "iast": "madhusarpiṣī anantamūlasiddhe prāśayet jātamātraṃ svarṇaghṛṣṭam",
    "hindi": "जातकर्म में मधु-घृत (स्वर्ण घिसकर) का प्राशन कराया जाता है।",
    "english": "Classical Jatakarma: honey and ghee (with gold rubbed — Swarna Prashana) given before the breast; Sushruta lists a lick of Madhu-ghrita-Ananta.",
    "citation": "Ch. Sha. 8.46; Su. Sha. 10.17; A.H. Sha. 1.",
    "dc_dutta": "⚠️ WHO/DC Dutta: NO pre-lacteal feeds — exclusive breastfeeding within 1 hour; honey carries risk of infant botulism (<12 months). Do Madhu-Ghrita ONLY if prescribed by physician; colostrum is the first food.",
    "red_flags": [
      "Not feeding well / refusing breast",
      "Fast breathing (>60/min), grunting, chest indrawing, central cyanosis",
      "Fever >37.5 °C or hypothermia <36.5 °C",
      "Jaundice within 24 h or reaching palms/soles",
      "Convulsions, lethargy, floppy baby",
      "Cord stump redness/pus, umbilical discharge",
      "No urine in 24 h or no meconium within 48 h"
    ],
    "tags": [
      "navajata",
      "newborn",
      "neonate",
      "jatakarma",
      "ulva",
      "cord",
      "nalakartana",
      "pranapratyagamana",
      "colostrum",
      "stanyapana",
      "rakshakarma",
      "swarna prashana",
      "essential newborn care"
    ],
    "plan": {},
    "id": "nav-3",
    "title": "Navajata Shishu Paricharya — Jatakarma — Madhu-Ghrita Prashana",
    "domain": "navajata",
    "sanskrit_shloka": "मधुसर्पिषी अनन्तमूलीसिद्धे प्राशयेत् जातमात्रं स्वर्णघृष्टम्",
    "transliteration": "madhusarpiṣī anantamūlasiddhe prāśayet jātamātraṃ svarṇaghṛṣṭam",
    "hindi_meaning": "जातकर्म में मधु-घृत (स्वर्ण घिसकर) का प्राशन कराया जाता है।",
    "english_clinical_summary": "Classical Jatakarma: honey and ghee (with gold rubbed — Swarna Prashana) given before the breast; Sushruta lists a lick of Madhu-ghrita-Ananta.",
    "dc_dutta_correlation": "⚠️ WHO/DC Dutta: NO pre-lacteal feeds — exclusive breastfeeding within 1 hour; honey carries risk of infant botulism (<12 months). Do Madhu-Ghrita ONLY if prescribed by physician; colostrum is the first food.",
    "keywords": [
      "navajata",
      "newborn",
      "neonate",
      "jatakarma",
      "ulva",
      "cord",
      "nalakartana",
      "pranapratyagamana",
      "colostrum",
      "stanyapana",
      "rakshakarma",
      "swarna prashana",
      "essential newborn care"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Classical Samhitas me iska mukhya chikitsa sutra kya hai?",
      "DC Dutta Obstetrics me iska modern clinical protocol kya hai?",
      "Garbhini ko kab turant hospital review ke liye refer karein?"
    ]
  },
  {
    "month": null,
    "ritu": null,
    "samhita": "sushruta",
    "stage": "navajata",
    "sanskrit": "प्रथमं स्तन्यं मात्रा देयं यथाकालं",
    "iast": "prathamaṃ stanyaṃ mātrā deyaṃ yathākālaṃ",
    "hindi": "जन्म के बाद पहले घंटे में माता का दूध (कोलोस्ट्रम) शिशु को दें।",
    "english": "Early suckling with colostrum — Sushruta/Kashyapa advise first Stanya after proper purification; colostrum is the baby’s first immunisation.",
    "citation": "Su. Sha. 10.18; Kashyapa Sa., Kalpa/Sutra Sthana",
    "dc_dutta": "Breastfeed within 1 h; exclusive breastfeeding to 6 months; on-demand 8–12 feeds/day; correct latch; rooming-in.",
    "red_flags": [
      "Not feeding well / refusing breast",
      "Fast breathing (>60/min), grunting, chest indrawing, central cyanosis",
      "Fever >37.5 °C or hypothermia <36.5 °C",
      "Jaundice within 24 h or reaching palms/soles",
      "Convulsions, lethargy, floppy baby",
      "Cord stump redness/pus, umbilical discharge",
      "No urine in 24 h or no meconium within 48 h"
    ],
    "tags": [
      "navajata",
      "newborn",
      "neonate",
      "jatakarma",
      "ulva",
      "cord",
      "nalakartana",
      "pranapratyagamana",
      "colostrum",
      "stanyapana",
      "rakshakarma",
      "swarna prashana",
      "essential newborn care"
    ],
    "plan": {},
    "id": "nav-4",
    "title": "Navajata Shishu Paricharya — Early Stanyapana (Colostrum feeding)",
    "domain": "navajata",
    "sanskrit_shloka": "प्रथमं स्तन्यं मात्रा देयं यथाकालं",
    "transliteration": "prathamaṃ stanyaṃ mātrā deyaṃ yathākālaṃ",
    "hindi_meaning": "जन्म के बाद पहले घंटे में माता का दूध (कोलोस्ट्रम) शिशु को दें।",
    "english_clinical_summary": "Early suckling with colostrum — Sushruta/Kashyapa advise first Stanya after proper purification; colostrum is the baby’s first immunisation.",
    "dc_dutta_correlation": "Breastfeed within 1 h; exclusive breastfeeding to 6 months; on-demand 8–12 feeds/day; correct latch; rooming-in.",
    "keywords": [
      "navajata",
      "newborn",
      "neonate",
      "jatakarma",
      "ulva",
      "cord",
      "nalakartana",
      "pranapratyagamana",
      "colostrum",
      "stanyapana",
      "rakshakarma",
      "swarna prashana",
      "essential newborn care"
    ],
    "sthana": "Sutra Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Classical Samhitas me iska mukhya chikitsa sutra kya hai?",
      "DC Dutta Obstetrics me iska modern clinical protocol kya hai?",
      "Garbhini ko kab turant hospital review ke liye refer karein?"
    ]
  },
  {
    "month": null,
    "ritu": null,
    "samhita": "charaka",
    "stage": "navajata",
    "sanskrit": "रक्षोघ्नैर्धूपनैः सूतिकागारं रक्षेत्",
    "iast": "rakṣoghnair dhūpanaiḥ sūtikāgāraṃ rakṣet",
    "hindi": "रक्षोघ्न धूपन से सूतिकागार तथा शिशु की रक्षा करें।",
    "english": "Protect the baby and the Sutikagara with Rakshoghna Dhupana (fumigation with Guggulu, Sarshapa, Vacha), cleanliness and avoidance of visitors — infection control (Rakshoghna).",
    "citation": "Ch. Sha. 8; Su. Sha. 10; Kashyapa Sa. Kalpa Sthana",
    "dc_dutta": "Hand-washing, clean delivery room, limit visitors, kangaroo mother care, clean cord stump, avoid sick contacts, skin-to-skin; keep room well-ventilated (fumigation only with good ventilation, not near the infant’s face).",
    "red_flags": [
      "Not feeding well / refusing breast",
      "Fast breathing (>60/min), grunting, chest indrawing, central cyanosis",
      "Fever >37.5 °C or hypothermia <36.5 °C",
      "Jaundice within 24 h or reaching palms/soles",
      "Convulsions, lethargy, floppy baby",
      "Cord stump redness/pus, umbilical discharge",
      "No urine in 24 h or no meconium within 48 h"
    ],
    "tags": [
      "navajata",
      "newborn",
      "neonate",
      "jatakarma",
      "ulva",
      "cord",
      "nalakartana",
      "pranapratyagamana",
      "colostrum",
      "stanyapana",
      "rakshakarma",
      "swarna prashana",
      "essential newborn care"
    ],
    "plan": {},
    "id": "nav-5",
    "title": "Navajata Shishu Paricharya — Rakshakarma (Protective Hygiene)",
    "domain": "navajata",
    "sanskrit_shloka": "रक्षोघ्नैर्धूपनैः सूतिकागारं रक्षेत्",
    "transliteration": "rakṣoghnair dhūpanaiḥ sūtikāgāraṃ rakṣet",
    "hindi_meaning": "रक्षोघ्न धूपन से सूतिकागार तथा शिशु की रक्षा करें।",
    "english_clinical_summary": "Protect the baby and the Sutikagara with Rakshoghna Dhupana (fumigation with Guggulu, Sarshapa, Vacha), cleanliness and avoidance of visitors — infection control (Rakshoghna).",
    "dc_dutta_correlation": "Hand-washing, clean delivery room, limit visitors, kangaroo mother care, clean cord stump, avoid sick contacts, skin-to-skin; keep room well-ventilated (fumigation only with good ventilation, not near the infant’s face).",
    "keywords": [
      "navajata",
      "newborn",
      "neonate",
      "jatakarma",
      "ulva",
      "cord",
      "nalakartana",
      "pranapratyagamana",
      "colostrum",
      "stanyapana",
      "rakshakarma",
      "swarna prashana",
      "essential newborn care"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Classical Samhitas me iska mukhya chikitsa sutra kya hai?",
      "DC Dutta Obstetrics me iska modern clinical protocol kya hai?",
      "Garbhini ko kab turant hospital review ke liye refer karein?"
    ]
  },
  {
    "month": null,
    "ritu": null,
    "samhita": "sushruta",
    "stage": "navajata",
    "sanskrit": "तैलाभ्यङ्गः कोष्णजलस्नानं च शिशोः",
    "iast": "tailābhyaṅgaḥ koṣṇajalasnānaṃ ca śiśoḥ",
    "hindi": "शिशु को हल्के तेल से अभ्यंग एवं गुनगुने जल से स्नान कराएँ।",
    "english": "Gentle oil massage and a warm-water bath; keep the baby warm (Ushna-Ghara).",
    "citation": "Su. Sha. 10; A.H. Sha. 1",
    "dc_dutta": "Delay first bath ≥24 h (WHO); then warm water; massage with mustard/sesame/coconut oil if no skin issue; maintain warm chain (room temp 25–28 °C), cover head; weigh and check temperature.",
    "red_flags": [
      "Not feeding well / refusing breast",
      "Fast breathing (>60/min), grunting, chest indrawing, central cyanosis",
      "Fever >37.5 °C or hypothermia <36.5 °C",
      "Jaundice within 24 h or reaching palms/soles",
      "Convulsions, lethargy, floppy baby",
      "Cord stump redness/pus, umbilical discharge",
      "No urine in 24 h or no meconium within 48 h"
    ],
    "tags": [
      "navajata",
      "newborn",
      "neonate",
      "jatakarma",
      "ulva",
      "cord",
      "nalakartana",
      "pranapratyagamana",
      "colostrum",
      "stanyapana",
      "rakshakarma",
      "swarna prashana",
      "essential newborn care"
    ],
    "plan": {},
    "id": "nav-6",
    "title": "Navajata Shishu Paricharya — Abhyanga, Snana & Rakshana",
    "domain": "navajata",
    "sanskrit_shloka": "तैलाभ्यङ्गः कोष्णजलस्नानं च शिशोः",
    "transliteration": "tailābhyaṅgaḥ koṣṇajalasnānaṃ ca śiśoḥ",
    "hindi_meaning": "शिशु को हल्के तेल से अभ्यंग एवं गुनगुने जल से स्नान कराएँ।",
    "english_clinical_summary": "Gentle oil massage and a warm-water bath; keep the baby warm (Ushna-Ghara).",
    "dc_dutta_correlation": "Delay first bath ≥24 h (WHO); then warm water; massage with mustard/sesame/coconut oil if no skin issue; maintain warm chain (room temp 25–28 °C), cover head; weigh and check temperature.",
    "keywords": [
      "navajata",
      "newborn",
      "neonate",
      "jatakarma",
      "ulva",
      "cord",
      "nalakartana",
      "pranapratyagamana",
      "colostrum",
      "stanyapana",
      "rakshakarma",
      "swarna prashana",
      "essential newborn care"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Classical Samhitas me iska mukhya chikitsa sutra kya hai?",
      "DC Dutta Obstetrics me iska modern clinical protocol kya hai?",
      "Garbhini ko kab turant hospital review ke liye refer karein?"
    ]
  },
  {
    "month": null,
    "ritu": null,
    "samhita": "dcdutta",
    "stage": "navajata",
    "sanskrit": "",
    "iast": "",
    "hindi": "",
    "english": "Dry & warm, clear airway, APGAR, delayed cord clamping, skin-to-skin, breastfeeding within 1 hour, Vitamin K 1 mg IM, BCG + OPV-0 + Hepatitis-B birth dose, eye-care, weight; no pre-lacteal feeds; exclusive breastfeeding for 6 months; kangaroo care for LBW; monitor jaundice, feeding, temperature, breathing; schedule check-ups on day 3, 7 and 6 weeks; immunisation per UIP/IAP.",
    "citation": "DC Dutta — The Newborn Infant / Essential Newborn Care",
    "dc_dutta": "Dry & warm, clear airway, APGAR, delayed cord clamping, skin-to-skin, breastfeeding within 1 hour, Vitamin K 1 mg IM, BCG + OPV-0 + Hepatitis-B birth dose, eye-care, weight; no pre-lacteal feeds; exclusive breastfeeding for 6 months; kangaroo care for LBW; monitor jaundice, feeding, temperature, breathing; schedule check-ups on day 3, 7 and 6 weeks; immunisation per UIP/IAP.",
    "red_flags": [
      "Not feeding well / refusing breast",
      "Fast breathing (>60/min), grunting, chest indrawing, central cyanosis",
      "Fever >37.5 °C or hypothermia <36.5 °C",
      "Jaundice within 24 h or reaching palms/soles",
      "Convulsions, lethargy, floppy baby",
      "Cord stump redness/pus, umbilical discharge",
      "No urine in 24 h or no meconium within 48 h"
    ],
    "tags": [
      "newborn",
      "essential newborn care",
      "apgar",
      "vitamin k",
      "bcg",
      "breastfeeding",
      "kangaroo"
    ],
    "plan": {},
    "id": "nav-dd",
    "title": "Essential Newborn Care (DC Dutta / WHO / NRP)",
    "domain": "navajata",
    "sanskrit_shloka": "",
    "transliteration": "",
    "hindi_meaning": "",
    "english_clinical_summary": "Dry & warm, clear airway, APGAR, delayed cord clamping, skin-to-skin, breastfeeding within 1 hour, Vitamin K 1 mg IM, BCG + OPV-0 + Hepatitis-B birth dose, eye-care, weight; no pre-lacteal feeds; exclusive breastfeeding for 6 months; kangaroo care for LBW; monitor jaundice, feeding, temperature, breathing; schedule check-ups on day 3, 7 and 6 weeks; immunisation per UIP/IAP.",
    "dc_dutta_correlation": "Dry & warm, clear airway, APGAR, delayed cord clamping, skin-to-skin, breastfeeding within 1 hour, Vitamin K 1 mg IM, BCG + OPV-0 + Hepatitis-B birth dose, eye-care, weight; no pre-lacteal feeds; exclusive breastfeeding for 6 months; kangaroo care for LBW; monitor jaundice, feeding, temperature, breathing; schedule check-ups on day 3, 7 and 6 weeks; immunisation per UIP/IAP.",
    "keywords": [
      "newborn",
      "essential newborn care",
      "apgar",
      "vitamin k",
      "bcg",
      "breastfeeding",
      "kangaroo"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Classical Samhitas me iska mukhya chikitsa sutra kya hai?",
      "DC Dutta Obstetrics me iska modern clinical protocol kya hai?",
      "Garbhini ko kab turant hospital review ke liye refer karein?"
    ]
  },
  {
    "month": null,
    "ritu": null,
    "samhita": "dcdutta",
    "stage": "red_flag",
    "sanskrit": "",
    "iast": "",
    "hindi": "",
    "english": "Pre-eclampsia / Eclampsia: BP ≥140/90 mmHg after 20 weeks; severe headache; blurred vision; epigastric pain; facial & hand swelling; sudden weight gain; ↓ urine; proteinuria; convulsion = eclampsia. Action: Same-day hospital referral. Magnesium sulphate for severe disease/eclampsia; antihypertensives (labetalol, nifedipine); delivery planning.",
    "citation": "DC Dutta — Hypertensive Disorders of Pregnancy",
    "dc_dutta": "Pre-eclampsia / Eclampsia — BP ≥140/90 mmHg after 20 weeks; severe headache; blurred vision; epigastric pain; facial & hand swelling; sudden weight gain; ↓ urine; proteinuria; convulsion = eclampsia. Management: Same-day hospital referral. Magnesium sulphate for severe disease/eclampsia; antihypertensives (labetalol, nifedipine); delivery planning.",
    "red_flags": [
      "Pre-eclampsia / Eclampsia: BP ≥140/90 mmHg after 20 weeks; severe headache; blurred vision; epigastric pain; facial & hand swelling; sudden weight gain; ↓ urine; proteinuria; convulsion = eclampsia"
    ],
    "tags": [
      "red flag",
      "danger signs",
      "emergency",
      "warning",
      "pre-eclampsia / eclampsia",
      "pre-eclampsia",
      "aph",
      "bleeding",
      "fetal movement",
      "anaemia",
      "anemia",
      "hospital"
    ],
    "plan": {},
    "id": "rf-0",
    "title": "Obstetric Red Flag — Pre-eclampsia / Eclampsia",
    "domain": "red_flag",
    "sanskrit_shloka": "",
    "transliteration": "",
    "hindi_meaning": "",
    "english_clinical_summary": "Pre-eclampsia / Eclampsia: BP ≥140/90 mmHg after 20 weeks; severe headache; blurred vision; epigastric pain; facial & hand swelling; sudden weight gain; ↓ urine; proteinuria; convulsion = eclampsia. Action: Same-day hospital referral. Magnesium sulphate for severe disease/eclampsia; antihypertensives (labetalol, nifedipine); delivery planning.",
    "dc_dutta_correlation": "Pre-eclampsia / Eclampsia — BP ≥140/90 mmHg after 20 weeks; severe headache; blurred vision; epigastric pain; facial & hand swelling; sudden weight gain; ↓ urine; proteinuria; convulsion = eclampsia. Management: Same-day hospital referral. Magnesium sulphate for severe disease/eclampsia; antihypertensives (labetalol, nifedipine); delivery planning.",
    "keywords": [
      "red flag",
      "danger signs",
      "emergency",
      "warning",
      "pre-eclampsia / eclampsia",
      "pre-eclampsia",
      "aph",
      "bleeding",
      "fetal movement",
      "anaemia",
      "anemia",
      "hospital"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Classical Samhitas me iska mukhya chikitsa sutra kya hai?",
      "DC Dutta Obstetrics me iska modern clinical protocol kya hai?",
      "Garbhini ko kab turant hospital review ke liye refer karein?"
    ]
  },
  {
    "month": null,
    "ritu": null,
    "samhita": "dcdutta",
    "stage": "red_flag",
    "sanskrit": "",
    "iast": "",
    "hindi": "",
    "english": "Antepartum Haemorrhage (APH): ANY bleeding PV after 28 weeks — painless (placenta praevia) or painful with woody-hard uterus (abruptio placentae). Do NOT perform PV exam.. Action: Emergency admission; IV access, cross-match, USG for placental site, delivery as per severity.",
    "citation": "DC Dutta — Antepartum Haemorrhage",
    "dc_dutta": "Antepartum Haemorrhage (APH) — ANY bleeding PV after 28 weeks — painless (placenta praevia) or painful with woody-hard uterus (abruptio placentae). Do NOT perform PV exam.. Management: Emergency admission; IV access, cross-match, USG for placental site, delivery as per severity.",
    "red_flags": [
      "Antepartum Haemorrhage (APH): ANY bleeding PV after 28 weeks — painless (placenta praevia) or painful with woody-hard uterus (abruptio placentae). Do NOT perform PV exam."
    ],
    "tags": [
      "red flag",
      "danger signs",
      "emergency",
      "warning",
      "antepartum haemorrhage (aph)",
      "pre-eclampsia",
      "aph",
      "bleeding",
      "fetal movement",
      "anaemia",
      "anemia",
      "hospital"
    ],
    "plan": {},
    "id": "rf-1",
    "title": "Obstetric Red Flag — Antepartum Haemorrhage (APH)",
    "domain": "red_flag",
    "sanskrit_shloka": "",
    "transliteration": "",
    "hindi_meaning": "",
    "english_clinical_summary": "Antepartum Haemorrhage (APH): ANY bleeding PV after 28 weeks — painless (placenta praevia) or painful with woody-hard uterus (abruptio placentae). Do NOT perform PV exam.. Action: Emergency admission; IV access, cross-match, USG for placental site, delivery as per severity.",
    "dc_dutta_correlation": "Antepartum Haemorrhage (APH) — ANY bleeding PV after 28 weeks — painless (placenta praevia) or painful with woody-hard uterus (abruptio placentae). Do NOT perform PV exam.. Management: Emergency admission; IV access, cross-match, USG for placental site, delivery as per severity.",
    "keywords": [
      "red flag",
      "danger signs",
      "emergency",
      "warning",
      "antepartum haemorrhage (aph)",
      "pre-eclampsia",
      "aph",
      "bleeding",
      "fetal movement",
      "anaemia",
      "anemia",
      "hospital"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Classical Samhitas me iska mukhya chikitsa sutra kya hai?",
      "DC Dutta Obstetrics me iska modern clinical protocol kya hai?",
      "Garbhini ko kab turant hospital review ke liye refer karein?"
    ]
  },
  {
    "month": null,
    "ritu": null,
    "samhita": "dcdutta",
    "stage": "red_flag",
    "sanskrit": "",
    "iast": "",
    "hindi": "",
    "english": "Reduced / Absent Fetal Movements: <10 movements in 12 hours (Kick count) or no movement by 22 weeks. Action: Immediate NST / USG / Doppler, hydration, left-lateral rest; urgent obstetric review.",
    "citation": "DC Dutta — Fetal Surveillance",
    "dc_dutta": "Reduced / Absent Fetal Movements — <10 movements in 12 hours (Kick count) or no movement by 22 weeks. Management: Immediate NST / USG / Doppler, hydration, left-lateral rest; urgent obstetric review.",
    "red_flags": [
      "Reduced / Absent Fetal Movements: <10 movements in 12 hours (Kick count) or no movement by 22 weeks"
    ],
    "tags": [
      "red flag",
      "danger signs",
      "emergency",
      "warning",
      "reduced / absent fetal movements",
      "pre-eclampsia",
      "aph",
      "bleeding",
      "fetal movement",
      "anaemia",
      "anemia",
      "hospital"
    ],
    "plan": {},
    "id": "rf-2",
    "title": "Obstetric Red Flag — Reduced / Absent Fetal Movements",
    "domain": "red_flag",
    "sanskrit_shloka": "",
    "transliteration": "",
    "hindi_meaning": "",
    "english_clinical_summary": "Reduced / Absent Fetal Movements: <10 movements in 12 hours (Kick count) or no movement by 22 weeks. Action: Immediate NST / USG / Doppler, hydration, left-lateral rest; urgent obstetric review.",
    "dc_dutta_correlation": "Reduced / Absent Fetal Movements — <10 movements in 12 hours (Kick count) or no movement by 22 weeks. Management: Immediate NST / USG / Doppler, hydration, left-lateral rest; urgent obstetric review.",
    "keywords": [
      "red flag",
      "danger signs",
      "emergency",
      "warning",
      "reduced / absent fetal movements",
      "pre-eclampsia",
      "aph",
      "bleeding",
      "fetal movement",
      "anaemia",
      "anemia",
      "hospital"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Classical Samhitas me iska mukhya chikitsa sutra kya hai?",
      "DC Dutta Obstetrics me iska modern clinical protocol kya hai?",
      "Garbhini ko kab turant hospital review ke liye refer karein?"
    ]
  },
  {
    "month": null,
    "ritu": null,
    "samhita": "dcdutta",
    "stage": "red_flag",
    "sanskrit": "",
    "iast": "",
    "hindi": "",
    "english": "Severe Anaemia in Pregnancy: Hb < 7 g/dl: breathlessness, palpitation, pallor, edema, fatigue; Hb 7–9.9 = moderate to mild. Action: Parenteral iron/blood transfusion (if Hb<5 or near term with decompensation); investigate cause; counsel on diet.",
    "citation": "DC Dutta — Anaemia in Pregnancy",
    "dc_dutta": "Severe Anaemia in Pregnancy — Hb < 7 g/dl: breathlessness, palpitation, pallor, edema, fatigue; Hb 7–9.9 = moderate to mild. Management: Parenteral iron/blood transfusion (if Hb<5 or near term with decompensation); investigate cause; counsel on diet.",
    "red_flags": [
      "Severe Anaemia in Pregnancy: Hb < 7 g/dl: breathlessness, palpitation, pallor, edema, fatigue; Hb 7–9.9 = moderate to mild"
    ],
    "tags": [
      "red flag",
      "danger signs",
      "emergency",
      "warning",
      "severe anaemia in pregnancy",
      "pre-eclampsia",
      "aph",
      "bleeding",
      "fetal movement",
      "anaemia",
      "anemia",
      "hospital"
    ],
    "plan": {},
    "id": "rf-3",
    "title": "Obstetric Red Flag — Severe Anaemia in Pregnancy",
    "domain": "red_flag",
    "sanskrit_shloka": "",
    "transliteration": "",
    "hindi_meaning": "",
    "english_clinical_summary": "Severe Anaemia in Pregnancy: Hb < 7 g/dl: breathlessness, palpitation, pallor, edema, fatigue; Hb 7–9.9 = moderate to mild. Action: Parenteral iron/blood transfusion (if Hb<5 or near term with decompensation); investigate cause; counsel on diet.",
    "dc_dutta_correlation": "Severe Anaemia in Pregnancy — Hb < 7 g/dl: breathlessness, palpitation, pallor, edema, fatigue; Hb 7–9.9 = moderate to mild. Management: Parenteral iron/blood transfusion (if Hb<5 or near term with decompensation); investigate cause; counsel on diet.",
    "keywords": [
      "red flag",
      "danger signs",
      "emergency",
      "warning",
      "severe anaemia in pregnancy",
      "pre-eclampsia",
      "aph",
      "bleeding",
      "fetal movement",
      "anaemia",
      "anemia",
      "hospital"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Classical Samhitas me iska mukhya chikitsa sutra kya hai?",
      "DC Dutta Obstetrics me iska modern clinical protocol kya hai?",
      "Garbhini ko kab turant hospital review ke liye refer karein?"
    ]
  },
  {
    "month": null,
    "ritu": null,
    "samhita": "dcdutta",
    "stage": "red_flag",
    "sanskrit": "",
    "iast": "",
    "hindi": "",
    "english": "PPROM / Preterm Labour: Leaking watery fluid <37 weeks; regular painful contractions; pelvic pressure; bloody show. Action: Admit, antenatal steroids, tocolysis if appropriate, antibiotics for PPROM, neonatal ICU preparation.",
    "citation": "DC Dutta — Preterm Labour & PROM",
    "dc_dutta": "PPROM / Preterm Labour — Leaking watery fluid <37 weeks; regular painful contractions; pelvic pressure; bloody show. Management: Admit, antenatal steroids, tocolysis if appropriate, antibiotics for PPROM, neonatal ICU preparation.",
    "red_flags": [
      "PPROM / Preterm Labour: Leaking watery fluid <37 weeks; regular painful contractions; pelvic pressure; bloody show"
    ],
    "tags": [
      "red flag",
      "danger signs",
      "emergency",
      "warning",
      "pprom / preterm labour",
      "pre-eclampsia",
      "aph",
      "bleeding",
      "fetal movement",
      "anaemia",
      "anemia",
      "hospital"
    ],
    "plan": {},
    "id": "rf-4",
    "title": "Obstetric Red Flag — PPROM / Preterm Labour",
    "domain": "red_flag",
    "sanskrit_shloka": "",
    "transliteration": "",
    "hindi_meaning": "",
    "english_clinical_summary": "PPROM / Preterm Labour: Leaking watery fluid <37 weeks; regular painful contractions; pelvic pressure; bloody show. Action: Admit, antenatal steroids, tocolysis if appropriate, antibiotics for PPROM, neonatal ICU preparation.",
    "dc_dutta_correlation": "PPROM / Preterm Labour — Leaking watery fluid <37 weeks; regular painful contractions; pelvic pressure; bloody show. Management: Admit, antenatal steroids, tocolysis if appropriate, antibiotics for PPROM, neonatal ICU preparation.",
    "keywords": [
      "red flag",
      "danger signs",
      "emergency",
      "warning",
      "pprom / preterm labour",
      "pre-eclampsia",
      "aph",
      "bleeding",
      "fetal movement",
      "anaemia",
      "anemia",
      "hospital"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Classical Samhitas me iska mukhya chikitsa sutra kya hai?",
      "DC Dutta Obstetrics me iska modern clinical protocol kya hai?",
      "Garbhini ko kab turant hospital review ke liye refer karein?"
    ]
  },
  {
    "month": null,
    "ritu": null,
    "samhita": "dcdutta",
    "stage": "red_flag",
    "sanskrit": "",
    "iast": "",
    "hindi": "",
    "english": "Gestational Diabetes / Hyperglycaemia: OGTT 75 g: fasting ≥92, 1h ≥180, 2h ≥153 (IADPSG) or 2h ≥140 mg/dl (DIPSI); polyuria, polydipsia, recurrent infections, macrosomia. Action: Medical nutrition therapy; glucose monitoring; insulin/metformin if needed; fetal growth scans.",
    "citation": "DC Dutta — Diabetes in Pregnancy",
    "dc_dutta": "Gestational Diabetes / Hyperglycaemia — OGTT 75 g: fasting ≥92, 1h ≥180, 2h ≥153 (IADPSG) or 2h ≥140 mg/dl (DIPSI); polyuria, polydipsia, recurrent infections, macrosomia. Management: Medical nutrition therapy; glucose monitoring; insulin/metformin if needed; fetal growth scans.",
    "red_flags": [
      "Gestational Diabetes / Hyperglycaemia: OGTT 75 g: fasting ≥92, 1h ≥180, 2h ≥153 (IADPSG) or 2h ≥140 mg/dl (DIPSI); polyuria, polydipsia, recurrent infections, macrosomia"
    ],
    "tags": [
      "red flag",
      "danger signs",
      "emergency",
      "warning",
      "gestational diabetes / hyperglycaemia",
      "pre-eclampsia",
      "aph",
      "bleeding",
      "fetal movement",
      "anaemia",
      "anemia",
      "hospital"
    ],
    "plan": {},
    "id": "rf-5",
    "title": "Obstetric Red Flag — Gestational Diabetes / Hyperglycaemia",
    "domain": "red_flag",
    "sanskrit_shloka": "",
    "transliteration": "",
    "hindi_meaning": "",
    "english_clinical_summary": "Gestational Diabetes / Hyperglycaemia: OGTT 75 g: fasting ≥92, 1h ≥180, 2h ≥153 (IADPSG) or 2h ≥140 mg/dl (DIPSI); polyuria, polydipsia, recurrent infections, macrosomia. Action: Medical nutrition therapy; glucose monitoring; insulin/metformin if needed; fetal growth scans.",
    "dc_dutta_correlation": "Gestational Diabetes / Hyperglycaemia — OGTT 75 g: fasting ≥92, 1h ≥180, 2h ≥153 (IADPSG) or 2h ≥140 mg/dl (DIPSI); polyuria, polydipsia, recurrent infections, macrosomia. Management: Medical nutrition therapy; glucose monitoring; insulin/metformin if needed; fetal growth scans.",
    "keywords": [
      "red flag",
      "danger signs",
      "emergency",
      "warning",
      "gestational diabetes / hyperglycaemia",
      "pre-eclampsia",
      "aph",
      "bleeding",
      "fetal movement",
      "anaemia",
      "anemia",
      "hospital"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Classical Samhitas me iska mukhya chikitsa sutra kya hai?",
      "DC Dutta Obstetrics me iska modern clinical protocol kya hai?",
      "Garbhini ko kab turant hospital review ke liye refer karein?"
    ]
  },
  {
    "month": null,
    "ritu": null,
    "samhita": "dcdutta",
    "stage": "red_flag",
    "sanskrit": "",
    "iast": "",
    "hindi": "",
    "english": "Hyperemesis Gravidarum: Persistent vomiting, ketonuria, weight loss >5%, dehydration. Action: IV fluids, antiemetics, thiamine; rule out molar pregnancy and thyrotoxicosis.",
    "citation": "DC Dutta — Hyperemesis Gravidarum",
    "dc_dutta": "Hyperemesis Gravidarum — Persistent vomiting, ketonuria, weight loss >5%, dehydration. Management: IV fluids, antiemetics, thiamine; rule out molar pregnancy and thyrotoxicosis.",
    "red_flags": [
      "Hyperemesis Gravidarum: Persistent vomiting, ketonuria, weight loss >5%, dehydration"
    ],
    "tags": [
      "red flag",
      "danger signs",
      "emergency",
      "warning",
      "hyperemesis gravidarum",
      "pre-eclampsia",
      "aph",
      "bleeding",
      "fetal movement",
      "anaemia",
      "anemia",
      "hospital"
    ],
    "plan": {},
    "id": "rf-6",
    "title": "Obstetric Red Flag — Hyperemesis Gravidarum",
    "domain": "red_flag",
    "sanskrit_shloka": "",
    "transliteration": "",
    "hindi_meaning": "",
    "english_clinical_summary": "Hyperemesis Gravidarum: Persistent vomiting, ketonuria, weight loss >5%, dehydration. Action: IV fluids, antiemetics, thiamine; rule out molar pregnancy and thyrotoxicosis.",
    "dc_dutta_correlation": "Hyperemesis Gravidarum — Persistent vomiting, ketonuria, weight loss >5%, dehydration. Management: IV fluids, antiemetics, thiamine; rule out molar pregnancy and thyrotoxicosis.",
    "keywords": [
      "red flag",
      "danger signs",
      "emergency",
      "warning",
      "hyperemesis gravidarum",
      "pre-eclampsia",
      "aph",
      "bleeding",
      "fetal movement",
      "anaemia",
      "anemia",
      "hospital"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Classical Samhitas me iska mukhya chikitsa sutra kya hai?",
      "DC Dutta Obstetrics me iska modern clinical protocol kya hai?",
      "Garbhini ko kab turant hospital review ke liye refer karein?"
    ]
  },
  {
    "month": null,
    "ritu": null,
    "samhita": "dcdutta",
    "stage": "red_flag",
    "sanskrit": "",
    "iast": "",
    "hindi": "",
    "english": "Infection / Fever in Pregnancy: Fever >38 °C, burning micturition, foul discharge, jaundice, rash; malaria / dengue / hepatitis E in monsoon. Action: Urgent investigation (CBC, urine culture, malaria/dengue test); never self-treat; treat as an obstetric emergency if ill-looking.",
    "citation": "DC Dutta — Infections in Pregnancy",
    "dc_dutta": "Infection / Fever in Pregnancy — Fever >38 °C, burning micturition, foul discharge, jaundice, rash; malaria / dengue / hepatitis E in monsoon. Management: Urgent investigation (CBC, urine culture, malaria/dengue test); never self-treat; treat as an obstetric emergency if ill-looking.",
    "red_flags": [
      "Infection / Fever in Pregnancy: Fever >38 °C, burning micturition, foul discharge, jaundice, rash; malaria / dengue / hepatitis E in monsoon"
    ],
    "tags": [
      "red flag",
      "danger signs",
      "emergency",
      "warning",
      "infection / fever in pregnancy",
      "pre-eclampsia",
      "aph",
      "bleeding",
      "fetal movement",
      "anaemia",
      "anemia",
      "hospital"
    ],
    "plan": {},
    "id": "rf-7",
    "title": "Obstetric Red Flag — Infection / Fever in Pregnancy",
    "domain": "red_flag",
    "sanskrit_shloka": "",
    "transliteration": "",
    "hindi_meaning": "",
    "english_clinical_summary": "Infection / Fever in Pregnancy: Fever >38 °C, burning micturition, foul discharge, jaundice, rash; malaria / dengue / hepatitis E in monsoon. Action: Urgent investigation (CBC, urine culture, malaria/dengue test); never self-treat; treat as an obstetric emergency if ill-looking.",
    "dc_dutta_correlation": "Infection / Fever in Pregnancy — Fever >38 °C, burning micturition, foul discharge, jaundice, rash; malaria / dengue / hepatitis E in monsoon. Management: Urgent investigation (CBC, urine culture, malaria/dengue test); never self-treat; treat as an obstetric emergency if ill-looking.",
    "keywords": [
      "red flag",
      "danger signs",
      "emergency",
      "warning",
      "infection / fever in pregnancy",
      "pre-eclampsia",
      "aph",
      "bleeding",
      "fetal movement",
      "anaemia",
      "anemia",
      "hospital"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Classical Samhitas me iska mukhya chikitsa sutra kya hai?",
      "DC Dutta Obstetrics me iska modern clinical protocol kya hai?",
      "Garbhini ko kab turant hospital review ke liye refer karein?"
    ]
  },
  {
    "month": null,
    "ritu": null,
    "samhita": "dcdutta",
    "stage": "red_flag",
    "sanskrit": "",
    "iast": "",
    "hindi": "",
    "english": "Obstetric Cholestasis: Itching of palms/soles worse at night without rash; dark urine. Action: LFT and bile acids; ursodeoxycholic acid; fetal surveillance and timed delivery ~37 weeks.",
    "citation": "DC Dutta — Medical Disorders in Pregnancy",
    "dc_dutta": "Obstetric Cholestasis — Itching of palms/soles worse at night without rash; dark urine. Management: LFT and bile acids; ursodeoxycholic acid; fetal surveillance and timed delivery ~37 weeks.",
    "red_flags": [
      "Obstetric Cholestasis: Itching of palms/soles worse at night without rash; dark urine"
    ],
    "tags": [
      "red flag",
      "danger signs",
      "emergency",
      "warning",
      "obstetric cholestasis",
      "pre-eclampsia",
      "aph",
      "bleeding",
      "fetal movement",
      "anaemia",
      "anemia",
      "hospital"
    ],
    "plan": {},
    "id": "rf-8",
    "title": "Obstetric Red Flag — Obstetric Cholestasis",
    "domain": "red_flag",
    "sanskrit_shloka": "",
    "transliteration": "",
    "hindi_meaning": "",
    "english_clinical_summary": "Obstetric Cholestasis: Itching of palms/soles worse at night without rash; dark urine. Action: LFT and bile acids; ursodeoxycholic acid; fetal surveillance and timed delivery ~37 weeks.",
    "dc_dutta_correlation": "Obstetric Cholestasis — Itching of palms/soles worse at night without rash; dark urine. Management: LFT and bile acids; ursodeoxycholic acid; fetal surveillance and timed delivery ~37 weeks.",
    "keywords": [
      "red flag",
      "danger signs",
      "emergency",
      "warning",
      "obstetric cholestasis",
      "pre-eclampsia",
      "aph",
      "bleeding",
      "fetal movement",
      "anaemia",
      "anemia",
      "hospital"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Classical Samhitas me iska mukhya chikitsa sutra kya hai?",
      "DC Dutta Obstetrics me iska modern clinical protocol kya hai?",
      "Garbhini ko kab turant hospital review ke liye refer karein?"
    ]
  },
  {
    "month": null,
    "ritu": null,
    "samhita": "dcdutta",
    "stage": "red_flag",
    "sanskrit": "",
    "iast": "",
    "hindi": "",
    "english": "Emotional Red Flags: Persistent sadness, hopelessness, thoughts of self-harm, panic. Action: Immediate support and referral to psychiatry; involve family; screen using EPDS.",
    "citation": "DC Dutta — Psychiatric Disorders in Pregnancy & Puerperium",
    "dc_dutta": "Emotional Red Flags — Persistent sadness, hopelessness, thoughts of self-harm, panic. Management: Immediate support and referral to psychiatry; involve family; screen using EPDS.",
    "red_flags": [
      "Emotional Red Flags: Persistent sadness, hopelessness, thoughts of self-harm, panic"
    ],
    "tags": [
      "red flag",
      "danger signs",
      "emergency",
      "warning",
      "emotional red flags",
      "pre-eclampsia",
      "aph",
      "bleeding",
      "fetal movement",
      "anaemia",
      "anemia",
      "hospital"
    ],
    "plan": {},
    "id": "rf-9",
    "title": "Obstetric Red Flag — Emotional Red Flags",
    "domain": "red_flag",
    "sanskrit_shloka": "",
    "transliteration": "",
    "hindi_meaning": "",
    "english_clinical_summary": "Emotional Red Flags: Persistent sadness, hopelessness, thoughts of self-harm, panic. Action: Immediate support and referral to psychiatry; involve family; screen using EPDS.",
    "dc_dutta_correlation": "Emotional Red Flags — Persistent sadness, hopelessness, thoughts of self-harm, panic. Management: Immediate support and referral to psychiatry; involve family; screen using EPDS.",
    "keywords": [
      "red flag",
      "danger signs",
      "emergency",
      "warning",
      "emotional red flags",
      "pre-eclampsia",
      "aph",
      "bleeding",
      "fetal movement",
      "anaemia",
      "anemia",
      "hospital"
    ],
    "sthana": "Sharira Sthana",
    "chapter_name": "Classical Adhyaya",
    "samprapti_yukti": "Vata-Pitta equilibrium is maintained via Snigdha, Madhura, and Sheeta Gunas. Supports Rasa Dhatu circulation to Garbha and prevents Dhatu Kshaya.",
    "related_questions": [
      "Classical Samhitas me iska mukhya chikitsa sutra kya hai?",
      "DC Dutta Obstetrics me iska modern clinical protocol kya hai?",
      "Garbhini ko kab turant hospital review ke liye refer karein?"
    ]
  }
];

  function buildCorpus() {
    return SAMHITA_CORPUS;
  }

  /* ---------------- Local search (offline fallback for /api/ask) ---------------- */
  const STOP = new Set("a an the of and or to in is are for with what which how do does can i my me should be at on by from it this that when why during".split(" "));
  const tok = (s) => (s.toLowerCase().match(/[a-z0-9\u0900-\u097f]+/g) || []).filter((w) => !STOP.has(w));
  const ORD = { first: 1, "1st": 1, second: 2, "2nd": 2, third: 3, "3rd": 3, fourth: 4, "4th": 4, fifth: 5, "5th": 5, sixth: 6, "6th": 6, seventh: 7, "7th": 7, eighth: 8, "8th": 8, ninth: 9, "9th": 9 };
  let _corpus = null;
  function corpus() { return _corpus || (_corpus = buildCorpus()); }

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

  function detectFilters(q, ctx) {
    const f = { month: null, ritu: null, samhita: null, stage: null };
    const ql = q.toLowerCase();
    let mm = ql.match(/(?:month|masa|maas|mahina|maheena)\s*(\d)/) || ql.match(/(\d)(?:st|nd|rd|th)?\s*(?:month|masa|maas|mahina|maheena)/);
    if (mm) f.month = +mm[1];
    else {
      for (const k in ORD) {
        if (new RegExp("\\b" + k + "\\s+(month|masa|maas|mahina|trimester)").test(ql) && !/trimester/.test(ql.slice(ql.indexOf(k), ql.indexOf(k) + 20))) {
          f.month = ORD[k]; break;
        }
      }
      if (!f.month) {
        for (const hk in HINDI_MONTHS) {
          if (new RegExp("\\b" + hk + "(?:\\s+(?:mahina|maas|masa|month))?\\b").test(ql)) {
            f.month = HINDI_MONTHS[hk]; break;
          }
        }
      }
    }

    const RITU_MATCHES = {
      hemanta: ["hemanta", "hemant", "early winter"],
      shishira: ["shishira", "shishir", "late winter", "thand", "sheetkal"],
      vasanta: ["vasanta", "vasant", "spring", "basant"],
      grishma: ["grishma", "greeshm", "summer", "garmi"],
      varsha: ["varsha", "monsoon", "rainy", "barish", "barsat"],
      sharad: ["sharad", "autumn"]
    };
    for (const [rk, aliases] of Object.entries(RITU_MATCHES)) {
      if (aliases.some((al) => ql.includes(al))) { f.ritu = rk; break; }
    }

    if (/charaka/.test(ql)) f.samhita = "charaka";
    else if (/sushruta|susruta/.test(ql)) f.samhita = "sushruta";
    // strictly Charaka & Sushruta only
    else if (/kashyapa|kasyapa/.test(ql)) f.samhita = "kashyapa";
    else if (/dc dutta|dutta|modern/.test(ql)) f.samhita = "dcdutta";

    if (/upadrava|chhardi|vomit|nausea|ulti|ji michla|shopha|swelling|edema|sujan|pandu|anemi|khoon.*kami|vibandha|constipat|kabz|garbhasrava|garbhapata|miscarriage|abortion|headache|shirahshoola|mutrakrichhra|dysuria|uti|peshab|jwara|fever|bukhar|leak|pprom|spandana|movement|kicks/.test(ql)) {
      f.stage = "upadrava";
    } else if (/sutika|postnatal|post-natal|postpartum|after delivery|prasav ke baad|delivery ke baad|puerper|lactation|breast ?milk|stanya/.test(ql)) {
      f.stage = "sutika";
    } else if (/newborn|navajata|neonat|baby care|jatakarma|cord|colostrum|swarna|ulva|shishu/.test(ql)) {
      f.stage = "navajata";
    } else if (/red flag|danger|warning|emergency|khatra/.test(ql)) {
      f.stage = "red_flag";
    } else if (/avoid|apathya|should not|harmful|garbhopaghat|teratogen|don'?t|nuksan|kya na khaye/.test(ql)) {
      f.stage = "garbhopaghatakara";
    } else if (/embryo|garbha vriddhi|fetal growth|dauhrida|ojas|kalala|development|milestone|bacche ka vikas/.test(ql)) {
      f.stage = "garbha_vriddhi";
    } else if (/ritu|season|summer|winter|monsoon|rain|autumn|spring|hemanta|shishira|vasanta|grishma|varsha|sharad|mausam/.test(ql)) {
      f.stage = f.stage || "ritu";
    }

    if (!f.month && ctx && ctx.month && !f.stage && !f.ritu) f.month = ctx.month;
    if (!f.ritu && ctx && ctx.ritu && f.stage === "ritu") f.ritu = ctx.ritu;
    return f;
  }

  function localAsk(question, ctx) {
    const docs = corpus();
    const qt = tok(question);
    const f = detectFilters(question, ctx || {});
    if (ctx && ctx.domain) f.domain = ctx.domain;
    if (ctx && ctx.samhita) f.samhita = ctx.samhita;

    const df = {};
    const prepared = docs.map((d) => {
      const t = tok([d.title, d.english, d.hindi, d.dc_dutta, (d.tags || []).join(" "), d.iast, d.samprapti_yukti || "", d.chapter_name || ""].join(" "));
      const tf = {}; t.forEach((w) => (tf[w] = (tf[w] || 0) + 1));
      Object.keys(tf).forEach((w) => (df[w] = (df[w] || 0) + 1));
      return { d, tf, len: t.length };
    });
    const N = docs.length; const avg = prepared.reduce((a, p) => a + p.len, 0) / N;
    const scored = prepared.map((p) => {
      let s = 0;
      qt.forEach((w) => { if (!p.tf[w]) return; const idf = Math.log(1 + (N - df[w] + 0.5) / (df[w] + 0.5)); const tf = p.tf[w]; s += idf * ((tf * 2.2) / (tf + 1.2 * (0.25 + 0.75 * (p.len / avg)))); });
      const d = p.d;
      if (f.month && d.month === f.month) s *= 2.2; else if (f.month && d.month && d.month !== f.month) s *= 0.15;
      if (f.ritu && d.ritu === f.ritu) s *= 2.5; else if (f.ritu && d.ritu && d.ritu !== f.ritu) s *= 0.2;
      if (f.samhita && d.samhita === f.samhita) s *= 1.8;
      if (f.stage && d.stage === f.stage) s *= 2;
      if (f.domain) {
        const cd = (d.domain || d.stage || "").toLowerCase();
        if (cd.includes(f.domain) || f.domain.includes(cd)) s *= 2.0;
        else if (f.domain === "garbhini" && ["masanumasika", "garbha_vriddhi", "garbhopaghatakara", "upadrava"].includes(d.stage)) s *= 2.0;
        else if (["prasava", "sutika", "prasava_sutika"].includes(f.domain) && ["prasava", "sutika"].includes(d.stage)) s *= 2.0;
        else if (["navajata", "bala", "navajata_bala"].includes(f.domain) && ["navajata", "bala"].includes(d.stage)) s *= 2.0;
      }
      if (s === 0 && (f.month || f.ritu || f.stage || f.domain)) {
        if ((f.month && d.month === f.month) || (f.ritu && d.ritu === f.ritu) || (f.stage && d.stage === f.stage)) s = 0.3;
      }
      return { d, s };
    }).filter((x) => x.s > 0).sort((a, b) => b.s - a.s).slice(0, 5);

    if (!scored.length) {
      return {
        source: "local",
        direct_answer: "No specific classical passage found. Try asking about a pregnancy month (e.g. 'Month 4 Dauhrida'), a season ('Grishma diet'), Sutika care, or newborn protocols.",
        classical_citations: [],
        samprapti_yukti: "Ayurvedic antenatal care maintains systemic homeostasis by balancing Vata Anulomana, safeguarding Jatharagni, and nourishing Rasa Dhatu via Madhura-Sheeta-Snigdha Ahara.",
        dc_dutta_correlation: "Standard obstetric care entails systematic maternal-fetal surveillance, nutritional adequacy, and timely screening for high-risk complications.",
        modern_obstetric_correlation: "Standard obstetric care entails systematic maternal-fetal surveillance, nutritional adequacy, and timely screening for high-risk complications.",
        red_flags: ["Any bleeding per vaginam, sudden facial edema, severe persistent headache or reduced fetal movements requires urgent medical review."],
        related_questions: ["4th Month me Dauhrida ka kya mahatva hai?", "8th Month me Ojas asthir kyun hota hai aur kya khayein?", "Sutika paricharya me Panchakola Yavagu aur Udaraveshtana kab karein?"],
        safety_disclaimer: DISCLAIMER,
        filters: f,
        matches: []
      };
    }

    const top = scored[0].d;
    const cits = scored.filter((x) => x.d.sanskrit).slice(0, 4).map((x) => ({
      samhita: SAMHITAS[x.d.samhita] ? SAMHITAS[x.d.samhita].name : (x.d.samhita ? x.d.samhita.toUpperCase() : "Classical"),
      sanskrit: x.d.sanskrit,
      iast: x.d.iast,
      hindi: x.d.hindi,
      english: (x.d.english || "").split(" Pathya:")[0].split(" Dosha state:")[0],
      reference: x.d.citation,
      title: x.d.title,
      sthana: x.d.sthana || "",
      chapter_name: x.d.chapter_name || "",
      verse: x.d.verse || ""
    }));

    const reds = [];
    scored.forEach((x) => (x.d.red_flags || []).forEach((r) => { if (!reds.includes(r) && reds.length < 6) reds.push(r); }));
    if (!reds.length) reds.push("Any bleeding PV, severe headache, blurred vision, fluid leakage, or reduced fetal movement requires same-day medical review.");

    const answerTop = (top.english || "").length > 950 ? (top.english || "").slice(0, 950) + "…" : top.english;
    const dd = (scored.find((x) => x.d.dc_dutta) || scored[0]).d.dc_dutta || "Antenatal surveillance and maternal nutrition according to DC Dutta Textbook of Obstetrics.";
    const yukti = top.samprapti_yukti || "Vata-Pitta equilibrium is maintained through unctuous, sweet, and cooling dietary regimen supporting optimal placental diffusion (Upasneha).";

    const rel_q = [
      "Month ke anusaar ksheera-sarpi ka sahi prayog kaise karein?",
      "Classical Samhitas me iska mukhya aushadh aur ahar niyam kya hai?",
      "DC Dutta ke anusaar high-risk obstetric red flags kab trigger hote hain?"
    ];

    return {
      source: "local",
      direct_answer: answerTop,
      classical_citations: cits,
      samprapti_yukti: yukti,
      dc_dutta_correlation: dd,
      modern_obstetric_correlation: dd,
      red_flags: reds,
      related_questions: rel_q,
      safety_disclaimer: DISCLAIMER,
      filters: f,
      matches: scored.map((x) => ({ id: x.d.id, title: x.d.title, score: +x.s.toFixed(2) })),
    };
  }

  global.KB = { DISCLAIMER, SAMHITAS, MONTHS, SAMHITA_MONTHLY, RITUS, PRAKRITI, BHAVAS, RED_FLAGS, SUTIKA, NAVAJATA, GARBHA_VRIDDHI, DCDUTTA, UPADRAVAS, buildDinacharya, gestationalWeeks, monthFromWeeks, eddFromLmp, trimesterOf, rituFromDate, getRitu, getMonth, SAMHITA_CORPUS, buildCorpus, localAsk };
  if (typeof module !== "undefined" && module.exports) module.exports = global.KB;
})(typeof window !== "undefined" ? window : globalThis);
