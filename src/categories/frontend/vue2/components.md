# Vue 2 组件开发

组件是Vue.js最强大的功能之一。组件可以扩展HTML元素，封装可重用的代码。

## 基本示例

```javascript
// 定义一个名为 button-counter 的新组件
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
```

## 组件注册

### 全局注册

```javascript
// 全局注册
Vue.component('my-component', {
  // 选项
})
```

### 局部注册

```javascript
var Child = {
  template: '<div>A custom component!</div>'
}

new Vue({
  // ...
  components: {
    // <my-component> 将只在父组件模板中可用
    'my-component': Child
  }
})
```

## Props

Props是你可以在组件上注册的一些自定义特性。当一个值传递给一个prop特性时，它就变成了那个组件实例的一个属性。

```javascript
Vue.component('blog-post', {
  // 声明 props
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})
```

使用时：

```html
<blog-post title="My journey with Vue"></blog-post>
```

## 自定义事件

组件可以用`v-on`监听子组件触发的事件。

```javascript
Vue.component('button-counter', {
  template: '<button v-on:click="incrementCounter">{{ counter }}</button>',
  data: function () {
    return {
      counter: 0
    }
  },
  methods: {
    incrementCounter: function () {
      this.counter += 1
      this.$emit('increment')
    }
  }
})
```

使用时：

```html
<div id="counter-event-example">
  <p>Total clicks: {{ totalClicks }}</p>
  <button-counter v-on:increment="incrementTotal"></button-counter>
  <button-counter v-on:increment="incrementTotal"></button-counter>
</div>

<script>
new Vue({
  el: '#counter-event-example',
  data: {
    totalClicks: 0
  },
  methods: {
    incrementTotal: function () {
      this.totalClicks += 1
    }
  }
})
</script>
```

## 插槽

插槽允许你在组件内嵌入内容。

```javascript
Vue.component('alert-box', {
  template: `
    <div class="demo-alert-box">
      <strong>Error!</strong>
      <slot></slot>
    </div>
  `
})
```

使用时：

```html
<alert-box>
  Something bad happened.
</alert-box>
```