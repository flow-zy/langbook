# Vue 2 响应式系统

Vue 2的响应式系统是其核心特性之一，它允许数据变化时自动更新视图。

## 响应式原理

Vue 2通过`Object.defineProperty`来实现响应式系统。当你把一个普通的JavaScript对象传入Vue实例作为`data`选项，Vue将遍历此对象所有的属性，并使用`Object.defineProperty`把这些属性全部转为getter/setter。

```javascript
var data = {
  name: 'Vue'
}

Object.keys(data).forEach(function(key) {
  Object.defineProperty(data, key, {
    get: function() {
      console.log('getter called');
      return value;
    },
    set: function(newValue) {
      console.log('setter called with', newValue);
      value = newValue;
      // 更新视图的逻辑
    }
  })
})
```

## 响应式数据变化检测

### 对象变化检测

Vue无法检测对象属性的添加或删除。由于Vue会在初始化实例时对属性执行getter/setter转化过程，所以属性必须在`data`对象上存在才能让Vue转换它，这样才能让它是响应式的。

```javascript
var vm = new Vue({
  data:{
    a: 1
  }
})
// `vm.a` 是响应式的

vm.b = 2
// `vm.b` 不是响应式的
```

要解决这个问题，你可以使用`Vue.set`方法：

```javascript
Vue.set(vm.someObject, 'b', 2)
```

### 数组变化检测

Vue对数组的以下方法进行了包裹，使它们也能触发视图更新：
- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

```javascript
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
vm.items.push('d') // 会触发视图更新
```

然而，Vue不能检测以下数组的变动：
1. 当你利用索引直接设置一个数组项时，例如：`vm.items[indexOfItem] = newValue`
2. 当你修改数组的长度时，例如：`vm.items.length = newLength`

对于第一种情况，可以使用`Vue.set`或`splice`方法：

```javascript
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)

// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
```

## 计算属性和监听器

### 计算属性缓存

计算属性是基于它们的依赖进行缓存的。只在相关依赖发生改变时才会重新求值。

```javascript
var vm = new Vue({
  data: { a: 1 },
  computed: {
    // 计算属性的 getter
    aDouble: function () {
      return this.a * 2
    }
  }
})
```

### 监听器

当你需要在数据变化时执行异步或开销较大的操作时，监听器是最有用的。

```javascript
var vm = new Vue({
  data: {
    question: '',
    answer: 'I cannot give you an answer until you ask a question!'
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    question: function (newQuestion, oldQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.getAnswer()
    }
  }
})
```