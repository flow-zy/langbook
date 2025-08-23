# Vue 3 高级篇

## 动画和过渡效果

Vue 3提供了强大的动画和过渡效果支持，使我们能够为组件的进入、离开和状态变化添加流畅的动画。

### 过渡组件

`<transition>`组件用于为单个元素或组件添加进入和离开过渡效果：

::: vue-demo Vue 交互演示 8

```vue
<script>
const { ref } = Vue;

export default {
  data() {
    return {
      show: true
    }
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    }
  }
}
</script>

<template>
  <div>
    <button @click="toggleShow">切换显示</button>
    <transition name="fade">
      <div v-if="show" class="box">
        <h1>Hello Vue 3!</h1>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.box {
  width: 200px;
  height: 200px;
  background-color: #42b983;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
```

:::

### 动画组件

`<transition-group>`组件用于为列表添加进入和离开过渡效果：

::: vue-demo Vue 交互演示 9

```vue
<script>
const { ref } = Vue;

export default {
  data() {
    return {
      items: [1, 2, 3, 4, 5]
    }
  },
  methods: {
    addItem() {
      this.items.push(this.items.length + 1);
    },
    removeItem() {
      this.items.pop();
    }
  }
}
</script>

<template>
  <div>
    <button @click="addItem">添加项目</button>
    <button @click="removeItem">删除项目</button>
    <transition-group name="list" tag="ul">
      <li v-for="item in items" :key="item" class="item">
        {{ item }}
      </li>
    </transition-group>
  </div>
</template>

<style scoped>
.item {
  width: 50px;
  height: 50px;
  background-color: #42b983;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  list-style: none;
}

.list-enter-active, .list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from, .list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
```

:::

## 表单处理

Vue 3提供了强大的表单处理能力，包括表单验证、自定义输入组件等。

### 基本表单绑定

使用`v-model`可以轻松实现表单元素与数据的双向绑定：

::: vue-demo Vue 交互演示 10

```vue
<script>
const { ref } = Vue;

export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        age: 0,
        gender: 'male',
        agree: false
      }
    }
  },
  methods: {
    submitForm() {
      console.log('表单提交:', this.form);
      alert('表单提交成功!');
    }
  }
}
</script>

<template>
  <div class="form-container">
    <h1>用户表单</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">姓名:</label>
        <input id="name" v-model="form.name" required>
      </div>
      <div class="form-group">
        <label for="email">邮箱:</label>
        <input id="email" type="email" v-model="form.email" required>
      </div>
      <div class="form-group">
        <label for="age">年龄:</label>
        <input id="age" type="number" v-model="form.age" min="0">
      </div>
      <div class="form-group">
        <label>性别:</label>
        <input type="radio" id="male" value="male" v-model="form.gender">
        <label for="male">男</label>
        <input type="radio" id="female" value="female" v-model="form.gender">
        <label for="female">女</label>
      </div>
      <div class="form-group">
        <input type="checkbox" id="agree" v-model="form.agree">
        <label for="agree">同意条款</label>
      </div>
      <button type="submit" :disabled="!form.agree">提交</button>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}

button {
  padding: 10px 15px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
```

:::

### 自定义表单组件

我们可以创建自定义表单组件，并通过`v-model`与父组件进行数据绑定：

```vue
<!-- CustomInput.vue -->
<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    placeholder="自定义输入组件"
  >
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

// 定义props
const props = defineProps({
  modelValue: String
})

// 定义emits
const emit = defineEmits(['update:modelValue'])
</script>
```

```vue
<!-- ParentComponent.vue -->
<template>
  <div>
    <h1>自定义表单组件示例</h1>
    <p>输入的值: {{ message }}</p>
    <CustomInput v-model="message" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CustomInput from './CustomInput.vue'

const message = ref('')
</script>
```

## 自定义指令

Vue 3允许我们创建自定义指令，以扩展Vue的功能：

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// 注册全局自定义指令
epp.directive('focus', {
  // 当指令绑定到元素时
  mounted(el) {
    // 聚焦元素
    el.focus()
  }
})

app.mount('#app')
```

```vue
<template>
  <div>
    <h1>自定义指令示例</h1>
    <!-- 使用自定义指令 -->
    <input v-focus placeholder="页面加载后自动聚焦">
  </div>
