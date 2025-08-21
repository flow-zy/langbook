# 运算符与流程控制

运算符与流程控制是JavaScript编程的核心基石。运算符用于执行各种操作，从简单的数学计算到复杂的逻辑判断；流程控制则允许我们根据条件决定代码的执行路径，实现程序的灵活性和智能化。本章将详细介绍JavaScript中的各类运算符及其优先级，以及条件语句、循环语句等流程控制结构，帮助你掌握编写复杂程序的基础能力。

## 运算符

运算符是 JavaScript 中用于执行操作的特殊符号。理解运算符的工作原理对于编写有效的代码至关重要。

### 算术运算符
算术运算符用于执行基本的数学运算，是JavaScript中最常用的运算符之一。掌握算术运算符的使用及其特性对于编写正确的计算逻辑至关重要。

```javascript
var a = 10;
var b = 3;

console.log(a + b); // 13 - 加法
console.log(a - b); // 7 - 减法
console.log(a * b); // 30 - 乘法
console.log(a / b); // 3.333... - 除法
console.log(a % b); // 1 - 取模(余数)
console.log(Math.pow(a, b)); // 1000 - 幂运算
```

#### 算术运算符的基本特性

1. **加法运算符(+)**
   - 用于数值相加
   - 当与字符串一起使用时，执行字符串拼接
   - 对于其他类型，会先转换为数字或字符串再进行操作

2. **减法运算符(-)**
   - 用于数值相减
   - 会尝试将非数字类型转换为数字

3. **乘法运算符(*)和除法运算符(/)**
   - 用于数值相乘和相除
   - 会尝试将非数字类型转换为数字
   - 除以0会得到`Infinity`或`-Infinity`

4. **取模运算符(%)**
   - 返回除法的余数
   - 结果的符号与被除数相同
   - 可以用于判断奇偶性、循环计数等场景

5. **幂运算**
   - JavaScript没有专门的幂运算符，使用`Math.pow()`函数
   - `Math.pow(base, exponent)`返回base的exponent次幂

#### 实用示例

```javascript
// 1. 计算圆的面积
var radius = 5;
var area = Math.PI * Math.pow(radius, 2);
console.log(area); // 约78.5398

// 2. 格式化时间：将秒转换为分:秒格式
function formatTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = seconds % 60;
  // 确保秒数显示为两位数
  remainingSeconds = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
  return minutes + ":" + remainingSeconds;
}

console.log(formatTime(125)); // "2:05"
console.log(formatTime(45)); // "0:45"

// 3. 计算平均值
function calculateAverage(numbers) {
  if (numbers.length === 0) return 0;
  var sum = 0;
  for (var i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum / numbers.length;
}

var scores = [85, 90, 78, 92, 88];
console.log(calculateAverage(scores)); // 86.6

// 4. 生成随机整数
function getRandomInt(min, max) {
  // Math.random()生成[0,1)之间的随机数
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(getRandomInt(1, 10)); // 生成1-10之间的随机整数

// 5. 处理负数取模
console.log(-10 % 3); // -1 (结果符号与被除数相同)
console.log(10 % -3); // 1 (结果符号与被除数相同)
```

#### 浮点数精度问题
JavaScript使用IEEE 754标准的双精度浮点数表示法，这是一种二进制表示法，无法精确表示所有十进制分数，从而导致一些计算精度问题。

### 为什么会出现精度问题？
计算机内部使用二进制（0和1）表示数字，但有些十进制分数（如0.1）无法用有限的二进制位精确表示。例如：
- 十进制的0.1转换为二进制是一个无限循环小数：0.0001100110011...
- 由于存储空间有限，JavaScript会截断这个无限循环小数，导致精度损失
- 当进行算术运算时，这些微小的精度误差会累积，导致结果不符合预期

```javascript
console.log(0.1 + 0.2); // 0.30000000000000004，而不是 0.3
console.log(0.1 * 0.2); // 0.020000000000000004，而不是 0.02
console.log(0.29999999999999999); // 0.3，因为JavaScript会将接近0.3的值四舍五入
```

### 解决浮点数精度问题的方法

#### 1. 转换为整数计算
对于需要精确计算的场景，可以先将浮点数转换为整数进行计算，然后再转换回浮点数：

```javascript
// 计算 0.1 + 0.2
console.log((0.1 * 10 + 0.2 * 10) / 10); // 0.3

// 计算 0.1 * 0.2
console.log((0.1 * 100 * 0.2 * 100) / 10000); // 0.02
```

#### 2. 使用toFixed方法
`toFixed`方法可以将数字转换为指定小数位数的字符串表示，然后可以使用`parseFloat`转回数字：

```javascript
console.log((0.1 + 0.2).toFixed(1)); // "0.3"，返回字符串
console.log(parseFloat((0.1 + 0.2).toFixed(1))); // 0.3，转回数字

// 指定更多小数位
console.log((0.1 + 0.2).toFixed(10)); // "0.3000000000"
```

#### 3. 使用误差范围比较
对于浮点数比较，可以设置一个可接受的误差范围（epsilon）：

```javascript
function areEqual(a, b, epsilon) {
  epsilon = epsilon || 1e-10;
  return Math.abs(a - b) < epsilon;
}

console.log(areEqual(0.1 + 0.2, 0.3)); // true
console.log(0.1 + 0.2 === 0.3); // false
```

#### 4. 使用专门的库
对于需要大量精确计算的场景（如金融计算），可以使用专门的库如`decimal.js`或`big.js`。

### 实际应用场景示例

```javascript
// 1. 金融计算中的精度处理
function calculatePrice(price, taxRate) {
  // 避免浮点数精度问题
  return Math.round(price * taxRate * 100) / 100;
}

var itemPrice = 19.99;
var taxRate = 0.0825;
var totalPrice = calculatePrice(itemPrice, taxRate);
console.log(totalPrice); // 1.65 (精确到分)

// 2. 科学计算中的比较
function isApproximatelyZero(value) {
  return Math.abs(value) < 1e-10;
}

var result = 0.1 + 0.2 - 0.3;
console.log(isApproximatelyZero(result)); // true

// 3. 格式化货币显示
function formatCurrency(amount) {
  // 四舍五入到分
  var roundedAmount = Math.round(amount * 100) / 100;
  // 确保显示两位小数
  return roundedAmount.toFixed(2);
}

console.log(formatCurrency(19.99)); // "19.99"
console.log(formatCurrency(19.9)); // "19.90"
console.log(formatCurrency(0.1 + 0.2)); // "0.30"
```

### 最佳实践
- 对于不需要精确计算的场景，可以直接使用浮点数
- 对于需要精确计算的场景（如金融、科学计算），使用上述方法处理精度问题
- 避免直接比较浮点数是否相等，使用误差范围比较法
- 显示浮点数时，使用`toFixed`或其他格式化方法控制显示的小数位数

#### 算术运算符与不同数据类型
JavaScript是一种动态类型语言，当算术运算符用于不同数据类型时，会发生类型转换。理解这些转换规则对于编写可靠的代码至关重要。

### 类型转换规则
当使用算术运算符时，JavaScript会根据以下规则进行类型转换：

