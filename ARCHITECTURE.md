# 架构说明

## 技术栈

### 后端
- **框架**: NestJS 11
- **数据库**: PostgreSQL + TypeORM
- **缓存**: Redis
- **队列**: Bull
- **认证**: JWT + Passport
- **日志**: Winston
- **验证**: class-validator + Joi

### 前端
- **框架**: Next.js 16 + React 19
- **样式**: Tailwind CSS + shadcn/ui
- **状态**: SWR
- **类型**: TypeScript

## 核心模块

### 基础设施层
- **异常处理**: 全局异常过滤器
- **拦截器**: 日志、超时、响应转换、缓存
- **中间件**: 请求ID、日志记录
- **管道**: 全局验证管道

### 业务层
- **认证模块**: 注册、登录、JWT
- **用户模块**: 用户管理
- **事件系统**: 用户注册事件
- **审计日志**: 操作记录

### 数据层
- **实体**: User
- **迁移**: TypeORM 迁移支持

## 目录结构

```
apps/server/src/
├── common/           # 通用模块
│   ├── constants/    # 常量定义
│   ├── decorators/   # 装饰器
│   ├── dto/          # 数据传输对象
│   ├── enums/        # 枚举
│   ├── exceptions/   # 自定义异常
│   ├── filters/      # 异常过滤器
│   ├── guards/       # 守卫
│   ├── interceptors/ # 拦截器
│   ├── logger/       # 日志服务
│   ├── middleware/   # 中间件
│   ├── pipes/        # 管道
│   └── utils/        # 工具函数
├── config/           # 配置
├── database/         # 数据库
├── entities/         # 实体
├── modules/          # 业务模块
│   ├── auth/         # 认证
│   └── user/         # 用户
├── cache/            # 缓存
├── queue/            # 队列
└── events/           # 事件
```
