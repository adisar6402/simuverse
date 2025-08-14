import { SimulationParams } from '../App'
import { getPhysicsPresets } from '../physics/presets'

/**
 * Mock AI parsing function that converts natural language to physics parameters
 * In production, this would call GPT-4 API with proper prompt engineering
 */
export async function parseScenario(scenario: string, isOffline: boolean = false): Promise<SimulationParams> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  const presets = getPhysicsPresets()
  const lowerScenario = scenario.toLowerCase()

  // Simple keyword-based parsing (replace with actual AI in production)
  let params: SimulationParams = {
    gravity: 9.81, // Earth gravity default
    wind: 0,
    mass: 10,
    temperature: 20,
    scenario: scenario,
    objects: []
  }

  // Mars scenarios
  if (lowerScenario.includes('mars')) {
    params = { ...params, ...presets.mars }
  }
  // Moon scenarios  
  else if (lowerScenario.includes('moon')) {
    params = { ...params, ...presets.moon }
  }
  // Hurricane/storm scenarios
  else if (lowerScenario.includes('hurricane') || lowerScenario.includes('storm') || lowerScenario.includes('wind')) {
    params.wind = 40
    if (lowerScenario.includes('200')) params.wind = 55 // 200 km/h winds
  }
  // Hot temperature scenarios
  else if (lowerScenario.includes('40°c') || lowerScenario.includes('hot')) {
    params.temperature = 40
  }

  // Object detection
  if (lowerScenario.includes('rocket')) {
    params.objects.push({
      type: 'rocket',
      mass: 500000, // 500 tons for rocket
      position: [0, 0, 0],
      velocity: [0, 50, 0], // Initial upward velocity
      size: [2, 10, 2]
    })
  } else if (lowerScenario.includes('skyscraper') || lowerScenario.includes('building')) {
    params.objects.push({
      type: 'building',
      mass: 10000000, // 10,000 tons
      position: [0, 50, 0],
      velocity: [0, 0, 0],
      size: [20, 100, 20]
    })
  } else if (lowerScenario.includes('drone')) {
    params.mass = 200 // 200 kg payload mentioned
    params.objects.push({
      type: 'box',
      mass: 5, // Drone itself
      position: [0, 10, 0],
      velocity: [5, 0, 5],
      size: [1, 0.3, 1]
    })
  } else if (lowerScenario.includes('basketball') && lowerScenario.includes('feather')) {
    params.objects.push(
      {
        type: 'sphere',
        mass: 0.6, // Basketball
        position: [-2, 10, 0],
        velocity: [0, 0, 0],
        size: [0.24, 0.24, 0.24]
      },
      {
        type: 'box',
        mass: 0.001, // Feather
        position: [2, 10, 0],
        velocity: [0, 0, 0],
        size: [0.1, 0.02, 0.05]
      }
    )
  } else if (lowerScenario.includes('paper airplane')) {
    params.objects.push({
      type: 'box',
      mass: 0.005,
      position: [0, 5, 0],
      velocity: [10, 0, 0],
      size: [0.2, 0.01, 0.15]
    })
  } else {
    // Default object
    params.objects.push({
      type: 'sphere',
      mass: params.mass,
      position: [0, 10, 0],
      velocity: [0, 0, 0],
      size: [1, 1, 1]
    })
  }

  return params
}

/**
 * In production, replace this with actual GPT-4 API call:
 * 
 * const response = await fetch('https://api.openai.com/v1/chat/completions', {
 *   method: 'POST',
 *   headers: {
 *     'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
 *     'Content-Type': 'application/json'
 *   },
 *   body: JSON.stringify({
 *     model: 'gpt-4',
 *     messages: [{
 *       role: 'system',
 *       content: `You are a physics simulation parameter generator. Convert natural language descriptions into JSON parameters for a physics engine. Include: gravity (m/s²), wind (m/s), mass (kg), temperature (°C), and objects array with type, mass, position, velocity, and size.`
 *     }, {
 *       role: 'user',
 *       content: scenario
 *     }],
 *     temperature: 0.1
 *   })
 * })
 */