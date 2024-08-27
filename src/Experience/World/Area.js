import * as THREE from "three";

import Experience from "../Experience.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import Shelf from "./Shelf.js";
export default class Area {
  constructor(config) {
    /**
     const config = {
         x:0,
         z:0,
         width: 10,
         height: 10,
         name: '库区1号',
         shelfList:[]
     }
     */
    this.config = config;
    this.areaId = config.id;
    this.group = new THREE.Group();
    this.shelfList = []

    // Setup
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.lineWidth = 0.2;

    this.setTextGeo();
    this.setTextMat();
    this.setText();

    this.setBorderGeo();
    this.setBorderTextures();
    this.setBorderMat();
    this.setBorders();
    this.setMesh();

    if (this.config.shelfList.length) {
      this.config.shelfList.forEach((shelfConfig,index) => {
        shelfConfig.x = (this.config.x + 10) + index * 12;
        shelfConfig.y = 5;
        shelfConfig.z = this.config.z
        shelfConfig.plane_x = 6
        shelfConfig.plane_y = 1
        shelfConfig.plane_z = 6
        shelfConfig.holder_x = 0.5
        shelfConfig.holder_y = 5
        shelfConfig.holder_z = 0.5
        shelfConfig.rackLevel = 4
        shelfConfig.num = 2

        this.shelfList.push(new Shelf(shelfConfig))
      }
      )
    }
  }

  setTextGeo() {
    this.textGeo = new TextGeometry(this.config.name, {
      font: this.resources.items.regularfont,
      size: 0.75,
      height: 0.01,
    });
    this.textGeo.computeBoundingBox();
  }
  setBorderGeo() {
    this.topBorderGeo = new THREE.PlaneGeometry(
      this.lineWidth,
      this.config.width
    );
    this.leftBorderGeo = new THREE.PlaneGeometry(
      this.lineWidth,
      this.config.height
    );
  }
  setBorderTextures() {
    this.textures = {};

    // 设置材质的颜色贴图纹理对象
    this.textures.color = this.resources.items.wallColorTexture;
    this.textures.color.encoding = THREE.sRGBEncoding; // 设置sRGB编码方式以提高颜色的准确性和一致性，避免出现色彩误差和变形等问题。
    this.textures.color.repeat.set(1.5, 1.5); // 用于控制材质贴图重复的次数，将贴图在S轴和T轴上重复1.5次
    this.textures.color.wrapS = THREE.RepeatWrapping; // 在S轴（水平）方向上采用重复纹理的方式，即在纹理周围填充与之相同的纹理，实现更好的纹理平铺效果
    this.textures.color.wrapT = THREE.RepeatWrapping; // 在T轴（垂直）方向上采用重复纹理的方式，即在纹理周围填充与之相同的纹理，实现更好的纹理平铺效果

    this.textures.normal = this.resources.items.wallNormalTexture;
    this.textures.normal.repeat.set(1.5, 1.5);
    this.textures.normal.wrapS = THREE.RepeatWrapping;
    this.textures.normal.wrapT = THREE.RepeatWrapping;
  }
  setBorderMat() {
    this.borderMaterial = new THREE.MeshPhongMaterial({
      map: this.textures.color,
      normalMap: this.textures.normal,
    });
  }
  setBorders() {
    this.leftBorder = new THREE.Mesh(this.leftBorderGeo, this.borderMaterial);
    this.leftBorder.position.x = this.config.x;
    this.leftBorder.position.z = this.config.z;
    this.leftBorder.position.y = 0.1;
    this.leftBorder.rotation.x = -Math.PI / 2.0;

    // 设置右边的Border
    this.rightBorder = this.leftBorder.clone();
    this.rightBorder.position.x = this.config.x + this.config.width;

    this.topBorder = new THREE.Mesh(this.topBorderGeo, this.borderMaterial);
    this.topBorder.position.x = this.config.x + this.config.width / 2;
    this.topBorder.position.z =
      this.config.z - this.config.height / 2 + this.lineWidth / 2;
    this.topBorder.position.y = 0.1;

    this.topBorder.rotation.x = -Math.PI / 2.0;
    this.topBorder.rotation.z = -Math.PI / 2.0;

    this.bottomBorder = this.topBorder.clone();
    this.bottomBorder.position.z =
      this.config.z + this.config.height / 2 - this.lineWidth / 2;
    this.group.add(
      this.leftBorder,
      this.rightBorder,
      this.topBorder,
      this.bottomBorder
    );
  }
  setTextMat() {
    this.textMaterial = new THREE.MeshStandardMaterial({ color: "blue" });
  }

  setText() {
    this.text = new THREE.Mesh(this.textGeo, this.textMaterial);
    this.text.name = "areaText";
    this.text.position.x = this.config.x + 0.5;

    this.text.position.y = 0;
    this.text.position.z = this.config.z + this.config.height / 2 - 1;
    this.text.rotation.x = -Math.PI * 0.5;
    this.group.add(this.text);
  }
  setMesh() {
    this.scene.add(this.group);

    // setTimeout(() => {
    //   this.experience.emitter.emit("showDrawer", { text: "showDrawer" });
    // }, 1000);
  }
  destroy() {
    this.scene.remove(this.group);

    // 删除货架
    console.log(' this.shelfList', this.shelfList);
    this.shelfList.forEach((shelf) => {
      shelf.destroy();
    })
    this.shelfList = []
  }
}
