# Vue 3 响应式篇

## 响应式系统的基本概念

Vue 3的响应式系统是其核心特性之一，它允许我们声明式地将数据与DOM绑定。当数据发生变化时，DOM会自动更新，反之亦然。

Vue 3的响应式系统使用了ES6的Proxy API，相比Vue 2使用的Object.defineProperty，提供了更全面、更高效的响应式支持。

## 响应式数据的创建

### ref

`ref`用于创建基本类型的响应式数据（如数字、字符串、布尔值等）：

::: vue-demo Vue 交互演示 1

```vue
<script>
const { ref, computed } = Vue;

export default {
  setup() {
    const count = ref(0);
    const increment = () => {
      count.value++;
    };

    return {
      count,
      increment
    };
  }
}
</script>

<template>
  <div>
    <h1>计数器: {{ count }}</h1>
    <button @click="increment">增加</button>
  </div>
</template>
```

:::

### reactive

`reactive`用于创建对象类型的响应式数据：

::: vue-demo Vue 交互演示 2

```vue
<script>
const { reactive } = Vue;


export default {
  setup() {
    const user = reactive({
      name: '张三',
      age: 25
    });

    const updateUser = () => {
      user.name = '李四';
      user.age = 26;
    };

    return {
      user,
      updateUser
    };
  }
}
</script>

<template>
  <div>
    <h1>用户信息</h1>
    <p>姓名: {{ user.name }}</p>
    <p>年龄: {{ user.age }}</p>
    <button @click="updateUser">更新用户</button>
  </div>
</template>
```

:::

### ref vs reactive

- `ref`可以用于任何类型的数据，而`reactive`只能用于对象类型的数据
- 访问`ref`的值需要使用`.value`，而访问`reactive`对象的属性不需要
- 当`ref`存储的是对象时，Vue内部会自动将其转换为`reactive`对象

## 响应式数据的转换

### toRef

`toRef`用于将响应式对象的单个属性转换为`ref`：

```vue
<script setup>
import { reactive, toRef } from 'vue'

const user = reactive({
  name: '张三',
  age: 25
})

const nameRef = toRef(user, 'name')

// 修改nameRef的值会影响user.name
nameRef.value = '李四'
console.log(user.name) // 输出: 李四

// 修改user.name的值也会影响nameRef
user.name = '王五'
console.log(nameRef.value) // 输出: 王五
</script>
```

### toRefs

`toRefs`用于将响应式对象的所有属性转换为`ref`：

```vue
<script setup>
import { reactive, toRefs } from 'vue'

const user = reactive({
  name: '张三',
  age: 25
})

const { name, age } = toRefs(user)

// 修改name的值会影响user.name
name.value = '李四'
console.log(user.name) // 输出: 李四
</script>
```

## 计算属性

计算属性用于处理复杂的逻辑计算，并且会缓存结果：

::: vue-demo Vue 交互演示 3

```vue
<script>
const { ref, computed } = Vue;

export default {
  setup() {
    const price = ref(100);
    const discount = ref(0.8);

    const discountedPrice = computed(() => {
      return price.value * discount.value;
    });

    return {
      price,
      discount,
      discountedPrice
    };
  }
}
</script>

<template>
  <div>
    <h1>价格计算器</h1>
    <p>原始价格: {{ price }}</p>
    <p>折扣: {{ discount }}</p>
    <p>折扣后价格: {{ discountedPrice }}</p>
    <button @click="price += 10">提高价格</button>
    <button @click="discount -= 0.1">增加折扣</button>
  </div>
</template>
```

:::

## 监听数据变化

### watch

`watch`用于监听一个或多个数据的变化：

::: vue-demo Vue 交互演示 4

```vue
<script>
const { ref, watch } = Vue;

export default {
  setup() {
    const message = ref('');
    const log = ref('');

    watch(message, (newValue, oldValue) => {
      log.value = `消息从 ${oldValue} 变为 ${newValue}`;
    });

    return {
      message,
      log
    };
  }
}
</script>

<template>
  <div>
    <h1>监听演示</h1>
    <input v-model="message" placeholder="输入消息...">
    <p>{{ log }}</p>
  </div>
</template>
```

:::

### 监听多个数据

可以同时监听多个数据的变化：

