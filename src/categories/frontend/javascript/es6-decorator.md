# 装饰器 (Decorator)

装饰器是ES6+引入的一种语法特性，它允许我们通过添加注解的方式来修改类、方法、属性或参数的行为。虽然装饰器目前在JavaScript中仍处于提案阶段（Stage 3），但在TypeScript和许多框架（如Angular、Vue）中已被广泛应用。

## 设计目标与核心价值

装饰器的主要设计目标是：
- 提供一种声明式语法，用于增强或修改类及其成员
- 分离横切关注点（如日志、性能监控、缓存等）与核心业务逻辑
- 提高代码的可复用性和可维护性
- 支持元编程（对代码本身进行操作）

## 基本概念与语法

装饰器本质上是一个函数，它接收目标对象、属性名和属性描述符作为参数，并返回可能修改后的描述符。

装饰器的基本语法是在目标对象前添加 `@decoratorName`：

```javascript
@classDecorator
class MyClass {
  @propertyDecorator
  myProperty = value;

  @methodDecorator
  myMethod(@parameterDecorator param) {
    // 方法体
  }
}
```

## 装饰器类型

### 1. 类装饰器

类装饰器应用于类声明之前，接收类构造函数作为唯一参数。

```javascript
function logClass(target) {
  // 保存原始构造函数
  const original = target;

  // 创建新的构造函数
  function constructor(...args) {
    console.log(`创建 ${original.name} 实例`);
    return new original(...args);
  }

  // 复制原型方法
  constructor.prototype = original.prototype;

  // 返回新的构造函数
  return constructor;
}

@logClass
class Person {
  constructor(name) {
    this.name = name;
  }
}

const person = new Person('张三'); // 输出: 创建 Person 实例
```

### 2. 方法装饰器

方法装饰器应用于类的方法之前，接收三个参数：
- target: 方法所属的类原型
- propertyKey: 方法名
- descriptor: 方法的属性描述符

```javascript
function logMethod(target, propertyKey, descriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function(...args) {
    console.log(`调用方法 ${propertyKey}，参数: ${JSON.stringify(args)}`);
    return originalMethod.apply(this, args);
  };

  return descriptor;
}

class Calculator {
  @logMethod
  add(a, b) {
    return a + b;
  }
}

const calc = new Calculator();
console.log(calc.add(2, 3)); // 输出: 调用方法 add，参数: [2,3] 然后输出 5
```

### 3. 属性装饰器

属性装饰器应用于类的属性之前，接收两个参数：
- target: 属性所属的类原型
- propertyKey: 属性名

```javascript
function defaultValue(value) {
  return function(target, propertyKey) {
    target[propertyKey] = value;
  };
}

class Config {
  @defaultValue('development')
  environment;

  @defaultValue(3000)
  port;
}

const config = new Config();
console.log(config.environment); // 输出: development
console.log(config.port); // 输出: 3000
```

### 4. 参数装饰器

参数装饰器应用于方法的参数之前，接收三个参数：
- target: 方法所属的类原型
- propertyKey: 方法名
- parameterIndex: 参数在参数列表中的索引

```javascript
function validate(target, propertyKey, parameterIndex) {
  // 存储需要验证的参数索引
  if (!target.__validatedParameters) {
    target.__validatedParameters = [];
  }
  target.__validatedParameters.push(parameterIndex);
}

class User {
  constructor(@validate name, age) {
    this.name = name;
    this.age = age;
  }
}

console.log(User.prototype.__validatedParameters); // 输出: [0]
```

## 装饰器的执行顺序

当多个装饰器应用于同一目标时，执行顺序如下：
1. 参数装饰器先于方法装饰器执行
2. 方法装饰器、属性装饰器先于类装饰器执行
3. 同一类型的装饰器，从下到上（或从右到左）执行

```javascript
@decorator1
@decorator2
class MyClass {
  @decorator3
  @decorator4
  myMethod(@decorator5 @decorator6 param) {
    // 方法体
  }
}
```

执行顺序：decorator6 → decorator5 → decorator4 → decorator3 → decorator2 → decorator1

## 装饰器工厂

装饰器工厂是一个返回装饰器函数的函数，允许我们为装饰器传递参数：

```javascript
function logLevel(level) {
  return function(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args) {
      console.log(`[${level}] 调用方法 ${propertyKey}`);
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

class Logger {
  @logLevel('INFO')
  info(message) {
    console.log(message);
  }

  @logLevel('ERROR')
  error(message) {
    console.error(message);
  }
}
```

## 应用场景

装饰器在以下场景中特别有用：

1. **日志记录**：自动记录方法调用、参数和返回值
2. **性能监控**：测量方法执行时间
3. **缓存**：缓存方法调用结果
4. **验证**：验证方法参数
5. **权限控制**：检查用户是否有权限执行某个方法
6. **依赖注入**：自动注入依赖项
7. **路由定义**：在Web框架中定义路由（如Angular）

## 注意事项与最佳实践

1. **兼容性**：装饰器目前仍是Stage 3提案，在JavaScript中使用需要Babel或TypeScript转译

2. **性能考虑**：过度使用装饰器可能会影响性能，特别是在高频调用的方法上

3. **单一职责**：每个装饰器应只关注一个功能，便于复用和测试

4. **组合使用**：多个简单装饰器可以组合使用，实现复杂功能

5. **文档化**：为自定义装饰器添加清晰的文档，说明其用途和参数

6. **避免副作用**：装饰器应尽量避免产生副作用，如修改全局状态

## 与其他特性的结合

### 与类继承结合

装饰器可以与类继承结合使用，子类会继承父类的装饰器：

```javascript
@logClass
class Animal {
  @logMethod
  speak() {
    console.log('动物发声');
  }
}

class Dog extends Animal {
  speak() {
    console.log('汪汪汪');
  }
}

const dog = new Dog(); // 输出: 创建 Animal 实例
console.log(dog.speak()); // 输出: 调用方法 speak，然后输出 汪汪汪
```

### 与其他ES6+特性结合

装饰器可以与其他ES6+特性（如箭头函数、解构赋值等）结合使用，但需要注意this绑定问题：

```javascript
class Service {
  @logMethod
  fetchData() {
    // 使用箭头函数保持this上下文
    fetch('/api/data')
      .then(res => res.json())
      .then(data => this.processData(data));
  }

  @logMethod
  processData(data) {
    console.log('处理数据:', data);
  }
}
```

## 总结

装饰器是一种强大的元编程特性，它提供了一种声明式方式来增强和修改类及其成员。虽然目前在JavaScript中仍处于提案阶段，但在TypeScript和许多现代框架中已被广泛应用。通过合理使用装饰器，我们可以分离横切关注点，提高代码的可复用性和可维护性。

随着装饰器提案的不断发展，未来它可能会成为JavaScript的标准特性，并得到更广泛的支持和应用。