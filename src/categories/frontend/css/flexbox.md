# Flexbox

## Flexbox 基本概念
Flexbox（弹性盒布局）是一种一维布局模型，用于在容器中分配空间并对齐项目。它可以轻松实现水平和垂直居中，以及灵活的空间分配。

::: normal-demo

```html
<div class="basic-flex">
  <div>项目 1</div>
  <div>项目 2</div>
  <div>项目 3</div>
</div>
```

```css
/* 基本Flexbox示例 */
.basic-flex {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.basic-flex > div {
  background-color: #3498db;
  color: white;
  padding: 20px;
  border-radius: 4px;
  flex: 1;
  text-align: center;
}
```

:::

### 1. 启用 Flexbox
```css
.container {
  display: flex;
  /* 或者用于内联元素 */
  display: inline-flex;
}
```

### 2. Flex 容器和 Flex 项目
- **Flex 容器**：设置了 `display: flex` 的元素
- **Flex 项目**：Flex 容器的直接子元素

```html
<div class="container">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
</div>
```

## Flex 容器属性

### 1. flex-direction
指定 Flex 项目的排列方向。

::: normal-demo

```html
<div class="direction-demo">
  <h3>flex-direction: row</h3>
  <div class="flex-container row">
    <div>1</div>
    <div>2</div>
    <div>3</div>
  </div>

  <h3>flex-direction: row-reverse</h3>
  <div class="flex-container row-reverse">
    <div>1</div>
    <div>2</div>
    <div>3</div>
  </div>

  <h3>flex-direction: column</h3>
  <div class="flex-container column">
    <div>1</div>
    <div>2</div>
    <div>3</div>
  </div>

  <h3>flex-direction: column-reverse</h3>
  <div class="flex-container column-reverse">
    <div>1</div>
    <div>2</div>
    <div>3</div>
  </div>
</div>
```

```css
/* flex-direction 示例 */
.direction-demo h3 {
  margin-top: 20px;
  margin-bottom: 10px;
}

.flex-container {
  display: flex;
  gap: 10px;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 4px;
  height: 100px;
  align-items: center;
}

.flex-container.row {
  flex-direction: row;
}

.flex-container.row-reverse {
  flex-direction: row-reverse;
}

.flex-container.column {
  flex-direction: column;
  height: 200px;
}

.flex-container.column-reverse {
  flex-direction: column-reverse;
  height: 200px;
}

.flex-container > div {
  background-color: #2ecc71;
  color: white;
  padding: 20px;
  border-radius: 4px;
  flex: 1;
  text-align: center;
}
```

:::

```css
.container {
  flex-direction: row; /* 默认，水平排列，从左到右 */
  flex-direction: row-reverse; /* 水平排列，从右到左 */
  flex-direction: column; /* 垂直排列，从上到下 */
  flex-direction: column-reverse; /* 垂直排列，从下到上 */
}
```

### 2. flex-wrap
控制 Flex 项目是否换行。

::: normal-demo
```html
<div class="wrap-demo">
  <h3>flex-wrap: nowrap</h3>
  <div class="flex-container nowrap">
    <div>1</div>    <div>2</div>    <div>3</div>    <div>4</div>    <div>5</div>    <div>6</div>
  </div>

  <h3>flex-wrap: wrap</h3>
  <div class="flex-container wrap">
    <div>1</div>    <div>2</div>    <div>3</div>    <div>4</div>    <div>5</div>    <div>6</div>
  </div>

  <h3>flex-wrap: wrap-reverse</h3>
  <div class="flex-container wrap-reverse">
    <div>1</div>    <div>2</div>    <div>3</div>    <div>4</div>    <div>5</div>    <div>6</div>
  </div>
</div>
```
```css
/* flex-wrap 示例 */
.wrap-demo h3 {
  margin-top: 20px;
  margin-bottom: 10px;
}

.flex-container {
  display: flex;
  gap: 10px;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 4px;
  width: 300px;
}

.flex-container.nowrap {
  flex-wrap: nowrap;
}

.flex-container.wrap {
  flex-wrap: wrap;
}

.flex-container.wrap-reverse {
  flex-wrap: wrap-reverse;
}

.flex-container > div {
  background-color: #e74c3c;
  color: white;
  padding: 20px;
  border-radius: 4px;
  width: 80px;
  text-align: center;
}
```
:::

```css
.container {
  flex-wrap: nowrap; /* 默认，不换行 */
  flex-wrap: wrap; /* 换行，第一行在上方 */
  flex-wrap: wrap-reverse; /* 换行，第一行在下方 */
}
```

### 3. flex-flow
`flex-direction` 和 `flex-wrap` 的简写形式。

