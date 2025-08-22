# DOM (Document Object Model)

DOM（文档对象模型）是JavaScript与HTML/XML文档交互的标准接口，它将文档表示为一个树形结构，允许开发者访问和操作文档的各个部分。DOM是前端开发的核心，掌握DOM操作对于创建交互性Web应用程序至关重要。

## 一、DOM 基础与节点概述

### 1.1 DOM的概念与作用
DOM是一个跨平台、语言无关的接口，它允许程序和脚本动态地访问和更新文档的内容、结构和样式。DOM的主要作用包括：
- 将文档解析为一个树形结构
- 提供访问和修改文档的方法
- 实现文档与脚本语言的交互

### 1.2 节点类型
HTML文档被解析为一个树形结构，其中每个节点代表文档的一部分。DOM中主要有以下几种节点类型：

```
文档 (document) - 整个文档的根节点
├── 元素节点 (element) - HTML标签
│   ├── 属性节点 (attribute) - 标签的属性
│   └── 文本节点 (text) - 标签内的文本
└── 注释节点 (comment) - 文档中的注释
```

### 1.3 节点关系
节点之间存在以下几种关系：
- 父子关系：一个节点是另一个节点的直接父节点或子节点
- 兄弟关系：具有相同父节点的节点
- 祖先/后代关系：一个节点是另一个节点的间接父节点或子节点

### 1.4 节点属性
所有DOM节点都具有以下核心属性：
- `nodeType`：节点类型（数字表示）
- `nodeName`：节点名称
- `nodeValue`：节点值
- `parentNode`：父节点
- `childNodes`：子节点集合
- `previousSibling`：前一个兄弟节点
- `nextSibling`：后一个兄弟节点

### 1.5 HTML DOM API 概述
HTML DOM API 是专门针对HTML文档的DOM扩展，由一系列接口组成，定义了HTML中每个元素的功能以及它们所依赖的支持类型和接口。

#### 1.5.1 HTML DOM API 的核心功能
- 通过DOM访问和控制HTML元素
- 访问和操作表单数据
- 与2D图像内容和`<canvas>`元素上下文交互
- 管理连接到HTML媒体元素（`<audio>`和`<video>`）的媒体
- 实现网页上的拖放功能
- 访问浏览器导航历史记录
- 支持其他API的接口（如Web组件、Web Storage、Web Worker等）

#### 1.5.2 HTML 文档结构
- 每个文档由`Document`接口的实例表示
- 文档由节点层次树组成，每个节点代表文档的一部分
- `Node`接口是所有节点的基础，提供了节点信息和操作方法
- `Element`接口引入了节点呈现视觉内容的能力
- HTML标准增强了`Document`接口，添加了特定于Web浏览器上下文的功能

#### 1.5.3 重要集合接口
- `HTMLCollection`：表示元素的通用集合，是实时更新的（live）
  ```javascript
  // 获取所有div元素
  const divs = document.getElementsByTagName('div');
  console.log(divs.length); // 输出div元素的数量
  
  // HTMLCollection是实时的，当DOM结构变化时会自动更新
  const newDiv = document.createElement('div');
  document.body.appendChild(newDiv);
  console.log(divs.length); // 数量会增加1
  ```
- `NodeList`：节点的集合，部分实现是实时的，部分是静态的
  ```javascript
  // 获取所有p元素
  const paragraphs = document.querySelectorAll('p');
  // NodeList可以使用forEach方法遍历
  paragraphs.forEach(paragraph => {
    console.log(paragraph.textContent);
  });
  ```

### 1.6 Web Worker API
Web Worker API 允许在独立于主线程的后台线程中运行JavaScript代码，避免阻塞用户界面。

#### 1.6.1 Web Worker 的核心功能
- 在后台线程中执行耗时的计算任务
- 与主线程通过消息传递进行通信
- 不阻塞UI，保持页面响应性
- 可以生成新的Worker线程（需同源）

#### 1.6.2 Web Worker 的限制
- 不能直接操作DOM元素
- 不能访问window对象的某些属性和方法
- 遵循同源策略
- 不能使用localStorage和sessionStorage

