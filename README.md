# 天机阁 | TianJiGe

> 🏯 全球AI命理平台 - 融合五千年智慧与现代AI科技

## ✨ 特色功能

- 🔮 **智能八字分析** - 基于传统命理学的AI分析
- 🪄 **法器推荐** - 根据五行喜用推荐适合的手串、吊坠
- 💬 **大师对话** - 与AI大师进行命理咨询
- 🌍 **多语言支持** - 中文、英文、日文、韩文
- 📱 **响应式设计** - 完美适配PC端和移动端
- 🎨 **精美动效** - 流畅的动画效果

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env.local` 并填入：

```bash
cp .env.example .env.local
```

填写以下环境变量：

```env
# Supabase (可选，MVP阶段可暂不配置)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

# MiniMax API (必需)
MINIMAX_API_KEY=your_minimax_api_key
MINIMAX_API_HOST=https://api.minimaxi.com
```

### 3. 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)

## 📁 项目结构

```
tianjige/
├── app/
│   ├── [locale]/          # 多语言路由
│   │   ├── page.tsx       # 首页
│   │   ├── fortune/       # 算命页面
│   │   ├── artifacts/     # 法器推荐
│   │   └── master/        # 大师对话
│   └── api/
│       └── chat/          # AI对话API
├── components/
│   ├── ui/                # 基础UI组件
│   └── layout/            # 布局组件
├── lib/                   # 工具函数
│   ├── bazi.ts           # 八字计算
│   └── utils.ts          # 通用工具
├── messages/             # 多语言文件
└── public/              # 静态资源
```

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **多语言**: next-intl
- **AI**: MiniMax API
- **部署**: Vercel
- **数据库**: Supabase (可选)

## 🎯 MVP功能

### 已完成

- ✅ 首页 - 落地页 + 功能展示
- ✅ 算命页 - 八字输入 + 五行分析
- ✅ 法器页 - 材质推荐系统
- ✅ 大师页 - AI对话界面
- ✅ 多语言 - 中/英/日/韩
- ✅ 响应式 - PC/H5适配

### 待开发

- [ ] 用户登录/注册
- [ ] 历史记录保存
- [ ] 详细命盘分析
- [ ] 更多法器选项
- [ ] 支付系统 (如需付费功能)

## 🌐 部署到Vercel

1. Fork本项目到GitHub
2. 在Vercel中导入项目
3. 配置环境变量
4. Deploy!

```bash
# 本地构建测试
npm run build
npm run start
```

## 📝 许可证

MIT License

---

**天机阁** - 让命运掌握在自己手中 🏯
