# Node.js 基础语法

## JavaScript 基础回顾

Node.js 使用 JavaScript 作为编程语言，因此掌握 JavaScript 基础语法是学习 Node.js 的前提。本部分将简要回顾 JavaScript 的核心语法，并重点讲解与 Node.js 相关的特性。

### 变量声明

在 JavaScript 中，有三种变量声明方式：`var`、`let` 和 `const`。

```javascript
// var 声明 (函数作用域)
var name = 'Node.js';

// let 声明 (块级作用域)
let age = 12;

// const 声明 (常量，不可重新赋值)
const pi = 3.14159;
```

### 数据类型

JavaScript 有七种基本数据类型和一种引用数据类型。

```javascript
// 基本数据类型
let num = 42; // 数字
let str = 'Hello'; // 字符串
let bool = true; // 布尔值
let undef = undefined; // 未定义
let nul = null; // 空值
let sym = Symbol('sym'); // 符号
let bigInt = BigInt(9007199254740991); // 大整数

// 引用数据类型
let obj = { name: 'Node.js', version: '16.x' }; // 对象
let arr = [1, 2, 3, 4, 5]; // 数组
```

### 函数

函数是 JavaScript 中的一等公民，可以作为参数传递，也可以作为返回值。

```javascript
// 函数声明
function add(a, b) {
  return a + b;
}

// 函数表达式
const multiply = function(a, b) {
  return a * b;
};

// 箭头函数
const subtract = (a, b) => a - b;

// 函数调用
console.log(add(2, 3)); // 输出: 5
console.log(multiply(2, 3)); // 输出: 6
console.log(subtract(5, 2)); // 输出: 3
```

## Node.js 特有的语法特性

### 模块系统

Node.js 采用 CommonJS 模块规范，使用 `require` 和 `module.exports` 进行模块管理。

```javascript
// 导出模块 (math.js)
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;

module.exports = { add, subtract };

// 导入模块
const math = require('./math');
console.log(math.add(2, 3)); // 输出: 5
console.log(math.subtract(5, 2)); // 输出: 3

// 解构导入
const { add, subtract } = require('./math');
```

### 路径处理

Node.js 提供了 `path` 模块来处理文件路径。

```javascript
const path = require('path');

// 获取当前文件目录
const dirname = __dirname;
console.log('当前目录:', dirname);

// 获取当前文件路径
const filename = __filename;
console.log('当前文件:', filename);

// 路径拼接
const joinedPath = path.join(__dirname, 'utils', 'helper.js');
console.log('拼接后的路径:', joinedPath);

// 获取绝对路径
const absolutePath = path.resolve('utils', 'helper.js');
console.log('绝对路径:', absolutePath);

// 获取文件扩展名
const extname = path.extname('index.js');
console.log('文件扩展名:', extname); // 输出: .js
```

### 命令行参数

Node.js 提供了 `process.argv` 数组来访问命令行参数。

```javascript
// 打印命令行参数
console.log('命令行参数:', process.argv);

// 示例: 执行 node app.js --name=node --version=16
// process.argv 的值为: [node路径, app.js路径, --name=node, --version=16]

// 解析命令行参数
const args = process.argv.slice(2);
const params = {};

args.forEach(arg => {
  if (arg.startsWith('--')) {
    const [key, value] = arg.slice(2).split('=');
    params[key] = value;
  }
});

console.log('解析后的参数:', params); // 输出: { name: 'node', version: '16' }
```

### 异步编程基础

Node.js 采用异步编程模型，回调函数是最基础的异步处理方式。

```javascript
// 异步文件读取
const fs = require('fs');

fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('读取文件失败:', err);
    return;
  }
  console.log('文件内容:', data);
});

console.log('异步读取文件操作已发起');
```

### 错误处理

Node.js 中，错误处理是非常重要的一部分，通常使用回调函数的第一个参数来传递错误。

```javascript
// 错误处理示例
function readFileAsync(path, callback) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      // 传递错误给回调函数
      return callback(err);
    }
    // 成功时，第一个参数为 null
    callback(null, data);
  });
}

// 调用函数
readFileAsync('example.txt', (err, data) => {
  if (err) {
    console.error('发生错误:', err.message);
    return;
  }
  console.log('文件内容:', data);
});
```

## 常用工具函数

### 定时器

Node.js 提供了几种定时器函数：

```javascript
// setTimeout: 延迟执行一次
const timeoutId = setTimeout(() => {
  console.log('延迟 2 秒后执行');
}, 2000);

// 取消定时器
// clearTimeout(timeoutId);

// setInterval: 每隔一段时间执行一次
const intervalId = setInterval(() => {
  console.log('每隔 1 秒执行一次');
}, 1000);

// 取消间隔定时器
// clearInterval(intervalId);

// setImmediate: 在当前事件循环结束后执行
setImmediate(() => {
  console.log('当前事件循环结束后执行');
});
```

### 控制台输出

Node.js 提供了丰富的控制台输出方法：

```javascript
// 基本输出
console.log('普通信息');
console.info('信息');
console.warn('警告');
console.error('错误');

// 格式化输出
console.log('我的名字是 %s，年龄是 %d', 'Node.js', 12);

// 表格输出
const users = [
  { name: '张三', age: 20 },
  { name: '李四', age: 25 }
];
console.table(users);

// 计时
console.time('计时器');
// 执行一些操作
console.timeEnd('计时器');
```

## 注意事项

1. **严格模式**：在 Node.js 中，可以通过 `'use strict'` 启用严格模式，避免一些常见的错误。

```javascript
'use strict';

// 在严格模式下，以下代码会报错
// a = 10; // 未声明的变量
```

2. **变量提升**：JavaScript 存在变量提升现象，建议始终使用 `let` 和 `const` 声明变量。

3. **this 指向**：在 Node.js 中，全局作用域中的 `this` 指向 `global` 对象，而不是 `window`。

4. **编码规范**：遵循一致的编码规范，如使用驼峰命名法、适当的缩进等，提高代码可读性。

5. **版本兼容性**：不同版本的 Node.js 可能支持不同的 JavaScript 特性，注意检查兼容性。