# 变量

## CSS 变量基本概念
CSS 变量（也称为自定义属性）允许我们定义可重用的值，并在整个样式表中引用它们。这使得样式的维护和修改更加容易。

### 1. 定义和使用变量

::: normal-demo
```html
<div class="variable-demo">
  <h2>CSS 变量示例</h2>
  <p class="text-primary">这是使用主色调的文本</p>
  <p class="text-secondary">这是使用辅助色的文本</p>
  <div class="box">这是一个使用变量设置样式的盒子</div>
</div>
```
```css
/* 定义变量 */
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --font-size: 16px;
  --box-padding: 20px;
  --box-border-radius: 4px;
}

/* 使用变量 */
.variable-demo {
  font-size: var(--font-size);
}

.text-primary {
  color: var(--primary-color);
}

.text-secondary {
  color: var(--secondary-color);
}

.box {
  background-color: var(--primary-color);
  color: white;
  padding: var(--box-padding);
  border-radius: var(--box-border-radius);
  margin-top: 15px;
}
```
:::

```css
/* 定义变量 */
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --font-size: 16px;
}

/* 使用变量 */
.element {
  color: var(--primary-color);
  background-color: var(--secondary-color);
  font-size: var(--font-size);
}
```

### 2. 变量的作用域
- **全局作用域**：在 `:root` 伪类中定义的变量，可在整个文档中使用
- **局部作用域**：在特定选择器中定义的变量，仅在该选择器及其后代中使用

::: normal-demo
```html
<div class="scope-demo">
  <h3>变量作用域示例</h3>
  <div class="global-scope">全局作用域变量</div>
  <div class="container">
    <div class="local-scope">局部作用域变量</div>
    <div class="nested-element">嵌套元素访问局部变量</div>
  </div>
  <div class="outside-container">容器外部元素（无法访问容器局部变量）</div>
</div>
```
```css
/* 全局变量 */
:root {
  --global-color: #3498db;
  --global-bg: #f0f0f0;
}

/* 局部变量 */
.container {
  --local-color: #e74c3c;
  --local-bg: #f9f9f9;
  background-color: var(--local-bg);
  padding: 15px;
  margin: 15px 0;
  border-radius: 4px;
}

.scope-demo {
  background-color: var(--global-bg);
  padding: 20px;
  border-radius: 4px;
}

.global-scope {
  color: var(--global-color);
  padding: 10px;
  margin-bottom: 10px;
}

.local-scope {
  color: var(--local-color);
  padding: 10px;
  margin-bottom: 10px;
}

.nested-element {
  color: var(--local-color); /* 可以访问父元素的局部变量 */
  background-color: var(--global-bg); /* 可以访问全局变量 */
  padding: 10px;
}

.outside-container {
  color: var(--global-color); /* 可以访问全局变量 */
  /* 无法访问 --local-color，将使用默认文本颜色 */
  padding: 10px;
}
```
:::

```css
/* 全局变量 */
:root {
  --primary-color: #3498db;
}

/* 局部变量 */
.container {
  --container-bg: #f5f5f5;
  background-color: var(--container-bg);
}

.item {
  color: var(--primary-color); /* 可以访问全局变量 */
  background-color: var(--container-bg); /* 可以访问父元素的变量 */
}
```

### 3. 变量的默认值
可以为变量指定默认值，当变量未定义时使用。

```css
.element {
  color: var(--undefined-color, #333); /* 如果 --undefined-color 未定义，则使用 #333 */
}
```

### 4. 变量的继承
变量会从父元素继承，如果子元素没有定义同名变量，则使用父元素的变量值。

::: normal-demo
```html
<div class="inheritance-demo">
  <h3>变量继承示例</h3>
  <div class="parent">
    父元素
    <div class="child">子元素（继承父元素变量）</div>
    <div class="child-with-override">子元素（覆盖父元素变量）</div>
  </div>
</div>
```
```css
.inheritance-demo {
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 4px;
}

.parent {
  --text-color: #3498db;
  --bg-color: #e8f4fd;
  color: var(--text-color);
  background-color: var(--bg-color);
  padding: 15px;
  border-radius: 4px;
}

.child {
  /* 继承父元素的 --text-color 和 --bg-color */
  color: var(--text-color);
  background-color: rgba(255, 255, 255, 0.5);
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
}

.child-with-override {
  --text-color: #e74c3c; /* 覆盖父元素的 --text-color */
  color: var(--text-color);
  background-color: rgba(255, 255, 255, 0.5);
  padding: 10px;
  border-radius: 4px;
}
```
:::

