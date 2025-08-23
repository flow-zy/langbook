# Vue 3 组合式API篇

## 组合式API的基本概念

组合式API（Composition API）是Vue 3引入的新特性，它允许我们以函数式的方式组织组件逻辑，使代码更易于复用和维护。与Vue 2的选项式API（Options API）相比，组合式API提供了更灵活的代码组织方式，特别适合构建大型复杂应用。

## setup函数

`setup`函数是组合式API的入口点，它在组件创建之前执行：

```vue
<template>
  <div>
    <h1>{{ message }}</h1>
    <button @click="updateMessage">更新消息</button>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'MyComponent',
  setup() {
    // 创建响应式数据
    const message = ref('Hello Vue 3!')

    // 定义方法
    const updateMessage = () => {
      message.value = '你好，组合式API！'
    }

    // 返回需要在模板中使用的数据和方法
    return {
      message,
      updateMessage
    }
  }
}
</script>
```

### 语法糖：script setup

Vue 3.2+ 提供了`script setup`语法糖，使组合式API的使用更加简洁：

::: vue-demo Vue 交互演示 5

```vue
<script>
const { ref } = Vue;

export default {
  setup() {
    // 创建响应式数据
    const message = ref('Hello Vue 3!');

    // 定义方法
    const updateMessage = () => {
      message.value = '你好，script setup！'
    };

    // 返回需要在模板中使用的数据和方法
    return {
      message,
      updateMessage
    };
  }
}
</script>

<template>
  <div>
    <h1>{{ message }}</h1>
    <button @click="updateMessage">更新消息</button>
  </div>
</template>
```

:::

## 组合式API的核心功能

### 响应式数据

组合式API提供了`ref`和`reactive`两种创建响应式数据的方式：

- `ref`: 用于创建基本类型的响应式数据（数字、字符串、布尔值等）
- `reactive`: 用于创建对象类型的响应式数据

这些函数我们已经在[响应式篇](reactivity.md)中详细学习过。在组合式API中，它们是构建响应式界面的基础。

### 计算属性

`computed`函数用于创建计算属性，它会根据依赖的响应式数据自动更新：

```vue
<script setup>
import { ref, computed } from 'vue';

// 基本类型响应式数据
const count = ref(0);

// 计算属性 - 基于count的值计算双倍值
const doubledCount = computed(() => {
  // 当count的值变化时，这个函数会自动重新执行
  return count.value * 2;
});
</script>

<template>
  <div>
    <h1>计数: {{ count }}</h1>
    <h2>双倍计数: {{ doubledCount }}</h2> <!-- 自动更新 -->
    <button @click="count++">增加</button>
  </div>
</template>
```

### 数据监听

`watch`函数用于监听响应式数据的变化：

```vue
<script setup>
import { ref, watch } from 'vue';

const count = ref(0);
const log = ref('');

// 监听count的变化
watch(count, (newValue, oldValue) => {
  // 当count的值变化时，这个回调函数会被执行
  log.value = `计数从 ${oldValue} 变为 ${newValue}`;
  console.log(`计数从 ${oldValue} 变为 ${newValue}`);
});
</script>

<template>
  <div>
    <h1>计数: {{ count }}</h1>
    <p>{{ log }}</p> <!-- 显示变化日志 -->
    <button @click="count++">增加</button>
  </div>
</template>
```

### 生命周期钩子

在组合式API中，生命周期钩子以函数形式提供，需要从vue包中导入使用：

```vue
<script setup>
import { onMounted, onUpdated, onUnmounted } from 'vue'

// 组件挂载后执行
onMounted(() => {
  console.log('组件已挂载 - 可以访问DOM元素');
  // 这里适合执行初始化操作，如数据加载、事件监听等
})

// 组件更新后执行
onUpdated(() => {
  console.log('组件已更新 - DOM已经重新渲染');
  // 这里适合执行依赖于DOM更新的操作
})

// 组件卸载前执行
onBeforeUnmount(() => {
  console.log('组件即将卸载');
  // 这里适合执行清理操作，如移除事件监听、取消定时器等
})

// 组件卸载后执行
onUnmounted(() => {
  console.log('组件已卸载');
  // 这里适合执行最终清理操作
})
</script>
```

### 完整示例：计数器应用

::: vue-demo Vue 交互演示 6

