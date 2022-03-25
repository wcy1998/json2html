/*
 * @Author: your name
 * @Date: 2022-03-24 13:40:42
 * @LastEditTime: 2022-03-25 15:58:59
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\transform-help\css-help.ts
 */
import { htmlConfig } from '../types/vue/config';

//将json配置转换成css组成的字符串
export const json2css = (htmlConfig: htmlConfig | undefined, cssTemplateConfig: any, isRoot: boolean): string => {
    if (!htmlConfig) {
        return '';
    }
    const { clazz, style = '', cssMixin = '' } = htmlConfig;
    console.log(cssMixin);
    // extractCommonStyles(style,cssTemplateConfig)

    console.log(cssTemplateConfig[cssMixin[0]]);

    const styleString: string | undefined = style?.split(';').join(';');

    const childNodeJson: Array<htmlConfig> | undefined = htmlConfig?.children;

    return childNodeJson
        ? clazz
            ? `
                ${
                    isRoot && cssMixin
                        ? cssMixin.map(
                              (mixin: string) => `@mixin ${mixin}{
                 ${Object.entries(cssTemplateConfig[mixin])
                     .map(([key, val]) => key + ':' + val)
                     .join(';')}
                }`
                          )
                        : ''
                }
                .${clazz}{
                     ${cssMixin ? cssMixin.map((mixin: string) => `@include ${mixin} ;`) : ''}
                     ${styleString ? styleString + ';' : ''}
                     
                     ${childNodeJson.map((child) => json2css(child, cssTemplateConfig, false)).join('')}

                 }
        `
            : `${childNodeJson.map((child) => json2css(child, cssTemplateConfig, false)).join('')}`
        : clazz
        ? `
        ${
            isRoot && cssMixin
                ? cssMixin.map(
                      (mixin: string) => `@mixin ${mixin}{
            ${Object.entries(cssTemplateConfig[mixin])
                .map(([key, val]) => key + ':' + val)
                .join(';')}
           }`
                  )
                : ''
        }
        .${clazz}{
            ${cssMixin ? cssMixin.map((mixin: string) => `@include ${mixin} ;`) : ''}
            ${styleString ? styleString + ';' : ''}
        }      
        `
        : '';
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
