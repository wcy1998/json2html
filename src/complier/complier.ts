/*
 * @Author: your name
 * @Date: 2022-03-25 15:59:12
 * @LastEditTime: 2022-04-01 11:45:31
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\complier\complier.ts
 */
import { compileResult } from '../types/vue';
export default interface Complier {
    //eslint-disable-next-line
    compile(htmlConfig: any, usedCssMixin: any): compileResult
}
