# Spring Cloud 配置中心

## 概述

在分布式系统中，配置管理是一个重要的挑战。Spring Cloud 提供了多种配置中心解决方案，可以帮助我们集中管理各个微服务的配置，实现配置的动态更新和版本控制。

## Spring Cloud Config

Spring Cloud Config 是 Spring Cloud 提供的一个配置中心解决方案，它支持将配置文件存储在 Git 仓库中，并提供 REST API 接口供客户端获取配置。

### 1. 搭建 Config Server

#### 1.1 添加依赖

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-config-server</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```

#### 1.2 配置启动类

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableConfigServer
@EnableDiscoveryClient
public class ConfigServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(ConfigServerApplication.class, args);
    }
}
```

#### 1.3 配置 application.yml

```yaml
server:
  port: 8888

spring:
  application:
    name: config-server
  cloud:
    config:
      server:
        git:
          uri: https://github.com/your-org/config-repo
          search-paths: '{application}'
          default-label: main

# 可选：配置 Eureka 注册中心
# eureka:
#   client:
#     service-url:
#       defaultZone: http://localhost:8761/eureka/
#   instance:
#     prefer-ip-address: true
```

### 2. 配置客户端

#### 2.1 添加依赖

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-config</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-bootstrap</artifactId>
</dependency>
```

#### 2.2 创建 bootstrap.yml

```yaml
spring:
  application:
    name: service-provider
  cloud:
    config:
      uri: http://localhost:8888
      profile: dev
      label: main

# 可选：通过服务发现查找 Config Server
# spring:
#   cloud:
#     config:
#       discovery:
#         enabled: true
#         service-id: config-server
```

#### 2.3 读取配置

```java
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ConfigController {

    @Value("${custom.property}")
    private String customProperty;

    @GetMapping("/config")
    public String getConfig() {
        return "Custom property: " + customProperty;
    }
}
```

### 3. 动态刷新配置

要实现配置的动态刷新，需要添加以下依赖：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

然后在配置类或控制器上添加 `@RefreshScope` 注解：

```java
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RefreshScope
public class ConfigController {

    @Value("${custom.property}")
    private String customProperty;

    @GetMapping("/config")
    public String getConfig() {
        return "Custom property: " + customProperty;
    }
}
```

修改配置后，发送 POST 请求到 `http://localhost:8080/actuator/refresh` 刷新配置。

## Spring Cloud Consul Config

Consul 不仅可以用于服务发现，还可以用于配置管理。

### 1. 添加依赖

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-consul-config</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-consul-discovery</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

### 2. 配置 bootstrap.yml

```yaml
spring:
  application:
    name: service-provider
  cloud:
    consul:
      host: localhost
      port: 8500
      config:
        enabled: true
        prefixes: config
        default-context: application
        profile-separator: '-'  # 默认为 ','
        data-key: data
```

### 3. 读取配置

与 Spring Cloud Config 类似，可以使用 `@Value` 注解或 `@ConfigurationProperties` 注解读取配置。

### 4. 动态刷新配置

在 Consul 中修改配置后，配置会自动刷新（默认每 5 秒检查一次）。也可以使用 Actuator 的 `/actuator/refresh` 端点手动刷新。

## Spring Cloud Nacos Config

Nacos 同样提供了配置中心功能，并且支持动态配置更新。

### 1. 添加依赖

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
</dependency>
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
```

### 2. 配置 bootstrap.yml

```yaml
spring:
  application:
    name: service-provider
  cloud:
    nacos:
      config:
        server-addr: localhost:8848
        namespace: dev
        group: DEFAULT_GROUP
        file-extension: yaml
      discovery:
        server-addr: localhost:8848
```

### 3. 读取配置

```java
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RefreshScope
public class ConfigController {

    @Value("${custom.property}")
    private String customProperty;

    @GetMapping("/config")
    public String getConfig() {
        return "Custom property: " + customProperty;
    }
}
```

### 4. 动态刷新配置

在 Nacos 控制台修改配置后，配置会自动刷新。也可以通过添加 `@RefreshScope` 注解实现局部刷新。

## 配置中心方案比较

| 特性 | Spring Cloud Config | Consul Config | Nacos Config |
|------|---------------------|---------------|--------------|
| 配置存储 | Git 仓库 | Consul KV 存储 | Nacos 内置存储 |
| 动态刷新 | 支持（需要手动触发或结合 Spring Cloud Bus） | 支持（自动或手动） | 支持（自动） |
| 配置版本控制 | 支持（依赖 Git） | 支持 | 支持 |
| 配置格式 | YAML、Properties、JSON 等 | 键值对 | YAML、Properties、JSON 等 |
| 配置加密 | 支持 | 支持 | 支持 |
| 高可用 | 依赖 Git 和 Config Server 集群 | 依赖 Consul 集群 | 依赖 Nacos 集群 |
| 易用性 | 中等（需要 Git 仓库） | 中等（需要 Consul 集群） | 简单（一体化平台） |
| 额外功能 | 无 | 服务发现、健康检查 | 服务发现、限流 |

## 最佳实践

1. 对于已有的 Git 仓库，Spring Cloud Config 是一个不错的选择
2. 对于需要服务发现和配置管理一体化的场景，Consul 或 Nacos 更合适
3. 对于国内用户，Nacos 提供了更好的中文支持和文档
4. 无论选择哪种配置中心，都应配置高可用集群
5. 敏感配置（如数据库密码）应进行加密处理
6. 合理规划配置的命名空间和分组，避免混乱
7. 结合 Spring Cloud Bus 可以实现配置的批量刷新