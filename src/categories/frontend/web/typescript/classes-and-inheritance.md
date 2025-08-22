# TypeScript 类与继承

类是面向对象编程的基本构建块，用于创建具有相似属性和方法的对象。TypeScript 支持完整的面向对象编程特性，包括类、继承、抽象类等。本章将详细介绍 TypeScript 中的类与继承。

## 类的基本定义
类是一种模板，用于创建具有特定属性和方法的对象。

```typescript
// 定义一个简单的类
class Person {
  // 属性
  name: string;
  age: number;

  // 构造函数
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // 方法
  greet(): string {
    return `Hello, my name is ${this.name}, I'm ${this.age} years old.`;
  }
}

// 创建类的实例
const person = new Person('John', 25);
console.log(person.greet()); // 'Hello, my name is John, I'm 25 years old.'
```

## 访问修饰符
TypeScript 提供了三种访问修饰符，用于控制类成员的可访问性：

1. **public**：默认修饰符，成员可以在任何地方访问。
2. **private**：成员只能在类内部访问。
3. **protected**：成员可以在类内部和子类中访问。

```typescript
class Person {
  public name: string;     // 公开属性
  private age: number;     // 私有属性
  protected email: string; // 受保护属性

  constructor(name: string, age: number, email: string) {
    this.name = name;
    this.age = age;
    this.email = email;
  }

  public greet(): string {
    return `Hello, my name is ${this.name}`;
  }

  private getAge(): number {
    return this.age;
  }

  protected getEmail(): string {
    return this.email;
  }
}

const person = new Person('John', 25, 'john@example.com');
console.log(person.name); // 'John' - 可以访问
// console.log(person.age); // 编译错误 - 无法访问私有属性
// console.log(person.email); // 编译错误 - 无法访问受保护属性
// console.log(person.getAge()); // 编译错误 - 无法访问私有方法
```

## 继承
继承允许我们创建一个新类（子类），继承现有类（父类）的属性和方法，并可以添加新的属性和方法或重写现有方法。

```typescript
// 父类
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): string {
    return `Hello, my name is ${this.name}`;
  }
}

// 子类继承父类
class Student extends Person {
  studentId: number;

  constructor(name: string, age: number, studentId: number) {
    // 调用父类的构造函数
    super(name, age);
    this.studentId = studentId;
  }

  // 重写父类的方法
  greet(): string {
    return `${super.greet()}, I'm a student with ID ${this.studentId}`;
  }

  // 新增方法
  study(): void {
    console.log(`${this.name} is studying.`);
  }
}

const student = new Student('John', 20, 12345);
console.log(student.greet()); // 'Hello, my name is John, I'm a student with ID 12345'
student.study(); // 'John is studying.'
```

## 抽象类
抽象类是不能直接实例化的类，通常用于定义其他类的共同接口。抽象类可以包含抽象方法，这些方法必须在子类中实现。

```typescript
// 抽象类
abstract class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  // 抽象方法 - 没有实现
  abstract makeSound(): void;

  // 普通方法
  eat(): void {
    console.log(`${this.name} is eating.`);
  }
}

// 子类必须实现抽象方法
class Dog extends Animal {
  makeSound(): void {
    console.log('Woof! Woof!');
  }
}

class Cat extends Animal {
  makeSound(): void {
    console.log('Meow! Meow!');
  }
}

// const animal = new Animal('Animal'); // 编译错误 - 不能实例化抽象类

const dog = new Dog('Buddy');
dog.makeSound(); // 'Woof! Woof!'
dog.eat(); // 'Buddy is eating.'

const cat = new Cat('Whiskers');
cat.makeSound(); // 'Meow! Meow!'
cat.eat(); // 'Whiskers is eating.'
```

## 静态属性和方法
静态属性和方法属于类本身，而不是类的实例。可以通过类名直接访问。

```typescript
class MathUtils {
  // 静态属性
  static PI: number = 3.14159;

  // 静态方法
  static add(a: number, b: number): number {
    return a + b;
  }

  static multiply(a: number, b: number): number {
    return a * b;
  }
}

console.log(MathUtils.PI); // 3.14159
console.log(MathUtils.add(1, 2)); // 3
console.log(MathUtils.multiply(2, 3)); // 6

// 不需要创建实例
// const mathUtils = new MathUtils();
```

## 存取器 (Getter 和 Setter)
存取器允许我们控制属性的读取和设置，提供了额外的封装和验证能力。

```typescript
class Person {
  private _name: string;
  private _age: number;

  constructor(name: string, age: number) {
    this._name = name;
    this._age = age;
  }

  // Getter
  get name(): string {
    return this._name;
  }

  // Setter
  set name(value: string) {
    if (value.length > 0) {
      this._name = value;
    } else {
      console.error('Name cannot be empty.');
    }
  }

  // Getter
  get age(): number {
    return this._age;
  }

  // Setter
  set age(value: number) {
    if (value >= 0) {
      this._age = value;
    } else {
      console.error('Age cannot be negative.');
    }
  }
}

const person = new Person('John', 25);
console.log(person.name); // 'John'
person.name = 'Jane';
console.log(person.name); // 'Jane'

person.age = -5; // 'Age cannot be negative.'
console.log(person.age); // 25
```

## 类与接口
类可以实现接口，确保类具有接口定义的属性和方法。

```typescript
interface PersonInterface {
  name: string;
  age: number;
  greet: () => string;
}

class Person implements PersonInterface {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): string {
    return `Hello, my name is ${this.name}`;
  }
}

const person = new Person('John', 25);
console.log(person.greet()); // 'Hello, my name is John'
```

## 最佳实践
1. 使用访问修饰符保护类的内部状态，优先使用 `private` 或 `protected` 而不是 `public`。
2. 使用抽象类定义共同接口，提高代码的可维护性。
3. 避免深层继承，尽量保持继承层次简单（最好不超过 3 层）。
4. 使用存取器控制属性的访问和修改，提供额外的验证逻辑。
5. 静态成员用于定义与类相关但不依赖于实例的功能。
6. 结合接口使用类，确保类实现了必要的属性和方法。

## 练习
1. 定义一个 `Car` 类，包含 `brand`、`model` 和 `year` 属性，以及 `start`、`stop` 和 `drive` 方法。
2. 创建一个 `SportsCar` 类，继承自 `Car` 类，添加 `maxSpeed` 属性和 `race` 方法。
3. 定义一个抽象类 `Shape`，包含抽象方法 `calculateArea` 和 `calculatePerimeter`，然后创建 `Circle` 和 `Rectangle` 类继承自 `Shape` 并实现这些方法。
4. 使用存取器控制 `Person` 类中 `email` 属性的访问和修改，确保邮箱格式正确。
5. 创建一个 `MathHelper` 类，包含静态方法用于常见的数学运算，如求和、平均值、最大值等。

通过本章节的学习，你应该掌握了 TypeScript 中的类与继承特性，能够创建和使用类、实现继承、使用抽象类和接口，以及应用面向对象编程的最佳实践。