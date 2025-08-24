# 数据库集成

## 数据库集成概述

在大多数Web应用中，数据库是存储和管理数据的核心组件。Express本身并不直接提供数据库集成功能，但它可以与各种数据库系统无缝集成。本章将介绍如何在Express应用中集成常见的数据库系统，包括关系型数据库（如MySQL、PostgreSQL）和NoSQL数据库（如MongoDB）。

## 集成MySQL

MySQL是一种流行的开源关系型数据库管理系统。在Express应用中，可以使用`mysql2`包来集成MySQL数据库。

### 安装依赖

```bash
npm install mysql2
```

### 基本配置与连接

```javascript
const mysql = require('mysql2');

// 创建数据库连接池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'test_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 导出连接池
module.exports = pool.promise();
```

### 执行查询

```javascript
const db = require('./db');

// 查询数据
app.get('/api/users', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '查询用户失败' });
  }
});

// 插入数据
app.post('/api/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const [result] = await db.query(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    res.status(201).json({
      id: result.insertId,
      name,
      email
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '创建用户失败' });
  }
});

// 更新数据
app.put('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    await db.query(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [name, email, id]
    );
    res.json({ id, name, email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '更新用户失败' });
  }
});

// 删除数据
app.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM users WHERE id = ?', [id]);
    res.json({ message: '用户删除成功' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '删除用户失败' });
  }
});
```

## 集成PostgreSQL

PostgreSQL是另一种流行的开源关系型数据库管理系统，它提供了更多高级特性。在Express应用中，可以使用`pg`包来集成PostgreSQL数据库。

### 安装依赖

```bash
npm install pg
```

### 基本配置与连接

```javascript
const { Pool } = require('pg');

// 创建数据库连接池
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test_db',
  password: 'password',
  port: 5432,
});

// 导出连接池
module.exports = pool;
```

### 执行查询

```javascript
const db = require('./db');

// 查询数据
app.get('/api/users', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '查询用户失败' });
  }
});

// 插入数据
app.post('/api/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const result = await db.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '创建用户失败' });
  }
});
```

## 集成MongoDB

MongoDB是一种流行的NoSQL文档数据库，它以JSON格式存储数据。在Express应用中，可以使用`mongoose`包来集成MongoDB数据库。

### 安装依赖

```bash
npm install mongoose
```

### 基本配置与连接

```javascript
const mongoose = require('mongoose');

// 连接到MongoDB
mongoose.connect('mongodb://localhost:27017/test_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB连接成功'))
  .catch(err => console.error('MongoDB连接失败:', err));
```

### 定义模型

```javascript
const mongoose = require('mongoose');

// 定义用户模型
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 创建用户模型
const User = mongoose.model('User', UserSchema);

module.exports = User;
```
### 执行CRUD操作

```javascript
const User = require('./models/User');

// 查询数据
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '查询用户失败' });
  }
});

// 插入数据
app.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// 更新数据
app.put('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!user) {
      return res.status(404).json({ error: '用户不存在' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// 删除数据
app.delete('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: '用户不存在' });
    }
    res.json({ message: '用户删除成功' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '删除用户失败' });
  }
});
```

## 集成ORM/ODM框架

为了简化数据库操作，可以使用ORM（对象关系映射）或ODM（对象文档映射）框架。这些框架将数据库表/集合映射为JavaScript对象，使开发者可以使用面向对象的方式操作数据库。

### 使用Sequelize（MySQL/PostgreSQL）

Sequelize是一个流行的ORM框架，支持MySQL、PostgreSQL、SQLite和Microsoft SQL Server。

```bash
npm install sequelize mysql2
```

```javascript
const { Sequelize, DataTypes } = require('sequelize');

// 创建Sequelize实例
const sequelize = new Sequelize('test_db', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

// 定义用户模型
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  age: {
    type: DataTypes.INTEGER
  }
});

// 同步模型到数据库
sequelize.sync()
  .then(() => console.log('模型同步成功'))
  .catch(err => console.error('模型同步失败:', err));

// 使用模型
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '查询用户失败' });
  }
});
```

