/*
 * @Author: your name
 * @Date: 2022-04-11 11:50:09
 * @LastEditTime: 2022-04-11 14:11:10
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\cli.js
 */
const { Command } = require('commander');
const os = require('os')
const program = new Command();

console.log(2222, os.homedir())

program.version('1.0.17'); //设置当前项目的版本 通过-V 显示

program
    .option('-v, --version', 'fastCode version')
    .option('-m, --mode <mode...>', 'vue or react', 'vue') //可选长度的参数
    .option('-b, --basePath <path>', 'output basePath', 'sss')
    .requiredOption('-s, --start') //必须要输入的选项


const options = program.opts();

if (options.version) console.log('fastCodeVersion -- 1.0.7');
if (options.mode) console.log('run mode --' + options.mode);
if (options.basePath) console.log('output basePath --', options.basePath);

program
    .command('add <first>')
    .action((first) => {
        console.log(`${first} + ${333} = ${first + 444}`);
    });

program.parse(process.argv);

console.log(2222, os.homedir())