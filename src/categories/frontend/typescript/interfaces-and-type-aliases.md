# TypeScript 接口与类型别名

在 TypeScript 中，接口（Interfaces）和类型别名（Type Aliases）是两种定义复杂类型的方式。它们可以帮助我们创建更清晰、更可维护的代码。本章将详细介绍接口和类型别名的定义、使用场景以及它们之间的区别。

## 接口 (Interfaces)
接口是一种定义对象形状的方式，它描述了对象应该具有的属性和方法。

### 1. 基本接口定义
```typescript
// 定义一个简单的接口
interface Person {
  name: string;
  age: number;
}

// 使用接口
const person: Person = {
  name: 'John',
  age: 25
};
```

### 2. 可选属性
接口中的属性可以是可选的，使用 `?` 标记。

```typescript
interface Person {
  name: string;
  age?: number;
}

const person1: Person = {
  name: 'John'
};

const person2: Person = {
  name: 'Jane',
  age: 30
};
```

### 3. 只读属性
使用 `readonly` 标记的属性只能在对象创建时赋值，之后不能修改。

```typescript
interface Person {
  readonly name: string;
  age: number;
}

const person: Person = {
  name: 'John',
  age: 25
};

// 无法修改只读属性
// person.name = 'Jane'; // 编译错误
```

### 4. 函数类型接口
接口也可以描述函数类型。

```typescript
interface GreetFunction {
  (name: string): string;
}

const greet: GreetFunction = (name) => {
  return `Hello, ${name}!`;
};
```

### 5. 索引类型接口
接口可以描述索引类型，包括数字索引和字符串索引。

```typescript
// 数字索引接口
interface NumberArray {
  [index: number]: number;
}

const numbers: NumberArray = [1, 2, 3, 4, 5];

// 字符串索引接口
interface StringMap {
  [key: string]: string;
}

const map: StringMap = {
  'a': 'apple',
  'b': 'banana'
};
```

### 6. 接口继承
接口可以继承其他接口，实现代码复用。

```typescript
interface Person {
  name: string;
  age: number;
}

interface Student extends Person {
  studentId: number;
  study: () => void;
}

const student: Student = {
  name: 'John',
  age: 20,
  studentId: 12345,
  study: () => console.log('Studying...')
};
```

### 7. 实现接口
类可以实现接口，确保类具有接口定义的属性和方法。

```typescript
interface Person {
  name: string;
  age: number;
  greet: () => string;
}

class Employee implements Person {
  name: string;
  age: number;
  position: string;

  constructor(name: string, age: number, position: string) {
    this.name = name;
    this.age = age;
    this.position = position;
  }

  greet(): string {
    return `Hello, my name is ${this.name}, I'm ${this.age} years old.`;
  }
}

const employee = new Employee('John', 30, 'Developer');
console.log(employee.greet()); // 'Hello, my name is John, I'm 30 years old.'
```

## 类型别名 (Type Aliases)
类型别名用于给一个类型起一个新名字，可以用于原始类型、联合类型、元组类型等。

### 1. 基本类型别名
```typescript
type Age = number;
let age: Age = 25;

 type Name = string;
let name: Name = 'John';
```

### 2. 联合类型别名
```typescript
type StringOrNumber = string | number;
let value: StringOrNumber = 'Hello';
value = 100;
```

### 3. 元组类型别名
```typescript
type PersonTuple = [string, number];
let person: PersonTuple = ['John', 25];
```

### 4. 对象类型别名
```typescript
type Person = {
  name: string;
  age: number;
};

const person: Person = {
  name: 'John',
  age: 25
};
```

### 5. 函数类型别名
```typescript
type GreetFunction = (name: string) => string;
const greet: GreetFunction = (name) => `Hello, ${name}!`;
```

### 6. 条件类型别名
```typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
.type B = IsString<number>; // false
```

## 接口与类型别名的区别
虽然接口和类型别名有很多相似之处，但它们之间也存在一些重要区别：

1. **扩展方式不同**：接口通过 `extends` 扩展，类型别名通过交叉类型 `&` 扩展。
2. **重复定义**：接口可以重复定义，会自动合并；类型别名不能重复定义。
3. **实现**：类可以实现接口，但不能实现类型别名（除非是对象类型别名）。
4. **计算属性**：类型别名可以使用计算属性，接口不行。
5. **联合类型**：类型别名可以定义联合类型，接口不行。

## 最佳实践
1. 对于对象形状的定义，优先使用接口。
2. 对于联合类型、交叉类型、元组类型等复杂类型，使用类型别名。
3. 当需要扩展或合并类型时，考虑使用接口的继承或类型别名的交叉类型。
4. 保持一致性：在项目中保持使用接口或类型别名的一致性，避免混用导致代码混乱。

## 练习
1. 定义一个接口 `Car`，包含 `brand`、`model` 和可选的 `year` 属性。
2. 定义一个类型别名 `StringOrNumberArray`，表示字符串或数字数组。
3. 定义一个接口 `Shape`，包含 `calculateArea` 方法，然后创建两个实现该接口的类 `Circle` 和 `Rectangle`。
4. 定义一个类型别名 `PartialPerson`，表示 `Person` 接口的所有属性都是可选的。
5. 比较接口和类型别名的使用场景，总结它们的优缺点。

通过本章节的学习，你应该掌握了接口和类型别名的定义、使用方法以及它们之间的区别，能够根据实际需求选择合适的方式来定义复杂类型。