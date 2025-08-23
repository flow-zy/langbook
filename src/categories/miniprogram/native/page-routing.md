# 页面路由与导航

本章将详细讲解原生小程序的页面路由与导航机制，包括页面栈管理、导航API使用和页面参数传递。

## 页面栈管理

小程序的页面导航基于栈结构，每次导航都会对页面栈进行相应操作：

- **navigateTo**: 打开新页面，将页面压入栈顶
- **redirectTo**: 关闭当前页面，打开新页面
- **navigateBack**: 关闭当前页面，返回上一页面或多级页面
- **switchTab**: 切换标签页，只适用于tabBar页面
- **reLaunch**: 关闭所有页面，打开新页面

页面栈的最大深度为10层，超过10层后，navigateTo将不再生效。

## 导航API详解

### navigateTo

navigateTo用于打开新页面，保留当前页面，新页面入栈。

```javascript
// 导航到新页面
wx.navigateTo({
  url: '/pages/detail/detail?id=123'
})
```

### redirectTo

redirectTo用于关闭当前页面，打开新页面，当前页面出栈，新页面入栈。

```javascript
// 重定向到新页面
wx.redirectTo({
  url: '/pages/login/login'
})
```

### navigateBack

navigateBack用于关闭当前页面，返回上一页面或多级页面，当前页面出栈。

```javascript
// 返回上一页面
wx.navigateBack({
  delta: 1
})

// 返回上两级页面
wx.navigateBack({
  delta: 2
})
```

### switchTab

switchTab用于切换标签页，只适用于tabBar页面，会关闭所有非tabBar页面。

```javascript
// 切换标签页
wx.switchTab({
  url: '/pages/index/index'
})
```

### reLaunch

reLaunch用于关闭所有页面，打开新页面，清空页面栈，新页面入栈。

```javascript
// 重启应用
wx.reLaunch({
  url: '/pages/welcome/welcome'
})
```

## 页面参数传递

### 通过URL传递参数

```javascript
// 页面A: 传递参数
wx.navigateTo({
  url: '/pages/detail/detail?id=123&name=example'
})

// 页面B: 接收参数
Page({
  onLoad: function(options) {
    console.log('id:', options.id) // 输出: 123
    console.log('name:', options.name) // 输出: example
  }
})
```

### 通过全局数据传递

```javascript
// app.js
App({
  globalData: {
    userInfo: null
  }
})

// 页面A: 设置全局数据
const app = getApp()
app.globalData.userInfo = { name: '张三', age: 20 }

// 页面B: 读取全局数据
const app = getApp()
console.log('用户信息:', app.globalData.userInfo)
```

### 通过本地缓存传递

```javascript
// 页面A: 存储数据
wx.setStorageSync('userInfo', {
  name: '张三',
  age: 20
})

// 页面B: 读取数据
const userInfo = wx.getStorageSync('userInfo')
console.log('用户信息:', userInfo)
```