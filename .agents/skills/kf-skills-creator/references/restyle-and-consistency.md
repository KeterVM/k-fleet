# Restyle and consistency

Use this for the rule inventory (step 3) and the draft checks (step 6).

## Rule inventory

Before writing new text, list the rules you touch: for a restyle, every rule in
the old SKILL.md and references; for a trim or rephrase, the rules being removed or
reworded. One row per rule:

| # | Old location | Rule (short) | Destination | Reason |
| --- | --- | --- | --- | --- |
| 1 | `SKILL.md:54-60` | Ask before dependent edits when readings differ in consequence | Body, step 3 | Core judgment |
| 2 | `SKILL.md:47-48` | Existing code explains current behavior, not intent | Body, step 1 | Frequent failure |
| 3 | `references/x.md:12` | No formal traceability matrix unless required | Reference | Detail |
| 4 | `SKILL.md:88` | No fixed question count | Removed | Covered by "skip any the request answers" |

Destinations: body, reference (name it), merged into row N, or removed. A removal
needs a reason: covered elsewhere (say where), restates a model default, or
obsolete. After drafting, walk the table again and confirm each kept rule is
actually present.

**Covered elsewhere** means covered inside the same skill directory, because that
is all an agent is guaranteed to load with the skill. The `kf-setup` reminder runs
only on user request, and `AGENTS.md`, docs, and other skills are absent from
consumer projects; a rule that lives only there is lost for a skill-only install.

**Check the rule's history before removing it.** Run
`git log -S '<distinctive phrase>' --oneline -- <path>`. When a recent commit added
or moved the rule deliberately, read its message and either keep the rule or name
in the reason what changed since.

Rules that guard real failures are easy to lose in a restyle because they read like
disclaimers: "a stated assumption does not settle intent", "check alternate entry
points", "acceptance states behavior, not mechanism". Keep their intent and rephrase
them positively.

## Self-consistency

- Each example follows the skill's own rules. Check classifications, acceptance
  conditions, and what the example does while waiting, the same way you would check
  instructions. An example that specifies a mechanism in acceptance, or acts beyond
  current authority, teaches that behavior.
- Each example or fact lives in one place. When a case appears in both SKILL.md and
  a reference, keep it in one and point to it.
- Labels match: if the core table has three kinds, references use the same three.
- Body and references agree on ordering rules (for example, "one question per
  decision, sent together").

## Mechanical checks

Run from the repository root and report what was actually checked:

- Frontmatter `name` equals the directory name and starts with `kf-`.
- Every `references/...` link in SKILL.md resolves inside the skill directory.
- No link points into another skill's directory.
- Negation count before and after (`do not|does not|never|cannot|no `), as a
  signal to review remaining prohibitions, not as a target.
- Word count of the body before and after, with a note on where added words went.

## Integration surfaces

Check the surfaces the change touches. When the maintainer has deferred
documentation sync to a release, list the surfaces that now disagree in the report
instead of editing them; the skill text itself stays consistent now.

| Change | Surfaces |
| --- | --- |
| Description or purpose changed | `README.md` and `README.zh-CN.md` catalog tables, the `kf-setup` reminder list, `docs/workflow-methods.md` |
| New, removed, or renamed public skill | Same, plus the `kFleetSkills` list in `scripts/kf-projects.mjs` and `CHANGELOG.md`, after the maintainer's decision |
| Setup skill changed | `skills/kf-setup/agents/openai.yaml` keeps `allow_implicit_invocation: false` |
| Authoring rules changed | `docs/skill-authoring.md` and the "Skill authoring" section of `AGENTS.md` |