```vue
<script>
const { ref, computed, watch, onMounted } = Vue;

export default {
  setup() {
    // 响应式数据
    const count = ref(0);

    // 计算属性
    const doubledCount = computed(() => count.value * 2);

    // 监听数据变化
    watch(count, (newValue, oldValue) => {
      console.log(`计数从 ${oldValue} 变为 ${newValue}`);
    });

    // 生命周期钩子
    onMounted(() => {
      console.log('计数器组件已挂载');
    });

    // 方法
    const increment = () => {
      count.value++;
    };

    const decrement = () => {
      count.value--;
    };

    // 返回需要在模板中使用的数据和方法
    return {
      count,
      doubledCount,
      increment,
      decrement
    };
  }
}
</script>

<template>
  <div class="counter-app">
    <h1>计数器应用</h1>
    <div class="counter-display">
      <p>当前计数: {{ count }}</p>
      <p>双倍计数: {{ doubledCount }}</p>
    </div>
    <div class="counter-controls">
      <button @click="decrement" :disabled="count <= 0">减少</button>
      <button @click="increment">增加</button>
    </div>
  </div>
</template>

<style scoped>
.counter-app {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.counter-display {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.counter-controls button {
  margin: 0 10px;
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.counter-controls button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
```

:::

## 自定义钩子函数

自定义钩子函数是组合式API中实现逻辑复用的核心机制。通过将组件中的可复用逻辑提取到独立的函数中，我们可以在多个组件中共享相同的功能。

### 基本自定义钩子函数示例

下面是一个简单的计数器自定义钩子函数：

```javascript
// useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  // 创建响应式数据
  const count = ref(initialValue)

  // 定义操作函数
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue

  // 定义计算属性
  const doubledCount = computed(() => count.value * 2)

  // 返回需要暴露的数据和方法
  return {
    count,
    increment,
    decrement,
    reset,
    doubledCount
  }
}
```

### 使用自定义钩子函数

在组件中使用自定义钩子函数非常简单：

```vue
<template>
  <div class="counter-component">
    <h1>计数: {{ count }}</h1>
    <h2>双倍计数: {{ doubledCount }}</h2>
    <div class="controls">
      <button @click="decrement" :disabled="count <= 0">减少</button>
      <button @click="reset">重置</button>
      <button @click="increment">增加</button>
    </div>
  </div>
</template>

<script setup>
// 导入自定义钩子函数
import { useCounter } from './useCounter'

// 使用自定义钩子函数，传入初始值10
const { count, increment, decrement, reset, doubledCount } = useCounter(10)
</script>

<style scoped>
.counter-component {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.controls button {
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.controls button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
```

### 自定义钩子函数的优势

1. **逻辑复用**：将相同的逻辑提取到一个地方，避免代码重复
2. **关注点分离**：每个钩子函数专注于一个特定的功能
3. **可维护性**：修改逻辑只需在一个地方进行
4. **可测试性**：自定义钩子函数可以单独测试
5. **类型安全**：与TypeScript配合使用时提供更好的类型推断

### 实战示例：表单验证钩子函数

下面是一个更复杂的自定义钩子函数，用于处理表单验证：

```javascript
// useFormValidation.js
import { ref, computed, watch } from 'vue'

export function useFormValidation(initialForm = {}) {
  // 表单数据
  const form = ref(initialForm)
  // 错误信息
  const errors = ref({})
  // 是否正在提交
  const isSubmitting = ref(false)
  // 表单是否有效
  const isValid = ref(true)
  // 验证规则
  const rules = ref({})

  // 设置验证规则
  const setRules = (newRules) => {
    rules.value = newRules
  }

  // 验证表单
  const validate = () => {
    let valid = true
    const newErrors = {}

    // 遍历所有规则
    for (const [field, fieldRules] of Object.entries(rules.value)) {
      for (const rule of fieldRules) {
        // 必填验证
        if (rule.required && !form.value[field]) {
          newErrors[field] = rule.message || `${field}是必填项`
          valid = false
          break
        }

        // 最小长度验证
        if (rule.minLength && form.value[field].length < rule.minLength) {
          newErrors[field] = rule.message || `${field}长度不能少于${rule.minLength}个字符`
          valid = false
          break
        }

        // 最大长度验证
        if (rule.maxLength && form.value[field].length > rule.maxLength) {
          newErrors[field] = rule.message || `${field}长度不能超过${rule.maxLength}个字符`
          valid = false
          break
        }

        // 正则表达式验证
        if (rule.pattern && !rule.pattern.test(form.value[field])) {
          newErrors[field] = rule.message || `${field}格式不正确`
          valid = false
          break
        }
      }
    }

    errors.value = newErrors
    isValid.value = valid
    return valid
  }

  // 提交表单
  const submit = async (onSubmit) => {
    // 先验证表单
    if (!validate()) return

    isSubmitting.value = true
    try {
      // 执行提交回调
      await onSubmit(form.value)
    } catch (error) {
      console.error('提交失败:', error)
    } finally {
      isSubmitting.value = false
    }
  }

  // 重置表单
  const reset = () => {
    form.value = { ...initialForm }
    errors.value = {}
    isValid.value = true
  }

  return {
    form,
    errors,
    isSubmitting,
    isValid,
    setRules,
    validate,
    submit,
    reset
  }
}
```

