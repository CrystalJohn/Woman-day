"use client"

import { useEffect, useState } from "react"
import PhotoboothFrame from "@/components/PhotoboothFrame"
import FlowerFirework from "@/components/FlowerFirework"
import AudioPlayer from "@/components/AudioPlayer"
import HeartsOverlay from "@/components/HeartsOverlay"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [imagesPreloaded, setImagesPreloaded] = useState(false)

  // Custom images for photobooth
  const photoboothImages = [
    "/album/p1.jpg",
    "/album/p2.2.jpg", 
    "/album/p3.3.jpg"
  ]

  useEffect(() => {
    // Aggressive preload images immediately when component mounts
    const preloadImages = async () => {
      const imagePromises = photoboothImages.map(src => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image()
          img.onload = () => resolve()
          img.onerror = () => {
            console.warn(`Failed to preload: ${src}`)
            resolve() // Still resolve to not block other images
          }
          img.src = src
        })
      })

      try {
        await Promise.all(imagePromises)
        setImagesPreloaded(true)
        console.log('All images preloaded successfully')
      } catch (error) {
        console.warn('Some images failed to preload:', error)
        setImagesPreloaded(true)
      }
    }

    // Start preloading immediately
    preloadImages()
    
    // Set loaded state for animations
    const timer = setTimeout(() => setIsLoaded(true), 100)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center p-4">
      <FlowerFirework />
      <HeartsOverlay />

      <div className="w-full max-w-[420px]">
        {/* Section 1: Cover */}
        <section className={`text-center py-12 px-6 ${isLoaded ? "animate-slide-in" : "opacity-0"}`} style={{ animationDelay: "0s" }}>
          <h1
            className="text-5xl font-bold text-pink-400 mb-4"
            style={{ fontFamily: "Dancing Script, cursive" }}
          >
            Happy Vietnamese Women's Day
          </h1>
          <p className="text-xl text-pink-600 font-bold">20/10</p>
          <div className="mt-6 text-sm text-gray-600">
            <p className="font-[Be_Vietnam_Pro] text-2xl">
              To: My Bae (Huyền Diệu)
              </p>
            <p className="text-xs mt-1 font-serif">From: Thanh Phúc</p>
          </div>
        </section>

        {/* Section 2: Photobooth Frame */}
        <section className={`py-8 px-4 ${isLoaded ? "animate-slide-in" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
          <PhotoboothFrame 
            images={photoboothImages}
            bottomText="Our Sweet Memories 💕"
          />
        </section>

        {/* Section 3: Message Card */}
        <section className={`py-8 px-4 ${isLoaded ? "animate-slide-in" : "opacity-0"}`} style={{ animationDelay: "0.4s" }}>
          <div className="bg-gradient-to-br from-pink-200 to-pink-100 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex justify-center">
              <AudioPlayer />
            </div>
          </div>
        </section>

        {/* Section 4: Footer */}
        <section className={`text-center py-12 px-6 ${isLoaded ? "animate-slide-in" : "opacity-0"}`} style={{ animationDelay: "0.6s" }}>
          <p className="text-pink-600 font-semibold mb-8">From Thanh Phúc — with ❤️</p>
          <p className="text-gray-700 text-center leading-relaxed">
            On this special day, I want to wish you a happy 20/10. May you always be happy, beautiful, and true to yourself. I hope you'll continue to walk this path with me. I always pray for both you and me.💕
          </p>
        </section>
      </div>
    </main>
  )
}
