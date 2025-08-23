# 迭代器与生成器

ES6引入了迭代器（Iterator）和生成器（Generator），它们提供了一种更高效、更灵活的方式来遍历数据。这些特性不仅简化了数据遍历的代码，还开启了异步编程和状态管理的新范式。

## 设计目标与核心价值

在ES6之前，JavaScript遍历数据的方式主要依赖于`for`循环、`forEach`方法等，这些方式在处理复杂数据结构或异步数据流时往往显得不够灵活。迭代器和生成器的引入旨在解决以下问题：

1. **统一数据遍历接口**：提供一致的接口来遍历不同类型的数据结构
2. **惰性计算**：允许在需要时才生成数据，避免一次性加载大量数据
3. **状态管理**：维护遍历过程中的状态，使代码更加清晰
4. **异步编程支持**：为处理异步数据流提供更好的抽象

迭代器和生成器的组合使用，可以让我们以同步的方式编写异步代码，大大简化了复杂异步操作的实现。

## 迭代器

迭代器是一种对象，它提供了一个`next()`方法，用于遍历数据集合。`next()`方法返回一个包含`value`和`done`两个属性的对象，其中`value`是当前遍历的值，`done`是一个布尔值，表示是否遍历完毕。迭代器为JavaScript提供了一种统一的数据访问机制，无论数据结构如何，都可以通过相同的方式遍历。

### 迭代器协议

迭代器必须实现一个`next()`方法，该方法满足以下条件：
- 无参数或接受一个参数
- 返回一个对象，包含`value`和`done`两个属性
- `value`表示当前迭代的值（可以是任何类型）
- `done`是一个布尔值，表示迭代是否结束

### 基本用法

```javascript
// 手动创建迭代器
const iterator = {
  index: 0,
  data: [1, 2, 3],
  next() {
    if (this.index < this.data.length) {
      return {
        value: this.data[this.index++],
        done: false
      };
    } else {
      return {
        value: undefined,
        done: true
      };
    }
  }
};

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

### 可迭代对象

如果一个对象实现了`Symbol.iterator`方法，那么它就是可迭代对象。`Symbol.iterator`方法返回一个迭代器，这使得对象可以被`for...of`循环遍历。

```javascript
// 创建可迭代对象
const iterable = {
  data: [1, 2, 3],
  [Symbol.iterator]() {
    let index = 0;
    // 使用箭头函数确保this指向正确
    return {
      next: () => {
        if (index < this.data.length) {
          return {
            value: this.data[index++],
            done: false
          };
        } else {
          return {
            value: undefined,
            done: true
          };
        }
      }
    };
  }
};

// 使用for...of遍历
for (const value of iterable) {
  console.log(value); // 1, 2, 3
}

// 也可以手动获取迭代器
const iterator = iterable[Symbol.iterator]();
console.log(iterator.next()); // { value: 1, done: false }
```

### 内置可迭代对象

JavaScript中的许多内置对象都是可迭代的，如数组、字符串、Set、Map等。它们都实现了`Symbol.iterator`方法。

```javascript
// 数组是可迭代的
const array = [1, 2, 3];
for (const value of array) {
  console.log(value); // 1, 2, 3
}

// 字符串是可迭代的
const string = 'hello';
for (const char of string) {
  console.log(char); // 'h', 'e', 'l', 'l', 'o'
}

// Set是可迭代的
const set = new Set([1, 2, 3]);
for (const value of set) {
  console.log(value); // 1, 2, 3
}

// Map是可迭代的
const map = new Map([['name', 'John'], ['age', 30]]);
for (const [key, value] of map) {
  console.log(`${key}: ${value}`); // 'name: John', 'age: 30'
}
```

### 高级应用：自定义迭代器

我们可以为复杂的数据结构创建自定义迭代器，使其支持`for...of`循环。

```javascript
// 自定义范围迭代器
class Range {
  constructor(start, end, step = 1) {
    this.start = start;
    this.end = end;
    this.step = step;
  }

  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    const step = this.step;

    return {
      next() {
        if ((step > 0 && current < end) || (step < 0 && current > end)) {
          const value = current;
          current += step;
          return {
            value,
            done: false
          };
        } else {
          return {
            value: undefined,
            done: true
          };
        }
      }
    };
  }
}

