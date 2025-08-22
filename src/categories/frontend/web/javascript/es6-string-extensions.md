# 字符串的扩展

ES6对字符串进行了一系列扩展，增加了许多实用的新方法和语法特性，使得字符串处理更加便捷和高效。本章将详细介绍这些扩展特性。

## 设计目标与核心价值

ES6字符串扩展的设计目标是解决以下问题：

1. **简化字符串操作**：提供更直观、更简洁的方法来处理字符串
2. **增强功能**：添加之前没有的实用功能，如字符串包含检查、重复等
3. **模板化**：引入模板字符串，解决字符串拼接的痛点
4. **Unicode支持**：更好地支持Unicode字符集
5. **性能优化**：某些操作提供更高效的实现

这些扩展的核心价值在于提高开发效率，使字符串处理代码更加清晰、易读和 maintainable。

## 模板字符串

模板字符串是ES6中最引人注目的字符串扩展特性之一，它提供了一种更优雅的方式来拼接字符串和嵌入表达式。

### 基本语法

模板字符串使用反引号（`）代替单引号或双引号，并且可以包含占位符（${expression}）。

```javascript
// 传统字符串拼接
const name = '张三';
const age = 25;
const message = '我叫' + name + '，今年' + age + '岁。';

// 使用模板字符串
const message = `我叫${name}，今年${age}岁。`;
console.log(message); // 输出: 我叫张三，今年25岁。
```

### 多行字符串

模板字符串可以直接包含换行符，非常适合创建多行文本。

```javascript
const html = `
<div class="container">
  <h1>标题</h1>
  <p>内容</p>
</div>
`;
console.log(html);
// 输出包含换行的HTML代码
```

### 表达式嵌入

模板字符串中的占位符可以包含任意JavaScript表达式，包括函数调用。

```javascript
const a = 10;
const b = 20;
console.log(`a + b = ${a + b}`); // 输出: a + b = 30

function greet(name) {
  return `Hello, ${name}!`;
}
console.log(greet('World')); // 输出: Hello, World!
```

### 标签模板

模板字符串可以跟在一个函数名后面，该函数将处理模板字符串。这被称为"标签模板"功能。

```javascript
function highlight(strings, ...values) {
  let result = '';
  strings.forEach((string, i) => {
    result += string;
    if (i < values.length) {
      result += `<span class="highlight">${values[i]}</span>`;
    }
  });
  return result;
}

const name = '张三';
const age = 25;
const html = highlight`我叫${name}，今年${age}岁。`;
console.log(html); // 输出: 我叫<span class="highlight">张三</span>，今年<span class="highlight">25</span>岁。
```

## 字符串的新方法

ES6为字符串添加了一些新方法，使字符串操作更加便捷。

### 1. includes()

判断一个字符串是否包含另一个字符串，返回布尔值。

```javascript
const str = 'Hello World';
console.log(str.includes('World')); // true
console.log(str.includes('world')); // false (区分大小写)
console.log(str.includes('o', 5)); // true (从索引5开始查找)
```

### 2. startsWith() 和 endsWith()

`startsWith()` 判断字符串是否以指定子字符串开头，`endsWith()` 判断字符串是否以指定子字符串结尾。

```javascript
const str = 'Hello World';
console.log(str.startsWith('Hello')); // true
console.log(str.startsWith('World', 6)); // true (从索引6开始)
console.log(str.endsWith('World')); // true
console.log(str.endsWith('Hello', 5)); // true (只考虑前5个字符)
```

### 3. repeat()

将字符串重复指定次数，返回新字符串。

```javascript
console.log('x'.repeat(3)); // 'xxx'
console.log('hello'.repeat(2)); // 'hellohello'
console.log('na'.repeat(0)); // '' (重复0次返回空字符串)
console.log('na'.repeat(2.5)); // 'nana' (参数会被取整)
```

### 4. padStart() 和 padEnd()

`padStart()` 在字符串开头填充指定字符，`padEnd()` 在字符串结尾填充指定字符，使字符串达到指定长度。

```javascript
console.log('x'.padStart(5, 'ab')); // 'ababx'
console.log('x'.padStart(4, 'ab')); // 'abax'
console.log('x'.padEnd(5, 'ab')); // 'xabab'
console.log('x'.padEnd(4, 'ab')); // 'xaba'
console.log('x'.padStart(5)); // '    x' (默认用空格填充)

// 实际应用：格式化数字
console.log('123'.padStart(10, '0')); // '0000000123'
console.log('4567'.padStart(10, '0')); // '0000004567'
```

### 5. trimStart() 和 trimEnd()

`trimStart()` 移除字符串开头的空白字符，`trimEnd()` 移除字符串结尾的空白字符。

```javascript
const str = '  Hello World  ';
console.log(str.trimStart()); // 'Hello World  '
console.log(str.trimEnd()); // '  Hello World'
console.log(str.trim()); // 'Hello World' (同时移除开头和结尾的空白字符)
```

## Unicode支持

ES6增强了对Unicode的支持，使JavaScript能够更好地处理非拉丁字符。

### 1. Unicode码点表示法

ES6允许使用`\u{码点}`的形式表示Unicode字符，码点可以是任意16进制数。

```javascript
console.log('\u{41}'); // 'A'
console.log('\u{0041}'); // 'A'
console.log('\u{1F600}'); // '😀' (表情符号)
```

### 2. String.fromCodePoint()

根据Unicode码点创建字符串，弥补了`String.fromCharCode()`只能处理BMP（Basic Multilingual Plane）字符的不足。

```javascript
console.log(String.fromCodePoint(0x41)); // 'A'
console.log(String.fromCodePoint(0x1F600)); // '😀'
console.log(String.fromCodePoint(0x20BB7)); // '𠮷'
```

### 3. codePointAt()

返回字符串中指定位置的Unicode码点，能够正确处理代理对（surrogate pair）。

```javascript
const str = '𝌆'; // Unicode码点为U+1D306
console.log(str.length); // 2 (因为它由两个代理字符组成)
console.log(str.codePointAt(0)); // 119558 (0x1D306)
console.log(str.codePointAt(1)); // 56838 (第二个代理字符的码点)
```

## 其他实用特性

### 1. 字符串迭代器

ES6为字符串添加了迭代器接口，可以使用`for...of`循环遍历字符串的每个字符。

```javascript
for (const char of 'Hello') {
  console.log(char);
}
// 输出:
// 'H'
// 'e'
// 'l'
// 'l'
// 'o'
```

### 2. 子字符串识别

除了`includes()`、`startsWith()`和`endsWith()`外，ES6还保留了传统的`indexOf()`和`lastIndexOf()`方法，但新方法更加直观。

```javascript
const str = 'Hello World';
console.log(str.indexOf('o')); // 4
console.log(str.lastIndexOf('o')); // 7
```

### 3. 字符串替换

`replace()`方法支持使用函数作为替换值，使替换更加灵活。

```javascript
const str = 'Hello World';
const newStr = str.replace('World', match => match.toUpperCase());
console.log(newStr); // 'Hello WORLD'
```

## 注意事项与最佳实践

### 1. 模板字符串中的转义

在模板字符串中，需要转义反引号（`）和美元符号（$）。

```javascript
console.log(`\`Hello\` World`); // '`Hello` World'
console.log(`\${1 + 1}`); // '$2'
```

### 2. 标签模板的安全性

当使用标签模板处理用户输入时，需要注意防止XSS攻击。

```javascript
function escapeHTML(strings, ...values) {
  const escape = value => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/