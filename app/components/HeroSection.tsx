"use client"

import { useRef, Suspense, useState, useEffect, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment } from "@react-three/drei"
import { motion, useScroll, useTransform } from "framer-motion"
import type * as THREE from "three"

// Optimized 3D character with reduced complexity
function MakhanaCharacter({
  position,
  rotation,
}: { position: [number, number, number]; rotation: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      // Reduced animation frequency for better performance
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.05
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
      <mesh ref={meshRef} position={position} rotation={rotation}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial color="#f4a6cd" roughness={0.3} metalness={0.1} />

        {/* Simplified eyes */}
        <mesh position={[-0.3, 0.2, 0.6]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#2d3748" />
        </mesh>
        <mesh position={[0.3, 0.2, 0.6]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#2d3748" />
        </mesh>
      </mesh>
    </Float>
  )
}

// Optimized 3D scene with error handling
function Hero3D() {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const handleContextLost = () => {
      console.warn("WebGL context lost, falling back to 2D")
      setHasError(true)
    }

    const canvas = document.querySelector("canvas")
    if (canvas) {
      canvas.addEventListener("webglcontextlost", handleContextLost)
      return () => canvas.removeEventListener("webglcontextlost", handleContextLost)
    }
  }, [])

  if (hasError) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-4 animate-bounce">🪷</div>
          <div className="text-4xl font-bold text-sage-green">PopLotus</div>
        </div>
      </div>
    )
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      dpr={[1, 1.5]} // Limit pixel ratio for better performance
      performance={{ min: 0.5 }} // Allow frame rate to drop if needed
      onCreated={({ gl }) => {
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      }}
    >
      <Suspense fallback={null}>
        <Environment preset="dawn" />
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.8} />

        <MakhanaCharacter position={[-2, 0, 0]} rotation={[0, 0.3, 0]} />
        <MakhanaCharacter position={[2, 0, 0]} rotation={[0, -0.3, 0]} />

        {/* Simple text instead of Text3D to avoid font loading issues */}
        <mesh position={[0, -2, 0]}>
          <planeGeometry args={[4, 1]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </Suspense>
    </Canvas>
  )
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  useEffect(() => {
    // Reduced loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Memoized floating petals with reduced count
  const floatingPetals = useMemo(
    () =>
      [...Array(8)].map((_, i) => ({
        // Reduced from 15 to 8
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: i * 0.8,
      })),
    [],
  )

  if (isLoading) {
    return (
      <div className="h-screen bg-gradient-to-br from-creamy-beige via-white to-sage-green/20 flex items-center justify-center">
        <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.div
            className="text-6xl mb-4"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            🪷
          </motion.div>
          <h1 className="text-4xl font-bold text-sage-green">PopLotus</h1>
        </motion.div>
      </div>
    )
  }

  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden bg-gradient-to-br from-creamy-beige via-white to-sage-green/20"
    >
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <div className="absolute inset-0 z-10">
          <Hero3D />
        </div>

        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-6xl md:text-8xl font-bold text-sage-green mb-6"
          >
            Snack Smart.
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-6xl md:text-8xl font-bold text-lotus-pink mb-8"
          >
            Snack Happy.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-xl md:text-2xl text-earth-brown/80 mb-12 max-w-2xl"
          >
            Premium flavored makhanas crafted for your wellness journey. Meet Poppy & Poppus, your snacking companions.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-lotus-pink text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-lotus-pink/90 transition-colors duration-300 shadow-lg"
          >
            Explore Flavours
          </motion.button>
        </div>
      </motion.div>

      {/* Optimized floating petals with reduced count and simpler animations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingPetals.map((petal) => (
          <motion.div
            key={petal.id}
            className="absolute text-3xl opacity-20"
            style={{
              left: petal.left,
              top: petal.top,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: petal.delay,
            }}
          >
            🌸
          </motion.div>
        ))}
      </div>

      {/* Simplified scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <div className="w-6 h-10 border-2 border-sage-green rounded-full flex justify-center">
          <div className="w-1 h-3 bg-sage-green rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  )
}
