import fs from 'fs';
import path from 'path';

//输出文件
export function fileEmitter (
    filePath: string, //生成的文件路径
    fileName: string, //生成的文件名称
    file: any //文件的内容
): void {
    mkdir(filePath, () => {
        if (fs.existsSync(filePath)) {
            //异步写入文件 如果文件不存在，则创建文件；如果文件存在，则覆盖文件内容；
            fs.writeFileSync(path.resolve(filePath, fileName), file, 'utf8');
        } else {
            fs.mkdirSync(path.dirname(filePath));
        }
    });
}

//创建文件 递归创建目录 异步方法
export function mkdir (dirname: string, callback: () => void) {
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