1. **加法运算符(+)**
   - 如果有一个操作数是字符串，另一个操作数会被转换为字符串，然后执行字符串拼接
   - 如果两个操作数都是非字符串的原始类型，会被转换为数字后相加
   - 如果有对象参与，会先调用对象的`valueOf()`或`toString()`方法转换为原始类型

2. **其他算术运算符(-, *, /, %等)**
   - 所有操作数都会被转换为数字后进行运算
   - 无法转换为数字的值会得到`NaN`

### 详细示例

```javascript
// 1. 字符串与数字加：执行字符串拼接
console.log("5" + 3); // "53"
console.log(5 + "3"); // "53"
console.log("hello" + 123); // "hello123"

// 2. 其他算术运算符：转换为数字
console.log("5" - 3); // 2
console.log("5" * 3); // 15
console.log("5" / 3); // 1.666...
console.log("abc" * 3); // NaN (Not a Number)

// 3. 布尔值与数字运算：true→1, false→0
console.log(true + 1); // 2
console.log(false + 1); // 1
console.log(true * 5); // 5
console.log(false / 2); // 0

// 4. null和undefined与数字运算
console.log(null + 1); // 1 (null被转换为0)
console.log(undefined + 1); // NaN (undefined转换为NaN)
console.log(null * 5); // 0
console.log(undefined * 5); // NaN

// 5. 对象与数字运算
var obj = { valueOf: function() { return 10; } };
console.log(obj + 5); // 15

var obj2 = { toString: function() { return "20"; } };
console.log(obj2 * 2); // 40 (先调用toString()转换为字符串"20"，再转换为数字20)

// 6. 数组与数字运算
console.log([5] + 3); // "53" (数组转换为字符串"5")
console.log([5] - 3); // 2 (数组转换为字符串"5"，再转换为数字5)
console.log([10, 20] * 2); // NaN (数组转换为字符串"10,20"，无法转换为有效数字)
```

### 实际应用场景

```javascript
// 1. 动态构建消息
var userName = "John"; var points = 100; console.log("欢迎回来，" + userName + "！您有" + points + "积分。"); // "欢迎回来，John！您有100积分。"

// 2. 从表单获取数值
function calculateSum() {
  var num1 = document.getElementById("num1").value; // 字符串
  var num2 = document.getElementById("num2").value; // 字符串
  // 转换为数字后相加
  var sum = Number(num1) + Number(num2);
  console.log("和为：" + sum);
}

// 3. 计数与状态跟踪
var isActive = true; var count = 0; // 点击按钮时 count += isActive ? 1 : 0;

// 4. 动态生成CSS值
var element = document.getElementById("box");
var baseSize = 100; var scale = 1.5; element.style.width = baseSize * scale + "px"; // "150px"

// 5. 处理混合数据类型
function processInput(input) {
  // 确保输入被转换为数字
  var num = Number(input);
  if (isNaN(num)) {
    console.log("请输入有效的数字");
  } else {
    console.log("处理数字：" + num);
  }
}

processInput("123"); // "处理数字：123"
processInput(456); // "处理数字：456"
processInput("abc"); // "请输入有效的数字"
```

### 常见陷阱与最佳实践
- **避免意外的字符串拼接**：当需要加法运算时，确保操作数都是数字类型
  ```javascript
  var num1 = "10"; var num2 = "20"; // 错误：执行字符串拼接 console.log(num1 + num2); // "1020" // 正确：先转换为数字 console.log(Number(num1) + Number(num2)); // 30
  ```
- **处理可能的NaN结果**：使用`isNaN()`函数检查运算结果是否为NaN
  ```javascript
  var result = "abc" * 10; if (isNaN(result)) { console.log("计算错误"); }
  ```
- **显式类型转换**：当混合使用不同类型时，显式进行类型转换以提高代码可读性
  ```javascript
  var strNum = "100"; var num = Number(strNum); // 显式转换为数字 var str = String(num); // 显式转换为字符串
  ```
- **注意null和undefined的特殊处理**：null会被转换为0，而undefined会被转换为NaN
  ```javascript
  console.log(null + 5); // 5 console.log(undefined + 5); // NaN
  ```

#### 自增和自减运算符
自增(`++`)和自减(`--`)运算符是JavaScript中常用的一元运算符，用于便捷地增加或减少变量的值。它们有两种使用形式：前置和后置，这两种形式在运算顺序上有重要区别。

### 基本用法与区别

```javascript
var count = 5;
console.log(count++); // 5 (先输出当前值，后自增)
console.log(count); // 6

var num = 10;
console.log(++num); // 11 (先自增，后输出新值)
console.log(num); // 11

var value = 8;
console.log(value--); // 8 (先输出当前值，后自减)
console.log(value); // 7

var score = 15;
console.log(--score); // 14 (先自减，后输出新值)
console.log(score); // 14
```

- **前置形式(`++count`或`--count`)**：先进行自增/自减运算，再返回变量的新值
- **后置形式(`count++`或`count--`)**：先返回变量的当前值，再进行自增/自减运算

### 详细解释

自增和自减运算符的工作原理可以拆解为以下步骤：

1. **前置形式**：
   ```javascript
   ++x  // 等价于 x = x + 1，然后返回x的新值
   --x  // 等价于 x = x - 1，然后返回x的新值
   ```

2. **后置形式**：
   ```javascript
   x++  // 先返回x的当前值，然后执行x = x + 1
   x--  // 先返回x的当前值，然后执行x = x - 1
   ```

### 实际应用场景

```javascript
// 1. 循环计数器
var i;
for (i = 0; i < 5; i++) {
  console.log("循环第" + (i + 1) + "次");
}
// 输出: 循环第1次, 循环第2次, 循环第3次, 循环第4次, 循环第5次

// 2. 累加计数
var clicks = 0;
function handleClick() {
  console.log("点击次数: " + ++clicks); // 每次点击先自增再显示
}

// 3. 递减计数
var items = ["苹果", "香蕉", "橙子"];
var index = items.length - 1;
while (index >= 0) {
  console.log(items[index--]); // 先显示当前项，再递减索引
}
// 输出: 橙子, 香蕉, 苹果

// 4. 与赋值运算符结合
var a = 5;
var b = a++ * 2; // b = 5 * 2 = 10, a = 6
console.log("a = " + a + ", b = " + b); // a = 6, b = 10

var c = 5;
var d = ++c * 2; // c = 6, d = 6 * 2 = 12
console.log("c = " + c + ", d = " + d); // c = 6, d = 12

// 5. 在条件语句中使用
var count = 0;
while (++count < 5) {
  console.log(count); // 输出: 1, 2, 3, 4
}
// 循环在count为5时结束

// 6. 数组索引操作
var data = [10, 20, 30, 40];
var idx = 0;
console.log(data[idx++]); // 10 (先获取data[0]，再idx变为1)
console.log(data[idx++]); // 20 (先获取data[1]，再idx变为2)
```

### 常见陷阱与最佳实践

- **避免在复杂表达式中混用**：在同一表达式中多次使用自增/自减运算符可能导致代码难以理解和预测
  ```javascript
  // 不推荐: 难以理解执行顺序
  var x = 5;
  var result = x++ + ++x; // 结果可能因JavaScript引擎而异
  
  // 推荐: 拆分语句以提高可读性
  var x = 5;
  var temp1 = x++; // temp1 = 5, x = 6
  var temp2 = ++x; // temp2 = 7, x = 7
  var result = temp1 + temp2; // 12
  ```

