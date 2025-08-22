# 数组的扩展

ES6对数组进行了一系列扩展，增加了新的创建方法、遍历方法和操作方法，使得数组处理更加便捷和高效。本章将详细介绍这些扩展特性。

## 设计目标与核心价值

ES6数组扩展的设计目标是：

1. **简化创建**：提供更简洁的数组创建方法
2. **增强功能**：添加新的数组操作和遍历方法
3. **提高性能**：优化某些数组操作的性能
4. **改善开发体验**：提供更直观、更易用的API
5. **功能性**：支持更多高级数组操作场景

这些扩展的核心价值在于使开发者能够更高效地处理数组数据，减少样板代码，提高代码可读性和可维护性。

## 数组的新创建方法

### 1. Array.from()

将类数组对象或可迭代对象转换为真正的数组。

```javascript
// 转换类数组对象
const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
const arr1 = Array.from(arrayLike);
console.log(arr1); // ['a', 'b', 'c']

// 转换可迭代对象
const set = new Set(['a', 'b', 'c']);
const arr2 = Array.from(set);
console.log(arr2); // ['a', 'b', 'c']

// 转换字符串
const str = 'hello';
const arr3 = Array.from(str);
console.log(arr3); // ['h', 'e', 'l', 'l', 'o']

// 使用映射函数
const arr4 = Array.from([1, 2, 3], x => x * 2);
console.log(arr4); // [2, 4, 6]
```

### 2. Array.of()

创建一个包含所有参数的数组，解决`Array`构造函数的参数歧义问题。

```javascript
console.log(Array.of(1, 2, 3)); // [1, 2, 3]
console.log(Array.of(0)); // [0]

// 对比Array构造函数
console.log(Array(3)); // [empty × 3] (创建长度为3的空数组)
console.log(Array.of(3)); // [3] (创建包含元素3的数组)
```

## 数组的新方法

### 1. 数组实例的copyWithin()

将数组中的一部分元素复制到同一数组的另一个位置，不改变数组长度。

```javascript
const arr = [1, 2, 3, 4, 5];
// 将从索引3开始的元素复制到索引0开始的位置
console.log(arr.copyWithin(0, 3)); // [4, 5, 3, 4, 5]

// 将从索引1开始到索引3结束的元素复制到索引2开始的位置
const arr2 = [1, 2, 3, 4, 5];
console.log(arr2.copyWithin(2, 1, 3)); // [1, 2, 2, 3, 5]
```

### 2. 数组实例的find() 和 findIndex()

`find()` 返回数组中满足条件的第一个元素，`findIndex()` 返回满足条件的第一个元素的索引。

```javascript
const arr = [1, 2, 3, 4, 5];

// 查找第一个偶数
console.log(arr.find(x => x % 2 === 0)); // 2

// 查找第一个大于3的元素的索引
console.log(arr.findIndex(x => x > 3)); // 3

// 查找不存在的元素
console.log(arr.find(x => x > 10)); // undefined
console.log(arr.findIndex(x => x > 10)); // -1
```

### 3. 数组实例的fill()

用指定的值填充数组，可以指定起始和结束位置。

```javascript
// 填充整个数组
const arr1 = [1, 2, 3, 4, 5];
console.log(arr1.fill(0)); // [0, 0, 0, 0, 0]

// 从索引2开始填充
const arr2 = [1, 2, 3, 4, 5];
console.log(arr2.fill(0, 2)); // [1, 2, 0, 0, 0]

// 从索引1开始到索引3结束填充
const arr3 = [1, 2, 3, 4, 5];
console.log(arr3.fill(0, 1, 3)); // [1, 0, 0, 4, 5]
```

### 4. 数组实例的entries()、keys() 和 values()

这些方法返回数组的迭代器，用于遍历数组的键、值或键值对。

```javascript
const arr = ['a', 'b', 'c'];

// 遍历键值对
for (const [index, value] of arr.entries()) {
  console.log(`${index}: ${value}`);
}
// 输出:
// 0: a
// 1: b
// 2: c

// 遍历键
for (const index of arr.keys()) {
  console.log(index);
}
// 输出:
// 0
// 1
// 2

// 遍历值
for (const value of arr.values()) {
  console.log(value);
}
// 输出:
// a
// b
// c
```

### 5. 数组实例的includes()

判断数组是否包含指定元素，返回布尔值。

```javascript
const arr = [1, 2, 3, 4, 5];
console.log(arr.includes(3)); // true
console.log(arr.includes(6)); // false
console.log(arr.includes(2, 2)); // false (从索引2开始查找)

// 与indexOf()的区别：includes()可以正确处理NaN
const arr2 = [1, 2, NaN, 4, 5];
console.log(arr2.includes(NaN)); // true
console.log(arr2.indexOf(NaN)); // -1 (indexOf()无法正确处理NaN)
```

