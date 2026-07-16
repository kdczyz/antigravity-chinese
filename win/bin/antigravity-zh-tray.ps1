[System.Threading.Thread]::CurrentThread.SetApartmentState([System.Threading.ApartmentState]::STA) 2>$null
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

$nodeCmdResult = Get-Command node.exe -ErrorAction SilentlyContinue
if (-not $nodeCmdResult) {
    $res = [System.Windows.Forms.MessageBox]::Show("未检测到 Node.js 运行环境！`n此汉化服务需要 Node.js 才能运行。`n`n点击[确定]将为您打开 Node.js 官方下载页面，请下载并安装后重新运行此程序。", "缺少必要依赖", 1, 48)
    if ($res -eq "OK") {
        Start-Process "https://nodejs.org/"
    }
    [System.Windows.Forms.Application]::Exit()
    exit
}
$nodePath = $nodeCmdResult.Source

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
if (-not $scriptDir -or $scriptDir -eq "") { $scriptDir = Get-Location }
$patchScript = Join-Path $scriptDir "antigravity-zh-patch.js"

$script:patchProcess = $null

function Start-Patch {
    if ($script:patchProcess -and -not $script:patchProcess.HasExited) { return }
    try {
        $psi = New-Object System.Diagnostics.ProcessStartInfo
        $psi.FileName = $nodePath
        $psi.Arguments = "`"$patchScript`" --watch"
        $psi.WindowStyle = [System.Diagnostics.ProcessWindowStyle]::Hidden
        $psi.CreateNoWindow = $true
        $psi.UseShellExecute = $false
        $script:patchProcess = [System.Diagnostics.Process]::Start($psi)
    } catch {}
}

function Stop-Patch {
    if ($script:patchProcess -and -not $script:patchProcess.HasExited) {
        try { $script:patchProcess.Kill() } catch {}
    }
    $script:patchProcess = $null
}

$bmp = New-Object System.Drawing.Bitmap(32, 32)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.Clear([System.Drawing.Color]::Transparent)
$g.FillEllipse([System.Drawing.Brushes]::RoyalBlue, 0, 0, 31, 31)
$font = New-Object System.Drawing.Font("Microsoft YaHei UI", 13, [System.Drawing.FontStyle]::Bold)
$sf = New-Object System.Drawing.StringFormat
$sf.Alignment = [System.Drawing.StringAlignment]::Center
$sf.LineAlignment = [System.Drawing.StringAlignment]::Center
$g.DrawString("汉", $font, [System.Drawing.Brushes]::White, (New-Object System.Drawing.RectangleF(0, 0, 32, 32)), $sf)
$g.Dispose(); $font.Dispose(); $sf.Dispose()
$iconHandle = $bmp.GetHicon()
$trayIcon = New-Object System.Windows.Forms.NotifyIcon
$trayIcon.Icon = [System.Drawing.Icon]::FromHandle($iconHandle)
$trayIcon.Text = "Antigravity Chinese"
$trayIcon.Visible = $true

$ctxMenu = New-Object System.Windows.Forms.ContextMenuStrip
$itemStatus = New-Object System.Windows.Forms.ToolStripMenuItem("[ 汉化服务运行中 ]")
$itemStatus.Enabled = $false
$ctxMenu.Items.Add($itemStatus) | Out-Null
$ctxMenu.Items.Add((New-Object System.Windows.Forms.ToolStripSeparator)) | Out-Null

$itemRestart = New-Object System.Windows.Forms.ToolStripMenuItem("重新注入汉化")
$itemRestart.Add_Click({
    Stop-Patch
    Start-Sleep -Milliseconds 500
    Start-Patch
    $trayIcon.ShowBalloonTip(2000, "Antigravity", "已重新注入！", [System.Windows.Forms.ToolTipIcon]::Info)
})
$ctxMenu.Items.Add($itemRestart) | Out-Null
$ctxMenu.Items.Add((New-Object System.Windows.Forms.ToolStripSeparator)) | Out-Null

$itemExit = New-Object System.Windows.Forms.ToolStripMenuItem("退出服务")
$itemExit.Add_Click({
    Stop-Patch
    $trayIcon.Visible = $false
    $trayIcon.Dispose()
    [System.Windows.Forms.Application]::Exit()
})
$ctxMenu.Items.Add($itemExit) | Out-Null

$trayIcon.ContextMenuStrip = $ctxMenu
Start-Patch
$trayIcon.ShowBalloonTip(3000, "Antigravity", "汉化服务已启动", [System.Windows.Forms.ToolTipIcon]::Info)
[System.Windows.Forms.Application]::Run()