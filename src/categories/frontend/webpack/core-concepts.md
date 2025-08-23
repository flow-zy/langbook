# Webpack核心概念

要掌握Webpack，首先需要理解它的几个核心概念。这些概念是Webpack工作原理的基础，也是配置和使用Webpack的关键。

## 入口(Entry)

入口指示Webpack应该从哪个模块开始构建依赖关系图。默认情况下，入口文件是`./src/index.js`，但你可以通过配置指定一个或多个入口文件。

### 单入口配置

```javascript
// webpack.config.js
module.exports = {
  entry: './src/index.js'
};
```

### 多入口配置

```javascript
// webpack.config.js
module.exports = {
  entry: {
    app: './src/app.js',
    vendor: './src/vendor.js'
  }
};
```

## 出口(Output)

出口指示Webpack在哪里输出它创建的bundle，以及如何命名这些文件。默认情况下，输出目录是`./dist`，默认输出文件名为`main.js`。

### 基础输出配置

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};
```

### 多入口输出配置

当有多个入口时，可以使用占位符来确保每个出口文件都有唯一的名称：

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  entry: {
    app: './src/app.js',
    vendor: './src/vendor.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  }
};
```

## 加载器(Loader)

加载器让Webpack能够处理非JavaScript文件（如CSS、图片、字体等）。加载器可以将这些文件转换为Webpack能够处理的模块。

### 常用加载器

- `babel-loader`：将ES6+代码转换为ES5代码
- `css-loader`：处理CSS文件中的`@import`和`url()`
- `style-loader`：将CSS插入到DOM中
- `file-loader`：处理图片、字体等文件
- `url-loader`：类似于file-loader，但可以将小文件转换为base64 URL

### 加载器配置示例

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
```

## 插件(Plugin)

插件用于扩展Webpack的功能。插件可以执行范围更广的任务，如打包优化、资源管理、环境变量注入等。

### 常用插件

- `HtmlWebpackPlugin`：生成HTML文件，并自动引入所有bundle
- `CleanWebpackPlugin`：在每次构建前清理dist目录
- `MiniCssExtractPlugin`：将CSS提取到单独的文件中
- `DefinePlugin`：定义环境变量
- `HotModuleReplacementPlugin`：启用热模块替换

### 插件配置示例

```javascript
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
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
    new HtmlWebpackPlugin({
      title: 'Webpack Demo',
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
};
```

## 模式(Mode)

模式指定Webpack使用相应的优化策略。有三种模式：`development`、`production`和`none`。

- `development`：开发模式，启用NamedChunksPlugin和NamedModulesPlugin
- `production`：生产模式，启用FlagDependencyUsagePlugin、FlagIncludedChunksPlugin等优化插件
- `none`：不启用任何优化

### 模式配置

```javascript
// webpack.config.js
module.exports = {
  mode: 'development'
};
```

或者在命令行中指定：

```bash
webpack --mode=development
```

## 总结

Webpack的核心概念包括入口、出口、加载器、插件和模式。理解这些概念是掌握Webpack的基础。在接下来的章节中，我们将深入学习如何配置和使用Webpack。