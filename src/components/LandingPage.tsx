import React, { useState, useEffect } from 'react'
import PromptBar from './PromptBar'
import MicButton from './MicButton'
import { SimulationParams } from '../App'
import { parseScenario } from '../ai/parseScenario'

interface LandingPageProps {
  onStartSimulation: (params: SimulationParams) => void
  isOffline: boolean
}

const EXAMPLE_PROMPTS = [
  "Simulate a rocket launch on Mars with low gravity",
  "Model a skyscraper in a hurricane with 200 km/h winds",
  "Simulate a drone carrying 200 kg in 40°C heat with strong wind",
  "Drop a basketball and a feather on the Moon",
  "Launch a paper airplane in zero gravity"
]

const LandingPage: React.FC<LandingPageProps> = ({ onStartSimulation, isOffline }) => {
  const [currentPrompt, setCurrentPrompt] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const handleSubmit = async (prompt: string) => {
    if (!prompt.trim()) return
    
    setIsProcessing(true)
    
    try {
      // Parse the scenario using AI (mock implementation)
      const params = await parseScenario(prompt, isOffline)
      
      // Show countdown before simulation
      setCountdown(3)
      const countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval)
            onStartSimulation(params)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      
    } catch (error) {
      console.error('Error processing scenario:', error)
      setIsProcessing(false)
    }
  }

  const handleExampleClick = (prompt: string) => {
    setCurrentPrompt(prompt)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative">
      {/* Countdown Overlay */}
      {countdown > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-glow-cyan mb-8">
              Simulation Initializing...
            </h2>
            <div className="text-8xl font-black text-glow-magenta animate-pulse">
              {countdown}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="w-full max-w-4xl mx-auto text-center space-y-8 md:space-y-12">
        {/* Logo/Title */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-glow-cyan animate-float">
            SimuVerse
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light px-4">
            AI-Powered Physics Simulation Playground
          </p>
          <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-neon-cyan to-neon-magenta mx-auto rounded-full"></div>
        </div>

        {/* Input Section */}
        <div className="space-y-4 md:space-y-6 px-4">
          <div className="glassmorphism p-4 sm:p-6 md:p-8 rounded-2xl border-glow-cyan max-w-2xl mx-auto">
            <div className="space-y-4 md:space-y-6">
              <PromptBar
                value={currentPrompt}
                onChange={setCurrentPrompt}
                onSubmit={handleSubmit}
                isProcessing={isProcessing}
              />
              
              <div className="flex items-center justify-center space-x-4">
                <div className="h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent flex-1 min-w-8"></div>
                <span className="text-neon-cyan text-sm">OR</span>
                <div className="h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent flex-1 min-w-8"></div>
              </div>
              
              <MicButton
                onTranscript={setCurrentPrompt}
                isDisabled={isProcessing}
              />
            </div>
          </div>
        </div>

        {/* Example Prompts */}
        <div className="space-y-4 md:space-y-6 px-4">
          <h3 className="text-lg md:text-xl font-bold text-neon-magenta">
            Try These Examples:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-w-6xl mx-auto">
            {EXAMPLE_PROMPTS.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(prompt)}
                className="p-3 md:p-4 glassmorphism rounded-lg border-glow-magenta text-left transition-all duration-300 hover:scale-105 hover:shadow-neon-magenta touch-manipulation"
                disabled={isProcessing}
              >
                <p className="text-xs sm:text-sm text-gray-300">"{prompt}"</p>
              </button>
            ))}
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm px-4">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isOffline ? 'bg-red-500' : 'bg-green-500'} animate-pulse`}></div>
            <span className="text-gray-400">
              {isOffline ? 'Offline Mode' : 'Online'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></div>
            <span className="text-gray-400">Physics Engine Ready</span>
          </div>
        </div>
      </div>

      {/* Background Animation */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-900/5"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-transparent to-purple-900/5"></div>
      </div>
    </div>
  )
}

export default LandingPage