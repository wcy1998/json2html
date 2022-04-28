/*
 * @Author: your name
 * @Date: 2022-04-01 11:31:34
 * @LastEditTime: 2022-04-27 15:55:03
 * @LastEditors: Please set LastEditors
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

       },
       jsConfig:{
           
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
    json2htmlTemplateHttpFunction: {
        prefix: '@httpFunc',
        body: `async $1funcName(param){
              let result = await $http.axios()
              if(result.success){
                  this.$Message.success('')
              }
          },`,
        description: '生成带有http请求的方法',
    },
    json2htmlTemplateGetList: {
        prefix: '@getList',
        body: `[
            {
                axios: '$1',
                params: {},
                list: '',
            },
        ],`,
        description: '生成请求getList的配置',
    },
    json2htmlTemplateFreshConfig: {
        prefix: '@freshConfig',
        body: `{
                page: 'query',
                params:' ',
            }`,
        description: '生成请求getList的配置',
    },
};
