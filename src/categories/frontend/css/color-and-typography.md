# 颜色与字体

## 现代颜色体系
CSS 提供了多种表示颜色的方式，从基本的颜色名称到先进的颜色函数。

::: normal-demo
```html
<div class="color-representation-demo">
  <div class="color-box color-name">颜色名称</div>
  <div class="color-box hex">十六进制</div>
  <div class="color-box rgb">RGB</div>
  <div class="color-box rgba">RGBA</div>
  <div class="color-box hsl">HSL</div>
  <div class="color-box hsla">HSLA</div>
  <div class="color-box color-mix">color-mix</div>
  <div class="color-box lab">LAB</div>
</div>
```
```css
.color-representation-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.color-box {
  width: 150px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  text-shadow: 0 1px 1px rgba(0,0,0,0.5);
  border-radius: 5px;
}

.color-name {
  background-color: tomato;
}

.hex {
  background-color: #4169e1;
}

.rgb {
  background-color: rgb(255, 165, 0);
}

.rgba {
  background-color: rgba(75, 0, 130, 0.7);
}

.hsl {
  background-color: hsl(120, 100%, 25%);
}

.hsla {
  background-color: hsla(180, 100%, 50%, 0.6);
}

.color-mix {
  background-color: color-mix(in srgb, blue 50%, red 50%);
}

.lab {
  background-color: lab(50% 50 50);
}
```
:::

### 1. 颜色表示方法

#### 颜色名称
CSS 定义了 140 多种颜色名称。

```css
.element {
  color: red;
  background-color: blue;
  border-color: green;
}
```

#### 十六进制表示法
使用 `#` 后跟 6 位十六进制数（0-9, A-F）表示颜色。

```css
.element {
  color: #FF0000; /* 红色 */
  background-color: #0000FF; /* 蓝色 */
  border-color: #008000; /* 绿色 */
}

/* 简写形式（当每对值相同时） */
.element {
  color: #F00; /* 红色 */
  background-color: #00F; /* 蓝色 */
  border-color: #080; /* 绿色 */
}
```

#### RGB 表示法
使用 `rgb()` 函数表示红、绿、蓝三原色的组合。

```css
.element {
  color: rgb(255, 0, 0); /* 红色 */
  background-color: rgb(0, 0, 255); /* 蓝色 */
  border-color: rgb(0, 128, 0); /* 绿色 */
}
```

#### RGBA 表示法
在 RGB 的基础上增加了 alpha 通道，表示透明度。

```css
.element {
  color: rgba(255, 0, 0, 0.5); /* 半透明红色 */
  background-color: rgba(0, 0, 255, 0.8); /* 80% 不透明的蓝色 */
}
```

#### HSL 表示法
使用 `hsl()` 函数表示色相（Hue）、饱和度（Saturation）和亮度（Lightness）。

```css
.element {
  color: hsl(0, 100%, 50%); /* 红色 */
  background-color: hsl(240, 100%, 50%); /* 蓝色 */
  border-color: hsl(120, 100%, 25%); /* 绿色 */
}
```

#### HSLA 表示法
在 HSL 的基础上增加了 alpha 通道，表示透明度。

```css
.element {
  color: hsla(0, 100%, 50%, 0.5); /* 半透明红色 */
  background-color: hsla(240, 100%, 50%, 0.8); /* 80% 不透明的蓝色 */
}
```

#### 现代颜色函数
CSS 原生支持的颜色函数，如 `color-mix()`, `rgb()`, `hsl()`, `hwb()`, `lab()`, `lch()`, `oklab()`, `oklch()` 等。

```css
/* 混合两种颜色 */
.element {
  background-color: color-mix(in srgb, blue 50%, red 50%); /* 紫色 */
}

/* LAB 颜色空间 */
.element {
  color: lab(50% 50 50);
}

/* LCH 颜色空间 */
.element {
  background-color: lch(50% 50 270);
}
```

### 2. 颜色属性

::: normal-demo
```html
<div class="color-properties-demo">
  <div class="demo-item text-color">文本颜色</div>
  <div class="demo-item bg-color">背景颜色</div>
  <div class="demo-item border-color">边框颜色</div>
  <div class="demo-item outline-color">轮廓颜色</div>
  <div class="demo-item shadow-color">阴影颜色</div>
</div>
```
```css
.color-properties-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.demo-item {
  width: 150px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 5px;
}

.text-color {
  color: #ff0000;
  background-color: #f0f0f0;
}

.bg-color {
  background-color: #0000ff;
  color: white;
}

.border-color {
  border: 3px solid #008000;
}

.outline-color {
  outline: 3px solid #ff6600;
  outline-offset: 3px;
}

.shadow-color {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  background-color: #f0f0f0;
}
```
:::

