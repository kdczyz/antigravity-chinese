#!/usr/bin/env node
'use strict';

const { execFileSync, spawn } = require('child_process');

const overlaySource = String.raw`
(() => {
  if (window.__antigravityZhPatchInstalled === 18) return;
  if (window.__antigravityZhPatchObserver) {
    try { window.__antigravityZhPatchObserver.disconnect(); } catch {}
  }
  window.__antigravityZhPatchInstalled = 18;

  const phrases = new Map([
    ['New Conversation', '新建对话'],
    ['Conversation History', '对话历史'],
    ['Conversation', '对话'],
    ['Pinned Conversations', '已固定对话'],
    ['Pinned Conversation', '已固定对话'],
    ['Pinned', '已固定'],
    ['Other Conversations', '其他对话'],
    ['Standalone Conversation', '独立对话'],
    ['Parent Conversation', '父对话'],
    ['New conversation', '新建对话'],
    ['New standalone conversation, outside of projects.', '新建独立对话，不属于任何项目。'],
    ['Open Conversation', '打开对话'],
    ['Open Conversation History', '打开对话历史'],
    ['Open Conversation Picker', '打开对话选择器'],
    ['Conversation picker', '对话选择器'],
    ['Search conversations...', '搜索对话...'],
    ['Search conversations (by name or Cascade ID)', '搜索对话（按名称或 Cascade ID）'],
    ['Search all convos...', '搜索全部对话...'],
    ['Search by name or Cascade ID...', '按名称或 Cascade ID 搜索...'],
    ['Mark as Read', '标记为已读'],
    ['Mark as Unread', '标记为未读'],
    ['Mark As Read', '标记为已读'],
    ['Mark As Unread', '标记为未读'],
    ['Rename', '重命名'],
    ['Edit Conversation Title', '编辑对话标题'],
    ['Delete Conversation', '删除对话'],
    ['Archive Conversation', '归档对话'],
    ['Archive / Restore', '归档 / 恢复'],
    ['Restore Conversation', '恢复对话'],
    ['Pin Conversation', '固定对话'],
    ['Unpin Conversation', '取消固定对话'],
    ['Archive this conversation', '归档此对话'],
    ['Copy conversation markdown', '复制对话 Markdown'],
    ['Conversation copied as Markdown to clipboard', '对话已作为 Markdown 复制到剪贴板'],
    ['Copy the trajectory ID', '复制轨迹 ID'],
    ['Copy trajectory ID', '复制轨迹 ID'],
    ['View Debug', '查看调试信息'],
    ['Delete Permanently', '永久删除'],
    ['Deleted', '已删除'],
    ['Archived', '已归档'],
    ['See less', '收起'],
    ['Scheduled Tasks', '定时任务'],
    ['Projects', '项目'],
    ['Project', '项目'],
    ['Project picker', '项目选择器'],
    ['Project Settings', '项目设置'],
    ['Project General', '项目常规'],
    ['Project Folders', '项目文件夹'],
    ['Project Agent', '项目智能体'],
    ['Project Detected', '检测到项目'],
    ['Create Project', '创建项目'],
    ['Create New Project', '创建新项目'],
    ['Create a Project', '创建项目'],
    ['Creating a Project', '正在创建项目'],
    ['Delete Project', '删除项目'],
    ['Open Project Picker', '打开项目选择器'],
    ['Open project settings', '打开项目设置'],
    ['Search projects...', '搜索项目...'],
    ['Project name. E.g. Tasks', '项目名称，例如 Tasks'],
    ['Project validation failed', '项目验证失败'],
    ['Projects serve as your workspace where your agents work. Each project has its own file scope and permissions. ', '项目是智能体工作的工作区。每个项目都有自己的文件范围和权限。'],
    ['Getting started with a Project', '开始使用项目'],
    ['Conversations', '对话'],
    ['Settings', '设置'],
    ['Select Project', '选择项目'],
    ['Ask anything, @ to mention, / for actions', '想问什么都可以，@ 引用，/ 执行动作'],
    ['No agents running', '没有正在运行的代理'],
    ['Open App', '打开应用'],
    ['Quit', '退出'],
    ['Cancel', '取消'],
    ['Confirm Quit', '确认退出'],
    ['High', '高'],
    ['Medium', '中'],
    ['Low', '低'],
    ['Explore the new Antigravity', '探索新版 Antigravity'],
    ['Download the Antigravity IDE', '下载 Antigravity IDE'],
    ['Welcome to the new Antigravity!', '欢迎使用新版 Antigravity！'],
    ['Loading Antigravity', '正在加载 Antigravity'],
    ['Allow running this command?', '允许运行此命令？'],
    ['Yes, allow this time', '是，仅允许本次'],
    ['No (tell the agent what to do instead)', '否（告诉智能体改做什么）'],
    ['Skip', '跳过'],
    ['Submit', '提交'],
    ['Worked for 2m', '已工作 2 分钟'],
    ['now', '刚刚'],
    ['Add context', '添加上下文'],
    ['Agent response', '智能体回复'],
    ['User message', '用户消息'],
    ['Good response', '好评'],
    ['Bad response', '差评'],
    ['Copy', '复制'],
    ['Display Options', '显示选项'],
    ['Edit', '编辑'],
    ['Add', '添加'],
    ['Go Back', '后退'],
    ['Go Forward', '前进'],
    ['Message input', '消息输入框'],
    ['Record voice memo', '录制语音备忘'],
    ['Sidebar', '侧边栏'],
    ['Toggle Auxiliary Pane', '切换辅助面板'],
    ['Toggle Sidebar', '切换侧边栏'],
    ['Typeahead menu', '自动补全菜单'],
    ['General', '常规'],
    ['Account', '账户'],
    ['Not Signed In', '未登录'],
    ['Sign in to use Antigravity!', '登录以使用 Antigravity！'],
    ['Sign In', '登录'],
    ['Sign Out', '退出登录'],
    ['Permissions', '权限'],
    ['Appearance', '外观'],
    ["Configure the agent's visual theme and display preferences.", '配置智能体的视觉主题和显示偏好。'],
    ['Models', '模型'],
    ['Customizations', '自定义'],
    ['Customize', '自定义'],
    ['Browser', '浏览器'],
    ['Configure the browser subagent. It requires Google Chrome to be installed. The browser subagent can be invoked by typing /browser in the conversation input box.', '配置浏览器子智能体。这需要安装 Google Chrome。在对话输入框中输入 /browser 即可调用。'],
    ['Configure the browser subagent. It requires ', '配置浏览器子智能体。这需要安装 '],
    [' to be installed. The browser subagent can be invoked by typing /browser in the conversation input box.', '。在对话输入框中输入 /browser 即可调用浏览器子智能体。'],
    ['MCP Error', 'MCP 错误'],
    ['App', '应用'],
    ['Application', '应用'],
    ['Manage Antigravity app settings.', '管理 Antigravity 应用设置。'],
    ['Keep the app accessible from the menu bar and running in the background when all windows are closed.', '当所有窗口关闭时，保持应用在菜单栏可用并在后台运行。'],
    ['Automatic Check for Updates', '自动检查更新'],
    ['Automatically prompt you to restart the app when a new update is available. When disabled, you can check for updates manually from the app menu.', '有新更新时自动提示重启应用。禁用后，您可以从应用菜单手动检查更新。'],
    ['Not in Project', '未在项目中'],
    ['Agent Settings', '智能体设置'],
    ['Agent 设置', '智能体设置'],
    ['Agent Behavior', '智能体行为'],
    ['Local Permissions', '本地权限'],
    ['Local 权限', '本地权限'],
    ['Security Preset', '安全预设'],
    ['Manually customize individual settings.', '手动自定义各项设置。'],
    ['Custom', '自定义'],
    ['Outside of folders file access policy', '文件夹外访问策略'],
    ['Terminal Command Auto Execution', '终端命令自动执行'],
    ['Require Review', '需要审核'],
    ['Request Review', '请求审核'],
    ['Always Proceed', '始终继续'],
    ['Proceed in Sandbox', '在沙盒中继续'],
    ['Allow Once', '允许一次'],
    ['Allow once', '允许一次'],
    ['Always Allow', '始终允许'],
    ['Allow in Conversation', '在本次对话中允许'],
    ['Allow options', '允许选项'],
    ['Disabled', '已禁用'],
    ['Enabled', '已启用'],
    ['Value:', '当前值：'],
    ['Enable Sandbox Mode (Preview)', '启用沙盒模式（预览）'],
    ['Artifact Review Policy', '产物审核策略'],
    ['Always Ask', '始终询问'],
    ['File Access Rules', '文件访问规则'],
    ['Network Access Rules', '网络访问规则'],
    ['Terminal Commands', '终端命令'],
    ['Commands Outside Sandbox', '沙盒外命令'],
    ['MCP Tools', 'MCP 工具'],
    ['Allow List Terminal Commands', '终端命令允许列表'],
    ['Deny List Terminal Commands', '终端命令拒绝列表'],
    ['Review Policy', '审核策略'],
    ['Auto-Execution Policy', '自动执行策略'],
    ['Agent Non-Workspace File Access', '智能体非工作区文件访问'],
    ['Enable Shell Integration', '启用 Shell 集成'],
    ['Advanced File Access', '高级文件访问'],
    ['Advanced Command Access', '高级命令访问'],
    ['Advanced Web Access', '高级网页访问'],
    ['File Access', '文件访问'],
    ['Workspace File Access', '工作区文件访问'],
    ['Workspace Command Access', '工作区命令访问'],
    ['File Permissions', '文件权限'],
    ['Network Permissions', '网络权限'],
    ['Terminal & Tooling Permissions', '终端与工具权限'],
    ['Project-Specific Settings', '项目专属设置'],
    ['No projects found', '未找到项目'],
    ['New Project', '新建项目'],
    ['Quick Start', '快速开始'],
    ['No Project', '无项目'],
    ['Not in Project', '未在项目中'],
    ['Outside of Project', '项目外'],
    ['Local', '本地'],
    ['New Conversation in Project', '在项目中新建对话'],
    ['New Conversation in Workspace', '在工作区中新建对话'],
    ['New Workspace', '新建工作区'],
    ['New Worktree', '新建工作树'],
    ['Previous Worktrees', '以前的工作树'],
    ['Group By', '分组方式'],
    ['Status', '状态'],
    ['None', '无'],
    ['Sort Conversations', '排序对话'],
    ['Sort Conversation', '排序对话'],
    ['Last Updated', '最近更新'],
    ['Alphabetical (A-Z)', '按字母顺序 (A-Z)'],
    ['Date Added', '添加日期'],
    ['Subtitles', '副标题'],
    ['Worktree', '工作树'],
    ['No Subtitle', '无副标题'],
    ['Open Workspace', '打开工作区'],
    ['Open Workspace Selector', '打开工作区选择器'],
    ['Open Folder', '打开文件夹'],
    ['Add Folder', '添加文件夹'],
    ['Close Folder', '关闭文件夹'],
    ['Missing Folder', '缺失文件夹'],
    ['Missing Folders', '缺失文件夹'],
    ['Folder no longer exists or is unavailable.', '文件夹不再存在或不可用。'],
    ['Configure global allowed and denied resource permissions.', '配置全局允许和拒绝的资源权限。'],
    ['Modify scoped permissions, folders, and agent settings like Sandbox and Terminal Command Execution.', '修改作用域权限、文件夹，以及沙盒和终端命令执行等智能体设置。'],
    ['Go to Projects', '前往项目'],
    ['File Reads', '文件读取'],
    ['File Writes', '文件写入'],
    ['Read Files', '读取文件'],
    ['Write Files', '写入文件'],
    ['Read URLs', '读取 URL'],
    ['Execute URLs', '执行 URL'],
    ['Read', '读取'],
    ['Use', '使用'],
    ['Open', '打开'],
    ['global settings', '全局设置'],
    ['Learn more', '了解更多'],
    ['Shortcuts', '快捷键'],
    ['Provide Feedback', '提供反馈'],
    ['Send Feedback', '发送反馈'],
    ['Feedback', '反馈'],
    ['Feedback Type', '反馈类型'],
    ['General Feedback', '一般反馈'],
    ['Agent settings and permissions for conversations outside of projects.', '为项目外对话配置智能体设置和权限。'],
    ['Agent settings and permissions can be further customized below.', '可以在下方进一步自定义智能体设置和权限。'],
    ['Agents have full access to your machine and external resources.', '智能体可完整访问你的电脑和外部资源。'],
    ['Agents run in a secure sandbox that restricts access to external resources outside of your trusted folders.', '智能体会在安全沙盒中运行，限制其访问受信任文件夹之外的外部资源。'],
    ['Choose a predefined security preset for the agent. This controls terminal auto-execution policy, and file access policy.', '为智能体选择预设安全策略。它会控制终端自动执行策略和文件访问策略。'],
    ['Configures how the agent tries to access files outside of its working folders.', '配置智能体如何访问工作文件夹之外的文件。'],
    ['Controls whether terminal commands require your approval before running.', '控制终端命令运行前是否需要你的批准。'],
    ['Restricts agent tools to a secure, isolated local sandbox.', '将智能体工具限制在安全隔离的本地沙盒中。'],
    ["Specifies Agent's behavior when asking for review on artifacts, which are documents it creates to enable richer conversation experience.", '指定智能体在请求审核产物时的行为；产物是它创建的文档，用来支持更丰富的对话体验。'],
    ["Specifies Agent's behavior when asking for review on artifacts, which are documents it creates to enable a richer conversation experience.", '指定智能体在请求审核产物时的行为；产物是它创建的文档，用来支持更丰富的对话体验。'],
    ['Inherit General', '继承常规设置'],
    ['Inherit general', '继承常规设置'],
    ['Inherits your General settings when working in this project.', '在此项目中工作时继承常规设置。'],
    ['Inherits your general settings when working in this project.', '在此项目中工作时继承常规设置。'],
    ['Requires manual review for all terminal commands and file accesses outside of the working folders.', '对所有终端命令以及工作文件夹外的文件访问都需要手动审核。'],
    ['Full machine', '完整本机访问'],
    ['Full Machine', '完整本机访问'],
    ['Full Machine Access', '完整本机访问'],
    ['All terminal commands require review. The agent can read or write to any file in the machine.', '所有终端命令需要审核。智能体可以读写本机上的任意文件。'],
    ['Turbo mode', 'Turbo 模式'],
    ['Turbo Mode', 'Turbo 模式'],
    ['Disables all safety barriers for maximal iteration velocity.', '禁用所有安全防护以获得最大迭代速度。'],
    ['Manage project folders, agent settings, and permissions.', '管理项目文件夹、智能体设置与权限。'],
    ['Folders', '文件夹'],
    ['Also includes global settings when working in this project.', '在此项目中工作时也包含全局设置。'],
    ['Also includes global settings when working outside of projects.', '在项目外工作时也包含全局设置。'],
    ['Configure agent execution, queued message delivery, and permissions.', '配置智能体执行、排队消息发送以及权限。'],
    ['Execution', '执行'],
    ['Queued Messages', '排队消息'],
    ['Configure when follow-up messages are sent.', '配置后续消息的发送时机。'],
    ['Queue', '排队'],
    ['Send Immediately', '立即发送'],
    ['Keyboard shortcuts', '快捷键'],
    ['Learn more about ', '了解关于 '],
    ['了解更多 about ', '了解关于 '],
    ['Inherits from global settings. Local permissions have higher priority.', '继承全局设置。本地权限优先级更高。'],
    ['Configure allowed and denied paths for file reads and writes.', '配置允许和拒绝读写的文件路径。'],
    ['Configure allowed and denied URLs for reading.', '配置允许和拒绝读取的 URL。'],
    ['Configure allowed terminal commands.', '配置允许的终端命令。'],
    ['Configure allowed commands outside the sandbox.', '配置允许在沙盒外运行的命令。'],
    ['Configure external tools via Model Context Protocol.', '配置通过 Model Context Protocol 使用的外部工具。'],
    ['Allow/deny agent read access to specific files or directories.', '允许或拒绝智能体读取指定文件或目录。'],
    ['Allow/deny agent write access to specific files or directories.', '允许或拒绝智能体写入指定文件或目录。'],
    ['Allow/deny agent read access to specific URLs or domains.', '允许或拒绝智能体读取指定 URL 或域名。'],
    ['Allow/deny specific terminal commands.', '允许或拒绝指定终端命令。'],
    ['Allow/deny agent command execution outside the sandbox.', '允许或拒绝智能体在沙盒外执行命令。'],
    ['External tools the agent can call via Model Context Protocol.', '智能体可通过 Model Context Protocol 调用的外部工具。'],
    ['Paths the agent can read.', '智能体可读取的路径。'],
    ['Paths the agent can modify.', '智能体可修改的路径。'],
    ['Terminal commands the agent can execute.', '智能体可执行的终端命令。'],
    ['Commands the agent can run outside the sandbox.', '智能体可在沙盒外运行的命令。'],
    ['URLs the agent can read or open in the browser.', '智能体可读取或在浏览器中打开的 URL。'],
    ['URLs the agent can actuate on using the browser.', '智能体可通过浏览器执行操作的 URL。'],
    ['Enter file or directory path...', '输入文件或目录路径...'],
    ['Enter command (e.g., git, blaze)...', '输入命令（例如 git、blaze）...'],
    ['Enter tool name or server...', '输入工具名称或服务器...'],
    ['Enter URL pattern...', '输入 URL 匹配模式...'],
    ['Confirm the command is safe to run outside of the sandbox with full network and disk access.', '确认该命令可在沙盒外安全运行，并拥有完整网络和磁盘访问权限。'],
    ['Edit permission target', '编辑权限目标'],
    ['Click to copy full command', '点击复制完整命令'],
    ['Confirmation required to execute this step', '执行此步骤需要确认'],
    ['Confirm Browser Interaction', '确认浏览器交互'],
    ['Deny setting up browser', '拒绝设置浏览器'],
    ['Launching the browser...', '正在启动浏览器...'],
    ['The agent will wait for you to install the browser extension.', '智能体会等待你安装浏览器扩展。'],
    ['Antigravity would like to use the browser.', 'Antigravity 想要使用浏览器。'],
    ['Enable Browser Tools', '启用浏览器工具'],
    ['When enabled, Agent can use browser tools to open URLs, read web pages, and interact with browser content. This allows the Agent access to important (and often critical) knowledge and methods of validation, but any browser integration does increase exposure to external malicious parties for security exploits.', '启用后，智能体可以使用浏览器工具打开 URL、读取网页并与浏览器内容交互。这能让智能体获取重要知识和验证方式，但任何浏览器集成都可能增加遭受外部恶意利用的风险。'],
    ['Browser Javascript Execution Policy', '浏览器 JavaScript 执行策略'],
    ['Actuation Permissions', '操作权限'],
    ['Actuation 权限', '操作权限'],
    ['Browser Actuation Rules', '浏览器操作规则'],
    ['Configure the browser subagent. It requires Google Chrome to be installed. The browser subagent can be invoked by typing /browser in the conversation input box.', '配置浏览器子智能体。它需要安装 Google Chrome。你可以在对话输入框中输入 /browser 来调用浏览器子智能体。'],
    ['Configure allowed and denied URLs for browser actuation.', '配置允许和拒绝浏览器执行操作的 URL。'],
    ['Allow/deny agent browser actuation access to specific URLs.', '允许或拒绝智能体对指定 URL 执行浏览器操作。'],
    ['Controls whether the agent can run custom JavaScript to automate complex browser actions.', '控制智能体是否可以运行自定义 JavaScript 来自动化复杂浏览器操作。'],
    ['Block all browser JavaScript execution.', '阻止所有浏览器 JavaScript 执行。'],
    ['Prompt for approval before running browser scripts.', '运行浏览器脚本前请求批准。'],
    ['Allow full browser script execution without prompting.', '允许完整执行浏览器脚本且不再提示。'],
    ['Chrome Binary Path', 'Chrome 可执行文件路径'],
    ['Path to the Chrome/Chromium executable. Leave empty for auto-detection.', 'Chrome/Chromium 可执行文件路径。留空则自动检测。'],
    ['Browser User Profile Path', '浏览器用户资料路径'],
    ['Custom path for the browser user profile directory. Leave empty for default (~/.gemini/antigravity-browser-profile).', '浏览器用户资料目录的自定义路径。留空则使用默认路径（~/.gemini/antigravity-browser-profile）。'],
    ['Browser CDP Port', '浏览器 CDP 端口'],
    ['Port number for Chrome DevTools Protocol remote debugging. Leave empty for default (9222).', 'Chrome DevTools Protocol 远程调试端口号。留空则使用默认值（9222）。'],
    ['Configure AI models and view your quota.', '配置 AI 模型并查看额度。'],
    ['Configure default behaviors, skills, and MCP servers.', '配置默认行为、技能和 MCP 服务器。'],
    ['Token Usage', 'Token 使用量'],
    ['The breakdown below shows token usage from customizations like skills, rules, and MCP. If the budget is exceeded, large customizations will be truncated automatically.', '下面的明细展示技能、规则和 MCP 等自定义内容的 Token 使用量。如果超出预算，较大的自定义内容会被自动截断。'],
    ['No customizations found for this workspace.', '此工作区没有找到自定义内容。'],
    ['Installed MCP Servers', '已安装的 MCP 服务器'],
    ['Add MCP', '添加 MCP'],
    ['No MCP Servers', '没有 MCP 服务器'],
    ["You currently don't have any MCP Servers installed. Add an MCP server above", '你当前还没有安装任何 MCP 服务器。请在上方添加 MCP 服务器。'],
    ['Build With Google Plugins', '使用 Google 插件构建'],
    ['Build With Google 插件', '使用 Google 插件构建'],
    ['App Settings', '应用设置'],
    ['Manage application settings.', '管理应用设置。'],
    ['Prevent Sleep', '防止睡眠'],
    ['Prevent the computer from sleeping while the app is running.', '应用运行时防止电脑进入睡眠。'],
    ['Keep In Menu Bar', '保留在菜单栏'],
    ['The app will be accessible from the menu bar and will keep running in the background when all windows are closed.', '应用可从菜单栏访问，并会在所有窗口关闭后继续在后台运行。'],
    ['Notifications', '通知'],
    ['Notification Settings', '通知设置'],
    ['Notification 设置', '通知设置'],
    ["To modify notification settings, open your operating system's system preferences.", '要修改通知设置，请打开操作系统的系统设置。'],
    ['Open System Preferences', '打开系统设置'],
    ['Manage your plan, credentials, and general preferences.', '管理你的套餐、凭据和通用偏好设置。'],
    ['Enable Telemetry', '启用遥测'],
    ['When toggled on, Antigravity collects usage data to help Google enhance performance and features.', '开启后，Antigravity 会收集使用数据，帮助 Google 改进性能和功能。'],
    ['Marketing Emails', '营销邮件'],
    ['Receive product updates, tips, and promotions from Google Antigravity via email.', '通过电子邮件接收 Google Antigravity 的产品更新、技巧和促销信息。'],
    ['Your Plan: Google AI Pro', '你的套餐：Google AI Pro'],
    ['You can upgrade to a Google AI Ultra plan to receive the highest rate limits.', '你可以升级到 Google AI Ultra 套餐以获得最高速率限制。'],
    ['Upgrade', '升级'],
    ['Email', '邮箱'],
    ['Sign Out', '退出登录'],
    ['By using this app, you agree to its', '使用本应用即表示你同意其'],
    ['Terms of Service', '服务条款'],
    ['Refresh', '刷新'],
    ['Search', '搜索'],
    ['Searching', '正在搜索'],
    ['Searched', '已搜索'],
    ['Search files...', '搜索文件...'],
    ['Search across files...', '跨文件搜索...'],
    ['Search for files in the project...', '在项目中搜索文件...'],
    ['Search tasks...', '搜索任务...'],
    ['Search MCP servers by name', '按名称搜索 MCP 服务器'],
    ['Search for MCP servers to add to your configuration', '搜索要添加到配置中的 MCP 服务器'],
    ['Open Settings', '打开设置'],
    ['Open Preferences', '打开偏好设置'],
    ['Open Keyboard Shortcuts', '打开键盘快捷键'],
    ['Open Command Palette', '打开命令面板'],
    ['Open System Browser', '在系统浏览器中打开'],
    ['Open URL', '打开 URL'],
    ['Opened URL in Browser', '已在浏览器中打开 URL'],
    ['Opening URL in Browser', '正在浏览器中打开 URL'],
    ['Opened browser', '已打开浏览器'],
    ['Copy Command', '复制命令'],
    ['Copy Content', '复制内容'],
    ['Copy File Name', '复制文件名'],
    ['Copy File Path', '复制文件路径'],
    ['Copy Path', '复制路径'],
    ['Copy path', '复制路径'],
    ['Copy prompt', '复制提示词'],
    ['Copy to clipboard', '复制到剪贴板'],
    ['Copy debug info', '复制调试信息'],
    ['Copy full URL to clipboard', '复制完整 URL 到剪贴板'],
    ['Copy sign-in link', '复制登录链接'],
    ['Export', '导出'],
    ['Import AI Studio Project', '导入 AI Studio 项目'],
    ['Import failed:', '导入失败：'],
    ['Import success:', '导入成功：'],
    ['Import feature is not available in this context.', '当前上下文中无法使用导入功能。'],
    ['Model Credits', '模型积分'],
    ['Enable AI Credit Overages', '启用 AI 积分超额使用'],
    ["When toggled on, Antigravity will use your AI credits to fulfill model requests once you're out of model quota. Antigravity will always use your model quota first before using AI credits.", '开启后，当模型额度用完时，Antigravity 会使用 AI 积分完成模型请求。Antigravity 会始终先使用模型额度，再使用 AI 积分。'],
    ['Model Quota', '模型额度'],
    ['Models & Usage', '模型与用量'],
    ['Model & Usage', '模型与用量'],
    ['Models and Usage', '模型与用量'],
    ['Model and Usage', '模型与用量'],
    ['Usage & Limits', '用量与限制'],
    ['Usage and Limits', '用量与限制'],
    ['Usage & Quotas', '用量与配额'],
    ['Usage and Quotas', '用量与配额'],
    ['Manage your model quota and credits.', '管理您的模型配额与积分。'],
    ['Manage your model quota, credit balance, and rate limits.', '管理您的模型配额、积分余额与速率限制。'],
    ['Weekly Limit Remaining', '每周剩余额度'],
    ['Weekly Limit', '每周额度'],
    ['Five Hour Limit Remaining', '5 小时剩余额度'],
    ['Five Hour Limit', '5 小时额度'],
    ['5-Hour Limit Remaining', '5 小时剩余额度'],
    ['5-Hour Limit', '5 小时额度'],
    ['5 Hour Limit Remaining', '5 小时剩余额度'],
    ['5 Hour Limit', '5 小时额度'],
    ['Daily Limit Remaining', '每日剩余额度'],
    ['Daily Limit', '每日额度'],
    ['Monthly Limit Remaining', '每月剩余额度'],
    ['Monthly Limit', '每月额度'],
    ['Hourly Limit Remaining', '每小时剩余额度'],
    ['Hourly Limit', '每小时额度'],
    ['Limit Remaining', '剩余额度'],
    ['Quota Remaining', '剩余配额'],
    ['Rate Limits', '速率限制'],
    ['Rate Limit', '速率限制'],
    ['Credit Balance', '积分余额'],
    ['Credits Remaining', '剩余积分'],
    ['Claude and GPT models', 'Claude 与 GPT 模型'],
    ['Claude and GPT Models', 'Claude 与 GPT 模型'],
    ['Claude & GPT models', 'Claude 与 GPT 模型'],
    ['Claude & GPT Models', 'Claude 与 GPT 模型'],
    ['Gemini models', 'Gemini 模型'],
    ['Gemini Models', 'Gemini 模型'],
    ['Claude models', 'Claude 模型'],
    ['Claude Models', 'Claude 模型'],
    ['GPT models', 'GPT 模型'],
    ['GPT Models', 'GPT 模型'],
    ['Install IDE', '安装 IDE'],
    ['Show all', '显示全部'],
    ['Show less', '收起全部'],
    ['Show more', '显示更多'],
    ['See more', '查看更多'],
    ['Select Model', '选择模型'],
    ['Select Model to Send Message', '选择用于发送消息的模型'],
    ['No Model Selected', '未选择模型'],
    ['Add Model', '添加模型'],
    ['Add Custom Model', '添加自定义模型'],
    ['Edit Model', '编辑模型'],
    ['Edit Custom Model', '编辑自定义模型'],
    ['Best of N Models', 'Best of N 模型'],
    ['Best of N Settings', 'Best of N 设置'],
    ['Model quota reached', '模型额度已达上限'],
    ['Model quota exhausted', '模型额度已耗尽'],
    ['Model must be available on the Gemini API and use the gemini-api scheme.', '模型必须可在 Gemini API 中使用，并使用 gemini-api scheme。'],
    ['My Custom Gemini Model', '我的自定义 Gemini 模型'],
    ['No Model Selected', '未选择模型'],
    ['Chat Settings', '聊天设置'],
    ['Advanced Settings', '高级设置'],
    ['Editor Settings', '编辑器设置'],
    ['Auto-Open Edited Files', '自动打开已编辑文件'],
    ['Open files in the background if Agent creates or edits them', '当智能体创建或编辑文件时，在后台打开这些文件'],
    ['Open Agent on Reload', '重新加载时打开智能体'],
    ['Open Agent panel on window reload', '窗口重新加载时打开智能体面板'],
    ['Background Task', '后台任务'],
    ['Background Tasks', '后台任务'],
    ['Background Task Output', '后台任务输出'],
    ['Browser Task', '浏览器任务'],
    ['Analyzing Task Log', '正在分析任务日志'],
    ['Analyzed Task Log', '已分析任务日志'],
    ['Add Scheduled Task', '添加定时任务'],
    ['New Scheduled Task', '新建定时任务'],
    ['Back to Scheduled Tasks', '返回定时任务'],
    ['Cancel Task', '取消任务'],
    ['Cancel All Tasks', '取消全部任务'],
    ['Delete Task', '删除任务'],
    ['Disable Task', '禁用任务'],
    ['Enable Task', '启用任务'],
    ['Restart Task', '重启任务'],
    ['View your available model quota and AI credits. Model quota refreshes periodically based on your plan. Enable AI Credit Overages to continue using models when your quota is exhausted.', '查看可用的模型额度和 AI 积分。模型额度会根据你的计划定期刷新。启用 AI 积分超额使用后，可在额度耗尽时继续使用模型。'],
    ['Verbose Agent Chat', '详细智能体聊天'],
    ['Display and preserve intermediate thinking steps.', '显示并保留中间思考步骤。'],
    ['Conversation Width', '对话宽度'],
    ['Configure the maximum width of the conversation panel.', '配置对话面板的最大宽度。'],
    ['Light Theme', '浅色主题'],
    ['Dark Theme', '深色主题'],
    ['System Theme', '跟随系统'],
    ['Default Light', '默认浅色'],
    ['Default Dark', '默认深色'],
    ['Theme Preset', '主题预设'],
    ['Theme', '主题'],
    ['Themes', '主题'],
    ['Preset', '预设'],
    ['Presets', '预设'],
    ['Background', '背景色'],
    ['Foreground', '前景色'],
    ['Accent', '强调色'],
    ['Accent Color', '强调色'],
    ['Background Color', '背景颜色'],
    ['Foreground Color', '前景颜色'],
    ['Default', '默认'],
    ['Narrow', '窄'],
    ['Wide', '宽'],
    ['Full Width', '全宽'],
    ['Full width', '全宽'],
    ['Compact', '紧凑'],
    ['Comfortable', '舒适'],
    ['High Contrast Dark', '高对比度深色'],
    ['High Contrast Light', '高对比度浅色'],
    ['High Contrast', '高对比度'],
    ['Color Theme', '颜色主题'],
    ['Icon Theme', '图标主题'],
    ['Match OS', '跟随系统'],
    ['Match System', '跟随系统'],
    ['Follow System', '跟随系统'],
    ['Light mode', '浅色模式'],
    ['Dark mode', '深色模式'],
    ['System mode', '系统模式'],
    ['Font Family', '字体'],
    ['Font Size', '字号'],
    ['Line Height', '行高'],
    ['Code Font', '代码字体'],
    ['Editor Font', '编辑器字体'],
    ['Zoom Level', '缩放级别'],
  ]);

  function formatDuration(text) {
    if (!text) return '';
    return text
      .replace(/(\d+)\s*years?/gi, '$1 年')
      .replace(/(\d+)\s*months?/gi, '$1 个月')
      .replace(/(\d+)\s*weeks?/gi, '$1 周')
      .replace(/(\d+)\s*days?/gi, '$1 天')
      .replace(/(\d+)\s*hours?/gi, '$1 小时')
      .replace(/(\d+)\s*minutes?/gi, '$1 分钟')
      .replace(/(\d+)\s*seconds?/gi, '$1 秒')
      .replace(/,\s*/g, ' ')
      .trim();
  }

  const patterns = [
    [/See all \((\d+)\)/g, '查看全部 ($1)'],
    [/(\d+) agents running/g, '$1 个代理正在运行'],
    [/1 agent running/g, '1 个代理正在运行'],
    [/^(\d+)mo$/g, '$1 个月前'],
    [/^(\d+)y$/g, '$1 年前'],
    [/^(\d+)w$/g, '$1 周前'],
    [/^(\d+)d$/g, '$1 天前'],
    [/^(\d+)h$/g, '$1 小时前'],
    [/^(\d+)m$/g, '$1 分钟前'],
    [/^(\d+)s$/g, '$1 秒前'],
    [/Worked for (\d+)s/g, '已工作 $1 秒'],
    [/Worked for (\d+)m/g, '已工作 $1 分钟'],
    [/Worked for (\d+)h/g, '已工作 $1 小时'],
    [/浏览器 设置/g, '浏览器设置'],
    [/浏览器 操作权限/g, '浏览器操作权限'],
    [/应用 设置/g, '应用设置'],
    [/打开 System Preferences/g, '打开系统设置'],
    [/Pinned 对话/g, '已固定对话'],
    [/Toggle 侧边栏/g, '切换侧边栏'],
    [/Select model, current: (.+)/g, '选择模型，当前：$1'],
    [/Outside of 项目/g, '项目外'],
    [/应用lication/g, '应用'],
    [/自定义ize/g, '自定义'],
    [/100\.0% of the customization budget is available\./g, '自定义预算还剩 100.0%。'],
    [/(\d+(?:\.\d+)?)% of the customization budget is available\./g, '自定义预算还剩 $1%。'],
    [/Your Plan: (.+)/g, '你的套餐：$1'],
    [/You currently don't have any MCP Servers installed\. 添加 an MCP server above/g, '你当前还没有安装任何 MCP 服务器。请在上方添加 MCP 服务器。'],
    [/了解更多\./g, '了解更多。'],
    [/Project-Specific 设置/g, '项目专属设置'],
    [/Go to 项目/g, '前往项目'],
    [/File 权限/g, '文件权限'],
    [/Network 权限/g, '网络权限'],
    [/Terminal & Tooling 权限/g, '终端与工具权限'],
    [/Sort 对话/g, '排序对话'],
    [/Inherit (?:常规|General)/g, '继承常规设置'],
    [/Inherit (?:全局设置|Global|global)/g, '继承全局设置'],
    [/Inherits your (?:常规|General) settings when working in this project\./g, '在此项目中工作时继承常规设置。'],
    [/Inherits your (?:全局设置|global) settings when working outside of projects\./g, '在项目外工作时继承全局设置。'],
    [/Requires manual review for all terminal commands and file accesses outside of the working folders\./g, '对所有终端命令以及工作文件夹外的文件访问都需要手动审核。'],
    [/All terminal commands require review\. The agent can read or write to any file in the machine\./g, '所有终端命令需要审核。智能体可以读写本机上的任意文件。'],
    [/Disables all safety barriers for maximal iteration velocity\./g, '禁用所有安全防护以获得最大迭代速度。'],
    [/Full machine/g, '完整本机访问'],
    [/Turbo mode/g, 'Turbo 模式'],
    [/Turbo Mode/g, 'Turbo 模式'],
    [/Also includes (?:全局设置|global settings) when working in this project\./g, '在此项目中工作时也包含全局设置。'],
    [/Also includes (?:全局设置|global settings)/g, '也包含全局设置'],
    [/了解更多 about (.+)/g, (_match, topic) => {
      const clean = topic.trim();
      return '了解关于 ' + clean + (/[\u4e00-\u9fa5]$/.test(clean) ? '的更多信息' : ' 的更多信息');
    }],
    [/Learn more about (.+)/g, (_match, topic) => {
      const clean = topic.trim();
      return '了解关于 ' + clean + (/[\u4e00-\u9fa5]$/.test(clean) ? '的更多信息' : ' 的更多信息');
    }],
    [/Configure the browser subagent\.\s*It requires\s*/g, '配置浏览器子智能体。这需要安装 '],
    [/to be installed\.\s*The browser subagent can be invoked by typing \/browser in the conversation input box\./g, '。在对话输入框中输入 /browser 即可调用浏览器子智能体。'],
    [/to be installed\./g, '。'],
    [/The browser subagent can be invoked by typing \/browser in the conversation input box\./g, '在对话输入框中输入 /browser 即可调用浏览器子智能体。'],
    [/The browser subagent can be invoked by typing/g, '在对话输入框中输入'],
    [/\/browser in the conversation input box\./g, '/browser 即可调用浏览器子智能体。'],
    [/in the conversation input box\./g, '即可调用浏览器子智能体。'],
    [/Starting (?:the|a|A) (?:project|Project|项目)/g, '启动项目'],
    [/Starting (?:the|a|A) (.+)/g, (_match, target) => '启动' + (/^[\u4e00-\u9fa5]/.test(target.trim()) ? target.trim() : ' ' + target.trim())],
    [/对话 Width/g, '对话宽度'],
    [/Verbose Agent 对话/g, '详细智能体对话'],
    [/Verbose Agent 聊天/g, '详细智能体聊天'],
    [/模型 & Usage/g, '模型与用量'],
    [/模型 & 用量/g, '模型与用量'],
    [/Claude and GPT 模型/g, 'Claude 与 GPT 模型'],
    [/Claude & GPT 模型/g, 'Claude 与 GPT 模型'],
    [/Weekly Limit 剩余/g, '每周剩余额度'],
    [/Five Hour Limit 剩余/g, '5 小时剩余额度'],
    [/5-Hour Limit 剩余/g, '5 小时剩余额度'],
    [/You have used some of your (.+?) limit, it will fully refresh in (.+?)\.?$/gi, (_match, limit, time) => {
      const limitMap = {
        'weekly': '每周',
        'Weekly': '每周',
        '5-hour': '5 小时',
        '5-Hour': '5 小时',
        'five-hour': '5 小时',
        'Five-hour': '5 小时',
        'Five Hour': '5 小时',
        'five hour': '5 小时',
        'daily': '每日',
        'Daily': '每日',
        'monthly': '每月',
        'Monthly': '每月',
        'hourly': '每小时',
        'Hourly': '每小时',
      };
      const limitZh = limitMap[limit.trim()] ?? limit.trim();
      return '您已使用部分' + limitZh + '额度，将在 ' + formatDuration(time) + '后完全重置。';
    }],
    [/You have used all of your (.+?) limit, it will fully refresh in (.+?)\.?$/gi, (_match, limit, time) => {
      const limitMap = {
        'weekly': '每周',
        'Weekly': '每周',
        '5-hour': '5 小时',
        '5-Hour': '5 小时',
        'five-hour': '5 小时',
        'Five-hour': '5 小时',
        'Five Hour': '5 小时',
        'five hour': '5 小时',
        'daily': '每日',
        'Daily': '每日',
        'monthly': '每月',
        'Monthly': '每月',
        'hourly': '每小时',
        'Hourly': '每小时',
      };
      const limitZh = limitMap[limit.trim()] ?? limit.trim();
      return '您的' + limitZh + '额度已耗尽，将在 ' + formatDuration(time) + '后完全重置。';
    }],
    [/You have not used any of your (.+?) limit\.?/gi, (_match, limit) => {
      const limitMap = {
        'weekly': '每周',
        'Weekly': '每周',
        '5-hour': '5 小时',
        '5-Hour': '5 小时',
        'five-hour': '5 小时',
        'Five-hour': '5 小时',
        'Five Hour': '5 小时',
        'five hour': '5 小时',
        'daily': '每日',
        'Daily': '每日',
        'monthly': '每月',
        'Monthly': '每月',
        'hourly': '每小时',
        'Hourly': '每小时',
      };
      const limitZh = limitMap[limit.trim()] ?? limit.trim();
      return '您尚未消耗' + limitZh + '额度。';
    }],
    [/it will fully refresh in (.+?)\.?$/gi, (_match, time) => '将在 ' + formatDuration(time) + '后完全重置。'],
    [/it will refresh in (.+?)\.?$/gi, (_match, time) => '将在 ' + formatDuration(time) + '后刷新。'],
    [/^No$/g, '否'],
    [/^Allow$/g, '允许'],
    [/^Deny$/g, '拒绝'],
    [/^\(tell the agent what to do instead\)$/g, '（告诉智能体改做什么）'],
    [/Requesting permission to (read access to this path|write access to this path|reading this URL|executing actions on this URL|running this command|running this command outside the sandbox|using this MCP tool) (.+)/g, (_match, action, target) => {
      const actions = {
        'read access to this path': '读取此路径',
        'write access to this path': '写入此路径',
        'reading this URL': '读取此 URL',
        'executing actions on this URL': '在此 URL 上执行操作',
        'running this command': '运行此命令',
        'running this command outside the sandbox': '在沙盒外运行此命令',
        'using this MCP tool': '使用此 MCP 工具',
      };
      return '正在请求权限：' + (actions[action] ?? action) + ' ' + target;
    }],
    [/Agent needs permission to act on (.+)/g, '智能体需要权限才能操作 $1'],
    [/Agent needs permission to execute JavaScript on (.+)/g, '智能体需要权限才能在 $1 上执行 JavaScript'],
    [/Agent needs permission to execute JavaScript/g, '智能体需要权限才能执行 JavaScript'],
    [/Yes, save rule for '([^']+)' when not in a project/g, "是，并在未处于项目时保存 '$1' 的规则"],
    [/Yes, save rule for '([^']+)' in this project/g, "是，并在此项目中保存 '$1' 的规则"],
    [/Yes, save rule for '([^']+)' in this workspace/g, "是，并在此工作区保存 '$1' 的规则"],
    [/Yes, save rule for '([^']+)' globally/g, "是，并全局保存 '$1' 的规则"],
    [/Yes, save rule when not in a project/g, '是，并在未处于项目时保存规则'],
    [/Yes, save rule in this project/g, '是，并在此项目中保存规则'],
    [/Yes, save rule in this workspace/g, '是，并在此工作区保存规则'],
    [/Yes, save rule globally/g, '是，并全局保存规则'],
    [/Yes, and always allow '([^']+)' when not in a project/g, "是，并在未处于项目时始终允许 '$1'"],
    [/Yes, and always allow '([^']+)' in this project/g, "是，并在此项目中始终允许 '$1'"],
    [/Yes, and always allow '([^']+)' in this workspace/g, "是，并在此工作区始终允许 '$1'"],
    [/Yes, and always allow '([^']+)'/g, "是，并始终允许 '$1'"],
    [/Yes, and always allow when not in a project/g, '是，并在未处于项目时始终允许'],
    [/Yes, and always allow in this project/g, '是，并在此项目中始终允许'],
    [/Yes, and always allow in this workspace/g, '是，并在此工作区始终允许'],
    [/Yes, and always allow/g, '是，并始终允许'],
    [/Allow (.+)/g, '允许 $1'],
    [/Refreshes in (\d+) hours?, (\d+) minutes?/g, '$1 小时 $2 分钟后刷新'],
    [/\((Thinking)\)/g, '(思考)'],
    [/Gemini ([^(]+) \((High|Medium|Low)\)/g, (_match, model, effort) => 'Gemini ' + model.trim() + ' (' + (phrases.get(effort) ?? effort) + ')'],
    [/Antigravity has been redesigned to put agents first with new capabilities\. If you'd still like a code editor, you can download it as a separate app named Antigravity IDE\./g, 'Antigravity 已重新设计为智能体优先，并加入了新能力。如果你仍然需要代码编辑器，可以下载名为 Antigravity IDE 的独立应用。'],
  ];

  function translate(value) {
    if (!value || !/[A-Za-z]/.test(value)) return value;
    let next = value;
    for (const [source, target] of [...phrases].sort((a, b) => b[0].length - a[0].length)) {
      next = replacePhrase(next, source, target);
    }
    for (const [pattern, target] of patterns) next = next.replace(pattern, target);
    return next;
  }

  function escapeRegExp(value) {
    return value.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
  }

  function replacePhrase(value, source, target) {
    const escaped = escapeRegExp(source);
    const startsWord = /^[A-Za-z0-9]/.test(source);
    const endsWord = /[A-Za-z0-9]$/.test(source);
    const pattern = new RegExp((startsWord ? '(?<![A-Za-z0-9])' : '') + escaped + (endsWord ? '(?![A-Za-z0-9])' : ''), 'g');
    return value.replace(pattern, target);
  }

  function shouldSkip(node) {
    const element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
    return !!element?.closest?.('script, style, textarea, code, pre, .xterm, .monaco-editor');
  }

  function translateElement(element) {
    for (const attr of ['aria-label', 'title', 'placeholder', 'alt']) {
      const value = element.getAttribute?.(attr);
      if (!value) continue;
      const translated = translate(value);
      if (translated !== value) element.setAttribute(attr, translated);
    }
  }

  function translateNode(root) {
    if (!root) return;
    if (shouldSkip(root)) return;
    if (root.nodeType === Node.TEXT_NODE) {
      const translated = translate(root.nodeValue || '');
      if (translated !== root.nodeValue) root.nodeValue = translated;
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) return;
    if (root.nodeType === Node.ELEMENT_NODE) translateElement(root);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (shouldSkip(node)) continue;
      if (node.nodeType === Node.TEXT_NODE) {
        const translated = translate(node.nodeValue || '');
        if (translated !== node.nodeValue) node.nodeValue = translated;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        translateElement(node);
      }
    }
  }

  // ========== Conversation Title Auto-Translation ==========
  // AI-generated conversation titles are dynamic English phrases that can't be
  // handled by the static phrase map. We use a word-level dictionary + common
  // pattern approach to translate them into Chinese in real-time.

  const titleWordDict = new Map([
    // Common title words
    ['Basic', '基础'], ['Simple', '简单'], ['Quick', '快速'], ['Advanced', '高级'],
    ['New', '新建'], ['Create', '创建'], ['Update', '更新'], ['Delete', '删除'],
    ['Fix', '修复'], ['Debug', '调试'], ['Test', '测试'], ['Testing', '测试'],
    ['Setup', '设置'], ['Install', '安装'], ['Config', '配置'], ['Configure', '配置'],
    ['Configuration', '配置'], ['Implementation', '实现'], ['Implement', '实现'],
    ['Build', '构建'], ['Deploy', '部署'], ['Deployment', '部署'],
    ['Migration', '迁移'], ['Migrate', '迁移'],
    ['Refactor', '重构'], ['Refactoring', '重构'],
    ['Optimize', '优化'], ['Optimization', '优化'],
    ['Review', '审查'], ['Analysis', '分析'], ['Analyze', '分析'],
    ['Research', '研究'], ['Explore', '探索'], ['Exploration', '探索'],
    ['Design', '设计'], ['Plan', '计划'], ['Planning', '规划'],
    ['Architecture', '架构'], ['Structure', '结构'],
    ['Feature', '功能'], ['Function', '函数'], ['Functionality', '功能'],
    ['Component', '组件'], ['Module', '模块'], ['Service', '服务'],
    ['System', '系统'], ['Platform', '平台'], ['Framework', '框架'],
    ['Application', '应用'], ['App', '应用'], ['Tool', '工具'],
    ['Interface', '接口'], ['API', 'API'], ['SDK', 'SDK'],
    ['Database', '数据库'], ['Server', '服务器'], ['Client', '客户端'],
    ['Frontend', '前端'], ['Backend', '后端'], ['Fullstack', '全栈'],
    ['Web', '网页'], ['Mobile', '移动端'], ['Desktop', '桌面端'],
    ['User', '用户'], ['Admin', '管理员'], ['Dashboard', '仪表盘'],
    ['Login', '登录'], ['Auth', '认证'], ['Authentication', '认证'],
    ['Authorization', '授权'], ['Permission', '权限'], ['Security', '安全'],
    ['Error', '错误'], ['Bug', '缺陷'], ['Issue', '问题'],
    ['Problem', '问题'], ['Solution', '解决方案'], ['Resolution', '解决'],
    ['Help', '帮助'], ['Support', '支持'], ['Guide', '指南'],
    ['Tutorial', '教程'], ['Documentation', '文档'], ['Docs', '文档'],
    ['Code', '代码'], ['Script', '脚本'], ['File', '文件'], ['Files', '文件'],
    ['Folder', '文件夹'], ['Directory', '目录'], ['Path', '路径'],
    ['Page', '页面'], ['Pages', '页面'], ['Route', '路由'], ['Router', '路由器'],
    ['Style', '样式'], ['Theme', '主题'], ['Layout', '布局'],
    ['Form', '表单'], ['Input', '输入'], ['Output', '输出'],
    ['Button', '按钮'], ['Menu', '菜单'], ['Modal', '弹窗'],
    ['Table', '表格'], ['List', '列表'], ['Grid', '网格'],
    ['Chart', '图表'], ['Graph', '图形'], ['Image', '图片'],
    ['Icon', '图标'], ['Logo', '标志'], ['Avatar', '头像'],
    ['Text', '文本'], ['Content', '内容'], ['Data', '数据'],
    ['Model', '模型'], ['AI', 'AI'], ['Machine', '机器'],
    ['Learning', '学习'], ['Training', '训练'], ['Inference', '推理'],
    ['Chat', '聊天'], ['Message', '消息'], ['Notification', '通知'],
    ['Email', '邮件'], ['Alert', '警告'], ['Warning', '警告'],
    ['Report', '报告'], ['Log', '日志'], ['History', '历史'],
    ['Search', '搜索'], ['Filter', '筛选'], ['Sort', '排序'],
    ['Export', '导出'], ['Import', '导入'], ['Upload', '上传'],
    ['Download', '下载'], ['Sync', '同步'], ['Backup', '备份'],
    ['Restore', '恢复'], ['Reset', '重置'], ['Clear', '清除'],
    ['Add', '添加'], ['Remove', '移除'], ['Edit', '编辑'],
    ['Save', '保存'], ['Load', '加载'], ['Refresh', '刷新'],
    ['Open', '打开'], ['Close', '关闭'], ['Show', '显示'],
    ['Hide', '隐藏'], ['Enable', '启用'], ['Disable', '禁用'],
    ['Start', '启动'], ['Stop', '停止'], ['Pause', '暂停'],
    ['Resume', '恢复'], ['Restart', '重启'], ['Cancel', '取消'],
    ['Confirm', '确认'], ['Accept', '接受'], ['Reject', '拒绝'],
    ['Approve', '批准'], ['Deny', '拒绝'],
    ['Connect', '连接'], ['Disconnect', '断开'], ['Connection', '连接'],
    ['Network', '网络'], ['Request', '请求'], ['Response', '响应'],
    ['Header', '头部'], ['Footer', '底部'], ['Sidebar', '侧边栏'],
    ['Navigation', '导航'], ['Breadcrumb', '面包屑'], ['Tab', '标签'],
    ['Panel', '面板'], ['Window', '窗口'], ['Dialog', '对话框'],
    ['Popup', '弹出窗口'], ['Tooltip', '提示'],
    ['Progress', '进度'], ['Loading', '加载中'], ['Pending', '待处理'],
    ['Complete', '完成'], ['Completed', '已完成'], ['Done', '完成'],
    ['Success', '成功'], ['Failure', '失败'], ['Failed', '失败'],
    ['Status', '状态'], ['State', '状态'], ['Event', '事件'],
    ['Action', '操作'], ['Task', '任务'], ['Job', '作业'],
    ['Process', '进程'], ['Thread', '线程'], ['Queue', '队列'],
    ['Cache', '缓存'], ['Memory', '内存'], ['Storage', '存储'],
    ['Local', '本地'], ['Remote', '远程'], ['Cloud', '云'],
    ['Environment', '环境'], ['Variable', '变量'], ['Constant', '常量'],
    ['Type', '类型'], ['Class', '类'], ['Object', '对象'],
    ['Array', '数组'], ['String', '字符串'], ['Number', '数字'],
    ['Boolean', '布尔'], ['Null', '空'], ['Undefined', '未定义'],
    ['Key', '键'], ['Value', '值'], ['Pair', '对'],
    ['Map', '映射'], ['Set', '集合'], ['Iterator', '迭代器'],
    ['Loop', '循环'], ['Condition', '条件'], ['Switch', '切换'],
    ['Case', '情况'], ['Default', '默认'],
    ['Try', '尝试'], ['Catch', '捕获'], ['Throw', '抛出'],
    ['Promise', 'Promise'], ['Async', '异步'], ['Await', '等待'],
    ['Callback', '回调'], ['Handler', '处理器'], ['Listener', '监听器'],
    ['Observer', '观察者'], ['Pattern', '模式'], ['Strategy', '策略'],
    ['Template', '模板'], ['Factory', '工厂'], ['Singleton', '单例'],
    ['Proxy', '代理'], ['Adapter', '适配器'], ['Wrapper', '包装器'],
    ['Utility', '工具'], ['Helper', '辅助'], ['Utils', '工具集'],
    ['Common', '通用'], ['Shared', '共享'], ['Global', '全局'],
    ['Private', '私有'], ['Public', '公有'], ['Protected', '受保护'],
    ['Static', '静态'], ['Dynamic', '动态'], ['Abstract', '抽象'],
    ['Virtual', '虚拟'], ['Override', '覆盖'],
    ['Render', '渲染'], ['Rendering', '渲染'],
    ['Parse', '解析'], ['Parsing', '解析'], ['Parser', '解析器'],
    ['Format', '格式化'], ['Formatting', '格式化'], ['Formatter', '格式化器'],
    ['Validate', '验证'], ['Validation', '验证'], ['Validator', '验证器'],
    ['Convert', '转换'], ['Conversion', '转换'], ['Converter', '转换器'],
    ['Transform', '转换'], ['Transformation', '变换'],
    ['Encode', '编码'], ['Decode', '解码'], ['Encrypt', '加密'], ['Decrypt', '解密'],
    ['Compress', '压缩'], ['Decompress', '解压'],
    ['Serialize', '序列化'], ['Deserialize', '反序列化'],
    ['Initialize', '初始化'], ['Initialization', '初始化'],
    ['Cleanup', '清理'], ['Garbage', '垃圾'], ['Collection', '收集'],
    ['Performance', '性能'], ['Benchmark', '基准测试'],
    ['Profile', '性能分析'], ['Profiling', '性能分析'],
    ['Monitor', '监控'], ['Monitoring', '监控'],
    ['Trace', '追踪'], ['Tracing', '追踪'],
    ['Inspect', '检查'], ['Inspection', '检查'],
    ['Version', '版本'], ['Release', '发布'], ['Changelog', '更新日志'],
    ['Upgrade', '升级'], ['Downgrade', '降级'], ['Patch', '补丁'],
    ['Breaking', '破坏性'], ['Change', '变更'], ['Changes', '变更'],
    ['Commit', '提交'], ['Push', '推送'], ['Pull', '拉取'],
    ['Merge', '合并'], ['Branch', '分支'], ['Tag', '标签'],
    ['Repository', '仓库'], ['Repo', '仓库'], ['Clone', '克隆'],
    ['Fork', '分叉'], ['Diff', '差异'], ['Conflict', '冲突'],
    ['Package', '包'], ['Dependency', '依赖'], ['Dependencies', '依赖'],
    ['Plugin', '插件'], ['Extension', '扩展'], ['Addon', '附加组件'],
    ['Widget', '小部件'], ['Library', '库'], ['Lib', '库'],
    ['Middleware', '中间件'], ['Driver', '驱动'],
    ['Protocol', '协议'], ['Socket', '套接字'], ['Port', '端口'],
    ['Host', '主机'], ['Domain', '域名'], ['URL', 'URL'],
    ['HTTP', 'HTTP'], ['HTTPS', 'HTTPS'], ['REST', 'REST'],
    ['GraphQL', 'GraphQL'], ['WebSocket', 'WebSocket'],
    ['Endpoint', '端点'], ['Webhook', 'Webhook'],
    ['Token', '令牌'], ['Session', '会话'], ['Cookie', 'Cookie'],
    ['OAuth', 'OAuth'], ['JWT', 'JWT'],
    ['Credential', '凭证'], ['Certificate', '证书'],
    ['Proxy', '代理'], ['Gateway', '网关'], ['Load', '负载'],
    ['Balancer', '均衡器'], ['Cluster', '集群'], ['Node', '节点'],
    ['Instance', '实例'], ['Container', '容器'], ['Docker', 'Docker'],
    ['Kubernetes', 'K8s'], ['Microservice', '微服务'],
    ['Integration', '集成'], ['Continuous', '持续'], ['Pipeline', '流水线'],
    ['Workflow', '工作流'], ['Automation', '自动化'],
    ['Scheduling', '调度'], ['Scheduler', '调度器'],
    ['Cron', '定时任务'], ['Timer', '计时器'],
    ['Batch', '批处理'], ['Stream', '流'],
    ['Buffer', '缓冲'], ['Channel', '通道'],
    ['Concurrent', '并发'], ['Parallel', '并行'],
    ['Distributed', '分布式'], ['Centralized', '集中式'],
    ['Scalable', '可扩展'], ['Resilient', '弹性'],
    ['Robust', '健壮'], ['Stable', '稳定'],
    ['Experimental', '实验性'], ['Preview', '预览'],
    ['Alpha', 'Alpha'], ['Beta', 'Beta'],
    ['Production', '生产'], ['Development', '开发'],
    ['Staging', '暂存'], ['Sandbox', '沙盒'],
    ['Localization', '本地化'], ['Localize', '本地化'],
    ['Internationalization', '国际化'],
    ['Translation', '翻译'], ['Translate', '翻译'],
    ['Language', '语言'], ['Locale', '区域设置'],
    ['Chinese', '中文'], ['English', '英文'],
    ['Japanese', '日文'], ['Korean', '韩文'],
    ['Greeting', '问候'], ['Welcome', '欢迎'],
    ['Introduction', '介绍'], ['Overview', '概述'],
    ['Summary', '摘要'], ['Detail', '详情'], ['Details', '详情'],
    ['Description', '描述'], ['Title', '标题'], ['Name', '名称'],
    ['Label', '标签'], ['Tag', '标签'], ['Category', '分类'],
    ['Group', '分组'], ['Folder', '文件夹'],
    ['Project', '项目'], ['Workspace', '工作区'],
    ['Setting', '设置'], ['Settings', '设置'],
    ['Preference', '偏好'], ['Preferences', '偏好设置'],
    ['Option', '选项'], ['Options', '选项'],
    ['Property', '属性'], ['Properties', '属性'],
    ['Parameter', '参数'], ['Parameters', '参数'],
    ['Argument', '参数'], ['Arguments', '参数'],
    ['Context', '上下文'], ['Scope', '作用域'],
    ['Hook', '钩子'], ['Hooks', '钩子'],
    ['Middleware', '中间件'],
    ['Agent', '智能体'], ['Agents', '智能体'],
    ['Bot', '机器人'], ['Chatbot', '聊天机器人'],
    ['Assistant', '助手'], ['Copilot', '副驾驶'],
    ['Prompt', '提示词'], ['Prompts', '提示词'],
    ['Response', '响应'], ['Responses', '响应'],
    ['Completion', '补全'], ['Generation', '生成'],
    ['Embedding', '嵌入'], ['Vector', '向量'],
    ['Retrieval', '检索'], ['Augmented', '增强'],
    ['Fine', '微'], ['Tuning', '调'], ['Finetuning', '微调'],
    ['Pretraining', '预训练'], ['Pretrained', '预训练'],
    ['Weight', '权重'], ['Bias', '偏差'],
    ['Layer', '层'], ['Attention', '注意力'],
    ['Transformer', 'Transformer'],
    ['Neural', '神经'], ['Deep', '深度'],
    ['Reinforcement', '强化'], ['Supervised', '监督'],
    ['Unsupervised', '无监督'],
    ['Regression', '回归'], ['Classification', '分类'],
    ['Clustering', '聚类'], ['Segmentation', '分割'],
    ['Detection', '检测'], ['Recognition', '识别'],
    ['Prediction', '预测'], ['Recommendation', '推荐'],
    ['Identity', '身份'], ['Identification', '标识'],
    ['Inquiry', '询问'], ['Query', '查询'],
    ['Conversation', '对话'], ['Discussion', '讨论'],
    ['Comment', '评论'], ['Reply', '回复'],
    ['Answer', '回答'], ['Question', '问题'],
    ['Feedback', '反馈'], ['Rating', '评分'],
    ['Refinement', '优化'], ['Improvement', '改进'],
    ['Enhancement', '增强'], ['Modification', '修改'],
    ['Adjustment', '调整'], ['Tweak', '微调'],
    ['Workaround', '变通方案'], ['Hotfix', '热修复'],
    ['Rollback', '回滚'], ['Revert', '恢复'],
    ['Undo', '撤销'], ['Redo', '重做'],
    ['Comparison', '比较'], ['Contrast', '对比'],
    ['Evaluation', '评估'], ['Assessment', '评估'],
    ['Selection', '选择'], ['Choice', '选择'],
    ['Recommendation', '推荐'], ['Suggestion', '建议'],
    ['Instruction', '指令'], ['Command', '命令'],
    ['Execution', '执行'], ['Runtime', '运行时'],
    ['Compile', '编译'], ['Compilation', '编译'],
    ['Transpile', '转译'], ['Interpret', '解释'],
    ['Link', '链接'], ['Linking', '链接'],
    ['Assembly', '汇编'], ['Binary', '二进制'],
    ['Source', '源码'], ['Target', '目标'],
    ['Destination', '目标'], ['Origin', '源'],
    ['Root', '根'], ['Parent', '父级'], ['Child', '子级'],
    ['Sibling', '兄弟'], ['Ancestor', '祖先'], ['Descendant', '后代'],
    ['Tree', '树'], ['Leaf', '叶子'], ['Branch', '分支'],
    ['Depth', '深度'], ['Breadth', '广度'],
    ['Width', '宽度'], ['Height', '高度'],
    ['Size', '尺寸'], ['Length', '长度'],
    ['Count', '计数'], ['Total', '总计'],
    ['Average', '平均'], ['Maximum', '最大'],
    ['Minimum', '最小'], ['Range', '范围'],
    ['Index', '索引'], ['Offset', '偏移'],
    ['Position', '位置'], ['Location', '位置'],
    ['Coordinate', '坐标'], ['Point', '点'],
    ['Line', '行'], ['Column', '列'],
    ['Row', '行'], ['Cell', '单元格'],
    ['Block', '块'], ['Chunk', '块'],
    ['Segment', '段'], ['Section', '部分'],
    ['Region', '区域'], ['Area', '区域'],
    ['Zone', '区域'], ['Space', '空间'],
    ['Gap', '间距'], ['Margin', '外边距'],
    ['Padding', '内边距'], ['Border', '边框'],
    ['Color', '颜色'], ['Background', '背景'],
    ['Foreground', '前景'], ['Opacity', '透明度'],
    ['Shadow', '阴影'], ['Blur', '模糊'],
    ['Radius', '圆角'], ['Corner', '角'],
    ['Edge', '边缘'], ['Center', '居中'],
    ['Alignment', '对齐'], ['Justify', '对齐'],
    ['Wrap', '换行'], ['Overflow', '溢出'],
    ['Scroll', '滚动'], ['Scrollbar', '滚动条'],
    ['Responsive', '响应式'], ['Adaptive', '自适应'],
    ['Flexible', '灵活'], ['Fixed', '固定'],
    ['Absolute', '绝对'], ['Relative', '相对'],
    ['Sticky', '粘性'], ['Float', '浮动'],
    ['Inline', '内联'], ['Display', '显示'],
    ['Visibility', '可见性'], ['Hidden', '隐藏'],
    ['Visible', '可见'], ['Collapse', '折叠'],
    ['Expand', '展开'], ['Toggle', '切换'],
    ['Swap', '交换'], ['Replace', '替换'],
    ['Insert', '插入'], ['Append', '追加'],
    ['Prepend', '前置'], ['Splice', '拼接'],
    ['Slice', '切片'], ['Trim', '修剪'],
    ['Strip', '去除'], ['Clean', '清理'],
    ['Sanitize', '净化'], ['Escape', '转义'],
    ['Unescape', '反转义'],
    ['Match', '匹配'], ['Regex', '正则'],
    ['Expression', '表达式'], ['Literal', '字面量'],
    ['Wildcard', '通配符'], ['Glob', '通配模式'],
    ['Troubleshoot', '故障排除'], ['Troubleshooting', '故障排除'],
    ['Diagnostic', '诊断'], ['Diagnostics', '诊断'],
    ['Repair', '修复'], ['Recovery', '恢复'],
    ['Maintenance', '维护'], ['Health', '健康'],
    ['Check', '检查'], ['Verify', '验证'],
    ['Audit', '审计'], ['Compliance', '合规'],
    ['Policy', '策略'], ['Rule', '规则'], ['Rules', '规则'],
    ['Constraint', '约束'], ['Limit', '限制'],
    ['Threshold', '阈值'], ['Quota', '配额'],
    ['Budget', '预算'], ['Cost', '成本'],
    ['Price', '价格'], ['Billing', '计费'],
    ['Invoice', '发票'], ['Payment', '支付'],
    ['Subscription', '订阅'], ['Trial', '试用'],
    ['Free', '免费'], ['Premium', '高级'],
    ['Pro', '专业版'], ['Enterprise', '企业版'],
    ['Personal', '个人'], ['Team', '团队'],
    ['Organization', '组织'], ['Company', '公司'],
    ['Workspace', '工作区'], ['Space', '空间'],
    ['Board', '看板'], ['Card', '卡片'],
    ['Note', '笔记'], ['Notes', '笔记'],
    ['Reminder', '提醒'], ['Bookmark', '书签'],
    ['Favorite', '收藏'], ['Star', '星标'],
    ['Archive', '归档'], ['Trash', '回收站'],
    ['Draft', '草稿'], ['Published', '已发布'],
    ['Private', '私有'], ['Public', '公开'],
    ['Shared', '共享'], ['Collaborative', '协作'],
    ['Readonly', '只读'], ['Writable', '可写'],
    ['Executable', '可执行'],
    ['Markdown', 'Markdown'], ['HTML', 'HTML'],
    ['CSS', 'CSS'], ['JavaScript', 'JavaScript'],
    ['TypeScript', 'TypeScript'], ['Python', 'Python'],
    ['Java', 'Java'], ['Kotlin', 'Kotlin'],
    ['Swift', 'Swift'], ['Rust', 'Rust'],
    ['Go', 'Go'], ['Ruby', 'Ruby'],
    ['PHP', 'PHP'], ['SQL', 'SQL'],
    ['JSON', 'JSON'], ['XML', 'XML'],
    ['YAML', 'YAML'], ['TOML', 'TOML'],
    ['CSV', 'CSV'], ['PDF', 'PDF'],
    ['Handling', '处理'], ['Manage', '管理'], ['Management', '管理'],
    ['Manager', '管理器'], ['Controller', '控制器'], ['Control', '控制'],
    ['Provider', '提供者'], ['Consumer', '消费者'],
    ['Producer', '生产者'], ['Publisher', '发布者'],
    ['Subscriber', '订阅者'],
    ['Sender', '发送者'], ['Receiver', '接收者'],
    ['Reader', '读取器'], ['Writer', '写入器'],
    ['Builder', '构建器'], ['Generator', '生成器'],
    ['Iterator', '迭代器'], ['Resolver', '解析器'],
    ['Mapper', '映射器'], ['Reducer', '归约器'],
    ['Selector', '选择器'], ['Accessor', '访问器'],
    ['Mutator', '修改器'], ['Interceptor', '拦截器'],
    ['Decorator', '装饰器'], ['Mixin', '混入'],
    ['Trait', '特征'], ['Enum', '枚举'],
    ['Struct', '结构体'], ['Union', '联合体'],
    ['Tuple', '元组'], ['Record', '记录'],
    ['Schema', '模式'], ['Spec', '规范'],
    ['Standard', '标准'], ['Convention', '约定'],
    ['Best', '最佳'], ['Practice', '实践'], ['Practices', '实践'],
    ['Tip', '技巧'], ['Tips', '技巧'], ['Trick', '技巧'],
    ['Hack', '技巧'], ['Shortcut', '快捷方式'],
    ['Example', '示例'], ['Sample', '示例'],
    ['Demo', '演示'], ['Prototype', '原型'],
    ['Mockup', '原型图'], ['Wireframe', '线框图'],
    ['Sketch', '草图'], ['Draft', '草稿'],
    ['Final', '最终'], ['Stable', '稳定'],
    ['Latest', '最新'], ['Current', '当前'],
    ['Previous', '上一个'], ['Next', '下一个'],
    ['First', '第一'], ['Last', '最后'],
    ['Initial', '初始'], ['Preliminary', '初步'],
    ['Comprehensive', '全面'], ['Complete', '完整'],
    ['Partial', '部分'], ['Incremental', '增量'],
    ['Full', '完整'], ['Empty', '空'],
    ['Blank', '空白'], ['Placeholder', '占位符'],
    ['Dummy', '虚拟'], ['Mock', '模拟'],
    ['Fake', '伪造'], ['Real', '真实'],
    ['Actual', '实际'], ['Expected', '预期'],
    ['Observed', '观察到的'],
    ['Required', '必填'], ['Optional', '可选'],
    ['Mandatory', '强制'], ['Recommended', '推荐'],
    ['Deprecated', '已弃用'], ['Legacy', '旧版'],
    ['Modern', '现代'], ['Classic', '经典'],
    ['Traditional', '传统'], ['Alternative', '替代'],
    ['Hybrid', '混合'], ['Native', '原生'],
    ['Cross', '跨'], ['Multi', '多'], ['Single', '单'],
    ['Dual', '双'], ['Triple', '三重'],
    ['Primary', '主要'], ['Secondary', '次要'],
    ['Tertiary', '第三级'],
    ['Major', '主要'], ['Minor', '次要'],
    ['Critical', '关键'], ['Important', '重要'],
    ['Urgent', '紧急'], ['Normal', '正常'],
    ['Core', '核心'], ['Main', '主'],
    ['Sub', '子'], ['Super', '超级'],
    ['Base', '基础'], ['Root', '根'],
    ['Custom', '自定义'], ['Standard', '标准'],
    ['Generic', '通用'], ['Specific', '特定'],
    ['Detailed', '详细'], ['Brief', '简要'],
    ['Verbose', '详尽'], ['Compact', '紧凑'],
    ['Minimal', '最小化'], ['Maximal', '最大化'],
    ['Extended', '扩展'], ['Shortened', '缩短'],
    ['Expanded', '展开'], ['Collapsed', '折叠'],
    ['Selected', '已选中'], ['Unselected', '未选中'],
    ['Checked', '已选中'], ['Unchecked', '未选中'],
    ['Locked', '已锁定'], ['Unlocked', '已解锁'],
    ['Frozen', '已冻结'], ['Unfrozen', '未冻结'],
    ['Pinned', '已固定'], ['Unpinned', '未固定'],
    ['Starred', '已星标'], ['Unstarred', '未星标'],
    ['Muted', '已静音'], ['Unmuted', '未静音'],
    ['Blocked', '已屏蔽'], ['Unblocked', '未屏蔽'],
    ['Approved', '已批准'], ['Rejected', '已拒绝'],
    ['Accepted', '已接受'], ['Declined', '已拒绝'],
    ['Granted', '已授权'], ['Revoked', '已撤销'],
    ['Assigned', '已分配'], ['Unassigned', '未分配'],
    ['Resolved', '已解决'], ['Unresolved', '未解决'],
    ['Closed', '已关闭'], ['Opened', '已打开'],
    ['Started', '已开始'], ['Stopped', '已停止'],
    ['Running', '运行中'], ['Paused', '已暂停'],
    ['Queued', '排队中'], ['Processing', '处理中'],
    ['Waiting', '等待中'], ['Ready', '就绪'],
    ['Idle', '空闲'], ['Busy', '繁忙'],
    ['Online', '在线'], ['Offline', '离线'],
    ['Connected', '已连接'], ['Disconnected', '已断开'],
    ['Available', '可用'], ['Unavailable', '不可用'],
    ['Reachable', '可达'], ['Unreachable', '不可达'],
    ['Responsive', '响应中'], ['Unresponsive', '无响应'],
    ['Alive', '活跃'], ['Dead', '死亡'],
    ['Active', '活跃'], ['Inactive', '不活跃'],
    ['Anomaly', '异常'],
    ['the', '的'], ['The', '的'],
    ['a', '一个'], ['A', '一个'],
    ['an', '一个'], ['An', '一个'],
    ['and', '与'], ['And', '与'],
    ['or', '或'], ['Or', '或'],
    ['of', '的'], ['Of', '的'],
    ['in', '中'], ['In', '中'],
    ['on', '上'], ['On', '上'],
    ['for', '的'], ['For', '的'],
    ['with', '与'], ['With', '与'],
    ['to', '到'], ['To', '到'],
    ['from', '从'], ['From', '从'],
    ['by', '通过'], ['By', '通过'],
    ['at', '在'], ['At', '在'],
    ['as', '作为'], ['As', '作为'],
    ['is', '是'], ['Is', '是'],
    ['not', '非'], ['Not', '非'],
    ['no', '无'], ['No', '无'],
    ['vs', '对比'], ['VS', '对比'],
    ['via', '通过'], ['Via', '通过'],
    ['into', '到'], ['Into', '到'],
    ['about', '关于'], ['About', '关于'],
    ['between', '之间'], ['Between', '之间'],
    ['across', '跨'], ['Across', '跨'],
    ['through', '通过'], ['Through', '通过'],
    ['during', '期间'], ['During', '期间'],
    ['after', '之后'], ['After', '之后'],
    ['before', '之前'], ['Before', '之前'],
    ['above', '以上'], ['Above', '以上'],
    ['below', '以下'], ['Below', '以下'],
    ['within', '内'], ['Within', '内'],
    ['without', '无'], ['Without', '无'],
    ['using', '使用'], ['Using', '使用'],
    ['like', '如'], ['Like', '如'],
    ['How', '如何'], ['What', '什么'],
    ['When', '何时'], ['Where', '在哪'],
    ['Why', '为什么'], ['Which', '哪个'],
    ['Who', '谁'],
  ]);

  // Prepositions/articles to skip in title translations for better readability
  const skipWords = new Set(['the', 'a', 'an', 'and', 'or', 'of', 'in', 'on', 'for', 'with', 'to', 'from', 'by', 'at', 'as', 'is', 'not', 'no', 'vs', 'via', 'into', 'about', 'between', 'across', 'through', 'during', 'after', 'before', 'above', 'below', 'within', 'without', 'using', 'like', 'The', 'A', 'An', 'And', 'Or', 'Of', 'In', 'On', 'For', 'With', 'To', 'From', 'By', 'At', 'As', 'Is', 'Not', 'No', 'VS', 'Via', 'Into', 'About', 'Between', 'Across', 'Through', 'During', 'After', 'Before', 'Above', 'Below', 'Within', 'Without', 'Using', 'Like']);

  function translateTitle(text) {
    if (!text || typeof text !== 'string') return text;
    const trimmed = text.trim();
    // Skip if already contains Chinese characters (already translated)
    if (/[\u4e00-\u9fa5]/.test(trimmed)) return text;
    // Skip if it's too short or not Title Case / English phrase-like
    if (trimmed.length < 3) return text;
    // Skip if it doesn't look like an English phrase (must contain at least one letter)
    if (!/[A-Za-z]/.test(trimmed)) return text;
    // Skip code-like text, paths, URLs
    if (/^[\/\\~.]|:\/\/|[{}()<>]|^\$|^\x60/.test(trimmed)) return text;

    const words = trimmed.split(/\s+/);
    // Translate word by word, skipping prepositions/articles
    const translated = [];
    for (const word of words) {
      // Preserve punctuation at the end
      const match = word.match(/^([A-Za-z0-9\-]+)([^A-Za-z0-9]*)$/);
      if (!match) {
        translated.push(word);
        continue;
      }
      const [, w, punct] = match;
      const dictEntry = titleWordDict.get(w);
      if (dictEntry) {
        if (!skipWords.has(w)) {
          translated.push(dictEntry + punct);
        }
        // Skip prepositions/articles entirely for cleaner Chinese
      } else {
        // Keep untranslatable words (proper nouns, tech terms) as-is
        translated.push(word);
      }
    }
    const result = translated.join('');
    // If nothing was translated, return original
    if (result === trimmed) return text;
    return result;
  }

  // Check if an element is a conversation title in the sidebar
  function isConversationTitle(element) {
    if (element.tagName !== 'SPAN') return false;
    const cls = typeof element.className === 'string' ? element.className : '';
    // Match the exact class pattern from DOM inspection
    if (cls.includes('truncate') && cls.includes('text-sm') && cls.includes('text-left')) {
      // Verify parent is a conversation row
      const parent = element.closest('[data-testid="conversation-row-sidebar"]');
      if (parent) return true;
    }
    return false;
  }

  function translateConversationTitles() {
    const titleSpans = document.querySelectorAll('[data-testid="conversation-row-sidebar"] span.truncate');
    for (const span of titleSpans) {
      const text = span.textContent || '';
      if (!text.trim()) continue;
      // Only translate if the text is primarily English
      if (/[\u4e00-\u9fa5]/.test(text)) continue;
      if (!/[A-Za-z]{2,}/.test(text)) continue;
      const translated = translateTitle(text);
      if (translated !== text) {
        span.textContent = translated;
      }
    }
  }

  function run() {
    document.documentElement.lang = 'zh-CN';
    translateNode(document);
    translateConversationTitles();
    window.__antigravityZhPatchObserver = new MutationObserver((mutations) => {
      let shouldTranslateTitles = false;
      for (const mutation of mutations) {
        if (mutation.type === 'characterData') {
          translateNode(mutation.target);
          // Check if this is inside a conversation title
          if (mutation.target.parentElement && isConversationTitle(mutation.target.parentElement)) {
            shouldTranslateTitles = true;
          }
        } else if (mutation.type === 'attributes') {
          translateElement(mutation.target);
        } else {
          for (const node of mutation.addedNodes) {
            translateNode(node);
            // Check if added node contains conversation titles
            if (node.nodeType === Node.ELEMENT_NODE) {
              if (node.querySelector && node.querySelector('[data-testid="conversation-row-sidebar"]')) {
                shouldTranslateTitles = true;
              }
              if (node.matches && node.matches('[data-testid="conversation-row-sidebar"]')) {
                shouldTranslateTitles = true;
              }
            }
          }
        }
      }
      if (shouldTranslateTitles) {
        translateConversationTitles();
      }
    });
    window.__antigravityZhPatchObserver.observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['aria-label', 'title', 'placeholder', 'alt'],
    });
    // Also run periodic check for titles that might be loaded asynchronously
    if (window.__antigravityTitleInterval) clearInterval(window.__antigravityTitleInterval);
    window.__antigravityTitleInterval = setInterval(translateConversationTitles, 2000);
  }

  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }
})();

`;

