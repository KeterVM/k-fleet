# Design route

Use this route when the requested result is an implementation-ready technical
design or when the user explicitly requires design before implementation.

## Engineering checkpoint

For material architectural, compatibility, data-integrity, trust-boundary, or
lifecycle risk, resolve decisive ownership, invariants, failure behavior, and
validation before editing. Use the relevant sections of [engineering](engineering.md)
when these questions remain unresolved or require tracing across layers. Current
evidence or an accepted design can satisfy this checkpoint without rereading it.
A local change needs only its decisive constraint and proportionate validation.

Resolve routine technical choices within existing authorization. Ask when an
unresolved product or authority decision materially changes the outcome.

## Procedure

1. Define the target, scope, acceptance evidence, and unresolved choices. Reuse
   current context; inspect sources needed to resolve material gaps or assumptions.
2. Model affected responsibilities and boundaries using local conventions. Apply
   the checkpoint above where relevant, including necessary supporting capabilities.
3. Compare viable alternatives when there is a real tradeoff. Recommend the least
   structure that preserves ownership and required invariants; check relevant edge
   conditions, migration, deletion, and rollback consequences.
4. Make the design usable for delivery: identify affected owners, constraints,
   acceptance evidence, and remaining assumptions. No fixed report format or number
   of alternatives is required. Continue authorized implementation using these
   decisions, revalidating facts only when needed.

Do not modify production code unless implementation is also authorized. A design
does not itself grant mutation authority.
