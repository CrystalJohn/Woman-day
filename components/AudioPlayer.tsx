"use client"

import { useState, useRef, useEffect } from "react"

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Auto-play when component mounts
  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      // Auto-play after a short delay to ensure audio is loaded
      const autoPlay = setTimeout(() => {
        audio.play().then(() => {
          setIsPlaying(true)
        }).catch((error) => {
          console.log("Auto-play prevented by browser:", error)
        })
      }, 1000)

      return () => clearTimeout(autoPlay)
    }
  }, [])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
      setIsLoaded(true)
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && duration) {
      const rect = e.currentTarget.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const width = rect.width
      const newTime = (clickX / width) * duration
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-gradient-to-br from-pink-100 to-pink-50 rounded-2xl shadow-lg max-w-sm mx-auto">
      <audio 
        ref={audioRef} 
        src="/dancing-in-the-dark.mp3" 
        onEnded={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
      
      {/* Song Title */}
      <div className="text-center">
        <h3 className="text-lg font-bold text-gray-800 mb-1">Dancing in the Dark</h3>
        <p className="text-sm text-gray-600">Soobin Hoàng Sơn</p>
      </div>

      {/* Vinyl Disc */}
      <div className="relative">
        <div 
          className={`w-32 h-32 rounded-full bg-gradient-to-br from-gray-800 via-gray-700 to-black shadow-xl relative overflow-hidden ${
            isPlaying ? 'animate-spin' : ''
          }`}
          style={{ animationDuration: '3s', animationTimingFunction: 'linear' }}
        >
          {/* Vinyl grooves */}
          <div className="absolute inset-2 rounded-full border-2 border-gray-600 opacity-30"></div>
          <div className="absolute inset-4 rounded-full border border-gray-500 opacity-30"></div>
          <div className="absolute inset-6 rounded-full border border-gray-400 opacity-30"></div>
          
          {/* Center label */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center shadow-inner">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          
          {/* Play/Pause button overlay */}
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center text-white hover:bg-black hover:bg-opacity-20 transition-all duration-200 rounded-full"
          >
            <div className="bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-70 transition-all">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                {isPlaying ? (
                  <>
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </>
                ) : (
                  <path d="M8 5v14l11-7z" />
                )}
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full">
        <div 
          className="w-full h-2 bg-gray-200 rounded-full cursor-pointer mb-2"
          onClick={handleProgressClick}
        >
          <div 
            className="h-full bg-gradient-to-r from-pink-400 to-pink-500 rounded-full transition-all duration-100"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        
        {/* Time display */}
        <div className="flex justify-between text-xs text-gray-500">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Status text */}
      <p className="text-sm text-gray-600 text-center">
        {!isLoaded ? "🎵 Loading..." : isPlaying ? "🎵 Now Playing" : "🎵 Paused"}
      </p>
    </div>
  )
}
