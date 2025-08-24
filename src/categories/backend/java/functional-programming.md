# 函数式编程

函数式编程是一种声明式编程范式，强调将计算视为数学函数的评估，避免状态变化和可变数据。Java 8引入了函数式编程特性，极大地丰富了Java的表达能力。

## 函数式编程基础

### 什么是函数式编程
函数式编程是一种编程范式，它将计算视为数学函数的评估，避免状态变化和副作用。核心原则包括：
- 函数是一等公民
- 不可变性
- 声明式编程
- 纯函数

### 函数式编程与命令式编程的区别
- **命令式编程**：关注"如何做"（How），描述解决问题的具体步骤
- **函数式编程**：关注"做什么"（What），描述想要的结果而非具体步骤

## Lambda表达式

### Lambda表达式的语法
Lambda表达式的基本语法：`(参数列表) -> { 方法体 }`

```java
// 无参数，无返回值
() -> System.out.println("Hello Lambda")

// 有参数，无返回值
(String s) -> System.out.println(s)

// 有参数，有返回值
(int a, int b) -> { return a + b; }

// 简化形式（类型推断）
(a, b) -> a + b
```

### Lambda表达式的使用场景
- 替代匿名内部类
- 作为函数参数传递
- 简化集合操作
- 实现函数式接口

### Lambda表达式的类型推断
Java编译器可以根据上下文推断Lambda表达式的参数类型和返回类型，使代码更加简洁。

```java
// 无需指定参数类型
List<String> list = Arrays.asList("a", "b", "c");
list.forEach(s -> System.out.println(s)); // s的类型被推断为String
```

## 函数式接口

### 什么是函数式接口
函数式接口是只包含一个抽象方法的接口，可以使用`@FunctionalInterface`注解标记。

```java
@FunctionalInterface
interface MyFunction {
    void apply();
}
```

### Java内置的函数式接口
Java 8提供了一系列内置的函数式接口：

#### 消费型接口
- `Consumer<T>`: 接受一个输入参数，无返回值
  ```java
  Consumer<String> consumer = s -> System.out.println(s);
  consumer.accept("Hello"); // 输出: Hello
  ```

#### 供给型接口
- `Supplier<T>`: 无输入参数，返回一个结果
  ```java
  Supplier<String> supplier = () -> "Hello World";
  String result = supplier.get(); // result: Hello World
  ```

#### 函数型接口
- `Function<T, R>`: 接受一个输入参数，返回一个结果
  ```java
  Function<Integer, String> function = i -> "Number: " + i;
  String result = function.apply(10); // result: Number: 10
  ```

#### 断言型接口
- `Predicate<T>`: 接受一个输入参数，返回一个布尔值
  ```java
  Predicate<Integer> predicate = i -> i > 0;
  boolean result = predicate.test(5); // result: true
  ```

### 自定义函数式接口
除了使用内置的函数式接口，也可以根据需要自定义函数式接口。

```java
@FunctionalInterface
interface Calculator<T> {
    T calculate(T a, T b);
}

// 使用自定义函数式接口
Calculator<Integer> add = (a, b) -> a + b;
int result = add.calculate(5, 3); // result: 8
```

## 方法引用

### 方法引用的语法
方法引用使用`::`操作符，用于引用已存在的方法。

```java
// 静态方法引用
Function<Integer, String> intToString = String::valueOf;

// 实例方法引用
List<String> list = Arrays.asList("a", "b", "c");
list.forEach(System.out::println);

// 构造方法引用
Supplier<List<String>> listSupplier = ArrayList::new;
List<String> newList = listSupplier.get();
```

### 方法引用的类型
- 静态方法引用：`类名::静态方法名`
- 实例方法引用：`对象名::实例方法名`
- 类的实例方法引用：`类名::实例方法名`
- 构造方法引用：`类名::new`

## Stream API

### Stream的概念
Stream是Java 8引入的对集合进行操作的新抽象，它允许以声明式方式处理数据。

### Stream的创建

```java
// 从集合创建
List<String> list = Arrays.asList("a", "b", "c");
Stream<String> stream1 = list.stream();

// 从数组创建
String[] array = {"a", "b", "c"};
Stream<String> stream2 = Arrays.stream(array);

// 从值创建
Stream<String> stream3 = Stream.of("a", "b", "c");

// 无限流
Stream<Integer> infiniteStream = Stream.iterate(0, n -> n + 2);
```

### Stream的操作类型
- **中间操作**：返回Stream，可以链式调用
  ```java
  // 过滤
  Stream<String> filteredStream = stream.filter(s -> s.startsWith("a"));

  // 映射
  Stream<Integer> lengthStream = stream.map(String::length);

  // 排序
  Stream<String> sortedStream = stream.sorted();
  ```

- **终端操作**：返回非Stream结果，终止流
  ```java
  // 收集
  List<String> resultList = stream.collect(Collectors.toList());

  // 计算总数
  long count = stream.count();

  // 查找第一个
  Optional<String> first = stream.findFirst();
  ```

### Stream的并行处理
Stream API支持并行处理，可以充分利用多核处理器的优势。

```java
// 并行流
Stream<String> parallelStream = list.parallelStream();

// 转换为并行流
Stream<String> parallelStream2 = stream.parallel();
```

## 函数式编程进阶

### 复合函数
函数式接口支持复合操作，可以将多个函数组合成一个新函数。

```java
Function<Integer, Integer> add5 = x -> x + 5;
Function<Integer, Integer> multiply2 = x -> x * 2;

// 先加5，再乘2
Function<Integer, Integer> add5ThenMultiply2 = add5.andThen(multiply2);
int result = add5ThenMultiply2.apply(10); // result: 30

// 先乘2，再加5
Function<Integer, Integer> multiply2ThenAdd5 = add5.compose(multiply2);
int result2 = multiply2ThenAdd5.apply(10); // result: 25
```

### 柯里化
柯里化是将接受多个参数的函数转换为接受单一参数的函数序列的过程。

```java
// 非柯里化函数
BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;

// 柯里化函数
Function<Integer, Function<Integer, Integer>> curriedAdd = a -> b -> a + b;

// 使用柯里化函数
int result = curriedAdd.apply(5).apply(3); // result: 8
```

### 闭包
Lambda表达式可以捕获外部变量，形成闭包。被捕获的变量需要是final或effectively final的。

```java
int x = 10;
Consumer<Integer> consumer = y -> System.out.println(x + y);
consumer.accept(5); // 输出: 15
```

## 函数式编程最佳实践

1. 优先使用方法引用而非复杂的Lambda表达式
2. 保持Lambda表达式简洁，避免过于复杂的逻辑
3. 合理使用函数式接口，避免创建不必要的自定义接口
4. 注意Stream的关闭，特别是处理IO流时
5. 避免在并行流中使用非线程安全的操作
6. 理解延迟执行特性，合理组织Stream操作顺序
7. 优先使用不可变数据结构
8. 避免在Lambda表达式中修改外部变量
9. 合理使用Optional避免空指针异常
10. 对函数式代码进行充分测试

## Java函数式编程新特性

### Java 9的函数式增强
- 新增`Optional`的`or`、`ifPresentOrElse`等方法

### Java 10的函数式增强
- 局部变量类型推断(`var`)使Lambda表达式更简洁

### Java 11的函数式增强
- 新增`String`的`lines()`、`isBlank()`等方法，方便Stream操作

### Java 16的函数式增强
- `Stream`新增`mapMulti`方法，支持更灵活的映射操作