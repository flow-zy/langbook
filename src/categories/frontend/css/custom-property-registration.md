# 自定义属性类型注册

## 基本概念
自定义属性类型注册允许我们为CSS变量（自定义属性）指定类型、初始值和继承行为，使CSS变量更加健壮和可预测。

::: normal-demo

```html
<div class="container">
  <div class="box">这是一个使用自定义属性的元素</div>
</div>
```

```css
/* 注册自定义属性 */
@property --primary-color {
  syntax: '<color>';
  inherits: false;
  initial-value: #3498db;
}

@property --spacing {
  syntax: '<length>';
  inherits: true;
  initial-value: 1rem;FRR
}

.container {
  --spacing: 2rem; /* 覆盖继承的值 */
  padding: var(--spacing);
}

.box {
  background-color: var(--primary-color);
  color: white;
  padding: var(--spacing); /* 从父元素继承 */
  border-radius: 4px;
}
```

:::

## `@property` 规则
使用`@property`规则可以注册自定义属性并指定其行为。

### 1. 基本语法
```css
@property --custom-property-name {
  syntax: '<type>';
  inherits: <boolean>;
  initial-value: <value>;
}
```

### 2. 示例
```css
/* 注册颜色类型的自定义属性 */
@property --primary-color {
  syntax: '<color>';
  inherits: false;
  initial-value: #3498db;
}

/* 注册长度类型的自定义属性 */
@property --spacing {
  syntax: '<length>';
  inherits: true;
  initial-value: 1rem;
}

/* 使用注册后的自定义属性 */
.element {
  color: var(--primary-color);
  margin: var(--spacing);
}
```

## 语法类型 (Syntax)
`syntax`定义了自定义属性可以接受的值类型。

### 1. 基本类型
```css
@property --number {
  syntax: '<number>';
  inherits: false;
  initial-value: 1;
}

@property --length {
  syntax: '<length>';
  inherits: false;
  initial-value: 10px;
}

@property --percentage {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 50%;
}

@property --color {
  syntax: '<color>';
  inherits: false;
  initial-value: #000;
}
```

### 2. 复合类型
```css
/* 长度或百分比 */
@property --length-or-percentage {
  syntax: '<length-percentage>';
  inherits: false;
  initial-value: 10px;
}

/* 数字或长度 */
@property --number-or-length {
  syntax: '<number> | <length>';
  inherits: false;
  initial-value: 1;
}

/* 自定义语法 */
@property --custom-syntax {
  syntax: 'ray( <angle> && <color>+ )';
  inherits: false;
  initial-value: ray(0deg red);
}
```

::: normal-demo

```html
<div class="composite-example">
  <div class="length-percentage">长度/百分比示例</div>
  <div class="number-or-length">数字/长度示例</div>
</div>
```

```css
/* 注册复合类型自定义属性 */
@property --length-or-percentage {
  syntax: '<length-percentage>';
  inherits: false;
  initial-value: 10px;
}

@property --number-or-length {
  syntax: '<number> | <length>';
  inherits: false;
  initial-value: 1;
}

.length-percentage {
  width: var(--length-or-percentage);
  background-color: #f0f0f0;
  padding: 10px;
  transition: --length-or-percentage 0.5s ease;
}

.length-percentage:hover {
  --length-or-percentage: 50%;
}

.number-or-length {
  margin-top: 10px;
  font-size: calc(12px * var(--number-or-length));
  background-color: #e0e0e0;
  padding: 10px;
  transition: --number-or-length 0.5s ease;
}

.number-or-length:hover {
  --number-or-length: 1.5;
}
```

:::

### 3. 通用类型
```css
/* 任何有效CSS值 */
@property --any-value {
  syntax: '*';
  inherits: false;
  initial-value: 0;
}
```

## 继承行为 (Inherits)
`inherits`控制自定义属性是否从父元素继承值。

```css
/* 不继承 */
@property --non-inherited {
  syntax: '<color>';
  inherits: false;
  initial-value: #3498db;
}

/* 继承 */
@property --inherited {
  syntax: '<color>';
  inherits: true;
  initial-value: #3498db;
}
```

