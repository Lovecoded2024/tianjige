#!/bin/bash

# 天机阁本地测试脚本
# 用于测试所有页面和功能

BASE_URL="${1:-http://localhost:3000}"

echo "🧪 天机阁本地测试"
echo "================"
echo "测试地址: $BASE_URL"
echo ""

PASS=0
FAIL=0

test_page() {
  local lang=$1
  local page=$2
  local url="${BASE_URL}/${lang}${page}"
  local status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  
  if [ "$status" = "200" ]; then
    echo "✅ /${lang}${page} - $status"
    PASS=$((PASS + 1))
  else
    echo "❌ /${lang}${page} - $status"
    FAIL=$((FAIL + 1))
  fi
}

echo "📄 测试主页面..."
echo "----------------"
for lang in zh en ja ko; do
  test_page $lang ""
done

echo ""
echo "🔮 测试算命页面..."
echo "----------------"
for lang in zh en ja ko; do
  test_page $lang "fortune"
done

echo ""
echo "⚗️ 测试法器页面..."
echo "----------------"
for lang in zh en ja ko; do
  test_page $lang "artifacts"
done

echo ""
echo "🧘 测试大师页面..."
echo "----------------"
for lang in zh en ja ko; do
  test_page $lang "master"
done

echo ""
echo "🤖 测试 API..."
echo "----------------"
API_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "${BASE_URL}/api/chat")
if [ "$API_STATUS" = "200" ]; then
  echo "✅ /api/chat - $API_STATUS"
  PASS=$((PASS + 1))
else
  echo "❌ /api/chat - $API_STATUS"
  FAIL=$((FAIL + 1))
fi

echo ""
echo "================"
echo "📊 测试结果: $PASS 通过, $FAIL 失败"

if [ $FAIL -eq 0 ]; then
  echo "🎉 所有测试通过!"
  exit 0
else
  echo "⚠️ 有 $FAIL 项测试失败"
  exit 1
fi
