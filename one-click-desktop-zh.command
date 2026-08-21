#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

printf '\n🌌 Antigravity 中文汉化一键启动/安装\n'
printf '工作目录: %s\n\n' "$SCRIPT_DIR"

if [ -f "$SCRIPT_DIR/mac/install.sh" ]; then
  chmod +x "$SCRIPT_DIR/mac/install.sh" "$SCRIPT_DIR/mac/bin/antigravity-zh-patch.js"
  "$SCRIPT_DIR/mac/install.sh"
else
  printf '错误: 找不到 mac/install.sh\n' >&2
  printf '\n按任意键关闭窗口...'
  read -r -n 1 _
  exit 1
fi

printf '\n🎉 汉化守护进程已就绪！如需更新效果，重新打开 Antigravity 界面即可。\n'
printf '\n按任意键关闭窗口...'
read -r -n 1 _

