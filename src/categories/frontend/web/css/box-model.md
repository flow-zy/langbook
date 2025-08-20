# 盒模型

## 盒模型的基本概念
CSS 盒模型是布局的基础，它描述了元素如何在页面上占据空间。每个元素都可以看作是一个矩形的盒子，由以下几个部分组成：

1. **内容区 (Content Area)**：显示实际内容的部分
2. **内边距 (Padding)**：内容区与边框之间的空间
3. **边框 (Border)**：内边距外环绕的边界
4. **外边距 (Margin)**：边框外环绕的空间，用于与其他元素分隔

::: normal-demo
```html
<div class="box-model-demo">
  <div class="box">
    <div class="content">内容区</div>
    <div class="padding-label">内边距</div>
    <div class="border-label">边框</div>
    <div class="margin-label">外边距</div>
  </div>
</div>
```
```css
.box-model-demo {
  padding: 20px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
}

.box {
  position: relative;
  width: 200px;
  height: 150px;
  margin: 30px;
  padding: 20px;
  border: 5px solid #333;
  background-color: #ddd;
}

.content {
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.padding-label,
.border-label,
.margin-label {
  position: absolute;
  font-size: 12px;
  color: #666;
  font-weight: bold;
}

.padding-label {
  top: 5px;
  left: 5px;
  color: #0066cc;
}

.border-label {
  top: -15px;
  left: 5px;
  color: #cc0000;
}

.margin-label {
  top: -35px;
  left: 5px;
  color: #009933;
}

/* 装饰线 */
.box::before {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 1px dashed #999;
  z-index: -1;
}
```
:::

## 标准盒模型 vs 怪异盒模型

::: normal-demo
```html
<div class="box-model-comparison">
  <div class="box standard-box">
    <div class="content">标准盒模型</div>
    <div class="size-info">width: 200px</div>
    <div class="size-info">实际宽度: 230px</div>
  </div>
  <div class="box border-box">
    <div class="content">怪异盒模型</div>
    <div class="size-info">width: 200px</div>
    <div class="size-info">实际宽度: 200px</div>
  </div>
</div>
```
```css
.box-model-comparison {
  display: flex;
  gap: 40px;
  padding: 20px;
  background-color: #f0f0f0;
  justify-content: center;
}

.box {
  padding: 10px;
  border: 5px solid black;
  margin: 20px;
  background-color: #ddd;
  text-align: center;
}

.standard-box {
  box-sizing: content-box;
  width: 200px;
}

.border-box {
  box-sizing: border-box;
  width: 200px;
}

.content {
  background-color: white;
  padding: 10px;
  margin-bottom: 10px;
}

.size-info {
  font-size: 12px;
  margin: 5px 0;
}
```
:::

::: normal-demo
```html
<div class="interactive-box-model">
  <div class="controls">
    <div class="control-group">
      <label for="box-sizing">盒模型类型:</label>
      <select id="box-sizing">
        <option value="content-box">标准盒模型 (content-box)</option>
        <option value="border-box">怪异盒模型 (border-box)</option>
      </select>
    </div>
    <div class="control-group">
      <label for="width">宽度:</label>
      <input type="range" id="width" min="100" max="300" value="200">
      <span id="width-value">200px</span>
    </div>
    <div class="control-group">
      <label for="padding">内边距:</label>
      <input type="range" id="padding" min="0" max="50" value="10">
      <span id="padding-value">10px</span>
    </div>
    <div class="control-group">
      <label for="border">边框宽度:</label>
      <input type="range" id="border" min="0" max="20" value="5">
      <span id="border-value">5px</span>
    </div>
  </div>
  <div class="box-container">
    <div id="demo-box" class="box">
      <div class="content">盒模型演示</div>
      <div class="size-details">
        <div>内容区宽度: <span id="content-width">180px</span></div>
        <div>实际总宽度: <span id="total-width">210px</span></div>
      </div>
    </div>
  </div>
</div>
```
```css
.interactive-box-model {
  padding: 20px;
  background-color: #f0f0f0;
  max-width: 800px;
  margin: 0 auto;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.control-group label {
  width: 120px;
}

.control-group input[type="range"] {
  width: 150px;
}

.box-container {
  display: flex;
  justify-content: center;
}

.box {
  box-sizing: content-box;
  width: 200px;
  height: 150px;
  padding: 10px;
  border: 5px solid black;
  background-color: #ddd;
  position: relative;
  transition: all 0.3s ease;
}

.content {
  background-color: white;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.size-details {
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-size: 12px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 5px;
  border-radius: 3px;
}
```
```js
// 交互式盒模型演示
const boxSizingSelect = document.getElementById('box-sizing');
const widthInput = document.getElementById('width');
const paddingInput = document.getElementById('padding');
const borderInput = document.getElementById('border');
const widthValue = document.getElementById('width-value');
const paddingValue = document.getElementById('padding-value');
const borderValue = document.getElementById('border-value');
const demoBox = document.getElementById('demo-box');
const contentWidth = document.getElementById('content-width');
const totalWidth = document.getElementById('total-width');

function updateBox() {
  const boxSizing = boxSizingSelect.value;
  const width = widthInput.value;
  const padding = paddingInput.value;
  const border = borderInput.value;

  // 更新显示值
  widthValue.textContent = `${width}px`;
  paddingValue.textContent = `${padding}px`;
  borderValue.textContent = `${border}px`;

  // 更新盒子样式
  demoBox.style.boxSizing = boxSizing;
  demoBox.style.width = `${width}px`;
  demoBox.style.padding = `${padding}px`;
  demoBox.style.borderWidth = `${border}px`;

  // 计算并显示尺寸详情
  if (boxSizing === 'content-box') {
    const contentW = width;
    const totalW = parseInt(width) + parseInt(padding) * 2 + parseInt(border) * 2;
    contentWidth.textContent = `${contentW}px`;
    totalWidth.textContent = `${totalW}px`;
  } else {
    const contentW = parseInt(width) - parseInt(padding) * 2 - parseInt(border) * 2;
    const totalW = width;
    contentWidth.textContent = `${contentW}px`;
    totalWidth.textContent = `${totalW}px`;
  }
}

// 初始化
updateBox();

// 添加事件监听器
[boxSizingSelect, widthInput, paddingInput, borderInput].forEach(element => {
  element.addEventListener('input', updateBox);
});
```
:::


