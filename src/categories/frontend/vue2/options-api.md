# Vue 2 选项式API

Vue 2使用选项式API（Options API）来组织组件代码。在选项式API中，我们通过定义组件的选项（如data、methods、computed等）来构建组件。

## 核心选项

### data

`data`选项用于声明组件的数据。它必须是一个函数，返回一个对象。

```javascript
new Vue({
  data: function() {
    return {
      message: 'Hello Vue!'
    }
  }
})
```

### methods

`methods`选项用于定义组件的方法。这些方法可以通过组件实例访问。

```javascript
new Vue({
  data: {
    count: 0
  },
  methods: {
    increment: function() {
      this.count++
    }
  }
})
```

### computed

`computed`选项用于定义计算属性。计算属性是基于它们的依赖进行缓存的，只有在相关依赖发生改变时才会重新求值。

```javascript
new Vue({
  data: {
    a: 1
  },
  computed: {
    aDouble: function() {
      return this.a * 2
    }
  }
})
```

### watch

`watch`选项用于观察和响应Vue实例上的数据变动。

```javascript
new Vue({
  data: {
    question: '',
    answer: 'I cannot give you an answer until you ask a question!'
  },
  watch: {
    question: function(newQuestion, oldQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      // 执行异步操作
    }
  }
})
```

## 生命周期选项

### beforeCreate

在实例初始化之后，数据观测 (data observation) 和 event/watcher 事件配置之前被调用。

### created

在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observation)，属性和方法的运算，watch/event 事件回调。

### beforeMount

在挂载开始之前被调用：相关的 `render` 函数首次被调用。

### mounted

el 被新创建的 `vm.$el` 替换，并挂载到实例上去之后调用该钩子。

### beforeUpdate

数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。

### updated

由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。

### beforeDestroy

实例销毁之前调用。在这一步，实例仍然完全可用。

### destroyed

Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

## 其他重要选项

### props

`props`选项用于声明组件的属性，允许父组件向子组件传递数据。

```javascript
Vue.component('child', {
  props: ['message'],
  template: '<div>{{ message }}</div>'
})
```

### components

`components`选项用于注册组件的局部组件。

```javascript
new Vue({
  components: {
    'child-component': {
      template: '<div>A child component</div>'
    }
  }
})
```

### directives

`directives`选项用于注册组件的局部指令。

```javascript
new Vue({
  directives: {
    focus: {
      // 指令的定义
      inserted: function(el) {
        el.focus()
      }
    }
  }
})
```