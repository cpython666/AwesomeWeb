$(function () {

    function tableTemplate(jsonStr){
        return `
                <div class="row">
                    <div class="cell id">${jsonStr['id']}</div>
                    <div class="cell name">${jsonStr['name']}</div>
                    <div class="cell price">${jsonStr['price']}</div>
                    <div class="cell shopclass">${jsonStr['shopclass']}</div>
                    <div class="cell inf">${jsonStr['inf']}</div>
                    <div class="cell url">${jsonStr['url']}</div>
                    <div class="cell fun1">修改</div>
                    <div class="cell fun2">删除</div>
                </div>
        `
    }
    // 页面一加载就向后台放松请求获取所有商品的信息json格式
    $.get('/ServletgetShopList',function (res) {
        var $res=JSON.parse(res)
        for(var i=0;i<$res.length;i++){
            var $cardList=tableTemplate($res[i])
            // 定义容器
            var $con=$('body .body')
            $con.append($cardList)
        }
    })

    // 添加商品
    $('.add').click(function () {
        $('#j_formAdd').show();
        $('#j_mask').show();
        var $text=$(this).text()
        $('.form-add-title span').text($text)
        $('form').attr('action','/ServletaddShop')
    });

    // 点击修改弹出表单显示修改商品
    $('.body').on('click','.fun1',function () {
        $('#j_formUpd').show();
        $('#j_mask').show();
        var $text=$(this).text()+"商品"
        $('.form-add-title span').text($text)
        // $('form').attr('action','/ServletupdateShop')

        var $thisrow=$(this).parent()
        var $id=parseInt($thisrow.children('div:eq(0)').text())
        var $name=$thisrow.children('div:eq(1)').text()
        var $price=$thisrow.children('div:eq(2)').text()
        var $shopclass=$thisrow.children('div:eq(3)').text()
        var $inf=$thisrow.children('div:eq(4)').text()
        var $url=$thisrow.children('div:eq(5)').text()

        $('#id__').val($id)
        $('#name__').val($name)
        $('#price__').val($price)
        $('#shopclass__').val($shopclass)
        $('#inf__').val($inf)
        $('#url__').val($url)
    })

    $('.j_hideFormAdd').click(function () {
        $('#j_formAdd').hide();
        $('#j_formUpd').hide();
        $('#j_mask').hide();
    });

    $('.return').click(
        function () {
            window.location.href="../../index.html"
        }
    )

    $('.body').on('click','.fun2',function () {
        var $thisrow=$(this).parent()
        var $id=parseInt($thisrow.children('div:eq(0)').text())
        var $name=$thisrow.children('div:eq(1)').text()
        var n=confirm("确认要删除id为:"+$id+",名称为:"+$name+"的商品吗？")
        if(n){
            $.post('/ServletdeleteShop',{"id":$id},function (res) {
                var $res=JSON.parse(res)
                if($res.status===0){
                    alert($res.message)
                }else{
                    alert($res.message)
                }
            })
        }
    })

})