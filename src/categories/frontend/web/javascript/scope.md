# 作用域 (Scope)

作用域是JavaScript中决定变量可访问性和生命周期的规则。它定义了代码中变量和函数的可见性，以及它们在何时何地可以被访问。

## 全局作用域

在任何函数外部声明的变量具有全局作用域，可以在代码的任何地方访问：

```javascript
// 全局变量
var globalVar = "我是全局变量";

function myFunction() {
  console.log(globalVar); // 可以访问全局变量
}

myFunction(); // 输出: "我是全局变量"
console.log(globalVar); // 输出: "我是全局变量"
```

在浏览器环境中，全局变量会成为 `window` 对象的属性：

```javascript
var globalVar = "全局变量";
console.log(window.globalVar); // "全局变量"
```

## 函数作用域

在函数内部声明的变量具有函数作用域，只能在函数内部访问：

```javascript
function myFunction() {
  // 函数内部变量
  var localVar = "我是函数内部变量";
  console.log(localVar); // 可以访问
}

myFunction(); // 输出: "我是函数内部变量"
console.log(localVar); // 报错: localVar is not defined
```

函数参数也具有函数作用域：

```javascript
function greet(name) {
  // name参数只在函数内部可见
  console.log("Hello, " + name);
}

greet("World"); // 输出: "Hello, World"
console.log(name); // 报错: name is not defined
```

## 作用域链

当在函数内部访问变量时，JavaScript会先在当前函数作用域中查找，如果找不到，则会向上级作用域查找，直到找到该变量或到达全局作用域：

```javascript
var globalVar = "全局变量";

function outerFunction() {
  var outerVar = "外部函数变量";

  function innerFunction() {
    var innerVar = "内部函数变量";
    console.log(innerVar); // "内部函数变量"
    console.log(outerVar); // "外部函数变量"
    console.log(globalVar); // "全局变量"
  }

  innerFunction();
}

outerFunction();
```

作用域链的查找是单向的，只能从内层作用域向外层作用域查找，不能反向查找：

```javascript
function outerFunction() {
  var outerVar = "外部函数变量";

  function innerFunction() {
    var innerVar = "内部函数变量";
    // 可以访问outerVar和全局变量
  }

  // 无法访问innerVar
  console.log(innerVar); // 报错: innerVar is not defined
}
```

## 变量提升

使用 `var` 声明的变量会被提升到其作用域的顶部，但赋值不会被提升：

```javascript
console.log(hoistedVar); // undefined (变量被提升，但值未被提升)
var hoistedVar = "我被提升了";
console.log(hoistedVar); // "我被提升了"

// 等同于以下代码
var hoistedVar;
console.log(hoistedVar); // undefined
hoistedVar = "我被提升了";
console.log(hoistedVar); // "我被提升了"
```

未使用var声明的变量会自动成为全局变量，即使在函数内部声明：

```javascript
function myFunction() {
  // 没有使用var声明，成为全局变量
  undeclaredVar = "我是隐式全局变量";
}

myFunction();
console.log(undeclaredVar); // 输出: "我是隐式全局变量"
```

## 函数提升

函数声明也会被提升到其作用域的顶部：

```javascript
myFunction(); // 输出: "函数被提升了"

function myFunction() {
  console.log("函数被提升了");
}
```

但函数表达式不会被提升：

```javascript
myFunctionExpression(); // 报错: myFunctionExpression is not a function

var myFunctionExpression = function() {
  console.log("函数表达式不会被提升");
};
```

## 词法作用域

JavaScript 使用词法作用域（静态作用域），这意味着变量的作用域在代码编写时就已经确定，而不是在运行时：

```javascript
function outer() {
  var x = 10;
  function inner() {
    console.log(x); // 10，inner函数在定义时就捕获了outer函数的作用域
  }
  return inner;
}

var innerFn = outer();
innerFn(); // 仍然可以访问x变量
```

词法作用域意味着函数的作用域由其定义位置决定，而不是调用位置：

```javascript
var x = 10;

function outer() {
  var x = 20;
  function inner() {
    console.log(x); // 20，取决于定义位置
  }
  return inner;
}

var innerFn = outer();
innerFn(); // 输出: 20
```

## 避免全局变量污染

过多的全局变量会导致命名冲突和代码维护困难，以下是避免全局变量污染的方法：

```javascript
// 方法1: 使用立即执行函数表达式(IIFE)
(function() {
  var privateVar = "私有变量";
  // 在IIFE内部定义的变量不会污染全局作用域
})();

// 方法2: 使用命名空间
var myApp = {
  variable1: "值1",
  variable2: "值2",
  function1: function() {
    // ...
  }
};

// 方法3: 使用模块模式
var myModule = (function() {
  // 私有变量
  var privateVar = "私有变量";
  
  // 私有函数
  function privateFunction() {
    return privateVar;
  }
  
  // 暴露公共接口
  return {
    publicMethod: function() {
      return privateFunction();
    },
    publicVar: "公共变量"
  };
})();
```

## 常见问题与解答

### 1. 变量提升会导致什么问题？

变量提升可能导致变量在声明前被访问，从而引发意外行为。例如：

```javascript
var x = 10;

function test() {
  console.log(x); // undefined
  var x = 20;
  console.log(x); // 20
}

test();
```

上面的代码中，函数内部的`x`被提升，但值未被提升，所以第一次输出`undefined`。

### 2. 如何区分函数声明和函数表达式？

函数声明以`function`关键字开头，而函数表达式则是将函数赋值给变量：

```javascript
// 函数声明
function myFunction() {
  // ...
}

// 函数表达式
var myFunctionExpression = function() {
  // ...
};
```

函数声明会被提升，而函数表达式不会被提升。

### 3. 什么是闭包？它与作用域有什么关系？

闭包是指函数能够访问其词法作用域之外的变量，即使该函数在其定义作用域之外被执行。闭包的形成依赖于词法作用域：

```javascript
function outer() {
  var outerVar = "外部变量";
  
  function inner() {
    console.log(outerVar); // 访问外部变量
  }
  
  return inner;
}

var innerFn = outer();
innerFn(); // 输出: "外部变量"
```

### 4. 如何在ES5中模拟块级作用域？

虽然ES5没有原生的块级作用域，但可以使用IIFE模拟：

```javascript
// 使用IIFE模拟块级作用域
(function() {
  var blockVar = "块级变量";
  console.log(blockVar); // 可以访问
})();

console.log(blockVar); // 报错: blockVar is not defined
```

### 5. 什么是作用域链查找机制？

当访问一个变量时，JavaScript会先在当前作用域中查找，如果找不到，则会向上级作用域查找，直到找到该变量或到达全局作用域。如果在全局作用域中仍未找到，则会抛出引用错误。