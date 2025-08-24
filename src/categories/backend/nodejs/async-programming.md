# Node.js 异步编程模型

Node.js 的异步编程模型是其核心特性之一，也是区别于其他服务端编程语言的重要特点。本章节将详细介绍 Node.js 的异步编程模型，包括回调函数、Promise、async/await 等。

## 异步编程的基本概念

### 同步 vs 异步

- **同步编程**：代码按照从上到下的顺序执行，每一行代码都必须等待上一行代码执行完成后才能执行。
- **异步编程**：代码执行不阻塞后续代码的运行，当异步操作完成后，通过回调函数或其他方式通知调用者。

```javascript
// 同步代码示例
console.log('开始');
const result = doHeavyComputation();
console.log('结果:', result);
console.log('结束');

// 异步代码示例
console.log('开始');
doHeavyComputationAsync((result) => {
  console.log('结果:', result);
});
console.log('结束');
```

### 阻塞 vs 非阻塞

- **阻塞**：当一个操作正在执行时，阻止其他操作的执行。
- **非阻塞**：当一个操作正在执行时，允许其他操作继续执行。

Node.js 采用**非阻塞 I/O**模型，这意味着当 Node.js 执行 I/O 操作时，不会阻塞事件循环，而是将 I/O 操作交给底层系统处理，当 I/O 操作完成后，通过回调函数通知 Node.js。

## 回调函数

回调函数是 Node.js 中最基础的异步处理方式。

### 基本使用

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
```

### 回调地狱

当有多个异步操作嵌套时，容易产生"回调地狱"（Callback Hell）。

```javascript
// 回调地狱示例
fs.readFile('file1.txt', 'utf8', (err, data1) => {
  if (err) {
    console.error('读取 file1 失败:', err);
    return;
  }

  fs.readFile('file2.txt', 'utf8', (err, data2) => {
    if (err) {
      console.error('读取 file2 失败:', err);
      return;
    }

    fs.writeFile('output.txt', data1 + data2, (err) => {
      if (err) {
        console.error('写入失败:', err);
        return;
      }
      console.log('写入成功');
    });
  });
});
```

### 解决回调地狱

1. **使用命名函数**

```javascript
function readFile1Callback(err, data1) {
  if (err) {
    console.error('读取 file1 失败:', err);
    return;
  }
  fs.readFile('file2.txt', 'utf8', (err, data2) => readFile2Callback(err, data2, data1));
}

function readFile2Callback(err, data2, data1) {
  if (err) {
    console.error('读取 file2 失败:', err);
    return;
  }
  fs.writeFile('output.txt', data1 + data2, writeFileCallback);
}

function writeFileCallback(err) {
  if (err) {
    console.error('写入失败:', err);
    return;
  }
  console.log('写入成功');
}

fs.readFile('file1.txt', 'utf8', readFile1Callback);
```

2. **使用 Promise**（推荐）

## Promise

Promise 是 ES6 引入的异步编程解决方案，用于解决回调地狱问题。

### 基本使用

```javascript
const fs = require('fs').promises;

// 使用 Promise 读取文件
fs.readFile('example.txt', 'utf8')
  .then(data => {
    console.log('文件内容:', data);
  })
  .catch(err => {
    console.error('读取失败:', err);
  });
```

### Promise 链式调用

```javascript
// Promise 链式调用示例
fs.readFile('file1.txt', 'utf8')
  .then(data1 => {
    console.log('file1 内容:', data1);
    return fs.readFile('file2.txt', 'utf8');
  })
  .then(data2 => {
    console.log('file2 内容:', data2);
    return fs.writeFile('output.txt', data1 + data2);
  })
  .then(() => {
    console.log('写入成功');
  })
  .catch(err => {
    console.error('发生错误:', err);
  });
```

### Promise 静态方法

```javascript
// Promise.all: 等待所有 Promise 完成
Promise.all([
  fs.readFile('file1.txt', 'utf8'),
  fs.readFile('file2.txt', 'utf8')
])
  .then(([data1, data2]) => {
    console.log('file1 内容:', data1);
    console.log('file2 内容:', data2);
  })
  .catch(err => {
    console.error('发生错误:', err);
  });

// Promise.race: 等待第一个完成的 Promise
Promise.race([
  fs.readFile('file1.txt', 'utf8'),
  new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('超时')), 1000);
  })
])
  .then(data => {
    console.log('file1 内容:', data);
  })
  .catch(err => {
    console.error('发生错误:', err);
  });
