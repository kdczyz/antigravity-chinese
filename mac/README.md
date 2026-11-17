# 🍎 macOS 版 Antigravity 中文汉化脚本

[![Platform: macOS](https://img.shields.io/badge/Platform-macOS-apple.svg)]()
[![LaunchAgent](https://img.shields.io/badge/Startup-LaunchAgent-orange.svg)]()

本目录提供了针对 macOS 版 **Antigravity** 的专属汉化守护进程实现（v2.18.1，词库 2836 条）。它通过创建用户级别的 `LaunchAgent` 守护，在您每次登录系统后自动在后台运行，并在 Antigravity 启动时动态注入中文翻译词表。

---

## 🛠️ 工作原理

1. **守护进程**：使用 macOS 标准的 `launchd` 服务，通过 `LaunchAgent` 注册自启动任务。
2. **端口检测**：在后台静默轮询 Antigravity 的本地调试端口（由 App 原生开启）。
3. **注入词表**：一旦检测到客户端开启，自动建立调试连接并动态注入汉化脚本。
4. **非侵入式**：完全不破坏 Antigravity 的二进制程序签名与沙盒环境。

---

## 🚀 安装与更新

请在终端（Terminal）中运行以下指令来完成安装：

```bash
# 1. 进入 macOS 专属目录
cd mac

# 2. 赋予脚本可执行权限
chmod +x install.sh uninstall.sh bin/antigravity-zh-patch.js

# 3. 运行全自动安装脚本
./install.sh
```

> [!NOTE]
> **自动寻址技术**：`install.sh` 脚本非常智能，它会自动解析您当前的绝对路径以及系统用户名，无需手动编辑 plist 配置文件，一键开箱即用。

---

## 🔌 停用与卸载

如果您需要临时停用或完全清理汉化服务，请在终端执行：

```bash
cd mac
./uninstall.sh
```
此脚本将安全停止后台守护进程并从系统 `~/Library/LaunchAgents/` 中彻底清除对应的 `.plist` 配置文件，保证系统干净无残留。

---

## 📂 目录结构说明

- 📄 `bin/antigravity-zh-patch.js`：核心汉化逻辑，包含了注入程序与中文翻译对照字典。
- 📄 `launchagents/com.a1412.antigravity.zhpatch.plist`：用于常驻后台的 `LaunchAgent` 模板文件。
- 📂 `logs/`：包含后台运行的标准输出与错误日志（`zhpatch.log`、`zhpatch.err.log`），方便调试排查。
- 📄 `install.sh`：自动配置、注册并加载守护进程的安装脚本。
- 📄 `uninstall.sh`：停止并安全卸载守护进程的清理脚本。
