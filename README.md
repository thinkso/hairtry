# HairTry - AI智能换发应用

一个基于 Next.js 和 Google Gemini AI 的智能发型试戴应用，让用户上传照片后预览不同发型效果。

## 功能特性

- 📸 **本地图片处理** - 照片不上传服务器，保护用户隐私
- 💇 **多样发型选择** - 支持男女款多种发型
- 🤖 **AI智能生成** - 基于 Gemini 2.5 Flash Image Preview 模型
- 🎯 **实时预览** - 对比滑块查看原图与生成效果
- 💾 **本地下载** - 一键保存生成结果

## 技术栈

- **前端**: Next.js 14+ (App Router), React, TypeScript
- **样式**: Tailwind CSS
- **状态管理**: Zustand
- **AI模型**: Google Gemini 2.5 Flash Image Preview
- **数据库**: Supabase
- **部署**: Vercel

## 快速开始

### 环境配置

1. 复制环境变量模板：
```bash
cp .env.local.example .env.local
```

2. 配置环境变量：
```env
# Google Gemini API Key
GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 安装依赖
```bash
npm install
```

### 开发运行
```bash
npm run dev
```

访问 http://localhost:3000

## 项目结构

```
├── app/                 # Next.js App Router
│   ├── api/            # API 路由
│   ├── globals.css     # 全局样式
│   ├── layout.tsx      # 根布局
│   └── page.tsx        # 主页
├── components/         # React 组件
│   ├── Header.tsx      # 页头
│   ├── ImageUpload.tsx # 图片上传
│   ├── HairstyleSelector.tsx # 发型选择
│   ├── AIGenerator.tsx # AI 生成
│   ├── ResultDisplay.tsx # 结果展示
│   └── Footer.tsx     # 页脚
├── lib/                # 工具函数和配置
│   ├── store.ts        # Zustand 状态管理
│   └── supabase.ts     # Supabase 客户端
└── public/             # 静态资源
```

## 数据库表结构

### 发型表 (hairstyles)
```sql
CREATE TABLE hairstyles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female')),
  thumbnail_url TEXT,
  prompt TEXT NOT NULL
);
```

### 使用日志表 (usage_logs)
```sql
CREATE TABLE usage_logs (
  id SERIAL PRIMARY KEY,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  hairstyle_id TEXT REFERENCES hairstyles(id),
  status TEXT NOT NULL CHECK (status IN ('success', 'failed')),
  duration_ms INTEGER NOT NULL
);
```

## 开发脚本

```bash
npm run dev          # 开发服务器
npm run build        # 生产构建
npm run start        # 生产服务器
npm run lint         # 代码检查
npm run type-check   # 类型检查
```

## 部署

项目配置为 Vercel 一键部署：

1. 推送代码到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 部署完成

## 注意事项

- **隐私保护**: 所有图片处理都在浏览器本地完成，不会上传到服务器
- **API限制**: Gemini API 有调用频率限制，请合理使用
- **浏览器兼容**: 推荐使用 Chrome 或 Safari 最新版本
- **图片大小**: 支持最大 5MB 的 JPG/PNG 图片

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License