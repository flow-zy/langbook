# CSS 简介

## 什么是 CSS?
CSS (Cascading Style Sheets) 是一种用于描述 HTML 或 XML 文档呈现的样式表语言。它控制网页的视觉外观，包括布局、颜色、字体、间距等。

## CSS 的发展历史
- **1994年**: CSS 概念首次由 Håkon Wium Lie 提出
- **1996年12月**: CSS 1 正式发布，包含基本的选择器和属性
- **1998年5月**: CSS 2 发布，增加了定位、浮动、媒体查询等功能
- **2004年**: CSS 2.1 发布，修复了 CSS 2 中的一些错误
- **2011年起**: CSS 3 开始分模块发布，增加了大量新特性（如圆角、阴影、渐变、动画等）
- **2015年起**: CSS 4 继续分模块发展，引入更多高级特性（如变量、网格布局等）

## CSS 的作用
- 控制网页的视觉表现
- 实现响应式设计
- 添加动画和交互效果
- 提高代码的可维护性

## CSS 基本语法
CSS 的基本语法由选择器和声明块组成：

```css
选择器 {
  属性1: 值1;
  属性2: 值2;
  /* 更多属性和值 */
}
```

::: normal-demo

```html
<div class="container">
  <p>这是一个段落</p>
  <p class="highlight">这是一个高亮段落</p>
</div>
```

```css
/* 元素选择器 */
p {
  color: black;
  font-size: 16px;
}

/* 类选择器 */
.highlight {
  color: red;
  font-weight: bold;
}

/* ID选择器 */
#container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}
```

:::

## CSS 属性和值

### 属性的分类
- **布局属性**: 控制元素的位置和大小 (width, height, margin, padding 等)
- **文本属性**: 控制文本的外观 (color, font-size, text-align 等)
- **背景属性**: 控制元素的背景 (background-color, background-image 等)
- **边框属性**: 控制元素的边框 (border, border-radius 等)
- **动画属性**: 控制元素的动画效果 (transition, animation 等)

### 值的类型
- **关键字**: 如 `auto`, `normal`, `inherit` 等
- **长度单位**: 如 `px`, `em`, `rem`, `%` 等
- **颜色值**: 如 `#fff`, `rgb(255, 255, 255)`, `rgba(255, 255, 255, 0.5)` 等
- **函数**: 如 `calc(100% - 20px)`, `rgb(255, 0, 0)` 等

::: normal-demo

```html
<div class="values-example">
  <div class="keyword-value">关键字值示例</div>
  <div class="length-value">长度值示例</div>
  <div class="color-value">颜色值示例</div>
  <div class="function-value">函数值示例</div>
</div>
```

```css
.keyword-value {
  margin: auto; /* 关键字值 */
  text-align: center;
}

.length-value {
  width: 50%; /* 百分比 */
  font-size: 1.2rem; /* rem单位 */
  padding: 10px; /* px单位 */
}

.color-value {
  background-color: #f0f0f0; /* 十六进制 */
  color: rgb(255, 0, 0); /* RGB */
  border: 1px solid rgba(0, 0, 255, 0.5); /* RGBA */
}

.function-value {
  width: calc(100% - 20px); /* 计算函数 */
  height: clamp(50px, 10vh, 100px); /* 限制函数 */
  background-color: hsl(120, 100%, 90%); /* 颜色函数 */
}
```

:::

## CSS 的引入方式

::: normal-demo
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS 引入方式示例</title>
  <!-- 3. 外部样式表 -->
  <link rel="stylesheet" href="styles.css">
  <!-- 2. 内部样式表 -->
  <style>
    /* 内部样式表 */
    .internal-style {
      color: blue;
      font-size: 18px;
    }
    /* 样式切换按钮 */
    .style-toggle {
      margin: 10px 5px;
      padding: 5px 10px;
      cursor: pointer;
    }
    .demo-container {
      border: 2px solid #ddd;
      padding: 20px;
      margin-top: 20px;
      border-radius: 5px;
    }
    .highlight {
      background-color: #f0f0f0;
      padding: 10px;
      border-radius: 5px;
      margin: 10px 0;
    }
  </style>
  <!-- 4. @import 引入 -->
  <style>
    @import url('imported.css');
  </style>
