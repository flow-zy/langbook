# 装饰器

装饰器（Decorators）是ES2022正式引入的一个强大特性，它提供了一种声明式语法，允许我们通过添加标记的方式修改类、方法、属性等的行为。装饰器本质上是一个函数，它接收被装饰的对象作为参数，并返回修改后的对象。

## 设计目标与核心价值

装饰器的设计旨在解决以下问题：

1. **横切关注点**：分离与核心业务逻辑无关但又遍布应用各处的代码（如日志、验证、缓存等）
2. **声明式编程**：提供更简洁、更可读的方式来增强类和类成员的行为
3. **代码复用**：封装常用功能，使其可以轻松应用于不同的类和方法
4. **元编程**：允许在运行时修改类和类成员的行为
5. **框架扩展**：为框架开发者提供一种灵活的方式来扩展和定制框架行为

装饰器的核心价值在于它使得开发者可以以一种非侵入式的方式增强代码功能，同时保持代码的清晰性和可维护性。

## 基本语法

装饰器使用`@`符号加装饰器函数名的形式，放置在被装饰对象的上方。

```javascript
// 装饰器函数
function decorator(target) {
  // 修改target
  target.decorated = true;
  return target;
}

// 使用装饰器
@decorator
class MyClass {
  // ...
}

console.log(MyClass.decorated); // true
```

## 类装饰器

类装饰器应用于类声明，接收类构造函数作为参数。

### 基本用法

```javascript
function logClass(target) {
  console.log(`装饰类: ${target.name}`);
  return target;
}

@logClass
class Person {
  constructor(name) {
    this.name = name;
  }
}
// 输出: '装饰类: Person'
```

### 带参数的装饰器

装饰器可以带参数，这需要创建一个装饰器工厂函数。

```javascript
function logClassWithPrefix(prefix) {
  return function(target) {
    console.log(`${prefix}: ${target.name}`);
    return target;
  };
}

@logClassWithPrefix('日志')
class Person {
  constructor(name) {
    this.name = name;
  }
}
// 输出: '日志: Person'
```

## 方法装饰器

方法装饰器应用于类的方法，接收三个参数：目标类、方法名、方法描述符。

### 基本用法

```javascript
function logMethod(target, methodName, descriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function(...args) {
    console.log(`调用方法: ${methodName}, 参数: ${args}`);
    return originalMethod.apply(this, args);
  };

  return descriptor;
}

class Person {
  constructor(name) {
    this.name = name;
  }

  @logMethod
  sayHello(message) {
    return `${this.name} says: ${message}`;
  }
}

const john = new Person('John');
console.log(john.sayHello('Hello world'));
// 输出: '调用方法: sayHello, 参数: Hello world'
// 返回: 'John says: Hello world'
```

### 防抖和节流装饰器

```javascript
// 防抖装饰器
function debounce(delay) {
  return function(target, methodName, descriptor) {
    const originalMethod = descriptor.value;
    let timeout;

    descriptor.value = function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        originalMethod.apply(this, args);
      }, delay);
    };

    return descriptor;
  };
}

// 节流装饰器
function throttle(interval) {
  return function(target, methodName, descriptor) {
    const originalMethod = descriptor.value;
    let lastCall = 0;

    descriptor.value = function(...args) {
      const now = Date.now();
      if (now - lastCall >= interval) {
        lastCall = now;
        originalMethod.apply(this, args);
      }
    };

    return descriptor;
  };
}

class SearchBox {
  constructor() {
    this.query = '';
  }

  @debounce(500)
  search(query) {
    this.query = query;
    console.log(`搜索: ${query}`);
  }

  @throttle(1000)
  scroll() {
    console.log('滚动事件触发');
  }
}
```

## 属性装饰器

属性装饰器应用于类的属性，接收两个参数：目标类、属性名。

```javascript
function logProperty(target, propertyName) {
  let value;

  // 定义属性描述符
  const descriptor = {
    get() {
      console.log(`访问属性: ${propertyName}`);
      return value;
    },
    set(newValue) {
      console.log(`设置属性: ${propertyName}, 值: ${newValue}`);
      value = newValue;
    },
    enumerable: true,
    configurable: true
  };

  // 定义属性
  Object.defineProperty(target, propertyName, descriptor);
}

class Person {
  @logProperty
  name;

  constructor(name) {
    this.name = name;
  }
}

const john = new Person('John');
// 输出: '设置属性: name, 值: John'

console.log(john.name);
// 输出: '访问属性: name', 返回: 'John'

john.name = 'Jane';
// 输出: '设置属性: name, 值: Jane'
```

## 访问器装饰器

访问器装饰器应用于类的访问器属性（getter和setter），接收三个参数：目标类、属性名、属性描述符。

```javascript
function logAccessor(target, propertyName, descriptor) {
  const originalGet = descriptor.get;
  const originalSet = descriptor.set;

  descriptor.get = function() {
    console.log(`获取属性: ${propertyName}`);
    return originalGet.call(this);
  };

  descriptor.set = function(value) {
    console.log(`设置属性: ${propertyName}, 值: ${value}`);
    originalSet.call(this, value);
  };

  return descriptor;
}

class Person {
  constructor(name) {
    this._name = name;
  }

  @logAccessor
  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }
}

const john = new Person('John');
console.log(john.name);
// 输出: '获取属性: name', 返回: 'John'

john.name = 'Jane';
// 输出: '设置属性: name, 值: Jane'
```

## 装饰器组合

多个装饰器可以组合使用，按照从下到上的顺序应用。