### 标准盒模型 (W3C 盒模型)
在标准盒模型中，元素的宽度和高度仅包括内容区的尺寸。

```css
.box {
  width: 200px;
  height: 100px;
  padding: 10px;
  border: 5px solid black;
  margin: 20px;
  /* 实际占据宽度: 200px + 10px*2 + 5px*2 = 230px */
  /* 实际占据高度: 100px + 10px*2 + 5px*2 = 130px */
}
```

### 怪异盒模型 (IE 盒模型)
在怪异盒模型中，元素的宽度和高度包括内容区、内边距和边框的尺寸。

```css
.box {
  box-sizing: border-box;
  width: 200px;
  height: 100px;
  padding: 10px;
  border: 5px solid black;
  margin: 20px;
  /* 实际占据宽度: 200px + 20px*2 = 240px */
  /* 实际占据高度: 100px + 20px*2 = 140px */
  /* 内容区宽度: 200px - 10px*2 - 5px*2 = 170px */
  /* 内容区高度: 100px - 10px*2 - 5px*2 = 70px */
}
```

### 切换盒模型
使用 `box-sizing` 属性可以切换盒模型：

```css
/* 标准盒模型 (默认) */
.box {
  box-sizing: content-box;
}

/* 怪异盒模型 */
.box {
  box-sizing: border-box;
}
```

## 盒模型的组成部分

::: normal-demo
```html
<div class="box-components-demo">
  <div class="box padding-demo">
    <div class="content">不同内边距</div>
  </div>
  <div class="box border-demo">
    <div class="content">不同边框</div>
  </div>
  <div class="box margin-demo">
    <div class="content">不同外边距</div>
  </div>
</div>
```
```css
.box-components-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  background-color: #f0f0f0;
  justify-content: center;
}

.box {
  width: 150px;
  height: 150px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.padding-demo {
  padding: 20px 10px 30px 40px;
  border: 1px solid #ddd;
}

.border-demo {
  border-top: 3px solid red;
  border-right: 3px dashed blue;
  border-bottom: 3px dotted green;
  border-left: 3px double purple;
}

.margin-demo {
  margin: 20px 10px 30px 40px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
}

.content {
  background-color: #eee;
  padding: 10px;
  text-align: center;
  font-size: 14px;
}
```
:::

### 1. 内容区 (Content Area)
内容区是显示实际内容的部分，受 `width` 和 `height` 属性影响。

```css
.box {
  width: 200px;
  height: 100px;
}
```

### 2. 内边距 (Padding)
内边距是内容区与边框之间的空间，可以使用 `padding` 属性设置。

```css
/* 简写形式 */
.box {
  padding: 10px; /* 四个方向都是10px */
  padding: 10px 20px; /* 上下10px，左右20px */
  padding: 10px 20px 30px; /* 上10px，左右20px，下30px */
  padding: 10px 20px 30px 40px; /* 上10px，右20px，下30px，左40px */
}

/* 单独设置 */
.box {
  padding-top: 10px;
  padding-right: 20px;
  padding-bottom: 30px;
  padding-left: 40px;
}
```

### 3. 边框 (Border)
边框是内边距外环绕的边界，可以使用 `border` 属性设置。

