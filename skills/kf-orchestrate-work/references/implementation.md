# Implementation route

Use this route for new or intentionally changed observable behavior.

1. Establish the observable outcome, constraints, and acceptance evidence. Reuse
   applicable guidance, accepted design, and current facts already in context;
   inspect affected paths or analogous implementations to fill relevant gaps.
2. Give changed responsibilities a clear module owner and follow local layout,
   naming, and error-handling conventions. Include support required for the user's
   scenario to work; a visible entry point alone may be incomplete.
3. Use the [engineering checkpoint](design.md#engineering-checkpoint) for material
   architectural, compatibility, data-integrity, trust-boundary, or lifecycle risk.
   Routine changes with understood local contracts do not require deeper references
   or a separate design document.
4. Use [testing](testing.md) when adding or changing tests, or choosing test-first
   feedback for non-trivial behavior. Mechanical or unconditional presentation edits
   may use static checks, focused diff inspection, or direct UI evidence.
5. Implement coherent slices through the necessary paths. When deleting or
   consolidating code, preserve affected contracts and valuable regression coverage.
6. Validate the outcome and its supporting behavior, applying the entry point's
   integration and completion rules. Report gaps in runtime evidence explicitly.

Report the result, decisive validation, and material limitations or deviations.
