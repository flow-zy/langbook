# 鸿蒙开发基础API使用详解

本章节详细介绍鸿蒙操作系统开发中常用的API接口，包括UI组件、数据存储、网络通信、媒体处理、位置服务等多个领域的核心API使用方法、最佳实践和常见问题解决方案。

## API概述

HarmonyOS提供了丰富的API接口，涵盖了UI、网络、数据存储、传感器等多个领域。这些API遵循以下设计原则：

- **简洁易用**：API设计简洁明了，降低开发者学习成本
- **高性能**：底层优化，确保API调用高效运行
- **安全可靠**：内置权限管理和错误处理机制
- **跨设备兼容**：支持多种设备形态，提供一致的API体验

### API调用方式

API调用方式主要有两种：

1. **同步API**：调用后立即返回结果，适用于耗时短的操作
   ```java
   // 同步API示例：获取系统时间
   long currentTime = System.currentTimeMillis();
   ```

2. **异步API**：通过回调函数或Promise返回结果，适用于耗时长的操作（如网络请求、文件IO等）
   ```java
   // 异步API示例：文件读取
   FileIO.readFile(filePath, new AsyncCallback<String>() {
       @Override
       public void onSuccess(String result) {
           // 处理成功结果
       }
       
       @Override
       public void onFailed(String errorMsg) {
           // 处理失败情况
       }
   });
   ```

### API版本兼容性

HarmonyOS提供了API版本管理机制，确保应用在不同版本的系统上正常运行：

- 使用`@since`注解标记API的引入版本
- 使用`@deprecated`注解标记已废弃的API
- 提供`ApiVersion`类检查当前系统版本

```java
// 检查API版本
if (ApiVersion.getApiVersion() >= 9) {
    // 使用API 9及以上版本支持的功能
} else {
    // 提供兼容方案
}
```

### 命名规范

鸿蒙API遵循以下命名规范：

- 包名：使用小写字母，如`ohos.aafwk.ability`
- 类名：使用驼峰命名法，首字母大写，如`AbilitySlice`
- 方法名：使用驼峰命名法，首字母小写，如`startAbility()`
- 常量名：使用大写字母和下划线，如`MAX_VALUE`

## UI组件API

UI组件是构建鸿蒙应用界面的基础元素，HarmonyOS提供了丰富的组件库，满足各种界面需求。

### 基础组件

#### Text组件

Text组件用于显示文本内容，支持多种文本样式和排版设置。

**常用属性**：
- `text`：文本内容
- `textSize`：文本大小
- `textColor`：文本颜色
- `font`：字体样式
- `alignment`：文本对齐方式
- `maxLines`：最大行数
- `textWeight`：文本粗细

**代码示例**：

```java
// 在代码中创建Text组件
Text text = new Text(context);
text.setText("Hello HarmonyOS");
text.setTextSize(50);
text.setTextColor(Color.RED);
text.setAlignment(TextAlignment.CENTER);
text.setMaxLines(2);
text.setTextWeight(FontWeight.BOLD);
```

在XML布局中使用：

```xml
<Text
    ohos:id="$+id:text"
    ohos:height="match_content"
    ohos:width="match_content"
    ohos:text="Hello HarmonyOS"
    ohos:text_size="50fp"
    ohos:text_color="#FF0000"
    ohos:text_alignment="center"
    ohos:max_lines="2"
    ohos:text_weight="700"/>
```

#### Button组件

Button组件用于响应用户点击事件，支持多种样式和状态。

**常用属性**：
- `text`：按钮文本
- `backgroundElement`：背景元素
- `stateEffect`：状态效果
- `enabled`：是否启用
- `clickedListener`：点击监听器

**代码示例**：

```java
// 在代码中创建Button组件
Button button = new Button(context);
button.setText("Click Me");
button.setTextSize(40);
button.setBackgroundElement(new ShapeElement() {
    {
        setRgbColor(new RgbColor(0, 120, 215));
        setCornerRadius(20);
    }
});
button.setClickedListener(new Component.ClickedListener() {
    @Override
    public void onClick(Component component) {
        // 处理点击事件
        ToastDialog dialog = new ToastDialog(context);
        dialog.setText("Button clicked");
        dialog.setDuration(2000);
        dialog.show();
    }
});
```

在XML布局中使用：

