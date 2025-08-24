# 控制流语句

控制流语句是用来控制程序执行流程的语句，包括条件语句、循环语句和跳转语句等。合理使用控制流语句可以使程序更加灵活和高效。

## 条件语句

条件语句用于根据条件的真假来决定执行哪段代码。Java中的条件语句包括`if`语句、`if-else`语句、`if-else if-else`语句和`switch`语句。

### if语句
`if`语句用于当条件为真时执行一段代码。

```java
// if语句
int age = 18;
if (age >= 18) {
    System.out.println("You are an adult.");
}
```

### if-else语句
`if-else`语句用于当条件为真时执行一段代码，当条件为假时执行另一段代码。

```java
// if-else语句
int age = 16;
if (age >= 18) {
    System.out.println("You are an adult.");
} else {
    System.out.println("You are a minor.");
}
```

### if-else if-else语句
`if-else if-else`语句用于多个条件的判断，当第一个条件为假时，继续判断下一个条件。

```java
// if-else if-else语句
int score = 85;
if (score >= 90) {
    System.out.println("Excellent!");
} else if (score >= 80) {
    System.out.println("Good!");
} else if (score >= 60) {
    System.out.println("Pass!");
} else {
    System.out.println("Fail!");
}
```

### switch语句
`switch`语句用于根据表达式的值来选择执行哪段代码，通常用于多个固定值的判断。

```java
// switch语句
int dayOfWeek = 3;
switch (dayOfWeek) {
    case 1:
        System.out.println("Monday");
        break;
    case 2:
        System.out.println("Tuesday");
        break;
    case 3:
        System.out.println("Wednesday");
        break;
    case 4:
        System.out.println("Thursday");
        break;
    case 5:
        System.out.println("Friday");
        break;
    case 6:
        System.out.println("Saturday");
        break;
    case 7:
        System.out.println("Sunday");
        break;
    default:
        System.out.println("Invalid day");
        break;
}
```

### switch语句的增强版（Java 12+）
Java 12引入了`switch`表达式，可以使用`->`和`yield`来简化代码。

```java
// 增强版switch语句
int dayOfWeek = 3;
String dayName = switch (dayOfWeek) {
    case 1 -> "Monday";
    case 2 -> "Tuesday";
    case 3 -> "Wednesday";
    case 4 -> "Thursday";
    case 5 -> "Friday";
    case 6 -> "Saturday";
    case 7 -> "Sunday";
    default -> "Invalid day";
};
System.out.println(dayName);
```

## 循环语句

循环语句用于重复执行一段代码，直到满足结束条件。Java中的循环语句包括`for`循环、`while`循环和`do-while`循环。

### for循环
`for`循环用于已知循环次数的情况，由初始化、循环条件和迭代语句组成。

```java
// for循环
for (int i = 0; i < 10; i++) {
    System.out.println("i = " + i);
}
```

### 增强版for循环（for-each循环）
增强版`for`循环用于遍历数组或集合中的元素。

```java
// 增强版for循环
int[] numbers = {1, 2, 3, 4, 5};
for (int number : numbers) {
    System.out.println("number = " + number);
}
```

### while循环
`while`循环用于不知道循环次数，但知道循环条件的情况，先判断条件再执行循环体。

```java
// while循环
int i = 0;
while (i < 10) {
    System.out.println("i = " + i);
    i++;
}
```

### do-while循环
`do-while`循环与`while`循环类似，但先执行循环体再判断条件，确保循环体至少执行一次。

```java
// do-while循环
int i = 0;
do {
    System.out.println("i = " + i);
    i++;
} while (i < 10);
```

### 循环嵌套
循环可以嵌套使用，即一个循环内部包含另一个循环。

```java
// 循环嵌套
for (int i = 0; i < 5; i++) {
    for (int j = 0; j < 5; j++) {
        System.out.print("* ");
    }
    System.out.println();
}
```

## 跳转语句

跳转语句用于改变程序的执行流程，包括`break`语句、`continue`语句和`return`语句。

### break语句
`break`语句用于终止当前循环或`switch`语句的执行。

```java
// break语句
for (int i = 0; i < 10; i++) {
    if (i == 5) {
        break;  // 终止循环
    }
    System.out.println("i = " + i);
}
```

### continue语句
`continue`语句用于跳过当前循环的剩余部分，直接进入下一次循环。

```java
// continue语句
for (int i = 0; i < 10; i++) {
    if (i % 2 == 0) {
        continue;  // 跳过偶数
    }
    System.out.println("i = " + i);
}
```

### return语句
`return`语句用于从方法中返回，并可以带一个返回值。

```java
// return语句
public int add(int a, int b) {
    return a + b;  // 返回a和b的和
}
```

## 控制流语句的应用场景

### 条件语句的应用场景
- 根据用户输入或系统状态执行不同的操作。
- 对数据进行验证和过滤。
- 实现分支逻辑，如菜单选择。

### 循环语句的应用场景
- 重复执行相同或相似的操作，如计算累加和。
- 遍历数组或集合中的元素。
- 实现迭代算法，如排序和搜索。

### 跳转语句的应用场景
- 提前终止循环或`switch`语句。
- 跳过循环中的特定迭代。
- 从方法中返回结果。

## 控制流语句的注意事项

- 避免深度嵌套的控制流语句，这会降低代码的可读性和可维护性。
- 合理使用`break`和`continue`语句，但不要过度使用，以免破坏代码的结构。
- 对于复杂的条件判断，可以考虑将条件提取为方法，提高代码的可读性。
- 注意循环的边界条件，避免出现无限循环。
- 在`switch`语句中，不要忘记在每个`case`分支的末尾添加`break`语句（除非有意为之）。