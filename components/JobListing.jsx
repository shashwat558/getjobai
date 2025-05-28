"use client";

import { useState, useEffect } from "react";
import { MapPin, Building2, Clock, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";


const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get jobs
    const fetchJobs = async () => {
      setIsLoading(true);
      
      // Simulating network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Sample job data
      const sampleJobs = [
        {
          id: "1",
          title: "Senior Frontend Developer",
          company: "TechCorp Inc.",
          location: "San Francisco, CA (Remote)",
          description: "We're looking for a senior frontend developer with experience in React, TypeScript, and modern CSS frameworks to join our product team.",
          salary: "$120K - $150K",
          type: "Full-time",
          postedAt: "2 days ago",
          logo: "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
          id: "2",
          title: "UX/UI Designer",
          company: "DesignHub",
          location: "New York, NY",
          description: "Join our creative team to design beautiful and functional user interfaces for our clients across various industries.",
          salary: "$90K - $120K",
          type: "Full-time",
          postedAt: "1 week ago",
          logo: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
          id: "3",
          title: "Data Scientist",
          company: "AnalyticsPro",
          location: "Chicago, IL (Hybrid)",
          description: "We're seeking a talented data scientist to help us extract insights from complex datasets and build predictive models.",
          salary: "$110K - $140K",
          type: "Full-time",
          postedAt: "3 days ago",
          logo: "https://images.pexels.com/photos/936137/pexels-photo-936137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
          id: "4",
          title: "DevOps Engineer",
          company: "CloudTech Systems",
          location: "Austin, TX (Remote)",
          description: "Looking for a DevOps engineer to help us build and maintain our cloud infrastructure and CI/CD pipelines.",
          salary: "$115K - $145K",
          type: "Contract",
          postedAt: "Just now",
          logo: "https://images.pexels.com/photos/1933900/pexels-photo-1933900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
          id: "5",
          title: "Product Manager",
          company: "InnovateCo",
          location: "Seattle, WA",
          description: "Join our team to lead product development from conception to launch, working closely with design and engineering teams.",
          salary: "$125K - $160K",
          type: "Full-time",
          postedAt: "5 days ago",
          logo: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
          id: "6",
          title: "Backend Developer",
          company: "ServerStack",
          location: "Boston, MA (Remote)",
          description: "We're looking for a backend developer with experience in Node.js, Express, and SQL/NoSQL databases.",
          salary: "$100K - $135K",
          type: "Full-time",
          postedAt: "1 week ago",
          logo: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
      ];
      
      setJobs(sampleJobs);
      setIsLoading(false);
    };
    
    fetchJobs();
  }, []);

  if (isLoading) {
    return (
      <section className="w-full py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Latest Job Openings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="pb-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Latest Job Openings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <Card 
              key={job.id} 
              className="overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="mb-1 text-xl">{job.title}</CardTitle>
                    <div className="flex items-center text-gray-600 mb-1">
                      <Building2 className="h-4 w-4 mr-1" />
                      <span className="text-sm">{job.company}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{job.location}</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-md overflow-hidden">
                    <img 
                      src={job.logo} 
                      alt={job.company} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                  {job.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                    {job.salary}
                  </Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
                    <Briefcase className="h-3 w-3 mr-1" />
                    {job.type}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{job.postedAt}</span>
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                  Apply Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button variant="outline" className="mx-auto">
            View More Jobs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JobListings;