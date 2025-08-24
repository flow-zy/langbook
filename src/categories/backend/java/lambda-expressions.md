# Lambda表达式

Lambda表达式是Java 8引入的一个重要特性，它允许我们以更简洁的方式表示匿名函数，是函数式编程的基础。

## Lambda表达式概述

### 什么是Lambda表达式
Lambda表达式是一个匿名函数，它可以传递给方法作为参数，或者赋值给变量。Lambda表达式允许我们将函数作为一等公民对待。

### Lambda表达式的作用
- **简化代码**：减少匿名内部类的样板代码。
- **函数式编程**：支持函数式编程风格。
- **提高可读性**：使代码更加简洁、清晰。
- **并行处理**：结合Stream API，简化并行处理。

### Lambda表达式的基本语法
Lambda表达式的基本语法为：`(parameters) -> expression` 或 `(parameters) -> { statements; }`

- `parameters`：参数列表，可以是零个或多个参数。
- `->`：Lambda操作符，分隔参数列表和表达式体。
- `expression`：表达式体，可以是一个表达式。
- `{ statements; }`：代码块，可以包含多个语句。

## Lambda表达式的使用场景

Lambda表达式主要用于以下场景：
- 函数式接口的实现。
- 集合的迭代和操作。
- 事件监听器的实现。
- 并发编程中的任务定义。

## 函数式接口

### 什么是函数式接口
函数式接口是指只有一个抽象方法的接口。Lambda表达式可以用来实现函数式接口的抽象方法。

### Java内置的函数式接口
Java 8在`java.util.function`包中提供了一些常用的函数式接口：
- `Predicate<T>`：接收一个参数，返回布尔值。
- `Consumer<T>`：接收一个参数，无返回值。
- `Function<T, R>`：接收一个参数，返回一个结果。
- `Supplier<T>`：无参数，返回一个结果。
- `UnaryOperator<T>`：接收一个参数，返回相同类型的结果。
- `BinaryOperator<T>`：接收两个相同类型的参数，返回相同类型的结果。

### 自定义函数式接口
可以使用`@FunctionalInterface`注解定义自定义函数式接口。

```java
@FunctionalInterface
public interface MyFunction<T, R> {
    R apply(T t);
}
```

## Lambda表达式的示例

### 基本示例

```java
// 无参数，无返回值
Runnable runnable = () -> System.out.println("Hello, Lambda!");

// 一个参数，无返回值
Consumer<String> consumer = (s) -> System.out.println(s);

// 一个参数，有返回值
Function<Integer, Integer> square = (n) -> n * n;

// 多个参数，有返回值
BinaryOperator<Integer> sum = (a, b) -> a + b;

// 代码块
Consumer<String> multiLine = (s) -> {
    System.out.println("Start processing...");
    System.out.println(s);
    System.out.println("End processing.");
};
```

### 简化参数列表

```java
// 省略参数类型（类型推断）
Function<Integer, Integer> square = n -> n * n;

// 单个参数可以省略括号
Consumer<String> consumer = s -> System.out.println(s);

// 无参数必须使用括号
Runnable runnable = () -> System.out.println("Hello, Lambda!");
```

### 使用Lambda表达式实现函数式接口

```java
// 实现Predicate接口
Predicate<Integer> isEven = n -> n % 2 == 0;
boolean result = isEven.test(4);  // true

// 实现Function接口
Function<String, Integer> length = s -> s.length();
int len = length.apply("Java");  // 4

// 实现Consumer接口
Consumer<String> print = s -> System.out.println(s);
print.accept("Hello, Lambda!");  // 输出: Hello, Lambda!

// 实现Supplier接口
Supplier<String> supplier = () -> "Hello, Supplier!";
String value = supplier.get();  // Hello, Supplier!
```

## Lambda表达式与集合

### 集合的迭代

