# 数组 (Array)

数组是JavaScript中一种用于存储多个值的有序集合数据结构。它具有以下特点：

1. **有序性**：数组中的元素按照插入顺序排列，每个元素都有一个对应的索引位置
2. **动态性**：数组的长度可以随时改变，不需要预先定义大小
3. **异质性**：可以存储任意类型的数据（数字、字符串、布尔值、对象等）
4. **引用类型**：数组是引用类型数据，赋值和传递时是引用传递而非值传递

数组在JavaScript中应用广泛，常用于数据存储、遍历、排序和筛选等操作。

## 数组的创建

### 数组字面量
```javascript
var numbers = [1, 2, 3, 4, 5];
var mixed = [1, "hello", true, { name: "John" }, null];
```

### 构造函数
```javascript
var numbers = new Array(1, 2, 3, 4, 5);
var emptyArray = new Array(5); // 创建长度为5的空数组
```

### 从类数组对象创建数组
```javascript
// 传统方式从类数组对象创建数组
function arrayFrom(arrayLike) {
  var result = [];
  for (var i = 0; i < arrayLike.length; i++) {
    result.push(arrayLike[i]);
  }
  return result;
}
var arrayLike = { 0: "a", 1: "b", 2: "c", length: 3 };
var array = arrayFrom(arrayLike);
console.log(array); // ["a", "b", "c"]

// 传统方式实现映射功能
function mapArray(arr, callback) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    result.push(callback(arr[i], i, arr));
  }
  return result;
}
var doubled = mapArray([1, 2, 3], function(x) {
  return x * 2;
});
console.log(doubled); // [2, 4, 6]
```

## 数组访问与修改

数组中的每个元素都有一个对应的索引，从0开始计数。我们可以通过索引来访问和修改数组元素。

```javascript
var fruits = ["苹果", "香蕉", "橙子"];

// 访问元素
console.log(fruits[0]); // "苹果"
console.log(fruits[2]); // "橙子"

// 修改元素
fruits[1] = "葡萄";
console.log(fruits); // ["苹果", "葡萄", "橙子"]
```

### 索引的特性

1. **索引越界**：当访问不存在的索引时，不会报错，而是返回`undefined`
   ```javascript
   console.log(fruits[10]); // undefined
   ```

2. **负索引**：JavaScript不支持负索引（如-1表示最后一个元素），但可以通过计算实现类似功能
   ```javascript
   console.log(fruits[fruits.length - 1]); // "橙子" (获取最后一个元素)
   ```

3. **字符串索引**：如果使用字符串作为索引，实际上是在给数组对象添加属性，而不是数组元素
   ```javascript
   fruits["color"] = "red";
   console.log(fruits.color); // "red"
   console.log(fruits.length); // 3 (数组长度不变)
   ```

### 数组长度

数组的`length`属性表示数组中元素的个数，它有以下特性：

```javascript
// 查看数组长度
console.log(fruits.length); // 3

// 修改长度 - 截断数组
fruits.length = 2;
console.log(fruits); // ["苹果", "葡萄"]

// 修改长度 - 扩展数组
fruits.length = 5;
console.log(fruits); // ["苹果", "葡萄", undefined, undefined, undefined]
```

### 多维数组

JavaScript支持多维数组，即数组中的元素也可以是数组：

```javascript
// 创建二维数组
var matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// 访问二维数组元素
console.log(matrix[1][2]); // 6

// 修改二维数组元素
matrix[0][0] = 100;
console.log(matrix[0][0]); // 100
```

## 数组方法

### 遍历方法

数组提供了多种遍历方法，每种方法都有其特定的用途和适用场景。

```javascript
var numbers = [1, 2, 3, 4, 5];
```

#### forEach

`forEach`方法用于遍历数组中的每个元素，并对每个元素执行指定的函数。它没有返回值。

```javascript
// forEach - 遍历数组
numbers.forEach(function(num, index, array) {
  console.log("索引 " + index + ": " + num);
  // 第三个参数是原始数组
  console.log("原始数组: " + array);
});
```

适用场景：当你需要对数组中的每个元素执行某种操作，而不需要返回新数组时。

#### map

`map`方法创建一个新数组，其结果是该数组中的每个元素都调用一次提供的函数后的返回值。

```javascript
// map - 创建新数组，包含每个元素经过函数处理后的值
var doubled = numbers.map(function(num, index) {
  return num * 2 + index; // 结合索引进行计算
});
console.log(doubled); // [2, 5, 8, 11, 14]

// 实际应用：提取对象数组中的特定属性
var users = [
  { id: 1, name: "张三" },
  { id: 2, name: "李四" },
  { id: 3, name: "王五" }
];
var userNames = users.map(function(user) {
  return user.name;
});
console.log(userNames); // ["张三", "李四", "王五"]
```

适用场景：当你需要将数组中的每个元素转换为另一种形式，并返回新数组时。

#### filter

`filter`方法创建一个新数组，包含所有通过指定函数测试的元素。

