# Spring Boot Web 开发

## 概述

Spring Boot 为 Web 开发提供了强大的支持，包括 RESTful API 开发、静态资源管理、模板引擎、过滤器和拦截器等功能。本章将详细介绍 Spring Boot 中的 Web 开发相关技术。

## RESTful API 开发

### 1. 基本控制器

```java
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello, Spring Boot Web!";
    }
}
```

### 2. 请求映射

```java
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @GetMapping
    public List<User> getAllUsers() {
        // 实现获取所有用户的逻辑
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        // 实现根据ID获取用户的逻辑
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        // 实现创建用户的逻辑
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        // 实现更新用户的逻辑
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        // 实现删除用户的逻辑
    }
}
```

### 3. 请求参数处理

```java
@RestController
@RequestMapping("/products")
public class ProductController {

    // 处理查询参数
    @GetMapping
    public List<Product> getProducts(
            @RequestParam(required = false) String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        // 实现根据条件查询产品的逻辑
    }

    // 处理请求头
    @GetMapping("/header")
    public String getHeaderInfo(@RequestHeader("User-Agent") String userAgent) {
        return "User-Agent: " + userAgent;
    }

    // 处理Cookie
    @GetMapping("/cookie")
    public String getCookieInfo(@CookieValue("sessionId") String sessionId) {
        return "Session ID: " + sessionId;
    }
}
```

## 数据校验

### 1. 添加依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

### 2. 使用校验注解

```java
import javax.validation.constraints.*;

public class User {
    @NotNull(message = "ID不能为空")
    private Long id;

    @NotBlank(message = "用户名不能为空")
    @Size(min = 2, max = 20, message = "用户名长度必须在2-20之间")
    private String username;

    @NotBlank(message = "密码不能为空")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$", message = "密码至少8位，包含字母和数字")
    private String password;

    @Email(message = "邮箱格式不正确")
    private String email;

    // getter和setter方法
}
```

### 3. 控制器中启用校验

```java
@RestController
@RequestMapping("/users")
public class UserController {

    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody User user, BindingResult result) {
        if (result.hasErrors()) {
            // 处理校验失败的情况
            String errorMessage = result.getFieldError().getDefaultMessage();
            return ResponseEntity.badRequest().body(null);
        }
        // 实现创建用户的逻辑
        return ResponseEntity.ok(user);
    }
}
```

## 静态资源管理

Spring Boot 默认会从以下位置加载静态资源：
- classpath:/static/
- classpath:/public/
- classpath:/resources/
- classpath:/META-INF/resources/

可以通过修改 `application.yml` 来自定义静态资源位置：

```yaml
spring:
  mvc:
    static-path-pattern: /assets/**
  web:
    resources:
      static-locations: classpath:/custom-static/
```

## 模板引擎

Spring Boot 支持多种模板引擎，包括 Thymeleaf、FreeMarker、Velocity 等。

### Thymeleaf

#### 1. 添加依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

#### 2. 配置模板引擎

```yaml
spring:
  thymeleaf:
    prefix: classpath:/templates/
    suffix: .html
    mode: HTML
    encoding: UTF-8
    cache: false  # 开发环境下关闭缓存
```

#### 3. 创建模板文件

在 `src/main/resources/templates/` 目录下创建 `index.html`：

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>Spring Boot Thymeleaf</title>
</head>
<body>
    <h1 th:text="#{welcome.message}">Welcome</h1>
    <ul>
        <li th:each="user : ${users}" th:text="${user.username}"></li>
    </ul>
</body>
</html>
```

#### 4. 控制器中返回视图

```java
@Controller
public class ViewController {

    @GetMapping("/")
    public String index(Model model) {
        List<User> users = Arrays.asList(
                new User(1L, "张三", "123456", "zhangsan@example.com"),
                new User(2L, "李四", "654321", "lisi@example.com")
        );
        model.addAttribute("users", users);
        return "index";
    }
}
```

## 过滤器和拦截器

### 1. 过滤器

```java
import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import java.io.IOException;

@WebFilter(urlPatterns = "/*")
public class LoggingFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        System.out.println("Request received: " + request.getRemoteAddr());
        chain.doFilter(request, response);
        System.out.println("Response sent");
    }
}
```

然后在启动类上添加 `@ServletComponentScan` 注解启用过滤器扫描。

### 2. 拦截器

```java
import org.springframework.web.servlet.HandlerInterceptor;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class AuthenticationInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String token = request.getHeader("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }
        // 验证token的逻辑
        return true;
    }
}
```

配置拦截器：

```java
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new AuthenticationInterceptor())
                .addPathPatterns("/api/**")
                .excludePathPatterns("/api/public/**");
    }
}
```

## 异常处理

### 1. 全局异常处理

```java
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handleResourceNotFound(ResourceNotFoundException ex) {
        ErrorResponse error = new ErrorResponse("Not Found", ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGenericException(Exception ex) {
        ErrorResponse error = new ErrorResponse("Internal Server Error", ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

class ErrorResponse {
    private String error;
    private String message;

    // 构造函数、getter和setter方法
}

class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
```

### 2. 自定义错误页面

在 `src/main/resources/templates/error/` 目录下创建错误页面，如 `404.html`、`500.html` 等。Spring Boot 会在发生对应错误时自动显示这些页面。

## 文件上传和下载

### 1. 文件上传

```java
@RestController
@RequestMapping("/files")
public class FileController {

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("请选择要上传的文件");
        }

        try {
            // 保存文件的逻辑
            String filename = file.getOriginalFilename();
            Path filePath = Paths.get("uploads/" + filename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            return ResponseEntity.ok("文件上传成功: " + filename);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("文件上传失败");
        }
    }
}
```

配置文件上传大小限制：

```yaml
spring:
  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 10MB
```

### 2. 文件下载

```java
@RestController
@RequestMapping("/files")
public class FileController {

    @GetMapping("/download/{filename}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String filename) {
        try {
            Path filePath = Paths.get("uploads/" + filename);
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
```

## WebSocket 支持

### 1. 添加依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-websocket</artifactId>
</dependency>
```

### 2. 配置 WebSocket

```java
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic");
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws").withSockJS();
    }
}
```

### 3. 创建消息控制器

```java
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
        return chatMessage;
    }

    @MessageMapping("/chat.newUser")
    @SendTo("/topic/public")
    public ChatMessage newUser(@Payload ChatMessage chatMessage) {
        return chatMessage;
    }
}

class ChatMessage {
    private String content;
    private String sender;
    private MessageType type;

    // 构造函数、getter和setter方法

    public enum MessageType {
        CHAT, JOIN, LEAVE
    }
}
```

## 最佳实践

1. 遵循 RESTful API 设计规范，使用合适的 HTTP 方法和状态码
2. 对所有用户输入进行校验，防止注入攻击
3. 使用 `@RestController` 替代 `@Controller` + `@ResponseBody`
4. 合理使用异常处理机制，提供友好的错误信息
5. 对于大型应用，考虑使用 Swagger 或 SpringDoc 自动生成 API 文档
6. 开发环境下关闭模板引擎缓存，生产环境下启用
7. 使用过滤器处理请求日志、编码转换等通用逻辑，使用拦截器处理认证授权等业务相关逻辑
8. 对于文件上传，限制文件大小和类型，并考虑使用云存储服务