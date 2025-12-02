import { useEffect } from 'react'

declare global {
  interface Window {
    jQuery: any
    $: any
    AOS: any
  }
}

export const useScriptInit = () => {
  useEffect(() => {
    let attempts = 0
    const maxAttempts = 30
    let intervalId: NodeJS.Timeout

    const initializePlugins = () => {
      attempts++

      const jQueryReady = typeof window !== 'undefined' && window.jQuery
      const counterUpReady = jQueryReady && window.jQuery.fn.counterUp
      const magnificReady = jQueryReady && window.jQuery.fn.magnificPopup
      const aosReady = window.AOS

      console.log('Script check attempt', attempts, ':', {
        jQuery: !!jQueryReady,
        counterUp: !!counterUpReady,
        magnific: !!magnificReady,
        aos: !!aosReady
      })

      if (jQueryReady && counterUpReady && magnificReady && aosReady) {
        const $ = window.jQuery

        // NOTE: Slick initialization is handled by useLayoutScripts.ts
        // This hook only handles page-specific re-initialization after navigation

        try {
          // Re-initialize Counter Up for page content (if not already initialized)
          if ($('.count').length > 0 && !$('.count').hasClass('counterup-initialized')) {
            $('.count').counterUp({
              delay: 10,
              time: 1000
            })
            $('.count').addClass('counterup-initialized')
            console.log('Counter Up re-initialized')
          }
        } catch (error) {
          console.error('Error initializing Counter Up:', error)
        }

        try {
          // Re-initialize Magnific Popup (if not already initialized)
          if ($('.popup-image').length > 0 && !$('.popup-image').hasClass('mfp-initialized')) {
            $('.popup-image').magnificPopup({
              type: 'image',
              gallery: { enabled: true }
            })
            $('.popup-image').addClass('mfp-initialized')
            console.log('Magnific Popup re-initialized')
          }
        } catch (error) {
          console.error('Error initializing Magnific Popup:', error)
        }

        try {
          // Refresh AOS for new page content
          window.AOS.refresh()
          console.log('AOS refreshed')
        } catch (error) {
          console.error('Error refreshing AOS:', error)
        }

        console.log('Page-specific plugins initialized successfully')
        clearInterval(intervalId)
      } else if (attempts >= maxAttempts) {
        console.warn('Plugins failed to initialize after', maxAttempts, 'attempts')
        clearInterval(intervalId)
      }
    }

    intervalId = setInterval(initializePlugins, 150)
    return () => clearInterval(intervalId)
  }, [])
}