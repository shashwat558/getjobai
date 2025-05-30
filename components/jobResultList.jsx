"ue client"
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";




export default function JobResultsList({ jobs, isVisible }) {
  if (!jobs || !isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 right-0 mt-2 z-10"
    >
      <div
        className="relative rounded-xl overflow-hidden border border-white/50 shadow-xl backdrop-blur-sm"
        style={{
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)",
        }}
      >
        <div className="max-h-96 overflow-y-auto p-2">
          {jobs.length === 0 ? (
            <div className="p-4 text-center text-slate-500">No jobs found matching your search</div>
          ) : (
            <div className="space-y-2">
              {jobs.map((job, index) => (
                <JobCard key={index} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function JobCard({ job }) {
  return (
    <motion.a
      href={job.apply_link}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 rounded-lg hover:bg-white/80 transition-colors"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg text-slate-900">{job.job_title}</h3>
          <p className="text-slate-600">{job.company_name}</p>
        </div>
        <ExternalLink className="flex-shrink-0 w-5 h-5 text-blue-500" />
      </div>
    </motion.a>
  );
}