# 剩余参数与展开运算符

剩余参数（Rest Parameters）和展开运算符（Spread Operator）是ES6引入的两个强大特性，它们都使用`...`语法，但用途截然不同。剩余参数用于将函数的多个参数收集**合并**为一个数组，而展开运算符则用于将数组或对象**分解**为多个元素。这两个特性极大地简化了JavaScript中的数据处理和函数调用。

## 核心概念对比

| 特性 | 语法 | 作用 | 应用场景 |
|------|------|------|----------|
| 剩余参数 | `...args` | 收集多个参数为数组 | 函数参数处理 |
| 展开运算符 | `...iterable` | 将可迭代对象展开为多个元素 | 数组/对象操作、函数调用 |

## 剩余参数

剩余参数允许我们将函数的多个参数收集合并为一个数组，使我们能够灵活处理不定数量的参数。

### 基本语法

剩余参数的语法是在函数参数列表的最后一个参数前添加 `...` 前缀：

```javascript
function sum(...numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15
```

在上面的例子中，`...numbers` 会收集所有传入的参数并将它们存储在一个名为 `numbers` 的数组中。我们可以使用任何数组方法来处理这些参数。

### 与普通参数结合使用

剩余参数可以与普通参数结合使用，收集除前面参数外的所有剩余参数：

```javascript
function greet(greeting, ...names) {
  return `${greeting}, ${names.join(', ')}!`;
}

console.log(greet('Hello', 'Alice', 'Bob', 'Charlie')); // "Hello, Alice, Bob, Charlie!"
```

### 与 arguments 的区别

在ES5中，我们通常使用`arguments`对象来访问函数的所有参数，但剩余参数提供了更现代、更简洁的方式来处理不定数量的参数。以下是它们的主要区别：

| 特性 | arguments 对象 | 剩余参数 |
|------|---------------|----------|
| 类型 | 类数组对象（不是真正的数组） | 真正的数组 |
| 可用性 | 所有函数（包括箭头函数除外） | 所有函数（包括箭头函数） |
| 语法 | 需要通过索引访问 | 直接作为数组使用 |
| 与解构结合 | 不支持直接解构 | 支持与解构结合使用 |

#### 代码示例对比

```javascript
// 使用 arguments
function sum() {
  // 需要先转换为数组才能使用数组方法
  return Array.from(arguments).reduce((acc, curr) => acc + curr, 0);
}

// 使用剩余参数
function sum(...numbers) {
  // 直接使用数组方法
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

// 箭头函数中不能使用 arguments
const sumArrow = (...numbers) => {
  return numbers.reduce((acc, curr) => acc + curr, 0);
};
```

剩余参数在箭头函数中特别有用，因为箭头函数没有自己的`arguments`对象。

### 使用限制

剩余参数虽然强大，但也有一些使用限制需要注意：

#### 1. 剩余参数必须是函数的最后一个参数

剩余参数必须放在函数参数列表的末尾，否则会导致语法错误：

```javascript
// 正确
function func(a, b, ...rest) {
  console.log(a, b, rest);
}
func(1, 2, 3, 4, 5); // 输出: 1 2 [3, 4, 5]

// 错误 - 剩余参数不是最后一个
function func(...rest, a, b) {
  // 语法错误: Rest parameter must be last formal parameter
}
```

#### 2. 一个函数只能有一个剩余参数

每个函数最多只能有一个剩余参数：

```javascript
// 错误 - 多个剩余参数
function func(...rest1, ...rest2) {
  // 语法错误: Only one rest parameter allowed
}
```

#### 3. 不支持在对象字面量中使用

剩余参数语法仅适用于函数参数列表，不能用于对象字面量中：

```javascript
// 错误 - 不能在对象字面量中使用剩余参数
const obj = { ...rest };
// 这里的 ... 是展开运算符，不是剩余参数
```

## 展开运算符

展开运算符（Spread Operator）使用 `...` 语法，与剩余参数看起来相同，但用途相反。展开运算符用于将可迭代对象（如数组、字符串、Set、Map等）或对象展开为多个元素或属性。

### 基本语法

#### 展开数组

展开数组时，会将数组的每个元素逐个展开：

```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// 也可以在数组中混合使用展开运算符和普通元素
const numbers = [0, ...arr1, 4, ...arr2, 7];
console.log(numbers); // [0, 1, 2, 3, 4, 4, 5, 6, 7]
```

#### 展开对象

展开对象时，会将对象的每个可枚举属性展开为键值对：

```javascript
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const combinedObj = { ...obj1, ...obj2 };
console.log(combinedObj); // { a: 1, b: 2, c: 3, d: 4 }

// 如果有重复的键，后面的会覆盖前面的
const obj3 = { b: 3, e: 5 };
const merged = { ...obj1, ...obj3 };
console.log(merged); // { a: 1, b: 3, e: 5 }
```

