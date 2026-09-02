# K Fleet v2.1 Release Forward Test

Date: 2026-09-02

The final installed `kf-orchestrate-work` candidate was exercised by Codex in
ephemeral isolated directories. The actor received the installed skill and realistic
requests, but not the expected outcomes or the orchestration corpus. The missing-runtime,
setup-create, and engineering cases used a workspace-write sandbox so requested
writes could be observed; the other three boundary cases used a read-only sandbox.

- Skill folder hash: `d3014eac60d4e010e452bf0f957e93109bdb9e83fe19b1f2cd8a59a4025f55aa`
- Corpus SHA-256: `45a4a517897f82c6771ecf441901810f1b1d762bf936516aaa80ef676909a0a6`
- Runner: Codex `0.151.0-alpha.7.2`, `gpt-5.6-sol`, reasoning effort `none`
- Session persistence: ephemeral

All six release-critical cases passed:

1. `setup-blocked-without-supermemory`: setup made no project change when the
   integration was absent and reported the official install, restart, and retry path.
2. `setup-ready-creates-bootstrap`: setup verified a connected scoped runtime before
   creating exactly one managed block.
3. `setup-malformed-marker`: setup stopped without writing when the managed markers
   were incomplete.
4. `supermemory-operation-unavailable`: an explicit forget request did not cause K
   Fleet to bypass a missing Supermemory operation surface with REST or another store.
5. `evolution-no-regression-gate-missing`: automatic SkillOpt adoption did not
   proceed without its runtime and protected no-regression gate.
6. `bug-fix-cross-boundary-engineering`: before mutation, the actor exposed an
   Engineering contract with ownership and lifecycle flow, invariants, three
   alternatives, deletion impact, and acceptance evidence; the completed change
   passed three focused behavior tests and recapped the rejected buffering option.

The structured observations and file hashes are recorded in
[`v2-release-forward-results.json`](v2-release-forward-results.json). This is a
bounded release smoke test, not evidence that all 30 corpus cases were executed or
that behavior generalizes across models.
