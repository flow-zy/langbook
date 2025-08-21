# DOM (Document Object Model)

DOM（文档对象模型）是JavaScript与HTML文档交互的接口，它将HTML文档表示为一个树形结构，允许开发者访问和操作文档的各个部分。

## DOM 树结构

HTML文档被解析为一个树形结构，其中每个节点代表文档的一部分：

```
文档 (document)
├── 元素节点 (element)
│   ├── 属性节点 (attribute)
│   └── 文本节点 (text)
└── 注释节点 (comment)
```

## 选择元素

### 通过ID选择
```javascript
var element = document.getElementById("myId");
```

### 通过类名选择
```javascript
var elements = document.getElementsByClassName("myClass");
// 返回HTMLCollection，类似数组但不是数组
```

### 通过标签名选择
```javascript
var elements = document.getElementsByTagName("div");
// 返回HTMLCollection
```

### 通过CSS选择器选择
在ES5中，可以使用第三方库(如jQuery)来实现更复杂的选择器，或者使用以下方法：
```javascript
// 自定义函数实现简单的类选择器
function getElementsByClass(className) {
  var allElements = document.getElementsByTagName('*');
  var elements = [];
  
  for (var i = 0; i < allElements.length; i++) {
    if (allElements[i].className.indexOf(className) !== -1) {
      elements.push(allElements[i]);
    }
  }
  
  return elements;
}

// 使用示例
var elements = getElementsByClass("myClass");
```

## 操作元素内容

### innerHTML
```javascript
var element = document.getElementById("myElement");
element.innerHTML = "<p>新内容</p>";
console.log(element.innerHTML); // 读取内容
```

### textContent
```javascript
var element = document.getElementById("myElement");
// 兼容IE8及以下
if (element.textContent !== undefined) {
  element.textContent = "新文本内容";
  console.log(element.textContent); // 读取文本内容
} else {
  element.innerText = "新文本内容";
  console.log(element.innerText); // 读取文本内容
}
```

### innerText
```javascript
var element = document.getElementById("myElement");
element.innerText = "可见文本内容";
console.log(element.innerText); // 读取可见文本内容
```

## 操作元素属性

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

## 操作元素样式

```javascript
var element = document.getElementById("myElement");

// 设置内联样式
element.style.color = "red";
element.style.fontSize = "16px";
element.style.backgroundColor = "#f0f0f0";

// 获取计算样式
var computedStyle;
if (window.getComputedStyle) {
  computedStyle = window.getComputedStyle(element);
} else {
  // IE8及以下兼容
  computedStyle = element.currentStyle;
}
console.log(computedStyle.color);
console.log(computedStyle.fontSize);

// 操作类名 - ES5方式
function addClass(element, className) {
  if (element.className.indexOf(className) === -1) {
    element.className += " " + className;
  }
}

function removeClass(element, className) {
  var reg = new RegExp("(^|\\s)" + className + "(\\s|$)", "g");
  element.className = element.className.replace(reg, " ");
}

function toggleClass(element, className) {
  if (element.className.indexOf(className) === -1) {
    addClass(element, className);
  } else {
    removeClass(element, className);
  }
}

function hasClass(element, className) {
  return element.className.indexOf(className) !== -1;
}

// 使用示例
addClass(element, "newClass");
removeClass(element, "oldClass");
toggleClass(element, "active");
console.log(hasClass(element, "active"));
```

## 创建和删除元素

### 创建元素
```javascript
// 创建新元素
var newElement = document.createElement("div");

// 设置属性
newElement.id = "newDiv";
newElement.className = "box";

// 设置内容
// 兼容IE8及以下
if (newElement.textContent !== undefined) {
  newElement.textContent = "新创建的元素";
} else {
  newElement.innerText = "新创建的元素";
}

// 添加到文档
document.body.appendChild(newElement);
```

### 插入元素
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
```

### 删除元素
```javascript
var element = document.getElementById("toDelete");
element.parentNode.removeChild(element);
```

## DOM 事件处理

### 内联事件
```html
<!-- HTML中定义 -->
<button onclick="handleClick()">点击我</button>

<script>
function handleClick() {
  console.log("按钮被点击");
}
</script>
```

### DOM0级事件处理
```javascript
var button = document.getElementById("myButton");
button.onclick = function() {
  console.log("按钮被点击");
};

