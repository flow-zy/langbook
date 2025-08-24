# 路由系统

## 路由基本概念

在 Express 中，路由是指确定应用程序如何响应客户端对特定端点的请求。这些端点由 HTTP 方法和 URL 路径组合定义。路由是构建 Web 应用和 API 的基础。

### 路由的组成部分

一个完整的 Express 路由由以下部分组成：

- **HTTP 方法**：如 GET、POST、PUT、DELETE 等
- **URL 路径**：请求的路径，如 `/api/users`
- **处理函数**：当请求匹配时执行的函数

### 路由的基本格式

```javascript
app.METHOD(PATH, HANDLER)
```

其中：
- `app` 是 Express 应用实例
- `METHOD` 是 HTTP 方法（如 get、post、put、delete 等）
- `PATH` 是服务器上的路径
- `HANDLER` 是当路由匹配时执行的函数

## 定义路由的方式

### 基本路由定义

```javascript
// GET 路由
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// POST 路由
app.post('/api/users', (req, res) => {
  res.status(201).json({ message: '用户创建成功' });
});

// PUT 路由
app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ message: `用户 ${userId} 更新成功` });
});

// DELETE 路由
app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ message: `用户 ${userId} 删除成功` });
});
```

### 链式路由定义

可以使用 `app.route()` 方法来为同一个路径定义多个 HTTP 方法的路由：

```javascript
app.route('/api/users')
  .get((req, res) => {
    res.json([{ id: 1, name: '张三' }, { id: 2, name: '李四' }]);
  })
  .post((req, res) => {
    res.status(201).json({ message: '用户创建成功' });
  });

app.route('/api/users/:id')
  .get((req, res) => {
    const userId = req.params.id;
    res.json({ id: userId, name: `用户 ${userId}` });
  })
  .put((req, res) => {
    const userId = req.params.id;
    res.json({ message: `用户 ${userId} 更新成功` });
  })
  .delete((req, res) => {
    const userId = req.params.id;
    res.json({ message: `用户 ${userId} 删除成功` });
  });
```

### 模块化路由

对于大型应用，可以使用 `express.Router` 来创建模块化的路由：

```javascript
// 创建路由模块
const express = require('express');
const router = express.Router();

// 定义路由
router.get('/', (req, res) => {
  res.json([{ id: 1, name: '张三' }, { id: 2, name: '李四' }]);
});

router.post('/', (req, res) => {
  res.status(201).json({ message: '用户创建成功' });
});

router.get('/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ id: userId, name: `用户 ${userId}` });
});

// 导出路由模块
module.exports = router;
```

然后在主应用中使用该路由模块：

```javascript
const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);
```

## 路由参数

路由参数用于捕获 URL 中的动态值，以 `:` 开头。

### 基本路由参数

```javascript
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ id: userId, name: `用户 ${userId}` });
});
```

### 多个路由参数

```javascript
app.get('/api/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId, content: `用户 ${userId} 的帖子 ${postId}` });
});
```

### 路由参数的限制

可以使用正则表达式来限制路由参数的格式：

```javascript
// 只匹配数字 ID
app.get('/api/users/:id(\d+)', (req, res) => {
  const userId = req.params.id;
  res.json({ id: userId, name: `用户 ${userId}` });
});

// 匹配特定格式的用户名
app.get('/api/users/:username([a-zA-Z0-9_]+)', (req, res) => {
  const username = req.params.username;
  res.json({ username, email: `${username}@example.com` });
});
```

## 路由处理函数

路由处理函数可以是单个函数，也可以是多个函数的数组。

### 单个处理函数

```javascript
app.get('/api/users', (req, res) => {
  res.json([{ id: 1, name: '张三' }, { id: 2, name: '李四' }]);
});
```

### 多个处理函数

```javascript
const middleware1 = (req, res, next) => {
  console.log('中间件 1 执行');
  next();
};

const middleware2 = (req, res, next) => {
  console.log('中间件 2 执行');
  next();
};

app.get('/api/users', [middleware1, middleware2], (req, res) => {
  res.json([{ id: 1, name: '张三' }, { id: 2, name: '李四' }]);
});
```

