# 类与继承

ES6引入了类（Class）语法，为JavaScript的面向对象编程提供了更清晰、更直观的语法。虽然类语法本质上是对JavaScript现有原型继承模式的**语法糖**，但它大大简化了面向对象代码的编写，使其更接近传统面向对象编程语言的风格。

类语法的核心价值在于：
1. 提供了更清晰的语法来定义构造函数和原型方法
2. 简化了继承关系的实现
3. 增强了代码的可读性和可维护性
4. 引入了私有属性和方法等现代面向对象特性

## 核心概念对比

| 概念 | ES5原型方式 | ES6类方式 |
|------|------------|----------|
| 构造函数 | `function Person() {}` | `class Person {}` |
| 原型方法 | `Person.prototype.method = function() {}` | `class Person { method() {} }` |
| 继承 | `Child.prototype = Object.create(Parent.prototype)` | `class Child extends Parent {}` |
| 静态方法 | `Parent.staticMethod = function() {}` | `class Parent { static staticMethod() {} }` |

## 基本语法

### 类的定义

使用`class`关键字定义类，类体中可以包含构造函数、实例方法、静态方法、访问器属性等。

```javascript
// 基本类定义
class Person {
  // 构造函数 - 初始化实例属性
  constructor(name, age) {
    // this指向新创建的实例
    this.name = name;
    this.age = age;
    this._hobbies = []; // 以下划线开头表示私有属性(传统约定)
  }

  // 实例方法 - 会被添加到原型上
  sayHello() {
    return `Hello, my name is ${this.name} and I'm ${this.age} years old.`;
  }

  // 实例方法
  addHobby(hobby) {
    this._hobbies.push(hobby);
    return this._hobbies;
  }

  // 静态方法 - 直接属于类，不属于实例
  static createPerson(name, age) {
    // 工厂方法创建实例
    return new Person(name, age);
  }

  // 静态属性(ES2022)
  static species = 'Homo sapiens';
}
```

### 创建实例

使用`new`关键字创建类的实例：

```javascript
// 基本方式创建实例
const john = new Person('John', 30);
console.log(john.name); // John
console.log(john.sayHello()); // Hello, my name is John and I'm 30 years old.
console.log(john.addHobby('reading')); // ['reading']

// 使用静态方法创建实例
const jane = Person.createPerson('Jane', 25);
console.log(jane.name); // Jane
console.log(jane.sayHello()); // Hello, my name is Jane and I'm 25 years old.

// 访问静态属性
console.log(Person.species); // 'Homo sapiens'

// 检查实例类型
console.log(john instanceof Person); // true
```

### 类表达式

类也可以通过表达式的方式定义，类似于函数表达式：

```javascript
// 命名类表达式
const Person = class PersonClass {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    return `Hello, ${this.name}`;
  }
};

// 匿名类表达式
const Animal = class {
  constructor(type) {
    this.type = type;
  }

  getType() {
    return this.type;
  }
};

const dog = new Animal('dog');
console.log(dog.getType()); // 'dog'
```

## 类的继承

继承是面向对象编程的核心特性之一，它允许我们创建一个新类（子类），从已有的类（父类）继承属性和方法。ES6使用`extends`关键字实现继承。

### 基本继承

```javascript
// 父类
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    return `Hello, my name is ${this.name}`;
  }

  getAge() {
    return `${this.name} is ${this.age} years old.`;
  }

  static species = 'Homo sapiens';
}

// 子类继承父类
class Student extends Person {
  constructor(name, age, studentId) {
    // 必须先调用super()，它会调用父类的构造函数
    super(name, age);
    // 然后再定义子类自己的属性
    this.studentId = studentId;
    this.courses = [];
  }

  // 重写父类的方法
  sayHello() {
    return `Hello, my name is ${this.name}, and my student ID is ${this.studentId}`;
  }

  // 新增子类方法
  study() {
    return `${this.name} is studying.`;
  }

  // 新增子类方法
  addCourse(course) {
    this.courses.push(course);
    return this.courses;
  }

