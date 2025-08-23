# 数据请求与处理

本章将详细讲解原生小程序的数据请求与处理机制，包括wx.request API使用、数据缓存策略、网络请求封装和异常处理。

## wx.request API使用

wx.request是小程序中用于发起网络请求的API。

### 发起GET请求

```javascript
wx.request({
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

### 发起POST请求

```javascript
wx.request({
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
  },
  fail: function(err) {
    console.error('提交失败:', err)
  }
})
```

## 数据缓存策略

小程序提供了本地缓存API，可以将数据存储在本地，减少网络请求。

### 同步缓存API

```javascript
// 存储数据
wx.setStorageSync('userInfo', {
  name: '张三',
  age: 20
})

// 读取数据
const userInfo = wx.getStorageSync('userInfo')
console.log('用户信息:', userInfo)

// 删除数据
wx.removeStorageSync('userInfo')

// 清空所有缓存
wx.clearStorageSync()
```

### 异步缓存API

```javascript
// 存储数据
wx.setStorage({
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
wx.getStorage({
  key: 'userInfo',
  success: function(res) {
    console.log('用户信息:', res.data)
  }
})

// 删除数据
wx.removeStorage({
  key: 'userInfo',
  success: function() {
    console.log('删除成功')
  }
})
```

## 网络请求封装

为了提高代码的复用性和可维护性，可以对wx.request进行封装。

```javascript
// utils/request.js
const baseURL = 'https://example.com/api'

function request(url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + url,
      method: method || 'GET',
      data: data,
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token') || ''
      },
      success: function(res) {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          wx.showToast({
            title: res.data.message || '请求失败',
            icon: 'none'
          })
          reject(res)
        }
      },
      fail: function(err) {
        wx.showToast({
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
// 引入封装的请求
const request = require('../../utils/request')

// 发起GET请求
request.get('/users', { page: 1, size: 10 })
  .then(res => {
    console.log('用户列表:', res.data)
  })
  .catch(err => {
    console.error('请求失败:', err)
  })

// 发起POST请求
request.post('/users', { name: '张三', age: 20 })
  .then(res => {
    console.log('添加成功:', res.data)
  })
  .catch(err => {
    console.error('添加失败:', err)
  })
```

## 异常处理

在网络请求中，需要处理各种可能的异常情况。

### 网络异常处理

```javascript
wx.request({
  url: 'https://example.com/api/data',
  method: 'GET',
  fail: function(err) {
    wx.showToast({
      title: '网络异常，请检查网络连接',
      icon: 'none'
    })
    console.error('网络异常:', err)
  }
})
```

### 服务器错误处理

```javascript
wx.request({
  url: 'https://example.com/api/data',
  method: 'GET',
  success: function(res) {
    if (res.statusCode === 200) {
      // 处理成功响应
      console.log('请求成功:', res.data)
    } else if (res.statusCode === 404) {
      wx.showToast({
        title: '请求的资源不存在',
        icon: 'none'
      })
    } else if (res.statusCode === 500) {
      wx.showToast({
        title: '服务器内部错误',
        icon: 'none'
      })
    } else {
      wx.showToast({
        title: '请求失败，状态码: ' + res.statusCode,
        icon: 'none'
      })
    }
  }
})
```

### 超时处理

```javascript
wx.request({
  url: 'https://example.com/api/data',
  method: 'GET',
  timeout: 5000, // 设置超时时间为5秒
  success: function(res) {
    console.log('请求成功:', res.data)
  },
  fail: function(err) {
    if (err.errMsg.indexOf('request:fail timeout') !== -1) {
      wx.showToast({
        title: '请求超时，请稍后重试',
        icon: 'none'
      })
    }
  }
})
```