```xml
<Button
    ohos:id="$+id:button"
    ohos:height="match_content"
    ohos:width="match_content"
    ohos:text="Click Me"
    ohos:text_size="40fp"
    ohos:background_element="#0078D7"
    ohos:corner_radius="20fp"
    ohos:state_effect="true"/>
```

#### Image组件

Image组件用于显示图片资源，支持本地和网络图片加载。

**常用属性**：
- `pixelMap`：图片资源
- `scaleType`：缩放类型
- `imageSource`：图片源
- `alpha`：透明度

**代码示例**：

```java
// 加载本地图片
Image image = new Image(context);
image.setPixelMap(ResourceTable.Media_icon);
image.setScaleType(Image.ScaleType.CENTER_CROP);
image.setAlpha(0.8f);

// 加载网络图片（需申请网络权限）
ImageSource.SourceOptions options = new ImageSource.SourceOptions();
ImageSource imageSource = ImageSource.create(createBitmapFromUrl("https://example.com/image.jpg"), options);
PixelMap pixelMap = imageSource.createPixelMap(null);
image.setPixelMap(pixelMap);
```

在XML布局中使用：

```xml
<Image
    ohos:id="$+id:image"
    ohos:height="200fp"
    ohos:width="200fp"
    ohos:image_src="$media:icon"
    ohos:scale_type="center_crop"
    ohos:alpha="0.8"/>
```

### 容器组件

#### DirectionalLayout

DirectionalLayout是一种线性布局，支持水平和垂直方向排列子组件。

**常用属性**：
- `orientation`：排列方向（水平/垂直）
- `alignment`：对齐方式
- `weight`：子组件权重

**代码示例**：

```java
// 创建垂直布局
DirectionalLayout layout = new DirectionalLayout(context);
layout.setOrientation(Component.VERTICAL);
layout.setAlignment(LayoutAlignment.HORIZONTAL_CENTER);

// 添加子组件
Text title = new Text(context);
title.setText("Title");
layout.addComponent(title);

Button submitBtn = new Button(context);
submitBtn.setText("Submit");
layout.addComponent(submitBtn);
```

在XML布局中使用：

```xml
<DirectionalLayout
    ohos:id="$+id:layout"
    ohos:height="match_parent"
    ohos:width="match_parent"
    ohos:orientation="vertical"
    ohos:alignment="horizontal_center">
    
    <Text
        ohos:height="match_content"
        ohos:width="match_content"
        ohos:text="Title"/>
    
    <Button
        ohos:height="match_content"
        ohos:width="match_content"
        ohos:text="Submit"/>
</DirectionalLayout>
```

## 数据存储API

HarmonyOS提供了多种数据存储方式，满足不同场景下的数据持久化需求。

### 轻量级存储

轻量级存储（Preferences）适合存储少量简单数据，如用户偏好设置、应用配置等。其特点是操作简单、性能高，但不适合存储大量复杂数据。

**使用场景**：
- 用户登录状态
- 应用主题设置
- 字体大小偏好
- 最近使用的功能

**代码示例**：

```java
// 获取轻量级存储实例
Preferences preferences = Preferences.getPreferences(context, "my_preferences");

// 存储数据
preferences.putString("username", "harmony");
preferences.putInt("age", 18);
preferences.putBoolean("is_login", true);
preferences.putLong("last_login_time", System.currentTimeMillis());
preferences.flush(); // 提交更改

// 读取数据
String username = preferences.getString("username", "default");
int age = preferences.getInt("age", 0);
boolean isLogin = preferences.getBoolean("is_login", false);
long lastLoginTime = preferences.getLong("last_login_time", 0);

// 删除数据
preferences.delete("age");
preferences.flush();

// 清除所有数据
preferences.clear();
preferences.flush();
```

**最佳实践**：
1. 不要存储敏感信息（如密码），敏感数据应加密后存储
2. 避免频繁调用`flush()`，可批量操作后再提交
3. 每个Preferences文件大小建议不超过1MB
4. 命名规范：使用应用包名作为前缀，如`com.example.app.preferences`

### 关系型数据库

关系型数据库（ORM Database）适合存储结构化数据，支持复杂的查询和事务操作。

**使用场景**：
- 用户信息管理
- 订单记录
- 内容管理系统

**代码示例**：

