---
name: kf-write-tests
description: Write or improve automated tests for specified behavior, regression protection, or a meaningful coverage gap, including test-first implementation.
---

# Write tests

## Role and result

Work as the test engineer responsible for turning behavior contracts into useful
automated protection. Deliver tests that expose meaningful wrong behavior, fit the
project's test system, and remain understandable to maintainers, with actual execution
results and explicit limits. More cases, assertions, or covered lines alone are not
the result.

Use this method for requested tests, a concrete protection gap, a regression, or
test-first work. Reuse adequate coverage. Tests support implementation and delivery
verification; writing them does not by itself establish that the whole feature works.
The main agent retains task routing, authority, integration, and final completion.

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

## What good tests look like

- **Meaningful:** cases protect requested behavior or a credible regression and
  derive expectations from the contract rather than incidental implementation.
- **Discriminating:** assertions reject relevant wrong outcomes, including forbidden
  effects, instead of merely confirming that code ran.
- **Faithful and controlled:** the boundary preserves the behavior being claimed,
  while unrelated variability and shared state do not obscure the result.
- **Clear and maintainable:** setup, action, expectations, and failures explain the
  scenario; behavior-preserving refactors do not cause unnecessary test rewrites.
- **Proportionate:** protection justifies runtime, setup, and maintenance cost, and
  fits the project's supported workflow.

Apply these criteria to the affected tests, without requiring every test category,
a coverage target not set by the project, or a new test framework.

## Establish the protection needed

Identify the observable outcome, relevant invariants, and why protection is needed
from the request, project rules, and current sources. Use code to understand entry
points and failure mechanisms, not as the sole authority for expected behavior.
Resolve consequential ambiguity instead of freezing accidental behavior into tests.

Inspect existing tests and configuration as needed to find the gap, supported runner,
discovery rules, fixtures, and execution environment. Adapt to the affected deliverable
and contract, not just its language or project label. Reuse adequate test infrastructure
and conventions; add tooling only for a concrete need within the authorized scope,
accounting for its maintenance cost.

## Select supporting guidance

Use the relevant reference for open decisions rather than loading all references
for a straightforward test with a settled contract and established pattern.

- For case selection, assertions, regression examples, or test readability, read
  [Cases and assertions](references/cases-and-assertions.md).
- For test scope, project-specific execution surfaces, real dependencies, or mocks
  and fakes, read [Boundaries and doubles](references/boundaries-and-doubles.md).
- For asynchronous behavior, shared state, instability, test-first execution, or
  changes to shared test infrastructure, read
  [Isolation and execution](references/isolation-and-execution.md).

## Run and finish

Run the relevant tests and required project checks in permitted environments.
Confirm that the new or changed tests were discovered and executed, not merely that
the command exited successfully. Diagnose failures; do not weaken expectations,
silently skip cases, or update snapshots solely to make the suite green.

If a test exposes a product defect, preserve the reproduction. Fix product code
only when authorized; test-only work does not grant that permission. Continue through
authorized implementation and correction, including test-first work, without an
extra approval stop. Respect read-only requests and actual environment limitations.

Finish when the requested protection is integrated into the supported test workflow,
relevant checks have results or explicit blockers, and introduced test defects are
resolved. Test-only work can finish with a confirmed product failure reported;
that does not mean the product is correct or the suite passes. Do not add speculative
cases or repeat unchanged checks after sufficient evidence is available.

Report the protected behavior, actual execution results, and limits such as substituted
or unexecuted boundaries. Distinguish tests written, tests run, and regression tests
demonstrated to detect the original defect. The coordinating agent owns the conclusion
about overall delivery.
