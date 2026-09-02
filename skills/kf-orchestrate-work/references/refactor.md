# Refactor route

Use this route for an internal structural improvement with unchanged observable
behavior.

1. Define the concrete maintainability target and the public behavior that must
   remain stable.
2. Establish a passing baseline from existing checks and inspect affected contracts,
   exports, errors, formats, ordering, side effects, and performance-sensitive paths.
3. Restructure one coherent unit using established repository patterns. Keep the
   change reversible and avoid speculative generalization or unrelated cleanup.
4. Re-run equivalence evidence, proportionate broader checks, and inspect the final
   diff for accidental behavior changes.

If the requested result intentionally changes behavior, use implementation. If the
baseline already violates an accepted contract, use bug fix.
