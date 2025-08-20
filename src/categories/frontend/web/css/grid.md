# Grid

## Grid 基本概念
Grid（网格布局）是一种二维布局模型，用于在容器中同时控制行和列的布局。它可以轻松实现复杂的网格结构，是 CSS 中最强大的布局工具之一。

::: normal-demo

```html
<div class="basic-grid">
  <div>项目 1</div>
  <div>项目 2</div>
  <div>项目 3</div>
  <div>项目 4</div>
  <div>项目 5</div>
  <div>项目 6</div>
</div>
```

```css
/* 基本网格示例 */
.basic-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 100px 100px;
  gap: 15px;
}

.basic-grid > div {
  background-color: #3498db;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}
```

:::

### 1. 启用 Grid
```css
.container {
  display: grid;
  /* 或者用于内联元素 */
  display: inline-grid;
}
```

### 2. Grid 容器和 Grid 项目
- **Grid 容器**：设置了 `display: grid` 的元素
- **Grid 项目**：Grid 容器的直接子元素

```html
<div class="container">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
  <div class="item">Item 4</div>
</div>
```

## Grid 容器属性

### 1. grid-template-columns 和 grid-template-rows
定义网格的列和行的大小。

::: normal-demo

```html
<div class="template-demo">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
</div>
```

```css
/* grid-template-columns 和 grid-template-rows 示例 */
.template-demo {
  display: grid;
  grid-template-columns: 100px 1fr 150px; /* 固定宽度、分数单位和混合使用 */
  grid-template-rows: 80px 120px; /* 两行不同高度 */
  gap: 10px;
  height: 220px;
}

.template-demo > div {
  background-color: #2ecc71;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

/* 响应式网格示例 */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
  margin-top: 20px;
}

.responsive-grid > div {
  background-color: #9b59b6;
  color: white;
  padding: 20px;
  text-align: center;
  border-radius: 4px;
}
```

:::

```css
.container {
  grid-template-columns: 100px 200px 100px; /* 三列，宽度分别为 100px, 200px, 100px */
  grid-template-rows: 50px 100px; /* 两行，高度分别为 50px, 100px */
}

/* 使用 fr 单位（分数单位） */
.container {
  grid-template-columns: 1fr 2fr 1fr; /* 三列，比例为 1:2:1 */
}

/* 使用 repeat 函数 */
.container {
  grid-template-columns: repeat(3, 1fr); /* 三列，每列 1fr */
  grid-template-columns: repeat(2, 100px 200px); /* 四列，100px, 200px, 100px, 200px */
}

/* 使用 auto-fit 和 auto-fill */
.container {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* 自动填充，最小宽度 200px */
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* 自动适应，最小宽度 200px */
}
```

### 2. grid-template-areas 和 grid-area
定义网格区域和项目所在的区域。

::: normal-demo
```html
<div class="layout-grid">
  <header class="header">头部</header>
  <aside class="sidebar">侧边栏</aside>
  <main class="main">主内容区</main>
  <div class="content">附加内容</div>
  <footer class="footer">页脚</footer>
</div>
```
```css
/* grid-template-areas 示例 */
.layout-grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header header"
    "sidebar main content"
    "footer footer footer";
  gap: 10px;
  height: 400px;
}

.header {
  grid-area: header;
  background-color: #3498db;
  color: white;
  padding: 20px;
  border-radius: 4px;
}

.sidebar {
  grid-area: sidebar;
  background-color: #2ecc71;
  color: white;
  padding: 20px;
  border-radius: 4px;
}

.main {
  grid-area: main;
  background-color: #e74c3c;
  color: white;
  padding: 20px;
  border-radius: 4px;
}

.content {
  grid-area: content;
  background-color: #f39c12;
  color: white;
  padding: 20px;
  border-radius: 4px;
}

.footer {
  grid-area: footer;
  background-color: #9b59b6;
  color: white;
  padding: 20px;
  border-radius: 4px;
}
```
:::

```css
.container {
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas: 
    "header header header"
    "sidebar main content"
    "footer footer footer";
}

.header {
  grid-area: header;
}

.sidebar {
  grid-area: sidebar;
}

.main {
  grid-area: main;
}

.content {
  grid-area: content;
}

.footer {
  grid-area: footer;
}
```

### 3. gap, row-gap, column-gap
设置网格项目之间的间距。

