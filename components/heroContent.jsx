"use client"

import { motion } from "framer-motion"
import Image from "next/image"


export default function HeroContent({ itemVariants, floatingVariants }) {
  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-12 lg:py-20">
      {/* Left side - Content */}
      <motion.div className="space-y-8 lg:space-y-10" variants={itemVariants}>
        <div className="space-y-6">
          {/* Eyebrow */}
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full border border-white/30 backdrop-blur-sm"
            style={{
              background: "linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(6, 182, 212, 0.15) 100%)",
            }}
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(14, 165, 233, 0.2)",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.span
              className="text-sm font-medium bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              ✨ Powered by Advanced AI
            </motion.span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1]"
            variants={itemVariants}
          >
            <motion.span
              className="bg-gradient-to-r from-slate-800 via-blue-700 to-cyan-700 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
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

        {/* Trust indicators */}
        <motion.div className="flex items-center gap-6 pt-4" variants={itemVariants}>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {["from-blue-500 to-cyan-500", "from-emerald-500 to-teal-500", "from-cyan-500 to-blue-500"].map(
                (gradient, index) => (
                  <motion.div
                    key={index}
                    className={`w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br ${gradient} shadow-lg`}
                    initial={{ scale: 0, x: -20 }}
                    animate={{ scale: 1, x: 0 }}
                    transition={{
                      delay: 2 + index * 0.1,
                      type: "spring",
                      stiffness: 500,
                      damping: 15,
                    }}
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                  />
                ),
              )}
            </div>
            <motion.span
              className="text-sm text-slate-600 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.3 }}
            >
              10k+ successful placements
            </motion.span>
          </div>
        </motion.div>
      </motion.div>

      {/* Right side - Illustration */}
      <motion.div className="relative lg:h-[600px] flex items-center justify-center" variants={itemVariants}>
        {/* Main illustration container */}
        <div className="relative w-full max-w-lg">
          {/* Enhanced background glow */}
          <motion.div
            className="absolute inset-0 rounded-3xl blur-2xl transform rotate-6 opacity-30"
            style={{
              background:
                "linear-gradient(135deg, rgba(14, 165, 233, 0.3) 0%, rgba(6, 182, 212, 0.4) 50%, rgba(34, 197, 94, 0.2) 100%)",
            }}
            animate={{
              rotate: [6, 3, 6],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Main illustration placeholder */}
          <motion.div
            className="relative rounded-3xl p-8 shadow-2xl border border-white/50 backdrop-blur-sm"
            style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%)",
            }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 25px 50px rgba(14, 165, 233, 0.15)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.div
              animate={{
                y: [-10, 10, -10],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
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

          {/* Enhanced floating job cards */}
          {[
            { position: "-top-4 -left-4", gradient: "from-blue-500 to-cyan-500", rotation: [-6, -3, -6] },
            { position: "-bottom-4 -right-4", gradient: "from-emerald-500 to-teal-500", rotation: [6, 3, 6] },
            { position: "top-1/4 -right-8", gradient: "from-cyan-500 to-blue-500", rotation: [3, -3, 3] },
          ].map((card, index) => (
            <motion.div
              key={index}
              className={`absolute ${card.position} bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-xl border border-white/50`}
              variants={floatingVariants}
              animate={{
                y: [-10, 10, -10],
                rotate: card.rotation,
              }}
              transition={{
                y: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: index * 0.5 },
                rotate: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              }}
              whileHover={{
                rotate: 0,
                scale: 1.1,
                boxShadow: "0 15px 30px rgba(14, 165, 233, 0.2)",
              }}
            >
              <div className="flex items-center gap-2">
                <motion.div
                  className={`w-8 h-8 bg-gradient-to-br ${card.gradient} rounded-lg shadow-lg`}
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8 - index * 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                <div>
                  <div className="w-16 h-2 bg-slate-200 rounded"></div>
                  <div className="w-12 h-1.5 bg-slate-100 rounded mt-1"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
