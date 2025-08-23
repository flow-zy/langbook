# TypeScript 基本类型

TypeScript 提供了丰富的类型系统，允许我们在代码中明确指定变量、函数参数和返回值的类型。本章将详细介绍 TypeScript 的基本类型。

## 原始类型
TypeScript 支持 JavaScript 的所有原始类型，并为它们提供了对应的类型注解。

### 1. 数字类型 (number)
表示所有数字，包括整数和浮点数。

```typescript
let age: number = 25;
let pi: number = 3.14159;
let hex: number = 0xff00;
let binary: number = 0b1010;
let octal: number = 0o744;
```

### 2. 字符串类型 (string)
表示文本数据，可以使用单引号、双引号或模板字符串。

```typescript
let name: string = 'John';
let message: string = "Hello, TypeScript!";
let greeting: string = `Hello, ${name}!`;
```

### 3. 布尔类型 (boolean)
表示逻辑值，只有 `true` 和 `false` 两个值。

```typescript
let isDone: boolean = false;
let isActive: boolean = true;
```

### 4. 空值类型 (void)
通常用于表示函数没有返回值。

```typescript
function logMessage(message: string): void {
  console.log(message);
}
```

### 5. null 和 undefined
表示空值或未定义的值。在严格模式下，`null` 和 `undefined` 是不同类型；在非严格模式下，它们可以互相赋值。

```typescript
let n: null = null;
let u: undefined = undefined;
```

### 6. 符号类型 (symbol)
表示唯一的标识符，通常用于对象属性的键。

```typescript
const key1: symbol = Symbol('key');
const key2: symbol = Symbol('key');

// 尽管描述相同，key1 和 key2 是不同的
console.log(key1 === key2); // false

const obj = {
  [key1]: 'value1',
  [key2]: 'value2'
};
```

### 7. 大整数类型 (bigint)
表示大于 `2^53 - 1` 的整数。

```typescript
let bigNumber: bigint = 100n;
let anotherBigNumber: bigint = BigInt(100);
```

## 复合类型
### 1. 数组类型 (Array)
表示同类型元素的集合，可以使用两种语法形式。

```typescript
// 语法形式 1: 类型[]
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ['John', 'Jane', 'Bob'];

// 语法形式 2: Array<类型>
let numbers: Array<number> = [1, 2, 3, 4, 5];
let names: Array<string> = ['John', 'Jane', 'Bob'];
```

### 2. 元组类型 (Tuple)
表示固定长度和固定类型的数组。

```typescript
// 表示一个包含 string 和 number 的元组
let person: [string, number] = ['John', 25];

// 访问元组元素
console.log(person[0]); // 'John'
console.log(person[1]); // 25

// 修改元组元素
person[0] = 'Jane';
person[1] = 30;

// 元组越界访问（不推荐）
// 在严格模式下，这会导致编译错误
person[2] = 'Student';
```

### 3. 对象类型 (Object)
表示非原始类型的对象。

```typescript
// 简单对象类型注解
let person: { name: string; age: number } = {
  name: 'John',
  age: 25
};

// 可选属性
let person: { name: string; age?: number } = {
  name: 'John'
};

// 只读属性
let person: { readonly name: string; age: number } = {
  name: 'John',
  age: 25
};

// 无法修改只读属性
person.name = 'Jane'; // 编译错误
```

## 特殊类型
### 1. any 类型
表示可以是任何类型，关闭类型检查。尽量避免使用 `any` 类型，因为它会失去 TypeScript 的类型安全优势。

```typescript
let value: any = 10;
value = 'string';
value = true;
value = {};

// 可以调用任何方法，即使不存在
value.nonExistentMethod(); // 编译不会报错，但运行时可能出错
```

### 2. unknown 类型
表示未知类型，比 `any` 更安全，因为使用 `unknown` 类型的值之前必须进行类型检查或类型断言。

```typescript
let value: unknown = 10;

// 不能直接使用 unknown 类型的值
value.toFixed(); // 编译错误

// 需要进行类型检查
if (typeof value === 'number') {
  value.toFixed(); // 正确
}

// 或者使用类型断言
(value as number).toFixed();
```

### 3. never 类型
表示永远不会发生的值，通常用于函数抛出异常或无限循环的情况。

```typescript
// 抛出异常的函数
function throwError(message: string): never {
  throw new Error(message);
}

// 无限循环的函数
function infiniteLoop(): never {
  while (true) {
    // 循环体
  }
}
```

## 类型推论
TypeScript 具有类型推论功能，可以根据变量的初始值自动推断变量的类型。

```typescript
// 类型推论为 number
let age = 25;

// 类型推论为 string
let name = 'John';

// 类型推论为 (a: number, b: number) => number
function add(a: number, b: number) {
  return a + b;
}
```

## 类型断言
类型断言允许我们告诉编译器一个值的具体类型，类似于类型转换，但不进行运行时检查。

```typescript
// 语法形式 1: <类型>值
let value: unknown = 'string';
let length: number = (<string>value).length;

// 语法形式 2: 值 as 类型
let value: unknown = 'string';
let length: number = (value as string).length;
```

## 练习
1. 声明不同类型的变量：数字、字符串、布尔值等
2. 创建一个数组，包含不同类型的元素（使用元组）
3. 定义一个对象类型，并声明该类型的变量
4. 尝试使用 `any` 和 `unknown` 类型，并比较它们的区别
5. 编写一个返回 `never` 类型的函数
6. 练习类型推论和类型断言

通过本章节的学习，你应该掌握了 TypeScript 的基本类型系统，包括原始类型、复合类型和特殊类型，能够在代码中正确使用类型注解，并理解类型推论和类型断言的概念。