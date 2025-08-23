# HTML完全指南

欢迎来到HTML完全指南！本教程专为初学者设计，从零基础开始，逐步带你掌握网页开发的基础技术——HTML（超文本标记语言）。

HTML是构建网页的标准标记语言，就像盖房子的蓝图，它定义了网页的结构和内容。无论你想创建个人博客、企业网站还是Web应用，HTML都是你必须掌握的第一步。

本教程基于最新的MDN和W3C标准，包含大量实用示例和练习，帮助你快速上手。即使你没有任何编程经验，也能轻松理解和掌握。

## 为什么学习HTML？
- 是所有网页开发的基础
- 容易学习，适合零基础入门
- 是学习CSS和JavaScript的前提
- 可以创建各种类型的网站和应用

让我们开始这段学习之旅吧！

## 基本结构

HTML文档有一个标准的结构，就像一篇文章有标题、正文一样。让我们来认识HTML文档的基本组成部分：

```html
<!DOCTYPE html>  <!-- 声明文档类型为HTML5 -->
<html lang="zh-CN">  <!-- HTML根元素，lang属性指定页面语言为中文 -->
<head>  <!-- 头部区域，包含页面的元信息 -->
    <meta charset="UTF-8">  <!-- 设置字符编码为UTF-8，支持中文显示 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  <!-- 响应式设计设置 -->
    <title>页面标题</title>  <!-- 浏览器标签栏显示的标题 -->
</head>
<body>  <!-- 身体区域，包含页面的可见内容 -->
    <h1>我的第一个HTML页面</h1>  <!-- 一级标题 -->
    <p>这是一个段落。</p>  <!-- 段落 -->
</body>
</html>
```

### 各部分解释

1. `<!DOCTYPE html>`: 告诉浏览器这是一个HTML5文档
2. `<html>`: 根元素，包含整个HTML页面
3. `<head>`: 包含页面的元数据（不可见内容）
4. `<meta charset="UTF-8">`: 确保页面正确显示中文和其他字符
5. `<meta name="viewport" ...>`: 使页面在移动设备上显示正常
6. `<title>`: 设置页面标题
7. `<body>`: 包含用户可见的页面内容

### 实战练习

1. 新建一个文本文件，将其命名为`index.html`
2. 复制上面的代码到文件中
3. 用浏览器打开这个文件（双击文件或拖入浏览器窗口）
4. 你将看到一个简单的网页，显示标题和段落

试着修改文本内容，保存后刷新浏览器，看看会发生什么变化！

## 元素和标签

HTML通过**元素**来构建网页内容，而元素是由**标签**定义的。理解元素和标签是学习HTML的关键。

### 什么是标签？

标签是HTML的基本构建块，用尖括号`<`和`>`包围。大多数标签成对出现：
- **开始标签**：`<标签名>`
- **结束标签**：`</标签名>`

例如：`<p>`是开始标签，`</p>`是结束标签。

### 什么是元素？

元素由开始标签、内容和结束标签组成：
```
<开始标签>内容</结束标签>
```

例如：`<p>这是一个段落。</p>`就是一个完整的段落元素。

### 单标签元素

有些元素没有内容，也不需要结束标签，称为单标签或自闭合标签。例如：
```html
<img src="image.jpg" alt="图片描述">
<br>  <!-- 换行 -->
<hr>  <!-- 水平线 -->
```

### 常见HTML元素

下面是一些最常用的HTML元素及其用途：

```html
<!-- 标题元素：h1到h6，级别从大到小 -->
<h1>一级标题</h1>  <!-- 最大的标题 -->
<h2>二级标题</h2>
<h3>三级标题</h3>
<h4>四级标题</h4>
<h5>五级标题</h5>
<h6>六级标题</h6>  <!-- 最小的标题 -->

<!-- 段落元素 -->
<p>这是一个段落。段落是网页中最常用的文本容器。</p>

<!-- 链接元素 -->
<a href="https://www.example.com" target="_blank">访问示例网站</a>
<!-- target="_blank"表示在新窗口打开链接 -->

<!-- 图像元素 -->
<img src="image.jpg" alt="描述文本" width="300" height="200">
<!-- alt属性用于图片无法显示时的替代文本 -->

<!-- 无序列表 -->
<ul>
    <li>无序列表项1</li>
    <li>无序列表项2</li>
    <li>无序列表项3</li>
</ul>

<!-- 有序列表 -->
<ol>
    <li>有序列表项1</li>
    <li>有序列表项2</li>
    <li>有序列表项3</li>
</ol>

<!-- 分区元素：用于组织页面结构 -->
<div>这是一个块级容器，通常用于分组其他元素</div>

<!-- 行内元素：用于文本中的小部分 -->
<span>这是行内文本，用于突出显示或样式化文本的一部分</span>
```

