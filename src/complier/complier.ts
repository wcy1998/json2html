/*
 * @Author: your name
 * @Date: 2022-03-25 15:59:12
 * @LastEditTime: 2022-05-30 15:52:32
 * @LastEditors: Wcy1998 cywu3@leqee.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\complier\complier.ts
 */
import { compileResult, JsConfig, HtmlConfig } from '../types/vue/index.js';
export default interface Complier {
    //eslint-disable-next-line
    compile(htmlConfig: HtmlConfig, jsConfig: JsConfig, usedCssMixin: any, filepath: string, jsPlugins: any): Promise<compileResult>
}
