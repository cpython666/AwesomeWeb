import * as THREE from "three";
import ppo from "ppo";
import gsap from "gsap";
import xEmiiter from "xemitterjs";
import {
  ModifierStack,
  Twist,
  Noise,
  Bend,
  UserDefined,
  Vector3,
  ModConstant
} from "three.modifiers";

export default class Photo {
  constructor(texture) {
    this.init(texture);
  }

  init(texture) {
    this.width = 1003 / 1;
    this.height = 564 / 1;

    const map = new THREE.TextureLoader().load(texture);
    const display = new THREE.Mesh(
      new THREE.PlaneGeometry(this.width, this.height, 12, 12, true),
      new THREE.MeshBasicMaterial({ map, side: THREE.DoubleSide })
    );

    this.addModifier(display);
    this.display = display;
    xEmiiter.on("MENU_CLICK", this.changeModifier.bind(this));
  }

  show() {
    const { display } = this;

    const base = { duration: 0.7, ease: "back.out" };
    gsap.to(display.scale, {
      x: 1,
      y: 1,
      ...base
    });

    gsap.to(display.position, {
      x: display.to.x,
      y: display.to.y,
      z: display.to.z,
      ...base
    });

    this.animateModifier(base);
  }

  hide() {
    const { display } = this;

    const base = { duration: 0.6, ease: "back.out" };
    gsap.to(display.scale, {
      x: display.fromScale,
      y: display.fromScale,
      ...base
    });

    gsap.to(display.position, {
      x: display.from.x,
      y: display.from.y,
      z: display.from.z,
      ...base
    });
  }

  addModifier(mesh) {
    const modifier = new ModifierStack(mesh);
    this.modifier = modifier;
    this.changeModifier("Twist");
  }

  changeModifier(type) {
    const { modifier, currentModifier } = this;
    modifier.removeModifier(currentModifier);
    modifier.reset();
    this.type = type;

    switch (type) {
      case "Twist": {
        const twist = new Twist(2);
        twist.vector = new Vector3(0, 1, 0);
        this.currentModifier = twist;
        modifier.addModifier(twist);
        break;
      }

      case "Noise": {
        const noise = new Noise(0);
        noise.frc = 15;
        this.currentModifier = noise;
        modifier.addModifier(noise);
        break;
      }

      case "Bend": {
        const bend = new Bend(1.2, 0.3, 1);
        bend.constraint = ModConstant.LEFT;
        this.currentModifier = bend;
        modifier.addModifier(bend);
        break;
      }

      case "Custom": {
        const userDefined = new UserDefined();
        userDefined.angle = 0;
        userDefined.renderVector = (vec, i, l) => {
          const { angle } = userDefined;
          let scale = Math.abs(l / 2 - i) / (l / 2);
          scale = i % 4 === 0 ? scale * -0.6 : scale;
          scale = Math.min(scale, 1);
          const r = 150;

          vec.x += r * Math.sin(angle) * scale;
          vec.y += r * Math.cos(angle + Math.PI / 2) * scale;
        };
        this.currentModifier = userDefined;
        modifier.addModifier(userDefined);
        break;
      }

      default:
        break;
    }
  }

  animateModifier(base) {
    const { modifier, currentModifier, type } = this;
    switch (type) {
      case "Twist": {
        gsap.fromTo(
          currentModifier,
          { angle: ppo.randomA2B(-2, -0.5) * Math.PI },
          {
            angle: 0,
            ...base,
            onUpdate: () => modifier.apply()
          }
        );
        break;
      }

      case "Noise": {
        gsap.fromTo(
          currentModifier,
          { frc: 200 },
          {
            frc: 0,
            ...base,
            onUpdate: () => modifier.apply()
          }
        );
        break;
      }

      case "Bend": {
        gsap.fromTo(
          currentModifier,
          {
            force: 6,
            angle: 0
          },
          {
            force: 0,
            angle: 2,
            ...base,
            ease: "cubic.out",
            onUpdate: () => modifier.apply()
          }
        );
        break;
      }

      case "Custom": {
        gsap.fromTo(
          currentModifier,
          { angle: Math.PI },
          {
            angle: 0,
            ...base,
            ease: "cubic.out",
            onUpdate: () => modifier.apply()
          }
        );
        break;
      }

      default:
        break;
    }
  }

  addToScene(scene) {
    scene.add(this.display);
  }
}
