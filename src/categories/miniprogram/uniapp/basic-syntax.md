# UniApp基础语法精讲

## Vue文件结构

UniApp使用Vue单文件组件格式，每个页面由template、script和style组成：

```vue
<!-- index.vue -->
<template>
  <view class="container">
    <text class="title">{{title}}</text>
    <button type="primary" @click="onTap">点击我</button>
    <image src="/static/logo.png" mode="aspectFit"></image>
    <view v-for="item in items" :key="item.id">
      <text>{{item.name}}</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello UniApp',
      items: [
        { id: 1, name: 'item 1' },
        { id: 2, name: 'item 2' }
      ]
    }
  },

  onLoad() {
    // 页面加载时执行
    console.log('页面加载完成')
  },

  methods: {
    onTap() {
      // 按钮点击事件
      uni.showToast({
        title: '按钮被点击了',
        icon: 'success'
      })
    }
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx;
}

.title {
  font-size: 36rpx;
  color: #333;
  margin-bottom: 20rpx;
}
</style>
```

## 基础语法

UniApp支持Vue的数据绑定语法，包括插值表达式、v-bind指令等：

```vue
<template>
  <view>
    <text>{{message}}</text>  <!-- 插值表达式 -->
    <input v-model="inputValue" placeholder="请输入内容" />  <!-- 双向绑定 -->
    <view :class="{'active': isActive}">动态类名</view>  <!-- 动态属性 -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello World',
      inputValue: '',
      isActive: true
    }
  }
}
</script>

<style>
.active {
  color: red;
}
</style>
```

## 事件处理

UniApp支持Vue的事件处理机制，使用`@`符号绑定事件：

```vue
<template>
  <view>
    <button @click="handleClick">点击我</button>  <!-- 基本事件绑定 -->
    <button @tap="handleTap(123)">带参数的点击</button>  <!-- 带参数的事件 -->
    <input @input="handleInput" placeholder="输入内容" />  <!-- 输入事件 -->
  </view>
</template>

<script>
export default {
  methods: {
    handleClick() {
      console.log('按钮被点击了')
    },
    handleTap(param) {
      console.log('参数是:', param)
    },
    handleInput(e) {
      console.log('输入内容:', e.detail.value)
    }
  }
}
</script>
```

## 条件渲染和列表渲染

### 条件渲染

使用`v-if`、`v-else-if`和`v-else`进行条件渲染：

```vue
<template>
  <view>
    <view v-if="isShow">显示的内容</view>
    <view v-else>隐藏的内容</view>

    <view v-if="score >= 90">优秀</view>
    <view v-else-if="score >= 60">及格</view>
    <view v-else>不及格</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isShow: true,
      score: 85
    }
  }
}
</script>
```

### 列表渲染

使用`v-for`进行列表渲染：

```vue
<template>
  <view>
    <view v-for="(item, index) in items" :key="index" class="item">
      <text>{{index + 1}}. {{item.name}}</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { name: 'item 1' },
        { name: 'item 2' },
        { name: 'item 3' }
      ]
    }
  }
}
</script>

<style>
.item {
  padding: 10rpx 0;
  border-bottom: 1rpx solid #eee;
}
</style>
```

## 生命周期函数

UniApp提供了丰富的生命周期函数，包括应用生命周期和页面生命周期：

### 应用生命周期

在App.vue中定义：

```vue
<script>
export default {
  onLaunch: function() {
    // 应用初始化完成时触发
    console.log('App Launch')
  },
  onShow: function() {
    // 应用显示时触发
    console.log('App Show')
  },
  onHide: function() {
    // 应用隐藏时触发
    console.log('App Hide')
  },
  onError: function(error) {
    // 应用错误时触发
    console.error('App Error:', error)
  }
}
</script>
```

### 页面生命周期

在页面组件中定义：

```vue
<script>
export default {
  onLoad: function(options) {
    // 页面加载时触发
    console.log('Page Load', options)
  },
  onShow: function() {
    // 页面显示时触发
    console.log('Page Show')
  },
  onReady: function() {
    // 页面初次渲染完成时触发
    console.log('Page Ready')
  },
  onHide: function() {
    // 页面隐藏时触发
    console.log('Page Hide')
  },
  onUnload: function() {
    // 页面卸载时触发
    console.log('Page Unload')
  }
}
</script>
```