```java
// 1. 定义实体类
@Entity(tableName = "user")
public class User extends OrmObject {
    @PrimaryKey(autoGenerate = true)
    private int id;
    private String name;
    private int age;
    private String email;
    private long createTime;
    
    // 构造函数、getter和setter方法
    // ...
}

// 2. 定义数据库Helper
@Database(entities = {User.class}, version = 1)
public class MyDatabaseHelper extends OrmDatabaseHelper {
    public MyDatabaseHelper(Context context) {
        super(context, "MyDatabase");
    }
}

// 3. 初始化数据库
MyDatabaseHelper dbHelper = new MyDatabaseHelper(context);
OrmContext ormContext = dbHelper.getOrmContext();

// 4. 插入数据
User user = new User();
user.setName("harmony");
user.setAge(18);
user.setEmail("harmony@example.com");
user.setCreateTime(System.currentTimeMillis());
boolean isSuccess = ormContext.insert(user);
ormContext.flush();

// 5. 查询数据
// 简单查询
List<User> users = ormContext.query(User.class, OhosObjectContainer.where(User.class).equalTo("name", "harmony"));

// 复杂查询（年龄大于18且按创建时间降序排列）
List<User> adultUsers = ormContext.query(User.class, 
    OhosObjectContainer.where(User.class)
        .greaterThan("age", 18)
        .orderByDesc("createTime"));

// 分页查询
List<User> pageUsers = ormContext.query(User.class, 
    OhosObjectContainer.where(User.class)
        .orderByAsc("id")
        .limit(10, 0)); // 每页10条，查询第一页

// 6. 更新数据
if (!users.isEmpty()) {
    User updateUser = users.get(0);
    updateUser.setAge(19);
    boolean isUpdated = ormContext.update(updateUser);
    ormContext.flush();
}

// 7. 删除数据
if (!users.isEmpty()) {
    User deleteUser = users.get(0);
    boolean isDeleted = ormContext.delete(deleteUser);
    ormContext.flush();
}

// 8. 事务操作
boolean isTransactionSuccess = ormContext.beginTransaction();
try {
    // 执行多个操作
    ormContext.insert(new User("user1", 20));
    ormContext.insert(new User("user2", 22));
    ormContext.update(user);
    
    ormContext.setTransactionSuccessful();
    isTransactionSuccess = true;
} finally {
    ormContext.endTransaction();
}
```

**最佳实践**：
1. 合理设计数据模型，避免过度设计
2. 为常用查询字段创建索引
3. 大数量操作时使用事务提高性能
4. 及时关闭数据库连接，避免资源泄漏
5. 数据库版本升级时处理好数据迁移

### 文件存储

文件存储适合存储二进制数据或文本数据，如图片、音频、日志等。

**使用场景**：
- 缓存网络图片
- 存储用户生成的内容
- 日志记录

**代码示例**：

```java
// 1. 存储文件到应用私有目录
String fileName = "image.jpg";
String fileContent = "Hello HarmonyOS File Storage";

// 获取应用私有目录
File filesDir = context.getFilesDir();
File file = new File(filesDir, fileName);

// 写入文件
try (FileOutputStream fos = new FileOutputStream(file)) {
    fos.write(fileContent.getBytes());
    fos.flush();
} catch (IOException e) {
    LogUtil.error("File write failed: " + e.getMessage());
}

// 读取文件
try (FileInputStream fis = new FileInputStream(file)) {
    byte[] buffer = new byte[1024];
    int length = fis.read(buffer);
    String content = new String(buffer, 0, length);
} catch (IOException e) {
    LogUtil.error("File read failed: " + e.getMessage());
}

// 2. 存储到公共目录（需要权限）
// 申请存储权限
if (verifySelfPermission(ohos.permission.WRITE_USER_STORAGE) != IBundleManager.PERMISSION_GRANTED) {
    requestPermissionsFromUser(new String[]{ohos.permission.WRITE_USER_STORAGE}, 1002);
}

// 获取公共图片目录
File publicDir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES);
File publicFile = new File(publicDir, "public_image.jpg");

// 写入文件（与私有目录类似）
// ...
```

**最佳实践**：
1. 小文件使用应用私有目录，大文件考虑使用公共目录
2. 合理组织文件结构，避免根目录下文件过多
3. 定期清理不再需要的文件，释放存储空间
4. 敏感文件应加密存储
5. 遵循系统目录规范，不要随意创建顶层目录
```

## 网络请求API

HarmonyOS提供了多种网络通信方式，满足不同场景下的网络交互需求。

### HTTP请求

HTTP请求是最常用的网络通信方式，用于与服务器进行数据交互。HarmonyOS提供了`ohos.net.HttpRequest`类来发起HTTP请求。

**支持的HTTP方法**：
- GET：获取资源
- POST：提交资源
- PUT：更新资源
- DELETE：删除资源
- PATCH：部分更新资源
- HEAD：获取响应头
- OPTIONS：获取支持的方法

**代码示例：GET请求**

```java
// 创建HTTP请求
HttpRequest request = HttpRequest.createHttp("https://jsonplaceholder.typicode.com/posts/1");
request.setRequestMethod("GET");

