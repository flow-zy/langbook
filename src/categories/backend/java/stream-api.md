# Stream API

Stream API是Java 8引入的一个重要特性，它提供了一种高效、声明式的方式来处理集合数据。Stream API结合Lambda表达式，可以极大地简化集合的操作和处理。

## Stream API概述

### 什么是Stream API
Stream是一个来自数据源的元素队列，并支持聚合操作。Stream API提供了一种类似于SQL查询的方式来处理数据。

### Stream API的作用
- **简化代码**：以声明式方式处理数据，减少样板代码。
- **提高可读性**：代码更加简洁、清晰。
- **并行处理**：轻松实现数据的并行处理。
- **高效处理**：延迟执行和短路操作提高处理效率。

### Stream API的特点
- **非修改性**：Stream不会修改源数据。
- **延迟执行**：中间操作是延迟执行的，只有在终端操作调用时才会执行。
- **一次性使用**：每个Stream只能使用一次。
- **管道操作**：可以链式调用多个操作。

## Stream的创建

### 从集合创建

```java
// 从集合创建Stream
List<String> list = Arrays.asList("Java", "Stream", "API");
Stream<String> stream = list.stream();

// 创建并行Stream
Stream<String> parallelStream = list.parallelStream();
```

### 从数组创建

```java
// 从数组创建Stream
String[] array = {"Java", "Stream", "API"};
Stream<String> stream = Arrays.stream(array);

// 从部分数组创建Stream
Stream<String> partialStream = Arrays.stream(array, 1, 3);  // 从索引1到2（不包含3）
```

### 从值创建

```java
// 从值创建Stream
Stream<String> stream = Stream.of("Java", "Stream", "API");
```

### 从文件创建

```java
// 从文件创建Stream
try (Stream<String> lines = Files.lines(Paths.get("file.txt"))) {
    lines.forEach(System.out::println);
} catch (IOException e) {
    e.printStackTrace();
}
```

### 无限流

```java
// 生成无限流
Stream<Integer> infiniteStream = Stream.generate(() -> 1);
Stream<Integer> infiniteSequence = Stream.iterate(0, n -> n + 2);

// 限制无限流的大小
Stream<Integer> limitedStream = infiniteStream.limit(10);
```

## Stream的操作类型

Stream的操作分为两种类型：
- **中间操作**：返回一个新的Stream，可以链式调用。
- **终端操作**：返回一个结果或副作用，终止Stream。

### 中间操作
常见的中间操作：
- `filter`：过滤元素。
- `map`：转换元素。
- `sorted`：排序元素。
- `distinct`：去重元素。
- `limit`：限制元素数量。
- `skip`：跳过元素。
- `peek`：查看元素。

### 终端操作
常见的终端操作：
- `collect`：收集元素到集合。
- `forEach`：遍历元素。
- `reduce`：聚合元素。
- `count`：计数元素。
- `max`/`min`：最大/最小值。
- `findFirst`/`findAny`：查找元素。
- `anyMatch`/`allMatch`/`noneMatch`：匹配元素。

## 中间操作

### 过滤（filter）

```java
// 过滤偶数
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
Stream<Integer> evenNumbers = numbers.stream()
    .filter(n -> n % 2 == 0);
```

### 映射（map）

```java
// 将字符串转换为长度
List<String> words = Arrays.asList("Java", "Stream", "API");
Stream<Integer> lengths = words.stream()
    .map(String::length);
```

### 排序（sorted）

```java
// 排序元素
List<Integer> numbers = Arrays.asList(5, 3, 8, 1, 2);
Stream<Integer> sortedNumbers = numbers.stream()
    .sorted();

// 自定义排序
Stream<Integer> customSorted = numbers.stream()
    .sorted((a, b) -> b - a);  // 降序排序
```

### 去重（distinct）

```java
// 去重元素
List<Integer> numbers = Arrays.asList(1, 2, 2, 3, 3, 3, 4, 5);
Stream<Integer> distinctNumbers = numbers.stream()
    .distinct();
```

### 限制（limit）

```java
// 限制元素数量
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
Stream<Integer> limitedNumbers = numbers.stream()
    .limit(5);  // 取前5个元素
```

### 跳过（skip）

```java
// 跳过元素
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
Stream<Integer> skippedNumbers = numbers.stream()
    .skip(5);  // 跳过前5个元素
```

### peek

```java
// 查看元素
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
Stream<Integer> peekedNumbers = numbers.stream()
    .peek(n -> System.out.println("Processing: " + n));
```

