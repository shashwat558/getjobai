"use client";

import { useState } from "react";
import { Upload, FileText, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const ResumeUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [predictedRole, setPredictedRole] = useState(null);


  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

const handleFile = (file) => {
  const fileType = file.type;

  if (
    fileType !== "application/pdf" &&
    fileType !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    alert("Please upload a PDF or DOCX file");
    return;
  }

  setFile(file);
  uploadFile(file)

  
  
};

const uploadFile = async (selectedFile) => {
    setIsLoading(true);
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

 

  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2">Upload Your Resume</h2>
          <p className="text-center mb-6">
            We'll match you with jobs that fit your skills and experience
          </p>
          
          <div 
            className={cn(
              "border-2 border-dashed rounded-lg p-8 transition-all duration-200 text-center",
              isDragging ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary/50",
              isLoading ? "opacity-75 pointer-events-none" : ""
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {!file && !isLoading && (
              <>
                <Upload className="h-10 w-10 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">
                  Drag & drop your resume here, or
                </p>
                <div>
                  <input
                    type="file"
                    id="resume-upload"
                    className="hidden"
                    accept=".pdf,.docx"
                    onChange={handleFileInput}
                  />
                  <Button
                    onClick={() => document.getElementById("resume-upload")?.click()}
                    variant="outline"
                    className="mx-auto"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Browse Files
                  </Button>
                </div>
                <p className="text-xs mt-4">
                  Supported formats: PDF, DOCX (Max 5MB)
                </p>
              </>
            )}
            
            {isLoading && (
              <div className="py-6">
                <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
                <p className="text-gray-600">Analyzing your resume...</p>
              </div>
            )}
            
            {file && !isLoading && (
              <div className="py-4">
                <FileText className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="font-medium mb-1">{file.name}</p>
                <p className="text-sm text-gray-500 mb-4">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
                
                {predictedRole && (
                  <div className=" text-green-800 p-3 rounded-md mb-4">
                    <p className="font-medium">Predicted Role: {predictedRole}</p>
                    <p className="text-sm">We found {Math.floor(Math.random() * 50) + 10} matching jobs</p>
                  </div>
                )}
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setFile(null);
                    setPredictedRole(null);
                  }}
                >
                  Upload a different resume
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeUpload;