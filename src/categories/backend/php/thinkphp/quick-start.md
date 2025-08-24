# ThinkPHP快速入门

## 环境要求

在开始使用ThinkPHP之前，确保你的开发环境满足以下要求：

- PHP 7.2.0+（推荐PHP 7.4+或PHP 8.0+）
- MySQL 5.6+或其他兼容数据库
- Apache或Nginx Web服务器
- Composer（用于安装依赖）

## 安装ThinkPHP

### 方法1：使用Composer安装

打开命令行工具，执行以下命令：

```bash
composer create-project topthink/think myproject
```

这个命令会创建一个名为`myproject`的新目录，并在其中安装ThinkPHP框架。

### 方法2：下载安装包

你也可以从[官方网站](https://www.thinkphp.cn/)下载最新的安装包，然后解压到你的Web服务器目录。

## 项目结构介绍

安装完成后，ThinkPHP项目的主要结构如下：

```
myproject/
├── app/                 # 应用目录
│   ├── controller/      # 控制器目录
│   ├── model/           # 模型目录
│   ├── view/            # 视图目录
│   ├── config/          # 应用配置目录
│   └── ...
├── public/              # 网站根目录
│   ├── index.php        # 入口文件
│   └── static/          # 静态资源目录
├── think                # 命令行工具
├── composer.json        # 项目依赖
└── ...
```

## 配置服务器

### Apache配置

确保你的Apache服务器启用了`mod_rewrite`模块，然后在项目根目录下创建`.htaccess`文件：

```apache
<IfModule mod_rewrite.c>
  Options +FollowSymlinks -Multiviews
  RewriteEngine On

  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteRule ^(.*)$ index.php/$1 [QSA,PT,L]
</IfModule>
```

### Nginx配置

在Nginx的配置文件中添加以下代码：

```nginx
server {
    listen       80;
    server_name  yourdomain.com;
    root         /path/to/myproject/public;

    location / {
        index  index.php index.html;
        if (!-e $request_filename) {
            rewrite  ^(.*)$  /index.php?s=/$1  last;
            break;
        }
    }

    location ~ \.php$ {
        fastcgi_pass   127.0.0.1:9000;
        fastcgi_index  index.php;
        fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
        include        fastcgi_params;
    }
}
```

## 创建第一个控制器

在`app/controller`目录下创建一个`Index.php`文件：

```php
<?php
namespace app\controller;

use think\Controller;

class Index extends Controller
{
    public function index()
    {
        // 渲染视图
        return $this->fetch();
    }

    public function hello($name = 'ThinkPHP')
    {
        // 返回字符串
        return 'Hello, ' . $name . '!';
    }
}
```

## 创建视图

在`app/view`目录下创建一个`index`目录，然后在其中创建一个`index.html`文件：

```html
<!DOCTYPE html>
<html>
<head>
    <title>ThinkPHP快速入门</title>
</head>
<body>
    <h1>欢迎使用ThinkPHP框架</h1>
    <p><a href="{:url('index/hello')}">Say Hello</a></p>
</body>
</html>
```

## 路由配置

打开`app/config/route.php`文件，添加以下路由规则：

```php
<?php
use think\facade\Route;

// 定义首页路由
Route::get('/', 'index/index');

// 定义hello路由
Route::get('hello/:name', 'index/hello');
```

## 运行应用

### 方法1：使用内置服务器

打开命令行工具，进入项目根目录，执行以下命令：

```bash
php think run
```

然后在浏览器中访问`http://localhost:8000`即可看到应用首页。

### 方法2：使用Web服务器

将你的项目部署到Apache或Nginx服务器，然后在浏览器中访问你的域名或`http://localhost/myproject/public`。

## 数据库操作

### 配置数据库

打开`app/config/database.php`文件，配置你的数据库连接：

```php
<?php
return [
    // 数据库类型
    'type'            => 'mysql',
    // 服务器地址
    'hostname'        => '127.0.0.1',
    // 数据库名
    'database'        => 'myproject',
    // 用户名
    'username'        => 'root',
    // 密码
    'password'        => 'yourpassword',
    // 端口
    'hostport'        => '3306',
    // 数据库编码默认采用utf8
    'charset'         => 'utf8',
    // 数据库表前缀
    'prefix'          => 'tp_',
    // 其他配置...
];
```

### 创建模型

在`app/model`目录下创建一个`User.php`文件：

```php
<?php
namespace app\model;

use think\Model;

class User extends Model
{
    // 模型对应的表名
    protected $table = 'tp_user';

    // 自动时间戳
    protected $autoWriteTimestamp = true;
}
```

### 数据库操作示例

```php
// 查询用户
$user = User::find(1);
echo $user->name;

// 查询所有用户
$users = User::select();
foreach ($users as $user) {
    echo $user->name . '<br>';
}

// 添加用户
$user = new User;
$user->name = '张三';
$user->email = 'zhangsan@example.com';
$user->save();

// 更新用户
$user = User::find(1);
$user->name = '李四';
$user->save();

// 删除用户
User::destroy(1);
```

## 表单验证

### 创建验证器

在`app/validate`目录下创建一个`User.php`文件：

```php
<?php
namespace app\validate;

use think\Validate;

class User extends Validate
{
    protected $rule = [
        'name'  => 'require|max:25',
        'email' => 'require|email',
        'age'   => 'number|between:1,120',
    ];

    protected $message = [
        'name.require' => '名称必须填写',
        'name.max'     => '名称最多不能超过25个字符',
        'email.require' => '邮箱必须填写',
        'email.email'   => '邮箱格式不正确',
        'age.number'    => '年龄必须是数字',
        'age.between'   => '年龄必须在1-120之间',
    ];
}
```

### 使用验证器

```php
<?php
namespace app\controller;

use app\validate\User as UserValidate;
use think\Controller;

class User extends Controller
{
    public function add()
    {
        $data = [
            'name'  => $this->request->param('name'),
            'email' => $this->request->param('email'),
            'age'   => $this->request->param('age'),
        ];

        $validate = new UserValidate();
        if (!$validate->check($data)) {
            return $this->error($validate->getError());
        }

        // 验证通过，继续处理...
        return $this->success('添加成功');
    }
}
```

## 常见问题

### 1. 如何访问控制器中的方法？

在ThinkPHP中，可以通过URL访问控制器中的方法。默认的URL格式为`http://domain.com/模块/控制器/方法`。如果没有指定模块，默认使用`index`模块。

### 2. 如何修改默认的入口文件？

默认的入口文件是`public/index.php`，你可以根据需要修改Web服务器的配置，将其他文件设置为入口文件。

### 3. 如何启用调试模式？

在开发阶段，可以启用调试模式以获得更详细的错误信息。在`public/index.php`文件中，将`define('APP_DEBUG', false);`改为`define('APP_DEBUG', true);`。

### 4. 如何安装第三方扩展？

可以使用Composer安装第三方扩展。在项目根目录下执行`composer require 扩展名称`即可。

### 5. 如何更新ThinkPHP版本？

可以使用Composer更新ThinkPHP版本。在项目根目录下执行`composer update topthink/think`即可。

### 6. 如何配置虚拟主机？

在Apache或Nginx中配置虚拟主机时，确保将网站根目录设置为项目的`public`目录，以确保安全性。