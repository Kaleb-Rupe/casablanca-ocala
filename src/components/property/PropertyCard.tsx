"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Property } from "@/lib/services/mockData";
import {
  HomeIcon,
  UsersIcon,
  ArrowsPointingOutIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";
import { useCallback, useState } from "react";
import TourVideoModal from "./TourVideoModal";
import BookingButton from "./BookingButton";

export default function PropertyLayout({
  title,
  tagline,
  description,
  imageUrl,
  detailImageUrl,
  tourVideoUrl,
  tourVideoPosterUrl,
  furnishedFinderUrl,
  vrboUrl,
  features,
  amenities,
  location,
}: Property) {
  const [isTourOpen, setIsTourOpen] = useState(false);
  const closeTour = useCallback(() => setIsTourOpen(false), []);
  return (
    <div id="book" className="container mx-auto px-4 py-8 scroll-mt-24">
      {/* Main Container with max-width control */}
      <div className="max-w-7xl mx-auto">
        {/* Responsive grid container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Booking Section */}
          <div className="w-full order-2 lg:order-1 flex justify-center">
            <AnimatePresence>
              <motion.div
                className="bg-white rounded-3xl shadow-lg p-6 md:p-8 w-full max-w-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-darkGray mb-1">
                      {title}
                    </h2>
                    <p className="text-sm font-medium text-coral mb-3">
                      {tagline}
                    </p>
                    <p className="text-gray-600">{description}</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <HomeIcon className="w-5 h-5 text-coral" />
                      <span className="text-sm md:text-base">
                        {features.bedrooms} beds
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UsersIcon className="w-5 h-5 text-coral" />
                      <span className="text-sm md:text-base">
                        Sleeps {features.maxGuests}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowsPointingOutIcon className="w-5 h-5 text-coral" />
                      <span className="text-sm md:text-base">
                        {features.squareFeet.toLocaleString()} sq ft
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {amenities.slice(0, 4).map((amenity) => (
                      <span
                        key={amenity}
                        className="bg-beige text-darkGray px-3 py-1 rounded-full text-sm"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-darkGray">
                      Book your stay
                    </h4>
                    <p className="text-sm text-gray-500 mt-1 mb-4">
                      Pricing and availability are managed on each platform.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <BookingButton
                        href={vrboUrl}
                        label="Book on VRBO"
                        descriptor="Nightly stays"
                        variant="coral"
                      />
                      <BookingButton
                        href={furnishedFinderUrl}
                        label="Book on Furnished Finder"
                        descriptor="Monthly rentals"
                        variant="navy"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Images Section */}
          <AnimatePresence>
            <motion.div
              className="w-full order-1 lg:order-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative aspect-square w-full">
                {/* Main Large Image */}
                <div className="relative w-full h-full rounded-3xl overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Tour Button Overlay — Option A: scroll-in entrance + slow ping ring */}
                <motion.button
                  type="button"
                  onClick={() => setIsTourOpen(true)}
                  aria-label="Take a 2 minute tour of the property"
                  className="absolute top-4 -right-4 md:-right-6 bg-white rounded-2xl px-4 py-2 shadow-2xl flex items-center gap-3 text-left transition hover:-translate-y-0.5 hover:shadow-coral/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
                  initial={{ opacity: 0, y: 12, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  whileHover={{ scale: 1.04 }}
                >
                  <span className="relative flex h-6 w-6 md:h-7 md:w-7 items-center justify-center">
                    <motion.span
                      className="absolute inset-0 rounded-full bg-coral motion-reduce:hidden"
                      aria-hidden="true"
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                    <PlayIcon className="relative w-4 h-4 md:w-5 md:h-5 text-coral shrink-0" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-xs md:text-sm font-medium text-darkGray">
                      Take a tour
                    </span>
                    <span className="text-[10px] md:text-xs text-gray-500">
                      2 minutes
                    </span>
                  </span>
                </motion.button>

                {/* Property Info Card Overlay */}
                <AnimatePresence>
                  <motion.div
                    className="absolute bottom-4 md:bottom-8 -left-6 md:-left-8 bg-white rounded-xl md:rounded-2xl shadow-2xl p-4 w-[64%] md:w-[55%] md:max-w-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-xs md:text-base font-semibold text-darkGray mb-0.5 md:mb-1 truncate">
                      {title}
                    </h2>
                    <div className="flex items-center gap-1.5 md:gap-2 text-gray-500 text-[10px] md:text-sm">
                      <HomeIcon className="w-3 h-3 md:w-4 md:h-4 shrink-0" />
                      <span className="truncate">
                        {location.neighborhood}, {location.city}, {location.state}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Smaller Overlapping Image */}
                <AnimatePresence>
                  <motion.div
                    className="absolute -bottom-8 -right-4 lg:-bottom-14 lg:-right-9 w-[40%] lg:w-[50%] aspect-square"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative w-full h-full rounded-xl md:rounded-2xl overflow-hidden border-2 md:border-4 border-white shadow-2xl">
                      <Image
                        src={detailImageUrl}
                        alt={`${title} detail`}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <TourVideoModal
        open={isTourOpen}
        videoUrl={tourVideoUrl}
        poster={tourVideoPosterUrl}
        onClose={closeTour}
      />
    </div>
  );
}
