# Implementation route

Use this route for new or intentionally changed observable behavior.

1. Confirm the outcome, compatibility expectations, acceptance evidence, and any
   accepted design contract. Revalidate design facts before editing.
2. Inspect the relevant area and multiple analogous implementations when available.
   Trace every affected boundary needed for a complete vertical change.
3. Choose the smallest complete implementation. Do not add a helper, wrapper,
   interface, dependency, or extension point without requested behavior or repeated
   repository structure that needs it.
4. When TDD is required, compose the TDD mode in [testing](testing.md); this route
   retains product scope and production-structure ownership.
5. Implement consistently, preserve behavior outside the requested change, inspect
   the diff, and run focused plus proportionate broader checks.

Report the observable result, changed boundaries, checks, deviations from an
accepted design, and residual uncertainty.
