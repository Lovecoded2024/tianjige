#!/bin/bash

# 天机阁本地预览脚本
# 使用方法: ./preview.sh

echo "🎮 启动天机阁本地预览..."
echo ""
echo "可用选项:"
echo "  1) 开发模式 (热重载 - 推荐开发时使用)"
echo "  2) 预览模式 (模拟生产环境)"
echo "  3) 仅构建 (不启动服务器)"
echo ""

read -p "请选择 [1/2/3]: " choice

case $choice in
  1)
    echo ""
    echo "🚀 启动开发模式..."
    echo "   访问地址: http://localhost:3000"
    echo "   支持热重载，修改代码立即生效"
    echo ""
    npm run dev
    ;;
  2)
    echo ""
    echo "🔍 启动预览模式..."
    echo "   先构建项目..."
    npm run build
    echo ""
    echo "🌐 启动预览服务器..."
    echo "   访问地址: http://localhost:3000"
    echo "   模拟真实生产环境"
    echo ""
    npm run start
    ;;
  3)
    echo ""
    echo "📦 仅构建项目..."
    npm run build
    ;;
  *)
    echo "无效选项"
    exit 1
    ;;
esac
