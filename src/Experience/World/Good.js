import * as THREE from "three";

import Experience from "../Experience.js";

export default class Good {
  constructor(storageUnit,config) {
    this.storageUnit = storageUnit;
    this.config = config;

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
    this.geometry = new THREE.BoxGeometry(2, 2, 2);
  }

  setTextures() {
    this.textures = {};

    // 设置材质的颜色贴图纹理对象
    this.textures.color = this.resources.items.goodColorTexture;
    this.textures.color.encoding = THREE.sRGBEncoding; // 设置sRGB编码方式以提高颜色的准确性和一致性，避免出现色彩误差和变形等问题。
    this.textures.color.repeat.set(1, 1); // 用于控制材质贴图重复的次数，将贴图在S轴和T轴上重复1.5次
    this.textures.color.wrapS = THREE.RepeatWrapping; // 在S轴（水平）方向上采用重复纹理的方式，即在纹理周围填充与之相同的纹理，实现更好的纹理平铺效果
    this.textures.color.wrapT = THREE.RepeatWrapping; // 在T轴（垂直）方向上采用重复纹理的方式，即在纹理周围填充与之相同的纹理，实现更好的纹理平铺效果
    this.textures.color.flipX = false; // 设置纹理贴图在垂直方向上的翻转，默认为false，表示不翻转
    this.textures.color.flipY = false; // 设置纹理贴图在水平方向上的翻转，默认为false，表示不翻转

  }

  setMaterial() {
    this.material = new THREE.MeshPhongMaterial({
      map: this.textures.color,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI * 0.5;

    this.mesh.position.x = this.config.x

    this.mesh.position.y = (this.config.y * this.storageUnit.layer ) + 1.5

    this.mesh.position.z = this.config.z * (this.storageUnit.slot - 1)

    this.mesh.castShadow = true;
    this.scene.add(this.mesh);
  }
  update() {
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.01;
  }
  destroy() {
    this.scene.remove(this.mesh);
  }
}
