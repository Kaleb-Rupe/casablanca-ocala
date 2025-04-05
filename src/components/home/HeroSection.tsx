"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SearchBar from "@/components/search/SearchBar";
import { useBreakpoint } from "@/hooks/useMediaQuery";

export default function HeroSection() {
  const isMobile = useBreakpoint();

  return (
    <section className="relative w-full">
      {/* Hero Container */}
      <div className="relative h-[45vh] md:h-[90vh] w-full">
        <div className="absolute inset-0 overflow-hidden rounded-3xl my-5">
          <Image
            src="/images/hero-image.jpg"
            alt="Casablanca Ocala Property"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
          </div>
        </div>

        {/* Text Content */}
        <div
          className={`absolute bottom-16 ${
            isMobile ? "text-center left-0 right-0" : "text-left left-4"
          } md:bottom-36 md:left-10 w-full md:max-w-4xl px-4 md:px-0`}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 md:mb-8"
          >
            <p className="hero-subtitle">
              Experience Luxury Living in Ocala, Florida
            </p>
            <h1 className="hero-title mb-2 md:mb-4">Your Perfect Stay</h1>
          </motion.div>
        </div>
      </div>

      {/* Search Bar Container */}
      <div className="relative -mt-16 px-4 md:absolute md:bottom-14 md:left-8 md:w-[93%] lg:w-[80%] xl:w-[70%] 2xl:w-[60%] md:mt-0 md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full"
        >
          <SearchBar />
        </motion.div>
      </div>
    </section>
  );
}
