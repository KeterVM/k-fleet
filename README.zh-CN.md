# K Fleet

[English](README.md) | [简体中文](README.zh-CN.md)

K Fleet 为 Codex 和 Claude Code 提供产品发现、体验设计、软件交付、发布、运维和效果评估技能。
每个技能包含聚焦于具体方法的指令和参考材料，按任务需要选用。

CLI 负责跨项目安装和更新这些文件。项目提醒由明确请求执行的 `kf-setup` 管理。
外部记忆不是使用前提。

## 为什么需要 K Fleet

代码能够运行，不代表产品有用。需求可能尚未明确，用户可能无法完成任务，
通过的测试也可能遗漏集成或发布问题。K Fleet 提供相应方法，帮助检查这些决策，
明确完成工作需要什么证据。

K Fleet 为这些问题提供相应的方法：

- 需求不清楚时，先问清楚。
- 验证产品价值，设计用户完成任务的方式。
- 改动复杂时，先做好设计。
- 通过测试，确认功能能正常使用。
- 发布产品、支持持续运行，并评估实际用户效果。
- 同类错误反复出现时，检查工作方法。

简单修改只需使用必要的方法。遵循技能指令本身，不代表结果正确或有价值。

## 核心思想

K Fleet 以四个思想为基础。
它们分别用于工程工作的不同方面。

| 思想 | 如何用于实际工作 |
| --- | --- |
| **第一性原理** | 分清目标、事实、限制和假设。检查设计是否包含必要的功能，以及这些功能能否共同完成任务。使用相关工程知识和测试结果。 |
| **方法论** | 选择适合当前任务的方法。已有需求和设计足够时，直接使用。完成所有步骤，也不代表结果正确。 |
| **控制论** | 比较实际结果和预期结果，修正差异。明确何时停止或改变方法。反复使用同一方法，可能会重复同一错误。 |
| **双环学习** | 检查错误来自代码、假设、方法，还是评价标准。修改方法前，先收集足够的事实和测试结果。修改必须在任务授权范围内。 |

其他上下文与当前项目指令或源文件冲突时，以当前项目指令和源文件为准。
改进方法不代表可以自行改变用户需求或修改技能。

通过实际任务中的决策和结果，判断技能质量。

## 技能

| 技能 | 职责 |
| --- | --- |
| `kf-setup` | 仅在用户明确要求初始化时，添加或更新根目录 `AGENTS.md` 中的提醒。 |
| `kf-discover-product` | 在确定方案前，调查尚不明确的用户问题、现有替代方案和产品价值。 |
| `kf-define-requirements` | 明确预期行为、范围和验收标准；新功能或跨会话的工作会写一份 spec。 |
| `kf-design-experience` | 设计用户旅程、交互、内容和视觉表达，区分设计检查与实际可用性观察。 |
| `kf-design-codebase` | 设计或评估代码职责、接口、结构，以及主流库和框架的选型。 |
| `kf-implement` | 完成代码改动，明确职责、命名、目录归属和依赖关系。复用适用的代码，修正实现过程中暴露的设计问题。 |
| `kf-write-tests` | 编写有用的自动化测试和回归测试。 |
| `kf-verify` | 验证交付或审查指定范围的代码，检查缺陷、结构问题和有证据支持的生态复用机会。 |
| `kf-release-product` | 准备或执行已授权的交付，包括迁移、恢复，以及目标环境或渠道中的发布检查。 |
| `kf-operate-product` | 建立运行保障、诊断故障，并依据服务状态和用户影响验证恢复。 |
| `kf-evaluate-product` | 使用可靠的指标和用户反馈，评估产品是否产生预期价值。 |
| `kf-codify-practices` | 在用户要求时，依据当前代码，把项目反复出现的流程、风格和约束整理成项目技能或项目指引。 |

每个技能都包含其方法需要的指令和文件。
按需选择方法，也可以先写测试再写代码。
新事实可能要求重新作出决定。
代码结构应满足预期行为和职责边界。