::: normal-demo
```html
<div class="interactive-color-picker">
  <div class="controls">
    <div class="control-group">
      <label for="color-type">颜色类型:</label>
      <select id="color-type">
        <option value="hex">十六进制</option>
        <option value="rgb">RGB</option>
        <option value="rgba">RGBA</option>
        <option value="hsl">HSL</option>
        <option value="hsla">HSLA</option>
      </select>
    </div>
    <div id="hex-controls" class="control-group">
      <label for="hex-color">颜色值:</label>
      <input type="text" id="hex-color" value="#3498db">
    </div>
    <div id="rgb-controls" class="control-group hidden">
      <label>RGB:</label>
      <input type="range" id="rgb-r" min="0" max="255" value="52">
      <input type="range" id="rgb-g" min="0" max="255" value="152">
      <input type="range" id="rgb-b" min="0" max="255" value="219">
      <span id="rgb-value">rgb(52, 152, 219)</span>
    </div>
    <div id="rgba-controls" class="control-group hidden">
      <label>RGBA:</label>
      <input type="range" id="rgba-r" min="0" max="255" value="52">
      <input type="range" id="rgba-g" min="0" max="255" value="152">
      <input type="range" id="rgba-b" min="0" max="255" value="219">
      <input type="range" id="rgba-a" min="0" max="1" step="0.1" value="0.8">
      <span id="rgba-value">rgba(52, 152, 219, 0.8)</span>
    </div>
    <div id="hsl-controls" class="control-group hidden">
      <label>HSL:</label>
      <input type="range" id="hsl-h" min="0" max="360" value="200">
      <input type="range" id="hsl-s" min="0" max="100" value="70">
      <input type="range" id="hsl-l" min="0" max="100" value="53">
      <span id="hsl-value">hsl(200, 70%, 53%)</span>
    </div>
    <div id="hsla-controls" class="control-group hidden">
      <label>HSLA:</label>
      <input type="range" id="hsla-h" min="0" max="360" value="200">
      <input type="range" id="hsla-s" min="0" max="100" value="70">
      <input type="range" id="hsla-l" min="0" max="100" value="53">
      <input type="range" id="hsla-a" min="0" max="1" step="0.1" value="0.8">
      <span id="hsla-value">hsla(200, 70%, 53%, 0.8)</span>
    </div>
    <div class="control-group">
      <label for="color-property">应用属性:</label>
      <select id="color-property">
        <option value="background-color">背景颜色</option>
        <option value="color">文本颜色</option>
        <option value="border-color">边框颜色</option>
        <option value="box-shadow">盒阴影颜色</option>
      </select>
    </div>
  </div>
  <div class="preview-container">
    <div id="color-preview" class="color-preview">
      <p>颜色预览</p>
    </div>
  </div>
</div>
```
```css
.interactive-color-picker {
  padding: 20px;
  background-color: #f0f0f0;
  max-width: 800px;
  margin: 0 auto;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 30px;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.control-group label {
  min-width: 100px;
}

.control-group input[type="range"] {
  width: 80px;
}

.control-group input[type="text"] {
  width: 100px;
  padding: 5px;
}

.hidden {
  display: none;
}

.preview-container {
  display: flex;
  justify-content: center;
}

.color-preview {
  width: 200px;
  height: 200px;
  background-color: #3498db;
  border: 5px solid #333;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
}
```
```js
// 交互式颜色选择器
const colorTypeSelect = document.getElementById('color-type');
const hexColorInput = document.getElementById('hex-color');
const colorPropertySelect = document.getElementById('color-property');
const colorPreview = document.getElementById('color-preview');

// RGB 控件
const rgbRInput = document.getElementById('rgb-r');
const rgbGInput = document.getElementById('rgb-g');
const rgbBInput = document.getElementById('rgb-b');
const rgbValue = document.getElementById('rgb-value');

// RGBA 控件
const rgbaRInput = document.getElementById('rgba-r');
const rgbaGInput = document.getElementById('rgba-g');
const rgbaBInput = document.getElementById('rgba-b');
const rgbaAInput = document.getElementById('rgba-a');
const rgbaValue = document.getElementById('rgba-value');

// HSL 控件
const hslHInput = document.getElementById('hsl-h');
const hslSInput = document.getElementById('hsl-s');
const hslLInput = document.getElementById('hsl-l');
const hslValue = document.getElementById('hsl-value');

// HSLA 控件
const hslaHInput = document.getElementById('hsla-h');
const hslaSInput = document.getElementById('hsla-s');
const hslaLInput = document.getElementById('hsla-l');
const hslaAInput = document.getElementById('hsla-a');
const hslaValue = document.getElementById('hsla-value');

// 控件容器
const hexControls = document.getElementById('hex-controls');
const rgbControls = document.getElementById('rgb-controls');
const rgbaControls = document.getElementById('rgba-controls');
const hslControls = document.getElementById('hsl-controls');
const hslaControls = document.getElementById('hsla-controls');

// 显示当前选中的控件组
function showControlGroup(type) {
  [hexControls, rgbControls, rgbaControls, hslControls, hslaControls].forEach(control => {
    control.classList.add('hidden');
  });
  
  switch(type) {
    case 'hex':
      hexControls.classList.remove('hidden');
      break;
    case 'rgb':
      rgbControls.classList.remove('hidden');
      break;
    case 'rgba':
      rgbaControls.classList.remove('hidden');
      break;
    case 'hsl':
      hslControls.classList.remove('hidden');
      break;
    case 'hsla':
      hslaControls.classList.remove('hidden');
      break;
  }
}

// 更新颜色预览
function updateColorPreview() {
  const type = colorTypeSelect.value;
  const property = colorPropertySelect.value;
  let colorValue = '';

  switch(type) {
    case 'hex':
      colorValue = hexColorInput.value;
      break;
    case 'rgb':
      const r = rgbRInput.value;
      const g = rgbGInput.value;
      const b = rgbBInput.value;
      colorValue = `rgb(${r}, ${g}, ${b})`;
      rgbValue.textContent = colorValue;
      break;
    case 'rgba':
      const ra = rgbaRInput.value;
      const ga = rgbaGInput.value;
      const ba = rgbaBInput.value;
      const aa = rgbaAInput.value;
      colorValue = `rgba(${ra}, ${ga}, ${ba}, ${aa})`;
      rgbaValue.textContent = colorValue;
      break;
    case 'hsl':
      const h = hslHInput.value;
      const s = hslSInput.value;
      const l = hslLInput.value;
      colorValue = `hsl(${h}, ${s}%, ${l}%)`;
      hslValue.textContent = colorValue;
      break;
    case 'hsla':
      const ha = hslaHInput.value;
      const sa = hslaSInput.value;
      const la = hslaLInput.value;
      const aa2 = hslaAInput.value;
      colorValue = `hsla(${ha}, ${sa}%, ${la}%, ${aa2})`;
      hslaValue.textContent = colorValue;
      break;
  }

  // 应用颜色到不同属性
  if (property === 'box-shadow') {
    colorPreview.style.boxShadow = `0 10px 20px ${colorValue}`;
  } else {
    colorPreview.style.boxShadow = 'none';
    colorPreview.style[property] = colorValue;
  }
}

// 初始化
showControlGroup(colorTypeSelect.value);
updateColorPreview();

// 添加事件监听器
colorTypeSelect.addEventListener('change', () => {
  showControlGroup(colorTypeSelect.value);
  updateColorPreview();
});

hexColorInput.addEventListener('input', updateColorPreview);
colorPropertySelect.addEventListener('change', updateColorPreview);

// RGB 事件监听器
[rgbRInput, rgbGInput, rgbBInput].forEach(input => {
  input.addEventListener('input', updateColorPreview);
});

// RGBA 事件监听器
[rgbaRInput, rgbaGInput, rgbaBInput, rgbaAInput].forEach(input => {
  input.addEventListener('input', updateColorPreview);
});

// HSL 事件监听器
[hslHInput, hslSInput, hslLInput].forEach(input => {
  input.addEventListener('input', updateColorPreview);
});

// HSLA 事件监听器
[hslaHInput, hslaSInput, hslaLInput, hslaAInput].forEach(input => {
  input.addEventListener('input', updateColorPreview);
});
```
:::

