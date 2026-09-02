# Verification route

Use for a review, readiness verdict, or independent assessment of an existing
artifact. Do not modify the reviewed artifact in this route.

1. Resolve the exact artifact, base or intended contract, scope, and readiness
   criteria. Inspect the complete current diff or artifact rather than a summary.
2. Prioritize actionable correctness, security, data-loss, compatibility,
   regression, migration, architectural-boundary, lifecycle, and missing-test risks.
   Check that responsibilities have clear owners, dependency direction is preserved,
   removed coverage has a replacement, and claimed behavior has behavior-level
   evidence; static analysis alone does not establish those properties.
3. Report findings with evidence, affected location, impact, and confidence. State
   checks not run and residual risk.
4. If correction is authorized, issue the verdict first, hand mutation to bug fix,
   implementation, or refactor, then independently reverify the integrated result
   against the original criteria.

A writer's own checks support implementation completion but do not count as an
independent verdict.
