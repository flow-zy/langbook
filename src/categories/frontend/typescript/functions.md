# TypeScript 函数

函数是 TypeScript 中的基本构建块之一。本章将详细介绍 TypeScript 中函数的定义、参数、返回值以及高级特性。

## 函数定义
在 TypeScript 中，可以通过多种方式定义函数。

### 1. 函数声明
使用 `function` 关键字声明函数。

```typescript
// 函数声明
function add(a: number, b: number): number {
  return a + b;
}

// 调用函数
const result = add(1, 2);
console.log(result); // 3
```

### 2. 函数表达式
将函数赋值给变量。

```typescript
// 函数表达式
const add = function(a: number, b: number): number {
  return a + b;
};

// 调用函数
const result = add(1, 2);
console.log(result); // 3
```

### 3. 箭头函数
使用箭头函数语法定义函数，更简洁且不绑定 `this`。

```typescript
// 箭头函数
const add = (a: number, b: number): number => {
  return a + b;
};

// 简化版箭头函数（当函数体只有一条返回语句时）
const add = (a: number, b: number): number => a + b;

// 调用函数
const result = add(1, 2);
console.log(result); // 3
```

## 函数参数
TypeScript 支持多种参数类型，使函数更加灵活。

### 1. 必选参数
函数定义中的参数默认是必选的。

```typescript
function greet(name: string): string {
  return `Hello, ${name}!`;
}

greet('John'); // 正确
// greet(); // 编译错误: 缺少必选参数 'name'
```

### 2. 可选参数
使用 `?` 标记参数为可选的。

```typescript
function greet(name?: string): string {
  if (name) {
    return `Hello, ${name}!`;
  } else {
    return 'Hello, Guest!';
  }
}

greet('John'); // 'Hello, John!'
greet(); // 'Hello, Guest!'
```

### 3. 默认参数
为参数指定默认值。

```typescript
function greet(name: string = 'Guest'): string {
  return `Hello, ${name}!`;
}

greet('John'); // 'Hello, John!'
greet(); // 'Hello, Guest!'
```

### 4. 剩余参数
使用 `...` 语法接收多个参数，将它们收集到一个数组中。

```typescript
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

sum(1, 2, 3); // 6
sum(1, 2, 3, 4, 5); // 15
```

## 函数返回值
函数可以返回不同类型的值，也可以不返回值。

### 1. 基本返回类型
```typescript
function add(a: number, b: number): number {
  return a + b;
}

function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

### 2. 无返回值 (void)
```typescript
function logMessage(message: string): void {
  console.log(message);
  // 可以不显式返回任何值
}
```

### 3. 永不返回 (never)
```typescript
function throwError(message: string): never {
  throw new Error(message);
  // 永远不会执行到这里
}
```

## 函数类型
可以使用类型别名或接口定义函数类型。

### 1. 类型别名
```typescript
type AddFunction = (a: number, b: number) => number;

const add: AddFunction = (a, b) => a + b;
```

### 2. 接口
```typescript
interface AddFunction {
  (a: number, b: number): number;
}

const add: AddFunction = (a, b) => a + b;
```

## 函数重载
函数重载允许我们为同一个函数定义多个签名，根据参数类型和数量的不同执行不同的逻辑。

```typescript
// 函数重载签名
function add(a: number, b: number): number;
function add(a: string, b: string): string;

// 函数实现
function add(a: any, b: any): any {
  if (typeof a === 'number' && typeof b === 'number') {
    return a + b;
  } else if (typeof a === 'string' && typeof b === 'string') {
    return a + b;
  } else {
    throw new Error('Invalid arguments');
  }
}

add(1, 2); // 3
add('Hello, ', 'World!'); // 'Hello, World!'
// add(1, '2'); // 编译错误: 没有匹配的重载
```

## 高阶函数
高阶函数是指接受函数作为参数或返回函数的函数。

### 1. 接受函数作为参数
```typescript
function map(array: number[], callback: (item: number) => number): number[] {
  return array.map(callback);
}

const numbers = [1, 2, 3, 4, 5];
const doubledNumbers = map(numbers, num => num * 2);
console.log(doubledNumbers); // [2, 4, 6, 8, 10]
```

### 2. 返回函数
```typescript
function createAdder(a: number): (b: number) => number {
  return function(b: number): number {
    return a + b;
  };
}

const add5 = createAdder(5);
console.log(add5(10)); // 15

const add10 = createAdder(10);
console.log(add10(10)); // 20
```

## 练习
1. 定义一个函数，接受两个数字参数并返回它们的和
2. 定义一个函数，接受一个可选的字符串参数，并返回一个问候语
3. 定义一个函数，使用剩余参数接收多个数字，并返回它们的平均值
4. 定义一个函数类型，并使用该类型声明一个函数变量
5. 实现一个函数重载，能够处理数字相加和字符串拼接
6. 实现一个高阶函数，接受一个数组和一个回调函数，并返回一个新数组

通过本章节的学习，你应该掌握了 TypeScript 中函数的定义、参数类型、返回值类型以及函数的高级特性，能够编写类型安全的函数，并理解函数重载和高阶函数的概念。