```css
.parent {
  --text-color: blue;
}

.child {
  color: var(--text-color); /* 继承父元素的 --text-color */
}
```

## 高级用法

### 1. 变量的动态修改
可以通过 JavaScript 动态修改 CSS 变量。

::: normal-demo
```html
<div class="dynamic-modification-demo">
  <h3>动态修改变量示例</h3>
  <div class="box">动态样式盒子</div>
  <button id="changeColorBtn">改变颜色</button>
  <button id="changeSizeBtn">改变大小</button>
</div>
```
```css
:root {
  --box-color: #3498db;
  --box-size: 200px;
  --box-padding: 20px;
}

.dynamic-modification-demo {
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 4px;
}

.box {
  width: var(--box-size);
  height: var(--box-size);
  background-color: var(--box-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--box-padding);
  border-radius: 4px;
  margin: 20px 0;
  transition: all 0.3s ease;
}

button {
  padding: 8px 16px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  background-color: #2ecc71;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #27ae60;
}
```
```javascript
// 获取根元素
const root = document.documentElement;

// 获取按钮元素
const changeColorBtn = document.getElementById('changeColorBtn');
const changeSizeBtn = document.getElementById('changeSizeBtn');

// 改变颜色按钮点击事件
changeColorBtn.addEventListener('click', () => {
  // 随机生成颜色
  const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
  // 设置变量
  root.style.setProperty('--box-color', randomColor);
});

// 改变大小按钮点击事件
changeSizeBtn.addEventListener('click', () => {
  // 随机生成大小
  const randomSize = Math.floor(Math.random() * 200) + 100;
  // 设置变量
  root.style.setProperty('--box-size', randomSize + 'px');
});
```
:::

```javascript
// 获取根元素
const root = document.documentElement;

// 设置变量
root.style.setProperty('--primary-color', '#e74c3c');

// 获取变量值
const primaryColor = getComputedStyle(root).getPropertyValue('--primary-color');
```

### 2. 变量与响应式设计
结合媒体查询，可以根据不同屏幕尺寸修改变量值。

::: normal-demo
```html
<div class="responsive-demo">
  <h3>响应式变量示例</h3>
  <p>调整浏览器窗口大小，查看文本大小和布局变化</p>
  <div class="grid-container">
    <div class="item">项目 1</div>
    <div class="item">项目 2</div>
    <div class="item">项目 3</div>
  </div>
</div>
```
```css
:root {
  --font-size: 14px;
  --grid-columns: 1fr;
  --gap: 10px;
  --padding: 15px;
}

@media (min-width: 576px) {
  :root {
    --font-size: 16px;
    --grid-columns: repeat(2, 1fr);
  }
}

@media (min-width: 768px) {
  :root {
    --font-size: 18px;
    --grid-columns: repeat(3, 1fr);
    --gap: 15px;
    --padding: 20px;
  }
}

.responsive-demo {
  font-size: var(--font-size);
  padding: var(--padding);
  background-color: #f0f0f0;
  border-radius: 4px;
}

.grid-container {
  display: grid;
  grid-template-columns: var(--grid-columns);
  gap: var(--gap);
  margin-top: 20px;
}

.item {
  background-color: #3498db;
  color: white;
  padding: var(--padding);
  border-radius: 4px;
  text-align: center;
}
```
:::

```css
:root {
  --font-size: 16px;
  --column-width: 1fr;
}

@media (min-width: 768px) {
  :root {
    --font-size: 18px;
    --column-width: 2fr;
  }
}

.container {
  font-size: var(--font-size);
  grid-template-columns: var(--column-width) 1fr;
}
```

### 3. 变量与计算
可以结合 `calc()` 函数使用变量进行计算。

```css
:root {
  --base-font-size: 16px;
  --spacing-unit: 8px;
}

.element {
  font-size: calc(var(--base-font-size) * 1.2);
  margin-bottom: calc(var(--spacing-unit) * 2);
  width: calc(100% - var(--spacing-unit) * 4);
}
```

