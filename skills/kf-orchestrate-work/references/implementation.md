# Implementation route

Use this route for new or intentionally changed observable behavior.

1. Confirm the outcome, compatibility expectations, acceptance evidence, and any
   accepted design contract. Revalidate design facts before editing.
2. Inspect the relevant area and multiple analogous implementations when available.
   Trace the end-to-end success, failure, cancellation, retry, and disposal paths
   through every affected caller, boundary, state transition, and consumer.
3. Apply the proportional [engineering checkpoint](design.md) before mutation. It
   is mandatory for a cross-boundary or ownership, protocol, persistence,
   concurrency, or lifecycle change and remains part of this implementation route.
4. Choose the smallest complete implementation. Smallest does not mean the fewest
   files or the shortest patch: each responsibility needs a clear owner and each
   abstraction must protect a boundary, invariant, test seam, or repeated repository
   pattern. Reject forwarding-only layers, duplicated mapping, mixed transport and
   domain policy, speculative extension points, and convenience wrappers without
   evidence. Do not avoid a necessary abstraction merely to reduce the diff.
5. When TDD is required, compose the TDD mode in [testing](testing.md); this route
   retains product scope and production-structure ownership.
6. Implement coherent vertical slices and update their behavior-level tests. When
   deleting or consolidating code, trace every reference and replace removed
   coverage or record why equivalent public coverage already exists.
7. Inspect the integrated diff for misplaced responsibility, reversed dependencies,
   duplicate representations, orphaned paths, and unsafe lifecycle ordering. Run
   focused behavior tests for changed contracts and failure paths plus proportionate
   broader checks. Static analysis, formatting, compilation, and generated-code
   success are supporting evidence, not sufficient behavior evidence by themselves.

Report the observable result, changed boundaries, behavior evidence, broader checks,
deviations from an accepted design, and residual uncertainty. Include the engineering
checkpoint's decision recap when it applied.
