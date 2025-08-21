# Set 和 Map 数据结构

ES6引入了两种强大的新数据结构：Set（集合）和Map（映射）。在ES6之前，JavaScript开发者主要依赖数组和对象来存储数据，但这些数据结构在某些场景下存在明显的局限性。Set和Map的出现，为JavaScript带来了更高效、更灵活的数据组织和管理方式。

## 设计目标与核心价值

传统JavaScript中，数组和对象作为主要数据结构存在一些不足：
- 数组无法高效地检查元素是否存在或快速删除重复元素
- 对象的键只能是字符串或Symbol，无法使用其他类型的值作为键
- 对象没有原生的迭代机制，需要通过额外的方法遍历属性
- 数组和对象都没有提供专门的API来管理数据集合

Set和Map正是为了解决这些问题而设计的：
- **Set**：提供了一种存储唯一值的集合，支持高效的添加、删除和查找操作
- **Map**：提供了一种键值对映射结构，允许任何类型的值作为键，同时保持插入顺序
- 两者都原生支持迭代，可以直接使用`for...of`循环遍历
- 提供了专门的API来管理数据，如`add()`、`delete()`、`has()`等

这些新的数据结构不仅增强了JavaScript的表达能力，也提高了代码的可读性和性能。无论是处理唯一值集合、存储键值对数据，还是管理对象的元数据，Set和Map都能提供更优雅的解决方案。

## Set

Set是一种无序的集合数据结构，它允许存储任何类型的值（包括原始类型和引用类型），但不允许重复。Set中的元素是唯一的，这使得它非常适合需要存储不重复值的场景。

### 基本用法

创建Set的方式有多种：

```javascript
// 1. 创建空Set
const emptySet = new Set();

// 2. 通过数组初始化Set
const numberSet = new Set([1, 2, 3, 3, 4]); // 自动去重，结果为 {1, 2, 3, 4}

// 3. 通过字符串初始化Set（会将字符串拆分为单个字符）
const charSet = new Set('hello'); // {h, e, l, o}

// 4. 添加不同类型的元素
const mixedSet = new Set();
mixedSet.add(1);
mixedSet.add('hello');
mixedSet.add({ name: 'John' });
mixedSet.add(true);
mixedSet.add(1); // 重复元素，不会被添加

console.log(mixedSet.size); // 4
```

### 常用方法

#### 1. add(value)

添加一个元素到Set中，返回Set本身，支持链式调用。

```javascript
const set = new Set();
set.add(1).add(2).add(3); // 链式调用
console.log(set.size); // 3

// 添加对象时，即使内容相同，不同的对象引用也被视为不同的值
const obj1 = { name: 'Alice' };
const obj2 = { name: 'Alice' };
set.add(obj1).add(obj2);
console.log(set.size); // 5
```

#### 2. delete(value)

删除Set中的一个元素，返回布尔值表示是否删除成功。

```javascript
const set = new Set([1, 2, 3]);
console.log(set.delete(2)); // true
console.log(set.size); // 2
console.log(set.delete(4)); // false，元素不存在
```

#### 3. has(value)

检查Set中是否存在指定元素，返回布尔值。对于对象，检查的是引用相等性。

```javascript
const set = new Set([1, 2, 3, { name: 'John' }]);
console.log(set.has(2)); // true
console.log(set.has(4)); // false

const obj = { name: 'John' };
console.log(set.has(obj)); // false，因为不是同一个对象引用
```

#### 4. clear()

清空Set中的所有元素，没有返回值。

```javascript
const set = new Set([1, 2, 3]);
set.clear();
console.log(set.size); // 0
```

#### 5. size属性

返回Set中元素的数量。

```javascript
const set = new Set([1, 2, 3]);
console.log(set.size); // 3
```

#### 6. 遍历方法

Set提供了多种遍历方法，所有方法都保持元素的插入顺序：

- `keys()`：返回键名的迭代器（对于Set，键名和键值相同）
- `values()`：返回键值的迭代器
- `entries()`：返回键值对的迭代器（每个键值对的键和值相同）
- `forEach()`：使用回调函数遍历每个元素

