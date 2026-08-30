---
name: kf-learn-from-evidence
description: Evaluate verified evidence that a workflow, routing rule, method, or repository guidance may need a durable change. Invoke automatically when the user explicitly corrects reusable method, routing, or guidance; the same failure recurs across independent tasks; verified repository facts contradict active guidance; routing mismatches recur; or a method repeatedly cannot produce its intended evidence. Also use when the user explicitly asks the harness to learn. Produce a reviewable persistence contract but do not edit durable artifacts. Do not use for ordinary task failures, current-task corrections, incomplete work, direct already-decided policy placement, or one-off preferences.
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
5. Choose the narrowest destination: project or nested `AGENTS.md`, an existing K
   Fleet skill, canonical project documentation or regression evidence, user-level
   guidance, or nowhere. Check for semantic duplicates and conflicts.
6. Produce a reviewable proposal. Automatic invocation authorizes detection,
   analysis, and proposal only; it does not authorize persistence.
7. If the exact intended behavior, destination, or scope is not authorized, stop
   after the proposal. Prior authorization is valid only when it already names
   those three elements; approval of an unspecified future or "approved" proposal
   is not authority to persist it. Do not edit a durable artifact, invoke a writer,
   or treat proposal approval as implied.
8. When the exact proposal, destination, and scope are authorized, produce a
   persistence contract containing the lesson, evidence, exact intended behavior,
   destination and scope, known conflicts, authority, and verification target.
   Hand Context destinations to `kf-maintain-context`; hand other artifacts to the
   workflow that owns their modification. Confirm that owner is available before
   handoff. If it is unavailable, stop with the contract ready, persistence
   incomplete, and no verification claim. Learning never performs the write or
   substitutes a generic writer.
   For a non-Context destination, name the exact owner before handoff and choose it
   by intended mutation rather than filename: a demonstrated defect routes to
   `kf-fix-bug`; new or changed behavior to `kf-implement-feature`;
   behavior-preserving structure to `kf-refactor-code`; and test-only regression
   evidence to `kf-add-test-coverage`. Classify against the artifact's established
   contract before the durable lesson: behavior that already violates that
   contract remains a bug correction even though fixing it changes output; use
   feature ownership only for an accepted new capability or changed expectation.
   For documentation or another artifact not
   owned by a K Fleet workflow, return the contract to the already-authorized
   parent workflow; if none exists, stop with persistence incomplete. Do not use
   `kf-maintain-context` merely because documentation is involved unless the
   artifact participates in effective Codex context.
9. Re-enter this learning workflow after the owner reports completion. Compare the
   persisted outcome with the contract and record the owner's fresh verification
   result. The owner's verification does not close learning by itself; authorized
   persistence closes as `learning -> artifact owner -> learning`. Reopen the
   proposal decision only when implementation materially changes the lesson, and
   do not duplicate the owner's artifact or effective-context verification.

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
Persistence owner
Verification target
```

## Constraints

- Do not modify repository, global, or K Fleet guidance under this skill, even
  after approval. Authorization enables a handoff to the artifact owner, not a
  hidden change of workflow ownership.
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
confidence, persistence authority, persistence owner, and verification target. If
persistence is authorized, completion also requires the owner handoff, the owner's
reported verification result, and Learning's post-handoff comparison of the
persisted outcome with the contract.
