# 网络基础概念

本章将介绍前端开发中必备的网络基础概念，包括HTTP协议、URL结构、请求方法、状态码等。

## HTTP协议

HTTP（HyperText Transfer Protocol，超文本传输协议）是用于传输超媒体文档（如HTML）的应用层协议。它是互联网上应用最为广泛的一种网络协议。

### HTTP的主要特点

- **无连接**：每次连接只处理一个请求，请求结束后连接关闭
- **无状态**：协议本身不保存会话状态，需要通过Cookie、Session等机制来维持状态
- **媒体独立**：只要客户端和服务器知道如何处理数据格式，任何类型的数据都可以通过HTTP传输
- **简单快速**：协议简单，通信速度快

## URL结构

URL（Uniform Resource Locator，统一资源定位符）用于标识互联网上的资源。一个完整的URL通常由以下部分组成：

```
protocol://hostname:port/path?query#fragment
```

- **protocol**：协议类型，如http、https
- **hostname**：主机名或IP地址
- **port**：端口号，默认80（http）或443（https）
- **path**：资源路径
- **query**：查询参数，以?开头，多个参数用&分隔
- **fragment**：片段标识符，以#开头，用于定位页面内的位置

例如：`https://www.example.com:8080/products?id=123&category=electronics#details`

## HTTP请求方法

HTTP定义了一组请求方法，用于指定对资源的操作。常用的请求方法包括：

### GET

用于获取资源。GET请求参数会附加在URL后面，因此有长度限制，且不太安全。

```
GET /api/users HTTP/1.1
Host: www.example.com
```

### POST

用于提交数据，创建新资源。POST请求参数放在请求体中，没有长度限制，相对更安全。

```
POST /api/users HTTP/1.1
Host: www.example.com
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
```

### PUT

用于更新已存在的资源。

```
PUT /api/users/1 HTTP/1.1
Host: www.example.com
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```

### DELETE

用于删除资源。

```
DELETE /api/users/1 HTTP/1.1
Host: www.example.com
```

### PATCH

用于部分更新资源。

```
PATCH /api/users/1 HTTP/1.1
Host: www.example.com
Content-Type: application/json

{
  "email": "john.doe@example.com"
}
```

## HTTP状态码

HTTP状态码用于表示请求的处理结果。状态码分为5类：

### 1xx（信息性状态码）

- `100 Continue`：服务器已收到请求的一部分，客户端应继续发送剩余部分

### 2xx（成功状态码）

- `200 OK`：请求成功
- `201 Created`：资源创建成功
- `204 No Content`：请求成功，但没有返回内容

### 3xx（重定向状态码）

- `301 Moved Permanently`：资源永久移动到新位置
- `302 Found`：资源临时移动到新位置
- `304 Not Modified`：资源未修改，可使用缓存

### 4xx（客户端错误状态码）

- `400 Bad Request`：请求参数错误
- `401 Unauthorized`：未授权，需要登录
- `403 Forbidden`：禁止访问
- `404 Not Found`：请求的资源不存在
- `405 Method Not Allowed`：不支持的请求方法

### 5xx（服务器错误状态码）

- `500 Internal Server Error`：服务器内部错误
- `502 Bad Gateway`：网关错误
- `503 Service Unavailable`：服务不可用
- `504 Gateway Timeout`：网关超时

## HTTP头部信息

HTTP请求和响应都包含头部信息，用于传递附加信息。

### 常见请求头

- `Accept`：指定客户端可接受的内容类型
- `Accept-Encoding`：指定客户端可接受的编码方式
- `Content-Type`：请求体的媒体类型
- `Authorization`：身份验证信息
- `Cookie`：客户端的Cookie信息
- `User-Agent`：客户端信息（浏览器、操作系统等）

### 常见响应头

- `Content-Type`：响应体的媒体类型
- `Content-Length`：响应体的长度
- `Set-Cookie`：设置Cookie
- `Cache-Control`：缓存控制策略
- `Access-Control-Allow-Origin`：CORS相关，允许的源

## HTTPS

HTTPS（HTTP Secure）是HTTP的安全版本，通过SSL/TLS协议对通信内容进行加密。

### HTTPS的主要特点

- **数据加密**：防止数据被窃听
- **身份验证**：确保通信方的身份真实性
- **数据完整性**：防止数据被篡改

## DNS

DNS（Domain Name System，域名系统）负责将域名解析为IP地址。

### DNS解析过程

1. 客户端发送域名解析请求到本地DNS服务器
2. 本地DNS服务器查询自身缓存，若有结果则返回
3. 若无缓存，本地DNS服务器向根DNS服务器查询
4. 根DNS服务器返回顶级域名DNS服务器地址
5. 本地DNS服务器向顶级域名DNS服务器查询
6. 顶级域名DNS服务器返回权威DNS服务器地址
7. 本地DNS服务器向权威DNS服务器查询
8. 权威DNS服务器返回IP地址
9. 本地DNS服务器缓存结果并返回给客户端

## TCP/IP

TCP/IP（Transmission Control Protocol/Internet Protocol）是一组网络通信协议的集合，是互联网的基础。

### TCP的主要特点

- **面向连接**：通信前需要建立连接
- **可靠传输**：通过确认、重传等机制确保数据正确传输
- **面向字节流**：将数据视为无结构的字节流
- **全双工通信**：通信双方可以同时发送和接收数据

### TCP三次握手

1. 客户端发送SYN包，请求建立连接
2. 服务器发送SYN+ACK包，确认请求并请求建立连接
3. 客户端发送ACK包，确认连接建立

### TCP四次挥手

1. 主动方发送FIN包，请求关闭连接
2. 被动方发送ACK包，确认收到请求
3. 被动方发送FIN包，请求关闭连接
4. 主动方发送ACK包，确认关闭连接

了解这些网络基础概念，将帮助你更好地理解前端网络请求的工作原理和常见问题。