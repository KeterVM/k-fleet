---
name: kf-design-codebase
description: Choose how an understood change fits an existing codebase, resolving responsibilities, interfaces, and dependencies while keeping overall complexity proportional to current needs.
---

# Design codebase

## Runtime and authority

For substantive work, establish the canonical repository/worktree, applicable
project instructions, user scope, and stopping condition. Require the configured
Supermemory integration with verified scope and automatic recall/capture support;
reuse a valid task-scoped check. Direct integration is sufficient without optional
MCP transport. If unavailable or unscoped, stop and report the missing capability.

Current instructions and scoped sources override memory. Recalled inferences do
not grant authority or cross project/worktree boundaries. Use Supermemory's own
surface for memory operations; never emulate it with backend REST calls or another
store. Preserve read-only requests and existing authorization across methods.
Normal task execution does not rewrite live skills or policy. Instruction changes
require authorized, versioned, reversible source maintenance. Report actual
evidence without claiming unobserved capture or execution.

## Method

Choose the simplest design that delivers the intended behavior within the current
system. Understand the relevant behavior and constraints before deciding where
the change belongs. Reuse adequate design and evidence; a bounded edit within
sound boundaries does not need a new design exercise or a repository-wide survey.

Treat accepted system architecture, technology choices, and deployment boundaries
as inputs. Revisit an affected premise when evidence requires it, without silently
expanding internal code design into a system redesign. Leave coding style and
line-level implementation choices to implementation under the project contract.

## Fit the change to the system

Trace the relevant path from its actual entry points through rules, state, and
dependencies to the outcome. Identify what can already serve the change and what
must differ. Choose to extend, replace, or add a responsibility because of current
needs; do not turn each requested detail into another component by default.

Resolve uncertainties that could invalidate the design before investing in work
that depends on them. Prefer evidence that can change the decision; continue
independent authorized work when that evidence is unavailable, keeping dependent
assumptions explicit. Routine technical choices remain the agent's responsibility.

## Turn responsibilities into code boundaries

Identify the owner of each affected business rule and state transition. Define
supported entry points, inputs, results, and failure semantics; keep internal
state behind these contracts. Route groups and separate files alone do not
establish boundaries if callers still manipulate internals or duplicate rules.

Separate responsibilities when they have distinct rules, consumers, or reasons to
change. Keep related behavior together when splitting would scatter one invariant
or expose internals. Make dependency direction explicit and avoid cyclic ownership.

Keep transport parsing and response mapping from becoming the owner of unrelated
business rules. Place authorization, validation, and concurrency decisions where
the protected operation cannot bypass them. Identify resource and cleanup owners.

For operations spanning modules, identify the coordinator and transaction owner.
Distinguish effects that must commit or roll back together from effects allowed
to complete later. Extracting modules must preserve these guarantees rather than
giving each fragment an independent commit.

## Judge the overall cost

Start with the simplest structure that satisfies current behavior and invariants.
For each proposed layer, interface, package, or extension mechanism, identify the
present responsibility or constraint it serves and the indirection it adds.
Consider the burden on callers and maintainers as well as the local implementation.
Repeated decisions, synchronized copies of state, or required knowledge of internals
can mean a boundary has moved complexity rather than contained it. Check the reason;
adapters and separate implementations may still protect necessary boundaries.

Prefer a direct implementation when it preserves those boundaries with less
coordination. Future flexibility alone is insufficient justification. Do not impose
a layering template or collapse unrelated rules to reduce file or line counts.

Where a boundary is uncertain, challenge it with a plausible change grounded in
the task. Trace which responsibilities would change and why; repeated changes to
one rule or unrelated edits warrant reconsideration. This is a brief design probe,
not permission to build hypothetical features or evidence of reduced maintenance
cost by itself.

## Let placement reflect responsibility

When architecture or code organization needs a decision, distinguish the architecture
pattern (such as layered, clean, hexagonal, or vertical slice) from directory grouping
(by layer, feature, or domain). They can be combined; Controller / Service / Repository
is one option, not a required template.

Choose evidence according to the uncertainty: ask the user when their preference or
a material tradeoff would change the choice, or inspect the current working directory's
manifests, framework versions, configuration, and existing code. Where external guidance
would help, consult official documentation for the relevant framework version or inspect
maintained, widely used GitHub projects with comparable scope and stack. Check actual
code and constraints; popularity alone does not establish fit. Distinguish framework
requirements from recommendations and examples, and cite sources used for the decision.
These are conditional options, not a mandatory research sequence or approval gate.

Make the chosen architecture and directory organization explicit where affected, along
with responsibility boundaries, allowed dependency directions, and naming and placement
rules for new code. Explain how the choice fits the project; external examples do not
override user constraints or justify unrelated restructuring.

Keep related internals together and supported import boundaries clear. Give shared
code a concrete owner and purpose. Follow relevant layout, build, test, and framework
discovery conventions; account for affected imports, exports, and tooling when moving
code. Preserve sound existing layout and avoid unrelated reorganization.

Show relevant paths when placement changes and explain the responsibility they
express. A directory tree should make the design easier to find and understand;
it does not establish ownership or justify another layer on its own.

## Carry decisions into implementation

Stop designing when ownership, contracts, placement, and critical failure behavior
are clear enough to implement. Leave enough context to implement the chosen ownership,
interfaces, dependency direction, consistency guarantees, and material tradeoffs.
Use the conversation or an existing artifact unless a durable document is needed.
Identify observable checks for important contracts; do not prescribe every
function in advance.

Continue implementation when authorized, without a new approval gate. Respect
design-only requests. Revisit affected decisions when implementation evidence
invalidates them; record material tradeoffs without requiring a fixed report.
