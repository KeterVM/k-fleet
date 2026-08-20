# K Fleet Example Test Report

Date: 2026-08-20

## Result

At the time of this initial exercise, all seven original K Fleet skills were
installed project-locally for Codex, passed
structural validation, and produced the intended workflow outcome in the Fleet
Ledger example.

| Skill | Result | Behavioral evidence |
| --- | --- | --- |
| `kf-setup-project` | Pass | `AGENTS.md` contains only verified paths, commands, boundaries, and examples. |
| `kf-implement-feature` | Pass | Fuel-cost reporting was added as a focused pure function with targeted validation and tests. |
| `kf-fix-bug` | Pass | The 61-second duration regression failed with actual `1` versus expected `2`, then passed after the one-line root-cause fix. |
| `kf-investigate-issue` | Pass | The duplicate-ID symptom was reproduced and explained without modifying product code. |
| `kf-refactor-code` | Pass | Shared positive-number validation was extracted; all 8 pre-existing tests passed before and after. |
| `kf-verify-change` | Pass | Full tests, skill validation, naming, placeholders, and local links were checked. |
| `kf-learn-from-correction` | Pass | A rounding correction became a project regression example, not an unsupported global rule. |

## Commands and checks

### Example project

```text
npm test
9 tests
9 passed
0 failed
```

### K Fleet skills

The example installed the local K Fleet source with:

```text
bunx skills add ../../skills --agent codex --skill '*' --yes
```

At that time, `bunx skills list --agent codex --json` reported seven project-scoped Codex skills
under `.agents/skills/`. SHA-256 comparisons confirmed that every installed
`SKILL.md` matched its source under `../../skills/`.

Each directory under `../../skills/` was checked with Codex's installed
`quick_validate.py` validator:

```text
kf-fix-bug: pass
kf-implement-feature: pass
kf-investigate-issue: pass
kf-learn-from-correction: pass
kf-refactor-code: pass
kf-setup-project: pass
kf-verify-change: pass
```

Additional checks found:

- 7 skill directories and 7 matching frontmatter names
- 7 project-installed skills recorded in `skills-lock.json`
- 7 installed copies matching their K Fleet sources
- 0 validator failures
- 0 unfinished placeholders
- 0 broken local Markdown links
- no external project dependencies

## Routing sanity check

| Example request | Expected route |
| --- | --- |
| “Set this repository up so Codex understands the project.” | `kf-setup-project` |
| “Add estimated fuel-cost reporting.” | `kf-implement-feature` |
| “Fix duration billing for partial minutes.” | `kf-fix-bug` |
| “Find out why duplicate vehicles are reported sometimes.” | `kf-investigate-issue` |
| “Remove duplicated validation without changing behavior.” | `kf-refactor-code` |
| “Check this project and run the right validation.” | `kf-verify-change` |
| “Learn from my fuel-cost rounding rewrite.” | `kf-learn-from-correction` |

The descriptions distinguish implementation, correction, investigation,
behavior-preserving refactoring, verification, setup, and correction learning for
these representative requests.

## Limits

The skills are installed in the example project rather than the user's global
Codex directory, and existing global Codex configuration remains unchanged. This
already-running session cannot restart itself to measure fresh-session implicit
routing, but the project-scoped discovery paths and `bunx skills list` output were
verified. The K Fleet workspace is not a Git repository, so verification inspected
files directly rather than reviewing a Git diff.
