# BOM (Browser Object Model)

BOM（浏览器对象模型）是JavaScript与浏览器交互的接口，它提供了访问和操作浏览器窗口、导航、历史记录等功能的对象和方法。

## window 对象

`window` 对象是BOM的核心，它表示浏览器的一个窗口或标签页。所有的BOM对象都是 `window` 对象的属性。

```javascript
// 访问window对象的属性和方法
console.log(window.innerWidth); // 窗口的内部宽度
console.log(window.innerHeight); // 窗口的内部高度
window.alert("Hello, World!"); // 显示警告框
```

### 全局作用域

在浏览器中，全局对象就是 `window` 对象，全局变量和函数会成为 `window` 对象的属性和方法：

```javascript
var globalVar = "全局变量";
console.log(window.globalVar); // "全局变量"

function globalFunction() {
  console.log("全局函数");
}

window.globalFunction(); // "全局函数"
```

## 导航和打开窗口

```javascript
// 打开新窗口
var newWindow = window.open("https://www.example.com", "_blank", "width=500,height=500");

// 关闭窗口
// newWindow.close();

// 移动窗口
// newWindow.moveTo(100, 100);

// 调整窗口大小
// newWindow.resizeTo(800, 600);
```

## location 对象

`location` 对象提供了当前窗口的URL信息，并允许导航到新的URL。

```javascript
// 获取URL信息
console.log(location.href); // 完整URL
console.log(location.protocol); // 协议 (http: 或 https:)
console.log(location.host); // 主机名和端口号
console.log(location.hostname); // 主机名
console.log(location.port); // 端口号
console.log(location.pathname); // 路径
console.log(location.search); // 查询字符串
console.log(location.hash); // 锚点

// 导航到新URL
location.href = "https://www.example.com"; // 跳转
location.assign("https://www.example.com"); // 跳转
location.replace("https://www.example.com"); // 替换当前历史记录
location.reload(); // 重新加载页面
```

## history 对象

`history` 对象提供了浏览器的历史记录信息，允许在历史记录中前进和后退。

```javascript
// 后退
history.back();
// 前进
history.forward();
// 移动到指定历史记录
history.go(-2); // 后退2步
history.go(1); // 前进一步

// 获取历史记录数量
console.log(history.length);
```

## navigator 对象

`navigator` 对象提供了浏览器的信息，如浏览器类型、版本、操作系统等。

```javascript
// 获取浏览器信息
console.log(navigator.userAgent); // 用户代理字符串
console.log(navigator.appName); // 浏览器名称
console.log(navigator.appVersion); // 浏览器版本
console.log(navigator.platform); // 操作系统平台
console.log(navigator.language); // 浏览器语言

// 检查功能支持
console.log(navigator.geolocation); // 地理位置API
console.log(navigator.cookieEnabled); // 是否启用Cookie
```

## screen 对象

`screen` 对象提供了用户屏幕的信息，如屏幕尺寸、颜色深度等。

```javascript
// 获取屏幕信息
console.log(screen.width); // 屏幕宽度
console.log(screen.height); // 屏幕高度
console.log(screen.availWidth); // 可用屏幕宽度
console.log(screen.availHeight); // 可用屏幕高度
console.log(screen.colorDepth); // 颜色深度
console.log(screen.pixelDepth); // 像素深度
```

## 弹出框

```javascript
// 警告框
window.alert("这是一个警告框");

// 确认框
var isConfirmed = window.confirm("你确定要删除吗?");
if (isConfirmed) {
  console.log("用户确认删除");
} else {
  console.log("用户取消删除");
}

// 提示框
var userInput = window.prompt("请输入你的名字:", "John Doe");
if (userInput !== null) {
  console.log("用户输入: " + userInput);
} else {
  console.log("用户取消输入");
}
```

## 定时器

```javascript
// setTimeout - 在指定时间后执行一次
var timeoutId = setTimeout(function() {
  console.log("1秒后执行");
}, 1000);

// 清除定时器
// clearTimeout(timeoutId);

// setInterval - 每隔指定时间执行一次
var intervalId = setInterval(function() {
  console.log("每隔1秒执行一次");
}, 1000);

// 清除间隔定时器
// clearInterval(intervalId);
```

## 事件监听

在ES5中，可以使用以下方式监听事件：

```javascript
// 方法1: 使用onxxx属性
window.onload = function() {
  console.log("页面加载完成");
};

window.onresize = function() {
  console.log("窗口大小变化: " + window.innerWidth + "x" + window.innerHeight);
};

window.onscroll = function() {
  console.log("滚动位置: " + window.scrollY);
};

// 方法2: 使用addEventListener (DOM2级事件模型)
window.addEventListener("load", function() {
  console.log("页面加载完成");
});

window.addEventListener("resize", function() {
  console.log("窗口大小变化: " + window.innerWidth + "x" + window.innerHeight);
});

window.addEventListener("scroll", function() {
  console.log("滚动位置: " + window.scrollY);
});
```

## BOM 的兼容性问题

不同浏览器的BOM实现可能存在差异，导致兼容性问题：

```javascript
// 检查浏览器是否支持某个API
if ('geolocation' in navigator) {
  // 支持地理位置API
  navigator.geolocation.getCurrentPosition(function(position) {
    console.log("纬度: " + position.coords.latitude);
    console.log("经度: " + position.coords.longitude);
  });
} else {
  console.log("浏览器不支持地理位置API");
}

// 处理IE8及以下版本的兼容性问题
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

// 使用兼容性函数
addEvent(window, 'load', function() {
  console.log("页面加载完成(兼容版)");
});
```

BOM提供了丰富的接口与浏览器进行交互，掌握BOM对于开发Web应用程序非常重要。但需要注意，BOM不是ECMAScript标准的一部分，因此不同浏览器的实现可能存在差异。在ES5环境下，开发人员需要特别注意浏览器兼容性问题。