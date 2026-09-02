# Memory contract

K Fleet uses Supermemory as its context and experience backend. The integration may
be a local HTTP adapter or an authorized MCP connection, but it must expose scoped
recall, source inspection, write, versioned update, forget, and inference review.

For the official Codex integration, use `supermemory-status` to verify an uncertain
connection, `supermemory-search` for focused recall, `supermemory-save` for explicit
terminal facts or episodes, and `supermemory-forget` for outdated records. Automatic
prompt hooks may supply initial context, but they do not replace focused source
inspection when a recalled claim affects a consequential decision.

## Scope

- Derive an opaque container identity from the canonical repository identity and
  active worktree identity. Agents receive the resolved identity; they do not choose
  arbitrary containers.
- Store branch, relative path, source kind, source revision or content hash,
  observation time, and task/run identity as metadata when available.
- Never search, write, update, or forget outside the resolved container.

## Classes

Classify each record before use:

- `source`: current repository content or an explicit user decision with provenance;
- `approved`: a reviewed durable conclusion promoted from evidence;
- `fact`: directly supported project or task knowledge;
- `inference`: a derived, unapproved hypothesis;
- `episode`: a terminal task trajectory and outcome;
- `preference`: an explicit user preference within its stated scope.

Current system and user instructions outrank every memory. Current scoped source
files outrank extracted, approved, or historical memory about those files. An
approved record outranks an unreviewed fact or inference; an inference never creates
policy or permission.

## Read and write

At task start, retrieve only context relevant to the current intent and paths.
Inspect source documents for claims that affect authority, compatibility, mutation,
or safety. Do not inject an entire profile or graph when focused recall is enough.

At terminal state, save a compact episode and directly supported reusable facts.
Mark derived conclusions as inference. Do not store secrets, credentials, raw logs,
large conversation excerpts, hidden reasoning, personal data unrelated to the task,
or repository content that lacks a concrete retrieval benefit.

Use versioned update for changed facts. Use explicit IDs for exact forgetting;
preview semantic bulk forgetting and bind the applied operation to reviewed IDs.
Review inferred memories before promotion. Preserve source IDs and reasons so every
promotion, update, rejection, and rollback remains auditable.

If backend availability, container scope, or source provenance cannot be verified,
stop substantive work rather than silently falling back to stale recollection.
