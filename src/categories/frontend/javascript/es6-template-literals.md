# 模板字符串

模板字符串（Template Literals）是ES6引入的一种新的字符串字面量语法，它提供了更灵活、更强大的字符串处理方式，包括多行字符串、字符串插值和标签模板等功能。

## 基本语法

模板字符串使用反引号（`）而不是单引号（'）或双引号（"）来定义，这是其与传统字符串最直观的区别：

```javascript
// 传统字符串
const traditional1 = 'Hello, world!';
const traditional2 = "Hello, world!";

// 模板字符串
const template = `Hello, world!`;
```

### 语法特点

1. **反引号定义**：必须使用反引号（`）包裹字符串内容
2. **支持转义**：可以使用反斜杠（\）转义特殊字符，包括反引号本身
3. **跨行支持**：可以直接在字符串中换行，无需使用\n转义字符
4. **插值表达式**：支持使用${expression}语法嵌入JavaScript表达式
5. **标签函数**：可以在模板字符串前添加标签函数进行高级处理

### 注意事项

- 反引号是模板字符串的标志，不要与单引号或双引号混淆
- 反引号在大多数键盘上位于左上角，与波浪号（~）共享一个键位
- 如果需要在模板字符串中使用反引号，必须使用反斜杠转义：`\``

## 主要特性

### 1. 多行字符串

传统字符串中，创建多行字符串需要使用换行符（\n）或连接多个字符串，代码不够直观。模板字符串允许直接在字符串中换行，保留原始的格式：

```javascript
// 传统方式 - 使用换行符
const multiLine1 = 'This is a string\nthat spans multiple lines.';

// 传统方式 - 连接字符串
const multiLine2 = 'This is a string ' +
'that spans multiple ' +
'lines.';

// 模板字符串 - 直接换行
const multiLine3 = `This is a string
that spans multiple lines.`;

console.log(multiLine1 === multiLine3); // true
console.log(multiLine2 === multiLine3); // true
```

多行模板字符串在需要嵌入大段文本（如HTML、CSS或SQL）时特别有用，可以保持代码的可读性：

```javascript
const htmlTemplate = `
<div class="container">
  <h1>Welcome to my website</h1>
  <p>This is a paragraph with some text.</p>
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
</div>
`;
```

### 2. 字符串插值

模板字符串支持在字符串中嵌入表达式，语法为`${expression}`，这解决了传统字符串拼接的繁琐问题：

```javascript
const name = 'John';
const age = 30;
const isStudent = false;

// 传统字符串拼接
const message1 = 'Hello, my name is ' + name + ' and I am ' + age + ' years old.' +
  (isStudent ? ' I am a student.' : ' I am not a student.');

// 模板字符串插值
const message2 = `Hello, my name is ${name} and I am ${age} years old.
${isStudent ? 'I am a student.' : 'I am not a student.'}`;
```

插值表达式可以是任何有效的JavaScript表达式，包括变量、函数调用、算术运算、条件表达式等：

```javascript
// 变量
const a = 10;
const b = 20;

// 函数调用
const sum = (x, y) => x + y;

// 算术运算
const product = a * b;

// 条件表达式
const isGreater = a > b ? 'greater than' : 'less than or equal to';

// 嵌套模板字符串
const nested = `${a} is ${isGreater} ${b}`;

const result = `The sum of ${a} and ${b} is ${sum(a, b)},
The product is ${product},
and ${nested}.`;

console.log(result); 
// 输出:
// "The sum of 10 and 20 is 30,
// The product is 200,
// and 10 is less than or equal to 20."
```

### 3. 标签模板

标签模板是一种更高级的用法，允许我们在模板字符串前添加一个标签函数（tag function），该函数可以处理模板字符串的内容和插值表达式的值：

```javascript
// 标签函数的定义
function highlight(strings, ...values) {
  let result = '';
  strings.forEach((string, i) => {
    result += string;
    if (i < values.length) {
      result += `<span style='color: red'>${values[i]}</span>`;
    }
  });
  return result;
}

// 使用标签模板
const name = 'John';
const age = 30;

const html = highlight`Hello, my name is ${name} and I am ${age} years old.`;
// 结果: "Hello, my name is <span style='color: red'>John</span> and I am <span style='color: red'>30</span> years old."
```

#### 标签函数的工作原理

标签函数接收两个参数：
1. `strings`：一个数组，包含模板字符串中所有非插值部分
2. `...values`：一个数组，包含所有插值表达式的值

