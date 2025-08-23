# 函数补充

## 基本概念
CSS函数是一种特殊的语法，用于表示值或调用特定的功能。本章节补充介绍一些常用但在之前章节中未详细讨论的CSS函数。

## 数学函数 (Math Functions)
### 1. 基本数学函数
```css
/* 绝对值 */
.element {
  margin-left: abs(-10px);
}

/* 取整 */
.element {
  width: round(10.5px); /* 四舍五入 */
  height: ceil(10.2px); /* 向上取整 */
  padding: floor(10.8px); /* 向下取整 */
}

/* 最小值和最大值 */
.element {
  width: min(100px, 50%); /* 取较小值 */
  height: max(100px, 50%); /* 取较大值 */
}

/*  clamp */
.element {
  font-size: clamp(1rem, 2vw, 2rem); /* 限制在最小值和最大值之间 */
}
```

::: normal-demo

```html
<div class="math-functions">
  <div class="min-max-example">min/max示例</div>
  <div class="clamp-example">clamp示例</div>
  <div class="trigonometric-example">三角函数示例</div>
</div>
```

```css
/* 基本数学函数示例 */
.min-max-example {
  width: min(300px, 80%); /* 取较小值 */
  height: max(100px, 20vh); /* 取较大值 */
  background-color: #3498db;
  color: white;
  padding: 20px;
  margin-bottom: 20px;
}

.clamp-example {
  font-size: clamp(1rem, 3vw, 2rem); /* 响应式字体 */
  width: clamp(200px, 50%, 600px);
  background-color: #2ecc71;
  color: white;
  padding: 20px;
  margin-bottom: 20px;
}

.trigonometric-example {
  width: calc(sin(45deg) * 100px + 100px);
  height: calc(cos(45deg) * 100px + 50px);
  background-color: #e74c3c;
  color: white;
  padding: 20px;
  transform: rotate(tan(0.5) * 10deg);
}
```

:::

### 2. 三角函数
```css
.element {
  transform: rotate(sin(45deg) * 10deg);
  width: cos(60deg) * 100px;
  height: tan(30deg) * 50px;
}

/* 反三角函数 */
.element {
  transform: rotate(asin(0.5) * (180deg / pi()));
  width: acos(0.5) * (180deg / pi());
  height: atan(1) * (180deg / pi());
}

/* 双曲函数 */
.element {
  width: sinh(1) * 10px;
  height: cosh(1) * 10px;
  margin: tanh(0.5) * 10px;
}
```

### 3. 其他数学函数
```css
/* 平方根 */
.element {
  width: sqrt(100px); /* 10px */
}

/* 自然对数和以10为底的对数 */
.element {
  width: log(10); /* 自然对数 */
  height: log10(100); /* 以10为底的对数 */
}

/* 幂函数 */
.element {
  width: pow(2, 3); /* 8 */
}

/* 常量pi */
.element {
  border-radius: 50%;
  width: pi() * 10px; /* 约31.4159px */
}
```

## 颜色函数 (Color Functions)
### 1. `rgb()`和`rgba()`
```css
.element {
  color: rgb(255, 0, 0);
  background-color: rgba(0, 0, 255, 0.5);
}

/* 新语法（不带逗号） */
.element {
  color: rgb(255 0 0);
  background-color: rgba(0, 0, 255 / 0.5);
}
```

### 2. `hsl()`和`hsla()`
```css
.element {
  color: hsl(120, 100%, 50%);
  background-color: hsla(240, 100%, 50%, 0.5);
}

/* 新语法（不带逗号） */
.element {
  color: hsl(120 100% 50%);
  background-color: hsl(240 100% 50% / 0.5);
}
```

### 3. `hwb()`
```css
/* 色相、白度、黑度 */
.element {
  color: hwb(120 0% 0%); /* 绿色 */
  background-color: hwb(240 0% 50% / 0.5); /* 半透明深蓝色 */
}
```

### 4. `lab()`和`lch()`
```css
/* Lab颜色空间 */
.element {
  color: lab(50% 50 50);
  background-color: lab(70% -30 20 / 0.8);
}

/* LCH颜色空间 */
.element {
  color: lch(50% 50 120);
  background-color: lch(70% 60 240 / 0.8);
}
```

### 5. `color-mix()`
```css
/* 混合颜色 */
.element {
  color: color-mix(in srgb, red, blue);
  background-color: color-mix(in hsl, red 20%, blue 80%);
}
```

::: normal-demo

```html
<div class="color-functions">
  <div class="rgb-example">RGB示例</div>
  <div class="hsl-example">HSL示例</div>
  <div class="color-mix-example">颜色混合示例</div>
  <div class="lab-lch-example">Lab/LCH示例</div>
</div>
```

