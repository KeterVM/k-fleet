---
name: kf-verify-change
description: Review and validate existing changes before completion or merge using repository-appropriate checks. Use when the user asks to check a diff, test work, or confirm readiness. Do not use as the primary workflow for implementing a new feature, diagnosing an unknown issue, or performing a behavior-preserving refactor.
---

# Verify Change

Determine whether existing changes solve the task safely and are ready to hand off.

## Workflow

1. Read the requested outcome, repository guidance, current status, changed files,
   and complete diff before selecting checks.
2. Inspect actual tooling and risk. Choose targeted tests, type checking, linting,
   formatting checks, builds, schema or migration validation, compatibility checks,
   and broader suites only when relevant.
3. Review the implementation against nearby repository patterns and the task's
   observable acceptance criteria.
4. Run the smallest checks that provide meaningful confidence. Inspect complete
   failures rather than relying only on exit codes.
5. When modification is authorized, fix problems caused by the changes and rerun
   affected checks. Do not conceal or relabel failures.
6. Inspect the final diff and status for unintended files, generated artifacts,
   unrelated formatting, dead code, dependencies, and compatibility changes.
7. Report checks run, results, fixes made, checks not run, and remaining risk.

## Final review questions

- Does the change solve the requested task?
- Does it follow repeated repository patterns?
- Does it preserve unrelated behavior?
- Did it introduce unnecessary abstractions or dependencies?
- Does it touch unrelated code or formatting?
- Is a simpler complete implementation available?
- Were the relevant checks actually run?

Verification is evidence, not ceremony. Do not blindly run every expensive check.
