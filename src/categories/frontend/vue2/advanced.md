# Vue 2 高级特性

本章介绍Vue 2的一些高级特性，包括混入、插件、过渡动画等。

## 混入 (Mixins)

混入是一种分发Vue组件中可复用功能的非常灵活的方式。混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。

```javascript
// 定义一个混入对象
var myMixin = {
  created: function() {
    this.hello()
  },
  methods: {
    hello: function() {
      console.log('hello from mixin!')
    }
  }
}

// 定义一个使用混入对象的组件
var Component = Vue.extend({
  mixins: [myMixin]
})

var component = new Component() // => "hello from mixin!"
```

## 插件

插件通常用来为Vue添加全局功能。插件的功能范围没有严格限制，一般有下面几种：

1. 添加全局方法或者属性
2. 添加全局资源：指令/过滤器/过渡等
3. 通过全局混入来添加一些组件选项
4. 添加Vue实例方法，通过把它们添加到Vue.prototype上实现
5. 一个库，提供自己的API，同时提供上面提到的一个或多个功能

```javascript
// 定义插件
MyPlugin.install = function(Vue, options) {
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function() {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
  })

  // 3. 注入组件选项
  Vue.mixin({
    created: function() {
      // 逻辑...
    }
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function(options) {
    // 逻辑...
  }
}

// 使用插件
Vue.use(MyPlugin)
```

## 过渡和动画

Vue提供了过渡系统，可以在元素从DOM中插入或移除时自动应用过渡效果。

### 单元素/组件的过渡

```html
<transition name="fade">
  <p v-if="show">hello</p>
</transition>
```

```css
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}
```

### 多个元素的过渡

```html
<transition-group name="list" tag="p">
  <span v-for="item in items" :key="item" class="list-item">
    {{ item }}
  </span>
</transition-group>
```

## 渲染函数

Vue推荐在绝大多数情况下使用模板来创建HTML。然而在一些场景中，你可能需要JavaScript的完全编程能力。这时你可以用渲染函数，它比模板更接近编译器。

```javascript
Vue.component('anchored-heading', {
  render: function(createElement) {
    return createElement(
      'h' + this.level,   // 标签名称
      this.$slots.default // 子节点数组
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
```

## 状态管理

对于大型应用，状态管理变得尤为重要。Vue提供了Vuex库来帮助管理应用状态。

```javascript
// 安装Vuex
// npm install vuex --save

// 引入Vuex
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 创建store
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  },
  getters: {
    getCount: state => {
      return state.count
    }
  }
})
```

## 路由

Vue Router是Vue官方的路由管理器。它和Vue.js的核心深度集成，让构建单页面应用变得易如反掌。

```javascript
// 安装Vue Router
// npm install vue-router --save

// 引入Vue Router
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 定义路由组件
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 定义路由
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

// 创建router实例
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

// 创建和挂载根实例
const app = new Vue({
  router
}).$mount('#app')
```