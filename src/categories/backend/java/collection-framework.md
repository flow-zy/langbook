# 集合框架

Java集合框架是Java提供的一组用于存储和操作数据的接口和类，位于`java.util`包中。集合框架提供了多种数据结构，如列表、集合、映射等，满足不同的应用需求。

## 集合框架概述

### 什么是集合框架
集合框架是一组用于存储和操作对象的接口和类，提供了统一的操作方式，如添加、删除、查找、遍历等。

### 集合框架的优势
- 提供了丰富的数据结构，满足不同的应用需求。
- 提供了统一的操作接口，简化了编程。
- 实现了数据结构的最佳实践，提高了程序的性能和可靠性。
- 支持泛型，提供了类型安全。

### 集合框架的体系结构
集合框架主要包括以下接口：
- `Collection`：集合的根接口，定义了集合的基本操作。
- `List`：有序集合，可以包含重复元素。
- `Set`：无序集合，不包含重复元素。
- `Map`：键值对集合，键不重复。
- `Queue`：队列，先进先出(FIFO)的数据结构。
- `Deque`：双端队列，支持在两端添加和删除元素。

## Collection接口

`Collection`接口是所有集合的根接口，定义了集合的基本操作：

```java
public interface Collection<E> extends Iterable<E> {
    // 添加元素
    boolean add(E e);
    boolean addAll(Collection<? extends E> c);

    // 删除元素
    boolean remove(Object o);
    boolean removeAll(Collection<?> c);
    boolean retainAll(Collection<?> c);
    void clear();

    // 查询元素
    int size();
    boolean isEmpty();
    boolean contains(Object o);
    boolean containsAll(Collection<?> c);

    // 转换为数组
    Object[] toArray();
    <T> T[] toArray(T[] a);

    // 迭代器
    Iterator<E> iterator();

    // ... 其他方法
}
```

## List接口

`List`接口是有序集合，可以包含重复元素。`List`接口的主要实现类有`ArrayList`、`LinkedList`、`Vector`等。

### ArrayList
`ArrayList`是基于动态数组实现的`List`接口，支持随机访问，添加和删除元素的效率较低(除了尾部)。

```java
// 创建ArrayList
List<String> list = new ArrayList<>();

// 添加元素
list.add("apple");
list.add("banana");
list.add("orange");

// 访问元素
String element = list.get(0);  // 获取第一个元素

// 修改元素
list.set(0, "pear");  // 修改第一个元素

// 删除元素
list.remove(0);  // 删除第一个元素
list.remove("banana");  // 删除指定元素

// 遍历元素
for (int i = 0; i < list.size(); i++) {
    System.out.println(list.get(i));
}

for (String s : list) {
    System.out.println(s);
}

Iterator<String> iterator = list.iterator();
while (iterator.hasNext()) {
    System.out.println(iterator.next());
}
```

### LinkedList
`LinkedList`是基于双向链表实现的`List`接口，添加和删除元素的效率较高(尤其是在头部和中部)，但随机访问的效率较低。

```java
// 创建LinkedList
List<String> list = new LinkedList<>();

// 添加元素
list.add("apple");
list.addFirst("banana");  // 添加到头部
list.addLast("orange");  // 添加到尾部

// 访问元素
String first = list.getFirst();  // 获取第一个元素
String last = list.getLast();  // 获取最后一个元素

// 删除元素
list.removeFirst();  // 删除第一个元素
list.removeLast();  // 删除最后一个元素
```

###  Vector
`Vector`是线程安全的`List`接口实现类，与`ArrayList`类似，但性能较低，因为它的方法是同步的。

##  Set接口

`Set`接口是无序集合，不包含重复元素。`Set`接口的主要实现类有`HashSet`、`LinkedHashSet`、`TreeSet`等。

###  HashSet
`HashSet`是基于哈希表实现的`Set`接口，不保证元素的顺序，添加、删除和查找元素的效率都很高。

```java
// 创建HashSet
Set<String> set = new HashSet<>();

// 添加元素
set.add("apple");
set.add("banana");
set.add("orange");
set.add("apple");  // 重复元素，不会被添加

// 删除元素
set.remove("banana");

// 查询元素
boolean contains = set.contains("apple");

// 遍历元素
for (String s : set) {
    System.out.println(s);
}
```

###  LinkedHashSet
`LinkedHashSet`是基于哈希表和链表实现的`Set`接口，保证元素的插入顺序。