</template>
```

## 插件开发

Vue 3允许我们开发插件，以扩展Vue的功能：

```javascript
// myPlugin.js
export default {
  install(app, options) {
    // 添加全局方法
    app.config.globalProperties.$myMethod = function(message) {
      console.log('My method:', message)
    }

    // 添加全局属性
    app.config.globalProperties.$myProperty = 'This is my property'

    // 添加注入值
    app.provide('myInjection', 'This is injected value')
  }
}
```

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import myPlugin from './myPlugin'

const app = createApp(App)

// 安装插件
epp.use(myPlugin, { someOption: true })

app.mount('#app')
```

```vue
<template>
  <div>
    <h1>插件示例</h1>
    <button @click="callMyMethod">调用插件方法</button>
    <p>{{ myProperty }}</p>
    <p>{{ injectedValue }}</p>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'

// 访问全局属性
const myProperty = ref('')

// 注入值
const injectedValue = inject('myInjection')

// 调用全局方法
const callMyMethod = () => {
  // 在setup中不能直接访问this，需要通过getCurrentInstance
  const { proxy } = getCurrentInstance()
  proxy.$myMethod('Hello from plugin!')
}
</script>
```

## 性能优化

Vue 3提供了多种性能优化手段，以确保应用的流畅运行：

### 组件懒加载

使用动态导入可以实现组件的懒加载：

```vue
<template>
  <div>
    <h1>组件懒加载示例</h1>
    <button @click="showLazyComponent = true">加载懒加载组件</button>
    <LazyComponent v-if="showLazyComponent" />
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue'

// 定义懒加载组件
const LazyComponent = defineAsyncComponent(() => import('./LazyComponent.vue'))

const showLazyComponent = ref(false)
</script>
```

### 缓存组件

使用`<KeepAlive>`组件可以缓存组件的状态：

```vue
<template>
  <div>
    <h1>组件缓存示例</h1>
    <button @click="currentComponent = 'ComponentA'">显示组件A</button>
    <button @click="currentComponent = 'ComponentB'">显示组件B</button>
    <KeepAlive>
      <component :is="currentComponent"></component>
    </KeepAlive>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ComponentA from './ComponentA.vue'
import ComponentB from './ComponentB.vue'

const currentComponent = ref('ComponentA')
</script>
```

## 动画和过渡效果的高级用法

### 自定义过渡类名

除了使用默认的过渡类名，我们还可以自定义过渡类名：

```vue
<template>
  <div>
    <button @click="show = !show">切换显示</button>
    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div v-if="show" class="box">
        <h1>Hello Vue 3!</h1>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const show = ref(true)
</script>

<style scoped>
.box {
  width: 200px;
  height: 200px;
  background-color: #42b983;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}
</style>
```

### 过渡模式

`<transition>`组件提供了两种过渡模式：

- `in-out`: 新元素先进行过渡，完成后旧元素再过渡离开
- `out-in`: 旧元素先进行过渡，完成后新元素再过渡进入

```vue
<template>
  <div>
    <button @click="toggle">切换组件</button>
    <transition name="fade" mode="out-in">
      <component :is="currentComponent" key="currentComponent" />
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ComponentA from './ComponentA.vue'
import ComponentB from './ComponentB.vue'

const currentComponent = ref('ComponentA')

const toggle = () => {
  currentComponent.value = currentComponent.value === 'ComponentA' ? 'ComponentB' : 'ComponentA'
}
</script>
```

### 动画钩子函数

我们可以使用动画钩子函数来控制动画的各个阶段：

```vue
<template>
  <div>
    <button @click="show = !show">切换显示</button>
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @enter-cancelled="enterCancelled"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
      @leave-cancelled="leaveCancelled"
    >
      <div v-if="show" class="box" ref="boxRef">
        <h1>Hello Vue 3!</h1>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const show = ref(true)
const boxRef = ref(null)

const beforeEnter = (el) => {
  console.log('进入动画前')
  el.style.opacity = 0
  el.style.transform = 'translateY(20px)'
}

const enter = (el, done) => {
  console.log('进入动画中')
  setTimeout(() => {
    el.style.opacity = 1
    el.style.transform = 'translateY(0)'
    done()
  }, 100)
}

const afterEnter = (el) => {
  console.log('进入动画后')
}

const enterCancelled = (el) => {
  console.log('进入动画取消')
}

const beforeLeave = (el) => {
  console.log('离开动画前')
}

const leave = (el, done) => {
  console.log('离开动画中')
  el.style.opacity = 0
  el.style.transform = 'translateY(20px)'
  setTimeout(() => {
    done()
  }, 300)
}

const afterLeave = (el) => {
  console.log('离开动画后')
}

const leaveCancelled = (el) => {
  console.log('离开动画取消')
}
</script>
```

## 表单处理的高级技巧

### 使用VeeValidate进行表单验证

