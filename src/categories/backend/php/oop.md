# PHP 面向对象编程

## 概述

面向对象编程（OOP）是一种编程范式，它使用"对象"来设计应用程序和计算机程序。PHP 5及以上版本提供了完整的面向对象编程支持。本章将详细介绍PHP中的面向对象编程概念和实践。

## 类与对象

### 类的定义

类是对象的模板，定义了对象的属性和方法。使用`class`关键字定义类。

```php
// 简单的类定义
class Person {
    // 属性
    public $name;
    public $age;
    private $email;

    // 方法
    public function greet() {
        return "Hello, my name is " . $this->name;
    }

    // 设置器方法
    public function setEmail($email) {
        $this->email = $email;
    }

    // 获取器方法
    public function getEmail() {
        return $this->email;
    }
}
```

### 创建对象

使用`new`关键字创建类的实例（对象）。

```php
// 创建对象
$person = new Person();

// 设置属性值
$person->name = "John";
$person->age = 25;
$person->setEmail("john@example.com");

// 调用方法
echo $person->greet(); // 输出：Hello, my name is John
echo $person->getEmail(); // 输出：john@example.com
```

### 构造函数

构造函数是一种特殊的方法，在创建对象时自动调用，用于初始化对象的属性。

```php
class Person {
    public $name;
    public $age;

    // 构造函数
    public function __construct($name, $age) {
        $this->name = $name;
        $this->age = $age;
    }

    public function greet() {
        return "Hello, my name is " . $this->name . " and I am " . $this->age . " years old.";
    }
}

// 使用构造函数创建对象
$person = new Person("John", 25);
echo $person->greet(); // 输出：Hello, my name is John and I am 25 years old.
```

### 析构函数

析构函数在对象被销毁时自动调用，用于释放资源。

```php
class FileHandler {
    private $file;

    public function __construct($filename) {
        $this->file = fopen($filename, "r");
    }

    public function readContent() {
        return fread($this->file, filesize($filename));
    }

    // 析构函数
    public function __destruct() {
        fclose($this->file);
    }
}
```

## 属性访问控制

PHP支持三种访问控制修饰符：
- `public`：公开的，可以在任何地方访问
- `protected`：受保护的，只能在类本身和其子类中访问
- `private`：私有的，只能在类本身中访问

```php
class Person {
    public $name;       // 公开属性
    protected $age;     // 受保护属性
    private $email;     // 私有属性

    public function __construct($name, $age, $email) {
        $this->name = $name;
        $this->age = $age;
        $this->email = $email;
    }

    // 可以访问所有属性的公开方法
    public function getInfo() {
        return "Name: " . $this->name . ", Age: " . $this->age . ", Email: " . $this->email;
    }
}

$person = new Person("John", 25, "john@example.com");
echo $person->name; // 可以访问，输出：John
echo $person->age; // 不能访问，会产生错误
echo $person->email; // 不能访问，会产生错误
echo $person->getInfo(); // 可以访问，输出完整信息
```

## 继承

继承允许创建一个新类（子类），从现有类（父类）继承属性和方法。使用`extends`关键字实现继承。

```php
// 父类
class Animal {
    protected $name;

    public function __construct($name) {
        $this->name = $name;
    }

    public function eat() {
        return $this->name . " is eating.";
    }
}

// 子类
class Dog extends Animal {
    public function bark() {
        return $this->name . " is barking.";
    }

    // 重写父类方法
    public function eat() {
        return $this->name . " is eating dog food.";
    }
}

$dog = new Dog("Buddy");
echo $dog->eat(); // 输出：Buddy is eating dog food.
echo $dog->bark(); // 输出：Buddy is barking.
```

### 调用父类方法

使用`parent::`关键字调用父类的方法。

```php
class Dog extends Animal {
    public function eat() {
        // 调用父类的eat方法
        return parent::eat() . " Specifically, dog food.";
    }
}

$dog = new Dog("Buddy");
echo $dog->eat(); // 输出：Buddy is eating. Specifically, dog food.
```

## 多态

多态允许不同类的对象对同一消息作出不同的响应。在PHP中，多态通常通过接口和抽象类实现。

### 接口

接口定义了一个类应该实现的方法，但不提供方法的实现。使用`interface`关键字定义接口，`implements`关键字实现接口。

```php
interface Animal {
    public function eat();
    public function makeSound();
}

class Dog implements Animal {
    private $name;

    public function __construct($name) {
        $this->name = $name;
    }

    public function eat() {
        return $this->name . " is eating dog food.";
    }

    public function makeSound() {
        return $this->name . " says Woof!";
    }
}

class Cat implements Animal {
    private $name;

    public function __construct($name) {
        $this->name = $name;
    }

    public function eat() {
        return $this->name . " is eating cat food.";
    }

    public function makeSound() {
        return $this->name . " says Meow!";
    }
}

// 多态示例
function animalSound(Animal $animal) {
    return $animal->makeSound();
}

$dog = new Dog("Buddy");
$cat = new Cat("Whiskers");
echo animalSound($dog); // 输出：Buddy says Woof!
echo animalSound($cat); // 输出：Whiskers says Meow!
```

### 抽象类

抽象类是不能被实例化的类，通常包含抽象方法（没有实现的方法）。使用`abstract`关键字定义抽象类和抽象方法。

