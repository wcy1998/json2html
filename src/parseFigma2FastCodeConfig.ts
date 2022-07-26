//一些第三方包和node內置模塊

import pkg from 'js-beautify';
const { html_beautify, js_beautify } = pkg;
import fs from 'fs';
import path from 'path';
import process from 'process';

//工廠相關
import VueFactory from './factory/vueFactory.js';
import Factory from './factory/factory.js';
import Config2FileParser from './parser/config2FileParser/config2FileParser.js';

//一些轉換的方法
import { json2htmlNode, transformAllTypesToString } from '../src/transform-help/vue/index.js';

import { htmlBeautifyConfig } from '../src/config/jsBeautyConfig.js';

let factory: Factory; //工厂

//获取执行当前代码的执行路径
const basePath: string = process.cwd();

interface parseFigma2FastCodeConfigParam {
    isGenerateBindStyle: boolean //要不要生成绑定的style
    htmlTemplateConfig: any //html模板配置
    figmaJson: string //被解析的figma结构
}
export function parseFigma2FastCodeConfig ({ isGenerateBindStyle, htmlTemplateConfig, figmaJson }: parseFigma2FastCodeConfigParam) {
    factory = new VueFactory();

    fs.writeFileSync(path.join(basePath, 'figmaJson.js'), js_beautify('export const fastCodeConfig =' + transformAllTypesToString(JSON.parse(figmaJson))), 'utf8');

    const figmaParser = factory.createFigmaParser();

    const transformFigmaHtmlConfig = figmaParser.transformFigma2Config(isGenerateBindStyle, figmaJson);

    fs.writeFileSync(path.join(basePath, 'FigmaFastCodeConfig.ts'), js_beautify('export const fastCodeConfig =' + transformAllTypesToString(transformFigmaHtmlConfig)), 'utf8');

    //创建一个解析器 并解析配置
    const parser: Config2FileParser = factory.createParser(null, htmlTemplateConfig);

    parser.parseHtmlConfig([transformFigmaHtmlConfig], new Set());

    fs.writeFileSync(path.join(basePath, 'FigmaHtml.html'), html_beautify(json2htmlNode(transformFigmaHtmlConfig), htmlBeautifyConfig));
}