  // 静态方法也可以被继承
  static createStudent(name, age, studentId) {
    return new Student(name, age, studentId);
  }
}

// 创建子类实例
const alice = new Student('Alice', 20, 'S12345');
console.log(alice.name); // Alice (继承自父类)
console.log(alice.age); // 20 (继承自父类)
console.log(alice.studentId); // S12345 (子类自己的属性)
console.log(alice.sayHello()); // Hello, my name is Alice, and my student ID is S12345 (重写的方法)
console.log(alice.getAge()); // Alice is 20 years old. (继承的方法)
console.log(alice.study()); // Alice is studying. (子类新增方法)
console.log(alice.addCourse('Mathematics')); // ['Mathematics'] (子类新增方法)

// 使用继承的静态方法
const bob = Student.createStudent('Bob', 22, 'S67890');
console.log(bob.name); // Bob
console.log(bob.studentId); // S67890

// 访问继承的静态属性
console.log(Student.species); // 'Homo sapiens'

// 检查实例类型
console.log(alice instanceof Student); // true
console.log(alice instanceof Person); // true
```

### super关键字的使用

`super`关键字在子类中有两种主要用途：

1. **调用父类的构造函数**：在子类的`constructor`方法中，必须先调用`super()`，然后才能使用`this`关键字。

2. **调用父类的方法**：在子类方法中，可以使用`super.methodName()`调用父类的方法。

```javascript
class Parent {
  constructor(value) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }
}

class Child extends Parent {
  constructor(value, extra) {
    super(value); // 调用父类构造函数
    this.extra = extra;
  }

  getCombinedValue() {
    // 调用父类的方法
    return `${super.getValue()}-${this.extra}`;
  }
}

const child = new Child('hello', 'world');
console.log(child.getCombinedValue()); // 'hello-world'
```

### 继承内置类

我们也可以继承JavaScript的内置类，如Array、Map等，扩展它们的功能：

```javascript
// 扩展Array类
class EnhancedArray extends Array {
  // 新增方法
  sum() {
    return this.reduce((acc, curr) => acc + curr, 0);
  }

  // 重写方法
  push(...items) {
    console.log(`Adding ${items.length} items`);
    super.push(...items); // 调用父类的push方法
    return this.length;
  }
}

const numbers = new EnhancedArray(1, 2, 3);
console.log(numbers.sum()); // 6
numbers.push(4, 5); // 输出: Adding 2 items
console.log(numbers); // [1, 2, 3, 4, 5]
console.log(numbers.sum()); // 15
```

## 类的特性

类提供了多种特性来增强面向对象编程的能力，包括构造函数、方法定义、静态方法、访问器属性和私有属性方法等。

### 构造函数

`constructor`方法是类的构造函数，用于创建和初始化类的实例。一个类只能有一个`constructor`方法。当通过`new`关键字创建类的实例时，`constructor`方法会被自动调用。

```javascript
class Person {
  // 构造函数
  constructor(name, age) {
    // 使用this关键字为实例添加属性
    this.name = name;
    this.age = age;
    this.hobbies = [];
  }

  // 实例方法
  addHobby(hobby) {
    this.hobbies.push(hobby);
    return this.hobbies;
  }
}

// 创建实例时自动调用constructor方法
const person = new Person('John', 30);
console.log(person.name); // John
console.log(person.age); // 30
console.log(person.addHobby('reading')); // ['reading']

// 如果没有显式定义constructor，JavaScript会提供一个默认的空构造函数
class EmptyClass {
  // 没有定义constructor
}

