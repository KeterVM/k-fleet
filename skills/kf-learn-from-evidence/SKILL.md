---
name: kf-learn-from-evidence
description: Evaluate verified evidence that a workflow, routing rule, method, or repository guidance may need a durable change. Invoke automatically when an explicit lasting correction, repeated independent failure, verified guidance contradiction, or recurring routing mismatch appears, and explicitly when the user asks the harness to learn. Detect, assess, and propose automatically; do not persist changes without authority. Do not use for ordinary task failures, incomplete work, or one-off preferences.
---

# Learn From Evidence

Decide whether observed evidence justifies changing the controller—the reusable
method or guidance—rather than only correcting the current result. Learning must
not delay the in-scope task correction.

## Automatic learning gate

Treat the following as candidate learning signals:

- the user explicitly corrects a reusable method, routing decision, or durable
  repository convention;
- the same class of failure recurs in independent tasks or contexts;
- verified repository facts contradict active guidance or a workflow assumption;
- repeated routing sends materially similar requests to the wrong workflow; or
- a method repeatedly cannot produce its intended evidence or acceptance result.

Do not enter the learning workflow merely because a test failed, an implementation
was incomplete, an environment was broken, a single attempt was wrong, or another
approach might be preferable. Those are normally single-loop corrections owned by
the active task workflow.

## Workflow

1. Correct or route the current task result first. Preserve the raw evidence needed
   for later evaluation without expanding the current task.
2. Identify the candidate signal, affected method or guidance, observed impact,
   and whether the evidence is independent or repeated. Separate facts from
   interpretation and look for counterevidence.
3. Classify the result:
   - **result defect:** correct through the active feature, bug, refactor,
     investigation, design, or verification route; do not persist a lesson;
   - **insufficient evidence:** report the candidate only when useful and gather no
     speculative rule;
   - **durable learning candidate:** continue when evidence indicates the reusable
     method, routing, or guidance itself should change.
4. Derive the narrowest behavioral lesson that would have prevented the repeated
   failure without constraining unrelated work. Prefer the underlying decision
   boundary over the wording of one example.
5. Choose the narrowest owner: project or nested `AGENTS.md`, an existing K Fleet
   skill, canonical project documentation or regression evidence, user-level
   guidance, or nowhere. Check for semantic duplicates and conflicts.
6. Produce a reviewable proposal. Automatic invocation authorizes detection,
   analysis, and proposal only; it does not authorize persistence.
7. Persist only when the user has already authorized that destination and scope or
   explicitly approves the proposal. Preserve managed sections and existing
   authority boundaries. This workflow owns the narrow authorized persistence;
   do not add `kf-maintain-guidance` merely to perform the file edit. Route broad
   cleanup, consolidation, relocation, or rewriting of established guidance to
   `kf-maintain-guidance` as a separate task.
8. Verify an authorized persistence change independently from the evidence that
   motivated it. Confirm that the new rule is discoverable, narrowly scoped,
   non-duplicative, and does not contradict stronger guidance.

## Proposal format

```text
Decision: result defect | insufficient evidence | propose durable change
Signal
Evidence and recurrence
Counterevidence
Lesson
Destination and scope
Suggested change
Confidence
Persistence authority
```

## Constraints

- Do not silently modify repository, global, or K Fleet guidance during automatic
  evaluation.
- Do not infer recurrence by counting several symptoms from the same underlying
  event as independent evidence.
- Do not turn implementation details, formatting, temporary constraints, or
  personal preferences into universal rules.
- Do not automatically delete, weaken, or broaden an existing learned rule.
- Never store secrets, credentials, personal data, raw logs, or large conversation
  excerpts as learning artifacts.
- Keep proposals concise and consolidate related evidence instead of accumulating
  near-duplicate rules.

Learning is complete when the signal has been classified, the current correction
has an owner, and any durable proposal has explicit evidence, scope, destination,
confidence, and persistence authority.