// 设置请求头
request.addHeader("Content-Type", "application/json");
request.addHeader("Accept", "application/json");

// 设置超时（可选）
request.setConnectTimeout(5000); // 5秒
request.setReadTimeout(5000); // 5秒

// 发起请求并处理响应
request.sendRequest(null, new HttpAsyncCallback() {
    @Override
    public void onSuccess(HttpResponse httpResponse) {
        // 处理成功响应
        int responseCode = httpResponse.getResponseCode();
        if (responseCode >= 200 && responseCode < 300) {
            String result = new String(httpResponse.getBody());
            // 解析JSON数据
            try {
                JsonObject jsonObject = new JsonParser().parse(result).getAsJsonObject();
                String title = jsonObject.get("title").getAsString();
                String body = jsonObject.get("body").getAsString();
                // 使用解析后的数据
            } catch (JsonSyntaxException e) {
                LogUtil.error("JSON parse error: " + e.getMessage());
            }
        } else {
            LogUtil.error("Request failed with code: " + responseCode);
        }
    }

    @Override
    public void onFailure(int errorCode, String errorMsg) {
        // 处理失败
        LogUtil.error("HTTP request failed: " + errorCode + ", " + errorMsg);
    }
});
```

**代码示例：POST请求**

```java
// 创建HTTP请求
HttpRequest request = HttpRequest.createHttp("https://jsonplaceholder.typicode.com/posts");
request.setRequestMethod("POST");

// 设置请求头
request.addHeader("Content-Type", "application/json");

// 构建请求体
JsonObject requestBody = new JsonObject();
requestBody.addProperty("title", "foo");
requestBody.addProperty("body", "bar");
requestBody.addProperty("userId", 1);
byte[] bodyBytes = requestBody.toString().getBytes();

// 发起请求并处理响应
request.sendRequest(bodyBytes, new HttpAsyncCallback() {
    @Override
    public void onSuccess(HttpResponse httpResponse) {
        String result = new String(httpResponse.getBody());
        LogUtil.info("POST response: " + result);
    }

    @Override
    public void onFailure(int errorCode, String errorMsg) {
        LogUtil.error("POST request failed: " + errorCode + ", " + errorMsg);
    }
});
```

### 网络请求最佳实践

1. **权限申请**
   发起网络请求需要在`config.json`中声明网络权限：
   ```json
   {
       "module": {
           "reqPermissions": [
               {
                   "name": "ohos.permission.INTERNET"
               }
           ]
       }
   }
   ```

2. **异步请求**
   网络请求必须在非主线程中执行，避免阻塞UI线程。HarmonyOS的`HttpRequest`默认是异步的，但仍需注意回调函数中的UI操作需要切换到主线程。

3. **错误处理**
   完善的错误处理机制可以提高应用的健壮性：
   ```java
   // 处理常见网络错误
   switch (errorCode) {
       case HttpErrorCode.ERROR_NO_NETWORK:
           // 无网络连接
           break;
       case HttpErrorCode.ERROR_CONNECT_TIMEOUT:
           // 连接超时
           break;
       case HttpErrorCode.ERROR_READ_TIMEOUT:
           // 读取超时
           break;
       default:
           // 其他错误
           break;
   }
   ```

4. **数据缓存**
   对频繁访问且不常变化的数据进行缓存，可以减少网络请求，提高性能：
   ```java
   // 简单内存缓存示例
   private Map<String, String> responseCache = new LruCache<>(100);
   
   // 检查缓存
   String cachedResponse = responseCache.get(url);
   if (cachedResponse != null) {
       // 使用缓存数据
   } else {
       // 发起网络请求
       // 请求成功后存入缓存
       responseCache.put(url, response);
   }
   ```

5. **请求重试**
   对暂时性网络错误进行有限次数的重试：
   ```java
   private void sendRequestWithRetry(String url, int retryCount) {
       // 发起请求
       request.sendRequest(null, new HttpAsyncCallback() {
           @Override
           public void onSuccess(HttpResponse httpResponse) {
               // 处理成功响应
           }

           @Override
           public void onFailure(int errorCode, String errorMsg) {
               if (retryCount > 0 && isRetryableError(errorCode)) {
                   // 重试请求
                   sendRequestWithRetry(url, retryCount - 1);
               } else {
                   // 处理最终失败
               }
           }
       });
   }
   
   private boolean isRetryableError(int errorCode) {
       // 定义可重试的错误码
       return errorCode == HttpErrorCode.ERROR_NO_NETWORK || 
              errorCode == HttpErrorCode.ERROR_CONNECT_TIMEOUT;
   }
   ```

### WebSocket通信

WebSocket用于实现客户端与服务器之间的双向通信，适合实时性要求高的场景。

**使用场景**：
- 即时通讯
- 实时数据更新
- 游戏交互

**代码示例**：

```java
// 创建WebSocket连接
WebSocket ws = WebSocketFactory.createWebSocket(new WebSocketObserver() {
    @Override
    public void onOpen() {
        // 连接建立成功
        LogUtil.info("WebSocket connection opened");
        // 发送消息
        ws.sendText("Hello WebSocket");
    }

    @Override
    public void onMessage(String message) {
        // 接收文本消息
        LogUtil.info("Received message: " + message);
    }

    @Override
    public void onMessage(byte[] data) {
        // 接收二进制消息
        LogUtil.info("Received binary data, length: " + data.length);
    }

    @Override
    public void onClose(int code, String reason) {
        // 连接关闭
        LogUtil.info("WebSocket closed: " + code + ", " + reason);
    }

    @Override
    public void onError(int errorCode, String errorMsg) {
        // 发生错误
        LogUtil.error("WebSocket error: " + errorCode + ", " + errorMsg);
    }
}, "wss://echo.websocket.org");