const empty = new EmptyClass();
console.log(empty); // EmptyClass {}
```

### 方法定义

类的方法定义在类体中，不需要使用`function`关键字，也不需要逗号分隔。这些方法会被添加到类的原型上，供所有实例共享。

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // 实例方法
  sayHello() {
    return `Hello, my name is ${this.name}`;
  }

  // 方法可以接受参数
  celebrateBirthday() {
    this.age += 1;
    return `Happy Birthday! Now you are ${this.age} years old.`;
  }

  // 方法可以返回对象
  getInfo() {
    return {
      name: this.name,
      age: this.age
    };
  }
}

const person = new Person('John', 30);
console.log(person.sayHello()); // Hello, my name is John
console.log(person.celebrateBirthday()); // Happy Birthday! Now you are 31 years old.
console.log(person.getInfo()); // { name: 'John', age: 31 }
```

### 静态方法

使用`static`关键字定义静态方法，静态方法属于类而不是实例，只能通过类名调用。静态方法通常用于定义工具函数或与类相关但不依赖实例的功能。

```javascript
class MathUtils {
  // 静态方法
  static add(a, b) {
    return a + b;
  }

  static multiply(a, b) {
    return a * b;
  }

  // 静态方法可以调用其他静态方法
  static calculate(a, b) {
    return {
      sum: this.add(a, b),
      product: this.multiply(a, b)
    };
  }
}

// 通过类名调用静态方法
console.log(MathUtils.add(2, 3)); // 5
console.log(MathUtils.multiply(2, 3)); // 6
console.log(MathUtils.calculate(2, 3)); // { sum: 5, product: 6 }

// 不能通过实例调用静态方法
const math = new MathUtils();
console.log(math.add); // undefined

// 静态方法在继承中也能被继承
class AdvancedMathUtils extends MathUtils {
  static subtract(a, b) {
    return a - b;
  }
}

console.log(AdvancedMathUtils.add(5, 3)); // 8 (继承自MathUtils)
console.log(AdvancedMathUtils.subtract(5, 3)); // 2 (AdvancedMathUtils自己的方法)
```

### 访问器属性

使用`get`和`set`关键字定义访问器属性，用于控制属性的读取和设置，可以实现数据验证、计算属性等功能。

```javascript
class Person {
  constructor(name, birthYear) {
    this.name = name;
    this.birthYear = birthYear;
  }

  // getter - 用于获取属性值
  get age() {
    // 计算年龄
    const currentYear = new Date().getFullYear();
    return currentYear - this.birthYear;
  }

  // setter - 用于设置属性值
  set age(value) {
    if (typeof value !== 'number' || value < 0) {
      console.log('Invalid age value');
      return;
    }
    const currentYear = new Date().getFullYear();
    this.birthYear = currentYear - value;
  }

  // 带验证的访问器属性
  get name() {
    return this._name;
  }

  set name(value) {
    if (typeof value !== 'string' || value.trim() === '') {
      console.log('Name must be a non-empty string');
      return;
    }
    this._name = value;
  }
}

const person = new Person('John', 1990);
console.log(person.age); // 根据当前年份计算的年龄

person.age = 35;
console.log(person.birthYear); // 计算出的出生年份
console.log(person.age); // 35

person.name = ''; // Name must be a non-empty string
console.log(person.name); // John
```

### 私有属性和方法

使用`#`前缀定义私有属性和方法，私有属性和方法只能在类内部访问，外部无法直接访问。这提供了更好的封装性和数据保护。

```javascript
class Person {
  // 私有属性
  #name;
  #age;
  #salary;

  constructor(name, age, salary) {
    this.#name = name;
    this.#age = age;
    this.#salary = salary;
  }

  // 私有方法
  #calculateBonus() {
    return this.#salary * 0.1;
  }

  // 公共方法可以访问私有属性和方法
  getInfo() {
    return {
      name: this.#name,
      age: this.#age,
      bonus: this.#calculateBonus()
    };
  }

  // 可以通过公共方法修改私有属性
  setSalary(newSalary) {
    if (newSalary > 0) {
      this.#salary = newSalary;
      return true;
    }
    return false;
  }
}

const person = new Person('John', 30, 5000);
console.log(person.getInfo()); // { name: 'John', age: 30, bonus: 500 }
console.log(person.setSalary(6000)); // true
console.log(person.getInfo()); // { name: 'John', age: 30, bonus: 600 }

// 外部无法直接访问私有属性和方法
console.log(person.#name); // SyntaxError: Private field '#name' must be declared in an enclosing class
console.log(person.#calculateBonus()); // SyntaxError: Private field '#calculateBonus' must be declared in an enclosing class
```