::: normal-demo
```html
<div class="gradient-demo">
  <div class="demo-item linear-gradient">线性渐变</div>
  <div class="demo-item radial-gradient">径向渐变</div>
  <div class="demo-item conic-gradient">圆锥渐变</div>
  <div class="demo-item repeating-gradient">重复渐变</div>
</div>
```
```css
.gradient-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 40px;
}

.demo-item {
  width: 200px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  text-shadow: 0 1px 1px rgba(0,0,0,0.5);
  border-radius: 5px;
}

.linear-gradient {
  background: linear-gradient(45deg, #3498db, #e74c3c);
}

.radial-gradient {
  background: radial-gradient(circle at center, #3498db, #2c3e50);
}

.conic-gradient {
  background: conic-gradient(from 90deg, #3498db, #e74c3c, #2ecc71, #f1c40f, #3498db);
}

.repeating-gradient {
  background: repeating-linear-gradient(45deg, #3498db, #3498db 10px, #2980b9 10px, #2980b9 20px);
}
```
:::


```css
/* 文本颜色 */
.element {
  color: #333;
}

/* 背景颜色 */
.element {
  background-color: #f5f5f5;
}

/* 边框颜色 */
.element {
  border-color: #ddd;
}

/* 轮廓颜色 */
.element {
  outline-color: #f00;
}

/* 阴影颜色 */
.element {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}
```

