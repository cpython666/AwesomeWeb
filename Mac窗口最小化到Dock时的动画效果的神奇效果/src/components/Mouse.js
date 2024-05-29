import * as THREE from "three";
import xEmiiter from "xemitterjs";

export default class Mouse {
  constructor(conf) {
    this.init(conf);
    this.addMouseEvent();
  }

  init({ display, camera, renderer }) {
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    this.raycaster = raycaster;
    this.renderer = renderer;
    this.display = display;
    this.camera = camera;
    this.mouse = mouse;
  }

  addMouseEvent() {
    this.onClick = this.onClick.bind(this);
    document.addEventListener("click", this.onClick, false);
  }

  onClick(e) {
    e.preventDefault();

    const { mouse, renderer } = this;
    const canvas = renderer.domElement;

    const ratio = renderer.getPixelRatio();
    const rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    x *= ratio;
    y *= ratio;

    mouse.x = (x / canvas.width) * 2 - 1;
    mouse.y = -(y / canvas.height) * 2 + 1;
    this.render();
  }

  render() {
    const { raycaster, display, camera, mouse } = this;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(display.children);

    if (intersects.length > 0) {
      const display = intersects[0].object;
      display.show = !display.show;
      xEmiiter.emit("CLICK", display);
    }
  }

  destroy() {
    document.removeEventListener("click", this.onClick, false);
  }
}
