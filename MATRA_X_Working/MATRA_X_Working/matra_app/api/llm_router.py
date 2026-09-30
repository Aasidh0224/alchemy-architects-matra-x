"""Optional frontier-model router for MATRA-X.
No API key is stored here. Set provider keys and model env vars at deployment time.
The default app does not require any vendor API.
"""
import os
from dataclasses import dataclass
from typing import Any, Dict

@dataclass
class ProviderConfig:
    name: str
    model: str
    api_key_env: str

PROVIDERS={
    "openai": ProviderConfig("openai", os.getenv("OPENAI_MODEL", "gpt-5.6-sol"), "OPENAI_API_KEY"),
    "gemini": ProviderConfig("gemini", os.getenv("GEMINI_MODEL", "gemini-3.8-flash"), "GEMINI_API_KEY"),
    "anthropic": ProviderConfig("anthropic", os.getenv("ANTHROPIC_MODEL", "claude-opus-5"), "ANTHROPIC_API_KEY"),
}

SYSTEM_PROMPT = """You are MATRA-X Material Reasoner. Explain industrial-material matching using evidence from structured attributes, source text and provenance. Never invent a missing engineering specification. Treat semantic similarity as candidate evidence, not certification. A critical-attribute contradiction must force block/review. Return concise JSON when requested."""

def route(provider: str, prompt: str) -> Dict[str, Any]:
    cfg=PROVIDERS.get(provider, PROVIDERS["openai"])
    configured=bool(os.getenv(cfg.api_key_env))
    return {
        "provider": cfg.name,
        "model": cfg.model,
        "configured": configured,
        "system_prompt": SYSTEM_PROMPT,
        "message": "Provider adapter ready. Add the API key in the environment; no secrets are bundled with the prototype.",
        "prompt_preview": prompt[:500],
    }
