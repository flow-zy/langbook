# PHP 错误处理

## 概述

在PHP开发中，错误处理是一个重要的环节。良好的错误处理机制可以帮助开发者及时发现和解决问题，提高应用程序的健壮性和可靠性。本章将详细介绍PHP中的错误处理技术和最佳实践。

## PHP错误类型

PHP定义了多种错误类型，主要包括以下几类：

### 1. 语法错误

语法错误是最常见的错误类型，通常是由于代码不符合PHP语法规则导致的。这类错误会导致PHP解析器无法正常工作，通常在代码执行前就会被检测到。

```php
// 语法错误示例：缺少分号
$name = "John"
echo $name;
```

### 2. 运行时错误

运行时错误发生在代码执行过程中，例如试图访问不存在的文件或调用未定义的函数。

```php
// 运行时错误示例：调用未定义的函数
undefinedFunction();
```

### 3. 逻辑错误

逻辑错误是最难调试的错误类型，因为代码语法正确且能够运行，但产生的结果不符合预期。

```php
// 逻辑错误示例：错误的条件判断
$age = 18;
if ($age > 18) {
    echo "Adult";
} else {
    echo "Not adult";
}
// 输出：Not adult (逻辑错误，应该是>=18)
```

### 4. 通知（Notice）

通知是最低级别的错误，表示代码中存在潜在问题，但不会影响程序的正常运行。

```php
// 通知示例：访问未定义的变量
$name = "John";
echo $name . " " . $age;
// 输出：John 并产生一个Notice错误：Undefined variable: age
```

### 5. 警告（Warning）

警告比通知严重，表示代码中存在问题，但程序仍然可以继续执行。

```php
// 警告示例：包含不存在的文件
include "non_existent_file.php";
// 产生Warning错误，但程序继续执行
```

### 6. 致命错误（Fatal Error）

致命错误是最严重的错误类型，会导致程序立即终止执行。

```php
// 致命错误示例：调用未定义的类
$obj = new NonExistentClass();
// 产生Fatal Error，程序终止
```

## 错误报告设置

PHP提供了多种配置选项来控制错误报告的显示方式和级别。

### 1. 配置文件设置

在php.ini文件中，可以通过以下配置选项设置错误报告：

```ini
// 显示所有错误
error_reporting = E_ALL

// 显示所有错误，但不包括通知
error_reporting = E_ALL & ~E_NOTICE

// 是否显示错误
display_errors = On

// 是否将错误记录到日志文件
log_errors = On

// 错误日志文件路径
error_log = "/var/log/php_errors.log"
```

### 2. 运行时设置

在PHP脚本中，可以使用`error_reporting`函数动态设置错误报告级别。

```php
// 显示所有错误
error_reporting(E_ALL);

// 显示所有错误，但不包括通知
error_reporting(E_ALL & ~E_NOTICE);

// 开启错误显示
ini_set('display_errors', 1);

// 关闭错误显示
ini_set('display_errors', 0);

// 开启错误日志
ini_set('log_errors', 1);

// 设置错误日志文件
ini_set('error_log', '/path/to/php_errors.log');
```

## 错误处理函数

PHP提供了`set_error_handler`函数，可以自定义错误处理函数。

```php
// 自定义错误处理函数
function customErrorHandler($errno, $errstr, $errfile, $errline) {
    echo "<b>Error:</b> [$errno] $errstr<br>";
    echo "Error on line $errline in $errfile<br>";
    // 对于致命错误，终止脚本
    if ($errno == E_ERROR) {
        die("Fatal error occurred");
    }
    // 返回true表示已处理错误
    return true;
}

// 注册自定义错误处理函数
set_error_handler("customErrorHandler");

// 触发错误
echo $undefinedVariable;
```

## 异常处理

PHP 5及以上版本支持异常处理机制，使用`try`、`catch`和`throw`关键字。

### 1. 基本异常处理

```php
try {
    // 可能抛出异常的代码
    $file = fopen("non_existent_file.txt", "r");
    if (!$file) {
        throw new Exception("File not found");
    }
} catch (Exception $e) {
    // 捕获并处理异常
    echo "Error: " . $e->getMessage() . "<br>";
    echo "Line: " . $e->getLine() . "<br>";
    echo "File: " . $e->getFile() . "<br>";
    echo "Trace: " . $e->getTraceAsString() . "<br>";
}
```

### 2. 自定义异常类

可以创建自定义异常类，继承自PHP内置的`Exception`类。

```php
// 自定义异常类
class FileException extends Exception {
    public function __construct($message, $code = 0, Exception $previous = null) {
        parent::__construct($message, $code, $previous);
    }

    public function __toString() {
        return __CLASS__ . ": [{$this->code}]: {$this->message}\n";    }
}

// 使用自定义异常类
try {
    $file = fopen("non_existent_file.txt", "r");
    if (!$file) {
        throw new FileException("File not found");
    }
} catch (FileException $e) {
    echo "File Error: " . $e->getMessage() . "<br>";
} catch (Exception $e) {
    echo "General Error: " . $e->getMessage() . "<br>";
}
```

