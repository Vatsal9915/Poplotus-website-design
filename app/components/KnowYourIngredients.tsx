"use client"

import { useState, useRef, useMemo, useEffect } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const ingredients = [
  {
    id: 1,
    name: "Premium Makhana",
    emoji: "🪷",
    description: "Hand-picked foxnuts from the pristine waters of Bihar",
    benefits: ["High in protein", "Low in calories", "Rich in antioxidants", "Gluten-free"],
    nutritionalValue: "60% protein, 15% fiber, 10% healthy fats",
    origin: "Bihar, India",
    color: "from-sage-green to-forest-green",
  },
  {
    id: 2,
    name: "Himalayan Pink Salt",
    emoji: "🧂",
    description: "Pure, unrefined salt from the ancient Himalayan mountains",
    benefits: ["84 trace minerals", "Balances pH", "Supports hydration", "Natural detox"],
    nutritionalValue: "Pure sodium chloride with essential minerals",
    origin: "Himalayan Mountains",
    color: "from-lotus-pink to-sunset-coral",
  },
  {
    id: 3,
    name: "Organic Turmeric",
    emoji: "🌟",
    description: "Golden spice known for its powerful anti-inflammatory properties",
    benefits: ["Anti-inflammatory", "Boosts immunity", "Rich in curcumin", "Antioxidant power"],
    nutritionalValue: "High in curcumin, vitamins, and minerals",
    origin: "Kerala, India",
    color: "from-golden-yellow to-warm-orange",
  },
  {
    id: 4,
    name: "Fresh Herbs",
    emoji: "🌿",
    description: "Carefully selected aromatic herbs for natural flavor enhancement",
    benefits: ["Natural flavoring", "Digestive support", "Vitamin rich", "Aromatic compounds"],
    nutritionalValue: "Vitamins A, C, K and essential oils",
    origin: "Organic farms across India",
    color: "from-forest-green to-sage-green",
  },
  {
    id: 5,
    name: "Cold-Pressed Oils",
    emoji: "🫒",
    description: "Premium oils extracted without heat to preserve nutrients",
    benefits: ["Healthy fats", "Vitamin E", "No trans fats", "Heart healthy"],
    nutritionalValue: "Monounsaturated and polyunsaturated fats",
    origin: "Certified organic sources",
    color: "from-golden-yellow to-earth-brown",
  },
  {
    id: 6,
    name: "Natural Spices",
    emoji: "🌶️",
    description: "Authentic Indian spices ground fresh for maximum potency",
    benefits: ["Metabolism boost", "Digestive aid", "Antioxidants", "Natural preservation"],
    nutritionalValue: "Essential oils, vitamins, and minerals",
    origin: "Spice gardens of South India",
    color: "from-warm-orange to-deep-purple",
  },
]

export default function KnowYourIngredients() {
  const [selectedIngredient, setSelectedIngredient] = useState<number | null>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"])

  // Floating ingredient particles
  const floatingIngredients = useMemo(
    () =>
      [...Array(15)].map((_, i) => ({
        id: i,
        emoji: ["🪷", "🌿", "🌟", "🧂", "🫒", "🌶️"][Math.floor(Math.random() * 6)],
        delay: Math.random() * 4,
        duration: 6 + Math.random() * 3,
        startX: Math.random() * 100,
        startY: Math.random() * 100,
      })),
    [],
  )

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
      className="relative min-h-screen py-20 bg-gradient-to-br from-creamy-beige via-white to-soft-lavender/30 overflow-hidden"
    >
      {/* Floating ingredient particles */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIngredients.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute text-3xl opacity-20"
            style={{
              left: `${particle.startX}%`,
              top: `${particle.startY}%`,
            }}
            animate={
              hasAnimated
                ? {
                    x: [0, 50, -30, 80, -20],
                    y: [0, -80, 40, -60, 20],
                    rotate: [0, 180, 360, 540, 720],
                    scale: [0.5, 1, 0.8, 1.2, 0.6],
                    opacity: [0.2, 0.5, 0.3, 0.6, 0.1],
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
          <h2 className="text-5xl md:text-6xl font-bold text-earth-brown mb-6">Know Your Ingredients</h2>
          <p className="text-xl text-earth-brown/80 max-w-3xl mx-auto">
            Transparency is our promise. Every ingredient is carefully sourced, naturally processed, and packed with
            goodness.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {ingredients.map((ingredient, index) => (
            <motion.div
              key={ingredient.id}
              initial={{ opacity: 0, y: 100, rotateX: -90 }}
              animate={hasAnimated ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 100, rotateX: -90 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                scale: 1.03,
                y: -5,
                transition: { duration: 0.3 },
              }}
              className="cursor-pointer"
              onClick={() => setSelectedIngredient(selectedIngredient === ingredient.id ? null : ingredient.id)}
            >
              <Card
                className={`h-full transition-all duration-500 border-2 overflow-hidden relative ${
                  selectedIngredient === ingredient.id
                    ? `bg-gradient-to-br ${ingredient.color} border-white shadow-2xl`
                    : "bg-white border-gray-200 hover:border-sage-green shadow-lg hover:shadow-xl"
                }`}
              >
                <CardContent className="p-8 relative z-10">
                  <motion.div
                    animate={
                      selectedIngredient === ingredient.id
                        ? { rotate: [0, 360], scale: [1, 1.3, 1] }
                        : { rotate: 0, scale: 1 }
                    }
                    transition={{ duration: 0.8 }}
                    className="text-6xl mb-4 text-center"
                  >
                    {ingredient.emoji}
                  </motion.div>

                  <h3
                    className={`text-2xl font-bold mb-4 text-center transition-colors duration-300 ${
                      selectedIngredient === ingredient.id ? "text-white" : "text-earth-brown"
                    }`}
                  >
                    {ingredient.name}
                  </h3>

                  <p
                    className={`mb-6 text-center transition-colors duration-300 ${
                      selectedIngredient === ingredient.id ? "text-white/90" : "text-earth-brown/80"
                    }`}
                  >
                    {ingredient.description}
                  </p>

                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={
                      selectedIngredient === ingredient.id ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.5 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-4">
                      <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                        <h4 className="font-semibold text-white mb-2">Health Benefits:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {ingredient.benefits.map((benefit, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={
                                selectedIngredient === ingredient.id
                                  ? { opacity: 1, scale: 1 }
                                  : { opacity: 0, scale: 0.8 }
                              }
                              transition={{ delay: i * 0.1 }}
                              className="text-sm text-white/90 bg-white/10 rounded px-2 py-1"
                            >
                              {benefit}
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                        <h4 className="font-semibold text-white mb-2">Nutritional Value:</h4>
                        <p className="text-sm text-white/90">{ingredient.nutritionalValue}</p>
                      </div>

                      <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                        <h4 className="font-semibold text-white mb-2">Origin:</h4>
                        <p className="text-sm text-white/90">{ingredient.origin}</p>
                      </div>
                    </div>
                  </motion.div>
                </CardContent>

                {/* Animated background pattern */}
                {selectedIngredient === ingredient.id && (
                  <motion.div
                    className="absolute inset-0 opacity-10"
                    animate={{
                      background: [
                        "radial-gradient(circle at 0% 0%, white 0%, transparent 50%)",
                        "radial-gradient(circle at 100% 0%, white 0%, transparent 50%)",
                        "radial-gradient(circle at 100% 100%, white 0%, transparent 50%)",
                        "radial-gradient(circle at 0% 100%, white 0%, transparent 50%)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  />
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-sage-green text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-sage-green/90 transition-colors duration-300 shadow-lg"
          >
            View Nutritional Facts
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}
