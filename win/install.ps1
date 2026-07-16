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
$principal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive -RunLevel Limited
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

Write-Host "Antigravity 中文汉化脚本已安装并开始运行。"
Write-Host "任务计划程序名称：$TaskName"