## 组合式API vs 选项式API

组合式API和选项式API是Vue中两种不同的组件开发方式，各有优缺点和适用场景。

### 核心差异

| 特性 | 组合式API | 选项式API |
|------|-----------|-----------|
| 代码组织方式 | 按功能逻辑组织 | 按选项类型组织（data、methods、computed等） |
| 逻辑复用机制 | 通过自定义钩子函数 | 通过mixins、extends |
| TypeScript支持 | 原生支持，类型推断更完善 | 需要额外配置，类型推断有限 |
| 代码分割 | 更容易提取和复用逻辑 | 较难分割和复用复杂逻辑 |
| 组件复杂度 | 更适合大型复杂组件 | 适合中小型简单组件 |
| 学习曲线 | 较陡峭，需要理解函数式编程思想 | 较平缓，基于对象配置更容易上手 |

### 适用场景

**组合式API更适合：**
- 大型复杂应用
- 需要频繁复用逻辑的场景
- 多人协作开发的项目
- 使用TypeScript的项目
- 对性能要求较高的应用

**选项式API更适合：**
- 小型简单应用
- 初学者快速上手
- 迁移Vue 2项目
- 简单的展示型组件

### 代码对比

**选项式API：**

```vue
<template>
  <div>
    <h1>{{ message }}</h1>
    <p>计数: {{ count }}</p>
    <button @click="increment">增加</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello Vue!',
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  computed: {
    doubledCount() {
      return this.count * 2
    }
  },
  mounted() {
    console.log('组件已挂载')
  }
}
</script>
```

**组合式API：**

```vue
<template>
  <div>
    <h1>{{ message }}</h1>
    <p>计数: {{ count }}</p>
    <p>双倍计数: {{ doubledCount }}</p>
    <button @click="increment">增加</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 响应式数据
const message = ref('Hello Vue 3!')
const count = ref(0)

// 计算属性
const doubledCount = computed(() => count.value * 2)

// 方法
const increment = () => {
  count.value++
}

// 生命周期钩子
onMounted(() => {
  console.log('组件已挂载')
})
</script>
```

## 实际示例：待办事项列表

下面是一个使用组合式API实现的完整待办事项列表示例，包含添加、删除、标记完成和过滤功能。我们使用Vue Playground提供交互式体验。

### 功能说明
- 添加新的待办事项
- 标记待办事项为已完成/未完成
- 删除待办事项
- 过滤显示全部/已完成/未完成的待办事项
- 统计剩余待办事项数量

::: vue-demo Vue 交互演示 7

