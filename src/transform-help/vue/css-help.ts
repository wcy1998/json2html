/*
 * @Author: your name
 * @Date: 2022-04-07 15:24:42
 * @LastEditTime: 2022-05-30 13:16:35
 * @LastEditors: Wcy1998 cywu3@leqee.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\transform-help\vue\css-help.ts
 */

import { HtmlConfig } from '../../types/vue';

//将json配置转换成css组成的字符串
//解析css的时候还是需要 html中的一些样式相关的属性的
export const json2css = (
    htmlConfig: HtmlConfig | undefined, //生成html的配置
    cssTemplateConfig: any, //css模板
    isRoot: boolean, //是不是根节点
    usedCssMixin: Array<string> //使用过的那些cssMixin 因为mixin需要放在最开头
): string => {
    //如果不存在就 返回空字符串
    if (!htmlConfig) {
        return '';
    }

    //解析css中一些需要的属性 clazz style  cssMixin  tag
    const {
        clazz: clazz2, //元素类
        style = '', //元素样式
        hoverStyle = '', //hover的样式
        cssMixin = '', //元素使用的mixins
        tag, //元素的标签
    } = htmlConfig;

    // extractCommonStyles(style,cssTemplateConfig)

    //先保存在之前的样式
    let clazz = clazz2;

    //判断当前的 元素时候写了 cssMixins 或者 style
    const noClassStyle = !!(!clazz && (style || cssMixin));

    if (noClassStyle) {
        //如果没有设置class 就使用标签名来命名
        clazz = `>${tag}`;
    } else if (clazz) {
        clazz = `.${clazz}`;
    }

    //将style中的属性 处理成css格式的字符串
    let styleString: string = style;
    const hoverStyleString: string = hoverStyle;

    styleString && !/;$/.test(styleString.trim()) && (styleString += ';');

    //是否存在子节点
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
                     ${hoverStyleString ? '&:hover{' + hoverStyleString + '}' : ''}     
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
