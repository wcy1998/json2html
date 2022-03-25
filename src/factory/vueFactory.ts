/*
 * @Author: your name
 * @Date: 2022-03-24 13:48:30
 * @LastEditTime: 2022-03-25 13:22:28
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\factory\vueFactory.ts
 */
import Factory from './factory';
import VueComplier from '../complier/vueCompiler';
import VueParser from '../parser/vueParser';
import { json2htmlConfig } from '../types/vue/config';
export default class VueFactory implements Factory {
    createParser (json2htmlConfig: json2htmlConfig, templateConfig: object): VueParser {
        return new VueParser(json2htmlConfig, templateConfig);
    }

    createComplier (cssTemplateConfig: object): VueComplier {
        return new VueComplier(cssTemplateConfig);
    }
}
