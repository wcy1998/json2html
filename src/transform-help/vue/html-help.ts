/*
 * @Author: your name
 * @Date: 2022-03-24 13:40:32
 * @LastEditTime: 2022-04-19 19:44:46
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\transform-help\html-help.ts
 */
import { HtmlConfig } from '../../types/vue';
import { fromAttributes } from './attrubutes-help';
import { isUnaryTagFnc, isNotRetainedAttribute } from '../../shared/judgeFunc';

//将json配置转换成html标签组成的字符串 就是vue模板
export const json2htmlNode = (
    htmlConfig: HtmlConfig | undefined //用户写的html相关的配置
): string => {
    if (!htmlConfig) {
        return '';
    }

    //在解析html时最主要的就是 文本 和 标签
    const { tag = '', text = '' } = htmlConfig;

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
                  ${fromAttributes(type, value, /^:/.test(type))}
                  `
                    )
                    .join('')}${isUnaryTag ? '/' : ''}>${text}
                  ${childNodeJson ? childNodeJson.map((child) => json2htmlNode(child)).join('') : ''}${isUnaryTag ? '' : endTag}
            `;
};
