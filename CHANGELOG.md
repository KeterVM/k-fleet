# Changelog

Notable changes to K Fleet are recorded here.

## Unreleased

### Changed

- Added a risk-driven TDD decision gate: explicit requests remain strong signals and
  repository requirements remain binding, while K Fleet may also select TDD when a
  stable public seam gives valuable early feedback for clear, materially risky
  behavior. New tests must still protect meaningful behavior or credible regression
  risk instead of freezing unconditional presentation, pass-through field wiring,
  incidental markup, or implementation history.
- Added paired source-bound blind observations for proactive high-risk TDD and a
  skipped low-value UI test, and separated their current hash validation from the
  preserved historical v2 release smoke bindings.
- Clarified that a connected, correctly scoped direct Supermemory integration
  satisfies the runtime gate without requiring its optional MCP transport.

## [2.0.0] - 2026-09-02

### Changed

- Replaced the eleven-skill public workflow catalog and separate feedback reporter
  with one `kf-orchestrate-work` entry point and conditional route references.
- Moved context maintenance, delegation, feedback, and evidence-driven learning
  behind the orchestrator instead of keeping them as separately selected skills.
- Selected Supermemory as the required scoped context and experience backend and
  SkillOpt-Sleep as the offline, validation-gated evolution engine.
- Assigned the complete memory lifecycle to the Supermemory integration. K Fleet
  consumes scoped recall and emits terminal evidence for automatic capture; it no
  longer requires named fallback memory skills or implements direct REST behavior.
- Reduced installation guidance in target repositories to a compact bootstrap while
  retaining this source repository's complete maintainer `AGENTS.md` contract.
- Documented repository-scoped installation of the SkillOpt-Sleep Codex skill from
  a source checkout, keeping it separate from K Fleet's single public entry point
  and disabling SkillOpt's separate memory/`CLAUDE.md` evolution path.
- Removed the Context auditor companion and kept one optional read-only reviewer
  that returns evidence to the orchestrator.
- Archived the former routing corpora, result sets, reports, and evaluation tooling
  as v1 historical evidence; none of their scores carry over to the cutover.

### Added

- Added `/kf-orchestrate-work setup`, an explicit pre-memory bootstrap route that
  idempotently initializes one managed K Fleet block in a target repository's root
  `AGENTS.md`, preserves existing guidance, and reports runtime readiness without
  implicitly installing or globally configuring Supermemory.
- Added current orchestration contracts for memory classes, context authority,
  project/worktree isolation, source-over-memory conflicts, inference review,
  SkillOpt adoption gates, automatic adoption boundaries, and rollback.
- Added a new orchestration corpus and deterministic lint covering routes, TDD,
  delegation, phase handoffs, runtime failure, memory isolation, terminal episodes,
  feedback, and evolution gates.
- Added deterministic verification that the Fleet Ledger lock hash matches the
  exact current orchestrator skill contents.
- Added four isolated Codex forward observations for release-critical setup,
  Supermemory ownership, and SkillOpt gate boundaries, plus source/corpus hash
  validation that prevents stale evidence from being presented as current.

## [1.5.0] - 2026-09-01

### Added

- Added optional read-only `kf_reviewer` and `kf_context_auditor` companion
  agents, with mirrored Fleet Ledger configurations and no pinned model.
- Added purpose-routed references for delegation capability and contracts, diff
  review and readiness evidence, and Context discovery, audit, verification, and
  persistence.
- Added `kf-report-skill-usage`, a portable post-work reporter that exports
  sanitized, agent-oriented K Fleet usage evidence for maintainers without joining
  the task workflow closure or modifying either project.
- Added a serialization-neutral feedback packet contract and separate
  machine-readable trigger and output-boundary cases.
- Added a separate 24-case naturalistic robustness corpus with balanced feature,
  bug, and refactor coverage, English and Chinese prompts, terse and messy request
  styles, and natural TDD composition cases.
- Added an unpromoted compact catalog-description candidate, isolated fixture
  materializer, blind-input preparation, deterministic lint, and a cross-model
  ablation protocol that preserves current source-hashed evidence until rerun.
- Added Essential, Methods, Governance, and Feedback installation profiles so
  projects can limit catalog and workflow overhead without changing skill behavior.
