/*
 * @Author: your name
 * @Date: 2022-04-07 15:24:42
 * @LastEditTime: 2022-04-25 14:03:35
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\test\json2html2.config.ts
 */
export const fastCodeConfig = {
    "frame": "vue",
    "base": "src/json2html",
    "snippetsPath": "C:/Users/cywu3/AppData/Roaming/Code/User/snippets",
    "pagesConfig": [
        {
            path: 'test1',
            htmlConfig: {
                tag: 'sss',
                clazz: '',
                style: ''
            },
            jsConfig: {
                name:'test1',
                props:{
                    type:'all',
                    arr:['1','2',2,{s:22}],
                    obj:{
                        a:2,
                        f:'dd',
                        aee:[1,2,'444']
                    },
                    func:()=>{},
                    num:111
                },
                data:{
                   aee:'333' 
                },
                ndata:{
                }
            }
        }
    ]
}