```css
.container {
  gap: 20px; /* 行和列间距都是 20px */
  row-gap: 10px; /* 行间距 10px */
  column-gap: 20px; /* 列间距 20px */
}
```

### 4. justify-items
控制网格项目在其单元格内的水平对齐方式。

::: normal-demo
```html
<div class="justify-items-demo">
  <h3>justify-items: stretch</h3>
  <div class="grid-container stretch">
    <div>1</div>    <div>2</div>    <div>3</div>
  </div>

  <h3>justify-items: start</h3>
  <div class="grid-container start">
    <div>1</div>    <div>2</div>    <div>3</div>
  </div>

  <h3>justify-items: end</h3>
  <div class="grid-container end">
    <div>1</div>    <div>2</div>    <div>3</div>
  </div>

  <h3>justify-items: center</h3>
  <div class="grid-container center">
    <div>1</div>    <div>2</div>    <div>3</div>
  </div>

  <h3>justify-items: baseline</h3>
  <div class="grid-container baseline">
    <div style="font-size: 20px;">1</div>    <div style="font-size: 16px;">2</div>    <div style="font-size: 12px;">3</div>
  </div>
</div>
```
```css
/* justify-items 示例 */
.justify-items-demo h3 {
  margin-top: 20px;
  margin-bottom: 10px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  gap: 10px;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 4px;
  width: 320px;
}

.grid-container.stretch {
  justify-items: stretch;
}

.grid-container.start {
  justify-items: start;
}

.grid-container.end {
  justify-items: end;
}

.grid-container.center {
  justify-items: center;
}

.grid-container.baseline {
  justify-items: baseline;
}

.grid-container > div {
  background-color: #3498db;
  color: white;
  padding: 10px;
  border-radius: 4px;
  width: auto;
}
```
:::

```css
.container {
  justify-items: stretch; /* 默认，拉伸填充单元格 */
  justify-items: start; /* 靠左对齐 */
  justify-items: end; /* 靠右对齐 */
  justify-items: center; /* 居中对齐 */
  justify-items: baseline; /* 基线对齐 */
}
```

### 5. align-items
控制网格项目在其单元格内的垂直对齐方式。

::: normal-demo
```html
<div class="align-items-demo">
  <h3>align-items: stretch</h3>
  <div class="grid-container stretch">
    <div>1</div>    <div>2<br>两行</div>    <div>3<br>三行<br>内容</div>
  </div>

  <h3>align-items: start</h3>
  <div class="grid-container start">
    <div>1</div>    <div>2<br>两行</div>    <div>3<br>三行<br>内容</div>
  </div>

  <h3>align-items: end</h3>
  <div class="grid-container end">
    <div>1</div>    <div>2<br>两行</div>    <div>3<br>三行<br>内容</div>
  </div>

  <h3>align-items: center</h3>
  <div class="grid-container center">
    <div>1</div>    <div>2<br>两行</div>    <div>3<br>三行<br>内容</div>
  </div>

  <h3>align-items: baseline</h3>
  <div class="grid-container baseline">
    <div style="font-size: 20px;">1</div>    <div style="font-size: 16px;">2</div>    <div style="font-size: 12px;">3</div>
  </div>
</div>
```
```css
/* align-items 示例 */
.align-items-demo h3 {
  margin-top: 20px;
  margin-bottom: 10px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: 100px;
  gap: 10px;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 4px;
  width: 320px;
}

.grid-container.stretch {
  align-items: stretch;
}

.grid-container.start {
  align-items: start;
}

.grid-container.end {
  align-items: end;
}

.grid-container.center {
  align-items: center;
}

.grid-container.baseline {
  align-items: baseline;
}

.grid-container > div {
  background-color: #2ecc71;
  color: white;
  padding: 10px;
  border-radius: 4px;
  width: auto;
}
```
:::

```css
.container {
  align-items: stretch; /* 默认，拉伸填充单元格 */
  align-items: start; /* 靠上对齐 */
  align-items: end; /* 靠下对齐 */
  align-items: center; /* 居中对齐 */
  align-items: baseline; /* 基线对齐 */
}
```

### 6. place-items
`justify-items` 和 `align-items` 的简写形式。

```css
.container {
  place-items: center; /* 水平和垂直都居中 */
  place-items: start end; /* 水平靠左，垂直靠下 */
}
```

### 7. justify-content
控制网格在容器内的水平对齐方式（当网格大小小于容器大小时有效）。