### 实战练习

1. 在之前创建的`index.html`文件中，添加各种元素
2. 尝试使用不同的标题级别、段落、列表和链接
3. 保存文件并在浏览器中查看效果
4. 观察不同元素在页面上的显示方式有什么不同

通过练习，你会逐渐熟悉这些基本元素的用法，为后续学习打下基础。

## 属性

HTML元素可以包含**属性**，它们提供了关于元素的额外信息，或者改变元素的行为。属性是HTML中非常重要的一部分，让我们的网页更加丰富和交互。

### 属性的基本语法

属性总是位于开始标签中，由属性名和属性值组成：

```html
<元素名 属性名="属性值">内容</元素名>
```

- 属性名和属性值之间用等号`=`连接
- 属性值通常用双引号`"`包围（也可以用单引号`'`）
- 一个元素可以有多个属性，属性之间用空格分隔

例如：
```html
<a href="https://example.com" target="_blank">访问示例网站</a>
```
这里`href`和`target`都是属性。

### 常见的HTML属性

下面是一些最常用的HTML属性及其用途：

```html
<!-- id属性：给元素一个唯一的标识符 -->
<div id="header">网页头部</div>

<!-- class属性：为元素指定一个或多个类名，用于CSS样式 -->
<p class="highlight important">这是一个重要的高亮段落</p>

<!-- style属性：设置元素的内联样式 -->
<p style="color: red; font-size: 20px;">这是红色的大文本</p>

<!-- href属性：指定链接的目标URL -->
<a href="https://example.com">这是一个链接</a>

<!-- src属性：指定图像、音频或视频的源文件路径 -->
<img src="image.jpg" alt="图片描述">

<!-- alt属性：当图像无法显示时显示的替代文本 -->
<img src="broken.jpg" alt="这是一张无法显示的图片">

<!-- width和height属性：设置元素的宽度和高度 -->
<img src="image.jpg" alt="图片" width="300" height="200">

<!-- title属性：鼠标悬停在元素上时显示的提示文本 -->
<a href="https://example.com" title="访问示例网站">示例链接</a>

<!-- target属性：指定链接在哪里打开 -->
<a href="https://example.com" target="_blank">在新窗口打开链接</a>
```

### 布尔属性

有些属性只有属性名，没有属性值，称为布尔属性。它们的存在就表示"true"。例如：

```html
<!-- disabled属性：禁用表单元素 -->
<input type="text" disabled>

<!-- checked属性：勾选复选框或单选按钮 -->
<input type="checkbox" checked>
```

### 实用提示

1. 属性名不区分大小写，但建议使用小写（符合现代HTML标准）
2. 属性值应该总是用引号包围，以避免解析错误
3. `alt`属性对于图像是必需的，它提高了网页的可访问性
4. `id`属性在整个网页中应该是唯一的，不能重复
5. 尽量使用`class`属性而不是`id`属性来应用CSS样式，除非元素确实需要唯一标识

### 实战练习

1. 在之前的`index.html`文件中，给元素添加各种属性
2. 尝试使用`id`、`class`、`style`、`title`等属性
3. 为图片添加`alt`属性，然后故意将图片路径写错，看看会发生什么
4. 创建几个链接，使用`target="_blank"`让它们在新窗口打开

通过练习，你会更熟练地掌握属性的使用方法，为创建更丰富的网页打下基础。

## 表单

表单是HTML中用于**收集用户输入数据**的重要部分。无论是登录页面、注册表单还是搜索框，都是通过HTML表单实现的。学习表单将让你能够创建与用户交互的网页。

### 为什么需要表单？

- 收集用户信息（如注册、登录）
- 允许用户搜索内容
- 让用户提交反馈或评论
- 进行在线调查或投票
- 实现文件上传功能

### 表单的基本结构

一个基本的HTML表单由`<form>`标签和各种表单元素组成：

```html
<form action="/submit-form" method="post">
    <!-- 表单元素将在这里添加 -->
    <button type="submit">提交</button>
</form>
```

- `<form>`: 表单的容器标签
- `action`: 指定表单数据提交到的URL地址
- `method`: 指定提交数据的HTTP方法（通常是`get`或`post`）
- `<button type="submit">`: 提交按钮，点击后发送表单数据

