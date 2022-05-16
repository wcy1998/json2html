/*
 * @Author: your name
 * @Date: 2022-04-25 15:41:17
 * @LastEditTime: 2022-05-11 16:30:58
 * @LastEditors: Wcy1998 cywu3@leqee.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \fastcode-test\index.js
 */

import { generateAxiosFiles, parseFile2FastCodeConfig, generateFile } from 'json2html-wcy/dist/index.esm.js'
import { httpConfig } from './json2html.http.config.js'
import { fastCodeConfig } from './json2html2.config.js'
import { htmlTemplateConfig } from './json2html.html.template.js'
import { cssTemplateConfig } from './json2html.css.template.js'

//generateAxiosFiles(httpConfig)

//解析智能生成的代码变成fastCodeConfig
//parseFile2FastCodeConfig('test1','test1')

//通过fastCodeConfig 生成对应的vue文件
generateFile(fastCodeConfig, htmlTemplateConfig, cssTemplateConfig);

