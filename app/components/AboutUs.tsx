"use client"

import { useRef, Suspense, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Text3D } from "@react-three/drei"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import type * as THREE from "three"
import React from "react"
import StoryModal from "./StoryModal"

function FloatingMascot({ position, text }: { position: [number, number, number]; text: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.5) * 0.5
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
      <group ref={meshRef} position={position}>
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#f4a6cd" roughness={0.3} metalness={0.1} />
        </mesh>

        <Text3D font="/fonts/Geist_Regular.json" size={0.1} height={0.02} position={[0, -1, 0]}>
          {text}
          <meshStandardMaterial color="#68d391" />
        </Text3D>
      </group>
    </Float>
  )
}

const milestones = [
  {
    year: "2020",
    title: "The Beginning",
    description: "Founded with a mission to make healthy snacking delicious and accessible to everyone.",
    mascot: "Poppy",
    detailedStory:
      "It all started in a small kitchen where our founder, inspired by ancient Ayurvedic wisdom, discovered the incredible potential of makhanas. Poppy was born from this vision - a cheerful companion who believed that healthy eating shouldn't mean compromising on taste. The first batch of PopLotus makhanas was hand-roasted with love, using traditional techniques passed down through generations. What began as a personal quest for better snacking options quickly became a mission to revolutionize the healthy snack industry.",
    achievements: [
      "Developed the first signature flavor recipes",
      "Established partnerships with organic lotus seed farmers",
      "Created the PopLotus brand identity and mascots",
      "Launched initial product testing with 100 beta customers",
    ],
    challenges: [
      "Finding reliable organic suppliers in remote areas",
      "Perfecting the roasting process for optimal taste and nutrition",
      "Building brand awareness in a competitive market",
      "Securing initial funding for equipment and inventory",
    ],
    impact:
      "The foundation year established PopLotus as a pioneer in premium makhana snacks, setting the stage for sustainable growth while maintaining our commitment to quality and wellness. Our early customers became our biggest advocates, spreading the word about this revolutionary healthy snack.",
    quote: "Every great journey begins with a single step - and ours started with a single perfectly roasted makhana!",
  },
  {
    year: "2021",
    title: "First Flavors",
    description: "Launched our signature Ashwagandha Calm and Turmeric Glow varieties.",
    mascot: "Poppus",
    detailedStory:
      "With Poppus leading our flavor innovation team, we embarked on a journey to create makhana varieties that not only tasted amazing but also supported specific wellness goals. The Ashwagandha Calm blend was developed after months of research into adaptogens and their stress-relieving properties. Turmeric Glow emerged from our desire to create a snack that promoted natural radiance from within. Each flavor underwent rigorous testing, with Poppus personally taste-testing over 200 variations to achieve the perfect balance of nutrition and flavor.",
    achievements: [
      "Successfully launched two flagship flavors",
      "Achieved 500% growth in monthly sales",
      "Established relationships with Ayurvedic ingredient suppliers",
      "Received first industry recognition for innovation",
    ],
    challenges: [
      "Sourcing high-quality ashwagandha and turmeric",
      "Maintaining flavor consistency across large batches",
      "Educating consumers about adaptogenic benefits",
      "Scaling production while preserving artisanal quality",
    ],
    impact:
      "These signature flavors became the cornerstone of our brand, introducing thousands of customers to the concept of functional snacking. The success of these varieties validated our approach of combining ancient wisdom with modern wellness needs.",
    quote: "Flavor is just the beginning - we're crafting experiences that nourish both body and soul!",
  },
  {
    year: "2022",
    title: "Going Organic",
    description: "Achieved 100% organic certification for all our ingredients and processes.",
    mascot: "Poppy",
    detailedStory:
      "Poppy championed our transition to complete organic certification, believing that true wellness starts with pure, unadulterated ingredients. This wasn't just about meeting standards - it was about exceeding them. We rebuilt our entire supply chain, partnering directly with organic farmers and implementing rigorous quality control measures. Every step of our process, from seed to shelf, was scrutinized and certified. This transformation required significant investment and patience, but Poppy knew it was essential for our customers' health and our planet's future.",
    achievements: [
      "Obtained USDA Organic certification for all products",
      "Established direct trade relationships with 50+ organic farmers",
      "Implemented zero-waste production processes",
      "Launched organic ingredient transparency program",
    ],
    challenges: [
      "Higher costs associated with organic ingredients",
      "Longer lead times for organic supply chain",
      "Extensive documentation and audit requirements",
      "Maintaining competitive pricing while going organic",
    ],
    impact:
      "Going organic wasn't just a business decision - it was a commitment to our customers' health and environmental sustainability. This milestone established PopLotus as a trusted leader in the organic snack space and attracted health-conscious consumers who valued transparency and quality.",
    quote: "When we choose organic, we're not just feeding our bodies - we're nurturing our planet!",
  },
  {
    year: "2023",
    title: "Community Love",
    description: "Reached 100,000 happy customers and launched our wellness recipe blog.",
    mascot: "Poppus",
    detailedStory:
      "Poppus was overjoyed to celebrate this incredible milestone with our growing community. Reaching 100,000 customers wasn't just about numbers - it represented 100,000 people who had chosen to prioritize their health and wellness. To give back to this amazing community, we launched our wellness recipe blog, featuring creative ways to incorporate makhanas into daily nutrition. Poppus personally curated recipes from customers, nutritionists, and wellness experts, creating a vibrant hub of healthy inspiration.",
    achievements: [
      "Celebrated 100,000 satisfied customers milestone",
      "Launched comprehensive wellness recipe blog",
      "Introduced customer loyalty rewards program",
      "Established PopLotus wellness community forum",
    ],
    challenges: [
      "Managing rapid customer service demands",
      "Scaling content creation for the blog",
      "Maintaining personal touch as community grew",
      "Balancing growth with quality customer experience",
    ],
    impact:
      "This milestone transformed PopLotus from a snack company into a wellness community. Our customers became our collaborators, sharing recipes, wellness tips, and success stories that inspired others on their health journeys.",
    quote: "A community of 100,000 wellness warriors - together we're creating a healthier, happier world!",
  },
  {
    year: "2024",
    title: "Sustainable Future",
    description: "Introduced eco-friendly packaging and partnered with local farmers.",
    mascot: "Poppy",
    detailedStory:
      "Poppy led our sustainability revolution, recognizing that true wellness extends beyond personal health to planetary health. We completely redesigned our packaging using biodegradable materials and plant-based inks. Our partnership program with local farmers not only reduced our carbon footprint but also supported rural communities. Every package now tells a story - from the farmer who grew the lotus seeds to the sustainable materials that protect them. This wasn't just about being environmentally responsible; it was about creating a regenerative business model that gives back more than it takes.",
    achievements: [
      "Launched 100% biodegradable packaging line",
      "Partnered with 200+ local farming families",
      "Achieved carbon-neutral shipping operations",
      "Introduced seed-to-shelf traceability program",
    ],
    challenges: [
      "Higher costs of sustainable packaging materials",
      "Coordinating with numerous small-scale farmers",
      "Maintaining product freshness in eco-friendly packaging",
      "Educating consumers about sustainable practices",
    ],
    impact:
      "Our sustainability initiatives positioned PopLotus as an industry leader in environmental responsibility. We proved that businesses can be profitable while being planet-positive, inspiring other companies to adopt similar practices.",
    quote: "Sustainability isn't just our responsibility - it's our gift to future generations!",
  },
]

