import Figma2FastCodeConfigParser from './figma2FastCodeConfigParser';
import { HtmlConfig } from '../../types/vue';

export default class Figma2FastCodeConfigVueParser implements Figma2FastCodeConfigParser {
    uuid?: string;
    constructor (id?: string) {
        this.uuid = id;
    }

    transformFigma2Config (figmaJson: string): any {
        const fastCodeHtmlConfig: HtmlConfig = {};

        function traverse (figmaConfig: any, fastCodeHtmlConfig: HtmlConfig, marginInfo: any) {
            const {
                style = {},
                frame: { width, height },
                type = null,
                children = null,
                textFragments = [],
                src,
            } = figmaConfig;
            let flexType = 'flex-row';

            if (children) {
                let preCalcTop = undefined;
                let preWidth;
                let preHeight;
                fastCodeHtmlConfig.children = [];
                for (let i = 0; i < children.length; i++) {
                    const childFigmaConfig = children[i];
                    const {
                        frame: { top: childrenTop, width: childrenWidth, left: childrenLeft, height: childrenHeight },
                        type: childrenType,
                    } = childFigmaConfig;
                    if (childrenType !== 'Text') {
                        if (preCalcTop !== childrenTop && i > 0 && typeof preCalcTop !== 'undefined') {
                            flexType = 'flex-column';
                        }
                        preCalcTop = childrenTop;
                    }
                    fastCodeHtmlConfig.children[i] = {};
                    let heightDiff;
                    let widthDiff;
                    if (i === 0) {
                        heightDiff = childrenTop;
                        widthDiff = childrenLeft;
                    } else {
                        heightDiff = flexType === 'flex-row' ? childrenTop : childrenTop - preHeight;
                        widthDiff = flexType === 'flex-column' ? childrenLeft : childrenLeft - preWidth;
                    }
                    preWidth = childrenLeft + childrenWidth;
                    preHeight = childrenTop + childrenHeight;
                    traverse(childFigmaConfig, fastCodeHtmlConfig.children[i], { top: heightDiff, left: widthDiff });
                }
            }

            switch (type) {
                case 'View':
                    fastCodeHtmlConfig.template = flexType === 'flex-row' ? '@rowContainer' : '@columnContainer';
                    !fastCodeHtmlConfig.$style && (fastCodeHtmlConfig.$style = {});
                    fastCodeHtmlConfig.$style.width = width + 'px';
                    fastCodeHtmlConfig.$style.height = height + 'px';
                    fastCodeHtmlConfig.$style.display = 'flex';
                    fastCodeHtmlConfig.$style.flexDirection = flexType === 'flex-row' ? 'row' : 'column';
                    break;
                case 'Text':
                    fastCodeHtmlConfig.tag = 'span';
                    fastCodeHtmlConfig.text = textFragments[0].text;
                    break;
                case 'Image':
                    fastCodeHtmlConfig.tag = 'img';
                    fastCodeHtmlConfig.src = src;
                    fastCodeHtmlConfig.$style.width = width + 'px';
                    fastCodeHtmlConfig.$style.height = height + 'px';
                    break;
                default:
                    break;
            }
            style && (fastCodeHtmlConfig.$style = { ...fastCodeHtmlConfig.$style, ...style });
            let styleString = '';
            const hyphenateRE = /\B([A-Z])/g;
            const hyphenate = (str: string): string => {
                return str.replace(hyphenateRE, '-$1').toLowerCase();
            };
            Object.keys(fastCodeHtmlConfig.$style).map((key) => {
                styleString += hyphenate(key) + ':' + fastCodeHtmlConfig.$style[key] + ';';
            });
            fastCodeHtmlConfig.style = styleString;
            // 连接驼峰式字符串
            const tempFastCodeHtmlConfig = fastCodeHtmlConfig.children;
            delete fastCodeHtmlConfig.children;
            fastCodeHtmlConfig.children = tempFastCodeHtmlConfig;
            marginInfo.left && (fastCodeHtmlConfig.$style.marginLeft = marginInfo.left + 'px');
            marginInfo.top && (fastCodeHtmlConfig.$style.marginTop = marginInfo.top + 'px');
        }

        traverse(JSON.parse(figmaJson), fastCodeHtmlConfig, {});

        function traverse2 (fastCodeHtmlConfig: any) {
            if (fastCodeHtmlConfig.children) {
                for (let i = 0; i < fastCodeHtmlConfig.children.length; i++) {
                    const element = fastCodeHtmlConfig.children[i];
                    traverse2(element);
                }
            }
            if (fastCodeHtmlConfig?.children?.length === 1 && fastCodeHtmlConfig.children[0].tag === 'span') {
                const tempChild = fastCodeHtmlConfig.children[0];
                fastCodeHtmlConfig.children = [];
                fastCodeHtmlConfig.text = tempChild.text;
                fastCodeHtmlConfig.$style.fontSize = tempChild.$style.fontSize;
                fastCodeHtmlConfig.$style.fontFamily = tempChild.$style.fontFamily;
                fastCodeHtmlConfig.$style.color = tempChild.$style.color;
                fastCodeHtmlConfig.$style.paddingLeft = tempChild.$style.marginLeft;
                fastCodeHtmlConfig.$style.paddingTop = tempChild.$style.marginTop;

                fastCodeHtmlConfig.style += 'font-size:' + tempChild.$style.fontSize + ';';
                fastCodeHtmlConfig.style += 'font-family:' + tempChild.$style.fontFamily + ';';
                fastCodeHtmlConfig.style += 'color:' + tempChild.$style.color + ';';
                fastCodeHtmlConfig.style += 'padding-left:' + tempChild.$style.marginLeft + ';';
                fastCodeHtmlConfig.style += 'padding-top:' + tempChild.$style.marginTop + ';';
            }
        }

        traverse2(fastCodeHtmlConfig); //将单个文件节点收敛到父节点上
        return fastCodeHtmlConfig;
    }
}
