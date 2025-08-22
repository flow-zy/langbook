# Iterator 和 for...of 循环

ES6引入了Iterator（迭代器）和for...of循环，为遍历各种数据结构提供了一种统一的方式。Iterator是一种接口，为各种不同的数据结构提供统一的访问机制，而for...of循环则是基于Iterator的一种便捷遍历语法。本章将详细介绍Iterator和for...of循环的特性和使用方法。

## 设计目标与核心价值

Iterator的设计目标是：

1. **提供统一的遍历接口**：为不同的数据结构（数组、对象、集合等）提供统一的遍历方式
2. **分离数据结构和遍历逻辑**：使数据结构的实现与遍历逻辑解耦
3. **支持懒加载**：迭代器可以在需要时才生成下一个值，适合处理大型数据集
4. **为for...of循环提供支持**：作为for...of循环的底层实现机制

Iterator的核心价值在于它提供了一种标准化的方式来访问数据结构中的元素，无论数据结构的内部实现如何。

## Iterator的基本概念

### 1. 迭代器协议

迭代器协议定义了一种标准的方式来产生一个有限或无限序列的值。一个对象要成为迭代器，必须实现一个`next()`方法，该方法返回一个包含`done`和`value`两个属性的对象：

- `done`：布尔值，表示迭代是否结束
- `value`：当前迭代的值，当`done`为`true`时可选

### 2. 可迭代协议

可迭代协议定义了对象如何成为可迭代对象。一个对象要成为可迭代对象，必须实现一个`[Symbol.iterator]`方法，该方法返回一个迭代器。

## 内置可迭代对象

ES6中许多内置数据结构都实现了可迭代协议，包括：

- 数组（Array）
- 字符串（String）
- 集合（Set）
- 映射（Map）
- arguments对象
- NodeList等DOM集合类型

## Iterator的基本用法

### 1. 获取迭代器

可以通过调用对象的`[Symbol.iterator]()`方法来获取迭代器：

```javascript
// 数组是可迭代对象
const array = [1, 2, 3];
const iterator = array[Symbol.iterator]();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

### 2. 迭代器的遍历

使用迭代器的`next()`方法可以逐个访问元素：

```javascript
const string = 'hello';
const iterator = string[Symbol.iterator]();

let result = iterator.next();
while (!result.done) {
  console.log(result.value);
  result = iterator.next();
}
// 输出: h e l l o
```

## for...of 循环

### 1. 基本用法

for...of循环是遍历可迭代对象的便捷语法：

```javascript
// 遍历数组
const array = [1, 2, 3];
for (const item of array) {
  console.log(item);
}
// 输出: 1 2 3

// 遍历字符串
const string = 'hello';
for (const char of string) {
  console.log(char);
}
// 输出: h e l l o

// 遍历Set
const set = new Set([1, 2, 3]);
for (const item of set) {
  console.log(item);
}
// 输出: 1 2 3

// 遍历Map
const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
for (const [key, value] of map) {
  console.log(`${key}: ${value}`);
}
// 输出: a: 1 b: 2 c: 3
```

### 2. 与其他遍历方式的比较

- **for循环**：需要手动管理索引，代码冗长
- **forEach()**：无法中途跳出循环
- **for...in循环**：遍历的是对象的键名，且会遍历原型链上的属性
- **for...of循环**：遍历的是对象的值，且不会遍历原型链上的属性，可以使用break、continue等控制语句

```javascript
// for循环
const array = [1, 2, 3];
for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}

// forEach()
array.forEach(item => console.log(item));

// for...in循环
for (const index in array) {
  console.log(array[index]);
}

// for...of循环
for (const item of array) {
  console.log(item);
  if (item === 2) break; // 可以中途跳出循环
}
```

## 自定义迭代器

### 1. 为对象添加迭代器

可以为自定义对象添加`[Symbol.iterator]`方法，使其成为可迭代对象：

```javascript
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

for (const item of obj) {
  console.log(item);
}
// 输出: 1 2 3
```

### 2. 生成器函数与迭代器

可以使用生成器函数（Generator）来创建迭代器，简化迭代器的实现：

```javascript
function* createIterator(array) {
  for (const item of array) {
    yield item;
  }
}

const iterator = createIterator([1, 2, 3]);
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }

// 也可以直接为对象添加生成器方法
const obj = {
  data: [1, 2, 3],
  *[Symbol.iterator]() {
    for (const item of this.data) {
      yield item;
    }
  }
};

for (const item of obj) {
  console.log(item);
}
// 输出: 1 2 3
```

## 迭代器的应用场景

### 1. 处理大型数据集

迭代器的懒加载特性使其适合处理大型数据集：

```javascript
// 生成无限序列的迭代器
function* infiniteSequence() {
  let num = 0;
  while (true) {
    yield num++;
  }
}

