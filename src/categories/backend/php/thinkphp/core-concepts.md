# ThinkPHP核心概念

## 框架架构

ThinkPHP采用分层架构设计，主要包括以下几层：

1. **应用层**：用户编写的应用代码，包括控制器、模型、视图等
2. **框架层**：ThinkPHP的核心代码，提供基础功能和服务
3. **组件层**：独立的组件，如数据库、缓存、模板引擎等
4. **核心库**：提供基础工具函数和类

## 核心组件

### 1. 路由系统

路由系统负责将URL请求映射到相应的控制器和方法。ThinkPHP支持多种路由方式：

#### 基本路由

```php
// 定义GET请求路由
Route::get('hello', 'index/hello');

// 定义POST请求路由
Route::post('user/add', 'user/add');

// 定义支持多种请求类型的路由
Route::any('goods/detail', 'goods/detail');
```

#### 动态路由

```php
// 带参数的路由
Route::get('hello/:name', 'index/hello');

// 带多个参数的路由
Route::get('user/:id/profile', 'user/profile');

// 带参数验证的路由
Route::get('user/:id(\d+)', 'user/detail');
```

#### 路由分组

```php
// 路由分组
Route::group('admin', function() {
    Route::get('index', 'admin/index');
    Route::get('user/list', 'admin/userList');
    Route::get('user/add', 'admin/userAdd');
});

// 带前缀的路由分组
Route::group('api/v1', function() {
    Route::get('user/:id', 'api/v1/user/detail');
    Route::post('user/add', 'api/v1/user/add');
});
```

#### 资源路由

```php
// 资源路由
Route::resource('blog', 'blog');

// 只生成指定的资源路由
Route::resource('blog', 'blog')->only(['index', 'show', 'create', 'store']);

// 排除指定的资源路由
Route::resource('blog', 'blog')->except(['destroy']);
```

### 2. 控制器

控制器是处理用户请求的核心，负责接收请求、调用模型处理数据，并返回响应。

#### 基础控制器

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

#### 前置和后置操作

```php
<?php
namespace app\controller;

use think\Controller;

class User extends Controller
{
    // 前置操作
    protected $beforeActionList = [
        'checkLogin',  // 所有方法执行前都会调用checkLogin
        'checkAuth' => ['only' => 'edit,update,delete'],  // 仅在edit、update、delete方法前调用checkAuth
    ];

    protected function checkLogin()
    {
        // 检查用户是否登录
    }

    protected function checkAuth()
    {
        // 检查用户权限
    }

    public function index()
    {
        // 显示用户列表
    }

    public function edit($id)
    {
        // 编辑用户
    }
}
```

### 3. 模型

模型用于处理数据访问和业务逻辑，ThinkPHP的模型支持ORM操作。

#### 基础模型

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

    // 定义时间戳字段名
    protected $createTime = 'create_time';
    protected $updateTime = 'update_time';

    // 定义字段类型
    protected $type = [
        'id' => 'integer',
        'status' => 'integer',
        'create_time' => 'datetime',
        'update_time' => 'datetime',
    ];
}
```

#### 关联模型

```php
<?php
namespace app\model;

use think\Model;

class User extends Model
{
    // 一对多关联
    public function articles()
    {
        return $this->hasMany('Article', 'user_id', 'id');
    }

    // 一对一关联
    public function profile()
    {
        return $this->hasOne('Profile', 'user_id', 'id');
    }

    // 多对多关联
    public function roles()
    {
        return $this->belongsToMany('Role', 'tp_user_role', 'role_id', 'user_id');
    }
}
```

### 4. 视图

视图负责页面展示，ThinkPHP提供了强大的模板引擎。

#### 模板渲染

```php
// 渲染视图
return $this->fetch();

// 渲染指定视图
return $this->fetch('index/index');

// 带参数的视图渲染
return $this->fetch('index/index', ['name' => 'ThinkPHP', 'version' => '6.0']);
```

#### 模板语法

```html
<!-- 输出变量 -->
{$name}

<!-- 条件判断 -->
{if $status == 1}
    <span class="active">已激活</span>
{elseif $status == 0}
    <span class="inactive">未激活</span>
{else}
    <span class="deleted">已删除</span>
{/if}

<!-- 循环 -->
{foreach $list as $key => $item}
    <li>{$key}: {$item.name}</li>
{/foreach}

<!-- 模板继承 -->
{extend name="base"}

{block name="content"}
    <div class="content">内容区域</div>
{/block}
```

### 5. 中间件

中间件用于处理请求和响应之间的逻辑。

#### 定义中间件

```php
<?php
namespace app\middleware;

class CheckLogin
{
    public function handle($request, \Closure $next)
    {
        // 检查用户是否登录
        if (!session('user_id')) {
            return redirect('login');
        }

        return $next($request);
    }
}
```

#### 注册中间件

```php
// 全局中间件
// 在app/middleware.php中添加
return [
    'app\middleware\CheckLogin',
];

