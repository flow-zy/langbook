# 圆角和阴影，边框

## 圆角 (Border Radius)
圆角可以使元素的 corners 变得圆润，增加设计的柔和感。

::: normal-demo
```html
<div class="border-radius-demo">
  <div class="demo-item basic-radius">基本圆角</div>
  <div class="demo-item individual-radius">单独设置角</div>
  <div class="demo-item elliptical-radius">椭圆圆角</div>
  <div class="demo-item circle">圆形</div>
  <div class="demo-item ellipse">椭圆形</div>
</div>
```
```css
.border-radius-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.demo-item {
  width: 150px;
  height: 150px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
}

.basic-radius {
  border-radius: 10px;
}

.individual-radius {
  border-top-left-radius: 10px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 40px;
}

.elliptical-radius {
  border-radius: 10px / 20px;
}

.circle {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #ff0000;
  color: white;
}

.ellipse {
  width: 200px;
  height: 100px;
  border-radius: 50%;
  background-color: #0000ff;
  color: white;
}
```
:::

::: normal-demo
```html
<div class="interactive-radius-demo">
  <div id="radius-preview"></div>
  <div class="controls">
    <div class="control-group">
      <label for="top-left">左上圆角:</label>
      <input type="range" id="top-left" min="0" max="50" value="10">
      <span id="top-left-value">10px</span>
    </div>
    <div class="control-group">
      <label for="top-right">右上圆角:</label>
      <input type="range" id="top-right" min="0" max="50" value="20">
      <span id="top-right-value">20px</span>
    </div>
    <div class="control-group">
      <label for="bottom-right">右下圆角:</label>
      <input type="range" id="bottom-right" min="0" max="50" value="30">
      <span id="bottom-right-value">30px</span>
    </div>
    <div class="control-group">
      <label for="bottom-left">左下圆角:</label>
      <input type="range" id="bottom-left" min="0" max="50" value="40">
      <span id="bottom-left-value">40px</span>
    </div>
  </div>
</div>
```
```css
.interactive-radius-demo {
  margin-bottom: 40px;
}

#radius-preview {
  width: 200px;
  height: 200px;
  background-color: #3498db;
  margin: 0 auto 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 40px;
  transition: all 0.3s ease;
}

.controls {
  max-width: 400px;
  margin: 0 auto;
}

.control-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.control-group label {
  width: 100px;
}

.control-group input[type="range"] {
  flex: 1;
  margin: 0 10px;
}

.control-group span {
  width: 50px;
  text-align: right;
}
```
```js
// 交互式圆角演示
const radiusPreview = document.getElementById('radius-preview');
const topLeftInput = document.getElementById('top-left');
const topRightInput = document.getElementById('top-right');
const bottomRightInput = document.getElementById('bottom-right');
const bottomLeftInput = document.getElementById('bottom-left');
const topLeftValue = document.getElementById('top-left-value');
const topRightValue = document.getElementById('top-right-value');
const bottomRightValue = document.getElementById('bottom-right-value');
const bottomLeftValue = document.getElementById('bottom-left-value');

function updateRadius() {
  const tl = topLeftInput.value;
  const tr = topRightInput.value;
  const br = bottomRightInput.value;
  const bl = bottomLeftInput.value;

  radiusPreview.style.borderTopLeftRadius = `${tl}px`;
  radiusPreview.style.borderTopRightRadius = `${tr}px`;
  radiusPreview.style.borderBottomRightRadius = `${br}px`;
  radiusPreview.style.borderBottomLeftRadius = `${bl}px`;

  topLeftValue.textContent = `${tl}px`;
  topRightValue.textContent = `${tr}px`;
  bottomRightValue.textContent = `${br}px`;
  bottomLeftValue.textContent = `${bl}px`;
}

// 初始化
updateRadius();

// 添加事件监听器
[topLeftInput, topRightInput, bottomRightInput, bottomLeftInput].forEach(input => {
  input.addEventListener('input', updateRadius);
});
```
:::

