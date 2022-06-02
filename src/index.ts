/*
 * @Author: Wcy1998 cywu3@leqee.com
 * @Date: 2022-03-22 17:58:52
 * @LastEditors: Wcy1998 cywu3@leqee.com
 * @LastEditTime: 2022-06-02 17:03:15
 * @FilePath: \json2htmltest\src\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { html_beautify, css_beautify, js_beautify } from 'js-beautify';
import VueFactory from './factory/vueFactory';
import { beautifyCompliedResult, JsConfig } from './types/vue';
import { parsedPagesConfig, HtmlConfig, FastCodeConfig } from './types/vue';
import { formSnippetsByTemplates } from './snippets';
import { cloneDeep } from 'lodash';
import { generateDefaultConfig } from './defaultConfig';
import Factory from './factory/factory';
import Complier from './complier/complier';
import Config2FileParser from './parser/config2FileParser/config2FileParser';
import { axiosConfig } from './types/vue';
import { emitAxiosFiles } from './transform-help/vue/http-help';
import { importReg } from './regex';
import fs from 'fs';
import path from 'path';
import process from 'process';
import { fileEmitter } from './transform-help/file-help';
import { mkdir } from './transform-help/file-help';

let factory: Factory, //工厂
    complier: Complier; //编译器

//获取执行当前代码的执行路径
const basePath: string = process.cwd();

//html的代码格式化配置
const htmlBeautifyConfig: js_beautify.HTMLBeautifyOptions = {
    indent_size: 4, //换行缩进
    end_with_newline: true,
    wrap_attributes: 'force-expand-multiline',
    indent_empty_lines: true,
    preserve_newlines: false,
};
//css的代码格式化配置
const cssBeautifyConfig: js_beautify.CSSBeautifyOptions = {
    indent_size: 4, //换行缩进
    end_with_newline: true,
    indent_empty_lines: true,
    preserve_newlines: false,
};
//输出单个文件 是一个异步方法
async function exportToFile (
    filePath: string, //文件的路径
    htmlConfig: HtmlConfig, //当前页面的html配置
    jsConfig: JsConfig, //当前页面的js配置
    usedCssMixin: Array<string>, //当前页面使用的cssMixin
    jsPlugins: Array<any>
): Promise<void> {
    //结合基础路径生成文件的具体路径
    const filepath = path.join(basePath, filePath);

    //将配置转换成要输出的html css js 等
    const { beautifyHtmlCompliedResult, beautifyCssCompliedResult, beautifyJsCompliedResult } = await json2htmlCss(htmlConfig, jsConfig, usedCssMixin, filepath, jsPlugins);

    mkdir(filepath, () => {
        if (fs.existsSync(filepath)) {
            if (htmlConfig) {
                //异步写入文件 如果文件不存在，则创建文件；如果文件存在，则覆盖文件内容；
                fs.writeFileSync(path.join(filepath, 'index.vue'), beautifyHtmlCompliedResult, 'utf8');
            }
            //异步写入文件 如果文件不存在，则创建文件；如果文件存在，则覆盖文件内容；
            //fs.writeFileSync(path.join(filepath, 'index.js'), importString + beautifyJsCompliedResult, 'utf8');
            if (Object.keys(jsConfig).length > 0) {
                fs.readFile(path.join(filepath, 'index.js'), 'utf-8', (err: any, data: any) => {
                    let importString = '';

                    //进行一些import的处理
                    if (data) {
                        const regResult = data.match(importReg);
                        importString = data.substring(0, regResult.index).trimStart();
                        const matchResult: any = importString.match(/(['|"|;].*)import.*"vuex"/s) || importString.match(/\n{0,}import.*"vuex";?/s);
                        if (matchResult && matchResult?.[1]) {
                            importString = importString.slice(0, matchResult.index + matchResult[1].trimEnd().length) + importString.slice(matchResult.index + matchResult[0].length + 1);
                        } else if (matchResult) {
                            importString = importString.slice(matchResult.index + matchResult[0].length);
                        }
                    }

                    //fs.writeFileSync(path.join(filepath, 'index.js'), importString + beautifyJsCompliedResult, 'utf8');
                    fs.writeFileSync(path.join(filepath, 'index.js'), importString + beautifyJsCompliedResult, 'utf8');

                    const matchResult2: any = importString.matchAll(/(import.*.vue['|"];?\n)/g);
                    let preCutLength = 0;

                    for (const matchResult of matchResult2) {
                        importString = importString.slice(0, matchResult.index - preCutLength) + importString.slice(matchResult.index + matchResult[0].length - preCutLength);
                        preCutLength += matchResult[0].length;
                    }
                    //输出缓存文件
                    fileEmitter(path.join(process.cwd(), 'fastCodeCache'), filepath.replace(/\\/g, '-') + '.js', importString + beautifyJsCompliedResult.replace(/components.*fastCode缓存中没有/s, ''));
                });
            }

            //异步写入文件 如果文件不存在，则创建文件；如果文件存在，则覆盖文件内容；
            if (htmlConfig) {
                fs.writeFileSync(path.join(filepath, 'index.scss'), beautifyCssCompliedResult, 'utf8');
            }
        } else {
            //不存在的话就创建
            fs.mkdirSync(path.dirname(filepath));
        }
    });
}
//将配置转换成可以输出的文件
async function json2htmlCss (
    htmlConfig: HtmlConfig, //当前页面的html配置
    jsConfig: JsConfig, //当前页面的js配置
    usedCssMixin: Array<string>, //当前页面使用的cssMixin
    filepath: string, //当前文件的路径
    jsPlugins: Array<any>
): Promise<beautifyCompliedResult> {
    //通过编译器
    const { htmlCompliedResult, cssCompliedResult, jsCompliedResult } = await complier.compile(htmlConfig, jsConfig, usedCssMixin, filepath, jsPlugins);

    //返回美化后的代码
    return {
        beautifyHtmlCompliedResult: html_beautify(
            '<template>' +
                htmlCompliedResult +
                '</template>' +
                `<script>
       export {default} from './index.js' 
       </script>
       <style lang="scss" scoped>
       @import './index.scss'; 
       </style>`,
            htmlBeautifyConfig
        ),
        beautifyCssCompliedResult: css_beautify(cssCompliedResult, cssBeautifyConfig),
        beautifyJsCompliedResult: js_beautify(jsCompliedResult),
    };
}

//输出所有文件
function parseConfigurationGeneratedFiles (
    pageConfig: Array<parsedPagesConfig> | undefined, //解析后的页面相关的配置
    jsPlugins: Array<any> = []
): void {
    if (!pageConfig) {
        throw new Error('没有配置页面文件');
    }
    pageConfig.forEach(
        ({
            path: filePath, //文件路径
            htmlConfig, //当前页面的html配置
            jsConfig = {}, //当前页面的js配置
            children, //当前页面的子页面
            usedCssMixin = [], //当前页面使用的css模板
        }: parsedPagesConfig) => {
            //输出单个文件
            exportToFile(filePath, htmlConfig, jsConfig, usedCssMixin, jsPlugins);

            if (children && children.length > 0) {
                //如果存在子页面继续去输出
                parseConfigurationGeneratedFiles(children, jsPlugins);
            }
        }
    );
}

//生成文件
function generateFile (
    originFastCodeConFig: FastCodeConfig, //用户输入的FastCodeConfig 配置
    htmlTemplateConfig: object, //html相关的模板
    cssTemplateConfig: object, //css相关的模板
    snippetsConfig: object
): void {
    //生成代码片段的配置
    formSnippetsByTemplates(snippetsConfig, cssTemplateConfig, htmlTemplateConfig, originFastCodeConFig.snippetsPath);

    //生成相关的默认配置
    const fastCodeConfig: FastCodeConfig = generateDefaultConfig(originFastCodeConFig);

    //创建一个工厂
    factory = fastCodeConfig.frame === 'vue' ? new VueFactory() : new VueFactory();

    //创建一个解析器 并解析配置
    const parser: Config2FileParser = factory.createParser(fastCodeConfig, htmlTemplateConfig);

    //解析后的配置
    const parsedJson2htmlConfig: FastCodeConfig | undefined = cloneDeep(parser.parsedFastCodeConfig);

    //创建一个编译器 用于生成编译后的要输出的内容
    complier = factory.createComplier(cssTemplateConfig);

    //根据解析后的配置 进行文件的输出
    parseConfigurationGeneratedFiles(parsedJson2htmlConfig?.pagesConfig, parsedJson2htmlConfig?.jsPlugins);
}

//解析智能生成的代码变成fastCodeConfig
function parseFile2FastCodeConfig (pageName: string, pagePath: string, html: string, css: string) {
    factory = new VueFactory();

    const configParser = factory.createConfigParser(html, css, pagePath);

    fs.writeFileSync(path.join(basePath, `${pageName}fastCodeConfig.ts`), js_beautify('export const fastCodeConfig =' + JSON.stringify(configParser.parsedFastCodeConfig)), 'utf8');
}

//生成接口文件
function generateAxiosFiles (axiosConfigs: Array<axiosConfig>) {
    emitAxiosFiles(axiosConfigs);
}

export {
    generateFile, //生成文件
    parseFile2FastCodeConfig, //解析智能生成的代码变成fastCodeConfig
    generateAxiosFiles, //生成接口文件
};
