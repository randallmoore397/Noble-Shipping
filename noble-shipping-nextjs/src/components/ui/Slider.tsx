'use client'

import { useEffect, useRef } from 'react'

interface SlideData {
  image: string
  title: string
  description: string
  isVideo?: boolean
  videoId?: string
}

interface SliderProps {
  slides: SlideData[]
}

/**
 * Slider Component - Uses slick-carousel (jQuery-based)
 * 
 * This component renders markup compatible with slick-carousel initialization
 * from useLayoutScripts.ts. The actual slider behavior is handled by jQuery's
 * slick plugin, not React state.
 */
export default function Slider({ slides }: SliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Slick carousel is initialized by useLayoutScripts.ts
    // This component only provides the markup structure

    // Cleanup function to destroy slick instance when component unmounts
    return () => {
      if (typeof window !== 'undefined' && window.$ && sliderRef.current) {
        const $slider = window.$(sliderRef.current)
        if ($slider.hasClass('slick-initialized')) {
          $slider.slick('unslick')
        }
      }
    }
  }, [])

  return (
    <section className="slider-area">
      <div ref={sliderRef} className="slider-active">
        {slides.map((slide, index) => (
          <div key={index} className="single-slider">
            <div
              className="slider-bg d-flex align-items-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Blur Overlay */}
              <div className="blur-overlay"></div>

              {/* Slider Content */}
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-xl-10 col-lg-11">
                    <div className="slider-content text-center">
                      <h1
                        className="fadeInUpS"
                        data-animation="fadeInUpS"
                        data-delay=".2s"
                      >
                        {slide.title}
                      </h1>
                      <p
                        className="fadeInUpS"
                        data-animation="fadeInUpS"
                        data-delay=".4s"
                      >
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Background (if applicable) */}
              {slide.isVideo && slide.videoId && (
                <div className="youtube-bg" data-property={`{videoURL:'https://www.youtube.com/watch?v=${slide.videoId}',containment:'self',autoPlay:true, mute:true, startAt:0, opacity:1, showControls:false}`}></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// Extend Window interface for jQuery
declare global {
  interface Window {
    $: any
    jQuery: any
  }
}