//用于在js中写css的代码提示
export const cssSnippets: object = {
    'align-items': {
        prefix: '@align-items',
        body: 'align-items: ${1|flex-start,flex-end,center,baseline,stretch,start,end,self-start,self-end|};',
        description: 'initial value: stretch',
    },
    'align-self': {
        prefix: '@align-self',
        body: 'align-items: ${1|flex-start,flex-end,center,baseline,stretch,auto|};',
        description: 'initial value: auto',
    },
    animation: {
        prefix: '@animation',
        body: 'animation: ${1:name} ${2:1s} ${3|linear,ease-in-out,ease,ease-in,ease-out,step-start,step-end,steps,cubic-bezier|};',
        description: 'animation: name duration timing-function delay direction count fill-mode play-state',
    },
    'animation-delay': {
        prefix: '@animation-delay',
        body: 'animation-delay: ${0:1s};',
    },
    'animation-direction': {
        prefix: '@animation-direction',
        body: 'animation-direction: ${1|alternate,alternate-reverse,reverse,normal|};',
        description: 'initial value: normal',
    },
    'animation-duratuion': {
        prefix: '@animation-duratuion',
        body: 'animation-duration: ${0:1s};',
    },
    'animation-fill-mode': {
        prefix: '@animation-fill-mode',
        body: 'animation-fill-mode: ${1|forwards,backwards,both,none|};',
        description: 'initial value: none',
    },
    'animation-iteration-count': {
        prefix: '@animation-iteration-count',
        body: 'animation-iteration-count: ${0:infinite};',
        description: 'initial value: 1',
    },
    'animation-name': {
        prefix: '@animation-name',
        body: 'animation-name: ${0:name};',
    },
    'animation-play-state': {
        prefix: '@animation-play-state',
        body: 'animation-play-state: ${1|paused,running|};',
        description: 'initial value: running',
    },
    'animation-timing-function': {
        prefix: '@animation-timing-function',
        body: 'animation-timing-function: ${1|linear,ease,ease-in-out,ease-in,ease-out,step-start,step-end,steps,cubic-bezier|};',
        description: 'initial value: ease',
    },
    background: {
        prefix: '@background',
        body: 'background: ${0:#fff};',
        description: 'background: image position/size repeat attachment box box',
    },
    'background-attachment': {
        prefix: '@background-attachment',
        body: 'background-attachment: ${1|fixed,scroll,local|};',
        description: 'initial value: scroll',
    },
    'background-color': {
        prefix: '@background-color',
        body: 'background-color: ${0:#fff};',
    },
    'background-clip': {
        prefix: '@background-clip',
        body: 'background-clip: ${1|border-box,padding-box,content-box,text|};',
        description: 'initial value: border-box',
    },
    'background-image': {
        prefix: '@background-image',
        body: 'background-image: url(\'${0:background.jpg}\');',
    },
    'background-origin': {
        prefix: '@background-origin',
        body: 'background-origin: ${1|border-box,padding-box,content-box|};',
        description: 'initial value: padding-box',
    },
    'background-position': {
        prefix: '@background-position',
        body: 'background-position: ${1:left} ${2:top};',
    },
    'background-repeat': {
        prefix: '@background-repeat',
        body: 'background-repeat: ${1|no-repeat,repeat-x,repeat-y,repeat,space,round|};',
        description: 'initial value: repeat',
    },
    'background-size': {
        prefix: '@background-size',
        body: 'background-size: ${0:cover};',
    },
    border: {
        prefix: '@border',
        body: 'border: ${1:1px} ${2|solid,dashed,dotted,double,groove,ridge,inset,outset,none,hidden|} ${0:#000};',
    },
    'border: none': {
        prefix: '@border: none',
        body: 'border: none;',
    },
    'border-color': {
        prefix: '@border-color',
        body: 'border-color: ${0:#000};',
    },
    'border-style': {
        prefix: '@border-style',
        body: 'border-style: ${1|solid,dashed,dotted,double,groove,ridge,inset,outset,none,hidden|};',
    },
    'border-width': {
        prefix: '@border-width',
        body: 'border-width: ${0:1px};',
    },
    'border-bottom': {
        prefix: '@border-bottom',
        body: 'border-bottom: ${1:1px} ${2|solid,dashed,dotted,double,groove,ridge,inset,outset,none,hidden|} ${0:#000};',
    },
    'border-left': {
        prefix: '@border-left',
        body: 'border-left: ${1:1px} ${2|solid,dashed,dotted,double,groove,ridge,inset,outset,none,hidden|} ${0:#000};',
    },
    'border-right': {
        prefix: '@border-right',
        body: 'border-right: ${1:1px} ${2|solid,dashed,dotted,double,groove,ridge,inset,outset,none,hidden|} ${0:#000};',
    },
    'border-top': {
        prefix: '@border-top',
        body: 'border-top: ${1:1px} ${2|solid,dashed,dotted,double,groove,ridge,inset,outset,none,hidden|} ${0:#000};',
    },
    'border-radius': {
        prefix: '@border-radius',
        body: 'border-radius: ${0:2px};',
    },
    bottom: {
        prefix: '@bottom',
        body: 'bottom: ${0:0};',
    },
    'box-shadow': {
        prefix: '@box-shadow',
        body: 'box-shadow: ${1:1px} ${2:1px} ${3:1px} ${4:1px} ${0:rgba(0, 0, 0, .5)};',
        description: 'box-shadow: x-offset y-offset blur spread color',
    },
    'box-sizing': {
        prefix: '@box-sizing',
        body: 'box-sizing: ${1|border-box,content-box|};',
        description: 'initial value: content-box',
    },
    clear: {
        prefix: '@clear',
        body: 'clear: ${1|both,left,right,none|};',
    },
    color: {
        prefix: '@color',
        body: 'color: ${0:#000};',
    },
    content: {
        prefix: '@content',
        body: 'content: \'$0\';',
    },
    cursor: {
        prefix: '@cursor',
        body: 'cursor: ${1|auto,default,alias,cell,copy,crosshair,context-menu,help,grab,grabbing,move,none,no-drop,not-allowed,pointer,progress,e-resize,all-scroll,text,wait,vertical-text,zoom-in,zoom-out|};',
        description: 'initial value: auto',
    },

    display: {
        prefix: '@display',
        body: 'display: ${1|none,block,inline,inline-block,flex,inline-flex,list-item,table,inline-table,table-caption,table-cell,table-row,table-row-group,table-column|};',
    },
    flex: {
        prefix: '@flex',
        body: 'flex: ${1:1} ${2:1} ${3:auto};',
        description: 'flex: grow shrink basis',
    },
    'flex (alt)': {
        prefix: '@flex (alt)',
        body: 'flex: ${1:1} ${2:1} ${3:auto};',
    },
    'flex-direction': {
        prefix: '@flex-direction',
        body: 'flex-direction: ${1|row,row-reverse,column,column-reverse|};',
        description: 'initial value: row',
    },
    'flex-flow': {
        prefix: '@flex-flow',
        body: 'flex-flow: ${1|row,row-reverse,column,column-reverse|} ${2|wrap,wrap-reverse,nowrap|};',
    },
    'flex-wrap': {
        prefix: '@flex-wrap',
        body: 'flex-wrap: ${1|wrap,wrap-reverse,nowrap|};',
        description: 'initial value: nowrap',
    },
    float: {
        prefix: '@float',
        body: 'float: ${1|left,right,none|};',
    },
    'font-family': {
        prefix: '@font-family',
        body: 'font-family: ${0:arial};',
    },
    'font-size': {
        prefix: '@font-size',
        body: 'font-size: ${0:12px};',
    },
    'font-style': {
        prefix: '@font-style',
        body: 'font-style: ${1|italic,oblique,normal|};',
    },
    'font-weight': {
        prefix: '@font-weight',
        body: 'font-weight: ${0:bold};',
    },
    font: {
        prefix: '@font',
        body: 'font: ${0:12px/1.5};',
        description: 'font: [weight style variant stretch] size/line-height family',
    },
    height: {
        prefix: '@height',
        body: 'height: ${0:1px};',
    },
    'justify-content': {
        prefix: '@justify-content',
        body: 'justify-content: ${1|flex-start,flex-end,center,space-between,space-around|};',
        description: 'initial value: flex-start',
    },
    'list-style': {
        prefix: '@list-style',
        body: 'list-style: ${1|disc,circle,square,decimal,lower-roman,upper-roman,lower-alpha,upper-alpha,none,armenian,cjk-ideographic,georgian,lower-greek,hebrew,hiragana,hiragana-iroha,katakana,katakana-iroha,lower-latin,upper-latin|} ${2|outside,inside|};',
        description: 'list-style: type position image',
    },
    'list-style-position': {
        prefix: '@list-style-position',
        body: '${1|outside,inside|}',
        description: 'initial value: outside',
    },
    'list-style-type': {
        prefix: '@list-style-type',
        body: 'list-style-type: ${1|disc,circle,square,decimal,lower-roman,upper-roman,lower-alpha,upper-alpha,none,armenian,cjk-ideographic,georgian,lower-greek,hebrew,hiragana,hiragana-iroha,katakana,katakana-iroha,lower-latin,upper-latin|};',
        description: 'initial value: disc',
    },
    left: {
        prefix: '@left',
        body: 'left: ${0:0};',
    },
    'line-height': {
        prefix: '@line-height',
        body: 'line-height: ${0:1.5};',
    },
    'letter-spacing': {
        prefix: '@letter-spacing',
        body: 'letter-spacing: ${0:2px};',
    },
    margin: {
        prefix: '@margin',
        body: 'margin: ${0:0};',
    },
    'margin-bottom': {
        prefix: '@margin-bottom',
        body: 'margin-bottom: ${0:0};',
    },
    'margin-left': {
        prefix: '@margin-left',
        body: 'margin-left: ${0:0};',
    },
    'margin-right': {
        prefix: '@margin-right',
        body: 'margin-right: ${0:0};',
    },
    'margin-top': {
        prefix: '@margin-top',
        body: 'margin-top: ${0:0};',
    },
    'min-height': {
        prefix: '@min-height',
        body: 'min-height: ${0:1px};',
    },
    'min-width': {
        prefix: '@min-width',
        body: 'min-width: ${0:1px};',
    },
    'max-height': {
        prefix: '@max-height',
        body: 'max-height: ${0:1px};',
    },
    'max-width': {
        prefix: '@max-width',
        body: 'max-width: ${0:1px};',
    },
    opacity: {
        prefix: '@opacity',
        body: 'opacity: ${0:0};',
    },
    overflow: {
        prefix: '@overflow',
        body: 'overflow: ${1|visible,hidden,scroll,auto,clip|};',
    },
    padding: {
        prefix: '@padding',
        body: 'padding: ${0:0};',
    },
    'padding-bottom': {
        prefix: '@padding-bottom',
        body: 'padding-bottom: ${0:0};',
    },
    'padding-left': {
        prefix: '@padding-left',
        body: 'padding-left: ${0:0};',
    },
    'padding-right': {
        prefix: '@papadding-rightdr',
        body: 'padding-right: ${0:0};',
    },
    'padding-top': {
        prefix: '@padding-top',
        body: 'padding-top: ${0:0};',
    },
    position: {
        prefix: '@position',
        body: 'position: ${1|relative,absolute,fixed,sticky,static|};',
    },
    right: {
        prefix: '@right',
        body: 'right: ${0:0};',
    },
    'text-align': {
        prefix: '@text-align',
        body: 'text-align: ${1|center,left,right,justify,start,end|};',
    },
    'text-decoration': {
        prefix: '@text-decoration',
        body: 'text-decoration: ${1|none,underline,overline,line-through|};',
    },
    'text-indent': {
        prefix: '@text-indent',
        body: 'text-indent: ${0:2em};',
    },
    'text-shadow': {
        prefix: '@text-shadow',
        body: 'text-shadow: ${1:1px} ${2:1px} ${3:1px} ${4:1px} ${0:rgba(0, 0, 0, .5)};',
        description: 'text-shadow: x-offset y-offset blur spread color',
    },
    'text-transform': {
        prefix: '@text-transform',
        body: 'text-transform: ${1|capitalize,uppercase,lowercase,full-width,none|};',
    },
    top: {
        prefix: '@top',
        body: 'top: ${0:0};',
    },
    'vertical-align': {
        prefix: '@vertical-align',
        body: 'vertical-align: ${1|baseline,middle,top,bottom,sub,super,text-top,text-bottom|};',
    },
    visibility: {
        prefix: '@visibility',
        body: 'visibility: ${1|visible,hidden,collapse|};',
    },
    'word-break': {
        prefix: '@word-break',
        body: 'word-break: ${1|break-all,keep-all,break-word,normal|};',
    },
    width: {
        prefix: '@width',
        body: 'width: ${0:0};',
    },
    'white-space': {
        prefix: '@white-space',
        body: 'white-space: ${1|nowrap,pre,pre-wrap,pre-line,normal|};',
    },
    'word-wrap': {
        prefix: '@word-wrap',
        body: 'word-wrap: ${1|break-word,break-spaces,normal|};',
    },
    'z-index': {
        prefix: '@z-index',
        body: 'z-index: ${0:-1};',
    },
    '@import': {
        prefix: '@import',
        body: '@import \'${0:filename}\';',
    },
    '@mixin': {
        prefix: '@mixin',
        body: '@mixin ${1:name} {\n  $0\n}',
    },
    '@include': {
        prefix: '@include',
        body: '@include ${0:mixin};',
    },
    '@keyframes': {
        prefix: '@keyframes',
        body: '@keyframes ${1:name} {\n  $0\n}',
    },
    '@media': {
        prefix: '@media',
        body: '@media screen and (${1:max-width: 300px}) {\n  $0\n}',
    },
    '!important': {
        prefix: '@!important',
        body: '!important',
    },
};
