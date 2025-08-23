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
      { text: "HTML", icon:'vscode-icons:file-type-html', link: "/categories/frontend/html/" },
      { text: "CSS", icon:'vscode-icons:file-type-css', link: "/categories/frontend/css/" },
      { text: "JavaScript", icon:'vscode-icons:file-type-js', link: "/categories/frontend/javascript/" },
      { text: "TypeScript", icon:'vscode-icons:file-type-typescript', link: "/categories/frontend/typescript/" },
      { text: "Vue 2", icon:'vscode-icons:file-type-vue', link: "/categories/frontend/vue2/" },
      { text: "Vue 3", icon:'vscode-icons:file-type-vue', link: "/categories/frontend/vue3/" },
      { text: "网络", icon:'mdi:network-outline', link: "/categories/frontend/network/" }
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
