# 鸿蒙开发环境搭建

## 系统要求

在开始搭建鸿蒙开发环境前，请确保你的计算机满足以下系统要求：

### 硬件要求
- **CPU**：推荐Intel Core i5或更高，AMD Ryzen 5或更高
- **内存**：8GB及以上（推荐16GB或更高）
- **硬盘**：至少100GB可用空间（推荐SSD以提高性能）
- **显卡**：支持OpenGL 3.2或更高版本
- **网络**：稳定的网络连接（用于下载SDK和相关资源）

### Windows系统要求
- 操作系统：Windows 10 64位（版本2004或更高）或Windows 11 64位
- JDK：JDK 11或更高版本（推荐JDK 17）
- Node.js：v14.19.0或更高版本（推荐v16.x或v18.x）
- 必须启用虚拟化技术（VT-x/AMD-V）
- 关闭或配置Windows Defender防火墙以允许DevEco Studio访问网络
- 安装.NET Framework 4.8或更高版本

### macOS系统要求
- 操作系统：macOS 10.15（Catalina）或更高版本
- JDK：JDK 11或更高版本（推荐JDK 17）
- Node.js：v14.19.0或更高版本（推荐v16.x或v18.x）
- Xcode：12.0或更高版本（用于iOS模拟器联调）
- Command Line Tools for Xcode

### Linux系统要求（非官方支持）
> 注意：鸿蒙官方暂未正式支持Linux系统，但可通过Docker或虚拟机方式运行
- 操作系统：Ubuntu 20.04或更高版本
- 内核版本：5.4或更高
- 内存：16GB及以上
- 硬盘：200GB及以上可用空间

## 安装DevEco Studio

DevEco Studio是鸿蒙官方推荐的集成开发环境，基于IntelliJ IDEA开发，提供了完整的鸿蒙应用开发工具链，包括代码编辑、编译、调试和发布等功能。

### 步骤1：下载DevEco Studio

1. 访问华为开发者联盟官网：https://developer.huawei.com/consumer/cn/deveco-studio
2. 点击"下载"按钮，选择适合你操作系统的最新稳定版本
3. 同意协议并下载安装包（约1.5GB，建议使用下载工具加速）

### 步骤2：安装DevEco Studio

#### Windows安装
1. 双击下载的安装包（如：deveco-studio-xxxx.exe）
2. 在欢迎界面点击"Next"
3. 选择安装路径，建议使用默认路径（C:\Program Files\Huawei\DevEco Studio），点击"Next"
4. 选择开始菜单文件夹，保持默认，点击"Next"
5. 勾选创建桌面快捷方式和添加到PATH环境变量，点击"Install"
6. 等待安装完成（可能需要5-10分钟），点击"Finish"

**常见问题**：
- 安装过程中提示"无法访问注册表"：以管理员身份运行安装程序
- 安装卡在"正在安装组件"：检查网络连接，关闭防火墙后重试
- 提示"需要安装.NET Framework"：前往微软官网下载并安装.NET Framework 4.8

#### macOS安装
1. 双击下载的DMG文件（如：deveco-studio-xxxx.dmg）
2. 将DevEco Studio拖拽到Applications文件夹中
3. 打开Launchpad，点击DevEco Studio图标启动
4. 首次启动时，系统会提示"无法打开，因为它来自身份不明的开发者"，需前往"系统偏好设置"->"安全性与隐私"->"通用"标签页，点击"仍要打开"
5. 如果提示"无法验证App完整性"，打开终端执行：`xattr -d com.apple.quarantine /Applications/DevEco\ Studio.app`

### 步骤3：配置DevEco Studio

1. 首次启动DevEco Studio，会提示配置SDK
2. 选择"Customize"自定义配置，点击"Next"
3. 选择JDK路径：
   - Windows：建议使用IDE自带的JDK（默认路径）
   - macOS：选择已安装的JDK路径或使用IDE自带JDK
4. 选择Node.js路径：
   - 如果已安装Node.js，IDE会自动识别
   - 如未安装，可勾选"Download and install Node.js"自动安装
5. 选择HarmonyOS SDK版本：
   - 建议选择最新稳定版（如HarmonyOS 4.0）
   - 可根据项目需求选择特定版本
6. 选择SDK安装路径（默认路径即可）
7. 点击"Next"，等待SDK下载完成（可能需要30分钟以上，取决于网络速度）
8. 下载完成后，点击"Finish"完成配置

**离线SDK配置方法**：
如果网络条件不好，可以手动下载SDK离线包：
1. 访问华为开发者联盟SDK下载页面：https://developer.huawei.com/consumer/cn/harmonyos/develop/ide
2. 下载对应版本的SDK离线包
3. 在DevEco Studio中选择"Local SDK"，指定离线包解压路径

