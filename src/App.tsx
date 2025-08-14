import React, { useState, useEffect } from 'react'
import LandingPage from './components/LandingPage'
import SimulationView from './components/SimulationView'
import InstallPWAButton from './components/InstallPWAButton'

export interface SimulationParams {
  gravity: number
  wind: number
  mass: number
  temperature: number
  scenario: string
  objects: Array<{
    type: 'sphere' | 'box' | 'rocket' | 'building'
    mass: number
    position: [number, number, number]
    velocity: [number, number, number]
    size: [number, number, number]
  }>
}

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'simulation'>('landing')
  const [simulationParams, setSimulationParams] = useState<SimulationParams | null>(null)
  const [isOffline, setIsOffline] = useState(!navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleStartSimulation = (params: SimulationParams) => {
    setSimulationParams(params)
    setCurrentView('simulation')
  }

  const handleBackToLanding = () => {
    setCurrentView('landing')
    setSimulationParams(null)
  }

  return (
    <div className="min-h-screen bg-cyber-black text-white relative overflow-hidden">
      {/* Offline Indicator */}
      {isOffline && (
        <div className="fixed top-4 left-4 z-50 glassmorphism px-4 py-2 rounded-lg border-glow-magenta">
          <span className="text-neon-magenta text-sm">🌐 Offline Mode - Local Simulations Available</span>
        </div>
      )}
      
      {/* Install PWA Button */}
      <InstallPWAButton />
      
      {/* Main Content */}
      {currentView === 'landing' ? (
        <LandingPage 
          onStartSimulation={handleStartSimulation}
          isOffline={isOffline}
        />
      ) : (
        <SimulationView
          params={simulationParams!}
          onBack={handleBackToLanding}
        />
      )}
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-neon-cyan rounded-full animate-pulse opacity-50"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-neon-magenta rounded-full animate-pulse opacity-30"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-neon-cyan rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-20 right-20 w-1 h-1 bg-neon-magenta rounded-full animate-pulse opacity-60"></div>
      </div>
    </div>
  )
}

export default App