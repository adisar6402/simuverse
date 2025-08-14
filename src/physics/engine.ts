import * as CANNON from 'cannon-es'
import { SimulationParams } from '../App'

let world: CANNON.World
let bodies: CANNON.Body[] = []

export function initializePhysics(params: SimulationParams) {
  // Initialize Cannon.js physics world
  world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -params.gravity, 0),
    broadphase: new CANNON.NaiveBroadphase(),
    solver: new CANNON.GSSolver()
  })

  // Ground physics body
  const groundShape = new CANNON.Plane()
  const groundBody = new CANNON.Body({ 
    mass: 0,
    shape: groundShape,
    position: new CANNON.Vec3(0, -1, 0)
  })
  groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)
  world.addBody(groundBody)

  // Create physics bodies for objects
  params.objects.forEach(objParams => {
    let shape: CANNON.Shape

    switch (objParams.type) {
      case 'sphere':
        shape = new CANNON.Sphere(objParams.size[0])
        break
      case 'box':
      case 'building':
        shape = new CANNON.Box(new CANNON.Vec3(...objParams.size.map(s => s / 2)))
        break
      case 'rocket':
        shape = new CANNON.Cylinder(
          objParams.size[0] / 4, // top radius
          objParams.size[0], // bottom radius  
          objParams.size[1], // height
          8 // segments
        )
        break
      default:
        shape = new CANNON.Sphere(1)
    }

    const body = new CANNON.Body({
      mass: objParams.mass,
      shape: shape,
      position: new CANNON.Vec3(...objParams.position),
      velocity: new CANNON.Vec3(...objParams.velocity)
    })

    // Material properties
    body.material = new CANNON.Material({
      friction: 0.4,
      restitution: 0.3
    })

    world.addBody(body)
    bodies.push(body)
  })

  // Start physics simulation
  const timeStep = 1 / 60
  let lastTime = performance.now()

  function step() {
    const now = performance.now()
    const dt = (now - lastTime) / 1000
    lastTime = now

    world.step(timeStep, dt, 3)
    requestAnimationFrame(step)
  }

  step()

  // Cleanup function
  return () => {
    bodies.forEach(body => world.removeBody(body))
    bodies = []
  }
}

export function updateGravity(gravity: number) {
  if (world) {
    world.gravity.set(0, -gravity, 0)
  }
}

export function updateWind(windForce: number) {
  if (world) {
    bodies.forEach(body => {
      // Apply wind force
      const windVector = new CANNON.Vec3(windForce * 0.1, 0, 0)
      body.force.vadd(windVector, body.force)
    })
  }
}