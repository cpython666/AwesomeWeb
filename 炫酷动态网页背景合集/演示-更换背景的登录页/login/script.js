$(function () {
    $('.login-in').click(function () {
        $(this).addClass('big').siblings().removeClass('big')
        $('.body').css('transform','rotateX(0)')
    })
    $('.login-up').click(function () {
        $(this).addClass('big').siblings().removeClass('big')
        $('.body').css('transform','rotateX(90deg)')
    })
    // 点击一下登录使其变大
    $('.login-in').trigger('click')
    // 定义弹窗
    //tip是提示信息，type:'success'是成功信息，'danger'是失败信息,'info'是普通信息,'warning'是警告信息
    function ShowTip(tip, type) {
        var $tip = $('#tip');
        if ($tip.length == 0) {
            // console.log($tip.length);
            // 设置样式，也可以定义在css文件中
            // rgb(0,220,0,0.5)绿色
            // transition:all 0.5s;
            // transform:translateY(100px);transition:all 1s;
            $tip = $('' +
                '<span id="tip" style="position:fixed;opacity:0.65;background-color:#e4ebf5;box-shadow: 0.3rem 0.3rem 0.6rem #c8d0e7, -0.2rem -0.2rem 0.5rem  #FFFFFF;border-radius:10px;top:100px;left:50%;z-index:9999;height: 35px;padding: 0 20px;line-height: 35px;">' +
                '</span>');
            $('body').append($tip);
        }
        if(type=='insert'){
            $tip.stop(true).text(tip).css(
                { 'margin-left': - $tip.outerWidth() / 2,'color':'rgb(0,220,0,1)'}).fadeIn(200).delay(3000).fadeOut(800);
        }else if(type=='remove'){
            $tip.stop(true).text(tip).css(
                {'margin-left': - $tip.outerWidth() / 2, 'color':'red'}).fadeIn(200).delay(3500).fadeOut(800);}//设置显示位置和显示时间和消失时间
    }
    function InsertMsg(msg) {
        ShowTip(msg, 'insert');
    }
    function RemoveMsg(msg) {
        ShowTip(msg, 'remove');
    }
    // 登录接口，点击登录按钮之后返回后台查询数据
    $('#login-in-button').on('click',function (e) {
        e.preventDefault()
        $.post('/Servletlogin',$(this).parent().serialize(),function (res) {
            var response=JSON.parse(res)
            if(response.status==0){
                window.location.href=('../../index.html')
            }else{
                RemoveMsg(response.message)
            }
        })
    })
    // 注册接口，
    $('#login-up-button').on('click',function (e) {
        e.preventDefault()
        $.post('/Servletregister',$(this).parent().serialize(),function (res) {
            var response=JSON.parse(res)
            if(response.status==0){
                InsertMsg('注册成功')
                $('.login-in').trigger('click')
            }else{
                RemoveMsg(response.message)
                // alert(response.message)
            }
        })
    })
    // 注册用户的输入框失去焦点的时候去数据库查询用户名是否使用
    $('.right .username').on('blur',function () {
        $exist=$('.body div .right .exist')
        $.post('/ServletgetUserExist',{username:$(this).val()},function (res) {
            var response=JSON.parse(res)
            if(response.status===0){
                $exist.stop(true).text(response.message).css('color','green').fadeIn(200).delay(2000).fadeOut(800);
            }else{
                $exist.stop(true).text(response.message).css('color','red').fadeIn(200).delay(2000).fadeOut(800);
            }
        })
    })

    $('.setting').mouseenter(function () {
        $('.setting ul').stop(true).slideDown()
    })
    $('.setting').mouseleave(function () {
        $('.setting ul').slideUp()
    })

    $('.skyup').click(function () {
        $('iframe').attr('src','../skyUp/index.html')
    })
    $('.lizi').click(function () {
        $('iframe').attr('src','../colorfulLiZi/index.html')
    })
    $('.plane').click(function () {
        $('iframe').attr('src','../plane/index.html')
    })
    $('.yun').click(function () {
        $('iframe').attr('src','../yun/index.html')
    })
    $('.star').click(function () {
        $('iframe').attr('src','../star/index.html')
    })
})