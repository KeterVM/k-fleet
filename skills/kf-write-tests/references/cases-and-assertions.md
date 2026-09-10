# Cases and assertions

## Choose cases that distinguish behavior

Select relevant normal, boundary, and failure cases from the contract. Include
authorization, retries, transitions, concurrency, or rollback only when the behavior
depends on them. Ask which plausible incorrect implementation each case would expose;
several examples of the same rule may add less protection than a missing boundary.
Do not turn every method or implementation branch into a separate test by default.

Choose representative inputs on each side of a meaningful decision and at its edge
where errors are plausible. For stateful behavior, establish the starting state and
the transition being exercised. Use parameterized cases when they share a rule and
remain easy to diagnose; separate cases whose setup or meaning would become hidden.

For a reported defect, preserve its triggering conditions and intended outcome.
Simplify a reproduction only while retaining the cause of failure. A nearby example
that passes without exercising the defect is not regression protection.

## Make the expected result independent and specific

Assert the meaningful result, relevant state changes, and required absence of effects
on failure. A non-null response, successful status, or mock invocation can be necessary
without being sufficient. Assert enough to reject the wrong outcome at issue.

Derive expectations independently of the logic under test. Avoid reproducing its
algorithm in the test or calling it to calculate the expected value. Use explicit
examples or contract properties whose validity can be explained. Keep tolerances,
ordering assumptions, and ignored fields tied to the contract rather than adjusted
until the current output passes.

Use snapshots or golden files when their content is a meaningful, reviewable contract.
Keep unrelated volatile details out where permitted, and inspect changed expectations
against the requested behavior before accepting updates. An opaque output dump can
conceal incorrect changes even when the snapshot matches.

## Keep intent and failures readable

Name tests for the scenario and outcome. Keep the inputs that explain an expectation
visible near the assertion; shared setup may hide irrelevant mechanics but should not
hide why the test passes. Use helpers that express a coherent operation or assertion,
not a generic validator that obscures which behavior each test protects.

Prefer some clear repetition over a test abstraction with many switches or hidden
state. Failure output should identify the case and relevant expected versus actual
result. Avoid test logic complex enough to need the same reasoning as the feature.
