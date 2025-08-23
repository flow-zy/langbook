# 滤镜与特效

## 滤镜 (Filters)
CSS 滤镜允许我们对元素应用各种视觉效果，如模糊、亮度调整、对比度调整等。

::: normal-demo
```html
<div class="filters-demo">
  <div class="filter-item original">原始图像</div>
  <div class="filter-item blur">模糊效果</div>
  <div class="filter-item brightness">亮度调整</div>
  <div class="filter-item contrast">对比度调整</div>
  <div class="filter-item grayscale">灰度转换</div>
  <div class="filter-item hue-rotate">色相旋转</div>
  <div class="filter-item invert">颜色反转</div>
  <div class="filter-item opacity">透明度调整</div>
  <div class="filter-item saturate">饱和度调整</div>
  <div class="filter-item drop-shadow">阴影效果</div>
  <div class="filter-item combined">组合滤镜</div>
</div>
```
```css
.filters-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.filter-item {
  width: 150px;
  height: 150px;
  background-color: #3498db;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 5px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="%23e74c3c" /><rect x="30" y="30" width="40" height="40" fill="%23f39c12" /></svg>');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 60% 60%;
  text-shadow: 0 1px 1px rgba(0,0,0,0.5);
}

.original {
  filter: none;
}

.blur {
  filter: blur(5px);
}

.brightness {
  filter: brightness(1.5);
}

.contrast {
  filter: contrast(1.5);
}

.grayscale {
  filter: grayscale(100%);
}

.hue-rotate {
  filter: hue-rotate(90deg);
}

.invert {
  filter: invert(100%);
}

.opacity {
  filter: opacity(50%);
}

.saturate {
  filter: saturate(2);
}

.drop-shadow {
  filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.5));
}

.combined {
  filter: blur(2px) brightness(1.2) contrast(1.5);
}
```
:::

### 1. 基本滤镜函数
```css
.element {
  /* 模糊效果 */
  filter: blur(5px);

  /* 亮度调整 */
  filter: brightness(1.5); /* 增加亮度 */
  filter: brightness(0.5); /* 降低亮度 */

  /* 对比度调整 */
  filter: contrast(1.5); /* 增加对比度 */
  filter: contrast(0.5); /* 降低对比度 */

  /* 灰度转换 */
  filter: grayscale(100%); /* 完全灰度 */
  filter: grayscale(50%); /* 半灰度 */

  /* 色相旋转 */
  filter: hue-rotate(90deg);
  filter: hue-rotate(180deg);

  /* 反转颜色 */
  filter: invert(100%);

  /* 不透明度调整 */
  filter: opacity(50%);

  /* 饱和度调整 */
  filter: saturate(2); /* 增加饱和度 */
  filter: saturate(0.5); /* 降低饱和度 */

  /* 阴影效果 */
  filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.3));
}
```

### 2. 组合滤镜
可以同时应用多个滤镜，用空格分隔。

```css
.element {
  filter: blur(5px) brightness(1.2) contrast(1.5);
}
```

### 3. 滤镜与动画结合
```css
.element {
  transition: filter 0.3s ease;
}

.element:hover {
  filter: blur(2px) brightness(1.2);
}

@keyframes pulse {
  0% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.5);
  }
  100% {
    filter: brightness(1);
  }
}

.pulsing-element {
  animation: pulse 2s linear infinite;
}
```

### 4. 交互式滤镜调整

