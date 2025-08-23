# 事件循环 (Event Loop) 与回调函数 (Callback)

事件循环和回调函数是JavaScript中处理异步操作的核心机制，它们决定了代码的执行顺序。

## 回调函数

回调函数是作为参数传递给另一个函数的函数，它会在某个特定事件发生或某个异步操作完成后被调用。

### 同步回调

同步回调函数在主函数执行过程中被调用：

```javascript
function doSomething(callback) {
  console.log("执行主函数");
  callback(); // 调用回调函数
  console.log("主函数执行完毕");
}

function callbackFunction() {
  console.log("执行回调函数");
}

doSomething(callbackFunction);
// 输出顺序:
// "执行主函数"
// "执行回调函数"
// "主函数执行完毕"
```

### 异步回调

异步回调函数在主函数执行完毕后，某个异步操作完成时被调用：

```javascript
function fetchData(callback) {
  console.log("开始获取数据");
  setTimeout(function() {
    console.log("数据获取完毕");
    callback({ data: "模拟数据" });
  }, 1000);
  console.log("主函数执行完毕");
}

function processData(data) {
  console.log("处理数据:", data);
}

fetchData(processData);
// 输出顺序:
// "开始获取数据"
// "主函数执行完毕"
// (1秒后)
// "数据获取完毕"
// "处理数据: { data: '模拟数据' }"
```

## 同步与异步执行

JavaScript是单线程语言，但它可以通过异步操作实现非阻塞执行：

```javascript
// 同步代码
console.log("1");
console.log("2");
console.log("3");
// 输出: 1, 2, 3

// 异步代码
console.log("1");
setTimeout(function() {
  console.log("2");
}, 0);
console.log("3");
// 输出: 1, 3, 2
```

## 事件循环的基本原理

事件循环是JavaScript引擎处理异步操作的机制，它负责协调代码的执行顺序：

1. 执行同步代码，将异步操作放入相应的队列
2. 当同步代码执行完毕后，检查任务队列
3. 执行队列中的任务，直到队列为空
4. 重复步骤2-3

```javascript
console.log("开始");

// 异步任务
setTimeout(function() {
  console.log("异步任务1");
  setTimeout(function() {
    console.log("异步任务2");
  }, 0);
}, 0);

setTimeout(function() {
  console.log("异步任务3");
}, 0);

console.log("结束");

// 输出顺序:
// "开始"
// "结束"
// "异步任务1"
// "异步任务3"
// "异步任务2"
```

## 任务队列

在ES5中，JavaScript只有一种任务队列，用于处理各种异步操作：

- setTimeout
- setInterval
- setImmediate (Node.js)
- I/O操作
- UI渲染 (浏览器)

注意：在ES5中没有微任务和宏任务的区分，这些概念是在ES6及以后版本中引入的。

## 事件循环的执行过程

1. 执行全局上下文的同步代码，将异步操作加入任务队列
2. 全局上下文代码执行完毕后，调用栈为空
3. 检查任务队列，执行队列中的第一个任务
4. 任务执行完毕后，检查是否有新的任务加入队列
5. 重复步骤3-4，形成循环

## 实际应用场景

### 处理异步数据获取

```javascript
function fetchData(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onload = function() {
    if (xhr.status === 200) {
      callback(null, JSON.parse(xhr.responseText));
    } else {
      callback(new Error("请求失败: " + xhr.status));
    }
  };
  xhr.onerror = function() {
    callback(new Error("网络错误"));
  };
  xhr.send();
}

fetchData("https://api.example.com/data", function(error, data) {
  if (error) {
    console.error("错误:", error);
  } else {
    console.log("数据:", data);
  }
});
```

### 避免回调地狱

多层嵌套的回调函数会导致代码难以维护，称为回调地狱：

```javascript
// 回调地狱
fetchData("url1", function(error, data1) {
  if (error) {
    console.error(error);
  } else {
    fetchData("url2?param=" + data1.id, function(error, data2) {
      if (error) {
        console.error(error);
      } else {
        fetchData("url3?param=" + data2.id, function(error, data3) {
          // 更多嵌套...
        });
      }
    });
  }
});

// 解决方案: 使用命名函数和模块化
function processData1(error, data1) {
  if (error) {
    console.error(error);
    return;
  }
  fetchData("url2?param=" + data1.id, processData2);
}

function processData2(error, data2) {
  if (error) {
    console.error(error);
    return;
  }
  fetchData("url3?param=" + data2.id, processData3);
}

function processData3(error, data3) {
  if (error) {
    console.error(error);
    return;
  }
  // 处理最终数据
  console.log("最终数据:", data3);
}

// 启动异步流程
fetchData("url1", processData1);
```

## 常见问题

### 定时器不准确

`setTimeout` 和 `setInterval` 不能保证精确的执行时间，因为它们依赖于事件循环：

```javascript
console.log("开始");
setTimeout(function() {
  console.log("1秒后执行");
}, 1000);
// 如果主线程有耗时操作，定时器的执行会被延迟
for (var i = 0; i < 1000000000; i++) {
  // 耗时操作
}
console.log("结束");
```

### 异步任务的执行顺序

在ES5中，所有异步任务都按照它们被添加到队列的顺序执行：

```javascript
console.log("1");

setTimeout(function() {
  console.log("2");
}, 0);

setTimeout(function() {
  console.log("3");
}, 0);

console.log("4");

// 输出顺序: 1, 4, 2, 3
```

理解事件循环和回调函数是掌握JavaScript异步编程的关键，它帮助我们编写更高效、更可靠的异步代码。在ES5中，所有异步任务都在同一个队列中按顺序执行，没有微任务和宏任务的区分。