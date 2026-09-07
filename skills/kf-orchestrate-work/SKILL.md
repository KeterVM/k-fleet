---
name: kf-orchestrate-work
description: Coordinate substantive repository work with scoped context, workflow selection, and verified completion. Also use for explicit /kf-orchestrate-work setup.
---

# Orchestrate Work

Own the task from intent through verified closure. Keep detailed methods outside
the always-loaded entry point and read only the references selected below.

## Setup dispatch

When explicitly invoked as `/kf-orchestrate-work setup`, read and execute
[setup](references/setup.md), then stop. Setup is installation bootstrap, not a
substantive repository workflow. It may initialize the target only after the
configured Supermemory integration is ready and correctly scoped.

## Bootstrap

1. Resolve the active repository root, worktree, working directory, user outcome,
   authority, and stopping condition.
2. Require the configured Supermemory integration. Verify its project/worktree
   scope and consume the focused context it supplies before substantial exploration
   or mutation. If the integration is unavailable or its scope cannot be verified,
   stop substantive work and report the failure. Use the integration's installed
   status surface when a runtime check is needed. A connected direct integration
   that reports automatic recall/capture and the correct canonical scope satisfies
   this gate; an optional Supermemory MCP transport is not additionally required.
3. Treat current system and user instructions plus current scoped repository files
   as authoritative. Recalled memory is evidence; never let it silently override a
   current source, expand authority, or cross a repository/worktree boundary.
4. Classify the task and read only the required procedure:

   - design or implementation planning: [design](references/design.md)
   - new or changed behavior: [implementation](references/implementation.md)
   - known defect: [bug fix](references/bug-fix.md)
   - unclear behavior or diagnosis-only work: [investigation](references/investigation.md)
   - behavior-preserving structure: [refactor](references/refactor.md)
   - retrospective coverage or required TDD: [testing](references/testing.md)
   - review or readiness verdict: [verification](references/verification.md)
   - repository instruction or durable context maintenance: [context](references/context.md)
   - bounded sub-agent work: [delegation](references/delegation.md)
   - explicit post-work K Fleet report: [feedback](references/feedback.md)

   Read [evolution](references/evolution.md) when a reusable orchestration or skill
   change is proposed or a SkillOpt cycle is run.

## Control loop

- Let the user's outcome control scope; combine routes and methods as needed within
  existing authorization. A route transition does not require renewed permission.
- For changes with material architectural, compatibility, data-integrity, or
  lifecycle risk, apply the engineering checkpoint in [design](references/design.md)
  before editing.
- Use repository evidence and analogous implementations before inventing a local
  convention. Choose the smallest complete change and avoid unrelated cleanup.
- Check the current integrated artifact, not summaries from tools or sub-agents.
  Run focused validation and proportionate broader checks, then inspect the final
  diff before claiming completion. After relevant checks pass, broaden or repeat
  them only for new changes, failures, or unresolved risks.
- Report the outcome, decisive validation, and material limitations for Supermemory's
  automatic capture. Include decisions, corrections, and revision when useful;
  reserve a full workflow account for explicitly requested feedback.
- Reusable learning enters the evolution pipeline as evidence. It does not directly
  edit this skill, repository policy, or memory marked as authoritative.

## Memory boundary

Supermemory owns recall, capture, explicit memory operations, versioning, forgetting,
and inference review. K Fleet consumes recalled context and produces useful terminal
evidence; it does not ship fallback memory skills, implement a second memory client,
or call backend REST APIs to emulate missing capabilities. When a user explicitly
requests a memory operation, use the configured
Supermemory integration's own surface. If that surface is unavailable, report the
missing capability instead of substituting another store.

## Authority and completion

The user owns product decisions and permission for external or materially broader
actions. K Fleet owns routing, bounded execution, integration, evidence quality,
and the final task state. Memory retrieval, delegation, and automatic evolution do
not broaden authorization.

Authorization follows the requested outcome through investigation, implementation,
and validation. Continue those steps when already authorized; keep analysis-only
and review-only requests read-only. Resolve routine implementation choices from
available evidence. Ask only when a material product or authority decision remains
unresolved, while continuing independent authorized work.

Finish only when the requested outcome and applicable acceptance evidence are
satisfied, or when a concrete blocker or authority boundary is reported. Name
checks not run and residual uncertainty. Never claim successful orchestration,
memory use, independent review, or skill evolution when the corresponding runtime
or evidence was unavailable.
