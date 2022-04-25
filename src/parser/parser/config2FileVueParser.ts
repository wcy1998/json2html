/*
 * @Author: your name
 * @Date: 2022-04-07 15:24:42
 * @LastEditTime: 2022-04-25 16:52:14
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\parser\parser\config2FileVueParser.ts
 */
//将配置转换成文件过程的解析器
import Config2FileParser from './config2FileParser';
import { FastCodeConfig, HtmlConfig, PagesConfig } from '../../types/vue';
import cloneDeep from 'lodash/cloneDeep';
//eslint-disable-next-line
import path from 'path'
export default class Config2FileVueParser implements Config2FileParser {
    fastCodeConfig: FastCodeConfig; //用户传入的配置

    templateConfig: any; //用户写的模板配置

    base: string | undefined; //用户配置的根路径

    parsedFastCodeConfig: FastCodeConfig; //经过解析后的配置

    constructor (fastCodeConfig: FastCodeConfig, templateConfig: object) {
        this.fastCodeConfig = fastCodeConfig;
        this.templateConfig = templateConfig;
        this.base = fastCodeConfig.base;
        let fatherPath = '';

        const traverse = (pagesConfig: Array<PagesConfig>, isRoot: boolean): void => {
            pagesConfig.forEach((page) => {
                page.path = isRoot ? path.join(this.base || '', page.path) : path.join(fatherPath, page.path);
                fatherPath = page.path;
                const usedCssMixin: Set<any> = new Set();
                this.parseHtmlConfig([page.htmlConfig], usedCssMixin);
                if (page.children) {
                    traverse(page.children, false);
                }
                page.usedCssMixin = Array.from(usedCssMixin);
            });
        };
        traverse(fastCodeConfig.pagesConfig, true);
        this.parsedFastCodeConfig = fastCodeConfig;
    }
    parseHtmlConfig (htmlConfigs: Array<HtmlConfig>, usedCssMixin: Set<any>): void {
        const traverse = (htmlConfigs: Array<HtmlConfig>, usedCssMixin: Set<any>): void => {
            htmlConfigs.forEach((htmlConfig) => {
                //进行template的设置
                if (htmlConfig.template && this.templateConfig[htmlConfig.template]) {
                    const template = htmlConfig.template;
                    Reflect.deleteProperty(htmlConfig, 'template');
                    const oldConfig = cloneDeep(htmlConfig);
                    let templateConfigCopy = cloneDeep(this.templateConfig[template]);

                    //模板和用户定义的进行合并操作
                    Object.entries(templateConfigCopy).forEach(([key, val]) => {
                        const mergeReg = /^m@/;
                        if (mergeReg.test(key) && oldConfig[key.replace(mergeReg, '')]) {
                            if (key.replace(mergeReg, '') === 'style') {
                                oldConfig[key.replace(mergeReg, '')] = oldConfig[key.replace(mergeReg, '')] + ';' + val;
                            } else if (key.replace(mergeReg, '') === 'cssMixin') {
                                oldConfig[key.replace(mergeReg, '')] = oldConfig[key.replace(mergeReg, '')].concat(val);
                            }
                            Reflect.deleteProperty(templateConfigCopy, key);
                        }
                        const keyReg = new RegExp(`${key}`);
                        templateConfigCopy = JSON.parse(JSON.stringify(templateConfigCopy).replace(keyReg, key.replace(mergeReg, '')));
                    });
                    Object.assign(htmlConfig, templateConfigCopy, oldConfig);
                }
                if (htmlConfig.cssMixin) {
                    htmlConfig.cssMixin.forEach((mixin: any) => {
                        usedCssMixin.add(mixin);
                    });
                }
                if (htmlConfig.children) {
                    traverse(htmlConfig.children, usedCssMixin);
                }
            });
        };
        traverse(htmlConfigs, usedCssMixin);
    }
    parseCssConfig (): any {
        return {};
    }
    parseJsConfig (): HtmlConfig {
        return {};
    }
}
