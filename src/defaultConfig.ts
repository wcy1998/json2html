/*
 * @Author: your name
 * @Date: 2022-04-02 11:30:30
 * @LastEditTime: 2022-04-19 19:34:15
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\defaultConfig.ts
 */
import { FastCodeConfig } from './types/vue';

//去生成默认的配置
export function generateDefaultConfig (FastCodeConfig: FastCodeConfig): FastCodeConfig {
    const { frame = 'vue', base = ' ', mixinCss = false } = FastCodeConfig;
    return { ...FastCodeConfig, frame, base, mixinCss };
}
