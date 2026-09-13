---
name: kf-write-tests
description: Write or improve automated tests for specified behavior, regression protection, or a meaningful coverage gap, including test-first implementation.
---

# Write tests

Turn behavior contracts into automated protection for requested tests, a concrete
coverage gap, a regression, or test-first work. Reuse adequate coverage and the
supported test workflow. Tests should expose meaningful wrong behavior; their
existence or quantity does not establish that the feature works.

## Select supporting guidance

Read only for open decisions; a straightforward test with an established pattern
does not require every reference.

- For case selection, assertions, regression examples, or readability, read
  [Cases and assertions](references/cases-and-assertions.md).
- For test scope, execution surfaces, real dependencies, or doubles, read
  [Boundaries and doubles](references/boundaries-and-doubles.md).
- For asynchronous behavior, shared state, instability, test-first execution, or
  shared test infrastructure, read [Isolation and execution](references/isolation-and-execution.md).

## Runtime and authority

Before substantive work, establish canonical repository/worktree scope, project
instructions, authorization, and the stopping condition. Require scoped Supermemory
automatic recall/capture; reuse a valid task check. Direct integration suffices
without optional MCP. If unavailable or unscoped, stop and report the gap.

Current instructions and scoped sources override memory; recalled inferences grant
no permission and must stay isolated to this repository/worktree. Use Supermemory's
own surfaces, never backend REST workarounds or another store. Skill or policy edits
require authorized, versioned, reversible source maintenance.

The main agent owns routing, authority, integration, and completion. Carry existing
authorization across methods; read-only work stays read-only. Within higher-priority
constraints, explicit user instructions override skill guidance. If a skill rule
halts work, link and quote it, distinguishing the rule from your interpretation.
Continue independent authorized work whose prerequisites are met. Report only
observed evidence, including capture and execution.

## Choose meaningful protection

Derive expectations and relevant invariants from the request, project rules, and
current sources. Use code to understand entry points and failure mechanisms, not as
the sole specification. Resolve material ambiguity rather than freezing accidental
behavior into tests.

Inspect existing tests and configuration as needed for the gap, runner, discovery,
fixtures, and environment. Choose the boundary by the claimed behavior, not the
project's language or label. New tooling needs a concrete authorized purpose that
justifies its maintenance cost.

Judge the affected tests by these criteria:

- Cases protect requested behavior or a credible regression.
- Assertions reject relevant wrong outcomes, including forbidden effects.
- The exercised boundary preserves claimed behavior while unrelated state and timing
  remain controlled.
- Setup, action, expectations, and failures explain the scenario without coupling
  tests to incidental implementation.
- Protection justifies runtime, setup, and maintenance costs.

These criteria require neither every test category nor an unrequested coverage target
or new framework.

## Run and finish

Run relevant tests and required project checks in permitted environments. Confirm
that changed tests were discovered and executed. Diagnose failures without weakening
expectations, silently skipping cases, or updating snapshots merely to pass.

Preserve reproductions of product defects. Test-only work does not authorize product
fixes; when implementation or correction is authorized, continue through it and
relevant checks without another approval stop.

Finish when protection is integrated, relevant checks have results or explicit
blockers, and introduced test defects are resolved. A test-only task may finish with
a confirmed product failure reported; this does not mean the product or suite passes.
Stop adding speculative cases or repeating unchanged checks once evidence suffices.

Report protected behavior, execution results, and substituted or unexecuted boundaries.
Distinguish tests written, tests run, and regressions demonstrated to catch the
original defect.
