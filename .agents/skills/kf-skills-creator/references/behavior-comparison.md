# Behavior comparison

Use this when a skill change could alter the decisions agents make. The goal is a
small, honest observation, not a maintained evaluation corpus.

## Before drafting (step 4)

1. **Write two or three probe requests** that sit on the skill's core boundary.
   Use domains that do not appear in the skill's examples, so copying shows up.
   Give each probe a short list of repository facts the agent may rely on, and
   plant at least one fact that should change the decision (for example, a profiler
   trace showing the requested fix will not help).
2. **Write the rubric.** Four or five yes/no items per probe, each tied to a
   decision: what should be asked, decided, investigated, left untouched. Add two
   counts: questions asked, and signs of copying an example. Derive the items from
   the core judgment found in step 2 and the old skill's rules, not from the draft,
   which does not exist yet. Save probes and rubric in the scratch directory and
   leave them unchanged once runs start.

Example probe (illustrative):

> Request: "Add rate limiting to the public API, pick whatever works."
> Facts: two instances behind a load balancer; Redis already in use; a partner
> integration bursts to 50 req/s.
> Rubric: does not ask which library; uses shared state across instances; handles
> the partner burst; states its choices; asks at most one question.

## Running (step 7)

1. **Snapshot both versions** into the scratch directory: the working copy, and as
   the old version the skill at the last release tag
   (`git show <tag>:<path>`, or "no skill" for a new skill). Comparing against the
   release rather than `HEAD` also covers unverified edits made since the release.
   Name the baseline commit in the report.
2. **Pick models.** Run at least two, from different vendors when available. A
   smaller model shows more clearly how much the text steers it. Note which models
   were not covered.
3. **Run each probe against each version and model** in a clean context, with the
   same prompt apart from the skill text. Ask for: open points with their
   classification, the exact message to the user, what the agent decides and does
   while waiting, and draft acceptance conditions.
4. **Score blind.** Strip version names and skill paths from the outputs, label
   each pair A and B in a random order recorded only in the scratch directory, and
   have a separate agent, also in a clean context, score against the saved rubric.
   Reveal the mapping after scoring.

### Clean context

A probe run must see only the skill text and the probe. Subagents started from the
maintainer's session can inherit what contaminates the result: the session's hooks,
user and project instructions, the skill listing, and a working directory where
`AGENTS.md`, the authoring guidance, git history, and the other version are
readable. The prompt itself leaks too when it says "old", "new", or "restyled".

- Run each probe as a separate headless session with customizations off, no file
  tools, and everything inline on stdin, from an empty scratch directory. For
  Claude Code:
  `cat prompt.txt | claude -p --safe-mode --no-session-persistence --model <m> --tools ""`
  (`--tools` takes a list, so pass the prompt on stdin). For another vendor's CLI,
  find its equivalent switches and check them before relying on them.
- Put the skill text and the probe facts in the prompt; label the skill only by its
  `name`, never by version.
- Before the first run with a new command or CLI, check the session's own record
  of what it loaded rather than asking the model, which can describe tools and
  files it does not have. For Claude Code, add
  `--output-format stream-json --verbose --include-hook-events` to one run and
  confirm that no hook events appear and the init event lists no tools and no MCP
  servers. Keep the result with the scratch files.

## Reading results

- Score each run against the rubric as written; record a one-line note per run.
- Compare per item, not only totals. A single decision that flips (for example,
  five questions in the old version against two in the new one on a delegated
  request) is more informative than a one-point total difference.
- With one run per cell, differences of a point or two are within noise. Say so.
- Separate failures shared by both versions (a possible method gap) from failures
  only the new version shows (a regression to fix now).
- After revising for a regression, rerun the failing probe and one fresh probe
  written before the rerun.

## Reporting

State the probes, models, run counts, totals, the decisions that differed, and the
limits: run count, models not covered, and whether scoring was blind. Keep the
scratch files out of the repository, and put a 3–5 line summary in the commit
message so the evidence survives:

```text
Comparison: 3 probes x old/new x <model A>/<model B>, 1 run each, blind scoring.
Old 14/20, new 17/20; new asked about routine layout in 0/6 runs (old 4/6).
Limits: one run per cell; probes and rubric by the same author; <models> not covered.
```

A neutral result supports a restyle made for clarity and maintenance; it does not
show improved behavior.
