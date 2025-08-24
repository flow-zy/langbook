# PHP 数据库操作

## 概述

数据库操作是PHP开发中最常见的任务之一。PHP提供了多种方式与数据库交互，包括原生SQL查询、PDO（PHP Data Objects）和各种ORM（对象关系映射）框架。本章将详细介绍PHP中的数据库操作技术和最佳实践。

## MySQLi 扩展

MySQLi（MySQL improved）是PHP中专门用于与MySQL数据库交互的扩展，提供了面向对象和面向过程两种API。

### 1. 连接MySQL数据库

#### 1.1 面向对象方式

```php
// 创建连接对象
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "database";

$conn = new mysqli($servername, $username, $password, $dbname);

// 检查连接
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
```

#### 1.2 面向过程方式

```php
// 创建连接
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "database";

$conn = mysqli_connect($servername, $username, $password, $dbname);

// 检查连接
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
echo "Connected successfully";
```

### 2. 执行查询

#### 2.1 执行SELECT查询

```php
// 面向对象方式
$sql = "SELECT id, name, email FROM users";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // 输出数据
    while($row = $result->fetch_assoc()) {
        echo "id: " . $row["id"]. " - Name: " . $row["name"]. " - Email: " . $row["email"]. "<br>";
    }
} else {
    echo "0 results";
}

// 面向过程方式
$sql = "SELECT id, name, email FROM users";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    // 输出数据
    while($row = mysqli_fetch_assoc($result)) {
        echo "id: " . $row["id"]. " - Name: " . $row["name"]. " - Email: " . $row["email"]. "<br>";
    }
} else {
    echo "0 results";
}
```

#### 2.2 执行INSERT、UPDATE和DELETE操作

```php
// 插入数据
$sql = "INSERT INTO users (name, email, password) VALUES ('John Doe', 'john@example.com', 'password123')";
if ($conn->query($sql) === TRUE) {
    $last_id = $conn->insert_id;
    echo "New record created successfully. Last inserted ID: " . $last_id;
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// 更新数据
$sql = "UPDATE users SET email='john.doe@example.com' WHERE id=1";
if ($conn->query($sql) === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . $conn->error;
}

// 删除数据
$sql = "DELETE FROM users WHERE id=1";
if ($conn->query($sql) === TRUE) {
    echo "Record deleted successfully";
} else {
    echo "Error deleting record: " . $conn->error;
}
```

### 3. 预处理语句（防止SQL注入）

```php
// 面向对象方式 - 预处理语句
$stmt = $conn->prepare("INSERT INTO users (name, email) VALUES (?, ?)");
$stmt->bind_param("ss", $name, $email);

// 设置参数并执行
$name = "John Doe";
$email = "john@example.com";
$stmt->execute();

$name = "Jane Smith";
$email = "jane@example.com";
$stmt->execute();

echo "New records created successfully";

$stmt->close();
```

## PDO（PHP Data Objects）

PDO是PHP中一个轻量级的、一致的接口，用于访问多种数据库。

### 1. 连接数据库

```php
// 创建PDO实例
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "database";

try {
    $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // 设置PDO错误模式为异常
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully";
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
```

### 2. 执行查询

#### 2.1 执行SELECT查询

```php
// 查询数据
$sql = "SELECT id, name, email FROM users";
foreach ($pdo->query($sql) as $row) {
    echo "id: " . $row["id"]. " - Name: " . $row["name"]. " - Email: " . $row["email"]. "<br>";
}
```

#### 2.2 执行INSERT、UPDATE和DELETE操作