// 路由中间件
Route::get('admin/index', 'admin/index')->middleware('CheckLogin');

// 控制器中间件
<?php
namespace app\controller;

use think\Controller;

class Admin extends Controller
{
    // 控制器中间件
    protected $middleware = ['CheckLogin'];

    // 或者指定方法使用中间件
    protected $middleware = [
        'CheckLogin' => ['only' => ['index', 'edit']],
    ];
}
```

### 6. 数据库

ThinkPHP提供了强大的数据库操作能力，支持多种数据库。

#### 查询构造器

```php
// 查询数据
Db::table('user')
    ->where('status', 1)
    ->where('age', '>', 18)
    ->order('id', 'desc')
    ->limit(10)
    ->select();

// 插入数据
Db::table('user')->insert([
    'name' => '张三',
    'email' => 'zhangsan@example.com',
    'age' => 25,
]);

// 更新数据
Db::table('user')
    ->where('id', 1)
    ->update(['name' => '李四']);

// 删除数据
Db::table('user')->where('id', 1)->delete();
```

#### 事务处理

```php
// 开启事务
Db::startTrans();
try {
    // 执行数据库操作
    Db::table('user')->insert(['name' => '张三']);
    Db::table('article')->insert(['title' => '测试文章', 'user_id' => 1]);
    // 提交事务
    Db::commit();
} catch (\Exception $e) {
    // 回滚事务
    Db::rollback();
}
```

### 7. 缓存

ThinkPHP提供了多种缓存驱动，包括文件、Memcache、Redis等。

```php
// 设置缓存
cache('name', 'ThinkPHP', 3600);

// 获取缓存
$name = cache('name');

// 删除缓存
cache('name', null);

// 使用Redis缓存
$redis = \think\facade\Cache::store('redis');
$redis->set('name', 'ThinkPHP');
$name = $redis->get('name');
```

## 依赖注入

ThinkPHP支持依赖注入，可以方便地管理类之间的依赖关系。

```php
<?php
namespace app\controller;

use app\service\UserService;

class User extends Controller
{
    protected $userService;

    // 依赖注入
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index()
    {
        // 使用UserService
        $users = $this->userService->getUserList();
        return $this->fetch('index', ['users' => $users]);
    }
}
```

## 事件系统

ThinkPHP的事件系统允许你在应用的不同阶段触发和监听事件。

```php
// 定义事件
<?php
namespace app\event;

class UserLogin
{
    public $user;

    public function __construct($user)
    {
        $this->user = $user;
    }
}

// 监听事件
// 在app/event.php中添加
return [
    'listen' => [
        'UserLogin' => [
            'app\listener\UserLoginListener',
        ],
    ],
];

// 定义监听器
<?php
namespace app\listener;

use app\event\UserLogin;

class UserLoginListener
{
    public function handle(UserLogin $event)
    {
        // 处理用户登录事件
        $user = $event->user;
        // 记录登录日志
        \think\facade\Log::record('用户 ' . $user->name . ' 登录成功');
    }
}

// 触发事件
\think\facade\Event::trigger(new \app\event\UserLogin($user));
```

## 服务容器

服务容器用于管理类的实例化和依赖关系。

```php
// 绑定服务
\think\Container::set('userService', \app\service\UserService::class);

// 或者使用闭包
\think\Container::set('userService', function() {
    return new \app\service\UserService();
});

// 解析服务
$userService = \think\Container::get('userService');

// 使用依赖注入
<?php
namespace app\controller;

use app\service\UserService;

class User extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }
}
```

## 配置系统

ThinkPHP的配置系统支持多种配置方式，包括文件配置、环境变量配置等。

### 文件配置

```php
// 应用配置文件: app/config/app.php
return [
    'app_name' => 'ThinkPHP应用',
    'app_debug' => true,
    'app_trace' => false,
    // 其他配置...
];

// 数据库配置文件: app/config/database.php
return [
    'type' => 'mysql',
    'hostname' => '127.0.0.1',
    'database' => 'thinkphp',
    'username' => 'root',
    'password' => 'password',
    // 其他配置...
];
```

### 读取配置

```php
// 读取配置
$appName = config('app.app_name');
$dbType = config('database.type');

// 动态设置配置
config('app.app_debug', false);
```

### 环境变量配置

可以在项目根目录下创建`.env`文件，用于配置环境变量：

```
APP_NAME=ThinkPHP
APP_DEBUG=true

DB_HOST=127.0.0.1
DB_NAME=thinkphp
DB_USER=root
DB_PASS=password
```

读取环境变量：

```php
$appName = env('APP_NAME');
$dbHost = env('DB_HOST');
```

## 总结

本章介绍了ThinkPHP框架的核心概念，包括路由系统、控制器、模型、视图、中间件、数据库操作等。这些概念是使用ThinkPHP开发应用的基础，掌握这些概念将帮助你更好地理解和使用ThinkPHP框架。在后续章节中，我们将深入探讨这些概念的具体应用和最佳实践。