## 终端操作

### 收集（collect）

```java
// 收集到List
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
List<Integer> evenNumbers = numbers.stream()
    .filter(n -> n % 2 == 0)
    .collect(Collectors.toList());

// 收集到Set
Set<Integer> evenSet = numbers.stream()
    .filter(n -> n % 2 == 0)
    .collect(Collectors.toSet());

// 收集到Map
Map<Integer, String> numberMap = numbers.stream()
    .collect(Collectors.toMap(n -> n, n -> "Number: " + n));

// 连接字符串
String joined = words.stream()
    .collect(Collectors.joining(", "));
```

### 遍历（forEach）

```java
// 遍历元素
List<String> words = Arrays.asList("Java", "Stream", "API");
words.stream()
    .forEach(System.out::println);
```

### 聚合（reduce）

```java
// 求和
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
Optional<Integer> sum = numbers.stream()
    .reduce((a, b) -> a + b);

// 带初始值的求和
int sumWithInit = numbers.stream()
    .reduce(0, (a, b) -> a + b);

// 复杂聚合
String concatenated = words.stream()
    .reduce("", (a, b) -> a + ", " + b);
```

### 计数（count）

```java
// 计数元素
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
long count = numbers.stream()
    .filter(n -> n % 2 == 0)
    .count();
```

### 最大/最小（max/min）

```java
// 最大值
Optional<Integer> max = numbers.stream()
    .max(Integer::compare);

// 最小值
Optional<Integer> min = numbers.stream()
    .min(Integer::compare);
```

### 查找（findFirst/findAny）

```java
// 查找第一个元素
Optional<Integer> first = numbers.stream()
    .filter(n -> n % 2 == 0)
    .findFirst();

// 查找任意元素（在并行流中更高效）
Optional<Integer> any = numbers.parallelStream()
    .filter(n -> n % 2 == 0)
    .findAny();
```

### 匹配（anyMatch/allMatch/noneMatch）

```java
// 是否有任意元素匹配
boolean hasEven = numbers.stream()
    .anyMatch(n -> n % 2 == 0);

// 是否所有元素都匹配
boolean allPositive = numbers.stream()
    .allMatch(n -> n > 0);

// 是否没有元素匹配
boolean noNegative = numbers.stream()
    .noneMatch(n -> n < 0);
```

## 并行流

### 什么是并行流
并行流是指在多个线程上同时执行的Stream，可以充分利用多核处理器的优势。

### 如何创建并行流

```java
// 从集合创建并行流
List<String> list = Arrays.asList("Java", "Stream", "API");
Stream<String> parallelStream = list.parallelStream();

// 将串行流转换为并行流
Stream<String> parallelStream = list.stream().parallel();
```

### 并行流的使用场景
- 数据量较大
- 操作独立（无状态）
- 计算密集型操作

### 并行流的注意事项
- **线程安全**：确保操作是线程安全的。
- **性能考虑**：对于小数据量，并行流的性能可能不如串行流。
- **顺序问题**：并行流不保证元素的处理顺序。

```java
// 并行流示例
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
long sum = numbers.parallelStream()
    .filter(n -> n % 2 == 0)
    .mapToInt(n -> n)
    .sum();
```

## Stream API的高级操作

### flatMap
`flatMap`用于将Stream中的每个元素转换为另一个Stream，然后将所有Stream合并为一个Stream。

```java
// flatMap示例
List<List<Integer>> lists = Arrays.asList(
    Arrays.asList(1, 2, 3),
    Arrays.asList(4, 5, 6),
    Arrays.asList(7, 8, 9)
);
Stream<Integer> flatStream = lists.stream()
    .flatMap(List::stream);
```

### 数值流
Java提供了专门的数值流（IntStream、LongStream、DoubleStream），用于高效处理数值数据。

```java
// 数值流示例
IntStream intStream = IntStream.range(1, 10);  // 1-9
IntStream intStreamClosed = IntStream.rangeClosed(1, 10);  // 1-10

// 转换为数值流
Stream<Integer> stream = Arrays.asList(1, 2, 3, 4, 5).stream();
IntStream intStream = stream.mapToInt(Integer::intValue);
```

### 分组和分区
使用`Collectors.groupingBy`和`Collectors.partitioningBy`进行分组和分区操作。

