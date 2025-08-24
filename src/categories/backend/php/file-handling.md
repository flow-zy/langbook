# PHP 文件处理

## 概述

文件处理是PHP开发中常见的任务之一，包括文件的创建、读取、写入、删除、上传和下载等操作。PHP提供了丰富的文件系统函数，可以方便地进行各种文件操作。本章将详细介绍PHP中的文件处理技术和最佳实践。

## 文件操作基础

### 1. 检查文件和目录

在进行文件操作之前，通常需要检查文件或目录是否存在，以及是否有相应的权限。

```php
// 检查文件是否存在
$file = 'example.txt';
if (file_exists($file)) {
    echo "File exists";
} else {
    echo "File does not exist";
}

// 检查是否是文件
if (is_file($file)) {
    echo "It is a file";
}

// 检查是否是目录
if (is_dir('example_dir')) {
    echo "It is a directory";
}

// 检查文件是否可读
if (is_readable($file)) {
    echo "File is readable";
}

// 检查文件是否可写
if (is_writable($file)) {
    echo "File is writable";
}

// 检查文件是否可执行
if (is_executable($file)) {
    echo "File is executable";
}
```

### 2. 获取文件信息

PHP提供了多种函数来获取文件的详细信息。

```php
$file = 'example.txt';

// 获取文件大小（字节）
$size = filesize($file);
echo "File size: $size bytes";

// 获取文件修改时间
$mtime = filemtime($file);
echo "Last modified: " . date("Y-m-d H:i:s", $mtime);

// 获取文件访问时间
$atime = fileatime($file);
echo "Last accessed: " . date("Y-m-d H:i:s", $atime);

// 获取文件创建时间（Windows）
$ctime = filectime($file);
echo "Created: " . date("Y-m-d H:i:s", $ctime);

// 获取文件类型
$type = filetype($file);
echo "File type: $type";

// 获取文件的MIME类型
$mime = mime_content_type($file);
echo "MIME type: $mime";
```

## 文件读写操作

### 1. 打开和关闭文件

使用`fopen`函数打开文件，使用`fclose`函数关闭文件。

```php
// 打开文件进行读取
$file = fopen("example.txt", "r");

// 检查是否成功打开
if (!$file) {
    die("Could not open file");
}

// 操作文件...

// 关闭文件
fclose($file);
```

`fopen`函数的模式参数：
- `r`：只读模式，指针指向文件开头
- `r+`：读写模式，指针指向文件开头
- `w`：写入模式，清空文件内容，指针指向文件开头；如果文件不存在，创建新文件
- `w+`：读写模式，清空文件内容，指针指向文件开头；如果文件不存在，创建新文件
- `a`：追加模式，指针指向文件末尾；如果文件不存在，创建新文件
- `a+`：读写模式，指针指向文件末尾；如果文件不存在，创建新文件
- `x`：独占创建模式，如果文件已存在则失败；如果文件不存在，创建新文件并以写入模式打开
- `x+`：独占创建模式，如果文件已存在则失败；如果文件不存在，创建新文件并以读写模式打开

### 2. 读取文件内容

#### 2.1 逐行读取

```php
// 打开文件
$file = fopen("example.txt", "r");

// 逐行读取
while (!feof($file)) {
    $line = fgets($file);
    echo $line . "<br>";
}

// 关闭文件
fclose($file);
```

#### 2.2 读取整个文件

```php
// 方法1：使用file_get_contents
$content = file_get_contents("example.txt");
echo $content;

// 方法2：使用fread
$file = fopen("example.txt", "r");
$content = fread($file, filesize("example.txt"));
fclose($file);
echo $content;

// 方法3：使用file函数（返回数组，每行一个元素）
$lines = file("example.txt");
foreach ($lines as $line) {
    echo $line . "<br>";
}
```

### 3. 写入文件内容

#### 3.1 写入文本

```php
// 方法1：使用file_put_contents
file_put_contents("example.txt", "Hello, World!");

// 追加内容
file_put_contents("example.txt", "Append this text", FILE_APPEND);

// 方法2：使用fwrite
$file = fopen("example.txt", "w");
fwrite($file, "Hello, World!");
fclose($file);
```

#### 3.2 格式化写入

