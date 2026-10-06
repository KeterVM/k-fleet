# Template

Use this when drafting the skill text. Each section lists what it is for, then the
skeleton shows a filled shape.

## Sections

| Section | Purpose | Guidance |
| --- | --- | --- |
| Frontmatter | Discovery | `name` equals the directory and starts with `kf-`. `description`: capability, then "Use when …" with the discriminating trigger. Keep it short; name intent categories rather than listing phrases. |
| Opening | Applicability | 2–4 lines: the outcome, when to use, when to skip, what to reuse. |
| Method | The reasoning procedure | Numbered decisions to settle, in usual order, skippable. Name the one ordering that protects an invariant, if any. Each step says what evidence moves to the next step. |
| Core table | The hard judgment | *Kind \| Test \| Action*, 3–5 rows. Only when the skill has a real classification. |
| Stop and re-examine | Control and double loop | The stopping condition, and what to revisit when evidence contradicts an earlier decision (for example, a user overriding a "routine" choice). |
| Examples | Teach the boundary | Two short cases labelled illustrative: one that looks routine but is not, one that looks uncertain but is routine. Different domains from each other and from the references. Full walk-throughs go to a reference. |
| Supporting references | Progressive disclosure | One line per reference, routed by an observable event (adding a package or deployment piece, a user override, a first design) plus the decision that is stuck; the agent rarely notices when it is stuck. One level deep, inside the skill directory. |
| Boundaries | Real limits | Up to five positive lines: scope and authority, decisions that stay open until answered, read-only modes, reporting honesty. |

Body length is a cost paid on every load. Spend it on the core judgment and the
boundary examples; move procedures, checklists, and long cases into references.

## Skeleton

```markdown
---
name: kf-<verb>-<object>
description: <Capability in one sentence>. Use when <discriminating trigger>.
---

# <Title>

<Outcome>. Use it when <trigger>. <When to skip>; reuse <existing artifact> when it
already answers these questions.

## Method

These are the decisions to settle, in their usual order; skip any the request
already answers. One ordering is fixed: <ordering and the invariant it protects>.

1. **<Decision>.** <What to establish and from which evidence.>
2. **<Core decision>.**

   | Kind | Test | Action |
   | --- | --- | --- |
   | <kind> | <observable test> | <action> |

   <One or two lines on judging by consequence, with the reason.>

3. **<Decision>.** <…>
4. **Stop and hand off** when <condition>. When <contradicting evidence>, revisit
   <earlier decision> before continuing.

## Examples (illustrative)

**Looks <X>, is <Y>.** "<request>." <Why, in two or three sentences.>

**Looks <Y>, is <X>.** "<request>." <The check that settles it.>

## Supporting references

- <Triggering event; stuck decision>: [<Title>](references/<file>.md).

## Boundaries

- <Scope and authority line.>
- <Decision that stays open until answered.>
- <Reporting line.>
```

## Phrasing

| Instead of | Write |
| --- | --- |
| "Do not ask about routine choices." | "Choose routine means yourself and state the choice." |
| "Never claim completion without evidence." | "Report only what you observed; name what remains unverified." |
| "Avoid fixed reports." | "Carry the decisions forward in the conversation or an existing brief." |

Keep a prohibition when the failure is demonstrated or a policy requires it, and
put it in Boundaries with its reason. After rephrasing, read the positive form as
an agent would: if it now sounds like permission for what was forbidden ("quarantine
a test only openly" for "never quarantine silently"), state the required action
instead ("report every quarantined test"), or keep the prohibition in Boundaries.
