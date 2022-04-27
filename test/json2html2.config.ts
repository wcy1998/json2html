/*
 * @Author: your name
 * @Date: 2022-04-07 15:24:42
 * @LastEditTime: 2022-04-27 15:19:21
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\test\json2html2.config.ts
 */
export const fastCodeConfig: any = {
    "frame": "vue",
    "base": "src/views/Pages",
    "snippetsPath": "C:/Users/cywu3/AppData/Roaming/Code/User/snippets",
    "pagesConfig": [
        { //一键生成工作表弹窗
            path: 'DataSets/workSheetsModal',
            htmlConfig: {
                template: "@columnContainer"
            },
            jsConfig: {
                name: 'workSheetsModal',
                data: {
                    paramObj: {
                        workSheetName: '',
                        authColumns: [],//选择的受控字段列表
                        collectionId: ''
                    },
                    controlledFiledList: [],
                },
                watchToGetList:[{
                    data:'searchParam',
                    list:['controlledFiledList'],
                }],
                getList: [
                    {
                        axios: 'columnDimList',
                        params: {
                            collectionId: 'this.collectionId'
                        },
                        list: 'controlledFiledList',
                        freshConfig:{
                            page : 'query'
                       }
                    },
                ]
            }
        }
    ]
}