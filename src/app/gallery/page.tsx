"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import {
  gallerySections,
  type GallerySection,
} from "@/data/gallerySections";
import InstagramFeed from "@/components/gallery/InstagramFeed";

type GallerySectionTabsProps = {
  sections: GallerySection[];
  selectedSectionId: string;
  onSelect: (id: string) => void;
};

function GallerySectionTabs({
  sections,
  selectedSectionId,
  onSelect,
}: GallerySectionTabsProps) {
  const chipRowRef = useRef<HTMLDivElement | null>(null);
  const [showScrollHint, setShowScrollHint] = useState(
    sections.length > 0 && sections[0]?.id !== ""
  );
  const scrollHintDismissedRef = useRef(false);
  const scrollHintRafRef = useRef<number | null>(null);

  useEffect(() => {
    const node = chipRowRef.current;
    if (!node) return;

    const hideScrollHint = () => {
      if (scrollHintDismissedRef.current) return;
      scrollHintDismissedRef.current = true;
      if (scrollHintRafRef.current) {
        cancelAnimationFrame(scrollHintRafRef.current);
      }
      scrollHintRafRef.current = window.requestAnimationFrame(() => {
        setShowScrollHint(false);
      });
    };

    const evaluateOverflow = () => {
      const needsScroll = node.scrollWidth - node.clientWidth > 8;
      if (!needsScroll) {
        scrollHintDismissedRef.current = false;
        setShowScrollHint(false);
        return;
      }

      if (!scrollHintDismissedRef.current) {
        setShowScrollHint(node.scrollLeft < 12);
      }
    };

    const handleScroll = () => {
      if (node.scrollLeft > 20) {
        hideScrollHint();
      }
    };

    evaluateOverflow();
    node.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", evaluateOverflow);

    return () => {
      node.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", evaluateOverflow);
      if (scrollHintRafRef.current) {
        cancelAnimationFrame(scrollHintRafRef.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      <div
        ref={chipRowRef}
        className="flex gap-3 overflow-x-auto overflow-y-visible pb-3 pr-10 scroll-smooth snap-x no-scrollbar"
      >
        {sections.map((section) => {
          const isActive = section.id === selectedSectionId;
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => onSelect(section.id)}
              className={`snap-start whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 ${
                isActive
                  ? "border-transparent bg-coral text-white shadow-lg shadow-coral/30"
                  : "border-darkGray/15 bg-white text-darkGray hover:border-darkGray/40"
              }`}
              aria-pressed={isActive}
            >
              {section.name}
            </button>
          );
        })}
      </div>
      <AnimatePresence>
        {showScrollHint && (
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            className="pointer-events-none absolute inset-y-0 right-0 flex w-20 items-center justify-end bg-gradient-to-l from-white via-white/60 to-transparent pr-4 md:hidden"
          >
            <motion.div
              initial={{ x: -3 }}
              animate={{ x: 3 }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 1,
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-darkGray/20 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
            >
              <ChevronRight className="h-3.5 w-3.5 text-darkGray/80" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function GalleryPage() {
  const [selectedSectionId, setSelectedSectionId] = useState(
    gallerySections[0]?.id ?? ""
  );
  const [lightbox, setLightbox] = useState<{
    sectionId: string;
    index: number;
  } | null>(null);
  const [lightboxLoading, setLightboxLoading] = useState(false);
  const [imageLoadState, setImageLoadState] = useState<Record<string, boolean>>(
    {}
  );

  const selectedSection = useMemo(
    () => gallerySections.find((section) => section.id === selectedSectionId),
    [selectedSectionId]
  );

  const handleImageLoaded = useCallback((url: string) => {
    setImageLoadState((prev) => {
      if (prev[url]) return prev;
      return { ...prev, [url]: true };
    });
  }, []);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (!lightbox) return;
      if (event.key === "Escape") {
        setLightbox(null);
      } else if (event.key === "ArrowRight") {
        setLightbox((state) => {
          if (!state) return state;
          const section = gallerySections.find((s) => s.id === state.sectionId);
          if (!section) return state;
          return {
            sectionId: state.sectionId,
            index: (state.index + 1) % section.images.length,
          };
        });
      } else if (event.key === "ArrowLeft") {
        setLightbox((state) => {
          if (!state) return state;
          const section = gallerySections.find((s) => s.id === state.sectionId);
          if (!section) return state;
          return {
            sectionId: state.sectionId,
            index:
              (state.index - 1 + section.images.length) % section.images.length,
          };
        });
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  const openLightbox = (index: number) => {
    if (!selectedSection) return;
    setLightbox({ sectionId: selectedSection.id, index });
    setLightboxLoading(true);
  };

  const closeLightbox = () => setLightbox(null);

  const goToNeighbor = (direction: "prev" | "next") => {
    setLightbox((state) => {
      if (!state) return state;
      const section = gallerySections.find((s) => s.id === state.sectionId);
      if (!section) return state;
      const delta = direction === "next" ? 1 : -1;
      const length = section.images.length;
      const nextState = {
        sectionId: state.sectionId,
        index: (state.index + delta + length) % length,
      };
      setLightboxLoading(true);
      return nextState;
    });
  };

  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  const totalPhotos = useMemo(
    () => gallerySections.reduce((sum, s) => sum + s.images.length, 0),
    []
  );

  return (
    <>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col gap-8">
          <div className="space-y-3 max-w-3xl">
            <motion.p
              className="text-sm font-medium text-coral tracking-wide uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {totalPhotos} photos · {gallerySections.length} rooms
            </motion.p>
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-darkGray tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              Photo Gallery
            </motion.h1>
            <motion.p
              className="text-darkGray/70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Browse the property room by room. Tap any image for a closer look —
              use ← → keys or swipe to move through the set.
            </motion.p>
          </div>

          <GallerySectionTabs
            sections={gallerySections}
            selectedSectionId={selectedSectionId}
            onSelect={setSelectedSectionId}
          />

          <AnimatePresence mode="wait">
            {selectedSection && (
              <motion.section
                key={selectedSection.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="space-y-6"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-darkGray/50 mb-1">
                      {selectedSection.name}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-semibold text-darkGray max-w-2xl">
                      {selectedSection.description}
                    </h2>
                  </div>
                  <span className="inline-flex items-center self-start md:self-auto rounded-full bg-beige px-3 py-1 text-xs font-medium text-darkGray/70">
                    {selectedSection.images.length} photos
                  </span>
                </div>

                <RoomGrid
                  section={selectedSection}
                  imageLoadState={imageLoadState}
                  onImageLoaded={handleImageLoaded}
                  onOpenLightbox={openLightbox}
                />
              </motion.section>
            )}
          </AnimatePresence>
        </div>

        <InstagramFeed />
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[1100] bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="absolute inset-0 h-full w-full cursor-zoom-out"
              aria-label="Close gallery"
              onClick={closeLightbox}
            />
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center p-4">
              <div className="pointer-events-auto relative w-full max-w-5xl">
                <button
                  className="absolute -top-12 right-0 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                  onClick={closeLightbox}
                  aria-label="Close preview"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-black/30">
                  {(() => {
                    const section = gallerySections.find(
                      (s) => s.id === lightbox.sectionId
                    );
                    if (!section) return null;
                    const url = section.images[lightbox.index];
                    return (
                      <Image
                        src={url}
                        alt={`${section.name} — image ${lightbox.index + 1} of ${section.images.length}`}
                        fill
                        sizes="100vw"
                        className="object-contain"
                        priority
                        onLoadingComplete={() => setLightboxLoading(false)}
                      />
                    );
                  })()}
                  <AnimatePresence>
                    {lightboxLoading && (
                      <motion.div
                        className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        <p className="text-xs uppercase tracking-[0.4em] text-white/70">
                          Loading
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-white/80">
                  <button
                    type="button"
                    className={`flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-medium transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
                      lightboxLoading ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    onClick={() => goToNeighbor("prev")}
                    aria-label="Previous image"
                    disabled={lightboxLoading}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Prev
                  </button>
                  {(() => {
                    const section = gallerySections.find(
                      (s) => s.id === lightbox.sectionId
                    );
                    if (!section) return null;
                    return (
                      <span className="text-xs uppercase tracking-[0.3em] text-white/60">
                        {lightbox.index + 1} / {section.images.length}
                      </span>
                    );
                  })()}
                  <button
                    type="button"
                    className={`flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-medium transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
                      lightboxLoading ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    onClick={() => goToNeighbor("next")}
                    aria-label="Next image"
                    disabled={lightboxLoading}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

interface RoomGridProps {
  section: GallerySection;
  imageLoadState: Record<string, boolean>;
  onImageLoaded: (url: string) => void;
  onOpenLightbox: (index: number) => void;
}

function RoomGrid({
  section,
  imageLoadState,
  onImageLoaded,
  onOpenLightbox,
}: RoomGridProps) {
  const [first, ...rest] = section.images;
  return (
    <div className="space-y-4">
      {first && (
        <motion.button
          type="button"
          onClick={() => onOpenLightbox(0)}
          className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-beige/60 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={first}
            alt={`${section.name} hero`}
            fill
            loading="eager"
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="object-cover transition-transform duration-700 hover:scale-105"
            onLoadingComplete={() => onImageLoaded(first)}
          />
          {!imageLoadState[first] && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-white/40 via-white/10 to-white/40" />
          )}
        </motion.button>
      )}

      {rest.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {rest.map((url, idx) => {
            const realIndex = idx + 1;
            return (
              <motion.button
                key={url}
                type="button"
                onClick={() => onOpenLightbox(realIndex)}
                className="relative aspect-square overflow-hidden rounded-2xl bg-beige/60 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04, duration: 0.35 }}
              >
                <Image
                  src={url}
                  alt={`${section.name} detail ${realIndex}`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  onLoadingComplete={() => onImageLoaded(url)}
                />
                {!imageLoadState[url] && (
                  <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-white/40 via-white/10 to-white/40" />
                )}
              </motion.button>
            );
          })}
        </div>
      )}
    </div>
  );
}