VeeValidate是一个强大的表单验证库，可以与Vue 3很好地集成：

```vue
<template>
  <div class="form-container">
    <h1>用户注册</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">用户名</label>
        <input
          id="name"
          v-model="name"
          type="text"
        >
        <p v-if="errors.name" class="error">{{ errors.name }}</p>
      </div>

      <div class="form-group">
        <label for="email">邮箱</label>
        <input
          id="email"
          v-model="email"
          type="email"
        >
        <p v-if="errors.email" class="error">{{ errors.email }}</p>
      </div>

      <div class="form-group">
        <label for="password">密码</label>
        <input
          id="password"
          v-model="password"
          type="password"
        >
        <p v-if="errors.password" class="error">{{ errors.password }}</p>
      </div>

      <button type="submit">注册</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

// 定义验证规则
const schema = yup.object({
  name: yup.string().required('用户名不能为空').min(3, '用户名长度不能少于3个字符'),
  email: yup.string().required('邮箱不能为空').email('请输入有效的邮箱地址'),
  password: yup.string().required('密码不能为空').min(6, '密码长度不能少于6个字符')
})

// 使用useForm钩子
const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema
})

// 使用useField钩子
const { value: name } = useField('name')
const { value: email } = useField('email')
const { value: password } = useField('password')

// 处理表单提交
const submitForm = handleSubmit((values) => {
  console.log('表单提交成功:', values)
  alert('注册成功！')
})
</script>
```

### 动态表单字段

处理动态增减的表单字段：

```vue
<template>
  <div class="form-container">
    <h1>动态表单字段</h1>
    <form @submit.prevent="submitForm">
      <div v-for="(field, index) in fields" :key="index" class="form-group">
        <label :for="`field-${index}`">字段 ${index + 1}</label>
        <input
          :id="`field-${index}`"
          v-model="field.value"
          type="text"
          placeholder="输入字段内容"
        >
        <button type="button" @click="removeField(index)" class="remove-btn">删除</button>
      </div>

      <button type="button" @click="addField" class="add-btn">添加字段</button>
      <button type="submit" class="submit-btn">提交</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 初始化表单字段
const fields = ref([{
  value: ''
}])

// 添加字段
const addField = () => {
  fields.value.push({
    value: ''
  })
}

// 删除字段
const removeField = (index) => {
  if (fields.value.length > 1) {
    fields.value.splice(index, 1)
  } else {
    alert('至少保留一个字段')
  }
}

// 处理表单提交
const submitForm = () => {
  console.log('表单提交:', fields.value)
  alert('提交成功！')
}
</script>

<style scoped>
.form-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  display: flex;
  margin-bottom: 15px;
  align-items: center;
}

label {
  display: block;
  margin-bottom: 5px;
  width: 100px;
}

input {
  flex: 1;
  padding: 8px;
  margin-right: 10px;
}

.remove-btn {
  padding: 5px 10px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-btn {
  padding: 8px 15px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

.submit-btn {
  padding: 8px 15px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

## 自定义指令的高级用法

### 指令钩子函数

自定义指令有以下钩子函数：
- `created`: 指令绑定到元素时调用
- `beforeMount`: 元素插入DOM前调用
- `mounted`: 元素插入DOM后调用
- `beforeUpdate`: 元素更新前调用
- `updated`: 元素更新后调用
- `beforeUnmount`: 元素卸载前调用
- `unmounted`: 元素卸载后调用

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// 注册全局自定义指令
app.directive('highlight', {
  // 当指令绑定到元素时
  created(el, binding, vnode) {
    console.log('created')
  },
  // 元素插入DOM前
  beforeMount(el, binding, vnode) {
    console.log('beforeMount')
  },
  // 元素插入DOM后
  mounted(el, binding, vnode) {
    console.log('mounted')
    el.style.backgroundColor = binding.value || '#ffeb3b'
  },
  // 元素更新前
  beforeUpdate(el, binding, vnode, prevVnode) {
    console.log('beforeUpdate')
  },
  // 元素更新后
  updated(el, binding, vnode, prevVnode) {
    console.log('updated')
    el.style.backgroundColor = binding.value || '#ffeb3b'
  },
  // 元素卸载前
  beforeUnmount(el, binding, vnode) {
    console.log('beforeUnmount')
  },
  // 元素卸载后
  unmounted(el, binding, vnode) {
    console.log('unmounted')
  }
})

app.mount('#app')
```

### 传递参数给指令

我们可以向指令传递参数：

