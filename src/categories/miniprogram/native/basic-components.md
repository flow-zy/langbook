# 基础组件使用

本章将介绍原生小程序中常用的基础组件，包括视图容器组件、基础内容组件、表单组件和媒体组件。

## 视图容器组件

视图容器组件用于布局和组织页面内容。

### view组件

view是最基本的视图容器组件，类似于HTML中的div。

```html
<view class="container">
  <text>这是一个view组件</text>
</view>
```

```css
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx;
  background-color: #f5f5f5;
}
```

### scroll-view组件

scroll-view用于实现可滚动的视图区域。

```html
<scroll-view scroll-y="true" style="height: 400rpx;">
  <view wx:for="{{items}}" wx:key="id" class="item">
    <text>{{item.name}}</text>
  </view>
</scroll-view>
```

```css
.item {
  height: 100rpx;
  line-height: 100rpx;
  border-bottom: 1rpx solid #eee;
}
```

### swiper组件

swiper用于实现轮播图效果。

```html
<swiper indicator-dots="true" autoplay="true" interval="3000" duration="1000">
  <swiper-item>
    <image src="/images/banner1.png" mode="aspectFill"></image>
  </swiper-item>
  <swiper-item>
    <image src="/images/banner2.png" mode="aspectFill"></image>
  </swiper-item>
  <swiper-item>
    <image src="/images/banner3.png" mode="aspectFill"></image>
  </swiper-item>
</swiper>
```

## 基础内容组件

基础内容组件用于展示文本、图标和进度等内容。

### text组件

text用于展示文本内容。

```html
<text class="title">这是一段文本</text>
<text selectable="true">这段文本可以被选中</text>
<text space="nbsp">这是 有 空格 的 文本</text>
```

```css
.title {
  font-size: 36rpx;
  color: #333;
  font-weight: bold;
}
```

### icon组件

icon用于展示图标。

```html
<icon type="success" size="14"></icon>
<icon type="info" size="16" color="#1296db"></icon>
<icon type="warn" size="18" color="#ff9900"></icon>
<icon type="error" size="20" color="#f00"></icon>
```

### progress组件

progress用于展示进度条。

```html
<progress percent="50" show-info="true"></progress>
<progress percent="75" stroke-width="4" color="#1296db"></progress>
<progress percent="100" active="true"></progress>
```

## 4.3 表单组件

表单组件用于收集用户输入。

### button组件

button用于创建按钮。

```html
<button type="primary" bindtap="onTap">主要按钮</button>
<button type="default">默认按钮</button>
<button type="warn">警告按钮</button>
<button disabled="true">禁用按钮</button>
<button loading="true">加载中按钮</button>
```

### input组件

input用于创建输入框。

```html
<input placeholder="请输入用户名" bindinput="onInput"></input>
<input type="password" placeholder="请输入密码" bindinput="onPasswordInput"></input>
<input type="number" placeholder="请输入数字" bindinput="onNumberInput"></input>
```

```javascript
// index.js
Page({
  onInput: function(event) {
    console.log('用户名:', event.detail.value);
  },
  onPasswordInput: function(event) {
    console.log('密码:', event.detail.value);
  },
  onNumberInput: function(event) {
    console.log('数字:', event.detail.value);
  }
})
```

### checkbox组件

checkbox用于创建复选框。

```html
<checkbox-group bindchange="onCheckboxChange">
  <label><checkbox value="option1" checked="true"></checkbox>选项1</label>
  <label><checkbox value="option2"></checkbox>选项2</label>
  <label><checkbox value="option3"></checkbox>选项3</label>
</checkbox-group>
```

```javascript
// index.js
Page({
  onCheckboxChange: function(event) {
    console.log('选中的选项:', event.detail.value);
  }
})
```

## 表单组件

媒体组件用于展示图片、音频和视频等媒体内容。

### image组件

image用于展示图片。

```html
<image src="/images/logo.png" mode="aspectFit"></image>
<image src="https://example.com/image.jpg" mode="aspectFill"></image>
<image src="/images/default.png" mode="center"></image>
```

### audio组件

audio用于播放音频。

```html
<audio src="/audios/music.mp3" controls="true"></audio>
<audio src="https://example.com/audio.mp3" autoplay="true" loop="true"></audio>
```

### video组件

video用于播放视频。

```html
<video src="/videos/video.mp4" controls="true" autoplay="false"></video>
<video src="https://example.com/video.mp4" controls="true" poster="/images/poster.png"></video>
```