```css
.container {
  flex-flow: row nowrap; /* 默认 */
  flex-flow: row wrap;
  flex-flow: column wrap;
}
```

### 4. justify-content
控制 Flex 项目在主轴（main axis）上的对齐方式。

::: normal-demo
```html
<div class="justify-content-demo">
  <h3>justify-content: flex-start</h3>
  <div class="flex-container flex-start">
    <div>1</div>    <div>2</div>    <div>3</div>
  </div>

  <h3>justify-content: flex-end</h3>
  <div class="flex-container flex-end">
    <div>1</div>    <div>2</div>    <div>3</div>
  </div>

  <h3>justify-content: center</h3>
  <div class="flex-container center">
    <div>1</div>    <div>2</div>    <div>3</div>
  </div>

  <h3>justify-content: space-between</h3>
  <div class="flex-container space-between">
    <div>1</div>    <div>2</div>    <div>3</div>
  </div>

  <h3>justify-content: space-around</h3>
  <div class="flex-container space-around">
    <div>1</div>    <div>2</div>    <div>3</div>
  </div>

  <h3>justify-content: space-evenly</h3>
  <div class="flex-container space-evenly">
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

.flex-container {
  display: flex;
  gap: 10px;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 4px;
  width: 100%;
}

.flex-container.flex-start {
  justify-content: flex-start;
}

.flex-container.flex-end {
  justify-content: flex-end;
}

.flex-container.center {
  justify-content: center;
}

.flex-container.space-between {
  justify-content: space-between;
}

.flex-container.space-around {
  justify-content: space-around;
}

.flex-container.space-evenly {
  justify-content: space-evenly;
}

.flex-container > div {
  background-color: #9b59b6;
  color: white;
  padding: 20px;
  border-radius: 4px;
  width: 80px;
  text-align: center;
}
```
:::

```css
.container {
  justify-content: flex-start; /* 默认，靠左对齐 */
  justify-content: flex-end; /* 靠右对齐 */
  justify-content: center; /* 居中对齐 */
  justify-content: space-between; /* 两端对齐，项目之间有相等的空间 */
  justify-content: space-around; /* 项目两侧有相等的空间 */
  justify-content: space-evenly; /* 项目之间有相等的空间 */
}
```

### 5. align-items
控制 Flex 项目在交叉轴（cross axis）上的对齐方式。

::: normal-demo
```html
<div class="align-items-demo">
  <h3>align-items: stretch</h3>
  <div class="flex-container stretch">
    <div>1</div>    <div>2<br>两行</div>    <div>3<br>三行<br>内容</div>
  </div>

  <h3>align-items: flex-start</h3>
  <div class="flex-container flex-start">
    <div>1</div>    <div>2<br>两行</div>    <div>3<br>三行<br>内容</div>
  </div>

  <h3>align-items: flex-end</h3>
  <div class="flex-container flex-end">
    <div>1</div>    <div>2<br>两行</div>    <div>3<br>三行<br>内容</div>
  </div>

  <h3>align-items: center</h3>
  <div class="flex-container center">
    <div>1</div>    <div>2<br>两行</div>    <div>3<br>三行<br>内容</div>
  </div>

  <h3>align-items: baseline</h3>
  <div class="flex-container baseline">
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

.flex-container {
  display: flex;
  gap: 10px;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 4px;
  height: 120px;
  width: 100%;
}

.flex-container.stretch {
  align-items: stretch;
}

.flex-container.flex-start {
  align-items: flex-start;
}

.flex-container.flex-end {
  align-items: flex-end;
}

.flex-container.center {
  align-items: center;
}

.flex-container.baseline {
  align-items: baseline;
}

.flex-container > div {
  background-color: #f39c12;
  color: white;
  padding: 10px;
  border-radius: 4px;
  flex: 1;
}
```
:::

```css
.container {
  align-items: stretch; /* 默认，拉伸填充容器 */
  align-items: flex-start; /* 靠上对齐 */
  align-items: flex-end; /* 靠下对齐 */
  align-items: center; /* 居中对齐 */
  align-items: baseline; /* 基线对齐 */
}
```

### 6. align-content
控制多行 Flex 项目在交叉轴上的对齐方式（仅当项目换行时有效）。

