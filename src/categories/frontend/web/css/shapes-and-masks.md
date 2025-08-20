# 形状与遮罩

## 形状 (Shapes)
CSS 形状允许我们创建非矩形的布局，使文本能够围绕图像或其他元素流动。

### 1. 基本形状
使用 `shape-outside` 属性定义文本围绕的形状。

```css
/* 圆形 */
.shape {
  float: left;
  width: 200px;
  height: 200px;
  shape-outside: circle(50%);
}

/* 椭圆形 */
.shape {
  float: left;
  width: 200px;
  height: 100px;
  shape-outside: ellipse(50% 50%);
}

/* 多边形 */
.shape {
  float: left;
  width: 200px;
  height: 200px;
  shape-outside: polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%);
}

/* 矩形 */
.shape {
  float: left;
  width: 200px;
  height: 200px;
  shape-outside: inset(10px 20px 30px 40px);
  /* inset(top right bottom left) */
}
```

### 2. 形状边缘距离
使用 `shape-margin` 属性设置形状与文本之间的距离。

```css
.shape {
  float: left;
  width: 200px;
  height: 200px;
  shape-outside: circle(50%);
  shape-margin: 20px;
}
```

### 3. 图像形状
可以基于图像的 alpha 通道或亮度创建形状。

```css
.shape {
  float: left;
  width: 200px;
  height: 200px;
  shape-outside: url("image.png");
  shape-image-threshold: 0.5; /* 阈值，0-1 之间 */
}
```

### 4. 文本围绕形状示例
```html
<div class="shape"></div>
<p>这是一段围绕形状的文本。这是一段围绕形状的文本。这是一段围绕形状的文本。这是一段围绕形状的文本。这是一段围绕形状的文本。这是一段围绕形状的文本。这是一段围绕形状的文本。这是一段围绕形状的文本。</p>
```

```css
.shape {
  float: left;
  width: 200px;
  height: 200px;
  background-color: #3498db;
  shape-outside: circle(50%);
  shape-margin: 10px;
  border-radius: 50%;
}
```

## 遮罩 (Masks)
遮罩允许我们使用图像或渐变来隐藏元素的部分内容，只显示需要的部分。

### 1. 基本遮罩
使用 `mask-image` 属性定义遮罩图像。

```css
.element {
  width: 300px;
  height: 300px;
  background-image: url("background.jpg");
  mask-image: url("mask.png");
  mask-size: cover;
  -webkit-mask-image: url("mask.png"); /* Safari 兼容性 */
  -webkit-mask-size: cover;
}
```

### 2. 渐变遮罩
使用渐变作为遮罩。

```css
.element {
  width: 300px;
  height: 300px;
  background-image: url("background.jpg");
  mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
}
```

### 3. 遮罩位置和大小
```css
.element {
  mask-image: url("mask.png");
  mask-position: center center;
  mask-size: 200px 200px;
  mask-repeat: no-repeat;
  -webkit-mask-image: url("mask.png");
  -webkit-mask-position: center center;
  -webkit-mask-size: 200px 200px;
  -webkit-mask-repeat: no-repeat;
}
```

### 4. 遮罩模式
使用 `mask-mode` 属性设置遮罩的模式。

```css
.element {
  mask-image: url("mask.png");
  mask-mode: alpha; /* 默认，基于 alpha 通道 */
  mask-mode: luminance; /* 基于亮度 */
  mask-mode: match-source; /* 基于源图像的类型 */
  -webkit-mask-image: url("mask.png");
}
```

### 5. 遮罩复合
使用 `mask-composite` 属性组合多个遮罩。

```css
.element {
  mask-image: url("mask1.png"), url("mask2.png");
  mask-composite: add; /* 默认，相加 */
  mask-composite: subtract; /* 相减 */
  mask-composite: intersect; /* 相交 */
  mask-composite: exclude; /* 排除 */
  -webkit-mask-image: url("mask1.png"), url("mask2.png");
  -webkit-mask-composite: xor; /* Safari 兼容性 */
}
```

### 6. 简写形式
```css
.element {
  mask: url("mask.png") center center / 200px 200px no-repeat alpha;
  -webkit-mask: url("mask.png") center center / 200px 200px no-repeat;
}
```

## 剪裁路径 (Clip Path)
剪裁路径允许我们使用路径来裁剪元素的可见区域。

### 1. 基本剪裁路径
```css
.element {
  clip-path: circle(50%); /* 圆形 */
  clip-path: ellipse(50% 50%); /* 椭圆形 */
  clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%); /* 多边形 */
  clip-path: inset(10px 20px 30px 40px); /* 矩形 */
}
```

### 2. 自定义路径
```css
.element {
  clip-path: path("M0,0 L100,0 L100,100 L50,75 L0,100 Z");
}
```

### 3. 引用 SVG 路径
```css
.element {
  clip-path: url(#myClipPath);
}
```

```html
<svg width="0" height="0" class="hidden">
  <clipPath id="myClipPath" clipPathUnits="objectBoundingBox">
    <path d="M0,0 L1,0 L1,1 L0.5,0.75 L0,1 Z"/>
  </clipPath>
</svg>
```

## 最佳实践
- 使用形状和文本围绕创建更有趣的布局
- 优先使用 CSS 形状而不是图像，减少 HTTP 请求
- 对于复杂的遮罩效果，考虑使用 SVG 遮罩
- 测试形状和遮罩在不同浏览器上的兼容性
- 结合动画和过渡，创建动态的形状和遮罩效果
- 优化遮罩图像，减小文件大小
- 注意形状和遮罩可能会影响性能，尤其是在动画中

## 练习
1. 创建不同形状的文本围绕效果
2. 使用渐变遮罩实现图像的淡入淡出效果
3. 结合剪裁路径和动画创建动态效果
4. 使用 SVG 路径创建复杂的遮罩效果
5. 实现一个具有形状和遮罩的响应式组件
6. 设计一个使用形状和遮罩的创意布局

通过本章节的学习，你应该掌握 CSS 中的形状、遮罩和剪裁路径技术，能够创建各种非矩形的布局和视觉效果，提升页面的设计感和创意性。