改动新增或重做通用机制时，先检查适合的生态主流库和框架，能让代码更清晰或更可靠时优先采用；
保留或新增自写机制需要具体理由。复用仍适用的选型证据，常规技术选择直接决定。
审查区分缺陷、有依据的改进和待核实线索；发现问题不代表获得了无关迁移的授权。
测试编写也将这项原则用于工具选型。

产品发现判断什么问题值得解决，需求定义明确已经确定要做的行为。
体验设计负责用户怎样使用产品，代码设计负责代码怎样组织。
通过功能验收、成功发布和证明产品价值，是不同的结果。
按需要选用方法。

新项目、新功能或跨会话的工作，需求阶段会写一份 spec（默认 `docs/specs/<feature>.md`），
记录每个决定的来源和依赖。spec 就是交接文档：下一个会话在 Claude Code 中用
`/kf-implement docs/specs/<feature>.md`，在 Codex 中用 `$kf-implement docs/specs/<feature>.md` 接着做。
设计和验收也按同样方式读取它。边界清楚的小改动不需要 spec。

发布和运维沿用已有授权。准备或评估任务本身不代表允许修改生产环境、公开发布或联系用户。
这些方法不依赖特定的设计、分析或托管工具。
安全评估、特定平台操作等工作，可按需使用专项技能。

可选的审查 agent 负责独立审查代码：Codex 中为 [`kf_reviewer`](.codex/agents/kf-reviewer.toml)，
Claude Code 中为 [`kf-reviewer`](.claude/agents/kf-reviewer.md)。
它只有读取权限。
安装时会包含它的配置。
它提供审查建议和支持证据。

## 安装

需要 Node.js 20 或更高版本、可用的 `npx`（或 Bun 的 `bunx`），以及访问 npm 的网络。
技能文件随 CLI 包一起发布，下载一次即可用于所有项目。

在目标仓库中运行：

```sh
npx --yes k-fleet@latest install
```

使用 Bun 时，等价命令为：

```sh
bunx k-fleet@latest install
```

如果需要使用当前 GitHub 源码，而不是 npm 已发布的 CLI：

```sh
npx --yes github:KeterVM/k-fleet install
```

命令行工具（CLI）会执行以下操作：

- 将公开技能复制到 `.agents/skills/` 供 Codex 使用，并在 `.claude/skills/` 中建立链接供 Claude Code 使用。
- 将审查 agent 的配置复制到 `.codex/agents/` 和 `.claude/agents/`。
- 注册当前项目。

安装不会启动初始化，也不会修改 `AGENTS.md`。
技能和审查 agent 的配置都来自 CLI 包，因此固定 CLI 版本即同时固定两者。
K Fleet 不使用 `skills` CLI 或 `skills-lock.json`；旧版本留在该文件中的 K Fleet 条目会被移除，其他条目保留。

