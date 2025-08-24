# 核心语法

Java核心语法是Java编程的基础，包括标识符、关键字、注释、数据类型、运算符、控制流语句等基本元素。本章将详细介绍Java的核心语法规则。

## 标识符与关键字

### 标识符
标识符是用来命名变量、方法、类、接口等程序元素的名称。Java标识符的命名规则如下：
- 由字母、数字、下划线(_)和美元符号($)组成。
- 不能以数字开头。
- 不能是Java关键字或保留字。
- 区分大小写。

**示例：**
```java
// 合法标识符
int count = 10;
String userName = "John";
double $salary = 5000.0;
class MyClass {}

// 非法标识符
int 1count = 10;  // 以数字开头
String user-name = "John";  // 包含连字符
double #salary = 5000.0;  // 包含非法字符
class class {}
```

###  关键字
Java关键字是具有特殊含义的保留字，不能用作标识符。Java中的关键字包括：

```
abstract, assert, boolean, break, byte, case, catch, char, class, const,
continue, default, do, double, else, enum, extends, final, finally, float,
for, goto, if, implements, import, instanceof, int, interface, long, native,
new, package, private, protected, public, return, short, static, strictfp,
super, switch, synchronized, this, throw, throws, transient, try, void,
volatile, while
```

###  命名规范
- 类名：使用驼峰命名法，首字母大写，如`MyClass`。
- 方法名：使用驼峰命名法，首字母小写，如`myMethod`。
- 变量名：使用驼峰命名法，首字母小写，如`myVariable`。
- 常量名：全部大写，单词之间用下划线分隔，如`MAX_VALUE`。
- 包名：全部小写，如`com.example.myapp`。

## 注释

Java支持三种类型的注释：

### 单行注释
使用`//`开头，注释从`//`到行尾。

```java
// 这是一个单行注释
int count = 10;  // 这也是一个单行注释
```

### 多行注释
使用`/*`开始，`*/`结束，可以跨越多行。

```java
/*
 * 这是一个多行注释
 * 可以跨越多行
 */
int count = 10;
```

### 文档注释
使用`/**`开始，`*/`结束，用于生成API文档。

```java
/**
 * 这是一个文档注释
 * @param name 用户名
 * @return 欢迎信息
 */
public String sayHello(String name) {
    return "Hello, " + name;
}
```

## 数组

数组是存储相同类型元素的集合。Java中的数组具有固定长度，一旦创建就不能改变。

### 数组的声明与初始化

```java
// 声明数组
int[] arr1;
int arr2[];  // 不推荐的风格

// 初始化数组
int[] arr3 = new int[5];  // 创建长度为5的int数组，初始值为0
int[] arr4 = {1, 2, 3, 4, 5};  // 创建并初始化数组
int[] arr5 = new int[]{1, 2, 3, 4, 5};  // 另一种初始化方式

// 二维数组
int[][] matrix1 = new int[3][3];  // 创建3x3的二维数组
int[][] matrix2 = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};  // 创建并初始化二维数组
```

### 数组的访问与遍历

```java
int[] arr = {1, 2, 3, 4, 5};

// 访问数组元素
System.out.println(arr[0]);  // 输出：1
arr[1] = 10;  // 修改数组元素

// 遍历数组
// 方式1：for循环
for (int i = 0; i < arr.length; i++) {
    System.out.println(arr[i]);
}

// 方式2：for-each循环
for (int element : arr) {
    System.out.println(element);
}
```

### 数组的常用操作

```java
// 数组排序
int[] arr = {5, 3, 1, 4, 2};
Arrays.sort(arr);  // 排序后：[1, 2, 3, 4, 5]

// 数组复制
int[] arr1 = {1, 2, 3};
int[] arr2 = Arrays.copyOf(arr1, arr1.length);  // arr2: [1, 2, 3]
int[] arr3 = Arrays.copyOfRange(arr1, 1, 3);  // arr3: [2, 3]

// 数组填充
int[] arr4 = new int[5];
Arrays.fill(arr4, 10);  // arr4: [10, 10, 10, 10, 10]

// 数组转字符串
String arrStr = Arrays.toString(arr1);  // arrStr: "[1, 2, 3]"
```

## 字符串