```css
/* 简写形式 */
.box {
  border: 1px solid black; /* 宽度、样式、颜色 */
}

/* 单独设置 */
.box {
  border-width: 1px;
  border-style: solid;
  border-color: black;
}

/* 单独设置各边 */
.box {
  border-top: 1px solid black;
  border-right: 2px dashed red;
  border-bottom: 3px dotted blue;
  border-left: 4px double green;
}
```

### 4. 外边距 (Margin)
外边距是边框外环绕的空间，用于与其他元素分隔，可以使用 `margin` 属性设置。

```css
/* 简写形式 */
.box {
  margin: 10px; /* 四个方向都是10px */
  margin: 10px 20px; /* 上下10px，左右20px */
  margin: 10px 20px 30px; /* 上10px，左右20px，下30px */
  margin: 10px 20px 30px 40px; /* 上10px，右20px，下30px，左40px */
}

/* 单独设置 */
.box {
  margin-top: 10px;
  margin-right: 20px;
  margin-bottom: 30px;
  margin-left: 40px;
}
```

#### 外边距折叠
当两个垂直外边距相遇时，它们会折叠成一个外边距，其高度等于两个外边距中较大的那个。

::: normal-demo
```html
<div class="margin-collapse-demo">
  <div class="box1">上边距 20px</div>
  <div class="box2">上边距 30px</div>
  <div class="explanation">
    <p>两个盒子之间的实际距离不是 20px + 30px = 50px，而是 30px（较大的那个外边距）</p>
  </div>
</div>
```
```css
.margin-collapse-demo {
  padding: 20px;
  background-color: #f0f0f0;
}

.box1 {
  height: 100px;
  background-color: #3498db;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}

.box2 {
  height: 100px;
  background-color: #e74c3c;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}

.explanation {
  margin-top: 40px;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
}
```
:::

#### 防止外边距折叠
可以通过以下方法防止外边距折叠：

1. 使用浮动(float)或定位(position: absolute/fixed)
2. 使用overflow: hidden
3. 在两个元素之间添加一个带有边框或内边距的元素

::: normal-demo
```html
<div class="no-margin-collapse-demo">
  <div class="section">
    <h3>方法1: 使用overflow: hidden</h3>
    <div class="box1">上边距 20px</div>
    <div class="container">
      <div class="box2">上边距 30px (无折叠)</div>
    </div>
  </div>
  <div class="section">
    <h3>方法2: 使用padding</h3>
    <div class="box1">上边距 20px</div>
    <div class="spacer"></div>
    <div class="box2">上边距 30px (无折叠)</div>
  </div>
</div>
```
```css
.no-margin-collapse-demo {
  padding: 20px;
  background-color: #f0f0f0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.section {
  flex: 1;
  min-width: 300px;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
}

.box1 {
  height: 80px;
  background-color: #3498db;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}

.box2 {
  height: 80px;
  background-color: #e74c3c;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}

.container {
  overflow: hidden;
}

.spacer {
  padding: 1px;
}
```
:::

## 盒模型的实际应用
盒模型是CSS布局的基础，以下是一些实际应用示例：

::: normal-demo
```html
<div class="box-model-application">
  <div class="card">
    <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'><rect width='300' height='200' fill='%233498db'/><text x='150' y='100' font-family='Arial' font-size='24' text-anchor='middle' fill='white'>示例图片</text></svg>" alt="示例图片">
    <div class="card-content">
      <h3>卡片标题</h3>
      <p>这是一个使用盒模型创建的卡片组件，包含图片、标题和内容。</p>
      <button class="btn">了解更多</button>
    </div>
  </div>
</div>
```
```css
.box-model-application {
  padding: 20px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
}

.card {
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 20px;
}

.card-content h3 {
  margin-top: 0;
  margin-bottom: 10px;
}

.card-content p {
  margin-bottom: 20px;
  color: #666;
}

.btn {
  padding: 10px 15px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #2980b9;
}
```
:::

## 最佳实践

1. **统一盒模型**：
   - 建议在项目开始时设置 `box-sizing: border-box;` 为全局样式，这样可以更直观地控制元素尺寸
   ```css
   * {
     box-sizing: border-box;
   }
   ```

2. **避免负外边距**：
   - 负外边距虽然可以实现一些特殊效果，但容易导致布局问题和难以维护的代码
   - 如果需要重叠元素，考虑使用定位(position)代替

3. **谨慎使用百分比外边距**：
   - 百分比外边距是相对于父元素的宽度计算的，可能会导致意想不到的结果
   - 对于响应式设计，可以考虑使用CSS变量和clamp()函数

4. **优化性能**：
   - 避免为大量元素设置复杂的边框样式，这会影响页面渲染性能
   - 对于需要圆角和阴影的元素，考虑使用CSS变量统一管理

