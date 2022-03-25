/*
 * @Author: your name
 * @Date: 2022-03-24 14:20:53
 * @LastEditTime: 2022-03-25 15:58:20
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\types\vue\config.ts
 */

export interface pagesConfig {
    path: string //单个页面的具体路径
    htmlConfig: htmlConfig //页面的html配置
    cssConfig?: cssConfig //页面的css配置
    jsConfig?: jsConfig //页面的js配置
    children?: Array<pagesConfig>
}

//html相关配置
export interface htmlConfig {
    template?: string
    tag?: string //标签名
    clazz?: string //类名
    ':clazz'?: string //类名
    style?: string //样式名
    text?: string //文本内容
    ':text'?: string
    children?: Array<htmlConfig>
    [propName: string]: any
}

//css相关配置
//eslint-disable-next-line
export interface cssConfig {}

//js相关配置
//eslint-disable-next-line
export interface jsConfig {}

export interface json2htmlConfig {
    frame?: string //框架类型
    base?: string //解析出来的文件放置位置的基础路径
    pagesConfig: Array<pagesConfig> //页面的配置
}
