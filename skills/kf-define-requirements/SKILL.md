---
name: kf-define-requirements
description: Clarify underspecified software features into concrete behavior, scope, and acceptance criteria before consequential design choices.
---

# Define requirements

## Runtime and authority

For substantive work, establish the canonical repository/worktree, applicable
project instructions, user scope, and stopping condition. Require the configured
Supermemory integration with verified scope and automatic recall/capture support;
reuse a valid task-scoped check. Direct integration is sufficient without optional
MCP transport. If unavailable or unscoped, stop and report the missing capability.

Current instructions and scoped sources override memory. Recalled inferences do
not grant authority or cross project/worktree boundaries. Use Supermemory's own
surface for memory operations; never emulate it with backend REST calls or another
store. Preserve read-only requests and existing authorization across methods.
Normal task execution does not rewrite live skills or policy. Instruction changes
require authorized, versioned, reversible source maintenance. Report actual
evidence without claiming unobserved capture or execution.

Within higher-priority constraints, explicit user instructions override skill
guidance. Preserve actual scope and authorization limits. If a skill rule causes
you to pause or leave work unfinished, link to its file, quote the rule, and
distinguish its requirement from your interpretation. Continue independent
authorized work only where its prerequisites are met.

## Method

Turn an incomplete feature request into enough shared understanding to make the
next engineering decision well. Reuse an adequate brief; a clear, bounded change
does not need another requirements exercise or a formal document. Prioritize
unknowns that could change feasibility, scope, or the choice of approach; resolve
them before they become premises for dependent work. Infer routine details from
available evidence instead of returning every engineering choice to the user.

## Establish the intended behavior

Distinguish the user's desired outcome from a suggested mechanism. Find who needs
the feature, in what situation, and what successful use enables them to do.
Use a representative scenario to make ambiguous terms concrete: what triggers it,
who acts, what changes, who can observe or act on the result, and what happens next.
Label illustrative scenarios as proposals until they are supported by the request
or project evidence; an example does not silently become committed scope.

Inspect relevant existing behavior, domain contracts, permissions, and entry points
when project sources are available. Include alternate entry points such as batch
operations or background work when they affect the same behavior. Do not ask the
user to supply technical facts that can be established from accessible sources.
When no project evidence is available, keep those facts explicitly unknown.

## Separate decisions from assumptions

- Product decisions determine intended value or obligations: initial feature scope,
  recipients, visibility, communication channels, audit purpose, retention, or
  required timeliness. Present a concrete proposal and ask focused questions where
  the answer materially changes the outcome.
- Technical facts require evidence: current data ownership, authorization behavior,
  integration capabilities, transaction boundaries, and runtime constraints. Check
  sources or identify the observation needed to settle them.
- Low-impact details can be provisionally chosen when they preserve the requested
  outcome and are easy to revise. State consequential assumptions without turning
  every routine choice into a question.

Technical reversibility does not make a choice product-neutral. For example,
starting with in-app notifications may fail a requirement to reach people while
they are away from the application. Propose that scope rather than silently
substituting it for an unspecified notification requirement.

## Check completeness through counterexamples

Use a few relevant failure or change scenarios to expose missing requirements.
Depending on the feature, examine failed operations, retries, changed permissions,
deleted objects, or temporarily unavailable dependencies. Ask what must remain true
and what failure behavior the user can accept. Do not turn every possible failure
into a new feature, infrastructure requirement, or universal checklist.

Translate the agreed scenarios into observable acceptance criteria. Separate
confirmed obligations from open questions, and avoid choosing storage schemas,
queues, frameworks, or deployment topology before those choices are justified.

## Carry understanding forward

Keep a concise account of the intended outcome, included behavior, material scope
boundaries, acceptance criteria, and unresolved assumptions. Use the conversation
or an existing brief unless a durable artifact is requested or needed for delivery.
No fixed template or number of questions, scenarios, or alternatives is required.

Proceed with independently authorized work while resolving material questions.
When understanding is sufficient, continue the authorized design or implementation;
do not add an approval checkpoint merely because requirements work has ended.
Respect requests for analysis-only work or step-by-step discussion. Revisit an
assumption if later evidence invalidates it rather than narrowing the goal silently.
