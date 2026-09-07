# Refactor route

Use this route for an internal structural improvement with unchanged observable
behavior.

1. Define the concrete maintainability target and public behavior that must remain
   stable.
2. Record the baseline from relevant existing checks and inspect affected contracts
   and performance-sensitive paths. Distinguish pre-existing failures from this
   change; unrelated failures do not require fixing old debt. If a baseline cannot
   run, report the limitation and use available evidence that can detect accidental
   behavior changes.
3. Apply the [engineering checkpoint](design.md) before editing when the restructure
   has material architectural, compatibility, data-integrity, or lifecycle risk.
4. Restructure one coherent unit using established repository patterns. Keep the
   change reversible and avoid speculative generalization or unrelated cleanup.
5. Re-run equivalence evidence and inspect the final diff for accidental behavior
   changes. Broaden checks only where risk or new evidence warrants it.

If the requested result intentionally changes behavior, use implementation. If the
target behavior violates an accepted contract and correction is authorized, use bug
fix for that correction.