// 建立连接
ws.connect();

// 发送消息
ws.sendText("Hello WebSocket");

// 发送二进制数据
byte[] binaryData = "Binary data".getBytes();
ws.sendBinary(binaryData);

// 关闭连接
// ws.close();
```

### 网络状态监听

监控网络状态变化，以便在网络变化时做出相应处理。

**代码示例**：

```java
// 获取网络状态管理器
NetworkStatusManager networkStatusManager = (NetworkStatusManager) context.getSystemService(Context.NETWORK_STATUS_SERVICE);

// 注册网络状态变化监听
networkStatusManager.registerStatusChangeListener(new NetworkStatusChangeListener() {
    @Override
    public void onNetworkStatusChanged(NetworkStatusInfo networkStatusInfo) {
        if (networkStatusInfo.isConnected()) {
            // 网络已连接
            int networkType = networkStatusInfo.getNetworkType();
            switch (networkType) {
                case NetworkType.TYPE_WIFI:
                    // WiFi网络
                    break;
                case NetworkType.TYPE_MOBILE:
                    // 移动网络
                    break;
                default:
                    // 其他网络类型
                    break;
            }
        } else {
            // 网络已断开
        }
    }
});
```

### 注意事项

1. 网络请求必须在非主线程中执行
2. 记得申请网络权限
3. 处理网络异常和错误情况
4. 避免在弱网络环境下传输大量数据
5. 敏感数据应加密传输
6. 尊重用户隐私，不收集不必要的数据

## 媒体API

HarmonyOS提供了丰富的媒体API，支持图片、音频、视频等多种媒体类型的处理。

### 图片处理

#### 图片加载

图片加载是应用开发中常见的需求，HarmonyOS提供了多种加载图片的方式。

**代码示例：加载本地图片**

```java
// 方式1：通过资源ID加载
Image image = (Image) findComponentById(ResourceTable.Id_image);
image.setPixelMap(ResourceTable.Media_icon);

// 方式2：通过文件路径加载
String imagePath = "/sdcard/image.jpg";
File file = new File(imagePath);
if (file.exists()) {
    ImageSource.SourceOptions options = new ImageSource.SourceOptions();
    options.formatHint = "image/jpeg";
    ImageSource imageSource = ImageSource.create(file, options);
    PixelMap pixelMap = imageSource.createPixelMap(null);
    image.setPixelMap(pixelMap);
}
```

**代码示例：加载网络图片**

```java
// 创建HTTP请求获取图片数据
String imageUrl = "https://example.com/image.jpg";
HttpRequest request = HttpRequest.createHttp(imageUrl);
request.setRequestMethod("GET");

