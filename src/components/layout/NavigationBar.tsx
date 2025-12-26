"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "#properties", label: "Properties" },
  { href: "/gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
] as const;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    if (typeof document === "undefined" || typeof window === "undefined")
      return;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (!isMobile) return;

    const initialOverflow = document.body.style.overflow;
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = initialOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const headerHeight = shellRef.current?.offsetHeight ?? 96;
    const desiredOffset = `${Math.round(headerHeight) + 24}px`;
    document.documentElement.style.setProperty(
      "--header-offset",
      desiredOffset
    );
  }, [isMenuOpen]);

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
  const mobileNavId = "primary-mobile-nav";

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
                  <span className="flex items-center gap-1 rounded-full border border-black/5 bg-white px-3 py-1 shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Availability synced
                  </span>
                  <span className="rounded-full border border-black/5 bg-white px-3 py-1 tracking-[0.3em] shadow-sm">
                    VRBO • Airbnb
                  </span>
                </div>
              </div>

              <nav className="hidden flex-1 items-center justify-center space-x-6 text-sm md:flex">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="link-hover text-darkGray/70 transition hover:text-darkGray"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="hidden flex-none items-center gap-3 md:flex">
                <div className="rounded-full border border-black/5 bg-white px-3 py-1 text-xs text-darkGray/70 shadow-sm">
                  Boutique stay
                </div>
                <Link
                  href="#contact"
                  className="rounded-full bg-gradient-to-r from-coral via-[#ff7a8e] to-coral px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(238,77,100,0.35)] transition hover:opacity-90"
                >
                  Plan your stay
                </Link>
              </div>

              <button
                type="button"
                className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-full border border-black/10 bg-white/80 text-darkGray shadow-sm md:hidden"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
                aria-controls={mobileNavId}
                aria-haspopup="true"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {isMenuOpen && (
              <>
                <motion.div
                  key="mobile-nav-backdrop"
                  className="fixed inset-0 z-[5] bg-black/20 md:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMenuOpen(false)}
                />
                <motion.nav
                  id={mobileNavId}
                  key="mobile-nav"
                  initial={{ opacity: 0, y: -6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="md:hidden absolute top-[calc(100%+0.4rem)] right-3 z-10 w-[90vw] max-w-[400px] origin-top rounded-3xl border border-black/5 bg-white/95 px-5 py-4 text-darkGray shadow-[0_20px_50px_rgba(15,23,42,0.12)] backdrop-blur-2xl"
                >
                  <div className="flex flex-col gap-4 text-base">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="link-hover text-darkGray/80"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Link
                      href="#contact"
                      className="rounded-full bg-gradient-to-r from-coral via-[#ff7a8e] to-coral px-4 py-2 text-center text-sm font-semibold text-white shadow-[0_10px_25px_rgba(238,77,100,0.35)]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Plan your stay
                    </Link>
                  </div>
                </motion.nav>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}
