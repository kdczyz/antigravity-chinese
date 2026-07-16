#!/usr/bin/env node
'use strict';

const { execFileSync, spawn } = require('child_process');

const overlaySource = String.raw`
(() => {
  if (window.__antigravityZhPatchInstalled === 7) return;
  window.__antigravityZhPatchInstalled = 7;

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
    ['Permissions', '权限'],
    ['Appearance', '外观'],
    ['Models', '模型'],
    ['Customizations', '自定义'],
    ['Customize', '自定义'],
    ['Browser', '浏览器'],
    ['App', '应用'],
    ['Application', '应用'],
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
    ["Specifies Agent's behavior when asking for review on artifacts, which are documents it creates to enable richer conversation experience.", '指定智能体在请求你审核产物时的行为；产物是它创建的文档，用来支持更丰富的对话体验。'],
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
    ['Install IDE', '安装 IDE'],
    ['Load older messages', '加载历史消息'],
    ['Undo changes up to this point', '撤销到此处的更改'],
    ['Ran', '已运行'],
    ['Run', '运行'],
    ['Overview', '总览'],
    ['Review', '审核'],
    ['Auxiliary Pane', '辅助面板'],
    ['Subagents', '子智能体'],
    ['Files Changed', '已更改文件'],
    ['Artifacts', '产物'],
    ['Walkthrough', '演练指南'],
    ['Uploads', '上传的文件'],
    ['Working...', '工作中...'],
  ]);

  const patterns = [
    [/See all \((\d+)\)/g, '查看全部 ($1)'],
    [/(\d+) agents running/g, '$1 个代理正在运行'],
    [/1 agent running/g, '1 个代理正在运行'],
    [/^(\d+)d$/g, '$1天'],
    [/^(\d+)m$/g, '$1分钟'],
    [/^(\d+)s$/g, '$1秒'],
    [/Worked for (\d+)s/g, '已工作 $1 秒'],
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
    [/Load older messages, showing (\d+) of (\d+)/g, '加载历史消息，正在显示第 $1 条，共 $2 条'],
    [/Thought for (\d+)s/g, '思考了 $1 秒'],
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

  const translationCache = new Map();

  async function translateOnline(text) {
    if (translationCache.has(text)) return translationCache.get(text);
    
    // 1. Try Google Translate first (works globally, but blocked in China)
    try {
      const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh-CN&dt=t&q=' + encodeURIComponent(text);
      const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
      const data = await res.json();
      if (data && data[0]) {
        const translated = data[0].map(x => x[0]).join('');
        translationCache.set(text, translated);
        return translated;
      }
    } catch (e) {
      // Google Translate failed (probably due to firewall in China or timeout)
    }

    // 2. Fall back to MyMemory Translate (works in China and globally)
    try {
      const url = 'https://api.mymemory.translated.net/get?langpair=en|zh&q=' + encodeURIComponent(text);
      const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
      const data = await res.json();
      if (data && data.responseData && data.responseData.translatedText) {
        const translated = data.responseData.translatedText;
        translationCache.set(text, translated);
        return translated;
      }
    } catch (e) {
      // MyMemory also failed
    }

    return text;
  }

  function translateElement(element) {
    for (const attr of ['aria-label', 'title', 'placeholder', 'alt']) {
      const value = element.getAttribute?.(attr);
      if (!value) continue;
      const translated = translate(value);
      if (translated !== value) {
        element.setAttribute(attr, translated);
      } else {
        if (/[A-Za-z]/.test(value) && value.includes(' ') && value.length > 5 && !/[\u4e00-\u9fa5]/.test(value)) {
          translateOnline(value).then((onlineVal) => {
            if (onlineVal && onlineVal !== value && element.getAttribute?.(attr) === value) {
              element.setAttribute(attr, onlineVal);
            }
          });
        }
      }
    }
  }

  function translateNode(root) {
    if (!root) return;
    if (shouldSkip(root)) return;
    if (root.nodeType === Node.TEXT_NODE) {
      const val = root.nodeValue || '';
      const translated = translate(val);
      if (translated !== val) {
        root.nodeValue = translated;
      } else {
        if (/[A-Za-z]/.test(val) && val.includes(' ') && val.length > 5 && !/[\u4e00-\u9fa5]/.test(val)) {
          translateOnline(val).then((onlineVal) => {
            if (onlineVal && onlineVal !== val && root.nodeValue === val) {
              root.nodeValue = onlineVal;
            }
          });
        }
      }
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) return;
    if (root.nodeType === Node.ELEMENT_NODE) translateElement(root);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (shouldSkip(node)) continue;
      if (node.nodeType === Node.TEXT_NODE) {
        const val = node.nodeValue || '';
        const translated = translate(val);
        if (translated !== val) {
          node.nodeValue = translated;
        } else {
          if (/[A-Za-z]/.test(val) && val.includes(' ') && val.length > 5 && !/[\u4e00-\u9fa5]/.test(val)) {
            const targetNode = node;
            translateOnline(val).then((onlineVal) => {
              if (onlineVal && onlineVal !== val && targetNode.nodeValue === val) {
                targetNode.nodeValue = onlineVal;
              }
            });
          }
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        translateElement(node);
      }
    }
  }

  function run() {
    document.documentElement.lang = 'zh-CN';
    translateNode(document);
    new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'characterData') {
          translateNode(mutation.target);
        } else if (mutation.type === 'attributes') {
          translateElement(mutation.target);
        } else {
          for (const node of mutation.addedNodes) translateNode(node);
        }
      }
    }).observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['aria-label', 'title', 'placeholder', 'alt'],
    });
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

const activeConnections = new Map();

async function watch() {
  if (!mainPid()) {
    spawn('/usr/bin/open', ['-a', 'Antigravity'], { detached: true, stdio: 'ignore' }).unref();
  }
  for (;;) {
    try {
      const activeIds = new Set();
      for (const port of debugPorts()) {
        const targets = await targetsForPort(port);
        for (const target of targets) {
          activeIds.add(target.id);
          if (!activeConnections.has(target.id)) {
            const ws = new WebSocket(target.webSocketDebuggerUrl);
            activeConnections.set(target.id, ws);
            
            ws.onopen = async () => {
              try {
                await cdpCall(ws, 'Page.addScriptToEvaluateOnNewDocument', { source: overlaySource });
                await cdpCall(ws, 'Runtime.evaluate', { expression: overlaySource, awaitPromise: false });
              } catch (err) {
                // ignore
              }
            };
            
            ws.onclose = () => {
              activeConnections.delete(target.id);
            };
            
            ws.onerror = () => {
              ws.close();
              activeConnections.delete(target.id);
            };
          }
        }
      }
      
      for (const [id, ws] of activeConnections) {
        if (!activeIds.has(id)) {
          ws.close();
          activeConnections.delete(id);
        }
      }
    } catch (e) {
      // ignore
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
}

if (process.argv.includes('--watch')) {
  watch();
} else {
  injectOnce().then((count) => {
    console.log(`Injected Antigravity Chinese overlay into ${count} page(s).`);
  });
}