```javascript
const set = new Set([1, 2, 3]);

// 使用values()遍历
for (const value of set.values()) {
  console.log(value); // 1, 2, 3
}

// 使用entries()遍历
for (const [key, value] of set.entries()) {
  console.log(`${key}: ${value}`); // 1: 1, 2: 2, 3: 3
}

// 使用forEach
set.forEach((value, key, set) => {
  console.log(`${key}: ${value}`); // 1: 1, 2: 2, 3: 3
});

// 直接使用for...of遍历（等价于遍历values()）
for (const value of set) {
  console.log(value); // 1, 2, 3
}
```

### 应用场景

#### 1. 数组去重

这是Set最常见的应用场景之一：

```javascript
const array = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4];
const uniqueArray = [...new Set(array)];
console.log(uniqueArray); // [1, 2, 3, 4]

// 对于包含对象的数组，Set无法直接去重（因为对象引用不同）
// 需要自定义去重逻辑
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Alice' },
  { id: 1, name: 'John' }
];
const uniqueUsers = [...new Map(users.map(user => [user.id, user])).values()];
console.log(uniqueUsers); // [{ id: 1, name: 'John' }, { id: 2, name: 'Alice' }]
```

#### 2. 存储不重复的元素

```javascript
// 存储用户ID，确保不重复
const userIds = new Set();
function addUserId(id) {
  if (userIds.has(id)) {
    console.log(`用户ID ${id} 已存在`);
    return false;
  }
  userIds.add(id);
  console.log(`用户ID ${id} 添加成功`);
  return true;
}

addUserId('id1'); // 用户ID id1 添加成功
addUserId('id2'); // 用户ID id2 添加成功
addUserId('id1'); // 用户ID id1 已存在
console.log(userIds.size); // 2
```

#### 3. 字符串去重

```javascript
const str = 'hello world';
const uniqueChars = [...new Set(str)].join('');
console.log(uniqueChars); // 'helo wrd'
```

#### 4. 集合操作

利用Set可以实现数学中的集合操作：

```javascript
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

// 并集
const union = new Set([...setA, ...setB]); // {1, 2, 3, 4, 5, 6}

// 交集
const intersection = new Set([...setA].filter(x => setB.has(x))); // {3, 4}

// 差集 (setA - setB)
const difference = new Set([...setA].filter(x => !setB.has(x))); // {1, 2}
```

### 注意事项与最佳实践

1. **值的比较**：Set使用"SameValueZero"算法比较值，这与`===`类似，但`NaN`被视为等于自身。
   ```javascript
   const set = new Set([NaN, NaN]);
   console.log(set.size); // 1，因为NaN被视为等于自身
   ```

2. **对象引用**：Set存储的是对象引用，而不是对象的值。两个内容相同但引用不同的对象会被视为不同的值。

3. **内存管理**：Set会保持对添加的对象的强引用，这意味着即使这些对象不再被其他地方引用，它们也不会被垃圾回收。如果需要存储对象但又不想阻止垃圾回收，可以使用WeakSet。

4. **性能考量**：Set在添加、删除和查找元素时的时间复杂度为O(1)，比数组的O(n)操作更高效，特别适合需要频繁进行这些操作的场景。

5. **转换为数组**：使用扩展运算符(`...`)可以轻松地将Set转换为数组，这在需要使用数组方法时非常有用。

6. **遍历顺序**：Set保持元素的插入顺序，这意味着遍历Set时会按照元素添加的顺序返回。

## Map

Map是一种键值对的集合数据结构，它允许任何类型的值（包括原始类型和引用类型）作为键，并且保持插入顺序。与对象相比，Map提供了更灵活的键值对管理方式，特别是当键不是字符串或Symbol时。

### 基本用法

创建Map的方式有多种：

```javascript
// 1. 创建空Map
const emptyMap = new Map();

// 2. 通过二维数组初始化Map
const userMap = new Map([
  ['name', 'John'],
  [1, 'one'],
  [{ id: 1 }, 'user object'],
  [true, 'boolean key']
]);
console.log(userMap.size); // 4
console.log(userMap.get('name')); // 'John'

// 3. 动态添加键值对
const map = new Map();
map.set('name', 'John');
map.set(1, 'one');
map.set({ id: 1 }, 'object key');

console.log(map.size); // 3
console.log(map.get('name')); // 'John'
```

### 常用方法

#### 1. set(key, value)

添加一个键值对到Map中，返回Map本身，支持链式调用。

