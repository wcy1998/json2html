/*
 * @Author: your name
 * @Date: 2022-03-24 11:38:12
 * @LastEditTime: 2022-03-25 15:23:26
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\json2html.config.ts
 */
import { json2htmlConfig } from './src/types/vue/config'

export const json2htmlCfg: json2htmlConfig = {
    frame: 'vue',
    base: '',
    pagesConfig: [
        {
            path: 'src/test/component1',
            htmlConfig: {
                template: '@columnContainer',
                clazz:"container",
                style:"width:100px",
                "@click":'onclick',
                bindStyle:"{width:'12px'}",
                cssMixin:['flex-column']
            }
        },
    ]
} 