### 静态属性

使用`static`关键字定义静态属性，静态属性属于类而不是实例，只能通过类名访问。

```javascript
class Person {
  // 静态属性
  static species = 'Homo sapiens';
  static population = 0;

  constructor(name) {
    this.name = name;
    // 访问并修改静态属性
    Person.population += 1;
  }

  // 静态方法访问静态属性
  static getPopulation() {
    return `${this.species}: ${this.population} individuals`;
  }
}

const person1 = new Person('Alice');
const person2 = new Person('Bob');

console.log(Person.species); // 'Homo sapiens'
console.log(Person.population); // 2
console.log(Person.getPopulation()); // 'Homo sapiens: 2 individuals'
```

## 与原型继承的关系

ES6的类本质上是JavaScript原型继承的语法糖，它提供了更清晰、更简洁的语法来实现面向对象编程，但底层仍然基于JavaScript的原型系统。

### 类与原型的关系

当我们定义一个类时，JavaScript会创建一个构造函数和一个相关联的原型对象：

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    return `Hello, my name is ${this.name}`;
  }

  static species = 'Homo sapiens';
}

// 类本质上是一个函数
console.log(typeof Person); // 'function'

// 类的方法被添加到原型对象上
console.log(Person.prototype.sayHello); // [Function: sayHello]

// 创建实例
const person = new Person('John', 30);

// 实例的__proto__指向类的原型
console.log(person.__proto__ === Person.prototype); // true

// 实例可以访问原型上的方法
console.log(person.sayHello()); // Hello, my name is John

// 静态属性和方法直接定义在类上
console.log(Person.species); // 'Homo sapiens'
```

### 类与传统原型继承的对比

以下是使用传统原型继承和ES6类实现相同功能的对比：

```javascript
// 传统原型继承方式
function PersonES5(name, age) {
  this.name = name;
  this.age = age;
}

// 添加原型方法
PersonES5.prototype.sayHello = function() {
  return `Hello, my name is ${this.name}`;
};

// 添加静态属性
PersonES5.species = 'Homo sapiens';

// 添加静态方法
PersonES5.createPerson = function(name, age) {
  return new PersonES5(name, age);
};

// ES6类方式
class PersonES6 {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    return `Hello, my name is ${this.name}`;
  }

  static species = 'Homo sapiens';

  static createPerson(name, age) {
    return new PersonES6(name, age);
  }
}

// 两种方式创建的实例行为相同
const personES5 = new PersonES5('John', 30);
const personES6 = new PersonES6('Jane', 25);

console.log(personES5.sayHello()); // Hello, my name is John
console.log(personES6.sayHello()); // Hello, my name is Jane

console.log(PersonES5.species); // 'Homo sapiens'
console.log(PersonES6.species); // 'Homo sapiens'

const personES5Created = PersonES5.createPerson('Bob', 35);
const personES6Created = PersonES6.createPerson('Alice', 28);

console.log(personES5Created.name); // Bob
console.log(personES6Created.name); // Alice
```

### 继承的底层实现

ES6类的继承(`extends`)本质上是基于原型链的继承：

```javascript
class Parent {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    return `Hello, my name is ${this.name}`;
  }
}

class Child extends Parent {
  constructor(name, age) {
    super(name);
    this.age = age;
  }

  sayAge() {
    return `I am ${this.age} years old`;
  }
}

const child = new Child('John', 10);

// 实例的__proto__指向Child.prototype
console.log(child.__proto__ === Child.prototype); // true

// Child.prototype的__proto__指向Parent.prototype
console.log(Child.prototype.__proto__ === Parent.prototype); // true

// 因此child可以访问Parent.prototype上的方法
console.log(child.sayHello()); // Hello, my name is John

