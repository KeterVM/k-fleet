# Routing Robustness Matrix Report

Status: candidate-not-promoted

Date: 2026-09-01

Protocol: `routing-robustness-matrix-v2`, eval protocol version 2

Repository base: `456787575d2211739c85fd32dd7fcf6da504cbd8`

## Decision

The compact catalog candidate remains unpromoted. Canonical ablation eligibility:
`false`. Machine-evaluated reasons:
`model-matrix-regression`, `high-risk-repeat-contract-failures`.

The candidate reduces the eleven always-loaded descriptions from
4,715 to
2,763 characters
(41.4%). The canonical
56-case catalog ablation and cross-language artifact-quality track were not run.

## Execution

Two anonymously bound catalog fixtures received identical full and high-risk
inputs. Three model configurations each ran one 24-case full pass and two
independent eight-case high-risk repeats per arm. The matrix contains
18 valid evaluator runs, 240 observations,
240 separately bound stopping judgments, and 480
per-invariant judgments. Every judge used a different model identifier from the
evaluator observations it scored.

Excluded attempts:

- No evaluator run was excluded from this matrix.

## Results

Exact selection requires primary, composed methods, normalized sequence, and
forbidden-skill exclusion to pass. Contract pass additionally requires the bound
post-hoc stopping judgment and every invariant to pass.

| Catalog | Model | Obs. | Primary | Composed | Sequence | Forbidden | Exact | Stopping | Invariants | Contract |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| current | `gpt-5.6-sol` | 40 | 40 | 40 | 40 | 40 | 40 | 29/40 | 73/80 | 29/40 |
| current | `gpt-5.6-terra` | 40 | 40 | 40 | 28 | 40 | 28 | 25/40 | 71/80 | 15/40 |
| current | `gpt-5.6-luna` | 40 | 40 | 40 | 28 | 40 | 28 | 7/40 | 54/80 | 1/40 |
| candidate | `gpt-5.6-sol` | 40 | 40 | 40 | 40 | 40 | 40 | 30/40 | 73/80 | 30/40 |
| candidate | `gpt-5.6-terra` | 40 | 40 | 40 | 28 | 40 | 28 | 18/40 | 67/80 | 11/40 |
| candidate | `gpt-5.6-luna` | 40 | 40 | 40 | 32 | 40 | 32 | 20/40 | 61/80 | 16/40 |
| **current total** |  | **120** | **120** | **120** | **96** | **120** | **96** | **61/120** | **198/240** | **45/120** |
| **candidate total** |  | **120** | **120** | **120** | **100** | **120** | **100** | **68/120** | **201/240** | **57/120** |

| Catalog | Scope | Exact | Stopping | Invariants | Contract |
| --- | --- | ---: | ---: | ---: | ---: |
| current | full | 64/72 | 28/72 | 117/144 | 25/72 |
| current | high-risk-repeat | 32/48 | 33/48 | 81/96 | 20/48 |
| candidate | full | 64/72 | 35/72 | 116/144 | 34/72 |
| candidate | high-risk-repeat | 36/48 | 33/48 | 85/96 | 23/48 |

These are descriptive counts from a small stochastic matrix, not a statistical-
significance claim.

## Evidence binding

- Skill source SHA-256: `266adc0010adc8e7a1a11a9fcb0858f5b2c746eac9e4e7ea8872aaa6bba956da`
- Robustness corpus SHA-256: `5442ad1c11329e772d047d9d85467aa09f1c6b67120777468a5215273eba6a6c`
- Full blind-input SHA-256: `46308537896d5a3e77aa8d235dcf5ce8d7df7fd6f4a13b4d07ebf182e85fbdad`
- High-risk blind-input SHA-256: `58004e777d60d8194f8f8dc7d069e80066c6baef2bedee4b3ef03a585a9eb994`
- Evaluation-tooling SHA-256: `426ce6ab27654aa53602900e9b47d768e19c61839fb77c9ad1dcb4aa278b9592`
- Judge-tooling SHA-256: `b1ccbd6b5d92cb66a2a9bc468e9345e93762a51569832c68ab01cb96bec33fdc`
- Scoring-tooling SHA-256: `acc01447c56ba7ffa854431431ac279a0461e84132389bd27fe54d2cece12366`
- Raw-observation SHA-256: `3b45df410714762fd78d603dd045193c704f492af2f7b38f67b8a92e120fb487`
- Judge-input SHA-256: `5c7173db454d4f50d1d724d26c6b4a92eae2186081fe5bd0da19f9a7433e8c20`
- Judgment SHA-256: `9ccd3871ddd3680bb195db5a24480b3a81479129978275df17594e9fbe8aabe5`
- Frozen-result SHA-256: `91862c91295eaddd363a42377ad2e1348089e5926e1cae7a2ce88b1052be94fb`
- Current catalog SHA-256: `e7cebb26d1ce554783edac7d64277ffdc2f084464270054e0181125e488be981`
- Candidate catalog SHA-256: `23f4a2a40f131f8507dea44fef05ab9257aa73a230a814d03032e0883ce3b3b0`
- Current fixture-binding SHA-256: `41c58757a6fe6280ffb5e1a4db500ff6001085facdfdeb0b9de8ec4da4d8370e`
- Candidate fixture-binding SHA-256: `42b3c364aec0c3ecf5f57b27758692827207e9e2a6bedf59986b46986ec4df49`

The exact anonymous manifests, bound judge inputs, raw and excluded observations,
judgments, scores, and per-observation failures are preserved in
`robustness-current-results.json`. Revalidate the result and this generated
report with:

```sh
node scripts/score-robustness-results.mjs
```
