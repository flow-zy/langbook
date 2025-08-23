# Webpack加载器使用

加载器(Loader)是Webpack的核心功能之一，它允许Webpack处理非JavaScript文件。在这一章中，我们将学习如何使用各种常用加载器。

## 加载器的基本概念

加载器用于将不同类型的文件转换为Webpack能够处理的模块。加载器可以链式调用，每个加载器负责完成特定的转换任务。

### 加载器的配置方式

在Webpack配置中，加载器通过`module.rules`配置：

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
```

### 加载器的执行顺序

加载器的执行顺序是从右到左（或从下到上）的。在上面的例子中，`css-loader`会先执行，然后是`style-loader`。

## 常用加载器

### Babel加载器

`babel-loader`用于将ES6+代码转换为ES5代码。

#### 安装

```bash
npm install babel-loader @babel/core @babel/preset-env --save-dev
```

#### 配置

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
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

### CSS加载器

`css-loader`用于处理CSS文件中的`@import`和`url()`，`style-loader`用于将CSS插入到DOM中。

#### 安装

```bash
npm install style-loader css-loader --save-dev
```

#### 配置

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
```

### Sass加载器

`sass-loader`用于将Sass/SCSS文件转换为CSS。

#### 安装

```bash
npm install sass-loader sass style-loader css-loader --save-dev
```

#### 配置

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
};
```

### 文件加载器

`file-loader`用于处理图片、字体等文件。

#### 安装

```bash
npm install file-loader --save-dev
```

#### 配置

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      }
    ]
  }
};
```

> 注意：Webpack 5推荐使用`asset/resource`类型而不是`file-loader`，但`file-loader`仍然可以使用。

### URL加载器

`url-loader`类似于`file-loader`，但可以将小文件转换为base64 URL。

#### 安装

```bash
npm install url-loader --save-dev
```

#### 配置

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ]
  }
};
```

### TypeScript加载器

`ts-loader`用于处理TypeScript文件。

#### 安装

```bash
npm install ts-loader typescript --save-dev
```

#### 配置

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
};
```

## 加载器选项

加载器可以通过`options`配置特定的选项：

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  }
};
```

## 实际应用示例

下面是一个使用多种加载器的完整配置示例：

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      // JavaScript加载器
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      // CSS加载器
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // Sass加载器
      {
        test: /\.(scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      // 图片加载器
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      // 字体加载器
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      }
    ]
  }
};
```

## 总结

加载器是Webpack处理非JavaScript文件的核心机制。通过配置不同的加载器，Webpack可以处理CSS、Sass、图片、字体等多种资源类型。在实际项目中，我们需要根据项目需求选择和配置合适的加载器。在下一章中，我们将学习如何使用插件扩展Webpack的功能。