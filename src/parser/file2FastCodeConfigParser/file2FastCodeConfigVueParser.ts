//将智能代码转换成配置的解析器
import { FastCodeConfig } from '../../types/vue';
import File2FastCodeConfigParser from './file2FastCodeConfigParser';
import { isPlainTextElement, isNonPhrasingTag, canBeLeftOpenTag, isUnaryTagFnc } from '../../shared/judgeFunc';
import { endTag, startTagOpen, startTagClose, dynamicArgAttribute, attribute, cssReg } from '../../regex';

export default class File2FastCodeConfigVueParser implements File2FastCodeConfigParser {
    parsedConfig: FastCodeConfig;
    currentParent: any; //当前的父标签
    reCache: any;
    root: any; //根标签
    stack: any; //栈1
    stack2: any; //栈2
    index: any; //当前解析字符到哪里了
    last: any; //上一次解析的内容
    lastTag: any; //上一次解析的标签
    html: any; //被解析的html
    css: any;
    cssMap: any;

    constructor (html: string, css: string, pagePath: string) {
        this.currentParent = null;
        this.root = null;
        this.stack = []; //解析好的标签
        this.stack2 = []; //正在解析的标签
        this.lastTag;
        this.html = html;
        this.css = [...css.replace(/\n/g, '').matchAll(cssReg)];
        this.cssMap = new Map();
        this.css.forEach((item: any) => {
            this.cssMap.set(item[1], item[2]);
        });
        this.parsedConfig = this.transformFile2Config(pagePath);
    }

    transformFile2Config (pagePath: string): FastCodeConfig {
        this.transformHtml2HtmlConfig();
        return {
            frame: 'vue',
            base: 'src/json2html',
            snippetsPath: 'C:/Users/cywu3/AppData/Roaming/Code/User/snippets',
            pagesConfig: [
                {
                    path: pagePath,
                    htmlConfig: this.root,
                },
            ],
        };
    }

    //处理闭合标签信息
    closeElement (element: any) {
        if (this.currentParent) {
            //如果存在父节点环境
            !this.currentParent.children && (this.currentParent.children = []);
            this.currentParent.children.push(element);
        }
    }

    start (tag: any, attrs: any, unary: any) {
        const htmlConfig: any = {};

        attrs.forEach(({ name, value }: any) => {
            if (name === 'class') {
                htmlConfig.clazz = value.replace(/\s/g, '');
                htmlConfig.style = '';
                value.split(' ').forEach((item: any) => {
                    if (this.cssMap.get(item)) htmlConfig.style += this.cssMap.get(item) + ';';
                    htmlConfig.style = `${htmlConfig.style.trim().replace(/;$/, '')}`;
                });
            } else {
                htmlConfig[name] = value;
            }
        });
        htmlConfig.tag = tag;

        if (!this.root) {
            //如果不存在root
            this.root = htmlConfig; //记录当前template解析出来的第一个开始标签为根节点
        }

        if (!unary) {
            //如果当前节点不是单闭和标签

            this.currentParent = htmlConfig;

            this.stack.push(htmlConfig); //向栈中推入该元素
        } else {
            //如果当前节点是单闭和标签
            //进行关闭操作
            this.closeElement(htmlConfig);
        }
    }

    //处理接续标签
    end () {
        //获取栈顶元素
        const element = this.stack[this.stack.length - 1];

        // 弹出栈顶元素
        this.stack.length -= 1;

        //将当前的父级元素设置为 新的栈顶元素
        this.currentParent = this.stack[this.stack.length - 1];

        this.closeElement(element);
    }

    //解析结束标签
    parseEndTag (tagName: string) {
        let pos; //当前闭合标签对应的打开标签在 栈中的位置

        if (tagName) {
            //如果结束标签中存在内容

            //从 stack2 中的栈顶去寻找与当前标签匹配的位置
            for (pos = this.stack2.length - 1; pos >= 0; pos--) {
                if (this.stack2[pos].tag === tagName) {
                    break;
                }
            }
        } else {
            pos = 0;
        }

        if (pos >= 0) {
            //如果找到了栈中对应的标签了

            for (let i = this.stack2.length - 1; i >= pos; i--) {
                //从栈顶将该标签的子标签都进行结束处理
                this.end();
            }

            //弹出被解析的那些标签
            this.stack2.length = pos;

            //重新设置上一次解析的标签
            this.lastTag = pos && this.stack2[pos - 1].tag;
        } else if (tagName === 'br') {
            //如果没有对应的标签
            this.start(tagName, [], true);
        } else if (tagName === 'p') {
            this.start(tagName, [], false);
            this.end();
        }
    }

