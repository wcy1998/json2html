//将智能代码转换成配置的解析器
export default interface File2FastCodeConfigParser {
    transformFile2Config(html: string, css: string, pagePath: string): any
}
