"use client"

import { useEffect, useState } from "react"

export default function HeartsOverlay() {
  const [hearts, setHearts] = useState<Array<{ id: number; left: number }>>([])

  useEffect(() => {
    const generateHearts = () => {
      const newHearts = Array.from({ length: 5 }).map((_, i) => ({
        id: Date.now() + i,
        left: Math.random() * 100,
      }))
      setHearts((prev) => [...prev, ...newHearts])

      // Remove old hearts to prevent memory leak
      setTimeout(() => {
        setHearts((prev) => prev.slice(-10))
      }, 3000)
    }

    const interval = setInterval(generateHearts, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-pink-400 text-2xl animate-float-up"
          style={{ left: `${heart.left}%`, bottom: "-20px" }}
        >
          ❤️
        </div>
      ))}
    </div>
  )
}
