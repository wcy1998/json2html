import { isVueBuiltInAttribute } from '../../shared/judgeFunc';
import { vueTemplateAttributesMap } from '../../shared/constants';

//辅助方法  将用户写的属性转换成vue中指定的属性格式
export const fromAttributes = (attributeType: string, attributeValue: string, isBind: boolean): string => {
    const isBuiltInAttribute = isVueBuiltInAttribute(attributeType);
    return isBuiltInAttribute
        ? vueTemplateAttributesMap.get(attributeType) + `"${attributeValue}"`
        : (isBind ? ':' : '') + attributeType.replace(/^:/, '').toLocaleLowerCase() + '=' + `"${attributeValue}"`;
};
