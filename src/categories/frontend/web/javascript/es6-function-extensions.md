# 函数的扩展

ES6对函数进行了一系列重要扩展，引入了箭头函数、参数默认值、剩余参数等特性，使得函数定义和调用更加简洁、灵活。本章将详细介绍这些扩展特性。

## 设计目标与核心价值

ES6函数扩展的设计目标是：

1. **简化语法**：提供更简洁的函数定义方式
2. **增强功能**：添加新的函数特性，如参数默认值、剩余参数等
3. **解决痛点**：解决this指向、回调函数等常见问题
4. **提高可读性**：使代码更加清晰、易读
5. **兼容性**：保持与现有代码的兼容性

这些扩展的核心价值在于提高开发效率，减少样板代码，同时解决了JavaScript函数长期存在的一些问题。

## 箭头函数

箭头函数是ES6中最引人注目的特性之一，它提供了一种更简洁的函数定义方式。

### 基本语法

箭头函数使用`=>`符号定义，语法形式为：`(参数) => 表达式`或`(参数) => { 语句块 }`。

```javascript
// 传统函数定义
function add(a, b) {
  return a + b;
}

// 箭头函数定义
const add = (a, b) => a + b;
console.log(add(1, 2)); // 3

// 多语句需要使用花括号
const multiply = (a, b) => {
  const result = a * b;
  return result;
};
console.log(multiply(3, 4)); // 12

// 单个参数可以省略括号
const square = x => x * x;
console.log(square(5)); // 25

// 无参数需要使用空括号
const getRandom = () => Math.random();
console.log(getRandom()); // 随机数
```

### this指向

箭头函数没有自己的`this`，它的`this`继承自外层作用域。这解决了传统函数中`this`指向混乱的问题。

```javascript
// 传统函数中的this问题
const obj1 = {
  name: 'obj1',
  sayHello: function() {
    setTimeout(function() {
      console.log(`Hello, ${this.name}`); // Hello, undefined (this指向全局对象)
    }, 100);
  }
};
obj1.sayHello();

// 使用箭头函数解决this问题
const obj2 = {
  name: 'obj2',
  sayHello: function() {
    setTimeout(() => {
      console.log(`Hello, ${this.name}`); // Hello, obj2 (this继承自外层作用域)
    }, 100);
  }
};
obj2.sayHello();

// 箭头函数中的this无法通过bind、call、apply改变
const obj3 = {
  name: 'obj3'
};
const sayHello = () => console.log(`Hello, ${this.name}`);
sayHello.call(obj3); // Hello, undefined (this仍然指向全局对象)
```

### 注意事项

- 箭头函数不能用作构造函数，不能使用`new`关键字
- 箭头函数没有自己的`arguments`对象，但可以使用剩余参数代替
- 箭头函数没有`prototype`属性
- 不适合用作对象方法，因为它没有自己的`this`

## 参数默认值

ES6允许为函数参数设置默认值，简化了参数校验和初始化代码。

### 基本用法

```javascript
// 基本默认值
function greet(name = 'Guest') {
  console.log(`Hello, ${name}!`);
}

greet(); // Hello, Guest!
greet('John'); // Hello, John!

// 多个参数
function add(a = 0, b = 0) {
  return a + b;
}

console.log(add()); // 0
console.log(add(1)); // 1
console.log(add(1, 2)); // 3
```

### 与解构赋值结合

参数默认值可以与解构赋值结合使用，更加灵活。

```javascript
// 对象解构赋值默认值
function config({ host = 'localhost', port = 3000 } = {}) {
  console.log(`Server running at ${host}:${port}`);
}

config(); // Server running at localhost:3000
config({ host: 'example.com' }); // Server running at example.com:3000
config({ port: 8080 }); // Server running at localhost:8080
config({ host: 'example.com', port: 8080 }); // Server running at example.com:8080

// 数组解构赋值默认值
function sum([a = 0, b = 0] = []) {
  return a + b;
}

console.log(sum()); // 0
console.log(sum([1])); // 1
console.log(sum([1, 2])); // 3
```

### 注意事项

- 参数默认值应该放在参数列表的最后，否则可能导致意外行为
- 默认值表达式在函数调用时才会执行，不是在函数定义时
- 函数参数是按值传递的，修改参数不会影响外部变量

## 剩余参数

剩余参数允许我们将多个参数收集到一个数组中，解决了`arguments`对象使用不便的问题。

### 基本用法

```javascript
// 基本剩余参数
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4, 5)); // 15

// 与普通参数结合
function greet(firstName, lastName, ...titles) {
  console.log(`Hello, ${firstName} ${lastName}`);
  console.log(`Titles: ${titles.join(', ')}`);
}

greet('John', 'Doe', 'Mr.', 'Ph.D.');
// 输出:
// Hello, John Doe
// Titles: Mr., Ph.D.
```