::: normal-demo
```html
<div class="justify-content-demo">
  <h3>justify-content: start</h3>
  <div class="grid-container start">
    <div>1</div>    <div>2</div>    <div>3</div>
  </div>

  <h3>justify-content: end</h3>
  <div class="grid-container end">
    <div>1</div>    <div>2</div>    <div>3</div>
  </div>

  <h3>justify-content: center</h3>
  <div class="grid-container center">
    <div>1</div>    <div>2</div>    <div>3</div>
  </div>

  <h3>justify-content: space-between</h3>
  <div class="grid-container space-between">
    <div>1</div>    <div>2</div>    <div>3</div>
  </div>

  <h3>justify-content: space-around</h3>
  <div class="grid-container space-around">
    <div>1</div>    <div>2</div>    <div>3</div>
  </div>

  <h3>justify-content: space-evenly</h3>
  <div class="grid-container space-evenly">
    <div>1</div>    <div>2</div>    <div>3</div>
  </div>
</div>
```
```css
/* justify-content 示例 */
.justify-content-demo h3 {
  margin-top: 20px;
  margin-bottom: 10px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 80px);
  gap: 10px;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 4px;
  width: 500px;
}

.grid-container.start {
  justify-content: start;
}

.grid-container.end {
  justify-content: end;
}

.grid-container.center {
  justify-content: center;
}

.grid-container.space-between {
  justify-content: space-between;
}

.grid-container.space-around {
  justify-content: space-around;
}

.grid-container.space-evenly {
  justify-content: space-evenly;
}

.grid-container > div {
  background-color: #e74c3c;
  color: white;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
}
```
:::

```css
.container {
  justify-content: stretch; /* 默认，拉伸填充容器 */
  justify-content: start; /* 靠左对齐 */
  justify-content: end; /* 靠右对齐 */
  justify-content: center; /* 居中对齐 */
  justify-content: space-between; /* 两端对齐，网格之间有相等的空间 */
  justify-content: space-around; /* 网格两侧有相等的空间 */
  justify-content: space-evenly; /* 网格之间有相等的空间 */
}
```

### 8. align-content
控制网格在容器内的垂直对齐方式（当网格大小小于容器大小时有效）。

::: normal-demo
```html
<div class="align-content-demo">
  <h3>align-content: start</h3>
  <div class="grid-container start">
    <div>1</div>    <div>2</div>    <div>3</div>    <div>4</div>    <div>5</div>    <div>6</div>
  </div>

  <h3>align-content: end</h3>
  <div class="grid-container end">
    <div>1</div>    <div>2</div>    <div>3</div>    <div>4</div>    <div>5</div>    <div>6</div>
  </div>

  <h3>align-content: center</h3>
  <div class="grid-container center">
    <div>1</div>    <div>2</div>    <div>3</div>    <div>4</div>    <div>5</div>    <div>6</div>
  </div>

  <h3>align-content: space-between</h3>
  <div class="grid-container space-between">
    <div>1</div>    <div>2</div>    <div>3</div>    <div>4</div>    <div>5</div>    <div>6</div>
  </div>

  <h3>align-content: space-around</h3>
  <div class="grid-container space-around">
    <div>1</div>    <div>2</div>    <div>3</div>    <div>4</div>    <div>5</div>    <div>6</div>
  </div>

  <h3>align-content: space-evenly</h3>
  <div class="grid-container space-evenly">
    <div>1</div>    <div>2</div>    <div>3</div>    <div>4</div>    <div>5</div>    <div>6</div>
  </div>
</div>
```
```css
/* align-content 示例 */
.align-content-demo h3 {
  margin-top: 20px;
  margin-bottom: 10px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 80px);
  grid-template-rows: 50px 50px;
  gap: 10px;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 4px;
  width: 300px;
  height: 300px;
}

.grid-container.start {
  align-content: start;
}

.grid-container.end {
  align-content: end;
}

.grid-container.center {
  align-content: center;
}

.grid-container.space-between {
  align-content: space-between;
}

.grid-container.space-around {
  align-content: space-around;
}

.grid-container.space-evenly {
  align-content: space-evenly;
}

.grid-container > div {
  background-color: #f39c12;
  color: white;
  padding: 15px;
  border-radius: 4px;
  text-align: center;
}
```
:::