```css
/* 颜色函数示例 */
.rgb-example {
  background-color: rgb(255 0 0 / 0.7); /* 新语法 */
  color: white;
  padding: 15px;
  margin-bottom: 10px;
}

.hsl-example {
  background-color: hsl(240 100% 50% / 0.5); /* 新语法 */
  color: white;
  padding: 15px;
  margin-bottom: 10px;
}

.color-mix-example {
  background-color: color-mix(in srgb, red 30%, blue 70%);
  color: white;
  padding: 15px;
  margin-bottom: 10px;
}

.lab-lch-example {
  background-color: lab(70% -30 20 / 0.8);
  color: black;
  padding: 15px;
}
```

:::

## 图像函数 (Image Functions)
### 1. `url()`
```css
.element {
  background-image: url('image.jpg');
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><rect width="10" height="10" fill="%233498db"/></svg>');
}
```

### 2. `image-set()`
```css
/* 根据分辨率选择图像 */
.element {
  background-image: image-set(
    'image.jpg' 1x,
    'image@2x.jpg' 2x,
    'image@3x.jpg' 3x
  );
}
```

### 3. `linear-gradient()`和`radial-gradient()`
```css
/* 线性渐变 */
.element {
  background-image: linear-gradient(to right, red, blue);
  background-image: linear-gradient(45deg, red, yellow, blue);
}

/* 径向渐变 */
.element {
  background-image: radial-gradient(circle, red, blue);
  background-image: radial-gradient(ellipse at top right, red, blue);
}
```
### 4. `conic-gradient()`
圆锥渐变可以创建围绕中心点的颜色渐变，特别适合创建饼图、仪表盘等效果。

::: normal-demo
```html
<div class="conic-gradient-demo">
  <div class="pie-chart"></div>
  <div class="color-wheel"></div>
  <div class="donut-chart"></div>
</div>
```
```css
/* 圆锥渐变示例 */
.conic-gradient-demo {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.pie-chart {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-image: conic-gradient(
    red 0deg 90deg,
    yellow 90deg 180deg,
    green 180deg 270deg,
    blue 270deg 360deg
  );
}

.color-wheel {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-image: conic-gradient(
    hsl(0, 100%, 50%),
    hsl(60, 100%, 50%),
    hsl(120, 100%, 50%),
    hsl(180, 100%, 50%),
    hsl(240, 100%, 50%),
    hsl(300, 100%, 50%),
    hsl(360, 100%, 50%)
  );
}

.donut-chart {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-image:
    conic-gradient(
      red 0deg 45deg,
      orange 45deg 90deg,
      yellow 90deg 135deg,
      green 135deg 180deg,
      blue 180deg 225deg,
      indigo 225deg 270deg,
      violet 270deg 315deg,
      pink 315deg 360deg
    ),
    radial-gradient(white 30%, transparent 30%);
}
```
:::

```css
/* 圆锥渐变 */
.element {
  background-image: conic-gradient(red, yellow, green, blue, purple);
  background-image: conic-gradient(from 90deg, red 0deg 90deg, blue 90deg 180deg);
}
```

## 布局函数 (Layout Functions)
### 1. `calc()`
`calc()` 函数可以在CSS中执行计算，非常适合创建灵活的布局。

::: normal-demo
```html
<div class="calc-layout-demo">
  <div class="sidebar">侧边栏</div>
  <div class="content">内容区域</div>
  <div class="dynamic-size">动态大小</div>
</div>
```
```css
/* calc() 布局示例 */
.calc-layout-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.sidebar {
  width: calc(30% - 10px);
  min-height: 200px;
  background-color: #3498db;
  color: white;
  padding: 20px;
}

.content {
  width: calc(70% - 10px);
  min-height: 200px;
  background-color: #2ecc71;
  color: white;
  padding: 20px;
}

.dynamic-size {
  width: calc(100% - 40px);
  height: calc(100px + 5vh);
  background-color: #e74c3c;
  color: white;
  padding: 20px;
  margin-top: 20px;
}
```
:::

```css
.element {
  width: calc(100% - 20px);
  height: calc(50vh + 100px);
  margin: calc(2rem * 1.5);
}
```

### 2. 布局函数组合
可以结合多种布局函数创建复杂的响应式布局。

