# Node.js 常用模块

Node.js 提供了丰富的内置模块，这些模块是 Node.js 生态系统的核心组成部分。本章节将详细介绍一些最常用的内置模块及其使用方法。

## 文件系统模块 (fs)

`fs` 模块提供了文件系统的操作接口，包括文件读写、创建、删除等功能。

### 同步与异步操作

`fs` 模块的大多数方法都有同步和异步两种版本：

```javascript
const fs = require('fs');

// 异步读取文件
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('读取失败:', err);
    return;
  }
  console.log('文件内容:', data);
});

// 同步读取文件
try {
  const data = fs.readFileSync('example.txt', 'utf8');
  console.log('文件内容:', data);
} catch (err) {
  console.error('读取失败:', err);
}
```

### 文件写入

```javascript
// 异步写入文件
fs.writeFile('output.txt', 'Hello Node.js', (err) => {
  if (err) {
    console.error('写入失败:', err);
    return;
  }
  console.log('写入成功');
});

// 同步写入文件
try {
  fs.writeFileSync('output.txt', 'Hello Node.js');
  console.log('写入成功');
} catch (err) {
  console.error('写入失败:', err);
}
```

### 文件追加

```javascript
// 异步追加内容
fs.appendFile('output.txt', '\n追加的内容', (err) => {
  if (err) {
    console.error('追加失败:', err);
    return;
  }
  console.log('追加成功');
});
```

### 文件状态

```javascript
// 检查文件状态
fs.stat('example.txt', (err, stats) => {
  if (err) {
    console.error('获取状态失败:', err);
    return;
  }
  console.log('是否为文件:', stats.isFile());
  console.log('是否为目录:', stats.isDirectory());
  console.log('文件大小:', stats.size);
  console.log('创建时间:', stats.birthtime);
});
```

## 路径模块 (path)

`path` 模块提供了处理文件路径的工具函数。

```javascript
const path = require('path');

// 路径拼接
const fullPath = path.join(__dirname, 'files', 'example.txt');
console.log('拼接后的路径:', fullPath);

// 获取绝对路径
const absolutePath = path.resolve('files', 'example.txt');
console.log('绝对路径:', absolutePath);

// 获取路径的各个部分
console.log('目录名:', path.dirname(fullPath));
console.log('文件名:', path.basename(fullPath));
console.log('扩展名:', path.extname(fullPath));

// 解析路径
const parsedPath = path.parse(fullPath);
console.log('解析后的路径:', parsedPath);
```

## HTTP 模块

`http` 模块用于创建 HTTP 服务器和客户端。

### 创建 HTTP 服务器

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // 设置响应头
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  // 发送响应内容
  res.end('Hello World\n');
});

// 监听端口
server.listen(3000, '127.0.0.1', () => {
  console.log('服务器运行在 http://127.0.0.1:3000/');
});
```

### 处理不同的请求方法和路径

```javascript
const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === 'GET' && url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('首页\n');
  } else if (method === 'GET' && url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('关于我们\n');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('未找到页面\n');
  }
});
```

### 发起 HTTP 请求

```javascript
const options = {
  hostname: 'www.example.com',
  port: 80,
  path: '/',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`状态码: ${res.statusCode}`);
  console.log(`响应头: ${JSON.stringify(res.headers)}`);

  res.on('data', (chunk) => {
    console.log(`响应数据: ${chunk.toString()}`);
  });

  res.on('end', () => {
    console.log('响应结束');
  });
});

req.on('error', (e) => {
  console.error(`请求遇到问题: ${e.message}`);
});

// 结束请求
req.end();
```

## URL 模块

`url` 模块用于解析和格式化 URL。

```javascript
const url = require('url');

const urlString = 'http://user:pass@example.com:8080/path/to/file?query=string#hash';

// 解析 URL
const parsedUrl = url.parse(urlString, true); // 第二个参数为 true 时，会解析 query 字符串
console.log('解析后的 URL:', parsedUrl);

