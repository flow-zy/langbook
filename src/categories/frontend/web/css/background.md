# 背景

## 背景基础
CSS 提供了一系列属性来控制元素的背景，包括颜色、图片、渐变等。

::: normal-demo
```html
<div class="background-demo">
  <div class="demo-item bg-color">背景颜色</div>
  <div class="demo-item bg-image">背景图片</div>
  <div class="demo-item bg-repeat">背景重复</div>
  <div class="demo-item bg-position">背景位置</div>
  <div class="demo-item bg-size">背景大小</div>
</div>
```
```css
.background-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.demo-item {
  width: 150px;
  height: 150px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
}

.bg-color {
  background-color: #f5f5f5;
}

.bg-image {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><rect width="10" height="10" fill="%23f00" /></svg>');
  background-repeat: no-repeat;
  background-position: center;
}

.bg-repeat {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="5" fill="%2300f" /></svg>');
  background-repeat: repeat;
}

.bg-position {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><polygon points="10,0 20,20 0,20" fill="%230f0" /></svg>');
  background-repeat: no-repeat;
  background-position: bottom right;
}

.bg-size {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><rect width="40" height="40" fill="none" stroke="%23999" stroke-width="2" /><circle cx="20" cy="20" r="15" fill="none" stroke="%23f90" stroke-width="2" /></svg>');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 80% 80%;
}
```
:::

### 1. 背景颜色
使用 `background-color` 属性设置元素的背景颜色。

```css
.element {
  background-color: #f5f5f5;
  background-color: rgb(245, 245, 245);
  background-color: hsl(0, 0%, 96%);
  background-color: transparent; /* 透明背景 */
}
```

### 2. 背景图片
使用 `background-image` 属性设置元素的背景图片。

```css
.element {
  background-image: url("image.jpg");
}
```

### 3. 背景重复
使用 `background-repeat` 属性控制背景图片的重复方式。

```css
.element {
  background-repeat: repeat; /* 默认，水平和垂直方向都重复 */
  background-repeat: repeat-x; /* 只在水平方向重复 */
  background-repeat: repeat-y; /* 只在垂直方向重复 */
  background-repeat: no-repeat; /* 不重复 */
  background-repeat: space; /* 均匀分布图片，不裁剪 */
  background-repeat: round; /* 均匀分布图片，可能会缩放 */
}
```

### 4. 背景位置
使用 `background-position` 属性控制背景图片的位置。

```css
/* 使用关键字 */
.element {
  background-position: top left;
  background-position: center center;
  background-position: bottom right;
}

/* 使用长度值 */
.element {
  background-position: 10px 20px; /* 水平方向 10px，垂直方向 20px */
}

/* 使用百分比 */
.element {
  background-position: 50% 50%; /* 居中 */
}

/* 混合使用 */
.element {
  background-position: right 10px bottom 20px; /* 距离右边 10px，距离底部 20px */
}
```

### 5. 背景大小
使用 `background-size` 属性控制背景图片的大小。

```css
/* 使用长度值 */
.element {
  background-size: 200px 100px;
}

/* 使用百分比 */
.element {
  background-size: 50% 50%;
}

/* 关键字 */
.element {
  background-size: cover; /* 覆盖整个元素，可能会裁剪 */
  background-size: contain; /* 完全包含在元素内，可能会留白 */
  background-size: auto; /* 默认，保持原始大小 */
}
```

### 6. 背景附着
使用 `background-attachment` 属性控制背景图片的附着方式。

```css
.element {
  background-attachment: scroll; /* 默认，随页面滚动 */
  background-attachment: fixed; /* 固定在视口，不随页面滚动 */
  background-attachment: local; /* 随元素内容滚动 */
}
```

### 7. 背景简写形式
可以使用 `background` 属性一次性设置多个背景相关属性。

```css
.element {
  background: #f5f5f5 url("image.jpg") no-repeat center center / cover fixed;
  /* 顺序：颜色 图片 重复 位置 / 大小 附着 */
}
```

