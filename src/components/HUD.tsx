import React from 'react'

interface HUDProps {
  gravity: number
  wind: number
  mass: number
  fps: number
  isRunning: boolean
}

const HUD: React.FC<HUDProps> = ({ gravity, wind, mass, fps, isRunning }) => {
  return (
    <div className="absolute top-2 sm:top-4 left-2 sm:left-4 space-y-2 sm:space-y-3 pointer-events-none">
      {/* Status Indicator */}
      <div className="glassmorphism px-2 sm:px-3 py-1 sm:py-2 rounded-lg border-glow-cyan">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
          <span className="text-xs sm:text-sm font-bold text-neon-cyan">
            <span className="hidden sm:inline">
              {isRunning ? 'SIMULATION ACTIVE' : 'PAUSED'}
            </span>
            <span className="sm:hidden">
              {isRunning ? 'ACTIVE' : 'PAUSED'}
            </span>
          </span>
        </div>
      </div>

      {/* Parameters Display */}
      <div className="glassmorphism p-2 sm:p-3 rounded-lg border-glow-magenta space-y-1">
        <div className="text-xs font-mono text-gray-300 space-y-1 min-w-24 sm:min-w-32">
          <div className="flex justify-between items-center">
            <span>Gravity:</span>
            <span className="text-neon-cyan">{gravity.toFixed(1)} m/s²</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Wind:</span>
            <span className="text-neon-magenta">{wind.toFixed(1)} m/s</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Mass:</span>
            <span className="text-neon-cyan">{mass.toFixed(1)} kg</span>
          </div>
          <div className="flex justify-between items-center">
            <span>FPS:</span>
            <span className={`${fps > 50 ? 'text-green-500' : fps > 30 ? 'text-yellow-500' : 'text-red-500'}`}>
              {fps}
            </span>
          </div>
        </div>
      </div>

      {/* Performance Indicator */}
      <div className="glassmorphism px-2 sm:px-3 py-1 sm:py-2 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-12 sm:w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${
                fps > 50 ? 'bg-green-500' : fps > 30 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${Math.min(fps / 60 * 100, 100)}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-400">Performance</span>
        </div>
      </div>
    </div>
  )
}

export default HUD