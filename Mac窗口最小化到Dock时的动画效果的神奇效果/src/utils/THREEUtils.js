export default {
  // get real size position
  getRealSizePos({ camera, renderer }) {
    const height = renderer.getSize().height;
    const vFOV = (camera.fov * Math.PI) / 180;
    const dist = height / (2 * Math.tan(vFOV / 2));

    return camera.position.z - dist;
  },

  scale(display, scale) {
    display.scale.x = scale;
    display.scale.y = scale;
  }
};
