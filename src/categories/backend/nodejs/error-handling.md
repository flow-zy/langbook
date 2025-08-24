# Node.js 错误处理

错误处理是构建健壮 Node.js 应用程序的关键环节。本章节将详细介绍 Node.js 中的错误处理机制，包括错误类型、同步与异步错误处理、自定义错误以及最佳实践等。

## 错误的基本概念

### 错误类型

在 JavaScript 中，错误是 `Error` 对象的实例，主要分为以下几种类型：

```javascript
// 常见错误类型
const err1 = new Error('通用错误');
const err2 = new TypeError('类型错误');
const err3 = new RangeError('范围错误');
const err4 = new SyntaxError('语法错误');
const err5 = new ReferenceError('引用错误');
```

### 错误属性

`Error` 对象通常具有以下属性：

- `message`: 错误消息描述
- `name`: 错误类型名称
- `stack`: 错误堆栈跟踪信息

```javascript
try {
  throw new Error('测试错误');
} catch (err) {
  console.log('错误消息:', err.message);
  console.log('错误类型:', err.name);
  console.log('错误堆栈:', err.stack);
}
```

## 同步代码中的错误处理

### try/catch 语句

在同步代码中，可以使用 `try/catch` 语句捕获和处理错误。

```javascript
// 同步错误处理
function divide(a, b) {
  if (b === 0) {
    throw new Error('除数不能为零');
  }
  return a / b;
}

try {
  const result = divide(10, 0);
  console.log('结果:', result);
} catch (err) {
  console.error('发生错误:', err.message);
}
```

### 处理未捕获的同步错误

未捕获的同步错误会导致 Node.js 进程崩溃，可以通过监听 `process` 对象的 `uncaughtException` 事件来捕获。

```javascript
// 捕获未处理的同步错误
process.on('uncaughtException', (err) => {
  console.error('未捕获的异常:', err);
  // 进行必要的清理工作
  process.exit(1); // 退出进程
});

// 故意抛出未捕获的错误
throw new Error('未捕获的错误');
```

## 异步代码中的错误处理

### 回调函数中的错误处理

在回调函数中，通常使用第一个参数传递错误。

```javascript
const fs = require('fs');

// 异步回调错误处理
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('读取文件失败:', err);
    return;
  }
  console.log('文件内容:', data);
});
```

### Promise 中的错误处理

在 Promise 中，可以使用 `.catch()` 方法捕获错误。

```javascript
const fs = require('fs').promises;

// Promise 错误处理
fs.readFile('example.txt', 'utf8')
  .then(data => {
    console.log('文件内容:', data);
  })
  .catch(err => {
    console.error('读取文件失败:', err);
  });
```

### async/await 中的错误处理

在 async/await 中，可以使用 `try/catch` 语句捕获错误。

```javascript
const fs = require('fs').promises;

// async/await 错误处理
async function readFileAsync() {
  try {
    const data = await fs.readFile('example.txt', 'utf8');
    console.log('文件内容:', data);
  } catch (err) {
    console.error('读取文件失败:', err);
  }
}

readFileAsync();
```

### 处理未捕获的异步错误

未捕获的 Promise 拒绝会触发 `unhandledRejection` 事件。

```javascript
// 捕获未处理的 Promise 拒绝
process.on('unhandledRejection', (reason, promise) => {
  console.error('未处理的 Promise 拒绝:', reason);
  // 可以在这里记录日志或进行其他处理
});

// 故意创建未处理的 Promise 拒绝
Promise.reject(new Error('未处理的 Promise 拒绝'));
```

## 自定义错误类

创建自定义错误类可以提供更具体的错误信息和更好的错误分类。

```javascript
// 自定义错误类
class DatabaseError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'DatabaseError';
    this.code = code;
    this.timestamp = new Date();
  }
}

// 使用自定义错误
function queryDatabase(query) {
  return new Promise((resolve, reject) => {
    // 模拟数据库查询失败
    setTimeout(() => {
      reject(new DatabaseError('查询失败', 'DB_ERROR'));
    }, 1000);
  });
}

// 捕获自定义错误
queryDatabase('SELECT * FROM users')
  .catch(err => {
    if (err instanceof DatabaseError) {
      console.error(`数据库错误 (${err.code}): ${err.message}`);
    } else {
      console.error('未知错误:', err);
    }
  });
```

## 错误传播

在多层调用中，错误应该被正确地向上传播。

```javascript
// 错误传播示例
async function readConfig() {
  try {
    const data = await fs.readFile('config.json', 'utf8');
    return JSON.parse(data);
  } catch (err) {
    // 添加更多上下文信息后重新抛出
    throw new Error(`读取配置文件失败: ${err.message}`);
  }
}

async function initApp() {
  try {
    const config = await readConfig();
    console.log('配置加载成功:', config);
  } catch (err) {
    console.error('应用初始化失败:', err);
    process.exit(1);
  }
}

initApp();
```

## 错误日志和监控

### 使用日志库

```javascript
const winston = require('winston');

// 配置日志记录器
const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.Console({ format: winston.format.simple() })
  ]
});

// 记录错误
try {
  throw new Error('需要记录的错误');
} catch (err) {
  logger.error('发生错误:', { error: err.message, stack: err.stack });
}
```

### 错误监控

```javascript
// 使用 Sentry 进行错误监控
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: 'your-sentry-dsn',
  tracesSampleRate: 1.0,
});

// 捕获并上报错误
try {
  throw new Error('需要上报的错误');
} catch (err) {
  Sentry.captureException(err);
  console.error('发生错误:', err);
}
```

## 生产环境中的错误处理

### 不向客户端暴露详细错误信息

```javascript
// 生产环境错误处理示例
const express = require('express');
const app = express();

app.get('/api/data', (req, res) => {
  try {
    // 业务逻辑
    throw new Error('数据库查询失败');
  } catch (err) {
    // 记录详细错误信息
    logger.error('API 错误:', { error: err, path: req.path });

    // 向客户端返回通用错误信息
    res.status(500).json({
      error: '服务器内部错误',
      code: 'SERVER_ERROR',
      // 不包含详细错误信息
    });
  }
});
```

### 优雅关闭

```javascript
// 优雅关闭示例
process.on('SIGTERM', () => {
  console.log('接收到终止信号，正在关闭服务器...');

  // 关闭服务器
  server.close(() => {
    console.log('服务器已关闭');
    // 关闭数据库连接等其他资源
    process.exit(0);
  });

  // 设置超时强制退出
  setTimeout(() => {
    console.error('关闭超时，强制退出');
    process.exit(1);
  }, 5000);
});
```

## 错误处理最佳实践

1. **始终处理错误**：不要忽略任何错误，无论是同步还是异步。

2. **提供有意义的错误信息**：错误信息应清晰描述问题，便于调试。

3. **适当分类错误**：使用自定义错误类区分不同类型的错误。

4. **不向客户端暴露内部错误详情**：生产环境中，向客户端返回通用错误信息。

5. **记录详细错误日志**：包括错误消息、堆栈跟踪、请求上下文等。

6. **使用监控工具**：及时发现和解决生产环境中的错误。

7. **错误传播时添加上下文**：在重新抛出错误时，添加更多上下文信息。

8. **避免过度捕获错误**：不要捕获所有错误，有些错误应该导致进程崩溃。

9. **处理未捕获的错误**：监听 `uncaughtException` 和 `unhandledRejection` 事件。

10. **优雅关闭**：在进程终止前，进行必要的清理工作。