import * as THREE from "three";

import Experience from "../Experience.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

export default class Text {
  constructor(config) {
    this.config = config;
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Setup
    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new TextGeometry(this.config.name, {
      font: this.resources.items.regularfont,
      size: 10,
      height: 0.01,
    });
    this.geometry.computeBoundingBox();
    console.log("this.geometry", this.geometry);
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({ color: "#FF0000" });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.x = this.config.x;
    this.mesh.position.z = this.config.z;
    this.mesh.position.y = 0.4;
    this.mesh.rotation.x = -Math.PI * 0.5;
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
  }
  update() {
    const intersectObj = this.experience.rayCaster.intersects[0];
    if (intersectObj && intersectObj.object.uuid === this.mesh.uuid) {
      this.experience.emitter.emit("showDrawer", { isShow: true });
    }
  }
}
