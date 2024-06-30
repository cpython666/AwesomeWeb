const svgPath = document.querySelectorAll('path');
console.log(svgPath)

const svgText = anime({
  targets: svgPath,
  loop: false,
  direction: 'alternate',
  strokeDashoffset: [anime.setDashoffset, 0],
  // easing: 'liner',
  easing: 'easeInOutSine',
  duration: 500,
  delay: (el, i) => {return i * 800;} });