**代理配置**：
如果需要通过代理服务器访问网络：
1. 点击"Proxy Settings"
2. 选择"Manual proxy configuration"
3. 填写代理服务器地址和端口
4. 如果需要身份验证，勾选"Proxy requires authentication"并填写用户名和密码
5. 点击"Check connection"测试连接

## 配置HarmonyOS模拟器

### 创建和启动模拟器
1. 打开DevEco Studio
2. 点击菜单栏的"Tools" -> "Device Manager"
3. 在设备管理器中，点击"New Device"
4. 选择设备类型：
   - **Phone**：手机设备（推荐P50 Pro）
   - **Tablet**：平板设备（推荐MatePad Pro）
   - **TV**：电视设备
   - **Wearable**：可穿戴设备（如Watch 3）
   - **Smart Vision**：智能视觉设备
5. 选择设备型号和HarmonyOS版本（建议选择最新版本）
6. 点击"Next"，等待模拟器创建完成
7. 点击"Start"启动模拟器

### 模拟器高级功能

#### 模拟位置信息
1. 启动模拟器
2. 点击模拟器窗口右侧的"Location"图标
3. 在弹出的位置模拟面板中：
   - 可以选择预设的位置（如北京、上海等）
   - 可以手动输入经纬度坐标
   - 可以通过地图选择位置
   - 可以设置位置移动路径和速度，模拟设备移动
4. 设置完成后，点击"Apply"应用设置

#### 模拟网络状态
1. 启动模拟器
2. 点击模拟器窗口右侧的"Network"图标
3. 在弹出的网络模拟面板中：
   - 可以选择网络类型（2G、3G、4G、5G、Wi-Fi）
   - 可以设置网络延迟（如0ms、100ms、500ms等）
   - 可以设置网络速度限制（如1Mbps、10Mbps等）
   - 可以模拟网络断开和重连
4. 设置完成后，点击"Apply"应用设置

#### 模拟传感器数据
1. 启动模拟器
2. 点击模拟器窗口右侧的"Sensors"图标
3. 在弹出的传感器模拟面板中：
   - 可以模拟加速度传感器（Accelerometer）
   - 可以模拟陀螺仪（Gyroscope）
   - 可以模拟重力传感器（Gravity）
   - 可以模拟光线传感器（Light）
   - 可以模拟磁场传感器（Magnetic Field）
4. 调整相应的参数，模拟器会将这些数据发送给应用

#### 模拟电池状态
1. 启动模拟器
2. 点击模拟器窗口右侧的"Battery"图标
3. 在弹出的电池模拟面板中：
   - 可以设置电池电量（0%-100%）
   - 可以设置充电状态（未充电、充电中、已充满）
   - 可以设置电池健康状态
4. 设置完成后，点击"Apply"应用设置

### 模拟器性能优化
1. 打开模拟器设置（点击模拟器窗口右上角的齿轮图标）
2. 在"性能"选项卡中：
   - 调整CPU核心数（建议2-4核，不超过物理CPU核心数的一半）
   - 调整内存大小（建议2GB-4GB，根据物理内存大小调整）
   - 启用"使用硬件加速"（如果支持）
   - 选择"高性能"模式
3. 在"显示"选项卡中：
   - 调整分辨率（建议1080p或更低以提高性能）
   - 选择合适的DPI值
4. 在"高级"选项卡中：
   - 启用"快速启动"（下次启动模拟器时更快）
   - 关闭"自动旋转屏幕"（如果不需要）

### 连接物理设备
1. 打开HarmonyOS设备的"开发者选项"：
   - 进入"设置"->"关于手机"->连续点击"版本号"7次
   - 返回"设置"->"系统和更新"->"开发者选项"
2. 启用"USB调试"、"允许USB安装应用"和"USB调试（安全设置）"
3. 使用USB数据线连接设备到电脑
4. 在DevEco Studio的设备管理器中，会自动识别物理设备
5. 点击"Connect"连接设备

### 真机调试高级配置

#### 配置日志级别
1. 连接物理设备
2. 打开DevEco Studio的"Logcat"窗口
3. 在日志级别下拉菜单中，可以选择不同的日志级别：
   - **Verbose**：显示所有日志
   - **Debug**：显示调试信息
   - **Info**：显示一般信息
   - **Warn**：显示警告信息
   - **Error**：显示错误信息
   - **Assert**：显示断言失败信息
4. 可以通过过滤器设置日志过滤条件，只显示感兴趣的日志

#### 监控设备性能
1. 连接物理设备
2. 点击菜单栏的"Tools" -> "Device Monitor"
3. 在设备监控面板中，可以查看：
   - CPU使用率
   - 内存使用情况
   - 电池状态和温度
   - 网络流量
   - 应用启动时间