::: normal-demo
```html
<div class="align-content-demo">
  <h3>align-content: stretch</h3>
  <div class="flex-container stretch">
    <div>1</div>    <div>2</div>    <div>3</div>    <div>4</div>    <div>5</div>    <div>6</div>
  </div>

  <h3>align-content: flex-start</h3>
  <div class="flex-container flex-start">
    <div>1</div>    <div>2</div>    <div>3</div>    <div>4</div>    <div>5</div>    <div>6</div>
  </div>

  <h3>align-content: flex-end</h3>
  <div class="flex-container flex-end">
    <div>1</div>    <div>2</div>    <div>3</div>    <div>4</div>    <div>5</div>    <div>6</div>
  </div>

  <h3>align-content: center</h3>
  <div class="flex-container center">
    <div>1</div>    <div>2</div>    <div>3</div>    <div>4</div>    <div>5</div>    <div>6</div>
  </div>

  <h3>align-content: space-between</h3>
  <div class="flex-container space-between">
    <div>1</div>    <div>2</div>    <div>3</div>    <div>4</div>    <div>5</div>    <div>6</div>
  </div>

  <h3>align-content: space-around</h3>
  <div class="flex-container space-around">
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

.flex-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 4px;
  height: 240px;
  width: 100%;
}

.flex-container.stretch {
  align-content: stretch;
}

.flex-container.flex-start {
  align-content: flex-start;
}

.flex-container.flex-end {
  align-content: flex-end;
}

.flex-container.center {
  align-content: center;
}

.flex-container.space-between {
  align-content: space-between;
}

.flex-container.space-around {
  align-content: space-around;
}

.flex-container > div {
  background-color: #1abc9c;
  color: white;
  padding: 20px;
  border-radius: 4px;
  width: 120px;
  text-align: center;
}
```
:::

```css
.container {
  align-content: stretch; /* 默认，拉伸填充容器 */
  align-content: flex-start; /* 靠上对齐 */
  align-content: flex-end; /* 靠下对齐 */
  align-content: center; /* 居中对齐 */
  align-content: space-between; /* 两端对齐，行之间有相等的空间 */
  align-content: space-around; /* 行两侧有相等的空间 */
  align-content: space-evenly; /* 行之间有相等的空间 */
}
```

## Flex 项目属性

### 1. order
控制 Flex 项目的排列顺序，默认值为 0。数值越小，排列越靠前。

::: normal-demo
```html
<div class="order-demo">
  <div class="flex-container">
    <div style="order: 3;">1 (order: 3)</div>
    <div style="order: 1;">2 (order: 1)</div>
    <div style="order: 2;">3 (order: 2)</div>
    <div style="order: 0;">4 (order: 0)</div>
  </div>
</div>
```
```css
/* order 示例 */
.order-demo .flex-container {
  display: flex;
  gap: 10px;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 4px;
}

.flex-container > div {
  background-color: #3498db;
  color: white;
  padding: 20px;
  border-radius: 4px;
  flex: 1;
  text-align: center;
}
```
:::

```css
.item {
  order: 0; /* 默认 */
  order: 1; /* 排在默认项目之后 */
  order: -1; /* 排在默认项目之前 */
}
```

### 2. flex-grow
控制 Flex 项目在有额外空间时的放大比例，默认值为 0。

::: normal-demo
```html
<div class="flex-grow-demo">
  <h3>不同的 flex-grow 值</h3>
  <div class="flex-container">
    <div style="flex-grow: 1;">flex-grow: 1</div>
    <div style="flex-grow: 2;">flex-grow: 2</div>
    <div style="flex-grow: 1;">flex-grow: 1</div>
  </div>

  <h3>默认值 (flex-grow: 0)</h3>
  <div class="flex-container">
    <div>不放大</div>
    <div>不放大</div>
    <div>不放大</div>
  </div>
</div>
```
```css
/* flex-grow 示例 */
.flex-grow-demo h3 {
  margin-top: 20px;
  margin-bottom: 10px;
}

.flex-container {
  display: flex;
  gap: 10px;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 4px;
}

.flex-container > div {
  background-color: #e74c3c;
  color: white;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
}
```
:::

```css
.item {
  flex-grow: 0; /* 默认，不放大 */
  flex-grow: 1; /* 放大，比例为 1 */
  flex-grow: 2; /* 放大，比例为 2 */
}
```

### 3. flex-shrink
控制 Flex 项目在空间不足时的缩小比例，默认值为 1。

::: normal-demo
```html
<div class="flex-shrink-demo">
  <div class="flex-container">
    <div style="flex-shrink: 1; width: 200px;">flex-shrink: 1</div>
    <div style="flex-shrink: 2; width: 200px;">flex-shrink: 2</div>
    <div style="flex-shrink: 0; width: 200px;">flex-shrink: 0</div>
  </div>
</div>
```
```css
/* flex-shrink 示例 */
.flex-shrink-demo .flex-container {
  display: flex;
  gap: 10px;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 4px;
  width: 500px; /* 小于项目总宽度 */
}

.flex-container > div {
  background-color: #2ecc71;
  color: white;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
}
```
:::