function mainPid() {
  try {
    const output = execFileSync('/usr/bin/pgrep', ['-f', '/Antigravity\\.app/Contents/MacOS/Antigravity$'], { encoding: 'utf8' });
    return output.trim().split(/\s+/)[0] || null;
  } catch {
    return null;
  }
}

function debugPorts() {
  const pid = mainPid();
  if (!pid) return [];
  try {
    const output = execFileSync('/usr/sbin/lsof', ['-nP', '-a', '-p', pid, '-iTCP', '-sTCP:LISTEN'], { encoding: 'utf8' });
    return [...new Set([...output.matchAll(/127\.0\.0\.1:(\d+)\s+\(LISTEN\)/g)].map((match) => Number(match[1])))];
  } catch {
    return [];
  }
}

async function targetsForPort(port) {
  try {
    const response = await fetch(`http://127.0.0.1:${port}/json/list`, { signal: AbortSignal.timeout(1200) });
    if (!response.ok) return [];
    const targets = await response.json();
    return targets.filter((target) => target.type === 'page' && target.webSocketDebuggerUrl);
  } catch {
    return [];
  }
}

function cdpCall(ws, method, params = {}) {
  const id = cdpCall.nextId = (cdpCall.nextId || 0) + 1;
  ws.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      ws.removeEventListener('message', onMessage);
      reject(new Error(`${method} timed out`));
    }, 1500);
    function onMessage(event) {
      const message = JSON.parse(event.data);
      if (message.id !== id) return;
      clearTimeout(timeout);
      ws.removeEventListener('message', onMessage);
      resolve(message);
    }
    ws.addEventListener('message', onMessage);
  });
}

async function injectTarget(target) {
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('websocket timed out')), 1500);
    ws.onopen = () => {
      clearTimeout(timeout);
      resolve();
    };
    ws.onerror = reject;
  });
  try {
    await cdpCall(ws, 'Page.addScriptToEvaluateOnNewDocument', { source: overlaySource });
    await cdpCall(ws, 'Runtime.evaluate', { expression: overlaySource, awaitPromise: false });
  } finally {
    ws.close();
  }
}

async function injectOnce() {
  let count = 0;
  for (const port of debugPorts()) {
    for (const target of await targetsForPort(port)) {
      await injectTarget(target).then(() => count += 1).catch(() => {});
    }
  }
  return count;
}

async function watch() {
  if (!mainPid()) {
    spawn('/usr/bin/open', ['-a', 'Antigravity'], { detached: true, stdio: 'ignore' }).unref();
  }
  for (;;) {
    await injectOnce().catch(() => {});
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
}

if (process.argv.includes('--watch')) {
  watch();
} else {
  injectOnce().then((count) => {
    console.log(`Injected Antigravity Chinese overlay into ${count} page(s).`);
  });
}
