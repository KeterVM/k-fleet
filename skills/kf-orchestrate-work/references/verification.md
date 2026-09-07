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
4. If correction is already authorized, carry the findings into bug fix,
   implementation, or refactor without renewed approval. Validate the integrated
   correction against the original criteria; use a separate reviewer when an
   independent verdict is requested or justified by risk. Review-only requests
   remain read-only.

A writer's own checks support implementation completion but do not count as an
independent verdict.