## 字体与排版

### 1. 字体属性

::: normal-demo
```html
<div class="font-properties-demo">
  <div class="demo-item font-family">
    <p>字体系列</p>
    <p class="serif">衬线字体</p>
    <p class="sans-serif">无衬线字体</p>
    <p class="monospace">等宽字体</p>
  </div>
  <div class="demo-item font-size">
    <p>字体大小</p>
    <p class="small">小字体</p>
    <p class="medium">中字体</p>
    <p class="large">大字体</p>
  </div>
  <div class="demo-item font-weight">
    <p>字体粗细</p>
    <p class="normal">正常</p>
    <p class="bold">粗体</p>
    <p class="bolder">更粗</p>
    <p class="w100">100</p>
    <p class="w300">300</p>
    <p class="w500">500</p>
    <p class="w700">700</p>
    <p class="w900">900</p>
  </div>
  <div class="demo-item font-style">
    <p>字体样式</p>
    <p class="normal-style">正常</p>
    <p class="italic">斜体</p>
    <p class="oblique">倾斜</p>
  </div>
  <div class="demo-item line-height">
    <p>行高</p>
    <p class="line-height-1">行高 1</p>
    <p class="line-height-1-5">行高 1.5</p>
    <p class="line-height-2">行高 2</p>
  </div>
  <div class="demo-item letter-spacing">
    <p>字间距</p>
    <p class="normal-spacing">正常间距</p>
    <p class="tight-spacing">紧密间距</p>
    <p class="loose-spacing">宽松间距</p>
  </div>
  <div class="demo-item text-transform">
    <p>文本转换</p>
    <p class="lowercase">lowercase</p>
    <p class="uppercase">uppercase</p>
    <p class="capitalize">capitalize</p>
  </div>
  <div class="demo-item text-decoration">
    <p>文本装饰</p>
    <p class="underline">下划线</p>
    <p class="overline">上划线</p>
    <p class="line-through">删除线</p>
    <p class="wavy-underline">波浪下划线</p>
  </div>
</div>
```
```css
.font-properties-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.demo-item {
  width: 200px;
  padding: 15px;
  background-color: #f0f0f0;
  border-radius: 5px;
}

.serif {
  font-family: "Times New Roman", serif;
}

.sans-serif {
  font-family: Arial, sans-serif;
}

.monospace {
  font-family: "Courier New", monospace;
}

.small {
  font-size: 12px;
}

.medium {
  font-size: 16px;
}

.large {
  font-size: 24px;
}

.normal {
  font-weight: normal;
}

.bold {
  font-weight: bold;
}

.bolder {
  font-weight: bolder;
}

.w100 {
  font-weight: 100;
}

.w300 {
  font-weight: 300;
}

.w500 {
  font-weight: 500;
}

.w700 {
  font-weight: 700;
}

.w900 {
  font-weight: 900;
}

.normal-style {
  font-style: normal;
}

.italic {
  font-style: italic;
}

.oblique {
  font-style: oblique;
}

.line-height-1 {
  line-height: 1;
}

.line-height-1-5 {
  line-height: 1.5;
}

.line-height-2 {
  line-height: 2;
}

.normal-spacing {
  letter-spacing: normal;
}

.tight-spacing {
  letter-spacing: -0.5px;
}

.loose-spacing {
  letter-spacing: 2px;
}

.lowercase {
  text-transform: lowercase;
}

.uppercase {
  text-transform: uppercase;
}

.capitalize {
  text-transform: capitalize;
}

.underline {
  text-decoration: underline;
}

.overline {
  text-decoration: overline;
}

.line-through {
  text-decoration: line-through;
}

.wavy-underline {
  text-decoration: underline wavy #3498db;
}
```
:::

