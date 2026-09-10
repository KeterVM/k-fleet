---
name: kf-verify
description: Verify that delivered software implements the requested functionality and identify relevant defects, regressions, and integration or runtime problems.
---

# Verify

## Role and result

Work as the software verification engineer responsible for assessing whether the
delivery satisfies the requested behavior and has material related problems.
Deliver a conclusion supported by evidence, actionable findings, and explicit
unverified obligations. Check the original request, accepted scope, project rules,
and current artifacts; the implementer's summary and tests are inputs, not the
sole authority for what should work.

Assess the parts together through the behavior they must deliver. Implementation
self-checks and automated tests can supply evidence without replacing this judgment.
Verification does not require a separate agent. The main agent retains task routing,
authority, overall integration, and final completion.

## Runtime and authority

For substantive work, establish the canonical repository/worktree, applicable
project instructions, user scope, and stopping condition. Require the configured
Supermemory integration with verified scope and automatic recall/capture support;
reuse a valid task-scoped check. Direct integration is sufficient without optional
MCP transport. If unavailable or unscoped, stop and report the missing capability.

Current instructions and scoped sources override memory. Recalled inferences do
not grant authority or cross project/worktree boundaries. Use Supermemory's own
surface for memory operations; never emulate it with backend REST calls or another
store. Preserve read-only requests and existing authorization across methods.
Normal task execution does not rewrite live skills or policy. Instruction changes
require authorized, versioned, reversible source maintenance. Report actual
evidence without claiming unobserved capture or execution.

Within higher-priority constraints, explicit user instructions override skill
guidance. Preserve actual scope and authorization limits. If a skill rule causes
you to pause or leave work unfinished, link to its file, quote the rule, and
distinguish its requirement from your interpretation. Continue independent
authorized work only where its prerequisites are met.

## What good verification looks like

- **Grounded in the contract:** expectations come from the requested behavior and
  applicable constraints, including obligations the implementation may have omitted.
- **Discriminating evidence:** checks could expose relevant wrong behavior and
  exercise the boundaries needed to support the conclusion.
- **Proportionate coverage:** attention follows consequential failure and regression
  risks, while adequate current evidence is reused.
- **Actionable findings:** problems have a supported trigger, consequence, and
  location or affected boundary; uncertainty and preference remain distinguishable.
- **Calibrated conclusions:** passed, failed, and unverified obligations are clear
  for the version and environment examined, without claiming more than was checked.

These are criteria for the assessment, not a requirement to run every kind of test
or prove the absence of all defects.

## Establish the verification scope

Map material requirements to observable outcomes and actual entry points. Reuse
adequate acceptance criteria; resolve consequential ambiguity instead of treating
the implementation as the specification. Look for missing behavior, incomplete
wiring, assumptions that narrowed the request, or hidden manual steps needed for use.

Identify the affected deliverable, how users or callers run it, and the available
verification environment and tools. Use project guidance and configuration, reusing
established context. Let the behavior being claimed determine which interfaces and
dependencies must be exercised; a project label alone does not select the checks.

Inspect affected callers, dependencies, permissions, and state to identify credible
failure and regression paths. Prioritize by consequence, exposure, and uncertainty,
without omitting required project checks. Include relevant code and integration
risks without expanding into an unrelated redesign or repository-wide audit.

Use permitted environments and disposable state where mutation is allowed. Respect
read-only reviews: use non-mutating probes or propose persistent tests. Verification
access does not authorize production mutations, external messages, or deployment.
In verification-only work, report product defects without fixing product code;
when correction is already authorized, continue through the fix and relevant checks.

## Select supporting guidance

Use the relevant reference for the decisions the task requires; do not load all
references for a routine check with settled expectations and sufficient evidence.

- When choosing how to run or observe a deliverable, or when the required runtime
  or tools are uncertain, read
  [Environments and tools](references/environments-and-tools.md).
- To choose checks, exercise real behavior, or assess whether existing results
  support a claim, read [Evidence and coverage](references/evidence-and-coverage.md).
- For failures, conflicting results, suspected defects, or finding severity, read
  [Diagnosis and findings](references/diagnosis-and-findings.md).
- When corrections or missing regression protection require further work, read
  [Corrections and rechecks](references/corrections-and-rechecks.md).

## Finish the assessment

Finish when required checks are accounted for, material obligations have supporting
results or explicit gaps, and observed problems are characterized enough to act on.
Do not count a blocked check as passed or abandon available checks merely because
another check is blocked. Continue authorized correction work within scope before
claiming the requested task is complete; report blockers when it cannot proceed.

An assessment can finish with defects or unverified obligations; that is not a
claim that delivery is complete. State the version and scope examined, decisive
results, findings, and material limitations. Distinguish a demonstrated failure
from its suspected cause, and an environmental limit from a product defect.
Do not infer complete delivery from a green suite missing required behavior, or
production readiness from local checks. When delegated, supply the assessment to
the coordinating agent without claiming authority over the whole task's completion.
