# Vercel 部署指南

## 快速部署步骤

### 1. 访问 Vercel
打开 [vercel.com](https://vercel.com) 并用 GitHub 账号登录

### 2. 导入项目
- 点击 "Add New..." → "Project"
- 选择你的 GitHub 仓库：`SaXz2/SaXz2.github.io`
- 点击 "Import"

### 3. 配置项目
Vercel 会自动检测到 Hexo 项目，使用以下配置：

- **Framework Preset**: Other
- **Build Command**: `npm run vercel-build`
- **Output Directory**: `public`
- **Install Command**: `npm install`

### 4. 部署
点击 "Deploy" 按钮，等待 30-60 秒即可完成部署

### 5. 自定义域名（可选）
- 在项目设置中添加你的域名
- 在域名 DNS 设置中添加 CNAME 记录指向 Vercel

## 优势

✅ **部署速度快**：30-60 秒完成部署（vs GitHub Pages 的 2-3 分钟）
✅ **自动部署**：推送到 main 分支自动触发部署
✅ **全球 CDN**：访问速度更快
✅ **免费额度**：100GB 带宽/月，对个人博客完全够用
✅ **实时预览**：每个 PR 都有独立的预览链接

## 注意事项

- Vercel 部署后，GitHub Pages 仍然可以正常使用
- 可以同时保留两个部署，互不影响
- 建议使用 Vercel 作为主站，GitHub Pages 作为备份
