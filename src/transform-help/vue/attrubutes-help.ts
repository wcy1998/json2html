/*
 * @Author: your name
 * @Date: 2022-04-01 11:56:12
 * @LastEditTime: 2022-04-01 17:51:01
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\transform-help\attrubutes-help.ts
 */
import { isVueBuiltInAttribute } from '../../shared/judgeFunc';
import { vueTemplateAttributesMap } from '../../shared/constants';

export const fromAttributes = (attributeType: string, attributeValue: string, isBind: boolean): string => {
    const isBuiltInAttribute = isVueBuiltInAttribute(attributeType);
    return isBuiltInAttribute
        ? vueTemplateAttributesMap.get(attributeType) + `"${attributeValue}"`
        : (isBind ? ':' : '') + attributeType.replace(/^:/, '').toLocaleLowerCase() + '=' + `"${attributeValue}"`;
};