```css
.container {
  align-content: stretch; /* 默认，拉伸填充容器 */
  align-content: start; /* 靠上对齐 */
  align-content: end; /* 靠下对齐 */
  align-content: center; /* 居中对齐 */
  align-content: space-between; /* 两端对齐，行之间有相等的空间 */
  align-content: space-around; /* 行两侧有相等的空间 */
  align-content: space-evenly; /* 行之间有相等的空间 */
}
```

### 9. place-content
`justify-content` 和 `align-content` 的简写形式。

```css
.container {
  place-content: center; /* 水平和垂直都居中 */
  place-content: start end; /* 水平靠左，垂直靠下 */
}
```

### 10. grid-auto-columns 和 grid-auto-rows
控制隐式创建的网格轨道（列和行）的大小。当项目数量超过显式定义的网格轨道时，会自动创建隐式轨道。

::: normal-demo
```html
<div class="auto-tracks-demo">
  <div>1</div>  <div>2</div>  <div>3</div>
  <div>4</div>  <div>5</div>  <div>6</div>
  <div>7</div>  <div>8</div>  <div>9</div>
</div>
```
```css
/* grid-auto-columns 和 grid-auto-rows 示例 */
.auto-tracks-demo {
  display: grid;
  grid-template-columns: 100px 100px;
  grid-template-rows: 80px 80px;
  grid-auto-columns: 150px; /* 隐式列宽为 150px */
  grid-auto-rows: 100px; /* 隐式行高为 100px */
  gap: 10px;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 4px;
}

.auto-tracks-demo > div {
  background-color: #3498db;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}
```
:::

### 11. grid-auto-flow
控制自动布局算法的工作方式，决定项目如何填充网格中未显式指定的位置。

::: normal-demo
```html
<div class="grid-auto-flow-demo">
  <div class="item1">1</div>
  <div class="item2">2</div>
  <div class="item3">3</div>
  <div class="item4">4</div>
  <div class="item5">5</div>
</div>
```
```css
/* grid-auto-flow 示例 */
.grid-auto-flow-demo {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(2, 80px);
  gap: 10px;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 4px;
  grid-auto-flow: dense; /* 尝试填充网格中的空白区域 */
}

.grid-auto-flow-demo > div {
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.item1 {
  grid-column: span 2;
  background-color: #3498db;
}

.item2 {
  background-color: #2ecc71;
}

.item3 {
  grid-row: span 2;
  background-color: #e74c3c;
}

.item4 {
  background-color: #f39c12;
}

.item5 {
  grid-column: span 2;
  background-color: #9b59b6;
}
```
:::

## Grid 项目属性

### 1. grid-column-start, grid-column-end, grid-row-start, grid-row-end
控制项目在网格中的位置和跨度。

```css
.item {
  grid-column-start: 1; /* 起始列线 */
  grid-column-end: 3; /* 结束列线（不包含） */
  grid-row-start: 1; /* 起始行线 */
  grid-row-end: 2; /* 结束行线（不包含） */
}

/* 简写形式 */
.item {
  grid-column: 1 / 3; /* 列起始 / 列结束 */
  grid-row: 1 / 2; /* 行起始 / 行结束 */
}

/* 使用 span 关键字 */
.item {
  grid-column: 1 / span 2; /* 从第 1 列开始，跨越 2 列 */
  grid-row: 1 / span 1; /* 从第 1 行开始，跨越 1 行 */
}
```

### 2. grid-column, grid-row
`grid-column-start`/`grid-column-end` 和 `grid-row-start`/`grid-row-end` 的简写形式。

```css
.item {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
}
```

### 3. grid-area
指定项目所在的网格区域，也可以用作 `grid-row-start`/`grid-column-start`/`grid-row-end`/`grid-column-end` 的简写。

::: normal-demo
```html
<div class="grid-area-demo">
  <div class="item1">1</div>
  <div class="item2">2</div>
  <div class="item3">3</div>
  <div class="item4">4</div>
  <div class="item5">5</div>
</div>
```
```css
/* grid-area 示例 */
.grid-area-demo {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 10px;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 4px;
}

.grid-area-demo > div {
  color: white;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
  font-size: 20px;
}

.item1 {
  background-color: #3498db;
  grid-area: 1 / 1 / 2 / 2; /* 行起始 / 列起始 / 行结束 / 列结束 */
}

.item2 {
  background-color: #2ecc71;
  grid-area: 1 / 2 / 2 / 4; /* 跨越两列 */
}

.item3 {
  background-color: #e74c3c;
  grid-area: 2 / 1 / 4 / 2; /* 跨越两行 */
}

.item4 {
  background-color: #f39c12;
  grid-area: 2 / 2 / 3 / 3;
}

.item5 {
  background-color: #9b59b6;
  grid-area: 2 / 3 / 4 / 4; /* 跨越两行 */
}
```
:::

