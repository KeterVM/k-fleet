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
