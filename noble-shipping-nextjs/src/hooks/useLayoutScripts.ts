import { useEffect } from 'react'

declare global {
  interface Window {
    jQuery: any
    $: any
    AOS: any
    WOW: any
  }
}

export const useLayoutScripts = () => {
  useEffect(() => {
    let attempts = 0
    const maxAttempts = 50
    let intervalId: NodeJS.Timeout
    let scrollHandler: ((this: Window, ev: Event) => any) | null = null

    const initializeLayoutPlugins = () => {
      attempts++

      if (typeof window !== 'undefined' && window.jQuery) {
        const $ = window.jQuery

        try {
          // Initialize Nice Select for header elements
          if ($.fn.niceSelect && $('.selected').length > 0) {
            $('.selected').niceSelect()
            console.log('Nice Select initialized')
          }

          // Initialize Mean Menu for mobile navigation
          if ($.fn.meanmenu && $('#mobile-menu').length > 0) {
            $('#mobile-menu').meanmenu({
              meanMenuContainer: '.mobile-menu',
              meanScreenWidth: '991'
            })
            console.log('Mean Menu initialized')
          }

          // Initialize Slick Carousel for sliders
          if ($.fn.slick) {
            // Hero Slider Active
            if ($('.slider-active').length > 0 && !$('.slider-active').hasClass('slick-initialized')) {
              $('.slider-active').slick({
                autoplay: true,
                autoplaySpeed: 5000,
                dots: false,
                fade: true,
                arrows: false,
                responsive: [
                  {
                    breakpoint: 1200,
                    settings: {
                      dots: false,
                      arrows: false
                    }
                  }
                ]
              })
              console.log('Hero Slider Active initialized')
            }

            // About Active Slider
            if ($('.about-active').length > 0 && !$('.about-active').hasClass('slick-initialized')) {
              $('.about-active').slick({
                autoplay: true,
                autoplaySpeed: 4000,
                dots: false,
                arrows: false,
                fade: true
              })
              console.log('About Active initialized')
            }

            // Testimonial Active Slider
            if ($('.testimonial-active').length > 0 && !$('.testimonial-active').hasClass('slick-initialized')) {
              $('.testimonial-active').slick({
                autoplay: true,
                autoplaySpeed: 4000,
                dots: true,
                arrows: false,
                centerMode: true,
                centerPadding: '0',
                slidesToShow: 1
              })
              console.log('Testimonial Active initialized')
            }

            // Brand Active Slider
            if ($('.brand-active').length > 0 && !$('.brand-active').hasClass('slick-initialized')) {
              $('.brand-active').slick({
                autoplay: true,
                autoplaySpeed: 3000,
                dots: false,
                arrows: false,
                slidesToShow: 5,
                slidesToScroll: 1,
                responsive: [
                  {
                    breakpoint: 1200,
                    settings: {
                      slidesToShow: 4
                    }
                  },
                  {
                    breakpoint: 992,
                    settings: {
                      slidesToShow: 3
                    }
                  },
                  {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 2
                    }
                  },
                  {
                    breakpoint: 576,
                    settings: {
                      slidesToShow: 1
                    }
                  }
                ]
              })
              console.log('Brand Active initialized')
            }
          }

          // Initialize AOS (Animate On Scroll)
          if (window.AOS) {
            window.AOS.init({
              duration: 1000,
              delay: 100,
              offset: 100,
              once: true
            })
            console.log('AOS initialized')
          }

          // Initialize WOW.js
          if (window.WOW) {
            new window.WOW().init()
            console.log('WOW.js initialized')
          }

          // Initialize Counter Up
          if ($.fn.counterUp && $.fn.waypoint) {
            $('.count').counterUp({
              delay: 10,
              time: 1000
            })
            console.log('Counter Up initialized')
          }

          // Sticky Header - Define handler in stable scope
          if (!scrollHandler) {
            scrollHandler = () => {
              const header = document.getElementById('header-sticky')
              if (header) {
                if (window.scrollY > 100) {
                  header.classList.add('sticky')
                } else {
                  header.classList.remove('sticky')
                }
              }
            }
            window.addEventListener('scroll', scrollHandler)
            console.log('Sticky header scroll listener attached')
          }

          // Initialize Magnific Popup for gallery
          if ($.fn.magnificPopup && $('.popup-image').length > 0) {
            $('.popup-image').magnificPopup({
              type: 'image',
              gallery: {
                enabled: true
              }
            })
            console.log('Magnific Popup initialized')
          }

          // Initialize Isotope for gallery
          if ($.fn.isotope && $('.gallery-active').length > 0) {
            const $grid = $('.gallery-active').isotope({
              itemSelector: '.grid-item',
              percentPosition: true,
              masonry: {
                columnWidth: '.grid-item'
              }
            })

            // Layout Isotope after each image loads
            $grid.imagesLoaded().progress(() => {
              $grid.isotope('layout')
            })
            console.log('Isotope initialized')
          }

          // Background Image Data Attribute
          $('[data-background]').each(function (this: HTMLElement) {
            const bg = $(this).data('background')
            $(this).css('background-image', 'url(' + bg + ')')
          })

          clearInterval(intervalId)
        } catch (error) {
          console.error('Error initializing layout plugins:', error)
        }
      } else if (attempts >= maxAttempts) {
        console.warn('Layout plugins failed to initialize after', maxAttempts, 'attempts')
        clearInterval(intervalId)
      }
    }

    intervalId = setInterval(initializeLayoutPlugins, 150)

    return () => {
      clearInterval(intervalId)
      // Cleanup scroll event listener with the exact same function reference
      if (scrollHandler) {
        window.removeEventListener('scroll', scrollHandler)
        scrollHandler = null
        console.log('Sticky header scroll listener removed')
      }
    }
  }, [])
}