## 网格项目的对齐

单个网格项目可以使用 `justify-self` 和 `align-self` 属性来覆盖容器的 `justify-items` 和 `align-items` 设置。

::: normal-demo
```html
<div class="item-alignment-demo">
  <div>默认对齐</div>
  <div class="start">靠上靠左</div>
  <div class="end">靠下靠右</div>
  <div class="center">居中对齐</div>
  <div class="baseline">基线对齐</div>
  <div class="stretch">拉伸填充</div>
</div>
```
```css
/* 项目对齐示例 */
.item-alignment-demo {
  display: grid;
  grid-template-columns: repeat(3, 150px);
  grid-template-rows: repeat(2, 100px);
  gap: 10px;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 4px;
  justify-items: stretch;
  align-items: stretch;
}

.item-alignment-demo > div {
  background-color: #34495e;
  color: white;
  padding: 10px;
  border-radius: 4px;
  width: auto;
}

.start {
  justify-self: start;
  align-self: start;
  background-color: #3498db;
}

.end {
  justify-self: end;
  align-self: end;
  background-color: #e74c3c;
}

.center {
  justify-self: center;
  align-self: center;
  background-color: #2ecc71;
}

.baseline {
  justify-self: baseline;
  align-self: baseline;
  background-color: #f39c12;
}

.stretch {
  justify-self: stretch;
  align-self: stretch;
  background-color: #9b59b6;
}
```
:::

## 复杂网格布局示例

::: normal-demo
```html
<div class="complex-layout">
  <header>网站头部</header>
  <nav>导航菜单</nav>
  <main>
    <article>主要内容</article>
    <section>相关内容</section>
  </main>
  <aside>侧边栏</aside>
  <footer>网站页脚</footer>
</div>
```
```css
/* 复杂网格布局示例 */
.complex-layout {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  gap: 10px;
  height: 400px;
}

.complex-layout > * {
  padding: 20px;
  border-radius: 4px;
  color: white;
}

header {
  grid-column: 1 / 4;
  background-color: #3498db;
}

nav {
  grid-column: 1 / 4;
  background-color: #2ecc71;
}

main {
  grid-column: 2 / 3;
  grid-row: 3 / 4;
  background-color: #e74c3c;
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
}

main article {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 15px;
  border-radius: 4px;
}

main section {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 4px;
}

aside {
  grid-column: 3 / 4;
  grid-row: 3 / 4;
  background-color: #f39c12;
}

footer {
  grid-column: 1 / 2;
  grid-row: 3 / 4;
  background-color: #9b59b6;
}
```
:::

## 响应式网格布局

::: normal-demo
```html
<div class="responsive-grid-layout">
  <div>卡片 1</div>
  <div>卡片 2</div>
  <div>卡片 3</div>
  <div>卡片 4</div>
  <div>卡片 5</div>
  <div>卡片 6</div>
</div>
<p class="resize-hint">尝试调整浏览器窗口大小，查看卡片布局变化</p>
```
```css
/* 响应式网格布局示例 */
.responsive-grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 4px;
}

.responsive-grid-layout > div {
  background-color: #3498db;
  color: white;
  padding: 30px;
  border-radius: 4px;
  text-align: center;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.resize-hint {
  margin-top: 10px;
  color: #666;
  font-style: italic;
  text-align: center;
}

/* 媒体查询进一步优化响应式布局 */
@media (max-width: 600px) {
  .responsive-grid-layout {
    grid-template-columns: 1fr;
  }
}
```
:::

## Grid 最佳实践

1. **语义化HTML**: 结合语义化HTML元素使用Grid，提高可访问性和SEO。
2. **合理规划网格结构**: 在开始编码前，先规划好网格的列数、行数和区域划分。
3. **使用fr单位**: 优先使用`fr`单位而非固定像素值，使布局更加灵活。
4. **利用repeat函数**: 使用`repeat()`函数简化重复的网格定义。
5. **响应式设计**: 结合`auto-fit`、`auto-fill`和媒体查询创建响应式布局。
6. **避免过度嵌套**: 尽量减少Grid容器的嵌套层级，保持HTML结构清晰。
7. **测试兼容性**: 虽然现代浏览器广泛支持Grid，但仍需测试旧浏览器的兼容性。

