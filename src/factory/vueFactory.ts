/*
 * @Author: your name
 * @Date: 2022-03-24 13:48:30
 * @LastEditTime: 2022-04-07 14:04:38
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\factory\vueFactory.ts
 */
import Factory from './factory';
import VueComplier from '../complier/vueCompiler';
import VueParser from '../parser/config2FileParser/config2FileVueParser';
import VueConfigParser from '../parser/file2FastCodeConfigParser/file2FastCodeConfigVueParser';
import VueFigmaParser from '../parser/figma2FastCodeConfigParser/figma2FastCodeConfigVueParser';
import { FastCodeConfig } from '../types/vue';
export default class VueFactory implements Factory {
    public createParser (json2htmlConfig: FastCodeConfig, templateConfig: object): VueParser {
        return new VueParser(json2htmlConfig, templateConfig);
    }

    public createComplier (cssTemplateConfig: object): VueComplier {
        return new VueComplier(cssTemplateConfig);
    }

    public createConfigParser (html: string, css: string, pagePath: string): VueConfigParser {
        return new VueConfigParser(html, css, pagePath);
    }

    public createFigmaParser (): VueFigmaParser {
        return new VueFigmaParser();
    }
}
