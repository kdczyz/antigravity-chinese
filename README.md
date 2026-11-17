<p align="center">
  <img src="assets/logo.png" alt="Antigravity Chinese Patch" width="260" />
</p>

<h1 align="center">Antigravity Chinese Patch</h1>

<p align="center">
  Google Antigravity IDE 最新版中文汉化 · 一键注入式汉化方案 · macOS &amp; Windows
</p>

<p align="center">
  <a href="https://github.com/kdczyz/antigravity-chinese/releases/latest"><img src="https://img.shields.io/badge/version-v2.18.1-purple.svg" alt="Version" /></a>
  <a href="https://github.com/kdczyz/antigravity-chinese/releases/latest"><img src="https://img.shields.io/badge/%E4%B8%8B%E8%BD%BD-Releases-blue.svg" alt="Download" /></a>
  <a href="https://github.com/kdczyz/antigravity-chinese/stargazers"><img src="https://img.shields.io/github/stars/kdczyz/antigravity-chinese?color=yellow" alt="Stars" /></a>
  <img src="https://img.shields.io/badge/Target-Antigravity%20IDE-purple.svg" alt="Antigravity" />
  <img src="https://img.shields.io/badge/Platform-macOS%20%7C%20Windows-brightgreen.svg" alt="Platform" />
  <img src="https://img.shields.io/badge/Node.js-%3E%3D22-orange.svg" alt="Node" />
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="MIT" />
</p>

<p align="center">
  <b>2836</b> 条界面词条 · 注入式汉化 · 不修改客户端本体 · 开机自启后台常驻
</p>

---

## ⚡ 一句话安装

把下面这句话直接发给你正在使用的 Antigravity / AI Agent，它会自己完成下载、安装与自启动配置：

```bash
帮我执行https://github.com/kdczyz/antigravity-chinese这个项目的汉化，将项目文件存放在文稿中，并配置开机自启动防止掉后台后台
```

