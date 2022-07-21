//html的代码格式化配置
const htmlBeautifyConfig: js_beautify.HTMLBeautifyOptions = {
    indent_size: 4, //换行缩进
    end_with_newline: true,
    wrap_attributes: 'force-expand-multiline',
    indent_empty_lines: true,
    preserve_newlines: false,
};
//css的代码格式化配置
const cssBeautifyConfig: js_beautify.CSSBeautifyOptions = {
    indent_size: 4, //换行缩进
    end_with_newline: true,
    indent_empty_lines: true,
    preserve_newlines: false,
};

export { htmlBeautifyConfig, cssBeautifyConfig };
