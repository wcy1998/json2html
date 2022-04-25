/*
 * @Author: your name
 * @Date: 2022-04-07 15:24:42
 * @LastEditTime: 2022-04-25 17:58:54
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\transform-help\vue\attrubutes-help.ts
 */
import { isVueBuiltInAttribute } from '../../shared/judgeFunc';
import { vueTemplateAttributesMap } from '../../shared/constants';

//辅助方法  将用户写的属性转换成vue中指定的属性格式
export const fromAttributes = (attributeType: string, attributeValue: string, isBind: boolean): string => {
    const isBuiltInAttribute = isVueBuiltInAttribute(attributeType);
    return isBuiltInAttribute
        ? vueTemplateAttributesMap.get(attributeType) + `"${attributeValue}"`
        : (isBind ? ':' : '') + (isBind ? attributeType.replace(/^:/, '').toLocaleLowerCase() : attributeType) + '=' + `"${attributeValue}"`;
};
