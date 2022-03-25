/*
 * @Author: your name
 * @Date: 2022-03-24 13:40:32
 * @LastEditTime: 2022-03-25 15:37:17
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\transform-help\html-help.ts
 */
import { htmlConfig } from '../types/vue/config';
import { fromAttributes } from '../attributesMap';
import { isUnaryTagFnc } from '../shared/tagJudge';
//将json配置转换成html标签组成的字符串
export const json2htmlNode = (htmlConfig: htmlConfig | undefined): string => {
    if (!htmlConfig) {
        return '';
    }
    const { tag = '', text = '' } = htmlConfig;
    const startTag = `<${tag}`;
    const endTag = `</${tag}>`;
    const isUnaryTag: boolean = isUnaryTagFnc(tag);

    //将内置的一些标签过滤除去
    const otherAttributes: Array<any> = Array.from(Object.entries(htmlConfig))
        .map(([key, value]) => {
            if (key !== 'tag' && key !== 'children' && key !== 'text' && key !== 'style' && key !== 'cssMixin') {
                return {
                    type: key,
                    value,
                };
            }
        })
        .filter((item) => item);

    const childNodeJson: Array<htmlConfig> | undefined = htmlConfig?.children;

    return childNodeJson
        ? `
           ${startTag} 
                ${otherAttributes
                    .map(
                        ({ type, value }) =>
                            `
                  ${fromAttributes(type, value, /^bind/.test(type))}
                  `
                    )
                    .join('')}${isUnaryTag ? '/' : ''}>${text}
                  ${childNodeJson.map((child) => json2htmlNode(child)).join('')}${isUnaryTag ? '' : endTag}
            `
        : `
            ${startTag}  
                ${otherAttributes
                    .map(
                        ({ type, value }) =>
                            `
                  ${fromAttributes(type, value, /^bind/.test(type))}
                  `
                    )
                    .join('')}${isUnaryTag ? '/' : ''}>${text}${isUnaryTag ? '' : endTag}      
            `;
};