### 3. finally块

PHP 5.5及以上版本支持`finally`块，无论是否抛出异常，`finally`块中的代码都会被执行。

```php
try {
    // 可能抛出异常的代码
    $file = fopen("file.txt", "r");
    // 执行一些操作
} catch (Exception $e) {
    // 处理异常
    echo "Error: " . $e->getMessage();
} finally {
    // 无论是否抛出异常，都会执行
    if (isset($file)) {
        fclose($file);
    }
}
```

## 错误日志记录

将错误记录到日志文件是一种良好的实践，可以帮助开发者追踪和分析问题。

### 1. 使用error_log函数

```php
// 将错误信息记录到默认错误日志
error_log("This is an error message");

// 将错误信息记录到指定文件
error_log("This is an error message", 3, "/path/to/error.log");

// 通过电子邮件发送错误信息
error_log("This is an error message", 1, "admin@example.com");
```

### 2. 自定义日志记录函数

```php
function logError($message, $level = 'error') {
    $timestamp = date("Y-m-d H:i:s");
    $logMessage = "[$timestamp] [$level] $message\n";
    error_log($logMessage, 3, "/path/to/application.log");
}

// 使用自定义日志函数
logError("Database connection failed");
logError("Invalid user input", 'warning');
logError("Application started", 'info');
```

## 错误处理最佳实践

1. **开发环境与生产环境的区别对待**：
   - 开发环境：显示所有错误，便于调试
   - 生产环境：关闭错误显示，开启错误日志记录

2. **使用异常处理机制**：
   - 对于可预见的错误，使用异常处理
   - 对于不可预见的错误，使用错误处理函数

3. **详细记录错误信息**：
   - 记录错误发生的时间、位置、错误信息和堆栈跟踪
   - 对于生产环境，避免记录敏感信息

4. **分级错误处理**：
   - 使用不同级别的错误（致命错误、警告、通知）
   - 根据错误级别采取不同的处理策略

5. **使用断言**：
   - 对于开发阶段，可以使用断言验证代码假设
   - 生产环境中应禁用断言

6. **避免忽略错误**：
   - 不要使用`@`操作符抑制错误报告
   - 不要忽略错误返回值

7. **使用第三方日志库**：
   - 考虑使用Monolog等成熟的日志库
   - 这些库提供更丰富的日志功能和更好的性能

## 常见问题

### 1. 如何在生产环境中隐藏错误但记录错误？

```php
// 生产环境错误设置
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', '/path/to/php_errors.log');
```

### 2. 如何处理数据库错误？

```php
// 数据库错误处理示例
$mysqli = new mysqli("localhost", "username", "password", "database");

// 检查连接错误
if ($mysqli->connect_error) {
    logError("Database connection failed: " . $mysqli->connect_error);
    die("Sorry, we are experiencing technical difficulties.");
}

// 执行查询
$query = "SELECT * FROM users";
$result = $mysqli->query($query);

// 检查查询错误
if (!$result) {
    logError("Database query failed: " . $mysqli->error);
    die("Sorry, we are experiencing technical difficulties.");
}
```

### 3. 如何使用Monolog库记录日志？

Monolog是PHP中流行的日志库，提供了丰富的日志功能。

```php
// 安装Monolog
// composer require monolog/monolog

// 使用Monolog
use Monolog\Logger;
use Monolog\Handler\StreamHandler;

// 创建日志实例
$log = new Logger('application');
// 添加文件处理器
$log->pushHandler(new StreamHandler('/path/to/application.log', Logger::DEBUG));

// 记录不同级别的日志
$log->info('Application started');
$log->warning('Invalid user input');
$log->error('Database connection failed');
$log->debug('User data: ' . print_r($userData, true));
```

### 4. 如何捕获和处理所有异常？

可以使用全局异常处理器捕获未被处理的异常。

```php
// 全局异常处理器
function globalExceptionHandler(Exception $e) {
    logError("Uncaught exception: " . $e->getMessage() . " in " . $e->getFile() . " on line " . $e->getLine());
    logError("Stack trace: " . $e->getTraceAsString());
    // 向用户显示友好错误信息
    echo "Sorry, we are experiencing technical difficulties. Please try again later.";
}

// 注册全局异常处理器
set_exception_handler("globalExceptionHandler");
```

### 5. 如何区分错误和异常？

- **错误**：通常是由PHP引擎产生的，例如语法错误、致命错误等
- **异常**：是由代码显式抛出的，可以被捕获和处理
- 在PHP 7及以上版本中，许多传统的错误被转换为异常，可以使用异常处理机制处理

### 6. 如何调试PHP代码？

- 使用`var_dump()`和`print_r()`函数输出变量值
- 使用Xdebug扩展进行高级调试
- 使用PHPStorm等IDE提供的调试功能
- 记录详细的日志信息
- 使用`die()`和`exit()`函数在特定点终止代码执行，检查变量值