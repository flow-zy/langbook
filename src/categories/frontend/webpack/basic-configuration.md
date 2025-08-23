# Webpack基础配置

Webpack的配置是通过一个JavaScript文件来完成的。这个文件通常命名为`webpack.config.js`，位于项目的根目录。在这一章中，我们将学习Webpack的基础配置方法。

## 配置文件的基本结构

Webpack配置文件是一个导出对象的JavaScript文件：

```javascript
// webpack.config.js
module.exports = {
  // 配置选项
};
```

## 入口配置

入口配置指定Webpack从哪个模块开始构建依赖关系图。

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

### 入口配置的高级用法

入口配置还可以是一个函数，返回入口对象：

```javascript
// webpack.config.js
module.exports = {
  entry: () => {
    return {
      app: './src/app.js',
      vendor: './src/vendor.js'
    };
  }
};
```

## 出口配置

出口配置指定Webpack在哪里输出bundle以及如何命名这些文件。

### 基础出口配置

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
    filename: '[name].[contenthash].bundle.js'
  }
};
```

### 常用占位符

- `[name]`：入口名称
- `[contenthash]`：根据文件内容生成的哈希值
- `[hash]`：根据编译生成的哈希值
- `[chunkhash]`：根据chunk内容生成的哈希值

## 模式配置

模式配置指定Webpack使用相应的优化策略。

```javascript
// webpack.config.js
module.exports = {
  mode: 'development'
  // 或 'production' 或 'none'
};
```

## 开发工具配置

开发工具配置用于生成source map，帮助我们在开发过程中调试代码。

```javascript
// webpack.config.js
module.exports = {
  devtool: 'inline-source-map'
};
```

### 常用devtool选项

- `none`：不生成source map
- `inline-source-map`：将source map作为Data URL嵌入到bundle中
- `source-map`：生成外部source map文件
- `eval-cheap-module-source-map`：开发环境常用，平衡性能和质量

## 模块解析配置

模块解析配置指定Webpack如何查找模块。

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts'],
    alias: {
      '@': path.resolve(__dirname, 'src/')
    }
  }
};
```

## 完整基础配置示例

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src/')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
```

## 命令行配置

除了使用配置文件，还可以在命令行中指定配置选项：

```bash
webpack --entry=./src/index.js --output-path=./dist --mode=development
```

## 总结

Webpack的基础配置包括入口、出口、模式、开发工具等选项。通过配置这些选项，我们可以控制Webpack的构建过程。在实际项目中，通常会根据项目需求定制这些配置。在下一章中，我们将学习如何使用加载器处理不同类型的资源。