#### 1.6.3 使用方法
```javascript
// 主线程中创建Worker
if (window.Worker) {
  const myWorker = new Worker('worker.js');

  // 发送消息到Worker
  myWorker.postMessage('Hello Worker!');

  // 接收Worker发送的消息
  myWorker.onmessage = function(e) {
    console.log('Received from worker:', e.data);
  };

  // 错误处理
  myWorker.onerror = function(e) {
    console.error(`Error in worker: ${e.filename} (line ${e.lineno}): ${e.message}`);
  };

  // 终止Worker
  // myWorker.terminate();
}

// worker.js文件中的代码
// 接收主线程发送的消息
onmessage = function(e) {
  console.log('Received from main thread:', e.data);

  // 执行耗时计算
  const result = performHeavyCalculation(e.data);

  // 发送结果回主线程
  postMessage(result);
};

function performHeavyCalculation(data) {
  // 模拟耗时计算
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += Math.sqrt(i);
  }
  return `Result: ${result}`;
}
```

#### 1.6.4 应用场景
- 大数据处理（排序、过滤、统计）
- 图像处理（滤镜、识别、变换）
- 音视频处理（编码、解码、特效）
- 文本分析（搜索、索引、自然语言处理）
- 加密解密运算

## 二、节点获取与遍历

### 2.1 选择元素节点
DOM提供了多种方法来选择元素节点：

#### 2.1.1 通过ID选择
```javascript
var element = document.getElementById("myId");
```

#### 2.1.2 通过类名选择
```javascript
var elements = document.getElementsByClassName("myClass");
// 返回HTMLCollection，类似数组但不是数组
```

#### 2.1.3 通过标签名选择
```javascript
var elements = document.getElementsByTagName("div");
// 返回HTMLCollection
```

#### 2.1.4 通过CSS选择器选择
ES5引入了更强大的选择器方法：
```javascript
// 选择第一个匹配的元素
var element = document.querySelector(".myClass");
// 选择所有匹配的元素
var elements = document.querySelectorAll("div.myClass");
// 返回NodeList，可以使用forEach方法遍历
```

### 2.2 DOM遍历方法

#### 2.2.1 基于节点关系的遍历
```javascript
var parent = document.getElementById("parent");

// 子节点
console.log(parent.childNodes); // 所有子节点，包括文本和注释
console.log(parent.children); // 所有元素子节点

// 第一个和最后一个子节点
console.log(parent.firstChild);
console.log(parent.lastChild);
console.log(parent.firstElementChild);
console.log(parent.lastElementChild);

// 兄弟节点
var child = document.getElementById("child");
console.log(child.previousSibling);
console.log(child.nextSibling);
console.log(child.previousElementSibling);
console.log(child.nextElementSibling);

// 父节点
console.log(child.parentNode);
console.log(child.parentElement);
```

#### 2.2.2 遍历API
ES5提供了更高级的遍历API：
```javascript
// 创建一个节点迭代器
var iterator = document.createNodeIterator(
  document.body,
  NodeFilter.SHOW_ELEMENT,
  null,
  false
);

// 遍历所有元素节点
var node;
while ((node = iterator.nextNode())) {
  console.log(node.tagName);
}
```

## 三、节点操作

### 3.1 创建节点
```javascript
// 创建元素节点
var newElement = document.createElement("div");

// 创建文本节点
var textNode = document.createTextNode("这是文本内容");

// 创建注释节点
var commentNode = document.createComment("这是注释");
```

### 3.2 插入节点
```javascript
var parent = document.getElementById("parent");
var newElement = document.createElement("div");
var referenceElement = document.getElementById("reference");

// 插入到参考元素之前
parent.insertBefore(newElement, referenceElement);

// 插入到父元素的开头
parent.insertBefore(newElement, parent.firstChild);

// 插入到父元素的结尾
parent.appendChild(newElement);

// 向元素添加文本节点
newElement.appendChild(textNode);
```

### 3.3 删除节点
```javascript
var element = document.getElementById("toDelete");
element.parentNode.removeChild(element);
```

### 3.4 替换节点
```javascript
var oldElement = document.getElementById("oldElement");
var newElement = document.createElement("div");
oldElement.parentNode.replaceChild(newElement, oldElement);
```

### 3.5 克隆节点
```javascript
var element = document.getElementById("toClone");
// 浅克隆（不克隆子节点）
var clone1 = element.cloneNode(false);
// 深克隆（克隆子节点）
var clone2 = element.cloneNode(true);
```

## 四、属性与内容操作

