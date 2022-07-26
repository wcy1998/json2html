import VueFactory from './factory/vueFactory.js';
import Factory from './factory/factory.js';
import path from 'path';
import fs from 'fs';
import process from 'process';
import pkg from 'js-beautify';
const { js_beautify } = pkg;
//一些轉換的方法
import { transformAllTypesToString } from '../src/transform-help/vue/index.js';
//获取执行当前代码的执行路径
const basePath: string = process.cwd();
let factory: Factory; //工厂

interface parseFile2FastCodeConfigParam {
    generateFileName?: string
    generateConfigPagePath?: string
    htmlString?: string
    cssString?: string
}
//解析智能生成的代码变成fastCodeConfig
export function parseFile2FastCodeConfig ({ generateFileName = '', generateConfigPagePath = '', htmlString = '', cssString = '' }: parseFile2FastCodeConfigParam) {
    factory = new VueFactory();

    const configParser = factory.createConfigParser(htmlString, cssString, generateConfigPagePath);

    fs.writeFileSync(path.join(basePath, `${generateFileName}fastCodeConfig.ts`), js_beautify('export const fastCodeConfig =' + transformAllTypesToString(configParser.parsedFastCodeConfig)), 'utf8');
}
