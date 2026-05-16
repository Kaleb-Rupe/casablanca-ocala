"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useBreakpoint } from "@/hooks/useMediaQuery";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);
const HERO_IMAGE_URL =
  "https://xfrcwgafqy20sjqa.public.blob.vercel-storage.com/images/hero-image.png";

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
      <div className="relative w-full" style={{ minHeight: heroHeight }}>
        <div className="absolute inset-0 overflow-hidden rounded-3xl my-5">
          <Image
            src={HERO_IMAGE_URL}
            alt="Casablanca Ocala Property"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div
          className={`absolute bottom-12 ${
            isMobile ? "text-center left-0 right-0" : "text-left left-4"
          } md:bottom-12 md:left-10 w-full md:max-w-4xl px-4 md:px-0`}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="hero-subtitle">
              Experience Luxury Living in Ocala, Florida
            </p>
            <h1 className="hero-title">Your Perfect Stay</h1>
          </motion.div>
        </div>
      </div>

      <div className="relative -mt-7 px-4 md:hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <a
            href="#book"
            className="group flex w-full items-center justify-center gap-2 bg-coral text-white font-semibold px-6 py-4 rounded-full shadow-lg shadow-coral/30 hover:bg-opacity-95 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
          >
            Plan your stay
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
