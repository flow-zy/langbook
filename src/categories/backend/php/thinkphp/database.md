# ThinkPHP数据库操作

## 数据库配置

ThinkPHP支持多种数据库配置方式，包括文件配置、环境变量配置和动态配置。

### 基本配置

在`app/config/database.php`文件中进行数据库配置：

```php
<?php
return [
    // 数据库类型
    'type'            => 'mysql',
    // 服务器地址
    'hostname'        => '127.0.0.1',
    // 数据库名
    'database'        => 'thinkphp',
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
    // 是否开启查询缓存
    'query_cache'     => false,
    // 缓存过期时间（秒）
    'cache_expire'    => 3600,
    // 其他配置...
];
```

### 多数据库配置

可以配置多个数据库连接：

```php
<?php
return [
    // 默认数据库
    'default'         => 'mysql',
    // 数据库连接配置
    'connections'     => [
        'mysql' => [
            'type'            => 'mysql',
            'hostname'        => '127.0.0.1',
            'database'        => 'thinkphp',
            'username'        => 'root',
            'password'        => 'yourpassword',
            'hostport'        => '3306',
            'charset'         => 'utf8',
            'prefix'          => 'tp_',
        ],
        'sqlite' => [
            'type'            => 'sqlite',
            'database'        => env('SQLITE_DATABASE', database_path('sqlite.db')),
            'prefix'          => '',
        ],
        'pgsql' => [
            'type'            => 'pgsql',
            'hostname'        => '127.0.0.1',
            'database'        => 'thinkphp',
            'username'        => 'postgres',
            'password'        => 'yourpassword',
            'hostport'        => '5432',
            'charset'         => 'utf8',
            'prefix'          => 'tp_',
            'schema'          => 'public',
        ],
    ],
];
```

### 动态切换数据库

```php
// 切换数据库连接
Db::connect('sqlite');

// 或者使用配置数组
Db::connect([
    'type' => 'mysql',
    'hostname' => '127.0.0.1',
    'database' => 'test',
    'username' => 'root',
    'password' => 'password',
]);
```

## 查询构造器

ThinkPHP的查询构造器提供了流畅的数据库查询接口。

### 基本查询

```php
// 查询单条数据
$user = Db::table('user')->where('id', 1)->find();

// 查询多条数据
$users = Db::table('user')
    ->where('status', 1)
    ->order('id', 'desc')
    ->limit(10)
    ->select();

// 查询字段值
$name = Db::table('user')->where('id', 1)->value('name');

// 查询一列值
$ids = Db::table('user')->where('status', 1)->column('id');

// 查询总数
$count = Db::table('user')->count();

// 查询最大值
$maxId = Db::table('user')->max('id');

// 查询最小值
$minId = Db::table('user')->min('id');

// 查询平均值
$avgAge = Db::table('user')->avg('age');

// 查询总和
$sumScore = Db::table('user')->sum('score');
```

### 条件查询

```php
// 等于条件
Db::table('user')->where('id', 1);
Db::table('user')->where('status', '=', 1);

// 不等于条件
Db::table('user')->where('status', '<>', 0);

// 大于条件
Db::table('user')->where('age', '>', 18);

// 大于等于条件
Db::table('user')->where('age', '>=', 18);

// 小于条件
Db::table('user')->where('age', '<', 30);

// 小于等于条件
Db::table('user')->where('age', '<=', 30);

// 模糊查询
Db::table('user')->where('name', 'like', '张%');

// 多个条件
Db::table('user')
    ->where('status', 1)
    ->where('age', '>', 18);

// 复杂条件
Db::table('user')
    ->where(function($query) {
        $query->where('status', 1)
              ->orWhere('age', '>', 18);
    });

// IN条件
Db::table('user')->where('id', 'in', [1, 2, 3]);

// NOT IN条件
Db::table('user')->where('id', 'not in', [4, 5, 6]);

// BETWEEN条件
Db::table('user')->where('age', 'between', [18, 30]);

// NULL条件
Db::table('user')->where('email', 'null');

// NOT NULL条件
Db::table('user')->where('email', 'not null');
```

### 高级查询

```php
// 字段比较
Db::table('user')->whereColumn('create_time', '<', 'update_time');

// 子查询
$subQuery = Db::table('article')->where('status', 1)->field('user_id, count(id) as article_count')->group('user_id');
$users = Db::table('user')
    ->alias('u')
    ->join([$subQuery => 'a'], 'u.id = a.user_id')
    ->select();

// 原生SQL查询
$users = Db::query('SELECT * FROM tp_user WHERE status = ?', [1]);

// 原生表达式
Db::table('user')
    ->where('id', 1)
    ->update(['view_count' => Db::raw('view_count + 1')]);
```

