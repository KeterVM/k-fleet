---
name: kf-write-tests
description: Write or improve automated tests for specified behavior, regression protection, or a meaningful coverage gap, including test-first implementation.
---

# Write tests

Turn behavior contracts into tests that can expose meaningful failures. Read the
applicable project instructions, relevant requirements, code, and existing tests.
Reuse the project's test runner and conventions. Establish which behavior needs
protection before adding cases; more assertions or coverage alone is not the goal.

## Derive cases from the contract

Identify the observable result and invariants for the operation under test.
Distinguish intended behavior from incidental implementation details. Use source
code to understand entry points and failure mechanisms, not as the sole oracle
for what the result should be. Resolve material ambiguity rather than freezing
an accidental behavior in an assertion.

Select relevant normal, boundary, and failure cases. Include authorization,
retries, state transitions, concurrency, or rollback when the behavior depends on
them; do not mechanically add every category to every change. Prefer a few cases
that distinguish correct from plausible incorrect behavior over many redundant
examples. Check existing coverage before duplicating it.

## Choose a boundary that can reveal the failure

Use unit tests for isolated rules, integration tests for cooperating components
and real dependency semantics, and end-to-end tests when the complete user path
is the behavior at risk. Choose the narrowest scope that still exercises the
relevant failure; do not substitute a mocked unit test for a database transaction
or an integration contract that needs verification.

Keep the subject and the behavior being claimed real. Use doubles at boundaries
when they make unrelated dependencies controllable, and assert observable effects
rather than a copy of the mock setup. Avoid coupling tests to private helpers,
internal call order, or incidental markup unless those details are the contract.

Control time, randomness, identity, and external failures where needed. Give tests
their own state and resource cleanup so order and parallel execution do not alter
results. Prefer synchronization on observable events over fixed sleeps. Exercise
actual concurrency when claiming protection against races.

## Make each assertion discriminate

Assert the meaningful outcome, relevant state changes, and required absence of
side effects on failure. Do not derive expected values by calling the same logic
being tested or make assertions so permissive that the wrong behavior passes.
Keep setup readable enough to show why the result follows from the scenario.

For a defect, reproduce its triggering conditions and, when feasible, demonstrate
that the regression test fails for the original defect and passes with the fix.
Confirm that failure is caused by the asserted behavior rather than a setup error.
For test-first work, use the same distinction before implementing the behavior.
Do not revert shared work or modify a live environment to obtain a failing run;
use safe isolation where comparison is needed.

## Run and report

Run the relevant tests and investigate failures. Do not weaken expectations,
silently skip cases, or update snapshots solely to make the suite green. If a test
exposes a product defect, preserve a clear reproduction; fix product code only
when authorized by the task. Test-only requests do not authorize changing the
contract or concealing a failure.

Expand execution when the change affects shared fixtures or other test consumers.
Report the protected behavior, actual results, and meaningful limits, including
mocked or unexecuted boundaries. Distinguish a test written from a test run, and a
passing regression from one demonstrated to catch the original defect.
