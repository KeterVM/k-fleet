# K Fleet

[English](README.md) | [简体中文](README.zh-CN.md)

建议搭配 Astra 使用 K Fleet。其他模型的效果可能不同。

K Fleet 提供六种工程方法和一个初始化技能。
技能是一组写在文件中的 AI agent 工作指令。
主 agent 选择需要的方法，并负责完成整个任务。
项目根目录的 `AGENTS.md` 文件为主 agent 提供提醒。

使用 K Fleet 不需要外部记忆。你也可以按需添加。

## 为什么需要 K Fleet

AI agent 有时会在需求不清楚时就开始写代码。
写好的各个部分，也可能没有连接起来。
即使测试全部通过，功能仍可能无法正常使用。

K Fleet 为这些问题提供相应的方法：

- 需求不清楚时，先问清楚。
- 改动复杂时，先做好设计。
- 通过测试，确认功能能正常使用。
- 同类错误反复出现时，检查工作方法。

有了这些指令，你就不必在每个任务中重复交代要求。
agent 也能据此判断任务是否完成。
简单修改只需使用必要的方法。

## 核心思想

K Fleet 以四个思想为基础。
它们分别用于工程工作的不同方面。
它们不规定技能或 agent 的数量。

| 思想 | 如何用于实际工作 |
| --- | --- |
| **第一性原理** | 分清目标、事实、限制和假设。检查设计是否包含必要的功能，以及这些功能能否共同完成任务。使用相关工程知识和测试结果。 |
| **方法论** | 选择适合当前任务的方法。已有需求和设计足够时，直接使用。完成所有步骤，也不代表结果正确。 |
| **控制论** | 比较实际结果和预期结果，修正差异。明确何时停止或改变方法。反复使用同一方法，可能会重复同一错误。 |
| **双环学习** | 检查错误来自代码、假设、方法，还是评价标准。修改方法前，先收集足够的事实和测试结果。修改必须在任务授权范围内。 |

主 agent 负责连接改动涉及的各个部分，并完成已授权的检查和修正。
其他上下文与当前项目指令或源文件冲突时，以当前项目指令和源文件为准。
改进方法不代表可以自行改变用户需求或修改技能。

通过实际任务中的决策和结果，判断技能质量。

## 技能

| 技能 | 职责 |
| --- | --- |
| `kf-setup` | 仅在用户明确要求初始化时，添加或更新根目录 `AGENTS.md` 中的提醒。 |
| `kf-define-requirements` | 明确预期行为、范围和验收标准。 |
| `kf-design-codebase` | 设计代码职责、接口和结构。只采用任务需要的复杂度。 |
| `kf-implement` | 完成代码改动，并接入现有功能。复用适用的代码。事实或测试结果表明设计有问题时，修正设计。 |
| `kf-write-tests` | 编写有用的自动化测试和回归测试。 |
| `kf-verify` | 检查功能、缺陷、回归和运行时问题。 |
| `kf-evolve-skills` | 在用户要求或任务暴露出方法问题时，检查技能指令。通过实际工作评估改动。 |

每个技能都包含其方法需要的指令和文件。
一个 agent 可以使用多种方法。
它可以只选择必要的方法，也可以先写测试再写代码。
新事实可能要求它重新作出决定。
代码结构应尽可能简单，同时满足任务需要。

现有方法无法满足任务需要时，`kf-evolve-skills` 会先检查已有技能指令。
它可以使用以下辅助技能：

