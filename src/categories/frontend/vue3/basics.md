# Vue 3 基础篇

## Vue 3的基本概念

Vue 3是一个用于构建用户界面的渐进式框架，由尤雨溪及其团队开发。它的核心特点是：

- **渐进式**：你可以根据需求逐步采用其功能，而不必一次性全部掌握
- **声明式**：使用基于HTML的模板语法，描述UI应该是什么样子，而不是如何实现
- **响应式**：数据变化时，UI会自动更新
- **组件化**：将UI拆分为独立、可复用的组件

与传统的JavaScript框架不同，Vue采用了声明式的模板语法，使开发者能够更专注于UI的结构和交互逻辑，而不是手动操作DOM。这极大地提高了开发效率和代码可维护性。

## 创建Vue应用

在Vue 3中，我们使用`createApp`函数来创建一个新的Vue应用实例。这是Vue 3与Vue 2的主要区别之一，Vue 2使用的是`new Vue()`。

### 基本用法

```javascript
import { createApp } from 'vue'
import App from './App.vue'

// 创建应用实例
const app = createApp(App)

// 挂载应用到DOM元素
app.mount('#app')
```

这段代码做了以下几件事：
1. 从vue包中导入`createApp`函数
2. 导入根组件`App.vue`
3. 使用`createApp`函数创建应用实例，参数是根组件
4. 使用`mount`方法将应用挂载到DOM元素上（这里是id为'app'的元素）

### 应用配置

创建应用实例后，我们可以对其进行各种配置：

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/main.css'

const app = createApp(App)

// 配置路由
app.use(router)

// 配置状态管理
app.use(store)

// 全局注册组件
app.component('MyComponent', MyComponent)

// 全局自定义指令
app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})

// 全局属性
app.config.globalProperties.$api = axios

// 挂载应用
app.mount('#app')
```

### 链式调用

配置方法可以链式调用，使代码更加简洁：

```javascript
createApp(App)
  .use(router)
  .use(store)
  .component('MyComponent', MyComponent)
  .directive('focus', {
    mounted(el) {
      el.focus()
    }
  })
  .mount('#app')
```

### 挂载选项

`mount`方法可以接受一个选项对象，用于配置挂载行为：

```javascript
app.mount('#app', {
  // 是否替换挂载元素
  replace: true,
  // 传递给根组件的props
  props: {
    title: 'My App'
  }
})
```

### 卸载应用

如果需要卸载应用，可以使用`unmount`方法：

```javascript
const app = createApp(App).mount('#app')

// 稍后卸载应用
setTimeout(() => {
  app.unmount()
}, 5000)

```

创建Vue应用是使用Vue 3的第一步，它为我们提供了一个配置和管理应用的入口点。在实际项目中，我们通常会在这里配置路由、状态管理、全局组件等。

## 模板语法

Vue使用基于HTML的模板语法，允许开发者声明式地将DOM绑定到底层组件实例的数据。模板语法结合了HTML的简洁性和Vue的响应式特性，使UI构建变得简单直观。

### 插值表达式

最基本的数据绑定形式是使用"Mustache"语法（双大括号）：

```vue
<template>
  <p>{{ message }}</p>
  <p>{{ count + 1 }}</p>
  <p>{{ isActive ? 'Active' : 'Inactive' }}</p>
  <p>{{ message.toUpperCase() }}</p>
</template>

<script setup>
import { ref } from 'vue'
const message = ref('Hello Vue 3!')
const count = ref(0)
const isActive = ref(true)
</script>
```

插值表达式中可以包含：
- 简单的属性访问
- 算术运算
- 三元表达式
- 方法调用
- 其他有效的JavaScript表达式

### 指令

指令是带有`v-`前缀的特殊属性，用于在DOM上应用特殊的响应式行为。Vue提供了多种内置指令，满足不同的需求。

#### v-bind

用于动态绑定HTML属性：

```vue
<template>
  <img v-bind:src="imageUrl" alt="Vue logo">
  <a v-bind:href="linkUrl">Vue官网</a>
  <div v-bind:class="className"></div>
  <div v-bind:style="styleObject"></div>
  
  <!-- 简写形式 -->
  <img :src="imageUrl" alt="Vue logo">
  <a :href="linkUrl">Vue官网</a>
</template>

<script setup>
import { ref, reactive } from 'vue'
const imageUrl = ref('https://vuejs.org/images/logo.png')
const linkUrl = ref('https://vuejs.org/')
const className = ref('container')
const styleObject = reactive({
  color: 'red',
  fontSize: '16px'
})
</script>
```

#### v-on

用于监听DOM事件：

```vue
<template>
  <button v-on:click="handleClick">点击我</button>
  <button v-on:click="handleClickWithParams('hello', $event)">带参数点击</button>
  <div v-on:mouseenter="onMouseEnter" v-on:mouseleave="onMouseLeave"></div>
  
  <!-- 简写形式 -->
  <button @click="handleClick">点击我</button>
  <button @click="handleClickWithParams('hello', $event)">带参数点击</button>
  <div @mouseenter="onMouseEnter" @mouseleave="onMouseLeave"></div>