```java
// 传统的for-each循环
List<String> list = Arrays.asList("Java", "Lambda", "Expression");
for (String s : list) {
    System.out.println(s);
}

// 使用Lambda表达式迭代
list.forEach(s -> System.out.println(s));

// 使用方法引用进一步简化
list.forEach(System.out::println);
```

### 集合的排序

```java
// 传统的排序方式
List<String> list = Arrays.asList("Java", "Lambda", "Expression");
Collections.sort(list, new Comparator<String>() {
    @Override
    public int compare(String s1, String s2) {
        return s1.length() - s2.length();
    }
});

// 使用Lambda表达式排序
Collections.sort(list, (s1, s2) -> s1.length() - s2.length());

// 使用方法引用和Comparator的静态方法
list.sort(Comparator.comparingInt(String::length));
```

### 集合的过滤

```java
// 过滤集合中的元素
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
List<Integer> evenNumbers = numbers.stream()
    .filter(n -> n % 2 == 0)
    .collect(Collectors.toList());
```

## Lambda表达式与方法引用

### 什么是方法引用
方法引用是Lambda表达式的一种简化形式，它允许我们直接引用已有的方法。

### 方法引用的类型
- **静态方法引用**：`ClassName::staticMethodName`
- **实例方法引用**：`instance::instanceMethodName`
- **类方法引用**：`ClassName::instanceMethodName`
- **构造方法引用**：`ClassName::new`

### 方法引用的示例

```java
// 静态方法引用
Function<Integer, String> intToString = String::valueOf;

// 实例方法引用
String str = "Hello";
Supplier<Integer> length = str::length;

// 类方法引用
BiPredicate<String, String> equals = String::equals;

// 构造方法引用
Supplier<List<String>> listSupplier = ArrayList::new;
Function<Integer, List<String>> listWithSize = ArrayList::new;
```

## Lambda表达式与变量作用域

### 局部变量捕获
Lambda表达式可以访问外部的局部变量，但这些变量必须是final或effectively final的。

```java
// 局部变量捕获
int num = 10;
Consumer<Integer> consumer = n -> System.out.println(n + num);
consumer.accept(5);  // 输出: 15

// 错误：num不是final或effectively final
// num = 20;  // 取消注释会导致编译错误
```

### 访问实例变量和静态变量
Lambda表达式可以自由访问外部的实例变量和静态变量。

```java
public class LambdaDemo {
    private int instanceVar = 10;
    private static int staticVar = 20;

    public void demo() {
        // 访问实例变量
        Consumer<Integer> consumer1 = n -> System.out.println(n + instanceVar);

        // 访问静态变量
        Consumer<Integer> consumer2 = n -> System.out.println(n + staticVar);
    }
}
```

### this关键字
在Lambda表达式中，`this`关键字引用的是包围Lambda表达式的类的实例。

```java
public class LambdaDemo {
    private int value = 10;

    public void demo() {
        Consumer<Integer> consumer = n -> {
            System.out.println(this.value);  // 引用LambdaDemo的实例变量
        };
    }
}
```

## Lambda表达式的类型推断

Java编译器可以根据上下文推断Lambda表达式的类型。

```java
// 类型推断
List<String> list = Arrays.asList("Java", "Lambda", "Expression");

// 编译器推断Comparator<String>
list.sort((s1, s2) -> s1.length() - s2.length());

// 编译器推断Predicate<Integer>
Predicate<Integer> isEven = n -> n % 2 == 0;
```

## Lambda表达式的异常处理

### 异常处理的方式
Lambda表达式中可以抛出异常，但需要在函数式接口的方法签名中声明，或者在Lambda表达式中捕获异常。

```java
// 函数式接口声明异常
@FunctionalInterface
public interface ThrowingFunction<T, R, E extends Exception> {
    R apply(T t) throws E;
}

// 使用带异常的函数式接口
ThrowingFunction<String, Integer, NumberFormatException> parser = s -> Integer.parseInt(s);

// 在Lambda表达式中捕获异常
Function<String, Integer> safeParser = s -> {
    try {
        return Integer.parseInt(s);
    } catch (NumberFormatException e) {
        return 0;
    }
};
```