### 处理函数中的 `next()`

`next()` 函数用于将控制权传递给下一个处理函数或中间件。如果不调用 `next()`，请求将被挂起。

```javascript
app.get('/api/users', (req, res, next) => {
  // 执行一些验证
  if (!req.query.apiKey) {
    return res.status(401).json({ message: '未提供 API 密钥' });
  }
  next(); // 验证通过，调用下一个处理函数
}, (req, res) => {
  res.json([{ id: 1, name: '张三' }, { id: 2, name: '李四' }]);
});
```

## 路由中间件

路由中间件是专门为特定路由或路由组设计的中间件。

### 应用级中间件 vs 路由级中间件

- **应用级中间件**：使用 `app.use()` 定义，对所有路由生效
- **路由级中间件**：定义在特定路由上，只对该路由生效

### 路由级中间件示例

```javascript
// 日志中间件
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
};

// 只对 /api/users 路由生效的中间件
app.get('/api/users', logger, (req, res) => {
  res.json([{ id: 1, name: '张三' }, { id: 2, name: '李四' }]);
});
```

### 路由组中间件

可以为一组路由应用中间件：

```javascript
// 创建路由组
const adminRouter = express.Router();

// 路由组中间件 - 验证管理员权限
adminRouter.use((req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: '无管理员权限' });
  }
  next();
});

// 管理员路由
adminRouter.get('/dashboard', (req, res) => {
  res.json({ message: '管理员控制台' });
});

adminRouter.get('/users', (req, res) => {
  res.json({ message: '管理用户' });
});

// 应用路由组
app.use('/admin', adminRouter);
```

## 路由优先级

Express 按照路由定义的顺序匹配请求。如果多个路由可以匹配同一个请求，定义在前面的路由将被执行。

```javascript
// 这个路由将首先匹配
app.get('/api/users', (req, res) => {
  res.json([{ id: 1, name: '张三' }, { id: 2, name: '李四' }]);
});

// 这个路由将不会被匹配，因为上面的路由已经匹配了 '/api/users'
app.get('/api/users', (req, res) => {
  res.json({ message: '这个路由不会被执行' });
});
```

### 路由通配符的优先级

使用通配符的路由应放在更具体的路由之后：

```javascript
// 具体路由
app.get('/api/users/1', (req, res) => {
  res.json({ id: 1, name: '张三' });
});

// 通配符路由
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ id: userId, name: `用户 ${userId}` });
});
```

##  路由的高级使用

### 路由前缀

可以为路由组添加前缀：

```javascript
const apiRouter = express.Router();
const usersRouter = express.Router();
const postsRouter = express.Router();

usersRouter.get('/', (req, res) => {
  res.json([{ id: 1, name: '张三' }, { id: 2, name: '李四' }]);
});

postsRouter.get('/', (req, res) => {
  res.json([{ id: 1, title: '帖子 1' }, { id: 2, title: '帖子 2' }]);
});

apiRouter.use('/users', usersRouter);
apiRouter.use('/posts', postsRouter);

app.use('/api', apiRouter);
```

###  路由重定向

使用 `res.redirect()` 进行路由重定向：

```javascript
app.get('/old-path', (req, res) => {
  res.redirect('/new-path'); // 重定向到新路径
});

app.get('/old-api/users', (req, res) => {
  res.redirect(301, '/api/users'); // 301 永久重定向
});
```

### 路由别名

可以为路由创建别名：

```javascript
app.get(['/home', '/index', '/'], (req, res) => {
  res.send('首页');
});
```

## 总结

Express 的路由系统是构建 Web 应用和 API 的核心。本章节介绍了路由的基本概念、定义方式、参数、处理函数、中间件、优先级和高级使用方法。通过合理使用路由，可以使应用的结构更加清晰，功能更加模块化。在后续章节中，我们将深入学习中间件机制、请求与响应处理等高级主题。