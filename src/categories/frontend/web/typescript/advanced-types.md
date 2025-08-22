# TypeScript 高级类型

TypeScript 提供了一系列高级类型特性，使我们能够创建更灵活、更强大的类型。这些高级类型包括条件类型、映射类型、索引类型等，它们可以帮助我们编写更简洁、更安全的代码。本章将详细介绍这些高级类型的定义、使用场景和最佳实践。

## 条件类型 (Conditional Types)
条件类型允许我们根据一个条件表达式来选择不同的类型，语法为 `T extends U ? X : Y`。

### 1. 基本条件类型
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

### 3. 条件类型与 infer
`infer` 关键字允许我们在条件类型中提取类型信息。

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type A = ReturnType<() => string>; // string
type B = ReturnType<(x: number) => boolean>; // boolean
```

### 4. 内置条件类型
TypeScript 提供了一些内置的条件类型：
- `Extract<T, U>`: 提取 T 中可以赋值给 U 的类型
- `Exclude<T, U>`: 排除 T 中可以赋值给 U 的类型
- `ReturnType<T>`: 获取函数返回值类型
- `Parameters<T>`: 获取函数参数类型
- `InstanceType<T>`: 获取类的实例类型

```typescript
type A = Exclude<string | number | boolean, string>; // number | boolean
type B = Parameters<(x: number, y: string) => void>; // [number, string]
```

## 映射类型 (Mapped Types)
映射类型允许我们基于现有类型创建新类型，通过映射对象的属性来实现。

### 1. 基本映射类型
```typescript
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

type Person = {
  name: string;
  age: number;
};

type ReadonlyPerson = Readonly<Person>; // { readonly name: string; readonly age: number }
```

### 2. 内置映射类型
TypeScript 提供了一些内置的映射类型：
- `Readonly<T>`: 将所有属性变为只读
- `Partial<T>`: 将所有属性变为可选
- `Required<T>`: 将所有属性变为必选
- `Pick<T, K>`: 选择 T 中的某些属性
- `Omit<T, K>`: 排除 T 中的某些属性
- `Record<K, T>`: 创建一个键为 K 类型、值为 T 类型的对象类型

```typescript
type Person = {
  name: string;
  age: number;
  address: string;
};

type PartialPerson = Partial<Person>; // { name?: string; age?: number; address?: string }
type PickPerson = Pick<Person, 'name' | 'age'>; // { name: string; age: number }
type OmitPerson = Omit<Person, 'address'>; // { name: string; age: number }
type StringMap = Record<string, string>; // { [key: string]: string }
```

### 3. 自定义映射类型
我们可以创建自定义的映射类型，以满足特定需求。

```typescript
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

type Person = {
  name: string;
  age: number;
};

type NullablePerson = Nullable<Person>; // { name: string | null; age: number | null }
```

### 4. 映射类型与修饰符
我们可以在映射类型中添加或删除修饰符（`readonly`、`?`）。

```typescript
type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

type Required<T> = {
  [K in keyof T]-?: T[K];
};
```

## 索引类型 (Indexed Types)
索引类型允许我们通过索引访问对象的属性类型。

### 1. 索引类型查询
使用 `keyof` 操作符获取对象类型的所有键。

```typescript
type Person = {
  name: string;
  age: number;
};

type PersonKeys = keyof Person; // 'name' | 'age'
```

### 2. 索引访问类型
使用 `T[K]` 语法访问对象类型的属性类型。

```typescript
type Person = {
  name: string;
  age: number;
};

type NameType = Person['name']; // string
type AgeType = Person['age']; // number
type PropertyType = Person[keyof Person]; // string | number
```

### 3. 索引签名
使用索引签名定义具有任意键的对象类型。

```typescript
type StringMap = {
  [key: string]: string;
};

type NumberMap = {
  [key: number]: number;
};
```

## 递归类型 (Recursive Types)
递归类型是指引用自身的类型。

### 1. 基本递归类型
```typescript
type TreeNode = {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
};

const tree: TreeNode = {
  value: 1,
  left: {
    value: 2
  },
  right: {
    value: 3,
    left: {
      value: 4
    }
  }
};
```

### 2. 递归联合类型
```typescript
type JSONValue = 
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

const json: JSONValue = {
  name: 'John',
  age: 30,
  isActive: true,
  hobbies: ['reading', 'gaming'],
  address: {
    street: '123 Main St',
    city: 'Anytown'
  }
};
```

## 模板字面量类型 (Template Literal Types)
模板字面量类型允许我们基于字符串字面量创建新的字符串类型。

### 1. 基本模板字面量类型
```typescript
type Greeting = `Hello, ${string}!`;

type A = Greeting; // 'Hello, ' 后跟任意字符串
const greeting1: Greeting = 'Hello, John!'; // 有效
const greeting2: Greeting = 'Hi, John!'; // 无效
```

### 2. 联合类型与模板字面量
```typescript
type Color = 'red' | 'green' | 'blue';
type HexColor = `#${string}`;
type RGBColor = `rgb(${number}, ${number}, ${number})`;
type ColorString = HexColor | RGBColor;

type A = `light${Capitalize<Color>}`; // 'lightRed' | 'lightGreen' | 'lightBlue'
```

### 3. 内置字符串操作类型
TypeScript 提供了一些内置的字符串操作类型：
- `Uppercase<S>`: 将字符串转换为大写
- `Lowercase<S>`: 将字符串转换为小写
- `Capitalize<S>`: 将字符串首字母大写
- `Uncapitalize<S>`: 将字符串首字母小写

```typescript
type A = Uppercase<'hello'>; // 'HELLO'
type B = Lowercase<'WORLD'>; // 'world'
type C = Capitalize<'hello'>; // 'Hello'
type D = Uncapitalize<'World'>; // 'world'
```

## 高级类型最佳实践
1. 利用条件类型创建类型守卫函数，提高类型安全性。
2. 使用映射类型简化重复的类型定义，保持代码DRY。
3. 结合索引类型和映射类型，创建灵活的类型转换工具。
4. 利用递归类型表示复杂的数据结构，如树、图等。
5. 使用模板字面量类型创建类型安全的字符串格式。
6. 优先使用内置高级类型，如 `Partial`、`Readonly` 等，而不是手动实现。
7. 注意类型的可读性，避免过度使用高级类型导致代码难以理解。

## 练习
1. 实现一个条件类型 `IsArray<T>`，判断类型 T 是否为数组。
2. 实现一个映射类型 `DeepReadonly<T>`，将对象的所有属性（包括嵌套对象）变为只读。
3. 使用索引类型和映射类型，实现一个类型 `PickByType<T, U>`，选择 T 中类型为 U 的属性。
4. 实现一个递归类型 `DeepPartial<T>`，将对象的所有属性（包括嵌套对象）变为可选。
5. 使用模板字面量类型，实现一个类型 `Path<T>`，表示对象 T 的属性路径。
6. 探索条件类型、映射类型和索引类型的组合使用。

通过本章节的学习，你应该掌握了 TypeScript 中的高级类型特性，能够灵活运用这些特性创建更强大、更安全的类型系统，提高代码质量和可维护性。