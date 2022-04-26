/*
 * @Author: your name
 * @Date: 2022-04-25 11:41:25
 * @LastEditTime: 2022-04-25 19:55:20
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\index.js
 */
import { generateAxiosFiles, parseFile2FastCodeConfig, generateFile } from './src/index'
import { httpConfig } from './json2html.http.config'
import { fastCodeConfig } from './test/json2html2.config'
import { htmlTemplateConfig } from './json2html.html.template'
import { cssTemplateConfig } from './json2html.css.template'
const fs = require('fs')
const path = require('path')
//generateAxiosFiles(httpConfig)

//解析智能生成的代码变成fastCodeConfig
//parseFile2FastCodeConfig('test1','test1')

//通过fastCodeConfig 生成对应的vue文件
generateFile(fastCodeConfig, htmlTemplateConfig, cssTemplateConfig);

/* fs.readFile(path.resolve(process.cwd(), 'src/json2html/test1/index.vue'), 'utf-8', (err: Error, data: any) => {
    import('./json2html.html.template').then(res => {
        console.log(res)
    })

}) */