- **注意类型转换**：自增/自减运算符会将操作数转换为数字
  ```javascript
  var strNum = "10";
  console.log(typeof strNum); // "string"
  strNum++; // 转换为数字10，然后自增为11
  console.log(typeof strNum); // "number"
  console.log(strNum); // 11
  
  var bool = true;
  bool++; // true转换为1，然后自增为2
  console.log(bool); // 2
  
  var obj = { valueOf: function() { return 5; } };
  obj++; // 调用valueOf()获取5，然后自增为6
  console.log(obj); // 6
  ```

- **避免与其他运算符混淆**：
  ```javascript
  var x = 5;
  x = x + 1; // 等价于 x++
  x += 1;   // 也等价于 x++
  
  // 但在复杂表达式中，x++和x += 1可能产生不同结果
  var a = 5;
  var b = a++ + 10; // b = 5 + 10 = 15, a = 6
  
  var c = 5;
  var d = (c += 1) + 10; // c = 6, d = 6 + 10 = 16
  ```

- **可读性优先**：在某些情况下，使用`x = x + 1`或`x += 1`可能比`x++`更清晰，特别是对于初学者

- **不要用于常量或非变量表达式**：自增/自减运算符只能用于变量，不能用于常量或表达式
  ```javascript
  5++; // 错误: 无效的左侧表达式
  (a + b)++; // 错误: 无效的左侧表达式
  ```

自增和自减运算符在循环和计数器场景中非常有用，但使用时应注意清晰性和避免潜在的陷阱。在复杂表达式中，考虑拆分为多个简单语句以提高代码可读性和可维护性。

### 比较运算符
比较运算符用于比较两个值并返回布尔值(`true`或`false`)，是实现条件判断、循环控制和逻辑决策的基础。JavaScript提供了严格比较和抽象比较两种方式，理解它们的区别和行为对于编写可靠的代码至关重要。

```javascript
var x = 5;
var y = "5";

console.log(x == y); // true - 相等(会进行类型转换)
console.log(x === y); // false - 严格相等(不会进行类型转换)
console.log(x != y); // false - 不相等(会进行类型转换)
console.log(x !== y); // true - 严格不相等(不会进行类型转换)
console.log(x > 3); // true
console.log(x < 3); // false
console.log(x >= 5); // true
console.log(x <= 5); // true
```

#### 常用比较运算符

| 运算符 | 描述 | 示例 |
| --- | --- | --- |
| `==` | 等于（值相等，会进行类型转换） | `5 == '5'` 返回 `true` |
| `===` | 严格等于（值和类型都相等，不进行类型转换） | `5 === '5'` 返回 `false` |
| `!=` | 不等于（值不相等，会进行类型转换） | `5 != '5'` 返回 `false` |
| `!==` | 严格不等于（值或类型不相等，不进行类型转换） | `5 !== '5'` 返回 `true` |
| `>` | 大于 | `5 > 3` 返回 `true` |
| `<` | 小于 | `5 < 3` 返回 `false` |
| `>=` | 大于等于 | `5 >= 5` 返回 `true` |
| `<=` | 小于等于 | `5 <= 3` 返回 `false` |

#### 严格相等 vs 抽象相等
- **严格相等(`===`)**: 不会进行类型转换，只有当两个值的类型相同且值相等时才返回`true`
- **抽象相等(`==`)**: 会进行类型转换，然后比较转换后的值

#### 类型转换规则详解
当使用抽象相等(`==`)比较不同类型的值时，JavaScript会按照以下规则进行类型转换：

1. **数字与字符串比较**: 将字符串转换为数字，然后比较
   ```javascript
   console.log(5 == "5"); // true ("5"被转换为5)
   console.log(5 == "5.0"); // true ("5.0"被转换为5)
   console.log(5 == "abc"); // false ("abc"被转换为NaN)
   console.log("10" > 5); // true ("10"被转换为10)
   ```

2. **布尔值与其他类型比较**: 将布尔值转换为数字(true→1, false→0)，然后比较
   ```javascript
   console.log(true == 1); // true
   console.log(false == 0); // true
   console.log(true == "1"); // true (true→1, "1"→1)
   console.log(false == ""); // true (false→0, ""→0)
   ```

3. **null与undefined比较**: 两者相等，但与其他值都不相等
   ```javascript
   console.log(null == undefined); // true
   console.log(null == 0); // false
   console.log(undefined == ""); // false
   ```

4. **对象与原始类型比较**: 将对象转换为原始类型，然后比较
   - 首先尝试调用对象的`valueOf()`方法
   - 如果`valueOf()`返回的不是原始类型，再尝试调用`toString()`方法
   ```javascript
   console.log([5] == 5); // true ([5]被转换为"5"，然后转换为5)
   console.log({} == "[object Object]"); // true ({}"被转换为"[object Object]")
   var obj = { valueOf: function() { return 10; } };
   console.log(obj == 10); // true
   ```

5. **特殊值比较**: NaN不等于任何值，包括自身
   ```javascript
   console.log(NaN == NaN); // false
   console.log(NaN === NaN); // false
   console.log(isNaN(NaN)); // true
   console.log(Infinity == Infinity); // true
   console.log(-Infinity == Infinity); // false
   ```

#### 常见类型转换陷阱
```javascript
// 这些比较可能会产生意外结果
console.log(0 == ""); // true
console.log(0 == false); // true
console.log("" == false); // true
console.log(1 == true); // true
console.log([] == 0); // true
console.log([1] == 1); // true
console.log([1, 2] == "1,2"); // true
console.log(null == 0); // false
console.log(undefined == null); // true
console.log(new Date(2023, 0, 1) == "Sun Jan 01 2023 00:00:00 GMT+0000"); // true
```

#### 实际应用场景

```javascript
// 1. 表单验证
function validateAge(age) {
  // 确保age是数字且在有效范围内
  if (typeof age !== 'number' || isNaN(age) || age < 18 || age > 120) {
    return false;
  }
  return true;
}

// 2. 数据筛选
var numbers = [1, 5, 10, 15, 20];
var filteredNumbers = [];
for (var i = 0; i < numbers.length; i++) {
  if (numbers[i] > 10) {
    filteredNumbers.push(numbers[i]);
  }
}
console.log(filteredNumbers); // [15, 20]

// 3. 条件渲染
function displayMessage(userRole) {
  if (userRole === 'admin') {
    console.log('欢迎管理员！');
  } else if (userRole === 'user') {
    console.log('欢迎用户！');
  } else {
    console.log('请登录');
  }
}

// 4. 排序比较
function compareNumbers(a, b) {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
}
var sortedNumbers = [5, 2, 8, 1, 9].sort(compareNumbers);
console.log(sortedNumbers); // [1, 2, 5, 8, 9]

// 5. 检测数据类型
function isString(value) {
  return typeof value === 'string';
}

// 6. 处理null和undefined
function processData(data) {
  // 检查data是否为null或undefined
  if (data === null || data === undefined) {
    console.log('没有数据');
    return;
  }
  // 处理数据...
}
```

