# Webpack开发服务器搭建

Webpack开发服务器(Webpack Dev Server)是一个用于开发环境的轻量级服务器，它提供了热模块替换(HMR)、自动刷新等功能，可以极大提高开发效率。

## 开发服务器的基本概念

Webpack开发服务器是一个基于Express的服务器，它使用Webpack的watch模式监听文件变化，并在文件变化时自动编译和刷新浏览器。

### 安装开发服务器

首先，我们需要安装Webpack开发服务器：

```bash
npm install webpack-dev-server --save-dev
```

### 基本配置

在Webpack配置中，开发服务器通过`devServer`字段配置：

```javascript
// webpack.config.js
module.exports = {
  mode: 'development',
  devServer: {
    static: './dist',
    port: 8080,
    open: true
  }
};
```

### 启动开发服务器

我们可以在`package.json`中添加一个脚本以启动开发服务器：

```json
// package.json
{
  "scripts": {
    "start": "webpack serve --open"
  }
}
```

然后运行以下命令启动开发服务器：

```bash
npm start
```

## 开发服务器的常用配置

### 静态文件目录

`static`选项用于指定静态文件目录：

```javascript
// webpack.config.js
module.exports = {
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
  }
};
```

### 端口和主机

`port`和`host`选项用于指定服务器的端口和主机：

```javascript
// webpack.config.js
module.exports = {
  devServer: {
    port: 3000,
    host: '0.0.0.0'
  }
};
```

### 自动打开浏览器

`open`选项用于在服务器启动后自动打开浏览器：

```javascript
// webpack.config.js
module.exports = {
  devServer: {
    open: true
  }
};
```

### 热模块替换

`hot`选项用于启用热模块替换功能：

```javascript
// webpack.config.js
module.exports = {
  devServer: {
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
```

### 代理

`proxy`选项用于配置代理，解决跨域问题：

```javascript
// webpack.config.js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {'^/api': ''}
      }
    }
  }
};
```

### 压缩

`compress`选项用于启用Gzip压缩：

```javascript
// webpack.config.js
module.exports = {
  devServer: {
    compress: true
  }
};
```

### 历史API回退

`historyApiFallback`选项用于支持SPA应用的路由：

```javascript
// webpack.config.js
module.exports = {
  devServer: {
    historyApiFallback: true
  }
};
```

## 开发服务器的高级配置

### 自定义中间件

我们可以通过`onBeforeSetupMiddleware`或`onAfterSetupMiddleware`选项添加自定义中间件：

```javascript
// webpack.config.js
module.exports = {
  devServer: {
    onBeforeSetupMiddleware: (devServer) => {
      devServer.app.get('/custom', (req, res) => {
        res.json({ custom: 'response' });
      });
    }
  }
};
```

### 配置HTTPS

我们可以通过`https`选项配置HTTPS：

```javascript
// webpack.config.js
const fs = require('fs');
const path = require('path');

module.exports = {
  devServer: {
    https: {
      key: fs.readFileSync(path.join(__dirname, 'ssl', 'key.pem')),
      cert: fs.readFileSync(path.join(__dirname, 'ssl', 'cert.pem')),
    },
  }
};
```

## 完整开发服务器配置示例

下面是一个完整的Webpack开发服务器配置示例：

```javascript
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack Dev Server Demo',
      template: './src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    static: './dist',
    port: 8080,
    open: true,
    hot: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {'^/api': ''}
      }
    },
    historyApiFallback: true,
    compress: true
  }
};
```

## 总结

Webpack开发服务器是开发环境中非常有用的工具，它提供了热模块替换、自动刷新等功能，可以极大提高开发效率。在实际项目中，我们需要根据项目需求配置开发服务器。在下一章中，我们将学习Webpack的实际应用案例。