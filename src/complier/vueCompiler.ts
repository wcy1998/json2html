/*
 * @Author: your name
 * @Date: 2022-03-24 13:32:18
 * @LastEditTime: 2022-05-30 14:07:35
 * @LastEditors: Wcy1998 cywu3@leqee.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\complier\vueCompiler.ts
 */
import Complier from './complier';

import { HtmlConfig, JsConfig } from '../types/vue';
import { compileResult } from '../types/vue';
import { json2htmlNode, json2css, json2Js } from '../transform-help/vue/index';

export default class VueComplier implements Complier {
    cssTemplateConfig: Record<string, any>;

    constructor (cssTemplateConfig: Record<string, any>) {
        //保存下当前的css模板配置
        this.cssTemplateConfig = cssTemplateConfig;
    }

    //将配置转换成代码
    public async compile (htmlConfig: HtmlConfig, jsConfig: JsConfig, usedCssMixin: Array<string>, filepath: string, jsPlugins: Array<any>): Promise<compileResult> {
        const cssCompliedResult: string = json2css(htmlConfig, this.cssTemplateConfig, true, usedCssMixin);
        const htmlCompliedResult: string = json2htmlNode(htmlConfig);
        const jsCompliedResult: string = await json2Js(jsConfig, filepath, jsPlugins);
        return {
            htmlCompliedResult,
            cssCompliedResult,
            jsCompliedResult,
        };
    }
}