export default function AboutUs() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const [hasAnimated, setHasAnimated] = useState(false)
  const [selectedMilestone, setSelectedMilestone] = useState<(typeof milestones)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  React.useEffect(() => {
    if (isInView) {
      setHasAnimated(true)
    } else {
      const timer = setTimeout(() => {
        setHasAnimated(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isInView])

  const handleMilestoneClick = (milestone: (typeof milestones)[0]) => {
    setSelectedMilestone(milestone)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedMilestone(null), 300)
  }

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-20 bg-gradient-to-b from-creamy-beige to-sage-green/20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-sage-green mb-6">Our Story</h2>
          <p className="text-xl text-earth-brown/70 max-w-3xl mx-auto">
            Join Poppy and Poppus as they share the journey of how PopLotus became your favorite healthy snack
            companion. Click on any milestone to dive deeper into our story!
          </p>
        </motion.div>

        <div className="relative">
          {/* 3D Mascots */}
          <motion.div style={{ y }} className="absolute right-0 top-0 w-1/3 h-full hidden lg:block">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <FloatingMascot position={[0, 2, 0]} text="Poppy" />
                <FloatingMascot position={[0, -2, 0]} text="Poppus" />
              </Suspense>
            </Canvas>
          </motion.div>

          {/* Timeline */}
          <div className="relative lg:w-2/3">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{
                  opacity: 0,
                  x: -100,
                  rotate: -10,
                  scale: 0.8,
                }}
                animate={
                  hasAnimated
                    ? {
                        opacity: 1,
                        x: 0,
                        rotate: 0,
                        scale: 1,
                      }
                    : {
                        opacity: 0,
                        x: -100,
                        rotate: -10,
                        scale: 0.8,
                      }
                }
                transition={{
                  duration: 0.8,
                  delay: index * 0.3,
                  type: "spring",
                  stiffness: 100,
                }}
                className="flex items-start mb-12 last:mb-0"
              >
                <motion.div
                  className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-lotus-pink to-lotus-pink/80 rounded-full flex items-center justify-center text-white font-bold text-lg mr-8 shadow-lg cursor-pointer"
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, -10, 10, 0],
                    boxShadow: "0 20px 40px rgba(244, 166, 205, 0.4)",
                  }}
                  animate={{
                    boxShadow: [
                      "0 10px 20px rgba(244, 166, 205, 0.2)",
                      "0 15px 30px rgba(244, 166, 205, 0.3)",
                      "0 10px 20px rgba(244, 166, 205, 0.2)",
                    ],
                  }}
                  transition={{
                    boxShadow: {
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.5,
                    },
                  }}
                  onClick={() => handleMilestoneClick(milestone)}
                >
                  {milestone.year}
                </motion.div>

                <div className="flex-grow">
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      rotateY: 2,
                      boxShadow: "0 25px 50px rgba(0,0,0,0.1)",
                    }}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => handleMilestoneClick(milestone)}
                  >
                    <div className="flex items-center mb-3">
                      <motion.h3
                        className="text-2xl font-bold text-earth-brown mr-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: index * 0.3 + 0.2 }}
                      >
                        {milestone.title}
                      </motion.h3>
                      <motion.span
                        className="bg-sage-green/20 text-sage-green px-3 py-1 rounded-full text-sm font-medium"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={hasAnimated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                        transition={{ delay: index * 0.3 + 0.4, type: "spring" }}
                      >
                        {milestone.mascot} says
                      </motion.span>
                    </div>

                    <motion.p
                      className="text-earth-brown/80 leading-relaxed mb-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: index * 0.3 + 0.6 }}
                    >
                      {milestone.description}
                    </motion.p>

                    <motion.div
                      className="text-lotus-pink font-medium text-sm flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.3 + 0.8 }}
                    >
                      Click to read the full story →
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { title: "Natural Goodness", icon: "🌱", description: "Only the finest organic ingredients" },
            { title: "Wellness First", icon: "💚", description: "Every snack supports your health journey" },
            { title: "Sustainable Future", icon: "🌍", description: "Caring for our planet with every bite" },
          ].map((value, index) => (
            <motion.div
              key={value.title}
              whileHover={{ y: -10, boxShadow: "0 25px 50px rgba(0,0,0,0.1)" }}
              className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-5xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold text-earth-brown mb-3">{value.title}</h3>
              <p className="text-earth-brown/70">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Story Modal */}
      {selectedMilestone && <StoryModal isOpen={isModalOpen} onClose={closeModal} milestone={selectedMilestone} />}
    </section>
  )
}
