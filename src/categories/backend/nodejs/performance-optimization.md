# Node.js 性能优化

性能优化是构建高性能 Node.js 应用程序的关键环节。本章节将详细介绍 Node.js 性能优化的各个方面，包括代码优化、I/O 优化、内存管理、并发处理等。

## 代码层面的优化

### 避免同步操作阻塞事件循环

Node.js 是单线程的，同步操作会阻塞事件循环，导致应用响应缓慢。

```javascript
// 错误示例: 同步读取大文件会阻塞事件循环
const fs = require('fs');

app.get('/api/data', (req, res) => {
  const data = fs.readFileSync('large-file.txt', 'utf8'); // 同步读取，会阻塞
  res.send(data);
});

// 正确示例: 使用异步读取
app.get('/api/data', (req, res) => {
  fs.readFile('large-file.txt', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('读取失败');
      return;
    }
    res.send(data);
  });
});
```

### 优化循环和迭代

```javascript
// 优化前
for (let i = 0; i < array.length; i++) {
  // 操作
}

// 优化后: 缓存数组长度
const len = array.length;
for (let i = 0; i < len; i++) {
  // 操作
}

// 更优: 使用 for...of 或数组方法
for (const item of array) {
  // 操作
}

// 或使用 map, filter 等函数式方法
const result = array.map(item => processItem(item));
```

### 避免不必要的计算

```javascript
// 优化前: 每次调用都重新计算
function getFullName(user) {
  return `${user.firstName} ${user.lastName}`;
}

// 优化后: 使用缓存
const cache = new Map();
function getFullNameCached(user) {
  const key = `${user.id}`;
  if (cache.has(key)) {
    return cache.get(key);
  }
  const fullName = `${user.firstName} ${user.lastName}`;
  cache.set(key, fullName);
  return fullName;
}
```

## I/O 操作优化

### 使用流处理大数据

```javascript
const fs = require('fs');
const http = require('http');

// 优化前: 一次性读取全部数据
http.createServer((req, res) => {
  fs.readFile('large-video.mp4', (err, data) => {
    if (err) {
      res.status(500).end();
      return;
    }
    res.setHeader('Content-Type', 'video/mp4');
    res.end(data);
  });
});

// 优化后: 使用流
http.createServer((req, res) => {
  const stream = fs.createReadStream('large-video.mp4');
  res.setHeader('Content-Type', 'video/mp4');
  stream.pipe(res);
});
```

### 数据库查询优化

```javascript
// 优化前: 多次查询
async function getUserData(userId) {
  const user = await db.collection('users').findOne({ id: userId });
  const posts = await db.collection('posts').find({ userId: userId }).toArray();
  const comments = await db.collection('comments').find({ userId: userId }).toArray();
  return { user, posts, comments };
}

// 优化后: 并行查询
async function getUserDataOptimized(userId) {
  const [user, posts, comments] = await Promise.all([
    db.collection('users').findOne({ id: userId }),
    db.collection('posts').find({ userId: userId }).toArray(),
    db.collection('comments').find({ userId: userId }).toArray()
  ]);
  return { user, posts, comments };
}
```

### 批量处理 I/O 操作

```javascript
// 优化前: 多次写入
async function saveData(items) {
  for (const item of items) {
    await fs.writeFile(`data/${item.id}.json`, JSON.stringify(item));
  }
}

// 优化后: 批量写入
async function saveDataBatched(items) {
  const batchSize = 100;
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    await Promise.all(
      batch.map(item => fs.writeFile(`data/${item.id}.json`, JSON.stringify(item)))
    );
  }
}
```

## 内存管理

### 避免内存泄漏

```javascript
// 内存泄漏示例: 未清理的事件监听器
const EventEmitter = require('events');
const emitter = new EventEmitter();

function setupListener() {
  emitter.on('event', () => {
    console.log('事件被触发');
  });
}

// 多次调用会添加多个监听器
setupListener();
setupListener();

// 解决方法: 清理监听器
function setupListener() {
  const handler = () => {
    console.log('事件被触发');
  };
  emitter.on('event', handler);
  return () => emitter.off('event', handler); // 返回清理函数
}

const cleanup = setupListener();
// 不再需要时调用
cleanup();
```

### 优化大型数据结构

