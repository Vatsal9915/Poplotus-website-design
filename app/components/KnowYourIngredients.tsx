"use client"

import React, { useRef, useState, useMemo, useCallback } from "react"
import { motion, useInView } from "framer-motion"

const ingredients = [
  {
    name: "Makhana (Fox Nuts)",
    benefits: ["High in protein", "Low in calories", "Rich in antioxidants", "Gluten-free"],
    description: "Premium lotus seeds harvested from pristine waters, naturally puffed to perfection.",
    icon: "🪷",
    color: "from-blue-100 to-blue-200",
  },
  {
    name: "Ashwagandha",
    benefits: ["Stress relief", "Better sleep", "Improved focus", "Natural adaptogen"],
    description: "Ancient Ayurvedic herb known for its calming and rejuvenating properties.",
    icon: "🌿",
    color: "from-green-100 to-green-200",
  },
  {
    name: "Turmeric",
    benefits: ["Anti-inflammatory", "Immune support", "Antioxidant rich", "Natural glow"],
    description: "Golden spice with powerful healing compounds and vibrant flavor.",
    icon: "✨",
    color: "from-yellow-100 to-orange-200",
  },
  {
    name: "Himalayan Pink Salt",
    benefits: ["84 trace minerals", "Electrolyte balance", "Natural purity", "Enhanced flavor"],
    description: "Pure, unrefined salt from ancient sea beds in the Himalayan mountains.",
    icon: "🏔️",
    color: "from-pink-100 to-rose-200",
  },
  {
    name: "Organic Cocoa",
    benefits: ["Mood booster", "Heart healthy", "Rich in magnesium", "Natural energy"],
    description: "Premium cocoa beans sourced from sustainable farms for rich, indulgent flavor.",
    icon: "🍫",
    color: "from-amber-100 to-brown-200",
  },
  {
    name: "Rose Petals",
    benefits: ["Skin health", "Aromatherapy", "Vitamin C", "Calming effect"],
    description: "Delicate rose petals that add floral notes and natural beauty benefits.",
    icon: "🌹",
    color: "from-pink-100 to-pink-200",
  },
]

// Memoized ingredient card component
const IngredientCard = React.memo(
  ({
    ingredient,
    index,
    isSelected,
    onClick,
    hasAnimated,
  }: {
    ingredient: (typeof ingredients)[0]
    index: number
    isSelected: boolean
    onClick: () => void
    hasAnimated: boolean
  }) => (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.5,
        y: -50,
        rotate: Math.random() * 180,
      }}
      animate={
        hasAnimated
          ? {
              opacity: 1,
              scale: 1,
              y: 0,
              rotate: 0,
            }
          : {
              opacity: 0,
              scale: 0.5,
              y: -50,
              rotate: Math.random() * 180,
            }
      }
      transition={{
        type: "spring",
        damping: 15,
        stiffness: 120,
        delay: index * 0.1 + 0.5,
        duration: 0.8,
      }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`flex-shrink-0 w-48 p-6 rounded-2xl cursor-pointer transition-all duration-200 relative ${
        isSelected ? "text-white transform scale-105" : "hover:shadow-lg"
      } bg-gradient-to-br ${ingredient.color}`}
      style={{
        boxShadow: isSelected ? "0 15px 30px rgba(244, 166, 205, 0.4), 0 0 0 3px rgba(244, 166, 205, 0.3)" : undefined,
      }}
    >
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-br from-lotus-pink/80 to-lotus-pink/60 rounded-2xl"></div>
      )}
      <div className="text-center relative z-10">
        <motion.div
          className="text-4xl mb-3"
          animate={{
            rotate: isSelected ? [0, 180] : 0,
            scale: isSelected ? [1, 1.1, 1] : 1,
          }}
          transition={{ duration: isSelected ? 0.6 : 0.2 }}
        >
          {ingredient.icon}
        </motion.div>
        <h3 className={`font-bold text-lg mb-2 ${isSelected ? "text-white" : "text-earth-brown"}`}>
          {ingredient.name}
        </h3>
        <div className="flex flex-wrap gap-1">
          {ingredient.benefits.slice(0, 2).map((benefit, i) => (
            <span
              key={i}
              className={`text-xs px-2 py-1 rounded-full ${
                isSelected ? "bg-white/20 text-white" : "bg-white/60 text-earth-brown"
              }`}
            >
              {benefit}
            </span>
          ))}
        </div>
      </div>

      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg"
        >
          <div className="w-3 h-3 bg-lotus-pink rounded-full"></div>
        </motion.div>
      )}
    </motion.div>
  ),
)

