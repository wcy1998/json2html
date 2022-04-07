/*
 * @Author: your name
 * @Date: 2022-03-24 13:40:42
 * @LastEditTime: 2022-04-07 15:22:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\transform-help\css-help.ts
 */
import { HtmlConfig } from '../../types/vue';

//将json配置转换成css组成的字符串
export const json2css = (htmlConfig: HtmlConfig | undefined, cssTemplateConfig: any, isRoot: boolean, usedCssMixin: Array<string>): string => {
    if (!htmlConfig) {
        return '';
    }
    const { clazz: clazz2, style = '', cssMixin = '', tag } = htmlConfig;

    // extractCommonStyles(style,cssTemplateConfig)
    let clazz = clazz2;
    const noClassStyle = !!(!clazz && (style || cssMixin));

    if (noClassStyle) {
        clazz = `>${tag}`;
    } else if (clazz) {
        clazz = `.${clazz}`;
    }

    let styleString: string = style?.split(';').join(';');
    !/;$/.test(styleString.trim()) && (styleString += ';');

    const childNodeJson: Array<HtmlConfig> | undefined = htmlConfig?.children;

    return clazz
        ? `
                ${
                    isRoot && usedCssMixin
                        ? usedCssMixin
                              .map(
                                  (mixin: string) => `@mixin ${mixin}{
                 ${Object.entries(cssTemplateConfig[mixin])
                     .map(([key, val]) => key + (key !== '&' ? ':' : '') + val)
                     .join(';')}
                }`
                              )
                              .join(' ')
                        : ''
                }
                ${clazz}{
                     ${cssMixin ? cssMixin.map((mixin: string) => `@include ${mixin} ;`).join('') : ''}
                     ${styleString ? styleString : ''}
                     
                     ${childNodeJson ? childNodeJson.map((child) => json2css(child, cssTemplateConfig, false, usedCssMixin)).join('') : ''}

                 }
        `
        : `${childNodeJson ? childNodeJson.map((child) => json2css(child, cssTemplateConfig, false, usedCssMixin)).join('') : ''}`;
};

/* function extractCommonStyles (style:string,cssTemplateConfig:object){
    let styleArr :Array<any>  = style?.split(';').map((item :string)=>{
        let arr :Array<string> = []
        arr[0] = item.split(':')[0]
        arr[1] = item.split(':')[1]
        return arr 
    }) || []
     
    let styleMap = new Map(styleArr)

    let cssTemplateConfigEntries = Object.entries(cssTemplateConfig)
      for ( let i = 0 ; i < cssTemplateConfigEntries.length ;i++){
        let matchCount = 0
        let mixinKey = cssTemplateConfigEntries[i][0]
        let mixinVal = cssTemplateConfigEntries[i][1]
        let valEntries = Object.entries(mixinVal)
        let oldStyleMap = cloneDeep(styleMap)
        for ( let j = 0 ; j < valEntries.length ;j++){
            let styleKey = valEntries[j][0]
            let styleVal = valEntries[j][1]
            if(styleMap.get(styleKey) == styleVal){
                matchCount ++
                styleMap.delete(styleKey)
                if(matchCount === (valEntries.length-1)){
                    styleMap.set(`${mixinKey}`,`@include ${mixinKey.replace('@','')};`)
                    break;
                }
            }else{
                styleMap = oldStyleMap
                break;
            }   
        }
      }
} */
