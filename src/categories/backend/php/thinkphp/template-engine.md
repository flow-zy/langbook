# ThinkPHP模板引擎

## 概述

ThinkPHP提供了一个功能强大的模板引擎，支持多种模板语法和特性，如模板继承、布局、变量输出、条件判断、循环等。模板引擎的主要作用是将控制器传递的数据渲染成HTML页面。

## 模板配置

### 基本配置

在`app/config/view.php`文件中可以配置模板引擎的相关参数：

```php
<?php
return [
    // 模板引擎类型
    'type'            => 'Think',
    // 模板路径
    'view_path'       => '',
    // 模板后缀
    'view_suffix'     => 'html',
    // 模板文件名分隔符
    'view_depr'       => DIRECTORY_SEPARATOR,
    // 模板引擎普通标签开始标记
    'tpl_begin'       => '{',
    // 模板引擎普通标签结束标记
    'tpl_end'         => '}',
    // 标签库标签开始标记
    'taglib_begin'    => '<',
    // 标签库标签结束标记
    'taglib_end'      => '>',
    // 是否开启模板编译缓存
    'tpl_cache'       => true,
    // 模板缓存有效期（秒）
    'cache_time'      => 0,
    // 是否开启布局
    'layout_on'       => false,
    // 布局文件名
    'layout_name'     => 'layout',
    // 布局替换标识
    'layout_item'     => '{__CONTENT__}',
    // 模板引擎标签库
    'taglib_pre_load' => '',
];
```

### 自定义模板路径

可以在控制器中自定义模板路径：

```php
// 设置模板路径
$this->view->config('view_path', 'template/');

// 或者在配置文件中设置
'view_path' => 'template/',
```

## 模板渲染

### 基本渲染

```php
// 渲染默认模板
return $this->fetch();

// 渲染指定模板
return $this->fetch('index/index');

// 带参数的模板渲染
return $this->fetch('index/index', ['name' => 'ThinkPHP', 'version' => '6.0']);

// 使用assign方法传递参数
$this->assign('name', 'ThinkPHP');
$this->assign('version', '6.0');
return $this->fetch('index/index');

// 批量传递参数
$this->assign([
    'name' => 'ThinkPHP',
    'version' => '6.0',
    'list' => $list,
]);
return $this->fetch('index/index');
```

### 渲染内容

```php
// 直接渲染内容
return $this->display('<h1>Hello, ThinkPHP!</h1>');

// 带参数的内容渲染
return $this->display('<h1>Hello, {$name}!</h1>', ['name' => 'ThinkPHP']);
```

### JSON渲染

```php
// 渲染JSON
return json($data);

// 带状态码的JSON渲染
return json($data, 201);

// JSONP渲染
return jsonp($data);
```

## 模板语法

### 变量输出

```html
<!-- 输出普通变量 -->
{$name}
{$user.name}
{$list[0].title}

<!-- 输出数组 -->
{:print_r($list)}

<!-- 输出对象 -->
{:var_dump($user)}

<!-- 变量过滤 -->
{$content|md5}
{$content|strip_tags}
{$content|substr=0,10}

<!-- 多级过滤 -->
{$content|strip_tags|substr=0,10}

<!-- 默认值 -->
{$name|default='Guest'}
```

### 条件判断

```html
<!-- if条件 -->
{if $status == 1}
    <span class="active">已激活</span>
{elseif $status == 0}
    <span class="inactive">未激活</span>
{else}
    <span class="deleted">已删除</span>
{/if}

<!-- 复杂条件 -->
{if ($status == 1 && $is_admin) || $user_id == 1}
    <span class="admin-active">管理员已激活</span>
{/if}

<!-- 比较标签 -->
{eq name="$status" value="1"}
    <span class="active">已激活</span>
{else}
    <span class="inactive">未激活</span>
{/eq}

{neq name="$status" value="0"}
    <span class="not-inactive">非未激活</span>
{/neq}

{gt name="$age" value="18"}
    <span class="adult">成年人</span>
{/gt}

{egt name="$age" value="18"}
    <span class="adult-or-equal">成年人或以上</span>
{/egt}

{lt name="$age" value="18"}
    <span class="minor">未成年人</span>
{/lt}

{elt name="$age" value="18"}
    <span class="minor-or-equal">未成年人或以下</span>
{/elt}
```

