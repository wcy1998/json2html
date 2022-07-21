import VueFactory from './factory/vueFactory';
import Factory from './factory/factory';
import path from 'path';
import fs from 'fs';
import process from 'process';
import { js_beautify } from 'js-beautify';
//一些轉換的方法
import { transformAllTypesToString } from '../src/transform-help/vue/index';
//获取执行当前代码的执行路径
const basePath: string = process.cwd();
let factory: Factory; //工厂

//解析智能生成的代码变成fastCodeConfig
export function parseFile2FastCodeConfig (pageName: string, pagePath: string, html: string, css: string) {
    factory = new VueFactory();

    const configParser = factory.createConfigParser(html, css, pagePath);

    fs.writeFileSync(path.join(basePath, `${pageName}fastCodeConfig.ts`), js_beautify('export const fastCodeConfig =' + transformAllTypesToString(configParser.parsedFastCodeConfig)), 'utf8');
}
