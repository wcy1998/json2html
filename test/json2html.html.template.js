/*
 * @Author: your name
 * @Date: 2022-04-25 15:42:26
 * @LastEditTime: 2022-05-16 10:33:47
 * @LastEditors: Wcy1998 cywu3@leqee.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \fastcode-test\json2html.html.template.js
 */
//这里是 一些组件的模板  因为使用js编写 所以可以进行无限的嵌套 可以去分文件结构去 但是要注意不能重名的样式mixin

export const htmlTemplateConfig = {
    "@columnContainer": {
        tag: "section",
        "m@cssMixin": ['flex-column']
    },

    "@rowContainer": {
        tag: "section",
        "m@cssMixin": ['flex-row']
    },
    "@grid": {
        tag: "section",
        "m@cssMixin": ['grid']
    },
    "@img": {
        tag: "img",
        alt: "暂无图片",
    },
    "@iconfont": {
        tag: "span",
        clazz: "iconfont",
    },
    '@table': {
        tag: "Table",
    },
    '@tableColumns': {
        tag: 'div',
        vFor: "{label,width} in tableColumns",
        ':key': 'label',
        ':style': '{width:`${width}`}',
        'text': "{{label}}",
        "m@cssMixin": ['center']
    },
    '@button': {
        tag: 'lq-button',
    },
    '@label': {
        tag: 'span',
        clazz: 'label',
        "m@cssMixin": ['label']
    },
    '@requiredLabel': {
        tag: 'span',
        clazz: 'required-label',
        "m@cssMixin": ['required-label']
    },
    '@line': {
        tag: 'div',
        clazz:"border-line",
        style: 'height:24px;border: .5px solid #EAECEF;'
    },
    '@scrollLog':{
        tag:'div',
        clazz:'to-top',
        style:'background: #979AA8;opacity: 0.5;height: 42px;width: 42px;border-radius: 50%;position: fixed;right:22px;bottom:70px;cursor: pointer;',
        cssMixin:["center"],
        '@click':'$el.scrollTop = 0',
        children:[{
            template:"@img",
            src:"@/assets/image/reportCenter/scroll.svg"
        }]
    },
    '@pageTitle':{
        "clazz": "pageTitle",
        "style": "width: 90px;height: 26px;color: #19224A;font-size: 18px;line-height: 26px;font-weight: 600;font-family: 'MiSans';",
        "tag": "p",
        "text": "工作表管理"
    },
    '@searchOptions': {
        tag: "section",
        clazz: 'searchOption',
       "m@cssMixin":["flex-column"],
        vFor: '{title,type,list,defaultProps,search,placeholder,basicConfig},idx in searchOptions',
        style: 'margin-right: 16px;margin-bottom: 16px;',
        ":key": 'idx',
        children: [
            {
                tag: 'p',
                clazz: 'optionName',
                style: 'height: 20px;line-height: 20px;color: #6E7386;font-weight: 600;font-size: 12px;margin-bottom: 6px;',
                text: '{{title}}'
            },
            {
                vIf: "type==='select'",
                tag: 'lq-select',
                width: '220px',
                'v-model': 'searchParam[search]',
                ":data-list": '$data[list]',
                ":basic-config": '{...basicConfig,transfer:true}',
                ":default-props": 'defaultProps'
            }, {
                vElseIf: "type==='input'",
                'v-model': 'searchParam[search]',
                ':style': "{width:'220px'}",
                ':placeholder': "placeholder",
                tag: 'Input',
            },
            {
                vElseIf: "type==='time'",
                tag: 'el-date-picker',
                type: "daterange",
                'v-model': '$data[search]',
                size: 'small',
                ':style': "{width:'220px'}",
            }
        ]
    },
}