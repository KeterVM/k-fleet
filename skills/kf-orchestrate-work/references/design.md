# Design route

Use this route when the requested result is an implementation-ready technical
design or when the user explicitly requires design before implementation.

## Engineering checkpoint

For changes with material architectural, compatibility, data-integrity, or lifecycle
risk, identify affected ownership, invariants, failure behavior, and validation
before editing. Include migration, deletion, and rollback impact where relevant.
A local change needs only its decisive constraint and proportionate validation.
Use the shared [engineering method](engineering.md) to select the relevant
dimensions and resolve dependencies across layers rather than considering only the
initially affected component.

Explain consequential tradeoffs when useful; compare alternatives only when there
is a real choice. Resolve routine implementation decisions within existing
authorization. Ask when an unresolved product or authority decision materially
changes the outcome. Completion depends on the requested result and relevant
evidence, not a prescribed report format or number of alternatives.

## Procedure

1. Define the observable target, acceptance evidence, scope, non-goals,
   compatibility constraints, verified facts, assumptions, and unresolved choices.
   Use the [engineering method](engineering.md) to derive necessary supporting
   capabilities and select the dimensions that need design before choosing components.
2. Inspect the context and affected paths needed to resolve the design; expand to
   history or analogous implementations when they answer a material question.
3. Model the current and target responsibilities, dependency direction, data and
   control flow, state or lifecycle transitions, failure handling, observability,
   and test seams relevant to the change's risk.
   Resolve [module ownership and local conventions](engineering.md#resolve-ownership-and-conventions)
   from the repository so the design specifies where responsibilities belong.
4. Where viable alternatives exist, compare their material tradeoffs and explain
   the recommendation using repository evidence.
5. Recommend the smallest complete design supported by evidence. Smallest means
   the least structure that preserves clear ownership and all required invariants,
   not the fewest files or abstractions. Challenge it against edge conditions,
   deletion and rollback paths, and both under- and over-engineering.
6. If implementation follows, carry forward the accepted decisions, constraints,
   acceptance evidence, and unresolved assumptions. Revalidate facts that may have
   changed; continue implementation when it is already authorized.

Do not modify production code unless implementation is also authorized. A design
does not itself grant mutation authority.
