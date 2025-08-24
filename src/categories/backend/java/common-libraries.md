# 常用类库

Java类库是Java语言的重要组成部分，提供了丰富的功能和工具，简化了Java程序的开发。Java类库按照功能不同被组织成不同的包。

## 类库概述

### 什么是类库
Java类库是一组预定义的类和接口，提供了各种常用功能，如字符串处理、日期时间处理、集合操作、输入输出等。

### 类库的组织方式
Java类库按照功能被组织成不同的包，使用包名来区分不同功能的类库。例如：
- `java.lang`：包含Java语言的核心类，如`Object`、`String`、`Math`等。
- `java.util`：包含常用工具类，如集合框架、日期时间类等。
- `java.io`：包含输入输出相关的类。
- `java.net`：包含网络编程相关的类。
- `java.sql`：包含数据库操作相关的类。

### 如何使用类库
使用Java类库中的类，需要先导入相应的包。可以使用`import`语句导入单个类或整个包。

```java
// 导入单个类
import java.util.ArrayList;

// 导入整个包
import java.util.*;
```

## java.lang包

`java.lang`包是Java语言的核心包，包含了Java语言的基本类，如`Object`、`String`、`Math`等。这个包会被自动导入，不需要显式使用`import`语句。

### Object类
`Object`类是Java中所有类的父类，任何类都直接或间接继承自`Object`类。`Object`类提供了以下常用方法：

```java
// toString()方法：返回对象的字符串表示
public String toString() {
    return getClass().getName() + "@" + Integer.toHexString(hashCode());
}

// equals()方法：比较两个对象是否相等
public boolean equals(Object obj) {
    return (this == obj);
}

// hashCode()方法：返回对象的哈希码
public int hashCode() {
    return System.identityHashCode(this);
}

// getClass()方法：返回对象的运行时类
public final Class<?> getClass() {
    return reflectionData().clazz;
}

// notify()、notifyAll()、wait()方法：用于线程同步
public final void notify() { ... }
public final void notifyAll() { ... }
public final void wait() throws InterruptedException { ... }
```

### String类
`String`类用于表示字符串，是不可变的。`String`类提供了丰富的字符串处理方法：

```java
// 创建字符串
String str1 = "Hello";
String str2 = new String("World");

// 字符串连接
String str3 = str1 + " " + str2;  // 结果："Hello World"

// 字符串长度
int length = str3.length();  // 结果：11

// 字符检索
char ch = str3.charAt(0);  // 结果：'H'
int index = str3.indexOf("World");  // 结果：6

// 字符串截取
String substring = str3.substring(6);  // 结果："World"

// 字符串转换
String lowerCase = str3.toLowerCase();  // 结果："hello world"
String upperCase = str3.toUpperCase();  // 结果："HELLO WORLD"

// 字符串替换
String replaced = str3.replace("World", "Java");  // 结果："Hello Java"

// 字符串分割
String[] parts = str3.split(" ");  // 结果：["Hello", "World"]

// 去除空格
String trimmed = "  Hello World  ".trim();  // 结果："Hello World"

// 字符串比较
boolean equals = str1.equals("Hello");  // 结果：true
boolean startsWith = str3.startsWith("Hello");  // 结果：true
boolean endsWith = str3.endsWith("World");  // 结果：true
```

###  包装类
包装类用于将基本数据类型转换为对象。Java为每个基本数据类型提供了对应的包装类：

| 基本数据类型 | 包装类       |
|--------------|--------------|
| byte         | Byte         |
| short        | Short        |
| int          | Integer      |
| long         | Long         |
| float        | Float        |
| double       | Double       |
| char         | Character    |
| boolean      | Boolean      |

包装类的常用方法：

```java
// 基本数据类型转换为包装类
Integer num1 = new Integer(10);
Integer num2 = Integer.valueOf(20);

// 字符串转换为包装类
Integer num3 = Integer.parseInt("30");
Double num4 = Double.parseDouble("3.14");

// 包装类转换为基本数据类型
int intValue = num1.intValue();
double doubleValue = num4.doubleValue();

// 自动装箱和拆箱(Java 5及以上)
Integer num5 = 50;  // 自动装箱
int intValue2 = num5;  // 自动拆箱
```

### Math类
`Math`类提供了数学运算相关的方法：

```java
// 常量
double pi = Math.PI;  // 圆周率

// 基本运算
int max = Math.max(10, 20);  // 结果：20
int min = Math.min(10, 20);  // 结果：10
int abs = Math.abs(-10);  // 结果：10

double sqrt = Math.sqrt(16);  // 结果：4.0
double pow = Math.pow(2, 3);  // 结果：8.0
double random = Math.random();  // 生成[0.0, 1.0)之间的随机数

// 三角函数
double sin = Math.sin(Math.PI / 2);  // 结果：1.0
double cos = Math.cos(0);  // 结果：1.0
double tan = Math.tan(Math.PI / 4);  // 结果：1.0
```

##  集合框架 
`java.util`包包含了常用工具类，如集合框架、日期时间类、工具类等。

###  集合框架概述 
集合框架用于存储和操作一组对象。Java集合框架主要包括以下接口和类：

- `Collection`：集合的根接口，定义了集合的基本操作。
- `List`：有序集合，可以包含重复元素。
- `Set`：无序集合，不包含重复元素。
- `Map`：键值对集合，键不重复。
- `ArrayList`、`LinkedList`：`List`接口的实现类。
- `HashSet`、`TreeSet`：`Set`接口的实现类。
- `HashMap`、`TreeMap`：`Map`接口的实现类。

集合框架的详细内容将在后续的集合框架文档中介绍。

###  日期和时间类 
Java提供了丰富的日期和时间处理类：

