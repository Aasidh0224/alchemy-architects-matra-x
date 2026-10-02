# MATRA-X Technology Stack

## Current hosted layer
Current live implementation: Base44-hosted web application at https://matra-x-vision-core.base44.app/
Exact internal framework/version details are not exposed by the public runtime, so they are not guessed here.

## Independent engineering stack
- Frontend: Next.js, React, TypeScript
- UI: accessible component system with responsive design
- 2D analytics: ECharts or Recharts
- 3D analytics: Three.js / WebGL
- API: Next.js server routes or Python FastAPI
- Database: PostgreSQL
- Vector search: pgvector or managed vector database
- LLM: Google Gemini through the official Google GenAI SDK, server-side
- Embeddings: Sentence-Transformer family or supported embedding service
- Document intelligence: OCR + multimodal model pipeline
- Knowledge graph: Neo4j or relational graph abstraction
- Authentication: enterprise identity + WebAuthn/passkeys
- CI/CD: GitHub Actions
- Live browser demo capture: Playwright
- Video production: FFmpeg
- Deployment: Google Cloud Run or Vercel + secure backend

## Security
All AI credentials are server-side secrets. Never commit API keys and never expose private credentials through browser code.