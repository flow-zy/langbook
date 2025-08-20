import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/categories/frontend/web/": [
    {
      text: "Web 前端开发",
      icon: "arcticons:es-de-frontend",
      prefix: "/categories/frontend/web/",
      children: [
        { text: "HTML", icon: 'picon:html', link: "html/" },
        { 
          text: "CSS", 
          icon: 'fa7-brands:css', 
          link: "css/", 
          children: [
            { text: "CSS 简介", link: "css/intro" },
            { text: "单位和值", link: "css/units-and-values" },
            { text: "选择器", link: "css/selectors-advanced" },
            { text: "伪元素", link: "css/pseudo-elements" },
            { text: "盒模型", link: "css/box-model" },
            { text: "布局模式", link: "css/layout-models" },
            { text: "颜色与字体", link: "css/color-and-typography" },
            { text: "背景", link: "css/background" },
            { text: "动画", link: "css/animation" },
            { text: "圆角、阴影和边框", link: "css/borders-shadows" },
            { text: "Transform", link: "css/transform" },
            { text: "Flexbox", link: "css/flexbox" },
            { text: "Grid 布局", link: "css/grid" },
            { text: "CSS 变量", link: "css/variables" },
            { text: "字体和图标", link: "css/font-and-icons" },
            { text: "容器查询", link: "css/container-queries" },
            { text: "形状与遮罩", link: "css/shapes-and-masks" },
            { text: "滤镜与特效", link: "css/filters-and-effects" },
            { text: "媒体特性", link: "css/media-features-accessibility" },
            { text: "渲染性能", link: "css/rendering-performance" },
            { text: "自定义属性类型注册", link: "css/custom-property-registration" },
            { text: "函数补充", link: "css/function-reference" }
          ] 
        },
        { text: "JavaScript", icon: 'ri:javascript-line', link: "javascript/" },
        { text: "TypeScript", icon: 'proicons:typescript', link: "typescript/" }
      ]
    }
  ]
});
