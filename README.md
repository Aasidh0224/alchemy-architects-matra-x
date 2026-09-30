# ⚗️ Algorithmic Alchemy — MATRA-X

SIH2026 · SIH26099 · AI-Driven Standardization and Harmonization of Material Codes Across CPSEs.

## Cloud deployment
This repository contains a self-contained, cloud-ready MATRA-X prototype. The Render Blueprint is included in `render.yaml`.

Build: `pip install -r requirements.txt`

Start: `uvicorn server:app --host 0.0.0.0 --port $PORT`

The live application is served at `/` and health is available at `/api/health`.

## Demo data
The prototype UI uses synthetic demonstration material records. Do not represent them as confidential CPSE production data.

## Live demo
After deployment, use the generated public URL as the SIH demo link and encode that URL into the team QR code.