```php
$file = fopen("data.txt", "w");

// 写入格式化数据
$name = "John";
$age = 25;
fwrite($file, "Name: $name, Age: $age\n");

// 使用sprintf格式化
$fruits = array("apple", "banana", "orange");
foreach ($fruits as $fruit) {
    fwrite($file, sprintf("Fruit: %s\n", $fruit));
}

fclose($file);
```

## 目录操作

### 1. 创建和删除目录

```php
// 创建目录
if (!mkdir("example_dir")) {
    die("Could not create directory");
}

// 创建多级目录
if (!mkdir("dir1/dir2/dir3", 0777, true)) {
    die("Could not create directories");
}

// 删除空目录
if (rmdir("example_dir")) {
    echo "Directory deleted";
} else {
    echo "Could not delete directory";
}
```

### 2. 遍历目录

```php
// 打开目录
$dir = opendir("example_dir");

// 读取目录内容
while (($file = readdir($dir)) !== false) {
    // 跳过.和..
    if ($file != "." && $file != "..") {
        echo $file . "<br>";
    }
}

// 关闭目录
closedir($dir);

// 方法2：使用scandir
$files = scandir("example_dir");
foreach ($files as $file) {
    if ($file != "." && $file != "..") {
        echo $file . "<br>";
    }
}

// 方法3：使用glob（支持模式匹配）
$files = glob("example_dir/*.txt");
foreach ($files as $file) {
    echo basename($file) . "<br>";
}
```

## 文件上传

### 1. 基本文件上传

HTML表单：

```html
<form action="upload.php" method="post" enctype="multipart/form-data">
    Select file to upload:
    <input type="file" name="fileToUpload" id="fileToUpload">
    <input type="submit" value="Upload File" name="submit">
</form>
```

PHP处理代码（upload.php）：

```php
$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

// 检查文件是否已存在
if (file_exists($target_file)) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
}

// 检查文件大小
if ($_FILES["fileToUpload"]["size"] > 500000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}

// 允许特定文件格式
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
}

// 检查$uploadOk是否为0
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
// 如果一切正常，尝试上传文件
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}
```

### 2. 安全的文件上传

为了确保文件上传的安全性，应该采取以下措施：

```php
// 安全的文件上传处理
function secureUpload($fileField) {
    $target_dir = "uploads/";
    // 生成唯一文件名
    $uniqueName = uniqid() . "." . pathinfo($_FILES[$fileField]["name"], PATHINFO_EXTENSION);
    $target_file = $target_dir . $uniqueName;

    // 检查目标目录是否存在
    if (!is_dir($target_dir)) {
        mkdir($target_dir, 0755, true);
    }

    // 检查文件类型（使用MIME类型）
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime = $finfo->file($_FILES[$fileField]["tmp_name"]);
    $allowedMimes = array("image/jpeg", "image/png", "image/gif");
    if (!in_array($mime, $allowedMimes)) {
        return array(false, "Invalid file type");
    }

    // 检查文件大小
    if ($_FILES[$fileField]["size"] > 500000) {
        return array(false, "File too large");
    }

    // 移动文件
    if (move_uploaded_file($_FILES[$fileField]["tmp_name"], $target_file)) {
        return array(true, $uniqueName);
    } else {
        return array(false, "Upload failed");
    }
}

// 使用安全上传函数
if (isset($_FILES["fileToUpload"])) {
    list($success, $message) = secureUpload("fileToUpload");
    if ($success) {
        echo "File uploaded successfully: " . $message;
    } else {
        echo "Upload failed: " . $message;
    }
}
```

## 文件下载

### 1. 基本文件下载

```php
$file = 'example.pdf';

if (file_exists($file)) {
    // 设置响应头
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="' . basename($file) . '"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($file));
    // 读取文件并输出
    readfile($file);
    exit;
} else {
    echo "File not found";
}
```

### 2. 限制下载速度

```php
$file = 'example.pdf';
$speed = 1024; // 1KB/s

if (file_exists($file)) {
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="' . basename($file) . '"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($file));

    $fileHandle = fopen($file, 'rb');
    $bufferSize = $speed * 1024; // 1KB buffer

    while (!feof($fileHandle)) {
        echo fread($fileHandle, $bufferSize);
        flush();
        sleep(1); // 每秒发送一次
    }

    fclose($fileHandle);
    exit;
} else {
    echo "File not found";
}
```

