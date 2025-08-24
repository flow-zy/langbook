# 面向对象编程特性

面向对象编程(Object-Oriented Programming, OOP)是一种编程范式，它使用"对象"来设计应用程序和计算机程序。Java是一种纯粹的面向对象编程语言，具有封装、继承、多态和抽象等核心特性。

## 面向对象编程概述

### 什么是面向对象编程
面向对象编程是一种以对象为中心的编程范式，它将数据和操作数据的方法封装在对象中，通过对象之间的交互来完成程序的功能。

### 面向对象编程的优势
- 模块化：每个对象都是一个独立的模块，便于开发和维护。
- 重用性：通过继承和组合可以重用已有的代码。
- 可扩展性：可以通过添加新的类和方法来扩展系统功能。
- 灵活性：通过多态可以实现动态绑定，提高代码的灵活性。
- 可维护性：面向对象的设计使代码更易于理解和维护。

### 面向对象编程的核心概念
- 对象：客观存在的实体，具有状态(属性)和行为(方法)。
- 类：对象的模板，定义了对象的属性和方法。
- 封装：将数据和方法封装在类中，隐藏内部实现细节。
- 继承：子类继承父类的属性和方法，实现代码重用。
- 多态：不同对象对同一消息做出不同的响应。
- 抽象：抽取共同特征，忽略非本质细节。

## 类与对象

### 类的定义
类是对象的模板，定义了对象的属性和方法。

```java
public class Person {
    // 属性(成员变量)
    private String name;
    private int age;
    private String gender;

    // 方法
    public void eat() {
        System.out.println(name + " is eating.");
    }

    public void sleep() {
        System.out.println(name + " is sleeping.");
    }

    // 构造方法
    public Person(String name, int age, String gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    // getter和setter方法
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
}
```

### 对象的创建与使用
对象是类的实例，通过`new`关键字创建。

```java
// 创建对象
Person person = new Person("John", 25, "Male");

// 访问对象的属性和方法
person.eat();  // 调用方法
String name = person.getName();  // 获取属性值
person.setName("Mike");  // 设置属性值
```

### 构造方法
构造方法是一种特殊的方法，用于初始化对象。构造方法的名称与类名相同，没有返回类型。

```java
// 无参构造方法
public Person() {
    this.name = "Unknown";
    this.age = 0;
    this.gender = "Unknown";
}

// 有参构造方法
public Person(String name, int age) {
    this.name = name;
    this.age = age;
    this.gender = "Unknown";
}
```

### this关键字
`this`关键字代表当前对象，用于：
- 访问当前对象的属性和方法。
- 区分成员变量和局部变量。
- 调用当前类的其他构造方法。

```java
public Person(String name, int age) {
    this.name = name;  // 区分成员变量和局部变量
    this.age = age;
    this.gender = "Unknown";
}

public Person(String name, int age, String gender) {
    this(name, age);  // 调用其他构造方法
    this.gender = gender;
}
```

## 封装

封装是将数据和方法封装在类中，隐藏内部实现细节，只提供公共的访问接口。

###  封装的实现
通过访问控制修饰符实现封装：
- `private`：只能在当前类中访问。
- `default`(无修饰符)：可以在当前包中访问。
- `protected`：可以在当前包和子类中访问。
- `public`：可以在任何地方访问。

```java
public class Person {
    private String name;  // 私有属性
    private int age;

    // 公共的getter和setter方法
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        if (age >= 0 && age <= 150) {
            this.age = age;
        } else {
            System.out.println("Invalid age.");
        }
    }
}
```

### 封装的优势
- 隐藏内部实现细节，提高安全性。
- 便于维护，修改内部实现不会影响外部使用。
- 可以对属性进行验证和控制，确保数据的有效性。

## 继承

继承是子类继承父类的属性和方法，实现代码重用。Java中使用`extends`关键字实现继承。

###  继承的实现

```java
// 父类
public class Animal {
    protected String name;
    protected int age;

    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void eat() {
        System.out.println(name + " is eating.");
    }

    public void sleep() {
        System.out.println(name + " is sleeping.");
    }
}

// 子类
public class Dog extends Animal {
    private String breed;

    public Dog(String name, int age, String breed) {
        super(name, age);  // 调用父类的构造方法
        this.breed = breed;
    }

    public void bark() {
        System.out.println(name + " is barking.");
    }

    // 重写父类的方法
    @Override
    public void eat() {
        System.out.println(name + " is eating dog food.");
    }
}
```

###  super关键字
`super`关键字代表父类对象，用于：
- 调用父类的构造方法。
- 访问父类的属性和方法。

```java
public Dog(String name, int age, String breed) {
    super(name, age);  // 调用父类的构造方法
    this.breed = breed;
}

public void printInfo() {
    System.out.println("Name: " + super.name);  // 访问父类的属性
    super.eat();  // 调用父类的方法
}
```

###  方法重写
方法重写(Override)是指子类重新实现父类的方法。

```java
@Override
public void eat() {
    System.out.println(name + " is eating dog food.");
}
```

###  继承的注意事项
- Java只支持单继承，一个类只能有一个直接父类。
- 子类不能继承父类的私有属性和方法，但可以通过getter和setter方法访问。
- 构造方法不能被继承，但子类可以通过`super`关键字调用父类的构造方法。

## 多态

多态是指不同对象对同一消息做出不同的响应。Java中的多态通过方法重写和方法重载实现。

###  多态的实现

