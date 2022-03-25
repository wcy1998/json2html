import { html_beautify, css_beautify } from 'js-beautify';
import VueFactory from './factory/vueFactory';
import { beautifyCompliedResult } from './types/vue/result';
import { pagesConfig, htmlConfig, json2htmlConfig } from './types/vue/config';
import { cloneDeep } from 'lodash';

//eslint-disable-next-line
const fs = require('fs')
//eslint-disable-next-line
const path = require('path')
//eslint-disable-next-line
const process = require('process')

//获取执行当前代码的执行路径
const basePath: string = process.cwd();

//html的代码格式化配置
const htmlBeautifyConfig: js_beautify.HTMLBeautifyOptions | undefined = {
    indent_size: 4, //换行缩进
    end_with_newline: true,
    wrap_attributes: 'force-expand-multiline',
    indent_empty_lines: true,
    preserve_newlines: false,
};

//css的代码格式化配置
const cssBeautifyConfig: js_beautify.CSSBeautifyOptions | undefined = {
    indent_size: 4, //换行缩进
    end_with_newline: true,
    indent_empty_lines: true,
    preserve_newlines: false,
};

function json2htmlCss (json: htmlConfig): beautifyCompliedResult {
    const { htmlCompliedResult, cssCompliedResult } = complier.compile(json);

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

export function exportFiles (pageConfig: Array<pagesConfig>): void {
    pageConfig.forEach(({ path: filePath, htmlConfig, children }: pagesConfig) => {
        exportToFile(filePath, htmlConfig);
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

//输出文件
function exportToFile (filePath: string, htmlConfig: htmlConfig): void {
    const { beautifyHtmlCompliedResult, beautifyCssCompliedResult } = json2htmlCss(htmlConfig);
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
let factory: any, complier: any;

export function generateFile (json2htmlCfg: json2htmlConfig, htmlTemplateConfig: object, cssTemplateConfig: object) {
    factory = json2htmlCfg.frame === 'vue' ? new VueFactory() : new VueFactory();

    let parser: any = factory.createParser(json2htmlCfg, htmlTemplateConfig);

    const parsedJson2htmlConfig = cloneDeep(parser.parsedJson2htmlConfig);

    complier = factory.createComplier(cssTemplateConfig);

    fs.writeFileSync(path.join(__dirname, 'test.json'), JSON.stringify(parser.parsedJson2htmlConfig), 'utf8', (err: Error) => {
        if (err) throw err;
    });
    exportFiles(parsedJson2htmlConfig.pagesConfig);
    parser = null;
}

//generateFile(json2htmlCfg,htmlTemplateConfig,cssTemplateConfig)
