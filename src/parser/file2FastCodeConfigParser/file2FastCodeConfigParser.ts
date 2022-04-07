/*
 * @Author: your name
 * @Date: 2022-04-02 11:55:02
 * @LastEditTime: 2022-04-07 14:14:10
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\parser\file2FastCodeConfigParser\configParser.ts
 */
export default interface File2FastCodeConfigParser {
    transformFile2Config(html: string, css: string, pagePath: string): any
}
