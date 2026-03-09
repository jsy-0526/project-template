# Project Template

基于 Next.js + NestJS + TypeORM 的企业级 Monorepo 模板

## 技术栈

### 前端
- Next.js 16 + React 19
- TypeScript
- Tailwind CSS + shadcn/ui
- SWR

### 后端
- NestJS
- TypeORM + PostgreSQL
- Redis (缓存)
- Bull (消息队列)
- Winston (日志)
- JWT 认证

## 项目结构

```
├── apps/
│   ├── client/          # Next.js 前端
│   └── server/          # NestJS 后端
└── packages/
    └── shared/          # 共享代码
```

## 快速开始

### 1. 启动数据库

```bash
docker-compose up -d
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 配置环境变量

```bash
# 复制环境变量文件
cp apps/server/.env.example apps/server/.env
cp apps/client/.env.example apps/client/.env
```

### 4. 启动开发服务器

```bash
# 同时启动前后端
pnpm dev

# 或分别启动
pnpm dev:client  # 前端: http://localhost:3000
pnpm dev:server  # 后端: http://localhost:3001
```

## 核心功能

- ✅ 用户注册/登录
- ✅ JWT 认证
- ✅ 全局异常处理
- ✅ 请求日志记录
- ✅ 审计日志
- ✅ Redis 缓存
- ✅ 消息队列
- ✅ 事件系统
- ✅ 数据库迁移

## 构建

```bash
pnpm build:client
pnpm build:server
```
