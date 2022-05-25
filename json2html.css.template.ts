/*
 * @Author: your name
 * @Date: 2022-03-25 13:16:29
 * @LastEditTime: 2022-05-17 16:18:53
 * @LastEditors: Wcy1998 cywu3@leqee.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\json2html.css.template.ts
 */

//这里是 一些样式的mixin  因为使用js编写 所以可以进行无限的嵌套 可以去分文件结构去 但是要注意不能重名设置模板


export const cssTemplateConfig = {
    "flex-column": {
        display: "flex",
        'flex-direction': 'column',
    },
    "flex-row": {
        display: "flex",
        'flex-direction': 'row',
        'align-items': 'center'
    },
    "center":{
        display: "flex",
        'justify-content': 'center',
        'align-items': 'center'
    },
    "no-scroll":{
        "&":`::-webkit-scrollbar,::-webkit-scrollbar-track,::-webkit-scrollbar-thumb{
            display:none
        }`  
    },
    "one-line-ellipsis":{
        overflow:'hidden',
        'text-overflow':'ellipsis',
        'white-space':'nowrap'
    },
    "two-line-ellipsis":{
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        'display': '-webkit-box',
        '-webkit-line-clamp': 2,
        'line-clamp': 2,
        '-webkit-box-orient': 'vertical',
        'word-wrap': 'break-word'
    },
    "left-img":{
        width:'10px',
        height:'10px',
        cursor:'pointer'
    },
    'grid':{
        display:'grid'
    },
    "label":{
        'font-weight': 500,
        'font-size': '12px',
        color: '#19224A',
        'font-family': "PingFang SC",
    },
    "required-label":{
        "&":`:before{
            content:'*';
            font-size: '12px';
            font-weight: 500;
            letter-spacing: '0.1875px';
            font-family: "PingFang SC";
            color:red;
        }`,
        'font-weight': 500,
        'font-size': '12px',
        color: '#19224A',
        'letter-spacing': '0.1875px',
        'font-family': "PingFang SC",
    },


} 