// 使用自定义迭代器
for (const num of new Range(1, 10, 2)) {
  console.log(num); // 1, 3, 5, 7, 9
}

// 反向迭代
for (const num of new Range(10, 0, -1)) {
  console.log(num); // 10, 9, 8, ..., 1
}
```

### 注意事项与最佳实践

1. **迭代器状态**：迭代器对象一旦创建就会维护自己的状态，多次迭代同一个迭代器会从上次结束的地方继续，而不是重新开始。

```javascript
const array = [1, 2, 3];
const iterator = array[Symbol.iterator]();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }

// 再次获取新的迭代器
const newIterator = array[Symbol.iterator]();
console.log(newIterator.next()); // { value: 1, done: false }
```

2. **传递参数给next()**：迭代器的`next()`方法可以接受一个参数，这个参数会成为上一个`yield`表达式的返回值（在生成器中使用）。

3. **处理无限序列**：迭代器可以用于表示无限序列，但在遍历这种序列时需要注意添加终止条件。

4. **性能考虑**：对于大型数据集，使用迭代器可以实现惰性计算，避免一次性加载所有数据到内存中。

## 生成器

生成器是一种特殊的函数，它使用`function*`语法定义，可以通过`yield`关键字暂停函数执行，并返回一个值。生成器提供了一种强大的方式来创建迭代器，同时也是处理异步操作和复杂状态管理的有效工具。

### 基本用法

```javascript
// 定义生成器函数
function* generator() {
  yield 1;
  yield 2;
  yield 3;
  return 'done';
}

// 创建生成器对象
const gen = generator();

console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: 'done', done: true }
console.log(gen.next()); // { value: undefined, done: true }
```

### yield表达式

`yield`表达式可以返回一个值给调用者，同时暂停生成器函数的执行。生成器函数可以通过`next()`方法的参数接收外部传入的值，这个值会成为上一个`yield`表达式的返回值。

```javascript
function* generator() {
  const a = yield 1; // 第一个next()调用返回1，并暂停
  console.log(`a = ${a}`); // 当调用next(10)时，a的值为10
  const b = yield 2; // 返回2，并暂停
  console.log(`b = ${b}`); // 当调用next(20)时，b的值为20
  return a + b; // 返回30，并结束
}

const gen = generator();

console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next(10)); // 输出: 'a = 10', 返回: { value: 2, done: false }
console.log(gen.next(20)); // 输出: 'b = 20', 返回: { value: 30, done: true }
```

### 生成器与迭代器的关系

生成器函数返回的生成器对象实现了迭代器接口，因此生成器对象也是可迭代对象。这意味着我们可以使用`for...of`循环来遍历生成器生成的值。

```javascript
function* generator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = generator();

// 使用for...of遍历生成器对象
for (const value of gen) {
  console.log(value); // 1, 2, 3
}

// 注意：for...of循环会忽略return语句返回的值
```

### 生成器的高级特性

#### 1. yield* 表达式

`yield*`表达式用于委托给另一个生成器或可迭代对象，允许我们组合多个生成器。

```javascript
function* generator1() {
  yield 1;
  yield 2;
}

function* generator2() {
  yield 'a';
  yield* generator1(); // 委托给generator1
  yield 'b';
}

for (const value of generator2()) {
  console.log(value); // 'a', 1, 2, 'b'
}
```

#### 2. return() 方法

生成器对象的`return()`方法可以提前结束生成器，并返回指定的值。

```javascript
function* generator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = generator();

console.log(gen.next()); // { value: 1, done: false }
console.log(gen.return('finished')); // { value: 'finished', done: true }
console.log(gen.next()); // { value: undefined, done: true }
```

#### 3. throw() 方法

生成器对象的`throw()`方法可以在生成器函数内部抛出异常，允许我们在迭代过程中处理错误。

```javascript
function* generator() {
  try {
    yield 1;
    yield 2;
  } catch (error) {
    console.log(`捕获到错误: ${error.message}`);
  }
  yield 3;
}

const gen = generator();