```javascript
// filter - 创建新数组，包含满足条件的元素
var evenNumbers = numbers.filter(function(num) {
  return num % 2 === 0;
});
console.log(evenNumbers); // [2, 4]

// 实际应用：筛选对象数组
var adults = [
  { name: "张三", age: 17 },
  { name: "李四", age: 22 },
  { name: "王五", age: 19 },
  { name: "赵六", age: 25 }
].filter(function(person) {
  return person.age >= 18;
});
console.log(adults); // [{ name: "李四", age: 22 }, { name: "王五", age: 19 }, { name: "赵六", age: 25 }]
```

适用场景：当你需要从数组中筛选出满足特定条件的元素时。

#### reduce

`reduce`方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。

```javascript
// reduce - 从左到右将数组元素聚合成一个值
var sum = numbers.reduce(function(total, num, index, array) {
  return total + num;
}, 0);
console.log(sum); // 15

// 实际应用：计算数组中每个元素出现的次数
var fruits = ["苹果", "香蕉", "橙子", "苹果", "香蕉", "苹果"];
var count = fruits.reduce(function(result, fruit) {
  result[fruit] = (result[fruit] || 0) + 1;
  return result;
}, {});
console.log(count); // { "苹果": 3, "香蕉": 2, "橙子": 1 }

// 实际应用：数组去重
var uniqueFruits = fruits.reduce(function(result, fruit) {
  if (!result.includes(fruit)) {
    result.push(fruit);
  }
  return result;
}, []);
console.log(uniqueFruits); // ["苹果", "香蕉", "橙子"]
```

适用场景：当你需要将数组中的所有元素合并为一个值（如求和、求积、计数等）时。

#### reduceRight

`reduceRight`方法与`reduce`类似，但它从数组的右侧开始遍历。

```javascript
// reduceRight - 从右到左将数组元素聚合成一个值
var difference = numbers.reduceRight(function(total, num) {
  return total - num;
}, 0);
console.log(difference); // -15

// 实际应用：从右到左拼接字符串
var words = ["Hello", "World", "JavaScript"];
var sentence = words.reduceRight(function(result, word) {
  return word + " " + result;
}, "");
console.log(sentence); // "JavaScript World Hello "
```

适用场景：当你需要从数组的右侧开始合并元素时。

#### every

`every`方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。

```javascript
// every - 检查是否所有元素都满足条件
var allPositive = numbers.every(function(num) {
  return num > 0;
});
console.log(allPositive); // true

// 检查数组中的所有元素是否都是偶数
var allEven = numbers.every(function(num) {
  return num % 2 === 0;
});
console.log(allEven); // false
```

适用场景：当你需要确认数组中的所有元素都满足某个条件时。

#### some

`some`方法测试数组中是否至少有一个元素通过了指定函数的测试。它返回一个布尔值。

```javascript
// some - 检查是否至少有一个元素满足条件
var hasEven = numbers.some(function(num) {
  return num % 2 === 0;
});
console.log(hasEven); // true

// 检查数组中是否有负数
var hasNegative = numbers.some(function(num) {
  return num < 0;
});
console.log(hasNegative); // false
```

适用场景：当你需要确认数组中是否存在至少一个满足某个条件的元素时。

#### 传统方式实现find功能

```javascript
function find(arr, callback) {
  for (var i = 0; i < arr.length; i++) {
    if (callback(arr[i], i, arr)) {
      return arr[i];
    }
  }
  return undefined;
}

// 查找第一个大于3的元素
var firstGreaterThanThree = find(numbers, function(num) {
  return num > 3;
});
console.log(firstGreaterThanThree); // 4

// 实际应用：查找对象数组中的特定元素
var users = [
  { id: 1, name: "张三" },
  { id: 2, name: "李四" },
  { id: 3, name: "王五" }
];
var userWithId2 = find(users, function(user) {
  return user.id === 2;
});
console.log(userWithId2); // { id: 2, name: "李四" }
```

#### find

`find`方法返回数组中满足提供的测试函数的第一个元素的值。如果没有找到满足条件的元素，则返回`undefined`。

> 注意：`find`方法是ES6引入的，但我们可以在ES5中实现类似功能。

```javascript
// ES5实现find功能
function find(arr, callback) {
  for (var i = 0; i < arr.length; i++) {
    if (callback(arr[i], i, arr)) {
      return arr[i];
    }
  }
  return undefined;
}

// 查找第一个大于3的元素
var firstGreaterThanThree = find(numbers, function(num) {
  return num > 3;
});
console.log(firstGreaterThanThree); // 4

// 实际应用：查找对象数组中的特定元素
var users = [
  { id: 1, name: "张三" },
  { id: 2, name: "李四" },
  { id: 3, name: "王五" }
];
var userWithId2 = find(users, function(user) {
  return user.id === 2;
});
console.log(userWithId2); // { id: 2, name: "李四" }
```

适用场景：当你需要查找数组中满足特定条件的第一个元素时。

#### findIndex

`findIndex`方法返回数组中满足提供的测试函数的第一个元素的索引。如果没有找到满足条件的元素，则返回-1。

> 注意：`findIndex`方法是ES6引入的，但我们可以在ES5中实现类似功能。

