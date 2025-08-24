# 泛型

泛型是Java SE 5引入的一个重要特性，它允许在定义类、接口和方法时使用类型参数，从而实现代码的复用和类型安全。

## 泛型概述

### 什么是泛型
泛型（Generics）是一种参数化类型的机制，它允许我们在定义类、接口和方法时使用类型参数，而不是具体的类型。类型参数在使用时会被具体的类型替换。

### 泛型的优点
- **类型安全**：在编译时检查类型，避免运行时类型错误。
- **代码复用**：编写一次代码，可以处理多种类型的数据。
- **消除强制类型转换**：使用泛型可以避免不必要的类型转换，提高代码的可读性和安全性。

### 泛型的基本语法
泛型使用尖括号`<>`来定义类型参数，类型参数通常使用单个大写字母表示，如`T`、`E`、`K`、`V`等。

## 泛型类

泛型类是指在定义类时使用类型参数的类。

### 泛型类的定义

```java
// 定义一个泛型类
public class Box<T> {
    private T value;

    public void setValue(T value) {
        this.value = value;
    }

    public T getValue() {
        return value;
    }
}
```

### 泛型类的使用

```java
// 使用泛型类
Box<String> stringBox = new Box<>();
stringBox.setValue("Hello, Generics!");
String value = stringBox.getValue();  // 不需要类型转换

Box<Integer> integerBox = new Box<>();
integerBox.setValue(100);
Integer integerValue = integerBox.getValue();
```

### 多类型参数的泛型类

```java
// 定义多个类型参数的泛型类
public class Pair<K, V> {
    private K key;
    private V value;

    public Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    public K getKey() {
        return key;
    }

    public V getValue() {
        return value;
    }
}
```

###  泛型类的继承

```java
// 泛型类的继承
public class GenericChild<T> extends Box<T> {
    // 继承泛型父类的类型参数
}

// 或者指定具体类型
public class StringBox extends Box<String> {
    // 父类的类型参数被指定为String
}
```

## 泛型接口

泛型接口是指在定义接口时使用类型参数的接口。

###  泛型接口的定义

```java
// 定义泛型接口
public interface List<E> {
    void add(E element);
    E get(int index);
    int size();
}
```

### 泛型接口的实现

```java
// 实现泛型接口
public class ArrayList<E> implements List<E> {
    private Object[] elements;
    private int size;

    public ArrayList() {
        elements = new Object[10];
        size = 0;
    }

    @Override
    public void add(E element) {
        if (size == elements.length) {
            // 扩容
            Object[] newElements = new Object[elements.length * 2];
            System.arraycopy(elements, 0, newElements, 0, size);
            elements = newElements;
        }
        elements[size++] = element;
    }

    @Override
    public E get(int index) {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException("Index: " + index + ", Size: " + size);
        }
        return (E) elements[index];
    }

    @Override
    public int size() {
        return size;
    }
}
```

##  泛型方法

泛型方法是指在方法中使用类型参数的方法，它可以定义在泛型类中，也可以定义在非泛型类中。

###  泛型方法的定义

```java
// 定义泛型方法
public <T> T getFirstElement(T[] array) {
    if (array == null || array.length == 0) {
        return null;
    }
    return array[0];
}
```

###  泛型方法的使用

```java
// 使用泛型方法
String[] stringArray = {"Java", "Generics", "Method"};
String firstString = getFirstElement(stringArray);

Integer[] integerArray = {1, 2, 3, 4, 5};
Integer firstInteger = getFirstElement(integerArray);
```

###  静态泛型方法
静态方法不能使用类的类型参数，因此如果静态方法需要使用泛型，必须定义为泛型方法。

```java
// 静态泛型方法
public static <T> T getFirstElement(T[] array) {
    if (array == null || array.length == 0) {
        return null;
    }
    return array[0];
}
```

##  类型通配符

类型通配符（Wildcard）用于表示未知类型，使用`?`表示。

### 无界通配符
无界通配符表示可以接受任何类型。

```java
// 无界通配符
public void printList(List<?> list) {
    for (Object element : list) {
        System.out.println(element);
    }
}
```

### 上界通配符
上界通配符表示可以接受指定类型或其子类，使用`? extends T`表示。

```java
// 上界通配符
public double sum(List<? extends Number> list) {
    double sum = 0;
    for (Number number : list) {
        sum += number.doubleValue();
    }
    return sum;
}
```

### 下界通配符
下界通配符表示可以接受指定类型或其父类，使用`? super T`表示。

```java
// 下界通配符
public void addNumbers(List<? super Integer> list) {
    for (int i = 1; i <= 10; i++) {
        list.add(i);
    }
}
```

##  类型擦除

### 类型擦除的定义
Java泛型是通过类型擦除（Type Erasure）实现的，在编译时会将泛型类型参数替换为其原始类型（Raw Type）。

### 类型擦除的规则  
- 对于未指定上界的类型参数，擦除后替换为`Object`。
- 对于指定上界的类型参数，擦除后替换为其上界类型。

```java
// 泛型类
public class Box<T> {
    private T value;
    // ...
}

// 类型擦除后
public class Box {
    private Object value;
    // ...
}

// 有上界的泛型类
public class Box<T extends Number> {
    private T value;
    // ...
}

// 类型擦除后
public class Box {
    private Number value;
    // ...
}
```

###  类型擦除的影响
类型擦除导致在运行时无法获取泛型的具体类型信息，这会带来一些限制：
- 不能使用`instanceof`检查泛型类型。
- 不能创建泛型类型的数组。
- 不能在静态上下文中使用类的类型参数。

