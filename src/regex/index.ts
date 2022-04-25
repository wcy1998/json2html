/*
 * @Author: your name
 * @Date: 2022-04-07 15:24:42
 * @LastEditTime: 2022-04-25 10:22:03
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\regex\index.ts
 */

//项目中所使用的一些正则

export const unicodeLetters = 'a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD';
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeLetters}]*`;

const qnameCapture = `((?:${ncname}\\:)?${ncname})`;

//eslint-disable-next-line
export const comment = /^<!\--/ //判断当前html是不是以<!-- 开头

export const doctype = /^<!DOCTYPE [^>]+>/i; //判断是不是<!doctype>标签

export const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); //匹配结束标签

export const ieNSBug = /^xmlns:NS\d+/;
export const ieNSPrefix = /^NS\d+:/;

export const startTagOpen = new RegExp(`^<${qnameCapture}`); //是不是左开标签

export const startTagClose = /^\s*(\/?)>/; //是不是单元标签

//eslint-disable-next-line
export const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/ //是不是动态属性

//eslint-disable-next-line
export const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/ //是不是属性

//eslint-disable-next-line
export const cssReg = /\.([^\{]{1,}) \{([^\}]*)/g //匹配css用的正则

//替换axios文件路径
export const axiosReg = /^\/easybi\//;
