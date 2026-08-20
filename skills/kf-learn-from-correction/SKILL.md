---
name: kf-learn-from-correction
description: Analyze the user's manual rewrite or repeated correction of Codex-generated work and propose durable, carefully scoped lessons. Use when the user asks to improve future behavior from their corrections. Do not use for ordinary task requirements or one-off implementation feedback without a request for lasting guidance.
---

# Learn From Correction

Extract reusable lessons without accumulating uncontrolled instructions.

## Workflow

1. Inspect the prior agent-generated implementation or diff when available, the
   user's resulting implementation, the explicit correction, and surrounding
   repository context.
2. Describe material differences in behavior, structure, naming, validation,
   errors, tests, scope, and workflow. Distinguish deliberate choices from incidental
   edits and formatting.
3. Identify why each meaningful change improved the result and whether evidence
   shows a repeated preference or established repository convention.
4. Classify candidates as a global engineering preference, project-specific
   convention, workflow improvement, canonical example, or one-off requirement.
5. Recommend the narrowest durable destination: global `AGENTS.md`, project
   `AGENTS.md`, an existing K Fleet skill, project docs, a canonical example, or
   nowhere.
6. Present proposed lessons for review before persisting changes unless the user
   explicitly authorized the relevant update.

## Report each proposed lesson

```text
Observed pattern
Why it appears reusable
Recommended destination
Suggested wording
Confidence
```

## Constraints

- Do not turn every manual edit, isolated preference, or one-off requirement into a
  permanent rule.
- Prefer repeated evidence and preserve narrower project guidance over global rules.
- Do not duplicate facts already clear from canonical code or documentation.
- Keep wording concise, actionable, and scoped; remove stale or conflicting guidance
  when an authorized update makes that safely possible.

The goal is controlled learning from real usage, not automatic background learning.
