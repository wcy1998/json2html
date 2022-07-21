//類型
import { axiosConfig } from './types/vue';
//一些轉換的方法
import { emitCodeByAxiosConfig } from '../src/transform-help/vue/index';
//生成接口文件
export function generateCodeByAxiosConfig (axiosConfigs: Array<axiosConfig>) {
    emitCodeByAxiosConfig(axiosConfigs);
}