### 与解构赋值结合

剩余参数可以与解构赋值结合使用。

```javascript
// 数组解构赋值
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(second); // 2
console.log(rest); // [3, 4, 5]

// 对象解构赋值
const { a, b, ...others } = { a: 1, b: 2, c: 3, d: 4 };
console.log(a); // 1
console.log(b); // 2
console.log(others); // { c: 3, d: 4 }
```

### 注意事项

- 剩余参数必须是参数列表的最后一个参数
- 剩余参数是真正的数组，可以使用数组的所有方法
- 剩余参数与`arguments`对象不同，`arguments`是类数组对象

## 扩展运算符

扩展运算符（`...`）与剩余参数相反，它允许我们将数组或可迭代对象展开为多个参数。

### 基本用法

```javascript
// 函数调用
function sum(a, b, c) {
  return a + b + c;
}

const numbers = [1, 2, 3];
console.log(sum(...numbers)); // 6

// 数组创建
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// 数组复制
const original = [1, 2, 3];
const copy = [...original];
console.log(copy); // [1, 2, 3]

// 字符串展开
const str = 'hello';
const chars = [...str];
console.log(chars); // ['h', 'e', 'l', 'l', 'o']
```

### 与对象结合

扩展运算符可以用于对象，实现对象的复制和合并。

```javascript
// 对象复制
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1 };
console.log(obj2); // { a: 1, b: 2 }

// 对象合并
const obj3 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj3 };
console.log(merged); // { a: 1, b: 2, c: 3, d: 4 }

// 覆盖属性
const obj4 = { a: 100, e: 5 };
const merged2 = { ...obj1, ...obj4 };
console.log(merged2); // { a: 100, b: 2, e: 5 }
```

### 注意事项

- 扩展运算符只复制对象的可枚举属性
- 对于嵌套对象，扩展运算符只进行浅复制
- 扩展运算符不能用于null或undefined

## 函数的其他扩展

### 1. Function.prototype.toString()

ES6修改了`Function.prototype.toString()`方法，使其返回函数的原始代码，包括注释和空格。

```javascript
function add(a, b) {
  // 计算两数之和
  return a + b;
}

console.log(add.toString());
// 输出:
// function add(a, b) {
//   // 计算两数之和
//   return a + b;
// }
```

### 2. 函数参数的尾逗号

ES6允许函数参数列表末尾有逗号，提高了代码的可维护性。

```javascript
function sum(
  a,
  b,
  c,
) {
  return a + b + c;
}

console.log(sum(1, 2, 3)); // 6
```

## 注意事项与最佳实践

### 1. 箭头函数的适用场景

- 作为回调函数，特别是在需要保持`this`指向的场景
- 简单的单行函数
- 不适合用作构造函数或对象方法

### 2. 参数默认值的最佳实践

- 将带有默认值的参数放在参数列表的末尾
- 对于复杂的默认值，考虑使用函数封装
- 避免在默认值中使用副作用代码

### 3. 剩余参数与扩展运算符的使用

- 使用剩余参数代替`arguments`对象
- 利用扩展运算符简化数组和对象操作
- 注意浅复制的问题

### 4. 性能考虑

- 箭头函数在某些情况下比传统函数稍快
- 过度使用默认参数可能导致性能问题
- 对于频繁调用的函数，避免使用复杂的默认值表达式

## 总结

### 核心要点回顾

1. 箭头函数提供了更简洁的函数定义方式，解决了`this`指向问题
2. 参数默认值简化了参数校验和初始化代码
3. 剩余参数允许将多个参数收集到一个数组中
4. 扩展运算符允许将数组或可迭代对象展开为多个参数
5. 函数参数支持尾逗号，提高了代码的可维护性

### 主要优势

1. **更简洁的语法**：减少样板代码，提高开发效率
2. **更清晰的`this`**：箭头函数解决了`this`指向混乱的问题
3. **更灵活的参数处理**：参数默认值、剩余参数和扩展运算符增强了参数处理能力
4. **更好的可读性**：代码更加清晰、易读

### 实践建议

1. 优先使用箭头函数作为回调函数
2. 合理使用参数默认值简化代码
3. 使用剩余参数代替`arguments`对象
4. 利用扩展运算符简化数组和对象操作
5. 注意箭头函数的适用场景，避免滥用

ES6的函数扩展使JavaScript函数更加灵活、强大和易用。掌握这些新特性可以帮助你编写更简洁、更高效的代码，同时解决了传统函数中的一些常见问题。