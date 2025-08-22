# Vue 与 TypeScript

Vue 与 TypeScript 的结合可以为 Vue 项目带来更好的类型安全性和开发体验。TypeScript 提供的静态类型检查可以帮助我们在开发过程中发现错误，提高代码的可维护性和可读性。本章将详细介绍如何在 Vue 项目中使用 TypeScript，包括项目初始化、组件定义、状态管理、事件处理等。

## 项目初始化
### 1. 使用 Vue CLI 创建 TypeScript 项目
```bash
# 安装 Vue CLI（如果尚未安装）
npm install -g @vue/cli

# 创建新项目
vue create my-vue-ts-app

# 选择 Manually select features
# 勾选 TypeScript
```

### 2. 使用 create-vue 创建 Vue TypeScript 项目
```bash
# 创建新项目
npm create vue@latest my-vue-ts-app

# 进入项目目录
cd my-vue-ts-app

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

> create-vue 是 Vue 3 官方推荐的新项目创建工具，提供了交互式的配置选项，包括是否使用 TypeScript、Vue Router、Pinia 等。

### 3. 使用 Vite 创建 Vue TypeScript 项目
```bash
# 创建 Vite 项目
npm create vite@latest my-vue-ts-app -- --template vue-ts

# 进入项目目录
cd my-vue-ts-app

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 组件定义
### 1. 选项式 API
```typescript
<script lang="ts">
import { defineComponent } from 'vue';

// 定义组件属性类型
interface HelloWorldProps {
  msg: string;
  count?: number;
}

// 定义组件数据类型
interface HelloWorldData {
  count: number;
}

export default defineComponent<HelloWorldProps, HelloWorldData>({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      count: this.count
    };
  },
  methods: {
    increment() {
      this.count++;
    }
  },
  mounted() {
    console.log('Component mounted');
  }
});
</script>

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>
```

### 2. 组合式 API
```typescript
<script lang="ts" setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue';

// 定义组件属性
const props = defineProps<{
  msg: string;
  initialCount?: number;
}>();

// 定义组件事件
const emit = defineEmits<{
  (e: 'update:count', value: number): void;
}>();

// 定义响应式状态
const count = ref<number>(props.initialCount || 0);

// 定义方法
const increment = () => {
  count.value++;
  emit('update:count', count.value);
};

// 生命周期钩子
onMounted(() => {
  console.log('Component mounted');
});
</script>

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>
```

## 状态管理
### 1. 使用 Vuex
```typescript
// store/index.ts
import { createStore } from 'vuex';

// 定义状态类型
interface State {
  count: number;
  todos: { id: number; text: string; completed: boolean }[];
}

export default createStore<State>({
  state: {
    count: 0,
    todos: []
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    addTodo(state, todo: { id: number; text: string; completed: boolean }) {
      state.todos.push(todo);
    }
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment');
      }, 1000);
    }
  },
  getters: {
    completedTodos(state) {
      return state.todos.filter(todo => todo.completed);
    }
  }
});
```

使用 Vuex：
```typescript
<script lang="ts" setup>
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    // 访问状态
    const count = store.state.count;

    // 提交 mutation
    const increment = () => {
      store.commit('increment');
    };

    // 分发 action
    const incrementAsync = () => {
      store.dispatch('incrementAsync');
    };

    return {
      count,
      increment,
      incrementAsync
    };
  }
};
</script>
```

### 2. 使用 Pinia
```typescript
// store/counter.ts
import { defineStore } from 'pinia';

// 定义状态类型
interface CounterState {
  count: number;
}

export const useCounterStore = defineStore<'counter', CounterState>('counter', {
  state: () => ({
    count: 0
  }),
  getters: {
    doubleCount(state) {
      return state.count * 2;
    }
  },
  actions: {
    increment() {
      this.count++;
    },
    incrementBy(amount: number) {
      this.count += amount;
    }
  }
});
```

使用 Pinia：
```typescript
<script lang="ts" setup>
import { useCounterStore } from './store/counter';

export default {
  setup() {
    const counterStore = useCounterStore();

    // 访问状态
    const count = counterStore.count;
    const doubleCount = counterStore.doubleCount;

    // 调用 action
    const increment = () => {
      counterStore.increment();
    };

    return {
      count,
      doubleCount,
      increment
    };
  }
};
</script>
```