</head>
<body>
  <h1>CSS 引入方式示例</h1>
  
  <button class="style-toggle" onclick="toggleStyle('inline')">内联样式</button>
  <button class="style-toggle" onclick="toggleStyle('internal')">内部样式表</button>
  <button class="style-toggle" onclick="toggleStyle('external')">外部样式表</button>
  <button class="style-toggle" onclick="toggleStyle('imported')">@import 引入</button>
  <button class="style-toggle" onclick="toggleStyle('all')">全部显示</button>
  
  <div class="demo-container">
    <!-- 1. 内联样式 -->
    <p id="inline-example" style="color: red; font-weight: bold;">这是内联样式的示例</p>
    
    <!-- 2. 内部样式表 -->
    <p id="internal-example" class="internal-style">这是内部样式表的示例</p>
    
    <!-- 3. 外部样式表 -->
    <p id="external-example" class="external-style">这是外部样式表的示例</p>
    
    <!-- 4. @import 引入 -->
    <p id="imported-example" class="imported-style">这是 @import 引入的示例</p>
  </div>
  
  <div class="highlight">
    <h3>说明</h3>
    <p>这个示例展示了四种不同的 CSS 引入方式：</p>
    <ul>
      <li><strong>内联样式</strong>：直接在 HTML 元素的 style 属性中定义</li>
      <li><strong>内部样式表</strong>：在 HTML 文档的 &lt;head&gt; 标签内使用 &lt;style&gt; 标签定义</li>
      <li><strong>外部样式表</strong>：在单独的 .css 文件中定义，然后使用 &lt;link&gt; 标签引入</li>
      <li><strong>@import 引入</strong>：在 CSS 文件或 &lt;style&gt; 标签内使用 @import 规则引入其他 CSS 文件</li>
    </ul>
  </div>

  <script>
    function toggleStyle(styleType) {
      // 重置所有元素的显示
      document.getElementById('inline-example').style.display = 'none';
      document.getElementById('internal-example').style.display = 'none';
      document.getElementById('external-example').style.display = 'none';
      document.getElementById('imported-example').style.display = 'none';
      
      // 根据选择显示对应的元素
      if (styleType === 'inline' || styleType === 'all') {
        document.getElementById('inline-example').style.display = 'block';
      }
      if (styleType === 'internal' || styleType === 'all') {
        document.getElementById('internal-example').style.display = 'block';
      }
      if (styleType === 'external' || styleType === 'all') {
        document.getElementById('external-example').style.display = 'block';
      }
      if (styleType === 'imported' || styleType === 'all') {
        document.getElementById('imported-example').style.display = 'block';
      }
    }
    // 初始显示全部
    toggleStyle('all');
  </script>
</body>
</html>
```
```css
/* 外部样式表 styles.css */
.external-style {
  color: green;
  font-size: 18px;
  text-decoration: underline;
}

/* 被导入的样式表 imported.css */
.imported-style {
  color: purple;
  font-size: 18px;
  font-style: italic;
}
```
:::

### 1. 内联样式 (Inline Style)
直接在 HTML 元素的 `style` 属性中定义 CSS 样式。

**优点**: 针对性强，优先级高
**缺点**: 代码冗余，难以维护

```html
<p style="color: red; font-size: 16px;">这是一段红色文本</p>
```

### 2. 内部样式表 (Internal Style Sheet)
在 HTML 文档的 `<head>` 标签内使用 `<style>` 标签定义 CSS 样式。

**优点**: 单个文档内样式统一管理
**缺点**: 样式不能跨文档复用

```html
<head>
  <style>
    p {
      color: red;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <p>这是一段红色文本</p>
</body>
```

### 3. 外部样式表 (External Style Sheet)
将 CSS 样式定义在单独的 `.css` 文件中，然后在 HTML 文档中使用 `<link>` 标签引入。

**优点**: 样式可跨文档复用，便于维护
**缺点**: 需要额外的 HTTP 请求

```html
<head>
  <link rel="stylesheet" href="styles.css">
</head>
```

`styles.css` 文件内容:
```css
p {
  color: red;
  font-size: 16px;
}
```

### 4. @import 引入
在 CSS 文件中使用 `@import` 规则引入其他 CSS 文件。

**优点**: 可以组织多个 CSS 文件
**缺点**: 可能导致页面加载性能问题

```css
@import url("reset.css");
@import url("layout.css");

p {
  color: red;
  font-size: 16px;
}
```

## 最佳实践
- 优先使用外部样式表，便于维护和复用
- 避免使用内联样式，除非有特殊需求
- 谨慎使用 `@import`，因为它可能导致性能问题
- 使用 CSS 预处理器 (如 Sass、Less) 来提高开发效率

## 练习
1. 创建一个 HTML 文件，分别使用四种不同的方式引入 CSS 样式
2. 比较四种引入方式的优缺点
3. 尝试在一个项目中合理使用不同的引入方式

通过本章节的学习，你应该了解 CSS 的基本概念和四种主要的引入方式，并能够根据实际需求选择合适的引入方式。