```css
.item {
  flex-shrink: 1; /* 默认，缩小 */
  flex-shrink: 0; /* 不缩小 */
  flex-shrink: 2; /* 缩小，比例为 2 */
}
```

### 4. flex-basis
指定 Flex 项目在主轴上的初始大小，默认值为 `auto`。

::: normal-demo
```html
<div class="flex-basis-demo">
  <div class="flex-container">
    <div style="flex-basis: 100px;">flex-basis: 100px</div>
    <div style="flex-basis: 200px;">flex-basis: 200px</div>
    <div style="flex-basis: auto;">flex-basis: auto</div>
  </div>
</div>
```
```css
/* flex-basis 示例 */
.flex-basis-demo .flex-container {
  display: flex;
  gap: 10px;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 4px;
}

.flex-container > div {
  background-color: #9b59b6;
  color: white;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
}
```
:::

```css
.item {
  flex-basis: auto; /* 默认，项目的内容大小 */
  flex-basis: 100px; /* 固定宽度 */
  flex-basis: 50%; /* 父容器宽度的 50% */
}
```

### 5. flex
`flex-grow`, `flex-shrink` 和 `flex-basis` 的简写形式，默认值为 `0 1 auto`。

```css
.item {
  flex: 0 1 auto; /* 默认 */
  flex: 1; /* 等同于 flex: 1 1 0% */
  flex: 2 0 200px; /* 放大比例 2，不缩小，初始宽度 200px */
}
```

### 6. align-self
控制单个 Flex 项目在交叉轴上的对齐方式，覆盖容器的 `align-items` 属性。

::: normal-demo
```html
<div class="align-self-demo">
  <div class="flex-container">
    <div>默认</div>
    <div style="align-self: flex-start;">flex-start</div>
    <div style="align-self: flex-end;">flex-end</div>
    <div style="align-self: center;">center</div>
    <div style="align-self: baseline;">baseline</div>
    <div style="align-self: stretch;">stretch</div>
  </div>
</div>
```
```css
/* align-self 示例 */
.align-self-demo .flex-container {
  display: flex;
  gap: 10px;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 4px;
  height: 150px;
  align-items: flex-start; /* 容器默认对齐方式 */
}

.flex-container > div {
  background-color: #e67e22;
  color: white;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
  width: 80px;
}

.flex-container > div:nth-child(6) {
  padding: 0;
}
```
:::

```css
.item {
  align-self: stretch; /* 默认，继承容器的 align-items */
  align-self: flex-start; /* 靠上对齐 */
  align-self: flex-end; /* 靠下对齐 */
  align-self: center; /* 居中对齐 */
  align-self: baseline; /* 基线对齐 */
}
```

## 交互式 Flexbox 演示

