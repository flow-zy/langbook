# 原型与原型链 (Prototype & Prototype Chain)

原型和原型链是JavaScript中实现继承的核心机制，也是理解JavaScript对象模型的关键。在ES5中，所有对象都通过原型链实现属性和方法的继承。

## 原型的基本概念

每个JavaScript对象都有一个原型（prototype），对象可以从其原型继承属性和方法。在ES5中，可以通过`__proto__`属性（非标准但广泛支持）或`Object.getPrototypeOf()`方法访问对象的原型。

```javascript
var obj = {};
console.log(obj.__proto__); // 输出Object.prototype
console.log(Object.getPrototypeOf(obj)); // 输出Object.prototype
```

## 构造函数与原型

构造函数的`prototype`属性指向一个对象，该对象将被用作通过该构造函数创建的所有实例的原型。这是ES5中实现继承的基础。

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// 向构造函数的原型添加方法
Person.prototype.greet = function() {
  return "Hello, my name is " + this.name + ".";
};

// 创建实例
var john = new Person("John", 30);
var jane = new Person("Jane", 25);

console.log(john.greet()); // "Hello, my name is John."
console.log(jane.greet()); // "Hello, my name is Jane."

// 实例的原型指向构造函数的prototype属性
console.log(Object.getPrototypeOf(john) === Person.prototype); // true
```

## 原型链

当访问对象的属性或方法时，如果对象本身没有该属性或方法，JavaScript会沿着原型链向上查找，直到找到该属性或方法或到达原型链的末端（null）。原型链是ES5中实现继承的核心机制。

```javascript
var john = new Person("John", 30);

// 查找greet方法
// 1. 检查john对象本身是否有greet方法
// 2. 如果没有，检查john的原型(Person.prototype)是否有greet方法
// 3. 如果没有，检查Person.prototype的原型(Object.prototype)是否有greet方法
// 4. 如果没有，返回undefined

console.log(john.toString()); // 调用Object.prototype上的toString方法

// 原型链: john -> Person.prototype -> Object.prototype -> null
```

## 原型继承

在ES5中，JavaScript通过原型链实现继承。常用的继承方式有以下几种：

### 1. 原型链继承

```javascript
// 父构造函数
function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function() {
  return this.name + " is eating.";
};

// 子构造函数
function Dog(name, breed) {
  Animal.call(this, name); // 调用父构造函数
  this.breed = breed;
}

// 设置子构造函数的原型为父构造函数原型的实例
Dog.prototype = Object.create(Animal.prototype);
// 重置构造函数指向
Dog.prototype.constructor = Dog;

// 向子构造函数的原型添加方法
Dog.prototype.bark = function() {
  return this.name + " is barking.";
};

// 创建实例
var dog = new Dog("Buddy", "Labrador");
console.log(dog.name); // "Buddy"
console.log(dog.breed); // "Labrador"
console.log(dog.eat()); // "Buddy is eating."
console.log(dog.bark()); // "Buddy is barking."

// 原型链: dog -> Dog.prototype -> Animal.prototype -> Object.prototype -> null
```

### 2. 构造函数继承

```javascript
function Parent(name) {
  this.name = name;
}

Parent.prototype.sayHello = function() {
  return "Hello from " + this.name;
};

function Child(name, age) {
  Parent.call(this, name); // 仅继承实例属性
  this.age = age;
}

var child = new Child("Alice", 10);
console.log(child.name); // "Alice"
console.log(child.age); // 10
console.log(child.sayHello); // undefined (无法继承原型方法)
```

### 3. 组合继承（最常用）

```javascript
function Parent(name) {
  this.name = name;
}

Parent.prototype.sayHello = function() {
  return "Hello from " + this.name;
};

function Child(name, age) {
  Parent.call(this, name); // 继承实例属性
  this.age = age;
}

Child.prototype = Object.create(Parent.prototype); // 继承原型方法
Child.prototype.constructor = Child; // 重置构造函数

var child = new Child("Bob", 15);
console.log(child.name); // "Bob"
console.log(child.age); // 15
console.log(child.sayHello()); // "Hello from Bob"
```

## 原型方法与实例方法

在ES5中，方法可以定义在实例上（实例方法）或原型上（原型方法），二者有重要区别：

```javascript
function Person(name) {
  this.name = name;
  // 实例方法
  this.greet = function() {
    return "Hello, my name is " + this.name + ".";
  };
}

// 原型方法
Person.prototype.sayGoodbye = function() {
  return "Goodbye from " + this.name + ".";
};