### 4. 变量与渐变
```css
:root {
  --start-color: #3498db;
  --end-color: #2ecc71;
}

.element {
  background-image: linear-gradient(to right, var(--start-color), var(--end-color));
}
```

### 5. 变量与动画

::: normal-demo
```html
<div class="animation-demo">
  <h3>变量与动画示例</h3>
  <div class="animated-box"></div>
  <div class="controls">
    <label>持续时间:
      <input type="range" id="durationRange" min="0.1" max="3" step="0.1" value="1">
      <span id="durationValue">1s</span>
    </label>
    <label>延迟时间:
      <input type="range" id="delayRange" min="0" max="2" step="0.1" value="0.5">
      <span id="delayValue">0.5s</span>
    </label>
  </div>
</div>
```
```css
:root {
  --animation-duration: 1s;
  --animation-delay: 0.5s;
  --animation-color: #3498db;
  --box-size: 150px;
}

.animation-demo {
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 4px;
}

.animated-box {
  width: var(--box-size);
  height: var(--box-size);
  background-color: var(--animation-color);
  margin: 20px 0;
  border-radius: 4px;
  transition: 
    transform var(--animation-duration) ease var(--animation-delay),
    background-color var(--animation-duration) ease var(--animation-delay);
}

.animated-box:hover {
  transform: scale(1.2) rotate(10deg);
  background-color: #e74c3c;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

label {
  display: flex;
  align-items: center;
  gap: 10px;
}

input[type="range"] {
  flex: 1;
}
```
```javascript
const root = document.documentElement;
const durationRange = document.getElementById('durationRange');
const durationValue = document.getElementById('durationValue');
const delayRange = document.getElementById('delayRange');
const delayValue = document.getElementById('delayValue');

// 更新持续时间
durationRange.addEventListener('input', () => {
  const value = durationRange.value;
  root.style.setProperty('--animation-duration', value + 's');
  durationValue.textContent = value + 's';
});

// 更新延迟时间
 delayRange.addEventListener('input', () => {
  const value = delayRange.value;
  root.style.setProperty('--animation-delay', value + 's');
  delayValue.textContent = value + 's';
});
```
:::

```css
:root {
  --animation-duration: 1s;
  --animation-delay: 0.5s;
}

.element {
  transition: transform var(--animation-duration) ease var(--animation-delay);
}

.element:hover {
  transform: scale(1.1);
}
```

### 6. 变量的类型
CSS 变量可以存储各种类型的值：

```css
:root {
  --color: #3498db;
  --length: 10px;
  --percentage: 50%;
  --number: 1.5;
  --string: "Helvetica Neue";
  --url: url("image.jpg");
  --boolean: true;
}
```

## 自定义属性类型注册
CSS 注册自定义属性允许我们指定变量的类型、初始值和继承行为。

::: normal-demo
```html
<div class="property-registration-demo">
  <h3>自定义属性类型注册示例</h3>
  <div class="box">类型安全的变量</div>
  <button id="validValueBtn">设置有效颜色</button>
  <button id="invalidValueBtn">设置无效颜色</button>
</div>
```
```css
/* 注册自定义属性 */
@property --registered-color {
  syntax: '<color>';
  inherits: false;
  initial-value: #3498db;
}

@property --registered-size {
  syntax: '<length>';
  inherits: true;
  initial-value: 150px;
}

.property-registration-demo {
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 4px;
}

.box {
  width: var(--registered-size);
  height: var(--registered-size);
  background-color: var(--registered-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  border-radius: 4px;
  transition: all 0.3s ease;
}

button {
  padding: 8px 16px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  background-color: #2ecc71;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #27ae60;
}
```
```javascript
const root = document.documentElement;
const validValueBtn = document.getElementById('validValueBtn');
const invalidValueBtn = document.getElementById('invalidValueBtn');

// 设置有效颜色
validValueBtn.addEventListener('click', () => {
  // 有效的颜色值
  root.style.setProperty('--registered-color', '#e74c3c');
});

// 设置无效颜色
invalidValueBtn.addEventListener('click', () => {
  // 无效的颜色值（不是有效的颜色格式）
  root.style.setProperty('--registered-color', '123456');
  // 由于类型限制，这个值会被忽略，保持初始值
});
```
:::

```css
/* 注册自定义属性 */
@property --primary-color {
  syntax: '<color>';
  inherits: false;
  initial-value: #3498db;
}

@property --font-size {
  syntax: '<length>';
  inherits: true;
  initial-value: 16px;
}
```

### 类型说明
- `<color>`: 颜色值
- `<length>`: 长度值（如 px, em, rem 等）
- `<percentage>`: 百分比值
- `<number>`: 数值
- `<string>`: 字符串
- `<url>`: URL 值
- `<angle>`: 角度值
- `<time>`: 时间值
- `<transform-function>`: 变换函数
- `*`: 任意类型

## 最佳实践
- 使用有意义的变量名，如 `--primary-color` 而不是 `--color1`
- 在 `:root` 中定义全局变量，便于集中管理
- 为变量添加适当的注释，说明其用途
- 对于主题相关的变量，考虑使用单独的样式表
- 结合 JavaScript 动态修改变量，实现主题切换等功能
- 使用变量简化重复的样式代码，提高可维护性
- 注册自定义属性以获得更好的浏览器支持和类型检查

### 主题切换示例

::: normal-demo
```html
<div class="theme-demo">
  <h3>主题切换示例</h3>
  <div class="card">
    <h4>主题演示卡片</h4>
    <p>这是一个使用CSS变量实现的主题切换示例</p>
  </div>
  <div class="theme-buttons">
    <button id="lightThemeBtn">浅色主题</button>
    <button id="darkThemeBtn">深色主题</button>
    <button id="colorfulThemeBtn">彩色主题</button>
  </div>
</div>
```
```css
/* 定义默认主题变量 */
:root {
  --bg-color: #ffffff;
  --text-color: #333333;
  --card-bg: #f5f5f5;
  --card-text: #333333;
  --button-bg: #3498db;
  --button-text: #ffffff;
}

/* 深色主题 */
.dark-theme {
  --bg-color: #2c3e50;
  --text-color: #ecf0f1;
  --card-bg: #34495e;
  --card-text: #ecf0f1;
  --button-bg: #2980b9;
  --button-text: #ffffff;
}

/* 彩色主题 */
.colorful-theme {
  --bg-color: #f9f7f1;
  --text-color: #2c3e50;
  --card-bg: #ffffff;
  --card-text: #e74c3c;
  --button-bg: #e74c3c;
  --button-text: #ffffff;
}

.theme-demo {
  background-color: var(--bg-color);
  color: var(--text-color);
  padding: 20px;
  border-radius: 4px;
  min-height: 300px;
  transition: all 0.3s ease;
}

.card {
  background-color: var(--card-bg);
  color: var(--card-text);
  padding: 20px;
  border-radius: 4px;
  margin: 20px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.theme-buttons {
  display: flex;
  gap: 10px;
}

button {
  background-color: var(--button-bg);
  color: var(--button-text);
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  opacity: 0.9;
}
```
```javascript
const themeDemo = document.querySelector('.theme-demo');
const lightThemeBtn = document.getElementById('lightThemeBtn');
const darkThemeBtn = document.getElementById('darkThemeBtn');
const colorfulThemeBtn = document.getElementById('colorfulThemeBtn');

// 切换到浅色主题
lightThemeBtn.addEventListener('click', () => {
  themeDemo.classList.remove('dark-theme', 'colorful-theme');
});

// 切换到深色主题
 darkThemeBtn.addEventListener('click', () => {
  themeDemo.classList.remove('colorful-theme');
  themeDemo.classList.add('dark-theme');
});

// 切换到彩色主题
colorfulThemeBtn.addEventListener('click', () => {
  themeDemo.classList.remove('dark-theme');
  themeDemo.classList.add('colorful-theme');
});
```
:::

## 练习
1. 定义并使用全局变量和局部变量
2. 实现一个使用变量的简单主题切换功能
3. 结合媒体查询和变量实现响应式设计
4. 使用变量和 `calc()` 函数进行布局计算
5. 注册自定义属性并测试其行为
6. 设计一个使用变量的复杂动画效果

通过本章节的学习，你应该掌握 CSS 变量的概念、定义和使用方法，能够利用变量简化样式代码、实现主题切换和响应式设计，提高样式的可维护性。