::: normal-demo
```html
<div class="interactive-flexbox-demo">
  <div class="controls">
    <div class="control-group">
      <label for="flex-direction">flex-direction:</label>
      <select id="flex-direction">
        <option value="row">row</option>
        <option value="row-reverse">row-reverse</option>
        <option value="column">column</option>
        <option value="column-reverse">column-reverse</option>
      </select>
    </div>
    <div class="control-group">
      <label for="flex-wrap">flex-wrap:</label>
      <select id="flex-wrap">
        <option value="nowrap">nowrap</option>
        <option value="wrap">wrap</option>
        <option value="wrap-reverse">wrap-reverse</option>
      </select>
    </div>
    <div class="control-group">
      <label for="justify-content">justify-content:</label>
      <select id="justify-content">
        <option value="flex-start">flex-start</option>
        <option value="flex-end">flex-end</option>
        <option value="center">center</option>
        <option value="space-between">space-between</option>
        <option value="space-around">space-around</option>
        <option value="space-evenly">space-evenly</option>
      </select>
    </div>
    <div class="control-group">
      <label for="align-items">align-items:</label>
      <select id="align-items">
        <option value="stretch">stretch</option>
        <option value="flex-start">flex-start</option>
        <option value="flex-end">flex-end</option>
        <option value="center">center</option>
        <option value="baseline">baseline</option>
      </select>
    </div>
    <div class="control-group">
      <label for="align-content">align-content:</label>
      <select id="align-content">
        <option value="stretch">stretch</option>
        <option value="flex-start">flex-start</option>
        <option value="flex-end">flex-end</option>
        <option value="center">center</option>
        <option value="space-between">space-between</option>
        <option value="space-around">space-around</option>
      </select>
    </div>
  </div>
  <div class="preview-container">
    <div id="flex-container" class="flex-container">
      <div>1</div>
      <div style="font-size: 24px;">2</div>
      <div style="height: 80px;">3</div>
      <div>4</div>
      <div>5</div>
    </div>
  </div>
  <div class="code-output">
    <pre id="css-code">.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
}</pre>
  </div>
</div>
```
```css
/* 交互式 Flexbox 演示 */
.interactive-flexbox-demo {
  padding: 20px;
  background-color: #f0f0f0;
  max-width: 900px;
  margin: 0 auto;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.preview-container {
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 20px;
  min-height: 200px;
}

.flex-container {
  display: flex;
  gap: 10px;
  background-color: #e0e0e0;
  padding: 10px;
  border-radius: 4px;
  min-height: 150px;
  width: 100%;
}

.flex-container > div {
  background-color: #3498db;
  color: white;
  padding: 15px;
  border-radius: 4px;
  text-align: center;
  min-width: 50px;
}

.code-output {
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
}

.code-output pre {
  margin: 0;
  font-family: monospace;
}
```
```js
// 交互式 Flexbox 演示
const flexContainer = document.getElementById('flex-container');
const cssCode = document.getElementById('css-code');
const flexDirectionSelect = document.getElementById('flex-direction');
const flexWrapSelect = document.getElementById('flex-wrap');
const justifyContentSelect = document.getElementById('justify-content');
const alignItemsSelect = document.getElementById('align-items');
const alignContentSelect = document.getElementById('align-content');

// 更新 Flexbox 样式
function updateFlexbox() {
  const flexDirection = flexDirectionSelect.value;
  const flexWrap = flexWrapSelect.value;
  const justifyContent = justifyContentSelect.value;
  const alignItems = alignItemsSelect.value;
  const alignContent = alignContentSelect.value;

  // 应用样式
  flexContainer.style.flexDirection = flexDirection;
  flexContainer.style.flexWrap = flexWrap;
  flexContainer.style.justifyContent = justifyContent;
  flexContainer.style.alignItems = alignItems;
  flexContainer.style.alignContent = alignContent;

  // 更新代码显示
  const code = `.flex-container {
  display: flex;
  flex-direction: ${flexDirection};
  flex-wrap: ${flexWrap};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  align-content: ${alignContent};
}`;
  cssCode.textContent = code;
}

// 初始化
updateFlexbox();

// 添加事件监听器
flexDirectionSelect.addEventListener('change', updateFlexbox);
flexWrapSelect.addEventListener('change', updateFlexbox);
justifyContentSelect.addEventListener('change', updateFlexbox);
alignItemsSelect.addEventListener('change', updateFlexbox);
alignContentSelect.addEventListener('change', updateFlexbox);
```
:::

## Flexbox 实际应用示例

### 1. 响应式导航栏

::: normal-demo
```html
<nav class="flex-nav">
  <div class="logo">Logo</div>
  <ul class="nav-links">
    <li><a href="#">首页</a></li>
    <li><a href="#">产品</a></li>
    <li><a href="#">关于我们</a></li>
    <li><a href="#">联系方式</a></li>
  </ul>
  <div class="cta-button"><a href="#">登录</a></div>
</nav>
```
```css
/* 响应式导航栏 */
.flex-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c3e50;
  color: white;
  padding: 15px 30px;
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 20px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: white;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-links a:hover {
  background-color: #34495e;
}

.cta-button a {
  background-color: #3498db;
  color: white;
  text-decoration: none;
  padding: 8px 15px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.cta-button a:hover {
  background-color: #2980b9;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .flex-nav {
    flex-direction: column;
    gap: 15px;
    padding: 15px;
  }

  .nav-links {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .nav-links li {
    width: 100%;
    text-align: center;
  }
}
```
:::

### 2. 卡片网格

::: normal-demo
```html
<div class="card-grid">
  <div class="card">
    <div class="card-image"></div>
    <div class="card-content">
      <h3>卡片 1</h3>
      <p>这是一个使用 Flexbox 创建的响应式卡片。</p>
      <button>了解更多</button>
    </div>
  </div>
  <div class="card">
    <div class="card-image"></div>
    <div class="card-content">
      <h3>卡片 2</h3>
      <p>这是一个使用 Flexbox 创建的响应式卡片。</p>
      <button>了解更多</button>
    </div>
  </div>
  <div class="card">
    <div class="card-image"></div>
    <div class="card-content">
      <h3>卡片 3</h3>
      <p>这是一个使用 Flexbox 创建的响应式卡片。</p>
      <button>了解更多</button>
    </div>
  </div>
  <div class="card">
    <div class="card-image"></div>
    <div class="card-content">
      <h3>卡片 4</h3>
      <p>这是一个使用 Flexbox 创建的响应式卡片。</p>
      <button>了解更多</button>
    </div>
  </div>
</div>
```
```css
/* 卡片网格布局 */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.card {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  flex: 1 1 300px;
  max-width: 400px;
}

.card-image {
  height: 180px;
  background-color: #3498db;
}

.card-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-content h3 {
  margin: 0;
  font-size: 20px;
}

.card-content p {
  flex: 1;
  margin: 0;
  color: #666;
}

.card-content button {
  background-color: #2ecc71;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  align-self: flex-start;
}

.card-content button:hover {
  background-color: #27ae60;
}
```
:::

