import { navbar } from "vuepress-theme-hope";

export default navbar([
  {
    text: "首页",
    icon: "material-symbols:home-outline",
    link: "/"
  },
  {
    text: "前端开发",
    icon: "mingcute:web-line",
    children: [
      { text: "Web 前端开发", icon:'arcticons:es-de-frontend',link: "/categories/frontend/web/" },
      { text: "前端框架",icon:'system-uicons:cubes', link: "/categories/frontend/frameworks/" }
    ]
  },
  {
    text: "后端开发",
    icon: "lets-icons:server",
    children: [
      { text: "Java 开发", icon:'ri:java-fill', link: "/categories/backend/java/" },
      { text: "Node.js 开发", icon:'akar-icons:node-fill', link: "/categories/backend/nodejs/" },
      { text: "PHP 开发", icon:'vscode-icons:file-type-php2', link: "/categories/backend/php/" }
    ]
  },
  {
    text: "小程序开发",
    icon: "tdesign:logo-miniprogram",
    link: "/categories/miniprogram/"
  },
  {
    text: "鸿蒙开发",
    icon: "token:harmony",
    link: "/categories/harmony/"
  },
  {
    text: "实战项目",
    icon: "si:projects-alt-line",
    link: "/tutorials/projects/"
  },
]);
