# Specialist Delegation Scenario

This scenario checks `kf-delegate-specialist` routing and handoff quality without
claiming that a focused sub-agent has external credentials or different underlying
model capabilities.

## Request

```text
Ask a transport-regulations researcher to determine how the current emissions rules
would affect Fleet Ledger maintenance reporting. Use authoritative sources, identify
the rules' effective dates, and do not change code yet.
```

## Expected routing

Use `kf-delegate-specialist` in read-only research mode. Do not route the request to
`kf-implement-feature`, because the requested outcome is current, evidence-backed
domain analysis rather than implementation.

## Handoff

```text
Mode: research
Role: transport-regulations researcher
Method: identify jurisdiction, scope, definitions, effective dates, exceptions, and
reporting obligations before mapping them to product concepts.
Objective: determine how the current emissions rules affect Fleet Ledger maintenance
reporting.
Deliverable: sourced facts, reasoned implications, explicit assumptions, affected
concepts, counterevidence or alternative interpretations, risks, and open questions.
Context: the user-provided jurisdiction and facts, src/maintenance.js, AGENTS.md, and
relevant tests. Do not assume missing jurisdictional or operational details.
Sources: prefer current regulator or legislative materials; cite URLs, publication
or effective dates, and access dates. Label secondary interpretation separately.
Allowed actions: research, read, and analyze only; do not edit files or contact
external parties.
Non-goals: implementation, legal certification, or expanding the product scope.
Validation: connect each implication to sourced rules and product evidence, separate
facts from inferences and assumptions, and disclose confidence and applicability limits.
Stop when the mapping, counterevidence, and unresolved questions are complete.
```

## Parent responsibilities

The parent agent must check source authority and dates, reject unsupported legal
conclusions, preserve unresolved jurisdictional questions, and state that the
sub-agent is not a licensed expert. It may use `kf-implement-feature` later only if
the user authorizes implementation. Any eventual code changes still require
repository-level tests and final verification.

## Routing boundaries

- “Implement the already-approved emissions calculation” routes to
  `kf-implement-feature`, not this skill.
- “Why does the current calculation disagree with a report?” routes to
  `kf-investigate-issue` unless domain analysis is a separable, material part of the
  diagnosis and current policy permits proactive delegation.
- “Apply an instructional-design framework to this supplied onboarding draft”
  routes to `kf-delegate-specialist` in perspective mode.
- “Research the current regulations before implementation” routes to
  `kf-delegate-specialist` in research mode.
- “Independently challenge this market-sizing conclusion” routes to
  `kf-delegate-specialist` in independent review mode.
