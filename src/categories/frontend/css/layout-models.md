# 布局模式

## 标准流 (Normal Flow)
标准流是浏览器默认的布局方式，也称为文档流。在标准流中，元素按照它们在 HTML 中的出现顺序排列。

::: normal-demo 标准流布局示例
```html
<div class="normal-flow-demo">
  <h3>标准流布局示例</h3>
  <p>这是一个段落，属于块级元素，会独占一行。</p>
  <div class="inline-container">
    <span>这是行内元素</span>
    <a href="#">这是链接（行内元素）</a>
    <button>按钮（行内块元素）</button>
  </div>
  <div class="block-element">这是块级元素</div>
  <div class="inline-block-element">行内块元素 1</div>
  <div class="inline-block-element">行内块元素 2</div>
</div>
```
```css
.normal-flow-demo {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

p {
  margin: 10px 0;
}

.inline-container {
  margin: 10px 0;
  padding: 10px;
  background-color: #f5f5f5;
}

span, a {
  margin-right: 10px;
}

.block-element {
  display: block;
  width: 100%;
  height: 50px;
  background-color: #e74c3c;
  color: white;
  text-align: center;
  line-height: 50px;
  margin: 10px 0;
}

.inline-block-element {
  display: inline-block;
  width: 120px;
  height: 40px;
  background-color: #3498db;
  color: white;
  text-align: center;
  line-height: 40px;
  margin-right: 10px;
}
```
:::

### 块级元素 (Block-level Elements)
- 独占一行
- 可以设置宽度和高度
- 默认宽度为父元素的100%
- 常见的块级元素：`div`, `p`, `h1`-`h6`, `ul`, `ol`, `li`, `form`, `header`, `footer` 等

```css
.block-element {
  display: block;
  width: 200px;
  height: 100px;
  background-color: #f5f5f5;
  margin-bottom: 10px;
}
```

### 行内元素 (Inline Elements)
- 不会独占一行，与其他行内元素并排显示
- 不能设置宽度和高度（由内容决定）
- 常见的行内元素：`span`, `a`, `strong`, `em`, `img`, `input`, `button` 等

```css
.inline-element {
  display: inline;
  color: blue;
  font-weight: bold;
}
```

### 行内块元素 (Inline-block Elements)
- 不会独占一行，但可以设置宽度和高度
- 常见的行内块元素：`img`, `input`, `button`（默认）

```css
.inline-block-element {
  display: inline-block;
  width: 100px;
  height: 50px;
  background-color: #f5f5f5;
  margin-right: 10px;
}
```

## 浮动 (Float)
浮动最初是为了实现文字环绕图片的效果，但后来被广泛用于布局。

::: normal-demo 文字环绕图片效果
```html
<div class="float-demo">
  <img src="https://picsum.photos/200/200" alt="示例图片" class="float-left">
  <p>这是一段文本，用于演示文字环绕图片的效果。当图片设置了浮动属性后，文字会自动环绕在图片周围。这种效果在新闻文章、博客等内容中非常常见，可以有效地利用空间，提高内容的可读性。</p>
  <p>浮动元素会脱离标准流，但不会脱离文本流，这就是为什么文字会环绕浮动元素的原因。需要注意的是，浮动元素会导致父元素高度塌陷，需要使用清除浮动的技术来解决这个问题。</p>
  <div class="clear"></div>
</div>
```
```css
.float-demo {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.float-left {
  float: left;
  margin-right: 20px;
  margin-bottom: 10px;
}

p {
  margin: 10px 0;
}

.clear {
  clear: both;
}
```
:::

### 浮动的特性
- 元素脱离标准流，但不会脱离文本流
- 元素向左或向右移动，直到碰到容器边缘或其他浮动元素
- 浮动元素会导致父元素高度塌陷

```css
.float-left {
  float: left;
  width: 200px;
  height: 200px;
  margin-right: 20px;
}

.float-right {
  float: right;
  width: 200px;
  height: 200px;
  margin-left: 20px;
}
```

### 清除浮动
浮动会导致父元素高度塌陷，需要清除浮动。

::: normal-demo 浮动布局与清除浮动
```html
<div class="float-layout">
  <h3>使用浮动实现的多列布局</h3>
  <div class="column left">左侧栏</div>
  <div class="column middle">中间内容区域</div>
  <div class="column right">右侧栏</div>
  <div class="clearfix"></div>
  <div class="footer">页脚内容</div>
</div>
```
```css
.float-layout {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.float-layout h3 {
  padding: 10px;
  margin: 0;
  background-color: #f5f5f5;
}

.column {
  float: left;
  height: 200px;
  color: white;
  text-align: center;
  line-height: 200px;
}

.left {
  width: 20%;
  background-color: #3498db;
}

.middle {
  width: 60%;
  background-color: #2ecc71;
}

.right {
  width: 20%;
  background-color: #e74c3c;
}

.clearfix::after {
  content: "";
  display: block;
  clear: both;
}

.footer {
  padding: 10px;
  background-color: #9b59b6;
  color: white;
  text-align: center;
}
```
:::

#### 1. 使用 clear 属性
```css
.clear {
  clear: both; /* 清除左右两侧的浮动 */
}
```

#### 2. 使用伪元素清除浮动
```css
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
```

#### 3. 使用 overflow 属性
```css
.container {
  overflow: hidden; /* 或 auto */
}
```

