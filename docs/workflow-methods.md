# Workflow method composition

K Fleet's method skills are complementary capabilities, not a mandatory
sequence. Select only what the task needs; each method remains usable on its own.
This maintainer note explains the installed selection contract;
root reminders are written by the user-triggered `kf-setup`. Setup is not a task
phase and is never invoked automatically. Installation only prompts the user to
run it once; a later explicit setup request can refresh the same managed block.

| Need | Capability | Result to carry forward |
| --- | --- | --- |
| Uncertain product problem, audience, or value | `kf-discover-product` | Supported opportunity, evidence limits, and the next product decision |
| Material uncertainty about intended behavior | `kf-define-requirements` | Scope, observable acceptance criteria, unresolved assumptions |
| Unsettled user journey, interaction, or presentation | `kf-design-experience` | Usable flows, content, states, and design evidence or untested assumptions |
| Unresolved design or requested assessment of structure and ecosystem reuse | `kf-design-codebase` | A justified design with clear contracts, ownership, placement, and reuse choices |
| An understood code change | `kf-implement` | Complete integrated behavior, warranted design corrections, and relevant checks |
| Missing automated protection | `kf-write-tests` | Discriminating tests and their actual execution results |
| Verify delivery or review scoped code and ecosystem reuse | `kf-verify` | Verified behavior, defects, supported engineering improvements, and explicit evidence gaps |
| Prepare or deliver a version to its users or environment | `kf-release-product` | Artifact and destination identity, migration and recovery conditions, observed release state |
| Operational readiness, live reliability problems, or incidents | `kf-operate-product` | Service evidence, operational changes or verified recovery, remaining impact and ownership |
| Uncertain user or business benefit from a product or change | `kf-evaluate-product` | Supported outcome assessment, measurement limits, and an evidence-based next action |
| Requested skill assessment or improvement, or a reusable capability gap exposed by work | `kf-evolve-skills` | Evidence-backed assessment; for authorized changes, actual-use observations or an explicit unproven status |

Reuse sufficient inputs and evidence rather than recreating them at every step.
A small understood fix can proceed directly to implementation and focused
verification. Test-first work can write a failing behavior test before code exists.
A verification-only request does not authorize product-code correction. Respect
analysis-only requests even when a later capability could continue the work.

Missing intent can surface in any method, including a small fix or refactor. When
plausible interpretations change the target, scope, behavior, data meaning, or
compatibility obligations, resolve the difference from established decisions or ask
the user before dependent edits. Stating an assumption and proceeding does not resolve
it. Continue independent work while waiting, then resume authorized delivery without
another approval gate. Routine implementation choices within settled goals remain
the agent's responsibility.

Understood behavior does not imply settled code organization. Implementation owns
local choices about responsibility, interfaces, representation, names, and paths,
including when no design method was selected. Design resolves consequential ownership
or contract decisions and carries their rationale forward. Verification checks the
resulting names, placement, and actual dependencies when those components or boundaries
change. These are complementary responsibilities, not a mandatory three-stage route.

Return to the affected decision when evidence changes it: a verification failure
may require an implementation fix, a revised module contract, or clarification of
intended behavior. Revisit only what the new evidence invalidates, then verify the
correction and affected behavior. Do not restart every capability or add routine
approval gates between them.

Overlap is intentional: implementation owns its self-checks, test writing owns the
quality of automated checks, and verification assesses delivery against the goal.
They can share applicable test results without treating the implementer's report
as the sole source of truth. User corrections and implementation friction can
expose a decision to revisit before
verification; investigate the cause and keep corrections within the task's scope.

Capability improvement closes a separate feedback loop: observed gap, diagnosis,
existing-skill inspection, discovery or creation, actual use, and retention or
correction. It can help the current task or a later authorized task; it is not a
mandatory final phase. Missing tools, access, or product decisions should be
resolved at their own source. Search or installation success alone does not prove
that the new guidance improves the work.

## Ecosystem reuse across methods

Default to suitable mainstream, maintained libraries and frameworks for general-purpose
capabilities. This applies to new implementation and assessment of existing custom
mechanisms, even when they work without reported problems. Retaining or adding custom
mechanisms needs a concrete unmet requirement, constraint, or disproportionate adoption
cost. This is the user's chosen engineering policy, not a claim that popularity proves
suitability or that every existing framework must be replaced.

Codebase design owns consequential selection and requested assessment; implementation
owns local selection and integration even when no separate design method is used.
Test writing applies the same principle to general-purpose testing infrastructure.
Verification and the optional read-only reviewer independently check for overlooked
reuse opportunities and actual integration. Each must work without requiring another
skill's files or a separate agent. Reuse current selection evidence across methods;
changed requirements, versions, environments, or unsupported premises warrant focused
research, not a mandatory repeat survey. Resolve routine technical choices directly;
ask only for missing material intent, commitments, compatibility obligations, or authority.