## Lambda表达式的最佳实践

### 保持Lambda表达式简洁
Lambda表达式应该保持简洁，只包含必要的代码。如果代码块过长，应考虑将其提取为方法。

### 优先使用方法引用
当Lambda表达式只是调用已有的方法时，优先使用方法引用。

### 避免过度使用Lambda表达式
Lambda表达式适合简单的功能，如果逻辑复杂，应考虑使用传统的方法或类。

### 注意变量作用域
注意Lambda表达式中访问的外部变量必须是final或effectively final的。

### 合理使用函数式接口
选择合适的函数式接口，避免创建不必要的自定义函数式接口。

### 注意异常处理
Lambda表达式中的异常处理需要特别注意，确保异常被正确捕获或声明。

## Lambda表达式的实际应用场景

### 集合操作
结合Stream API，使用Lambda表达式进行集合的过滤、映射、排序等操作。

```java
List<String> list = Arrays.asList("Java", "Lambda", "Expression", "Stream", "API");

// 过滤长度大于5的字符串，并转换为大写
List<String> result = list.stream()
    .filter(s -> s.length() > 5)
    .map(String::toUpperCase)
    .collect(Collectors.toList());
```

### 事件监听器
使用Lambda表达式简化事件监听器的实现。

```java
// 传统的事件监听器
button.addActionListener(new ActionListener() {
    @Override
    public void actionPerformed(ActionEvent e) {
        System.out.println("Button clicked!");
    }
});

// 使用Lambda表达式
button.addActionListener(e -> System.out.println("Button clicked!"));
```

### 并发编程
使用Lambda表达式定义线程或任务。

```java
// 创建线程
Thread thread = new Thread(() -> {
    // 线程执行的代码
    System.out.println("Thread is running");
});
thread.start();

// 使用ExecutorService
ExecutorService executor = Executors.newFixedThreadPool(5);
executor.submit(() -> {
    // 任务执行的代码
    System.out.println("Task is running");
});
executor.shutdown();
```

### 函数式编程
使用Lambda表达式实现函数式编程模式，如高阶函数、闭包等。

```java
// 高阶函数：接收函数作为参数
public static <T, R> List<R> map(List<T> list, Function<T, R> mapper) {
    List<R> result = new ArrayList<>();
    for (T t : list) {
        result.add(mapper.apply(t));
    }
    return result;
}

// 使用高阶函数
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
List<Integer> squares = map(numbers, n -> n * n);
```

## Lambda表达式的限制

### 只能用于函数式接口
Lambda表达式只能用于实现函数式接口（只有一个抽象方法的接口）。

### 无法访问非final的局部变量
Lambda表达式只能访问final或effectively final的局部变量。

### 无法使用break、continue和return
Lambda表达式中不能使用break、continue和return（除非return是在Lambda表达式的最后一行，返回Lambda表达式的结果）。

### 无法定义同名变量
Lambda表达式中不能定义与外部作用域同名的变量。

### 性能考虑
Lambda表达式的性能通常与匿名内部类相当，但在某些情况下可能略慢，尤其是在频繁创建Lambda表达式实例的情况下。

## Java 8及以上版本的Lambda表达式增强

### Java 8的Lambda表达式
Java 8引入了Lambda表达式和函数式接口。

### Java 9的Lambda表达式增强
Java 9允许在Lambda表达式中使用`var`关键字进行局部变量声明（预览功能，Java 11正式支持）。

```java
// Java 11+支持
Function<String, Integer> parser = (var s) -> Integer.parseInt(s);
```

### Java 10的Lambda表达式增强
Java 10引入了局部变量类型推断，进一步简化Lambda表达式的编写。

### Java 14的Lambda表达式增强
Java 14引入了Pattern Matching for instanceof（预览功能），可以与Lambda表达式结合使用。