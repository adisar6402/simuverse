export interface PhysicsPreset {
  gravity: number
  wind: number
  mass: number
  temperature: number
}

export function getPhysicsPresets(): Record<string, PhysicsPreset> {
  return {
    earth: {
      gravity: 9.81,
      wind: 0,
      mass: 10,
      temperature: 20
    },
    mars: {
      gravity: 3.71, // Mars gravity is ~38% of Earth
      wind: 25, // Mars can have strong dust storms
      mass: 10,
      temperature: -65 // Average Mars temperature
    },
    moon: {
      gravity: 1.62, // Moon gravity is ~16% of Earth
      wind: 0, // No atmosphere on the Moon
      mass: 10,
      temperature: -20 // Average Moon temperature (varies widely)
    },
    jupiter: {
      gravity: 24.79, // Jupiter gravity is ~2.5x Earth
      wind: 100, // Extreme winds on Jupiter
      mass: 10,
      temperature: -145 // Jupiter's cloud tops
    },
    space: {
      gravity: 0, // Zero gravity in space
      wind: 0, // No atmosphere in space
      mass: 10,
      temperature: -270 // Near absolute zero
    },
    storm: {
      gravity: 9.81,
      wind: 45, // Hurricane force winds
      mass: 10,
      temperature: 25
    }
  }
}

export function getOfflineExamples() {
  return [
    {
      name: "Mars Rocket Launch",
      scenario: "Simulate a rocket launch on Mars with low gravity",
      params: {
        ...getPhysicsPresets().mars,
        scenario: "Mars Rocket Launch",
        objects: [{
          type: 'rocket' as const,
          mass: 500000,
          position: [0, 0, 0] as [number, number, number],
          velocity: [0, 50, 0] as [number, number, number],
          size: [2, 10, 2] as [number, number, number]
        }]
      }
    },
    {
      name: "Hurricane Skyscraper", 
      scenario: "Model a skyscraper in a hurricane with 200 km/h winds",
      params: {
        ...getPhysicsPresets().storm,
        wind: 55, // 200 km/h converted
        scenario: "Hurricane Skyscraper",
        objects: [{
          type: 'building' as const,
          mass: 10000000,
          position: [0, 50, 0] as [number, number, number],
          velocity: [0, 0, 0] as [number, number, number],
          size: [20, 100, 20] as [number, number, number]
        }]
      }
    },
    {
      name: "Drone Payload Drop",
      scenario: "Simulate a drone carrying 200 kg in 40°C heat with strong wind",
      params: {
        ...getPhysicsPresets().earth,
        wind: 30,
        temperature: 40,
        mass: 200,
        scenario: "Drone Payload Drop",
        objects: [{
          type: 'box' as const,
          mass: 5,
          position: [0, 10, 0] as [number, number, number],
          velocity: [5, 0, 5] as [number, number, number],
          size: [1, 0.3, 1] as [number, number, number]
        }]
      }
    }
  ]
}