request.sendRequest(null, new HttpAsyncCallback() {
    @Override
    public void onSuccess(HttpResponse httpResponse) {
        byte[] imageData = httpResponse.getBody();
        if (imageData != null && imageData.length > 0) {
            // 加载图片数据
            ImageSource.SourceOptions options = new ImageSource.SourceOptions();
            ImageSource imageSource = ImageSource.create(imageData, options);
            PixelMap pixelMap = imageSource.createPixelMap(null);

            // 在UI线程中更新Image组件
            getUITaskDispatcher().asyncDispatch(() -> {
                Image image = (Image) findComponentById(ResourceTable.Id_image);
                image.setPixelMap(pixelMap);
            });
        }
    }

    @Override
    public void onFailure(int errorCode, String errorMsg) {
        LogUtil.error("Image request failed: " + errorCode + ", " + errorMsg);
    }
});
```

#### 图片处理

HarmonyOS提供了图片编辑和处理的API，可以对图片进行裁剪、旋转、缩放等操作。

**代码示例：图片裁剪和旋转**

```java
// 加载原图
PixelMap sourcePixelMap = ...; // 从资源或文件加载

// 裁剪图片
PixelMap.CropOptions cropOptions = new PixelMap.CropOptions();
cropOptions.x = 100;
cropOptions.y = 100;
cropOptions.width = 200;
cropOptions.height = 200;
PixelMap croppedPixelMap = sourcePixelMap.crop(cropOptions);

// 旋转图片
PixelMap.RotateOptions rotateOptions = new PixelMap.RotateOptions();
rotateOptions.degrees = 90;
PixelMap rotatedPixelMap = sourcePixelMap.rotate(rotateOptions);

// 缩放图片
PixelMap.ScaleOptions scaleOptions = new PixelMap.ScaleOptions();
scaleOptions.width = 400;
scaleOptions.height = 400;
scaleOptions.mode = ScaleMode.FIT_CENTER;
PixelMap scaledPixelMap = sourcePixelMap.scale(scaleOptions);

// 释放资源
sourcePixelMap.release();
```

### 音频处理

HarmonyOS提供了音频播放和录制的API。

#### 音频播放

**代码示例：播放音频**

```java
// 检查音频权限
if (verifySelfPermission(ohos.permission.READ_MEDIA) != IBundleManager.PERMISSION_GRANTED) {
    requestPermissionsFromUser(new String[]{ohos.permission.READ_MEDIA}, 1002);
}

// 创建音频播放器
AudioPlayer audioPlayer = new AudioPlayer(context);

// 设置音频源
String audioPath = "/sdcard/music.mp3";
audioPlayer.setDataSource(audioPath);

// 设置播放监听器
audioPlayer.setOnPreparedListener(new OnPreparedListener() {
    @Override
    public void onPrepared(AudioPlayer audioPlayer) {
        // 准备完成，可以开始播放
        audioPlayer.start();
    }
});

audioPlayer.setOnCompletionListener(new OnCompletionListener() {
    @Override
    public void onCompletion(AudioPlayer audioPlayer) {
        // 播放完成
    }
});

audioPlayer.setOnErrorListener(new OnErrorListener() {
    @Override
    public boolean onError(AudioPlayer audioPlayer, int what, int extra) {
        LogUtil.error("Audio play error: " + what + ", " + extra);
        return false;
    }
});

// 准备播放
audioPlayer.prepareAsync();

// 控制播放
audioPlayer.start(); // 开始
audioPlayer.pause(); // 暂停
audioPlayer.stop(); // 停止
audioPlayer.release(); // 释放资源
```

#### 音频录制

**代码示例：录制音频**

```java
// 检查录音权限
if (verifySelfPermission(ohos.permission.MICROPHONE) != IBundleManager.PERMISSION_GRANTED) {
    requestPermissionsFromUser(new String[]{ohos.permission.MICROPHONE}, 1003);
}

// 创建音频录制器
AudioRecorder audioRecorder = new AudioRecorder();

// 设置输出文件
String outputPath = "/sdcard/recording.mp3";
audioRecorder.setOutputFile(outputPath);

// 设置音频格式
audioRecorder.setAudioSource(AudioSource.MIC);
audioRecorder.setOutputFormat(OutputFormat.MPEG_4);
audioRecorder.setAudioEncoder(AudioEncoder.AAC);
audioRecorder.setAudioSamplingRate(44100);
audioRecorder.setAudioChannels(1);
audioRecorder.setAudioEncodingBitRate(128000);

