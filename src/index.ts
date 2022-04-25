import { html_beautify, css_beautify, js_beautify } from 'js-beautify';
import VueFactory from './factory/vueFactory';
import { beautifyCompliedResult } from './types/vue';
import { PagesConfig, HtmlConfig, FastCodeConfig } from './types/vue';
import { formSnippetsByTemplates } from './snippets';
import { cloneDeep } from 'lodash';
import { generateDefaultConfig } from './defaultConfig';
import VueParser from './parser/parser/config2FileVueParser';
import Factory from './factory/factory';
import Complier from './complier/complier';
import { axiosConfig } from './types/vue';
import { emitAxiosFiles } from './transform-help/vue/http-help';

//eslint-disable-next-line
const fs = require('fs')
//eslint-disable-next-line
const path = require('path')
//eslint-disable-next-line
const process = require('process')

//获取执行当前代码的执行路径
const basePath: string = process.cwd();

//html的代码格式化配置
const htmlBeautifyConfig: js_beautify.HTMLBeautifyOptions = {
    indent_size: 4, //换行缩进
    end_with_newline: true,
    wrap_attributes: 'force-expand-multiline',
    indent_empty_lines: true,
    preserve_newlines: false,
};

//css的代码格式化配置
const cssBeautifyConfig: js_beautify.CSSBeautifyOptions = {
    indent_size: 4, //换行缩进
    end_with_newline: true,
    indent_empty_lines: true,
    preserve_newlines: false,
};

//将转换成可以输出的文件
function json2htmlCss (json: HtmlConfig, usedCssMixin: Array<string>): beautifyCompliedResult {
    const { htmlCompliedResult, cssCompliedResult } = complier.compile(json, usedCssMixin);

    return {
        beautifyHtmlCompliedResult: html_beautify(
            '<template>' +
                htmlCompliedResult +
                '</template>' +
                `<script>
                  export default {
                      name:"${'component'}",
                      mixins:[],
                      component:{

                      },
                      props:{

                      },
                      data(){
                          return {

                          }
                      },
                      computed:{

                      },
                      watch:{

                      },
                      beforeCreate(){

                      },
                      created(){

                      },
                      mounted(){

                      },
                      methods:{

                      }
                  }
                 </script>
 
                 <style lang="scss" scoped>
                  @import './index.scss'; 
                 </style>`,
            htmlBeautifyConfig
        ),
        beautifyCssCompliedResult: css_beautify(cssCompliedResult, cssBeautifyConfig),
    };
}

//输出所有文件
export function exportFiles (pageConfig: Array<PagesConfig> | undefined): void {
    if (!pageConfig) {
        throw new Error('没有配置文件');
    }
    pageConfig.forEach(({ path: filePath, htmlConfig, children, usedCssMixin = [] }: PagesConfig) => {
        exportToFile(filePath, htmlConfig, usedCssMixin);
        if (children && children.length > 0) {
            exportFiles(children);
        }
    });
}

// 递归创建目录 异步方法
function mkdir (dirname: string, callback: () => void) {
    fs.exists(dirname, function (exists: any) {
        if (exists) {
            callback();
        } else {
            mkdir(path.dirname(dirname), function () {
                fs.mkdir(dirname, callback);
            });
        }
    });
}

//输出单个文件
function exportToFile (filePath: string, htmlConfig: HtmlConfig, usedCssMixin: Array<string>): void {
    const { beautifyHtmlCompliedResult, beautifyCssCompliedResult } = json2htmlCss(htmlConfig, usedCssMixin);

    const filepath = path.join(basePath, filePath);

    mkdir(filepath, () => {
        if (fs.existsSync(filepath)) {
            //异步写入文件 如果文件不存在，则创建文件；如果文件存在，则覆盖文件内容；
            fs.writeFileSync(path.join(filepath, 'index.vue'), beautifyHtmlCompliedResult, 'utf8', (err: Error) => {
                if (err) throw err;
            });
            //异步写入文件 如果文件不存在，则创建文件；如果文件存在，则覆盖文件内容；
            fs.writeFileSync(path.join(filepath, 'index.scss'), beautifyCssCompliedResult, 'utf8', (err: Error) => {
                if (err) throw err;
            });
        } else {
            fs.mkdirSync(path.dirname(filepath));
        }
    });
}

let factory: Factory, complier: Complier, configParser: any;

//生成文件
export function generateFile (originFastCodeConFig: FastCodeConfig, htmlTemplateConfig: object, cssTemplateConfig: object): void {
    //生成代码片段的配置
    formSnippetsByTemplates(cssTemplateConfig, htmlTemplateConfig, originFastCodeConFig.snippetsPath);
    //生成相关的默认配置
    const fastCodeConfig = generateDefaultConfig(originFastCodeConFig);

    factory = fastCodeConfig.frame === 'vue' ? new VueFactory() : new VueFactory();

    let parser: VueParser | null = factory.createParser(fastCodeConfig, htmlTemplateConfig);

    let parsedJson2htmlConfig: FastCodeConfig | undefined;

    if (parser instanceof VueParser) {
        parsedJson2htmlConfig = cloneDeep(parser.parsedFastCodeConfig);
    }

    complier = factory.createComplier(cssTemplateConfig);
    exportFiles(parsedJson2htmlConfig?.pagesConfig);
    parser = null;
}

