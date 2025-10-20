"use client"

import { useEffect, useState } from "react"

interface Petal {
  id: number
  burstId: number
  angle: number
  distance: number
  delay: number
  duration: number
  startX: number
  startY: number
}

export default function FlowerFirework() {
  const [petals, setPetals] = useState<Petal[]>([])

  useEffect(() => {
    const allPetals: Petal[] = []
    const burstCount = 5 + Math.floor(Math.random() * 2) // 5-6 bursts

    for (let burst = 0; burst < burstCount; burst++) {
      // Random starting position on screen
      const startX = Math.random() * window.innerWidth
      const startY = Math.random() * window.innerHeight

      // Generate 8-12 petals per burst
      const petalsPerBurst = 8 + Math.floor(Math.random() * 5)
      for (let i = 0; i < petalsPerBurst; i++) {
        const angle = (i / petalsPerBurst) * Math.PI * 2
        const distance = 150 + Math.random() * 200 // Burst outward distance
        allPetals.push({
          id: allPetals.length,
          burstId: burst,
          angle,
          distance,
          delay: burst * 0.4 + Math.random() * 0.2, // Stagger bursts
          duration: 3 + Math.random() * 3, // 3-6 seconds
          startX,
          startY,
        })
      }
    }

    setPetals(allPetals)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {petals.map((petal) => {
        // Calculate end position with drift
        const endX = petal.startX + Math.cos(petal.angle) * petal.distance + (Math.random() - 0.5) * 100
        const endY = petal.startY + Math.sin(petal.angle) * petal.distance + Math.random() * 150

        const tx = endX - petal.startX
        const ty = endY - petal.startY

        return (
          <div
            key={petal.id}
            className="absolute w-8 h-8 animate-petal-burst"
            style={{
              left: `${petal.startX}px`,
              top: `${petal.startY}px`,
              "--tx": `${tx}px`,
              "--ty": `${ty}px`,
              animationDelay: `${petal.delay}s`,
              animationDuration: `${petal.duration}s`,
            } as React.CSSProperties}
          >
            <img src="/flower.png" alt="Cherry blossom petal" className="w-full h-full object-contain drop-shadow-sm" />
          </div>
        )
      })}
    </div>
  )
}