::: normal-demo
```html
<div class="layout-combination">
  <header>页头</header>
  <main>
    <div class="article">文章内容</div>
    <aside>侧边栏</aside>
  </main>
  <footer>页脚</footer>
</div>
```
```css
/* 布局函数组合示例 */
.layout-combination {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  height: clamp(60px, 10vh, 100px);
  background-color: #3498db;
  color: white;
  padding: 0 20px;
  display: flex;
  align-items: center;
}

main {
  flex: 1;
  display: flex;
  gap: 20px;
  padding: 20px;
}

.article {
  width: clamp(300px, 70%, 800px);
  background-color: #f5f5f5;
  padding: 20px;
}

aside {
  width: clamp(200px, 30%, 400px);
  background-color: #e0e0e0;
  padding: 20px;
}

footer {
  height: clamp(40px, 5vh, 60px);
  background-color: #2c3e50;
  color: white;
  padding: 0 20px;
  display: flex;
  align-items: center;
}

/* 响应式调整 */
@media (max-width: 768px) {
  main {
    flex-direction: column;
  }

  .article,
  aside {
    width: 100%;
  }
}
```
:::

## 最佳实践

1. **合理选择函数**：根据具体需求选择合适的CSS函数，避免过度使用复杂函数
2. **性能优化**：某些函数（如复杂的渐变或计算）可能影响性能，需谨慎使用
3. **浏览器兼容性**：注意函数的浏览器支持情况，必要时提供回退方案
4. **组合使用**：尝试将不同类型的函数组合使用，创造更丰富的效果
5. **可读性**：保持代码清晰可读，为复杂的函数调用添加注释
6. **响应式设计**：利用`clamp()`、`min()`、`max()`等函数创建响应式布局
7. **动画效果**：结合三角函数和自定义属性创建平滑的动画效果

## 练习

1. 创建一个使用三角函数的动画效果
2. 使用`conic-gradient()`实现一个饼图
3. 利用`clamp()`和`calc()`创建响应式布局
4. 尝试使用`color-mix()`创建一组和谐的颜色方案
5. 比较不同颜色空间（srgb、hsl、lab）在`color-mix()`中的效果差异
6. 构建一个结合多种布局函数的复杂页面布局

通过本章节的学习，你应该掌握各种CSS函数的用法和最佳实践，能够灵活运用这些函数创建丰富的视觉效果和灵活的布局。
  width: calc(100% - 40px);
  height: calc(100px + 5vh);
  background-color: #9b59b6;
  color: white;
  padding: 20px;
  margin-bottom: 20px;
}

.clamp-layout-example {
  width: clamp(250px, 50%, 800px);
  height: clamp(100px, 20vh, 300px);
  background-color: #1abc9c;
  color: white;
  padding: 20px;
  margin-bottom: 20px;
}

.grid-example {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-rows: repeat(2, 100px);
  gap: 1rem;
}

.grid-example > div {
  background-color: #34495e;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

:::

### 2. `clamp()`
```css
.element {
  font-size: clamp(1rem, 2vw, 2rem);
  width: clamp(300px, 50%, 800px);
}
```

### 3. `grid-template-rows`和`grid-template-columns`中的函数
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-rows: repeat(3, 100px);
  gap: 1rem;
}
```

## 其他有用的函数
### 1. `attr()`
```css
/* 获取HTML属性值 */
[data-tooltip]::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 5px;
  background-color: #333;
  color: white;
  border-radius: 3px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s;
}

[data-tooltip]:hover::after {
  opacity: 1;
}
```

### 2. `counter()`和`counters()`
```css
/* 计数器 */
ol {
  counter-reset: section;
  list-style-type: none;
}

li::before {
  counter-increment: section;
  content: counter(section) ". ";
  font-weight: bold;
}

/* 嵌套计数器 */
ol {
  counter-reset: chapter;
  list-style-type: none;
}

li::before {
  counter-increment: chapter;
  content: counter(chapter) ". ";
}

li ol {
  counter-reset: section;
}

li li::before {
  counter-increment: section;
  content: counter(chapter) "." counter(section) ". ";
}
```

### 3. `var()`
```css
/* CSS变量 */
:root {
  --primary-color: #3498db;
  --spacing: 1rem;
}

.element {
  color: var(--primary-color);
  margin: var(--spacing);
  padding: var(--spacing, 10px); /* 带默认值 */
}
```

## 最佳实践
- 熟悉并合理使用CSS函数，提高代码的简洁性和可读性
- 结合CSS变量和函数，创建更加灵活和可维护的样式
- 注意浏览器兼容性，提供降级方案
- 避免在关键性能路径上使用复杂的函数
- 使用数学函数实现动态计算，减少硬编码
- 利用颜色函数创建和谐的色彩方案
- 测试函数在不同浏览器和设备上的表现

## 练习
1. 使用数学函数创建响应式布局
2. 结合CSS变量和函数实现主题切换
3. 使用颜色函数创建渐变效果
4. 实现自定义计数器样式
5. 使用图像函数优化图像加载
6. 测试不同函数在各种浏览器上的兼容性
7. 创建一个使用多种CSS函数的复杂组件

通过本章节的学习，你应该掌握各种CSS函数的使用方法，能够灵活运用这些函数解决实际问题，创建更加动态和可维护的CSS代码。