::: normal-demo
```html
<div class="advanced-radius-demo">
  <div class="demo-item扇贝形">扇贝形</div>
  <div class="demo-item波浪形">波浪形</div>
  <div class="demo-item不对称">不对称</div>
</div>
```
```css
.advanced-radius-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 40px;
}

.advanced-radius-demo .demo-item {
  width: 180px;
  height: 180px;
  background-color: #3498db;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border: none;
}

.扇贝形 {
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
}

.波浪形 {
  border-radius: 50% 0 50% 0 / 50% 0 50% 0;
}

.不对称 {
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
}
```
:::

### 1. 基本用法
```css
.element {
  border-radius: 10px; /* 四个角都是 10px 的圆角 */
}
```

### 2. 单独设置每个角
```css
.element {
  border-top-left-radius: 10px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 40px;
}
```

### 3. 简写形式
```css
/* 两个值：左上和右下 | 右上和左下 */
.element {
  border-radius: 10px 20px;
}

/* 三个值：左上 | 右上和左下 | 右下 */
.element {
  border-radius: 10px 20px 30px;
}

/* 四个值：左上 | 右上 | 右下 | 左下 */
.element {
  border-radius: 10px 20px 30px 40px;
}
```

### 4. 椭圆圆角
可以通过指定两个值（用 / 分隔）来创建椭圆圆角。

```css
.element {
  border-radius: 10px / 20px; /* 水平半径 / 垂直半径 */
  border-radius: 10px 20px / 30px 40px; /* 左上水平/垂直 | 右上水平/垂直 | 右下水平/垂直 | 左下水平/垂直 */
}
```

### 5. 全圆角元素
创建圆形或椭圆形元素。

```css
/* 圆形（宽高必须相等） */
.circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

/* 椭圆形 */
.ellipse {
  width: 200px;
  height: 100px;
  border-radius: 50%;
}
```

## 阴影
阴影可以为元素添加深度感和立体感。

### 1. 盒阴影 (Box Shadow)
```css
.element {
  box-shadow: offset-x offset-y blur-radius spread-radius color inset;
}
```

::: normal-demo
```html
<div class="box-shadow-demo">
  <div class="demo-item basic-shadow">基本阴影</div>
  <div class="demo-item multiple-shadows">多重阴影</div>
  <div class="demo-item inset-shadow">内阴影</div>
  <div class="demo-item colored-shadow">彩色阴影</div>
</div>
```
```css
.box-shadow-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.demo-item {
  width: 150px;
  height: 150px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
}

.basic-shadow {
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}

.multiple-shadows {
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2), -2px -2px 5px rgba(255, 255, 255, 0.7);
}

.inset-shadow {
  box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.2);
}

.colored-shadow {
  box-shadow: 3px 3px 0px #ff0000, 6px 6px 0px #0000ff;
}
```
:::

::: normal-demo
```html
<div class="advanced-box-shadow-demo">
  <div class="demo-item neon-shadow">霓虹阴影</div>
  <div class="demo-item layered-shadow">分层阴影</div>
  <div class="demo-item animated-shadow">动画阴影</div>
</div>
```
```css
.advanced-box-shadow-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 40px;
}

.advanced-box-shadow-demo .demo-item {
  width: 200px;
  height: 150px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border: none;
}

.neon-shadow {
  box-shadow: 0 0 5px #3498db, 0 0 10px #3498db, 0 0 15px #3498db;
  color: #3498db;
}

.layered-shadow {
  box-shadow:
    0 1px 1px rgba(0,0,0,0.12),
    0 2px 2px rgba(0,0,0,0.12),
    0 4px 4px rgba(0,0,0,0.12),
    0 8px 8px rgba(0,0,0,0.12),
    0 16px 16px rgba(0,0,0,0.12);
}

.animated-shadow {
  transition: all 0.3s ease;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}

.animated-shadow:hover {
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
  transform: translateY(-5px);
}
```
:::

