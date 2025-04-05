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
import DateRangePicker from "../common/DateRangePicker";
import Link from "next/link";

export default function PropertyLayout({
  title,
  description,
  price,
  imageUrl,
  airbnbUrl,
  vrboUrl,
  features,
  amenities,
}: Property) {
  return (
    <div className="container mx-auto px-4 py-8">
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
                    <h2 className="text-2xl font-bold text-darkGray mb-2">
                      {title}
                    </h2>
                    <p className="text-gray-600">{description}</p>
                  </div>

                  {/* Features */}
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
                        {features.maxGuests} guests
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowsPointingOutIcon className="w-5 h-5 text-coral" />
                      <span className="text-sm md:text-base">
                        {features.squareFeet} sq ft
                      </span>
                    </div>
                  </div>

                  {/* Amenities */}
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
                    <h4 className="text-lg font-semibold mb-4">
                      Check Availability
                    </h4>
                    <DateRangePicker
                      onDateSelect={(range) => {
                        console.log("Selected dates:", range);
                      }}
                    />
                  </div>

                  <div>
                    <p className="text-coral font-bold text-xl mb-6">
                      ${price} / night
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href={airbnbUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-coral text-white px-4 py-3 rounded-lg hover:bg-opacity-90 transition-colors text-center"
                      >
                        Book on Airbnb
                      </a>
                      <a
                        href={vrboUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-navy text-white px-4 py-3 rounded-lg hover:bg-opacity-90 transition-colors text-center"
                      >
                        Book on VRBO
                      </a>
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

                {/* Tour Button Overlay */}
                <AnimatePresence>
                  <motion.div
                    className="absolute top-4 -right-4 md:-right-6 bg-white rounded-2xl px-4 py-2 shadow-2xl flex items-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link href={"#"} target="_blank" rel="noopener noreferrer">
                      <PlayIcon className="w-4 h-4 md:w-5 md:h-5 text-coral" />
                    </Link>
                    <div>
                      <span className="text-xs md:text-sm font-medium">
                        Take a tour
                      </span>
                      <p className="text-[10px] md:text-xs text-gray-500">
                        2 minutes
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

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
                    <div className="flex items-center gap-1.5 md:gap-2 text-gray-500 text-[10px] md:text-sm mb-0 md:mb-1">
                      <HomeIcon className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="truncate">1234 Maple Grove Avenue</span>
                    </div>
                    <Link
                      href={"#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-coral text-[10px] md:text-sm hover:underline"
                    >
                      See detail
                    </Link>
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
                        src={imageUrl}
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
    </div>
  );
}
