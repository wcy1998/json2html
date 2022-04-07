/*
 * @Author: your name
 * @Date: 2022-03-22 14:23:46
 * @LastEditTime: 2022-04-07 14:11:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2html\src\shared\utils.ts
 */
import { isSVG } from './judgeFunc';

export const emptyObject: object = Object.freeze({});

export function isUndef (v: any): boolean {
    return v === undefined || v === null;
}

export function isDef (v: any): boolean {
    return v !== undefined && v !== null;
}
export function isTrue (v: any): boolean {
    return v === true;
}
export function isFalse (v: any): boolean {
    return v === false;
}
export function isPrimitive (value: any): boolean {
    return typeof value === 'string' || typeof value === 'number' || typeof value === 'symbol' || typeof value === 'boolean';
}
const _toString = Object.prototype.toString;
export function isObject (obj: any): boolean {
    return obj !== null && typeof obj === 'object';
}
export function toRawType (value: any): string {
    return _toString.call(value).slice(8, -1);
}
export function isPlainObject (obj: any): boolean {
    return _toString.call(obj) === '[object Object]';
}
export function isRegExp (v: any): boolean {
    return _toString.call(v) === '[object RegExp]';
}
export function isValidArrayIndex (val: any): boolean {
    const n = parseFloat(String(val));
    return n >= 0 && Math.floor(n) === n && isFinite(val);
}
export function isPromise (val: any): boolean {
    return isDef(val) && typeof val.then === 'function' && typeof val.catch === 'function';
}

export function makeMap (str: string, expectsLowerCase?: boolean): (key: string) => boolean {
    const map = Object.create(null); //创建一个对象
    const list: Array<string> = str.split(',');

    for (let i = 0; i < list.length; i++) {
        map[list[i]] = true;
    }

    return expectsLowerCase ? (val: string): boolean => !!map[val.toLowerCase()] : (val: string): boolean => !!map[val];
}

export function cached (fn: any): any {
    const cache = Object.create(null); //创建一个空对象
    return function cachedFn (str: string): any {
        const hit = cache[str];
        return hit || (cache[str] = fn(str));
    };
}

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
