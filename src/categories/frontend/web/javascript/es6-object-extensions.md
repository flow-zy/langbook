# 对象的扩展

ES6对对象进行了一系列扩展，增加了新的语法特性和方法，使得对象的创建、操作和管理更加便捷和灵活。本章将详细介绍这些扩展特性。

## 设计目标与核心价值

ES6对象扩展的设计目标是：

1. **简化语法**：提供更简洁的对象字面量语法
2. **增强功能**：添加新的对象操作方法
3. **提高灵活性**：支持动态属性名和更灵活的属性定义
4. **改善开发体验**：提供更直观、更易用的API
5. **性能优化**：优化对象的某些操作

这些扩展的核心价值在于提高开发效率，减少样板代码，同时增强对象的功能和灵活性。

## 对象字面量的扩展

### 1. 属性的简洁表示法

ES6允许在对象字面量中直接写入变量和函数，作为对象的属性和方法。

```javascript
// 传统方式
const name = 'John';
const age = 30;
const person1 = {
  name: name,
  age: age,
  sayHello: function() {
    console.log(`Hello, my name is ${this.name}`);
  }
};

// ES6简洁表示法
const name = 'John';
const age = 30;
const person2 = {
  name,
  age,
  sayHello() {
    console.log(`Hello, my name is ${this.name}`);
  }
};

console.log(person2.name); // 'John'
console.log(person2.age); // 30
person2.sayHello(); // 'Hello, my name is John'
```

### 2. 属性名表达式

ES6允许使用表达式作为对象的属性名，需要将表达式放在方括号`[]`中。

```javascript
// 基本用法
const propName = 'name';
const person = {
  [propName]: 'John',
  ['age']: 30,
  ['say' + 'Hello']() {
    console.log(`Hello, my name is ${this.name}`);
  }
};

console.log(person.name); // 'John'
console.log(person.age); // 30
person.sayHello(); // 'Hello, my name is John'

// 动态计算属性名
const prefix = 'user_';
const user = {
  [prefix + 'name']: 'Alice',
  [prefix + 'id']: 12345
};

console.log(user.user_name); // 'Alice'
console.log(user.user_id); // 12345
```

### 3. 方法的name属性

函数的`name`属性也适用于对象的方法，返回方法的名称。

```javascript
const person = {
  sayHello() {
    console.log('Hello');
  }
};

console.log(person.sayHello.name); // 'sayHello'

// getter和setter的name属性
const obj = {
  get foo() { return 'foo'; },
  set bar(value) { this._bar = value; }
};

console.log(obj.__lookupGetter__('foo').name); // 'get foo'
console.log(obj.__lookupSetter__('bar').name); // 'set bar'
```

## 对象的新方法

### 1. Object.is()

判断两个值是否严格相等，与`===`类似，但处理了一些特殊情况。

```javascript
console.log(Object.is(1, 1)); // true
console.log(Object.is(1, '1')); // false
console.log(Object.is(NaN, NaN)); // true (===返回false)
console.log(Object.is(+0, -0)); // false (===返回true)
```

### 2. Object.assign()

将多个源对象的属性复制到目标对象。

```javascript
// 基本用法
const target = { a: 1 };
const source1 = { b: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
console.log(target); // { a: 1, b: 2, c: 3 }

// 覆盖属性
const target2 = { a: 1 };
const source3 = { a: 2, b: 3 };

Object.assign(target2, source3);
console.log(target2); // { a: 2, b: 3 }

// 浅复制
const obj = { a: 1, b: { c: 2 } };
const copy = Object.assign({}, obj);
obj.b.c = 3;
console.log(copy.b.c); // 3 (跟着变化)
```

### 3. Object.getOwnPropertyDescriptors()

获取对象所有自身属性的描述符。

```javascript
const obj = {
  name: 'John',
  get age() { return 30; }
};

const descriptors = Object.getOwnPropertyDescriptors(obj);
console.log(descriptors.name);
// 输出:
// {
//   value: 'John',
//   writable: true,
//   enumerable: true,
//   configurable: true
// }

console.log(descriptors.age);
// 输出:
// {
//   get: [Function: get age],
//   set: undefined,
//   enumerable: true,
//   configurable: true
// }
```

### 4. Object.setPrototypeOf() 和 Object.getPrototypeOf()

`Object.setPrototypeOf()` 设置对象的原型，`Object.getPrototypeOf()` 获取对象的原型。

```javascript
const obj = { name: 'John' };
const proto = { sayHello() { console.log(`Hello, ${this.name}`); } };

Object.setPrototypeOf(obj, proto);
obj.sayHello(); // 'Hello, John'
console.log(Object.getPrototypeOf(obj) === proto); // true
```

### 5. Object.keys()、Object.values() 和 Object.entries()

这些方法返回对象的键、值或键值对数组，便于遍历对象。

```javascript
const obj = { a: 1, b: 2, c: 3 };

console.log(Object.keys(obj)); // ['a', 'b', 'c']
console.log(Object.values(obj)); // [1, 2, 3]
console.log(Object.entries(obj)); // [['a', 1], ['b', 2], ['c', 3]]

// 遍历对象
for (const [key, value] of Object.entries(obj)) {
  console.log(`${key}: ${value}`);
}
// 输出:
// a: 1
// b: 2
// c: 3
```

### 6. Object.fromEntries()

将键值对数组转换为对象，与`Object.entries()`相反。

