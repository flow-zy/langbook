# Webpack 5新特性

Webpack 5于2020年10月发布，带来了许多重要的改进和新特性。这些改进不仅提升了构建性能，还简化了配置，增强了功能。本章将介绍Webpack 5的主要新特性。

## 模块联邦

模块联邦(Module Federation)是Webpack 5引入的最具革命性的特性之一，它允许在不同应用之间共享模块，实现了微前端架构的最佳实践。

### 基本概念

- **主机应用(host)**: 消费其他应用提供的模块
- **远程应用(remote)**: 提供模块给其他应用使用
- **共享依赖(shared)**: 多个应用共享的依赖

### 配置示例

#### 远程应用配置

```javascript
// webpack.config.js (远程应用)
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'remoteApp',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/Button'
      },
      shared: ['react', 'react-dom']
    })
  ]
};
```

#### 主机应用配置

```javascript
// webpack.config.js (主机应用)
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'hostApp',
      remotes: {
        remoteApp: 'remoteApp@http://localhost:3001/remoteEntry.js'
      },
      shared: ['react', 'react-dom']
    })
  ]
};
```

#### 在主机应用中使用远程模块

```javascript
// 主机应用中使用远程模块
import React, { lazy, Suspense } from 'react';

const RemoteButton = lazy(() => import('remoteApp/Button'));

function App() {
  return (
    <div>
      <h1>主机应用</h1>
      <Suspense fallback={<div>加载中...</div>}>
        <RemoteButton />
      </Suspense>
    </div>
  );
}

export default App;
```

## 持久化缓存

Webpack 5引入了持久化缓存机制，可以显著提升重复构建的速度。

### 配置示例

```javascript
// webpack.config.js
module.exports = {
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    },
    name: 'development-cache'
  }
};
```

### 缓存策略

```javascript
// webpack.config.js
module.exports = {
  cache: {
    type: 'filesystem',
    version: '1.0',
    maxAge: 5184000000, // 60天
    store: 'pack',
    cacheLocation: path.resolve(__dirname, '.cache')
  }
};
```

## 资源模块

Webpack 5引入了资源模块(Asset Modules)，用于处理图片、字体等资源，无需额外安装loader。

### 资源模块类型

- `asset/resource`: 发送一个单独的文件并导出URL
- `asset/inline`: 导出一个资源的data URI
- `asset/source`: 导出资源的源代码
- `asset`: 自动选择是导出data URI还是发送单独的文件

### 配置示例

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.txt$/i,
        type: 'asset/source'
      },
      {
        test: /\.xml$/i,
        type: 'asset/inline'
      }
    ]
  }
};
```

### 自定义输出文件名

```javascript
// webpack.config.js
module.exports = {
  output: {
    assetModuleFilename: 'assets/[hash][ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      }
    ]
  }
};
```

## 改进的长期缓存

Webpack 5改进了长期缓存机制，使缓存更加稳定可靠。

### 确定性模块标识符

```javascript
// webpack.config.js
module.exports = {
  optimization: {
    moduleIds: 'deterministic',
    chunkIds: 'deterministic'
  }
};
```

### 内容哈希

```javascript
// webpack.config.js
module.exports = {
  output: {
    filename: '[name].[contenthash].bundle.js',
    chunkFilename: '[name].[contenthash].chunk.js'
  }
};
```

## 优化的构建性能

Webpack 5在构建性能方面做了许多优化。

### 持久化工作线程

```javascript
// webpack.config.js
module.exports = {
  workers: 2,
  parallelism: 2
};
```

### 优化的依赖解析

Webpack 5优化了依赖解析算法，提高了解析速度。

```javascript
// webpack.config.js
module.exports = {
  resolve: {
    extensions: ['.js', '.json'],
    modules: ['node_modules'],
    mainFields: ['main'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
};
```

## 其他改进

### 移除Node.js Polyfills

Webpack 5不再自动包含Node.js核心模块的polyfills，需要手动添加。

```bash
npm install node-polyfill-webpack-plugin --save-dev
```

```javascript
// webpack.config.js
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  plugins: [
    new NodePolyfillPlugin()
  ]
};
```

### 更好的Tree Shaking

Webpack 5改进了Tree Shaking算法，能够移除更多未使用的代码。

```javascript
// webpack.config.js
module.exports = {
  mode: 'production',
  optimization: {
    usedExports: true,
    sideEffects: true
  }
};
```

### 内置的资产压缩

Webpack 5内置了资产压缩功能，无需额外插件。

```javascript
// webpack.config.js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin()
    ]
  }
};
```

## 总结

Webpack 5带来了许多重要的改进和新特性，包括模块联邦、持久化缓存、资源模块、改进的长期缓存和构建性能优化等。这些新特性不仅提升了开发效率，还增强了Webpack的功能和灵活性。对于前端开发者来说，掌握这些新特性对于构建高效、可靠的前端应用非常重要。