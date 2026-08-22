---
name: kf-delegate-specialist
description: Delegate a bounded, read-only question to a specialist sub-agent when the user requests expert assistance or domain-specific evidence would materially improve the owning workflow. Select the narrowest suitable specialist, define an evidence contract, and return its findings to the parent for integration. Do not delegate routine work, transfer task ownership, authorize edits, or treat specialist output as verified fact.
---

# Delegate Specialist

Obtain focused expert evidence without transferring the current task's outcome,
authority, or integration responsibility. The primary workflow remains the owner;
this skill owns only the delegation decision, bounded contract, and evidence
handoff.

## Entry gate

Delegate when sub-agents are available and either:

- the user explicitly requests a specialist or sub-agent; or
- the owning workflow identifies a concrete domain, tool, framework, security,
  data, or operational question where specialist evidence would materially reduce
  uncertainty or risk.

Do not delegate merely because a task is large, unfamiliar, slow, or difficult.
Keep the work in the parent when it depends on one ordered reasoning chain, the
parent can resolve it safely from direct evidence, or coordination would cost more
than the bounded question warrants. Avoid delegation for write-heavy work over
shared mutable state.

If no suitable specialist or sub-agent mechanism is available, report that limit
to the owning workflow and continue only when the remaining uncertainty is safe.
Do not invent a specialist result or imply that expert review occurred.

## Select the specialist

Prefer the narrowest available specialist whose description and tools match the
question. A purpose-built skill, configured custom agent, or domain-capable
read-only sub-agent is stronger evidence than a generic role label. Do not claim
expertise that the selected agent's instructions, tools, or accessible sources do
not support.

Use the minimum number of specialists needed. Parallelize only independent,
non-overlapping questions whose answers can be reconciled by the parent. Leave
model and reasoning choices inherited unless the user, repository guidance, or a
verified custom-agent configuration requires an override.

## Delegation contract

Give each specialist a compact contract containing:

- the exact question and why it matters to the owning workflow;
- the allowed repository, artifact, or source scope;
- relevant verified facts and the minimum raw context needed to work;
- explicit exclusions and unresolved assumptions;
- read-only authority and any unavailable tools or environments;
- required evidence, such as file references, commands, primary documentation,
  reproduction details, or confidence;
- the expected concise return shape: conclusion, evidence, risks, unknowns, and
  recommended next action;
- a stopping condition.

Do not ask the specialist to decide product scope, expand authorization, perform
the parent's final verification, or edit source, tests, documentation,
configuration, generated artifacts, or external systems.

## Supervise and collect

Spawn the specialist with a bounded task name and wait for its result before the
owning workflow relies on it. Ask a focused follow-up only when required evidence
is missing or an ambiguity can realistically be resolved. Stop rather than
repeatedly respawning agents that return the same uncertainty.

Treat the result as advisory evidence, not authority. Check that it answers the
delegated question, stays within scope, distinguishes facts from inference, and
surfaces material uncertainty. Reject unsupported conclusions and record tool,
environment, or access failures.

## Return to the owner

Return a compact handoff to the primary workflow:

- specialist selected and question delegated;
- conclusion and supporting evidence;
- conflicts, assumptions, confidence, and residual uncertainty;
- recommended action and which workflow owns it;
- checks the parent must still perform.

The parent reconciles specialist evidence with repository facts, user intent, and
other applicable guidance before acting. It retains all writes, integration,
readiness decisions, and user-facing completion claims.

When repeated evidence shows that the delegation gate, specialist selection, or
contract itself is systematically wrong, pass that signal to
`kf-learn-from-evidence`. Do not turn a single weak or unavailable specialist into
a durable rule.
