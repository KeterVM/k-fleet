# K Fleet Closure Eval Report

Date: 2026-08-28

Repository base: `4c477fe616ec8e3bf8498760814008678873d9fc` with the
working-tree Skill, corpus, and evaluation-tooling changes described below.

Skill source SHA-256: `9b1ba8f26023df757fdf9e17e76192e778a5c69134a829b240099fa208d4ef1b`

Eval corpus SHA-256: `3f0f3a7f0bc18a373fcdf5629fee03c5656bb0f2fe61f74b7a0b58e5027df8d0`

Blind input SHA-256: `da12aface73fcaa2d56b7dd9adc6d8090c04f6ff10abf9f039076881613a6a42`

Eval tooling SHA-256: `6750e95e095c4279e43dc69294a7615646d747a88c2960515635d828d1e3c5a7`

Raw observation SHA-256: `b58c26e4a099b83965bd1f1e0d91e904f377e932c1be9561360db91c56e76c1e`

Results SHA-256: `6e7b04270c80c36395199b9fa1cc9a928e0d5a7b9b529a676da6751b85129ab2`

Eval protocol version: `2`

Evaluator mode: independent, blind, read-only

## Scope

Two fresh sub-agent evaluators received the current eleven Skill sources, a neutral
field rubric, and anonymous `case-NNN` prompts without semantic IDs, modes, or
expectations. They froze raw routing, stopping, and rationale. A third fresh
evaluator repeated eight highest-risk cases, and a separate post-hoc judge mapped
the frozen evidence to hidden invariants. All reported no contamination or
mutations; raw observations and judgments are recorded separately in
`current-results.json`.

The run exercised these corpus cases and adjacent degradation scenarios:

- `full-closure-sequence`;
- `repeated-independent-learning-signal`;
- `authorized-learning-context-persistence`;
- `direct-authorized-policy`; and
- `learning-context-owner-unavailable`;
- `learning-context-owner-resume`;
- `verify-feature-reverify`;
- `verify-refactor-reverify`; and
- `coverage-feature-correction-reentry`.
- `learning-defect-persistence-owner`;
- `learning-feature-persistence-owner`;
- `learning-refactor-persistence-owner`;
- `learning-regression-evidence-owner`; and
- `learning-documentation-parent-owner-unavailable`.

## Fresh results

| Boundary | Result |
| --- | --- |
| Full closure | Selected `design → implement → verify → fix → verify → learn → maintain context → learn`; the final Learning re-entry compares persistence with the contract and records the owner's verification. |
| Proposal only | Learning evaluates recurrence and counterevidence, emits the narrow proposal, and stops without persistence. |
| Exact authorized learning contract | Learning remains non-writing and conditionally hands the exact evidence-backed contract to `kf-maintain-context`, which owns the Context write and effective-scope verification. |
| Direct exact policy | An already-decided exact root policy routes directly to `kf-maintain-context`, followed by the separately authorized feature; Learning is not invoked. |
| Missing Context owner | Learning emits the authorized persistence contract but stops with persistence incomplete, no substitute writer, no mutation, and no verification claim. |
| Context owner resumes | Learning preserves the exact contract while the owner is unavailable, hands the same contract to Context maintenance when available, then re-enters to close the contract. |
| Correction-owner coverage | Fresh cases select `verify → feature → verify`, `verify → refactor → verify`, and `coverage → feature → coverage` with mutation and closeout retained by their owners. |
| Non-Context persistence owners | Fresh anonymous cases select bug, feature, refactor, and coverage owners by intended mutation, return to Learning for contract closeout, and stop incomplete when no authorized parent owns ordinary documentation. |

The evaluator retained the material evidence gates. An implementation contract is
not treated as immutable or as authorization. Initial and post-correction
verification are fresh assessments against the original target. Stated recurrence
still requires accessible independent evidence before persistence, and unavailable
artifact ownership stops the write rather than broadening authority.

## Verdict

The current Skill sources remain behaviorally closed for the evaluated complete
sequence, correction-owner re-entry, proposal-only refusal, exact authorization,
direct-policy routing, Context and non-Context owner selection, missing-owner
degradation, and owner recovery. Exact model and reasoning identifiers were not
available to the evaluator runtime and are recorded as such in the structured
results. This was a decision-level evaluation; it does not claim that hypothetical
product changes, historical incident evidence, or runtime Context loading occurred.
