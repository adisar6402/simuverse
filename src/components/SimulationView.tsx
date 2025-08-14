import React, { useEffect, useRef, useState } from 'react'
import { SimulationParams } from '../App'
import { initializeScene } from '../three/scene'
import { initializePhysics } from '../physics/engine'
import { initializeAudio } from '../audio/bus'
import SlidersPanel from './SlidersPanel'
import HUD from './HUD'
import RecordShareFAB from './RecordShareFAB'

interface SimulationViewProps {
  params: SimulationParams
  onBack: () => void
}

const SimulationView: React.FC<SimulationViewProps> = ({ params, onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [simulationState, setSimulationState] = useState({
    isRunning: true,
    currentGravity: params.gravity,
    currentWind: params.wind,
    currentMass: params.mass,
    fps: 60
  })

  useEffect(() => {
    if (!canvasRef.current) return

    const cleanup = initializeScene(canvasRef.current, params)
    const physicsCleanup = initializePhysics(params)
    const audioCleanup = initializeAudio()

    return () => {
      cleanup?.()
      physicsCleanup?.()
      audioCleanup?.()
    }
  }, [params])

  const handleParameterChange = (parameter: string, value: number) => {
    setSimulationState(prev => ({
      ...prev,
      [`current${parameter.charAt(0).toUpperCase() + parameter.slice(1)}`]: value
    }))
    
    // Update physics engine with new parameters
    console.log(`Updated ${parameter}: ${value}`)
  }

  const handleToggleSimulation = () => {
    setSimulationState(prev => ({
      ...prev,
      isRunning: !prev.isRunning
    }))
  }

  const handleResetSimulation = () => {
    // Reset to original parameters
    setSimulationState(prev => ({
      ...prev,
      currentGravity: params.gravity,
      currentWind: params.wind,
      currentMass: params.mass,
      isRunning: true
    }))
  }

  return (
    <div className="h-screen flex flex-col bg-cyber-black overflow-hidden">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-3 sm:p-4 glassmorphism border-b border-neon-cyan/30 space-y-2 sm:space-y-0">
        <button
          onClick={onBack}
          className="px-3 sm:px-4 py-2 neon-button rounded-lg text-neon-cyan font-bold transition-all duration-300 text-sm sm:text-base touch-manipulation"
        >
          <span className="hidden sm:inline">← Back to SimuVerse</span>
          <span className="sm:hidden">← Back</span>
        </button>
        
        <div className="text-center flex-1 sm:flex-none">
          <h2 className="text-lg sm:text-xl font-bold text-glow-cyan truncate max-w-xs sm:max-w-none">
            {params.scenario}
          </h2>
        </div>
        
        <div className="flex space-x-2 flex-shrink-0">
          <button
            onClick={handleToggleSimulation}
            className={`px-4 py-2 rounded-lg font-bold transition-all duration-300 ${
              simulationState.isRunning
                ? 'bg-red-500/20 border border-red-500 text-red-500'
                : 'bg-green-500/20 border border-green-500 text-green-500'
            } text-sm sm:text-base touch-manipulation`}
          >
            <span className="hidden sm:inline">
              {simulationState.isRunning ? '⏸️ Pause' : '▶️ Play'}
            </span>
            <span className="sm:hidden">
              {simulationState.isRunning ? '⏸️' : '▶️'}
            </span>
          </button>
          
          <button
            onClick={handleResetSimulation}
            className="px-4 py-2 neon-button rounded-lg text-neon-magenta font-bold transition-all duration-300 text-sm sm:text-base touch-manipulation"
          >
            <span className="hidden sm:inline">🔄 Reset</span>
            <span className="sm:hidden">🔄</span>
          </button>
        </div>
      </div>

      {/* Main Simulation Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Canvas Container */}
        <div className="flex-1 relative">
          <canvas
            ref={canvasRef}
            className="w-full h-full simulation-canvas touch-none"
            style={{ background: 'radial-gradient(circle at center, #001122 0%, #000000 100%)' }}
          />
          
          {/* HUD Overlay */}
          <HUD 
            gravity={simulationState.currentGravity}
            wind={simulationState.currentWind}
            mass={simulationState.currentMass}
            fps={simulationState.fps}
            isRunning={simulationState.isRunning}
          />
        </div>

        {/* Control Panel */}
        <div className="lg:block">
          <SlidersPanel
          gravity={simulationState.currentGravity}
          wind={simulationState.currentWind}
          mass={simulationState.currentMass}
          temperature={params.temperature}
          onParameterChange={handleParameterChange}
          />
        </div>
      </div>

      {/* Record & Share FAB */}
      <RecordShareFAB canvasRef={canvasRef} />
    </div>
  )
}

export default SimulationView