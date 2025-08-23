# UniApp状态管理

在UniApp开发中，有效的状态管理可以帮助我们更好地组织和管理应用数据。本章将介绍几种常用的状态管理方式。

## 全局数据管理

### 使用Vue原型链

这是最简单的全局数据管理方式，通过在Vue原型链上挂载全局数据：

```javascript
// main.js
Vue.prototype.globalData = {
  userInfo: null,
  appConfig: {
    theme: 'light',
    language: 'zh-CN'
  }
}

// 在页面中使用
this.globalData.userInfo = { name: '张三', age: 20 }
console.log('用户信息:', this.globalData.userInfo)
```

### 使用globalData

UniApp提供了globalData配置项，用于存储全局数据：

```javascript
// App.vue
<script>
export default {
  globalData: {
    userInfo: null,
    appConfig: {
      theme: 'light',
      language: 'zh-CN'
    }
  },
  onLaunch: function() {
    // 初始化全局数据
    this.globalData.userInfo = uni.getStorageSync('userInfo')
  }
}
</script>

// 在页面中使用
const app = getApp()
app.globalData.userInfo = { name: '张三', age: 20 }
console.log('用户信息:', app.globalData.userInfo)
```

## Vuex状态管理

对于复杂的应用，推荐使用Vuex进行状态管理。Vuex是一个专为Vue.js应用程序开发的状态管理模式。

### 安装和配置Vuex

1. 安装Vuex

```bash
npm install vuex --save
```

2. 创建store目录和index.js文件

```javascript
// store/index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    count: 0
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    increment(state) {
      state.count++
    }
  },
  actions: {
    login({
      commit
    }, userInfo) {
      // 模拟登录请求
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('setUserInfo', userInfo)
          uni.setStorageSync('userInfo', userInfo)
          resolve(userInfo)
        }, 1000)
      })
    }
  },
  getters: {
    isLogin: state => {
      return !!state.userInfo
    },
    userRole: state => {
      return state.userInfo ? state.userInfo.role : ''
    }
  }
})
```

3. 在main.js中引入store

```javascript
// main.js
import Vue from 'vue'
import App from './App'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
```

### 7.2.2 使用Vuex

```vue
<template>
  <view class="container">
    <text v-if="isLogin">欢迎回来，{{userInfo.name}}</text>
    <button v-else @click="handleLogin">登录</button>
    <text>计数: {{count}}</text>
    <button @click="increment">增加</button>
  </view>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['userInfo', 'count']),
    ...mapGetters(['isLogin'])
  },
  methods: {
    ...mapMutations(['increment']),
    ...mapActions(['login']),
    handleLogin() {
      this.login({
        name: '张三',
        age: 20,
        role: 'user'
      }).then(() => {
        uni.showToast({
          title: '登录成功',
          icon: 'success'
        })
      })
    }
  }
}
</script>
```

## 组件状态管理

### 页面级状态管理

每个页面组件内部可以通过data选项管理自身状态：

```vue
<template>
  <view>
    <text>{{message}}</text>
    <button @click="updateMessage">更新消息</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello World'
    }
  },
  methods: {
    updateMessage() {
      this.message = 'Updated Message'
    }
  }
}
</script>
```

### 组件间状态共享

对于需要在多个组件间共享的状态，可以使用以下方式：

1. **通过props和$emit进行父子组件通信**（详见4.3.1节）
2. **使用事件总线**
3. **使用Vuex**（详见7.2节）

#### 事件总线

```javascript
// main.js
Vue.prototype.$bus = new Vue()

// 发送事件
this.$bus.$emit('event-name', data)

// 监听事件
this.$bus.$on('event-name', (data) => {
  console.log('接收到事件:', data)
})

// 移除事件监听
this.$bus.$off('event-name')
```