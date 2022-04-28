/*
 * @Author: your name
 * @Date: 2022-04-25 13:20:55
 * @LastEditTime: 2022-04-28 15:54:17
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
import { FileInfo } from '../../types/vue';
export async function json2Js (jsConfig: JsConfig, filepath: string): Promise<string> {
    const { name, props = {}, data = {}, ndata = {}, getList = [], methods = {}, watch = {}, mutations = [], states = [], computed = {}, watchToGetList = [] } = jsConfig;
    let fileInfo: FileInfo = {}; //事先 去读取下文件的内容
    try {
        // import(path.join('file://', path.resolve(filepath, 'index.js')));
        // import(path.resolve(filepath, 'index'))
        fileInfo = await import(path.join('file://', path.resolve(filepath, 'index.js')));
    } catch (e) {
        console.log('读取文件失败,去读取缓存文件');
        try {
            fileInfo = await import(path.join('file://', path.resolve(path.join(process.cwd(), 'src/fastCodeCache'), filepath.replace(/\\/g, '-') + '.js')));
        } catch (e) {
            console.log('不存在缓存文件');
        }
    }
    const VueOptions = fileInfo?.default;
    const { computed: preComputed = {}, watch: preWatches = {}, created = null, mounted = null, methods: preMethods = {} } = VueOptions || {};
    parseMutations(mutations);

    return `${mutations?.length || states?.length ? `import { ${states?.length ? 'mapState,' : ''}${mutations?.length ? 'mapMutations' : ''}} from "vuex";` : ''}
    export default {
       name:"${name}",
       props:{${processProps(props)}},
       data(){return${JSON.stringify(data)}},
       computed:{${(states?.length ? processStates(states) + ',' : '') + processComputed(computed, preComputed)}},
       watch:{${processWatch(watch, preWatches, watchToGetList)}},
       beforeCreate(){${processNoReactiveData(ndata)}},
       ${created || 'created(){}'},
       ${mounted || 'mounted(){}'},
       methods:{${mutations?.length ? processMutations(mutations) + ',' : ''}${(getList?.length ? processGetListFunc(getList, preMethods) + ',' : '') + processMethods(methods, preMethods)}}
   }`;
}

function transformObjectToString (obj: object): string {
    return `{${Object.entries(obj)
        .map(([key, val]) => {
            switch (toRawType(val)) {
                case 'String':
                    return `${key}:'${val}'`;
                case 'Array':
                    return `${key}:${transformArrayToString(val)}`;
                case 'Object':
                    return `${key}:${transformObjectToString(val)}`;
                case 'Function':
                    return `${key}:${val}`;
                case 'Number':
                    return `${key}:'${val}'`;
                default:
                    break;
            }
        })
        .join(',')}}`;
}

function transformArrayToString (arr: Array<any>): string {
    return `[${arr
        .map((val) => {
            switch (toRawType(val)) {
                case 'String':
                    return `'${val}'`;
                case 'Array':
                    return transformArrayToString(val);
                case 'Object':
                    return transformObjectToString(val);
                case 'Function':
                    return val;
                case 'Number':
                    return `'${val}'`;
                default:
                    break;
            }
        })
        .join(',')}]`;
}

function generateStringByMap (obj: object, type: string, isDelete = false, deleteObj?: any): Array<any> {
    const stringArr = Object.entries(obj).map(([key, val]) => {
        if (isDelete && deleteObj[key]) {
            delete deleteObj[key];
        }
        let value;
        switch (toRawType(val)) {
            case 'String':
                value = val;
                break;
            case 'Array':
                value = transformArrayToString(val);
                break;
            case 'Object':
                value = transformObjectToString(val);
                break;
            case 'Function':
                value = val;
                break;
            case 'Number':
                value = val;
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

function processComputed (computed: object, preComputed: any): string {
    const computedString: Array<string> = Object.entries(computed).map(([key, val]: any) => {
        if (preComputed[key]) {
            delete preComputed[key];
        }
        let value: string;
        switch (toRawType(val)) {
            case 'Function':
                value = val;
                break;
            case 'Object':
                value = `${key}:{
                    ${val.set},
                    ${val.get}
                }`;
                break;
            default:
                value = val;
                break;
        }
        return `${value},`;
    });
    const preComputedString = Object.entries(preComputed).map(([key, val]: any) => {
        let value: string;
        switch (toRawType(val)) {
            case 'Function':
                value = val;
                break;
            case 'Object':
                value = `${key}:{
                        ${val.set},
                        ${val.get}
                    }`;
                break;
            default:
                value = val;
                break;
        }
        if (/^function mappedState/.test(val.toString())) {
            return '';
        } else {
            return `${value},`;
        }
    });
    return computedString.join('') + preComputedString.join('');
}

//处理watch相关设置
function processWatch (watch: object, preWatches: any, watchToGetList: any): string {
    if (watchToGetList?.length === 1 && !watchToGetList[0].data) {
        //设置默认的配置
        watchToGetList[0].data = 'searchParam';
    }
    const watchToGetListString: Array<string> = watchToGetList.map(({ data, list }: any) => {
        if (preWatches[data]) {
            delete preWatches[data];
        }
        return `${data}(){${list
            .map((item: any) => {
                return `this.getDataList('${item}');`;
            })
            .join('')}},`;
    });
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
    return watchToGetListString.join('') + watchString.join('') + preWatchesString.join('');
}

//处理获取列表的相关设置
function processGetListFunc (getList: Array<any>, preMethods: any) {
    if (preMethods.getDataList) {
        delete preMethods.getDataList;
    }
    const finalFreshConfig: Array<any> = [];
    let switchCase = 'switch (type) {';
    getList.forEach(({ axios, params, list, freshConfig }) => {
        if (freshConfig) {
            finalFreshConfig.push({ ...freshConfig, list });
        }
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
    if (preMethods.pageChange && finalFreshConfig?.length) {
        delete preMethods.pageChange;
    }
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
    }${
        finalFreshConfig?.length === 1
            ? ',' +
              `pageChange(pageNo,pageSize){
        this.searchParam.pageNo=pageNo;
        this.searchParam.pageSize=pageSize;${finalFreshConfig[0].page === 'query' ? `this.getDataList("${finalFreshConfig[0].list}")` : ''}}`
            : ''
    }`;
}

//处理方法相关
function processMethods (methods: object, preMethods: any): string {
    const methodsString = Object.entries(methods).map(([key, val]) => {
        if (preMethods[key]) {
            delete preMethods[key];
        }
        return `${val},`;
    });
    const preMethodsString = Object.entries(preMethods).map(([, val]: any) => {
        if (/^function mappedMutation/.test(val.toString())) {
            return '';
        } else {
            return `${val},`;
        }
    });
    return methodsString.join('') + preMethodsString.join('');
}

//解析mutations
async function parseMutations (mutations: Array<any>) {
    for (const { store, data } of mutations) {
        const fileName = store.split('/')[store.split('/').length - 1];
        const storePath: string = path.resolve(process.cwd(), 'src/store/' + store.replace(new RegExp(`${fileName}$`), ''));
        let preStore;
        try {
            //import(path.join('file://',path.resolve(storePath, fileName+'.js')))
            //import(path.resolve(storePath, fileName));
            preStore = await import(path.join('file://', path.resolve(storePath, fileName + '.js')));
        } catch (e) {
            console.log('读取store文件失败读取缓存');
            try {
                preStore = await import(path.join('file://', path.resolve(path.join(process.cwd(), 'src/fastCodeCache/store'), fileName.replace(/\\/g, '-') + '.js')));
            } catch (e) {
                console.log('不存在缓存文件');
            }
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
        fileEmitter(path.join(process.cwd(), 'src/fastCodeCache/store'), fileName.replace(/\\/g, '-') + '.js', js_beautify(storeString));
    }
}

//处理mutations
function processMutations (mutations: Array<any>): string {
    return mutations
        .map(({ store, data }) => {
            return `...mapMutations('${store.split('/')[store.split('/').length - 1]}',[${Object.entries(data)
                .map(([key]) => {
                    return `'update${key.replace(/^./, key[0].toUpperCase())}'`;
                })
                .join(',')}])`;
        })
        .join(',');
}

//处理states
function processStates (states: Array<any>): string {
    return states
        .map(({ store, data }) => {
            return `...mapState('${store.split('/')[store.split('/').length - 1]}',[${data.map((item: string) => `'${item}'`).join(',')}])`;
        })
        .join(',');
}
