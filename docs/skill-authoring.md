# Skill authoring guidance

Reference supplied by the user: “Rethinking skills and prompts for GPT-6 Astra”.
This document records its applicable guidance and the user's engineering foundations
for future K Fleet skill maintenance. The supplied text had no verified publication
URL; model-specific observations are hypotheses to test, not portable guarantees.

## Write instructions that change decisions

Assume the agent can perform ordinary engineering work. Keep project-specific
constraints, non-obvious methods, fragile operational requirements, and clear
completion boundaries. Remove repeated encouragement, generic tutorials, and
ceremonies that do not resolve a demonstrated failure or uncertainty.

Keep descriptions short and discriminating: name the capability and its actual
trigger. Avoid broad keyword matches, exhaustive lists, and competing claims to
handle every task. Additional public skills need distinct selection value; moving
a reference into a skill directory alone does not demonstrate better behavior.

Each skill owns the instructions and references needed to execute its method.
Keep file links inside that skill's directory. The orchestrator may select another
skill by name, but a method must not require reading another skill's internal files
to establish its runtime contract or reasoning procedure. Keep necessary local
constraints concise and check their consistency when the shared policy changes.

For multiple workflows, keep the entry point a small router with essential shared
boundaries. Load details at the relevant decision point. Do not require a full
repository survey, a stack of references, or repeated reads before each edit when
the needed facts and constraints are already available.

Describe outcomes, decision criteria, and applicability for open-ended engineering.
Use fixed sequences only where order protects a concrete invariant. A routine edit
does not need a design report, a fixed number of alternatives, or a new test merely
to demonstrate process compliance. Preserve meaningful regression evidence.

## Preserve authority and completion

Make the authorized outcome include the necessary implementation, relevant checks,
and correction of failures caused by the change. Do not insert an approval stop
after a first implementation or a route transition unless a real authority or
product decision requires it. Permission to finish does not expand task scope.

Keep checks proportional to the changed contract. After relevant checks pass, repeat
or broaden them only for new changes, failures, or unresolved risk. Describe known
safe local workflows accurately; never assume a suite is disposable or isolated
without repository evidence.

Retain actual user constraints, source authority, memory isolation, and evolution
gates. A stronger model is not evidence that these boundaries are obsolete. Treat
skill adherence and repository-policy adherence as separate obligations; apply
known project rules at consequential decisions without ritual rereading.

## Make the engineering foundations operational

- First principles: distinguish goals, facts, constraints, and assumptions before
  treating a requested mechanism as necessary. Use domain evidence to test premises.
- Methodology: choose the method for the problem and produce usable decisions;
  avoid imposing one itinerary on every task.
- Control theory: use evidence that could expose a wrong result, correct deviations,
  and identify a stopping or strategy-change condition.
- Double-loop learning: distinguish an implementation defect from a failure of the
  method or its premises. Propose revisions when evidence warrants them, through
  existing authorized maintenance and evolution boundaries.

These foundations guide work across routes; they do not require four skills or four
agents. Retain the current architecture until an explicit design decision and
the user's chosen capability boundaries support changing it.

## Assess the instruction change

Explain which decisions the change should improve and inspect whether its scope,
triggers, and instructions support that outcome. Use actual task observations when
available and state their limits. Shorter instructions and mechanical checks alone
do not establish better behavior or lower cost. Do not recreate test suites,
evaluation infrastructure, or example projects without an explicit request.

Keep guidance model-neutral where practical. Claims about a particular model's
initiative, testing habits, or instruction needs require observations on that model;
they should not become universal rules for other contributors' agents.
