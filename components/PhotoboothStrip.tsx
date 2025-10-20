"use client"

export default function PhotoboothStrip() {
  return (
    <div className="space-y-4">
      <div className="aspect-[4/5] w-[85%] mx-auto rounded-xl overflow-hidden mb-4 border border-pink-200 shadow-sm">
        <img src="/p1.jpg" alt="Photo 1" className="w-full h-full object-cover" />
      </div>

      <div className="aspect-[4/5] w-[85%] mx-auto rounded-xl overflow-hidden mb-4 border border-pink-200 shadow-sm">
        <img src="/happy-couple-moment.jpg" alt="Photo 2" className="w-full h-full object-cover" />
      </div>

      <div className="aspect-[4/5] w-[85%] mx-auto rounded-xl overflow-hidden mb-4 border border-pink-200 shadow-sm">
        <img src="/laughing-together.jpg" alt="Photo 3" className="w-full h-full object-cover" />
      </div>
    </div>
  )
}