## 练习

1. 使用Grid创建一个响应式博客布局，包含头部、导航、主内容区、侧边栏和页脚。
2. 设计一个使用Grid的仪表板布局，包含多个大小不同的小部件。
3. 实现一个使用Grid的图片画廊，在不同屏幕尺寸下自动调整列数。
4. 创建一个使用Grid的表单布局，确保标签和输入字段对齐良好。
5. 使用Grid实现一个响应式卡片网格，在小屏幕上堆叠，中等屏幕上显示两列，大屏幕上显示三列或更多。

```css
.item {
  grid-area: 1 / 1 / 2 / 3; /* 行起始 / 列起始 / 行结束 / 列结束 */
}
```

### 4. justify-self
控制单个项目在其单元格内的水平对齐方式，覆盖容器的 `justify-items` 属性。

```css
.item {
  justify-self: stretch; /* 默认，继承容器的 justify-items */
  justify-self: start; /* 靠左对齐 */
  justify-self: end; /* 靠右对齐 */
  justify-self: center; /* 居中对齐 */
  justify-self: baseline; /* 基线对齐 */
}
```

### 5. align-self
控制单个项目在其单元格内的垂直对齐方式，覆盖容器的 `align-items` 属性。

```css
.item {
  align-self: stretch; /* 默认，继承容器的 align-items */
  align-self: start; /* 靠上对齐 */
  align-self: end; /* 靠下对齐 */
  align-self: center; /* 居中对齐 */
  align-self: baseline; /* 基线对齐 */
}
```

### 6. place-self
`justify-self` 和 `align-self` 的简写形式。

```css
.item {
  place-self: center; /* 水平和垂直都居中 */
  place-self: start end; /* 水平靠左，垂直靠下 */
}
```

## 交互式 Grid 布局演示

::: normal-demo
```html
<div class="interactive-grid-demo">
  <div class="grid-controls">
    <div class="control-group">
      <label for="columns">列数:</label>
      <input type="range" id="columns" min="1" max="6" value="3">
      <span id="columns-value">3</span>
    </div>
    <div class="control-group">
      <label for="row-height">行高 (px):</label>
      <input type="range" id="row-height" min="50" max="200" value="100">
      <span id="row-height-value">100</span>
    </div>
    <div class="control-group">
      <label for="gap">间距 (px):</label>
      <input type="range" id="gap" min="0" max="40" value="15">
      <span id="gap-value">15</span>
    </div>
    <div class="control-group">
      <label for="justify-content">水平对齐:</label>
      <select id="justify-content">
        <option value="start">start</option>
        <option value="center">center</option>
        <option value="end">end</option>
        <option value="space-between">space-between</option>
        <option value="space-around">space-around</option>
        <option value="space-evenly">space-evenly</option>
      </select>
    </div>
    <div class="control-group">
      <label for="align-content">垂直对齐:</label>
      <select id="align-content">
        <option value="start">start</option>
        <option value="center">center</option>
        <option value="end">end</option>
        <option value="space-between">space-between</option>
        <option value="space-around">space-around</option>
        <option value="space-evenly">space-evenly</option>
      </select>
    </div>
  </div>
  <div class="grid-preview-container">
    <div id="grid-preview">
      <div>1</div><div>2</div><div>3</div>
      <div>4</div><div>5</div><div>6</div>
      <div>7</div><div>8</div><div>9</div>
    </div>
    <div id="grid-code">
      .grid-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 100px);
        gap: 15px;
        justify-content: start;
        align-content: start;
      }
    </div>
  </div>
</div>
```
```css
/* 交互式 Grid 布局演示 */
.interactive-grid-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.grid-controls {
  flex: 1;
  min-width: 250px;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 5px;
}

.control-group {
  margin-bottom: 15px;
}

.control-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="range"], select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.grid-preview-container {
  flex: 2;
  min-width: 300px;
}

#grid-preview {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 100px);
  gap: 15px;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
  min-height: 345px;
  justify-content: start;
  align-content: start;
}

#grid-preview > div {
  background-color: #3498db;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 20px;
}

#grid-code {
  background-color: #2c3e50;
  color: white;
  padding: 15px;
  border-radius: 5px;
  font-family: monospace;
  text-align: left;
  margin-top: 20px;
}
```
```js
// 交互式 Grid 布局演示
const columnsInput = document.getElementById('columns');
const columnsValue = document.getElementById('columns-value');
const rowHeightInput = document.getElementById('row-height');
const rowHeightValue = document.getElementById('row-height-value');
const gapInput = document.getElementById('gap');
const gapValue = document.getElementById('gap-value');
const justifyContentSelect = document.getElementById('justify-content');
const alignContentSelect = document.getElementById('align-content');
const gridPreview = document.getElementById('grid-preview');
const gridCode = document.getElementById('grid-code');

// 更新网格预览
function updateGridPreview() {
  const columns = columnsInput.value;
  const rowHeight = rowHeightInput.value;
  const gap = gapInput.value;
  const justifyContent = justifyContentSelect.value;
  const alignContent = alignContentSelect.value;

  // 更新显示值
  columnsValue.textContent = columns;
  rowHeightValue.textContent = rowHeight;
  gapValue.textContent = gap;

  // 应用网格样式
  gridPreview.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  gridPreview.style.gridTemplateRows = `repeat(3, ${rowHeight}px)`;
  gridPreview.style.gap = `${gap}px`;
  gridPreview.style.justifyContent = justifyContent;
  gridPreview.style.alignContent = alignContent;

  // 更新代码显示
  gridCode.textContent = `
