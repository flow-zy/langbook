# Promise

ES6引入了Promise对象，用于处理异步操作。Promise提供了一种优雅的方式来处理异步代码，避免了回调地狱（Callback Hell），使代码更加清晰和可维护。本章将详细介绍Promise的特性和使用方法。

## 设计目标与核心价值

Promise的设计目标是：

1. **解决回调地狱**：避免嵌套回调函数，使异步代码更加扁平
2. **统一异步处理方式**：为各种异步操作提供统一的API
3. **支持链式调用**：允许异步操作按顺序执行
4. **处理异步错误**：提供更好的错误处理机制
5. **支持并发操作**：便于处理多个异步操作

Promise的核心价值在于它改变了JavaScript中异步代码的编写方式，使异步代码更加接近同步代码的结构，提高了代码的可读性和可维护性。

## Promise的基本概念

Promise是一个对象，代表一个异步操作的最终完成（或失败）及其结果值。Promise有三种状态：

- **pending**：初始状态，既不是成功，也不是失败
- **fulfilled**：操作成功完成
- **rejected**：操作失败

一旦Promise的状态改变，就会永久保持该状态，不会再发生变化。

## Promise的基本用法

### 1. 创建Promise

使用Promise构造函数创建Promise对象：

```javascript
const promise = new Promise((resolve, reject) => {
  // 异步操作
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve('操作成功');
    } else {
      reject(new Error('操作失败'));
    }
  }, 1000);
});
```

### 2. 使用Promise

使用then()方法处理成功状态，catch()方法处理失败状态：

```javascript
promise
  .then(value => {
    console.log('成功:', value);
  })
  .catch(error => {
    console.log('失败:', error.message);
  });
```

## Promise的方法

### 1. Promise.prototype.then()

then()方法返回一个新的Promise，可以链式调用：

```javascript
const promise = new Promise(resolve => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

promise
  .then(value => {
    console.log(value); // 1
    return value + 1;
  })
  .then(value => {
    console.log(value); // 2
    return value + 1;
  })
  .then(value => {
    console.log(value); // 3
  });
```

### 2. Promise.prototype.catch()

catch()方法用于处理Promise的拒绝状态，相当于then(null, rejection)：

```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('操作失败'));
  }, 1000);
});

promise
  .catch(error => {
    console.log('捕获到错误:', error.message);
  });
```

### 3. Promise.prototype.finally()

finally()方法用于指定不管Promise最后状态如何，都会执行的回调函数：

```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('操作成功');
  }, 1000);
});

promise
  .then(value => {
    console.log('成功:', value);
  })
  .catch(error => {
    console.log('失败:', error.message);
  })
  .finally(() => {
    console.log('操作完成');
  });
```

### 4. Promise.all()

Promise.all()方法用于将多个Promise实例包装成一个新的Promise实例，只有当所有Promise都成功时才成功，否则失败：

```javascript
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.resolve(3);

Promise.all([promise1, promise2, promise3])
  .then(values => {
    console.log(values); // [1, 2, 3]
  });
```

### 5. Promise.race()

Promise.race()方法用于将多个Promise实例包装成一个新的Promise实例，只要有一个Promise状态改变，就会跟着改变：

```javascript
const promise1 = new Promise(resolve => {
  setTimeout(() => resolve(1), 1000);
});
const promise2 = new Promise(resolve => {
  setTimeout(() => resolve(2), 500);
});

Promise.race([promise1, promise2])
  .then(value => {
    console.log(value); // 2 (因为promise2先完成)
  });
```

### 6. Promise.resolve()

Promise.resolve()方法返回一个已解决的Promise对象：

```javascript
const promise = Promise.resolve('成功');
promise.then(value => {
  console.log(value); // '成功'
});
```

### 7. Promise.reject()

Promise.reject()方法返回一个已拒绝的Promise对象：

```javascript
const promise = Promise.reject(new Error('失败'));
promise.catch(error => {
  console.log(error.message); // '失败'
});
```

## Promise的应用场景

### 1. 处理异步请求

Promise常用于处理网络请求等异步操作：

```javascript
function fetchData(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error(xhr.statusText));
      }
    };
    xhr.onerror = () => {
      reject(new Error('网络错误'));
    };
    xhr.send();
  });
}

fetchData('https://api.example.com/data')
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log(error.message);
  });
```

### 2. 串行执行异步操作

使用Promise的链式调用可以串行执行多个异步操作：

