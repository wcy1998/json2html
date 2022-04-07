/*
 * @Author: your name
 * @Date: 2022-04-01 11:31:34
 * @LastEditTime: 2022-04-01 11:34:37
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\snippets\baseSnippets.ts
 */

//一些基础的代码片段配置
export const baseSnippets: object = {
    json2htmlConfig: {
        prefix: '@json2html',
        body: `
    export const json2htmlCfg ={
          frame:'vue',
          base:'',
          pagesConfig:[
              
          ]
      }
    
    `,
        description: '生成json2html总体配置',
    },
    json2htmlPageConfig: {
        prefix: '@pageConfig',
        body: `
    {
       path:'$1',
       htmlConfig:{

       }
    }
  
  `,
        description: '生成json2html单个页面配置',
    },
    json2htmlDomConfig: {
        prefix: '@DomConfig',
        body: `
       {tag:'$1',
       clazz:'',
       style:''}
  `,
        description: '生成json2html单个元素配置',
    },
    json2htmlTemplateDomConfig: {
        prefix: '@templateDomConfig',
        body: `
       {template:'$1',
           clazz:'',
           style:''} 
  `,
        description: '生成json2html单个模板元素配置',
    },
};
