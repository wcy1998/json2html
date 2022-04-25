/*
 * @Author: your name
 * @Date: 2022-04-07 15:24:42
 * @LastEditTime: 2022-04-19 19:48:08
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\transform-help\vue\css-help.ts
 */

import { HtmlConfig } from '../../types/vue';

//将json配置转换成css组成的字符串
//解析css的时候还是需要 html中的一些样式相关的属性的
export const json2css = (
    htmlConfig: HtmlConfig | undefined, //生成html的配置
    cssTemplateConfig: any, //css模板
    isRoot: boolean, //是不是更节点
    usedCssMixin: Array<string> //使用过的那些cssMixin 因为mixin需要放在最开头
): string => {
    if (!htmlConfig) {
        return '';
    }

    //解析css中一些需要的属性 clazz style  cssMixin  tag
    const { clazz: clazz2, style = '', cssMixin = '', tag } = htmlConfig;

    // extractCommonStyles(style,cssTemplateConfig)
    let clazz = clazz2;

    const noClassStyle = !!(!clazz && (style || cssMixin));

    //如果没有设置class 就使用标签名来命名
    if (noClassStyle) {
        clazz = `>${tag}`;
    } else if (clazz) {
        clazz = `.${clazz}`;
    }

    //将style中的属性 处理成css格式的字符串
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

/* TODO function extractCommonStyles (style:string,cssTemplateConfig:object){
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
