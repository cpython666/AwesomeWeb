const cvs = document.querySelector(".cnvs");
const size = 110;
cvs.width = size;
cvs.height = size;
const ctx = cvs.getContext("2d");
const pxSize = 2;
const defaultColor = "rgb(60, 75, 60)";
const sleepingCat = `
xx...xx........x
x.xxx.x........x
x.....x.......x.
x.x.x.xxxxx..x..
x.....x....xxx..
.x...x.....x....
..xxxx.....x....
....xxxxxxx.....
`;

const standingCatToLeft = `
xx...xx........x
x.xxx.x........x
x.....x.......x.
x.x.x.xxxxx..x..
x.....x....xxx..
.x...x.....x....
..xxxx.....x....
....xxxxxxx.....
.....x.x.xxx....
.....x.x.x.x....
`;

const standingCatToLeftPose2 = `
xx...xx........x
x.xxx.x........x
x.....x.......x.
x.x.x.xxxxx..x..
x.....x....xxx..
.x...x.....x....
..xxxx.....x....
....xxxxxxx.....
....x.x.xxx.....
...x..x.x..x....
`;

const sleepZSml = `
xx
.x.
.xx
`;

const sleepZMed = `
xxx.
..x.
.x..
.xxx
`;

const sleepZLarge = `
xxxx.
..x..
.x...
.xxxx
`;

let state = {
  type: "walk",
  x: 0
};

function drawArt(px, py, str, flip, col = "rgb(60, 75, 60)") {
  const lines = str.split("\n");
  for (let y = 0; y < lines.length; y++) {
    let chars = lines[y].split("");
    if (flip) chars.reverse();
    for (let x = 0; x < chars.length; x++) {
      if (chars[x] === "x") drawRect(x + px, y + py, col, true);
    }
  }
}

function drawRect(x, y, col = "black", fill = false) {
  if (fill) {
    ctx.fillStyle = col;
    ctx.fillRect(x * pxSize, y * pxSize, pxSize, pxSize);
    return;
  }
  ctx.strokeStyle = col;
  ctx.fillStyle = "";
  ctx.beginPath();
  ctx.lineWidth = "1";
  ctx.rect(x * pxSize, y * pxSize, pxSize, pxSize);
  ctx.stroke();
}

function clear() {
  ctx.clearRect(0, 0, size, size);
  // ctx.fillRect(0, 0, size, size, 'rgba(0,0,0,0)');
}

function drawGrid() {
  let gridRows = Math.floor(size / pxSize);
  for (let i = 0; i < gridRows; i++) {
    for (let j = 0; j < gridRows; j++) {
      drawRect(j * 2, i * 2, "blue", false);
    }
  }
}

refresh();

function refresh() {
  clear();
  switch (state.type) {
    case "sleep":
      {
        sleepAnimation();
      }
      break;
    case "stand":
      {
        standAnimation();
      }
      break;
    case "walk":
      {
        walkAnimation();
      }
      break;
    default:
  }
}

function sleepAnimation() {
  if (state.t === undefined) state.t = 0;
  drawArt(20, 32, sleepingCat);
  if (state.t >= 1) drawArt(28, 27, sleepZSml);
  if (state.t >= 2) drawArt(32, 22, sleepZMed);
  if (state.t >= 3) drawArt(36, 18, sleepZLarge);
  state.t = (state.t + 1) % 4;
  if (Math.random() < 0.1) {
    state = { type: "walk", x: 0 };
  }
  setTimeout(refresh, 500);
}

function standAnimation() {
  if (state.t === undefined) state.t = 0;
  if (state.t < 4) drawArt(20 + state.x, 30, standingCatToLeft, true);
  else drawArt(20 + state.x, 30, standingCatToLeftPose2, true);
  state.t++;
  if (state.t > 8) state.t -= 8;
  state.x += 1;
  setTimeout(refresh, 50);
}

function walkAnimation() {
  if (state.t === undefined) state.t = 0;
  if (state.dir === undefined) state.dir = "left";
  const flip = state.dir === "right";
  if (state.t < 4) drawArt(20 + state.x, 30, standingCatToLeft, flip);
  else drawArt(20 + state.x, 30, standingCatToLeftPose2, flip);
  state.t++;
  if (state.t > 8) state.t -= 8;
  state.x += state.dir === "left" ? -1 : 1;

  if (state.dir === "left" && state.x < -10) state.dir = "right";
  if (state.dir === "right" && state.x > 10) state.dir = "left";

  if (state.x === 0) {
    if (Math.random() < 0.5) state = { type: "sleep" };
  }

  setTimeout(refresh, 100);
}

var elem;
var colorT;

function easeInOut(t) {
  const sqt = t ** 2;
  return sqt / (2.0 * (sqt - t) + 1.0);
}

var colorT = 0;
var elem;
function setColor() {
  if (colorT === undefined) colorT = 0;
  if (!elem) elem = document.querySelector("#main-tamago");
  const blueRGB = [98, 144, 241];
  const orangeRGB = [241, 195, 98];
  let t = colorT;
  const incAm = 0.05;
  if (state.type === "sleep") colorT = Math.min(t + incAm, 1);
  else colorT = Math.max(t - incAm, 0);
  t = easeInOut(t);
  const rgbOut = colorTweenRGB(orangeRGB, blueRGB, t);
  if (elem) elem.style.fill = `rgb(${rgbOut.join(",")})`;
  document.body.style.backgroundColor = `rgb(${colorTweenRGB(
    [20, 20, 50],
    [98, 144, 241],
    1 - t
  ).join(",")})`;
}

setInterval(setColor, 30);

function colorTweenRGB(a, b, t) {
  return a.map((av, i) => (b[i] - av) * t + av);
}