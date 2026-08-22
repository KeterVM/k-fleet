# Changelog

Notable changes to K Fleet are recorded here.

## [1.1.0] - 2026-08-22

### Added

- `kf-delegate-specialist`, a composable method skill for obtaining bounded,
  read-only specialist evidence without transferring task ownership, write
  authority, integration, or final verification.

### Validated

- An independent forward evaluator loaded the skill, spawned a bounded read-only
  specialist, integrated evidence, preserved parent ownership, and made no edit.

## [1.0.0] - 2026-08-20

Initial stable release of the K Fleet engineering harness.

### Added

- Ten portable Codex skills covering retrospective test coverage, guidance
  maintenance, technical design, feature implementation, bug fixing, TDD,
  investigation, behavior-preserving refactoring, independent verification, and
  evidence-based learning.
- A four-part theoretical foundation combining first-principles reasoning,
  workflow methodology, closed-loop control, and double-loop learning.
- Explicit routing, composition, authority, design-handoff, correction, and
  re-verification boundaries across the harness.
- Monolith and monorepo guidance maintenance with optional read-only specialist
  delegation while the parent retains integration and write authority.
- A dependency-free repository validator, machine-readable routing evals, a
  runnable Fleet Ledger fixture, independent artifact and variance evaluations,
  adversarial coverage, and a read-only real-monorepo pilot.

### Validated

- All ten skill directories pass frontmatter, naming, routing, link, unfinished
  marker, README, and eval-corpus validation.
- The Fleet Ledger forward suite passes all 15 tests.
- Project-local installation through `bunx skills` was accepted before release.
