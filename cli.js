const fs = require('fs')
const json2html = require('json2html-wcy')
fs.readFile('./lowcode.json', 'utf-8', (error, data) => {
    if (error) throw error;
    const jsonConfig = JSON.parse(data);
    const {
        htmlConfig, //html配置
    } = jsonConfig;

    json2html.exportFiles(htmlConfig);
});