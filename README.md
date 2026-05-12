# DISC 性格测试系统

面试者远程 DISC 性格测试系统。面试官发送测试链接给候选人，候选人在手机/电脑上填写 40 题 DISC 测试，提交后面试官可在管理后台实时查看所有候选人的测试结果。

## 技术栈

- **前端**：React 18 + TypeScript + Vite 5 + Tailwind CSS 3
- **后端**：Supabase (PostgreSQL + Realtime)
- **部署**：GitHub Pages（自动部署 via GitHub Actions）

## 快速开始

### 1. 配置 Supabase

1. 注册 [Supabase](https://supabase.com/) 并创建项目
2. 进入项目 Dashboard → **SQL Editor**，执行 `supabase/schema.sql` 中的 SQL 脚本
3. 在 Dashboard → **Settings → API** 中获取 `Project URL` 和 `anon public key`

### 2. 配置环境变量

```bash
cp .env.example .env
```

编辑 `.env` 文件，填入 Supabase 配置：

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. 安装依赖并启动

```bash
npm install
npm run dev
```

### 4. 访问

- **候选人测试页**：`http://localhost:5173/`
- **面试官管理后台**：`http://localhost:5173/admin`

## 页面说明

### 候选人测试页 (`/`)

1. 欢迎页面 → 阅读答题须知
2. 填写姓名
3. 开始答题（40 题，10 分钟限时）
4. 提交后查看 DISC 得分结果
5. 进入 5 分钟冷却期（防刷）

### 管理后台 (`/admin`)

- 查看所有候选人提交记录
- 按姓名搜索筛选
- 点击查看详细得分分析
- Realtime 实时推送新提交

## 部署到 GitHub Pages

本项目已配置 GitHub Actions 自动部署到 GitHub Pages。

### 自动部署（推荐）

**前提条件**：
1. 项目已推送到 GitHub 仓库
2. 在 GitHub 仓库设置中启用 GitHub Pages

**启用步骤**：
1. 进入 GitHub 仓库 → **Settings** → **Pages**
2. 在 **Build and deployment** → **Source** 中选择 **GitHub Actions**
3. 推送代码到 `main` 分支，GitHub Actions 会自动构建并部署

**部署流程**：
- 推送代码到 `main` 分支或提交 Pull Request 时自动触发
- GitHub Actions 执行以下任务：
  1. 检出代码
  2. 设置 Node.js 20 环境
  3. 安装依赖（`npm ci`）
  4. 构建生产版本（`npm run build`）
  5. 部署到 GitHub Pages

**访问地址**：
```
https://<your-github-username>.github.io/disc-test-system/
```

### 手动部署

如果需要本地构建并手动部署：

```bash
# 安装依赖
npm install

# 构建生产版本
npm run build

# 产物位于 dist/ 目录
# 将 dist/ 目录内容推送到 GitHub 的 gh-pages 分支
```

### 环境变量配置

由于 GitHub Pages 是纯静态托管，无法使用动态环境变量。有两种解决方案：

**方案 1：直接在代码中配置（已采用）**
- 项目已将 Supabase 配置写入 `.env` 文件
- 构建时 Vite 会将 `VITE_` 开头的变量嵌入到代码中
- ✅ 当前已配置：`.env` 文件已填写真实值

**方案 2：使用 GitHub Secrets（推荐用于生产）**
1. 进入 GitHub 仓库 → **Settings** → **Secrets and variables** → **Actions**
2. 添加以下 Secrets：
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. 修改 `.github/workflows/deploy.yml`，在 `build` 步骤前添加环境变量

### 重要配置说明

**1. Vite base 配置**
```typescript
// vite.config.ts
export default defineConfig({
  base: '/disc-test-system/',  // GitHub Pages 需要指定仓库名作为 base
  // ...
})
```

**2. React Router 配置**
- 项目使用 `HashRouter` 而非 `BrowserRouter`
- 原因：GitHub Pages 不支持 SPA 的客户端路由（刷新页面会 404）
- 访问路径格式：`https://<username>.github.io/disc-test-system/#/admin`

**3. GitHub Actions 工作流程**
- 配置文件：`.github/workflows/deploy.yml`
- 触发条件：推送到 `main` 分支
- 权限配置：需要 `pages: write` 和 `id-token: write` 权限
