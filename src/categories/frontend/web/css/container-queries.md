# 容器查询

## 容器查询基本概念
容器查询（Container Queries）允许我们根据容器的大小而不是视口的大小来应用样式。这使得组件可以根据其所在的上下文动态调整样式，提高了组件的复用性和灵活性。

::: normal-demo

```html
<div class="container-demo">
  <div class="card">
    <h3 class="card-title">容器查询示例</h3>
    <p class="card-content">调整容器大小查看效果</p>
  </div>
</div>
```

```css
/* 定义容器 */
.container-demo {
  container: card-container / inline-size;
  width: 100%;
  max-width: 500px;
  resize: horizontal;
  overflow: auto;
  border: 2px dashed #ccc;
  padding: 10px;
}

/* 初始样式 */
.card {
  padding: 1rem;
  border-radius: 8px;
  background-color: #f5f5f5;
}

/* 基于容器大小应用样式 */
@container card-container (min-width: 300px) {
  .card {
    display: flex;
    gap: 1rem;
    background-color: #e3f2fd;
  }
}

@container card-container (min-width: 400px) {
  .card {
    background-color: #bbdefb;
    padding: 1.5rem;
  }
  .card-title {
    font-size: 1.5rem;
  }
}
```

:::

### 1. 启用容器查询
要使用容器查询，首先需要定义一个容器。

```css
/* 定义容器 */
.container {
  container-type: inline-size; /* 基于内联方向的大小（水平方向） */
  /* 或者 */
  container-type: size; /* 基于内联和块方向的大小（水平和垂直方向） */
  /* 或者 */
  container-type: normal; /* 默认，不启用容器查询 */
}

/* 为容器命名（可选） */
.container {
  container-name: card;
  container-type: inline-size;
}

/* 简写形式 */
.container {
  container: card / inline-size;
}
```

### 2. 使用容器查询
定义容器后，可以使用 `@container` 规则应用基于容器大小的样式。

```css
/* 基本使用 */
@container (min-width: 300px) {
  .card {
    display: flex;
    gap: 1rem;
  }
}

/* 使用容器名称 */
@container card (min-width: 300px) {
  .card {
    display: flex;
    gap: 1rem;
  }
}

/* 组合条件 */
@container (min-width: 300px) and (max-width: 500px) {
  .card {
    padding: 1rem;
  }
}
```

## 容器查询相关属性

### 1. container-type
指定容器的类型，决定了容器查询基于哪个方向的大小。

```css
.container {
  container-type: normal; /* 默认，不启用容器查询 */
  container-type: size; /* 基于内联和块方向的大小 */
  container-type: inline-size; /* 基于内联方向的大小 */
  container-type: block-size; /* 基于块方向的大小 */
}
```

### 2. container-name
为容器指定名称，便于在容器查询中引用。

```css
.container {
  container-name: card;
  container-type: inline-size;
}
```

### 3. container
`container-name` 和 `container-type` 的简写形式。

```css
.container {
  container: card / inline-size;
}
```

### 4. @container 规则
应用基于容器大小的样式。

::: normal-demo
```html
<div class="container-rules-demo">
  <div class="item">容器规则示例</div>
</div>
```
```css
.container-rules-demo {
  container: rules-container / size;
  width: 100%;
  max-width: 500px;
  height: 300px;
  resize: both;
  overflow: auto;
  border: 2px dashed #ccc;
  padding: 10px;
}

.item {
  background-color: #e3f2fd;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

/* 基于容器宽度 */
@container rules-container (min-width: 300px) {
  .item {
    font-size: 1.2rem;
    background-color: #bbdefb;
  }
}

/* 基于容器高度 */
@container rules-container (min-height: 250px) {
  .item {
    padding: 2rem;
  }
}

/* 基于宽高比 */
@container rules-container (aspect-ratio: 16/9) {
  .item {
    background-color: #90caf9;
    flex-direction: row;
    gap: 1rem;
  }
}

/* 基于方向 */
@container rules-container (orientation: landscape) {
  .item {
    color: #1565c0;
  }
}

/* 组合条件 */
@container rules-container (min-width: 400px) and (min-height: 250px) {
  .item {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #64b5f6;
  }
}
```
:::

```css
/* 基于容器宽度 */
@container (min-width: 300px) {
  .item {
    font-size: 1.2rem;
  }
}

/* 基于容器高度 */
@container (min-height: 400px) {
  .item {
    height: 100%;
  }
}

/* 基于宽高比 */
@container (aspect-ratio: 16/9) {
  .item {
    background-image: url("wide-image.jpg");
  }
}

/* 基于方向 */
@container (orientation: landscape) {
  .item {
    flex-direction: row;
  }
}
```

### 5. 容器单位
容器查询支持一些特殊的单位，用于相对于容器的大小。

::: normal-demo

```html
<div class="container-units">
  <div class="item">容器单位示例</div>
</div>
```

