/*
 * @Author: your name
 * @Date: 2022-03-24 13:48:15
 * @LastEditTime: 2022-04-02 14:42:33
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\factory\factory.ts
 */

export default interface Factory {
    //eslint-disable-next-line
    createParser(htmlConfig: any, templateConfig: any): any

    //eslint-disable-next-line
    createComplier(cssTemplateConfig: object): any

    //eslint-disable-next-line
    createConfigParser(html: string, css: string, pagePath: string): any

    //eslint-disable-next-line
    createFigmaParser(): any
}
