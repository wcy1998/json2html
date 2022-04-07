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
    }
}