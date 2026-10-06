# Acceptance and consistency

Use this when acceptance conditions are vague or the set may be incomplete.

## Write checkable conditions

Template: **actor + situation + observable result**, plus **effects that must stay
absent** when they matter.

Illustrative pairs:

| Weak | Checkable |
| --- | --- |
| "Export works" | "A manager exporting a filtered list of 10k rows receives a CSV with exactly the filtered rows and the visible columns, and it opens correctly in Excel" |
| "Invoices are protected" | "A user without the `billing:write` role who edits an invoice receives 403, and the invoice stays unchanged" |
| "The page is fast" | "The order list loads within the agreed target for the largest tenant" (use an established target; otherwise ask, and label any number you propose) |
| "Use a queue for emails" | "A user who signs up receives the welcome email even when the mail provider is down for up to an hour" (behavior; the queue is a design choice) |
| "Tests pass" | Name the behavior the tests must demonstrate |

Pick the observation that fits the deliverable: a visible UI result, a caller-visible
response, persisted state, an output file, or behavior under a stated load or
failure. A condition does not need to name the test framework; it needs a credible
way to tell success from failure.

Use established targets, workloads, and tolerances. When a quality goal such as
speed or availability has no target and the answer would change the design, ask
for it; label any number you propose as a proposal.

## Probe with counter-examples

Run through the cases that could change the requirements:

- Invalid or missing input
- The operation fails halfway, or is retried
- Permissions change between steps
- The target object is deleted or modified concurrently
- A dependency is unavailable or slow

For each relevant case, state what must remain true and what the actor observes.
Take acceptable failure behavior from the existing contract or the user. Keep
confirmed obligations, open questions, and candidate improvements in separate lists;
a possible failure alone does not justify new infrastructure.

## Check the set in both directions

- **Downward:** each condition traces to the goal or an established constraint.
  Remove or question conditions that trace to nothing.
- **Upward:** imagine every condition passing. Can the actor complete the scenario?
  Look for missing handoffs, manual steps, unaddressed actors, and alternate paths.

Example: the conditions for a CSV customer import all pass, yet the nightly CRM sync
overwrites the imported rows with stale data. Add a condition for the sync.

Then check that scope, permissions, timing, lifecycle, and failure expectations agree
where they meet, and that each domain term means one thing across conditions.

## Change conditions deliberately

Keep adequate existing conditions. When a requirement changes, update the affected
scenarios and conditions and record the reason. The current implementation or test
suite failing a condition is a finding to report; the condition stays as agreed.
