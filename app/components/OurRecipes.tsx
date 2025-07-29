"use client"

import React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import RecipeModal from "./RecipeModal"

const recipes = [
  {
    id: 1,
    title: "Makhana Energy Balls",
    description: "Protein-packed energy balls with dates, nuts, and crushed makhanas",
    image: "/placeholder.svg?height=300&width=400",
    readTime: "5 min read",
    category: "Snacks",
    detailedDescription:
      "These delightful energy balls combine the crunch of roasted makhanas with the natural sweetness of dates and the richness of mixed nuts. Perfect for a quick energy boost during your busy day.",
    ingredients: [
      "1 cup PopLotus Ashwagandha Calm makhanas, crushed",
      "1 cup pitted dates, soaked for 10 minutes",
      "1/2 cup mixed nuts (almonds, walnuts, cashews)",
      "2 tbsp almond butter",
      "1 tbsp chia seeds",
      "1 tsp vanilla extract",
      "1/2 tsp cinnamon powder",
      "Pinch of sea salt",
    ],
    instructions: [
      "Soak the dates in warm water for 10 minutes to soften them.",
      "In a food processor, pulse the mixed nuts until roughly chopped.",
      "Add the soaked dates and process until a paste forms.",
      "Add crushed makhanas, almond butter, chia seeds, vanilla, cinnamon, and salt.",
      "Pulse until everything is well combined but still has some texture.",
      "Roll the mixture into small balls using your hands.",
      "Refrigerate for 30 minutes to firm up before serving.",
      "Store in an airtight container in the refrigerator for up to one week.",
    ],
    nutritionFacts: {
      calories: 85,
      protein: "3g",
      fiber: "2g",
      healthy_fats: "4g",
    },
    tips: [
      "If the mixture is too dry, add a little more almond butter or a splash of water.",
      "Roll the balls in coconut flakes or cocoa powder for extra flavor.",
      "Make a double batch and freeze half for later - they keep for up to 3 months!",
    ],
    servings: 12,
    difficulty: "Easy",
    story:
      "Inspired by traditional Indian ladoos, these energy balls were created when our founder needed a healthy snack for long work days. The combination of makhanas and dates provides sustained energy without the sugar crash.",
  },
  {
    id: 2,
    title: "Golden Turmeric Makhana Bowl",
    description: "Warm, comforting bowl with turmeric makhanas and coconut milk",
    image: "/placeholder.svg?height=300&width=400",
    readTime: "8 min read",
    category: "Breakfast",
    detailedDescription:
      "Start your morning with this nourishing golden bowl that combines the anti-inflammatory power of turmeric with creamy coconut milk and crunchy makhanas for a breakfast that's both delicious and healing.",
    ingredients: [
      "1 cup PopLotus Turmeric Glow makhanas",
      "1 can (400ml) coconut milk",
      "1 ripe banana, sliced",
      "1 tbsp honey or maple syrup",
      "1/2 tsp ground turmeric",
      "1/4 tsp ground ginger",
      "Pinch of black pepper",
      "Fresh berries for topping",
      "Chopped pistachios for garnish",
    ],
    instructions: [
      "In a small saucepan, gently warm the coconut milk over medium heat.",
      "Add turmeric, ginger, and black pepper to the coconut milk.",
      "Whisk until well combined and fragrant, about 2-3 minutes.",
      "Add honey or maple syrup and stir to dissolve.",
      "Pour the golden coconut milk into a serving bowl.",
      "Top with sliced banana and fresh berries.",
      "Sprinkle the turmeric makhanas generously over the top.",
      "Garnish with chopped pistachios and serve immediately while warm.",
    ],
    nutritionFacts: {
      calories: 320,
      protein: "6g",
      fiber: "4g",
      healthy_fats: "18g",
    },
    tips: [
      "Add a pinch of black pepper to enhance turmeric absorption.",
      "For extra creaminess, blend half the coconut milk with the banana first.",
      "This bowl is also delicious chilled as a summer breakfast option.",
    ],
    servings: 2,
    difficulty: "Easy",
    story:
      "This recipe was born from our love of golden milk lattes and the desire to create a more substantial breakfast version. The warming spices and creamy texture make it perfect for mindful morning moments.",
  },
  {
    id: 3,
    title: "Chocolate Makhana Bark",
    description: "Decadent dark chocolate bark studded with crunchy makhanas",
    image: "/placeholder.svg?height=300&width=400",
    readTime: "15 min read",
    category: "Dessert",
    detailedDescription:
      "Indulge guilt-free with this rich chocolate bark that transforms our Chocolate Bliss makhanas into an elegant dessert. Perfect for special occasions or when you need a sophisticated sweet treat.",
    ingredients: [
      "200g dark chocolate (70% cocoa), chopped",
      "1 cup PopLotus Chocolate Bliss makhanas",
      "1/4 cup dried cranberries",
      "1/4 cup chopped almonds",
      "2 tbsp coconut flakes",
      "1 tsp sea salt flakes",
      "1 tsp vanilla extract",
    ],
    instructions: [
      "Line a baking sheet with parchment paper.",
      "Melt the dark chocolate in a double boiler or microwave, stirring until smooth.",
      "Stir in vanilla extract once chocolate is melted.",
      "Pour the melted chocolate onto the prepared baking sheet.",
      "Spread evenly to about 1/4 inch thickness using a spatula.",
      "Immediately sprinkle makhanas, cranberries, almonds, and coconut flakes over the chocolate.",
      "Gently press the toppings into the chocolate with the back of a spoon.",
      "Sprinkle with sea salt flakes for a gourmet finish.",
      "Refrigerate for at least 2 hours until completely set.",
      "Break into irregular pieces and serve.",
    ],
    nutritionFacts: {
      calories: 145,
      protein: "3g",
      fiber: "3g",
      healthy_fats: "9g",
    },
    tips: [
      "Use high-quality dark chocolate for the best flavor and health benefits.",
      "Let the chocolate cool slightly before adding toppings to prevent them from sinking.",
      "Store in the refrigerator and bring to room temperature before serving for the best texture.",
    ],
    servings: 8,
    difficulty: "Medium",
    story:
      "Created for a PopLotus holiday party, this bark became an instant hit. The combination of rich chocolate and crunchy makhanas creates a texture contrast that's absolutely irresistible.",
  },
  {
    id: 4,
    title: "Spiced Makhana Trail Mix",
    description: "Perfect hiking companion with spiced makhanas, dried fruits, and seeds",
    image: "/placeholder.svg?height=300&width=400",
    readTime: "3 min read",
    category: "Snacks",
    detailedDescription:
      "This energizing trail mix combines our Himalayan Salt makhanas with dried fruits and seeds for the perfect on-the-go snack. Ideal for hiking, traveling, or whenever you need sustained energy.",
    ingredients: [
      "2 cups PopLotus Himalayan Salt makhanas",
      "1/2 cup dried apricots, chopped",
      "1/2 cup raisins",
      "1/4 cup pumpkin seeds",
      "1/4 cup sunflower seeds",
      "1/4 cup dark chocolate chips (optional)",
      "1 tsp ground cinnamon",
      "1/2 tsp ground cardamom",
    ],
    instructions: [
      "In a large bowl, combine all the makhanas, dried fruits, and seeds.",
      "Sprinkle the cinnamon and cardamom over the mixture.",
      "Toss everything together until evenly distributed.",
      "Add chocolate chips if using and mix gently.",
      "Store in an airtight container for up to 2 weeks.",
      "Portion into small bags for easy grab-and-go snacking.",
    ],
    nutritionFacts: {
      calories: 160,
      protein: "5g",
      fiber: "3g",
      healthy_fats: "6g",
    },
    tips: [
      "Customize with your favorite dried fruits and nuts.",
      "For extra flavor, lightly toast the seeds in a dry pan before mixing.",
      "Pack in small containers for portion control during outdoor activities.",
    ],
    servings: 6,
    difficulty: "Easy",
    story:
      "Developed by our adventure-loving team members who needed a nutritious snack for their weekend hikes. This mix provides the perfect balance of quick and sustained energy for any outdoor activity.",
  },
  {
    id: 5,
    title: "Makhana Smoothie Bowl",
    description: "Creamy smoothie bowl topped with crunchy makhanas and fresh berries",
    image: "/placeholder.svg?height=300&width=400",
    readTime: "10 min read",
    category: "Breakfast",
    detailedDescription:
      "Transform your morning routine with this Instagram-worthy smoothie bowl that's as nutritious as it is beautiful. The contrast between the creamy base and crunchy makhana topping is pure perfection.",
    ingredients: [
      "1 frozen banana",
      "1/2 cup frozen mixed berries",
      "1/2 cup coconut milk",
      "1 tbsp almond butter",
      "1 tsp honey",
      "1/2 cup PopLotus Rose Petal makhanas",
      "Fresh strawberries, sliced",
      "Fresh blueberries",
      "Coconut flakes",
      "Chia seeds",
    ],
    instructions: [
      "In a high-speed blender, combine frozen banana, frozen berries, coconut milk, almond butter, and honey.",
      "Blend until thick and creamy, like soft-serve ice cream consistency.",
      "Pour the smoothie into a chilled bowl.",
      "Arrange fresh strawberry slices and blueberries on top.",
      "Sprinkle rose petal makhanas generously over the surface.",
      "Add coconut flakes and chia seeds for extra texture.",
      "Serve immediately with a spoon and enjoy!",
    ],
    nutritionFacts: {
      calories: 285,
      protein: "7g",
      fiber: "8g",
      healthy_fats: "12g",
    },
    tips: [
      "Use frozen fruit for the thickest consistency - fresh fruit will make it too thin.",
      "Chill your bowl in the freezer for 10 minutes before serving for the best experience.",
      "Get creative with toppings - granola, nuts, and seeds all work beautifully.",
    ],
    servings: 1,
    difficulty: "Easy",
    story:
      "Inspired by the smoothie bowl trend, our nutritionist wanted to create a version that included the protein and crunch of makhanas. The rose petal variety adds an elegant floral note that makes breakfast feel special.",
  },
  {
    id: 6,
    title: "Rose Makhana Kulfi",
    description: "Traditional Indian frozen dessert with rose-flavored makhanas",
    image: "/placeholder.svg?height=300&width=400",
    readTime: "20 min read",
    category: "Dessert",
    detailedDescription:
      "This elegant frozen dessert combines the traditional flavors of kulfi with the unique texture of rose-flavored makhanas. A sophisticated treat that's perfect for special occasions or hot summer days.",
    ingredients: [
      "2 cups whole milk",
      "1/2 cup heavy cream",
      "1/3 cup condensed milk",
      "1/4 cup sugar",
      "1 cup PopLotus Rose Petal makhanas, crushed",
      "1 tsp rose water",
      "1/4 tsp cardamom powder",
      "Chopped pistachios for garnish",
      "Dried rose petals for decoration",
    ],
    instructions: [
      "In a heavy-bottomed pan, bring milk to a boil over medium heat.",
      "Reduce heat and simmer, stirring frequently, until milk reduces to half (about 20 minutes).",
      "Add condensed milk, sugar, and cardamom powder. Stir until sugar dissolves.",
      "Remove from heat and let cool to room temperature.",
      "Stir in heavy cream, rose water, and half of the crushed makhanas.",
      "Pour mixture into kulfi molds or small cups.",
      "Sprinkle remaining crushed makhanas on top.",
      "Cover with foil and insert wooden sticks if using.",
      "Freeze for at least 6 hours or overnight.",
      "To serve, dip molds briefly in warm water to release.",
      "Garnish with chopped pistachios and rose petals.",
    ],
    nutritionFacts: {
      calories: 195,
      protein: "6g",
      fiber: "1g",
      healthy_fats: "8g",
    },
    tips: [
      "Don't skip the milk reduction step - it's key to authentic kulfi texture.",
      "Use food-grade rose water for the best flavor.",
      "For easier unmolding, run the molds under warm water for a few seconds.",
    ],
    servings: 6,
    difficulty: "Medium",
    story:
      "This recipe honors the traditional kulfi while adding our signature rose petal makhanas for extra texture and flavor. It was developed for Diwali celebrations and became a family favorite that bridges tradition with innovation.",
  },
]