```javascript
// ES5实现findIndex功能
function findIndex(arr, callback) {
  for (var i = 0; i < arr.length; i++) {
    if (callback(arr[i], i, arr)) {
      return i;
    }
  }
  return -1;
}

// 查找第一个偶数的索引
var firstEvenIndex = findIndex(numbers, function(num) {
  return num % 2 === 0;
});
console.log(firstEvenIndex); // 1

// 查找第一个负数的索引
var firstNegativeIndex = findIndex(numbers, function(num) {
  return num < 0;
});
console.log(firstNegativeIndex); // -1 (表示不存在)
```

适用场景：当你需要查找数组中满足特定条件的第一个元素的索引时。

#### 数组方法兼容性说明

| 方法 | ES版本 | IE支持 | 主流浏览器支持 |
|------|--------|--------|----------------|
| `forEach` | ES5 | 9+ | 全支持 |
| `map` | ES5 | 9+ | 全支持 |
| `filter` | ES5 | 9+ | 全支持 |
| `reduce` | ES5 | 9+ | 全支持 |
| `reduceRight` | ES5 | 9+ | 全支持 |
| `every` | ES5 | 9+ | 全支持 |
| `some` | ES5 | 9+ | 全支持 |
| `find` | ES6 | 12+ | 全支持 |
| `findIndex` | ES6 | 12+ | 全支持 |

> 注意：对于不支持ES5/ES6方法的旧浏览器，可以使用polyfill来提供兼容性支持。
```

### 遍历方法的性能 considerations

- 一般来说，传统的`for`循环在性能上优于数组方法（如`forEach`、`map`等），尤其是在处理大型数组时
- `forEach`不能使用`break`或`continue`来控制循环
- `map`、`filter`等方法会创建新数组，可能会增加内存使用
- 在选择遍历方法时，应根据具体需求和场景选择最合适的方法，而不仅仅考虑性能

### 操作方法

数组操作方法用于修改数组内容，包括添加、删除、替换、合并等操作。

```javascript
var fruits = ['苹果', '香蕉', '橙子'];
```

#### push

`push`方法向数组的末尾添加一个或多个元素，并返回新的数组长度。

```javascript
// push - 向数组末尾添加元素
var newLength = fruits.push('葡萄', '猕猴桃');
console.log(newLength); // 5
console.log(fruits); // ['苹果', '香蕉', '橙子', '葡萄', '猕猴桃']

// 实际应用：动态构建数组
var userIds = [];
function addUser(id) {
  userIds.push(id);
  console.log('用户 ' + id + ' 已添加，当前用户数：' + userIds.length);
}
addUser(1001); // 用户 1001 已添加，当前用户数：1
addUser(1002); // 用户 1002 已添加，当前用户数：2
```

适用场景：当你需要向数组末尾添加元素时。

#### pop

`pop`方法删除并返回数组的最后一个元素。

```javascript
// pop - 删除并返回数组的最后一个元素
var lastFruit = fruits.pop();
console.log(lastFruit); // '猕猴桃'
console.log(fruits); // ['苹果', '香蕉', '橙子', '葡萄']

// 实际应用：模拟栈操作
var stack = [];
stack.push('A');
stack.push('B');
stack.push('C');
console.log(stack); // ['A', 'B', 'C']
var top = stack.pop();
console.log(top); // 'C'
console.log(stack); // ['A', 'B']
```

适用场景：当你需要删除数组的最后一个元素时，或模拟栈的弹出操作。

#### unshift

`unshift`方法向数组的开头添加一个或多个元素，并返回新的数组长度。

```javascript
// unshift - 向数组开头添加元素
var newLength = fruits.unshift('草莓', '蓝莓');
console.log(newLength); // 6
console.log(fruits); // ['草莓', '蓝莓', '苹果', '香蕉', '橙子', '葡萄']

// 实际应用：在队列开头添加元素
var queue = [];
function enqueue(item) {
  queue.unshift(item);
  console.log('元素 ' + item + ' 已入队');
}
function dequeue() {
  return queue.pop();
}
enqueue('任务1'); // 元素 任务1 已入队
enqueue('任务2'); // 元素 任务2 已入队
console.log(queue); // ['任务2', '任务1']
var task = dequeue();
console.log('执行任务: ' + task); // 执行任务: 任务1
```

适用场景：当你需要向数组开头添加元素时，或模拟队列的入队操作。

#### shift

`shift`方法删除并返回数组的第一个元素。

```javascript
// shift - 删除并返回数组的第一个元素
var firstFruit = fruits.shift();
console.log(firstFruit); // '草莓'
console.log(fruits); // ['蓝莓', '苹果', '香蕉', '橙子', '葡萄']

