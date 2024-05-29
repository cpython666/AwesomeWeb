<template>
  <div class="world" ref="container"></div>
</template>

<script>
import * as THREE from "three";
import RAFManager from "raf-manager";
import Rocks from "./Rocks";
import Album from "./Album";
import Mouse from "./Mouse";
import FollowEffect from "./FollowEffect";
import texture from "../assets/dot.png";

export default {
  name: "World",
  mounted() {
    this.initThree();
    this.addLight();
    this.addBackRocks();
    this.addAlbum();
    this.addMouseAndEffect();

    this.render = this.render.bind(this);
    RAFManager.add(this.render);
  },
  destroyed() {
    RAFManager.remove(this.render);
  },

  methods: {
    initThree: function() {
      const container = this.$refs.container;
      const camera = new THREE.PerspectiveCamera(
        45,
        container.offsetWidth / container.offsetHeight,
        1,
        3000
      );
      camera.position.z = 500;

      const scene = new THREE.Scene();
      const renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      container.appendChild(renderer.domElement);
      renderer.setClearColor(0x000000, 0);
      const clock = new THREE.Clock();

      this.clock = clock;
      this.scene = scene;
      this.camera = camera;
      this.renderer = renderer;
    },

    addLight: function() {
      const { scene } = this;

      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
      hemiLight.position.set(0, 1000, 0);
      scene.add(hemiLight);

      const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
      dirLight.position.set(-3000, 1000, -1000);
      scene.add(dirLight);
    },

    addBackRocks: function() {
      const { scene } = this;
      const rocks = new Rocks();
      rocks.addToScene(scene);
      this.rocks = rocks;
    },

    addAlbum: function() {
      const { scene, camera, renderer } = this;
      const album = new Album({ camera, renderer });
      album.addToScene(scene);
      this.album = album;
    },

    addMouseAndEffect: function() {
      const { scene, renderer, camera, album } = this;
      const follow = new FollowEffect({
        texture,
        renderer,
        camera,
        scene
      });

      new Mouse({ display: album.display, camera, renderer });

      this.follow = follow;
    },

    render: function() {
      const { renderer, scene, camera, rocks, clock, follow } = this;

      follow.render();
      rocks.render(clock);
      renderer.render(scene, camera);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.world {
  position: absolute;
  bottom: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #161616;
  background-image: radial-gradient(#161616, #000);
}
</style>
