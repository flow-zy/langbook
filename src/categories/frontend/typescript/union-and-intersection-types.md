# TypeScript 联合类型与交叉类型

联合类型（Union Types）和交叉类型（Intersection Types）是 TypeScript 中用于组合类型的强大特性。它们允许我们创建更灵活、更复杂的类型，同时保持类型安全。本章将详细介绍联合类型和交叉类型的定义、使用场景和高级特性。

## 联合类型 (Union Types)
联合类型表示一个值可以是几种类型中的一种，使用 `|` 符号分隔不同的类型。

### 1. 基本联合类型
```typescript
// 定义一个联合类型
type StringOrNumber = string | number;

// 使用联合类型
let value: StringOrNumber = 'Hello';
value = 100;

// 编译错误 - 不能赋值为 boolean 类型
// value = true;
```

### 2. 联合类型的类型保护
当使用联合类型时，我们需要确保操作对所有可能的类型都有效，或者使用类型保护来缩小类型范围。

```typescript
function printValue(value: string | number) {
  // 类型保护 - 使用 typeof
  if (typeof value === 'string') {
    console.log(`String: ${value.toUpperCase()}`);
  } else {
    console.log(`Number: ${value.toFixed(2)}`);
  }
}

printValue('hello'); // 'String: HELLO'
printValue(123.456); // 'Number: 123.46'
```

### 3. 联合类型与字面量类型
联合类型常与字面量类型结合使用，表示一组固定的值。

```typescript
type Direction = 'up' | 'down' | 'left' | 'right';

function move(direction: Direction) {
  switch (direction) {
    case 'up':
      console.log('Moving up');
      break;
    case 'down':
      console.log('Moving down');
      break;
    case 'left':
      console.log('Moving left');
      break;
    case 'right':
      console.log('Moving right');
      break;
    default:
      // 类型保护 - 确保所有情况都被处理
      const exhaustiveCheck: never = direction;
      throw new Error(`Unknown direction: ${direction}`);
  }
}
```

### 4. 联合类型与接口
联合类型可以包含接口类型，表示一个值可以是多个接口类型中的一种。

```typescript
interface Bird {
  fly: () => void;
  layEggs: () => void;
}

interface Fish {
  swim: () => void;
  layEggs: () => void;
}

type Animal = Bird | Fish;

function doSomething(animal: Animal) {
  // 可以调用所有类型共有的方法
  animal.layEggs();

  // 类型保护 - 使用 in 操作符
  if ('fly' in animal) {
    animal.fly();
  } else if ('swim' in animal) {
    animal.swim();
  }
}
```

## 交叉类型 (Intersection Types)
交叉类型表示一个值同时具有多种类型的特性，使用 `&` 符号连接不同的类型。

### 1. 基本交叉类型
```typescript
// 定义交叉类型
type Person = {
  name: string;
  age: number;
};

type Employee = {
  employeeId: number;
  position: string;
};

type EmployeePerson = Person & Employee;

// 使用交叉类型
const employee: EmployeePerson = {
  name: 'John',
  age: 30,
  employeeId: 12345,
  position: 'Developer'
};
```

### 2. 交叉类型与接口
交叉类型常与接口结合使用，创建包含多个接口特性的新类型。

```typescript
interface Loggable {
  log: () => void;
}

interface Serializable {
  serialize: () => string;
}

interface Persistable extends Loggable, Serializable {
  save: () => void;
}

// 交叉类型实现同样的效果
type Persistable = Loggable & Serializable & {
  save: () => void;
};

class User implements Persistable {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  log(): void {
    console.log(`User: ${this.name}`);
  }

  serialize(): string {
    return JSON.stringify({ name: this.name });
  }

  save(): void {
    localStorage.setItem('user', this.serialize());
  }
}
```

### 3. 交叉类型与联合类型结合
交叉类型可以与联合类型结合使用，创建更复杂的类型。

```typescript
type A = { a: number };
type B = { b: string };
type C = { c: boolean };

type AB = A | B;
type ABC = AB & C;

// ABC 类型包含 a 或 b 属性，以及 c 属性
const obj1: ABC = { a: 1, c: true };
const obj2: ABC = { b: 'hello', c: false };
```

## 高级用法
### 1. 条件类型与联合类型
```typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false
type C = IsString<string | number>; // boolean (true | false)
```

### 2. 分布式条件类型
当条件类型作用于联合类型时，会分布式地应用于每个成员。

```typescript
type Extract<T, U> = T extends U ? T : never;

type A = Extract<string | number | boolean, string | number>; // string | number
type B = Extract<string | number | boolean, boolean>; // boolean
```

### 3. 交叉类型与同名属性
当交叉类型包含同名属性时，属性类型会被合并。如果属性类型不兼容，则结果为 `never`。

```typescript
type A = { id: number; name: string };
type B = { id: string; age: number };

type C = A & B; // { id: never; name: string; age: number }
// id 属性类型为 never，因为 number 和 string 不兼容
```

## 最佳实践
1. 联合类型用于表示"或"的关系，交叉类型用于表示"且"的关系。
2. 使用类型保护缩小联合类型的范围，确保操作的类型安全性。
3. 联合类型与字面量类型结合，用于表示固定的选项集合。
4. 交叉类型用于组合多个类型的特性，创建更复杂的类型。
5. 注意交叉类型中同名属性的类型兼容性问题。
6. 利用分布式条件类型处理联合类型的每个成员。

## 练习
1. 定义一个联合类型 `StringOrNumberOrBoolean`，表示字符串、数字或布尔值。
2. 实现一个函数，接受 `StringOrNumberOrBoolean` 类型的参数，并根据类型执行不同的操作。
3. 定义一个交叉类型 `UserWithAddress`，包含用户信息和地址信息。
4. 使用联合类型和字面量类型定义 HTTP 方法（GET、POST、PUT、DELETE 等）。
5. 实现一个类型保护函数，区分联合类型中的不同成员。
6. 探索交叉类型与同名属性的合并规则。

通过本章节的学习，你应该掌握了 TypeScript 中的联合类型和交叉类型，能够定义和使用这些类型来创建更灵活、更复杂的类型，同时保持类型安全。