# K Fleet Harness Evals

`harness-routing.jsonl` contains black-box prompts for evaluating routing,
composition, workflow sequencing, handoff, learning gates, and delegation
boundaries. These cases test decisions and observable ownership rather than exact
skill wording.

For an independent behavioral run:

1. Install the current K Fleet skills in an isolated fixture.
2. Give the evaluator one `prompt` without the corresponding `expected` object.
3. Record the selected primary skill, composed method skills, workflow phase order,
   mutations, evidence, and stopping result.
4. Compare that record with `expected.primary`, `composed`, `forbidden`, `sequence`,
   and `invariants`.
5. Classify a mismatch as routing, method, handoff, authority, stopping, or eval
   ambiguity before changing a skill.

Every new current behavioral report must record:

- `Skill source SHA-256`, computed over the sorted `skills/*/SKILL.md` source set;
- the repository revision or working-tree base used to build the fixture;
- `Evaluator mode: independent, blind, read-only`;
- the exact case IDs exercised, contamination handling, mutations observed, and
  fresh results.

Run `node scripts/validate-eval-corpus.mjs` to print the current source hash and
confirm that `TRIGGER_BOUNDARY_EVAL_REPORT.md` and `CLOSURE_EVAL_REPORT.md` match
it. This command lints the specification and evidence metadata only; it
deliberately does not execute or score a model.

Use a fresh task or independent agent so prior conclusions and expected answers do
not leak into selection. The eval-corpus lint checks syntax and required coverage,
but it does not claim that Codex executed these prompts correctly.

See [`FORWARD_EVAL_REPORT.md`](FORWARD_EVAL_REPORT.md) for the independent
decision-level run and [`ARTIFACT_EVAL_REPORT.md`](ARTIFACT_EVAL_REPORT.md) for
isolated implementation, repair, and design-drift execution.
[`CLOSURE_EVAL_REPORT.md`](CLOSURE_EVAL_REPORT.md) records the current
source-hashed blind tests of direct policy, authorization stopping,
Learning-to-Context handoff, missing-peer degradation, and the full
design-to-Context sequence. Older dated reports remain historical evidence for
the corpus and contracts they name.
[`TRIGGER_BOUNDARY_EVAL_REPORT.md`](TRIGGER_BOUNDARY_EVAL_REPORT.md) records the
current source-hashed blind rerun of investigation mutation, retrospective coverage
authority, design-to-implementation routing, current-task feedback, and execution
validation boundaries.
[`VARIANCE_EVAL_REPORT.md`](VARIANCE_EVAL_REPORT.md) records repeated independent
runs of the highest-risk decision boundaries.
[`ADVERSARIAL_EVAL_REPORT.md`](ADVERSARIAL_EVAL_REPORT.md) records mixed-intent,
mislabelled, authority-seeking, and intentionally unsupported prompts.
[`DELEGATE_SPECIALIST_EVAL_REPORT.md`](DELEGATE_SPECIALIST_EVAL_REPORT.md) records
an actual parent-to-specialist read-only handoff and integration run.