#### 最佳实践
- **始终使用严格相等(`===`)和严格不相等(`!==`)**，以避免类型转换带来的意外结果
  ```javascript
  console.log(0 === ""); // false
  console.log(0 === false); // false
  console.log("" === false); // false
  console.log(1 === true); // false
  console.log(null === undefined); // false
  ```

- **当需要比较不同类型的值时，显式进行类型转换**，使代码更加清晰
  ```javascript
  // 显式转换
  console.log(String(5) === "5"); // true
  console.log(Number("5") === 5); // true
  
  // 安全比较字符串数字
  function compareStringNumbers(a, b) {
    return Number(a) === Number(b);
  }
  console.log(compareStringNumbers("10", 10)); // true
  ```

- **注意NaN的比较**：使用`isNaN()`函数检测NaN
  ```javascript
  var result = 0 / 0; // NaN
  console.log(isNaN(result)); // true
  ```

- **避免对复杂对象进行比较**：对象比较的是引用，而不是值
  ```javascript
  var obj1 = { name: 'John' };
  var obj2 = { name: 'John' };
  console.log(obj1 === obj2); // false (不同引用)
  
  var obj3 = obj1;
  console.log(obj1 === obj3); // true (相同引用)
  ```

- **使用对象的toString()或自定义方法进行比较**
  ```javascript
  function areObjectsEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
  var obj1 = { name: 'John' };
  var obj2 = { name: 'John' };
  console.log(areObjectsEqual(obj1, obj2)); // true
  ```

比较运算符是JavaScript中最常用的运算符之一，正确理解和使用它们对于编写健壮的代码至关重要。在大多数情况下，推荐使用严格比较(`===`和`!==`)来避免类型转换带来的意外行为。

#### 逻辑运算符
逻辑运算符用于组合或反转布尔值，是实现复杂条件判断的基础。

```javascript
var a = true;
var b = false;

console.log(a && b); // false - 逻辑与(两个都为true才返回true)
console.log(a || b); // true - 逻辑或(至少一个为true就返回true)
console.log(!a); // false - 逻辑非(反转布尔值)
```

#### 短路评估
逻辑运算符具有短路特性，即如果左侧表达式已经能确定整个表达式的结果，就不会评估右侧表达式：

```javascript
// 逻辑与短路：如果左侧为false，就不会评估右侧
console.log(false && true); // false
console.log(false && console.log("这行不会执行")); // false

// 逻辑或短路：如果左侧为true，就不会评估右侧
console.log(true || false); // true
console.log(true || console.log("这行不会执行")); // true
```

#### 短路评估的实际应用
短路评估在实际开发中有许多实用场景：

```javascript
// 1. 避免除以零
var denominator = 0;
var result = denominator !== 0 && 10 / denominator;
console.log(result); // false (当denominator为0时，表达式结果为false，不会执行除法)

// 2. 设置默认值
var username = null;
var displayName = username || "Guest";
console.log(displayName); // "Guest" (当username为null/false/undefined/""/0时，使用默认值)

// 3. 安全访问对象属性
var user = null;
var userName = user && user.name;
console.log(userName); // null (当user为null时，不会尝试访问user.name，避免TypeError)

// 4. 条件执行函数
function logMessage() {
  console.log("消息已记录");
  return true;
}

var shouldLog = true;
shouldLog && logMessage(); // 当shouldLog为true时执行logMessage

// 5. 组合多个条件
var password = "password123";
var isValid = password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
console.log(isValid); // false (密码长度足够，但没有大写字母)
```

#### 逻辑运算符的返回值
需要注意的是，逻辑运算符并不总是返回布尔值，而是返回参与运算的操作数之一：

```javascript
// 逻辑与：如果左侧为假值，返回左侧；否则返回右侧
console.log(false && "hello"); // false
console.log("world" && "hello"); // "hello"

// 逻辑或：如果左侧为真值，返回左侧；否则返回右侧
console.log("hello" || "world"); // "hello"
console.log(false || "world"); // "world"

// 逻辑非：始终返回布尔值
console.log(!!"hello"); // true
console.log(!0); // true
```

#### 真值与假值
在JavaScript中，以下值被视为假值(falsy)：
- `false`
- `0` 和 `-0`
- `NaN`
- `""` (空字符串)
- `null`
- `undefined`

所有其他值都被视为真值(truthy)，包括空对象`{}`、空数组`[]`、字符串`"0"`等。

理解真值和假值对于正确使用逻辑运算符至关重要：
```javascript
console.log("" || "default"); // "default" (空字符串是假值)
console.log([] || "empty array"); // [] (空数组是真值)
console.log({} && "object exists"); // "object exists" (空对象是真值)
console.log(null && "this won't execute"); // null (null是假值)
```
### 赋值运算符
赋值运算符用于为变量赋值，是编程中最基础也是最常用的操作之一。

#### 基本赋值运算符
`=` 是最基本的赋值运算符，用于将右侧表达式的值赋给左侧变量：

```javascript
var x = 10; // 将10赋给变量x
var y = x + 5; // 将x+5的结果(15)赋给变量y
```

#### 复合赋值运算符
复合赋值运算符结合了算术运算符和赋值运算符，使代码更加简洁：

```javascript
var x = 10;

x += 5; // 等同于 x = x + 5，结果x=15
x -= 5; // 等同于 x = x - 5，结果x=10
x *= 2; // 等同于 x = x * 2，结果x=20
x /= 2; // 等同于 x = x / 2，结果x=10
x %= 3; // 等同于 x = x % 3，结果x=1
x = x * x; // 等同于 x = x squared，结果x=1
```

#### 赋值运算符与其他运算符的结合
赋值运算符可以与其他运算符结合使用，实现更复杂的操作：

```javascript

// 与位运算符结合
var z = 1;
z <<= 2; // 等同于 z = z << 2，结果z=4 (二进制100)
```

#### 赋值运算符的结合性
赋值运算符具有右结合性，这意味着多个赋值操作可以链式进行：

```javascript
var a, b, c;
a = b = c = 10; // 从右到左执行，等同于 c=10; b=c; a=b;
console.log(a, b, c); // 10 10 10
```

#### 赋值表达式的值
赋值表达式本身也有值，即赋给变量的值：

```javascript
var x;
console.log(x = 10); // 10 (赋值表达式的值为10)

var y = 5;
console.log(y += 3); // 8 (表达式的值为8)

// 利用赋值表达式的值
function updateCounter(counter) {
  return counter += 1;
}

var count = 0;
console.log(updateCounter(count)); // 1
console.log(count); // 0 (原变量未被修改，因为函数参数是值传递)
```

#### 最佳实践
- 复合赋值运算符使代码更加简洁，但不要过度使用，以免影响代码可读性
- 对于复杂的表达式，考虑拆分为多个简单语句，使代码更加清晰
- 注意赋值运算符的优先级较低，在复杂表达式中可能需要使用括号
  ```javascript
  var x = 5;
  x *= 2 + 3; // 等同于 x = x * (2 + 3)，结果x=25
  console.log(x); // 25
  ```

### 其他常用运算符

#### 三元运算符
三元运算符(`?:`)是 JavaScript 中唯一的三目运算符，用于简化简单的条件判断：

