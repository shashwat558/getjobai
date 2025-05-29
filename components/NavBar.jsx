"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-toggle";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-white shadow-sm" : "bg-white"
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">JobFinder</span>
        </Link>
        <ModeToggle />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/jobs" className="text-base font-medium text-gray-700 hover:text-primary transition-colors">
            Jobs
          </Link>
          <Link href="/about" className="text-base font-medium text-gray-700 hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-base font-medium text-gray-700 hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>

        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t py-4">
          <nav className="flex flex-col space-y-4 px-4">
            
            <Link 
              href="/jobs" 
              className="text-base font-medium text-gray-700 hover:text-primary transition-colors p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Jobs
            </Link>
            <Link 
              href="/about" 
              className="text-base font-medium text-gray-700 hover:text-primary transition-colors p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="text-base font-medium text-gray-700 hover:text-primary transition-colors p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;