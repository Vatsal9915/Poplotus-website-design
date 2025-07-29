"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import Image from "next/image"

interface StoryModalProps {
  isOpen: boolean
  onClose: () => void
  milestone: {
    year: string
    title: string
    description: string
    mascot: string
    detailedStory: string
    achievements: string[]
    challenges: string[]
    impact: string
    quote: string
  }
}

export default function StoryModal({ isOpen, onClose, milestone }: StoryModalProps) {
  const mascotImage = milestone.mascot === "Poppy" ? "/images/poppy.png" : "/images/poppus.png"

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.5,
                rotateY: -90,
                y: 100,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotateY: 0,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.5,
                rotateY: 90,
                y: -100,
              }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
                duration: 0.6,
              }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl relative"
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-6 right-6 z-10 w-12 h-12 bg-lotus-pink/20 hover:bg-lotus-pink/30 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <X className="w-6 h-6 text-lotus-pink" />
              </motion.button>

              {/* Scrollable Content */}
              <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
                {/* Header Section */}
                <div className="bg-gradient-to-br from-sage-green/10 to-lotus-pink/10 p-8 pb-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center mb-4"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-lotus-pink to-lotus-pink/80 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 shadow-lg">
                          {milestone.year}
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold text-earth-brown mb-2">{milestone.title}</h2>
                          <p className="text-sage-green font-medium">{milestone.mascot} tells the story</p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Mascot Image */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0, rotate: -180 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{
                        delay: 0.4,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="ml-6"
                    >
                      <div className="relative">
                        <motion.div
                          animate={{
                            y: [0, -10, 0],
                            rotate: [0, 5, -5, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        >
                          <Image
                            src={mascotImage || "/placeholder.svg"}
                            alt={milestone.mascot}
                            width={120}
                            height={120}
                            className="drop-shadow-lg"
                          />
                        </motion.div>

                        {/* Speech bubble */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8 }}
                          className="absolute -left-8 top-4 bg-white rounded-2xl p-3 shadow-lg border-2 border-sage-green/20 max-w-xs"
                        >
                          <div className="text-sm text-earth-brown font-medium">"{milestone.quote}"</div>
                          <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white border-r-2 border-b-2 border-sage-green/20 transform rotate-45"></div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Content Sections */}
                <div className="p-8 space-y-8">
                  {/* Detailed Story */}
                  <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold text-earth-brown mb-4 flex items-center">
                      <span className="text-3xl mr-3">📖</span>
                      The Full Story
                    </h3>
                    <div className="bg-gradient-to-r from-creamy-beige/50 to-sage-green/10 rounded-2xl p-6">
                      <p className="text-earth-brown/80 leading-relaxed text-lg">{milestone.detailedStory}</p>
                    </div>
                  </motion.section>

                  {/* Achievements & Challenges Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Achievements */}
                    <motion.section
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3 className="text-xl font-bold text-earth-brown mb-4 flex items-center">
                        <span className="text-2xl mr-3">🏆</span>
                        Key Achievements
                      </h3>
                      <div className="space-y-3">
                        {milestone.achievements.map((achievement, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            className="bg-gradient-to-r from-sage-green/10 to-sage-green/5 rounded-xl p-4 border-l-4 border-sage-green"
                          >
                            <div className="flex items-start">
                              <div className="w-2 h-2 bg-sage-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <p className="text-earth-brown font-medium">{achievement}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.section>

                    {/* Challenges */}
                    <motion.section
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h3 className="text-xl font-bold text-earth-brown mb-4 flex items-center">
                        <span className="text-2xl mr-3">💪</span>
                        Challenges Overcome
                      </h3>
                      <div className="space-y-3">
                        {milestone.challenges.map((challenge, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                            className="bg-gradient-to-r from-lotus-pink/10 to-lotus-pink/5 rounded-xl p-4 border-l-4 border-lotus-pink"
                          >
                            <div className="flex items-start">
                              <div className="w-2 h-2 bg-lotus-pink rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <p className="text-earth-brown font-medium">{challenge}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.section>
                  </div>

                  {/* Impact Section */}
                  <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-gradient-to-br from-lotus-pink/10 via-sage-green/10 to-creamy-beige rounded-2xl p-6"
                  >
                    <h3 className="text-2xl font-bold text-earth-brown mb-4 flex items-center">
                      <span className="text-3xl mr-3">🌟</span>
                      Impact & Legacy
                    </h3>
                    <p className="text-earth-brown/80 leading-relaxed text-lg">{milestone.impact}</p>
                  </motion.section>

                  {/* Navigation Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex justify-center pt-4"
                  >
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 20px 40px rgba(244, 166, 205, 0.3)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onClose}
                      className="bg-gradient-to-r from-lotus-pink to-sage-green text-white px-8 py-3 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300"
                    >
                      Continue Our Journey
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