```javascript
const entries = [['a', 1], ['b', 2], ['c', 3]];
const obj = Object.fromEntries(entries);
console.log(obj); // { a: 1, b: 2, c: 3 }

// 实际应用：将URL参数转换为对象
const paramsString = 'name=John&age=30&city=New+York';
const params = new URLSearchParams(paramsString);
const paramsObj = Object.fromEntries(params);
console.log(paramsObj); // { name: 'John', age: '30', city: 'New York' }
```

## 属性的可枚举性和遍历

### 1. 可枚举性

每个对象属性都有一个`enumerable`特性，表示该属性是否可枚举。

```javascript
const obj = {
  a: 1,
  b: 2
};

// 设置属性为不可枚举
Object.defineProperty(obj, 'c', {
  value: 3,
  enumerable: false
});

console.log(Object.keys(obj)); // ['a', 'b'] (不包含c)
console.log(Object.values(obj)); // [1, 2] (不包含3)

// 检查属性是否可枚举
console.log(Object.getOwnPropertyDescriptor(obj, 'a').enumerable); // true
console.log(Object.getOwnPropertyDescriptor(obj, 'c').enumerable); // false
```

### 2. 属性遍历的方法

ES6提供了多种遍历对象属性的方法：

- `for...in`：遍历对象自身和继承的可枚举属性（不包括Symbol属性）
- `Object.keys()`：返回对象自身的可枚举属性键数组（不包括Symbol属性）
- `Object.values()`：返回对象自身的可枚举属性值数组（不包括Symbol属性）
- `Object.entries()`：返回对象自身的可枚举属性键值对数组（不包括Symbol属性）
- `Object.getOwnPropertyNames()`：返回对象自身的所有属性键数组（包括不可枚举属性，不包括Symbol属性）
- `Object.getOwnPropertySymbols()`：返回对象自身的所有Symbol属性键数组
- `Reflect.ownKeys()`：返回对象自身的所有属性键数组（包括不可枚举属性和Symbol属性）

```javascript
const obj = {
  a: 1,
  b: 2
};

// 添加Symbol属性
const sym = Symbol('c');
obj[sym] = 3;

// 设置不可枚举属性
Object.defineProperty(obj, 'd', {
  value: 4,
  enumerable: false
});

console.log(Object.keys(obj)); // ['a', 'b']
console.log(Object.getOwnPropertyNames(obj)); // ['a', 'b', 'd']
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(c)]
console.log(Reflect.ownKeys(obj)); // ['a', 'b', 'd', Symbol(c)]
```

## 扩展运算符在对象中的应用

扩展运算符（`...`）可以用于对象，实现对象的复制和合并。

```javascript
// 对象复制
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1 };
console.log(obj2); // { a: 1, b: 2 }

// 对象合并
const obj3 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj3 };
console.log(merged); // { a: 1, b: 2, c: 3, d: 4 }

// 覆盖属性
const obj4 = { a: 100, e: 5 };
const merged2 = { ...obj1, ...obj4 };
console.log(merged2); // { a: 100, b: 2, e: 5 }

// 复制可枚举属性
const obj5 = {};
Object.defineProperty(obj5, 'f', {
  value: 6,
  enumerable: false
});
const obj6 = { ...obj5 };
console.log(obj6); // {} (不包含不可枚举属性f)
```

## 注意事项与最佳实践

### 1. 对象属性的简洁表示法

- 优先使用简洁表示法，减少样板代码
- 注意简洁表示法与传统表示法的区别

### 2. 属性名表达式的使用

- 对于动态属性名，使用属性名表达式
- 对于静态属性名，优先使用字面量表示法

### 3. Object.assign()的注意事项

- `Object.assign()`是浅复制，对于嵌套对象需要特别注意
- 目标对象的同名属性会被源对象覆盖
- 只有源对象的可枚举属性会被复制

### 4. 原型操作的谨慎使用

- 尽量避免使用`Object.setPrototypeOf()`，因为它会影响性能
- 优先使用`Object.create()`创建具有指定原型的对象

### 5. 属性遍历的选择

根据需求选择合适的属性遍历方法：

- 仅遍历自身可枚举属性：使用`Object.keys()`、`Object.values()`或`Object.entries()`
- 遍历自身所有属性（包括不可枚举）：使用`Object.getOwnPropertyNames()`
- 遍历自身所有Symbol属性：使用`Object.getOwnPropertySymbols()`
- 遍历自身所有属性（包括不可枚举和Symbol）：使用`Reflect.ownKeys()`

## 总结

### 核心要点回顾

1. 对象字面量支持简洁表示法和属性名表达式
2. 添加了`Object.is()`、`Object.assign()`等新方法
3. 提供了`Object.keys()`、`Object.values()`和`Object.entries()`等遍历方法
4. 扩展运算符可以用于对象的复制和合并
5. 增强了对属性可枚举性的控制和遍历能力

### 主要优势

1. **更简洁的语法**：减少样板代码，提高开发效率
2. **更灵活的属性定义**：支持动态属性名
3. **更强大的对象操作**：新增的方法增强了对象操作能力
4. **更好的遍历支持**：多种遍历方法满足不同需求

### 实践建议

1. 优先使用简洁表示法定义对象属性和方法
2. 合理使用属性名表达式处理动态属性
3. 注意`Object.assign()`的浅复制特性
4. 根据需求选择合适的属性遍历方法
5. 谨慎使用原型操作方法，避免性能问题

ES6的对象扩展使JavaScript对象操作更加便捷、灵活和强大。掌握这些新特性可以帮助你编写更简洁、更高效的代码，同时更好地理解和控制对象的行为。