```vue
<script>
const { ref, computed } = Vue;

export default {
  setup() {
    // 响应式数据 - 待办事项列表
    const todos = ref([
      { id: 1, text: '学习Vue 3', completed: false },
      { id: 2, text: '掌握组合式API', completed: false },
      { id: 3, text: '构建一个应用', completed: true }
    ]);

    // 响应式数据 - 新待办事项输入框
    const newTodoText = ref('');

    // 响应式数据 - 当前过滤条件
    const filter = ref('all');

    // 计算属性 - 根据当前过滤条件筛选后的待办事项
    const filteredTodos = computed(() => {
      switch (filter.value) {
        case 'active':
          return todos.value.filter(todo => !todo.completed);
        case 'completed':
          return todos.value.filter(todo => todo.completed);
        default:
          return todos.value;
      }
    });

    // 计算属性 - 剩余未完成的待办事项数量
    const remainingCount = computed(() => {
      return todos.value.filter(todo => !todo.completed).length;
    });

    // 添加新待办事项
    const addTodo = () => {
      if (newTodoText.value.trim()) {
        todos.value.push({
          id: Date.now(),
          text: newTodoText.value.trim(),
          completed: false
        });
        newTodoText.value = '';
      }
    };

    // 切换待办事项完成状态
    const toggleTodo = (id) => {
      const todo = todos.value.find(t => t.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    };

    // 删除待办事项
    const deleteTodo = (id) => {
      todos.value = todos.value.filter(t => t.id !== id);
    };

    // 清空已完成的待办事项
    const clearCompleted = () => {
      todos.value = todos.value.filter(t => !t.completed);
    };

    // 返回需要在模板中使用的数据和方法
    return {
      todos,
      newTodoText,
      filter,
      filteredTodos,
      remainingCount,
      addTodo,
      toggleTodo,
      deleteTodo,
      clearCompleted
    };
  }
}
</script>

<template>
  <div class="todo-app">
    <h1>待办事项列表</h1>
    
    <!-- 添加新待办事项 -->
    <div class="add-todo">
      <input
        v-model="newTodoText"
        placeholder="添加新的待办事项..."
        @keyup.enter="addTodo"
      >
      <button @click="addTodo">添加</button>
    </div>
    
    <!-- 过滤按钮 -->
    <div class="filters">
      <button
        :class="{ active: filter === 'all' }"
        @click="filter = 'all'"
      >
        全部
      </button>
      <button
        :class="{ active: filter === 'active' }"
        @click="filter = 'active'"
      >
        未完成
      </button>
      <button
        :class="{ active: filter === 'completed' }"
        @click="filter = 'completed'"
      >
        已完成
      </button>
    </div>
    
    <!-- 待办事项列表 -->
    <ul class="todo-list" v-if="filteredTodos.length > 0">
      <li v-for="todo in filteredTodos" :key="todo.id"
          :class="{ completed: todo.completed }">
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="() => toggleTodo(todo.id)"
        >
        <span>{{ todo.text }}</span>
        <button @click="() => deleteTodo(todo.id)">删除</button>
      </li>
    </ul>
    <p class="empty-message" v-else>没有匹配的待办事项</p>
    
    <!-- 统计信息和清空按钮 -->
    <div class="stats">
      <p>剩余: {{ remainingCount }} / {{ todos.length }}</p>
      <button @click="clearCompleted" :disabled="remainingCount === todos.length">
        清空已完成
      </button>
    </div>
  </div>
</template>

<style scoped>
.todo-app {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #333;
}

.add-todo {
  display: flex;
  margin-bottom: 20px;
  gap: 0;
}

.add-todo input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
}

.add-todo button {
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-size: 14px;
}

.add-todo button:hover {
  background-color: #3aa876;
}

.filters {
  display: flex;
  gap: 5px;
  margin-bottom: 15px;
  justify-content: center;
}

.filters button {
  padding: 6px 12px;
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.filters button.active {
  background-color: #42b983;
  color: white;
  border-color: #42b983;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-list li {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
  background-color: #f9f9f9;
  transition: background-color 0.2s;
}

.todo-list li:hover {
  background-color: #f0f0f0;
}

.todo-list li.completed span {
  text-decoration: line-through;
  color: #888;
}

.todo-list li input {
  margin-right: 10px;
  transform: scale(1.2);
}

.todo-list li span {
  flex: 1;
  margin-right: 10px;
}

.todo-list li button {
  padding: 5px 10px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.todo-list li button:hover {
  background-color: #e60000;
}

.stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #eee;
  color: #666;
}

.stats button {
  padding: 6px 12px;
  background-color: #f8f8f8;
  color: #666;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.stats button:hover:not(:disabled) {
  background-color: #e8e8e8;
}

.stats button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.empty-message {
  text-align: center;
  color: #888;
  font-style: italic;
  padding: 20px 0;
}
</style>
```

:::

### 代码解析

1. **响应式数据管理**：
   - 使用`ref`定义基本类型响应式数据（如`newTodoText`、`filter`）
   - 使用`ref`定义复杂类型响应式数据（如`todos`数组）
   - 使用`computed`创建派生状态（如`filteredTodos`、`remainingCount`）

2. **核心功能实现**：
   - `addTodo`: 添加新的待办事项，支持按Enter键快速添加
   - `toggleTodo`: 切换待办事项的完成状态
   - `deleteTodo`: 删除指定的待办事项
   - `clearCompleted`: 清空所有已完成的待办事项

