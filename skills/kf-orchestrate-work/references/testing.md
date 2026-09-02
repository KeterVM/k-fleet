# Testing methods

## Retrospective coverage

Use for test-only protection of already-implemented intended behavior.

- Identify the public behavior and current evidence before writing tests.
- Exercise the narrowest credible public seam; do not expose private production
  internals or add production abstractions for test convenience.
- Make the test distinguish the target behavior from a plausible regression.
- If the test reveals a product mismatch, stop the test-only change and route an
  authorized correction to bug fix or implementation, then return to coverage.

## Test-driven change

Compose this method only when the user or repository requires TDD for an already
scoped implementation or bug fix.

For each observable vertical slice:

1. **Red:** add the smallest behavior-level test and observe the expected failure
   from the missing or defective behavior, not from setup or syntax.
2. **Green:** implement the smallest coherent production change that satisfies the
   slice while preserving other contracts.
3. **Refactor:** improve structure only with all tests green and no behavior change.

Record credible Red and Green evidence. The primary implementation or bug-fix route
continues to own scope, compatibility, and production structure.