```javascript
function asyncOperation1() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('操作1完成');
      resolve(1);
    }, 1000);
  });
}

function asyncOperation2(value) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('操作2完成');
      resolve(value + 1);
    }, 1000);
  });
}

function asyncOperation3(value) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('操作3完成');
      resolve(value + 1);
    }, 1000);
  });
}

asyncOperation1()
  .then(value => asyncOperation2(value))
  .then(value => asyncOperation3(value))
  .then(value => {
    console.log('最终结果:', value); // 3
  });
```

### 3. 并行执行异步操作

使用Promise.all()可以并行执行多个异步操作：

```javascript
Promise.all([
  asyncOperation1(),
  asyncOperation2(0),
  asyncOperation3(0)
])
  .then(values => {
    console.log('所有操作完成:', values); // [1, 1, 1]
  });
```

### 4. 处理异步操作超时

使用Promise.race()可以处理异步操作超时：

```javascript
function timeoutPromise(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('操作超时'));
    }, ms);
  });
}

Promise.race([
  fetchData('https://api.example.com/data'),
  timeoutPromise(5000)
])
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log(error.message);
  });
```

## 注意事项与最佳实践

### 1. 避免Promise嵌套

虽然Promise比回调函数更优雅，但仍然要避免嵌套Promise：

```javascript
// 不推荐
fetchData('https://api.example.com/data1')
  .then(data1 => {
    fetchData('https://api.example.com/data2')
      .then(data2 => {
        // 嵌套Promise
      });
  });

// 推荐
fetchData('https://api.example.com/data1')
  .then(data1 => {
    return fetchData('https://api.example.com/data2');
  })
  .then(data2 => {
    // 链式调用
  });
```

### 2. 始终处理错误

不要忽略Promise的错误处理，否则可能导致错误无法被捕获：

```javascript
// 不推荐
fetchData('https://api.example.com/data')
  .then(data => {
    console.log(data);
  });

// 推荐
fetchData('https://api.example.com/data')
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log(error.message);
  });
```

### 3. 使用Promise.all()处理多个异步操作

当需要并行执行多个异步操作时，优先使用Promise.all()：

```javascript
// 不推荐
let result1, result2;
fetchData('https://api.example.com/data1')
  .then(data => {
    result1 = data;
    return fetchData('https://api.example.com/data2');
  })
  .then(data => {
    result2 = data;
    // 处理结果
  });

// 推荐
Promise.all([
  fetchData('https://api.example.com/data1'),
  fetchData('https://api.example.com/data2')
])
  .then(([data1, data2]) => {
    // 处理结果
  });
```

### 4. 注意Promise的状态一旦改变就不能再变

Promise的状态一旦从pending变为fulfilled或rejected，就会永久保持该状态：

```javascript
const promise = new Promise(resolve => {
  resolve('成功');
  resolve('再次成功'); // 无效，不会改变Promise的状态
});

promise.then(value => {
  console.log(value); // '成功'
});
```

### 5. 与async/await结合使用

在ES2017中引入的async/await语法是基于Promise的更简洁的异步编程解决方案：

```javascript
async function fetchDataAsync() {
  try {
    const data = await fetchData('https://api.example.com/data');
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
}

fetchDataAsync();
```

## 总结

### 核心要点回顾

1. Promise是用于处理异步操作的对象，有pending、fulfilled、rejected三种状态
2. Promise的状态一旦改变，就会永久保持该状态
3. then()方法用于处理成功状态，catch()方法用于处理失败状态，finally()方法用于处理无论成功或失败都会执行的操作
4. Promise.all()用于并行执行多个异步操作，只有当所有操作都成功时才成功
5. Promise.race()用于并行执行多个异步操作，只要有一个操作完成就会返回结果
6. Promise.resolve()和Promise.reject()用于快速创建已解决或已拒绝的Promise

### 主要优势

1. **解决回调地狱**：避免嵌套回调函数，使代码更加扁平
2. **统一异步处理方式**：为各种异步操作提供统一的API
3. **支持链式调用**：允许异步操作按顺序执行
4. **更好的错误处理**：提供集中式的错误处理机制
5. **便于组合**：可以轻松组合多个异步操作

### 实践建议

1. 优先使用Promise处理异步操作，避免使用回调函数
2. 始终使用catch()方法处理Promise的错误
3. 使用Promise.all()并行执行多个独立的异步操作，提高性能
4. 避免Promise嵌套，使用链式调用使代码更加清晰
5. 在现代JavaScript中，可以使用async/await语法进一步简化Promise的使用
6. 注意Promise的状态一旦改变就不能再变的特性

Promise是ES6中引入的一个重要特性，它彻底改变了JavaScript中异步代码的编写方式。掌握Promise的使用，可以帮助你编写更清晰、更可维护的异步代码，避免回调地狱的问题。