# 错误处理策略

在前端网络请求中，错误处理是一个非常重要的环节。良好的错误处理能够提升用户体验，帮助开发者快速定位问题。本章将介绍前端网络请求中的错误处理策略。

## 网络错误的类型

前端网络请求中常见的错误类型包括：

### 网络连接错误

- 无网络连接（离线）
- 网络超时
- 服务器不可达

### HTTP错误

- 4xx错误：客户端错误（如404 Not Found、401 Unauthorized）
- 5xx错误：服务器错误（如500 Internal Server Error、503 Service Unavailable）

### 数据格式错误

- 响应数据不是预期的格式（如预期JSON但返回HTML）
- 数据缺少必要的字段
- 数据类型不匹配

### 业务逻辑错误

- 用户名或密码错误
- 权限不足
- 资源已存在

## 错误处理的基本原则

1. **及时反馈**：向用户提供清晰的错误提示
2. **具体明确**：错误信息应具体、明确，避免模糊不清
3. **分级处理**：根据错误的严重程度采取不同的处理方式
4. **日志记录**：记录错误信息，便于调试和问题定位
5. **自动恢复**：对于可重试的错误，实现自动重试机制
6. **用户友好**：错误提示应易于理解，避免技术术语

## 错误处理的实现

### 基本错误处理

#### Fetch API错误处理

```javascript
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
    // 显示错误提示
    showErrorMessage('获取数据失败，请稍后重试');
  });
```

#### Axios错误处理

```javascript
axios.get('https://api.example.com/users')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Axios error:', error);
    // 处理不同类型的错误
    if (error.response) {
      // 服务器返回了错误状态码
      const status = error.response.status;
      if (status === 401) {
        showErrorMessage('请先登录');
        // 跳转到登录页
        window.location.href = '/login';
      } else if (status === 404) {
        showErrorMessage('请求的资源不存在');
      } else if (status >= 500) {
        showErrorMessage('服务器内部错误，请稍后重试');
      } else {
        showErrorMessage('请求失败，请稍后重试');
      }
    } else if (error.request) {
      // 没有收到响应
      showErrorMessage('网络连接超时，请检查网络后重试');
    } else {
      // 设置请求时发生错误
      showErrorMessage('请求配置错误');
    }
  });
```

### 使用async/await的错误处理

```javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/users');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    // 显示错误提示
    showErrorMessage('获取数据失败，请稍后重试');
    throw error; // 可以选择继续抛出错误，让调用者处理
  }
}

try {
  const data = await fetchData();
  // 处理数据
} catch (error) {
  // 处理错误
}
```

### 错误拦截器

使用Axios的拦截器可以统一处理错误：

```javascript
// 添加响应拦截器
axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  return response;
}, error => {
  // 统一处理错误
  console.error('API error:', error);

  // 根据错误类型显示不同的提示
  if (error.response) {
    const { status, data } = error.response;
    switch (status) {
      case 400:
        showErrorMessage(data.message || '请求参数错误');
        break;
      case 401:
        showErrorMessage('请先登录');
        // 跳转到登录页
        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
        break;
      case 403:
        showErrorMessage('权限不足，无法访问');
        break;
      case 404:
        showErrorMessage('请求的资源不存在');
        break;
      case 500:
        showErrorMessage('服务器内部错误，请稍后重试');
        break;
      case 503:
        showErrorMessage('服务器当前不可用，请稍后重试');
        break;
      default:
        showErrorMessage(`请求失败，状态码: ${status}`);
    }
  } else if (error.request) {
    // 没有收到响应
    showErrorMessage('网络连接超时，请检查网络后重试');
  } else {
    // 设置请求时发生错误
    showErrorMessage('请求配置错误');
  }

  return Promise.reject(error);
});
```

## 重试机制

对于一些临时性的网络错误，可以实现自动重试机制：

```javascript
// 带重试机制的请求函数
async function requestWithRetry(url, options = {}, retryCount = 3, delay = 1000) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Request failed (${retryCount} retries left):`, error);

    // 如果还有重试次数，延迟后重试
    if (retryCount > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
      // 指数退避策略：每次重试延迟时间翻倍
      return requestWithRetry(url, options, retryCount - 1, delay * 2);
    }

    // 没有重试次数了，抛出错误
    throw error;
  }
}

// 使用示例
try {
  const data = await requestWithRetry('https://api.example.com/users');
  console.log(data);
} catch (error) {
  console.error('Final error:', error);
  showErrorMessage('获取数据失败，请稍后重试');
}
```

### 重试策略

1. **固定延迟**：每次重试之间间隔固定时间
2. **指数退避**：每次重试之间的间隔时间翻倍
3. **随机延迟**：每次重试之间的间隔时间随机变化
4. **条件重试**：只对特定类型的错误进行重试（如网络错误、503错误等）

## 错误日志记录

记录错误日志有助于问题定位和调试：

```javascript
function logError(error, context = {}) {
  // 收集错误信息
  const errorInfo = {
    timestamp: new Date().toISOString(),
    message: error.message,
    stack: error.stack,
    url: window.location.href,
    userAgent: navigator.userAgent,
    context: context
  };

  // 发送错误日志到服务器
  fetch('/api/logs/error', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(errorInfo)
  }).catch(logError => {
    console.error('Failed to log error:', logError);
  });
}

// 使用示例
try {
  // 执行可能出错的操作
} catch (error) {
  logError(error, { operation: 'fetchData', userId: '123' });
  showErrorMessage('操作失败，请稍后重试');
}
```

## 用户体验优化

### 加载状态提示

在请求过程中，显示加载状态提示：

```javascript
function fetchWithLoading(url, options = {}) {
  // 显示加载提示
  showLoadingMessage('加载中...');

  return fetch(url, options)
    .then(response => {
      // 隐藏加载提示
      hideLoadingMessage();
      return response;
    })
    .catch(error => {
      // 隐藏加载提示
      hideLoadingMessage();
      throw error;
    });
}
```

### 错误提示方式

根据错误的严重程度，选择不同的提示方式：

1. **轻量级提示**：使用toast消息，几秒后自动消失，适用于非关键错误
2. **模态框提示**：使用弹窗，需要用户确认，适用于关键错误
3. **页面级提示**：在页面顶部或底部显示条带式提示，适用于较严重的错误
4. **内联提示**：在表单字段旁边显示错误提示，适用于表单验证错误

### 离线状态处理

检测用户离线状态，并提供相应的提示：

```javascript
// 检测在线状态变化
window.addEventListener('online', () => {
  showSuccessMessage('已恢复网络连接');
});

window.addEventListener('offline', () => {
  showErrorMessage('网络连接已断开，请检查网络后重试');
});

// 检查初始状态
if (!navigator.onLine) {
  showErrorMessage('当前处于离线状态，请检查网络后重试');
}
```

## 最佳实践

1. **统一错误处理**：使用拦截器或封装请求函数，实现统一的错误处理逻辑

2. **适当的重试机制**：对临时性错误实现自动重试，但要设置合理的重试次数和延迟时间

3. **详细的错误日志**：记录详细的错误信息和上下文，便于调试和问题定位

4. **友好的用户提示**：根据错误类型提供清晰、友好的用户提示，避免技术术语

5. **区分错误类型**：根据错误类型采取不同的处理策略（如权限错误跳转到登录页）

6. **优雅降级**：在网络不可用的情况下，提供离线功能或缓存数据

7. **监控和报警**：对严重错误实现监控和报警机制，及时发现和解决问题

通过良好的错误处理策略，可以提升用户体验，减少用户流失，同时也能帮助开发者快速定位和解决问题。