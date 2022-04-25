/*
 * @Author: your name
 * @Date: 2022-03-25 15:59:12
 * @LastEditTime: 2022-04-25 15:05:11
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\complier\complier.ts
 */
import { compileResult, JsConfig } from '../types/vue';
export default interface Complier {
    //eslint-disable-next-line
    compile(htmlConfig: any, jsConfig: JsConfig, usedCssMixin: any, filepath: string): Promise<compileResult>
}
