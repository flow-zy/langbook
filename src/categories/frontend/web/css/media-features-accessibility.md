# 媒体特性（可访问性）

## 媒体查询 (Media Queries)
媒体查询允许我们根据设备特性（如屏幕宽度、高度、方向等）调整CSS样式，实现响应式设计。

### 1. 基本媒体查询
```css
/* 屏幕宽度小于768px时应用 */
@media (max-width: 768px) {
  .container {
    width: 100%;
  }
}

/* 屏幕宽度大于768px时应用 */
@media (min-width: 769px) {
  .container {
    width: 768px;
    margin: 0 auto;
  }
}
```

### 2. 媒体特性
```css
/* 屏幕方向 */
@media (orientation: portrait) {
  /* 竖屏模式 */
}

@media (orientation: landscape) {
  /* 横屏模式 */
}

/* 屏幕分辨率 */
@media (min-resolution: 2dppx) {
  /* 高分辨率屏幕 */
}

/* 设备宽度和高度 */
@media (max-device-width: 768px) {
  /* 移动设备 */
}

/* 颜色深度 */
@media (color) {
  /* 彩色屏幕 */
}

@media (monochrome) {
  /* 单色屏幕 */
}
```

### 3. 逻辑操作符
```css
/* 且操作 */
@media (min-width: 768px) and (max-width: 1024px) {
  /* 屏幕宽度在768px到1024px之间 */
}

/* 或操作 */
@media (max-width: 768px), (orientation: portrait) {
  /* 屏幕宽度小于768px或竖屏模式 */
}

/* 非操作 */
@media not all and (max-width: 768px) {
  /* 不满足屏幕宽度小于768px的条件 */
}

/* 仅操作 */
@media only screen and (max-width: 768px) {
  /* 仅在屏幕设备且宽度小于768px时应用 */
}
```

## 可访问性 (Accessibility)
可访问性确保所有用户，包括有残障的用户，都能使用和理解你的网站。

### 1. 颜色对比度
```css
/* 确保文本和背景有足够的对比度 */
body {
  color: #333;
  background-color: #fff;
  /* 对比度约为15:1，符合WCAG AA标准 */
}

/* 高对比度模式 */
@media (prefers-contrast: more) {
  body {
    color: #000;
    background-color: #fff;
  }
}

@media (prefers-contrast: less) {
  body {
    color: #666;
    background-color: #f5f5f5;
  }
}
```

### 2. 字体大小和行高
```css
/* 使用相对单位 */
body {
  font-size: 1rem; /* 16px */
  line-height: 1.5; /* 行高为字体大小的1.5倍 */
}

/* 响应式字体大小 */
@media (min-width: 768px) {
  body {
    font-size: 1.125rem; /* 18px */
  }
}

/* 调整小屏幕上的行高 */
@media (max-width: 480px) {
  body {
    line-height: 1.6;
  }
}
```

### 3. 键盘导航样式
```css
/* 焦点样式 */
:focus {
  outline: 3px solid #2196F3;
  outline-offset: 2px;
}

/* 移除默认焦点样式并自定义 */
button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.5);
}

/* 跳过导航链接 */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: white;
  padding: 8px;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

### 4. 语义化HTML样式
```css
/* 增强语义化元素的样式 */
header {
  background-color: #333;
  color: white;
  padding: 1rem;
}

nav {
  background-color: #f5f5f5;
  padding: 1rem;
}

main {
  padding: 2rem;
}

footer {
  background-color: #333;
  color: white;
  padding: 1rem;
  text-align: center;
}

/* 强调文本 */
strong {
  font-weight: bold;
}

em {
  font-style: italic;
}
```

### 5. 响应式图像
```css
/* 确保图像适应容器 */
img {
  max-width: 100%;
  height: auto;
}

/* 不同屏幕尺寸加载不同图像 */
.picture-container {
  width: 100%;
  height: 300px;
  background-image: url('small.jpg');
  background-size: cover;
  background-position: center;
}

@media (min-width: 768px) {
  .picture-container {
    background-image: url('medium.jpg');
  }
}

@media (min-width: 1200px) {
  .picture-container {
    background-image: url('large.jpg');
  }
}
```

### 6. 动画和过渡的可访问性
```css
/* 减少动画持续时间 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* 移除动画 */
@media (prefers-reduced-motion: reduce) {
  .animated-element {
    animation: none !important;
  }
}
```

## 最佳实践
- 使用媒体查询创建响应式设计，确保网站在不同设备上都能良好显示
- 确保文本和背景有足够的对比度（至少4.5:1）
- 使用相对单位（rem, em, %）而不是绝对单位（px）
- 为键盘导航提供明显的焦点样式
- 实现跳过导航链接，方便键盘用户
- 尊重用户的系统设置，如高对比度模式和减少动画
- 使用语义化HTML元素并为其提供适当的样式
- 确保表单元素有明确的标签和错误提示
- 测试网站的可访问性，使用辅助技术如屏幕阅读器
- 提供文本替代方案，如为图像添加alt属性

## 练习
1. 创建一个响应式布局，适应不同屏幕尺寸
2. 实现高对比度模式和减少动画的媒体查询
3. 设计明显的键盘焦点样式
4. 为网站添加跳过导航链接
5. 使用语义化HTML元素并为其添加适当的样式
6. 优化图像的响应式显示
7. 测试网站的可访问性，使用屏幕阅读器

通过本章节的学习，你应该掌握媒体查询和可访问性相关的CSS技术，能够创建响应式且易于访问的网站，确保所有用户都能使用和理解你的网站内容。