const iterator = infiniteSequence();
console.log(iterator.next().value); // 0
console.log(iterator.next().value); // 1
console.log(iterator.next().value); // 2
// 可以根据需要获取任意多个值
```

### 2. 实现自定义数据结构

迭代器可以用于实现自定义数据结构，如链表、树等：

```javascript
// 链表实现
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  add(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
  }

  *[Symbol.iterator]() {
    let current = this.head;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }
}

const list = new LinkedList();
list.add(1);
list.add(2);
list.add(3);

for (const item of list) {
  console.log(item);
}
// 输出: 1 2 3
```

### 3. 异步迭代

虽然Iterator本身是同步的，但可以结合Promise实现异步迭代（Async Iterator）：

```javascript
// 异步迭代器（简化版）
const asyncIterator = {
  [Symbol.asyncIterator]() {
    let index = 0;
    const data = [1, 2, 3];
    return {
      next: () => {
        return new Promise(resolve => {
          setTimeout(() => {
            if (index < data.length) {
              resolve({ value: data[index++], done: false });
            } else {
              resolve({ value: undefined, done: true });
            }
          }, 1000);
        });
      }
    };
  }
};

// 使用for await...of循环遍历
async function iterateAsync() {
  for await (const item of asyncIterator) {
    console.log(item);
  }
}

iterateAsync();
// 每隔1秒输出: 1 2 3
```

## 注意事项与最佳实践

### 1. 迭代器的一次性

迭代器通常是一次性的，遍历完成后需要重新获取迭代器：

```javascript
const array = [1, 2, 3];
const iterator = array[Symbol.iterator]();

// 第一次遍历
for (let result = iterator.next(); !result.done; result = iterator.next()) {
  console.log(result.value);
}
// 输出: 1 2 3

// 再次尝试遍历，将不会有输出
for (let result = iterator.next(); !result.done; result = iterator.next()) {
  console.log(result.value);
}

// 需要重新获取迭代器
const newIterator = array[Symbol.iterator]();
```

### 2. 避免修改正在遍历的集合

在使用for...of循环遍历集合时，最好避免修改集合，否则可能导致意外结果：

```javascript
const array = [1, 2, 3];
for (const item of array) {
  console.log(item);
  if (item === 2) {
    array.push(4); // 不推荐：在遍历过程中修改集合
  }
}
// 输出: 1 2 3 4 (取决于JavaScript引擎的实现)
```

### 3. 处理不可迭代对象

对于不可迭代对象，可以使用`Object.keys()`、`Object.values()`或`Object.entries()`方法将其转换为可迭代对象：

```javascript
const obj = { a: 1, b: 2, c: 3 };

// 遍历键
for (const key of Object.keys(obj)) {
  console.log(key);
}
// 输出: a b c

// 遍历值
for (const value of Object.values(obj)) {
  console.log(value);
}
// 输出: 1 2 3

// 遍历键值对
for (const [key, value] of Object.entries(obj)) {
  console.log(`${key}: ${value}`);
}
// 输出: a: 1 b: 2 c: 3
```

### 4. 与展开运算符结合使用

可迭代对象可以与展开运算符（`...`）结合使用，将其转换为数组：

```javascript
const set = new Set([1, 2, 3]);
const array = [...set];
console.log(array); // [1, 2, 3]

const string = 'hello';
const chars = [...string];
console.log(chars); // ['h', 'e', 'l', 'l', 'o']
```

## 总结

### 核心要点回顾

1. Iterator是一种接口，为不同的数据结构提供统一的访问机制
2. 可迭代对象必须实现`[Symbol.iterator]`方法，返回一个迭代器
3. 迭代器必须实现`next()`方法，返回包含`done`和`value`的对象
4. for...of循环是基于Iterator的便捷遍历语法
5. 可以通过生成器函数简化迭代器的实现
6. Iterator适用于处理大型数据集、实现自定义数据结构等场景

### 主要优势

1. **统一的遍历接口**：为不同的数据结构提供一致的遍历方式
2. **分离数据结构和遍历逻辑**：使代码更加清晰和可维护
3. **支持懒加载**：适合处理大型数据集
4. **简洁的语法**：for...of循环比传统的for循环更加简洁
5. **与其他ES6特性良好集成**：如展开运算符、解构赋值等

### 实践建议

1. 优先使用for...of循环遍历可迭代对象，提高代码的可读性
2. 为自定义数据结构实现迭代器接口，使其支持for...of循环
3. 利用生成器函数简化迭代器的实现
4. 注意迭代器的一次性特性，避免重复使用已遍历完成的迭代器
5. 避免在遍历过程中修改集合，以免导致意外结果
6. 对于不可迭代对象，可以使用Object.keys()等方法将其转换为可迭代对象

Iterator和for...of循环是ES6中引入的重要特性，它们为JavaScript提供了更统一、更简洁的遍历机制。掌握Iterator和for...of循环的使用，可以帮助你编写更清晰、更高效的代码。