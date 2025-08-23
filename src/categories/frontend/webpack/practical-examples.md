# Webpack实际应用案例

在这一章中，我们将通过几个实际的应用案例来学习Webpack的使用方法。这些案例涵盖了从简单到复杂的各种场景，可以帮助你更好地理解和掌握Webpack。

## 案例一：简单的Webpack配置

### 项目结构

```
my-project/
  ├── src/
  │   ├── index.js
  │   └── style.css
  ├── index.html
  ├── webpack.config.js
  └── package.json
```

### 步骤1：初始化项目

```bash
mkdir my-project
cd my-project
npm init -y
```

### 步骤2：安装依赖

```bash
npm install webpack webpack-cli --save-dev
npm install style-loader css-loader --save-dev
```

### 步骤3：创建文件

#### src/index.js

```javascript
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.createElement('div');
  app.className = 'app';
  app.innerHTML = '<h1>Hello Webpack!</h1>';
  document.body.appendChild(app);
});
```

#### src/style.css

```css
.app {
  text-align: center;
  margin-top: 50px;
}

h1 {
  color: blue;
}
```

#### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Webpack Demo</title>
</head>
<body>
  <script src="./dist/bundle.js"></script>
</body>
</html>
```

#### webpack.config.js

```javascript
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
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
```

### 步骤4：配置package.json

```json
{
  "scripts": {
    "build": "webpack"
  }
}
```

### 步骤5：运行构建

```bash
npm run build
```

### 步骤6：查看结果

打开`index.html`文件，你将看到一个蓝色的"Hello Webpack!"标题。

## 案例二：多入口配置

### 项目结构

```
my-project/
  ├── src/
  │   ├── page1.js
  │   ├── page2.js
  │   └── style.css
  ├── page1.html
  ├── page2.html
  ├── webpack.config.js
  └── package.json
```

### 步骤1：修改webpack.config.js

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    page1: './src/page1.js',
    page2: './src/page2.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Page 1',
      filename: 'page1.html',
      chunks: ['page1']
    }),
    new HtmlWebpackPlugin({
      title: 'Page 2',
      filename: 'page2.html',
      chunks: ['page2']
    })
  ]
};
```

### 步骤2：创建入口文件

#### src/page1.js

```javascript
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.createElement('div');
  app.className = 'app';
  app.innerHTML = '<h1>Page 1</h1>';
  document.body.appendChild(app);
});
```

#### src/page2.js

```javascript
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.createElement('div');
  app.className = 'app';
  app.innerHTML = '<h1>Page 2</h1>';
  document.body.appendChild(app);
});
```

### 步骤3：运行构建

```bash
npm run build
```

### 步骤4：查看结果

在`dist`目录中，你将看到`page1.bundle.js`和`page2.bundle.js`文件，以及自动生成的`page1.html`和`page2.html`文件。

## 案例三：生产环境配置

### 步骤1：创建生产环境配置文件

创建一个名为`webpack.prod.js`的文件：

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

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
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
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
    })
  ]
};
```

### 步骤2：修改package.json

```json
{
  "scripts": {
    "build": "webpack --config webpack.prod.js"
  }
}
```

### 步骤3：安装依赖

```bash
npm install babel-loader @babel/core @babel/preset-env --save-dev
npm install clean-webpack-plugin mini-css-extract-plugin --save-dev
```

### 步骤4：运行构建

```bash
npm run build
```

### 步骤5：查看结果

在`dist`目录中，你将看到带有哈希值的bundle文件和CSS文件，这些文件已经过优化和压缩。

## 案例四：React项目配置

### 步骤1：初始化项目

```bash
mkdir react-webpack-demo
cd react-webpack-demo
npm init -y
```

### 步骤2：安装依赖

```bash
npm install react react-dom
npm install webpack webpack-cli --save-dev
npm install babel-loader @babel/core @babel/preset-env @babel/preset-react --save-dev
npm install html-webpack-plugin --save-dev
npm install style-loader css-loader --save-dev
```

### 步骤3：创建文件

#### src/index.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
```

#### src/App.js

```javascript
import React from 'react';

function App() {
  return (
    <div className="app">
      <h1>Hello React with Webpack!</h1>
    </div>
  );
}

export default App;
```

#### src/index.css

```css
.app {
  text-align: center;
  margin-top: 50px;
}

h1 {
  color: red;
}
```

#### public/index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React Webpack Demo</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

#### webpack.config.js

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  devServer: {
    static: './dist',
    port: 3000,
    open: true
  }
};
```

### 步骤4：配置package.json

```json
{
  "scripts": {
    "start": "webpack serve --open",
    "build": "webpack"
  }
}
```

### 步骤5：运行开发服务器

```bash
npm start
```

### 步骤6：查看结果

浏览器将自动打开，并显示一个红色的"Hello React with Webpack!"标题。

## 案例五：Vue项目配置

### 步骤1：初始化项目

```bash
mkdir vue-webpack-demo
cd vue-webpack-demo
npm init -y
```

### 步骤2：安装依赖

```bash
npm install vue@next
npm install webpack webpack-cli --save-dev
npm install babel-loader @babel/core @babel/preset-env --save-dev
npm install vue-loader@next @vue/compiler-sfc --save-dev
npm install css-loader style-loader --save-dev
npm install html-webpack-plugin --save-dev
```

### 步骤3：创建文件

#### src/main.js

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import './index.css';

createApp(App).mount('#app');
```

#### src/App.vue

```vue
<template>
  <div class="app">
    <h1>Hello Vue with Webpack!</h1>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style scoped>
.app {
  text-align: center;
  margin-top: 50px;
}

h1 {
  color: green;
}
</style>
```

#### src/index.css

```css
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
```

#### public/index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vue Webpack Demo</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```

#### webpack.config.js

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader/dist/index');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
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
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new VueLoaderPlugin()
  ],
  devServer: {
    static: './dist',
    port: 3000,
    open: true
  }
};
```

### 步骤4：配置package.json

```json
{
  "scripts": {
    "start": "webpack serve --open",
    "build": "webpack"
  }
}
```

### 步骤5：运行开发服务器

```bash
npm start
```

### 步骤6：查看结果

浏览器将自动打开，并显示一个绿色的"Hello Vue with Webpack!"标题。

## 总结

通过以上几个实际应用案例，我们学习了Webpack在不同场景下的使用方法，包括简单配置、多入口配置、生产环境配置以及在React和Vue项目中的配置。这些案例覆盖了Webpack的核心功能和常见用法，可以帮助你更好地理解和掌握Webpack。在实际项目中，你可以根据项目需求灵活配置Webpack。