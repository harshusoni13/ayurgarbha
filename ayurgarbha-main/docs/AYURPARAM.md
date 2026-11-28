# AyurParam Integration & Deployment Guide (`docs/AYURPARAM.md`)

## 1. Model & Citation
* **Model:** `bharatgenai/AyurParam` (~2.9B parameters, Apache-2.0 License)
* **Paper / Model Card Reference:** [arXiv:2511.02374](https://arxiv.org/abs/2511.02374)
* **BharatGen Naming Rules:** [bharatgen.com/licence/#names](https://bharatgen.com/licence/#names)
* **Context Window:** 2048 tokens (`<context> {context} <user> {question} <assistant>`, `trust_remote_code=True`).

---

## 2. Modal GPU Server Setup (`modal_app/ayurparam_server.py`)
1. Install and authenticate Modal CLI:
   ```bash
   pip install modal
   modal setup
   ```
2. Create required Modal secrets (**never hardcode keys in code**):
   ```bash
   modal secret create huggingface HF_TOKEN=<your_hf_token>
   modal secret create ayurgarbha-shared SHARED_SECRET=<your_random_shared_secret>
   ```
3. Deploy the Modal app (GPU `L4` with `bf16`, `container_idle_timeout=300` scale-to-zero):
   ```bash
   modal deploy modal_app/ayurparam_server.py
   ```
4. Copy the generated Modal endpoint URL (e.g., `https://<workspace>--ayurgarbha-ayurparam-ayurparammodel-generate.modal.run`).

---

## 3. Vercel Proxy Setup (`api/ask.js`)
In Vercel Project Settings → **Environment Variables**, add:
* `AYURPARAM_URL`: The deployed Modal endpoint URL from step 2.
* `AYURPARAM_SECRET`: The exact same value as `SHARED_SECRET` in `ayurgarbha-shared`.

### Safety & Privacy Pipeline in `/api/ask`
1. **Input & Rate Limit:** Accepts only `{ question, month, lang }` (max 500 chars; no name, age, or LMP). Rate-limited to **10 requests/minute/IP**.
2. **Deterministic Red-Flag Check:** Emergency signs immediately return `108` referral without calling AyurParam.
3. **BM25 Retrieval:** Selects top 3 `text_verified === true` Tier A records from `data/records.json`.
4. **25s Timeout + Citation Validator:** Rejects any response containing unretrieved/hallucinated record IDs or raw shloka delimiters.
5. **Extractive Fallback:** Any timeout, 401, empty output, or validation failure returns the verified DB excerpt with `source: "fallback"`.
