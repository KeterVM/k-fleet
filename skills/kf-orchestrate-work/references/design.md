# Design route

Use this route when the requested result is an implementation-ready technical
design or when the user explicitly requires design before implementation.

1. Define the observable target, acceptance evidence, scope, non-goals,
   compatibility constraints, verified facts, assumptions, and unresolved choices.
2. Inspect applicable context, code paths, tests, configuration, documentation,
   history, and analogous implementations.
3. Trace affected boundaries and invariants. Compare materially different options
   by correctness, complexity, compatibility, failure modes, and reversibility.
4. Recommend the smallest complete design supported by evidence. Challenge it
   against edge conditions and remove speculative abstraction.
5. If implementation follows, hand over a compact contract containing target state,
   accepted decisions, constraints, non-goals, acceptance evidence, unresolved
   assumptions, and affected boundaries. Execution revalidates material facts.

Do not modify production code unless implementation is also authorized. A design
does not itself grant mutation authority.
