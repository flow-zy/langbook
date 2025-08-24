# Node.js 最佳实践

本章节将总结 Node.js 开发中的最佳实践，涵盖代码组织、安全性、性能、可维护性等方面，帮助你编写高质量的 Node.js 应用程序。

## 代码组织和结构

### 模块化设计

将代码拆分为多个模块，每个模块负责特定的功能。

```javascript
// 目录结构示例
// src/
//   app.js          # 应用入口
//   config/         # 配置文件
//   controllers/    # 控制器
//   models/         # 数据模型
//   routes/         # 路由定义
//   services/       # 业务逻辑
//   utils/          # 工具函数
//   middlewares/    # 中间件

// 模块导出示例 (utils/logger.js)
function info(message) {
  console.log(`[INFO] ${message}`);
}

function error(message) {
  console.error(`[ERROR] ${message}`);
}

module.exports = { info, error };

// 模块导入示例
const logger = require('./utils/logger');
logger.info('应用启动');
```

### 使用 ES 模块

Node.js 支持 ES 模块，可以使用 `import` 和 `export` 语法。

```javascript
// package.json 中添加
// {
//   "type": "module"
// }

// 模块导出 (utils/logger.js)
export function info(message) {
  console.log(`[INFO] ${message}`);
}

export function error(message) {
  console.error(`[ERROR] ${message}`);
}

// 模块导入
import { info, error } from './utils/logger.js';
info('应用启动');
```

## 安全性最佳实践

### 防止注入攻击

```javascript
// 错误示例: SQL 注入
const userId = req.params.id;
const query = `SELECT * FROM users WHERE id = ${userId}`; // 不安全

// 正确示例: 使用参数化查询
const userId = req.params.id;
const query = 'SELECT * FROM users WHERE id = ?';
connection.query(query, [userId], (err, results) => {
  // 处理结果
});

// 防止 XSS 攻击
const escapeHtml = require('escape-html');
const userInput = req.body.comment;
const safeHtml = escapeHtml(userInput);
```

### 安全的密码存储

```javascript
const bcrypt = require('bcrypt');
const saltRounds = 10;

// 加密密码
async function hashPassword(password) {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

// 验证密码
async function verifyPassword(password, hash) {
  const result = await bcrypt.compare(password, hash);
  return result;
}
```

### 设置安全的 HTTP 头

```javascript
const helmet = require('helmet');
const express = require('express');
const app = express();

// 使用 helmet 中间件设置安全头
app.use(helmet());

// 自定义安全头
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});
```

## 异步编程最佳实践

### 优先使用 async/await

```javascript
// 错误示例: 回调地狱
fs.readFile('file1.txt', 'utf8', (err, data1) => {
  if (err) {
    console.error('读取失败:', err);
    return;
  }
  fs.readFile('file2.txt', 'utf8', (err, data2) => {
    // 更多嵌套...
  });
});

// 正确示例: 使用 async/await
async function readFiles() {
  try {
    const data1 = await fs.promises.readFile('file1.txt', 'utf8');
    const data2 = await fs.promises.readFile('file2.txt', 'utf8');
    return data1 + data2;
  } catch (err) {
    console.error('读取失败:', err);
    throw err;
  }
}
```

### 并行执行独立的异步操作

```javascript
// 串行执行 (较慢)
async function fetchDataSerial() {
  const user = await fetchUser();
  const posts = await fetchPosts(user.id);
  const comments = await fetchComments(user.id);
  return { user, posts, comments };
}

// 并行执行 (较快)
async function fetchDataParallel() {
  const user = await fetchUser();
  const [posts, comments] = await Promise.all([
    fetchPosts(user.id),
    fetchComments(user.id)
  ]);
  return { user, posts, comments };
}
```

## 性能最佳实践

### 使用缓存减少重复计算

