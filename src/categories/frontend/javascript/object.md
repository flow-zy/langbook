# 对象 (Object)

对象是JavaScript中用于存储键值对和更复杂数据的核心数据结构。在ES5中，对象由属性组成，每个属性包含一个键（名称）和一个值。

## 对象的创建

### 对象字面量
对象字面量是创建对象最简洁的方式，使用花括号`{}`定义：
```javascript
var person = {
  name: "John",
  age: 30,
  city: "New York"
};
```

### 构造函数
使用`Object`构造函数创建对象：
```javascript
var person = new Object();
person.name = "John";
person.age = 30;
person.city = "New York";
```

### Object.create()
`Object.create()`方法创建一个新对象，使用现有的对象作为新对象的原型：
```javascript
var personProto = {
  greet: function() {
    return "Hello, " + this.name + "!";
  }
};

var person = Object.create(personProto);
person.name = "John";
person.age = 30;
```

## 属性访问

### 点表示法
最常用的属性访问方式：
```javascript
var person = { name: "John", age: 30 };
console.log(person.name); // "John"
```

### 方括号表示法
当属性名包含特殊字符或需要动态访问时使用：
```javascript
var person = { name: "John", age: 30 };
console.log(person["age"]); // 30

// 动态属性名
var propName = "city";
var personWithCity = {};
personWithCity.name = "John";
personWithCity[propName] = "New York";
console.log(personWithCity.city); // "New York"
```

## 属性修改

### 修改现有属性
直接赋值即可修改对象的现有属性：
```javascript
var person = { name: "John", age: 30 };
person.age = 31;
console.log(person.age); // 31
```

### 添加新属性
为对象赋值一个新的属性名即可添加属性：
```javascript
var person = { name: "John", age: 30 };
person.city = "New York";
console.log(person.city); // "New York"
```

### 删除属性
使用`delete`运算符可以删除对象的属性：
```javascript
var person = { name: "John", age: 30, city: "New York" };
delete person.city;
console.log(person.city); // undefined
```

> 注意：`delete`运算符只能删除对象的自有属性，不能删除继承的属性。

## 对象方法

函数作为对象的属性被称为方法：

```javascript
var person = {
  name: "John",
  age: 30,
  greet: function() {
    return "Hello, " + this.name + "!";
  },
  celebrateBirthday: function() {
    this.age++;
    return "Happy Birthday! Now you are " + this.age + " years old.";
  }
};

console.log(person.greet()); // "Hello, John!"
console.log(person.celebrateBirthday()); // "Happy Birthday! Now you are 31 years old."
```

## this 关键字

在对象方法中，`this` 指向调用该方法的对象：

```javascript
var person = {
  name: "John",
  age: 30,
  greet: function() {
    return "Hello, " + this.name + "!";
  }
};

console.log(person.greet()); // "Hello, John!"

// 改变 this 指向
var anotherPerson = {
  name: "Jane",
  age: 25
};

// 使用 call 方法改变 this 指向
console.log(person.greet.call(anotherPerson)); // "Hello, Jane!"

// 使用 apply 方法改变 this 指向
console.log(person.greet.apply(anotherPerson)); // "Hello, Jane!"

// 使用 bind 方法创建新函数
var greetJane = person.greet.bind(anotherPerson);
console.log(greetJane()); // "Hello, Jane!"

// 注意：在全局作用域中，this 指向全局对象（浏览器中是 window）
function sayHello() {
  return "Hello, " + this.name + "!";
}
var name = "Global";
console.log(sayHello()); // "Hello, Global!"
```

## 对象遍历

### for...in 循环
使用`for...in`循环可以遍历对象的所有可枚举属性（包括继承的属性）：
```javascript
var person = { name: "John", age: 30, city: "New York" };

for (var key in person) {
  // 推荐使用 hasOwnProperty 检查是否为自有属性
  if (person.hasOwnProperty(key)) {
    console.log(key + ": " + person[key]);
  }
}
// 输出:
// name: John
// age: 30
// city: New York
```

### Object.keys()
`Object.keys()`方法返回对象所有自有可枚举属性的键数组：
```javascript
var person = { name: "John", age: 30, city: "New York" };
var keys = Object.keys(person);
console.log(keys); // ["name", "age", "city"]

// 使用 keys 遍历对象
keys.forEach(function(key) {
  console.log(key + ": " + person[key]);
});
```

## 对象复制

### 浅拷贝
浅拷贝只复制对象的表层属性，对于嵌套对象，只复制引用：

#### 方法1: 手动复制
```javascript
var person = { name: "John", age: 30, address: { city: "New York" } };
var shallowCopy = {};

for (var key in person) {
  if (person.hasOwnProperty(key)) {
    shallowCopy[key] = person[key];
  }
}
```