- [`find-skills`](https://github.com/vercel-labs/skills/tree/main/skills/find-skills)：来自 Vercel 的 `vercel-labs/skills` 仓库，用于查找其他技能。
- [`skill-creator`](https://github.com/openai/skills/tree/main/skills/.system/skill-creator)：来自 OpenAI 的 `openai/skills` 仓库，用于编写技能。

这两个辅助技能都是可选的。
之后，它会通过实际工作评估这些指令。

新增技能默认安装在当前项目中。
agent 可以在任务授权范围内添加、修改或删除技能。

可选的 [`kf_reviewer`](.codex/agents/kf-reviewer.toml) agent 负责独立审查代码。
它只有读取权限。
安装时会包含它的配置。
它将审查结果交给主 agent。
主 agent 负责修正问题和完成整个任务。

## 安装

需要 Node.js 20 或更高版本。
不需要外部记忆服务。

在目标仓库中运行：

```sh
npx --yes k-fleet@latest install
```

也可以从 GitHub 安装：

```sh
npx --yes github:KeterVM/k-fleet install
```

命令行工具（CLI）会执行以下操作：

- 将七个技能安装到 `.agents/skills/`。
- 将技能记录到 `skills-lock.json`。
- 将审查 agent 的配置复制到 `.codex/agents/`。
- 注册当前项目。

安装不会启动初始化，也不会修改 `AGENTS.md`。

安装完成后，关闭并重新启动 Codex。
在每个项目中手动运行一次：

```text
/kf-setup
```

初始化会在项目根目录的 `AGENTS.md` 文件中添加或更新自己的区块。
它会保留其他项目指令。
再次运行不会重复添加区块。
只有明确要求初始化时，agent 才会执行初始化。
其他任务直接使用方法技能。

## 搭配其他技能和插件

K Fleet 不限定你使用的其他技能或插件。
你可以按项目需要自由搭配。

我们建议给 Astra 清楚的目标和必要的上下文，让它自主分析任务和选择方法。
不建议使用自动生成大量规格文档（spec）或架构决策记录（ADR），并用这些文档限制 agent 工作方式的技能或插件。
文档应记录有用的信息，按任务需要编写。

我们推荐搭配图记忆（graph memory）或 [Supermemory](https://github.com/supermemoryai/codex-supermemory) 这类记忆插件，帮助 agent 跨任务保留和查找上下文。
记忆插件是可选的。

## 使用

直接描述任务，或指定技能名称即可。
切换方法不会改变已有权限范围。
仅分析或仅审查的任务保持只读。
agent 会报告实际结果，并说明还有哪些检查未完成。

CLI 默认操作当前项目。
你也可以指定其他路径。
`--all` 用于操作所有已注册项目。

```sh
npx k-fleet@latest install /absolute/path/to/api /absolute/path/to/web
npx k-fleet@latest update --all
npx k-fleet@latest status --all
npx k-fleet@latest list
```

使用 Bun 时，运行 `bunx k-fleet@latest update`。
加上 `--all` 可以更新所有已注册项目。
指定 `@latest` 可以避免使用缓存中的旧版 CLI。

`register` 和 `unregister` 用于修改 `~/.k-fleet/projects.json` 中的记录。
安装会保留已安装且仍在技能列表中的技能。
更新会用当前版本替换这些技能。

安装时如果发现以下已停用技能，也会替换它们：

- `kf-orchestrate-work`
- `kf-design`
- `kf-investigate`
- `skillopt-sleep`

CLI 会先安装或更新全部七个当前技能。
成功后，再删除旧技能目录及其锁定条目。
如果替代技能安装失败，旧技能会保留。

更新完成后，关闭并重新启动 Codex。
需要更新项目提醒时，手动运行 `/kf-setup`。

## 维护

`skills/` 存放技能源文件。
`.codex/agents/` 存放审查 agent 的配置。
`scripts/kf-projects.mjs` 存放 CLI 代码。
CLI 没有外部包依赖。

维护时请参阅：

- [维护者指南](AGENTS.md)
- [方法组合说明](docs/workflow-methods.md)
- [技能编写指导](docs/skill-authoring.md)

本仓库不维护测试套件、评测语料或示例项目。
报告技能质量时，应说明实际任务中的决策和结果。
文件检查和旧版本的结果，不能证明修改后的指令效果更好。

采用 [Apache-2.0](LICENSE) 许可证。另请参阅 [NOTICE](NOTICE)。