```javascript
function decorator1(target) {
  console.log('装饰器1应用');
  target.decorator1 = true;
  return target;
}

function decorator2(target) {
  console.log('装饰器2应用');
  target.decorator2 = true;
  return target;
}

@decorator1
@decorator2
class MyClass {
  // ...
}
// 输出: '装饰器2应用'
// 输出: '装饰器1应用'

console.log(MyClass.decorator1); // true
console.log(MyClass.decorator2); // true
```

## 应用场景

### 1. 日志记录

```javascript
function log(target, methodName, descriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function(...args) {
    console.log(`[${new Date().toISOString()}] 调用方法: ${methodName}, 参数: ${JSON.stringify(args)}`);
    const result = originalMethod.apply(this, args);
    console.log(`[${new Date().toISOString()}] 方法 ${methodName} 返回: ${JSON.stringify(result)}`);
    return result;
  };

  return descriptor;
}

class UserService {
  @log
  getUserById(id) {
    // 模拟数据库查询
    return { id, name: `User ${id}` };
  }
}

const userService = new UserService();
userService.getUserById(1);
// 输出日志
```

### 2. 性能监控

```javascript
function measurePerformance(target, methodName, descriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function(...args) {
    const start = Date.now();
    const result = originalMethod.apply(this, args);
    const end = Date.now();
    console.log(`方法 ${methodName} 执行时间: ${end - start}ms`);
    return result;
  };

  return descriptor;
}

class DataProcessor {
  @measurePerformance
  processLargeData(data) {
    // 模拟处理大数据
    let result = 0;
    for (let i = 0; i < data.length; i++) {
      result += data[i];
    }
    return result;
  }
}
```

### 3. 权限验证

```javascript
function requirePermission(permission) {
  return function(target, methodName, descriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args) {
      // 模拟权限检查
      const hasPermission = this.permissions && this.permissions.includes(permission);
      if (!hasPermission) {
        throw new Error(`没有权限执行 ${methodName} 方法`);
      }
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

class AdminService {
  constructor(permissions) {
    this.permissions = permissions;
  }

  @requirePermission('admin:read')
  getUsers() {
    return ['用户1', '用户2', '用户3'];
  }

  @requirePermission('admin:write')
  createUser(user) {
    return { id: 1, ...user };
  }
}
```

## 注意事项与最佳实践

装饰器虽然强大，但在使用时也需要注意一些事项，以避免常见的陷阱并充分发挥其优势。

### 执行顺序

多个装饰器应用于同一个对象时，它们的执行顺序是从下到上（或从右到左）。这可能会影响装饰器的行为，尤其是当装饰器之间有依赖关系时。

```javascript
@decorator1
@decorator2
class MyClass {}
// 先执行 decorator2，再执行 decorator1
```

### 性能考虑

装饰器会在运行时增加额外的函数调用，对于性能敏感的应用，尤其是频繁调用的方法，需要谨慎使用装饰器。可以考虑在生产环境中移除某些非必要的装饰器。

### 兼容性问题

虽然装饰器已被ES2022正式引入，但并不是所有JavaScript环境都支持。在不支持的环境中，需要使用Babel或TypeScript等工具进行转译。

### this指向

在装饰器函数中，尤其是方法装饰器中，需要注意`this`的指向问题。确保在修改方法时正确地保留原方法的`this`上下文。

```javascript
// 正确的做法
descriptor.value = function(...args) {
  return originalMethod.apply(this, args); // 保留this上下文
};
```

### 不可变性

尽量保持装饰器的纯函数特性，避免在装饰器中修改全局状态或产生其他副作用。这有助于提高代码的可预测性和可测试性。

### 文档化

为自定义装饰器添加清晰的文档，说明其用途、参数和行为。这对于其他开发者理解和使用装饰器非常重要。

### 避免过度使用

装饰器虽然强大，但不应过度使用。对于简单的场景，直接修改类或方法可能更加清晰。保留装饰器用于解决复杂的横切关注点问题。

## 总结

装饰器是ES2022引入的一个强大特性，它提供了一种声明式语法，允许我们以非侵入式的方式增强类、方法、属性等的行为。以下是对装饰器的核心要点总结：

### 核心要点回顾

- **本质**：装饰器本质上是一个函数，它接收被装饰的对象作为参数，并返回修改后的对象
- **类型**：包括类装饰器、方法装饰器、属性装饰器和访问器装饰器
- **参数**：装饰器可以不带参数，也可以通过装饰器工厂函数接收参数
- **组合**：多个装饰器可以组合使用，执行顺序是从下到上（或从右到左）
- **应用**：适用于日志记录、性能监控、权限验证等多种场景

### 主要优势

1. **分离关注点**：将横切关注点代码与核心业务逻辑分离
2. **代码复用**：封装常用功能，使其可以轻松应用于不同的类和方法
3. **声明式编程**：提供更简洁、更可读的代码风格
4. **元编程能力**：允许在运行时修改类和类成员的行为
5. **框架扩展**：为框架开发者提供灵活的扩展机制

### 实践建议

1. **明确使用场景**：主要用于解决横切关注点问题
2. **注意性能影响**：在性能敏感的场景中谨慎使用
3. **保持纯函数特性**：避免在装饰器中修改全局状态
4. **提供清晰文档**：说明装饰器的用途、参数和行为
5. **测试装饰器**：确保装饰器的行为符合预期

装饰器是JavaScript元编程的重要工具，掌握它可以帮助我们编写更加优雅、灵活和可维护的代码。随着JavaScript的不断发展，装饰器的应用场景将会更加广泛，尤其是在框架开发、状态管理和面向切面编程等领域。