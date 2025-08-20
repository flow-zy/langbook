# 伪元素

## 什么是伪元素?
伪元素用于样式化元素的特定部分，而不是整个元素。它们允许我们在文档中插入虚拟元素，并为这些元素添加样式。

## 常用的伪元素

### 1. ::before 和 ::after
在元素内容的前面或后面插入内容。

```css
/* 在元素内容前插入内容 */
.element::before {
  content: "前缀文本: ";
  color: blue;
  font-weight: bold;
}

/* 在元素内容后插入内容 */
.element::after {
  content: " (后缀文本)";
  color: red;
  font-style: italic;
}
```

### 2. ::first-line
样式化文本块的第一行。

```css
p::first-line {
  font-weight: bold;
  color: blue;
}
```

### 3. ::first-letter
样式化文本块的第一个字母。

```css
p::first-letter {
  font-size: 2em;
  color: red;
  float: left;
  margin-right: 5px;
}
```

### 4. ::selection
样式化用户选中的文本。

```css
::selection {
  background-color: yellow;
  color: black;
}

/* 针对特定元素 */
p::selection {
  background-color: green;
  color: white;
}
```

### 5. ::placeholder
样式化表单元素的占位符文本。

```css
input::placeholder {
  color: #999;
  font-style: italic;
}
```

### 6. ::marker
样式化列表项的标记（如 bullet 或数字）。

```css
li::marker {
  color: blue;
  font-size: 1.2em;
}
```

### 7. ::backdrop (实验性)
样式化全屏元素的背景。

```css
::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}
```

## 伪元素的特性
- 伪元素不是真正的 DOM 元素，它们是虚拟的
- 伪元素必须有 `content` 属性（即使值为空字符串）
- 伪元素可以结合其他选择器使用
- 伪元素可以使用大部分 CSS 属性

## 最佳实践
- 使用伪元素创建装饰性内容，避免使用它们来添加重要的内容（因为屏幕阅读器可能无法识别）
- 为 `::before` 和 `::after` 伪元素始终设置 `content` 属性
- 保持伪元素的样式简单，避免过于复杂的布局
- 注意浏览器兼容性，某些伪元素可能不被所有浏览器支持

## 练习
1. 使用 `::before` 和 `::after` 创建装饰性元素
2. 为段落添加首字母下沉效果
3. 自定义列表项的标记样式
4. 样式化表单元素的占位符文本
5. 自定义用户选中的文本样式

通过本章节的学习，你应该掌握 CSS 伪元素的使用方法，能够利用伪元素创建丰富的视觉效果，同时了解伪元素的特性和最佳实践。