```javascript
var age = 18;
var status = age >= 18 ? "成年" : "未成年";
console.log(status); // "成年"

// 等价于
var status;
if (age >= 18) {
  status = "成年";
} else {
  status = "未成年";
}
```

#### typeof 运算符
`typeof`运算符用于获取变量的类型：

```javascript
console.log(typeof 42); // "number"
console.log(typeof "hello"); // "string"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object" (这是 JavaScript 的一个历史遗留问题)
console.log(typeof {}); // "object"
console.log(typeof []); // "object" (数组本质上是一种特殊的对象)
console.log(typeof function(){}); // "function"
```

#### 运算符优先级
运算符优先级决定了表达式中运算的执行顺序。了解运算符优先级可以避免代码中的逻辑错误：

```javascript
// 乘法在加法之前执行
console.log(2 + 3 * 4); // 14 (不是 20)

// 使用括号改变执行顺序
console.log((2 + 3) * 4); // 20
```

常见运算符优先级(从高到低)：
1. 括号 `()`
2. 自增/自减 `++` `--`
3. 乘法/除法/取模 `*` `/` `%`
4. 加法/减法 `+` `-`
5. 比较运算符 `>` `<` `>=` `<=`
6. 相等运算符 `==` `!=` `===` `!==`
7. 逻辑与 `&&`
8. 逻辑或 `||`
9. 三元运算符 `?:`
10. 赋值运算符 `=` `+=` `-=` 等

## 流程控制

流程控制语句允许我们控制代码的执行流程，根据不同的条件执行不同的代码块，或者重复执行某个代码块。掌握流程控制是编写复杂程序的基础。

### 条件语句

条件语句允许我们根据指定条件决定是否执行某个代码块，或者在多个条件中选择一个执行。

#### if-else 语句
`if-else`语句是最基本的条件语句，用于根据条件执行不同的代码块：

```javascript
var num = 10;

if (num > 0) {
  console.log("正数");
} else if (num < 0) {
  console.log("负数");
} else {
  console.log("零");
}
```

#### if-else 语句的实际应用
```javascript
// 检查用户是否登录
var isLoggedIn = true;
var userRole = "admin";

if (isLoggedIn) {
  console.log("欢迎回来！");
  if (userRole === "admin") {
    console.log("您拥有管理员权限");
  } else {
    console.log("您拥有普通用户权限");
  }
} else {
  console.log("请先登录");
}
```

#### 嵌套 if-else 的最佳实践
嵌套`if-else`可以处理复杂条件，但过度嵌套会使代码难以阅读。以下是一些最佳实践：

1. **保持嵌套层级浅**：如果嵌套超过3层，考虑重构代码
2. **先处理简单条件**：将简单的条件放在前面处理，减少不必要的判断
3. **使用逻辑运算符组合条件**：对于相关条件，可以使用逻辑运算符组合
4. **考虑使用 switch 或策略模式**：对于多分支条件，switch 语句或策略模式可能更清晰

```javascript
// 不佳的嵌套方式
function getDiscount(price, isMember, hasCoupon) {
  if (isMember) {
    if (hasCoupon) {
      return price * 0.7;
    } else {
      return price * 0.8;
    }
  } else {
    if (hasCoupon) {
      return price * 0.9;
    } else {
      return price;
    }
  }
}

// 改进：使用逻辑运算符组合条件
function getDiscount(price, isMember, hasCoupon) {
  if (isMember && hasCoupon) {
    return price * 0.7;
  } else if (isMember) {
    return price * 0.8;
  } else if (hasCoupon) {
    return price * 0.9;
  } else {
    return price;
  }
}
```

#### 条件表达式的复杂用法
条件表达式可以包含任意复杂的逻辑：

```javascript
// 检查输入是否为有效邮箱
function isValidEmail(email) {
  return email && typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

var userEmail = "user@example.com";
if (isValidEmail(userEmail)) {
  console.log("邮箱格式正确");
} else {
  console.log("请输入有效的邮箱地址");
}

// 检查数组是否包含特定元素
var fruits = ["苹果", "香蕉", "橙子"];
var targetFruit = "香蕉";
var found = false;
for (var i = 0; i < fruits.length; i++) {
  if (fruits[i] === targetFruit) {
    found = true;
    break;
  }
}
if (found) {
  console.log("找到了" + targetFruit);
} else {
  console.log("未找到" + targetFruit);
}
```

#### 常见错误
- 忘记使用比较运算符(`=`)而不是赋值运算符(`=`)：`if (x = 5)` 会将5赋给x，然后判断x的值(5是真值)，导致条件始终为真
- 错误处理逻辑顺序：确保条件的顺序正确，特别是使用`else if`时
- 忽略类型转换：在条件中使用`==`可能导致意外的类型转换，建议使用`===`

```javascript
// 错误：使用赋值运算符而不是比较运算符
if (x = 5) {
  // 这将始终执行
}

// 正确
if (x === 5) {
  // 只有当x等于5时执行
}
```

#### switch 语句
`switch`语句用于根据表达式的值选择执行不同的代码块，特别适合于多分支条件判断。

```javascript
var day = 3;
var dayName;

switch (day) {
  case 1:
    dayName = "星期一";
    break;
  case 2:
    dayName = "星期二";
    break;
  case 3:
    dayName = "星期三";
    break;
  case 4:
    dayName = "星期四";
    break;
  case 5:
    dayName = "星期五";
    break;
  case 6:
  case 7:
    dayName = "周末";
    break;
  default:
    dayName = "无效的天数";
}

console.log(dayName); // "星期三"
```

#### switch 语句的工作原理
1. 计算 `switch` 后的表达式值
2. 依次比较每个 `case` 后的表达式值与 `switch` 表达式值是否**严格相等(`===`)**
3. 如果找到匹配的 `case`，则执行该 `case` 下的代码块
4. 如果遇到 `break` 语句，则跳出 `switch` 语句
5. 如果没有找到匹配的 `case`，则执行 `default` 分支(如果有)

#### 穿透效应的使用场景
故意不使用 `break` 语句可以实现穿透效应，使多个 `case` 共享同一代码块：

```javascript
// 根据月份判断季节
var month = 12;
var season;

switch (month) {
  case 12:
  case 1:
  case 2:
    season = "冬季";
    break;
  case 3:
  case 4:
  case 5:
    season = "春季";
    break;
  case 6:
  case 7:
  case 8:
    season = "夏季";
    break;
  case 9:
  case 10:
  case 11:
    season = "秋季";
    break;
  default:
    season = "无效的月份";
}

console.log(season); // "冬季"
```

#### switch 与 if-else 的对比
- **switch 优势**：
  - 代码结构更清晰，特别是对于多分支条件
  - 执行效率更高，因为是直接比较值而不是依次判断条件

- **if-else 优势**：
  - 更灵活，可以处理复杂的条件表达式
  - 可以使用范围判断(如 `x > 10`)

```javascript
// 使用 if-else 处理范围判断
var score = 85;

if (score >= 90) {
  console.log("优秀");
} else if (score >= 80) {
  console.log("良好");
} else if (score >= 60) {
  console.log("及格");
} else {
  console.log("不及格");
}

// 对于这种范围判断，switch 不是最佳选择
```

