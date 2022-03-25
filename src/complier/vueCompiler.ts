/*
 * @Author: your name
 * @Date: 2022-03-24 13:32:18
 * @LastEditTime: 2022-03-25 15:21:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\complier\vueCompiler.ts
 */
import Complier from './complier';

import { htmlConfig } from '../types/vue/config';
import { compileResult } from '../types/vue/result';
import { json2htmlNode, json2css } from '../transform-help/index';

export default class VueComplier implements Complier {
    cssTemplateConfig: object;
    constructor (cssTemplateConfig: object) {
        this.cssTemplateConfig = cssTemplateConfig;
    }

    compile (htmlConfig: htmlConfig): compileResult {
        const cssCompliedResult: string = json2css(htmlConfig, this.cssTemplateConfig, true);
        const htmlCompliedResult: string = json2htmlNode(htmlConfig);
        return {
            htmlCompliedResult,
            cssCompliedResult,
        };
    }
}