// 获取各个部分
console.log('协议:', parsedUrl.protocol);
console.log('主机名:', parsedUrl.hostname);
console.log('端口:', parsedUrl.port);
console.log('路径:', parsedUrl.pathname);
console.log('查询参数:', parsedUrl.query);
console.log('哈希:', parsedUrl.hash);

// 格式化 URL
const formattedUrl = url.format({
  protocol: 'https:',
  hostname: 'example.com',
  pathname: '/path',
  query: { foo: 'bar' }
});
console.log('格式化后的 URL:', formattedUrl);
```

## 查询字符串模块 (querystring)

`querystring` 模块用于处理 URL 查询字符串。

```javascript
const querystring = require('querystring');

// 解析查询字符串
const qs = 'name=node&version=16.x&features=async';
const parsed = querystring.parse(qs);
console.log('解析后的查询字符串:', parsed);

// 序列化对象为查询字符串
const obj = { name: 'node', version: '16.x', features: ['async', 'modules'] };
const serialized = querystring.stringify(obj);
console.log('序列化后的查询字符串:', serialized);

// 转义与反转义
const escaped = querystring.escape('name=node&version=16.x');
console.log('转义后的字符串:', escaped);
const unescaped = querystring.unescape(escaped);
console.log('反转义后的字符串:', unescaped);
```

## 操作系统模块 (os)

`os` 模块提供了操作系统相关的信息。

```javascript
const os = require('os');

// 获取 CPU 信息
console.log('CPU 信息:', os.cpus());

// 获取内存信息
console.log('总内存 (字节):', os.totalmem());
console.log('可用内存 (字节):', os.freemem());

// 获取操作系统信息
console.log('操作系统平台:', os.platform());
console.log('操作系统类型:', os.type());
console.log('操作系统版本:', os.release());

// 获取主机名
console.log('主机名:', os.hostname());

// 获取临时目录
console.log('临时目录:', os.tmpdir());
```

## 事件模块 (events)

`events` 模块提供了事件触发和监听的功能，是 Node.js 异步编程的基础。

```javascript
const EventEmitter = require('events');

// 创建自定义事件发射器
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

// 监听事件
myEmitter.on('event', (arg1, arg2) => {
  console.log('事件被触发', arg1, arg2);
});

// 触发事件
myEmitter.emit('event', '参数1', '参数2');

// 一次性事件监听
myEmitter.once('onceEvent', () => {
  console.log('这个事件只会被触发一次');
});

myEmitter.emit('onceEvent'); // 会触发
myEmitter.emit('onceEvent'); // 不会触发

// 错误事件
myEmitter.on('error', (err) => {
  console.error('捕获到错误:', err.message);
});

myEmitter.emit('error', new Error('测试错误'));
```

## 流模块 (stream)

`stream` 模块提供了流式处理数据的能力，适用于处理大量数据。

```javascript
const fs = require('fs');

// 创建可读流
const readable = fs.createReadStream('large-file.txt', { highWaterMark: 64 * 1024 });

// 创建可写流
const writable = fs.createWriteStream('output.txt');

// 管道流: 将可读流的数据直接传输到可写流
readable.pipe(writable);

// 监听事件
readable.on('data', (chunk) => {
  console.log(`读取到 ${chunk.length} 字节的数据`);
});

readable.on('end', () => {
  console.log('读取完成');
});

writable.on('finish', () => {
  console.log('写入完成');
});
```

## 注意事项

1. **异步优先**：在 Node.js 中，应优先使用异步 API，避免同步 API 阻塞事件循环。

2. **错误处理**：始终处理异步操作中的错误，避免未捕获的异常导致应用崩溃。

3. **资源释放**：对于打开的文件、网络连接等资源，使用完毕后应及时关闭。

4. **模块化**：合理组织代码，将功能拆分为多个模块，提高代码的可维护性。

5. **版本兼容性**：不同版本的 Node.js 可能对某些模块的 API 有修改，注意检查兼容性。

6. **性能考虑**：对于大量数据的处理，考虑使用流（stream）而不是一次性读取全部数据。