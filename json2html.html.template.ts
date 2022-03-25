/*
 * @Author: your name
 * @Date: 2022-03-24 15:25:18
 * @LastEditTime: 2022-03-25 15:39:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\json2html.template.ts
 */


export const htmlTemplateConfig = {
    "@columnContainer":{
        tag: "section",
        cssMixin:['flex-column']
    },
    "@rowContainer":{
        tag: "section",
        clazz: 'container', //类名
        style: 'display:flex;flex-direction:row;justify-content:center', //样式名
    },
    "@img":{
        tag: "img",
        clazz: 'container', //类名
        alt: "暂无图片",  
        "bindSrc": "require(`@/assets/image/home/file${1}.svg`)",
        style: 'width:12px;height:12px', //样式名
    },
    "@iconfont":{
        tag: "span",
        clazz: "iconfont",
    }
} 