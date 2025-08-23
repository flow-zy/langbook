# 实战案例

本章将通过几个实战案例，帮助你巩固所学的原生小程序开发知识，包括页面跳转与参数传递、列表数据展示和表单提交。

## 页面跳转与参数传递示例

### 案例需求

创建两个页面，实现从首页跳转到详情页，并传递参数。

### 首页实现

```javascript
// pages/index/index.js
Page({
  data: {
    items: [
      { id: 1, name: '商品1', price: 100 },
      { id: 2, name: '商品2', price: 200 },
      { id: 3, name: '商品3', price: 300 }
    ]
  },

  navigateToDetail: function(e) {
    const id = e.currentTarget.dataset.id
    const name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}&name=${name}`
    })
  }
})
```

```html
<!-- pages/index/index.wxml -->
<view class="container">
  <view class="title">商品列表</view>
  <view class="item" wx:for="{{items}}" wx:key="id"
        data-id="{{item.id}}" data-name="{{item.name}}"
        bindtap="navigateToDetail">
    <text>{{item.name}} - ¥{{item.price}}</text>
  </view>
</view>
```

```css
/* pages/index/index.wxss */
.container {
  padding: 20rpx;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.item {
  padding: 20rpx;
  border-bottom: 1rpx solid #eee;
}
```

### 详情页实现

```javascript
// pages/detail/detail.js
Page({
  data: {
    id: '',
    name: ''
  },

  onLoad: function(options) {
    this.setData({
      id: options.id,
      name: options.name
    })
  },

  navigateBack: function() {
    wx.navigateBack()
  }
})
```

```html
<!-- pages/detail/detail.wxml -->
<view class="container">
  <view class="title">商品详情</view>
  <view class="info">
    <text>ID: {{id}}</text>
  </view>
  <view class="info">
    <text>名称: {{name}}</text>
  </view>
  <button bindtap="navigateBack">返回</button>
</view>
```

```css
/* pages/detail/detail.wxss */
.container {
  padding: 20rpx;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.info {
  margin-bottom: 20rpx;
}
```

## 列表数据展示示例

### 案例需求

创建一个页面，从服务器获取数据并展示为列表。

### 实现代码

```javascript
// pages/list/list.js
const request = require('../../utils/request')

Page({
  data: {
    list: [],
    loading: true,
    page: 1,
    hasMore: true
  },

  onLoad: function() {
    this.loadData()
  },

  loadData: function() {
    request.get('/api/list', { page: this.data.page, size: 10 })
      .then(res => {
        const newList = res.data.list || []
        this.setData({
          list: this.data.page === 1 ? newList : [...this.data.list, ...newList],
          loading: false,
          hasMore: newList.length === 10
        })
      })
      .catch(err => {
        console.error('加载数据失败:', err)
        this.setData({
          loading: false
        })
        wx.showToast({
          title: '加载数据失败',
          icon: 'none'
        })
      })
  },

  loadMore: function() {
    if (!this.data.hasMore || this.data.loading) {
      return
    }
    this.setData({
      page: this.data.page + 1,
      loading: true
    })
    this.loadData()
  }
})
```

```html
<!-- pages/list/list.wxml -->
<view class="container">
  <view class="title">数据列表</view>
  <view class="list">
    <view class="item" wx:for="{{list}}" wx:key="id">
      <text>{{item.title}}</text>
      <text class="time">{{item.time}}</text>
    </view>
  </view>
  <view class="loading" wx:if="{{loading}}">加载中...</view>
  <view class="load-more" wx:else wx:if="{{hasMore}}" bindtap="loadMore">加载更多</view>
  <view class="no-more" wx:else>没有更多数据了</view>
</view>
```

```css
/* pages/list/list.wxss */
.container {
  padding: 20rpx;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.item {
  padding: 20rpx;
  border-bottom: 1rpx solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.time {
  font-size: 28rpx;
  color: #999;
}

.loading,
.load-more,
.no-more {
  text-align: center;
  padding: 20rpx;
  color: #999;
}

.load-more {
  color: #1296db;
}
```

## 表单提交示例

### 案例需求

创建一个表单页面，收集用户信息并提交到服务器。

### 实现代码

```javascript
// pages/form/form.js
const request = require('../../utils/request')

Page({
  data: {
    formData: {
      name: '',
      age: '',
      gender: 'male',
      hobby: []
    },
    rules: {
      name: [{
        required: true,
        message: '请输入姓名'
      }],
      age: [{
        required: true,
        message: '请输入年龄'
      }, {
        type: 'number',
        message: '年龄必须是数字'
      }]
    }
  },

  inputChange: function(e) {
    const { field } = e.currentTarget.dataset
    const { value } = e.detail
    this.setData({
      [`formData.${field}`]: value
    })
  },

  radioChange: function(e) {
    this.setData({
      'formData.gender': e.detail.value
    })
  },

  checkboxChange: function(e) {
    this.setData({
      'formData.hobby': e.detail.value
    })
  },

  submitForm: function() {
    // 表单验证
    let valid = true
    for (const key in this.data.rules) {
      const rules = this.data.rules[key]
      for (const rule of rules) {
        if (rule.required && !this.data.formData[key]) {
          wx.showToast({
            title: rule.message,
            icon: 'none'
          })
          valid = false
          break
        }
        if (rule.type === 'number' && isNaN(Number(this.data.formData[key]))) {
          wx.showToast({
            title: rule.message,
            icon: 'none'
          })
          valid = false
          break
        }
      }
      if (!valid) break
    }

    if (!valid) return

    // 提交表单
    wx.showLoading({
      title: '提交中...'
    })

    request.post('/api/submit', this.data.formData)
      .then(res => {
        wx.hideLoading()
        wx.showToast({
          title: '提交成功'
        })
      })
      .catch(err => {
        wx.hideLoading()
        wx.showToast({
          title: '提交失败',
          icon: 'none'
        })
      })
  }
})
```

```html
<!-- pages/form/form.wxml -->
<view class="container">
  <view class="title">用户信息表单</view>
  <view class="form-item">
    <text class="label">姓名</text>
    <input class="input" placeholder="请输入姓名" data-field="name" bindinput="inputChange"></input>
  </view>
  <view class="form-item">
    <text class="label">年龄</text>
    <input class="input" type="number" placeholder="请输入年龄" data-field="age" bindinput="inputChange"></input>
  </view>
  <view class="form-item">
    <text class="label">性别</text>
    <radio-group bindchange="radioChange">
      <label><radio value="male" checked="true"></radio>男</label>
      <label><radio value="female"></radio>女</label>
    </radio-group>
  </view>
  <view class="form-item">
    <text class="label">爱好</text>
    <checkbox-group bindchange="checkboxChange">
      <label><checkbox value="reading"></checkbox>阅读</label>
      <label><checkbox value="sports"></checkbox>运动</label>
      <label><checkbox value="music"></checkbox>音乐</label>
    </checkbox-group>
  </view>
  <button class="submit-btn" type="primary" bindtap="submitForm">提交</button>
</view>
```

```css
/* pages/form/form.wxss */
.container {
  padding: 20rpx;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.form-item {
  margin-bottom: 30rpx;
}

.label {
  display: block;
  margin-bottom: 10rpx;
  font-size: 28rpx;
}

.input {
  width: 100%;
  height: 80rpx;
  border: 1rpx solid #eee;
  border-radius: 8rpx;
  padding: 0 20rpx;
  box-sizing: border-box;
}

.submit-btn {
  margin-top: 40rpx;
}
```