# Specialist Delegation Scenario

This scenario checks `kf-delegate-specialist` routing and handoff quality without
claiming that a focused sub-agent has external credentials or different underlying
model capabilities.

## Request

```text
Ask a transport-regulations specialist to analyze the supplied emissions rules and
identify how they would affect Fleet Ledger maintenance reporting. Do not change
code yet.
```

## Expected routing

Use `kf-delegate-specialist` in read-only advisor mode. Do not route the request to
`kf-implement-feature`, because the requested outcome is specialist analysis rather
than implementation.

## Handoff

```text
Role: transport-regulations analyst
Objective: map the supplied emissions rules to Fleet Ledger maintenance concepts.
Deliverable: evidence-backed requirements, assumptions, affected modules, risks,
and candidate tests.
Context: the supplied rules, src/maintenance.js, AGENTS.md, and relevant tests.
Allowed actions: read and analyze only; do not edit files or contact external parties.
Non-goals: implementation, legal certification, or expanding the product scope.
Validation: cite each conclusion to supplied evidence and mark unresolved questions.
Stop when the mapping and open questions are complete.
```

## Parent responsibilities

The parent agent must review the evidence, reject unsupported legal conclusions,
state that the sub-agent is not a licensed expert, and use `kf-implement-feature`
later only if the user authorizes implementation. Any eventual code changes still
require repository-level tests and final verification.

## Routing boundaries

- “Implement the already-approved emissions calculation” routes to
  `kf-implement-feature`, not this skill.
- “Why does the current calculation disagree with a report?” routes to
  `kf-investigate-issue` unless a specialist is explicitly requested.
- “Independently review the supplied regulations before implementation” routes to
  `kf-delegate-specialist`.
