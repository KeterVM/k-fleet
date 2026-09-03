# Testing methods

## Test value gate

Before writing or changing a test, identify the plausible regression it detects and
why existing cheaper evidence would miss that regression. A useful test normally
protects non-trivial user or business behavior, a demonstrated defect, a failure or
lifecycle path, a security or accessibility property, or a compatibility boundary.

Do not add a test solely to increase coverage or preserve incidental implementation
history. In the absence of a specific user or authoritative repository requirement,
skip tests that only repeat types, schemas, static analysis, or generated checks;
freeze snapshots, DOM shape, internal calls, or ordering with no contract; or assert
unconditional copy, presentation, and pass-through field wiring with no logic or
credible regression risk. Validate such work with the least expensive evidence that
can fail for a real mistake, such as typechecking, linting, a build, focused diff
inspection, or direct UI inspection. Never add a production seam only to make a
low-value test possible.

## Retrospective coverage

Use for test-only protection of already-implemented intended behavior.

- Identify the public behavior and current evidence before writing tests.
- Exercise the narrowest credible public seam; do not expose private production
  internals or add production abstractions for test convenience.
- Make the test distinguish the target behavior from a plausible regression.
- Apply the test value gate; if no meaningful regression is identified, do not
  manufacture coverage and report the proportionate non-test evidence instead.
- If the test reveals a product mismatch, stop the test-only change and route an
  authorized correction to bug fix or implementation, then return to coverage.

## Test-driven change

Compose this method only when the user or an authoritative repository rule
explicitly requires TDD for an already scoped implementation or bug fix. Never
infer it from the existence of a test suite, a generic request for tests or relevant
checks, or the fact that observable behavior changes. Apply the test value gate to
each slice; do not manufacture a Red failure for behavior that has no useful test
contract.

For each observable vertical slice:

1. **Red:** add the smallest behavior-level test and observe the expected failure
   from the missing or defective behavior, not from setup or syntax.
2. **Green:** implement the smallest coherent production change that satisfies the
   slice while preserving other contracts.
3. **Refactor:** improve structure only with all tests green and no behavior change.

Record credible Red and Green evidence. The primary implementation or bug-fix route
continues to own scope, compatibility, and production structure.
