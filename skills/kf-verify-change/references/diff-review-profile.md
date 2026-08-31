# Diff Review Profile

Use this profile when the verification target is a pull request, commit, branch,
patch, or working-tree diff.

1. Review the complete in-scope diff and affected execution paths for correctness,
   security, performance, and maintainability defects. Inspect unchanged
   dependencies when needed to prove or disprove an impact.
2. Scope findings to problems introduced by the change or made newly reachable by
   it. Treat unrelated pre-existing problems as baseline or residual-risk evidence
   unless the change worsens them.
3. Require a concrete trigger or reachable state, the violated contract or
   invariant, and material impact. Do not report style preferences, speculative
   concerns, or issues already enforced by a check that passes.
4. Calibrate severity from reachability, likelihood, blast radius, and
   recoverability:
   - **P0 — Critical:** catastrophic security impact, widespread data loss or
     corruption, or an immediate production outage.
   - **P1 — High:** a serious security, correctness, or availability failure on a
     common or important path that should block merging.
   - **P2 — Medium:** a concrete defect under narrower but plausible conditions
     that should normally be fixed before merging.
   - **P3 — Low:** a limited-scope but actionable defect with modest impact; never
     use P3 for cosmetic preferences.
5. Lead with findings ordered by severity. Give each a `[P0]` through `[P3]`
   title, the tightest useful file and line reference, and one concise explanation
   of the trigger, impact, evidence, and remediation direction. State confidence
   when it is less than high.
6. When inline review comments are supported, attach each finding to the smallest
   relevant changed-line range and do not duplicate it in the summary. If there
   are no actionable findings, say so explicitly and report only meaningful
   residual risks or validation gaps.

Severity informs prioritization but does not replace readiness. A finding that
violates the requested outcome or a blocking invariant prevents a **ready** result
regardless of its label.