```vue
<script setup>
import { ref, watch } from 'vue'

const count = ref(0)
const message = ref('Hello Vue 3!')

// 监听多个数据
watch([count, message], ([newCount, newMessage], [oldCount, oldMessage]) => {
  console.log(`计数从 ${oldCount} 变为 ${newCount}`)
  console.log(`消息从 ${oldMessage} 变为 ${newMessage}`)
})
</script>
```

### 监听对象的属性

可以监听响应式对象的特定属性：

```vue
<script setup>
import { reactive, watch } from 'vue'

const user = reactive({
  name: '张三',
  age: 25
})

// 监听对象的属性
watch(
  () => user.name,
  (newValue, oldValue) => {
    console.log(`姓名从 ${oldValue} 变为 ${newValue}`)
  }
)
</script>
```

### watchEffect

`watchEffect`用于监听响应式数据的变化，并自动追踪依赖：

```vue
<script setup>
import { ref, watchEffect } from 'vue'

const count = ref(0)
const message = ref('Hello Vue 3!')

// 自动追踪依赖
watchEffect(() => {
  console.log(`计数: ${count.value}, 消息: ${message.value}`)
})
</script>
```

## 响应式数据的最佳实践

### 1. 选择合适的响应式API

- 对于基本类型数据（数字、字符串、布尔值），使用`ref`
- 对于对象类型数据，使用`reactive`
- 对于从响应式对象中解构出来的属性，使用`toRef`或`toRefs`

### 2. 避免直接修改props

在组件中，不要直接修改props的值，应该通过 emits 事件通知父组件更新：

```vue
<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  count: { type: Number, required: true }
})

const emit = defineEmits(['update:count'])

const increment = () => {
  emit('update:count', props.count + 1)
}
</script>

<template>
  <button @click="increment">增加计数</button>
</template>
```

### 3. 避免深度嵌套的响应式对象

深度嵌套的响应式对象会降低性能，应该尽量保持响应式对象的扁平化：

```javascript
// 不推荐
const user = reactive({
  info: {
    personal: {
      name: '张三',
      age: 25
    }
  }
})

// 推荐
const userInfo = reactive({
  name: '张三',
  age: 25
})
```

### 4. 使用计算属性缓存计算结果

对于复杂的计算，使用计算属性而不是方法，以缓存计算结果：

```vue
<script setup>
import { ref, computed } from 'vue'

const items = ref([1, 2, 3, 4, 5])

// 使用计算属性缓存结果
const total = computed(() => {
  return items.value.reduce((sum, item) => sum + item, 0)
})
</script>
```

### 5. 谨慎使用watch

只在必要时使用watch，避免过度使用导致性能问题：

```vue
<script setup>
import { ref, watch } from 'vue'

const count = ref(0)

// 只在必要时使用watch
watch(count, (newValue) => {
  // 执行副作用操作
  console.log(`计数变为: ${newValue}`)
})
</script>
```

## 高级响应式特性

### 1. 自定义ref

可以创建自定义的ref，实现特殊的响应式行为：

```vue
<script setup>
import { customRef } from 'vue'

function useDebouncedRef(value, delay = 300) {
  let timeout
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      }
    }
  })
}

const searchQuery = useDebouncedRef('')
</script>
```

### 2. shallowRef 和 shallowReactive

- `shallowRef`：只响应`.value`的变化，不响应内部属性的变化
- `shallowReactive`：只响应顶层属性的变化，不响应嵌套属性的变化

```vue
<script setup>
import { shallowRef, shallowReactive } from 'vue'

const shallowCount = shallowRef(0)
const shallowUser = shallowReactive({
  name: '张三',
  address: {
    city: '北京'
  }
})
</script>
```

### 3. readonly 和 shallowReadonly

- `readonly`：创建一个只读的响应式对象
- `shallowReadonly`：创建一个顶层只读的响应式对象

```vue
<script setup>
import { readonly, shallowReadonly } from 'vue'

const user = reactive({
  name: '张三',
  age: 25
})

const readonlyUser = readonly(user)
const shallowReadonlyUser = shallowReadonly(user)
</script>
```

通过本章的学习，你应该对Vue 3的响应式系统有了全面的了解，包括如何创建响应式数据、转换响应式数据、计算属性、监听数据变化以及响应式系统的最佳实践和高级特性。这些知识将帮助你更高效地使用Vue 3开发响应式应用。