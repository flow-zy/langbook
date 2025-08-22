# TypeScript 枚举

枚举是 TypeScript 中一种特殊的数据类型，用于定义一组命名的常量。枚举可以帮助我们组织代码，使代码更加清晰和可维护。本章将详细介绍枚举的定义、使用场景和高级特性。

## 枚举的基本定义
枚举使用 `enum` 关键字定义，用于表示一组相关的常量。

### 1. 数字枚举
数字枚举是最常见的枚举类型，枚举成员默认从 0 开始递增。

```typescript
// 定义一个数字枚举
enum Direction {
  Up,
  Down,
  Left,
  Right
}

// 使用枚举
console.log(Direction.Up); // 0
console.log(Direction.Down); // 1
console.log(Direction.Left); // 2
console.log(Direction.Right); // 3

// 反向映射 - 从值获取枚举成员名称
console.log(Direction[0]); // 'Up'
console.log(Direction[1]); // 'Down'
```

### 2. 自定义起始值的数字枚举
可以为枚举成员指定自定义的起始值，后续成员会从该值开始递增。

```typescript
// 自定义起始值的数字枚举
enum Direction {
  Up = 10,
  Down,
  Left,
  Right
}

console.log(Direction.Up); // 10
console.log(Direction.Down); // 11
console.log(Direction.Left); // 12
console.log(Direction.Right); // 13
```

### 3. 完全自定义值的数字枚举
可以为每个枚举成员指定不同的值。

```typescript
// 完全自定义值的数字枚举
enum Status {
  Success = 200,
  NotFound = 404,
  ServerError = 500
}

console.log(Status.Success); // 200
console.log(Status.NotFound); // 404
console.log(Status.ServerError); // 500
```

### 4. 字符串枚举
字符串枚举中的每个成员都必须指定一个字符串值。

```typescript
// 定义一个字符串枚举
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}

console.log(Direction.Up); // 'UP'
console.log(Direction.Down); // 'DOWN'

// 字符串枚举没有反向映射
// console.log(Direction['UP']); // 编译错误
```

### 5. 异构枚举
异构枚举包含数字和字符串成员，但不建议使用，因为会使代码变得混乱。

```typescript
// 异构枚举（不建议使用）
enum MixedEnum {
  Yes = 1,
  No = 'NO'
}

console.log(MixedEnum.Yes); // 1
console.log(MixedEnum.No); // 'NO'
```

## 枚举的高级特性
### 1. 计算成员
枚举成员的值可以是计算表达式。

```typescript
// 计算成员
const getValue = () => 10;

enum Enum {
  A = 1,
  B = A * 2,
  C = getValue()
}

console.log(Enum.A); // 1
console.log(Enum.B); // 2
console.log(Enum.C); // 10
```

### 2. 常量枚举
常量枚举使用 `const enum` 定义，在编译时会被完全删除，留下的是其值的直接引用。这可以减少运行时的代码量。

```typescript
// 常量枚举
const enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}

// 编译后，Direction 会被完全删除
// 以下代码会被编译为: console.log('UP');
console.log(Direction.Up);
```

### 3. 枚举合并
可以将同一个枚举分散到多个地方定义，TypeScript 会自动合并它们。

```typescript
// 枚举合并
enum Direction {
  Up = 'UP',
  Down = 'DOWN'
}

enum Direction {
  Left = 'LEFT',
  Right = 'RIGHT'
}

console.log(Direction.Up); // 'UP'
console.log(Direction.Left); // 'LEFT'
```

### 4. 枚举成员类型和联合枚举类型
枚举成员可以作为类型使用，枚举本身可以作为联合类型使用。

```typescript
enum Direction {
  Up,
  Down,
  Left,
  Right
}

// 枚举成员作为类型
type UpDirection = Direction.Up;
const up: UpDirection = Direction.Up;

// 枚举作为联合类型
type DirectionUnion = Direction;
const direction: DirectionUnion = Direction.Down;

// 类型保护
function isUp(direction: Direction): direction is Direction.Up {
  return direction === Direction.Up;
}

if (isUp(direction)) {
  // 在此作用域内，direction 被推断为 Direction.Up
  console.log('Going up!');
}
```

## 枚举的使用场景
### 1. 表示状态码
```typescript
enum HttpStatus {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  ServerError = 500
}

function handleResponse(status: HttpStatus) {
  switch (status) {
    case HttpStatus.OK:
      return 'Success';
    case HttpStatus.NotFound:
      return 'Not Found';
    case HttpStatus.ServerError:
      return 'Server Error';
    default:
      return 'Unknown Status';
  }
}
```

### 2. 表示选项
```typescript
enum LogLevel {
  Debug,
  Info,
  Warning,
  Error
}

function log(message: string, level: LogLevel) {
  switch (level) {
    case LogLevel.Debug:
      console.log(`[DEBUG] ${message}`);
      break;
    case LogLevel.Info:
      console.log(`[INFO] ${message}`);
      break;
    case LogLevel.Warning:
      console.log(`[WARNING] ${message}`);
      break;
    case LogLevel.Error:
      console.error(`[ERROR] ${message}`);
      break;
  }
}
```

### 3. 表示配置
```typescript
enum Environment {
  Development,
  Testing,
  Staging,
  Production
}

const config = {
  [Environment.Development]: {
    apiUrl: 'http://localhost:3000',
    logLevel: 'debug'
  },
  [Environment.Production]: {
    apiUrl: 'https://api.example.com',
    logLevel: 'error'
  }
};
```

## 最佳实践
1. 优先使用字符串枚举，因为它们更加清晰和明确。
2. 对于状态码、配置选项等固定集合，使用枚举可以提高代码的可读性。
3. 考虑使用常量枚举来减少运行时的代码量。
4. 避免使用异构枚举，因为它们会使代码变得混乱。
5. 利用枚举的类型特性，作为参数类型或返回值类型，提高代码的类型安全性。
6. 当枚举成员数量较少且明确时使用枚举，否则考虑使用联合类型。

## 练习
1. 定义一个表示星期几的枚举 `DayOfWeek`，包含从周一到周日的成员。
2. 定义一个表示颜色的字符串枚举 `Color`，包含常见的颜色名称。
3. 使用枚举表示 HTTP 方法（GET、POST、PUT、DELETE 等）。
4. 创建一个函数，接受一个枚举参数，并根据枚举值执行不同的操作。
5. 尝试使用常量枚举，并查看编译后的 JavaScript 代码。
6. 实现一个枚举合并的示例。

通过本章节的学习，你应该掌握了 TypeScript 中的枚举类型，能够定义和使用数字枚举、字符串枚举，理解枚举的高级特性和使用场景，并应用枚举的最佳实践。