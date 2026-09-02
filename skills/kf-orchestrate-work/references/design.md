# Design route

Use this route when the requested result is an implementation-ready technical
design or when the user explicitly requires design before implementation.

## Engineering checkpoint

All production-mutation routes use this checkpoint when a change crosses
architectural boundaries or alters ownership, protocols, persistence, concurrency,
or lifecycle ordering. A local change needs only its decisive constraint and test
seam. For a qualifying change, send the user a compact `Engineering contract`
before the first production edit, containing:

- current and target ownership plus dependency, data, control, and lifecycle flow;
- preserved invariants plus failure, cleanup, rollback, and compatibility behavior;
- at least two viable options, including the status quo when relevant, with the
  selected option and evidence-based reasons the alternatives lose;
- acceptance evidence, test seams, and migration or deletion impact.

Omit only dimensions shown to be irrelevant. This visible message is an execution
gate, not optional status or hidden reasoning. Stop for user direction when an
unresolved product decision would materially change the contract.

For a qualifying change, the final report includes an `Engineering decisions`
recap naming the selected boundary, at least one rejected alternative and why it
lost, and the evidence that validates the decision. Do not claim completion when
this recap or required behavior evidence is missing.

## Procedure

1. Define the observable target, acceptance evidence, scope, non-goals,
   compatibility constraints, verified facts, assumptions, and unresolved choices.
2. Inspect applicable context, code paths, tests, configuration, documentation,
   history, and analogous implementations.
3. Model the current and target responsibilities, dependency direction, data and
   control flow, state or lifecycle transitions, failure handling, observability,
   and test seams at every affected boundary. Omit dimensions that evidence shows
   are irrelevant, rather than filling a template speculatively.
4. Compare the status quo and materially viable alternatives by correctness,
   cohesion, coupling, complexity, compatibility, failure modes, migration cost,
   and reversibility. State why the rejected alternatives lose in this repository.
5. Recommend the smallest complete design supported by evidence. Smallest means
   the least structure that preserves clear ownership and all required invariants,
   not the fewest files or abstractions. Challenge it against edge conditions,
   deletion and rollback paths, and both under- and over-engineering.
6. If implementation follows, hand over a compact contract containing target state,
   accepted decisions, constraints, non-goals, acceptance evidence, unresolved
   assumptions, affected boundaries, failure behavior, and test strategy. Execution
   revalidates material facts.

Do not modify production code unless implementation is also authorized. A design
does not itself grant mutation authority.
