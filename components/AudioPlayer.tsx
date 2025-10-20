"use client"

import { useState, useRef } from "react"

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

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

  return (
    <div className="flex flex-col items-center gap-4">
      {/* <audio ref={audioRef} src="/music.mp3" onEnded={() => setIsPlaying(false)} /> */}
      <button
        onClick={togglePlay}
        className="bg-pink-400 hover:bg-pink-500 text-white rounded-full p-4 shadow-lg transition-colors hover:scale-110 active:scale-95"
      >
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
      </button>
      <p className="text-sm text-gray-600">{isPlaying ? "🎵 Now Playing" : "🎵 Click to Play"}</p>
    </div>
  )
}
