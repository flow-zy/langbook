# 鸿蒙开发核心概念

## 分布式架构

HarmonyOS采用分布式架构，旨在实现"万物互联"的愿景，支持多种设备的无缝协同和资源共享。其核心设计理念是"一个系统，多个设备"，让用户在不同设备上获得一致的体验。

### 分布式软总线
分布式软总线是鸿蒙的通信基础设施，基于TCP/IP和蓝牙等协议，实现不同设备间的高速、低延迟通信。它构建了一个设备间的"高速公路"，让数据传输更加高效、安全和可靠。

**核心特性**：
- **自动发现**：设备靠近时自动识别并建立连接，支持近距离和远距离发现
- **多协议适配**：支持Wi-Fi、蓝牙、NFC等多种连接方式，自动选择最优通信协议
- **安全通信**：采用TLS/DTLS加密，确保数据传输安全，支持设备认证和数据加密
- **低延迟**：优化通信协议栈，减少设备间交互延迟，最低可达10ms以内
- **跨平台**：支持不同操作系统和硬件架构的设备互联，包括鸿蒙、Android、iOS等
- **高带宽**：支持高达1Gbps的数据传输速率，满足高清视频、大型文件传输需求
- **自愈合网络**：当网络出现故障时，自动切换到备份连接，确保通信不中断

**应用场景**：
- 手机与智能手表间的健康数据同步
- 平板与智慧屏间的4K/8K高清内容投屏
- 智能家居设备间的联动控制（如灯光、窗帘、空调协同工作）
- 多设备协同办公（如手机编辑文档，平板展示，智慧屏投影）
- 车机与手机的互联（导航、音乐、电话无缝切换）

**代码示例**（设备发现与连接）：
```java
// 导入相关类
import ohos.distributedschedule.interwork.DeviceInfo;
import ohos.distributedschedule.interwork.IDeviceStateCallback;
import ohos.distributedschedule.interwork.DeviceManager;
import ohos.hiviewdfx.HiLog;
import ohos.hiviewdfx.HiLogLabel;

// 定义日志标签
private static final HiLogLabel TAG = new HiLogLabel(HiLog.LOG_APP, 0x00201, "DeviceDiscovery");

// 注册设备状态回调
DeviceManager.registerDeviceStateCallback(new IDeviceStateCallback() {
    @Override
    public void onDeviceFound(DeviceInfo deviceInfo) {
        // 发现新设备
        String deviceId = deviceInfo.getDeviceId();
        String deviceName = deviceInfo.getDeviceName();
        String deviceType = deviceInfo.getDeviceType();
        String deviceIp = deviceInfo.getIp();
        HiLog.info(TAG, "Found device: %{public}s, type: %{public}s, IP: %{public}s", 
                   deviceName, deviceType, deviceIp);

        // 连接设备
        connectToDevice(deviceId);
    }

    @Override
    public void onDeviceLost(String deviceId) {
        // 设备断开连接
        HiLog.info(TAG, "Device lost: %{public}s", deviceId);
    }

    @Override
    public void onDeviceStatusChanged(String deviceId, int status) {
        // 设备状态变化
        String statusStr = getStatusString(status);
        HiLog.info(TAG, "Device status changed: %{public}s, status: %{public}s", 
                   deviceId, statusStr);
    }
});

// 开始发现设备
DeviceManager.startDeviceDiscovery();

// 连接设备方法
private void connectToDevice(String deviceId) {
    // 检查设备是否已连接
    if (DeviceManager.isDeviceConnected(deviceId)) {
        HiLog.info(TAG, "Device already connected: %{public}s", deviceId);
        return;
    }

    // 建立连接
    boolean result = DeviceManager.connectDevice(deviceId);
    if (result) {
        HiLog.info(TAG, "Connect to device successfully: %{public}s", deviceId);
        // 连接成功后可以进行数据传输
        sendDataToDevice(deviceId, "Hello from phone");
    } else {
        HiLog.error(TAG, "Failed to connect to device: %{public}s", deviceId);
    }
}

// 发送数据到设备
private void sendDataToDevice(String deviceId, String data) {
    // 使用分布式数据服务发送数据
    // 这里简化处理，实际应用中需要使用具体的通信API
    HiLog.info(TAG, "Sending data to device: %{public}s, data: %{public}s", 
               deviceId, data);
}

// 将状态码转换为字符串
private String getStatusString(int status) {
    switch (status) {
        case DeviceInfo.STATUS_ONLINE:
            return "ONLINE";
        case DeviceInfo.STATUS_OFFLINE:
            return "OFFLINE";
        case DeviceInfo.STATUS_CONNECTING:
            return "CONNECTING";
        case DeviceInfo.STATUS_CONNECTED:
            return "CONNECTED";
        default:
            return "UNKNOWN" + status;
    }
}
```

