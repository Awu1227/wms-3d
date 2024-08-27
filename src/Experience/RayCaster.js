import * as THREE from "three";

import Experience from "./Experience.js";

export default class RayCaster {
  constructor(experience) {
    this.pointer = new THREE.Vector2();
    this.experience = new Experience();

    window.addEventListener("pointermove", (event) => {
      this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Set up
    this.scene = this.experience.scene;

    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.Raycaster();
  }

  // Update
  update() {
    if (this.experience.camera) {
      this.instance.setFromCamera(
        this.pointer,
        this.experience.camera.instance
      );
      const intersects = this.instance.intersectObjects(this.scene.children);
      this.intersects = intersects;
    }
  }
}
