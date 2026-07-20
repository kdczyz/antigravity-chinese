# patch_antigravity.ps1 - Antigravity Chinese Patch v3.0
# ASCII-only script (no Unicode) to prevent encoding issues on Chinese Windows
# Fixes app.asar.unpacked ENOENT error during extraction
$ErrorActionPreference = "Continue"

$programDir       = "$env:LOCALAPPDATA\Programs\antigravity"
$originalAsar     = "$programDir\resources\app.asar"
$backupAsar       = "$programDir\resources\app.asar.bak"
$originalUnpacked = "$originalAsar.unpacked"
$backupUnpacked   = "$backupAsar.unpacked"
$exePath          = "$programDir\Antigravity.exe"

$scriptDir = $PSScriptRoot
if (-not $scriptDir) { $scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path }
if (-not $scriptDir) { $scriptDir = (Get-Location).Path }

$localPreloadJs = Join-Path $scriptDir "dist\preload.js"
$patchMarker    = "// Antigravity Chinese Localization Patch v3.0"
$oldMarkers     = @("// Antigravity Chinese Localization Patch", "// --- Antigravity Chinese Patch")

function Stop-Client {
    Write-Host "[*] Closing Antigravity..." -ForegroundColor Yellow
    Get-Process -Name "Antigravity","language_server" -ErrorAction SilentlyContinue |
        Stop-Process -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 3
}

function Start-Client {
    if (Test-Path $exePath) {
        Write-Host "[*] Starting Antigravity..." -ForegroundColor Green
        cmd /c start "" "$exePath"
    } else {
        Write-Host "[!] Antigravity.exe not found. Start manually." -ForegroundColor Yellow
    }
}

