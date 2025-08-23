# TypeScript 泛型

泛型是 TypeScript 中一种强大的特性，它允许我们创建可复用的组件，这些组件可以处理多种类型的数据，而不是仅限于一种类型。泛型可以提高代码的灵活性和可复用性，同时保持类型安全。本章将详细介绍泛型的定义、使用场景和高级特性。

## 泛型的基本概念
泛型允许我们在定义函数、接口或类时，不指定具体的类型，而是在使用时再指定类型。

### 1. 泛型函数
```typescript
// 定义一个泛型函数
function identity<T>(arg: T): T {
  return arg;
}

// 使用泛型函数
const num = identity<number>(10); // 类型为 number
const str = identity<string>('Hello'); // 类型为 string
const bool = identity<boolean>(true); // 类型为 boolean

// 类型推论 - 可以省略类型参数
const num2 = identity(20); // 类型自动推论为 number
const str2 = identity('World'); // 类型自动推论为 string
```

### 2. 泛型接口
```typescript
// 定义一个泛型接口
interface Box<T> {
  value: T;
}

// 使用泛型接口
const numberBox: Box<number> = { value: 10 };
const stringBox: Box<string> = { value: 'Hello' };
```

### 3. 泛型类
```typescript
// 定义一个泛型类
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

// 使用泛型类
const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
console.log(numberStack.pop()); // 2

const stringStack = new Stack<string>();
stringStack.push('Hello');
stringStack.push('World');
console.log(stringStack.pop()); // 'World'
```

## 泛型约束
有时我们需要限制泛型可以接受的类型，这时可以使用泛型约束。

### 1. 接口约束
```typescript
// 定义一个接口
interface Lengthwise {
  length: number;
}

// 使用接口约束泛型
function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(`Length: ${arg.length}`);
  return arg;
}

// 正确使用
loggingIdentity('Hello'); // 输出: Length: 5
loggingIdentity([1, 2, 3]); // 输出: Length: 3
loggingIdentity({ length: 10 }); // 输出: Length: 10

// 编译错误 - 数字没有 length 属性
// loggingIdentity(10);
```

### 2. 类型参数约束
```typescript
// 类型参数约束
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = {
  name: 'John',
  age: 25
};

console.log(getProperty(person, 'name')); // 'John'
console.log(getProperty(person, 'age')); // 25

// 编译错误 - 'height' 不是 person 的属性
// console.log(getProperty(person, 'height'));
```

## 泛型默认类型
可以为泛型指定默认类型，当不提供类型参数时，将使用默认类型。

```typescript
// 定义带有默认类型的泛型函数
function createArray<T = string>(length: number, value: T): T[] {
  return Array(length).fill(value);
}

// 使用默认类型
const stringArray = createArray(3, 'hello'); // string[]
console.log(stringArray); // ['hello', 'hello', 'hello']

// 指定类型参数
const numberArray = createArray<number>(3, 10); // number[]
console.log(numberArray); // [10, 10, 10]
```

## 泛型工具类型
TypeScript 提供了一些内置的泛型工具类型，用于常见的类型转换。

### 1. Partial`<T>`
将类型 T 的所有属性变为可选。

```typescript
interface Person {
  name: string;
  age: number;
}

type PartialPerson = Partial<Person>;
// 相当于:
// type PartialPerson = {
//   name?: string;
//   age?: number;
// }

const partialPerson: PartialPerson = {
  name: 'John'
};
```

### 2. Required`<T>`
将类型 T 的所有属性变为必需。

```typescript
interface PartialPerson {
  name?: string;
  age?: number;
}

type RequiredPerson = Required<PartialPerson>;
// 相当于:
// type RequiredPerson = {
//   name: string;
//   age: number;
// }

const requiredPerson: RequiredPerson = {
  name: 'John',
  age: 25
};
```

### 3. Readonly`<T>`
将类型 T 的所有属性变为只读。

```typescript
interface Person {
  name: string;
  age: number;
}

type ReadonlyPerson = Readonly<Person>;
// 相当于:
// type ReadonlyPerson = {
//   readonly name: string;
//   readonly age: number;
// }

const readonlyPerson: ReadonlyPerson = {
  name: 'John',
  age: 25
};

// 编译错误 - 无法修改只读属性
// readonlyPerson.name = 'Jane';
```

### 4. Record`<K, T>`
创建一个类型，其中键为 K 类型，值为 T 类型。

```typescript
type StringKeyMap = Record<string, number>;
const map: StringKeyMap = {
  'a': 1,
  'b': 2
};

type PersonMap = Record<'name' | 'age', string>;
const personMap: PersonMap = {
  'name': 'John',
  'age': '25'
};
```

### 5. Pick`<T, K>`
从类型 T 中选取指定的属性 K。

```typescript
interface Person {
  name: string;
  age: number;
  address: string;
}

type PersonNameAge = Pick<Person, 'name' | 'age'>;
// 相当于:
// type PersonNameAge = {
//   name: string;
//   age: number;
// }

const personNameAge: PersonNameAge = {
  name: 'John',
  age: 25
};
```

### 6. Omit`<T, K>`
从类型 T 中排除指定的属性 K。

```typescript
interface Person {
  name: string;
  age: number;
  address: string;
}

type PersonWithoutAddress = Omit<Person, 'address'>;
// 相当于:
// type PersonWithoutAddress = {
//   name: string;
//   age: number;
// }

const personWithoutAddress: PersonWithoutAddress = {
  name: 'John',
  age: 25
};
```

## 高级泛型用法
### 1. 泛型联合类型
```typescript
function wrapInArray<T>(value: T | T[]): T[] {
  if (Array.isArray(value)) {
    return value;
  } else {
    return [value];
  }
}

const array1 = wrapInArray(1); // [1]
const array2 = wrapInArray([1, 2, 3]); // [1, 2, 3]
```

### 2. 泛型递归类型
```typescript
interface TreeNode<T> {
  value: T;
  children?: TreeNode<T>[];
}

const tree: TreeNode<string> = {
  value: 'Root',
  children: [
    {
      value: 'Child 1',
      children: [
        { value: 'Grandchild 1' }
      ]
    },
    {
      value: 'Child 2'
    }
  ]
};
```

## 最佳实践
1. 优先使用泛型而不是 `any` 类型，以保持类型安全。
2. 为泛型添加适当的约束，避免不必要的类型检查。
3. 使用有意义的泛型参数名称（如 T、U、V 或更具体的名称如 TItem、TKey）。
4. 利用 TypeScript 提供的泛型工具类型简化类型定义。
5. 在定义泛型组件时，考虑设置合理的默认类型。
6. 避免过度泛型化，只在需要处理多种类型时使用泛型。

## 练习
1. 实现一个泛型函数 `filter`，接受一个数组和一个 predicate 函数，返回满足条件的元素组成的新数组。
2. 定义一个泛型接口 `Comparator<T>`，包含 `compare` 方法，然后实现这个接口用于比较数字和字符串。
3. 创建一个泛型类 `Queue<T>`，实现队列的基本操作：`enqueue`、`dequeue`、`peek` 和 `isEmpty`。
4. 使用泛型工具类型 `Partial`、`Required`、`Readonly` 等转换现有类型。
5. 实现一个泛型函数 `merge`，用于合并两个对象，返回一个新对象包含两个对象的所有属性。

通过本章节的学习，你应该掌握了 TypeScript 中的泛型特性，能够创建和使用泛型函数、接口和类，应用泛型约束和默认类型，以及利用泛型工具类型简化类型定义。