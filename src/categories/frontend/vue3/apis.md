# Vue 3 常用 API 详解

## 核心响应式 API

### ref

**功能特性**：创建一个响应式的引用类型数据，可以包装基本类型和对象类型。

**使用场景**：
- 当你需要一个响应式的基本类型值（如数字、字符串、布尔值）
- 当你需要在模板中直接使用一个响应式值
- 当你需要在组合式 API 中使用响应式数据

**调用方法**：
```vue
<script setup>
import { ref } from 'vue'

// 创建一个响应式的数字
const count = ref(0)

// 修改值
count.value++ // 此时视图会更新
</script>

<template>
  <div>{{ count }}</div> <!-- 直接使用，不需要 .value -->
</template>
```

**注意事项**：
- 在 JavaScript 中访问和修改 `ref` 创建的值时，需要使用 `.value` 属性
- 在模板中使用时，Vue 会自动解包，不需要 `.value`
- `ref` 可以包装对象，此时内部会调用 `reactive`

### reactive

**功能特性**：创建一个响应式的对象，只能用于对象类型数据。

**使用场景**：
- 当你需要一个响应式的对象
- 当你希望直接修改对象的属性而不是整个对象

**调用方法**：
```vue
<script setup>
import { reactive } from 'vue'

// 创建一个响应式对象
const user = reactive({
  name: 'John',
  age: 30
})

// 修改属性
user.name = 'Jane' // 此时视图会更新
</script>

<template>
  <div>{{ user.name }}</div>
</template>
```

**注意事项**：
- `reactive` 只能用于对象类型，不能用于基本类型
- 不能直接替换整个对象，否则会失去响应性
- 可以使用 `toRefs` 将 `reactive` 对象转换为 `ref` 对象的集合

### computed

**功能特性**：创建一个响应式的计算属性，当依赖的响应式数据变化时，会重新计算。

**使用场景**：
- 当你需要基于其他响应式数据派生新的数据
- 当你需要缓存计算结果，避免重复计算

**调用方法**：
```vue
<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
// 创建一个计算属性，依赖 count
const doubleCount = computed(() => count.value * 2)

// 修改 count，doubleCount 会自动更新
count.value++
</script>

<template>
  <div>{{ count }} 的两倍是 {{ doubleCount }}</div>
</template>
```

**注意事项**：
- 计算属性是只读的，不能直接修改
- 计算属性会缓存结果，只有当依赖变化时才会重新计算
- 可以传递一个对象，包含 `get` 和 `set` 方法，创建可写的计算属性


## 指令 API

### v-model

**功能特性**：在表单元素上创建双向数据绑定。

**使用场景**：
- 当你需要在表单元素（如输入框、复选框等）和组件数据之间创建双向绑定
- 当你需要自定义组件支持双向绑定

**调用方法**：
```vue
<script setup>
import { ref } from 'vue'

const message = ref('')
</script>

<template>
  <input v-model="message" placeholder="输入消息">
  <p>你输入的是: {{ message }}</p>
</template>
```

**注意事项**：
- `v-model` 实际上是语法糖，它会根据元素类型自动展开为 `:value` 和 `@input` 或其他事件
- 可以通过 `v-model:propName` 为自定义组件的特定属性创建双向绑定
- 可以通过 `.lazy`、`.number`、`.trim` 等修饰符修改 `v-model` 的行为

### v-for

**功能特性**：基于数组或对象渲染列表。

**使用场景**：
- 当你需要渲染一个数组或对象的数据
- 当你需要动态生成元素

**调用方法**：
```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { id: 1, name: '苹果' },
  { id: 2, name: '香蕉' },
  { id: 3, name: '橙子' }
])
</script>

<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.name }}
    </li>
  </ul>
</template>
```

**注意事项**：
- 必须为 `v-for` 提供 `:key` 属性，以帮助 Vue 识别每个元素的身份
- 不要使用索引作为 `key`，除非你确定列表不会重新排序
- 可以使用 `(item, index) in items` 获取索引
- 可以使用 `(value, key) in object` 遍历对象

### v-if / v-else-if / v-else

**功能特性**：根据条件渲染元素。

**使用场景**：
- 当你需要根据条件动态显示或隐藏元素
- 当你需要在多个条件中选择一个进行渲染

