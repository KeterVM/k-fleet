# K Fleet

[English](README.md) | [简体中文](README.zh-CN.md)

K Fleet 专门针对 Astra 进行优化，不保证在其他模型上的效果。

K Fleet 提供六种工程方法和一个由用户主动触发的初始化技能，使用 Supermemory
管理按项目隔离的上下文。主 agent 根据项目根目录 `AGENTS.md` 中的提醒选择方法，
并对整合后的最终结果负责。

## 技能

| 技能 | 职责 |
| --- | --- |
| `kf-setup` | 仅在用户明确要求时，初始化或更新根目录 `AGENTS.md` 中的提醒 |
| `kf-define-requirements` | 明确预期行为、范围和验收标准 |
| `kf-design-codebase` | 解决尚未确定的职责、接口或结构问题，使复杂度与需求相称 |
| `kf-implement` | 交付完整、已集成的改动，合理复用现有实现，并依据证据修正设计 |
| `kf-write-tests` | 编写有实际价值的自动化检查和回归保护 |
| `kf-verify` | 验证功能，检查相关缺陷、回归和运行时问题 |
| `kf-evolve-skills` | 按要求评估或改进技能指导，或解决已观察到的能力缺口，并在实际使用中评估改动 |

每个技能都自包含。一个 agent 可以使用多种方法、跳过不必要的步骤、先写测试，
也可以在证据变化时重新审视相关决策。代码库设计优先采用满足当前需求的最简单结构。

当任务暴露出可复用的能力缺口时，`kf-evolve-skills` 会先检查现有指导，
在可用时使用 `find-skills` 发现技能、使用 `skill-creator` 编写技能，
再通过实际工作评估这些指导。缺少这两个辅助技能时，它也提供自包含的替代流程。
已获授权的新增技能默认安装在项目范围内；失败的尝试可以修订或撤销。
仅仅完成安装并不能证明能力有所改进。

可选的 [`kf_reviewer`](.codex/agents/kf-reviewer.toml) 提供独立的只读审查。
安装时会包含其配置，但是否调用由任务需要决定。它负责报告发现的问题，
修正和最终完成仍由主 agent 负责。无需为每个技能分别创建 agent。

## 安装

需要 Node.js 20+ 和官方
[Supermemory Codex 集成](https://supermemory.ai/docs/integrations/codex)。
请先在用户范围内安装并配置该集成：

```sh
npx codex-supermemory@latest install
npx codex-supermemory status
```

支持托管版和[本地部署的 Supermemory](https://supermemory.ai/docs/self-hosting/overview)。
使用本地后端时，请固定 `SUPERMEMORY_DATA_DIR`，在 `~/.codex/supermemory.json`
中配置 API 密钥和 URL，并在启动 Codex 的环境中设置
`SUPERMEMORY_ISOLATE_WORKTREES=true`。
K Fleet 要求自动回忆和捕获功能连接正常，且作用域正确；不要求使用可选的 MCP 传输。
当前指令和仓库文件优先于记忆，记忆不会赋予额外权限，也不能跨越项目或 worktree 的范围。

在目标仓库中运行：

```sh
npx --yes k-fleet@latest install
```

也可以从本 GitHub 仓库安装：

```sh
npx --yes github:KeterVM/k-fleet install
```

CLI 会将七个 K Fleet 技能安装到 `.agents/skills/`，记录 `skills-lock.json`，
将审查 agent 配置复制到 `.codex/agents/`，并注册该项目。
安装过程不会运行初始化，也不会修改 `AGENTS.md`。

**安装后，请重启 Codex，并在每个项目中手动运行一次初始化：**

```text
/kf-setup
```

初始化会先检查 Supermemory，再向目标项目的 `AGENTS.md` 写入可重复执行的托管区块，
保留已有指导。如果所需运行时不可用，它会停止且不写入文件。
初始化不会安装或配置记忆后端，也不会被自动选择；日常任务直接使用各方法技能。

## 使用

正常描述任务，或调用指定技能即可。已有授权在方法之间保持有效；
仅分析、仅审查的请求仍保持只读。agent 会检查所要求的行为，
报告实际结果和仍未解决的缺口。

CLI 默认操作当前项目，也支持显式指定路径，或使用 `--all` 操作所有已注册项目：

```sh
npx k-fleet@latest install /absolute/path/to/api /absolute/path/to/web
npx k-fleet@latest update --all
npx k-fleet@latest status --all
npx k-fleet@latest list
```

使用 Bun 时，可以运行 `bunx k-fleet@latest update`，加上 `--all` 即可更新所有已注册项目。
指定 `@latest` 可以避免复用缓存中的旧版 CLI。

`register` 和 `unregister` 用于维护 `~/.k-fleet/projects.json`。
安装会保留已经存在的当前技能，更新则会刷新这些技能。
如果存在已停用的 `kf-orchestrate-work`、`kf-design`、`kf-investigate` 或
`skillopt-sleep`，安装也会刷新技能目录，并在替代技能安装成功后删除旧目录及对应的锁定条目。
更新后请重启 Codex，并在需要时手动运行 `/kf-setup`，刷新项目中的旧版提醒。

## 维护

技能源文件位于 `skills/`，审查 agent 位于 `.codex/agents/`，
无依赖 CLI 位于 `scripts/kf-projects.mjs`。贡献者可参阅
[维护者指南](AGENTS.md)、[方法组合说明](docs/workflow-methods.md)和
[技能编写指导](docs/skill-authoring.md)。

本仓库不维护测试套件、评测语料或示例项目。关于技能质量的结论必须说明实际观察到的
决策和结果；机械检查和历史结果不能证明修改后的指令有效。

采用 [Apache-2.0](LICENSE) 许可证。另请参阅 [NOTICE](NOTICE)。