// 移除事件
button.onclick = null;
```

### DOM2级事件处理
```javascript
var button = document.getElementById("myButton");

function handleClick(event) {
  // 标准化事件对象
  event = event || window.event;
  
  console.log("按钮被点击");
  console.log("事件类型: " + event.type);
  console.log("目标元素: " + (event.target || event.srcElement));
}

// 兼容性添加事件监听
function addEvent(element, eventType, handler) {
  if (element.addEventListener) {
    // 标准浏览器
    element.addEventListener(eventType, handler, false);
  } else if (element.attachEvent) {
    // IE8及以下
    element.attachEvent('on' + eventType, handler);
  } else {
    // 最古老的方式
    element['on' + eventType] = handler;
  }
}

// 兼容性移除事件监听
function removeEvent(element, eventType, handler) {
  if (element.removeEventListener) {
    // 标准浏览器
    element.removeEventListener(eventType, handler, false);
  } else if (element.detachEvent) {
    // IE8及以下
    element.detachEvent('on' + eventType, handler);
  } else {
    // 最古老的方式
    element['on' + eventType] = null;
  }
}

// 使用示例
addEvent(button, "click", handleClick);
addEvent(button, "click", function() {
  console.log("另一个点击处理函数");
});

// 移除事件监听
removeEvent(button, "click", handleClick);
```

### 事件对象
```javascript
var button = document.getElementById("myButton");
addEvent(button, "click", function(event) {
  // 标准化事件对象
  event = event || window.event;
  
  // 阻止默认行为
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    // IE8及以下
    event.returnValue = false;
  }

  // 阻止事件冒泡
  if (event.stopPropagation) {
    event.stopPropagation();
  } else {
    // IE8及以下
    event.cancelBubble = true;
  }

  // 获取事件类型
  console.log(event.type); // "click"

  // 获取目标元素
  var target = event.target || event.srcElement;
  console.log("目标元素: " + target);

  // 获取当前元素
  var currentTarget = event.currentTarget || this;
  console.log("当前元素: " + currentTarget);

  // 获取鼠标位置
  console.log("X: " + event.clientX + ", Y: " + event.clientY);
});
```

### 事件委托
```javascript
var ul = document.getElementById("myList");
addEvent(ul, "click", function(event) {
  // 标准化事件对象
  event = event || window.event;
  
  // 检查事件目标是否是li元素
  var target = event.target || event.srcElement;
  if (target.tagName === "LI") {
    console.log("点击了列表项: " + (target.textContent || target.innerText));
  }
});
```

## DOM 遍历

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

## DOM 性能优化

### 减少DOM操作
```javascript
// 不好的做法: 多次修改DOM
var list = document.getElementById("myList");
for (var i = 0; i < 1000; i++) {
  var li = document.createElement("li");
  // 兼容IE8及以下
  if (li.textContent !== undefined) {
    li.textContent = "项目 " + i;
  } else {
    li.innerText = "项目 " + i;
  }
  list.appendChild(li);
}

// 好的做法: 使用文档片段
var fragment = document.createDocumentFragment();
for (var i = 0; i < 1000; i++) {
  var li = document.createElement("li");
  // 兼容IE8及以下
  if (li.textContent !== undefined) {
    li.textContent = "项目 " + i;
  } else {
    li.innerText = "项目 " + i;
  }
  fragment.appendChild(li);
}
list.appendChild(fragment);
```

### 缓存DOM查询
```javascript
// 不好的做法: 重复查询同一元素
for (var i = 0; i < 10; i++) {
  document.getElementById("myElement").textContent = "更新 " + i;
}

// 好的做法: 缓存查询结果
var element = document.getElementById("myElement");
for (var i = 0; i < 10; i++) {
  // 兼容IE8及以下
  if (element.textContent !== undefined) {
    element.textContent = "更新 " + i;
  } else {
    element.innerText = "更新 " + i;
  }
}
```

### 使用事件委托

如前所述，事件委托可以减少事件监听器的数量，提高性能。在ES5环境下，结合我们之前实现的addEvent函数，可以实现跨浏览器兼容的事件委托。

DOM是前端开发的核心，掌握DOM操作对于创建交互性Web应用程序至关重要。在ES5环境下，开发人员需要特别注意浏览器兼容性问题，通过使用polyfill或自定义兼容函数来解决不同浏览器之间的差异。