## 高级背景技术

### 1. 多背景图片
可以为一个元素设置多个背景图片，用逗号分隔。

::: normal-demo
```html
<div class="multiple-backgrounds"></div>
```
```css
.multiple-backgrounds {
  width: 300px;
  height: 200px;
  border: 1px solid #ddd;
  background-image: 
    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"><circle cx="25" cy="25" r="20" fill="%23ff0000" opacity="0.3" /></svg>'),
    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect x="0" y="0" width="100" height="100" fill="%2300ff00" opacity="0.2" /></svg>'),
    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150"><polygon points="75,0 150,150 0,150" fill="%230000ff" opacity="0.1" /></svg>');
  background-position: top left, center, bottom right;
  background-repeat: no-repeat, no-repeat, no-repeat;
  background-size: 50px 50px, 100px 100px, 150px 150px;
}
```
:::

```css
.element {
  background-image: url("image1.jpg"), url("image2.jpg");
  background-position: top left, bottom right;
  background-repeat: no-repeat, no-repeat;
  background-size: 100px 100px, cover;
}

/* 简写形式 */
.element {
  background: url("image1.jpg") top left no-repeat 100px 100px, 
              url("image2.jpg") bottom right no-repeat cover;
}
```

### 2. 背景渐变
CSS 支持多种类型的渐变，可以用作背景。

::: normal-demo
```html
<div class="gradient-demo">
  <div class="demo-item linear-gradient">线性渐变</div>
  <div class="demo-item radial-gradient">径向渐变</div>
  <div class="demo-item repeating-gradient">重复渐变</div>
</div>
```
```css
.gradient-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.demo-item {
  width: 200px;
  height: 150px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}

.linear-gradient {
  background-image: linear-gradient(to right bottom, #ff0000, #0000ff);
}

.radial-gradient {
  background-image: radial-gradient(circle at center, #ff0000, #0000ff);
}

.repeating-gradient {
  background-image: repeating-linear-gradient(45deg, #ff0000, #ff0000 10px, #0000ff 10px, #0000ff 20px);
}
```
:::

#### 线性渐变
```css
.element {
  background-image: linear-gradient(to right, red, blue); /* 从左到右，红色到蓝色 */
  background-image: linear-gradient(to bottom right, red, blue); /* 从左上到右下 */
  background-image: linear-gradient(45deg, red, blue); /* 45度角 */
  background-image: linear-gradient(red, yellow, blue); /* 多色渐变 */
  background-image: linear-gradient(to right, red 0%, yellow 50%, blue 100%); /* 带位置的多色渐变 */
}
```

#### 径向渐变
```css
.element {
  background-image: radial-gradient(circle, red, blue); /* 圆形渐变 */
  background-image: radial-gradient(ellipse, red, blue); /* 椭圆形渐变 */
  background-image: radial-gradient(circle at center, red, blue); /* 中心点 */
  background-image: radial-gradient(circle at top left, red, blue); /* 左上角 */
  background-image: radial-gradient(red 0%, yellow 50%, blue 100%); /* 多色渐变 */
}
```

#### 重复渐变
```css
.element {
  background-image: repeating-linear-gradient(to right, red, blue 10px); /* 重复线性渐变 */
  background-image: repeating-radial-gradient(circle, red, blue 10px); /* 重复径向渐变 */
}
```

### 3. 背景遮罩
使用 `mask-image` 属性可以实现背景遮罩效果，通过遮罩图片控制背景的显示区域。

