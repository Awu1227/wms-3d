import * as THREE from "three";

import Experience from "../Experience.js";

export default class Ground {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Setup
    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.CircleGeometry(1000, 100);
  }

  setTextures() {
    this.textures = {};
    this.textures.color = this.resources.items.grassColorTexture;
    this.textures.color.encoding = THREE.sRGBEncoding;
    this.textures.color.repeat.set(50, 50);
    this.textures.color.wrapS = THREE.RepeatWrapping;
    this.textures.color.wrapT = THREE.RepeatWrapping;
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      map: this.textures.color,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI * 0.5;
    this.mesh.position.x = -500;

    this.mesh.position.y = -5;

    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
  }
}
