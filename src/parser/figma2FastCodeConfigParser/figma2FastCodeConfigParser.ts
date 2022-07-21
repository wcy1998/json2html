//将智能代码转换成配置的解析器
export default interface Figma2FastCodeConfigParser {
    uuid?: string
    transformFigma2Config(figmaJson: string): any
}
