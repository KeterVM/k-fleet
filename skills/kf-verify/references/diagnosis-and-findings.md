# Diagnosis and findings

## Separate observation from explanation

Preserve the failing input, relevant state, actual result, and version before
changing conditions. Establish the expected result from the contract. Distinguish
a product failure from a test expectation error, setup problem, unavailable
dependency, or unsupported environment before assigning a cause.

A setup or dependency failure can itself violate the delivery contract. Check
supported prerequisites and promised installation behavior before dismissing it
as an environmental limitation.

Use focused hypotheses and checks that can rule them out. Account for confounders
such as different credentials, configuration, data, timing, or dependency versions.
When checks disagree, investigate the difference in what they exercised; do not
choose the favorable result or treat the number of passing checks as a vote.

For an intermittent failure, preserve its frequency and conditions without claiming
reliability from a later successful run. Repeat when a controlled comparison or an
identified transient condition makes the result informative. Stop identical retries
that add no evidence, and report the unresolved limit.

## Decide what the evidence establishes

A confirmed defect needs a reachable condition, a violated obligation, and a
supported consequence. Runtime reproduction can establish this, but a complete
source trace can also demonstrate a defect without executing it. Label inspection
evidence accurately; do not invent a run or demand unsafe reproduction.

A plausible concern with missing premises remains a risk to investigate, not a
confirmed defect. An unavailable environment leaves affected behavior unverified;
it does not establish a product failure. For maintainability findings, identify
the concrete burden on affected changes or callers rather than a preferred pattern.
Keep optional improvements distinct from contract violations.

## Make findings useful for correction

Give the trigger or reproduction, expected and actual behavior, relevant location
or boundary, and impact. Separate the demonstrated consequence from an uncertain
root cause. Identify whether the change introduced or exposed the problem when
evidence supports that distinction; do not label a pre-existing issue a regression
merely because it was discovered now.

Set priority from the effect on users or data, affected scope, reachability, and
available recovery, following project conventions. Keep severity separate from
confidence: uncertainty does not make a potentially serious outcome harmless.
Lead with material problems, consolidate duplicate symptoms of the same supported
cause, and explain what would resolve any important uncertainty. Avoid padding an
assessment with speculative defects or stylistic preferences.
