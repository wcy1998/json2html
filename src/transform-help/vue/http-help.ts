/*
 * @Author: your name
 * @Date: 2022-04-25 10:08:22
 * @LastEditTime: 2022-04-25 11:39:31
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\transform-help\vue\http-help.ts
 */

import { axiosConfig } from '../../types/vue';
import { fileEmitter } from '../file-help';
import { axiosReg } from '../../regex';
//eslint-disable-next-line
import path from 'path'
//eslint-disable-next-line
import fs from 'fs'
//eslint-disable-next-line
import process from 'process'
//输出文件
export function emitAxiosFiles (axiosConfigs: Array<axiosConfig>) {
    fs.readFile(path.resolve(process.cwd(), 'src/axios/interface.js'), 'utf-8', (err: any, data: any) => {
        if (err) throw err;
        const interfaceFileContent = data;
        let interfaces = '';
        axiosConfigs.forEach(({ url, type, mark = '' }) => {
            const basePath: string = path.resolve(process.cwd(), 'src/axios');
            const relativePath: string = url.replace(axiosReg, '');
            const urlPath: string = path.resolve(basePath, relativePath);
            const relativePathArr: Array<string> = relativePath.split('/');
            let axiosName = '';
            for (let i = relativePathArr.length - 1; i > 0; i--) {
                axiosName += i === relativePathArr.length - 1 ? relativePathArr[i] : relativePathArr[i].replace(/^./, relativePathArr[i][0].toLocaleUpperCase());
            }

            const fileContent = `
             import { server } from '@/axios';
             export function ${axiosName} (params) {
                 return server({
                     url: '${relativePath}',
                     method: '${type}',
                     params,
                 });
             }`;

            interfaces += `export { ${axiosName} } from '@/axios/${relativePath}'; //${mark}
            `;
            fileEmitter(urlPath, 'index.js', fileContent);
        });
        fileEmitter(path.resolve(process.cwd(), 'src/axios'), 'interface.js', interfaceFileContent + interfaces);
    });
}
