$(function(){
    // 定义模板template
    function template(bgInfo){
        return `
            <div class="bg" id="${bgInfo['url']}">
                <img src="${bgInfo['imgUrl']}"/>
                <span>${bgInfo['name']}</span>
            </div>
        `
    }



    var $sidebar=$('#sidebar')


    // 点击按钮显示选择背景栏
    var $setting=$('#setting')
    var $mask=$('#mask')
    $setting.on('click',function(){
        $sidebar.css('right',0)
        $mask.show()
    })

    var $close=$('#close')
    $close.on('click',function(){
        $sidebar.css('right',-650)
        $mask.show()

    })

    var $bgList=$('#bg-list')

    var $data=data
    var $bg
    for(var i=0;i<$data.length;i++){
        $bg=template($data[i])
        $bgList.append($bg)
    }

    var $iframe=$('iframe')
    $('.bg').on('click',function(){
        var $url=$(this).attr('id')
        $iframe.attr('src',$url)

        $sidebar.css('right',-650)
        $mask.hide()
    })

    $('#mask').on('click',function(){
        $sidebar.css('right',-650)
        $mask.hide()
    })


    
























})