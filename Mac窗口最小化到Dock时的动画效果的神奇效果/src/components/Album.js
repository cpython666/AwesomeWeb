import ppo from "ppo";
import * as THREE from "three";
import Photo from "./Photo";
import xEmiiter from "xemitterjs";
import THREEUtils from "../utils/THREEUtils";

import img01 from "../assets/01.jpg";
import img02 from "../assets/02.jpg";
import img03 from "../assets/03.jpg";
import img04 from "../assets/04.jpg";
import img05 from "../assets/05.jpg";
import img06 from "../assets/06.jpg";

const IMGS = [img01, img02, img03, img04, img05, img06];

export default class Album {
  constructor(conf) {
    this.init(conf);
    this.addListener();
  }

  init({ camera, renderer }) {
    const display = new THREE.Group();
    const scale = 0.25;
    const len = 6;
    const list = [];

    for (let i = 0; i < len; i++) {
      // eslint-disable-next-line
      const photo = new Photo(IMGS[i]);
      const pos = THREEUtils.getRealSizePos({ camera, renderer });
      const d = 18;
      const w = photo.width * scale + d;
      const h = photo.height * scale + 1.6 * d;

      photo.display.position.x = -w + (i % (len / 2)) * w;
      photo.display.position.y = h / 2 - ppo.floor(i / (len / 2), 0) * h;
      photo.display.position.z = pos - 200;
      photo.display.from = photo.display.position.clone();
      photo.display.to = new THREE.Vector3(0, 0, pos);
      photo.display.fromScale = scale;

      THREEUtils.scale(photo.display, scale);
      display.add(photo.display);

      list.push(photo);
    }

    this.list = list;
    this.display = display;
  }

  addListener() {
    const { list } = this;

    xEmiiter.on("CLICK", (display) => {
      for (let i = 0; i < list.length; i++) {
        const photo = list[i];
        if (photo.display === display) {
          if (display.show) {
            photo.show();
          } else {
            photo.hide();
          }
        }
      }
    });
  }

  addToScene(scene) {
    scene.add(this.display);
  }

  render() {
    //modifier.apply();
  }
}
