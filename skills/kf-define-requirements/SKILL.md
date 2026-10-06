---
name: kf-define-requirements
description: Clarify a software request, including a fix or refactor, into agreed behavior, scope, and acceptance criteria. Use when the request leaves what should change or how success is recognized open before code or tests depend on it.
---

# Define requirements

Turn a request into behavior, scope, and acceptance conditions that the next
engineering decision can rely on. A clear, bounded change goes straight to design
or implementation; reuse an existing brief or spec when it already answers these
questions, and when given a spec path, read that spec first.

## Method

These are the decisions to settle, in their usual order; skip any the request
already answers. Apply them again to each new task or milestone in a session,
including after the context is compacted. One ordering is fixed: ask about a live
product decision before making edits that depend on it.

1. **Separate the request** into its goal (what the actor can do, or what is true,
   once the change works), facts (what code, data, docs, or the user establish),
   constraints (explicit user or project choices), and assumptions (everything
   else you rely on). For a tangled request, write these out as four short lists;
   otherwise one sentence naming the goal and the open points is enough.
   A requested mechanism ("add a cron job") is a constraint only when the user
   chose it deliberately; otherwise trace it to the goal it serves. Existing code
   is a fact about current behavior, and the user may want something different.

2. **Classify each assumption.**

   | Kind | Test | Action |
   | --- | --- | --- |
   | Product decision | Different answers change the target, scope, observable behavior, data meaning, or a compatibility obligation | Ask the user |
   | Technical fact | Code, docs, data, or a permitted probe can answer it | Investigate it yourself |
   | Routine means | Every option delivers the same outcome within the same contracts | Choose and state the choice |

   Judge by consequence: a one-line change that deletes data is a product decision,
   and a large refactor with one obvious outcome is routine. Ease of reversal leaves
   the kind unchanged. When the user explicitly delegates a choice ("pick whatever
   works"), it becomes yours within that delegation; a short instruction to
   continue is not delegation.

3. **Ask open product decisions in rounds.** What the request states is settled;
   ask only where plausible readings still differ. Number each open decision whose
   prerequisites are settled and send them in one message as soon as you can name
   them, because more code reading will not reveal a preference. For each, name the
   concrete difference, its consequence, and your recommendation with its reason.
   After the answers, ask only the next round they unblock. Keep working on
   everything that holds under every answer and stays within current authority;
   leave dependent code and tests untouched until the user answers.

4. **Write acceptance conditions** as *actor + situation + observable result*, plus
   effects that must stay absent. State behavior, leaving the mechanism to design
   unless the user fixed it. Then check both directions: every condition traces to
   the goal or a constraint, and passing every condition lets the actor complete the
   scenario, including through alternate paths such as background jobs, imports,
   and exports.

5. **Stop and hand off** when no open question could invalidate the next action.
   Carry the goal, sourced decisions, acceptance conditions, and non-blocking
   questions forward. A bounded change, such as a fix or one behavior adjustment,
   keeps them in the conversation with no file. Write a spec file and report its
   path only for a new project or feature, work likely to span sessions or more than
   one method, or on request. Then continue the authorized work.

   When an answer surprises you, or the user overrides any choice or
   recommendation of yours, treat the answer as settled and your classification as
   having missed something: list the assumptions and conditions that relied on the
   old choice, then revise or drop each one now and re-run step 2 only on what the
   new choice opens. When the goal itself changes, revise the affected conditions
   and name the downstream work they invalidate. Update the spec, when there is one,
   in the same turn.

## Examples (illustrative)

**Looks routine, is a product decision.** "Notify the approver when an expense report
is submitted." In-app notifications are quick to build and easy to swap later, but
an approver who is away from the app never sees them, and reach is part of the goal.

> In-app notifications only reach approvers while they are in the app. Reports
> could wait days for travelling managers. I recommend email plus an in-app badge.
> Email, in-app, or both?

**Looks open, is routine.** "Split the 900-line `billing.ts` into modules." How to
split looks like a choice to ask about. Check first: if the public exports and
behavior stay the same, the file layout changes nothing a caller can observe, so
choose a split by responsibility and state it in the summary.

## Supporting references

Read a reference when its event occurs, as well as when a decision is stuck:

- A new product or first requirements pass; actors, scenarios, or scope boundaries
  are unclear (step 1): [Outcomes and scope](references/outcomes-and-scope.md).
- The user overrides a choice or recommendation; an assumption is hard to
  classify, inputs conflict, a question needs shaping (steps 2–3), or you want a
  full worked walk-through:
  [Uncertainty and decisions](references/uncertainty-and-decisions.md).
- Acceptance conditions are vague or the set looks incomplete (step 4):
  [Acceptance and consistency](references/acceptance-and-consistency.md).
- The work needs a spec, or a decision recorded in one changes (step 5):
  [Writing the spec](references/writing-the-spec.md).

## Boundaries

- Work within the current repository/worktree, project instructions, and existing
  authorization; analysis-only requests and step-by-step discussions keep that form.
- Current instructions and repository sources outrank recalled or inferred context,
  which grants no permission. Within higher-priority constraints, explicit user
  instructions override this skill; when one of its rules stops work, quote the
  rule and separate it from your interpretation.
- An unanswered question, a default option, or a stated assumption leaves the
  decision open.
- Clarifying intent is a request for information, not a new approval gate: once
  answered, continue the authorized work.
- Report only what you observed and what the user decided.