### 4.1 操作元素属性
```javascript
var element = document.getElementById("myElement");

// 获取属性
console.log(element.getAttribute("src"));
console.log(element.src); // 对于标准属性，可以直接访问

// 设置属性
element.setAttribute("src", "image.jpg");
element.src = "image.jpg"; // 直接设置

// 检查属性是否存在
console.log(element.hasAttribute("src"));

// 删除属性
element.removeAttribute("src");
```

### 4.2 操作元素内容

#### 4.2.1 innerHTML
```javascript
var element = document.getElementById("myElement");
element.innerHTML = "<p>新内容</p>";
console.log(element.innerHTML); // 读取内容
```

#### 4.2.2 textContent
```javascript
var element = document.getElementById("myElement");
element.textContent = "新文本内容";
console.log(element.textContent); // 读取文本内容
```

#### 4.2.3 innerText
```javascript
var element = document.getElementById("myElement");
element.innerText = "可见文本内容";
console.log(element.innerText); // 读取可见文本内容
```

### 4.3 数据属性
HTML5引入了数据属性，允许在元素上存储自定义数据：
```html
<div id="myDiv" data-user-id="123" data-user-name="张三"></div>
```

```javascript
var element = document.getElementById("myDiv");
// 读取数据属性
console.log(element.dataset.userId); // "123"
console.log(element.dataset.userName); // "张三"
// 设置数据属性
element.dataset.userAge = "25";
```

## 五、DOM 事件

### 5.1 事件模型
DOM支持三种事件模型：
- 内联事件模型
- DOM0级事件模型
- DOM2级事件模型

### 5.2 内联事件
```html
<!-- HTML中定义 -->
<button onclick="handleClick()">点击我</button>

<script>
function handleClick() {
  console.log("按钮被点击");
}
</script>
```

### 5.3 DOM0级事件处理
```javascript
var button = document.getElementById("myButton");
button.onclick = function() {
  console.log("按钮被点击");
};

// 移除事件
button.onclick = null;
```

### 5.4 DOM2级事件处理
```javascript
var button = document.getElementById("myButton");

function handleClick(event) {
  console.log("按钮被点击");
  console.log("事件类型: " + event.type);
  console.log("目标元素: " + event.target);
}

// 添加事件监听
element.addEventListener("click", handleClick, false);
addEvent(button, "click", function() {
  console.log("另一个点击处理函数");
});

// 移除事件监听
element.removeEventListener("click", handleClick, false);
```

### 5.5 事件对象
```javascript
var button = document.getElementById("myButton");
button.addEventListener("click", function(event) {
  // 阻止默认行为
  event.preventDefault();

  // 阻止事件冒泡
  event.stopPropagation();

  // 获取事件类型
  console.log(event.type); // "click"

  // 获取目标元素
  console.log("目标元素: " + event.target);

  // 获取当前元素
  console.log("当前元素: " + event.currentTarget);

  // 获取鼠标位置
  console.log("X: " + event.clientX + ", Y: " + event.clientY);
});
```

### 5.6 事件委托
```javascript
var ul = document.getElementById("myList");
ul.addEventListener("click", function(event) {
  // 检查事件目标是否是li元素
  var target = event.target;
  if (target.tagName === "LI") {
    console.log("点击了列表项: " + target.textContent);
  }
});
```

### 5.7 常用事件类型
- 鼠标事件：click, dblclick, mousedown, mouseup, mousemove, mouseover, mouseout
- 键盘事件：keydown, keyup, keypress
- 表单事件：submit, reset, change, input
- 文档事件：load, unload, resize, scroll
- 触摸事件：touchstart, touchmove, touchend

## 六、DOM 样式操作

### 6.1 内联样式操作
```javascript
var element = document.getElementById("myElement");

// 设置内联样式
element.style.color = "red";
element.style.fontSize = "16px";
element.style.backgroundColor = "#f0f0f0";

// 读取内联样式
console.log(element.style.color);
```

### 6.2 计算样式
```javascript
var element = document.getElementById("myElement");
var computedStyle = window.getComputedStyle(element);
console.log(computedStyle.color);
console.log(computedStyle.fontSize);
console.log(computedStyle.backgroundColor);
```

### 6.3 类名操作
```javascript
var element = document.getElementById("myElement");

// 添加类名
element.classList.add("newClass");

// 移除类名
element.classList.remove("oldClass");

// 切换类名
element.classList.toggle("active");

// 检查类名是否存在
console.log(element.classList.contains("active"));
```

