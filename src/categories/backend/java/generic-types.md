# 泛型类型

泛型是Java SE 5引入的一个重要特性，它允许在定义类、接口和方法时使用类型参数，从而实现代码的复用和类型安全。泛型的核心思想是将类型作为参数传递。

## 泛型简介

### 什么是泛型
泛型是一种参数化类型的机制，它允许在定义类、接口和方法时使用类型参数，而不是具体的类型。这些类型参数在使用时被具体的类型替换。

### 泛型的优势
- **类型安全**：在编译时检查类型，避免运行时类型错误
- **代码复用**：编写通用的代码，适用于多种类型
- **消除类型转换**：无需手动进行类型转换，提高代码可读性
- **更好的API设计**：使API更加清晰，明确方法的输入和输出类型

### 泛型的基本语法
泛型使用尖括号`<>`来指定类型参数，类型参数通常使用单个大写字母表示。

```java
// 泛型类
class Box<T> {
    private T content;
    // ...
}

// 泛型接口
interface List<E> {
    void add(E element);
    // ...
}

// 泛型方法
<T> T getFirstElement(List<T> list) {
    // ...
}
```

## 泛型类与接口

### 泛型类的定义与使用
泛型类是在类定义时使用类型参数的类。

```java
// 定义泛型类
class Box<T> {
    private T content;

    public void setContent(T content) {
        this.content = content;
    }

    public T getContent() {
        return content;
    }
}

// 使用泛型类
Box<String> stringBox = new Box<>();
stringBox.setContent("Hello");
String content = stringBox.getContent();

Box<Integer> integerBox = new Box<>();
integerBox.setContent(100);
Integer number = integerBox.getContent();
```

### 泛型接口的定义与使用
泛型接口是在接口定义时使用类型参数的接口。

```java
// 定义泛型接口
interface Pair<K, V> {
    K getKey();
    V getValue();
}

// 实现泛型接口
class SimplePair<K, V> implements Pair<K, V> {
    private K key;
    private V value;

    public SimplePair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    @Override
    public K getKey() {
        return key;
    }

    @Override
    public V getValue() {
        return value;
    }
}

// 使用泛型接口
Pair<String, Integer> pair = new SimplePair<>("age", 30);
String key = pair.getKey();
Integer value = pair.getValue();
```

## 泛型方法

### 泛型方法的定义与使用
泛型方法是在方法声明时使用类型参数的方法，可以定义在泛型类中或普通类中。

```java
// 泛型类中的泛型方法
class Box<T> {
    private T content;

    // 泛型方法
    <U> void copyContent(Box<U> source) {
        this.content = (T) source.getContent(); // 需要类型转换
    }
}

// 普通类中的泛型方法
class Utils {
    // 泛型方法
    static <T> T getFirstElement(List<T> list) {
        if (list == null || list.isEmpty()) {
            return null;
        }
        return list.get(0);
    }
}

// 使用泛型方法
List<String> stringList = Arrays.asList("a", "b", "c");
String first = Utils.getFirstElement(stringList);
```

### 类型参数的限定
可以对泛型的类型参数进行限定，指定类型参数必须是某个类的子类或实现某个接口。

```java
// 限定类型参数为Number的子类
<T extends Number> double sum(List<T> numbers) {
    double total = 0;
    for (T number : numbers) {
        total += number.doubleValue();
    }
    return total;
}

// 限定类型参数实现多个接口
<T extends Comparable<T> & Serializable> T max(List<T> list) {
    // ...
}
```

## 泛型通配符

### 无界通配符
无界通配符`?`表示可以接受任何类型。

```java
// 无界通配符
void printBox(Box<?> box) {
    System.out.println(box.getContent());
}
```

### 上界通配符
上界通配符`? extends T`表示可以接受T类型或T的子类。

```java
// 上界通配符
void addNumbers(List<? extends Number> numbers) {
    // 可以读取，但不能添加（除了null）
    Number first = numbers.get(0);
    // numbers.add(10); // 编译错误
}
```

### 下界通配符
下界通配符`? super T`表示可以接受T类型或T的父类。

```java
// 下界通配符
void addIntegers(List<? super Integer> integers) {
    // 可以添加Integer及其子类
    integers.add(10);
    integers.add(20);
    // 读取时只能得到Object类型
    Object first = integers.get(0);
}
```

