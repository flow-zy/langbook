# TypeScript 类型声明文件

类型声明文件（Type Declaration Files）是 TypeScript 中的一种特殊文件，用于为 JavaScript 代码提供类型信息。它们允许我们在 TypeScript 项目中使用 JavaScript 库，同时获得类型检查和代码补全的好处。本章将详细介绍类型声明文件的定义、使用方法和最佳实践。

## 类型声明文件基础
类型声明文件通常以 `.d.ts` 为扩展名，包含类型声明但不包含实现代码。

### 1. 基本类型声明文件
```typescript
// math.d.ts
declare function add(a: number, b: number): number;
declare function subtract(a: number, b: number): number;
declare const PI: number;
```

### 2. 使用类型声明文件
```typescript
// app.ts
// 使用声明的函数和常量
console.log(add(2, 3)); // 5
console.log(subtract(5, 2)); // 3
console.log(PI); // 3.14159
```

## 声明模块
对于模块化的 JavaScript 库，我们可以使用 `declare module` 语法声明模块。

### 1. 基本模块声明
```typescript
// lodash.d.ts
declare module 'lodash' {
  export function chunk<T>(array: T[], size: number): T[][];
  export function compact<T>(array: (T | null | undefined)[]): T[];
  export function concat<T>(array: T[], ...values: any[]): T[];
  // ... 其他函数声明
}
```

### 2. 使用模块声明
```typescript
// app.ts
import { chunk, compact } from 'lodash';

const array = [1, 2, 3, 4, 5];
console.log(chunk(array, 2)); // [[1, 2], [3, 4], [5]]
console.log(compact([0, 1, false, 2, '', 3])); // [1, 2, 3]
```

## 声明全局变量
可以使用 `declare global` 语法声明全局变量。

```typescript
// global.d.ts
declare global {
  interface Window {
    myApp: {
      version: string;
      init: () => void;
    };
  }

  var MY_GLOBAL_CONSTANT: number;
}
```

```typescript
// app.ts
console.log(window.myApp.version); // 访问全局变量
MY_GLOBAL_CONSTANT = 42; // 设置全局变量
```

## 声明合并
TypeScript 支持声明合并，允许我们扩展已有的类型声明。

### 1. 接口合并
```typescript
// existing.d.ts
declare interface Person {
  name: string;
  age: number;
}
```

```typescript
// extension.d.ts
declare interface Person {
  address: string;
  phone: string;
}
```

```typescript
// app.ts
const person: Person = {
  name: 'John',
  age: 30,
  address: '123 Main St',
  phone: '555-1234'
}; // 有效，因为接口被合并
```

### 2. 模块合并
```typescript
// module1.d.ts
declare module 'my-module' {
  export function func1(): void;
}
```

```typescript
// module2.d.ts
declare module 'my-module' {
  export function func2(): void;
}
```

```typescript
// app.ts
import { func1, func2 } from 'my-module'; // 有效，因为模块声明被合并
```

## 第三方库的类型声明
对于流行的 JavaScript 库，通常已经有现成的类型声明文件，可以通过 npm 安装。

### 1. 安装 @types 包
```bash
npm install --save-dev @types/lodash
npm install --save-dev @types/react
```

### 2. 使用 @types 包
安装完成后，TypeScript 会自动识别类型声明文件，无需额外配置。

```typescript
// app.ts
import _ from 'lodash';

const array = [1, 2, 3, 4, 5];
console.log(_.chunk(array, 2)); // [[1, 2], [3, 4], [5]]
```

## 自定义类型声明文件
如果第三方库没有现成的类型声明文件，我们可以创建自定义的类型声明文件。

### 1. 创建自定义类型声明文件
```typescript
// custom-lib.d.ts
declare module 'custom-lib' {
  export function doSomething(value: string): void;
  export function getData(): { id: number; name: string }[];
}
```

### 2. 配置 tsconfig.json
确保 TypeScript 能够找到自定义类型声明文件。

```json
{
  "compilerOptions": {
    "typeRoots": ["./node_modules/@types", "./types"]
  }
}
```

## 类型声明文件最佳实践
1. 对于流行的 JavaScript 库，优先使用 @types 包，而不是手动编写类型声明文件。
2. 为自定义 JavaScript 代码编写类型声明文件，提高类型安全性。
3. 使用 `declare` 关键字声明变量、函数、类等，避免在类型声明文件中包含实现代码。
4. 使用模块声明组织类型声明，避免全局命名冲突。
5. 利用声明合并扩展已有的类型声明。
6. 为类型声明文件添加清晰的注释，提高可读性。
7. 遵循 TypeScript 的命名约定和风格指南。

## 练习
1. 为一个简单的 JavaScript 库创建类型声明文件。
2. 安装并使用 @types 包。
3. 扩展已有的类型声明。
4. 配置 tsconfig.json 以使用自定义类型声明文件。
5. 为全局变量创建类型声明。
6. 探索声明合并的各种场景。

通过本章节的学习，你应该掌握了 TypeScript 中的类型声明文件，能够为 JavaScript 库编写类型声明，提高代码的类型安全性和可维护性。