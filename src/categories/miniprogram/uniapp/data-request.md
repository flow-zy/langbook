# UniApp数据请求与处理

## uni.request API使用

uni.request是UniApp提供的网络请求API，支持GET、POST等多种请求方式：

### GET请求

```javascript
// 发起GET请求
uni.request({
  url: 'https://example.com/api/data',
  method: 'GET',
  data: {
    page: 1,
    size: 10
  },
  header: {
    'content-type': 'application/json'
  },
  success: function(res) {
    console.log('请求成功:', res.data)
  },
  fail: function(err) {
    console.error('请求失败:', err)
  },
  complete: function() {
    console.log('请求完成')
  }
})
```

### POST请求

```javascript
// 发起POST请求
uni.request({
  url: 'https://example.com/api/submit',
  method: 'POST',
  data: {
    name: '张三',
    age: 20
  },
  header: {
    'content-type': 'application/x-www-form-urlencoded'
  },
  success: function(res) {
    console.log('提交成功:', res.data)
  }
})
```

## 数据缓存

UniApp提供了本地缓存API，可以方便地存储和读取数据：

### 同步缓存API

```javascript
// 存储数据
uni.setStorageSync('userInfo', {
  name: '张三',
  age: 20
})

// 读取数据
const userInfo = uni.getStorageSync('userInfo')
console.log('用户信息:', userInfo)

// 删除数据
uni.removeStorageSync('userInfo')

// 清空所有缓存
uni.clearStorageSync()
```

### 异步缓存API

```javascript
// 存储数据
uni.setStorage({
  key: 'userInfo',
  data: {
    name: '张三',
    age: 20
  },
  success: function() {
    console.log('存储成功')
  }
})

// 读取数据
uni.getStorage({
  key: 'userInfo',
  success: function(res) {
    console.log('用户信息:', res.data)
  }
})
```

## 网络请求封装

为了提高代码的可维护性，我们可以封装网络请求：

```javascript
// utils/request.js
const baseURL = 'https://example.com/api'

function request(url, method, data) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseURL + url,
      method: method || 'GET',
      data: data,
      header: {
        'content-type': 'application/json',
        'token': uni.getStorageSync('token') || ''
      },
      success: function(res) {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else if (res.statusCode === 401) {
          // 未授权，跳转到登录页
          uni.redirectTo({
            url: '/pages/login/login'
          })
          reject(res)
        } else {
          uni.showToast({
            title: res.data.message || '请求失败',
            icon: 'none'
          })
          reject(res)
        }
      },
      fail: function(err) {
        uni.showToast({
          title: '网络异常',
          icon: 'none'
        })
        reject(err)
      }
    })
  })
}

// 导出GET和POST方法
module.exports = {
  get: function(url, data) {
    return request(url, 'GET', data)
  },
  post: function(url, data) {
    return request(url, 'POST', data)
  }
}
```

### 使用封装的请求

```javascript
// 引入请求工具
const request = require('../../utils/request')

// 发起GET请求
request.get('/user/list', {
  page: 1,
  size: 10
}).then(res => {
  console.log('用户列表:', res)
}).catch(err => {
  console.error('请求失败:', err)
})

// 发起POST请求
request.post('/user/login', {
  username: 'admin',
  password: '123456'
}).then(res => {
  console.log('登录成功:', res)
  // 存储token
  uni.setStorageSync('token', res.token)
}).catch(err => {
  console.error('登录失败:', err)
})
```

## 异常处理

在网络请求中，我们需要处理各种异常情况：

### 网络异常处理

```javascript
uni.request({
  url: 'https://example.com/api/data',
  method: 'GET',
  fail: function(err) {
    uni.showToast({
      title: '网络异常，请检查网络连接',
      icon: 'none'
    })
  }
})
```

### 服务器错误处理

```javascript
uni.request({
  url: 'https://example.com/api/data',
  method: 'GET',
  success: function(res) {
    if (res.statusCode === 200) {
      // 处理成功响应
    } else {
      uni.showToast({
        title: '服务器错误: ' + res.statusCode,
        icon: 'none'
      })
    }
  }
})
```

### 超时处理

```javascript
uni.request({
  url: 'https://example.com/api/data',
  method: 'GET',
  timeout: 5000, // 设置超时时间为5秒
  fail: function(err) {
    if (err.errMsg.indexOf('timeout') !== -1) {
      uni.showToast({
        title: '请求超时，请稍后重试',
        icon: 'none'
      })
    }
  }
})
```