import { Workbox } from 'workbox-window'

let wb: Workbox | undefined

export const registerSW = () => {
  if ('serviceWorker' in navigator) {
    wb = new Workbox('/sw.js')

    wb.addEventListener('installed', event => {
      console.log('SW installed', event)
    })

    wb.addEventListener('controlling', event => {
      console.log('SW controlling', event)
      // Reload page to use new service worker
      window.location.reload()
    })

    wb.addEventListener('waiting', event => {
      console.log('SW waiting', event)
      // Show update available notification
      const updateButton = document.getElementById('sw-update-button')
      if (updateButton) {
        updateButton.style.display = 'block'
      }
    })

    wb.register()
  }
}

export const updateSW = () => {
  if (wb) {
    wb.messageSkipWaiting()
  }
}