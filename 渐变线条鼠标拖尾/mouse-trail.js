/**
 * Mouse Trail Effect
 * 
 * This script creates a dynamic mouse trail effect with a gradient color transition.
 * The effect is rendered using HTML5 Canvas and JavaScript.
 * 
 * Author: Your Name
 * Contact: https://space.bilibili.com/1909782963
 * Date: 2024.04.24
 * Version: 1.0
 * 
 * Copyright (C) Python斗罗
 * 
 * This code is the property of Your Name. Unauthorized copying, modification,
 * distribution, or use of this script is strictly prohibited without the express
 * permission of the author. Please contact the author at the email above if you
 * wish to use this script for any purpose.
 */


function initMouseTrail() {
	const config = {
		maxTrailLength: 10,  // 轨迹的最大长度
		lineWidth: 3,         // 线条的宽度
		startColor: [255, 0, 0], // 起始颜色（红色）
		endColor: [0, 0, 255],   // 结束颜色（蓝色）
		fadeOutSpeed: 1        // 淡出速度，每帧减少的轨迹数量
	};
	
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.style.position = 'fixed';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    let trail = [];
    let lastMousePosition = { x: 0, y: 0 };

    function lerpColor(a, b, amount) {
        const [ar, ag, ab] = a;
        const [br, bg, bb] = b;
        return [
            ar + amount * (br - ar),
            ag + amount * (bg - ag),
            ab + amount * (bb - ab)
        ].map(Math.round);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 1; i < trail.length; i++) {
            const gradientRatio = i / trail.length;
            const color = lerpColor(config.startColor, config.endColor, gradientRatio);

            ctx.beginPath();
            ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
            ctx.lineTo(trail[i].x, trail[i].y);
            ctx.strokeStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
            ctx.lineWidth = config.lineWidth;
            ctx.stroke();
        }
    }

    function updateTrail() {
        if (lastMousePosition.x !== 0 && lastMousePosition.y !== 0) {
            trail.push({ ...lastMousePosition });
        }

        if (trail.length > config.maxTrailLength) {
            trail = trail.slice(config.fadeOutSpeed); // 使用 slice 来控制轨迹淡出速度
        }
    }

    window.addEventListener('mousemove', (event) => {
        lastMousePosition.x = event.pageX;
        lastMousePosition.y = event.pageY;
    });

    function animate() {
        updateTrail();
        draw();
        requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initMouseTrail);
} 
else {
	initMouseTrail()
}