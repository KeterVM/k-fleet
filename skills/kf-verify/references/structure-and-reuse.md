# Structure and reuse

Use for a structural or ecosystem-reuse assessment of added or changed components
and boundaries, or when one is requested. The authority and completion rules in
SKILL.md still apply.

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

## Check ecosystem reuse within the assessed scope

Identify general-purpose mechanisms such as parsing, validation, retries, caching,
or scheduling. Their responsibility triggers the comparison; code size alone does
not establish a problem, and no failure or prior maintenance incident is needed.
For a diff review, examine changed code and relevant context; a module or repository
assessment uses its requested scope. Finding an alternative does not authorize edits
or an unrelated framework migration.

Reuse applicable selection evidence or research mainstream, maintained libraries and
frameworks through official documentation, source, and package metadata for the
relevant version. Compare required behavior and edge cases, runtime compatibility,
licensing, maintenance status, and material integration or migration costs. Existing
standard-library, framework, and installed dependency capabilities count as candidates.
Popularity alone is not proof of fit, and no fixed candidate count is required.

For a supported improvement, identify the custom mechanism and location, a suitable
alternative and sources, responsibilities the alternative would take over, expected
clarity or reliability benefits, and material adoption costs. Check any existing
retention rationale against current constraints. Working code, green tests, and no
reported problems do not justify retention by themselves. Separate an evidence-backed
recommendation from an unverified lead; do not claim measured savings or reliability
without observations. If research is unavailable, report the comparison as incomplete.

For an adopted dependency, inspect real entry points, configuration, callers, and
relevant integration evidence. A manifest entry or approved design does not establish
that the intended behavior uses the dependency correctly.
