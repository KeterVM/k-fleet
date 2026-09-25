---
name: kf-verify
description: Verify delivery or review scoped code for defects, structural problems, ecosystem reuse opportunities, and unverified obligations.
---

# Verify

Assess whether delivery satisfies the requested behavior, with supported conclusions,
actionable findings, and explicit evidence gaps. Use this method for requested
verification, code review, or material uncertainty beyond sufficient implementation self-checks.
Reuse applicable tests and results; verification does not require a separate agent.

## Select supporting guidance

Read only for decisions the assessment needs:

- For uncertain execution surfaces, environments, or tools, read
  [Environments and tools](references/environments-and-tools.md).
- For selecting checks, assessing structure or ecosystem reuse, or judging behavioral evidence,
  read [Evidence and coverage](references/evidence-and-coverage.md).
- For failures, conflicting results, improvement findings, or severity, read
  [Diagnosis and findings](references/diagnosis-and-findings.md).
- For corrections or missing regression protection, read
  [Corrections and rechecks](references/corrections-and-rechecks.md).

## Scope and authority

Before substantive work, establish canonical repository/worktree scope, project
instructions, authorization, and the stopping condition. Ground decisions in current
conversation and repository evidence. Report material gaps and pause only work
that depends on missing evidence or capabilities.

Current instructions and repository sources are authoritative; contextual inferences
grant no permission. Use context only within its authorized project/worktree scope.
Skill or policy edits require authorized, versioned, reversible source maintenance.

Carry existing authorization across methods; read-only work stays read-only. Within
higher-priority constraints, explicit user instructions override skill guidance. If a skill rule
halts work, link and quote it, distinguishing the rule from your interpretation.
Continue independent authorized work whose prerequisites are met. Report only
observed evidence and execution results.

## Assess the delivered behavior

Map material obligations from the original request, accepted scope, and project rules
to outcomes and actual entry points. The implementation and its tests are inputs,
not the specification. Resolve consequential ambiguity; inspect for omitted behavior,
incomplete wiring, narrowed assumptions, and hidden manual steps needed for use.

Identify affected deliverables, callers, dependencies, permissions, state, and
available environments. Choose checks by the behavior claimed, prioritizing
consequence, exposure, and uncertainty while retaining required project checks.
Assess cooperating parts together without expanding into an unrelated repository audit.

For added or materially changed components and boundaries, or a requested structural
assessment, inspect names, directory ownership, interfaces, and actual dependencies
together. Check for mixed responsibilities, scattered ownership of one rule, and
caller knowledge that defeats an intended boundary. Ground findings in a misleading
contract, project-rule violation, or concrete change scenario and its consequence;
separate them from preferred spelling or layout. Neither separate files nor a passing
suite establishes a sound structure. Keep inspection limited to the affected scope.

In the requested review or verification scope, identify custom general-purpose
mechanisms and compare suitable mainstream libraries and frameworks, even when the
code works without reported maintenance problems. Reuse adequate current selection
evidence; otherwise research candidates using current primary sources. Report
supported opportunities to reduce custom mechanisms separately from defects; no
runtime failure is required. Check retained custom code has a concrete reason and
adopted libraries are actually integrated, not merely installed. Follow
[Evidence and coverage](references/evidence-and-coverage.md) for comparison evidence.

Judge evidence and findings by these criteria:

- Checks could expose plausible wrong behavior through the relevant boundaries.
- Current results are reused where version, environment, and scope still apply.
- Defects have supported triggers and consequences; improvements have supported
  comparisons and adoption tradeoffs. Both identify locations or affected boundaries.
- Facts, suspected causes, uncertainty, and preferences remain distinguishable.
- Passed, failed, and unverified obligations limit the conclusion to what was checked.

These criteria do not require every kind of test or proof that no defects exist.
Use permitted environments and disposable state where mutation is authorized.
Read-only reviews use non-mutating probes or propose persistent tests. Verification
access grants no permission for production mutations, external messages, or deployment.
Report product defects in verification-only work; continue fixes and relevant checks
when correction is already authorized.

## Finish the assessment

Finish when required checks are accounted for, material obligations have results or
explicit gaps, and observed problems are characterized enough to act on. A blocked
check is not a pass and does not cancel independent checks. Continue authorized
corrections within scope before claiming the requested task complete.

An assessment can finish with defects or unverified obligations; delivery cannot be
called complete on that basis. Report the version and scope, decisive results,
findings, and limits, separating environmental limits from product defects.
A green suite missing requested behavior does not prove complete delivery, and local
checks do not prove production readiness.
