/*
 * @Author: your name
 * @Date: 2022-03-18 17:10:13
 * @LastEditTime: 2022-03-23 11:44:14
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2html\src\complier.ts
 */
import { htmlJsonConfig } from './index';
import Parser from './parser';
import { json2htmlNode, json2css } from './node-help';
interface compileResult {
    htmlCompliedResult: string
    cssCompliedResult: string
}
export default class Complier {
    htmlJson: htmlJsonConfig; //json配置文件
    parser: Parser; //解析器
    parentNode?: htmlJsonConfig | null;
    constructor (htmlJson: htmlJsonConfig) {
        this.htmlJson = htmlJson;
        this.parser = new Parser();
        this.parentNode = null;
    }

    compile (): compileResult {
        const htmlCompliedResult: string = json2htmlNode(this.htmlJson);
        const cssCompliedResult: string = json2css(this.htmlJson);
        return {
            htmlCompliedResult,
            cssCompliedResult,
        };
    }
}
