"use client"

import { useRef } from "react"
import { useScroll } from "framer-motion"
import HeroSection from "./components/HeroSection"
import FlavoursByMood from "./components/FlavoursByMood"
import BuildYourBox from "./components/BuildYourBox"
import OurRecipes from "./components/OurRecipes"
import KnowYourIngredients from "./components/KnowYourIngredients"
import AboutUs from "./components/AboutUs"
import ContactUs from "./components/ContactUs"
import Navigation from "./components/Navigation"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  return (
    <div ref={containerRef} className="relative">
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Flavours by Mood */}
      <FlavoursByMood />

      {/* Build Your Own Box */}
      <BuildYourBox />

      {/* Our Recipes */}
      <OurRecipes />

      {/* Know Your Ingredients */}
      <KnowYourIngredients />

      {/* About Us */}
      <AboutUs />

      {/* Contact Us */}
      <ContactUs />
    </div>
  )
}