**调用方法**：
```vue
<script setup>
import { ref } from 'vue'

const type = ref('A')
const score = ref(85)
</script>

<template>
  <div v-if="type === 'A'">Type A</div>
  <div v-else-if="type === 'B'">Type B</div>
  <div v-else>Other Type</div>

  <div v-if="score >= 90">优秀</div>
  <div v-else-if="score >= 80">良好</div>
  <div v-else-if="score >= 60">及格</div>
  <div v-else>不及格</div>
</template>
```

**注意事项**：
- `v-if` 会根据条件销毁或重建元素
- `v-else-if` 和 `v-else` 必须紧跟在 `v-if` 或 `v-else-if` 后面
- 不要在同一个元素上使用 `v-if` 和 `v-for`，可能会导致意外行为

### v-show

**功能特性**：根据条件显示或隐藏元素（通过 CSS `display` 属性）。

**使用场景**：
- 当你需要频繁切换元素的显示和隐藏
- 当你不希望元素被频繁销毁和重建

**调用方法**：
```vue
<script setup>
import { ref } from 'vue'

const isVisible = ref(true)
</script>

<template>
  <div v-show="isVisible">可见元素</div>
  <button @click="isVisible = !isVisible">切换可见性</button>
</template>
```

**注意事项**：
- `v-show` 不会销毁元素，只是通过 CSS 隐藏
- 初始渲染成本比 `v-if` 高，但切换成本低
- 不适用于永远不会显示的元素（会增加初始渲染成本）

### v-bind

**功能特性**：动态绑定属性。

**使用场景**：
- 当你需要动态设置元素的属性
- 当你需要将响应式数据绑定到元素属性上

**调用方法**：
```vue
<script setup>
import { ref } from 'vue'

const imageUrl = ref('https://example.com/image.jpg')
const isActive = ref(true)
const classObject = ref({
  active: true,
  'text-danger': false
})
</script>

<template>
  <img v-bind:src="imageUrl" alt="示例图片">
  <div v-bind:class="isActive ? 'active' : ''">动态类名</div>
  <div v-bind:class="classObject">对象形式类名</div>
  <button v-bind:disabled="!isActive">禁用按钮</button>
  <!-- 简写形式 -->
  <img :src="imageUrl" alt="示例图片">
</template>
```

**注意事项**：
- `v-bind` 可以简写为 `:`
- 可以绑定单个属性，也可以绑定对象形式的多个属性
- 对于 `class` 和 `style` 属性，有特殊的绑定规则
## 组件相关 API

### defineProps

**功能特性**：定义组件的 props。

**使用场景**：
- 当你需要从父组件接收数据
- 当你需要验证父组件传递的数据类型

**调用方法**：
```vue
<script setup>
const props = defineProps({
  name: String,
  age: {
    type: Number,
    required: true,
    default: 0
  },
  items: Array
})
</script>
```

**注意事项**：
- `defineProps` 只能在 `<script setup>` 中使用
- 定义的 props 是响应式的
- 不要直接修改 props 的值，应该通过 emits 通知父组件修改

### defineEmits

**功能特性**：定义组件的自定义事件。

**使用场景**：
- 当你需要向父组件发送消息
- 当你需要通知父组件修改数据

**调用方法**：
```vue
<script setup>
const emit = defineEmits(['change', 'update'])

const handleClick = () => {
  emit('change', 'new value')
}
</script>
```

**注意事项**：
- `defineEmits` 只能在 `<script setup>` 中使用
- 可以传递任意数量的参数给 emit
- 父组件可以通过 `@change` 或 `@update` 监听这些事件

### defineExpose

**功能特性**：暴露组件的属性和方法给父组件。

**使用场景**：
- 当你需要让父组件访问子组件的内部状态
- 当你需要让父组件调用子组件的方法

**调用方法**：
```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
const increment = () => {
  count.value++
}

defineExpose({
  count,
  increment
})
</script>
```

**注意事项**：
- `defineExpose` 只能在 `<script setup>` 中使用
- 父组件可以通过模板引用（template ref）访问暴露的属性和方法

### useAttrs

**功能特性**：获取组件的非 props 属性。

**使用场景**：
- 当你需要访问父组件传递的但未在 `defineProps` 中定义的属性
- 当你需要将这些属性传递给子组件

