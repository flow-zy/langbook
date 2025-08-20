# 单位和值

## CSS 中的值类型
CSS 支持多种类型的值，用于不同的属性。了解这些值类型是掌握 CSS 的基础。

### 1. 关键字值
关键字是预定义的特殊值，用于特定属性。

```css
.element {
  display: block; /* 块级元素 */
  position: relative; /* 相对定位 */
  overflow: hidden; /* 溢出隐藏 */
  cursor: pointer; /* 鼠标指针为手型 */
}
```

### 2. 长度单位
长度单位用于表示距离、大小等。

#### 绝对长度单位
- **px**: 像素 (1px = 1/96英寸)
- **pt**: 点 (1pt = 1/72英寸)
- **pc**: 派卡 (1pc = 12pt)
- **mm**: 毫米
- **cm**: 厘米
- **in**: 英寸 (1in = 2.54cm)

```css
.element {
  width: 300px;
  font-size: 12pt;
  margin: 10mm;
}
```

#### 相对长度单位
- **em**: 相对于元素自身的字体大小
- **rem**: 相对于根元素(html)的字体大小
- **%**: 相对于父元素的百分比
- **vw**: 相对于视口宽度的百分比 (1vw = 视口宽度的1%)
- **vh**: 相对于视口高度的百分比 (1vh = 视口高度的1%)
- **vmin**: 相对于视口宽度和高度中较小值的百分比
- **vmax**: 相对于视口宽度和高度中较大值的百分比
- **ch**: 相对于字符"0"的宽度
- **ex**: 相对于字符"x"的高度

```css
html {
  font-size: 16px;
}

.element {
  font-size: 1.2rem; /* 19.2px */
  width: 80%;
  margin: 2rem; /* 32px */
  height: 50vh; /* 视口高度的50% */
}
```

### 3. 颜色值
CSS 支持多种表示颜色的方式。

#### 十六进制颜色
```css
.element {
  color: #ff0000; /* 红色 */
  background-color: #00ff00; /* 绿色 */
  border-color: #0000ff; /* 蓝色 */
}

/* 简写形式 (当每对值相同时) */
.element {
  color: #f00; /* 等同于 #ff0000 */
  background-color: #0f0; /* 等同于 #00ff00 */
  border-color: #00f; /* 等同于 #0000ff */
}
```

#### RGB 和 RGBA 颜色
```css
.element {
  color: rgb(255, 0, 0); /* 红色 */
  background-color: rgba(0, 255, 0, 0.5); /* 半透明绿色 */
}
```

#### HSL 和 HSLA 颜色
```css
.element {
  color: hsl(0, 100%, 50%); /* 红色 */
  background-color: hsla(120, 100%, 50%, 0.5); /* 半透明绿色 */
}
```

#### 颜色关键字
```css
.element {
  color: red;
  background-color: green;
  border-color: blue;
}
```

### 4. 函数值
CSS 支持使用函数来表示值。

```css
.element {
  width: calc(100% - 20px); /* 计算值 */
  background-image: url("image.jpg"); /* 图片路径 */
  transform: rotate(45deg); /* 旋转角度 */
  color: rgb(255, 0, 0); /* RGB颜色 */
}
```

### 5. 字符串值
字符串值用于需要文本的属性。

```css
.element::before {
  content: "前缀文本";
}

@font-face {
  font-family: "My Font";
  src: url("myfont.woff2");
}
```

## 最佳实践
- 优先使用相对单位 (如 rem, em, %) 而非绝对单位，提高响应式设计能力
- 使用 `rem` 作为字体大小的主要单位，便于整体调整
- 使用 `vw` 和 `vh` 实现全屏或大尺寸元素的响应式设计
- 对于颜色，优先使用十六进制或 RGBA 表示法
- 合理使用 `calc()` 函数创建复杂的尺寸关系

## 练习
1. 创建一个使用不同长度单位的页面
2. 尝试使用 `rem` 单位实现响应式字体大小
3. 测试不同颜色表示方法的效果
4. 使用 `calc()` 函数创建自适应布局

通过本章节的学习，你应该掌握 CSS 中各种单位和值的使用方法，能够根据实际需求选择合适的单位和值类型。