### 2. 字体加载策略

::: normal-demo
```html
<div class="font-loading-demo">
  <h3>字体加载示例</h3>
  <p class="system-font">系统字体 (立即加载)</p>
  <p class="web-font">Web 字体 (可能有延迟)</p>
  <p class="fallback-font">带回退的 Web 字体</p>
  <div class="status">
    <p id="font-status">字体加载状态: 等待加载...</p>
  </div>
</div>
```
```css
/* 定义字体 */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  src: url('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2') format('woff2');
  font-display: swap;
}

.font-loading-demo {
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 5px;
  max-width: 600px;
  margin: 0 auto;
}

.system-font {
  font-family: Arial, sans-serif;
  font-size: 18px;
}

.web-font {
  font-family: 'Inter', sans-serif;
  font-size: 18px;
}

.fallback-font {
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  font-size: 18px;
}

.status {
  margin-top: 20px;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
}
```
```js
// 检测字体是否加载完成
function checkFontLoading() {
  const statusElement = document.getElementById('font-status');
  const testElement = document.createElement('div');
  testElement.style.position = 'absolute';
  testElement.style.visibility = 'hidden';
  testElement.style.fontFamily = 'Inter, sans-serif';
  testElement.style.fontSize = '20px';
  document.body.appendChild(testElement);

  // 使用 FontFaceSet API 检测字体加载
  if ('fonts' in document) {
    document.fonts.load('1em Inter').then(() => {
      statusElement.textContent = '字体加载状态: Inter 字体已加载完成';
      document.body.removeChild(testElement);
    }).catch(() => {
      statusElement.textContent = '字体加载状态: Inter 字体加载失败';
      document.body.removeChild(testElement);
    });
  } else {
    // 回退方案
    setTimeout(() => {
      statusElement.textContent = '字体加载状态: 无法检测 (浏览器不支持 FontFaceSet)';
      document.body.removeChild(testElement);
    }, 2000);
  }
}

// 页面加载完成后检测字体
window.addEventListener('load', checkFontLoading);
```
:::

### 3. 响应式排版

::: normal-demo
```html
<div class="responsive-typography-demo">
  <h1>响应式标题</h1>
  <p>这是一个使用 clamp() 函数的响应式段落文本，会根据屏幕尺寸自动调整大小。</p>
  <div class="control-group">
    <label for="screen-size">模拟屏幕尺寸:</label>
    <input type="range" id="screen-size" min="320" max="1200" value="1200">
    <span id="size-value">1200px</span>
  </div>
  <div class="preview" id="preview">
    <h1>响应式标题预览</h1>
    <p>这是预览文本，展示 clamp() 函数的效果。在小屏幕上文字会变小，大屏幕上会变大，但不会超出指定的最小值和最大值。</p>
  </div>
</div>
```
```css
.responsive-typography-demo {
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 5px;
  max-width: 800px;
  margin: 0 auto;
}

.responsive-typography-demo h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
}

.responsive-typography-demo p {
  font-size: clamp(1rem, 2vw, 1.25rem);
}

.control-group {
  margin: 20px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.control-group input[type="range"] {
  flex: 1;
}

.preview {
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.preview h1 {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
}

.preview p {
  font-size: clamp(0.875rem, 1.5vw, 1.125rem);
}
```
```js
// 响应式排版演示
const screenSizeInput = document.getElementById('screen-size');
const sizeValue = document.getElementById('size-value');
const preview = document.getElementById('preview');

function updatePreview() {
  const size = screenSizeInput.value;
  sizeValue.textContent = `${size}px`;
  preview.style.width = `${size}px`;
}

// 初始化
updatePreview();

// 添加事件监听器
screenSizeInput.addEventListener('input', updatePreview);
```
:::

## 排版最佳实践

### 1. 可访问性排版