// 实际应用：模拟队列操作
var queue = ['任务1', '任务2', '任务3'];
console.log(queue); // ['任务1', '任务2', '任务3']
var nextTask = queue.shift();
console.log('执行任务: ' + nextTask); // 执行任务: 任务1
console.log(queue); // ['任务2', '任务3']
```

适用场景：当你需要删除数组的第一个元素时，或模拟队列的出队操作。

#### splice

`splice`方法通过删除、替换或添加元素来修改数组，并返回被删除的元素数组。

```javascript
// 删除元素
var removed = fruits.splice(1, 1); // 从索引1开始删除1个元素
console.log(removed); // ['苹果']
console.log(fruits); // ['蓝莓', '香蕉', '橙子', '葡萄']

// 添加元素
fruits.splice(1, 0, '苹果', '梨'); // 从索引1开始添加元素
console.log(fruits); // ['蓝莓', '苹果', '梨', '香蕉', '橙子', '葡萄']

// 替换元素
fruits.splice(2, 1, '猕猴桃'); // 从索引2开始替换1个元素
console.log(fruits); // ['蓝莓', '苹果', '猕猴桃', '香蕉', '橙子', '葡萄']

// 实际应用：在指定位置插入元素
function insertAt(arr, index, item) {
  arr.splice(index, 0, item);
  return arr;
}
var colors = ['红', '蓝', '绿'];
insertAt(colors, 1, '黄');
console.log(colors); // ['红', '黄', '蓝', '绿']
```

适用场景：当你需要在数组的任意位置添加、删除或替换元素时。

#### slice

`slice`方法返回一个新数组，包含从开始索引到结束索引（不包括结束索引）的数组元素。

```javascript
// slice - 返回数组的一部分
var citrus = fruits.slice(3); // 从索引3开始到结束
console.log(citrus); // ['香蕉', '橙子', '葡萄']

var someFruits = fruits.slice(1, 4); // 从索引1开始到索引4(不包括)
console.log(someFruits); // ['苹果', '猕猴桃', '香蕉']

// 实际应用：复制数组
var fruitsCopy = fruits.slice();
console.log(fruitsCopy); // ['蓝莓', '苹果', '猕猴桃', '香蕉', '橙子', '葡萄']

// 实际应用：获取除了最后一个元素外的所有元素
var allButLast = fruits.slice(0, -1);
console.log(allButLast); // ['蓝莓', '苹果', '猕猴桃', '香蕉', '橙子']
```

适用场景：当你需要获取数组的一部分，或创建数组的副本时。

#### concat

`concat`方法用于合并两个或多个数组，返回一个新数组。

```javascript
// concat - 合并数组
var moreFruits = ['草莓', '菠萝'];
var allFruits = fruits.concat(moreFruits);
console.log(allFruits); // ['蓝莓', '苹果', '猕猴桃', '香蕉', '橙子', '葡萄', '草莓', '菠萝']

// 合并多个数组
var array1 = [1, 2];
var array2 = [3, 4];
var array3 = [5, 6];
var combined = array1.concat(array2, array3);
console.log(combined); // [1, 2, 3, 4, 5, 6]

// 实际应用：将数组转换为参数列表
function sum(a, b, c) {
  return a + b + c;
}
var numbers = [1, 2, 3];
// 注意：这里使用apply来传递数组作为参数
var total = sum.apply(null, numbers);
console.log(total); // 6
```

适用场景：当你需要合并多个数组时。

#### join

`join`方法将数组中的所有元素连接成一个字符串。

```javascript
// join - 将数组元素连接成字符串
var fruitString = fruits.join(', ');
console.log(fruitString); // '蓝莓, 苹果, 猕猴桃, 香蕉, 橙子, 葡萄'

// 使用不同的分隔符
var dashedString = fruits.join(' - ');
console.log(dashedString); // '蓝莓 - 苹果 - 猕猴桃 - 香蕉 - 橙子 - 葡萄'

// 实际应用：构建URL查询字符串
var params = {
  name: '张三',
  age: 25,
  city: '北京'
};
var queryString = Object.keys(params)
  .map(function(key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
  })
  .join('&');
console.log(queryString); // 'name=%E5%BC%A0%E4%B8%89&age=25&city=%E5%8C%97%E4%BA%AC'
```

适用场景：当你需要将数组元素连接成字符串时。
### 操作方法的性能对比

- `push`和`pop`操作在数组末尾进行，性能较好
- `unshift`和`shift`操作在数组开头进行，需要移动所有元素，性能较差（尤其是大型数组）
- `splice`在数组中间操作，也需要移动元素，性能取决于数组大小和操作位置
- `concat`和`slice`会创建新数组，可能增加内存使用
- 对于频繁的添加/删除操作，考虑使用链表等数据结构替代数组

### 排序方法

排序方法用于对数组元素进行排序或反转操作，是数据处理中不可或缺的功能。JavaScript提供了内置的排序方法，同时也支持自定义排序逻辑。

```javascript
var numbers = [3, 1, 4, 1, 5, 9, 2, 6];
var fruits = ["香蕉", "苹果", "橙子", "葡萄"];
```

#### sort方法

`sort`方法用于对数组元素进行排序，并返回排序后的数组。**注意：sort方法会修改原数组。**

##### 默认排序规则

默认情况下，`sort`方法按字符串的Unicode码点顺序排序，这可能会导致数字排序不符合预期。

```javascript
// 默认排序（按字符串Unicode码点）
numbers.sort();
console.log(numbers); // [1, 1, 2, 3, 4, 5, 6, 9]

