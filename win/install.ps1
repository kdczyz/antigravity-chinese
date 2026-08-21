$ErrorActionPreference = "Stop"

$Root = $PSScriptRoot
$ScriptPath = Join-Path $Root "bin\antigravity-zh-patch.js"
$LogDir = Join-Path $Root "logs"
$TaskName = "AntigravityChinesePatch"

$node = Get-Command node -ErrorAction SilentlyContinue
if (-not $node) {
  Write-Host "未找到 Node.js。请先安装 Node.js 22 或更高版本，然后重新运行 install.ps1。" -ForegroundColor Red
  exit 1
}

New-Item -ItemType Directory -Force -Path $LogDir | Out-Null

$arguments = "`"$ScriptPath`" --watch"
$action = New-ScheduledTaskAction -Execute $node.Source -Argument $arguments
$trigger = New-ScheduledTaskTrigger -AtLogOn
$principal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive -RunLevel LeastPrivilege
$settings = New-ScheduledTaskSettingsSet `
  -AllowStartIfOnBatteries `
  -DontStopIfGoingOnBatteries `
  -ExecutionTimeLimit (New-TimeSpan -Hours 0) `
  -RestartCount 3 `
  -RestartInterval (New-TimeSpan -Minutes 1)

Register-ScheduledTask `
  -TaskName $TaskName `
  -Action $action `
  -Trigger $trigger `
  -Principal $principal `
  -Settings $settings `
  -Description "Antigravity 中文汉化后台注入脚本" `
  -Force | Out-Null

Start-ScheduledTask -TaskName $TaskName

Write-Host "配置全局 AI 规则..."
$ConfigDir = Join-Path $env:USERPROFILE ".gemini\config"
$GeminiRuleFile = Join-Path $ConfigDir "GEMINI.md"

New-Item -ItemType Directory -Force -Path $ConfigDir | Out-Null
$RuleContent = @"
# Global AI Rules

## Language & Naming
- ALWAYS communicate and respond in Simplified Chinese (简体中文).
- CRITICAL: When generating a title, name, or summary for a Session/Conversation/Project, you MUST ALWAYS output the title in Simplified Chinese.
- Do NOT use English titles. Translate any English title concepts to Chinese. For example, instead of "Basic Chinese Greeting", output "基础中文问候".
"@
Set-Content -Path $GeminiRuleFile -Value $RuleContent -Encoding UTF8
Write-Host "已配置全局大模型规则以强制汉化对话与项目命名。"

Write-Host "Antigravity 中文汉化脚本已安装并开始运行。"
Write-Host "任务计划程序名称：$TaskName"