- 确保文本与背景有足够的对比度（至少 4.5:1）
- 使用相对单位（rem, em, vh, vw）而不是固定像素
- 为不同文本类型建立清晰的层次结构
- 避免使用过小的字体大小
- 提供足够的行高和字间距

::: normal-demo
```html
<div class="accessibility-demo">
  <div class="good-contrast">
    <h3>良好对比度</h3>
    <p>这段文字与背景有良好的对比度，易于阅读。</p>
  </div>
  <div class="poor-contrast">
    <h3>较差对比度</h3>
    <p>这段文字与背景对比度不足，阅读困难。</p>
  </div>
  <div class="hierarchy">
    <h1>主标题</h1>
    <h2>副标题</h2>
    <p>正文文本</p>
    <p class="small-text">辅助文本</p>
  </div>
</div>
```
```css
.accessibility-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  background-color: #f0f0f0;
}

.accessibility-demo > div {
  flex: 1;
  min-width: 300px;
  padding: 20px;
  border-radius: 5px;
}

.good-contrast {
  background-color: white;
  color: #333;
}

.poor-contrast {
  background-color: #f0f0f0;
  color: #777;
}

.hierarchy h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.hierarchy h2 {
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
}

.hierarchy p {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.small-text {
  font-size: 0.875rem;
  color: #666;
}
```
:::

### 2. 性能优化

- 使用现代字体格式（WOFF2）
- 限制字体变体数量
- 实现适当的字体加载策略（如 font-display: swap）
- 考虑使用系统字体栈作为回退

```css
/* 优化的字体栈 */
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
```

## 练习

1. 创建一个交互式颜色选择器，支持多种颜色格式。
2. 实现一个使用渐变背景的卡片组件。
3. 设计一个响应式排版系统，使用 clamp() 函数。
4. 为网页添加自定义字体，并实现适当的加载策略。
5. 分析一个网站的排版层次结构，并提出改进建议。

.sans-serif {
  font-family: Arial, sans-serif;
}

.monospace {
  font-family: "Courier New", monospace;
}

.small {
  font-size: 12px;
}

.medium {
  font-size: 16px;
}

.large {
  font-size: 24px;
}

.normal {
  font-weight: normal;
}

.bold {
  font-weight: bold;
}

.bolder {
  font-weight: 900;
}

.normal-style {
  font-style: normal;
}

.italic {
  font-style: italic;
}

.oblique {
  font-style: oblique;
}
```
:::

#### 字体系列
```css
.element {
  font-family: "Helvetica Neue", Arial, sans-serif;
}
```

#### 字体大小
```css
.element {
  font-size: 16px;
  font-size: 1rem; /* 相对于根元素的字体大小 */
  font-size: 100%; /* 相对于父元素的字体大小 */
}
```

#### 字体粗细
```css
.element {
  font-weight: normal; /* 400 */
  font-weight: bold; /* 700 */
  font-weight: 600; /* 数值表示 */
}
```

#### 字体样式
```css
.element {
  font-style: normal;
  font-style: italic;
  font-style: oblique;
}
```

#### 字体变体
```css
.element {
  font-variant: normal;
  font-variant: small-caps; /* 小型大写字母 */
}
```

#### 行高
```css
.element {
  line-height: 1.5; /* 无单位值，推荐使用 */
  line-height: 24px;
  line-height: 150%;
}
```

#### 简写形式
```css
.element {
  font: italic small-caps bold 16px/1.5 "Helvetica Neue", Arial, sans-serif;
}
```

### 2. 文本属性

::: normal-demo
```html
<div class="text-properties-demo">
  <div class="demo-item text-align">
    <p class="left">左对齐</p>
    <p class="center">居中对齐</p>
    <p class="right">右对齐</p>
    <p class="justify">两端对齐文本示例，这里有足够多的文字以展示两端对齐的效果。这是一个演示文本，用于测试CSS中的text-align属性。</p>
  </div>
  <div class="demo-item text-decoration">
    <p class="none">无装饰</p>
    <p class="underline">下划线</p>
    <p class="line-through">删除线</p>
    <p class="overline">上划线</p>
    <p class="wavy">波浪线</p>
  </div>
  <div class="demo-item text-transform">
    <p class="lowercase">lowercase</p>
    <p class="uppercase">uppercase</p>
    <p class="capitalize">capitalize</p>
  </div>
  <div class="demo-item letter-spacing">
    <p class="normal-spacing">正常间距</p>
    <p class="wide-spacing">宽间距</p>
    <p class="narrow-spacing">窄间距</p>
  </div>
