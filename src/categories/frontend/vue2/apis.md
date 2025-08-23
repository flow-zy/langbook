# Vue 2 常用API

本章介绍Vue 2中常用的API，包括全局API、实例属性和方法、指令等。

## 全局API

### Vue.extend

创建一个Vue子类。参数是一个包含组件选项的对象。

```javascript
var Profile = Vue.extend({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data: function() {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
})
// 创建Profile实例，并挂载到一个元素上
new Profile().$mount('#app')
```

### Vue.component

注册或获取全局组件。注册后可在任何Vue实例中使用。

```javascript
// 注册组件，传入一个扩展过的构造器
Vue.component('my-component', Vue.extend({
  /* ... */
}))

// 注册组件，传入一个选项对象 (自动调用Vue.extend)
Vue.component('my-component', {
  /* ... */
})

// 获取注册的组件 (始终返回构造器)
var MyComponent = Vue.component('my-component')
```

### Vue.directive

注册或获取全局指令。

```javascript
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到DOM中时...
  inserted: function(el) {
    // 聚焦元素
    el.focus()
  }
})
```

### Vue.filter

注册或获取全局过滤器。

```javascript
// 注册
Vue.filter('capitalize', function(value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

// 使用
// {{ message | capitalize }}
```

## 实例属性和方法

### 数据属性

- `vm.$data`: Vue实例的数据对象
- `vm.$props`: 组件接收的props对象
- `vm.$el`: Vue实例使用的根DOM元素
- `vm.$options`: 用于当前Vue实例的初始化选项

### 方法

- `vm.$mount()`: 手动挂载Vue实例
- `vm.$destroy()`: 完全销毁一个实例
- `vm.$nextTick()`: 在下次DOM更新循环结束后执行延迟回调
- `vm.$set()`: 向响应式对象中添加一个属性，并确保这个新属性同样是响应式的
- `vm.$delete()`: 删除对象的属性

### 事件方法

- `vm.$on()`: 监听当前实例上的自定义事件
- `vm.$once()`: 监听一个自定义事件，但是只触发一次
- `vm.$off()`: 移除自定义事件监听器
- `vm.$emit()`: 触发当前实例上的事件

## 指令

### 内置指令

- `v-text`: 更新元素的文本内容
- `v-html`: 更新元素的innerHTML
- `v-show`: 根据表达式的值的真假，切换元素的display CSS属性
- `v-if`: 根据表达式的值的真假条件渲染元素
- `v-else-if`: 前一兄弟元素必须有v-if或v-else-if
- `v-else`: 前一兄弟元素必须有v-if或v-else-if
- `v-for`: 基于源数据多次渲染元素或模板块
- `v-on`: 绑定事件监听器
- `v-bind`: 动态地绑定一个或多个特性，或一个组件 prop 到表达式
- `v-model`: 在表单控件或者组件上创建双向数据绑定
- `v-pre`: 跳过这个元素和它的子元素的编译过程
- `v-cloak`: 这个指令保持在元素上直到关联实例结束编译
- `v-once`: 只渲染元素和组件一次

### 自定义指令

除了内置指令，Vue还允许注册自定义指令。

```javascript
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到DOM中时...
  inserted: function(el) {
    // 聚焦元素
    el.focus()
  }
})
```

使用时：

```html
<input v-focus>
```