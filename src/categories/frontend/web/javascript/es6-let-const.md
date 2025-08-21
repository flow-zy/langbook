# let、const 与块级作用域

ES6引入了`let`和`const`关键字，它们提供了块级作用域，解决了`var`声明变量时存在的变量提升、作用域污染等问题。本章节将详细介绍`let`和`const`的特性、用法以及块级作用域的概念。

## let 关键字

`let`用于声明变量，具有块级作用域，不能被重新声明，但可以被重新赋值。

### 块级作用域

块级作用域是指由`{}`包裹的代码区域，如函数体、条件语句、循环语句等。在块级作用域内声明的变量，只在该作用域内有效。

```javascript
// 函数块级作用域
function test() {
  let funcVar = "函数内部变量";
  console.log(funcVar); // "函数内部变量"
}
console.log(funcVar); // 报错: funcVar is not defined

// 条件块级作用域
if (true) {
  let blockVar = "块级变量";
  console.log(blockVar); // "块级变量"
}
console.log(blockVar); // 报错: blockVar is not defined

// 循环块级作用域
for (let i = 0; i < 3; i++) {
  console.log(i); // 0, 1, 2
}
console.log(i); // 报错: i is not defined
```

### let、const 与 var 的对比

| 特性 | let | const | var |
|------|-----|-------|-----|
| 作用域 | 块级 | 块级 | 函数级 |
| 变量提升 | 无 | 无 | 有 |
| 重复声明 | 不允许 | 不允许 | 允许 |
| 重新赋值 | 允许 | 不允许 | 允许 |
| 暂时性死区 | 有 | 有 | 无 |

### 不能重新声明
```javascript
let x = 10;
// let x = 20; // 报错: Identifier 'x' has already been declared
```

### 可以重新赋值
```javascript
let x = 10;
x = 20;
console.log(x); // 20
```

### 不存在变量提升
```javascript
console.log(x); // 报错: Cannot access 'x' before initialization
let x = 10;
```

## const 关键字

`const`用于声明常量，具有块级作用域，不能被重新声明，也不能被重新赋值。使用`const`声明的常量必须初始化。

### 必须初始化
```javascript
// const x; // 报错: Missing initializer in const declaration
const x = 10;
```

### 对复杂数据类型的影响

需要注意的是，`const`保证的是变量引用的不可变性，而不是值的不可变性。对于对象和数组等复杂数据类型，`const`声明的变量不能重新赋值，但可以修改对象的属性或数组的元素：

```javascript
const person = {
  name: "John",
  age: 30
};

// 可以修改属性
person.age = 31;
console.log(person.age); // 31

// 不能重新赋值
// person = { name: "Jane" }; // 报错

const numbers = [1, 2, 3];

// 可以修改元素
numbers.push(4);
console.log(numbers); // [1, 2, 3, 4]

// 不能重新赋值
// numbers = [5, 6, 7]; // 报错
```

如果要确保对象的不可变性，可以使用`Object.freeze()`方法：

```javascript
const person = Object.freeze({
  name: "John",
  age: 30
});

// 尝试修改属性会失败（在严格模式下会抛出错误）
person.age = 31;
console.log(person.age); // 30 (未发生变化)

### 不能重新赋值
```javascript
const x = 10;
// x = 20; // 报错: Assignment to constant variable.
```

### 块级作用域
```javascript
if (true) {
  const blockConst = "块级常量";
  console.log(blockConst); // "块级常量"
}

console.log(blockConst); // 报错: blockConst is not defined
```

### 对象和数组的可变性

`const`声明的对象或数组，其引用不能改变，但对象的属性或数组的元素可以修改：

```javascript
const person = {
  name: "John",
  age: 30
};

// 可以修改属性
person.age = 31;
console.log(person.age); // 31

// 不能重新赋值
// person = { name: "Jane" }; // 报错

const numbers = [1, 2, 3];

// 可以修改元素
numbers.push(4);
console.log(numbers); // [1, 2, 3, 4]

// 不能重新赋值
// numbers = [5, 6, 7]; // 报错
```

## 暂时性死区 (TDZ)

使用`let`或`const`声明的变量，在声明之前的区域称为暂时性死区（Temporal Dead Zone，TDZ）。在这个区域内访问变量会导致错误：

```javascript
// 暂时性死区开始
console.log(x); // 报错: Cannot access 'x' before initialization
let x = 10; // 暂时性死区结束

// 暂时性死区开始
console.log(y); // 报错: Cannot access 'y' before initialization
const y = 20; // 暂时性死区结束
```

暂时性死区的存在是为了防止在变量声明前意外使用变量，这是JavaScript语言的一个安全特性。

## 实际应用场景

### 1. 避免变量提升问题

`let`和`const`解决了`var`的变量提升问题，使代码更加可预测：

```javascript
// 使用var的问题
console.log(a); // undefined
var a = 10;

// 使用let避免问题
console.log(b); // 报错
let b = 20;
```

### 2. 循环中的块级作用域

在循环中使用`let`可以确保每次迭代都有独立的变量实例：

```javascript
// 使用var的问题
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // 输出3次3
  }, 100);
}

// 使用let解决问题
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // 输出0, 1, 2
  }, 100);
}
```

### 3. 保护常量不被修改

`const`用于声明不应被修改的值，如配置、常量等：

```javascript
const PI = 3.14159;
const CONFIG = {
  API_URL: 'https://api.example.com',
  TIMEOUT: 5000
};
```

## 最佳实践

1. **优先使用`const`**：对于不需要重新赋值的变量，优先使用`const`，这可以提高代码的可读性和可维护性。

2. **合理使用`let`**：对于需要重新赋值的变量，使用`let`。

3. **避免使用`var`**：尽量避免使用`var`，除非需要兼容旧环境。

4. **块级作用域优化**：利用块级作用域封装临时变量，避免全局污染：

```javascript
{
  let temp = '临时变量';
  // 使用temp
}
// temp在此处不可访问
```

5. **常量对象冻结**：对于`const`声明的对象，如果需要确保其不可变性，使用`Object.freeze()`。

## let、const 与 var 的区别

| 特性 | var | let | const |
|------|-----|-----|-------|
| 作用域 | 函数作用域 | 块级作用域 | 块级作用域 |
| 变量提升 | 有 | 无 (存在TDZ) | 无 (存在TDZ) |
| 重新声明 | 允许 | 不允许 | 不允许 |
| 重新赋值 | 允许 | 允许 | 不允许 |
| 初始值 | 可选 | 可选 | 必需 |

## 最佳实践

1. 优先使用`const`，除非你知道变量需要被重新赋值
2. 当变量需要被重新赋值时，使用`let`
3. 避免使用`var`，以避免函数作用域和变量提升带来的问题
4. 对于对象和数组，如果你不希望它们被修改，可以使用`Object.freeze()`或`Object.seal()`

```javascript
const person = Object.freeze({
  name: "John",
  age: 30
});

// 尝试修改属性不会生效
person.age = 31;
console.log(person.age); // 30
```

`let`和`const`的引入是JavaScript的一个重大改进，它们提供了更严格的变量声明方式，有助于避免意外的变量污染和修改，使代码更加健壮和可维护。