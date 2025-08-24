# 最佳实践

## 项目结构组织

良好的项目结构有助于提高代码的可维护性和可扩展性。以下是一个推荐的Express项目结构：

```
project/
├── config/
│   ├── database.js
│   └── config.js
├── controllers/
│   ├── userController.js
│   └── productController.js
├── middleware/
│   ├── auth.js
│   └── validation.js
├── models/
│   ├── User.js
│   └── Product.js
├── routes/
│   ├── userRoutes.js
│   └── productRoutes.js
├── services/
│   ├── userService.js
│   └── productService.js
├── utils/
│   ├── errorHandler.js
│   └── logger.js
├── app.js
└── server.js
```

### 模块化组织

将代码模块化，分离关注点：
- **控制器(Controllers)**：处理请求和响应
- **模型(Models)**：数据结构和数据库交互
- **路由(Routes)**：定义API端点
- **服务(Services)**：业务逻辑
- **中间件(Middleware)**：请求处理中间件
- **工具(Utils)**：通用工具函数
- **配置(Config)**：应用配置

## 代码风格与规范

### 使用ES6+特性

利用ES6+的现代JavaScript特性：

```javascript
// 使用箭头函数
const getUser = async (req, res) => {
  // 代码逻辑
};

// 使用解构赋值
const { id, name } = req.body;

// 使用模板字符串
const message = `用户 ${name} 创建成功`;

// 使用async/await处理异步
const fetchData = async () => {
  try {
    const data = await database.query('SELECT * FROM users');
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
```

### 代码规范

- 使用一致的缩进（2或4个空格）
- 使用有意义的变量和函数名
- 为复杂代码添加注释
- 保持函数简短，每个函数只做一件事
- 使用ES模块(`import/export`)而非CommonJS(`require/module.exports`)

## 性能优化

### 中间件优化

- 只加载必要的中间件
- 为中间件指定路径前缀，减少不必要的执行
- 避免在全局中间件中执行耗时操作

```javascript
// 只为特定路由使用中间件
app.use('/api/users', authMiddleware, userRoutes);
```

### 数据库优化

- 使用连接池管理数据库连接
- 为常用查询创建索引
- 避免N+1查询问题
- 使用分页减少返回数据量

```javascript
// 分页查询示例
app.get('/api/users', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  const users = await User.find()
    .skip(offset)
    .limit(parseInt(limit));

  const total = await User.countDocuments();

  res.json({
    page: parseInt(page),
    limit: parseInt(limit),
    total,
    data: users
  });
});
```

### 缓存策略

使用缓存减少重复计算和数据库查询：

```javascript
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 60 }); // 缓存60秒

// 缓存中间件
const cacheMiddleware = (req, res, next) => {
  const key = `__express__${req.originalUrl}`;
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    return res.json(cachedResponse);
  }

  // 重写res.json方法
  const originalJson = res.json;
  res.json = function(data) {
    cache.set(key, data);
    return originalJson.call(this, data);
  };

  next();
};

// 应用缓存中间件
app.get('/api/products', cacheMiddleware, productController.getAllProducts);
```

## 错误处理

### 集中式错误处理

实现集中式错误处理中间件：

```javascript
// 自定义错误类
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// 错误处理中间件
const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  }

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }

  // 未知错误
  console.error('ERROR 💥', err);
  res.status(500).json({
    status: 'error',
    message: '服务器内部错误'
  });

// 抛出操作错误示例
const createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    next(new AppError('创建用户失败', 400));
  }
};
```

### 异步错误处理

正确处理异步错误：

```javascript
// 使用async/await时，使用try-catch捕获错误
app.get('/api/users', async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err); // 传递给错误处理中间件
  }
});

// 或者使用错误处理包装器
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

app.get('/api/users', catchAsync(async (req, res) => {
  const users = await User.find();
  res.json(users);
}));
```

##  安全实践

###  使用helmet

Helmet帮助设置各种HTTP头以增强安全性：

```bash
npm install helmet
```

```javascript
const helmet = require('helmet');
app.use(helmet());
```

###  防止XSS攻击

使用express-xss-sanitizer防止跨站脚本攻击：

```bash
npm install express-xss-sanitizer
```

```javascript
const xss = require('express-xss-sanitizer');
app.use(xss());
```

###  防止CSRF攻击 

对于表单提交，使用csurf中间件防止跨站请求伪造：

```bash
npm install csurf
```

```javascript
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

// 为表单路由应用CSRF保护
app.get('/form', csrfProtection, (req, res) => {
  res.render('form', { csrfToken: req.csrfToken() });
});

app.post('/form', csrfProtection, (req, res) => {
  // 处理表单提交
});
```

###  输入验证

使用Joi或express-validator验证输入：

```bash
npm install express-validator
```

```javascript
const { body, validationResult } = require('express-validator');

// 验证规则
const userValidationRules = [
  body('name').notEmpty().withMessage('姓名不能为空'),
  body('email').isEmail().withMessage('请输入有效的邮箱地址'),
  body('password').isLength({ min: 6 }).withMessage('密码长度不能少于6个字符')
];

// 验证中间件
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// 应用验证
app.post('/api/users', userValidationRules, validate, userController.createUser);
```

## 日志记录

### 使用winston记录日志

```bash
npm install winston
```

```javascript
const winston = require('winston');

// 配置日志记录器
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// 在开发环境下，将日志输出到控制台
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

// 记录请求日志的中间件
const requestLogger = (req, res, next) => {
  logger.info({
    method: req.method,
    url: req.originalUrl,
    ip: req.ip
  });
  next();
};

app.use(requestLogger);
```

##  环境配置

使用dotenv管理环境变量：

```bash
npm install dotenv
```

创建.env文件：
```
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=test_db
SECRET_KEY=your-secret-key
```

加载环境变量：
```javascript
require('dotenv').config();

const port = process.env.PORT || 3000;
const dbHost = process.env.DB_HOST;
// 其他配置...
```

##  测试策略

###  使用Jest进行单元测试

使用Jest进行单元测试：

```bash
npm install --save-dev jest
```

```javascript
// sum.test.js
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

###  集成测试

使用supertest测试API端点：

```bash
npm install --save-dev supertest
```

```javascript
const request = require('supertest');
const app = require('./app');

describe('GET /api/users', () => {
  it('should return all users', async () => {
    const res = await request(app)
      .get('/api/users')
      .expect(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
```

##  部署最佳实践

###  使用PM2进行进程管理

```bash
npm install -g pm2
pm install pm2
```

创建ecosystem.config.js：
```javascript
module.exports = {
  apps: [{
    name: 'my-app',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    }
  }]
};
```

启动应用：
```bash
pm run build
pm run start:prod
```

###  使用Nginx作为反向代理

配置Nginx：
```nginx
server {
  listen 80;
  server_name example.com;

  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

## 总结

遵循这些最佳实践可以帮助你构建更安全、更高效、更可维护的Express应用。这些实践涵盖了项目结构、代码风格、性能优化、错误处理、安全、日志记录、环境配置、测试和部署等方面。在实际开发中，应根据项目需求和团队习惯灵活应用这些实践，并持续学习和更新最佳实践知识。