3. **UI/UX优化**：
   - 添加过滤功能，支持查看全部、未完成和已完成的待办事项
   - 显示剩余待办事项统计信息
   - 为空列表添加友好提示
   - 为过滤按钮添加激活状态样式
   - 禁用状态处理（如清空按钮在没有已完成项时禁用）
   - 添加平滑的过渡动画和悬停效果

这个示例展示了如何使用组合式API构建一个功能完整、用户体验良好的待办事项应用，同时也演示了Vue 3中的核心概念和最佳实践。

## 组合式API的高级特性

### Provide/Inject

在组合式API中，我们可以使用`provide`和`inject`来实现组件间的数据传递，而不需要通过props逐层传递：

```vue
<!-- 祖先组件 -->
<script setup>
import { provide } from 'vue'

// 提供数据
provide('appTitle', 'Vue 3 组合式API示例')
provide('userInfo', {
  name: '张三',
  age: 25
})
</script>
```

```vue
<!-- 后代组件 -->
<script setup>
import { inject } from 'vue'

// 注入数据
const appTitle = inject('appTitle')
const userInfo = inject('userInfo')
</script>

<template>
  <div>
    <h1>{{ appTitle }}</h1>
    <p>用户名: {{ userInfo.name }}</p>
    <p>年龄: {{ userInfo.age }}</p>
  </div>
</template>
```

### 模板引用

在组合式API中，我们可以使用`ref`来获取DOM元素或组件实例的引用：

```vue
<template>
  <div>
    <h1 ref="titleRef">Hello Vue 3!</h1>
    <button @click="changeTitle">修改标题</button>
    <ChildComponent ref="childRef" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ChildComponent from './ChildComponent.vue'

// 创建引用
const titleRef = ref(null)
const childRef = ref(null)

// 在组件挂载后访问引用
onMounted(() => {
  console.log('标题元素:', titleRef.value)
  console.log('子组件实例:', childRef.value)
})

// 修改标题
const changeTitle = () => {
  titleRef.value.textContent = '你好，组合式API！'
}
</script>
```

### 复杂的自定义钩子函数示例

下面是一个更复杂的自定义钩子函数示例，用于处理表单验证：

```javascript
// useFormValidation.js
import { ref, computed, watch } from 'vue'

export function useFormValidation(initialForm = {}) {
  const form = ref(initialForm)
  const errors = ref({})
  const isSubmitting = ref(false)
  const isValid = ref(true)

  // 验证规则
  const rules = ref({})

  // 设置验证规则
  const setRules = (newRules) => {
    rules.value = newRules
  }

  // 验证表单
  const validate = () => {
    let valid = true
    const newErrors = {}

    for (const [field, fieldRules] of Object.entries(rules.value)) {
      for (const rule of fieldRules) {
        if (rule.required && !form.value[field]) {
          newErrors[field] = rule.message || `${field}是必填项`
          valid = false
          break
        }

        if (rule.minLength && form.value[field].length < rule.minLength) {
          newErrors[field] = rule.message || `${field}长度不能少于${rule.minLength}个字符`
          valid = false
          break
        }

        if (rule.maxLength && form.value[field].length > rule.maxLength) {
          newErrors[field] = rule.message || `${field}长度不能超过${rule.maxLength}个字符`
          valid = false
          break
        }

        if (rule.pattern && !rule.pattern.test(form.value[field])) {
          newErrors[field] = rule.message || `${field}格式不正确`
          valid = false
          break
        }
      }
    }

    errors.value = newErrors
    isValid.value = valid
    return valid
  }

  // 提交表单
  const submit = async (onSubmit) => {
    if (!validate()) return

    isSubmitting.value = true
    try {
      await onSubmit(form.value)
    } catch (error) {
      console.error('提交失败:', error)
    } finally {
      isSubmitting.value = false
    }
  }

  // 重置表单
  const reset = () => {
    form.value = { ...initialForm }
    errors.value = {}
    isValid.value = true
  }

  return {
    form,
    errors,
    isSubmitting,
    isValid,
    setRules,
    validate,
    submit,
    reset
  }
}
```

使用这个自定义钩子函数：

