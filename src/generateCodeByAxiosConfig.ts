//類型
import { axiosConfig } from './types/vue/index.js';
//一些轉換的方法
import { emitCodeByAxiosConfig } from '../src/transform-help/vue/index.js';
//生成接口文件
export function generateCodeByAxiosConfig (axiosConfigs: Array<axiosConfig>) {
    emitCodeByAxiosConfig(axiosConfigs);
}
