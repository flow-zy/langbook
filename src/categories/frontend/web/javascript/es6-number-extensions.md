# 数值的扩展

ES6对数值类型进行了一系列扩展，增加了新的数值表示方法、数值转换函数和数学方法，使得数值处理更加便捷和精确。本章将详细介绍这些扩展特性。

## 设计目标与核心价值

ES6数值扩展的设计目标是：

1. **增强数值表示**：提供更丰富的数值字面量表示方法
2. **提高精确性**：解决浮点数计算的精度问题
3. **扩展功能**：添加新的数值处理方法
4. **改善开发体验**：提供更直观、更易用的API
5. **兼容性**：保持与现有代码的兼容性

这些扩展的核心价值在于使JavaScript能够更好地处理各种数值场景，特别是在科学计算、金融计算等对精度要求较高的领域。

## 数值的新表示方法

### 1. 二进制和八进制字面量

ES6引入了二进制（`0b`或`0B`前缀）和八进制（`0o`或`0O`前缀）字面量表示法。

```javascript
// 二进制表示
const binary = 0b1010;
console.log(binary); // 10

// 八进制表示
const octal = 0o777;
console.log(octal); // 511
```

### 2. 数值分隔符

ES6允许在数值字面量中使用下划线（`_`）作为分隔符，提高数值的可读性。

```javascript
const largeNumber = 1_000_000_000;
console.log(largeNumber); // 1000000000

const binaryNumber = 0b1010_1100_1110;
console.log(binaryNumber); // 2766

const hexNumber = 0xFA_CE_B0_0C;
console.log(hexNumber); // 4277016588
```

## 数值的新方法和属性

### 1. Number.isFinite() 和 Number.isNaN()

`Number.isFinite()` 检查一个值是否为有限数值，`Number.isNaN()` 检查一个值是否为`NaN`。

```javascript
console.log(Number.isFinite(123)); // true
console.log(Number.isFinite(Infinity)); // false
console.log(Number.isFinite('123')); // false (与全局isFinite不同，不进行类型转换)

console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN(123)); // false
console.log(Number.isNaN('NaN')); // false (与全局isNaN不同，不进行类型转换)
```

### 2. Number.parseInt() 和 Number.parseFloat()

ES6将全局的`parseInt()`和`parseFloat()`方法移植到了`Number`对象上，行为保持一致。

```javascript
console.log(Number.parseInt('123.45')); // 123
console.log(Number.parseFloat('123.45')); // 123.45
```

### 3. Number.isInteger()

检查一个值是否为整数。

```javascript
console.log(Number.isInteger(123)); // true
console.log(Number.isInteger(123.0)); // true
console.log(Number.isInteger(123.45)); // false
console.log(Number.isInteger('123')); // false
```

### 4. Number.MAX_SAFE_INTEGER 和 Number.MIN_SAFE_INTEGER

表示JavaScript中可以安全表示的最大和最小整数。

```javascript
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991
```

### 5. Number.isSafeInteger()

检查一个整数是否在安全整数范围内。

```javascript
console.log(Number.isSafeInteger(123)); // true
console.log(Number.isSafeInteger(9007199254740991)); // true
console.log(Number.isSafeInteger(9007199254740992)); // false
```

## Math对象的扩展方法

ES6为`Math`对象添加了一些新的数学方法，增强了JavaScript的数学计算能力。

### 1. Math.trunc()

去除数值的小数部分，返回整数部分。

```javascript
console.log(Math.trunc(123.45)); // 123
console.log(Math.trunc(-123.45)); // -123
console.log(Math.trunc(0)); // 0
console.log(Math.trunc(NaN)); // NaN
```

### 2. Math.sign()

返回数值的符号，表示数值是正数、负数还是零。

```javascript
console.log(Math.sign(123)); // 1
console.log(Math.sign(-123)); // -1
console.log(Math.sign(0)); // 0
console.log(Math.sign(-0)); // -0
console.log(Math.sign(NaN)); // NaN
```

### 3. Math.cbrt()

计算数值的立方根。

```javascript
console.log(Math.cbrt(8)); // 2
console.log(Math.cbrt(-8)); // -2
console.log(Math.cbrt(27)); // 3
```

### 4. Math.clz32()

返回一个数的32位二进制表示中前导零的个数。

```javascript
console.log(Math.clz32(0)); // 32
console.log(Math.clz32(1)); // 31
console.log(Math.clz32(10)); // 28
```

### 5. Math.imul()

执行32位整数乘法，返回正确的带符号结果。

```javascript
console.log(Math.imul(2, 3)); // 6
console.log(Math.imul(-1, 2)); // -2
console.log(Math.imul(0x7fffffff, 0x7fffffff)); // 1 (因为32位整数乘法的结果溢出)
```

### 6. Math.fround()

返回数值的单精度浮点数表示。

```javascript
console.log(Math.fround(123.45)); // 123.45000457763672
console.log(Math.fround(NaN)); // NaN
```

### 7. Math.hypot()

计算所有参数的平方和的平方根。

```javascript
console.log(Math.hypot(3, 4)); // 5 (3² + 4² = 5²)
console.log(Math.hypot(5, 12)); // 13
console.log(Math.hypot(0, 0)); // 0
```

