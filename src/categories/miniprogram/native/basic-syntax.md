# 基础语法精讲

本章将详细讲解原生小程序的基础语法，包括WXML模板语言、WXSS样式语言、JavaScript逻辑开发和JSON配置文件。

##  WXML模板语言

WXML是小程序的页面结构语言，类似HTML但有一些差异。

###  基本标签使用

```html
<!-- index.wxml -->
<view class="container">
  <text class="title">Hello World</text>
  <button bindtap="onTap">点击我</button>
  <image src="/images/logo.png" mode="aspectFit"></image>
</view>
```

### 条件渲染(wx:if)

```html
<!-- 条件渲染 -->
<view wx:if="{{isShow}}">显示内容</view>
<view wx:elif="{{isLoading}}">加载中...</view>
<view wx:else>隐藏内容</view>
```

### 列表渲染(wx:for)

```html
<!-- 列表渲染 -->
<view wx:for="{{items}}" wx:key="id">
  <text>{{index}}: {{item.name}}</text>
</view>
```

###  模板和引用

```html
<!-- 定义模板 -->
<template name="userInfo">
  <view>
    <text>{{name}}</text>
    <text>{{age}}</text>
  </view>
</template>

<!-- 使用模板 -->
<template is="userInfo" data="{{...user}}"/>

<!-- 引用文件 -->
<import src="../templates/userInfo.wxml"/>
<include src="../components/header.wxml"/>
```

##  WXSS样式语言

WXSS是小程序的样式语言，扩展了CSS的功能。

### 选择器

```css
/* 标签选择器 */
view { color: #333; }

/* 类选择器 */
.container { padding: 20rpx; }

/* ID选择器 */
#title { font-size: 36rpx; }

/* 后代选择器 */
.container text { margin-bottom: 10rpx; }
```

### 尺寸单位(rpx)

```css
/* 使用rpx单位实现自适应 */
.title {
  font-size: 36rpx; /* 相当于屏幕宽度的36/750 */
  margin-bottom: 20rpx;
}
```

### 全局样式与局部样式  

- **全局样式**：在app.wxss中定义，作用于所有页面
- **局部样式**：在页面的.wxss文件中定义，只作用于当前页面

```css
/* app.wxss 全局样式 */
page {
  background-color: #f5f5f5;
}

/* index.wxss 局部样式 */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
```

##  JavaScript逻辑开发

### 页面生命周期函数

```javascript
// index.js
Page({
  onLoad: function(options) {
    // 页面加载时执行，只触发一次
    console.log('页面加载完成', options);
  },

  onShow: function() {
    // 页面显示时执行
    console.log('页面显示');
  },

  onReady: function() {
    // 页面初次渲染完成时执行，只触发一次
    console.log('页面渲染完成');
  },

  onHide: function() {
    // 页面隐藏时执行
    console.log('页面隐藏');
  },

  onUnload: function() {
    // 页面卸载时执行
    console.log('页面卸载');
  }
})
```

### 事件处理

```javascript
// index.js
Page({
  onTap: function(event) {
    // 按钮点击事件
    console.log('按钮被点击了', event);
    wx.showToast({
      title: '按钮被点击了',
      icon: 'success'
    })
  },

  onInput: function(event) {
    // 输入框事件
    console.log('输入内容:', event.detail.value);
  }
})
```

### 数据绑定

```javascript
// index.js
Page({
  data: {
    message: 'Hello World',
    items: [
      { id: 1, name: 'item 1' },
      { id: 2, name: 'item 2' }
    ],
    isShow: true
  },

  changeMessage: function() {
    // 更新数据
    this.setData({
      message: '新的消息',
      isShow: false
    })
  }
})
```

##  JSON配置文件

### 全局配置

```json
// app.json
{
  "pages": [
    "pages/index/index",
    "pages/logs/logs"
  ],
  "window": {
    "backgroundTextStyle": "light",
    "navigationBarBackgroundColor": "#fff",
    "navigationBarTitleText": "WeChat",
    "navigationBarTextStyle": "black"
  }
}
```

### 页面配置

```json
// index.json
{
  "navigationBarTitleText": "首页",
  "navigationBarBackgroundColor": "#ffffff",
  "navigationBarTextStyle": "black",
  "enablePullDownRefresh": true
}
```