```vue
<template>
  <div>
    <h1>自定义指令参数示例</h1>
    <!-- 传递简单值 -->
    <div v-highlight="'#ff9800'">黄色高亮</div>
    
    <!-- 传递对象 -->
    <div v-highlight="{ backgroundColor: '#2196f3', color: 'white' }"></div>
  </div>
</template>
```

```javascript
// main.js
app.directive('highlight', {
  mounted(el, binding) {
    if (typeof binding.value === 'string') {
      el.style.backgroundColor = binding.value
    } else if (typeof binding.value === 'object') {
      Object.assign(el.style, binding.value)
    }
  }
})
```

## 插件开发的最佳实践

### 插件的结构

一个良好的Vue插件应该包含以下部分：

```javascript
// myPlugin.js
const MyPlugin = {
  install(app, options) {
    // 1. 添加全局方法或属性
    app.config.globalProperties.$myMethod = function(message) {
      console.log('My method:', message)
    }

    // 2. 添加全局组件
    app.component('MyGlobalComponent', {
      template: '<div>全局组件</div>'
    })

    // 3. 添加全局指令
    app.directive('myDirective', {
      mounted(el) {
        // 指令逻辑
      }
    })

    // 4. 提供注入值
    app.provide('myInjection', 'This is injected value')

    // 5. 使用插件选项
    const pluginOptions = options || {}
    console.log('插件选项:', pluginOptions)
  }
}

export default MyPlugin
```

### 插件的类型

Vue插件主要有以下几种类型：
1. **功能型插件**：提供特定功能，如`vue-router`、`vuex`
2. **UI组件库**：提供一组UI组件，如`element-plus`、`ant-design-vue`
3. **工具型插件**：提供实用工具函数，如`vue-i18n`
4. **集成型插件**：集成第三方库，如`vue-chartjs`

### 插件的发布和使用

发布插件到npm：
1. 创建`package.json`文件
2. 编写插件代码
3. 发布到npm

使用插件：
```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import MyPlugin from 'my-plugin'

const app = createApp(App)

// 安装插件
app.use(MyPlugin, {
  option1: 'value1',
  option2: 'value2'
})

app.mount('#app')
```

## 性能优化的更多技巧

### 虚拟滚动

对于大型列表，使用虚拟滚动可以显著提高性能：

```vue
<template>
  <div>
    <h1>虚拟滚动示例</h1>
    <VirtualList
      :items="items"
      :item-height="50"
      :visible-count="10"
    >
      <template #default="{ item }">
        <div class="item">{{ item }}</div>
      </template>
    </VirtualList>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VirtualList from './VirtualList.vue'

// 生成大型列表数据
const items = ref(Array.from({ length: 10000 }, (_, i) => `项目 ${i + 1}`))
</script>
```

### 按需渲染

只在需要时才渲染组件：

```vue
<template>
  <div>
    <h1>按需渲染示例</h1>
    <button @click="showHeavyComponent = !showHeavyComponent">
      {{ showHeavyComponent ? '隐藏' : '显示' }} 重型组件
    </button>
    <Suspense v-if="showHeavyComponent">
      <template #default>
        <HeavyComponent />
      </template>
      <template #fallback>
        <div>加载中...</div>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue'

const showHeavyComponent = ref(false)
// 按需加载重型组件
const HeavyComponent = defineAsyncComponent(() => import('./HeavyComponent.vue'))
</script>
```

### 响应式优化

使用`shallowRef`和`shallowReactive`优化响应式性能：

```javascript
import { shallowRef, shallowReactive } from 'vue'

// 只追踪引用变化，不追踪内部属性变化
const shallowObj = shallowReactive({
  foo: 'bar',
  nested: {
    baz: 'qux' // 不会被追踪
  }
})

// 只追踪.value的变化，不追踪对象内部属性变化
const shallowRefObj = shallowRef({
  foo: 'bar'
})
```

### 代码分割

使用动态导入进行代码分割：

```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
```

## 小结

在本章中，我们深入学习了Vue 3的高级特性，包括：
- 动画和过渡效果的高级用法（自定义过渡类名、过渡模式、动画钩子函数）
- 表单处理的高级技巧（使用VeeValidate进行表单验证、动态表单字段）
- 自定义指令的高级用法（指令钩子函数、传递参数给指令）
- 插件开发的最佳实践（插件的结构、类型、发布和使用）
- 性能优化的更多技巧（虚拟滚动、按需渲染、响应式优化、代码分割）

这些高级特性使Vue 3更加灵活和强大，能够满足各种复杂应用的需求。通过合理使用这些特性，我们可以构建出高性能、可维护的Vue应用。

下一章：[实战篇：通过实际项目巩固所学知识](project.md)