::: normal-demo
```html
<div class="interactive-filter-demo">
  <div class="filter-controls">
    <div class="control-group">
      <label for="blur">模糊度:</label>
      <input type="range" id="blur" min="0" max="10" value="0">
      <span id="blur-value">0px</span>
    </div>
    <div class="control-group">
      <label for="brightness">亮度:</label>
      <input type="range" id="brightness" min="0" max="3" step="0.1" value="1">
      <span id="brightness-value">1</span>
    </div>
    <div class="control-group">
      <label for="contrast">对比度:</label>
      <input type="range" id="contrast" min="0" max="3" step="0.1" value="1">
      <span id="contrast-value">1</span>
    </div>
    <div class="control-group">
      <label for="grayscale">灰度:</label>
      <input type="range" id="grayscale" min="0" max="100" value="0">
      <span id="grayscale-value">0%</span>
    </div>
    <div class="control-group">
      <label for="hue-rotate">色相旋转:</label>
      <input type="range" id="hue-rotate" min="0" max="360" value="0">
      <span id="hue-rotate-value">0deg</span>
    </div>
    <div class="control-group">
      <label for="saturate">饱和度:</label>
      <input type="range" id="saturate" min="0" max="5" step="0.1" value="1">
      <span id="saturate-value">1</span>
    </div>
    <div class="control-group">
      <label for="opacity">透明度:</label>
      <input type="range" id="opacity" min="0" max="1" step="0.1" value="1">
      <span id="opacity-value">1</span>
    </div>
  </div>
  <div class="preview-area">
    <div id="filter-preview" class="filter-preview">
      <div class="preview-content">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="#3498db" />
          <rect x="60" y="60" width="80" height="80" fill="#e74c3c" />
          <text x="100" y="110" font-family="Arial" font-size="20" fill="white" text-anchor="middle">滤镜效果</text>
        </svg>
      </div>
      <div id="filter-code" class="filter-code">filter: none;</div>
    </div>
  </div>
</div>
```
```css
/* 交互式滤镜调整 */
.interactive-filter-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.filter-controls {
  flex: 1;
  min-width: 250px;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 5px;
}

.control-group {
  margin-bottom: 15px;
}

.control-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.control-group input[type="range"] {
  width: 100%;
}

.preview-area {
  flex: 2;
  min-width: 300px;
}

.filter-preview {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.preview-content {
  margin-bottom: 20px;
}

.filter-code {
  background-color: #2c3e50;
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-family: monospace;
  text-align: left;
}
```
```js
// 交互式滤镜调整
const blurSlider = document.getElementById('blur');
const brightnessSlider = document.getElementById('brightness');
const contrastSlider = document.getElementById('contrast');
const grayscaleSlider = document.getElementById('grayscale');
const hueRotateSlider = document.getElementById('hue-rotate');
const saturateSlider = document.getElementById('saturate');
const opacitySlider = document.getElementById('opacity');

const blurValue = document.getElementById('blur-value');
const brightnessValue = document.getElementById('brightness-value');
const contrastValue = document.getElementById('contrast-value');
const grayscaleValue = document.getElementById('grayscale-value');
const hueRotateValue = document.getElementById('hue-rotate-value');
const saturateValue = document.getElementById('saturate-value');
const opacityValue = document.getElementById('opacity-value');

const filterPreview = document.getElementById('filter-preview');
const filterCode = document.getElementById('filter-code');

// 更新滤镜效果
function updateFilter() {
  const blur = blurSlider.value;
  const brightness = brightnessSlider.value;
  const contrast = contrastSlider.value;
  const grayscale = grayscaleSlider.value;
  const hueRotate = hueRotateSlider.value;
  const saturate = saturateSlider.value;
  const opacity = opacitySlider.value;

  // 更新显示的值
  blurValue.textContent = `${blur}px`;
  brightnessValue.textContent = brightness;
  contrastValue.textContent = contrast;
  grayscaleValue.textContent = `${grayscale}%`;
  hueRotateValue.textContent = `${hueRotate}deg`;
  saturateValue.textContent = saturate;
  opacityValue.textContent = opacity;

  // 构建滤镜字符串
  let filterString = '';
  if (blur > 0) filterString += ` blur(${blur}px)`;
  if (brightness != 1) filterString += ` brightness(${brightness})`;
  if (contrast != 1) filterString += ` contrast(${contrast})`;
  if (grayscale > 0) filterString += ` grayscale(${grayscale}%)`;
  if (hueRotate > 0) filterString += ` hue-rotate(${hueRotate}deg)`;
  if (saturate != 1) filterString += ` saturate(${saturate})`;
  if (opacity != 1) filterString += ` opacity(${opacity})`;

  // 应用滤镜
  if (filterString.trim() === '') {
    filterPreview.style.filter = 'none';
    filterCode.textContent = 'filter: none;';
  } else {
    filterPreview.style.filter = filterString.trim();
    filterCode.textContent = `filter:${filterString};`;
  }
}

// 添加事件监听器
blurSlider.addEventListener('input', updateFilter);
brightnessSlider.addEventListener('input', updateFilter);
contrastSlider.addEventListener('input', updateFilter);
grayscaleSlider.addEventListener('input', updateFilter);
hueRotateSlider.addEventListener('input', updateFilter);
saturateSlider.addEventListener('input', updateFilter);
opacitySlider.addEventListener('input', updateFilter);

// 初始化
updateFilter();
```
:::

## 混合模式 (Blend Modes)
混合模式控制元素如何与其背景或其他元素混合。

