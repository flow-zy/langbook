# 渲染性能

## 渲染性能的重要性
CSS渲染性能直接影响网站的加载速度和用户体验。优化CSS可以减少浏览器的渲染时间，提高页面的响应速度。

## CSS选择器性能
选择器的效率会影响浏览器解析和应用样式的速度。

### 1. 选择器优先级
```css
/* 低效选择器 */
div p span {
  color: red;
}

/* 高效选择器 */
.text-red {
  color: red;
}
```

### 2. 避免复杂选择器
```css
/* 避免 */
#header .nav > li:first-child a:hover {
  color: blue;
}

/* 推荐 */
.nav-link-hover {
  color: blue;
}
```

### 3. 选择器性能排名（从高到低）
1. 内联样式（`style`属性）
2. ID选择器（`#id`）
3. 类选择器（`.class`）、属性选择器（`[attr]`）、伪类选择器（`:hover`）
4. 标签选择器（`div`）
5. 通配符选择器（`*`）、组合选择器（`div p`）、后代选择器（`div > p`）

## 重排 (Reflow) 和重绘 (Repaint)
- **重排**：当元素的几何属性（位置、大小）发生变化时，浏览器需要重新计算布局
- **重绘**：当元素的外观（颜色、背景）发生变化时，浏览器需要重新绘制元素

### 1. 触发重排的操作
```css
/* 修改尺寸 */
.element {
  width: 200px; /* 触发重排 */
}

/* 修改位置 */
.element {
  margin-left: 10px; /* 触发重排 */
}

/* 修改内容 */
.element {
  content: "New content"; /* 触发重排 */
}
```

### 2. 触发重绘的操作
```css
/* 修改颜色 */
.element {
  color: red; /* 仅触发重绘 */
}

/* 修改背景 */
.element {
  background-color: blue; /* 仅触发重绘 */
}

/* 修改透明度 */
.element {
  opacity: 0.5; /* 仅触发重绘 */
}
```

### 3. 减少重排和重绘
```css
/* 避免频繁修改样式 */
/* 不推荐 */
for (let i = 0; i < 100; i++) {
  element.style.left = i + 'px';
}

/* 推荐 */
element.style.cssText = 'left: 100px; top: 100px;';

/* 使用DocumentFragment */
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  const div = document.createElement('div');
  fragment.appendChild(div);
}
document.body.appendChild(fragment);
```

## CSS动画性能优化
动画性能直接影响用户体验，流畅的动画需要保持60fps（每秒60帧）。

### 1. 使用GPU加速
```css
/* 触发GPU加速 */
.element {
  transform: translateZ(0); /* 或 translate3d(0, 0, 0) */
  will-change: transform; /* 告诉浏览器元素将要变化 */
}
```

### 2. 优化动画属性
```css
/* 高效动画属性 */
.element {
  transform: translateX(100px); /* 高效 */
  opacity: 0.5; /* 高效 */
}

/* 低效动画属性 */
.element {
  width: 200px; /* 低效，触发重排 */
  margin-left: 100px; /* 低效，触发重排 */
}
```

### 3. 动画时间和缓动函数
```css
/* 合适的动画时间 */
.element {
  transition: transform 0.3s ease;
}

/* 自定义缓动函数 */
.element {
  transition: transform 0.5s cubic-bezier(0.17, 0.67, 0.83, 0.67);
}
```

## 字体加载性能
```css
/* 字体显示策略 */
@font-face {
  font-family: 'MyFont';
  src: url('myfont.woff2') format('woff2'),
       url('myfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap; /* 可选值: auto, block, swap, fallback, optional */
}

/* 预加载字体 */
<link rel="preload" href="myfont.woff2" as="font" type="font/woff2" crossorigin>
```

## 图像优化
```css
/* 响应式图像 */
img {
  max-width: 100%;
  height: auto;
}

/* 懒加载 */
.lazy {
  opacity: 0;
  transition: opacity 0.3s;
}

.lazy.loaded {
  opacity: 1;
}

/* 图像格式 */
/* 优先使用WebP格式 */
.element {
  background-image: url('image.webp');
}

/* 降级处理 */
@media (not (format: webp)) {
  .element {
    background-image: url('image.jpg');
  }
}
```

## CSS优化技术
```css
/* 减少CSS文件大小 */
/* 压缩前 */
body {
  font-size: 16px;
  line-height: 1.5;
  color: #333;
}

/* 压缩后 */
body{font-size:16px;line-height:1.5;color:#333}

/* 使用CSS变量减少重复 */
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --font-size: 16px;
}

body {
  color: var(--primary-color);
  font-size: var(--font-size);
}

/* 避免@import */
/* 不推荐 */
@import url('style1.css');
@import url('style2.css');

/* 推荐 */
<link rel="stylesheet" href="style1.css">
<link rel="stylesheet" href="style2.css">
```

## 性能测试工具
- **Chrome DevTools**: 网络面板、性能面板
- **Lighthouse**: 审计网页性能
- **WebPageTest**: 多地点性能测试
- **CSS Stats**: 分析CSS文件
- **Stylelint**: 检查CSS代码问题

## 最佳实践
- 使用高效的CSS选择器
- 减少重排和重绘
- 优化CSS动画，使用GPU加速
- 压缩CSS文件
- 避免使用`@import`
- 使用CSS变量减少重复代码
- 延迟加载非关键CSS
- 预加载关键CSS
- 优化字体加载
- 优化图像
- 使用性能测试工具定期测试

## 练习
1. 优化现有的CSS选择器
2. 减少网页中的重排和重绘
3. 实现一个GPU加速的CSS动画
4. 压缩和优化CSS文件
5. 测试并优化字体加载性能
6. 优化图像加载
7. 使用性能测试工具分析网页性能

通过本章节的学习，你应该掌握CSS渲染性能优化的关键技术，能够创建高性能的CSS代码，减少浏览器的渲染时间，提高页面的响应速度和用户体验。