console.log(gen.next()); // { value: 1, done: false }
console.log(gen.throw(new Error('出错了'))); // 输出: '捕获到错误: 出错了', 返回: { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }
```

### 生成器的应用场景

#### 1. 异步操作同步化

生成器可以让我们以同步的方式编写异步代码，使代码更加清晰易懂。

```javascript
function* fetchData() {
  try {
    const data1 = yield fetch('/api/data1').then(res => res.json());
    console.log('数据1加载完成', data1);
    const data2 = yield fetch('/api/data2').then(res => res.json());
    console.log('数据2加载完成', data2);
    return { data1, data2 };
  } catch (error) {
    console.error('数据加载失败', error);
    throw error;
  }
}

// 使用生成器处理异步操作
function runGenerator(generatorFn) {
  const gen = generatorFn();

  function handleResult(result) {
    if (result.done) {
      return Promise.resolve(result.value);
    }

    return Promise.resolve(result.value)
      .then(value => handleResult(gen.next(value)))
      .catch(error => handleResult(gen.throw(error)));
  }

  return handleResult(gen.next());
}

// 运行生成器
runGenerator(fetchData)
  .then(result => console.log('最终结果', result))
  .catch(error => console.error('处理失败', error));
```

#### 2. 懒加载与无限序列

生成器非常适合处理懒加载数据和无限序列，因为它只在需要时才生成下一个值。

```javascript
// 无限序列生成器
function* infiniteSequence() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

const gen = infiniteSequence();

// 只获取前5个值
for (let i = 0; i < 5; i++) {
  console.log(gen.next().value); // 0, 1, 2, 3, 4
}

// 斐波那契数列生成器
function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();

// 获取前10个斐波那契数
for (let i = 0; i < 10; i++) {
  console.log(fib.next().value); // 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
}
```

#### 3. 状态机

生成器可以用来实现状态机，每个`yield`表达式代表一个状态。

```javascript
// 交通信号灯状态机
function* trafficLight() {
  while (true) {
    yield 'red';    // 红灯
    yield 'yellow'; // 黄灯
    yield 'green';  // 绿灯
  }
}

const light = trafficLight();

// 模拟信号灯变化
function changeLight() {
  const state = light.next().value;
  console.log(`信号灯变为: ${state}`);
  setTimeout(changeLight, state === 'red' ? 3000 : state === 'yellow' ? 1000 : 2000);
}

changeLight(); // 红灯(3秒) -> 黄灯(1秒) -> 绿灯(2秒) -> 红灯(3秒)...
```

#### 4. 迭代器工厂

生成器可以作为迭代器工厂，用于创建自定义迭代器。

```javascript
// 自定义数组迭代器工厂
function* arrayIteratorFactory(array) {
  for (let i = 0; i < array.length; i++) {
    yield array[i];
  }
}

const array = [1, 2, 3, 4, 5];
const iterator = arrayIteratorFactory(array);

for (const value of iterator) {
  console.log(value); // 1, 2, 3, 4, 5
}
```

### 注意事项与最佳实践

1. **生成器函数声明**：使用`function*`而不是`function`来声明生成器函数，两者有本质区别。

2. **yield的位置**：`yield`关键字只能在生成器函数内部使用，不能在普通函数或箭头函数中使用。

3. **生成器对象的一次性**：生成器对象一旦迭代完毕（`done`为`true`），就不能重新开始，必须创建新的生成器对象。

4. **内存泄漏**：对于无限序列生成器，要确保有合适的终止条件，避免无限循环导致内存泄漏。

5. **错误处理**：在生成器函数内部使用`try...catch`捕获可能的错误，并考虑通过`throw()`方法将外部错误传递给生成器。

6. **与Promise结合**：生成器与Promise结合使用可以更好地处理异步操作，这也是async/await语法的基础。

## 异步生成器

ES2018引入了异步生成器（Async Generator），它结合了生成器和异步函数的特性，可以用于遍历异步数据源。异步生成器允许我们以同步的方式编写异步迭代代码，极大地简化了对异步数据流的处理。

### 基本用法

异步生成器函数使用`async function*`语法定义，可以在函数内部使用`await`关键字处理异步操作，并通过`yield`返回异步结果。

```javascript
// 定义异步生成器函数
async function* asyncGenerator() {
  yield await Promise.resolve(1);
  yield await Promise.resolve(2);
  yield await Promise.resolve(3);
}

