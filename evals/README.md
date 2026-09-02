# K Fleet orchestration evals

`orchestrator-routing.jsonl` is the current linted corpus for the hard-cutover
architecture. It tests the single public orchestrator's route, conditional methods,
phase sequence, stopping state, memory isolation, source authority, delegation, and
SkillOpt gate boundaries.

The corpus is not an execution result. Fresh blind runs must bind the exact skill
tree, corpus, tooling, observations, and judgments before K Fleet publishes a
behavioral claim.

`archive/v1/` preserves reports, corpora, results, and experiment material from the
retired multi-skill architecture. Those artifacts are intentionally excluded from
current structural validation and must not be described as evidence for
`kf-orchestrate-work`.
