# Vue 3 组件篇

## 组件的基本概念

组件是Vue应用的基本构建块，它允许我们将UI拆分为独立、可复用的模块。每个组件都是一个自给自足的单元，拥有自己的模板、逻辑和样式。

## 创建和使用组件

### 单文件组件

在Vue 3中，我们通常使用单文件组件（.vue文件）来定义组件。一个单文件组件包含三个部分：模板（template）、脚本（script）和样式（style）。

```vue
<!-- MyComponent.vue -->
<template>
  <div class="my-component">
    <h2>{{ title }}</h2>
    <p>{{ content }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

export default {
  name: 'MyComponent'
}

const title = ref('我是一个组件')
const content = ref('这是组件的内容')
</script>

<style scoped>
.my-component {
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px;
  border-radius: 4px;
}
</style>
```

### 使用组件

要使用组件，我们需要先导入它，然后在父组件的模板中使用：

```vue
<!-- App.vue -->
<template>
  <div id="app">
    <h1>Vue 3 组件示例</h1>
    <MyComponent />
  </div>
</template>

<script setup>
import MyComponent from './components/MyComponent.vue'
</script>
```

## 组件通信

### Props

Props允许父组件向子组件传递数据：

```vue
<!-- ChildComponent.vue -->
<template>
  <div>
    <h3>{{ title }}</h3>
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

// 定义props
const props = defineProps({
  title: String,
  message: {
    type: String,
    default: '默认消息'
  }
})
</script>
```

```vue
<!-- ParentComponent.vue -->
<template>
  <div>
    <h2>父组件</h2>
    <ChildComponent title="来自父组件的标题" message="这是一条来自父组件的消息" />
  </div>
</template>

<script setup>
import ChildComponent from './ChildComponent.vue'
</script>
```

### Emits

Emits允许子组件向父组件发送事件，父组件可以监听这些事件并做出响应：

```vue
<!-- ChildComponent.vue -->
<template>
  <div>
    <h3>{{ title }}</h3>
    <p>{{ message }}</p>
    <button @click="sendEvent">发送事件到父组件</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

// 定义props
const props = defineProps({
  title: String,
  message: {
    type: String,
    default: '默认消息'
  }
})

// 定义emits
const emit = defineEmits(['child-click', 'update-message'])

// 发送事件的方法
const sendEvent = () => {
  // 无参数的事件
  emit('child-click')
  
  // 带参数的事件
  emit('update-message', '来自子组件的新消息', new Date())
}
</script>
```

```vue
<!-- ParentComponent.vue -->
<template>
  <div>
    <h2>父组件</h2>
    <p>收到的消息: {{ receivedMessage }}</p>
    <p>消息时间: {{ messageTime }}</p>
    <ChildComponent 
      title="来自父组件的标题" 
      message="这是一条来自父组件的消息" 
      @child-click="handleChildClick" 
      @update-message="handleUpdateMessage" 
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ChildComponent from './ChildComponent.vue'

const receivedMessage = ref('')
const messageTime = ref('')

// 处理无参数的事件
const handleChildClick = () => {
  console.log('收到子组件的点击事件')
}

// 处理带参数的事件
const handleUpdateMessage = (message, time) => {
  receivedMessage.value = message
  messageTime.value = time.toLocaleString()
}
</script>
```

### 插槽（Slots）

插槽允许父组件向子组件传递HTML内容：

```vue
<!-- ChildComponent.vue -->
<template>
  <div class="container">
    <h3>{{ title }}</h3>
    <!-- 默认插槽 -->
    <slot>默认内容</slot>
    
    <!-- 具名插槽 -->
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  title: String
})
</script>

<style scoped>
.container {
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px;
  border-radius: 4px;
}

.footer {
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px solid #eee;
}
</style>
```

