# Implementation route

Use this route for new or intentionally changed observable behavior.

1. Confirm the outcome, compatibility expectations, acceptance evidence, and any
   accepted design contract. Revalidate material facts that may have changed.
2. Inspect directly affected contracts and execution paths. Expand to callers,
   consumers, analogous implementations, and failure or lifecycle paths when the
   change's risk or repository evidence requires it.
3. Apply the [engineering checkpoint](design.md) before editing when the change has
   material architectural, compatibility, data-integrity, or lifecycle risk.
4. Choose the smallest complete implementation. Each responsibility needs a clear
   owner; abstractions should protect a boundary, invariant, test seam, or established
   repository pattern. Avoid speculative layers without avoiding necessary structure.
5. Use [testing](testing.md) when adding or changing tests or deciding whether
   test-first feedback is valuable. Match validation to meaningful regression risk;
   mechanical or presentational changes may need only non-test evidence.
6. Implement coherent vertical slices. When deleting or consolidating code, trace
   affected references and preserve valuable coverage through equivalent public
   evidence.
7. Inspect the integrated diff for misplaced responsibility, reversed dependencies,
   duplicate representations, orphaned paths, and unsafe lifecycle ordering. Run
   validation that can detect mistakes in the changed contract. Runtime behavior
   changes need evidence exercising that behavior; mechanical or presentational
   changes may use static checks, focused diff inspection, or direct UI inspection.

Report the result, decisive validation, and material limitations or deviations.