### 6. 数组实例的flat() 和 flatMap()

`flat()` 将嵌套数组扁平化，可以指定扁平化的深度。`flatMap()` 先对数组中的每个元素应用映射函数，然后将结果扁平化。

```javascript
// 扁平化一维数组
const arr1 = [1, 2, [3, 4], 5];
console.log(arr1.flat()); // [1, 2, 3, 4, 5]

// 扁平化二维数组
const arr2 = [1, 2, [3, [4, 5]], 6];
console.log(arr2.flat(2)); // [1, 2, 3, 4, 5, 6]

// 使用flatMap()
const arr3 = [1, 2, 3];
console.log(arr3.flatMap(x => [x, x * 2])); // [1, 2, 2, 4, 3, 6]
```

### 7. 数组实例的at()

根据索引获取数组元素，支持负索引（从数组末尾开始计数）。

```javascript
const arr = [1, 2, 3, 4, 5];
console.log(arr.at(0)); // 1
console.log(arr.at(2)); // 3
console.log(arr.at(-1)); // 5 (相当于arr[arr.length - 1])
console.log(arr.at(-2)); // 4 (相当于arr[arr.length - 2])
console.log(arr.at(10)); // undefined (超出范围返回undefined)
```

## 数组的空位处理

ES6对数组空位的处理进行了统一，大多数新方法会将空位视为`undefined`。

```javascript
const arr = [1, , 3, , 5];

// forEach() 会跳过空位
arr.forEach(x => console.log(x)); // 1, 3, 5

// map() 会跳过空位，但保留位置
console.log(arr.map(x => x * 2)); // [2, empty, 6, empty, 10]

// filter() 会过滤掉空位
console.log(arr.filter(x => x)); // [1, 3, 5]

// includes() 不会跳过空位
console.log(arr.includes(undefined)); // true

// entries() 会将空位视为undefined
for (const [index, value] of arr.entries()) {
  console.log(`${index}: ${value}`);
}
// 输出:
// 0: 1
// 1: undefined
// 2: 3
// 3: undefined
// 4: 5
```

## 注意事项与最佳实践

### 1. 避免使用数组空位

数组空位可能导致不一致的行为，建议使用`undefined`或`null`明确表示空值。

```javascript
// 不推荐
const arr1 = [1, , 3];

// 推荐
const arr2 = [1, undefined, 3];
const arr3 = [1, null, 3];
```

### 2. 选择合适的遍历方法

根据需求选择合适的数组遍历方法：

- 不需要返回新数组：使用`forEach()`
- 需要返回新数组：使用`map()`
- 需要过滤元素：使用`filter()`
- 需要查找元素：使用`find()`或`findIndex()`
- 需要遍历键值对：使用`entries()`

### 3. 利用解构赋值处理数组

结合解构赋值可以更简洁地处理数组。

```javascript
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(second); // 2
console.log(rest); // [3, 4, 5]
```

### 4. 链式调用

许多数组方法返回数组本身，可以进行链式调用。

```javascript
const result = [1, 2, 3, 4, 5]
  .filter(x => x % 2 === 0)
  .map(x => x * 2)
  .reduce((sum, x) => sum + x, 0);
console.log(result); // 12 (2*2 + 4*2 = 4 + 8 = 12)
```

### 5. 性能考虑

- 对于大型数组，避免多次遍历
- 考虑使用`for`循环代替高阶函数以提高性能
- 对于需要频繁操作的数组，考虑使用其他数据结构（如`Set`或`Map`）

## 总结

### 核心要点回顾

1. ES6提供了`Array.from()`和`Array.of()`方法，增强了数组创建能力
2. 新增了`find()`、`findIndex()`、`includes()`等方法，改善了数组查找能力
3. 添加了`flat()`和`flatMap()`方法，支持数组扁平化
4. 提供了`entries()`、`keys()`和`values()`方法，增强了数组遍历能力
5. 统一了数组空位的处理方式

### 主要优势

1. **更简洁的API**：减少样板代码，提高开发效率
2. **更强大的功能**：支持更多高级数组操作
3. **更好的一致性**：统一了数组方法的行为
4. **更灵活的遍历**：提供多种遍历方式满足不同需求

### 实践建议

1. 充分利用新增方法简化数组操作
2. 避免使用数组空位，使用`undefined`或`null`代替
3. 根据需求选择合适的数组方法，避免不必要的性能消耗
4. 结合解构赋值和扩展运算符，写出更简洁的代码
5. 注意数组方法的兼容性，在旧环境中可能需要使用polyfill

ES6的数组扩展使JavaScript数组操作更加便捷和强大。掌握这些新特性可以帮助你更高效地处理数组数据，编写更简洁、更可读的代码。