```javascript
const map = new Map();
map.set('name', 'John').set('age', 30).set('city', 'New York'); // 链式调用
console.log(map.size); // 3

// 键可以是任何类型
const objKey = { id: 1 };
const funcKey = () => console.log('Hello');
map.set(objKey, 'object value');
map.set(funcKey, 'function value');
console.log(map.size); // 5
```

#### 2. get(key)

获取Map中指定键的值，如果不存在，返回undefined。对于对象键，比较的是引用相等性。

```javascript
const map = new Map([['name', 'John'], [{ id: 1 }, 'user']]);
console.log(map.get('name')); // 'John'
console.log(map.get('age')); // undefined

const obj = { id: 1 };
console.log(map.get(obj)); // undefined，因为不是同一个对象引用
```

#### 3. delete(key)

删除Map中指定键的键值对，返回布尔值表示是否删除成功。

```javascript
const map = new Map([['name', 'John'], ['age', 30], ['city', 'New York']]);
console.log(map.delete('age')); // true
console.log(map.size); // 2
console.log(map.delete('address')); // false，键不存在
```

#### 4. has(key)

检查Map中是否存在指定键，返回布尔值。对于对象键，比较的是引用相等性。

```javascript
const map = new Map([['name', 'John'], [{ id: 1 }, 'user']]);
console.log(map.has('name')); // true
console.log(map.has('age')); // false

const obj = { id: 1 };
console.log(map.has(obj)); // false，因为不是同一个对象引用
```

#### 5. clear()

清空Map中的所有键值对，没有返回值。

```javascript
const map = new Map([['name', 'John'], ['age', 30]]);
map.clear();
console.log(map.size); // 0
```

#### 6. size属性

返回Map中键值对的数量。

```javascript
const map = new Map([['name', 'John'], ['age', 30]]);
console.log(map.size); // 2
```

#### 7. 遍历方法

Map提供了多种遍历方法，所有方法都保持键值对的插入顺序：

- `keys()`：返回键名的迭代器
- `values()`：返回键值的迭代器
- `entries()`：返回键值对的迭代器
- `forEach()`：使用回调函数遍历每个键值对

```javascript
const map = new Map([['name', 'John'], ['age', 30], ['city', 'New York']]);

// 使用keys()遍历
for (const key of map.keys()) {
  console.log(key); // 'name', 30, 'city'
}

// 使用values()遍历
for (const value of map.values()) {
  console.log(value); // 'John', 30, 'New York'
}

// 使用entries()遍历
for (const [key, value] of map.entries()) {
  console.log(`${key}: ${value}`); // 'name: John', 'age: 30', 'city: New York'
}

// 直接使用for...of遍历（等价于遍历entries()）
for (const [key, value] of map) {
  console.log(`${key}: ${value}`); // 'name: John', 'age: 30', 'city: New York'
}

// 使用forEach
map.forEach((value, key, map) => {
  console.log(`${key}: ${value}`); // 'name: John', 'age: 30', 'city: New York'
});
```

### 应用场景

#### 1. 存储对象的元数据

Map允许以对象为键，非常适合存储对象的元数据：

```javascript
const user1 = { id: 1, name: 'John' };
const user2 = { id: 2, name: 'Alice' };
const metadata = new Map();

metadata.set(user1, { createdAt: new Date(), role: 'admin' });
metadata.set(user2, { createdAt: new Date(), role: 'user' });

console.log(metadata.get(user1).role); // 'admin'
console.log(metadata.get(user2).createdAt); // 当前日期
```

#### 2. 缓存数据

Map可以作为高效的缓存实现：

```javascript
const cache = new Map();
const CACHE_EXPIRY = 5 * 60 * 1000; // 5分钟

function fetchData(id) {
  // 检查缓存是否存在且未过期
  if (cache.has(id)) {
    const cachedData = cache.get(id);
    if (Date.now() - cachedData.timestamp < CACHE_EXPIRY) {
      console.log('从缓存获取数据');
      return cachedData.data;
    }
    // 缓存已过期，删除
    cache.delete(id);
  }

  // 模拟从服务器获取数据
  console.log('从服务器获取数据');
  const data = { id, value: `数据${id}` };
  cache.set(id, { data, timestamp: Date.now() });
  return data;
}

fetchData(1); // '从服务器获取数据'
fetchData(1); // '从缓存获取数据'
// 5分钟后
// fetchData(1); // '从服务器获取数据'
```

