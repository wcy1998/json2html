/*
 * @Author: Wcy1998 cywu3@leqee.com
 * @Date: 2022-04-07 15:24:42
 * @LastEditors: Wcy1998 cywu3@leqee.com
 * @LastEditTime: 2022-05-16 16:41:09
 * @FilePath: \json2htmltest\src\parser\config2FileParser\config2FileParser.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
//将配置转换成文件的解析器
import { FastCodeConfig } from '../../types/vue/index.js';
export default interface Config2FileParser {
    parsedFastCodeConfig: FastCodeConfig
    //eslint-disable-next-line
    parseHtmlConfig(htmlConfig: any, usedCssMixin: any): void
    //eslint-disable-next-line
    parseCssConfig(cssConfig: any): void
    //eslint-disable-next-line
    parseJsConfig(jsConfig: any): void
}
