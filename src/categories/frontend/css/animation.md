# 动画

## 过渡 (Transition)
过渡允许元素在状态变化时平滑地改变属性值。

::: normal-demo

```html
<div class="transition-demo">
  <div class="box"></div>
  <button id="hoverButton">悬停效果</button>
  <button id="clickButton">点击效果</button>
</div>
```

```css
/* 过渡基本概念示例 */
.box {
  width: 100px;
  height: 100px;
  background-color: #3498db;
  margin-bottom: 20px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

/* 悬停效果 */
.box:hover {
  transform: scale(1.1);
  background-color: #2ecc71;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* 点击效果 */
.box.active {
  width: 200px;
  height: 200px;
  background-color: #e74c3c;
  border-radius: 50%;
}

button {
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  background-color: #9b59b6;
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #8e44ad;
}
```

```js
// 点击效果交互
const box = document.querySelector('.box');
const clickButton = document.getElementById('clickButton');

clickButton.addEventListener('click', () => {
  box.classList.toggle('active');
});
```

:::

### 过渡的基本概念
```css
.element {
  transition: property duration timing-function delay;
}
```

### 1. transition-property
指定要过渡的CSS属性。

```css
.element {
  transition-property: width; /* 只过渡宽度 */
  transition-property: width, height; /* 过渡宽度和高度 */
  transition-property: all; /* 过渡所有可过渡的属性 */
}
```

### 2. transition-duration
指定过渡效果的持续时间。

```css
.element {
  transition-duration: 1s;
  transition-duration: 500ms;
}
```

### 3. transition-timing-function
指定过渡效果的时间曲线。

```css
.element {
  transition-timing-function: ease; /* 默认，慢-快-慢 */
  transition-timing-function: linear; /* 匀速 */
  transition-timing-function: ease-in; /* 慢开始 */
  transition-timing-function: ease-out; /* 慢结束 */
  transition-timing-function: ease-in-out; /* 慢开始慢结束 */
  transition-timing-function: cubic-bezier(0.1, 0.7, 1.0, 0.1); /* 自定义贝塞尔曲线 */
  transition-timing-function: steps(5, end); /* 分步过渡 */
}
```

### 4. transition-delay
指定过渡效果的延迟时间。

```css
.element {
  transition-delay: 0s; /* 默认，立即开始 */
  transition-delay: 500ms; /* 延迟500毫秒开始 */
}
```

### 5. 简写形式
```css
.element {
  transition: width 1s ease 0s;
  transition: width 1s, height 2s ease-in 500ms; /* 多个过渡效果 */
  transition: all 0.3s ease;
}
```

## 动画 (Animation)
动画允许元素在一段时间内经历多次样式变化。

::: normal-demo

```html
<div class="animation-demo">
  <div class="animated-box slide-in"></div>
  <div class="animated-box bounce"></div>
  <div class="animated-box pulse"></div>
</div>
```

```css
/* 动画示例 */
.animation-demo {
  display: flex;
  gap: 20px;
}

.animated-box {
  width: 100px;
  height: 100px;
  border-radius: 4px;
  margin-bottom: 20px;
}

/* 滑入动画 */
.slide-in {
  background-color: #3498db;
  animation: slide-in 1s ease forwards;
}

@keyframes slide-in {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* 弹跳动画 */
.bounce {
  background-color: #2ecc71;
  animation: bounce 1s ease infinite alternate;
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
  }
}

/* 脉冲动画 */
.pulse {
  background-color: #e74c3c;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
```

:::

### 1. @keyframes 规则
定义动画的关键帧。

```css
@keyframes slide-in {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}
```

### 2. animation-name
指定要应用的动画名称。

```css
.element {
  animation-name: slide-in;
}
```

### 3. animation-duration
指定动画的持续时间。

```css
.element {
  animation-duration: 1s;
  animation-duration: 500ms;
}
```

### 4. animation-timing-function
指定动画的时间曲线。

```css
.element {
  animation-timing-function: ease;
  animation-timing-function: linear;
  animation-timing-function: ease-in;
  animation-timing-function: ease-out;
  animation-timing-function: ease-in-out;
  animation-timing-function: cubic-bezier(0.1, 0.7, 1.0, 0.1);
  animation-timing-function: steps(5, end);
}
```

