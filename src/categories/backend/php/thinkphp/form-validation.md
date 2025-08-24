# ThinkPHP表单验证

## 概述

表单验证是Web应用开发中不可或缺的一部分，用于确保用户输入的数据符合预期格式和规则。ThinkPHP提供了强大的表单验证功能，支持多种验证规则和灵活的验证方式。

## 验证方式

### 1. 使用验证器类

这是ThinkPHP推荐的验证方式，通过创建独立的验证器类来进行表单验证。

#### 创建验证器

使用命令行创建验证器：

```bash
php think make:validate User
```

或者手动创建`app/validate/User.php`文件：

```php
<?php
namespace app\validate;

use think\Validate;

class User extends Validate
{
    // 验证规则
    protected $rule = [
        'name'  => 'require|max:25|unique:user',
        'email' => 'require|email|unique:user',
        'password' => 'require|min:6|confirm:repassword',
        'age'   => 'number|between:1,120',
        'status' => 'in:0,1',
    ];

    // 验证消息
    protected $message = [
        'name.require' => '用户名必须填写',
        'name.max'     => '用户名最多不能超过25个字符',
        'name.unique'  => '用户名已存在',
        'email.require' => '邮箱必须填写',
        'email.email'   => '邮箱格式不正确',
        'email.unique'  => '邮箱已存在',
        'password.require' => '密码必须填写',
        'password.min'     => '密码长度不能少于6个字符',
        'password.confirm' => '两次密码不一致',
        'age.number'    => '年龄必须是数字',
        'age.between'   => '年龄必须在1-120之间',
        'status.in'     => '状态必须是0或1',
    ];

    // 验证场景
    protected $scene = [
        'add'  => ['name', 'email', 'password', 'age', 'status'],
        'edit' => ['name', 'email', 'age', 'status'],
        'login' => ['email', 'password'],
    ];
}
```

#### 使用验证器

```php
<?php
namespace app\controller;

use app\validate\User as UserValidate;
use think\Controller;
use think\Request;

class User extends Controller
{
    public function add(Request $request)
    {
        // 获取表单数据
        $data = $request->param();

        // 实例化验证器
        $validate = new UserValidate();

        // 验证数据
        if (!$validate->check($data)) {
            // 验证失败，返回错误信息
            return $this->error($validate->getError());
        }

        // 验证通过，处理数据
        // ...

        return $this->success('添加成功');
    }

    public function edit(Request $request, $id)
    {
        // 获取表单数据
        $data = $request->param();
        $data['id'] = $id;

        // 实例化验证器并指定场景
        $validate = new UserValidate();
        if (!$validate->scene('edit')->check($data)) {
            return $this->error($validate->getError());
        }

        // 验证通过，处理数据
        // ...

        return $this->success('编辑成功');
    }

    public function login(Request $request)
    {
        // 获取表单数据
        $data = $request->param();

        // 使用场景验证
        $validate = new UserValidate();
        if (!$validate->scene('login')->check($data)) {
            return $this->error($validate->getError());
        }

        // 验证通过，处理登录
        // ...

        return $this->success('登录成功', 'index/index');
    }
}
```

### 2. 控制器内验证

可以在控制器内直接使用验证功能，无需创建单独的验证器类。

```php
<?php
namespace app\controller;

use think\Controller;
use think\facade\Validate;
use think\Request;

class User extends Controller
{
    public function add(Request $request)
    {
        // 获取表单数据
        $data = $request->param();

        // 定义验证规则
        $rule = [
            'name'  => 'require|max:25',
            'email' => 'require|email',
            'password' => 'require|min:6',
        ];

        // 定义验证消息
        $message = [
            'name.require' => '用户名必须填写',
            'name.max'     => '用户名最多不能超过25个字符',
            'email.require' => '邮箱必须填写',
            'email.email'   => '邮箱格式不正确',
            'password.require' => '密码必须填写',
            'password.min'     => '密码长度不能少于6个字符',
        ];

        // 验证数据
        $validate = Validate::make($rule, $message);
        if (!$validate->check($data)) {
            return $this->error($validate->getError());
        }

        // 验证通过，处理数据
        // ...

        return $this->success('添加成功');
    }
}
```

### 3. 模型验证

可以在模型中定义验证规则，实现数据验证。

