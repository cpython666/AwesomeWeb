const helloTexts = ["Hello", "Bonjour", "Hola", "こんにちは", "안녕하세요"];
let currentIndex = 0;

function changeText() {
    const helloElement = document.querySelector(".hello-text");
    helloElement.textContent = helloTexts[currentIndex];
    currentIndex = (currentIndex + 1) % helloTexts.length;
}

setInterval(changeText, 2000);