```php
// 插入数据
try {
    $sql = "INSERT INTO users (name, email, password) VALUES ('John Doe', 'john@example.com', 'password123')";
    $pdo->exec($sql);
    $last_id = $pdo->lastInsertId();
    echo "New record created successfully. Last inserted ID: " . $last_id;
} catch(PDOException $e) {
    echo $sql . "<br>" . $e->getMessage();
}

// 更新数据
try {
    $sql = "UPDATE users SET email='john.doe@example.com' WHERE id=1";
    $pdo->exec($sql);
    echo "Record updated successfully";
} catch(PDOException $e) {
    echo $sql . "<br>" . $e->getMessage();
}

// 删除数据
try {
    $sql = "DELETE FROM users WHERE id=1";
    $pdo->exec($sql);
    echo "Record deleted successfully";
} catch(PDOException $e) {
    echo $sql . "<br>" . $e->getMessage();
}
```

### 3. 预处理语句

```php
// 预处理语句 - 插入数据
$stmt = $pdo->prepare("INSERT INTO users (name, email) VALUES (:name, :email)");
$stmt->bindParam(':name', $name);
$stmt->bindParam(':email', $email);

// 设置参数并执行
$name = "John Doe";
$email = "john@example.com";
$stmt->execute();

$name = "Jane Smith";
$email = "jane@example.com";
$stmt->execute();

echo "New records created successfully";
```

## 数据库操作最佳实践

1. **使用预处理语句防止SQL注入**：
   - 始终使用预处理语句和参数绑定
   - 避免直接将用户输入拼接到SQL查询中

2. **选择合适的数据库扩展**：
   - 对于只需要连接MySQL的项目，可以使用MySQLi
   - 对于需要连接多种数据库的项目，使用PDO
   - 考虑使用ORM框架（如Doctrine、Eloquent）提高开发效率

3. **错误处理**：
   - 使用try/catch块捕获数据库异常
   - 开发环境中显示详细错误信息
   - 生产环境中记录错误信息，向用户显示友好错误提示

4. **连接管理**：
   - 使用连接池管理数据库连接
   - 操作完成后关闭数据库连接
   - 避免频繁创建和销毁数据库连接

5. **查询优化**：
   - 使用索引提高查询性能
   - 避免SELECT *，只查询需要的字段
   - 使用LIMIT限制返回的记录数量
   - 适当使用连接查询（JOIN）替代多次查询

6. **事务处理**：
   - 对于多个相关操作，使用事务确保数据一致性
   - 使用BEGIN、COMMIT和ROLLBACK管理事务

7. **安全措施**：
   - 不要在代码中硬编码数据库凭证
   - 使用环境变量或配置文件存储敏感信息
   - 限制数据库用户的权限
   - 定期备份数据库

## 事务处理

### 1. MySQLi事务处理

```php
// 面向对象方式
$conn->begin_transaction();

try {
    $conn->query("INSERT INTO users (name, email) VALUES ('John Doe', 'john@example.com')");
    $user_id = $conn->insert_id;
    $conn->query("INSERT INTO orders (user_id, product) VALUES ($user_id, 'Product 1')");
    $conn->commit();
    echo "Transaction completed successfully";
} catch (Exception $e) {
    $conn->rollback();
    echo "Transaction failed: " . $e->getMessage();
}
```

### 2. PDO事务处理

```php
try {
    $pdo->beginTransaction();
    
    $stmt = $pdo->prepare("INSERT INTO users (name, email) VALUES (?, ?)");
    $stmt->execute(["John Doe", "john@example.com"]);
    $user_id = $pdo->lastInsertId();
    
    $stmt = $pdo->prepare("INSERT INTO orders (user_id, product) VALUES (?, ?)");
    $stmt->execute([$user_id, "Product 1"]);
    
    $pdo->commit();
    echo "Transaction completed successfully";
} catch (PDOException $e) {
    $pdo->rollBack();
    echo "Transaction failed: " . $e->getMessage();
}
```

## 数据库连接池

对于高并发应用，可以使用数据库连接池来管理数据库连接。

