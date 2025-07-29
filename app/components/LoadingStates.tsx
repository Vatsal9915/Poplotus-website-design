"use client"

import { motion } from "framer-motion"

// Hero Section Loading
export function HeroLoading() {
  return (
    <div className="h-screen bg-gradient-to-br from-creamy-beige via-white to-sage-green/20 flex items-center justify-center">
      <div className="text-center">
        {/* Lotus flower blooming animation */}
        <motion.div
          className="relative mb-8"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <motion.div
            className="text-8xl"
            animate={{
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            🪷
          </motion.div>

          {/* Petals floating around */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl opacity-60"
              style={{
                top: "50%",
                left: "50%",
                transformOrigin: "0 0",
              }}
              animate={{
                rotate: [0, 360],
                x: [0, Math.cos((i * 60 * Math.PI) / 180) * 60],
                y: [0, Math.sin((i * 60 * Math.PI) / 180) * 60],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            >
              🌸
            </motion.div>
          ))}
        </motion.div>

        <motion.h1
          className="text-4xl font-bold text-sage-green mb-4"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          PopLotus
        </motion.h1>

        <motion.div
          className="flex justify-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-lotus-pink rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

// Flavours Loading - Wind and cards forming
export function FlavoursLoading() {
  return (
    <div className="py-20 bg-gradient-to-b from-white to-creamy-beige flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <motion.h2
          className="text-3xl font-bold text-sage-green mb-8"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          Flavours by Mood
        </motion.h2>

        {/* Swirling wind with flavor icons */}
        <div className="relative w-64 h-64 mx-auto">
          {["🧘‍♀️", "✨", "🌿", "😊", "⚖️", "🌹"].map((icon, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              style={{
                top: "50%",
                left: "50%",
                transformOrigin: "0 0",
              }}
              animate={{
                rotate: [0, 360],
                x: [0, Math.cos((i * 60 * Math.PI) / 180) * 80],
                y: [0, Math.sin((i * 60 * Math.PI) / 180) * 80],
                scale: [0.5, 1, 0.5],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            >
              {icon}
            </motion.div>
          ))}

          {/* Central swirl */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-4 border-lotus-pink/30 rounded-full"
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </div>

        <motion.p
          className="text-earth-brown/70 mt-4"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: 0.5,
          }}
        >
          Discovering your perfect mood match...
        </motion.p>
      </div>
    </div>
  )
}

// Build Your Box Loading - Box assembling
export function BuildBoxLoading() {
  return (
    <div className="py-20 bg-gradient-to-b from-creamy-beige to-sage-green/10 flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <motion.h2
          className="text-3xl font-bold text-sage-green mb-8"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          Build Your Own Box
        </motion.h2>

        {/* Box assembling animation */}
        <div className="relative w-48 h-48 mx-auto mb-8">
          {/* Box pieces coming together */}
          <motion.div
            className="absolute inset-0 border-4 border-dashed border-sage-green/50 rounded-2xl"
            animate={{
              scale: [0.5, 1, 0.5],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
            }}
          />

          {/* Floating ingredients */}
          {["🌿", "🌸", "🧂", "🍫", "✨", "🌱"].map((ingredient, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl"
              style={{
                top: `${20 + (i % 3) * 30}%`,
                left: `${20 + (i % 2) * 60}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                rotate: [0, 180, 360],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2 + i * 0.2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
              }}
            >
              {ingredient}
            </motion.div>
          ))}

          {/* Central box icon */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl"
            animate={{
              scale: [0.8, 1.1, 0.8],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            📦
          </motion.div>
        </div>

        <motion.p
          className="text-earth-brown/70"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: 0.5,
          }}
        >
          Preparing your custom box builder...
        </motion.p>
      </div>
    </div>
  )
}

// Recipes Loading - Cooking animation
export function RecipesLoading() {
  return (
    <div className="py-20 bg-gradient-to-b from-sage-green/10 to-white flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <motion.h2
          className="text-3xl font-bold text-sage-green mb-8"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          Our Recipes
        </motion.h2>

        {/* Cooking pot with steam */}
        <div className="relative mb-8">
          <motion.div
            className="text-8xl"
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            🍲
          </motion.div>

          {/* Steam animation */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl opacity-60"
              style={{
                top: "-20px",
                left: `${40 + i * 10}%`,
              }}
              animate={{
                y: [-10, -40, -10],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
              }}
            >
              💨
            </motion.div>
          ))}
        </div>

        {/* Floating recipe ingredients */}
        <div className="flex justify-center space-x-4 mb-6">
          {["🥄", "🍯", "🥥", "🌰"].map((ingredient, i) => (
            <motion.div
              key={i}
              className="text-3xl"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            >
              {ingredient}
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-earth-brown/70"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: 0.5,
          }}
        >
          Cooking up delicious recipes...
        </motion.p>
      </div>
    </div>
  )
}

// Ingredients Loading - Laboratory/mixing animation
export function IngredientsLoading() {
  return (
    <div className="py-20 bg-gradient-to-b from-white to-creamy-beige flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <motion.h2
          className="text-3xl font-bold text-sage-green mb-8"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          Know Your Ingredients
        </motion.h2>

        {/* DNA-like helix of ingredients */}
        <div className="relative w-64 h-64 mx-auto mb-8">
          {["🪷", "🌿", "✨", "🏔️", "🍫", "🌹"].map((ingredient, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              style={{
                top: "50%",
                left: "50%",
                transformOrigin: "0 0",
              }}
              animate={{
                rotate: [0, 360],
                x: [
                  Math.cos((i * 60 * Math.PI) / 180) * 60,
                  Math.cos(((i * 60 + 180) * Math.PI) / 180) * 60,
                  Math.cos((i * 60 * Math.PI) / 180) * 60,
                ],
                y: [
                  Math.sin((i * 60 * Math.PI) / 180) * 30,
                  Math.sin(((i * 60 + 180) * Math.PI) / 180) * 30,
                  Math.sin((i * 60 * Math.PI) / 180) * 30,
                ],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            >
              {ingredient}
            </motion.div>
          ))}

          {/* Central molecule */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-lotus-pink rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              boxShadow: [
                "0 0 20px rgba(244, 166, 205, 0.5)",
                "0 0 40px rgba(244, 166, 205, 0.8)",
                "0 0 20px rgba(244, 166, 205, 0.5)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
        </div>

        <motion.p
          className="text-earth-brown/70"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: 0.5,
          }}
        >
          Analyzing natural ingredients...
        </motion.p>
      </div>
    </div>
  )
}

// About Us Loading - Timeline building
export function AboutLoading() {
  return (
    <div className="py-20 bg-gradient-to-b from-creamy-beige to-sage-green/20 flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <motion.h2
          className="text-3xl font-bold text-sage-green mb-8"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          Our Story
        </motion.h2>

        {/* Timeline dots appearing */}
        <div className="flex justify-center items-center space-x-4 mb-8">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: i * 0.3,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 2,
              }}
            >
              <motion.div
                className="w-4 h-4 bg-lotus-pink rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  boxShadow: [
                    "0 0 10px rgba(244, 166, 205, 0.5)",
                    "0 0 20px rgba(244, 166, 205, 0.8)",
                    "0 0 10px rgba(244, 166, 205, 0.5)",
                  ],
                }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.3,
                }}
              />
              <motion.div
                className="text-xs text-earth-brown/70 mt-2"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.3,
                }}
              >
                {2020 + i}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Mascots floating */}
        <div className="flex justify-center space-x-8 mb-6">
          {["Poppy", "Poppus"].map((name, i) => (
            <motion.div
              key={name}
              className="text-center"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.5,
              }}
            >
              <div className="text-4xl mb-2">🪷</div>
              <div className="text-sm text-sage-green font-medium">{name}</div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-earth-brown/70"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: 0.5,
          }}
        >
          Building our journey timeline...
        </motion.p>
      </div>
    </div>
  )
}

// Contact Loading - Message sending animation
export function ContactLoading() {
  return (
    <div className="py-20 bg-gradient-to-b from-sage-green/20 to-creamy-beige flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <motion.h2
          className="text-3xl font-bold text-sage-green mb-8"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          Get in Touch
        </motion.h2>

        {/* Envelope opening animation */}
        <div className="relative mb-8">
          <motion.div
            className="text-8xl"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            ✉️
          </motion.div>

          {/* Hearts floating out */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{
                top: "20%",
                left: `${40 + i * 10}%`,
              }}
              animate={{
                y: [0, -30, -60],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.4,
              }}
            >
              💌
            </motion.div>
          ))}
        </div>

        {/* Communication icons orbiting */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          {["📧", "📱", "📍"].map((icon, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{
                top: "50%",
                left: "50%",
                transformOrigin: "0 0",
              }}
              animate={{
                rotate: [0, 360],
                x: [0, Math.cos((i * 120 * Math.PI) / 180) * 40],
                y: [0, Math.sin((i * 120 * Math.PI) / 180) * 40],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
                ease: "linear",
              }}
            >
              {icon}
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-earth-brown/70"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: 0.5,
          }}
        >
          Preparing contact form...
        </motion.p>
      </div>
    </div>
  )
}

// Generic section loading with customizable content
export function SectionLoading({
  title,
  subtitle,
  icon,
  bgGradient = "from-white to-creamy-beige",
}: {
  title: string
  subtitle?: string
  icon?: string
  bgGradient?: string
}) {
  return (
    <div className={`py-20 bg-gradient-to-b ${bgGradient} flex items-center justify-center min-h-[400px]`}>
      <div className="text-center">
        <motion.h2
          className="text-3xl font-bold text-sage-green mb-8"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          {title}
        </motion.h2>

        {icon && (
          <motion.div
            className="text-8xl mb-6"
            animate={{
              scale: [0.8, 1.2, 0.8],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            {icon}
          </motion.div>
        )}

        <motion.div
          className="flex justify-center space-x-2 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-lotus-pink rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>

        {subtitle && (
          <motion.p
            className="text-earth-brown/70"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: 0.5,
            }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  )
}
