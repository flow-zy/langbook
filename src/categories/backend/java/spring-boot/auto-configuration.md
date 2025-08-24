# Spring Boot 自动装配详解

## 什么是自动装配

Spring Boot 自动装配是指在应用启动时，Spring Boot 会根据类路径中的 jar 包、配置文件等信息，自动配置 Spring 应用程序所需的各种组件和功能，而无需开发人员手动配置。

## 自动装配的原理

自动装配的核心是 `@SpringBootApplication` 注解，它包含了以下三个关键注解：

1. `@SpringBootConfiguration`：标记当前类为配置类
2. `@EnableAutoConfiguration`：启用自动装配机制
3. `@ComponentScan`：扫描组件

### @EnableAutoConfiguration 注解

`@EnableAutoConfiguration` 是自动装配的核心，它通过以下方式工作：

1. 扫描 classpath 下的 `META-INF/spring.factories` 文件
2. 加载其中配置的 `EnableAutoConfiguration` 对应的值
3. 将这些值作为配置类加载到 Spring 容器中

## 自动装配的实现方式

### 1. 条件注解

Spring Boot 提供了一系列条件注解，用于根据不同条件决定是否加载某个配置：

- `@ConditionalOnClass`：当类路径中存在指定类时生效
- `@ConditionalOnMissingClass`：当类路径中不存在指定类时生效
- `@ConditionalOnBean`：当 Spring 容器中存在指定 Bean 时生效
- `@ConditionalOnMissingBean`：当 Spring 容器中不存在指定 Bean 时生效
- `@ConditionalOnProperty`：当指定属性存在且值匹配时生效
- `@ConditionalOnResource`：当指定资源存在时生效
- `@ConditionalOnWebApplication`：当应用是 Web 应用时生效
- `@ConditionalOnNotWebApplication`：当应用不是 Web 应用时生效
- `@ConditionalOnExpression`：当 SpEL 表达式为真时生效

### 2. 自动配置类

自动配置类通常位于 `org.springframework.boot.autoconfigure` 包下，命名模式为 `XxxAutoConfiguration`。

一个典型的自动配置类结构如下：

```java
@Configuration
@ConditionalOnClass(DataSource.class)
@ConditionalOnMissingBean(DataSource.class)
@ConditionalOnProperty(name = "spring.datasource.url")
@EnableConfigurationProperties(DataSourceProperties.class)
public class DataSourceAutoConfiguration {

    private final DataSourceProperties properties;

    public DataSourceAutoConfiguration(DataSourceProperties properties) {
        this.properties = properties;
    }

    @Bean
    public DataSource dataSource() {
        return createDataSource();
    }

    private DataSource createDataSource() {
        // 创建并配置数据源
    }
}
```

### 3. 配置属性类

配置属性类用于绑定配置文件中的属性，通常使用 `@ConfigurationProperties` 注解。

```java
@ConfigurationProperties(prefix = "spring.datasource")
public class DataSourceProperties {

    private String url;
    private String username;
    private String password;
    private String driverClassName;
    // getter 和 setter 方法
}
```

## 自定义自动装配

### 1. 创建自动配置类

```java
@Configuration
@ConditionalOnClass(MyService.class)
@EnableConfigurationProperties(MyServiceProperties.class)
public class MyServiceAutoConfiguration {

    private final MyServiceProperties properties;

    public MyServiceAutoConfiguration(MyServiceProperties properties) {
        this.properties = properties;
    }

    @Bean
    @ConditionalOnMissingBean
    public MyService myService() {
        MyService service = new MyService();
        service.setConfig(properties.getConfig());
        return service;
    }
}
```

### 2. 创建配置属性类

```java
@ConfigurationProperties(prefix = "my.service")
public class MyServiceProperties {

    private String config = "default";
    // getter 和 setter 方法
}
```

### 3. 注册自动配置类

在项目的 `src/main/resources/META-INF` 目录下创建 `spring.factories` 文件，并添加以下内容：

```properties
org.springframework.boot.autoconfigure.EnableAutoConfiguration=
com.example.autoconfigure.MyServiceAutoConfiguration
```

## 排除和定制自动装配

### 1. 排除特定的自动配置

```java
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```

### 2. 通过配置属性排除

```yaml
spring.autoconfigure.exclude=
  org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
```

### 3. 定制自动配置

可以通过提供自定义的 Bean 来覆盖自动配置的 Bean：

```java
@Configuration
public class MyConfiguration {

    @Bean
    public DataSource dataSource() {
        // 自定义数据源配置
        return new MyCustomDataSource();
    }
}
```

## 自动装配的顺序

Spring Boot 自动装配有一定的顺序，可以通过以下方式控制：

1. `@AutoConfigureBefore`：在指定的自动配置类之前执行
2. `@AutoConfigureAfter`：在指定的自动配置类之后执行
3. `@AutoConfigureOrder`：指定自动配置类的执行顺序

```java
@Configuration
@AutoConfigureAfter(DataSourceAutoConfiguration.class)
public class MyAutoConfiguration {
    // 配置内容
}
```

## 最佳实践

1. 了解自动配置的原理，以便在需要时进行定制
2. 使用条件注解来控制配置的加载
3. 为自定义组件创建自动配置类，简化使用
4. 优先使用配置属性类而不是 `@Value` 注解
5. 注意自动配置的顺序，避免依赖问题
6. 在不需要自动配置时，显式排除对应的自动配置类

## 常见问题

### 1. 如何查看哪些自动配置类被加载？

可以通过设置日志级别为 DEBUG 来查看：

```yaml
logging.level.org.springframework.boot.autoconfigure=DEBUG
```

### 2. 自动配置的 Bean 被覆盖怎么办？

检查是否有自定义的 Bean 与自动配置的 Bean 同名，或者使用 `@ConditionalOnMissingBean` 来确保只有在没有自定义 Bean 时才加载自动配置的 Bean。

### 3. 如何禁用所有自动配置？

可以使用 `@SpringBootApplication(exclude = {AutoConfigurationImportSelector.class})`，但通常不建议这样做，因为会失去 Spring Boot 的大部分优势。