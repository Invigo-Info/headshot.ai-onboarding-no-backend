"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface FloatingCtaButtonProps {
  text?: string;
  href?: string;
  triggerHeight?: number;
}

export default function FloatingCtaButton({
  text = "Create My Headshots Now",
  href = "/generate/one-time/professional-headshots?step=gender",
  triggerHeight = 400,
}: FloatingCtaButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > triggerHeight);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Check initial scroll position
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [triggerHeight]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeIn",
          }}
          className="fixed bottom-0 w-full left-0 right-0 z-50 sm:hidden bg-white pt-4 border-t"
        >
          <Button
            size="lg"
            className="w-[90%] mx-auto flex items-center justify-center bg-blue-500 mb-4 hover:bg-blue-600 text-white font-semibold text-sm px-6 py-6 shadow-lg rounded-md"
            asChild
          >
            <Link href={href} className="flex items-center justify-center">
              {text}
              <ArrowRight className="ml-2 size-5" />
            </Link>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