4. 可以记录性能数据并导出分析报告

#### 调试 native 代码
1. 在项目中添加 native 代码
2. 点击菜单栏的"Run" -> "Edit Configurations"
3. 选择"Debug"配置
4. 在"Debugger"选项卡中，选择"Native"
5. 设置调试符号文件路径
6. 点击"OK"保存配置
7. 点击"Debug"按钮开始调试 native 代码

**无线调试**：
如果不想使用USB线，可通过Wi-Fi进行调试：
1. 确保设备和电脑连接到同一Wi-Fi网络
2. 在设备的开发者选项中，启用"无线调试"
3. 点击"无线调试"->"配对设备"
4. 选择"使用配对码配对设备"
5. 在DevEco Studio的设备管理器中，点击"Pair Device via Wi-Fi"
6. 输入配对码，点击"Pair"
7. 配对成功后，设备会显示在设备列表中

## 验证开发环境

### 创建并运行第一个HarmonyOS应用
1. 打开DevEco Studio
2. 点击"Create HarmonyOS Project"
3. 选择项目类型：
   - **Application**：创建独立应用
   - **Atomic Service**：创建原子化服务
4. 选择"Empty Ability"模板，点击"Next"
5. 填写项目信息：
   - **Project Name**：项目名称（如MyFirstHarmonyApp）
   - **Package Name**：包名（如com.example.myapplication，建议使用反向域名格式）
   - **Save Location**：保存路径（避免包含中文和特殊字符）
   - **Compile SDK**：选择HarmonyOS SDK版本
   - **Device Type**：选择支持的设备类型（可多选）
6. 点击"Finish"，等待项目初始化完成
7. 项目结构说明：
   - **entry**：应用主模块
   - **src/main/ets**：ETS代码目录（包含页面和业务逻辑）
   - **src/main/resources**：资源目录（包含图片、布局等）
   - **src/main/config.json**：应用配置文件
   - **build.gradle**：项目构建配置文件
8. 点击工具栏的"Run"按钮（绿色三角形），选择运行的设备（模拟器或物理设备）
9. 如果一切正常，设备会启动并显示应用界面（默认显示"Hello World"）

### 常见问题及解决方法
1. **编译错误：找不到符号**
   - 检查SDK版本是否匹配，尝试重新同步项目（点击"Sync Project with Gradle Files"）
   - 清理项目（点击"Build"->"Clean Project"）并重新构建
   - 检查依赖是否正确添加
   - 检查Java版本是否兼容（建议使用JDK 11或17）

2. **模拟器启动失败**
   - 检查是否启用虚拟化技术（在BIOS中开启VT-x/AMD-V）
   - 关闭360等安全软件后重试
   - 确保Hyper-V已禁用（Windows）
   - 尝试降低模拟器的CPU核心数和内存分配
   - 更新显卡驱动到最新版本
   - 尝试删除并重新创建模拟器

3. **应用安装失败**
   - 检查设备存储空间是否充足
   - 确认USB调试已开启
   - 检查应用签名是否正确配置
   - 尝试重启设备和IDE
   - 检查应用的minSdkVersion是否低于设备的SDK版本
   - 对于HarmonyOS 3.0及以上版本，确保已配置正确的profile.json5文件

4. **运行卡顿**
   - 优化模拟器性能设置，增加内存分配
   - 关闭其他占用资源的应用程序
   - 确保显卡驱动已更新到最新版本
   - 尝试使用真机调试
   - 对于大型项目，启用增量编译

5. **网络连接问题**
   - 检查防火墙设置，确保DevEco Studio可以访问网络
   - 配置代理服务器（如果需要）
   - 尝试使用手机热点连接网络
   - 检查hosts文件是否正确配置
   - 清除DNS缓存（Windows：ipconfig /flushdns；macOS：sudo dscacheutil -flushcache）

6. **DevEco Studio崩溃**
   - 检查系统是否满足最低要求
   - 关闭不必要的插件
   - 清除IDE缓存（点击"File"->"Invalidate Caches / Restart"）
   - 重新安装DevEco Studio

7. **签名配置错误**
   - 检查签名文件是否存在且路径正确
   - 确保签名密码和别名正确
   - 对于发布版本，使用正确的发布证书

8. **代码提示不工作**
   - 检查SDK是否正确配置
   - 清理项目并重新构建
   - 重启IDE
   - 检查代码是否有语法错误

9. **无法识别设备**
   - 检查USB数据线是否正常工作
   - 尝试更换USB端口
   - 确保设备驱动已正确安装（Windows）
   - 重启adb服务（adb kill-server && adb start-server）

## 配置命令行工具

