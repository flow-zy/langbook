# 请求与响应处理

## 请求对象 (Request)

请求对象（通常称为 `req`）包含客户端发送的 HTTP 请求的所有信息。Express 对原生 Node.js 的请求对象进行了扩展，提供了更多实用的方法和属性。

### 请求对象的常用属性

```javascript
// 请求 URL 路径
console.log(req.url);

// HTTP 请求方法
console.log(req.method);

// 请求头
console.log(req.headers);

// 用户代理
console.log(req.headers['user-agent']);

// 请求体（需要 body-parser 或 express.json() 中间件）
console.log(req.body);

// URL 参数
console.log(req.params);

// 查询字符串参数
console.log(req.query);

// cookies（需要 cookie-parser 中间件）
console.log(req.cookies);

// 会话（需要 express-session 中间件）
console.log(req.session);

// 文件上传（需要 multer 中间件）
console.log(req.files);
```

### 请求对象的常用方法

```javascript
// 检查请求头是否存在
req.hasHeader('content-type');

// 获取请求头
req.get('content-type');

// 检查 Accept 头部是否接受特定类型
req.accepts('application/json');
req.accepts(['json', 'html']);

// 检查请求是否通过 HTTPS 发送
req.secure;

// 获取客户端 IP 地址
req.ip;

// 获取请求路径的子路径
req.path;

// 获取完整的请求 URL
req.originalUrl;
```

## 响应对象 (Response)

响应对象（通常称为 `res`）用于向客户端发送响应。Express 对原生 Node.js 的响应对象进行了扩展，提供了更多实用的方法。

### 响应对象的常用方法

```javascript
// 发送各种类型的响应
res.send('Hello World!');
res.send('<h1>Hello World!</h1>');
res.send({ message: 'Hello World!' });

// 发送 JSON 响应
res.json({ message: 'Hello World!' });

// 发送 JSONP 响应
res.jsonp({ message: 'Hello World!' });

// 设置 HTTP 状态码
res.status(200);
res.status(404).send('页面未找到');
res.status(500).json({ error: '服务器内部错误' });

// 重定向请求
res.redirect('/new-path');
res.redirect(301, '/permanent-redirect');

// 发送文件
res.sendFile(__dirname + '/public/index.html');

// 设置响应头
res.set('Content-Type', 'application/json');
res.set({
  'Content-Type': 'application/json',
  'X-Powered-By': 'Express'
});

// 获取响应头
res.get('Content-Type');

// 设置 Cookie
res.cookie('name', 'value', { maxAge: 900000, httpOnly: true });

// 清除 Cookie
res.clearCookie('name');

// 附加响应数据
res.append('Link', ['<http://example.com/>', '<http://example.com:8080/>']);

// 结束响应
res.end();
```

### 链式调用

响应对象的方法支持链式调用：

```javascript
res.status(201)
   .set('Content-Type', 'application/json')
   .json({ message: '创建成功' });
```

## 请求处理流程

在 Express 中，请求处理流程通常包括以下步骤：

1. 接收请求
2. 中间件处理
3. 路由匹配
4. 业务逻辑处理
5. 生成响应
6. 发送响应

### 请求处理示例

```javascript
// 中间件处理 - 日志记录
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// 中间件处理 - 解析请求体
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 路由匹配和业务逻辑处理
app.get('/api/users', (req, res) => {
  // 模拟从数据库获取用户数据
  const users = [
    { id: 1, name: '张三', age: 25 },
    { id: 2, name: '李四', age: 30 }
  ];

  // 生成和发送响应
  res.json(users);
});

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('服务器内部错误');
});
```

## 处理不同类型的请求

### GET 请求

GET 请求用于获取资源：

```javascript
app.get('/api/users', (req, res) => {
  // 获取查询参数
  const { page = 1, limit = 10 } = req.query;

  // 模拟从数据库获取用户数据
  const users = [
    { id: 1, name: '张三', age: 25 },
    { id: 2, name: '李四', age: 30 }
  ];

  res.json({
    page: parseInt(page),
    limit: parseInt(limit),
    total: users.length,
    data: users
  });
});
```

### POST 请求

POST 请求用于创建资源：

```javascript
app.post('/api/users', (req, res) => {
  // 获取请求体数据
  const { name, age } = req.body;

  if (!name || !age) {
    return res.status(400).json({ error: '姓名和年龄是必填项' });
  }

  // 模拟创建用户
  const newUser = {
    id: Date.now(),
    name,
    age
  };

  res.status(201).json(newUser);
});
```

###  PUT 请求

PUT 请求用于更新资源：

```javascript
app.put('/api/users/:id', (req, res) => {
  // 获取 URL 参数
  const { id } = req.params;
  // 获取请求体数据
  const { name, age } = req.body;

  // 模拟更新用户
  const updatedUser = {
    id: parseInt(id),
    name: name || `用户 ${id}`,
    age: age || 0
  };

  res.json(updatedUser);
});
```

### DELETE 请求

DELETE 请求用于删除资源：

```javascript
app.delete('/api/users/:id', (req, res) => {
  // 获取 URL 参数
  const { id } = req.params;

  // 模拟删除用户
  res.json({ message: `用户 ${id} 删除成功` });
});
```

##  高级请求处理

###  文件上传

使用 `multer` 中间件处理文件上传：

```javascript
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// 单文件上传
app.post('/api/upload', upload.single('avatar'), (req, res) => {
  res.json({
    message: '文件上传成功',
    file: req.file
  });
});

// 多文件上传
app.post('/api/uploads', upload.array('photos', 5), (req, res) => {
  res.json({
    message: '文件上传成功',
    files: req.files
  });
});
```

###  表单数据处理

使用 `express.urlencoded()` 中间件处理表单数据：

```javascript
app.use(express.urlencoded({ extended: true }));

app.post('/api/form', (req, res) => {
  const { username, password } = req.body;
  res.json({ username, password });
});
```

###  JSON 请求体处理

使用 `express.json()` 中间件处理 JSON 请求体：

```javascript
app.use(express.json());

app.post('/api/json', (req, res) => {
  const { name, age } = req.body;
  res.json({ name, age });
});
```

##  响应格式化与内容协商

### 内容协商

Express 支持内容协商，可以根据客户端的 `Accept` 头部返回不同格式的响应：

```javascript
app.get('/api/data', (req, res) => {
  const data = {
    id: 1,
    name: '示例数据'
  };

  if (req.accepts('json')) {
    res.json(data);
  } else if (req.accepts('html')) {
    res.send(`<div>${JSON.stringify(data)}</div>`);
  } else {
    res.type('text/plain').send(JSON.stringify(data));
  }
});
```

###  响应格式化中间件

可以创建中间件来统一格式化响应：

```javascript
// 响应格式化中间件
const formatResponse = (req, res, next) => {
  const originalSend = res.send;
  const originalJson = res.json;

  res.send = function(data) {
    if (typeof data === 'object') {
      return originalJson.call(this, {
        success: true,
        data
      });
    }
    return originalSend.call(this, data);
  };

  res.json = function(data) {
    return originalJson.call(this, {
      success: true,
      data
    });
  };

  next();
};

app.use(formatResponse);
```

## 总结

请求与响应处理是 Express 应用的核心功能。本章节介绍了请求对象和响应对象的常用属性和方法，以及如何处理不同类型的请求。通过合理使用这些功能，可以构建出强大而灵活的 Web 应用和 API。在后续章节中，我们将学习错误处理、数据库集成等高级主题。