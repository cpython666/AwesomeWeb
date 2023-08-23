/**
 * 作者：Bililovy
 * 
 * 最后更新时间：2015.09.22
 *
 * 文字动画插件，帮助更好的解决动画效果，使用时，只需将html元素以ID命名，修改此页面
 * 的元素设置，可以自行增删动画和指定动画效果
 */
(function($) {
	"use strict";
		var isOn=0,
		sets, 
		$text, 
		toAnimate = "#text", 
		settings = {
			animation:8, //动画方式 从1-15 每个数字代表一个动画 请自测效果
			animationType: "in",//显示方式 in 和out 参数，in代表入场,out代表出场
			backwards: false, //改变动画显示方向，默认false 设为true 动画将从后往前倒序播放
			easing: "easeOutQuint", //这里的效果 可以参见http://code.ciaoca.com/jquery/easing/   
			speed: 1000, //动画帧速 即在指定时间内完成动画
			sequenceDelay: 100, //场景延迟  即执行完上一个动画后，等待指定时间继续执行下一动画
			startDelay: 0, //开始延迟，即执行当前动画时，等待指定时间后再开始
			offsetX: 100,//动画元素 x坐标偏移量
			offsetY: 50,//动画元素 Y坐标偏移量
			onComplete: doThis, //回调函数 即 执行完动画后，需要执行的回调方法
			restoreHTML: true  //重置元素 即重复播放两次该动画 类似于此效果 默认true
		};

		// 在文档加载完成后执行动画方法
		$(document).ready(function() {
			$text = $("#text");
			$.cjTextFx(settings);
			$.cjTextFx.animate(toAnimate);
		});
		
		function doThis(){
				$text = $("#text1");
				var animateObj='#text1';			
				if(isOn === 13) { 
					$text.html('演示完毕--by Bililovy'); 
					sets = {
						animation: 1, 
						animationType: "in", 
						restoreHTML: false,
						onComplete:false
					};
				}else{
				(isOn < 13) ? isOn++ : isOn = 0;	
				switch(isOn) {
					case 1:						
					sets = {
						animation:2,
						animationType: "in", 
						easing: "easeInQuint",  
						restoreHTML: false,						
					};						
					break;
					
					case 2:
						sets = {animation: 11,animationType: "out", restoreHTML: false};
					break;
					
					case 3:
						$text.html("灵活运用，制造自己的动画");
						sets = {animation: 11, animationType: "in", restoreHTML: false};
					break;
					case 4:
						sets = {animation: 5, animationType: "out", restoreHTML: false};
					break;
					case 5:
						$text.html("共有10多种入场出场方式");
						sets = {animation: 1};
					break;
					
					case 6:
						sets = {animation: 1, animationType: "out", restoreHTML: false};
					break;

					case 7:
						$text.html("这是一款小型但不寒酸的js文字插件");
						sets = {animation: 6, backwards: true};
					break;
					
					case 8:
						sets = {animation: 4, animationType: "out", backwards: true, restoreHTML: false};
					break;
					
					case 9:
						$text.html("有它，可以帮助你轻松完成简单动画");
						sets = {animation: 2, easing: "easeOutBounce"};
					break;
					
					case 10:
						sets = {animation: 2, animationType: "out", speed: 500, easing: "easeInBack", restoreHTML: false};
					break;
					
					case 11:
						$text.html("如果喜欢此插件，敬请下载吧");
						sets = {animation: 14, startDelay: 1000, easing: "easeInBack", restoreHTML: false};
					break;
					
					case 12:
						sets = {animation: 6, animationType: "out", speed: 500, easing: "easeInBack", restoreHTML: false};
					break;					
						
			   	    default :
						isOn =13;//在这设定返回从头开始
					break;
				}	
				}
			jQuery.cjTextFx.animate(animateObj, sets);
		}
		

})(jQuery);