# 错误处理

## 错误处理的基本概念

在任何应用程序中，错误处理都是一个至关重要的环节。Express 提供了一套灵活的错误处理机制，可以帮助开发者有效地捕获和处理应用程序中出现的各种错误。

错误处理的主要目标是：
- 向用户提供友好的错误信息
- 记录错误以便调试和改进
- 确保应用程序在出错时不会崩溃
- 区分不同类型的错误并采取适当的处理策略

## Express 中的错误处理机制

Express 中的错误处理主要通过中间件实现。错误处理中间件与普通中间件的区别在于它有四个参数：`err`, `req`, `res`, `next`。

### 基本错误处理中间件

```javascript
// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('服务器内部错误');
});
```

> 注意：错误处理中间件应该定义在所有路由和其他中间件之后，这样才能捕获到所有可能的错误。

## 错误处理中间件的工作原理

当 Express 应用程序中发生错误时，会通过 `next(err)` 方法将错误传递给错误处理中间件。错误处理中间件会捕获这个错误并进行处理。

### 传递错误

```javascript
app.get('/api/users/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error('用户ID不能为空');
    }
    // 业务逻辑...
  } catch (err) {
    next(err); // 将错误传递给错误处理中间件
  }
});
```

### 链式错误处理中间件

你可以定义多个错误处理中间件，它们会按照定义的顺序依次执行：

```javascript
// 处理特定类型的错误
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  next(err); // 将未处理的错误传递给下一个错误处理中间件
});

// 处理所有其他错误
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('服务器内部错误');
});
```

## 处理不同类型的错误

### 404 错误（资源未找到）

```javascript
// 404 错误处理中间件
app.use((req, res, next) => {
  res.status(404).send('请求的资源不存在');
});
```

### 400 错误（请求参数错误）

```javascript
// 验证请求参数的中间件
const validateUser = (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: '姓名和邮箱是必填项' });
  }
  if (!email.includes('@')) {
    return res.status(400).json({ error: '邮箱格式不正确' });
  }
  next();
};

app.post('/api/users', validateUser, (req, res) => {
  // 业务逻辑...
});
```

### 401 错误（未授权）

```javascript
// 身份验证中间件
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: '未提供身份验证令牌' });
  }
  // 验证令牌...
  next();
};

app.get('/api/protected', authenticate, (req, res) => {
  // 业务逻辑...
});
```

### 403 错误（权限不足）

```javascript
// 权限检查中间件
const checkPermission = (req, res, next) => {
  const userRole = req.user.role;
  if (userRole !== 'admin') {
    return res.status(403).json({ error: '权限不足' });
  }
  next();
};

app.delete('/api/users/:id', authenticate, checkPermission, (req, res) => {
  // 业务逻辑...
});
```

### 500 错误（服务器内部错误）

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  // 在开发环境下显示详细错误信息
  if (process.env.NODE_ENV === 'development') {
    return res.status(500).json({
      error: err.message,
      stack: err.stack
    });
  }
  // 在生产环境下显示简洁错误信息
  res.status(500).send('服务器内部错误');
});
```

## 异步错误处理

在异步代码中处理错误需要特别注意，因为传统的 `try-catch` 无法捕获异步操作中抛出的错误。

### 使用回调函数处理异步错误

```javascript
app.get('/api/data', (req, res, next) => {
  database.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return next(err); // 将错误传递给错误处理中间件
    }
    res.json(results);
  });
});
```

### 使用 Promise 处理异步错误

```javascript
app.get('/api/data', (req, res, next) => {
  database.query('SELECT * FROM users')
    .then(results => res.json(results))
    .catch(err => next(err)); // 将错误传递给错误处理中间件
});
```

### 使用 async/await 处理异步错误

```javascript
app.get('/api/data', async (req, res, next) => {
  try {
    const results = await database.query('SELECT * FROM users');
    res.json(results);
  } catch (err) {
    next(err); // 将错误传递给错误处理中间件
  }
});
```

### 简化 async/await 错误处理

你可以创建一个包装函数来简化 async/await 的错误处理：

```javascript
// 包装函数
const asyncHandler = (fn) => (
  req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// 使用示例
app.get('/api/data', asyncHandler(async (req, res) => {
  const results = await database.query('SELECT * FROM users');
  res.json(results);
}));

// 使用包装函数
app.get('/api/data', asyncHandler(async (req, res) => {
  const results = await database.query('SELECT * FROM users');
  res.json(results);
}));
```

##  错误日志记录

记录错误是错误处理的重要组成部分，可以帮助开发者了解和修复问题。

###  基本错误日志

```javascript
app.use((err, req, res, next) => {
  // 记录错误信息
  console.error(`[${new Date().toISOString()}] ${err.message}`);
  console.error(err.stack);
  res.status(500).send('服务器内部错误');
});
```

###  使用日志库

在实际应用中，建议使用专业的日志库如 `winston` 或 `pino` 来记录错误：

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
    new winston.transports.File({ filename: 'error.log', level: 'error' })
  ]
});

// 错误处理中间件
app.use((err, req, res, next) => {
  // 记录错误
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip
  });
  res.status(500).send('服务器内部错误');
});
```

##  生产环境与开发环境的错误处理差异

在不同的环境中，错误处理策略应该有所不同：

- **开发环境**：显示详细的错误信息，包括错误堆栈，以便调试。
- **生产环境**：显示简洁的错误信息，不暴露应用程序的内部细节，同时将详细错误信息记录到日志中。

```javascript
app.use((err, req, res, next) => {
  // 记录错误
  console.error(err.stack);

  // 根据环境显示不同的错误信息
  if (process.env.NODE_ENV === 'development') {
    return res.status(500).json({
      error: err.message,
      stack: err.stack
    });
  }

  // 生产环境
  res.status(500).send('服务器内部错误');
});
```

## 错误处理最佳实践

1. **始终使用错误处理中间件**：确保应用程序中定义了错误处理中间件。
2. **不要忽略错误**：任何错误都应该被捕获并处理，而不是忽略。
3. **区分不同类型的错误**：根据错误类型返回不同的 HTTP 状态码和错误信息。
4. **在开发环境下提供详细错误信息**：帮助开发者快速定位和修复问题。
5. **在生产环境下隐藏内部错误细节**：避免向用户暴露应用程序的内部结构。
6. **记录所有错误**：使用日志库记录详细的错误信息，以便后续分析和改进。
7. **使用自定义错误类**：创建自定义错误类来区分不同类型的错误。
8. **正确处理异步错误**：确保异步操作中的错误也能被正确捕获和处理。

### 自定义错误类示例

```javascript
// 自定义错误类
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// 使用自定义错误类
app.get('/api/users/:id', (req, res, next) => {
  const { id } = req.params;
  if (id > 1000) {
    return next(new AppError('用户不存在', 404));
  }
  // 业务逻辑...
});

// 错误处理中间件
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  }

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }

  // 未知错误
  console.error('ERROR 💥', err);
  res.status(500).json({
    status: 'error',
    message: '服务器内部错误'
  });
});
```

## 总结

错误处理是 Express 应用开发中不可或缺的一部分。通过合理使用错误处理中间件、区分不同类型的错误、正确处理异步错误以及记录错误日志，可以构建出更加健壮和可靠的 Express 应用。在实际开发中，应根据项目需求和团队习惯选择合适的错误处理策略，并遵循相关的最佳实践。