::: normal-demo
```html
<div class="blend-modes-demo">
  <h3>背景混合模式</h3>
  <div class="background-blend">
    <div class="blend-item multiply">multiply</div>
    <div class="blend-item screen">screen</div>
    <div class="blend-item overlay">overlay</div>
    <div class="blend-item darken">darken</div>
    <div class="blend-item lighten">lighten</div>
  </div>

  <h3>元素混合模式</h3>
  <div class="element-blend">
    <div class="background"></div>
    <div class="foreground multiply">multiply</div>
    <div class="foreground screen">screen</div>
    <div class="foreground overlay">overlay</div>
    <div class="foreground darken">darken</div>
    <div class="foreground lighten">lighten</div>
  </div>
</div>
```
```css
.blend-modes-demo {
  max-width: 800px;
  margin: 0 auto;
}

.background-blend {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
}

.blend-item {
  width: 150px;
  height: 150px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="%23e74c3c" /></svg>');
  background-color: #3498db;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 80% 80%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 10px;
  color: white;
  font-weight: bold;
  text-shadow: 0 1px 1px rgba(0,0,0,0.5);
  border-radius: 5px;
}

.multiply {
  background-blend-mode: multiply;
}

.screen {
  background-blend-mode: screen;
}

.overlay {
  background-blend-mode: overlay;
}

.darken {
  background-blend-mode: darken;
}

.lighten {
  background-blend-mode: lighten;
}

.element-blend {
  position: relative;
  width: 100%;
  height: 300px;
  background-color: #3498db;
  margin-bottom: 20px;
}

.background {
  width: 100%;
  height: 100%;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><circle cx="150" cy="150" r="100" fill="%232ecc71" /></svg>');
  background-repeat: no-repeat;
  background-position: center;
}

.foreground {
  position: absolute;
  width: 150px;
  height: 150px;
  background-color: #e74c3c;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  text-shadow: 0 1px 1px rgba(0,0,0,0.5);
}

.foreground.multiply {
  top: 50px;
  left: 50px;
  mix-blend-mode: multiply;
}

.foreground.screen {
  top: 50px;
  left: 250px;
  mix-blend-mode: screen;
}

.foreground.overlay {
  top: 50px;
  left: 450px;
  mix-blend-mode: overlay;
}

.foreground.darken {
  top: 200px;
  left: 150px;
  mix-blend-mode: darken;
}

.foreground.lighten {
  top: 200px;
  left: 350px;
  mix-blend-mode: lighten;
}

h3 {
  margin-top: 20px;
  margin-bottom: 10px;
}
```
:::

### 1. 背景混合模式 (background-blend-mode)
```css
.element {
  background-image: url("image.jpg");
  background-color: red;
  background-blend-mode: multiply;
  background-blend-mode: screen;
  background-blend-mode: overlay;
  background-blend-mode: darken;
  background-blend-mode: lighten;
  background-blend-mode: color-dodge;
  background-blend-mode: color-burn;
  background-blend-mode: hard-light;
  background-blend-mode: soft-light;
  background-blend-mode: difference;
  background-blend-mode: exclusion;
  background-blend-mode: hue;
  background-blend-mode: saturation;
  background-blend-mode: color;
  background-blend-mode: luminosity;
}
```

### 2. 元素混合模式 (mix-blend-mode)
```css
.element {
  mix-blend-mode: multiply;
  mix-blend-mode: screen;
  mix-blend-mode: overlay;
  /* 其他混合模式与 background-blend-mode 相同 */
}
```

### 3. 交互式混合模式演示