.grid-container {
  display: grid;
  grid-template-columns: repeat(${columns}, 1fr);
  grid-template-rows: repeat(3, ${rowHeight}px);
  gap: ${gap}px;
  justify-content: ${justifyContent};
  align-content: ${alignContent};
}
  `;
}

// 添加事件监听器
columnsInput.addEventListener('input', updateGridPreview);
rowHeightInput.addEventListener('input', updateGridPreview);
gapInput.addEventListener('input', updateGridPreview);
justifyContentSelect.addEventListener('change', updateGridPreview);
alignContentSelect.addEventListener('change', updateGridPreview);

// 初始化
updateGridPreview();
```
:::

## 常见布局模式

::: normal-demo

```html
<div class="layout-demo">
  <h3>1. 基本网格</h3>
  <div class="grid-1">
    <div>项目 1</div>
    <div>项目 2</div>
    <div>项目 3</div>
    <div>项目 4</div>
    <div>项目 5</div>
    <div>项目 6</div>
  </div>

  <h3>2. 响应式网格</h3>
  <div class="grid-2">
    <div>项目 1</div>
    <div>项目 2</div>
    <div>项目 3</div>
    <div>项目 4</div>
  </div>

  <h3>3. 两列布局</h3>
  <div class="grid-3">
    <div class="sidebar">侧边栏</div>
    <div class="main">主内容</div>
  </div>

  <h3>4. 页面布局</h3>
  <div class="grid-4">
    <header>页眉</header>
    <aside>侧边栏</aside>
    <main>主内容</main>
    <footer>页脚</footer>
  </div>
</div>
```

```css
/* 布局模式示例 */
.layout-demo > div {
  margin-bottom: 30px;
}

/* 1. 基本网格 */
.grid-1 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

/* 2. 响应式网格 */
.grid-2 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
}

/* 3. 两列布局 */
.grid-3 {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 15px;
  height: 200px;
}

.grid-3 .sidebar {
  background-color: #e74c3c;
}

.grid-3 .main {
  background-color: #3498db;
}

/* 4. 页面布局 */
.grid-4 {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  height: 300px;
  gap: 10px;
}

.grid-4 header {
  grid-area: header;
  background-color: #f39c12;
}

.grid-4 aside {
  grid-area: sidebar;
  background-color: #8e44ad;
}

.grid-4 main {
  grid-area: main;
  background-color: #2ecc71;
}

.grid-4 footer {
  grid-area: footer;
  background-color: #34495e;
}

/* 所有项目的公共样式 */
.grid-1 > div, .grid-2 > div, .grid-3 > div, .grid-4 > * {
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 10px;
}
```

:::

### 1. 基本网格
```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
```

### 2. 响应式网格
```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
```

### 3. 两列布局（侧边栏固定，主内容自适应）
```css
.container {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 20px;
}
```

### 4. 三列布局（两侧固定，中间自适应）
```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  gap: 20px;
}
```

### 5. 页面布局（页眉、页脚、侧边栏和主内容）
```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas: 
    "header header"
    "sidebar main"
    "footer footer";
  min-height: 100vh;
}

.header {
  grid-area: header;
}

.sidebar {
  grid-area: sidebar;
}

.main {
  grid-area: main;
}

.footer {
  grid-area: footer;
}
```

