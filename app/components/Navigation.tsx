"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.05 }} className="text-2xl font-bold text-lotus-pink">
            PopLotus
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            {["Flavours", "Build Box", "Recipes", "Ingredients", "About", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                whileHover={{ y: -2 }}
                className="text-sage-green hover:text-lotus-pink transition-colors duration-300 font-medium"
              >
                {item}
              </motion.a>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-lotus-pink text-white px-6 py-2 rounded-full font-medium hover:bg-lotus-pink/90 transition-colors"
          >
            Shop Now
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}
