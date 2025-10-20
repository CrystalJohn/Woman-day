import type React from "react"
import type { Metadata } from "next"
import { Dancing_Script } from "next/font/google"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] })

export const metadata: Metadata = {
  title: "Happy Vietnamese Women's Day",
  description: "A special greeting card for Vietnamese Women's Day 20/10",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>{children}</body>
    </html>
  )
}