// 也可以访问Child.prototype上的方法
console.log(child.sayAge()); // I am 10 years old

// Child的__proto__指向Parent
console.log(Child.__proto__ === Parent); // true

// 因此可以访问Parent上的静态方法
if (Parent.hasOwnProperty('staticMethod')) {
  console.log(Child.staticMethod()); // 可以调用父类的静态方法
}
```

### 理解super关键字的底层机制

在子类中，`super`关键字有两种用法：

1. 作为函数调用(`super()`)：调用父类的构造函数
2. 作为对象使用(`super.method()`)：访问父类的方法

```javascript
class Parent {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    return `Hello from Parent: ${this.name}`;
  }
}

class Child extends Parent {
  constructor(name, age) {
    // 调用父类构造函数
    super(name);
    this.age = age;
  }

  sayHello() {
    // 调用父类的sayHello方法
    const parentGreeting = super.sayHello();
    return `${parentGreeting}, and I am ${this.age} years old`;
  }
}

const child = new Child('John', 10);
console.log(child.sayHello()); // Hello from Parent: John, and I am 10 years old

// 当调用super.sayHello()时，this指向的是child实例
// 这就是为什么父类方法中的this.name可以访问到child实例的name属性
```

## 注意事项

在使用ES6类时，有一些重要的注意事项和最佳实践需要了解，以避免常见的陷阱和错误。

### 1. 类声明不会被提升

与函数声明不同，类声明不会被提升到作用域顶部。必须先声明类，然后才能使用它：

```javascript
// 错误: Cannot access 'Person' before initialization
const person = new Person('John');

class Person {
  constructor(name) {
    this.name = name;
  }
}

// 正确: 先声明类，再使用
class Person {
  constructor(name) {
    this.name = name;
  }
}

const person = new Person('John');
```

### 2. 类方法不需要function关键字

在类体中定义方法时，不需要使用`function`关键字，直接写方法名即可：

```javascript
class Person {
  // 正确
  sayHello() {
    return `Hello`;
  }

  // 错误: 不要使用function关键字
  function sayGoodbye() {
    return `Goodbye`;
  }
}
```

### 3. 类中的代码运行在严格模式下

类的所有方法（包括构造函数）都运行在严格模式下，这意味着：
- 变量必须先声明再使用
- 不能使用未声明的变量
- `this`在全局函数中是`undefined`而不是全局对象
- 禁止使用`with`语句
- 函数参数不能有重复的名称

```javascript
class Person {
  constructor(name) {
    // 严格模式下，以下代码会报错
    // age = 30; // ReferenceError: age is not defined

    this.name = name;
  }
}
```

### 4. 原型方法共享

类的所有实例共享原型上的方法，这意味着修改原型上的方法会影响所有实例：

```javascript
class Person {
  sayHello() {
    return `Hello`;
  }
}

const person1 = new Person();
const person2 = new Person();

// 修改原型方法
Person.prototype.sayHello = function() {
  return `Hello World`;
};

console.log(person1.sayHello()); // Hello World
console.log(person2.sayHello()); // Hello World
```

### 5. 继承时必须调用super()

在子类的`constructor`方法中，必须先调用`super()`，然后才能使用`this`关键字：

```javascript
class Parent {
  constructor(name) {
    this.name = name;
  }
}

class Child extends Parent {
  constructor(name, age) {
    // 错误: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
    // this.age = age;
    // super(name);

    // 正确
    super(name);
    this.age = age;
  }
}
```

### 6. 静态方法不能直接访问实例属性

静态方法属于类，不属于实例，因此不能直接访问实例属性：

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  static sayHello() {
    // 错误: Cannot read properties of undefined (reading 'name')
    // return `Hello, ${this.name}`;

    // 正确: 静态方法可以访问静态属性
    return `Hello from static method`;
  }
}

const person = new Person('John');
console.log(Person.sayHello()); // Hello from static method
```

### 7. 私有属性和方法的限制

