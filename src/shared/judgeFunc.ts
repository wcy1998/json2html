/*
 * @Author: your name
 * @Date: 2022-03-24 14:12:57
 * @LastEditTime: 2022-04-02 15:00:27
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\shared\tagJudge.ts
 */

import { unaryTag, vueBuiltInAttribute, notRetainedAttribute, svgTag, isNonPhrasingTags } from './constants';
export function makeMap (str: string, expectsLowerCase?: boolean): (key: string) => boolean {
    const map = Object.create(null); //创建一个对象
    const list: Array<string> = str.split(',');

    for (let i = 0; i < list.length; i++) {
        map[list[i]] = true;
    }

    return expectsLowerCase ? (val: string): boolean => !!map[val.toLowerCase()] : (val: string): boolean => !!map[val];
}
//判断是不是一元标签
export const isUnaryTagFnc = makeMap(unaryTag, true);

//判断是不是vue内置的一些属性写法
export const isVueBuiltInAttribute = makeMap(vueBuiltInAttribute);

//判断是不是不会保留在dom中的那些属性
export const isNotRetainedAttribute = makeMap(notRetainedAttribute);

//是不是pre标签
export const isPreTag = (tag: string) => {
    return tag === 'pre';
};

//是否是svg标签
export const isSVG = makeMap(svgTag, true);

export const isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

export const isBuiltInTag = makeMap('slot,component', true);

export const isPlainTextElement = makeMap('script,style,textarea', true);

export const canBeLeftOpenTag = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source');

export const isNonPhrasingTag = makeMap(isNonPhrasingTags);
