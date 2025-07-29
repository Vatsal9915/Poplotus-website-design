"use client"

import React, { useState, useRef, useMemo, useCallback } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

const availableSnacks = [
  { id: "1", name: "Ashwagandha Calm", color: "bg-purple-200", price: 12 },
  { id: "2", name: "Turmeric Glow", color: "bg-yellow-200", price: 12 },
  { id: "3", name: "Mint Fresh", color: "bg-green-200", price: 12 },
  { id: "4", name: "Chocolate Bliss", color: "bg-amber-200", price: 14 },
  { id: "5", name: "Himalayan Salt", color: "bg-gray-200", price: 10 },
  { id: "6", name: "Rose Petal", color: "bg-pink-200", price: 15 },
]

export default function BuildYourBox() {
  const [selectedSnacks, setSelectedSnacks] = useState<typeof availableSnacks>([])
  const [hasAnimated, setHasAnimated] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })

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

  const handleDragEnd = useCallback(
    (result: any) => {
      if (!result.destination) return

      if (result.destination.droppableId === "box" && result.source.droppableId === "snacks") {
        const snack = availableSnacks.find((s) => s.id === result.draggableId)
        if (snack && selectedSnacks.length < 6) {
          setSelectedSnacks((prev) => [...prev, snack])
        }
      } else if (result.destination.droppableId === "snacks" && result.source.droppableId === "box") {
        setSelectedSnacks((prev) => prev.filter((s) => s.id !== result.draggableId))
      }
    },
    [selectedSnacks.length],
  )

  const totalPrice = useMemo(() => selectedSnacks.reduce((sum, snack) => sum + snack.price, 0), [selectedSnacks])

  // Reduced floating ingredients for better performance
  const floatingIngredients = useMemo(
    () =>
      ["🌿", "🌸", "🧂", "🍫"].map((ingredient, i) => ({
        // Reduced from 6 to 4
        id: i,
        ingredient,
        delay: Math.random() * 2,
        duration: 6 + Math.random() * 2,
      })),
    [],
  )

  return (
    <section
      id="build-box"
      ref={containerRef}
      className="py-20 bg-gradient-to-b from-creamy-beige to-sage-green/10 relative overflow-hidden"
    >
      {/* Optimized floating ingredients */}
      {hasAnimated && (
        <div className="absolute inset-0 pointer-events-none">
          {floatingIngredients.map((item) => (
            <motion.div
              key={item.id}
              className="absolute text-2xl opacity-20"
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
                duration: item.duration,
                delay: item.delay,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              {item.ingredient}
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
            Build Your Own Box
          </motion.h2>
          <motion.p
            className="text-xl text-earth-brown/70 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Create your perfect snack combination. Drag and drop up to 6 flavors into your custom box.
          </motion.p>
        </motion.div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Available Snacks */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold text-earth-brown mb-6">Available Flavors</h3>
              <Droppable droppableId="snacks">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="grid grid-cols-2 gap-4">
                    {availableSnacks.map((snack, index) => (
                      <Draggable key={snack.id} draggableId={snack.id} index={index}>
                        {(provided, snapshot) => (
                          <motion.div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            initial={{
                              opacity: 0,
                              y: -100,
                              rotate: Math.random() * 180,
                              scale: 0.5,
                            }}
                            animate={
                              hasAnimated
                                ? {
                                    opacity: 1,
                                    y: 0,
                                    rotate: 0,
                                    scale: 1,
                                  }
                                : {
                                    opacity: 0,
                                    y: -100,
                                    rotate: Math.random() * 180,
                                    scale: 0.5,
                                  }
                            }
                            transition={{
                              type: "spring",
                              damping: 15,
                              stiffness: 120,
                              delay: index * 0.1 + 0.6,
                              duration: 0.8,
                            }}
                            whileHover={{ scale: 1.02, y: -2 }}
                            className={`${snack.color} p-4 rounded-2xl cursor-grab active:cursor-grabbing ${
                              snapshot.isDragging ? "shadow-xl scale-105" : "shadow-md"
                            } transition-all duration-200`}
                          >
                            <div className="text-center">
                              <h4 className="font-semibold text-earth-brown mb-1">{snack.name}</h4>
                              <p className="text-sm text-earth-brown/70">${snack.price}</p>
                            </div>
                          </motion.div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </motion.div>

            {/* Your Box */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-earth-brown mb-6">Your Custom Box</h3>
              <Droppable droppableId="box">
                {(provided, snapshot) => (
                  <motion.div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    animate={
                      snapshot.isDraggingOver
                        ? { scale: 1.01, boxShadow: "0 0 20px rgba(244, 166, 205, 0.3)" }
                        : { scale: 1, boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }
                    }
                    transition={{ duration: 0.2 }}
                    className={`bg-white rounded-3xl p-8 min-h-[400px] border-2 border-dashed transition-all duration-200 ${
                      snapshot.isDraggingOver ? "border-lotus-pink bg-lotus-pink/5" : "border-sage-green/30"
                    }`}
                  >
                    {selectedSnacks.length === 0 ? (
                      <div className="flex items-center justify-center h-full text-center">
                        <div>
                          <motion.div
                            className="text-6xl mb-4"
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          >
                            📦
                          </motion.div>
                          <p className="text-earth-brown/50">Drag flavors here to build your box</p>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        <AnimatePresence>
                          {selectedSnacks.map((snack, index) => (
                            <motion.div
                              key={`${snack.id}-${index}`}
                              initial={{ opacity: 0, scale: 0.5, rotate: 90 }}
                              animate={{ opacity: 1, scale: 1, rotate: 0 }}
                              exit={{ opacity: 0, scale: 0.5, rotate: -90 }}
                              transition={{ type: "spring", damping: 15, stiffness: 200 }}
                              className={`${snack.color} p-4 rounded-2xl shadow-md`}
                            >
                              <div className="text-center">
                                <h4 className="font-semibold text-earth-brown mb-1">{snack.name}</h4>
                                <p className="text-sm text-earth-brown/70">${snack.price}</p>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    )}
                    {provided.placeholder}

                    {selectedSnacks.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 pt-6 border-t border-sage-green/20"
                      >
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-lg font-semibold text-earth-brown">Total: ${totalPrice}</span>
                          <span className="text-sm text-earth-brown/70">{selectedSnacks.length}/6 flavors</span>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-lotus-pink text-white py-3 rounded-full font-semibold hover:bg-lotus-pink/90 transition-colors duration-200"
                        >
                          Add to Cart
                        </motion.button>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </Droppable>
            </motion.div>
          </div>
        </DragDropContext>
      </div>
    </section>
  )
}
