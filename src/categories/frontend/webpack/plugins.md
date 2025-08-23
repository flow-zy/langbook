# Webpack插件配置

插件(Plugin)是Webpack的另一个核心功能，用于扩展Webpack的功能。与加载器不同，插件可以执行范围更广的任务，如打包优化、资源管理、环境变量注入等。

## 插件的基本概念

插件是一个具有`apply`方法的JavaScript对象。这个方法会被Webpack编译器调用，并在整个编译生命周期中访问编译器对象。

### 插件的配置方式

在Webpack配置中，插件通过`plugins`数组配置：

```javascript
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin()
  ]
};
```

## 常用插件

### HtmlWebpackPlugin

`HtmlWebpackPlugin`用于生成HTML文件，并自动引入所有bundle。

#### 安装

```bash
npm install html-webpack-plugin --save-dev
```

#### 配置

```javascript
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack Demo',
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ]
};
```

#### 常用选项

- `title`：HTML文件的标题
- `template`：模板HTML文件的路径
- `filename`：输出的HTML文件名
- `inject`：指定bundle插入的位置（'head'、'body'或false）
- `minify`：是否压缩HTML
- `hash`：是否在引入的bundle后添加哈希值

### CleanWebpackPlugin

`CleanWebpackPlugin`用于在每次构建前清理输出目录。

#### 安装

```bash
npm install clean-webpack-plugin --save-dev
```

#### 配置

```javascript
// webpack.config.js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  plugins: [
    new CleanWebpackPlugin()
  ]
};
```

### MiniCssExtractPlugin

`MiniCssExtractPlugin`用于将CSS提取到单独的文件中，而不是嵌入到JavaScript中。

#### 安装

```bash
npm install mini-css-extract-plugin --save-dev
```

#### 配置

```javascript
// webpack.config.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ]
};
```

### DefinePlugin

`DefinePlugin`用于定义全局常量，可以在代码中直接使用这些常量。

#### 配置

```javascript
// webpack.config.js
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'APP_VERSION': JSON.stringify('1.0.0')
    })
  ]
};
```

#### 使用示例

```javascript
// 在代码中使用定义的常量
if (process.env.NODE_ENV === 'development') {
  console.log('开发环境');
}
console.log(`应用版本: ${APP_VERSION}`);
```

### HotModuleReplacementPlugin

`HotModuleReplacementPlugin`用于启用热模块替换功能，在开发过程中无需刷新页面即可更新模块。

#### 配置

```javascript
// webpack.config.js
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devServer: {
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
```

### CopyWebpackPlugin

`CopyWebpackPlugin`用于将文件或目录复制到输出目录。

#### 安装

```bash
npm install copy-webpack-plugin --save-dev
```

#### 配置

```javascript
// webpack.config.js
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/assets',
          to: 'assets'
        }
      ]
    })
  ]
};
```

## 自定义插件

除了使用现有的插件，我们还可以编写自定义插件。

### 自定义插件示例

```javascript
// 自定义插件
class MyPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('MyPlugin', (stats) => {
      console.log('编译完成');
    });
  }
}

// webpack.config.js
module.exports = {
  plugins: [
    new MyPlugin()
  ]
};
```

## 完整插件配置示例

下面是一个使用多种插件的完整配置示例：

```javascript
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].bundle.js'
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
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Webpack Demo',
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/assets',
          to: 'assets'
        }
      ]
    })
  ]
};
```

## 总结

插件是Webpack扩展功能的重要机制。通过使用不同的插件，我们可以实现HTML生成、目录清理、CSS提取等多种功能。在实际项目中，我们需要根据项目需求选择和配置合适的插件。在下一章中，我们将学习如何搭建Webpack开发服务器。