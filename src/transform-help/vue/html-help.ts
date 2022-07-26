/*
 * @Author: your name
 * @Date: 2022-03-24 13:40:32
 * @LastEditTime: 2022-05-30 15:52:12
 * @LastEditors: Wcy1998 cywu3@leqee.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\transform-help\html-help.ts
 */
import { HtmlConfig } from '../../types/vue/index.js';
import { fromAttributes } from './attributes-help.js';
import { isUnaryTagFnc, isNotRetainedAttribute } from '../../shared/judgeFunc.js';

//将json配置转换成html标签组成的字符串 就是vue模板
export const json2htmlNode = (
    htmlConfig: HtmlConfig | undefined //用户写的html相关的配置
): string => {
    if (!htmlConfig) {
        return '';
    }

    //在解析html时最主要的就是 文本 和 标签
    const { tag = '', text = '' } = htmlConfig;
    if (htmlConfig.vFor && !htmlConfig.$key) {
        if (/[{|,]id[}|,]/.test(htmlConfig.vFor)) {
            htmlConfig.$key = 'id';
        } else {
            htmlConfig.$key = 'idx';
        }
    }
    const startTag = `<${tag}`;
    const endTag = `</${tag}>`;

    //判断一下当前的标签是否是一元标签
    const isUnaryTag: boolean = isUnaryTagFnc(tag);

    //将一些不会被当做属性保留在dom中的 像是children tag等
    const otherAttributes: Array<any> = Array.from(Object.entries(htmlConfig))
        .map(([key, value]) => {
            if (!isNotRetainedAttribute(key)) {
                return {
                    type: key,
                    value,
                };
            }
        })
        .filter((item) => item);

    const childNodeJson: Array<HtmlConfig> | undefined = htmlConfig?.children;
    return `
           ${startTag} 
                ${otherAttributes
                    .map(
                        ({ type, value }) =>
                            `
                  ${fromAttributes(type, value)}
                  `
                    )
                    .join('')}${isUnaryTag ? '/' : ''}>${text}
                  ${childNodeJson ? childNodeJson.map((child) => json2htmlNode(child)).join('') : ''}${isUnaryTag ? '' : endTag}
            `;
};
