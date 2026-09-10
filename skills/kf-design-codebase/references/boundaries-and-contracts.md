# Boundaries and contracts

## Model the meaning before the structure

Identify the concepts, identities, and state transitions needed for the affected
behavior, using established domain language. Clarify what makes a state valid and
which rules must remain true across operations. If the same term has different
meanings in different contexts, make that distinction explicit rather than forcing
one shared representation.

Use storage schemas, screens, and request payloads as evidence, not automatic module
boundaries. Check whether their shape expresses the domain or serves persistence,
presentation, or transport needs. Resolve ambiguity that changes behavior with the
requirements owner; do not invent business rules to make a design convenient.
Reuse a sufficient model; a local change needs no comprehensive domain taxonomy.

## Decide what belongs together

Assign ownership to the affected rules, state, and transitions before choosing
files or layers. Extend an adequate owner when the change belongs to its contract.
Separate responsibilities with distinct rules, consumers, or reasons to change;
keep behavior together when splitting would scatter an invariant, expose internals,
or require callers to coordinate what should be one operation.

Judge a boundary by what knowledge it contains and what callers must understand.
A small module can still leak a large contract. Repeated decisions, synchronized
copies of state, or routine access to another module's internals are reasons to
reconsider ownership. They are evidence to investigate, not automatic instructions
to merge; adapters and separate representations can protect necessary boundaries.

Share code when it expresses the same responsibility with a coherent owner.
Similar syntax alone does not justify coupling independently changing rules.
Choose extension, replacement, or a new component for a present need rather than
turning each requirement into a component. Avoid cyclic ownership and make allowed
dependency directions explicit.

## Make contracts usable and enforceable

Define supported entry points, inputs, results, and failure behavior at the
boundary. Include ordering, state, or lifetime obligations when they affect correct
use. Prefer contracts that keep callers from reconstructing internal sequencing
or checking the same business rule themselves. Keep internal representation private.

Keep transport parsing and response mapping from owning unrelated business rules.
Place authorization, validation, and concurrency decisions where the protected
operation cannot bypass them. Identify resource and cleanup owners where relevant.

## Make placement express the design

Distinguish architecture patterns from directory grouping. Layered, clean,
hexagonal, or vertical-slice designs can use different arrangements by layer,
feature, or domain; Controller / Service / Repository is one option, not a template
to impose. Choose organization for the actual responsibility and dependency rules.

Keep related internals together, supported import boundaries clear, and shared code
under a concrete owner. Follow applicable naming, layout, build, test, and framework
discovery conventions. Preserve sound existing organization; account for imports,
exports, and tooling when moving code.

Show relevant paths when placement changes, explaining their responsibility and
allowed dependencies. Separate folders do not establish boundaries when callers
still manipulate internals. A new layer must serve a contract or constraint beyond
making the tree look uniform.
