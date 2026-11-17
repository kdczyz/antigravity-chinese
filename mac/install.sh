#!/bin/zsh
# Antigravity 中文汉化 · macOS 安装脚本（本地增强版）
# 增强点：LaunchAgent 常驻守护（KeepAlive/ThrottleInterval/Aqua 会话）、PATH/HOME 环境、
#         bootstrap 失败自动重试、安装后自检。
set -euo pipefail

ROOT="${0:A:h}"
LABEL="com.a1412.antigravity.zhpatch"
PLIST_NAME="${LABEL}.plist"
SRC_PLIST="$ROOT/launchagents/$PLIST_NAME"
DEST_PLIST="$HOME/Library/LaunchAgents/$PLIST_NAME"
DOMAIN="gui/$(id -u)"
NODE_BIN="$(command -v node || true)"

if [[ -z "$NODE_BIN" ]]; then
  echo "未找到 Node.js。请先安装 Node.js 22 或更高版本，然后重新运行 install.sh。"
  exit 1
fi

mkdir -p "$HOME/Library/LaunchAgents" "$ROOT/logs"
chmod +x "$ROOT/bin/antigravity-zh-patch.js"
sed \
  -e "s#__NODE_BIN__#$NODE_BIN#g" \
  -e "s#__PATCH_SCRIPT__#$ROOT/bin/antigravity-zh-patch.js#g" \
  -e "s#__PATCH_DIR__#$ROOT/bin#g" \
  -e "s#__NODE_DIR__#${NODE_BIN:h}#g" \
  -e "s#__HOME__#$HOME#g" \
  -e "s#__LOG_DIR__#$ROOT/logs#g" \
  "$SRC_PLIST" > "$DEST_PLIST"
plutil -lint "$DEST_PLIST"

# 先卸载旧实例（按 label 与 plist 双保险）
launchctl bootout "$DOMAIN/$LABEL" 2>/dev/null || true
launchctl bootout "$DOMAIN" "$DEST_PLIST" 2>/dev/null || true
launchctl enable "$DOMAIN/$LABEL" 2>/dev/null || true

# bootstrap 在个别会话下会返回 5 (Input/output error)，重试即可
ok=0
for i in 1 2 3 4 5; do
  if launchctl bootstrap "$DOMAIN" "$DEST_PLIST" 2>/dev/null; then ok=1; break; fi
  sleep 1
done
if [[ $ok -ne 1 ]]; then
  # 兜底：老接口
  launchctl load -w "$DEST_PLIST" 2>/dev/null || true
fi

launchctl kickstart -k "$DOMAIN/$LABEL" 2>/dev/null || true
sleep 2

if launchctl print "$DOMAIN/$LABEL" >/dev/null 2>&1; then
  echo "LaunchAgent 已加载：$LABEL（登录自启 + KeepAlive 守护）"
else
  echo "警告：LaunchAgent 未成功加载，请手动执行 launchctl bootstrap $DOMAIN $DEST_PLIST 查看报错。"
fi

echo "配置全局 AI 规则..."
CONFIG_DIR="$HOME/.gemini/config"
GEMINI_RULE_FILE="$CONFIG_DIR/GEMINI.md"

mkdir -p "$CONFIG_DIR"
if [[ -f "$GEMINI_RULE_FILE" ]] && ! grep -q "ALWAYS communicate and respond in Simplified Chinese" "$GEMINI_RULE_FILE"; then
  cp "$GEMINI_RULE_FILE" "$GEMINI_RULE_FILE.bak-$(date +%Y%m%d-%H%M%S)"
fi
cat << 'EOF' > "$GEMINI_RULE_FILE"
# Global AI Rules

## Language & Naming
- ALWAYS communicate and respond in Simplified Chinese (简体中文).
- CRITICAL: When generating a title, name, or summary for a Session/Conversation/Project, you MUST ALWAYS output the title in Simplified Chinese.
- Do NOT use English titles. Translate any English title concepts to Chinese. For example, instead of "Basic Chinese Greeting", output "基础中文问候".
EOF
echo "已配置全局大模型规则以强制汉化对话与项目命名。"

echo "Antigravity 中文汉化脚本已安装并开始运行。"