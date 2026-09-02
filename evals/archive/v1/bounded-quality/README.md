# Bounded Quality Experiment

This experiment tests whether a bounded writing expert and independent read-only
quality roles improve implementation artifacts beyond the current K Fleet
workflows and a stronger single-agent quality contract.

The candidate under [`candidate/SKILL.md`](candidate/SKILL.md) is not an installed
or documented core skill. Its presence does not change the eleven-skill public
contract, the current harness corpus, or the source hashes recorded by existing
behavioral reports.

## Experiment arms

- **A — baseline:** the current primary K Fleet workflow owns the complete task.
- **B — quality contract:** the same owner receives explicit repository-evidence,
  structural-change, behavior-to-test, and fresh-verification requirements.
- **C — bounded execution:** the same quality contract is combined with the
  candidate method. One implementation expert is the only writer, may use one
  read-only repository scout and one read-only test-risk critic, and returns the
  artifact to a lineage-independent verifier.

Arm B separates gains from a better contract from gains caused by actor topology.
Do not promote the candidate when B improves on A but C does not improve on B.

## Isolation and blindness

For every run:

1. Build a temporary fixture from the pinned repository revision and apply only
   the scenario's seed patch.
2. Use `prepare` to stage one self-contained `.bq-task.md` inside the fixture.
   Give the executor filesystem access only to that fixture; the source K Fleet
   repository, sibling metadata/baseline, hidden checks, reports, prior results,
   and other arms must be outside its readable roots. Do not claim strict
   blindness when the runtime cannot enforce that boundary.
3. Freeze the final tree and diff hashes, execution trace, completion claim,
   actor lineage, writes, checks, and structural-evidence sidecar.
4. Inject hidden tests only after the artifact is frozen.
5. Give a fresh verifier the original prompt and frozen current artifact, not the
   implementer's rationale or self-review.
6. Randomize de-identified artifact pairs for blind maintainability judgment.

Discard and rerun a scenario when expected answers or another arm contaminate an
executor or judge. Never copy hidden tests into an executor workspace.

The runner detects baseline, scenario, protocol, hidden-test, and tooling drift,
but it cannot sandbox an executor process itself. Filesystem isolation is an
orchestrator responsibility; instructions asking an executor not to read an
available file are not a security boundary.

## Actor invariants

- One implementation slice has one writer.
- Repository scout, test-risk critic, and verifier make no writes.
- The verifier is outside the implementation expert's lineage and verifies the
  final frozen artifact.
- Red, Green, and Refactor for one slice remain with the same executor.
- Shared schemas, manifests, lockfiles, generated indexes, and public interfaces
  are serialized or exclusively leased.
- A worker's passing check never becomes the overall completion claim.

## Scoring order

Avoid a single weighted score that can reward a tiny but incorrect diff:

1. actor-safety and contamination gate;
2. hidden functional correctness and regression gate;
3. scope and structural-slop Pareto comparison;
4. blind maintainability preference;
5. efficiency comparison.

Only artifacts passing the first two gates enter the anti-slop comparison.

Mechanical observations include hidden pass rate, false completion claims,
unexpected files and lines, dependency and lockfile deltas, new production files,
directories, exports, classes, interfaces, configuration, generated artifacts,
test-only production changes, mutation-probe sensitivity, writer collisions,
lineage violations, stale-artifact verification, tokens, latency, and correction
rounds. Human judges assess whether repository evidence is credible and whether a
materially simpler complete design was available.

## Minimum evidence

Use feature, bug, refactor, and retrospective test-only scenarios. A pilot may use
three fresh runs per arm and scenario, but promotion requires at least five plus
an isolated reproduction in a non-Fleet-Ledger project of realistic size.

The experiment supports these decisions:

- **B beats A; C does not beat B:** strengthen existing workflows only.
- **C repeatedly beats B:** consider promoting the candidate as a composable
  method with a narrow entry gate.
- **C helps only selected high-risk cases:** retain it as an optional method, not a
  default execution topology.

## Promotion gate

Before changing the public skill set:

- existing routing, authority, composition, and stopping evidence has no
  regression;
- scope escape, writer collision, read-only actor writes, lineage violations,
  stale verification, and hidden-expectation contamination are all zero;
- hidden correctness for C is not worse than B, and B is not worse than A;
- B reduces structural slop in at least three of four scenario families;
- C improves hidden correctness, blind maintainability, or correction rounds over
  B in at least three of four families;
- unnecessary dependencies, exports, production files, and unrelated changes do
  not worsen in any family;
- the routine negative control does not create an agent tree; and
- any material token or latency increase buys a demonstrated artifact-quality
  improvement rather than more narration.

If a gate fails, keep the eleven-skill public contract and retain only the
evidence-supported quality-contract improvements.
