# 闭包 (Closure)

闭包是JavaScript中的一个重要概念，它允许函数访问并操作其词法作用域之外的变量。理解闭包对于掌握JavaScript的作用域、内存管理和高级编程技巧至关重要。

## 闭包的定义

闭包是指函数能够记住并访问其词法作用域，即使该函数在其词法作用域之外执行。在ES5中，闭包是实现数据封装和模块化的重要手段。

```javascript
function outer() {
  var outerVar = "我是外部变量";

  function inner() {
    console.log(outerVar); // 访问外部变量
  }

  return inner;
}

var innerFn = outer();
innerFn(); // 输出: "我是外部变量" (即使outer函数已经执行完毕)
```

## 闭包的工作原理

1. 函数在定义时会捕获其词法环境（包括所有局部变量、函数声明和参数）
2. 当函数在其词法作用域之外执行时，它仍然可以访问该词法环境中的变量
3. 这些变量不会被垃圾回收机制回收，因为闭包仍然引用着它们

## 闭包的用途

### 数据封装

闭包可以用于创建私有变量和方法，实现信息隐藏：

```javascript
function createCounter() {
  var count = 0; // 私有变量

  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

var counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
console.log(counter.getCount()); // 1
console.log(count); // 报错: count is not defined
```

### 函数工厂

闭包可以用于创建具有特定行为的函数，根据参数生成不同功能的函数：

```javascript
function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

var double = createMultiplier(2);
var triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

### 延迟执行

闭包可以用于延迟执行代码，如定时器、事件处理程序等：

```javascript
function delay(message, delayTime) {
  setTimeout(function() {
    console.log(message);
  }, delayTime);
}

delay("延迟执行的消息", 1000); // 1秒后输出: "延迟执行的消息"
```

## 闭包与循环

在循环中使用闭包需要特别注意，特别是在使用var声明变量时，由于var的函数作用域特性，可能会导致意外的结果：

```javascript
// 问题代码
for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i); // 输出5次5，而不是0,1,2,3,4
  }, 1000);
}
// 原因：setTimeout回调函数执行时，循环已经结束，i的值为5

// 解决方案1: 使用IIFE(立即执行函数表达式)
for (var i = 0; i < 5; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j); // 输出: 0,1,2,3,4
    }, 1000);
  })(i);
}
// 原理：每次循环创建一个新的作用域，保存当前i的值

// 解决方案2: 额外定义函数
for (var i = 0; i < 5; i++) {
  function createTimeout(j) {
    setTimeout(function() {
      console.log(j); // 输出: 0,1,2,3,4
    }, 1000);
  }
  createTimeout(i);
}
// 原理：与IIFE类似，每次调用函数创建新作用域
```

## 闭包与内存管理

闭包会引用其词法环境中的变量，导致这些变量不会被垃圾回收机制回收。如果过度使用闭包，可能会导致内存泄漏：

```javascript
function createLargeClosure() {
  var largeArray = new Array(1000000).fill(0); // 大数组

  return function() {
    return largeArray.length;
  };
}

var closure = createLargeClosure();
// 即使createLargeClosure函数已经执行完毕，largeArray仍然不会被回收
```

为了避免内存泄漏，当不再需要闭包时，应该将其设置为null，释放对闭包的引用：

```javascript
closure = null; // 现在largeArray可以被垃圾回收机制回收
```

## 闭包中的this

在闭包中使用this需要特别注意，因为this的值取决于函数的调用方式，而不是定义方式：

```javascript
var obj = {
  name: "对象名称",
  getName: function() {
    // 保存this引用
    var self = this;
    
    // 内部函数（闭包）
    return function() {
      return self.name; // 使用self而不是this
    };
  }
};

var getNameFn = obj.getName();
console.log(getNameFn()); // "对象名称"
```

如果直接在闭包中使用this，可能会指向全局对象（在浏览器中是window）：

```javascript
var obj = {
  name: "对象名称",
  getName: function() {
    // 内部函数（闭包）
    return function() {
      return this.name; // 这里的this指向全局对象
    };
  }
};

var getNameFn = obj.getName();
console.log(getNameFn()); // undefined (浏览器环境下)
```

## 闭包的实际应用

### 防抖与节流

```javascript
// 防抖函数：在事件触发n秒后执行回调，若n秒内再次触发则重新计时
function debounce(func, wait) {
  var timeout;
  return function() {
    var context = this;
    var args = arguments;
    
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      func.apply(context, args);
    }, wait);
  };
}

// 节流函数：在规定时间内只能执行一次回调
function throttle(func, wait) {
  var lastTime = 0;
  return function() {
    var context = this;
    var args = arguments;
    var now = Date.now();
    
    if (now - lastTime >= wait) {
      func.apply(context, args);
      lastTime = now;
    }
  };
}
```

### 模块模式

模块模式是闭包的重要应用，可以创建独立的命名空间和私有变量：

```javascript
var module = (function() {
  var privateVar = "私有变量";

  function privateFunction() {
    return privateVar;
  }

  return {
    publicMethod: function() {
      return privateFunction();
    },
    publicVar: "公共变量"
  };
})();

console.log(module.publicMethod()); // "私有变量"
console.log(module.publicVar); // "公共变量"
console.log(module.privateVar); // undefined
console.log(module.privateFunction); // undefined
```

## 常见问题与解答

### Q: 闭包会导致内存泄漏吗？

A: 闭包本身不会导致内存泄漏，但如果闭包长期持有对大量数据的引用，而这些数据又不再需要使用，就可能导致内存泄漏。解决方法是在不再需要闭包时，将其引用设置为null。

### Q: 闭包中的变量是如何存储的？

A: 闭包中的变量存储在函数的词法环境中，而不是在栈上。当函数执行完毕后，其词法环境不会被销毁，因为闭包仍然引用着它。

### Q: 如何在闭包中访问正确的this？

A: 有几种方法：
1. 在外部函数中保存this引用（如var self = this）
2. 使用bind方法绑定this
3. 使用apply/call方法传递this

### Q: 闭包与作用域有什么关系？

A: 闭包依赖于词法作用域。函数在定义时会捕获其词法作用域，闭包就是函数与其词法作用域的组合。即使函数在其词法作用域之外执行，它仍然可以访问该作用域中的变量。