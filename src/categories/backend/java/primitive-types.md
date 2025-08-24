# Java基本数据类型

Java中的数据类型分为基本数据类型（Primitive Data Type）和引用数据类型（Reference Data Type）。基本数据类型是Java语言内置的、不能再分解的类型，它直接存储值而不是引用。

## 基本数据类型概述

### 什么是基本数据类型
基本数据类型是Java语言中最基础的数据类型，它直接表示简单的值，如数字、字符和布尔值。基本数据类型的变量存储的是实际的值，而不是对象的引用。

### 基本数据类型的分类
Java中的基本数据类型分为四大类：
- **整数类型**：`byte`、`short`、`int`、`long`
- **浮点类型**：`float`、`double`
- **字符类型**：`char`
- **布尔类型**：`boolean`

### 基本数据类型与引用数据类型的区别
- **基本数据类型**：存储的是实际的值，占用内存小，创建和使用效率高。
- **引用数据类型**：存储的是对象的引用（内存地址），占用内存大，创建和使用效率相对较低。

## 整数类型

### 整数类型概述
整数类型用于表示整数值，Java提供了四种整数类型，它们的区别在于占用的内存空间和表示的数值范围不同。

### 整数类型的种类
- **`byte`**：1字节（8位），范围：-128 ~ 127
- **`short`**：2字节（16位），范围：-32768 ~ 32767
- **`int`**：4字节（32位），范围：-2^31 ~ 2^31-1（约-2.1亿 ~ 2.1亿）
- **`long`**：8字节（64位），范围：-2^63 ~ 2^63-1（约-9.2亿亿 ~ 9.2亿亿）

### 整数类型的使用

```java
// 整数类型的使用
byte b = 100;
short s = 1000;
int i = 100000;
long l = 1000000000L;  // 注意：long类型需要加L或l后缀

System.out.println("byte: " + b);
System.out.println("short: " + s);
System.out.println("int: " + i);
System.out.println("long: " + l);
```

### 整数类型的进制表示
Java支持十进制、八进制、十六进制和二进制表示整数：
- **十进制**：默认表示方式，如`123`
- **八进制**：以`0`开头，如`0173`（表示十进制的123）
- **十六进制**：以`0x`或`0X`开头，如`0x7B`（表示十进制的123）
- **二进制**：以`0b`或`0B`开头（Java 7+），如`0b1111011`（表示十进制的123）

```java
// 整数的进制表示
int decimal = 123;  // 十进制
int octal = 0173;  // 八进制
int hexadecimal = 0x7B;  // 十六进制
int binary = 0b1111011;  // 二进制（Java 7+）

System.out.println("Decimal: " + decimal);  // 输出：123
System.out.println("Octal: " + octal);  // 输出：123
System.out.println("Hexadecimal: " + hexadecimal);  // 输出：123
System.out.println("Binary: " + binary);  // 输出：123
```

## 浮点类型

### 浮点类型概述
浮点类型用于表示带小数部分的数值，Java提供了两种浮点类型：`float`和`double`。

### 浮点类型的种类
- **`float`**：4字节（32位），单精度浮点数，精度约6-7位小数
- **`double`**：8字节（64位），双精度浮点数，精度约15-17位小数

### 浮点类型的使用

```java
// 浮点类型的使用
float f = 3.14F;  // 注意：float类型需要加F或f后缀
double d = 3.1415926535;

System.out.println("float: " + f);
System.out.println("double: " + d);
```

### 浮点类型的科学计数法表示
浮点类型可以使用科学计数法表示：
- `3.14e2` 表示 `3.14 * 10^2` = 314.0
- `3.14e-2` 表示 `3.14 * 10^-2` = 0.0314

```java
// 浮点类型的科学计数法表示
double scientific1 = 3.14e2;  // 314.0
double scientific2 = 3.14e-2;  // 0.0314

System.out.println("Scientific notation 1: " + scientific1);  // 输出：314.0
System.out.println("Scientific notation 2: " + scientific2);  // 输出：0.0314
```

### 浮点类型的注意事项
- 浮点类型存在精度问题，不适合用于精确计算（如金融计算）。
- 避免使用浮点类型进行相等性比较，因为存在精度误差。
- 对于精确计算，应该使用`java.math.BigDecimal`类。

## 字符类型

### 字符类型概述
字符类型用于表示单个字符，Java中的`char`类型占用2字节（16位），可以表示Unicode字符集中的字符。

### 字符类型的使用

```java
// 字符类型的使用
char c1 = 'A';  // 单个字符
char c2 = '中';  // 中文字符
char c3 = '\u0041';  // Unicode编码表示的字符（'A'）

System.out.println("char1: " + c1);  // 输出：A
System.out.println("char2: " + c2);  // 输出：中
System.out.println("char3: " + c3);  // 输出：A
```

### 转义字符
转义字符用于表示无法直接输入的字符，以反斜杠`\`开头：
- `\n`：换行符
- `\t`：制表符
- `\r`：回车符
- `\b`：退格符
- `\f`：换页符
- `\'`：单引号
- `\