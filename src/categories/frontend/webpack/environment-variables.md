# Webpack环境变量配置

在实际开发中，我们通常需要针对不同的环境（如开发环境、测试环境和生产环境）配置不同的Webpack设置。环境变量配置是实现这一需求的有效方式。

## 环境变量的基本概念

环境变量是在操作系统中设置的键值对，可以被应用程序访问。在Webpack中，我们可以通过多种方式设置和使用环境变量。

## 使用DefinePlugin设置环境变量

Webpack内置的`DefinePlugin`插件可以用于定义全局常量，这些常量可以在代码中直接使用。

### 基本配置

```javascript
// webpack.config.js
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
};
```

### 在代码中使用环境变量

```javascript
// 在代码中使用定义的环境变量
if (process.env.NODE_ENV === 'development') {
  console.log('开发环境');
} else {
  console.log('生产环境');
}
```

## 使用cross-env设置环境变量

`cross-env`是一个跨平台的环境变量设置工具，可以在不同操作系统中统一设置环境变量。

### 安装

```bash
npm install cross-env --save-dev
```

### 配置package.json

```json
// package.json
{
  "scripts": {
    "build:dev": "cross-env NODE_ENV=development webpack",
    "build:prod": "cross-env NODE_ENV=production webpack"
  }
}
```

### 在Webpack配置中访问环境变量

```javascript
// webpack.config.js
const webpack = require('webpack');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
```

## 多环境配置文件

对于复杂项目，我们可以为不同环境创建单独的Webpack配置文件。

### 项目结构

```
my-project/
  ├── config/
  │   ├── webpack.common.js
  │   ├── webpack.dev.js
  │   └── webpack.prod.js
  ├── src/
  └── package.json
```

### 通用配置(webpack.common.js)

```javascript
// config/webpack.common.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js'
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
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};
```

### 开发环境配置(webpack.dev.js)

```javascript
// config/webpack.dev.js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: '../dist',
    hot: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
});
```

### 生产环境配置(webpack.prod.js)

```javascript
// config/webpack.prod.js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  optimization: {
    minimize: true
  }
});
```

### 配置package.json

```json
// package.json
{
  "scripts": {
    "build:dev": "webpack --config config/webpack.dev.js",
    "build:prod": "webpack --config config/webpack.prod.js",
    "start": "webpack serve --config config/webpack.dev.js"
  }
}
```

## 使用dotenv-webpack

`dotenv-webpack`插件可以从`.env`文件加载环境变量。

### 安装

```bash
npm install dotenv-webpack --save-dev
```

### 创建.env文件

```
# .env
API_URL=http://localhost:3000
API_KEY=abc123
```

### 配置Webpack

```javascript
// webpack.config.js
const Dotenv = require('dotenv-webpack');

module.exports = {
  plugins: [
    new Dotenv()
  ]
};
```

### 在代码中使用

```javascript
// 在代码中使用环境变量
console.log(process.env.API_URL); // 输出: http://localhost:3000
console.log(process.env.API_KEY); // 输出: abc123
```

### 多环境.env文件

我们可以为不同环境创建不同的`.env`文件：

```
// .env.development
API_URL=http://localhost:3000

// .env.production
API_URL=https://api.example.com
```

### 配置package.json

```json
// package.json
{
  "scripts": {
    "build:dev": "cross-env NODE_ENV=development webpack",
    "build:prod": "cross-env NODE_ENV=production webpack"
  }
}
```

### 配置Webpack

```javascript
// webpack.config.js
const Dotenv = require('dotenv-webpack');

module.exports = {
  plugins: [
    new Dotenv({
      path: `.env.${process.env.NODE_ENV}`
    })
  ]
};
```

## 环境变量的安全注意事项

1. 不要将敏感信息（如API密钥、数据库密码）硬编码到代码中
2. 使用`.gitignore`忽略`.env`文件，避免将敏感信息提交到代码仓库
3. 对于CI/CD环境，使用环境变量或secret管理工具来设置敏感信息
4. 在生产环境中，确保所有调试相关的环境变量都被禁用

## 总结

环境变量配置是Webpack中实现多环境支持的重要方式。通过使用`DefinePlugin`、`cross-env`、多环境配置文件或`dotenv-webpack`等工具，我们可以轻松地为不同环境配置不同的Webpack设置。在实际项目中，建议根据项目规模和需求选择合适的环境变量配置方式。