# PHP 数组与字符串处理

## 概述

数组和字符串是PHP中最常用的数据类型之一。本章将详细介绍PHP中的数组和字符串操作，包括创建、访问、修改、遍历和处理等方面的内容。

## 数组操作

### 1. 数组的创建

PHP支持两种数组：索引数组和关联数组。

```php
// 索引数组
$fruits = array("apple", "banana", "orange");
// 或简化语法
$fruits = ["apple", "banana", "orange"];

// 关联数组
$person = array(
    "name" => "John",
    "age" => 25,
    "email" => "john@example.com"
);
// 或简化语法
$person = [
    "name" => "John",
    "age" => 25,
    "email" => "john@example.com"
];
```

### 2. 访问数组元素

```php
// 访问索引数组元素
$fruits = ["apple", "banana", "orange"];
echo $fruits[0]; // 输出：apple
echo $fruits[1]; // 输出：banana

// 访问关联数组元素
$person = ["name" => "John", "age" => 25];
echo $person["name"]; // 输出：John
echo $person["age"]; // 输出：25
```

### 3. 修改数组元素

```php
$fruits = ["apple", "banana", "orange"];
$fruits[0] = "pear"; // 修改第一个元素
print_r($fruits); // 输出：Array ( [0] => pear [1] => banana [2] => orange )

$person = ["name" => "John", "age" => 25];
$person["age"] = 26; // 修改age的值
print_r($person); // 输出：Array ( [name] => John [age] => 26 )
```

### 4. 数组遍历

#### 4.1 for循环

```php
$fruits = ["apple", "banana", "orange"];
for ($i = 0; $i < count($fruits); $i++) {
    echo $fruits[$i] . "<br>";
}
```

#### 4.2 foreach循环

```php
// 遍历索引数组
$fruits = ["apple", "banana", "orange"];
foreach ($fruits as $fruit) {
    echo $fruit . "<br>";
}

// 遍历关联数组
$person = ["name" => "John", "age" => 25];
foreach ($person as $key => $value) {
    echo $key . ": " . $value . "<br>";
}
```

### 5. 数组函数

PHP提供了丰富的数组处理函数。

#### 5.1 数组排序

```php
// 升序排序
$fruits = ["orange", "apple", "banana"];
sort($fruits);
print_r($fruits); // 输出：Array ( [0] => apple [1] => banana [2] => orange )

// 降序排序
rsort($fruits);
print_r($fruits); // 输出：Array ( [0] => orange [1] => banana [2] => apple )

// 关联数组按键排序
$person = ["age" => 25, "name" => "John"];
ksort($person);
print_r($person); // 输出：Array ( [age] => 25 [name] => John )

// 关联数组按值排序
asort($person);
print_r($person); // 输出：Array ( [age] => 25 [name] => John )
```

#### 5.2 数组操作

```php
// 合并数组
$array1 = ["apple", "banana"];
$array2 = ["orange", "pear"];
$combined = array_merge($array1, $array2);
print_r($combined); // 输出：Array ( [0] => apple [1] => banana [2] => orange [3] => pear )

// 数组切片
$fruits = ["apple", "banana", "orange", "pear"];
$slice = array_slice($fruits, 1, 2);
print_r($slice); // 输出：Array ( [0] => banana [1] => orange )

// 数组过滤
$numbers = [1, 2, 3, 4, 5, 6];
$evenNumbers = array_filter($numbers, function($num) {
    return $num % 2 == 0;
});
print_r($evenNumbers); // 输出：Array ( [1] => 2 [3] => 4 [5] => 6 )

// 数组映射
$numbers = [1, 2, 3, 4, 5];
$squaredNumbers = array_map(function($num) {
    return $num * $num;
}, $numbers);
print_r($squaredNumbers); // 输出：Array ( [0] => 1 [1] => 4 [2] => 9 [3] => 16 [4] => 25 )
```

### 6. 多维数组

```php
// 二维数组
$users = [
    ["name" => "John", "age" => 25],
    ["name" => "Jane", "age" => 30],
    ["name" => "Bob", "age" => 35]
];

// 访问二维数组元素
echo $users[0]["name"]; // 输出：John
echo $users[1]["age"]; // 输出：30

// 遍历二维数组
foreach ($users as $user) {
    echo "Name: " . $user["name"] . ", Age: " . $user["age"] . "<br>";
}
```