#### 最佳实践
- 始终包含 `break` 语句，除非故意使用穿透效应
- 为 `switch` 语句添加 `default` 分支，处理意外情况
- 避免在 `switch` 表达式和 `case` 表达式中使用可能导致类型转换的值
- 当 `case` 分支较多时，考虑使用对象映射或策略模式替代

```javascript
// 使用对象映射替代复杂的 switch 语句
function getDayName(day) {
  const dayNames = {
    1: "星期一",
    2: "星期二",
    3: "星期三",
    4: "星期四",
    5: "星期五",
    6: "周末",
    7: "周末"
  };
  return dayNames[day] || "无效的天数";
}

console.log(getDayName(3)); // "星期三"
```

#### 常见错误
- 忘记添加 `break` 语句，导致意外的穿透效应
- 在 `switch` 表达式和 `case` 表达式中使用不同类型的值，因为 `switch` 使用严格相等(`===`)
- 过度使用 `switch` 语句处理复杂条件，导致代码难以维护

### 循环语句

循环语句用于重复执行某个代码块，直到满足特定条件。JavaScript提供了多种循环结构，适用于不同的场景。

#### for 循环
`for`循环是最常用的循环语句，特别适合于已知循环次数的场景：

```javascript
for (初始化; 条件; 增量) {
  // 循环体
}
```

**执行流程**：
1. 执行初始化表达式
2. 评估条件表达式，如果为`true`，执行循环体；如果为`false`，退出循环
3. 执行循环体
4. 执行增量表达式
5. 重复步骤2-4

示例：
```javascript
// 基本for循环
for (var i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}

// 遍历数组
var fruits = ["苹果", "香蕉", "橙子"];
for (var i = 0; i < fruits.length; i++) {
  console.log(fruits[i]); // 苹果, 香蕉, 橙子
}

// 反向遍历
for (var i = fruits.length - 1; i >= 0; i--) {
  console.log(fruits[i]); // 橙子, 香蕉, 苹果
}
```

#### for...in 循环
`for...in`循环用于遍历对象的可枚举属性：

```javascript
var person = { name: "John", age: 30, city: "New York" };
for (var key in person) {
  console.log(key + ": " + person[key]); // name: John, age: 30, city: New York
}

// 遍历数组(不推荐，因为可能遍历到非数字索引)
var fruits = ["苹果", "香蕉", "橙子"];
for (var index in fruits) {
  console.log(index + ": " + fruits[index]); // 0: 苹果, 1: 香蕉, 2: 橙子
}
```

**注意事项**：
- `for...in`会遍历对象的所有可枚举属性，包括从原型链继承的属性
- 不建议使用`for...in`遍历数组，因为它可能会遍历到数组的非数字属性
- 为避免遍历到继承属性，可以使用`hasOwnProperty`方法

```javascript
var person = { name: "John", age: 30 };
// 添加一个不可枚举属性
Object.defineProperty(person, "id", { value: 123, enumerable: false });

for (var key in person) {
  if (person.hasOwnProperty(key)) {
    console.log(key + ": " + person[key]); // 只会输出name和age
  }
}
```


#### while 循环
`while`循环在条件为真时重复执行代码块，适合于循环次数不确定的场景：

```javascript
var i = 0;
while (i < 5) {
  console.log(i); // 0, 1, 2, 3, 4
  i++;
}

// 读取用户输入直到有效
var input;
while (!input || input.trim() === "") {
  input = prompt("请输入您的名字：");
}
console.log("您好，" + input);
```

#### do-while 循环
`do-while`循环先执行一次代码块，然后在条件为真时继续重复执行，确保循环体至少执行一次：

```javascript
var i = 0;
do {
  console.log(i); // 0, 1, 2, 3, 4
  i++;
} while (i < 5);

// 与while对比
var j = 5;
while (j < 5) {
  console.log(j); // 不会执行
  j++;
}

do {
  console.log(j); // 5
  j++;
} while (j < 5);
```

#### 循环的性能考虑
在JavaScript中，不同的循环方式和实现细节会对代码性能产生显著影响。尤其是在处理大量数据时，优化循环性能变得尤为重要。

##### 不同循环类型的性能对比
- **最快**: 标准`for`循环 (尤其在缓存长度的情况下)
- **次之**: `while`循环和`do-while`循环
- **较慢**: `for...in`循环 (因为它需要枚举对象的所有属性，包括继承的属性)
- **最慢**: `forEach`方法 (虽然代码简洁，但函数调用带来额外开销)

##### 性能优化技巧
1. **缓存数组长度**
   将数组长度缓存到变量中，避免每次循环都重新计算。这在处理大型数组时效果尤为明显。

   ```javascript
   // 性能优化：缓存数组长度
   var fruits = ["苹果", "香蕉", "橙子", ...]; // 假设有大量元素
   for (var i = 0, len = fruits.length; i < len; i++) {
     console.log(fruits[i]);
   }
   ```

2. **倒序循环**
   对于不需要保持顺序的循环，可以使用倒序循环，将终止条件从比较操作(`i < len`)简化为是否为0(`i--`)。

   ```javascript
   // 倒序循环优化
   var fruits = ["苹果", "香蕉", "橙子", ...];
   for (var i = fruits.length - 1; i >= 0; i--) {
     console.log(fruits[i]);
   }
   ```

3. **避免在循环中进行昂贵操作**
   - 避免在循环中创建函数、对象或数组
   - 避免在循环中进行DOM操作（如添加/删除元素）
   - 避免在循环中进行复杂计算或网络请求

   ```javascript
   // 不好的做法：在循环中创建对象
   for (var i = 0, len = data.length; i < len; i++) {
     var item = { id: data[i].id, name: data[i].name };
     processItem(item);
   }

   // 更好的做法：在循环外创建对象并重用
   var item = {};
   for (var i = 0, len = data.length; i < len; i++) {
     item.id = data[i].id;
     item.name = data[i].name;
     processItem(item);
   }
   ```

4. **批量DOM操作**
   如果需要在循环中进行DOM操作，尽量批量处理而不是逐次操作。

   ```javascript
   // 不好的做法：逐次DOM操作
   var container = document.getElementById("container");
   for (var i = 0, len = items.length; i < len; i++) {
     var div = document.createElement("div");
     div.textContent = items[i];
     container.appendChild(div); // 每次循环都修改DOM
   }

   // 更好的做法：使用文档片段批量处理
   var container = document.getElementById("container");
   var fragment = document.createDocumentFragment();
   for (var i = 0, len = items.length; i < len; i++) {
     var div = document.createElement("div");
     div.textContent = items[i];
     fragment.appendChild(div); // 先添加到文档片段
   }
   container.appendChild(fragment); // 一次性修改DOM
   ```

5. **避免在循环条件中使用函数调用**
   将函数调用移到循环外部，或缓存其结果。

   ```javascript
   // 不好的做法：在循环条件中调用函数
   for (var i = 0; i < getItemsCount(); i++) {
     // ...
   }

   // 更好的做法：缓存函数结果
   var count = getItemsCount();
   for (var i = 0; i < count; i++) {
     // ...
   }
   ```

