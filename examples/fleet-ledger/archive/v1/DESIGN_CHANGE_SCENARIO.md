# Design Change Scenario

This exercise forward-tests `kf-design-change` against a request for an
implementation-ready plan without authorizing production changes.

## Request

```text
Design a migration from Fleet Ledger's in-memory records to durable storage. Compare
reasonable approaches and give me an implementation plan, but do not change code.
```

## Expected routing

Use `kf-design-change`. Do not route to `kf-implement-feature`, because the requested
deliverable is a design rather than implemented behavior. Use
`kf-investigate-issue` only if an unexplained property of the current system must be
resolved before the design can proceed.

## Expected evidence

The design must inspect the immutable record factories, ledger boundaries, tests,
project guidance, and current absence of persistence configuration. It must
separate those facts from assumptions about storage technology, deployment, scale,
transactions, and migration availability.

## Expected deliverable

The result should define current and target states, preserve existing observable
ledger behavior, compare genuinely different persistence boundaries, recommend the
smallest supported approach, identify affected components and interfaces, sequence
implementation and data migration, define validation and rollback evidence, and
leave unresolved product or operational decisions explicit. It must not edit
production code or choose a database without evidence or user direction.

## Routing boundaries

- "Implement durable storage" routes to `kf-implement-feature`.
- "Why are records lost after restart?" routes to `kf-investigate-issue` unless
  the user also asks for correction.
- "Refactor the ledger behind a repository interface without changing behavior"
  routes to `kf-refactor-code`.
- "Review this persistence plan" routes to `kf-verify-change` when the plan already
  exists and the requested outcome is validation rather than a new design.
