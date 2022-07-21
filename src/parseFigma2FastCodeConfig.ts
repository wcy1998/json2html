//一些第三方包和node內置模塊
import { html_beautify, js_beautify } from 'js-beautify';
import fs from 'fs';
import path from 'path';
import process from 'process';

//工廠相關
import VueFactory from './factory/vueFactory';
import Factory from './factory/factory';
import Config2FileParser from './parser/config2FileParser/config2FileParser';

//一些轉換的方法
import { json2htmlNode, transformAllTypesToString } from '../src/transform-help/vue/index';

import { htmlBeautifyConfig } from '../src/config/jsBeautyConfig';

let factory: Factory; //工厂

//获取执行当前代码的执行路径
const basePath: string = process.cwd();

export function parseFigma2FastCodeConfig (htmlTemplateConfig: any, figmaJson: string) {
    factory = new VueFactory();
    fs.writeFileSync(path.join(basePath, 'hh.js'), js_beautify('export const fastCodeConfig =' + transformAllTypesToString(JSON.parse(figmaJson))), 'utf8');
    const figmaParser = factory.createFigmaParser();
    const transformFigmaHtmlConfig = figmaParser.transformFigma2Config(figmaJson);
    fs.writeFileSync(path.join(basePath, 'FigmaFastCodeConfig.ts'), js_beautify('export const fastCodeConfig =' + transformAllTypesToString(transformFigmaHtmlConfig)), 'utf8');

    //创建一个解析器 并解析配置
    const parser: Config2FileParser = factory.createParser(null, htmlTemplateConfig);
    parser.parseHtmlConfig([transformFigmaHtmlConfig], new Set());
    fs.writeFileSync(path.join(basePath, 'FigmaHtml.html'), html_beautify(json2htmlNode(transformFigmaHtmlConfig), htmlBeautifyConfig));
}