### 分布式数据管理
分布式数据管理提供了跨设备的数据共享和同步机制，确保数据在不同设备间的一致性和可用性。它让用户在不同设备上都能访问到最新的数据，无需手动同步。

**核心组件**：
- **分布式数据库**：支持跨设备的数据存储和访问，基于SQLite实现
- **数据同步服务**：负责数据在设备间的同步，支持实时同步和批量同步
- **冲突解决机制**：处理多设备并发修改数据的冲突，提供自动和手动解决方式
- **数据加密服务**：确保敏感数据在传输和存储过程中的安全性
- **数据访问控制**：基于设备和用户身份的数据访问权限管理

**数据类型**：
- **键值数据**：简单的键值对数据，适合存储配置信息、用户偏好等
- **结构化数据**：关系型数据库表数据，适合存储复杂的业务数据
- **文件数据**：图片、视频等二进制文件，支持断点续传和分块传输
- **流数据**：音频、视频流等实时数据，支持低延迟传输

**同步策略**：
- **实时同步**：数据变更立即同步到其他设备
- **定时同步**：按照设定的时间间隔进行同步
- **按需同步**：用户主动触发同步操作
- **增量同步**：仅同步变化的数据，减少网络流量

**应用场景**：
- 多设备间的联系人、短信、通话记录同步
- 跨设备的待办事项、日历、笔记共享
- 家庭相册的多设备访问和编辑
- 多设备协同游戏的进度同步
- 企业文档的多设备访问和版本控制

**代码示例**（分布式数据库操作）：
```java
// 导入相关类
import ohos.data.distributed.common.KvManagerConfig;
import ohos.data.distributed.common.KvStoreConfig;
import ohos.data.distributed.common.KvStoreConstant;
import ohos.data.distributed.user.SingleKvStore;
import ohos.data.distributed.user.KvManager;

// 创建KvManager实例
KvManagerConfig config = new KvManagerConfig(getContext());
KvManager kvManager = KvManagerFactory.getInstance().createKvManager(config);

// 打开分布式数据库
KvStoreConfig storeConfig = new KvStoreConfig("my_distributed_store", KvStoreConstant.STORE_TYPE_SINGLE_VERSION);
SingleKvStore kvStore = kvManager.getKvStore(storeConfig);

// 写入数据
String key = "user_name";
String value = "Zhang Wei";
kvStore.putString(key, value);

// 读取数据
String result = kvStore.getString(key, "default_value");
HiLog.info(TAG, "Read data: %{public}s=%{public}s", key, result);

// 监听数据变化
kvStore.subscribe(Collections.singletonList(key), new SingleKvStore.KvStoreObserver() {
    @Override
    public void onChange(ChangeNotification notification) {
        // 数据变化回调
        List<String> changedKeys = notification.getChangedKeys();
        for (String changedKey : changedKeys) {
            String newValue = kvStore.getString(changedKey, "");
            HiLog.info(TAG, "Data changed: %{public}s=%{public}s", changedKey, newValue);
        }
    }
});

// 删除数据
kvStore.delete(key);
```