```

## async/await

async/await 是 ES2017 引入的语法糖，基于 Promise，使异步代码看起来更像同步代码。

### 基本使用

```javascript
const fs = require('fs').promises;

// 使用 async/await 读取文件
async function readFileAsync() {
  try {
    const data = await fs.readFile('example.txt', 'utf8');
    console.log('文件内容:', data);
  } catch (err) {
    console.error('读取失败:', err);
  }
}

readFileAsync();
```

### 处理多个异步操作

```javascript
async function processFiles() {
  try {
    // 并行执行
    const [data1, data2] = await Promise.all([
      fs.readFile('file1.txt', 'utf8'),
      fs.readFile('file2.txt', 'utf8')
    ]);

    console.log('file1 内容:', data1);
    console.log('file2 内容:', data2);

    await fs.writeFile('output.txt', data1 + data2);
    console.log('写入成功');
  } catch (err) {
    console.error('发生错误:', err);
  }
}

processFiles();
```

## 事件循环

事件循环是 Node.js 异步编程的核心机制，负责处理所有异步操作的回调函数。

### 事件循环的阶段

Node.js 的事件循环分为以下几个阶段：

1. **timers**：执行 `setTimeout` 和 `setInterval` 的回调函数。
2. **I/O callbacks**：执行除了 `setTimeout`、`setInterval`、`setImmediate` 和 I/O 操作之外的回调函数。
3. **idle, prepare**：内部使用。
4. **poll**：获取新的 I/O 事件，执行 I/O 相关的回调函数。
5. **check**：执行 `setImmediate` 的回调函数。
6. **close callbacks**：执行关闭事件的回调函数，如 `socket.on('close', ...)`。

### 事件循环示例

```javascript
console.log('开始');

// 定时器
setTimeout(() => {
  console.log('setTimeout 回调');
}, 0);

// 立即执行
setImmediate(() => {
  console.log('setImmediate 回调');
});

// I/O 操作
fs.readFile('example.txt', 'utf8', (err, data) => {
  console.log('fs.readFile 回调');
});

console.log('结束');
```

## 异步模式最佳实践

1. **优先使用 async/await**：使代码更清晰、更易于维护。

2. **避免回调地狱**：使用 Promise 或 async/await 替代嵌套回调。

3. **处理所有错误**：始终使用 `try/catch`（对于 async/await）或 `.catch()`（对于 Promise）处理错误。

4. **并行执行独立的异步操作**：使用 `Promise.all` 并行执行多个独立的异步操作，提高性能。

5. **避免阻塞事件循环**：不要在事件循环中执行 CPU 密集型操作，考虑使用 `worker_threads` 或子进程。

6. **理解事件循环的工作原理**：有助于编写更高效的异步代码。

## 常见陷阱

1. **回调函数中的 this 指向**

```javascript
const obj = {
  name: 'Node.js',
  readFile: function() {
    fs.readFile('example.txt', 'utf8', function(err, data) {
      if (err) {
        console.error('读取失败:', err);
        return;
      }
      console.log(this.name); // 这里的 this 不是 obj
    });
  }
};

// 解决方法 1: 使用箭头函数
const obj = {
  name: 'Node.js',
  readFile: function() {
    fs.readFile('example.txt', 'utf8', (err, data) => {
      if (err) {
        console.error('读取失败:', err);
        return;
      }
      console.log(this.name); // 这里的 this 是 obj
    });
  }
};
```

2. **异步函数中忽略错误处理**

```javascript
// 错误示例
async function readFileAsync() {
  const data = await fs.readFile('example.txt', 'utf8'); // 没有处理错误
  console.log('文件内容:', data);
}

// 正确示例
async function readFileAsync() {
  try {
    const data = await fs.readFile('example.txt', 'utf8');
    console.log('文件内容:', data);
  } catch (err) {
    console.error('读取失败:', err);
  }
}
```

3. **混淆同步和异步代码**

```javascript
// 错误示例
function getData() {
  let result;
  fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('读取失败:', err);
      return;
    }
    result = data;
  });
  return result; // 这里 result 始终是 undefined
}

// 正确示例
function getData() {
  return fs.readFile('example.txt', 'utf8');
}

getData()
  .then(data => {
    console.log('数据:', data);
  })
  .catch(err => {
    console.error('读取失败:', err);
  });
```