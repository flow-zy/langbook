# TypeScript 模块与命名空间

在 TypeScript 中，模块（Modules）和命名空间（Namespaces）是组织代码的两种主要方式。它们帮助我们将代码拆分为多个文件，避免命名冲突，提高代码的可维护性和可重用性。本章将详细介绍模块和命名空间的定义、使用方法和最佳实践。

## 模块 (Modules)
模块是一个包含代码和声明的文件。TypeScript 中的模块遵循 ES 模块规范，可以使用 `import` 和 `export` 关键字导入和导出模块。

### 1. 基本模块导出
```typescript
// math.ts
export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export const PI = 3.14159;
```

### 2. 模块导入
```typescript
// app.ts
import { add, subtract, PI } from './math';

console.log(add(2, 3)); // 5
console.log(subtract(5, 2)); // 3
console.log(PI); // 3.14159
```

### 3. 导出默认成员
每个模块可以有一个默认导出成员。

```typescript
// logger.ts
class Logger {
  log(message: string) {
    console.log(`[LOG]: ${message}`);
  }
}

export default Logger;
```

```typescript
// app.ts
import Logger from './logger';

const logger = new Logger();
logger.log('Hello, TypeScript!'); // [LOG]: Hello, TypeScript!
```

### 4. 命名导入与重导出
```typescript
// app.ts
import * as MathUtils from './math';

console.log(MathUtils.add(2, 3)); // 5
console.log(MathUtils.subtract(5, 2)); // 3
console.log(MathUtils.PI); // 3.14159
```

```typescript
// index.ts
// 重导出 math 模块的所有成员
export * from './math';
// 重导出 logger 模块的默认成员
export { default as Logger } from './logger';
```

### 5. 动态导入
支持使用 `import()` 函数动态导入模块。

```typescript
// app.ts
async function loadMathModule() {
  const math = await import('./math');
  console.log(math.add(2, 3)); // 5
}

loadMathModule();
```

## 命名空间 (Namespaces)
命名空间是 TypeScript 中组织代码的另一种方式，用于将相关的代码分组到一个命名空间下，避免全局命名冲突。

### 1. 基本命名空间
```typescript
// geometry.ts
namespace Geometry {
  export interface Point {
    x: number;
    y: number;
  }

  export function distance(p1: Point, p2: Point): number {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }
}
```

### 2. 使用命名空间
```typescript
// app.ts
// 引用命名空间中的成员
const p1: Geometry.Point = { x: 0, y: 0 };
const p2: Geometry.Point = { x: 3, y: 4 };
console.log(Geometry.distance(p1, p2)); // 5
```

### 3. 嵌套命名空间
命名空间可以嵌套，创建更复杂的命名结构。

```typescript
// shapes.ts
namespace Shapes {
  export namespace Polygons {
    export interface Triangle {
      a: number;
      b: number;
      c: number;
    }

    export interface Rectangle {
      width: number;
      height: number;
    }
  }

  export namespace Circles {
    export interface Circle {
      radius: number;
    }
  }
}
```

```typescript
// app.ts
const triangle: Shapes.Polygons.Triangle = { a: 3, b: 4, c: 5 };
const circle: Shapes.Circles.Circle = { radius: 5 };
```

### 4. 命名空间合并
相同名称的命名空间会被合并。

```typescript
// part1.ts
namespace MyNamespace {
  export function func1() {
    console.log('Function 1');
  }
}
```

```typescript
// part2.ts
namespace MyNamespace {
  export function func2() {
    console.log('Function 2');
  }
}
```

```typescript
// app.ts
MyNamespace.func1(); // 'Function 1'
MyNamespace.func2(); // 'Function 2'
```

## 模块与命名空间的区别
| 特性 | 模块 | 命名空间 |
|-----|------|----------|
| 文件边界 | 每个文件是一个模块 | 可以跨文件 |
| 依赖管理 | 显式导入/导出 | 隐式依赖 |
| 代码组织 | 基于文件 | 基于命名空间 |
| 工具支持 | 更好的工具支持 | 较少的工具支持 |
| 适用场景 | 大型应用 | 小型应用或库 |

## 模块解析策略
TypeScript 支持两种模块解析策略：`Classic` 和 `Node`。可以通过 `tsconfig.json` 中的 `moduleResolution` 选项配置。

### 1. Node 模块解析
Node 模块解析策略与 Node.js 的模块解析机制一致。

```json
{
  "compilerOptions": {
    "moduleResolution": "node"
  }
}
```

### 2. Classic 模块解析
Classic 模块解析策略是 TypeScript 早期的解析策略，现在已不推荐使用。

```json
{
  "compilerOptions": {
    "moduleResolution": "classic"
  }
}
```

## 模块与命名空间最佳实践
1. 对于现代 TypeScript 项目，优先使用模块而不是命名空间。
2. 使用 `export` 和 `import` 显式管理模块依赖。
3. 每个文件只包含一个模块，保持文件的单一责任。
4. 对于小型项目或库，可以考虑使用命名空间。
5. 避免在模块中使用命名空间，以免造成混淆。
6. 使用清晰的目录结构组织模块。
7. 为模块使用有意义的名称，提高代码可读性。

## 练习
1. 创建一个模块，导出一些数学函数和常量。
2. 创建一个使用这些数学函数的应用程序。
3. 创建一个命名空间，包含几何图形相关的接口和函数。
4. 实现一个嵌套命名空间结构。
5. 探索模块解析策略的差异。
6. 尝试在一个项目中混合使用模块和命名空间。

通过本章节的学习，你应该掌握了 TypeScript 中的模块和命名空间，能够使用它们组织代码，避免命名冲突，提高代码的可维护性和可重用性。