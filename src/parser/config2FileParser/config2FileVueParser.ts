/*
 * @Author: your name
 * @Date: 2022-04-07 15:24:42
 * @LastEditTime: 2022-05-30 13:28:48
 * @LastEditors: Wcy1998 cywu3@leqee.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\parser\parser\config2FileVueParser.ts
 */

//将配置转换成文件过程的解析器
import Config2FileParser from './config2FileParser.js';
import { FastCodeConfig, HtmlConfig, parsedPagesConfig } from '../../types/vue/index.js';
import { cloneDeep } from 'lodash-es';
import path from 'path';
export default class Config2FileVueParser implements Config2FileParser {
    fastCodeConfig: FastCodeConfig; //用户传入的配置

    templateConfig: Record<string, any>; //用户写的模板配置

    base: string | undefined; //用户配置的根路径

    parsedFastCodeConfig: FastCodeConfig; //经过解析后的配置

    constructor (fastCodeConfig: FastCodeConfig, templateConfig: Record<string, any>) {
        this.fastCodeConfig = fastCodeConfig;

        this.templateConfig = templateConfig;

        this.base = fastCodeConfig?.base;

        let fatherPath = ''; //记录当前的父路径

        const traverse = (pagesConfig: Array<parsedPagesConfig> = [], isRoot: boolean): void => {
            pagesConfig.forEach((page, index) => {
                page.path = isRoot ? path.join(this.base || '', page.path) : path.join(fatherPath, page.path);

                if (index === pagesConfig.length - 1 || isRoot) {
                    fatherPath = page.path;
                }

                const usedCssMixin: Set<any> = new Set();

                //去解析一下html相关的配置 抽出去cssMixin 并将模板的内容进行替换 和 合并 覆盖等操作
                if (page.htmlConfig) {
                    this.parseHtmlConfig([page.htmlConfig], usedCssMixin);
                }
                if (page.children) {
                    traverse(page.children, false);
                }

                page.usedCssMixin = Array.from(usedCssMixin);
            });
        };

        fastCodeConfig && traverse(fastCodeConfig.pagesConfig, true);

        this.parsedFastCodeConfig = fastCodeConfig;
    }

    parseHtmlConfig (htmlConfigs: Array<HtmlConfig> = [], usedCssMixin: Set<any>): void {
        const traverse = (htmlConfigs: Array<HtmlConfig>, usedCssMixin: Set<any>): void => {
            htmlConfigs.forEach((htmlConfig) => {
                //进行template的设置
                if (htmlConfig.template && this.templateConfig[htmlConfig.template]) {
                    //如果当前的dom配置存在template 且模板设置中存在改模板

                    const template = htmlConfig.template; //记录一下当前的template值

                    Reflect.deleteProperty(htmlConfig, 'template'); //将当前的template值删除

                    const oldConfig = cloneDeep(htmlConfig); //并且记录下旧的domConfig

                    let templateConfigCopy = cloneDeep(this.templateConfig[template]); //记录下模板中对应的配置

                    //模板和用户定义的进行合并操作
                    Object.entries(templateConfigCopy).forEach(([key, val]) => {
                        const mergeReg = /^m@/;

                        //当用户想要对模板和 自己写的值进行合并时 就需要加上m@
                        if (mergeReg.test(key) && oldConfig[key.replace(mergeReg, '')]) {
                            //如果当前模板中的值 是以m@ 开头书写的 并且用户定义的配置中存在对应的属性
                            if (key.replace(mergeReg, '') === 'style') {
                                //当这个key是style的时候 将两者写的进行合并
                                oldConfig[key.replace(mergeReg, '')] = oldConfig[key.replace(mergeReg, '')] + ';' + val;
                            } else if (key.replace(mergeReg, '') === 'cssMixin') {
                                //当这个key是cssMixin的时候 将两者写的进行合并
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
                        usedCssMixin?.add(mixin);
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