::: normal-demo
```html
<div class="mask-demo">
  <div class="mask-item mask-circle">圆形遮罩</div>
  <div class="mask-item mask-text">文字遮罩</div>
  <div class="mask-item mask-gradient">渐变遮罩</div>
</div>
```
```css
.mask-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 40px;
}

.mask-item {
  width: 200px;
  height: 200px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%233498db" /><circle cx="100" cy="100" r="50" fill="%23e74c3c" /><polygon points="100,20 150,150 50,150" fill="%232ecc71" /></svg>');
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}

/* 圆形遮罩 */
.mask-circle {
  mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><circle cx="100" cy="100" r="80" fill="black" /></svg>');
  -webkit-mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><circle cx="100" cy="100" r="80" fill="black" /></svg>');
  mask-size: cover;
  -webkit-mask-size: cover;
}

/* 文字遮罩 */
.mask-text {
  mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><text x="50%" y="50%" font-family="Arial" font-size="30" text-anchor="middle" dominant-baseline="middle" fill="black">CSS</text></svg>');
  -webkit-mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><text x="50%" y="50%" font-family="Arial" font-size="30" text-anchor="middle" dominant-baseline="middle" fill="black">CSS</text></svg>');
  mask-size: cover;
  -webkit-mask-size: cover;
}

/* 渐变遮罩 */
.mask-gradient {
  mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
  mask-size: cover;
  -webkit-mask-size: cover;
}
```
:::

```css
.element {
  background-image: url("image.jpg");
  mask-image: url("mask.png");
  mask-size: cover;
  -webkit-mask-image: url("mask.png"); /* Safari 兼容性 */
  -webkit-mask-size: cover;
}
### 4. 背景混合模式
使用 `background-blend-mode` 属性可以设置背景图片与背景颜色的混合模式，创造丰富的视觉效果。

::: normal-demo
```html
<div class="blend-mode-demo">
  <div class="blend-item normal">normal</div>
  <div class="blend-item multiply">multiply</div>
  <div class="blend-item screen">screen</div>
  <div class="blend-item overlay">overlay</div>
  <div class="blend-item darken">darken</div>
  <div class="blend-item lighten">lighten</div>
</div>
```
```css
.blend-mode-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 40px;
}

.blend-item {
  width: 150px;
  height: 150px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150"><circle cx="75" cy="75" r="50" fill="%233498db" /><polygon points="75,25 125,125 25,125" fill="%23e74c3c" /></svg>');
  background-color: #f1c40f;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
}

.normal { background-blend-mode: normal; }
.multiply { background-blend-mode: multiply; }
.screen { background-blend-mode: screen; }
.overlay { background-blend-mode: overlay; }
.darken { background-blend-mode: darken; }
.lighten { background-blend-mode: lighten; }
```
:::

### 5. 背景动画
结合 CSS 动画和过渡效果，可以创建动态的背景效果。

::: normal-demo
```html
<div class="background-animation-demo">
  <div class="animated-gradient">渐变动画</div>
  <div class="animated-position">位置动画</div>
  <div class="animated-size">大小动画</div>
</div>
```
```css
.background-animation-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 40px;
}

.animated-gradient,
.animated-position,
.animated-size {
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  border-radius: 4px;
}