## 初始值 (Initial Value)
`initial-value`设置自定义属性的初始值。

```css
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

## 应用场景
### 1. 动画和过渡
注册类型的自定义属性可以用于动画和过渡。

::: normal-demo

```html
<div class="animation-example">
  <div class="color-transition">悬停改变颜色</div>
  <div class="width-animation">点击展开宽度</div>
</div>
```

```css
/* 注册可动画的自定义属性 */
@property --hue {
  syntax: '<number>';
  inherits: false;
  initial-value: 120;
}

@property --width {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 30%;
}

.color-transition {
  background-color: hsl(var(--hue), 100%, 50%);
  color: white;
  padding: 20px;
  margin-bottom: 20px;
  transition: --hue 0.5s ease;
}

.color-transition:hover {
  --hue: 240;
}

.width-animation {
  width: var(--width);
  background-color: #3498db;
  color: white;
  padding: 20px;
  transition: --width 0.5s ease;
}

.width-animation:active {
  --width: 80%;
}
```

:::

```css
@property --hue {
  syntax: '<number>';
  inherits: false;
  initial-value: 120;
}

.element {
  background-color: hsl(var(--hue), 100%, 50%);
  transition: --hue 0.5s ease;
}

.element:hover {
  --hue: 240;
}
```

### 2. 主题系统
自定义属性类型注册非常适合构建健壮的主题系统。

::: normal-demo
```html
<div class="theme-example">
  <div class="theme-toggle">
    <button id="light-theme">浅色主题</button>
    <button id="dark-theme">深色主题</button>
    <button id="colorful-theme">彩色主题</button>
  </div>
  <div class="card">
    <h3>主题演示卡片</h3>
    <p>这是一个使用自定义属性构建的主题系统示例。</p>
    <button class="theme-button">主题按钮</button>
  </div>
</div>
```
```css
/* 注册主题相关自定义属性 */
@property --primary-color {
  syntax: '<color>';
  inherits: false;
  initial-value: #3498db;
}

@property --secondary-color {
  syntax: '<color>';
  inherits: false;
  initial-value: #2ecc71;
}

@property --background-color {
  syntax: '<color>';
  inherits: false;
  initial-value: #ffffff;
}

@property --text-color {
  syntax: '<color>';
  inherits: false;
  initial-value: #333333;
}

@property --border-radius {
  syntax: '<length-percentage>';
  inherits: false;
  initial-value: 8px;
}

/* 基础样式 */
.theme-example {
  background-color: var(--background-color);
  color: var(--text-color);
  padding: 20px;
  min-height: 300px;
  transition: --background-color 0.3s ease, --text-color 0.3s ease;
}

.theme-toggle {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 12px;
  border: none;
  border-radius: var(--border-radius);
  background-color: var(--primary-color);
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  opacity: 0.9;
}

