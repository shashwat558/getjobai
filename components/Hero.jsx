"use client"

import { Button } from "@/components/ui/button"
import { Upload, Search } from 'lucide-react'
import Image from "next/image"
import { motion } from "framer-motion"

export default function HeroSection() {
  const containerVariants = {
    hidden: { 
      scale: 0,
      opacity: 0 
    },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { 
      y: 50,
      opacity: 0 
    },
    visible: { 
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const floatingVariants = {
    hidden: { 
      scale: 0,
      rotate: -180,
      opacity: 0 
    },
    visible: { 
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "backOut",
        delay: 1.2
      }
    }
  }

  const continuousFloat = {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  const continuousRotate = {
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  return (
    <motion.section 
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100/40 to-indigo-100/40 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.div 
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-100/40 to-pink-100/40 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        ></motion.div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen py-12 lg:py-20">
          {/* Left side - Content */}
          <motion.div className="space-y-8 lg:space-y-10" variants={itemVariants}>
            <div className="space-y-6">
              {/* Eyebrow */}
              <motion.div 
                className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200/50"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.15)"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.span 
                  className="text-sm font-medium text-blue-700"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✨ Powered by Advanced AI
                </motion.span>
              </motion.div>

              {/* Main headline */}
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]"
                variants={itemVariants}
              >
                <motion.span 
                  className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundSize: "200% 200%"
                  }}
                >
                  AI that Lands You the Job You Deserve
                </motion.span>
              </motion.h1>

              {/* Subheading */}
              <motion.p 
                className="text-lg sm:text-xl lg:text-2xl text-slate-600 leading-relaxed max-w-2xl"
                variants={itemVariants}
              >
                Upload your resume for personalized job matching or search through thousands of opportunities. Our AI
                analyzes your skills and connects you with your perfect role.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 sm:gap-6"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button
                  size="lg"
                  className="h-14 px-8 text-base font-semibold rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                  >
                    <Upload className="w-5 h-5 mr-2" />
                  </motion.div>
                  Upload Resume
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 text-base font-semibold rounded-2xl border-2 border-slate-200 hover:border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 3 }}
                  >
                    <Search className="w-5 h-5 mr-2" />
                  </motion.div>
                  Try Search
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust indicators */}
            <motion.div 
              className="flex items-center gap-6 pt-4"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[0, 1, 2].map((index) => (
                    <motion.div
                      key={index}
                      className={`w-8 h-8 rounded-full border-2 border-white ${
                        index === 0 ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                        index === 1 ? 'bg-gradient-to-br from-green-400 to-green-600' :
                        'bg-gradient-to-br from-purple-400 to-purple-600'
                      }`}
                      initial={{ scale: 0, x: -20 }}
                      animate={{ scale: 1, x: 0 }}
                      transition={{ 
                        delay: 1.5 + index * 0.1,
                        type: "spring",
                        stiffness: 500,
                        damping: 15
                      }}
                      whileHover={{ scale: 1.2, zIndex: 10 }}
                    />
                  ))}
                </div>
                <motion.span 
                  className="text-sm text-slate-600 font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8 }}
                >
                  10k+ successful placements
                </motion.span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Illustration */}
          <motion.div 
            className="relative lg:h-[600px] flex items-center justify-center"
            variants={itemVariants}
          >
            {/* Main illustration container */}
            <div className="relative w-full max-w-lg">
              {/* Background glow */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-3xl blur-2xl transform rotate-6"
                animate={continuousRotate}
              />

              {/* Main illustration placeholder */}
              <motion.div 
                className="relative bg-gradient-to-br from-white to-blue-50/50 rounded-3xl p-8 shadow-2xl border border-white/50 backdrop-blur-sm"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.1)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div
                  animate={continuousFloat}
                >
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="Person using laptop to find jobs with AI assistance"
                    width={400}
                    height={400}
                    className="w-full h-auto"
                  />
                </motion.div>
              </motion.div>

              {/* Floating job cards */}
              <motion.div 
                className="absolute -top-4 -left-4 bg-white rounded-xl p-3 shadow-lg border border-slate-100"
                variants={floatingVariants}
                animate={{
                  ...continuousFloat,
                  rotate: [-6, -3, -6]
                }}
                whileHover={{ 
                  rotate: 0,
                  scale: 1.1,
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="flex items-center gap-2">
                  <motion.div 
                    className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                  <div>
                    <div className="w-16 h-2 bg-slate-200 rounded"></div>
                    <div className="w-12 h-1.5 bg-slate-100 rounded mt-1"></div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="absolute -bottom-4 -right-4 bg-white rounded-xl p-3 shadow-lg border border-slate-100"
                variants={floatingVariants}
                animate={{
                  ...continuousFloat,
                  rotate: [6, 3, 6]
                }}
                whileHover={{ 
                  rotate: 0,
                  scale: 1.1,
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="flex items-center gap-2">
                  <motion.div 
                    className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg"
                    animate={{ rotate: [360, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  />
                  <div>
                    <div className="w-16 h-2 bg-slate-200 rounded"></div>
                    <div className="w-12 h-1.5 bg-slate-100 rounded mt-1"></div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="absolute top-1/4 -right-8 bg-white rounded-xl p-3 shadow-lg border border-slate-100"
                variants={floatingVariants}
                animate={{
                  ...continuousFloat,
                  rotate: [3, -3, 3]
                }}
                whileHover={{ 
                  rotate: 0,
                  scale: 1.1,
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="flex items-center gap-2">
                  <motion.div 
                    className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  />
                  <div>
                    <div className="w-16 h-2 bg-slate-200 rounded"></div>
                    <div className="w-12 h-1.5 bg-slate-100 rounded mt-1"></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