/* 渐变动画 */
.animated-gradient {
  background: linear-gradient(45deg, #3498db, #e74c3c, #2ecc71, #f1c40f);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* 位置动画 */
.animated-position {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"><circle cx="25" cy="25" r="20" fill="%233498db" opacity="0.5" /></svg>');
  background-color: #f5f5f5;
  background-repeat: repeat;
  animation: backgroundMove 20s linear infinite;
}

@keyframes backgroundMove {
  0% { background-position: 0 0; }
  100% { background-position: 100px 100px; }
}

/* 大小动画 */
.animated-size {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="none" stroke="%23e74c3c" stroke-width="2" /><circle cx="50" cy="50" r="40" fill="none" stroke="%233498db" stroke-width="2" /></svg>');
  background-color: #f5f5f5;
  background-repeat: no-repeat;
  background-position: center;
  animation: backgroundSize 8s ease-in-out infinite;
}

@keyframes backgroundSize {
  0%, 100% { background-size: 50px 50px; }
  50% { background-size: 150px 150px; }
}
```
:::

### 6. 响应式背景
根据不同屏幕尺寸调整背景属性，实现响应式设计。

::: normal-demo
```html
<div class="responsive-background"></div>
```
```css
.responsive-background {
  width: 100%;
  height: 300px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f5f5f5" /><circle cx="100" cy="100" r="50" fill="%233498db" /><polygon points="100,20 150,150 50,150" fill="%23e74c3c" /></svg>');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: 1px solid #ddd;
}

/* 大屏幕 */
@media (min-width: 1024px) {
  .responsive-background {
    background-size: 400px 400px;
    background-color: #f9f9f9;
  }
}

/* 中等屏幕 */
@media (max-width: 1023px) and (min-width: 768px) {
  .responsive-background {
    background-size: 300px 300px;
    background-color: #f5f5f5;
  }
}

/* 小屏幕 */
@media (max-width: 767px) {
  .responsive-background {
    background-size: 200px 200px;
    background-color: #eeeeee;
  }
}
```
```js
// 实时演示响应式背景效果
// 可以尝试调整浏览器窗口大小查看变化
```
:::

## 最佳实践

1. **性能优化**：
   - 对于大背景图片，使用适当的压缩和格式（WebP、AVIF）
   - 对于需要平铺的背景，使用小尺寸的图片
   - 尽量减少多背景图片的数量和复杂度

2. **兼容性考虑**：
   - 对于高级背景特性，提供适当的回退方案
   - 使用前缀属性确保在旧浏览器中的兼容性

3. **可访问性**：
   - 确保背景与前景文字有足够的对比度
   - 避免使用会导致眩晕或分散注意力的背景动画

## 练习

1. 创建一个带有渐变背景的按钮，悬停时改变渐变方向。
2. 实现一个带有文字遮罩的背景图片效果。
3. 使用背景混合模式创建一个独特的图像效果。
4. 设计一个响应式背景，在不同屏幕尺寸下显示不同的背景图片。
5. 创建一个无限滚动的背景动画效果。 <div class="demo-item blend-multiply">multiply</div>
  <div class="demo-item blend-screen">screen</div>
  <div class="demo-item blend-overlay">overlay</div>
  <div class="demo-item blend-darken">darken</div>
  <div class="demo-item blend-lighten">lighten</div>
  <div class="demo-item blend-color-dodge">color-dodge</div>
</div>
```
```css
.blend-mode-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.demo-item {
  width: 150px;
  height: 150px;
  border: 1px solid #ddd;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150"><circle cx="75" cy="75" r="50" fill="white" /></svg>');
  background-color: #ff0000;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}

.blend-multiply {
  background-blend-mode: multiply;
}

.blend-screen {
  background-blend-mode: screen;
}

.blend-overlay {
  background-blend-mode: overlay;
}

.blend-darken {
  background-blend-mode: darken;
}

.blend-lighten {
  background-blend-mode: lighten;
}

.blend-color-dodge {
  background-blend-mode: color-dodge;
}
```
:::

```css
.element {
  background-image: url("image.jpg");
  background-color: red;
  background-blend-mode: multiply;
}
```

## 最佳实践
- 尽量使用 CSS 渐变代替图片渐变，减少 HTTP 请求
- 对于大型背景图片，考虑使用 `background-attachment: fixed` 创建视差效果
- 使用 `background-size: cover` 时，注意图片的裁剪可能会影响重要内容
- 为背景图片设置合适的回退颜色
- 对于响应式设计，考虑使用媒体查询调整背景属性
- 优化背景图片大小，减少加载时间

## 练习
1. 设置元素的背景颜色和背景图片
2. 控制背景图片的重复方式、位置和大小
3. 创建一个带有视差效果的背景
4. 使用渐变创建各种背景效果
5. 尝试使用多背景图片和背景混合模式
6. 为响应式设计优化背景图片

通过本章节的学习，你应该掌握 CSS 中关于背景的各种属性和技术，包括背景颜色、背景图片、渐变等，能够创建丰富多样的背景效果。