## 文件处理最佳实践

1. **始终检查文件操作的返回值**：
   - 文件操作可能会失败，应该检查返回值并适当处理错误

2. **使用绝对路径**：
   - 避免使用相对路径，特别是在包含文件时
   - 使用`__DIR__`常量获取当前文件所在目录

3. **安全处理用户输入的文件路径**：
   - 避免目录遍历攻击
   - 使用`realpath`函数解析文件路径

4. **设置适当的文件权限**：
   - 数据文件：通常设置为644（读写权限）
   - 可执行文件：通常设置为755（读写执行权限）
   - 敏感文件：设置更严格的权限，避免被其他人访问

5. **使用文件锁定**：
   - 多进程环境下，使用文件锁定避免数据竞争
   - 使用`flock`函数实现文件锁定

6. **关闭文件句柄**：
   - 操作完成后，始终关闭文件句柄
   - 使用`fclose`函数关闭文件

7. **避免使用`register_globals`**：
   - 该功能已被弃用，存在安全隐患

8. **处理大文件时使用分块读写**：
   - 避免一次性读取大文件到内存
   - 使用循环分块读取和处理

## 常见问题

### 1. 如何避免目录遍历攻击？

```php
// 安全解析用户提供的文件路径
function securePath($userPath) {
    $baseDir = '/path/to/files/';
    // 合并路径
    $realPath = realpath($baseDir . $userPath);
    // 检查路径是否在基础目录内
    if ($realPath && strpos($realPath, $baseDir) === 0) {
        return $realPath;
    } else {
        return false;
    }
}

// 使用安全路径函数
$userPath = $_GET['file'];
$safePath = securePath($userPath);
if ($safePath) {
    // 处理文件
} else {
    // 非法路径
}
```

### 2. 如何实现文件锁定？

```php
$file = fopen("data.txt", "r+");

// 尝试获取独占锁
if (flock($file, LOCK_EX)) {
    // 读取文件内容
    $content = fread($file, filesize("data.txt"));
    // 修改内容
    $content .= "New data";
    // 移动指针到文件开头
    rewind($file);
    // 写入新内容
    fwrite($file, $content);
    // 释放锁
    flock($file, LOCK_UN);
} else {
    echo "Could not get lock";
}

fclose($file);
```

### 3. 如何读取CSV文件？

```php
$file = fopen("data.csv", "r");

// 读取CSV文件
while (($data = fgetcsv($file, 1000, ",")) !== false) {
    echo "Name: " . $data[0] . ", Age: " . $data[1] . "<br>";
}

fclose($file);
```

### 4. 如何创建和读取JSON文件？

```php
// 创建JSON文件
$data = array(
    "name" => "John",
    "age" => 25,
    "email" => "john@example.com"
);

$json = json_encode($data, JSON_PRETTY_PRINT);
file_put_contents("data.json", $json);

// 读取JSON文件
$json = file_get_contents("data.json");
$data = json_decode($json, true);
echo "Name: " . $data['name'];
```

### 5. 如何处理大文件上传？

对于大文件上传，可以使用分块上传技术：

```php
// 前端分块上传（使用JavaScript）
// 后端接收分块
$chunk = $_FILES['chunk']['tmp_name'];
$chunkIndex = $_POST['chunkIndex'];
$totalChunks = $_POST['totalChunks'];
$fileName = $_POST['fileName'];

// 临时存储分块
$tempDir = 'temp/' . md5($fileName);
if (!is_dir($tempDir)) {
    mkdir($tempDir, 0777, true);
}

move_uploaded_file($chunk, $tempDir . '/' . $chunkIndex);

// 检查是否所有分块都已上传
if ($chunkIndex == $totalChunks - 1) {
    // 合并分块
    $targetFile = 'uploads/' . $fileName;
    $out = fopen($targetFile, 'wb');

    for ($i = 0; $i < $totalChunks; $i++) {
        $in = fopen($tempDir . '/' . $i, 'rb');
        stream_copy_to_stream($in, $out);
        fclose($in);
        unlink($tempDir . '/' . $i);
    }

    fclose($out);
    rmdir($tempDir);
    echo "File uploaded successfully";
}
```