### 8. 对数方法

ES6添加了几个新的对数方法：

- `Math.expm1(x)`: 返回`e^x - 1`
- `Math.log1p(x)`: 返回`ln(1 + x)`
- `Math.log10(x)`: 返回以10为底的对数
- `Math.log2(x)`: 返回以2为底的对数

```javascript
console.log(Math.expm1(1)); // 1.718281828459045 (e^1 - 1)
console.log(Math.log1p(1)); // 0.6931471805599453 (ln(2))
console.log(Math.log10(100)); // 2
console.log(Math.log2(8)); // 3
```

### 9. 双曲函数方法

ES6添加了双曲函数方法：

- `Math.sinh(x)`: 返回双曲正弦
- `Math.cosh(x)`: 返回双曲余弦
- `Math.tanh(x)`: 返回双曲正切
- `Math.asinh(x)`: 返回反双曲正弦
- `Math.acosh(x)`: 返回反双曲余弦
- `Math.atanh(x)`: 返回反双曲正切

```javascript
console.log(Math.sinh(0)); // 0
console.log(Math.cosh(0)); // 1
console.log(Math.tanh(0)); // 0
```

## BigInt类型

ES6引入了`BigInt`类型，用于表示任意精度的整数。

### 基本语法

`BigInt`类型的数值可以通过在整数后面添加`n`后缀来创建。

```javascript
const bigInt1 = 123n;
const bigInt2 = BigInt(456);
console.log(bigInt1); // 123n
console.log(bigInt2); // 456n
```

### 运算

`BigInt`可以进行加减乘除等基本运算，但不能与普通数值混合运算。

```javascript
const a = 123n;
const b = 456n;
console.log(a + b); // 579n
console.log(a * b); // 56088n
console.log(a / b); // 0n (整数除法，舍去小数部分)

// 不能与普通数值混合运算
// console.log(a + 123); // 报错
```

### 比较

`BigInt`可以与普通数值进行比较，但不完全相等。

```javascript
const a = 123n;
const b = 123;
console.log(a == b); // true
console.log(a === b); // false (类型不同)
console.log(a > 100); // true
```

### 注意事项

- `BigInt`不能用于`Math`对象的方法
- 不能与普通数值混合运算
- 转换为布尔值时，`0n`为`false`，其他为`true`

## 注意事项与最佳实践

### 1. 数值精度问题

JavaScript中的浮点数存在精度问题，在处理金融计算等场景时需要特别注意。

```javascript
console.log(0.1 + 0.2); // 0.30000000000000004 (不是0.3)

// 解决方案：使用toFixed()或BigInt
console.log((0.1 + 0.2).toFixed(1)); // '0.3'
console.log((10n + 20n) / 100n); // 0n (整数除法)
```

### 2. 数值分隔符的使用

合理使用数值分隔符可以提高代码可读性，但要注意以下几点：

- 不能在数值的开头或结尾使用
- 不能在小数点旁边使用
- 不能连续使用多个下划线

```javascript
const valid = 1_000_000;
const invalid1 = _1000000; // 错误
const invalid2 = 1000000_; // 错误
const invalid3 = 1._000_000; // 错误
const invalid4 = 1__000_000; // 错误
```

### 3. BigInt的适用场景

`BigInt`主要用于需要处理超出安全整数范围的大整数的场景，如密码学、大数据处理等。

### 4. 类型转换

注意不同数值类型之间的转换规则，特别是`BigInt`与普通数值之间的转换。

```javascript
// 将BigInt转换为普通数值
const bigInt = 123n;
const number = Number(bigInt);
console.log(number); // 123

// 将普通数值转换为BigInt
const number2 = 456;
const bigInt2 = BigInt(number2);
console.log(bigInt2); // 456n
```

## 总结

### 核心要点回顾

1. ES6引入了二进制和八进制字面量，以及数值分隔符
2. 添加了`Number.isFinite()`、`Number.isNaN()`等方法，增强了数值检查能力
3. 引入了`BigInt`类型，用于表示任意精度的整数
4. 扩展了`Math`对象，添加了许多新的数学方法
5. 提供了安全整数相关的属性和方法

### 主要优势

1. **更丰富的表示方法**：支持更多数值字面量格式
2. **更高的精度**：`BigInt`解决了大整数精度问题
3. **更强大的计算能力**：新增的`Math`方法扩展了数学计算功能
4. **更好的类型检查**：新的数值检查方法提供了更严格的类型检查

### 实践建议

1. 在处理大整数时，使用`BigInt`类型避免精度问题
2. 合理使用数值分隔符提高代码可读性
3. 使用`Number.isFinite()`和`Number.isNaN()`代替全局方法，以避免类型转换带来的问题
4. 在金融计算等对精度要求高的场景中，注意浮点数精度问题
5. 了解并合理使用新增的`Math`方法，简化数学计算代码

ES6的数值扩展使JavaScript能够更好地处理各种数值场景，特别是在科学计算、金融计算和大数据处理等领域。掌握这些新特性可以帮助你编写更精确、更高效的数值处理代码。