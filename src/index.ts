import Complier from './complier';
import { html_beautify, css_beautify } from 'js-beautify';
//eslint-disable-next-line
const fs = require('fs')
//eslint-disable-next-line
const path = require('path')
export interface htmlJsonConfig {
    tag: string
    clazz?: string
    text?: string
    vFor?: string
    key?: string
    bindKey?: string
    children?: Array<htmlJsonConfig>
    index?: string
    src?: string
    alt?: string
    bindSrc?: string
}
export interface htmlConfig {
    path: string //路径
    html: htmlJsonConfig
    children?: Array<htmlConfig>
}
export interface jsonConfig {
    frame: string //框架类型
    htmlConfig: Array<htmlConfig>
    jsConfig: object
    cssConfig: object
}
interface beautifyCompliedResult {
    beautifyHtmlCompliedResult: string
    beautifyCssCompliedResult: string
}

//html的代码格式化配置
const htmlBeautifyConfig: any = {
    indent_size: 4, //换行缩进
    end_with_newline: true,
    wrap_attributes: 'force-expand-multiline',
    indent_empty_lines: true,
    preserve_newlines: false,
};

const cssBeautifyConfig: any = {
    indent_size: 4, //换行缩进
    end_with_newline: true,
    indent_empty_lines: true,
    preserve_newlines: false,
};

function json2htmlCss (json: htmlJsonConfig): beautifyCompliedResult {
    const complier = new Complier(json);
    const { htmlCompliedResult, cssCompliedResult } = complier.compile();
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

fs.readFile('./lowcode.json', 'utf-8', (error: Error, data: any) => {
    if (error) throw error;
    const jsonConfig: jsonConfig = JSON.parse(data);
    const {
        htmlConfig, //html配置
    } = jsonConfig;

    exportFiles(htmlConfig);
});

export function exportFiles (htmlConfig: Array<htmlConfig>): void {
    htmlConfig.forEach(({ path: filePath, html: htmlJson, children }: htmlConfig) => {
        exportToFile(filePath, htmlJson);
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
function exportToFile (filePath: string, htmlJson: htmlJsonConfig): void {
    const { beautifyHtmlCompliedResult, beautifyCssCompliedResult } = json2htmlCss(htmlJson);
    const filepath = path.join(__dirname, filePath);

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
