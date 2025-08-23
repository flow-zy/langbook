# Transform

## Transform 基本概念
CSS Transform 允许我们对元素进行旋转、缩放、平移和倾斜等操作，为页面添加动态效果和立体感。

### 1. 2D 变换
2D 变换是在平面上进行的变换操作。

::: normal-demo

```html
<div class="transform-2d-demo">
  <div class="transform-box translate">平移</div>
  <div class="transform-box rotate">旋转</div>
  <div class="transform-box scale">缩放</div>
  <div class="transform-box skew">倾斜</div>
</div>
```

```css
/* 2D变换示例 */
.transform-2d-demo {
  display: flex;
  gap: 40px;
  margin-bottom: 40px;
}

.transform-box {
  width: 100px;
  height: 100px;
  background-color: #3498db;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: transform 0.3s ease;
}

/* 平移效果 */
.translate:hover {
  transform: translate(20px, 10px);
}

/* 旋转效果 */
.rotate:hover {
  transform: rotate(45deg);
}

/* 缩放效果 */
.scale:hover {
  transform: scale(1.3);
}

/* 倾斜效果 */
.skew:hover {
  transform: skew(10deg, 5deg);
}
```

:::

#### 平移 (translate)
```css
.element {
  transform: translate(10px, 20px); /* 向右移动 10px，向下移动 20px */
  transform: translateX(10px); /* 仅水平移动 */
  transform: translateY(20px); /* 仅垂直移动 */
}
```

#### 旋转 (rotate)
```css
.element {
  transform: rotate(45deg); /* 顺时针旋转 45 度 */
  transform: rotate(-45deg); /* 逆时针旋转 45 度 */
}
```

#### 缩放 (scale)
```css
.element {
  transform: scale(1.5); /* 水平和垂直方向都放大 1.5 倍 */
  transform: scaleX(1.5); /* 仅水平方向放大 */
  transform: scaleY(1.2); /* 仅垂直方向放大 */
  transform: scale(0.8); /* 缩小 */
}
```

#### 倾斜 (skew)
```css
.element {
  transform: skew(10deg, 5deg); /* 水平方向倾斜 10 度，垂直方向倾斜 5 度 */
  transform: skewX(10deg); /* 仅水平方向倾斜 */
  transform: skewY(5deg); /* 仅垂直方向倾斜 */
}
```

#### 矩阵变换 (matrix)
```css
.element {
  transform: matrix(a, b, c, d, e, f);
  /* a: 水平缩放, b: 水平倾斜, c: 垂直倾斜, d: 垂直缩放, e: 水平平移, f: 垂直平移 */
}
```

### 2. 3D 变换
3D 变换在 2D 变换的基础上增加了深度维度。

::: normal-demo

```html
<div class="transform-3d-demo">
  <div class="perspective-container">
    <div class="cube">
      <div class="cube-face front">前</div>
      <div class="cube-face back">后</div>
      <div class="cube-face right">右</div>
      <div class="cube-face left">左</div>
      <div class="cube-face top">上</div>
      <div class="cube-face bottom">下</div>
    </div>
  </div>
  <p>鼠标悬停查看3D旋转效果</p>
</div>
```

```css
/* 3D变换示例 - 立方体 */
.transform-3d-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
}

.perspective-container {
  perspective: 1000px;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cube {
  position: relative;
  width: 100px;
  height: 100px;
  transform-style: preserve-3d;
  transition: transform 1s ease;
}

.perspective-container:hover .cube {
  transform: rotateX(45deg) rotateY(45deg);
}

.cube-face {
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: rgba(52, 152, 219, 0.7);
  border: 2px solid #2980b9;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.front {
  transform: translateZ(50px);
}

.back {
  transform: translateZ(-50px) rotateY(180deg);
}

.right {
  transform: translateX(50px) rotateY(90deg);
}

.left {
  transform: translateX(-50px) rotateY(-90deg);
}

.top {
  transform: translateY(-50px) rotateX(90deg);
}

.bottom {
  transform: translateY(50px) rotateX(-90deg);
}

.transform-3d-demo p {
  margin-top: 20px;
  color: #555;
}
```