```java
// Date类(已过时，但仍被广泛使用)
Date date = new Date();
System.out.println(date);  // 输出当前日期和时间

// Calendar类
Calendar calendar = Calendar.getInstance();
int year = calendar.get(Calendar.YEAR);
int month = calendar.get(Calendar.MONTH) + 1;  // 月份从0开始
int day = calendar.get(Calendar.DAY_OF_MONTH);

// Java 8及以上的日期时间类
import java.time.*;
import java.time.format.*;

// 获取当前日期和时间
LocalDate localDate = LocalDate.now();
LocalTime localTime = LocalTime.now();
LocalDateTime localDateTime = LocalDateTime.now();

// 格式化日期时间
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
String formattedDateTime = localDateTime.format(formatter);

// 解析日期时间
LocalDateTime parsedDateTime = LocalDateTime.parse("2023-10-20 15:30:45", formatter);

// 日期时间计算
LocalDate tomorrow = localDate.plusDays(1);
LocalDate yesterday = localDate.minusDays(1);
```

###  工具类 
`java.util`包提供了一些实用工具类：

```java
// Arrays类：数组操作工具类
int[] array = {3, 1, 4, 1, 5, 9};
Arrays.sort(array);  // 排序数组
Arrays.fill(array, 0);  // 填充数组
int index = Arrays.binarySearch(array, 4);  // 二分查找

// Collections类：集合操作工具类
List<String> list = new ArrayList<>();
list.add("apple");
list.add("banana");
list.add("orange");

Collections.sort(list);  // 排序集合
Collections.reverse(list);  // 反转集合
Collections.shuffle(list);  // 随机打乱集合
String max = Collections.max(list);  // 获取最大值
String min = Collections.min(list);  // 获取最小值
```

##  输入输出流 
`java.io`包包含了输入输出相关的类，用于处理文件和流。`java.io`包的详细内容将在后续的I/O操作文档中介绍。

###  流的概念 
流是数据的传输通道，用于读取和写入数据。Java中的流分为字节流和字符流：
- 字节流：以字节为单位读取和写入数据，适用于所有类型的文件。
- 字符流：以字符为单位读取和写入数据，适用于文本文件。

###  常用的流类 
- 字节流：`InputStream`、`OutputStream`、`FileInputStream`、`FileOutputStream`等。
- 字符流：`Reader`、`Writer`、`FileReader`、`FileWriter`等。
- 缓冲流：`BufferedInputStream`、`BufferedOutputStream`、`BufferedReader`、`BufferedWriter`等。
- 对象流：`ObjectInputStream`、`ObjectOutputStream`等。

##  网络编程 
`java.net`包包含了网络编程相关的类，用于实现网络通信。`java.net`包的详细内容将在后续的网络编程文档中介绍。

###  网络编程基础 
- `Socket`：用于建立客户端与服务器之间的连接。
- `ServerSocket`：用于监听客户端的连接请求。
- `URL`：统一资源定位符，用于表示互联网上的资源。
- `HttpURLConnection`：用于发送HTTP请求和接收HTTP响应。

##  数据库编程 
`java.sql`包包含了数据库操作相关的类，用于实现与数据库的交互。

###  数据库连接 
```java
import java.sql.*;

public class DatabaseConnection {
    public static void main(String[] args) {
        try {
            // 加载数据库驱动
            Class.forName("com.mysql.cj.jdbc.Driver");

            // 建立数据库连接
            String url = "jdbc:mysql://localhost:3306/testdb";
            String username = "root";
            String password = "password";
            Connection connection = DriverManager.getConnection(url, username, password);

            System.out.println("Database connected successfully");

            // 关闭数据库连接
            connection.close();
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
    }
}
```

###  执行SQL语句 
```java
// 创建Statement对象
Statement statement = connection.createStatement();

// 执行查询语句
String query = "SELECT * FROM users";
ResultSet resultSet = statement.executeQuery(query);

// 处理查询结果
while (resultSet.next()) {
    int id = resultSet.getInt("id");
    String name = resultSet.getString("name");
    int age = resultSet.getInt("age");
    System.out.println("ID: " + id + ", Name: " + name + ", Age: " + age);
}

// 执行更新语句
String update = "INSERT INTO users (name, age) VALUES ('John', 25)";
int rowsAffected = statement.executeUpdate(update);

// 关闭资源
resultSet.close();
statement.close();
```

###  预处理语句 
```java
// 创建PreparedStatement对象
String sql = "INSERT INTO users (name, age) VALUES (?, ?)";
PreparedStatement preparedStatement = connection.prepareStatement(sql);

// 设置参数
preparedStatement.setString(1, "Jane");
preparedStatement.setInt(2, 30);

// 执行语句
int rowsAffected = preparedStatement.executeUpdate();

// 关闭资源
preparedStatement.close();
```

##  常用第三方类库 

除了Java标准类库外，还有许多常用的第三方类库：

###  常用第三方类库 
Apache Commons是一个开源的Java类库集合，包含了许多实用的工具类，如：
- `Commons Lang`：提供了字符串处理、日期时间处理等功能。
- `Commons IO`：提供了文件操作、流操作等功能。
- `Commons Collections`：提供了额外的集合类和工具方法。

###  Google Guava 
Google Guava是Google开发的Java类库，提供了许多实用的功能，如：
- 新的集合类型
- 字符串处理
- 缓存
- 并发工具

###  Jackson/Gson
Jackson和Gson是Java中常用的JSON处理库，用于将Java对象转换为JSON字符串，以及将JSON字符串转换为Java对象。

###  Log4j/Logback 
Log4j和Logback是Java中常用的日志框架，用于记录应用程序的日志信息。

###  JUnit
JUnit是Java中常用的单元测试框架，用于编写和运行单元测试。
