import * as THREE from "three";
import Experience from "../Experience.js";

export default class Space {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Debug
    this.debug = this.experience.debug;

    // Setup
    this.resource = this.resources.items.factoryModel;
    this.time = this.experience.time;

    this.setModel();
  }

  setModel() {
    this.model = this.resource.scene;
    console.log("this.model", this.model);
    this.model.children[0].children[0].children.forEach((item) => {
      if (
        item.name.includes("Object_3") ||
        item.name.includes("Object_4") ||
        item.name.includes("Object_5") ||
        item.name.includes("Object_6") ||
        item.name.includes("Object_7")
      ) {
        item.visible = false;
      }
    });
    this.model.scale.set(20, 20, 10);
    this.model.position.x = -140;
    this.model.position.y = -5;
    this.model.position.z = 140;

    this.scene.add(this.model);
  }

  update() {
    this.animation.mixer.update(this.time.delta * 0.001);
  }
}