字符串是由字符组成的序列，在Java中使用`String`类表示。`String`类是不可变的，一旦创建，其值就不能改变。

### 字符串的创建

```java
String str1 = "Hello";  // 字符串字面量
String str2 = new String("Hello");  // 使用构造方法
char[] chars = {'H', 'e', 'l', 'l', 'o'};
String str3 = new String(chars);  // 从字符数组创建
```

### 字符串的常用方法

```java
String str = "Hello, World!";

// 获取长度
int length = str.length();  // 13

// 查找子串
int index = str.indexOf("World");  // 7
boolean contains = str.contains("World");  // true

// 截取子串
String substring1 = str.substring(7);  // "World!"
String substring2 = str.substring(7, 12);  // "World"

// 转换大小写
String upperCase = str.toUpperCase();  // "HELLO, WORLD!"
String lowerCase = str.toLowerCase();  // "hello, world!"

// 去除空白
String strWithSpaces = "  Hello, World!  ";
String trimmed = strWithSpaces.trim();  // "Hello, World!"

// 替换
String replaced = str.replace("World", "Java");  // "Hello, Java!"

// 分割
String[] parts = str.split(", ");  // ["Hello", "World!"]

// 连接
String concatenated = str.concat(" Welcome!");  // "Hello, World! Welcome!"

// 比较
boolean equals = str.equals("Hello, World!");  // true
boolean equalsIgnoreCase = str.equalsIgnoreCase("hello, world!");  // true
int compareTo = str.compareTo("Hello, Java!");  // 正数，表示str大于参数
```

### 字符串池
Java中的字符串字面量存储在字符串池中，以便重用。当创建一个字符串字面量时，如果字符串池中已存在相同的字符串，则直接返回其引用，而不创建新的对象。

```java
String str1 = "Hello";
String str2 = "Hello";  // 引用字符串池中的同一个对象
String str3 = new String("Hello");  // 创建新对象

System.out.println(str1 == str2);  // true，引用相同
System.out.println(str1 == str3);  // false，引用不同
System.out.println(str1.equals(str3));  // true，值相同
```

### StringBuilder与StringBuffer
由于`String`类是不可变的，频繁修改字符串会产生大量的临时对象。为了解决这个问题，Java提供了`StringBuilder`和`StringBuffer`类，它们是可变的字符串类。

- `StringBuilder`：非线程安全，性能好。
- `StringBuffer`：线程安全，性能较差。

```java
// 使用StringBuilder
StringBuilder sb = new StringBuilder("Hello");
sb.append(", ");
sb.append("World!");
String result = sb.toString();  // "Hello, World!"

// 使用StringBuffer
StringBuffer sf = new StringBuffer("Hello");
sf.append(", ");
sf.append("World!");
String result2 = sf.toString();  // "Hello, World!"
```

## 方法

方法是一段可重用的代码块，用于完成特定的功能。

### 方法的声明与调用

```java
// 方法声明
public int add(int a, int b) {
    return a + b;
}

// 方法调用
int sum = add(3, 5);  // sum = 8
```

### 方法的参数传递
Java中的方法参数传递是值传递(pass-by-value)：
- 对于基本数据类型，传递的是值的副本。
- 对于引用数据类型，传递的是引用的副本，但它们指向同一个对象。

```java
// 基本数据类型参数
public void increment(int num) {
    num++;
}

int a = 5;
increment(a);
System.out.println(a);  // 5，原值不变

// 引用数据类型参数
public void addElement(int[] arr, int element) {
    arr[0] = element;
}

int[] arr = {1, 2, 3};
addElement(arr, 10);
System.out.println(arr[0]);  // 10，对象被修改
```

### 方法的重载
方法重载(Overloading)是指在同一个类中，存在多个方法名相同但参数列表不同的方法。

```java
public int add(int a, int b) {
    return a + b;
}

public double add(double a, double b) {
    return a + b;
}

public int add(int a, int b, int c) {
    return a + b + c;
}
```

### 递归方法
递归方法是指调用自身的方法，用于解决可以分解为相同子问题的问题。

```java
// 计算阶乘
public int factorial(int n) {
    if (n == 0 || n == 1) {
        return 1;
    }
    return n * factorial(n - 1);
}
```