例如，对于`highlight\`Hello, my name is ${name} and I am ${age} years old.\``：
- `strings` 的值为 `['Hello, my name is ', ' and I am ', ' years old.']`
- `values` 的值为 `['John', 30]`

标签函数可以根据这些参数进行自定义处理，例如添加HTML标签、转义特殊字符等。

#### 实际应用场景

标签模板在以下场景中特别有用：

**1. HTML转义**：防止XSS攻击

```javascript
function escapeHTML(strings, ...values) {
  const escape = value => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
  
  let result = '';
  strings.forEach((string, i) => {
    result += string;
    if (i < values.length) {
      result += escape(values[i]);
    }
  });
  return result;
}

const userInput = '<script>alert("XSS Attack!");</script>';
const safeHTML = escapeHTML`<div>${userInput}</div>`;
console.log(safeHTML); 
// 输出: "<div>&lt;script&gt;alert(&quot;XSS Attack!&quot;);&lt;/script&gt;</div>"
```
**2. 国际化/本地化**

```javascript
// 简单的i18n标签函数示例
const i18n = {
  en: {
    greeting: 'Hello',
    welcome: 'Welcome to our website'
  },
  zh: {
    greeting: '你好',
    welcome: '欢迎访问我们的网站'
  }
};

function localize(language) {
  return function(strings, ...values) {
    let result = '';
    strings.forEach((string, i) => {
      // 检查是否有对应的翻译
      const translated = i18n[language][string.trim()] || string;
      result += translated;
      if (i < values.length) {
        result += values[i];
      }
    });
    return result;
  };
}

const en = localize('en');
const zh = localize('zh');

const name = 'John';
console.log(en`greeting ${name}, welcome`); // "Hello John, Welcome to our website"
console.log(zh`greeting ${name}, welcome`); // "你好 John, 欢迎访问我们的网站"
```
**3. 格式化字符串**

```javascript
function format(strings, ...values) {
  let result = '';
  strings.forEach((string, i) => {
    result += string;
    if (i < values.length) {
      // 支持简单的格式化说明符，如 %d, %s, %f
      const value = values[i];
      if (string.includes('%d')) {
        result = result.replace('%d', Math.floor(value));
      } else if (string.includes('%f')) {
        result = result.replace('%f', value.toFixed(2));
      } else if (string.includes('%s')) {
        result = result.replace('%s', String(value));
      } else {
        result += value;
      }
    }
  });
  return result;
}

const amount = 10.567;
const item = 'apple';
console.log(format`You have %d ${amount} ${item}s`); // "You have 10 apples"
console.log(format`The price is $%f ${amount}`); // "The price is $10.57"
```

## 与传统字符串的区别

