# Alchemy Architects — SIH26099 Research Baseline

## Current assessment
The supplied team research PPT is broad and technically ambitious, covering Engineering DNA, hybrid semantic/specification matching, adaptive constraints, counterfactual reasoning, human feedback, multimodal engineering intelligence, provenance, predictive procurement, dead-stock intelligence and ERP prevention.

## Critical prior-art warning
Public SIH26099 repositories already describe/build combinations of embeddings/vector search, technical conflict detection, ranking, human review, unified catalog and ERP integration. The team's differentiation therefore should not be "we use AI + vectors + graph". MATRA-X emphasizes:

1. Evidence-weighted material identity fingerprinting.
2. Category-specific critical-attribute policies.
3. Contradiction-aware technical vetoes.
4. Counterfactual tests for sensitivity to critical attributes.
5. Uncertainty/evidence completeness separate from confidence.
6. Human approvals as versioned learning signals.
7. Multimodal source evidence attached to each decision.
8. Preventive duplicate interception at material creation time.
9. Procurement/dead-stock intelligence as downstream use cases.

## Data strategy
1. Use public industrial/tender-derived data and the public SIH26099 collection as the real-data research track.
2. Use the three supplied Kaggle datasets for auxiliary entity-linking/classification experiments, not as CPSE ground truth.
3. Generate synthetic hard negatives specifically for industrial near-miss cases.
4. Hold out canonical entities across train/test to avoid leakage.

## Model strategy
Baseline: normalized lexical / TF-IDF.
Semantic: sentence-transformer or equivalent embedding model.
Advanced: multimodal embedding where PDFs/images are available.
Decision layer: hybrid scorer + category-specific criticality + contradiction gate + calibration.
LLM: frontier model for extraction/explanation/reasoning assistance, never the sole authority for technical equivalence.

## Evaluation
Report precision, recall, F1, top-k retrieval recall, false-merge rate, critical-conflict recall, attribute extraction accuracy, calibration/error, reviewer acceptance rate and review workload reduction.

## Claims discipline
Any percentage shown in pitch material should be labeled as a measured result only after experiment. Otherwise label it as a target, illustrative scenario, or prototype telemetry.