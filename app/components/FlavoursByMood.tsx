"use client"

import { useRef, useState, useEffect, useMemo } from "react"
import { motion, useInView } from "framer-motion"

const flavours = [
  {
    name: "Ashwagandha Calm",
    mood: "Calm & Centered",
    color: "from-purple-200 to-purple-300",
    description: "Soothing ashwagandha-infused makhanas for peaceful moments",
    icon: "🧘‍♀️",
  },
  {
    name: "Turmeric Glow",
    mood: "Energized & Bright",
    color: "from-yellow-200 to-orange-200",
    description: "Golden turmeric blend for natural radiance and vitality",
    icon: "✨",
  },
  {
    name: "Mint Fresh",
    mood: "Refreshed & Alert",
    color: "from-green-200 to-teal-200",
    description: "Cool mint flavor to awaken your senses",
    icon: "🌿",
  },
  {
    name: "Chocolate Bliss",
    mood: "Happy & Satisfied",
    color: "from-amber-200 to-brown-200",
    description: "Rich cocoa goodness for pure indulgence",
    icon: "😊",
  },
  {
    name: "Himalayan Salt",
    mood: "Grounded & Balanced",
    color: "from-gray-200 to-stone-200",
    description: "Pure pink salt for natural mineral balance",
    icon: "⚖️",
  },
  {
    name: "Rose Petal",
    mood: "Loved & Nurtured",
    color: "from-pink-200 to-rose-200",
    description: "Delicate rose essence for self-care moments",
    icon: "🌹",
  },
]

// Memoized card component for better performance
const FlavorCard = ({
  flavour,
  index,
  hasAnimated,
}: {
  flavour: (typeof flavours)[0]
  index: number
  hasAnimated: boolean
}) => {
  const startPositions = useMemo(
    () => [
      { x: -200, y: -300, rotate: -90 },
      { x: 200, y: -350, rotate: 90 },
      { x: -250, y: -250, rotate: -45 },
      { x: 250, y: -400, rotate: 135 },
      { x: -150, y: -450, rotate: -135 },
      { x: 150, y: -200, rotate: 45 },
    ],
    [],
  )

  const startPos = startPositions[index] || { x: 0, y: -300, rotate: 0 }

  return (
    <motion.div
      className="group cursor-pointer relative"
      initial={{
        opacity: 0,
        x: startPos.x,
        y: startPos.y,
        rotate: startPos.rotate,
        scale: 0.5,
      }}
      animate={
        hasAnimated
          ? {
              opacity: 1,
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
            }
          : {
              opacity: 0,
              x: startPos.x,
              y: startPos.y,
              rotate: startPos.rotate,
              scale: 0.5,
            }
      }
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 100,
        delay: index * 0.15 + 0.5,
        duration: 1,
      }}
      whileHover={{
        scale: 1.05,
        y: -5,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className={`bg-gradient-to-br ${flavour.color} rounded-3xl p-8 h-full transform transition-all duration-300 hover:shadow-xl relative overflow-hidden`}
      >
        <div className="text-center relative z-10">
          <motion.div
            className="text-6xl mb-4"
            initial={{ scale: 0, rotate: -90 }}
            animate={hasAnimated ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -90 }}
            transition={{
              delay: index * 0.15 + 0.8,
              duration: 0.5,
              type: "spring",
              stiffness: 200,
            }}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2 },
            }}
          >
            {flavour.icon}
          </motion.div>

          <motion.h3
            className="text-2xl font-bold text-earth-brown mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: index * 0.15 + 1 }}
          >
            {flavour.name}
          </motion.h3>

          <motion.p
            className="text-lg font-semibold text-sage-green mb-4"
            initial={{ opacity: 0, y: 15 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.4, delay: index * 0.15 + 1.2 }}
          >
            {flavour.mood}
          </motion.p>

          <motion.p
            className="text-earth-brown/80 leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.4, delay: index * 0.15 + 1.4 }}
          >
            {flavour.description}
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={hasAnimated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, delay: index * 0.15 + 1.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 bg-white/90 text-earth-brown px-6 py-2 rounded-full font-medium hover:bg-white transition-all duration-200 backdrop-blur-sm shadow-lg"
          >
            Try This Mood
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default function FlavoursByMood() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-200px" })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView) {
      setHasAnimated(true)
    } else {
      const timer = setTimeout(() => {
        setHasAnimated(false)
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [isInView])

  // Reduced particle count for better performance
  const windParticles = useMemo(
    () =>
      [...Array(8)].map((_, i) => ({
        // Reduced from 20 to 8
        id: i,
        delay: Math.random() * 2,
        duration: 3 + Math.random(),
      })),
    [],
  )

  return (
    <section
      id="flavours"
      ref={containerRef}
      className="py-20 bg-gradient-to-b from-white to-creamy-beige relative overflow-hidden"
    >
      {/* Optimized wind particles with reduced count */}
      {hasAnimated && (
        <div className="absolute inset-0 pointer-events-none">
          {windParticles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-lotus-pink/30 rounded-full"
              initial={{
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
                y: (typeof window !== "undefined" ? window.innerHeight : 800) + 50,
                opacity: 0,
              }}
              animate={{
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
                y: -50,
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-sage-green mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={hasAnimated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Flavours by Mood
          </motion.h2>
          <motion.p
            className="text-xl text-earth-brown/70 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Every mood deserves the perfect snack. Discover which PopLotus flavor matches your vibe.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {flavours.map((flavour, index) => (
            <FlavorCard key={flavour.name} flavour={flavour} index={index} hasAnimated={hasAnimated} />
          ))}
        </div>
      </div>
    </section>
  )
}
