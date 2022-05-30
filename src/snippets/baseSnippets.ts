/*
 * @Author: your name
 * @Date: 2022-04-01 11:31:34
 * @LastEditTime: 2022-05-30 13:40:54
 * @LastEditors: Wcy1998 cywu3@leqee.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\snippets\baseSnippets.ts
 */

//一些基础的代码片段配置
export const baseSnippets: object = {
    json2htmlConfig: {
        prefix: '@json2html',
        body: `
    export const json2htmlCfg ={
          frame:'vue', //要转换成的框架
          base:'',  //生成文件的基础路径
          pagesConfig:[  //页面配置
              
          ]
      }
    
    `,
        description: '生成json2html总体配置',
    },
    json2htmlPageConfig: {
        prefix: '@pageConfig',
        body: `
    {
       path:'$1',  //当前页面 组件 的文件路径
       htmlConfig:{  //html相关的配置

       },
       jsConfig:{  //js相关的配置
           
       }
    }
  
  `,
        description: '生成json2html单个页面配置',
    },
    json2htmlDomConfig: {
        prefix: '@DomConfig',
        body: `
       {
           tag:'$1', 
           clazz:'',
           style:''
       }
  `,
        description: '生成json2html单个元素配置',
    },
    json2htmlTemplateDomConfig: {
        prefix: '@templateDomConfig',
        body: `
       {
           template:'$1',
           clazz:'',
           style:''
       } 
  `,
        description: '生成json2html单个模板元素配置',
    },
    json2htmlTemplateGetList: {
        prefix: '@getList',
        body: `[
            {
                axios: '$1',  //当前对应的接口
                params: {},   //当前请求的参数
                list: '',    //当前list的方法
                total:false,  //返回是否带有total
                loading:false, //是否需要记录请求状态
                pageChange:{  //是否需要自动生成分页方法
                    get:false,
                },
                watch:''  //watch什么值进行获取列表
            },
        ],`,
        description: '生成请求getList的配置',
    },
    json2htmlMutationsConfig: {
        prefix: '@mutations',
        body: `[  //用于快速生成 mutations 方法
            {
                store:'moudule/$1', //mutations所对应的store文件层级
                data:{            //当前页面所需要使用的mutations
                    state:''    
                }
            }
        ],`,
        description: '用于快速生成 mutations 方法',
    },
    json2htmlStatesConfig: {
        prefix: '@states',
        body: `[  //用于快速生成 mutations 方法
            {
                store:'moudule/$1', //state所对应的store文件层级
                data:['state'] //所要使用的变量
            }
        ],`,
        description: '用于快速生成 states 方法',
    },
};
