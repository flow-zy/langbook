# Vue 2 实战项目

通过实战项目可以更好地巩固Vue 2的知识。本章将介绍一些常见的Vue 2实战项目及其实现思路。

## 待办事项应用 (Todo App)

待办事项应用是学习前端框架的经典项目，适合初学者上手。

### 功能需求

1. 添加新的待办事项
2. 标记待办事项为已完成/未完成
3. 删除待办事项
4. 筛选待办事项（全部/已完成/未完成）
5. 清除所有已完成的待办事项

### 实现思路

```javascript
new Vue({
  el: '#app',
  data: {
    todos: [
      { id: 1, text: '学习Vue 2', completed: false },
      { id: 2, text: '构建待办事项应用', completed: true }
    ],
    newTodoText: '',
    filter: 'all'
  },
  methods: {
    addTodo: function() {
      if (this.newTodoText.trim()) {
        this.todos.push({
          id: Date.now(),
          text: this.newTodoText.trim(),
          completed: false
        })
        this.newTodoText = ''
      }
    },
    deleteTodo: function(todo) {
      this.todos = this.todos.filter(item => item.id !== todo.id)
    },
    toggleTodo: function(todo) {
      todo.completed = !todo.completed
    },
    clearCompleted: function() {
      this.todos = this.todos.filter(item => !item.completed)
    }
  },
  computed: {
    filteredTodos: function() {
      if (this.filter === 'all') {
        return this.todos
      } else if (this.filter === 'active') {
        return this.todos.filter(item => !item.completed)
      } else if (this.filter === 'completed') {
        return this.todos.filter(item => item.completed)
      }
    }
  }
})
```

## 电商网站首页

创建一个电商网站首页，包含导航栏、轮播图、商品列表等常见电商元素。

### 功能模块

1. 导航栏：包含logo、分类菜单、搜索框、购物车等
2. 轮播图：展示促销活动
3. 商品分类：展示不同类别的商品
4. 商品列表：展示商品卡片，包含图片、名称、价格等信息
5. 页脚：包含联系信息、版权信息等

### 实现思路

使用Vue 2的组件化开发思想，将页面拆分为多个组件：

- `Navbar`组件：负责导航栏
- `Carousel`组件：负责轮播图
- `Category`组件：负责商品分类
- `ProductList`组件：负责商品列表
- `ProductCard`组件：负责商品卡片
- `Footer`组件：负责页脚

## 博客系统

创建一个简单的博客系统，包含文章列表、文章详情、分类、标签等功能。

### 功能需求

1. 文章列表：展示所有文章的标题、摘要、发布日期等
2. 文章详情：展示单篇文章的完整内容
3. 分类：按分类筛选文章
4. 标签：按标签筛选文章
5. 搜索：根据关键词搜索文章

### 实现思路

1. 使用Vue Router实现路由管理
2. 使用Vuex管理应用状态
3. 组件化开发：
   - `ArticleList`组件：文章列表
   - `ArticleDetail`组件：文章详情
   - `CategorySidebar`组件：分类侧边栏
   - `TagCloud`组件：标签云
   - `SearchBar`组件：搜索框

## 管理后台

创建一个管理后台，包含数据表格、表单、图表等常见后台元素。

### 功能模块

1. 登录页面
2. 仪表盘：展示关键数据和图表
3. 数据表格：展示和管理数据
4. 表单：添加和编辑数据
5. 导航菜单：管理不同功能模块

### 实现思路

1. 使用Vue Router实现路由管理和权限控制
2. 使用Vuex管理应用状态
3. 使用第三方UI库（如Element UI）加速开发
4. 使用Chart.js或ECharts实现数据可视化
5. 组件化开发：
   - `Login`组件：登录页面
   - `Dashboard`组件：仪表盘
   - `DataTable`组件：数据表格
   - `Form`组件：表单
   - `Sidebar`组件：侧边导航

## 项目实战建议

1. **从小项目开始**：先完成简单的项目，如待办事项应用，再逐步挑战更复杂的项目
2. **组件化开发**：将页面拆分为多个可复用的组件
3. **使用Vuex**：对于复杂的应用，使用Vuex管理状态
4. **使用Vue Router**：对于单页面应用，使用Vue Router管理路由
5. **学习使用第三方库**：如Element UI、Vuetify等，可以加速开发
6. **查看官方文档**：遇到问题时，优先查看Vue 2的官方文档
7. **参与开源项目**：通过参与开源项目，可以学习到更多实战经验

希望这些实战项目能帮助你更好地掌握Vue 2！