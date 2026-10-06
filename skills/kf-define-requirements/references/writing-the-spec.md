# Writing the spec

Use this when the work needs a spec (step 5): a new project or feature, work likely
to span sessions or more than one method, or a user request. A bounded change
carries its decisions in the conversation instead.

The spec is the handoff. A later session starts from its path, for example
`/kf-implement docs/specs/team-invites.md`, so write it for a reader who has none of
this conversation.

## Where it lives

Use the location the project's guidance names; otherwise
`docs/specs/<feature-slug>.md`. Report the path when you create or update the
spec, so the user can pass it on.

## What it holds

```markdown
# <Feature>

## Goal
<What the actor can do, or what is true, once this works. One or two sentences.>

## Decisions
| # | Decision | Source | Depends on |
| --- | --- | --- | --- |
| D1 | Exports include archived projects | user | — |
| D2 | Exports run as a background job | evidence: 2 GB tenant exports time out the request | — |
| D3 | The export link stays valid for 24 hours | delegated | D2 |

## Acceptance conditions
- <actor + situation + observable result; effects that must stay absent>

## Design
<Owners, contracts, and delivery shape (artifacts and who hosts them) once decided;
only what the code does not already show.>

## Open questions
- <Question> — recommended: <answer and reason>. Blocks: <D# or conditions>.

## Out of scope
- <Item, with the reason when it is not obvious>
```

Sources:

| Source | Use when |
| --- | --- |
| `user` | The user answered or required it |
| `delegated` | The user explicitly left the choice to you ("pick sensible defaults"); the decision stays visible for their review |
| `evidence: <where>` | Code, docs, data, or an external constraint settles it |
| `assumed` | You rely on it without confirmation. A product decision marked `assumed` also appears under Open questions, and work that depends on it waits |

A short follow-up instruction such as "continue with X" is not delegation;
delegation names the choices it covers. Fill *Depends on* when a decision only makes
sense given another one, so an override can find what it affects.

Leave out what the code already states (file paths, function names, schemas copied
from source): it goes stale. Keep conditions as behavior; mechanism belongs in
Design and only when decided.

## Keeping it current

Update the spec in the same turn a decision changes: an answer arrives, the user
overrides a choice, or design or implementation settles a point. On an override,
use *Depends on* to find the affected decisions and conditions and revise or drop
each one. Move answered questions into Decisions. A spec that disagrees with the
code or the user's latest answer misleads the next session; the latest user decision
wins, and the spec is corrected to match.
