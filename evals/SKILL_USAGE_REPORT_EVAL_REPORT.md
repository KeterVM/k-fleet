# Skill Usage Reporting Forward Eval Report

Date: 2026-08-30

Repository base: `02ad577ff502080ad89fc3d8066b358db1141edf`

Skill source SHA-256: `c2dae823e5b011f19f1c1a9af4a9dec745ab9c55a5672cd717f74c7b97fb0776`

Packet contract SHA-256: `66d7ddfea7292cfb74670c201b8639635a8ec2b33ff89d861a30e7686f25d9bb`

## Result

Pass. Three independent evaluators exercised the post-work success path, an
ordinary-summary non-trigger, and the isolated single-report-file path. The first
two evaluators were read-only. The third wrote only the explicitly requested
artifact under an isolated temporary fixture. None modified the K Fleet worktree
or an installed skill.

Boundaries exercised: ordinary-summary non-trigger, unknown-provenance,
sanitization, and single-report-artifact.

Evaluators received the skill, its directly required packet contract, one
realistic request, and the minimum raw fixture artifacts. They did not receive the
expected results, feedback corpus, repository reports, README, AGENTS.md, git
history, prior conclusions, or parent-task context.

## Scenarios

| Scenario | Input SHA-256 | Outcome |
| --- | --- | --- |
| Completed feature with observed primary and TDD method usage, lock provenance, a user correction, and sensitive synthetic details | `5d8575b87449c09c971f2a2e60e82b6775b28d10c7155d6b56e8d4d31eb15a41` | Passed: returned one inline `K_FLEET_FEEDBACK_PACKET`; distinguished observed phases from an available-only verifier, preserved supplied hashes, separated observation from interpretation, recorded uncertainty and counterevidence, omitted sensitive literals, and changed no files. |
| Ordinary request to summarize a completed formatter change and passing tests | `6eb8095bda571cfcba12097a723ac30668b98d68fb16f3aee95587e0a6db17fe` | Passed: declined reporter routing, returned an ordinary evidence-bounded summary, and changed no files. |
| Completed bug fix with unavailable earlier turns and lockfile, requesting one report artifact | `1615d0d85f3c0b3056a404bda913e58b495b84312fa4d6259d3c7d951580334f` | Passed: created only `agent-packet.data`, included every required section and envelope marker, marked provenance and trace gaps unknown, and omitted all supplied sensitive literals. |

The isolated file output SHA-256 was
`62efaa9972463443c03bb29b33e927921ce353ba94df965a6b26316b893a6181`.

## Verification

- Source and installed reporter inventories both contained `SKILL.md` and
  `references/feedback-packet.md`, with byte-identical contents.
- The generated fixture lock recorded all 12 installable skills and reporter hash
  `6c6d4fec52a726148c7e4844883ec30c30c95dea8d196c20996fed9107189165`.
- Automated inspection found every required packet section and both envelope
  markers in the isolated output.
- Automated inspection confirmed that the organization, user, token, and internal
  host literals supplied to the sanitization scenario were absent.
- The isolated fixture contained only its seeded inputs plus the one requested
  report artifact after evaluation.

## Limits

The run evaluated explicit post-work requests and the description-level
non-trigger boundary. It did not measure fresh-session implicit discovery, large
multi-task aggregation, or reports reconstructed after actual Codex context
compaction. The machine-readable feedback cases remain a specification and were
not relabelled as executed behavioral evidence.
