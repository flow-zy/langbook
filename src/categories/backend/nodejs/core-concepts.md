# Node.js 核心概念

## 什么是 Node.js

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时环境，它允许开发者在服务器端运行 JavaScript 代码。Node.js 采用事件驱动、非阻塞 I/O 模型，使其轻量且高效，非常适合构建高性能的网络应用。

```javascript
// 简单的 Node.js 示例
const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(3000, '127.0.0.1', () => {
  console.log('服务器运行在 http://127.0.0.1:3000/');
});
```

## Node.js 的架构

### V8 引擎
V8 是 Google 开发的高性能 JavaScript 引擎，负责解析和执行 JavaScript 代码。Node.js 利用 V8 引擎实现了 JavaScript 的服务端运行。

### libuv
libuv 是一个跨平台的事件循环库，提供了非阻塞 I/O 操作的支持。它是 Node.js 异步编程模型的核心。

### 事件循环
事件循环是 Node.js 处理异步操作的机制。它允许 Node.js 执行非阻塞 I/O 操作，即使 JavaScript 是单线程的。

```javascript
// 事件循环示例
console.log('开始');

setTimeout(() => {
  console.log('定时器回调');
}, 0);

console.log('结束');

// 输出顺序: 开始 -> 结束 -> 定时器回调
```

### 模块化系统
Node.js 采用 CommonJS 模块化规范，使用 `require` 和 `module.exports` 来管理代码模块。

```javascript
// 模块导出示例 (module.js)
const greeting = 'Hello';

function sayHello(name) {
  return `${greeting}, ${name}!`;
}

module.exports = { sayHello };

// 模块导入示例
const { sayHello } = require('./module');
console.log(sayHello('Node.js')); // 输出: Hello, Node.js!
```

## 单线程与多进程

Node.js 是单线程的，但它通过事件循环和非阻塞 I/O 可以处理大量并发请求。对于 CPU 密集型任务，Node.js 提供了 `cluster` 模块，可以创建多个进程来充分利用多核 CPU。

```javascript
// 使用 cluster 模块创建多进程
const cluster = require('cluster');
const os = require('os');
const http = require('http');

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  console.log(`主进程 ${process.pid} 正在运行`);

  // 创建工作进程
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid} 已退出`);
  });
} else {
  // 工作进程创建 HTTP 服务器
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello World\n');
  }).listen(8000);

  console.log(`工作进程 ${process.pid} 已启动`);
}
```

## 全局对象

Node.js 提供了一些全局对象，无需 require 即可使用，如 `process`、`console`、`setTimeout` 等。

### process 对象
`process` 对象提供了当前 Node.js 进程的信息和控制方法。

```javascript
// 输出进程信息
console.log('进程 ID:', process.pid);
console.log('Node.js 版本:', process.version);
console.log('操作系统:', process.platform);

// 监听退出事件
process.on('exit', (code) => {
  console.log(`进程将以退出码 ${code} 退出`);
});
```

## Node.js 的优势

1. **高性能**：非阻塞 I/O 模型使 Node.js 能够处理大量并发连接
2. **单一语言**：前后端都使用 JavaScript，降低了开发成本
3. **丰富的生态系统**：npm 提供了超过 100 万个第三方包
4. **轻量级**：Node.js 本身非常轻量，适合构建微服务
5. **社区活跃**：拥有庞大且活跃的开发者社区

## 适用场景

- 实时应用：如聊天应用、实时游戏
- API 服务器：构建高性能的 RESTful API
- 微服务架构：作为微服务的一部分
- 数据流处理：处理大量数据的流式应用
- 前端构建工具：如 Webpack、Gulp 等

## 注意事项

- Node.js 不适合 CPU 密集型任务，除非使用 cluster 模块或微服务架构
- 单线程模型意味着一个未捕获的异常可能导致整个应用崩溃
- 版本兼容性问题：不同版本的 Node.js 可能存在 API 差异
- 回调地狱：嵌套回调可能导致代码难以维护，可使用 Promise 和 async/await 解决