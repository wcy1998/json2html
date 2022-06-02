
import { generateAxiosFiles, parseFile2FastCodeConfig, generateFile } from './src/index'
import { httpConfig } from './json2html.http.config'
import { fastCodeConfig } from './test/json2html2.config'
import { htmlTemplateConfig } from './json2html.html.template'
import { cssTemplateConfig } from './json2html.css.template'
import {snippetsConfig} from './json2html.snippets.config'

//generateAxiosFiles(httpConfig)

//解析智能生成的代码变成fastCodeConfig
//parseFile2FastCodeConfig('test1','test1','','')

//通过fastCodeConfig 生成对应的vue文件s
generateFile(fastCodeConfig, htmlTemplateConfig, cssTemplateConfig,snippetsConfig);


