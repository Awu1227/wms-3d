import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import EventEmitter from './EventEmitter.js'
import Experience from '../Experience.js'
const loadingBarElement = document.querySelector(".loading-bar")

export default class Resources extends EventEmitter {
  constructor(sources) {
    super()

    // Options
    this.sources = sources
    this.setLoaders()
    this.startLoading()
    this.experience = new Experience();
    // Setup
    this.items = {}
    this.toLoad = this.sources.length
    this.loaded = 0
  }

  setLoaders() {
    this.loaders = {}
    this.loaders.gltfLoader = new GLTFLoader()
    this.loaders.textureLoader = new THREE.TextureLoader()
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
    this.loaders.dracoLoader = new DRACOLoader()
    this.loaders.fontLoader = new FontLoader()
  }

  startLoading() {
    // Load each source
    for (const source of this.sources) {
      if (source.type === 'gltfModel') {
        this.loaders.gltfLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file)
        })
      } else if (source.type === 'texture') {
        this.loaders.textureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file)
        })
      } else if (source.type === 'cubeTexture') {
        this.loaders.cubeTextureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file)
        })
      } else if (source.type === 'font') {
        this.loaders.fontLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file)
        })
      }
    }
  }

  sourceLoaded(source, file) {
    console.log('loadingBarElement',loadingBarElement);
    
    this.items[source.name] = file

    this.loaded++

    const progressRatio = this.loaded / this.toLoad
    loadingBarElement.style.transform = `scaleX(${progressRatio})`

    if (this.loaded === this.toLoad) {
      this.trigger('ready')
      setTimeout(() => {
        // Animate overlay
        this.experience.world.overLay.updateMat()
  
        // Update loadingBarElement
        loadingBarElement.classList.add("ended")
        loadingBarElement.style.transform = ""
      }, 500)
    }
  }
}
