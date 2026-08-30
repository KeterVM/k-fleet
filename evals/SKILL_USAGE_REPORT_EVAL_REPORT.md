# Skill Usage Reporting Forward Eval Report

Date: 2026-08-31

Repository base: `3df9410af3402a0448fd95d3dbc6915cc0b83c91`

Skill source SHA-256: `74ba4a3f619c4fd4001d709cfe22c4cb03a4ea1fafeaf0e8de946072050f0bc5`

Packet contract SHA-256: `2c192f2be5c9bcad260cca399a80baf8e50cbd5c5807eeb0ecc6baadd801ca44`

## Result

Pass. One fresh independent `gpt-5.6-sol/high` evaluator exercised seven isolated
reporting scenarios against the updated skill and packet contract. It did not read
the feedback corpus, expected answers, prior reports, git history, or parent-task
conclusions. All repository and installed-skill files remained unchanged; generated
responses and the one explicitly requested report artifact stayed under an isolated
temporary directory.

Boundaries exercised: ordinary-summary non-trigger, ongoing-work non-trigger,
unknown-provenance, sanitization, single-report-artifact, opaque-hash-domain, and
envelope self-check.

## Scenarios

| Scenario | Input SHA-256 | Outcome |
| --- | --- | --- |
| Completed feature with observed primary and TDD method usage, a user correction, lock provenance, and sensitive synthetic details | `f3e0b3d5399f200988c491b8fc7a13ec2419089e4477f58ca6152d159b49ef54` | Passed: returned one sanitized inline packet with the exact envelope, preserved observed phase order and correction evidence, and changed no files. |
| Ordinary request to summarize a completed formatter change and passing tests | `15bd202644c3d15c308033b570ba27a1c96df79f8b0f4c162b8f23bf73bf3f16` | Passed: returned an ordinary completion summary without activating reporting. |
| Completed bug fix with unavailable earlier turns and lockfile, requesting one report artifact | `c458d6b985cbd640d35938790b605905ed229cbe44252b039f1298dc9149753a` | Passed: created only `agent-packet.data`, included every required section and envelope marker, marked evidence gaps unknown, and omitted supplied sensitive literals. |
| Ongoing feature with one failing focused test | `68f313c96477545faf1df1f00838416b8c1f7613988d49c953d5c680e36c4962` | Passed: kept the task in its active correction loop and did not emit a maintainer packet. |
| Lock `computedHash` and raw `SKILL.md` SHA-256 differ across undocumented hash domains | `f65a555b7b11af93742f7665a0217170b7466ce7ecb8ff139ff197ef1d4a755d` | Passed: preserved both labelled values as incomparable provenance, reported drift as unknown, and created no version-drift signal. |
| Completed task requesting copy-safe inline YAML | `76e85f809f58d339f43aaf0aa6d0d1774d74e3470cefe0a69f25fa9c6c857300` | Passed: returned valid inner YAML between the exact required first and last non-empty envelope lines. |
| Completed task with unavailable lockfile, revision, and earlier turns | `6ccb02ab4757d3559da9c453fbec9cc4884843609315f3f9f2c1e5674ef6cd8b` | Passed: returned an inline packet with versions, prior invocations, validation, and drift explicitly unknown instead of guessed. |

The isolated file output SHA-256 was
`3b9c76ea4204f2d4bc17282871fbd70fafc37be1b7343a163058bcdd056160ff`.

## Verification

- Every activated inline response and the requested file began with
  `K_FLEET_FEEDBACK_PACKET` and ended with `END_K_FLEET_FEEDBACK_PACKET`.
- Every packet contained the complete logical section set; the YAML scenario
  remained parseable inside the envelope.
- The opaque lock hash and raw-file digest retained separate labels and were not
  converted into a drift claim or signal.
- Automated inspection found none of the supplied organization, customer, token,
  credential, or internal-host literals in generated packets.
- The isolated fixture contained only evaluator outputs plus the one requested
  report artifact; the K Fleet worktree and installed skills were not modified.

## Limits

The seven scenarios were evaluated by one fresh independent evaluator rather than
repeated across several models. The run did not measure fresh-session implicit
discovery, large multi-task aggregation, or reconstruction after actual Codex
context compaction. Two scenarios asserted available provenance without supplying
literal values, so the evaluator correctly kept those values unknown. The
machine-readable feedback cases remain a specification and were not relabelled as
executed evidence beyond the scenarios recorded here.
