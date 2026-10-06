---
name: kf-write-tests
description: Write or improve automated tests that protect specified behavior. Use for requested tests, regression protection for a defect, a meaningful coverage gap, or test-first implementation.
---

# Write tests

Turn behavior contracts into automated protection that fails when the behavior is
wrong. Reuse adequate existing coverage and the project's supported test workflow;
the number of tests does not show that a feature works.

## Method

These are the decisions to settle, in their usual order; skip any the request
already answers. One ordering is fixed: derive the expected results from the
request, project rules, and current sources before reading what the code returns,
because a test written from the current output freezes whatever the code does,
defects included.

1. **Set the scope and mode.** Establish the repository/worktree, project
   instructions, the behavior to protect, and the stopping condition. Decide whether
   product changes are authorized: test-only work reports product defects; authorized
   implementation or correction continues through the fix and its checks without
   another approval stop.

2. **Derive the expectations** and relevant invariants from the request, project
   rules, and current sources. Use the code to find entry points and failure
   mechanisms rather than as the specification, and resolve material ambiguity
   instead of encoding accidental behavior.

3. **Choose the boundary and what stays real.** Inspect existing tests and
   configuration for the gap, runner, discovery, fixtures, and environment. Pick the
   boundary from the claim, not the project's language or the test's label.

   | Claim | Test | Action |
   | --- | --- | --- |
   | Isolated rule | The outcome depends only on inputs | Unit-test the public interface with explicit expected values on each side of the rule and at its edge |
   | Dependency semantics | The claim relies on how a database, protocol, queue, or library behaves | Keep that dependency real, or use a maintained double that preserves the relied-on contract; assert resulting state |
   | Wiring or user path | The claim is that callers or users reach the behavior | Exercise the actual entry point (route, command, UI, package export) |
   | Time, order, or concurrency | The outcome depends on clocks, randomness, async completion, or interleaving | Control time and randomness; await the observable event with a bound; use real concurrency for race claims |
   | Reported defect | A specific trigger produced a wrong result | Keep the trigger; show the test fails for the intended reason before the fix and passes after, when feasible |

   Substitute only what the claim does not depend on: a mocked database cannot show a
   transaction rolls back, and a mock that supplies the answer tests nothing.

4. **Choose cases and assertions.** Pick cases that a plausible wrong implementation
   would fail, tied to requested behavior or a credible regression. Assert the
   meaningful result, state changes, and effects that must not happen, with
   expectations derived independently of the logic under test. Keep tests readable,
   coupled to the contract rather than incidental implementation, and worth their
   runtime and maintenance cost. Use the project's runner; for general-purpose test
   infrastructure, prefer mainstream libraries and framework facilities over custom
   runners, assertion engines, or schedulers. Add tooling, test categories, or
   coverage targets only when the task needs them.

5. **Run and diagnose.** Run the relevant tests and required project checks in
   permitted environments, and confirm the changed tests were discovered and
   executed. When a test fails, decide whether the product, the test, or the
   environment is wrong before changing anything; correct an expectation only on the
   contract's basis. Preserve reproductions of product defects.

6. **Finish** when the protection is integrated, relevant checks have results or
   explicit blockers, and test defects you introduced are resolved. A test-only task
   can finish with a failing test that demonstrates a product defect; report it as a
   failure, not a pass. Stop adding speculative cases or rerunning unchanged checks
   once the evidence suffices. Report the protected behavior, results, and any
   substituted or unexecuted boundary, distinguishing tests written, tests run, and
   tests shown to catch the original defect.

   When a test can only be written by mocking the subject or exposing internals,
   revisit the boundary choice. When results are inconsistent, investigate test,
   product, and environment causes with controlled reruns; a later pass leaves the
   earlier failure unexplained.

## Examples (illustrative)

**Looks like a unit test, needs the real dependency.** "Add a test that deleting a
project deletes its tasks." Deletion relies on a foreign-key cascade in the schema.
A unit test with a mocked repository asserts that `delete` was called and passes even
when the cascade is missing. Run it against the project's test database and assert
the tasks are gone.

**Looks like it needs heavy infrastructure, is a unit test.** "Add tests for the late
fee shown on the billing page." The fee is a pure function of days late and plan;
the page only displays it. Unit-test the function at the last grace day and the
first charged day, and leave browser tests to claims about the page itself.

## Supporting references

Read a reference only for the decision that is stuck:

- The boundary, execution surface, real dependencies, or doubles (step 3):
  [Boundaries and doubles](references/boundaries-and-doubles.md).
- Case selection, assertions, regression examples, snapshots, or readability
  (step 4): [Cases and assertions](references/cases-and-assertions.md).
- Test tooling choice, async behavior, shared state, instability, test-first
  execution, or suite integration (steps 4–6):
  [Isolation and execution](references/isolation-and-execution.md).

## Boundaries

- Work within the current repository/worktree, project instructions, and existing
  authorization; read-only work stays read-only. Pause only work that depends on
  missing evidence, capabilities, or user intent, and continue the rest.
- Current instructions and repository sources outrank recalled or inferred context,
  which grants no permission. Within higher-priority constraints, explicit user
  instructions override this skill; when one of its rules stops work, quote the rule
  and separate it from your interpretation.
- Keep a failing expectation until the contract shows it is wrong: weakened
  assertions, silently skipped or quarantined cases, blind retries, and snapshots
  updated to pass hide the failure the test exists to report.
- Report only what you observed. Passing tests show the behavior they exercised, not
  that the feature works beyond it.