**调用方法**：
```vue
<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()

console.log(attrs.class) // 访问父组件传递的 class 属性
console.log(attrs.style) // 访问父组件传递的 style 属性
</script>
```

**注意事项**：
- `useAttrs` 只能在组合式 API 中使用
- 返回的 `attrs` 对象是响应式的
- 不要直接修改 `attrs` 对象，应该通过 `v-bind` 传递给子组件

## 生命周期钩子

### onMounted

**功能特性**：组件挂载完成后执行的钩子函数。

**使用场景**：
- 当你需要在组件挂载后执行初始化操作（如获取数据、添加事件监听器）
- 当你需要操作 DOM 元素（确保元素已经存在）

**调用方法**：
```vue
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log('组件已挂载')
  // 执行初始化操作
})
</script>
```

**注意事项**：
- `onMounted` 只会在组件挂载时执行一次
- 在服务器端渲染（SSR）中，`onMounted` 不会执行

### onBeforeUpdate

**功能特性**：组件更新前执行的钩子函数。

**使用场景**：
- 当你需要在组件更新前获取更新前的状态
- 当你需要在 DOM 更新前执行一些操作

**调用方法**：
```vue
<script setup>
import { ref, onBeforeUpdate } from 'vue'

const count = ref(0)

onBeforeUpdate(() => {
  console.log('组件即将更新，更新前 count 值为:', count.value)
})
</script>
```

**注意事项**：
- `onBeforeUpdate` 在组件每次更新前都会执行
- 不要在 `onBeforeUpdate` 中修改响应式数据，可能会导致无限循环

### onUpdated

**功能特性**：组件更新后执行的钩子函数。

**使用场景**：
- 当你需要在组件更新后执行操作（如更新第三方库）
- 当你需要根据更新后的 DOM 状态执行操作

**调用方法**：
```vue
<script setup>
import { ref, onUpdated } from 'vue'

const count = ref(0)

onUpdated(() => {
  console.log('组件已更新，count 值为:', count.value)
})
</script>
```

**注意事项**：
- `onUpdated` 在组件每次更新后都会执行
- 不要在 `onUpdated` 中修改响应式数据，可能会导致无限循环

### onBeforeUnmount

**功能特性**：组件卸载前执行的钩子函数。

**使用场景**：
- 当你需要在组件卸载前执行最后的清理工作
- 当你需要在组件卸载前保存一些状态

**调用方法**：
```vue
<script setup>
import { onBeforeUnmount } from 'vue'

onBeforeUnmount(() => {
  console.log('组件即将卸载')
  // 执行最后的清理工作
})
</script>
```

**注意事项**：
- `onBeforeUnmount` 只会在组件卸载前执行一次
- 与 `onUnmounted` 相比，`onBeforeUnmount` 执行时组件仍然存在

### onUnmounted

**功能特性**：组件卸载前执行的钩子函数。

**使用场景**：
- 当你需要在组件卸载前清理资源（如移除事件监听器、取消定时器）
- 当你需要释放第三方库占用的资源

**调用方法**：
```vue
<script setup>
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  const handleResize = () => {
    console.log('窗口大小变化')
  }
  window.addEventListener('resize', handleResize)

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
})
</script>
```

**注意事项**：
- `onUnmounted` 只会在组件卸载时执行一次
- 确保在 `onUnmounted` 中清理所有在组件生命周期内创建的资源


### onBeforeMount

**功能特性**：组件挂载前执行的钩子函数。

**使用场景**：
- 当你需要在组件挂载前执行一些准备工作
- 当你需要在 DOM 元素创建前设置一些初始状态

**调用方法**：
```vue
<script setup>
import { onBeforeMount } from 'vue'

onBeforeMount(() => {
  console.log('组件即将挂载')
  // 执行准备工作
})
</script>
```

**注意事项**：
- `onBeforeMount` 在组件挂载前执行一次
- 在服务器端渲染（SSR）中，`onBeforeMount` 会执行

### onBeforeUnmount

**功能特性**：组件卸载前执行的钩子函数。

**使用场景**：
- 当你需要在组件卸载前执行最后的清理工作
- 当你需要在组件卸载前保存一些状态

