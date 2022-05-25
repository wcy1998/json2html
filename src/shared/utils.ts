/*
 * @Author: your name
 * @Date: 2022-03-23 13:23:46
 * @LastEditTime: 2022-05-24 17:40:49
 * @LastEditors: Wcy1998 cywu3@leqee.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\shared\utils.ts
 */
//一些通用的方法
import { isSVG } from './judgeFunc';

//一个空对象
export const emptyObject: object = Object.freeze({});

//判断一个值是否是undefined 或 null
export function isUndef (v: any): boolean {
    return v === undefined || v === null;
}

//判断一个值 不是 undefined 且 不是null
export function isDef (v: any): boolean {
    return v !== undefined && v !== null;
}

//判断一个值为真
export function isTrue (v: any): boolean {
    return v === true;
}

//判断一个值为false
export function isFalse (v: any): boolean {
    return v === false;
}

//判断一个值是否为基础类型
export function isPrimitive (value: any): boolean {
    return typeof value === 'string' || typeof value === 'number' || typeof value === 'symbol' || typeof value === 'boolean';
}

const _toString = Object.prototype.toString;
//判断一个值是不是 不为bull的Object
export function isObject (obj: any): boolean {
    return obj !== null && typeof obj === 'object';
}

//获取一个值的原始类型
export function toRawType (value: any): string {
    return _toString.call(value).slice(8, -1);
}

//判断一个值是不是object
export function isPlainObject (obj: any): boolean {
    return _toString.call(obj) === '[object Object]';
}

//判断一个值是不是正则
export function isRegExp (v: any): boolean {
    return _toString.call(v) === '[object RegExp]';
}

//判断一个值是不是合理的数组索引
export function isValidArrayIndex (val: any): boolean {
    const n = parseFloat(String(val));
    return n >= 0 && Math.floor(n) === n && isFinite(val);
}

//判断一个值是不是promise
export function isPromise (val: any): boolean {
    return isDef(val) && typeof val.then === 'function' && typeof val.catch === 'function';
}

//返回一个缓存函数
export function cached (fn: any): any {
    const cache = Object.create(null); //创建一个空对象
    return function cachedFn (str: string): any {
        const hit = cache[str];
        return hit || (cache[str] = fn(str));
    };
}

//返回只执行一次的函数
export function once (fn: any): any {
    let called = false;
    return function (this: any) {
        if (!called) {
            called = true;
            //eslint-disable-next-line
            fn.apply(this, arguments)
        }
    };
}

//获取命名空间
export function getTagNamespace (tag: string): string | undefined {
    if (isSVG(tag)) {
        return 'svg';
    }
    if (tag === 'math') {
        return 'math';
    }
}

//获取文件路径的最后一部分
export function getFilePathLastPathBySlash (filePath: string): string {
    const pathArr: Array<string> = filePath.split('/');
    return pathArr[pathArr.length - 1];
}
