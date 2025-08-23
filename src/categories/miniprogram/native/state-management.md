# 状态管理

本章将详细讲解原生小程序的状态管理机制，包括全局数据管理、页面数据管理和组件数据管理。

## 全局数据管理

全局数据管理适用于需要在多个页面之间共享的数据。

### 使用App实例存储全局数据

```javascript
// app.js
App({
  globalData: {
    userInfo: null,
    appVersion: '1.0.0',
    isLogin: false
  },

  // 全局方法
  setUserInfo: function(userInfo) {
    this.globalData.userInfo = userInfo;
    this.globalData.isLogin = true;
  }
})
```

### 访问全局数据

```javascript
// 在页面中访问全局数据
const app = getApp()

Page({
  onLoad: function() {
    console.log('用户信息:', app.globalData.userInfo)
    console.log('是否登录:', app.globalData.isLogin)
  },

  updateUserInfo: function(userInfo) {
    // 更新全局数据
    app.setUserInfo(userInfo)
  }
})
```

## 页面数据管理

页面数据管理适用于仅在当前页面使用的数据。

### 使用Page实例管理数据

```javascript
// index.js
Page({
  data: {
    message: 'Hello World',
    count: 0,
    items: []
  },

  onLoad: function() {
    // 初始化数据
    this.setData({
      items: [
        { id: 1, name: 'item 1' },
        { id: 2, name: 'item 2' }
      ]
    })
  },

  incrementCount: function() {
    // 更新数据
    this.setData({
      count: this.data.count + 1
    })
  }
})
```

### 数据绑定

```html
<!-- index.wxml -->
<view>{{message}}</view>
<view>计数: {{count}}</view>
<button bindtap="incrementCount">增加计数</button>

<view wx:for="{{items}}" wx:key="id">
  {{item.name}}
</view>
```

## 组件数据管理

组件数据管理适用于自定义组件内部使用的数据。

### 组件数据定义

```javascript
// components/custom-component.js
Component({
  data: {
    componentData: '组件内部数据',
    isShow: true
  },

  properties: {
    // 外部传入的属性
    title: {
      type: String,
      value: '默认标题'
    },
    count: {
      type: Number,
      value: 0
    }
  },

  methods: {
    // 组件方法
    updateComponentData: function() {
      this.setData({
        componentData: '更新后的组件数据'
      })
    }
  }
})
```

### 组件数据使用

```html
<!-- components/custom-component.wxml -->
<view>{{title}}</view>
<view>{{count}}</view>
<view>{{componentData}}</view>
<button bindtap="updateComponentData">更新组件数据</button>
```

### 页面中使用组件

```html
<!-- index.wxml -->
<custom-component title="自定义组件" count="5"></custom-component>
```

```javascript
// index.js
Page({
  data: {},

  onLoad: function() {
    // 获取组件实例
    const component = this.selectComponent('.custom-component')
    // 调用组件方法
    component.updateComponentData()
  }
})
```