:::

#### 3D 平移
```css
.element {
  transform: translate3d(10px, 20px, 30px); /* X, Y, Z 轴平移 */
  transform: translateX(10px);
  transform: translateY(20px);
  transform: translateZ(30px); /* Z 轴平移，需要设置 perspective */
}
```

#### 3D 旋转
```css
.element {
  transform: rotate3d(1, 1, 0, 45deg); /* 沿 X, Y 轴旋转 45 度 */
  transform: rotateX(45deg); /* 沿 X 轴旋转 */
  transform: rotateY(45deg); /* 沿 Y 轴旋转 */
  transform: rotateZ(45deg); /* 沿 Z 轴旋转，等同于 2D 的 rotate */
}
```

#### 3D 缩放
```css
.element {
  transform: scale3d(1.5, 1.2, 2); /* X, Y, Z 轴缩放 */
  transform: scaleZ(2); /* Z 轴缩放 */
}
```

#### 透视 (perspective)
```css
/* 在父元素上设置透视 */
.parent {
  perspective: 1000px;
}

/* 或在元素自身设置 */
.element {
  transform: perspective(1000px) rotateX(45deg);
}
```

#### 视距原点 (perspective-origin)
```css
.parent {
  perspective: 1000px;
  perspective-origin: 50% 50%; /* 默认，中心点 */
  perspective-origin: top left; /* 左上角 */
}
```

#### 变换样式 (transform-style)
```css
.parent {
  transform-style: preserve-3d; /* 保持子元素的 3D 效果 */
  transform-style: flat; /* 默认，将子元素展平 */
}
```

#### 背面可见性 (backface-visibility)
```css
.element {
  backface-visibility: visible; /* 默认，背面可见 */
  backface-visibility: hidden; /* 背面不可见 */
}
```

### 3. 变换原点 (transform-origin)
```css
.element {
  transform-origin: 50% 50%; /* 默认，中心点 */
  transform-origin: top left; /* 左上角 */
  transform-origin: 100px 200px; /* 具体坐标 */
  transform-origin: center bottom; /* 底部中心 */
}
```

### 4. 变换组合
可以同时应用多个变换操作，用空格分隔。变换的顺序会影响最终效果。

::: normal-demo
```html
<div class="transform-combination-demo">
  <div class="combination-box translate-rotate">平移+旋转</div>
  <div class="combination-box rotate-translate">旋转+平移</div>
  <div class="combination-box scale-rotate-skew">缩放+旋转+倾斜</div>
</div>
```
```css
/* 变换组合示例 */
.transform-combination-demo {
  display: flex;
  gap: 40px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.combination-box {
  width: 100px;
  height: 100px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: transform 0.5s ease;
  font-size: 14px;
  text-align: center;
  padding: 5px;
}

/* 先平移后旋转 */
.translate-rotate {
  background-color: #3498db;
}

.translate-rotate:hover {
  transform: translate(20px, 10px) rotate(45deg);
}

/* 先旋转后平移 */
.rotate-translate {
  background-color: #2ecc71;
}

.rotate-translate:hover {
  transform: rotate(45deg) translate(20px, 10px);
}

/* 缩放+旋转+倾斜 */
.scale-rotate-skew {
  background-color: #e74c3c;
}

.scale-rotate-skew:hover {
  transform: scale(1.2) rotate(30deg) skew(5deg, 5deg);
}
```
:::

```css
.element {
  transform: translate(10px, 20px) rotate(45deg) scale(1.5);
}
```

### 5. 高级3D变换
结合多个3D变换属性，可以创建复杂的3D效果。

