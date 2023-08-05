$(function () {
    var $url=window.location.href

    var $id=$url.split('?id=')[1]

    function template(jsonStr){
        return `
        <div class="shop-card" id="shop${jsonStr['id']}">
                    <div class="img">
                    <img src="../../${jsonStr['url']}"  title="双击查看详情">
                    </div>
                    <div class="shop-name">${jsonStr['name']}</div>
                    <div class="shop-inf"><span>${jsonStr['inf']}</span></div>
                    <div class="shop-price">￥<span>${jsonStr['price']}</span></div>
                        <div class="shop-number">
                            
                            <div class="number-change">
<!--                                <div class="number-less">-</div>-->
                                <input type="text" value="0">
<!--                                <div class="number-add">+</div>-->
                            </div>
                            <button class="add">立即购买</button>
                    </div>
                </div>
        `
    }

    $.post('/ServletgetShopInf',{'id':$id},function (res) {
        var $res=JSON.parse(res)
        var $card=template($res)

        $('.body').append($card)

    })
    $('body').on('click','.add',function () {
        var $name=$('.shop-name').text()
        var $price=$('.shop-price span').text()
        var $number=$('.number-change input').val()
        alert('你购买了'+$number+'件单价为'+$price+'元的'+$name+'\n共需支付'+$number*$price+'元')
    })

})