#### 基本用法
```css
.element {
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2); /* 向右 2px，向下 2px，模糊 5px，黑色半透明 */
}
```

#### 多个阴影
可以添加多个阴影，用逗号分隔。

```css
.element {
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2), -2px -2px 5px rgba(255, 255, 255, 0.7);
}
```

#### 内阴影
使用 `inset` 关键字创建内阴影。

```css
.element {
  box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.2);
}
```

### 2. 文本阴影 (Text Shadow)
```css
.element {
  text-shadow: offset-x offset-y blur-radius color;
}
```

::: normal-demo
```html
<div class="text-shadow-demo">
  <h2 class="basic-text-shadow">基本文本阴影</h2>
  <h2 class="multiple-text-shadows">多重文本阴影</h2>
  <h2 class="glow-text">发光文本</h2>
  <h2 class="3d-text">3D 文本</h2>
  <h2 class="metal-text">金属文本</h2>
  <h2 class="animated-text-shadow">动画文本阴影</h2>
</div>
```
```css
.text-shadow-demo {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.basic-text-shadow {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.multiple-text-shadows {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5), -1px -1px 2px rgba(255, 255, 255, 0.7);
}

.glow-text {
  color: white;
  text-shadow: 0 0 5px #ff0000, 0 0 10px #ff0000, 0 0 15px #ff0000;
  background-color: #333;
  padding: 10px;
  border-radius: 5px;
}

.3d-text {
  text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15);
  font-size: 24px;
  font-weight: bold;
}

.metal-text {
  color: #e0e0e0;
  text-shadow: 0 1px 0px #373737, 0 2px 0px #313131, 0 3px 0px #292929, 0 4px 0px #252525, 0 5px 0px #212121, 0 6px 0px #1d1d1d, 0 7px 0px #1a1a1a, 0 8px 7px rgba(0, 0, 0, 0.4);
  font-size: 24px;
  font-weight: bold;
  background: linear-gradient(to right, #444, #222);
  padding: 10px;
  border-radius: 5px;
}

.animated-text-shadow {
  font-size: 24px;
  font-weight: bold;
  color: #3498db;
  text-shadow: 0 0 5px #3498db;
  animation: glowPulse 2s infinite alternate;
}

@keyframes glowPulse {
  from {
    text-shadow: 0 0 5px #3498db, 0 0 10px #3498db;
  }
  to {
    text-shadow: 0 0 10px #3498db, 0 0 20px #3498db, 0 0 30px #3498db;
  }
}
```
:::

#### 基本用法
```css
.element {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}
```

#### 多个文本阴影
```css
.element {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5), -1px -1px 2px rgba(255, 255, 255, 0.7);
}
```

## 边框 (Border)
边框是元素的边界，可以设置样式、宽度和颜色。

### 1. 基本边框属性
```css
.element {
  border-width: 1px;
  border-style: solid;
  border-color: black;
}
```

### 2. 简写形式
```css
.element {
  border: 1px solid black;
}
```

### 3. 单独设置各边
```css
.element {
  border-top: 1px solid black;
  border-right: 2px dashed red;
  border-bottom: 3px dotted blue;
  border-left: 4px double green;
}
```

### 4. 高级边框效果

