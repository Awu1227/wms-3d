import * as THREE from "three";

import Experience from "../Experience.js";

export default class GridHelper {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setHelper();
  }

    setHelper() {
      this.gridHelper = new THREE.GridHelper(100, 10);
      this.scene.add(this.gridHelper);
    }
}
