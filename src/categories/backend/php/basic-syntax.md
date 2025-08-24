# PHP 基础语法

## 概述

PHP（Hypertext Preprocessor）是一种广泛使用的开源服务器端脚本语言，特别适合Web开发。本章将详细介绍PHP的基础语法，包括变量、数据类型、运算符、控制流语句等核心概念。

## 变量与数据类型

### 变量

PHP中的变量以美元符号`$`开头，后跟变量名。变量名必须以字母或下划线开头，区分大小写。

```php
// 变量定义与赋值
$name = "John"; // 字符串
$age = 25; // 整数
$height = 1.75; // 浮点数
$isStudent = false; // 布尔值
```

### 数据类型

PHP支持以下主要数据类型：

#### 标量类型
- **字符串（string）**：字符序列，可以用单引号、双引号或定界符定义
- **整数（int）**：不带小数的数字
- **浮点数（float）**：带小数的数字
- **布尔值（bool）**：`true`或`false`

```php
// 字符串示例
$str1 = 'Hello World'; // 单引号字符串
$str2 = "Hello $name"; // 双引号字符串（支持变量解析）
$str3 = <<<EOT
这是一个
多行字符串
EOT;

// 整数示例
$int1 = 123; // 十进制
$int2 = 0123; // 八进制（0开头）
$int3 = 0x1A; // 十六进制（0x开头）

// 浮点数示例
$float1 = 1.23;
$float2 = 1.2e3; // 科学计数法

// 布尔值示例
$bool1 = true;
$bool2 = false;
```

#### 复合类型
- **数组（array）**：用于存储多个值的集合
- **对象（object）**：用于存储类的实例

```php
// 数组示例
$numbers = [1, 2, 3, 4, 5]; // 索引数组
$person = ["name" => "John", "age" => 25]; // 关联数组

// 对象示例
class Person {
    public $name;
    public $age;
}
$personObj = new Person();
$personObj->name = "John";
$personObj->age = 25;
```

#### 特殊类型
- **NULL**：表示变量没有值
- **资源（resource）**：表示外部资源的引用（如文件、数据库连接等）

```php
// NULL示例
$var = null;

// 资源示例
$file = fopen("example.txt", "r"); // 文件资源
```

## 运算符

### 算术运算符

```php
$a = 10;
$b = 5;

echo $a + $b; // 15
echo $a - $b; // 5
echo $a * $b; // 50
echo $a / $b; // 2
echo $a % $b; // 0（取模）
```

### 赋值运算符

```php
$a = 10;
$a += 5; // 等同于 $a = $a + 5
$a -= 5; // 等同于 $a = $a - 5
$a *= 2; // 等同于 $a = $a * 2
$a /= 2; // 等同于 $a = $a / 2
```

### 比较运算符

```php
$a = 10;
$b = 5;
$c = "10";

var_dump($a == $b); // false
var_dump($a == $c); // true（值相等）
var_dump($a === $c); // false（类型和值都相等才为true）
var_dump($a != $b); // true
var_dump($a > $b); // true
var_dump($a < $b); // false
```

### 逻辑运算符

```php
$x = true;
$y = false;

var_dump($x && $y); // false
var_dump($x || $y); // true
var_dump(!$x); // false
```

### 字符串运算符

```php
$str1 = "Hello";
$str2 = "World";

echo $str1 . $str2; // HelloWorld
$str1 .= $str2; // 等同于 $str1 = $str1 . $str2
```

## 控制流语句

### 条件语句

#### if语句

```php
$age = 20;

if ($age >= 18) {
    echo "成年人";
} elseif ($age >= 13) {
    echo "青少年";
} else {
    echo "儿童";
}
```

#### switch语句

```php
$day = 3;

switch ($day) {
    case 1:
        echo "星期一";
        break;
    case 2:
        echo "星期二";
        break;
    case 3:
        echo "星期三";
        break;
    default:
        echo "其他天";
}
```

### 循环语句

#### for循环

```php
for ($i = 0; $i < 5; $i++) {
    echo $i . "\n";
}
```

#### while循环

```php
$i = 0;
while ($i < 5) {
    echo $i . "\n";
    $i++;
}
```

#### do-while循环

```php
$i = 0;
do {
    echo $i . "\n";
    $i++;
} while ($i < 5);
```

#### foreach循环（用于数组）

```php
$fruits = ["苹果", "香蕉", "橙子"];

foreach ($fruits as $fruit) {
    echo $fruit . "\n";
}

// 关联数组
$person = ["name" => "John", "age" => 25];
foreach ($person as $key => $value) {
    echo $key . ": " . $value . "\n";
}
```

## 函数

