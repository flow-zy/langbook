# 变量与数据类型

变量与数据类型是 JavaScript 编程的基础，理解它们对于掌握这门语言至关重要。本章将详细介绍 JavaScript 中的变量声明方式、各种数据类型及其特性，以及类型转换的相关知识。

## 变量声明

在 JavaScript 中，我们使用 `var` 来声明变量。理解 `var` 的特性对于理解 JavaScript 和避免常见错误非常重要。

### var
`var` 是 JavaScript 中最古老的变量声明方式，在 ES6 (2015) 之前是声明变量的唯一方式。了解 `var` 的特性对于理解 JavaScript 的历史和避免常见错误非常重要。

`var` 具有以下特点：
- **函数作用域**：变量只在声明它的函数内部可见，不像 `var` 和 `const` 那样具有块级作用域
- **可以被重新声明和赋值**：允许在同一作用域内多次声明同一个变量，这可能导致意外的覆盖
- **存在变量提升**：变量声明会被提升到函数作用域的顶部，但赋值不会

#### 变量提升详解
变量提升是 JavaScript 解析器的一种行为，它会将变量声明提升到其作用域的顶部。这意味着你可以在声明变量之前引用它，但此时变量的值是 `undefined`。

```javascript
// 变量提升示例
console.log(name); // undefined (声明被提升，但赋值没有)
var name = "John";
console.log(name); // "John"

// 重新声明示例
var age = 30;
var age = 31; // 不会报错
console.log(age); // 31

// 函数作用域示例
function test() {
  var insideVar = "inside";
  console.log(insideVar); // "inside"
}
test();
console.log(insideVar); // 报错: insideVar is not defined
```

### 初学者建议
对于初学者，建议理解 `var` 的特性并正确使用它来声明变量。

## 数据类型

JavaScript 是一种动态类型语言，变量的类型可以在运行时改变。这意味着你可以声明一个变量并为其赋值为数字，稍后再将其改为字符串。理解 JavaScript 的数据类型对于编写正确的代码至关重要。

JavaScript 有两种主要的数据类型：基本类型和引用类型。

### 基本类型
基本类型是直接存储值的简单数据类型，它们是不可变的（值本身不能被修改）。JavaScript 中有 7 种基本类型：

- **Number**:
- **Number**: 数字，包括整数、浮点数、NaN、Infinity 等
- **String**: 字符串，用于表示文本，可以使用单引号或双引号
- **Boolean**: 布尔值，只有 `true` 和 `false` 两个值
- **Undefined**: 表示变量已声明但未赋值
- **Null**: 表示故意设置的空值或不存在的对象

#### 基本类型详解

##### Number 类型
Number 类型表示数字，包括整数和浮点数。JavaScript 中的数字都是双精度浮点数（64位），这意味着它们可以表示的最大值约为 ±1.7976931348623157e+308，最小值约为 ±5e-324。

除了常规数字，Number 类型还有几个特殊值：
- `NaN` (Not a Number): 表示无效的数学运算结果
- `Infinity` 和 `-Infinity`: 表示无穷大
- `0` 和 `-0`: 正零和负零

