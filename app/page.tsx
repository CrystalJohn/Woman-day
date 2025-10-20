"use client"

import { useEffect, useState } from "react"
import PhotoboothFrame from "@/components/PhotoboothFrame"
import FlowerFirework from "@/components/FlowerFirework"
import AudioPlayer from "@/components/AudioPlayer"
import HeartsOverlay from "@/components/HeartsOverlay"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
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
            <p className="font-medium text-2xl font-serif">To: My Bae (Huyen Dieu)</p>
            <p className="text-xs mt-1 font-serif">From: Thanh Phúc</p>
          </div>
        </section>

        {/* Section 2: Photobooth Frame */}
        <section className={`py-8 px-4 ${isLoaded ? "animate-slide-in" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
          <PhotoboothFrame />
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
            On this special day, I want to celebrate you and all the amazing women in my life. Your strength, beauty,
            and kindness inspire me every day. Thank you for being the incredible person you are. 💕
          </p>
        </section>
      </div>
    </main>
  )
}