### 函数定义与调用

```php
// 函数定义
function sayHello($name) {
    return "Hello, " . $name . "!";
}

// 函数调用
$result = sayHello("John");
echo $result; // 输出：Hello, John!
```

### 函数参数

```php
// 带默认参数的函数
function greet($name, $greeting = "Hello") {
    return $greeting . ", " . $name . "!";
}

echo greet("John"); // Hello, John!
echo greet("John", "Hi"); // Hi, John!

// 可变参数函数
function sum(...$numbers) {
    $total = 0;
    foreach ($numbers as $num) {
        $total += $num;
    }
    return $total;
}

echo sum(1, 2, 3, 4); // 10
```

### 闭包（匿名函数）

```php
$greet = function($name) {
    return "Hello, " . $name . "!";
};

echo $greet("John"); // Hello, John!

// 使用use关键字访问外部变量
$prefix = "Hello, ";
$greetWithPrefix = function($name) use ($prefix) {
    return $prefix . $name . "!";
};

echo $greetWithPrefix("John"); // Hello, John!
```

## 数组操作

### 索引数组

```php
$fruits = ["苹果", "香蕉", "橙子"];

// 访问数组元素
echo $fruits[0]; // 苹果

// 修改数组元素
$fruits[1] = "葡萄";

// 添加数组元素
$fruits[] = "草莓";

// 获取数组长度
echo count($fruits); // 4
```

### 关联数组

```php
$person = ["name" => "John", "age" => 25, "city" => "New York"];

// 访问数组元素
echo $person["name"]; // John

// 修改数组元素
$person["age"] = 26;

// 添加数组元素
$person["job"] = "Developer";
```

### 数组函数

```php
// 合并数组
$array1 = [1, 2, 3];
$array2 = [4, 5, 6];
$merged = array_merge($array1, $array2); // [1, 2, 3, 4, 5, 6]

// 查找元素
$found = in_array(3, $array1); // true

// 排序
$numbers = [3, 1, 4, 2, 5];
sort($numbers); // [1, 2, 3, 4, 5]
r sort($numbers); // [5, 4, 3, 2, 1]

// 关联数组排序
asort($person); // 按值排序
ksort($person); // 按键排序
```

## 字符串处理

```php
$str = "Hello World";

// 获取字符串长度
echo strlen($str); // 11

// 字符串转小写
echo strtolower($str); // hello world

// 字符串转大写
echo strtoupper($str); // HELLO WORLD

// 字符串替换
echo str_replace("World", "PHP", $str); // Hello PHP

// 字符串截取
echo substr($str, 0, 5); // Hello

// 字符串分割
$words = explode(" ", $str); // ["Hello", "World"]

// 数组转字符串
echo implode(" ", $words); // Hello World
```

## 错误处理

### 错误报告级别

```php
// 显示所有错误（开发环境）
error_reporting(E_ALL);
ini_set("display_errors", 1);

// 不显示错误（生产环境）
error_reporting(0);
ini_set("display_errors", 0);
```

### 异常处理

```php
try {
    // 可能出错的代码
    $result = 10 / 0;
} catch (Exception $e) {
    // 处理异常
    echo "错误信息: " . $e->getMessage();
}
```

## 最佳实践

1. 使用有意义的变量名和函数名
2. 遵循PSR编码规范
3. 对所有用户输入进行验证和过滤
4. 避免使用全局变量
5. 及时释放资源（如文件、数据库连接等）
6. 为代码添加适当的注释
7. 使用PHP的类型声明增强代码的可读性和健壮性
8. 避免在双引号字符串中包含大量变量，使用字符串拼接或sprintf替代
9. 使用自动加载代替大量的require/include语句
10. 定期更新PHP版本以获得更好的性能和安全性

## 常见问题

### 1. 单引号和双引号字符串有什么区别？
单引号字符串不会解析变量和转义序列，而双引号字符串会。对于简单字符串，使用单引号效率更高。

### 2. 如何检查变量是否已定义？
使用`isset()`函数可以检查变量是否已定义且不为NULL。

```php
if (isset($var)) {
    echo "变量已定义";
}
```

### 3. 如何处理PHP中的表单数据？
使用`$_GET`、`$_POST`或`$_REQUEST`超全局数组获取表单数据，并记得进行验证和过滤。

```php
$username = $_POST['username'] ?? '';
$username = htmlspecialchars($username); // 防止XSS攻击
```

### 4. 如何包含其他PHP文件？
使用`include`或`require`语句包含其他PHP文件。`require`在文件不存在时会产生致命错误，而`include`只会产生警告。

```php
require 'config.php'; // 必需文件
include 'functions.php'; // 可选文件
```