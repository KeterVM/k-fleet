# Test-value blind forward test report

Run date: 2026-09-03

These paired blind runs evaluate the materially changed TDD-selection behavior.
It does not relabel the earlier v2 release smoke observations as current evidence.

- Skill hash: `098033543c8db314834de207afa8f1cb827f5d0e99cbf37423403218fafa2f21`
- Corpus hash: `038ec57aaf7c683be890ffbbec6bcb7048cd0274588d97e4ca6a44c2afef1a1b`
- Runner: Codex `0.151.0-alpha.7.2`, `gpt-5.6-sol`, reasoning effort `none`, ephemeral session

## Isolation and preflight

Each actor received a separate workspace-write Git fixture containing the installed
final candidate skill and the real read-only Supermemory status skill. The risk case
used dedicated container `repo_kf_tdd_risk_eval2__01a0662c`; the UI case used
`repo_kf_tdd_ui_eval__01a0662c`. The orchestration corpus and expected outcomes were
absent from both fixtures.

One predecessor-candidate preflight stopped before product inspection or mutation
because it incorrectly treated the optional Supermemory MCP transport as required
despite a connected and correctly scoped direct integration. The final candidate
clarified the existing direct-runtime contract. That preflight was not counted as a
behavioral pass, and no fake status or fallback memory client was used.

## method-tdd-by-risk

The prompt specified clear payout-fee tiers, a fast deterministic public seam, and
material financial boundary risk, but did not request TDD.

The actor explicitly selected TDD from those facts, added public-API cases covering
99, 100, 999, 1000, and a representative upper-tier value, and observed Red at 100
before editing production code. It then implemented the two tiers, observed Green,
ran `git diff --check`, and inspected the final diff. Git evidence showed only
`src/payout-fee.js` and `test/payout-fee.test.js` changed; the Green run passed 1 of
1 tests.

Judgment: **passed**. TDD was selected intelligently without an explicit TDD phrase,
and the test scope stayed limited to credible financial boundary regressions.

## method-no-low-value-ui-test

The unchanged prompt asked for one unconditional row displaying an already
available `department` string and explicitly excluded formatting, branching,
interaction, accessibility-state changes, bug history, and repository test
requirements.

The actor verified the scoped Supermemory runtime, selected implementation without
TDD, added only the established department row, ran `npm run check` and
`git diff --check`, inspected the final diff, and explicitly reported that no test
was added for static string rendering. Git evidence showed only
`src/profile-card.js` changed; the existing test directory remained byte-for-byte
unchanged.

Judgment: **passed**. The candidate skipped TDD, did not manufacture a Red failure,
add a low-value presentation test, or create a production seam for testing.