Codex 会[自动发现技能变更](https://learn.chatgpt.com/docs/build-skills#create-a-skill)，
Claude Code 也会[监视技能目录](https://code.claude.com/docs/en/skills)。
如果已安装的技能没有出现，再重启 agent。需要初始化项目提醒时，明确请求使用 `kf-setup`。
在 Codex 中，可以[提及该技能](https://learn.chatgpt.com/docs/build-skills#how-chatgpt-and-codex-use-skills)：

```text
$kf-setup
```

在 Claude Code 中，以斜杠命令运行：

```text
/kf-setup
```

`kf-setup` 和 `kf-codify-practices` 只在你调用时运行，agent 不会自行启动它们。

初始化会在项目根目录的 `AGENTS.md` 文件中添加或更新自己的区块。
它会保留其他项目指令。
再次运行不会重复添加区块。
初始化只在明确请求时执行，不是使用其他技能的前置步骤。
需要刷新提醒时，可以再次执行。

项目没有 `CLAUDE.md` 时，Claude Code 会[读取 `AGENTS.md`](https://code.claude.com/docs/en/memory#agents-md)。
如果项目已有 `CLAUDE.md`，请在其中加入一行 `@AGENTS.md` 来加载提醒；初始化会提示这一点，但不会修改 `CLAUDE.md`。

## 可选扩展

按项目需要搭配其他技能和插件。`kf-codify-practices` 只编写项目自己的技能和指引，
先给出方案再写入，不修改已安装的 K Fleet 技能和第三方技能。
可用时，它使用 [`skill-creator`](https://github.com/openai/skills/tree/main/skills/.system/skill-creator)
编写技能；K Fleet 不会安装它，也不依赖它。写好的指引在实际任务中使用之前都未经验证。

外部记忆由项目自行选择。K Fleet 不安装、配置或操作记忆集成。
文档和其他辅助工具应服务于具体任务需要。

## 使用

直接描述任务，或指定技能名称即可。
切换方法不会改变已有权限范围。
仅分析或仅审查的任务保持只读。
agent 会报告实际结果，并说明还有哪些检查未完成。

CLI 默认操作当前项目。
你也可以指定其他路径。
`--all` 用于操作所有已注册项目。

```sh
npx --yes k-fleet@latest install /absolute/path/to/api /absolute/path/to/web
npx --yes k-fleet@latest update --all
npx --yes k-fleet@latest status --all
npx --yes k-fleet@latest list
```

使用 Bun：

```sh
bunx k-fleet@latest update --all
```

| 命令 | 行为 |
| --- | --- |
| `install` | 补齐技能列表中缺失的技能，保留已有的当前技能，复制审查配置并注册项目。 |
| `update` | 刷新当前 CLI 所列的全部技能，包括补齐缺失项，并刷新审查配置。 |
| `status` | 检查预期文件是否存在，不比较已安装内容或版本是否与源码一致。 |
| `list` | 列出已注册项目。 |
| `register` / `unregister` | 在 `~/.k-fleet/projects.json` 中添加或移除项目路径，不安装或删除技能。 |

`--all` 只选择已注册项目，不扫描整个文件系统；不能与显式路径同时使用。
安装和更新会保留无关技能。已识别的旧版条目会在替代技能安装成功后移除，
具体迁移名单见 [CLI 源码](scripts/kf-projects.mjs)。

更新后如需刷新项目提醒，明确请求使用 `kf-setup`。

### 新技能没有出现时

[`@latest`](https://docs.npmjs.com/cli/v11/commands/npm-dist-tag) 指向 npm 已发布的分发标签，
不代表 GitHub 最新提交，也不保证包运行器跳过缓存；[Bun 同样会缓存包](https://bun.sh/docs/pm/bunx)。
先检查 npm 当前发布的标签：

```sh
npm view k-fleet dist-tags --json
```

缓存中的旧 CLI 会安装该版本自带的技能。
可以用 `k-fleet@<version>` 指定一个已发布版本，或直接获取 GitHub 当前的 CLI 和技能更新已注册项目：

```sh
npx --yes github:KeterVM/k-fleet update --all
```

创建 GitHub Release 不会自动发布 npm 包。如果文件已安装但 agent 尚未发现，再重启它；
刷新技能发现不能补齐缺失的文件。

## 维护

`skills/` 存放技能源文件。
`.codex/agents/` 和 `.claude/agents/` 存放审查 agent 的配置，两者指令相同。
`scripts/kf-projects.mjs` 存放 CLI 代码。
CLI 没有 npm 依赖，直接从自身包中复制技能。

维护时请参阅：

- [维护者指南](AGENTS.md)
- [方法组合说明](docs/workflow-methods.md)
- [技能编写指导](docs/skill-authoring.md)
- [变更日志](CHANGELOG.md)
- [GitHub 版本发布](https://github.com/KeterVM/k-fleet/releases)

本仓库不维护测试套件、评测语料或示例项目。
报告技能质量时，应说明实际任务中的决策和结果。
文件检查和旧版本的结果，不能证明修改后的指令效果更好。

采用 [Apache-2.0](LICENSE) 许可证。另请参阅 [NOTICE](NOTICE)。