```java
// 分组
Map<String, List<Person>> peopleByCity = people.stream()
    .collect(Collectors.groupingBy(Person::getCity));

// 分区
Map<Boolean, List<Integer>> partitioned = numbers.stream()
    .collect(Collectors.partitioningBy(n -> n % 2 == 0));
```

## Stream API的最佳实践

### 利用延迟执行
中间操作是延迟执行的，只有在终端操作调用时才会执行，这可以优化性能。

### 利用短路操作
对于`findFirst`、`findAny`、`anyMatch`等操作，一旦找到满足条件的元素，就会停止处理。

### 避免副作用
Stream操作应该是无副作用的，不要修改外部变量或状态。

### 合理使用并行流
不是所有情况都适合使用并行流，对于小数据量或有状态的操作，串行流可能更合适。

### 使用方法引用
当操作是简单的方法调用时，使用方法引用可以使代码更简洁。

### 注意`Optional`的使用
许多Stream操作返回`Optional`，正确处理`Optional`可以避免空指针异常。

## Stream API的实际应用场景

### 数据过滤和转换

```java
// 过滤并转换数据
List<Person> people = Arrays.asList(
    new Person("Alice", 25),
    new Person("Bob", 30),
    new Person("Charlie", 35)
);

List<String> namesOfAdults = people.stream()
    .filter(p -> p.getAge() >= 18)
    .map(Person::getName)
    .collect(Collectors.toList());
```

### 数据聚合和统计

```java
// 数据聚合和统计
Double averageAge = people.stream()
    .mapToInt(Person::getAge)
    .average()
    .orElse(0);

IntSummaryStatistics stats = people.stream()
    .mapToInt(Person::getAge)
    .summaryStatistics();
System.out.println("Max age: " + stats.getMax());
System.out.println("Min age: " + stats.getMin());
System.out.println("Average age: " + stats.getAverage());
```

### 数据分组和分区

```java
// 数据分组
Map<Integer, List<Person>> peopleByAge = people.stream()
    .collect(Collectors.groupingBy(Person::getAge));

// 数据分区
Map<Boolean, List<Person>> adultsAndChildren = people.stream()
    .collect(Collectors.partitioningBy(p -> p.getAge() >= 18));
```

### 文件处理

```java
// 文件处理
try (Stream<String> lines = Files.lines(Paths.get("input.txt"))) {
    List<String> filteredLines = lines
        .filter(line -> line.contains("Java"))
        .collect(Collectors.toList());
} catch (IOException e) {
    e.printStackTrace();
}
```

## Stream API的限制

### 不能修改源数据
Stream操作不会修改源数据，这意味着如果需要修改数据，必须创建新的数据结构。

### 一次性使用
每个Stream只能使用一次，一旦执行了终端操作，Stream就会关闭。

### 无状态操作
Stream的中间操作应该是无状态的，即操作的结果不依赖于之前的元素或状态。

### 性能考虑
对于某些简单的操作，使用传统的循环可能比Stream API更高效。

## Java 8及以上版本的Stream API增强

### Java 8的Stream API
Java 8引入了Stream API。

### Java 9的Stream API增强
Java 9添加了以下Stream方法：
- `takeWhile`：根据条件获取元素，直到条件不满足。
- `dropWhile`：根据条件丢弃元素，直到条件不满足。
- `ofNullable`：创建可能为null的Stream。

```java
// Java 9+ takeWhile示例
Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5, 6);
Stream<Integer> taken = stream.takeWhile(n -> n < 4);  // [1, 2, 3]

// Java 9+ dropWhile示例
Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5, 6);
Stream<Integer> dropped = stream.dropWhile(n -> n < 4);  // [4, 5, 6]

// Java 9+ ofNullable示例
Stream<String> nullableStream = Stream.ofNullable(null);  // 空Stream
```

### Java 10的Stream API增强
Java 10添加了`toList()`方法，简化了Stream收集到List的操作。

```java
// Java 10+ toList()示例
List<String> list = stream.collect(Collectors.toList());  // 旧方式
List<String> list = stream.toList();  // 新方式（Java 10+）
```

### Java 16的Stream API增强
Java 16添加了`mapMulti`方法，用于更灵活的元素转换。

```java
// Java 16+ mapMulti示例
Stream<String> stream = Stream.of("a", "b", "c");
Stream<String> expanded = stream.mapMulti((s, consumer) -> {
    consumer.accept(s);
    consumer.accept(s.toUpperCase());
});  // ["a", "A", "b", "B", "c", "C"]
```