```css
.container-units {
  container: units-container / inline-size;
  width: 100%;
  max-width: 500px;
  height: 300px;
  resize: horizontal;
  overflow: auto;
  border: 2px dashed #ccc;
  padding: 10px;
}

.item {
  width: 50cqw; /* 容器宽度的 50% */
  height: 50cqh; /* 容器高度的 50% */
  font-size: 5cqmin; /* 容器宽度和高度中较小值的 5% */
  padding: 2cqmax; /* 容器宽度和高度中较大值的 2% */
  background-color: #ffecb3;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

:::

```css
.item {
  width: 10cqw; /* 容器宽度的 10% */
  height: 10cqh; /* 容器高度的 10% */
  font-size: 5cqmin; /* 容器宽度和高度中较小值的 5% */
  padding: 2cqmax; /* 容器宽度和高度中较大值的 2% */
}
```

## 容器查询的应用场景

### 1. 响应式卡片组件
::: normal-demo

```html
<div class="card-container">
  <div class="card">
    <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><rect width='100' height='100' fill='%233498db'/></svg>" alt="示例图片">
    <div class="card-content">
      <h3 class="card-title">响应式卡片</h3>
      <p>这是一个使用容器查询的响应式卡片组件。调整容器大小可以看到卡片布局的变化。</p>
    </div>
  </div>
</div>
```

```css
.card-container {
  container: card / inline-size;
  width: 100%;
  max-width: 600px;
  resize: horizontal;
  overflow: auto;
  border: 2px dashed #ccc;
  padding: 10px;
}

.card {
  padding: 1rem;
  border-radius: 8px;
  background-color: #f5f5f5;
}

.card img {
  max-width: 100%;
  border-radius: 4px;
}