- Added a frozen 18-run, 240-observation cross-model robustness matrix with 240
  independent post-hoc judgments, anonymous fixture bindings, observation-bound
  judge inputs, transitive tooling hashes, deterministic scoring, and a generated
  source-hashed report. The compact catalog candidate improved aggregate selection,
  stopping, invariants, and complete-contract results but remains unpromoted because
  repeated high-risk contract failures and model-specific regressions still violate
  the promotion gate.

### Changed

- Reduced the always-loaded entry points for delegation, verification, and Context
  maintenance while preserving their routing, authority, write ownership, stopping,
  and re-entry contracts.
- Bound behavioral source hashes to complete core skill directories and canonical
  companion-agent contracts, and added explicit named-agent blind cases.
- Hardened companion-agent validation against duplicate or unsupported TOML fields
  and stale extra fixture agents.
- Documented the observed version difference in empty-candidate Context discovery,
  required isolated verification for that branch, and removed an unverified
  personal-versus-project agent precedence claim.
- Clarified blind sequence observations so composed method phases remain visible
  without inventing blocked returns or standalone verification, and made
  persistent-index leakage invalidate the complete evaluator run.
- Bound every robustness stopping judgment to an explicit per-case
  `expected.mustStopWhen` contract frozen into the judge input.
- Documented direct project-scoped and personal installation of the optional
  companion-agent TOML files alongside skills installed through `bunx skills`.
- Kept the eleven core workflow skills and their source-hashed behavioral evidence
  distinct from the new feedback-reporting boundary.
- Hardened feedback provenance so hashes are compared only when their algorithm
  and material scope match, and added a final envelope self-check that rejects
  markerless JSON or YAML as an incomplete portable packet.
- Replaced the specialist-only delegation method with `kf-delegate-subtask`, which
  treats reviewer, verifier, reasoner, explorer, worker, and specialist as distinct
  roles, selects model capability by difficulty, and enforces exclusive write
  ownership plus fresh post-integration review for non-trivial delegated changes.
- Added proportional delegation gates to design, implementation, bug fixing,
  investigation, refactoring, test coverage, TDD, Context maintenance, and
  verification while keeping routine local work with the primary workflow.
- Clarified that an existing-contract violation remains bug-owned during durable
  persistence, that unavailable TDD Red evidence returns control to the owning
  feature or bug workflow, and that multi-stage evals name their first substantive
  workflow as primary.

### Validated

- A fresh independent isolated evaluator passed seven reporting scenarios,
  including inline and file output, ordinary and ongoing-task non-triggers,
  unknown provenance, opaque lock-hash domains, sanitization, and JSON/YAML
  envelope boundaries, without modifying the K Fleet worktree.
- Two fresh strong-model blind evaluators produced 68 read-only observations over
  56 routing cases, including strong reviewer, efficient worker, and
  read-parallel/write-serial delegation. A separate high-reasoning judge passed
  all 187 hidden invariants without repository mutation.

## [1.4.1] - 2026-08-29

### Added

- Added an isolated three-arm bounded-quality experiment comparing the current
  workflow, a stronger single-owner quality contract, and an experimental
  sole-writing expert supported by read-only evidence and independent verification.
- Added four artifact scenarios, hidden behavioral checks, eight quality-routing
  cases, a sanitized executor bundle, and a protocol-v2 experiment runner.

### Changed

- Kept the eleven-skill public contract unchanged after the first non-promotional
  smoke run showed that agent topology should be selected by concrete risk rather
  than task size or agent count.
- Tightened the candidate entry gate so direct local fixes, mechanical helper
  reuse, existing mutation-sensitive coverage, and other routine work stay with
  the primary workflow.
- Hardened experiment scoring against fixture leakage, baseline and arm drift,
  hidden-test mutation, stale protocol identities, duplicate runs, result
  tampering, and whole-file structural-signal false positives.

### Validated

- All feature, bug, refactor, and test-only smoke arms passed their hidden checks
  with no unexpected file changes; the report classifies them as instruction-blind
  observations rather than formal promotion evidence.
- The candidate skill, 11-skill repository structure, 51-case existing eval
  corpus, protocol-v2 harness, and all 22 Fleet Ledger tests pass validation.
- An independent final review found no remaining actionable harness or evidence
  issues.

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