// 数字排序的意外结果
var mixedNumbers = [10, 5, 100, 50];
mixedNumbers.sort();
console.log(mixedNumbers); // [10, 100, 5, 50] // 按字符串而非数值排序
```

##### 自定义排序函数

为了实现更灵活的排序（如数值排序、对象排序等），可以提供一个自定义排序函数作为`sort`方法的参数。排序函数接受两个参数(a, b)，并根据返回值确定排序顺序：
- 返回值小于0：a排在b前面
- 返回值等于0：a和b的相对位置不变
- 返回值大于0：b排在a前面

```javascript
// 数值升序排序
numbers.sort(function(a, b) {
  return a - b;
});
console.log(numbers); // [1, 1, 2, 3, 4, 5, 6, 9]

// 数值降序排序
numbers.sort(function(a, b) {
  return b - a;
});
console.log(numbers); // [9, 6, 5, 4, 3, 2, 1, 1]

// 字符串排序（按拼音字母顺序）
fruits.sort();
console.log(fruits); // ["苹果", "橙子", "葡萄", "香蕉"]

// 自定义字符串排序（不区分大小写）
var words = ["Apple", "banana", "Orange", "grape"];
words.sort(function(a, b) {
  var lowerA = a.toLowerCase();
  var lowerB = b.toLowerCase();
  if (lowerA < lowerB) return -1;
  if (lowerA > lowerB) return 1;
  return 0;
});
console.log(words); // ["Apple", "banana", "grape", "Orange"]
```

##### 对象排序

当排序对象数组时，可以根据对象的某个属性进行排序。

```javascript
// 按对象属性排序
var users = [
  { name: "张三", age: 25 },
  { name: "李四", age: 30 },
  { name: "王五", age: 22 }
];

// 按年龄升序排序
users.sort(function(a, b) {
  return a.age - b.age;
});
console.log(users);
// [
//   { name: "王五", age: 22 },
//   { name: "张三", age: 25 },
//   { name: "李四", age: 30 }
// ]

// 按姓名排序
users.sort(function(a, b) {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
});
console.log(users);
// [
//   { name: "张三", age: 25 },
//   { name: "李四", age: 30 },
//   { name: "王五", age: 22 }
// ]
```

#### reverse方法

`reverse`方法用于反转数组中元素的顺序，并返回反转后的数组。**注意：reverse方法也会修改原数组。**

```javascript
// reverse - 反转数组
numbers.reverse();
console.log(numbers); // [1, 1, 2, 3, 4, 5, 6, 9]

// 实际应用：倒序显示数据
var timeline = [
  { year: 2010, event: "成立公司" },
  { year: 2015, event: "推出产品" },
  { year: 2020, event: "上市" }
];
timeline.reverse();
console.log(timeline);
// [
//   { year: 2020, event: "上市" },
//   { year: 2015, event: "推出产品" },
//   { year: 2010, event: "成立公司" }
// ]
```

#### 排序的稳定性

JavaScript的`sort`方法实现并不保证排序的稳定性。稳定性指的是相等元素在排序后的相对顺序是否保持不变。

```javascript
// 不稳定排序的示例
var items = [
  { id: 1, value: 3 },
  { id: 2, value: 1 },
  { id: 3, value: 3 },
  { id: 4, value: 2 }
];

// 按value排序
items.sort(function(a, b) {
  return a.value - b.value;
});
console.log(items);
// 可能的输出（id为1和3的元素顺序可能互换）:
// [
//   { id: 2, value: 1 },
//   { id: 4, value: 2 },
//   { id: 1, value: 3 },
//   { id: 3, value: 3 }
// ]
```

#### 多条件排序

在实际应用中，经常需要根据多个条件进行排序。

```javascript
// 多条件排序示例
var products = [
  { name: "手机", price: 3999, sales: 1000 },
  { name: "电脑", price: 5999, sales: 500 },
  { name: "平板", price: 2999, sales: 800 },
  { name: "手表", price: 1999, sales: 1200 }
];

// 先按销量降序，再按价格升序
products.sort(function(a, b) {
  if (a.sales !== b.sales) {
    return b.sales - a.sales;
  } else {
    return a.price - b.price;
  }
});
console.log(products);
// [
//   { name: "手表", price: 1999, sales: 1200 },
//   { name: "手机", price: 3999, sales: 1000 },
//   { name: "平板", price: 2999, sales: 800 },
//   { name: "电脑", price: 5999, sales: 500 }
// ]
```

#### 自定义排序算法实现

除了使用内置的`sort`方法，我们也可以手动实现一些常见的排序算法。

```javascript
// 冒泡排序实现
function bubbleSort(arr) {
  var arrCopy = arr.slice(); // 复制数组，不修改原数组
  var len = arrCopy.length;
  for (var i = 0; i < len - 1; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
      if (arrCopy[j] > arrCopy[j + 1]) {
        // 交换元素
        var temp = arrCopy[j];
        arrCopy[j] = arrCopy[j + 1];
        arrCopy[j + 1] = temp;
      }
    }
  }
  return arrCopy;
}

