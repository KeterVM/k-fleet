---
name: kf-verify-change
description: Verify an existing pull request, commit, branch, diff, patch, implementation, or design without modifying it. Use for a distinct review, readiness verdict, or required independent verification phase. Report evidence, actionable findings, and residual risk. Do not trigger for an execution workflow's routine validation, fix findings, or act as the primary feature, bug, investigation, refactor, or design workflow.
---

# Verify Change

Determine whether an existing change satisfies its intended outcome and is ready to
hand off. Verification measures and reports; it does not correct.

## Workflow

Verification independence means a fresh, non-mutating assessment against the
target and current artifact, separated from the workflow that owns correction. It
does not always require a different actor for small, low-risk checks. For a
non-trivial or high-risk review, compose `kf-delegate-subtask` when a permitted
sub-agent can materially improve independence or quality. Prefer the optional
read-only `kf_reviewer` companion agent when available and appropriate. Give it
the original target and current artifact without the implementer's conclusion as
an expected answer.

Keep direct verification with the parent when the change is routine and delegation
overhead is not justified. This workflow reconciles all evidence and owns the
readiness verdict. When required actor-level independence is unavailable, report
it as an unverified requirement rather than claiming it occurred.

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

## Target-specific references

- For a pull request, commit, branch, patch, or working-tree diff, read the
  [diff review profile](references/diff-review-profile.md) before reviewing.
- For a high-risk or indeterminate assessment, or when repair and re-verification
  are both requested, read the
  [readiness evidence checklist](references/readiness-evidence.md).

## Correction routing

- Missing or incorrect requested behavior returns to `kf-implement-feature`.
- A demonstrated violation of an existing contract returns to `kf-fix-bug`.
- A structural problem whose correction must preserve behavior returns to
  `kf-refactor-code`.
- An unexplained failure or uncertain cause returns to `kf-investigate-issue`.
- An unresolved acceptance contract, interface, migration, or architecture
  decision returns to `kf-design-change`.
- A verified recurring contradiction in workflow method, routing, or guidance is
  reported as a learning signal for `kf-learn-from-evidence`; verification does
  not persist the lesson.

If the user asks to verify and repair in one request, complete and report the
verification first, then hand findings to the applicable execution workflow. Do
not perform repair while operating under this skill.

After the execution workflow reports correction complete, re-enter verification
with the original target and current artifact. Publish a new readiness result; do
not reuse the earlier verdict. Continue only while evidence shows progress and the
authorization covers the next correction. Stop when ready, when a blocker makes
the result indeterminate, when the same unresolved failure repeats without new
evidence, or when another correction requires broader authority.

## Constraints

- Do not edit source, tests, documentation, configuration, snapshots, generated
  artifacts, or the reviewed design. Running checks is allowed; intentional
  correction is not.
- Do not weaken, disable, update, or reinterpret a check to make the result pass.
- Do not hide contradictory evidence, existing failures, incomplete coverage, or
  commands that could not run.
- Do not claim readiness while a blocking finding remains or a critical risk lacks
  meaningful evidence.
- Do not run every expensive check by default. Match depth to impact,
  reversibility, and repository practice.

Verification is complete when the readiness result, material findings, supporting
evidence, unrun critical checks, and residual risk are explicit.
