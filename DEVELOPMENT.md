# 🎨 天机阁本地开发工作流程

## 快速开始

### 方式 1: 使用脚本 (推荐)
```bash
# 启动开发服务器
./preview.sh

# 选择 1) 开发模式
# 访问 http://localhost:3000
```

### 方式 2: 手动命令
```bash
# 开发模式 (热重载)
npm run dev

# 预览模式 (模拟生产环境)
npm run build && npm run start
```

## 测试

### 运行测试
```bash
# 测试所有页面
./test.sh http://localhost:3000

# 或手动测试
curl http://localhost:3000/zh
```

### 测试清单
- [ ] 首页加载正常
- [ ] 所有语言版本 (zh/en/ja/ko)
- [ ] 算命页面表单
- [ ] 法器页面推荐
- [ ] 大师聊天功能
- [ ] 深色/浅色主题切换
- [ ] 响应式布局 (手机/平板/桌面)
- [ ] 动画效果流畅

## UI/UX 调试技巧

### 1. 使用浏览器开发者工具
```bash
# 打开 Chrome DevTools
# 检查元素样式
# 查看动画性能
```

### 2. 验证设计系统
```bash
# 检查颜色一致性
grep -r "text-primary" app/
grep -r "bg-secondary" app/

# 检查动画类名
grep -r "animate-" app/
```

### 3. 性能检查
```bash
# 构建大小
npm run build 2>&1 | grep -E "(Size|First Load)"

# 页面加载时间
curl -w "\nTime: %{time_total}s\n" http://localhost:3000/zh
```

## 常见问题

### Q: 页面加载慢?
A: 使用 `npm run dev` 替代构建测试

### Q: 样式不生效?
A: 检查 Tailwind 编译 `npm run dev` 自动编译

### Q: 动画卡顿?
A: 在 Chrome DevTools → Performance 录制分析

## 部署前检查清单

- [ ] 本地构建成功 (`npm run build`)
- [ ] 所有页面 HTTP 200
- [ ] API 响应正常
- [ ] 无控制台错误
- [ ] 响应式布局正常
- [ ] 深色模式正常

## 快速验证命令

```bash
# 一键测试所有页面
for lang in zh en ja ko; do
  for page in "" fortune artifacts master; do
    curl -s -o /dev/null -w "/$lang$page: %{http_code}\n" "https://tianjige-coral.vercel.app/$lang$page"
  done
done

# 测试 API
curl -s https://tianjige-coral.vercel.app/api/chat
```

## 下一步

1. 本地预览满意后
2. 提交代码: `git add . && git commit -m "描述"`
3. 推送: `git push`
4. Vercel 自动部署
5. 验证生产环境
