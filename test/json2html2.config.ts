/*
 * @Author: your name
 * @Date: 2022-04-07 15:24:42
 * @LastEditTime: 2022-04-25 19:41:51
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\test\json2html2.config.ts
 */
export const fastCodeConfig = {
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
                props: {
                    collectionId: ''
                },
                data: {
                    paramObj: {
                        workSheetName: '',
                        controlledFiledList: []
                    },
                    controlledFiledList: [],
                },
                methods:{
                    aaa(){
                         console.log(675765765)
                    }
                },
                getList: [
                    {
                        axios: 'columnDimList',
                        params: {
                            collectionId: 'this.collectionId'
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
        },
        {   //工作表管理页面
            path: 'reportCenter/worksheetManagement',
            htmlConfig: {
                template: "@columnContainer"
            },
            jsConfig: {
                name: 'worksheetManagement',
                data: {
                    searchParam:{
                        pageNo:'1',
                        pageSize:'10',
                        worksheetName:''
                    },
                    workSheetList: [],
                },
                getList: [
                    {
                        axios: 'listWorksheet',
                        params:'...this.searchParam',
                        list: 'workSheetList'
                    },
                ]
            }
        },
        {    //报表管理页面
            path: 'reportCenter/reportManagement',
            htmlConfig: {
                template: "@columnContainer"
            },
            jsConfig: {
                name: 'reportManagement',
                data: {
                    searchParam:{
                        reportName:'',
                        reportClassifyId:'',
                        reportStatus:'',
                        authorityStatus:'',
                        startTime:'',
                        endTime:'',
                        pageNo:'',
                        pageSize:"",
                    },
                    reportList: [],
                },
                getList: [
                    {
                        axios: 'list',
                        params:"...this.searchParam",
                        list: 'reportList'
                    },
                ]
            }
        }
    ]
}