#### 方法2: Object.assign()
`Object.assign()`方法可以将多个源对象的属性复制到目标对象：
```javascript
var person = { name: "John", age: 30, address: { city: "New York" } };
var shallowCopy = Object.assign({}, person);

// 修改浅拷贝对象的嵌套属性会影响原对象
shallowCopy.address.city = "Boston";
console.log(person.address.city); // "Boston"
```

### 深拷贝
深拷贝会复制对象的所有层级，包括嵌套对象：

#### 方法1: JSON 序列化和反序列化
```javascript
var person = { name: "John", age: 30, address: { city: "New York" } };
var deepCopy = JSON.parse(JSON.stringify(person));

// 修改深拷贝对象的嵌套属性不会影响原对象
deepCopy.address.city = "Boston";
console.log(person.address.city); // "New York"
console.log(deepCopy.address.city); // "Boston"

// 注意: 此方法有局限性，不能处理函数、undefined等
```

#### 方法2: 手动递归复制
```javascript
function deepClone(obj) {
  // 处理null和非对象类型
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 创建新对象或数组
  var clone = Array.isArray(obj) ? [] : {};

  // 递归复制属性
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key]);
    }
  }

  return clone;
}

var person = { name: "John", age: 30, address: { city: "New York" } };
var deepCopy = deepClone(person);

deepCopy.address.city = "Boston";
console.log(person.address.city); // "New York"
console.log(deepCopy.address.city); // "Boston"
```

## 对象的属性描述符

属性描述符控制着属性的行为特性，包括：
- `value`: 属性的值
- `writable`: 是否可修改属性值
- `enumerable`: 是否可枚举（在for...in循环中可见）
- `configurable`: 是否可配置（是否可修改属性描述符或删除属性）

### 获取属性描述符
```javascript
var person = { name: "John", age: 30 };
var descriptor = Object.getOwnPropertyDescriptor(person, "name");
console.log(descriptor);
// 输出:
// {
//   value: "John",
//   writable: true,
//   enumerable: true,
//   configurable: true
// }
```

### 修改属性描述符
```javascript
var person = { name: "John", age: 30 };

// 修改属性描述符
Object.defineProperty(person, "name", {
  writable: false // 设为不可写
});

person.name = "Jane"; // 在严格模式下会抛出错误，非严格模式下无效
console.log(person.name); // "John"

// 定义新属性并设置描述符
Object.defineProperty(person, "id", {
  value: 123,
  writable: false,
  enumerable: false,
  configurable: false
});

console.log(person.id); // 123
for (var key in person) {
  console.log(key); // 只会输出 name 和 age，不会输出 id
}
```

## 对象的继承

JavaScript 使用原型继承，对象可以从其他对象继承属性和方法：

```javascript
// 父对象（原型）
var animal = {
  eat: function() {
    return "Eating...";
  }
};

// 子对象，继承自animal
var dog = Object.create(animal);
dog.bark = function() {
  return "Woof!";
};

console.log(dog.bark()); // "Woof!"
console.log(dog.eat()); // "Eating..." (继承自animal)

// 检查原型
console.log(Object.getPrototypeOf(dog) === animal); // true

// 构造函数方式实现继承
function Animal() {
  this.eat = function() {
    return "Eating...";
  };
}

function Dog() {
  this.bark = function() {
    return "Woof!";
  };
}

// 设置原型链
Dog.prototype = new Animal();

var dog2 = new Dog();
console.log(dog2.bark()); // "Woof!"
console.log(dog2.eat()); // "Eating..."
```

## 常用对象方法

ES5中常用的对象方法包括：

