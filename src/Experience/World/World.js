import * as THREE from "three";

import Experience from "../Experience.js";
import Environment from "./Environment.js";
import GridHelper from "../Helper/GridHelper.js";
import Floor from "./Floor.js";
import Ground from "./Ground.js";
import Shelf from "./Shelf.js";
import Rack from "./Rack.js";
import Text from "./Text.js";
import Fox from "./Fox.js";
import Factory from "./Space.js";
import Building from "./Building.js";
import Box from "./Box";
import Area from "./Area.js";
import Video from "./Video.js";
import OverLay from "./OverLay.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.environment = new Environment();
    this.areas = [];

    this.resources = this.experience.resources;

    this.overLay = new OverLay();
    // Wait for resources
    this.resources.on("ready", () => {
      this.text = new Text({ x: 20, z: 108, name: "编辑仓库" });
      // Setup
      // this.gridHelper = new GridHelper();
      this.factory = new Factory();
      this.building = new Building();
      this.floor = new Floor();
      this.ground = new Ground();
      this.environment = new Environment();
      this.video = new Video();
    });

    // Test mesh
    // const testMesh = new THREE.Mesh(
    //   new THREE.BoxGeometry(1, 1, 1),
    //   new THREE.MeshStandardMaterial()
    // )
    // this.scene.add(testMesh)
  }

  update() {
    if (this.fox) this.fox.update();
    if (this.box) this.box.update();
    if (this.text) this.text.update();
  }
}
