# 身份验证与授权

## 身份验证与授权概述

身份验证（Authentication）和授权（Authorization）是Web应用安全的两个核心概念：
- **身份验证**：验证用户身份的过程，确认用户是其声称的身份
- **授权**：确定已认证用户是否有权限执行特定操作的过程

在Express应用中，可以通过多种方式实现身份验证和授权，本章将介绍常见的实现方法。

## 基本身份验证

### HTTP基本身份验证

HTTP基本身份验证是一种简单的身份验证机制，通过在请求头中发送用户名和密码进行验证。

```javascript
const express = require('express');
const app = express();

// 基本身份验证中间件
const basicAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
    return res.status(401).send('未提供身份验证凭据');
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  // 这里应该验证用户名和密码，实际应用中应从数据库获取
  if (username === 'admin' && password === 'password') {
    return next();
  }

  res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
  return res.status(401).send('身份验证失败');
};

// 保护路由
app.get('/api/protected', basicAuth, (req, res) => {
  res.json({ message: '访问受保护资源成功' });
});

app.listen(3000, () => {
  console.log('服务器运行在 http://localhost:3000');
});
```

### 使用passport.js

Passport.js是Node.js中流行的身份验证中间件，支持多种身份验证策略。

```bash
npm install passport passport-local express-session
```

```javascript
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const app = express();

// 配置会话
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

// 初始化Passport
app.use(passport.initialize());
app.use(passport.session());

// 配置本地策略
passport.use(new LocalStrategy(
  (username, password, done) => {
    // 这里应该从数据库验证用户，简化示例中使用硬编码用户
    if (username === 'admin' && password === 'password') {
      return done(null, { id: 1, username: 'admin' });
    }
    return done(null, false, { message: '用户名或密码错误' });
  }
));

// 序列化和反序列化用户
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // 这里应该从数据库获取用户信息
  done(null, { id: 1, username: 'admin' });
});

// 登录路由
app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
}));

// 受保护路由
app.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  res.send(`欢迎 ${req.user.username}！`);
});

// 登出路由
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

app.listen(3000, () => {
  console.log('服务器运行在 http://localhost:3000');
});
```

## JWT身份验证

JSON Web Token（JWT）是一种基于Token的身份验证机制，越来越受欢迎。

### 安装依赖

```bash
npm install jsonwebtoken express-jwt
```

### 实现JWT身份验证

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const { expressjwt: expressJWT } = require('express-jwt');
const app = express();
app.use(express.json());

// 密钥，实际应用中应存储在环境变量中
const secretKey = 'your-secret-key';

// JWT验证中间件
const auth = expressJWT({
  secret: secretKey,
  algorithms: ['HS256']
}).unless({ path: ['/login'] }); // 登录路由不需要验证

// 登录路由
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // 这里应该验证用户名和密码
  if (username === 'admin' && password === 'password') {
    // 生成JWT令牌
    const token = jwt.sign({
      username: username,
      exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1小时有效期
    }, secretKey);

    return res.json({ token });
  }

  res.status(401).json({ message: '用户名或密码错误' });
});

// 应用JWT验证中间件
app.use(auth);

// 错误处理中间件，处理JWT验证失败
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: '无效的令牌' });
  }
  res.status(500).json({ message: '服务器内部错误' });
});

// 受保护路由
app.get('/api/protected', (req, res) => {
  res.json({
    message: '访问受保护资源成功',
    user: req.user
  });
});

app.listen(3000, () => {
  console.log('服务器运行在 http://localhost:3000');
});
```

## 授权机制

### 基于角色的访问控制（RBAC）

基于角色的访问控制是一种常见的授权机制，根据用户角色授予不同的权限。

```javascript
// 角色验证中间件
const checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: '未认证' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: '权限不足' });
    }

    next();
  };
};

// 仅管理员可访问的路由
app.get('/api/admin', checkRole(['admin']), (req, res) => {
  res.json({ message: '管理员访问成功' });
});

// 普通用户和管理员均可访问的路由
app.get('/api/user', checkRole(['user', 'admin']), (req, res) => {
  res.json({ message: '用户访问成功' });
});
```

###  基于权限的访问控制

基于权限的访问控制更细粒度，直接为用户分配具体权限。

```javascript
// 权限验证中间件
const checkPermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: '未认证' });
    }

    if (!req.user.permissions.includes(permission)) {
      return res.status(403).json({ message: '没有足够权限' });
    }

    next();
  };
};

// 需要特定权限的路由
app.post('/api/users', checkPermission('create_user'), (req, res) => {
  // 创建用户逻辑
});

app.delete('/api/users/:id', checkPermission('delete_user'), (req, res) => {
  // 删除用户逻辑
});
```

## 安全最佳实践

1. **存储密码安全**：永远不要明文存储密码，使用bcrypt等算法进行哈希处理
2. **使用HTTPS**：确保所有通信都通过HTTPS进行
3. **限制登录尝试**：实现登录尝试限制，防止暴力破解
4. **使用环境变量**：将敏感信息（如密钥、数据库凭证）存储在环境变量中
5. **验证输入**：对所有用户输入进行验证和清理，防止注入攻击
6. **更新依赖**：定期更新依赖包，修复已知漏洞
7. **使用CSRF保护**：对于表单提交，实现CSRF保护
8. **设置安全HTTP头**：使用helmet等中间件设置安全HTTP头

```javascript
const helmet = require('helmet');
app.use(helmet()); // 添加各种安全HTTP头
```

##  第三方身份验证

###  OAuth2.0

OAuth2.0是一种授权框架，允许用户授权第三方应用访问其资源而无需共享密码。

###  使用Passport实现OAuth2.0

```bash
npm install passport passport-google-oauth20
```

```javascript
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: 'your-google-client-id',
    clientSecret: 'your-google-client-secret',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    // 这里可以查找或创建用户
    return done(null, profile);
  }
));

// 初始化Passport
app.use(passport.initialize());
app.use(passport.session());

// 序列化和反序列化用户
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Google登录路由
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google回调路由
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // 登录成功后的重定向
    res.redirect('/dashboard');
  });
```

## 总结

身份验证与授权是Web应用安全的基石。本章介绍了多种身份验证机制（HTTP基本身份验证、Passport.js、JWT）和授权机制（RBAC、基于权限的访问控制），以及安全最佳实践和第三方身份验证。在实际应用中，应根据项目需求和安全级别选择合适的身份验证和授权方案，并始终遵循安全最佳实践。