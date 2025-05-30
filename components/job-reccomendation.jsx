

import { useJobs } from "@/store/useJobs"
import JobCard from "./job-card"
import {motion} from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
export default function JobRecommendationsSection({ uploadedFile, itemVariants }) {
  const { jobs } = useJobs()

  if (!uploadedFile || !jobs || jobs.length === 0) return null

  return (
    <motion.div className="mb-16" variants={itemVariants}>
      <div className="max-w-6xl mx-auto">
        
        <motion.div className="text-center mb-10" variants={itemVariants}>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-700 bg-clip-text text-transparent mb-4">
            Jobs Matched to Your Resume
          </h2>
          <p className="text-slate-600 text-lg">
            Based on your skills and experience, here are the top job recommendations
          </p>
        </motion.div>

        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <JobCard key={job.id} job={job} index={index} />
          ))}
        </div>

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
