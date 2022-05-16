/*
 * @Author: your name
 * @Date: 2022-04-25 10:09:48
 * @LastEditTime: 2022-05-11 16:30:18
 * @LastEditors: Wcy1998 cywu3@leqee.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\json2html.http.config.ts
 */

export const httpConfig = [
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
    },
    {
        url: '/easybi/report/classify/list',
        type: 'post',
        mark:'报表分类查询'
    },
    {
        url: '/easybi/report/classify/add',
        type: 'post',
        mark:'报表分类增加'
    },
    {
        url: '/easybi/report/classify/delete',
        type: 'post',
        mark:'报表分类删除'
    },
    {
        url: '/easybi/report/list',
        type: 'post',
        mark:'报表查询'
    },
    {
        url: '/easybi/report/add',
        type: 'post',
        mark:'报表添加'
    },
    {
        url: '/easybi/report/get',
        type: 'post',
        mark:'报表详情'
    },
    {
        url: '/easybi/report/edit',
        type: 'post',
        mark:'报表编辑'
    },
    {
        url: '/easybi/report/on',
        type: 'post',
        mark:'报表启用'
    },
    {
        url: '/easybi/report/off',
        type: 'post',
        mark:'报表停用'
    },
    {
        url: '/easybi/report/periodTask/list',
        type: 'post',
        mark:'周期任务查询'
    },
    {
        url: '/easybi/report/periodTask/add',
        type: 'post',
        mark:'周期任务添加' 
    },
    {
        url: '/easybi/report/periodTask/get',
        type: 'post',
        mark:'周期任务详情' 
    },
    {
        url: '/easybi/report/periodTask/edit',
        type: 'post',
        mark:'周期任务编辑' 
    },
    {
        url: '/easybi/report/periodTask/on',
        type: 'post',
        mark:'周期任务启用' 
    },
    {
        url: '/easybi/report/periodTask/off',
        type: 'post',
        mark:'周期任务停用' 
    },
    {
        url: '/easybi/report/periodTask/batchOn',
        type: 'post',
        mark:'周期任务批量启用' 
    },
    {
        url: '/easybi/report/periodTask/batchOff',
        type: 'post',
        mark:'周期任务批量停用' 
    },
    {
        url: '/easybi/report/task/add',
        type: 'post',
        mark:'添加个人任务' 
    },
    {
        url: '/easybi/report/task/personalList',
        type: 'post',
        mark:'个人任务列表页查询' 
    },
    {
        url: '/easybi/report/worksheet/dateColumns',
        type: 'post',
        mark:'获取时间参数' 
    },
     
]