#### 最佳实践
- 选择合适的循环结构：已知次数用`for`，未知次数用`while`，至少执行一次用`do-while`
- 保持循环体简洁，避免在循环中定义函数或进行复杂计算
- 确保循环条件最终会变为假，避免无限循环
- 使用`break`和`continue`语句控制循环流程，但不要过度使用以免影响代码可读性

### 流程控制语句

流程控制语句允许我们在代码执行过程中改变程序的流向，实现更复杂的控制逻辑。

#### break 语句
`break`语句用于终止当前循环或`switch`语句的执行，并跳出该代码块继续执行后续代码。

##### 基本用法
```javascript
// 终止for循环
for (var i = 0; i < 10; i++) {
  if (i === 5) {
    break; // 当i等于5时终止循环
  }
  console.log(i); // 0, 1, 2, 3, 4
}

// 终止while循环
var i = 0;
while (i < 10) {
  if (i === 5) {
    break;
  }
  console.log(i); // 0, 1, 2, 3, 4
  i++;
}

// 终止switch语句
switch (day) {
  case 1:
    dayName = "星期一";
    break; // 终止switch语句
  case 2:
    dayName = "星期二";
    break;
  // ...
  default:
    dayName = "未知";
    break;
}
```

##### 实际应用场景
1. **搜索匹配项**
   当找到所需元素时立即终止循环，避免不必要的迭代。

   ```javascript
   // 在数组中查找特定元素
   var items = [10, 20, 30, 40, 50];
   var target = 30;
   var foundIndex = -1;

   for (var i = 0, len = items.length; i < len; i++) {
     if (items[i] === target) {
       foundIndex = i;
       break; // 找到后立即终止循环
     }
   }

   console.log("找到索引: " + foundIndex); // 输出: 找到索引: 2
   ```

2. **处理异常情况**
   在循环中检测到异常情况时终止循环。

   ```javascript
   // 处理数据，遇到无效数据时终止
   var data = [1, 2, 3, -1, 4, 5]; // -1 表示无效数据
   var sum = 0;

   for (var i = 0, len = data.length; i < len; i++) {
     if (data[i] === -1) {
       console.log("检测到无效数据，终止处理");
       break;
     }
     sum += data[i];
   }

   console.log("处理结果: " + sum); // 输出: 处理结果: 6
   ```

##### 标签语句的使用
`break`语句默认只终止最内层的循环或`switch`语句。要终止多层循环，可以使用标签(label)语句。

```javascript
// 使用标签终止多层循环
outerLoop: for (var i = 0; i < 5; i++) {
  for (var j = 0; j < 5; j++) {
    if (i === 2 && j === 2) {
      break outerLoop; // 终止外层循环
    }
    console.log(`i=${i}, j=${j}`);
  }
}
```

**注意事项**：
- 标签名称可以是任何有效的标识符，但通常使用有意义的名称
- 标签必须放在循环或`switch`语句之前，中间用冒号分隔
- 过度使用标签会使代码难以理解，应谨慎使用

#### continue 语句
`continue`语句用于跳过当前循环的剩余部分，直接开始下一次循环迭代。

##### 基本用法
```javascript
// 跳过偶数
for (var i = 0; i < 10; i++) {
  if (i % 2 === 0) {
    continue; // 跳过偶数
  }
  console.log(i); // 1, 3, 5, 7, 9
}

// 在while循环中使用
var i = 0;
while (i < 10) {
  i++;
  if (i % 2 === 0) {
    continue;
  }
  console.log(i); // 1, 3, 5, 7, 9
}
```

##### 实际应用场景
1. **过滤数据**
   在处理数据时跳过不需要的元素。

   ```javascript
   // 过滤掉负数并计算总和
   var numbers = [5, -1, 10, -5, 15];
   var sum = 0;

   for (var i = 0, len = numbers.length; i < len; i++) {
     if (numbers[i] < 0) {
       continue; // 跳过负数
     }
     sum += numbers[i];
   }

   console.log("正数之和: " + sum); // 输出: 正数之和: 30
   ```

2. **跳过无效输入**
   在处理用户输入时跳过无效值。

   ```javascript
   // 处理用户输入，跳过空值
   var inputs = ["John", "", "Alice", "Bob", ""];
   var validInputs = [];

   for (var i = 0, len = inputs.length; i < len; i++) {
     if (inputs[i].trim() === "") {
       continue; // 跳过空输入
     }
     validInputs.push(inputs[i]);
   }

   console.log("有效输入: " + validInputs.join(", ")); // 输出: 有效输入: John, Alice, Bob
   ```

##### 不同循环中的注意事项
- **在`for`循环中**：`continue`会跳转到更新表达式(`i++`等)
- **在`while`循环中**：确保在`continue`前更新循环变量，避免无限循环
- **在`do-while`循环中**：同样需要确保在`continue`前更新循环变量

```javascript
// 错误示例：i永远不会增加
var i = 0;
do {
  if (i % 2 === 0) {
    continue; // 跳过i++
  }
  console.log(i);
  i++;
} while (i < 10);

// 正确示例
var i = 0;
do {
  i++;
  if (i % 2 === 0) {
    continue;
  }
  console.log(i);
} while (i < 10);
```

#### return 语句
`return`语句用于从函数中返回值，并立即结束函数的执行。

##### 基本用法
```javascript
function add(a, b) {
  return a + b; // 返回结果并结束函数
  console.log("这行代码不会执行"); // 不会执行
}

console.log(add(2, 3)); // 5
```

##### 特性与行为
1. **不带值的return**
   当`return`语句不带值时，函数返回`undefined`。

   ```javascript
   function greet() {
     console.log("Hello");
     return; // 等同于 return undefined;
   }

   console.log(greet()); // 先输出"Hello"，然后输出"undefined"
   ```

2. **在构造函数中的行为**
   在构造函数中使用`return`语句时，如果返回的是对象，则`new`操作符会返回该对象而不是`this`；如果返回的是非对象值，则会忽略该返回值，仍然返回`this`。

   ```javascript
   // 返回对象的情况
   function Person(name) {
     this.name = name;
     return { name: "Special " + name }; // 返回一个对象，而不是this
   }

   var person = new Person("John");
   console.log(person.name); // "Special John"

   // 返回非对象的情况
   function Animal(type) {
     this.type = type;
     return "This is a " + type; // 返回非对象，会被忽略
   }

   var animal = new Animal("dog");
   console.log(animal.type); // "dog"
   console.log(animal); // Animal { type: "dog" }
   ```

3. **在不同函数类型中的行为**
   - **普通函数**：正常返回值
   - **匿名函数**：正常返回值
   - **立即执行函数表达式(IIFE)**：可以返回值并赋值给变量

   ```javascript
   // 立即执行函数返回值
   var result = (function() {
     var x = 10;
     var y = 20;
     return x + y;
   })();

   console.log(result); // 30
   ```

4. **在事件处理函数中的使用**
   在事件处理函数中，`return false`可以阻止默认行为和事件传播。

   ```javascript
   // 阻止表单提交的默认行为
   document.getElementById("myForm").addEventListener("submit", function(event) {
     // 执行表单验证等操作
     if (!isValid()) {
       return false; // 阻止表单提交
     }
   });
   ```

