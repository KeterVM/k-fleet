# Migrations and compatibility

Use for a rename or replacement, or when a wrapper, alias, field mapping, fallback,
or compatibility bridge looks like the small edit. The authority and completion
rules in SKILL.md still apply.

## Establish what the change replaces

Decide what the task changes: the wire format, an internal concept, a public
contract, or the implementation behind a stable interface. Trace affected
definitions and consumers, including serialization, imports, exports, construction
or dependency registration, and relevant tests or generated sources. Update the
in-scope chain to the intended model, regenerate through project tooling where
needed, and remove superseded paths once their consumers have moved. Keep the work
within authorized scope and report out-of-scope consumers as not migrated.

Worked case: a field is renamed from `status` to `statusNum`. Changing only the
JSON property mapping while the internal name and its callers stay `status` does
not complete that rename. If only the wire contract changes and `status` remains an
intentional domain concept, mapping at that boundary is correct; settle which case
applies from the task and the model, not from which needs fewer edits. Check value
semantics and types as well as spelling. A serialization naming convention is not
itself a compatibility defect.

## Migrate callers instead of forwarding

When replacing a class, move affected callers to the intended owner instead of
keeping the old class to forward to the new one. Refactoring the internals of an
intentionally stable facade differs: keep the facade when its contract and
responsibility remain part of the design. An extra wrapper, alias, fallback, or
dual-read path needs a concrete obligation, such as independently deployed
consumers, persisted data, or a required public API. Existing code or fewer changed
files do not establish one.

## Bound necessary compatibility

For a necessary transitional bridge, name the protected consumer or data, why it
cannot move in this change, the removal condition, and who owns the remaining
migration. Keep the bridge at the relevant boundary and report the migration as
unfinished. A permanent adapter needs an ongoing responsibility, not a fictional
removal date. When a compatibility requirement is unknown and consequential,
resolve it from available evidence first, then ask before breaking it; when
evidence shows no such consumer, complete the authorized migration rather than
inventing one.

## Confirm completion

Before declaring the migration complete, search the affected scope for old names,
registrations, and paths and account for every remaining use. Check that the
intended entry points reach the new implementation and that relevant contracts
still hold. Tests passing through an old forwarding shell do not show that its
callers moved.