### 常见表单元素

HTML提供了多种表单元素，用于收集不同类型的数据：

#### 文本输入框
```html
<!-- 普通文本输入框 -->
<label for="username">用户名：</label>
<input type="text" id="username" name="username" placeholder="请输入用户名">

<!-- 密码输入框 -->
<label for="password">密码：</label>
<input type="password" id="password" name="password" placeholder="请输入密码">

<!-- 多行文本框 -->
<label for="message">留言：</label>
<textarea id="message" name="message" rows="4" cols="50" placeholder="请输入留言内容"></textarea>
```

#### 单选按钮和复选框
```html
<!-- 单选按钮 -->
<p>性别：</p>
<input type="radio" id="male" name="gender" value="male">
<label for="male">男</label>

<input type="radio" id="female" name="gender" value="female">
<label for="female">女</label>

<!-- 复选框 -->
<p>爱好：</p>
<input type="checkbox" id="reading" name="hobbies" value="reading">
<label for="reading">阅读</label>

<input type="checkbox" id="sports" name="hobbies" value="sports">
<label for="sports">运动</label>

<input type="checkbox" id="music" name="hobbies" value="music">
<label for="music">音乐</label>
```

#### 下拉列表
```html
<label for="country">国家：</label>
<select id="country" name="country">
    <option value="china">中国</option>
    <option value="usa">美国</option>
    <option value="japan">日本</option>
    <option value="other">其他</option>
</select>
```

#### 按钮
```html
<!-- 提交按钮 -->
<button type="submit">提交</button>

<!-- 重置按钮 -->
<button type="reset">重置</button>

<!-- 普通按钮 -->
<button type="button">点击我</button>
```

### 完整的表单示例

下面是一个包含多种表单元素的完整示例：

```html
<form action="/submit-form" method="post">
    <h3>用户注册</h3>

    <div>
        <label for="username">用户名：</label>
        <input type="text" id="username" name="username" placeholder="请输入用户名" required>
    </div>

    <div>
        <label for="email">电子邮箱：</label>
        <input type="email" id="email" name="email" placeholder="请输入电子邮箱" required>
    </div>

    <div>
        <label for="password">密码：</label>
        <input type="password" id="password" name="password" placeholder="请输入密码" required minlength="6">
    </div>

    <div>
        <p>性别：</p>
        <input type="radio" id="male" name="gender" value="male">
        <label for="male">男</label>

        <input type="radio" id="female" name="gender" value="female">
        <label for="female">女</label>
    </div>

    <div>
        <p>爱好：</p>
        <input type="checkbox" id="reading" name="hobbies" value="reading">
        <label for="reading">阅读</label>

        <input type="checkbox" id="sports" name="hobbies" value="sports">
        <label for="sports">运动</label>

        <input type="checkbox" id="music" name="hobbies" value="music">
        <label for="music">音乐</label>
    </div>

    <div>
        <label for="country">国家：</label>
        <select id="country" name="country">
            <option value="china">中国</option>
            <option value="usa">美国</option>
            <option value="japan">日本</option>
            <option value="other">其他</option>
        </select>
    </div>

    <div>
        <label for="message">留言：</label>
        <textarea id="message" name="message" rows="4" cols="50" placeholder="请输入留言内容"></textarea>
    </div>

    <button type="submit">注册</button>
    <button type="reset">重置</button>
</form>
```

### 表单新特性

HTML5引入了许多表单增强功能，让表单更加易用和强大：

#### 新的输入类型

HTML5新增了多种输入类型，专门用于收集特定类型的数据：

```html
<!-- 数字输入 -->
<input type="number" min="1" max="100" step="1" value="50">
<!-- min: 最小值, max: 最大值, step: 步长, value: 默认值 -->

<!-- 日期和时间输入 -->
<input type="date">  <!-- 日期选择器 -->
<input type="time">  <!-- 时间选择器 -->
<input type="datetime-local">  <!-- 日期和时间选择器 -->

<!-- 颜色选择器 -->
<input type="color" value="#ff0000">

<!-- 搜索输入 -->
<input type="search" placeholder="搜索...">

<!-- 电话号码 -->
<input type="tel" pattern="[0-9]{11}" placeholder="11位手机号码">

<!-- URL输入 -->
<input type="url" placeholder="https://example.com">

<!-- 邮箱输入 -->
<input type="email" placeholder="your@email.com">
```

