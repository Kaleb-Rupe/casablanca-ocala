"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Images } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Header() {
  const [isPinned, setIsPinned] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const headerOffsetRef = useRef("0px");
  const rafRef = useRef<number | null>(null);
  const pinnedStateRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateHeaderOffset = (value: string) => {
      if (headerOffsetRef.current === value) return;
      headerOffsetRef.current = value;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = window.requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--header-offset", value);
      });
    };

    const measureOffset = () => {
      const headerHeight = shellRef.current?.offsetHeight ?? 96;
      const desiredOffset = `${Math.round(headerHeight) + 24}px`;
      updateHeaderOffset(desiredOffset);
    };

    const handlePosition = () => {
      const scrollY = Math.max(window.scrollY, 0);
      const isMobile = window.innerWidth < 768;
      const pinThreshold = isMobile ? 4 : 10;

      const nextPinned = scrollY > pinThreshold;
      if (nextPinned !== pinnedStateRef.current) {
        pinnedStateRef.current = nextPinned;
        setIsPinned(nextPinned);
      }

      measureOffset();
    };

    handlePosition();
    window.addEventListener("scroll", handlePosition, { passive: true });
    window.addEventListener("resize", measureOffset);

    return () => {
      window.removeEventListener("scroll", handlePosition);
      window.removeEventListener("resize", measureOffset);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      document.documentElement.style.setProperty("--header-offset", "0px");
      headerOffsetRef.current = "0px";
      pinnedStateRef.current = false;
    };
  }, []);

  useEffect(() => {
    const headerHeight = shellRef.current?.offsetHeight ?? 96;
    const desiredOffset = `${Math.round(headerHeight) + 24}px`;
    document.documentElement.style.setProperty(
      "--header-offset",
      desiredOffset
    );
  }, []);

  const getHeaderOffsetValue = useCallback(() => {
    const parsed = parseFloat(headerOffsetRef.current);
    if (!Number.isNaN(parsed) && parsed > 0) {
      return parsed;
    }
    const headerHeight = shellRef.current?.offsetHeight ?? 96;
    return headerHeight + 24;
  }, []);

  const scrollToHash = useCallback(
    (hash: string) => {
      if (
        typeof window === "undefined" ||
        typeof document === "undefined" ||
        !hash ||
        !hash.startsWith("#")
      ) {
        return;
      }

      const target = document.querySelector(hash);
      if (!target) return;

      const targetTop = target.getBoundingClientRect().top + window.scrollY;
      const desiredTop = targetTop - getHeaderOffsetValue();
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const nextTop = Math.max(Math.min(desiredTop, maxScroll), 0);

      window.requestAnimationFrame(() => {
        window.scrollTo({ top: nextTop, behavior: "smooth" });
      });
    },
    [getHeaderOffsetValue]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleHashChange = () => {
      if (!window.location.hash) return;
      scrollToHash(window.location.hash);
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [scrollToHash]);

  const headerPosition = "fixed inset-x-0 top-0";

  const shellClasses = [
    "relative overflow-hidden rounded-[28px] px-5 py-4 text-darkGray backdrop-blur-2xl transition-all duration-400",
    isPinned
      ? "border border-black/10 bg-white/95 shadow-[0_18px_56px_rgba(15,23,42,0.18)]"
      : "border border-white/25 bg-white/70 shadow-[0_32px_80px_rgba(15,23,42,0.14)]",
  ].join(" ");

  const containerPaddingStyles = {
    paddingTop: `calc(var(--safe-area-top, 0px) + 0.85rem)`,
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`${headerPosition} z-[1000] bg-transparent`}
    >
      <div
        className="pointer-events-none px-4 pb-2 sm:px-6 lg:px-10 xl:px-14 transition-[padding] duration-300"
        style={containerPaddingStyles}
      >
        <div className="pointer-events-auto relative w-full" ref={shellRef}>
          <div className={shellClasses}>
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent"
            />
            <div
              aria-hidden
              className="absolute -left-24 top-1/2 h-60 w-60 -translate-y-1/2 rounded-full bg-coral/30 blur-[130px]"
            />
            <div
              aria-hidden
              className="absolute -right-16 -top-10 h-48 w-48 rounded-full bg-sky-200/60 blur-[140px]"
            />
            <div className="relative flex items-center gap-4">
              <div className="flex flex-1 items-center gap-4">
                <Link
                  href="/"
                  className="flex flex-col leading-tight text-darkGray"
                >
                  <span className="text-[0.6rem] uppercase tracking-[0.55em] text-darkGray/60">
                    Casablanca
                  </span>
                  <span className="text-xl font-semibold">Ocala</span>
                </Link>
                <div className="hidden sm:flex items-center gap-2 text-[0.7rem] text-darkGray/70">
                  <span className="rounded-full border border-black/5 bg-white px-3 py-1 tracking-[0.3em] shadow-sm">
                    VRBO • Furnished Finder
                  </span>
                </div>
              </div>

              <div className="hidden flex-1" />

              <div className="hidden flex-none items-center gap-3 md:flex">
                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-4 py-2 text-sm text-darkGray shadow-sm transition hover:text-coral hover:border-coral/30"
                >
                  <Images className="h-4 w-4" aria-hidden="true" />
                  Gallery
                </Link>
                <Link
                  href="#book"
                  className="rounded-full bg-gradient-to-r from-coral via-[#ff7a8e] to-coral px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(238,77,100,0.35)] transition hover:opacity-90"
                >
                  Plan your stay
                </Link>
              </div>

              <Link
                href="/gallery"
                aria-label="Open photo gallery"
                className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-full border border-black/10 bg-white/80 text-darkGray shadow-sm md:hidden transition hover:text-coral hover:border-coral/30"
              >
                <Images className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
