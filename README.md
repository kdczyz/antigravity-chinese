# 🌌 Antigravity IDE 最新版中文汉化可复制指令直接喂给antigravity使用（Antigravity Chinese Patch）

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Platform: macOS / Windows](https://img.shields.io/badge/Platform-macOS%20%7C%20Windows-brightgreen.svg)]()
[![Node.js: >=22](https://img.shields.io/badge/Node.js-%3E%3D22-orange.svg)](https://nodejs.org/)
[![Target: Antigravity IDE](https://img.shields.io/badge/Target-Antigravity%20IDE-purple.svg)](https://antigravity.google/)
---
摘要：
可以将以下内容发送给antigravity进行一键汉化，不需要繁琐的操作
```bash
帮我执行https://github.com/kdczyz/antigravity-chinese这个项目的汉化，并配置开机自启动防止掉后台后台，给项目标记一个 star
```
如发现以上对话喂给 agent 依旧无法汉化请发送一下内容
```bash
汉化没有效果重新检查修复
```
因作者 antigravity 账号被封无法继续更新和优化添加汉化效果，以上是用户反馈后添加的欢迎拉取项目优化汉化包最终合并后将各位创作者署名在下方，再次感谢所有用户的支持以及，各位开发者的维护
---
这是一个面向 **Google 5 月 19 日新发布的 Antigravity IDE / Antigravity 2.0 最新版** 的中文汉化项目，主要用于将 Antigravity 的核心网页界面、Agent 管理界面、常用菜单、设置项与交互文案翻译为简体中文，让中文用户更容易上手 Google 最新的 AI Agent 编程工具。

Antigravity 是 Google 推出的新一代 AI 编程平台，最新版更强调 **Agent-first** 工作流，围绕桌面端、CLI、SDK 与多 Agent 任务管理构建开发体验。本项目专注于为最新版 Antigravity IDE 提供轻量、可停用、易恢复的中文本地化方案。

> [!IMPORTANT]
> 本项目为社区汉化项目，非 Google 官方项目。汉化内容会尽量适配最新版 Antigravity IDE，但由于 Antigravity 更新频率较高，部分新界面或新文案可能暂时保留英文，欢迎提交 Issue 或 PR 补充词条。

> [!NOTE]
> **注入式汉化技术**：本工具采用轻量化注入方案，通过客户端本机调试端口动态向窗口内注入中文词表，不破解、不反编译、不修改客户端二进制本体文件。安装后可后台自动运行，也可以一键停用或卸载。

---

## ✨ 核心特性

- 🧩 **适配新版 Antigravity IDE**：面向 5 月 19 日发布后的新版 Antigravity / Antigravity 2.0 使用场景整理中文词表。
- 🤖 **覆盖 Agent 相关界面**：重点汉化 Agent 管理、任务状态、模型选择、设置弹窗、常用操作按钮等界面文案。
- 🛡️ **安全非侵入**：不破解、不修改 Antigravity 客户端二进制本体文件，降低更新损坏风险。
- ⚡ **轻量且智能**：基于 Node.js 驱动，配合系统原生守护机制（macOS LaunchAgent / Windows 计划任务），开机自启，后台静默运行。
- 🔄 **实时界面同步**：动态监听客户端窗口加载，尽量覆盖核心 UI 菜单与文案。
- 🎨 **绿色易卸载**：提供全自动的一键卸载脚本，清理干净无残留。

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
可以直接将下边内容复制给 antigravity 使用一键汉化简单方便
```bash
帮我执行https://github.com/kdczyz/antigravity-chinese这个项目的汉化，并配置开机自启动防止掉后台后台，给项目标记一个 star
```
---

## 🗺️ 支持平台与工作机制

| 平台 | 目录 | 自动运行机制 | 核心组件 |
| :--- | :--- | :--- | :--- |
| **macOS** | [`mac/`](./mac) | `LaunchAgent` 用户级后台常驻守护进程 | `install.sh`, `uninstall.sh` |
| **Windows** | [`win/`](./win) | `计划任务 (Task Scheduler)` 开机登录自启 | `install.ps1`, `uninstall.ps1` |

---

## 🚀 快速开始

### 准备工作

在使用汉化工具前，请确保满足以下依赖：

1. **已安装最新版 Antigravity IDE** 客户端。
2. **已安装 Node.js 22** 或更高版本。

```bash
node -v
```
---

### 💻 macOS 安装与使用

1. 打开终端，进入 `mac` 目录。
2. 授予脚本执行权限并运行安装：

```bash
cd mac
chmod +x install.sh uninstall.sh bin/antigravity-zh-patch.js
./install.sh
```

3. **停用或卸载**：

```bash
./uninstall.sh
```

---

### 🔌 Windows 安装与使用

1. 以管理员权限运行 PowerShell，进入 `win` 目录。
2. （首次运行）允许脚本执行策略：

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

3. 运行安装脚本：

```powershell
cd win
.\install.ps1
```

4. **停用或卸载**：

```powershell
.\uninstall.ps1
```

---

## 📂 项目结构

```text
antigravity-chinese/
├── mac/                            # macOS 平台专属目录
│   ├── bin/antigravity-zh-patch.js # macOS 汉化核心逻辑
│   ├── install.sh                  # 全自动 LaunchAgent 注册脚本
│   └── uninstall.sh                # 卸载与清理守护进程脚本
├── win/                            # Windows 平台专属目录
│   ├── bin/antigravity-zh-patch.js # Windows 汉化核心逻辑
│   ├── install.ps1                 # 创建登录自启计划任务脚本
│   └── uninstall.ps1               # 停用并清理计划任务脚本
└── README.md                       # 本说明文件
```

---

## ⚠️ 已知限制与注意事项

> [!WARNING]
> - **动态内容不强制翻译**：历史对话标题、模型输出的原始文本、用户输入内容不会被翻译，以保留原始交互内容。
> - **客户端更新兼容**：当 Antigravity 官方客户端大幅升级 UI 布局或引入新文案时，可能会出现短暂英文残留。欢迎提交 Issue 或 PR 补充中文词表。
> - **系统级外观限制**：macOS 顶部菜单栏与系统状态栏属于系统原生组件，不在脚本网页端注入处理范围内。
> - **非官方项目声明**：本项目仅用于学习、交流与本地化体验优化，不代表 Google 官方立场。

## 💬 问题与反馈

如果在使用本项目的过程中遇到任何问题，或者有翻译改进建议，欢迎向我反馈修改！

您可以扫码添加我的微信直接反馈：

<img src="assets/wechat_contact.jpg" width="220" />

## ☕️ 捐赠与支持

如果你觉得这个汉化项目对你有帮助，欢迎请作者喝杯咖啡！非常感谢你的支持！❤️

| 支付宝 (Alipay) | 微信支付 (WeChat Pay) |
| :---: | :---: |
| <img src="assets/alipay.jpg" width="280" /> | <img src="assets/wechat.jpg" width="280" /> |