### 3. 聊天界面

::: normal-demo
```html
<div class="chat-interface">
  <div class="chat-messages">
    <div class="message received">
      <div class="content">你好！</div>
    </div>
    <div class="message sent">
      <div class="content">嗨，有什么可以帮助你的？</div>
    </div>
    <div class="message received">
      <div class="content">我想了解更多关于 Flexbox 的知识。</div>
    </div>
    <div class="message sent">
      <div class="content">Flexbox 是一种一维布局模型，非常适合创建响应式界面。</div>
    </div>
    <div class="message sent">
      <div class="content">它可以轻松实现水平和垂直居中，以及灵活的空间分配。</div>
    </div>
    <div class="message received">
      <div class="content">听起来很有用！</div>
    </div>
  </div>
  <div class="chat-input">
    <input type="text" placeholder="输入消息...">
    <button>发送</button>
  </div>
</div>
```
```css
/* 聊天界面 */
.chat-interface {
  display: flex;
  flex-direction: column;
  height: 400px;
  width: 400px;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
}

.chat-messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f5f5f5;
}

.message {
  margin-bottom: 15px;
  max-width: 70%;
}

.message.received {
  align-self: flex-start;
}

.message.sent {
  align-self: flex-end;
}

.message .content {
  padding: 10px 15px;
  border-radius: 18px;
  word-break: break-word;
}

.message.received .content {
  background-color: #e0e0e0;
  border-top-left-radius: 4px;
}

.message.sent .content {
  background-color: #3498db;
  color: white;
  border-top-right-radius: 4px;
}

.chat-input {
  display: flex;
  padding: 10px;
  border-top: 1px solid #e0e0e0;
}

.chat-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-right: 10px;
}

.chat-input button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0 20px;
  border-radius: 4px;
  cursor: pointer;
}
```
:::

## Flexbox 最佳实践

1. **优先使用 Flexbox 进行一维布局** - Flexbox 最适合处理行或列的一维布局
2. **使用 `flex` 简写属性** - 它更简洁且能避免一些意外行为
3. **避免使用固定宽度** - 让 Flex 项目根据可用空间自动调整
4. **使用 `gap` 代替 `margin`** - 更可靠地控制项目之间的间距
5. **注意 `flex-wrap` 的使用** - 在小屏幕上确保内容正确显示
6. **使用相对单位** - 如 `rem` 或 `em`，使布局更具响应性
7. **考虑无障碍访问** - 确保键盘导航和屏幕阅读器兼容性
8. **测试不同浏览器** - 虽然大多数现代浏览器都支持 Flexbox，但仍需测试

## 练习

1. 使用 Flexbox 创建一个响应式导航栏，在移动设备上转为垂直布局。
2. 实现一个卡片网格，使用 Flexbox 确保卡片在不同屏幕尺寸上正确排列。
3. 创建一个使用 `justify-content` 和 `align-items` 实现内容居中的页面。
4. 使用 Flexbox 实现一个聊天界面，消息气泡根据发送方自动对齐到左侧或右侧。
5. 创建一个交互式 Flexbox 演示工具，允许用户调整各种 Flexbox 属性并实时查看效果。

## 常见布局模式