#### 展开其他可迭代对象

展开运算符还可以用于展开其他可迭代对象，如字符串、Set、Map等：

```javascript
// 展开字符串
const str = 'hello';
const chars = [...str];
console.log(chars); // ['h', 'e', 'l', 'l', 'o']

// 展开Set
const set = new Set([1, 2, 3]);
const arrFromSet = [...set];
console.log(arrFromSet); // [1, 2, 3]

// 展开Map (会展开为键值对数组)
const map = new Map([['a', 1], ['b', 2]]);
const arrFromMap = [...map];
console.log(arrFromMap); // [['a', 1], ['b', 2]]
```

### 应用场景

展开运算符在JavaScript中有广泛的应用场景，以下是一些最常见的用法：

#### 1. 数组操作

##### 合并数组

展开运算符提供了一种简洁的方式来合并多个数组：

```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const merged = [...arr1, ...arr2];
console.log(merged); // [1, 2, 3, 4, 5, 6]

// 可以合并任意数量的数组
const arr3 = [7, 8, 9];
const mergedAll = [...arr1, ...arr2, ...arr3];
console.log(mergedAll); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

##### 复制数组

使用展开运算符可以轻松创建数组的浅拷贝：

```javascript
const original = [1, 2, 3];
const copy = [...original];
console.log(copy); // [1, 2, 3]
console.log(copy === original); // false (不同的引用)
```

##### 将类数组对象转换为数组

展开运算符可以将类数组对象（如NodeList、arguments等）转换为真正的数组：

```javascript
// 将NodeList转换为数组
const nodeList = document.querySelectorAll('div');
const array = [...nodeList];

// 将arguments转换为数组
function toArray() {
  return [...arguments];
}
console.log(toArray(1, 2, 3)); // [1, 2, 3]
```

##### 与解构赋值结合

展开运算符可以与解构赋值结合使用，提取数组的部分元素：

```javascript
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(second); // 2
console.log(rest); // [3, 4, 5]
```

#### 2. 对象操作

##### 合并对象

展开运算符可以合并多个对象，当有重复属性时，后面的对象会覆盖前面的对象：

```javascript
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const merged = { ...obj1, ...obj2 };
console.log(merged); // { a: 1, b: 3, c: 4 }
```

##### 复制对象

使用展开运算符可以创建对象的浅拷贝：

```javascript
const original = { a: 1, b: 2 };
const copy = { ...original };
console.log(copy); // { a: 1, b: 2 }
console.log(copy === original); // false (不同的引用)
```

##### 添加或覆盖属性

展开运算符可以方便地添加或覆盖对象的属性：

```javascript
const base = { a: 1, b: 2 };
const extended = { ...base, c: 3, b: 4 };
console.log(extended); // { a: 1, b: 4, c: 3 }
```

##### 处理嵌套对象

对于嵌套对象，可以结合多个展开运算符进行拷贝：

```javascript
const obj = { a: 1, b: { c: 2 } };
const copy = { ...obj, b: { ...obj.b } };
console.log(copy); // { a: 1, b: { c: 2 } }
console.log(copy.b === obj.b); // false (嵌套对象也是新的引用)
```

#### 3. 函数调用

展开运算符可以将数组展开为函数的参数：

```javascript
function sum(a, b, c) {
  return a + b + c;
}

const numbers = [1, 2, 3];
console.log(sum(...numbers)); // 6

// 与其他参数混合使用
console.log(sum(10, ...numbers)); // 16
console.log(sum(...numbers, 20)); // 26
```

#### 4. 构建数组

展开运算符可以与Array构造函数结合，创建并初始化数组：

```javascript
// 创建填充相同值的数组
const zeros = [...Array(5)].map(() => 0);
console.log(zeros); // [0, 0, 0, 0, 0]

// 创建带前缀的序列
const prefix = 'item';
const items = [...Array(5)].map((_, i) => `${prefix}-${i + 1}`);
console.log(items); // ['item-1', 'item-2', 'item-3', 'item-4', 'item-5']
```

#### 5. 与其他ES6特性结合

展开运算符可以与其他ES6特性如Set、Map等结合使用：

```javascript
// 去除数组重复元素
const arrWithDuplicates = [1, 2, 2, 3, 3, 3];
const uniqueArr = [...new Set(arrWithDuplicates)];
console.log(uniqueArr); // [1, 2, 3]

// 将Map转换为对象
const map = new Map([['a', 1], ['b', 2]]);
const objFromMap = { ...Object.fromEntries(map) };
console.log(objFromMap); // { a: 1, b: 2 }
```

## 注意事项

在使用展开运算符时，有一些重要的注意事项需要了解，以避免可能的错误和误解：

### 1. 展开对象的限制

#### 只能展开可枚举属性

展开对象时，只会包含对象的可枚举属性。使用`Object.defineProperty`定义的非可枚举属性不会被展开：

```javascript
const obj = {};
Object.defineProperty(obj, 'a', {
  value: 1,
  enumerable: false // 非可枚举属性
});