#### 表单验证

HTML5提供了内置的表单验证功能，可以在用户提交表单前检查数据是否有效：

```html
<!-- 必填字段 -->
<input type="text" required>

<!-- 最小/最大长度 -->
<input type="password" minlength="6" maxlength="20">

<!-- 数字范围 -->
<input type="number" min="1" max="100">

<!-- 正则表达式验证 -->
<input type="text" pattern="[A-Za-z0-9]{6,}" title="至少6个字符，只能包含字母和数字">

<!-- 自定义验证消息 -->
<input type="email" id="email" required>
<script>
const emailInput = document.getElementById('email');
emailInput.addEventListener('invalid', function(event) {
  if (emailInput.validity.valueMissing) {
    emailInput.setCustomValidity('请输入您的邮箱地址');
  } else if (emailInput.validity.typeMismatch) {
    emailInput.setCustomValidity('请输入有效的邮箱地址');
  } else {
    emailInput.setCustomValidity('');
  }
});
</script>
```

### 实用提示

1. 始终为表单元素添加`<label>`标签，这可以提高可访问性，点击标签也能聚焦到对应的输入框
2. 使用`placeholder`属性为用户提供输入提示
3. 对重要字段使用`required`属性进行验证
4. 合理使用表单验证，可以减少服务器端的验证工作
5. 表单提交后的处理需要后端代码（如PHP、Python等），但这超出了HTML的范围
6. 测试表单在不同浏览器中的显示和行为，确保兼容性
7. 使用`<div>`或`<fieldset>`元素对相关的表单元素进行分组，提高可读性

### 实战练习

1. 创建一个简单的登录表单，包含用户名和密码字段
2. 添加表单验证，确保两个字段都是必填的，密码长度至少为6位
3. 创建一个调查表单，包含单选按钮、复选框和下拉列表
4. 尝试使用HTML5新增的输入类型，如电子邮件、日期、颜色等
5. 为表单添加自定义验证消息，提升用户体验

通过练习，你将能够创建各种类型的表单，为用户提供良好的交互体验。
```

#### 表单数据列表

```html
<input type="text" list="browsers" name="browser">
<datalist id="browsers">
  <option value="Chrome">
  <option value="Firefox">
  <option value="Safari">
  <option value="Edge">
  <option value="Opera">
</datalist>
```

表单用于收集用户输入：

```html
<form action="/submit" method="post">
    <div>
        <label for="name">姓名：</label>
        <input type="text" id="name" name="name" required>
    </div>
    <div>
        <label for="email">邮箱：</label>
        <input type="email" id="email" name="email" required>
    </div>
    <div>
        <label for="message">留言：</label>
        <textarea id="message" name="message" rows="4" cols="50"></textarea>
    </div>
    <div>
        <button type="submit">提交</button>
        <button type="reset">重置</button>
    </div>
</form>
```

## 表格高级特性

表格是展示结构化数据的有效方式，HTML提供了丰富的表格功能。

### 基本表格结构

```html
<table border="1">
  <thead>
    <tr>
      <th>表头1</th>
      <th>表头2</th>
      <th>表头3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>数据1</td>
      <td>数据2</td>
      <td>数据3</td>
    </tr>
    <tr>
      <td>数据4</td>
      <td>数据5</td>
      <td>数据6</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="3">表格底部信息</td>
    </tr>
  </tfoot>
</table>
```

### 高级表格特性

#### 单元格合并

```html
<table border="1">
  <tr>
    <th colspan="2">合并列</th>
  </tr>
  <tr>
    <td rowspan="2">合并行</td>
    <td>数据1</td>
  </tr>
  <tr>
    <td>数据2</td>
  </tr>
</table>
```

#### 表格分组

```html
<table border="1">
  <caption>表格标题</caption>
  <colgroup>
    <col style="background-color: #f2f2f2;">
    <col span="2">
  </colgroup>
  <thead>
    <tr>
      <th>姓名</th>
      <th>年龄</th>
      <th>职业</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>张三</td>
      <td>25</td>
      <td>工程师</td>
    </tr>
    <tr>
      <td>李四</td>
      <td>30</td>
      <td>设计师</td>
    </tr>
  </tbody>
</table>
```

## 无障碍访问 (ARIA)

无障碍访问确保所有用户，包括有残障的用户，都能使用你的网站。HTML提供了ARIA (Accessible Rich Internet Applications) 属性来增强网页的可访问性。

### 基本ARIA属性

```html
<!-- 角色属性 -->
<nav role="navigation" aria-label="主导航">
  <!-- 导航链接 -->