@container card (min-width: 350px) {
  .card {
    display: flex;
    gap: 1rem;
  }
  .card img {
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
}

@container card (min-width: 500px) {
  .card {
    background-color: #e8f5e9;
    padding: 1.5rem;
  }
  .card-title {
    font-size: 1.5rem;
    color: #2e7d32;
  }
  .card-content {
    font-size: 1.1rem;
  }
}
```

:::

### 2. 嵌套容器查询
容器查询可以嵌套，允许在一个容器内根据子容器的大小应用样式。

::: normal-demo
```html
<div class="outer-container">
  <div class="inner-container">
    <div class="item">嵌套容器查询示例</div>
  </div>
</div>
```
```css
.outer-container {
  container: outer / inline-size;
  width: 100%;
  max-width: 600px;
  resize: horizontal;
  overflow: auto;
  border: 2px dashed #ccc;
  padding: 20px;
}

.inner-container {
  container: inner / inline-size;
  width: 80%;
  margin: 0 auto;
  border: 2px solid #90caf9;
  padding: 10px;
}

.item {
  padding: 1rem;
  background-color: #e3f2fd;
  border-radius: 8px;
  text-align: center;
}

/* 基于外部容器 */
@container outer (min-width: 400px) {
  .inner-container {
    background-color: #bbdefb;
  }
}

/* 基于内部容器 */
@container inner (min-width: 300px) {
  .item {
    background-color: #90caf9;
    font-size: 1.2rem;
  }
}

/* 组合条件 */
@container outer (min-width: 500px) and inner (min-width: 350px) {
  .item {
    background-color: #64b5f6;
    color: white;
    padding: 1.5rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
}
```
:::

### 3. 容器查询与Grid布局
结合容器查询和Grid布局，可以创建更加灵活的响应式布局。

::: normal-demo
```html
<div class="grid-container">
  <div class="grid-item">1</div>
  <div class="grid-item">2</div>
  <div class="grid-item">3</div>
  <div class="grid-item">4</div>
  <div class="grid-item">5</div>
  <div class="grid-item">6</div>
</div>
```
```css
.grid-container {
  container: grid / inline-size;
  width: 100%;
  max-width: 800px;
  resize: horizontal;
  overflow: auto;
  border: 2px dashed #ccc;
  padding: 10px;
}

.grid-item {
  background-color: #ffecb3;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  font-size: 1.2rem;
}

/* 基本网格布局 */
@container grid (max-width: 300px) {
  .grid-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
  }
}

/* 中等宽度容器 */
@container grid (min-width: 301px) and (max-width: 500px) {
  .grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
  .grid-item {
    background-color: #ffe082;
  }
}

/* 宽容器 */
@container grid (min-width: 501px) {
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  .grid-item {
    background-color: #ffd54f;
  }

  /* 特定项目样式 */
  .grid-item:nth-child(1) {
    grid-column: span 2;
  }

  .grid-item:nth-child(6) {
    grid-column: span 3;
  }
}
```
:::

### 4. 响应式导航菜单
使用容器查询创建响应式导航菜单，根据容器宽度调整布局。

::: normal-demo
```html
<nav class="nav-container">
  <div class="logo">Logo</div>
  <ul class="nav-menu">
    <li><a href="#">首页</a></li>
    <li><a href="#">产品</a></li>
    <li><a href="#">服务</a></li>
    <li><a href="#">关于我们</a></li>
    <li><a href="#">联系我们</a></li>
  </ul>
  <button class="mobile-menu-btn">菜单</button>
</nav>
```
```css
.nav-container {
  container: nav / inline-size;
  width: 100%;
  max-width: 900px;
  resize: horizontal;
  overflow: auto;
  border: 2px dashed #ccc;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #3498db;
}

.nav-menu {
  list-style: none;
  padding: 0;
  margin: 10px 0 0 0;
}

.nav-menu li {
  margin-bottom: 8px;
}

.nav-menu a {
  text-decoration: none;
  color: #333;
  padding: 8px 12px;
  display: block;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-menu a:hover {
  background-color: #e3f2fd;
  color: #3498db;
}

.mobile-menu-btn {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* 中等宽度容器 - 水平菜单 */
@container nav (min-width: 500px) {
  .nav-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav-menu {
    display: flex;
    margin: 0;
  }

  .nav-menu li {
    margin: 0 0 0 10px;
  }

  .mobile-menu-btn {
    display: none;
  }
}

/* 宽容器 - 增强样式 */
@container nav (min-width: 700px) {
  .nav-menu a {
    padding: 10px 15px;
    font-size: 1.1rem;
  }

  .nav-menu a:hover {
    background-color: #3498db;
    color: white;
  }
}
```
```javascript
// 移动端菜单切换功能
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn.addEventListener('click', () => {
  navMenu.style.display = navMenu.style.display === 'none' ? 'block' : 'none';
});

// 调整容器大小时重置菜单显示状态
window.addEventListener('resize', () => {
  const containerWidth = document.querySelector('.nav-container').clientWidth;
  if (containerWidth >= 500) {
    navMenu.style.display = 'flex';
  } else {
    navMenu.style.display = 'none';
  }
});

// 初始化菜单显示状态
window.dispatchEvent(new Event('resize'));
```
:::

## 容器查询的最佳实践

1. **明确容器范围**：为容器指定明确的名称，提高代码可读性
2. **合理选择容器类型**：根据需求选择 `inline-size`、`block-size` 或 `size`
3. **避免过度查询**：不要创建过多的容器查询条件，保持样式简洁
4. **结合媒体查询**：容器查询不能完全替代媒体查询，两者结合使用效果更佳
5. **测试不同场景**：在不同容器大小和布局下测试容器查询的效果
6. **使用容器单位**：利用 `cqw`、`cqh`、`cqmin` 和 `cqmax` 单位创建相对于容器的尺寸
7. **注意性能**：虽然容器查询性能良好，但仍需注意避免不必要的复杂查询

## 练习

1. 创建一个使用容器查询的响应式卡片组件
2. 实现一个嵌套容器查询的布局
3. 结合容器查询和Grid布局创建响应式网格
4. 使用容器查询实现一个响应式导航菜单
5. 尝试使用容器单位创建自适应的元素大小
6. 比较容器查询和媒体查询的差异，思考各自的适用场景

通过本章节的学习，你应该掌握容器查询的概念、用法和应用场景，能够使用容器查询创建更加灵活和可复用的组件，提高网页的响应式设计能力。


```css
.card-container {
  container: card / inline-size;
  width: 100%;
  max-width: 500px;
}

.card {
  padding: 1rem;
  border-radius: 8px;
  background-color: #f5f5f5;
}

@container card (min-width: 300px) {
  .card {
  display: flex;
  gap: 1rem;
  }
}

@container card (min-width: 400px) {
  .card-title {
  font-size: 1.5rem;
  }
  .card-content {
  font-size: 1.1rem;
  }
}
```

### 2. 嵌套容器查询
```css
.outer-container {
  container: outer / inline-size;
  width: 100%;
  max-width: 800px;
}

.inner-container {
  container: inner / inline-size;
  width: 50%;
}

@container outer (min-width: 600px) {
  .inner-container {
    width: 75%;
  }
}

@container inner (min-width: 300px) {
  .item {
    display: flex;
  }
}
```

### 3. 与媒体查询结合
```css
/* 媒体查询 - 基于视口大小 */
@media (min-width: 768px) {
  .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

/* 容器查询 - 基于容器大小 */
@container (min-width: 300px) {
  .card {
    display: flex;
    gap: 1rem;
  }
}
```

## 最佳实践
- 优先使用 `inline-size` 类型的容器，它具有更好的性能
- 为容器指定有意义的名称，提高代码可读性
- 结合容器单位（如 `cqw`, `cqh`）使用，实现更灵活的布局
- 合理嵌套容器查询，实现复杂的响应式设计
- 容器查询和媒体查询结合使用，分别处理全局布局和局部组件
- 注意容器查询的兼容性，为不支持的浏览器提供回退样式
- 避免过度使用容器查询，以免影响性能

## 练习
1. 定义不同类型的容器并测试容器查询
2. 实现一个基于容器大小的响应式卡片组件
3. 创建嵌套容器查询的复杂布局
4. 结合媒体查询和容器查询实现完整的响应式设计
5. 使用容器单位实现自适应的元素大小
6. 为不支持容器查询的浏览器设计回退方案

通过本章节的学习，你应该掌握容器查询的核心概念和使用方法，能够利用容器查询创建更加灵活、可复用的组件，实现基于容器大小的响应式设计。