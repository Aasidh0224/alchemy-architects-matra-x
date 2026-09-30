# MATRA-X 2.0 — Google AI Studio / Codex Build Brief

Project:
MATRA-X
Team:
Alchemy Architects
SIH:
2026
Problem:
SIH26099 — AI-Driven Standardization and Harmonization of Material Codes Across CPSEs

## Goal
Evolve the existing MATRA-X prototype into a production-oriented, evidence-driven material identity and governance platform. Preserve useful existing UI and behavior, but refactor toward a real full-stack architecture.

## Core principle
Understand → Compare → Challenge → Explain → Govern → Prevent → Optimize.

## Required intelligence
1. Multi-source ingestion: CSV, XLSX, JSON, API-ready ERP/SAP adapters, technical PDFs and evidence.
2. Schema harmonization and data-quality profiling.
3. Engineering DNA 2.0 with structured technical attributes, criticality, provenance and uncertainty.
4. Category-aware attribute criticality and configurable rule policies.
5. Hybrid entity resolution: normalized lexical signals + transformer embeddings + structured attributes + learned ranking.
6. Contradiction-aware False-Merge Firewall. Critical conflicts must block automatic consolidation.
7. Evidence completeness and uncertainty-aware decisions.
8. Counterfactual Engineering Lab.
9. Knowledge/provenance graph.
10. Evidence fusion across master records, documents, certificates and permitted procurement history.
11. Human governance, audit events, role-based access and high-risk approval gates.
12. Canonical material identity plus proposed common code and traceable legacy mappings.
13. Pre-entry duplicate prevention.
14. Material-code error detection and Code Doctor.
15. Material drift detection and downstream impact propagation.
16. Procurement and inventory intelligence.
17. LIORA grounded agentic copilot with tool access and RAG.
18. Model Observatory and benchmark harness.
19. 1M+ scalable architecture using pagination, indexing, candidate retrieval, batch processing and background jobs.
20. WebAuthn/passkey-ready security for high-risk actions; never store raw biometric data.
21. Futuristic dark UI without clutter; accessible and responsive.
22. Real metrics only. Never invent model accuracy, savings, CPSE data or official code adoption.

## LIORA
Use the current Google GenAI JavaScript SDK: @google/genai.
Use the Gemini Interactions API server-side. Keep GEMINI_API_KEY server-only.
LIORA must retrieve MATRA-X evidence before material-specific answers.
If the model is unavailable, use a grounded fallback that clearly identifies itself as fallback mode.
LIORA should answer and perform tools for:
- material search
- material comparison
- duplicate/equivalence explanation
- contradiction explanation
- Engineering DNA
- taxonomy/classification
- evidence and provenance
- governance/audit
- common identity/code
- legacy mapping
- procurement and inventory
- data quality
- material drift
- natural-language search

## Data
Use the public SIH26099 research corpus where permitted. The indexed public dataset currently reports a 21,513-row material-description corpus and 71,502-row UNSPSC reference table. User-provided Kaggle datasets are auxiliary generic entity-matching data, not CPSE ground truth.
Support a synthetic CPSE benchmark and 1M+ virtual scale simulation. Clearly label REAL / PUBLIC / SYNTHETIC / SIMULATED.

## Research
Benchmark:
- exact/normalized
- fuzzy/lexical
- embedding-only
- embedding + attributes
- MATRA-X hybrid

Measure:
precision, recall, F1, top-k recall, false-merge rate, conflict detection recall, calibration, review rate and latency.

Primary research question:
Can technical reasoning and contradiction-aware evidence reduce unsafe false consolidation compared with semantic similarity alone?

## Deployment
Target:
Google AI Studio Build Mode → Cloud Run, with Vercel as an alternative.
Use server environment variables for Gemini credentials.
Do not commit secrets.