// 快速排序实现
function quickSort(arr) {
  if (arr.length <= 1) return arr.slice();
  var pivot = arr[0];
  var left = [];
  var right = [];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right));
}

// 使用自定义排序算法
var unsortedArray = [5, 3, 8, 4, 2];
var bubbleSorted = bubbleSort(unsortedArray);
var quickSorted = quickSort(unsortedArray);
console.log("原数组:", unsortedArray);
console.log("冒泡排序:", bubbleSorted);
console.log("快速排序:", quickSorted);
```

#### 排序的性能考量

- JavaScript的`sort`方法在不同浏览器中实现可能不同（通常是快速排序或归并排序的变体）
- 对于小型数组，排序性能差异不明显
- 对于大型数组，自定义排序函数的效率会影响整体性能
- 排序操作会修改原数组，如需保留原数组，应先复制再排序
- 避免在排序函数中执行复杂操作，尽量保持简单

### 实际应用场景

```javascript
// 示例1：对表格数据进行排序
function sortTableData(data, column, order) {
  var sortedData = data.slice(); // 复制数组
  sortedData.sort(function(a, b) {
    if (order === 'asc') {
      return a[column] > b[column] ? 1 : -1;
    } else {
      return a[column] < b[column] ? 1 : -1;
    }
  });
  return sortedData;
}

// 示例2：对数据进行分页前排序
var allData = [/* 大量数据 */];
var sortedData = allData.sort(function(a, b) {
  return a.date - b.date;
});
var pageSize = 10;
var page = 1;
var paginatedData = sortedData.slice((page - 1) * pageSize, page * pageSize);
```

### 其他方法

除了前面介绍的遍历、操作和排序方法外，JavaScript还提供了一些其他实用的数组方法。

```javascript
var numbers = [1, 2, 3, 4, 5];
var mixed = [1, "hello", true, null, undefined];
```

#### join

`join`方法将数组中的所有元素连接成一个字符串，可以指定分隔符。

```javascript
// join - 将数组元素连接成字符串
var numberString = numbers.join(", ");
console.log(numberString); // "1, 2, 3, 4, 5"

// 使用不同的分隔符
var hyphenated = numbers.join("-");
console.log(hyphenated); // "1-2-3-4-5"

// 不使用分隔符
var noSeparator = numbers.join("");
console.log(noSeparator); // "12345"

// 实际应用：构建SQL查询语句
var ids = [1, 2, 3, 4, 5];
var sql = "SELECT * FROM users WHERE id IN (" + ids.join(", ") + ")";
console.log(sql); // "SELECT * FROM users WHERE id IN (1, 2, 3, 4, 5)"
```

#### indexOf

`indexOf`方法返回元素在数组中第一次出现的索引，如果不存在则返回-1。

```javascript
// indexOf - 返回元素在数组中第一次出现的索引
console.log(numbers.indexOf(3)); // 2
console.log(numbers.indexOf(6)); // -1

// 从指定位置开始查找
console.log(numbers.indexOf(1, 1)); // -1 (从索引1开始查找1)

// 实际应用：查找并替换
function replaceFirstOccurrence(arr, search, replacement) {
  var index = arr.indexOf(search);
  if (index !== -1) {
    arr.splice(index, 1, replacement);
  }
  return arr;
}
var fruits = ["苹果", "香蕉", "橙子", "香蕉"];
replaceFirstOccurrence(fruits, "香蕉", "猕猴桃");
console.log(fruits); // ["苹果", "猕猴桃", "橙子", "香蕉"]
```

#### lastIndexOf

`lastIndexOf`方法返回元素在数组中最后一次出现的索引，如果不存在则返回-1。

```javascript
// lastIndexOf - 返回元素在数组中最后一次出现的索引
var duplicates = [1, 2, 3, 2, 1];
console.log(duplicates.lastIndexOf(1)); // 4
console.log(duplicates.lastIndexOf(2)); // 3
console.log(duplicates.lastIndexOf(6)); // -1

// 从指定位置向前查找
console.log(duplicates.lastIndexOf(2, 2)); // 1 (从索引2开始向前查找2)

// 实际应用：查找最后一个匹配项
function removeLastOccurrence(arr, search) {
  var index = arr.lastIndexOf(search);
  if (index !== -1) {
    arr.splice(index, 1);
  }
  return arr;
}
removeLastOccurrence(fruits, "香蕉");
console.log(fruits); // ["苹果", "猕猴桃", "橙子"]
```

#### isArray

`Array.isArray`方法用于检查一个值是否为数组。

```javascript
// isArray - 检查是否是数组
console.log(Array.isArray(numbers)); // true
console.log(Array.isArray({})); // false
console.log(Array.isArray("array")); // false
console.log(Array.isArray(null)); // false