### 分布式任务调度
分布式任务调度能够根据设备的性能、资源状况和用户场景，将任务智能分配给最适合的设备执行。它充分利用多设备的计算资源，提高任务执行效率和用户体验。

**核心特性**：
- **设备能力感知**：自动识别设备的硬件性能（如CPU、GPU、内存）和资源使用情况
- **任务分解与迁移**：将复杂任务分解为多个子任务，并迁移到合适的设备执行
- **负载均衡**：确保任务均匀分布，避免单一设备负载过高
- **低功耗优化**：根据设备电量和使用场景优化任务调度，延长设备续航
- **实时调度**：根据设备状态变化动态调整任务分配
- **故障恢复**：当执行任务的设备发生故障时，自动将任务迁移到其他可用设备
- **优先级调度**：支持任务优先级，高优先级任务优先执行

**任务类型**：
- **计算密集型任务**：如视频编码、3D渲染等，适合分配给性能强大的设备
- **数据密集型任务**：如大数据分析、文件处理等，适合分配给存储容量大的设备
- **IO密集型任务**：如网络请求、文件读写等，适合分配给网络条件好或存储速度快的设备
- **延迟敏感型任务**：如实时游戏、视频通话等，适合分配给低延迟设备

**应用场景**：
- 手机上的4K视频编辑任务迁移到性能更强的平板或PC
- 后台数据处理任务（如相册自动备份）在闲置设备上执行
- 大型游戏的物理计算任务在云端服务器执行，渲染在本地设备
- 智能家居场景中的语音识别任务在边缘设备执行，复杂逻辑在云端处理
- 多人协同编辑文档时，各自的编辑任务在本地设备执行，同步任务在云端执行

**代码示例**（任务迁移）：
```java
// 导入相关类
import ohos.distributedschedule.taskexecutor.TaskExecutor;
import ohos.distributedschedule.taskexecutor.TaskInfo;
import ohos.distributedschedule.taskexecutor.TaskType;
import ohos.distributedschedule.taskexecutor.ITaskStatusCallback;
import ohos.distributedschedule.interwork.DeviceInfo;

// 创建任务信息
TaskInfo taskInfo = new TaskInfo();
taskInfo.setTaskName("video_encoding");
taskInfo.setTaskType(TaskType.COMPUTATION); // 计算密集型任务
taskInfo.setPriority(TaskInfo.PRIORITY_HIGH); // 高优先级
taskInfo.setParameter("video_path", "/sdcard/video.mp4");
taskInfo.setParameter("output_path", "/sdcard/encoded_video.mp4");

taskInfo.setTargetDeviceId(targetDeviceId); // 指定目标设备ID

// 设置任务状态回调
ITaskStatusCallback callback = new ITaskStatusCallback() {
    @Override
    public void onTaskSubmitted(String taskId) {
        HiLog.info(TAG, "Task submitted, taskId: %{public}s", taskId);
    }

    @Override
    public void onTaskStarted(String taskId) {
        HiLog.info(TAG, "Task started, taskId: %{public}s", taskId);
    }

    @Override
    public void onTaskCompleted(String taskId, boolean success, String result) {
        if (success) {
            HiLog.info(TAG, "Task completed successfully, taskId: %{public}s, result: %{public}s", 
                       taskId, result);
            // 处理任务完成结果
        } else {
            HiLog.error(TAG, "Task failed, taskId: %{public}s, result: %{public}s", 
                        taskId, result);
            // 处理任务失败情况
        }
    }
};

// 提交任务
TaskExecutor.submitTask(taskInfo, callback);
```

## 应用模型

HarmonyOS支持两种应用模型：FA模型和Stage模型，满足不同场景下的开发需求。

### FA（Feature Ability）模型
FA模型是鸿蒙早期版本的应用模型，基于Page和AbilitySlice构建，适合简单应用开发。

**核心组件**：
- **Page**：代表一个应用页面，是用户交互的基本单元
- **AbilitySlice**：代表页面中的一个功能片段，一个Page可以包含多个AbilitySlice
- **Intent**：用于组件间的通信，传递数据和启动组件