### 聚合查询

```php
// 分组查询
$users = Db::table('user')
    ->field('status, count(id) as count')
    ->group('status')
    ->select();

// 分组后筛选
$users = Db::table('user')
    ->field('status, count(id) as count')
    ->group('status')
    ->having('count > 10')
    ->select();
```

### 连接查询

```php
// 内连接
$users = Db::table('user')
    ->alias('u')
    ->join('user_profile p', 'u.id = p.user_id')
    ->select();

// 左连接
$users = Db::table('user')
    ->alias('u')
    ->leftJoin('article a', 'u.id = a.user_id')
    ->select();

// 右连接
$users = Db::table('user')
    ->alias('u')
    ->rightJoin('comment c', 'u.id = c.user_id')
    ->select();

// 多表连接
$users = Db::table('user')
    ->alias('u')
    ->join('user_profile p', 'u.id = p.user_id')
    ->leftJoin('article a', 'u.id = a.user_id')
    ->select();
```

## 模型操作

### 基本模型操作

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

// 查询数据
$user = User::find(1);
$users = User::where('status', 1)->select();

// 添加数据
$user = new User;
$user->name = '张三';
$user->email = 'zhangsan@example.com';
$user->save();

// 批量添加
User::create([
    'name' => '李四',
    'email' => 'lisi@example.com',
]);

// 更新数据
$user = User::find(1);
$user->name = '王五';
$user->save();

// 批量更新
User::where('status', 1)->update(['age' => 25]);

// 删除数据
$user = User::find(1);
$user->delete();

// 批量删除
User::destroy([1, 2, 3]);
```

### 模型关联

#### 一对一关联

```php
<?php
namespace app\model;

use think\Model;

class User extends Model
{
    // 一对一关联
    public function profile()
    {
        return $this->hasOne('Profile', 'user_id', 'id');
    }
}

class Profile extends Model
{
    // 关联到用户
    public function user()
    {
        return $this->belongsTo('User', 'user_id', 'id');
    }
}

// 使用关联
$user = User::find(1);
// 获取用户资料
$profile = $user->profile;

// 预加载关联
$users = User::with('profile')->select();
```

#### 一对多关联

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
}

class Article extends Model
{
    // 关联到用户
    public function user()
    {
        return $this->belongsTo('User', 'user_id', 'id');
    }
}

// 使用关联
$user = User::find(1);
// 获取用户的文章
$articles = $user->articles;

// 预加载关联
$users = User::with('articles')->select();

// 预加载关联并添加条件
$users = User::with([
    'articles' => function($query) {
        $query->where('status', 1);
    }
])->select();
```

#### 多对多关联

```php
<?php
namespace app\model;

use think\Model;

class User extends Model
{
    // 多对多关联
    public function roles()
    {
        return $this->belongsToMany('Role', 'tp_user_role', 'role_id', 'user_id');
    }
}

class Role extends Model
{
    // 多对多关联
    public function users()
    {
        return $this->belongsToMany('User', 'tp_user_role', 'user_id', 'role_id');
    }
}

// 使用关联
$user = User::find(1);
// 获取用户的角色
$roles = $user->roles;

// 预加载关联
$users = User::with('roles')->select();

// 给用户添加角色
$user->roles()->save(1);
$user->roles()->saveAll([1, 2, 3]);

// 移除用户的角色
$user->roles()->detach(1);
$user->roles()->detach([1, 2, 3]);

// 同步用户的角色（移除现有角色并添加新角色）
$user->roles()->sync([1, 2, 3]);
```

## 事务处理

ThinkPHP提供了多种事务处理方式。

### 自动事务

```php
// 自动事务
Db::transaction(function() {
    Db::table('user')->insert(['name' => '张三']);
    Db::table('article')->insert(['title' => '测试文章', 'user_id' => 1]);
});
```

### 手动事务

```php
// 手动事务
Db::startTrans();
try {
    Db::table('user')->insert(['name' => '张三']);
    Db::table('article')->insert(['title' => '测试文章', 'user_id' => 1]);
    // 提交事务
    Db::commit();
} catch (\Exception $e) {
    // 回滚事务
    Db::rollback();
}
```

### 模型事务

```php
// 模型事务
User::transaction(function() {
    User::create(['name' => '张三']);
    Article::create(['title' => '测试文章', 'user_id' => 1]);
});
```

