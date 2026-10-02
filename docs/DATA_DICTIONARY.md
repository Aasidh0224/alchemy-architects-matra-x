# MATRA-X Data Dictionary

## MaterialCode
| Field | Meaning |
|---|---|
| cpse_organization | Source CPSE organization |
| raw_code | Original material code |
| description | Source material description |
| category | Source category label |
| unit | Unit of measure |
| standard_code | Standardized material code |
| standard_category | Standardized category |
| confidence | Mapping confidence value |
| status | pending, standardized, flagged or error |
| error_type | none, duplicate, mismatch, anomaly, obsolete or non_standard |
| error_reason | Explanation of detected issue |
| verified_by | Reviewer or verification process |
| verified_at | Verification timestamp |

## AuthLog
| Field | Meaning |
|---|---|
| user_name | User or inspector |
| auth_method | face, fingerprint, iris or webauthn |
| status | success, failed or pending |
| device_info | Device/browser context |
| confidence | Authentication confidence |
| location | Authentication context |

## ScanEvent
| Field | Meaning |
|---|---|
| material_code | Related material/auth identifier |
| scan_type | standardize, verify, error_check or biometric |
| result | Event result text |
| cpse | CPSE/security context |
| severity | info, warning or critical |

## Security note
The current connected Base44 schema exposes role-based and entity-level access-control rules. A production engineering edition should additionally implement explicit tenant isolation, enterprise identity, immutable audit history and source/evidence provenance.