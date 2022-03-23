/*
 * @Author: your name
 * @Date: 2022-03-21 10:40:26
 * @LastEditTime: 2022-03-22 16:27:47
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2html\src\attributesMap.ts
 */

export const fromAttributes = (attributeType: string, attributeValue: string, isBind: boolean): string => {
    const builtInAttribute = vueTemplateAttributesMap.get(attributeType);
    return builtInAttribute ? builtInAttribute + `"${attributeValue}"` : (isBind ? ':' : '') + attributeType.replace(/^bind/, '').toLocaleLowerCase() + '=' + `"${attributeValue}"`;
};

const vueTemplateAttributesMap: Map<string, string> = new Map(
    Object.entries({
        clazz: 'class=',
        bindClazz: ':class=',
        vFor: 'v-for=',
        vIf: 'v-if=',
        vElse: 'v-else',
        vElseIf: 'v-else-if=',
    })
);
