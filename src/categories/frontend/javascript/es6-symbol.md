# Symbol

ES6引入了一种新的原始数据类型`Symbol`，表示独一无二的值。它是JavaScript的第七种数据类型，与`undefined`、`null`、`Number`、`String`、`Boolean`和`Object`并列。本章将详细介绍Symbol的特性和使用方法。

## 设计目标与核心价值

Symbol的设计目标是：

1. **避免属性名冲突**：创建独一无二的属性标识符
2. **定义私有属性**：提供一种实现对象私有属性的机制
3. **扩展对象行为**：通过内置Symbol值自定义对象的行为
4. **语义化标识**：为代码提供更清晰的语义

Symbol的核心价值在于解决了对象属性名冲突的问题，同时为JavaScript提供了一种模拟私有属性的方式。

## Symbol的基本用法

### 1. 创建Symbol

使用`Symbol()`函数创建Symbol值，可以传入一个字符串作为描述。

```javascript
// 创建基本Symbol
const s1 = Symbol();
console.log(typeof s1); // 'symbol'

// 创建带描述的Symbol
const s2 = Symbol('description');
console.log(s2.toString()); // 'Symbol(description)'

// 相同描述的Symbol也是不同的
const s3 = Symbol('description');
console.log(s2 === s3); // false
```

### 2. Symbol.for() 和 Symbol.keyFor()

`Symbol.for()` 用于创建或查找已存在的Symbol，`Symbol.keyFor()` 用于获取Symbol的描述。

```javascript
// 创建共享Symbol
const s1 = Symbol.for('shared');
const s2 = Symbol.for('shared');
console.log(s1 === s2); // true

// 获取Symbol的描述
console.log(Symbol.keyFor(s1)); // 'shared'

// 普通Symbol没有登记机制
const s3 = Symbol('not-shared');
console.log(Symbol.keyFor(s3)); // undefined
```

### 3. 作为对象属性名

Symbol最主要的用途是作为对象的属性名，避免属性名冲突。

```javascript
const sym = Symbol('id');

// 使用Symbol作为属性名
const obj = {
  [sym]: 123
};

// 访问Symbol属性
console.log(obj[sym]); // 123

// 遍历对象的Symbol属性
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(id)]
console.log(Reflect.ownKeys(obj)); // [Symbol(id)]
```

### 4. 定义常量

使用Symbol定义常量，可以避免常量值冲突。

```javascript
// 使用Symbol定义常量
const COLOR_RED = Symbol('red');
const COLOR_GREEN = Symbol('green');
const COLOR_BLUE = Symbol('blue');

// 使用常量
function getColor(color) {
  switch (color) {
    case COLOR_RED:
      return '红色';
    case COLOR_GREEN:
      return '绿色';
    case COLOR_BLUE:
      return '蓝色';
    default:
      return '未知颜色';
  }
}

console.log(getColor(COLOR_RED)); // '红色'
```

## Symbol的特性

### 1. 唯一性

每个Symbol值都是唯一的，即使描述相同也不相等。

```javascript
const s1 = Symbol('same');
const s2 = Symbol('same');
console.log(s1 === s2); // false
```

### 2. 不可枚举性

Symbol属性不会被`for...in`、`Object.keys()`、`Object.values()`和`Object.entries()`遍历到。

```javascript
const sym = Symbol('id');
const obj = {
  name: 'John',
  [sym]: 123
};

// 不会遍历到Symbol属性
for (const key in obj) {
  console.log(key); // 'name'
}

console.log(Object.keys(obj)); // ['name']
console.log(Object.values(obj)); // ['John']
console.log(Object.entries(obj)); // [['name', 'John']]

// 可以通过Object.getOwnPropertySymbols()获取
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(id)]
```

### 3. 不可变性

Symbol值不能被修改或重新赋值。

```javascript
const sym = Symbol('id');
sym = Symbol('new-id'); // 报错
```

## 内置Symbol值

ES6提供了一些内置Symbol值，用于定制对象的行为。

### 1. Symbol.iterator

对象的`Symbol.iterator`属性指向该对象的默认迭代器方法。