```javascript
// Object.keys() - 获取所有自有可枚举属性的键
var obj = {a: 1, b: 2};
console.log(Object.keys(obj)); // ["a", "b"]

// Object.assign() - 合并对象（注：ES5没有此方法，但可以自行实现）
function extend(target, source) {
  for (var key in source) {
    if (source.hasOwnProperty(key)) {
      target[key] = source[key];
    }
  }
  return target;
}

// Object.create() - 创建具有指定原型的对象
var proto = {greet: function() {return "Hello";}};
var obj = Object.create(proto);

// Object.defineProperty() - 定义或修改对象的属性
Object.defineProperty(obj, "name", {value: "John"});

// Object.getOwnPropertyDescriptor() - 获取属性描述符
var descriptor = Object.getOwnPropertyDescriptor(obj, "name");

// Object.freeze() - 冻结对象，防止修改
var frozenObj = Object.freeze({a: 1});
frozenObj.a = 2; // 无效

// Object.seal() - 密封对象，防止添加或删除属性，但可以修改现有属性
// 密封对象后，现有属性的可配置性被设置为false，但可写性保持不变
var sealedObj = Object.seal({a: 1});
console.log(Object.isSealed(sealedObj)); // true
sealedObj.a = 2; // 有效
console.log(sealedObj.a); // 2
sealedObj.b = 3; // 无效
console.log(sealedObj.b); // undefined

delete sealedObj.a; // 无效
console.log(sealedObj.a); // 2

// Object.preventExtensions() - 防止对象扩展，不能添加新属性
// 与seal不同，preventExtensions只阻止添加新属性，不影响现有属性的删除和修改
var nonExtensibleObj = Object.preventExtensions({a: 1});
console.log(Object.isExtensible(nonExtensibleObj)); // false
nonExtensibleObj.a = 2; // 有效
console.log(nonExtensibleObj.a); // 2
delete nonExtensibleObj.a; // 有效
console.log(nonExtensibleObj.a); // undefined
nonExtensibleObj.b = 3; // 无效
console.log(nonExtensibleObj.b); // undefined
```

## 对象保护方法对比

| 方法 | 能否添加新属性 | 能否删除现有属性 | 能否修改现有属性 | 能否修改属性描述符 |
|------|----------------|------------------|------------------|--------------------|
| `Object.freeze()` | 不能 | 不能 | 不能 | 不能 |
| `Object.seal()` | 不能 | 不能 | 能 | 不能 |
| `Object.preventExtensions()` | 不能 | 能 | 能 | 能 |

## 常见问题与解答

### Q: 什么是对象的深拷贝和浅拷贝，有什么区别？

**A:** 浅拷贝只复制对象的表层属性，对于嵌套对象只复制引用；深拷贝则复制对象的所有层级，包括嵌套对象。

```javascript
// 浅拷贝示例
var obj1 = {a: 1, b: {c: 2}};
var shallowCopy = {};
for (var key in obj1) {
  if (obj1.hasOwnProperty(key)) {
    shallowCopy[key] = obj1[key];
  }
}
shallowCopy.b.c = 3;
console.log(obj1.b.c); // 3 (原对象被修改)

// 深拷贝示例
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  var clone = Array.isArray(obj) ? [] : {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key]);
    }
  }
  return clone;
}
var obj2 = {a: 1, b: {c: 2}};
var deepCopy = deepClone(obj2);
deepCopy.b.c = 3;
console.log(obj2.b.c); // 2 (原对象未被修改)
```

### Q: 如何判断一个属性是否是对象的自有属性？

**A:** 使用`hasOwnProperty()`方法可以判断一个属性是否是对象的自有属性：

```javascript
var obj = {a: 1};
obj.hasOwnProperty('a'); // true
obj.hasOwnProperty('toString'); // false (toString是继承的方法)
```

### Q: 什么是原型链？它在JavaScript继承中起什么作用？

**A:** 原型链是JavaScript实现继承的机制。每个对象都有一个原型对象，原型对象也可以有自己的原型，形成一个链式结构。当访问对象的属性时，如果对象本身没有该属性，JavaScript会沿着原型链向上查找。

```javascript
var animal = {eat: function() {return "Eating";}};
var dog = Object.create(animal);
dog.bark = function() {return "Woof";};
console.log(dog.eat()); // "Eating" (从原型animal继承)
console.log(Object.getPrototypeOf(dog) === animal); // true
console.log(Object.getPrototypeOf(animal) === Object.prototype); // true
console.log(Object.getPrototypeOf(Object.prototype) === null); // true (原型链的末端)
```

### Q: 如何冻结一个对象使其不能被修改？

**A:** 使用`Object.freeze()`方法可以冻结对象，使其属性不能被修改、添加或删除：

```javascript
var obj = {a: 1, b: 2};
Object.freeze(obj);
obj.a = 3; // 无效
obj.c = 4; // 无效
delete obj.b; // 无效
console.log(obj); // {a: 1, b: 2}
```

### Q: 什么是属性描述符？它有什么作用？

**A:** 属性描述符是控制属性行为的元数据，包括`value`、`writable`、`enumerable`和`configurable`四个属性。通过属性描述符可以精细控制属性的行为，如是否可写、是否可枚举等。

```javascript
var obj = {a: 1};
// 获取属性描述符
var descriptor = Object.getOwnPropertyDescriptor(obj, 'a');
console.log(descriptor);
// 输出: {value: 1, writable: true, enumerable: true, configurable: true}

// 修改属性描述符
Object.defineProperty(obj, 'a', {
  writable: false
});
obj.a = 2; // 无效
console.log(obj.a); // 1
```