import * as THREE from "three";

import Experience from "../Experience.js";


/**
 * @description 创建单层货架，货架由一块板和4条腿组成
 */
export default class Rack {
  constructor(config) {
    this.config = config;
    const {x, y, z, plane_x, plane_y, plane_z, holder_x, holder_y, holder_z, name, num} = config

    this.x = x; // 货架的x坐标
    this.y = y; // 货架的y坐标
    this.z = z; // 货架的z坐标
    this.plane_x = plane_x; // 货架版面的长
    this.plane_y = plane_y; // 货架版面的高
    this.plane_z = plane_z; // 货架版面的宽
    this.holder_x = holder_x; // 货架腿的长
    this.holder_y = holder_y; // 货架腿的高
    this.holder_z = holder_z; // 货架腿的宽
    this.name = name; // 货架的名称
    this.num = num; // 货架的货位数量

    this.group = new THREE.Group();
    this.group.name = name;
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.goods = []

    // Setup
    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setMesh();

  }

  setGeometry() {
    this.planGeo = new THREE.BoxGeometry(this.plane_x, this.plane_y, this.plane_z);
    this.holdGeo = new THREE.BoxGeometry(this.holder_x, this.holder_y, this.holder_z);
  }

  setTextures() {
    this.textures = {};

    // 设置材质的颜色贴图纹理对象
    this.textures.color = this.resources.items.rackColorTexture;

  }

  setMaterial() {
    this.planeMat = new THREE.MeshBasicMaterial({
      map: this.textures.color,
    });
    this.planeMat.needsUpdate = true;
    this.holderMat = new THREE.MeshBasicMaterial({color:0x1C86EE});
  }

  setMesh() {
    const gz = []
    for(let i = 0; i < this.num; i++){
        gz.push( this.z +(this.plane_z) * i );
        this.planeMesh = new THREE.Mesh(this.planGeo, this.planeMat);
        this.planeMesh.position.set(this.x , this.y, gz[i]) ;
        this.group.add(this.planeMesh);
    }

    // 添加货架腿
    this.holdMesh1 = new THREE.Mesh(this.holdGeo,  this.holderMat);
    this.holdMesh2 = new THREE.Mesh(this.holdGeo,  this.holderMat);
    this.holdMesh3 = new THREE.Mesh(this.holdGeo,  this.holderMat);
    this.holdMesh4 = new THREE.Mesh(this.holdGeo,  this.holderMat);

    this.holdMesh1.position.set(this.x - this.plane_x/2 + this.holder_x/2, this.y - this.holder_y/2-this.plane_y/2, this.z +this.holder_z/2 - this.plane_z /2);// 左上
    this.holdMesh2.position.set(this.x + this.plane_x/2-this.holder_x/2, this.y-this.holder_y/2-this.plane_y/2,this.z+this.holder_z/2 - this.plane_z /2); // 右上
    this.holdMesh3.position.set(this.x - this.plane_x/2+this.holder_x/2, this.y-this.holder_y/2-this.plane_y/2,this.z+ this.plane_z * (this.num - 1) + this.plane_z / 2 -this.holder_z/2);// 左下
    this.holdMesh4.position.set(this.x + this.plane_x/2-this.holder_x/2, this.y-this.holder_y/2-this.plane_y/2,this.z+ this.plane_z  * (this.num - 1) + this.plane_z / 2  -this.holder_z/2); // 右下
    this.group.add(this.holdMesh1,this.holdMesh2,this.holdMesh3, this.holdMesh4);

    this.scene.add(this.group);
  }
  destroy() {

    this.scene.remove(this.group);

  }
}