**调用方法**：
```vue
<script setup>
import { onBeforeUnmount } from 'vue'

onBeforeUnmount(() => {
  console.log('组件即将卸载')
  // 执行最后的清理工作
})
</script>
```

**注意事项**：
- `onBeforeUnmount` 只会在组件卸载前执行一次
- 与 `onUnmounted` 相比，`onBeforeUnmount` 执行时组件仍然存在

## 组件相关 API

### defineProps

**功能特性**：定义组件的属性（props）。

**使用场景**：
- 当你需要从父组件接收数据
- 当你需要验证接收到的属性类型

**调用方法**：
```vue
<script setup>
const props = defineProps({
  // 基础类型验证
  msg: String,
  // 带有默认值的属性
  count: {
    type: Number,
    default: 0
  },
  // 必填属性
  id: {
    type: String,
    required: true
  }
})

// 使用 props
console.log(props.msg)
</script>
```

**注意事项**：
- `defineProps` 只能在 `<script setup>` 中使用
- 定义的 props 是响应式的
- 不要直接修改 props，应该通过 emit 事件通知父组件修改

### defineEmits

**功能特性**：定义组件的自定义事件。

**使用场景**：
- 当你需要向父组件发送消息
- 当你需要通知父组件更新数据

**调用方法**：
```vue
<script setup>
const emit = defineEmits(['update:count', 'submit'])

// 触发事件
const increment = () => {
  emit('update:count', count.value + 1)
}

const handleSubmit = () => {
  emit('submit', formData)
}
</script>
```

**注意事项**：
- `defineEmits` 只能在 `<script setup>` 中使用
- 事件名称应该使用 kebab-case 格式
- 可以使用对象语法定义事件验证

### defineExpose

**功能特性**：定义组件向外暴露的属性和方法。

**使用场景**：
- 当你需要让父组件访问子组件的属性或方法
- 当你在使用 `<script setup>` 语法时，需要显式暴露组件内部状态

**调用方法**：
```vue
<script setup>
import { ref, defineExpose } from 'vue'

const count = ref(0)
const increment = () => {
  count.value++
}

// 暴露属性和方法
defineExpose({
  count,
  increment
})
</script>
```

**注意事项**：
- `defineExpose` 只能在 `<script setup>` 中使用

### useAttrs

**功能特性**：获取组件的非 props 属性。

**使用场景**：
- 当你需要访问父组件传递的但未在 `defineProps` 中定义的属性
- 当你需要将这些属性传递给子组件

**调用方法**：
```vue
<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()

console.log(attrs.class) // 访问父组件传递的 class 属性
console.log(attrs.style) // 访问父组件传递的 style 属性
</script>
```

**注意事项**：
- `useAttrs` 只能在组合式 API 中使用
- 返回的 `attrs` 对象是响应式的
- 不要直接修改 `attrs` 对象，应该通过 `v-bind` 传递给子组件

## 工具函数 API

### toRefs

**功能特性**：将响应式对象转换为普通对象，其中每个属性都是指向原始对象相应属性的 ref。

**使用场景**：
- 当你需要解构响应式对象的属性，同时保持其响应性
- 当你需要将响应式对象的属性传递给子组件

**调用方法**：
```vue
<script setup>
import { reactive, toRefs } from 'vue'

const user = reactive({
  name: 'John',
  age: 30
})

// 将 reactive 对象转换为 refs
const { name, age } = toRefs(user)
</script>
```

**注意事项**：
- `toRefs` 只会为源对象中存在的属性创建 ref
- 如果源对象是非响应式的，`toRefs` 仍然会创建 ref，但这些 ref 不会触发更新
- 对于不存在的属性，`toRefs` 会创建一个值为 `undefined` 的 ref

### isRef

**功能特性**：检查一个值是否为 ref 对象。

**使用场景**：
- 当你需要判断一个值是否是 ref 类型
- 当你编写通用函数，需要处理可能是 ref 或非 ref 的值

**调用方法**：
```vue
<script setup>
import { ref, isRef } from 'vue'

const count = ref(0)
const message = 'Hello'

console.log(isRef(count)) // true
console.log(isRef(message)) // false
</script>
```

**注意事项**：
- `isRef` 对普通对象、数组、基本类型值等返回 `false`
- 只对使用 `ref` 创建的对象返回 `true`

