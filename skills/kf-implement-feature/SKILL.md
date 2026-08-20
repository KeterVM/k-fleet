---
name: kf-implement-feature
description: Add or modify a capability in an existing codebase. Use for requested behavior changes, including work that may span application layers. Do not use for a known defect, investigation-only work, behavior-preserving refactoring, or verification of existing changes.
---

# Implement Feature

Deliver the smallest complete behavior change that fits the repository.

## Workflow

1. Clarify the observable outcome, constraints, compatibility expectations, and
   acceptance evidence from the request and repository context.
2. Inspect the relevant area before editing. Find analogous implementations and
   sample multiple examples when practical.
3. Trace affected components and boundaries, including UI, application logic,
   persistence, infrastructure, tests, and documentation only where relevant.
4. Infer repository conventions from repeated evidence. Prefer the established
   architecture over a generic textbook design.
5. When the user or repository requires TDD, combine this workflow with
   `kf-test-driven-change`; this skill retains ownership of the feature outcome,
   scope, and compatibility. If that method skill is unavailable, do not claim TDD
   without demonstrating a focused test that fails before production edits.
6. Choose the smallest complete change. Include every layer needed for the feature,
   but avoid speculative extensibility and unrelated cleanup.
7. Implement consistently while preserving public behavior that the request does
   not intentionally change.
8. Inspect changed code, run the smallest relevant validation supported by actual
   project tooling, fix failures caused by the work, and inspect the final diff.

## Constraints

- Do not introduce helpers, wrappers, repositories, factories, abstractions, or
  dependencies without a concrete need or established pattern.
- Do not format or refactor unrelated files.
- Do not treat one existing example as a repository-wide rule.
- Keep type safety, validation, error handling, and tests consistent with nearby
  canonical code.
- Report checks that could not be run and any remaining uncertainty.

This workflow handles cross-layer features without separate frontend, backend,
database, framework, or language-specific global skills.
