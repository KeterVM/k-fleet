# K Fleet Harness Evals

`harness-routing.jsonl` contains black-box prompts for evaluating routing,
composition, workflow sequencing, handoff, learning gates, and delegation
boundaries. These cases test decisions and observable ownership rather than exact
skill wording.

For an independent behavioral run:

1. Install the current K Fleet skills in an isolated fixture.
2. Run `node scripts/prepare-eval-input.mjs` and give the evaluator only its
   neutral rubric and anonymous `case-NNN` prompts, never semantic IDs, modes,
   `expected` objects, or prior reports.
3. Freeze each evaluator's raw primary skill, composed method skills, workflow
   phase order, stopping result, rationale, mutations, and contamination state.
   Keep separate run IDs and hash the complete raw runs before judging.
4. Give a separate post-hoc judge the frozen observations and hidden expectations.
   Record its stopping and per-invariant decisions without altering raw selections
   or copying expected text as evidence.
5. Run `node scripts/score-eval-results.mjs evals/current-results.json` to compare
   observations with `expected.primary`, `composed`, `forbidden`, `sequence`, and
   `invariants`.
6. Classify a mismatch as routing, method, handoff, authority, stopping, or eval
   ambiguity before changing a skill.

Every new current behavioral report must record:

- `Skill source SHA-256`, computed over the sorted `skills/*/SKILL.md` source set;
- `Eval corpus SHA-256`, `Blind input SHA-256`, `Eval tooling SHA-256`,
  `Raw observation SHA-256`, `Results SHA-256`, and `Eval protocol version`;
- the repository revision or working-tree base used to build the fixture;
- `Evaluator mode: independent, blind, read-only`;
- the exact case IDs exercised, contamination handling, mutations observed, and
  fresh results.

Run `node scripts/validate-eval-corpus.mjs` to lint the specification, score the
structured observations deterministically, and confirm that current results and
reports match their source, corpus, anonymous input, evaluation tooling,
raw-observation, and result hashes. It deliberately does not invoke a model;
independent evaluators and judges
still produce the semantic evidence.

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

The isolated [`bounded-quality`](bounded-quality) experiment compares the current
single-owner workflows, a stronger single-owner quality contract, and an
experimental sole-writing-expert topology. Its candidate skill is intentionally
outside `skills/` and the installed fixture: it does not change the eleven-skill
public contract or count as behavioral evidence until blind artifact runs satisfy
its promotion gate. [`BOUNDED_QUALITY_PILOT_REPORT.md`](BOUNDED_QUALITY_PILOT_REPORT.md)
records the first instruction-blind smoke run, the detected fixture contamination,
the later isolation limitations, and the decision not to promote. Validate the
experiment specification with:

```sh
node scripts/bounded-quality-experiment.mjs validate
```
