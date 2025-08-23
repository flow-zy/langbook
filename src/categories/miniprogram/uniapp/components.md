# UniApp组件使用

## 内置组件

UniApp提供了丰富的内置组件，涵盖了视图容器、基础内容、表单、媒体等多个类别。以下是一些常用的内置组件：

### 视图容器组件

```vue
<template>
  <view class="container">
    <!-- view组件：基础视图容器 -->
    <view class="box">基础视图</view>

    <!-- scroll-view组件：可滚动视图容器 -->
    <scroll-view scroll-y class="scroll-view">
      <view class="item" v-for="i in 20" :key="i">{{i}}</view>
    </scroll-view>

    <!-- swiper组件：轮播图 -->
    <swiper class="swiper" indicator-dots circular autoplay interval="3000">
      <swiper-item><view class="slide">页面1</view></swiper-item>
      <swiper-item><view class="slide">页面2</view></swiper-item>
      <swiper-item><view class="slide">页面3</view></swiper-item>
    </swiper>
  </view>
</template>

<style>
.container { padding: 20rpx; }
.box { width: 100%; height: 200rpx; background: #f0f0f0; display: flex; align-items: center; justify-content: center; }
.scroll-view { width: 100%; height: 300rpx; background: #f5f5f5; margin-top: 20rpx; }
.item { height: 50rpx; line-height: 50rpx; text-align: center; border-bottom: 1rpx solid #eee; }
.swiper { width: 100%; height: 300rpx; margin-top: 20rpx; }
.slide { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #fff; }
.swiper-item:nth-child(1) .slide { background: #007aff; }
.swiper-item:nth-child(2) .slide { background: #4cd964; }
.swiper-item:nth-child(3) .slide { background: #ff9500; }
</style>
```

### 基础内容组件

```vue
<template>
  <view class="container">
    <!-- text组件：文本 -->
    <text class="text">这是一段文本内容</text>

    <!-- icon组件：图标 -->
    <icon type="success" size="20"></icon>

    <!-- progress组件：进度条 -->
    <progress percent="50" stroke-width="4"></progress>
  </view>
</template>

<style>
.container { padding: 20rpx; }
.text { font-size: 32rpx; color: #333; }
icon { margin: 20rpx 0; }
progress { width: 100%; margin-top: 20rpx; }
</style>
```

### 表单组件

```vue
<template>
  <view class="container">
    <!-- button组件：按钮 -->
    <button type="primary" @click="handleClick">主要按钮</button>
    <button type="default">默认按钮</button>
    <button type="warn">警告按钮</button>

    <!-- input组件：输入框 -->
    <input placeholder="请输入内容" v-model="inputValue"></input>

    <!-- checkbox组件：复选框 -->
    <checkbox-group @change="handleCheckboxChange">
      <label><checkbox value="option1">选项1</checkbox></label>
      <label><checkbox value="option2">选项2</checkbox></label>
    </checkbox-group>
  </view>
</template>

<script>
export default {
  data() {
    return {
      inputValue: '',
      checkedValues: []
    }
  },
  methods: {
    handleClick() {
      console.log('按钮被点击')
    },
    handleCheckboxChange(e) {
      this.checkedValues = e.detail.value
      console.log('选中的值:', this.checkedValues)
    }
  }
}
</script>

<style>
.container { padding: 20rpx; }
button { margin: 10rpx 0; }
input { border: 1rpx solid #ddd; padding: 20rpx; margin: 20rpx 0; }
label { display: block; margin: 10rpx 0; }
</style>
```

## 自定义组件

在UniApp中，你可以创建自定义组件来复用代码。以下是创建和使用自定义组件的步骤：

### 创建自定义组件

1. 在components目录下创建组件文件（如my-component.vue）

```vue
<!-- components/my-component.vue -->
<template>
  <view class="my-component">
    <text>{{title}}</text>
    <button @click="handleClick">点击我</button>
  </view>
</template>

<script>
export default {
  name: 'my-component',
  props: {
    title: {
      type: String,
      default: '默认标题'
    }
  },
  methods: {
    handleClick() {
      this.$emit('custom-event', '组件被点击了')
    }
  }
}
</script>

<style>
.my-component {
  padding: 20rpx;
  background: #f0f0f0;
  border-radius: 10rpx;
}
</style>
```

### 使用自定义组件

在页面中引入并使用自定义组件：

```vue
<template>
  <view class="container">
    <my-component title="自定义组件" @custom-event="handleCustomEvent"></my-component>
  </view>
</template>

<script>
import myComponent from '../../components/my-component.vue'

export default {
  components: {
    myComponent
  },
  methods: {
    handleCustomEvent(data) {
      console.log('接收到组件事件:', data)
    }
  }
}
</script>
```

## 组件通信

组件通信是UniApp开发中的重要部分，以下是几种常见的组件通信方式：

### 父子组件通信

- 父组件通过props向子组件传递数据
- 子组件通过$emit触发事件，父组件监听事件获取数据

```vue
<!-- 父组件 -->
<template>
  <view>
    <child-component :message="parentMessage" @child-event="handleChildEvent"></child-component>
  </view>
</template>

<script>
import childComponent from './child-component.vue'

export default {
  components: {
    childComponent
  },
  data() {
    return {
      parentMessage: '来自父组件的消息'
    }
  },
  methods: {
    handleChildEvent(data) {
      console.log('接收到子组件消息:', data)
    }
  }
}
</script>
```

```vue
<!-- 子组件 -->
<template>
  <view>
    <text>{{message}}</text>
    <button @click="sendMessage">发送消息给父组件</button>
  </view>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: ''
    }
  },
  methods: {
    sendMessage() {
      this.$emit('child-event', '来自子组件的消息')
    }
  }
}
</script>
```