# UniApp实战案例

本章将通过几个实战案例，帮助你掌握UniApp的实际应用技巧。

## 页面跳转与参数传递

### 案例实现

```vue
<!-- 首页 pages/index/index.vue -->
<template>
  <view class="container">
    <text class="title">商品列表</text>
    <view class="goods-list">
      <view class="goods-item" v-for="item in goodsList" :key="item.id" @click="navigateToDetail(item.id)">
        <image :src="item.image" class="goods-image"></image>
        <view class="goods-info">
          <text class="goods-name">{{item.name}}</text>
          <text class="goods-price">¥{{item.price}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      goodsList: [
        {
          id: 1,
          name: '商品1',
          price: 99.9,
          image: '/static/images/goods1.jpg'
        },
        {
          id: 2,
          name: '商品2',
          price: 199.9,
          image: '/static/images/goods2.jpg'
        }
      ]
    }
  },
  methods: {
    navigateToDetail(id) {
      uni.navigateTo({
        url: '/pages/detail/detail?id=' + id
      })
    }
  }
}
</script>

<style>
.container { padding: 20rpx; }
.title { font-size: 36rpx; font-weight: bold; margin-bottom: 20rpx; }
.goods-list { display: flex; flex-direction: column; }
.goods-item { display: flex; padding: 20rpx; border-bottom: 1rpx solid #eee; }
.goods-image { width: 160rpx; height: 160rpx; margin-right: 20rpx; }
.goods-info { flex: 1; }
.goods-name { font-size: 32rpx; margin-bottom: 10rpx; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.goods-price { font-size: 32rpx; color: #ff4400; }
</style>
```

```vue
<!-- 详情页 pages/detail/detail.vue -->
<template>
  <view class="container">
    <image :src="goodsDetail.image" class="goods-image"></image>
    <view class="goods-info">
      <text class="goods-name">{{goodsDetail.name}}</text>
      <text class="goods-price">¥{{goodsDetail.price}}</text>
      <text class="goods-desc">{{goodsDetail.description}}</text>
    </view>
    <button class="buy-button" type="primary" @click="addToCart">加入购物车</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      goodsDetail: {
        id: '',
        name: '',
        price: 0,
        image: '',
        description: ''
      }
    }
  },
  onLoad(options) {
    // 获取商品ID
    const { id } = options
    // 模拟请求商品详情
    this.getGoodsDetail(id)
  },
  methods: {
    getGoodsDetail(id) {
      // 模拟API请求
      setTimeout(() => {
        const goodsData = {
          1: {
            id: 1,
            name: '商品1',
            price: 99.9,
            image: '/static/images/goods1.jpg',
            description: '这是商品1的详细描述，包含商品的特点、规格、使用方法等信息。'
          },
          2: {
            id: 2,
            name: '商品2',
            price: 199.9,
            image: '/static/images/goods2.jpg',
            description: '这是商品2的详细描述，包含商品的特点、规格、使用方法等信息。'
          }
        }
        this.goodsDetail = goodsData[id]
      }, 500)
    },
    addToCart() {
      uni.showToast({
        title: '加入购物车成功',
        icon: 'success'
      })
    }
  }
}
</script>

<style>
.container { padding: 20rpx; }
.goods-image { width: 100%; height: 400rpx; }
.goods-info { padding: 20rpx 0; }
.goods-name { font-size: 36rpx; font-weight: bold; margin-bottom: 20rpx; }
.goods-price { font-size: 36rpx; color: #ff4400; margin-bottom: 20rpx; }
.goods-desc { font-size: 32rpx; color: #666; line-height: 48rpx; }
.buy-button { margin-top: 40rpx; }
</style>
```

## 列表数据展示与分页加载

### 案例实现

