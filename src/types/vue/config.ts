/*
 * @Author: your name
 * @Date: 2022-03-24 14:20:53
 * @LastEditTime: 2022-05-25 17:32:46
 * @LastEditors: Wcy1998 cywu3@leqee.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\types\vue\config.ts
 */

//解析前的page【诶之
export interface PagesConfig {
    path: string //单个页面的具体路径
    htmlConfig: HtmlConfig //页面的html配置
    cssConfig?: CssConfig //页面的css配置
    jsConfig?: JsConfig //页面的js配置
    children?: Array<PagesConfig> //子页面
}
//解析后的page配置
export interface parsedPagesConfig extends PagesConfig {
    usedCssMixin?: Array<string> //当前页面使用的cssMixin
}

//html相关配置
export interface HtmlConfig {
    template?: string //当前html使用的模板
    tag?: string //标签名  也是 组件名
    clazz?: string //类名 如果直接写class会出现一些问题
    children?: Array<HtmlConfig> //子dom
    [propName: string]: any //其他的属性都当做是vue中的写法
}

//css相关配置
//eslint-disable-next-line
export interface CssConfig {}

//js相关配置
export interface JsConfig {
    name?: string //组件名
    components?: Array<string> //组件注册的组件
    mixins?: Array<string> //组件的mixins
    props?: Record<string, any> //组件的props
    data?: Record<string, any> //组件的data
    ndata?: Record<string, any> //没有响应性的变量
    getList?: Array<GetListConfig> //组件请求列表的配置
    methods?: Record<string, any> //组件的方法
    watchToGetList?: Array<Record<string, any>> //通过watch去刷新的列表
    computed?: Record<string, any> //组件的计算属性
    watch?: Record<string, any> //组件的侦听属性
    beforeCreate?: () => void //生命周期钩子
    beforeMount?: () => void //生命周期钩子
    created?: () => void //生命周期钩子
    mounted?: () => void //生命周期钩子
    beforeUpdate?: () => void //生命周期钩子
    updated?: () => void //生命周期钩子
    destroyed?: () => void //生命周期钩子
    beforeDestroy?: () => void //生命周期钩子
    mutations?: Array<MutationsConfig> //当前组件使用的 mutations
    states?: Array<StatesConfig> //当前组件使用的 states
}

//获取列表信息的配置
export interface GetListConfig {
    axios: string //当前请求的接口
    params?: object | string //请求的参数
    list: string //结果存储的对象
    total: boolean //是否有total信息
    pageChange?: {
        // 配置了pageChange 就会去字段生成pageChange的方法
        query?: boolean //get改变时去调用方法
        param?: any
    }
    watch?: string //当前列表在什么值改变后重新获取
    loading?: boolean
}
export interface StatesConfig {
    store: string
    data: Array<string>
}
export interface MutationsConfig {
    store: string
    data: object
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
