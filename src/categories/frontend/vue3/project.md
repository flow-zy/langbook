# Vue 3 实战篇

## 项目概述

在本章中，我们将通过构建一个实际的Vue 3应用来巩固所学知识。这个应用是一个简单的博客系统，包含以下功能：

- 文章列表展示
- 文章详情查看
- 文章创建和编辑
- 文章删除
- 评论功能
- 用户登录和注册

## 项目结构

首先，让我们了解一下项目的基本结构：

```
my-blog/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── logo.png
│   ├── components/
│   │   ├── ArticleCard.vue
│   │   ├── CommentList.vue
│   │   ├── Navigation.vue
│   │   └── UserForm.vue
│   ├── router/
│   │   └── index.js
│   ├── store/
│   │   └── index.js
│   ├── views/
│   │   ├── Home.vue
│   │   ├── ArticleDetail.vue
│   │   ├── CreateArticle.vue
│   │   ├── EditArticle.vue
│   │   ├── Login.vue
│   │   └── Register.vue
│   ├── App.vue
│   └── main.js
├── package.json
└── README.md
```

## 项目初始化

我们使用Vite来初始化项目：

```bash
# 安装Vite
npm init vite@latest my-blog -- --template vue

# 进入项目目录
cd my-blog

# 安装依赖
npm install

# 安装路由和状态管理
npm install vue-router@4 pinia

# 启动开发服务器
npm run dev
```

## 路由配置

首先，我们需要配置路由：

```javascript
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ArticleDetail from '../views/ArticleDetail.vue'
import CreateArticle from '../views/CreateArticle.vue'
import EditArticle from '../views/EditArticle.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import { useAuthStore } from '../store/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/article/:id',
    name: 'ArticleDetail',
    component: ArticleDetail
  },
  {
    path: '/create',
    name: 'CreateArticle',
    component: CreateArticle,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/edit/:id',
    name: 'EditArticle',
    component: EditArticle,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      requiresGuest: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
  } else if (to.meta.requiresGuest && isAuthenticated) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
```

## 状态管理

我们使用Pinia来管理状态：

```javascript
// src/store/index.js
import { createPinia } from 'pinia'

export default createPinia()
```

```javascript
// src/store/auth.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = ref(false)

  const login = (userData) => {
    user.value = userData
    isAuthenticated.value = true
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('user')
  }

  const register = (userData) => {
    user.value = userData
    isAuthenticated.value = true
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const checkAuth = () => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      user.value = JSON.parse(storedUser)
      isAuthenticated.value = true
    }
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
    register,
    checkAuth
  }
})
```

```javascript
// src/store/articles.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useArticlesStore = defineStore('articles', () => {
  const articles = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchArticles = async () => {
    loading.value = true
    try {
      // 这里应该是API调用
      // 为了演示，我们使用模拟数据
      setTimeout(() => {
        articles.value = [
          {
            id: 1,
            title: 'Vue 3简介',
            content: 'Vue 3是一个用于构建用户界面的渐进式框架。',
            author: '张三',
            createdAt: '2023-01-01'
          },
          {
            id: 2,
            title: '组合式API详解',
            content: '组合式API是Vue 3引入的新特性，允许我们以函数式的方式组织组件逻辑。',
            author: '李四',
            createdAt: '2023-01-02'
          }
        ]
        loading.value = false
      }, 1000)
    } catch (err) {
      error.value = err.message
      loading.value = false
    }
  }

  const getArticleById = (id) => {
    return articles.value.find(article => article.id === parseInt(id))
  }

  const createArticle = (article) => {
    article.id = Date.now()
    article.createdAt = new Date().toISOString().split('T')[0]
    articles.value.push(article)
  }

  const updateArticle = (id, updatedArticle) => {
    const index = articles.value.findIndex(article => article.id === parseInt(id))
    if (index !== -1) {
      articles.value[index] = { ...articles.value[index], ...updatedArticle }
    }
  }

  const deleteArticle = (id) => {
    articles.value = articles.value.filter(article => article.id !== parseInt(id))
  }

  return {
    articles,
    loading,
    error,
    fetchArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle
  }
})
```

## 主组件