### 安装ohos-cli
1. 打开命令行终端
2. 执行以下命令安装ohos-cli：
   ```bash
   npm install -g @ohos/cli
   ```
3. 验证安装：
   ```bash
   ohos -v
   ```

### 使用命令行创建项目
```bash
ohos create project --name MyProject --package com.example.myproject --template empty-ability
```

### 使用命令行编译和运行
```bash
# 编译项目
ohos build --mode debug

# 运行项目到设备
ohos run --device device-id

# 查看连接的设备
ohos list devices

# 打包应用
ohos build --mode release --sign-type debug
```

### 配置命令行代理
如果需要通过代理使用ohos-cli：
```bash
# 设置HTTP代理
export HTTP_PROXY=http://proxy.example.com:port

export HTTPS_PROXY=https://proxy.example.com:port

# 如果需要身份验证
export HTTP_PROXY_USERNAME=username
export HTTP_PROXY_PASSWORD=password
```

## 多版本SDK管理

1. 打开DevEco Studio
2. 点击菜单栏的"File" -> "Settings" -> "Appearance & Behavior" -> "System Settings" -> "HarmonyOS SDK"
3. 在SDK Manager中，可以看到已安装的SDK版本
4. 点击"Edit"可以添加或删除SDK版本
5. 点击"Download"可以下载其他版本的SDK
6. 选择需要的SDK组件（如Java SDK、JS SDK、Native SDK等）
7. 点击"Apply"开始下载和安装

**切换项目SDK版本**：
1. 打开项目的build.gradle文件
2. 修改compileSdkVersion和targetSdkVersion为目标版本
3. 同步项目（点击"Sync Project with Gradle Files"）

## 开发环境备份和迁移

### 备份配置
1. 关闭DevEco Studio
2. 复制以下目录到备份位置：
   - Windows：C:\Users\用户名\.deveco-studio
   - macOS：~/Library/Preferences/.deveco-studio
3. 复制SDK目录（默认路径）：
   - Windows：C:\Users\用户名\HarmonyOS\Sdk
   - macOS：~/HarmonyOS/Sdk
4. 复制项目目录（如果需要迁移项目）

### 迁移到新计算机
1. 在新计算机上安装相同版本的DevEco Studio
2. 关闭DevEco Studio
3. 将备份的配置目录和SDK目录复制到相应位置
4. 启动DevEco Studio，配置会自动恢复
5. 导入备份的项目

## 集成第三方工具

### 集成Git
1. 确保已安装Git（https://git-scm.com/）
2. 打开DevEco Studio，点击"File" -> "Settings" -> "Version Control" -> "Git"
3. 配置Git可执行文件路径
4. 点击"Test"验证配置
5. 点击"OK"保存配置

### 集成Gradle
1. 下载并安装Gradle（https://gradle.org/）
2. 打开DevEco Studio，点击"File" -> "Settings" -> "Build, Execution, Deployment" -> "Gradle"
3. 选择"Use local Gradle distribution"
4. 指定Gradle安装目录
5. 点击"OK"保存配置

### 集成Android Studio（可选）
如果需要开发兼容Android的鸿蒙应用：
1. 安装Android Studio（https://developer.android.com/studio）
2. 打开DevEco Studio，点击"File" -> "Settings" -> "Appearance & Behavior" -> "System Settings" -> "Android SDK"
3. 配置Android SDK路径
4. 点击"OK"保存配置

## Docker环境配置（可选）

为了实现开发环境的一致性和便于团队协作，可以使用Docker配置鸿蒙开发环境：

1. 安装Docker Desktop（https://www.docker.com/products/docker-desktop）
2. 下载鸿蒙开发环境Docker镜像：
   ```bash
   docker pull huaweicloud/harmonyos-deveco:latest
   ```
3. 运行Docker容器：
   ```bash
   docker run -it --name harmonyos-dev -p 5901:5901 -p 6080:6080 huaweicloud/harmonyos-deveco:latest
   ```
4. 通过VNC或浏览器访问容器中的DevEco Studio

## 开发资源和社区支持

### 官方资源
- 华为开发者联盟：https://developer.huawei.com/consumer/cn/
- HarmonyOS开发者文档：https://developer.huawei.com/consumer/cn/doc/development
- DevEco Studio帮助中心：https://developer.huawei.com/consumer/cn/doc/development/ide

### 社区资源
- 鸿蒙开发者论坛：https://developer.huawei.com/consumer/cn/forum/block/harmonyos
- GitHub开源社区：https://github.com/orgs/harmonyos/repositories
- 鸿蒙开发者QQ群和微信群（通过官方论坛获取）

恭喜！你已成功搭建并优化了鸿蒙开发环境。接下来，我们将学习鸿蒙开发的基础知识和核心概念。