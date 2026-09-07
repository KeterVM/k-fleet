# Verification route

Use for a review, readiness verdict, or independent assessment of an existing
artifact. Do not modify the reviewed artifact in this route.

1. Resolve the exact artifact, intended contract, and scope. Inspect the current
   artifact and relevant evidence rather than relying on the writer's summary.
2. Prioritize reachable correctness, security, regression, and missing-evidence
   risks. For unresolved cross-layer ownership, data-integrity, platform lifecycle,
   or compatibility concerns, consult the relevant sections of
   [engineering](engineering.md). A bounded review with understood contracts does
   not require that reference.
3. Report actionable findings with location, evidence, impact, and confidence.
   Distinguish properties demonstrated by checks from untested claims; identify
   material limitations without rerunning checks solely because review has begun.
4. If correction is already authorized, continue through the appropriate change
   route and validate the correction against the original criteria. Review-only
   requests remain read-only.

A writer's checks support implementation completion but do not constitute an
independent verdict. The orchestrator retains integration and final completion.
