"use client";

import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const PopularSearches = () => {
  const [popularRoles, setPopularRoles] = useState([
    "React Developer",
    "Data Analyst",
    "Product Manager",
    "UX Designer",
    "DevOps Engineer",
    "Marketing Specialist",
    "Frontend Developer",
    "Backend Engineer",
    "AI/ML Engineer",
    "Technical Writer",
    "Sales Representative",
    "Customer Success"
  ]);

  const handleRoleClick = (role) => {
    console.log(`Searching for: ${role}`);
    // In a real app, this would trigger a search
  };

  return (
    <section className="w-full py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Popular Searches</h2>
        
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {popularRoles.map((role, index) => (
            <Badge
              key={index}
              variant="outline"
              className="px-4 py-2 text-base font-medium cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
              onClick={() => handleRoleClick(role)}
            >
              {role}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularSearches;