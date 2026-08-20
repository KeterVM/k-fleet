---
name: kf-delegate-specialist
description: Delegate bounded domain analysis, research, independent review, or specialist execution to a focused sub-agent when the user requests a specialist or a specialized perspective, method, or evidence base would materially improve a separable subtask and current policy permits delegation. Do not use for ordinary work, vague expert role-play, tightly coupled tasks, or to transfer the parent agent's responsibility for verification.
---

# Delegate Specialist

Use a focused sub-agent to apply a domain-appropriate method, work with an isolated
evidence set, or provide an independent judgment on a specific specialty. This is
especially useful when a task needs substantial non-engineering knowledge that is
not central to the parent agent's working context.

A sub-agent has the same underlying platform capabilities. A specialist framing can
surface more relevant concepts and reasoning patterns, but it does not guarantee
additional knowledge, credentials, correctness, or authority.

## When delegation helps

- The user explicitly requests a specialist, sub-agent, delegation, or independent
  domain review.
- A task contains a clearly separable specialty with its own domain method,
  evidence, and deliverable.
- A non-engineering question would benefit from dedicated research or analysis
  without pulling a large domain corpus into the parent agent's working context.
- Independent analysis would reduce confirmation bias or protect the parent
  agent's working context.
- The available sub-agent mechanism and current policy permit delegation.

Continue directly when the work is ordinary, tightly coupled to the main task,
smaller than the handoff overhead, or cannot be safely separated.

## Choose a mode

- **Perspective:** apply a domain framework or vocabulary to supplied material
  without external research or side effects.
- **Research:** gather and synthesize evidence. Prefer authoritative primary sources
  for current, disputed, regulated, or high-stakes claims, and record relevant
  publication, effective, or access dates.
- **Independent review:** evaluate an existing conclusion or artifact without being
  primed with the parent's preferred answer. Look for counterevidence and plausible
  alternatives.
- **Execution:** perform a bounded change or action only with explicit authorization,
  exclusive ownership, and appropriate validation.

Use the fewest specialists needed. Do not create recursive delegation chains by
default.

## Workflow

1. Define the exact specialty, select a mode, and state which domain method,
   evidence base, or independent viewpoint makes delegation useful.
2. Isolate one concrete objective that can be completed independently.
3. Prepare a handoff containing:
   - objective and expected deliverable
   - domain role and useful analytical method, not an inflated persona
   - minimum relevant context, known facts, and evidence
   - source quality, recency, citation, and tool expectations
   - allowed files, tools, and side effects
   - constraints, non-goals, and compatibility requirements
   - validation expectations and stopping condition
4. Name the specialist after the work, such as `tax-rule-researcher`,
   `database-migration-reviewer`, or `accessibility-verifier`; avoid inflated or
   vague personas.
5. Spawn the specialist with the handoff. Keep perspective, research, and review
   modes read-only; for execution, establish exclusive file or action ownership.
6. Continue useful parent work that does not overlap while the specialist runs.
7. Require the result to distinguish sourced facts, inferences, assumptions, and
   unresolved questions. It should cite material evidence, surface counterevidence
   or alternatives, and state confidence and applicability limits.
8. Review the returned reasoning, sources, changes, and validation. Challenge
   unsupported conclusions, check time-sensitive claims against current evidence,
   and reconcile conflicts with repository or user-provided facts.
9. Integrate only the necessary result, run parent-level verification, and report
   what was delegated and how it was validated.

## Constraints

- Delegation does not expand the user's authorization, filesystem scope, external
  permissions, or approval boundaries.
- Do not send secrets, irrelevant private data, or unnecessary repository context.
- Do not let multiple agents edit the same files concurrently.
- Treat specialist output as evidence to review, not an automatically correct
  answer.
- Do not treat a confident tone, specialist title, or unsourced domain terminology
  as evidence.
- The parent agent remains responsible for the final result and must disclose
  unresolved uncertainty.
- When a domain requires licensed, regulated, or human expert judgment, explain
  that limitation instead of presenting a sub-agent as a substitute.
