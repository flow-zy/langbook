# 中间件

## 中间件基本概念

中间件是 Express 的核心概念之一，它是一个函数，可以访问请求对象 (req)、响应对象 (res) 和应用程序的请求-响应周期中的下一个中间件函数 (next)。中间件函数可以执行以下任务：

- 执行任何代码
- 修改请求和响应对象
- 结束请求-响应周期
- 调用堆栈中的下一个中间件函数

### 中间件的格式

```javascript
function middleware(req, res, next) {
  // 执行某些操作
  next(); // 调用下一个中间件
}
```

### 中间件的作用

- 处理请求前的准备工作（如身份验证、日志记录）
- 修改请求和响应对象
- 处理错误
- 提供额外功能（如静态文件服务、解析请求体）

## 中间件的类型

Express 中有多种类型的中间件：

### 应用级中间件

应用级中间件绑定到 Express 应用实例上，使用 `app.use()` 和 `app.METHOD()` 方法：

```javascript
// 应用级中间件
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

// 针对特定路径的应用级中间件
app.use('/api', (req, res, next) => {
  console.log('API request received');
  next();
});
```

### 路由级中间件

路由级中间件与应用级中间件类似，但它绑定到 `express.Router()` 实例上：

```javascript
const router = express.Router();

// 路由级中间件
router.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

// 应用路由
app.use('/api', router);
```

### 错误处理中间件

错误处理中间件有四个参数：`err`, `req`, `res`, `next`：

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('服务器内部错误');
});
```

### 内置中间件

Express 提供了一些内置中间件：

- `express.static`: 提供静态文件服务
- `express.json`: 解析 JSON 请求体
- `express.urlencoded`: 解析 URL 编码的请求体
- `express.raw`: 解析二进制请求体
- `express.text`: 解析文本请求体

```javascript
// 使用内置中间件
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

### 第三方中间件

可以使用第三方中间件来扩展 Express 的功能：

- `morgan`: 日志中间件
- `cors`: 跨域资源共享中间件
- `helmet`: 安全中间件
- `compression`: 压缩中间件
- `cookie-parser`: Cookie 解析中间件
- `multer`: 文件上传中间件

```javascript
// 使用第三方中间件
const morgan = require('morgan');
const cors = require('cors');

app.use(morgan('dev'));
app.use(cors());
```

## 中间件的执行顺序

Express 按照中间件定义的顺序执行。如果不调用 `next()`，请求将被挂起。

```javascript
// 第一个中间件
app.use((req, res, next) => {
  console.log('中间件 1 执行');
  next();
});

// 第二个中间件
app.use((req, res, next) => {
  console.log('中间件 2 执行');
  next();
});

// 路由处理函数
app.get('/', (req, res) => {
  console.log('路由处理函数执行');
  res.send('Hello World!');
});
```

### 路由级中间件的顺序

路由级中间件的执行顺序也很重要：

```javascript
const router = express.Router();

// 路由级中间件 1
router.use((req, res, next) => {
  console.log('路由级中间件 1 执行');
  next();
});

// 路由处理函数
router.get('/', (req, res) => {
  res.send('Hello World!');
});

// 路由级中间件 2 - 这个中间件不会被执行，因为路由处理函数没有调用 next()
router.use((req, res, next) => {
  console.log('路由级中间件 2 执行');
  next();
});
```

## 中间件的高级使用

### 中间件堆栈

可以将多个中间件函数组合成一个堆栈：

```javascript
const middleware1 = (req, res, next) => {
  console.log('中间件 1 执行');
  next();
};

const middleware2 = (req, res, next) => {
  console.log('中间件 2 执行');
  next();
};

// 应用中间件堆栈
app.use([middleware1, middleware2]);
```

### 条件中间件

可以根据条件决定是否执行某个中间件：

```javascript
const authMiddleware = (req, res, next) => {
  if (req.headers.authorization) {
    // 验证逻辑
    next();
  } else {
    res.status(401).json({ message: '未授权' });
  }
};

// 只对特定路由应用中间件
app.get('/api/users', authMiddleware, (req, res) => {
  res.json([{ id: 1, name: '张三' }, { id: 2, name: '李四' }]);
});
```

### 中间件工厂

可以创建返回中间件函数的工厂函数，以实现更灵活的中间件配置：

```javascript
const logger = (format) => {
  return (req, res, next) => {
    if (format === 'detailed') {
      console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    } else {
      console.log(`${req.method} ${req.url}`);
    }
    next();
  };
};

// 使用中间件工厂
app.use(logger('detailed'));
```

### 错误处理中间件的高级使用

错误处理中间件可以捕获同步和异步错误：

```javascript
// 同步错误处理
app.get('/sync-error', (req, res) => {
  throw new Error('同步错误');
});

// 异步错误处理
app.get('/async-error', (req, res, next) => {
  fs.readFile('non-existent-file.txt', (err, data) => {
    if (err) {
      next(err); // 传递错误给错误处理中间件
    } else {
      res.send(data);
    }
  });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(`错误: ${err.message}`);
});
```

## 常用中间件示例

###  日志中间件

```javascript
const morgan = require('morgan');

// 简单日志
app.use(morgan('dev'));

// 自定义日志格式
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :body'));
```

### 5.2 身份验证中间件

```javascript
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: '未提供身份验证令牌' });
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: '无效的身份验证令牌' });
  }
};
```

###  跨域中间件

```javascript
const cors = require('cors');

// 允许所有跨域请求
app.use(cors());

// 配置特定的跨域规则
const corsOptions = {
  origin: 'https://example.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use('/api', cors(corsOptions));
```

###  静态文件中间件

```javascript
// 提供静态文件服务
app.use(express.static('public'));

// 为静态文件设置虚拟路径前缀
app.use('/static', express.static('public'));

// 多个静态文件目录
app.use(express.static('public'));
app.use(express.static('uploads'));
```

## 总结

中间件是 Express 的核心概念，它允许开发者在请求-响应周期中执行各种操作。本章节介绍了中间件的基本概念、类型、执行顺序和高级使用方法，并提供了一些常用中间件的示例。通过合理使用中间件，可以使应用的功能更加模块化，代码更加清晰。在后续章节中，我们将学习请求与响应处理、错误处理等高级主题。