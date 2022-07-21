//類型
import { CssConfig, parsedPagesConfig, HtmlConfig, FastCodeConfig, beautifyCompliedResult, JsConfig } from './types/vue';

//工廠相關
import VueFactory from './factory/vueFactory';
import Factory from './factory/factory';
import Complier from './complier/complier';
import Config2FileParser from './parser/config2FileParser/config2FileParser';

//第三方
import fs from 'fs';
import path from 'path';
import process from 'process';
import { cloneDeep } from 'lodash-es';
import { html_beautify, css_beautify, js_beautify } from 'js-beautify';

//代碼片段初始化
import { InitSnippets } from './snippets';

//生成默認fastCode配置
import { generateDefaultConfig } from './defaultConfig';

//正則
import { importReg } from './regex';

//一些轉換的方法
import { fileEmitter, mkdir } from './file-help';

import { htmlBeautifyConfig, cssBeautifyConfig } from '../src/config/jsBeautyConfig';

//获取执行当前代码的执行路径
const basePath: string = process.cwd();

let factory: Factory, //工厂
    complier: Complier; //编译器

//生成文件
export function generateCodeByFastCodeConfig (
    originFastCodeConFig: FastCodeConfig, //用户输入的FastCodeConfig 配置
    htmlTemplateConfig: Record<string, any>, //html相关的模板
    cssTemplateConfig: Record<string, any>, //css相关的模板
    snippetsConfig: Record<string, any> //用户定义的代码片段配置
): void {
    //生成代码片段的配置
    InitSnippets(snippetsConfig, cssTemplateConfig, htmlTemplateConfig, originFastCodeConFig.snippetsPath);

    //生成相关的默认配置
    const FastCodeConfig: FastCodeConfig = generateDefaultConfig(originFastCodeConFig);

    //创建一个工厂
    factory = FastCodeConfig.frame === 'vue' ? new VueFactory() : new VueFactory();

    //创建一个解析器 并解析配置
    const Parser: Config2FileParser = factory.createParser(FastCodeConfig, htmlTemplateConfig);

    //解析后的配置
    const ParsedJson2htmlConfig: FastCodeConfig | undefined = cloneDeep(Parser.parsedFastCodeConfig);

    //创建一个编译器 用于生成编译后的要输出的内容
    complier = factory.createComplier(cssTemplateConfig);

    //根据解析后的配置 进行文件的输出
    generateFilesByParsedConfigs(ParsedJson2htmlConfig?.pagesConfig, ParsedJson2htmlConfig?.jsPlugins);
}

//通过解析后重新生成的配置输出文件
function generateFilesByParsedConfigs (
    pageConfig: Array<parsedPagesConfig> | undefined, //解析后的页面相关的配置
    jsPlugins: Array<any> = [] //用户自定义的js解析插件
): void {
    if (!pageConfig) {
        throw new Error('没有配置页面文件');
    }
    pageConfig.forEach(
        ({
            path: filePath, //文件路径
            htmlConfig, //当前页面的html配置
            jsConfig = {}, //当前页面的js配置
            cssConfig = {}, //当前页面的css配置
            children, //当前页面的子页面
            usedCssMixin = [], //当前页面使用的css模板
        }: parsedPagesConfig) => {
            //输出单个文件
            generateFileByConfig(filePath, htmlConfig, jsConfig, usedCssMixin, jsPlugins, cssConfig);

            if (children && children.length > 0) {
                //如果存在子页面继续去输出
                generateFilesByParsedConfigs(children, jsPlugins);
            }
        }
    );
}

//输出单个文件 是一个异步方法
async function generateFileByConfig (
    filePath: string, //文件的路径
    htmlConfig: HtmlConfig, //当前页面的html配置
    jsConfig: JsConfig, //当前页面的js配置
    usedCssMixin: Array<string>, //当前页面使用的cssMixin
    jsPlugins: Array<any>, //js插件配置
    cssConfig: CssConfig //css配置
): Promise<void> {
    //结合基础路径生成文件的具体路径
    const filepath = path.join(basePath, filePath);

    //将配置转换成要输出的html css js 等
    const { beautifyHtmlCompliedResult, beautifyCssCompliedResult, beautifyJsCompliedResult } = await transformConfig2Code(htmlConfig, jsConfig, usedCssMixin, filepath, jsPlugins, cssConfig);

    mkdir(filepath, () => {
        if (fs.existsSync(filepath)) {
            if (htmlConfig) {
                //异步写入文件 如果文件不存在，则创建文件；如果文件存在，则覆盖文件内容；
                fs.writeFileSync(path.join(filepath, 'index.vue'), beautifyHtmlCompliedResult, 'utf8');
            }

            //异步写入文件 如果文件不存在，则创建文件；如果文件存在，则覆盖文件内容；
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
async function transformConfig2Code (
    htmlConfig: HtmlConfig, //当前页面的html配置
    jsConfig: JsConfig, //当前页面的js配置
    usedCssMixin: Array<string>, //当前页面使用的cssMixin
    filepath: string, //当前文件的路径
    jsPlugins: Array<any>,
    cssConfig: CssConfig
): Promise<beautifyCompliedResult> {
    const { transferClass } = cssConfig;
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
       </style>
       ${
           transferClass
               ? `<style lang="scss">
       @import './transfer.scss'; 
       </style>`
               : ''
       }
       `,
            htmlBeautifyConfig
        ),
        beautifyCssCompliedResult: css_beautify(cssCompliedResult, cssBeautifyConfig),
        beautifyJsCompliedResult: js_beautify(jsCompliedResult),
    };
}