// 使用异步生成器
const gen = asyncGenerator();

gen.next()
  .then(result => {
    console.log(result); // { value: 1, done: false }
    return gen.next();
  })
  .then(result => {
    console.log(result); // { value: 2, done: false }
    return gen.next();
  })
  .then(result => {
    console.log(result); // { value: 3, done: false }
    return gen.next();
  })
  .then(result => {
    console.log(result); // { value: undefined, done: true }
  });
```

### for-await-of 循环

ES2018引入了`for-await-of`循环，用于遍历异步可迭代对象。它会等待每个异步操作完成后再继续下一次迭代。

```javascript
async function processAsyncGenerator() {
  for await (const value of asyncGenerator()) {
    console.log(value); // 1, 2, 3
  }
}

processAsyncGenerator();
```

### 异步可迭代对象

一个对象如果实现了`Symbol.asyncIterator`方法，那么它就是异步可迭代对象。`Symbol.asyncIterator`方法返回一个异步迭代器。

```javascript
// 创建异步可迭代对象
const asyncIterable = {
  data: [1, 2, 3],
  [Symbol.asyncIterator]() {
    let index = 0;
    return {
      next: async () => {
        if (index < this.data.length) {
          // 模拟异步操作
          await new Promise(resolve => setTimeout(resolve, 1000));
          return {
            value: this.data[index++],
            done: false
          };
        } else {
          return {
            value: undefined,
            done: true
          };
        }
      }
    };
  }
};

// 使用for-await-of遍历
async function iterateAsync() {
  for await (const value of asyncIterable) {
    console.log(value); // 1, 2, 3 (每隔1秒输出一个)
  }
}

iterateAsync();
```

### 异步生成器的高级特性

#### 1. 传递参数给 next()

与普通生成器类似，异步生成器的`next()`方法也可以接收参数，这个参数会成为上一个`yield`表达式的返回值。

```javascript
async function* asyncGenerator() {
  const a = yield await Promise.resolve(1);
  console.log(`a = ${a}`);
  const b = yield await Promise.resolve(2);
  console.log(`b = ${b}`);
  return a + b;
}

const gen = asyncGenerator();

gen.next()
  .then(result => {
    console.log(result); // { value: 1, done: false }
    return gen.next(10);
  })
  .then(result => {
    // 输出: 'a = 10'
    console.log(result); // { value: 2, done: false }
    return gen.next(20);
  })
  .then(result => {
    // 输出: 'b = 20'
    console.log(result); // { value: 30, done: true }
  });
```

#### 2. throw() 和 return() 方法

异步生成器对象也支持`throw()`和`return()`方法，它们的行为与普通生成器类似，但返回Promise。

```javascript
async function* asyncGenerator() {
  try {
    yield await Promise.resolve(1);
    yield await Promise.resolve(2);
  } catch (error) {
    console.log(`捕获到错误: ${error.message}`);
  }
  yield await Promise.resolve(3);
}

const gen = asyncGenerator();

gen.next()
  .then(result => {
    console.log(result); // { value: 1, done: false }
    return gen.throw(new Error('出错了'));
  })
  .then(result => {
    // 输出: '捕获到错误: 出错了'
    console.log(result); // { value: 3, done: false }
    return gen.return('finished');
  })
  .then(result => {
    console.log(result); // { value: 'finished', done: true }
  });
```

### 异步生成器的应用场景

#### 1. 处理流式数据

异步生成器非常适合处理流式数据，如从服务器获取大型数据集或处理文件流。

```javascript
// 模拟从服务器分页获取数据
async function* fetchPaginatedData() {
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(`/api/data?page=${page}`);
    const data = await response.json();

    if (data.items.length === 0) {
      hasMore = false;
    } else {
      for (const item of data.items) {
        yield item;
      }
      page++;
    }
  }
}

// 处理分页数据
async function processData() {
  for await (const item of fetchPaginatedData()) {
    console.log('处理数据项:', item);
    // 处理单个数据项
  }
}

processData();
```

#### 2. 合并多个异步数据流

异步生成器可以用于合并多个异步数据流，使代码更加清晰。

```javascript
// 模拟多个异步数据源
async function* source1() {
  yield await Promise.resolve('A');
  yield await Promise.resolve('B');
}

