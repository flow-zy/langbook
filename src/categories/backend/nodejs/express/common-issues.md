# 常见问题

## 安装与配置问题

### Express安装失败

**问题描述**：运行`npm install express`时安装失败。

**可能原因**：
- 网络问题
- npm版本过低
- 权限问题

**解决方案**：
1. 检查网络连接，尝试使用VPN或切换镜像源
2. 更新npm：`npm install -g npm`
3. 使用管理员权限运行命令（Windows）或添加`sudo`（macOS/Linux）
4. 尝试使用yarn代替npm：`yarn add express`

### 端口被占用

**问题描述**：启动Express应用时提示`EADDRINUSE: address already in use :::3000`。

**解决方案**：
1. 找出占用端口的进程并终止：
   - Windows: `netstat -ano | findstr :3000` 找到PID，然后 `taskkill /PID <PID> /F`
   - macOS/Linux: `lsof -i :3000` 找到PID，然后 `kill -9 <PID>`
2. 更改Express应用使用的端口：
   ```javascript
   const port = process.env.PORT || 3001; // 改为未被占用的端口
   app.listen(port, () => {
     console.log(`服务器运行在 http://localhost:${port}`);
   });
   ```

## 路由与中间件问题

### 路由不生效

**问题描述**：定义的路由无法被访问，返回404错误。

**可能原因**：
- 路由顺序错误
- 路径匹配问题
- 中间件拦截

**解决方案**：
1. 确保路由定义在所有中间件之后（除了错误处理中间件）
2. 检查路由路径是否正确，注意斜杠(`/`)的使用
3. 检查是否有中间件拦截了请求，如身份验证中间件
4. 使用`app.use`而不是具体的HTTP方法（如`app.get`）定义路由时，确保路径正确

### 中间件不执行

**问题描述**：定义的中间件不执行。

**可能原因**：
- 中间件顺序错误
- 没有调用`next()`
- 路径限制问题

**解决方案**：
1. 检查中间件定义顺序，确保在路由之前定义
2. 确保中间件函数中调用了`next()`方法
3. 检查中间件是否被限制在特定路径，而请求的路径不匹配

```javascript
// 正确示例
app.use((req, res, next) => {
  console.log('中间件执行');
  next(); // 必须调用next()
});

// 路由定义在中间件之后
app.get('/', (req, res) => {
  res.send('Hello World');
});
```

## 请求与响应问题

### req.body为undefined

**问题描述**：无法获取POST请求体数据，`req.body`为undefined。

**解决方案**：
确保使用了Express的内置中间件解析请求体：

```javascript
// 解析JSON请求体
app.use(express.json());

// 解析URL编码的请求体
app.use(express.urlencoded({ extended: true }));
```

### 响应发送多次

**问题描述**：提示`Cannot set headers after they are sent to the client`错误。

**原因**：在一个请求处理函数中多次发送响应。

**解决方案**：
确保每个请求只发送一次响应，使用`return`语句避免继续执行：

```javascript
// 错误示例
app.get('/api/users', (req, res) => {
  res.send('用户列表');
  res.json({ users: [] }); // 这会导致错误
});

// 正确示例
app.get('/api/users', (req, res) => {
  return res.send('用户列表'); // 使用return避免继续执行
  // 下面的代码不会执行
  res.json({ users: [] });
});
```

## 数据库问题

### 数据库连接失败

**问题描述**：无法连接到数据库。

**可能原因**：
- 数据库服务未启动
- 连接参数错误
- 防火墙限制

**解决方案**：
1. 确保数据库服务已启动
2. 检查连接参数（主机、端口、用户名、密码、数据库名）
3. 检查防火墙设置，确保允许访问数据库端口
4. 为连接添加错误处理：
   ```javascript
   const mongoose = require('mongoose');

   mongoose.connect('mongodb://localhost:27017/test_db')
     .then(() => console.log('MongoDB连接成功'))
     .catch(err => console.error('MongoDB连接失败:', err));
   ```

### 查询性能低下

**问题描述**：数据库查询速度慢。

**解决方案**：
1. 为常用查询字段创建索引
2. 优化查询语句，避免不必要的字段和表连接
3. 使用分页减少返回数据量
4. 实现缓存机制

## 异步处理问题

### 异步错误未捕获

**问题描述**：异步操作中的错误未被捕获，导致应用崩溃。

**解决方案**：
1. 使用try-catch捕获async/await错误：
   ```javascript
   app.get('/api/users', async (req, res, next) => {
     try {
       const users = await User.find();
       res.json(users);
     } catch (err) {
       next(err); // 传递给错误处理中间件
     }
   });
   ```
2. 使用Promise的catch方法：
   ```javascript
   app.get('/api/users', (req, res, next) => {
     User.find()
       .then(users => res.json(users))
       .catch(next); // 传递给错误处理中间件
   });
   ```
3. 使用错误处理包装器：
   ```javascript
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

## 安全问题

### XSS攻击

**问题描述**：应用容易受到跨站脚本攻击。

**解决方案**：
1. 使用helmet中间件设置安全HTTP头：
   ```javascript
   const helmet = require('helmet');
   app.use(helmet());
   ```
2. 使用express-xss-sanitizer sanitize用户输入：
   ```javascript
   const xss = require('express-xss-sanitizer');
   app.use(xss());
   ```
3. 在渲染模板时使用转义函数：
   ```javascript
   // 使用ejs模板引擎时
   <%= userInput %> // 自动转义
   ```

### CSRF攻击

**问题描述**：应用容易受到跨站请求伪造攻击。

**解决方案**：
1. 使用csurf中间件：
   ```javascript
   const csurf = require('csurf');
   const csrfProtection = csurf({ cookie: true });

   app.get('/form', csrfProtection, (req, res) => {
     res.render('form', { csrfToken: req.csrfToken() });
   });

   app.post('/form', csrfProtection, (req, res) => {
     // 处理表单提交
   });
   ```
2. 在前端表单中包含CSRF令牌：
   ```html
   <form action="/form" method="post">
     <input type="hidden" name="_csrf" value="<%= csrfToken %>">
     <!-- 其他表单字段 -->
   </form>
   ```

## 部署问题

###  环境变量未加载

**问题描述**：部署到生产环境后，环境变量未加载。

**解决方案**：
1. 确保dotenv包已安装：`npm install dotenv`
2. 在应用入口文件顶部加载dotenv：
   ```javascript
   require('dotenv').config();
   ```
3. 在生产环境中，确保环境变量已正确设置（通过服务器环境变量或部署平台配置）

###  应用崩溃后未自动重启 

**解决方案**：
使用PM2进程管理工具：
```bash
npm install -g pm2
pm install pm2
pm run build
pm run start:prod
```

PM2会自动重启崩溃的应用，并提供负载均衡和日志管理功能。

##  性能问题

### 应用响应慢

**可能原因**：
- 中间件过多或执行耗时操作
- 数据库查询优化不足
- 没有使用缓存

**解决方案**：
1. 优化中间件，移除不必要的中间件，将耗时操作移到非关键路径
2. 优化数据库查询，添加索引，避免N+1查询问题
3. 实现缓存机制，如使用Redis或内存缓存
4. 使用性能分析工具（如clinic.js）找出瓶颈

## 总结

本章涵盖了Express开发中常见的问题及解决方案，包括安装配置、路由中间件、请求响应处理、数据库、异步处理、安全、部署和性能等方面。在实际开发中，遇到问题时应首先检查错误信息，然后分析可能的原因，最后尝试相应的解决方案。同时，遵循最佳实践可以有效减少常见问题的发生。