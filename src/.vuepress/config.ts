import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/langbook/",

  lang: "zh-CN",
  title: "编程学习指南",
  description: "一站式编程学习平台，助你快速掌握前端、后端、小程序和鸿蒙开发技能开始学习",

  theme,
  head:[
    // 百度统计
    [
      'script',
      {},
      `var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?b3d8b609cfe33e63eac094170889cb8d";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();`
    ],
    // 网站图标
    ['link', { rel: 'icon', href: '/langbook/favicon.ico' }],
    // 视口设置
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    // 关键词
    ['meta', { name: 'keywords', content: '一站式编程学习平台，助你快速掌握前端、后端、小程序和鸿蒙开发技能开始学习' }],
    // 作者信息
    ['meta', { name: 'author', content: '编程导航团队' }],
    // 搜索引擎优化
    ['meta', { name: 'robots', content: 'index,follow' }],
    // 外部字体 (例如 Google Fonts)
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap' }],
    // 安全相关头部
    ['meta', { httpEquiv: 'Content-Security-Policy', content: 'default-src \'self\'; script-src \'self\' https://hm.baidu.com; style-src \'self\' \'unsafe-inline\' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src \'self\' data:' }],
    // IE 兼容性
    ['meta', { httpEquiv: 'X-UA-Compatible', content: 'IE=edge' }]
  ],
  // 和 PWA 一起启用
  shouldPrefetch: true,
});
