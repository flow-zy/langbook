# 注解

注解（Annotation）是Java SE 5引入的一种元数据（metadata）机制，它允许在代码中添加额外的信息，这些信息可以被编译器、工具或运行时环境使用。

## 注解概述

### 什么是注解
注解是一种特殊的接口，它提供了一种在代码中添加元数据的方式，而不会影响代码的实际执行逻辑。

### 注解的作用
- **编译时检查**：编译器可以使用注解进行语法检查，如`@Override`。
- **生成文档**：可以通过注解生成API文档，如`@param`、`@return`。
- **代码分析**：工具可以通过注解分析代码，如`@Deprecated`。
- **运行时处理**：运行时环境可以通过反射获取注解信息并进行处理，如`@RequestMapping`。

### 注解的基本语法
注解使用`@`符号开头，后面跟着注解名称和可选的参数列表。

```java
// 基本注解用法
@Override
public String toString() {
    return "Hello, Annotations!";
}

// 带参数的注解
@SuppressWarnings(value = "unchecked")
public void processList(List<?> list) {
    // ...
}

// 简化参数写法（只有一个参数且参数名为value）
@SuppressWarnings("unchecked")
public void processList(List<?> list) {
    // ...
}
```

## 内置注解

Java提供了一些内置的注解，用于常见的编程场景。

### 用于代码检查的注解
- `@Override`：标记方法覆盖了父类的方法。
- `@Deprecated`：标记方法或类已过时。
- `@SuppressWarnings`：抑制编译器警告。
- `@SafeVarargs`：标记方法是安全的可变参数方法。
- `@FunctionalInterface`：标记接口是函数式接口。

### 用于文档生成的注解
- `@param`：描述方法的参数。
- `@return`：描述方法的返回值。
- `@throws`/`@exception`：描述方法可能抛出的异常。
- `@see`：引用其他类或方法。
- `@since`：标记从哪个版本开始引入。
- `@version`：标记版本信息。
- `@author`：标记作者信息。

### 元注解
元注解是用于定义其他注解的注解。
- `@Retention`：指定注解的保留策略。
- `@Target`：指定注解可以应用的元素类型。
- `@Documented`：标记注解会被包含在Javadoc中。
- `@Inherited`：标记注解可以被继承。
- `@Repeatable`：标记注解可以重复应用。

## 自定义注解

### 定义注解
自定义注解使用`@interface`关键字定义。

```java
// 定义一个简单的注解
public @interface MyAnnotation {
    // 注解元素
    String value();
    int count() default 1;
}
```

### 元注解的使用
定义注解时通常需要使用元注解来指定注解的行为。

```java
// 使用元注解定义注解
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface MyAnnotation {
    String value();
    int count() default 1;
}
```

### 注解的参数
注解的参数可以有默认值，没有默认值的参数在使用时必须指定。

```java
// 有默认值的参数
public @interface MyAnnotation {
    String value();
    int count() default 1;
    String[] tags() default {};
}
```

###  使用自定义注解

```java
// 使用自定义注解
@MyAnnotation(value = "test", count = 5, tags = {"important", "example"})
public void testMethod() {
    // ...
}

// 简化写法（只有value参数）
@MyAnnotation("test")
public void testMethod() {
    // ...
}
```

## 注解的保留策略

`@Retention`元注解用于指定注解的保留策略，有以下三种：

###  SOURCE
注解只在源代码中保留，编译时会被丢弃。

```java
@Retention(RetentionPolicy.SOURCE)
public @interface SourceAnnotation {
    // ...
}
```

### CLASS
注解在编译时会被保留在class文件中，但运行时不会被加载到JVM中（默认策略）。

```java
@Retention(RetentionPolicy.CLASS)
public @interface ClassAnnotation {
    // ...
}
```

### RUNTIME
注解在编译时会被保留在class文件中，运行时会被加载到JVM中，可以通过反射获取。

```java
@Retention(RetentionPolicy.RUNTIME)
public @interface RuntimeAnnotation {
    // ...
}
```

