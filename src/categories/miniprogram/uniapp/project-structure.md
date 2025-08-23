# UniApp项目结构详解

## 项目结构概览

创建完成后，UniApp项目结构如下：

```
├── .hbuilderx/      // HBuilderX配置文件
├── .gitignore       // Git忽略文件
├── babel.config.js  // Babel配置
├── package.json     // 项目依赖
├── pages/           // 页面文件夹
│   ├── index/       // 首页
│   │   ├── index.vue // 页面文件
│   └── logs/        // 日志页面
│       └── logs.vue
├── static/          // 静态资源文件夹
│   └── logo.png
├── uni_modules/     // UniApp模块
├── unpackage/       // 打包输出目录
├── App.vue          // 应用入口文件
├── main.js          // 入口文件
├── manifest.json    // 应用配置文件
└── pages.json       // 页面路由配置
```

## 核心文件说明

### 应用级文件

- **App.vue**：应用入口文件，包含全局样式和生命周期函数
  ```vue
  <script>
  export default {
    onLaunch: function() {
      console.log('App Launch')
    },
    onShow: function() {
      console.log('App Show')
    },
    onHide: function() {
      console.log('App Hide')
    }
  }
  </script>

  <style>
  /* 全局样式 */
  page {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica;
    background-color: #f8f8f8;
  }
  </style>
  ```

- **main.js**：入口文件，用于初始化Vue实例和配置插件
  ```javascript
  import Vue from 'vue'
  import App from './App'

  Vue.config.productionTip = false

  App.mpType = 'app'

  const app = new Vue({
    ...App
  })
  app.$mount()
  ```

- **manifest.json**：应用配置文件，包含应用名称、图标、权限等信息
  ```json
  {
    "name": "uni-app-demo",
    "appid": "__UNI__XXXXXX",
    "description": "UniApp示例项目",
    "versionName": "1.0.0",
    "versionCode": "100",
    "icons": {
      "android": {
        "hdpi": "/static/icons/hdpi.png",
        "mdpi": "/static/icons/mdpi.png",
        "xhdpi": "/static/icons/xhdpi.png",
        "xxhdpi": "/static/icons/xxhdpi.png",
        "xxxhdpi": "/static/icons/xxxhdpi.png"
      },
      "ios": {
        "appstore": "/static/icons/ios.png"
      }
    },
    // 其他配置...
  }
  ```

### 页面级文件

- **pages.json**：页面路由配置文件，用于配置页面路径、窗口样式、tabBar等
  ```json
  {
    "pages": [
      {
        "path": "pages/index/index",
        "style": {
          "navigationBarTitleText": "首页"
        }
      },
      {
        "path": "pages/logs/logs",
        "style": {
          "navigationBarTitleText": "日志"
        }
      }
    ],
    "tabBar": {
      "color": "#999999",
      "selectedColor": "#007aff",
      "backgroundColor": "#ffffff",
      "list": [
        {
          "pagePath": "pages/index/index",
          "text": "首页",
          "iconPath": "static/icons/home.png",
          "selectedIconPath": "static/icons/home_selected.png"
        },
        {
          "pagePath": "pages/logs/logs",
          "text": "日志",
          "iconPath": "static/icons/logs.png",
          "selectedIconPath": "static/icons/logs_selected.png"
        }
      ]
    }
  }
  ```

- **pages/**：存放页面文件的目录，每个页面是一个.vue文件
- **static/**：存放静态资源的目录，如图片、字体等

## 资源目录管理建议

1. **静态资源**：所有静态资源（图片、字体等）都应放在static目录下
2. **组件**：可创建components目录存放自定义组件
3. **工具函数**：可创建utils目录存放工具函数
4. **API请求**：可创建api目录统一管理API请求
5. **公共样式**：可创建common目录存放公共样式文件
6. **页面文件**：保持pages目录结构清晰，按功能模块组织页面
7. **配置文件**：不要随意修改框架自动生成的配置文件

合理的目录结构有助于提高代码的可维护性和开发效率。以下是一个推荐的扩展目录结构：

```
├── api/             // API请求目录
│   ├── user.js      // 用户相关API
│   ├── goods.js     // 商品相关API
│   └── order.js     // 订单相关API
├── components/      // 自定义组件目录
│   ├── common/      // 公共组件
│   │   ├── button.vue // 自定义按钮
│   │   └── card.vue   // 卡片组件
│   └── business/    // 业务组件
├── common/          // 公共资源目录
│   ├── styles/      // 公共样式
│   └── images/      // 公共图片
├── utils/           // 工具函数目录
│   ├── request.js   // 网络请求工具
│   └── storage.js   // 存储工具
├── pages/           // 页面文件夹
│   ├── index/       // 首页
│   ├── user/        // 用户相关页面
│   └── goods/       // 商品相关页面
└── ...              // 其他目录
```