::: normal-demo
```html
<div class="advanced-border-demo">
  <div class="demo-item gradient-border">渐变边框</div>
  <div class="demo-item animated-border">动画边框</div>
  <div class="demo-item border-image">边框图像</div>
  <div class="demo-item rounded-gradient">圆角渐变边框</div>
</div>
```
```css
.advanced-border-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 40px;
}

.advanced-border-demo .demo-item {
  width: 200px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 20px;
}

/* 渐变边框 */
.gradient-border {
  position: relative;
  background: white;
  border: 4px solid transparent;
  border-radius: 8px;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(to right, white, white), linear-gradient(45deg, #3498db, #e74c3c);
}

/* 动画边框 */
.animated-border {
  position: relative;
  background: white;
  border-radius: 8px;
}

.animated-border::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  z-index: -1;
  border-radius: 10px;
  background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
  background-size: 400%;
  animation: borderAnimation 20s linear infinite;
}

@keyframes borderAnimation {
  0% { background-position: 0 0; }
  50% { background-position: 400% 0; }
  100% { background-position: 0 0; }
}

/* 边框图像 */
.border-image {
  border: 10px solid transparent;
  border-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="none" stroke="%233498db" stroke-width="10" stroke-dasharray="20 10" /></svg>') 30 stretch;
}

/* 圆角渐变边框 */
.rounded-gradient {
  position: relative;
  background: white;
  border-radius: 50%;
  width: 150px;
  height: 150px;
}

.rounded-gradient::before {
  content: '';
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  z-index: -1;
  border-radius: 50%;
  background: linear-gradient(45deg, #3498db, #e74c3c, #2ecc71, #f1c40f);
  background-size: 400%;
  animation: borderAnimation 10s linear infinite;
}
```
:::

## 综合应用示例
结合圆角、阴影和边框可以创建精美的UI组件。

::: normal-demo
```html
<div class="combined-demo">
  <div class="card">
    <div class="card-header">
      <h3>精美卡片</h3>
    </div>
    <div class="card-body">
      <p>这是一个结合了圆角、阴影和渐变边框的精美卡片组件。</p>
    </div>
    <div class="card-footer">
      <button class="card-button">点击按钮</button>
    </div>
  </div>
</div>
```
```css
.combined-demo {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.card {
  width: 300px;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background: white;
}

.card-header {
  background: linear-gradient(45deg, #3498db, #2980b9);
  color: white;
  padding: 15px;
  text-align: center;
}

.card-body {
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.card-footer {
  padding: 15px;
  text-align: center;
}

.card-button {
  padding: 10px 20px;
  background: white;
  color: #3498db;
  border: 2px solid transparent;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(to right, white, white), linear-gradient(45deg, #3498db, #2980b9);
}

.card-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}
```
:::

## 最佳实践

1. **性能优化**：
   - 避免使用过多复杂的阴影效果，这会影响页面性能
   - 对于动画阴影，使用适当的缓动函数和持续时间
   - 考虑使用 `will-change` 属性提示浏览器优化阴影动画

2. **设计一致性**：
   - 在整个项目中保持圆角和阴影风格的一致性
   - 为不同层级的元素使用不同强度的阴影，创建视觉层次

3. **响应式调整**：
   - 在小屏幕设备上可以适当减小阴影大小和圆角半径
   - 使用媒体查询调整不同屏幕尺寸下的阴影和圆角效果

## 练习

1. 创建一个带有渐变边框和悬停动画效果的按钮。
2. 实现一个具有3D效果的卡片，包含阴影和圆角。
3. 设计一个发光的文本标题，使用动画文本阴影。
4. 创建一个带有波浪形圆角的特殊形状元素。
5. 实现一个具有动态边框颜色变化的元素。

### 4. 边框样式
CSS 支持多种边框样式：

```css
.element {
  border-style: none; /* 无边框 */
  border-style: hidden; /* 隐藏边框 */
  border-style: dotted; /* 点线 */
  border-style: dashed; /* 虚线 */
  border-style: solid; /* 实线 */
  border-style: double; /* 双线 */
  border-style: groove; /* 3D 凹槽边框 */
  border-style: ridge; /* 3D 凸槽边框 */
  border-style: inset; /* 3D 嵌入边框 */
  border-style: outset; /* 3D 突出边框 */
}
```

### 5. 高级边框技术

