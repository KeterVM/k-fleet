# Uncertainty and decisions

Use this when an assumption is hard to classify, inputs conflict, or a question
needs shaping.

## Classify with worked cases (illustrative)

| Request | Open point | Kind | Why |
| --- | --- | --- | --- |
| "Change the order status" | Which field, and what the new value means | Product decision | Different answers change data meaning for every consumer |
| "Clean up old records" | Archive or delete | Product decision | Deletion removes data that reports or audits may need |
| "Sync with the billing API" | Whether the API supports partial updates | Technical fact | The API docs or a sandbox call answer it |
| "Sync with the billing API" | Which HTTP client to use | Routine means | Every client delivers the same sync |
| "Rename `userId` to `accountId` in the API" | Whether external clients read the field | Technical fact | Check consumers; if external clients depend on it, keeping an alias or breaking the contract becomes a product decision |
| "Make the export faster" | What counts as fast enough | Product decision when no target exists and the answer changes the design | A 2 s target and a 2 min target lead to different designs |

## Shape the question

Use this structure:

1. The concrete difference: what changes under each reading.
2. The consequence: who or what is affected.
3. Your recommendation and its reason, when evidence supports one.
4. A question the user can answer in one line.

Weak: "Can you give more details about the rename?"

Strong: "The mobile app v3 and two partner integrations read `userId`, so renaming
it breaks them. I recommend returning both fields for one release, with `userId`
marked deprecated. Keep the alias for a release, or break the contract now?"

Ask about the decisions that could change feasibility, acceptance, or the cost of
dependent work, in that order, and combine related decisions into one message.
When the user answers part of the question, keep that answer and ask only about the
remaining difference. A decision already settled in the conversation stays settled.

## Settle technical facts with the cheapest sufficient check

Pick the check that directly answers the question: read the source, run a query on
permitted data, read version-matched docs, or make a sandbox call. Record what is
established and what remains inferred.

An integration that exists may still lack the needed operation, permission, or rate
limit; confirm the specific capability. When a capability is missing, report it as a
feasibility constraint and offer alternatives with their effect on the goal; the user
decides whether to change the outcome.

## Resolve conflicting inputs

Name the specific obligations in conflict and apply the task's source authority:
current user instructions, then project rules, then existing behavior. When equally
authoritative goals still conflict, present the tradeoff with feasible options and
their effect on the outcome; the user picks.

## While a question is pending

Step 3 of SKILL.md sets the rule. Dependent work includes migrations and acceptance
tests, and "provisional" versions
of your preferred answer count as dependent work. If the conversation ends without
an answer, report the exact decision needed and the work waiting on it. When the
answer arrives, resume directly.

## Full walk-through (illustrative)

Request: "Clean up old records in the orders table, the order list is getting slow."

**Separate the request.**

- Goal: the order list loads within a target the user accepts.
- Facts: `orders` holds 40M rows; `reports/annual.sql` reads orders back to 2019;
  `EXPLAIN` on the list query shows a full scan on `status`; the list currently
  takes about 4 s for the largest tenant.
- Constraints: none stated.
- Assumptions: "clean up" means delete; "old" means older than two years; row count
  causes the slowness; there is an agreed speed target.

**Classify.**

- Delete versus archive: product decision, because deletion changes annual report
  totals.
- The two-year cutoff: product decision, because it sets which orders leave the
  live table.
- Speed target: product decision, because none exists and it decides whether an
  index alone is enough.
- Cause of the slowness: technical fact. The full scan on `status` points at a
  missing index; measure it.
- How to move rows in batches: routine, once archive or delete is decided.

**Do the work that holds under every answer.** On a development copy, add the index
and measure the list query. Prepare the migration without running it against
production, since building an index on a 40M-row table may lock it.

**Ask once, with the evidence.**

> On a copy, an index on `status` brings the order list from about 4 s to 0.3 s
> without touching data. Three decisions remain:
> 1. Is under 1 s for the largest tenant the right target? (my proposal)
> 2. You asked for a cleanup. Speed no longer requires it, so should old orders be
>    archived to `orders_archive` (my recommendation, keeps annual reports intact),
>    deleted, or left for later?
> 3. If they move, is two years the right cutoff?
>
> If you choose a target the index cannot meet, the cleanup becomes part of the
> speed fix and I will measure its effect too.

**Acceptance conditions after the answers** (say: target under 1 s, archive now,
two years):

- For the largest tenant at current data volume, the order list loads in under 1 s
  at p95.
- Annual report totals for 2019 onward match their values before the change.
- Orders newer than two years remain in the live order list; archived orders stay
  retrievable for reports.

The conditions describe what users and reports observe. Whether the index alone
meets the target is a design question, settled by measurement.