### 5. animation-delay
指定动画的延迟时间。

```css
.element {
  animation-delay: 0s;
  animation-delay: 500ms;
}
```

### 6. animation-iteration-count
指定动画的播放次数。

```css
.element {
  animation-iteration-count: 1; /* 默认，播放一次 */
  animation-iteration-count: 3; /* 播放三次 */
  animation-iteration-count: infinite; /* 无限播放 */
}
```

### 7. animation-direction
指定动画的播放方向。

```css
.element {
  animation-direction: normal; /* 默认，正常播放 */
  animation-direction: reverse; /* 反向播放 */
  animation-direction: alternate; /* 正向反向交替播放 */
  animation-direction: alternate-reverse; /* 反向正向交替播放 */
}
```

### 8. animation-fill-mode
指定动画在播放前后如何应用样式。

```css
.element {
  animation-fill-mode: none; /* 默认，动画结束后回到初始状态 */
  animation-fill-mode: forwards; /* 动画结束后保持最后一个关键帧的样式 */
  animation-fill-mode: backwards; /* 动画开始前应用第一个关键帧的样式 */
  animation-fill-mode: both; /* 同时应用forwards和backwards的效果 */
}
```

### 9. animation-play-state
控制动画的播放状态。

```css
.element {
  animation-play-state: running; /* 默认，运行中 */
  animation-play-state: paused; /* 暂停 */
}
```

### 10. 简写形式
```css
.element {
  animation: name duration timing-function delay iteration-count direction fill-mode play-state;
  animation: slide-in 1s ease 0s infinite alternate forwards running;
}
```

::: normal-demo
```html
<div class="animation-controls">
  <h3>动画控制示例</h3>
  <div class="animated-shape"></div>
  <div class="control-buttons">
    <button id="playBtn">播放</button>
    <button id="pauseBtn">暂停</button>
    <button id="resetBtn">重置</button>
    <select id="animationSelect">
      <option value="spin">旋转动画</option>
      <option value="bounce">弹跳动画</option>
      <option value="colorChange">颜色变化</option>
      <option value="movePath">路径移动</option>
    </select>
    <select id="directionSelect">
      <option value="normal">正常方向</option>
      <option value="reverse">反向</option>
      <option value="alternate">交替</option>
      <option value="alternate-reverse">反向交替</option>
    </select>
    <select id="fillModeSelect">
      <option value="none">无填充</option>
      <option value="forwards">保持最后状态</option>
      <option value="backwards">应用初始状态</option>
      <option value="both">两者都应用</option>
    </select>
  </div>
</div>
```
```css
/* 动画控制示例 */
.animation-controls {
  text-align: center;
  padding: 20px;
}

.animated-shape {
  width: 100px;
  height: 100px;
  background-color: #3498db;
  margin: 20px auto;
  border-radius: 4px;
  transition: all 0.3s ease;
}

/* 旋转动画 */
.spin {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 弹跳动画 */
.bounce {
  animation: bounce 1s ease infinite alternate;
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-30px);
  }
}

/* 颜色变化动画 */
.colorChange {
  animation: colorChange 3s ease-in-out infinite;
}

@keyframes colorChange {
  0% {
    background-color: #3498db;
    border-radius: 4px;
  }
  25% {
    background-color: #2ecc71;
    border-radius: 50%;
  }
  50% {
    background-color: #e74c3c;
    border-radius: 4px;
  }
  75% {
    background-color: #f39c12;
    border-radius: 50%;
  }
  100% {
    background-color: #3498db;
    border-radius: 4px;
  }
}

/* 路径移动动画 */
.movePath {
  animation: movePath 4s ease-in-out infinite alternate;
  position: relative;
}

@keyframes movePath {
  0% {
    left: -150px;
    top: 0;
    transform: rotate(0deg);
  }
  25% {
    left: 0;
    top: -50px;
    transform: rotate(90deg);
  }
  50% {
    left: 150px;
    top: 0;
    transform: rotate(180deg);
  }
  75% {
    left: 0;
    top: 50px;
    transform: rotate(270deg);
  }
  100% {
    left: -150px;
    top: 0;
    transform: rotate(360deg);
  }
}

.control-buttons {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

button, select {
  padding: 8px 12px;
  cursor: pointer;
  background-color: #9b59b6;
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

button:hover, select:hover {
  background-color: #8e44ad;
}
```
```js
// 动画控制交互
const shape = document.querySelector('.animated-shape');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const animationSelect = document.getElementById('animationSelect');
const directionSelect = document.getElementById('directionSelect');
const fillModeSelect = document.getElementById('fillModeSelect');

// 设置默认动画
let currentAnimation = 'spin';
shape.classList.add(currentAnimation);
shape.style.animationDirection = 'normal';
shape.style.animationFillMode = 'none';

// 播放按钮
playBtn.addEventListener('click', () => {
  shape.style.animationPlayState = 'running';
});

// 暂停按钮
pauseBtn.addEventListener('click', () => {
  shape.style.animationPlayState = 'paused';
});

// 重置按钮
resetBtn.addEventListener('click', () => {
  // 移除当前动画类
  shape.classList.remove(currentAnimation);
  // 触发重绘
  void shape.offsetWidth;
  // 重新添加动画类
  shape.classList.add(currentAnimation);
  // 应用当前设置的方向和填充模式
  shape.style.animationDirection = directionSelect.value;
  shape.style.animationFillMode = fillModeSelect.value;
  // 确保动画是运行状态
  shape.style.animationPlayState = 'running';
});

// 动画选择
animationSelect.addEventListener('change', () => {
  // 移除旧动画类
  shape.classList.remove(currentAnimation);
  // 设置新动画类
  currentAnimation = animationSelect.value;
  shape.classList.add(currentAnimation);
  // 应用当前设置的方向和填充模式
  shape.style.animationDirection = directionSelect.value;
  shape.style.animationFillMode = fillModeSelect.value;
  // 确保动画是运行状态
  shape.style.animationPlayState = 'running';
});

// 方向选择
irectionSelect.addEventListener('change', () => {
  shape.style.animationDirection = directionSelect.value;
});

// 填充模式选择
fillModeSelect.addEventListener('change', () => {
  shape.style.animationFillMode = fillModeSelect.value;
});
```
:::

