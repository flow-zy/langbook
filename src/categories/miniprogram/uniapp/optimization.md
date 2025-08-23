# UniApp性能优化

性能优化是UniApp开发中的重要环节，良好的性能可以提升用户体验。本章将介绍UniApp中的性能优化技巧。

## 页面加载优化

### 分包加载

分包加载可以减小主包体积，提高首页加载速度：

```json
// pages.json
{
  "pages": [
    "pages/index/index",
    "pages/login/login"
  ],
  "subpackages": [
    {
      "root": "pages/user",
      "pages": [
        "profile/index",
        "settings/index"
      ]
    },
    {
      "root": "pages/goods",
      "pages": [
        "list/index",
        "detail/index"
      ]
    }
  ]
}
```

### 预加载页面

对于需要频繁访问的页面，可以进行预加载：

```javascript
// 在app.json或页面json中配置
{
  "preloadRule": {
    "pages/index/index": {
      "network": "all",
      "packages": ["pages/user"]
    }
  }
}
```

### 图片懒加载

图片懒加载可以减少首次加载的资源量：

```vue
<template>
  <view>
    <image v-for="item in imageList" :key="item.id" :src="item.src" lazy-load></image>
  </view>
</template>
```

## 渲染优化

### 使用虚拟列表

对于长列表，使用虚拟列表可以减少DOM节点数量：

```vue
<template>
  <view>
    <virtual-list
      :height="400"
      :item-height="50"
      :items="listData"
      :item-key="'id'"
    >
      <template v-slot:item="{ item }">
        <view class="list-item">{{ item.content }}</view>
      </template>
    </virtual-list>
  </view>
</template>

<script>
import virtualList from '@/components/virtual-list/virtual-list.vue'

export default {
  components: {
    virtualList
  },
  data() {
    return {
      listData: []
    }
  },
  onLoad() {
    // 生成测试数据
    for (let i = 0; i < 10000; i++) {
      this.listData.push({
        id: i,
        content: '列表项 ' + i
      })
    }
  }
}
</script>
```

### 减少不必要的渲染

使用v-show代替v-if，避免频繁创建和销毁DOM元素：

```vue
<template>
  <view>
    <view v-show="isShow">频繁切换的内容</view>
    <view v-if="isVisible">不频繁切换的内容</view>
  </view>
</template>
```

### 合理使用缓存

使用缓存减少重复计算和请求：

```javascript
// 缓存计算结果
computed: {
  filteredList() {
    if (this.cacheKey === this.searchKey) {
      return this.cacheResult
    }
    const result = this.list.filter(item => item.includes(this.searchKey))
    this.cacheKey = this.searchKey
    this.cacheResult = result
    return result
  }
}
```

## 网络优化

### 数据缓存

对不常变动的数据进行缓存：

```javascript
// 优先从缓存读取数据
const cachedData = uni.getStorageSync('cachedData')
if (cachedData && Date.now() - cachedData.timestamp < 3600000) {
  // 使用缓存数据
  this.dataList = cachedData.data
} else {
  // 发起网络请求
  uni.request({
    url: 'https://example.com/api/data',
    success: res => {
      this.dataList = res.data
      // 缓存数据
      uni.setStorageSync('cachedData', {
        data: res.data,
        timestamp: Date.now()
      })
    }
  })
}
```

### 数据缓存

优化图片大小和格式：

1. 使用适当大小的图片，避免大图小用
2. 使用WebP、AVIF等高效图片格式
3. 图片压缩
4. 使用CDN加速

### 批量请求

合并多个请求，减少网络请求次数：

```javascript
// 批量获取数据
function batchGetData(ids) {
  return uni.request({
    url: 'https://example.com/api/batch',
    method: 'POST',
    data: {
      ids: ids
    }
  })
}
```

## 代码优化

### 减少不必要的代码

1. 移除无用的代码和注释
2. 合并重复的代码
3. 使用工具进行代码压缩

### 异步加载

对于非首屏必要的代码，使用异步加载：

```javascript
// 异步加载组件
const lazyComponent = () => import('@/components/lazy-component.vue')

export default {
  components: {
    lazyComponent
  }
}
```

### 合理使用组件

1. 拆分大型组件为小型组件
2. 复用组件减少代码量
3. 避免过度组件化

## 小程序特定优化

### 减少setData调用

setData会触发页面重绘，应减少调用次数：

```javascript
// 不推荐
this.setData({ a: 1 })
this.setData({ b: 2 })

// 推荐
this.setData({
  a: 1,
  b: 2
})
```

### 避免在onPageScroll中频繁setData

```javascript
onPageScroll(e) {
  // 防抖处理
  if (this.scrollTimer) clearTimeout(this.scrollTimer)
  this.scrollTimer = setTimeout(() => {
    this.setData({
      scrollTop: e.scrollTop
    })
  }, 100)
}
```

### 使用自定义组件

自定义组件的更新不会影响页面其他部分：

```vue
<!-- 自定义组件 -->
<template>
  <view>{{count}}</view>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}
</script>
```