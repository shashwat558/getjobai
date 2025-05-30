"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Clock, DollarSign, Building, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"


const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $160k",
    match: 95,
    logo: "from-blue-500 to-cyan-500",
    skills: ["React", "TypeScript", "Next.js"],
    posted: "2 days ago",
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "Remote",
    type: "Full-time",
    salary: "$100k - $140k",
    match: 88,
    logo: "from-emerald-500 to-teal-500",
    skills: ["Node.js", "React", "PostgreSQL"],
    posted: "1 day ago",
  },
  {
    id: 3,
    title: "React Developer",
    company: "Digital Agency",
    location: "New York, NY",
    type: "Contract",
    salary: "$80k - $110k",
    match: 82,
    logo: "from-cyan-500 to-blue-500",
    skills: ["React", "JavaScript", "CSS"],
    posted: "3 days ago",
  },
]

export default function JobRecommendationsSection({ uploadedFile, itemVariants }) {
  if (!uploadedFile) return null

  return (
    <motion.div className="mb-16" variants={itemVariants}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div className="text-center mb-10" variants={itemVariants}>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-700 bg-clip-text text-transparent mb-4">
            Jobs Matched to Your Resume
          </h2>
          <p className="text-slate-600 text-lg">
            Based on your skills and experience, here are the top job recommendations
          </p>
        </motion.div>

        {/* Job Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockJobs.map((job, index) => (
            <motion.div
              key={job.id}
              className="relative rounded-2xl p-6 border border-white/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%)",
              }}
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(14, 165, 233, 0.15)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Match Score Badge */}
              <motion.div
                className="absolute -top-3 -right-3 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${
                    job.match >= 90
                      ? "rgba(34, 197, 94, 1) 0%, rgba(16, 185, 129, 1) 100%"
                      : job.match >= 80
                        ? "rgba(14, 165, 233, 1) 0%, rgba(6, 182, 212, 1) 100%"
                        : "rgba(251, 146, 60, 1) 0%, rgba(245, 101, 101, 1) 100%"
                  }`,
                }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 500, damping: 15 }}
              >
                {job.match}%
              </motion.div>

              {/* Company Logo */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${job.logo} flex items-center justify-center shadow-lg`}
                >
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-slate-800 mb-1">{job.title}</h3>
                  <p className="text-slate-600 font-medium">{job.company}</p>
                </div>
              </div>

              {/* Job Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">
                    {job.type} • {job.posted}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm font-semibold">{job.salary}</span>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Apply Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl font-semibold shadow-lg group"
                  size="lg"
                >
                  Apply Now
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div className="text-center mt-8" variants={itemVariants}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 bg-white/80 backdrop-blur-sm font-semibold"
            >
              View All Recommendations
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