> 也可以手动下载安装包，见下方 [📥 下载](#-下载)。

---

## 📥 下载

所有安装包都发布在 [Releases](https://github.com/kdczyz/antigravity-chinese/releases/latest) 页面：

| 安装包 | 适用平台 | 说明 |
| :--- | :--- | :--- |
| [Antigravity-Chinese-Patch-v2.18.1-macOS.zip](https://github.com/kdczyz/antigravity-chinese/releases/latest/download/Antigravity-Chinese-Patch-v2.18.1-macOS.zip) | macOS | 含 `mac/` 目录、`install.sh` / `uninstall.sh` 与一键脚本 `one-click-desktop-zh.command` |
| [Antigravity-Chinese-Patch-v2.18.1-Windows.zip](https://github.com/kdczyz/antigravity-chinese/releases/latest/download/Antigravity-Chinese-Patch-v2.18.1-Windows.zip) | Windows | 含 `win/` 目录与 `install.ps1` / `uninstall.ps1` |
| [Antigravity-Chinese-Patch-v2.18.1-full.zip](https://github.com/kdczyz/antigravity-chinese/releases/latest/download/Antigravity-Chinese-Patch-v2.18.1-full.zip) | 全平台 | 完整仓库（mac + win + 文档 + 图标素材） |

macOS 解压后双击 `one-click-desktop-zh.command` 也可一键安装；若系统拦截，先在「系统设置 → 隐私与安全性」点「仍要打开」，或在终端执行：

```bash
xattr -dr com.apple.quarantine one-click-desktop-zh.command
```

---

## 🆕 v2.18.1 更新内容

本次更新合并了社区 PR [#10](https://github.com/kdczyz/antigravity-chinese/pull/10)，重点解决「输入框被打断」的老问题，并大幅补齐词库：

- 🔤 **词库从 918 条扩充到 2836 条**（+1918 条），覆盖设置弹窗、权限说明、模型选择、Agent 状态、MCP、终端与浏览器权限等界面。
- 🧷 **物理隔离 Lexical 输入框**：汉化层不再触碰输入框节点，修复语音输入 / 英文输入时焦点被重置、光标跳到开头的问题。
- 🎯 **全词精确匹配引擎重构**：由逐条字符串替换改为词表 O(1) 精确匹配，避免 `Active`、`About`、`Open` 这类短词误伤正文与代码。
- 🖥️ **修复 macOS 主进程识别**：解决进程名被系统截断导致守护进程找不到客户端、注入不生效的问题。
- 🎨 **文档与图标改版**：新的项目 Logo、聚拢的 Badge 栏与本说明文件。

历史版本见 [更新日志](#-更新日志)。

---

## 🧭 项目简介

这是一个面向 **Google Antigravity IDE / Antigravity 2.0 最新版** 的中文汉化项目，用于将 Antigravity 的核心网页界面、Agent 管理界面、常用菜单、设置项与交互文案翻译为简体中文，让中文用户更容易上手 Google 新一代 **Agent-first** AI 编程工具。

> [!IMPORTANT]
> 本项目为社区汉化项目，非 Google 官方项目。Antigravity 更新频率较高，部分新界面或新文案可能暂时保留英文，欢迎提交 Issue 或 PR 补充词条。

> [!NOTE]
> **注入式汉化技术**：通过客户端本机调试端口（CDP）向窗口内动态注入中文词表，不破解、不反编译、不修改客户端二进制本体与签名。安装后后台自动运行，也可一键停用或卸载。

---

## ✨ 核心特性

- 🧩 **2836 条词条全覆盖**：面向新版 Antigravity IDE 整理的词表，覆盖菜单、设置、权限弹窗、模型选择、Agent 任务状态、MCP、终端与浏览器交互。
- 🎯 **精确匹配不误伤**：词表按整串精确匹配，正文、代码块与终端输出保持原文，不会被「机翻」污染。
- 🧷 **输入框零干扰**：Lexical 输入框与汉化层物理隔离，语音输入、英文输入、中文输入法均不受影响。
- 💬 **侧边栏对话标题智能汉化**：针对 AI 动态生成的英文标题（如 "Basic Chinese Greeting"），内置技术短语翻译引擎，实时转为中文。
- ⚙️ **AI 全局规则自动配置**：安装时自动向 `~/.gemini/config/GEMINI.md` 注入中文命名与回复规则，新会话默认中文。
- 🛡️ **安全非侵入**：不破解、不修改客户端二进制，不破坏签名与沙盒。
- ⚡ **开机自启 + 掉线自愈**：macOS 用 `LaunchAgent`（`RunAtLoad` + `KeepAlive`），Windows 用计划任务，进程被结束后自动拉起。
- 🔄 **实时同步**：每 3 秒轮询调试端口，窗口刷新、新开窗口、客户端重启后自动重新注入；客户端未启动时会自动拉起 Antigravity。
- 🎨 **绿色易卸载**：一键脚本清理守护进程与自启项，无残留。

---

## 📸 汉化效果展示 (Screenshots)

<p align="center">
  <img src="assets/main_interface.png" width="90%" alt="主界面汉化效果"/>
</p>

<p align="center">
  <img src="assets/model_selector.png" width="48%" alt="模型选择汉化效果"/>
  <img src="assets/settings_dialog.png" width="48%" alt="设置菜单汉化效果"/>
</p>

---

## 🗺️ 支持平台与工作机制

| 平台 | 目录 | 自动运行机制 | 核心组件 |
| :--- | :--- | :--- | :--- |
| **macOS** | [`mac/`](./mac) | `LaunchAgent` 用户级后台常驻守护进程（`RunAtLoad` + `KeepAlive`） | `install.sh`, `uninstall.sh`, `one-click-desktop-zh.command` |
| **Windows** | [`win/`](./win) | `计划任务 (Task Scheduler)` 开机登录自启 | `install.ps1`, `uninstall.ps1` |

工作流程：守护进程轮询 Antigravity 的本地调试端口 → 拿到页面列表 → 通过 CDP 注入词表与翻译引擎 → 每 3 秒复查一次，直到窗口关闭。

---

## 🚀 快速开始

### 准备工作

1. 已安装最新版 **Antigravity IDE** 客户端。
2. 已安装 **Node.js 22** 或更高版本（脚本使用内置 `fetch` 与 `WebSocket`）：

```bash
node -v
```

### 💻 macOS 安装

```bash
cd mac
chmod +x install.sh uninstall.sh bin/antigravity-zh-patch.js
./install.sh
```

安装脚本会自动：

1. 生成并加载 `~/Library/LaunchAgents/com.<用户名>.antigravity.zhpatch.plist`；
2. 注册登录自启与 `KeepAlive` 保活；
3. 写入全局中文规则 `~/.gemini/config/GEMINI.md`。

**停用 / 卸载：**

```bash
cd mac
./uninstall.sh
```

### 🔌 Windows 安装

以管理员身份运行 PowerShell：

```powershell
# 首次运行如提示禁止执行脚本
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned

cd win
.\install.ps1
```

**停用 / 卸载：**

```powershell
cd win
.\uninstall.ps1
```

---

## 📂 项目结构

```text
antigravity-chinese/
├── mac/                              # macOS 平台
│   ├── bin/antigravity-zh-patch.js   # 注入逻辑 + 2836 条中文词表
│   ├── launchagents/                 # LaunchAgent plist 模板
│   ├── install.sh                    # 注册 LaunchAgent（登录自启 + KeepAlive）
│   ├── uninstall.sh                  # 停用并清理
│   └── logs/                         # 后台日志（zhpatch.log / zhpatch.err.log）
├── win/                              # Windows 平台
│   ├── bin/antigravity-zh-patch.js   # 注入逻辑 + 中文词表
│   ├── install.ps1                   # 创建登录自启计划任务
│   ├── uninstall.ps1                 # 停用并清理
│   └── logs/
├── assets/                           # Logo 与界面截图
├── one-click-desktop-zh.command      # macOS 一键安装脚本（可双击运行）
└── README.md
```

---

## 📝 更新日志

| 版本 | 日期 | 主要变化 |
| :--- | :--- | :--- |
| **v2.18.1** | 2026-11 | 词库 918 → **2836** 条；物理隔离 Lexical 输入框，修复语音/英文输入焦点重置；重构成全词精确匹配引擎；修复 macOS 进程名截断导致的主进程识别失败；README 与图标改版 |
| **v2.0.0** | 2026-08 | 新增侧边栏对话标题实时汉化与全局 AI 规则自动配置；词库初具规模（918 条）；macOS/Windows 双平台守护机制 |
| **v1.0.0** | 2026-05 | 首个版本：CDP 注入式汉化、macOS LaunchAgent 与 Windows 计划任务自启 |

---

## ⚠️ 已知限制与注意事项

> [!WARNING]
> - **代码与正文保护**：代码块、终端内容以及用户自己发送的消息不会被强制翻译，以保留原始交互与上下文。
> - **客户端更新兼容**：Antigravity 大幅升级 UI 布局或引入新文案时可能出现短暂英文残留，欢迎提交 Issue 或 PR 补充词条。
> - **系统级外观限制**：macOS 顶部菜单栏、系统状态栏等原生组件不在网页端注入范围内。
> - **权限提示**：macOS 首次运行可能提示「终端想访问其他 App 的数据」，属正常注入行为。
> - **非官方项目声明**：本项目仅用于学习、交流与本地化体验优化，不代表 Google 官方立场。

---

## 🙏 贡献者感谢

感谢以下社区贡献者为本项目付出的时间与智慧（按贡献先后排序）：

<table>
  <tr>
    <td align="center" width="88"><img src="https://avatars.githubusercontent.com/u/270883937?v=4" width="56" height="56" alt="" /></td>
    <td>v2.18.1 核心重构：物理隔离 Lexical 输入框，修复语音/英文输入时焦点被重置的问题；重构全词精确匹配引擎；大幅扩充中文词库（<a href="https://github.com/kdczyz/antigravity-chinese/pull/10">#10</a>）</td>
  </tr>
  <tr>
    <td align="center" width="88"><img src="https://avatars.githubusercontent.com/u/305670880?v=4" width="56" height="56" alt="" /></td>
    <td>提出 Dict.json 解耦方案与全 UI 覆盖的 v3.0 汉化补丁，以及 AI 思考过程的客户端翻译实践（<a href="https://github.com/kdczyz/antigravity-chinese/pull/5">#5</a> / <a href="https://github.com/kdczyz/antigravity-chinese/pull/6">#6</a>）</td>
  </tr>
</table>

同时感谢所有提交 Issue、反馈问题与补充词条的用户 —— 每一条反馈都是这个项目持续更新的动力。

如果你也想参与贡献，欢迎提交 Pull Request 或 Issue 👉 [Issues](https://github.com/kdczyz/antigravity-chinese/issues)