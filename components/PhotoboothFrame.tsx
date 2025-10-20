"use client"

import { useState, useEffect } from "react"

interface PhotoboothFrameProps {
  images?: string[]
  bottomText?: string
}

export default function PhotoboothFrame({ 
  images = ["/album/p1.jpg", "/album/p2.2.jpg", "/album/p3.3.jpg"],
  bottomText = "20/10 💕"
}: PhotoboothFrameProps) {
  const [loadedImages, setLoadedImages] = useState<boolean[]>([false, false, false])
  const [allImagesLoaded, setAllImagesLoaded] = useState(false)

  // Preload images immediately
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
    <div className="relative w-[280px] mx-auto mt-6">
      {/* Photobooth strip background */}
      <div className="bg-white rounded-lg shadow-lg p-4 border-2 border-gray-200">
        {/* 3 photo slots */}
        <div className="space-y-3">
          {images.slice(0, 3).map((src, index) => (
            <div key={index} className="aspect-square w-full overflow-hidden rounded-md bg-gray-100 relative">
              {/* Loading placeholder - only show if image hasn't loaded */}
              {!loadedImages[index] && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse z-10">
                  <div className="text-gray-400">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
              
              {/* Actual image - always render but control opacity */}
              <img 
                src={src} 
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  loadedImages[index] ? 'opacity-100' : 'opacity-0'
                }`}
                alt={`Photo ${index + 1}`}
                onLoad={() => handleImageLoad(index)}
                loading="eager"
                decoding="async"
              />
            </div>
          ))}
        </div>
        
        {/* Photobooth branding/text at bottom */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 font-mono">{bottomText}</p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-2 -right-2 text-2xl opacity-80 rotate-12">💋</div>
      <div className="absolute -bottom-2 -left-2 text-2xl opacity-80 -rotate-12">❤️</div>
      <div className="absolute top-1/2 -right-3 text-xl opacity-60">🎀</div>
      <div className="absolute top-1/3 -left-3 text-xl opacity-60">✨</div>
    </div>
  )
}
