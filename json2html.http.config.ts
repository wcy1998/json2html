/*
 * @Author: your name
 * @Date: 2022-04-25 10:09:48
 * @LastEditTime: 2022-04-25 10:11:56
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\json2html.http.config.ts
 */
import { axiosConfig } from './src/types/vue/config'
export const httpConfig: Array<axiosConfig> = [
    {
        url: '/easybi/report/worksheet/oneClickGenerate',
        type: 'post',
        mark:'一键生成工作表'
    },
    {
        url: '/easybi/report/worksheet/list',
        type: 'post',
        mark:'获取工作表列表'
    },
    {
        url: '/easybi/report/worksheet/delete',
        type: 'post',
        mark:'删除工作表'
    }
]