### Stage模型
Stage模型是HarmonyOS 3.0引入的新应用模型，更加灵活和高效，适合复杂应用和原子化服务开发。

**核心组件**：
- **Ability**：应用的基本组件，分为PageAbility、ServiceAbility等类型
- **Context**：提供应用运行环境和资源访问能力
- **WindowStage**：管理应用窗口，负责UI显示和用户交互
- **ExtensionAbility**：扩展能力，如表单、输入法等

### FA模型与Stage模型的对比
选择合适的应用模型对于鸿蒙应用开发至关重要。以下是FA模型和Stage模型的详细对比：

| 特性 | FA模型 | Stage模型 | 建议 |
|------|--------|-----------|------|
| 组件结构 | Page + AbilitySlice | Ability + Context | Stage模型结构更清晰，推荐使用 |
| 生命周期管理 | 较粗粒度（Page和AbilitySlice各自有生命周期） | 更细粒度，支持多实例，生命周期更简洁 | Stage模型生命周期管理更灵活 |
| 资源管理 | 通过ResourceManager | 通过Context统一管理 | Stage模型资源访问更便捷 |
| 窗口管理 | 由系统统一管理 | 通过WindowStage自主管理 | Stage模型窗口控制能力更强 |
| 适用场景 | 简单应用，单页面或少量页面的应用 | 复杂应用、原子化服务、多窗口应用 | 新应用建议使用Stage模型 |
| 启动性能 | 较低（需要加载多个组件） | 更高（组件按需加载） | Stage模型启动更快 |
| 内存占用 | 较大（多个组件实例） | 较小（组件复用性更高） | Stage模型内存效率更高 |
| 扩展性 | 较差（难以实现复杂功能） | 较好（支持多种ExtensionAbility） | Stage模型扩展性更强 |
| 分布式能力 | 基础支持 | 全面支持 | Stage模型分布式能力更完善 |
| 开发复杂度 | 较低 | 较高（但结构更清晰） | 熟悉后Stage模型开发效率更高 |
| 版本支持 | HarmonyOS 1.0+ | HarmonyOS 3.0+ | 新项目建议使用Stage模型 |

**如何选择应用模型？**
- 对于新开发的应用，推荐使用Stage模型，享受更现代的开发体验和更好的性能
- 对于已有的FA模型应用，可以继续维护，也可以考虑迁移到Stage模型
- 对于复杂的企业应用、原子化服务，必须使用Stage模型
- 对于简单的工具类应用，两种模型都可以选择，但建议优先考虑Stage模型

**迁移建议**：
1. 逐步迁移，先将不复杂的Page转换为Ability
2. 重构资源访问代码，使用Context替代ResourceManager
3. 调整生命周期管理逻辑，适应Stage模型的生命周期回调
4. 利用Stage模型的新特性优化应用架构
5. 测试迁移后的应用在不同设备上的兼容性

## Ability组件

Ability是鸿蒙应用的基本组件，每个Ability代表一个可以独立运行的功能单元。

### Page Ability
Page Ability用于显示UI界面，是用户交互的主要载体。

**核心特性**：
- 包含一个或多个UI页面
- 拥有完整的生命周期
- 支持用户交互和页面导航
- 可以接收Intent启动

**使用示例**：
```java
// Stage模型中的PageAbility示例
public class MainAbility extends Ability {
    @Override
    public void onStart(Intent intent) {
        super.onStart(intent);
        // 设置UI页面
        super.setMainRoute(MainAbilitySlice.class.getName());
    }
}

public class MainAbilitySlice extends AbilitySlice {
    @Override
    public void onStart(Intent intent) {
        super.onStart(intent);
        // 加载XML布局
        super.setUIContent(ResourceTable.Layout_ability_main);
        // 初始化UI组件
        initComponents();
    }

    private void initComponents() {
        // 初始化按钮、文本等UI组件
        Button button = (Button) findComponentById(ResourceTable.Id_button);
        button.setClickedListener(component -> {
            // 按钮点击事件处理
            ToastDialog dialog = new ToastDialog(getContext());
            dialog.setText("Button clicked");
            dialog.show();
        });
    }
}
```