## 定位 (Position)
定位允许我们精确控制元素的位置。

::: normal-demo 定位布局示例
```html
<div class="position-demo">
  <h3>定位布局示例</h3>
  <div class="relative-container">
    相对定位容器
    <div class="absolute-element">绝对定位元素</div>
  </div>
  <div class="sticky-element">粘性定位元素</div>
  <div class="content">
    <p>滚动页面查看粘性定位效果...</p>
    <p>内容... 内容... 内容...</p>
    <p>内容... 内容... 内容...</p>
    <p>内容... 内容... 内容...</p>
    <p>内容... 内容... 内容...</p>
    <p>内容... 内容... 内容...</p>
    <p>内容... 内容... 内容...</p>
  </div>
</div>
```
```css
.position-demo {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  height: 800px;
}

.relative-container {
  position: relative;
  width: 400px;
  height: 200px;
  margin: 20px 0;
  padding: 20px;
  background-color: #f5f5f5;
}

.absolute-element {
  position: absolute;
  top: 50px;
  right: 30px;
  width: 150px;
  height: 80px;
  background-color: #3498db;
  color: white;
  text-align: center;
  line-height: 80px;
}

.fixed-element {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 100px;
  height: 100px;
  background-color: #e74c3c;
  color: white;
  text-align: center;
  line-height: 100px;
  border-radius: 50%;
}

.sticky-element {
  position: sticky;
  top: 0;
  padding: 10px;
  background-color: #2ecc71;
  color: white;
  z-index: 100;
}

.content {
  margin-top: 20px;
}
```
:::

### 1. 静态定位 (Static)
默认值，元素遵循标准流。

```css
.static {
  position: static;
}
```

### 2. 相对定位 (Relative)
- 相对于元素在标准流中的位置进行偏移
- 不会脱离标准流
- 可以通过 `top`, `right`, `bottom`, `left` 设置偏移量

```css
.relative {
  position: relative;
  top: 10px;
  left: 20px;
}
```

### 3. 绝对定位 (Absolute)
- 脱离标准流
- 相对于最近的已定位祖先元素（非 static 定位）进行定位
- 如果没有已定位的祖先元素，则相对于文档根元素（html）定位
- 可以通过 `top`, `right`, `bottom`, `left` 设置偏移量

```css
.absolute {
  position: absolute;
  top: 50px;
  right: 50px;
  width: 200px;
  height: 100px;
}
```

### 4. 固定定位 (Fixed)
- 脱离标准流
- 相对于视口进行定位
- 即使页面滚动，元素也会保持在固定位置
- 可以通过 `top`, `right`, `bottom`, `left` 设置偏移量

```css
.fixed {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 100px;
  height: 100px;
}
```

### 5. 粘性定位 (Sticky)
- 结合了相对定位和固定定位的特性
- 在滚动到指定位置前，表现为相对定位
- 滚动到指定位置后，表现为固定定位
- 可以通过 `top`, `right`, `bottom`, `left` 设置触发粘性定位的阈值

```css
.sticky {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 100;
}
```

## 层叠上下文 (Stacking Context)
当元素发生重叠时，层叠上下文决定了元素的显示顺序。

::: normal-demo 层叠上下文示例
```html
<div class="stacking-demo">
  <h3>层叠上下文示例</h3>
  <div class="box box1">1. 无定位元素</div>
  <div class="box box2">2. 相对定位 (z-index: 1)</div>
  <div class="box box3">3. 绝对定位 (z-index: 3)</div>
  <div class="box box4">4. 相对定位 (z-index: 2)</div>
</div>
```
```css
.stacking-demo {
  position: relative;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  height: 400px;
}

.box {
  width: 150px;
  height: 150px;
  padding: 10px;
  color: white;
  text-align: center;
  box-sizing: border-box;
}

.box1 {
  background-color: #3498db;
  margin-top: 50px;
  margin-left: 50px;
}

.box2 {
  position: relative;
  z-index: 1;
  background-color: #2ecc71;
  margin-top: -50px;
  margin-left: 100px;
}

.box3 {
  position: absolute;
  z-index: 3;
  top: 100px;
  left: 150px;
  background-color: #e74c3c;
}

.box4 {
  position: relative;
  z-index: 2;
  background-color: #9b59b6;
  margin-top: -50px;
  margin-left: 200px;
}
```
:::

### z-index 属性
`z-index` 属性用于控制定位元素在层叠上下文中的层级。

```css
.element1 {
  position: relative;
  z-index: 1;
}

.element2 {
  position: relative;
  z-index: 2; /* 会显示在 element1 上方 */
}
```

## 最佳实践
- 尽量使用标准流布局，减少对浮动和定位的依赖
- 如需使用浮动，确保正确清除浮动
- 合理使用定位，避免过度使用绝对定位
- 理解层叠上下文，避免 z-index 滥用
- 对于复杂布局，考虑使用 Flexbox 或 Grid

## 练习
1. 创建一个使用标准流布局的页面
2. 使用浮动实现文字环绕图片的效果
3. 使用浮动创建一个多列布局，并正确清除浮动
4. 使用定位实现一个固定在顶部的导航栏
5. 测试不同定位方式的效果
6. 理解层叠上下文，尝试创建复杂的层叠效果

通过本章节的学习，你应该掌握 CSS 中的各种布局模式，包括标准流、浮动和定位，能够根据实际需求选择合适的布局方式，并了解层叠上下文的概念。