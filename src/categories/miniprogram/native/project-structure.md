# 项目结构详解

本章将详细解析原生小程序的项目结构，包括核心文件作用、全局配置文件详解、页面文件组成和资源目录管理。

## 核心文件作用解析

创建完成后，原生小程序项目结构如下：

```
├── app.js         // 小程序入口文件
├── app.json       // 全局配置
├── app.wxss       // 全局样式
├── project.config.json  // 项目配置文件
├── pages/         // 页面文件夹
│   ├── index/     // 首页
│   │   ├── index.js   // 页面逻辑
│   │   ├── index.json // 页面配置
│   │   ├── index.wxml // 页面结构
│   │   └── index.wxss // 页面样式
│   └── logs/      // 日志页面
│       ├── logs.js
│       ├── logs.json
│       ├── logs.wxml
│       └── logs.wxss
├── utils/         // 工具函数
│   └── util.js
└── images/        // 图片资源
```

### 核心文件说明

- **app.js**：小程序的全局逻辑文件，包含小程序的生命周期函数和全局数据
- **app.json**：小程序的全局配置文件，用于配置页面路径、窗口样式、标签栏等
- **app.wxss**：小程序的全局样式文件，定义全局样式
- **project.config.json**：项目配置文件，记录项目的基本信息
- **页面文件**：每个页面由.js、.json、.wxml和.wxss四个文件组成，分别对应逻辑、配置、结构和样式

## 全局配置文件(app.json)详解

app.json是小程序的全局配置文件，主要包含以下配置项：

```json
{
  "pages": [
    "pages/index/index",
    "pages/logs/logs"
  ],
  "window": {
    "backgroundTextStyle": "light",
    "navigationBarBackgroundColor": "#fff",
    "navigationBarTitleText": "WeChat",
    "navigationBarTextStyle": "black"
  },
  "tabBar": {
    "color": "#999",
    "selectedColor": "#1296db",
    "backgroundColor": "#fff",
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "images/home.png",
        "selectedIconPath": "images/home_selected.png"
      },
      {
        "pagePath": "pages/logs/logs",
        "text": "日志",
        "iconPath": "images/logs.png",
        "selectedIconPath": "images/logs_selected.png"
      }
    ]
  }
}
```

## 页面文件组成

每个页面由四个文件组成：

- **.js文件**：页面逻辑文件，包含页面的生命周期函数、数据和事件处理
- **.json文件**：页面配置文件，用于配置当前页面的窗口样式等
- **.wxml文件**：页面结构文件，类似HTML，用于描述页面结构
- **.wxss文件**：页面样式文件，类似CSS，用于定义页面样式

## 资源目录管理

合理管理资源目录可以提高开发效率：

- **images/**：存放图片资源
- **utils/**：存放工具函数
- **components/**：存放自定义组件
- **libs/**：存放第三方库

建议根据项目规模和需求合理规划目录结构。