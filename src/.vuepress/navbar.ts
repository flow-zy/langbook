import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "指南",
    icon: "lightbulb",
    prefix: "/guide/",
    children: [
      {
        text: "基础",
        icon: "lightbulb",
        prefix: "basics/",
        children: ["installation", "configuration", { text: "...", icon: "ellipsis", link: "" }],
      },
      {
        text: "高级",
        icon: "lightbulb",
        prefix: "advanced/",
        children: ["seo", "pwa", { text: "...", icon: "ellipsis", link: "" }],
      },
    ],
  },
  "/demo/",
  "/portfolio",
  {
    text: "资源",
    icon: "database",
    children: [
      { text: "API 参考", link: "/api/" },
      { text: "常见问题", link: "/faq/" },
      { text: "社区", link: "https://github.com/flow-zy/langbook.git/discussions" },
    ],
  },
  {
    text: "V2 文档",
    icon: "book",
    link: "https://theme-hope.vuejs.press/zh/",
  },
]);
