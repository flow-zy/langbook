# Vue 2 与 Vue 3 知识体系对比与学习指南

## 核心概念对比

### 响应式系统

| 特性 | Vue 2 | Vue 3 |
|------|-------|-------|
| 实现原理 | `Object.defineProperty` | `Proxy` API |
| 检测范围 | 仅能检测已定义属性的变化 | 可检测属性添加、删除、数组索引修改 |
| 数据类型支持 | 需区分对象和数组的处理方式 | 统一的响应式处理机制 |
| 深度响应式 | 递归遍历对象所有属性 | 懒加载式响应式（只在访问时创建代理） |

### API 风格

| Vue 2 (选项式API) | Vue 3 (组合式API) |
|-------------------|-------------------|
| 通过`data`、`methods`、`computed`等选项组织代码 | 通过`setup`函数和组合函数组织代码 |
| 代码按功能类型分离 | 代码按逻辑关注点组织 |
| 复用性通过mixins实现，易产生命名冲突 | 复用性通过自定义钩子函数实现，更清晰 |
| 不支持TypeScript类型推断 | 良好的TypeScript支持 |

## 响应式系统深入解析

### Vue 2 响应式的局限性

1. **对象属性添加/删除检测问题**
   ```javascript
   // Vue 2中，新增的属性不是响应式的
   this.newProperty = 'value'; // 不会触发视图更新
   
   // 解决方案: 使用Vue.set
   Vue.set(this.someObject, 'newProperty', 'value');
   ```

2. **数组操作限制**
   ```javascript
   // 以下操作不会触发视图更新
   this.items[index] = newValue; // 直接设置索引
   this.items.length = newLength; // 修改数组长度
   
   // 解决方案: 使用Vue.set或splice
   Vue.set(this.items, index, newValue);
   this.items.splice(index, 1, newValue);
   ```

### Vue 3 响应式的改进

1. **ref与reactive的区别**
   ```javascript
   // ref用于基本类型和单值对象
   const count = ref(0);
   console.log(count.value); // 需要使用.value访问
   
   // reactive用于复杂对象
   const user = reactive({ name: '张三', age: 25 });
   console.log(user.name); // 直接访问属性
   ```

2. **高级响应式工具**
   ```javascript
   // toRef: 将响应式对象的单个属性转为ref
   const nameRef = toRef(user, 'name');
   
   // toRefs: 将响应式对象的所有属性转为ref
   const { name, age } = toRefs(user);
   
   // shallowRef: 创建浅响应式数据
   const shallow = shallowRef({ deep: { nested: 'value' } });
   ```

## 组件生命周期

### 生命周期对比

| Vue 2 生命周期 | Vue 3 组合式API对应 |
|----------------|---------------------|
| beforeCreate   | 无直接对应 (setup中执行) |
| created        | 无直接对应 (setup中执行) |
| beforeMount    | onBeforeMount       |
| mounted        | onMounted           |
| beforeUpdate   | onBeforeUpdate      |
| updated        | onUpdated           |
| beforeDestroy  | onBeforeUnmount     |
| destroyed      | onUnmounted         |

### Vue 3 新增生命周期
- onRenderTracked: 跟踪虚拟DOM渲染时的依赖
- onRenderTriggered: 触发虚拟DOM重新渲染时的回调
- onErrorCaptured: 捕获组件错误时的回调

## 组件通信

### Vue 2 组件通信方式
1. 父子组件: props + events
2. 兄弟组件: event bus 或 父组件中转
3. 跨层级组件: provide/inject 或 Vuex

### Vue 3 组件通信改进
1. 保持props + events的基础通信
2. 提供更强大的provide/inject API
   ```javascript
   // 父组件提供数据
   const count = ref(0);
   provide('count', count);
   
   // 子组件注入数据
   const count = inject('count');
   ```
3. 新增emits选项，明确声明组件发出的事件
   ```javascript
   export default {
     emits: ['update:modelValue'],
     setup(props, { emit }) {
       emit('update:modelValue', newValue);
     }
   }
   ```

## 学习路径建议

### 基础阶段
1. 掌握HTML、CSS、JavaScript基础
2. 理解Vue 2的核心概念: 实例、模板语法、指令、组件
3. 学习Vue 3的基本用法，对比Vue 2的异同

### 进阶阶段
1. 深入理解响应式原理
2. 掌握Vue 3组合式API的高级用法
3. 学习TypeScript与Vue 3的结合使用
4. 熟悉Vue 3的性能优化技巧

### 实战阶段
1. 从Vue 2项目迁移到Vue 3
2. 使用Vue 3构建新的应用程序
3. 学习Vue 3生态系统(Vue Router 4, Pinia等)

## 常见知识盲点与解决方案

1. **响应式数据更新不触发视图**
   - Vue 2: 检查是否使用了Vue.set或数组变异方法
   - Vue 3: 检查是否正确使用ref.value或reactive对象

2. **组合式API中的this问题**
   - 解决方案: setup中没有this，使用props和context参数

3. **TypeScript类型推断问题**
   - 解决方案: 使用defineComponent和正确的类型注解

4. **性能优化**
   - Vue 2: 使用v-once, v-memo, 合理设置key
   - Vue 3: 利用shallowRef, shallowReactive, markRaw等优化响应式

通过系统学习以上内容，可以全面掌握Vue 2和Vue 3的核心知识点，弥补知识盲点，提升开发技能。