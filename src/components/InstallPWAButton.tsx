import React, { useState, useEffect } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const InstallPWAButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallButton, setShowInstallButton] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowInstallButton(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      console.log('PWA installed')
    } else {
      console.log('PWA installation dismissed')
    }
    
    setDeferredPrompt(null)
    setShowInstallButton(false)
  }

  if (!showInstallButton) return null

  return (
    <button
      onClick={handleInstallClick}
      className="fixed top-2 sm:top-4 right-2 sm:right-4 z-50 px-3 sm:px-4 py-2 neon-button rounded-lg text-neon-cyan text-xs sm:text-sm font-bold transition-all duration-300 hover:text-white touch-manipulation"
      aria-label="Install SimuVerse PWA"
    >
      <span className="hidden sm:inline">📱 Install SimuVerse</span>
      <span className="sm:hidden">📱 Install</span>
    </button>
  )
}

export default InstallPWAButton