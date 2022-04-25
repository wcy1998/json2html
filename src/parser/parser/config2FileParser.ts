//将配置转换成文件的解析器
export default interface Config2FileParser {
    //eslint-disable-next-line
    parseHtmlConfig(htmlConfig: any, usedCssMixin: any): void
    //eslint-disable-next-line
    parseCssConfig(cssConfig: any): void
    //eslint-disable-next-line
    parseJsConfig(jsConfig: any): void
}
