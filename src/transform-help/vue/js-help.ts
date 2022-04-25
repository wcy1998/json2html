/*
 * @Author: your name
 * @Date: 2022-04-25 13:20:55
 * @LastEditTime: 2022-04-25 18:43:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\transform-help\vue\js-help.ts
 */

import { JsConfig } from '../../types/vue';
import { toRawType } from '../../shared/utils';
import path from 'path';
export async function json2Js (jsConfig: JsConfig, filepath: string): Promise<string> {
    const { name, props = {}, data = {}, ndata = {}, getList = [] } = jsConfig;
    let res;
    try {
        res = await import(path.join(path.resolve(filepath, 'index.js')));
    } catch (e) {
        console.log('读取文件失败');
    }
    const VueOptions = res?.default;
    const { computed = null, watch = null, created = null, mounted = null } = VueOptions || {};

    return `export default {
       name:"${name}",
       props:{${processProps(props)}},
       data(){return${JSON.stringify(data)}},
       computed:${computed ? JSON.stringify(computed) : '{}'},
       watch:{${watch ? processWatch(watch) : ''}},
       beforeCreate(){${processNoReactiveData(ndata)}},
       ${created || 'created(){}'},
       ${mounted || 'mounted(){}'},
       methods:{${processGetListFunc(getList)}}
   }`;
}

//处理 props
function processProps (props: object): string {
    const propsString: Array<string> = Object.entries(props).map(([key, val]) => {
        let value;
        switch (toRawType(val)) {
            case 'String':
                value = JSON.stringify(val);
                break;
            case 'Array':
                value = JSON.stringify(val);
                break;
            case 'Object':
                value = JSON.stringify(val);
                break;
            case 'Function':
                value = val;
                break;
            case 'Number':
                value = JSON.stringify(val);
                break;
            default:
                break;
        }
        return `${key}:{type:${toRawType(val)},default(){return ${value}}}`;
    });
    return propsString.join(',');
}

//处理 props
function processNoReactiveData (ndata: object): string {
    const ndataString: Array<string> = Object.entries(ndata).map(([key, val]) => {
        let value: string;
        switch (toRawType(val)) {
            case 'Function':
                value = val;
                break;
            case 'Map':
                value = 'new Map()';
                break;
            case 'Set':
                value = 'new Set()';
                break;
            default:
                value = JSON.stringify(val);
                break;
        }
        return `this.${key}=${value}`;
    });
    return ndataString.join(';');
}

function processWatch (watch: object): string {
    const ndataString: Array<string> = Object.entries(watch).map(([key, val]) => {
        let value: string;
        switch (toRawType(val)) {
            case 'Function':
                value = val;
                break;
            case 'Object':
                value = `${key}:{
                    ${val.handler},
                    deep:${val.deep ? 'true' : 'false'}
                }`;
                break;
            default:
                value = val;
                break;
        }
        return value;
    });
    return ndataString.join(',');
}

function processGetListFunc (getList: Array<any>) {
    let switchCase = 'switch (type) {';

    getList.forEach(({ axios, list }) => {
        switchCase += ` case '${list}':
        action = $http.${axios};
        break;`;
    });
    switchCase += `
    default:
        break;
    }`;
    return `
    async getDataList (type) {
        let action;
        ${switchCase}
        try {
            let res = await action();
            if (res.success) {
                this[type] = res.obj;
            }
        } catch (e) {
            console.log(e); //eslint-disable-line
        }
    }`;
}
