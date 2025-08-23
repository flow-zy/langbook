# JSON 对象

JSON（JavaScript Object Notation）是一种轻量级的数据交换格式，易于人阅读和编写，同时也易于机器解析和生成。在ES5中，JavaScript提供了内置的`JSON`对象来处理JSON数据。

## JSON 基本语法

JSON数据格式支持以下几种类型：

1. **对象**：用花括号`{}`包围的键值对集合
2. **数组**：用方括号`[]`包围的值列表
3. **基本类型**：字符串、数字、布尔值、null

```json
{
  "name": "John",
  "age": 30,
  "isStudent": false,
  "hobbies": ["reading", "coding", "gaming"],
  "address": {
    "city": "New York",
    "country": "USA"
  },
  "nullValue": null
}
```

## JSON 对象的方法

ES5提供了两个主要方法来处理JSON数据：

### JSON.parse()

`JSON.parse()`方法用于将JSON字符串转换为JavaScript对象。

```javascript
// 基本用法
const jsonString = '{"name": "John", "age": 30}';
const obj = JSON.parse(jsonString);
console.log(obj.name); // "John"
console.log(obj.age); // 30
```

#### 可选参数 reviver

`JSON.parse()`接受一个可选的reviver函数参数，用于在解析过程中转换结果。

```javascript
const jsonString = '{"name": "John", "age": 30, "birthDate": "1993-01-01"}';
const obj = JSON.parse(jsonString, function(key, value) {
  if (key === 'birthDate') {
    return new Date(value);
  }
  return value;
});
console.log(obj.birthDate); // Date对象
```

### JSON.stringify()

`JSON.stringify()`方法用于将JavaScript对象转换为JSON字符串。

```javascript
// 基本用法
const obj = { name: "John", age: 30 };
const jsonString = JSON.stringify(obj);
console.log(jsonString); // "{"name":"John","age":30}"
```

#### 可选参数 replacer

`JSON.stringify()`接受一个可选的replacer参数，可以是数组或函数，用于控制哪些属性被包含在结果中以及如何转换它们。

```javascript
// 使用数组作为replacer
const obj = { name: "John", age: 30, address: "New York" };
const jsonString = JSON.stringify(obj, ['name', 'age']);
console.log(jsonString); // "{"name":"John","age":30}"

// 使用函数作为replacer
const jsonString2 = JSON.stringify(obj, function(key, value) {
  if (key === 'address') {
    return undefined; // 排除address属性
  }
  if (key === 'age') {
    return value + 1; // 修改age属性
  }
  return value;
});
console.log(jsonString2); // "{"name":"John","age":31}"
```

#### 可选参数 space

`JSON.stringify()`还接受一个可选的space参数，用于控制输出的缩进格式。

```javascript
const obj = { name: "John", age: 30, hobbies: ["reading", "coding"] };
const jsonString = JSON.stringify(obj, null, 2); // 使用2个空格缩进
console.log(jsonString);
/*
{
  "name": "John",
  "age": 30,
  "hobbies": [
    "reading",
    "coding"
  ]
}
*/
```

## 序列化规则

使用`JSON.stringify()`时，有一些特殊的序列化规则：

1. **undefined**：会被忽略或转换为`null`（取决于上下文）
2. **函数**：会被忽略
3. **Symbol**：会被忽略
4. **循环引用**：会抛出错误
5. **Date对象**：会被转换为ISO格式的字符串
6. **RegExp对象**：会被转换为空对象`{}`

```javascript
console.log(JSON.stringify(undefined)); // undefined
console.log(JSON.stringify(function() {})); // undefined
console.log(JSON.stringify({ a: undefined, b: function() {}, c: Symbol('sym') })); // "{}"
console.log(JSON.stringify(new Date())); // ISO格式的日期字符串
console.log(JSON.stringify(/regex/)); // "{}"
```

## 常见问题与解决方案

### 循环引用问题

当对象中存在循环引用时，`JSON.stringify()`会抛出错误。可以使用replacer函数来处理：

```javascript
function stringifyWithCircular(obj) {
  const seen = new WeakSet();
  return JSON.stringify(obj, function(key, value) {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return '[Circular]';
      }
      seen.add(value);
    }
    return value;
  });
}
```

### 处理特殊值

可以使用replacer函数来处理undefined、函数等特殊值：

```javascript
function stringifyWithSpecialValues(obj) {
  return JSON.stringify(obj, function(key, value) {
    if (typeof value === 'undefined') {
      return 'undefined';
    }
    if (typeof value === 'function') {
      return value.toString();
    }
    if (typeof value === 'symbol') {
      return value.toString();
    }
    return value;
  });
}
```

## 兼容性

`JSON`对象在所有现代浏览器中都得到支持，但在IE8及以下版本中可能存在兼容性问题。可以使用JSON2.js等polyfill库来解决兼容性问题。

## 总结

JSON是一种重要的数据交换格式，`JSON`对象提供了`parse()`和`stringify()`两个方法来处理JSON数据。掌握这些方法的使用及其相关特性，对于处理前后端数据交互、本地数据存储等场景非常重要。