//解析智能生成的代码变成fastCodeConfig
export function parseFile2FastCodeConfig (pageName: string, pagePath: string) {
    factory = new VueFactory();
    configParser = factory.createConfigParser(
        `<div class="flex-col page">
    <div class="justify-between group">
      <span class="text">用户信息</span>
      <img
        src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6247a5c75a7e3f0310d52be4/6247a60b468f3700116def5a/16488643097458706807.png"
        class="image"
      />
    </div>
    <div class="flex-col items-start section_1">
      <div class="flex-row search">
        <img
          src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6247a5c75a7e3f0310d52be4/6247a60b468f3700116def5a/16488643097454927243.png"
          class="image_1"
        />
        <span class="text_1">{{userName1}}</span>
        <span class="text_2">{{userName2}}</span>
      </div>
    </div>
    <div class="flex-col list">
      <div class="list-item flex-row">
        <span class="text_3">OC部门</span>
        <span class="text_5">一级部门/二级部门/三级部门/最细部门</span>
      </div>
      <div class="list-item flex-row">
        <span class="text_3">OC岗位</span>
        <span class="text_5">数据专员</span>
      </div>
      <div class="list-item flex-row">
        <span class="text_3">OC角色</span>
        <div class="text_5 flex-row">
          <span>角色1</span>
          <div class="section_2"></div>
          <span class="text_11">角色2</span>
          <div class="section_3"></div>
          <span class="text_12">角色3</span>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <Ghgh class="group_4" />
  </div>`,
        `.group_4 {
    position: relative;
  }
  .text_3 {
    color: rgb(151, 154, 168);
    font-size: 0.75rem;
    line-height: 0.69rem;
    white-space: nowrap;
  }
  .text_5 {
    margin-left: 1.25rem;
    color: rgb(25, 34, 74);
    font-size: 0.75rem;
    line-height: 0.69rem;
    white-space: nowrap;
  }
  .page {
    background-color: rgb(255, 255, 255);
    border-radius: 0.25rem;
    box-shadow: 0px 0.13rem 0.63rem rgba(205, 205, 205, 0.5);
    width: 100%;
    overflow-y: auto;
    height: 100%;
  }
  .group {
    padding: 1.44rem 1.25rem 1.44rem 1.28rem;
    color: rgb(38, 43, 57);
    font-size: 1rem;
    line-height: 0.94rem;
    white-space: nowrap;
  }
  .section_1 {
    margin: 0 1.25rem;
    padding: 0.88rem 0 0.81rem;
    background-image: linear-gradient(180deg, rgb(244, 245, 249) 0%, rgba(244, 245, 249, 0.5) 100%);
    border-radius: 0.5rem 0.5rem 0px 0px;
    border-bottom: solid 0.063rem rgb(233, 237, 246);
  }
  .list {
    margin-top: 1.31rem;
    padding: 0 1.28rem 0.94rem;
  }
  .divider {
    margin: 0 1.25rem;
    background-color: rgb(233, 237, 246);
    height: 0.063rem;
  }
  .text {
    margin: 0.16rem 0 0.16rem;
  }
  .image {
    width: 1.25rem;
    height: 1.25rem;
  }
  .search {
    margin-left: 1rem;
  }
  .list-item:not(:first-of-type) {
    margin-top: 1.31rem;
  }
  .image_1 {
    width: 1rem;
    height: 1rem;
  }
  .text_1 {
    margin: 0.094rem 0 0.16rem 0.53rem;
    color: rgb(25, 34, 74);
    font-size: 0.88rem;
    line-height: 0.81rem;
    white-space: nowrap;
  }
  .text_2 {
    margin: 0.22rem 0 0.094rem 0.47rem;
    color: rgb(151, 154, 168);
    font-size: 0.75rem;
    line-height: 0.72rem;
    white-space: nowrap;
  }
  .section_2 {
    margin-left: 0.22rem;
    background-color: rgb(233, 236, 246);
    width: 0.063rem;
    height: 0.75rem;
  }
  .text_11 {
    margin-left: 0.28rem;
  }
  .section_3 {
    margin-left: 0.22rem;
    background-color: rgb(233, 236, 246);
    width: 0.063rem;
    height: 0.75rem;
  }
  .text_12 {
    margin-left: 0.28rem;
  }
  .flex-row {
    display: flex;
    flex-direction: row;
  }
  
  .flex-col {
    display: flex;
    flex-direction: column;
  }
  
  .justify-start {
    display: flex;
    justify-content: flex-start;
  }
  
  .justify-center {
    display: flex;
    justify-content: center;
  }
  
  .justify-end {
    display: flex;
    justify-content: flex-end;
  }
  
  .justify-evenly {
    display: flex;
    justify-content: space-evenly;
  }
  
  .justify-around {
    display: flex;
    justify-content: space-around;
  }
  
  .justify-between {
    display: flex;
    justify-content: space-between;
  }
  
  .items-start {
    display: flex;
    align-items: flex-start;
  }
  
  .items-center {
    display: flex;
    align-items: center;
  }
  
  .items-end {
    display: flex;
    align-items: flex-end;
  }
  `,
        pagePath
    );
    fs.writeFileSync(path.join(basePath, `${pageName}fastCodeConfig.ts`), js_beautify('export const fastCodeConfig =' + JSON.stringify(configParser.parsedConfig)), 'utf8', (err: Error) => {
        if (err) throw err;
    });
}

//生成接口文件
export function generateAxiosFiles (axiosConfigs: Array<axiosConfig>) {
    emitAxiosFiles(axiosConfigs);
}

//generateAxiosFiles(httpConfig)

//解析智能生成的代码变成fastCodeConfig
//parseFile2FastCodeConfig('test1','test1')

//通过fastCodeConfig 生成对应的vue文件
//generateFile(fastCodeConfig, htmlTemplateConfig, cssTemplateConfig);
