/*
 * @Author: your name
 * @Date: 2022-03-23 13:23:46
 * @LastEditTime: 2022-04-06 18:02:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\shared\constants.ts
 */

//一元标签
export const unaryTag = 'embed,img,image,input,link,meta,area,base,br,col,frame,hr,isindex,keygen,param,source,track,wbr';

//vue内置的一些属性写法
export const vueBuiltInAttribute = 'clazz,:clazz,vFor,vIf,vElse,vElseIf';

//一些不会被当做属性保留在dom中的
export const notRetainedAttribute = 'tag,children,text,style,cssMixin';

//左开标签
export const canBeLeftOpenTag = 'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source';

//vue的一些内置写法的属性
export const vueTemplateAttributesMap: Map<string, string> = new Map(
    Object.entries({
        clazz: 'class=',
        ':clazz': ':class=',
        vFor: 'v-for=',
        vIf: 'v-if=',
        vElse: 'v-else',
        vElseIf: 'v-else-if=',
    })
);

//svg标签
export const svgTag: string =
    'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
    'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
    'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view';

//不会解析的标签
export const isNonPhrasingTags =
    'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
    'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
    'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
    'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
    'title,tr,track';
