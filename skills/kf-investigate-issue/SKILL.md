---
name: kf-investigate-issue
description: Investigate unclear, intermittent, unexpected, or performance-related behavior and report an evidence-backed cause and next action. Use for requests asking why something happens. This skill owns diagnosis, not product mutation. When the same request authorizes correction, report the diagnosis first and hand it to the applicable execution workflow. Add temporary diagnostic instrumentation only when the task explicitly authorizes it and it is safe.
---

# Investigate Issue

Turn an unclear symptom into a calibrated diagnosis without prematurely changing
the system.

## Workflow

1. Define the observed behavior, expected behavior, frequency, environment,
   timeline, and impact. Separate reported facts from assumptions.
2. Gather the smallest useful evidence set: logs, errors, configuration, runtime
   state, recent changes, reproduction steps, metrics, and relevant code paths.
3. Trace execution and data flow through the affected boundary. Compare working
   cases and analogous repository implementations.
4. List plausible hypotheses with predicted evidence and test the most
   discriminating ones first.
5. Disprove alternatives where possible and identify the most likely cause,
   contributing factors, and evidence gaps.
6. Report findings, confidence, and the next useful action. State clearly when the
   evidence supports only a hypothesis.
7. If the investigation verifies a recurring contradiction in reusable method,
   routing, or guidance, hand that evidence to `kf-learn-from-evidence`; do not
   persist a lesson in this workflow.

## Correction routing

Investigation owns diagnosis, not product mutation. When the same request also
authorizes correction, report the diagnosis and evidence first, then hand a
demonstrated existing-contract defect to `kf-fix-bug`, a new expectation to
`kf-implement-feature`, a behavior-preserving structural correction to
`kf-refactor-code`, or an unresolved architectural decision to `kf-design-change`.

When independent verification is also requested, pass the original symptom,
expected behavior, diagnosis, and corrected artifact to `kf-verify-change`. A
failed verification returns to its applicable correction owner and then re-enters
verification under that skill's stopping rules. Do not silently switch from an
investigation-only request into implementation.

## Constraints

- Prefer direct observations and reproducible checks over intuition.
- Do not modify product behavior during an investigation-only request.
- Add temporary instrumentation only when it is safe, necessary, authorized by the
  task, and removable or intentionally retained.
- Do not hide contradictory evidence or overstate confidence.
- Keep investigation focused on the reported issue; avoid opportunistic refactors.

The investigation is complete when the evidence, calibrated confidence, remaining
unknowns, and authorized next owner are explicit.
