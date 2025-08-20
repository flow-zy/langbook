# 现代选择器、层叠与继承

## 现代选择器

### 1. 组合选择器
组合选择器用于选择满足多个条件的元素。

::: normal-demo
```html
<div class="container">
  <p class="first-paragraph">这是容器内的第一个段落</p>
  <div class="box">
    <p>这是盒子内的段落</p>
  </div>
  <p>这是容器内的第二个段落</p>
  <h2>标题</h2>
  <p>这是标题后的第一个段落</p>
  <p>这是标题后的第二个段落</p>
</div>
```
```css
/* 后代选择器 */
.container p {
  color: blue;
}

/* 子元素选择器 */
.container > p {
  font-weight: bold;
}

/* 相邻兄弟选择器 */
 h2 + p {
  font-style: italic;
  color: red;
}

/* 通用兄弟选择器 */
 h2 ~ p {
  text-decoration: underline;
}
```
:::

#### 后代选择器 (空格)
选择某个元素的所有后代元素。

```css
.container p {
  color: #333;
}
```

#### 子元素选择器 (>) 
选择某个元素的直接子元素。

```css
.container > p {
  margin-bottom: 10px;
}
```

#### 相邻兄弟选择器 (+)
选择紧接在某个元素后面的兄弟元素。

```css
h1 + p {
  font-size: 18px;
}
```

#### 通用兄弟选择器 (~)
选择某个元素后面的所有兄弟元素。

```css
h1 ~ p {
  line-height: 1.6;
}
```

### 2. 伪类选择器
伪类用于选择处于特定状态的元素。

::: normal-demo
```html
<div class="pseudo-class-demo">
  <h3>动态伪类</h3>
  <a href="#">链接 (未访问)</a>
  <a href="#visited">链接 (已访问)</a>
  <button>按钮 (悬停/点击)</button>
  <input type="text" placeholder="输入框 (聚焦)">
  <input type="checkbox" checked> 已选中的复选框
  <input type="checkbox"> 未选中的复选框
  <input type="button" value="启用的按钮">
  <input type="button" value="禁用的按钮" disabled>

  <h3>结构伪类</h3>
  <ul class="list">
    <li>项目 1</li>
    <li>项目 2</li>
    <li>项目 3</li>
    <li>项目 4</li>
    <li>项目 5</li>
  </ul>
  <div class="mixed-content">
    <p>第一段</p>
    <div>第一个div</div>
    <p>第二段</p>
    <div>第二个div</div>
    <p>第三段</p>
  </div>
  <div class="empty-div"></div>
</div>
```
```css
/* 动态伪类 */
a:link { color: blue; }
a:visited { color: purple; }
a:hover { color: red; }
button:hover { background-color: #f0f0f0; }
button:active { background-color: #e0e0e0; }
input:focus { border-color: blue; outline: none; }
input:checked { accent-color: green; }
input:disabled { background-color: #f5f5f5; cursor: not-allowed; }

/* 结构伪类 */
.list li:first-child { color: red; }
.list li:last-child { color: blue; }
.list li:nth-child(2) { font-weight: bold; }
.list li:nth-child(odd) { background-color: #f5f5f5; }
.mixed-content p:first-of-type { font-size: 1.2em; }
.mixed-content p:last-of-type { font-style: italic; }
.mixed-content p:nth-of-type(2) { color: green; }
.empty-div:empty { width: 100px; height: 100px; background-color: #ddd; }

/* 样式美化 */
.pseudo-class-demo { max-width: 800px; margin: 0 auto; }
.pseudo-class-demo h3 { margin-top: 20px; margin-bottom: 10px; }
.pseudo-class-demo a, .pseudo-class-demo button, .pseudo-class-demo input { margin: 5px; }
.list { list-style-type: none; padding: 0; }
.list li { padding: 10px; margin-bottom: 5px; border: 1px solid #ddd; }
.mixed-content { margin-top: 20px; padding: 10px; border: 1px solid #ddd; }
.empty-div { margin-top: 10px; }
```
:::

#### 动态伪类
```css
/* 链接状态 */
a:link { color: blue; }

a:visited { color: purple; }

a:hover { color: red; }

a:active { color: orange; }

/* 表单状态 */
input:focus { border-color: blue; }

input:enabled { background-color: white; }

input:disabled { background-color: #f5f5f5; }

input:checked { accent-color: blue; }
```

#### 结构伪类
```css
/* 第一个子元素 */
li:first-child { font-weight: bold; }

/* 最后一个子元素 */
li:last-child { margin-bottom: 0; }

/* 第n个子元素 */
li:nth-child(2) { color: red; }

/* 奇数子元素 */
li:nth-child(odd) { background-color: #f5f5f5; }

/* 偶数子元素 */
li:nth-child(even) { background-color: #fff; }

/* 第一个类型 */
p:first-of-type { font-size: 1.2em; }

/* 最后一个类型 */
p:last-of-type { margin-bottom: 0; }

/* 第n个类型 */
p:nth-of-type(2) { color: blue; }

/* 没有子元素的元素 */
div:empty { display: none; }
```

### 3. 否定伪类
选择不满足条件的元素。

