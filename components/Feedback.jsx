"use client"
import { useFeedBack } from '@/store/useJobs';
import React from 'react';

const Feedback = ({ isUploaded }) => {
  const { feedback } = useFeedBack();
  
  if (feedback === null) return;
  if (!isUploaded) return;

  // Dynamic color based on score
  const getScoreColor = (score) => {
    if (score >= 80) return 'bg-gradient-to-r from-green-500 to-emerald-600';
    if (score >= 60) return 'bg-gradient-to-r from-yellow-500 to-orange-500';
    return 'bg-gradient-to-r from-red-500 to-pink-600';
  };

  const getScoreTextColor = (score) => {
    if (score >= 80) return 'text-green-700';
    if (score >= 60) return 'text-orange-700';
    return 'text-red-700';
  };

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-xl border border-blue-100 p-8 w-full max-w-2xl mx-auto mt-8 transform hover:scale-[1.02] transition-all duration-300">
     
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-2xl">📋</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Resume Analysis</h2>
          <p className="text-gray-500 text-sm">AI-powered feedback and insights</p>
        </div>
      </div>

      
      <div className="mb-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <p className="text-gray-700 font-medium">Overall Score</p>
          <span className={`text-2xl font-bold ${getScoreTextColor(feedback.score)}`}>
            {feedback.score}/100
          </span>
        </div>
        
        <div className="relative w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
          <div
            className={`${getScoreColor(feedback.score)} h-6 rounded-full transition-all duration-1000 ease-out shadow-lg relative`}
            style={{ width: `${feedback.score}%` }}
          >
            <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Needs Work</span>
          <span>Good</span>
          <span>Excellent</span>
        </div>
      </div>

      <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-lg">💡</span>
          </div>
          <p className="text-gray-700 font-semibold text-lg">Improvement Suggestions</p>
        </div>
        
        <div className="space-y-3">
          {feedback.tips.map((tip, index) => (
            <div 
              key={index}
              className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-200"
            >
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">{index + 1}</span>
              </div>
              <p className="text-gray-700 leading-relaxed flex-1">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-400">
          💼 Keep improving to land your dream job!
        </p>
      </div>
    </div>
  );
};

export default Feedback;