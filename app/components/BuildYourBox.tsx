"use client"

import { useState, useRef, useMemo, useEffect } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Card } from "@/components/ui/card"

const availableSnacks = [
  { id: "1", name: "Ashwagandha Calm", color: "bg-purple-200", price: 12 },
  { id: "2", name: "Turmeric Glow", color: "bg-yellow-200", price: 12 },
  { id: "3", name: "Mint Fresh", color: "bg-green-200", price: 12 },
  { id: "4", name: "Chocolate Bliss", color: "bg-amber-200", price: 14 },
  { id: "5", name: "Himalayan Salt", color: "bg-gray-200", price: 10 },
  { id: "6", name: "Rose Petal", color: "bg-pink-200", price: 15 },
]

const boxSizes = [
  { id: 1, size: "Small", quantity: "3 packs", price: "₹299", emoji: "📦" },
  { id: 2, size: "Medium", quantity: "6 packs", price: "₹549", emoji: "📦📦" },
  { id: 3, size: "Large", quantity: "12 packs", price: "₹999", emoji: "📦📦📦" },
]

export default function BuildYourBox() {
  const [selectedSnacks, setSelectedSnacks] = useState<typeof availableSnacks>([])
  const [selectedSize, setSelectedSize] = useState<number | null>(null)
  const [draggedItem, setDraggedItem] = useState<number | null>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"])

  // Floating ingredient particles
  const floatingIngredients = useMemo(
    () =>
      [...Array(20)].map((_, i) => ({
        id: i,
        emoji: ["🌶️", "🧂", "🍅", "🌿", "🔥", "🧀", "🪷", "✨"][Math.floor(Math.random() * 8)],
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 4,
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

  const handleFlavourSelect = (flavourId: number) => {
    setSelectedSnacks((prev) =>
      prev.some((snack) => snack.id === flavourId.toString())
        ? prev.filter((snack) => snack.id !== flavourId.toString())
        : [...prev, availableSnacks.find((snack) => snack.id === flavourId.toString())!],
    )
  }

  const handleDragStart = (flavourId: number) => {
    setDraggedItem(flavourId)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
  }

  const handleDrop = () => {
    if (draggedItem && selectedSnacks.length < 6) {
      const snack = availableSnacks.find((s) => s.id === draggedItem.toString())
      if (snack) {
        setSelectedSnacks((prev) => [...prev, snack])
      }
    }
    setDraggedItem(null)
  }

  const totalPrice = useMemo(() => selectedSnacks.reduce((sum, snack) => sum + snack.price, 0), [selectedSnacks])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-20 bg-gradient-to-br from-golden-yellow/20 via-creamy-beige to-warm-orange/20 overflow-hidden"
    >
      {/* Floating ingredient particles */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIngredients.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute text-2xl opacity-25"
            style={{
              left: `${particle.startX}%`,
              top: `${particle.startY}%`,
            }}
            animate={
              hasAnimated
                ? {
                    x: [0, 60, -40, 100, -30],
                    y: [0, -100, 60, -80, 40],
                    rotate: [0, 180, 360, 540, 720],
                    scale: [0.8, 1.2, 0.6, 1.4, 0.7],
                    opacity: [0.25, 0.5, 0.2, 0.6, 0.15],
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
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-sage-green mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={hasAnimated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Build Your Own Box
          </motion.h2>
          <motion.p
            className="text-xl text-earth-brown/80 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Create your perfect snacking experience. Mix and match flavours, choose your size, and make it uniquely
            yours.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Flavour Selection */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold text-earth-brown mb-8 text-center">Choose Your Flavours</h3>
            <div className="grid grid-cols-2 gap-4">
              {availableSnacks.map((snack, index) => (
                <motion.div
                  key={snack.id}
                  initial={{ opacity: 0, y: 50, rotate: Math.random() * 20 - 10 }}
                  animate={
                    hasAnimated
                      ? { opacity: 1, y: 0, rotate: 0 }
                      : { opacity: 0, y: 50, rotate: Math.random() * 20 - 10 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 120,
                  }}
                  drag
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  onDragStart={() => handleDragStart(Number(snack.id))}
                  onDragEnd={handleDragEnd}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  whileDrag={{ scale: 1.1, rotate: 5, zIndex: 10 }}
                  className="cursor-grab active:cursor-grabbing"
                  onClick={() => handleFlavourSelect(Number(snack.id))}
                >
                  <Card
                    className={`p-6 text-center transition-all duration-300 border-2 ${
                      selectedSnacks.some((s) => s.id === snack.id)
                        ? `${snack.color} border-white text-white shadow-xl`
                        : "bg-white border-gray-200 hover:border-sage-green shadow-lg hover:shadow-xl"
                    }`}
                  >
                    <motion.div
                      animate={
                        selectedSnacks.some((s) => s.id === snack.id)
                          ? { rotate: [0, 360], scale: [1, 1.2, 1] }
                          : { rotate: 0, scale: 1 }
                      }
                      transition={{ duration: 0.6 }}
                      className="text-4xl mb-2"
                    >
                      {snack.id === "1"
                        ? "🌶️"
                        : snack.id === "2"
                          ? "🧂"
                          : snack.id === "3"
                            ? "🍅"
                            : snack.id === "4"
                              ? "🌿"
                              : snack.id === "5"
                                ? "🔥"
                                : "🧀"}
                    </motion.div>
                    <h4
                      className={`font-semibold ${
                        selectedSnacks.some((s) => s.id === snack.id) ? "text-white" : "text-earth-brown"
                      }`}
                    >
                      {snack.name}
                    </h4>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Box Builder */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-3xl font-bold text-earth-brown mb-8 text-center">Your Custom Box</h3>

            {/* Size Selection */}
            <div className="mb-8">
              <h4 className="text-xl font-semibold text-earth-brown mb-4">Choose Size:</h4>
              <div className="grid grid-cols-1 gap-3">
                {boxSizes.map((box, index) => (
                  <motion.div
                    key={box.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={hasAnimated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="cursor-pointer"
                    onClick={() => setSelectedSize(box.id)}
                  >
                    <Card
                      className={`p-4 transition-all duration-300 border-2 ${
                        selectedSize === box.id
                          ? "bg-sage-green border-sage-green text-white shadow-xl"
                          : "bg-white border-gray-200 hover:border-sage-green"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{box.emoji}</span>
                          <div>
                            <h5 className="font-semibold">{box.size}</h5>
                            <p className="text-sm opacity-80">{box.quantity}</p>
                          </div>
                        </div>
                        <div className="text-xl font-bold">{box.price}</div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Drop Zone */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className={`border-4 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                draggedItem ? "border-sage-green bg-sage-green/10 scale-105" : "border-gray-300 bg-gray-50"
              }`}
            >
              <motion.div
                animate={draggedItem ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                transition={{ duration: 0.5, repeat: draggedItem ? Number.POSITIVE_INFINITY : 0 }}
                className="text-6xl mb-4"
              >
                📦
              </motion.div>
              <h4 className="text-xl font-semibold text-earth-brown mb-2">
                {selectedSnacks.length > 0 ? "Your Selection" : "Drag flavours here"}
              </h4>
              {selectedSnacks.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {selectedSnacks.map((snack) => (
                    <motion.span
                      key={snack.id}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="inline-flex items-center space-x-1 bg-sage-green text-white px-3 py-1 rounded-full text-sm"
                    >
                      <span>
                        {snack.id === "1"
                          ? "🌶️"
                          : snack.id === "2"
                            ? "🧂"
                            : snack.id === "3"
                              ? "🍅"
                              : snack.id === "4"
                                ? "🌿"
                                : snack.id === "5"
                                  ? "🔥"
                                  : "🧀"}
                      </span>
                      <span>{snack.name}</span>
                      <button
                        onClick={() => handleFlavourSelect(Number(snack.id))}
                        className="ml-1 text-white hover:text-red-200"
                      >
                        ×
                      </button>
                    </motion.span>
                  ))}
                </div>
              )}
              <p className="text-earth-brown/60">
                {selectedSnacks.length === 0
                  ? "Select or drag your favorite flavours to build your custom box"
                  : `${selectedSnacks.length} flavour${selectedSnacks.length > 1 ? "s" : ""} selected`}
              </p>
            </motion.div>

            {/* Add to Cart Button */}
            {selectedSnacks.length > 0 && selectedSize && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8 text-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-lotus-pink text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-lotus-pink/90 transition-colors duration-300 shadow-lg"
                >
                  Add to Cart - {boxSizes.find((b) => b.id === selectedSize)?.price}
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