::: normal-demo
```html
<div class="negation-demo">
  <p>这是一个普通段落</p>
  <p class="special">这是一个特殊段落</p>
  <div>这是一个div元素</div>
  <button>普通按钮</button>
  <button class="active">活跃按钮</button>
  <ul class="list">
    <li>项目 1</li>
    <li class="exclude">项目 2 (排除)</li>
    <li>项目 3</li>
  </ul>
</div>
```
```css
/* 否定伪类 */
.negation-demo :not(p) { color: blue; }
.negation-demo button:not(.active) { opacity: 0.7; cursor: not-allowed; }
.list li:not(.exclude) { background-color: #f5f5f5; }

/* 样式美化 */
.negation-demo { max-width: 800px; margin: 0 auto; }
.negation-demo p, .negation-demo div { margin-bottom: 10px; }
.special { font-weight: bold; }
.list { list-style-type: none; padding: 0; }
.list li { padding: 10px; margin-bottom: 5px; border: 1px solid #ddd; }
.exclude { background-color: #ffeeee; }
```
:::

```css
/* 不是p元素的元素 */
:not(p) { margin-bottom: 10px; }

/* 没有active类的按钮 */
button:not(.active) { opacity: 0.7; }
```

## 层叠与继承

::: normal-demo
```html
<div class="cascade-inheritance-demo">
  <h3>层叠优先级示例</h3>
  <div class="box" id="special-box">
    这是一个盒子
  </div>

  <h3>继承示例</h3>
  <div class="parent">
    父元素
    <div class="child">
      子元素
      <div class="grandchild">
        孙子元素
      </div>
    </div>
  </div>

  <h3>控制继承示例</h3>
  <div class="inheritance-control">
    <div class="unset-example">unset 示例</div>
    <div class="initial-example">initial 示例</div>
    <div class="revert-example">revert 示例</div>
  </div>
</div>
```
```css
/* 层叠优先级 */
.box { background-color: red; }
.special-box { background-color: green; }
#special-box { background-color: blue; }
.box { background-color: yellow !important; }

/* 继承 */
.parent { color: blue; font-size: 18px; border: 1px solid black; }
.child { font-weight: bold; }
.grandchild { text-decoration: underline; }

/* 控制继承 */
.inheritance-control { color: green; font-size: 20px; }
.unset-example { color: unset; font-size: unset; }
.initial-example { color: initial; font-size: initial; }
.revert-example { color: revert; font-size: revert; }

/* 样式美化 */
.cascade-inheritance-demo { max-width: 800px; margin: 0 auto; }
.cascade-inheritance-demo h3 { margin-top: 30px; margin-bottom: 10px; }
.box { width: 200px; height: 100px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
.parent, .child, .grandchild { padding: 10px; margin-bottom: 5px; }
.inheritance-control div { padding: 10px; margin-bottom: 5px; border: 1px solid #ddd; }
```
:::

### 1. 层叠 (Cascade)
当多个样式规则应用到同一个元素时，层叠机制决定了哪个规则会被优先应用。层叠的优先级从高到低为：

1. 重要性 (Important)
2. 专用性 (Specificity)
3. 源代码顺序 (Source Order)

```css
/* 普通样式 */
p { color: black; }

/* 更具体的选择器 (更高的专用性) */
.container p { color: blue; }

/* 重要样式 (最高优先级) */
p { color: red !important; }
```

### 2. 继承 (Inheritance)
某些 CSS 属性会从父元素继承到子元素，而有些则不会。

```css
/* 会继承的属性 */
body {
  color: #333; /* 文本颜色会继承 */
  font-family: Arial, sans-serif; /* 字体族会继承 */
  font-size: 16px; /* 字体大小会继承 */
}

/* 不会继承的属性 */
.box {
  width: 200px; /* 宽度不会继承 */
  height: 200px; /* 高度不会继承 */
  margin: 10px; /* 外边距不会继承 */
}
```

### 3. 控制继承的关键字

#### inherit
强制继承父元素的属性值。

```css
.child {
  color: inherit; /* 继承父元素的文本颜色 */
}
```

#### initial
将属性值设置为初始值。

```css
.element {
  color: initial; /* 文本颜色设置为初始值 (通常是黑色) */
}
```

#### unset
如果属性是可继承的，则表现为 inherit；否则表现为 initial。

```css
.element {
  color: unset; /* 对于可继承的color属性，表现为inherit */
  margin: unset; /* 对于不可继承的margin属性，表现为initial */
}
```

#### revert
将属性值还原为浏览器的默认样式，而不是 CSS 规范定义的初始值。

```css
.element {
  color: revert; /* 还原为浏览器默认的文本颜色 */
}
```

## 最佳实践
- 避免过度使用 `!important`，因为它会破坏层叠机制
- 理解选择器的专用性，避免不必要的复杂选择器
- 利用继承减少重复代码
- 合理使用控制继承的关键字

## 练习
1. 创建一个包含多种选择器的样式表
2. 测试不同选择器的优先级
3. 尝试使用结构伪类选择元素
4. 测试继承和控制继承关键字的效果

通过本章节的学习，你应该掌握现代 CSS 选择器的使用，理解层叠与继承的机制，并能够灵活运用控制继承的关键字。