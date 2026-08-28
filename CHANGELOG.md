# Changelog

Notable changes to K Fleet are recorded here.

## Unreleased

## [1.4.0] - 2026-08-29

### Changed

- Tightened investigation and retrospective-coverage authority so diagnosis and
  test-only work cannot silently start product correction.
- Clarified design-first combined requests, current-task feedback, durable-learning
  signals, and the boundary between execution validation and independent
  verification.
- Kept TDD as a composable method while feature and bug workflows retain production
  design, compatibility, and final closeout ownership.
- Added explicit completion contracts to feature, bug, and refactor workflows, and
  deterministic non-Context persistence ownership with Learning re-entry.
- Split repository structure validation from eval-corpus lint and introduced a
  versioned anonymous two-stage evaluation protocol with frozen raw observations,
  an independent post-hoc judge, repeat coverage for high-risk cases, and source,
  tooling, corpus, blind-input, raw-observation, and result hashes.
- Corrected Fleet Ledger maintenance thresholds so canonical decimal equality is
  preserved without epsilon ambiguity, while non-representable and overflowing
  plans fail explicitly.

### Validated

- Fifty-one anonymous routing and closure cases produced 59 observations, including
  repeated high-risk cases, and passed deterministic scoring by a separate judge.
- Isolated execution tests exercised feature, bug, verification-only, specialist
  delegation, and Learning-to-Context-to-Learning workflows with hidden assertions
  and mutation checks.
- Three read-only specialists independently reviewed the final maintenance fix;
  the 11-skill structure, evaluation metadata, and all 22 Fleet Ledger tests pass.

## [1.3.0] - 2026-08-25

### Changed

- Separated durable learning decisions from Context persistence:
  `kf-learn-from-evidence` now produces an authorization-gated persistence contract,
  while `kf-maintain-context` is the sole Context writer and verifies effective
  discovery after the change.
- Replaced `kf-maintain-guidance` with `kf-maintain-context`, expanding maintenance
  from cleanup of existing guidance to authorized context initialization, exact
  Codex instruction-chain discovery, precedence and byte-limit checks, routed
  documentation review, and representative-directory runtime verification.
- Added explicit investigation-to-correction-to-verification handoff coverage,
  restored bounded read-only delegation rules, and separated verified context facts
  from newly learned behavioral policy.
- Corrected project instruction discovery for empty higher-precedence files and
  clarified that `project_doc_max_bytes` applies to the combined project chain.

### Validated

- Independent blind evaluators passed direct-policy, proposal-only, authorized
  Learning-to-Context, unavailable-peer, verification-independence, and full
  design-to-Context closure paths after ambiguity-driven reruns.

## [1.2.0] - 2026-08-22

### Changed

- `kf-maintain-guidance` now covers periodic and unattended audits, contradictory
  effective rules, generated and cache exclusions, and sensitive or transient
  content in always-loaded guidance.
- `kf-verify-change` now provides a defect-first diff review profile with P0-P3
  severity calibration, inline finding guidance, merge readiness, and explicit
  correction ownership.
- Repository guidance now requires independent read-only forward tests on isolated
  realistic fixtures for new or materially changed skills.

### Validated

- Independent forward evaluators exercised audit-only guidance maintenance, a
  finding-free ready review, and an authorization-bypass P1/not-ready review.
- Fixture hashes and repository status confirmed that evaluators made no writes;
  a contaminated scenario was discarded and rerun in isolation.

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