::: normal-demo
```html
<div class="advanced-3d-demo">
  <div class="carousel-container">
    <div class="carousel">
      <div class="carousel-item">1</div>
      <div class="carousel-item">2</div>
      <div class="carousel-item">3</div>
      <div class="carousel-item">4</div>
      <div class="carousel-item">5</div>
      <div class="carousel-item">6</div>
    </div>
  </div>
  <div class="controls">
    <button id="rotateLeft">向左旋转</button>
    <button id="rotateRight">向右旋转</button>
  </div>
</div>
```
```css
/* 高级3D变换示例 - 旋转木马 */
.advanced-3d-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
}

.carousel-container {
  perspective: 1000px;
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
}

.carousel {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 1s ease;
  transform: rotateY(0deg);
}

.carousel-item {
  position: absolute;
  width: 100px;
  height: 100px;
  left: 50px;
  top: 50px;
  background-color: rgba(52, 152, 219, 0.7);
  border: 2px solid #2980b9;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border-radius: 4px;
}

/* 定位各个项目 */
.carousel-item:nth-child(1) {
  transform: rotateY(0deg) translateZ(100px);
}

.carousel-item:nth-child(2) {
  transform: rotateY(60deg) translateZ(100px);
}

.carousel-item:nth-child(3) {
  transform: rotateY(120deg) translateZ(100px);
}

.carousel-item:nth-child(4) {
  transform: rotateY(180deg) translateZ(100px);
}

.carousel-item:nth-child(5) {
  transform: rotateY(240deg) translateZ(100px);
}

.carousel-item:nth-child(6) {
  transform: rotateY(300deg) translateZ(100px);
}

.controls {
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 12px;
  cursor: pointer;
  background-color: #9b59b6;
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #8e44ad;
}
```
```js
// 控制旋转木马
const carousel = document.querySelector('.carousel');
const rotateLeftBtn = document.getElementById('rotateLeft');
const rotateRightBtn = document.getElementById('rotateRight');
let currentRotation = 0;

rotateLeftBtn.addEventListener('click', () => {
  currentRotation += 60;
  carousel.style.transform = `rotateY(${currentRotation}deg)`;
});

rotateRightBtn.addEventListener('click', () => {
  currentRotation -= 60;
  carousel.style.transform = `rotateY(${currentRotation}deg)`;
});
```
:::

### 5. 变换与过渡/动画结合
变换与CSS过渡和动画结合，可以创建丰富的动态效果。

::: normal-demo
```html
<div class="transform-animation-demo">
  <div class="animated-object"></div>
  <div class="spinner"></div>
</div>
```
```css
/* 变换与动画结合示例 */
.transform-animation-demo {
  display: flex;
  gap: 40px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.animated-object {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #3498db, #9b59b6);
  border-radius: 10px;
  animation: complexTransform 5s ease-in-out infinite;
  transform-style: preserve-3d;
}

.spinner {
  width: 100px;
  height: 100px;
  border: 10px solid #f39c12;
  border-top: 10px solid #e74c3c;
  border-radius: 50%;
  animation: spin 2s linear infinite;
}

@keyframes complexTransform {
  0% {
    transform: rotateX(0deg) rotateY(0deg) scale(1);
  }
  25% {
    transform: rotateX(45deg) rotateY(90deg) scale(1.2);
  }
  50% {
    transform: rotateX(90deg) rotateY(180deg) scale(1);
  }
  75% {
    transform: rotateX(45deg) rotateY(270deg) scale(0.8);
  }
  100% {
    transform: rotateX(0deg) rotateY(360deg) scale(1);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```
:::

### 6. 实际应用示例
变换在UI设计中有许多实际应用。

