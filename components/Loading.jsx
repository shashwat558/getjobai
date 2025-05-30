import React, { useState, useEffect } from 'react';

const FancyLoading = ({ isLoading = true }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const loadingSteps = [
    { 
      id: 1, 
      title: "Uploading Resume", 
      description: "Securely uploading your document...",
      icon: "📄",
      duration: 2000
    },
    { 
      id: 2, 
      title: "Analyzing Content", 
      description: "AI scanning your resume structure...",
      icon: "🔍",
      duration: 3000
    },
    { 
      id: 3, 
      title: "Processing Skills", 
      description: "Evaluating your qualifications...",
      icon: "⚡",
      duration: 2500
    },
    { 
      id: 4, 
      title: "Generating Feedback", 
      description: "Creating personalized recommendations...",
      icon: "🎯",
      duration: 2000
    },
    { 
      id: 5, 
      title: "Finalizing Report", 
      description: "Preparing your detailed analysis...",
      icon: "✨",
      duration: 1500
    }
  ];

  useEffect(() => {
    if (!isLoading) return;

    let stepInterval;
    let progressInterval;
    
    const startStepProcess = () => {
      let stepIndex = 0;
      let stepProgress = 0;
      
      const updateProgress = () => {
        progressInterval = setInterval(() => {
          stepProgress += 2;
          setProgress(stepProgress);
          
          if (stepProgress >= 100) {
            stepProgress = 0;
            stepIndex += 1;
            
            if (stepIndex < loadingSteps.length) {
              setCurrentStep(stepIndex);
            } else {
              clearInterval(progressInterval);
              
              setTimeout(() => {
                setCurrentStep(0);
                setProgress(0);
                startStepProcess();
              }, 1000);
            }
          }
        }, loadingSteps[stepIndex]?.duration / 50 || 40);
      };
      
      updateProgress();
    };

    startStepProcess();

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md mx-4 relative overflow-hidden">
       
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-70"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
        
        <div className="relative z-10">
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg animate-bounce">
              <span className="text-2xl">🚀</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Processing Your Resume</h2>
            <p className="text-gray-600">Our AI is working its magic...</p>
          </div>

         
          <div className="mb-6">
            <div className="flex items-center gap-4 p-4 bg-white/80 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl animate-pulse">
                {loadingSteps[currentStep]?.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-lg">
                  {loadingSteps[currentStep]?.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {loadingSteps[currentStep]?.description}
                </p>
              </div>
            </div>
          </div>

          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Progress</span>
              <span className="text-sm font-bold text-blue-600">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
              <div 
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse"></div>
                <div className="absolute right-0 top-0 w-2 h-3 bg-white/50 animate-ping"></div>
              </div>
            </div>
          </div>

          
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Process Steps:</h4>
            {loadingSteps.map((step, index) => (
              <div 
                key={step.id}
                className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-300 ${
                  index === currentStep 
                    ? 'bg-blue-100 border-l-4 border-blue-500 transform scale-105' 
                    : index < currentStep 
                    ? 'bg-green-50 border-l-4 border-green-500' 
                    : 'bg-gray-50 border-l-4 border-gray-200'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                  index === currentStep 
                    ? 'bg-blue-500 text-white animate-pulse' 
                    : index < currentStep 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {index < currentStep ? '✓' : index === currentStep ? step.icon : step.icon}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    index === currentStep ? 'text-blue-800' : 
                    index < currentStep ? 'text-green-800' : 'text-gray-600'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index === currentStep && (
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          
          <div className="flex justify-center mt-6 gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FancyLoading;