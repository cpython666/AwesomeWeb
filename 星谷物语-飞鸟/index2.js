function initBirdFly() {
    // 设置鸟的数量
    const birdCount = 5; // 你可以根据需要调整鸟的数量

    // 创建鸟的元素
    function createBirdElement(src) {
        const bird = document.createElement('img');
        bird.src = src;
        bird.style.position = 'absolute';
        bird.style.width = '50px'; // 根据需要调整鸟的大小
        bird.style.height = 'auto';
        return bird;
    }

    const birds = [];
    const birdSrc = 'bird.gif'; // 替换为火烈鸟图像的实际路径

    for (let i = 0; i < birdCount; i++) {
        const bird = createBirdElement(birdSrc);
        birds.push(bird);
        document.body.appendChild(bird);
    }

    // 获取页面宽度和高度
    const pageWidth = window.innerWidth;
    const pageHeight = window.innerHeight;

    birds.forEach((bird,index) => {
        // 设置鸟的初始位置
		if(index<=2){
			bird.style.top = `${20+(index+1)*30}px`; // 50是鸟的高度
		}else{
			bird.style.top = `${Math.random() * (pageHeight - 50)}px`; // 50是鸟的高度
		}
        bird.style.left = `${pageWidth+(index+1)*30}px`;
    });

    // 设置鸟的目标位置
    const targetLeft = -50; // 目标位置，左边界外

    // 设置鸟的速度（像素/帧）
    const speed = 1; // 根据需要调整速度

    // 创建动画函数
    function animate() {
        birds.forEach(bird => {
            const currentLeft = parseFloat(bird.style.left);
            if (currentLeft <= targetLeft) {
                // 如果鸟已经飞到左边界外，重新设置初始位置
                bird.style.top = `${Math.random() * (pageHeight - 50)}px`;
                bird.style.left = `${pageWidth}px`;
            } else {
                // 否则，继续向左移动
                bird.style.left = `${currentLeft - speed}px`;
            }
        });

        requestAnimationFrame(animate);
    }

    // 启动动画
    animate();
}
// 检测文档加载状态
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBirdFly);
} else {
    initBirdFly();
}