5. **使用CSS变量**：
   - 使用CSS变量管理内边距、外边距等公共值，提高代码的可维护性
   ```css
   :root {
     --spacing-sm: 8px;
     --spacing-md: 16px;
     --spacing-lg: 24px;
     --spacing-xl: 32px;
   }

   .box {
     padding: var(--spacing-md);
     margin: var(--spacing-lg) 0;
   }
   ```

## 练习

1. 创建一个使用标准盒模型和怪异盒模型的对比演示页面。
2. 实现一个带有外边距折叠和防止外边距折叠的示例。
3. 使用盒模型创建一个响应式卡片组件。
4. 设计一个具有嵌套盒模型的布局，展示内边距和边框的使用。
5. 使用CSS变量统一管理一个页面中的所有间距值。

  border-style: solid;
  border-color: black;
}

/* 单独设置各边 */
.box {
  border-top: 1px solid black;
  border-right: 2px dashed red;
  border-bottom: 3px dotted blue;
  border-left: 4px double green;
}
```

### 4. 外边距 (Margin)
外边距是边框外环绕的空间，用于与其他元素分隔，可以使用 `margin` 属性设置。

```css
/* 简写形式 */
.box {
  margin: 10px; /* 四个方向都是10px */
  margin: 10px 20px; /* 上下10px，左右20px */
  margin: 10px 20px 30px; /* 上10px，左右20px，下30px */
  margin: 10px 20px 30px 40px; /* 上10px，右20px，下30px，左40px */
}

/* 单独设置 */
.box {
  margin-top: 10px;
  margin-right: 20px;
  margin-bottom: 30px;
  margin-left: 40px;
}
```

## 外边距合并
当两个或多个外边距相遇时，它们会合并成一个外边距，这就是外边距合并。

::: normal-demo
```html
<div class="margin-collapse-demo">
  <h3>垂直外边距合并</h3>
  <div class="box box1">Box 1 (margin-bottom: 20px)</div>
  <div class="box box2">Box 2 (margin-top: 30px)</div>
  <div class="distance-label">实际间距: 30px (非50px)</div>

  <h3>嵌套元素外边距合并</h3>
  <div class="parent-box">
    <div class="child-box">Child Box (margin-top: 30px)</div>
  </div>
  <div class="distance-label">父元素上外边距: 30px (非50px)</div>

  <h3>防止外边距合并</h3>
  <div class="parent-box prevent-collapse">
    <div class="child-box">Child Box</div>
  </div>
  <div class="distance-label">父元素上外边距: 20px, 子元素上外边距: 30px</div>
</div>
```
```css
.margin-collapse-demo {
  padding: 20px;
  background-color: #f0f0f0;
}

.box {
  width: 100%;
  padding: 10px;
  background-color: white;
  margin-bottom: 10px;
}

.box1 {
  margin-bottom: 20px;
}

.box2 {
  margin-top: 30px;
}

.distance-label {
  text-align: center;
  margin: 10px 0 30px 0;
  font-size: 14px;
  color: #666;
}

.parent-box {
  width: 100%;
  padding: 0;
  background-color: #ddd;
  margin-top: 20px;
}

.child-box {
  width: 100%;
  padding: 10px;
  background-color: white;
  margin-top: 30px;
}

.prevent-collapse {
  /* 通过添加边框或内边距防止外边距合并 */
  border-top: 1px solid transparent;
  /* 或者使用 overflow: hidden */
  /* overflow: hidden; */
}

h3 {
  margin-top: 40px;
  margin-bottom: 10px;
}
```
:::

### 垂直外边距合并
```css
.box1 {
  margin-bottom: 20px;
}

.box2 {
  margin-top: 30px;
}
/* 实际间距不是50px，而是30px（较大的那个） */
```

### 嵌套元素的外边距合并
```css
.parent {
  margin-top: 20px;
}

.child {
  margin-top: 30px;
}
/* 实际父元素的上边距是30px，而不是50px */
```

## 最佳实践
- 全局设置 `box-sizing: border-box`，使盒模型更易于理解和计算
- 避免使用过多的嵌套元素，减少外边距合并带来的问题
- 使用 `margin: 0 auto` 实现块级元素的水平居中
- 为内边距和外边距设置合适的值，保持页面的整洁和可读性

## 练习
1. 创建一个使用标准盒模型的元素
2. 创建一个使用怪异盒模型的元素
3. 测试不同 `box-sizing` 值的效果
4. 观察外边距合并的现象，并尝试解决
5. 使用盒模型创建一个简单的卡片布局

通过本章节的学习，你应该掌握 CSS 盒模型的概念，理解标准盒模型和怪异盒模型的区别，能够熟练设置内边距、边框和外边距，并了解外边距合并的现象和解决方法。