```vue
<!-- ParentComponent.vue -->
<template>
  <div>
    <h2>父组件</h2>
    <ChildComponent title="带插槽的组件">
      <!-- 默认插槽内容 -->
      <p>这是插入到子组件的内容</p>
      <button @click="doSomething">一个按钮</button>
      
      <!-- 具名插槽内容 -->
      <template #footer>
        <p>这是页脚内容</p>
        <p>© 2023 Vue 3 示例</p>
      </template>
    </ChildComponent>
  </div>
</template>

<script setup>
import ChildComponent from './ChildComponent.vue'

const doSomething = () => {
  console.log('按钮被点击')
}
</script>
```

### Provide/Inject

Provide/Inject允许祖先组件向后代组件传递数据，而不需要通过props逐层传递：

```vue
<!-- AncestorComponent.vue -->
<template>
  <div>
    <h2>祖先组件</h2>
    <DescendantComponent />
  </div>
</template>

<script setup>
import { provide } from 'vue'
import DescendantComponent from './DescendantComponent.vue'

// 提供数据
provide('appTitle', 'Vue 3 组件示例')
provide('userInfo', {
  name: '张三',
  age: 25
})
</script>
```

```vue
<!-- DescendantComponent.vue -->
<template>
  <div>
    <h3>后代组件</h3>
    <p>应用标题: {{ appTitle }}</p>
    <p>用户名: {{ userInfo.name }}</p>
    <p>年龄: {{ userInfo.age }}</p>
  </div>
</template>

<script setup>
import { inject } from 'vue'

// 注入数据
const appTitle = inject('appTitle')
const userInfo = inject('userInfo')
</script>
```

### refs

refs允许父组件直接访问子组件的实例或DOM元素：

```vue
<!-- ChildComponent.vue -->
<template>
  <div>
    <h3>{{ title }}</h3>
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'

export const props = defineProps({
  title: String,
  message: String
})

export const count = ref(0)

export const increment = () => {
  count.value++
}
</script>
```

```vue
<!-- ParentComponent.vue -->
<template>
  <div>
    <h2>父组件</h2>
    <ChildComponent 
      ref="childRef" 
      title="带ref的组件" 
      message="这是一条消息" 
    />
    <button @click="accessChild">访问子组件</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ChildComponent from './ChildComponent.vue'

const childRef = ref(null)

const accessChild = () => {
  // 访问子组件的属性
  console.log('子组件标题:', childRef.value.props.title)
  console.log('子组件计数:', childRef.value.count.value)
  
  // 调用子组件的方法
  childRef.value.increment()
  console.log('调用后子组件计数:', childRef.value.count.value)
}
</script>
```

## 组件的生命周期

Vue 3提供了一系列的生命周期钩子，允许我们在组件的不同阶段执行代码：

```vue
<script setup>
import { 
  onMounted, 
  onUpdated, 
  onUnmounted, 
  onBeforeMount, 
  onBeforeUpdate, 
  onBeforeUnmount, 
  onErrorCaptured, 
  onRenderTracked, 
  onRenderTriggered
} from 'vue'

// 组件挂载前
onBeforeMount(() => {
  console.log('组件挂载前')
})

// 组件挂载后
onMounted(() => {
  console.log('组件挂载后')
})

// 组件更新前
onBeforeUpdate(() => {
  console.log('组件更新前')
})

// 组件更新后
onUpdated(() => {
  console.log('组件更新后')
})

// 组件卸载前
onBeforeUnmount(() => {
  console.log('组件卸载前')
})

// 组件卸载后
onUnmounted(() => {
  console.log('组件卸载后')
})

// 捕获错误
onErrorCaptured((error, instance, info) => {
  console.log('捕获到错误:', error)
  return false // 阻止错误继续传播
})

// 跟踪渲染依赖
onRenderTracked((event) => {
  console.log('渲染依赖被跟踪:', event)
})

// 触发渲染
onRenderTriggered((event) => {
  console.log('渲染被触发:', event)
})
</script>
```

## 组件的高级特性

### 动态组件

动态组件允许我们根据条件切换不同的组件：

