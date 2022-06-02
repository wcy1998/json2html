/*
 * @Author: your name
 * @Date: 2022-04-07 15:24:42
 * @LastEditTime: 2022-06-02 17:36:19
 * @LastEditors: Wcy1998 cywu3@leqee.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\test\json2html2.config.ts
 */
export const fastCodeConfig :any = {
    "frame": "vue",
    "base": "compilerResult/views/Pages",
    "snippetsPath": "C:/Users/cywu3/AppData/Roaming/Code/User/snippets",
    "pagesConfig": [
        { //一键生成工作表弹窗
            path: 'DataSets/workSheetsModal',
            htmlConfig: {
                template: "@columnContainer",
                $style:{width:'fdf'?'':''}, 
                text:'fnnvcjxhfjksd',
                $fdf:'fdsfs',
                clazz:'fdsfsd',
                ":fdddf":"true",
                ":fdfsdg":"fdsfdsf"
            },
            jsConfig: {
                name: 'workSheetsModal',
                props: {
                    test1: 'gfdgfd',
                    test2:{
                        type:[String, Number,Function,Object],
                        default:()=>9
                    }
                },
                mixins:['lqTable'],
                components:['lqTable'],
                data: {
                     data1:'fdfds',
                     data2:321321,
                     data3:true,
                     data4:['fdsf',4324,{},[]],
                     data5:{fdsf:[],fdf:{},fdfd:'',fwe:323},
                     data6:new Map(),
                     data7:new Set(),
                     data8:()=>6,
                     data9:function(){},
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
                beforeCreate(){
                      let a =890
                      console.log(a)
                },
                async created(){ 
                    await  console.log(899)
                },
                watch:{
                    collectionId(){
                       console.log(1111111)
                    },
                    data1:{
                        handler(){
                        console.log(333333333)
                        let c = 'fdfdf'
                        let v = c+3434
                        console.log(v)},
                        deep:true,
                        immediate:false
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
                        pageChange:{
                           get:true
                        },
                        watch:'data1',
                        loading:true,
                        list: 'controlledFiledList'
                    },
                    {
                        axios: 'columnDimList2',
                        params: {
                            collectionId: 'this.collectionId3'
                        },
                        pageChange:{
                            get:true
                         },
                         watch:'data1',
                        list: 'controlledFiledList2'
                    },
                    {
                        axios: 'columnDimList3',
                        params: {
                            collectionId: 'this.collectionId3'
                        },
                        loading:true,
                         watch:'data5.fdf',
                        list: 'controlledFiledList3'
                    },
                ]
            }
        }
    ]
}