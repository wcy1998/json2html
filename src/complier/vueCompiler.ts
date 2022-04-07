/*
 * @Author: your name
 * @Date: 2022-03-24 13:32:18
 * @LastEditTime: 2022-04-02 11:48:37
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\complier\vueCompiler.ts
 */
import Complier from './complier';

import { HtmlConfig } from '../types/vue';
import { compileResult } from '../types/vue';
import { json2htmlNode, json2css } from '../transform-help/vue/index';

export default class VueComplier implements Complier {
    cssTemplateConfig: object;
    constructor (cssTemplateConfig: object) {
        this.cssTemplateConfig = cssTemplateConfig;
    }

    public compile (htmlConfig: HtmlConfig, usedCssMixin: Array<string>): compileResult {
        const cssCompliedResult: string = json2css(htmlConfig, this.cssTemplateConfig, true, usedCssMixin);
        const htmlCompliedResult: string = json2htmlNode(htmlConfig);
        return {
            htmlCompliedResult,
            cssCompliedResult,
        };
    }
}
