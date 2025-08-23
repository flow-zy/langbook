# API调用技术

本章将介绍前端开发中常用的API调用技术，包括XMLHttpRequest、Fetch API和Axios等工具的使用方法和最佳实践。

## XMLHttpRequest

XMLHttpRequest（XHR）是最早的浏览器内置API，用于在后台与服务器进行数据交换。

### 基本使用

```javascript
// 创建XHR对象
const xhr = new XMLHttpRequest();

// 配置请求
xhr.open('GET', 'https://api.example.com/users', true);

// 设置请求头
xhr.setRequestHeader('Content-Type', 'application/json');

// 处理响应
xhr.onload = function() {
  if (xhr.status >= 200 && xhr.status < 300) {
    // 请求成功
    const data = JSON.parse(xhr.responseText);
    console.log(data);
  } else {
    // 请求失败
    console.error('Request failed with status:', xhr.status);
  }
};

// 处理错误
xhr.onerror = function() {
  console.error('Network error occurred');
};

// 发送请求
xhr.send();
```

### 发送POST请求

```javascript
const xhr = new XMLHttpRequest();
xhr.open('POST', 'https://api.example.com/users', true);
xhr.setRequestHeader('Content-Type', 'application/json');

xhr.onload = function() {
  // 处理响应
};

const data = {
  name: 'John Doe',
  email: 'john@example.com'
};

xhr.send(JSON.stringify(data));
```

## Fetch API

Fetch API是现代浏览器提供的更简洁、更强大的网络请求API，基于Promise设计。

### 基本使用

```javascript
// 发送GET请求
fetch('https://api.example.com/users')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
```

### 发送POST请求

```javascript
fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com'
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### Fetch API的特点

- 基于Promise，支持async/await
- 语法更简洁，更易于使用
- 提供了更强大的功能，如流式处理
- 默认不发送Cookie，需要手动配置
- 错误处理需要手动检查response.ok

## Axios

Axios是一个流行的第三方HTTP客户端库，基于Promise设计，同时支持浏览器和Node.js环境。

### 基本使用

首先需要安装Axios：

```bash
npm install axios
# 或使用CDN
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```

发送GET请求：

```javascript
axios.get('https://api.example.com/users')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Axios error:', error);
  });
```

### 发送POST请求

```javascript
axios.post('https://api.example.com/users', {
  name: 'John Doe',
  email: 'john@example.com'
})
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

### 使用async/await

```javascript
async function getUser() {
  try {
    const response = await axios.get('https://api.example.com/users');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

getUser();
```

### Axios的特点

- 基于Promise，支持async/await
- 自动转换JSON数据
- 自动处理请求和响应拦截
- 支持请求取消
- 支持请求超时设置
- 支持CSRF保护
- 提供了丰富的配置选项
- 同时支持浏览器和Node.js环境

## 三种方法的对比

| 特性 | XMLHttpRequest | Fetch API | Axios |
|------|---------------|-----------|-------|
| 语法简洁性 | 低 | 中 | 高 |
| Promise支持 | 不原生支持 | 原生支持 | 原生支持 |
| 自动转换JSON | 不支持 | 部分支持 | 支持 |
| 请求拦截 | 复杂 | 复杂 | 简单 |
| 响应拦截 | 复杂 | 复杂 | 简单 |
| 取消请求 | 复杂 | 支持 | 支持 |
| 超时设置 | 支持 | 支持 | 支持 |
| CSRF保护 | 不支持 | 不支持 | 支持 |
| 浏览器兼容性 | 所有现代浏览器 | 大部分现代浏览器 | 所有现代浏览器 |

## 最佳实践

1. **优先使用Axios**：除非有特殊原因，否则建议使用Axios库，它提供了更丰富的功能和更简洁的API

2. **合理设置超时**：为请求设置合理的超时时间，避免长时间阻塞

```javascript
// Axios设置超时
axios.get('https://api.example.com/users', {
  timeout: 5000 // 5秒
});
```

3. **错误处理**：始终处理请求错误，提供友好的错误提示

4. **请求节流和防抖**：对于频繁触发的请求（如搜索框输入），使用节流或防抖技术减少请求次数

5. **数据缓存**：对于不常变化的数据，实现客户端缓存，减少重复请求

6. **使用请求和响应拦截器**：统一处理请求头、身份验证、错误处理等

```javascript
// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  // 处理请求错误
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  return response;
}, error => {
  // 处理响应错误
  if (error.response && error.response.status === 401) {
    // 未授权，跳转到登录页
    window.location.href = '/login';
  }
  return Promise.reject(error);
});
```

7. **避免回调地狱**：使用Promise链式调用或async/await语法，使代码更清晰

8. **考虑CORS问题**：了解并处理跨域请求问题（详见下一章）

掌握这些API调用技术，将帮助你更高效地进行前后端数据交互，提升开发效率和用户体验。