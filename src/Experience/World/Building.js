import * as THREE from "three";
import Experience from "../Experience.js";

export default class Building {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Debug
    this.debug = this.experience.debug;

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("fox");
    }

    // Setup
    this.resource = this.resources.items.buildingModel;
    this.time = this.experience.time;

    this.setModel();
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.scale.set(10, 20, 10);
    this.model.position.x = -1320;
    this.model.position.y = -5;
    this.model.position.z = 140;

    this.scene.add(this.model);

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
  }

  update() {
    this.animation.mixer.update(this.time.delta * 0.001);
  }
}