export default function KnowYourIngredients() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })
  const [selectedIngredient, setSelectedIngredient] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  React.useEffect(() => {
    if (isInView) {
      setHasAnimated(true)
    } else {
      const timer = setTimeout(() => {
        setHasAnimated(false)
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [isInView])

  const handleIngredientClick = useCallback((index: number) => {
    setSelectedIngredient(index)
  }, [])

  // Reduced floating particles for better performance
  const floatingParticles = useMemo(
    () =>
      ingredients.slice(0, 3).map((ingredient, i) => ({
        // Reduced from all 6 to 3
        id: i,
        icon: ingredient.icon,
        delay: Math.random() * 3,
        duration: 8 + Math.random() * 4,
      })),
    [],
  )

  const selectedIngredientData = ingredients[selectedIngredient]

  return (
    <section
      id="ingredients"
      ref={containerRef}
      className="py-20 bg-gradient-to-b from-white to-creamy-beige relative overflow-hidden"
    >
      {/* Optimized floating ingredient particles */}
      {hasAnimated && (
        <div className="absolute inset-0 pointer-events-none">
          {floatingParticles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute text-3xl opacity-10"
              initial={{
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
                y: (typeof window !== "undefined" ? window.innerHeight : 800) + 50,
                rotate: 0,
                scale: 0.5,
              }}
              animate={{
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
                y: -50,
                rotate: 180,
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              {particle.icon}
            </motion.div>
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6">
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
            Know Your Ingredients
          </motion.h2>
          <motion.p
            className="text-xl text-earth-brown/70 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Every ingredient in PopLotus is carefully selected for its nutritional benefits and natural goodness. Click
            on any ingredient to learn more!
          </motion.p>
        </motion.div>

        {/* Horizontal Scrollable Timeline */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <div
            ref={scrollRef}
            className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {ingredients.map((ingredient, index) => (
              <IngredientCard
                key={ingredient.name}
                ingredient={ingredient}
                index={index}
                isSelected={selectedIngredient === index}
                onClick={() => handleIngredientClick(index)}
                hasAnimated={hasAnimated}
              />
            ))}
          </div>
        </motion.div>

        {/* Selected Ingredient Details */}
        <motion.div
          key={selectedIngredient}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, type: "spring" }}
          className="bg-white rounded-3xl p-8 shadow-xl relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
            <div className="text-8xl">{selectedIngredientData.icon}</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
            <div>
              <div className="flex items-center mb-6">
                <motion.span
                  className="text-6xl mr-4"
                  animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  {selectedIngredientData.icon}
                </motion.span>
                <motion.h3
                  className="text-3xl font-bold text-earth-brown"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  {selectedIngredientData.name}
                </motion.h3>
              </div>

              <motion.p
                className="text-lg text-earth-brown/80 mb-6 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                {selectedIngredientData.description}
              </motion.p>

              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-sage-green text-white px-6 py-3 rounded-full font-semibold hover:bg-sage-green/90 transition-colors duration-200"
              >
                Learn More
              </motion.button>
            </div>

            <div>
              <motion.h4
                className="text-xl font-bold text-earth-brown mb-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                Health Benefits
              </motion.h4>
              <div className="grid grid-cols-2 gap-3">
                {selectedIngredientData.benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: 20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.2 + index * 0.05,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="bg-gradient-to-r from-sage-green/10 to-lotus-pink/10 p-4 rounded-xl hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-lotus-pink rounded-full mr-3"></div>
                      <span className="text-earth-brown font-medium">{benefit}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
