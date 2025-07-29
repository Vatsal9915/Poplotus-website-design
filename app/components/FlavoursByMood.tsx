"use client"

import { useState, useRef, useMemo, useEffect } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const moods = [
  {
    id: 1,
    mood: "Energetic",
    emoji: "⚡",
    flavour: "Spicy Masala",
    color: "from-warm-orange to-sunset-coral",
    description: "Kickstart your day with bold, energizing spices",
    benefits: ["Boosts metabolism", "Increases alertness", "Rich in antioxidants"],
  },
  {
    id: 2,
    mood: "Calm",
    emoji: "🧘",
    flavour: "Himalayan Salt",
    color: "from-soft-lavender to-sage-green",
    description: "Find your zen with pure, mineral-rich goodness",
    benefits: ["Promotes relaxation", "Balances electrolytes", "Natural minerals"],
  },
  {
    id: 3,
    mood: "Happy",
    emoji: "😊",
    flavour: "Tangy Tomato",
    color: "from-sunset-coral to-warm-orange",
    description: "Brighten your mood with zesty, tangy flavors",
    benefits: ["Rich in lycopene", "Mood enhancing", "Vitamin C boost"],
  },
  {
    id: 4,
    mood: "Focused",
    emoji: "🎯",
    flavour: "Herb & Garlic",
    color: "from-forest-green to-sage-green",
    description: "Sharpen your mind with aromatic herbs",
    benefits: ["Improves concentration", "Brain-boosting herbs", "Natural focus"],
  },
  {
    id: 5,
    mood: "Adventurous",
    emoji: "🌶️",
    flavour: "Peri Peri",
    color: "from-deep-purple to-lotus-pink",
    description: "Embark on a flavor journey with exotic spices",
    benefits: ["Exotic spice blend", "Metabolism boost", "Adventure in taste"],
  },
  {
    id: 6,
    mood: "Comfort",
    emoji: "🤗",
    flavour: "Cheese & Herbs",
    color: "from-golden-yellow to-creamy-beige",
    description: "Indulge in creamy, comforting goodness",
    benefits: ["Protein rich", "Comfort food", "Satisfying taste"],
  },
]

export default function FlavoursByMood() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"])

  // Wind particle animation
  const windParticles = useMemo(
    () =>
      [...Array(12)].map((_, i) => ({
        id: i,
        emoji: ["🌪️", "💨", "🍃", "✨"][Math.floor(Math.random() * 4)],
        delay: Math.random() * 3,
        duration: 4 + Math.random() * 2,
        startX: Math.random() * 100,
        startY: Math.random() * 100,
      })),
    [],
  )

  // Card entrance animations with different starting positions
  const startPositions = [
    { x: -200, y: -300, rotate: -90 },
    { x: 200, y: -350, rotate: 90 },
    { x: -250, y: -250, rotate: -45 },
    { x: 300, y: -200, rotate: 45 },
    { x: -180, y: -400, rotate: -60 },
    { x: 250, y: -300, rotate: 75 },
  ]

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

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-20 bg-gradient-to-br from-soft-lavender via-creamy-beige to-sage-green/30 overflow-hidden"
    >
      {/* Animated wind particles */}
      <div className="absolute inset-0 pointer-events-none">
        {windParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute text-2xl opacity-30"
            style={{
              left: `${particle.startX}%`,
              top: `${particle.startY}%`,
            }}
            animate={
              hasAnimated
                ? {
                    x: [0, 100, 200, 300, 400],
                    y: [0, -50, 20, -30, 10],
                    rotate: [0, 180, 360, 540, 720],
                    opacity: [0.3, 0.6, 0.4, 0.7, 0],
                  }
                : {}
            }
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: hasAnimated ? Number.POSITIVE_INFINITY : 0,
              ease: "easeInOut",
            }}
          >
            {particle.emoji}
          </motion.div>
        ))}
      </div>

      <motion.div style={{ y }} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-deep-purple mb-6">Flavours by Mood</h2>
          <p className="text-xl text-earth-brown/80 max-w-3xl mx-auto">
            Every mood deserves its perfect flavor companion. Discover which PopLotus creation matches your vibe today.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {moods.map((mood, index) => {
            const startPos = startPositions[index % startPositions.length]
            return (
              <motion.div
                key={mood.id}
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
                  duration: 0.8,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
                className="cursor-pointer"
                onClick={() => setSelectedMood(selectedMood === mood.id ? null : mood.id)}
              >
                <Card
                  className={`h-full bg-gradient-to-br ${mood.color} border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden relative`}
                >
                  <CardContent className="p-8 text-center relative z-10">
                    <motion.div
                      animate={
                        selectedMood === mood.id ? { rotate: [0, 360], scale: [1, 1.2, 1] } : { rotate: 0, scale: 1 }
                      }
                      transition={{ duration: 0.6 }}
                      className="text-6xl mb-4"
                    >
                      {mood.emoji}
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white mb-2">{mood.mood}</h3>
                    <h4 className="text-xl font-semibold text-white/90 mb-4">{mood.flavour}</h4>
                    <p className="text-white/80 mb-6">{mood.description}</p>

                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={selectedMood === mood.id ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                        <h5 className="font-semibold text-white mb-2">Benefits:</h5>
                        <ul className="text-sm text-white/90 space-y-1">
                          {mood.benefits.map((benefit, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={selectedMood === mood.id ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-center"
                            >
                              <span className="mr-2">✓</span>
                              {benefit}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </CardContent>

                  {/* Animated background pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-10"
                    animate={
                      selectedMood === mood.id
                        ? {
                            background: [
                              "radial-gradient(circle at 20% 50%, white 0%, transparent 50%)",
                              "radial-gradient(circle at 80% 50%, white 0%, transparent 50%)",
                              "radial-gradient(circle at 50% 20%, white 0%, transparent 50%)",
                              "radial-gradient(circle at 50% 80%, white 0%, transparent 50%)",
                            ],
                          }
                        : {}
                    }
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                </Card>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-deep-purple text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-deep-purple/90 transition-colors duration-300 shadow-lg"
          >
            Shop All Flavours
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}