</nav>

<!-- 状态属性 -->
<button aria-expanded="false" aria-controls="menu">菜单</button>
<div id="menu" hidden>菜单内容</div>

<!-- 标签关联 -->
<input type="text" aria-label="搜索" placeholder="搜索...">

<!-- 进度指示 -->
<div role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
```

### 表单无障碍

```html
<form>
  <div>
    <label for="username">用户名：</label>
    <input type="text" id="username" name="username" required aria-required="true">
  </div>
  <div>
    <label for="password">密码：</label>
    <input type="password" id="password" name="password" required aria-required="true"
           aria-describedby="password-hint">
    <p id="password-hint">密码长度至少8位，包含字母和数字</p>
  </div>
</form>
```

## 语义化标签

语义化标签使HTML更具可读性和可访问性：

```html
<header>
    <h1>网站标题</h1>
    <nav>
        <ul>
            <li><a href="/">首页</a></li>
            <li><a href="/about">关于我们</a></li>
        </ul>
    </nav>
</header>

<main>
    <section>
        <h2>新闻标题</h2>
        <article>
            <h3>文章标题</h3>
            <p>文章内容...</p>
        </article>
    </section>
</main>

<footer>
    <p>版权所有 &copy; 2023</p>
</footer>
```

## HTML5新特性

HTML5引入了许多新特性和API，极大增强了网页的功能和表现力。

### 语义化标签

除了之前介绍的基本语义化标签外，HTML5还引入了更多专门用途的语义化标签：

```html
<article>  <!-- 独立的内容块，如博客文章、新闻故事 -->
<aside>    <!-- 侧边栏或附加内容 -->
<details>  <!-- 可展开/折叠的内容 -->
<figcaption>  <!-- 图表或图片的标题 -->
<figure>   <!-- 图表、图片或代码示例 -->
<footer>   <!-- 页脚 -->
<header>   <!-- 页眉 -->
<main>     <!-- 主要内容区域 -->
<mark>     <!-- 高亮文本 -->
<nav>      <!-- 导航链接 -->
<section>  <!-- 文档中的节或区域 -->
<summary>  <!-- details元素的标题 -->
<time>     <!-- 日期或时间 -->
</details>
```

### 多媒体元素

HTML5提供了内置的音频和视频播放功能：

```html
<!-- 音频播放 -->
<audio controls poster="album-cover.jpg">
  <source src="audio.mp3" type="audio/mpeg">
  <source src="audio.ogg" type="audio/ogg">
  您的浏览器不支持音频元素。
</audio>

<!-- 视频播放 -->
<video controls width="640" height="360" poster="video-thumbnail.jpg">
  <source src="video.mp4" type="video/mp4">
  <source src="video.webm" type="video/webm">
  您的浏览器不支持视频元素。
</video>
```

### Canvas绘图

Canvas元素允许通过JavaScript动态绘制图形：

```html
<canvas id="myCanvas" width="400" height="200"></canvas>

<script>
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// 绘制矩形
ctx.fillStyle = 'red';
ctx.fillRect(10, 10, 100, 50);

// 绘制圆形
ctx.beginPath();
ctx.arc(200, 100, 50, 0, Math.PI * 2);
ctx.fillStyle = 'blue';
ctx.fill();

// 绘制文本
ctx.font = '20px Arial';
ctx.fillStyle = 'black';
ctx.fillText('Hello Canvas!', 280, 100);
</script>
```

### Web存储

HTML5提供了本地存储机制，让网页可以在客户端存储数据：

```html
<script>
// 本地存储 - 永久保存
localStorage.setItem('username', 'John');
const username = localStorage.getItem('username');
// localStorage.removeItem('username');
// localStorage.clear();