</template>

<script setup>
const handleClick = () => {
  console.log('按钮被点击了!')
}

const handleClickWithParams = (message, event) => {
  console.log(message, event)
}

const onMouseEnter = () => {
  console.log('鼠标进入')
}

const onMouseLeave = () => {
  console.log('鼠标离开')
}
</script>
```

#### v-model

用于在表单元素上创建双向数据绑定：

```vue
<template>
  <!-- 文本输入 -->
  <input v-model="message" placeholder="输入消息...">
  <p>你输入的是: {{ message }}</p>
  
  <!-- 多行文本 -->
  <textarea v-model="description"></textarea>
  
  <!-- 复选框 -->
  <input type="checkbox" v-model="isAgreed">
  <label>我同意条款</label>
  
  <!-- 单选按钮 -->
  <input type="radio" id="option1" value="option1" v-model="selectedOption">
  <label for="option1">选项1</label>
  <input type="radio" id="option2" value="option2" v-model="selectedOption">
  <label for="option2">选项2</label>
  
  <!-- 下拉框 -->
  <select v-model="selectedFruit">
    <option value="apple">苹果</option>
    <option value="banana">香蕉</option>
    <option value="orange">橙子</option>
  </select>
</template>

<script setup>
import { ref } from 'vue'
const message = ref('')
const description = ref('')
const isAgreed = ref(false)
const selectedOption = ref('option1')
const selectedFruit = ref('apple')
</script>
```

#### v-for

用于渲染列表：

```vue
<template>
  <!-- 遍历数组 -->
  <ul>
    <li v-for="(item, index) in items" :key="index">
      {{ index }}: {{ item }}
    </li>
  </ul>
  
  <!-- 遍历对象 -->
  <ul>
    <li v-for="(value, key, index) in user" :key="key">
      {{ index }}. {{ key }}: {{ value }}
    </li>
  </ul>
  
  <!-- 遍历数字 -->
  <div v-for="n in 5" :key="n">{{ n }}</div>
</template>

<script setup>
import { ref, reactive } from 'vue'
const items = ref(['苹果', '香蕉', '橙子'])
const user = reactive({
  name: '张三',
  age: 25,
  job: '前端开发'
})
</script>
```

#### v-if / v-else-if / v-else

用于条件渲染：

```vue
<template>
  <div v-if="isLoggedIn">
    <p>欢迎回来，{{ username }}!</p>
  </div>
  <div v-else-if="isRegistered">
    <p>请登录</p>
  </div>
  <div v-else>
    <p>请注册</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const isLoggedIn = ref(false)
const isRegistered = ref(true)
const username = ref('张三')
</script>
```

#### v-show

用于条件显示（与v-if不同，v-show只是切换元素的display属性）：

```vue
<template>
  <div v-show="isVisible">
    <p>这个元素可能会被隐藏</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const isVisible = ref(true)
</script>
```

#### v-pre

跳过该元素及其子元素的编译过程，直接渲染原始内容：

```vue
<template>
  <div v-pre>
    <p>{{ message }} 不会被编译</p>
  </div>
</template>
```

#### v-cloak

用于解决初始化慢导致的页面闪烁问题，通常与CSS配合使用：

```vue
<template>
  <div v-cloak>
    <p>{{ message }}</p>
  </div>
</template>

<style>
[v-cloak] {
  display: none;
}
</style>
```

#### v-once

只渲染元素和组件一次，之后不再更新：

```vue
<template>
  <div v-once>
    <p>{{ message }}</p>
  </div>
</template>
```

#### v-memo

缓存模板片段，只有当依赖的表达式变化时才重新渲染：

```vue
<template>
  <div v-memo="[count]">
    <p>{{ count }}</p>
    <p>{{ message }}</p> <!-- 即使message变化，这里也不会重新渲染 -->
  </div>
</template>
```

### 模板语法的高级特性

#### 动态指令参数

指令参数可以是动态的：

```vue
<template>
  <a v-bind:[attributeName]="url">链接</a>
  <button v-on:[eventName]="handleEvent">点击</button>
</template>

<script setup>
import { ref } from 'vue'
const attributeName = ref('href')
const url = ref('https://vuejs.org/')
const eventName = ref('click')
const handleEvent = () => {
  console.log('事件被触发')
}
</script>
```

#### 修饰符

修饰符是以点开头的特殊后缀，用于修改指令的行为：

```vue
<template>
  <!-- 阻止默认行为 -->
  <form @submit.prevent="handleSubmit">...</form>
  
  <!-- 停止冒泡 -->
  <div @click.stop="handleClick">...</div>
  
  <!-- 按键修饰符 -->
  <input @keyup.enter="handleEnter">
  
  <!-- 精确修饰符 -->
  <button @click.exact="handleClick">只有点击按钮才触发</button>
</template>
```

模板语法是Vue的核心特性之一，它使我们能够以声明式的方式构建UI，极大地提高了开发效率。