#### 3. 替代对象作为字典

当键不是字符串时，Map比对象更适合作为字典：

```javascript
// 使用对象作为键
const key1 = { id: 1 };
const key2 = { id: 2 };

// 如果使用对象
const objDict = {};
objDict[key1] = 'value1'; // 键会被转换为字符串 '[object Object]'
objDict[key2] = 'value2'; // 会覆盖之前的值
console.log(objDict[key1]); // 'value2'

// 使用Map
const mapDict = new Map();
mapDict.set(key1, 'value1');
mapDict.set(key2, 'value2');
console.log(mapDict.get(key1)); // 'value1'
console.log(mapDict.get(key2)); // 'value2'
```

#### 4. 存储函数

Map可以用于存储和管理函数：

```javascript
const handlers = new Map();

handlers.set('click', (event) => console.log('Click event:', event));
handlers.set('hover', (event) => console.log('Hover event:', event));
handlers.set('submit', (event) => console.log('Submit event:', event));

// 触发事件处理
function triggerEvent(eventType, eventData) {
  if (handlers.has(eventType)) {
    handlers.get(eventType)(eventData);
  }
}

triggerEvent('click', { x: 10, y: 20 }); // 'Click event: { x: 10, y: 20 }'
```

#### 5. 实现多键映射

通过使用数组或对象作为键，可以实现多键映射：

```javascript
// 使用数组作为复合键
const multiKeyMap = new Map();

function getValueByUserAndProduct(userId, productId) {
  const key = [userId, productId];
  return multiKeyMap.get(key);
}

function setValueByUserAndProduct(userId, productId, value) {
  const key = [userId, productId];
  multiKeyMap.set(key, value);
}

setValueByUserAndProduct('user1', 'product1', 42);
console.log(getValueByUserAndProduct('user1', 'product1')); // 42
```

### 注意事项与最佳实践

1. **键的比较**：Map使用"SameValueZero"算法比较键，这与`===`类似，但`NaN`被视为等于自身。
   ```javascript
   const map = new Map();
   map.set(NaN, 'not a number');
   console.log(map.get(NaN)); // 'not a number'
   ```

2. **对象引用**：Map存储的是对象的引用，而不是对象的值。两个内容相同但引用不同的对象会被视为不同的键。

3. **内存管理**：Map会保持对键和值的强引用，这意味着即使这些对象不再被其他地方引用，它们也不会被垃圾回收。如果需要存储对象但又不想阻止垃圾回收，可以使用WeakMap。

4. **性能考量**：Map在添加、删除和查找键值对时的时间复杂度为O(1)，比对象的属性访问略慢，但在频繁添加和删除键值对的场景下更稳定。

5. **转换为对象**：当Map的键都是字符串时，可以将其转换为对象：
   ```javascript
   const map = new Map([['name', 'John'], ['age', 30]]);
   const obj = Object.fromEntries(map);
   console.log(obj); // { name: 'John', age: 30 }
   ```

6. **遍历顺序**：Map保持键值对的插入顺序，这意味着遍历Map时会按照键值对添加的顺序返回。

7. **与对象的选择**：当键主要是字符串且数量有限时，对象可能更适合；当键可以是任何类型、需要频繁添加/删除键值对或需要保持插入顺序时，Map更适合。

## WeakSet 和 WeakMap

ES6还引入了WeakSet和WeakMap，它们是Set和Map的"弱引用"版本，专为特定场景设计。与Set和Map相比，它们具有不同的内存管理特性，特别适合存储临时数据或元数据。

### WeakSet

WeakSet是Set的弱引用版本，它具有以下特点：

1. **只能存储对象**：不能存储原始类型的值
2. **弱引用**：对存储的对象保持弱引用，不会阻止垃圾回收
3. **没有size属性**：无法获取包含的元素数量
4. **不可遍历**：没有提供keys()、values()、entries()等遍历方法
5. **没有clear()方法**：不能一次性清空所有元素

### 基本用法