::: normal-demo
```html
<div class="layout-demo">
  <h3>1. 水平居中</h3>
  <div class="flex-center-horizontal">
    <div>居中内容</div>    
  </div>

  <h3>2. 垂直居中</h3>
  <div class="flex-center-vertical">
    <div>居中内容</div>    
  </div>

  <h3>3. 水平垂直居中</h3>
  <div class="flex-center-both">
    <div>完全居中内容</div>    
  </div>

  <h3>4. 两栏布局 (固定宽度 + 自适应)</h3>
  <div class="flex-two-columns">
    <div class="sidebar">侧边栏 (200px)</div>
    <div class="main-content">主内容 (自适应)</div>
  </div>

  <h3>5. 三栏布局 (两端固定 + 中间自适应)</h3>
  <div class="flex-three-columns">
    <div class="left-sidebar">左侧边栏 (150px)</div>
    <div class="center-content">中间内容 (自适应)</div>
    <div class="right-sidebar">右侧边栏 (150px)</div>
  </div>

  <h3>6. 等高列布局</h3>
  <div class="flex-equal-height">
    <div>列 1<br>多行内容<br>测试等高</div>
    <div>列 2</div>
    <div>列 3<br>更多内容</div>
  </div>

  <h3>7. 导航栏布局</h3>
  <nav class="flex-nav">
    <div class="logo">Logo</div>
    <ul class="nav-links">
      <li><a href="#">首页</a></li>
      <li><a href="#">产品</a></li>
      <li><a href="#">关于</a></li>
      <li><a href="#">联系</a></li>
    </ul>
    <div class="user-actions">
      <button>登录</button>
    </div>
  </nav>
</div>
```
```css
/* 常见布局模式示例 */
.layout-demo h3 {
  margin-top: 30px;
  margin-bottom: 10px;
}

/* 1. 水平居中 */
.flex-center-horizontal {
  display: flex;
  justify-content: center;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 4px;
}

.flex-center-horizontal > div {
  background-color: #3498db;
  color: white;
  padding: 20px;
  border-radius: 4px;
}

/* 2. 垂直居中 */
.flex-center-vertical {
  display: flex;
```  align-items: center;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 4px;
  height: 150px;
}

.flex-center-vertical > div {
  background-color: #2ecc71;
  color: white;
  padding: 20px;
  border-radius: 4px;
}

/* 3. 水平垂直居中 */
.flex-center-both {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 4px;
  height: 150px;
}

.flex-center-both > div {
  background-color: #9b59b6;
  color: white;
  padding: 20px;
  border-radius: 4px;
}

/* 4. 两栏布局 */
.flex-two-columns {
  display: flex;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.flex-two-columns .sidebar {
  width: 200px;
  background-color: #e74c3c;
  color: white;
  padding: 20px;
}

.flex-two-columns .main-content {
  flex: 1;
  background-color: #f39c12;
  color: white;
  padding: 20px;
}

/* 5. 三栏布局 */
.flex-three-columns {
  display: flex;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.flex-three-columns .left-sidebar,
.flex-three-columns .right-sidebar {
  width: 150px;
  background-color: #e74c3c;
  color: white;
  padding: 20px;
}

.flex-three-columns .center-content {
  flex: 1;
  background-color: #3498db;
  color: white;
  padding: 20px;
}

/* 6. 等高列布局 */
.flex-equal-height {
  display: flex;
  gap: 10px;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 4px;
}

.flex-equal-height > div {
  flex: 1;
  background-color: #2ecc71;
  color: white;
  padding: 20px;
  border-radius: 4px;
}

/* 7. 导航栏布局 */
.flex-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #34495e;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
}

.flex-nav .logo {
  font-size: 20px;
  font-weight: bold;
}

.flex-nav .nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 20px;
}

.flex-nav .nav-links a {
  color: white;
  text-decoration: none;
}

.flex-nav .user-actions button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}
```
:::

## 响应式 Flexbox 布局

::: normal-demo
```html
<div class="responsive-demo">
  <h3>响应式卡片布局</h3>
  <div class="card-container">
    <div class="card">卡片 1</div>
    <div class="card">卡片 2</div>
    <div class="card">卡片 3</div>
    <div class="card">卡片 4</div>
    <div class="card">卡片 5</div>
    <div class="card">卡片 6</div>
  </div>

  <p class="resize-hint">尝试调整浏览器窗口大小，查看卡片布局变化</p>
</div>
```
```css
/* 响应式 Flexbox 布局示例 */
.responsive-demo h3 {
  margin-top: 30px;
  margin-bottom: 10px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 4px;
}

