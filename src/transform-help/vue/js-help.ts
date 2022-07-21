/*
 * @Author: your name
 * @Date: 2022-04-25 13:20:55
 * @LastEditTime: 2022-05-30 15:37:28
 * @LastEditors: Wcy1998 cywu3@leqee.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\transform-help\vue\js-help.ts
 */

import { JsConfig, VueOptions, MutationsConfig, VueFileInfo, StoreFileInfo, StoreOptions, Props, GetListConfig } from '../../types/vue';
import { toRawType } from '../../shared/utils';
import path from 'path';
import { fileEmitter } from '../../file-help';
import process from 'process';
import { js_beautify } from 'js-beautify';
import { getFilePathLastPathBySlash } from '../../shared/utils';

//将配置转换成js代码
export async function json2Js (
    jsConfig: JsConfig, //用户定义的js配置
    filepath: string, //当前页面对应的地址
    jsPlugins: Array<any> //js插件
): Promise<string> {
    const {
        name, //组件的name
        props, //用户配置的props
        data, //用户配置的data
        ndata, //不具备响应性的数据
        getList, //用户定义的获取列表的配置
        methods, //用户定义的方法
        watch, //用户定义的watch
        mutations, //用户定义的需要使用的mutations
        states, //用户需要使用的states
        computed, //用户需要使用的计算属性
        beforeCreate,
        created,
        beforeMount,
        mounted,
        beforeUpdate,
        updated,
        beforeDestroy,
        destroyed,
        components, //组件的相关配置
        mixins, //mixins相关的配置
    } = jsConfig;

    const jsPluginsMap = new Map();
    jsPlugins.forEach(({ type, configName, func }) => {
        if (jsPluginsMap.get(type)) {
            jsPluginsMap.get(type).push({ configName, func });
        } else {
            jsPluginsMap.set(type, [{ configName, func }]);
        }
    });

    let fileInfo: VueFileInfo = {}; //先去读取一下当前文件的上一次输出的内容 这里获取上下文件内容的方式目前是通过import 所以可能会存在一些引入错误 后续会改成文本读取
    try {
        // import(path.join('file://', path.resolve(filepath, 'index.js')));
        // import(path.resolve(filepath, 'index'))
        fileInfo = await import(path.join('file://', path.resolve(filepath, 'index.js')));
    } catch (e) {
        console.log(`读取${filepath}文件失败,尝试去读取缓存文件`);
        try {
            fileInfo = await import(path.join('file://', path.resolve(path.join(process.cwd(), 'fastCodeCache'), filepath.replace(/\\/g, '-') + '.js')));
        } catch (e) {
            console.log('不存在缓存文件或者读取缓存文件失败');
        }
    }

    const VueOptions: VueOptions = fileInfo?.default || {};

    //目前只支持computed  watch  methods的合并操作
    const { computed: preComputed, watch: preWatches, methods: preMethods } = VueOptions || {};

    //先解析用户的mutations相关配置在相应的文件中生成需要的state 和 mutations
    parseMutations(mutations);

    //如果使用了mutations 和 states 的话 需要引入一下可以防止import的失效
    return `${mutations?.length || states?.length ? `import { ${states?.length ? 'mapState,' : ''}${mutations?.length ? 'mapMutations' : ''}} from "vuex";` : ''} 
    export default {
       name:"${processPlugins('name', jsConfig, VueOptions, jsPluginsMap)}${name ? name : 'componentName'}",
       ${
           components || jsPluginsMap.get('components')
               ? 'components:{' + processPlugins('components', jsConfig, VueOptions, jsPluginsMap) + processComponents(components) + '},//fastCode缓存中没有'
               : ''
       }
       ${mixins || jsPluginsMap.get('mixins') ? 'mixins:[' + processPlugins('mixins', jsConfig, VueOptions, jsPluginsMap) + processMixins(mixins) + '],' : ''}
       ${props || jsPluginsMap.get('props') ? 'props:{' + processPlugins('props', jsConfig, VueOptions, jsPluginsMap) + processProps(props) + '},' : ''}
       data(){return{${processPlugins('data', jsConfig, VueOptions, jsPluginsMap)}${processData(data, getList)}}},
       ${
           states || computed || preComputed || jsPluginsMap.get('computed')
               ? 'computed:{' + processPlugins('computed', jsConfig, VueOptions, jsPluginsMap) + (states?.length ? processStates(states) + ',' : '') + processComputed(computed, preComputed) + '},'
               : ''
       }
       ${watch || preWatches || getList || jsPluginsMap.get('watch') ? 'watch:{' + processPlugins('watch', jsConfig, VueOptions, jsPluginsMap) + processWatch(watch, preWatches, getList) + '},' : ''}
       ${
           beforeCreate || ndata || jsPluginsMap.get('beforeCreate')
               ? `${/^async/.test(beforeCreate?.toString() || '') ? 'async ' : ''}beforeCreate(){` +
                 processPlugins('beforeCreate', jsConfig, VueOptions, jsPluginsMap) +
                 processNoReactiveData(ndata) +
                 getFunctionContent(beforeCreate) +
                 '},'
               : ''
       }
       ${created ? `${/^async/.test(created?.toString() || '') ? 'async ' : ''}created(){` + processPlugins('created', jsConfig, VueOptions, jsPluginsMap) + getFunctionContent(created) + '},' : ''}
       ${
           beforeMount
               ? `${/^async/.test(beforeMount?.toString() || '') ? 'async ' : ''}beforeMount(){` +
                 processPlugins('beforeMount', jsConfig, VueOptions, jsPluginsMap) +
                 getFunctionContent(beforeMount) +
                 '},'
               : ''
       }
       ${mounted ? `${/^async/.test(mounted?.toString() || '') ? 'async ' : ''}mounted(){` + processPlugins('mounted', jsConfig, VueOptions, jsPluginsMap) + getFunctionContent(mounted) + '},' : ''}
       ${
           beforeUpdate
               ? `${/^async/.test(beforeUpdate?.toString() || '') ? 'async ' : ''}beforeUpdate(){` +
                 processPlugins('beforeUpdate', jsConfig, VueOptions, jsPluginsMap) +
                 getFunctionContent(beforeUpdate) +
                 '},'
               : ''
       }
       ${updated ? `${/^async/.test(updated?.toString() || '') ? 'async ' : ''}updated(){` + processPlugins('updated', jsConfig, VueOptions, jsPluginsMap) + getFunctionContent(updated) + '},' : ''}
       ${
           beforeDestroy
               ? `${/^async/.test(beforeDestroy?.toString() || '') ? 'async ' : ''}beforeDestroy(){` +
                 processPlugins('beforeDestroy', jsConfig, VueOptions, jsPluginsMap) +
                 getFunctionContent(beforeDestroy) +
                 '},'
               : ''
       }
       ${
           destroyed
               ? `${/^async/.test(destroyed?.toString() || '') ? 'async ' : ''}destroyed(){` + processPlugins('destroyed', jsConfig, VueOptions, jsPluginsMap) + getFunctionContent(destroyed) + '},'
               : ''
       }
       methods:{${processPlugins('methods', jsConfig, VueOptions, jsPluginsMap)}${mutations?.length ? processMutations(mutations) + ',' : ''}${
        (getList?.length ? processGetListFunc(getList, preMethods) + ',' : '') + processMethods(methods, preMethods)
    }}
   }`;
}

//将出入的不同类型的 同一转换成 有意义的字符串
export function transformAllTypesToString (value: any): string {
    switch (toRawType(value)) {
        case 'Function':
            return value;
        case 'Map':
            return 'new Map()';
        case 'Set':
            return 'new Set()';
        case 'Array':
            return transformArrayToString(value);
        case 'Object':
            return transformObjectToString(value);
        case 'String':
            return `'${value}'`;
        case 'Number':
            return value;
        default:
            return JSON.stringify(value);
    }
}

//将对象转换成字符串
export function transformObjectToString (obj: Record<string, any>): string {
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
                    return `${key}:${val}`;
                case 'Boolean':
                    return `${key}:${val}`;
                default:
                    break;
            }
        })
        .join(',')}}`;
}

//将数组转换成字符串
export function transformArrayToString (arr: Array<any>): string {
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
                    return val;
                case 'Boolean':
                    return val;
                default:
                    break;
            }
        })
        .join(',')}]`;
}

//获取方法内部内容
export function getFunctionContent (func: any): string {
    const reg = new RegExp(`${func?.name}\\s{0,}\\(\\s{0,}\\)\\s{0,}\\{(.*)\\}`, 's');
    const matchResult: any = func?.toString().match(reg) || [];
    return matchResult[1] || '';
}

//获取方法内部内容
export function processPlugins (type: string, jsConfig: any, vueOptions: VueOptions, jsPluginsMap: any): string {
    const {
        name, //组件的name
        props, //用户配置的props
        data, //用户配置的data
        ndata, //不具备响应性的数据
        getList, //用户定义的获取列表的配置
        methods, //用户定义的方法
        watch, //用户定义的watch
        mutations, //用户定义的需要使用的mutations
        states, //用户需要使用的states
        computed, //用户需要使用的计算属性
        beforeCreate,
        created,
        beforeMount,
        mounted,
        beforeUpdate,
        updated,
        beforeDestroy,
        destroyed,
        components, //组件的相关配置
        mixins, //mixins相关的配置
    } = jsConfig || {};
    const { computed: preComputed, watch: preWatches, methods: preMethods } = vueOptions || {};
    const processConfigs = jsPluginsMap.get(type);
    if (!processConfigs) {
        return '';
    }
    let returnString = '';
    processConfigs.forEach(({ configName, func }: any) => {
        returnString += func({
            [configName]: jsConfig[configName],
            name,
            props,
            data,
            ndata,
            getList,
            methods,
            watch,
            mutations,
            states,
            computed,
            beforeCreate,
            created,
            beforeMount,
            mounted,
            beforeUpdate,
            updated,
            beforeDestroy,
            destroyed,
            components,
            mixins,
            preComputed,
            preWatches,
            preMethods,
        });
    });
    return returnString;
}

//生成一个通过对象生成一个字符串的map
function generateStringByMap (
    obj: Record<string, any> = {}, //传入的对象
    returnFunc: (key: string, originVal: any, stringValue: string) => string, //生成单个字符串的规则方法
    isDelete = false, //是否要删除
    deleteMap?: Record<string, any> //删除的映射
): Array<any> {
    const stringArr = Object.entries(obj).map(([key, val]) => {
        if (isDelete && deleteMap && deleteMap[key]) {
            delete deleteMap[key];
        }
        const stringValue = transformAllTypesToString(val);
        return returnFunc(key, val, stringValue);
    });
    return stringArr;
}

//处理 props 支持多类型
function processProps (props: Props | undefined | Record<string, any>): string | void {
    if (!props) {
        return;
    }
    const propsString: Array<string> = generateStringByMap(
        props,
        (key, originVal, stringValue) => {
            if (originVal.type && originVal.default) {
                return `${key}:{type:[${originVal.type.map((type: any) => type.name)}],default(){return ${transformAllTypesToString(originVal.default)}}}`;
            } else {
                return `${key}:{type:${toRawType(originVal)},default(){return ${stringValue}}}`;
            }
        },
        false
    );

    return propsString.join(',');
}

//处理 data
function processData (data: Record<string, any> | undefined, getList: Array<GetListConfig> | undefined): string {
    if (!data && !getList) {
        return '';
    }
    let loadingData = '';
    getList?.forEach(({ loading, list }) => {
        if (loading && data && !data[list + 'Loading']) {
            loadingData += `${list + 'Loading'}:false,`;
        }
    });
    const dataString: Array<string> = generateStringByMap(
        data,
        (key, originVal, stringValue) => {
            return `${key}:${stringValue}`;
        },
        false
    );

    return dataString.join(',') + (loadingData ? ',' + loadingData : '');
}

//处理 没有响应性的数据
function processNoReactiveData (ndata: Record<string, any> = {}): string {
    const ndataString: Array<string> = generateStringByMap(
        ndata,
        (key, originVal, stringValue) => {
            return `this.${key}=${stringValue}`;
        },
        false
    );
    return ndataString.join(';');
}

//处理computed
function processComputed (computed: Record<string, any> = {}, preComputed: any = {}): string {
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
function processWatch (watch: Record<string, any> = {}, preWatches: any = {}, getList: Array<GetListConfig> = []): string {
    const watchToGetListMap = Object.create(null);
    getList.forEach(({ watch, list }) => {
        if (watch) {
            if (!watchToGetListMap[watch]) {
                watchToGetListMap[watch] = [list];
            } else {
                watchToGetListMap[watch].push(list);
            }
        }
    });

    const watchToGetListString: Array<string> = Object.entries(watchToGetListMap).map(([key, val]: any) => {
        let preContent = '';
        let isObj = false;
        if (watch[key]) {
            if (watch[key].handler) isObj = true;
            preContent = getFunctionContent(watch[key]) || getFunctionContent(watch[key].handler);
        }
        return !isObj
            ? `'${key}'(){${val
                  .map((list: any) => {
                      return `this.getDataList('${list}');`;
                  })
                  .join('')}${preContent}},`
            : `'${key}':{
                    handler(){
                    ${val
                        .map((list: any) => {
                            return `this.getDataList('${list}');`;
                        })
                        .join('')}${preContent}},
                    ${typeof watch[key].deep === 'boolean' ? 'deep:' + (watch[key].deep ? 'true,' : 'false,') : ''}
                    ${typeof watch[key].immediate === 'boolean' ? 'immediate:' + (watch[key].immediate ? 'true' : 'false') : ''}},
                 `;
    });
    const watchString: Array<string> = Object.entries(watch)
        .filter(([key]: any) => !watchToGetListMap[key])
        .map(([key, val]: any) => {
            if (preWatches[key] || watchToGetListMap[key]) {
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
                    ${typeof val.deep === 'boolean' ? 'deep:' + (val.deep ? 'true,' : 'false,') : ''}
                    ${typeof val.immediate === 'boolean' ? 'immediate:' + (val.immediate ? 'true' : 'false') : ''}
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
                    ${typeof val.deep === 'boolean' ? 'deep:' + (val.deep ? 'true,' : 'false,') : ''}
                    ${typeof val.immediate === 'boolean' ? 'immediate:' + (val.immediate ? 'true' : 'false') : ''}
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
function processGetListFunc (
    getList: Array<GetListConfig> = [], //获取列表的相关配置
    preMethods: any = {} //文件之前的methods内容
) {
    //如果之前的文件内容存在了生成的getDataList了 那就先删除掉
    if (preMethods.getDataList) {
        delete preMethods.getDataList;
    }

    //最终的刷新配置
    const finalPageChangeConfig: Array<any> = [];

    //接口相关的switch语句
    let axiosSwitchCase = 'switch (type) {';

    //总数相关的switch语句
    let totalLoadingResultSwitchCase = 'switch (type) {';

    //是否存在total的设置
    let hasTotalLoadingResult = false;

    getList.forEach(
        ({
            axios, //接口
            params, //请求参数
            list, //存储结果的对象
            pageChange, //刷新配置
            loading, //是否记录加载状态
            total, //总数
            handleRes,
            result, //返回对应的字段 默认是res.obj
        }) => {
            //如果存在刷新配置就加入
            if (pageChange) {
                finalPageChangeConfig.push({ ...pageChange, list });
            }
            if (total || loading || result || handleRes) {
                hasTotalLoadingResult = true;
            }

            totalLoadingResultSwitchCase += `case '${list}': 
            ${total ? `this.${list}Total = res.total;` : ''}
            ${loading ? `this.${list}Loading = false;` : ''}
            ${result ? `this[type] = ${result || 'res.obj'};` : ''}
            ${handleRes ? handleRes : ''}
            break;`;
            axiosSwitchCase += ` case '${list}':
        ${loading ? 'this.' + list + 'Loading = true' : ''}
        action = $http.${axios};
        ${
            params
                ? typeof params === 'string'
                    ? 'params = ' + params
                    : 'params = {' +
                      Object.entries(params)
                          .map(([key, val]) => {
                              return `${key}:${val}`;
                          })
                          .join(',') +
                      '}'
                : ''
        }
        break;`;
        }
    );

    //如果之前写了pageChange 方法 并且当前配置了 刷新配置
    if (preMethods.pageChange && finalPageChangeConfig?.length) {
        delete preMethods.pageChange;
    }
    axiosSwitchCase += `
    default:
        break;
    }`;
    totalLoadingResultSwitchCase += `
    default:
        break;
    }`;
    return `
    async getDataList (type) {
        let action,params;
        ${axiosSwitchCase}
        try {
            let res = await action(params);
            if (res.success) {
                ${hasTotalLoadingResult ? totalLoadingResultSwitchCase : 'this[type] = res.obj;'}
            }
        } catch (e) {
            console.log(e); //eslint-disable-line
        }
    }${
        finalPageChangeConfig?.length
            ? ',' +
              `pageChange({pageNo,pageSize}){
        this.searchParam.pageNo=pageNo;
        this.searchParam.pageSize=pageSize;
        ${
            finalPageChangeConfig.filter((config) => config.get).length
                ? finalPageChangeConfig
                      .filter((config) => config.get)
                      .map(({ list, getListFunc }) => {
                          return getListFunc ? getListFunc : `this.getDataList("${list}")`;
                      })
                      .join(';')
                : ''
        }}`
            : ''
    }`;
}

//处理方法相关
function processMethods (methods: Record<string, any> = {}, preMethods: any = {}): string {
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

//解析mutations配置
async function parseMutations (mutations: Array<MutationsConfig> | undefined) {
    if (!mutations) {
        return;
    }
    for (const {
        store, //mutation 对应的store文件地址
        data = [], //需要使用的mutations
    } of mutations) {
        //生成的文件名称
        const fileName: string = getFilePathLastPathBySlash(store);

        //文件存储的路径
        const storePath: string = path.resolve(process.cwd(), 'src/store/' + store.replace(new RegExp(`${fileName}$`), ''));

        let preStoreFileInfo: StoreFileInfo = {};

        try {
            //import(path.join('file://',path.resolve(storePath, fileName+'.js')))
            //import(path.resolve(storePath, fileName));
            preStoreFileInfo = await import(path.join('file://', path.resolve(storePath, fileName + '.js')));
        } catch (e) {
            console.log(`读取store文件${storePath}失败,尝试读取缓存`);
            try {
                preStoreFileInfo = await import(path.join('file://', path.resolve(path.join(process.cwd(), 'fastCodeCache/store'), fileName.replace(/\\/g, '-') + '.js')));
            } catch (e) {
                console.log('不存在缓存文件或读取缓存文件失败');
            }
        }

        //生成的state代码
        let stateString: any = '';

        //mutations
        let mutationString: any = '';

        //先根据用户定义的data 去生成相关的 state 和 mutations
        Object.entries(data).forEach(([key, val]) => {
            //遍历用户定义的data
            const value: any = transformAllTypesToString(val);

            stateString += `${key}:${value},`;

            mutationString += `update${key.replace(/^./, key[0].toUpperCase())} (state,${key}){state.${key} = ${key}},`;
        });

        let preStateString: any = '';

        let preMutationString: any = '';

        const storeOptions: StoreOptions = preStoreFileInfo?.default || {};

        const { namespaced: preNamespaced = true, getters: preGetters = null, actions: preActions = null } = storeOptions;
        if (preStoreFileInfo?.default?.state) {
            //去遍历原有文件的state信息 将不存在用户定义在data中的代码进行拼接
            Object.entries(preStoreFileInfo.default.state).forEach(([key, val]) => {
                if (!(key in data)) {
                    const value: any = transformAllTypesToString(val);
                    preStateString += `${key}:${value},`;
                }
            });

            if (preStoreFileInfo?.default?.mutations) {
                //去遍历原有文件的mutations信息 将不存在用户定义在data中的代码进行拼接
                Object.entries(preStoreFileInfo.default.mutations).forEach(([key, val]) => {
                    const filed = key.replace(/^update/, '');
                    const originFiled = filed.replace(/^./, filed[0].toLowerCase());
                    if (!(originFiled in data)) {
                        preMutationString += `${val},`;
                    }
                });
            }
        }

        //向原有的文件输出文件
        const storeString = `
        export default {
            ${preNamespaced ? 'namespaced:' + preNamespaced : ''},
            state: {${stateString}${preStateString}},
            ${preGetters ? 'getters:' + preGetters + ',' : ''}
            mutations: {${mutationString}${preMutationString}},
            ${preActions ? 'actions:' + preActions + ',' : ''}
        };
        `;
        fileEmitter(storePath, fileName + '.js', js_beautify(storeString));
        fileEmitter(path.join(process.cwd(), 'fastCodeCache/store'), fileName.replace(/\\/g, '-') + '.js', js_beautify(storeString));
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
            return `...mapState(${store === 'state' ? '' : '\'' + store.split('/')[store.split('/').length - 1] + '\','}[${data.map((item: string) => `'${item}'`).join(',')}])`;
        })
        .join(',');
}

//处理组件
function processComponents (components: any) {
    return components ? components.join(',') : '';
}

//处理mixins
function processMixins (mixins: any) {
    return mixins ? mixins.join(',') : '';
}
