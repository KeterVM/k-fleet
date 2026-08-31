# Instruction Discovery

Read this reference when initializing repository Context or determining what a
representative working directory actually receives.

## Build the effective instruction chain

1. Account for the active Codex home (`CODEX_HOME` when set, otherwise the
   default) and its first non-empty `AGENTS.override.md` or `AGENTS.md`. Treat
   this as inherited Context; do not modify global guidance without explicit
   global scope.
2. Resolve the project root, then walk from it to the working directory. In each
   directory, check candidates in this order: `AGENTS.override.md`, `AGENTS.md`,
   then configured `project_doc_fallback_filenames`, and include at most one file.
3. If an empty higher-precedence candidate coexists with a lower candidate, do not
   infer whether the lower file becomes active. Official guidance and installed
   Codex versions can differ here. Record the active version and run an isolated
   read-only discovery check, or report the effective same-directory selection as
   indeterminate.
4. Combine selected project files from root to leaf. Later, narrower instructions
   take precedence. Record ignored, shadowed, and empty candidates rather than
   treating them as active Context.
5. Read the effective `project_doc_max_bytes` value, using Codex's current
   default only when no override is configured. Measure the combined project
   instruction chain separately from user-level guidance and identify content that
   can be truncated before claiming that a project rule is active.
6. Separate always-loaded instructions from routed Context. Canonical documents,
   skills, examples, and source files linked by an instruction file are available
   on demand; they are not part of the startup chain merely because they exist.

If runtime behavior or configuration semantics are uncertain, verify them against
the installed Codex version or current official documentation instead of relying
on a remembered default.

Read only configuration keys required for discovery and size decisions. Use a
targeted query or parser and redact unrelated values; do not print or copy an
entire user-level configuration file because it may contain credentials or
sensitive settings.

## Decide whether to initialize

When no usable project instruction entry exists, determine whether evidence-backed
repository Context would prevent recurring navigation, command, scope, safety, or
verification failures.

- When creation is authorized and useful, create the narrowest conventional entry,
  normally a root `AGENTS.md`. Add nested files only for genuinely different
  subtree rules.
- Do not create an empty file, generic template, directory-by-directory mirror, or
  `AGENTS.override.md` merely because no file exists. Overrides are for
  intentional replacement at that scope.
- Derive instructions from explicit user direction, accepted decisions, current
  configuration, repeated implementation evidence, and verified commands. Do not
  infer team policy from a single example or temporary state.
- Context maintenance owns discoverability and placement of verified facts,
  commands, ownership boundaries, and already-authorized policy. A candidate rule
  that changes future agent behavior belongs to `kf-learn-from-evidence` unless
  the user has already decided and authorized that exact rule and scope.
- An ownership map is a fact; a mandate to notify owners, remain within their area,
  or obtain approval is policy. Record the former without inferring the latter.
- Treat a direct user mandate as already-decided policy within its authorized
  scope. Treat a request to infer, recommend, or decide whether a pattern should
  become permanent as a learning candidate.
