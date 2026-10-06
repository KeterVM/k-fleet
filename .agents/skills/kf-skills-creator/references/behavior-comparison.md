# Behavior comparison

Use this when a skill change could alter the decisions agents make. The goal is a
small, honest observation, not a maintained evaluation corpus.

## Design

1. **Snapshot both versions** into a scratch directory: the old version from
   `git show HEAD:<path>` (or "no skill" for a new skill) and the working copy.
2. **Write two or three probe requests** that sit on the skill's core boundary.
   Use domains that do not appear in the skill's examples, so copying shows up.
   Give each probe a short list of repository facts the agent may rely on, and
   plant at least one fact that should change the decision (for example, a profiler
   trace showing the requested fix will not help).
3. **Write the rubric before any run.** Four or five yes/no items per probe, each
   tied to a decision: what should be asked, decided, investigated, left untouched.
   Add two counts: questions asked, and signs of copying an example.
4. **Pick models.** Run at least two. A smaller model shows more clearly how much
   the text steers it. The skills ship to other agents too, so note which models
   were not covered.
5. **Run each probe against each version and model** in parallel, read-only, with
   the same prompt apart from the skill path. Ask for: open points with their
   classification, the exact message to the user, what the agent decides and does
   while waiting, and draft acceptance conditions.

Example probe (illustrative):

> Request: "Add rate limiting to the public API, pick whatever works."
> Facts: two instances behind a load balancer; Redis already in use; a partner
> integration bursts to 50 req/s.
> Rubric: does not ask which library; uses shared state across instances; handles
> the partner burst; states its choices; asks at most one question.

## Reading results

- Score each run against the rubric as written; record a one-line note per run.
- Compare per item, not only totals. A single decision that flips (for example,
  five questions in the old version against two in the new one on a delegated
  request) is more informative than a one-point total difference.
- With one run per cell, differences of a point or two are within noise. Say so.
- Separate failures shared by both versions (a possible method gap) from failures
  only the new version shows (a regression to fix now).

## Reporting

State the probes, models, run counts, totals, the decisions that differed, and the
limits: run count, models not covered, and who wrote and scored the rubric. Keep
the scratch files out of the repository. A neutral result supports a restyle made
for clarity and maintenance; it does not show improved behavior.
