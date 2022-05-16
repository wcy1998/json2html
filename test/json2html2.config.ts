/*
 * @Author: your name
 * @Date: 2022-04-07 15:24:42
 * @LastEditTime: 2022-05-15 16:24:50
 * @LastEditors: Wcy1998 cywu3@leqee.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\test\json2html2.config.ts
 */
export const fastCodeConfig :any = {
    "frame": "vue",
    "base": "src/views/Pages",
    "snippetsPath": "C:/Users/cywu3/AppData/Roaming/Code/User/snippets",
    "pagesConfig": [
        { //一键生成工作表弹窗
            path: 'DataSets/workSheetsModal',
            htmlConfig: {
                template: "@columnContainer",
                $style:{width:'fdf'?'':''}, 
                $fdf:'fdsfs',
                ":fdddf":"true",
                ":fdfsdg":"fdsfdsf"
            },
            jsConfig: {
                name: 'workSheetsModal',
                props: {
                    collectionId: 'gfdgfd'
                },
                mixins:['lqTable'],
                components:['lqTable'],
                data: {
                    paramObj: {
                        workSheetName: '',
                        authColumns: [],//选择的受控字段列表
                        collectionId:'',
                        fdfd:true
                    },
                    controlledFiledList: [],
                },
                mutations:[  //用于快速生成 mutations 方法
                    {
                        store:'moudule/dataCollection',
                        data:{
                            controlledFiledList2:[],
                            store2:'',
                            store3:new Map(),
                            store4:[],
                            store5:{}
                        }
                    }
                ],
                states:[  //用于快速生成 mutations 方法
                    {
                        store:'moudule/dataCollection',
                        data:['controlledFiledList2','store2']
                    }
                ],
                mounted(){
                 console.log(333333)
                }, 
                ndata:{
                    fdfsf:false
                },
                watch:{
                    collectionId(){
                       console.log(1111111)
                    }
                },
                computed:{
                    collections(){
                        console.log(1111111)
                     },
                     fdhskjfh:{
                         set(){

                         },
                         get(){
                             
                         }
                     }
                },
                methods: {
                    aaa() {
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
                ]
            }
        }
    ]
}