```javascript
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 60 }); // 缓存 60 秒

async function getExpensiveData(id) {
  const cacheKey = `data_${id}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  // 模拟昂贵的计算或数据库查询
  const data = await expensiveOperation(id);
  cache.set(cacheKey, data);
  return data;
}
```

### 优化数据库查询

```javascript
// 错误示例: 没有索引的查询
const users = await User.find({ age: { $gt: 18 } }); // 如果 age 字段没有索引，查询会很慢

// 正确示例: 添加索引
// 在 schema 中定义索引
const userSchema = new mongoose.Schema({
  name: String,
  age: { type: Number, index: true }, // 添加索引
  email: String
});

// 只查询需要的字段
const users = await User.find({ age: { $gt: 18 } }, 'name email');

// 使用分页减少返回数据量
const page = 1;
const limit = 10;
const users = await User.find()
  .skip((page - 1) * limit)
  .limit(limit);
```

## 日志和监控

### 结构化日志

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({ format: winston.format.simple() })
  ]
});

// 记录结构化日志
logger.info('用户登录', {
  userId: req.user.id,
  ip: req.ip,
  timestamp: new Date()
});
```

### 监控应用性能

```javascript
const prometheus = require('prom-client');

// 创建指标
const httpRequestDurationMicroseconds = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
});

// 中间件记录请求时间
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestDurationMicroseconds.labels(req.method, req.route.path, res.statusCode).observe(duration);
  });
  next();
});

// 暴露指标端点
app.get('/metrics', (req, res) => {
  res.set('Content-Type', prometheus.register.contentType);
  res.end(prometheus.register.metrics());
});
```

## 部署和维护

### 使用环境变量存储配置

```javascript
// 使用 dotenv 加载环境变量
require('dotenv').config();

// 访问环境变量
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 27017;
const dbName = process.env.DB_NAME || 'mydb';
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

// 连接数据库
const connectionString = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
mongoose.connect(connectionString);
```

### 优雅关闭

```javascript
// 捕获终止信号
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

function shutdown() {
  console.log('正在关闭服务器...');

  // 关闭 HTTP 服务器
  server.close(() => {
    console.log('HTTP 服务器已关闭');

    // 关闭数据库连接
    mongoose.disconnect(() => {
      console.log('数据库连接已关闭');
      process.exit(0);
    });
  });

  // 设置超时强制退出
  setTimeout(() => {
    console.error('关闭超时，强制退出');
    process.exit(1);
  }, 5000);
}
```

## 代码质量和测试

### 编写单元测试

```javascript
// 使用 Jest 编写单元测试
const sum = require('./sum');

test('1 + 2 等于 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('负数相加', () => {
  expect(sum(-1, -2)).toBe(-3);
});

// 使用 Supertest 测试 API
const request = require('supertest');
const app = require('./app');

describe('GET /users', () => {
  it('应该返回用户列表', async () => {
    const res = await request(app)
      .get('/users')
      .expect(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
```

### 使用 lint 工具

```javascript
// .eslintrc.js 配置示例
module.exports = {
  env: {
    browser: false,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used' }],
    'prettier/prettier': 'error',
  },
};
```

## 最佳实践总结

1. **代码组织**: 采用模块化设计，合理划分目录结构，使用 ES 模块语法。

2. **安全性**: 防止注入攻击，安全存储密码，设置安全的 HTTP 头，验证用户输入。

3. **异步编程**: 优先使用 async/await，并行执行独立的异步操作，避免回调地狱。

4. **性能**: 使用缓存减少重复计算，优化数据库查询，避免阻塞事件循环。

5. **日志和监控**: 使用结构化日志，监控应用性能，设置告警机制。

6. **部署和维护**: 使用环境变量存储配置，实现优雅关闭，定期备份数据。

7. **代码质量**: 编写单元测试和集成测试，使用 lint 工具和格式化工具。

8. **文档**: 为代码和 API 编写清晰的文档，包括使用示例和参数说明。

9. **版本控制**: 遵循语义化版本控制规范，保持依赖更新。

10. **持续学习**: 关注 Node.js 社区动态，学习新特性和最佳实践。