::: normal-demo
```html
<div class="advanced-border-demo">
  <div class="demo-item border-styles">不同边框样式</div>
  <div class="demo-item gradient-border-1">渐变边框方法1</div>
  <div class="demo-item gradient-border-2">
    <div class="content">渐变边框方法2</div>
  </div>
  <div class="demo-item animated-border">动画边框</div>
</div>
```
```css
.advanced-border-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.demo-item {
  width: 200px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 20px;
}

.border-styles {
  border-top: 3px solid red;
  border-right: 3px dashed blue;
  border-bottom: 3px dotted green;
  border-left: 3px double purple;
}

.gradient-border-1 {
  border: 4px solid transparent;
  border-image: linear-gradient(to right, red, blue) 1;
}

.gradient-border-2 {
  background: linear-gradient(to right, red, blue);
  padding: 2px;
  border-radius: 10px;
}

.gradient-border-2 .content {
  background: white;
  border-radius: 8px;
  padding: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.animated-border {
  position: relative;
  border: 2px solid transparent;
  background: linear-gradient(white, white) padding-box,
              linear-gradient(to right, red, blue) border-box;
  border-radius: 10px;
}

@keyframes rotate {
  0% {
    background: linear-gradient(white, white) padding-box,
                linear-gradient(0deg, red, blue) border-box;
  }
  100% {
    background: linear-gradient(white, white) padding-box,
                linear-gradient(360deg, red, blue) border-box;
  }
}

.animated-border:hover {
  animation: rotate 2s linear infinite;
}
```
:::

#### 边框图片
使用 `border-image` 属性可以用图片代替边框。

```css
.element {
  border-image-source: url("border.png");
  border-image-slice: 30;
  border-image-width: 10px;
  border-image-outset: 5px;
  border-image-repeat: round;
}

/* 简写形式 */
.element {
  border-image: url("border.png") 30 / 10px / 5px round;
}
```

#### 渐变边框
使用渐变作为边框。

```css
/* 方法 1: 使用 border-image */
.element {
  border: 4px solid transparent;
  border-image: linear-gradient(to right, red, blue) 1;
}

/* 方法 2: 使用 background-clip */
.element {
  background: linear-gradient(to right, red, blue);
  padding: 2px;
  border-radius: 10px;
}

.element > div {
  background: white;
  border-radius: 8px;
  padding: 20px;
}
```

#### 边框动画
为边框添加动画效果。

```css
.element {
  position: relative;
  border: 2px solid transparent;
  background: linear-gradient(white, white) padding-box,
              linear-gradient(to right, red, blue) border-box;
  border-radius: 10px;
}

@keyframes rotate {
  0% {
    background: linear-gradient(white, white) padding-box,
                linear-gradient(0deg, red, blue) border-box;
  }
  100% {
    background: linear-gradient(white, white) padding-box,
                linear-gradient(360deg, red, blue) border-box;
  }
}

.element:hover {
  animation: rotate 2s linear infinite;
}
```

## 最佳实践
- 使用 `border-radius` 创建圆角时，考虑使用相对单位（如 %）以适应不同尺寸的元素
- 为阴影添加适当的透明度（rgba 颜色），使阴影看起来更自然
- 避免为过多元素添加复杂的阴影效果，以免影响性能
- 对于渐变边框，测试不同浏览器的兼容性
- 结合 `border-radius` 和 `box-shadow` 创建卡片效果时，注意阴影的传播半径和模糊半径的设置
- 为边框动画添加适当的过渡效果，使动画更平滑

## 练习
1. 创建不同圆角效果的元素
2. 为元素添加阴影效果，包括外阴影和内阴影
3. 创建文本阴影效果
4. 实现渐变边框效果
5. 为边框添加动画效果
6. 设计一个具有圆角、阴影和特殊边框的卡片组件

通过本章节的学习，你应该掌握 CSS 中的圆角、阴影和边框技术，能够创建具有深度感和设计感的元素，提升页面的视觉效果。