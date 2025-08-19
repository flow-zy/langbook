# 配置指南

## 配置文件结构

VuePress 主题希望的配置主要包含以下几个文件：

- `src/.vuepress/config.ts`: 主配置文件
- `src/.vuepress/theme.ts`: 主题配置文件
- `src/.vuepress/navbar.ts`: 导航栏配置文件
- `src/.vuepress/sidebar.ts`: 侧边栏配置文件

## 主配置文件

在 `config.ts` 中，您可以配置网站的基本信息：

```ts
import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "您的网站标题",
  description: "您的网站描述",
  theme,
});
```

## 主题配置

在 `theme.ts` 中，您可以配置主题的各种功能：

```ts
import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://您的域名.com",
  logo: "/logo.svg",
  repo: "您的仓库地址",
  navbar,
  sidebar,
  // 其他主题配置...
});
```

## 下一步

了解完基本配置后，您可以继续阅读 [高级配置](../advanced/) 部分来探索更多功能。