```vue
<template>
  <div>
    <h2>动态组件</h2>
    <button @click="currentComponent = 'ComponentA'">显示组件A</button>
    <button @click="currentComponent = 'ComponentB'">显示组件B</button>
    <button @click="currentComponent = 'ComponentC'">显示组件C</button>
    
    <component :is="currentComponent" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ComponentA from './ComponentA.vue'
import ComponentB from './ComponentB.vue'
import ComponentC from './ComponentC.vue'

const currentComponent = ref('ComponentA')
</script>
```

### 异步组件

异步组件允许我们延迟加载组件，提高应用的初始加载速度：

```vue
<template>
  <div>
    <h2>异步组件</h2>
    <AsyncComponent />
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

// 定义异步组件
const AsyncComponent = defineAsyncComponent({
  // 加载组件
  loader: () => import('./AsyncComponent.vue'),
  
  // 加载时显示的组件
  loadingComponent: () => <div>加载中...</div>,
  
  // 加载失败时显示的组件
  errorComponent: () => <div>加载失败</div>,
  
  // 加载超时时间
  timeout: 3000
})
</script>
```

### 递归组件

递归组件允许组件自身调用自身，常用于展示树形结构等递归数据：

```vue
<!-- TreeItem.vue -->
<template>
  <div class="tree-item">
    <div @click="toggleExpand">{{ item.name }}</div>
    <div v-if="isExpanded" class="children">
      <TreeItem 
        v-for="child in item.children" 
        :key="child.id" 
        :item="child" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TreeItem from './TreeItem.vue'

export const props = defineProps({
  item: Object
})

const isExpanded = ref(false)

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<style scoped>
.tree-item {
  margin-left: 20px;
  padding: 5px 0;
}

.children {
  margin-left: 20px;
  border-left: 1px dashed #ccc;
  padding-left: 10px;
}
</style>
```

### 内置组件

Vue 3提供了一些内置组件，可以帮助我们实现常见的功能：

#### KeepAlive

KeepAlive允许我们缓存组件状态，避免组件被频繁创建和销毁：

```vue
<template>
  <div>
    <h2>KeepAlive 示例</h2>
    <button @click="currentComponent = 'ComponentA'">显示组件A</button>
    <button @click="currentComponent = 'ComponentB'">显示组件B</button>
    
    <KeepAlive>
      <component :is="currentComponent" />
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

#### Transition

Transition允许我们为组件的进入和离开添加动画效果：

```vue
<template>
  <div>
    <h2>Transition 示例</h2>
    <button @click="show = !show">切换显示</button>
    
    <Transition name="fade">
      <div v-if="show" class="box">这是一个带动画的盒子</div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const show = ref(true)
</script>