```javascript
// 自定义迭代器
const obj = {
  data: [1, 2, 3],
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.data.length) {
          return { value: this.data[index++], done: false };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
};

// 使用for...of遍历
for (const item of obj) {
  console.log(item); // 1, 2, 3
}
```

### 2. Symbol.toStringTag

对象的`Symbol.toStringTag`属性用于定制`Object.prototype.toString()`方法的返回值。

```javascript
const obj = {
  [Symbol.toStringTag]: 'MyObject'
};

console.log(Object.prototype.toString.call(obj)); // '[object MyObject]'
```

### 3. Symbol.hasInstance

对象的`Symbol.hasInstance`属性用于判断一个对象是否为该构造函数的实例。

```javascript
class MyClass {
  static [Symbol.hasInstance](instance) {
    return instance instanceof Array;
  }
}

console.log([] instanceof MyClass); // true
console.log({} instanceof MyClass); // false
```

### 4. 其他内置Symbol值

- `Symbol.isConcatSpreadable`：控制数组的`concat()`方法是否展开数组
- `Symbol.match`：控制对象是否能被`String.prototype.match()`方法匹配
- `Symbol.replace`：控制对象是否能被`String.prototype.replace()`方法替换
- `Symbol.search`：控制对象是否能被`String.prototype.search()`方法搜索
- `Symbol.split`：控制对象是否能被`String.prototype.split()`方法分割
- `Symbol.toPrimitive`：控制对象转换为原始类型的值的行为

## 注意事项与最佳实践

### 1. Symbol的使用场景

- 作为对象的唯一属性标识符
- 定义不会被意外覆盖的常量
- 实现对象的私有属性（虽然不是真正的私有，但可以避免被意外访问）
- 自定义对象的行为（使用内置Symbol值）

### 2. 注意事项

- Symbol值不能与其他类型的值进行运算
- Symbol值可以显式转换为字符串或布尔值，但不能转换为数值
- Symbol属性不会被JSON.stringify()序列化

```javascript
const sym = Symbol('id');
const obj = {
  name: 'John',
  [sym]: 123
};

console.log(JSON.stringify(obj)); // '{"name":"John"}' (不包含Symbol属性)
```

### 3. 模拟私有属性

虽然JavaScript没有真正的私有属性，但可以使用Symbol模拟。

```javascript
const _private = Symbol('private');

class MyClass {
  constructor() {
    this[_private] = '私有属性值';
  }

  getPrivate() {
    return this[_private];
  }
}

const instance = new MyClass();
console.log(instance.getPrivate()); // '私有属性值'
console.log(instance[_private]); // '私有属性值' (仍然可以访问，但不太可能被意外覆盖)
```

### 4. 性能考虑

- Symbol属性的访问速度与普通属性相当
- 使用`Symbol.for()`创建的共享Symbol会被全局登记，可能影响性能
- 避免过度使用Symbol，只在必要时使用

## 总结

### 核心要点回顾

1. Symbol是一种新的原始数据类型，表示独一无二的值
2. 使用`Symbol()`函数创建Symbol值，`Symbol.for()`创建共享Symbol
3. Symbol主要用作对象的属性名，避免属性名冲突
4. Symbol属性具有不可枚举性，不会被常规遍历方法遍历到
5. ES6提供了一系列内置Symbol值，用于定制对象的行为

### 主要优势

1. **避免属性名冲突**：确保对象属性的唯一性
2. **模拟私有属性**：提供一种实现对象私有属性的机制
3. **扩展对象行为**：通过内置Symbol值自定义对象的行为
4. **语义化标识**：为代码提供更清晰的语义

### 实践建议

1. 在需要确保属性唯一性的场景中使用Symbol
2. 合理使用`Symbol.for()`和`Symbol.keyFor()`管理共享Symbol
3. 利用Symbol模拟对象的私有属性
4. 了解并合理使用内置Symbol值定制对象的行为
5. 注意Symbol的不可枚举性和序列化特性

Symbol的引入为JavaScript带来了新的特性和可能性，特别是在避免属性名冲突和模拟私有属性方面。掌握Symbol的使用可以帮助你编写更健壮、更可维护的代码。