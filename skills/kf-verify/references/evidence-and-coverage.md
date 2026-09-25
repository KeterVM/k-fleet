# Evidence and coverage

## Match the check to the claim

For each material obligation, choose evidence that could distinguish correct behavior
from a plausible failure: an existing test, targeted inspection, application
interaction, or runtime probe. Use the narrowest check that still exercises the
behavior at risk. A check of isolated logic cannot establish wiring, and a successful
build cannot establish that the requested feature is usable.

Use actual entry points and relevant dependency behavior when integration matters.
Keep expectations grounded in the contract rather than copying the implementation
or trusting an assertion merely because it passes. Check what was executed, which
outcome was asserted, and what was substituted, skipped, or outside the observation.
Several checks that share the same mistaken assumption do not resolve that gap.

Reuse results whose source version, configuration, dependencies, environment, and
tested scope still apply. A relevant environment difference limits a claim; it does
not automatically make all local evidence useless. Choose an additional check only
when it resolves a material gap, rather than rerunning everything for a fresh result.

## Inspect structural claims in the code

For affected components and boundaries, compare the accepted design and project
conventions with the delivered code, including relevant callers:

- Check whether a name communicates the concept or role actually supplied by the
  public operations. Trace ambiguous terminology to caller misunderstanding or
  conflicting representations; a disliked suffix alone is not a defect.
- Check whether paths follow an explainable local grouping and responsibility owner.
  Shared code should have a coherent contract, while private details stay with their
  owner. Do not require a preferred feature or layer hierarchy.
- Follow actual imports, exports, calls, and state access across the boundary. Look
  for forbidden dependency directions, cycles, duplicate rule ownership, or callers
  that reconstruct internal sequencing. Folder separation does not prevent these.
- Use a task-grounded change scenario to inspect where edits would be needed and why.
  Distinguish necessary interface propagation from unrelated knowledge or synchronized
  copies that make a change fragile. Check both oversized owners and excessive
  fragmentation; class, file, and line counts cannot decide either.

Report the location, violated contract or concrete maintenance consequence, and
supporting caller or dependency trace. Keep a reasoned change walkthrough distinct
from an executed result or measured maintenance cost. Reuse configured boundary checks
where useful; do not introduce a new structural test harness merely for this review.

## Cover the behavior and its consequences

Exercise normal use and relevant boundary or failure conditions, such as denied
access, invalid input, retries, partial completion, or changed state. Check observable
results and required effects, including effects that must not occur on failure.
Follow cooperating components far enough to establish the outcome, rather than
stopping at a successful response from an intermediate layer.

Select regressions through affected contracts, shared state, dependencies, and
callers, including unchanged code that can be affected by the change. Inspect for
material problems that successful runs can miss: unreachable paths, bypassed
invariants, resource lifetime errors, incompatible contracts, or unbounded work.
Evaluate duplicated responsibility or coordination through concrete consequences.
Do not apply every risk category mechanically or substitute line coverage for
evidence that the important behavior works.

When existing checks leave a credible behavioral gap, use a focused exploratory
probe with a stated question and observable outcome. Record enough setup and action
to make a discovered failure reproducible. Stop or change the probe when it answers
the question, its premise is disproved, or the necessary environment is unavailable;
keep the remaining limitation explicit.