<style>
.box {
  width: 200px;
  height: 200px;
  background-color: #42b983;
  margin: 20px 0;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
</style>
```

## 组件的样式

### 作用域样式

在单文件组件中，我们可以使用`scoped`属性来使样式只作用于当前组件：

```vue
<style scoped>
.my-component {
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px;
  border-radius: 4px;
}
</style>
```

### 深度选择器

如果需要在父组件中修改子组件的样式，可以使用深度选择器：

```vue
<style scoped>
/* 使用 >>> 或 /deep/ 或 ::v-deep */
.parent >>> .child {
  color: red;
}

/* 或 */
.parent /deep/ .child {
  color: red;
}

/* 或 */
.parent ::v-deep .child {
  color: red;
}
</style>
```

### CSS Modules

CSS Modules允许我们使用局部作用域的CSS类：

```vue
<template>
  <div :class="styles.container">
    <h2 :class="styles.title">{{ title }}</h2>
    <p :class="styles.content">{{ content }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import styles from './MyComponent.module.css'

const title = ref('CSS Modules 示例')
const content = ref('这是使用CSS Modules的内容')
</script>
```

```css
/* MyComponent.module.css */
.container {
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px;
  border-radius: 4px;
}

title {
  font-size: 24px;
  color: #333;
}

content {
  font-size: 16px;
  color: #666;
}
```

### 事件

子组件可以通过事件向父组件发送数据：

```vue
<!-- ChildComponent.vue -->
<template>
  <div>
    <h3>子组件</h3>
    <button @click="sendMessage">发送消息给父组件</button>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'

// 定义emits
const emit = defineEmits(['message-sent'])

const sendMessage = () => {
  emit('message-sent', '你好，父组件！')
}
</script>
```

```vue
<!-- ParentComponent.vue -->
<template>
  <div>
    <h2>父组件</h2>
    <p>从子组件接收的消息: {{ receivedMessage }}</p>
    <ChildComponent @message-sent="handleMessage" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ChildComponent from './ChildComponent.vue'

const receivedMessage = ref('')

const handleMessage = (message) => {
  receivedMessage.value = message
}
</script>
```

### Provide/Inject

对于深层嵌套的组件通信，我们可以使用provide/inject：

```vue
<!-- GrandparentComponent.vue -->
<template>
  <div>
    <h2>祖父组件</h2>
    <ParentComponent />
  </div>
</template>

<script setup>
import { provide } from 'vue'
import ParentComponent from './ParentComponent.vue'

// 提供数据
provide('appTitle', 'Vue 3 组件通信示例')
</script>
```

```vue
<!-- ChildComponent.vue -->
<template>
  <div>
    <h3>子组件</h3>
    <p>从祖父组件接收的标题: {{ appTitle }}</p>
  </div>
</template>

<script setup>
import { inject } from 'vue'

// 注入数据
const appTitle = inject('appTitle')
</script>
```

## 组件的生命周期

Vue 3提供了一系列生命周期钩子，允许我们在组件的不同阶段执行代码：

```vue
<template>
  <div>
    <h3>生命周期示例</h3>
    <p>组件状态: {{ status }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUpdated, onUnmounted } from 'vue'

const status = ref('创建中')

// 组件挂载后执行
onMounted(() => {
  status.value = '已挂载'
  console.log('组件已挂载')
})

// 组件更新后执行
onUpdated(() => {
  console.log('组件已更新')
})

// 组件卸载前执行
onUnmounted(() => {
  status.value = '已卸载'
  console.log('组件已卸载')
})
</script>
```

## 组件的复用

### 动态组件

使用`<component :is="currentComponent">`可以动态渲染不同的组件：

```vue
<template>
  <div>
    <h2>动态组件示例</h2>
    <button @click="currentComponent = 'ComponentA'">显示组件A</button>
    <button @click="currentComponent = 'ComponentB'">显示组件B</button>
    <component :is="currentComponent"></component>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ComponentA from './ComponentA.vue'
import ComponentB from './ComponentB.vue'

const currentComponent = ref('ComponentA')
</script>
```

### 组件插槽

插槽允许我们在父组件中向子组件插入内容：

```vue
<!-- MyButton.vue -->
<template>
  <button class="my-button">
    <slot>默认按钮文本</slot>
  </button>
</template>

<style scoped>
.my-button {
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

```vue
<!-- ParentComponent.vue -->
<template>
  <div>
    <h2>插槽示例</h2>
    <MyButton>点击我</MyButton>
    <MyButton>
      <span>自定义按钮文本</span>
    </MyButton>
  </div>
</template>

<script setup>
import MyButton from './MyButton.vue'
</script>
```

## 小结

在本章中，我们学习了Vue 3的组件系统，包括：
- 组件的基本概念和单文件组件的结构
- 如何创建和使用组件
- 组件通信的几种方式（props、events、provide/inject）
- 组件的生命周期钩子
- 组件的复用技巧（动态组件、插槽）

组件是Vue应用的核心，掌握组件的使用对于构建复杂的Vue应用至关重要。

下一章：[响应式篇：理解响应式系统](reactivity.md)