/*
 * @Author: your name
 * @Date: 2022-04-25 10:13:19
 * @LastEditTime: 2022-04-25 11:29:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\transform-help\index.ts
 */
//eslint-disable-next-line
import fs from 'fs'
//eslint-disable-next-line
import path from 'path'

//输出文件
export function fileEmitter (filePath: string, fileName: string, file: any): void {
    mkdir(filePath, () => {
        if (fs.existsSync(filePath)) {
            //异步写入文件 如果文件不存在，则创建文件；如果文件存在，则覆盖文件内容；
            fs.writeFileSync(path.resolve(filePath, fileName), file, 'utf8');
        } else {
            fs.mkdirSync(path.dirname(filePath));
        }
    });
}

function mkdir (dirname: string, callback: () => void) {
    fs.exists(dirname, function (exists: any) {
        if (exists) {
            callback();
        } else {
            mkdir(path.dirname(dirname), function () {
                fs.mkdir(dirname, callback);
            });
        }
    });
}
