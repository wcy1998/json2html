
import { generateCodeByAxiosConfig, parseFile2FastCodeConfig, generateCodeByFastCodeConfig, parseFigma2FastCodeConfig } from './src/index.js'
import { httpConfig } from './json2html.http.config'
import { fastCodeConfig } from './test/json2html2.config.js'
import { htmlTemplateConfig } from './json2html.html.template.js'
import { cssTemplateConfig } from './json2html.css.template.js'
import { snippetsConfig } from './json2html.snippets.config.js'

//快速生成httpaxios配置
if(false){
generateCodeByAxiosConfig(httpConfig)
}



//解析智能生成的代码变成fastCodeConfig
if(false){
parseFile2FastCodeConfig({
    generateFileName: '',
    generateConfigPagePath: '',
    htmlString: '',
    cssString: ''
})
}


//通过fastCodeConfig 生成对应的vue文件
if(false){
generateCodeByFastCodeConfig({
    fastCodeConfig,
    htmlTemplateConfig,
    cssTemplateConfig,
    snippetsConfig,
    updateSnippets: true
});}

//通过figmajson 生成fastcode配置
if(false){
parseFigma2FastCodeConfig(
    {
        isGenerateBindStyle: true,
        htmlTemplateConfig,
        figmaJson: ''
    }
)}