## 动画与过渡的结合
动画和过渡可以结合使用，创建更丰富的视觉效果。

::: normal-demo
```html
<div class="combined-animation">
  <div class="card"></div>
</div>
```
```css
/* 动画与过渡结合示例 */
.combined-animation {
  display: flex;
  justify-content: center;
  padding: 40px;
}

.card {
  width: 200px;
  height: 300px;
  background: linear-gradient(135deg, #3498db, #9b59b6);
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
  animation: float 4s ease-in-out infinite;
}

.card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: rotate(30deg);
  animation: shine 6s infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

@keyframes shine {
  0% {
    left: -50%;
    top: -50%;
  }
  100% {
    left: 150%;
    top: 150%;
  }
}
```
:::

## 最佳实践

1. **优先使用transform和opacity**：这两个属性的动画性能最好，不会触发重排
2. **避免使用会导致重排的属性**：如width、height、margin、padding等
3. **使用will-change**：提示浏览器元素将要发生变化
4. **保持动画简单**：复杂动画可能导致性能问题
5. **使用硬件加速**：通过transform: translateZ(0)或transform: rotateX(0)触发
6. **适当使用动画延迟**：为多个元素添加不同的延迟，创建更自然的效果
7. **考虑动画对可访问性的影响**：提供关闭动画的选项
8. **测试不同设备上的性能**：确保动画在各种设备上都流畅运行

## 练习

1. 创建一个包含多个关键帧的复杂动画
2. 实现一个3D旋转的立方体动画
3. 设计一个滚动触发的渐入效果
4. 比较使用width和transform实现的动画性能差异
5. 为SVG图形添加动画效果
6. 创建一个可以通过按钮控制的动画

通过本章节的学习，你应该掌握CSS动画的核心概念和高级技巧，能够创建流畅、高效的动画效果，提升用户体验。


## 性能优化
动画性能优化是创建流畅动画的关键。