### 6.4 样式表操作
```javascript
// 获取样式表
var styleSheet = document.styleSheets[0];

// 添加CSS规则
styleSheet.insertRule(".newClass { color: red; }", 0);

// 删除CSS规则
styleSheet.deleteRule(0);
```

## 七、DOM 级别与标准

### 7.1 DOM级别演进
- **DOM Level 0**：早期的DOM实现，主要包括元素选择和基本事件处理
- **DOM Level 1**：1998年发布，定义了文档结构和基本操作方法
- **DOM Level 2**：2000年发布，增加了事件模型、样式操作和遍历API
- **DOM Level 3**：2004年发布，增加了XPath支持、加载和保存XML等功能
- **DOM Level 4**：2015年发布，进一步完善和扩展了DOM API

### 7.2 主要DOM标准
- **Core DOM**：核心DOM，定义了所有文档类型通用的接口
- **HTML DOM**：专门针对HTML文档的扩展
- **XML DOM**：专门针对XML文档的扩展
- **SVG DOM**：专门针对SVG文档的扩展

### 7.3 浏览器兼容性
不同浏览器对DOM标准的支持程度不同，特别是在早期版本中。为了处理兼容性问题，可以：
- 使用特性检测
- 使用polyfill库
- 使用封装好的DOM操作库（如jQuery）

## 八、DOM 性能优化

### 8.1 减少DOM操作
```javascript
// 不好的做法: 多次修改DOM
var list = document.getElementById("myList");
for (var i = 0; i < 1000; i++) {
  var li = document.createElement("li");
  li.textContent = "项目 " + i;
  list.appendChild(li);
}

// 好的做法: 使用文档片段
var fragment = document.createDocumentFragment();
for (var i = 0; i < 1000; i++) {
  var li = document.createElement("li");
  li.textContent = "项目 " + i;
  fragment.appendChild(li);
}
list.appendChild(fragment);
```

### 8.2 缓存DOM查询
```javascript
// 不好的做法: 重复查询同一元素
for (var i = 0; i < 10; i++) {
  document.getElementById("myElement").textContent = "更新 " + i;
}

// 好的做法: 缓存查询结果
var element = document.getElementById("myElement");
for (var i = 0; i < 10; i++) {
  element.textContent = "更新 " + i;
}
```

### 8.3 使用事件委托
如前所述，事件委托可以减少事件监听器的数量，提高性能。

### 8.4 避免重排和重绘
- 批量修改样式
- 使用DocumentFragment
- 使用CSS transforms和opacity代替传统定位
- 避免在滚动时执行DOM操作

DOM是前端开发的核心，掌握DOM操作对于创建交互性Web应用程序至关重要。随着Web标准的不断发展，DOM API也在不断完善，提供了更强大、更高效的文档操作能力。

## 九、DOM 错误处理

### 9.1 DOM操作中常见的错误类型
在进行DOM操作时，可能会遇到以下常见错误：

- **类型错误 (TypeError)**：尝试对非DOM节点执行DOM操作
- **引用错误 (ReferenceError)**：使用未定义的变量或函数
- **范围错误 (RangeError)**：使用无效的索引或范围
- **语法错误 (SyntaxError)**：HTML或CSS语法错误导致的DOM解析问题
- ** NotFoundError**：尝试访问不存在的DOM元素

### 9.2 错误处理策略

#### 9.2.1 使用 try/catch 捕获错误
```javascript
try {
  var element = document.getElementById('nonExistentElement');
  // 尝试执行可能出错的操作
  element.textContent = '更新内容';
} catch (error) {
  console.error('DOM操作错误:', error.message);
  // 提供备选方案或友好提示
  displayErrorMessage('操作无法完成，请刷新页面后重试');
}
```

#### 9.2.2 进行存在性检查
```javascript
var element = document.getElementById('myElement');
// 在操作前检查元素是否存在
if (element) {
  element.textContent = '安全更新内容';
} else {
  console.warn('元素不存在，无法执行操作');
}
```

#### 9.2.3 使用条件操作符简化检查
```javascript
var element = document.getElementById('myElement');
// 使用短路评估进行安全操作
(element || {}).textContent = '安全更新内容';
```

#### 9.2.4 监听错误事件
```javascript
// 监听全局错误
window.addEventListener('error', function(event) {
  console.error('捕获到错误:', event.error);
  // 可以在这里记录错误或显示用户友好的提示
  event.preventDefault();
});

// 监听未处理的Promise拒绝
window.addEventListener('unhandledrejection', function(event) {
  console.error('未处理的Promise拒绝:', event.reason);
  event.preventDefault();
});
```