::: normal-demo
```html
<div class="interactive-blend-demo">
  <div class="blend-controls">
    <div class="control-group">
      <label for="blend-mode">选择混合模式:</label>
      <select id="blend-mode">
        <option value="normal">normal</option>
        <option value="multiply">multiply</option>
        <option value="screen">screen</option>
        <option value="overlay">overlay</option>
        <option value="darken">darken</option>
        <option value="lighten">lighten</option>
        <option value="color-dodge">color-dodge</option>
        <option value="color-burn">color-burn</option>
        <option value="hard-light">hard-light</option>
        <option value="soft-light">soft-light</option>
        <option value="difference">difference</option>
        <option value="exclusion">exclusion</option>
        <option value="hue">hue</option>
        <option value="saturation">saturation</option>
        <option value="color">color</option>
        <option value="luminosity">luminosity</option>
      </select>
    </div>
    <div class="control-group">
      <label for="foreground-color">前景色:</label>
      <input type="color" id="foreground-color" value="#e74c3c">
    </div>
    <div class="control-group">
      <label for="background-color">背景色:</label>
      <input type="color" id="background-color" value="#3498db">
    </div>
  </div>
  <div class="blend-preview">
    <div id="blend-container" class="blend-container">
      <div id="blend-background" class="blend-background">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="white" fill-opacity="0.3" />
        </svg>
      </div>
      <div id="blend-foreground" class="blend-foreground">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <rect x="10" y="10" width="80" height="80" rx="10" fill="white" fill-opacity="0.5" />
        </svg>
      </div>
    </div>
    <div id="blend-code" class="blend-code">
      .blend-foreground {
        mix-blend-mode: normal;
      }
    </div>
  </div>
</div>
```
```css
/* 交互式混合模式演示 */
.interactive-blend-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.blend-controls {
  flex: 1;
  min-width: 250px;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 5px;
}

.control-group {
  margin-bottom: 15px;
}

.control-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

select, input[type="color"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.blend-preview {
  flex: 2;
  min-width: 300px;
}

.blend-container {
  position: relative;
  width: 300px;
  height: 300px;
  margin: 0 auto 20px;
  background-color: #f5f5f5;
  border-radius: 5px;
  overflow: hidden;
}

.blend-background {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.blend-foreground {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.blend-code {
  background-color: #2c3e50;
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-family: monospace;
  text-align: left;
}
```
```js
// 交互式混合模式演示
const blendModeSelect = document.getElementById('blend-mode');
const foregroundColorInput = document.getElementById('foreground-color');
const backgroundColorInput = document.getElementById('background-color');
const blendForeground = document.getElementById('blend-foreground');
const blendBackground = document.getElementById('blend-background');
const blendCode = document.getElementById('blend-code');

// 更新混合模式
function updateBlendMode() {
  const blendMode = blendModeSelect.value;
  const foregroundColor = foregroundColorInput.value;
  const backgroundColor = background-colorInput.value;

  // 应用混合模式
  blendForeground.style.mixBlendMode = blendMode;

  // 更新颜色
  blendForeground.style.backgroundColor = foregroundColor;
  blendBackground.style.backgroundColor = backgroundColor;

  // 更新代码显示
  blendCode.textContent = `
.blend-foreground {
  mix-blend-mode: ${blendMode};
  background-color: ${foregroundColor};
}

.blend-background {
  background-color: ${backgroundColor};
}
`;
}

// 添加事件监听器
blendModeSelect.addEventListener('change', updateBlendMode);
foregroundColorInput.addEventListener('input', updateBlendMode);
backgroundColorInput.addEventListener('input', updateBlendMode);

// 初始化
updateBlendMode();
```
:::

### 4. 高级混合模式示例

::: normal-demo
```html
<div class="advanced-blend-demo">
  <h3>多重混合模式</h3>
  <div class="blend-stack">
    <div class="blend-layer bg"></div>
    <div class="blend-layer layer1"></div>
    <div class="blend-layer layer2"></div>
    <div class="blend-layer layer3"></div>
  </div>

  <h3>文字与背景混合</h3>
  <div class="text-blend">
    <h2>混合模式文字效果</h2>
  </div>
</div>
```
```css
/* 高级混合模式示例 */
.advanced-blend-demo {
  max-width: 800px;
  margin: 0 auto;
}

.blend-stack {
  position: relative;
  width: 300px;
  height: 300px;
  margin: 0 auto 30px;
}

.blend-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.bg {
  background-color: #3498db;
}

.layer1 {
  background-color: #e74c3c;
  mix-blend-mode: multiply;
  clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
}

.layer2 {
  background-color: #2ecc71;
  mix-blend-mode: screen;
  clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 75%);
}

.layer3 {
  background-color: #f39c12;
  mix-blend-mode: overlay;
  clip-path: polygon(0 75%, 100% 100%, 0 100%);
}

.text-blend {
  position: relative;
  width: 100%;
  height: 200px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="200" viewBox="0 0 800 200"><rect x="0" y="0" width="200" height="200" fill="%233498db" /><rect x="200" y="0" width="200" height="200" fill="%23e74c3c" /><rect x="400" y="0" width="200" height="200" fill="%232ecc71" /><rect x="600" y="0" width="200" height="200" fill="%23f39c12" /></svg>');
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-blend h2 {
  font-size: 48px;
  font-weight: bold;
  color: white;
  mix-blend-mode: difference;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}
```
:::

## 其他视觉特效

