# TypeScript 装饰器

装饰器是 TypeScript 中一种特殊的声明，它可以附加到类、方法、属性或参数上，以修改类的行为。装饰器提供了一种声明式的方式来增强代码功能，是面向切面编程（AOP）的一种实现。本章将详细介绍装饰器的定义、使用方法和最佳实践。

## 装饰器基础
装饰器是一个特殊的函数，以 `@` 符号开头，放置在要装饰的声明之前。

### 1. 启用装饰器
要使用装饰器，需要在 `tsconfig.json` 中启用相关配置：

```json
{
  "compilerOptions": {
    "target": "ES5",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

### 2. 装饰器类型
TypeScript 支持多种类型的装饰器：
- 类装饰器（Class Decorators）
- 方法装饰器（Method Decorators）
- 属性装饰器（Property Decorators）
- 参数装饰器（Parameter Decorators）
- 访问器装饰器（Accessor Decorators）

## 类装饰器
类装饰器应用于类声明，接收类构造函数作为唯一参数。

### 1. 基本类装饰器
```typescript
function logClass(target: Function) {
  // 保存原始构造函数
  const original = target;

  // 创建新的构造函数
  function constructor(...args: any[]) {
    console.log(`Creating instance of ${original.name}`);
    return new original(...args);
  }

  // 复制原型方法
  constructor.prototype = original.prototype;

  // 返回新的构造函数
  return constructor as any;
}

@logClass
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const person = new Person('John', 30); // 输出: 'Creating instance of Person'
```

### 2. 带参数的类装饰器
```typescript
function logClass(message: string) {
  return function(target: Function) {
    console.log(`${message}: ${target.name}`);
  };
}

@logClass('Class defined')
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
// 输出: 'Class defined: Person'
```

## 方法装饰器
方法装饰器应用于类的方法，接收三个参数：目标类的原型、方法名和方法的属性描述符。

### 1. 基本方法装饰器
```typescript
function logMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  // 保存原始方法
  const originalMethod = descriptor.value;

  // 替换原始方法
  descriptor.value = function(...args: any[]) {
    console.log(`Calling method ${propertyKey} with arguments: ${JSON.stringify(args)}`);
    const result = originalMethod.apply(this, args);
    console.log(`Method ${propertyKey} returned: ${JSON.stringify(result)}`);
    return result;
  };

  return descriptor;
}

class Calculator {
  @logMethod
  add(a: number, b: number): number {
    return a + b;
  }
}

const calculator = new Calculator();
const result = calculator.add(2, 3); // 输出: 'Calling method add with arguments: [2,3]' 和 'Method add returned: 5'
```

### 2. 带参数的方法装饰器
```typescript
function logMethod(message: string) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
      console.log(`${message}: ${propertyKey} called with ${JSON.stringify(args)}`);
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

class Calculator {
  @logMethod('Operation')
  add(a: number, b: number): number {
    return a + b;
  }
}

const calculator = new Calculator();
calculator.add(2, 3); // 输出: 'Operation: add called with [2,3]'
```

## 属性装饰器
属性装饰器应用于类的属性，接收两个参数：目标类的原型和属性名。

```typescript
function logProperty(target: any, propertyKey: string) {
  let value: any;

  // 定义属性描述符
  const descriptor: PropertyDescriptor = {
    get() {
      console.log(`Getting value of ${propertyKey}: ${value}`);
      return value;
    },
    set(newValue: any) {
      console.log(`Setting value of ${propertyKey}: ${newValue}`);
      value = newValue;
    },
    enumerable: true,
    configurable: true
  };

  // 定义属性
  Object.defineProperty(target, propertyKey, descriptor);
}

class Person {
  @logProperty
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const person = new Person('John'); // 输出: 'Setting value of name: John'
console.log(person.name); // 输出: 'Getting value of name: John' 和 'John'
```

## 参数装饰器
参数装饰器应用于函数的参数，接收三个参数：目标类的原型、方法名和参数在函数参数列表中的索引。

```typescript
function logParameter(target: any, propertyKey: string, parameterIndex: number) {
  console.log(`Parameter decorator for ${propertyKey} at index ${parameterIndex}`);
}

class Person {
  name: string;
  age: number;

  constructor(@logParameter name: string, @logParameter age: number) {
    this.name = name;
    this.age = age;
  }

  greet(@logParameter message: string) {
    return `${this.name} says: ${message}`;
  }
}
// 输出: 'Parameter decorator for constructor at index 0' 和 'Parameter decorator for constructor at index 1' 和 'Parameter decorator for greet at index 0'
```

## 访问器装饰器
访问器装饰器应用于类的访问器（getter/setter），接收三个参数：目标类的原型、访问器名和访问器的属性描述符。

```typescript
function logAccessor(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log(`Accessor decorator for ${propertyKey}`);
  // 可以修改访问器的行为
  return descriptor;
}

class Person {
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  @logAccessor
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
}
// 输出: 'Accessor decorator for name'
```

## 装饰器组合
多个装饰器可以应用于同一个声明，按照从下到上的顺序执行。

```typescript
function decorator1(target: Function) {
  console.log('Decorator 1');
}

function decorator2(target: Function) {
  console.log('Decorator 2');
}

@decorator1
@decorator2
class Person {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
// 输出: 'Decorator 2' 然后 'Decorator 1'
```

## 元数据
通过启用 `emitDecoratorMetadata` 选项，TypeScript 会为装饰器提供元数据支持。

```typescript
import 'reflect-metadata';

function logType(target: any, propertyKey: string) {
  const type = Reflect.getMetadata('design:type', target, propertyKey);
  console.log(`Type of ${propertyKey} is ${type.name}`);
}

class Person {
  @logType
  name: string;

  @logType
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
// 输出: 'Type of name is String' 和 'Type of age is Number'
```

## 装饰器最佳实践
1. 使用装饰器增强类的功能，而不是替代类的实现。
2. 保持装饰器的单一责任原则，每个装饰器只做一件事。
3. 对于复杂的装饰器逻辑，考虑将其拆分为多个简单的装饰器。
4. 使用带参数的装饰器提高灵活性。
5. 注意装饰器的执行顺序，从下到上，从右到左。
6. 结合元数据，创建更强大的装饰器。
7. 避免过度使用装饰器，以免导致代码难以理解。

## 练习
1. 实现一个类装饰器 `@Singleton`，确保类只有一个实例。
2. 实现一个方法装饰器 `@Throttle`，限制方法的调用频率。
3. 实现一个属性装饰器 `@Validate`，验证属性的值是否符合要求。
4. 实现一个参数装饰器 `@Required`，确保参数不为 undefined 或 null。
5. 组合多个装饰器，实现更复杂的功能。
6. 探索装饰器与元数据的结合使用。

通过本章节的学习，你应该掌握了 TypeScript 中的装饰器特性，能够使用装饰器增强类的功能，实现面向切面编程，提高代码的可维护性和可扩展性。