```javascript
// 优化前: 存储大量数据在内存中
const largeArray = [];
for (let i = 0; i < 1000000; i++) {
  largeArray.push({ id: i, data: `数据 ${i}` });
}

// 优化后: 使用流或分页加载
function* generateData() {
  for (let i = 0; i < 1000000; i++) {
    yield { id: i, data: `数据 ${i}` };
  }
}

const dataGenerator = generateData();
// 按需获取数据
const firstItem = dataGenerator.next().value;
```

### 使用 Buffer 处理二进制数据

```javascript
// 优化前: 使用字符串处理二进制数据
const binaryData = fs.readFileSync('binary-file');
const stringData = binaryData.toString('utf8'); // 可能导致编码问题

// 优化后: 直接使用 Buffer
const bufferData = fs.readFileSync('binary-file');
// 直接操作 Buffer
console.log(bufferData[0]); // 获取第一个字节
```

## 并发处理

### 使用集群模块 (cluster)

```javascript
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`主进程 ${process.pid} 正在运行`);

  // 衍生工作进程
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid} 已退出`);
    cluster.fork(); // 重启进程
  });
} else {
  // 工作进程创建服务器
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello World\n');
  }).listen(8000);

  console.log(`工作进程 ${process.pid} 已启动`);
}
```

### 使用工作线程 (worker_threads)

```javascript
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
  // 主线程代码
  const worker = new Worker(__filename, {
    workerData: { numbers: [1, 2, 3, 4, 5] }
  });

  worker.on('message', (result) => {
    console.log(`计算结果: ${result}`);
  });

  worker.on('error', (err) => {
    console.error(`工作线程错误: ${err}`);
  });
} else {
  // 工作线程代码
  const { numbers } = workerData;
  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  parentPort.postMessage(sum);
}
```

## 缓存策略

### 使用内存缓存

```javascript
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 60 }); // 过期时间 60 秒

// 设置缓存
cache.set('key', 'value');

// 获取缓存
const value = cache.get('key');

// 缓存数据加载函数
async function getDataWithCache(key, fetchFunction) {
  const cachedData = cache.get(key);
  if (cachedData) {
    return cachedData;
  }

  const freshData = await fetchFunction();
  cache.set(key, freshData);
  return freshData;
}
```

### HTTP 缓存

```javascript
const express = require('express');
const app = express();

// 设置静态文件缓存
app.use(express.static('public', {
  maxAge: '1d', // 缓存 1 天
  etag: true,   // 启用 ETag
  lastModified: true // 启用 Last-Modified
}));

// 为 API 设置缓存控制头
app.get('/api/data', (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=3600'); // 缓存 1 小时
  res.json({ data: 'example' });
});
```

## 监控与分析

### 使用内置工具

```bash
# 检查事件循环延迟
node --expose-gc -e "setInterval(() => {console.log(process.memoryUsage()); gc();}, 1000)"

# 性能分析
node --prof app.js
node --prof-process isolate-0xnnnnnnnnnnnn-v8.log > profile.txt
```

### 使用第三方工具

```javascript
// 使用 clinic.js 进行性能分析
// 安装: npm install -g clinic
// 运行: clinic doctor -- node app.js

// 使用 New Relic 进行应用监控
const newrelic = require('newrelic');

// 使用 PM2 进行进程管理和监控
// 安装: npm install -g pm2
// 运行: pm2 start app.js
// 监控: pm2 monit
```

## 性能优化最佳实践

1. **使用最新版本的 Node.js**：新版本通常包含性能改进。

2. **避免阻塞事件循环**：将 CPU 密集型任务移至工作线程或子进程。

3. **优化 I/O 操作**：使用流处理大数据，批量处理 I/O 操作。

4. **合理使用缓存**：缓存频繁访问的数据，减少重复计算和数据库查询。

5. **监控和分析**：定期分析应用性能，找出瓶颈并进行优化。

6. **优化数据库查询**：使用索引，避免不必要的查询，并行执行独立查询。

7. **内存管理**：避免内存泄漏，优化大型数据结构，及时释放不再使用的资源。

8. **负载均衡**：使用集群模块或外部负载均衡器分发请求。

9. **代码优化**：避免不必要的计算，优化循环和迭代，使用更高效的数据结构。

10. **使用 CDN**：对于静态资源，使用内容分发网络 (CDN) 提高访问速度。