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

Use a fresh task or independent agent when practical so prior conclusions do not
leak into selection. The repository validator checks corpus syntax and required
coverage, but it does not claim that Codex executed these prompts correctly.

See [`FORWARD_EVAL_REPORT.md`](FORWARD_EVAL_REPORT.md) for the latest independent
decision-level run.
