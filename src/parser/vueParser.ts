/*
 * @Author: your name
 * @Date: 2022-03-24 13:45:51
 * @LastEditTime: 2022-03-25 15:19:24
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\parser\vueParser.ts
 */

import Parser from './parser';
import { json2htmlConfig, htmlConfig, pagesConfig } from '../types/vue/config';
import cloneDeep from 'lodash/cloneDeep';
export default class VueParser implements Parser {
    json2htmlConfig: json2htmlConfig;
    templateConfig: any;
    base: string | undefined;
    parsedJson2htmlConfig: json2htmlConfig;
    constructor (json2htmlConfig: json2htmlConfig, templateConfig: object) {
        this.json2htmlConfig = json2htmlConfig;
        this.templateConfig = templateConfig;
        this.base = json2htmlConfig.base;
        const traverse = (pagesConfig: Array<pagesConfig>): void => {
            pagesConfig.forEach((page) => {
                page.path = this.base + page.path;
                this.parseHtmlConfig([page.htmlConfig]);
                if (page.children) {
                    traverse(page.children);
                }
            });
        };
        traverse(json2htmlConfig.pagesConfig);
        this.parsedJson2htmlConfig = json2htmlConfig;
    }
    parseHtmlConfig (htmlConfigs: Array<htmlConfig>): void {
        const traverse = (htmlConfigs: Array<htmlConfig>): void => {
            htmlConfigs.forEach((htmlConfig) => {
                //进行template的设置
                if (htmlConfig.template && this.templateConfig[htmlConfig.template]) {
                    const template = htmlConfig.template;
                    Reflect.deleteProperty(htmlConfig, 'template');
                    const oldConfig = cloneDeep(htmlConfig);
                    const templateConfigCopy = cloneDeep(this.templateConfig[template]);
                    Object.entries(templateConfigCopy).forEach(([key, val]) => {
                        const mergeReg = /^m@/;
                        if (mergeReg.test(key) && oldConfig[key.replace(mergeReg, '')] && key.replace(mergeReg, '') === 'style') {
                            oldConfig[key.replace(mergeReg, '')] = oldConfig[key.replace(mergeReg, '')] + ';' + val;
                            Reflect.deleteProperty(templateConfigCopy, key);
                        }
                    });
                    Object.assign(htmlConfig, templateConfigCopy, oldConfig);
                    if (htmlConfig.children) {
                        traverse(htmlConfig.children);
                    }
                }
            });
        };
        traverse(htmlConfigs);
    }
    parseCssConfig (): any {
        return {};
    }
    parseJsConfig (): htmlConfig {
        return {};
    }
}
