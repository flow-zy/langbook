# Vue 2 基本概念

本章介绍Vue 2的核心基本概念，包括Vue实例、数据绑定、指令、计算属性和监听器等。

## Vue 实例

每个Vue应用都是通过用`Vue`函数创建一个新的**Vue实例**开始的：

```javascript
var vm = new Vue({
  // 选项
})
```

### 数据与方法

当一个Vue实例被创建时，它将`data`对象中的所有的属性加入到Vue的响应式系统中。当这些属性的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。

```javascript
var data = { a: 1 }
var vm = new Vue({
  data: data
})
vm.a === data.a // true
// 设置属性也会影响到原始数据
avm.a = 2
data.a // 2
// ... 反之亦然
data.a = 3
vm.a // 3
```

## 模板语法

Vue使用基于HTML的模板语法，允许开发者声明式地将DOM绑定到底层Vue实例的数据。所有Vue模板都是合法的HTML，可以被遵循规范的浏览器和HTML解析器解析。

### 插值

#### 文本

数据绑定最常见的形式就是使用“Mustache”语法 (双大括号) 的文本插值：

```html
<span>Message: {{ msg }}</span>
```

#### HTML

双大括号会将数据解释为普通文本，而非HTML代码。为了输出真正的HTML，你需要使用`v-html`指令：

```html
<div v-html="rawHtml"></div>
```

## 指令

指令是带有`v-`前缀的特殊属性。指令属性的值预期是单个JavaScript表达式。指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于DOM。

### 常用指令

- `v-bind`: 动态地绑定一个或多个特性，或一个组件 prop 到表达式
- `v-if`: 根据表达式的值的真假条件渲染元素
- `v-for`: 基于源数据多次渲染元素或模板块
- `v-on`: 绑定事件监听器
- `v-model`: 在表单控件或者组件上创建双向数据绑定

## 计算属性和监听器

### 计算属性

计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值。

```javascript
var vm = new Vue({
  data: { a: 1 },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.a.split('').reverse().join('')
    }
  }
})
```

### 监听器

当你需要在数据变化时执行异步或开销较大的操作时，使用监听器更合适。

```javascript
var vm = new Vue({
  data: {
    question: '',
    answer: 'I cannot give you an answer until you ask a question!'
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    question: function (newQuestion, oldQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.getAnswer()
    }
  },
  methods: {
    getAnswer: function () {
      // ...
    }
  }
})
```