## 泛型的限制和注意事项

### 7.1 不能使用基本类型作为类型参数
泛型的类型参数必须是引用类型，不能是基本类型。如果需要使用基本类型，可以使用对应的包装类。

```java
// 错误
Box<int> intBox = new Box<>();

// 正确
Box<Integer> integerBox = new Box<>();
```

### 不能创建泛型类型的实例
不能使用`new T()`创建泛型类型的实例，因为在编译时`T`会被擦除为`Object`。

```java
// 错误
public class Box<T> {
    private T value = new T();  // 编译错误
    // ...
}
```

### 不能创建泛型类型的数组
不能直接创建泛型类型的数组，但可以创建通配符类型的数组，然后进行类型转换。

```java
// 错误
List<String>[] stringLists = new List<String>[10];

// 正确
List<?>[] listArray = new List<?>[10];
List<String> stringList = new ArrayList<>();
listArray[0] = stringList;
```

###  不能在静态上下文中使用类的类型参数
静态变量和静态方法不能使用类的类型参数，因为类型参数是在实例化时确定的，而静态成员属于类。

```java
// 错误
public class Box<T> {
    private static T value;  // 编译错误
    // ...
}
```

###  泛型异常
不能定义泛型异常类，也不能抛出或捕获泛型类型的异常。

```java
// 错误
public class GenericException<T> extends Exception {
    // 编译错误
}
```

##  泛型的高级用法

###  泛型桥接方法   
由于类型擦除，当子类重写父类的泛型方法时，Java编译器会生成桥接方法来确保类型安全。

```java
// 父类
public class Box<T> {
    public void setValue(T value) {
        this.value = value;
    }
    // ...
}

// 子类
public class StringBox extends Box<String> {
    @Override
    public void setValue(String value) {
        super.setValue(value);
    }
}

// 类型擦除后，编译器生成桥接方法
public class StringBox extends Box {
    @Override
    public void setValue(Object value) {
        setValue((String) value);  // 调用上面的setValue(String)
    }

    public void setValue(String value) {
        super.setValue(value);
    }
}
```

###  泛型与反射
可以通过反射获取泛型的类型信息，但由于类型擦除，只能获取到泛型的边界类型。

```java
// 获取泛型类型信息
ParameterizedType type = (ParameterizedType) StringBox.class.getGenericSuperclass();
Type[] actualTypeArguments = type.getActualTypeArguments();
Class<?> genericType = (Class<?>) actualTypeArguments[0];
System.out.println("Generic type: " + genericType.getName());  // 输出: java.lang.String
```

### 泛型与集合
Java集合框架广泛使用泛型，如`List<T>`、`Set<T>`、`Map<K, V>`等。

```java
// 使用泛型集合
List<String> stringList = new ArrayList<>();
stringList.add("Java");
stringList.add("Generics");
String element = stringList.get(0);  // 不需要类型转换

Map<Integer, String> map = new HashMap<>();
map.put(1, "One");
map.put(2, "Two");
String value = map.get(1);
```

## 泛型的最佳实践

### 尽可能使用具体的类型参数
避免使用无界通配符`?`，尽可能使用具体的类型参数，以提高类型安全性。

### 优先使用泛型方法而非泛型类
如果只需要在一个方法中使用泛型，而不是整个类，应该定义泛型方法，而不是泛型类。

### 正确使用上界和下界通配符
- 当需要读取集合中的元素时，使用上界通配符`? extends T`。
- 当需要向集合中写入元素时，使用下界通配符`? super T`。
- 当既需要读取又需要写入时，使用具体的类型参数。

### 避免过度泛型化
不要为了泛型而泛型，如果代码不需要处理多种类型，就不要使用泛型。

### 使用@SuppressWarnings("unchecked")消除未检查的类型转换警告
当无法避免未检查的类型转换时，可以使用`@SuppressWarnings("unchecked")`注解消除警告，但要确保代码是类型安全的。

```java
@SuppressWarnings("unchecked")
public <T> T getValue() {
    return (T) value;
}
```

### 遵循命名约定    
泛型类型参数通常使用单个大写字母表示：
- `T`：Type（类型）
- `E`：Element（元素）
- `K`：Key（键）
- `V`：Value（值）
- `N`：Number（数字）
- `S`, `U`, `V`等：第二、第三、第四个类型参数

## 泛型的实际应用场景

### 集合框架
Java集合框架是泛型最常见的应用场景，如`List<T>`、`Set<T>`、`Map<K, V>`等。

### 工具类
泛型可以用于创建通用的工具类，如排序、查找等。

```java
public class ArrayUtils {
    public static <T extends Comparable<T>> void sort(T[] array) {
        // 排序实现
    }

    public static <T> int indexOf(T[] array, T element) {
        // 查找实现
    }
}
```

###  数据结构
泛型可以用于实现通用的数据结构，如链表、栈、队列等。

```java
public class LinkedList<T> {
    private Node<T> head;
    private int size;

    private static class Node<T> {
        T data;
        Node<T> next;

        Node(T data) {
            this.data = data;
        }
    }

    // 链表操作方法
}
```

### 设计模式
泛型可以与设计模式结合使用，如工厂模式、装饰器模式等。

```java
public interface Factory<T> {
    T create();
}

public class ConcreteFactory<T> implements Factory<T> {
    private Class<T> type;

    public ConcreteFactory(Class<T> type) {
        this.type = type;
    }

    @Override
    public T create() {
        try {
            return type.newInstance();
        } catch (InstantiationException | IllegalAccessException e) {
            throw new RuntimeException(e);
        }
    }
}
```