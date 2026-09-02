---
name: kf-bounded-quality-execution
description: Delegate one already-scoped, non-trivial implementation slice to a sole writing expert, supported by a read-only repository scout and test-risk critic, when actor separation would materially improve artifact quality and isolated write authority is available. Compose with the applicable feature, bug, refactor, or test-coverage workflow; do not use for routine edits, design or investigation, read-only specialist evidence, verification-only work, or multi-writer parallelism.
---

# Bounded Quality Execution

Improve an already-scoped implementation by giving one expert end-to-end
ownership of a complete vertical slice, then obtaining fresh independent
verification. The primary workflow retains the requested outcome, scope,
compatibility, authorization, integration decision, and completion claim. This
method owns only the bounded actor topology, write lease, evidence handoffs, and
stopping rules.

This is an evaluation candidate, not an installed K Fleet skill. Do not treat its
presence under `evals/` as authority to invoke it in ordinary repository work.

## Entry gate

Before spawning any actor, the primary workflow performs a cheap local preflight:
read the target seam and nearest behavioral tests, and run the smallest existing
check when the request may already be satisfied. If an exact regression test
already exists, a root-cause correction is mechanically local, or the requested
coverage already kills the relevant mutation, keep the work in the primary
workflow or stop with evidence. Do not delegate merely to confirm a no-op.

Use only when all of the following are true:

- the primary workflow is `kf-implement-feature`, `kf-fix-bug`,
  `kf-refactor-code`, or `kf-add-test-coverage`;
- the slice has an observable target, acceptance source, compatibility boundary,
  allowed scope, and meaningful checks stable enough to delegate without asking
  the expert to invent product or architecture decisions;
- repository-pattern research and adversarial review are likely to improve the
  artifact materially beyond their coordination cost;
- one expert can own every authorized production and test write for the complete
  slice without overlapping another writer; and
- a read-only repository scout, read-only test-risk critic, and verifier outside
  the expert's lineage are available.

That expected improvement needs a concrete risk signal, such as a change crossing
multiple behavioral boundaries, weak or contradictory precedent, state or
compatibility interactions, an untested failure mode, or a realistic choice among
several structurally different implementations. A clear one-line correction with
an existing regression, byte-equivalent helper reuse under a green baseline, an
already mutation-sensitive test, or another direct local edit does not qualify.

Do not enter merely because work is large, slow, difficult, unfamiliar, or could
be parallelized. Keep routine local edits in the primary workflow. Use
`kf-delegate-subtask` for bounded read-only domain evidence,
`kf-design-change` for unresolved structure, `kf-investigate-issue` for an
unclear cause, and `kf-verify-change` for an existing artifact that only needs
assessment.

For a bug, establish a root cause or a correction hypothesis narrow enough to
test safely before granting the write lease. For a refactor, establish the
behavior baseline and structural boundary first. For test coverage, preserve the
primary workflow's test-only authority. If an entry fact is missing, return to the
primary workflow instead of asking the expert to fill a scope or authorization
gap.

## Expert contract and write lease

Give one implementation expert a compact contract containing:

- the primary workflow, observable target, acceptance source, and behavior-to-
  check mapping;
- allowed paths and surfaces, explicit exclusions, and compatibility constraints;
- verified repository facts, accepted design decisions, assumptions, and
  unknowns that require revalidation;
- the base revision or artifact identity when concurrent drift is possible;
- sole-writer authority, including whether production, tests, documentation,
  configuration, schemas, dependencies, public APIs, generated files, or external
  systems may change;
- the structural-change gate: every new abstraction, dependency, public surface,
  schema, directory, or generated artifact requires current product or design
  evidence or repeated repository precedent;
- required focused and broader checks, known baseline failures, unavailable
  environments, stop conditions, and return fields.

The expert is the only writer for the delegated slice. The main and workers do
not edit it concurrently. Shared schemas, lockfiles, manifests, generated
indexes, and public interfaces require exclusive ownership or serialized work;
if that cannot be guaranteed, do not delegate. Authority never expands beyond the
original request and applicable repository guidance.

## Quality passes

Before editing, the expert asks one read-only repository scout for:

- effective guidance;
- one to three analogous implementations or an explicit no-match result;
- reusable extension points, local naming, and domain vocabulary;
- actual test, type, lint, and build commands; and
- contradictory examples, hazardous paths, and uncertainty.

The scout reports evidence, not a design verdict, and makes no edits.

The expert then owns the complete vertical slice: authorized production behavior,
its behavioral tests, integration across required layers, targeted checks, and
complete-diff inspection. Do not split Red, Green, and Refactor, or production
and its behavioral test, across writers. Prefer existing extension points and the
smallest coherent change. Remove test-shaped or speculative structure.

After an implementation and its focused checks exist, ask one fresh read-only
test-risk critic to inspect the original contract, current artifact or diff, and
affected execution paths before reading the expert's rationale. The critic
reports only evidence-backed omissions:

- missing observable behavior or failure paths;
- compatibility or state-transition risk;
- tautological or implementation-coupled tests;
- unjustified structure, dependencies, or public surface;
- unrelated changes; and
- a materially simpler complete alternative when one exists.

The critic does not edit, decide product scope, or emit generic style preferences.
The expert resolves supported findings within the existing contract, reruns
affected checks, inspects the final diff, and returns. Stop when a finding requires
broader authority, a material design choice, or a different primary workflow.

## Independent verification and return

After the write lease ends, the main starts a read-only verifier outside the
expert's lineage. Apply `kf-verify-change` to the original target and current
integrated artifact, not the expert's summary. Assess spec compliance and
repository code quality separately, run fresh proportionate checks, and return
`ready`, `not ready`, or `indeterminate`. The verifier never repairs findings.

A supported finding returns through the main to the owning primary workflow. The
same writing expert may receive one bounded correction pass under the unchanged
contract, followed by fresh independent verification. Stop instead when the same
failure repeats without new evidence, scope or authority must expand, repository
drift invalidates the contract, actor independence is unavailable, or exclusive
write ownership cannot be maintained.

The expert return contains:

- observable outcome and acceptance mapping;
- files and boundaries changed, plus extension points reused;
- scout evidence applied, no-match results, assumptions, and unknowns;
- tests added or changed and the behavior each proves;
- commands and results, baseline or unrun checks, and residual risk;
- critic findings and their disposition;
- evidence for every material abstraction, dependency, public surface, schema,
  directory, or generated artifact added;
- unrelated changes, complete-diff inspection, and current artifact identity.

The main's completion claim additionally includes the independent verifier verdict
and fresh evidence. Worker success, expert self-review, or a passing exit code
alone is not a readiness verdict.

## Constraints

- Use exactly one delegated writer. Scout, critic, and verifier are read-only.
- Version one workers are only repository scout and test-risk critic. Domain or
  security evidence remains `kf-delegate-subtask` when independently justified.
- Do not create agent trees by file, architectural layer, or test and
  implementation phase.
- Do not treat persona labels as evidence of expertise.
- Do not add dependencies, generated coordination artifacts, or repository
  tooling merely to operate this method.
- Judge quality from the resulting artifact and fresh evidence, not agent count,
  tokens, reviews, or prose.
