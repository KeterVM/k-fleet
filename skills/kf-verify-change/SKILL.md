---
name: kf-verify-change
description: Verify existing changes without modifying them. Use when the user asks for a distinct review, readiness verdict, or independent verification of an already-existing pull request, commit, branch, diff, patch, implementation, or design, or when applicable guidance requires that separate verification phase. Report evidence, actionable findings, and residual risk. Do not trigger merely because an execution workflow must test or validate its own work, and do not fix findings or act as the primary feature, bug, investigation, refactor, or design workflow.
---

# Verify Change

Determine whether an existing change satisfies its intended outcome and is ready to
hand off. Verification measures and reports; it does not correct.

## Workflow

Verification independence means a fresh, non-mutating assessment against the
target and current artifact, separated from the workflow that owns correction. It
does not always require a different actor for small, low-risk checks. For a
non-trivial or high-risk review, compose `kf-delegate-subtask` when a permitted
sub-agent can materially improve independence or quality: use a fresh quality-first
read-only reviewer or verifier with the strongest suitable available model and
high or `xhigh` reasoning for difficult correctness, security, migration,
concurrency, or edge-case analysis. Give it the original target and current
artifact without the implementer's conclusion as an expected answer. Keep direct
verification with the parent when the change is routine and delegation overhead is
not justified. This workflow reconciles all evidence and owns the readiness
verdict. When required actor-level independence is unavailable, report it as an
unverified requirement rather than claiming it occurred.

1. Establish the verification target: requested outcome, observable acceptance
   criteria, artifact or diff scope, compatibility constraints, and relevant
   baseline. Separate verified facts, assumptions, and unknowns.
2. When a design contract exists, use its target, decisions, constraints,
   non-goals, acceptance evidence, unresolved assumptions, and affected boundaries
   as inputs. Revalidate them against the current repository rather than treating
   the design as proof.
3. Read applicable repository guidance, current status, the complete in-scope diff
   or artifact, and affected code paths before selecting checks.
4. Assess impact and risk. Choose the smallest meaningful combination of focused
   tests, type checking, linting, formatting checks, builds, schema or migration
   validation, compatibility checks, and broader suites supported by actual
   tooling.
5. Review the change against its acceptance criteria, repeated repository patterns,
   public contracts, and unaffected behavior. Trace important boundaries rather
   than validating filenames or exit codes alone.
6. Run the selected checks and inspect their complete relevant results. Prefer
   check, dry-run, or non-mutating modes when available, and inspect status again
   for artifacts produced by verification commands.
7. Classify each failure as change-caused, pre-existing, environmental, or
   unresolved only when evidence supports that classification. Do not attribute a
   failure by timing or proximity alone.
8. Report only actionable findings, ordered by severity. For each finding, state
   the evidence, violated outcome or invariant, impact, confidence, and the
   execution workflow that should own correction.
9. Give a readiness result of **ready**, **not ready**, or **indeterminate**. Report
   checks run and their results, critical checks not run, produced artifacts,
   assumptions, and residual risk.

## Diff review profile

Use this profile in addition to the workflow when the target is a pull request,
commit, branch, patch, or working-tree diff.

1. Review the complete in-scope diff and the affected execution paths for defects
   in correctness, security, performance, and maintainability. Inspect unchanged
   dependencies when they are needed to prove or disprove an impact.
2. Scope findings to problems introduced by the change or made newly reachable by
   it. Treat unrelated pre-existing problems as baseline or residual-risk evidence,
   not findings against the change, unless the change worsens them.
3. Require a concrete trigger or reachable state, the violated contract or
   invariant, and a material impact. Do not report style preferences, speculative
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

Severity informs prioritization but does not replace the readiness decision. A
finding that violates the requested outcome or a blocking invariant prevents a
**ready** result regardless of its label.

## Correction routing

- Missing or incorrect requested behavior returns to `kf-implement-feature`.
- A demonstrated violation of an existing contract returns to `kf-fix-bug`.
- A structural problem whose correction must preserve behavior returns to
  `kf-refactor-code`.
- An unexplained failure or uncertain cause returns to `kf-investigate-issue`.
- An unresolved acceptance contract, interface, migration, or architecture decision
  returns to `kf-design-change`.
- A verified recurring contradiction in workflow method, routing, or guidance is
  reported as a learning signal for `kf-learn-from-evidence`; verification does
  not persist the lesson.

If the user asks to verify and repair in one request, complete and report the
verification first, then hand the findings to the applicable execution workflow.
Do not perform the repair while operating under this skill.

After the execution workflow reports correction complete, re-enter verification
with the original target and the current artifact. Reassess the affected checks and
publish a new readiness result; do not reuse the earlier verdict. Continue only
while evidence shows progress and the requested authorization still covers the
next correction. Stop when the result is ready, a blocker makes it indeterminate,
the same unresolved failure repeats without new evidence, or another correction
would require broader authority.

## Constraints

- Do not edit source, tests, documentation, configuration, snapshots, generated
  artifacts, or the reviewed design. Running checks is allowed; intentional
  correction is not.
- Do not weaken, disable, update, or reinterpret a check to make the result pass.
- Do not hide contradictory evidence, existing failures, incomplete coverage, or
  commands that could not run.
- Do not claim readiness while a blocking finding remains or a critical risk lacks
  meaningful evidence.
- Do not run every expensive check by default. Match verification depth to the
  change's impact, reversibility, and repository practice.

## Completion questions

- Does the change solve the requested task?
- Does it follow repeated repository patterns?
- Does it preserve unrelated behavior?
- Did it introduce unnecessary abstractions or dependencies?
- Does it touch unrelated code or formatting?
- Is a simpler complete implementation available?
- Were the relevant checks actually run?
- Is every failure classification supported by evidence?
- Are correction and verification still owned by separate workflows?
- When repair was requested, was the corrected artifact re-verified against the
  original target?

Verification is complete when the readiness result, material findings, supporting
evidence, unrun critical checks, and residual risk are explicit.