## 注解的应用目标

`@Target`元注解用于指定注解可以应用的元素类型，常见的目标类型有：

- `ElementType.TYPE`：类、接口、枚举。
- `ElementType.FIELD`：字段、枚举常量。
- `ElementType.METHOD`：方法。
- `ElementType.PARAMETER`：方法参数。
- `ElementType.CONSTRUCTOR`：构造方法。
- `ElementType.LOCAL_VARIABLE`：局部变量。
- `ElementType.ANNOTATION_TYPE`：注解类型。
- `ElementType.PACKAGE`：包。
- `ElementType.TYPE_PARAMETER`：类型参数（Java 8+）。
- `ElementType.TYPE_USE`：类型使用（Java 8+）。

```java
@Target({ElementType.TYPE, ElementType.METHOD})
public @interface TypeAndMethodAnnotation {
    // ...
}
```

## 反射与注解

通过反射机制可以在运行时获取注解信息。

###  获取类上的注解

```java
// 获取类上的注解
Class<?> clazz = MyClass.class;
MyAnnotation annotation = clazz.getAnnotation(MyAnnotation.class);
if (annotation != null) {
    String value = annotation.value();
    int count = annotation.count();
    System.out.println("Value: " + value + ", Count: " + count);
}
```

### 获取方法上的注解

```java
// 获取方法上的注解
Method method = clazz.getMethod("testMethod");
MyAnnotation annotation = method.getAnnotation(MyAnnotation.class);
if (annotation != null) {
    String value = annotation.value();
    int count = annotation.count();
    System.out.println("Value: " + value + ", Count: " + count);
}
```

### 获取字段上的注解

```java
// 获取字段上的注解
Field field = clazz.getField("testField");
MyAnnotation annotation = field.getAnnotation(MyAnnotation.class);
if (annotation != null) {
    String value = annotation.value();
    int count = annotation.count();
    System.out.println("Value: " + value + ", Count: " + count);
}
```

## 重复注解

Java 8引入了重复注解（Repeatable Annotation），允许在同一个元素上多次应用同一个注解。

### 定义重复注解

```java
// 定义容器注解
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface MyAnnotations {
    MyAnnotation[] value();
}

// 定义重复注解
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@Repeatable(MyAnnotations.class)
public @interface MyAnnotation {
    String value();
    int count() default 1;
}
```

### 使用重复注解

```java
// 使用重复注解
@MyAnnotation(value = "test1", count = 1)
@MyAnnotation(value = "test2", count = 2)
public void testMethod() {
    // ...
}
```

### 获取重复注解

```java
// 获取重复注解
Method method = clazz.getMethod("testMethod");
MyAnnotation[] annotations = method.getAnnotationsByType(MyAnnotation.class);
for (MyAnnotation annotation : annotations) {
    String value = annotation.value();
    int count = annotation.count();
    System.out.println("Value: " + value + ", Count: " + count);
}

// 或者通过容器注解获取
MyAnnotations container = method.getAnnotation(MyAnnotations.class);
MyAnnotation[] annotations = container.value();
```

## 重复注解

Java 8引入了重复注解（Repeatable Annotation），允许在同一个元素上多次应用同一个注解。

### 定义重复注解的使用场景
- 泛型参数
- 数组类型
- 方法返回类型
- 方法参数类型
- 局部变量类型
- 字段类型

### 重复注解的示例

```java
// 泛型参数
List<@MyAnnotation String> list = new ArrayList<>();

// 数组类型
String @MyAnnotation [] array = new String[10];

// 方法返回类型
public @MyAnnotation String testMethod() {
    return "test";
}

// 方法参数类型
public void testMethod(@MyAnnotation String param) {
    // ...
}

// 局部变量类型
@MyAnnotation String localVariable = "test";
```

### 重复注解的处理器
可以使用`javax.annotation.processing` API创建注解处理器，处理重复注解。

## 注解的最佳实践

