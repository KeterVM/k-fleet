---
name: kf-verify
description: Verify delivered software against its request, or review scoped code, reporting supported defects, improvement opportunities, and unverified obligations. Use when verification or code review is requested, or when material uncertainty remains beyond an implementation's own self-checks.
---

# Verify

Establish whether delivery does what was asked, with conclusions limited to the
evidence, actionable findings, and explicit gaps. Reuse applicable tests and results;
a separate agent is optional.

## Method

These are the decisions to settle, in their usual order; skip any the request
already answers. One ordering is fixed: derive the obligations from the request,
accepted scope, and project rules before weighing the implementation's tests,
because the implementation and its tests are what you are checking.

1. **Set the scope and mode.** Establish the repository/worktree, project
   instructions, requested scope, and stopping condition, and whether correction is
   authorized: verification and review report findings; authorized correction
   continues through fixes and rechecks.

2. **Map the obligations** from the request, accepted scope, and project rules to
   observable outcomes and the entry points that deliver them. Resolve consequential
   ambiguity. Look for omitted behavior, incomplete wiring, narrowed assumptions, and
   hidden manual steps, and note the affected callers, dependencies, permissions,
   state, and available environments.

3. **Choose checks that could fail.** For each obligation, pick the narrowest check
   that would expose a plausible wrong behavior at the boundary at risk: an existing
   test, inspection, interaction, or runtime probe. Wiring needs the real entry
   point; usability needs more than a build. Prioritize by consequence, exposure, and
   uncertainty, keep required project checks, and reuse results whose version,
   environment, and scope still apply. Stay within the affected scope, including
   cooperating parts. For added or materially changed components and boundaries, or
   on request, also inspect names, ownership, interfaces, and actual dependencies
   together for mixed responsibilities, one rule owned in several places, and
   callers or dependencies that defeat an intended boundary, and check custom
   general-purpose mechanisms against mainstream libraries.

4. **Classify what each observation establishes.**

   | Kind | Test | Action |
   | --- | --- | --- |
   | Confirmed defect | A reachable trigger violates an obligation with a supported consequence, shown by a run or a complete source trace | Report trigger, expected and actual, location, and impact; fix it when correction is authorized |
   | Unverified obligation | The check was blocked or the environment cannot exercise the behavior, while the supported setup itself works | Try another permitted method; report what remains and the capability needed; count it as neither passed nor failed |
   | Risk | A plausible concern still missing a premise | Investigate when it could change the conclusion; otherwise report it as a lead with what would settle it |
   | Improvement (structure or reuse) | Traced imports, calls, or a concrete change scenario show a misplaced or scattered rule or a defeated boundary; or a supported alternative would make a custom mechanism clearer or more reliable | Report it apart from defects with location, the trace or comparison, the consequence or benefit, and any adoption cost; it needs no failure trigger |
   | Preference | Layout, naming taste, or popularity with no contract or consequence behind it | Leave it out, or mark it optional |

   When a check fails, tell a product failure from a wrong test expectation, a setup
   problem, or an unavailable dependency before assigning a cause; a broken supported
   setup is itself a defect. Judge severity by the effect on users or data, scope,
   reachability, and recovery, separately from confidence.

5. **Correct and recheck** when authorized. Keep the failing scenario and contract
   fixed; change an expectation only on an authoritative basis. Recheck the original
   scenario and what the fix can affect, and revisit results whose premises it
   changed. Finish authorized corrections within scope before calling the task done.

6. **Finish** when required checks are accounted for, every material obligation has a
   result or an explicit gap, and problems are characterized enough to act on. Report
   the version and scope, decisive results, findings by kind, and limits, keeping
   environmental limits apart from product defects. Run independent checks past a
   blocked one. An assessment can finish with defects or gaps; the delivery is
   complete only once they are resolved.

   When checks disagree, investigate what each exercised instead of counting
   passes. When a failure recurs after a fix, revisit the diagnosis or design
   assumption before patching again.

## Examples (illustrative)

**Looks verified, is not.** "Verify that the nightly backup now uploads to the new
bucket." Unit tests pass against a mocked storage client and the build is green, but
the deployed job reads its bucket from `backup.toml`, which still names the old one.
The tests cover the upload code; the requested outcome fails through the real
configuration. Report a confirmed defect with the file and line.

**Looks failed, is unverified.** "Check that single sign-on still works after the
session change." The end-to-end login test fails at the identity provider's test
tenant, which returns 503 for every application, including ones this change does not
touch. Record sign-on as unverified, name the tenant access needed, and run the
session checks that do not depend on it.

## Supporting references

Read a reference only for the decision that is stuck:

- An unfamiliar surface, or a missing tool or environment (steps 2–3):
  [Environments and tools](references/environments-and-tools.md).
- Whether a check covers a claim, behavioral and failure coverage, or a rename or
  replacement (step 3): [Evidence and coverage](references/evidence-and-coverage.md).
- A structural or ecosystem-reuse assessment (steps 3–4):
  [Structure and reuse](references/structure-and-reuse.md).
- A failure, conflicting results, or the evidence and severity of a finding (step 4):
  [Diagnosis and findings](references/diagnosis-and-findings.md).
- A correction, new regression protection, or rechecks (step 5):
  [Corrections and rechecks](references/corrections-and-rechecks.md).

## Boundaries

- Work within the current repository/worktree, project instructions, and existing
  authorization. Read-only reviews stay read-only: use non-mutating probes and
  propose persistent tests. Pause only work that depends on missing evidence,
  capabilities, or user intent, and continue the rest.
- Current instructions and repository sources outrank recalled or inferred context,
  which grants no permission. Within higher-priority constraints, explicit user
  instructions override this skill; when one of its rules stops work, quote the rule
  and separate it from your interpretation.
- Use permitted environments and disposable state where mutation is authorized.
  Verification access grants no permission for production mutations, external
  messages, or deployment.
- Report only what you observed, and label inspection as inspection. Passing checks
  establish what they exercised: a green suite that misses requested behavior is not
  complete delivery, and local checks are not production readiness.