```java
// 父类引用指向子类对象
Animal animal = new Dog("Buddy", 3, "Golden Retriever");
animal.eat();  // 调用的是Dog类的eat方法

// 方法重载也是多态的一种表现形式
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }

    public double add(double a, double b) {
        return a + b;
    }
}
```

###  动态绑定
动态绑定是指在运行时确定调用哪个方法。当通过父类引用调用被子类重写的方法时，Java会根据实际对象的类型来确定调用的方法。

```java
Animal animal1 = new Dog("Buddy", 3, "Golden Retriever");
Animal animal2 = new Cat("Whiskers", 2, "Siamese");

animal1.eat();  // 调用Dog类的eat方法
animal2.eat();  // 调用Cat类的eat方法
```

###  多态的优势
- 提高代码的灵活性和可扩展性。
- 简化代码，减少重复代码。
- 便于实现接口和抽象类。

## 抽象类与接口

###  抽象类 
抽象类是不能实例化的类，用于定义子类的共同特征。抽象类使用`abstract`关键字修饰。

```java
public abstract class Shape {
    protected String color;

    public Shape(String color) {
        this.color = color;
    }

    // 抽象方法，没有方法体
    public abstract double getArea();

    // 普通方法
    public void printColor() {
        System.out.println("Color: " + color);
    }
}

public class Circle extends Shape {
    private double radius;

    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }

    @Override
    public double getArea() {
        return Math.PI * radius * radius;
    }
}
```

###  接口
接口是一种特殊的抽象类，只包含抽象方法和常量。接口使用`interface`关键字定义。

```java
public interface Drawable {
    // 常量
    int MAX_WIDTH = 1000;
    int MAX_HEIGHT = 1000;

    // 抽象方法
    void draw();
    void erase();
}

public class Circle implements Drawable {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    @Override
    public void draw() {
        System.out.println("Drawing a circle with radius " + radius);
    }

    @Override
    public void erase() {
        System.out.println("Erasing a circle");
    }
}
```

###  抽象类与接口的区别
- 抽象类可以有普通方法和抽象方法，接口只能有抽象方法(Java 8及以上可以有默认方法和静态方法)。
- 抽象类可以有构造方法，接口没有构造方法。
- 抽象类可以有成员变量，接口只能有常量。
- 一个类只能继承一个抽象类，但可以实现多个接口。
- 抽象类用于定义类的共同特征，接口用于定义行为规范。

## 内部类

内部类是定义在另一个类中的类。内部类可以访问外部类的属性和方法，包括私有属性和方法。

###  成员内部类 
成员内部类是定义在外部类的成员位置的类。

```java
public class OuterClass {
    private int outerVar = 10;

    public class InnerClass {
        public void accessOuter() {
            System.out.println("OuterVar: " + outerVar);  // 访问外部类的私有属性
        }
    }

    public InnerClass createInner() {
        return new InnerClass();
    }
}

// 使用成员内部类
OuterClass outer = new OuterClass();
OuterClass.InnerClass inner = outer.new InnerClass();
inner.accessOuter();
```

###  静态内部类 
静态内部类是使用`static`关键字修饰的内部类，不能访问外部类的非静态属性和方法。

```java
public class OuterClass {
    private static int staticOuterVar = 20;
    private int outerVar = 10;

    public static class StaticInnerClass {
        public void accessOuter() {
            System.out.println("StaticOuterVar: " + staticOuterVar);  // 可以访问静态属性
            // System.out.println("OuterVar: " + outerVar);  // 不能访问非静态属性
        }
    }
}

// 使用静态内部类
OuterClass.StaticInnerClass inner = new OuterClass.StaticInnerClass();
inner.accessOuter();
```

###  局部内部类 
局部内部类是定义在方法中的类，只能在方法内部使用。

```java
public class OuterClass {
    public void methodWithInner() {
        final int localVar = 30;

        class LocalInnerClass {
            public void accessLocal() {
                System.out.println("LocalVar: " + localVar);
            }
        }

        LocalInnerClass inner = new LocalInnerClass();
        inner.accessLocal();
    }
}
```

###  匿名内部类 
匿名内部类是没有名称的内部类，通常用于创建接口或抽象类的实例。

```java
public interface Greeting {
    void sayHello();
}

public class Main {
    public static void main(String[] args) {
        // 创建匿名内部类
        Greeting greeting = new Greeting() {
            @Override
            public void sayHello() {
                System.out.println("Hello, World!");
            }
        };

        greeting.sayHello();
    }
}
```

## 枚举类型

枚举类型是一种特殊的类，用于定义固定数量的常量。枚举类型使用`enum`关键字定义。

###  枚举类型的定义 
```java
public enum Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY;
}
```

###  枚举类型的使用 
```java
Day today = Day.MONDAY;

switch (today) {
    case MONDAY:
        System.out.println("Today is Monday.");
        break;
    case FRIDAY:
        System.out.println("Today is Friday.");
        break;
    // ... other cases
}
```

###  枚举类型的高级用法 
枚举类型可以有构造方法、属性和方法。

```java
public enum Day {
    MONDAY("工作日"), TUESDAY("工作日"), WEDNESDAY("工作日"),
    THURSDAY("工作日"), FRIDAY("工作日"),
    SATURDAY("周末"), SUNDAY("周末");

    private String type;

    // 构造方法
    Day(String type) {
        this.type = type;
    }

    // 方法
    public String getType() {
        return type;
    }
}

// 使用
Day today = Day.MONDAY;
System.out.println(today.getType());  // 输出：工作日
```