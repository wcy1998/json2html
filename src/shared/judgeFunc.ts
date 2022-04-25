//判断值的一些方法
import { unaryTag, vueBuiltInAttribute, notRetainedAttribute, svgTag, isNonPhrasingTags } from './constants';

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

//是不是vue保留的相关属性
export const isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

//是不是内置的组件名
export const isBuiltInTag = makeMap('slot,component', true);

//是不是文本元素
export const isPlainTextElement = makeMap('script,style,textarea', true);

//是不是左开的标签
export const canBeLeftOpenTag = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source');

//是不是不解析的标签
export const isNonPhrasingTag = makeMap(isNonPhrasingTags);

function makeMap (str: string, expectsLowerCase?: boolean): (key: string) => boolean {
    const map = Object.create(null); //创建一个对象
    const list: Array<string> = str.split(',');

    for (let i = 0; i < list.length; i++) {
        map[list[i]] = true;
    }

    return expectsLowerCase ? (val: string): boolean => !!map[val.toLowerCase()] : (val: string): boolean => !!map[val];
}
