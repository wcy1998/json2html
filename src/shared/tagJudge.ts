/*
 * @Author: your name
 * @Date: 2022-03-24 14:12:57
 * @LastEditTime: 2022-03-24 14:12:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \json2htmltest\src\shared\tagJudge.ts
 */
import { makeMap } from './utils';
import { unaryTag } from './constants';
export const isUnaryTagFnc = makeMap(unaryTag, true);