// 实际应用：类型检查
function processData(data) {
  if (Array.isArray(data)) {
    console.log("处理数组数据");
    // 数组处理逻辑
  } else {
    console.log("处理非数组数据");
    // 非数组处理逻辑
  }
}
processData([1, 2, 3]); // 处理数组数据
processData({ id: 1 }); // 处理非数组数据
```

#### 传统方式实现flat功能

`flat`方法用于将嵌套数组展平，在ES5中我们可以手动实现这个功能。

```javascript
function flat(arr, depth) {
  depth = depth || 1;
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i]) && depth > 0) {
      result = result.concat(flat(arr[i], depth - 1));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

var nestedArray = [1, [2, 3], [4, [5]]];
var flatArray = flat(nestedArray);
console.log(flatArray); // [1, 2, 3, 4, [5]]
var deeplyFlatArray = flat(nestedArray, 2);
console.log(deeplyFlatArray); // [1, 2, 3, 4, 5]

// 实际应用：展平菜单结构
var menu = [
  { name: '首页', url: '/' },
  { name: '产品', url: '/products', submenu: [
    { name: '产品1', url: '/products/1' },
    { name: '产品2', url: '/products/2', submenu: [
      { name: '配件', url: '/products/2/accessories' }
    ]}
  ]},
  { name: '关于我们', url: '/about' }
];

// 提取所有URL
function extractUrls(items) {
  var urls = [];
  flat(items, Infinity).forEach(function(item) {
    if (item && item.url) {
      urls.push(item.url);
    }
  });
  return urls;
}

var allUrls = extractUrls(menu);
console.log(allUrls); // ['/', '/products', '/products/1', '/products/2', '/products/2/accessories', '/about']
```

#### 传统方式实现flatMap功能

`flatMap`方法结合了`map`和`flat`的功能，在ES5中我们可以手动实现。

```javascript
function flatMap(arr, callback) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    var mapped = callback(arr[i], i, arr);
    if (Array.isArray(mapped)) {
      result = result.concat(mapped);
    } else {
      result.push(mapped);
    }
  }
  return result;
}

var nestedArray = [1, [2, 3], [4, [5]]];
var doubledAndFlattened = flatMap(nestedArray, function(arr) {
  if (Array.isArray(arr)) {
    return arr.map(function(item) {
      return item * 2;
    });
  }
  return arr * 2;
});
console.log(doubledAndFlattened); // [2, 4, 6, 8, 10]

// 实际应用：处理购物车数据
var cart = [
  { product: '苹果', quantity: 3, price: 5 },
  { product: '香蕉', quantity: 2, price: 3 },
  { product: '橙子', quantity: 4, price: 4 }
];

// 生成订单项目明细
var orderItems = flatMap(cart, function(item) {
  var items = [];
  for (var i = 0; i < item.quantity; i++) {
    items.push({
      product: item.product,
      price: item.price,
      itemNumber: i + 1
    });
  }
  return items;
});

console.log(orderItems);
// [
//   { product: '苹果', price: 5, itemNumber: 1 },
//   { product: '苹果', price: 5, itemNumber: 2 },
//   { product: '苹果', price: 5, itemNumber: 3 },
//   { product: '香蕉', price: 3, itemNumber: 1 },
//   { product: '香蕉', price: 3, itemNumber: 2 },
//   { product: '橙子', price: 4, itemNumber: 1 },
//   { product: '橙子', price: 4, itemNumber: 2 },
//   { product: '橙子', price: 4, itemNumber: 3 },
//   { product: '橙子', price: 4, itemNumber: 4 }
// ]
```

### 数组方法的性能对比与选择

- 对于频繁的添加/删除操作，优先使用`push`和`pop`，避免使用`unshift`和`shift`
- 对于查找操作，`indexOf`和`lastIndexOf`的时间复杂度为O(n)，大型数组可以考虑使用哈希表优化
- 对于需要保持原数组不变的操作，使用`slice`、`concat`等方法创建副本
- 对于复杂的数据处理，组合使用多种数组方法可以提高代码可读性和效率
- 在处理大型数组时，考虑算法的时间复杂度，避免不必要的嵌套循环

## 数组迭代

数组迭代是指按顺序访问数组中的每个元素并对其进行处理的过程。在JavaScript中，有多种方式可以实现数组迭代，每种方式都有其适用场景和特点。

### 传统for循环遍历

传统for循环是最基础也是最灵活的数组迭代方式，可以通过索引访问和修改数组元素。

```javascript
var numbers = [1, 2, 3, 4, 5];

// 传统for循环遍历索引
for (var i = 0; i < numbers.length; i++) {
  console.log("索引 " + i + ": " + numbers[i]); // 0: 1, 1: 2, 2: 3, 3: 4, 4: 5
}

// 传统for循环遍历值
for (var i = 0; i < numbers.length; i++) {
  console.log(numbers[i]); // 1, 2, 3, 4, 5
}

// 倒序遍历
for (var i = numbers.length - 1; i >= 0; i--) {
  console.log(numbers[i]); // 5, 4, 3, 2, 1
}

