# K Fleet orchestration evals

`orchestrator-routing.jsonl` is the current linted corpus for the hard-cutover
architecture. It tests the single public orchestrator's route, conditional methods,
phase sequence, stopping state, memory isolation, source authority, delegation, and
SkillOpt gate boundaries.

The corpus is not an execution result. Fresh blind runs must bind the exact skill
tree, corpus, tooling, observations, and judgments before K Fleet publishes a
behavioral claim.

`astra-forward-results.json` and `ASTRA_FORWARD_TEST_REPORT.md` describe the current
bounded prompt-simplification runs. Their `astra-forward/` evidence records retain
sanitized actor events and independently inspected fixture artifacts, bound by hash.
The v2 release and test-value result files retain their original source bindings as
historical observations; they are not relabelled as current results.

The current results retain an explicit-user-override failure and an original-source
control in `knownFailures`. Integrity validation must preserve the failed status;
it does not certify that all protected behavioral gates passed.

`archive/v1/` preserves reports, corpora, results, and experiment material from the
retired multi-skill architecture. Those artifacts are intentionally excluded from
current structural validation and must not be described as evidence for
`kf-orchestrate-work`.
