"use client"



import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, Search, FileText, X, Check } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useState, useRef } from "react"

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)

  const containerVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: {
      y: 50,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const floatingVariants = {
    hidden: {
      scale: 0,
      rotate: -180,
      opacity: 0,
    },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "backOut",
        delay: 1.5,
      },
    },
  }

  const handleFileUpload = (file) => {
    setUploadedFile(file)
    const uploadFile = async () => {
      const formData = new FormData();
      formData.append("resume", resume);
      try {
        const response = await fetch("/api/analyzer", {
          method: "POST",
          body: formData
        })
      } catch (error) {
        
      }
    }
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0 && files[0].type === "application/pdf") {
      handleFileUpload(files[0])
    }
  }

  const handleFileSelect = (e) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const removeFile = () => {
    setUploadedFile(null)
    setUploadProgress(0)
    setIsUploading(false)
  }

  return (
    <motion.section
      className="min-h-screen relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(14, 165, 233, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
          linear-gradient(135deg, 
            rgba(248, 250, 252, 0.9) 0%, 
            rgba(241, 245, 249, 0.95) 25%, 
            rgba(226, 232, 240, 0.9) 50%, 
            rgba(241, 245, 249, 0.95) 75%, 
            rgba(248, 250, 252, 0.9) 100%
          )
        `,
      }}
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary gradient orbs */}
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{
            background: "linear-gradient(135deg, rgba(14, 165, 233, 0.4) 0%, rgba(6, 182, 212, 0.3) 100%)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [-20, 20, -20],
            y: [-20, 20, -20],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-25"
          style={{
            background: "linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(16, 185, 129, 0.4) 100%)",
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.15, 0.3],
            x: [20, -20, 20],
            y: [20, -20, 20],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Secondary accent orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-2xl opacity-20"
          style={{
            background: "linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(14, 165, 233, 0.2) 100%)",
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 4,
          }}
        />

        <motion.div
          className="absolute bottom-1/3 right-1/3 w-48 h-48 rounded-full blur-2xl opacity-15"
          style={{
            background: "linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(5, 150, 105, 0.3) 100%)",
          }}
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.2, 0.05, 0.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 6,
          }}
        />

        {/* Geometric accent elements */}
        <motion.div
          className="absolute top-1/2 right-1/4 w-32 h-32 opacity-10"
          style={{
            background: "linear-gradient(45deg, rgba(14, 165, 233, 0.3) 0%, transparent 100%)",
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute top-1/3 left-1/2 w-24 h-24 opacity-8"
          style={{
            background: "linear-gradient(45deg, rgba(34, 197, 94, 0.25) 0%, transparent 100%)",
            clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
          }}
          animate={{
            rotate: [360, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: 3,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8">
        {/* Original Hero Content */}
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

        {/* Action Section Heading */}
        <motion.div className="text-center mb-10 mt-8" variants={itemVariants}>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-700 bg-clip-text text-transparent">
            Find Your Perfect Role
          </h2>
          <p className="text-slate-600 mt-2">Search for jobs or upload your resume to get matched</p>
        </motion.div>

        {/* Enhanced Search Bar */}
        <motion.div className="mb-12" variants={itemVariants}>
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div
                className="absolute inset-0 rounded-2xl blur-xl opacity-50"
                style={{
                  background: "linear-gradient(135deg, rgba(14, 165, 233, 0.3) 0%, rgba(6, 182, 212, 0.2) 100%)",
                }}
              />
              <div
                className="relative rounded-2xl p-2 shadow-2xl border border-white/50 backdrop-blur-sm"
                style={{
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)",
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6" />
                    <Input
                      type="text"
                      placeholder="Search for jobs, companies, or skills..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-14 pl-14 pr-4 text-lg border-0 bg-transparent focus:ring-0 focus:outline-none placeholder:text-slate-400"
                    />
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      className="h-12 px-8 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl font-semibold shadow-lg"
                    >
                      Search Jobs
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Resume Uploader */}
        <motion.div className="mb-16" variants={itemVariants}>
          <div className="max-w-2xl mx-auto">
            <motion.div
              className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 backdrop-blur-sm ${
                isDragOver ? "border-blue-400" : uploadedFile ? "border-emerald-400" : "border-slate-300"
              }`}
              style={{
                background: isDragOver
                  ? "linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%)"
                  : uploadedFile
                    ? "linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)"
                    : "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 0.6) 100%)",
              }}
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault()
                setIsDragOver(true)
              }}
              onDragLeave={() => setIsDragOver(false)}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileSelect} className="hidden" />

              {!uploadedFile ? (
                <div className="text-center">
                  <motion.div
                    animate={{
                      y: [-5, 5, -5],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">Upload Your Resume</h3>
                  <p className="text-slate-500 mb-6">Drag and drop your PDF resume here, or click to browse</p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      size="lg"
                      className="h-12 px-6 rounded-xl border-2 hover:border-blue-400 hover:bg-blue-50 bg-white/80 backdrop-blur-sm"
                    >
                      <FileText className="w-5 h-5 mr-2" />
                      Choose File
                    </Button>
                  </motion.div>
                </div>
              ) : (
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(16, 185, 129, 0.3) 100%)",
                        }}
                      >
                        {isUploading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          >
                            <Upload className="w-6 h-6 text-emerald-600" />
                          </motion.div>
                        ) : (
                          <Check className="w-6 h-6 text-emerald-600" />
                        )}
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-slate-700">{uploadedFile.name}</p>
                        <p className="text-sm text-slate-500">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      <motion.button
                        onClick={removeFile}
                        className="ml-auto p-2 hover:bg-red-100 rounded-full transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="w-5 h-5 text-red-500" />
                      </motion.button>
                    </div>

                    {isUploading && (
                      <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
                        <motion.div
                          className="h-2 rounded-full"
                          style={{
                            background: "linear-gradient(90deg, rgba(14, 165, 233, 1) 0%, rgba(34, 197, 94, 1) 100%)",
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${uploadProgress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    )}

                    {!isUploading && <p className="text-emerald-600 font-medium">✓ Resume uploaded successfully!</p>}
                  </motion.div>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
