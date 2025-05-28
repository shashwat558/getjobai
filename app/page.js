import HeroSection from "@/components/Hero";
import HeroSearch from "@/components/HeroSearch";
import JobListings from "@/components/JobListing";
import PopularSearches from "@/components/PopoularSearch";
import ResumeUpload from "@/components/ResumeUpload";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSearch />
      <ResumeUpload />
      <JobListings />
      <PopularSearches />
    </div>
  );
}