```java
Set<String> set = new LinkedHashSet<>();
set.add("apple");
set.add("banana");
set.add("orange");
// 遍历顺序为插入顺序：apple, banana, orange
```

###  TreeSet
`TreeSet`是基于红黑树实现的`Set`接口，保证元素的排序顺序(自然排序或自定义排序)。

```java
// 自然排序
Set<Integer> set = new TreeSet<>();
set.add(3);
set.add(1);
set.add(2);
// 遍历顺序为升序：1, 2, 3

// 自定义排序
Set<String> set2 = new TreeSet<>((s1, s2) -> s2.compareTo(s1));  // 降序排列
set2.add("apple");
set2.add("banana");
set2.add("orange");
// 遍历顺序为降序：orange, banana, apple
```

##  Map接口

`Map`接口是键值对集合，键不重复。`Map`接口的主要实现类有`HashMap`、`LinkedHashMap`、`TreeMap`、`Hashtable`等。

###  HashMap
`HashMap`是基于哈希表实现的`Map`接口，不保证键值对的顺序，添加、删除和查找元素的效率都很高。

```java
// 创建HashMap
Map<String, Integer> map = new HashMap<>();

// 添加元素
map.put("apple", 10);
map.put("banana", 20);
map.put("orange", 30);

// 访问元素
int value = map.get("apple");  // 获取值
int defaultValue = map.getOrDefault("pear", 0);  // 获取值，如果键不存在则返回默认值

// 修改元素
map.put("apple", 15);  // 更新值

// 删除元素
map.remove("banana");

// 查询元素
boolean containsKey = map.containsKey("apple");
boolean containsValue = map.containsValue(15);

// 遍历元素
// 遍历键
for (String key : map.keySet()) {
    System.out.println("Key: " + key + ", Value: " + map.get(key));
}

// 遍历值
for (int v : map.values()) {
    System.out.println("Value: " + v);
}

// 遍历键值对
for (Map.Entry<String, Integer> entry : map.entrySet()) {
    System.out.println("Key: " + entry.getKey() + ", Value: " + entry.getValue());
}
```

###  LinkedHashMap
`LinkedHashMap`是基于哈希表和链表实现的`Map`接口，保证键值对的插入顺序。

```java
Map<String, Integer> map = new LinkedHashMap<>();
map.put("apple", 10);
map.put("banana", 20);
map.put("orange", 30);
// 遍历顺序为插入顺序：apple, banana, orange
```

###  TreeMap
`TreeMap`是基于红黑树实现的`Map`接口，保证键值对的排序顺序(自然排序或自定义排序)。

```java
// 自然排序
Map<Integer, String> map = new TreeMap<>();
map.put(3, "apple");
map.put(1, "banana");
map.put(2, "orange");
// 遍历顺序为键的升序：1=banana, 2=orange, 3=apple

// 自定义排序
Map<String, Integer> map2 = new TreeMap<>((s1, s2) -> s2.compareTo(s1));  // 键降序排列
map2.put("apple", 10);
map2.put("banana", 20);
map2.put("orange", 30);
// 遍历顺序为键的降序：orange=30, banana=20, apple=10
```

###  Hashtable
`Hashtable`是线程安全的`Map`接口实现类，与`HashMap`类似，但性能较低，因为它的方法是同步的。

##  Queue接口

`Queue`接口是队列，先进先出(FIFO)的数据结构。`Queue`接口的主要实现类有`LinkedList`、`PriorityQueue`等。

###  LinkedList
`LinkedList`实现了`Queue`接口，可以作为队列使用。

```java
Queue<String> queue = new LinkedList<>();

// 添加元素
queue.offer("apple");  // 添加元素，如果队列满则返回false
queue.add("banana");  // 添加元素，如果队列满则抛出异常

// 获取并删除元素
String element1 = queue.poll();  // 获取并删除队首元素，如果队列为空则返回null
String element2 = queue.remove();  // 获取并删除队首元素，如果队列为空则抛出异常

// 获取但不删除元素
String element3 = queue.peek();  // 获取队首元素，如果队列为空则返回null
String element4 = queue.element();  // 获取队首元素，如果队列为空则抛出异常
```

###  PriorityQueue
`PriorityQueue`是优先级队列，元素按照优先级排序(自然排序或自定义排序)。

