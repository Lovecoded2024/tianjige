# Vercel 自动部署指南

## 1. 获取 Vercel Secrets

### 方法 A: 通过 Vercel 网站
1. 访问 https://vercel.com
2. 登录账户
3. 点击 "Add New Project" → "Import GitHub Repository"
4. 选择 `tianjige` 仓库
5. 在 "Environment Variables" 添加:
   - `MINIMAX_API_KEY` = `sk-api-dHMfMag2uo0ABRFywU-9as39u_ns_QQRtC-GolSaQED1Z3i8H-tknbEqFWwXKJjYa-iQkaTszbXrycNYN1J_9kU60ZOKk7TygtR8tmjLJ71vgU5nDOnYTIc`
   - `MINIMAX_API_HOST` = `https://api.minimaxi.com`
6. 点击 "Deploy"

### 方法 B: 通过 CLI (需要手动操作)
```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 (需要终端交互)
vercel login

# 链接项目
cd tianjige
vercel link

# 添加环境变量
vercel env add MINIMAX_API_KEY
vercel env add MINIMAX_API_HOST

# 部署
vercel --prod
```

## 2. GitHub Actions 自动部署

已创建 `.github/workflows/vercel-deploy.yml`

### 需要在 GitHub 设置的 Secrets:

1. **VERCEL_TOKEN**
   - 获取: https://vercel.com/account/tokens
   - 创建 token，复制完整字符串

2. **VERCEL_ORG_ID**
   - 获取: 运行 `vercel inspect` 或在 Vercel 项目设置中查看

3. **VERCEL_PROJECT_ID**
   - 获取: 在 Vercel 项目设置 → General 中查看

4. **MINIMAX_API_KEY** (已配置)
5. **MINIMAX_API_HOST** (已配置)

## 3. 快速部署命令

```bash
cd tianjige

# 方式1: Vercel CLI
npx vercel --prod --yes

# 方式2: GitHub Actions (需先设置 secrets)
git add . && git commit -m "add: GitHub Actions deployment" && git push
```

## 4. 部署后测试

访问: https://tianjige.vercel.app 或自定义域名
