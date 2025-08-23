# 字体和图标

## Web 字体
Web 字体允许我们在网页中使用自定义字体，而不依赖于用户系统中安装的字体。

### 1. @font-face 规则
使用 `@font-face` 规则定义自定义字体。

```css
@font-face {
  font-family: "MyFont";
  src: url("myfont.woff2") format("woff2"),
       url("myfont.woff") format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

.element {
  font-family: "MyFont", sans-serif;
}
```

### 2. 字体格式
常见的 Web 字体格式：
- **WOFF2 (Web Open Font Format 2.0)**：最现代、压缩率最高的格式
- **WOFF (Web Open Font Format)**：广泛支持的格式
- **TTF/OTF (TrueType/OpenType)**：传统字体格式
- **EOT (Embedded OpenType)**：IE 专用格式

### 3. 字体加载策略
使用 `font-display` 属性控制字体加载行为：

```css
@font-face {
  font-display: auto; /* 默认，由浏览器决定 */
  font-display: block; /* 阻塞文本显示，直到字体加载完成 */
  font-display: swap; /* 先显示备用字体，字体加载完成后替换 */
  font-display: fallback; /* 短暂阻塞，然后使用备用字体 */
  font-display: optional; /* 可选加载，不阻塞文本显示 */
}
```

### 4. 字体预加载
使用 `<link>` 标签预加载字体：

```html
<link rel="preload" href="myfont.woff2" as="font" type="font/woff2" crossorigin>
```

## 图标字体
图标字体是将图标嵌入到字体文件中，通过 CSS 类来使用图标。

### 1. 自定义图标字体
```css
@font-face {
  font-family: "MyIcons";
  src: url("myicons.woff2") format("woff2");
  font-weight: normal;
  font-style: normal;
}

.icon {
  font-family: "MyIcons" !important;
  speak: never;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-heart:before {
  content: "\e900";
}

.icon-star:before {
  content: "\e901";
}
```

### 2. 使用图标字体库
常见的图标字体库：
- **Font Awesome**
- **Material Icons**
- **Ionicons**
- **Glyphicons**

```html
<!-- 引入 Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<!-- 使用图标 -->
<i class="fas fa-heart"></i>
<i class="fas fa-star"></i>
```

## SVG 图标
SVG 图标是基于矢量的图标，可以无损缩放，并且支持动画和交互。

### 1. 内联 SVG
```html
<svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" fill="#E74C3C"/>
</svg>
```

### 2. SVG 精灵图
```html
<!-- 定义 SVG 精灵图 -->
<svg width="0" height="0" class="hidden">
  <symbol id="icon-heart" viewBox="0 0 24 24">
    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z"/>
  </symbol>
  <symbol id="icon-star" viewBox="0 0 24 24">
    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/>
  </symbol>
</svg>

<!-- 使用 SVG 图标 -->
<svg class="icon" width="24" height="24" fill="#E74C3C">
  <use href="#icon-heart"/>
</svg>
<svg class="icon" width="24" height="24" fill="#F1C40F">
  <use href="#icon-star"/>
</svg>
```

### 3. SVG 图标库
常见的 SVG 图标库：
- **Feather Icons**
- **Heroicons**
- **Lucide Icons**
- **Material Icons (SVG)**

```html
<!-- 引入 Feather Icons -->
<script src="https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js"></script>

<!-- 使用图标 -->
<i data-feather="heart"></i>
<i data-feather="star"></i>

<script>
  feather.replace();
</script>
```

## 最佳实践
- 优先使用 SVG 图标，它们具有更好的可扩展性和性能
- 对于字体，使用 `font-display: swap` 确保文本的可访问性
- 预加载关键字体，提高页面加载速度
- 合理使用图标字体和 SVG 图标，根据项目需求选择合适的方案
- 为图标添加适当的 `aria-hidden` 属性，避免屏幕阅读器朗读
- 优化 SVG 图标，移除不必要的代码，减小文件大小
- 考虑使用 CSS 变量控制图标颜色，提高可维护性

## 练习
1. 定义并使用自定义 Web 字体
2. 实现字体预加载和优化加载策略
3. 创建自定义图标字体
4. 使用 SVG 精灵图优化图标加载
5. 实现响应式图标（根据屏幕尺寸调整大小）
6. 设计一个具有动画效果的 SVG 图标

通过本章节的学习，你应该掌握 Web 字体和图标的相关知识，包括字体加载策略、图标字体和 SVG 图标等，能够根据项目需求选择合适的字体和图标方案，提高页面的视觉效果和用户体验。