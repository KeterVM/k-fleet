# Implementation route

Use this route for new or intentionally changed observable behavior.

1. Apply the [engineering method](engineering.md) to establish the task contract,
   select relevant engineering dimensions, and identify necessary supporting work.
   Carry forward any accepted design and revalidate facts that may have changed.
2. Trace the scenario through affected contracts and execution paths, including
   necessary supporting capabilities. Inspect callers, consumers, analogous
   implementations, and relevant failure or lifecycle paths.
3. Apply the [engineering checkpoint](design.md) before editing when the change has
   material architectural, compatibility, data-integrity, or lifecycle risk.
4. Establish [module ownership and local conventions](engineering.md#resolve-ownership-and-conventions)
   before creating files. Choose the smallest complete implementation; abstractions
   should protect a boundary, invariant, test seam, or established repository pattern.
5. Use [testing](testing.md) when adding or changing tests or deciding whether
   test-first feedback is valuable. Match validation to meaningful regression risk;
   mechanical or presentational changes may need only non-test evidence.
6. Implement coherent vertical slices. When deleting or consolidating code, trace
   affected references and preserve valuable coverage through equivalent public
   evidence.
7. Verify the [integrated outcome](engineering.md#verify-the-integrated-outcome), then inspect
   the integrated diff for misplaced responsibility, reversed dependencies,
   duplicate representations, orphaned paths, and unsafe lifecycle ordering. Run
   validation that can detect mistakes in the changed contract. Runtime behavior
   changes need evidence exercising that behavior; mechanical or presentational
   changes may use static checks, focused diff inspection, or direct UI inspection.

Report the result, decisive validation, and material limitations or deviations.
