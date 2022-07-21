export const fastCodeConfig = {
    template: '@rowContainer',
    $style: {
        width: '208px',
        height: '40px',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'rgba(21, 21, 35, 0.90)',
        borderRadius: '4px'
    },
    style: 'width:208px;height:40px;display:flex;flex-direction:row;background-color:rgba(21, 21, 35, 0.90);border-radius:4px;',
    children: [{
        template: '@rowContainer',
        $style: {
            width: '208px',
            height: '40px',
            display: 'flex',
            flexDirection: 'row',
            opacity: '0.9'
        },
        style: 'width:208px;height:40px;display:flex;flex-direction:row;opacity:0.9;',
        children: [{
            template: '@rowContainer',
            $style: {
                width: '168px',
                height: '20px',
                display: 'flex',
                flexDirection: 'row',
                marginLeft: '20px',
                marginTop: '10px',
                fontSize: '12px',
                fontFamily: 'MiSans',
                color: 'rgb(255, 255, 255)',
                paddingLeft: '0.648px',
                paddingTop: '4.668px'
            },
            style: 'width:168px;height:20px;display:flex;flex-direction:row;font-size:12px;font-family:MiSans;color:rgb(255, 255, 255);padding-left:0.648px;padding-top:4.668px;',
            children: [],
            text: '点击整行即可显示详细文件信息'
        }]
    }]
}