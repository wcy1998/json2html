/*
 * @Author: your name
 * @Date: 2022-03-24 15:25:18
 * @LastEditTime: 2022-04-25 17:38:31
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\json2html.html.template.ts
 */
//这里是 一些组件的模板  因为使用js编写 所以可以进行无限的嵌套 可以去分文件结构去 但是要注意不能重名的样式mixin

export const htmlTemplateConfig = {
    "@columnContainer":{
        tag: "section",
        "m@cssMixin":['flex-column']
    },
    "@rowContainer":{
        tag: "section",
        "m@cssMixin":['flex-row']
    },
    "@img":{
        tag: "img",
        alt: "暂无图片",  
    },
    "@iconfont":{
        tag: "span",
        clazz: "iconfont",
    },
    "@lq-dialog":{
        tag:'lq-dialog',
        ":visible.sync":"dialogVisible",
        "main-title":"测试弹窗",
        "second-title":"二级标题",
        "width":"400px",
        "@toConfirm":"toConfirm"
    }
}