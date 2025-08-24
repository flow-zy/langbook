# 快速入门

## 环境搭建

在开始使用 Express 之前，你需要确保已经安装了 Node.js 和 npm（Node.js 包管理器）。

### 安装 Node.js 和 npm

- 访问 [Node.js 官方网站](https://nodejs.org/) 下载并安装最新版本的 Node.js
- 安装完成后，打开终端/命令提示符，运行以下命令验证安装：

```bash
node -v  # 检查 Node.js 版本
npm -v   # 检查 npm 版本
```

### 创建项目目录

```bash
mkdir my-express-app
cd my-express-app
```

### 初始化项目

```bash
npm init -y
```

这将创建一个 `package.json` 文件，用于管理项目的依赖和配置。

## 安装 Express

在项目目录中运行以下命令安装 Express：

```bash
npm install express --save
```

安装完成后，`package.json` 文件中将添加 Express 作为依赖。

## 创建第一个 Express 应用

### 创建入口文件

在项目根目录下创建 `app.js` 文件，这将是我们应用的入口文件。

### 编写基本代码

在 `app.js` 中添加以下代码：

```javascript
// 导入 Express 模块
const express = require('express');
// 创建 Express 应用实例
const app = express();
// 设置端口号
const port = 3000;

// 定义路由
app.get('/', (req, res) => {
  res.send('Hello Express!');
});

// 启动服务器
app.listen(port, () => {
  console.log(`Express 服务器运行在 http://localhost:${port}`);
});
```

### 代码解释

- `const express = require('express');`：导入 Express 模块
- `const app = express();`：创建 Express 应用实例
- `app.get('/', (req, res) => {...});`：定义一个 GET 路由，当访问根路径 `/` 时，发送 'Hello Express!' 响应
- `app.listen(port, () => {...});`：启动服务器，监听指定端口

## 运行应用

在终端/命令提示符中运行以下命令启动应用：

```bash
node app.js
```

如果一切正常，你将看到以下输出：

```
Express 服务器运行在 http://localhost:3000
```

现在，打开浏览器，访问 [http://localhost:3000](http://localhost:3000)，你将看到 'Hello Express!' 消息。

## 添加路由示例

让我们添加一些基本的路由来扩展我们的应用：

```javascript
// GET 路由 - 返回用户列表
app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: '张三' },
    { id: 2, name: '李四' },
    { id: 3, name: '王五' }
  ]);
});

// GET 路由 - 返回单个用户
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ id: userId, name: `用户 ${userId}` });
});

// POST 路由 - 创建新用户
app.post('/api/users', express.json(), (req, res) => {
  const newUser = req.body;
  res.status(201).json({ message: '用户创建成功', user: newUser });
});
```

### 路由测试

你可以使用工具如 [Postman](https://www.postman.com/) 或 [curl](https://curl.se/) 来测试这些路由：

- 测试 GET `/api/users`：
  ```bash
  curl http://localhost:3000/api/users
  ```

- 测试 GET `/api/users/1`：
  ```bash
  curl http://localhost:3000/api/users/1
  ```

- 测试 POST `/api/users`：
  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"name":"赵六"}' http://localhost:3000/api/users
  ```

## 添加中间件

中间件是 Express 的核心概念之一，让我们添加一些基本的中间件：

### 日志中间件

```javascript
// 日志中间件
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
};

// 应用日志中间件
app.use(logger);
```

### 静态文件中间件

```javascript
// 提供静态文件服务
app.use(express.static('public'));
```

创建 `public` 目录，并在其中添加一个 `index.html` 文件，然后访问 [http://localhost:3000/index.html](http://localhost:3000/index.html) 查看效果。

### 解析请求体中间件

```javascript
// 解析 JSON 请求体
app.use(express.json());

// 解析 URL 编码的请求体
app.use(express.urlencoded({ extended: true }));
```

## 错误处理

添加基本的错误处理中间件：

```javascript
// 404 错误处理
app.use((req, res, next) => {
  res.status(404).send('页面未找到');
});

// 500 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('服务器内部错误');
});
```

## 使用 Express 生成器

Express 提供了一个生成器工具，可以快速创建 Express 应用的基本结构。

### 安装 Express 生成器

```bash
npm install -g express-generator
```

### 使用 Express 生成器创建应用

```bash
express my-express-app\ccd my-express-app
npm install
```

###  运行生成的应用

```bash
npm start
```

## 总结

本章节介绍了如何快速入门 Express，包括环境搭建、安装 Express、创建第一个应用、基本路由、中间件使用和错误处理。通过这些基础知识，你已经可以开始构建简单的 Express 应用了。在后续章节中，我们将深入学习 Express 的各个方面，包括路由系统、中间件机制、数据库集成等。