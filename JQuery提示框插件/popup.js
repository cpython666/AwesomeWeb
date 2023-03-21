
(function( $ ) {
//使用代码块语法来封装长格式内容
//定义一个jquery插件
$.fn.popup = function(options) {
    //默认参数
    var defaults = {
      width: 300, //弹窗宽度
      height: 200, //弹窗高度
      title: "提示", //弹窗标题
      content: "", //弹窗内容
      mask: true, //是否显示遮罩层
      closeBtn: true, //是否显示关闭按钮
      confirmBtn: false, //是否显示确认按钮
      cancelBtn: false, //是否显示取消按钮
      onConfirm: null, //确认按钮回调函数
      onCancel: null //取消按钮回调函数
    };
    //合并参数
    var settings = $.extend({}, defaults, options);
    //创建弹窗元素
    var $popup = $("<div class='popup'></div>");
    var $title = $("<div class='popup-title'></div>");
    var $content = $("<div class='popup-content'></div>");
    var $buttons = $("<div class='popup-buttons'></div>");
    var $closeBtn = $("<span class='popup-close'>&times;</span>");
    var $confirmBtn = $("<button class='popup-confirm'>确定</button>");
    var $cancelBtn = $("<button class='popup-cancel'>取消</button>");
    
    //设置弹窗样式和内容
    $popup.css({
      width: settings.width,
      height: settings.height,
      marginLeft: -settings.width /2,
      marginTop: -settings.height /2 
     });
     $title.text(settings.title);
     $content.html(settings.content);
     
     //添加关闭按钮事件
     if (settings.closeBtn) {
       $title.append($closeBtn);
       $closeBtn.on("click", function() {
         closePopup();
       });
     }
     
     //添加确认按钮事件 
     if (settings.confirmBtn) {
       $buttons.append($confirmBtn);
       $confirmBtn.on("click", function() {
         if (typeof settings.onConfirm === "function") {
           settings.onConfirm();
         }
         closePopup();
       });
     }
     
     //添加取消按钮事件 
     if (settings.cancelBtn) {
       $buttons.append($cancelBtn);
       $cancelBtn.on("click", function() {
         if (typeof settings.onCancel === "function") {
           settings.onCancel();
         }
         closePopup();
       });
     }
     
     //组合弹窗元素 
     $popup.append($title).append($content).append($buttons);
     
     //创建遮罩层元素 
     var $mask = $("<div class='mask'></div>");
     
     //显示遮罩层 
     if (settings.mask) {
       $("body").append($mask);
       $mask.fadeIn();
       
       //点击遮罩层关闭弹窗 
       /*$mask.on("click", function() { 
        closePopup(); 
        });*/
        
        }
        
        //显示弹窗 
        $("body").append($popup); 
        //$popup.show(); 
        //$popup.fadeIn(); 
        //$popup.slideDown(); 
        //$popup.animate({opacity:"show"},500); 
        
        /*自定义动画效果*/  
        
        /*$popup.css({top:-$window.height(),display:"block"});*/  
        
        /*$window.scrollTop(0);*/  
        
        /*$window.scroll(function(){*/  
          /*var top=$window.scrollTop()+$window.height()/2;*/  
          /*$popup.stop().animate({top:-top},500);*/  
          /*});*/
          
          /*关闭弹窗函数 */ 
          
          function closePopup() { 
              
              //$mask.remove(); 
              
              //$mask.fadeOut(function(){ $(this).remove(); }); 
              
              //$mask.slideUp(function(){ $(this).remove(); }); 
              
              //$mask.animate({opacity:"hide"},500,function(){ $(this).remove(); }); 
              
              /*自定义动画效果 */ 
              
              /*$mask.animate({top:$window.height()},500,function(){ $(this).remove(); }); */
              
              //$popup.remove();
            }

        }

})( jQuery );
