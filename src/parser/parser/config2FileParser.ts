/*
 * @Author: your name
 * @Date: 2022-03-20 15:36:45
 * @LastEditTime: 2022-04-07 14:14:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2html\src\parser.ts
 */

export default interface Config2FileParser {
    //eslint-disable-next-line
    parseHtmlConfig(htmlConfig: any, usedCssMixin: any): void
    //eslint-disable-next-line
    parseCssConfig(cssConfig: any): void
    //eslint-disable-next-line
    parseJsConfig(jsConfig: any): void
}
