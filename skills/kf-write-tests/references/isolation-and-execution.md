# Isolation and execution

## Control state and timing without hiding the behavior

Give tests their own data and resources, with cleanup that also runs after failure.
Restore shared configuration and replacements so execution order or parallel workers
do not change outcomes. Use permitted environments; a test runner does not make its
database, filesystem, or external services disposable.

Control time, randomness, identity, and external failures where they affect the
scenario. Preserve seeds or inputs needed to reproduce generated cases. Await the
observable event or state transition with a bounded wait instead of relying on fixed
sleeps, and ensure asynchronous failures reach the test runner.

Exercise actual concurrency when claiming protection against races. Coordinate
relevant interleavings where feasible; serial calls or a mock sequence do not establish
concurrency behavior. A successful stress run alone does not prove all races absent.

## Establish that failures and passes mean what they claim

For regression or test-first work, when feasible demonstrate failure before the fix
and success afterward. Confirm that the failing run exposes the intended missing or
incorrect behavior, rather than a syntax, import, or setup error. Use safe isolation
for comparisons; do not revert shared changes or alter a live environment for a red run.
If the original defect cannot be exercised, state that limit instead of claiming it was.

Investigate inconsistent results as possible test, product, or environment problems.
Capture relevant conditions and use controlled reruns to distinguish causes. A later
pass does not erase an earlier failure. Do not solve instability by removing the
assertion, adding blind retries, or silently quarantining the test.

## Integrate with the existing suite

Place tests where the supported runner discovers them and use the project's normal
execution path. Start with the affected tests, extending execution when shared fixtures,
helpers, configuration, or dependencies can affect other consumers. Required project
checks still apply; a passing isolated test does not establish suite isolation.

When changing existing tests, preserve unrelated protection. Remove or combine cases
only when their behavior is obsolete or adequately retained, rather than because they
fail after a refactor. Distinguish an intended contract change from test coupling that
should be repaired. Reuse results that still apply and stop expanding the suite when
the requested protection and relevant checks have sufficient evidence.
