import './style.css'

import * as THREE from 'three'

import { initCamera } from './lib/initCamera'
import { initObjects } from './lib/initObjects'
import { initEvents } from './lib/initEvents'
import { initControls } from './lib/initControls'

import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
// import { HalftonePass } from 'three/examples/jsm/postprocessing/HalftonePass.js';

class Sketch {
  constructor() {
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    }

    this.canvas = document.querySelector('canvas.webgl')
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      //    antialias: true
    })

    const body = document.querySelector('body')
    this.onWindowMousedown = () => {
      body.classList.add('grabbing')
    }

    this.onWindowMouseup = () => {
      body.classList.remove('grabbing')
    }

    this.canvas.addEventListener('pointerdown', this.onWindowMousedown)
    this.canvas.addEventListener('pointerup', this.onWindowMouseup)

    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    this.scene = new THREE.Scene()

    this.threeClock = new THREE.Clock()

    this.sunLight = new THREE.DirectionalLight('#fffef5', 1)
    this.sunLight.position.set(Math.cos(0), 1, Math.sin(0))
    this.scene.add(this.sunLight)

    const ambientLight = new THREE.AmbientLight('#fffef5', 0.2)
    this.scene.add(ambientLight)

    initCamera(this)
    initObjects(this)
    initEvents(this)
    initControls(this)
    this.initRenderPass()

    this.tick()
  }

  initRenderPass() {
    this.composer = new EffectComposer(this.renderer)
    this.composer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.composer.setSize(this.sizes.width, this.sizes.height)

    const renderPass = new RenderPass(this.scene, this.camera)
    this.composer.addPass(renderPass)

    // const params = {
    //     shape: 1,
    //     radius: 4,
    //     rotateR: Math.PI / 12,
    //     rotateB: Math.PI / 12 * 2,
    //     rotateG: Math.PI / 12 * 3,
    //     scatter: 0,
    //     blending: 1,
    //     blendingMode: 1,
    //     greyscale: false,
    //     disable: false
    // }

    // const halftonePass = new HalftonePass( this.sizes.width, this.sizes.height, params )
    // this.composer.addPass(halftonePass)

    this.dotScreenPass = new DotScreenPass()
    this.dotScreenPass.uniforms['scale'].value = 4

    this.composer.addPass(this.dotScreenPass)
  }

  tick() {
    this.elapsedTime = this.threeClock.getElapsedTime()

    this.ringMaterial.uniforms.uTime.value = this.elapsedTime

    this.sunLight.position.x = Math.cos(this.elapsedTime * 0.1)
    this.sunLight.position.z = Math.sin(this.elapsedTime * 0.1)

    this.planet.rotation.set(0.5, -1 - this.elapsedTime * 0.08, 0)

    this.controls.update()
    // this.renderer.render(this.scene, this.camera)
    this.composer.render()

    this.updateRequest = window.requestAnimationFrame(this.tick.bind(this))
  }

  destroy() {
    cancelAnimationFrame(this.updateRequest)

    this.threeClock = null
    this.scene = null
    this.renderer = null

    window.removeEventListener('resize', this.onWindowResize)
    this.canvas.removeEventListener('mousedown', this.onWindowMousedown)
    this.canvas.removeEventListener('mouseup', this.onWindowMouseup)
  }
}

const sketch = new Sketch()