使用`#`定义的私有属性和方法只能在类内部访问，外部无法直接访问：

```javascript
class Person {
  #name;

  constructor(name) {
    this.#name = name;
  }
}

const person = new Person('John');
// 错误: Private field '#name' must be declared in an enclosing class
// console.log(person.#name);
```

### 8. 类的this指向

在类方法中，`this`默认指向调用该方法的实例。但在箭头函数中，`this`会继承外层作用域的`this`值：

```javascript
class Person {
  constructor(name) {
    this.name = name;

    // 箭头函数中的this指向实例
    this.sayHello = () => {
      return `Hello, my name is ${this.name}`;
    };
  }

  // 普通方法中的this指向调用该方法的实例
  sayGoodbye() {
    return `Goodbye, ${this.name}`;
  }
}

const person = new Person('John');
console.log(person.sayHello()); // Hello, my name is John
console.log(person.sayGoodbye()); // Goodbye, John
```

### 9. 避免在构造函数中返回对象

如果在构造函数中返回一个对象，`new`操作符将返回这个对象而不是类的实例：

```javascript
class Person {
  constructor(name) {
    this.name = name;

    // 警告: 这会导致new Person()返回的是这个对象，而不是Person的实例
    // return { age: 30 };
  }
}

const person = new Person('John');
console.log(person instanceof Person); // true (如果没有return语句)
```

### 10. 类的兼容性

ES6类在所有现代浏览器中都得到了支持，但在IE等旧浏览器中需要使用Babel等工具进行转译。如果需要支持旧环境，应考虑转译或使用传统的原型继承方式。

## 总结

ES6的类是JavaScript面向对象编程的重要特性，它提供了更清晰、更简洁的语法来实现原型继承，同时保持了JavaScript的灵活性。通过使用类，我们可以更直观地创建对象、定义方法和实现继承。

### 核心优势

1. **语法清晰简洁**：类语法比传统的原型继承更接近其他面向对象语言，使代码更易于理解和维护。

2. **更好的封装性**：通过私有属性和方法(`#`前缀)，我们可以更好地封装对象的内部状态，避免外部直接访问和修改。

3. **继承更直观**：使用`extends`关键字和`super`关键字，使继承关系更加清晰，代码结构更加整洁。

4. **静态方法和属性**：提供了更直接的方式定义属于类而不属于实例的方法和属性。

5. **访问器属性**：通过`get`和`set`关键字，可以实现属性的读取和设置控制，包括数据验证和计算属性。

### 关键要点

- **类本质**：类是原型继承的语法糖，底层仍然基于JavaScript的原型系统。

- **构造函数**：使用`constructor`方法初始化实例属性，通过`new`关键字调用。

- **方法定义**：类方法不需要`function`关键字，直接定义方法名即可，这些方法会被添加到类的原型上。

- **继承**：使用`extends`关键字实现继承，子类必须在`constructor`方法中调用`super()`。

- **this指向**：类方法中的`this`指向调用该方法的实例，箭头函数中的`this`继承外层作用域。

- **严格模式**：类中的代码自动运行在严格模式下，需要注意变量声明和`this`的使用。

### 使用建议

1. **优先使用类语法**：对于复杂的对象系统，类语法通常比传统的原型继承更清晰、更易于维护。

2. **合理使用私有属性和方法**：对于不希望外部访问的内部状态和实现细节，使用私有属性和方法进行封装。

3. **谨慎使用继承**：继承可以重用代码，但过度使用会导致类层次结构复杂，考虑组合优于继承的设计原则。

4. **注意this的绑定**：在将类方法作为回调函数传递时，注意`this`的绑定问题，可以使用箭头函数或`bind`方法解决。

5. **理解底层机制**：虽然类是语法糖，但理解其底层的原型机制有助于解决复杂问题和调试错误。

ES6类的引入使JavaScript的面向对象编程更加成熟和易用，无论是构建简单的对象还是复杂的应用程序，类都是一个强大而灵活的工具。