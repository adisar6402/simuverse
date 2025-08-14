import React, { useState } from 'react'

interface PromptBarProps {
  value: string
  onChange: (value: string) => void
  onSubmit: (value: string) => void
  isProcessing: boolean
}

const PromptBar: React.FC<PromptBarProps> = ({ 
  value, 
  onChange, 
  onSubmit, 
  isProcessing 
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    if (value.trim() && !isProcessing) {
      onSubmit(value)
    }
  }

  return (
    <div className="relative">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Describe a physics scenario..."
          className="flex-1 bg-transparent border-2 border-neon-cyan rounded-lg px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg placeholder-gray-500 focus:outline-none focus:border-neon-magenta focus:shadow-neon-cyan transition-all duration-300"
          disabled={isProcessing}
          aria-label="Physics scenario prompt"
        />
        
        <button
          onClick={handleSubmit}
          disabled={!value.trim() || isProcessing}
          className="px-6 sm:px-8 py-3 sm:py-4 neon-button rounded-lg font-bold text-neon-cyan disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 touch-manipulation min-h-12"
          aria-label="Start simulation"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
              <span className="hidden sm:inline">Processing...</span>
              <span className="sm:hidden">...</span>
            </div>
          ) : (
            <span>
              <span className="hidden sm:inline">🚀 Simulate</span>
              <span className="sm:hidden">🚀</span>
            </span>
          )}
        </button>
      </div>
      
      {/* Input glow effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-neon-cyan/20 to-neon-magenta/20 blur-xl -z-10 opacity-50"></div>
    </div>
  )
}

export default PromptBar