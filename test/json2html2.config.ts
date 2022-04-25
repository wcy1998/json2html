/*
 * @Author: your name
 * @Date: 2022-04-07 15:24:42
 * @LastEditTime: 2022-04-25 18:35:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\test\json2html2.config.ts
 */
export const fastCodeConfig = {
    "frame": "vue",
    "base": "src/views/Pages",
    "snippetsPath": "C:/Users/cywu3/AppData/Roaming/Code/User/snippets",
    "pagesConfig": [
        {
            path: 'DataSets/workSheetsModal',
            htmlConfig: {
                template: "@columnContainer"
            },
            jsConfig: {
                name: 'workSheetsModal',
                props: {

                },
                data: {
                    paramObj: {
                        workSheetName: '',
                    },
                    controlledFiledList: [

                    ],
                },
                methods: {
                },
                getList: [
                    {
                        axios: 'columnDimList',
                        params: {
                            collectionId: ''
                        },
                        list: 'controlledFiledList'
                    },
                    {
                        axios: 'colu3434mnDimList',
                        list: '2222List'
                    },
                    {
                        axios: 'columnDi54545mList',
                        list: '33333FiledList'
                    }

                ]
            }
        }
    ]
}