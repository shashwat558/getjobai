

"use client"

import { Button } from "@/components/ui/button"
import { Upload, FileText, X, Check } from "lucide-react"
import { motion } from "framer-motion"




export default function ResumeUploadSection({
  uploadedFile,
  setUploadedFile,
  isDragOver,
  setIsDragOver,
  uploadProgress,
  setUploadProgress,
  isUploading,
  setIsUploading,
  fileInputRef,
  itemVariants,
}) {
  const handleFileUpload = (file) => {
    setUploadedFile(file)
    uploadFile(file)
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
  const uploadFile = async (selectedFile) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.set("resume", selectedFile);

    try {
      const response = await fetch("/api/analyzer", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const result = await response.json();
      setPredictedRole(result.role);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to analyze resume.");
    } finally {
      setIsLoading(false);
    }
  };

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
                      background: "linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(16, 185, 129, 0.3) 100%)",
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
  )
}