async function* source2() {
  yield await Promise.resolve('X');
  yield await Promise.resolve('Y');
}

// 合并多个异步数据流
async function* mergeStreams(...streams) {
  const iterators = streams.map(stream => stream[Symbol.asyncIterator]());
  const results = [];

  while (iterators.length > 0) {
    // 并行获取所有流的下一个值
    const promises = iterators.map(iterator => iterator.next());
    const settled = await Promise.allSettled(promises);

    for (let i = 0; i < settled.length; i++) {
      const result = settled[i];
      if (result.status === 'fulfilled') {
        if (!result.value.done) {
          yield result.value.value;
        } else {
          // 移除已完成的迭代器
          iterators.splice(i, 1);
          i--;
        }
      }
    }
  }
}

// 使用合并后的数据流
async function processMergedStreams() {
  for await (const value of mergeStreams(source1(), source2())) {
    console.log(value); // 可能的输出: 'A', 'X', 'B', 'Y' 或其他顺序
  }
}

processMergedStreams();
```

### 注意事项与最佳实践

1. **异步生成器函数声明**：使用`async function*`而不是`function*`来声明异步生成器函数。

2. **错误处理**：在异步生成器函数内部使用`try...catch`捕获可能的错误，同时在外部使用`.catch()`处理Promise rejection。

3. **内存管理**：对于大型异步数据流，要确保及时处理和释放资源，避免内存泄漏。

4. **并发控制**：当处理多个异步操作时，考虑使用`Promise.all()`或其他并发控制策略来提高性能。

5. **与普通生成器的区别**：异步生成器的`next()`、`throw()`和`return()`方法返回的是Promise，而不是直接的值。

6. **兼容性**：异步生成器和`for-await-of`循环在一些旧浏览器中不被支持，需要使用Babel等工具进行转译。

## 总结

迭代器、生成器和异步生成器是JavaScript中强大的数据遍历和处理工具，它们为我们提供了更高效、更灵活的方式来处理各种数据场景。

### 核心要点回顾

1. **迭代器**：
   - 实现了迭代器协议的对象，提供`next()`方法
   - 返回包含`value`和`done`属性的对象
   - 支持自定义迭代器，为复杂数据结构提供统一的遍历接口

2. **生成器**：
   - 使用`function*`定义的特殊函数
   - 通过`yield`关键字暂停执行并返回值
   - 生成器对象实现了迭代器接口，支持`for...of`循环
   - 支持`yield*`、`return()`和`throw()`等高级特性

3. **异步生成器**：
   - 使用`async function*`定义的异步特殊函数
   - 结合了生成器和异步函数的特性
   - 支持`await`处理异步操作
   - 异步可迭代对象实现了`Symbol.asyncIterator`方法
   - 支持`for-await-of`循环遍历异步数据流

### 主要优势

1. **统一接口**：提供一致的数据访问机制，无论数据结构如何
2. **惰性计算**：只在需要时生成数据，避免内存浪费
3. **状态管理**：维护遍历过程中的状态，使代码更清晰
4. **异步支持**：以同步方式编写异步代码，简化异步操作处理
5. **代码简化**：减少循环和状态管理的样板代码

### 实践建议

1. **选择合适的工具**：
   - 简单数据遍历使用`for...of`循环
   - 复杂状态管理使用生成器
   - 异步数据流处理使用异步生成器

2. **错误处理**：
   - 在生成器中使用`try...catch`捕获错误
   - 异步生成器中同时处理同步和异步错误

3. **性能考虑**：
   - 对于大型数据集，优先使用迭代器和生成器实现惰性计算
   - 合理控制并发，避免过度消耗资源

4. **学习资源**：
   - 深入理解迭代器协议和可迭代对象的概念
   - 掌握生成器与Promise结合处理复杂异步流程的技巧
   - 了解异步迭代器在处理流式数据中的应用

迭代器、生成器和异步生成器是现代JavaScript中处理数据的强大工具，掌握它们可以帮助我们编写更高效、更清晰的代码，特别是在处理复杂数据结构和异步数据流时。随着JavaScript的发展，这些特性的应用场景也在不断扩展，是前端开发者必备的技能之一。