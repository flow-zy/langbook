import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/categories/frontend/web/": [
    {
      text: "Web 前端开发",
      icon: "arcticons:es-de-frontend",
      prefix: "/categories/frontend/web/",
      children: [
        { text: "HTML",icon:'picon:html', link: "html/" },
        { text: "CSS",icon:'fa7-brands:css', link: "css/" },  
        { text: "JavaScript",icon:'ri:javascript-line', link: "javascript/" },
        { text: "TypeScript",icon:'proicons:typescript', link: "typescript/" }
      ]
    }
  ]
});