```vue
<!-- src/App.vue -->
<template>
  <div id="app">
    <Navigation />
    <main class="container mt-4">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Navigation from './components/Navigation.vue'
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.mt-4 {
  margin-top: 20px;
}
</style>
```

## 首页组件

```vue
<!-- src/views/Home.vue -->
<template>
  <div>
    <h1>博客首页</h1>
    <div v-if="loading">加载中...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="articles-container">
      <ArticleCard v-for="article in articles" :key="article.id" :article="article" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useArticlesStore } from '../store/articles'
import ArticleCard from '../components/ArticleCard.vue'

const articlesStore = useArticlesStore()
const { articles, loading, error, fetchArticles } = articlesStore

onMounted(() => {
  fetchArticles()
})
</script>

<style scoped>
.articles-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
</style>
```

## 文章卡片组件

```vue
<!-- src/components/ArticleCard.vue -->
<template>
  <div class="article-card">
    <h2>{{ article.title }}</h2>
    <p class="author">作者: {{ article.author }}</p>
    <p class="date">发布日期: {{ article.createdAt }}</p>
    <p class="content">{{ article.content.substring(0, 100) }}...</p>
    <router-link :to="{ name: 'ArticleDetail', params: { id: article.id } }" class="read-more">阅读更多</router-link>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  article: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.article-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.article-card:hover {
  transform: translateY(-5px);
}

h2 {
  margin-top: 0;
  color: #333;
}

.author,
.date {
  color: #666;
  font-size: 14px;
  margin: 5px 0;
}

.content {
  color: #444;
  margin: 10px 0;
}

.read-more {
  display: inline-block;
  color: #42b983;
  text-decoration: none;
  font-weight: bold;
  margin-top: 10px;
}
</style>
```

## 文章详情组件

```vue
<!-- src/views/ArticleDetail.vue -->
<template>
  <div class="article-detail">
    <div v-if="loading">加载中...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="article">
      <h1>{{ article.title }}</h1>
      <p class="author-date">作者: {{ article.author }} | 发布日期: {{ article.createdAt }}</p>
      <div class="content" v-html="article.content"></div>
      <div class="actions">
        <router-link :to="{ name: 'EditArticle', params: { id: article.id } }" class="btn edit-btn">编辑</router-link>
        <button @click="deleteArticle(article.id)" class="btn delete-btn">删除</button>
      </div>
      <hr>
      <h3>评论</h3>
      <CommentList :articleId="article.id" />
    </div>
    <div v-else>文章不存在</div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useArticlesStore } from '../store/articles'
import CommentList from '../components/CommentList.vue'

const route = useRoute()
const router = useRouter()
const articlesStore = useArticlesStore()
const { getArticleById, deleteArticle, loading, error } = articlesStore
let article = null

onMounted(() => {
  const id = route.params.id
  article = getArticleById(id)
})

const handleDelete = (id) => {
  if (confirm('确定要删除这篇文章吗？')) {
    deleteArticle(id)
    router.push({ name: 'Home' })
  }
}
</script>

<style scoped>
.article-detail {
  max-width: 800px;
  margin: 0 auto;
}

.author-date {
  color: #666;
  font-size: 14px;
  margin: 10px 0;
}

.content {
  line-height: 1.6;
  margin: 20px 0;
}

.actions {
  margin: 20px 0;
}

.btn {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  margin-right: 10px;
  cursor: pointer;
}

.edit-btn {
  background-color: #42b983;
  color: white;
}

.delete-btn {
  background-color: #ff4d4f;
  color: white;
  border: none;
}
</style>
```

## 项目总结

通过这个实战项目，我们学习了如何：

1. 使用Vite初始化Vue 3项目
2. 配置Vue Router进行路由管理
3. 使用Pinia进行状态管理
4. 创建和使用组件
5. 实现路由守卫
6. 模拟API调用
7. 实现CRUD操作
8. 处理用户认证

这个项目虽然简单，但涵盖了Vue 3开发中的许多核心概念和技术。在实际开发中，你可能还需要考虑更多的问题，如API集成、表单验证、错误处理、性能优化等。

希望这个实战项目能够帮助你巩固所学的Vue 3知识，并为你未来的Vue 3开发之旅打下坚实的基础。

祝你编码愉快！