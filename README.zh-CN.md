# K Fleet

[English](README.md) | [简体中文](README.zh-CN.md)

K Fleet 为 Codex 提供产品发现、体验设计、软件交付、发布、运维和效果评估技能。
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
| `kf-define-requirements` | 明确预期行为、范围和验收标准。 |
| `kf-design-experience` | 设计用户旅程、交互、内容和视觉表达，区分设计检查与实际可用性观察。 |
| `kf-design-codebase` | 设计或评估代码职责、接口、结构，以及主流库和框架的选型。 |
| `kf-implement` | 完成代码改动，明确职责、命名、目录归属和依赖关系。复用适用的代码，修正实现过程中暴露的设计问题。 |
| `kf-write-tests` | 编写有用的自动化测试和回归测试。 |
| `kf-verify` | 验证交付或审查指定范围的代码，检查缺陷、结构问题和有证据支持的生态复用机会。 |
| `kf-release-product` | 准备或执行已授权的交付，包括迁移、恢复，以及目标环境或渠道中的发布检查。 |
| `kf-operate-product` | 建立运行保障、诊断故障，并依据服务状态和用户影响验证恢复。 |
| `kf-evaluate-product` | 使用可靠的指标和用户反馈，评估产品是否产生预期价值。 |
| `kf-evolve-skills` | 在用户要求或任务暴露出方法问题时，检查技能指令。通过实际工作评估改动。 |

每个技能都包含其方法需要的指令和文件。
按需选择方法，也可以先写测试再写代码。
新事实可能要求重新作出决定。
代码结构应满足预期行为和职责边界。

通用能力默认采用适合的生态主流库和框架。
设计、实现和审查都要比较范围内的自写机制，即使代码能用且尚未出现问题；
保留或新增自写机制需要具体理由。复用仍适用的选型证据，常规技术选择直接决定。
审查区分缺陷、有依据的改进和待核实线索；发现问题不代表获得了无关迁移的授权。
测试编写也将这项原则用于工具选型。

产品发现判断什么问题值得解决，需求定义明确已经确定要做的行为。
体验设计负责用户怎样使用产品，代码设计负责代码怎样组织。
通过功能验收、成功发布和证明产品价值，是不同的结果。
按需要选用方法。

发布和运维沿用已有授权。准备或评估任务本身不代表允许修改生产环境、公开发布或联系用户。
这些方法不依赖特定的设计、分析或托管工具。
安全评估、特定平台操作等工作，可按需使用专项技能。

可选的 [`kf_reviewer`](.codex/agents/kf-reviewer.toml) agent 负责独立审查代码。
它只有读取权限。
安装时会包含它的配置。
它提供审查建议和支持证据。

## 安装

需要 Node.js 20 或更高版本、可用的 `npm` 和 `npx`、Git，以及访问 npm 和 GitHub 的网络。
CLI 会调用 `npx skills add` 安装技能文件，因此使用 Bun 启动 K Fleet 时也需要这些条件。

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

- 将公开技能安装到 `.agents/skills/`。
- 将技能记录到 `skills-lock.json`。
- 将审查 agent 的配置复制到 `.codex/agents/`。
- 注册当前项目。

安装不会启动初始化，也不会修改 `AGENTS.md`。
CLI 版本决定请求安装哪些技能，技能内容来自本仓库默认分支。
因此，固定 CLI 版本不会同时固定技能源码版本。审查 agent 的配置来自 CLI 包。

Codex 会[自动发现技能变更](https://learn.chatgpt.com/docs/build-skills#create-a-skill)。
如果已安装的技能没有出现，再重启 Codex。需要初始化项目提醒时，明确请求使用 `kf-setup`；
在 CLI 或 IDE 中，可以[提及该技能](https://learn.chatgpt.com/docs/build-skills#how-chatgpt-and-codex-use-skills)：

```text
$kf-setup
```

初始化会在项目根目录的 `AGENTS.md` 文件中添加或更新自己的区块。
它会保留其他项目指令。
再次运行不会重复添加区块。
初始化只在明确请求时执行，不是使用其他技能的前置步骤。
需要刷新提醒时，可以再次执行。

## 可选扩展

按项目需要搭配其他技能和插件。`kf-evolve-skills` 会先检查已有指导，再提出新增或修改建议。
可用时，它可以使用 [`find-skills`](https://github.com/vercel-labs/skills/tree/main/skills/find-skills)
发现技能，使用 [`skill-creator`](https://github.com/openai/skills/tree/main/skills/.system/skill-creator)
编写技能；K Fleet 不会安装它们，也不依赖它们才能工作。
已授权的新增技能默认采用项目范围，实际效果需要通过使用来评估。

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

旧 CLI 可能只更新已有技能，而没有请求新增的技能名称。
可以用 `k-fleet@<version>` 指定一个已发布版本，或直接获取 GitHub 当前 CLI 更新已注册项目：

```sh
npx --yes github:KeterVM/k-fleet update --all
```

创建 GitHub Release 不会自动发布 npm 包。如果文件已安装但 Codex 尚未发现，再重启 Codex；
刷新技能发现不能补齐缺失的文件。

## 维护

`skills/` 存放技能源文件。
`.codex/agents/` 存放审查 agent 的配置。
`scripts/kf-projects.mjs` 存放 CLI 代码。
CLI 没有声明 npm 依赖；安装时通过 `npx` 调用外部 `skills` CLI。

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