### 使用Mongoose（MongoDB）

前面已经介绍了Mongoose的基本使用，它是MongoDB的ODM框架。

## 数据库连接池管理

连接池是一组预先创建的数据库连接，它们可以被重用，而不是每次请求都创建新连接。这可以提高应用程序的性能和可扩展性。

### MySQL连接池

```javascript
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'test_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
```

### PostgreSQL连接池  

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test_db',
  password: 'password',
  port: 5432,
  max: 10, // 最大连接数
  idleTimeoutMillis: 30000 // 连接空闲超时时间
});
```

## 事务处理

事务是一组原子性的SQL操作，要么全部成功，要么全部失败。在Express应用中，可以使用数据库提供的事务功能来确保数据的一致性。

### MySQL事务

```javascript
const db = require('./db');

app.post('/api/orders', async (req, res) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // 创建订单
    const [orderResult] = await connection.query(
      'INSERT INTO orders (user_id, total) VALUES (?, ?)',
      [req.body.userId, req.body.total]
    );

    // 添加订单项
    for (const item of req.body.items) {
      await connection.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderResult.insertId, item.productId, item.quantity, item.price]
      );

      // 更新库存
      await connection.query(
        'UPDATE products SET stock = stock - ? WHERE id = ?',
        [item.quantity, item.productId]
      );
    }

    await connection.commit();
    res.status(201).json({ orderId: orderResult.insertId });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ error: '创建订单失败' });
  } finally {
    connection.release();
  }
});
```

###  MongoDB事务

```javascript
const session = await mongoose.startSession();
session.startTransaction();

try {
  // 创建订单
  const order = new Order({
    userId: req.body.userId,
    total: req.body.total,
    items: req.body.items
  });
  await order.save({ session });

  // 更新库存
  for (const item of req.body.items) {
    await Product.findByIdAndUpdate(
      item.productId,
      { $inc: { stock: -item.quantity } },
      { session }
    );
  }

  await session.commitTransaction();
  res.status(201).json({ orderId: order._id });
} catch (err) {
  await session.abortTransaction();
  console.error(err);
  res.status(500).json({ error: '创建订单失败' });
} finally {
  session.endSession();
}
```

##  数据库索引与性能优化

索引可以提高数据库查询的性能。在Express应用中，应该为常用的查询字段创建索引。

### MySQL索引

```sql
-- 为users表的email字段创建索引
CREATE INDEX idx_users_email ON users(email);
```

### MongoDB索引

```javascript
// 为User模型的email字段创建索引
UserSchema.index({ email: 1 });
```

## 数据库迁移与版本控制

数据库迁移工具可以帮助管理数据库模式的变化。在Express应用中，可以使用`sequelize-cli`（对于MySQL/PostgreSQL）或`mongoose-migrate`（对于MongoDB）来管理数据库迁移。

### 数据库迁移工具

```bash
npm install -g sequelize-cli
sequelize init
sequelize model:generate --name User --attributes name:string,email:string,age:integer
sequelize db:migrate
```

##  最佳实践

1. **使用连接池**：避免频繁创建和关闭数据库连接。
2. **参数化查询**：防止SQL注入攻击。
3. **事务处理**：确保数据操作的原子性。
4. **索引优化**：为常用查询字段创建索引。
5. **错误处理**：捕获并处理数据库操作中的错误。
6. **数据验证**：在插入或更新数据之前验证数据的有效性。
7. **数据库备份**：定期备份数据库。
8. **环境变量**：将数据库连接信息存储在环境变量中，而不是硬编码在代码中。
9. **ORM/ODM框架**：使用ORM/ODM框架简化数据库操作。
10. **数据库迁移**：使用数据库迁移工具管理数据库模式的变化。

## 总结

数据库集成是Express应用开发中的重要环节。本章介绍了如何在Express应用中集成MySQL、PostgreSQL和MongoDB数据库，以及如何使用ORM/ODM框架、管理连接池、处理事务、优化性能等。通过合理使用这些技术，可以构建出高效、可靠的数据存储层，为应用程序提供强大的数据支持。