## 高级网格布局示例

::: normal-demo
```html
<div class="advanced-grid-demo">
  <h3>1. 瀑布流布局</h3>
  <div class="masonry-grid">
    <div style="height: 150px;">1</div>
    <div style="height: 200px;">2</div>
    <div style="height: 100px;">3</div>
    <div style="height: 250px;">4</div>
    <div style="height: 180px;">5</div>
    <div style="height: 120px;">6</div>
    <div style="height: 220px;">7</div>
    <div style="height: 160px;">8</div>
  </div>

  <h3>2. 卡片网格（带标题和描述）</h3>
  <div class="card-grid">
    <div class="card">
      <div class="card-image"></div>
      <div class="card-content">
        <h4>卡片标题 1</h4>
        <p>卡片描述内容，简短介绍卡片信息...</p>
      </div>
    </div>
    <div class="card">
      <div class="card-image"></div>
      <div class="card-content">
        <h4>卡片标题 2</h4>
        <p>卡片描述内容，简短介绍卡片信息...</p>
      </div>
    </div>
    <div class="card">
      <div class="card-image"></div>
      <div class="card-content">
        <h4>卡片标题 3</h4>
        <p>卡片描述内容，简短介绍卡片信息...</p>
      </div>
    </div>
    <div class="card">
      <div class="card-image"></div>
      <div class="card-content">
        <h4>卡片标题 4</h4>
        <p>卡片描述内容，简短介绍卡片信息...</p>
      </div>
    </div>
  </div>
</div>
```
```css
/* 高级网格布局示例 */
.advanced-grid-demo > h3 {
  margin-top: 30px;
  margin-bottom: 15px;
}

/* 1. 瀑布流布局 */
.masonry-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 10px; /* 基础行高 */
  gap: 15px;
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 5px;
}

.masonry-grid > div {
  background-color: #3498db;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 20px;
  grid-row: span 15; /* 默认跨度 */
}

/* 手动调整每个项目的跨度，模拟不同高度 */
.masonry-grid > div:nth-child(1) { grid-row: span 15; }
.masonry-grid > div:nth-child(2) { grid-row: span 20; background-color: #2ecc71; }
.masonry-grid > div:nth-child(3) { grid-row: span 10; background-color: #e74c3c; }
.masonry-grid > div:nth-child(4) { grid-row: span 25; background-color: #f39c12; }
.masonry-grid > div:nth-child(5) { grid-row: span 18; background-color: #9b59b6; }
.masonry-grid > div:nth-child(6) { grid-row: span 12; background-color: #34495e; }
.masonry-grid > div:nth-child(7) { grid-row: span 22; background-color: #1abc9c; }
.masonry-grid > div:nth-child(8) { grid-row: span 16; background-color: #d35400; }

/* 2. 卡片网格 */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.card {
  background-color: white;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-rows: 150px 1fr;
}

.card-image {
  background-color: #3498db;
}

.card-content {
  padding: 15px;
}

.card-content h4 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #333;
}

.card-content p {
  color: #666;
  margin: 0;
}
```
:::

## 最佳实践
- 对于二维布局，优先使用 Grid 而不是 Flexbox
- 使用 `fr` 单位和 `repeat` 函数创建灵活的网格
- 使用 `auto-fit` 和 `minmax` 实现响应式网格
- 对于复杂布局，使用 `grid-template-areas` 提高代码可读性
- 合理使用 `gap` 属性设置项目间距，避免使用 margin
- 理解 Grid 线的概念，它们是布局的基础
- 对于需要精确控制的场景，使用 `grid-column` 和 `grid-row` 手动定位项目
- 避免过度使用 Grid 嵌套，保持布局简洁
- 结合媒体查询创建真正响应式的网格布局
- 考虑性能优化，避免不必要的网格重排

## 练习
1. 创建一个基本的 3x3 网格
2. 实现一个响应式网格布局
3. 设计一个包含页眉、页脚、侧边栏和主内容的页面布局
4. 使用 `grid-template-areas` 创建复杂的布局
5. 实现一个具有不同跨度的网格项目
6. 设计一个具有多种对齐方式的网格布局

通过本章节的学习，你应该掌握 Grid 的核心概念和属性，能够使用 Grid 实现各种复杂的二维布局，创建灵活、响应式的页面结构。