### unref

**功能特性**：如果参数是 ref，则返回其值；否则返回参数本身。

**使用场景**：
- 当你需要获取一个可能是 ref 或非 ref 值的原始值
- 当你编写通用函数，需要处理可能是 ref 或非 ref 的值

**调用方法**：
```vue
<script setup>
import { ref, unref } from 'vue'

const count = ref(0)
const message = 'Hello'

console.log(unref(count)) // 0
console.log(unref(message)) // 'Hello'
</script>
```

**注意事项**：
- `unref` 是 `isRef(val) ? val.value : val` 的语法糖
- 对于嵌套的 ref（ref 中包含 ref），`unref` 只会解包一层

### watch

**功能特性**：监听响应式数据的变化，并在变化时执行回调函数。

**使用场景**：
- 当你需要在响应式数据变化时执行副作用
- 当你需要根据数据变化更新其他数据或状态

**调用方法**：
```vue
<script setup>
import { ref, watch } from 'vue'

const count = ref(0)

// 监听单个数据源
watch(count, (newValue, oldValue) => {
  console.log(`count 从 ${oldValue} 变为 ${newValue}`)
})

// 监听多个数据源
const name = ref('John')
watch([count, name], ([newCount, newName], [oldCount, oldName]) => {
  console.log(`count 从 ${oldCount} 变为 ${newCount}`)
  console.log(`name 从 ${oldName} 变为 ${newName}`)
})

// 监听对象的属性
const user = ref({
  name: 'John',
  age: 30
})
watch(() => user.value.age, (newValue, oldValue) => {
  console.log(`age 从 ${oldValue} 变为 ${newValue}`)
})
</script>
```

**注意事项**：
- `watch` 可以监听单个或多个数据源
- 可以通过配置选项（如 `immediate`、`deep`）调整监听行为
- 监听对象的属性时，需要使用 getter 函数
- 要停止监听，可以调用 `watch` 返回的停止函数

### watchEffect

**功能特性**：自动收集响应式依赖，并在依赖变化时重新执行。

**使用场景**：
- 当你需要执行一个副作用，并自动追踪其依赖
- 当你需要在多个响应式数据变化时执行相同的副作用

**调用方法**：
```vue
<script setup>
import { ref, watchEffect } from 'vue'

const count = ref(0)
const name = ref('John')

// 自动收集依赖
watchEffect(() => {
  console.log(`count: ${count.value}, name: ${name.value}`)
})

// 停止监听
const stop = watchEffect(() => {
  // ...
})
// 在需要时停止监听
// stop()
</script>
```

**注意事项**：
- `watchEffect` 会在创建时立即执行一次
- 自动收集响应式依赖，无需手动指定
- 可以通过 `onCleanup` 函数注册清理函数
- 要停止监听，可以调用 `watchEffect` 返回的停止函数

### nextTick

**功能特性**：在下次 DOM 更新循环结束后执行延迟回调。

**使用场景**：
- 当你需要在 DOM 更新后执行操作
- 当你需要获取更新后的 DOM 状态

**调用方法**：
```vue
<script setup>
import { ref, nextTick } from 'vue'

const count = ref(0)

const increment = async () => {
  count.value++
  // 此时 DOM 尚未更新
  console.log(document.getElementById('count').textContent) // 可能还是旧值

  // 等待 DOM 更新后执行
  await nextTick()
  console.log(document.getElementById('count').textContent) // 新值
}
</script>

<template>
  <div id="count">{{ count }}</div>
  <button @click="increment">增加</button>
</template>
```

**注意事项**：
- `nextTick` 返回一个 Promise，可以使用 `async/await` 或 `.then()`
- 在服务器端渲染（SSR）中，`nextTick` 会立即执行回调
- 避免过度使用 `nextTick`，可能会导致性能问题

## 总结

Vue 3 提供了丰富的 API，本章节介绍了最常用的一些 API，包括核心响应式 API、生命周期钩子、组件相关 API、指令 API 和工具函数 API。这些 API 是 Vue 3 开发的基础，掌握它们对于构建高效、可靠的 Vue 应用至关重要。

在实际开发中，你可能还会用到其他 API，建议查阅 Vue 3 官方文档以获取更全面的信息。