## 数据库迁移和填充

### 创建迁移文件

使用命令行创建迁移文件：

```bash
php think migrate:create CreateUserTable
```

迁移文件示例：

```php
<?php
use think\migration\Migrator;
use think\migration\db\Column;

class CreateUserTable extends Migrator
{
    /**
     * Change Method.
     *
     * Write your reversible migrations using this method.
     *
     * More information on writing migrations is available here:
     * http://docs.phinx.org/en/latest/migrations.html#the-change-method
     *
     * The following commands can be used in this method and Phinx will
     * automatically reverse them when rolling back:
     *
     *    createTable
     *    renameTable
     *    addColumn
     *    renameColumn
     *    addIndex
     *    addForeignKey
     *
     * Remember to call "create()" or "update()" and NOT "save()" when working
     * with the Table class.
     */
    public function change()
    {
        $table = $this->table('user', ['engine' => 'InnoDB', 'collation' => 'utf8mb4_unicode_ci']);
        $table->addColumn('name', 'string', ['limit' => 50, 'comment' => '用户名'])
              ->addColumn('email', 'string', ['limit' => 100, 'comment' => '邮箱'])
              ->addColumn('password', 'string', ['limit' => 255, 'comment' => '密码'])
              ->addColumn('status', 'integer', ['default' => 1, 'comment' => '状态：0禁用，1启用'])
              ->addColumn('create_time', 'datetime', ['comment' => '创建时间'])
              ->addColumn('update_time', 'datetime', ['comment' => '更新时间'])
              ->addIndex('email', ['unique' => true])
              ->create();
    }
}
```

### 执行迁移

```bash
php think migrate:run
```

### 回滚迁移

```bash
php think migrate:rollback
```

### 创建填充文件

使用命令行创建填充文件：

```bash
php think seed:create UserSeeder
```

填充文件示例：

```php
<?php
use think\migration\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run Method.
     *
     * Write your database seeder using this method.
     */
    public function run()
    {
        $data = [
            [
                'name' => 'admin',
                'email' => 'admin@example.com',
                'password' => password_hash('admin123', PASSWORD_DEFAULT),
                'status' => 1,
                'create_time' => date('Y-m-d H:i:s'),
                'update_time' => date('Y-m-d H:i:s'),
            ],
            [
                'name' => 'user1',
                'email' => 'user1@example.com',
                'password' => password_hash('user123', PASSWORD_DEFAULT),
                'status' => 1,
                'create_time' => date('Y-m-d H:i:s'),
                'update_time' => date('Y-m-d H:i:s'),
            ],
        ];

        $this->table('user')->insert($data)->save();
    }
}
```

### 执行填充

```bash
php think seed:run
```

## 性能优化

### 索引优化

确保在频繁查询的字段上创建索引：

```php
// 在迁移文件中添加索引
$table->addIndex('email', ['unique' => true]);
$table->addIndex('status');
$table->addIndex(['user_id', 'created_at']);
```

### 查询优化

```php
// 只查询需要的字段
$users = Db::table('user')->field('id, name, email')->select();

// 使用缓存
$users = Db::table('user')->cache(true, 3600)->select();

// 预加载关联
$users = User::with('profile')->select();

// 避免N+1查询
$users = User::with('articles')->select();
foreach ($users as $user) {
    echo $user->name . '的文章数：' . count($user->articles) . '<br>';
}
```

### 批量操作

```php
// 批量插入
Db::table('user')->insertAll([
    ['name' => '张三', 'email' => 'zhangsan@example.com'],
    ['name' => '李四', 'email' => 'lisi@example.com'],
    ['name' => '王五', 'email' => 'wangwu@example.com'],
]);

// 批量更新
Db::table('user')->batchUpdate('id', [
    ['id' => 1, 'name' => '张三'],
    ['id' => 2, 'name' => '李四'],
]);
```

### 连接池

对于高并发应用，可以使用连接池来管理数据库连接：

```php
// 在database.php配置中启用连接池
'connections' => [
    'mysql' => [
        'type'            => 'mysql',
        // 其他配置...
        'pool' => [
            'min_connections' => 10,
            'max_connections' => 100,
            'wait_timeout'    => 3,
        ],
    ],
],
```

## 总结

本章详细介绍了ThinkPHP的数据库操作，包括数据库配置、查询构造器、模型操作、关联查询、事务处理、数据库迁移和填充以及性能优化技巧。掌握这些知识将帮助你在ThinkPHP项目中高效地进行数据库交互，提高开发效率和应用性能。