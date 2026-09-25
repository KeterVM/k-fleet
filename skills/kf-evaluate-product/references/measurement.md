# Measurement

## Define the outcome before counting

Connect a measure to the user's goal. For a task-oriented product, completion,
time, errors, or required assistance may matter; recurring products may need
activation and retention; commercial products may also need revenue and cost.
Choose what applies rather than imposing one metric framework on every product.

Define the event or observation, unit of analysis, eligible population, denominator,
time window, and exclusions. Clarify what counts as completion and whether the
outcome occurs after a delay. A download, registration, or accepted request is not
automatically successful use. For retention, compare cohorts with equivalent time
to return rather than treating newly acquired users as already lost.

Identify relevant adverse effects or tradeoffs, such as more support work, degraded
accessibility, errors, or increased operating cost. Do not optimize a proxy while
hiding a worse user outcome. Resolve targets from established commitments or a
supported decision, not an arbitrary percentage.

## Check the measurement path

Inspect whether collection represents actual behavior: missing events, retries,
duplicate identities, bots or internal traffic, time zones, consent-related gaps,
and client/server disagreement where relevant. Trace a sample through the existing
instrumentation when authorized. Report data quality problems separately from
product problems.

Check whether definitions, collection, acquisition channels, or eligible populations
changed across periods. An apparent improvement can be a measurement change. Preserve
raw provenance and reproducible aggregate definitions without copying unnecessary
personal records into reports.

If instrumentation must change, define the minimal events or observations needed
for the decision and use existing project practices. Implementation and collection
remain subject to the task's authorization and data requirements. Verify the new
signal before using it to judge product performance; a deployed event name alone
does not establish trustworthy measurement.
