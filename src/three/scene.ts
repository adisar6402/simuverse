import * as THREE from 'three'
import { SimulationParams } from '../App'

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let animationId: number

export function initializeScene(canvas: HTMLCanvasElement, params: SimulationParams) {
  // Initialize Three.js scene
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000011)

  // Camera setup with cinematic positioning
  camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
  camera.position.set(15, 10, 15)
  camera.lookAt(0, 0, 0)

  // Renderer with shadows and advanced settings
  renderer = new THREE.WebGLRenderer({ 
    canvas, 
    antialias: true,
    alpha: true
  })
  renderer.setSize(canvas.clientWidth, canvas.clientHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 0.8

  // Lighting setup
  const ambientLight = new THREE.AmbientLight(0x404040, 0.3)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(10, 10, 5)
  directionalLight.castShadow = true
  directionalLight.shadow.mapSize.width = 2048
  directionalLight.shadow.mapSize.height = 2048
  scene.add(directionalLight)

  // Neon accent lighting
  const cyanLight = new THREE.PointLight(0x00ffff, 0.5, 50)
  cyanLight.position.set(-10, 5, 0)
  scene.add(cyanLight)

  const magentaLight = new THREE.PointLight(0xff00ff, 0.5, 50)
  magentaLight.position.set(10, 5, 0)
  scene.add(magentaLight)

  // Ground plane
  const groundGeometry = new THREE.PlaneGeometry(100, 100)
  const groundMaterial = new THREE.MeshLambertMaterial({ 
    color: 0x111111,
    transparent: true,
    opacity: 0.8
  })
  const ground = new THREE.Mesh(groundGeometry, groundMaterial)
  ground.rotation.x = -Math.PI / 2
  ground.position.y = -1
  ground.receiveShadow = true
  scene.add(ground)

  // Create objects based on parameters
  createObjects(params)

  // Start animation loop
  animate()

  // Handle window resize
  const handleResize = () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
  }
  window.addEventListener('resize', handleResize)

  // Cleanup function
  return () => {
    window.removeEventListener('resize', handleResize)
    if (animationId) {
      cancelAnimationFrame(animationId)
    }
    renderer.dispose()
  }
}

function createObjects(params: SimulationParams) {
  params.objects.forEach((objParams, index) => {
    let geometry: THREE.BufferGeometry
    let material: THREE.Material

    // Create geometry based on type
    switch (objParams.type) {
      case 'sphere':
        geometry = new THREE.SphereGeometry(objParams.size[0])
        material = new THREE.MeshPhongMaterial({ 
          color: index === 0 ? 0x00ffff : 0xff00ff,
          shininess: 100
        })
        break
        
      case 'box':
        geometry = new THREE.BoxGeometry(...objParams.size)
        material = new THREE.MeshPhongMaterial({ 
          color: 0x00ff00,
          transparent: true,
          opacity: 0.8
        })
        break
        
      case 'rocket':
        // Simplified rocket shape using cylinder
        geometry = new THREE.CylinderGeometry(
          objParams.size[0] / 4, // top radius
          objParams.size[0], // bottom radius
          objParams.size[1], // height
          8 // segments
        )
        material = new THREE.MeshPhongMaterial({ 
          color: 0xff4444,
          shininess: 50
        })
        break
        
      case 'building':
        geometry = new THREE.BoxGeometry(...objParams.size)
        material = new THREE.MeshPhongMaterial({ 
          color: 0x666666,
          transparent: true,
          opacity: 0.9
        })
        break
        
      default:
        geometry = new THREE.SphereGeometry(1)
        material = new THREE.MeshPhongMaterial({ color: 0xffffff })
    }

    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(...objParams.position)
    mesh.castShadow = true
    mesh.receiveShadow = true
    
    // Add glow effect for special objects
    if (objParams.type === 'rocket') {
      const glowGeometry = new THREE.SphereGeometry(objParams.size[0] * 1.2)
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xff4444,
        transparent: true,
        opacity: 0.2
      })
      const glow = new THREE.Mesh(glowGeometry, glowMaterial)
      mesh.add(glow)
    }

    scene.add(mesh)
  })

  // Add particle effects
  createParticleSystem()
}

function createParticleSystem() {
  const particleCount = 1000
  const particles = new THREE.BufferGeometry()
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 200
  }

  particles.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const particleMaterial = new THREE.PointsMaterial({
    color: 0x00ffff,
    size: 0.1,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  })

  const particleSystem = new THREE.Points(particles, particleMaterial)
  scene.add(particleSystem)
}

function animate() {
  animationId = requestAnimationFrame(animate)
  
  // Smooth camera rotation
  const time = Date.now() * 0.0002
  camera.position.x = Math.cos(time) * 20
  camera.position.z = Math.sin(time) * 20
  camera.lookAt(0, 0, 0)
  
  // Update particles
  const particles = scene.getObjectByName('particles')
  if (particles) {
    particles.rotation.y += 0.001
  }
  
  renderer.render(scene, camera)
}