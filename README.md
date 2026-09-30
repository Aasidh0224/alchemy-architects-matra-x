# ⚗️ Algorithmic Alchemy — MATRA-X

**SIH 2026 · SIH26099 · AI-Driven Standardization & Harmonization of Material Codes Across CPSEs**

MATRA-X is a prototype Material Intelligence Nexus for ingesting heterogeneous CPSE material records, extracting engineering attributes, finding candidate equivalence/duplicates, detecting technical contradictions, supporting human governance, and producing proposed canonical material identities.

## Live deployment

The repository is Render-ready. Use the Render Blueprint/Deploy flow with this repository and the included `render.yaml`.

**Recommended service**
- Build: `pip install -r requirements.txt`
- Start: `uvicorn server:app --host 0.0.0.0 --port $PORT`

Once deployed, the app is served from the same FastAPI service at `/`, with API documentation at `/docs`.

## Local run

Windows: double-click `start_matrax_windows.bat`.

Or:

```bash
pip install -r requirements.txt
uvicorn server:app --host 127.0.0.1 --port 8765
```

Then open `http://127.0.0.1:8765/`.

## Important data note

The bundled demo records are **synthetic prototype records**. They are not confidential CPCL/ONGC/SAIL production data.

The application is designed so public/research datasets can be ingested for experiments and benchmarking.

## Security

Never commit API keys. Configure model-provider secrets through the deployment platform environment variables.

**Alchemy Architects · MATRA-X · SIH26099**