```php
// 简单的数据库连接池实现
class DatabasePool {
    private static $instance;
    private $connections = [];
    private $maxConnections = 10;
    private $activeConnections = 0;

    private function __construct() {}

    public static function getInstance() {
        if (!self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function getConnection() {
        // 检查是否有空闲连接
        foreach ($this->connections as $key => $conn) {
            if ($conn['in_use'] === false) {
                $this->connections[$key]['in_use'] = true;
                return $conn['connection'];
            }
        }

        // 如果没有空闲连接且未达到最大连接数，创建新连接
        if ($this->activeConnections < $this->maxConnections) {
            $conn = $this->createConnection();
            $this->connections[] = [
                'connection' => $conn,
                'in_use' => true
            ];
            $this->activeConnections++;
            return $conn;
        }

        // 如果达到最大连接数，等待
        while (true) {
            foreach ($this->connections as $key => $conn) {
                if ($conn['in_use'] === false) {
                    $this->connections[$key]['in_use'] = true;
                    return $conn['connection'];
                }
            }
            usleep(1000); // 等待1毫秒
        }
    }

    public function releaseConnection($conn) {
        foreach ($this->connections as $key => $connection) {
            if ($connection['connection'] === $conn) {
                $this->connections[$key]['in_use'] = false;
                break;
            }
        }
    }

    private function createConnection() {
        $servername = "localhost";
        $username = "username";
        $password = "password";
        $dbname = "database";

        $conn = new mysqli($servername, $username, $password, $dbname);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        return $conn;
    }
}

// 使用连接池
$pool = DatabasePool::getInstance();
$conn1 = $pool->getConnection();
$conn2 = $pool->getConnection();

// 使用连接...

// 释放连接
$pool->releaseConnection($conn1);
$pool->releaseConnection($conn2);
```

## 常见问题

### 1. 如何防止SQL注入？

- 使用预处理语句和参数绑定
- 对用户输入进行过滤和转义
- 避免直接将用户输入拼接到SQL查询中

```php
// 安全的方式：使用预处理语句
$stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username AND password = :password");
$stmt->bindParam(':username', $username);
$stmt->bindParam(':password', $password);
$stmt->execute();
```

### 2. 如何优化数据库查询性能？

- 使用索引
- 避免SELECT *，只查询需要的字段
- 使用LIMIT限制返回的记录数量
- 适当使用连接查询（JOIN）替代多次查询
- 避免在WHERE子句中使用函数操作字段
- 使用EXPLAIN分析查询计划

### 3. 如何连接其他数据库？

PDO支持多种数据库，只需要更改连接字符串：

```php
// 连接PostgreSQL
$pdo = new PDO("pgsql:host=localhost;dbname=database;user=username;password=password");

// 连接SQLite
$pdo = new PDO("sqlite:/path/to/database.sqlite");

// 连接Oracle
$pdo = new PDO("oci:dbname=//localhost:1521/orcl;charset=utf8", "username", "password");
```

### 4. 什么是ORM？如何使用？

ORM（对象关系映射）是一种将数据库表映射到对象的技术，可以简化数据库操作。

以Eloquent ORM（Laravel框架的ORM）为例：

```php
// 定义模型
class User extends Eloquent {
    protected $table = 'users';
    protected $fillable = ['name', 'email', 'password'];
}

// 查询数据
$users = User::all();
$user = User::find(1);
$users = User::where('age', '>', 18)->get();

// 创建数据
$user = new User;
$user->name = 'John Doe';
$user->email = 'john@example.com';
$user->password = 'password123';
$user->save();

// 更新数据
$user = User::find(1);
$user->email = 'john.doe@example.com';
$user->save();

// 删除数据
$user = User::find(1);
$user->delete();
```

### 5. 如何处理大量数据？

- 使用分页查询
- 使用游标（cursor）逐行处理
- 批量插入和更新
- 避免在内存中加载大量数据

```php
// 使用PDO游标处理大量数据
$stmt = $pdo->prepare("SELECT * FROM large_table");
$stmt->execute();
$stmt->setFetchMode(PDO::FETCH_ASSOC);

while ($row = $stmt->fetch()) {
    // 处理每行数据
}
```