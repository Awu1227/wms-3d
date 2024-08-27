import * as THREE from "three";

import Experience from "../Experience.js";

export default class Video {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.video = document.getElementById("video");
    this.video.src = "/videos/jackyun.mp4";
    this.video.autoplay = true;
    this.video.loop = true;

    // Setup
    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(340, 130);
  }

  setTextures() {
    this.texture = new THREE.VideoTexture(this.video);

    this.texture.colorSpace = THREE.SRGBColorSpace;
  }

  setMaterial() {
    this.material = new THREE.MeshBasicMaterial({ map: this.texture });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.y = 120;
    this.mesh.position.z = -110;
    this.mesh.position.x = 35;

    this.mesh.castShadow = true;
    this.scene.add(this.mesh);
  }
}