const copy = { ...obj };
console.log(copy); // {} (a属性未被展开)
```

#### 不会复制原型链上的属性

展开运算符只会复制对象自身的属性，不会复制原型链上的属性：

```javascript
function Person() {
  this.name = 'John';
}

Person.prototype.sayHello = function() {
  return `Hello, my name is ${this.name}`;
};

const john = new Person();
const copy = { ...john };
console.log(copy.name); // 'John' (自身属性被复制)
console.log(copy.sayHello); // undefined (原型链上的属性未被复制)
```

如果需要复制原型链上的属性，可以使用`Object.create`和`Object.getPrototypeOf`：

```javascript
const copyWithPrototype = Object.create(Object.getPrototypeOf(john), Object.getOwnPropertyDescriptors(john));
console.log(copyWithPrototype.sayHello()); // 'Hello, my name is John'
```

### 2. 嵌套结构的浅拷贝

展开运算符对嵌套数组或对象进行的是浅拷贝，即只复制第一层属性的引用，而不是深层复制：

```javascript
// 嵌套数组的浅拷贝
const arr = [1, [2, 3], 4];
const copy = [...arr];

copy[1][0] = 999;
console.log(arr); // [1, [999, 3], 4] (原数组也被修改)

// 嵌套对象的浅拷贝
const obj = { a: 1, b: { c: 2 } };
const copyObj = { ...obj };

copyObj.b.c = 3;
console.log(obj.b.c); // 3 (原对象也被修改)
```

要实现深拷贝，需要使用其他方法，如`JSON.parse(JSON.stringify())`或专门的深拷贝函数：

```javascript
// 使用JSON序列化/反序列化进行深拷贝
const deepCopy = JSON.parse(JSON.stringify(obj));
// 注意：这种方法有局限性，不能处理函数、循环引用等
```

### 3. 处理 undefined 和 null

展开`undefined`或`null`不会产生错误，但也不会添加任何属性到对象或元素到数组：

```javascript
// 展开到对象中
const obj = { ...undefined, ...null };
console.log(obj); // {}

// 展开到数组中
const arr = [...undefined]; // TypeError: undefined is not iterable
const arr2 = [...null]; // TypeError: null is not iterable
```

注意：虽然展开`undefined`或`null`到对象中不会报错，但展开到数组中会抛出类型错误，因为它们不是可迭代对象。

### 4. 展开运算符与ES5环境的兼容性

展开运算符是ES6的特性，在较旧的JavaScript环境中可能不被支持。如果需要兼容ES5环境，可以使用Babel等工具进行转译，或者使用传统的方法替代：

```javascript
// ES5中合并数组
var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];
var merged = arr1.concat(arr2);

// ES5中复制数组
var copy = arr1.slice();

// ES5中合并对象
var obj1 = { a: 1, b: 2 };
var obj2 = { c: 3, d: 4 };
var mergedObj = {};
for (var key in obj1) {
  if (obj1.hasOwnProperty(key)) {
    mergedObj[key] = obj1[key];
  }
}
for (var key in obj2) {
  if (obj2.hasOwnProperty(key)) {
    mergedObj[key] = obj2[key];
  }
}
```

## 总结

剩余参数和展开运算符是ES6引入的两个强大特性，它们都使用`...`语法，但用途截然不同：

- **剩余参数**：用于将函数的多个参数收集合并为一个数组，使我们能够灵活处理不定数量的参数。
- **展开运算符**：用于将可迭代对象（如数组、字符串、Set、Map等）或对象展开为多个元素或属性，简化了数组和对象的操作。

### 核心优势

1. **简化代码**：替代了传统的`apply`、`concat`、`slice`等方法，使代码更加简洁、可读性更高。
2. **增强灵活性**：剩余参数允许函数接受任意数量的参数，展开运算符使数组和对象操作更加灵活。
3. **更好的功能性**：剩余参数是真正的数组，可以直接使用数组方法；展开运算符支持多种可迭代对象。
4. **与其他ES6特性协同**：与解构赋值、箭头函数、Set、Map等特性结合使用，发挥更大的威力。

### 使用建议

1. 在处理不定数量参数的函数中，优先使用剩余参数而不是`arguments`对象。
2. 在合并数组、复制数组、将类数组对象转换为数组时，使用展开运算符。
3. 在合并对象、复制对象、添加或覆盖对象属性时，使用展开运算符。
4. 注意展开运算符对嵌套结构进行的是浅拷贝，如果需要深拷贝，需使用其他方法。
5. 注意展开对象时只包含可枚举属性，不包含原型链上的属性。

剩余参数和展开运算符是现代JavaScript中非常实用的特性，掌握它们可以帮助你编写更加简洁、高效的代码。