## 字符串操作

### 1. 字符串的创建

```php
// 单引号字符串
$str1 = 'Hello, World!';

// 双引号字符串（支持变量解析）
$name = "John";
$str2 = "Hello, $name!";
echo $str2; // 输出：Hello, John!

//  heredoc语法
$str3 = <<<EOT
This is a
multi-line
string.
EOT;

// nowdoc语法（类似于单引号字符串）
$str4 = <<<'EOT'
This is a
multi-line
string without variable parsing.
EOT;
```

### 2. 字符串连接

```php
$str1 = "Hello, ";
$str2 = "World!";
$str3 = $str1 . $str2;
echo $str3; // 输出：Hello, World!

// 连接赋值运算符
$str1 .= $str2;
echo $str1; // 输出：Hello, World!
```

### 3. 字符串长度和访问

```php
$str = "Hello, World!";
echo strlen($str); // 输出：13

echo $str[0]; // 输出：H
echo $str[7]; // 输出：W
```

### 4. 字符串查找和替换

```php
$str = "Hello, World!";

// 查找子字符串位置
echo strpos($str, "World"); // 输出：7

echo strstr($str, "World"); // 输出：World!

echo str_replace("World", "PHP", $str); // 输出：Hello, PHP!

echo substr($str, 7); // 输出：World!

echo substr($str, 0, 5); // 输出：Hello
```

### 5. 字符串格式化

```php
// 格式化数字
$number = 1234.56;
echo number_format($number, 2); // 输出：1,234.56

echo number_format($number, 2, ",", "."); // 输出：1.234,56

// 格式化字符串
$name = "John";
$age = 25;
echo sprintf("My name is %s and I am %d years old.", $name, $age); // 输出：My name is John and I am 25 years old.
```

### 6. 字符串转换

```php
$str = "Hello, World!";

echo strtolower($str); // 输出：hello, world!

echo strtoupper($str); // 输出：HELLO, WORLD!

echo ucfirst(strtolower($str)); // 输出：Hello, world!

echo ucwords(strtolower($str)); // 输出：Hello, World!
```

### 7. 字符串修剪

```php
$str = "   Hello, World!   ";

echo trim($str); // 输出：Hello, World!

echo ltrim($str); // 输出：Hello, World!   

echo rtrim($str); // 输出：   Hello, World!
```

### 8. 字符串分割和连接

```php
// 分割字符串
$str = "apple,banana,orange";
$fruits = explode(",", $str);
print_r($fruits); // 输出：Array ( [0] => apple [1] => banana [2] => orange )

// 连接数组元素
$fruits = ["apple", "banana", "orange"];
$str = implode(", ", $fruits);
echo $str; // 输出：apple, banana, orange
```

## 正则表达式

### 1. 基本语法

PHP中的正则表达式使用PCRE（Perl Compatible Regular Expressions）库。

```php
// 匹配邮箱地址
$email = "john@example.com";
if (preg_match("/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/", $email)) {
    echo "Valid email address";
} else {
    echo "Invalid email address";
}
```

### 2. 正则表达式函数

```php
// 查找匹配
$str = "The quick brown fox jumps over the lazy dog";
preg_match("/fox/i", $str, $matches);
print_r($matches); // 输出：Array ( [0] => fox )

// 查找所有匹配
$str = "The quick brown fox jumps over the lazy dog. The fox is quick.";
preg_match_all("/fox/i", $str, $matches);
print_r($matches); // 输出：Array ( [0] => Array ( [0] => fox [1] => fox ) )

// 替换匹配
$str = "The quick brown fox jumps over the lazy dog";
$newStr = preg_replace("/fox/i", "cat", $str);
echo $newStr; // 输出：The quick brown cat jumps over the lazy dog

// 分割字符串
$str = "The quick brown fox jumps over the lazy dog";
$words = preg_split("/\s+/", $str);
print_r($words); // 输出：Array ( [0] => The [1] => quick [2] => brown [3] => fox [4] => jumps [5] => over [6] => the [7] => lazy [8] => dog )
```