##### String 类型
String 类型用于表示文本数据。字符串可以使用单引号 (`'`)、双引号 (`"`) 或模板字符串 (``` ` ```) 定义。模板字符串允许在字符串中嵌入表达式。

##### Boolean 类型
Boolean 类型只有两个值：`true` 和 `false`，用于表示逻辑真和假。在条件语句中，其他类型的值会被隐式转换为布尔值。"}]}}}

```javascript
// 数字示例
var integer = 42;          // 整数
var float = 3.14;          // 浮点数
var hex = 0xFF;            // 十六进制 (255)
var binary = 0b1010;       // 二进制 (10)

// 字符串示例
var str1 = "Hello";        // 双引号
var str2 = 'World';        // 单引号
var str3 = "Hello " + str2; // 字符串拼接

// 布尔值示例
var isTrue = true;
var isFalse = false;

// undefined 示例
var undef;
console.log(undef); // undefined

// null 示例
var emptyValue = null;


```

### 引用类型
引用类型存储的是对值的引用（内存地址），而不是值本身。与基本类型不同，引用类型是可变的（我们可以修改它们的值）。JavaScript 中常见的引用类型包括：

- **Object**: 对象，一组键值对的集合，是 JavaScript 中最基本的引用类型
- **Array**: 数组，有序的数据集合，用于存储多个值
- **Function**: 函数，可执行的代码块，也是一种特殊的对象
- **Date**: 日期对象，用于处理日期和时间
- **RegExp**: 正则表达式对象，用于模式匹配

#### 引用类型详解

##### Object 类型
对象是 JavaScript 中最基本的引用类型，用于存储键值对的集合。对象的键（属性名）可以是字符串或 Symbol，值可以是任何数据类型。

创建对象的方式有多种：
- 对象字面量: `{ key: value }`
- 构造函数: `new Object()`

##### Array 类型
数组是用于存储有序数据的特殊对象。数组的索引是从 0 开始的整数，我们可以通过索引访问和修改数组元素。

数组有许多内置方法，如 `push()`、`pop()`、`shift()`、`unshift()`、`map()`、`filter()` 等，这些方法可以帮助我们方便地操作数组。

##### Function 类型
函数是可执行的代码块，也是一种特殊的对象。函数可以接受参数并返回值，是 JavaScript 中的一等公民（可以作为值传递）。

函数有多种定义方式：
- 函数声明: `function name() { ... }`
- 函数表达式: `var name = function() { ... }`

函数可以访问其外部作用域中的变量，这是闭包的基础。

```javascript
// 对象示例
var person = {
  name: "John",
  age: 30,
  greet: function() {
    console.log("Hello, my name is " + this.name);
  }
};
person.greet(); // 输出: Hello, my name is John

// 数组示例
var numbers = [1, 2, 3, 4, 5];
console.log(numbers[0]); // 1
numbers.push(6);        // 添加元素
console.log(numbers);   // [1, 2, 3, 4, 5, 6]

// 函数示例
function add(a, b) {
  return a + b;
}
var result = add(2, 3);
console.log(result); // 5

// 日期示例
var today = new Date();
console.log(today.getFullYear()); // 当前年份

// 正则表达式示例
var pattern = /hello/;
console.log(pattern.test("hello world")); // true
```

### 基本类型 vs 引用类型的区别
- **存储方式**：基本类型直接存储值，引用类型存储引用
- **比较方式**：基本类型比较值，引用类型比较引用地址
- **传递方式**：基本类型按值传递，引用类型按引用传递

```javascript
// 基本类型比较
var a = 5;
var b = 5;
console.log(a === b); // true

// 引用类型比较
var obj1 = { name: "John" };
var obj2 = { name: "John" };
console.log(obj1 === obj2); // false (不同的引用)

var obj3 = obj1;
console.log(obj1 === obj3); // true (相同的引用)
```

## 类型转换

JavaScript 是一种弱类型语言，这意味着它不会严格检查变量的类型，并且会在需要时自动进行类型转换。了解类型转换的规则和行为对于避免常见的错误和编写预期行为的代码至关重要。

### 隐式转换
隐式转换是 JavaScript 自动进行的类型转换，通常发生在运算符操作、条件判断等场景中。隐式转换可能会导致一些意外的结果，因此了解其规则非常重要。

#### 常见的隐式转换场景

##### 算术运算符中的转换
当使用算术运算符（+、-、*、/ 等）时，JavaScript 会根据操作数的类型进行隐式转换：

- 当 `+` 操作符的一个操作数是字符串时，另一个操作数会被转换为字符串，然后进行字符串拼接
- 当使用其他算术运算符（-、*、/ 等）时，操作数会被转换为数字

##### 比较运算符中的转换
当使用比较运算符（==、!=、>、< 等）时，JavaScript 也会进行隐式转换：

- 使用 `==` 时，如果操作数类型不同，会先进行类型转换再比较
- 使用 `===` 时，不会进行类型转换，直接比较类型和值

##### 条件判断中的转换
在条件判断中（如 if 语句、三元运算符等），表达式会被转换为布尔值。以下值会被转换为 `false`：
- `false`
- `0` 和 `-0`
- `''` (空字符串)
- `null`
- `undefined`
- `NaN`

其他值会被转换为 `true`。

```javascript
// 数字转字符串 (当 + 操作符一边是字符串时)
var result1 = 10 + "20"; // "1020"
var result2 = "The answer is: " + 42; // "The answer is: 42"

// 字符串转数字 (当使用 -、*、/ 等算术操作符时)
var result3 = "10" - 5; // 5
var result4 = "123" * 2; // 246

// 布尔值转数字
var result5 = true + 1; // 2 (true 被转换为 1)
var result6 = false + 1; // 1 (false 被转换为 0)

// 其他类型转布尔值 (在条件判断中)
if ("hello") { /* 会执行，因为非空字符串被转换为 true */ }
if (0) { /* 不会执行，因为 0 被转换为 false */ }
```

### 显式转换
显式转换是我们主动使用函数进行的类型转换：

```javascript
// 转字符串
var num = 10;
var str1 = String(num);     // "10"
var str2 = num.toString();  // "10"
var str3 = String(true);    // "true"

// 转数字
var strNum = "123";
var num1 = Number(strNum);   // 123
var num2 = parseInt(strNum); // 123 (解析整数)
var num3 = parseFloat("123.45"); // 123.45 (解析浮点数)
var num4 = Number(true);     // 1

// 转布尔值
var truthy1 = Boolean("hello"); // true
var truthy2 = Boolean(1);       // true
var falsy1 = Boolean("");       // false
var falsy2 = Boolean(0);        // false
var falsy3 = Boolean(null);     // false
var falsy4 = Boolean(undefined); // false
```

## 特殊值

JavaScript 有几个特殊值需要特别注意：

- `undefined`: 变量已声明但未赋值
- `null`: 表示空值或不存在的对象
- `NaN`: 非数字 (Not a Number)，表示数学运算的错误结果
- `Infinity` 和 `-Infinity`: 表示无穷大
- `0` 和 `-0`: 正零和负零

```javascript
// undefined 示例
var x;
console.log(x); // undefined

// null 示例
var y = null;
console.log(y); // null
console.log(typeof null); // "object" (这是 JavaScript 的一个历史遗留问题)

// NaN 示例
console.log(0 / 0); // NaN
console.log("hello" - 5); // NaN
console.log(NaN === NaN); // false (NaN 不等于任何值，包括它自己)
console.log(isNaN(NaN)); // true (使用 isNaN 函数检测 NaN)

// Infinity 示例
console.log(1 / 0); // Infinity
console.log(-1 / 0); // -Infinity
console.log(Infinity + 1); // Infinity

// 0 和 -0 示例
console.log(0 === -0); // true
console.log(1 / 0); // Infinity
console.log(1 / -0); // -Infinity
```

## 常见问题与解答

**Q: `null` 和 `undefined` 有什么区别？**
A: `undefined` 表示变量已声明但未赋值；`null` 表示变量被明确设置为空值。

**Q: 为什么 `typeof null` 返回 `"object"`？**
A: 这是 JavaScript 的一个历史遗留错误。实际上，`null` 不是对象，而是一个原始值。

**Q: 如何检查一个变量是否为 `NaN`？**
A: 可以使用 `isNaN()` 函数检测 `NaN`。

**Q: 基本类型和引用类型在内存中是如何存储的？**
A: 基本类型存储在栈内存中，直接存储值；引用类型存储在堆内存中，变量中存储的是指向堆内存的引用地址。