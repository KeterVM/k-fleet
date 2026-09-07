---
name: kf-orchestrate-work
description: Coordinate repository work across focused engineering methods and capability improvements as needed; also handles K Fleet setup.
---

# Orchestrate work

Own the requested outcome, authority, integration, and final task state. K Fleet
installs this orchestrator and six self-contained methods the same agent can use,
not a requirement to spawn agents or run every phase.

For explicit `/kf-orchestrate-work setup`, use [setup](references/setup.md) and
stop. For substantive work, establish the [runtime contract](references/runtime.md)
once for the active task and scope. Reuse it across methods unless scope or facts change.

## Select the method

| Need | Method |
| --- | --- |
| Clarify intended behavior, scope, or acceptance criteria | `kf-define-requirements` |
| Resolve internal module contracts, dependencies, consistency, or directory organization | `kf-design-codebase` |
| Implement an understood change, fix a known defect, or refactor | `kf-implement` |
| Write meaningful automated checks or regression protection, including test-first work | `kf-write-tests` |
| Verify delivered functionality and identify related defects or regressions | `kf-verify` |
| Resolve a demonstrated reusable capability gap by finding or creating a skill | `kf-evolve-skills` |

Select only the methods the task needs. A small understood change can go directly
to implementation and its checks. An accepted design can satisfy design work;
unresolved technical facts call for focused source inspection or a discriminating
reproduction before mutation. Investigation-only requests remain read-only and
end with supported findings. System architecture decisions remain explicit inputs;
do not force service topology or technology selection into codebase organization.
Test writing can precede implementation. Verification can return to any affected
decision, and applicable evidence can be shared without rerunning every method.
Revisit a decision when new evidence
invalidates its premises. Route changes do not renew approval or reset context.
Use the selected skill through normal skill discovery. If it is unavailable,
report the missing method and repair the installation through authorized setup;
do not reconstruct its instructions from another skill's internal files.

For conditional work, read only its reference:

- Repository guidance maintenance: [context](references/context.md).
- Bounded agent work: [delegation](references/delegation.md). Keep tightly coupled
  design and implementation together; use an independent reviewer when requested
  or justified by risk, not one agent per skill.
- Explicit post-work usage report: [feedback](references/feedback.md).
- Interpret task feedback before changing reusable guidance: [learning](references/learning.md).

## Integrate and close

Keep the user goal, applicable repository constraints, decisive assumptions, and
acceptance evidence intact across methods and handoffs. Apply those constraints
when selecting the execution path, before the first write, and before completion;
reuse known guidance rather than rereading it ceremonially. Method adherence does
not establish repository-policy adherence.

Check the integrated artifact and resolve findings within existing authorization.
A first implementation or a subagent's success is not completion. Finish when the
requested outcome and applicable evidence are satisfied, or report a concrete
blocker or authority boundary. Report decisive checks and material uncertainty for
Supermemory's automatic capture; never claim unavailable execution or evidence.

When feedback exposes a reusable capability gap, select kf-evolve-skills within
the task's authorization; do not trigger it after every failure or completion.
Carry the observed gap into selection and bring actual use results back into the
task. Do not install guidance merely to produce a learning outcome.
