/*
 * @Author: your name
 * @Date: 2022-04-07 15:24:42
 * @LastEditTime: 2022-05-16 17:04:15
 * @LastEditors: Wcy1998 cywu3@leqee.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\transform-help\vue\attrubutes-help.ts
 */
import { isVueBuiltInAttribute } from '../../shared/judgeFunc.js';
import { vueTemplateAttributesMap } from '../../shared/constants.js';
import { toRawType } from '../../shared/utils.js';
import { transformArrayToString, transformObjectToString } from './js-help.js';
//辅助方法  将用户写的属性转换成vue中指定的属性格式
export const fromAttributes = (attributeType: string, attributeValue: any): string => {
    const isBuiltInAttribute = isVueBuiltInAttribute(attributeType);

    const is$ = /^\$/.test(attributeType);

    const isOldBind = /^:/.test(attributeType);

    let newAttributeType;
    if (is$) {
        newAttributeType = attributeType.replace(/^\$/, '');
    } else if (isOldBind) {
        newAttributeType = attributeType.replace(/^:/, '');
    } else {
        newAttributeType = attributeType;
    }
    let notString = false;
    switch (toRawType(attributeValue)) {
        case 'Array':
            attributeValue = transformArrayToString(attributeValue);
            notString = true;
            break;
        case 'Object':
            attributeValue = transformObjectToString(attributeValue);
            notString = true;
            break;
        case 'String':
            attributeValue = `"${attributeValue}"`;
            break;
        default:
            notString = true;
            break;
    }
    return isBuiltInAttribute
        ? vueTemplateAttributesMap.get(attributeType) + (attributeType === 'vElse' ? '' : `${attributeValue}`)
        : (is$ || isOldBind ? ':' : '') + newAttributeType + '=' + (is$ && notString ? `"${attributeValue}"` : `${attributeValue}`);
};
