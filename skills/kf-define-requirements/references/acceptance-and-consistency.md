# Acceptance and consistency

## State outcomes that can be checked

Express acceptance in terms of the relevant actor or caller, conditions, observable
result, and constraints. Include required state changes and effects that must not
occur where these matter. Avoid criteria that merely say a component exists, code
was written, or tests pass without stating the behavior those artifacts must deliver.

Replace consequential vague terms such as fast, available, or easy to use with the
relevant scenario and an assessable outcome. Use established targets, workloads,
platforms, and tolerances when available; do not invent numerical precision or turn
an illustrative target into an agreed commitment. Clarify unresolved quality goals
when they could change the design or acceptance decision.

Choose observations suited to the deliverable: a visible interaction outcome, a
caller-visible response, persisted state, an output artifact, or behavior under a
stated load or failure. A criterion need not dictate the test framework or require
automation, but it must leave a credible way to distinguish satisfaction from failure.

## Challenge the scenarios proportionately

Use relevant counterexamples to expose missing obligations: invalid input, failed
operations, retries, changed permissions, deleted objects, or unavailable dependencies.
Identify what must remain true and what result the affected actor should observe.
Resolve acceptable failure behavior from the existing contract or user intent.

Examine only cases capable of changing the requirements or approach. A possible
failure does not automatically justify a new feature or infrastructure component.
Keep confirmed obligations separate from questions and candidate improvements.

## Check the requirements as a set

Trace material acceptance conditions back to the intended outcome or an established
constraint. Check the reverse direction too: could every listed criterion pass while
the user still cannot complete the important scenario? Look for missing handoffs,
implicit manual steps, unaddressed actors, and necessary behavior on alternate paths.

Check that scope, permissions, timing, lifecycle, and failure expectations do not
contradict one another where they interact. Resolve incompatible uses of a domain term
or conflicting obligations before they become separate implementation assumptions.
Check feasibility against known dependencies and constraints, keeping remaining
uncertainty explicit rather than claiming implementation or validation has occurred.

Preserve adequate existing criteria. When a requirement changes, update affected
scenarios and acceptance conditions with the reason for the change; do not weaken
them solely because the current implementation or tests cannot satisfy them.
