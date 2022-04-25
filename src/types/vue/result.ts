/*
 * @Author: your name
 * @Date: 2022-03-24 14:23:29
 * @LastEditTime: 2022-04-25 14:33:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\types\vue\result.ts
 */
export interface beautifyCompliedResult {
    beautifyHtmlCompliedResult: string
    beautifyCssCompliedResult: string
    beautifyJsCompliedResult: string
}
export interface compileResult {
    htmlCompliedResult: string
    cssCompliedResult: string
    jsCompliedResult: string
}
export interface parsedHtmlConfig {
    tag: string //标签名
    clazz?: string //类名
    ':clazz'?: string //类名
    style?: string //样式名
    text?: string //文本内容
    ':text'?: string
    children?: Array<parsedHtmlConfig>
    [propName: string]: any
}
/* export interface parsedCssConfig{
  
} */
/* export interface parsedJsConfig{
  
} */
