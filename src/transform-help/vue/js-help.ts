/*
 * @Author: your name
 * @Date: 2022-04-25 13:20:55
 * @LastEditTime: 2022-04-26 15:55:47
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\transform-help\vue\js-help.ts
 */

import { JsConfig } from '../../types/vue';
import { toRawType } from '../../shared/utils';
import path from 'path';
import { fileEmitter } from '../file-help';
import process from 'process';
import { js_beautify } from 'js-beautify';
export async function json2Js (jsConfig: JsConfig, filepath: string): Promise<string> {
    const { name, props = {}, data = {}, ndata = {}, getList = [], methods = {}, watch = {}, mutations = [] } = jsConfig;
    let res;
    try {
        res = await import(path.join('file://', path.resolve(filepath, 'index.js')));
    } catch (e) {
        console.log('读取文件失败');
    }
    const VueOptions = res?.default;
    const { computed = {}, watch: preWatches = {}, created = null, mounted = null, methods: preMethods = {} } = VueOptions || {};

    parseMutations(mutations);
    return `export default {
       name:"${name}",
       props:{${processProps(props)}},
       data(){return${JSON.stringify(data)}},
       computed:${Object.keys(computed).length ? JSON.stringify(computed) : '{}'},
       watch:{${processWatch(watch, preWatches)}},
       beforeCreate(){${processNoReactiveData(ndata)}},
       ${created || 'created(){}'},
       ${mounted || 'mounted(){}'},
       methods:{${mutations?.length ? processMutations(mutations) + ',' : ''}${(getList?.length ? processGetListFunc(getList, preMethods) + ',' : '') + processMethods(methods, preMethods)}}
   }`;
}

function generateStringByMap (obj: object, type: string, isDelete = false, deleteObj?: any): Array<any> {
    const stringArr = Object.entries(obj).map(([key, val]) => {
        if (isDelete && deleteObj[key]) {
            delete deleteObj[key];
        }
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

        switch (type) {
            case 'props':
                return `${key}:{type:${toRawType(val)},default(){return ${value}}}`;
            case 'ndata':
                return `this.${key}=${value}`;
            case 'mutation':
                value = JSON.stringify(val);
                break;
        }
    });
    return stringArr;
}

//处理 props
function processProps (props: object): string {
    const propsString: Array<string> = generateStringByMap(props, 'props', false);
    return propsString.join(',');
}

//处理 没有响应性的数据
function processNoReactiveData (ndata: object): string {
    const ndataString: Array<string> = generateStringByMap(ndata, 'ndata', false);
    return ndataString.join(';');
}

function processWatch (watch: object, preWatches: any): string {
    const watchString: Array<string> = Object.entries(watch).map(([key, val]: any) => {
        if (preWatches[key]) {
            delete preWatches[key];
        }
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
        return `${value},`;
    });
    const preWatchesString = Object.entries(preWatches).map(([key, val]: any) => {
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
        return `${value},`;
    });
    return watchString.join('') + preWatchesString.join('');
}

function processGetListFunc (getList: Array<any>, preMethods: any) {
    if (preMethods.getDataList) {
        delete preMethods.getDataList;
    }
    let switchCase = 'switch (type) {';
    getList.forEach(({ axios, params, list }) => {
        switchCase += ` case '${list}':
        action = $http.${axios};
        ${
            params
                ? 'params = {' +
                  (typeof params === 'string'
                      ? params
                      : Object.entries(params)
                            .map(([key, val]) => {
                                return `${key}:${val}`;
                            })
                            .join(',')) +
                  '}'
                : ''
        }
        break;`;
    });
    switchCase += `
    default:
        break;
    }`;
    return `
    async getDataList (type) {
        let action,params;
        ${switchCase}
        try {
            let res = await action(params);
            if (res.success) {
                this[type] = res.obj;
            }
        } catch (e) {
            console.log(e); //eslint-disable-line
        }
    }`;
}

function processMethods (methods: object, preMethods: any): string {
    const methodsString = Object.entries(methods).map(([key, val]) => {
        if (preMethods[key]) {
            delete preMethods[key];
        }
        return `${val},`;
    });
    const preMethodsString = Object.entries(preMethods).map(([, val]) => {
        return `${val},`;
    });
    return methodsString.join('') + preMethodsString.join('');
}

async function parseMutations (mutations: Array<any>) {
    for (const { store, data } of mutations) {
        const fileName = store.split('/')[store.split('/').length - 1];
        const storePath: string = path.resolve(process.cwd(), 'src/store/' + store.replace(new RegExp(`${fileName}$`), ''));
        let preStore;
        try {
            preStore = await import(path.resolve(storePath, fileName));
        } catch (e) {
            console.log('读取store文件失败');
        }
        let stateString: any = '';
        let mutationString: any = '';
        Object.entries(data).forEach(([key, val]) => {
            let value: any;
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
            stateString += `${key}:${value},`;
            mutationString += `update${key.replace(/^./, key[0].toUpperCase())} (state,${key}){state.${key} = ${key}},`;
        });

        let preStateString: any = '';
        let preMutationString: any = '';
        if (preStore) {
            Object.entries(preStore.default.state).forEach(([key, val]) => {
                if (!(key in data)) {
                    let value: any;
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
                    preStateString += `${key}:${value},`;
                }
            });

            Object.entries(preStore.default.mutations).forEach(([key, val]) => {
                const filed = key.replace(/^update/, '');
                const originFiled = filed.replace(/^./, filed[0].toLowerCase());
                if (!(originFiled in data)) {
                    preMutationString += `${val},`;
                }
            });
        }

        const storeString = `
        export default {
            namespaced: true,
            state: {${stateString}${preStateString}},
            getters: {
            },
            mutations: {${mutationString}${preMutationString}},
        };
        `;
        fileEmitter(storePath, fileName + '.js', js_beautify(storeString));
    }
}

function processMutations (mutations: Array<any>): string {
    return mutations
        .map(({ store, data }) => {
            return `...mapMutations('state/${store.split('/')[store.split('/').length - 1]}',${Object.entries(data)
                .map(([key]) => {
                    return `'${key}'`;
                })
                .join(',')})`;
        })
        .join(',');
}