</div>
```
```css
.text-properties-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.demo-item {
  width: 200px;
  padding: 15px;
  background-color: #f0f0f0;
  border-radius: 5px;
}

.left {
  text-align: left;
}

.center {
  text-align: center;
}

.right {
  text-align: right;
}

.justify {
  text-align: justify;
}

.none {
  text-decoration: none;
}

.underline {
  text-decoration: underline;
}

.line-through {
  text-decoration: line-through;
}

.overline {
  text-decoration: overline;
}

.wavy {
  text-decoration: underline wavy red;
}

.lowercase {
  text-transform: lowercase;
}

.uppercase {
  text-transform: uppercase;
}

.capitalize {
  text-transform: capitalize;
}

.normal-spacing {
  letter-spacing: normal;
}

.wide-spacing {
  letter-spacing: 3px;
}

.narrow-spacing {
  letter-spacing: -1px;
}
```
:::

#### 文本对齐
```css
.element {
  text-align: left;
  text-align: center;
  text-align: right;
  text-align: justify;
}
```

#### 文本装饰
```css
.element {
  text-decoration: none;
  text-decoration: underline;
  text-decoration: line-through;
  text-decoration: overline;
  text-decoration: underline wavy red;
}
```

#### 文本转换
```css
.element {
  text-transform: none;
  text-transform: uppercase;
  text-transform: lowercase;
  text-transform: capitalize;
}
```

#### 文本缩进
```css
.element {
  text-indent: 2em;
}
```

#### 字母间距和单词间距
```css
.element {
  letter-spacing: 1px;
  word-spacing: 5px;
}
```

### 3. 排版进阶

::: normal-demo
```html
<div class="typography-advanced-demo">
  <div class="demo-item responsive-font">
    <h3>响应式字体</h3>
    <p class="clamp-text">使用clamp()函数实现的响应式字体，会根据视口大小自动调整。</p>
  </div>
  <div class="demo-item text-wrap">
    <h3>文本换行</h3>
    <p class="balance">平衡换行：这是一个展示text-wrap: balance属性的示例文本，它会尽量使各行长度均等。</p>
    <p class="pretty">美化换行：这是一个展示text-wrap: pretty属性的示例文本，它会优先在标点符号处换行，使文本更加美观。</p>
    <p class="nowrap">不换行：这是一个展示text-wrap: nowrap属性的示例文本，它不会自动换行，可能会溢出容器。</p>
    <p class="wrap">允许换行：这是一个展示text-wrap: wrap属性的示例文本，它会在容器边界处自动换行，必要时在单词内换行。</p>
  </div>
</div>
```
```css
.typography-advanced-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.demo-item {
  width: 300px;
  padding: 15px;
  background-color: #f0f0f0;
  border-radius: 5px;
}

.clamp-text {
  font-size: clamp(1rem, 2vw, 1.5rem);
}

.balance {
  text-wrap: balance;
}

.pretty {
  text-wrap: pretty;
}

.nowrap {
  text-wrap: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border: 1px solid #ddd;
  padding: 5px;
}