### Service Ability
Service Ability用于提供后台服务，没有UI界面，可在后台长时间运行。

**核心特性**：
- 无UI界面，在后台运行
- 可以被其他应用调用
- 支持跨设备调用
- 适合长时间运行的任务

**应用场景**：
- 音乐播放服务
- 文件下载服务
- 数据同步服务
- 定位服务

### Data Ability
Data Ability用于管理应用数据，提供统一的数据访问接口。

**核心特性**：
- 封装数据访问逻辑
- 提供标准的数据操作接口（增删改查）
- 支持多种数据存储方式
- 支持跨应用数据共享

**支持的数据存储**：
- 关系型数据库
- 分布式数据库
- 轻量级存储
- 文件存储

### Form Ability
Form Ability用于提供卡片服务，可以在其他应用或设备桌面上显示应用的部分功能或数据。

**核心特性**：
- 轻量级UI展示
- 支持实时数据更新
- 可以被其他应用嵌入
- 支持跨设备显示

**应用场景**：
- 天气卡片
- 日程提醒卡片
- 音乐播放卡片
- 新闻资讯卡片

## 生命周期

每个Ability都有自己的生命周期，开发者需要了解和掌握这些生命周期回调方法，以便正确管理应用状态和资源。

### Page Ability生命周期
Page Ability的生命周期包含以下几个主要阶段：

1. **创建阶段**：`onStart()` - Ability创建时调用，进行初始化操作
2. **前台活动阶段**：`onActive()` - Ability进入前台并获取焦点，可以与用户交互
3. **前台非活动阶段**：`onInactive()` - Ability失去焦点，但仍在前台
4. **后台阶段**：`onBackground()` - Ability完全进入后台，释放部分资源
5. **前台恢复阶段**：`onForeground()` - Ability从后台回到前台
6. **销毁阶段**：`onStop()` - Ability销毁时调用，释放所有资源

**生命周期流程图**：
```
创建 --> 前台活动 <--> 前台非活动 <--> 后台 <--> 销毁
          ^                               |
          |                               v
          +-------------------------------+
```

### Service Ability生命周期
Service Ability的生命周期包含以下几个主要阶段：

1. **创建阶段**：`onStart()` - Service创建时调用，进行初始化操作
2. **运行阶段**：
   - `onCommand()` - 其他应用调用Service时调用
   - `onConnect()` - 其他应用绑定Service时调用
   - `onDisconnect()` - 其他应用解绑Service时调用
3. **销毁阶段**：`onStop()` - Service销毁时调用，释放所有资源

## 布局与UI组件

HarmonyOS提供了丰富的UI组件和布局方式，帮助开发者快速构建美观、响应式的应用界面。

### 常用布局

1. **DirectionalLayout**：线性布局，支持水平和垂直方向排列组件
   ```xml
   <DirectionalLayout
       xmlns:ohos="http://schemas.huawei.com/res/ohos"
       ohos:height="match_parent"
       ohos:width="match_parent"
       ohos:orientation="vertical"
       ohos:padding="20vp">
       <!-- 垂直排列的组件 -->
   </DirectionalLayout>
   ```

2. **DependentLayout**：相对布局，组件可以相对于父容器或其他组件定位
   ```xml
   <DependentLayout
       xmlns:ohos="http://schemas.huawei.com/res/ohos"
       ohos:height="match_parent"
       ohos:width="match_parent">
       <Button
           ohos:id="@+id/button"
           ohos:height="wrap_content"
           ohos:width="wrap_content"
           ohos:text="Button"/>
       <Text
           ohos:height="wrap_content"
           ohos:width="wrap_content"
           ohos:text="Text below button"
           ohos:below="@id/button"/>
   </DependentLayout>
   ```

3. **StackLayout**：堆叠布局，组件按照添加顺序堆叠显示