// 准备录制
audioRecorder.prepare();

// 开始录制
audioRecorder.start();

// 停止录制
audioRecorder.stop();
audioRecorder.release();
```

### 视频处理

HarmonyOS提供了视频播放和录制的API。

#### 视频播放

**代码示例：使用VideoPlayer播放视频**

```java
// 创建VideoPlayer
VideoPlayer videoPlayer = new VideoPlayer(context);

// 设置视频源
String videoPath = "/sdcard/video.mp4";
videoPlayer.setDataSource(videoPath);

// 设置显示组件
SurfaceProvider surfaceProvider = (SurfaceProvider) findComponentById(ResourceTable.Id_surface_provider);
Surface surface = surfaceProvider.getSurface();
videoPlayer.setSurface(surface);

// 设置播放监听器
videoPlayer.setOnPreparedListener(new OnPreparedListener() {
    @Override
    public void onPrepared(VideoPlayer videoPlayer) {
        // 准备完成，可以开始播放
        videoPlayer.start();
    }
});

// 准备播放
videoPlayer.prepareAsync();

// 控制播放
videoPlayer.start(); // 开始
videoPlayer.pause(); // 暂停
videoPlayer.stop(); // 停止
videoPlayer.release(); // 释放资源
```

### 媒体会话

媒体会话用于管理媒体播放状态和交互。

**代码示例：创建媒体会话**

```java
// 创建媒体会话
MediaSession mediaSession = new MediaSession(context, "MyMediaSession");

// 设置媒体会话回调
mediaSession.setCallback(new MediaSession.Callback() {
    @Override
    public void onPlay() {
        // 处理播放请求
        audioPlayer.start();
    }

    @Override
    public void onPause() {
        // 处理暂停请求
        audioPlayer.pause();
    }

    @Override
    public void onStop() {
        // 处理停止请求
        audioPlayer.stop();
    }
});

// 激活媒体会话
mediaSession.setActive(true);

// 释放媒体会话
// mediaSession.release();
```

### 注意事项

1. 处理媒体文件时需要申请相应的权限
2. 记得及时释放媒体资源，避免内存泄漏
3. 播放网络媒体时注意网络状态和流量消耗
4. 尊重知识产权，不要未经授权使用受版权保护的媒体内容

## 位置服务API

HarmonyOS提供了位置服务API，支持获取设备的地理位置信息，适用于导航、位置标记、附近服务等场景。

### 位置权限

使用位置服务前需要申请相应的权限：

**在config.json中声明权限**：
```json
{
    "module": {
        "reqPermissions": [
            {
                "name": "ohos.permission.LOCATION",
                "reason": "需要获取您的位置信息以提供相关服务",
                "usedScene": {
                    "ability": ["MainAbility"],
                    "when": "inuse"
                }
            }
        ]
    }
}
```

**运行时申请权限**：
```java
// 检查位置权限
if (verifySelfPermission(ohos.permission.LOCATION) != IBundleManager.PERMISSION_GRANTED) {
    // 申请权限
    requestPermissionsFromUser(new String[]{ohos.permission.LOCATION}, 1001);
}
```

### 获取位置信息

**代码示例：获取一次位置**

```java
// 获取位置管理器
LocationManager locationManager = (LocationManager) context.getSystemService(Context.LOCATION_SERVICE);

// 检查权限后获取位置
if (verifySelfPermission(ohos.permission.LOCATION) == IBundleManager.PERMISSION_GRANTED) {
    // 获取最后已知位置
    Location lastLocation = locationManager.getLastKnownLocation();
    if (lastLocation != null) {
        double latitude = lastLocation.getLatitude();
        double longitude = lastLocation.getLongitude();
        float accuracy = lastLocation.getAccuracy();
        long time = lastLocation.getTime();
        // 使用位置信息
    }

    // 请求一次位置更新
    locationManager.requestSingleLocationUpdate(LocationRequest.create().setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY),
        new LocationListener() {
            @Override
            public void onLocationReport(Location location) {
                // 处理位置更新
                double latitude = location.getLatitude();
                double longitude = location.getLongitude();
                // 使用位置信息
            }

            @Override
            public void onStatusChanged(int status) {
                // 处理状态变化
                switch (status) {
                    case LocationStatus.AVAILABLE:
                        // 位置可用
                        break;
                    case LocationStatus.UNAVAILABLE:
                        // 位置不可用
                        break;
                    case LocationStatus.TEMPORARILY_UNAVAILABLE:
                        // 位置暂时不可用
                        break;
                }
            }

            @Override
            public void onProviderDisabled(String provider) {
                // 处理提供者禁用
                LogUtil.warning("Location provider disabled: " + provider);
            }
        });
}
```

**代码示例：连续位置更新**

```java
// 获取位置管理器
LocationManager locationManager = (LocationManager) context.getSystemService(Context.LOCATION_SERVICE);