```php
<?php
namespace app\model;

use think\Model;
use think\Validate;

class User extends Model
{
    // 自动验证
    protected $validate = true;

    // 验证规则
    protected $rule = [
        'name'  => 'require|max:25',
        'email' => 'require|email',
        'password' => 'require|min:6',
    ];

    // 验证消息
    protected $message = [
        'name.require' => '用户名必须填写',
        'name.max'     => '用户名最多不能超过25个字符',
        'email.require' => '邮箱必须填写',
        'email.email'   => '邮箱格式不正确',
        'password.require' => '密码必须填写',
        'password.min'     => '密码长度不能少于6个字符',
    ];

    // 验证场景
    protected $scene = [
        'add'  => ['name', 'email', 'password'],
        'edit' => ['name', 'email'],
    ];
}

// 使用模型验证
$user = new User;
$user->name = '张三';
$user->email = 'zhangsan@example.com';
$user->password = '123456';

if (!$user->validate(true)->save()) {
    echo $user->getError();
}
```

## 内置验证规则

ThinkPHP提供了丰富的内置验证规则：

### 1. 基础验证

- `require`: 必填项
- `number`: 数字
- `integer`: 整数
- `float`: 浮点数
- `boolean`: 布尔值
- `email`: 邮箱格式
- `url`: URL格式
- `ip`: IP地址
- `date`: 日期格式
- `alpha`: 字母
- `alphaNum`: 字母和数字
- `alphaDash`: 字母、数字、下划线和破折号
- `chs`: 汉字
- `chsAlpha`: 汉字、字母
- `chsAlphaNum`: 汉字、字母、数字
- `chsDash`: 汉字、字母、数字、下划线和破折号

### 2. 长度验证

- `length:num`: 长度等于num
- `min:num`: 最小长度为num
- `max:num`: 最大长度为num
- `between:min,max`: 长度在min和max之间

### 3. 数值验证

- `eq:value`: 等于value
- `neq:value`: 不等于value
- `gt:value`: 大于value
- `egt:value`: 大于等于value
- `lt:value`: 小于value
- `elt:value`: 小于等于value
- `between:min,max`: 数值在min和max之间

### 4. 字段验证

- `confirm:field`: 与field字段值一致
- `different:field`: 与field字段值不同
- `egtfield:field`: 大于等于field字段值
- `gtfield:field`: 大于field字段值
- `eltfield:field`: 小于等于field字段值
- `ltfield:field`: 小于field字段值

### 5. 正则验证

- `regex:pattern`: 符合正则表达式pattern

### 6. 唯一性验证

- `unique:table,field,except,pk`: 表table中字段field的值唯一，except为排除的值，pk为主键名

### 7. 存在性验证

- `exist:table,field`: 表table中字段field存在对应的值

### 8. 其他验证

- `in:value1,value2,...`: 属于指定的值列表
- `notIn:value1,value2,...`: 不属于指定的值列表
- `file`: 文件上传
- `image:size,mime`: 图片上传，size为文件大小限制，mime为允许的MIME类型
- `fileExt:ext1,ext2,...`: 文件扩展名
- `fileMime:mime1,mime2,...`: 文件MIME类型
- `fileSize:size`: 文件大小限制

## 自定义验证规则

### 1. 验证器中定义

```php
<?php
namespace app\validate;

use think\Validate;

class User extends Validate
{
    // 验证规则
    protected $rule = [
        'name'  => 'require|checkName',
        'email' => 'require|email',
    ];

    // 验证消息
    protected $message = [
        'name.require' => '用户名必须填写',
        'name.checkName' => '用户名不能包含敏感字符',
        'email.require' => '邮箱必须填写',
        'email.email'   => '邮箱格式不正确',
    ];

    // 自定义验证规则
    protected function checkName($value, $rule, $data = [])
    {
        $sensitiveWords = ['admin', 'root', 'superuser'];
        foreach ($sensitiveWords as $word) {
            if (stripos($value, $word) !== false) {
                return false;
            }
        }
        return true;
    }
}
```

### 2. 全局注册验证规则

```php
// 在app/common.php中注册
use think\Validate;

Validate::extend('checkName', function($value, $rule, $data = []) {
    $sensitiveWords = ['admin', 'root', 'superuser'];
    foreach ($sensitiveWords as $word) {
        if (stripos($value, $word) !== false) {
            return '用户名不能包含敏感字符';
        }
    }
    return true;
});

// 在验证器中使用
protected $rule = [
    'name' => 'require|checkName',
];
```

