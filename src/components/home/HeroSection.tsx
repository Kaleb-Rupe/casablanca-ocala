"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SearchBar from "@/components/search/SearchBar";
import { useBreakpoint } from "@/hooks/useMediaQuery";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);
const HERO_IMAGE_URL =
  "https://xfrcwgafqy20sjqa.public.blob.vercel-storage.com/images/hero-image.jpg";

export default function HeroSection() {
  const { isMobile } = useBreakpoint();
  const heroHeight = isMobile
    ? "var(--hero-mobile-height)"
    : "var(--hero-desktop-height)";

  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;
    let prevWidth = window.innerWidth;

    const setViewportHeights = () => {
      const viewportHeight = window.innerHeight;
      const mobilePx = clamp(viewportHeight * 0.65, 420, 720);
      const desktopPx = clamp(viewportHeight * 0.9, 560, 980);

      root.style.setProperty("--hero-mobile-height", `${mobilePx}px`);
      root.style.setProperty("--hero-desktop-height", `${desktopPx}px`);
    };

    setViewportHeights();

    const handleResize = () => {
      const width = window.innerWidth;
      if (Math.abs(width - prevWidth) > 80) {
        prevWidth = width;
        setViewportHeights();
      }
    };

    const orientationMedia = window.matchMedia
      ? window.matchMedia("(orientation: portrait)")
      : null;
    const handleOrientation = () => setViewportHeights();

    window.addEventListener("resize", handleResize);
    orientationMedia?.addEventListener("change", handleOrientation);

    return () => {
      window.removeEventListener("resize", handleResize);
      orientationMedia?.removeEventListener("change", handleOrientation);
    };
  }, []);

  return (
    <section className="relative w-full">
      {/* Hero Container */}
      <div className="relative w-full" style={{ minHeight: heroHeight }}>
        <div className="absolute inset-0 overflow-hidden rounded-3xl my-5">
          <Image
            src={HERO_IMAGE_URL}
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
