#!/bin/bash
echo "=========================================="
echo "    Antigravity Mac 一键汉化补�?
echo "=========================================="

APP_PATH="/Applications/Antigravity.app/Contents/Resources/app"

if [ ! -d "$APP_PATH" ]; then
    echo "�?错误：找不到默认�?Antigravity 安装路径�?APP_PATH"
    echo "请检查软件是否安装在默认的应用程序目录中，或者尝试手动替换文件�?
    exit 1
fi

echo "正在备份原版文件..."
cp "$APP_PATH/preload.js" "$APP_PATH/preload.js.bak" 2>/dev/null
cp "$APP_PATH/dict.json" "$APP_PATH/dict.json.bak" 2>/dev/null

echo "正在应用汉化补丁..."
cp -f "./dist/preload.js" "$APP_PATH/preload.js"
cp -f "./dist/dict.json" "$APP_PATH/dict.json"

echo "=========================================="
echo "�?汉化补丁安装完成！请彻底重启 Antigravity 以生效�?
echo "=========================================="