.wrap {
  text-wrap: wrap;
  border: 1px solid #ddd;
  padding: 5px;
}
```
:::

#### 字体加载策略
```css
/* 预加载字体 */
@font-face {
  font-family: "MyFont";
  src: url("myfont.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

.element {
  font-family: "MyFont", sans-serif;
}
```

#### 响应式字体
```css
/* 使用 clamp() 函数实现响应式字体 */
.element {
  font-size: clamp(1rem, 2vw, 1.5rem);
}
```

#### 字体最佳实践
- 限制字体数量（通常不超过3种）
- 为每个字体定义回退字体
- 使用相对单位（rem, em）而非绝对单位（px）
- 确保文本与背景的对比度符合可访问性标准（至少 4.5:1）
- 为长文本设置合适的行高（通常 1.5-1.6）

#### 文本换行与截断

CSS 提供了多种属性来控制文本的换行方式和截断行为，这些属性对于创建美观且易读的文本布局非常重要。

##### text-wrap
控制文本换行的方式。
```css
/* 平衡文本换行，使各行长度尽可能均等 */
element {
  text-wrap: balance;
}

/* 美化文本换行，优先在标点符号处换行 */
element {
  text-wrap: pretty;
}

/* 默认值，简单地在容器边界处换行 */
element {
  text-wrap: nowrap;
}

/* 允许在单词内换行 */
element {
  text-wrap: wrap;
}
```

##### hyphens
控制是否使用连字符连接单词以实现更好的换行效果。
```css
/* 自动决定是否使用连字符 */
element {
  hyphens: auto;
}

/* 仅在单词中明确指定的位置使用连字符 */
element {
  hyphens: manual;
}

/* 不使用连字符 */
element {
  hyphens: none;
}
```

##### word-break
控制单词如何被拆分换行。
```css
/* 仅在单词之间的空格或连字符处换行 */
element {
  word-break: normal;
}

/* 允许在单词内任意位置换行（主要用于非拉丁文字） */
element {
  word-break: break-all;
}

/* 仅在单词的断点处换行 */
element {
  word-break: keep-all;
}
```

##### line-clamp
限制文本显示的行数，并在末尾添加省略号。
```css
/* 限制显示3行文本，超出部分显示省略号 */
element {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

## 练习
1. 使用不同的颜色表示方法设置元素的颜色
2. 尝试使用现代颜色函数创建自定义颜色
3. 设置文本的字体、大小、粗细、样式等属性
4. 创建一个响应式字体方案
5. 设计一个具有良好排版的页面
6. 确保文本的对比度符合可访问性标准

### 示例代码

::: normal-demo 颜色表示方法示例
```html
<div class="color-demo">
  <div class="color-name">颜色名称</div>
  <div class="color-hex">十六进制</div>
  <div class="color-rgb">RGB</div>
  <div class="color-rgba">RGBA</div>
  <div class="color-hsl">HSL</div>
  <div class="color-hsla">HSLA</div>
</div>
```
```css
.color-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.color-demo > div {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.color-name {
  background-color: tomato;
}

.color-hex {
  background-color: #4CAF50;
}

.color-rgb {
  background-color: rgb(255, 165, 0);
}

.color-rgba {
  background-color: rgba(0, 0, 255, 0.7);
}

.color-hsl {
  background-color: hsl(240, 100%, 70%);
}

.color-hsla {
  background-color: hsla(0, 100%, 50%, 0.5);
}
```
:::

::: normal-demo 字体属性示例
```html
<div class="font-demo">
  <p class="font-family">不同字体系列</p>
  <p class="font-size">不同字体大小</p>
  <p class="font-weight">不同字体粗细</p>
  <p class="font-style">不同字体样式</p>
  <p class="font-variant">不同字体变体</p>
</div>
```
```css
.font-demo {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.font-family {
  font-family: "Arial", sans-serif;
}

.font-size {
  font-size: 1.5rem;
}

.font-weight {
  font-weight: bold;
}

.font-style {
  font-style: italic;
}

.font-variant {
  font-variant: small-caps;
}
```
:::

::: normal-demo 响应式字体方案
```html
<div class="responsive-font-demo">
  <h1>响应式标题</h1>
  <p>这是一段响应式文本，字体大小会根据视口宽度自动调整。</p>
</div>
```
```css
.responsive-font-demo h1 {
  font-size: clamp(1.5rem, 5vw, 3rem);
}

.responsive-font-demo p {
  font-size: clamp(1rem, 2vw, 1.25rem);
  line-height: 1.6;
}
```
:::

::: normal-demo 良好排版设计
```html
<div class="typography-demo">
  <h1>标题层级示例</h1>
  <h2>二级标题</h2>
  <p>这是一段正文文本，展示了良好的行高和字间距。适当的行高和字间距可以提高文本的可读性。</p>
  <h3>三级标题</h3>
  <p class="highlight">这是一段突出显示的文本，使用了不同的颜色和字体粗细。</p>
  <ul>
    <li>列表项 1</li>
    <li>列表项 2</li>
    <li>列表项 3</li>
  </ul>
</div>
```
```css
.typography-demo {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.typography-demo h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.typography-demo h2 {
  font-size: 1.75rem;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.typography-demo h3 {
  font-size: 1.25rem;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.typography-demo p {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  word-spacing: 0.05em;
  letter-spacing: 0.01em;
}

.typography-demo .highlight {
  color: #3366cc;
  font-weight: 500;
}

.typography-demo ul {
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
}

.typography-demo li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}
```
:::

通过本章节的学习，你应该掌握 CSS 中的颜色表示方法和现代颜色体系，以及字体和排版的相关属性，能够创建具有良好视觉效果和可读性的文本内容。