---
name: kf-release-product
description: Prepare or execute delivery of a product version to its intended environment or distribution channel, including migration, recovery, and release checks.
---

# Release product

Deliver a known version to the intended users or environment with observable
outcomes and a viable response to failure. Use for release preparation or an
authorized release; routine code verification alone does not require this method.
Adapt to the product's distribution model, including services, apps, and packages.

## Select supporting guidance

- For artifact identity, environment prerequisites, compatibility, or data changes,
  read [Readiness and migration](references/readiness-and-migration.md).
- For rollout, distribution, recovery decisions, and completion evidence, read
  [Rollout and recovery](references/rollout-and-recovery.md).

## Scope and authority

Establish the target project, environment or registry, artifact, audience, and
authorized actions from the request and current sources. Access to deployment tools
does not establish permission. Preparation-only tasks end with reviewable materials;
they do not imply a production deployment, package publication, or external message.

Reuse explicit authorization and established project release policy. Do not ask again
at routine steps already covered by that authority. If a consequential action lacks
authority or its target is ambiguous, complete independent preparation and make the
exact proposed action reviewable before requesting the missing decision. Never treat
a successful staging deployment as authorization for production.

Use available project release tooling and current provider documentation; do not
invent commands, credentials, destinations, or rollback guarantees. Keep secrets
out of artifacts and reports. Unavailable access blocks only dependent actions.
Skill selection does not itself change permissions or authorize installing tools.

## Establish and deliver the release

Identify the exact build or version and the evidence that applies to it. Reuse
sufficient verification results; changed artifacts or environment-sensitive
obligations may need focused checks. `kf-verify` assesses behavior against the
request; this method owns delivery and release-state evidence.

Confirm prerequisites that could invalidate delivery: configuration, dependencies,
permissions, capacity, supported consumers, and relevant data compatibility. Use
the actual release contract rather than a universal launch checklist. Resolve
missing facts and material user choices before dependent mutations.

Choose a rollout or distribution method proportionate to the affected users and
reversibility. Define success, failure, and pause or recovery conditions using
existing service obligations and baseline behavior. Identify who can act on those
signals and which recovery actions are feasible and authorized.

When releasing, use the approved artifact and target, observe the actual result,
and perform the checks that distinguish an available working version from an
accepted deployment job or published file. A stopped command may leave remote work
running; inspect remote state before retrying or initiating conflicting actions.

## Establish the final state

Report the released artifact, destination, rollout or distribution state, relevant
observations, and unresolved limits. Provide release notes, compatibility or upgrade
instructions, and user guidance when needed for recipients to use the change.
Preparation, upload, publication, deployment, and verified availability are distinct
states; claim only those observed.

Stop expansion when failure conditions are met or results cannot be interpreted.
Recover within existing authority and recheck the user-visible state. Report partial
delivery or pending propagation with the affected audience and next action. Do not
claim success from a command exit code alone or promise unattended monitoring without
an authorized mechanism and owner. For continuing service operation, carry the
release context into `kf-operate-product` when needed.
