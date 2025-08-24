# Spring Boot 配置详解

## 配置文件类型

Spring Boot 支持多种格式的配置文件：

1. **application.properties**：传统的属性文件格式
2. **application.yml**：YAML 格式，更简洁易读
3. **application.yaml**：与 YML 格式相同
4. **环境特定配置**：如 application-dev.properties, application-prod.yml 等

## 配置文件加载顺序

Spring Boot 按以下顺序加载配置文件，后加载的会覆盖先加载的：

1. 项目根目录下的 config 文件夹
2. 项目根目录
3. classpath 下的 config 文件夹
4. classpath 根目录

## 核心配置项

### 应用基本配置

```yaml
# 应用名称
spring.application.name=my-spring-boot-app

# 应用版本
info.app.version=1.0.0

# 应用描述
info.app.description=A sample Spring Boot application
```

### 服务器配置

```yaml
# 服务器端口
server.port=8080

# 服务器IP地址
server.address=0.0.0.0

# 服务器上下文路径
server.servlet.context-path=/api

# 会话超时时间（秒）
server.servlet.session.timeout=3600
```

### 日志配置

```yaml
# 日志级别
logging.level.root=INFO
logging.level.com.example=DEBUG
logging.level.org.springframework.web=INFO

# 日志文件
logging.file.name=logs/my-app.log
logging.file.max-size=10MB
logging.file.max-history=7

# 日志模式
logging.pattern.console=%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n
# 开发环境日志配置
logging.config=classpath:logback-dev.xml
```

### 数据源配置

```yaml
# 数据库URL
spring.datasource.url=jdbc:mysql://localhost:3306/mydb?useSSL=false&serverTimezone=UTC

# 数据库用户名
spring.datasource.username=root

# 数据库密码
spring.datasource.password=password

# 数据库驱动类
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# 连接池配置
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=30000
```

### JPA/Hibernate 配置

```yaml
# JPA 配置
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.properties.hibernate.format_sql=true
```

### 自定义配置

你可以在配置文件中添加自定义配置，然后通过 `@Value` 注解或 `@ConfigurationProperties` 注解注入到代码中。

```yaml
# 自定义配置
myapp.app-name=My Application
myapp.version=1.0.0
myapp.max-connections=100
```

## 配置注入方式

### 使用 @Value 注解

```java
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class AppConfig {

    @Value("${myapp.app-name}")
    private String appName;

    @Value("${myapp.version}")
    private String version;

    @Value("${myapp.max-connections:50}")  // 带默认值
    private int maxConnections;

    // getter 和 setter 方法
}
```

### 使用 @ConfigurationProperties 注解

```java
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "myapp")
public class MyAppProperties {

    private String appName;
    private String version;
    private int maxConnections = 50;  // 默认值

    // getter 和 setter 方法
}
```

## 环境特定配置

你可以为不同环境创建不同的配置文件：

- `application-dev.yml`：开发环境
- `application-test.yml`：测试环境
- `application-prod.yml`：生产环境

### 激活特定环境

1. **通过配置文件激活**：

```yaml
# 在 application.yml 中
spring.profiles.active=dev
```

2. **通过命令行参数激活**：

```bash
java -jar myapp.jar --spring.profiles.active=prod
```

3. **通过系统属性激活**：

```bash
java -Dspring.profiles.active=test -jar myapp.jar
```

## 外部化配置

Spring Boot 支持多种外部化配置方式：

1. 命令行参数
2. 系统环境变量
3. Java 系统属性
4. 配置文件
5. 配置服务器（如 Spring Cloud Config）

### 命令行参数示例

```bash
java -jar myapp.jar --server.port=8081 --myapp.app-name=ProductionApp
```

## 最佳实践

1. 为不同环境使用不同的配置文件
2. 敏感信息（如密码）不要硬编码在配置文件中，使用环境变量或配置服务器
3. 使用 `@ConfigurationProperties` 代替 `@Value` 进行批量配置注入
4. 配置项命名使用小写字母和连字符（kebab-case）
5. 为自定义配置添加适当的校验

```java
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;

@Component
@ConfigurationProperties(prefix = "myapp")
@Validated
public class MyAppProperties {

    @NotEmpty
    private String appName;

    @NotEmpty
    private String version;

    @Min(10)
    @Max(200)
    private int maxConnections = 50;

    // getter 和 setter 方法
}
```