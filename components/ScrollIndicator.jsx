"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ScrollIndicator = () => {
  const [showIndicator, setShowIndicator] = useState(true);
  const lastState = useRef(true);

  useEffect(() => {
    const handleScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 150;

      // Only update state if changed
      if (atBottom !== !lastState.current) {
        setShowIndicator(!atBottom);
        lastState.current = !atBottom;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial check in case user is already scrolled
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {showIndicator && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
        >
          <ChevronDown className="w-8 h-8 text-gray-700 animate-bounce" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollIndicator;
