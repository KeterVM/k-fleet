---
name: kf-design-codebase
description: Decide ownership, contracts, placement, and library-versus-custom choices for an understood change, or assess existing design on request. Use when those choices are still open for a change or are the subject of the request.
---

# Design codebase

Settle who owns each affected rule and state, what contracts promise, where code
lives, and whether a maintained library already provides the mechanism; also assess
existing design on request. A bounded edit inside sound boundaries goes straight to
implementation; reuse an existing design when it already answers these questions.

## Method

These are the decisions to settle, in their usual order; skip any the request
already answers. One ordering is fixed: establish which designs meet the required
behavior, constraints, and ownership boundaries before comparing change cost,
because a smaller diff cannot buy back an unmet obligation or a misplaced owner.

1. **Ground the change.** Separate the requested behavior and constraints from
   accepted choices and assumptions. Trace the affected entry points, rules, state,
   and dependencies far enough to see what exists and what must change; reuse
   evidence already in hand rather than surveying the repository. A requested
   mechanism ("add a queue") serves a goal unless the user fixed it deliberately;
   when evidence points to a different cause, address that cause and say why.

2. **Classify each open design point.**

   | Kind | Test | Action |
   | --- | --- | --- |
   | Settled or local | An accepted choice or adequate existing design covers it, and the request is not about that structure | Build on it; revisit only on evidence that it fails a current obligation |
   | Ownership or contract | The answer decides who owns a rule or state, what callers must know or coordinate, or who handles a failure | Decide it here from a concrete change or failure trace |
   | General-purpose mechanism | The design adds or reworks something the ecosystem commonly provides (retries, caching, parsing, scheduling) | Check the standard library, framework, installed dependencies, then mainstream libraries; keep custom code for a concrete unmet requirement |
   | Product intent | Plausible readings change the target, scope, behavior, data meaning, or a compatibility obligation, and established decisions do not settle it | Ask, then continue work that holds under every answer |
   | Routine technical choice | Every option meets the same contracts at comparable cost | Choose, state the choice, and leave line-level form to implementation |

   Judge by consequence, not size: one new field every service must check is an
   ownership decision; a large split with stable exports is routine. When structure
   is the subject of the request, existing boundaries are candidates, not settled
   inputs. Investigate technical facts that code, docs, or a probe can answer.

3. **Choose a sufficient design.** Among the designs that meet the obligations,
   prefer the one where:

   - the parts jointly deliver the important success and failure scenarios;
   - each rule and piece of state has one clear owner, and interfaces spare callers
     hidden coordination;
   - domain terms, component roles, paths, and dependency directions express the
     same ownership model, so implementation need not invent another;
   - each added structure or dependency serves a current need (readability from a
     suitable library counts);
   - decisions can guide implementation and be challenged by observable evidence,
     which a directory tree or architecture label alone cannot.

   State consequential quality goals as load, failure, access, or maintenance
   conditions from established requirements, and keep the design local to the change.

4. **Test the premises that could invalidate dependent work** before committing to
   it, with the smallest inquiry that discriminates between options: a caller trace,
   a contract example, a targeted experiment, or a measurement.

5. **Stop and hand off** when ownership, contracts, placement, and critical failure
   behavior are clear enough to implement and deferred choices cannot threaten the
   approach. Carry forward decisive reasons, affected paths, material assumptions,
   checks for important contracts, and migration compatibility where needed, in the
   conversation or an existing artifact.

   When friction, review, or new evidence challenges a decision, tell apart a
   misunderstood handoff (clarify it), an infeasible design (revise that decision
   and explain the consequences), and a local defect (fix the code). When the user
   overrides a choice you classified as routine or settled, re-run step 2 for
   related points before continuing.

## Examples (illustrative)

**Looks local, is an ownership decision.** "Add a 'pause subscription' button."
It looks like a button and a status value, but three services each check
`status == "active"` to grant access, so a new status scatters the entitlement rule.
Decide one owner for "is this customer entitled now" and have the others call it.
Whether a paused customer keeps access until the period ends is product intent: ask,
and keep building the owner, which every answer needs.

**Looks like a new mechanism, is reuse.** "Add retries with backoff to outbound
webhook calls." A retry loop looks quick to write, but the installed job framework
already retries with backoff and dead-lettering: enqueue each delivery as a job and
configure it. Add custom code only for a requirement it cannot meet, such as
per-partner rate windows, and state that reason.

## Supporting references

Read a reference only for the decision that is stuck:

- Domain meaning, what belongs together, contract shape, or placement is unclear
  (steps 2–3):
  [Boundaries and contracts](references/boundaries-and-contracts.md).
- A flow spans modules, partial failure or consistency is in question, or failures
  must stay diagnosable (steps 3–4):
  [Interactions and operation](references/interactions-and-operation.md).
- Designs or libraries compete, a premise is uncertain or challenged, a change is
  costly to undo or needs migration, or the handoff needs shaping (steps 2–5):
  [Tradeoffs and evidence](references/tradeoffs-and-evidence.md).

## Boundaries

- Work within the current repository/worktree, project instructions, and existing
  authorization; design-only and read-only requests keep that form.
- Current instructions and repository sources outrank recalled or inferred context,
  which grants no permission. Within higher-priority constraints, explicit user
  instructions override this skill; when one of its rules stops work, quote the
  rule and separate it from your interpretation.
- Existing code, a default option, or a declared assumption leaves product intent
  open; leave design and code that depend on it until the user answers.
- A design is not an approval gate: once dependent questions are answered, continue
  the authorized implementation, keeping library comparison within that change.
- Report only what you observed; an approved design or a successful prototype does
  not establish completed integration.
