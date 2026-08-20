---
name: kf-delegate-specialist
description: Delegate a bounded, separable subtask to a focused sub-agent when the user explicitly requests a specialist or when isolated domain analysis would materially improve the result and sub-agent tooling is permitted. Do not use for ordinary work, vague expert role-play, or to transfer the parent agent's responsibility for verification.
---

# Delegate Specialist

Use a focused sub-agent to improve context isolation or independent reasoning on a
specific specialty. A sub-agent has the same underlying platform capabilities; a
specialist role does not guarantee additional knowledge, credentials, or authority.

## When delegation helps

- The user explicitly requests a specialist, sub-agent, delegation, or independent
  domain review.
- A task contains a clearly separable specialty with its own evidence and
  deliverable.
- Independent analysis would reduce confirmation bias or protect the parent
  agent's working context.
- The available sub-agent mechanism and current policy permit delegation.

Continue directly when the work is ordinary, tightly coupled to the main task,
smaller than the handoff overhead, or cannot be safely separated.

## Choose a mode

- **Advisor:** read-only analysis, risks, assumptions, or recommendations. Prefer
  this when the domain is unfamiliar or edits would overlap.
- **Implementer:** a bounded change with explicit file ownership and validation.
- **Verifier:** an independent review of an existing conclusion or artifact.

Use the fewest specialists needed. Do not create recursive delegation chains by
default.

## Workflow

1. Define the exact specialty and why focused delegation adds value.
2. Isolate one concrete objective that can be completed independently.
3. Prepare a handoff containing:
   - objective and expected deliverable
   - minimum relevant context and evidence
   - allowed files, tools, and side effects
   - constraints, non-goals, and compatibility requirements
   - validation expectations and stopping condition
4. Name the specialist after the work, such as `tax-rule-researcher`,
   `database-migration-reviewer`, or `accessibility-verifier`; avoid inflated or
   vague personas.
5. Spawn the specialist with the handoff. Assign read-only work when concurrent
   edits could conflict; otherwise establish exclusive file ownership.
6. Continue useful parent work that does not overlap while the specialist runs.
7. Review the returned evidence, assumptions, changes, and validation. Challenge
   unsupported conclusions and reconcile conflicts with repository facts.
8. Integrate only the necessary result, run parent-level verification, and report
   what was delegated and how it was validated.

## Constraints

- Delegation does not expand the user's authorization, filesystem scope, external
  permissions, or approval boundaries.
- Do not send secrets, irrelevant private data, or unnecessary repository context.
- Do not let multiple agents edit the same files concurrently.
- Treat specialist output as evidence to review, not an automatically correct
  answer.
- The parent agent remains responsible for the final result and must disclose
  unresolved uncertainty.
- When a domain requires licensed, regulated, or human expert judgment, explain
  that limitation instead of presenting a sub-agent as a substitute.
