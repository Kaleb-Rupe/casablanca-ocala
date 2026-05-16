"use client";

import { AnimatePresence, motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";
import { useCallback, useEffect, useRef, useState } from "react";

interface TourVideoModalProps {
  open: boolean;
  videoUrl: string;
  poster?: string;
  onClose: () => void;
}

export default function TourVideoModal({
  open,
  videoUrl,
  poster,
  onClose,
}: TourVideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      // Autoplay was blocked — leave overlay visible so user can tap to start
    });
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const videoEl = videoRef.current;
    if (videoEl) {
      videoEl.currentTime = 0;
      videoEl.play().catch(() => {
        // Autoplay blocked — the overlay stays visible so user can tap
      });
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      videoEl?.pause();
      setIsPlaying(false);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Property tour video"
        >
          <motion.div
            className="relative h-full max-h-[90vh] aspect-[9/16] max-w-full"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close tour video"
              className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 z-10 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white text-darkGray shadow-2xl transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            <video
              ref={videoRef}
              src={videoUrl}
              poster={poster}
              controls
              playsInline
              autoPlay
              preload="auto"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              className="h-full w-full rounded-2xl bg-black shadow-2xl object-contain"
            >
              Your browser does not support the video tag.
            </video>

            <AnimatePresence>
              {!isPlaying && (
                <motion.button
                  type="button"
                  onClick={playVideo}
                  aria-label="Play tour video"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute inset-0 flex items-center justify-center focus:outline-none group"
                >
                  <span className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-coral text-white shadow-2xl shadow-black/40 ring-1 ring-white/20 transition group-focus-visible:ring-4 group-focus-visible:ring-white/60">
                    <PlayIcon className="h-10 w-10 sm:h-12 sm:w-12 translate-x-0.5" />
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