```php
abstract class Animal {
    protected $name;

    public function __construct($name) {
        $this->name = $name;
    }

    // 抽象方法
    abstract public function makeSound();

    // 具体方法
    public function eat() {
        return $this->name . " is eating.";
    }
}

class Dog extends Animal {
    public function makeSound() {
        return $this->name . " says Woof!";
    }
}

class Cat extends Animal {
    public function makeSound() {
        return $this->name . " says Meow!";
    }
}
```

## 静态属性和方法

静态属性和方法属于类本身，而不是类的实例。使用`static`关键字定义静态成员。

```php
class Math {
    // 静态属性
    public static $pi = 3.14159;

    // 静态方法
    public static function add($a, $b) {
        return $a + $b;
    }
}

// 访问静态属性
echo Math::$pi; // 输出：3.14159

// 调用静态方法
echo Math::add(5, 3); // 输出：8
```

## 命名空间

命名空间用于解决类名冲突问题，使用`namespace`关键字定义命名空间。

```php
// 定义命名空间
namespace MyApp\Models;

class User {
    // 类定义
}

// 使用命名空间
$user = new MyApp\Models\User();

// 或者使用use语句导入
use MyApp\Models\User;
$user = new User();
```

## 特质（Traits）

特质用于在类之间共享方法，避免多重继承的问题。使用`trait`关键字定义特质。

```php
trait Logger {
    public function log($message) {
        echo "[LOG] " . date("Y-m-d H:i:s") . ": " . $message . "\n";
    }
}

class User {
    use Logger;

    public function create() {
        // 创建用户的逻辑
        $this->log("User created");
    }
}

class Product {
    use Logger;

    public function create() {
        // 创建产品的逻辑
        $this->log("Product created");
    }
}
```

## 魔术方法

PHP提供了一系列魔术方法，用于拦截对象的各种操作。

```php
class Person {
    private $data = [];

    // 魔术方法：设置属性
    public function __set($name, $value) {
        $this->data[$name] = $value;
    }

    // 魔术方法：获取属性
    public function __get($name) {
        return isset($this->data[$name]) ? $this->data[$name] : null;
    }

    // 魔术方法：检查属性是否存在
    public function __isset($name) {
        return isset($this->data[$name]);
    }

    // 魔术方法：删除属性
    public function __unset($name) {
        unset($this->data[$name]);
    }

    // 魔术方法：当对象被当作字符串时调用
    public function __toString() {
        return "Person: " . $this->name;
    }
}

$person = new Person();
$person->name = "John";
$person->age = 25;
echo $person->name; // 输出：John
echo $person; // 输出：Person: John
```

## 最佳实践

1. 遵循单一职责原则：一个类应该只负责一项功能
2. 使用有意义的类名和方法名
3. 合理使用访问控制修饰符，封装内部实现细节
4. 优先使用组合而非继承
5. 使用接口定义类的行为契约
6. 为类添加适当的文档注释
7. 避免在类中使用全局变量
8. 使用依赖注入提高代码的可测试性和可维护性
9. 遵循PSR-1和PSR-2编码规范
10. 避免过度设计，保持类的简洁性

## 常见问题

### 1. 什么是依赖注入？
依赖注入是一种设计模式，用于减少类之间的耦合。它允许将一个类所依赖的对象通过构造函数或方法参数传入，而不是在类内部创建。

```php
class UserService {
    private $db;

    // 构造函数注入
    public function __construct(Database $db) {
        $this->db = $db;
    }

    public function getUsers() {
        return $this->db->query("SELECT * FROM users");
    }
}
```

### 2. 如何实现单例模式？
单例模式确保一个类只有一个实例，并提供一个全局访问点。

```php
class Singleton {
    private static $instance;

    // 私有构造函数防止外部创建实例
    private function __construct() {}

    // 获取实例的静态方法
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
}

$instance1 = Singleton::getInstance();
$instance2 = Singleton::getInstance();
var_dump($instance1 === $instance2); // true
```

### 3. 什么是自动加载？
自动加载允许在需要时自动加载类文件，而不需要手动包含。PHP提供了`spl_autoload_register`函数用于注册自动加载器。

```php
spl_autoload_register(function($className) {
    // 将命名空间分隔符替换为目录分隔符
    $path = str_replace('\\', DIRECTORY_SEPARATOR, $className);
    // 加载类文件
    require_once __DIR__ . '/' . $path . '.php';
});
```

### 4. 如何实现类的序列化和反序列化？
使用`serialize`和`unserialize`函数可以实现对象的序列化和反序列化。可以通过`__sleep`和`__wakeup`魔术方法控制序列化和反序列化过程。

```php
class Person {
    public $name;
    public $age;
    private $secret;

    public function __construct($name, $age, $secret) {
        $this->name = $name;
        $this->age = $age;
        $this->secret = $secret;
    }

    // 控制序列化过程
    public function __sleep() {
        // 只序列化name和age属性
        return ['name', 'age'];
    }

    // 控制反序列化过程
    public function __wakeup() {
        // 反序列化后执行的逻辑
        $this->secret = 'default';
    }
}

$person = new Person("John", 25, "hidden");
$serialized = serialize($person);
$unserialized = unserialize($serialized);
var_dump($unserialized); // 包含name和age属性，但secret属性为'default'
```