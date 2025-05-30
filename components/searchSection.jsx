"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { motion } from "framer-motion"



export default function SearchSection({ searchQuery, setSearchQuery, itemVariants }) {
  return (
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
  )
}
