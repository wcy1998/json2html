/*
 * @Author: your name
 * @Date: 2022-03-24 13:38:46
 * @LastEditTime: 2022-05-25 15:58:04
 * @LastEditors: Wcy1998 cywu3@leqee.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\types\index.ts
 */

export { PagesConfig, HtmlConfig, CssConfig, JsConfig, FastCodeConfig, axiosConfig, parsedPagesConfig, MutationsConfig, GetListConfig } from './config';
export { beautifyCompliedResult, compileResult, parsedHtmlConfig } from './result';

export interface components {
    [propName: string]: VueOptions
}

export interface Props {
    [propName: string]: {
        type: any
        default: any
    }
}

export interface VueFileInfo {
    default?: VueOptions
}

export interface VueOptions {
    name?: string
    components?: components
    mixins?: Array<VueOptions>
    props?: Props
    data?: () => Record<string, any> | Record<string, any>
    watch?: Record<string, any>
    computed?: Record<string, any>
    methods?: Record<string, any>
    provide?: Record<string, any>
    injects?: Array<any>
    beforeCreated?: () => void
    created?: () => void
    beforeMount?: () => void
    mounted?: () => void
    beforeUpdate?: () => void
    updated?: () => void
    activated?: () => void
    deactivated?: () => void
    beforeDestroy?: () => void
    destroyed?: () => void
    errorCaptured?: () => void
}

export interface StoreFileInfo {
    default?: StoreOptions
}
export interface StoreOptions {
    namespaced?: boolean
    state?: Record<string, any>
    getters?: Record<string, any>
    mutations?: Record<string, any>
    actions?: Record<string, any>
}
