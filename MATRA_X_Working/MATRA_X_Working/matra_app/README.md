# MATRA-X | Alchemy Architects | SIH26099

MATRA-X is a prototype material-intelligence platform for SIH26099: AI-assisted material identity resolution, standardization and harmonization across CPSEs.

## What is implemented
- multi-CPSE demo material ingestion
- schema-normalization preview
- hybrid matching concept (lexical + semantic-slot + technical conflict gate)
- explainable match workbench
- counterfactual engineering lab
- reviewer/governance workflow
- provenance graph visualization
- procurement opportunity analytics
- CSV import in browser
- optional FastAPI API
- optional frontier-LLM provider adapters (no keys bundled)
- installable PWA shell

## Data policy
The bundled CSV is synthetic demo data only. It is deliberately constructed to reproduce realistic abbreviation, ordering and near-miss patterns. It is NOT CPCL/ONGC/SAIL confidential data.

Public data candidates and adapters are documented in `data/SOURCES.md`.

## Run the UI
Open `index.html` directly in a modern browser, or serve the folder:

```bash
python -m http.server 8080 -d app
```

## Run the optional API
```bash
cd app/api
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Set `MATRA_LLM_PROVIDER` and a provider API key only when needed. Supported adapters are structured for OpenAI, Gemini and Anthropic; the app remains fully usable without them using deterministic demo reasoning.

## Frontier model guidance
The code does not hard-code a single model vendor. At build/deployment time, use a current frontier reasoning model appropriate to your budget and policy. As of 30 Sep 2026, OpenAI's model documentation lists GPT-5.6 Sol as its flagship complex-reasoning model; Google's Gemini API lists Gemini 3.8 Flash as a stable agentic/engineering model and Gemini 3.1 Pro as a preview model; Anthropic lists Claude Opus 5 / 4.8 as active models. Check provider docs immediately before deployment because model availability changes.