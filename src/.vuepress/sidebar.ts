/*
 * @FileDescription: 
 * @Author       : zoujunjie
 * @Date         : 2025-08-19 16:36:12
 * @LastEditors  : zoujunjie
 * @LastEditTime : 2025-08-22 21:11:14
 */
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
          prefix: "css/", 
          collapsible: true,
          children: [
            { text: "CSS 简介", link: "intro" },
            { text: "单位和值", link: "units-and-values" },
            { text: "选择器", link: "selectors-advanced" },
            { text: "伪元素", link: "pseudo-elements" },
            { text: "盒模型", link: "box-model" },
            { text: "布局模式", link: "layout-models" },
            { text: "颜色与字体", link: "color-and-typography" },
            { text: "背景", link: "background" },
            { text: "动画", link: "animation" },
            { text: "圆角、阴影和边框", link: "borders-shadows" },
            { text: "Transform", link: "transform" },
            { text: "Flexbox", link: "flexbox" },
            { text: "Grid 布局", link: "grid" },
            { text: "CSS 变量", link: "variables" },
            { text: "字体和图标", link: "font-and-icons" },
            { text: "容器查询", link: "container-queries" },
            { text: "形状与遮罩", link: "shapes-and-masks" },
            { text: "滤镜与特效", link: "filters-and-effects" },
            { text: "媒体特性", link: "media-features-accessibility" },
            { text: '响应式设计', link: "responsive-design" },
            { text: "渲染性能", link: "rendering-performance" },
            { text: "自定义属性类型注册", link: "custom-property-registration" },
            { text: "函数补充", link: "function-reference" }
          ] 
        },
        { 
          text: "JavaScript", 
          icon: 'ri:javascript-line', 
          prefix: "javascript/",
          collapsible: true,
          children: [
            { text: "变量与数据类型", link: "variables-and-data-types" },
            { text: "运算符与流程控制", link: "operators-and-control-flow" },
            { text: "函数", link: "function" },
            { text: "对象", link: "object" },
            { text: "数组", link: "array" },
            { text: "原型与原型链", link: "prototype-and-prototype-chain" },
            { text: "闭包", link: "closure" },
            { text: "作用域", link: "scope" },
            { text: "this关键字", link: "this-keyword" },
            { text: "事件循环与回调", link: "event-loop-and-callback" },
            { text: "JSON对象", link: "json" },
            { text: "BOM", link: "bom" },
            { text: "DOM", link: "dom" },
            { text: "let、const与块级作用域", link: "es6-let-const" },
            { text: "解构赋值", link: "es6-destructuring" },
            { text: "模板字符串", link: "es6-template-literals" },
            { text: "字符串的扩展", link: "es6-string-extensions" },
            { text: "正则的扩展", link: "es6-regex-extensions" },
            { text: "数值的扩展", link: "es6-number-extensions" },
            { text: "数组的扩展", link: "es6-array-extensions" },
            { text: "箭头函数", link: "es6-arrow-functions" },
            { text: "函数的扩展", link: "es6-function-extensions" },
            { text: "对象的扩展", link: "es6-object-extensions" },
            { text: "Symbol", link: "es6-symbol" },
            { text: "类与继承", link: "es6-classes" },
            { text: "Promise", link: "es6-promise" },
            { text: "async/await", link: "es6-async-await" },
            { text: "模块化", link: "es6-module" },
            { text: "Set和Map数据结构", link: "es6-set-map" },
            { text: "Iterator 和 for...of 循环", link: "es6-iterator" },
            { text: "Generator 函数", link: "es6-generator" },
            { text: "Proxy", link: "es6-proxy" },
            { text: "Reflect", link: "es6-reflect" },
            { text: "装饰器", link: "es6-decorator" }
          ]
        },
        { text: "TypeScript", icon: 'proicons:typescript', link: "typescript/" }
      ]
    }
  ]
});
