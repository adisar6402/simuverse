import React, { useState, useEffect } from 'react'

interface MicButtonProps {
  onTranscript: (transcript: string) => void
  isDisabled?: boolean
}

const MicButton: React.FC<MicButtonProps> = ({ onTranscript, isDisabled = false }) => {
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(true)
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)

  useEffect(() => {
    // Check for Web Speech API support
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition
    
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition()
      recognitionInstance.continuous = false
      recognitionInstance.interimResults = false
      recognitionInstance.lang = 'en-US'

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        onTranscript(transcript)
        setIsListening(false)
      }

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
      }

      recognitionInstance.onend = () => {
        setIsListening(false)
      }

      setRecognition(recognitionInstance)
    } else {
      setIsSupported(false)
    }
  }, [onTranscript])

  const startListening = () => {
    if (recognition && !isListening) {
      setIsListening(true)
      recognition.start()
    }
  }

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop()
      setIsListening(false)
    }
  }

  if (!isSupported) {
    return (
      <div className="text-center">
        <p className="text-gray-500 text-sm">
          🎤 Voice input not supported in this browser
        </p>
      </div>
    )
  }

  return (
    <div className="text-center">
      <button
        onClick={isListening ? stopListening : startListening}
        disabled={isDisabled}
        className={`
          w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 transition-all duration-300 flex items-center justify-center touch-manipulation
          ${isListening 
            ? 'border-red-500 bg-red-500/20 text-red-500 animate-pulse' 
            : 'border-neon-magenta bg-neon-magenta/10 text-neon-magenta hover:bg-neon-magenta/20'
          }
          ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 active:scale-95'}
        `}
        aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
      >
        {isListening ? (
          <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="6" width="12" height="12" rx="2"/>
          </svg>
        ) : (
          <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
          </svg>
        )}
      </button>
      
      <p className="text-xs sm:text-sm text-gray-400 mt-2">
        {isListening ? 'Listening...' : 'Click to speak'}
      </p>
    </div>
  )
}

export default MicButton