### 9.3 安全的DOM操作实践

#### 9.3.1 安全地访问属性和方法
```javascript
function safelyGetElementById(id) {
  try {
    return document.getElementById(id);
  } catch (error) {
    console.error('获取元素失败:', error);
    return null;
  }
}

function safelySetTextContent(element, text) {
  if (element && typeof element.textContent !== 'undefined') {
    element.textContent = text;
    return true;
  }
  return false;
}
```

#### 9.3.2 安全地操作DOM集合
```javascript
var elements = document.getElementsByClassName('myClass');
// 检查是否为有效集合且有元素
if (elements && elements.length > 0) {
  for (var i = 0; i < elements.length; i++) {
    // 安全地操作每个元素
    safelySetTextContent(elements[i], '更新内容 ' + i);
  }
}
```

### 9.4 调试DOM错误的方法

#### 9.4.1 使用控制台日志
```javascript
console.log('当前元素:', element);
console.dir(element); // 显示元素的详细属性
```

#### 9.4.2 使用浏览器开发者工具
- **元素面板**：检查DOM结构和属性
- **控制台面板**：查看错误信息和日志
- **调试器面板**：设置断点逐步执行代码

#### 9.4.3 添加调试辅助函数
```javascript
function debugDOMOperation(operation, elementId) {
  console.group('DOM操作调试: ' + operation);
  console.time('操作耗时');
  
  try {
    var element = document.getElementById(elementId);
    console.log('元素状态:', element);
    // 执行具体操作...
    return true;
  } catch (error) {
    console.error('操作失败:', error);
    return false;
  } finally {
    console.timeEnd('操作耗时');
    console.groupEnd();
  }
}
```

### 9.5 处理异步DOM操作错误
```javascript
// 使用Promise处理异步DOM操作
function fetchDataAndUpdateDOM(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('网络响应错误: ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      var element = document.getElementById('dataContainer');
      if (element) {
        element.textContent = JSON.stringify(data);
      } else {
        throw new Error('未找到数据容器元素');
      }
    })
    .catch(error => {
      console.error('异步DOM操作错误:', error);
      // 显示错误信息给用户
      var errorElement = document.getElementById('errorMessage');
      if (errorElement) {
        errorElement.textContent = '数据加载失败: ' + error.message;
      }
    });
}

// 调用函数
fetchDataAndUpdateDOM('https://api.example.com/data');
```
通过有效的错误处理，可以提高Web应用程序的健壮性和用户体验，确保即使发生错误，应用也能优雅地降级而不是完全崩溃。

## 十、高级DOM API

### 10.1 requestAnimationFrame API
`requestAnimationFrame` API 提供了一种高效的方式来执行动画，它会在浏览器下一次重绘之前调用指定的回调函数。

#### 10.1.1 requestAnimationFrame 的核心功能
- 与浏览器刷新频率同步（通常为60Hz）
- 页面不可见时自动暂停，节省资源
- 避免过度绘制和掉帧
- 提供更平滑的动画效果

#### 10.1.2 使用方法
```javascript
// 基本用法
function animate(timestamp) {
  // 计算两次重绘的时间间隔
  if (lastTime) {
    deltaTime = timestamp - lastTime;
  }
  lastTime = timestamp;

  // 执行动画逻辑
  element.style.left = (parseInt(element.style.left) || 0) + 1 + 'px';

  // 如果需要继续动画，再次调用requestAnimationFrame
  if (shouldContinueAnimation()) {
    animationId = requestAnimationFrame(animate);
  }
}

// 启动动画
let lastTime = 0;
let animationId = requestAnimationFrame(animate);

// 取消动画
// cancelAnimationFrame(animationId);
```

#### 10.1.3 应用场景
- DOM动画效果
- Canvas动画
- SVG动画
- WebGL动画
- 滚动动画
- 进度条动画

### 10.2 其他高级DOM API
- `IntersectionObserver`：用于检测元素是否进入视口
- `MutationObserver`：用于监听DOM树变化
- `ResizeObserver`：用于监听元素尺寸变化
- `getComputedStyle`：获取元素的计算样式
- `document.startViewTransition`：用于创建平滑的视图过渡效果

```