4. **GridLayout**：网格布局，将组件放置在网格中

5. **AdaptiveBoxLayout**：自适应盒式布局，根据屏幕尺寸自动调整组件大小和位置

### 常用UI组件

1. **Text**：文本组件，用于显示文本内容
   ```xml
   <Text
       ohos:id="@+id/text"
       ohos:height="wrap_content"
       ohos:width="wrap_content"
       ohos:text="Hello HarmonyOS"
       ohos:text_size="24fp"
       ohos:text_color="#FF0000"/>
   ```

2. **Button**：按钮组件，响应用户点击事件

3. **Image**：图片组件，显示图片资源

4. **TextField**：文本输入组件，接收用户输入

5. **ListContainer**：列表组件，显示列表数据

6. **ScrollView**：滚动视图组件，支持内容滚动

7. **CheckBox**：复选框组件

8. **RadioButton**：单选按钮组件

9. **ProgressBar**：进度条组件

10. **TabList**：标签页组件

### 组件使用技巧
- 使用**主题和样式**统一组件外观
- 合理使用**约束布局**实现响应式设计
- 对于复杂UI，考虑使用**自定义组件**提高复用性
- 使用**动画效果**增强用户体验
- 注意**组件性能优化**，避免过度绘制

## 资源管理

HarmonyOS提供了统一的资源管理机制，支持多语言、多分辨率、多主题等适配，帮助开发者构建适应不同设备和场景的应用。

### 资源类型

1. **字符串资源**：存储文本内容，支持多语言
   ```xml
   <!-- resources/element/string.json -->
   {
     "string": [
       {
         "name": "app_name",
         "value": "我的应用"
       },
       {
         "name": "welcome_message",
         "value": "欢迎使用鸿蒙应用"
       }
     ]
   }
   ```

2. **图片资源**：存储PNG、JPG等格式的图片

3. **颜色资源**：定义颜色值，支持主题切换
   ```xml
   <!-- resources/element/color.json -->
   {
     "color": [
       {
         "name": "primary_color",
         "value": "#007AFF"
       },
       {
         "name": "secondary_color",
         "value": "#FF6B00"
       }
     ]
   }
   ```

4. **尺寸资源**：定义长度、宽度等尺寸值

5. **样式资源**：定义组件的样式属性

6. **布局资源**：定义UI布局结构

7. **媒体资源**：音频、视频等媒体文件

### 资源访问

1. **在XML布局中访问**：
   ```xml
   <Text
       ohos:text="$string:welcome_message"
       ohos:text_color="$color:primary_color"
       ohos:text_size="$float:font_size_large"/>
   ```

2. **在代码中访问**：
   ```java
   // 获取字符串资源
   String welcomeMessage = getResourceManager().getString(ResourceTable.String_welcome_message);

   // 获取颜色资源
   int primaryColor = getResourceManager().getElement(ResourceTable.Color_primary_color).getColorValue();

   // 获取尺寸资源
   float fontSize = getResourceManager().getElement(ResourceTable.Float_font_size_large).getFloatValue();
   ```

### 资源适配

1. **多语言适配**：在不同的语言目录下放置对应的资源文件
   ```
   resources/
   ├── element/
   │   ├── string.json            // 默认语言
   │   └── en_US/
   │       └── string.json        // 英文
   └── media/
       ├── icon.png              // 默认图标
       └── en_US/
           └── icon.png          // 英文环境图标
   ```

2. **多分辨率适配**：在不同的分辨率目录下放置对应的图片资源
   ```
   resources/
   └── media/
       ├── icon.png              // 默认分辨率
       ├── hdpi/
       │   └── icon.png          // 高分辨率
       └── xhdpi/
           └── icon.png          // 超高分辨率
   ```

通过本章的学习，你已经深入了解了鸿蒙开发的核心概念，包括分布式架构、应用模型、Ability组件、生命周期、布局与UI组件以及资源管理等方面的知识。这些知识将为你后续的API学习和实战开发打下坚实的基础。