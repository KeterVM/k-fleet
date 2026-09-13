---
name: kf-verify
description: Assess delivery when verification is requested or material behavior lacks sufficient evidence; identify defects and unverified obligations.
---

# Verify

Assess whether delivery satisfies the requested behavior, with supported conclusions,
actionable findings, and explicit evidence gaps. Use this method for requested
verification or material uncertainty beyond sufficient implementation self-checks.
Reuse applicable tests and results; verification does not require a separate agent.

## Select supporting guidance

Read only for decisions the assessment needs:

- For uncertain execution surfaces, environments, or tools, read
  [Environments and tools](references/environments-and-tools.md).
- For selecting checks or judging whether results establish real behavior, read
  [Evidence and coverage](references/evidence-and-coverage.md).
- For failures, conflicting results, suspected defects, or severity, read
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

The main agent owns routing, authority, integration, and completion. Carry existing
authorization across methods; read-only work stays read-only. Within higher-priority
constraints, explicit user instructions override skill guidance. If a skill rule
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

When assessing structure or maintainability, inspect whether affected files combine
independent responsibilities. Ground a finding in the distinct rules, dependencies,
or change scenarios and their maintenance consequence, rather than file length or
preferred layout. Separate functions in one file and a passing suite do not establish
responsibility separation; also check extracted modules for hidden coupling.

Judge evidence and findings by these criteria:

- Checks could expose plausible wrong behavior through the relevant boundaries.
- Current results are reused where version, environment, and scope still apply.
- Findings have supported triggers, consequences, and locations or affected boundaries.
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
checks do not prove production readiness. When delegated, return evidence to the
coordinating agent without claiming overall task completion.
