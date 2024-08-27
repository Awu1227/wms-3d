import * as THREE from "three";
import Rack from "./Rack.js";
import * as _ from "lodash";
import Experience from "../Experience.js";
import Good from "../World/Good.js";
export default class Shelf {
  constructor(config) {
    const { rackLevel,storageUnits } = config
    this.config = config
    this.storageUnits = storageUnits
    this.rackList = []
    this.goods = []
    for (let index = 0; index < rackLevel; index++) {
        const rackConfig = _.cloneDeep(config)
        rackConfig.y += config.y * index 
        const rack = new Rack(rackConfig)
        this.rackList.push(rack)
    }
    
    this.setGoods()

    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

  }

  setGoods() {
    console.log(this.storageUnits,this.config);
    
    for (let i = 0; i < this.storageUnits.length; i++) {
      const storageUnit = this.storageUnits[i];
      this.goods.push(new Good(storageUnit, this.config))
    }    
  }

  update() {
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.01;
  }
  destroy() {
    this.rackList.forEach(rack => rack.destroy())
    this.rackList = []

    this.goods.forEach(good => good.destroy());
    this.goods = []
  }
}