```vue
<template>
  <div class="form-container">
    <h1>用户注册</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">用户名</label>
        <input
          id="username"
          v-model="form.username"
          @blur="validate"
          placeholder="请输入用户名"
        >
        <p v-if="errors.username" class="error">{{ errors.username }}</p>
      </div>

      <div class="form-group">
        <label for="email">邮箱</label>
        <input
          id="email"
          v-model="form.email"
          @blur="validate"
          placeholder="请输入邮箱"
        >
        <p v-if="errors.email" class="error">{{ errors.email }}</p>
      </div>

      <div class="form-group">
        <label for="password">密码</label>
        <input
          id="password"
          type="password"
          v-model="form.password"
          @blur="validate"
          placeholder="请输入密码"
        >
        <p v-if="errors.password" class="error">{{ errors.password }}</p>
      </div>

      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? '提交中...' : '注册' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { useFormValidation } from './useFormValidation'

// 初始化表单验证
const { form, errors, isSubmitting, setRules, validate, submit } = useFormValidation({
  username: '',
  email: '',
  password: ''
})

// 设置验证规则
setRules({
  username: [
    { required: true, message: '用户名不能为空' },
    { minLength: 3, message: '用户名长度不能少于3个字符' },
    { maxLength: 20, message: '用户名长度不能超过20个字符' }
  ],
  email: [
    { required: true, message: '邮箱不能为空' },
    { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '请输入有效的邮箱地址' }
  ],
  password: [
    { required: true, message: '密码不能为空' },
    { minLength: 6, message: '密码长度不能少于6个字符' },
    { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, message: '密码必须包含字母和数字' }
  ]
})

// 处理表单提交
const handleSubmit = async () => {
  await submit(async (formData) => {
    // 模拟API请求
    console.log('提交表单数据:', formData)
    await new Promise(resolve => setTimeout(resolve, 1000))
    alert('注册成功！')
  })
}
</script>

<style scoped>
.form-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.error {
  color: #ff4d4f;
  margin: 5px 0 0 0;
  padding: 0;
  font-size: 14px;
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

## 组合式API的最佳实践

### 1. 按功能组织代码

将相关的逻辑、状态和方法组织在一起，而不是按类型（数据、方法、计算属性等）组织：

```javascript
// 推荐的方式
const count = ref(0)
const increment = () => count.value++
const doubledCount = computed(() => count.value * 2)

// 不推荐的方式
const count = ref(0)
const doubledCount = computed(() => count.value * 2)
const increment = () => count.value++
```

### 2. 使用自定义钩子函数复用逻辑

将可复用的逻辑提取到自定义钩子函数中，而不是复制粘贴代码：

```javascript
// useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue
  const doubledCount = computed(() => count.value * 2)

  return {
    count,
    increment,
    decrement,
    reset,
    doubledCount
  }
}
```

### 3. 避免过度使用ref和reactive

只将需要响应式的数据转换为ref或reactive，避免不必要的性能开销：

```javascript
// 推荐的方式
const count = ref(0) // 需要响应式
const config = { maxCount: 100 } // 不需要响应式

// 不推荐的方式
const count = ref(0)
const config = reactive({ maxCount: 100 }) // 不需要响应式
```

### 4. 使用toRefs优化组件props

当组件接收多个props时，可以使用`toRefs`将props转换为ref对象，方便在组件中使用：

```vue
<script setup>
import { toRefs } from 'vue'

export const props = defineProps({
  title: String,
  message: String,
  count: Number
})

// 将props转换为ref对象
const { title, message, count } = toRefs(props)
</script>
```

### 5. 避免在setup函数中使用this

在组合式API中，`this`不是组件实例，避免使用它：

```javascript
// 不推荐的方式
export default {
  setup() {
    // 这里的this不是组件实例
    console.log(this) // undefined
  }
}
```

## 小结

在本章中，我们学习了Vue 3的组合式API，包括：
- 组合式API的基本概念和优势
- `setup`函数和`script setup`语法糖的使用
- 组合式API的核心功能（响应式数据、计算属性、监听、生命周期钩子）
- 如何创建和使用自定义钩子函数
- 组合式API与选项式API的比较
- 实际示例：待办事项列表
- 高级特性：provide/inject、模板引用
- 复杂自定义钩子函数示例
- 组合式API的最佳实践

组合式API是Vue 3的重要特性，它提供了更灵活、更强大的方式来组织和复用组件逻辑，特别适合构建大型复杂应用。通过合理使用组合式API，我们可以编写出更清晰、更易于维护的代码。

下一章：[高级篇：动画、过渡、表单处理等高级特性](advanced.md)