/*
 * @Author: Wcy1998 cywu3@leqee.com
 * @Date: 2022-05-29 10:19:11
 * @LastEditors: Wcy1998 cywu3@leqee.com
 * @LastEditTime: 2022-05-30 13:41:10
 * @FilePath: \json2htmltest\json2html.snippets.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const snippetsConfig = {
    json2htmTableConfirmModal: {
        prefix: '@confirmModal',
        body: ` 
        this.$lqConfirm({
            title: '$1?',
            type: 'warning',
            showCancelButton: true,
            onConfirm: () => {
                return true;
            },
        });`,
        description: 'confirmModal',
    },
    json2htmTableRenderSelect: {
        prefix: '@renderSelect',
        body: ` 
        'lq-select', {
            props: {
                width: '$1',
                basicConfig: {
                    size: '$2',
                    transfer: $3
                },
                dataList: $4,
                defaultProps: $5,
                value: this.paramObj.authColumns[params.idx - 1].tagId,
            },
            on: {
                nodeClick: (e) => { this.paramObj.authColumns[params.idx - 1].tagId = e.id }
            }`,
        description: 'renderSelect',
    },
    json2htmTableColumns: {
        prefix: '@columns',
        body: ` {
            title: '$1',
            width: $2,
            key: '$3',
            render:(h,params)=>h()
        },`,
        description: 'columns',
    },
    json2htmlVirtualList: {
        prefix: '@list',
        body: `  tag: 'virtual-table-list',
        $dataList: '$1',
        $tableWidth: '$2',
        $tableHeight: '$3',
        $columns: '$4',
        $headerRowStyle: "{$5}",`,
        description: 'virtualList',
    },
    json2htmlLqSelect: {
        prefix: '@select',
        body: ` tag: 'lq-select', 
                $dataList: "$1",
                $defaultProps: '$2',
                $basicConfig: '$3',
                vModel:'$6',
                "@change": '$4',
                "@nodeClick": '$5'`,
        description: 'lq-select',
    },
    json2htmlInput: {
        prefix: '@input',
        body: `  tag: 'Input',
                 vModel: '$1',
                 $style:{width:'$2'},
                 maxlength: '$3',
                 '@on-change': "limitInputLength"`,
        description: 'input',
    },
    json2htmlLabel: {
        prefix: '@label',
        body: ` template: '@requiredLabel',
                style: 'width: $1px;',
                text: '$2'`,
        description: 'label',
    },
    json2htmlTemplateHttpFunction: {
        prefix: '@httpFunc',
        body: `async $1funcName(param){
              let result = await $http.axios()
              if(result.success){
                  this.$Message.success('')
              }
          },`,
        description: '生成带有http请求的方法',
    },
}