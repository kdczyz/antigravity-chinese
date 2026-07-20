#!/bin/bash
echo "=========================================="
echo "    Antigravity Mac 恢复原版脚本"
echo "=========================================="

APP_PATH="/Applications/Antigravity.app/Contents/Resources/app"

if [ -f "$APP_PATH/preload.js.bak" ]; then
    cp -f "$APP_PATH/preload.js.bak" "$APP_PATH/preload.js"
    echo "✅ 已恢复 preload.js"
else
    echo "❌ 找不到 preload.js 备份文件"
fi

if [ -f "$APP_PATH/dict.json.bak" ]; then
    cp -f "$APP_PATH/dict.json.bak" "$APP_PATH/dict.json"
    echo "✅ 已恢复 dict.json"
else
    echo "❌ 找不到 dict.json 备份文件"
fi

echo "=========================================="
echo "恢复操作完成！请彻底重启 Antigravity 以生效。"
echo "=========================================="
