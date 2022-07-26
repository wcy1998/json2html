/*
 * @Author: your name
 * @Date: 2022-03-29 17:15:59
 * @LastEditTime: 2022-05-31 15:29:31
 * @LastEditors: Wcy1998 cywu3@leqee.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\snippets\index.ts
 */

//这是用于生成模板和相关代码片段的配置 请注意你原有vscode中的 代码片段配置可能会被覆盖
import pkg from 'js-beautify';
const { js_beautify } = pkg;
import { cssSnippets as BaseCssStyleSnippets } from './cssSnippets.js';
import { baseSnippets as BaseFastCodeConfigSnippets } from './baseSnippets.js';
import fs from 'fs';
import path from 'path';

//初始化 代碼片段的配置
export function InitSnippets (
    customSnippetsConfig: Record<string, any>, //自定義的代碼片段配置
    cssTemplateConfig: Record<string, any>, //css模板配置
    htmlTemplateConfig: Record<string, any>, //html模板配置
    snippetsPath: string //修改代碼片段的地址
) {
    const FinalSnippetsConfig: Record<string, any> = Object.create(null);

    let htmlTemplateOptions = '请选择一个html模板,';
    let cssTemplateOptions = '请选择一个css模板,';

    //添加基礎的css樣式提示
    Object.assign(FinalSnippetsConfig, BaseCssStyleSnippets);

    //添加自定义的提示
    Object.assign(FinalSnippetsConfig, customSnippetsConfig);

    //添加css模板提示
    Object.keys(cssTemplateConfig).forEach((key) => {
        cssTemplateOptions += key + ',';
    });

    //添加html模板提示
    Object.keys(htmlTemplateConfig).forEach((key) => {
        htmlTemplateOptions += key + ',';
    });

    //检查代码片段设置文件的路径
    try {
        if (!fs.existsSync(snippetsPath)) {
            console.log('请配置正确的代码片段设置文件路径');
            throw new Error('请配置正确的代码片段设置文件路径');
        }
    } catch (e) {
        console.log('请配置正确的代码片段设置文件路径');
        throw new Error('请配置正确的代码片段设置文件路径');
    }

    FinalSnippetsConfig.template = {
        prefix: '@template',
        body: 'template:"${1|' + htmlTemplateOptions.replace(/,$/, '') + '|}"',
        description: '配置的html模板',
    };

    FinalSnippetsConfig.cssMixin = {
        prefix: '@cssMixin',
        body: 'cssMixin:["${1|' + cssTemplateOptions.replace(/,$/, '') + '|}"]',
        description: '配置的css模板',
    };

    Object.assign(FinalSnippetsConfig, BaseFastCodeConfigSnippets);

    console.log(BaseFastCodeConfigSnippets);
    //输出到指定路径形成代码片段配置
    fs.writeFileSync(path.resolve(path.resolve(snippetsPath, 'typescript.json')), js_beautify(JSON.stringify(FinalSnippetsConfig)), 'utf8');
    fs.writeFileSync(path.resolve(path.resolve(snippetsPath, 'javascript.json')), js_beautify(JSON.stringify(FinalSnippetsConfig)), 'utf8');
    fs.writeFileSync(path.resolve(path.resolve(snippetsPath, 'vue.json')), js_beautify(JSON.stringify(FinalSnippetsConfig)), 'utf8');
}