export default function OurRecipes() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })
  const [hasAnimated, setHasAnimated] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState<(typeof recipes)[0] | null>(null)
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

  const handleRecipeClick = (recipe: (typeof recipes)[0]) => {
    setSelectedRecipe(recipe)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedRecipe(null), 300)
  }

  return (
    <section
      id="recipes"
      ref={containerRef}
      className="py-20 bg-gradient-to-b from-sage-green/10 to-white relative overflow-hidden"
    >
      {/* Floating recipe ingredients */}
      {hasAnimated && (
        <div className="absolute inset-0 pointer-events-none">
          {["🥄", "🍯", "🥥", "🌰", "🫐", "🍓"].map((ingredient, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl opacity-20"
              initial={{
                x: -100,
                y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
                rotate: 0,
              }}
              animate={{
                x: (typeof window !== "undefined" ? window.innerWidth : 1200) + 100,
                y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
                rotate: 720,
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                delay: Math.random() * 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              {ingredient}
            </motion.div>
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-sage-green mb-6"
            initial={{ opacity: 0, rotateX: -90, transformOrigin: "bottom" }}
            animate={hasAnimated ? { opacity: 1, rotateX: 0 } : { opacity: 0, rotateX: -90 }}
            transition={{ duration: 1, delay: 0.3, type: "spring" }}
          >
            Our Recipes
          </motion.h2>
          <motion.p
            className="text-xl text-earth-brown/70 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Discover creative ways to enjoy your PopLotus makhanas with our curated collection of healthy recipes. Click
            any recipe to see the full details!
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe, index) => (
            <motion.article
              key={recipe.id}
              initial={{
                opacity: 0,
                y: 100,
                rotateX: -45,
                scale: 0.8,
              }}
              animate={
                hasAnimated
                  ? {
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                      scale: 1,
                    }
                  : {
                      opacity: 0,
                      y: 100,
                      rotateX: -45,
                      scale: 0.8,
                    }
              }
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 100,
                delay: index * 0.15 + 0.7,
                duration: 1,
              }}
              whileHover={{
                y: -15,
                rotateY: 5,
                boxShadow: "0 30px 60px rgba(0,0,0,0.15)",
                transition: { duration: 0.3 },
              }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              onClick={() => handleRecipeClick(recipe)}
            >
              <div className="relative overflow-hidden">
                <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.5 }}>
                  <Image
                    src={recipe.image || "/placeholder.svg"}
                    alt={recipe.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                </motion.div>
                <motion.div
                  className="absolute top-4 left-4"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={hasAnimated ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ delay: index * 0.15 + 1.2, duration: 0.5 }}
                >
                  <span className="bg-lotus-pink text-white px-3 py-1 rounded-full text-sm font-medium">
                    {recipe.category}
                  </span>
                </motion.div>
              </div>

              <div className="p-6">
                <motion.h3
                  className="text-xl font-bold text-earth-brown mb-3 group-hover:text-lotus-pink transition-colors duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.15 + 1.4, duration: 0.5 }}
                >
                  {recipe.title}
                </motion.h3>

                <motion.p
                  className="text-earth-brown/70 mb-4 leading-relaxed"
                  initial={{ opacity: 0, x: -20 }}
                  animate={hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.15 + 1.6, duration: 0.5 }}
                >
                  {recipe.description}
                </motion.p>

                <div className="flex items-center justify-between">
                  <motion.span
                    className="text-sm text-sage-green font-medium"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={hasAnimated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                    transition={{ delay: index * 0.15 + 1.8, duration: 0.3 }}
                  >
                    {recipe.readTime}
                  </motion.span>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.15 + 2, duration: 0.5 }}
                    className="text-lotus-pink font-semibold hover:text-lotus-pink/80 transition-colors duration-300 flex items-center"
                  >
                    View Recipe →
                  </motion.div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={hasAnimated ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
          transition={{ duration: 0.8, delay: 1.5, type: "spring" }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(104, 211, 145, 0.3)",
              rotate: [0, -1, 1, 0],
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-sage-green text-white px-8 py-3 rounded-full font-semibold hover:bg-sage-green/90 transition-all duration-300"
          >
            View All Recipes
          </motion.button>
        </motion.div>
      </div>

      {/* Recipe Modal */}
      {selectedRecipe && <RecipeModal isOpen={isModalOpen} onClose={closeModal} recipe={selectedRecipe} />}
    </section>
  )
}
