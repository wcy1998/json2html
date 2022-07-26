import { generateCodeByFastCodeConfig } from './generateCodeByFastCodeConfig.js';
import { parseFile2FastCodeConfig } from './parseFile2FastCodeConfig.js';
import { generateCodeByAxiosConfig } from './generateCodeByAxiosConfig.js';
import { parseFigma2FastCodeConfig } from './parseFigma2FastCodeConfig.js';

export {
    generateCodeByFastCodeConfig, //通过配置生成文件
    parseFile2FastCodeConfig, //解析智能生成的代码变成fastCodeConfig
    generateCodeByAxiosConfig, //生成接口文件
    parseFigma2FastCodeConfig, //通过figma的样式字段生成fastCodeConfig
};