```vue
<template>
  <view class="container">
    <text class="title">商品列表</text>
    <view class="goods-list">
      <view class="goods-item" v-for="item in goodsList" :key="item.id">
        <image :src="item.image" class="goods-image"></image>
        <view class="goods-info">
          <text class="goods-name">{{item.name}}</text>
          <text class="goods-price">¥{{item.price}}</text>
        </view>
      </view>
    </view>
    <view class="loading" v-if="loading">加载中...</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      goodsList: [],
      page: 1,
      size: 10,
      hasMore: true,
      loading: false
    }
  },
  onLoad() {
    this.loadGoodsList()
  },
  onReachBottom() {
    if (this.hasMore && !this.loading) {
      this.loadGoodsList()
    }
  },
  methods: {
    loadGoodsList() {
      this.loading = true
      // 模拟API请求
      setTimeout(() => {
        const newList = []
        for (let i = 0; i < this.size; i++) {
          const id = (this.page - 1) * this.size + i + 1
          newList.push({
            id: id,
            name: '商品' + id,
            price: Math.floor(Math.random() * 1000) / 10,
            image: '/static/images/goods' + (id % 2 + 1) + '.jpg'
          })
        }
        this.goodsList = this.page === 1 ? newList : [...this.goodsList, ...newList]
        this.hasMore = newList.length === this.size
        this.page++
        this.loading = false
      }, 1000)
    }
  }
}
</script>

<style>
.container { padding: 20rpx; }
.title { font-size: 36rpx; font-weight: bold; margin-bottom: 20rpx; }
.goods-list { display: flex; flex-direction: column; }
.goods-item { display: flex; padding: 20rpx; border-bottom: 1rpx solid #eee; }
.goods-image { width: 160rpx; height: 160rpx; margin-right: 20rpx; }
.goods-info { flex: 1; }
.goods-name { font-size: 32rpx; margin-bottom: 10rpx; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.goods-price { font-size: 32rpx; color: #ff4400; }
.loading { text-align: center; padding: 20rpx; color: #999; }
</style>
```

## 用户登录与状态管理

### 案例实现

```vue
<!-- 登录页 pages/login/login.vue -->
<template>
  <view class="container">
    <view class="logo-container">
      <image src="/static/logo.png" class="logo"></image>
    </view>
    <view class="form-container">
      <view class="input-item">
        <text class="label">用户名</text>
        <input v-model="username" placeholder="请输入用户名"></input>
      </view>
      <view class="input-item">
        <text class="label">密码</text>
        <input v-model="password" type="password" placeholder="请输入密码"></input>
      </view>
      <button class="login-button" type="primary" @click="login">登录</button>
    </view>
  </view>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['login']),
    handleLogin() {
      if (!this.username || !this.password) {
        uni.showToast({
          title: '请输入用户名和密码',
          icon: 'none'
        })
        return
      }
      this.login({
        username: this.username,
        password: this.password
      }).then(() => {
        uni.showToast({
          title: '登录成功',
          icon: 'success'
        })
        setTimeout(() => {
          uni.switchTab({
            url: '/pages/index/index'
          })
        }, 1500)
      }).catch(err => {
        uni.showToast({
          title: err.message || '登录失败',
          icon: 'none'
        })
      })
    }
  }
}
</script>

<style>
.container { display: flex; flex-direction: column; align-items: center; padding: 40rpx; }
.logo-container { margin: 60rpx 0; }
.logo { width: 160rpx; height: 160rpx; }
.form-container { width: 100%; }
.input-item { margin-bottom: 30rpx; }
.label { display: block; font-size: 28rpx; color: #666; margin-bottom: 10rpx; }
input { width: 100%; height: 80rpx; border: 1rpx solid #ddd; border-radius: 8rpx; padding: 0 20rpx; box-sizing: border-box; }
.login-button { margin-top: 40rpx; }
</style>
```

```javascript
// store/index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    login({
      commit
    }, { username, password }) {
      return new Promise((resolve, reject) => {
        // 模拟登录API请求
        setTimeout(() => {
          if (username === 'admin' && password === '123456') {
            const userInfo = {
              id: 1,
              username: 'admin',
              name: '管理员',
              avatar: '/static/avatar.png'
            }
            commit('setUserInfo', userInfo)
            uni.setStorageSync('userInfo', userInfo)
            resolve(userInfo)
          } else {
            reject(new Error('用户名或密码错误'))
          }
        }, 1000)
      })
    },
    logout({
      commit
    }) {
      commit('setUserInfo', null)
      uni.removeStorageSync('userInfo')
    }
  },
  getters: {
    isLogin: state => {
      return !!state.userInfo
    }
  }
})
```