.card {
  flex: 1 1 200px; /* 放大比例 1，缩小比例 1，基础宽度 200px */
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
  .card-container {
    flex-direction: column;
  }
  
  .card {
    flex: 1 1 100%; /* 在小屏幕上卡片占满宽度 */
  }
}
```
:::

## Flexbox 最佳实践

1. **语义化HTML**: 结合语义化HTML元素使用Flexbox，提高可访问性和SEO。
2. **避免固定高度**: 尽量让Flexbox容器根据内容自动调整高度。
3. **使用gap代替margin**: 使用`gap`属性代替子元素的margin，更清晰地控制项目间距。
4. **响应式设计**: 结合媒体查询，创建适应不同屏幕尺寸的布局。
5. **简化嵌套**: 避免过度嵌套Flexbox容器，保持HTML结构简洁。
6. **合理使用flex简写**: 使用`flex`简写属性代替单独设置`flex-grow`、`flex-shrink`和`flex-basis`。
7. **测试兼容性**: 虽然现代浏览器广泛支持Flexbox，但仍需测试旧浏览器的兼容性。

## 练习

1. 使用Flexbox创建一个响应式导航栏，在移动设备上折叠为汉堡菜单。
2. 设计一个使用Flexbox的卡片网格布局，在不同屏幕尺寸下自动调整列数。
3. 实现一个使用Flexbox的页脚，包含多个列并在小屏幕上堆叠。
4. 创建一个使用Flexbox的表单布局，确保标签和输入字段对齐良好。
5. 使用Flexbox实现一个进度条组件。

::: normal-demo
```html
  <h3>3. 水平垂直居中</h3>
  <div class="flex-center-both">
    <div>居中内容</div>
  </div>

  <h3>4. 两列布局</h3>
  <div class="flex-two-columns">
    <div class="sidebar">侧边栏</div>
    <div class="main">主内容</div>
  </div>

  <h3>5. 响应式网格</h3>
  <div class="flex-grid">
    <div>项目 1</div>
    <div>项目 2</div>
    <div>项目 3</div>
    <div>项目 4</div>
    <div>项目 5</div>
    <div>项目 6</div>
  </div>
</div>
```

```css
/* 常见布局模式示例 */
.layout-demo > div {
  margin-bottom: 30px;
  border-radius: 4px;
}

/* 1. 水平居中 */
.flex-center-horizontal {
  display: flex;
  justify-content: center;
  background-color: #f0f0f0;
  padding: 20px;
}

/* 2. 垂直居中 */
.flex-center-vertical {
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  height: 150px;
  padding: 20px;
}

/* 3. 水平垂直居中 */
.flex-center-both {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  height: 150px;
  padding: 20px;
}

/* 4. 两列布局 */
.flex-two-columns {
  display: flex;
  height: 200px;
}

.flex-two-columns .sidebar {
  width: 200px;
  background-color: #e74c3c;
}

.flex-two-columns .main {
  flex: 1;
  background-color: #3498db;
}

/* 5. 响应式网格 */
.flex-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.flex-grid > div {
  flex: 0 0 calc(33.333% - 10px);
  background-color: #9b59b6;
  padding: 20px;
  text-align: center;
  border-radius: 4px;
}

/* 所有项目的公共样式 */
.flex-center-horizontal > div, .flex-center-vertical > div, .flex-center-both > div {
  background-color: #2ecc71;
  color: white;
  padding: 20px;
  border-radius: 4px;
}

.flex-two-columns > div, .flex-grid > div {
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .flex-grid > div {
    flex: 0 0 calc(50% - 10px);
  }
}

@media (max-width: 480px) {
  .flex-grid > div {
    flex: 0 0 100%;
  }
}
```

:::

### 1. 水平居中
```css
.container {
  display: flex;
  justify-content: center;
}
```

### 2. 垂直居中
```css
.container {
  display: flex;
  align-items: center;
  height: 300px; /* 需要设置高度 */
}
```

### 3. 水平垂直居中
```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}
```

### 4. 两列布局
```css
.container {
  display: flex;
}

.sidebar {
  width: 200px;
}

.main-content {
  flex: 1; /* 占据剩余空间 */
}
```

### 5. 三列布局（中间自适应）
```css
.container {
  display: flex;
}

.left-sidebar {
  width: 200px;
}

.main-content {
  flex: 1;
}

.right-sidebar {
  width: 200px;
}
```

### 6. 网格布局（简易版）
```css
.container {
  display: flex;
  flex-wrap: wrap;
}

.item {
  flex: 0 0 calc(33.333% - 20px);
  margin: 10px;
}
```

## 最佳实践
- 使用 `flex: 1` 代替 `flex: 1 1 0%`，更简洁
- 尽量避免使用固定宽度，使用 `flex-basis` 和 `flex-grow` 实现灵活布局
- 对于需要换行的布局，设置 `flex-wrap: wrap`
- 使用 `justify-content` 和 `align-items` 实现对齐，避免使用 margin
- 理解主轴和交叉轴的概念，它们会随着 `flex-direction` 的变化而变化
- 对于复杂的二维布局，考虑使用 Grid

## 练习
1. 创建一个水平居中的导航栏
2. 实现一个垂直居中的登录表单
3. 设计一个三列布局，中间列自适应
4. 使用 Flexbox 创建一个响应式网格布局
5. 实现一个可伸缩的侧边栏
6. 设计一个具有多种对齐方式的复杂布局

通过本章节的学习，你应该掌握 Flexbox 的核心概念和属性，能够使用 Flexbox 实现各种常见的布局模式，创建灵活、响应式的页面结构。