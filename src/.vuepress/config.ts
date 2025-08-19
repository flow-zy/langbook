import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/langbook/",

  lang: "zh-CN",
  title: "编程导航",
  description: "vuepress-theme-hope 的文档演示",

  theme,

  // 和 PWA 一起启用
  shouldPrefetch: true,
});
