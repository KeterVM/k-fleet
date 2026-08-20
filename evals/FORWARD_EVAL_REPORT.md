# K Fleet Forward Eval Report

Date: 2026-08-20

## Result

Three independent evaluators completed all 15 black-box cases in
`harness-routing.jsonl`. Each evaluator received only its prompts and the current
`skills/*/SKILL.md` files. Evaluators were explicitly denied the corpus expectations,
repository README, prior test reports, and Git history, and made no repository or
product changes.

| Dimension | Result |
| --- | --- |
| Primary workflow selection | 15/15 pass |
| Composable method selection | 15/15 pass |
| Forbidden workflow avoidance | 15/15 pass |
| Required workflow sequencing | 15/15 pass |
| Ownership, authority, and stopping invariants | 15/15 pass |

No observed result justifies changing a skill or durable routing rule.

## Observed decisions

- Feature and bug requests retained outcome ownership while explicit TDD composed
  `kf-test-driven-change` for Red-Green-Refactor sequencing.
- Investigation-only, refactor, verification-only, and design-only prompts did not
  acquire implementation authority.
- The combined verification and repair case selected
  `kf-verify-change -> kf-fix-bug -> kf-verify-change`, preserving separate
  mutation and readiness ownership.
- A valid design handoff was revalidated before implementation. Material
  persistence-boundary drift stopped implementation and returned to
  `kf-design-change` instead of inventing a replacement architecture.
- A single environment failure was classified as insufficient learning evidence.
  Three independent routing failures produced a proposal without persistence.
- One-file monolith maintenance stayed with the parent. Repository-wide monorepo
  maintenance allowed optional read-only delegation across proven independent
  boundaries while the parent retained writes, integration, and readiness.

## Calibrated ambiguities

The evaluators surfaced four prompt limitations without misrouting:

- The accepted design itself was not supplied in the handoff cases, so the run
  assessed extraction, revalidation, and return behavior rather than implementation
  conformance to a concrete design.
- CSV schema, escaping, ordering, and public interface details were intentionally
  absent; evaluators correctly routed those decisions to repository evidence or
  clarification instead of inventing a contract.
- Runtime permission and independent monorepo boundaries made delegation eligible,
  not mandatory; the parent still owned the final decision.
- The repeated routing-failure prompt did not identify the faulty rule's actual
  owner, so the evaluator required tracing the narrowest destination before any
  persistence.

## Limits

This was a decision-level forward eval. It tested selection, composition, phase
ordering, authority, handoff, and stopping behavior without executing the product
changes described by the prompts. It does not replace isolated artifact-level
exercises for implementation correctness, actual Red-Green evidence, migration
behavior, or generated-file side effects.