// 会话存储 - 仅当前会话有效
sessionStorage.setItem('sessionId', 'abc123');
const sessionId = sessionStorage.getItem('sessionId');
</script>
```

## 复杂示例 (Playground)

以下是一个包含表单、表格和多媒体元素的复杂示例：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>复杂HTML示例</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        table { border-collapse: collapse; width: 100%; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .form-group { margin-bottom: 15px; }
    </style>
</head>
<body>
    <header>
        <h1>复杂HTML示例</h1>
    </header>

    <main>
        <section>
            <h2>用户信息表单</h2>
            <form id="user-form">
                <div class="form-group">
                    <label for="username">用户名：</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="email">电子邮箱：</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="country">国家/地区：</label>
                    <select id="country" name="country">
                        <option value="cn">中国</option>
                        <option value="us">美国</option>
                        <option value="jp">日本</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>兴趣爱好：</label><br>
                    <input type="checkbox" id="hobby-music" name="hobbies" value="music">
                    <label for="hobby-music">音乐</label>
                    <input type="checkbox" id="hobby-sports" name="hobbies" value="sports">
                    <label for="hobby-sports">运动</label>
                    <input type="checkbox" id="hobby-reading" name="hobbies" value="reading">
                    <label for="hobby-reading">阅读</label>
                </div>
                <button type="submit">提交</button>
            </form>
        </section>

        <section>
            <h2>产品列表</h2>
            <table>
                <thead>
                    <tr>
                        <th>产品ID</th>
                        <th>产品名称</th>
                        <th>价格</th>
                        <th>库存</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>P001</td>
                        <td>智能手机</td>
                        <td>¥3999</td>
                        <td>100</td>
                    </tr>
                    <tr>
                        <td>P002</td>
                        <td>笔记本电脑</td>
                        <td>¥5999</td>
                        <td>50</td>
                    </tr>
                    <tr>
                        <td>P003</td>
                        <td>平板电脑</td>
                        <td>¥2499</td>
                        <td>75</td>
                    </tr>
                </tbody>
            </table>
        </section>

        <section>
            <h2>多媒体演示</h2>
            <div>
                <h3>音频</h3>
                <audio controls>
                    <source src="sample-audio.mp3" type="audio/mpeg">
                    您的浏览器不支持音频元素。
                </audio>
            </div>
            <div>
                <h3>视频</h3>
                <video width="400" controls>
                    <source src="sample-video.mp4" type="video/mp4">
                    您的浏览器不支持视频元素。
                </video>
            </div>
        </section>
    </main>

    <footer>
        <p>© 2023 示例网站. 保留所有权利。</p>
    </footer>

    <script>
        document.getElementById('user-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('表单提交成功！');
        });
    </script>
</body>
</html>
```

您可以在以下在线Playground中编辑和预览此代码：

- [CodePen](https://codepen.io/)
- [JSFiddle](https://jsfiddle.net/)
- [CodeSandbox](https://codesandbox.io/)

## 最佳实践

### 代码组织

```html
<!-- 保持代码缩进一致 -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>页面标题</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- 语义化标签结构 -->
    <header>
        <!-- 页眉内容 -->
    </header>
    <main>
        <!-- 主要内容 -->
    </main>
    <footer>
        <!-- 页脚内容 -->
    </footer>
    <script src="script.js"></script>
</body>
</html>
```

### 性能优化

1. **减少HTTP请求**
   - 合并CSS和JavaScript文件
   - 使用CSS Sprites合并图片
   - 延迟加载非关键资源

2. **优化图片**
   - 使用适当的图片格式（WebP、AVIF）
   - 压缩图片
   - 使用响应式图片

```html
<!-- 响应式图片 -->
<picture>
  <source srcset="image-large.webp" media="(min-width: 800px)">
  <source srcset="image-medium.webp" media="(min-width: 400px)">
  <img src="image-small.webp" alt="描述文本" loading="lazy">
</picture>
```

3. **使用现代CSS和JavaScript**
   - 避免内联样式和脚本
   - 使用CSS变量提高可维护性
   - 采用模块化JavaScript

### 常见错误和避免方法

1. **标签嵌套错误**
   - 确保标签正确嵌套
   - 不要忘记关闭标签

2. **语义化错误**
   - 不要过度使用div元素
   - 为每个页面使用合适的语义化标签

3. **表单错误**
   - 始终为表单元素提供标签
   - 使用正确的输入类型

## 学习资源

- [MDN HTML文档](https://developer.mozilla.org/zh-CN/docs/Web/HTML) - 最权威的HTML参考文档
- [W3C HTML规范](https://www.w3.org/TR/html5/) - 官方HTML5规范
- [W3Schools HTML教程](https://www.w3schools.com/html/) - 适合初学者的交互式教程
- [HTML5 Rocks](https://www.html5rocks.com/) - HTML5新特性的深入讲解
- [Can I Use](https://caniuse.com/) - 检查HTML、CSS和JavaScript特性的浏览器兼容性
- [Web.dev](https://web.dev/learn/html/) - Google的Web开发最佳实践指南