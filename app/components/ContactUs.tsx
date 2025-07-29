"use client"

import type React from "react"

import { useState, useRef, useMemo, useEffect } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const contactInfo = [
  {
    id: 1,
    title: "Email Us",
    value: "contact@poplotus.in",
    icon: "📧",
    description: "Drop us a line anytime",
    color: "from-sage-green to-forest-green",
  },
  {
    id: 2,
    title: "Call Us",
    value: "+91 90074 08609",
    icon: "📞",
    description: "Mon-Fri, 9AM-6PM IST",
    color: "from-lotus-pink to-sunset-coral",
  },
  {
    id: 3,
    title: "Visit Us",
    value: "Kolkata, West Bengal",
    icon: "📍",
    description: "Come say hello!",
    color: "from-golden-yellow to-warm-orange",
  },
]

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [hasAnimated, setHasAnimated] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"])

  // Floating communication icons
  const floatingIcons = useMemo(
    () =>
      [...Array(12)].map((_, i) => ({
        id: i,
        emoji: ["📧", "📞", "💬", "✉️", "📱", "💌"][Math.floor(Math.random() * 6)],
        delay: Math.random() * 3,
        duration: 5 + Math.random() * 3,
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission here
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-20 bg-gradient-to-br from-soft-lavender/30 via-creamy-beige to-sage-green/20 overflow-hidden"
    >
      {/* Floating communication icons */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map((icon) => (
          <motion.div
            key={icon.id}
            className="absolute text-3xl opacity-20"
            style={{
              left: `${icon.startX}%`,
              top: `${icon.startY}%`,
            }}
            animate={
              hasAnimated
                ? {
                    x: [0, 40, -20, 60, -10],
                    y: [0, -60, 30, -40, 15],
                    rotate: [0, 180, 360, 540, 720],
                    scale: [0.6, 1, 0.8, 1.2, 0.7],
                    opacity: [0.2, 0.4, 0.25, 0.5, 0.15],
                  }
                : {}
            }
            transition={{
              duration: icon.duration,
              delay: icon.delay,
              repeat: hasAnimated ? Number.POSITIVE_INFINITY : 0,
              ease: "easeInOut",
            }}
          >
            {icon.emoji}
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
          <h2 className="text-5xl md:text-6xl font-bold text-deep-purple mb-6">Get In Touch</h2>
          <p className="text-xl text-earth-brown/80 max-w-3xl mx-auto">
            Have questions about our products? Want to share feedback? We'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -100, rotateY: -30 }}
            animate={hasAnimated ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: -100, rotateY: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-bold text-earth-brown mb-8">Let's Connect</h3>

            {contactInfo.map((info, index) => (
              <motion.div
                key={info.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={hasAnimated ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
                transition={{
                  duration: 0.6,
                  delay: 0.4 + index * 0.1,
                  type: "spring",
                  stiffness: 120,
                }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.3 },
                }}
              >
                <Card
                  className={`p-6 bg-gradient-to-br ${info.color} border-0 shadow-xl hover:shadow-2xl transition-all duration-300`}
                >
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-4">
                      <motion.div
                        animate={hasAnimated ? { rotate: [0, 360], scale: [1, 1.2, 1] } : { rotate: 0, scale: 1 }}
                        transition={{
                          duration: 2,
                          delay: index * 0.5,
                          repeat: hasAnimated ? Number.POSITIVE_INFINITY : 0,
                          repeatDelay: 3,
                        }}
                        className="text-4xl"
                      >
                        {info.icon}
                      </motion.div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-1">{info.title}</h4>
                        <p className="text-white/90 font-semibold">{info.value}</p>
                        <p className="text-white/70 text-sm">{info.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Social Media Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="pt-8"
            >
              <h4 className="text-xl font-bold text-earth-brown mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {["📘", "📷", "🐦", "📺"].map((emoji, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-2xl hover:shadow-xl transition-all duration-300"
                  >
                    {emoji}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotateY: 30 }}
            animate={hasAnimated ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: 100, rotateY: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="p-8 shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <h3 className="text-3xl font-bold text-earth-brown mb-8">Send us a Message</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <label className="block text-sm font-semibold text-earth-brown mb-2">Your Name</label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-sage-green focus:ring-2 focus:ring-sage-green/20 transition-all duration-300"
                      placeholder="Enter your name"
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <label className="block text-sm font-semibold text-earth-brown mb-2">Email Address</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-sage-green focus:ring-2 focus:ring-sage-green/20 transition-all duration-300"
                      placeholder="Enter your email"
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <label className="block text-sm font-semibold text-earth-brown mb-2">Subject</label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-sage-green focus:ring-2 focus:ring-sage-green/20 transition-all duration-300"
                      placeholder="What's this about?"
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    <label className="block text-sm font-semibold text-earth-brown mb-2">Message</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-sage-green focus:ring-2 focus:ring-sage-green/20 transition-all duration-300 resize-none"
                      placeholder="Tell us more..."
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                  >
                    <motion.button
                      type="submit"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-gradient-to-r from-sage-green to-forest-green text-white py-4 rounded-lg text-lg font-semibold hover:from-sage-green/90 hover:to-forest-green/90 transition-all duration-300 shadow-lg"
                    >
                      Send Message 📤
                    </motion.button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
