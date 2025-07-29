"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Clock, Users, ChefHat } from "lucide-react"
import Image from "next/image"

interface RecipeModalProps {
  isOpen: boolean
  onClose: () => void
  recipe: {
    id: number
    title: string
    description: string
    image: string
    readTime: string
    category: string
    detailedDescription: string
    ingredients: string[]
    instructions: string[]
    nutritionFacts: {
      calories: number
      protein: string
      fiber: string
      healthy_fats: string
    }
    tips: string[]
    servings: number
    difficulty: string
    story: string
  }
}

export default function RecipeModal({ isOpen, onClose, recipe }: RecipeModalProps) {
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
                rotateX: -90,
                y: 100,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotateX: 0,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.5,
                rotateX: 90,
                y: -100,
              }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
                duration: 0.6,
              }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl relative"
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
                {/* Hero Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <Image src={recipe.image || "/placeholder.svg"} alt={recipe.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Recipe Info Overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center space-x-4 mb-3"
                    >
                      <span className="bg-lotus-pink text-white px-3 py-1 rounded-full text-sm font-medium">
                        {recipe.category}
                      </span>
                      <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                        {recipe.difficulty}
                      </span>
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-3xl font-bold text-white mb-2"
                    >
                      {recipe.title}
                    </motion.h1>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center space-x-6 text-white/90"
                    >
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{recipe.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{recipe.servings} servings</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ChefHat className="w-4 h-4" />
                        <span className="text-sm">{recipe.difficulty}</span>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Content Sections */}
                <div className="p-8 space-y-8">
                  {/* Story & Description */}
                  <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-2xl font-bold text-earth-brown mb-4 flex items-center">
                      <span className="text-3xl mr-3">📖</span>
                      The Story
                    </h3>
                    <div className="bg-gradient-to-r from-creamy-beige/50 to-sage-green/10 rounded-2xl p-6 mb-4">
                      <p className="text-earth-brown/80 leading-relaxed text-lg">{recipe.story}</p>
                    </div>
                    <p className="text-earth-brown/70 leading-relaxed">{recipe.detailedDescription}</p>
                  </motion.section>

                  {/* Ingredients & Instructions Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Ingredients */}
                    <motion.section
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="text-2xl font-bold text-earth-brown mb-6 flex items-center">
                        <span className="text-3xl mr-3">🥄</span>
                        Ingredients
                      </h3>
                      <div className="space-y-3">
                        {recipe.ingredients.map((ingredient, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + index * 0.05 }}
                            className="bg-white border border-sage-green/20 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                          >
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-lotus-pink rounded-full mr-3 flex-shrink-0"></div>
                              <p className="text-earth-brown font-medium">{ingredient}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.section>

                    {/* Instructions */}
                    <motion.section
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3 className="text-2xl font-bold text-earth-brown mb-6 flex items-center">
                        <span className="text-3xl mr-3">👩‍🍳</span>
                        Instructions
                      </h3>
                      <div className="space-y-4">
                        {recipe.instructions.map((instruction, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            className="bg-gradient-to-r from-sage-green/10 to-sage-green/5 rounded-xl p-4 border-l-4 border-sage-green"
                          >
                            <div className="flex items-start">
                              <div className="w-8 h-8 bg-sage-green text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">
                                {index + 1}
                              </div>
                              <p className="text-earth-brown font-medium leading-relaxed">{instruction}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.section>
                  </div>

                  {/* Nutrition Facts & Tips */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Nutrition Facts */}
                    <motion.section
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="bg-gradient-to-br from-lotus-pink/10 to-sage-green/10 rounded-2xl p-6"
                    >
                      <h3 className="text-xl font-bold text-earth-brown mb-4 flex items-center">
                        <span className="text-2xl mr-3">📊</span>
                        Nutrition Facts
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-white/60 rounded-xl">
                          <div className="text-2xl font-bold text-lotus-pink">{recipe.nutritionFacts.calories}</div>
                          <div className="text-sm text-earth-brown/70">Calories</div>
                        </div>
                        <div className="text-center p-3 bg-white/60 rounded-xl">
                          <div className="text-2xl font-bold text-sage-green">{recipe.nutritionFacts.protein}</div>
                          <div className="text-sm text-earth-brown/70">Protein</div>
                        </div>
                        <div className="text-center p-3 bg-white/60 rounded-xl">
                          <div className="text-2xl font-bold text-lotus-pink">{recipe.nutritionFacts.fiber}</div>
                          <div className="text-sm text-earth-brown/70">Fiber</div>
                        </div>
                        <div className="text-center p-3 bg-white/60 rounded-xl">
                          <div className="text-2xl font-bold text-sage-green">{recipe.nutritionFacts.healthy_fats}</div>
                          <div className="text-sm text-earth-brown/70">Healthy Fats</div>
                        </div>
                      </div>
                    </motion.section>

                    {/* Chef's Tips */}
                    <motion.section
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <h3 className="text-xl font-bold text-earth-brown mb-4 flex items-center">
                        <span className="text-2xl mr-3">💡</span>
                        Chef's Tips
                      </h3>
                      <div className="space-y-3">
                        {recipe.tips.map((tip, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 + index * 0.1 }}
                            className="bg-gradient-to-r from-creamy-beige/60 to-lotus-pink/10 rounded-xl p-4"
                          >
                            <div className="flex items-start">
                              <div className="text-lg mr-3">💡</div>
                              <p className="text-earth-brown/80 text-sm leading-relaxed">{tip}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.section>
                  </div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex justify-center space-x-4 pt-4"
                  >
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 20px 40px rgba(244, 166, 205, 0.3)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-lotus-pink to-sage-green text-white px-8 py-3 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300"
                    >
                      Save Recipe
                    </motion.button>
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 20px 40px rgba(104, 211, 145, 0.3)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-sage-green text-white px-8 py-3 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300"
                    >
                      Share Recipe
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
