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

Carry the relevant vocabulary into component names and contracts. Distinguish a
domain concept from an operation, coordinator, or technical adapter rather than
calling each a generic service. A role name must describe the responsibility its
public interface actually offers. Difficulty naming an owner without enumerating
unrelated jobs is a reason to inspect the boundary, not simply invent a broader name.
Leave local spelling and implementation form to language and framework conventions.

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
Sharing a server, protocol, client, or generation tool can justify common technical
mechanisms; it does not by itself establish common ownership of business concepts.
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

Identify the organizing rule of the affected parent directory and how new children
fit it. Feature grouping with technical subdivisions can be coherent; unexplained
mixing of domain, layer, and miscellaneous buckets at the same level obscures
ownership. Keep private details within their owner and make supported cross-module
access explicit. Shared placement needs a shared responsibility and concrete owner;
multiple callers alone do not justify moving code into a global common directory.

Keep related internals together, supported import boundaries clear, and shared code
under a concrete owner. Follow applicable naming, layout, build, test, and framework
discovery conventions. Preserve existing organization where its ownership and
dependencies fit the task, not merely because it is already in place. For disputed
placement, trace a concrete change grounded in the task: which rules, owners, and
callers would change, and what unrelated knowledge would they need? Use that evidence
to retain or revise the boundary. Account for imports, exports, and tooling when
moving code.

Make file boundaries reflect responsibility boundaries. Do not put independently
changing responsibilities in one file merely because they support the same feature
or entry point. For example, a screen or command may compose presentation, business
operations, and persistence through interfaces; their implementations belong with
their respective owners. Separate functions or classes in one file do not by
themselves provide this separation.

Use a concrete change scenario to decide placement: if changing a storage mechanism
requires navigating unrelated presentation or business implementation in the same
file, separate those responsibilities. Keep cohesive private helpers, types, and
invariants with their owner. File length is an inspection signal, not a split rule;
neither one file per function nor a mandatory layer hierarchy follows from this.

Show relevant paths when placement changes, explaining their responsibility and
allowed dependencies. Carry forward enough vocabulary, public entry points, and
the decisive change scenario for implementation to preserve these choices, using
the existing task or artifact without prescribing every class. Separate folders do
not establish boundaries when callers still manipulate internals. A new layer must
serve a contract or constraint beyond making the tree look uniform.