### 3. 闭包验证规则

```php
// 在控制器中使用闭包验证
$rule = [
    'name' => [
        'require',
        function($value) {
            $sensitiveWords = ['admin', 'root', 'superuser'];
            foreach ($sensitiveWords as $word) {
                if (stripos($value, $word) !== false) {
                    return '用户名不能包含敏感字符';
                }
            }
            return true;
        },
    ],
];
```

## 表单令牌验证

为了防止CSRF攻击，ThinkPHP提供了表单令牌验证功能。

### 开启令牌验证

```php
// 在app/config/app.php中开启
'csrf_check' => true,
```

### 在表单中添加令牌

```html
<!-- 手动添加 -->
<input type="hidden" name="__token__" value="{$Request.token}">

<!-- 使用标签自动添加 -->
{token}
```

### 自定义令牌验证

```php
// 在控制器中手动验证令牌
if (!$this->request->checkToken()) {
    return $this->error('令牌验证失败');
}

// 自定义令牌名称
// 在app/config/app.php中配置
'token_name' => '__my_token__',

// 在表单中使用自定义令牌名称
<input type="hidden" name="__my_token__" value="{$Request.token}">
```

## AJAX验证

对于AJAX请求，可以返回JSON格式的验证结果。

```php
<?php
namespace app\controller;

use app\validate\User as UserValidate;
use think\Controller;
use think\Request;

class User extends Controller
{
    public function checkEmail(Request $request)
    {
        if ($request->isAjax()) {
            $data = $request->param();
            $validate = new UserValidate();
            if (!$validate->check($data)) {
                return json(['code' => 0, 'msg' => $validate->getError()]);
            }
            return json(['code' => 1, 'msg' => '验证通过']);
        }
    }
}
```

前端AJAX代码：

```javascript
$.ajax({
    url: '/user/checkEmail',
    type: 'POST',
    data: {
        email: $('#email').val(),
        __token__: $('input[name="__token__"]').val()
    },
    success: function(res) {
        if (res.code == 0) {
            $('#email-error').text(res.msg).show();
        } else {
            $('#email-error').hide();
        }
    }
});
```

## 最佳实践

### 1. 使用独立验证器类

将验证逻辑与控制器分离，提高代码的可维护性和复用性。

### 2. 合理使用验证场景

为不同的操作（如添加、编辑、登录等）定义不同的验证场景，避免不必要的验证。

### 3. 详细的验证消息

提供清晰、准确的验证失败消息，帮助用户理解错误原因并正确输入。

### 4. 结合前端验证

在客户端进行初步验证，减少不必要的服务器请求，提高用户体验。

### 5. 开启令牌验证

对于表单提交，尤其是涉及用户数据修改的操作，务必开启CSRF令牌验证，提高系统安全性。

### 6. 自定义验证规则

对于复杂的验证需求，使用自定义验证规则来实现，保持代码的简洁性。

## 常见问题

### 1. 验证器不生效

- 检查验证器类是否正确定义
- 检查验证规则是否正确
- 检查是否调用了验证器的check方法

### 2. 唯一性验证失败

- 检查表名和字段名是否正确
- 检查排除条件是否正确
- 确保数据库连接正常

### 3. 令牌验证失败

- 检查是否在表单中添加了令牌字段
- 检查令牌名称是否与配置一致
- 检查会话是否正常工作

### 4. 自定义验证规则不生效

- 检查验证规则名称是否正确
- 检查自定义验证函数是否返回布尔值
- 检查验证消息是否正确设置

### 5. 如何在验证器中获取其他字段的值

在自定义验证规则中，可以通过第三个参数获取所有字段的值：

```php
protected function checkPassword($value, $rule, $data = []) {
    // 获取确认密码字段的值
    $repassword = isset($data['repassword']) ? $data['repassword'] : '';
    return $value === $repassword;
}
```

## 总结

本章详细介绍了ThinkPHP的表单验证功能，包括验证器的创建和使用、内置验证规则、自定义验证规则、表单令牌验证和AJAX验证等内容。掌握这些知识将帮助你在ThinkPHP项目中有效地进行表单数据验证，确保数据的合法性和安全性。在实际开发中，应根据项目需求选择合适的验证方式，并遵循最佳实践，以提高开发效率和系统安全性。