1. **语法不同**：
   - 传统字符串：使用单引号(')或双引号(")
   - 模板字符串：使用反引号(`)

2. **多行字符串**：
   - 传统字符串：需要使用换行符(\n)或连接多个字符串
   - 模板字符串：可以直接在字符串中换行，保留原始格式

3. **字符串插值**：
   - 传统字符串：需要使用+运算符拼接变量和表达式
   - 模板字符串：支持${expression}语法，直接嵌入表达式

4. **标签模板**：
   - 传统字符串：不支持
   - 模板字符串：支持在字符串前添加标签函数，进行高级处理

5. **反引号转义**：
   - 传统字符串：单引号和双引号可以互相嵌套或使用\转义
   - 模板字符串：如果需要在字符串中使用反引号，必须使用\`转义

## 高级用法

### 1. 嵌套模板字符串

模板字符串支持嵌套，这在处理复杂字符串时特别有用：

```javascript
// 基本嵌套示例
const name = 'John';
const age = 30;
const greeting = `Hello, ${name}! You are ${age} years old.`;
const message = `Greeting: ${greeting}
Today is ${new Date().toLocaleDateString()}`;
console.log(message);
// 输出:
// Greeting: Hello, John! You are 30 years old.
// Today is 10/10/2023 (日期会根据当前时间变化)

// 复杂嵌套示例 - 生成HTML
const items = ['apple', 'banana', 'orange'];
const list = `
  <ul>
    ${items.map(item => `      <li>${item}</li>`).join('\n')}
  </ul>
`;
console.log(list);
// 输出格式化的HTML列表
```

### 2. 转义字符

模板字符串中可以使用各种转义字符：

```javascript
// 常见转义字符
const message1 = `First line\nSecond line`;
console.log(message1);
// 输出:
// First line
// Second line

const message2 = `Tab\tSeparated`;
console.log(message2);  // 输出: Tab\tSeparated

// 转义反引号
const message3 = `He said: \`Hello World!\``;
console.log(message3);  // 输出: He said: `Hello World!`

// 转义美元符号
const message4 = `The price is \${100}`;
console.log(message4);  // 输出: The price is $100
```

### 3. 原始字符串

使用`String.raw`标签可以创建原始字符串，其中的转义字符不会被解析：

```javascript
// 基本原始字符串
const rawString = String.raw`Hello\nWorld`;
console.log(rawString);  // 输出: Hello\nWorld

// 原始字符串用于文件路径
const path = String.raw`C:\Users\John\Documents`;
console.log(path);  // 输出: C:\Users\John\Documents

// 与正则表达式结合
const regex = new RegExp(String.raw`\w+`);
console.log(regex.test('hello'));  // 输出: true

// 注意：String.raw并不会处理${}语法
const name = 'John';
const rawWithVar = String.raw`Hello, ${name}!`;
console.log(rawWithVar);  // 输出: Hello, John!
```

## 应用场景

模板字符串在许多场景中都能显著提高代码的可读性和可维护性：

### 1. 生成HTML/XML

模板字符串非常适合生成HTML或XML代码，尤其是结合嵌套模板和数组方法：

```javascript
// 生成用户列表
const users = [
  { id: 1, name: 'John', email: 'john@example.com' },
  { id: 2, name: 'Jane', email: 'jane@example.com' }
];

const userList = `
  <table border="1">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      ${users.map(user => `
      <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
      </tr>
      `).join('')}
    </tbody>
  </table>
`;

console.log(userList);
```

### 2. 格式化字符串

替代繁琐的`+`运算符拼接，使格式化更清晰：

```javascript
const product = { name: 'Laptop', price: 999.99, tax: 0.1 };
const total = product.price * (1 + product.tax);

// 使用模板字符串
const receipt = `
  Product: ${product.name}
  Price: $${product.price.toFixed(2)}
  Tax: $${(product.price * product.tax).toFixed(2)}
  Total: $${total.toFixed(2)}
`;

console.log(receipt);
```

### 3. 多行字符串

轻松创建多行字符串，避免使用`\n`转义：

```javascript
// SQL查询
const sqlQuery = `
  SELECT users.id, users.name, orders.product
  FROM users
  JOIN orders ON users.id = orders.user_id
  WHERE users.status = 'active'
  ORDER BY users.name ASC
`;

console.log(sqlQuery);
```

### 4. 日志记录

结合标签模板创建强大的日志系统：

```javascript
// 增强的日志函数
function log(level) {
  return function(strings, ...values) {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}] `;
    let message = prefix;

    strings.forEach((string, i) => {
      message += string;
      if (i < values.length) {
        // 对对象进行JSON序列化
        message += typeof values[i] === 'object' ?
          JSON.stringify(values[i], null, 2) : values[i];
      }
    });

    console[level === 'error' ? 'error' : 'log'](message);
    return message;
  };
}

const info = log('info');
const error = log('error');
const debug = log('debug');

// 使用示例
info`User ${'admin'} logged in`;
error`Failed to connect to database: ${new Error('Connection refused')}`;
debug`User data: ${{ id: 1, name: 'John', roles: ['admin', 'user'] }}`;
```

## 总结

模板字符串是ES6中引入的一个革命性特性，它彻底改变了JavaScript中字符串处理的方式：

1. **简洁性**：使用反引号(`)代替引号，减少了引号转义的麻烦。

2. **强大的插值**：通过${expression}语法，可以直接在字符串中嵌入变量和表达式，避免了繁琐的+运算符拼接。

3. **多行支持**：允许字符串直接换行，保持代码格式的整洁。

4. **标签模板**：通过标签函数扩展模板字符串的功能，实现HTML转义、国际化、日志记录等高级应用。

5. **原始字符串**：使用String.raw获取原始字符串，方便处理文件路径和正则表达式。

在现代JavaScript开发中，模板字符串已经成为处理字符串的首选方式。它不仅提高了代码的可读性，还减少了因字符串拼接导致的错误。无论是简单的字符串格式化，还是复杂的HTML生成，模板字符串都能胜任。

建议在所有新项目中优先使用模板字符串，并在维护旧项目时逐步替换传统的字符串拼接方式。