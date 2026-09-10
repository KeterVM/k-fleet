# Corrections and rechecks

## Close meaningful gaps within scope

When durable regression protection or a missing behavior check warrants new tests,
use project conventions and kf-write-tests when available. This method remains
usable alone: derive expectations from the contract, keep the relevant boundary
real, assert meaningful outcomes, and run the resulting tests. Do not create tests
or tooling solely to increase activity or coverage counts.

Respect the task's mutation limits. In verification-only work, report product
findings; when correction is authorized, continue through the fix. Preserve the
failing scenario and expected contract. Do not weaken assertions, skip failures,
or change expectations solely to obtain a passing result. If the expectation itself
is wrong, explain the authoritative basis for correcting it.

## Recheck what the correction can affect

Recheck the original failing scenario and related behavior affected by the fix.
When feasible, show that a regression test detects the original defect and passes
with the correction, using safe isolation rather than reverting shared work.
Distinguish a test written, a test executed, and a test demonstrated to catch the
original defect.

Revisit earlier results whose premises the correction changed. Broaden checks when
shared interfaces, state, configuration, fixtures, or dependencies affect additional
consumers; preserve results that remain applicable. Required project checks still
apply. A passing targeted check does not automatically cover a broader correction.

If the same failure recurs, revisit the diagnosis or affected design assumption
instead of layering another patch over an unexplained symptom. When evidence is
sufficient and required checks pass, stop repeating unchanged work. Report the
correction, rechecked scope, actual results, and remaining failures or unverified
obligations without turning speculative polish into a completion requirement.