::: normal-demo
```html
<div class="performance-demo">
  <div class="optimized-box"></div>
  <div class="non-optimized-box"></div>
  <div class="stats">
    <p>优化的动画: <span id="optimized-fps">--</span> FPS</p>
    <p>非优化的动画: <span id="non-optimized-fps">--</span> FPS</p>
  </div>
</div>
```
```css
/* 性能优化示例 */
.performance-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.optimized-box, .non-optimized-box {
  width: 100px;
  height: 100px;
  margin: 20px;
  border-radius: 4px;
}

/* 优化的动画 - 使用 transform 和 opacity */
.optimized-box {
  background-color: #2ecc71;
  animation: optimizedMove 2s ease-in-out infinite alternate;
  will-change: transform, opacity;
}

@keyframes optimizedMove {
  0% {
    transform: translateX(-150px) rotate(0deg);
    opacity: 0.5;
  }
  100% {
    transform: translateX(150px) rotate(360deg);
    opacity: 1;
  }
}

/* 非优化的动画 - 使用 left 和 width */
.non-optimized-box {
  background-color: #e74c3c;
  position: relative;
  animation: nonOptimizedMove 2s ease-in-out infinite alternate;
}

@keyframes nonOptimizedMove {
  0% {
    left: -150px;
    width: 100px;
  }
  100% {
    left: 150px;
    width: 150px;
  }
}

.stats {
  margin-top: 20px;
  text-align: center;
}
```
```js
// FPS 计数器
function startFpsCounter(elementId, boxSelector) {
  const element = document.getElementById(elementId);
  const box = document.querySelector(boxSelector);
  let frameCount = 0;
  let lastTime = performance.now();
  let fps = 0;

  function updateFps() {
    const currentTime = performance.now();
    const delta = currentTime - lastTime;
    frameCount++;

    if (delta >= 1000) {
      fps = frameCount;
      frameCount = 0;
      lastTime = currentTime;
      element.textContent = fps;
    }

    requestAnimationFrame(updateFps);
  }

  updateFps();
}

// 启动 FPS 计数器
startFpsCounter('optimized-fps', '.optimized-box');
startFpsCounter('non-optimized-fps', '.non-optimized-box');
```
:::

### 动画性能优化技巧

1. **使用 transform 和 opacity**: 这两个属性不会触发重排(reflow)，只会触发重绘(repaint)或合成(composite)。
2. **避免使用会触发重排的属性**: 如 width, height, left, top 等。
3. **使用 will-change**: 提前通知浏览器元素将要发生变化。
4. **减少动画元素的数量**: 过多的动画元素会导致性能下降。
5. **使用硬件加速**: 通过 transform: translateZ(0) 或 transform: translate3d(0, 0, 0) 触发 GPU 渲染。
6. **优化动画时间**: 保持动画时间短而简洁，避免长时间运行的复杂动画。

## 动画的最佳实践

1. **保持简洁**: 简洁的动画更易于理解和维护。
2. **有目的性**: 动画应该有明确的目的，而不是为了动画而动画。
3. **考虑性能**: 始终考虑动画的性能影响，优化动画效果。
4. **适应不同设备**: 确保动画在不同设备上都能正常工作。
5. **测试**: 充分测试动画在不同浏览器和设备上的表现。

## 练习

1. 创建一个包含多种过渡效果的按钮悬停效果。
2. 设计一个使用关键帧动画的加载动画。
3. 实现一个结合动画和过渡的卡片翻转效果。
4. 优化一个性能较差的动画。
5. 创建一个响应式动画，在不同屏幕尺寸上有不同的表现。

```css
.element {
  animation-direction: normal; /* 默认，正向播放 */
  animation-direction: reverse; /* 反向播放 */
  animation-direction: alternate; /* 正向-反向交替播放 */
  animation-direction: alternate-reverse; /* 反向-正向交替播放 */
}
```

### 8. animation-fill-mode
指定动画在播放前后如何应用样式。

```css
.element {
  animation-fill-mode: none; /* 默认，不应用任何样式 */
  animation-fill-mode: forwards; /* 保持最后一帧的样式 */
  animation-fill-mode: backwards; /* 应用第一帧的样式 */
  animation-fill-mode: both; /* 同时应用 forwards 和 backwards */
}
```

