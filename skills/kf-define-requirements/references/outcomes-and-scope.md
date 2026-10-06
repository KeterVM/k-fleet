# Outcomes and scope

Use this when step 1 stalls because the actor, the scenario, or the scope boundary
is unclear.

## Trace one representative scenario

Fill in each slot from the request and repository evidence:

| Slot | Question |
| --- | --- |
| Actor | Who performs or receives the outcome? Separate requester, actor, and other affected people or systems when their needs or permissions differ. |
| Trigger | What starts the scenario: a user action, a schedule, an event, an API call? |
| Starting state | What data, permissions, and setup exist beforehand? |
| Action | What does the actor or system do? |
| Observable result | What can the actor see, receive, or rely on afterwards? |
| Next step | What does the actor do with the result? |

Then look for alternate entry points that reach the same obligation, such as batch
jobs, background workers, imports, or admin tools. Mark any example you invent as a
proposal until the user or project evidence supports it.

Example (illustrative): "Let managers approve expense reports."

- Actor: a manager; the employee who submitted the report is also affected.
- Trigger: a submitted report appears in the manager's queue.
- Starting state: the manager has approval rights for that employee's team.
- Observable result: the report shows as approved and finance can pay it.
- Next step: finance export picks it up.
- Alternate path: the nightly finance export must treat the new state as payable.
  Without that, the feature "works" on screen and fails the actual goal.

## Separate scope into four groups

- **Essential:** the scenario fails without it.
- **Optional:** improves the experience without blocking the goal.
- **Excluded:** explicitly out of scope, with the reason.
- **Deferred:** needed later; record what would trigger it.

Place an item by its effect on the scenario. Cost and inconvenience belong in the
tradeoff discussion; keep the item's group unchanged.

When proposing a smaller first delivery, rerun the scenario against it. If the
smaller version changes who is reached, how quickly, or how much manual work
remains, present that as a product choice for the user. Ordering the work in
phases while keeping the full scope is a sequencing decision you can make.

## Keep requirements at the level of behavior

Describe required behavior before choosing schemas, queues, frameworks, or topology,
unless the user fixed the mechanism. When a requirement does constrain the
implementation, write down the reason so design can respect it.

Record where each consequential requirement comes from (user statement, existing
contract, regulation, project rule) in the task or an existing brief. A formal
traceability matrix is needed only when the project asks for one.
