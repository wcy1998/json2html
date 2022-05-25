/*
 * @Author: your name
 * @Date: 2022-04-01 11:31:34
 * @LastEditTime: 2022-05-25 16:53:14
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
                total:false,
                pageChange:{
                    get:false,
                },
                watch:''
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

    json2htmlMutationsConfig: {
        prefix: '@mutations',
        body: `[  //用于快速生成 mutations 方法
            {
                store:'moudule/$1',
                data:{
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
                store:'moudule/$1',
                data:['state']
            }
        ],`,
        description: '用于快速生成 states 方法',
    },
    json2htmlLqSelect: {
        prefix: '@select',
        body: ` tag: 'lq-select', 
                $dataList: "$1",
                $defaultProps: '$2',
                $basicConfig: '$3',
                vModel:'$6',
                "@change": '$4',
                "@nodeClick": '$5'`,
        description: 'lq-select',
    },
    json2htmlInput: {
        prefix: '@input',
        body: `  tag: 'Input',
                 vModel: '$1',
                 $style:{width:'$2'},
                 maxlength: '$3',
                 '@on-change': "limitInputLength"`,
        description: 'input',
    },
    json2htmlLabel: {
        prefix: '@label',
        body: ` template: '@requiredLabel',
                style: 'width: $1px;',
                text: '$2'`,
        description: 'label',
    },
    json2htmlVirtualList: {
        prefix: '@list',
        body: `  tag: 'virtual-table-list',
        $dataList: '$1',
        $tableWidth: '$2',
        $tableHeight: '$3',
        $columns: '$4',
        $headerRowStyle: "{$5}",`,
        description: 'virtualList',
    },
    json2htmTableColumns: {
        prefix: '@columns',
        body: ` {
            title: '$1',
            width: $2,
            key: '$3',
            render:(h,params)=>h()
        },`,
        description: 'columns',
    },
    json2htmTableRenderSelect: {
        prefix: '@renderSelect',
        body: ` 
        'lq-select', {
            props: {
                width: '$1',
                basicConfig: {
                    size: '$2',
                    transfer: $3
                },
                dataList: $4,
                defaultProps: $5,
                value: this.paramObj.authColumns[params.idx - 1].tagId,
            },
            on: {
                nodeClick: (e) => { this.paramObj.authColumns[params.idx - 1].tagId = e.id }
            }`,
        description: 'renderSelect',
    },
    json2htmTableConfirmModal: {
        prefix: '@confirmModal',
        body: ` 
        this.$lqConfirm({
            title: '$1?',
            type: 'warning',
            showCancelButton: true,
            onConfirm: () => {
                return true;
            },
        });`,
        description: 'confirmModal',
    },
};
