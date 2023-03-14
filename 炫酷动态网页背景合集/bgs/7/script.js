console.clear();

const drops = 25;
const dropsContainer = document.querySelector("#drops");

dropsContainer.onmousemove = (e) => {
  mousePositionX = Math.floor(
    map(e.clientX, 0, dropsContainer.offsetWidth, 10, -10)
  );
  if (
    dropsContainer.style.getPropertyValue("--mouse-value") !== mousePositionX
  ) {
    dropsContainer.style.setProperty("--mouse-value", mousePositionX);
    dropsContainer.style.setProperty(
      "--mouse-position",
      `${mousePositionX}rem`
    );
    dropsContainer.style.setProperty("--rotation", `${mousePositionX}deg`);
  }
};

const createDrop = () => {
  const drop = document.createElement("div");
  drop.classList.add("drop");
  const rand = getRandomInt(3, 5);
  const randPosition = getRandomInt(-150, dropsContainer.offsetWidth + 150);
  const dropTime = getRandomInt(2, 4);
  const dropHeight = getRandomInt(3, 7);
  drop.style.setProperty("--left", `${randPosition}px`);
  drop.style.setProperty("--time", `.${rand}s`);
  drop.style.setProperty("--opacity", `.${rand}`);
  drop.style.setProperty("--drop-time", `.${dropTime}s`);
  drop.style.setProperty("--drop-height", `${dropHeight}rem`);
  drop.onanimationend = (animation) => {
    if (animation.animationName === "drop") {
      drop.classList.add("splash");
      drop.classList.remove("drop");
      createDrop();
    } else {
      drop.remove();
    }
  };
  dropsContainer.append(drop);
};

Array(drops)
  .fill(1)
  .forEach(() => {
    createDrop();
  });

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function map(value, istart, istop, ostart, ostop) {
  return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}