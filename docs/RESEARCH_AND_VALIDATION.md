# Research and Validation

## Research question
Can technical reasoning and contradiction-aware evidence reduce unsafe false consolidation compared with semantic similarity alone?

## Baselines
1. normalized/exact matching
2. fuzzy/lexical matching
3. embedding-only matching
4. embedding + structured attributes
5. MATRA-X hybrid matching

## Metrics
- Precision
- Recall
- F1
- Top-K Recall
- False Merge Rate
- Critical Conflict Detection Recall
- Review Rate
- Calibration
- Latency
- Throughput

## Hard-negative benchmark
- same wording, different grade
- same wording, different dimension
- same family, different function
- same product, different standard
- same description, different pressure class
- missing critical attribute
- unit inconsistency

## Data strategy
Use permitted public/research material data, the team's supplied Kaggle entity-matching datasets as auxiliary generic data, and a clearly labelled synthetic CPSE benchmark.

Only measured benchmark results should be displayed in judging materials. Prototype percentages and simulated capacity should be labelled.