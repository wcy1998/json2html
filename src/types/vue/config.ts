/*
 * @Author: your name
 * @Date: 2022-03-24 14:20:53
 * @LastEditTime: 2022-04-25 19:42:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\types\vue\config.ts
 */

export interface PagesConfig {
    path: string //单个页面的具体路径
    usedCssMixin?: Array<string>
    htmlConfig: HtmlConfig //页面的html配置
    cssConfig?: CssConfig //页面的css配置
    jsConfig?: JsConfig //页面的js配置
    children?: Array<PagesConfig>
}

//html相关配置
export interface HtmlConfig {
    template?: string
    tag?: string //标签名
    clazz?: string //类名
    ':clazz'?: string //类名
    children?: Array<HtmlConfig>
    [propName: string]: any
}

//css相关配置
//eslint-disable-next-line
export interface CssConfig {}

//js相关配置
export interface JsConfig {
    name?: string //组件名
    props?: object
    data?: object
    ndata?: object //没有响应性的变量
    getList?: Array<object>
    methods?: object
}

export interface FastCodeConfig {
    frame?: string //要转换的语言类型框架类型

    snippetsPath: string //代码片段设置路径 这个是必传的

    base?: string //解析出来的文件放置位置的基础路径

    mixinCss?: boolean //是否开启抽取css的相关功能

    pagesConfig: Array<PagesConfig> //页面的配置
}

//axios配置 用于生成axios相关文件
export interface axiosConfig {
    url: string //接口路径
    type: 'post' | 'get' //接口方式
    mark?: string //注释
}
