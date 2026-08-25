# K Fleet Closure Eval Report

Date: 2026-08-25

## Scope

Three independent evaluators received only the current source Skill instructions
and raw prompts. They could not read harness expectations, repository guidance,
earlier reports, changelog, or Git history. They made no K Fleet changes; isolated
temporary fixtures were removed after use.

The run targeted the ownership boundaries changed by the current redesign:

- direct exact policy followed by feature work;
- repeated evidence with proposal-only authority;
- evidence evaluation with an exact pre-authorized Context rule, destination, and
  scope;
- the complete design, implementation, verification, correction,
  re-verification, learning, Context persistence, and learning-closeout sequence;
- standalone Learning when its required Context persistence owner is unavailable;
  and standalone Context placement of a direct authorized policy.

## Initial findings

The first blind pass found three ambiguities:

1. generic authorization of a future "approved proposal" did not identify the
   exact behavior, destination, and scope needed for safe persistence;
2. Learning's response to an unavailable persistence owner was implied rather than
   explicit; and
3. independent verification did not state whether independence meant a fresh
   workflow assessment or a different actor.

The contracts and prompts were narrowed. Prior authorization now requires exact
behavior, destination, and scope; unavailable owners cause an explicit
contract-ready but persistence-incomplete stop; and verification defines its
default as fresh non-mutating workflow independence while reporting unmet
actor-level requirements.

## Fresh rerun result

All affected decisions passed on fresh reads of the corrected source:

| Boundary | Result |
| --- | --- |
| Direct exact policy | `kf-maintain-context` owns Context placement and verification; Learning is not invoked. |
| Proposal only | `kf-learn-from-evidence` evaluates and proposes, then stops without invoking a writer. |
| Exact authorized learning contract | Learning decides without writing, then hands Context persistence to `kf-maintain-context`. |
| Missing Context owner | Learning stops with the contract ready, persistence incomplete, and no verification claim. |
| Full closure | `design → implement → verify → fix → verify → learn → maintain context`, followed by Learning contract closeout. |
| Verification independence | A fresh non-mutating workflow verdict is sufficient by default; explicit actor-level requirements are fulfilled or reported unavailable. |

The evaluators retained evidence gates: summarized recurrence does not substitute
for accessible independent evidence, an exact pre-authorized rule is persisted only
when that full rule is supported, semantic conflicts stop rather than rewrite the
lesson, and unavailable runtime loading is reported rather than claimed.

## Verdict

The redesigned Learning-decision and Context-persistence boundary is behaviorally
closed for the evaluated success, refusal, authorization, unavailable-peer, and
full-sequence paths. Product artifacts and historical task evidence were not
fabricated; those remain required inputs when executing a real request.
