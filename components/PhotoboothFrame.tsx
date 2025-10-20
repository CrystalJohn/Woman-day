"use client"

export default function PhotoboothFrame() {
  return (
    <div className="relative w-[85%] mx-auto mt-6">
      <div className="absolute inset-0 z-10 grid grid-rows-3 gap-2 p-3">
        <div className="aspect-[4/5] w-full overflow-hidden rounded-md">
          <img src="/p1.jpg" className="w-full h-full object-cover" />
        </div>
        <div className="aspect-[4/5] w-full overflow-hidden rounded-md">
          <img src="/happy-couple-moment.jpg" className="w-full h-full object-cover" />
        </div>
        <div className="aspect-[4/5] w-full overflow-hidden rounded-md">
          <img src="/laughing-together.jpg" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* Frame background with soft shadow and gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-pink-50 to-white rounded-2xl shadow-xl" />

        {/* Frame border with soft pink */}
        <div className="absolute inset-0 border-8 border-pink-200 rounded-2xl" />

        {/* Decorative stickers positioned on frame */}

        {/* Top left heart */}
        <div className="absolute top-4 left-4 text-3xl opacity-70 animate-bounce" style={{ animationDelay: "0s" }}>
          ❤️
        </div>

        {/* Top right kiss mark */}
        <div className="absolute top-6 right-6 text-2xl opacity-60">💋</div>

        {/* Left side ribbon */}
        <div className="absolute top-1/4 -left-2 text-4xl opacity-50 rotate-45">🎀</div>

        {/* Right side ribbon */}
        <div className="absolute bottom-1/4 -right-2 text-4xl opacity-50 -rotate-45">🎀</div>

        {/* Bottom left heart doodle */}
        <div className="absolute bottom-6 left-8 text-2xl opacity-60">💕</div>

        {/* Bottom right kiss mark */}
        <div className="absolute bottom-4 right-8 text-3xl opacity-70">💋</div>

        {/* Center bottom decorative element */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-2xl opacity-50">✦</div>
      </div>
    </div>
  )
}