## 数组与字符串的相互转换

```php
// 数组转字符串
$fruits = ["apple", "banana", "orange"];
$str = implode(", ", $fruits);
echo $str; // 输出：apple, banana, orange

// 字符串转数组
$str = "apple, banana, orange";
$fruits = explode(", ", $str);
print_r($fruits); // 输出：Array ( [0] => apple [1] => banana [2] => orange )

// 将查询字符串转换为关联数组
$queryString = "name=John&age=25&email=john@example.com";
parse_str($queryString, $params);
print_r($params); // 输出：Array ( [name] => John [age] => 25 [email] => john@example.com )

// 将关联数组转换为JSON字符串
$person = ["name" => "John", "age" => 25, "email" => "john@example.com"];
$json = json_encode($person);
echo $json; // 输出：{"name":"John","age":25,"email":"john@example.com"}

// 将JSON字符串转换为关联数组
$json = '{"name":"John","age":25,"email":"john@example.com"}';
$person = json_decode($json, true);
print_r($person); // 输出：Array ( [name] => John [age] => 25 [email] => john@example.com )
```

## 最佳实践

1. **数组操作**：
   - 使用`count()`函数获取数组长度时，对于大型数组，先将结果保存在变量中避免多次调用
   - 使用`isset()`或`array_key_exists()`检查数组键是否存在
   - 对于关联数组，使用`foreach`循环而不是`for`循环
   - 避免在循环中修改数组结构

2. **字符串操作**：
   - 对于简单字符串连接，使用`.`运算符；对于复杂字符串，使用`sprintf()`函数
   - 对于大型字符串操作，考虑使用`heredoc`或`nowdoc`语法提高可读性
   - 避免在循环中进行大量字符串连接，使用数组收集然后`implode()`更高效
   - 使用`mb_*`函数处理多字节字符（如UTF-8字符串）

3. **正则表达式**：
   - 复杂正则表达式使用注释和格式化提高可读性
   - 对于频繁执行的正则表达式，使用预编译模式（`preg_match_all`的`PREG_PATTERN_ORDER`选项）
   - 避免过度使用正则表达式，简单的字符串操作使用普通字符串函数更高效

## 常见问题

### 1. 如何处理数组中的空值？

```php
$array = ["apple", null, "banana", "", "orange"];
// 移除所有空值（包括null和空字符串）
$filteredArray = array_filter($array);
print_r($filteredArray); // 输出：Array ( [0] => apple [2] => banana [4] => orange )

// 只移除null值
$filteredArray = array_filter($array, function($value) {
    return !is_null($value);
});
print_r($filteredArray); // 输出：Array ( [0] => apple [2] => banana [3] =>  [4] => orange )
```

### 2. 如何检查数组是否包含某个值？

```php
$fruits = ["apple", "banana", "orange"];
if (in_array("banana", $fruits)) {
    echo "Banana is in the array";
} else {
    echo "Banana is not in the array";
}

// 检查键是否存在
$person = ["name" => "John", "age" => 25];
if (array_key_exists("name", $person)) {
    echo "Name key exists";
} else {
    echo "Name key does not exist";
}
```

### 3. 如何处理多字节字符串？

PHP提供了`mbstring`扩展来处理多字节字符串：

```php
// 确保已启用mbstring扩展

$str = "你好，世界！";

echo mb_strlen($str); // 输出：6

echo mb_substr($str, 0, 2); // 输出：你好

echo mb_strtolower($str); // 对于中文无变化，但对字母有效
```

### 4. 如何安全地处理用户输入的字符串？

- 使用`htmlspecialchars()`防止XSS攻击
- 使用`strip_tags()`移除HTML标签
- 使用`addslashes()`或参数化查询防止SQL注入
- 对于文件路径，使用`realpath()`和`basename()`确保安全

```php
// 防止XSS攻击
$userInput = "<script>alert('XSS');</script>";
$safeInput = htmlspecialchars($userInput);
echo $safeInput; // 输出：&lt;script&gt;alert('XSS');&lt;/script&gt;

// 移除HTML标签
$userInput = "<p>Hello, <strong>World!</strong></p>";
$safeInput = strip_tags($userInput);
echo $safeInput; // 输出：Hello, World!
```