```javascript
// 创建WeakSet
const weakSet = new WeakSet();

// 添加对象
const obj1 = { id: 1 };
const obj2 = { id: 2 };
weakSet.add(obj1);
weakSet.add(obj2);

// 检查对象是否存在
console.log(weakSet.has(obj1)); // true
console.log(weakSet.has(obj2)); // true
console.log(weakSet.has({ id: 1 })); // false，不同的对象引用

// 删除对象
console.log(weakSet.delete(obj1)); // true
console.log(weakSet.has(obj1)); // false

// 当obj2被设置为null时，该对象可能会被垃圾回收
obj2 = null;
// 此时weakSet.has(obj2)可能返回false(如果对象已被回收)
```

### WeakMap

WeakMap是Map的弱引用版本，它具有以下特点：

1. **键只能是对象**：不能使用原始类型的值作为键
2. **键是弱引用**：对键对象保持弱引用，不会阻止垃圾回收
3. **值可以是任何类型**：与Map相同，值可以是任何类型
4. **不可遍历键**：没有提供keys()、entries()等遍历方法，但可以通过get()访问值
5. **没有size属性**：无法获取键值对的数量
6. **没有clear()方法**：不能一次性清空所有键值对

### 基本用法

```javascript
// 创建WeakMap
const weakMap = new WeakMap();

// 添加键值对
const key1 = { id: 1 };
const key2 = { id: 2 };
weakMap.set(key1, 'value1');
weakMap.set(key2, 'value2');

// 获取值
console.log(weakMap.get(key1)); // 'value1'
console.log(weakMap.get(key2)); // 'value2'
console.log(weakMap.get({ id: 1 })); // undefined，不同的对象引用

// 检查键是否存在
console.log(weakMap.has(key1)); // true

// 删除键值对
console.log(weakMap.delete(key1)); // true
console.log(weakMap.has(key1)); // false

// 当key2被设置为null时，该键可能会被垃圾回收
key2 = null;
// 此时weakMap.get(key2)返回undefined
```

### 应用场景

#### 1. 存储对象的临时数据或元数据

WeakSet和WeakMap特别适用于存储对象的临时数据或元数据，而不会阻止对象被垃圾回收。

```javascript
// 使用WeakMap存储DOM元素的事件处理器
const eventHandlers = new WeakMap();

function addEventHandler(element, event, handler) {
  if (!eventHandlers.has(element)) {
    eventHandlers.set(element, new Map());
  }

  const handlers = eventHandlers.get(element);
  handlers.set(event, handler);
  element.addEventListener(event, handler);
}

function removeEventHandler(element, event) {
  if (eventHandlers.has(element)) {
    const handlers = eventHandlers.get(element);
    if (handlers.has(event)) {
      element.removeEventListener(event, handlers.get(event));
      handlers.delete(event);
    }
  }
}

// 当DOM元素被移除时，相关的事件处理器会被自动清理
```

#### 2. 实现私有属性

WeakMap可以用于实现对象的私有属性，而不污染对象本身：

```javascript
// 使用WeakMap存储私有属性
const privateData = new WeakMap();

class Person {
  constructor(name, age) {
    // 存储私有数据
    privateData.set(this, { name, age });
  }

  getName() {
    return privateData.get(this).name;
  }

  getAge() {
    return privateData.get(this).age;
  }

  setAge(age) {
    privateData.get(this).age = age;
  }
}

const person = new Person('John', 30);
console.log(person.getName()); // 'John'
console.log(person.getAge()); // 30
person.setAge(31);
console.log(person.getAge()); // 31
// 无法直接访问privateData中的数据
console.log(privateData.get(person)); // undefined (在外部作用域中)
```

#### 3. 缓存计算结果

WeakMap可以用于缓存对象的计算结果，当对象不再被引用时，缓存会自动清理：

```javascript
// 使用WeakMap缓存计算结果
const cache = new WeakMap();

function expensiveComputation(obj) {
  if (cache.has(obj)) {
    console.log('从缓存获取结果');
    return cache.get(obj);
  }

  console.log('执行计算');
  // 模拟耗时计算
  const result = Object.values(obj).reduce((sum, value) => sum + value, 0);
  cache.set(obj, result);
  return result;
}

const data = { a: 1, b: 2, c: 3 };
expensiveComputation(data); // '执行计算', 返回 6
expensiveComputation(data); // '从缓存获取结果', 返回 6

// 当data不再被引用时，缓存会被自动清理
data = null;
```

#### 4. 跟踪对象

WeakSet可以用于跟踪对象，而不会阻止它们被垃圾回收：

