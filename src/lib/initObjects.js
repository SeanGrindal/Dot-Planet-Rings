import * as THREE from 'three'

import vertexShader from '../shaders/vertex.glsl'
import fragmentShader from '../shaders/fragment.glsl'

export function initObjects(sketch) {
  const textureLoader = new THREE.TextureLoader()
  const planetTexture = textureLoader.load('/planet-texture.jpg')

  // Rings
  const parameters = {
    count: 30000,
    radius: 1,
    //  insideColor: '#808080',
    //  outsideColor: '#1c1c1c',
    insideColor: '#2b2b2b',
    outsideColor: '#5e5e5e',
  }

  const positions = new THREE.BufferAttribute(new Float32Array(parameters.count * 3), 3)
  const colors = new THREE.BufferAttribute(new Float32Array(parameters.count * 3), 3)
  const scales = new THREE.BufferAttribute(new Float32Array(parameters.count), 1)

  const insideColor = new THREE.Color(parameters.insideColor)
  const outsideColor = new THREE.Color(parameters.outsideColor)

  const rand = (a, b) => {
    return a + (b - a) * Math.random()
  }

  for (let i = 0; i < parameters.count; i++) {
    // Position
    const angle = Math.random() * Math.PI * 2
    const radius = rand(0.6, 0.9) * parameters.radius

    positions.setXYZ(i, Math.sin(angle) * radius, rand(0, 0.01), Math.cos(angle) * radius)

    // Color
    const mixedColor = insideColor.clone()
    mixedColor.lerp(outsideColor, radius / parameters.radius)

    colors.setXYZ(i, mixedColor.r, mixedColor.g, mixedColor.b)

    // Scale
    //  scales.setX(i, rand(4, 22))
    scales.setX(i, rand(8, 22))
  }

  const ringGeometry = new THREE.BufferGeometry()

  ringGeometry.setAttribute('position', positions)
  ringGeometry.setAttribute('aScale', scales)
  ringGeometry.setAttribute('aColor', colors)

  sketch.ringMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
    },
    side: THREE.DoubleSide,
    depthWrite: false,
    transparent: true,
    vertexColors: true,
  })
  const mesh = new THREE.Points(ringGeometry, sketch.ringMaterial)
  mesh.rotation.set(0.5, -1, 0)

  sketch.scene.add(mesh)

  // Planet
  sketch.planet = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.4, 128, 128),
    new THREE.MeshStandardMaterial({
      map: planetTexture,
    })
  )
  sketch.scene.add(sketch.planet)
}