#### break、continue和return的对比
- **break**：终止当前循环或`switch`语句，继续执行后续代码
- **continue**：跳过当前循环的剩余部分，开始下一次循环
- **return**：终止函数执行，返回一个值（如果有）

```javascript
function processNumbers(numbers) {
  var sum = 0;
  for (var num of numbers) {
    if (num < 0) {
      return -1; // 遇到负数，立即返回-1
    } else if (num % 2 === 0) {
      continue; // 跳过偶数
    } else if (num > 100) {
      break; // 遇到大于100的数，终止循环
    }
    sum += num;
  }
  return sum;
}

console.log(processNumbers([1, 2, 3, 4, 5])); // 9 (1+3+5)
console.log(processNumbers([1, 2, 101, 3])); // 1 (只加了1，遇到101后终止循环)
console.log(processNumbers([1, -2, 3])); // -1 (遇到负数，立即返回)
```

#### 最佳实践
- 避免过度使用`break`和`continue`，它们可能使代码流程变得复杂
- 在小型循环中使用这些语句可以提高代码可读性，但在大型复杂循环中应谨慎使用
- 考虑将复杂的循环逻辑拆分为多个函数，使代码更加清晰
- 使用`return`语句尽早退出函数，避免深层嵌套的条件语句

## 常见问题与解答

**Q: 什么是短路评估？**
A: 短路评估是逻辑运算符(`&&`和`||`)的特性，当左侧表达式已经能确定整个表达式的结果时，不会评估右侧表达式。这可以用于优化代码和避免错误。

   **示例：**
   ```javascript
   // && 短路评估：只有当左侧为真时才会评估右侧
   var a = 5;
   var b = 10;
   var result = a > 0 && (b = a * 2); // b 会被赋值为10
   console.log(b); // 10

   var c = -1;
   var d = 20;
   var result2 = c > 0 && (d = c * 2); // 由于c > 0为假，右侧不会执行
   console.log(d); // 仍然是20

   // || 短路评估：只有当左侧为假时才会评估右侧
   var name = "";
   var displayName = name || "Guest"; // 由于name为空，会使用"Guest"
   console.log(displayName); // "Guest"

   var userName = "John";
   var displayName2 = userName || "Guest"; // 由于userName不为空，会使用"John"
   console.log(displayName2); // "John"
   ```

**Q: 什么时候应该使用`==`和`===`？**
A: 建议始终使用`===`(严格相等)，因为它不会进行类型转换，避免意外结果。只有在明确需要类型转换的情况下才使用`==`。

   **示例：**
   ```javascript
   // === 严格相等：不会进行类型转换
   console.log(5 === "5"); // false (类型不同)
   console.log(5 === 5); // true (类型和值都相同)

   // == 抽象相等：会进行类型转换
   console.log(5 == "5"); // true (进行类型转换后值相同)
   console.log(0 == false); // true (进行类型转换后值相同)
   console.log(null == undefined); // true (特殊情况)
   ```

**Q: 如何避免无限循环？**
A: 确保循环条件最终会变为假，并且在循环体内更新循环变量。如果不小心写出了无限循环，可以使用`Ctrl+C`(在终端中)或关闭浏览器标签页来终止。

   **常见原因和解决方案：**
   1. **忘记更新循环变量**
      ```javascript
      // 错误示例
      var i = 0;
      while (i < 10) {
        console.log(i);
        // 忘记i++
      }

      // 正确示例
      var i = 0;
      while (i < 10) {
        console.log(i);
        i++;
      }
      ```

   2. **循环条件始终为真**
      ```javascript
      // 错误示例
      var i = 0;
      while (i >= 0) {
        console.log(i);
        i++;
      }

      // 正确示例
      var i = 0;
      while (i < 10) {
        console.log(i);
        i++;
      }
      ```

   3. **在continue语句前忘记更新循环变量**
      ```javascript
      // 错误示例
      var i = 0;
      while (i < 10) {
        if (i % 2 === 0) {
          continue; // 跳过i++
        }
        console.log(i);
        i++;
      }

      // 正确示例
      var i = 0;
      while (i < 10) {
        i++;
        if (i % 2 === 0) {
          continue;
        }
        console.log(i);
      }
      ```

**Q: 什么是运算符优先级？**
A: 运算符优先级决定了表达式中运算的执行顺序。例如，乘法的优先级高于加法，所以`2 + 3 * 4`的结果是14而不是20。

   **常见运算符优先级(从高到低)：**
   1. 括号 `()`
   2. 一元运算符 `++`, `--`, `!`, `typeof` 等
   3. 乘法/除法/取模 `*`, `/`, `%`
   4. 加法/减法 `+`, `-`
   5. 比较运算符 `<`, `<=`, `>`, `>=`
   6. 相等运算符 `==`, `!=`, `===`, `!==`
   7. 逻辑与 `&&`
   8. 逻辑或 `||`
   9. 条件运算符 `?:`
   10. 赋值运算符 `=`, `+=`, `-=` 等

   **示例：**
   ```javascript
   console.log(2 + 3 * 4); // 14 (先乘后加)
   console.log((2 + 3) * 4); // 20 (先算括号内)
   console.log(5 > 3 && 2 < 4); // true (先比较后逻辑与)
   console.log(5 > 3 || 2 > 4); // true (先比较后逻辑或)
   ```

**Q: 什么是类型转换？JavaScript中有哪几种类型转换？**
A: 类型转换是指将一个数据类型的值转换为另一个数据类型的值。JavaScript中有两种类型转换：隐式类型转换和显式类型转换。

   **隐式类型转换**：JavaScript自动进行的类型转换
   ```javascript
   console.log(5 + "5"); // "55" (数字转换为字符串)
   console.log(5 + true); // 6 (布尔值转换为数字)
   console.log("5" * 2); // 10 (字符串转换为数字)
   ```

   **显式类型转换**：通过函数或运算符手动进行的类型转换
   ```javascript
   console.log(String(5)); // "5" (转换为字符串)
   console.log(Number("5")); // 5 (转换为数字)
   console.log(Boolean(0)); // false (转换为布尔值)
   console.log(parseInt("123abc")); // 123 (解析为整数)
   console.log(parseFloat("3.14xyz")); // 3.14 (解析为浮点数)
   ```

**Q: 自增(++)和自减(--)运算符的优先级是怎样的？使用时需要注意什么？**
A: 自增和自减运算符的优先级很高，仅次于括号和成员访问。使用时需要注意它们的位置(前缀或后缀)会影响表达式的值。

   **前缀形式**：先增减，后使用
   ```javascript
   var a = 5;
   console.log(++a); // 6 (先将a增加1，再输出)
   console.log(a); // 6
   ```

   **后缀形式**：先使用，后增减
   ```javascript
   var b = 5;
   console.log(b++); // 5 (先输出b的值，再将b增加1)
   console.log(b); // 6
   ```

   **注意事项**：
   - 避免在复杂表达式中过度使用自增/自减运算符，以免影响代码可读性
   - 注意优先级，必要时使用括号明确运算顺序
   ```javascript
   console.log(5 + ++a); // 等价于 5 + (++a)
   console.log(5 + a++); // 等价于 5 + (a++)
   ```