# Writing project skills

Use when writing a project skill without `skill-creator`, restructuring one, or
refining one that agents misuse. The authority and completion rules in SKILL.md
still apply.

## Structure

Write a self-contained `SKILL.md` in its own directory, with the directory name
equal to the frontmatter `name`. Check existing skill names first, and keep the
name outside the `kf-` prefix so it never shadows a K Fleet skill.

- **Description:** what the skill does and when to use it, in terms of the task an
  agent will recognize ("Use when adding or changing an HTTP endpoint"). A
  description that only names the topic ("Endpoint guide") is rarely selected.
- **Body:** the decisions and steps that are specific to this project, in the order
  the task needs them, each with the reason when it is not obvious. State when the
  skill does not apply and when a simpler path suffices.
- **Examples:** point at real files that show the convention, rather than pasting
  long code that will drift. Keep any inline snippet short and copied from the
  current code.
- **Supporting files:** add scripts, templates, or references only for a shown
  need; a script for steps that never vary is cheaper to keep correct than prose.

Leave out general practice the agent already knows or another installed skill
covers, secrets, and the history of the task that prompted the skill. Write from
the practice, not the last incident: one mistake becomes one rule only when the
evidence shows it recurs or its consequence is serious.

## Refining

Compare each rule with the current code and records. For each one, keep it,
update it to match what the code now does, move it (an always-applicable rule
belongs in the root guidance), or remove it with a reason. When agents ignored a
rule, check whether the description fails to trigger the skill, the rule sits
deep in generic text, or it conflicts with other guidance before adding emphasis.
Removing outdated or generic text is often the most useful change.

## Keeping it current

Keep the skill in the repository so its changes are reviewed and reversible with
the code. When a convention changes, update the skill in the same change, or
note the drift for the user. When later use shows a rule misleads agents, revise or
remove it on the user's request, preserving their own edits.