### 通配符的使用场景
- **无界通配符**：当方法只读取数据，不关心具体类型时
- **上界通配符**：当方法需要读取T类型的数据时
- **下界通配符**：当方法需要写入T类型的数据时

## 类型擦除

### 类型擦除的概念
Java泛型是通过类型擦除实现的，在编译时会将泛型类型参数替换为原始类型（raw type）。

```java
// 编译前
Box<String> stringBox = new Box<>();

// 编译后（类型擦除）
Box stringBox = new Box();
```

### 类型擦除的影响
- 运行时无法获取泛型的具体类型信息
- 泛型数组的创建受到限制
- 不能在静态上下文中使用泛型类型参数
- 不能使用基本类型作为泛型参数

### 桥接方法
为了保持多态性，编译器会在泛型类的子类中生成桥接方法。

```java
class StringBox extends Box<String> {
    @Override
    public void setContent(String content) {
        super.setContent(content);
    }

    // 编译器生成的桥接方法
    @Override
    public void setContent(Object content) {
        setContent((String) content);
    }
}
```

## 泛型的限制和注意事项

### 不能使用基本类型作为泛型参数
```java
// 编译错误
Box<int> intBox = new Box<>();

// 正确写法
Box<Integer> integerBox = new Box<>();
```

### 不能创建泛型数组
```java
// 编译错误
Box<String>[] boxes = new Box<String>[10];

// 可以使用通配符
Box<?>[] boxes = new Box<?>[10];
```

### 不能在静态上下文中使用泛型类型参数
```java
class Box<T> {
    // 编译错误
    private static T content;

    // 编译错误
    public static T getContent() {
        return content;
    }
}
```

### 不能使用instanceof检查泛型类型
```java
// 编译错误
if (box instanceof Box<String>) {
    // ...
}

// 可以使用无界通配符
if (box instanceof Box<?>) {
    // ...
}
```

## 泛型最佳实践

1. 始终使用具体的类型参数，避免使用原始类型
2. 优先使用泛型方法而非泛型类，提高代码复用性
3. 合理使用通配符，遵循PECS原则（Producer Extends, Consumer Super）
4. 避免过度泛型化，保持代码清晰
5. 使用@SuppressWarnings("unchecked")注解抑制不必要的unchecked警告
6. 对泛型类型参数进行适当的限定，提高类型安全性
7. 注意类型擦除的影响，避免在运行时依赖泛型类型信息
8. 避免创建泛型数组，使用集合类代替
9. 优先使用Java内置的泛型类和接口
10. 对泛型代码进行充分测试

## 泛型的高级应用

### 泛型与反射
可以通过反射获取泛型的类型信息，但受到类型擦除的限制。

```java
// 获取字段的泛型类型
Field field = MyClass.class.getDeclaredField("list");
ParameterizedType paramType = (ParameterizedType) field.getGenericType();
Type[] actualTypeArgs = paramType.getActualTypeArguments();
Class<?> genericType = (Class<?>) actualTypeArgs[0];
```

### 泛型与序列化
泛型类可以被序列化，但序列化过程中不会保留泛型类型信息。

### 泛型与注解
可以在注解中使用泛型，但需要注意Java注解的限制。

### 泛型与设计模式
泛型可以与设计模式结合，如泛型单例模式、泛型工厂模式等。

```java
// 泛型工厂模式
class Factory<T> {
    public T create(Class<T> type) {
        try {
            return type.getDeclaredConstructor().newInstance();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
```

## Java泛型新特性

### Java 7的泛型增强
- 钻石操作符(`<>`)：简化泛型实例化

```java
// Java 7前
Box<String> box = new Box<String>();

// Java 7及以后
Box<String> box = new Box<>();
```

### Java 8的泛型增强
- Lambda表达式与泛型的结合
- Stream API中的泛型应用

### Java 9的泛型增强
- 私有接口方法支持泛型

### Java 10的泛型增强
- 局部变量类型推断(`var`)与泛型的结合

### Java 11的泛型增强
- 字符串API的泛型增强

### Java 16的泛型增强
- `record`类型支持泛型