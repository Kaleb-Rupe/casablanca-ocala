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
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-tr from-black/55 via-black/15 to-transparent"
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
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                aria-hidden="true"
                className="hidden md:block h-px w-10 bg-coral"
              />
              <p className="hero-subtitle">
                Experience Luxury Living in Ocala, Florida
              </p>
            </div>
            <h1 className="hero-title">Your Perfect Stay</h1>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="hidden md:flex absolute bottom-10 right-10 items-center gap-3 text-white/70 text-xs tracking-[0.3em] uppercase"
        >
          <span>Scroll</span>
          <motion.span
            aria-hidden="true"
            className="block h-10 w-px bg-white/40 origin-top"
            animate={{ scaleY: [0.3, 1, 0.3] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
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