    //解析完开始标签的内容后进行处理
    handleStartTag (match: any) {
        const tagName = match.tagName; //开始标签名

        const unarySlash = match.unarySlash; //当前开始标签是否是单闭合标签

        if (this.lastTag === 'p' && isNonPhrasingTag(tagName)) {
            //如果上次解析的是p标签 且这次是指定的内容
            this.parseEndTag(this.lastTag);
        }
        if (canBeLeftOpenTag(tagName) && this.lastTag === tagName) {
            //如果是 左开标签 且上次解析的就是这个标签时
            this.parseEndTag(tagName);
        }

        //判断当前开始标签是不是单闭合标签
        const unary = isUnaryTagFnc(tagName) || !!unarySlash;

        //获取当前标签中属性的个数
        const l = match.attrs.length;

        //创建一个保存属性的数组
        const attrs: any = new Array(l);

        for (let i = 0; i < l; i++) {
            //遍历当前标签内的属性内容
            const args = match.attrs[i];

            //获取属性值
            const value = args[3] || args[4] || args[5] || '';

            //根据shouldDecodeNewlines 解析下属性的内容
            attrs[i] = {
                name: args[1], //属性的名称
                value: value,
            };
        }

        if (!unary) {
            //如果不是单闭和标签是 向 当前栈推入当前开始标签的信息
            this.stack2.push({
                tag: tagName, //当前开始标签的标签名
                attrs: attrs, //当前开始标签的属性内容
                start: match.start, //当前开始标签的开始位置
                end: match.end, //当前开始标签的结束位置
            });

            this.lastTag = tagName; //将当前的开始标签 记录为上一次解析的标签
        }
        //根据开始标签生成 ast节点 模板
        this.start(tagName, attrs, unary);
    }

    //向前移动被解析的html
    advance (n: number) {
        this.html = this.html.substring(n);
    }

    //解析开始标签中的内容
    parseStartTag () {
        //匹配开始标签内容
        const start = this.html.match(startTagOpen);
        if (start) {
            const match: any = {
                tagName: start[1], //标签名
                attrs: [], //标签中 属性的匹配数组
                unarySlash: '', //自闭和标签信息
            };

            //移除html开始标签的内容
            this.advance(start[0].length);

            let end: any, //结束标签的匹配信息
                attr: any; //每个属性的位置信息

            //通过循环 获取 每一个属性的内容 和 位置信息
            while (!(end = this.html.match(startTagClose)) && (attr = this.html.match(dynamicArgAttribute) || this.html.match(attribute))) {
                //移除属性的内容
                this.advance(attr[0].length); //移除属性内容
                match.attrs.push(attr);
            }

            if (end) {
                //如果时自闭和标签
                match.unarySlash = end[1];
                this.advance(end[0].length);
                return match;
            }
        }
    }

    //将html解析成htmlConfig
    private transformHtml2HtmlConfig () {
        while (this.html) {
            if (!this.lastTag || !isPlainTextElement(this.lastTag)) {
                //上一次解析的标签不存在 或者 不是script，style，textarea这样的标签时

                //寻找当前html中第一个 < 的位置
                let textEnd = this.html.indexOf('<');

                if (textEnd === 0) {
                    //如果当前的html是以 < 开头的
                    const endTagMatch = this.html.match(endTag);

                    if (endTagMatch) {
                        //移除结束标签部分
                        this.advance(endTagMatch[0].length);
                        //开始解析结束标签里的内容
                        this.parseEndTag(endTagMatch[1]);
                        continue;
                    }

                    //是一个开始标签时
                    //返回开始标签的匹配信息 包括标签内的属性 和 是否是自闭和标签的信息
                    const startTagMatch = this.parseStartTag();

                    if (startTagMatch) {
                        //开始处理开始标签的内容
                        this.handleStartTag(startTagMatch);
                        continue;
                    }
                }

                //处理标签内的文本内容
                let text, //标签内的文本内容
                    rest, // <之后的内容
                    next; //第一个< 之后下一个<的位置

                if (textEnd >= 0) {
                    //寻找下一个<的位置 之前的都是文本内容

                    //获取文本内容
                    rest = this.html.slice(textEnd);

                    while (
                        !endTag.test(rest) && //当<开头的字符串不是 以结束标签开始的
                        !startTagOpen.test(rest) //当<开头的字符串不是 以开始标签开始的
                    ) {
                        //处理一下文本中的内容
                        next = rest.indexOf('<', 1);

                        if (next < 0) break;
                        textEnd += next;
                        rest = this.html.slice(textEnd);
                    }

                    text = this.html.substring(0, textEnd); //截取出下一个标签前的文本内容
                }

                if (textEnd < 0) {
                    //如果剩余内中没有<符号了 说明剩余的内容都是文本了
                    text = this.html;
                }

                if (text) {
                    //如果存在文件 截取html
                    this.advance(text.length);
                }

                const _text = text.replace(/\n/g, '').trim();

                _text && (this.currentParent.text = _text);
            }
        }
    }
}
