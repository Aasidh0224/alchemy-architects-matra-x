# Data sources & provenance

## SIH26099
Official SIH problem statement mirrors / archives consulted:
- https://sih2026.vuce.in/ps/SIH26099
- https://github.com/vedantchalke36/sih-2026-problem-statements

The problem statement says the CPSE Material Master Data / Sample Material Master Dataset is to be provided by participating CPSEs.

## Public SIH-related material corpus
A public Hugging Face dataset published for SIH26099 reports a material description corpus plus public procurement/tender-derived tables. It states 21,513 material-description rows and 71,502 UNSPSC rows in the snapshot described in its dataset card. Treat it as public research data, not CPSE-confidential data.
https://huggingface.co/datasets/sarthak20024/sih26099-cpse-material-codes

## Kaggle candidates supplied by the team
- https://www.kaggle.com/datasets/lakritidis/product-clustering-matching-classification
- https://www.kaggle.com/datasets/ziqizhang/product-data-miningentity-classificationlinking
- https://www.kaggle.com/datasets/asaniczka/product-titles-text-classification

These are useful for pretraining/prototyping entity matching and classification, but they are e-commerce/product datasets rather than CPSE industrial material masters. Do not present them as CPSE ground truth.

## Related public implementations
Public SIH26099 repositories already exist using combinations of semantic embeddings, vector search, technical conflict detection, ranking, human review and Common National Material Code workflows. MATRA-X therefore treats those as prior art and differentiates through evidence-weighted technical reasoning, contradiction gating, counterfactual tests, uncertainty and active-learning governance.