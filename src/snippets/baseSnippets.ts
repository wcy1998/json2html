/*
 * @Author: your name
 * @Date: 2022-04-01 11:31:34
 * @LastEditTime: 2022-06-02 17:43:18
 * @LastEditors: Wcy1998 cywu3@leqee.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\snippets\baseSnippets.ts
 */

//一些基础的代码片段配置
export const baseSnippets: object = {
    快速生成fastCode整体配置代码: {
        prefix: '@fastCodeConfig',
        body: `
    export const fastCodeConfig ={
          frame:'vue', //要转换成的框架
          base:'',  //生成文件的基础路径
          pagesConfig:[  //页面配置
              {
                path:'$1',  //当前页面 组件 的文件路径
                htmlConfig:{  //html相关的配置
         
                },
                jsConfig:{  //js相关的配置
                    
                }
              }
          ]
      }
    
    `,
        description: '快速生成fastCode整体配置框架',
    },

    快速生成fastCode单个页面配置代码: {
        prefix: '@pageConfig',
        body: `
    {
       path:'$1',  //当前页面 组件 的文件路径
       htmlConfig:{  //html相关的配置

       },
       jsConfig:{  //js相关的配置
           
       },
       cssConfig:{ //css相关配置

       }
    }
  
  `,
        description: '快速生成fastCode单个页面配置代码',
    },
    快速生成单个dom的配置代码: {
        prefix: '@domConfig',
        body: `
       {
           tag:'$1', 
           clazz:'',
           style:''
       }
  `,
        description: '快速生成单个dom的配置代码',
    },
    快速生成单个模板dom的配置代码: {
        prefix: '@templateDomConfig',
        body: `
       {
           template:'$1',
           clazz:'',
           style:''
       } 
  `,
        description: '快速生成单个模板dom的配置代码',
    },
    快速生成getList配置代码: {
        prefix: '@getList',
        body: `[
            {

                axios: '$1' //当前请求的接口
                params: {} //请求的参数
                list: '' //结果存储的对象
                total: false //是否有total信息
                result:'' //返回结果中的字段 默认是res.obj
                pageChange:{  // 配置了pageChange 就会去字段生成pageChange的方法
                    get: true //是否去调用getDataList
                    getListFunc:'' //改变分页时调用的具体方法 替代getDatalist 
                    param: ''
                }
                handleRes:"" //自定义处理结果的代码
                watch: "" //当前列表在什么值改变后重新获取
                loading: true
            },
        ],`,
        description: '快速生成getList配置代码',
    },
    快速生成mutations配置代码: {
        prefix: '@mutations',
        body: `[  //用于快速生成 mutations 方法
            {
                store:'moudule/$1', //mutations所对应的store文件层级
                data:{        //当前页面所需要使用的mutations
                    state:''    
                }
            }
        ],`,
        description: '快速生成mutations配置代码',
    },
    快速生成states配置代码: {
        prefix: '@states',
        body: `[  //用于快速生成 mutations 方法
            {
                store:'moudule/$1', //state所对应的store文件层级
                data:['state'] //所要使用的变量
            }
        ],`,
        description: '快速生成states配置代码',
    },
    快速生成axios配置项代码: {
        prefix: '@axiosConfig',
        body: `export const axiosConfig = [  //一个axios文件配置项
            {
                url: "$1这是一个接口的路径",//接口路径
                type: "post", //接口方式'post' 'get'
                mark: "这是一个接口的描述", //注释
            }
        ],`,
        description: '快速生成states配置代码',
    },
};
