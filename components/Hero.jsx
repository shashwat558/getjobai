"use client"

import { motion } from "framer-motion"
import { useState, useRef } from "react"
import HeroContent from "./heroContent"
import SearchSection from "./searchSection"
import ResumeUploadSection from "./ResumeUpload"
import JobRecommendationsSection from "./job-reccomendation"
import Feedback from "./Feedback";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)
  const [predictedRole, setPredictedRole] = useState("");

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
        {/* Hero Content */}
        <HeroContent itemVariants={itemVariants} floatingVariants={floatingVariants} />

        {/* Action Section Heading */}
        <motion.div className="text-center mb-10 mt-8" variants={itemVariants}>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-700 bg-clip-text text-transparent">
            Find Your Perfect Role
          </h2>
          <p className="text-slate-600 mt-2">Search for jobs or upload your resume to get matched</p>
        </motion.div>

        {/* Search Section */}
        <SearchSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} itemVariants={itemVariants} />

        {/* Resume Upload Section */}
        <ResumeUploadSection
          uploadedFile={uploadedFile}
          setUploadedFile={setUploadedFile}
          isDragOver={isDragOver}
          setIsDragOver={setIsDragOver}
          uploadProgress={uploadProgress}
          setUploadProgress={setUploadProgress}
          isUploading={isUploading}
          setIsUploading={setIsUploading}
          fileInputRef={fileInputRef}
          itemVariants={itemVariants}
          setPredictedRole={setPredictedRole}
          predictedRole={predictedRole}
        />
        

        {/* Job Recommendations Section */}
        <JobRecommendationsSection uploadedFile={uploadedFile} itemVariants={itemVariants} />

        <Feedback isUploaded={uploadedFile}/>
      </div>
    </motion.section>
  )
}