// 设置位置请求参数
LocationRequest locationRequest = LocationRequest.create()
    .setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY) // 高精度
    .setInterval(5000) // 5秒更新一次
    .setFastestInterval(2000); // 最快2秒更新一次

// 请求位置更新
locationManager.requestLocationUpdates(locationRequest,
    new LocationListener() {
        @Override
        public void onLocationReport(Location location) {
            // 处理位置更新
            double latitude = location.getLatitude();
            double longitude = location.getLongitude();
            float speed = location.getSpeed();
            float bearing = location.getBearing();
            // 使用位置信息
        }

        @Override
        public void onStatusChanged(int status) {
            // 处理状态变化
        }

        @Override
        public void onProviderDisabled(String provider) {
            // 处理提供者禁用
        }
    });

// 取消位置更新
// locationManager.removeLocationUpdates(locationListener);
```

### 地理编码与逆地理编码

地理编码：将地址转换为坐标；逆地理编码：将坐标转换为地址。

**代码示例：逆地理编码**

```java
// 获取地理编码服务
GeocodingService geocodingService = GeocodingServiceFactory.createGeocodingService(context);

// 设置逆地理编码参数
ReverseGeocodingRequest request = new ReverseGeocodingRequest();
request.setLatitude(39.9042); // 纬度
request.setLongitude(116.4074); // 经度
request.setLanguage("zh-CN"); // 语言

// 执行逆地理编码
geocodingService.reverseGeocode(request, new ReverseGeocodingCallback() {
    @Override
    public void onReverseGeocodingResult(ReverseGeocodingResult result) {
        if (result.getReturnCode() == ReverseGeocodingResult.SUCCESS) {
            Address address = result.getAddress();
            String country = address.getCountry();
            String province = address.getProvince();
            String city = address.getCity();
            String district = address.getDistrict();
            String detail = address.getDetailAddress();
            // 使用地址信息
        } else {
            LogUtil.error("Reverse geocoding failed: " + result.getReturnCode());
        }
    }

    @Override
    public void onReverseGeocodingError(int errorCode) {
        LogUtil.error("Reverse geocoding error: " + errorCode);
    }
});
```

### 位置服务最佳实践

1. **权限管理**
   - 只在需要时申请位置权限
   - 向用户解释为什么需要位置权限
   - 尊重用户的权限选择

2. **选择合适的精度**
   - 高精度（PRIORITY_HIGH_ACCURACY）：适合导航等需要精确定位的场景
   - 平衡功耗（PRIORITY_BALANCED_POWER_ACCURACY）：适合一般位置服务
   - 低功耗（PRIORITY_LOW_POWER）：适合对精度要求不高的场景
   - 被动定位（PRIORITY_NO_POWER）：只接收其他应用触发的位置更新

3. **优化电池使用**
   - 不需要位置时取消位置更新
   - 适当设置更新间隔，避免过于频繁
   - 结合使用requestSingleLocationUpdate和requestLocationUpdates

4. **错误处理**
   - 处理位置不可用的情况
   - 处理权限被拒绝的情况
   - 提供用户友好的错误提示

### 注意事项

1. 位置服务需要设备支持GPS或其他定位技术
2. 在室内或信号弱的地方，定位精度可能会降低
3. 持续使用位置服务会增加电池消耗
4. 尊重用户隐私，不收集和滥用位置信息
5. 遵守相关法律法规，确保位置服务的合法使用

## 注意事项

1. 调用大部分API需要申请相应的权限
2. 异步API调用时注意线程安全
3. 网络请求不能在主线程中进行
4. 记得及时释放资源，避免内存泄漏
5. 遵循鸿蒙API的命名规范和使用约定

通过本章的学习，你已经掌握了鸿蒙开发中常用API的基本使用方法，为后续的实战开发奠定了基础。