Separate confirmed defects, supported improvement findings, and unverified leads.
An improvement needs a concrete custom mechanism, a suitable sourced alternative,
responsibilities it removes, expected benefits, and material adoption costs; it does
not need an observed failure. Its presence alone does not declare delivery blocked.
An explicit project-rule violation is assessed against that obligation. The scope
comes from the request: a diff, module, or repository assessment. Read-only findings
do not authorize corrections or unrelated framework migrations.

Discovery and requirements establish needs and constraints; experience design owns
user interactions. Release checks delivery of the chosen artifact; operation can
surface new evidence for a design decision. Product evaluation assesses outcomes,
not dependency popularity. Skill evolution improves the method and setup supplies
concise selection reminders; neither owns routine software library research.

The boundary separates this explicit user preference from review evidence. Google's
[code review guidance](https://google.github.io/eng-practices/review/reviewer/looking-for.html),
checked 2026-09-26, supports reviewing design and unnecessary complexity beyond runtime
defects; it does not establish a universal preference for third-party dependencies.
These instructions have been inspected for consistency, not behaviorally validated.
In actual use, observe whether reviews find supported reuse opportunities without
duplicate research, unsupported findings, or scope expansion.

## Product lifecycle boundaries

Discovery investigates whether a problem is worth addressing; requirements make
the agreed behavior explicit. Discovery is unnecessary when sufficient evidence
and intent already support a bounded task. Experience design resolves how users
complete the task; codebase design resolves code responsibilities and contracts.
They can inform each other without requiring a design document or separate agent.

Verification assesses whether behavior satisfies the contract. Release establishes
that a known artifact reached its intended environment or distribution channel and
checks the resulting state. Operation addresses continuing service health and
recovery. Product evaluation asks whether the delivered behavior produces the
intended benefit; it can lead back to discovery, requirements, design, code, or
operation. It does not assess or revise skill instructions, which remains the
separate responsibility of `kf-evolve-skills`.

The methods share applicable evidence and existing authorization. Preparing a
release does not grant production authority; running an outcome assessment does
not grant permission for tracking, experiments, user contact, or changing goals.
Complete independent preparation before requesting a missing consequential decision.
Do not insert a new approval gate when the action is already authorized. Missing
tools or live data constrain claims and dependent actions, not unrelated progress.

Security, accessibility, performance, and data protection remain relevant obligations
across methods, selected by actual product needs. Specialist skills may supply
deeper methods or platform operations; no provider or installed specialist is a
required dependency of the public catalog. Commercial positioning and acquisition
are not additional public methods in this expansion.

## Catalog expansion decision — 2026-09-25

The user approved expanding product lifecycle coverage after reviewing the
gap between engineering change delivery and a complete product lifecycle. Add
product discovery, experience design, release, operation, and product evaluation
because they have distinct decisions, evidence, and completion conditions. Keep
the existing methods and setup behavior; do not turn lifecycle coverage into
a mandatory itinerary. Update the CLI's explicit install
list and setup reminders together with the public catalog.

The assessment used current repository instructions and these primary sources,
checked on 2026-09-25:

- [Design Council, Double Diamond](https://www.designcouncil.org.uk/our-resources/the-double-diamond/):
  distinguishes investigating the problem, defining it, developing alternatives,
  and testing solutions. Supports separate discovery and experience decisions;
  does not prove an agent's research is valid.
- [Google SRE, Canarying Releases](https://sre.google/workbook/canarying-releases/):
  explains exposure and evaluation of changes under real workload. Supports release
  evidence beyond pre-release tests; canary infrastructure is not required for all
  products or distribution channels.
- [GOV.UK, How the live phase works](https://www.gov.uk/service-manual/phases/live):
  describes sustainable operation, continuing user research, and useful performance
  measures. Supports ongoing operation and product feedback; government service
  procedures are not universal requirements for K Fleet users.

These sources support method boundaries, not improved agent performance. The new
instructions have not yet been assessed on actual product delivery. Observe whether
their use improves consequential decisions about user needs, task completion,
release recovery, service health, and product benefit. Revise or combine methods if
actual use shows duplicated work, ineffective selection, or unjustified stops.

## Optional memory

Engineering methods use the current task and repository evidence independently of
external memory. Users or projects choose whether to add Supermemory, a graph-based
integration, another backend, or none. Memory can carry context and experience across
tasks; its absence does not prevent current-task feedback or authorized skill revision.

Public skills and managed reminders contain engineering guidance and general source,
scope, and authority rules. Memory-provider setup, checks, and operations remain
outside those instructions.
