# Spring Boot 入门教程

## 什么是 Spring Boot?

Spring Boot 是由 Pivotal 团队提供的全新框架，其设计目的是用来简化新 Spring 应用的初始搭建以及开发过程。它通过自动配置、起步依赖和命令行界面等特性，让开发者能够快速构建独立运行的 Spring 应用。

## 为什么选择 Spring Boot?

- **简化配置**：自动配置大部分 Spring 应用所需的组件
- **起步依赖**：提供一系列依赖描述符，简化 Maven/Gradle 配置
- **独立运行**：可以创建独立的可执行 JAR 文件，无需部署到外部容器
- **生产就绪**：提供指标、健康检查和外部化配置等生产环境特性
- **无代码生成和 XML 配置**：完全基于 Java 注解

## 环境准备

- JDK 1.8 或更高版本
- Maven 3.2+ 或 Gradle 4+
- IDE (IntelliJ IDEA, Eclipse 等)

## 创建第一个 Spring Boot 应用

### 方法一：使用 Spring Initializr

1. 访问 [Spring Initializr](https://start.spring.io/)
2. 配置项目信息：
   - 选择项目类型 (Maven/Gradle)
   - 选择语言 (Java)
   - 选择 Spring Boot 版本
   - 填写 Group 和 Artifact
3. 添加依赖：
   - Web -> Spring Web
4. 点击 "Generate" 按钮生成项目并下载
5. 解压下载的文件，并用 IDE 打开

### 方法二：使用 IDE

以 IntelliJ IDEA 为例：
1. 点击 "File -> New -> Project"
2. 选择 "Spring Initializr"
3. 配置项目信息和 Spring Boot 版本
4. 添加 "Spring Web" 依赖
5. 点击 "Finish" 完成创建

## 编写第一个 REST API

1. 在主应用程序类同级创建一个 `controller` 包
2. 在该包下创建一个 `HelloController` 类：

```java
package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello, Spring Boot!";
    }
}
```

## 运行应用程序

1. 找到主应用程序类 (带有 `@SpringBootApplication` 注解的类)
2. 右键点击并选择 "Run"
3. 应用启动后，访问 `http://localhost:8080/hello`
4. 你应该能看到 "Hello, Spring Boot!" 的响应

## 项目结构解析

```
src
├── main
│   ├── java
│   │   └── com
│   │       └── example
│   │           └── demo
│   │               ├── DemoApplication.java       # 主应用程序类
│   │               └── controller
│   │                   └── HelloController.java   # REST 控制器
│   └── resources
│       ├── application.properties               # 应用配置文件
│       ├── static/                              # 静态资源
│       └── templates/                           # 模板文件
└── test                                         # 测试代码
```

## 配置文件

Spring Boot 使用 `application.properties` 或 `application.yml` 作为配置文件，位于 `src/main/resources` 目录下。你可以在其中配置端口、数据库连接等信息。

例如，修改端口号：
```properties
server.port=8081
```

## 下一步学习

- 学习 Spring Boot 配置
- 了解 Spring Boot 自动装配原理
- 学习 Spring Boot 数据访问 (JPA/MyBatis)
- 掌握 Spring Boot Web 开发技巧
- 学习 Spring Boot 测试方法