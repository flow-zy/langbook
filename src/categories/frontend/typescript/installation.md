# TypeScript 安装与配置

## 安装 TypeScript
TypeScript 可以通过 npm 或 yarn 进行安装。以下是详细的安装步骤：

### 1. 前提条件
在安装 TypeScript 之前，确保已经安装了 Node.js 和 npm。可以通过以下命令检查是否已安装：

```bash
# 检查 Node.js 版本
node -v

# 检查 npm 版本
npm -v
```

如果尚未安装 Node.js，请访问 [Node.js 官方网站](https://nodejs.org/) 下载并安装。

### 2. 全局安装 TypeScript
全局安装 TypeScript 后，可以在任何目录中使用 `tsc` 命令（TypeScript 编译器）。

```bash
# 使用 npm 全局安装
npm install -g typescript

# 使用 yarn 全局安装
yarn global add typescript
```

### 3. 检查安装是否成功
安装完成后，可以通过以下命令检查 TypeScript 版本：

```bash
tsc -v
```

如果安装成功，将显示 TypeScript 的版本号，例如：`Version 5.1.6`。

### 4. 局部安装 TypeScript（推荐）
在实际项目中，通常推荐在项目内部局部安装 TypeScript，以确保项目使用的 TypeScript 版本与依赖一致。

```bash
# 创建项目目录
mkdir my-typescript-project
cd my-typescript-project

# 初始化 npm 项目
npm init -y

# 局部安装 TypeScript
export npm_config_registry=https://registry.npm.taobao.org/
npm install typescript --save-dev

# 检查局部 TypeScript 版本
npx tsc -v
```

## TypeScript 配置文件
TypeScript 使用 `tsconfig.json` 文件来配置编译选项。这个文件定义了 TypeScript 编译器如何处理 TypeScript 代码。

### 1. 生成 tsconfig.json 文件
可以使用 `tsc --init` 命令生成默认的 `tsconfig.json` 文件：

```bash
# 全局安装的 TypeScript
tsc --init

# 局部安装的 TypeScript
npx tsc --init
```

### 2. 常用配置选项
生成的 `tsconfig.json` 文件包含了大量配置选项，以下是一些常用的配置选项说明：

```json
{
  "compilerOptions": {
    /* 基本选项 */
    "target": "es2016",                          /* 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */
    "module": "commonjs",                     /* 指定模块代码生成: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */
    "esModuleInterop": true,                  /* 启用 ES 模块互操作性 */
    "forceConsistentCasingInFileNames": true, /* 强制文件名大小写一致 */
    "strict": true,                           /* 启用所有严格类型检查 */
    "skipLibCheck": true                      /* 跳过类型声明文件的检查 */,
    
    /* 源代码映射 */
    "sourceMap": true,                        /* 生成相应的 .map 文件 */
    
    /* 输出目录 */
    "outDir": "./dist",                      /* 指定编译输出目录 */
    
    /* 输入文件 */
    "rootDir": "./src",                      /* 指定源代码根目录 */
  },
  "include": ["src/**/*"],                    /* 指定要包含的文件 */
  "exclude": ["node_modules", "dist"]       /* 指定要排除的文件 */
}
```

### 3. 配置详解
- `target`: 指定编译后的 JavaScript 代码兼容的 ECMAScript 版本。
- `module`: 指定生成的模块系统。
- `esModuleInterop`: 启用后，可以使用 `import` 语句导入 CommonJS 模块。
- `strict`: 启用所有严格类型检查选项，推荐设置为 `true`。
- `sourceMap`: 生成源代码映射文件，便于调试。
- `outDir`: 指定编译后的 JavaScript 代码输出目录。
- `rootDir`: 指定源代码根目录。
- `include` 和 `exclude`: 指定要包含或排除的文件。

## 编译 TypeScript 代码
配置完成后，可以使用 `tsc` 命令编译 TypeScript 代码。

### 1. 编译单个文件
```bash
# 全局安装的 TypeScript
tsc hello.ts

# 局部安装的 TypeScript
npx tsc hello.ts
```

编译后，将生成对应的 `hello.js` 文件。

### 2. 编译整个项目
如果项目中有 `tsconfig.json` 文件，可以直接运行 `tsc` 命令编译整个项目：

```bash
# 全局安装的 TypeScript
tsc

# 局部安装的 TypeScript
npx tsc
```

编译后，所有 TypeScript 文件将被编译成 JavaScript 文件，并输出到 `outDir` 指定的目录。

### 3. 自动编译
可以使用 `-w` 或 `--watch` 参数启用监视模式，当文件发生变化时自动编译：

```bash
# 全局安装的 TypeScript
tsc -w

# 局部安装的 TypeScript
npx tsc -w
```

## 使用构建工具
在实际项目中，通常使用构建工具（如 Webpack、Vite 等）来编译 TypeScript 代码。以下是使用 Vite 的简单示例：

### 1. 安装 Vite
```bash
npm install vite @vitejs/plugin-react --save-dev
```

### 2. 创建 vite.config.ts 文件
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
});
```

### 3. 运行开发服务器
```bash
npx vite
```

### 4. 构建项目
```bash
npx vite build
```

## 练习
1. 安装 Node.js 和 npm
2. 全局安装 TypeScript
3. 创建一个简单的 TypeScript 文件 `hello.ts`
4. 编译并运行这个文件
5. 初始化一个新的项目，局部安装 TypeScript
6. 生成并配置 `tsconfig.json` 文件
7. 尝试使用不同的编译选项
8. 安装并使用 Vite 编译 TypeScript 代码

通过本章节的学习，你应该掌握了 TypeScript 的安装和配置方法，能够编译简单的 TypeScript 代码，并了解如何使用构建工具来提高开发效率。