::: normal-demo
```html
<div class="visual-effects-demo">
  <h3>模糊效果</h3>
  <div class="effect-group">
    <div class="effect-item filter-blur">标准模糊</div>
    <div class="backdrop-blur-container">
      <div class="backdrop-blur">背景模糊</div>
    </div>
  </div>

  <h3>发光效果</h3>
  <div class="effect-group">
    <div class="effect-item text-glow">文本发光</div>
    <div class="effect-item box-glow">盒发光</div>
    <div class="effect-item filter-glow">滤镜发光</div>
  </div>

  <h3>纹理效果</h3>
  <div class="effect-group">
    <div class="effect-item css-texture">CSS 纹理</div>
    <div class="effect-item noise">噪点效果</div>
  </div>
</div>
```
```css
.visual-effects-demo {
  max-width: 800px;
  margin: 0 auto;
}

.effect-group {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
}

.effect-item {
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 5px;
  text-align: center;
}

.filter-blur {
  background-color: #3498db;
  color: white;
  filter: blur(5px);
}

.backdrop-blur-container {
  width: 200px;
  height: 200px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><circle cx="100" cy="100" r="80" fill="%232ecc71" /><circle cx="100" cy="100" r="40" fill="%23e74c3c" /></svg>');
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
}

.backdrop-blur {
  width: 150px;
  height: 150px;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  font-weight: bold;
}

.text-glow {
  background-color: #333;
  color: white;
  text-shadow: 0 0 10px rgba(255, 0, 0, 0.7);
  font-size: 18px;
  font-weight: bold;
}

.box-glow {
  background-color: #3498db;
  color: white;
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.7);
}

.filter-glow {
  background-color: #e74c3c;
  color: white;
  filter: drop-shadow(0 0 10px rgba(0, 0, 255, 0.7));
}

.css-texture {
  background-image: linear-gradient(45deg, #808080 25%, transparent 25%),
                    linear-gradient(-45deg, #808080 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, #808080 75%),
                    linear-gradient(-45deg, transparent 75%, #808080 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
  color: #333;
  font-weight: bold;
}

.noise {
  position: relative;
  background-color: #3498db;
  color: white;
  font-weight: bold;
}

.noise::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.1;
  pointer-events: none;
  border-radius: 5px;
}

h3 {
  margin-top: 30px;
  margin-bottom: 10px;
}
```
:::

### 1. 模糊效果
```css
/* 标准模糊 */
.element {
  filter: blur(5px);
}

/* 背景模糊 */
.backdrop-blur {
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.5);
}
```

### 2. 发光效果
```css
/* 文本发光 */
.text-glow {
  color: white;
  text-shadow: 0 0 10px rgba(255, 0, 0, 0.7);
}

/* 盒发光 */
.box-glow {
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.7);
}

/* 滤镜发光 */
.filter-glow {
  filter: drop-shadow(0 0 10px rgba(0, 0, 255, 0.7));
}
```

### 3. 纹理效果
```css
/* 使用背景图像创建纹理 */
.texture {
  background-image: url("texture.png");
  background-repeat: repeat;
}

/* 使用 CSS 生成纹理 */
.css-texture {
  background-image: linear-gradient(45deg, #808080 25%, transparent 25%),
                    linear-gradient(-45deg, #808080 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, #808080 75%),
                    linear-gradient(-45deg, transparent 75%, #808080 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}
```

### 4. 噪点效果
```css
.noise {
  position: relative;
}

.noise::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.1;
  pointer-events: none;
}
```

## 最佳实践
- 滤镜和混合模式可能会影响性能，尤其是在动画中，使用时需谨慎
- 优先使用 `backdrop-filter` 而不是 `filter` 实现背景模糊，性能更好
- 对于复杂的视觉效果，考虑使用 SVG 滤镜
- 测试滤镜和混合模式在不同浏览器上的兼容性
- 结合 CSS 变量使用滤镜，便于动态调整效果
- 避免过度使用视觉特效，以免影响用户体验
- 优化用于纹理和噪点的图像，减小文件大小

## 练习
1. 应用不同的滤镜效果到图像上
2. 结合多个滤镜创建自定义效果
3. 使用混合模式创建创意图像效果
4. 实现背景模糊效果
5. 创建文本和元素的发光效果
6. 使用 CSS 生成纹理和噪点效果
7. 设计一个具有多种视觉特效的动画

通过本章节的学习，你应该掌握 CSS 中的滤镜、混合模式和其他视觉特效技术，能够创建各种吸引人的视觉效果，提升页面的设计感和创意性。