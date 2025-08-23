# 组件通信

本章将详细讲解原生小程序中组件之间的通信方式，包括父子组件通信、兄弟组件通信和跨层级组件通信。

## 组件通信

### 父子组件通信

父子组件通信是最常见的组件通信方式。

### 父组件向子组件传递数据

```javascript
// 父组件 index.js
Page({
  data: {
    parentData: '父组件数据'
  }
})
```

```html
<!-- 父组件 index.wxml -->
<child-component child-data="{{parentData}}"></child-component>
```

```javascript
// 子组件 child-component.js
Component({
  properties: {
    childData: {
      type: String,
      value: '默认值'
    }
  },

  observers: {
    'childData': function(newValue) {
      console.log('子组件接收父组件数据:', newValue)
    }
  }
})
```

### 子组件向父组件传递数据

```javascript
// 子组件 child-component.js
Component({
  methods: {
    sendDataToParent: function() {
      // 触发自定义事件
      this.triggerEvent('customevent', {
        data: '子组件数据'
      })
    }
  }
})
```

```html
<!-- 子组件 child-component.wxml -->
<button bindtap="sendDataToParent">向父组件发送数据</button>
```

```javascript
// 父组件 index.js
Page({
  onChildEvent: function(e) {
    console.log('父组件接收子组件数据:', e.detail.data)
  }
})
```

```html
<!-- 父组件 index.wxml -->
<child-component bind:customevent="onChildEvent"></child-component>
```

## 组件通信

### 兄弟组件通信

兄弟组件之间的通信可以通过父组件中转实现。

```javascript
// 父组件 index.js
Page({
  data: {
    sharedData: ''
  },

  onBrotherEvent: function(e) {
    // 接收兄弟组件1的数据
    this.setData({
      sharedData: e.detail.data
    })
  }
})
```

```html
<!-- 父组件 index.wxml -->
<brother-component1 bind:brotherevent="onBrotherEvent"></brother-component1>
<brother-component2 brother-data="{{sharedData}}"></brother-component2>
```

```javascript
// 兄弟组件1 brother-component1.js
Component({
  methods: {
    sendDataToBrother: function() {
      this.triggerEvent('brotherevent', {
        data: '兄弟组件1数据'
      })
    }
  }
})
```

```javascript
// 兄弟组件2 brother-component2.js
Component({
  properties: {
    brotherData: {
      type: String,
      value: ''
    }
  },

  observers: {
    'brotherData': function(newValue) {
      console.log('兄弟组件2接收数据:', newValue)
    }
  }
})
```

## 跨层级组件通信

跨层级组件通信可以通过全局事件总线或小程序的selectComponent方法实现。

### 使用全局事件总线

```javascript
// 工具类 utils/eventBus.js
class EventBus {
  constructor() {
    this.events = {}
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }
    this.events[eventName].push(callback)
  }

  emit(eventName, data) {
    const callbacks = this.events[eventName]
    if (callbacks && callbacks.length) {
      callbacks.forEach(callback => {
        callback(data)
      })
    }
  }

  off(eventName, callback) {
    const callbacks = this.events[eventName]
    if (callbacks && callbacks.length) {
      if (callback) {
        this.events[eventName] = callbacks.filter(cb => cb !== callback)
      } else {
        this.events[eventName] = []
      }
    }
  }
}

module.exports = new EventBus()
```

```javascript
// 组件A component-a.js
const eventBus = require('../../utils/eventBus')

Component({
  attached: function() {
    // 监听事件
    eventBus.on('customevent', this.handleEvent.bind(this))
  },

  detached: function() {
    // 移除事件监听
    eventBus.off('customevent', this.handleEvent)
  },

  methods: {
    handleEvent: function(data) {
      console.log('组件A接收数据:', data)
    }
  }
})
```

```javascript
// 组件B component-b.js
const eventBus = require('../../utils/eventBus')

Component({
  methods: {
    sendData: function() {
      // 触发事件
      eventBus.emit('customevent', {
        data: '组件B发送的数据'
      })
    }
  }
})
```

### 使用selectComponent方法

```javascript
// 父组件 index.js
Page({
  onLoad: function() {
    // 获取子组件实例
    const childComponent = this.selectComponent('.child-component')
    // 调用子组件方法
    childComponent.childMethod('父组件传递的数据')
  }
})
```

```javascript
// 子组件 child-component.js
Component({
  methods: {
    childMethod: function(data) {
      console.log('子组件接收数据:', data)
    }
  }
})
```

```html
<!-- 父组件 index.wxml -->
<child-component class="child-component"></child-component>
```