// 实际应用：修改数组元素
for (var i = 0; i < numbers.length; i++) {
  numbers[i] = numbers[i] * 2; // 将每个元素乘以2
}
console.log(numbers); // [2, 4, 6, 8, 10]
```

### for...in循环遍历

`for...in`循环主要用于遍历对象的属性，但也可以用于遍历数组的索引。使用时需要注意过滤掉原型链上的属性。

```javascript
var numbers = [1, 2, 3, 4, 5];

// for...in循环遍历索引
for (var key in numbers) {
  if (numbers.hasOwnProperty(key)) {
    console.log(key + ": " + numbers[key]); // 0: 1, 1: 2, 2: 3, 3: 4, 4: 5
  }
}

// 实际应用：检查数组中是否存在偶数
var hasEven = false;
for (var key in numbers) {
  if (numbers.hasOwnProperty(key)) {
    if (numbers[key] % 2 === 0) {
      hasEven = true;
      break; // 找到后立即退出循环
    }
  }
}
console.log(hasEven); // true

// 注意：for...in不保证遍历顺序
// 不建议在需要严格顺序的场景下使用for...in遍历数组
```

### 自定义迭代函数

除了内置的迭代方式，我们还可以创建自定义的迭代函数来处理特殊需求。

```javascript
// 自定义forEach函数
function forEach(arr, callback) {
  for (var i = 0; i < arr.length; i++) {
    callback(arr[i], i, arr);
  }
}

var fruits = ["苹果", "香蕉", "橙子"];
forEach(fruits, function(fruit, index) {
  console.log("第" + (index + 1) + "个水果：" + fruit);
});
// 输出：
// 第1个水果：苹果
// 第2个水果：香蕉
// 第3个水果：橙子

// 自定义map函数
function map(arr, callback) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    result.push(callback(arr[i], i, arr));
  }
  return result;
}

var doubledNumbers = map(numbers, function(num) {
  return num * 2;
});
console.log(doubledNumbers); // [4, 8, 12, 16, 20]
```

### 遍历对象数组

在实际开发中，我们经常需要遍历包含对象的数组。

```javascript
var users = [
  { id: 1, name: "张三", age: 25 },
  { id: 2, name: "李四", age: 30 },
  { id: 3, name: "王五", age: 35 }
];

// 遍历对象数组并显示信息
for (var i = 0; i < users.length; i++) {
  console.log("ID: " + users[i].id + ", 姓名: " + users[i].name + ", 年龄: " + users[i].age);
}

// 实际应用：查找特定用户
function findUserById(users, id) {
  for (var i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      return users[i];
    }
  }
  return null;
}

var user = findUserById(users, 2);
console.log(user); // { id: 2, name: "李四", age: 30 }

// 实际应用：筛选满足条件的用户
function filterUsersByAge(users, minAge) {
  var result = [];
  for (var i = 0; i < users.length; i++) {
    if (users[i].age >= minAge) {
      result.push(users[i]);
    }
  }
  return result;
}

var adults = filterUsersByAge(users, 30);
console.log(adults); // [{ id: 2, name: "李四", age: 30 }, { id: 3, name: "王五", age: 35 }]
```

### 迭代中的常见问题与注意事项

```javascript
// 问题1：在迭代中修改数组长度
var arr = [1, 2, 3, 4, 5];
for (var i = 0; i < arr.length; i++) {
  if (arr[i] % 2 === 0) {
    arr.splice(i, 1); // 删除偶数
    i--; // 调整索引以避免跳过元素
  }
}
console.log(arr); // [1, 3, 5]

// 问题2：使用for...in遍历数组的潜在问题
Array.prototype.customMethod = function() {};
var numbers = [1, 2, 3];

for (var key in numbers) {
  // 不使用hasOwnProperty会遍历到原型链上的属性
  console.log(key); // 0, 1, 2, customMethod
}

// 问题3：浮点数索引问题
var arr = [];
arr[1.5] = "hello";
console.log(arr.length); // 2 (数组长度取最大整数索引+1)
console.log(arr[1.5]); // "hello"

// 注意：避免使用非整数作为数组索引
```

### 迭代性能对比

- **传统for循环**：性能最佳，特别是在需要精确控制迭代过程时
- **for...in循环**：性能较差，因为需要遍历原型链上的属性
- **自定义迭代函数**：性能略低于传统for循环，但代码可读性更好
- **遍历大型数组**：考虑使用临时变量存储数组长度以提高性能

```javascript
// 性能优化示例
var largeArray = new Array(1000000).fill(0);

// 未优化版本
console.time("未优化");
for (var i = 0; i < largeArray.length; i++) {
  largeArray[i] = i;
}
console.timeEnd("未优化");

// 优化版本：缓存数组长度
console.time("优化");
for (var i = 0, len = largeArray.length; i < len; i++) {
  largeArray[i] = i;
}
console.timeEnd("优化");
```

### 实际应用场景

1. **数据转换**：将数组中的数据转换为另一种格式
2. **数据过滤**：筛选出满足特定条件的元素
3. **数据聚合**：计算总和、平均值等统计信息
4. **DOM操作**：根据数组数据动态生成HTML元素
5. **事件处理**：为数组中的元素绑定事件监听器
```