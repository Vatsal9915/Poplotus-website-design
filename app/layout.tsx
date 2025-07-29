import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PopLotus - Premium Healthy Snacks | Flavored Makhanas",
  description:
    "Discover PopLotus premium flavored makhanas (foxnuts). Healthy, delicious snacks crafted for your wellness journey. Meet Poppy & Poppus, your snacking companions.",
  keywords: "makhana, foxnuts, healthy snacks, organic, wellness, PopLotus",
  openGraph: {
    title: "PopLotus - Snack Smart. Snack Happy.",
    description: "Premium flavored makhanas for your wellness journey",
    images: ["/placeholder.svg?height=630&width=1200"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geist.className} antialiased`}>{children}</body>
    </html>
  )
}