```java
// 自然排序
Queue<Integer> queue = new PriorityQueue<>();
queue.offer(3);
queue.offer(1);
queue.offer(2);
// 队首元素是1，因为是自然排序(升序)

// 自定义排序
Queue<String> queue2 = new PriorityQueue<>((s1, s2) -> s2.compareTo(s1));  // 降序排列
queue2.offer("apple");
queue2.offer("banana");
queue2.offer("orange");
// 队首元素是orange，因为是降序排列
```

##  Deque接口

`Deque`接口是双端队列，支持在两端添加和删除元素。`Deque`接口的主要实现类有`LinkedList`、`ArrayDeque`等。

```java
Deque<String> deque = new LinkedList<>();

// 添加元素
deque.addFirst("apple");  // 添加到头部
deque.addLast("banana");  // 添加到尾部

deque.offerFirst("orange");  // 添加到头部，如果队列满则返回false

deque.offerLast("pear");  // 添加到尾部，如果队列满则返回false

// 获取并删除元素
String first1 = deque.removeFirst();  // 获取并删除头部元素，如果队列为空则抛出异常
String last1 = deque.removeLast();  // 获取并删除尾部元素，如果队列为空则抛出异常

String first2 = deque.pollFirst();  // 获取并删除头部元素，如果队列为空则返回null
String last2 = deque.pollLast();  // 获取并删除尾部元素，如果队列为空则返回null

// 获取但不删除元素
String first3 = deque.getFirst();  // 获取头部元素，如果队列为空则抛出异常
String last3 = deque.getLast();  // 获取尾部元素，如果队列为空则抛出异常

String first4 = deque.peekFirst();  // 获取头部元素，如果队列为空则返回null
String last4 = deque.peekLast();  // 获取尾部元素，如果队列为空则返回null
```

##  集合工具类

`Collections`类是集合操作的工具类，提供了许多静态方法，用于操作集合。

```java
// 排序
List<Integer> list = new ArrayList<>();
list.add(3);
list.add(1);
list.add(2);
Collections.sort(list);  // 升序排序
Collections.sort(list, Collections.reverseOrder());  // 降序排序

// 查找
int index = Collections.binarySearch(list, 2);  // 二分查找

// 反转
Collections.reverse(list);

// 随机打乱
Collections.shuffle(list);

// 填充
Collections.fill(list, 0);

// 复制
List<Integer> dest = new ArrayList<>(Collections.nCopies(list.size(), 0));
Collections.copy(dest, list);

// 最大值和最小值
Integer max = Collections.max(list);
Integer min = Collections.min(list);

// 线程安全集合
List<Integer> synchronizedList = Collections.synchronizedList(new ArrayList<>());
Set<Integer> synchronizedSet = Collections.synchronizedSet(new HashSet<>());
Map<Integer, String> synchronizedMap = Collections.synchronizedMap(new HashMap<>());
```

## 泛型与集合

泛型可以使集合更加类型安全，避免类型转换错误。

```java
// 使用泛型
List<String> list = new ArrayList<>();
list.add("apple");
// list.add(10);  // 编译错误，因为List<String>只能存储String类型

String element = list.get(0);  // 不需要类型转换

// 泛型通配符
public void printList(List<?> list) {
    for (Object obj : list) {
        System.out.println(obj);
    }
}

// 上限通配符
public void addNumbers(List<? extends Number> list) {
    // 可以读取Number类型，但不能添加(除了null)
}

// 下限通配符
public void addIntegers(List<? super Integer> list) {
    // 可以添加Integer及其子类，但读取时只能作为Object
}
```

## 集合框架的最佳实践

### 选择合适的集合类型
根据应用需求选择合适的集合类型：
- 需要有序集合且允许重复元素：`List`
- 需要无序集合且不允许重复元素：`Set`
- 需要键值对集合：`Map`
- 需要队列：`Queue`
- 需要双端队列：`Deque`

### 优先使用泛型
使用泛型可以提供类型安全，避免类型转换错误。

### 注意线程安全
如果在多线程环境下使用集合，需要考虑线程安全问题，选择线程安全的集合或进行同步处理。

### 避免不必要的自动装箱和拆箱
自动装箱和拆箱会影响性能，尤其是在大规模集合操作中。

### 合理初始化集合大小
如果知道集合的大致大小，合理初始化集合大小可以减少集合扩容的开销。

### 优先使用接口而非实现类
使用接口可以提高代码的灵活性和可维护性。

```java
// 好的做法
List<String> list = new ArrayList<>();

// 不好的做法
ArrayList<String> list = new ArrayList<>();
```