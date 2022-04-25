/*
 * @Author: your name
 * @Date: 2022-03-29 17:15:59
 * @LastEditTime: 2022-04-25 16:50:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\snippets\index.ts
 */

//这是用于生成模板和相关代码片段的配置 请注意你原有vscode中的 代码片段配置可能会被覆盖
import { js_beautify } from 'js-beautify';
import { cssSnippets } from './cssSnippets';
import { baseSnippets } from './baseSnippets';
//eslint-disable-next-line
import fs from 'fs'
//eslint-disable-next-line
import path from 'path'

//通过配置模板文件生成响应的代码片段提示
export function formSnippetsByTemplates (cssTemplateConfig: object, htmlTemplateConfig: object, snippetsPath: string) {
    const snippetsConfigs: any = Object.create(null);

    let htmlTemplates = '';

    let cssTemplates = '';

    //添加css提示
    Object.assign(snippetsConfigs, cssSnippets);

    //添加css模板提示
    Object.keys(cssTemplateConfig).forEach((key) => {
        cssTemplates += key + ',';
        snippetsConfigs[`json2html-template-css@${key}`] = {
            prefix: `@${key}`,
            body: [key],
            description: 'description',
        };
    });

    //添加html模板提示
    Object.keys(htmlTemplateConfig).forEach((key) => {
        htmlTemplates += key + ',';
        snippetsConfigs[`json2html-template-html${key}`] = {
            prefix: key,
            body: key,
            description: 'description',
        };
    });

    //检查代码片段设置文件的路径
    if (!fs.existsSync(snippetsPath)) {
        console.log('请配置正确的代码片段设置文件路径');
        throw new Error('请配置正确的代码片段设置文件路径');
    }

    snippetsConfigs.template = {
        prefix: '@template',
        body: 'template:"${1|' + htmlTemplates.replace(/,$/, '') + '|}"',
        description: '生成json2html总体配置',
    };

    snippetsConfigs.cssMixin = {
        prefix: '@cssMixin',
        body: 'cssMixin:["${1|' + cssTemplates.replace(/,$/, '') + '|}"]',
        description: '生成json2html总体配置',
    };

    const tsSnippetsPath: string = path.resolve(snippetsPath, 'typescript.json');
    const jsSnippetsPath: string = path.resolve(snippetsPath, 'javascript.json');

    Object.assign(snippetsConfigs, baseSnippets);

    //输出到指定路径形成代码片段配置
    fs.writeFileSync(path.resolve(tsSnippetsPath), js_beautify(JSON.stringify(snippetsConfigs)), 'utf8');
    fs.writeFileSync(path.resolve(jsSnippetsPath), js_beautify(JSON.stringify(snippetsConfigs)), 'utf8');
}
