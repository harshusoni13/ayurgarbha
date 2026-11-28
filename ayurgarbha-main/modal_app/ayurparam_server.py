"""
AyurGarbha — Modal Serverless Inference Server for bharatgenai/AyurParam
Deploy: modal deploy modal_app/ayurparam_server.py
"""
import hmac
import os
import modal

MODEL_ID = "bharatgenai/AyurParam"
SYSTEM_INSTRUCTION = (
    "केवल दिए गए अंश के आधार पर, सरल भाषा में उत्तर दो। "
    "अंश में न हो तो कहो कि यह उपलब्ध पाठ में नहीं है। "
    "दवा की मात्रा मत दो। श्लोक या स्रोत मत लिखो।"
)

image = (
    modal.Image.debian_slim(python_version="3.11")
    .pip_install(
        "torch>=2.2.0",
        "transformers>=4.44.0",
        "accelerate>=0.33.0",
        "fastapi>=0.110.0",
        "pydantic>=2.6.0",
    )
)

app = modal.App("ayurgarbha-ayurparam")


@app.cls(
    image=image,
    gpu="T4",  # L4 or A10G (bf16); falls back to fp16 automatically if T4
    secrets=[
        modal.Secret.from_name("huggingface"),
        modal.Secret.from_name("ayurgarbha-shared"),
    ],
    scaledown_window=300,
)
class AyurParamModel:
    @modal.enter()
    def load_model(self):
        import torch
        from transformers import AutoModelForCausalLM, AutoTokenizer

        hf_token = os.environ.get("HF_TOKEN")
        use_bf16 = torch.cuda.is_available() and torch.cuda.is_bf16_supported()
        dtype = torch.bfloat16 if use_bf16 else torch.float16

        self.tokenizer = AutoTokenizer.from_pretrained(
            MODEL_ID,
            token=hf_token,
            trust_remote_code=True,
        )
        self.model = AutoModelForCausalLM.from_pretrained(
            MODEL_ID,
            token=hf_token,
            torch_dtype=dtype,
            device_map="auto",
            trust_remote_code=True,
        )
        self.model.eval()

    @modal.fastapi_endpoint(method="POST")
    async def generate(self, request):
        from fastapi import HTTPException
        import torch

        secret_hdr = request.headers.get("x-shared-secret", "")
        expected = os.environ.get("SHARED_SECRET", "")
        if not expected or not hmac.compare_digest(str(secret_hdr), expected):
            raise HTTPException(status_code=401, detail="Unauthorized")

        request_data = await request.json()
        context = str(request_data.get("context") or "").strip()
        question = str(request_data.get("question") or "").strip()[:500]
        if not question:
            raise HTTPException(status_code=400, detail="Missing question")

        # Truncate context to ~1200 tokens so total prompt + 350 new tokens stays <= 2048
        ctx_ids = self.tokenizer.encode(context, add_special_tokens=False)[:1200]
        truncated_ctx = self.tokenizer.decode(ctx_ids, skip_special_tokens=True)

        full_context = f"{SYSTEM_INSTRUCTION}\n\n{truncated_ctx}"
        prompt = f"<context> {full_context} <user> {question} <assistant>"

        inputs = self.tokenizer(
            prompt,
            return_tensors="pt",
            truncation=True,
            max_length=1698,  # 1698 + 350 = 2048 tokens max
        ).to(self.model.device)

        with torch.no_grad():
            outputs = self.model.generate(
                **inputs,
                max_new_tokens=350,
                temperature=0.2,
                do_sample=True,
                pad_token_id=self.tokenizer.eos_token_id,
            )

        gen_ids = outputs[0][inputs["input_ids"].shape[-1]:]
        answer = self.tokenizer.decode(gen_ids, skip_special_tokens=True).strip()
        return {"answer": answer}