### 9. animation-play-state
控制动画的播放状态。

```css
.element {
  animation-play-state: running; /* 默认，播放中 */
  animation-play-state: paused; /* 暂停 */
}
```

### 10. 简写形式
```css
.element {
  animation: slide-in 1s ease 0s infinite alternate forwards;
  animation: bounce 0.5s ease-in-out 0s infinite;
}
```

## 滚动驱动动画
滚动驱动动画允许动画根据滚动位置进行触发和控制。

::: normal-demo

```html
<div class="scroll-demo">
  <div class="scroll-container">
    <div class="scroll-element"></div>
  </div>
  <p>向下滚动查看动画效果</p>
</div>
```

```css
/* 滚动驱动动画示例 */
.scroll-demo {
  height: 600px;
  overflow-y: scroll;
  padding: 20px;
  position: relative;
}

.scroll-container {
  height: 1000px;
  position: relative;
}

.scroll-element {
  width: 100px;
  height: 100px;
  background-color: #9b59b6;
  border-radius: 4px;
  position: absolute;
  top: 200px;
  left: 0;
  /* 滚动时间线动画 */
  animation: move 1s linear forwards;
  animation-timeline: scroll(y self);
}

@keyframes move {
  from {
    transform: translateX(0) rotate(0deg);
    opacity: 0.5;
  }
  to {
    transform: translateX(300px) rotate(180deg);
    opacity: 1;
    background-color: #3498db;
  }
}

.scroll-demo p {
  text-align: center;
  margin-top: 20px;
  color: #555;
}
```

:::

### 1. 滚动时间线
```css
/* 滚动时间线 */
@scroll-timeline slide-timeline {
  source: auto;
  orientation: vertical;
  scroll-offsets: 0%, 100%;
}

.element {
  animation: slide-in 1s linear;
  animation-timeline: slide-timeline;
}
```

### 2. 视图时间线
```css
/* 视图时间线 */
@view-timeline fade-timeline {
  selector: #scroll-container;
  range: entry;
  orientation: vertical;
}

.element {
  animation: fade-in 1s linear;
  animation-timeline: fade-timeline;
}
```

### 3. scroll() 函数
```css
.element {
  transform: translateX(scroll(0% 100%));
  opacity: scroll(0% 100% 0 1);
}
```

## 视图过渡
视图过渡允许在页面状态变化时创建平滑的过渡效果。

### 1. 基本使用
```css
/* 在父元素上启用视图过渡 */
.container {
  view-transition-name: container;
}

/* 在子元素上定义视图过渡名称 */
.element {
  view-transition-name: element;
}

/* 触发视图过渡 */
button.addEventListener('click', () => {
  document.startViewTransition(() => {
    // 更改DOM
  });
});
```

### 2. 自定义视图过渡
```css
/* 自定义视图过渡效果 */
::view-transition {
  duration: 0.5s;
  timing-function: ease-in-out;
}

/* 自定义过渡组 */
::view-transition-group(root) {
  animation-duration: 0.8s;
}

/* 自定义旧元素和新元素的过渡 */
::view-transition-old(element) {
  animation: fade-out 0.5s ease-in-out;
}

::view-transition-new(element) {
  animation: fade-in 0.5s ease-in-out;
}

@keyframes fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

## 最佳实践
- 尽量使用 `transform` 和 `opacity` 属性进行动画，它们性能更好
- 避免使用会导致重排（layout）的属性进行动画，如 `width`, `height`, `margin` 等
- 对于复杂动画，考虑使用 `will-change` 属性提示浏览器进行优化
- 为动画添加适当的延迟和时间曲线，使动画更自然
- 对于滚动驱动动画，确保在不同设备上的体验一致
- 测试动画在各种浏览器上的兼容性

## 练习
1. 使用过渡创建悬停效果
2. 定义并应用一个简单的动画
3. 创建一个无限循环的动画
4. 使用滚动驱动动画创建视差效果
5. 实现视图过渡效果
6. 优化动画性能

通过本章节的学习，你应该掌握 CSS 中的过渡、动画、滚动驱动动画和视图过渡技术，能够创建流畅、自然的动画效果，提升用户体验。