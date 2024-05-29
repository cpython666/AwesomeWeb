import * as THREE from "three";

export default class Rocks {
  constructor() {
    this.init();
  }

  init() {
    const display = new THREE.Group();

    const geometry = new THREE.TetrahedronBufferGeometry(5);
    const material = new THREE.MeshStandardMaterial({
      color: 0x303030,
      flatShading: true
    });

    for (let i = 0; i < 80; i++) {
      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.x = Math.random() * 500 - 250;
      mesh.position.y = Math.random() * 500 - 250;
      mesh.position.z = Math.random() * 500 - 250;

      mesh.scale.setScalar(Math.random() * 2 + 0.5);

      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      mesh.rotation.z = Math.random() * Math.PI;
      display.add(mesh);
    }

    this.display = display;
  }

  addToScene(scene) {
    scene.add(this.display);
  }

  render(clock) {
    const { display } = this;
    display.rotation.y += clock.getDelta() * 0.1;
  }
}