## 事件处理
### 1. 基本事件处理
```typescript
<script lang="ts" setup>
import { ref } from 'vue';

const count = ref<number>(0);

// 事件处理函数
const handleClick = (event: MouseEvent) => {
  count.value++;
  console.log('Button clicked!', event);
};
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="handleClick">Click me</button>
  </div>
</template>
```

### 2. 表单事件处理
```typescript
<script lang="ts" setup>
import { ref } from 'vue';

const name = ref<string>('');
const email = ref<string>('');

// 表单提交处理
const handleSubmit = (event: SubmitEvent) => {
  event.preventDefault();
  console.log('Form submitted:', { name: name.value, email: email.value });
};
</script>

<template>
  <form @submit="handleSubmit">
    <div>
      <label>Name:</label>
      <input
        type="text"
        v-model="name"
        required
      />
    </div>
    <div>
      <label>Email:</label>
      <input
        type="email"
        v-model="email"
        required
      />
    </div>
    <button type="submit">Submit</button>
  </form>
</template>
```

## 高级主题
### 1. 泛型组件
```typescript
<script lang="ts" setup>
import { defineProps, h } from 'vue';

// 定义泛型组件属性
const props = defineProps<{
  items: Array<any>;
  renderItem: (item: any) => any;
}>();

// 渲染函数
const render = () => {
  return h('ul', props.items.map((item, index) => {
    return h('li', { key: index }, props.renderItem(item));
  }));
};
</script>

<template>
  <render />
</template>
```

使用泛型组件：
```typescript
<script lang="ts" setup>
import List from './List.vue';

const numbers = [1, 2, 3, 4, 5];
const strings = ['hello', 'world', 'typescript'];
</script>

<template>
  <div>
    <h2>Number List</h2>
    <List
      :items="numbers"
      :render-item="(n) => <span>{n}</span>"
    />

    <h2>String List</h2>
    <List
      :items="strings"
      :render-item="(s) => <span>{s}</span>"
    />
  </div>
</template>
```

### 2. 自定义指令
```typescript
// directives/focus.ts
import { Directive } from 'vue';

// 定义自定义指令
const focus: Directive = {
  mounted(el) {
    el.focus();
  }
};

export default focus;
```

注册和使用自定义指令：
```typescript
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import focus from './directives/focus';

const app = createApp(App);
app.directive('focus', focus);
app.mount('#app');
```

```html
<!-- 在组件中使用 -->
<input v-focus type="text" placeholder="This will be focused" />
```

## Vue 与 TypeScript 最佳实践
1. 为组件属性和状态定义明确的类型。
2. 优先使用组合式 API（`<script lang="ts" setup>`），它提供更好的 TypeScript 集成。
3. 使用 `defineProps` 和 `defineEmits` 明确组件的输入和输出。
4. 为事件处理函数指定正确的事件类型。
5. 使用 Pinia 替代 Vuex，它提供更好的类型安全性和开发体验。
6. 避免过度使用 `any` 类型。
7. 启用 `strict: true` 编译选项，提高类型安全性。
8. 为自定义指令和插件定义类型。
9. 使用 `ref` 和 `reactive` 时明确指定类型。
10. 为计算属性和方法指定返回类型。

## 练习
1. 创建一个使用 TypeScript 的 Vue 项目（使用 Vue CLI 或 Vite）。
2. 实现一个带有类型的选项式 API 组件和组合式 API 组件。
3. 使用 Vuex 或 Pinia 管理状态，明确指定类型。
4. 处理表单输入，为事件处理函数指定正确的类型。
5. 实现一个泛型组件。
6. 创建一个自定义指令，并为其定义类型。
7. 探索其他 Vue 与 TypeScript 结合的高级用法。

通过本章节的学习，你应该掌握了在 Vue 项目中使用 TypeScript 的基本方法和最佳实践，能够创建类型安全的 Vue 组件，提高代码质量和可维护性。