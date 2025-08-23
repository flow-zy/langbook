# UniApp页面路由与导航

## 页面栈管理

UniApp的页面导航基于栈结构，与原生小程序类似。当你打开新页面时，页面会被压入栈顶；当你关闭页面时，页面会从栈顶弹出。UniApp提供了以下几种导航方式：

- **navigateTo**: 打开新页面，将页面压入栈顶
- **redirectTo**: 关闭当前页面，打开新页面
- **navigateBack**: 关闭当前页面，返回上一页面或多级页面
- **switchTab**: 切换标签页，只适用于tabBar页面
- **reLaunch**: 关闭所有页面，打开新页面

## 导航API使用

### 基本导航API

```javascript
// 导航到新页面
uni.navigateTo({
  url: '/pages/detail/detail?id=123'
})

// 重定向到新页面
uni.redirectTo({
  url: '/pages/login/login'
})

// 返回上一页面
uni.navigateBack({
  delta: 1
})

// 切换标签页
uni.switchTab({
  url: '/pages/index/index'
})

// 重启应用
uni.reLaunch({
  url: '/pages/welcome/welcome'
})
```

### 导航动画

UniApp支持自定义导航动画，通过animationType和animationDuration参数设置：

```javascript
uni.navigateTo({
  url: '/pages/detail/detail',
  animationType: 'slide-in-right',
  animationDuration: 300
})
```

可用的动画类型：
- slide-in-right: 从右侧滑入
- slide-in-left: 从左侧滑入
- slide-in-top: 从顶部滑入
- slide-in-bottom: 从底部滑入
- none: 无动画

## 页面参数传递

### 通过URL传递参数

这是最常用的参数传递方式，适用于简单数据的传递：

```javascript
// 页面A: 传递参数
uni.navigateTo({
  url: '/pages/detail/detail?id=123&name=example'
})

// 页面B: 接收参数
export default {
  onLoad(options) {
    console.log('id:', options.id) // 输出: 123
    console.log('name:', options.name) // 输出: example
  }
}
```

### 通过全局数据传递

适用于复杂数据或需要在多个页面间共享的数据：

```javascript
// main.js
Vue.prototype.globalData = {
  userInfo: null
}

// 页面A: 设置全局数据
this.globalData.userInfo = { name: '张三', age: 20 }

// 页面B: 读取全局数据
console.log('用户信息:', this.globalData.userInfo)
```

### 通过本地缓存传递

适用于需要持久化存储的数据：

```javascript
// 页面A: 存储数据
uni.setStorageSync('userInfo', {
  name: '张三',
  age: 20
})

// 页面B: 读取数据
const userInfo = uni.getStorageSync('userInfo')
console.log('用户信息:', userInfo)
```

## tabBar配置与使用

### 配置tabBar

在pages.json中配置tabBar：

```json
{
  "tabBar": {
    "color": "#999999",
    "selectedColor": "#007aff",
    "backgroundColor": "#ffffff",
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "static/icons/home.png",
        "selectedIconPath": "static/icons/home_selected.png"
      },
      {
        "pagePath": "pages/category/category",
        "text": "分类",
        "iconPath": "static/icons/category.png",
        "selectedIconPath": "static/icons/category_selected.png"
      },
      {
        "pagePath": "pages/cart/cart",
        "text": "购物车",
        "iconPath": "static/icons/cart.png",
        "selectedIconPath": "static/icons/cart_selected.png"
      },
      {
        "pagePath": "pages/user/user",
        "text": "我的",
        "iconPath": "static/icons/user.png",
        "selectedIconPath": "static/icons/user_selected.png"
      }
    ]
  }
}
```

### 切换tabBar页面

使用switchTab API切换tabBar页面：

```javascript
uni.switchTab({
  url: '/pages/index/index'
})
```

## 导航守卫

UniApp提供了导航守卫功能，可以在页面跳转前后执行一些操作：

```javascript
// 在页面组件中
export default {
  onLoad() {
    // 页面加载时执行
  },
  onShow() {
    // 页面显示时执行
  },
  onUnload() {
    // 页面卸载时执行
  },
  // 全局导航守卫
  onPageScroll(e) {
    // 页面滚动时执行
  }
}
```

对于更复杂的导航控制，可以使用Vue Router的导航守卫（仅H5平台支持）：

```javascript
// router/index.js
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    // 路由配置
  ]
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 检查用户是否登录
  const isLogin = uni.getStorageSync('isLogin')
  if (to.meta.requiresAuth && !isLogin) {
    next({ path: '/pages/login/login' })
  } else {
    next()
  }
})

export default router
```