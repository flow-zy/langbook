# UniApp跨平台适配

UniApp的核心优势在于一次编写，多端部署。本章将介绍如何在UniApp中进行跨平台适配，确保应用在不同平台上都能正常运行并提供良好的用户体验。

## 平台差异与适配原则

不同平台（如微信小程序、支付宝小程序、H5、App等）在API、组件、样式等方面存在差异，适配时需要遵循以下原则：

1. **优先使用UniApp内置API和组件**：UniApp已对各平台的API和组件进行了封装和适配
2. **避免使用平台特定API**：如必须使用，需通过条件编译进行区分
3. **注意样式差异**：不同平台对CSS的支持程度不同，需进行适配
4. **测试多平台**：在开发过程中需在多个平台上进行测试

## 条件编译

条件编译是UniApp提供的一种跨平台适配机制，可以根据不同平台编写不同的代码。

### 条件编译的基本语法

```javascript
// #ifdef 平台标识符
// 平台特定代码
// #endif

// 示例：在微信小程序中使用微信特定API
// #ifdef MP-WEIXIN
wx.showModal({
  title: '提示',
  content: '这是微信小程序特有的弹窗',
  success (res) {
    if (res.confirm) {
      console.log('用户点击确定')
    }
  }
})
// #endif

// 示例：在H5平台中使用浏览器API
// #ifdef H5
window.alert('这是H5平台特有的弹窗')
// #endif
```

### 条件编译的示例

#### 模板中的条件编译

```vue
<template>
  <view>
    <!-- #ifdef MP-WEIXIN -->
    <view>这是微信小程序特有的内容</view>
    <!-- #endif -->

    <!-- #ifdef H5 -->
    <view>这是H5平台特有的内容</view>
    <!-- #endif -->
  </view>
</template>
```

### 条件编译的示例

#### 样式中的条件编译

```css
/* #ifdef MP-WEIXIN */
.view {
  color: red;
}
/* #endif */

/* #ifdef H5 */
.view {
  color: blue;
}
/* #endif */
```

### 配置文件中的条件编译

```json
{
  "pages": [
    "pages/index/index"
  ],
  /* #ifdef MP-WEIXIN */
  "tabBar": {
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页"
      }
    ]
  },
  /* #endif */
  /* #ifdef H5 */
  "router": {
    "mode": "history"
  },
  /* #endif */
}
```

## 尺寸适配

不同设备的屏幕尺寸和分辨率不同，需要进行尺寸适配。

### 尺寸适配的基本原理

UniApp支持rpx（responsive pixel）单位，它会根据屏幕宽度自动调整：

- 屏幕宽度为750rpx
- 在iPhone6上，1rpx = 0.5px
- 在iPhoneX上，1rpx ≈ 0.42px

### 尺寸适配的示例

```css
/* 占满整个屏幕宽度 */
.box {
  width: 750rpx;  
  height: 200rpx;
  font-size: 32rpx;
}
```

### 尺寸适配的示例  

flex布局可以帮助我们创建适应不同屏幕尺寸的布局：

```css
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
```

## API适配

不同平台的API可能存在差异，UniApp提供了统一的API封装，但仍有部分API需要进行适配。

### API适配的示例

#### 使用uni API

UniApp封装了各平台的常用API，使用uni前缀：

```javascript
// 代替wx.request
uni.request({
  url: 'https://example.com/api/data',
  success: function(res) {
    console.log(res.data)
  }
})

// 代替wx.showToast
uni.showToast({
  title: '提示',
  icon: 'success'
})
```

### API适配的示例

#### 平台特定API

对于平台特定的API，需要使用条件编译：

```javascript
// #ifdef MP-WEIXIN
wx.login({
  success(res) {
    console.log(res.code)
  }
})
// #endif

// #ifdef MP-ALIPAY
my.getAuthCode({
  scopes: 'auth_user',
  success(res) {
    console.log(res.authCode)
  }
})
// #endif
```

## 组件适配

不同平台对组件的支持也可能存在差异，需要进行适配。

### 组件适配的示例

#### 使用UniApp内置组件

UniApp内置组件已进行了跨平台适配，优先使用内置组件：

```vue
<template>
  <view>
    <button type="primary">主要按钮</button>
    <image src="/static/logo.png"></image>
    <scroll-view scroll-y>
      <!-- 内容 -->
    </scroll-view>
  </view>
</template>
```

### 组件适配的示例

#### 平台特定组件

对于平台特定的组件，需要使用条件编译：

```vue
<template>
  <view>
    <!-- #ifdef MP-WEIXIN -->
    <map longitude="116.404" latitude="39.915"></map>
    <!-- #endif -->

    <!-- #ifdef H5 -->
    <div class="h5-map">H5地图组件</div>
    <!-- #endif -->
  </view>
</template>
```