```javascript
// 使用WeakSet跟踪已处理的对象
const processedObjects = new WeakSet();

function processObject(obj) {
  if (processedObjects.has(obj)) {
    console.log('对象已处理');
    return;
  }

  console.log('处理对象');
  // 处理逻辑
  processedObjects.add(obj);
}

const obj1 = { id: 1 };
const obj2 = { id: 2 };

processObject(obj1); // '处理对象'
processObject(obj1); // '对象已处理'
processObject(obj2); // '处理对象'

// 当obj1不再被引用时，它会从processedObjects中自动移除
obj1 = null;
```

### 注意事项与最佳实践

1. **弱引用特性**：WeakSet和WeakMap的弱引用特性意味着你不能依赖它们来长期存储对象，因为对象可能在任何时候被垃圾回收。

2. **内存管理**：正是由于弱引用特性，WeakSet和WeakMap非常适合存储临时数据，它们不会导致内存泄漏。

3. **不可遍历**：由于不能遍历WeakSet和WeakMap，它们不适合需要迭代所有元素的场景。

4. **键的限制**：WeakSet只能存储对象，WeakMap的键只能是对象，这限制了它们的使用场景。

5. **性能考量**：WeakSet和WeakMap的性能通常比Set和Map略低，但在需要弱引用的场景下是必要的选择。

6. **与Set/Map的选择**：当你需要存储对象并且不想阻止它们被垃圾回收时，选择WeakSet或WeakMap；否则，选择Set或Map。

7. **最佳实践**：使用WeakMap存储与对象相关的元数据，使用WeakSet跟踪对象的状态或标记对象。

## 总结

Set、Map、WeakSet和WeakMap是ES6引入的四种重要数据结构，它们各自具有独特的特性和应用场景，为JavaScript开发者提供了更灵活、更高效的数据管理方式。

### 核心要点回顾

#### Set
- 存储唯一值的集合，支持任何类型的值
- 提供高效的添加、删除和查找操作，时间复杂度为O(1)
- 保持元素的插入顺序，支持多种遍历方式
- 特别适合数组去重、存储不重复元素和实现集合操作

#### Map
- 键值对集合，允许任何类型的值作为键
- 保持键值对的插入顺序，支持多种遍历方式
- 提供高效的添加、删除和查找操作，时间复杂度为O(1)
- 比对象更适合存储非字符串键的键值对数据

#### WeakSet
- Set的弱引用版本，只能存储对象
- 对存储的对象保持弱引用，不会阻止垃圾回收
- 没有size属性，不可遍历
- 适合存储临时对象或标记对象

#### WeakMap
- Map的弱引用版本，键只能是对象
- 对键对象保持弱引用，不会阻止垃圾回收
- 没有size属性，不可遍历键
- 适合存储对象的元数据、实现私有属性和缓存计算结果

### 数据结构选择建议

- **存储唯一值**：选择Set
- **存储键值对且键可能非字符串**：选择Map
- **存储对象且不希望阻止垃圾回收**：选择WeakSet或WeakMap
- **需要遍历所有元素**：选择Set或Map
- **存储临时数据或元数据**：选择WeakSet或WeakMap

### 最佳实践总结

1. 充分利用Set的唯一性特性进行数组去重和存储不重复元素
2. 当键不是字符串时，优先使用Map而非对象
3. 使用扩展运算符(`...`)将Set转换为数组以利用数组方法
4. 使用`Object.fromEntries()`将Map转换为对象（当键都是字符串时）
5. 利用WeakMap实现对象的私有属性，避免污染对象本身
6. 使用WeakSet和WeakMap存储临时数据，避免内存泄漏
7. 注意Set和Map中的对象引用比较，相同内容不同引用的对象会被视为不同的值
8. 在频繁添加和删除键值对的场景下，Map的性能比对象更稳定

这些数据结构的引入，极大地增强了JavaScript的表达能力和性能。合理选择和使用这些数据结构，可以使代码更加简洁、高效和可维护。

Set和Map是ES6引入的两种新的数据结构，它们提供了更高效、更灵活的数据存储和访问方式。Set适用于存储不重复的元素，Map适用于存储键值对。WeakSet和WeakMap是它们的弱引用版本，适用于存储对象的临时数据或元数据，而不会阻止对象被垃圾回收。掌握这些数据结构可以帮助我们更好地解决实际问题。