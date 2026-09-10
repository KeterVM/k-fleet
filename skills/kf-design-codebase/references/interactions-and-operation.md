# Interactions and operation

## Coordinate state and effects

For operations spanning modules, identify the coordinator and transaction owner.
Distinguish effects that must commit or roll back together from effects allowed
to complete later. Where partial completion or retries are possible, define who
detects them and what recovery or repeat behavior the contract permits. Splitting
modules must preserve these guarantees, not give each fragment an independent commit.

## Check that the parts work together

For consequential interactions, trace an important scenario from its entry point
to the observable result, including relevant state changes and external effects.
At each handoff, check that the producer's guarantees satisfy the consumer's needs
and that someone owns the next action. Look for missing work, duplicate decisions,
and incompatible assumptions about timing or state.

Follow a relevant failure through the same interaction: what has already happened,
who observes the failure, and who completes, reverses, or reports the remaining work?
Resolve gaps that individual interface descriptions hide. Use a short trace or
diagram only when it clarifies the decision; do not enumerate every path or mistake
a walkthrough for runtime verification.

## Make consequential failures diagnosable

When operation affects the design, identify how success, failure, and incomplete
work can be distinguished and which owner can act on that evidence. Carry necessary
failure context across boundaries without exposing sensitive internals. Use existing
observability conventions rather than designing a new monitoring platform.

Where a slow or failed dependency could exhaust shared resources or spread failure,
clarify the responsible boundary and the required limits or isolation. Derive these
from the actual workload and service obligations; do not add queues, retries, or
instrumentation to every design by default.