### 循环控制

```html
<!-- foreach循环 -->
{foreach $list as $key => $item}
    <li>{$key}: {$item.name}</li>
{/foreach}

<!-- 循环索引 -->
{foreach $list as $item}
    <li>{$item@index}: {$item.name}</li>  <!-- 从0开始 -->
    <li>{$item@iteration}: {$item.name}</li>  <!-- 从1开始 -->
    <li>{$item@first}: {$item.name}</li>  <!-- 是否为第一个元素 -->
    <li>{$item@last}: {$item.name}</li>  <!-- 是否为最后一个元素 -->
{/foreach}

<!-- for循环 -->
{for $i=1; $i<=10; $i++}
    <li>{$i}</li>
{/for}

<!-- while循环 -->
{while $i <= 10}
    <li>{$i}</li>
    {php $i++;}
{/while}
```

### 模板继承

```html
<!-- 父模板 layout.html -->
<!DOCTYPE html>
<html>
<head>
    <title>{$title|default='ThinkPHP'}</title>
    <link rel="stylesheet" href="/static/css/style.css">
</head>
<body>
    <header>
        <h1>网站标题</h1>
    </header>
    <main>
        {__CONTENT__}  <!-- 内容替换标识 -->
    </main>
    <footer>
        <p>版权所有 &copy; 2023</p>
    </footer>
    <script src="/static/js/main.js"></script>
</body>
</html>

<!-- 子模板 index.html -->
{extend name="layout"}

{block name="title"}
    首页 - ThinkPHP
{/block}

{block name="content"}
    <div class="content">
        <h2>欢迎使用ThinkPHP</h2>
        <p>这是首页内容</p>
    </div>
{/block}

{block name="style"}
    <style>
        .content {
            margin-top: 20px;
        }
    </style>
{/block}
```

### 引入模板

```html
<!-- 引入公共头部 -->
{include file="header"}

<!-- 引入带路径的模板 -->
{include file="common/menu"}

<!-- 引入带参数的模板 -->
{include file="common/user" name="张三" age="25"}
```

### 原样输出

```html
<!-- 原样输出 -->
{literal}
    <script>
        var name = '{$name}';  // 这里的{$name}不会被解析
    </script>
{/literal}
```

### PHP代码

```html
<!-- 嵌入PHP代码 -->
{php}
    $time = date('Y-m-d H:i:s');
    echo '当前时间：' . $time;
{/php}

<!-- 短标签 -->
{=$time}
{echo $time}
```

## 模板函数

### 内置函数

```html
<!-- 使用内置函数 -->
{$time|date='Y-m-d'}
{$content|strip_tags|substr=0,10}
{$price|number_format=2}
```

### 自定义函数

```php
// 在app/common.php中定义函数
function hello($name)
{
    return 'Hello, ' . $name . '!';
}

// 在模板中使用
{:hello('ThinkPHP')}
{$name|hello}
```

## 标签库

### 内置标签库

```html
<!-- volist标签 -->
<volist name="list" id="item">
    <li>{$item.id}: {$item.name}</li>
</volist>

<!-- eq标签 -->
<eq name="status" value="1">
    <span class="active">已激活</span>
</eq>

<!-- if标签 -->
<if condition="$status == 1">
    <span class="active">已激活</span>
<elseif condition="$status == 0" />
    <span class="inactive">未激活</span>
<else />
    <span class="deleted">已删除</span>
</if>

<!-- url标签 -->
<a href="{:url('index/hello')}">Say Hello</a>
<a href="{:url('user/detail', ['id' => $user.id])}">查看详情</a>

<!-- 静态资源标签 -->
<link rel="stylesheet" href="{:public_path('css/style.css')}">
<script src="{:public_path('js/main.js')}"></script>
<img src="{:public_path('images/logo.png')}" alt="Logo">
```

### 自定义标签库

```php
// 创建标签库类
<?php
namespace app\taglib;

use think\template\TagLib;

class MyTagLib extends TagLib
{
    // 定义标签
    protected $tags = [
        'hello' => ['attr' => 'name', 'close' => 0],
        'list' => ['attr' => 'name,id', 'close' => 1],
    ];

    // hello标签处理
    public function tagHello($tag)
    {
        $name = $tag['name'] ? $tag['name'] : 'World';
        return