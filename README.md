# ⚗️ MATRA-X 2.0 — Alchemy Architects

**SIH 2026 · SIH26099 · AI-Driven Standardization and Harmonization of Material Codes Across CPSEs**

MATRA-X is an AI-assisted industrial material identity, reasoning, harmonization and governance platform.

## Current cloud-ready build

The repository now contains a Next.js 16 application intended for Google AI Studio Build Mode and Vercel/Cloud Run deployment.

Core modules:
- Command Center
- Material Explorer
- Match Workbench
- Counterfactual Engineering Lab
- Knowledge Graph visualization
- Human Governance
- Procurement and Inventory Intelligence
- LIORA Material Intelligence Copilot
- Data & Models source catalog
- CSV ingestion
- 1M+ virtual scale simulator

## AI

LIORA uses the official Google GenAI JavaScript SDK and Gemini Interactions API when GEMINI_API_KEY is configured on the server. Without a key, the app uses grounded fallback responses so the demo does not fail.

## Data

The app references the public SIH26099 research corpus and the team's auxiliary Kaggle entity-matching datasets. Public, synthetic and simulated data are explicitly labelled. The virtual 1M+ universe is a scalability simulation, not a claim of confidential CPSE production records.

## Run locally

npm install
npm run dev

Then open http://localhost:3000

## Google AI Studio

Open AI_STUDIO_PROMPT.md and import this repository into Google AI Studio Build Mode. Preserve the current UI and incrementally add the advanced backend/data/AI components described there.

## Deployment

### Vercel
Import this GitHub repository into Vercel as a Next.js application. Configure GEMINI_API_KEY and GEMINI_MODEL in server-side environment variables.

### Google AI Studio
Build Mode can publish the full-stack application to Cloud Run. After publishing, use the returned public URL for your SIH QR code.

## Security

Never commit API keys. Never expose GEMINI_API_KEY with NEXT_PUBLIC_. Use server-only environment variables and production WebAuthn/passkey verification for high-risk approvals.

## Team

Alchemy Architects
