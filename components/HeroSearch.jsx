"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const HeroSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        
        <div className="inline-block px-4 py-1 mb-6 text-sm font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300 rounded-full">
          🚀 10,000+ jobs listed
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
          Find Your Next Opportunity
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
          Search for roles that match your skills, interests, and experience.
        </p>

        {/* Search */}
        <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto">
          <Input
            type="text"
            placeholder="Search by role, company, or location"
            className="pl-12 pr-40 py-5 text-base bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:placeholder:text-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          <Button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md"
          >
            Search
          </Button>
        </form>
      </div>
    </section>
  );
};

export default HeroSearch;