.card {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: var(--border-radius);
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.theme-button {
  background-color: var(--secondary-color);
  margin-top: 15px;
}

/* 深色主题样式 */
.dark-theme {
  --primary-color: #4a6fa5;
  --secondary-color: #41b883;
  --background-color: #1e1e1e;
  --text-color: #f5f5f5;
}

.dark-theme .card {
  background-color: rgba(30, 30, 30, 0.8);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

/* 彩色主题样式 */
.colorful-theme {
  --primary-color: #ff6b6b;
  --secondary-color: #4ecdc4;
  --background-color: #f7fff7;
  --text-color: #2f2f2f;
  --border-radius: 16px;
}
```
```javascript
// 主题切换功能
const themeExample = document.querySelector('.theme-example');
const lightThemeBtn = document.getElementById('light-theme');
const darkThemeBtn = document.getElementById('dark-theme');
const colorfulThemeBtn = document.getElementById('colorful-theme');

lightThemeBtn.addEventListener('click', () => {
  themeExample.classList.remove('dark-theme', 'colorful-theme');
});

darkThemeBtn.addEventListener('click', () => {
  themeExample.classList.add('dark-theme');
  themeExample.classList.remove('colorful-theme');
});

colorfulThemeBtn.addEventListener('click', () => {
  themeExample.classList.add('colorful-theme');
  themeExample.classList.remove('dark-theme');
});
```
:::

### 3. 自定义属性与CSS函数结合
自定义属性可以与各种CSS函数结合使用，创建更灵活的样式。

::: normal-demo
```html
<div class="function-combination">
  <div class="gradient-box">渐变背景示例</div>
  <div class="transform-box">变换示例</div>
</div>
```
```css
/* 注册用于函数组合的自定义属性 */
@property --gradient-hue {
  syntax: '<number>';
  inherits: false;
  initial-value: 120;
}

@property --gradient-saturation {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 70%;
}

@property --rotate-angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

@property --scale-factor {
  syntax: '<number>';
  inherits: false;
  initial-value: 1;
}

.gradient-box {
  background: linear-gradient(
    45deg,
    hsl(var(--gradient-hue), var(--gradient-saturation), 50%),
    hsl(calc(var(--gradient-hue) + 180), var(--gradient-saturation), 50%)
  );
  color: white;
  padding: 30px;
  margin-bottom: 20px;
  border-radius: 8px;
  transition: --gradient-hue 0.5s ease, --gradient-saturation 0.5s ease;
}

.gradient-box:hover {
  --gradient-hue: 240;
  --gradient-saturation: 90%;
}

.transform-box {
  background-color: #3498db;
  color: white;
  padding: 30px;
  border-radius: 8px;
  transform: rotate(var(--rotate-angle)) scale(var(--scale-factor));
  transition: --rotate-angle 0.5s ease, --scale-factor 0.5s ease;
}

.transform-box:hover {
  --rotate-angle: 5deg;
  --scale-factor: 1.05;
}
```
:::

## 高级应用

### 1. 动态计算的自定义属性
可以使用JavaScript动态计算和更新自定义属性值。

::: normal-demo
```html
<div class="dynamic-calculation">
  <div class="slider-container">
    <label for="hue-slider">色相:</label>
    <input type="range" id="hue-slider" min="0" max="360" value="120">
    <span id="hue-value">120</span>
  </div>
  <div class="color-box">动态颜色</div>
</div>
```
```css
/* 注册用于动态计算的自定义属性 */
@property --dynamic-hue {
  syntax: '<number>';
  inherits: false;
  initial-value: 120;
}

@property --dynamic-saturation {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 70%;
}

@property --dynamic-lightness {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 50%;
}

.color-box {
  background-color: hsl(var(--dynamic-hue), var(--dynamic-saturation), var(--dynamic-lightness));
  color: white;
  padding: 40px;
  margin-top: 20px;
  border-radius: 8px;
  text-align: center;
  font-size: 1.2rem;
  transition: background-color 0.3s ease;
}

.slider-container {
  margin-bottom: 10px;
}
```
```javascript
// 动态计算自定义属性值
const hueSlider = document.getElementById('hue-slider');
const hueValue = document.getElementById('hue-value');
const colorBox = document.querySelector('.color-box');

// 更新显示的色相值
const updateHueValue = () => {
  hueValue.textContent = hueSlider.value;
};

// 更新自定义属性
const updateCustomProperty = () => {
  const hue = parseInt(hueSlider.value);
  // 根据色相动态计算饱和度和亮度
  const saturation = 70 + Math.sin(hue * Math.PI / 180) * 20 + '%';
  const lightness = 50 + Math.cos(hue * Math.PI / 180) * 15 + '%';
  
  colorBox.style.setProperty('--dynamic-hue', hue);
  colorBox.style.setProperty('--dynamic-saturation', saturation);
  colorBox.style.setProperty('--dynamic-lightness', lightness);
};

// 初始化
updateHueValue();
updateCustomProperty();

// 监听滑块变化
 hueSlider.addEventListener('input', () => {
  updateHueValue();
  updateCustomProperty();
});
```
:::

### 2. 自定义属性的媒体查询响应
结合媒体查询和自定义属性，可以创建更灵活的响应式设计。

::: normal-demo
```html
<div class="media-query-example">
  <div class="responsive-box">响应式自定义属性</div>
</div>
```
```css
/* 注册响应式自定义属性 */
@property --responsive-padding {
  syntax: '<length>';
  inherits: false;
  initial-value: 1rem;
}

@property --responsive-font-size {
  syntax: '<length>';
  inherits: false;
  initial-value: 16px;
}

@property --responsive-color {
  syntax: '<color>';
  inherits: false;
  initial-value: #3498db;
}

.responsive-box {
  padding: var(--responsive-padding);
  font-size: var(--responsive-font-size);
  background-color: var(--responsive-color);
  color: white;
  border-radius: 8px;
  transition: all 0.3s ease;
}

/* 媒体查询响应 */
@media (min-width: 600px) {
  .media-query-example {
    --responsive-padding: 2rem;
    --responsive-font-size: 1.2rem;
  }
}

@media (min-width: 900px) {
  .media-query-example {
    --responsive-padding: 3rem;
    --responsive-font-size: 1.5rem;
    --responsive-color: #2ecc71;
  }
}
```
:::

## 最佳实践

1. **明确类型定义**：为自定义属性指定明确的类型，提高代码可读性和可维护性
2. **合理设置继承**：根据需要决定自定义属性是否应该继承
3. **提供初始值**：始终为自定义属性提供初始值，确保样式的健壮性
4. **用于动画效果**：利用类型注册的自定义属性创建更丰富的动画和过渡效果
5. **构建主题系统**：使用自定义属性类型注册构建灵活、可切换的主题系统
6. **结合JavaScript**：利用JavaScript动态更新自定义属性，创建交互性更强的界面

## 练习

1. 创建一个使用自定义属性类型注册的主题切换系统
2. 实现一个使用自定义属性的动态颜色生成器
3. 构建一个结合容器查询和自定义属性的响应式组件
4. 尝试使用自定义属性创建复杂的动画效果
5. 比较注册和未注册的自定义属性在动画和过渡中的区别

通过本章节的学习，你应该掌握自定义属性类型注册的概念、用法和最佳实践，能够利用它创建更加健壮、灵活和可维护的CSS代码。
```css
@property --primary {
  syntax: '<color>';
  inherits: false;
  initial-value: #3498db;
}

@property --secondary {
  syntax: '<color>';
  inherits: false;
  initial-value: #2ecc71;
}

/* 深色主题 */
.dark-theme {
  --primary: #9b59b6;
  --secondary: #1abc9c;
}

/* 使用主题颜色 */
.button {
  background-color: var(--primary);
  color: white;
  border: 1px solid var(--secondary);
}
```

### 3. 约束值范围
```css
@property --progress {
  syntax: '<number>';
  inherits: false;
  initial-value: 0;
}

.progress-bar {
  width: calc(var(--progress) * 1%);
  transition: --progress 0.5s ease;
}

/* 确保进度值在0-100之间 */
.progress-bar {
  --progress: clamp(0, var(--progress), 100);
}
```

## 最佳实践
- 始终为自定义属性注册类型，提高代码的可预测性
- 为自定义属性设置合理的初始值
- 明确指定继承行为
- 使用有意义的自定义属性名称
- 结合CSS变量和`@property`规则创建健壮的主题系统
- 利用类型注册实现更复杂的动画和过渡效果
- 注意浏览器兼容性，提供降级方案
- 避免过度使用自定义属性，保持代码简洁

## 练习
1. 注册不同类型的自定义属性
2. 使用注册的自定义属性创建动画效果
3. 实现一个基于自定义属性的主题系统
4. 使用自定义属性约束值范围
5. 结合`@property`和CSS变量创建响应式设计
6. 测试自定义属性在不同浏览器上的兼容性
7. 创建一个使用自定义属性类型注册的组件

通过本章节的学习，你应该掌握CSS中自定义属性类型注册的技术，能够使用`@property`规则定义类型安全的CSS变量，创建更加健壮和可维护的CSS代码。