var john = new Person("John");
var jane = new Person("Jane");

// 实例方法在每个实例上都有一份副本
console.log(john.greet === jane.greet); // false

// 原型方法在所有实例之间共享
console.log(john.sayGoodbye === jane.sayGoodbye); // true

// 性能考虑：原型方法更高效，因为只需要一份副本
// 内存占用：实例方法每个实例都有一份，内存占用更大
```

## 常用原型相关方法和属性 (ES5)

```javascript
// Object.getPrototypeOf() - 获取对象的原型
var obj = {};
console.log(Object.getPrototypeOf(obj)); // Object.prototype

// Object.create() - 创建具有指定原型的对象
var proto = { greet: function() { return "Hello"; } };
var obj3 = Object.create(proto);
console.log(obj3.greet()); // "Hello"

// hasOwnProperty() - 检查对象本身是否具有指定属性
var obj4 = { name: "John" };
console.log(obj4.hasOwnProperty("name")); // true
console.log(obj4.hasOwnProperty("toString")); // false

// isPrototypeOf() - 检查对象是否是另一个对象的原型
console.log(Object.prototype.isPrototypeOf(obj4)); // true

// 注意：ES5中没有Object.setPrototypeOf()方法，若需要设置原型，应使用Object.create()
// 替代方案：
var obj1 = {};
var obj2 = { greeting: "Hello" };
// 创建一个新对象，以obj2为原型，并复制obj1的属性
var newObj = Object.create(obj2);
for (var key in obj1) {
  if (obj1.hasOwnProperty(key)) {
    newObj[key] = obj1[key];
  }
}
console.log(newObj.greeting); // "Hello"
```

## 原型链与属性查找

当访问对象的属性时，JavaScript会按照以下顺序查找：
1. 首先检查对象自身是否有该属性
2. 如果没有，检查对象的原型是否有该属性
3. 如果没有，检查原型的原型，依此类推
4. 直到找到该属性或到达原型链末端（null）

```javascript
var animal = {
  eat: function() {
    return "Eating...";
  }
};

var dog = Object.create(animal);
dog.bark = function() {
  return "Woof!";
};

var labrador = Object.create(dog);
labrador.name = "Buddy";

console.log(labrador.name); // "Buddy" (labrador自身的属性)
console.log(labrador.bark()); // "Woof!" (从dog继承)
console.log(labrador.eat()); // "Eating..." (从animal继承)
console.log(labrador.toString()); // "[object Object]" (从Object.prototype继承)

// 属性遮蔽
labrador.eat = function() {
  return "Labrador eating...";
};
console.log(labrador.eat()); // "Labrador eating..." (遮蔽了animal的eat方法)
```

## 原型链的末端

原型链的末端是`null`，表示没有更多的原型可以查找：

```javascript
console.log(Object.prototype.__proto__); // null

var obj = {};
console.log(obj.__proto__.__proto__); // null
```

## 常见问题与解答

### Q: 什么是原型污染？

A: 原型污染是指通过修改对象的原型（尤其是`Object.prototype`）来影响所有继承自该原型的对象。这可能导致意外的行为和安全问题。

```javascript
// 原型污染示例
Object.prototype.myProp = "polluted";

var obj1 = {};
var obj2 = {};
console.log(obj1.myProp); // "polluted"
console.log(obj2.myProp); // "polluted"

// 避免原型污染：永远不要直接修改内置原型
// 可以使用Object.create(null)创建没有原型的对象
var safeObj = Object.create(null);
console.log(safeObj.__proto__); // undefined
```

### Q: 如何检查一个对象是否是另一个对象的实例？

A: 可以使用`instanceof`操作符或`isPrototypeOf`方法：

```javascript
function Person() {}
var john = new Person();

console.log(john instanceof Person); // true
console.log(Person.prototype.isPrototypeOf(john)); // true
```

### Q: 原型链继承和构造函数继承有什么区别？

A: 原型链继承可以继承原型上的方法和属性，而构造函数继承只能继承实例属性。组合继承（同时使用两种方式）是ES5中最常用的继承模式。

### Q: 为什么说原型方法比实例方法更高效？

A: 因为原型方法只在原型对象上创建一次，所有实例共享这一份方法；而实例方法会在每个实例上都创建一份副本，占用更多内存。

```javascript
// 原型方法 (高效)
function Person() {}
Person.prototype.greet = function() { /* ... */ };

// 实例方法 (低效)
function Person() {
  this.greet = function() { /* ... */ };
}
```