::: normal-demo
```html
<div class="transform-applications">
  <div class="card-flip">
    <div class="card-inner">
      <div class="card-front">正面</div>
      <div class="card-back">背面</div>
    </div>
  </div>
  <div class="3d-button">
    <button>3D按钮</button>
  </div>
</div>
```
```css
/* 变换实际应用示例 */
.transform-applications {
  display: flex;
  gap: 40px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

/* 卡片翻转效果 */
.card-flip {
  width: 200px;
  height: 300px;
  perspective: 1000px;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.card-flip:hover .card-inner {
  transform: rotateY(180deg);
}

.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  color: white;
  font-size: 24px;
}

.card-front {
  background-color: #3498db;
}

.card-back {
  background-color: #2ecc71;
  transform: rotateY(180deg);
}

/* 3D按钮效果 */
.3d-button button {
  padding: 12px 24px;
  background-color: #9b59b6;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  transform: perspective(100px) rotateX(5deg);
  transform-origin: bottom;
  box-shadow: 0 6px 0 #8e44ad;
  transition: all 0.1s ease;
  cursor: pointer;
}

.3d-button button:hover {
  transform: perspective(100px) rotateX(2deg);
  box-shadow: 0 4px 0 #8e44ad;
}

.3d-button button:active {
  transform: perspective(100px) rotateX(0deg);
  box-shadow: 0 0 0 #8e44ad;
  margin-top: 6px;
}
```
:::

## 性能优化
变换通常性能很好，但仍有一些优化技巧可以遵循：

::: normal-demo
```html
<div class="performance-demo">
  <div class="optimized-transform">优化的变换</div>
  <div class="non-optimized-transform">非优化的变换</div>
</div>
```
```css
/* 变换性能优化示例 */
.performance-demo {
  display: flex;
  gap: 40px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.optimized-transform,
.non-optimized-transform {
  width: 150px;
  height: 150px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
}

.optimized-transform {
  background-color: #2ecc71;
  will-change: transform; /* 提示浏览器将要变换 */
  transform: translateZ(0); /* 触发硬件加速 */
  animation: optimizedRotation 2s linear infinite;
}

.non-optimized-transform {
  background-color: #e74c3c;
  animation: nonOptimizedRotation 2s linear infinite;
}

@keyframes optimizedRotation {
  0% {
    transform: rotate(0deg) translateZ(0);
  }
  100% {
    transform: rotate(360deg) translateZ(0);
  }
}

@keyframes nonOptimizedRotation {
  0% {
    width: 150px;
    height: 150px;
  }
  50% {
    width: 200px;
    height: 200px;
  }
  100% {
    width: 150px;
    height: 150px;
  }
}
```
:::

- 优先使用 `transform` 和 `opacity` 进行动画，它们可以利用 GPU 加速
- 避免在变换过程中使用 `transform: matrix()`，因为它的计算成本较高
- 对于复杂的 3D 变换，考虑使用 `will-change: transform` 提示浏览器进行优化
- 避免频繁地修改变换属性，这会导致浏览器频繁重绘
- 对于需要大量变换的元素，使用 `transform: translateZ(0)` 触发硬件加速
- 对于不再需要变换的元素，及时移除变换属性或设置为 `none`

```css
.element {
  transform: translateZ(0); /* 触发硬件加速 */
  will-change: transform; /* 提示浏览器将要变换 */
}
```

## 最佳实践
- 结合 `transform` 和 `transition` 创建平滑的动画效果
- 使用 3D 变换创建深度感和立体感
- 为变换设置合适的原点，以获得期望的效果
- 测试变换在不同浏览器上的兼容性
- 注意变换会创建新的层叠上下文
- 对于响应式设计，考虑使用相对单位（如 %）进行变换

## 练习
1. 使用 2D 变换创建悬停效果
2. 实现一个 3D 旋转的立方体
3. 创建一个使用视差效果的滚动动画
4. 结合变换和过渡创建平滑的页面切换效果
5. 优化变换动画的性能
6. 设计一个具有变换效果的加载动画

通过本章节的学习，你应该掌握 CSS 中的变换技术，包括 2D 变换和 3D 变换，能够创建丰富多样的动态效果和立体感，提升用户体验。