"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Building, ArrowRight, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

 
export default function JobCard({ job, index }) {
  
  const matchPercentage = Math.round(job.similarity * 100)

  
  const extractedSkills =
    job.job_description
      .match(/Skills: ([^]+?)(?:Show more|$)/i)?.[1]
      .split(",")
      .map((skill) => skill.trim()) || []
  const skills = job.skills || extractedSkills

  
  const truncatedDescription =
    job.job_description
      .replace(/Skills: [^]+?(?:Show more|$)/i, "")
      .replace(/Show less/i, "")
      .trim()
      .substring(0, 150) + (job.job_description.length > 150 ? "..." : "")

  
  const getMatchColor = (match) => {
    if (match >= 90) return "rgba(34, 197, 94, 1) 0%, rgba(16, 185, 129, 1) 100%"
    if (match >= 80) return "rgba(14, 165, 233, 1) 0%, rgba(6, 182, 212, 1) 100%"
    if (match >= 70) return "rgba(251, 146, 60, 1) 0%, rgba(245, 101, 101, 1) 100%"
    return "rgba(156, 163, 175, 1) 0%, rgba(107, 114, 128, 1) 100%"
  }

  
  const getCompanyLogoGradient = (companyName) => {
    const gradients = [
      "from-blue-500 to-cyan-500",
      "from-emerald-500 to-teal-500",
      "from-cyan-500 to-blue-500",
      "from-teal-500 to-emerald-500",
      "from-blue-600 to-indigo-600",
      "from-green-500 to-emerald-500",
    ]

    
    const hash = companyName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return gradients[hash % gradients.length]
  }

  return (
    <motion.div
      className="relative rounded-2xl p-6 border border-white/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300"
      style={{
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%)",
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 25px 50px rgba(14, 165, 233, 0.15)",
      }}
    >
      {/* Match Score Badge */}
      <motion.div
        className="absolute -top-3 -right-3 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${getMatchColor(matchPercentage)})`,
        }}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 500, damping: 15 }}
      >
        {matchPercentage}%
      </motion.div>

      {/* Source Badge */}
      <div className="absolute top-6 right-6 px-2 py-1 bg-slate-100 rounded-md text-xs font-medium text-slate-600 flex items-center gap-1">
        <ExternalLink className="w-3 h-3" />
        {job.source}
      </div>

      {/* Company Logo */}
      <div className="flex items-start gap-4 mb-4">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getCompanyLogoGradient(job.company_name)} flex items-center justify-center shadow-lg`}
        >
          <Building className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 pr-16">
          <h3 className="font-bold text-lg text-slate-800 mb-1 line-clamp-2">{job.job_title}</h3>
          <p className="text-slate-600 font-medium">{job.company_name}</p>
        </div>
      </div>

      {/* Job Description */}
      <div className="mb-4">
        <p className="text-sm text-slate-600 line-clamp-3">{truncatedDescription}</p>
      </div>

      {/* Job Details */}
      <div className="flex items-center gap-2 text-slate-600 mb-4">
        <MapPin className="w-4 h-4 flex-shrink-0" />
        <span className="text-sm truncate">{job.job_location}</span>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 5).map((skill, skillIndex) => (
            <span key={skillIndex} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
              {skill}
            </span>
          ))}
          {skills.length > 5 && (
            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
              +{skills.length - 5} more
            </span>
          )}
        </div>
      </div>

      {/* Apply Button */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link href={job.apply_link} target="_blank" rel="noopener noreferrer" className="block w-full">
          <Button
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl font-semibold shadow-lg group"
            size="lg"
          >
            Apply on {job.source}
            <motion.div
              className="ml-2"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  )
}