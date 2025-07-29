"use client"

import React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-20 bg-gradient-to-b from-sage-green/20 to-creamy-beige relative"
    >
      {hasAnimated && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {["✉️", "💌", "📝", "💬"].map((icon, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl opacity-10"
              initial={{
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 100,
                rotate: 0,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: -100,
                rotate: 360,
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                delay: Math.random() * 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              {icon}
            </motion.div>
          ))}
        </div>
      )}
      <div className="max-w-4xl mx-auto px-6">
        <motion.div className="text-center mb-16">
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-sage-green mb-6"
            initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
            animate={hasAnimated ? { opacity: 1, scale: 1, rotateX: 0 } : { opacity: 0, scale: 0.5, rotateX: -90 }}
            transition={{ duration: 1, delay: 0.3, type: "spring" }}
          >
            Get in Touch
          </motion.h2>
          <p className="text-xl text-earth-brown/70 max-w-2xl mx-auto">
            Have questions about our products or want to share your PopLotus experience? We'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -100, rotateY: -45 }}
            animate={hasAnimated ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: -100, rotateY: -45 }}
            transition={{ duration: 1, delay: 0.5, type: "spring" }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <motion.input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-4 bg-white rounded-2xl border-2 border-transparent focus:border-lotus-pink outline-none transition-all duration-300 text-earth-brown"
                  placeholder="Your Name"
                  required
                />
                <motion.div
                  initial={false}
                  animate={{
                    scale: focusedField === "name" ? 1.02 : 1,
                    boxShadow:
                      focusedField === "name" ? "0 10px 30px rgba(244, 166, 205, 0.2)" : "0 5px 15px rgba(0,0,0,0.1)",
                  }}
                  className="absolute inset-0 bg-white rounded-2xl -z-10"
                />
              </div>

              <div className="relative">
                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-4 bg-white rounded-2xl border-2 border-transparent focus:border-lotus-pink outline-none transition-all duration-300 text-earth-brown"
                  placeholder="Your Email"
                  required
                />
                <motion.div
                  initial={false}
                  animate={{
                    scale: focusedField === "email" ? 1.02 : 1,
                    boxShadow:
                      focusedField === "email" ? "0 10px 30px rgba(244, 166, 205, 0.2)" : "0 5px 15px rgba(0,0,0,0.1)",
                  }}
                  className="absolute inset-0 bg-white rounded-2xl -z-10"
                />
              </div>

              <div className="relative">
                <motion.textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  rows={6}
                  className="w-full px-4 py-4 bg-white rounded-2xl border-2 border-transparent focus:border-lotus-pink outline-none transition-all duration-300 text-earth-brown resize-none"
                  placeholder="Your Message"
                  required
                />
                <motion.div
                  initial={false}
                  animate={{
                    scale: focusedField === "message" ? 1.02 : 1,
                    boxShadow:
                      focusedField === "message"
                        ? "0 10px 30px rgba(244, 166, 205, 0.2)"
                        : "0 5px 15px rgba(0,0,0,0.1)",
                  }}
                  className="absolute inset-0 bg-white rounded-2xl -z-10"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(244, 166, 205, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-lotus-pink text-white py-4 rounded-2xl font-semibold text-lg hover:bg-lotus-pink/90 transition-all duration-300 shadow-lg"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotateY: 45 }}
            animate={hasAnimated ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: 100, rotateY: 45 }}
            transition={{ duration: 1, delay: 0.7, type: "spring" }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-earth-brown mb-6">Let's Connect</h3>

              <div className="space-y-6">
                <motion.div whileHover={{ x: 10 }} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-lotus-pink/20 rounded-full flex items-center justify-center">
                    <span className="text-lotus-pink text-xl">📧</span>
                  </div>
                  <div>
                    <p className="font-semibold text-earth-brown">Email</p>
                    <p className="text-earth-brown/70">hello@poplotus.com</p>
                  </div>
                </motion.div>

                <motion.div whileHover={{ x: 10 }} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-sage-green/20 rounded-full flex items-center justify-center">
                    <span className="text-sage-green text-xl">📱</span>
                  </div>
                  <div>
                    <p className="font-semibold text-earth-brown">Phone</p>
                    <p className="text-earth-brown/70">+1 (555) 123-4567</p>
                  </div>
                </motion.div>

                <motion.div whileHover={{ x: 10 }} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-creamy-beige rounded-full flex items-center justify-center">
                    <span className="text-earth-brown text-xl">📍</span>
                  </div>
                  <div>
                    <p className="font-semibold text-earth-brown">Address</p>
                    <p className="text-earth-brown/70">
                      123 Wellness Street
                      <br />
                      Healthy City, HC 12345
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-sage-green/10 to-lotus-pink/10 rounded-2xl p-8">
              <h4 className="text-xl font-bold text-earth-brown mb-4">Follow Our Journey</h4>
              <p className="text-earth-brown/70 mb-6">
                Stay updated with new flavors, recipes, and wellness tips from Poppy & Poppus!
              </p>

              <div className="flex space-x-4">
                {["📘", "📷", "🐦", "📌"].map((icon, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <span className="text-xl">{icon}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
