let audioContext: AudioContext | null = null
let masterGain: GainNode | null = null
let ambientSound: AudioBufferSourceNode | null = null

export function initializeAudio() {
  try {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    masterGain = audioContext.createGain()
    masterGain.connect(audioContext.destination)
    masterGain.gain.value = 0.3

    // Create ambient background hum
    createAmbientSound()

    console.log('Audio system initialized')
    
    return () => {
      if (ambientSound) {
        ambientSound.stop()
      }
      if (audioContext) {
        audioContext.close()
      }
    }
  } catch (error) {
    console.warn('Audio not supported:', error)
    return () => {}
  }
}

function createAmbientSound() {
  if (!audioContext || !masterGain) return

  // Create a simple ambient hum using oscillators
  const oscillator1 = audioContext.createOscillator()
  const oscillator2 = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator1.type = 'sine'
  oscillator1.frequency.value = 60 // Low hum
  oscillator2.type = 'sine'
  oscillator2.frequency.value = 120 // Harmonic

  gainNode.gain.value = 0.1
  
  oscillator1.connect(gainNode)
  oscillator2.connect(gainNode)
  gainNode.connect(masterGain)

  oscillator1.start()
  oscillator2.start()

  // Add some variation
  const lfo = audioContext.createOscillator()
  const lfoGain = audioContext.createGain()
  
  lfo.type = 'sine'
  lfo.frequency.value = 0.1 // Very slow modulation
  lfoGain.gain.value = 5
  
  lfo.connect(lfoGain)
  lfoGain.connect(oscillator1.frequency)
  lfo.start()
}

export function playCollisionSound(intensity: number = 1) {
  if (!audioContext || !masterGain) return

  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  const filter = audioContext.createBiquadFilter()

  oscillator.type = 'square'
  oscillator.frequency.value = 100 + Math.random() * 200
  
  filter.type = 'lowpass'
  filter.frequency.value = 1000
  
  gainNode.gain.value = 0.2 * intensity
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

  oscillator.connect(filter)
  filter.connect(gainNode)
  gainNode.connect(masterGain)

  oscillator.start()
  oscillator.stop(audioContext.currentTime + 0.5)
}

export function playWindSound(windSpeed: number) {
  if (!audioContext || !masterGain || windSpeed < 5) return

  const bufferSize = 4096
  const whiteNoise = audioContext.createScriptProcessor(bufferSize, 1, 1)
  const gainNode = audioContext.createGain()
  const filter = audioContext.createBiquadFilter()

  whiteNoise.onaudioprocess = (e) => {
    const output = e.outputBuffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1
    }
  }

  filter.type = 'bandpass'
  filter.frequency.value = 500 + windSpeed * 10
  filter.Q.value = 2

  gainNode.gain.value = Math.min(windSpeed / 100, 0.3)

  whiteNoise.connect(filter)
  filter.connect(gainNode)  
  gainNode.connect(masterGain)

  // Clean up after 2 seconds
  setTimeout(() => {
    whiteNoise.disconnect()
  }, 2000)
}

export function playRocketSound() {
  if (!audioContext || !masterGain) return

  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  const filter = audioContext.createBiquadFilter()

  oscillator.type = 'sawtooth'
  oscillator.frequency.value = 80
  oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 2)
  
  filter.type = 'lowpass'
  filter.frequency.value = 2000
  
  gainNode.gain.value = 0.4
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 3)

  oscillator.connect(filter)
  filter.connect(gainNode)
  gainNode.connect(masterGain)

  oscillator.start()
  oscillator.stop(audioContext.currentTime + 3)
}