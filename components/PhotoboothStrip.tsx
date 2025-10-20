"use client"

import { useState, useEffect } from "react"

interface PhotoboothStripProps {
  images?: string[]
  title?: string
  subtitle?: string
}

export default function PhotoboothStrip({ 
  images = ["/album/p1.jpg", "/album/p2.2.jpg", "/album/p3.3.jpg"],
  title = "Vietnamese Women's Day 💕",
  subtitle = "I love you so much my baeee"
}: PhotoboothStripProps) {
  const [loadedImages, setLoadedImages] = useState<boolean[]>([false, false, false])
  const [allImagesLoaded, setAllImagesLoaded] = useState(false)

  // Aggressive preloading
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = images.slice(0, 3).map((src, index) => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image()
          img.onload = () => {
            setLoadedImages(prev => {
              const newState = [...prev]
              newState[index] = true
              return newState
            })
            resolve()
          }
          img.onerror = () => {
            console.warn(`Failed to load image: ${src}`)
            setLoadedImages(prev => {
              const newState = [...prev]
              newState[index] = true // Still mark as "loaded" to remove placeholder
              return newState
            })
            resolve()
          }
          img.src = src
        })
      })

      try {
        await Promise.all(imagePromises)
        setAllImagesLoaded(true)
      } catch (error) {
        console.warn("Some images failed to load")
        setAllImagesLoaded(true)
      }
    }

    preloadImages()
  }, [images])

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => {
      const newState = [...prev]
      newState[index] = true
      return newState
    })
  }

  return (
    <div className="w-[280px] mx-auto">
      {/* Classic photobooth strip */}
      <div className="bg-white rounded-lg shadow-lg p-4 border-2 border-gray-200">
        <div className="space-y-3">
          {/* Photo slots */}
          {images.slice(0, 3).map((src, index) => (
            <div key={index} className="aspect-square w-full overflow-hidden rounded-md bg-gray-100 border border-gray-300 relative">
              {/* Loading placeholder */}
              {!loadedImages[index] && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse z-10">
                  <div className="text-gray-400">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
              
              {/* Actual image */}
              <img 
                src={src} 
                alt={`Photo ${index + 1}`} 
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  loadedImages[index] ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => handleImageLoad(index)}
                loading="eager"
                decoding="async"
              />
            </div>
          ))}
        </div>
        
        {/* Bottom text */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 font-mono">{title}</p>
          <p className="text-xs text-gray-400 font-mono">{subtitle}</p>
        </div>
      </div>
    </div>
  )
}