function Get-Npx {
    $sys = Get-Command npx -ErrorAction SilentlyContinue
    if ($sys) { return $sys.Source }

    $portableRoot = "$env:TEMP\ag_nodejs\node-v20.11.1-win-x64"
    $portableNpx  = "$portableRoot\npx.cmd"
    if (Test-Path $portableNpx) {
        $env:PATH = $portableRoot + ";" + $env:PATH
        return $portableNpx
    }

    Write-Host "[*] Node.js not found. Downloading portable Node.js v20 (~30MB)..." -ForegroundColor Cyan
    Write-Host "    (One-time download, cached for future use)" -ForegroundColor Gray
    $nodeDir = "$env:TEMP\ag_nodejs"
    $nodeZip = "$nodeDir\node.zip"
    if (Test-Path $nodeDir) { Remove-Item -Recurse -Force $nodeDir -ErrorAction SilentlyContinue }
    New-Item -ItemType Directory -Force -Path $nodeDir | Out-Null
    try {
        [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
        Invoke-WebRequest "https://nodejs.org/dist/v20.11.1/node-v20.11.1-win-x64.zip" `
            -OutFile $nodeZip -UseBasicParsing
        Expand-Archive -Path $nodeZip -DestinationPath $nodeDir -Force
        Remove-Item $nodeZip -Force -ErrorAction SilentlyContinue
        $env:PATH = $portableRoot + ";" + $env:PATH
        if (Test-Path $portableNpx) {
            Write-Host "[+] Node.js ready!" -ForegroundColor Green
            return $portableNpx
        }
    } catch {
        Write-Host "[!] Download failed: $_" -ForegroundColor Red
    }
    return $null
}

function Test-PreloadJs([string]$path) {
    if (-not (Test-Path $path)) { return $false }
    $c = [IO.File]::ReadAllText($path, [Text.Encoding]::UTF8)
    if (-not $c.Contains($patchMarker)) { return $false }
    $ob = ($c.ToCharArray() | Where-Object {$_ -eq '{'}).Count
    $cb = ($c.ToCharArray() | Where-Object {$_ -eq '}'}).Count
    $op = ($c.ToCharArray() | Where-Object {$_ -eq '('}).Count
    $cp = ($c.ToCharArray() | Where-Object {$_ -eq ')'}).Count
    return ($ob -eq $cb -and $op -eq $cp)
}

function Remove-PatchCode([string]$content) {
    $result = $content
    foreach ($m in ($oldMarkers + $patchMarker)) {
        $i = $result.IndexOf($m)
        if ($i -ge 0) { $result = $result.Substring(0, $i) }
    }
    return $result.TrimEnd()
}

# ── Option 1: Install ─────────────────────────────────────────────────────────
function Install-Patch {
    Clear-Host
    Write-Host "================================================" -ForegroundColor Cyan
    Write-Host "  [1] Install / Update Chinese Patch" -ForegroundColor Cyan
    Write-Host "================================================" -ForegroundColor Cyan
    Write-Host ""

    if (-not (Test-Path $originalAsar)) {
        Write-Host "[!] ERROR: Antigravity not found at: $programDir" -ForegroundColor Red
        Read-Host "`nPress Enter to return..."; return
    }
    if (-not (Test-Path $localPreloadJs)) {
        Write-Host "[!] ERROR: Missing file: $localPreloadJs" -ForegroundColor Red
        Read-Host "`nPress Enter to return..."; return
    }
    if (-not (Test-PreloadJs $localPreloadJs)) {
        Write-Host "[!] ERROR: preload.js failed syntax validation." -ForegroundColor Red
        Read-Host "`nPress Enter to return..."; return
    }
    Write-Host "[+] preload.js syntax: OK" -ForegroundColor Green

    Stop-Client

    $npx = Get-Npx
    if (-not $npx) {
        Write-Host "[!] ABORT: No Node.js available." -ForegroundColor Red
        Read-Host "`nPress Enter to return..."; return
    }

    $tempDir = "$env:TEMP\ag_patch_work"
    if (Test-Path $tempDir) { Remove-Item -Recurse -Force $tempDir -ErrorAction SilentlyContinue }
    New-Item -ItemType Directory -Force -Path $tempDir | Out-Null

    try {
        Write-Host "[*] Checking current asar state..." -ForegroundColor Gray
        $checkDir = "$tempDir\check"
        & $npx --yes asar extract $originalAsar $checkDir
        $isPatched = $false
        $checkPreload = "$checkDir\dist\preload.js"
        if (Test-Path $checkPreload) {
            $ct = [IO.File]::ReadAllText($checkPreload, [Text.Encoding]::UTF8)
            $isPatched = $ct.Contains($patchMarker) -or ($oldMarkers | Where-Object { $ct.Contains($_) }).Count -gt 0
        }
        Remove-Item -Recurse -Force $checkDir -ErrorAction SilentlyContinue

        if (-not $isPatched) {
            Write-Host "[*] Fresh client detected. Saving backup..." -ForegroundColor Green
            Copy-Item $originalAsar $backupAsar -Force
            if (Test-Path $originalUnpacked) {
                Copy-Item $originalUnpacked $backupUnpacked -Recurse -Force
            }
        } else {
            Write-Host "[*] Already patched - using existing backup as clean base." -ForegroundColor Yellow
            if ((Test-Path $originalUnpacked) -and (-not (Test-Path $backupUnpacked))) {
                Write-Host "[*] Fixing missing unpacked backup..." -ForegroundColor Gray
                Copy-Item $originalUnpacked $backupUnpacked -Recurse -Force
            }
        }

        Write-Host "[*] Extracting backup for clean injection..." -ForegroundColor Gray
        $workDir = "$tempDir\work"
        & $npx --yes asar extract $backupAsar $workDir

        $targetPreload = "$workDir\dist\preload.js"
        $orig = [IO.File]::ReadAllText($targetPreload, [Text.Encoding]::UTF8)
        $clean = Remove-PatchCode $orig
        $patch = [IO.File]::ReadAllText($localPreloadJs, [Text.Encoding]::UTF8)
        
        $dictPath = Join-Path $scriptDir "dist\dict.json"
        if (Test-Path $dictPath) {
            Write-Host "[*] Injecting external dictionary (dict.json)..." -ForegroundColor Gray
            $dictJson = [IO.File]::ReadAllText($dictPath, [Text.Encoding]::UTF8)
            $patch = $patch.Replace("/*__DICT_JSON__*/{}", $dictJson)
        }
        
        $combined = $clean + "`r`n`r`n" + $patch
        [IO.File]::WriteAllText($targetPreload, $combined, [Text.Encoding]::UTF8)

        Write-Host "[*] Validating injected preload.js..." -ForegroundColor Gray
        if (-not (Test-PreloadJs $targetPreload)) {
            throw "Injected preload.js failed validation!"
        }
        Write-Host "[+] Validation passed!" -ForegroundColor Green

        Write-Host "[*] Repacking app.asar..." -ForegroundColor Gray
        & $npx --yes asar pack $workDir $originalAsar

        Write-Host "" 
        Write-Host "================================================" -ForegroundColor Green
        Write-Host "  [+] PATCH INSTALLED SUCCESSFULLY!" -ForegroundColor Green
        Write-Host "      - Full UI translation" -ForegroundColor Gray
        Write-Host "      - Chat/input areas excluded" -ForegroundColor Gray
        Write-Host "      - Selection translator (blue highlight)" -ForegroundColor Gray
        Write-Host "      - Click to restore original text" -ForegroundColor Gray
        Write-Host "      - Toggle button (bottom-right corner)" -ForegroundColor Gray
        Write-Host "================================================" -ForegroundColor Green

        Start-Client

    } catch {
        Write-Host "[!] ERROR: $_" -ForegroundColor Red
        if (Test-Path $backupAsar) {
            Write-Host "[*] Rolling back from backup..." -ForegroundColor Yellow
            Copy-Item $backupAsar $originalAsar -Force
        }
    } finally {
        if (Test-Path $tempDir) { Remove-Item -Recurse -Force $tempDir -ErrorAction SilentlyContinue }
    }

    Write-Host ""
    Read-Host "Press Enter to return to menu..."
}

# ── Option 2: Restore English ─────────────────────────────────────────────────
function Restore-English {
    Clear-Host
    Write-Host "================================================" -ForegroundColor Yellow
    Write-Host "  [2] Restore Original English Client" -ForegroundColor Yellow
    Write-Host "================================================" -ForegroundColor Yellow
    Write-Host ""

    Stop-Client

    if (Test-Path $backupAsar) {
        try {
            Copy-Item $backupAsar $originalAsar -Force
            if (Test-Path $backupUnpacked) {
                Copy-Item $backupUnpacked $originalUnpacked -Recurse -Force
            }
            Write-Host "[+] Restored from backup successfully!" -ForegroundColor Green
            Start-Client
        } catch {
            Write-Host "[!] Restore failed: $_" -ForegroundColor Red
        }
        Write-Host ""; Read-Host "Press Enter to return to menu..."; return
    }

    Write-Host "[*] No backup found. Stripping patch from asar..." -ForegroundColor Yellow
    $npx = Get-Npx
    if (-not $npx) {
        Write-Host "[!] ABORT: No Node.js." -ForegroundColor Red
        Read-Host "`nPress Enter to return..."; return
    }
    $tempDir = "$env:TEMP\ag_restore_work"
    if (Test-Path $tempDir) { Remove-Item -Recurse -Force $tempDir -ErrorAction SilentlyContinue }
    try {
        & $npx --yes asar extract $originalAsar $tempDir
        $p = "$tempDir\dist\preload.js"
        $c = [IO.File]::ReadAllText($p, [Text.Encoding]::UTF8)
        $stripped = Remove-PatchCode $c
        if ($stripped.Length -lt $c.Length) {
            [IO.File]::WriteAllText($p, $stripped + "`r`n", [Text.Encoding]::UTF8)
            & $npx --yes asar pack $tempDir $originalAsar
            Copy-Item $originalAsar $backupAsar -Force
            if (Test-Path $originalUnpacked) {
                Copy-Item $originalUnpacked $backupUnpacked -Recurse -Force
            }
            Write-Host "[+] Patch stripped. Clean backup saved." -ForegroundColor Green
        } else {
            Write-Host "[*] Already in English." -ForegroundColor Gray
        }
        Start-Client
    } catch {
        Write-Host "[!] ERROR: $_" -ForegroundColor Red
    } finally {
        if (Test-Path $tempDir) { Remove-Item -Recurse -Force $tempDir -ErrorAction SilentlyContinue }
    }
    Write-Host ""; Read-Host "Press Enter to return to menu..."
}

# ── Option 3: Status ──────────────────────────────────────────────────────────
function Show-Status {
    Clear-Host
    Write-Host "================================================" -ForegroundColor Blue
    Write-Host "  [3] Status Check" -ForegroundColor Blue
    Write-Host "================================================" -ForegroundColor Blue
    Write-Host ""

    $running = $null -ne (Get-Process Antigravity -ErrorAction SilentlyContinue)
    $hasAsar = Test-Path $originalAsar
    $hasBack = Test-Path $backupAsar
    $npxSys  = $null -ne (Get-Command npx -ErrorAction SilentlyContinue)
    $npxPort = Test-Path "$env:TEMP\ag_nodejs\node-v20.11.1-win-x64\npx.cmd"

    Write-Host "  Antigravity running : $(if ($running) {'Yes'} else {'No'})"
    Write-Host "  app.asar found      : $(if ($hasAsar) {'Yes'} else {'NO - not installed!'})" -ForegroundColor $(if ($hasAsar) {'Green'} else {'Red'})
    Write-Host "  Backup (.bak) found : $(if ($hasBack) {'Yes'} else {'No'})" -ForegroundColor $(if ($hasBack) {'Green'} else {'Yellow'})
    Write-Host "  Node.js available   : $(if ($npxSys) {'System'} elseif ($npxPort) {'Portable cache'} else {'No (auto-download on install)'})" -ForegroundColor $(if ($npxSys -or $npxPort) {'Green'} else {'Yellow'})

    $npxCmd = if ($npxSys) { (Get-Command npx).Source } elseif ($npxPort) { "$env:TEMP\ag_nodejs\node-v20.11.1-win-x64\npx.cmd" } else { $null }
    if ($npxCmd -and $hasAsar) {
        $env:PATH = (Split-Path $npxCmd) + ";" + $env:PATH
        $tempDir = "$env:TEMP\ag_status_tmp"
        if (Test-Path $tempDir) { Remove-Item -Recurse -Force $tempDir -ErrorAction SilentlyContinue }
        try {
            & $npxCmd --yes asar extract $originalAsar $tempDir 2>$null
            $pkg = Get-Content "$tempDir\package.json" -Encoding UTF8 -ErrorAction SilentlyContinue | ConvertFrom-Json
            if ($pkg) { Write-Host "  Client version      : $($pkg.version)" -ForegroundColor White }
            $pt = [IO.File]::ReadAllText("$tempDir\dist\preload.js", [Text.Encoding]::UTF8)
            $isP = $pt.Contains($patchMarker) -or ($oldMarkers | Where-Object { $pt.Contains($_) }).Count -gt 0
            Write-Host "  Patch status        : $(if ($isP) {'PATCHED (Chinese)'} else {'ENGLISH (unpatched)'})" -ForegroundColor $(if ($isP) {'Cyan'} else {'Green'})
        } catch {
            Write-Host "  Patch status        : Could not determine" -ForegroundColor Yellow
        } finally {
            if (Test-Path $tempDir) { Remove-Item -Recurse -Force $tempDir -ErrorAction SilentlyContinue }
        }
    }
    Write-Host ""; Read-Host "Press Enter to return to menu..."
}

# ── Main Menu ─────────────────────────────────────────────────────────────────
do {
    Clear-Host
    Write-Host ""
    Write-Host "================================================" -ForegroundColor Cyan
    Write-Host "  Antigravity Chinese Patch  v3.0" -ForegroundColor Cyan
    Write-Host "================================================" -ForegroundColor Cyan
    Write-Host "  1. Install / Update Patch  (an zhuang han hua)" -ForegroundColor Green
    Write-Host "  2. Restore English         (huan yuan ying wen)" -ForegroundColor Yellow
    Write-Host "  3. Check Status            (jian cha zhuang tai)" -ForegroundColor Blue
    Write-Host "  4. Exit                    (tui chu)" -ForegroundColor Gray
    Write-Host "================================================" -ForegroundColor Cyan
    Write-Host ""
    $choice = (Read-Host "  Select [1-4]").Trim()
    switch ($choice) {
        "1" { Install-Patch }
        "2" { Restore-English }
        "3" { Show-Status }
        "4" { break }
        default { Write-Host "  Invalid. Try again." -ForegroundColor Red; Start-Sleep 1 }
    }
} while ($choice -ne "4")

Write-Host ""
Write-Host "Goodbye!" -ForegroundColor Green
