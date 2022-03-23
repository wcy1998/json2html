/*
 * @Author: your name
 * @Date: 2022-03-20 15:50:59
 * @LastEditTime: 2022-03-22 16:17:06
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2html\src\node-help.ts
 */

import { htmlJsonConfig } from './index';
import { fromAttributes } from './attributesMap';
import { isUnaryTagFnc } from './shared/constants';

//将json配置转换成html标签组成的字符串
export const json2htmlNode = (nodeJson: htmlJsonConfig | undefined): string => {
    if (!nodeJson) {
        return '';
    }
    const { tag, text = '' } = nodeJson;
    const startTag = `<${tag}`;
    const endTag = `</${tag}>`;
    const isUnaryTag: boolean = isUnaryTagFnc(tag);

    //将内置的一些标签过滤除去
    const otherAttributes: Array<any> = Array.from(Object.entries(nodeJson))
        .map(([key, value]) => {
            if (key !== 'tag' && key !== 'children' && key !== 'text') {
                return {
                    type: key,
                    value,
                };
            }
        })
        .filter((item) => item);

    const childNodeJson: Array<htmlJsonConfig> | undefined = nodeJson?.children;

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

//将json配置转换成css组成的字符串
export const json2css = (nodeJson: htmlJsonConfig | undefined): string => {
    if (!nodeJson) {
        return '';
    }
    const { clazz } = nodeJson;

    const childNodeJson: Array<htmlJsonConfig> | undefined = nodeJson?.children;

    return childNodeJson
        ? clazz
            ? `
                .${clazz}{

                     ${childNodeJson.map((child) => json2css(child)).join('')}

                 }
        `
            : `${childNodeJson.map((child) => json2css(child)).join('')}`
        : clazz
        ? `
        .${clazz}{
          

        }      
        `
        : '';
};