###  明确注解的用途
在定义注解时，应明确注解的用途（编译时检查、生成文档、运行时处理等）。

###  合理使用元注解
根据注解的用途，合理使用元注解指定保留策略和应用目标。

###  为注解参数提供默认值
为非必需的注解参数提供默认值，简化注解的使用。

### 保持注解简洁
注解应保持简洁，避免定义过多的参数。

###  文档化注解
为注解添加文档注释，说明注解的用途、参数的含义等。

###  避免过度使用注解
不要为了使用注解而使用注解，只有当注解能够提供有价值的信息时才使用。

###  使用注解处理器生成代码
可以使用注解处理器在编译时生成代码，减少重复代码的编写。

##  注解的实际应用场景

###  框架开发
框架广泛使用注解来简化配置，如Spring框架的`@Controller`、`@Service`、`@Autowired`等。

```java
@Controller
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }
}
```

###  单元测试
测试框架使用注解来标记测试方法，如JUnit的`@Test`、`@Before`、`@After`等。

```java
public class UserServiceTest {
    @Before
    public void setUp() {
        // 测试前准备
    }

    @Test
    public void testGetUserById() {
        // 测试方法
    }

    @After
    public void tearDown() {
        // 测试后清理
    }
}
```

### 数据校验
可以使用注解进行数据校验，如`@NotNull`、`@Size`、`@Pattern`等。

```java
public class User {
    @NotNull
    private Long id;

    @Size(min = 2, max = 50)
    private String name;

    @Pattern(regexp = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$")
    private String email;

    // getters and setters
}
```

###  ORM映射
ORM框架使用注解来映射实体类和数据库表，如JPA的`@Entity`、`@Table`、`@Column`等。

```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    // getters and setters
}
```

###  AOP编程
AOP框架使用注解来定义切点和通知，如AspectJ的`@Aspect`、`@Pointcut`、`@Before`等。

```java
@Aspect
@Component
public class LoggingAspect {
    @Pointcut("execution(* com.example.service.*.*(..))")
    public void serviceMethods() {
    }

    @Before("serviceMethods()")
    public void logBefore(JoinPoint joinPoint) {
        System.out.println("Method: " + joinPoint.getSignature().getName() + " is called");
    }
}
```

##  Java 8及以上版本的注解新特性

###  重复注解
Java 8引入了重复注解，允许在同一个元素上多次应用同一个注解。

### 类型注解
Java 8引入了类型注解，允许在任何使用类型的地方应用注解。

###  注解的扩展API
Java 8扩展了注解相关的API，如`AnnotatedElement`接口新增了`getAnnotationsByType`方法。

###  Java 9的模块注解
Java 9引入了模块注解`@Module`，用于模块声明。

## 自定义注解处理器

### 注解处理器的作用
注解处理器可以在编译时处理注解，生成代码、验证代码或进行其他操作。

### 实现注解处理器

```java
@SupportedAnnotationTypes("com.example.MyAnnotation")
@SupportedSourceVersion(SourceVersion.RELEASE_11)
public class MyAnnotationProcessor extends AbstractProcessor {
    @Override
    public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {
        // 处理注解
        for (TypeElement annotation : annotations) {
            Set<? extends Element> elements = roundEnv.getElementsAnnotatedWith(annotation);
            for (Element element : elements) {
                // 处理被注解的元素
                MyAnnotation myAnnotation = element.getAnnotation(MyAnnotation.class);
                String value = myAnnotation.value();
                int count = myAnnotation.count();
                // 生成代码或进行其他操作
            }
        }
        return true;
    }
}
```

###  注册注解处理器
可以通过`META-INF/services/javax.annotation.processing.Processor`文件注册注解处理器，或者使用`@AutoService`注解。

```java
@AutoService(Processor.class)
@SupportedAnnotationTypes("com.example.MyAnnotation")
@SupportedSourceVersion(SourceVersion.RELEASE_11)
public class MyAnnotationProcessor extends AbstractProcessor {
    // ...
}
```