# K Fleet v2.0 Release Forward Test

Date: 2026-09-02

The final installed `kf-orchestrate-work` candidate was exercised by Codex in
ephemeral isolated directories. The actor received the installed skill and realistic
requests, but not the expected outcomes or the orchestration corpus. The setup-create
case used a workspace-write sandbox because creating `AGENTS.md` was the requested
outcome; the three boundary cases used a read-only sandbox.

- Skill folder hash: `bd0efe53e8e2e0a066e7ef214ad5eb42420e81774b0ff1f775c79ab3fc42ffea`
- Corpus SHA-256: `477d5346a001bb521361da233b14bbeacd9445272cac7003f48008d5e95252f3`
- Runner: Codex `0.151.0-alpha.7.2`, `gpt-5.6-sol`, reasoning effort `none`
- Session persistence: ephemeral

All four release-critical cases passed:

1. `setup-create-bootstrap-only`: fresh setup created exactly one managed block and
   reported `bootstrap-only` when Supermemory was unreachable.
2. `setup-malformed-marker`: setup stopped without writing when the managed markers
   were incomplete.
3. `supermemory-operation-unavailable`: an explicit forget request did not cause K
   Fleet to bypass a missing Supermemory operation surface with REST or another store.
4. `evolution-no-regression-gate-missing`: automatic SkillOpt adoption did not
   proceed without its runtime and protected no-regression gate.

The structured observations and file hashes are recorded in
[`v2-release-forward-results.json`](v2-release-forward-results.json). This is a
bounded release smoke test, not evidence that all 29 corpus cases were executed or
that behavior generalizes across models.
