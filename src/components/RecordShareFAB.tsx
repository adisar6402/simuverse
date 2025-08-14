import React, { useState, useRef } from 'react'

interface RecordShareFABProps {
  canvasRef: React.RefObject<HTMLCanvasElement>
}

const RecordShareFAB: React.FC<RecordShareFABProps> = ({ canvasRef }) => {
  const [isRecording, setIsRecording] = useState(false)
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  const startRecording = async () => {
    if (!canvasRef.current) return

    try {
      const stream = canvasRef.current.captureStream(30) // 30 FPS
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9'
      })

      const chunks: Blob[] = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' })
        setRecordedBlob(blob)
        setIsRecording(false)
      }

      mediaRecorderRef.current = mediaRecorder
      mediaRecorder.start()
      setIsRecording(true)

      // Auto-stop after 15 seconds
      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop()
        }
      }, 15000)

    } catch (error) {
      console.error('Error starting recording:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
    }
  }

  const shareRecording = async () => {
    if (!recordedBlob) return

    const file = new File([recordedBlob], 'simuverse-simulation.webm', { type: 'video/webm' })
    
    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: 'SimuVerse Physics Simulation',
          text: 'Check out this physics simulation built with SimuVerse AI!'
        })
      } catch (error) {
        console.error('Error sharing:', error)
        downloadRecording()
      }
    } else {
      downloadRecording()
    }
  }

  const downloadRecording = () => {
    if (!recordedBlob) return

    const url = URL.createObjectURL(recordedBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'simuverse-simulation.webm'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const resetRecording = () => {
    setRecordedBlob(null)
  }

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40">
      {!recordedBlob ? (
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`
            w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 flex items-center justify-center font-bold transition-all duration-300 hover:scale-110 active:scale-95 touch-manipulation
            ${isRecording 
              ? 'border-red-500 bg-red-500/20 text-red-500 animate-pulse' 
              : 'border-neon-magenta bg-neon-magenta/10 text-neon-magenta hover:bg-neon-magenta/20'
            }
          `}
          aria-label={isRecording ? 'Stop recording' : 'Start recording'}
        >
          {isRecording ? (
            <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="6" width="12" height="12" rx="2"/>
            </svg>
          ) : (
            <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="8"/>
            </svg>
          )}
        </button>
      ) : (
        <div className="flex flex-col space-y-2 items-end">
          <button
            onClick={shareRecording}
            className="px-3 sm:px-4 py-2 neon-button rounded-lg text-neon-cyan font-bold transition-all duration-300 hover:scale-105 touch-manipulation text-sm sm:text-base"
          >
            <span className="hidden sm:inline">📤 Share</span>
            <span className="sm:hidden">📤</span>
          </button>
          
          <button
            onClick={downloadRecording}
            className="px-3 sm:px-4 py-2 glassmorphism border border-neon-magenta rounded-lg text-neon-magenta font-bold transition-all duration-300 hover:scale-105 touch-manipulation text-sm sm:text-base"
          >
            <span className="hidden sm:inline">💾 Download</span>
            <span className="sm:hidden">💾</span>
          </button>
          
          <button
            onClick={resetRecording}
            className="px-3 sm:px-4 py-2 glassmorphism border border-gray-500 rounded-lg text-gray-400 font-bold transition-all duration-300 hover:scale-105 touch-manipulation text-sm sm:text-base"
          >
            <span className="hidden sm:inline">🗑️ Delete</span>
            <span className="sm:hidden">🗑️</span>
          </button>
        </div>
      )}

      {/* Recording Status */}
      {isRecording && (
        <div className="absolute -top-10 sm:-top-12 right-0 glassmorphism px-2 sm:px-3 py-1 rounded-lg border-red-500 border">
          <span className="text-red-500 text-xs sm:text-sm font-bold whitespace-nowrap">
            <span className="hidden sm:inline">🔴 Recording... (15s max)</span>
            <span className="sm:hidden">🔴 Recording...</span>
          </span>
        </div>
      )}
    </div>
  )
}

export default RecordShareFAB